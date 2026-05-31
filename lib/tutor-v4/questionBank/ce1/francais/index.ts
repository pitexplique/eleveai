import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/ce1/microSkills";
import { buildCycle2FrancaisBank } from "@/lib/tutor-v4/questionBank/cycle2/francais/buildCycle2FrancaisBank";

export const francaisCe1QuestionBank: TutorBankItemV4[] =
  buildCycle2FrancaisBank("ce1", microSkills);

export function getFrancaisCe1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francaisCe1QuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
