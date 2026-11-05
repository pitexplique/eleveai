// Correcteurs des gabarits de maths de 3e (05/11/2026) : même contrat que la 6e
// (voir lib/tutor-v4/questionBank/6e/maths/correcteurs/types.ts). Seuls les
// gabarits ajoutés depuis ont un correcteur : le vérificateur se lance donc en
// 3e sur des micros ou des notions nommées, pas sur toute la classe.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { CORRECTEURS as volumesPyramideCone } from "./volumes-pyramide-cone";
import { CORRECTEURS as equationsCarre } from "./equations-carre";
import { CORRECTEURS as litteralDemontrer } from "./litteral-demontrer";

export const CORRECTEURS_3E: CorrecteursMaths = {
  ...volumesPyramideCone,
  ...equationsCarre,
  ...litteralDemontrer,
};
