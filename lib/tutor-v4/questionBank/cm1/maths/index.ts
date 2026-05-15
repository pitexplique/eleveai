// lib/tutor-v4/question-banks/maths/cm1/index.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { nombresEntiersBank } from "./nombres-entiers.bank";
import { suitesBank } from "./suites.bank";
import { multiplicationBank } from "./multiplication.bank";
import { MultiplicationTablesBank } from "./multiplication-table.bank";

export const mathsCm1QuestionBank: TutorBankItemV4[] = [
  ...nombresEntiersBank,
  ...suitesBank,
  ...multiplicationBank,
  ...MultiplicationTablesBank,
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
