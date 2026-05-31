import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/ce1/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndexCe1Francais = microSkills.map((micro) => micro.id);

const supportLinks: Record<string, string[]> = {
  ce1_comp_implicite:       ["ce1_flue_texte_court"],
  ce1_prod_suite:           ["ce1_comp_personnages"],
  ce1_orth_accord_suj_v:    ["ce1_conj_present_er"],
  ce1_orth_homophone:       ["ce1_dict_mot_courant"],
  ce1_voc_polysemie:        ["ce1_comp_question"],
};

export const matrixCe1Francais: SkillMatrix = {
  id: "ce1_francais_matrix_v4",
  classe: "ce1",
  matiere: "francais",
  microSkillIndex: [...microSkillIndexCe1Francais],
  matrix: buildMatrixFromMicroSkills(microSkills, supportLinks),
};
