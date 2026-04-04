export const NOTION_OPTIONS = [
  { id: "decimaux", label: "Nombres décimaux" },
  { id: "fractions", label: "Fractions" },
  { id: "proportionnalite", label: "Proportionnalité" },
  { id: "perimetre", label: "Périmètre" },
  { id: "aires", label: "Aires" },
  { id: "angles", label: "Angles" },
  { id: "triangles", label: "Triangles" },
  { id: "quadrilateres", label: "Quadrilatères" },
  { id: "calcul_mental", label: "Calcul mental" },
] as const;

export const NOTION_MICRO_MAP: Record<string, string[]> = {
  decimaux: [
    "decimal_compare",
    "decimal_write",
    "decimal_add",
    "decimal_multiply",
    "decimal_divide_by_integer",
    "decimal_defis",
  ],
  fractions: ["fraction_read", "fraction_compare", "fraction_quantity"],
  proportionnalite: ["prop_table", "prop_unit", "prop_direct"],
  perimetre: ["perim_square", "perim_rectangle"],
  aires: ["area_rectangle", "area_square"],
  angles: ["angle_right", "angle_compare"],
  triangles: [
    "triangle_name",
    "triangle_vertices_sides",
    "triangle_type_sides",
    "triangle_type_angles",
    "triangle_angle_sum",
    "triangle_missing_angle",
    "triangle_possible_or_not",
    "triangle_defis",
  ],
  quadrilateres: [
    "quadrilatere_identifier_nature",
    "quadrilatere_lire_proprietes",
    "quadrilatere_lien_proprietes",
    "quadrilatere_distinguer",
    "quadrilatere_conclusion",
    "quadrilatere_defis",
  ],
  calcul_mental: [
    "mental_addition",
    "mental_subtraction",
    "mental_multiplication",
    "mental_division",
    "mental_strategies",
    "mental_defis",
  ],
};

export const MICRO_LABELS: Record<string, string> = {
  decimal_compare: "Comparer des nombres décimaux",
  decimal_write: "Écrire un nombre décimal",
  decimal_add: "Additionner des nombres décimaux",
  decimal_multiply: "Multiplier des nombres décimaux",
  decimal_divide_by_integer: "Diviser un nombre décimal par un entier",
  decimal_defis: "Défis",

  fraction_read: "Lire une fraction",
  fraction_compare: "Comparer des fractions",
  fraction_quantity: "Comprendre une fraction comme quantité",

  prop_table: "Compléter un tableau de proportionnalité",
  prop_unit: "Passer par l’unité",
  prop_direct: "Résoudre une situation de proportionnalité",

  perim_square: "Calculer le périmètre d’un carré",
  perim_rectangle: "Calculer le périmètre d’un rectangle",

  area_rectangle: "Calculer l’aire d’un rectangle",
  area_square: "Calculer l’aire d’un carré",

  angle_right: "Identifier un angle droit",
  angle_compare: "Comparer deux angles",

  triangle_name: "Nommer un triangle",
  triangle_vertices_sides: "Identifier sommets et côtés",
  triangle_type_sides: "Reconnaître selon les côtés",
  triangle_type_angles: "Reconnaître selon les angles",
  triangle_angle_sum: "Utiliser la somme des angles",
  triangle_missing_angle: "Calculer un angle manquant",
  triangle_possible_or_not: "Décider si un triangle est constructible",
  triangle_defis: "Défis sur les triangles",

  quadrilatere_identifier_nature: "Identifier la nature d’un quadrilatère",
  quadrilatere_lire_proprietes: "Lire les propriétés d’un quadrilatère",
  quadrilatere_lien_proprietes:
    "Faire le lien entre propriétés et nature",
  quadrilatere_distinguer:
    "Distinguer carré, rectangle, losange et quadrilatère quelconque",
  quadrilatere_conclusion:
    "Décider si les informations suffisent pour conclure",
  quadrilatere_defis: "Défis sur les quadrilatères",

  mental_addition: "Calculer rapidement une addition",
  mental_subtraction: "Calculer rapidement une soustraction",
  mental_multiplication: "Calculer rapidement une multiplication",
  mental_division: "Calculer rapidement une division",
  mental_strategies: "Utiliser une stratégie de calcul mental",
  mental_defis: "Défis de calcul mental",
};

export const NOTION_LABELS: Record<string, string> = {
  decimaux: "Nombres décimaux",
  fractions: "Fractions",
  proportionnalite: "Proportionnalité",
  perimetre: "Périmètre",
  aires: "Aires",
  angles: "Angles",
  triangles: "Triangles",
  quadrilateres: "Quadrilatères",
  calcul_mental: "Calcul mental",
};

export function microLabel(microId?: string) {
  if (!microId) return "Compétence en cours";
  return MICRO_LABELS[microId] ?? "Compétence en cours";
}

export function notionLabel(notionId?: string) {
  if (!notionId) return "Notion";
  return NOTION_LABELS[notionId] ?? notionId;
}