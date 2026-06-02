import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/adulte/microSkills";
import { buildMatrixFromMicroSkills } from "@/lib/tutor-v4/matrix/buildMatrixFromMicroSkills";

export const microSkillIndexAdulteMaths = microSkills.map((micro) => micro.id);

export const matrixAdulteMaths: SkillMatrix = {
  id: "adulte_maths_matrix_v4",
  classe: "adulte",
  matiere: "maths",
  microSkillIndex: [...microSkillIndexAdulteMaths],
  matrix: buildMatrixFromMicroSkills(microSkills),
};
