export type CoachBrevetNotionId =
  | "fractions"
  | "puissances"
  | "racines"
  | "relatifs"
  | "proportionnalite"
  | "pourcentages"
  | "calcul_litteral"
  | "equations"
  | "inegalites"
  | "pythagore"
  | "trigonometrie"
  | "thales"
  | "transformations"
  | "geometrie_espace"
  | "fonctions"
  | "statistiques"
  | "probabilites"
  | "synthese";

export type CoachBrevetFormat = "short" | "qcm" | "open";

export type CoachBrevetTheme =
  | "brevet"
  | "automatisme"
  | "piege"
  | "probleme"
  | "revision";

export type CoachBrevetDifficulty = 1 | 2 | 3 | 4 | 5;

export type CoachBrevetComparator =
  | "number_equal"
  | "exact"
  | "mcq_exact"
  | "fraction_equal";

export type CoachBrevetFixedItem = {
  kind: "fixed";
  id: string;
  niveau: "3e" | "college";
  matiere: "maths";
  notionId: CoachBrevetNotionId;
  microId: string;
  difficulty: CoachBrevetDifficulty;
  theme: CoachBrevetTheme;
  text: string;
  format: CoachBrevetFormat;
  choices?: string[];
  expected: string[];
  comparator: CoachBrevetComparator;
  hint?: string;
  explanation?: string;
  tags?: string[];
};

export type CoachBrevetTemplateItem = {
  kind: "template";
  id: string;
  niveau: "3e" | "college";
  matiere: "maths";
  notionId: CoachBrevetNotionId;
  microId: string;
  difficulty: CoachBrevetDifficulty;
  theme: CoachBrevetTheme;
  format: CoachBrevetFormat;
  generate: () => {
    text: string;
    choices?: string[];
    expected: string[];
    explanation?: string;
  };
  hint?: string;
  tags?: string[];
};

export type CoachBrevetItem = CoachBrevetFixedItem | CoachBrevetTemplateItem;

export type CoachBrevetProblemStep = {
  id: string;
  text: string;
  format: CoachBrevetFormat;
  choices?: string[];
  expected?: string[];
  hint?: string;
  explanation?: string;
};

export type CoachBrevetProblem = {
  id: string;
  title: string;
  notions: CoachBrevetNotionId[];
  difficulty: CoachBrevetDifficulty;
  durationMinutes: number;
  intro: string;
  steps: CoachBrevetProblemStep[];
};

export type CoachBrevetDay = {
  dayNumber: number;
  title: string;
  mainNotion: CoachBrevetNotionId;
  description: string;
  itemIds: string[];
  problemId?: string;
  expressSubjectId?: string;
};

export type CoachBrevetAnswerResult = {
  itemId: string;
  userAnswer: string;
  isCorrect: boolean;
  expected: string[];
};
