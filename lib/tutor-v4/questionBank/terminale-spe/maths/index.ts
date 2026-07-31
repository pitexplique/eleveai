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
import { loiBinomialeBank } from "./loi-binomiale.bank";
import { denombrementBank } from "./denombrement.bank";
import { geometrieEspaceBank } from "./geometrie-espace.bank";
import { produitScalaireEspaceBank } from "./produit-scalaire-espace.bank";
import { algorithmiquePythonBank } from "./algorithmique-python.bank";
import { equationsDifferentiellesBank } from "./equations-differentielles.bank";
// Banques « concours » : items calibrés sur l'épreuve du Concours Avenir
// (QCU strict à 4 propositions, difficulté >= 3, traitables en 2 minutes).
// Elles enrichissent aussi le coach, qui y voit des items de difficulté 3 à 5.
import { equationsDifferentiellesConcoursBank } from "./equations-differentielles-concours.bank";
import { primitivesIntegralesConcoursBank } from "./primitives-integrales-concours.bank";
import { suitesConcoursBank } from "./suites-concours.bank";
import { concentrationBank } from "./concentration.bank";

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
  ...loiBinomialeBank,
  ...denombrementBank,
  ...geometrieEspaceBank,
  ...produitScalaireEspaceBank,
  ...algorithmiquePythonBank,
  ...equationsDifferentiellesBank,
  ...concentrationBank,
  ...equationsDifferentiellesConcoursBank,
  ...primitivesIntegralesConcoursBank,
  ...suitesConcoursBank,
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