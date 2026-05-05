// knowledge/maths/3e/microSkills.ts

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  /* =========================
     NOMBRES RATIONNELS
  ========================= */
  {
    id: "rationnel_reconnaitre",
    label: "Reconnaître un nombre rationnel",
    notionId: "nombres_rationnels",
    prerequis: [],
  },
  {
    id: "rationnel_ecritures",
    label: "Passer d’une écriture fractionnaire à une écriture décimale",
    notionId: "nombres_rationnels",
    prerequis: ["rationnel_reconnaitre"],
  },
  {
    id: "rationnel_comparer",
    label: "Comparer des nombres rationnels",
    notionId: "nombres_rationnels",
    prerequis: ["rationnel_ecritures"],
  },
  {
    id: "rationnel_calculer",
    label: "Calculer avec des nombres rationnels",
    notionId: "nombres_rationnels",
    prerequis: ["rationnel_comparer"],
  },
  {
    id: "rationnel_defis",
    label: "Défis sur les nombres rationnels",
    notionId: "nombres_rationnels",
    prerequis: ["rationnel_calculer"],
  },

  /* =========================
     PUISSANCES
  ========================= */
  {
    id: "puissance_comprendre",
    label: "Comprendre l’écriture d’une puissance",
    notionId: "puissances",
    prerequis: [],
  },
  {
    id: "puissance_calculer",
    label: "Calculer une puissance simple",
    notionId: "puissances",
    prerequis: ["puissance_comprendre"],
  },
  {
    id: "puissance_dix",
    label: "Utiliser les puissances de 10",
    notionId: "puissances",
    prerequis: ["puissance_calculer"],
  },
  {
    id: "puissance_ecriture_scientifique",
    label: "Utiliser l’écriture scientifique",
    notionId: "puissances",
    prerequis: ["puissance_dix"],
  },
  {
    id: "puissance_calculs",
    label: "Effectuer des calculs avec les puissances",
    notionId: "puissances",
    prerequis: ["puissance_calculer", "puissance_dix"],
  },
  {
    id: "puissance_defis",
    label: "Défis sur les puissances",
    notionId: "puissances",
    prerequis: ["puissance_calculs", "puissance_ecriture_scientifique"],
  },

  /* =========================
     RACINE CARRÉE
  ========================= */
  {
    id: "racine_comprendre",
    label: "Comprendre la notion de racine carrée",
    notionId: "racine_carree",
    prerequis: ["puissance_calculer"],
  },
  {
    id: "racine_carres_parfaits",
    label: "Reconnaître les carrés parfaits",
    notionId: "racine_carree",
    prerequis: ["racine_comprendre"],
  },
  {
    id: "racine_calculer",
    label: "Calculer une racine carrée simple",
    notionId: "racine_carree",
    prerequis: ["racine_carres_parfaits"],
  },
  {
    id: "racine_encadrer",
    label: "Encadrer une racine carrée",
    notionId: "racine_carree",
    prerequis: ["racine_carres_parfaits"],
  },
  {
    id: "racine_defis",
    label: "Défis sur les racines carrées",
    notionId: "racine_carree",
    prerequis: ["racine_calculer", "racine_encadrer"],
  },

  /* =========================
     ARITHMÉTIQUE
  ========================= */
  {
    id: "arith_multiple_diviseur",
    label: "Reconnaître un multiple et un diviseur",
    notionId: "arithmetique",
    prerequis: [],
  },
  {
    id: "arith_criteres",
    label: "Utiliser les critères de divisibilité",
    notionId: "arithmetique",
    prerequis: ["arith_multiple_diviseur"],
  },
  {
    id: "arith_nombre_premier",
    label: "Reconnaître un nombre premier",
    notionId: "arithmetique",
    prerequis: ["arith_criteres"],
  },
  {
    id: "arith_decomposer",
    label: "Décomposer un entier en produit de facteurs premiers",
    notionId: "arithmetique",
    prerequis: ["arith_nombre_premier"],
  },
  {
    id: "arith_pgcd_ppcm",
    label: "Utiliser une décomposition pour résoudre un problème de divisibilité",
    notionId: "arithmetique",
    prerequis: ["arith_decomposer"],
  },
  {
    id: "arith_defis",
    label: "Défis sur l’arithmétique",
    notionId: "arithmetique",
    prerequis: ["arith_pgcd_ppcm"],
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
    label: "Utiliser un tableau de proportionnalité",
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
    id: "prop_pourcentage",
    label: "Calculer et interpréter un pourcentage",
    notionId: "proportionnalite",
    prerequis: ["prop_quatrieme"],
  },
  {
    id: "prop_evolution",
    label: "Interpréter une augmentation ou une diminution en pourcentage",
    notionId: "proportionnalite",
    prerequis: ["prop_pourcentage"],
  },
  {
    id: "prop_vitesse_debit",
    label: "Résoudre un problème de vitesse, débit ou densité",
    notionId: "proportionnalite",
    prerequis: ["prop_quatrieme"],
  },
  {
    id: "prop_defis",
    label: "Défis sur la proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["prop_evolution", "prop_vitesse_debit"],
  },

  /* =========================
     CALCUL LITTÉRAL
  ========================= */
  {
    id: "litteral_comprendre",
    label: "Comprendre une expression littérale",
    notionId: "calcul_litteral",
    prerequis: [],
  },
  {
    id: "litteral_substituer",
    label: "Calculer la valeur d’une expression littérale",
    notionId: "calcul_litteral",
    prerequis: ["litteral_comprendre"],
  },
  {
    id: "litteral_reduire",
    label: "Réduire une expression littérale",
    notionId: "calcul_litteral",
    prerequis: ["litteral_comprendre"],
  },
  {
    id: "litteral_developper",
    label: "Développer une expression",
    notionId: "calcul_litteral",
    prerequis: ["litteral_reduire"],
  },
  {
    id: "litteral_factoriser",
    label: "Factoriser une expression",
    notionId: "calcul_litteral",
    prerequis: ["litteral_developper"],
  },
  {
    id: "litteral_identites",
    label: "Utiliser les identités remarquables",
    notionId: "calcul_litteral",
    prerequis: ["litteral_developper", "litteral_factoriser"],
  },
  {
    id: "litteral_defis",
    label: "Défis sur le calcul littéral",
    notionId: "calcul_litteral",
    prerequis: ["litteral_identites"],
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
    id: "equation_resoudre_simple",
    label: "Résoudre une équation du premier degré simple",
    notionId: "equations",
    prerequis: ["equation_reconnaitre"],
  },
  {
    id: "equation_resoudre_developper",
    label: "Résoudre une équation avec développement ou réduction",
    notionId: "equations",
    prerequis: ["equation_resoudre_simple", "litteral_developper"],
  },
  {
    id: "equation_produit_nul",
    label: "Résoudre une équation produit nul",
    notionId: "equations",
    prerequis: ["litteral_factoriser"],
  },
  {
    id: "equation_verifier",
    label: "Vérifier une solution d’équation",
    notionId: "equations",
    prerequis: ["equation_resoudre_simple", "litteral_substituer"],
  },
  {
    id: "equation_probleme",
    label: "Résoudre un problème à l’aide d’une équation",
    notionId: "equations",
    prerequis: ["equation_resoudre_developper", "equation_verifier"],
  },
  {
    id: "equation_defis",
    label: "Défis sur les équations",
    notionId: "equations",
    prerequis: ["equation_probleme", "equation_produit_nul"],
  },

  /* =========================
     FONCTIONS
  ========================= */
  {
    id: "fonction_vocabulaire",
    label: "Comprendre le vocabulaire des fonctions",
    notionId: "fonctions",
    prerequis: [],
  },
  {
    id: "fonction_image",
    label: "Calculer ou lire une image",
    notionId: "fonctions",
    prerequis: ["fonction_vocabulaire"],
  },
  {
    id: "fonction_antecedent",
    label: "Déterminer ou lire un antécédent",
    notionId: "fonctions",
    prerequis: ["fonction_image"],
  },
  {
    id: "fonction_tableau",
    label: "Utiliser un tableau de valeurs",
    notionId: "fonctions",
    prerequis: ["fonction_image"],
  },
  {
    id: "fonction_graphique",
    label: "Lire et interpréter la représentation graphique d’une fonction",
    notionId: "fonctions",
    prerequis: ["fonction_image", "fonction_antecedent"],
  },
  {
    id: "fonction_affine_lineaire",
    label: "Reconnaître et utiliser une fonction linéaire ou affine",
    notionId: "fonctions",
    prerequis: ["fonction_graphique", "prop_reconnaitre"],
  },
  {
    id: "fonction_defis",
    label: "Défis sur les fonctions",
    notionId: "fonctions",
    prerequis: ["fonction_affine_lineaire"],
  },

  /* =========================
     TRIANGLES
  ========================= */
  {
    id: "triangle_reconnaitre",
    label: "Reconnaître les triangles usuels",
    notionId: "triangles",
    prerequis: [],
  },
  {
    id: "triangle_angles",
    label: "Utiliser la somme des angles d’un triangle",
    notionId: "triangles",
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "triangle_inegalite",
    label: "Utiliser l’inégalité triangulaire",
    notionId: "triangles",
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "triangle_construire",
    label: "Construire ou analyser un triangle à partir de données",
    notionId: "triangles",
    prerequis: ["triangle_angles", "triangle_inegalite"],
  },
  {
    id: "triangle_defis",
    label: "Défis sur les triangles",
    notionId: "triangles",
    prerequis: ["triangle_construire"],
  },

  /* =========================
     PYTHAGORE
  ========================= */
  {
    id: "pythagore_reconnaitre",
    label: "Reconnaître un triangle rectangle et son hypoténuse",
    notionId: "pythagore",
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "pythagore_calculer_hypotenuse",
    label: "Calculer l’hypoténuse avec le théorème de Pythagore",
    notionId: "pythagore",
    prerequis: ["pythagore_reconnaitre", "racine_calculer"],
  },
  {
    id: "pythagore_calculer_cote",
    label: "Calculer un côté de l’angle droit",
    notionId: "pythagore",
    prerequis: ["pythagore_reconnaitre", "racine_calculer"],
  },
  {
    id: "pythagore_reciproque",
    label: "Utiliser la réciproque du théorème de Pythagore",
    notionId: "pythagore",
    prerequis: ["pythagore_reconnaitre"],
  },
  {
    id: "pythagore_rediger",
    label: "Rédiger une justification avec Pythagore",
    notionId: "pythagore",
    prerequis: [
      "pythagore_calculer_hypotenuse",
      "pythagore_calculer_cote",
      "pythagore_reciproque",
    ],
  },
  {
    id: "pythagore_defis",
    label: "Défis sur Pythagore",
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
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "thales_rapports",
    label: "Écrire les rapports de longueurs",
    notionId: "thales",
    prerequis: ["thales_configuration", "prop_quatrieme"],
  },
  {
    id: "thales_calculer_longueur",
    label: "Calculer une longueur avec le théorème de Thalès",
    notionId: "thales",
    prerequis: ["thales_rapports"],
  },
  {
    id: "thales_reciproque",
    label: "Utiliser la réciproque du théorème de Thalès",
    notionId: "thales",
    prerequis: ["thales_rapports"],
  },
  {
    id: "thales_rediger",
    label: "Rédiger une justification avec Thalès",
    notionId: "thales",
    prerequis: ["thales_calculer_longueur", "thales_reciproque"],
  },
  {
    id: "thales_defis",
    label: "Défis sur Thalès",
    notionId: "thales",
    prerequis: ["thales_rediger"],
  },

  /* =========================
     TRIGONOMÉTRIE
  ========================= */
  {
    id: "trigo_triangle_rectangle",
    label: "Identifier les côtés dans un triangle rectangle",
    notionId: "trigonometrie",
    prerequis: ["pythagore_reconnaitre"],
  },
  {
    id: "trigo_cosinus",
    label: "Utiliser le cosinus dans un triangle rectangle",
    notionId: "trigonometrie",
    prerequis: ["trigo_triangle_rectangle"],
  },
  {
    id: "trigo_sinus",
    label: "Utiliser le sinus dans un triangle rectangle",
    notionId: "trigonometrie",
    prerequis: ["trigo_triangle_rectangle"],
  },
  {
    id: "trigo_tangente",
    label: "Utiliser la tangente dans un triangle rectangle",
    notionId: "trigonometrie",
    prerequis: ["trigo_triangle_rectangle"],
  },
  {
    id: "trigo_calculer_longueur",
    label: "Calculer une longueur avec la trigonométrie",
    notionId: "trigonometrie",
    prerequis: ["trigo_cosinus", "trigo_sinus", "trigo_tangente"],
  },
  {
    id: "trigo_calculer_angle",
    label: "Calculer un angle avec la trigonométrie",
    notionId: "trigonometrie",
    prerequis: ["trigo_cosinus", "trigo_sinus", "trigo_tangente"],
  },
  {
    id: "trigo_choisir_ratio",
    label: "Choisir entre sinus, cosinus et tangente",
    notionId: "trigonometrie",
    prerequis: ["trigo_calculer_longueur", "trigo_calculer_angle"],
  },
  {
    id: "trigo_defis",
    label: "Défis sur la trigonométrie",
    notionId: "trigonometrie",
    prerequis: ["trigo_choisir_ratio"],
  },

  /* =========================
     TRANSFORMATIONS
  ========================= */
  {
    id: "transfo_symetrie_translation_rotation",
    label: "Réactiver symétrie, translation et rotation",
    notionId: "transformations",
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "transfo_homothetie_reconnaitre",
    label: "Reconnaître une homothétie",
    notionId: "transformations",
    prerequis: ["transfo_symetrie_translation_rotation"],
  },
  {
    id: "transfo_homothetie_construire",
    label: "Construire l’image d’une figure par homothétie",
    notionId: "transformations",
    prerequis: ["transfo_homothetie_reconnaitre"],
  },
  {
    id: "transfo_homothetie_rapport",
    label: "Utiliser le rapport d’une homothétie",
    notionId: "transformations",
    prerequis: ["transfo_homothetie_construire"],
  },
  {
    id: "transfo_effets",
    label: "Utiliser les effets d’une transformation sur longueurs, angles et aires",
    notionId: "transformations",
    prerequis: ["transfo_homothetie_rapport"],
  },
  {
    id: "transfo_defis",
    label: "Défis sur les transformations",
    notionId: "transformations",
    prerequis: ["transfo_effets"],
  },

  /* =========================
     GÉOMÉTRIE DANS L’ESPACE
  ========================= */
  {
    id: "espace_solides_reconnaitre",
    label: "Reconnaître les solides usuels",
    notionId: "geometrie_espace",
    prerequis: [],
  },
  {
    id: "espace_sections",
    label: "Comprendre une section de solide",
    notionId: "geometrie_espace",
    prerequis: ["espace_solides_reconnaitre"],
  },
  {
    id: "espace_representation",
    label: "Interpréter une représentation en perspective",
    notionId: "geometrie_espace",
    prerequis: ["espace_solides_reconnaitre"],
  },
  {
    id: "espace_defis",
    label: "Défis sur la géométrie dans l’espace",
    notionId: "geometrie_espace",
    prerequis: ["espace_sections", "espace_representation"],
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
    id: "perimetre_polygone",
    label: "Calculer le périmètre d’un polygone",
    notionId: "perimetres",
    prerequis: ["perimetre_comprendre"],
  },
  {
    id: "perimetre_cercle",
    label: "Calculer la longueur d’un cercle",
    notionId: "perimetres",
    prerequis: ["perimetre_comprendre"],
  },
  {
    id: "perimetre_figure_composee",
    label: "Calculer le périmètre d’une figure composée",
    notionId: "perimetres",
    prerequis: ["perimetre_polygone", "perimetre_cercle"],
  },
  {
    id: "perimetre_defis",
    label: "Défis sur les périmètres",
    notionId: "perimetres",
    prerequis: ["perimetre_figure_composee"],
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
    prerequis: ["aire_comprendre", "triangle_reconnaitre"],
  },
  {
    id: "aire_disque",
    label: "Calculer l’aire d’un disque",
    notionId: "aires",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_figure_composee",
    label: "Calculer l’aire d’une figure composée",
    notionId: "aires",
    prerequis: ["aire_triangle", "aire_disque"],
  },
  {
    id: "aire_agrandissement_reduction",
    label: "Comprendre l’effet d’un agrandissement ou d’une réduction sur les aires",
    notionId: "aires",
    prerequis: ["transfo_homothetie_rapport"],
  },
  {
    id: "aire_defis",
    label: "Défis sur les aires",
    notionId: "aires",
    prerequis: ["aire_figure_composee", "aire_agrandissement_reduction"],
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
    prerequis: ["volume_comprendre", "aire_triangle"],
  },
  {
    id: "volume_cylindre",
    label: "Calculer le volume d’un cylindre",
    notionId: "volumes",
    prerequis: ["volume_comprendre", "aire_disque"],
  },
  {
    id: "volume_boule",
    label: "Calculer le volume d’une boule",
    notionId: "volumes",
    prerequis: ["volume_cylindre"],
  },
  {
    id: "volume_agrandissement_reduction",
    label: "Comprendre l’effet d’un agrandissement ou d’une réduction sur les volumes",
    notionId: "volumes",
    prerequis: ["transfo_homothetie_rapport"],
  },
  {
    id: "volume_unites",
    label: "Convertir et utiliser les unités de volume",
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
      "volume_boule",
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
    id: "stat_effectif_frequence",
    label: "Déterminer un effectif et une fréquence",
    notionId: "statistiques",
    prerequis: ["stat_lire_tableau"],
  },
  {
    id: "stat_moyenne",
    label: "Calculer une moyenne",
    notionId: "statistiques",
    prerequis: ["stat_effectif_frequence"],
  },
  {
    id: "stat_mediane",
    label: "Déterminer une médiane",
    notionId: "statistiques",
    prerequis: ["stat_effectif_frequence"],
  },
  {
    id: "stat_etendue",
    label: "Calculer l’étendue d’une série statistique",
    notionId: "statistiques",
    prerequis: ["stat_lire_tableau"],
  },
  {
    id: "stat_interpreter",
    label: "Interpréter des indicateurs statistiques",
    notionId: "statistiques",
    prerequis: ["stat_moyenne", "stat_mediane", "stat_etendue"],
  },
  {
    id: "stat_defis",
    label: "Défis sur les statistiques",
    notionId: "statistiques",
    prerequis: ["stat_interpreter"],
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
    label: "Déterminer les issues d’une expérience aléatoire",
    notionId: "probabilites",
    prerequis: ["proba_vocabulaire"],
  },
  {
    id: "proba_evenement",
    label: "Décrire un événement",
    notionId: "probabilites",
    prerequis: ["proba_issues"],
  },
  {
    id: "proba_calculer",
    label: "Calculer une probabilité simple",
    notionId: "probabilites",
    prerequis: ["proba_evenement", "rationnel_comparer"],
  },
  {
    id: "proba_evenement_contraire",
    label: "Utiliser l’événement contraire",
    notionId: "probabilites",
    prerequis: ["proba_calculer"],
  },
  {
    id: "proba_deux_epreuves",
    label: "Étudier une expérience à deux épreuves simples",
    notionId: "probabilites",
    prerequis: ["proba_calculer"],
  },
  {
    id: "proba_defis",
    label: "Défis sur les probabilités",
    notionId: "probabilites",
    prerequis: ["proba_evenement_contraire", "proba_deux_epreuves"],
  },
];