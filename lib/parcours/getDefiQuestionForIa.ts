import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { ParcoursNiveauIa, ParcoursQuestion, ParcoursQuestionItem } from "./types";
import { getIaNotions } from "./getIaNotions";

import { iaPixCollegeQuestionBank } from "@/lib/tutor-v4/questionBank/pix-college/ia";
import { iaPixLyceeQuestionBank } from "@/lib/tutor-v4/questionBank/pix-lycee/ia";

/** La banque du coach, la même exactement : une seule source de contenu. */
function getBank(niveau: ParcoursNiveauIa): TutorBankItemV4[] {
  return niveau === "lycee" ? iaPixLyceeQuestionBank : iaPixCollegeQuestionBank;
}

// Dans les banques, la bonne réponse est toujours en première position :
// on mélange une copie pour ne pas la trahir (et sans muter la banque).
function shuffleChoices(choices: readonly string[]): string[] {
  const arr = [...choices];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * ⚠️ LES GÉNÉRATEURS AUSSI, ET C'EST LE POINT (17/08/2026).
 *
 * Cette fonction rendait `null` sur un `template` : le parcours ne servait que
 * des items figés. Sur les anciennes banques cela se voyait peu — elles en
 * comptaient une majorité. Sur les banques Pix, ce serait ruineux : les 95
 * réservoirs portent l'essentiel du volume (868 questions distinctes contre
 * 325 items figés), et le parcours n'aurait rien vu de tout cela.
 *
 * En tirant dans les gabarits, le parcours devient REJOUABLE — et c'est ce qui
 * le distingue de l'évaluation blanche, qui pioche exprès dans des questions
 * figées pour rester comparable d'une fois sur l'autre.
 */
function toQuestionItem(item: TutorBankItemV4): ParcoursQuestionItem | null {
  const q =
    item.kind === "template"
      ? item.generate()
      : {
          text: item.text,
          format: item.format,
          expected: item.expected,
          choices: item.choices,
          comparator: item.comparator,
          explanation: item.explanation,
        };

  if (!q.text) return null;

  return {
    text: q.text,
    format: q.format ?? "qcm",
    expected: q.expected,
    choices: q.choices ? shuffleChoices(q.choices) : q.choices,
    comparator: q.comparator,
    hint: item.hint,
    explanation: q.explanation,
    audioSrc: item.kind === "fixed" ? item.audioSrc : undefined,
  };
}

export function getDefiQuestionsForIa(
  niveau: ParcoursNiveauIa,
  count: number
): ParcoursQuestion[] {
  const notions = getIaNotions(niveau);
  const bank = getBank(niveau);
  const questions: ParcoursQuestion[] = [];

  for (const notion of notions) {
    const items = bank
      .filter((item) => item.notionId === notion.id)
      .sort(() => Math.random() - 0.5);

    const item = items[0];
    if (!item) continue;

    const question = toQuestionItem(item);
    if (!question) continue;

    questions.push({
      classe: niveau as unknown as import("./types").ParcoursClasse,
      notionId: notion.id,
      notionLabel: notion.label,
      question,
    });
  }

  return questions.sort(() => Math.random() - 0.5).slice(0, count);
}
