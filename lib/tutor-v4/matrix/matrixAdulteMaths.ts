import type { MatrixValue, SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/adulte/microSkills";

export const microSkillIndexAdulteMaths = microSkills.map((micro) => micro.id);

const size = microSkillIndexAdulteMaths.length;
const matrix: MatrixValue[][] = Array.from({ length: size }, () =>
  Array.from({ length: size }, () => 0 as MatrixValue)
);

const indexById = new Map(
  microSkillIndexAdulteMaths.map((id, index) => [id, index] as const)
);

for (const micro of microSkills) {
  const childIndex = indexById.get(micro.id);
  if (childIndex === undefined) continue;

  for (const parentId of micro.prerequis) {
    const parentIndex = indexById.get(parentId);
    if (parentIndex === undefined) continue;
    matrix[childIndex][parentIndex] = 2;
    matrix[parentIndex][childIndex] = -2;
  }
}

export const matrixAdulteMaths: SkillMatrix = {
  id: "matrix-adulte-maths",
  classe: "adulte",
  matiere: "maths",
  microSkillIndex: microSkillIndexAdulteMaths,
  matrix,
};
