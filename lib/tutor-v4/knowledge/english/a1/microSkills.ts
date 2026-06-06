import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ── Digits ──────────────────────────────────────────────────────────────────
  { id: "en_a1_digits_en_to_fr", label: "Recognize digit EN → FR", notionId: "en_a1_digits", prerequis: [] },
  { id: "en_a1_digits_fr_to_en", label: "Provide digit FR → EN",   notionId: "en_a1_digits", prerequis: ["en_a1_digits_en_to_fr"] },
  { id: "en_a1_digits_listen",   label: "Listen and identify digit", notionId: "en_a1_digits", prerequis: ["en_a1_digits_en_to_fr"] },

  // ── Numbers ─────────────────────────────────────────────────────────────────
  { id: "en_a1_numbers_en_to_fr", label: "Recognize number EN → FR", notionId: "en_a1_numbers", prerequis: ["en_a1_digits_en_to_fr"] },
  { id: "en_a1_numbers_fr_to_en", label: "Provide number FR → EN",   notionId: "en_a1_numbers", prerequis: ["en_a1_numbers_en_to_fr"] },
  { id: "en_a1_numbers_listen",   label: "Listen and identify number", notionId: "en_a1_numbers", prerequis: ["en_a1_numbers_en_to_fr"] },

  // ── Operations ──────────────────────────────────────────────────────────────
  { id: "en_a1_operations_en_to_fr", label: "Recognize operation EN → FR", notionId: "en_a1_operations", prerequis: [] },
  { id: "en_a1_operations_fr_to_en", label: "Provide operation FR → EN",   notionId: "en_a1_operations", prerequis: ["en_a1_operations_en_to_fr"] },
  { id: "en_a1_operations_listen",   label: "Listen and identify operation", notionId: "en_a1_operations", prerequis: ["en_a1_operations_en_to_fr"] },

  // ── Comparisons ─────────────────────────────────────────────────────────────
  { id: "en_a1_comparisons_en_to_fr", label: "Recognize comparison EN → FR", notionId: "en_a1_comparisons", prerequis: ["en_a1_operations_en_to_fr"] },
  { id: "en_a1_comparisons_fr_to_en", label: "Provide comparison FR → EN",   notionId: "en_a1_comparisons", prerequis: ["en_a1_comparisons_en_to_fr"] },
  { id: "en_a1_comparisons_listen",   label: "Listen and identify comparison", notionId: "en_a1_comparisons", prerequis: ["en_a1_comparisons_en_to_fr"] },

  // ── Shapes ──────────────────────────────────────────────────────────────────
  { id: "en_a1_shapes_en_to_fr", label: "Recognize shape EN → FR", notionId: "en_a1_shapes", prerequis: [] },
  { id: "en_a1_shapes_fr_to_en", label: "Provide shape FR → EN",   notionId: "en_a1_shapes", prerequis: ["en_a1_shapes_en_to_fr"] },
  { id: "en_a1_shapes_listen",   label: "Listen and identify shape", notionId: "en_a1_shapes", prerequis: ["en_a1_shapes_en_to_fr"] },

  // ── Math Verbs ──────────────────────────────────────────────────────────────
  { id: "en_a1_verbs_en_to_fr", label: "Recognize math verb EN → FR", notionId: "en_a1_verbs", prerequis: ["en_a1_operations_en_to_fr"] },
  { id: "en_a1_verbs_fr_to_en", label: "Provide math verb FR → EN",   notionId: "en_a1_verbs", prerequis: ["en_a1_verbs_en_to_fr"] },
  { id: "en_a1_verbs_listen",   label: "Listen and identify math verb", notionId: "en_a1_verbs", prerequis: ["en_a1_verbs_en_to_fr"] },
];
