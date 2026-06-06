import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/english/a2/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const matrixA2English: SkillMatrix = {
  id: "a2_english_matrix_v4",
  classe: "a2",
  matiere: "english-maths",
  microSkillIndex: microSkills.map((micro) => micro.id),
  matrix: buildMatrixFromMicroSkills(microSkills),
};
