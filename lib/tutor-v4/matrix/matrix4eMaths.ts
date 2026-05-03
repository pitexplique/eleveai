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
  // OPÉRATIONS SUR LES RELATIFS
  // =========================
  relatif_soustraction: ["relatif_addition"],
  relatif_multiplication: ["relatif_addition"],
  relatif_division: ["relatif_multiplication"],
  relatif_calcul: [
    "relatif_addition",
    "relatif_soustraction",
    "relatif_multiplication",
    "relatif_division",
  ],
  relatif_probleme: ["relatif_calcul"],
  relatif_defis_ops: ["relatif_soustraction", "relatif_multiplication"],

  // =========================
  // FRACTIONS
  // =========================
  fraction_simplifier: ["fraction_egales"],
  fraction_decimal: ["fraction_simplifier"],
  fraction_rationnel: ["fraction_egales", "fraction_decimal"],
  fraction_comparer: ["fraction_simplifier", "fraction_decimal"],
  fraction_addition: ["fraction_comparer", "relatif_addition"],
  fraction_produit: ["fraction_simplifier"],
  fraction_quantite: ["fraction_comparer", "fraction_produit"],
  fraction_inverse: ["fraction_simplifier", "fraction_rationnel"],
  fraction_division: ["fraction_inverse", "fraction_produit"],
  fraction_oppose: ["fraction_rationnel", "relatif_multiplication"],
  fraction_defis: ["fraction_quantite", "fraction_division", "fraction_oppose"],

  // =========================
  // PROPORTIONNALITÉ
  // =========================
  prop_table: ["prop_reconnaitre", "fraction_comparer"],
  prop_coeff: ["prop_table", "fraction_comparer"],
  prop_quatrieme: ["prop_table", "prop_coeff", "fraction_comparer"],
  prop_pourcentage: ["prop_coeff", "fraction_comparer"],
  prop_coeff_mult: ["prop_pourcentage", "prop_coeff"],
  prop_evolution: ["prop_pourcentage", "prop_coeff_mult", "relatif_calcul"],
  prop_probleme: [
    "prop_quatrieme",
    "prop_coeff",
    "prop_pourcentage",
    "prop_evolution",
    "fraction_quantite",
    "relatif_calcul",
  ],
  prop_defis: ["prop_evolution", "prop_probleme", "prop_coeff_mult"],

  // =========================
  // EXPRESSIONS LITTÉRALES
  // =========================
  expr_litterale_traduire: ["relatif_calcul"],
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
  ir_lier_distributivite: ["distrib_double", "distrib_reduire"],
  ir_reconnaitre: ["ir_lier_distributivite", "distrib_reconnaitre"],
  ir_developper: ["ir_reconnaitre", "ir_lier_distributivite", "distrib_double"],
  ir_choisir: ["ir_reconnaitre", "ir_developper"],
  ir_defis: ["ir_choisir", "ir_developper", "distrib_double"],


  // =========================
  // FACTORISATION
  // =========================
  facteur_commun: ["distrib_simple", "expr_litterale_reduire"],
  factoriser_simple: ["facteur_commun", "distrib_simple"],
  factoriser_ir: ["factoriser_simple", "ir_reconnaitre", "ir_developper"],
  factoriser_verifier: ["factoriser_simple", "distrib_simple"],
  factorisation_defis: ["factoriser_ir", "factoriser_verifier"],

  // =========================
  // ÉQUATIONS
  // =========================
  equation_traduire: ["expr_litterale_traduire"],
  equation_resoudre_simple: ["expr_litterale_substituer", "relatif_calcul"],
  equation_resoudre_reduction: ["expr_litterale_reduire"],
  equation_resoudre_distributivite: ["distrib_simple"],
  equation_verifier: ["expr_litterale_substituer"],
  equation_probleme: ["equation_traduire", "relatif_calcul"],
  equation_defis: ["equation_probleme", "equation_resoudre_distributivite"],


  // =========================
  // PYTHAGORE
  // =========================
  pythagore_carres_racines: ["relatif_calcul"],
  pythagore_reconnaitre: [],
  pythagore_calculer_hypotenuse: [
    "pythagore_carres_racines",
    "pythagore_reconnaitre",
  ],
  pythagore_calculer_cote: [
    "pythagore_carres_racines",
    "pythagore_reconnaitre",
  ],
  pythagore_reciproque_verifier: ["pythagore_carres_racines"],
  pythagore_reciproque_conclure: [
    "pythagore_reciproque_verifier",
    "pythagore_reconnaitre",
  ],
  pythagore_rediger: [
    "pythagore_calculer_hypotenuse",
    "pythagore_calculer_cote",
    "pythagore_reciproque_conclure",
  ],
  pythagore_defis: [
    "pythagore_rediger",
    "pythagore_reciproque_conclure",
  ],

  // =========================
  // THALÈS
  // =========================
  thales_configuration: ["prop_reconnaitre"],
  thales_rapports: [
    "thales_configuration",
    "prop_table",
    "prop_coeff",
    "fraction_comparer",
  ],
  thales_calculer_longueur: [
    "thales_rapports",
    "prop_quatrieme",
    "prop_coeff",
    "relatif_calcul",
  ],
  thales_reciproque_verifier: [
    "thales_rapports",
    "fraction_comparer",
    "prop_coeff",
  ],
  thales_reciproque_conclure: [
    "thales_reciproque_verifier",
    "thales_configuration",
  ],
  thales_rediger: [
    "thales_calculer_longueur",
    "thales_reciproque_conclure",
    "prop_probleme",
  ],
  thales_defis: [
    "thales_rediger",
    "thales_calculer_longueur",
    "thales_reciproque_conclure",
    "prop_defis",
  ],

  // =========================
  // PARALLÉLOGRAMMES
  // =========================
  para_proprietes: ["para_reconnaitre"],
  para_diagonales: ["para_proprietes"],
  para_montrer: ["para_proprietes", "para_diagonales"],
  para_aire: ["aire_parallelogramme"],
  para_probleme: ["para_montrer", "para_aire"],
  para_defis: ["para_probleme"],

  // =========================
  // TRANSFORMATIONS
  // =========================
  transfo_translation: ["transfo_symetrie_centrale"],
  transfo_rotation: ["transfo_symetrie_centrale"],
  transfo_proprietes: ["transfo_symetrie_centrale","transfo_translation","transfo_rotation"],
  transfo_defis: ["transfo_translation", "transfo_rotation"],

  // =========================
  // PÉRIMÈTRES
  // =========================
  perimetre_rectangle: ["relatif_addition"],
  perimetre_carre: ["relatif_multiplication"],
  perimetre_triangle: ["relatif_addition"],
  perimetre_figure: [
    "perimetre_rectangle",
    "perimetre_carre",
    "perimetre_triangle",
  ],
  perimetre_probleme: ["perimetre_figure"],
  perimetre_defis: ["perimetre_probleme"],

  // =========================
  // AIRES
  // =========================
  aire_rectangle: ["relatif_multiplication"],
  aire_carre: ["relatif_multiplication"],
  aire_triangle: ["aire_rectangle"],
  aire_parallelogramme: ["aire_rectangle"],
  aire_figure: [
    "aire_rectangle",
    "aire_carre",
    "aire_triangle",
    "aire_parallelogramme",
  ],
  aire_probleme: ["aire_figure"],
  aire_defis: ["aire_probleme"],

  // =========================
  // VOLUMES
  // =========================
  volume_lien_aire: [
    "aire_rectangle",
    "aire_triangle",
    "aire_parallelogramme",
  ],

  volume_pave: ["volume_lien_aire", "aire_rectangle", "relatif_multiplication"],

  volume_prisme: [
    "volume_lien_aire",
    "aire_triangle",
    "aire_parallelogramme",
    "relatif_multiplication",
  ],

  volume_cylindre: [
    "volume_lien_aire",
    "aire_carre",
    "relatif_multiplication",
  ],

  volume_unites: ["volume_pave", "volume_prisme", "volume_cylindre"],

  volume_defis: [
    "volume_pave",
    "volume_prisme",
    "volume_cylindre",
    "volume_unites",
  ],

// =========================
// STATISTIQUES
// =========================
  stat_lire_graphique: ["stat_lire_tableau"],
  stat_effectif: ["stat_lire_tableau"],
  stat_frequence: ["stat_effectif"],
  stat_moyenne: ["stat_effectif", "relatif_calcul"],
  stat_mediane: ["stat_effectif"],
  stat_etendue: ["stat_lire_tableau"],
  stat_interpretation: ["stat_moyenne", "stat_mediane", "stat_etendue"],
  stat_probleme: ["stat_interpretation"],
  stat_defis: ["stat_probleme"],

  // =========================
  // PROBABILITÉS
  // =========================
  proba_issues: ["proba_vocabulaire", "stat_lire_tableau"],
  proba_evenements: ["proba_vocabulaire", "proba_issues"],
  proba_equiprobabilite: ["proba_issues"],
  proba_calculer_fraction: [
    "proba_issues",
    "proba_equiprobabilite",
    "fraction_comparer",
  ],
  proba_convertir: ["proba_calculer_fraction", "prop_pourcentage"],
  proba_comparer: [
    "proba_calculer_fraction",
    "fraction_comparer",
  ],
  proba_defis: [
    "proba_evenements",
    "proba_convertir",
    "proba_comparer",
  ],
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