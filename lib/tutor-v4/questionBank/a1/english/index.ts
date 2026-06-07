import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { digitsA1Bank } from "./digits.bank";
import { numbersA1Bank } from "./numbers.bank";
import { operationsA1Bank } from "./operations.bank";
import { comparisonsA1Bank } from "./comparisons.bank";
import { geometryA1Bank } from "./geometry.bank";
import { verbsA1Bank } from "./verbs.bank";
import { sportsA1Bank } from "./sports.bank";
import { sportMeasurementsA1Bank } from "./sport_measurements.bank";

export const englishA1QuestionBank: TutorBankItemV4[] = [
  ...digitsA1Bank,
  ...numbersA1Bank,
  ...operationsA1Bank,
  ...comparisonsA1Bank,
  ...geometryA1Bank,
  ...verbsA1Bank,
  ...sportsA1Bank,
  ...sportMeasurementsA1Bank,
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
