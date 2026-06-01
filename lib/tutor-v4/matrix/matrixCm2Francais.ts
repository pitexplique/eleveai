import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/cm2/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndexCm2Francais = microSkills.map((micro) => micro.id);

const supportLinks: Record<string, string[]> = {
  cm2_comp_implicite: ["cm2_voc_contexte"],
  cm2_doc_croiser_infos: ["cm2_comp_essentiel"],
  cm2_ecrit_reviser: ["cm2_orth_accord_gn", "cm2_orth_sujet_verbe"],
  cm2_complexe_pronom_relatif: ["cm2_comp_implicite"],
  cm2_conj_valeur_temps: ["cm2_comp_autonomie"],
};

export const matrixCm2Francais: SkillMatrix = {
  id: "cm2_francais_matrix_v4",
  classe: "cm2",
  matiere: "francais",
  microSkillIndex: [...microSkillIndexCm2Francais],
  matrix: buildMatrixFromMicroSkills(microSkills, supportLinks),
};
