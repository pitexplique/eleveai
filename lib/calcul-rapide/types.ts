// lib/calcul-rapide/types.ts

// ⚠️ CETTE LISTE EST LA SOURCE. Trois autres endroits doivent la suivre, et
// aucun n'est vérifié par le compilateur :
//   1. `app/calcul-rapide/CalculRapideClient.tsx` — les boutons de la page ;
//   2. `app/calcul-rapide/defi/CalculRapideDefiClient.tsx` — les imports de
//      banques, `getDataByNiveau` et la validation du paramètre d'URL ;
//   3. `lib/matrice/ressources.ts`, entrée « calcul-rapide » — sans quoi le
//      niveau existe mais n'est jamais recommandé à personne. C'est ce qui
//      était arrivé à « Terminale spé », en ligne depuis toujours.
//
// Les slugs sont ceux du coach (`Classe` dans app/coach-ia/[matiere]) une fois
// passés en minuscules : le bouton « M'entraîner » de fin de défi tombe donc
// sur la bonne classe.
export type NiveauCalculRapide =
  | "CP"
  | "CE1"
  | "CE2"
  | "CM1"
  | "CM2"
  | "6e"
  | "5e"
  | "4e"
  | "3e"
  | "seconde"
  | "premiere-spe"
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
