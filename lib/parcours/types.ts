import type {
  QuestionFormat,
  ComparatorName,
} from "@/lib/tutor-v4/types";

import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";

export type ParcoursClasse =
  | "cp"
  | "ce1"
  | "ce2"
  | "cm1"
  | "cm2"
  | "6e"
  | "5e"
  | "4e"
  | "3e"
  | "terminale-spe"
  | "adulte";

export type ParcoursNiveauEnglish = "a1" | "a2" | "b1" | "b2";

export type ParcoursStatus = "maitrise" | "a_revoir" | "fragile";

export type ParcoursNotion = {
  id: string;
  label: string;
  boId?: string;
  prerequis?: string[];
  levels?: number[];
};

export type ParcoursQuestionItem = {
  text: string;
  format: QuestionFormat;
  expected: string[];
  choices?: string[];
  comparator?: ComparatorName;
  hint?: string;
  explanation?: string;
  canvas?: CanvasFigure;
  audioSrc?: string;
};

export type ParcoursQuestion = {
  classe: ParcoursClasse;
  notionId: string;
  notionLabel: string;
  question: ParcoursQuestionItem;
};

export type ParcoursAnswer = {
  notionId: string;
  userAnswer: string;
  expected: string[];
  isCorrect: boolean;
};

export type ParcoursNotionScore = {
  notionId: string;
  notionLabel: string;
  score: number;
  maxScore: number;
  status: ParcoursStatus;
};

export type ParcoursResult = {
  classe: ParcoursClasse;
  scores: ParcoursNotionScore[];
};
