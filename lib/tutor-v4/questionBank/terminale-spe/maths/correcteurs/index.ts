// Correcteurs des gabarits de maths de Terminale spé (05/11/2026) : même contrat que
// la 6e (voir lib/tutor-v4/questionBank/6e/maths/correcteurs/types.ts). Seuls les
// gabarits ajoutés depuis cette date en ont : le vérificateur se lance donc sur des
// micros nommées, pas sur toute la classe.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { CORRECTEURS as integrationParties } from "./integration-parties";
import { CORRECTEURS as integralesEncadrement } from "./integrales-encadrement";
import { CORRECTEURS as sinusCosinus } from "./sinus-cosinus";
import { CORRECTEURS as fonctionReciproque } from "./fonction-reciproque";
import { CORRECTEURS as exposantsFractionnaires } from "./exposants-fractionnaires";
import { CORRECTEURS as logExpBaseA } from "./log-exp-base-a";
import { CORRECTEURS as composeeEcrire } from "./composee-ecrire";
import { CORRECTEURS as systemes3x3 } from "./systemes-3x3";
import { CORRECTEURS as nombresComplexes } from "./nombres-complexes";
import { CORRECTEURS as asymptotesSymetries } from "./asymptotes-symetries";
import { CORRECTEURS as gaucheDroiteApproximation } from "./gauche-droite-approximation";
import { CORRECTEURS as equadiffSecondOrdre } from "./equadiff-second-ordre";

export const CORRECTEURS_TLE: CorrecteursMaths = {
  ...integrationParties,
  ...integralesEncadrement,
  ...sinusCosinus,
  ...fonctionReciproque,
  ...exposantsFractionnaires,
  ...logExpBaseA,
  ...composeeEcrire,
  ...systemes3x3,
  ...nombresComplexes,
  ...asymptotesSymetries,
  ...gaucheDroiteApproximation,
  ...equadiffSecondOrdre,
};
