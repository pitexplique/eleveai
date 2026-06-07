import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ── Verbs ────────────────────────────────────────────────────────────────────
  { id: "en_a2_verbs_en_to_fr", label: "Translate verb EN → FR",      notionId: "en_a2_verbs",       prerequis: [] },
  { id: "en_a2_verbs_fr_to_en", label: "Translate verb FR → EN",      notionId: "en_a2_verbs",       prerequis: ["en_a2_verbs_en_to_fr"] },
  { id: "en_a2_verbs_listen",   label: "Listen and identify verb",     notionId: "en_a2_verbs",       prerequis: ["en_a2_verbs_en_to_fr"] },

  // ── Expressions ──────────────────────────────────────────────────────────────
  { id: "en_a2_expressions_en_to_fr", label: "Translate expression EN → FR", notionId: "en_a2_expressions", prerequis: ["en_a2_verbs_en_to_fr"] },
  { id: "en_a2_expressions_fr_to_en", label: "Translate expression FR → EN", notionId: "en_a2_expressions", prerequis: ["en_a2_expressions_en_to_fr"] },
  { id: "en_a2_expressions_listen",   label: "Listen and identify expression", notionId: "en_a2_expressions", prerequis: ["en_a2_expressions_en_to_fr"] },
];
