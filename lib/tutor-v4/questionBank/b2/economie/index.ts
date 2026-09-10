import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { croissanceB2EcoBank } from "./croissance.bank";
import { prixB2EcoBank } from "./prix.bank";
import { politiquesB2EcoBank } from "./politiques.bank";

/** B2 — l'économie du pays : 30 concepts, 90 énoncés, 6 micros. */
export const economieB2QuestionBank: TutorBankItemV4[] = [
  ...croissanceB2EcoBank,
  ...prixB2EcoBank,
  ...politiquesB2EcoBank,
];
