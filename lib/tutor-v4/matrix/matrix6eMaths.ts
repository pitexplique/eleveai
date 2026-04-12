// loaders/matrix/matrix6eMaths.ts

import type { SkillMatrix, MatrixValue } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/6e/microSkills";

/**
 * Ordre des micro-compétences.
 * Dérivé automatiquement du référentiel central.
 */
export const microSkillIndex6eMaths = microSkills.map((micro) => micro.id);

/**
 * Liens forts :
 * dérivés automatiquement des prérequis définis dans microSkills.ts
 *
 * Si A dépend de B, alors :
 * - M[A][B] = 2
 * - M[B][A] = -2
 */
const directParents: Record<string, string[]> = Object.fromEntries(
  microSkills.map((micro) => [micro.id, micro.prerequis])
);

/**
 * Liens secondaires :
 * plus faibles, mais utiles pour guider.
 * On générera :
 * - M[A][B] = 1
 * - M[B][A] = -1
 */
const supportLinks: Record<string, string[]> = {
  decimal_comparer: ["entier_compare"],
  decimal_additionner: ["mental_addition"],
  decimal_multiplier: ["mental_multiplication"],
  decimal_diviser_par_entier: ["mental_division"],

  fraction_decimal: ["decimal_comparer"],
  fraction_compare: ["decimal_comparer"],

  pourcentage_decimal: ["decimal_multiplier"],
  pourcentage_calcul_simple: ["mental_multiplication"],

  prop_table: ["mental_multiplication"],
  prop_unit: ["mental_division"],

  pose_verifier: ["mental_strategies"],

  longueur_probleme: ["entier_compare"],
  perim_figure: ["longueur_comparer"],
  perim_probleme: ["longueur_probleme"],

  area_compter: ["perim_figure"],
  area_comparer: ["longueur_comparer"],
  area_decomposer: ["area_rectangle", "area_square", "perim_figure"],
  area_problemes: [
    "area_decomposer",
    "longueur_probleme",
    "decimal_multiplier",
    "prop_direct",
  ],
  area_defis: ["area_decomposer", "area_problemes"],

  volume_lire: ["data_lire_tableau"],
  triangle_possible_ou_non: ["longueur_comparer"],

  quadrilatere_lire_proprietes: ["triangle_sommets_cotes"],
  sym_reconnaitre: ["quadrilatere_identifier_nature"],

  data_interpreter: ["entier_compare"],
  proba_estimer: ["data_interpreter"],
  proba_lire: ["data_interpreter"],
};

/**
 * Génère automatiquement la matrice.
 */
function buildMatrix(
  skillIndex: readonly string[],
  parentsMap: Record<string, string[]>,
  supportMap: Record<string, string[]>
): MatrixValue[][] {
  const size = skillIndex.length;

  const matrix: MatrixValue[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0 as MatrixValue)
  );

  const indexMap = new Map<string, number>();
  skillIndex.forEach((id, index) => {
    indexMap.set(id, index);
  });

  // Liens forts : parents directs
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

  // Liens secondaires
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

export const matrix6eMathsValues = buildMatrix(
  microSkillIndex6eMaths,
  directParents,
  supportLinks
);

export const matrix6eMaths: SkillMatrix = {
  id: "6e_maths_matrix_v4",
  classe: "6e",
  matiere: "maths",
  microSkillIndex: [...microSkillIndex6eMaths],
  matrix: matrix6eMathsValues,
};