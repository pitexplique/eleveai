// Correcteurs des gabarits de maths de Terminale spé (05/11/2026) : même contrat que
// la 6e (voir lib/tutor-v4/questionBank/6e/maths/correcteurs/types.ts). Seuls les
// gabarits ajoutés depuis cette date en ont : le vérificateur se lance donc sur des
// micros nommées, pas sur toute la classe.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { CORRECTEURS as integrationParties } from "./integration-parties";
import { CORRECTEURS as integralesEncadrement } from "./integrales-encadrement";
import { CORRECTEURS as sinusCosinus } from "./sinus-cosinus";

export const CORRECTEURS_TLE: CorrecteursMaths = {
  ...integrationParties,
  ...integralesEncadrement,
  ...sinusCosinus,
};
