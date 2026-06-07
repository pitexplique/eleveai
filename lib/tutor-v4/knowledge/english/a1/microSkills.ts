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

  // ── Sports ──────────────────────────────────────────────────────────────────
  { id: "en_a1_sports_en_to_fr", label: "Recognize sport EN → FR",     notionId: "en_a1_sports", prerequis: [] },
  { id: "en_a1_sports_fr_to_en", label: "Provide sport FR → EN",       notionId: "en_a1_sports", prerequis: ["en_a1_sports_en_to_fr"] },
  { id: "en_a1_sports_listen",   label: "Listen and identify sport",    notionId: "en_a1_sports", prerequis: ["en_a1_sports_en_to_fr"] },

  // ── Sport Measurements ──────────────────────────────────────────────────────
  { id: "en_a1_sport_measurements_en_to_fr", label: "Recognize measurement EN → FR",   notionId: "en_a1_sport_measurements", prerequis: ["en_a1_sports_en_to_fr"] },
  { id: "en_a1_sport_measurements_fr_to_en", label: "Provide measurement FR → EN",     notionId: "en_a1_sport_measurements", prerequis: ["en_a1_sport_measurements_en_to_fr"] },
  { id: "en_a1_sport_measurements_listen",   label: "Listen and identify measurement", notionId: "en_a1_sport_measurements", prerequis: ["en_a1_sport_measurements_en_to_fr"] },

  // ── Science — Living World ───────────────────────────────────────────────────
  { id: "en_a1_science_living_en_to_fr", label: "Recognize living world term EN → FR",   notionId: "en_a1_science_living", prerequis: [] },
  { id: "en_a1_science_living_fr_to_en", label: "Provide living world term FR → EN",     notionId: "en_a1_science_living", prerequis: ["en_a1_science_living_en_to_fr"] },
  { id: "en_a1_science_living_listen",   label: "Listen and identify living world term", notionId: "en_a1_science_living", prerequis: ["en_a1_science_living_en_to_fr"] },

  // ── Science — Earth ──────────────────────────────────────────────────────────
  { id: "en_a1_science_earth_en_to_fr", label: "Recognize Earth science term EN → FR",   notionId: "en_a1_science_earth", prerequis: [] },
  { id: "en_a1_science_earth_fr_to_en", label: "Provide Earth science term FR → EN",     notionId: "en_a1_science_earth", prerequis: ["en_a1_science_earth_en_to_fr"] },
  { id: "en_a1_science_earth_listen",   label: "Listen and identify Earth science term", notionId: "en_a1_science_earth", prerequis: ["en_a1_science_earth_en_to_fr"] },

  // ── Économie - Gestion — Money ───────────────────────────────────────────────
  { id: "en_a1_money_en_to_fr", label: "Recognize money term EN → FR",   notionId: "en_a1_money", prerequis: [] },
  { id: "en_a1_money_fr_to_en", label: "Provide money term FR → EN",     notionId: "en_a1_money", prerequis: ["en_a1_money_en_to_fr"] },
  { id: "en_a1_money_listen",   label: "Listen and identify money term", notionId: "en_a1_money", prerequis: ["en_a1_money_en_to_fr"] },

  // ── Économie - Gestion — Family Budget ──────────────────────────────────────
  { id: "en_a1_family_budget_en_to_fr", label: "Recognize budget term EN → FR",   notionId: "en_a1_family_budget", prerequis: ["en_a1_money_en_to_fr"] },
  { id: "en_a1_family_budget_fr_to_en", label: "Provide budget term FR → EN",     notionId: "en_a1_family_budget", prerequis: ["en_a1_family_budget_en_to_fr"] },
  { id: "en_a1_family_budget_listen",   label: "Listen and identify budget term", notionId: "en_a1_family_budget", prerequis: ["en_a1_family_budget_en_to_fr"] },

  // ── Géographie - Voyage — Countries ──────────────────────────────────────────
  { id: "en_a1_countries_en_to_fr", label: "Recognize country/continent EN → FR",   notionId: "en_a1_countries", prerequis: [] },
  { id: "en_a1_countries_fr_to_en", label: "Provide country/continent FR → EN",     notionId: "en_a1_countries", prerequis: ["en_a1_countries_en_to_fr"] },
  { id: "en_a1_countries_listen",   label: "Listen and identify country/continent",  notionId: "en_a1_countries", prerequis: ["en_a1_countries_en_to_fr"] },

  // ── Géographie - Voyage — Basic Geography ────────────────────────────────────
  { id: "en_a1_geography_basic_en_to_fr", label: "Recognize geography word EN → FR",   notionId: "en_a1_geography_basic", prerequis: ["en_a1_countries_en_to_fr"] },
  { id: "en_a1_geography_basic_fr_to_en", label: "Provide geography word FR → EN",     notionId: "en_a1_geography_basic", prerequis: ["en_a1_geography_basic_en_to_fr"] },
  { id: "en_a1_geography_basic_listen",   label: "Listen and identify geography word",  notionId: "en_a1_geography_basic", prerequis: ["en_a1_geography_basic_en_to_fr"] },
];
