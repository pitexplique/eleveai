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

  // ── Sport Verbs ───────────────────────────────────────────────────────────────
  { id: "en_b1_sport_verbs_en_to_fr", label: "Translate sport verb EN → FR",     notionId: "en_b1_sport_verbs",   prerequis: [] },
  { id: "en_b1_sport_verbs_fr_to_en", label: "Translate sport verb FR → EN",     notionId: "en_b1_sport_verbs",   prerequis: ["en_b1_sport_verbs_en_to_fr"] },
  { id: "en_b1_sport_verbs_listen",   label: "Listen and identify sport verb",    notionId: "en_b1_sport_verbs",   prerequis: ["en_b1_sport_verbs_en_to_fr"] },

  // ── Sport Physics ─────────────────────────────────────────────────────────────
  { id: "en_b1_sport_physics_en_to_fr", label: "Translate sport physics term EN → FR",    notionId: "en_b1_sport_physics", prerequis: ["en_b1_sport_verbs_en_to_fr"] },
  { id: "en_b1_sport_physics_fr_to_en", label: "Translate sport physics term FR → EN",    notionId: "en_b1_sport_physics", prerequis: ["en_b1_sport_physics_en_to_fr"] },
  { id: "en_b1_sport_physics_listen",   label: "Listen and identify sport physics term",   notionId: "en_b1_sport_physics", prerequis: ["en_b1_sport_physics_en_to_fr"] },

  // ── Sport Stats ───────────────────────────────────────────────────────────────
  { id: "en_b1_sport_stats_en_to_fr", label: "Translate sport stats term EN → FR",    notionId: "en_b1_sport_stats", prerequis: ["en_b1_sport_verbs_en_to_fr"] },
  { id: "en_b1_sport_stats_fr_to_en", label: "Translate sport stats term FR → EN",    notionId: "en_b1_sport_stats", prerequis: ["en_b1_sport_stats_en_to_fr"] },
  { id: "en_b1_sport_stats_listen",   label: "Listen and identify sport stats term",   notionId: "en_b1_sport_stats", prerequis: ["en_b1_sport_stats_en_to_fr"] },

  // ── Science — Biology ─────────────────────────────────────────────────────────
  { id: "en_b1_science_biology_en_to_fr", label: "Translate biology term EN → FR",    notionId: "en_b1_science_biology", prerequis: [] },
  { id: "en_b1_science_biology_fr_to_en", label: "Translate biology term FR → EN",    notionId: "en_b1_science_biology", prerequis: ["en_b1_science_biology_en_to_fr"] },
  { id: "en_b1_science_biology_listen",   label: "Listen and identify biology term",   notionId: "en_b1_science_biology", prerequis: ["en_b1_science_biology_en_to_fr"] },

  // ── Science — Chemistry ───────────────────────────────────────────────────────
  { id: "en_b1_science_chemistry_en_to_fr", label: "Translate chemistry term EN → FR",    notionId: "en_b1_science_chemistry", prerequis: [] },
  { id: "en_b1_science_chemistry_fr_to_en", label: "Translate chemistry term FR → EN",    notionId: "en_b1_science_chemistry", prerequis: ["en_b1_science_chemistry_en_to_fr"] },
  { id: "en_b1_science_chemistry_listen",   label: "Listen and identify chemistry term",   notionId: "en_b1_science_chemistry", prerequis: ["en_b1_science_chemistry_en_to_fr"] },

  // ── Science — Physics ─────────────────────────────────────────────────────────
  { id: "en_b1_science_physics_en_to_fr", label: "Translate physics term EN → FR",    notionId: "en_b1_science_physics", prerequis: [] },
  { id: "en_b1_science_physics_fr_to_en", label: "Translate physics term FR → EN",    notionId: "en_b1_science_physics", prerequis: ["en_b1_science_physics_en_to_fr"] },
  { id: "en_b1_science_physics_listen",   label: "Listen and identify physics term",   notionId: "en_b1_science_physics", prerequis: ["en_b1_science_physics_en_to_fr"] },

  // ── Économie - Gestion — Economy ──────────────────────────────────────────────
  { id: "en_b1_economy_en_to_fr", label: "Translate economy term EN → FR",    notionId: "en_b1_economy", prerequis: [] },
  { id: "en_b1_economy_fr_to_en", label: "Translate economy term FR → EN",    notionId: "en_b1_economy", prerequis: ["en_b1_economy_en_to_fr"] },
  { id: "en_b1_economy_listen",   label: "Listen and identify economy term",   notionId: "en_b1_economy", prerequis: ["en_b1_economy_en_to_fr"] },

  // ── Économie - Gestion — Finance ──────────────────────────────────────────────
  { id: "en_b1_finance_en_to_fr", label: "Translate finance term EN → FR",    notionId: "en_b1_finance", prerequis: ["en_b1_economy_en_to_fr"] },
  { id: "en_b1_finance_fr_to_en", label: "Translate finance term FR → EN",    notionId: "en_b1_finance", prerequis: ["en_b1_finance_en_to_fr"] },
  { id: "en_b1_finance_listen",   label: "Listen and identify finance term",   notionId: "en_b1_finance", prerequis: ["en_b1_finance_en_to_fr"] },

  // ── Économie - Gestion — Family Management ────────────────────────────────────
  { id: "en_b1_family_management_en_to_fr", label: "Translate family management term EN → FR",    notionId: "en_b1_family_management", prerequis: ["en_b1_economy_en_to_fr"] },
  { id: "en_b1_family_management_fr_to_en", label: "Translate family management term FR → EN",    notionId: "en_b1_family_management", prerequis: ["en_b1_family_management_en_to_fr"] },
  { id: "en_b1_family_management_listen",   label: "Listen and identify family management term",   notionId: "en_b1_family_management", prerequis: ["en_b1_family_management_en_to_fr"] },
];
