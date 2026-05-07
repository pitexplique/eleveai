// loaders/matrix/matrixCm2Maths.ts

import type { SkillMatrix, MatrixValue } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/cm2/microSkills";

/**
 * Progression étoilée CM2 : les niveaux 1 → 5 sont portés par les difficultés
 * des questions ; la matrice garde les dépendances entre micro-compétences.
 */
export const microSkillIndexCm2Maths = microSkills.map((micro) => micro.id);

const directParents: Record<string, string[]> = Object.fromEntries(
  microSkills.map((micro) => [micro.id, micro.prerequis])
);

const supportLinks: Record<string, string[]> = {
  comparer_nombres: ["decomposer_nombres"],
  decimal_comparer: ["comparer_nombres"],
  resoudre_probleme: ["calculer_mentalement", "decomposer_nombres"],
  completer_egalite: ["addition_posee", "soustraction_posee"],
  nombre_inconnu_simple: ["resoudre_probleme"],
  interpreter_donnees: ["comparer_nombres"],
  comparer_probabilites: ["interpreter_donnees"],
  calculer_perimetre: ["addition_posee"],
  calculer_aire_rectangle: ["multiplication_posee"],
  reconnaitre_proportionnalite: ["lire_tableau"],
  completer_tableau: ["multiplication_posee", "division_posee"],
  calculer_quatrieme: ["division_posee"],
  utiliser_pourcentage_simple: ["fraction_representer"],
  utiliser_echelle: ["convertir_longueurs"],
  coder_deplacement: ["verifier_alignement"],
  repetition_simple: ["calculer_mentalement"],
};

function buildMatrix(
  skillIndex: readonly string[],
  parentsMap: Record<string, string[]>,
  supportMap: Record<string, string[]>
): MatrixValue[][] {
  const matrix: MatrixValue[][] = Array.from({ length: skillIndex.length }, () =>
    Array.from({ length: skillIndex.length }, () => 0 as MatrixValue)
  );

  const indexMap = new Map<string, number>();
  skillIndex.forEach((id, index) => indexMap.set(id, index));

  for (const [childId, parentIds] of Object.entries(parentsMap)) {
    const childIndex = indexMap.get(childId);
    if (childIndex === undefined) continue;

    for (const parentId of parentIds) {
      const parentIndex = indexMap.get(parentId);
      if (parentIndex === undefined) continue;
      matrix[childIndex][parentIndex] = 2;
      matrix[parentIndex][childIndex] = -2;
    }
  }

  for (const [childId, supportIds] of Object.entries(supportMap)) {
    const childIndex = indexMap.get(childId);
    if (childIndex === undefined) continue;

    for (const supportId of supportIds) {
      const supportIndex = indexMap.get(supportId);
      if (supportIndex === undefined) continue;
      if (matrix[childIndex][supportIndex] === 0) {
        matrix[childIndex][supportIndex] = 1;
        matrix[supportIndex][childIndex] = -1;
      }
    }
  }

  return matrix;
}

export const matrixCm2MathsValues = buildMatrix(
  microSkillIndexCm2Maths,
  directParents,
  supportLinks
);

export const matrixCm2Maths: SkillMatrix = {
  id: "cm2_maths_matrix_v4",
  classe: "cm2",
  matiere: "maths",
  microSkillIndex: [...microSkillIndexCm2Maths],
  matrix: matrixCm2MathsValues,
};