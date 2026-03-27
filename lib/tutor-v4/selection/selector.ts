import {
  getStrongestChildFromMatrix,
  getStrongestParentFromMatrix,
} from "@/lib/tutor-v4/matrix/matrixUtils";

import type {
  KnowledgePack,
  KnowledgeMicroSkill,
  KnowledgeNotion,
  SkillMatrix,
} from "@/lib/tutor-v4/types";

export function findNotion(pack: KnowledgePack, notionId: string): KnowledgeNotion {
  return pack.notions.find((n) => n.id === notionId) ?? pack.notions[0];
}

export function findMicro(
  pack: KnowledgePack,
  microId: string
): KnowledgeMicroSkill {
  return pack.microSkills.find((m) => m.id === microId) ?? pack.microSkills[0];
}

export function getMicrosForNotion(
  pack: KnowledgePack,
  notionId: string
): KnowledgeMicroSkill[] {
  return pack.microSkills.filter((m) => m.notionId === notionId);
}

export function selectWeakestMicroInNotion(
  pack: KnowledgePack,
  notionId: string,
  masteryByMicro: Record<string, number>
): KnowledgeMicroSkill {
  const micros = getMicrosForNotion(pack, notionId);

  if (micros.length === 0) {
    return pack.microSkills[0];
  }

  const sorted = [...micros].sort(
    (a, b) => (masteryByMicro[a.id] ?? 50) - (masteryByMicro[b.id] ?? 50)
  );

  return sorted[0] ?? pack.microSkills[0];
}

export function selectStrongPrereqMicro(
  pack: KnowledgePack,
  skillMatrix: SkillMatrix,
  microId: string
): KnowledgeMicroSkill | null {
  const parentId = getStrongestParentFromMatrix(skillMatrix, microId);
  if (!parentId) return null;

  return pack.microSkills.find((m) => m.id === parentId) ?? null;
}

export function selectStrongChildMicro(
  pack: KnowledgePack,
  skillMatrix: SkillMatrix,
  microId: string
): KnowledgeMicroSkill | null {
  const childId = getStrongestChildFromMatrix(skillMatrix, microId);
  if (!childId) return null;

  return pack.microSkills.find((m) => m.id === childId) ?? null;
}