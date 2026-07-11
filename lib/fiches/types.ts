// ─── La fiche de cours comme DONNÉE ────────────────────────────────────────────
// Le pivot du chantier fiches : une fiche n'est plus une page écrite à la main,
// c'est un objet en blocs typés. Les pages (fiche publique, flashcards élève,
// composeur prof, mode classe, impression) ne sont que des RENDUS de cette
// donnée — même source, plusieurs lunettes.

import type { ReactNode } from "react";

export type FicheIdentite = { label: string; valeur: string };
export type FichePropriete = { titre: string; texte: string };
export type FicheMethode = { titre: string; texte: string };
export type FicheUsage = { titre: string; detail: string };
export type FicheExemple = {
  titre: string;
  donnees: string;
  question: string;
  solution: string;
};
export type FicheExercice = { question: string; correction: string };

/** Les rubriques composables — le prof coche et ordonne les siennes. */
export type FicheRubriqueId =
  | "identite"
  | "reel"
  | "historique"
  | "definition"
  | "proprietes"
  | "formule"
  | "methode"
  | "usages"
  | "exemples"
  | "pieges"
  | "aRetenir"
  | "entrainement";

export const RUBRIQUES_LABELS: Record<FicheRubriqueId, string> = {
  identite: "Carte d'identité",
  reel: "À quoi ça sert (dans le réel)",
  historique: "Un peu d'histoire",
  definition: "Définition",
  proprietes: "Propriétés",
  formule: "La formule",
  methode: "La méthode (les réflexes)",
  usages: "Selon ce que l'on cherche",
  exemples: "Exemples corrigés",
  pieges: "Pièges à éviter",
  aRetenir: "À retenir",
  entrainement: "Je m'entraîne",
};

/** L'ordre canonique EleveAI : le réel et l'histoire d'abord (la façon
 *  Frédéric), puis le cours au format classique Définition → Propriétés. */
export const ORDRE_CANONIQUE: FicheRubriqueId[] = [
  "identite",
  "reel",
  "historique",
  "definition",
  "proprietes",
  "formule",
  "methode",
  "usages",
  "exemples",
  "pieges",
  "aRetenir",
  "entrainement",
];

export type FicheCoursData = {
  matiere: string;
  matiereLabel: string;
  classe: string;
  notion: string;
  titre: string;
  accroche: string;
  identite: FicheIdentite[];
  definition: { texte: string };
  proprietes: FichePropriete[];
  reel: { texte: string };
  historique: { texte: string };
  formule: {
    contexte: string;
    expression: string;
    legende: string;
    /** Schéma SVG optionnel affiché à côté de la formule. */
    schema?: ReactNode;
  };
  methode: FicheMethode[];
  usages: FicheUsage[];
  exemples: FicheExemple[];
  pieges: string[];
  aRetenir: string[];
  entrainement: FicheExercice[];
  /** Lien du CTA « M'entraîner avec le Coach IA ». */
  coachHref: string;
};
