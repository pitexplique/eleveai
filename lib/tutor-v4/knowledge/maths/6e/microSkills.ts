// knowledge/maths/6e/microSkills.ts

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  /* =========================
     NOMBRES ENTIERS
  ========================= */
  {
    id: "entier_lire_ecrire",
    label: "Lire et écrire un nombre entier",
    notionId: "nombres_entiers",
    prerequis: [],
  },
  {
    id: "entier_rang",
    label: "Identifier le rang d’un chiffre",
    notionId: "nombres_entiers",
    prerequis: ["entier_lire_ecrire"],
  },
  {
    id: "entier_compare",
    label: "Comparer des nombres entiers",
    notionId: "nombres_entiers",
    prerequis: ["entier_lire_ecrire"],
  },
  {
    id: "entier_decomposer",
    label: "Décomposer un nombre entier",
    notionId: "nombres_entiers",
    prerequis: ["entier_rang"],
  },
  {
    id: "entier_encadrer",
    label: "Encadrer un nombre entier",
    notionId: "nombres_entiers",
    prerequis: ["entier_compare"],
  },
  {
    id: "entier_defis",
    label: "Défis sur les nombres entiers",
    notionId: "nombres_entiers",
    prerequis: ["entier_compare"],
  },

  /* =========================
     DECIMAUX
  ========================= */
  {
    id: "decimal_lire_ecrire",
    label: "Lire et écrire un nombre décimal",
    notionId: "decimaux",
    prerequis: ["entier_lire_ecrire"],
  },
  {
    id: "decimal_rang",
    label: "Identifier le rang d’un chiffre décimal",
    notionId: "decimaux",
    prerequis: ["decimal_lire_ecrire"],
  },
  {
    id: "decimal_comparer",
    label: "Comparer des nombres décimaux",
    notionId: "decimaux",
    prerequis: ["decimal_rang"],
  },
  {
    id: "decimal_additionner",
    label: "Additionner des nombres décimaux",
    notionId: "decimaux",
    prerequis: ["decimal_lire_ecrire"],
  },
  {
    id: "decimal_multiplier",
    label: "Multiplier des nombres décimaux",
    notionId: "decimaux",
    prerequis: ["decimal_additionner"],
  },
  {
    id: "decimal_diviser_par_entier",
    label: "Diviser un nombre décimal par un entier",
    notionId: "decimaux",
    prerequis: ["decimal_lire_ecrire"],
  },
  {
    id: "decimal_defis",
    label: "Défis sur les nombres décimaux",
    notionId: "decimaux",
    prerequis: ["decimal_comparer"],
  },

  /* =========================
     FRACTIONS
  ========================= */
  {
    id: "fraction_lire_ecrire",
    label: "Lire et écrire une fraction",
    notionId: "fractions",
    prerequis: ["decimal_lire_ecrire"],
  },
  {
    id: "fraction_representer",
    label: "Représenter une fraction",
    notionId: "fractions",
    prerequis: ["fraction_lire_ecrire"],
  },
  {
    id: "fraction_quantite",
    label: "Comprendre une fraction comme quantité",
    notionId: "fractions",
    prerequis: ["fraction_representer"],
  },
  {
    id: "fraction_decimal",
    label: "Relier fraction et décimal",
    notionId: "fractions",
    prerequis: ["fraction_quantite", "decimal_lire_ecrire"],
  },
  {
    id: "fraction_compare",
    label: "Comparer des fractions",
    notionId: "fractions",
    prerequis: ["fraction_lire_ecrire"],
  },
  {
    id: "fraction_defis",
    label: "Défis sur les fractions",
    notionId: "fractions",
    prerequis: ["fraction_compare"],
  },

  /* =========================
     POURCENTAGES
  ========================= */
  {
    id: "pourcentage_comprendre",
    label: "Comprendre un pourcentage",
    notionId: "pourcentages",
    prerequis: ["fraction_quantite"],
  },
  {
    id: "pourcentage_fraction",
    label: "Relier pourcentage et fraction",
    notionId: "pourcentages",
    prerequis: ["pourcentage_comprendre"],
  },
  {
    id: "pourcentage_decimal",
    label: "Relier pourcentage et décimal",
    notionId: "pourcentages",
    prerequis: ["pourcentage_fraction", "fraction_decimal"],
  },
  {
    id: "pourcentage_lire",
    label: "Lire un pourcentage",
    notionId: "pourcentages",
    prerequis: ["pourcentage_comprendre"],
  },
  {
    id: "pourcentage_calcul_simple",
    label: "Calculer un pourcentage simple",
    notionId: "pourcentages",
    prerequis: ["pourcentage_decimal"],
  },
  {
    id: "pourcentage_defis",
    label: "Défis sur les pourcentages",
    notionId: "pourcentages",
    prerequis: ["pourcentage_calcul_simple"],
  },

  /* =========================
     PROPORTIONNALITE
  ========================= */
  {
    id: "prop_reconnaitre",
    label: "Reconnaître une situation de proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["pourcentage_comprendre"],
  },
  {
    id: "prop_table",
    label: "Compléter un tableau de proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["prop_reconnaitre"],
  },
  {
    id: "prop_coeff",
    label: "Utiliser un coefficient",
    notionId: "proportionnalite",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_unit",
    label: "Passer par l’unité",
    notionId: "proportionnalite",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_direct",
    label: "Résoudre une situation",
    notionId: "proportionnalite",
    prerequis: ["prop_coeff", "prop_unit"],
  },
  {
    id: "prop_defis",
    label: "Défis de proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["prop_direct"],
  },

  /* =========================
     CALCUL POSE
  ========================= */
  {
    id: "pose_addition",
    label: "Poser une addition",
    notionId: "calcul_pose",
    prerequis: ["entier_lire_ecrire"],
  },
  {
    id: "pose_soustraction",
    label: "Poser une soustraction",
    notionId: "calcul_pose",
    prerequis: ["pose_addition"],
  },
  {
    id: "pose_multiplication",
    label: "Poser une multiplication",
    notionId: "calcul_pose",
    prerequis: ["pose_addition"],
  },
  {
    id: "pose_division",
    label: "Poser une division",
    notionId: "calcul_pose",
    prerequis: ["pose_multiplication"],
  },
  {
    id: "pose_verifier",
    label: "Vérifier un calcul",
    notionId: "calcul_pose",
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
    prerequis: ["pose_verifier"],
  },

  /* =========================
     CALCUL MENTAL
  ========================= */
  {
    id: "mental_addition",
    label: "Addition mentale",
    notionId: "calcul_mental",
    prerequis: [],
  },
  {
    id: "mental_subtraction",
    label: "Soustraction mentale",
    notionId: "calcul_mental",
    prerequis: ["mental_addition"],
  },
  {
    id: "mental_multiplication",
    label: "Multiplication mentale",
    notionId: "calcul_mental",
    prerequis: ["mental_addition"],
  },
  {
    id: "mental_division",
    label: "Division mentale",
    notionId: "calcul_mental",
    prerequis: ["mental_multiplication"],
  },
  {
    id: "mental_strategies",
    label: "Stratégies de calcul mental",
    notionId: "calcul_mental",
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
    prerequis: ["mental_strategies"],
  },

  /* =========================
     LONGUEURS
  ========================= */
  {
    id: "longueur_mesurer",
    label: "Mesurer une longueur",
    notionId: "longueurs",
    prerequis: [],
  },
  {
    id: "longueur_unites",
    label: "Connaître les unités de longueur",
    notionId: "longueurs",
    prerequis: ["longueur_mesurer"],
  },
  {
    id: "longueur_convertir",
    label: "Convertir des longueurs",
    notionId: "longueurs",
    prerequis: ["longueur_unites"],
  },
  {
    id: "longueur_comparer",
    label: "Comparer des longueurs",
    notionId: "longueurs",
    prerequis: ["longueur_mesurer"],
  },
  {
    id: "longueur_probleme",
    label: "Résoudre un problème de longueurs",
    notionId: "longueurs",
    prerequis: ["longueur_convertir", "longueur_comparer"],
  },
  {
    id: "longueur_defis",
    label: "Défis de longueurs",
    notionId: "longueurs",
    prerequis: ["longueur_probleme"],
  },

  /* =========================
     PERIMETRES
  ========================= */
  {
    id: "perim_comprendre",
    label: "Comprendre le périmètre",
    notionId: "perimetres",
    prerequis: ["longueur_mesurer"],
  },
  {
    id: "perim_square",
    label: "Calculer le périmètre d’un carré",
    notionId: "perimetres",
    prerequis: ["perim_comprendre"],
  },
  {
    id: "perim_rectangle",
    label: "Calculer le périmètre d’un rectangle",
    notionId: "perimetres",
    prerequis: ["perim_comprendre"],
  },
  {
    id: "perim_figure",
    label: "Calculer le périmètre d’une figure",
    notionId: "perimetres",
    prerequis: ["perim_square", "perim_rectangle"],
  },
  {
    id: "perim_probleme",
    label: "Résoudre un problème de périmètre",
    notionId: "perimetres",
    prerequis: ["perim_figure"],
  },
  {
    id: "perim_defis",
    label: "Défis de périmètre",
    notionId: "perimetres",
    prerequis: ["perim_probleme"],
  },

  /* =========================
     AIRES
  ========================= */
  {
    id: "area_comprendre",
    label: "Comprendre l’aire",
    notionId: "aires",
    prerequis: ["perim_comprendre"],
  },
  {
    id: "area_compter",
    label: "Calculer une aire par comptage",
    notionId: "aires",
    prerequis: ["area_comprendre"],
  },
  {
    id: "area_rectangle",
    label: "Calculer l’aire d’un rectangle",
    notionId: "aires",
    prerequis: ["area_compter", "perim_rectangle"],
  },
  {
    id: "area_square",
    label: "Calculer l’aire d’un carré",
    notionId: "aires",
    prerequis: ["area_compter", "perim_square"],
  },
  {
    id: "area_comparer",
    label: "Comparer des aires",
    notionId: "aires",
    prerequis: ["area_rectangle", "area_square"],
  },
  {
    id: "area_decomposer",
    label: "Décomposer une figure pour calculer son aire",
    notionId: "aires",
    prerequis: ["area_rectangle", "area_square", "area_comparer"],
  },
  {
    id: "area_problemes",
    label: "Résoudre des problèmes d’aires",
    notionId: "aires",
    prerequis: [
      "area_rectangle",
      "area_square",
      "area_decomposer",
      "decimal_multiplier",
      "prop_reconnaitre",
    ],
  },
  {
    id: "area_defis",
    label: "Défis sur les aires",
    notionId: "aires",
    prerequis: ["area_comparer", "area_decomposer", "area_problemes"],
  },

  /* =========================
     VOLUMES
  ========================= */
  {
    id: "volume_unite",
    label: "Comprendre l’unité de volume",
    notionId: "volumes",
    prerequis: ["area_comprendre"],
  },
  {
    id: "volume_compter",
    label: "Compter des volumes",
    notionId: "volumes",
    prerequis: ["volume_unite", "area_compter"],
  },
  {
    id: "volume_comparer",
    label: "Comparer des volumes",
    notionId: "volumes",
    prerequis: ["volume_compter"],
  },
  {
    id: "volume_assemblage",
    label: "Assembler des volumes",
    notionId: "volumes",
    prerequis: ["volume_compter"],
  },
  {
    id: "volume_lire",
    label: "Lire un volume",
    notionId: "volumes",
    prerequis: ["volume_compter"],
  },
  {
    id: "volume_defis",
    label: "Défis sur les volumes",
    notionId: "volumes",
    prerequis: ["volume_lire"],
  },

  /* =========================
     ANGLES
  ========================= */
  {
    id: "angle_reconnaitre",
    label: "Reconnaître un angle",
    notionId: "angles",
    prerequis: [],
  },
  {
    id: "angle_droit",
    label: "Reconnaître un angle droit",
    notionId: "angles",
    prerequis: ["angle_reconnaitre"],
  },
  {
    id: "angle_compare",
    label: "Comparer des angles",
    notionId: "angles",
    prerequis: ["angle_droit"],
  },
  {
    id: "angle_mesurer",
    label: "Mesurer un angle",
    notionId: "angles",
    prerequis: ["angle_reconnaitre"],
  },
  {
    id: "angle_tracer",
    label: "Tracer un angle",
    notionId: "angles",
    prerequis: ["angle_mesurer"],
  },
  {
    id: "angle_defis",
    label: "Défis sur les angles",
    notionId: "angles",
    prerequis: ["angle_tracer"],
  },

  /* =========================
     TRIANGLES
  ========================= */
  {
    id: "triangle_nommer",
    label: "Nommer un triangle",
    notionId: "triangles",
    prerequis: [],
  },
  {
    id: "triangle_sommets_cotes",
    label: "Identifier sommets et côtés",
    notionId: "triangles",
    prerequis: ["triangle_nommer"],
  },
  {
    id: "triangle_type_cotes",
    label: "Reconnaître un triangle selon ses côtés",
    notionId: "triangles",
    prerequis: ["triangle_sommets_cotes"],
  },
  {
    id: "triangle_type_angles",
    label: "Reconnaître un triangle selon ses angles",
    notionId: "triangles",
    prerequis: ["angle_droit", "angle_compare"],
  },
  {
    id: "triangle_somme_angles",
    label: "Utiliser la somme des angles d’un triangle",
    notionId: "triangles",
    prerequis: ["triangle_type_angles"],
  },
  {
    id: "triangle_angle_manquant",
    label: "Déterminer un angle manquant",
    notionId: "triangles",
    prerequis: ["triangle_somme_angles"],
  },
  {
    id: "triangle_possible_ou_non",
    label: "Déterminer si un triangle est possible",
    notionId: "triangles",
    prerequis: ["triangle_sommets_cotes"],
  },
  {
    id: "triangle_defis",
    label: "Défis triangles",
    notionId: "triangles",
    prerequis: [
      "triangle_type_cotes",
      "triangle_type_angles",
      "triangle_somme_angles",
      "triangle_angle_manquant",
      "triangle_possible_ou_non",
    ],
  },

  /* =========================
     QUADRILATERES
  ========================= */
  {
    id: "quadrilatere_nommer_vocabulaire",
    label: "Nommer un quadrilatère et son vocabulaire",
    notionId: "quadrilateres",
    prerequis: [],
  },
  {
    id: "quadrilatere_identifier_nature",
    label: "Identifier la nature d’un quadrilatère",
    notionId: "quadrilateres",
    prerequis: ["quadrilatere_nommer_vocabulaire"],
  },
  {
    id: "quadrilatere_lire_proprietes",
    label: "Lire les propriétés d’un quadrilatère",
    notionId: "quadrilateres",
    prerequis: [
      "angle_droit",
      "angle_compare",
      "quadrilatere_nommer_vocabulaire",
    ],
  },
  {
    id: "quadrilatere_lien_proprietes",
    label: "Faire le lien entre propriétés et nature",
    notionId: "quadrilateres",
    prerequis: [
      "quadrilatere_identifier_nature",
      "quadrilatere_lire_proprietes",
    ],
  },
  {
    id: "quadrilatere_distinguer",
    label: "Distinguer les quadrilatères",
    notionId: "quadrilateres",
    prerequis: [
      "quadrilatere_identifier_nature",
      "quadrilatere_lien_proprietes",
    ],
  },
  {
    id: "quadrilatere_conclusion",
    label: "Conclure sur la nature d’un quadrilatère",
    notionId: "quadrilateres",
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
    prerequis: [],
  },
  {
    id: "sym_point",
    label: "Construire l’image d’un point",
    notionId: "symetrie",
    prerequis: ["sym_reconnaitre"],
  },
  {
    id: "sym_figure",
    label: "Construire l’image d’une figure",
    notionId: "symetrie",
    prerequis: ["sym_point"],
  },
  {
    id: "sym_proprietes",
    label: "Utiliser les propriétés de la symétrie",
    notionId: "symetrie",
    prerequis: ["sym_figure"],
  },
  {
    id: "sym_axes",
    label: "Identifier des axes de symétrie",
    notionId: "symetrie",
    prerequis: ["sym_reconnaitre"],
  },
  {
    id: "sym_defis",
    label: "Défis symétrie",
    notionId: "symetrie",
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
    prerequis: [],
  },
  {
    id: "data_lire_graphique",
    label: "Lire un graphique",
    notionId: "donnees",
    prerequis: ["data_lire_tableau"],
  },
  {
    id: "data_prelever",
    label: "Prélever une information",
    notionId: "donnees",
    prerequis: ["data_lire_tableau", "data_lire_graphique"],
  },
  {
    id: "data_comparer",
    label: "Comparer des données",
    notionId: "donnees",
    prerequis: ["data_prelever"],
  },
  {
    id: "data_interpreter",
    label: "Interpréter des données",
    notionId: "donnees",
    prerequis: ["data_prelever", "data_comparer"],
  },
  {
    id: "data_defis",
    label: "Défis données",
    notionId: "donnees",
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
    prerequis: [],
  },
  {
    id: "proba_comparer",
    label: "Comparer des probabilités",
    notionId: "probabilites",
    prerequis: ["proba_vocabulaire"],
  },
  {
    id: "proba_issue",
    label: "Identifier les issues possibles",
    notionId: "probabilites",
    prerequis: ["proba_vocabulaire"],
  },
  {
    id: "proba_estimer",
    label: "Estimer une probabilité",
    notionId: "probabilites",
    prerequis: ["proba_comparer"],
  },
  {
    id: "proba_lire",
    label: "Lire une situation probabiliste",
    notionId: "probabilites",
    prerequis: ["proba_issue"],
  },
  {
    id: "proba_defis",
    label: "Défis probabilités",
    notionId: "probabilites",
    prerequis: [
      "proba_vocabulaire",
      "proba_comparer",
      "proba_issue",
      "proba_estimer",
      "proba_lire",
    ],
  },
];