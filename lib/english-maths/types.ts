// lib/english-maths/types.ts

export type EnglishMathsNiveau =
  | "cm1"
  | "cm2"
  | "6e"
  | "5e"
  | "4e"
  | "3e";

export type EnglishMathsCategory =
  | "numbers"
  | "operations"
  | "geometry"
  | "fractions"
  | "measures"
  | "data-probability"
  | "algebra"
  | "functions";

export type EnglishMathsWord = {
  id: string;
  category: EnglishMathsCategory;

  english: string;
  french: string;

  image: string;

  audioWordSrc: string;
  audioSentenceSrc?: string;

  sentenceEn: string;
  sentenceFr: string;
};

export type EnglishMathsDay = {
  id: string;
  niveau: EnglishMathsNiveau;

  week: string;
  dayIndex: number;
  dayLabel: string;

  title: string;
  theme: string;

  wordIds: string[];
};

export type EnglishMathsQuestionFormat =
  | "qcm_en_to_fr"
  | "qcm_fr_to_en"
  | "listen"
  | "image"
  | "complete";

export type EnglishMathsQuestion = {
  id: string;
  format: EnglishMathsQuestionFormat;

  wordId: string;

  question: string;
  choices: string[];
  expected: string;

  audioSrc?: string;
  image?: string;
};