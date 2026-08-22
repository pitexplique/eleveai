import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { entiersBank } from "./entiers.bank";
import { fractionsBank } from "./fractions.bank";
import { fractionsCalculBank } from "./fractions-calcul.bank";
import { decimauxBank } from "./decimaux.bank";
import { pourcentagesBank } from "./pourcentages.bank";

import { anglesBank } from "./angles.bank";
import { airesBank } from "./aires.bank";
import { perimetresBank } from "./perimetres.bank";
import { cercleBank } from "./cercle.bank";
import { proportionnaliteBank } from "./proportionnalite.bank";

import { trianglesBank } from "./triangles.bank";
import { quadrilateresBank } from "./quadrilateres.bank";
import { symetrieBank } from "./symetrie.bank";

import { calculMentalBank } from "./calcul-mental.bank";
import { calculPoseBank } from "./calcul-pose.bank";

import { longueursBank } from "./longueurs.bank";
import { dureesBank } from "./durees.bank";
import { distancesBank } from "./distances.bank";
import { mediatriceBank } from "./mediatrice.bank";
import { bissectriceBank } from "./bissectrice.bank";
import { volumesBank } from "./volumes.bank";

import { donneesBank } from "./donnees.bank";
import { probabilitesBank } from "./probabilites.bank";

import { algorithmiqueBank } from "./algorithmique.bank";

export const maths6eQuestionBank: TutorBankItemV4[] = [
  // =========================
  // NOMBRES
  // =========================
  ...entiersBank,
  ...decimauxBank,
  ...fractionsBank,
  ...fractionsCalculBank,
  ...pourcentagesBank,
  ...proportionnaliteBank,
  ...longueursBank,

  // =========================
  // CALCUL
  // =========================
  ...calculMentalBank,
  ...calculPoseBank,

  // =========================
  // GRANDEURS ET GÉOMÉTRIE
  // =========================
  ...distancesBank,
  ...mediatriceBank,
  ...anglesBank,
  ...bissectriceBank,
  ...perimetresBank,
  ...cercleBank,
  ...airesBank,
  ...dureesBank,

  // =========================
  // GÉOMÉTRIE
  // =========================
  ...trianglesBank,
  ...quadrilateresBank,
  ...symetrieBank,
  ...volumesBank,

  // =========================
  // ALGORITHMIQUE
  // =========================
  ...algorithmiqueBank,
  
  // =========================
  // DONNÉES ET PROBABILITÉS
  // =========================
  ...donneesBank,
  ...probabilitesBank,
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