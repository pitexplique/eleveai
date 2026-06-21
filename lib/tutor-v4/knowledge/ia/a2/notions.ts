import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "ia_a2_prompts", label: "Prompts pour apprendre", boId: "IA_A2_UTILISER", prerequis: [], levels: [1, 2, 3, 4, 5] },
  { id: "ia_a2_reviser", label: "R?viser avec IA", boId: "IA_A2_UTILISER", prerequis: ["ia_a2_prompts"], levels: [1, 2, 3, 4, 5] },
];
