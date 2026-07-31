// Concours Avenir — épreuve de mathématiques.
// Règles calquées sur le sujet officiel 2026 (7 écoles d'ingénieurs post-bac :
// ECE, ESILV, ESTACA, EPF, EIGSI, ESIGELEC, BUILDERS).
//
// Ce qui fait l'épreuve — et que l'entraînement classique ne travaille pas :
//   1. le barème +1 / -1 / 0 : répondre au hasard a une espérance de -0,5 point.
//      Ne répondre que si l'on a éliminé au moins 2 propositions sur 4.
//   2. 60 questions proposées mais 45 seulement comptées : il faut choisir
//      ses combats, pas tout traiter.
//   3. le temps : 1h30 pour 45 questions, soit 2 minutes par question.

export const BAREME = {
  bonne: 1,
  fausse: -1,
  abstention: 0,
} as const;

/** Nombre de questions présentées dans le sujet. */
export const NB_QUESTIONS = 60;

/** Nombre de réponses effectivement comptées (les 45 premières traitées). */
export const NB_REPONSES_COMPTEES = 45;

/** Durée de l'épreuve, en secondes (1h30). */
export const DUREE_SECONDES = 90 * 60;

/** Coefficient de l'épreuve de maths (le plus lourd : sciences 4, anglais 2). */
export const COEFFICIENT = 6;

export type SectionId =
  | "suites"
  | "fonctions"
  | "probabilites"
  | "integrales"
  | "geometrie";

export type SectionAvenir = {
  id: SectionId;
  /** Intitulé tel qu'il apparaît dans le sujet officiel. */
  label: string;
  /** Notions de nos banques Terminale qui alimentent la section. */
  notions: string[];
  /** Nombre de questions tirées pour cette section (12 x 5 = 60). */
  nbQuestions: number;
};

export const SECTIONS: SectionAvenir[] = [
  {
    id: "suites",
    label: "Calculs numériques et suites",
    notions: ["suite_numerique", "limite_suite", "algorithmique_python"],
    nbQuestions: 12,
  },
  {
    id: "fonctions",
    label: "Études de fonctions",
    notions: [
      "derivation_fonction",
      "limite_fonction",
      "continuite_tvi",
      "convexite_fonction",
      "fonction_exponentielle",
      "fonction_logarithme",
    ],
    nbQuestions: 12,
  },
  {
    id: "probabilites",
    label: "Probabilités et dénombrement",
    // concentration_echantillonnage est volontairement exclue : elle
    // n'apparaît dans aucun des sujets officiels dépouillés (2024 à 2026).
    notions: [
      "probabilite_conditionnelle",
      "variable_aleatoire",
      "loi_binomiale",
      "denombrement_combinatoire",
    ],
    nbQuestions: 12,
  },
  {
    id: "integrales",
    label: "Équations différentielles, primitives et calcul intégral",
    notions: ["equation_differentielle", "primitive_integrale"],
    nbQuestions: 12,
  },
  {
    id: "geometrie",
    label: "Géométrie",
    notions: ["geometrie_espace", "produit_scalaire_espace"],
    nbQuestions: 12,
  },
];

/**
 * Difficulté minimale retenue. Le concours n'est pas un contrôle de cours :
 * on écarte les items d'application immédiate (difficulté 1 et 2).
 */
export const DIFFICULTE_MIN = 3;

/** Question telle qu'elle est envoyée au navigateur. */
export type QuestionAvenir = {
  id: string;
  sectionId: SectionId;
  numero: number;
  enonce: string;
  propositions: string[];
  /** Index de la bonne proposition dans `propositions`. */
  bonneReponse: number;
  explication?: string;
  notionId: string;
};

export type EpreuveAvenir = {
  questions: QuestionAvenir[];
  /** true si le vivier a dû être recyclé faute d'items encore jamais vus. */
  recyclee: boolean;
};

/**
 * Espérance de gain d'une réponse au hasard une fois `elimines` propositions
 * écartées (sur 4). Sert au débriefing : montrer que deviner coûte des points.
 */
export function esperance(elimines: number): number {
  const restantes = Math.max(1, 4 - elimines);
  const pJuste = 1 / restantes;
  return pJuste * BAREME.bonne + (1 - pJuste) * BAREME.fausse;
}
