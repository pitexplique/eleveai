import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { verbsB1Bank } from "./verbs.bank";
import { algebraB1Bank } from "./algebra.bank";
import { statisticsB1Bank } from "./statistics.bank";
import { reasoningB1Bank } from "./reasoning.bank";
import { sportVerbsB1Bank } from "./sport_verbs.bank";
import { sportPhysicsB1Bank } from "./sport_physics.bank";
import { sportStatsB1Bank } from "./sport_stats.bank";
import { scienceBiologyB1Bank } from "./science_biology.bank";
import { scienceChemistryB1Bank } from "./science_chemistry.bank";
import { sciencePhysicsB1Bank } from "./science_physics.bank";
import { economyB1Bank } from "./economy.bank";
import { financeB1Bank } from "./finance.bank";
import { familyManagementB1Bank } from "./family_management.bank";
import { physicalGeographyB1Bank } from "./physical_geography.bank";
import { travelCultureB1Bank } from "./travel_culture.bank";
import { environmentB1Bank } from "./environment.bank";

export const englishB1QuestionBank: TutorBankItemV4[] = [
  ...verbsB1Bank,
  ...algebraB1Bank,
  ...statisticsB1Bank,
  ...reasoningB1Bank,
  ...sportVerbsB1Bank,
  ...sportPhysicsB1Bank,
  ...sportStatsB1Bank,
  ...scienceBiologyB1Bank,
  ...scienceChemistryB1Bank,
  ...sciencePhysicsB1Bank,
  ...economyB1Bank,
  ...financeB1Bank,
  ...familyManagementB1Bank,
  ...physicalGeographyB1Bank,
  ...travelCultureB1Bank,
  ...environmentB1Bank,
];

export function getEnglishB1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = englishB1QuestionBank;
  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId)  bank = bank.filter((item) => item.microId  === args.microId);
  return bank;
}
