import type { MatrixValue, SkillMatrix } from "@/lib/tutor/types";

export function getMatrixIndex(skillMatrix: SkillMatrix, microId: string): number {
  return skillMatrix.microSkillIndex.indexOf(microId);
}

export function getParentsFromMatrix(skillMatrix: SkillMatrix, microId: string) {
  const idx = getMatrixIndex(skillMatrix, microId);
  if (idx === -1) return [];

  const row = skillMatrix.matrix[idx];

  return row
    .map((value, colIndex) => ({
      microId: skillMatrix.microSkillIndex[colIndex],
      weight: value as MatrixValue,
    }))
    .filter((item) => item.weight > 0)
    .sort((a, b) => b.weight - a.weight);
}

export function getChildrenFromMatrix(skillMatrix: SkillMatrix, microId: string) {
  const idx = getMatrixIndex(skillMatrix, microId);
  if (idx === -1) return [];

  const row = skillMatrix.matrix[idx];

  return row
    .map((value, colIndex) => ({
      microId: skillMatrix.microSkillIndex[colIndex],
      weight: value as MatrixValue,
    }))
    .filter((item) => item.weight < 0)
    .sort((a, b) => a.weight - b.weight);
}

export function getStrongestParentFromMatrix(skillMatrix: SkillMatrix, microId: string): string | null {
  const parents = getParentsFromMatrix(skillMatrix, microId);
  return parents.length > 0 ? parents[0].microId : null;
}

export function getStrongestChildFromMatrix(skillMatrix: SkillMatrix, microId: string): string | null {
  const children = getChildrenFromMatrix(skillMatrix, microId);
  return children.length > 0 ? children[0].microId : null;
}