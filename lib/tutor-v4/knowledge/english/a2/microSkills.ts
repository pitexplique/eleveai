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

  // ── Science — Biology ─────────────────────────────────────────────────────────
  { id: "en_a2_science_biology_en_to_fr", label: "Translate biology term EN → FR",    notionId: "en_a2_science_biology", prerequis: [] },
  { id: "en_a2_science_biology_fr_to_en", label: "Translate biology term FR → EN",    notionId: "en_a2_science_biology", prerequis: ["en_a2_science_biology_en_to_fr"] },
  { id: "en_a2_science_biology_listen",   label: "Listen and identify biology term",   notionId: "en_a2_science_biology", prerequis: ["en_a2_science_biology_en_to_fr"] },

  // ── Science — Chemistry ───────────────────────────────────────────────────────
  { id: "en_a2_science_chemistry_en_to_fr", label: "Translate chemistry term EN → FR",    notionId: "en_a2_science_chemistry", prerequis: [] },
  { id: "en_a2_science_chemistry_fr_to_en", label: "Translate chemistry term FR → EN",    notionId: "en_a2_science_chemistry", prerequis: ["en_a2_science_chemistry_en_to_fr"] },
  { id: "en_a2_science_chemistry_listen",   label: "Listen and identify chemistry term",   notionId: "en_a2_science_chemistry", prerequis: ["en_a2_science_chemistry_en_to_fr"] },

  // ── Science — Physics ─────────────────────────────────────────────────────────
  { id: "en_a2_science_physics_en_to_fr", label: "Translate physics term EN → FR",    notionId: "en_a2_science_physics", prerequis: [] },
  { id: "en_a2_science_physics_fr_to_en", label: "Translate physics term FR → EN",    notionId: "en_a2_science_physics", prerequis: ["en_a2_science_physics_en_to_fr"] },
  { id: "en_a2_science_physics_listen",   label: "Listen and identify physics term",   notionId: "en_a2_science_physics", prerequis: ["en_a2_science_physics_en_to_fr"] },

  // ── Économie - Gestion — Economy Basics ──────────────────────────────────────
  { id: "en_a2_economy_basics_en_to_fr", label: "Translate economy term EN → FR",    notionId: "en_a2_economy_basics", prerequis: [] },
  { id: "en_a2_economy_basics_fr_to_en", label: "Translate economy term FR → EN",    notionId: "en_a2_economy_basics", prerequis: ["en_a2_economy_basics_en_to_fr"] },
  { id: "en_a2_economy_basics_listen",   label: "Listen and identify economy term",   notionId: "en_a2_economy_basics", prerequis: ["en_a2_economy_basics_en_to_fr"] },

  // ── Économie - Gestion — Family Finance ──────────────────────────────────────
  { id: "en_a2_family_finance_en_to_fr", label: "Translate family finance term EN → FR",    notionId: "en_a2_family_finance", prerequis: ["en_a2_economy_basics_en_to_fr"] },
  { id: "en_a2_family_finance_fr_to_en", label: "Translate family finance term FR → EN",    notionId: "en_a2_family_finance", prerequis: ["en_a2_family_finance_en_to_fr"] },
  { id: "en_a2_family_finance_listen",   label: "Listen and identify family finance term",   notionId: "en_a2_family_finance", prerequis: ["en_a2_family_finance_en_to_fr"] },

  // ── Économie - Gestion — Percentages ─────────────────────────────────────────
  { id: "en_a2_percentages_eco_en_to_fr", label: "Translate percentage/rate term EN → FR",    notionId: "en_a2_percentages_eco", prerequis: ["en_a2_economy_basics_en_to_fr"] },
  { id: "en_a2_percentages_eco_fr_to_en", label: "Translate percentage/rate term FR → EN",    notionId: "en_a2_percentages_eco", prerequis: ["en_a2_percentages_eco_en_to_fr"] },
  { id: "en_a2_percentages_eco_listen",   label: "Listen and identify percentage/rate term",   notionId: "en_a2_percentages_eco", prerequis: ["en_a2_percentages_eco_en_to_fr"] },

  // ── Géographie - Voyage — Travel ─────────────────────────────────────────────
  { id: "en_a2_travel_en_to_fr", label: "Recognize travel term EN → FR",   notionId: "en_a2_travel", prerequis: [] },
  { id: "en_a2_travel_fr_to_en", label: "Provide travel term FR → EN",     notionId: "en_a2_travel", prerequis: ["en_a2_travel_en_to_fr"] },
  { id: "en_a2_travel_listen",   label: "Listen and identify travel term",  notionId: "en_a2_travel", prerequis: ["en_a2_travel_en_to_fr"] },

  // ── Géographie - Voyage — Geography ──────────────────────────────────────────
  { id: "en_a2_geography_en_to_fr", label: "Translate geography term EN → FR",    notionId: "en_a2_geography", prerequis: ["en_a2_travel_en_to_fr"] },
  { id: "en_a2_geography_fr_to_en", label: "Translate geography term FR → EN",    notionId: "en_a2_geography", prerequis: ["en_a2_geography_en_to_fr"] },
  { id: "en_a2_geography_listen",   label: "Listen and identify geography term",   notionId: "en_a2_geography", prerequis: ["en_a2_geography_en_to_fr"] },

  // ── Géographie - Voyage — Directions ─────────────────────────────────────────
  { id: "en_a2_directions_en_to_fr", label: "Recognize direction EN → FR",   notionId: "en_a2_directions", prerequis: ["en_a2_travel_en_to_fr"] },
  { id: "en_a2_directions_fr_to_en", label: "Provide direction FR → EN",     notionId: "en_a2_directions", prerequis: ["en_a2_directions_en_to_fr"] },
  { id: "en_a2_directions_listen",   label: "Listen and identify direction",  notionId: "en_a2_directions", prerequis: ["en_a2_directions_en_to_fr"] },

  // ── Vie Quotidienne — Home ────────────────────────────────────────────────────
  { id: "en_a2_home_en_to_fr", label: "Recognize home word EN → FR",   notionId: "en_a2_home", prerequis: [] },
  { id: "en_a2_home_fr_to_en", label: "Provide home word FR → EN",     notionId: "en_a2_home", prerequis: ["en_a2_home_en_to_fr"] },
  { id: "en_a2_home_listen",   label: "Listen and identify home word",  notionId: "en_a2_home", prerequis: ["en_a2_home_en_to_fr"] },

  // ── Vie Quotidienne — Daily Verbs ─────────────────────────────────────────────
  { id: "en_a2_daily_verbs_en_to_fr", label: "Recognize daily verb EN → FR",   notionId: "en_a2_daily_verbs", prerequis: [] },
  { id: "en_a2_daily_verbs_fr_to_en", label: "Provide daily verb FR → EN",     notionId: "en_a2_daily_verbs", prerequis: ["en_a2_daily_verbs_en_to_fr"] },
  { id: "en_a2_daily_verbs_listen",   label: "Listen and identify daily verb",  notionId: "en_a2_daily_verbs", prerequis: ["en_a2_daily_verbs_en_to_fr"] },

  // ── Vie Quotidienne — Adjectives ──────────────────────────────────────────────
  { id: "en_a2_adjectives_en_to_fr", label: "Recognize adjective EN → FR",   notionId: "en_a2_adjectives", prerequis: ["en_a2_daily_verbs_en_to_fr"] },
  { id: "en_a2_adjectives_fr_to_en", label: "Provide adjective FR → EN",     notionId: "en_a2_adjectives", prerequis: ["en_a2_adjectives_en_to_fr"] },
  { id: "en_a2_adjectives_listen",   label: "Listen and identify adjective",  notionId: "en_a2_adjectives", prerequis: ["en_a2_adjectives_en_to_fr"] },

  // ── Vie Quotidienne — Jobs ────────────────────────────────────────────────────
  { id: "en_a2_jobs_en_to_fr", label: "Recognize job EN → FR",   notionId: "en_a2_jobs", prerequis: [] },
  { id: "en_a2_jobs_fr_to_en", label: "Provide job FR → EN",     notionId: "en_a2_jobs", prerequis: ["en_a2_jobs_en_to_fr"] },
  { id: "en_a2_jobs_listen",   label: "Listen and identify job",  notionId: "en_a2_jobs", prerequis: ["en_a2_jobs_en_to_fr"] },
];
