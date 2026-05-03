// lib/tutor-v4/questionBank/5e/maths/index.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { nombresRelatifsBank } from "./nombres-relatifs.bank";
import { proportionnaliteBank } from "./proportionnalite.bank";
import { fractionsBank } from "./fractions.bank";
import { operationsRelatifsBank } from "./operations-relatifs.bank.ts";
import { calculLitteralBank } from "./calcul-litteral.bank";
import { statistiquesBank } from "./statistiques.bank";


export const maths5eQuestionBank: TutorBankItemV4[] = [
  ...nombresRelatifsBank,
  ...proportionnaliteBank,
  ...fractionsBank,
  ...operationsRelatifsBank,
  ...calculLitteralBank,
  ...statistiquesBank,

];