// lib/coach-bac-spe/types.ts

export type CoachBacNotionId =
  | "derivees"
  | "suites"
  | "fonctions"
  | "limites"
  | "exponentielle"
  | "logarithme"
  | "probabilites"
  | "variables_aleatoires"
  | "geometrie_espace"
  | "algorithmique"
  | "synthese";

export type CoachBacFormat = "short" | "qcm" | "open";

export type CoachBacComparator =
  | "exact"
  | "number_equal"
  | "mcq_exact"
  | "contains_keywords";

export type CoachBacDifficulty = 1 | 2 | 3 | 4 | 5;

export type CoachBacTheme =
  | "bac"
  | "automatisme"
  | "piege"
  | "probleme"
  | "revision";

export type CoachBacItemBase = {
  id: string;
  niveau: "terminale";
  matiere: "maths";
  notionId: CoachBacNotionId;
  microId: string;
  difficulty: CoachBacDifficulty;
  theme: CoachBacTheme;
  tags: string[];
  hint?: string;
  explanation?: string;
};

export type CoachBacFixedItem = CoachBacItemBase & {
  kind: "fixed";
  text: string;
  format: CoachBacFormat;
  choices?: string[];
  expected: string[];
  comparator: CoachBacComparator;
};

export type CoachBacGeneratedQuestion = {
  text: string;
  format: CoachBacFormat;
  choices?: string[];
  expected: string[];
  comparator: CoachBacComparator;
  hint?: string;
  explanation?: string;
  tags?: string[];
};

export type CoachBacTemplateItem = CoachBacItemBase & {
  kind: "template";
  generate: () => CoachBacGeneratedQuestion;
};

export type CoachBacItem = CoachBacFixedItem | CoachBacTemplateItem;

export type CoachBacRuntimeItem = CoachBacItemBase & {
  kind: "runtime";
  sourceId: string;
  text: string;
  format: CoachBacFormat;
  choices?: string[];
  expected: string[];
  comparator: CoachBacComparator;
};

export type CoachBacProblemStep = {
  id: string;
  text: string;
  format: CoachBacFormat;
  choices?: string[];
  expected?: string[];
  comparator?: CoachBacComparator;
  hint?: string;
  explanation?: string;
};

export type CoachBacProblem = {
  id: string;
  title: string;
  notions: CoachBacNotionId[];
  difficulty: CoachBacDifficulty;
  durationMinutes?: number;
  intro?: string;
  steps: CoachBacProblemStep[];
  tags: string[];
};

export type CoachBacDay = {
  id: string;
  dayNumber: number;
  title: string;
  mainNotion: CoachBacNotionId;
  description?: string;
  itemIds: string[];
  problemId?: string;
  expressSubjectId?: string;
};

export type CoachBacAnswerResult = {
  isCorrect: boolean;
  normalizedAnswer: string;
  expected: string[];
  feedback: string;
};