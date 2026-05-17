// lib/tutor-v4/question-banks/maths/cm1/index.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { nombresEntiersBank } from "./nombres-entiers.bank";
import { suitesBank } from "./suites.bank";
import { MultiplicationTablesBank } from "./multiplication-table.bank";
import { multiplicationBank } from "./multiplication.bank";
import { divisionBank } from "./division.bank";
import { fractionsBank } from "./fractions.bank";
import { decimauxBank } from "./decimaux.bank";
import { calculBank } from "./calcul.bank";
import { problemesBank } from "./problemes.bank";
import { algebreBank } from "./algebre.bank";
import { proportionnaliteBank } from "./proportionnalite.bank";
import { longueurBank } from "./longueur.bank";
import { masseBank } from "./masse.bank";
import { contenanceBank } from "./contenance.bank";
import { dureesBank } from "./durees.bank";
import { perimetresBank } from "./perimetres.bank"; 
import { airesBank } from "./aires.bank";
import { anglesBank } from "./angles.bank";

export const mathsCm1QuestionBank: TutorBankItemV4[] = [
  ...nombresEntiersBank,
  ...suitesBank,
  ...MultiplicationTablesBank,
  ...multiplicationBank,
  ...divisionBank,
  ...fractionsBank,
  ...decimauxBank,
  ...calculBank,
  ...problemesBank,
  ...algebreBank,
  ...proportionnaliteBank,
  ...longueurBank,
  ...masseBank,
  ...contenanceBank,
  ...dureesBank,
  ...perimetresBank,
  ...airesBank,
  ...anglesBank,
];

export function getMathCm1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsCm1QuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}