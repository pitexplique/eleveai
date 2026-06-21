import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { buildMicroSkillCheckBank } from "./core";

export const geometrieSecondeBank: TutorBankItemV4[] = [
  // repere_coordonnees et droites_plan sont désormais servis par leurs banques dédiées
  ...buildMicroSkillCheckBank("geometrie", [
    "vecteurs_plan",
    "geometrie_problemes_plan",
  ]),
];
