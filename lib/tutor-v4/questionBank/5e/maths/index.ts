// lib/tutor-v4/questionBank/5e/maths/index.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { nombresRelatifsBank } from "./nombres-relatifs.bank";
import { proportionnaliteBank } from "./proportionnalite.bank";
import { fractionsBank } from "./fractions.bank";
import { operationsRelatifsBank } from "./operations-relatifs.bank";
import { calculLitteralBank } from "./calcul-litteral.bank";
import { statistiquesBank } from "./statistiques.bank";
import { probabilitesBank } from "./probabilites.bank";
import { anglesBank } from "./angles.bank";
import { trianglesBank } from "./triangles.bank";
import { symetrieCentraleBank} from "./symetrie_centrale.bank"
import { volumesBank } from "./volumes.bank";
import { airesBank } from "./aires.bank";
import { algorithmiqueBank } from "./algorithmique.bank"
import { divisibiliteBank } from "./divisibilite.bank";
import { parallelogrammesBank } from "./parallelogrammes.bank";
// Les items libérés de l'évaluation nationale de 4ᵉ (Éduscol, juillet 2023) :
// ils sont écrits sur le programme de 5ᵉ, donc ils vivent dans cette banque —
// l'épreuve blanche de 4ᵉ y pioche, et le coach de 5ᵉ aussi.
import { evaluationNationale4eBank } from "./evaluation-nationale-4e.bank";
// Conversions et durées : la notion `grandeur_conversion`, ajoutée le 15/08
// parce que `BO5M1 « Grandeurs et mesures »` ne portait que les aires.
import { conversionsBank } from "./conversions.bank";


export const maths5eQuestionBank: TutorBankItemV4[] = [
  ...divisibiliteBank,
  ...parallelogrammesBank,
  ...nombresRelatifsBank,
  ...proportionnaliteBank,
  ...fractionsBank,
  ...operationsRelatifsBank,
  ...calculLitteralBank,
  ...statistiquesBank,
  ...probabilitesBank,
  ...anglesBank,
  ...trianglesBank,
  ...symetrieCentraleBank,
  ...volumesBank,
  ...airesBank,
  ...algorithmiqueBank,
  ...evaluationNationale4eBank,
  ...conversionsBank,
];

export function getMaths5eQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = maths5eQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}