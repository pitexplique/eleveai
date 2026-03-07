import { bank6eMaths } from "@/lib/tutor/questionBank/college/6e";
import type { BankItem } from "@/lib/tutor/types";

export async function loadQuestionBank(classe: string, matiere: string): Promise<BankItem[]> {
  if (classe !== "6e" || matiere !== "maths") {
    throw new Error("Seule la banque 6e/maths est disponible dans cette V2.");
  }

  return bank6eMaths;
}