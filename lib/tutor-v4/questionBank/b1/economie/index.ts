import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { fiscaliteB1EcoBank } from "./fiscalite.bank";
import { protectionB1EcoBank } from "./protection.bank";
import { entrepriseB1EcoBank } from "./entreprise.bank";

/** B1 — l'État, l'impôt, le marché de plus près : 32 concepts, 96 énoncés. */
export const economieB1QuestionBank: TutorBankItemV4[] = [
  ...fiscaliteB1EcoBank,
  ...protectionB1EcoBank,
  ...entrepriseB1EcoBank,
];
