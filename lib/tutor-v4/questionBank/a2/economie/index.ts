import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { entrepriseA2EcoBank } from "./entreprise.bank";
import { marcheA2EcoBank } from "./marche.bank";
import { travailA2EcoBank } from "./travail.bank";

/** A2 — produire, vendre, travailler : 30 concepts, 90 énoncés, 6 micros. */
export const economieA2QuestionBank: TutorBankItemV4[] = [
  ...entrepriseA2EcoBank,
  ...marcheA2EcoBank,
  ...travailA2EcoBank,
];
