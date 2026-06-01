import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/3e/microSkills";
import { buildCollegeFrancaisSupportLinks } from "@/lib/tutor-v4/knowledge/francais/shared/buildCollegeFrancaisSources";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndex3eFrancais = microSkills.map((micro) => micro.id);

export const matrix3eFrancais: SkillMatrix = {
  id: "3e_francais_matrix_v4",
  classe: "3e",
  matiere: "francais",
  microSkillIndex: [...microSkillIndex3eFrancais],
  matrix: buildMatrixFromMicroSkills(microSkills, buildCollegeFrancaisSupportLinks("3e")),
};
