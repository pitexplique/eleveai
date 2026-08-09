import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/ce1/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndexCe1Maths = microSkills.map((micro) => micro.id);

const supportLinks: Record<string, string[]> = {
  ce1_probleme_multiplicatif: ["ce1_multiplication_calculer"],
  ce1_fraction_representer: ["ce1_division_partage"],
  ce1_longueur_convertir_simple: ["ce1_calcul_multiplier_10"],
  ce1_monnaie_rendre: ["ce1_calcul_complements_100"],
  ce1_algo_repetition: ["ce1_suite_pas"],
};

export const matrixCe1Maths: SkillMatrix = {
  id: "ce1_maths_matrix_v4",
  classe: "ce1",
  matiere: "maths",
  microSkillIndex: [...microSkillIndexCe1Maths],
  matrix: buildMatrixFromMicroSkills(microSkills, supportLinks),
};
