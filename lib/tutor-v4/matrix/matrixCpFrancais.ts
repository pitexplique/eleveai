import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/cp/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndexCpFrancais = microSkills.map((micro) => micro.id);

const supportLinks: Record<string, string[]> = {
  cp_comp_question_simple: ["cp_lec_mots_frequents"],
  cp_dict_son_simple:      ["cp_copie_mot"],
  cp_gram_nom_verbe:       ["cp_lec_phrase_simple"],
  cp_orth_mot_invariable:  ["cp_dict_mot_courant"],
};

export const matrixCpFrancais: SkillMatrix = {
  id: "cp_francais_matrix_v4",
  classe: "cp",
  matiere: "francais",
  microSkillIndex: [...microSkillIndexCpFrancais],
  matrix: buildMatrixFromMicroSkills(microSkills, supportLinks),
};
