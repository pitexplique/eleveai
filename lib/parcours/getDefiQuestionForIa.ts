import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { ParcoursNiveauIa, ParcoursQuestion, ParcoursQuestionItem } from "./types";
import { getIaNotions } from "./getIaNotions";

import { iaA1QuestionBank } from "@/lib/tutor-v4/questionBank/a1/ia";
import { iaA2QuestionBank } from "@/lib/tutor-v4/questionBank/a2/ia";
import { iaB1QuestionBank } from "@/lib/tutor-v4/questionBank/b1/ia";
import { iaB2QuestionBank } from "@/lib/tutor-v4/questionBank/b2/ia";
import { iaC1QuestionBank } from "@/lib/tutor-v4/questionBank/c1/ia";

function getBank(niveau: ParcoursNiveauIa): TutorBankItemV4[] {
  switch (niveau) {
    case "a1": return iaA1QuestionBank;
    case "a2": return iaA2QuestionBank;
    case "b1": return iaB1QuestionBank;
    case "b2": return iaB2QuestionBank;
    case "c1": return iaC1QuestionBank;
  }
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

function toQuestionItem(item: TutorBankItemV4): ParcoursQuestionItem | null {
  if (item.kind === "template") return null;

  return {
    text: item.text,
    format: item.format,
    expected: item.expected,
    choices: item.choices ? shuffleChoices(item.choices) : item.choices,
    comparator: item.comparator,
    hint: item.hint,
    explanation: item.explanation,
    audioSrc: item.audioSrc,
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
      .filter((item) => item.notionId === notion.id && item.kind === "fixed")
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
