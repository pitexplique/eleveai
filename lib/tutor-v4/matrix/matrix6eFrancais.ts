import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/6e/microSkills";
import { buildCollegeFrancaisSupportLinks } from "@/lib/tutor-v4/knowledge/francais/shared/buildCollegeFrancaisSources";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndex6eFrancais = microSkills.map((micro) => micro.id);

export const matrix6eFrancais: SkillMatrix = {
  id: "6e_francais_matrix_v4",
  classe: "6e",
  matiere: "francais",
  microSkillIndex: [...microSkillIndex6eFrancais],
  matrix: buildMatrixFromMicroSkills(microSkills, buildCollegeFrancaisSupportLinks("6e")),
};
