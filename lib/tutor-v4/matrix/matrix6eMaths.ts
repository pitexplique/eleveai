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
  "entier_lire_ecrire", // 0
  "entier_rang", // 1
  "entier_compare", // 2
  "entier_decomposer", // 3
  "entier_encadrer", // 4
  "entier_defis", // 5

  // =========================
  // DECIMAUX
  // =========================
  "decimal_lire_ecrire", // 6
  "decimal_rang", // 7
  "decimal_compare", // 8
  "decimal_add", // 9
  "decimal_multiply", // 10
  "decimal_divide_by_integer", // 11
  "decimal_defis", // 12

  // =========================
  // FRACTIONS
  // =========================
  "fraction_lire_ecrire", // 13
  "fraction_representer", // 14
  "fraction_quantite", // 15
  "fraction_decimal", // 16
  "fraction_compare", // 17
  "fraction_defis", // 18

  // =========================
  // POURCENTAGES
  // =========================
  "pourcentage_comprendre", // 19
  "pourcentage_fraction", // 20
  "pourcentage_decimal", // 21
  "pourcentage_lire", // 22
  "pourcentage_calcul_simple", // 23
  "pourcentage_defis", // 24

  // =========================
  // PROPORTIONNALITE
  // =========================
  "prop_reconnaitre", // 25
  "prop_table", // 26
  "prop_coeff", // 27
  "prop_unit", // 28
  "prop_direct", // 29
  "prop_defis", // 30

  // =========================
  // CALCUL POSE
  // =========================
  "pose_addition", // 31
  "pose_soustraction", // 32
  "pose_multiplication", // 33
  "pose_division", // 34
  "pose_verifier", // 35
  "pose_defis", // 36

  // =========================
  // CALCUL MENTAL
  // =========================
  "mental_addition", // 37
  "mental_subtraction", // 38
  "mental_multiplication", // 39
  "mental_division", // 40
  "mental_strategies", // 41
  "mental_defis", // 42

  // =========================
  // LONGUEURS
  // =========================
  "longueur_mesurer", // 43
  "longueur_unites", // 44
  "longueur_convertir", // 45
  "longueur_comparer", // 46
  "longueur_probleme", // 47
  "longueur_defis", // 48

  // =========================
  // PERIMETRES
  // =========================
  "perim_comprendre", // 49
  "perim_square", // 50
  "perim_rectangle", // 51
  "perim_figure", // 52
  "perim_probleme", // 53
  "perim_defis", // 54

  // =========================
  // AIRES
  // =========================
  "area_comprendre", // 55
  "area_rectangle", // 56
  "area_square", // 57
  "area_compter", // 58
  "area_comparer", // 59
  "area_defis", // 60

  // =========================
  // VOLUMES
  // =========================
  "volume_unite", // 61
  "volume_compter", // 62
  "volume_comparer", // 63
  "volume_assemblage", // 64
  "volume_lire", // 65
  "volume_defis", // 66

  // =========================
  // ANGLES
  // =========================
  "angle_reconnaitre", // 67
  "angle_right", // 68
  "angle_compare", // 69
  "angle_mesurer", // 70
  "angle_tracer", // 71
  "angle_defis", // 72

  // =========================
  // TRIANGLES
  // =========================
  "triangle_name", // 73
  "triangle_vertices_sides", // 74
  "triangle_type_sides", // 75
  "triangle_type_angles", // 76
  "triangle_angle_sum", // 77
  "triangle_missing_angle", // 78
  "triangle_possible_or_not", // 79
  "triangle_defis", // 80

  // =========================
  // QUADRILATERES
  // =========================
  "quadrilatere_nommer_vocabulaire", // 81
  "quadrilatere_identifier_nature", // 82
  "quadrilatere_lire_proprietes", // 83
  "quadrilatere_lien_proprietes", // 84
  "quadrilatere_distinguer", // 85
  "quadrilatere_conclusion", // 86
  "quadrilatere_completer_construire", // 87
  "quadrilatere_defis", // 88

  // =========================
  // SYMETRIE
  // =========================
  "sym_reconnaitre", // 89
  "sym_point", // 90
  "sym_figure", // 91
  "sym_proprietes", // 92
  "sym_axes", // 93
  "sym_defis", // 94

  // =========================
  // DONNEES
  // =========================
  "data_lire_tableau", // 95
  "data_lire_graphique", // 96
  "data_prelever", // 97
  "data_comparer", // 98
  "data_interpreter", // 99
  "data_defis", // 100

  // =========================
  // PROBABILITES
  // =========================
  "proba_vocabulaire", // 101
  "proba_comparer", // 102
  "proba_issue", // 103
  "proba_estimer", // 104
  "proba_lire", // 105
  "proba_defis", // 106
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
  pourcentage_lire: ["pourcentage_comprendre"],
  pourcentage_calcul_simple: ["pourcentage_decimal"],
  pourcentage_defis: [
    "pourcentage_comprendre",
    "pourcentage_fraction",
    "pourcentage_decimal",
    "pourcentage_lire",
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
  longueur_unites: ["longueur_mesurer"],
  longueur_convertir: ["longueur_unites"],
  longueur_comparer: ["longueur_mesurer"],
  longueur_probleme: ["longueur_convertir", "longueur_comparer"],
  longueur_defis: [
    "longueur_mesurer",
    "longueur_unites",
    "longueur_convertir",
    "longueur_comparer",
    "longueur_probleme",
  ],

  // =========================
  // PERIMETRES
  // =========================
  perim_comprendre: ["longueur_mesurer"],
  perim_square: ["perim_comprendre"],
  perim_rectangle: ["perim_comprendre"],
  perim_figure: ["perim_square", "perim_rectangle"],
  perim_probleme: ["perim_figure"],
  perim_defis: [
    "perim_comprendre",
    "perim_square",
    "perim_rectangle",
    "perim_figure",
    "perim_probleme",
  ],

  // =========================
  // AIRES
  // =========================
  area_comprendre: ["perim_comprendre"],
  area_compter: ["area_comprendre"],
  area_rectangle: ["area_compter", "perim_rectangle"],
  area_square: ["area_compter", "perim_square"],
  area_comparer: ["area_rectangle", "area_square"],
  area_defis: [
    "area_comprendre",
    "area_rectangle",
    "area_square",
    "area_compter",
    "area_comparer",
  ],

  // =========================
  // VOLUMES
  // =========================
  volume_unite: ["area_comprendre"],
  volume_compter: ["volume_unite", "area_compter"],
  volume_comparer: ["volume_compter"],
  volume_assemblage: ["volume_compter"],
  volume_lire: ["volume_compter"],
  volume_defis: [
    "volume_unite",
    "volume_compter",
    "volume_comparer",
    "volume_assemblage",
    "volume_lire",
  ],

  // =========================
  // ANGLES
  // =========================
  angle_reconnaitre: [],
  angle_right: ["angle_reconnaitre"],
  angle_compare: ["angle_right"],
  angle_mesurer: ["angle_reconnaitre"],
  angle_tracer: ["angle_mesurer"],
  angle_defis: [
    "angle_reconnaitre",
    "angle_right",
    "angle_compare",
    "angle_mesurer",
    "angle_tracer",
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
  sym_proprietes: ["sym_figure"],
  sym_axes: ["sym_reconnaitre"],
  sym_defis: [
    "sym_reconnaitre",
    "sym_point",
    "sym_figure",
    "sym_proprietes",
    "sym_axes",
  ],

  // =========================
  // DONNEES
  // =========================
  data_lire_graphique: ["data_lire_tableau"],
  data_prelever: ["data_lire_tableau", "data_lire_graphique"],
  data_comparer: ["data_prelever"],
  data_interpreter: ["data_prelever", "data_comparer"],
  data_defis: [
    "data_lire_tableau",
    "data_lire_graphique",
    "data_prelever",
    "data_comparer",
    "data_interpreter",
  ],

  // =========================
  // PROBABILITES
  // =========================
  proba_comparer: ["proba_vocabulaire"],
  proba_issue: ["proba_vocabulaire"],
  proba_estimer: ["proba_comparer"],
  proba_lire: ["proba_issue"],
  proba_defis: [
    "proba_vocabulaire",
    "proba_comparer",
    "proba_issue",
    "proba_estimer",
    "proba_lire",
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

  longueur_probleme: ["entier_compare"],
  perim_figure: ["longueur_comparer"],
  perim_probleme: ["longueur_probleme"],
  area_compter: ["perim_figure"],
  area_comparer: ["longueur_comparer"],
  volume_lire: ["data_lire_tableau"],
  triangle_possible_or_not: ["longueur_comparer"],

  quadrilatere_lire_proprietes: ["triangle_vertices_sides"],
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