import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { verbsA2Bank } from "./verbs.bank";
import { expressionsA2Bank } from "./expressions.bank";
import { fractionsA2Bank } from "./fractions.bank";
import { geometryA2Bank } from "./geometry.bank";
import { sportVerbsA2Bank } from "./sport_verbs.bank";
import { sportStatsA2Bank } from "./sport_stats.bank";
import { sportPhysicsA2Bank } from "./sport_physics.bank";
import { scienceBiologyA2Bank } from "./science_biology.bank";
import { scienceChemistryA2Bank } from "./science_chemistry.bank";
import { sciencePhysicsA2Bank } from "./science_physics.bank";
import { economyBasicsA2Bank } from "./economy_basics.bank";
import { familyFinanceA2Bank } from "./family_finance.bank";
import { percentagesEcoA2Bank } from "./percentages_eco.bank";

export const englishA2QuestionBank: TutorBankItemV4[] = [
  ...verbsA2Bank,
  ...expressionsA2Bank,
  ...fractionsA2Bank,
  ...geometryA2Bank,
  ...sportVerbsA2Bank,
  ...sportStatsA2Bank,
  ...sportPhysicsA2Bank,
  ...scienceBiologyA2Bank,
  ...scienceChemistryA2Bank,
  ...sciencePhysicsA2Bank,
  ...economyBasicsA2Bank,
  ...familyFinanceA2Bank,
  ...percentagesEcoA2Bank,
];

export function getEnglishA2QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = englishA2QuestionBank;
  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId)  bank = bank.filter((item) => item.microId  === args.microId);
  return bank;
}
