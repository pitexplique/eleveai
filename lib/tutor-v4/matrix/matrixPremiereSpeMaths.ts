import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/premiere-spe/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const matrixPremiereSpeMaths: SkillMatrix = {
  id: "premiere_spe_maths_matrix_v4",
  classe: "premiere-spe",
  matiere: "maths",
  microSkillIndex: microSkills.map((m) => m.id),
  matrix: buildMatrixFromMicroSkills(microSkills),
};
