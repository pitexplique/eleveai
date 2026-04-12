import { maths6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/maths";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

export async function loadQuestionBankV4(
  classe: string,
  matiere: string
): Promise<TutorBankItemV4[]> {
  if (matiere !== "maths") {
    throw new Error(`QuestionBank V4 introuvable pour ${classe}/${matiere}`);
  }

  if (classe === "6e") {
    return maths6eQuestionBank;
  }

  if (classe === "5e") {
    // Proposition temporaire : fallback sur la banque 6e,
    // le temps d'ajouter les .bank 5e dédiés.
    return maths6eQuestionBank;
  }

  throw new Error(`QuestionBank V4 introuvable pour ${classe}/${matiere}`);
}
