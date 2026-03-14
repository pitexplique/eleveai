import { maths6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/maths";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

export async function loadQuestionBankV4(
  classe: string,
  matiere: string
): Promise<TutorBankItemV4[]> {
  if (classe === "6e" && matiere === "maths") {
    return maths6eQuestionBank;
  }

  throw new Error(`QuestionBank V4 introuvable pour ${classe}/${matiere}`);
}