import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ── Chiffres ─────────────────────────────────────────────────────────────────
  { id: "es_a1_digits_es_to_fr", label: "Reconnaître le chiffre ES → FR",       notionId: "es_a1_digits", prerequis: [] },
  { id: "es_a1_digits_fr_to_es", label: "Donner le chiffre FR → ES",             notionId: "es_a1_digits", prerequis: ["es_a1_digits_es_to_fr"] },
  { id: "es_a1_digits_listen",   label: "Écouter et identifier le chiffre 🔊",   notionId: "es_a1_digits", prerequis: ["es_a1_digits_es_to_fr"] },

  // ── Nombres ──────────────────────────────────────────────────────────────────
  { id: "es_a1_numbers_es_to_fr", label: "Reconnaître le nombre ES → FR",        notionId: "es_a1_numbers", prerequis: ["es_a1_digits_es_to_fr"] },
  { id: "es_a1_numbers_fr_to_es", label: "Donner le nombre FR → ES",              notionId: "es_a1_numbers", prerequis: ["es_a1_numbers_es_to_fr"] },
  { id: "es_a1_numbers_listen",   label: "Écouter et identifier le nombre 🔊",    notionId: "es_a1_numbers", prerequis: ["es_a1_numbers_es_to_fr"] },

  // ── Opérations ───────────────────────────────────────────────────────────────
  { id: "es_a1_operations_es_to_fr", label: "Reconnaître l'opération ES → FR",   notionId: "es_a1_operations", prerequis: [] },
  { id: "es_a1_operations_fr_to_es", label: "Donner l'opération FR → ES",         notionId: "es_a1_operations", prerequis: ["es_a1_operations_es_to_fr"] },
  { id: "es_a1_operations_listen",   label: "Écouter et identifier l'opération 🔊", notionId: "es_a1_operations", prerequis: ["es_a1_operations_es_to_fr"] },

  // ── Formes ───────────────────────────────────────────────────────────────────
  { id: "es_a1_shapes_es_to_fr", label: "Reconnaître la forme ES → FR",          notionId: "es_a1_shapes", prerequis: [] },
  { id: "es_a1_shapes_fr_to_es", label: "Donner la forme FR → ES",                notionId: "es_a1_shapes", prerequis: ["es_a1_shapes_es_to_fr"] },
  { id: "es_a1_shapes_listen",   label: "Écouter et identifier la forme 🔊",      notionId: "es_a1_shapes", prerequis: ["es_a1_shapes_es_to_fr"] },

  // ── Couleurs ─────────────────────────────────────────────────────────────────
  { id: "es_a1_colors_es_to_fr", label: "Reconnaître la couleur ES → FR",        notionId: "es_a1_colors", prerequis: [] },
  { id: "es_a1_colors_fr_to_es", label: "Donner la couleur FR → ES",              notionId: "es_a1_colors", prerequis: ["es_a1_colors_es_to_fr"] },
  { id: "es_a1_colors_listen",   label: "Écouter et identifier la couleur 🔊",    notionId: "es_a1_colors", prerequis: ["es_a1_colors_es_to_fr"] },

  // ── Famille ──────────────────────────────────────────────────────────────────
  { id: "es_a1_family_es_to_fr", label: "Reconnaître le membre de famille ES → FR", notionId: "es_a1_family", prerequis: [] },
  { id: "es_a1_family_fr_to_es", label: "Donner le membre de famille FR → ES",       notionId: "es_a1_family", prerequis: ["es_a1_family_es_to_fr"] },
  { id: "es_a1_family_listen",   label: "Écouter et identifier le membre de famille 🔊", notionId: "es_a1_family", prerequis: ["es_a1_family_es_to_fr"] },

  // ── École ────────────────────────────────────────────────────────────────────
  { id: "es_a1_school_es_to_fr", label: "Reconnaître le mot école ES → FR",      notionId: "es_a1_school", prerequis: [] },
  { id: "es_a1_school_fr_to_es", label: "Donner le mot école FR → ES",            notionId: "es_a1_school", prerequis: ["es_a1_school_es_to_fr"] },
  { id: "es_a1_school_listen",   label: "Écouter et identifier le mot école 🔊",  notionId: "es_a1_school", prerequis: ["es_a1_school_es_to_fr"] },

  // ── Corps ────────────────────────────────────────────────────────────────────
  { id: "es_a1_body_es_to_fr", label: "Reconnaître la partie du corps ES → FR",  notionId: "es_a1_body", prerequis: [] },
  { id: "es_a1_body_fr_to_es", label: "Donner la partie du corps FR → ES",        notionId: "es_a1_body", prerequis: ["es_a1_body_es_to_fr"] },
  { id: "es_a1_body_listen",   label: "Écouter et identifier la partie du corps 🔊", notionId: "es_a1_body", prerequis: ["es_a1_body_es_to_fr"] },

  // ── Alimentation ─────────────────────────────────────────────────────────────
  { id: "es_a1_food_es_to_fr", label: "Reconnaître l'aliment ES → FR",           notionId: "es_a1_food", prerequis: [] },
  { id: "es_a1_food_fr_to_es", label: "Donner l'aliment FR → ES",                 notionId: "es_a1_food", prerequis: ["es_a1_food_es_to_fr"] },
  { id: "es_a1_food_listen",   label: "Écouter et identifier l'aliment 🔊",       notionId: "es_a1_food", prerequis: ["es_a1_food_es_to_fr"] },

  // ── Animaux ──────────────────────────────────────────────────────────────────
  { id: "es_a1_animals_es_to_fr", label: "Reconnaître l'animal ES → FR",         notionId: "es_a1_animals", prerequis: [] },
  { id: "es_a1_animals_fr_to_es", label: "Donner l'animal FR → ES",               notionId: "es_a1_animals", prerequis: ["es_a1_animals_es_to_fr"] },
  { id: "es_a1_animals_listen",   label: "Écouter et identifier l'animal 🔊",     notionId: "es_a1_animals", prerequis: ["es_a1_animals_es_to_fr"] },

  // ── Vêtements ────────────────────────────────────────────────────────────────
  { id: "es_a1_clothes_es_to_fr", label: "Reconnaître le vêtement ES → FR",      notionId: "es_a1_clothes", prerequis: [] },
  { id: "es_a1_clothes_fr_to_es", label: "Donner le vêtement FR → ES",            notionId: "es_a1_clothes", prerequis: ["es_a1_clothes_es_to_fr"] },
  { id: "es_a1_clothes_listen",   label: "Écouter et identifier le vêtement 🔊",  notionId: "es_a1_clothes", prerequis: ["es_a1_clothes_es_to_fr"] },

  // ── Maison ───────────────────────────────────────────────────────────────────
  { id: "es_a1_house_es_to_fr", label: "Reconnaître le mot maison ES → FR",      notionId: "es_a1_house", prerequis: [] },
  { id: "es_a1_house_fr_to_es", label: "Donner le mot maison FR → ES",            notionId: "es_a1_house", prerequis: ["es_a1_house_es_to_fr"] },
  { id: "es_a1_house_listen",   label: "Écouter et identifier le mot maison 🔊",  notionId: "es_a1_house", prerequis: ["es_a1_house_es_to_fr"] },

  // ── Jours & mois ─────────────────────────────────────────────────────────────
  { id: "es_a1_days_es_to_fr", label: "Reconnaître le jour/mois ES → FR",        notionId: "es_a1_days", prerequis: [] },
  { id: "es_a1_days_fr_to_es", label: "Donner le jour/mois FR → ES",              notionId: "es_a1_days", prerequis: ["es_a1_days_es_to_fr"] },
  { id: "es_a1_days_listen",   label: "Écouter et identifier le jour/mois 🔊",    notionId: "es_a1_days", prerequis: ["es_a1_days_es_to_fr"] },

  // ── Salutations ──────────────────────────────────────────────────────────────
  { id: "es_a1_greetings_es_to_fr", label: "Reconnaître la salutation ES → FR",  notionId: "es_a1_greetings", prerequis: [] },
  { id: "es_a1_greetings_fr_to_es", label: "Donner la salutation FR → ES",        notionId: "es_a1_greetings", prerequis: ["es_a1_greetings_es_to_fr"] },
  { id: "es_a1_greetings_listen",   label: "Écouter et identifier la salutation 🔊", notionId: "es_a1_greetings", prerequis: ["es_a1_greetings_es_to_fr"] },

  // ── Argent & prix ────────────────────────────────────────────────────────────
  { id: "es_a1_money_es_to_fr", label: "Reconnaître le mot d'argent ES → FR",     notionId: "es_a1_money", prerequis: [] },
  { id: "es_a1_money_fr_to_es", label: "Donner le mot d'argent FR → ES",           notionId: "es_a1_money", prerequis: ["es_a1_money_es_to_fr"] },
  { id: "es_a1_money_listen",   label: "Écouter et identifier le mot d'argent 🔊", notionId: "es_a1_money", prerequis: ["es_a1_money_es_to_fr"] },

  // ── Géographie de base ───────────────────────────────────────────────────────
  { id: "es_a1_geography_basic_es_to_fr", label: "Reconnaître le lieu ES → FR",   notionId: "es_a1_geography_basic", prerequis: [] },
  { id: "es_a1_geography_basic_fr_to_es", label: "Donner le lieu FR → ES",         notionId: "es_a1_geography_basic", prerequis: ["es_a1_geography_basic_es_to_fr"] },
  { id: "es_a1_geography_basic_listen",   label: "Écouter et identifier le lieu 🔊", notionId: "es_a1_geography_basic", prerequis: ["es_a1_geography_basic_es_to_fr"] },

  // ── Sciences de la Terre ─────────────────────────────────────────────────────
  { id: "es_a1_science_earth_es_to_fr", label: "Reconnaître l'élément naturel ES → FR",   notionId: "es_a1_science_earth", prerequis: [] },
  { id: "es_a1_science_earth_fr_to_es", label: "Donner l'élément naturel FR → ES",         notionId: "es_a1_science_earth", prerequis: ["es_a1_science_earth_es_to_fr"] },
  { id: "es_a1_science_earth_listen",   label: "Écouter et identifier l'élément naturel 🔊", notionId: "es_a1_science_earth", prerequis: ["es_a1_science_earth_es_to_fr"] },

  // ── Sport & mesures ──────────────────────────────────────────────────────────
  { id: "es_a1_sport_measurements_es_to_fr", label: "Reconnaître la mesure ES → FR",   notionId: "es_a1_sport_measurements", prerequis: [] },
  { id: "es_a1_sport_measurements_fr_to_es", label: "Donner la mesure FR → ES",         notionId: "es_a1_sport_measurements", prerequis: ["es_a1_sport_measurements_es_to_fr"] },
  { id: "es_a1_sport_measurements_listen",   label: "Écouter et identifier la mesure 🔊", notionId: "es_a1_sport_measurements", prerequis: ["es_a1_sport_measurements_es_to_fr"] },
];
