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

import { calculMentalBank } from "./calcul-mental.bank";

import { longueursBank } from "./longueurs.bank";

export const maths6eQuestionBank: TutorBankItemV4[] = [
  // Nombres
  ...entiersBank,
  ...decimauxBank,
  ...fractionsBank,
  ...pourcentagesBank,
  ...proportionnaliteBank,
  ...longueursBank,

  // Calcul
  ...calculMentalBank,

  // Grandeurs et géométrie
  ...anglesBank,
  ...perimetresBank,
  ...airesBank,
  ...trianglesBank,
  ...quadrilateresBank,
];