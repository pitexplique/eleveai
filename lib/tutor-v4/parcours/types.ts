import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

export type ParcoursClasse = "6e" | "5e" | "4e" | "3e";

export type ParcoursStatus = "maitrise" | "a_revoir" | "fragile";

export type ParcoursNotion = {
  id: string;
  label: string;
  boId?: string;
  prerequis?: string[];
  levels?: number[];
};

export type ParcoursQuestionItem = TutorBankItemV4 & {
  text: string;
  format: "short" | "qcm" | "open";
  expected: string[];
  choices?: string[];
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