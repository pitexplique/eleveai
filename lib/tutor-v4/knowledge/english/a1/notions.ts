import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "en_a1_digits",      label: "Digits",      boId: "ENGL_A1_DIGITS",      prerequis: [],                 levels: [1, 2, 3] },
  { id: "en_a1_numbers",     label: "Numbers",     boId: "ENGL_A1_NUMBERS",     prerequis: ["en_a1_digits"],   levels: [1, 2, 3] },
  { id: "en_a1_operations",  label: "Operations",  boId: "ENGL_A1_OPERATIONS",  prerequis: ["en_a1_digits"],   levels: [1, 2, 3] },
  { id: "en_a1_comparisons", label: "Comparisons", boId: "ENGL_A1_COMPARISONS", prerequis: ["en_a1_digits"],   levels: [1, 2, 3] },
  { id: "en_a1_shapes",      label: "Shapes",      boId: "ENGL_A1_SHAPES",      prerequis: [],                 levels: [1, 2, 3] },
  { id: "en_a1_verbs",               label: "Math Verbs",          boId: "ENGL_A1_VERBS",             prerequis: ["en_a1_operations"], levels: [1, 2, 3] },
  { id: "en_a1_sports",              label: "Sports",              boId: "ENGL_A1_SPORTS",             prerequis: [],               levels: [1, 2, 3] },
  { id: "en_a1_sport_measurements",  label: "Sport Measurements",  boId: "ENGL_A1_SPORT_MEASUREMENTS", prerequis: ["en_a1_sports"], levels: [1, 2, 3] },
  { id: "en_a1_science_living",  label: "Science — Living World", boId: "ENGL_A1_SCIENCE_LIVING", prerequis: [], levels: [1, 2, 3] },
  { id: "en_a1_science_earth",   label: "Science — Earth",        boId: "ENGL_A1_SCIENCE_EARTH",  prerequis: [], levels: [1, 2, 3] },
  { id: "en_a1_money",           label: "Économie - Gestion — Money",          boId: "ENGL_A1_MONEY",         prerequis: [],               levels: [1, 2, 3] },
  { id: "en_a1_family_budget",   label: "Économie - Gestion — Family Budget",  boId: "ENGL_A1_FAMILY_BUDGET", prerequis: ["en_a1_money"],  levels: [1, 2, 3] },
  { id: "en_a1_countries",       label: "Géographie - Voyage — Countries",       boId: "ENGL_A1_COUNTRIES",       prerequis: [],                          levels: [1, 2, 3] },
  { id: "en_a1_geography_basic", label: "Géographie - Voyage — Basic Geography", boId: "ENGL_A1_GEOGRAPHY_BASIC", prerequis: ["en_a1_countries"],         levels: [1, 2, 3] },
];
