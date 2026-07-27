import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/cm1/microSkills";
import { buildCycle3FrancaisBank } from "@/lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank";
import { francaisCm1FixedBank } from "@/lib/tutor-v4/questionBank/cm1/francais/fixed.bank";

// Banque du coach = gabarits générés (variété) + couche "fixed" imprimable
// (≥5 QCM fixes par notion). La couche "fixed" enrichit le coach ET sert de
// source aux tests du guide de survie (testDeSurvie ne garde que les "fixed").
export const francaisCm1QuestionBank: TutorBankItemV4[] = [
  ...buildCycle3FrancaisBank("cm1", microSkills),
  ...francaisCm1FixedBank,
];

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
