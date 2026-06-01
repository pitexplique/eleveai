import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/cm1/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndexCm1Francais = microSkills.map((micro) => micro.id);

const supportLinks: Record<string, string[]> = {
  cm1_comp_implicite: ["cm1_voc_contexte"],
  cm1_ecrit_reviser: ["cm1_orth_accord_gn", "cm1_orth_sujet_verbe"],
  cm1_oral_presenter: ["cm1_oeuvre_carnet"],
  cm1_conj_valeur_temps: ["cm1_comp_strategies"],
};

export const matrixCm1Francais: SkillMatrix = {
  id: "cm1_francais_matrix_v4",
  classe: "cm1",
  matiere: "francais",
  microSkillIndex: [...microSkillIndexCm1Francais],
  matrix: buildMatrixFromMicroSkills(microSkills, supportLinks),
};
