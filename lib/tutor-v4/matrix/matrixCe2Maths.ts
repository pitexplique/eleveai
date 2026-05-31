import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/ce2/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndexCe2Maths = microSkills.map((micro) => micro.id);

const supportLinks: Record<string, string[]> = {
  ce2_division_lien_multiplication: ["ce2_tables_6_7_8_9"],
  ce2_fraction_droite: ["ce2_entier_droite"],
  ce2_probleme_deux_etapes: ["ce2_calcul_priorites_simples"],
  ce2_perimetre_rectangle: ["ce2_multiplication_10_100"],
  ce2_symetrie_construire: ["ce2_reperage_coordonnees"],
  ce2_algo_repetition: ["ce2_suite_regle"],
};

export const matrixCe2Maths: SkillMatrix = {
  id: "ce2_maths_matrix_v4",
  classe: "ce2",
  matiere: "maths",
  microSkillIndex: [...microSkillIndexCe2Maths],
  matrix: buildMatrixFromMicroSkills(microSkills, supportLinks),
};
