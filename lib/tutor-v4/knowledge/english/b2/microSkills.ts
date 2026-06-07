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
];
