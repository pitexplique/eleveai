import { bank6eMaths } from "@/lib/tutor/questionBank";
import type { BankItem } from "@/lib/tutor/types";

export async function loadQuestionBank(
  classe: string,
  matiere: string
): Promise<BankItem[]> {
  if (classe !== "6e" || matiere !== "maths") {
    throw new Error("Seule la banque 6e/maths est disponible pour le moment.");
  }

  return bank6eMaths;
}