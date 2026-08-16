import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import type {
  ParcoursClasse,
  ParcoursQuestion,
  ParcoursQuestionItem,
} from "./types";

import { getClasseNotions } from "./getClasseNotions";

import { mathsCpQuestionBank } from "@/lib/tutor-v4/questionBank/cp/maths";
import { mathsCe1QuestionBank } from "@/lib/tutor-v4/questionBank/ce1/maths";
import { mathsCe2QuestionBank } from "@/lib/tutor-v4/questionBank/ce2/maths";
import { mathsCm1QuestionBank } from "@/lib/tutor-v4/questionBank/cm1/maths";
import { mathsCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/maths";
import { maths6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/maths";
import { maths5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/maths";
import { maths4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/maths";
import { maths3eQuestionBank } from "@/lib/tutor-v4/questionBank/3e/maths";
import { mathsSecondeQuestionBank } from "@/lib/tutor-v4/questionBank/seconde/maths";
import { mathsPremiereSpeQuestionBank } from "@/lib/tutor-v4/questionBank/premiere-spe/maths";
import { mathsTerminaleSpeQuestionBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths";
import { mathsAdulteQuestionBank } from "@/lib/tutor-v4/questionBank/adulte/maths";
import { mathsStmgQuestionBank } from "@/lib/tutor-v4/questionBank/stmg/maths";

function getQuestionBank(classe: ParcoursClasse): TutorBankItemV4[] {
  if (classe === "cp") return mathsCpQuestionBank;
  if (classe === "ce1") return mathsCe1QuestionBank;
  if (classe === "ce2") return mathsCe2QuestionBank;
  if (classe === "cm1") return mathsCm1QuestionBank;
  if (classe === "cm2") return mathsCm2QuestionBank;
  if (classe === "6e") return maths6eQuestionBank;
  if (classe === "5e") return maths5eQuestionBank;
  if (classe === "4e") return maths4eQuestionBank;
  if (classe === "3e") return maths3eQuestionBank;
  if (classe === "seconde") return mathsSecondeQuestionBank;
  if (classe === "premiere-spe") return mathsPremiereSpeQuestionBank;
  if (classe === "terminale-spe") return mathsTerminaleSpeQuestionBank;
  if (classe === "stmg") return mathsStmgQuestionBank;
  if (classe === "adulte") return mathsAdulteQuestionBank;

  // ⚠️ Ce `return []` est un REPLI MUET : une classe oubliée ici rend un
  // parcours sans aucune question, sans lever d'erreur. Le parcours tient sa
  // propre liste de banques, séparée de `loadQuestionBankV4` — brancher une
  // classe dans le coach ne la branche PAS ici. Les deux listes se vérifient
  // ensemble.
  return [];
}

// Dans les banques, la bonne réponse est souvent en première position :
// on mélange une copie des choix pour ne pas la trahir (sans muter la banque).
function shuffleChoices(choices: readonly string[]): string[] {
  const arr = [...choices];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function materializeQuestion(
  item: TutorBankItemV4
): ParcoursQuestionItem | null {
  let question: ParcoursQuestionItem;

  if (item.kind === "template") {
    const generated = item.generate();

    question = {
      ...item,
      ...generated,
      kind: "fixed",
    } as ParcoursQuestionItem;
  } else {
    question = item as ParcoursQuestionItem;
  }

  if (question.choices && question.choices.length > 1) {
    question = { ...question, choices: shuffleChoices(question.choices) };
  }

  return question;
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
