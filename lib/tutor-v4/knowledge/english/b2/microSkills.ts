import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ── Verbs ─────────────────────────────────────────────────────────────────
  { id: "en_b2_verbs_en_to_fr", label: "Translate verb EN → FR",      notionId: "en_b2_verbs",    prerequis: [] },
  { id: "en_b2_verbs_fr_to_en", label: "Translate verb FR → EN",      notionId: "en_b2_verbs",    prerequis: ["en_b2_verbs_en_to_fr"] },
  { id: "en_b2_verbs_listen",   label: "Listen and identify verb",     notionId: "en_b2_verbs",    prerequis: ["en_b2_verbs_en_to_fr"] },

  // ── Proof & Logic ─────────────────────────────────────────────────────────
  { id: "en_b2_proof_en_to_fr", label: "Translate proof term EN → FR",    notionId: "en_b2_proof",    prerequis: ["en_b2_verbs_en_to_fr"] },
  { id: "en_b2_proof_fr_to_en", label: "Translate proof term FR → EN",    notionId: "en_b2_proof",    prerequis: ["en_b2_proof_en_to_fr"] },
  { id: "en_b2_proof_listen",   label: "Listen and identify proof term",   notionId: "en_b2_proof",    prerequis: ["en_b2_proof_en_to_fr"] },

  // ── Analysis ──────────────────────────────────────────────────────────────
  { id: "en_b2_analysis_en_to_fr", label: "Translate analysis term EN → FR",  notionId: "en_b2_analysis", prerequis: ["en_b2_verbs_en_to_fr"] },
  { id: "en_b2_analysis_fr_to_en", label: "Translate analysis term FR → EN",  notionId: "en_b2_analysis", prerequis: ["en_b2_analysis_en_to_fr"] },
  { id: "en_b2_analysis_listen",   label: "Listen and identify analysis term", notionId: "en_b2_analysis", prerequis: ["en_b2_analysis_en_to_fr"] },

  // ── Sport Verbs ───────────────────────────────────────────────────────────
  { id: "en_b2_sport_verbs_en_to_fr", label: "Translate sport verb EN → FR",    notionId: "en_b2_sport_verbs",   prerequis: [] },
  { id: "en_b2_sport_verbs_fr_to_en", label: "Translate sport verb FR → EN",    notionId: "en_b2_sport_verbs",   prerequis: ["en_b2_sport_verbs_en_to_fr"] },
  { id: "en_b2_sport_verbs_listen",   label: "Listen and identify sport verb",   notionId: "en_b2_sport_verbs",   prerequis: ["en_b2_sport_verbs_en_to_fr"] },

  // ── Sport Science ─────────────────────────────────────────────────────────
  { id: "en_b2_sport_science_en_to_fr", label: "Translate sport science term EN → FR",    notionId: "en_b2_sport_science", prerequis: ["en_b2_sport_verbs_en_to_fr"] },
  { id: "en_b2_sport_science_fr_to_en", label: "Translate sport science term FR → EN",    notionId: "en_b2_sport_science", prerequis: ["en_b2_sport_science_en_to_fr"] },
  { id: "en_b2_sport_science_listen",   label: "Listen and identify sport science term",   notionId: "en_b2_sport_science", prerequis: ["en_b2_sport_science_en_to_fr"] },

  // ── Sport Data ────────────────────────────────────────────────────────────
  { id: "en_b2_sport_data_en_to_fr", label: "Translate sport data term EN → FR",    notionId: "en_b2_sport_data", prerequis: ["en_b2_sport_verbs_en_to_fr"] },
  { id: "en_b2_sport_data_fr_to_en", label: "Translate sport data term FR → EN",    notionId: "en_b2_sport_data", prerequis: ["en_b2_sport_data_en_to_fr"] },
  { id: "en_b2_sport_data_listen",   label: "Listen and identify sport data term",   notionId: "en_b2_sport_data", prerequis: ["en_b2_sport_data_en_to_fr"] },

  // ── Science — Biology ─────────────────────────────────────────────────────
  { id: "en_b2_science_biology_en_to_fr", label: "Translate biology term EN → FR",    notionId: "en_b2_science_biology", prerequis: [] },
  { id: "en_b2_science_biology_fr_to_en", label: "Translate biology term FR → EN",    notionId: "en_b2_science_biology", prerequis: ["en_b2_science_biology_en_to_fr"] },
  { id: "en_b2_science_biology_listen",   label: "Listen and identify biology term",   notionId: "en_b2_science_biology", prerequis: ["en_b2_science_biology_en_to_fr"] },

  // ── Science — Chemistry ───────────────────────────────────────────────────
  { id: "en_b2_science_chemistry_en_to_fr", label: "Translate chemistry term EN → FR",    notionId: "en_b2_science_chemistry", prerequis: [] },
  { id: "en_b2_science_chemistry_fr_to_en", label: "Translate chemistry term FR → EN",    notionId: "en_b2_science_chemistry", prerequis: ["en_b2_science_chemistry_en_to_fr"] },
  { id: "en_b2_science_chemistry_listen",   label: "Listen and identify chemistry term",   notionId: "en_b2_science_chemistry", prerequis: ["en_b2_science_chemistry_en_to_fr"] },

  // ── Science — Physics ─────────────────────────────────────────────────────
  { id: "en_b2_science_physics_en_to_fr", label: "Translate physics term EN → FR",    notionId: "en_b2_science_physics", prerequis: [] },
  { id: "en_b2_science_physics_fr_to_en", label: "Translate physics term FR → EN",    notionId: "en_b2_science_physics", prerequis: ["en_b2_science_physics_en_to_fr"] },
  { id: "en_b2_science_physics_listen",   label: "Listen and identify physics term",   notionId: "en_b2_science_physics", prerequis: ["en_b2_science_physics_en_to_fr"] },

  // ── Économie - Gestion — Macroeconomics ───────────────────────────────────
  { id: "en_b2_macroeconomics_en_to_fr", label: "Translate macroeconomics term EN → FR",    notionId: "en_b2_macroeconomics", prerequis: [] },
  { id: "en_b2_macroeconomics_fr_to_en", label: "Translate macroeconomics term FR → EN",    notionId: "en_b2_macroeconomics", prerequis: ["en_b2_macroeconomics_en_to_fr"] },
  { id: "en_b2_macroeconomics_listen",   label: "Listen and identify macroeconomics term",   notionId: "en_b2_macroeconomics", prerequis: ["en_b2_macroeconomics_en_to_fr"] },

  // ── Économie - Gestion — Business ─────────────────────────────────────────
  { id: "en_b2_business_en_to_fr", label: "Translate business term EN → FR",    notionId: "en_b2_business", prerequis: ["en_b2_macroeconomics_en_to_fr"] },
  { id: "en_b2_business_fr_to_en", label: "Translate business term FR → EN",    notionId: "en_b2_business", prerequis: ["en_b2_business_en_to_fr"] },
  { id: "en_b2_business_listen",   label: "Listen and identify business term",   notionId: "en_b2_business", prerequis: ["en_b2_business_en_to_fr"] },

  // ── Économie - Gestion — Eco Statistics ───────────────────────────────────
  { id: "en_b2_eco_statistics_en_to_fr", label: "Translate eco statistics term EN → FR",    notionId: "en_b2_eco_statistics", prerequis: ["en_b2_macroeconomics_en_to_fr"] },
  { id: "en_b2_eco_statistics_fr_to_en", label: "Translate eco statistics term FR → EN",    notionId: "en_b2_eco_statistics", prerequis: ["en_b2_eco_statistics_en_to_fr"] },
  { id: "en_b2_eco_statistics_listen",   label: "Listen and identify eco statistics term",   notionId: "en_b2_eco_statistics", prerequis: ["en_b2_eco_statistics_en_to_fr"] },
];
