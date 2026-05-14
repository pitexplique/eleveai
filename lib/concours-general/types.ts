// lib/concours-general/types.ts

export type ConcoursGeneralNiveau = "6e" | "5e" | "4e" | "3e";

export type ConcoursGeneralTheme =
  | "nombres_logique"
  | "proportionnalite_grandeurs"
  | "geometrie"
  | "maths_sciences_donnees";

export type ConcoursGeneralFormat =
  | "qcm"
  | "short"
  | "multi_step"
  | "open";

export type ConcoursGeneralDifficulty = 3 | 4 | 5;

export type ConcoursGeneralItem = {
  id: string;

  /**
   * Le concours général des collèges vise officiellement la 3e,
   * mais certains défis sont accessibles avant.
   */
  niveauCible: "3e";
  accessibleFrom: ConcoursGeneralNiveau;

  theme: ConcoursGeneralTheme;
  difficulty: ConcoursGeneralDifficulty;

  title: string;
  statement: string;
  question: string;

  format: ConcoursGeneralFormat;

  choices?: string[];
  expected?: string[];

  notionIds: string[];
  microIds: string[];

  hint1: string;
  hint2: string;
  hint3: string;

  correction: string;
  redactionAttendue?: string;

  tags: string[];

  /**
   * Prévu pour plus tard : réutilisation des canvas Tutor V4.
   */
  canvas?: unknown;
};

export type ConcoursGeneralBlock = {
  id: ConcoursGeneralTheme;
  title: string;
  description?: string;
  itemIds: string[];
};

export type ConcoursGeneralWeek = {
  id: string;
  title: string;
  description: string;

  niveauCible: "3e";
  durationMinutes: number;

  blocks: ConcoursGeneralBlock[];
};

export type ConcoursGeneralAnswer = {
  itemId: string;
  answer: string;
  isCorrect: boolean;
  score: number;
};

export type ConcoursGeneralSessionResult = {
  weekId: string;
  answers: ConcoursGeneralAnswer[];
  totalScore: number;
  maxScore: number;
  completedAt: string;
};