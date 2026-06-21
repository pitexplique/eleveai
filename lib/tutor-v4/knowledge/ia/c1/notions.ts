import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "ia_c1_cadrer_projet", label: "Cadrer un projet IA utile", boId: "IA_C1_PROJET_RESPONSABLE", prerequis: [], levels: [1, 2, 3, 4, 5] },
  { id: "ia_c1_responsabilite_pitch", label: "Responsabilite et presentation", boId: "IA_C1_PROJET_RESPONSABLE", prerequis: ["ia_c1_cadrer_projet"], levels: [1, 2, 3, 4, 5] },
];
