// lib/english-maths/types.ts

export type EnglishMathsLanguageLevel = "A1" | "A2" | "B1" | "B2";
export type EnglishMathsNiveau = EnglishMathsLanguageLevel;

export type EnglishMathsCategory =
  | "numbers"
  | "operations"
  | "verbs"
  | "geometry"
  | "fractions"
  | "measures"
  | "data-probability"
  | "algebra"
  | "functions";

export type EnglishMathsWord = {
  id: string;
  category: EnglishMathsCategory;
  languageLevel?: EnglishMathsLanguageLevel;

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
  languageLevel?: EnglishMathsLanguageLevel;

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
