import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/ce1/microSkills";
import { buildCycle2QuestionBank } from "@/lib/tutor-v4/questionBank/cycle2/maths/buildCycle2Bank";

export const mathsCe1QuestionBank: TutorBankItemV4[] =
  buildCycle2QuestionBank("ce1", microSkills);

export function getMathCe1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsCe1QuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
