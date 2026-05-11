import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import type {
  ParcoursClasse,
  ParcoursQuestion,
  ParcoursQuestionItem,
} from "./types";

import { getClasseNotions } from "./getClasseNotions";

import { maths6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/maths";
import { maths5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/maths";
import { maths4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/maths";
import { maths3eQuestionBank } from "@/lib/tutor-v4/questionBank/3e/maths";

function getQuestionBank(classe: ParcoursClasse): TutorBankItemV4[] {
  if (classe === "6e") return maths6eQuestionBank;
  if (classe === "5e") return maths5eQuestionBank;
  if (classe === "4e") return maths4eQuestionBank;
  if (classe === "3e") return maths3eQuestionBank;

  return [];
}

function materializeQuestion(
  item: TutorBankItemV4
): ParcoursQuestionItem | null {
  if (item.kind === "template") {
    const generated = item.generate();

    return {
      ...item,
      ...generated,
      kind: "fixed",
    } as ParcoursQuestionItem;
  }

  return item as ParcoursQuestionItem;
}

export function getDefiQuestionForNotion(args: {
  classe: ParcoursClasse;
  notionId: string;
}): ParcoursQuestion | null {
  const notions = getClasseNotions(args.classe);

  const notion = notions.find((n) => n.id === args.notionId);

  if (!notion) return null;

  const bank = getQuestionBank(args.classe);

  const candidates = bank.filter(
    (item) =>
      item.notionId === args.notionId &&
      item.difficulty === 3
  );

  if (candidates.length === 0) return null;

  const selected =
    candidates[Math.floor(Math.random() * candidates.length)];

  const question = materializeQuestion(selected);

  if (!question?.expected || !question.text) {
    return null;
  }

  return {
    classe: args.classe,
    notionId: args.notionId,
    notionLabel: notion.label,
    question,
  };
}