// lib/tutor/matrix6eMaths.ts
import type { SkillMatrix } from "@/lib/tutor-v4/types";

/**
 * Ordre des micro-compétences.
 * L'ordre doit correspondre exactement aux lignes/colonnes de la matrice.
 */
export const microSkillIndex6eMaths = [
  "decimal_compare",            // 0
  "decimal_write",              // 1
  "decimal_add",                // 2
  "decimal_multiply",           // 3
  "decimal_divide_by_integer",  // 4
  "fraction_read",              // 5
  "fraction_compare",           // 6
  "fraction_quantity",          // 7
  "prop_table",                 // 8
  "prop_unit",                  // 9
  "prop_direct",                // 10
  "perim_square",               // 11
  "perim_rectangle",            // 12
  "area_rectangle",             // 13
  "area_square",                // 14
  "angle_right",                // 15
  "angle_compare",              // 16
] as const;

/**
 * Convention :
 * M[i][j] > 0  => j est parent de i
 * M[i][j] < 0  => j est enfant de i
 */
export const matrix6eMathsValues = [
  // dec_cmp dec_wrt dec_add dec_mul dec_div frac_rd frac_cmp frac_qty prop_tbl prop_unit prop_dir per_sq per_rect area_rect area_sq ang_r ang_cmp

  [ 0,      0,      0,      0,      0,      0,      -2,      0,       0,       0,        0,      0,     0,       0,        0,      0,    0 ], // decimal_compare

  [ 0,      0,      -2,     0,      -2,     -2,     0,       0,       0,       0,        0,      0,     0,       0,        0,      0,    0 ], // decimal_write

  [ 0,      2,      0,      -2,     0,      0,      0,       0,       0,       0,        0,      0,     0,       0,        0,      0,    0 ], // decimal_add

  [ 0,      0,      2,      0,      0,      0,      0,       0,       0,       0,        0,      0,     0,       0,        0,      0,    0 ], // decimal_multiply

  [ 0,      2,      0,      0,      0,      0,      0,       0,       0,       0,        0,      0,     0,       0,        0,      0,    0 ], // decimal_divide_by_integer

  [ 0,      2,      0,      0,      0,      0,      0,       -2,      -1,      0,        0,      0,     0,       0,        0,      0,    0 ], // fraction_read

  [ 2,      0,      0,      0,      0,      0,      0,       0,       0,       0,        0,      0,     0,       0,        0,      0,    0 ], // fraction_compare

  [ 0,      0,      0,      0,      0,      2,      0,       0,       -2,      0,        0,      0,     0,       0,        0,      0,    0 ], // fraction_quantity

  [ 0,      0,      0,      0,      0,      1,      0,       2,       0,       -2,       -2,     0,     0,       0,        0,      0,    0 ], // prop_table

  [ 0,      0,      0,      0,      0,      0,      0,       0,       2,       0,        -2,     0,     0,       0,        0,      0,    0 ], // prop_unit

  [ 0,      0,      0,      0,      0,      0,      0,       0,       2,       2,        0,      0,     0,       0,        0,      0,    0 ], // prop_direct

  [ 0,      0,      0,      0,      0,      0,      0,       0,       0,       0,        0,      0,     0,       0,        -2,     0,    0 ], // perim_square

  [ 0,      0,      0,      0,      0,      0,      0,       0,       0,       0,        0,      0,     0,       -2,       0,      0,    0 ], // perim_rectangle

  [ 0,      0,      0,      0,      0,      0,      0,       0,       0,       0,        0,      0,     2,       0,        0,      0,    0 ], // area_rectangle

  [ 0,      0,      0,      0,      0,      0,      0,       0,       0,       0,        0,      2,     0,       0,        0,      0,    0 ], // area_square

  [ 0,      0,      0,      0,      0,      0,      0,       0,       0,       0,        0,      0,     0,       0,        0,      0,    -1], // angle_right

  [ 0,      0,      0,      0,      0,      0,      0,       0,       0,       0,        0,      0,     0,       0,        0,      1,    0 ], // angle_compare
] as const;

export const matrix6eMaths: SkillMatrix = {
  id: "6e_maths_matrix_v4",
  classe: "6e",
  matiere: "maths",
  microSkillIndex: [...microSkillIndex6eMaths],
  matrix: matrix6eMathsValues.map((row) => [...row]),
};