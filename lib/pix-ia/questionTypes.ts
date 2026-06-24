import type { PixPalier } from "./referentiel";

// Une question est rattachée à un microskill (`microskillId`, ex. "1.4.2").
// La compétence (ex. "1.4") et le domaine s'en déduisent. Convention :
// la BONNE réponse est toujours en 1ère position de `choices` (mélangée à
// l'affichage par `shuffle`).

export type PixQuestion = {
  microskillId: string;
  text: string;
  choices: string[]; // choices[0] = bonne réponse
  explanation?: string;
};

export type PixEvalQuestion = PixQuestion & {
  competenceId: string;
  palier?: PixPalier;
  correct: string;
  shuffledChoices: string[];
};

// "1.4.2" -> "1.4"
export function competenceOf(microskillId: string): string {
  return microskillId.split(".").slice(0, 2).join(".");
}

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
