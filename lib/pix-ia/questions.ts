import type { PixPalier } from "./referentiel";
import { PIX_COMPETENCES } from "./referentiel";
import { pixMicroskill } from "./microskills";
import {
  type PixQuestion,
  type PixEvalQuestion,
  competenceOf,
  questionId,
  shuffle,
} from "./questionTypes";
import { d1Questions } from "./questions/d1";
import { d2Questions } from "./questions/d2";
import { d3Questions } from "./questions/d3";

export type { PixQuestion, PixEvalQuestion };
export { questionId };

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
    id: questionId(q),
    competenceId: competenceOf(q.microskillId),
    palier: palierOf(q),
    correct: q.choices[0],
    shuffledChoices: shuffle(q.choices),
  };
}

// Tire une question dans un sous-ensemble, en privilégiant celles PAS encore
// vues (anti-répétition). Si toutes ont été vues, repart du pool complet.
function pickUnseen(pool: PixQuestion[], seen: Set<string>): PixQuestion {
  const fresh = pool.filter((q) => !seen.has(questionId(q)));
  const from = fresh.length > 0 ? fresh : pool;
  return from[Math.floor(Math.random() * from.length)];
}

// Éval blanche : 1 question (palier N/I) par compétence du référentiel (16),
// ordre des domaines conservé, choix mélangés. `seenIds` = questions déjà vues
// lors des entraînements précédents → l'éval privilégie des questions inédites.
export function getEvalBlanchePixIa(seenIds: Iterable<string> = []): PixEvalQuestion[] {
  const seen = new Set(seenIds);
  const pool = questionsForPaliers(COLLEGE_PALIERS);
  const out: PixEvalQuestion[] = [];
  for (const comp of PIX_COMPETENCES) {
    const candidates = pool.filter((q) => competenceOf(q.microskillId) === comp.id);
    if (candidates.length === 0) continue;
    out.push(toEval(pickUnseen(candidates, seen)));
  }
  return out;
}

// Combien de questions distinctes possibles par compétence (pour info / UI).
export function poolSizeByCompetence(): Record<string, number> {
  const pool = questionsForPaliers(COLLEGE_PALIERS);
  const out: Record<string, number> = {};
  for (const comp of PIX_COMPETENCES) {
    out[comp.id] = pool.filter((q) => competenceOf(q.microskillId) === comp.id).length;
  }
  return out;
}
