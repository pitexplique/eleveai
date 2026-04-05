// catalog.ts

/* =========================================================
   NOTIONS
========================================================= */

export const NOTION_OPTIONS = [
  { id: "nombres_entiers", label: "Nombres entiers" },
  { id: "decimaux", label: "Nombres décimaux" },
  { id: "fractions", label: "Fractions" },
  { id: "pourcentages", label: "Pourcentages" },
  { id: "proportionnalite", label: "Proportionnalité" },

  { id: "calcul_pose", label: "Calcul posé" },
  { id: "calcul_mental", label: "Calcul mental" },

  { id: "longueurs", label: "Longueurs" },
  { id: "perimetres", label: "Périmètres" },
  { id: "aires", label: "Aires" },
  { id: "volumes", label: "Volumes" },

  { id: "angles", label: "Angles" },
  { id: "triangles", label: "Triangles" },
  { id: "quadrilateres", label: "Quadrilatères" },
  { id: "symetrie", label: "Symétrie axiale" },

  { id: "donnees", label: "Données" },
  { id: "probabilites", label: "Probabilités" },
] as const;

/* =========================================================
   MAP NOTION → MICRO COMPÉTENCES
========================================================= */

export const NOTION_MICRO_MAP: Record<string, string[]> = {

  nombres_entiers: [
    "entier_lire_ecrire",
    "entier_rang",
    "entier_compare",
    "entier_decomposer",
    "entier_encadrer",
    "entier_defis",
  ],

  decimaux: [
    "decimal_lire_ecrire",
    "decimal_rang",
    "decimal_compare",
    "decimal_add",
    "decimal_multiply",
    "decimal_divide_by_integer",
    "decimal_defis",
  ],

  fractions: [
    "fraction_lire_ecrire",
    "fraction_representer",
    "fraction_quantite",
    "fraction_decimal",
    "fraction_compare",
    "fraction_defis",
  ],

  pourcentages: [
    "pourcentage_comprendre",
    "pourcentage_fraction",
    "pourcentage_decimal",
    "pourcentage_lire",
    "pourcentage_calcul_simple",
    "pourcentage_defis",
  ],

  proportionnalite: [
    "prop_reconnaitre",
    "prop_table",
    "prop_coeff",
    "prop_unit",
    "prop_direct",
    "prop_defis",
  ],

  calcul_pose: [
    "pose_addition",
    "pose_soustraction",
    "pose_multiplication",
    "pose_division",
    "pose_verifier",
    "pose_defis",
  ],

  calcul_mental: [
    "mental_addition",
    "mental_subtraction",
    "mental_multiplication",
    "mental_division",
    "mental_strategies",
    "mental_defis",
  ],

  longueurs: [
    "longueur_mesurer",
    "longueur_unites",
    "longueur_convertir",
    "longueur_comparer",
    "longueur_probleme",
    "longueur_defis",
  ],

  perimetres: [
    "perim_comprendre",
    "perim_square",
    "perim_rectangle",
    "perim_figure",
    "perim_probleme",
    "perim_defis",
  ],

  aires: [
    "area_comprendre",
    "area_rectangle",
    "area_square",
    "area_compter",
    "area_comparer",
    "area_defis",
  ],

  volumes: [
    "volume_unite",
    "volume_compter",
    "volume_comparer",
    "volume_assemblage",
    "volume_lire",
    "volume_defis",
  ],

  angles: [
    "angle_reconnaitre",
    "angle_right",
    "angle_compare",
    "angle_mesurer",
    "angle_tracer",
    "angle_defis",
  ],

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
    "quadrilatere_nommer_vocabulaire",
    "quadrilatere_identifier_nature",
    "quadrilatere_lire_proprietes",
    "quadrilatere_lien_proprietes",
    "quadrilatere_distinguer",
    "quadrilatere_conclusion",
    "quadrilatere_completer_construire",
    "quadrilatere_defis",
  ],

  symetrie: [
    "sym_reconnaitre",
    "sym_point",
    "sym_figure",
    "sym_proprietes",
    "sym_axes",
    "sym_defis",
  ],

  donnees: [
    "data_lire_tableau",
    "data_lire_graphique",
    "data_prelever",
    "data_comparer",
    "data_interpreter",
    "data_defis",
  ],

  probabilites: [
    "proba_vocabulaire",
    "proba_comparer",
    "proba_issue",
    "proba_estimer",
    "proba_lire",
    "proba_defis",
  ],
};

/* =========================================================
   LABELS NOTIONS
========================================================= */

export const NOTION_LABELS: Record<string, string> = Object.fromEntries(
  NOTION_OPTIONS.map((n) => [n.id, n.label])
);

export function notionLabel(notionId?: string) {
  if (!notionId) return "Notion";
  return NOTION_LABELS[notionId] ?? notionId;
}

/* =========================================================
   LABELS MICRO COMPÉTENCES
========================================================= */

export const MICRO_LABELS: Record<string, string> = {
  entier_lire_ecrire: "Lire et écrire un nombre entier",
  entier_rang: "Identifier le rang d’un chiffre",
  entier_compare: "Comparer des nombres entiers",
  entier_decomposer: "Décomposer un nombre entier",
  entier_encadrer: "Encadrer un nombre entier",
  entier_defis: "Défis sur les nombres entiers",

  decimal_lire_ecrire: "Lire et écrire un nombre décimal",
  decimal_rang: "Identifier le rang d’un chiffre décimal",
  decimal_compare: "Comparer des nombres décimaux",
  decimal_add: "Additionner des nombres décimaux",
  decimal_multiply: "Multiplier des nombres décimaux",
  decimal_divide_by_integer: "Diviser un nombre décimal par un entier",
  decimal_defis: "Défis sur les nombres décimaux",

  fraction_lire_ecrire: "Lire et écrire une fraction",
  fraction_representer: "Représenter une fraction",
  fraction_quantite: "Comprendre une fraction comme quantité",
  fraction_decimal: "Relier fraction et décimal",
  fraction_compare: "Comparer des fractions",
  fraction_defis: "Défis sur les fractions",

  pourcentage_comprendre: "Comprendre un pourcentage",
  pourcentage_fraction: "Relier pourcentage et fraction",
  pourcentage_decimal: "Relier pourcentage et décimal",
  pourcentage_lire: "Lire un pourcentage",
  pourcentage_calcul_simple: "Calculer un pourcentage simple",
  pourcentage_defis: "Défis sur les pourcentages",

  prop_reconnaitre: "Reconnaître une situation de proportionnalité",
  prop_table: "Compléter un tableau de proportionnalité",
  prop_coeff: "Utiliser un coefficient",
  prop_unit: "Passer par l’unité",
  prop_direct: "Résoudre une situation",
  prop_defis: "Défis de proportionnalité",

  pose_addition: "Poser une addition",
  pose_soustraction: "Poser une soustraction",
  pose_multiplication: "Poser une multiplication",
  pose_division: "Poser une division",
  pose_verifier: "Vérifier un calcul",
  pose_defis: "Défis de calcul posé",

  mental_addition: "Calcul mental : addition",
  mental_subtraction: "Calcul mental : soustraction",
  mental_multiplication: "Calcul mental : multiplication",
  mental_division: "Calcul mental : division",
  mental_strategies: "Stratégies de calcul mental",
  mental_defis: "Défis de calcul mental",

  longueur_mesurer: "Mesurer une longueur",
  longueur_unites: "Connaître les unités",
  longueur_convertir: "Convertir des longueurs",
  longueur_comparer: "Comparer des longueurs",
  longueur_probleme: "Résoudre un problème",
  longueur_defis: "Défis de longueurs",

  perim_comprendre: "Comprendre le périmètre",
  perim_square: "Périmètre du carré",
  perim_rectangle: "Périmètre du rectangle",
  perim_figure: "Périmètre d’une figure",
  perim_probleme: "Problème de périmètre",
  perim_defis: "Défis de périmètre",

  area_comprendre: "Comprendre l’aire",
  area_rectangle: "Aire du rectangle",
  area_square: "Aire du carré",
  area_compter: "Aire par comptage",
  area_comparer: "Comparer des aires",
  area_defis: "Défis sur les aires",

  volume_unite: "Unité de volume",
  volume_compter: "Compter des volumes",
  volume_comparer: "Comparer des volumes",
  volume_assemblage: "Assemblage de volumes",
  volume_lire: "Lire un volume",
  volume_defis: "Défis sur les volumes",

  angle_reconnaitre: "Reconnaître un angle",
  angle_right: "Angle droit",
  angle_compare: "Comparer des angles",
  angle_mesurer: "Mesurer un angle",
  angle_tracer: "Tracer un angle",
  angle_defis: "Défis sur les angles",

  triangle_name: "Nommer un triangle",
  triangle_vertices_sides: "Sommets et côtés",
  triangle_type_sides: "Type selon les côtés",
  triangle_type_angles: "Type selon les angles",
  triangle_angle_sum: "Somme des angles",
  triangle_missing_angle: "Angle manquant",
  triangle_possible_or_not: "Triangle possible ou non",
  triangle_defis: "Défis triangles",

  quadrilatere_nommer_vocabulaire: "Nommer un quadrilatère",
  quadrilatere_identifier_nature: "Identifier la nature",
  quadrilatere_lire_proprietes: "Lire les propriétés",
  quadrilatere_lien_proprietes: "Lien propriétés/nature",
  quadrilatere_distinguer: "Distinguer les quadrilatères",
  quadrilatere_conclusion: "Conclure",
  quadrilatere_completer_construire: "Construire",
  quadrilatere_defis: "Défis quadrilatères",

  sym_reconnaitre: "Reconnaître une symétrie",
  sym_point: "Image d’un point",
  sym_figure: "Image d’une figure",
  sym_proprietes: "Propriétés",
  sym_axes: "Axes de symétrie",
  sym_defis: "Défis symétrie",

  data_lire_tableau: "Lire un tableau",
  data_lire_graphique: "Lire un graphique",
  data_prelever: "Prélever une info",
  data_comparer: "Comparer",
  data_interpreter: "Interpréter",
  data_defis: "Défis données",

  proba_vocabulaire: "Vocabulaire",
  proba_comparer: "Comparer des probabilités",
  proba_issue: "Issues possibles",
  proba_estimer: "Estimer une probabilité",
  proba_lire: "Lire une situation",
  proba_defis: "Défis probabilités",
};

/* =========================================================
   HELPER MICRO LABEL
========================================================= */

export function microLabel(microId?: string) {
  if (!microId) return "Compétence";
  return MICRO_LABELS[microId] ?? microId;
}