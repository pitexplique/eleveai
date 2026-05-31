import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/cp/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndexCpMaths = microSkills.map((micro) => micro.id);

const supportLinks: Record<string, string[]> = {
  cp_probleme_additif: ["cp_probleme_schema"],
  cp_probleme_soustractif: ["cp_probleme_schema"],
  cp_monnaie_constituer: ["cp_calcul_complements_10"],
  cp_figure_tracer: ["cp_longueur_regle"],
  cp_donnees_interpreter: ["cp_entier_comparer"],
  cp_algo_suite_logique: ["cp_suite_completer"],
};

export const matrixCpMaths: SkillMatrix = {
  id: "cp_maths_matrix_v4",
  classe: "cp",
  matiere: "maths",
  microSkillIndex: [...microSkillIndexCpMaths],
  matrix: buildMatrixFromMicroSkills(microSkills, supportLinks),
};
