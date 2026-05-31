import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/ce2/microSkills";
import { buildCycle2QuestionBank } from "@/lib/tutor-v4/questionBank/cycle2/maths/buildCycle2Bank";

export const mathsCe2QuestionBank: TutorBankItemV4[] =
  buildCycle2QuestionBank("ce2", microSkills);

export function getMathCe2QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsCe2QuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
