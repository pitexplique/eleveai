// loaders/matrix/matrix6eMaths.ts
import type { SkillMatrix, MatrixValue } from "@/lib/tutor-v4/types";

/**
 * Ordre des micro-compétences.
 * L'ordre doit correspondre exactement aux lignes/colonnes de la matrice.
 */
export const microSkillIndex6eMaths = [
  // =========================
  // NOMBRES ENTIERS
  // =========================
  "entier_lire_ecrire",                  // 0
  "entier_rang",                         // 1
  "entier_compare",                      // 2
  "entier_decomposer",                   // 3
  "entier_encadrer",                     // 4
  "entier_defis",                        // 5

  // =========================
  // DECIMAUX
  // =========================
  "decimal_lire_ecrire",                 // 6
  "decimal_rang",                        // 7
  "decimal_compare",                     // 8
  "decimal_add",                         // 9
  "decimal_multiply",                    // 10
  "decimal_divide_by_integer",           // 11
  "decimal_defis",                       // 12

  // =========================
  // FRACTIONS
  // =========================
  "fraction_lire_ecrire",                // 13
  "fraction_representer",                // 14
  "fraction_quantite",                   // 15
  "fraction_decimal",                    // 16
  "fraction_compare",                    // 17
  "fraction_defis",                      // 18

  // =========================
  // POURCENTAGES
  // =========================
  "pourcentage_comprendre",              // 19
  "pourcentage_fraction",                // 20
  "pourcentage_decimal",                 // 21
  "pourcentage_calcul_simple",           // 22
  "pourcentage_defis",                   // 23

  // =========================
  // PROPORTIONNALITE
  // =========================
  "prop_reconnaitre",                    // 24
  "prop_table",                          // 25
  "prop_coeff",                          // 26
  "prop_unit",                           // 27
  "prop_direct",                         // 28
  "prop_defis",                          // 29

  // =========================
  // CALCUL POSE
  // =========================
  "pose_addition",                       // 30
  "pose_soustraction",                   // 31
  "pose_multiplication",                 // 32
  "pose_division",                       // 33
  "pose_verifier",                       // 34
  "pose_defis",                          // 35

  // =========================
  // CALCUL MENTAL
  // =========================
  "mental_addition",                     // 36
  "mental_subtraction",                  // 37
  "mental_multiplication",               // 38
  "mental_division",                     // 39
  "mental_strategies",                   // 40
  "mental_defis",                        // 41

  // =========================
  // LONGUEURS
  // =========================
  "longueur_mesurer",                    // 42
  "longueur_convertir",                  // 43
  "longueur_comparer",                   // 44
  "longueur_defis",                      // 45

  // =========================
  // PERIMETRES
  // =========================
  "perim_square",                        // 46
  "perim_rectangle",                     // 47
  "perim_figure",                        // 48
  "perim_defis",                         // 49

  // =========================
  // AIRES
  // =========================
  "area_rectangle",                      // 50
  "area_square",                         // 51
  "area_compter",                        // 52
  "area_defis",                          // 53

  // =========================
  // VOLUMES
  // =========================
  "volume_compter",                      // 54
  "volume_comparer",                     // 55
  "volume_defis",                        // 56

  // =========================
  // ANGLES
  // =========================
  "angle_right",                         // 57
  "angle_compare",                       // 58
  "angle_mesurer",                       // 59
  "angle_defis",                         // 60

  // =========================
  // TRIANGLES
  // =========================
  "triangle_name",                       // 61
  "triangle_vertices_sides",             // 62
  "triangle_type_sides",                 // 63
  "triangle_type_angles",                // 64
  "triangle_angle_sum",                  // 65
  "triangle_missing_angle",              // 66
  "triangle_possible_or_not",            // 67
  "triangle_defis",                      // 68

  // =========================
  // QUADRILATERES
  // =========================
  "quadrilatere_nommer_vocabulaire",     // 69
  "quadrilatere_identifier_nature",      // 70
  "quadrilatere_lire_proprietes",        // 71
  "quadrilatere_lien_proprietes",        // 72
  "quadrilatere_distinguer",             // 73
  "quadrilatere_conclusion",             // 74
  "quadrilatere_completer_construire",   // 75
  "quadrilatere_defis",                  // 76

  // =========================
  // SYMETRIE
  // =========================
  "sym_reconnaitre",                     // 77
  "sym_point",                           // 78
  "sym_figure",                          // 79
  "sym_defis",                           // 80

  // =========================
  // DONNEES
  // =========================
  "data_lire_tableau",                   // 81
  "data_lire_graphique",                 // 82
  "data_interpreter",                    // 83
  "data_defis",                          // 84

  // =========================
  // PROBABILITES
  // =========================
  "proba_vocabulaire",                   // 85
  "proba_comparer",                      // 86
  "proba_estimer",                       // 87
  "proba_defis",                         // 88
] as const;

/**
 * Liens forts :
 * si A dépend de B, alors B est parent direct de A.
 * On générera :
 * - M[A][B] = 2
 * - M[B][A] = -2
 */
const directParents: Record<string, string[]> = {
  // =========================
  // NOMBRES ENTIERS
  // =========================
  entier_rang: ["entier_lire_ecrire"],
  entier_compare: ["entier_lire_ecrire"],
  entier_decomposer: ["entier_rang"],
  entier_encadrer: ["entier_compare"],
  entier_defis: [
    "entier_lire_ecrire",
    "entier_rang",
    "entier_compare",
    "entier_decomposer",
    "entier_encadrer",
  ],

  // =========================
  // DECIMAUX
  // =========================
  decimal_lire_ecrire: ["entier_lire_ecrire"],
  decimal_rang: ["decimal_lire_ecrire"],
  decimal_compare: ["decimal_rang"],
  decimal_add: ["decimal_lire_ecrire"],
  decimal_multiply: ["decimal_add"],
  decimal_divide_by_integer: ["decimal_lire_ecrire"],
  decimal_defis: [
    "decimal_lire_ecrire",
    "decimal_rang",
    "decimal_compare",
    "decimal_add",
    "decimal_multiply",
    "decimal_divide_by_integer",
  ],

  // =========================
  // FRACTIONS
  // =========================
  fraction_lire_ecrire: ["decimal_lire_ecrire"],
  fraction_representer: ["fraction_lire_ecrire"],
  fraction_quantite: ["fraction_representer"],
  fraction_decimal: ["fraction_quantite", "decimal_lire_ecrire"],
  fraction_compare: ["fraction_lire_ecrire"],
  fraction_defis: [
    "fraction_lire_ecrire",
    "fraction_representer",
    "fraction_quantite",
    "fraction_decimal",
    "fraction_compare",
  ],

  // =========================
  // POURCENTAGES
  // =========================
  pourcentage_comprendre: ["fraction_quantite"],
  pourcentage_fraction: ["pourcentage_comprendre"],
  pourcentage_decimal: ["pourcentage_fraction", "fraction_decimal"],
  pourcentage_calcul_simple: ["pourcentage_decimal"],
  pourcentage_defis: [
    "pourcentage_comprendre",
    "pourcentage_fraction",
    "pourcentage_decimal",
    "pourcentage_calcul_simple",
  ],

  // =========================
  // PROPORTIONNALITE
  // =========================
  prop_reconnaitre: ["pourcentage_comprendre"],
  prop_table: ["prop_reconnaitre"],
  prop_coeff: ["prop_table"],
  prop_unit: ["prop_table"],
  prop_direct: ["prop_coeff", "prop_unit"],
  prop_defis: [
    "prop_reconnaitre",
    "prop_table",
    "prop_coeff",
    "prop_unit",
    "prop_direct",
  ],

  // =========================
  // CALCUL POSE
  // =========================
  pose_addition: ["entier_lire_ecrire"],
  pose_soustraction: ["pose_addition"],
  pose_multiplication: ["pose_addition"],
  pose_division: ["pose_multiplication"],
  pose_verifier: [
    "pose_addition",
    "pose_soustraction",
    "pose_multiplication",
    "pose_division",
  ],
  pose_defis: [
    "pose_addition",
    "pose_soustraction",
    "pose_multiplication",
    "pose_division",
    "pose_verifier",
  ],

  // =========================
  // CALCUL MENTAL
  // =========================
  mental_subtraction: ["mental_addition"],
  mental_multiplication: ["mental_addition"],
  mental_division: ["mental_multiplication"],
  mental_strategies: [
    "mental_addition",
    "mental_subtraction",
    "mental_multiplication",
    "mental_division",
  ],
  mental_defis: [
    "mental_addition",
    "mental_subtraction",
    "mental_multiplication",
    "mental_division",
    "mental_strategies",
  ],

  // =========================
  // LONGUEURS
  // =========================
  longueur_convertir: ["longueur_mesurer"],
  longueur_comparer: ["longueur_mesurer"],
  longueur_defis: [
    "longueur_mesurer",
    "longueur_convertir",
    "longueur_comparer",
  ],

  // =========================
  // PERIMETRES
  // =========================
  perim_square: ["longueur_mesurer"],
  perim_rectangle: ["longueur_mesurer"],
  perim_figure: ["perim_square", "perim_rectangle"],
  perim_defis: [
    "perim_square",
    "perim_rectangle",
    "perim_figure",
  ],

  // =========================
  // AIRES
  // =========================
  area_compter: ["perim_figure"],
  area_rectangle: ["area_compter", "perim_rectangle"],
  area_square: ["area_compter", "perim_square"],
  area_defis: [
    "area_rectangle",
    "area_square",
    "area_compter",
  ],

  // =========================
  // VOLUMES
  // =========================
  volume_compter: ["area_compter"],
  volume_comparer: ["volume_compter"],
  volume_defis: [
    "volume_compter",
    "volume_comparer",
  ],

  // =========================
  // ANGLES
  // =========================
  angle_compare: ["angle_right"],
  angle_mesurer: ["angle_right"],
  angle_defis: [
    "angle_right",
    "angle_compare",
    "angle_mesurer",
  ],

  // =========================
  // TRIANGLES
  // =========================
  triangle_vertices_sides: ["triangle_name"],
  triangle_type_sides: ["triangle_vertices_sides"],
  triangle_type_angles: ["angle_right", "angle_compare"],
  triangle_angle_sum: ["triangle_type_angles"],
  triangle_missing_angle: ["triangle_angle_sum"],
  triangle_possible_or_not: ["triangle_vertices_sides"],
  triangle_defis: [
    "triangle_type_sides",
    "triangle_type_angles",
    "triangle_angle_sum",
    "triangle_missing_angle",
    "triangle_possible_or_not",
  ],

  // =========================
  // QUADRILATERES
  // =========================
  quadrilatere_identifier_nature: ["quadrilatere_nommer_vocabulaire"],
  quadrilatere_lire_proprietes: [
    "angle_right",
    "angle_compare",
    "quadrilatere_nommer_vocabulaire",
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
    "quadrilatere_nommer_vocabulaire",
    "quadrilatere_lire_proprietes",
    "quadrilatere_lien_proprietes",
  ],
  quadrilatere_defis: [
    "quadrilatere_nommer_vocabulaire",
    "quadrilatere_identifier_nature",
    "quadrilatere_lire_proprietes",
    "quadrilatere_lien_proprietes",
    "quadrilatere_distinguer",
    "quadrilatere_conclusion",
    "quadrilatere_completer_construire",
  ],

  // =========================
  // SYMETRIE
  // =========================
  sym_point: ["sym_reconnaitre"],
  sym_figure: ["sym_point"],
  sym_defis: [
    "sym_reconnaitre",
    "sym_point",
    "sym_figure",
  ],

  // =========================
  // DONNEES
  // =========================
  data_lire_graphique: ["data_lire_tableau"],
  data_interpreter: ["data_lire_tableau", "data_lire_graphique"],
  data_defis: [
    "data_lire_tableau",
    "data_lire_graphique",
    "data_interpreter",
  ],

  // =========================
  // PROBABILITES
  // =========================
  proba_comparer: ["proba_vocabulaire"],
  proba_estimer: ["proba_comparer"],
  proba_defis: [
    "proba_vocabulaire",
    "proba_comparer",
    "proba_estimer",
  ],
};

/**
 * Liens secondaires :
 * plus faibles, mais utiles pour guider.
 * On générera :
 * - M[A][B] = 1
 * - M[B][A] = -1
 */
const supportLinks: Record<string, string[]> = {
  decimal_compare: ["entier_compare"],
  decimal_add: ["mental_addition"],
  decimal_multiply: ["mental_multiplication"],
  decimal_divide_by_integer: ["mental_division"],

  fraction_decimal: ["decimal_compare"],
  fraction_compare: ["decimal_compare"],

  pourcentage_decimal: ["decimal_multiply"],
  pourcentage_calcul_simple: ["mental_multiplication"],

  prop_table: ["mental_multiplication"],
  prop_unit: ["mental_division"],

  pose_verifier: ["mental_strategies"],

  perim_figure: ["longueur_comparer"],
  area_compter: ["perim_figure"],
  triangle_possible_or_not: ["longueur_comparer"],

  quadrilatere_lire_proprietes: ["triangle_vertices_sides"],
  sym_reconnaitre: ["quadrilatere_identifier_nature"],

  data_interpreter: ["entier_compare"],
  proba_estimer: ["data_interpreter"],
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

      // on n’écrase pas un lien fort
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