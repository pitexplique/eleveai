// Correcteurs des gabarits ajoutés depuis le 05/11/2026 (contrat : 6e/maths/correcteurs/types.ts).
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";

import { CORRECTEURS as paraboleImageEgale } from "./parabole-image-egale";
import { CORRECTEURS as statCorrelation } from "./stat-correlation";

export const CORRECTEURS_STMG: CorrecteursMaths = {
  ...paraboleImageEgale,
  ...statCorrelation,
};
