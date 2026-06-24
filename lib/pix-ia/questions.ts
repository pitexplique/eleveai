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
import { lyceeQuestions } from "./questions/lycee";

export type { PixQuestion, PixEvalQuestion };
export { questionId };

// Banque complète, mappée par microskill (ref. lib/pix-ia/microskills.ts).
export const PIX_IA_QUESTIONS: PixQuestion[] = [
  ...d1Questions,
  ...d2Questions,
  ...d3Questions,
  ...lyceeQuestions,
];

export type PixNiveau = "college" | "lycee";

export const COLLEGE_PALIERS: PixPalier[] = ["novice", "independant"];
export const LYCEE_PALIERS: PixPalier[] = ["avance", "expert"];

function palidersForNiveau(niveau: PixNiveau): PixPalier[] {
  return niveau === "lycee" ? LYCEE_PALIERS : COLLEGE_PALIERS;
}

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

// Éval blanche : 1 question par compétence du référentiel (16), ordre des
// domaines conservé, choix mélangés. `niveau` = college (N/I) ou lycee (A/E).
// `seenIds` = questions déjà vues → on privilégie des questions inédites.
// Repli : si une compétence n'a aucune question du niveau demandé (ex. 3.4 en
// lycée), on bascule sur le pool collège pour ne pas laisser de trou.
export function getEvalBlanchePixIa(
  seenIds: Iterable<string> = [],
  niveau: PixNiveau = "college"
): PixEvalQuestion[] {
  const seen = new Set(seenIds);
  const wanted = questionsForPaliers(palidersForNiveau(niveau));
  const fallback = questionsForPaliers(COLLEGE_PALIERS);
  const out: PixEvalQuestion[] = [];
  for (const comp of PIX_COMPETENCES) {
    let candidates = wanted.filter((q) => competenceOf(q.microskillId) === comp.id);
    if (candidates.length === 0) {
      candidates = fallback.filter((q) => competenceOf(q.microskillId) === comp.id);
    }
    if (candidates.length === 0) continue;
    out.push(toEval(pickUnseen(candidates, seen)));
  }
  return out;
}

// Combien de questions distinctes possibles par compétence pour un niveau.
export function poolSizeByCompetence(niveau: PixNiveau = "college"): Record<string, number> {
  const pool = questionsForPaliers(palidersForNiveau(niveau));
  const out: Record<string, number> = {};
  for (const comp of PIX_COMPETENCES) {
    out[comp.id] = pool.filter((q) => competenceOf(q.microskillId) === comp.id).length;
  }
  return out;
}
