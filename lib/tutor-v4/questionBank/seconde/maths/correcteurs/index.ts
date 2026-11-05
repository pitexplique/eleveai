// Correcteurs des gabarits ajoutés depuis le 05/11/2026 (contrat : 6e/maths/correcteurs/types.ts).
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";

import { CORRECTEURS as statistiquesClasses } from "./statistiques-classes";
import { CORRECTEURS as croisementVariables } from "./croisement-variables";
import { CORRECTEURS as logiqueRaisonnement } from "./logique-raisonnement";
import { CORRECTEURS as vecteurCombinaison } from "./vecteur-combinaison";
import { CORRECTEURS as fonctionModeliser } from "./fonction-modeliser";
import { CORRECTEURS as demiPlansSystemes } from "./demi-plans-systemes";
import { CORRECTEURS as systemesDeterminant } from "./systemes-determinant";
import { CORRECTEURS as courbesAssociees } from "./courbes-associees";
import { CORRECTEURS as polynomesDivision } from "./polynomes-division";

export const CORRECTEURS_SECONDE: CorrecteursMaths = {
  ...statistiquesClasses,
  ...croisementVariables,
  ...logiqueRaisonnement,
  ...vecteurCombinaison,
  ...fonctionModeliser,
  ...demiPlansSystemes,
  ...systemesDeterminant,
  ...courbesAssociees,
  ...polynomesDivision,
};
