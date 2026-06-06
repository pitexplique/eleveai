import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { ParcoursNiveauEnglish, ParcoursQuestion, ParcoursQuestionItem } from "./types";
import { getEnglishNotions } from "./getEnglishNotions";

import { englishA1QuestionBank } from "@/lib/tutor-v4/questionBank/a1/english";
import { englishA2QuestionBank } from "@/lib/tutor-v4/questionBank/a2/english";
import { englishB1QuestionBank } from "@/lib/tutor-v4/questionBank/b1/english";
import { englishB2QuestionBank } from "@/lib/tutor-v4/questionBank/b2/english";

function getBank(niveau: ParcoursNiveauEnglish): TutorBankItemV4[] {
  switch (niveau) {
    case "a1": return englishA1QuestionBank;
    case "a2": return englishA2QuestionBank;
    case "b1": return englishB1QuestionBank;
    case "b2": return englishB2QuestionBank;
  }
}

function toQuestionItem(item: TutorBankItemV4): ParcoursQuestionItem | null {
  if (item.kind === "template") return null;

  return {
    text: item.text,
    format: item.format,
    expected: item.expected,
    choices: item.choices,
    comparator: item.comparator,
    hint: item.hint,
    explanation: item.explanation,
  };
}

export function getDefiQuestionsForEnglish(
  niveau: ParcoursNiveauEnglish,
  count: number
): ParcoursQuestion[] {
  const notions = getEnglishNotions(niveau);
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
