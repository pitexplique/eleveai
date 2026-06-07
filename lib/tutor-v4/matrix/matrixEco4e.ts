import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/economie/4e/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const matrixEco4e: SkillMatrix = {
  id: "eco_college_matrix_v4",
  classe: "eco-college",
  matiere: "economie",
  microSkillIndex: microSkills.map((micro) => micro.id),
  matrix: buildMatrixFromMicroSkills(microSkills),
};
