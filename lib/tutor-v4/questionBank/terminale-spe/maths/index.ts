// lib/tutor-v4/question-banks/maths/terminale-spe/index.ts

import { tenir375 } from "@/lib/tutor-v4/questionBank/tenir-375";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { fonctionReciproqueBank } from "./fonction-reciproque.bank";
import { exposantsFractionnairesBank } from "./exposants-fractionnaires.bank";
import { logExpBaseABank } from "./log-exp-base-a.bank";
import { composeeEcrireBank } from "./composee-ecrire.bank";
import { systemes3x3Bank } from "./systemes-3x3.bank";
import { nombresComplexesBank } from "./nombres-complexes.bank";
import { nombresComplexesExpBank } from "./nombres-complexes-exp.bank";
import { nombresComplexesGeometrieBank } from "./nombres-complexes-geometrie.bank";
import { asymptotesSymetriesBank } from "./asymptotes-symetries.bank";
import { gaucheDroiteApproximationBank } from "./gauche-droite-approximation.bank";
import { equadiffSecondOrdreBank } from "./equadiff-second-ordre.bank";

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
import { geometrieEspaceConcoursBank } from "./geometrie-espace-concours.bank";
import { concentrationBank } from "./concentration.bank";
import { integrationPartiesBank } from "./integration-parties.bank";
import { integralesEncadrementBank } from "./integrales-encadrement.bank";
import { sinusCosinusBank } from "./sinus-cosinus.bank";

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
  ...geometrieEspaceConcoursBank,
  ...integrationPartiesBank,
  ...integralesEncadrementBank,
  ...sinusCosinusBank,
  ...fonctionReciproqueBank,
  ...exposantsFractionnairesBank,
  ...logExpBaseABank,
  ...composeeEcrireBank,
  ...systemes3x3Bank,
  ...tenir375(nombresComplexesBank),
  ...tenir375(nombresComplexesExpBank),
  ...tenir375(nombresComplexesGeometrieBank),
  ...tenir375(asymptotesSymetriesBank),
  ...tenir375(gaucheDroiteApproximationBank),
  ...tenir375(equadiffSecondOrdreBank),
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