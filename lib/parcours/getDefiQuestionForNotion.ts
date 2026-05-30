import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import type {
  ParcoursClasse,
  ParcoursQuestion,
  ParcoursQuestionItem,
} from "./types";

import { getClasseNotions } from "./getClasseNotions";

import { mathsCm1QuestionBank } from "@/lib/tutor-v4/questionBank/cm1/maths";
import { mathsCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/maths";
import { maths6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/maths";
import { maths5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/maths";
import { maths4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/maths";
import { maths3eQuestionBank } from "@/lib/tutor-v4/questionBank/3e/maths";
import { mathsTerminaleSpeQuestionBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths";

function getQuestionBank(classe: ParcoursClasse): TutorBankItemV4[] {
  if (classe === "cm1") return mathsCm1QuestionBank;
  if (classe === "cm2") return mathsCm2QuestionBank;
  if (classe === "6e") return maths6eQuestionBank;
  if (classe === "5e") return maths5eQuestionBank;
  if (classe === "4e") return maths4eQuestionBank;
  if (classe === "3e") return maths3eQuestionBank;
  if (classe === "terminale-spe") return mathsTerminaleSpeQuestionBank;

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

export type ParcoursDifficulteMode = "revision" | "defi";

export function getDefiQuestionForNotion(args: {
  classe: ParcoursClasse;
  notionId: string;
  mode?: ParcoursDifficulteMode;
}): ParcoursQuestion | null {
  const notions = getClasseNotions(args.classe);

  const notion = notions.find((n) => n.id === args.notionId);

  if (!notion) return null;

  const bank = getQuestionBank(args.classe);

  const minDiff = args.mode === "defi" ? 3 : 1;
  const maxDiff = args.mode === "defi" ? 5 : 3;

  const candidates = bank.filter(
    (item) =>
      item.notionId === args.notionId &&
      item.difficulty >= minDiff &&
      item.difficulty <= maxDiff &&
      (item.kind === "template" || item.format !== "open")
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