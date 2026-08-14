import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/premiere/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const matrixPremiereMaths: SkillMatrix = {
  id: "premiere_maths_matrix_v4",
  classe: "premiere",
  matiere: "maths",
  microSkillIndex: microSkills.map((m) => m.id),
  matrix: buildMatrixFromMicroSkills(microSkills),
};
