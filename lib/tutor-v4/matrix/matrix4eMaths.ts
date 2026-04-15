import type { SkillMatrix, MatrixValue } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/4e/microSkills";

/**
 * Ordre des micro-compétences.
 * Dérivé automatiquement du référentiel central 4e.
 */
export const microSkillIndex4eMaths = microSkills.map((micro) => micro.id);

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
  relatif_multiplication: ["relatif_comparer"],
  relatif_division: ["fraction_rationnel"],
  relatif_calcul: ["relatif_comparer"],
  relatif_probleme: ["relatif_placer"],
  relatif_defis_ops: ["relatif_soustraction", "relatif_multiplication"],

  // =========================
  // FRACTIONS
  // =========================
  fraction_rationnel: ["relatif_lire", "relatif_signe"],
  fraction_comparer: ["relatif_comparer", "fraction_rationnel"],
  fraction_addition: ["relatif_addition"],
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
  prop_pourcentage: ["prop_table", "fraction_comparer"],
  prop_coeff_mult: ["prop_pourcentage", "prop_coeff"],
  prop_evolution: ["prop_pourcentage", "prop_coeff_mult", "relatif_calcul"],
  prop_probleme: ["prop_quatrieme", "fraction_quantite", "relatif_calcul"],
  prop_defis: ["prop_evolution", "prop_pourcentage", "prop_coeff_mult"],

  // =========================
  // EXPRESSIONS LITTÉRALES
  // =========================
  expr_litterale_traduire: ["relatif_lire"],
  expr_litterale_substituer: ["relatif_calcul"],
  expr_litterale_reduire: ["expr_litterale_substituer"],
  expr_litterale_defis: ["expr_litterale_reduire"],

  // =========================
  // DISTRIBUTIVITÉ
  // =========================
  distrib_simple: ["expr_litterale_reduire"],
  distrib_double: ["distrib_reconnaitre"],
  distrib_reduire: ["expr_litterale_reduire", "distrib_double"],
  distrib_reconnaitre: ["expr_litterale_comprendre"],
  distrib_defis: ["distrib_reduire", "distrib_double"],

  // =========================
  // IDENTITÉS REMARQUABLES
  // =========================
  ir_reconnaitre: ["distrib_reconnaitre"],
  ir_developper: ["distrib_double"],
  ir_choisir: ["ir_reconnaitre"],
  ir_lier_distributivite: ["ir_developper", "distrib_double"],
  ir_defis: ["ir_choisir", "ir_lier_distributivite"],

  // =========================
  // FACTORISATION
  // =========================
  facteur_commun: ["expr_litterale_reduire"],
  factoriser_simple: ["distrib_simple"],
  factoriser_ir: ["ir_reconnaitre", "ir_developper"],
  factoriser_verifier: ["distrib_simple", "factoriser_simple"],
  factorisation_defis: ["factoriser_ir", "factoriser_verifier"],

  // =========================
  // ÉQUATIONS
  // =========================
  equation_traduire: ["expr_litterale_traduire"],
  equation_resoudre_simple: ["expr_litterale_substituer"],
  equation_resoudre_reduction: ["expr_litterale_reduire"],
  equation_resoudre_distributivite: ["distrib_simple"],
  equation_verifier: ["expr_litterale_substituer"],
  equation_probleme: ["equation_traduire", "relatif_calcul"],
  equation_defis: ["equation_probleme", "equation_resoudre_distributivite"],

  // =========================
  // TRIANGLES
  // =========================
  triangle_nature: ["relatif_comparer"],
  triangle_construire: ["triangle_nature"],
  triangle_egalite: ["relatif_addition", "relatif_comparer"],
  triangle_defis: ["triangle_construire", "triangle_egalite"],

  // =========================
  // PYTHAGORE
  // =========================
  pythagore_calculer: ["relatif_calcul"],
  pythagore_verifier: ["triangle_nature", "pythagore_calculer"],
  pythagore_rediger: ["pythagore_calculer"],
  pythagore_defis: ["pythagore_verifier", "pythagore_rediger"],

  // =========================
  // TRANSFORMATIONS
  // =========================
  transfo_translation: ["relatif_placer"],
  transfo_rotation: ["relatif_placer"],
  transfo_proprietes: ["triangle_nature"],
  transfo_defis: ["transfo_translation", "transfo_rotation"],

  // =========================
  // GRANDEURS ET MESURES
  // =========================
  grandeur_convertir: ["fraction_quantite"],
  grandeur_vitesse: ["prop_coeff", "relatif_calcul"],
  grandeur_probleme: ["grandeur_vitesse"],
  grandeur_defis: ["grandeur_probleme"],

  // =========================
  // VOLUMES
  // =========================
  volume_pave: ["relatif_calcul"],
  volume_prisme: ["fraction_quantite"],
  volume_unites: ["grandeur_convertir"],
  volume_defis: ["volume_prisme", "volume_pave"],

  // =========================
  // STATISTIQUES
  // =========================
  stat_lire_graphique: ["stat_lire_tableau"],
  stat_effectif_frequence: ["fraction_comparer"],
  stat_moyenne: ["relatif_calcul"],
  stat_mediane: ["relatif_comparer", "stat_lire_tableau"],
  stat_defis: ["stat_moyenne", "stat_mediane"],

  // =========================
  // PROBABILITÉS
  // =========================
  proba_issues: ["stat_lire_tableau"],
  proba_equiprobabilite: ["proba_issues"],
  proba_calculer: ["fraction_comparer", "stat_effectif_frequence"],
  proba_comparer: ["relatif_comparer", "proba_calculer"],
  proba_defis: ["proba_calculer", "proba_comparer"],
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

export const matrix4eMathsValues = buildMatrix(
  microSkillIndex4eMaths,
  directParents,
  supportLinks
);

export const matrix4eMaths: SkillMatrix = {
  id: "4e_maths_matrix_v4",
  classe: "4e",
  matiere: "maths",
  microSkillIndex: [...microSkillIndex4eMaths],
  matrix: matrix4eMathsValues,
};