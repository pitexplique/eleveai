import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  /* =========================
     NOMBRES RELATIFS
  ========================= */
  {
    id: "relatif_lire",
    label: "Lire et écrire un nombre relatif",
    notionId: "relatif_nombre",
    prerequis: [],
  },
  {
    id: "relatif_signe",
    label: "Identifier le signe d’un nombre relatif",
    notionId: "relatif_nombre",
    prerequis: ["relatif_lire"],
  },
  {
    id: "relatif_comparer",
    label: "Comparer des nombres relatifs",
    notionId: "relatif_nombre",
    prerequis: ["relatif_lire", "relatif_signe"],
  },
  {
    id: "relatif_placer",
    label: "Placer des nombres relatifs sur une droite",
    notionId: "relatif_nombre",
    prerequis: ["relatif_lire", "relatif_comparer"],
  },
  {
    id: "relatif_oppose",
    label: "Déterminer l’opposé d’un nombre relatif",
    notionId: "relatif_nombre",
    prerequis: ["relatif_signe"],
  },
  {
    id: "relatif_valeur_absolue",
    label: "Déterminer la valeur absolue d’un nombre relatif",
    notionId: "relatif_nombre",
    prerequis: ["relatif_oppose"],
  },
  {
    id: "relatif_defi",
    label: "Défis sur les nombres relatifs",
    notionId: "relatif_nombre",
    prerequis: ["relatif_comparer", "relatif_valeur_absolue"],
  },

  /* =========================
     OPÉRATIONS SUR LES RELATIFS
  ========================= */
  {
    id: "relatif_addition",
    label: "Additionner des nombres relatifs",
    notionId: "relatif_operation",
    prerequis: ["relatif_lire", "relatif_signe"],
  },
  {
    id: "relatif_soustraction",
    label: "Soustraire des nombres relatifs",
    notionId: "relatif_operation",
    prerequis: ["relatif_addition"],
  },
  {
    id: "relatif_calcul",
    label: "Effectuer des calculs avec des nombres relatifs",
    notionId: "relatif_operation",
    prerequis: ["relatif_addition", "relatif_soustraction"],
  },
  {
    id: "relatif_probleme",
    label: "Résoudre un problème avec des nombres relatifs",
    notionId: "relatif_operation",
    prerequis: ["relatif_calcul"],
  },
  {
    id: "relatif_operation_defi",
    label: "Défis sur les opérations avec les relatifs",
    notionId: "relatif_operation",
    prerequis: ["relatif_probleme"],
  },

{
  id: "fraction_egale",
  label: "Reconnaître des fractions égales",
  notionId: "fraction_nombre",
  prerequis: [],
},
{
  id: "fraction_simplifier",
  label: "Simplifier une fraction",
  notionId: "fraction_nombre",
  prerequis: ["fraction_egale"],
},
{
  id: "fraction_rationnel",
  label: "Reconnaître un nombre rationnel et ses écritures",
  notionId: "fraction_nombre",
  prerequis: ["fraction_egale"],
},
{
  id: "fraction_comparer",
  label: "Comparer des fractions",
  notionId: "fraction_nombre",
  prerequis: ["fraction_simplifier"],
},
{
  id: "fraction_oppose",
  label: "Exprimer l’opposé d’un nombre rationnel",
  notionId: "fraction_nombre",
  prerequis: ["fraction_rationnel"],
},
{
  id: "fraction_defi",
  label: "Défis sur la lecture et la comparaison des fractions",
  notionId: "fraction_nombre",
  prerequis: ["fraction_comparer", "fraction_rationnel", "fraction_oppose"],
},

  /* =========================
     CALCULER AVEC LES FRACTIONS
  ========================= */
{
  id: "fraction_additionner",
  label: "Additionner ou soustraire des fractions simples",
  notionId: "fraction_calcul",
  prerequis: ["fraction_comparer"],
},
{
  id: "fraction_multiplier",
  label: "Multiplier des fractions",
  notionId: "fraction_calcul",
  prerequis: ["fraction_simplifier"],
},
{
  id: "fraction_quantite",
  label: "Calculer la fraction d’un nombre, d’une quantité ou d’une fraction",
  notionId: "fraction_calcul",
  prerequis: ["fraction_comparer", "fraction_multiplier"],
},
// L'inverse et la division de fractions sont partis le 04/08/2026 : les
// repères annuels les placent en 4e, où ils existent déjà (neuf questions
// chacun). Un élève de 5e n'a pas à les croiser ici.
{
  id: "fraction_calcul_defi",
  label: "Défis de calcul avec les fractions",
  notionId: "fraction_calcul",
  prerequis: ["fraction_additionner", "fraction_quantite", "fraction_multiplier"],
},

  /* =========================
     PROPORTIONNALITÉ
  ========================= */
  {
    id: "prop_reconnaitre",
    label: "Reconnaître une situation de proportionnalité ou de non-proportionnalité",
    notionId: "prop_proportionnalite",
    prerequis: [],
  },
  {
    id: "prop_table",
    label: "Compléter et utiliser un tableau de proportionnalité",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_reconnaitre"],
  },
  {
    id: "prop_quatrieme",
    label: "Calculer une quatrième proportionnelle",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_coeff",
    label: "Utiliser un coefficient de proportionnalité ou un passage à l’unité",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_probleme",
    label: "Résoudre un problème de proportionnalité",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_quatrieme", "prop_coeff"],
  },
  {
    id: "prop_defi",
    label: "Défis sur la proportionnalité",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_quatrieme", "prop_probleme"],
  },

  /* =========================
     RATIOS ET POURCENTAGES
  ========================= */
  {
    id: "prop_rapport",
    label: "Exprimer et utiliser un ratio simple",
    notionId: "prop_ratio_pourcentage",
    prerequis: ["prop_reconnaitre"],
  },
  {
    id: "prop_pourcentage",
    label: "Calculer et interpréter un pourcentage simple",
    notionId: "prop_ratio_pourcentage",
    prerequis: ["prop_coeff"],
  },
  {
    id: "prop_coeff_multiplicateur",
    label: "Utiliser un coefficient multiplicateur simple",
    notionId: "prop_ratio_pourcentage",
    prerequis: ["prop_pourcentage"],
  },
  {
    id: "prop_ratio_defi",
    label: "Défis sur les ratios et les pourcentages",
    notionId: "prop_ratio_pourcentage",
    prerequis: ["prop_rapport", "prop_coeff_multiplicateur"],
  },

  /* =========================
   CALCUL LITTÉRAL
========================= */
{
  id: "litteral_expression_comprendre",
  label: "Comprendre une expression littérale simple",
  notionId: "litteral_calcul",
  prerequis: [],
},
{
  id: "litteral_traduire",
  label: "Traduire une phrase ou une situation en expression littérale",
  notionId: "litteral_calcul",
  prerequis: ["litteral_expression_comprendre"],
},
{
  id: "litteral_substituer",
  label: "Calculer la valeur d’une expression littérale pour une valeur donnée",
  notionId: "litteral_calcul",
  prerequis: ["litteral_expression_comprendre"],
},
{
  id: "litteral_reduire",
  label: "Réduire une expression littérale simple",
  notionId: "litteral_calcul",
  prerequis: ["litteral_expression_comprendre"],
},
{
  id: "litteral_tester",
  label: "Tester si une égalité est vraie pour une valeur donnée",
  notionId: "litteral_calcul",
  prerequis: ["litteral_substituer"],
},
{
  id: "litteral_distributivite",
  label: "Développer un produit du type k(a + b)",
  notionId: "litteral_calcul",
  prerequis: ["litteral_reduire"],
},
{
  id: "litteral_defi",
  label: "Défis sur le calcul littéral",
  notionId: "litteral_calcul",
  prerequis: ["litteral_traduire", "litteral_tester", "litteral_distributivite"],
},

  /* =========================
     ANGLES
  ========================= */
  {
    id: "angle_lire",
    label: "Lire un angle",
    notionId: "angle_mesure",
    prerequis: [],
  },
  {
    id: "angle_mesurer",
    label: "Mesurer un angle",
    notionId: "angle_mesure",
    prerequis: ["angle_lire"],
  },
  {
    id: "angle_tracer",
    label: "Tracer un angle",
    notionId: "angle_mesure",
    prerequis: ["angle_mesurer"],
  },
  {
    id: "angle_estimer",
    label: "Estimer la mesure d’un angle",
    notionId: "angle_mesure",
    prerequis: ["angle_lire"],
  },
  // Deux gestes du programme de 5e qui manquaient : les paires d'angles et la
  // sécante à deux parallèles. Ajoutés le 04/08/2026.
  {
    id: "angle_paires",
    label: "Utiliser des angles complémentaires, supplémentaires ou opposés par le sommet",
    notionId: "angle_mesure",
    prerequis: ["angle_lire"],
  },
  {
    id: "angle_paralleles",
    label: "Utiliser les angles formés par deux parallèles et une sécante",
    notionId: "angle_mesure",
    prerequis: ["angle_paires"],
  },
  {
    id: "angle_defi",
    label: "Défis sur les angles",
    notionId: "angle_mesure",
    prerequis: ["angle_tracer", "angle_estimer", "angle_paralleles"],
  },

  /* =========================
     TRIANGLES
  ========================= */
  {
    id: "triangle_reconnaitre",
    label: "Reconnaître un triangle",
    notionId: "triangle_figure",
    prerequis: [],
  },
  {
    id: "triangle_nature",
    label: "Reconnaître la nature d’un triangle",
    notionId: "triangle_figure",
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "triangle_inegalite",
    label: "Reconnaître un triangle constructible (inégalité triangulaire)",
    notionId: "triangle_figure",
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "triangle_construire",
    label: "Construire un triangle",
    notionId: "triangle_figure",
    prerequis: ["triangle_reconnaitre", "triangle_inegalite", "angle_tracer"],
  },
  {
    id: "triangle_somme_angle",
    label: "Utiliser la somme des angles d’un triangle",
    notionId: "triangle_figure",
    prerequis: ["triangle_reconnaitre", "angle_mesurer"],
  },
  {
    id: "triangle_defi",
    label: "Défis sur les triangles",
    notionId: "triangle_figure",
    prerequis: ["triangle_nature", "triangle_construire", "triangle_somme_angle"],
  },

  /* =========================
     SYMÉTRIE CENTRALE
  ========================= */
  {
    id: "sym_centrale_reconnaitre",
    label: "Reconnaître une symétrie centrale",
    notionId: "sym_centrale",
    prerequis: [],
  },
  {
    id: "sym_centrale_point",
    label: "Construire l’image d’un point par symétrie centrale",
    notionId: "sym_centrale",
    prerequis: ["sym_centrale_reconnaitre"],
  },
  {
    id: "sym_centrale_figure",
    label: "Construire l’image d’une figure par symétrie centrale",
    notionId: "sym_centrale",
    prerequis: ["sym_centrale_point"],
  },
  {
    id: "sym_centrale_propriete",
    label: "Utiliser les propriétés de la symétrie centrale, dont le point invariant",
    notionId: "sym_centrale",
    prerequis: ["sym_centrale_figure"],
  },
  {
    id: "sym_centrale_defi",
    label: "Défis sur la symétrie centrale",
    notionId: "sym_centrale",
    prerequis: ["sym_centrale_propriete"],
  },

  /* =========================
     AIRES
  ========================= */
  {
    id: "aire_comprendre",
    label: "Comprendre ce qu’est une aire",
    notionId: "aire_surface",
    prerequis: [],
  },
  {
    id: "aire_triangle",
    label: "Calculer l’aire d’un triangle",
    notionId: "aire_surface",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_parallelogramme",
    label: "Calculer l’aire d’un parallélogramme",
    notionId: "aire_surface",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_composer",
    label: "Calculer l’aire d’une figure composée",
    notionId: "aire_surface",
    prerequis: ["aire_triangle", "aire_parallelogramme"],
  },
  {
    id: "aire_defi",
    label: "Défis sur les aires",
    notionId: "aire_surface",
    prerequis: ["aire_composer"],
  },

/* =========================
   VOLUMES
========================= */

{
  id: "volume_comprendre",
  label: "Comprendre ce qu’est un volume",
  notionId: "volume_solide",
  prerequis: [],
},

{
  id: "volume_pave",
  label: "Calculer le volume d’un pavé droit",
  notionId: "volume_solide",
  prerequis: ["volume_comprendre"],
},

{
  id: "volume_prisme",
  label: "Calculer le volume d’un prisme droit",
  notionId: "volume_solide",
  prerequis: ["volume_comprendre", "aire_comprendre"],
},

{
  id: "volume_cylindre",
  label: "Calculer le volume d’un cylindre",
  notionId: "volume_solide",
  prerequis: ["volume_comprendre", "aire_comprendre"],
},

{
  id: "volume_assemblage",
  label: "Calculer le volume d’un assemblage de solides",
  notionId: "volume_solide",
  prerequis: [
    "volume_pave",
    "volume_prisme",
    "volume_cylindre",
  ],
},

{
  id: "volume_unite",
  label: "Convertir et utiliser les unités de volume",
  notionId: "volume_solide",
  prerequis: ["volume_comprendre"],
},

{
  id: "volume_defi",
  label: "Résoudre des problèmes et défis sur les volumes",
  notionId: "volume_solide",
  prerequis: [
    "volume_pave",
    "volume_prisme",
    "volume_cylindre",
    "volume_unite",
  ],
},

  /* ======================
     STATISTIQUES
  ========================= */
{
  id: "stat_donnee_organiser",
  label: "Recueillir et organiser des données",
  notionId: "stat_statistique",
  prerequis: [],
},
{
  id: "stat_lire_tableau",
  label: "Lire et interpréter un tableau statistique",
  notionId: "stat_statistique",
  prerequis: ["stat_donnee_organiser"],
},
{
  id: "stat_lire_graphique",
  label: "Lire et interpréter un diagramme ou un graphique",
  notionId: "stat_statistique",
  prerequis: ["stat_lire_tableau"],
},
{
  id: "stat_effectif_frequence",
  label: "Calculer un effectif ou une fréquence",
  notionId: "stat_statistique",
  prerequis: ["stat_lire_tableau"],
},
{
  id: "stat_representer",
  label: "Représenter des données par un tableau, un diagramme ou un graphique",
  notionId: "stat_statistique",
  prerequis: ["stat_lire_tableau", "stat_effectif_frequence"],
},
{
  id: "stat_representation_choisir",
  label: "Choisir une représentation adaptée",
  notionId: "stat_statistique",
  prerequis: ["stat_lire_graphique", "stat_representer"],
},
{
  id: "stat_moyenne",
  label: "Calculer et interpréter une moyenne simple",
  notionId: "stat_statistique",
  prerequis: ["stat_effectif_frequence"],
},
{
  id: "stat_defi",
  label: "Défis sur les statistiques",
  notionId: "stat_statistique",
  prerequis: ["stat_lire_graphique", "stat_representation_choisir", "stat_moyenne"],
},
  /* =========================
     PROBABILITÉS
  ========================= */
  {
    id: "proba_vocabulaire",
    label: "Comprendre le vocabulaire des probabilités",
    notionId: "proba_experience",
    prerequis: [],
  },
  {
    id: "proba_issue",
    label: "Déterminer les issues d’une expérience aléatoire simple",
    notionId: "proba_experience",
    prerequis: ["proba_vocabulaire"],
  },
  {
    id: "proba_equiprobabilite",
    label: "Reconnaître une situation d’équiprobabilité",
    notionId: "proba_experience",
    prerequis: ["proba_issue"],
  },
  {
    id: "proba_calculer",
    label: "Calculer une probabilité simple",
    notionId: "proba_experience",
    prerequis: ["proba_issue", "fraction_comparer"],
  },
  {
    id: "proba_defi",
    label: "Défis sur les probabilités",
    notionId: "proba_experience",
    prerequis: ["proba_equiprobabilite", "proba_calculer"],
  },
  /* =========================
     ALGORITHME
  ========================= */
{
  id: "algo_sequence",
  label: "Manipuler et séquencer des instructions simples",
  notionId: "algo_programmation",
  prerequis: [],
},
{
  id: "algo_entree_sortie",
  label: "Identifier les entrées et sorties d’un programme",
  notionId: "algo_programmation",
  prerequis: ["algo_sequence"],
},
{
  id: "algo_expression_valeur",
  label: "Calculer la valeur d’une expression informatique",
  notionId: "algo_programmation",
  prerequis: ["algo_entree_sortie", "litteral_substituer"],
},
{
  id: "algo_prevoir_expression",
  label: "Prévoir le résultat avant exécution",
  notionId: "algo_programmation",
  prerequis: ["algo_expression_valeur"],
},
{
  id: "algo_defi",
  label: "Défis de lecture de programme",
  notionId: "algo_programmation",
  prerequis: ["algo_prevoir_expression", "algo_entree_sortie"],
},

  /* =========================
     ÉCRIRE ET MODIFIER UN PROGRAMME
  ========================= */
{
  id: "algo_formule_bloc",
  label: "Représenter une formule avec des blocs",
  notionId: "algo_construire",
  prerequis: ["algo_entree_sortie", "litteral_expression_comprendre"],
},
{
  id: "algo_test_condition",
  label: "Utiliser des tests et conditions simples",
  notionId: "algo_construire",
  prerequis: ["algo_sequence"],
},
{
  id: "algo_parametre",
  label: "Analyser un programme simple et modifier ses paramètres",
  notionId: "algo_construire",
  prerequis: ["algo_prevoir_expression"],
},
{
  id: "algo_boucle",
  label: "Utiliser une boucle inconditionnelle simple",
  notionId: "algo_construire",
  prerequis: ["algo_sequence", "algo_parametre"],
},
{
  id: "algo_construire_defi",
  label: "Défis d’écriture de programme",
  notionId: "algo_construire",
  prerequis: ["algo_boucle", "algo_parametre"],
},
];