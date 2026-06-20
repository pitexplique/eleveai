// lib/tutor-v4/question-banks/maths/cm1/index.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { applyMathsKeyboardFree } from "../../mathsKeyboardFreeTransform";

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
import { reperageBank } from "./reperage.bank";
import { droitesBank } from "./droites.bank";

import { tableauxBank } from "./tableaux.bank";
import { graphiquesBank } from "./graphiques.bank";
import { probabilitesBank } from "./probabilites.bank";
import { symetrieBank } from "./symetrie.bank";
import { figuresPlanesBank } from "./figures-planes.bank";
import { solidesBank } from "./solides.bank";
import { algorithmiqueBank } from "./algorithmique.bank";

// Zéro clavier en CM1 : short numériques -> QCM, et open « Explique… » retirées
// (cf. applyMathsKeyboardFree). Appliqué à TOUTES les banques maths CM1.
export const mathsCm1QuestionBank: TutorBankItemV4[] = [
  ...applyMathsKeyboardFree(nombresEntiersBank),
  ...applyMathsKeyboardFree(suitesBank),
  ...applyMathsKeyboardFree(MultiplicationTablesBank),
  ...applyMathsKeyboardFree(multiplicationBank),
  ...applyMathsKeyboardFree(divisionBank),
  ...applyMathsKeyboardFree(fractionsBank),
  ...applyMathsKeyboardFree(decimauxBank),
  ...applyMathsKeyboardFree(calculBank),
  ...applyMathsKeyboardFree(problemesBank),
  ...applyMathsKeyboardFree(algebreBank),
  ...applyMathsKeyboardFree(proportionnaliteBank),
  ...applyMathsKeyboardFree(longueurBank),
  ...applyMathsKeyboardFree(masseBank),
  ...applyMathsKeyboardFree(contenanceBank),
  ...applyMathsKeyboardFree(dureesBank),
  ...applyMathsKeyboardFree(perimetresBank),
  ...applyMathsKeyboardFree(airesBank),
  ...applyMathsKeyboardFree(anglesBank),
  ...applyMathsKeyboardFree(reperageBank),
  ...applyMathsKeyboardFree(droitesBank),

  ...applyMathsKeyboardFree(tableauxBank),
  ...applyMathsKeyboardFree(graphiquesBank),
  ...applyMathsKeyboardFree(probabilitesBank),
  ...applyMathsKeyboardFree(symetrieBank),
  ...applyMathsKeyboardFree(figuresPlanesBank),
  ...applyMathsKeyboardFree(solidesBank),
  ...applyMathsKeyboardFree(algorithmiqueBank),
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