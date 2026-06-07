import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ── Verbs ────────────────────────────────────────────────────────────────────
  { id: "en_b1_verbs_en_to_fr", label: "Translate verb EN → FR",       notionId: "en_b1_verbs",   prerequis: [] },
  { id: "en_b1_verbs_fr_to_en", label: "Translate verb FR → EN",       notionId: "en_b1_verbs",   prerequis: ["en_b1_verbs_en_to_fr"] },
  { id: "en_b1_verbs_listen",   label: "Listen and identify verb",      notionId: "en_b1_verbs",   prerequis: ["en_b1_verbs_en_to_fr"] },

  // ── Algebra vocabulary ────────────────────────────────────────────────────────
  { id: "en_b1_algebra_en_to_fr", label: "Translate algebra term EN → FR",      notionId: "en_b1_algebra",     prerequis: ["en_b1_verbs_en_to_fr"] },
  { id: "en_b1_algebra_fr_to_en", label: "Translate algebra term FR → EN",      notionId: "en_b1_algebra",     prerequis: ["en_b1_algebra_en_to_fr"] },
  { id: "en_b1_algebra_listen",   label: "Listen and identify algebra term",     notionId: "en_b1_algebra",     prerequis: ["en_b1_algebra_en_to_fr"] },

  // ── Statistics vocabulary ─────────────────────────────────────────────────────
  { id: "en_b1_statistics_en_to_fr", label: "Translate statistics term EN → FR",   notionId: "en_b1_statistics",  prerequis: [] },
  { id: "en_b1_statistics_fr_to_en", label: "Translate statistics term FR → EN",   notionId: "en_b1_statistics",  prerequis: ["en_b1_statistics_en_to_fr"] },
  { id: "en_b1_statistics_listen",   label: "Listen and identify statistics term",  notionId: "en_b1_statistics",  prerequis: ["en_b1_statistics_en_to_fr"] },

  // ── Reasoning phrases ─────────────────────────────────────────────────────────
  { id: "en_b1_reasoning_en_to_fr", label: "Translate reasoning phrase EN → FR",   notionId: "en_b1_reasoning",   prerequis: ["en_b1_verbs_en_to_fr"] },
  { id: "en_b1_reasoning_fr_to_en", label: "Translate reasoning phrase FR → EN",   notionId: "en_b1_reasoning",   prerequis: ["en_b1_reasoning_en_to_fr"] },
  { id: "en_b1_reasoning_listen",   label: "Listen and identify reasoning phrase",  notionId: "en_b1_reasoning",   prerequis: ["en_b1_reasoning_en_to_fr"] },
];
