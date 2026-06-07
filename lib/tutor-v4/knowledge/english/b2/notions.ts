import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  {
    id: "en_b2_verbs",
    label: "Mathematical Verbs B2",
    boId: "ENGL_B2_VERBS",
    prerequis: [],
    levels: [3, 4],
  },
  {
    id: "en_b2_proof",
    label: "Proof & Logic B2",
    boId: "ENGL_B2_PROOF",
    prerequis: ["en_b2_verbs"],
    levels: [3, 4],
  },
  {
    id: "en_b2_analysis",
    label: "Analysis Vocabulary B2",
    boId: "ENGL_B2_ANALYSIS",
    prerequis: ["en_b2_verbs"],
    levels: [3, 4],
  },
  {
    id: "en_b2_sport_verbs",
    label: "Sport Verbs B2",
    boId: "ENGL_B2_SPORT_VERBS",
    prerequis: [],
    levels: [3, 4],
  },
  {
    id: "en_b2_sport_science",
    label: "Sport Science B2",
    boId: "ENGL_B2_SPORT_SCIENCE",
    prerequis: ["en_b2_sport_verbs"],
    levels: [3, 4],
  },
  {
    id: "en_b2_sport_data",
    label: "Sport Data Analysis B2",
    boId: "ENGL_B2_SPORT_DATA",
    prerequis: ["en_b2_sport_verbs"],
    levels: [3, 4],
  },
];
