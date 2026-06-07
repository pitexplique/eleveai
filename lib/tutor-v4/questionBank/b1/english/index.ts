import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { verbsB1Bank } from "./verbs.bank";
import { algebraB1Bank } from "./algebra.bank";
import { statisticsB1Bank } from "./statistics.bank";
import { reasoningB1Bank } from "./reasoning.bank";

export const englishB1QuestionBank: TutorBankItemV4[] = [
  ...verbsB1Bank,
  ...algebraB1Bank,
  ...statisticsB1Bank,
  ...reasoningB1Bank,
];

export function getEnglishB1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = englishB1QuestionBank;
  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId)  bank = bank.filter((item) => item.microId  === args.microId);
  return bank;
}
