import type { KnowledgePack, MasteryMap } from "@/lib/tutor/types";

export function initMastery(pack: KnowledgePack): { notion: MasteryMap; bo: MasteryMap } {
  const notion: MasteryMap = {};
  const bo: MasteryMap = {};

  for (const n of pack.notions) notion[n.id] = 50;
  for (const c of pack.bo_competences) bo[c.boId] = 50;

  return { notion, bo };
}

export function updateMastery(
  notionMastery: MasteryMap,
  boMastery: MasteryMap,
  notionId: string,
  boId: string,
  ok: boolean,
) {
  const delta = ok ? 8 : -10;
  notionMastery[notionId] = Math.max(0, Math.min(100, (notionMastery[notionId] ?? 50) + delta));
  boMastery[boId] = Math.max(0, Math.min(100, (boMastery[boId] ?? 50) + delta / 2));
}
