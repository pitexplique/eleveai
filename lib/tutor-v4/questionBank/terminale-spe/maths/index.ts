// lib/tutor-v4/question-banks/maths/terminale-spe/index.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { suitesBank } from "./suites.bank";
import { limitesSuitesBank } from "./limites-suites.bank";
import { limitesFonctionsBank } from "./limites-fonctions.bank";
import { continuiteTviBank } from "./continuite-tvi.bank";
import { derivationBank } from "./derivation.bank";
import { exponentielleBank } from "./exponentielle.bank";
import { logarithmeBank } from "./logarithme.bank";
import { primitivesIntegralesBank } from "./primitives-integrales.bank";
import { convexiteBank } from "./convexite.bank";
import { probabilitesConditionnellesBank } from "./probabilites-conditionnelles.bank";
import { variablesAleatoiresBank } from "./variables-aleatoires.bank";

export const mathsTerminaleSpeQuestionBank: TutorBankItemV4[] = [
  ...suitesBank,
  ...limitesSuitesBank,
  ...limitesFonctionsBank,
  ...continuiteTviBank,
  ...derivationBank,
  ...exponentielleBank,
  ...logarithmeBank,
  ...primitivesIntegralesBank,
  ...convexiteBank,
  ...probabilitesConditionnellesBank,
  ...variablesAleatoiresBank,
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