import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { algorithmiqueSecondeBank } from "./algorithmique.bank";
import { fonctionsSecondeBank } from "./fonctions.bank";
import { geometrieSecondeBank } from "./geometrie.bank";
import { nombresCalculsSecondeBank } from "./nombres-calculs.bank";
import { statistiquesProbabilitesSecondeBank } from "./statistiques-probabilites.bank";

export const mathsSecondeQuestionBank: TutorBankItemV4[] = [
  ...nombresCalculsSecondeBank,
  ...geometrieSecondeBank,
  ...fonctionsSecondeBank,
  ...statistiquesProbabilitesSecondeBank,
  ...algorithmiqueSecondeBank,
];

export function getMathsSecondeQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsSecondeQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
