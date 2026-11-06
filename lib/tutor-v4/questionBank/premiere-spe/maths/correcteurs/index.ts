// Correcteurs des gabarits ajoutés depuis le 05/11/2026 (contrat : 6e/maths/correcteurs/types.ts).
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";

import { CORRECTEURS as bernoulliRepetition } from "./bernoulli-repetition";
import { CORRECTEURS as trigoFormulesEquations } from "./trigo-formules-equations";
import { CORRECTEURS as triangleQuelconque } from "./triangle-quelconque";
import { CORRECTEURS as parite } from "./parite";
import { CORRECTEURS as anglesOrientes } from "./angles-orientes";
import { CORRECTEURS as tangenteReel } from "./tangente-reel";
import { CORRECTEURS as trigoEquationsFormes } from "./trigo-equations-formes";
import { CORRECTEURS as barycentre } from "./barycentre";

export const CORRECTEURS_PREMIERE_SPE: CorrecteursMaths = {
  ...bernoulliRepetition,
  ...trigoFormulesEquations,
  ...triangleQuelconque,
  ...parite,
  ...anglesOrientes,
  ...tangenteReel,
  ...trigoEquationsFormes,
  ...barycentre,
};
