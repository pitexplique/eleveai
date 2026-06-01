import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/cm2/microSkills";
import { buildCycle3FrancaisBank } from "@/lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank";

export const francaisCm2QuestionBank: TutorBankItemV4[] =
  buildCycle3FrancaisBank("cm2", microSkills);

export function getFrancaisCm2QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francaisCm2QuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
