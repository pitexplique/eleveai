//lib/tutor/matrix6eMaths.ts
import type { SkillMatrix } from "@/lib/tutor/types";

/**
 * Ordre des micro-compétences.
 * L'ordre doit correspondre exactement aux lignes/colonnes de la matrice.
 */
export const microSkillIndex6eMaths = [
  "decimal_compare",   // 0
  "decimal_write",     // 1
  "fraction_read",     // 2
  "fraction_compare",  // 3
  "fraction_quantity", // 4
  "prop_table",        // 5
  "prop_unit",         // 6
  "prop_direct",       // 7
  "perim_square",      // 8
  "perim_rectangle",   // 9
  "area_rectangle",    // 10
  "area_square",       // 11
  "angle_droit",       // 12
  "angle_compare",     // 13
] as const;

/**
 * Convention :
 * M[i][j] > 0  => j est parent de i
 * M[i][j] < 0  => j est enfant de i
 *
 * Ex:
 * fraction_compare a pour parent fort decimal_compare
 * alors M[fraction_compare][decimal_compare] = +2
 * et symétriquement M[decimal_compare][fraction_compare] = -2
 */
export const matrix6eMathsValues = [
  // dec_cmp dec_wrt frac_rd frac_cmp frac_qty prop_tbl prop_unit prop_dir per_sq per_rect area_rect area_sq ang_r ang_cmp
  [ 0,      0,      0,      -2,      0,       0,       0,        0,      0,     0,       0,        0,      0,    0 ], // decimal_compare
  [ 0,      0,      -2,     0,       0,       0,       0,        0,      0,     0,       0,        0,      0,    0 ], // decimal_write
  [ 0,      2,      0,      0,       -2,      -1,      0,        0,      0,     0,       0,        0,      0,    0 ], // fraction_read
  [ 2,      0,      0,      0,       0,       0,       0,        0,      0,     0,       0,        0,      0,    0 ], // fraction_compare
  [ 0,      0,      2,      0,       0,       0,       -2,       0,      0,     0,       0,        0,      0,    0 ], // fraction_quantity
  [ 0,      0,      1,      0,       0,       0,       0,        -2,     0,     0,       0,        0,      0,    0 ], // prop_table
  [ 0,      0,      0,      0,       2,       0,       0,        -2,     0,     0,       0,        0,      0,    0 ], // prop_unit
  [ 0,      0,      0,      0,       0,       2,       2,        0,      0,     0,       0,        0,      0,    0 ], // prop_direct
  [ 0,      0,      0,      0,       0,       0,       0,        0,      0,     0,       0,        -2,     0,    0 ], // perim_square
  [ 0,      0,      0,      0,       0,       0,       0,        0,      0,     0,       -2,       0,      0,    0 ], // perim_rectangle
  [ 0,      0,      0,      0,       0,       0,       0,        0,      0,     2,       0,        0,      0,    0 ], // area_rectangle
  [ 0,      0,      0,      0,       0,       0,       0,        0,      2,     0,       0,        0,      0,    0 ], // area_square
  [ 0,      0,      0,      0,       0,       0,       0,        0,      2,     0,       0,        0,      0,    0 ], // angle_droit
  [ 0,      0,      0,      0,       0,       0,       0,        0,      0,     0,       0,        0,      0,    0 ], // angle_compare
] as const;

export const matrix6eMaths: SkillMatrix = {
  id: "6e_maths_matrix_v3",
  classe: "6e",
  matiere: "maths",
  microSkillIndex: [...microSkillIndex6eMaths],
  matrix: matrix6eMathsValues.map((row) => [...row]),
};