import type { PixPalier } from "./referentiel";
import { PIX_COMPETENCES } from "./referentiel";
import { pixMicroskill } from "./microskills";
import {
  type PixQuestion,
  type PixEvalQuestion,
  competenceOf,
  shuffle,
} from "./questionTypes";
import { d1Questions } from "./questions/d1";
import { d2Questions } from "./questions/d2";
import { d3Questions } from "./questions/d3";

export type { PixQuestion, PixEvalQuestion };

// Banque complète, mappée par microskill (ref. lib/pix-ia/microskills.ts).
export const PIX_IA_QUESTIONS: PixQuestion[] = [
  ...d1Questions,
  ...d2Questions,
  ...d3Questions,
];

const COLLEGE_PALIERS: PixPalier[] = ["novice", "independant"];

function palierOf(q: PixQuestion): PixPalier | undefined {
  return pixMicroskill(q.microskillId)?.palier;
}

// Questions d'un palier donné (par défaut N/I = collège).
export function questionsForPaliers(paliers: PixPalier[] = COLLEGE_PALIERS): PixQuestion[] {
  return PIX_IA_QUESTIONS.filter((q) => {
    const p = palierOf(q);
    return p !== undefined && paliers.includes(p);
  });
}

function toEval(q: PixQuestion): PixEvalQuestion {
  return {
    ...q,
    competenceId: competenceOf(q.microskillId),
    palier: palierOf(q),
    correct: q.choices[0],
    shuffledChoices: shuffle(q.choices),
  };
}

// Éval blanche : 1 question (palier N/I) par compétence du référentiel (16),
// ordre des domaines conservé, choix de chaque question mélangés.
export function getEvalBlanchePixIa(): PixEvalQuestion[] {
  const pool = questionsForPaliers(COLLEGE_PALIERS);
  const out: PixEvalQuestion[] = [];
  for (const comp of PIX_COMPETENCES) {
    const candidates = pool.filter((q) => competenceOf(q.microskillId) === comp.id);
    if (candidates.length === 0) continue;
    const q = candidates[Math.floor(Math.random() * candidates.length)];
    out.push(toEval(q));
  }
  return out;
}
