import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ── Verbs ────────────────────────────────────────────────────────────────────
  { id: "en_a2_verbs_en_to_fr", label: "Translate verb EN → FR",      notionId: "en_a2_verbs",       prerequis: [] },
  { id: "en_a2_verbs_fr_to_en", label: "Translate verb FR → EN",      notionId: "en_a2_verbs",       prerequis: ["en_a2_verbs_en_to_fr"] },
  { id: "en_a2_verbs_listen",   label: "Listen and identify verb",     notionId: "en_a2_verbs",       prerequis: ["en_a2_verbs_en_to_fr"] },

  // ── Expressions ──────────────────────────────────────────────────────────────
  { id: "en_a2_expressions_en_to_fr", label: "Translate expression EN → FR",   notionId: "en_a2_expressions", prerequis: ["en_a2_verbs_en_to_fr"] },
  { id: "en_a2_expressions_fr_to_en", label: "Translate expression FR → EN",   notionId: "en_a2_expressions", prerequis: ["en_a2_expressions_en_to_fr"] },
  { id: "en_a2_expressions_listen",   label: "Listen and identify expression",  notionId: "en_a2_expressions", prerequis: ["en_a2_expressions_en_to_fr"] },

  // ── Fractions ─────────────────────────────────────────────────────────────────
  { id: "en_a2_fractions_en_to_fr", label: "Translate fractions term EN → FR",  notionId: "en_a2_fractions", prerequis: [] },
  { id: "en_a2_fractions_fr_to_en", label: "Translate fractions term FR → EN",  notionId: "en_a2_fractions", prerequis: ["en_a2_fractions_en_to_fr"] },
  { id: "en_a2_fractions_listen",   label: "Listen and identify fractions term", notionId: "en_a2_fractions", prerequis: ["en_a2_fractions_en_to_fr"] },

  // ── Geometry ──────────────────────────────────────────────────────────────────
  { id: "en_a2_geometry_en_to_fr", label: "Translate geometry term EN → FR",    notionId: "en_a2_geometry", prerequis: [] },
  { id: "en_a2_geometry_fr_to_en", label: "Translate geometry term FR → EN",    notionId: "en_a2_geometry", prerequis: ["en_a2_geometry_en_to_fr"] },
  { id: "en_a2_geometry_listen",   label: "Listen and identify geometry term",   notionId: "en_a2_geometry", prerequis: ["en_a2_geometry_en_to_fr"] },

  // ── Sport Verbs ───────────────────────────────────────────────────────────────
  { id: "en_a2_sport_verbs_en_to_fr", label: "Translate sport verb EN → FR",    notionId: "en_a2_sport_verbs", prerequis: [] },
  { id: "en_a2_sport_verbs_fr_to_en", label: "Translate sport verb FR → EN",    notionId: "en_a2_sport_verbs", prerequis: ["en_a2_sport_verbs_en_to_fr"] },
  { id: "en_a2_sport_verbs_listen",   label: "Listen and identify sport verb",   notionId: "en_a2_sport_verbs", prerequis: ["en_a2_sport_verbs_en_to_fr"] },

  // ── Sport Stats ───────────────────────────────────────────────────────────────
  { id: "en_a2_sport_stats_en_to_fr", label: "Translate sport stats term EN → FR",    notionId: "en_a2_sport_stats", prerequis: ["en_a2_sport_verbs_en_to_fr"] },
  { id: "en_a2_sport_stats_fr_to_en", label: "Translate sport stats term FR → EN",    notionId: "en_a2_sport_stats", prerequis: ["en_a2_sport_stats_en_to_fr"] },
  { id: "en_a2_sport_stats_listen",   label: "Listen and identify sport stats term",   notionId: "en_a2_sport_stats", prerequis: ["en_a2_sport_stats_en_to_fr"] },

  // ── Sport Physics ─────────────────────────────────────────────────────────────
  { id: "en_a2_sport_physics_en_to_fr", label: "Translate sport physics term EN → FR",    notionId: "en_a2_sport_physics", prerequis: [] },
  { id: "en_a2_sport_physics_fr_to_en", label: "Translate sport physics term FR → EN",    notionId: "en_a2_sport_physics", prerequis: ["en_a2_sport_physics_en_to_fr"] },
  { id: "en_a2_sport_physics_listen",   label: "Listen and identify sport physics term",   notionId: "en_a2_sport_physics", prerequis: ["en_a2_sport_physics_en_to_fr"] },
];
