import { maths6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/maths";
import { maths5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/maths";
import { maths4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/maths";
import { } from "@/lib/tutor-v4/questionBank/4e/maths";


import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

export async function loadQuestionBankV4(
  classe: string,
  matiere: string
): Promise<TutorBankItemV4[]> {
  if (classe === "6e" && matiere === "maths") {
    return maths6eQuestionBank;
  }

  if (classe === "5e" && matiere === "maths") {
    return maths5eQuestionBank;
  }

    if (classe === "4e" && matiere === "maths") {
    return maths4eQuestionBank;
  }

  throw new Error(`QuestionBank V4 introuvable pour ${classe}/${matiere}`);
}