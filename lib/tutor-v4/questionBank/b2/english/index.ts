import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { verbsB2Bank } from "./verbs.bank";
import { proofB2Bank } from "./proof.bank";
import { analysisB2Bank } from "./analysis.bank";
import { sportVerbsB2Bank } from "./sport_verbs.bank";
import { sportScienceB2Bank } from "./sport_science.bank";
import { sportDataB2Bank } from "./sport_data.bank";

export const englishB2QuestionBank: TutorBankItemV4[] = [
  ...verbsB2Bank,
  ...proofB2Bank,
  ...analysisB2Bank,
  ...sportVerbsB2Bank,
  ...sportScienceB2Bank,
  ...sportDataB2Bank,
];

export function getEnglishB2QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = englishB2QuestionBank;
  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId)  bank = bank.filter((item) => item.microId  === args.microId);
  return bank;
}
