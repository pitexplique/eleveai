import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "es_a1_digits",    label: "Chiffres",            boId: "ESP_A1_DIGITS",    prerequis: [],                  levels: [1, 2, 3] },
  { id: "es_a1_numbers",   label: "Nombres",             boId: "ESP_A1_NUMBERS",   prerequis: ["es_a1_digits"],    levels: [1, 2, 3] },
  { id: "es_a1_operations",label: "Opérations",          boId: "ESP_A1_OPERATIONS",prerequis: ["es_a1_digits"],    levels: [1, 2, 3] },
  { id: "es_a1_shapes",    label: "Formes",              boId: "ESP_A1_SHAPES",    prerequis: [],                  levels: [1, 2, 3] },
  { id: "es_a1_colors",    label: "Couleurs",            boId: "ESP_A1_COLORS",    prerequis: [],                  levels: [1, 2, 3] },
  { id: "es_a1_family",    label: "Famille",             boId: "ESP_A1_FAMILY",    prerequis: [],                  levels: [1, 2, 3] },
  { id: "es_a1_school",    label: "École",               boId: "ESP_A1_SCHOOL",    prerequis: [],                  levels: [1, 2, 3] },
  { id: "es_a1_body",      label: "Corps",               boId: "ESP_A1_BODY",      prerequis: [],                  levels: [1, 2, 3] },
  { id: "es_a1_food",      label: "Alimentation",        boId: "ESP_A1_FOOD",      prerequis: [],                  levels: [1, 2, 3] },
  { id: "es_a1_animals",   label: "Animaux",             boId: "ESP_A1_ANIMALS",   prerequis: [],                  levels: [1, 2, 3] },
  { id: "es_a1_clothes",   label: "Vêtements",           boId: "ESP_A1_CLOTHES",   prerequis: [],                  levels: [1, 2, 3] },
  { id: "es_a1_house",     label: "Maison",              boId: "ESP_A1_HOUSE",     prerequis: [],                  levels: [1, 2, 3] },
  { id: "es_a1_days",      label: "Jours & mois",        boId: "ESP_A1_DAYS",      prerequis: [],                  levels: [1, 2, 3] },
  { id: "es_a1_greetings", label: "Salutations",         boId: "ESP_A1_GREETINGS", prerequis: [],                  levels: [1, 2, 3] },
];
