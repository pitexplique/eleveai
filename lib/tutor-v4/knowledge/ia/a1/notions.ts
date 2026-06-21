import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "ia_a1_definition", label: "Qu'est-ce que l'IA ?", boId: "IA_A1_COMPRENDRE", prerequis: [], levels: [1, 2, 3, 4, 5] },
  { id: "ia_a1_usages_limites", label: "Usages et limites", boId: "IA_A1_COMPRENDRE", prerequis: ["ia_a1_definition"], levels: [1, 2, 3, 4, 5] },
];
