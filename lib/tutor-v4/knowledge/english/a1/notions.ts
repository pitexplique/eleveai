import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "en_a1_numbers",    label: "Numbers",              boId: "ENGL_A1_NUMBERS",    prerequis: [],                levels: [1, 2, 3] },
  { id: "en_a1_operations", label: "Operations",           boId: "ENGL_A1_OPERATIONS", prerequis: ["en_a1_numbers"], levels: [1, 2, 3] },
  { id: "en_a1_geometry",   label: "Geometry",             boId: "ENGL_A1_GEOMETRY",   prerequis: [],                levels: [1, 2, 3] },
  { id: "en_a1_verbs",      label: "Mathematical Verbs A1", boId: "ENGL_A1_VERBS",     prerequis: [],                levels: [1, 2, 3] },
];
