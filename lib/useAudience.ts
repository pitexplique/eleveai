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

export function useAudience(): AudienceState {
  const pathname = usePathname() || "/";
  const { eleve } = useEleve();
  const role = eleve?.type_utilisateur ?? null;
  const connected = !!eleve;

  // 1. Rôle connecté (staff) : prof/principal gardent leur espace partout.
  if (role === "prof") return { space: "enseignant", connected, role };
  if (role === "principal" || role === "boss") {
    return { space: "etablissement", connected, role };
  }

  // 2. Route : l'espace où l'on se trouve.
  if (pathname.startsWith("/parents")) return { space: "parent", connected, role };
  if (pathname.startsWith("/enseignants")) {
    return { space: "enseignant", connected, role };
  }
  if (pathname.startsWith("/espace-ecoles")) {
    return { space: "etablissement", connected, role };
  }

  // 3+4. Élève connecté ou visiteur → espace élève (défaut).
  return { space: "eleve", connected, role };
}
