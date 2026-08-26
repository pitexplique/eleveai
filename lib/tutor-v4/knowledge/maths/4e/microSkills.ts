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
  notionId: "relatif_operation",
  prerequis: [],
},
{
  id: "relatif_soustraction",
  label: "Soustraire des nombres relatifs",
  notionId: "relatif_operation",
  prerequis: ["relatif_addition"],
},
{
  id: "relatif_multiplication",
  label: "Multiplier des nombres relatifs",
  notionId: "relatif_operation",
  prerequis: ["relatif_addition"],
},
{
  id: "relatif_division",
  label: "Diviser des nombres relatifs",
  notionId: "relatif_operation",
  prerequis: ["relatif_multiplication"],
},
{
  id: "relatif_calcul",
  label: "Effectuer des calculs avec des nombres relatifs",
  notionId: "relatif_operation",
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
  notionId: "relatif_operation",
  prerequis: ["relatif_calcul"],
},
{
  id: "relatif_operation_defi",
  label: "Défis sur les opérations avec les relatifs",
  notionId: "relatif_operation",
  prerequis: ["relatif_probleme"],
},

  /// Fractions //
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

  // 👉 ICI
  {
    id: "fraction_decimal",
    label: "Passer d’une fraction à un nombre décimal",
    notionId: "fraction_nombre",
    prerequis: ["fraction_simplifier"],
  },

  {
    id: "fraction_rationnel",
    label: "Reconnaître qu’un nombre est rationnel et passer d’une écriture à une autre",
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
    id: "fraction_additionner",
    label: "Additionner des fractions",
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
    label: "Utiliser une fraction comme quantité",
    notionId: "fraction_calcul",
    prerequis: ["fraction_comparer", "fraction_multiplier"],
  },
  {
    id: "fraction_inverse",
    label: "Déterminer l’inverse d’une fraction",
    notionId: "fraction_calcul",
    prerequis: ["fraction_simplifier", "fraction_rationnel"],
  },
  {
    id: "fraction_diviser",
    label: "Diviser des fractions",
    notionId: "fraction_calcul",
    prerequis: ["fraction_inverse", "fraction_multiplier"],
  },
  {
    id: "fraction_oppose",
    label: "Déterminer l’opposé d’une fraction",
    notionId: "fraction_calcul",
    prerequis: ["fraction_rationnel", "relatif_multiplication"],
  },
  {
    id: "fraction_defi",
    label: "Défis sur les fractions",
    notionId: "fraction_calcul",
    prerequis: ["fraction_quantite", "fraction_diviser", "fraction_oppose"],
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
    id: "prop_coeff",
    label: "Utiliser un coefficient de proportionnalité ou un passage à l’unité",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_quatrieme",
    label: "Calculer une quatrième proportionnelle",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_table", "prop_coeff"],
  },
  {
    id: "prop_pourcentage",
    label: "Calculer et interpréter un pourcentage",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_coeff"],
  },
  {
    id: "prop_coeff_multiplicateur",
    label: "Utiliser un coefficient multiplicateur",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_pourcentage", "prop_coeff"],
  },
  {
    id: "prop_evolution",
    label: "Interpréter une évolution en pourcentage",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_pourcentage", "prop_coeff_multiplicateur"],
  },
  {
    id: "prop_probleme",
    label: "Résoudre un problème de proportionnalité",
    notionId: "prop_proportionnalite",
    prerequis: [
      "prop_quatrieme",
      "prop_coeff",
      "prop_pourcentage",
      "prop_evolution",
    ],
  },
  {
    id: "prop_defi",
    label: "Défis sur la proportionnalité et les pourcentages",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_evolution", "prop_probleme"],
  },

  /* =========================
     EXPRESSIONS LITTÉRALES
  ========================= */
  {
    id: "litteral_expression_comprendre",
    label: "Comprendre une expression littérale",
    notionId: "litteral_expression",
    prerequis: [],
  },
  {
    id: "litteral_expression_traduire",
    label: "Traduire une phrase ou une situation en expression littérale",
    notionId: "litteral_expression",
    prerequis: ["litteral_expression_comprendre"],
  },
  {
    id: "litteral_expression_substituer",
    label: "Calculer la valeur d’une expression littérale pour une valeur donnée",
    notionId: "litteral_expression",
    prerequis: ["litteral_expression_comprendre"],
  },
  {
    id: "litteral_expression_reduire",
    label: "Réduire une expression littérale",
    notionId: "litteral_expression",
    prerequis: ["litteral_expression_comprendre"],
  },
  {
    id: "litteral_expression_defi",
    label: "Défis sur les expressions littérales",
    notionId: "litteral_expression",
    prerequis: [
      "litteral_expression_traduire",
      "litteral_expression_substituer",
      "litteral_expression_reduire",
    ],
  },

  /* =========================
     DISTRIBUTIVITÉ
  ========================= */
  {
    id: "litteral_distributivite_simple",
    label: "Développer avec la distributivité simple",
    notionId: "litteral_distributivite",
    prerequis: ["litteral_expression_reduire"],
  },
  {
    id: "litteral_distributivite_double",
    label: "Développer avec la double distributivité",
    notionId: "litteral_distributivite",
    prerequis: ["litteral_distributivite_simple"],
  },
  {
    id: "litteral_distributivite_reduire",
    label: "Réduire une expression après développement",
    notionId: "litteral_distributivite",
    prerequis: ["litteral_distributivite_double"],
  },
  {
    id: "litteral_distributivite_reconnaitre",
    label: "Reconnaître une forme à développer",
    notionId: "litteral_distributivite",
    prerequis: ["litteral_distributivite_simple"],
  },
  {
    id: "litteral_distributivite_defi",
    label: "Défis sur la distributivité",
    notionId: "litteral_distributivite",
    prerequis: ["litteral_distributivite_reduire", "litteral_distributivite_reconnaitre"],
  },


  /* =========================
     IDENTITÉS REMARQUABLES
  ========================= */
  {
    id: "litteral_identite_lier_distributivite",
    label: "Comprendre qu’une identité remarquable vient de la double distributivité",
    notionId: "litteral_identite_remarquable",
    prerequis: ["litteral_distributivite_double"],
  },
  {
    id: "litteral_identite_reconnaitre",
    label: "Reconnaître une forme d’identité remarquable",
    notionId: "litteral_identite_remarquable",
    prerequis: ["litteral_identite_lier_distributivite"],
  },
  {
    id: "litteral_identite_developper",
    label: "Développer une expression en utilisant le lien avec la double distributivité",
    notionId: "litteral_identite_remarquable",
    prerequis: ["litteral_identite_reconnaitre", "litteral_identite_lier_distributivite"],
  },
  {
    id: "litteral_identite_choisir",
    label: "Choisir la bonne méthode entre double distributivité et identité remarquable",
    notionId: "litteral_identite_remarquable",
    prerequis: ["litteral_identite_reconnaitre", "litteral_identite_developper"],
  },
  {
    id: "litteral_identite_defi",
    label: "Défis sur les identités remarquables et leurs erreurs fréquentes",
    notionId: "litteral_identite_remarquable",
    prerequis: ["litteral_identite_choisir", "litteral_identite_developper"],
  },

  /* =========================
     FACTORISATION
  ========================= */
  {
    id: "litteral_facteur_commun",
    label: "Repérer un facteur commun",
    notionId: "litteral_factorisation",
    prerequis: ["litteral_distributivite_simple"],
  },
  {
    id: "litteral_factoriser_simple",
    label: "Factoriser une expression simple",
    notionId: "litteral_factorisation",
    prerequis: ["litteral_facteur_commun"],
  },
  {
    id: "litteral_factoriser_identite",
    label: "Factoriser avec une identité remarquable",
    notionId: "litteral_factorisation",
    prerequis: ["litteral_factoriser_simple", "litteral_identite_reconnaitre"],
  },
  {
    id: "litteral_factoriser_verifier",
    label: "Vérifier une factorisation par développement",
    notionId: "litteral_factorisation",
    prerequis: ["litteral_factoriser_simple", "litteral_distributivite_simple"],
  },
  {
    id: "litteral_factorisation_defi",
    label: "Défis sur la factorisation",
    notionId: "litteral_factorisation",
    prerequis: ["litteral_factoriser_identite", "litteral_factoriser_verifier"],
  },

  /* =========================
     ÉQUATIONS
  ========================= */
  {
    id: "equation_reconnaitre",
    label: "Reconnaître une équation",
    notionId: "equation_resolution",
    prerequis: [],
  },
  {
    id: "equation_traduire",
    label: "Traduire un problème par une équation",
    notionId: "equation_resolution",
    prerequis: ["equation_reconnaitre", "litteral_expression_traduire"],
  },
  {
    id: "equation_resoudre_simple",
    label: "Résoudre une équation simple",
    notionId: "equation_resolution",
    prerequis: ["equation_reconnaitre", "relatif_calcul"],
  },
  {
    id: "equation_resoudre_reduction",
    label: "Résoudre une équation nécessitant réduction",
    notionId: "equation_resolution",
    prerequis: ["equation_resoudre_simple", "litteral_expression_reduire"],
  },
  {
    id: "equation_resoudre_distributivite",
    label: "Résoudre une équation avec distributivité",
    notionId: "equation_resolution",
    prerequis: ["equation_resoudre_simple", "litteral_distributivite_simple"],
  },
  {
    id: "equation_verifier",
    label: "Vérifier la solution d’une équation",
    notionId: "equation_resolution",
    prerequis: ["equation_resoudre_simple", "litteral_expression_substituer"],
  },
  {
    id: "equation_probleme",
    label: "Résoudre un problème à l’aide d’une équation",
    notionId: "equation_resolution",
    prerequis: [
      "equation_traduire",
      "equation_resoudre_reduction",
      "equation_verifier",
    ],
  },
  {
    id: "equation_defi",
    label: "Défis sur les équations",
    notionId: "equation_resolution",
    prerequis: ["equation_probleme", "equation_resoudre_distributivite"],
  },

  /* =========================
     PYTHAGORE
   /* ====================== */
  {
    id: "pythagore_carre_racine",
    label: "Utiliser les carrés et les racines carrées",
    notionId: "pythagore_theoreme",
    prerequis: ["relatif_calcul"],
  },
  {
    id: "pythagore_reconnaitre",
    label: "Reconnaître un triangle rectangle et son hypoténuse",
    notionId: "pythagore_theoreme",
    prerequis: [],
  },
  {
    id: "pythagore_calculer_hypotenuse",
    label: "Calculer l’hypoténuse avec le théorème de Pythagore",
    notionId: "pythagore_theoreme",
    prerequis: ["pythagore_carre_racine", "pythagore_reconnaitre"],
  },
  {
    id: "pythagore_calculer_cote",
    label: "Calculer un côté de l’angle droit avec le théorème de Pythagore",
    notionId: "pythagore_theoreme",
    prerequis: ["pythagore_carre_racine", "pythagore_reconnaitre"],
  },
  {
    id: "pythagore_reciproque_verifier",
    label: "Vérifier une égalité de Pythagore avec trois longueurs",
    notionId: "pythagore_theoreme",
    prerequis: ["pythagore_carre_racine"],
  },
  {
    id: "pythagore_reciproque_conclure",
    label: "Utiliser la réciproque pour conclure qu’un triangle est rectangle",
    notionId: "pythagore_theoreme",
    prerequis: ["pythagore_reciproque_verifier"],
  },
  {
    id: "pythagore_rediger",
    label: "Rédiger une justification avec Pythagore ou sa réciproque",
    notionId: "pythagore_theoreme",
    prerequis: [
      "pythagore_calculer_hypotenuse",
      "pythagore_calculer_cote",
      "pythagore_reciproque_conclure",
    ],
  },
  {
    id: "pythagore_defi",
    label: "Défis sur Pythagore et sa réciproque",
    notionId: "pythagore_theoreme",
    prerequis: ["pythagore_rediger"],
  },

/* =========================
   THALÈS
========================= */
    {
      id: "thales_configuration",
      label: "Reconnaître une configuration de Thalès",
      notionId: "thales_theoreme",
      prerequis: [],
    },
    {
      id: "thales_rapport",
      label: "Écrire les rapports de longueurs dans une configuration de Thalès",
      notionId: "thales_theoreme",
      prerequis: ["thales_configuration", "prop_table"],
    },
    {
      id: "thales_calculer_longueur",
      label: "Calculer une longueur avec le théorème de Thalès",
      notionId: "thales_theoreme",
      prerequis: ["thales_rapport", "prop_quatrieme"],
    },
    {
      id: "thales_reciproque_verifier",
      label: "Vérifier une égalité de rapports pour utiliser la réciproque de Thalès",
      notionId: "thales_theoreme",
      prerequis: ["thales_rapport"],
    },
    {
      id: "thales_reciproque_conclure",
      label: "Utiliser la réciproque de Thalès pour conclure à un parallélisme",
      notionId: "thales_theoreme",
      prerequis: ["thales_reciproque_verifier"],
    },
    {
      id: "thales_rediger",
      label: "Rédiger une justification avec Thalès ou sa réciproque",
      notionId: "thales_theoreme",
      prerequis: ["thales_calculer_longueur", "thales_reciproque_conclure"],
    },
    {
      id: "thales_defi",
      label: "Défis sur Thalès et sa réciproque",
      notionId: "thales_theoreme",
      prerequis: ["thales_rediger"],
    },

  /* =========================
     COSINUS (triangle rectangle)
  ========================= */
  {
    id: "cos_cotes",
    label: "Identifier l’hypoténuse et le côté adjacent à un angle dans un triangle rectangle",
    notionId: "trigo_cosinus",
    prerequis: ["pythagore_reconnaitre"],
  },
  {
    id: "cos_definition",
    label: "Connaître et écrire la définition du cosinus d’un angle aigu",
    notionId: "trigo_cosinus",
    prerequis: ["cos_cotes"],
  },
  {
    id: "cos_calculer_longueur",
    label: "Calculer une longueur (côté adjacent ou hypoténuse) avec le cosinus",
    notionId: "trigo_cosinus",
    prerequis: ["cos_definition"],
  },
  {
    id: "cos_calculer_angle",
    label: "Calculer la mesure d’un angle avec le cosinus (cos⁻¹)",
    notionId: "trigo_cosinus",
    prerequis: ["cos_definition"],
  },
  {
    id: "cos_probleme",
    label: "Résoudre un problème concret avec le cosinus",
    notionId: "trigo_cosinus",
    prerequis: ["cos_calculer_longueur", "cos_calculer_angle"],
  },
  {
    id: "cos_defi",
    label: "Défis sur le cosinus",
    notionId: "trigo_cosinus",
    prerequis: ["cos_probleme"],
  },

  /* =========================
     PARALLÉLOGRAMMES
  ========================= */
  {
    id: "quadrilatere_parallelogramme_reconnaitre",
    label: "Reconnaître un parallélogramme",
    notionId: "quadrilatere_parallelogramme",
    prerequis: [],
  },
  {
    id: "quadrilatere_parallelogramme_propriete",
    label: "Utiliser les propriétés d’un parallélogramme",
    notionId: "quadrilatere_parallelogramme",
    prerequis: ["quadrilatere_parallelogramme_reconnaitre"],
  },
  {
    id: "quadrilatere_parallelogramme_diagonale",
    label: "Utiliser les diagonales d’un parallélogramme",
    notionId: "quadrilatere_parallelogramme",
    prerequis: ["quadrilatere_parallelogramme_propriete"],
  },
  {
    id: "quadrilatere_parallelogramme_montrer",
    label: "Montrer qu’un quadrilatère est un parallélogramme",
    notionId: "quadrilatere_parallelogramme",
    prerequis: ["quadrilatere_parallelogramme_propriete", "quadrilatere_parallelogramme_diagonale"],
  },
  {
    id: "quadrilatere_parallelogramme_aire",
    label: "Calculer l’aire d’un parallélogramme",
    notionId: "quadrilatere_parallelogramme",
    prerequis: ["quadrilatere_parallelogramme_reconnaitre"],
  },
  {
    id: "quadrilatere_parallelogramme_probleme",
    label: "Résoudre un problème avec un parallélogramme",
    notionId: "quadrilatere_parallelogramme",
    prerequis: ["quadrilatere_parallelogramme_montrer", "quadrilatere_parallelogramme_aire"],
  },
  {
    id: "quadrilatere_parallelogramme_defi",
    label: "Défis sur les parallélogrammes",
    notionId: "quadrilatere_parallelogramme",
    prerequis: ["quadrilatere_parallelogramme_probleme"],
  },

  /* =========================
     TRANSFORMATIONS
  ========================= */
  {
    id: "sym_axiale",
    label: "Réactiver la symétrie axiale",
    notionId: "sym_transformation",
    prerequis: [],
  },
  {
    id: "sym_centrale",
    label: "Utiliser la symétrie centrale",
    notionId: "sym_transformation",
    prerequis: ["sym_axiale"],
  },
  {
    id: "sym_translation",
    label: "Reconnaître et utiliser une translation",
    notionId: "sym_transformation",
    prerequis: ["sym_axiale", "sym_centrale"],
  },
  {
    id: "sym_rotation",
    label: "Reconnaître et utiliser une rotation",
    notionId: "sym_transformation",
    prerequis: ["sym_centrale"],
  },
  {
    id: "sym_transformation_propriete",
    label: "Utiliser les propriétés des transformations",
    notionId: "sym_transformation",
    prerequis: [
      "sym_centrale",
      "sym_rotation",
    ],
  },
  {
    id: "sym_transformation_defi",
    label: "Défis sur les transformations",
    notionId: "sym_transformation",
    prerequis: ["sym_transformation_propriete"],
  },

  /* =========================
     PÉRIMÈTRES
  ========================= */
  {
    id: "aire_perimetre_comprendre",
    label: "Comprendre ce qu’est un périmètre",
    notionId: "aire_perimetre",
    prerequis: [],
  },
  {
    id: "aire_perimetre_rectangle",
    label: "Calculer le périmètre d’un rectangle",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_comprendre"],
  },
  {
    id: "aire_perimetre_carre",
    label: "Calculer le périmètre d’un carré",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_comprendre"],
  },
  {
    id: "aire_perimetre_triangle",
    label: "Calculer le périmètre d’un triangle",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_comprendre"],
  },
  {
    id: "aire_perimetre_figure",
    label: "Calculer le périmètre d’une figure",
    notionId: "aire_perimetre",
    prerequis: [
      "aire_perimetre_rectangle",
      "aire_perimetre_carre",
      "aire_perimetre_triangle",
    ],
  },
  {
    id: "aire_perimetre_probleme",
    label: "Résoudre un problème de périmètre",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_figure"],
  },
  {
    id: "aire_perimetre_defi",
    label: "Défis sur les périmètres",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_probleme"],
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
    id: "aire_rectangle",
    label: "Calculer l’aire d’un rectangle",
    notionId: "aire_surface",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_carre",
    label: "Calculer l’aire d’un carré",
    notionId: "aire_surface",
    prerequis: ["aire_comprendre"],
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
    id: "aire_figure",
    label: "Calculer l’aire d’une figure",
    notionId: "aire_surface",
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
    notionId: "aire_surface",
    prerequis: ["aire_figure"],
  },
  {
    id: "aire_defi",
    label: "Défis sur les aires",
    notionId: "aire_surface",
    prerequis: ["aire_probleme"],
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
  id: "volume_lien_aire",
  label: "Faire le lien entre aire de base et volume",
  notionId: "volume_solide",
  prerequis: ["volume_comprendre"],
},
{
  id: "volume_pave",
  label: "Calculer le volume d’un pavé droit",
  notionId: "volume_solide",
  prerequis: ["volume_lien_aire"],
},
{
  id: "volume_prisme",
  label: "Calculer le volume d’un prisme",
  notionId: "volume_solide",
  prerequis: ["volume_lien_aire"],
},
{
  id: "volume_cylindre",
  label: "Calculer le volume d’un cylindre",
  notionId: "volume_solide",
  prerequis: ["volume_lien_aire"],
},
{
  id: "volume_unite",
  label: "Utiliser les unités de volume",
  notionId: "volume_solide",
  prerequis: ["volume_comprendre"],
},
{
  id: "volume_defi",
  label: "Défis sur les volumes",
  notionId: "volume_solide",
  prerequis: [
    "volume_pave",
    "volume_prisme",
    "volume_cylindre",
    "volume_unite",
  ],
},

/* =========================
   STATISTIQUES
========================= */
  {
    id: "stat_lire_tableau",
    label: "Lire un tableau statistique",
    notionId: "stat_statistique",
    prerequis: [],
  },
  {
    id: "stat_lire_graphique",
    label: "Lire un graphique statistique",
    notionId: "stat_statistique",
    prerequis: ["stat_lire_tableau"],
  },
  {
    id: "stat_effectif",
    label: "Déterminer un effectif",
    notionId: "stat_statistique",
    prerequis: ["stat_lire_tableau"],
  },
  {
    id: "stat_frequence",
    label: "Calculer une fréquence",
    notionId: "stat_statistique",
    prerequis: ["stat_effectif"],
  },
  {
    id: "stat_moyenne",
    label: "Calculer une moyenne",
    notionId: "stat_statistique",
    prerequis: ["stat_effectif", "relatif_calcul"],
  },
  {
    id: "stat_mediane",
    label: "Déterminer une médiane",
    notionId: "stat_statistique",
    prerequis: ["stat_effectif"],
  },
  {
    id: "stat_etendue",
    label: "Calculer l’étendue d’une série statistique",
    notionId: "stat_statistique",
    prerequis: ["stat_lire_tableau"],
  },
  {
    id: "stat_interpreter",
    label: "Interpréter des indicateurs statistiques",
    notionId: "stat_statistique",
    prerequis: [
      "stat_moyenne",
      "stat_mediane",
      "stat_etendue",
    ],
  },
  {
    id: "stat_probleme",
    label: "Résoudre un problème statistique",
    notionId: "stat_statistique",
    prerequis: ["stat_interpreter"],
  },
  {
    id: "stat_defi",
    label: "Défis sur les statistiques",
    notionId: "stat_statistique",
    prerequis: ["stat_probleme"],
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
    id: "proba_evenement",
    label: "Reconnaître un événement certain, impossible ou contraire",
    notionId: "proba_experience",
    prerequis: ["proba_vocabulaire", "proba_issue"],
  },
  {
    id: "proba_equiprobabilite",
    label: "Reconnaître une situation d’équiprobabilité",
    notionId: "proba_experience",
    prerequis: ["proba_issue"],
  },
  {
    id: "proba_calculer_fraction",
    label: "Calculer une probabilité simple sous forme de fraction",
    notionId: "proba_experience",
    prerequis: ["proba_issue", "proba_equiprobabilite", "fraction_comparer"],
  },
  {
    id: "proba_convertir",
    label: "Exprimer une probabilité sous forme décimale ou en pourcentage",
    notionId: "proba_experience",
    prerequis: ["proba_calculer_fraction", "prop_pourcentage"],
  },
  {
    id: "proba_comparer",
    label: "Comparer des probabilités simples",
    notionId: "proba_experience",
    prerequis: ["proba_calculer_fraction", "fraction_comparer"],
  },
  {
    id: "proba_defi",
    label: "Défis sur les probabilités",
    notionId: "proba_experience",
    prerequis: [
      "proba_evenement",
      "proba_convertir",
      "proba_comparer",
    ],
  },

  /* =========================
   ALGORITHMIQUE
========================= */

{
  id: "algo_condition",
  label: "Représenter des conditions simples",
  notionId: "algo_programmation",
  prerequis: [],
},

{
  id: "algo_instruction_conditionnelle",
  label: "Écrire des instructions conditionnelles",
  notionId: "algo_programmation",
  prerequis: ["algo_condition"],
},

{
  id: "algo_variable",
  label: "Manipuler une variable informatique",
  notionId: "algo_programmation",
  prerequis: ["algo_instruction_conditionnelle"],
},

{
  id: "algo_programme_objectif",
  label: "Écrire un programme simple pour répondre à un problème",
  notionId: "algo_programmation",
  prerequis: [
    "algo_variable",
    "algo_instruction_conditionnelle",
  ],
},

{
  id: "algo_modifier",
  label: "Modifier un programme pour changer ou améliorer son comportement",
  notionId: "algo_programmation",
  prerequis: ["algo_programme_objectif"],
},

{
  id: "algo_defi",
  label: "Défis d’algorithmique et de programmation",
  notionId: "algo_programmation",
  prerequis: [
    "algo_condition",
    "algo_instruction_conditionnelle",
    "algo_variable",
    "algo_programme_objectif",
    "algo_modifier",
  ],
},
];