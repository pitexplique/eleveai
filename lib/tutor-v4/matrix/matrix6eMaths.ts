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
  // =========================
  // NOMBRES / DÉCIMAUX
  // =========================
  decimal_comparer: ["entier_compare", "entier_rang"],
  decimal_additionner: ["mental_addition", "entier_lire_ecrire"],
  decimal_multiplier: ["mental_multiplication", "decimal_additionner"],
  decimal_diviser_par_entier: ["mental_division", "decimal_lire_ecrire"],

  // =========================
  // FRACTIONS / POURCENTAGES
  // =========================
  fraction_decimal: ["decimal_comparer", "decimal_lire_ecrire"],
  fraction_compare: ["decimal_comparer", "fraction_quantite"],

  pourcentage_decimal: ["decimal_multiplier", "fraction_decimal"],
  pourcentage_calcul_simple: [
    "mental_multiplication",
    "fraction_quantite",
    "pourcentage_decimal",
  ],

  // =========================
  // PROPORTIONNALITÉ
  // =========================
  prop_table: ["mental_multiplication", "fraction_quantite"],
  prop_coeff: ["prop_table", "decimal_multiplier"],
  prop_unit: ["mental_division", "prop_table"],
  prop_direct: ["prop_coeff", "prop_unit", "pourcentage_calcul_simple"],
  prop_defis: ["prop_direct", "fraction_decimal", "decimal_multiplier"],

  // =========================
  // CALCUL POSÉ / MENTAL
  // =========================
  pose_verifier: ["mental_strategies", "entier_compare"],

  mental_strategies: [
    "mental_addition",
    "mental_subtraction",
    "mental_multiplication",
    "mental_division",
  ],

  // =========================
  // LONGUEURS / PÉRIMÈTRES
  // =========================
  longueur_convertir: ["decimal_multiplier", "decimal_diviser_par_entier"],
  longueur_comparer: ["entier_compare", "decimal_comparer"],
  longueur_probleme: ["entier_compare", "decimal_comparer"],

  perim_square: ["mental_multiplication", "longueur_mesurer"],
  perim_rectangle: ["mental_addition", "mental_multiplication"],
  perim_figure: ["longueur_comparer", "perim_square", "perim_rectangle"],
  perim_probleme: ["longueur_probleme", "perim_figure"],

  // =========================
  // AIRES
  // =========================
  area_compter: ["perim_figure"],
  area_rectangle: ["decimal_multiplier", "longueur_mesurer"],
  area_square: ["decimal_multiplier", "area_rectangle"],
  area_comparer: ["longueur_comparer", "area_compter"],
  area_decomposer: ["area_rectangle", "area_square", "perim_figure"],
  area_problemes: [
    "longueur_probleme",
    "decimal_multiplier",
    "prop_direct",
    "area_decomposer",
  ],
  area_defis: ["area_decomposer", "area_problemes"],

  // =========================
  // VOLUMES
  // =========================
  volume_unite: ["area_comprendre"],
  volume_compter: ["area_compter", "volume_unite"],
  volume_comparer: ["volume_compter", "area_comparer"],
  volume_assemblage: ["volume_compter"],
  volume_lire: ["data_lire_tableau", "volume_compter"],
  volume_defis: ["volume_lire", "volume_assemblage", "area_decomposer"],

  // =========================
  // ANGLES / TRIANGLES
  // =========================
  angle_compare: ["angle_droit"],
  angle_mesurer: ["angle_reconnaitre"],
  angle_tracer: ["angle_mesurer"],

  triangle_sommets_cotes: ["triangle_nommer"],
  triangle_type_cotes: ["triangle_sommets_cotes", "longueur_comparer"],
  triangle_type_angles: ["angle_droit", "angle_compare"],
  triangle_somme_angles: ["angle_mesurer", "triangle_type_angles"],
  triangle_angle_manquant: ["triangle_somme_angles", "mental_addition"],
  triangle_possible_ou_non: ["longueur_comparer", "triangle_sommets_cotes"],
  triangle_defis: [
    "triangle_type_cotes",
    "triangle_type_angles",
    "triangle_angle_manquant",
    "triangle_possible_ou_non",
  ],

  // =========================
  // QUADRILATÈRES
  // =========================
  quadrilatere_identifier_nature: [
    "quadrilatere_nommer_vocabulaire",
    "angle_droit",
  ],
  quadrilatere_lire_proprietes: [
    "triangle_sommets_cotes",
    "angle_droit",
    "longueur_comparer",
  ],
  quadrilatere_lien_proprietes: [
    "quadrilatere_identifier_nature",
    "quadrilatere_lire_proprietes",
  ],
  quadrilatere_distinguer: [
    "quadrilatere_identifier_nature",
    "quadrilatere_lien_proprietes",
  ],
  quadrilatere_conclusion: [
    "quadrilatere_lire_proprietes",
    "quadrilatere_lien_proprietes",
    "quadrilatere_distinguer",
  ],
  quadrilatere_completer_construire: [
    "quadrilatere_lire_proprietes",
    "angle_tracer",
    "longueur_mesurer",
  ],
  quadrilatere_defis: [
    "quadrilatere_conclusion",
    "quadrilatere_completer_construire",
  ],

  // =========================
  // SYMÉTRIE
  // =========================
  sym_reconnaitre: [
    "quadrilatere_identifier_nature",
    "triangle_sommets_cotes",
  ],
  sym_point: ["sym_reconnaitre", "longueur_mesurer"],
  sym_figure: ["sym_point", "triangle_sommets_cotes", "quadrilatere_nommer_vocabulaire"],
  sym_proprietes: [
    "sym_figure",
    "longueur_comparer",
    "angle_compare",
  ],
  sym_axes: [
    "sym_reconnaitre",
    "quadrilatere_identifier_nature",
    "triangle_type_cotes",
  ],
  sym_defis: [
    "sym_reconnaitre",
    "sym_point",
    "sym_figure",
    "sym_proprietes",
    "sym_axes",
  ],
    // =========================
  // ALGORITHMIQUE
  // =========================
  // =========================
  // ALGORITHMIQUE
  // =========================
  algo_sequence: ["mental_strategies", "entier_lire_ecrire"],

  algo_deplacement: [
    "algo_sequence",
    "longueur_mesurer",
    "angle_droit",
  ],

  algo_repetition: [
    "algo_sequence",
    "mental_multiplication",
    "mental_addition",
  ],

  algo_lire_programme: [
    "algo_sequence",
    "algo_deplacement",
    "algo_repetition",
  ],

  algo_figures: [
    "algo_deplacement",
    "algo_repetition",
    "angle_droit",
    "angle_tracer",
    "triangle_sommets_cotes",
    "quadrilatere_nommer_vocabulaire",
  ],

  algo_defis: [
    "algo_lire_programme",
    "algo_figures",
    "triangle_type_cotes",
    "quadrilatere_identifier_nature",
  ],

  // =========================
  // DONNÉES
  // =========================
  data_lire_graphique: ["data_lire_tableau"],
  data_prelever: ["data_lire_tableau", "data_lire_graphique"],
  data_comparer: ["data_prelever", "entier_compare"],
  data_interpreter: [
    "data_prelever",
    "data_comparer",
    "entier_compare",
  ],
  data_defis: [
    "data_lire_tableau",
    "data_lire_graphique",
    "data_prelever",
    "data_comparer",
    "data_interpreter",
  ],

  // =========================
  // PROBABILITÉS
  // =========================
  proba_comparer: ["proba_vocabulaire", "fraction_compare"],
  proba_issue: ["proba_vocabulaire", "data_lire_tableau"],
  proba_estimer: [
    "proba_vocabulaire",
    "proba_comparer",
    "data_interpreter",
  ],
  proba_lire: [
    "proba_vocabulaire",
    "proba_issue",
    "data_interpreter",
  ],
  proba_defis: [
    "proba_vocabulaire",
    "proba_comparer",
    "proba_issue",
    "proba_estimer",
    "proba_lire",
    "data_interpreter",
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