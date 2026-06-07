import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { digitsA1Bank } from "./digits.bank";
import { numbersA1Bank } from "./numbers.bank";
import { operationsA1Bank } from "./operations.bank";
import { comparisonsA1Bank } from "./comparisons.bank";
import { geometryA1Bank } from "./geometry.bank";
import { verbsA1Bank } from "./verbs.bank";
import { sportsA1Bank } from "./sports.bank";
import { sportMeasurementsA1Bank } from "./sport_measurements.bank";
import { scienceLivingA1Bank } from "./science_living.bank";
import { scienceEarthA1Bank } from "./science_earth.bank";
import { moneyA1Bank } from "./money.bank";
import { familyBudgetA1Bank } from "./family_budget.bank";
import { countriesA1Bank } from "./countries.bank";
import { geographyBasicA1Bank } from "./geography_basic.bank";

export const englishA1QuestionBank: TutorBankItemV4[] = [
  ...digitsA1Bank,
  ...numbersA1Bank,
  ...operationsA1Bank,
  ...comparisonsA1Bank,
  ...geometryA1Bank,
  ...verbsA1Bank,
  ...sportsA1Bank,
  ...sportMeasurementsA1Bank,
  ...scienceLivingA1Bank,
  ...scienceEarthA1Bank,
  ...moneyA1Bank,
  ...familyBudgetA1Bank,
  ...countriesA1Bank,
  ...geographyBasicA1Bank,
];

export function getEnglishA1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = englishA1QuestionBank;

  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId)  bank = bank.filter((item) => item.microId  === args.microId);

  return bank;
}
