// knowledge/maths/3e/microSkills.ts

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  /* =========================
     NOMBRES RATIONNELS
  ========================= */
  {
    id: "fraction_rationnel_reconnaitre",
    label: "Reconnaître un nombre rationnel",
    notionId: "fraction_rationnel",
    prerequis: [],
  },
  {
    id: "fraction_rationnel_ecriture",
    label: "Passer d’une écriture fractionnaire à une écriture décimale",
    notionId: "fraction_rationnel",
    prerequis: ["fraction_rationnel_reconnaitre"],
  },
  {
    id: "fraction_rationnel_comparer",
    label: "Comparer des nombres rationnels",
    notionId: "fraction_rationnel",
    prerequis: ["fraction_rationnel_ecriture"],
  },
  {
    id: "fraction_rationnel_calculer",
    label: "Calculer avec des nombres rationnels",
    notionId: "fraction_rationnel",
    prerequis: ["fraction_rationnel_comparer"],
  },
  {
    id: "fraction_rationnel_defi",
    label: "Défis sur les nombres rationnels",
    notionId: "fraction_rationnel",
    prerequis: ["fraction_rationnel_calculer"],
  },

  /* =========================
     PUISSANCES
  ========================= */
  {
    id: "entier_puissance_comprendre",
    label: "Comprendre l’écriture d’une puissance",
    notionId: "entier_puissance",
    prerequis: [],
  },
  {
    id: "entier_puissance_calculer",
    label: "Calculer une puissance simple",
    notionId: "entier_puissance",
    prerequis: ["entier_puissance_comprendre"],
  },
  {
    id: "entier_puissance_dix",
    label: "Utiliser les puissances de 10",
    notionId: "entier_puissance",
    prerequis: ["entier_puissance_calculer"],
  },
  {
    id: "entier_puissance_ecriture_scientifique",
    label: "Utiliser l’écriture scientifique",
    notionId: "entier_puissance",
    prerequis: ["entier_puissance_dix"],
  },
  {
    id: "entier_puissance_calcul",
    label: "Effectuer des calculs avec les puissances",
    notionId: "entier_puissance",
    prerequis: ["entier_puissance_calculer", "entier_puissance_dix"],
  },
  {
    id: "entier_puissance_defi",
    label: "Défis sur les puissances",
    notionId: "entier_puissance",
    prerequis: ["entier_puissance_calcul", "entier_puissance_ecriture_scientifique"],
  },

  /* =========================
     RACINE CARRÉE
  ========================= */
  {
    id: "entier_racine_comprendre",
    label: "Comprendre la notion de racine carrée",
    notionId: "entier_racine_carree",
    prerequis: ["entier_puissance_calculer"],
  },
  {
    id: "entier_racine_carre_parfait",
    label: "Reconnaître les carrés parfaits",
    notionId: "entier_racine_carree",
    prerequis: ["entier_racine_comprendre"],
  },
  {
    id: "entier_racine_calculer",
    label: "Calculer une racine carrée simple",
    notionId: "entier_racine_carree",
    prerequis: ["entier_racine_carre_parfait"],
  },
  {
    id: "entier_racine_encadrer",
    label: "Encadrer une racine carrée",
    notionId: "entier_racine_carree",
    prerequis: ["entier_racine_carre_parfait"],
  },
  {
    id: "entier_racine_defi",
    label: "Défis sur les racines carrées",
    notionId: "entier_racine_carree",
    prerequis: ["entier_racine_calculer", "entier_racine_encadrer"],
  },

  /* =========================
     ARITHMÉTIQUE
  ========================= */
  {
    id: "entier_multiple_diviseur",
    label: "Reconnaître un multiple et un diviseur",
    notionId: "entier_arithmetique",
    prerequis: [],
  },
  {
    id: "entier_critere_divisibilite",
    label: "Utiliser les critères de divisibilité",
    notionId: "entier_arithmetique",
    prerequis: ["entier_multiple_diviseur"],
  },
  {
    id: "entier_nombre_premier",
    label: "Reconnaître un nombre premier",
    notionId: "entier_arithmetique",
    prerequis: ["entier_critere_divisibilite"],
  },
  {
    id: "entier_decomposer_facteur",
    label: "Décomposer un entier en produit de facteurs premiers",
    notionId: "entier_arithmetique",
    prerequis: ["entier_nombre_premier"],
  },
  {
    id: "entier_pgcd_ppcm",
    label: "Utiliser une décomposition pour résoudre un problème de divisibilité",
    notionId: "entier_arithmetique",
    prerequis: ["entier_decomposer_facteur"],
  },
  {
    id: "entier_arithmetique_defi",
    label: "Défis sur l’arithmétique",
    notionId: "entier_arithmetique",
    prerequis: ["entier_pgcd_ppcm"],
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
    label: "Utiliser un tableau de proportionnalité",
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
    id: "prop_pourcentage",
    label: "Calculer et interpréter un pourcentage",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_quatrieme"],
  },
  {
    id: "prop_evolution",
    label: "Interpréter une augmentation ou une diminution en pourcentage",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_pourcentage"],
  },
  {
    id: "prop_vitesse_debit",
    label: "Résoudre un problème de vitesse, débit ou densité",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_quatrieme"],
  },
  {
    id: "prop_defi",
    label: "Défis sur la proportionnalité",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_evolution", "prop_vitesse_debit"],
  },

  /* =========================
     CALCUL LITTÉRAL
  ========================= */
  {
    id: "litteral_comprendre",
    label: "Comprendre une expression littérale",
    notionId: "litteral_calcul",
    prerequis: [],
  },
  {
    id: "litteral_substituer",
    label: "Calculer la valeur d’une expression littérale",
    notionId: "litteral_calcul",
    prerequis: ["litteral_comprendre"],
  },
  {
    id: "litteral_reduire",
    label: "Réduire une expression littérale",
    notionId: "litteral_calcul",
    prerequis: ["litteral_comprendre"],
  },
  {
    id: "litteral_developper",
    label: "Développer une expression",
    notionId: "litteral_calcul",
    prerequis: ["litteral_reduire"],
  },
  {
    id: "litteral_factoriser",
    label: "Factoriser une expression",
    notionId: "litteral_calcul",
    prerequis: ["litteral_developper"],
  },
  {
    id: "litteral_identite",
    label: "Utiliser les identités remarquables",
    notionId: "litteral_calcul",
    prerequis: ["litteral_developper", "litteral_factoriser"],
  },
  {
    id: "litteral_defi",
    label: "Défis sur le calcul littéral",
    notionId: "litteral_calcul",
    prerequis: ["litteral_identite"],
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
    id: "equation_resoudre_simple",
    label: "Résoudre une équation du premier degré simple",
    notionId: "equation_resolution",
    prerequis: ["equation_reconnaitre"],
  },
  {
    id: "equation_resoudre_developper",
    label: "Résoudre une équation avec développement ou réduction",
    notionId: "equation_resolution",
    prerequis: ["equation_resoudre_simple", "litteral_developper"],
  },
  {
    id: "equation_produit_nul",
    label: "Résoudre une équation produit nul",
    notionId: "equation_resolution",
    prerequis: ["litteral_factoriser"],
  },
  {
    id: "equation_verifier",
    label: "Vérifier une solution d’équation",
    notionId: "equation_resolution",
    prerequis: ["equation_resoudre_simple", "litteral_substituer"],
  },
  {
    id: "equation_probleme",
    label: "Résoudre un problème à l’aide d’une équation",
    notionId: "equation_resolution",
    prerequis: ["equation_resoudre_developper", "equation_verifier"],
  },
  {
    id: "equation_defi",
    label: "Défis sur les équations",
    notionId: "equation_resolution",
    prerequis: ["equation_probleme", "equation_produit_nul"],
  },

  /* =========================
     FONCTIONS
  ========================= */
  {
    id: "fonction_vocabulaire",
    label: "Comprendre le vocabulaire des fonctions",
    notionId: "fonction_generalite",
    prerequis: [],
  },
  {
    id: "fonction_image",
    label: "Calculer ou lire une image",
    notionId: "fonction_generalite",
    prerequis: ["fonction_vocabulaire"],
  },
  {
    id: "fonction_antecedent",
    label: "Déterminer ou lire un antécédent",
    notionId: "fonction_generalite",
    prerequis: ["fonction_image"],
  },
  {
    id: "fonction_tableau",
    label: "Utiliser un tableau de valeurs",
    notionId: "fonction_generalite",
    prerequis: ["fonction_image"],
  },
  {
    id: "fonction_graphique",
    label: "Lire et interpréter la représentation graphique d’une fonction",
    notionId: "fonction_generalite",
    prerequis: ["fonction_image", "fonction_antecedent"],
  },
  {
    id: "fonction_affine_lineaire",
    label: "Reconnaître et utiliser une fonction linéaire ou affine",
    notionId: "fonction_generalite",
    prerequis: ["fonction_graphique", "prop_reconnaitre"],
  },
  {
    id: "fonction_defi",
    label: "Défis sur les fonctions",
    notionId: "fonction_generalite",
    prerequis: ["fonction_affine_lineaire"],
  },
    /* =========================
     FONCTIONS AFFINES
  ========================= */

  {
    id: "affine_reconnaitre",
    label: "Reconnaître une fonction affine ou linéaire",
    notionId: "affine_fonction",
    prerequis: ["fonction_affine_lineaire"],
  },

  {
    id: "affine_coeff_directeur",
    label: "Comprendre et déterminer le coefficient directeur",
    notionId: "affine_fonction",
    prerequis: ["affine_reconnaitre"],
  },

  {
    id: "affine_ordonnee_origine",
    label: "Comprendre et déterminer l’ordonnée à l’origine",
    notionId: "affine_fonction",
    prerequis: ["affine_reconnaitre"],
  },

  {
    id: "affine_calcul_image",
    label: "Calculer une image avec une fonction affine",
    notionId: "affine_fonction",
    prerequis: [
      "affine_coeff_directeur",
      "affine_ordonnee_origine",
    ],
  },

  {
    id: "affine_expression",
    label: "Déterminer l’expression d’une fonction affine",
    notionId: "affine_fonction",
    prerequis: [
      "affine_coeff_directeur",
      "affine_ordonnee_origine",
    ],
  },

  {
    id: "affine_graphique",
    label: "Lire et interpréter graphiquement une fonction affine",
    notionId: "affine_fonction",
    prerequis: ["affine_expression"],
  },

  {
    id: "affine_probleme",
    label: "Résoudre un problème avec une fonction affine",
    notionId: "affine_fonction",
    prerequis: [
      "affine_calcul_image",
      "affine_graphique",
    ],
  },

  {
    id: "affine_defi",
    label: "Défis sur les fonctions affines",
    notionId: "affine_fonction",
    prerequis: ["affine_probleme"],
  },

  /* =========================
     TRIANGLES
  ========================= */
  {
    id: "triangle_reconnaitre",
    label: "Reconnaître les triangles usuels",
    notionId: "triangle_figure",
    prerequis: [],
  },
  {
    id: "triangle_angle",
    label: "Utiliser la somme des angles d’un triangle",
    notionId: "triangle_figure",
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "triangle_inegalite",
    label: "Utiliser l’inégalité triangulaire",
    notionId: "triangle_figure",
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "triangle_construire",
    label: "Construire ou analyser un triangle à partir de données",
    notionId: "triangle_figure",
    prerequis: ["triangle_angle", "triangle_inegalite"],
  },
  {
    id: "triangle_defi",
    label: "Défis sur les triangles",
    notionId: "triangle_figure",
    prerequis: ["triangle_construire"],
  },

  /* =========================
     PYTHAGORE
  ========================= */
  {
    id: "pythagore_reconnaitre",
    label: "Reconnaître un triangle rectangle et son hypoténuse",
    notionId: "pythagore_theoreme",
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "pythagore_calculer_hypotenuse",
    label: "Calculer l’hypoténuse avec le théorème de Pythagore",
    notionId: "pythagore_theoreme",
    prerequis: ["pythagore_reconnaitre", "entier_racine_calculer"],
  },
  {
    id: "pythagore_calculer_cote",
    label: "Calculer un côté de l’angle droit",
    notionId: "pythagore_theoreme",
    prerequis: ["pythagore_reconnaitre", "entier_racine_calculer"],
  },
  {
    id: "pythagore_reciproque",
    label: "Utiliser la réciproque du théorème de Pythagore",
    notionId: "pythagore_theoreme",
    prerequis: ["pythagore_reconnaitre"],
  },
  {
    id: "pythagore_rediger",
    label: "Rédiger une justification avec Pythagore",
    notionId: "pythagore_theoreme",
    prerequis: [
      "pythagore_calculer_hypotenuse",
      "pythagore_calculer_cote",
      "pythagore_reciproque",
    ],
  },
  {
    id: "pythagore_defi",
    label: "Défis sur Pythagore",
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
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "thales_rapport",
    label: "Écrire les rapports de longueurs",
    notionId: "thales_theoreme",
    prerequis: ["thales_configuration", "prop_quatrieme"],
  },
  {
    id: "thales_calculer_longueur",
    label: "Calculer une longueur avec le théorème de Thalès",
    notionId: "thales_theoreme",
    prerequis: ["thales_rapport"],
  },
  {
    id: "thales_reciproque",
    label: "Utiliser la réciproque du théorème de Thalès",
    notionId: "thales_theoreme",
    prerequis: ["thales_rapport"],
  },
  {
    id: "thales_rediger",
    label: "Rédiger une justification avec Thalès",
    notionId: "thales_theoreme",
    prerequis: ["thales_calculer_longueur", "thales_reciproque"],
  },
  {
    id: "thales_defi",
    label: "Défis sur Thalès",
    notionId: "thales_theoreme",
    prerequis: ["thales_rediger"],
  },

  /* =========================
     TRIGONOMÉTRIE
  ========================= */
  {
    id: "trigo_triangle_rectangle",
    label: "Identifier les côtés dans un triangle rectangle",
    notionId: "trigo_trigonometrie",
    prerequis: ["pythagore_reconnaitre"],
  },
  {
    id: "trigo_cosinus",
    label: "Utiliser le cosinus dans un triangle rectangle",
    notionId: "trigo_trigonometrie",
    prerequis: ["trigo_triangle_rectangle"],
  },
  {
    id: "trigo_sinus",
    label: "Utiliser le sinus dans un triangle rectangle",
    notionId: "trigo_trigonometrie",
    prerequis: ["trigo_triangle_rectangle"],
  },
  {
    id: "trigo_tangente",
    label: "Utiliser la tangente dans un triangle rectangle",
    notionId: "trigo_trigonometrie",
    prerequis: ["trigo_triangle_rectangle"],
  },
  {
    id: "trigo_calculer_longueur",
    label: "Calculer une longueur avec la trigonométrie",
    notionId: "trigo_trigonometrie",
    prerequis: ["trigo_cosinus", "trigo_sinus", "trigo_tangente"],
  },
  {
    id: "trigo_calculer_angle",
    label: "Calculer un angle avec la trigonométrie",
    notionId: "trigo_trigonometrie",
    prerequis: ["trigo_cosinus", "trigo_sinus", "trigo_tangente"],
  },
  {
    id: "trigo_choisir_rapport",
    label: "Choisir entre sinus, cosinus et tangente",
    notionId: "trigo_trigonometrie",
    prerequis: ["trigo_calculer_longueur", "trigo_calculer_angle"],
  },
  {
    id: "trigo_defi",
    label: "Défis sur la trigonométrie",
    notionId: "trigo_trigonometrie",
    prerequis: ["trigo_choisir_rapport"],
  },

  /* =========================
     TRANSFORMATIONS
  ========================= */
  {
    id: "sym_symetrie_translation_rotation",
    label: "Réactiver symétrie, translation et rotation",
    notionId: "sym_transformation",
    prerequis: ["triangle_reconnaitre"],
  },
  {
    id: "sym_homothetie_reconnaitre",
    label: "Reconnaître une homothétie",
    notionId: "sym_transformation",
    prerequis: ["sym_symetrie_translation_rotation"],
  },
  {
    id: "sym_homothetie_construire",
    label: "Construire l’image d’une figure par homothétie",
    notionId: "sym_transformation",
    prerequis: ["sym_homothetie_reconnaitre"],
  },
  {
    id: "sym_homothetie_rapport",
    label: "Utiliser le rapport d’une homothétie",
    notionId: "sym_transformation",
    prerequis: ["sym_homothetie_construire"],
  },
  {
    id: "sym_transformation_effet",
    label: "Utiliser les effets d’une transformation sur longueurs, angles et aires",
    notionId: "sym_transformation",
    prerequis: ["sym_homothetie_rapport"],
  },
  {
    id: "sym_transformation_defi",
    label: "Défis sur les transformations",
    notionId: "sym_transformation",
    prerequis: ["sym_transformation_effet"],
  },

  /* =========================
     GÉOMÉTRIE DANS L’ESPACE
  ========================= */
  {
    id: "volume_solide_reconnaitre",
    label: "Reconnaître les solides usuels",
    notionId: "volume_geometrie_espace",
    prerequis: [],
  },
  {
    id: "volume_section",
    label: "Comprendre une section de solide",
    notionId: "volume_geometrie_espace",
    prerequis: ["volume_solide_reconnaitre"],
  },
  {
    id: "volume_representation",
    label: "Interpréter une représentation en perspective",
    notionId: "volume_geometrie_espace",
    prerequis: ["volume_solide_reconnaitre"],
  },
  {
    id: "volume_geometrie_espace_defi",
    label: "Défis sur la géométrie dans l’espace",
    notionId: "volume_geometrie_espace",
    prerequis: ["volume_section", "volume_representation"],
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
    id: "aire_perimetre_polygone",
    label: "Calculer le périmètre d’un polygone",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_comprendre"],
  },
  {
    id: "aire_perimetre_cercle",
    label: "Calculer la longueur d’un cercle",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_comprendre"],
  },
  {
    id: "aire_perimetre_figure_composee",
    label: "Calculer le périmètre d’une figure composée",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_polygone", "aire_perimetre_cercle"],
  },
  {
    id: "aire_perimetre_defi",
    label: "Défis sur les périmètres",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_figure_composee"],
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
    prerequis: ["aire_comprendre", "triangle_reconnaitre"],
  },
  {
    id: "aire_disque",
    label: "Calculer l’aire d’un disque",
    notionId: "aire_surface",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_figure_composee",
    label: "Calculer l’aire d’une figure composée",
    notionId: "aire_surface",
    prerequis: ["aire_triangle", "aire_disque"],
  },
  {
    id: "aire_agrandissement_reduction",
    label: "Comprendre l’effet d’un agrandissement ou d’une réduction sur les aires",
    notionId: "aire_surface",
    prerequis: ["sym_homothetie_rapport"],
  },
  {
    id: "aire_defi",
    label: "Défis sur les aires",
    notionId: "aire_surface",
    prerequis: ["aire_figure_composee", "aire_agrandissement_reduction"],
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
    prerequis: ["volume_comprendre", "aire_triangle"],
  },
  {
    id: "volume_cylindre",
    label: "Calculer le volume d’un cylindre",
    notionId: "volume_solide",
    prerequis: ["volume_comprendre", "aire_disque"],
  },
  {
    id: "volume_boule",
    label: "Calculer le volume d’une boule",
    notionId: "volume_solide",
    prerequis: ["volume_cylindre"],
  },
  {
    id: "volume_agrandissement_reduction",
    label: "Comprendre l’effet d’un agrandissement ou d’une réduction sur les volumes",
    notionId: "volume_solide",
    prerequis: ["sym_homothetie_rapport"],
  },
  {
    id: "volume_unite",
    label: "Convertir et utiliser les unités de volume",
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
      "volume_boule",
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
    id: "stat_effectif_frequence",
    label: "Déterminer un effectif et une fréquence",
    notionId: "stat_statistique",
    prerequis: ["stat_lire_tableau"],
  },
  {
    id: "stat_moyenne",
    label: "Calculer une moyenne",
    notionId: "stat_statistique",
    prerequis: ["stat_effectif_frequence"],
  },
  {
    id: "stat_mediane",
    label: "Déterminer une médiane",
    notionId: "stat_statistique",
    prerequis: ["stat_effectif_frequence"],
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
    prerequis: ["stat_moyenne", "stat_mediane", "stat_etendue"],
  },
  {
    id: "stat_defi",
    label: "Défis sur les statistiques",
    notionId: "stat_statistique",
    prerequis: ["stat_interpreter"],
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
    label: "Déterminer les issues d’une expérience aléatoire",
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
    id: "proba_evenement",
    label: "Décrire un événement",
    notionId: "proba_experience",
    prerequis: ["proba_issue"],
  },
  {
    id: "proba_calculer",
    label: "Calculer une probabilité simple",
    notionId: "proba_experience",
    prerequis: ["proba_evenement", "fraction_rationnel_comparer"],
  },
  {
    id: "proba_evenement_contraire",
    label: "Utiliser l’événement contraire",
    notionId: "proba_experience",
    prerequis: ["proba_calculer"],
  },
  {
    id: "proba_deux_epreuve",
    label: "Étudier une expérience à deux épreuves simples",
    notionId: "proba_experience",
    prerequis: ["proba_calculer"],
  },
  {
    id: "proba_defi",
    label: "Défis sur les probabilités",
    notionId: "proba_experience",
    prerequis: ["proba_evenement_contraire", "proba_deux_epreuve"],
  },
    /* =========================
     ALGORITHMIQUE
  ========================= */
  {
    id: "algo_condition_complexe",
    label: "Utiliser des conditions complexes",
    notionId: "algo_programmation",
    prerequis: ["equation_verifier", "fonction_image"],
  },
  {
    id: "algo_variable_boucle",
    label: "Utiliser des variables et des boucles",
    notionId: "algo_programmation",
    prerequis: ["algo_condition_complexe", "litteral_substituer"],
  },
  {
    id: "algo_programme_calcul",
    label: "Créer ou analyser un programme de calcul",
    notionId: "algo_programmation",
    prerequis: ["algo_variable_boucle", "litteral_reduire"],
  },
  {
    id: "algo_corriger",
    label: "Corriger un programme",
    notionId: "algo_programmation",
    prerequis: ["algo_programme_calcul"],
  },
  {
    id: "algo_generaliser",
    label: "Généraliser une situation avec des variables",
    notionId: "algo_programmation",
    prerequis: ["algo_programme_calcul", "equation_probleme", "fonction_affine_lineaire"],
  },
  {
    id: "algo_defi",
    label: "Défis d’algorithmique et de programmation",
    notionId: "algo_programmation",
    prerequis: [
      "algo_condition_complexe",
      "algo_variable_boucle",
      "algo_programme_calcul",
      "algo_corriger",
      "algo_generaliser",
    ],
  },
];