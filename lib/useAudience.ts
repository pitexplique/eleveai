"use client";

// ─── Le moteur d'audience ──────────────────────────────────────────────────────
// UNE source de vérité pour « qui regarde », consommée par le header, l'accueil
// et les pages d'audience. Deux axes : l'ESPACE (élève/parent/enseignant/
// établissement) pilote la NAV ; l'état CONNECTÉ pilote le BOUTON d'action.
//
// Résolution (par priorité) :
//   1. Rôle connecté « staff » : un prof/principal garde SON espace partout.
//   2. Route : l'espace où l'on se trouve (/parents, /enseignants, /espace-ecoles).
//   3. Choix mémorisé depuis le sélecteur d'accueil (localStorage).
//   4. Défaut : espace élève (= « tout le monde »).
//
// ⭐ LE POINT 3 A ÉTÉ « (à venir) » JUSQU'AU 19/08, ET ÇA SE VOYAIT À L'ÉCRAN.
// Cette clé n'était écrite qu'en VISITANT /parents, /espace-profs ou
// /espace-ecoles. Un visiteur passé une fois par /parents voyait donc « 👪
// Parents » allumé en haut de l'accueil pour toujours — pendant qu'il cliquait
// « Élève » puis « CM2 » au milieu de l'écran. Deux réponses contradictoires à
// « qui es-tu ? » sur la même page, et c'est celle qu'il n'avait pas donnée
// qu'on affichait en grand.
// La matrice gardait son propre souvenir de son côté (`eleveai.ia.profil`,
// EntreeMatrice.tsx). Deux mémoires pour une seule question, qui ne se
// parlaient pas. `memoriserAudience` est le pont — et le geste explicite du
// visiteur bat le souvenir d'une visite ancienne, ce qui est l'ordre naturel.

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

/**
 * Émis dans l'onglet courant à chaque écriture — même raison que
 * EVENEMENT_HISTORIQUE dans lib/matrice/historique.ts : l'événement `storage`
 * du navigateur ne se déclenche QUE dans les AUTRES onglets. Sans ce signal
 * maison, cliquer « Parent » sur l'accueil n'allumerait la porte du header
 * qu'au chargement de page suivant — c'est-à-dire jamais, puisque l'accueil
 * répond sans naviguer.
 */
export const EVENEMENT_AUDIENCE = "eleveai:audience";

/** Ce que localStorage garde, ou null s'il ne garde rien de valable. */
function lireMemoire(): Audience | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY) as Audience | null;
    return v && ADULT.includes(v) ? v : null;
  } catch {
    return null; /* localStorage indisponible */
  }
}

/**
 * DIRE QUI L'ON EST, depuis n'importe où — aujourd'hui le sélecteur de rôle de
 * l'accueil (EntreeMatrice), demain qui voudra.
 *
 * ⚠️ « eleve » EFFACE la clé au lieu de l'écrire, et ce n'est pas un raccourci :
 * seules les valeurs adultes sont mémorisées (voir ADULT), l'élève étant le
 * défaut de tout le monde. L'écrire produirait une clé que `lireMemoire`
 * refuserait, donc un souvenir qui ne se souvient de rien — alors que
 * l'effacer, lui, ANNULE bien le « Parents » d'une visite passée. C'est
 * exactement ce qu'on veut quand quelqu'un clique « Élève ».
 */
export function memoriserAudience(space: Audience): void {
  try {
    if (ADULT.includes(space)) localStorage.setItem(STORAGE_KEY, space);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* tant pis : la page reste juste, elle ne se souviendra pas */
  }
  try {
    window.dispatchEvent(new Event(EVENEMENT_AUDIENCE));
  } catch {
    /* pas de fenêtre (SSR) */
  }
}

export function useAudience(): AudienceState {
  const pathname = usePathname() || "/";
  const { eleve } = useEleve();
  const role = eleve?.type_utilisateur ?? null;
  const connected = !!eleve;

  // Choix mémorisé (localStorage) : lu APRÈS le montage pour ne pas casser
  // l'hydratation (SSR = null → défaut élève, puis on applique le souvenir).
  const [remembered, setRemembered] = useState<Audience | null>(null);
  useEffect(() => {
    const relire = () => setRemembered(lireMemoire());
    relire();
    // ⚠️ `relire` et non `setRemembered(v)` : quand la clé est EFFACÉE (clic sur
    // « Élève »), il faut repasser à null. L'ancienne version n'écrivait que
    // lorsqu'une valeur existait — un « Parents » mémorisé y serait donc resté
    // allumé jusqu'au rechargement, malgré l'effacement.
    window.addEventListener(EVENEMENT_AUDIENCE, relire);
    return () => window.removeEventListener(EVENEMENT_AUDIENCE, relire);
  }, []);

  // Résolution : rôle connecté (staff) > route > choix mémorisé > défaut élève.
  let space: Audience;
  let fromRoute = false;
  if (role === "prof") space = "enseignant";
  else if (role === "principal" || role === "boss") space = "etablissement";
  else if (pathname.startsWith("/parents")) { space = "parent"; fromRoute = true; }
  else if (pathname.startsWith("/espace-profs")) { space = "enseignant"; fromRoute = true; }
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
