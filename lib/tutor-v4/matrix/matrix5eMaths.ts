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
  relatif_oppose: ["relatif_signe"],
  relatif_valeur_absolue: ["relatif_oppose"],
  relatif_defi: ["relatif_comparer", "relatif_placer", "relatif_valeur_absolue"],

  // =========================
  // OPÉRATIONS SUR LES RELATIFS
  // =========================
  relatif_addition: ["relatif_lire", "relatif_signe"],
  relatif_soustraction: ["relatif_addition", "relatif_oppose"],
  relatif_calcul: ["relatif_addition", "relatif_soustraction"],
  relatif_probleme: ["relatif_calcul", "relatif_comparer"],
  relatif_operation_defi: ["relatif_calcul", "relatif_probleme"],

  // =========================
  // FRACTIONS
  // =========================
  fraction_simplifier: ["fraction_egale"],
  fraction_rationnel: ["fraction_egale", "relatif_lire"],
  fraction_comparer: ["fraction_simplifier", "fraction_rationnel", "relatif_comparer"],
  fraction_additionner: ["fraction_comparer", "fraction_simplifier"],
  fraction_multiplier: ["fraction_simplifier", "fraction_comparer"],
  fraction_quantite: ["fraction_multiplier", "prop_reconnaitre"],
  fraction_inverse: ["fraction_rationnel", "fraction_multiplier"],
  fraction_diviser: ["fraction_inverse", "fraction_multiplier"],
  fraction_oppose: ["fraction_rationnel", "relatif_oppose"],
  fraction_defi: [
    "fraction_additionner",
    "fraction_quantite",
    "fraction_diviser",
    "fraction_oppose",
  ],

  // =========================
  // PROPORTIONNALITÉ
  // =========================
  prop_table: ["prop_reconnaitre", "fraction_comparer"],
  prop_quatrieme: ["prop_table", "prop_coeff"],
  prop_coeff: ["prop_table", "fraction_comparer"],
  prop_rapport: ["prop_reconnaitre", "fraction_comparer"],
  prop_pourcentage: ["prop_coeff", "fraction_quantite"],
  prop_coeff_multiplicateur: ["prop_pourcentage", "prop_coeff"],
  prop_probleme: ["prop_quatrieme", "prop_coeff", "prop_pourcentage"],
  prop_defi: ["prop_probleme", "prop_rapport", "prop_coeff_multiplicateur"],

  // =========================
  // CALCUL LITTÉRAL
  // =========================
  litteral_traduire: ["litteral_expression_comprendre"],
  litteral_substituer: ["litteral_expression_comprendre", "relatif_calcul"],
  litteral_reduire: ["litteral_expression_comprendre", "litteral_substituer"],
  litteral_defi: ["litteral_traduire", "litteral_substituer", "litteral_reduire"],

  // =========================
  // ANGLES
  // =========================
  angle_mesurer: ["angle_lire"],
  angle_tracer: ["angle_mesurer"],
  angle_estimer: ["angle_lire", "angle_mesurer"],
  angle_defi: ["angle_tracer", "angle_estimer"],

  // =========================
  // TRIANGLES
  // =========================
  triangle_nature: ["triangle_reconnaitre", "angle_lire"],
  triangle_construire: ["triangle_reconnaitre", "angle_tracer"],
  triangle_somme_angle: ["triangle_reconnaitre", "angle_mesurer"],
  triangle_defi: ["triangle_nature", "triangle_construire", "triangle_somme_angle"],

  // =========================
  // SYMÉTRIE CENTRALE
  // =========================
  sym_centrale_point: ["relatif_placer"],
  sym_centrale_figure: ["sym_centrale_point"],
  sym_centrale_propriete: ["sym_centrale_figure"],
  sym_centrale_defi: ["sym_centrale_propriete"],

  // =========================
  // AIRES
  // =========================
  aire_triangle: ["aire_comprendre", "triangle_reconnaitre"],
  aire_parallelogramme: ["aire_comprendre", "angle_lire"],
  aire_composer: ["aire_triangle", "aire_parallelogramme"],
  aire_defi: ["aire_composer", "aire_comprendre"],

  // =========================
  // VOLUMES
  // =========================
  volume_pave: ["volume_comprendre", "relatif_calcul"],
  volume_prisme: ["volume_comprendre", "aire_comprendre", "aire_triangle"],
  volume_cylindre: ["volume_comprendre", "aire_comprendre"],
  volume_assemblage: ["volume_pave", "volume_prisme", "volume_cylindre"],
  volume_unite: ["volume_comprendre", "prop_coeff"],
  volume_defi: [
    "volume_pave",
    "volume_prisme",
    "volume_cylindre",
    "volume_assemblage",
    "volume_unite",
  ],

  // =========================
  // STATISTIQUES
  // =========================
  stat_lire_tableau: ["stat_donnee_organiser"],
  stat_lire_graphique: ["stat_lire_tableau"],
  stat_effectif_frequence: ["stat_lire_tableau", "fraction_comparer"],
  stat_representer: ["stat_lire_tableau", "stat_effectif_frequence"],
  stat_representation_choisir: ["stat_lire_graphique", "stat_representer"],
  stat_moyenne: ["stat_effectif_frequence", "relatif_calcul"],
  stat_defi: ["stat_lire_graphique", "stat_representation_choisir", "stat_moyenne"],

  // =========================
  // PROBABILITÉS
  // =========================
  proba_issue: ["proba_vocabulaire", "stat_lire_tableau"],
  proba_equiprobabilite: ["proba_issue"],
  proba_calculer: ["proba_issue", "proba_equiprobabilite", "fraction_comparer"],
  proba_defi: ["proba_calculer", "proba_equiprobabilite"],

    // =========================
  // ALGORITHMIQUE
  // =========================
  algo_sequence: ["litteral_expression_comprendre", "relatif_lire"],

  algo_entree_sortie: [
    "algo_sequence",
    "litteral_traduire",
  ],

  algo_formule_bloc: [
    "algo_entree_sortie",
    "litteral_expression_comprendre",
    "litteral_substituer",
    "relatif_calcul",
  ],

  algo_expression_valeur: [
    "algo_formule_bloc",
    "litteral_substituer",
    "relatif_calcul",
    "fraction_quantite",
  ],

  algo_prevoir_expression: [
    "algo_expression_valeur",
    "litteral_reduire",
    "relatif_calcul",
  ],

  algo_parametre: [
    "algo_prevoir_expression",
    "prop_coeff",
    "prop_pourcentage",
  ],

  algo_boucle: [
    "algo_sequence",
    "algo_parametre",
    "relatif_calcul",
    "prop_table",
  ],

  algo_defi: [
    "algo_boucle",
    "algo_prevoir_expression",
    "algo_parametre",
    "litteral_defi",
    "prop_defi",
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