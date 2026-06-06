import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/english/b2/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const matrixB2English: SkillMatrix = {
  id: "b2_english_matrix_v4",
  classe: "b2",
  matiere: "english",
  microSkillIndex: microSkills.map((micro) => micro.id),
  matrix: buildMatrixFromMicroSkills(microSkills),
};
