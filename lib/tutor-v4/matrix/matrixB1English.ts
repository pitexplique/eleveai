import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/english/b1/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const matrixB1English: SkillMatrix = {
  id: "b1_english_matrix_v4",
  classe: "b1",
  matiere: "english",
  microSkillIndex: microSkills.map((micro) => micro.id),
  matrix: buildMatrixFromMicroSkills(microSkills),
};
