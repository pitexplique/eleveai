import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // Numbers
  { id: "en_a1_numbers_en_to_fr", label: "Translate number word EN → FR", notionId: "en_a1_numbers",    prerequis: [] },
  { id: "en_a1_numbers_fr_to_en", label: "Translate number word FR → EN", notionId: "en_a1_numbers",    prerequis: ["en_a1_numbers_en_to_fr"] },
  { id: "en_a1_numbers_listen",   label: "Listen and identify number",    notionId: "en_a1_numbers",    prerequis: ["en_a1_numbers_en_to_fr"] },

  // Operations
  { id: "en_a1_operations_en_to_fr", label: "Translate operation EN → FR", notionId: "en_a1_operations", prerequis: [] },
  { id: "en_a1_operations_fr_to_en", label: "Translate operation FR → EN", notionId: "en_a1_operations", prerequis: ["en_a1_operations_en_to_fr"] },
  { id: "en_a1_operations_listen",   label: "Listen and identify operation", notionId: "en_a1_operations", prerequis: ["en_a1_operations_en_to_fr"] },

  // Geometry
  { id: "en_a1_geometry_en_to_fr", label: "Translate geometry word EN → FR", notionId: "en_a1_geometry", prerequis: [] },
  { id: "en_a1_geometry_fr_to_en", label: "Translate geometry word FR → EN", notionId: "en_a1_geometry", prerequis: ["en_a1_geometry_en_to_fr"] },
  { id: "en_a1_geometry_listen",   label: "Listen and identify shape",        notionId: "en_a1_geometry", prerequis: ["en_a1_geometry_en_to_fr"] },

  // Verbs A1
  { id: "en_a1_verbs_en_to_fr", label: "Translate verb EN → FR", notionId: "en_a1_verbs", prerequis: [] },
  { id: "en_a1_verbs_fr_to_en", label: "Translate verb FR → EN", notionId: "en_a1_verbs", prerequis: ["en_a1_verbs_en_to_fr"] },
  { id: "en_a1_verbs_listen",   label: "Listen and identify verb", notionId: "en_a1_verbs", prerequis: ["en_a1_verbs_en_to_fr"] },
];
