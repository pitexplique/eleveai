// loaders/matrix/matrix6eMaths.ts
import type { SkillMatrix, MatrixValue } from "@/lib/tutor-v4/types";

/**
 * Ordre des micro-compétences.
 * L'ordre doit correspondre exactement aux lignes/colonnes de la matrice.
 */
export const microSkillIndex6eMaths = [
  "decimal_compare",                     // 0
  "decimal_write",                       // 1
  "decimal_add",                         // 2
  "decimal_multiply",                    // 3
  "decimal_divide_by_integer",           // 4
  "decimal_defis",                       // 5

  "fraction_read",                       // 6
  "fraction_compare",                    // 7
  "fraction_quantity",                   // 8

  "prop_table",                          // 9
  "prop_unit",                           // 10
  "prop_direct",                         // 11

  "perim_square",                        // 12
  "perim_rectangle",                     // 13

  "area_rectangle",                      // 14
  "area_square",                         // 15

  "angle_right",                         // 16
  "angle_compare",                       // 17

  "triangle_name",                       // 18
  "triangle_vertices_sides",             // 19
  "triangle_type_sides",                 // 20
  "triangle_type_angles",                // 21
  "triangle_angle_sum",                  // 22
  "triangle_missing_angle",              // 23
  "triangle_possible_or_not",            // 24
  "triangle_defis",                      // 25

  "quadrilatere_nommer_vocabulaire",     // 26
  "quadrilatere_identifier_nature",      // 27
  "quadrilatere_lire_proprietes",        // 28
  "quadrilatere_lien_proprietes",        // 29
  "quadrilatere_distinguer",             // 30
  "quadrilatere_conclusion",             // 31
  "quadrilatere_completer_construire",   // 32
  "quadrilatere_defis",                  // 33

  "mental_addition",                     // 34
  "mental_subtraction",                  // 35
  "mental_multiplication",               // 36
  "mental_division",                     // 37
  "mental_strategies",                   // 38
  "mental_defis",                        // 39
] as const;

/**
 * Liens forts :
 * si A dépend de B, alors B est parent direct de A.
 * On générera :
 * - M[A][B] = 2
 * - M[B][A] = -2
 */
const directParents: Record<string, string[]> = {
  decimal_add: ["decimal_write"],
  decimal_multiply: ["decimal_add"],
  decimal_divide_by_integer: ["decimal_write"],
  decimal_defis: [
    "decimal_compare",
    "decimal_write",
    "decimal_add",
    "decimal_multiply",
    "decimal_divide_by_integer",
  ],

  fraction_read: ["decimal_write"],
  fraction_compare: ["decimal_compare"],
  fraction_quantity: ["fraction_read"],

  prop_table: ["fraction_quantity"],
  prop_unit: ["prop_table"],
  prop_direct: ["prop_unit"],

  area_rectangle: ["perim_rectangle"],
  area_square: ["perim_square"],

  angle_compare: ["angle_right"],

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
};

/**
 * Liens secondaires :
 * plus faibles, mais utiles pour guider.
 * On générera :
 * - M[A][B] = 1
 * - M[B][A] = -1
 *
 * Tu peux en ajouter plus tard si tu veux enrichir.
 */
const supportLinks: Record<string, string[]> = {
  fraction_read: ["decimal_add", "decimal_multiply"],
  prop_table: ["mental_multiplication"],
  prop_unit: ["mental_division"],
  quadrilatere_lire_proprietes: ["triangle_vertices_sides"],
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