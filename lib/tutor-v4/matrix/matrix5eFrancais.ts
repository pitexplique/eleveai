import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/5e/microSkills";
// ⚠️ 24/08/2026 — la 5e a ses propres appuis, comme la 6e depuis le 22/08 : elle
// s'est détachée de la fabrique du cycle 4 en passant au BO du 5 mars 2026.
import { supportLinks5eFrancais } from "@/lib/tutor-v4/knowledge/francais/5e/supportLinks";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndex5eFrancais = microSkills.map((micro) => micro.id);

export const matrix5eFrancais: SkillMatrix = {
  id: "5e_francais_matrix_v4",
  classe: "5e",
  matiere: "francais",
  microSkillIndex: [...microSkillIndex5eFrancais],
  matrix: buildMatrixFromMicroSkills(microSkills, supportLinks5eFrancais),
};
