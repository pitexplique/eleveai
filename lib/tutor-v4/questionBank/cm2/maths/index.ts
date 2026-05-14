import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { proportionnaliteBank } from "./proportionnalite.bank";
import { algebreBank } from "./algebre.bank";
import { nombresDecimauxBank } from "./nombres-decimaux.bank";
import { suitesBank } from "./suites.bank";
import { multiplicationBank } from "./multiplication.bank";
import { divisionBank } from "./division.bank";
import { nombresEntiersBank } from "./nombres-entiers.bank";
import { fractionsBank } from "./fractions.bank";
import { algorithmiqueBank } from "./algorithmique.bank";
import { calculBank } from "./calcul.bank";
import { problemeBank } from "./probleme.bank";
import { pourcentagesBank } from "./pourcentages.bank";
import { longueursBank } from "./longueurs.bank";
import { perimetresBank } from "./perimetres.bank";
import { airesBank } from "./aires.bank";
import { dureesBank } from "./durees.bank";
import { anglesBank } from "./angles.bank";
import { reperageBank } from "./reperage.bank";
import { droitesBank } from "./droites.bank";
import { figuresPlanesBank } from "./figures-planes.bank";

export const mathsCm2QuestionBank: TutorBankItemV4[] = [
  ...proportionnaliteBank,
  ...algebreBank,
  ...nombresDecimauxBank,
  ...suitesBank,
  ...multiplicationBank,
  ...divisionBank,
  ...nombresEntiersBank,
  ...fractionsBank,
  ...algorithmiqueBank,
  ...calculBank,
  ...problemeBank,
  ...pourcentagesBank,
  ...longueursBank,
  ...perimetresBank,
  ...airesBank,
  ...dureesBank,
  ...anglesBank,
  ...reperageBank,
  ...droitesBank,
  ...figuresPlanesBank,
];

export function getMathCm2QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsCm2QuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}