import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  {
    id: "en_b1_verbs",
    label: "Mathematical Verbs B1",
    boId: "ENGL_B1_VERBS",
    prerequis: [],
    levels: [2, 3],
  },
  {
    id: "en_b1_algebra",
    label: "Algebra Vocabulary B1",
    boId: "ENGL_B1_ALGEBRA",
    prerequis: ["en_b1_verbs"],
    levels: [2, 3],
  },
];
