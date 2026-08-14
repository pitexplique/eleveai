import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// Banques par notion du module spécifique de Première (élèves sans spé maths).
//
// ⚠️ VIDE AU 14/08/2026. La structure (bo → notions → micro-compétences) est
// posée, les banques restent à écrire, notion par notion. Tant que ce tableau
// est vide, la classe apparaît dans le coach mais aucune question ne tombe :
// ne pas l'annoncer aux élèves avant d'avoir écrit de quoi travailler.

export const mathsPremiereQuestionBank: TutorBankItemV4[] = [];

export function getMathsPremiereQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsPremiereQuestionBank;
  if (args?.notionId) bank = bank.filter((i) => i.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((i) => i.microId === args.microId);
  return bank;
}
