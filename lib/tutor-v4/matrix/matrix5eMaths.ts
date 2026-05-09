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
  relatif_signe: ["relatif_lire"],
  relatif_comparer: ["relatif_signe"],
  relatif_placer: ["relatif_comparer"],
  relatif_opposes: ["relatif_signe"],
  relatif_valeur_absolue: ["relatif_opposes"],
  relatif_defis: ["relatif_comparer", "relatif_placer", "relatif_valeur_absolue"],

  // =========================
  // OPÉRATIONS SUR LES RELATIFS
  // =========================
  relatif_addition: ["relatif_lire", "relatif_signe"],
  relatif_soustraction: ["relatif_addition", "relatif_opposes"],
  relatif_calcul: ["relatif_addition", "relatif_soustraction"],
  relatif_probleme: ["relatif_calcul", "relatif_comparer"],
  relatif_defis_ops: ["relatif_calcul", "relatif_probleme"],

  // =========================
  // FRACTIONS
  // =========================
  fraction_simplifier: ["fraction_egales"],
  fraction_rationnel: ["fraction_egales", "relatif_lire"],
  fraction_comparer: ["fraction_simplifier", "fraction_rationnel", "relatif_comparer"],
  fraction_addition: ["fraction_comparer", "fraction_simplifier"],
  fraction_produit: ["fraction_simplifier", "fraction_comparer"],
  fraction_quantite: ["fraction_produit", "prop_reconnaitre"],
  fraction_inverse: ["fraction_rationnel", "fraction_produit"],
  fraction_division: ["fraction_inverse", "fraction_produit"],
  fraction_oppose: ["fraction_rationnel", "relatif_opposes"],
  fraction_defis: [
    "fraction_addition",
    "fraction_quantite",
    "fraction_division",
    "fraction_oppose",
  ],

  // =========================
  // PROPORTIONNALITÉ
  // =========================
  prop_table: ["prop_reconnaitre", "fraction_comparer"],
  prop_quatrieme: ["prop_table", "prop_coeff"],
  prop_coeff: ["prop_table", "fraction_comparer"],
  prop_ratio: ["prop_reconnaitre", "fraction_comparer"],
  prop_pourcentage: ["prop_coeff", "fraction_quantite"],
  prop_coeff_mult: ["prop_pourcentage", "prop_coeff"],
  prop_probleme: ["prop_quatrieme", "prop_coeff", "prop_pourcentage"],
  prop_defis: ["prop_probleme", "prop_ratio", "prop_coeff_mult"],

  // =========================
  // CALCUL LITTÉRAL
  // =========================
  litteral_traduire: ["litteral_expression"],
  litteral_substituer: ["litteral_expression", "relatif_calcul"],
  litteral_reduire: ["litteral_expression", "litteral_substituer"],
  litteral_defis: ["litteral_traduire", "litteral_substituer", "litteral_reduire"],

  // =========================
  // ANGLES
  // =========================
  angle_mesurer: ["angle_lire"],
  angle_tracer: ["angle_mesurer"],
  angle_estimer: ["angle_lire", "angle_mesurer"],
  angle_defis: ["angle_tracer", "angle_estimer"],

  // =========================
  // TRIANGLES
  // =========================
  triangle_nature: ["triangle_reconnaitre", "angle_lire"],
  triangle_construire: ["triangle_reconnaitre", "angle_tracer"],
  triangle_somme_angles: ["triangle_reconnaitre", "angle_mesurer"],
  triangle_defis: ["triangle_nature", "triangle_construire", "triangle_somme_angles"],

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
  aire_triangle: ["aire_comprendre", "triangle_reconnaitre"],
  aire_parallelogramme: ["aire_comprendre", "angle_lire"],
  aire_composer: ["aire_triangle", "aire_parallelogramme"],
  aire_defis: ["aire_composer", "aire_comprendre"],

  // =========================
  // VOLUMES
  // =========================
  volume_pave: ["volume_comprendre", "relatif_calcul"],
  volume_prisme: ["volume_comprendre", "aire_comprendre", "aire_triangle"],
  volume_cylindre: ["volume_comprendre", "aire_comprendre"],
  volume_assemblage: ["volume_pave", "volume_prisme", "volume_cylindre"],
  volume_unites: ["volume_comprendre", "prop_coeff"],
  volume_defis: [
    "volume_pave",
    "volume_prisme",
    "volume_cylindre",
    "volume_assemblage",
    "volume_unites",
  ],

  // =========================
  // STATISTIQUES
  // =========================
  stat_lire_tableau: ["stat_organiser_donnees"],
  stat_lire_graphique: ["stat_lire_tableau"],
  stat_effectif_frequence: ["stat_lire_tableau", "fraction_comparer"],
  stat_representer: ["stat_lire_tableau", "stat_effectif_frequence"],
  stat_choisir_representation: ["stat_lire_graphique", "stat_representer"],
  stat_moyenne: ["stat_effectif_frequence", "relatif_calcul"],
  stat_defis: ["stat_lire_graphique", "stat_choisir_representation", "stat_moyenne"],

  // =========================
  // PROBABILITÉS
  // =========================
  proba_issues: ["proba_vocabulaire", "stat_lire_tableau"],
  proba_equiprobabilite: ["proba_issues"],
  proba_calculer: ["proba_issues", "proba_equiprobabilite", "fraction_comparer"],
  proba_defis: ["proba_calculer", "proba_equiprobabilite"],
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