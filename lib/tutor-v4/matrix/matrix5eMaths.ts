import type { SkillMatrix, MatrixValue } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/5e/microSkills";

/**
 * Ordre des micro-compétences.
 * Dérivé automatiquement du référentiel central 5e.
 */
export const microSkillIndex5eMaths = microSkills.map((micro) => micro.id);

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
 * plus faibles, mais utiles pour guider la progression.
 */
const supportLinks: Record<string, string[]> = {
  // =========================
  // NOMBRES RELATIFS
  // =========================
  relatif_comparer: ["relatif_placer"],
  relatif_defis: ["relatif_opposes"],

  // =========================
  // OPÉRATIONS SUR LES RELATIFS
  // =========================
  relatif_soustraction: ["relatif_comparer"],
  relatif_calcul: ["relatif_comparer"],
  relatif_probleme: ["relatif_placer"],
  relatif_defis_ops: ["relatif_soustraction"],

  // =========================
  // FRACTIONS ET NOMBRES RATIONNELS
  // =========================
  fraction_rationnel: ["relatif_lire", "relatif_signe"],
  fraction_comparer: ["relatif_comparer", "fraction_rationnel"],
  fraction_produit: ["fraction_comparer"],
  fraction_quantite: ["fraction_comparer", "fraction_produit"],
  fraction_inverse: ["fraction_simplifier", "fraction_rationnel"],
  fraction_division: ["fraction_inverse", "fraction_produit"],
  fraction_oppose: ["relatif_opposes", "fraction_rationnel"],
  fraction_defis: ["fraction_quantite", "fraction_division", "fraction_oppose"],

  // =========================
  // PROPORTIONNALITÉ
  // =========================
  prop_table: ["fraction_comparer"],
  prop_quatrieme: ["prop_coeff", "fraction_comparer"],
  prop_coeff: ["fraction_comparer"],
  prop_ratio: ["fraction_comparer", "prop_reconnaitre"],
  prop_pourcentage: ["prop_table", "fraction_comparer"],
  prop_coeff_mult: ["prop_pourcentage", "prop_coeff"],
  prop_probleme: ["prop_quatrieme", "fraction_quantite", "relatif_calcul"],
  prop_defis: ["prop_ratio", "prop_coeff_mult", "prop_pourcentage"],

  // =========================
  // CALCUL LITTÉRAL
  // =========================
  litteral_traduire: ["relatif_lire"],
  litteral_substituer: ["relatif_calcul"],
  litteral_reduire: ["litteral_substituer"],
  litteral_defis: ["litteral_reduire"],

  // =========================
  // ANGLES
  // =========================
  angle_mesurer: ["relatif_lire"],
  angle_tracer: ["angle_estimer"],
  angle_defis: ["angle_mesurer"],

  // =========================
  // TRIANGLES
  // =========================
  triangle_construire: ["angle_tracer"],
  triangle_somme_angles: ["angle_mesurer"],
  triangle_defis: ["triangle_construire"],

  // =========================
  // SYMÉTRIE CENTRALE
  // =========================
  sym_centrale_point: ["relatif_placer"],
  sym_centrale_figure: ["sym_centrale_point"],
  sym_centrale_proprietes: ["sym_centrale_figure"],
  sym_centrale_defis: ["sym_centrale_proprietes"],

  // =========================
  // AIRES
  // =========================
  aire_triangle: ["triangle_reconnaitre"],
  aire_parallelogramme: ["angle_lire"],
  aire_composer: ["aire_triangle", "aire_parallelogramme"],
  aire_defis: ["aire_composer"],

  // =========================
  // VOLUMES
  // =========================
  volume_prisme: ["aire_triangle"],
  volume_pave: ["relatif_calcul"],
  volume_unites: ["volume_comprendre"],
  volume_defis: ["volume_prisme", "volume_pave"],

  // =========================
  // STATISTIQUES
  // =========================
  stat_lire_graphique: ["stat_lire_tableau"],
  stat_effectif_frequence: ["fraction_comparer"],
  stat_moyenne: ["relatif_calcul"],
  stat_defis: ["stat_moyenne"],

  // =========================
  // PROBABILITÉS
  // =========================
  proba_issues: ["stat_lire_tableau"],
  proba_equiprobabilite: ["proba_issues"],
  proba_calculer: ["fraction_comparer", "stat_effectif_frequence"],
  proba_defis: ["proba_calculer"],
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

  // Liens forts : parent direct
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

export const matrix5eMathsValues = buildMatrix(
  microSkillIndex5eMaths,
  directParents,
  supportLinks
);

export const matrix5eMaths: SkillMatrix = {
  id: "5e_maths_matrix_v4",
  classe: "5e",
  matiere: "maths",
  microSkillIndex: [...microSkillIndex5eMaths],
  matrix: matrix5eMathsValues,
};