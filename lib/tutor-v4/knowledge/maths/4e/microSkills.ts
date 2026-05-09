// knowledge/maths/4e/microSkills.ts
//
// Micro-compétences de mathématiques pour la classe de 4e.
// Ce fichier est aligné avec la structure 5e, mais avec un découpage
// plus fin de l’algèbre afin de permettre un suivi plus précis.
//
// Choix retenu :
// - une notion = un bloc pédagogique identifiable ;
// - une micro-compétence = une action précise et entraînable ;
// - présence d’une micro "defis" dans chaque notion lorsque pertinent.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
 
{
  id: "relatif_addition",
  label: "Additionner des nombres relatifs",
  notionId: "operations_relatifs",
  prerequis: [],
},
{
  id: "relatif_soustraction",
  label: "Soustraire des nombres relatifs",
  notionId: "operations_relatifs",
  prerequis: ["relatif_addition"],
},
{
  id: "relatif_multiplication",
  label: "Multiplier des nombres relatifs",
  notionId: "operations_relatifs",
  prerequis: ["relatif_addition"],
},
{
  id: "relatif_division",
  label: "Diviser des nombres relatifs",
  notionId: "operations_relatifs",
  prerequis: ["relatif_multiplication"],
},
{
  id: "relatif_calcul",
  label: "Effectuer des calculs avec des nombres relatifs",
  notionId: "operations_relatifs",
  prerequis: [
    "relatif_addition",
    "relatif_soustraction",
    "relatif_multiplication",
    "relatif_division",
  ],
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

  /// Fractions //
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

  // 👉 ICI
  {
    id: "fraction_decimal",
    label: "Passer d’une fraction à un nombre décimal",
    notionId: "fractions",
    prerequis: ["fraction_simplifier"],
  },

  {
    id: "fraction_rationnel",
    label: "Reconnaître qu’un nombre est rationnel et passer d’une écriture à une autre",
    notionId: "fractions",
    prerequis: ["fraction_egales"],
  },
  {
    id: "fraction_comparer",
    label: "Comparer des fractions",
    notionId: "fractions",
    prerequis: ["fraction_simplifier"],
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
    id: "prop_coeff",
    label: "Utiliser un coefficient de proportionnalité ou un passage à l’unité",
    notionId: "proportionnalite",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_quatrieme",
    label: "Calculer une quatrième proportionnelle",
    notionId: "proportionnalite",
    prerequis: ["prop_table", "prop_coeff"],
  },
  {
    id: "prop_pourcentage",
    label: "Calculer et interpréter un pourcentage",
    notionId: "proportionnalite",
    prerequis: ["prop_coeff"],
  },
  {
    id: "prop_coeff_mult",
    label: "Utiliser un coefficient multiplicateur",
    notionId: "proportionnalite",
    prerequis: ["prop_pourcentage", "prop_coeff"],
  },
  {
    id: "prop_evolution",
    label: "Interpréter une évolution en pourcentage",
    notionId: "proportionnalite",
    prerequis: ["prop_pourcentage", "prop_coeff_mult"],
  },
  {
    id: "prop_probleme",
    label: "Résoudre un problème de proportionnalité",
    notionId: "proportionnalite",
    prerequis: [
      "prop_quatrieme",
      "prop_coeff",
      "prop_pourcentage",
      "prop_evolution",
    ],
  },
  {
    id: "prop_defis",
    label: "Défis sur la proportionnalité et les pourcentages",
    notionId: "proportionnalite",
    prerequis: ["prop_evolution", "prop_probleme"],
  },

  /* =========================
     EXPRESSIONS LITTÉRALES
  ========================= */
  {
    id: "expr_litterale_comprendre",
    label: "Comprendre une expression littérale",
    notionId: "expressions_litterales",
    prerequis: [],
  },
  {
    id: "expr_litterale_traduire",
    label: "Traduire une phrase ou une situation en expression littérale",
    notionId: "expressions_litterales",
    prerequis: ["expr_litterale_comprendre"],
  },
  {
    id: "expr_litterale_substituer",
    label: "Calculer la valeur d’une expression littérale pour une valeur donnée",
    notionId: "expressions_litterales",
    prerequis: ["expr_litterale_comprendre"],
  },
  {
    id: "expr_litterale_reduire",
    label: "Réduire une expression littérale",
    notionId: "expressions_litterales",
    prerequis: ["expr_litterale_comprendre"],
  },
  {
    id: "expr_litterale_defis",
    label: "Défis sur les expressions littérales",
    notionId: "expressions_litterales",
    prerequis: [
      "expr_litterale_traduire",
      "expr_litterale_substituer",
      "expr_litterale_reduire",
    ],
  },

  /* =========================
     DISTRIBUTIVITÉ
  ========================= */
  {
    id: "distrib_simple",
    label: "Développer avec la distributivité simple",
    notionId: "distributivite",
    prerequis: ["expr_litterale_reduire"],
  },
  {
    id: "distrib_double",
    label: "Développer avec la double distributivité",
    notionId: "distributivite",
    prerequis: ["distrib_simple"],
  },
  {
    id: "distrib_reduire",
    label: "Réduire une expression après développement",
    notionId: "distributivite",
    prerequis: ["distrib_double"],
  },
  {
    id: "distrib_reconnaitre",
    label: "Reconnaître une forme à développer",
    notionId: "distributivite",
    prerequis: ["distrib_simple"],
  },
  {
    id: "distrib_defis",
    label: "Défis sur la distributivité",
    notionId: "distributivite",
    prerequis: ["distrib_reduire", "distrib_reconnaitre"],
  },


  /* =========================
     IDENTITÉS REMARQUABLES
  ========================= */
  {
    id: "ir_lier_distributivite",
    label: "Comprendre qu’une identité remarquable vient de la double distributivité",
    notionId: "identites_remarquables",
    prerequis: ["distrib_double"],
  },
  {
    id: "ir_reconnaitre",
    label: "Reconnaître une forme d’identité remarquable",
    notionId: "identites_remarquables",
    prerequis: ["ir_lier_distributivite"],
  },
  {
    id: "ir_developper",
    label: "Développer une expression en utilisant le lien avec la double distributivité",
    notionId: "identites_remarquables",
    prerequis: ["ir_reconnaitre", "ir_lier_distributivite"],
  },
  {
    id: "ir_choisir",
    label: "Choisir la bonne méthode entre double distributivité et identité remarquable",
    notionId: "identites_remarquables",
    prerequis: ["ir_reconnaitre", "ir_developper"],
  },
  {
    id: "ir_defis",
    label: "Défis sur les identités remarquables et leurs erreurs fréquentes",
    notionId: "identites_remarquables",
    prerequis: ["ir_choisir", "ir_developper"],
  },

  /* =========================
     FACTORISATION
  ========================= */
  {
    id: "facteur_commun",
    label: "Repérer un facteur commun",
    notionId: "factorisation",
    prerequis: ["distrib_simple"],
  },
  {
    id: "factoriser_simple",
    label: "Factoriser une expression simple",
    notionId: "factorisation",
    prerequis: ["facteur_commun"],
  },
  {
    id: "factoriser_ir",
    label: "Factoriser avec une identité remarquable",
    notionId: "factorisation",
    prerequis: ["factoriser_simple", "ir_reconnaitre"],
  },
  {
    id: "factoriser_verifier",
    label: "Vérifier une factorisation par développement",
    notionId: "factorisation",
    prerequis: ["factoriser_simple", "distrib_simple"],
  },
  {
    id: "factorisation_defis",
    label: "Défis sur la factorisation",
    notionId: "factorisation",
    prerequis: ["factoriser_ir", "factoriser_verifier"],
  },

  /* =========================
     ÉQUATIONS
  ========================= */
  {
    id: "equation_reconnaitre",
    label: "Reconnaître une équation",
    notionId: "equations",
    prerequis: [],
  },
  {
    id: "equation_traduire",
    label: "Traduire un problème par une équation",
    notionId: "equations",
    prerequis: ["equation_reconnaitre", "expr_litterale_traduire"],
  },
  {
    id: "equation_resoudre_simple",
    label: "Résoudre une équation simple",
    notionId: "equations",
    prerequis: ["equation_reconnaitre", "relatif_calcul"],
  },
  {
    id: "equation_resoudre_reduction",
    label: "Résoudre une équation nécessitant réduction",
    notionId: "equations",
    prerequis: ["equation_resoudre_simple", "expr_litterale_reduire"],
  },
  {
    id: "equation_resoudre_distributivite",
    label: "Résoudre une équation avec distributivité",
    notionId: "equations",
    prerequis: ["equation_resoudre_simple", "distrib_simple"],
  },
  {
    id: "equation_verifier",
    label: "Vérifier la solution d’une équation",
    notionId: "equations",
    prerequis: ["equation_resoudre_simple", "expr_litterale_substituer"],
  },
  {
    id: "equation_probleme",
    label: "Résoudre un problème à l’aide d’une équation",
    notionId: "equations",
    prerequis: [
      "equation_traduire",
      "equation_resoudre_reduction",
      "equation_verifier",
    ],
  },
  {
    id: "equation_defis",
    label: "Défis sur les équations",
    notionId: "equations",
    prerequis: ["equation_probleme", "equation_resoudre_distributivite"],
  },

  /* =========================
     PYTHAGORE
   /* ====================== */
  {
    id: "pythagore_carres_racines",
    label: "Utiliser les carrés et les racines carrées",
    notionId: "pythagore",
    prerequis: ["relatif_calcul"],
  },
  {
    id: "pythagore_reconnaitre",
    label: "Reconnaître un triangle rectangle et son hypoténuse",
    notionId: "pythagore",
    prerequis: [],
  },
  {
    id: "pythagore_calculer_hypotenuse",
    label: "Calculer l’hypoténuse avec le théorème de Pythagore",
    notionId: "pythagore",
    prerequis: ["pythagore_carres_racines", "pythagore_reconnaitre"],
  },
  {
    id: "pythagore_calculer_cote",
    label: "Calculer un côté de l’angle droit avec le théorème de Pythagore",
    notionId: "pythagore",
    prerequis: ["pythagore_carres_racines", "pythagore_reconnaitre"],
  },
  {
    id: "pythagore_reciproque_verifier",
    label: "Vérifier une égalité de Pythagore avec trois longueurs",
    notionId: "pythagore",
    prerequis: ["pythagore_carres_racines"],
  },
  {
    id: "pythagore_reciproque_conclure",
    label: "Utiliser la réciproque pour conclure qu’un triangle est rectangle",
    notionId: "pythagore",
    prerequis: ["pythagore_reciproque_verifier"],
  },
  {
    id: "pythagore_rediger",
    label: "Rédiger une justification avec Pythagore ou sa réciproque",
    notionId: "pythagore",
    prerequis: [
      "pythagore_calculer_hypotenuse",
      "pythagore_calculer_cote",
      "pythagore_reciproque_conclure",
    ],
  },
  {
    id: "pythagore_defis",
    label: "Défis sur Pythagore et sa réciproque",
    notionId: "pythagore",
    prerequis: ["pythagore_rediger"],
  },

/* =========================
   THALÈS
========================= */
    {
      id: "thales_configuration",
      label: "Reconnaître une configuration de Thalès",
      notionId: "thales",
      prerequis: [],
    },
    {
      id: "thales_rapports",
      label: "Écrire les rapports de longueurs dans une configuration de Thalès",
      notionId: "thales",
      prerequis: ["thales_configuration", "prop_table"],
    },
    {
      id: "thales_calculer_longueur",
      label: "Calculer une longueur avec le théorème de Thalès",
      notionId: "thales",
      prerequis: ["thales_rapports", "prop_quatrieme"],
    },
    {
      id: "thales_reciproque_verifier",
      label: "Vérifier une égalité de rapports pour utiliser la réciproque de Thalès",
      notionId: "thales",
      prerequis: ["thales_rapports"],
    },
    {
      id: "thales_reciproque_conclure",
      label: "Utiliser la réciproque de Thalès pour conclure à un parallélisme",
      notionId: "thales",
      prerequis: ["thales_reciproque_verifier"],
    },
    {
      id: "thales_rediger",
      label: "Rédiger une justification avec Thalès ou sa réciproque",
      notionId: "thales",
      prerequis: ["thales_calculer_longueur", "thales_reciproque_conclure"],
    },
    {
      id: "thales_defis",
      label: "Défis sur Thalès et sa réciproque",
      notionId: "thales",
      prerequis: ["thales_rediger"],
    },

  /* =========================
     PARALLÉLOGRAMMES
  ========================= */
  {
    id: "para_reconnaitre",
    label: "Reconnaître un parallélogramme",
    notionId: "parallelogrammes",
    prerequis: [],
  },
  {
    id: "para_proprietes",
    label: "Utiliser les propriétés d’un parallélogramme",
    notionId: "parallelogrammes",
    prerequis: ["para_reconnaitre"],
  },
  {
    id: "para_diagonales",
    label: "Utiliser les diagonales d’un parallélogramme",
    notionId: "parallelogrammes",
    prerequis: ["para_proprietes"],
  },
  {
    id: "para_montrer",
    label: "Montrer qu’un quadrilatère est un parallélogramme",
    notionId: "parallelogrammes",
    prerequis: ["para_proprietes", "para_diagonales"],
  },
  {
    id: "para_aire",
    label: "Calculer l’aire d’un parallélogramme",
    notionId: "parallelogrammes",
    prerequis: ["para_reconnaitre"],
  },
  {
    id: "para_probleme",
    label: "Résoudre un problème avec un parallélogramme",
    notionId: "parallelogrammes",
    prerequis: ["para_montrer", "para_aire"],
  },
  {
    id: "para_defis",
    label: "Défis sur les parallélogrammes",
    notionId: "parallelogrammes",
    prerequis: ["para_probleme"],
  },

  /* =========================
     TRANSFORMATIONS
  ========================= */
  {
    id: "transfo_symetrie_axiale",
    label: "Réactiver la symétrie axiale",
    notionId: "transformations",
    prerequis: [],
  },
  {
    id: "transfo_symetrie_centrale",
    label: "Utiliser la symétrie centrale",
    notionId: "transformations",
    prerequis: ["transfo_symetrie_axiale"],
  },
  {
    id: "transfo_rotation",
    label: "Reconnaître et utiliser une rotation",
    notionId: "transformations",
    prerequis: ["transfo_symetrie_centrale"],
  },
  {
    id: "transfo_proprietes",
    label: "Utiliser les propriétés des transformations",
    notionId: "transformations",
    prerequis: [
      "transfo_symetrie_centrale",
      "transfo_rotation",
    ],
  },
  {
    id: "transfo_defis",
    label: "Défis sur les transformations",
    notionId: "transformations",
    prerequis: ["transfo_proprietes"],
  },

  /* =========================
     PÉRIMÈTRES
  ========================= */
  {
    id: "perimetre_comprendre",
    label: "Comprendre ce qu’est un périmètre",
    notionId: "perimetres",
    prerequis: [],
  },
  {
    id: "perimetre_rectangle",
    label: "Calculer le périmètre d’un rectangle",
    notionId: "perimetres",
    prerequis: ["perimetre_comprendre"],
  },
  {
    id: "perimetre_carre",
    label: "Calculer le périmètre d’un carré",
    notionId: "perimetres",
    prerequis: ["perimetre_comprendre"],
  },
  {
    id: "perimetre_triangle",
    label: "Calculer le périmètre d’un triangle",
    notionId: "perimetres",
    prerequis: ["perimetre_comprendre"],
  },
  {
    id: "perimetre_figure",
    label: "Calculer le périmètre d’une figure",
    notionId: "perimetres",
    prerequis: [
      "perimetre_rectangle",
      "perimetre_carre",
      "perimetre_triangle",
    ],
  },
  {
    id: "perimetre_probleme",
    label: "Résoudre un problème de périmètre",
    notionId: "perimetres",
    prerequis: ["perimetre_figure"],
  },
  {
    id: "perimetre_defis",
    label: "Défis sur les périmètres",
    notionId: "perimetres",
    prerequis: ["perimetre_probleme"],
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
    id: "aire_rectangle",
    label: "Calculer l’aire d’un rectangle",
    notionId: "aires",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_carre",
    label: "Calculer l’aire d’un carré",
    notionId: "aires",
    prerequis: ["aire_comprendre"],
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
    id: "aire_figure",
    label: "Calculer l’aire d’une figure",
    notionId: "aires",
    prerequis: [
      "aire_rectangle",
      "aire_carre",
      "aire_triangle",
      "aire_parallelogramme",
    ],
  },
  {
    id: "aire_probleme",
    label: "Résoudre un problème d’aire",
    notionId: "aires",
    prerequis: ["aire_figure"],
  },
  {
    id: "aire_defis",
    label: "Défis sur les aires",
    notionId: "aires",
    prerequis: ["aire_probleme"],
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
  id: "volume_lien_aire",
  label: "Faire le lien entre aire de base et volume",
  notionId: "volumes",
  prerequis: ["volume_comprendre"],
},
{
  id: "volume_pave",
  label: "Calculer le volume d’un pavé droit",
  notionId: "volumes",
  prerequis: ["volume_lien_aire"],
},
{
  id: "volume_prisme",
  label: "Calculer le volume d’un prisme",
  notionId: "volumes",
  prerequis: ["volume_lien_aire"],
},
{
  id: "volume_cylindre",
  label: "Calculer le volume d’un cylindre",
  notionId: "volumes",
  prerequis: ["volume_lien_aire"],
},
{
  id: "volume_unites",
  label: "Utiliser les unités de volume",
  notionId: "volumes",
  prerequis: ["volume_comprendre"],
},
{
  id: "volume_defis",
  label: "Défis sur les volumes",
  notionId: "volumes",
  prerequis: [
    "volume_pave",
    "volume_prisme",
    "volume_cylindre",
    "volume_unites",
  ],
},

/* =========================
   STATISTIQUES
========================= */
  {
    id: "stat_lire_tableau",
    label: "Lire un tableau statistique",
    notionId: "statistiques",
    prerequis: [],
  },
  {
    id: "stat_lire_graphique",
    label: "Lire un graphique statistique",
    notionId: "statistiques",
    prerequis: ["stat_lire_tableau"],
  },
  {
    id: "stat_effectif",
    label: "Déterminer un effectif",
    notionId: "statistiques",
    prerequis: ["stat_lire_tableau"],
  },
  {
    id: "stat_frequence",
    label: "Calculer une fréquence",
    notionId: "statistiques",
    prerequis: ["stat_effectif"],
  },
  {
    id: "stat_moyenne",
    label: "Calculer une moyenne",
    notionId: "statistiques",
    prerequis: ["stat_effectif", "relatif_calcul"],
  },
  {
    id: "stat_mediane",
    label: "Déterminer une médiane",
    notionId: "statistiques",
    prerequis: ["stat_effectif"],
  },
  {
    id: "stat_etendue",
    label: "Calculer l’étendue d’une série statistique",
    notionId: "statistiques",
    prerequis: ["stat_lire_tableau"],
  },
  {
    id: "stat_interpretation",
    label: "Interpréter des indicateurs statistiques",
    notionId: "statistiques",
    prerequis: [
      "stat_moyenne",
      "stat_mediane",
      "stat_etendue",
    ],
  },
  {
    id: "stat_probleme",
    label: "Résoudre un problème statistique",
    notionId: "statistiques",
    prerequis: ["stat_interpretation"],
  },
  {
    id: "stat_defis",
    label: "Défis sur les statistiques",
    notionId: "statistiques",
    prerequis: ["stat_probleme"],
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
    id: "proba_evenements",
    label: "Reconnaître un événement certain, impossible ou contraire",
    notionId: "probabilites",
    prerequis: ["proba_vocabulaire", "proba_issues"],
  },
  {
    id: "proba_equiprobabilite",
    label: "Reconnaître une situation d’équiprobabilité",
    notionId: "probabilites",
    prerequis: ["proba_issues"],
  },
  {
    id: "proba_calculer_fraction",
    label: "Calculer une probabilité simple sous forme de fraction",
    notionId: "probabilites",
    prerequis: ["proba_issues", "proba_equiprobabilite", "fraction_comparer"],
  },
  {
    id: "proba_convertir",
    label: "Exprimer une probabilité sous forme décimale ou en pourcentage",
    notionId: "probabilites",
    prerequis: ["proba_calculer_fraction", "prop_pourcentage"],
  },
  {
    id: "proba_comparer",
    label: "Comparer des probabilités simples",
    notionId: "probabilites",
    prerequis: ["proba_calculer_fraction", "fraction_comparer"],
  },
  {
    id: "proba_defis",
    label: "Défis sur les probabilités",
    notionId: "probabilites",
    prerequis: [
      "proba_evenements",
      "proba_convertir",
      "proba_comparer",
    ],
  },

  /* =========================
   ALGORITHMIQUE
========================= */

{
  id: "algo_conditions",
  label: "Représenter des conditions simples",
  notionId: "algorithmique",
  prerequis: [],
},

{
  id: "algo_instructions_conditionnelles",
  label: "Écrire des instructions conditionnelles",
  notionId: "algorithmique",
  prerequis: ["algo_conditions"],
},

{
  id: "algo_variable",
  label: "Manipuler une variable informatique",
  notionId: "algorithmique",
  prerequis: ["algo_instructions_conditionnelles"],
},

{
  id: "algo_programme_objectif",
  label: "Écrire un programme simple pour répondre à un problème",
  notionId: "algorithmique",
  prerequis: [
    "algo_variable",
    "algo_instructions_conditionnelles",
  ],
},

{
  id: "algo_modifier_programme",
  label: "Modifier un programme pour changer ou améliorer son comportement",
  notionId: "algorithmique",
  prerequis: ["algo_programme_objectif"],
},

{
  id: "algo_defis",
  label: "Défis d’algorithmique et de programmation",
  notionId: "algorithmique",
  prerequis: [
    "algo_conditions",
    "algo_instructions_conditionnelles",
    "algo_variable",
    "algo_programme_objectif",
    "algo_modifier_programme",
  ],
},
];