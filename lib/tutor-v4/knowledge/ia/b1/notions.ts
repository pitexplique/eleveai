import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "ia_b1_verification", label: "V?rification et esprit critique", boId: "IA_B1_VERIFIER_SECURITE", prerequis: [], levels: [1, 2, 3, 4, 5] },
  { id: "ia_b1_securite", label: "S?curit? et donn?es", boId: "IA_B1_VERIFIER_SECURITE", prerequis: ["ia_b1_verification"], levels: [1, 2, 3, 4, 5] },
];
