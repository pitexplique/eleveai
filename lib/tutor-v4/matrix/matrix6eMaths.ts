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
  decimal_comparer: ["entier_comparer", "entier_rang"],
  decimal_additionner: ["entier_addition_mentale", "entier_lire_ecrire"],
  decimal_multiplier: ["entier_multiplication_mentale", "decimal_additionner"],
  decimal_diviser_par_entier: ["entier_division_mentale", "decimal_lire_ecrire"],

  // =========================
  // FRACTIONS / POURCENTAGES
  // =========================
  fraction_decimal: ["decimal_comparer", "decimal_lire_ecrire"],
  fraction_comparer: ["decimal_comparer", "fraction_quantite"],

  pourcentage_decimal: ["decimal_multiplier", "fraction_decimal"],
  pourcentage_calcul_simple: [
    "entier_multiplication_mentale",
    "fraction_quantite",
    "pourcentage_decimal",
  ],

  // =========================
  // PROPORTIONNALITÉ
  // =========================
  prop_table: ["entier_multiplication_mentale", "fraction_quantite"],
  prop_coeff: ["prop_table", "decimal_multiplier"],
  prop_unite: ["entier_division_mentale", "prop_table"],
  prop_direct: ["prop_coeff", "prop_unite", "pourcentage_calcul_simple"],
  prop_defi: ["prop_direct", "fraction_decimal", "decimal_multiplier"],

  // =========================
  // CALCUL POSÉ / MENTAL
  // =========================
  entier_calcul_verifier: ["entier_strategie_mentale", "entier_comparer"],

  entier_strategie_mentale: [
    "entier_addition_mentale",
    "entier_soustraction_mentale",
    "entier_multiplication_mentale",
    "entier_division_mentale",
  ],

  // =========================
  // LONGUEURS / PÉRIMÈTRES
  // =========================
  aire_longueur_convertir: ["decimal_multiplier", "decimal_diviser_par_entier"],
  aire_longueur_comparer: ["entier_comparer", "decimal_comparer"],
  aire_longueur_probleme: ["entier_comparer", "decimal_comparer"],

  aire_perimetre_carre: ["entier_multiplication_mentale", "aire_longueur_mesurer"],
  aire_perimetre_rectangle: ["entier_addition_mentale", "entier_multiplication_mentale"],
  aire_perimetre_figure: ["aire_longueur_comparer", "aire_perimetre_carre", "aire_perimetre_rectangle"],
  aire_perimetre_probleme: ["aire_longueur_probleme", "aire_perimetre_figure"],

  // =========================
  // AIRES
  // =========================
  aire_compter: ["aire_perimetre_figure"],
  aire_rectangle: ["decimal_multiplier", "aire_longueur_mesurer"],
  aire_carre: ["decimal_multiplier", "aire_rectangle"],
  aire_comparer: ["aire_longueur_comparer", "aire_compter"],
  aire_decomposer: ["aire_rectangle", "aire_carre", "aire_perimetre_figure"],
  aire_probleme: [
    "aire_longueur_probleme",
    "decimal_multiplier",
    "prop_direct",
    "aire_decomposer",
  ],
  aire_defi: ["aire_decomposer", "aire_probleme"],

  // =========================
  // VOLUMES
  // =========================
  volume_unite: ["aire_comprendre"],
  volume_compter: ["aire_compter", "volume_unite"],
  volume_comparer: ["volume_compter", "aire_comparer"],
  volume_assemblage: ["volume_compter"],
  volume_lire: ["stat_donnee_lire_tableau", "volume_compter"],
  volume_defi: ["volume_lire", "volume_assemblage", "aire_decomposer"],

  // =========================
  // ANGLES / TRIANGLES
  // =========================
  angle_comparer: ["angle_droit"],
  angle_mesurer: ["angle_reconnaitre"],
  angle_tracer: ["angle_mesurer"],

  triangle_sommet_cote: ["triangle_nommer"],
  triangle_type_cote: ["triangle_sommet_cote", "aire_longueur_comparer"],
  triangle_type_angle: ["angle_droit", "angle_comparer"],
  triangle_somme_angle: ["angle_mesurer", "triangle_type_angle"],
  triangle_angle_manquant: ["triangle_somme_angle", "entier_addition_mentale"],
  triangle_possible_ou_non: ["aire_longueur_comparer", "triangle_sommet_cote"],
  triangle_defi: [
    "triangle_type_cote",
    "triangle_type_angle",
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
  quadrilatere_lire_propriete: [
    "triangle_sommet_cote",
    "angle_droit",
    "aire_longueur_comparer",
  ],
  quadrilatere_lien_propriete: [
    "quadrilatere_identifier_nature",
    "quadrilatere_lire_propriete",
  ],
  quadrilatere_distinguer: [
    "quadrilatere_identifier_nature",
    "quadrilatere_lien_propriete",
  ],
  quadrilatere_conclusion: [
    "quadrilatere_lire_propriete",
    "quadrilatere_lien_propriete",
    "quadrilatere_distinguer",
  ],
  quadrilatere_completer_construire: [
    "quadrilatere_lire_propriete",
    "angle_tracer",
    "aire_longueur_mesurer",
  ],
  quadrilatere_defi: [
    "quadrilatere_conclusion",
    "quadrilatere_completer_construire",
  ],

  // =========================
  // SYMÉTRIE
  // =========================
  sym_reconnaitre: [
    "quadrilatere_identifier_nature",
    "triangle_sommet_cote",
  ],
  sym_point: ["sym_reconnaitre", "aire_longueur_mesurer"],
  sym_figure: ["sym_point", "triangle_sommet_cote", "quadrilatere_nommer_vocabulaire"],
  sym_propriete: [
    "sym_figure",
    "aire_longueur_comparer",
    "angle_comparer",
  ],
  sym_axe: [
    "sym_reconnaitre",
    "quadrilatere_identifier_nature",
    "triangle_type_cote",
  ],
  sym_defi: [
    "sym_reconnaitre",
    "sym_point",
    "sym_figure",
    "sym_propriete",
    "sym_axe",
  ],

  // =========================
  // ALGORITHMIQUE
  // =========================
  algo_sequence: ["entier_strategie_mentale", "entier_lire_ecrire"],

  algo_deplacement: [
    "algo_sequence",
    "aire_longueur_mesurer",
    "angle_droit",
  ],

  algo_repetition: [
    "algo_sequence",
    "entier_multiplication_mentale",
    "entier_addition_mentale",
  ],

  algo_lire_programme: [
    "algo_sequence",
    "algo_deplacement",
    "algo_repetition",
  ],

  algo_figure: [
    "algo_deplacement",
    "algo_repetition",
    "angle_droit",
    "angle_tracer",
    "triangle_sommet_cote",
    "quadrilatere_nommer_vocabulaire",
  ],

  algo_defi: [
    "algo_lire_programme",
    "algo_figure",
    "triangle_type_cote",
    "quadrilatere_identifier_nature",
  ],

  // =========================
  // DONNÉES
  // =========================
  stat_donnee_lire_graphique: ["stat_donnee_lire_tableau"],
  stat_donnee_prelever: ["stat_donnee_lire_tableau", "stat_donnee_lire_graphique"],
  stat_donnee_comparer: ["stat_donnee_prelever", "entier_comparer"],
  stat_donnee_interpreter: [
    "stat_donnee_prelever",
    "stat_donnee_comparer",
    "entier_comparer",
  ],
  stat_donnee_defi: [
    "stat_donnee_lire_tableau",
    "stat_donnee_lire_graphique",
    "stat_donnee_prelever",
    "stat_donnee_comparer",
    "stat_donnee_interpreter",
  ],

  // =========================
  // PROBABILITÉS
  // =========================
  proba_comparer: ["proba_vocabulaire", "fraction_comparer"],
  proba_issue: ["proba_vocabulaire", "stat_donnee_lire_tableau"],
  proba_estimer: [
    "proba_vocabulaire",
    "proba_comparer",
    "stat_donnee_interpreter",
  ],
  proba_lire: [
    "proba_vocabulaire",
    "proba_issue",
    "stat_donnee_interpreter",
  ],
  proba_defi: [
    "proba_vocabulaire",
    "proba_comparer",
    "proba_issue",
    "proba_estimer",
    "proba_lire",
    "stat_donnee_interpreter",
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