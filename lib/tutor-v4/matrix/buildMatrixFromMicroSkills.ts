import type { MatrixValue } from "@/lib/tutor-v4/types";
import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export function buildMatrixFromMicroSkills(
  microSkills: readonly MicroSkillSource[],
  supportMap: Record<string, string[]> = {}
): MatrixValue[][] {
  const skillIndex = microSkills.map((micro) => micro.id);
  const matrix: MatrixValue[][] = Array.from({ length: skillIndex.length }, () =>
    Array.from({ length: skillIndex.length }, () => 0 as MatrixValue)
  );

  const indexMap = new Map<string, number>();
  skillIndex.forEach((id, index) => indexMap.set(id, index));

  for (const micro of microSkills) {
    const childIndex = indexMap.get(micro.id);
    if (childIndex === undefined) continue;

    for (const parentId of micro.prerequis) {
      const parentIndex = indexMap.get(parentId);
      if (parentIndex === undefined) continue;

      matrix[childIndex][parentIndex] = 2;
      matrix[parentIndex][childIndex] = -2;
    }
  }

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
