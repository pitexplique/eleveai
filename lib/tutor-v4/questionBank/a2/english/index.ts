import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { verbsA2Bank } from "./verbs.bank";
import { expressionsA2Bank } from "./expressions.bank";
import { fractionsA2Bank } from "./fractions.bank";
import { geometryA2Bank } from "./geometry.bank";

export const englishA2QuestionBank: TutorBankItemV4[] = [
  ...verbsA2Bank,
  ...expressionsA2Bank,
  ...fractionsA2Bank,
  ...geometryA2Bank,
];

export function getEnglishA2QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = englishA2QuestionBank;
  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId)  bank = bank.filter((item) => item.microId  === args.microId);
  return bank;
}
