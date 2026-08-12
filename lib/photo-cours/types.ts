// lib/photo-cours/types.ts
//
// LA PHOTO DU COURS — types partagés client / serveur.
//
// La brique est volontairement AUTONOME : rien ici n'importe de `@/lib/tutor-v4`
// ni d'une page. On la branche où on veut (espace prof, dashboard, coach) en
// posant `<PhotoCours />` et en parlant à /api/photo-cours/*.
//
// ⚠️ RGPD — L'IMAGE N'EST JAMAIS STOCKÉE. Elle est compressée dans le
// navigateur, envoyée au modèle, et oubliée. Aucune écriture Supabase dans
// cette brique : une photo de cahier porte une écriture, parfois un prénom,
// parfois le nom d'un établissement. Ce qu'on garde, c'est le TEXTE que le
// professeur a relu et validé — et seulement s'il décide de le garder.

/** Ce que le modèle dit avoir lu sur la photo. Étape 1. */
export type LectureCours = {
  /** Le cours restitué tel qu'il est écrit, sans correction ni ajout. */
  texte: string;
  /** Le niveau si la photo le dit (« 5e », « Terminale »…), sinon null. */
  niveau: string | null;
  /** La notion si elle est lisible (« théorème de Pythagore »…), sinon null. */
  notion: string | null;
  /** La matière si elle est déductible, sinon null. */
  matiere: string | null;
  /**
   * Ce que le modèle n'a PAS réussi à lire. C'est le garde-fou : un cahier
   * manuscrit mal éclairé produit des contresens, et un contresens recopié
   * dans une fiche distribuée en classe est pire que pas de fiche du tout.
   */
  zonesIllisibles: string[];
  /** 0 à 100. En dessous de 60, on demande une meilleure photo. */
  confiance: number;
};

/** Ce que le professeur demande à partir du cours relu. Étape 2. */
export type TypeProduction =
  | "seance"
  | "exercices"
  | "evaluation"
  | "differenciation"
  | "synthese";

export const PRODUCTIONS: { id: TypeProduction; label: string; aide: string }[] = [
  {
    id: "exercices",
    label: "Des exercices",
    aide: "Une série graduée sur ce cours précis, avec le corrigé.",
  },
  {
    id: "seance",
    label: "Une séance",
    aide: "Le déroulé d'une heure : objectifs, étapes, durées.",
  },
  {
    id: "evaluation",
    label: "Une évaluation",
    aide: "Un sujet court avec le barème.",
  },
  {
    id: "differenciation",
    label: "De la différenciation",
    aide: "Le même contenu en trois niveaux d'exigence.",
  },
  {
    id: "synthese",
    label: "Une fiche de synthèse",
    aide: "Le cours resserré sur une page pour les élèves.",
  },
];

export type ReponseLecture = { lecture: LectureCours } | { error: string };
export type ReponseProduction = { output: string } | { error: string };
