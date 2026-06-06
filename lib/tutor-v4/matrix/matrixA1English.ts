import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/english/a1/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const matrixA1English: SkillMatrix = {
  id: "a1_english_matrix_v4",
  classe: "a1",
  matiere: "english-maths",
  microSkillIndex: microSkills.map((micro) => micro.id),
  matrix: buildMatrixFromMicroSkills(microSkills),
};
