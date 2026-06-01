import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/6e/microSkills";
import { buildCycle3FrancaisBank } from "@/lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank";

export const francais6eQuestionBank: TutorBankItemV4[] =
  buildCycle3FrancaisBank("6e", microSkills);

export function getFrancais6eQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francais6eQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
