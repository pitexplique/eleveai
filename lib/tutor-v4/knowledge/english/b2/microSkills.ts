import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "en_b2_verbs_en_to_fr", label: "Translate verb EN → FR", notionId: "en_b2_verbs", prerequis: [] },
  { id: "en_b2_verbs_fr_to_en", label: "Translate verb FR → EN", notionId: "en_b2_verbs", prerequis: ["en_b2_verbs_en_to_fr"] },
  { id: "en_b2_verbs_listen",   label: "Listen and identify verb", notionId: "en_b2_verbs", prerequis: ["en_b2_verbs_en_to_fr"] },
];
