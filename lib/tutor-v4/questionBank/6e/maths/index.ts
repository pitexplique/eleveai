import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { fractionsBank } from "./fractions.bank";
import { decimauxBank } from "./decimaux.bank";
import { anglesBank } from "./angles.bank";
import { airesBank } from "./aires.bank";
import { perimetresBank } from "./perimetres.bank";
import { proportionnaliteBank } from "./proportionnalite.bank";
import { trianglesBank } from "./triangles.bank";
import { quadrilateresBank } from "./quadrilateres.bank";
import { calculMentalBank } from "./calcul-mental.bank";

export const maths6eQuestionBank: TutorBankItemV4[] = [
  ...fractionsBank,
  ...decimauxBank,
  ...anglesBank,
  ...airesBank,
  ...perimetresBank,
  ...proportionnaliteBank,
  ...trianglesBank,
  ...quadrilateresBank,
  ...calculMentalBank,
];