// lib/tutor-v4/question-banks/maths/terminale-spe/index.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { suitesBank } from "./suites.bank";
import { limitesSuitesBank } from "./limites-suites.bank";
import { limitesFonctionsBank } from "./limites-fonctions.bank";
import { continuiteTviBank } from "./continuite-tvi.bank";

export const mathsTerminaleSpeQuestionBank: TutorBankItemV4[] = [
  ...suitesBank,
  ...limitesSuitesBank,
  ...limitesFonctionsBank,
  ...continuiteTviBank,
];

export function getMathTerminaleSpeQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsTerminaleSpeQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}