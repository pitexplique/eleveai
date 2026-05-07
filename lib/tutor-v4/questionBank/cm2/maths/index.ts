import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { proportionnaliteBank } from "./proportionnalite.bank";

export const mathsCm2QuestionBank: TutorBankItemV4[] = [
  ...proportionnaliteBank,

];

export function getMathCm2QuestionBank(args?: {
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