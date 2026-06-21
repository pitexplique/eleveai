import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { buildMicroSkillCheckBank } from "./core";

export const geometrieSecondeBank: TutorBankItemV4[] = [
  // repere_coordonnees, droites_plan et vecteurs_plan sont servis par leurs banques dédiées
  ...buildMicroSkillCheckBank("geometrie", [
    "geometrie_problemes_plan",
  ]),
];
