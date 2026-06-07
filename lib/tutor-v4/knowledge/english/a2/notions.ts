import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  {
    id: "en_a2_verbs",
    label: "Mathematical Verbs A2",
    boId: "ENGL_A2_VERBS",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "en_a2_expressions",
    label: "Mathematical Expressions A2",
    boId: "ENGL_A2_EXPRESSIONS",
    prerequis: ["en_a2_verbs"],
    levels: [2, 3],
  },
  {
    id: "en_a2_fractions",
    label: "Fractions Vocabulary A2",
    boId: "ENGL_A2_FRACTIONS",
    prerequis: [],
    levels: [2, 3],
  },
  {
    id: "en_a2_geometry",
    label: "Geometry Vocabulary A2",
    boId: "ENGL_A2_GEOMETRY",
    prerequis: [],
    levels: [2, 3],
  },
];
