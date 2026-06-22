import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "ia_a2_prompts", label: "Ecrire un bon prompt", boId: "IA_A2_UTILISER", prerequis: [], levels: [1, 2, 3, 4, 5] },
  { id: "ia_a2_reviser", label: "Reviser et s'entrainer avec l'IA", boId: "IA_A2_UTILISER", prerequis: ["ia_a2_prompts"], levels: [1, 2, 3, 4, 5] },
  { id: "ia_a2_apprendre_honnete", label: "Apprendre vraiment, sans tricher", boId: "IA_A2_UTILISER", prerequis: ["ia_a2_reviser"], levels: [1, 2, 3, 4, 5] },
];
