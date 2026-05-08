import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { entiersBank } from "./entiers.bank";
import { fractionsBank } from "./fractions.bank";
import { decimauxBank } from "./decimaux.bank";
import { pourcentagesBank } from "./pourcentages.bank";

import { anglesBank } from "./angles.bank";
import { airesBank } from "./aires.bank";
import { perimetresBank } from "./perimetres.bank";
import { proportionnaliteBank } from "./proportionnalite.bank";

import { trianglesBank } from "./triangles.bank";
import { quadrilateresBank } from "./quadrilateres.bank";
import { symetrieBank } from "./symetrie.bank";

import { calculMentalBank } from "./calcul-mental.bank";
import { longueursBank } from "./longueurs.bank";
import { volumesBank } from "./volumes.bank";

export const maths6eQuestionBank: TutorBankItemV4[] = [
  // =========================
  // NOMBRES
  // =========================
  ...entiersBank,
  ...decimauxBank,
  ...fractionsBank,
  ...pourcentagesBank,
  ...proportionnaliteBank,
  ...longueursBank,

  // =========================
  // CALCUL
  // =========================
  ...calculMentalBank,

  // =========================
  // GRANDEURS ET GÉOMÉTRIE
  // =========================
  ...anglesBank,
  ...perimetresBank,
  ...airesBank,

  // =========================
  // GÉOMÉTRIE
  // =========================
  ...trianglesBank,
  ...quadrilateresBank,
  ...symetrieBank,
  ...volumesBank,
];

export function getMaths6eQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = maths6eQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}