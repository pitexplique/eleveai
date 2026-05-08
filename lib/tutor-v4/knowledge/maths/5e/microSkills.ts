import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  /* =========================
     NOMBRES RELATIFS
  ========================= */
  {
    id: "relatif_lire",
    label: "Lire et écrire un nombre relatif",
    notionId: "nombres_relatifs",
    prerequis: [],
  },
  {
    id: "relatif_signe",
    label: "Identifier le signe d’un nombre relatif",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_lire"],
  },
  {
    id: "relatif_comparer",
    label: "Comparer des nombres relatifs",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_lire", "relatif_signe"],
  },
  {
    id: "relatif_placer",
    label: "Placer des nombres relatifs sur une droite",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_lire", "relatif_comparer"],
  },
  {
    id: "relatif_opposes",
    label: "Déterminer l’opposé d’un nombre relatif",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_signe"],
  },
  {
    id: "relatif_valeur_absolue",
    label: "Déterminer la valeur absolue d’un nombre relatif",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_opposes"],
  },
  {
    id: "relatif_defis",
    label: "Défis sur les nombres relatifs",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_comparer", "relatif_valeur_absolue"],
  },

  /* =========================
     OPÉRATIONS SUR LES RELATIFS
  ========================= */
  {
    id: "relatif_addition",
    label: "Additionner des nombres relatifs",
    notionId: "operations_relatifs",
    prerequis: ["relatif_lire", "relatif_signe"],
  },
  {
    id: "relatif_soustraction",
    label: "Soustraire des nombres relatifs",
    notionId: "operations_relatifs",
    prerequis: ["relatif_addition"],
  },
  {
    id: "relatif_calcul",
    label: "Effectuer des calculs avec des nombres relatifs",
    notionId: "operations_relatifs",
    prerequis: ["relatif_addition", "relatif_soustraction"],
  },
  {
    id: "relatif_probleme",
    label: "Résoudre un problème avec des nombres relatifs",
    notionId: "operations_relatifs",
    prerequis: ["relatif_calcul"],
  },
  {
    id: "relatif_defis_ops",
    label: "Défis sur les opérations avec les relatifs",
    notionId: "operations_relatifs",
    prerequis: ["relatif_probleme"],
  },

{
  id: "fraction_egales",
  label: "Reconnaître des fractions égales",
  notionId: "fractions",
  prerequis: [],
},
{
  id: "fraction_simplifier",
  label: "Simplifier une fraction",
  notionId: "fractions",
  prerequis: ["fraction_egales"],
},
{
  id: "fraction_rationnel",
  label: "Reconnaître un nombre rationnel et ses écritures",
  notionId: "fractions",
  prerequis: ["fraction_egales"],
},
{
  id: "fraction_comparer",
  label: "Comparer des fractions",
  notionId: "fractions",
  prerequis: ["fraction_simplifier"],
},
{
  id: "fraction_addition",
  label: "Additionner ou soustraire des fractions simples",
  notionId: "fractions",
  prerequis: ["fraction_comparer"],
},
{
  id: "fraction_produit",
  label: "Multiplier des fractions",
  notionId: "fractions",
  prerequis: ["fraction_simplifier"],
},
{
  id: "fraction_quantite",
  label: "Calculer la fraction d’un nombre, d’une quantité ou d’une fraction",
  notionId: "fractions",
  prerequis: ["fraction_comparer", "fraction_produit"],
},
{
  id: "fraction_inverse",
  label: "Déterminer l’inverse d’un nombre rationnel ou d’une fraction",
  notionId: "fractions",
  prerequis: ["fraction_rationnel", "fraction_produit"],
},
{
  id: "fraction_division",
  label: "Diviser des fractions",
  notionId: "fractions",
  prerequis: ["fraction_inverse", "fraction_produit"],
},
{
  id: "fraction_oppose",
  label: "Exprimer l’opposé d’un nombre rationnel",
  notionId: "fractions",
  prerequis: ["fraction_rationnel"],
},
{
  id: "fraction_defis",
  label: "Défis sur les fractions et les nombres rationnels",
  notionId: "fractions",
  prerequis: ["fraction_addition", "fraction_quantite", "fraction_division", "fraction_oppose"],
},

  /* =========================
     PROPORTIONNALITÉ
  ========================= */
  {
    id: "prop_reconnaitre",
    label: "Reconnaître une situation de proportionnalité ou de non-proportionnalité",
    notionId: "proportionnalite",
    prerequis: [],
  },
  {
    id: "prop_table",
    label: "Compléter et utiliser un tableau de proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["prop_reconnaitre"],
  },
  {
    id: "prop_quatrieme",
    label: "Calculer une quatrième proportionnelle",
    notionId: "proportionnalite",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_coeff",
    label: "Utiliser un coefficient de proportionnalité ou un passage à l’unité",
    notionId: "proportionnalite",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_ratio",
    label: "Exprimer et utiliser un ratio simple",
    notionId: "proportionnalite",
    prerequis: ["prop_reconnaitre"],
  },
  {
    id: "prop_pourcentage",
    label: "Calculer et interpréter un pourcentage simple",
    notionId: "proportionnalite",
    prerequis: ["prop_coeff"],
  },
  {
    id: "prop_coeff_mult",
    label: "Utiliser un coefficient multiplicateur simple",
    notionId: "proportionnalite",
    prerequis: ["prop_pourcentage"],
  },
  {
    id: "prop_probleme",
    label: "Résoudre un problème de proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["prop_quatrieme", "prop_coeff", "prop_pourcentage"],
  },
  {
    id: "prop_defis",
    label: "Défis sur la proportionnalité, les ratios et les pourcentages",
    notionId: "proportionnalite",
    prerequis: ["prop_ratio", "prop_probleme", "prop_coeff_mult"],
  },

  /* =========================
   CALCUL LITTÉRAL
========================= */
{
  id: "litteral_expression",
  label: "Comprendre une expression littérale simple",
  notionId: "calcul_litteral",
  prerequis: [],
},
{
  id: "litteral_traduire",
  label: "Traduire une phrase ou une situation en expression littérale",
  notionId: "calcul_litteral",
  prerequis: ["litteral_expression"],
},
{
  id: "litteral_substituer",
  label: "Calculer la valeur d’une expression littérale pour une valeur donnée",
  notionId: "calcul_litteral",
  prerequis: ["litteral_expression"],
},
{
  id: "litteral_reduire",
  label: "Réduire une expression littérale simple",
  notionId: "calcul_litteral",
  prerequis: ["litteral_expression"],
},
{
  id: "litteral_defis",
  label: "Défis sur le calcul littéral",
  notionId: "calcul_litteral",
  prerequis: ["litteral_traduire", "litteral_substituer", "litteral_reduire"],
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
    label: "Estimer la mesure d’un angle",
    notionId: "angles",
    prerequis: ["angle_lire"],
  },
  {
    id: "angle_defis",
    label: "Défis sur les angles",
    notionId: "angles",
    prerequis: ["angle_tracer", "angle_estimer"],
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
    id: "triangle_nature",
    label: "Reconnaître la nature d’un triangle",
    notionId: "triangles",
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "triangle_construire",
    label: "Construire un triangle",
    notionId: "triangles",
    prerequis: ["triangle_reconnaitre", "angle_tracer"],
  },
  {
    id: "triangle_somme_angles",
    label: "Utiliser la somme des angles d’un triangle",
    notionId: "triangles",
    prerequis: ["triangle_reconnaitre", "angle_mesurer"],
  },
  {
    id: "triangle_defis",
    label: "Défis sur les triangles",
    notionId: "triangles",
    prerequis: ["triangle_nature", "triangle_construire", "triangle_somme_angles"],
  },

  /* =========================
     SYMÉTRIE CENTRALE
  ========================= */
  {
    id: "sym_centrale_reconnaitre",
    label: "Reconnaître une symétrie centrale",
    notionId: "symetrie_centrale",
    prerequis: [],
  },
  {
    id: "sym_centrale_point",
    label: "Construire l’image d’un point par symétrie centrale",
    notionId: "symetrie_centrale",
    prerequis: ["sym_centrale_reconnaitre"],
  },
  {
    id: "sym_centrale_figure",
    label: "Construire l’image d’une figure par symétrie centrale",
    notionId: "symetrie_centrale",
    prerequis: ["sym_centrale_point"],
  },
  {
    id: "sym_centrale_proprietes",
    label: "Utiliser les propriétés de la symétrie centrale, dont le point invariant",
    notionId: "symetrie_centrale",
    prerequis: ["sym_centrale_figure"],
  },
  {
    id: "sym_centrale_defis",
    label: "Défis sur la symétrie centrale",
    notionId: "symetrie_centrale",
    prerequis: ["sym_centrale_proprietes"],
  },

  /* =========================
     AIRES
  ========================= */
  {
    id: "aire_comprendre",
    label: "Comprendre ce qu’est une aire",
    notionId: "aires",
    prerequis: [],
  },
  {
    id: "aire_triangle",
    label: "Calculer l’aire d’un triangle",
    notionId: "aires",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_parallelogramme",
    label: "Calculer l’aire d’un parallélogramme",
    notionId: "aires",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_composer",
    label: "Calculer l’aire d’une figure composée",
    notionId: "aires",
    prerequis: ["aire_triangle", "aire_parallelogramme"],
  },
  {
    id: "aire_defis",
    label: "Défis sur les aires",
    notionId: "aires",
    prerequis: ["aire_composer"],
  },

/* =========================
   VOLUMES
========================= */

{
  id: "volume_comprendre",
  label: "Comprendre ce qu’est un volume",
  notionId: "volumes",
  prerequis: [],
},

{
  id: "volume_pave",
  label: "Calculer le volume d’un pavé droit",
  notionId: "volumes",
  prerequis: ["volume_comprendre"],
},

{
  id: "volume_prisme",
  label: "Calculer le volume d’un prisme droit",
  notionId: "volumes",
  prerequis: ["volume_comprendre", "aire_comprendre"],
},

{
  id: "volume_cylindre",
  label: "Calculer le volume d’un cylindre",
  notionId: "volumes",
  prerequis: ["volume_comprendre", "aire_comprendre"],
},

{
  id: "volume_assemblage",
  label: "Calculer le volume d’un assemblage de solides",
  notionId: "volumes",
  prerequis: [
    "volume_pave",
    "volume_prisme",
    "volume_cylindre",
  ],
},

{
  id: "volume_unites",
  label: "Convertir et utiliser les unités de volume",
  notionId: "volumes",
  prerequis: ["volume_comprendre"],
},

{
  id: "volume_defis",
  label: "Résoudre des problèmes et défis sur les volumes",
  notionId: "volumes",
  prerequis: [
    "volume_pave",
    "volume_prisme",
    "volume_cylindre",
    "volume_unites",
  ],
},

  /* ======================
     STATISTIQUES
  ========================= */
{
  id: "stat_organiser_donnees",
  label: "Recueillir et organiser des données",
  notionId: "statistiques",
  prerequis: [],
},
{
  id: "stat_lire_tableau",
  label: "Lire et interpréter un tableau statistique",
  notionId: "statistiques",
  prerequis: ["stat_organiser_donnees"],
},
{
  id: "stat_lire_graphique",
  label: "Lire et interpréter un diagramme ou un graphique",
  notionId: "statistiques",
  prerequis: ["stat_lire_tableau"],
},
{
  id: "stat_effectif_frequence",
  label: "Calculer un effectif ou une fréquence",
  notionId: "statistiques",
  prerequis: ["stat_lire_tableau"],
},
{
  id: "stat_representer",
  label: "Représenter des données par un tableau, un diagramme ou un graphique",
  notionId: "statistiques",
  prerequis: ["stat_lire_tableau", "stat_effectif_frequence"],
},
{
  id: "stat_choisir_representation",
  label: "Choisir une représentation adaptée",
  notionId: "statistiques",
  prerequis: ["stat_lire_graphique", "stat_representer"],
},
{
  id: "stat_moyenne",
  label: "Calculer et interpréter une moyenne simple",
  notionId: "statistiques",
  prerequis: ["stat_effectif_frequence"],
},
{
  id: "stat_defis",
  label: "Défis sur les statistiques",
  notionId: "statistiques",
  prerequis: ["stat_lire_graphique", "stat_choisir_representation", "stat_moyenne"],
},
  /* =========================
     PROBABILITÉS
  ========================= */
  {
    id: "proba_vocabulaire",
    label: "Comprendre le vocabulaire des probabilités",
    notionId: "probabilites",
    prerequis: [],
  },
  {
    id: "proba_issues",
    label: "Déterminer les issues d’une expérience aléatoire simple",
    notionId: "probabilites",
    prerequis: ["proba_vocabulaire"],
  },
  {
    id: "proba_equiprobabilite",
    label: "Reconnaître une situation d’équiprobabilité",
    notionId: "probabilites",
    prerequis: ["proba_issues"],
  },
  {
    id: "proba_calculer",
    label: "Calculer une probabilité simple",
    notionId: "probabilites",
    prerequis: ["proba_issues", "fraction_comparer"],
  },
  {
    id: "proba_defis",
    label: "Défis sur les probabilités",
    notionId: "probabilites",
    prerequis: ["proba_equiprobabilite", "proba_calculer"],
  },
];