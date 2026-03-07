import type { MatrixValue, SkillMatrix } from "@/lib/tutor/types";

type WeightedMicro = {
  microId: string;
  weight: MatrixValue;
};

export function getMatrixIndex(microId: string, skillMatrix: SkillMatrix): number {
  return skillMatrix.microSkillIndex.indexOf(microId);
}

function getRowRelations(microId: string, skillMatrix: SkillMatrix, predicate: (value: MatrixValue) => boolean) {
  const rowIndex = getMatrixIndex(microId, skillMatrix);
  if (rowIndex < 0) return [] as WeightedMicro[];

  const row = skillMatrix.matrix[rowIndex];
  if (!row) return [] as WeightedMicro[];

  const relations: WeightedMicro[] = [];
  row.forEach((value, candidateIndex) => {
    if (!predicate(value)) return;

    const candidate = skillMatrix.microSkillIndex[candidateIndex];
    if (!candidate) return;

    relations.push({ microId: candidate, weight: value });
  });

  return relations;
}

export function getParentsFromMatrix(microId: string, skillMatrix: SkillMatrix): WeightedMicro[] {
  return getRowRelations(microId, skillMatrix, (value) => value > 0);
}

export function getChildrenFromMatrix(microId: string, skillMatrix: SkillMatrix): WeightedMicro[] {
  return getRowRelations(microId, skillMatrix, (value) => value < 0);
}

export function getSortedParents(microId: string, skillMatrix: SkillMatrix): WeightedMicro[] {
  return getParentsFromMatrix(microId, skillMatrix).sort((a, b) => b.weight - a.weight);
}

export function getSortedChildren(microId: string, skillMatrix: SkillMatrix): WeightedMicro[] {
  return getChildrenFromMatrix(microId, skillMatrix).sort(
    (a, b) => Math.abs(b.weight) - Math.abs(a.weight)
  );
}

export function getStrongestParentFromMatrix(microId: string, skillMatrix: SkillMatrix): string | null {
  return getSortedParents(microId, skillMatrix)[0]?.microId ?? null;
}

export function getStrongestChildFromMatrix(microId: string, skillMatrix: SkillMatrix): string | null {
  return getSortedChildren(microId, skillMatrix)[0]?.microId ?? null;
}
