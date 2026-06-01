import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/5e/microSkills";
import { buildCollegeFrancaisSupportLinks } from "@/lib/tutor-v4/knowledge/francais/shared/buildCollegeFrancaisSources";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndex5eFrancais = microSkills.map((micro) => micro.id);

export const matrix5eFrancais: SkillMatrix = {
  id: "5e_francais_matrix_v4",
  classe: "5e",
  matiere: "francais",
  microSkillIndex: [...microSkillIndex5eFrancais],
  matrix: buildMatrixFromMicroSkills(microSkills, buildCollegeFrancaisSupportLinks("5e")),
};
