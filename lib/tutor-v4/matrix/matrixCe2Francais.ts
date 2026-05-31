import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/ce2/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndexCe2Francais = microSkills.map((micro) => micro.id);

const supportLinks: Record<string, string[]> = {
  ce2_comp_inferences: ["ce2_flue_texte_90"],
  ce2_prod_paragraphe: ["ce2_comp_resume"],
  ce2_orth_sujet_verbe: ["ce2_conj_present_er"],
  ce2_conj_imparfait: ["ce2_gram_sujet_verbe"],
  ce2_conj_futur: ["ce2_gram_sujet_verbe"],
  ce2_voc_polysemie: ["ce2_comp_inferences"],
};

export const matrixCe2Francais: SkillMatrix = {
  id: "ce2_francais_matrix_v4",
  classe: "ce2",
  matiere: "francais",
  microSkillIndex: [...microSkillIndexCe2Francais],
  matrix: buildMatrixFromMicroSkills(microSkills, supportLinks),
};
