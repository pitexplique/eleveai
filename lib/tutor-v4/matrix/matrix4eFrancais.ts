import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/4e/microSkills";
import { buildCollegeFrancaisSupportLinks } from "@/lib/tutor-v4/knowledge/francais/shared/buildCollegeFrancaisSources";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndex4eFrancais = microSkills.map((micro) => micro.id);

export const matrix4eFrancais: SkillMatrix = {
  id: "4e_francais_matrix_v4",
  classe: "4e",
  matiere: "francais",
  microSkillIndex: [...microSkillIndex4eFrancais],
  matrix: buildMatrixFromMicroSkills(microSkills, buildCollegeFrancaisSupportLinks("4e")),
};
