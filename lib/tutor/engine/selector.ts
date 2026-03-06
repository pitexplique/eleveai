import type { KnowledgePack, MicroSkill } from "@/lib/tutor/types";

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

export function selectStrongPrereqMicro(pack: KnowledgePack, microId: string) {
  const target = findMicro(pack, microId);

  const strongEdge = pack.microGraph.find((e) => e.to === target.id && e.strength === "strong");
  if (strongEdge) return findMicro(pack, strongEdge.from);

  if (target.prerequis.length > 0) return findMicro(pack, target.prerequis[0]);

  return null;
}