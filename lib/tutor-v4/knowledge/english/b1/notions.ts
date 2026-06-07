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
  {
    id: "en_b1_statistics",
    label: "Statistics Vocabulary B1",
    boId: "ENGL_B1_STATISTICS",
    prerequis: [],
    levels: [2, 3],
  },
  {
    id: "en_b1_reasoning",
    label: "Reasoning Phrases B1",
    boId: "ENGL_B1_REASONING",
    prerequis: ["en_b1_verbs"],
    levels: [2, 3],
  },
  {
    id: "en_b1_sport_verbs",
    label: "Sport Verbs B1",
    boId: "ENGL_B1_SPORT_VERBS",
    prerequis: [],
    levels: [2, 3],
  },
  {
    id: "en_b1_sport_physics",
    label: "Sport Physics B1",
    boId: "ENGL_B1_SPORT_PHYSICS",
    prerequis: ["en_b1_sport_verbs"],
    levels: [2, 3],
  },
  {
    id: "en_b1_sport_stats",
    label: "Sport Statistics B1",
    boId: "ENGL_B1_SPORT_STATS",
    prerequis: ["en_b1_sport_verbs"],
    levels: [2, 3],
  },
];
