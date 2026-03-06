import type { KnowledgePack, MasteryMap } from "@/lib/tutor/types";

export function initMastery(pack: KnowledgePack): {
  notion: MasteryMap;
  bo: MasteryMap;
  micro: MasteryMap;
} {
  const notion: MasteryMap = {};
  const bo: MasteryMap = {};
  const micro: MasteryMap = {};

  for (const n of pack.notions) notion[n.id] = 50;
  for (const c of pack.bo_competences) bo[c.boId] = 50;
  for (const m of pack.microSkills) micro[m.id] = 50;

  return { notion, bo, micro };
}

export function updateMastery(args: {
  notionMastery: MasteryMap;
  boMastery: MasteryMap;
  microMastery: MasteryMap;
  notionId: string;
  boId: string;
  microId: string;
  ok: boolean;
}) {
  const delta = args.ok ? 8 : -10;

  args.microMastery[args.microId] = Math.max(
    0,
    Math.min(100, (args.microMastery[args.microId] ?? 50) + delta)
  );

  args.notionMastery[args.notionId] = Math.max(
    0,
    Math.min(100, (args.notionMastery[args.notionId] ?? 50) + Math.round(delta * 0.7))
  );

  args.boMastery[args.boId] = Math.max(
    0,
    Math.min(100, (args.boMastery[args.boId] ?? 50) + Math.round(delta * 0.5))
  );
}