import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { verbsB1Bank } from "./verbs.bank";

export const englishB1QuestionBank: TutorBankItemV4[] = [...verbsB1Bank];

export function getEnglishB1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = englishB1QuestionBank;
  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId)  bank = bank.filter((item) => item.microId  === args.microId);
  return bank;
}
