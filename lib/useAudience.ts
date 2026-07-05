"use client";

// ─── Le moteur d'audience ──────────────────────────────────────────────────────
// UNE source de vérité pour « qui regarde », consommée par le header, l'accueil
// et les pages d'audience. Deux axes : l'ESPACE (élève/parent/enseignant/
// établissement) pilote la NAV ; l'état CONNECTÉ pilote le BOUTON d'action.
//
// Résolution (par priorité) :
//   1. Rôle connecté « staff » : un prof/principal garde SON espace partout.
//   2. Route : l'espace où l'on se trouve (/parents, /enseignants, /espace-ecoles).
//   3. (à venir) choix mémorisé depuis le sélecteur d'accueil (localStorage).
//   4. Défaut : espace élève (= « tout le monde »).

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";

export type Audience = "eleve" | "parent" | "enseignant" | "etablissement";

export type AudienceState = {
  /** L'espace courant → pilote la nav du header et le contenu d'accueil. */
  space: Audience;
  /** Une session est-elle active ? → pilote le bouton d'action. */
  connected: boolean;
  /** type_utilisateur de la session (eleve/prof/principal/boss) ou null. */
  role: string | null;
};

const STORAGE_KEY = "eleveai-audience";
const ADULT: Audience[] = ["parent", "enseignant", "etablissement"];

export function useAudience(): AudienceState {
  const pathname = usePathname() || "/";
  const { eleve } = useEleve();
  const role = eleve?.type_utilisateur ?? null;
  const connected = !!eleve;

  // Choix mémorisé (localStorage) : lu APRÈS le montage pour ne pas casser
  // l'hydratation (SSR = null → défaut élève, puis on applique le souvenir).
  const [remembered, setRemembered] = useState<Audience | null>(null);
  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY) as Audience | null;
      if (v && ADULT.includes(v)) setRemembered(v);
    } catch {
      /* localStorage indisponible */
    }
  }, []);

  // Résolution : rôle connecté (staff) > route > choix mémorisé > défaut élève.
  let space: Audience;
  let fromRoute = false;
  if (role === "prof") space = "enseignant";
  else if (role === "principal" || role === "boss") space = "etablissement";
  else if (pathname.startsWith("/parents")) { space = "parent"; fromRoute = true; }
  else if (pathname.startsWith("/enseignants")) { space = "enseignant"; fromRoute = true; }
  else if (pathname.startsWith("/espace-ecoles")) { space = "etablissement"; fromRoute = true; }
  else space = remembered ?? "eleve";

  // Visiter une page d'espace « mémorise » le choix → reconnu au retour.
  useEffect(() => {
    if (fromRoute) {
      try {
        localStorage.setItem(STORAGE_KEY, space);
      } catch {
        /* ignore */
      }
    }
  }, [fromRoute, space]);

  return { space, connected, role };
}
