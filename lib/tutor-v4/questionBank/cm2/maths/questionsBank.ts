import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { proportionnaliteCm2Bank } from "./proportionnalite.bank";

export const mathsCm2QuestionBank: TutorBankItemV4[] = [
  ...proportionnaliteCm2Bank,
];

export function getMathsCm2QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsCm2QuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
