// knowledge/maths/5e/microSkills.ts

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  /* =========================
     NOMBRES RELATIFS
  ========================= */
  {
    id: "relatif_lire",
    label: "Lire un nombre relatif",
    notionId: "nombres_relatifs",
    prerequis: [],
  },
  {
    id: "relatif_comparer",
    label: "Comparer des relatifs",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_lire"],
  },
  {
    id: "relatif_placer",
    label: "Placer sur une droite",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_lire"],
  },
  {
    id: "relatif_opposes",
    label: "Trouver l’opposé",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_lire"],
  },
  {
    id: "relatif_defis",
    label: "Défis relatifs",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_comparer"],
  },

  /* =========================
     OPERATIONS SUR LES RELATIFS
  ========================= */
  {
    id: "relatif_addition",
    label: "Additionner des relatifs",
    notionId: "operations_relatifs",
    prerequis: ["relatif_lire"],
  },
  {
    id: "relatif_soustraction",
    label: "Soustraire des relatifs",
    notionId: "operations_relatifs",
    prerequis: ["relatif_addition"],
  },
  {
    id: "relatif_multiplication",
    label: "Multiplier des relatifs",
    notionId: "operations_relatifs",
    prerequis: ["relatif_addition"],
  },
  {
    id: "relatif_division",
    label: "Diviser des relatifs",
    notionId: "operations_relatifs",
    prerequis: ["relatif_multiplication"],
  },
  {
    id: "relatif_defis_ops",
    label: "Défis opérations",
    notionId: "operations_relatifs",
    prerequis: ["relatif_division"],
  },

  /* =========================
     FRACTIONS
  ========================= */
  {
    id: "fraction_simplifier",
    label: "Simplifier une fraction",
    notionId: "fractions",
    prerequis: [],
  },
  {
    id: "fraction_comparer",
    label: "Comparer des fractions",
    notionId: "fractions",
    prerequis: ["fraction_simplifier"],
  },
  {
    id: "fraction_addition",
    label: "Additionner des fractions",
    notionId: "fractions",
    prerequis: ["fraction_comparer"],
  },
  {
    id: "fraction_multiplier",
    label: "Multiplier des fractions",
    notionId: "fractions",
    prerequis: ["fraction_simplifier"],
  },
  {
    id: "fraction_defis",
    label: "Défis fractions",
    notionId: "fractions",
    prerequis: ["fraction_multiplier"],
  },

  /* =========================
     PROPORTIONNALITE
  ========================= */
  {
    id: "prop_table",
    label: "Utiliser un tableau",
    notionId: "proportionnalite",
    prerequis: [],
  },
  {
    id: "prop_coeff",
    label: "Coefficient de proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_pourcentage",
    label: "Appliquer un pourcentage",
    notionId: "proportionnalite",
    prerequis: ["prop_coeff"],
  },
  {
    id: "prop_probleme",
    label: "Résoudre un problème",
    notionId: "proportionnalite",
    prerequis: ["prop_coeff"],
  },
  {
    id: "prop_defis",
    label: "Défis proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["prop_probleme"],
  },

  /* =========================
     CALCUL LITTERAL
  ========================= */
  {
    id: "litteral_expression",
    label: "Comprendre une expression",
    notionId: "calcul_litteral",
    prerequis: [],
  },
  {
    id: "litteral_substituer",
    label: "Substituer une valeur",
    notionId: "calcul_litteral",
    prerequis: ["litteral_expression"],
  },
  {
    id: "litteral_reduire",
    label: "Réduire une expression",
    notionId: "calcul_litteral",
    prerequis: ["litteral_expression"],
  },
  {
    id: "litteral_defis",
    label: "Défis littéral",
    notionId: "calcul_litteral",
    prerequis: ["litteral_reduire"],
  },

  /* =========================
     ANGLES
  ========================= */
  {
    id: "angle_lire",
    label: "Lire un angle",
    notionId: "angles",
    prerequis: [],
  },
  {
    id: "angle_mesurer",
    label: "Mesurer un angle",
    notionId: "angles",
    prerequis: ["angle_lire"],
  },
  {
    id: "angle_tracer",
    label: "Tracer un angle",
    notionId: "angles",
    prerequis: ["angle_mesurer"],
  },
  {
    id: "angle_estimer",
    label: "Estimer un angle",
    notionId: "angles",
    prerequis: ["angle_lire"],
  },
  {
    id: "angle_defis_5e",
    label: "Défis angles",
    notionId: "angles",
    prerequis: ["angle_tracer"],
  },

  /* =========================
     TRIANGLES
  ========================= */
  {
    id: "triangle_reconnaitre",
    label: "Reconnaître un triangle",
    notionId: "triangles",
    prerequis: [],
  },
  {
    id: "triangle_construire",
    label: "Construire un triangle",
    notionId: "triangles",
    prerequis: ["triangle_reconnaitre", "angle_tracer"],
  },
  {
    id: "triangle_somme_angles_5e",
    label: "Utiliser la somme des angles",
    notionId: "triangles",
    prerequis: ["angle_mesurer"],
  },
  {
    id: "triangle_hauteur_mediatrice",
    label: "Identifier hauteur et médiatrice",
    notionId: "triangles",
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "triangle_defis_5e",
    label: "Défis triangles",
    notionId: "triangles",
    prerequis: ["triangle_construire", "triangle_somme_angles_5e"],
  },

  /* =========================
     SYMETRIE CENTRALE
  ========================= */
  {
    id: "sym_centrale_reconnaitre",
    label: "Reconnaître une symétrie centrale",
    notionId: "symetrie_centrale",
    prerequis: [],
  },
  {
    id: "sym_centrale_point",
    label: "Construire l’image d’un point",
    notionId: "symetrie_centrale",
    prerequis: ["sym_centrale_reconnaitre"],
  },
  {
    id: "sym_centrale_figure",
    label: "Construire l’image d’une figure",
    notionId: "symetrie_centrale",
    prerequis: ["sym_centrale_point"],
  },
  {
    id: "sym_centrale_proprietes",
    label: "Utiliser les propriétés",
    notionId: "symetrie_centrale",
    prerequis: ["sym_centrale_figure"],
  },
  {
    id: "sym_centrale_defis",
    label: "Défis symétrie centrale",
    notionId: "symetrie_centrale",
    prerequis: ["sym_centrale_proprietes"],
  },

  /* =========================
     AIRES
  ========================= */
  {
    id: "aire_comprendre_5e",
    label: "Comprendre une aire",
    notionId: "aires",
    prerequis: [],
  },
  {
    id: "aire_triangle",
    label: "Calculer l’aire d’un triangle",
    notionId: "aires",
    prerequis: ["aire_comprendre_5e"],
  },
  {
    id: "aire_parallelogramme",
    label: "Calculer l’aire d’un parallélogramme",
    notionId: "aires",
    prerequis: ["aire_comprendre_5e"],
  },
  {
    id: "aire_composer",
    label: "Calculer une aire composée",
    notionId: "aires",
    prerequis: ["aire_triangle", "aire_parallelogramme"],
  },
  {
    id: "aire_defis_5e",
    label: "Défis aires",
    notionId: "aires",
    prerequis: ["aire_composer"],
  },

  /* =========================
     VOLUMES
  ========================= */
  {
    id: "volume_comprendre_5e",
    label: "Comprendre un volume",
    notionId: "volumes",
    prerequis: [],
  },
  {
    id: "volume_prisme",
    label: "Calculer le volume d’un prisme",
    notionId: "volumes",
    prerequis: ["volume_comprendre_5e", "aire_comprendre_5e"],
  },
  {
    id: "volume_pave",
    label: "Calculer le volume d’un pavé droit",
    notionId: "volumes",
    prerequis: ["volume_comprendre_5e"],
  },
  {
    id: "volume_unites",
    label: "Utiliser les unités de volume",
    notionId: "volumes",
    prerequis: ["volume_comprendre_5e"],
  },
  {
    id: "volume_defis_5e",
    label: "Défis volumes",
    notionId: "volumes",
    prerequis: ["volume_prisme", "volume_pave"],
  },

  /* =========================
     STATISTIQUES
  ========================= */
  {
    id: "stat_lire_tableau_5e",
    label: "Lire un tableau statistique",
    notionId: "statistiques",
    prerequis: [],
  },
  {
    id: "stat_lire_graphique_5e",
    label: "Lire un graphique statistique",
    notionId: "statistiques",
    prerequis: ["stat_lire_tableau_5e"],
  },
  {
    id: "stat_effectif_frequence",
    label: "Calculer un effectif ou une fréquence",
    notionId: "statistiques",
    prerequis: ["stat_lire_tableau_5e"],
  },
  {
    id: "stat_moyenne",
    label: "Calculer une moyenne simple",
    notionId: "statistiques",
    prerequis: ["stat_effectif_frequence"],
  },
  {
    id: "stat_defis_5e",
    label: "Défis statistiques",
    notionId: "statistiques",
    prerequis: ["stat_moyenne", "stat_lire_graphique_5e"],
  },
];