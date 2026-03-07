import type { MatrixValue, SkillMatrix } from "@/lib/tutor/types";

const microSkillIndex = [
  "decimal_compare",
  "decimal_write",
  "fraction_read",
  "fraction_compare",
  "fraction_quantity",
  "prop_table",
  "prop_unit",
  "prop_direct",
  "perim_square",
  "perim_rectangle",
  "area_rectangle",
  "area_square",
  "angle_right",
  "angle_compare",
] as const;

function createSparseMatrix(size: number): MatrixValue[][] {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => 0 as MatrixValue));
}

function setRelation(
  matrix: MatrixValue[][],
  indexById: Map<string, number>,
  parentId: string,
  childId: string,
  strength: 1 | 2
) {
  const parentIndex = indexById.get(parentId);
  const childIndex = indexById.get(childId);

  if (parentIndex === undefined || childIndex === undefined) return;

  matrix[parentIndex][childIndex] = strength;
  matrix[childIndex][parentIndex] = (strength === 2 ? -2 : -1) as MatrixValue;
}

const matrix = createSparseMatrix(microSkillIndex.length);
const indexById = new Map(microSkillIndex.map((id, index) => [id, index]));

setRelation(matrix, indexById, "decimal_compare", "fraction_compare", 2);
setRelation(matrix, indexById, "decimal_write", "fraction_read", 2);
setRelation(matrix, indexById, "fraction_read", "fraction_quantity", 2);
setRelation(matrix, indexById, "fraction_read", "prop_table", 1);
setRelation(matrix, indexById, "fraction_quantity", "prop_unit", 2);
setRelation(matrix, indexById, "prop_table", "prop_direct", 2);
setRelation(matrix, indexById, "prop_unit", "prop_direct", 2);
setRelation(matrix, indexById, "perim_rectangle", "area_rectangle", 2);
setRelation(matrix, indexById, "perim_square", "area_square", 2);

export const matrix6eMaths: SkillMatrix = {
  microSkillIndex: [...microSkillIndex],
  matrix,
};
