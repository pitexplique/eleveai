import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { argentA1EcoBank } from "./argent.bank";
import { budgetA1EcoBank } from "./budget.bank";
import { consommerA1EcoBank } from "./consommer.bank";

/** A1 — l'argent au quotidien : 30 concepts, 90 énoncés, 6 micros. */
export const economieA1QuestionBank: TutorBankItemV4[] = [
  ...argentA1EcoBank,
  ...budgetA1EcoBank,
  ...consommerA1EcoBank,
];
