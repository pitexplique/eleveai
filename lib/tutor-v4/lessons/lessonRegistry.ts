import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { getFrancaisCpQuestionBank } from "@/lib/tutor-v4/questionBank/cp/francais";
import { getFrancaisCe1QuestionBank } from "@/lib/tutor-v4/questionBank/ce1/francais";
import { getFrancaisCe2QuestionBank } from "@/lib/tutor-v4/questionBank/ce2/francais";
import { getFrancaisCm1QuestionBank } from "@/lib/tutor-v4/questionBank/cm1/francais";
import { getFrancaisCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/francais";
import { getFrancais6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/francais";
import { getFrancais5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/francais";
import { getFrancais4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/francais";
import { getFrancais3eQuestionBank } from "@/lib/tutor-v4/questionBank/3e/francais";
import { getMathCpQuestionBank } from "@/lib/tutor-v4/questionBank/cp/maths";
import { getMathCe1QuestionBank } from "@/lib/tutor-v4/questionBank/ce1/maths";
import { getMathCe2QuestionBank } from "@/lib/tutor-v4/questionBank/ce2/maths";
import { getMathCm1QuestionBank } from "@/lib/tutor-v4/questionBank/cm1/maths";
import { getMathCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/maths";
import { getMaths6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/maths";
import { getMaths5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/maths";
import { getMaths4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/maths";
import { getMaths3eQuestionBank } from "@/lib/tutor-v4/questionBank/3e/maths";
import { getMathTerminaleSpeQuestionBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths";

type GetQuestionBankArgs = {
  notionId: string;
  microId?: string | null;
};

export function getLessonBank(args: {
  classe: string;
  matiere: string;
  notionId: string;
  microId?: string | null;
}): TutorBankItemV4[] {
  const bankArgs: GetQuestionBankArgs = {
    notionId: args.notionId,
    microId: args.microId,
  };

  if (args.matiere === "francais") {
    switch (args.classe) {
      case "cp":  return getFrancaisCpQuestionBank(bankArgs);
      case "ce1": return getFrancaisCe1QuestionBank(bankArgs);
      case "ce2": return getFrancaisCe2QuestionBank(bankArgs);
      case "cm1": return getFrancaisCm1QuestionBank(bankArgs);
      case "cm2": return getFrancaisCm2QuestionBank(bankArgs);
      case "6e": return getFrancais6eQuestionBank(bankArgs);
      case "5e": return getFrancais5eQuestionBank(bankArgs);
      case "4e": return getFrancais4eQuestionBank(bankArgs);
      case "3e": return getFrancais3eQuestionBank(bankArgs);
      default:    return [];
    }
  }

  if (args.matiere !== "maths") {
    return [];
  }

  switch (args.classe) {
    case "cp":
      return getMathCpQuestionBank(bankArgs);

    case "ce1":
      return getMathCe1QuestionBank(bankArgs);

    case "ce2":
      return getMathCe2QuestionBank(bankArgs);

    case "cm1":
      return getMathCm1QuestionBank(bankArgs);

    case "cm2":
      return getMathCm2QuestionBank(bankArgs);

    case "6e":
      return getMaths6eQuestionBank(bankArgs);

    case "5e":
      return getMaths5eQuestionBank(bankArgs);

    case "4e":
      return getMaths4eQuestionBank(bankArgs);

    case "3e":
      return getMaths3eQuestionBank(bankArgs);

    case "terminale-spe":
      return getMathTerminaleSpeQuestionBank(bankArgs);

    default:
      return [];
  }
}
