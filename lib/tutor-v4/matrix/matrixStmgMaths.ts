import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/stmg/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const matrixStmgMaths: SkillMatrix = {
  id: "stmg_maths_matrix_v4",
  classe: "stmg",
  matiere: "maths",
  microSkillIndex: microSkills.map((m) => m.id),
  matrix: buildMatrixFromMicroSkills(microSkills),
};
