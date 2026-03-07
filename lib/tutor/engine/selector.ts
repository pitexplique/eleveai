import {
  getSortedChildren,
  getStrongestParentFromMatrix,
} from "@/lib/tutor/matrix/matrixUtils";
import type { KnowledgePack, MicroSkill, SkillMatrix } from "@/lib/tutor/types";

export function findNotion(pack: KnowledgePack, notionId: string) {
  return pack.notions.find((n) => n.id === notionId) ?? pack.notions[0];
}

export function findMicro(pack: KnowledgePack, microId: string) {
  return pack.microSkills.find((m) => m.id === microId) ?? pack.microSkills[0];
}

export function getMicrosForNotion(pack: KnowledgePack, notionId: string) {
  return pack.microSkills.filter((m) => m.notionId === notionId);
}

export function selectWeakestMicroInNotion(
  pack: KnowledgePack,
  notionId: string,
  masteryByMicro: Record<string, number>
): MicroSkill {
  const micros = getMicrosForNotion(pack, notionId);
  return (
    micros.sort((a, b) => (masteryByMicro[a.id] ?? 50) - (masteryByMicro[b.id] ?? 50))[0] ??
    pack.microSkills[0]
  );
}

export function selectStrongPrereqMicroFromMatrix(
  pack: KnowledgePack,
  skillMatrix: SkillMatrix,
  microId: string
): MicroSkill | null {
  const parentId = getStrongestParentFromMatrix(microId, skillMatrix);
  if (!parentId) return null;

  return pack.microSkills.find((m) => m.id === parentId) ?? null;
}

export function selectNextChildMicroFromMatrix(
  pack: KnowledgePack,
  skillMatrix: SkillMatrix,
  microId: string,
  masteryByMicro: Record<string, number>
): MicroSkill | null {
  const sortedChildren = getSortedChildren(microId, skillMatrix);
  const candidateId = sortedChildren
    .map((item) => item.microId)
    .sort((a, b) => (masteryByMicro[a] ?? 50) - (masteryByMicro[b] ?? 50))[0];

  if (!candidateId) return null;

  return pack.microSkills.find((m) => m.id === candidateId) ?? null;
}
