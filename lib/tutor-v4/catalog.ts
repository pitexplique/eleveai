// lib/tutor-v4/catalog.ts

export const NOTION_OPTIONS = [
  "entiers",
  "decimaux",
  "fractions",
  "pourcentages",
  "proportionnalite",
  "calcul_pose",
  "calcul_mental",
  "longueurs",
  "perimetres",
  "aires",
  "volumes",
  "angles",
  "triangles",
  "quadrilateres",
  "symetrie",
  "donnees",
  "probabilites",
] as const;

export type NotionId = (typeof NOTION_OPTIONS)[number];

export const NOTION_MICRO_MAP: Record<NotionId, string[]> = {
  entiers: [
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
    "decimal_comparer",
    "decimal_additionner",
    "decimal_multiplier",
    "decimal_diviser_par_entier",
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
    "angle_droit",
    "angle_compare",
    "angle_mesurer",
    "angle_tracer",
    "angle_defis",
  ],

  triangles: [
    "triangle_nommer",
    "triangle_sommets_cotes",
    "triangle_type_cotes",
    "triangle_type_angles",
    "triangle_somme_angles",
    "triangle_angle_manquant",
    "triangle_possible_ou_non",
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

const NOTION_LABELS: Record<NotionId, string> = {
  entiers: "Nombres entiers",
  decimaux: "Nombres décimaux",
  fractions: "Fractions",
  pourcentages: "Pourcentages",
  proportionnalite: "Proportionnalité",
  calcul_pose: "Calcul posé",
  calcul_mental: "Calcul mental",
  longueurs: "Longueurs",
  perimetres: "Périmètres",
  aires: "Aires",
  volumes: "Volumes",
  angles: "Angles",
  triangles: "Triangles",
  quadrilateres: "Quadrilatères",
  symetrie: "Symétrie",
  donnees: "Données",
  probabilites: "Probabilités",
};

export const MICRO_LABELS: Record<string, string> = {
  // ENTIER
  entier_lire_ecrire: "Lire et écrire des entiers",
  entier_rang: "Rang des chiffres",
  entier_compare: "Comparer des entiers",
  entier_decomposer: "Décomposer un entier",
  entier_encadrer: "Encadrer un entier",
  entier_defis: "Défis entiers",

  // DECIMAUX
  decimal_lire_ecrire: "Lire et écrire des décimaux",
  decimal_rang: "Rang des chiffres",
  decimal_comparer: "Comparer des décimaux",
  decimal_additionner: "Additionner des décimaux",
  decimal_multiplier: "Multiplier des décimaux",
  decimal_diviser_par_entier: "Diviser un décimal",
  decimal_defis: "Défis décimaux",

  // FRACTIONS
  fraction_lire_ecrire: "Lire des fractions",
  fraction_representer: "Représenter une fraction",
  fraction_quantite: "Fraction d’une quantité",
  fraction_decimal: "Fraction → décimal",
  fraction_compare: "Comparer des fractions",
  fraction_defis: "Défis fractions",

  // POURCENTAGES
  pourcentage_comprendre: "Comprendre %",
  pourcentage_fraction: "% → fraction",
  pourcentage_decimal: "% → décimal",
  pourcentage_lire: "Lire %",
  pourcentage_calcul_simple: "Calcul %",
  pourcentage_defis: "Défis %",

  // PROPORTIONNALITE
  prop_reconnaitre: "Reconnaître",
  prop_table: "Tableau",
  prop_coeff: "Coefficient",
  prop_unit: "Passage à l’unité",
  prop_direct: "Résoudre",
  prop_defis: "Défis",

  // CALCUL POSE
  pose_addition: "Addition posée",
  pose_soustraction: "Soustraction posée",
  pose_multiplication: "Multiplication posée",
  pose_division: "Division posée",
  pose_verifier: "Vérifier",
  pose_defis: "Défis",

  // CALCUL MENTAL
  mental_addition: "Addition",
  mental_subtraction: "Soustraction",
  mental_multiplication: "Multiplication",
  mental_division: "Division",
  mental_strategies: "Stratégies",
  mental_defis: "Défis",

  // LONGUEURS
  longueur_mesurer: "Mesurer",
  longueur_unites: "Unités",
  longueur_convertir: "Convertir",
  longueur_comparer: "Comparer",
  longueur_probleme: "Problème",
  longueur_defis: "Défis",

  // PERIMETRES
  perim_comprendre: "Comprendre",
  perim_square: "Carré",
  perim_rectangle: "Rectangle",
  perim_figure: "Figure",
  perim_probleme: "Problème",
  perim_defis: "Défis",

  // AIRES
  area_comprendre: "Comprendre",
  area_rectangle: "Rectangle",
  area_square: "Carré",
  area_compter: "Compter",
  area_comparer: "Comparer",
  area_defis: "Défis",

  // VOLUMES
  volume_unite: "Unités",
  volume_compter: "Compter",
  volume_comparer: "Comparer",
  volume_assemblage: "Assemblage",
  volume_lire: "Lire",
  volume_defis: "Défis",

  // ANGLES
  angle_reconnaitre: "Reconnaître",
  angle_droit: "Angle droit",
  angle_compare: "Comparer",
  angle_mesurer: "Mesurer",
  angle_tracer: "Tracer",
  angle_defis: "Défis",

  // TRIANGLES
  triangle_nommer: "Nommer",
  triangle_sommets_cotes: "Sommets / côtés",
  triangle_type_cotes: "Type (côtés)",
  triangle_type_angles: "Type (angles)",
  triangle_somme_angles: "Somme angles",
  triangle_angle_manquant: "Angle manquant",
  triangle_possible_ou_non: "Possible ?",
  triangle_defis: "Défis",

  // QUADRILATERES
  quadrilatere_nommer_vocabulaire: "Nommer",
  quadrilatere_identifier_nature: "Identifier",
  quadrilatere_lire_proprietes: "Propriétés",
  quadrilatere_lien_proprietes: "Lien",
  quadrilatere_distinguer: "Distinguer",
  quadrilatere_conclusion: "Conclusion",
  quadrilatere_completer_construire: "Construire",
  quadrilatere_defis: "Défis",

  // SYMETRIE
  sym_reconnaitre: "Reconnaître",
  sym_point: "Point",
  sym_figure: "Figure",
  sym_proprietes: "Propriétés",
  sym_axes: "Axes",
  sym_defis: "Défis",

  // DONNEES
  data_lire_tableau: "Tableau",
  data_lire_graphique: "Graphique",
  data_prelever: "Prélever",
  data_comparer: "Comparer",
  data_interpreter: "Interpréter",
  data_defis: "Défis",

  // PROBA
  proba_vocabulaire: "Vocabulaire",
  proba_comparer: "Comparer",
  proba_issue: "Issue",
  proba_estimer: "Estimer",
  proba_lire: "Lire",
  proba_defis: "Défis",
};

export function notionLabel(notionId: string) {
  return NOTION_LABELS[notionId as NotionId] ?? notionId;
}

export function microLabel(microId: string) {
  return MICRO_LABELS[microId] ?? microId;
}