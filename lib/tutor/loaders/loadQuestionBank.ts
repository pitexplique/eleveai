import { questions6eMaths } from "@/lib/tutor/questionBank/college/6e.maths.questions";
import type { QuestionDefinition } from "@/lib/tutor/types";

export async function loadQuestionBank(classe: string, matiere: string): Promise<QuestionDefinition[]> {
  if (classe !== "6e" || matiere !== "maths") {
    throw new Error("Seule la banque 6e/maths est disponible dans cette V2.");
  }

  return questions6eMaths;
}