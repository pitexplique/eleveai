// microSkills6e.ts
import type { KnowledgeMicroSkill } from "@/lib/tutor-v4/types";

export const microSkills6e: KnowledgeMicroSkill[] = [
  /* =========================
     NOMBRES ENTIERS
  ========================= */
  {
    id: "entier_lire_ecrire",
    label: "Lire et écrire un nombre entier",
    notionId: "nombres_entiers",
    boId: "BO6N1",
    prerequis: [],
  },
  {
    id: "entier_rang",
    label: "Identifier le rang d’un chiffre",
    notionId: "nombres_entiers",
    boId: "BO6N1",
    prerequis: ["entier_lire_ecrire"],
  },
  {
    id: "entier_compare",
    label: "Comparer des nombres entiers",
    notionId: "nombres_entiers",
    boId: "BO6N1",
    prerequis: ["entier_lire_ecrire"],
  },
  {
    id: "entier_decomposer",
    label: "Décomposer un nombre entier",
    notionId: "nombres_entiers",
    boId: "BO6N1",
    prerequis: ["entier_rang"],
  },
  {
    id: "entier_encadrer",
    label: "Encadrer un nombre entier",
    notionId: "nombres_entiers",
    boId: "BO6N1",
    prerequis: ["entier_compare"],
  },
  {
    id: "entier_defis",
    label: "Défis sur les nombres entiers",
    notionId: "nombres_entiers",
    boId: "BO6N1",
    prerequis: ["entier_compare"],
  },

  /* =========================
     DECIMAUX
  ========================= */
  {
    id: "decimal_lire_ecrire",
    label: "Lire et écrire un nombre décimal",
    notionId: "decimaux",
    boId: "BO6N1",
    prerequis: ["entier_lire_ecrire"],
  },
  {
    id: "decimal_rang",
    label: "Identifier le rang d’un chiffre décimal",
    notionId: "decimaux",
    boId: "BO6N1",
    prerequis: ["decimal_lire_ecrire"],
  },
  {
    id: "decimal_compare",
    label: "Comparer des nombres décimaux",
    notionId: "decimaux",
    boId: "BO6N1",
    prerequis: ["decimal_rang"],
  },
  {
    id: "decimal_add",
    label: "Additionner des nombres décimaux",
    notionId: "decimaux",
    boId: "BO6N1",
    prerequis: ["decimal_lire_ecrire"],
  },
  {
    id: "decimal_multiply",
    label: "Multiplier des nombres décimaux",
    notionId: "decimaux",
    boId: "BO6N1",
    prerequis: ["decimal_add"],
  },
  {
    id: "decimal_divide_by_integer",
    label: "Diviser un nombre décimal par un entier",
    notionId: "decimaux",
    boId: "BO6N1",
    prerequis: ["decimal_lire_ecrire"],
  },
  {
    id: "decimal_defis",
    label: "Défis sur les nombres décimaux",
    notionId: "decimaux",
    boId: "BO6N1",
    prerequis: ["decimal_compare"],
  },

  /* =========================
     FRACTIONS
  ========================= */
  {
    id: "fraction_lire_ecrire",
    label: "Lire et écrire une fraction",
    notionId: "fractions",
    boId: "BO6N2",
    prerequis: ["decimal_lire_ecrire"],
  },
  {
    id: "fraction_representer",
    label: "Représenter une fraction",
    notionId: "fractions",
    boId: "BO6N2",
    prerequis: ["fraction_lire_ecrire"],
  },
  {
    id: "fraction_quantite",
    label: "Comprendre une fraction comme quantité",
    notionId: "fractions",
    boId: "BO6N2",
    prerequis: ["fraction_representer"],
  },
  {
    id: "fraction_decimal",
    label: "Relier fraction et décimal",
    notionId: "fractions",
    boId: "BO6N2",
    prerequis: ["fraction_quantite", "decimal_lire_ecrire"],
  },
  {
    id: "fraction_compare",
    label: "Comparer des fractions",
    notionId: "fractions",
    boId: "BO6N2",
    prerequis: ["fraction_lire_ecrire"],
  },
  {
    id: "fraction_defis",
    label: "Défis sur les fractions",
    notionId: "fractions",
    boId: "BO6N2",
    prerequis: ["fraction_compare"],
  },

  /* =========================
     POURCENTAGES
  ========================= */
  {
    id: "pourcentage_comprendre",
    label: "Comprendre un pourcentage",
    notionId: "pourcentages",
    boId: "BO6N2",
    prerequis: ["fraction_quantite"],
  },
  {
    id: "pourcentage_fraction",
    label: "Relier pourcentage et fraction",
    notionId: "pourcentages",
    boId: "BO6N2",
    prerequis: ["pourcentage_comprendre"],
  },
  {
    id: "pourcentage_decimal",
    label: "Relier pourcentage et décimal",
    notionId: "pourcentages",
    boId: "BO6N2",
    prerequis: ["pourcentage_fraction", "fraction_decimal"],
  },
  {
    id: "pourcentage_lire",
    label: "Lire un pourcentage",
    notionId: "pourcentages",
    boId: "BO6N2",
    prerequis: ["pourcentage_comprendre"],
  },
  {
    id: "pourcentage_calcul_simple",
    label: "Calculer un pourcentage simple",
    notionId: "pourcentages",
    boId: "BO6N2",
    prerequis: ["pourcentage_decimal"],
  },
  {
    id: "pourcentage_defis",
    label: "Défis sur les pourcentages",
    notionId: "pourcentages",
    boId: "BO6N2",
    prerequis: ["pourcentage_calcul_simple"],
  },

  /* =========================
     PROPORTIONNALITE
  ========================= */
  {
    id: "prop_reconnaitre",
    label: "Reconnaître une situation de proportionnalité",
    notionId: "proportionnalite",
    boId: "BO6N3",
    prerequis: ["pourcentage_comprendre"],
  },
  {
    id: "prop_table",
    label: "Compléter un tableau de proportionnalité",
    notionId: "proportionnalite",
    boId: "BO6N3",
    prerequis: ["prop_reconnaitre"],
  },
  {
    id: "prop_coeff",
    label: "Utiliser un coefficient",
    notionId: "proportionnalite",
    boId: "BO6N3",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_unit",
    label: "Passer par l’unité",
    notionId: "proportionnalite",
    boId: "BO6N3",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_direct",
    label: "Résoudre une situation",
    notionId: "proportionnalite",
    boId: "BO6N3",
    prerequis: ["prop_coeff", "prop_unit"],
  },
  {
    id: "prop_defis",
    label: "Défis de proportionnalité",
    notionId: "proportionnalite",
    boId: "BO6N3",
    prerequis: ["prop_direct"],
  },

  /* =========================
     CALCUL POSE
  ========================= */
  {
    id: "pose_addition",
    label: "Poser une addition",
    notionId: "calcul_pose",
    boId: "BO6N4",
    prerequis: ["entier_lire_ecrire"],
  },
  {
    id: "pose_soustraction",
    label: "Poser une soustraction",
    notionId: "calcul_pose",
    boId: "BO6N4",
    prerequis: ["pose_addition"],
  },
  {
    id: "pose_multiplication",
    label: "Poser une multiplication",
    notionId: "calcul_pose",
    boId: "BO6N4",
    prerequis: ["pose_addition"],
  },
  {
    id: "pose_division",
    label: "Poser une division",
    notionId: "calcul_pose",
    boId: "BO6N4",
    prerequis: ["pose_multiplication"],
  },
  {
    id: "pose_verifier",
    label: "Vérifier un calcul",
    notionId: "calcul_pose",
    boId: "BO6N4",
    prerequis: [
      "pose_addition",
      "pose_soustraction",
      "pose_multiplication",
      "pose_division",
    ],
  },
  {
    id: "pose_defis",
    label: "Défis de calcul posé",
    notionId: "calcul_pose",
    boId: "BO6N4",
    prerequis: ["pose_verifier"],
  },

  /* =========================
     CALCUL MENTAL
  ========================= */
  {
    id: "mental_addition",
    label: "Addition mentale",
    notionId: "calcul_mental",
    boId: "BO6N4",
    prerequis: [],
  },
  {
    id: "mental_subtraction",
    label: "Soustraction mentale",
    notionId: "calcul_mental",
    boId: "BO6N4",
    prerequis: ["mental_addition"],
  },
  {
    id: "mental_multiplication",
    label: "Multiplication mentale",
    notionId: "calcul_mental",
    boId: "BO6N4",
    prerequis: ["mental_addition"],
  },
  {
    id: "mental_division",
    label: "Division mentale",
    notionId: "calcul_mental",
    boId: "BO6N4",
    prerequis: ["mental_multiplication"],
  },
  {
    id: "mental_strategies",
    label: "Stratégies de calcul mental",
    notionId: "calcul_mental",
    boId: "BO6N4",
    prerequis: [
      "mental_addition",
      "mental_subtraction",
      "mental_multiplication",
      "mental_division",
    ],
  },
  {
    id: "mental_defis",
    label: "Défis de calcul mental",
    notionId: "calcul_mental",
    boId: "BO6N4",
    prerequis: ["mental_strategies"],
  },

  /* =========================
     LONGUEURS
  ========================= */
  {
    id: "longueur_mesurer",
    label: "Mesurer une longueur",
    notionId: "longueurs",
    boId: "BO6G1",
    prerequis: [],
  },
  {
    id: "longueur_unites",
    label: "Connaître les unités de longueur",
    notionId: "longueurs",
    boId: "BO6G1",
    prerequis: ["longueur_mesurer"],
  },
  {
    id: "longueur_convertir",
    label: "Convertir des longueurs",
    notionId: "longueurs",
    boId: "BO6G1",
    prerequis: ["longueur_unites"],
  },
  {
    id: "longueur_comparer",
    label: "Comparer des longueurs",
    notionId: "longueurs",
    boId: "BO6G1",
    prerequis: ["longueur_mesurer"],
  },
  {
    id: "longueur_probleme",
    label: "Résoudre un problème de longueurs",
    notionId: "longueurs",
    boId: "BO6G1",
    prerequis: ["longueur_convertir", "longueur_comparer"],
  },
  {
    id: "longueur_defis",
    label: "Défis de longueurs",
    notionId: "longueurs",
    boId: "BO6G1",
    prerequis: ["longueur_probleme"],
  },

  /* =========================
     PERIMETRES
  ========================= */
  {
    id: "perim_comprendre",
    label: "Comprendre le périmètre",
    notionId: "perimetres",
    boId: "BO6G1",
    prerequis: ["longueur_mesurer"],
  },
  {
    id: "perim_square",
    label: "Calculer le périmètre d’un carré",
    notionId: "perimetres",
    boId: "BO6G1",
    prerequis: ["perim_comprendre"],
  },
  {
    id: "perim_rectangle",
    label: "Calculer le périmètre d’un rectangle",
    notionId: "perimetres",
    boId: "BO6G1",
    prerequis: ["perim_comprendre"],
  },
  {
    id: "perim_figure",
    label: "Calculer le périmètre d’une figure",
    notionId: "perimetres",
    boId: "BO6G1",
    prerequis: ["perim_square", "perim_rectangle"],
  },
  {
    id: "perim_probleme",
    label: "Résoudre un problème de périmètre",
    notionId: "perimetres",
    boId: "BO6G1",
    prerequis: ["perim_figure"],
  },
  {
    id: "perim_defis",
    label: "Défis de périmètre",
    notionId: "perimetres",
    boId: "BO6G1",
    prerequis: ["perim_probleme"],
  },

  /* =========================
     AIRES
  ========================= */
  {
    id: "area_comprendre",
    label: "Comprendre l’aire",
    notionId: "aires",
    boId: "BO6G1",
    prerequis: ["perim_comprendre"],
  },
  {
    id: "area_rectangle",
    label: "Calculer l’aire d’un rectangle",
    notionId: "aires",
    boId: "BO6G1",
    prerequis: ["area_compter", "perim_rectangle"],
  },
  {
    id: "area_square",
    label: "Calculer l’aire d’un carré",
    notionId: "aires",
    boId: "BO6G1",
    prerequis: ["area_compter", "perim_square"],
  },
  {
    id: "area_compter",
    label: "Calculer une aire par comptage",
    notionId: "aires",
    boId: "BO6G1",
    prerequis: ["area_comprendre"],
  },
  {
    id: "area_comparer",
    label: "Comparer des aires",
    notionId: "aires",
    boId: "BO6G1",
    prerequis: ["area_rectangle", "area_square"],
  },
  {
    id: "area_defis",
    label: "Défis sur les aires",
    notionId: "aires",
    boId: "BO6G1",
    prerequis: ["area_comparer"],
  },

  /* =========================
     VOLUMES
  ========================= */
  {
    id: "volume_unite",
    label: "Comprendre l’unité de volume",
    notionId: "volumes",
    boId: "BO6G1",
    prerequis: ["area_comprendre"],
  },
  {
    id: "volume_compter",
    label: "Compter des volumes",
    notionId: "volumes",
    boId: "BO6G1",
    prerequis: ["volume_unite", "area_compter"],
  },
  {
    id: "volume_comparer",
    label: "Comparer des volumes",
    notionId: "volumes",
    boId: "BO6G1",
    prerequis: ["volume_compter"],
  },
  {
    id: "volume_assemblage",
    label: "Assembler des volumes",
    notionId: "volumes",
    boId: "BO6G1",
    prerequis: ["volume_compter"],
  },
  {
    id: "volume_lire",
    label: "Lire un volume",
    notionId: "volumes",
    boId: "BO6G1",
    prerequis: ["volume_compter"],
  },
  {
    id: "volume_defis",
    label: "Défis sur les volumes",
    notionId: "volumes",
    boId: "BO6G1",
    prerequis: ["volume_lire"],
  },

  /* =========================
     ANGLES
  ========================= */
  {
    id: "angle_reconnaitre",
    label: "Reconnaître un angle",
    notionId: "angles",
    boId: "BO6G2",
    prerequis: [],
  },
  {
    id: "angle_right",
    label: "Reconnaître un angle droit",
    notionId: "angles",
    boId: "BO6G2",
    prerequis: ["angle_reconnaitre"],
  },
  {
    id: "angle_compare",
    label: "Comparer des angles",
    notionId: "angles",
    boId: "BO6G2",
    prerequis: ["angle_right"],
  },
  {
    id: "angle_mesurer",
    label: "Mesurer un angle",
    notionId: "angles",
    boId: "BO6G2",
    prerequis: ["angle_reconnaitre"],
  },
  {
    id: "angle_tracer",
    label: "Tracer un angle",
    notionId: "angles",
    boId: "BO6G2",
    prerequis: ["angle_mesurer"],
  },
  {
    id: "angle_defis",
    label: "Défis sur les angles",
    notionId: "angles",
    boId: "BO6G2",
    prerequis: ["angle_tracer"],
  },

  /* =========================
     TRIANGLES
  ========================= */
  {
    id: "triangle_name",
    label: "Nommer un triangle",
    notionId: "triangles",
    boId: "BO6G3",
    prerequis: [],
  },
  {
    id: "triangle_vertices_sides",
    label: "Identifier sommets et côtés",
    notionId: "triangles",
    boId: "BO6G3",
    prerequis: ["triangle_name"],
  },
  {
    id: "triangle_type_sides",
    label: "Reconnaître un triangle selon ses côtés",
    notionId: "triangles",
    boId: "BO6G3",
    prerequis: ["triangle_vertices_sides"],
  },
  {
    id: "triangle_type_angles",
    label: "Reconnaître un triangle selon ses angles",
    notionId: "triangles",
    boId: "BO6G3",
    prerequis: ["angle_right", "angle_compare"],
  },
  {
    id: "triangle_angle_sum",
    label: "Utiliser la somme des angles d’un triangle",
    notionId: "triangles",
    boId: "BO6G3",
    prerequis: ["triangle_type_angles"],
  },
  {
    id: "triangle_missing_angle",
    label: "Déterminer un angle manquant",
    notionId: "triangles",
    boId: "BO6G3",
    prerequis: ["triangle_angle_sum"],
  },
  {
    id: "triangle_possible_or_not",
    label: "Déterminer si un triangle est possible",
    notionId: "triangles",
    boId: "BO6G3",
    prerequis: ["triangle_vertices_sides"],
  },
  {
    id: "triangle_defis",
    label: "Défis triangles",
    notionId: "triangles",
    boId: "BO6G3",
    prerequis: [
      "triangle_type_sides",
      "triangle_type_angles",
      "triangle_angle_sum",
      "triangle_missing_angle",
      "triangle_possible_or_not",
    ],
  },

  /* =========================
     QUADRILATERES
  ========================= */
  {
    id: "quadrilatere_nommer_vocabulaire",
    label: "Nommer un quadrilatère et son vocabulaire",
    notionId: "quadrilateres",
    boId: "BO6G4",
    prerequis: [],
  },
  {
    id: "quadrilatere_identifier_nature",
    label: "Identifier la nature d’un quadrilatère",
    notionId: "quadrilateres",
    boId: "BO6G4",
    prerequis: ["quadrilatere_nommer_vocabulaire"],
  },
  {
    id: "quadrilatere_lire_proprietes",
    label: "Lire les propriétés d’un quadrilatère",
    notionId: "quadrilateres",
    boId: "BO6G4",
    prerequis: [
      "angle_right",
      "angle_compare",
      "quadrilatere_nommer_vocabulaire",
    ],
  },
  {
    id: "quadrilatere_lien_proprietes",
    label: "Faire le lien entre propriétés et nature",
    notionId: "quadrilateres",
    boId: "BO6G4",
    prerequis: [
      "quadrilatere_identifier_nature",
      "quadrilatere_lire_proprietes",
    ],
  },
  {
    id: "quadrilatere_distinguer",
    label: "Distinguer les quadrilatères",
    notionId: "quadrilateres",
    boId: "BO6G4",
    prerequis: [
      "quadrilatere_identifier_nature",
      "quadrilatere_lien_proprietes",
    ],
  },
  {
    id: "quadrilatere_conclusion",
    label: "Conclure sur la nature d’un quadrilatère",
    notionId: "quadrilateres",
    boId: "BO6G4",
    prerequis: [
      "quadrilatere_lire_proprietes",
      "quadrilatere_lien_proprietes",
      "quadrilatere_distinguer",
    ],
  },
  {
    id: "quadrilatere_completer_construire",
    label: "Compléter ou construire un quadrilatère",
    notionId: "quadrilateres",
    boId: "BO6G4",
    prerequis: [
      "quadrilatere_nommer_vocabulaire",
      "quadrilatere_lire_proprietes",
      "quadrilatere_lien_proprietes",
    ],
  },
  {
    id: "quadrilatere_defis",
    label: "Défis quadrilatères",
    notionId: "quadrilateres",
    boId: "BO6G4",
    prerequis: [
      "quadrilatere_nommer_vocabulaire",
      "quadrilatere_identifier_nature",
      "quadrilatere_lire_proprietes",
      "quadrilatere_lien_proprietes",
      "quadrilatere_distinguer",
      "quadrilatere_conclusion",
      "quadrilatere_completer_construire",
    ],
  },

  /* =========================
     SYMETRIE
  ========================= */
  {
    id: "sym_reconnaitre",
    label: "Reconnaître une symétrie axiale",
    notionId: "symetrie",
    boId: "BO6G4",
    prerequis: [],
  },
  {
    id: "sym_point",
    label: "Construire l’image d’un point",
    notionId: "symetrie",
    boId: "BO6G4",
    prerequis: ["sym_reconnaitre"],
  },
  {
    id: "sym_figure",
    label: "Construire l’image d’une figure",
    notionId: "symetrie",
    boId: "BO6G4",
    prerequis: ["sym_point"],
  },
  {
    id: "sym_proprietes",
    label: "Utiliser les propriétés de la symétrie",
    notionId: "symetrie",
    boId: "BO6G4",
    prerequis: ["sym_figure"],
  },
  {
    id: "sym_axes",
    label: "Identifier des axes de symétrie",
    notionId: "symetrie",
    boId: "BO6G4",
    prerequis: ["sym_reconnaitre"],
  },
  {
    id: "sym_defis",
    label: "Défis symétrie",
    notionId: "symetrie",
    boId: "BO6G4",
    prerequis: [
      "sym_reconnaitre",
      "sym_point",
      "sym_figure",
      "sym_proprietes",
      "sym_axes",
    ],
  },

  /* =========================
     DONNEES
  ========================= */
  {
    id: "data_lire_tableau",
    label: "Lire un tableau",
    notionId: "donnees",
    boId: "BO6D1",
    prerequis: [],
  },
  {
    id: "data_lire_graphique",
    label: "Lire un graphique",
    notionId: "donnees",
    boId: "BO6D1",
    prerequis: ["data_lire_tableau"],
  },
  {
    id: "data_prelever",
    label: "Prélever une information",
    notionId: "donnees",
    boId: "BO6D1",
    prerequis: ["data_lire_tableau", "data_lire_graphique"],
  },
  {
    id: "data_comparer",
    label: "Comparer des données",
    notionId: "donnees",
    boId: "BO6D1",
    prerequis: ["data_prelever"],
  },
  {
    id: "data_interpreter",
    label: "Interpréter des données",
    notionId: "donnees",
    boId: "BO6D1",
    prerequis: ["data_prelever", "data_comparer"],
  },
  {
    id: "data_defis",
    label: "Défis données",
    notionId: "donnees",
    boId: "BO6D1",
    prerequis: [
      "data_lire_tableau",
      "data_lire_graphique",
      "data_prelever",
      "data_comparer",
      "data_interpreter",
    ],
  },

  /* =========================
     PROBABILITES
  ========================= */
  {
    id: "proba_vocabulaire",
    label: "Connaître le vocabulaire des probabilités",
    notionId: "probabilites",
    boId: "BO6P1",
    prerequis: [],
  },
  {
    id: "proba_comparer",
    label: "Comparer des probabilités",
    notionId: "probabilites",
    boId: "BO6P1",
    prerequis: ["proba_vocabulaire"],
  },
  {
    id: "proba_issue",
    label: "Identifier les issues possibles",
    notionId: "probabilites",
    boId: "BO6P1",
    prerequis: ["proba_vocabulaire"],
  },
  {
    id: "proba_estimer",
    label: "Estimer une probabilité",
    notionId: "probabilites",
    boId: "BO6P1",
    prerequis: ["proba_comparer"],
  },
  {
    id: "proba_lire",
    label: "Lire une situation probabiliste",
    notionId: "probabilites",
    boId: "BO6P1",
    prerequis: ["proba_issue"],
  },
  {
    id: "proba_defis",
    label: "Défis probabilités",
    notionId: "probabilites",
    boId: "BO6P1",
    prerequis: [
      "proba_vocabulaire",
      "proba_comparer",
      "proba_issue",
      "proba_estimer",
      "proba_lire",
    ],
  },
];