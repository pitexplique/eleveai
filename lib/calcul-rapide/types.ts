// lib/calcul-rapide/types.ts

export type NiveauCalculRapide =
  | "CM1"
  | "CM2"
  | "6e"
  | "5e"
  | "4e"
  | "3e"
  | "terminale-spe"
  | "adulte";

export type CalculRapideItemType = "calcul" | "probleme" | "boss";
export type CalculRapideMode = "fixed" | "template";

export type CalculRapideMedia = {
  text: string;
  image?: string;
  audio?: {
    src: string;
    autoPlay?: boolean;
  };
};

export type CalculRapideItem = {
  id: string;
  niveau: NiveauCalculRapide;
  type: CalculRapideItemType;
  mode: CalculRapideMode;

  notionId: string;
  microId: string;

  difficulty: 1 | 2 | 3 | 4 | 5;
  durationSec: number;

  media: CalculRapideMedia;

  expected?: string[];

  template?: string;
  variables?: Record<string, unknown>;
  answerRule?: string;

  hint?: string;
  explanation?: string;
  explanationTemplate?: string;

  tags?: string[];
};

export type CalculRapideDay =
  | "lundi"
  | "mardi"
  | "mercredi"
  | "jeudi"
  | "vendredi"
  | "samedi"
  | "dimanche";
  

export type CalculRapideSession = {
  id: string;
  niveau: NiveauCalculRapide;
  day: CalculRapideDay;
  title: string;
  theme: string;
  durationTotalSec: number;
  itemIds: string[];
};

export type CalculRapideWeek = {
  id: string;
  niveau: NiveauCalculRapide;
  week: string;
  title: string;
  themeDominant: string;
  sessions: CalculRapideSession[];
};
