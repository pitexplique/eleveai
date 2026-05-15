import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { getMathCm1QuestionBank } from "@/lib/tutor-v4/questionBank/cm1/maths";
import { getMathCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/maths";
import { getMaths6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/maths";
import { getMaths5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/maths";
import { getMaths4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/maths";
import { getMaths3eQuestionBank } from "@/lib/tutor-v4/questionBank/3e/maths";

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
  if (args.matiere !== "maths") {
    return [];
  }

  const bankArgs: GetQuestionBankArgs = {
    notionId: args.notionId,
    microId: args.microId,
  };

  switch (args.classe) {

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

    default:
      return [];
  }
}