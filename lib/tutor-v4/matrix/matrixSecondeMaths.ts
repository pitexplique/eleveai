import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/seconde/microSkills";
import { buildMatrixFromMicroSkills } from "@/lib/tutor-v4/matrix/buildMatrixFromMicroSkills";

export const microSkillIndexSecondeMaths = microSkills.map((micro) => micro.id);

export const matrixSecondeMaths: SkillMatrix = {
  id: "seconde_maths_matrix_v4",
  classe: "seconde",
  matiere: "maths",
  microSkillIndex: [...microSkillIndexSecondeMaths],
  matrix: buildMatrixFromMicroSkills(microSkills),
};
