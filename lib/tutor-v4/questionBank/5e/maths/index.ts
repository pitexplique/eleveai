// lib/tutor-v4/questionBank/5e/maths/index.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { nombresRelatifsBank } from "./nombres-relatifs.bank";
import { proportionnaliteBank } from "./proportionnalite.bank";

export const maths5eQuestionBank: TutorBankItemV4[] = [
  ...nombresRelatifsBank,
  ...proportionnaliteBank,
];