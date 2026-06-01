import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/cm1/microSkills";
import { buildCycle3FrancaisBank } from "@/lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank";

export const francaisCm1QuestionBank: TutorBankItemV4[] =
  buildCycle3FrancaisBank("cm1", microSkills);

export function getFrancaisCm1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francaisCm1QuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
