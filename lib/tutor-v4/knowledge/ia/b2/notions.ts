import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "ia_b2_prompt_avance", label: "M?thode de production", boId: "IA_B2_CREER", prerequis: [], levels: [1, 2, 3, 4, 5] },
  { id: "ia_b2_production", label: "Production cr?ative", boId: "IA_B2_CREER", prerequis: ["ia_b2_prompt_avance"], levels: [1, 2, 3, 4, 5] },
];
