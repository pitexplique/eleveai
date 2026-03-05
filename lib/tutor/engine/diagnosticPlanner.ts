import type { KnowledgePack } from "@/lib/tutor/types";

export function pickInitialNotion(pack: KnowledgePack, requestedNotion: string) {
  return pack.notions.find((n) => n.id === requestedNotion) ?? pack.notions[0];
}
