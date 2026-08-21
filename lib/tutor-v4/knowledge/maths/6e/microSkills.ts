// knowledge/maths/6e/microSkills.ts

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  /* =========================
     NOMBRES ENTIERS
  ========================= */
  {
    id: "entier_lire_ecrire",
    label: "Lire et écrire un nombre entier",
    notionId: "entier_nombre",
    prerequis: [],
  },
  {
    id: "entier_rang",
    label: "Identifier le rang d’un chiffre",
    notionId: "entier_nombre",
    prerequis: ["entier_lire_ecrire"],
  },
  {
    id: "entier_comparer",
    label: "Comparer des nombres entiers",
    notionId: "entier_nombre",
    prerequis: ["entier_lire_ecrire"],
  },
  {
    id: "entier_decomposer",
    label: "Décomposer un nombre entier",
    notionId: "entier_nombre",
    prerequis: ["entier_rang"],
  },
  {
    id: "entier_encadrer",
    label: "Encadrer un nombre entier",
    notionId: "entier_nombre",
    prerequis: ["entier_comparer"],
  },
  {
    id: "entier_defi",
    label: "Défis sur les nombres entiers",
    notionId: "entier_nombre",
    prerequis: ["entier_comparer"],
  },

  /* =========================
     DECIMAUX
  ========================= */
  {
    id: "decimal_lire_ecrire",
    label: "Lire et écrire un nombre décimal",
    notionId: "decimal_nombre",
    prerequis: ["entier_lire_ecrire"],
  },
  {
    id: "decimal_rang",
    label: "Identifier le rang d’un chiffre décimal",
    notionId: "decimal_nombre",
    prerequis: ["decimal_lire_ecrire"],
  },
  {
    id: "decimal_comparer",
    label: "Comparer des nombres décimaux",
    notionId: "decimal_nombre",
    prerequis: ["decimal_rang"],
  },
  {
    id: "decimal_defi",
    label: "Défis sur les nombres décimaux",
    notionId: "decimal_nombre",
    prerequis: ["decimal_comparer"],
  },

  /* =========================
     CALCULER AVEC LES DÉCIMAUX
     ⛔ Séparé de « Nombres décimaux » le 21/08/2026 : lire un décimal et
     calculer avec un décimal sont deux notions. Le calcul a ses propres
     obstacles — aligner les virgules, compter les décimales d'un produit,
     poursuivre une division au-delà de la virgule — qui n'ont rien à voir avec
     le rang d'un chiffre. Découpage repris de la 5e (fraction_nombre /
     fraction_calcul).
  ========================= */
  {
    id: "decimal_additionner",
    label: "Additionner et soustraire des nombres décimaux",
    notionId: "decimal_calcul",
    prerequis: ["decimal_rang"],
  },
  {
    id: "decimal_multiplier",
    label: "Multiplier des nombres décimaux",
    notionId: "decimal_calcul",
    prerequis: ["decimal_additionner"],
  },
  {
    id: "decimal_diviser_par_entier",
    label: "Diviser un nombre décimal par un entier",
    notionId: "decimal_calcul",
    prerequis: ["decimal_multiplier"],
  },
  {
    id: "decimal_calcul_defi",
    label: "Défis de calcul avec les décimaux",
    notionId: "decimal_calcul",
    prerequis: ["decimal_multiplier"],
  },

  /* =========================
     FRACTIONS
  ========================= */
  {
    id: "fraction_lire_ecrire",
    label: "Lire et écrire une fraction",
    notionId: "fraction_nombre",
    prerequis: ["decimal_lire_ecrire"],
  },
  {
    id: "fraction_representer",
    label: "Représenter une fraction",
    notionId: "fraction_nombre",
    prerequis: ["fraction_lire_ecrire"],
  },
  {
    id: "fraction_quantite",
    label: "Comprendre une fraction comme quantité",
    notionId: "fraction_nombre",
    prerequis: ["fraction_representer"],
  },
  {
    id: "fraction_decimal",
    label: "Relier fraction et décimal",
    notionId: "fraction_nombre",
    prerequis: ["fraction_quantite", "decimal_lire_ecrire"],
  },
  {
    id: "fraction_comparer",
    label: "Comparer des fractions",
    notionId: "fraction_nombre",
    prerequis: ["fraction_lire_ecrire"],
  },
  {
    id: "fraction_defi",
    label: "Défis sur les fractions",
    notionId: "fraction_nombre",
    prerequis: ["fraction_comparer"],
  },

  /* =========================
     POURCENTAGES
  ========================= */
  {
    id: "pourcentage_comprendre",
    label: "Comprendre un pourcentage",
    notionId: "pourcentage_nombre",
    prerequis: ["fraction_quantite"],
  },
  {
    id: "pourcentage_fraction",
    label: "Relier pourcentage et fraction",
    notionId: "pourcentage_nombre",
    prerequis: ["pourcentage_comprendre"],
  },
  {
    id: "pourcentage_decimal",
    label: "Relier pourcentage et décimal",
    notionId: "pourcentage_nombre",
    prerequis: ["pourcentage_fraction", "fraction_decimal"],
  },
  {
    id: "pourcentage_lire",
    label: "Lire un pourcentage",
    notionId: "pourcentage_nombre",
    prerequis: ["pourcentage_comprendre"],
  },
  {
    id: "pourcentage_calcul_simple",
    label: "Calculer un pourcentage simple",
    notionId: "pourcentage_nombre",
    prerequis: ["pourcentage_decimal"],
  },
  {
    id: "pourcentage_defi",
    label: "Défis sur les pourcentages",
    notionId: "pourcentage_nombre",
    prerequis: ["pourcentage_calcul_simple"],
  },

  /* =========================
     PROPORTIONNALITE
  ========================= */
  {
    id: "prop_reconnaitre",
    label: "Reconnaître une situation de proportionnalité",
    notionId: "prop_proportionnalite",
    prerequis: ["pourcentage_comprendre"],
  },
  {
    id: "prop_table",
    label: "Compléter un tableau de proportionnalité",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_reconnaitre"],
  },
  {
    id: "prop_coeff",
    label: "Utiliser un coefficient",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_unite",
    label: "Passer par l’unité",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_direct",
    label: "Résoudre une situation",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_coeff", "prop_unite"],
  },
  {
    id: "prop_defi",
    label: "Défis de proportionnalité",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_direct"],
  },

  /* =========================
     CALCUL POSE
  ========================= */
  {
    id: "entier_addition_posee",
    label: "Poser une addition",
    notionId: "entier_calcul_pose",
    prerequis: ["entier_lire_ecrire"],
  },
  {
    id: "entier_soustraction_posee",
    label: "Poser une soustraction",
    notionId: "entier_calcul_pose",
    prerequis: ["entier_addition_posee"],
  },
  {
    id: "entier_multiplication_posee",
    label: "Poser une multiplication",
    notionId: "entier_calcul_pose",
    prerequis: ["entier_addition_posee"],
  },
  {
    id: "entier_division_posee",
    label: "Poser une division",
    notionId: "entier_calcul_pose",
    prerequis: ["entier_multiplication_posee"],
  },
  {
    id: "entier_calcul_verifier",
    label: "Vérifier un calcul",
    notionId: "entier_calcul_pose",
    prerequis: [
      "entier_addition_posee",
      "entier_soustraction_posee",
      "entier_multiplication_posee",
      "entier_division_posee",
    ],
  },
  {
    id: "entier_calcul_pose_defi",
    label: "Défis de calcul posé",
    notionId: "entier_calcul_pose",
    prerequis: ["entier_calcul_verifier"],
  },

  /* =========================
     CALCUL MENTAL
  ========================= */
  {
    id: "entier_addition_mentale",
    label: "Addition mentale",
    notionId: "entier_calcul_mental",
    prerequis: [],
  },
  {
    id: "entier_soustraction_mentale",
    label: "Soustraction mentale",
    notionId: "entier_calcul_mental",
    prerequis: ["entier_addition_mentale"],
  },
  {
    id: "entier_multiplication_mentale",
    label: "Multiplication mentale",
    notionId: "entier_calcul_mental",
    prerequis: ["entier_addition_mentale"],
  },
  {
    id: "entier_division_mentale",
    label: "Division mentale",
    notionId: "entier_calcul_mental",
    prerequis: ["entier_multiplication_mentale"],
  },
  {
    id: "entier_strategie_mentale",
    label: "Stratégies de calcul mental",
    notionId: "entier_calcul_mental",
    prerequis: [
      "entier_addition_mentale",
      "entier_soustraction_mentale",
      "entier_multiplication_mentale",
      "entier_division_mentale",
    ],
  },
  {
    id: "entier_calcul_mental_defi",
    label: "Défis de calcul mental",
    notionId: "entier_calcul_mental",
    prerequis: ["entier_strategie_mentale"],
  },

  /* =========================
     LONGUEURS
  ========================= */
  {
    id: "aire_longueur_mesurer",
    label: "Mesurer une longueur",
    notionId: "aire_longueur",
    prerequis: [],
  },
  {
    id: "aire_longueur_unite",
    label: "Connaître les unités de longueur",
    notionId: "aire_longueur",
    prerequis: ["aire_longueur_mesurer"],
  },
  {
    id: "aire_longueur_convertir",
    label: "Convertir des longueurs",
    notionId: "aire_longueur",
    prerequis: ["aire_longueur_unite"],
  },
  {
    id: "aire_longueur_comparer",
    label: "Comparer des longueurs",
    notionId: "aire_longueur",
    prerequis: ["aire_longueur_mesurer"],
  },
  {
    id: "aire_longueur_probleme",
    label: "Résoudre un problème de longueurs",
    notionId: "aire_longueur",
    prerequis: ["aire_longueur_convertir", "aire_longueur_comparer"],
  },
  {
    id: "aire_longueur_defi",
    label: "Défis de longueurs",
    notionId: "aire_longueur",
    prerequis: ["aire_longueur_probleme"],
  },

  /* =========================
     PERIMETRES
  ========================= */
  {
    id: "aire_perimetre_comprendre",
    label: "Comprendre le périmètre",
    notionId: "aire_perimetre",
    prerequis: ["aire_longueur_mesurer"],
  },
  {
    id: "aire_perimetre_carre",
    label: "Calculer le périmètre d’un carré",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_comprendre"],
  },
  {
    id: "aire_perimetre_rectangle",
    label: "Calculer le périmètre d’un rectangle",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_comprendre"],
  },
  {
    id: "aire_perimetre_figure",
    label: "Calculer le périmètre d’une figure",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_carre", "aire_perimetre_rectangle"],
  },
  {
    id: "aire_perimetre_probleme",
    label: "Résoudre un problème de périmètre",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_figure"],
  },
  {
    id: "aire_perimetre_defi",
    label: "Défis de périmètre",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_probleme"],
  },

  /* =========================
     AIRES
  ========================= */
  {
    id: "aire_comprendre",
    label: "Comprendre l’aire",
    notionId: "aire_surface",
    prerequis: ["aire_perimetre_comprendre"],
  },
  {
    id: "aire_compter",
    label: "Calculer une aire par comptage",
    notionId: "aire_surface",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_rectangle",
    label: "Calculer l’aire d’un rectangle",
    notionId: "aire_surface",
    prerequis: ["aire_compter", "aire_perimetre_rectangle"],
  },
  {
    id: "aire_carre",
    label: "Calculer l’aire d’un carré",
    notionId: "aire_surface",
    prerequis: ["aire_compter", "aire_perimetre_carre"],
  },
  {
    id: "aire_comparer",
    label: "Comparer des aires",
    notionId: "aire_surface",
    prerequis: ["aire_rectangle", "aire_carre"],
  },
  {
    id: "aire_decomposer",
    label: "Décomposer une figure pour calculer son aire",
    notionId: "aire_surface",
    prerequis: ["aire_rectangle", "aire_carre", "aire_comparer"],
  },
  {
    id: "aire_probleme",
    label: "Résoudre des problèmes d’aires",
    notionId: "aire_surface",
    prerequis: [
      "aire_rectangle",
      "aire_carre",
      "aire_decomposer",
      "decimal_multiplier",
      "prop_reconnaitre",
    ],
  },
  {
    id: "aire_defi",
    label: "Défis sur les aires",
    notionId: "aire_surface",
    prerequis: ["aire_comparer", "aire_decomposer", "aire_probleme"],
  },

  /* =========================
     VOLUMES
  ========================= */
  {
    id: "volume_unite",
    label: "Comprendre l’unité de volume",
    notionId: "volume_solide",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "volume_compter",
    label: "Compter des volumes",
    notionId: "volume_solide",
    prerequis: ["volume_unite", "aire_compter"],
  },
  {
    id: "volume_comparer",
    label: "Comparer des volumes",
    notionId: "volume_solide",
    prerequis: ["volume_compter"],
  },
  {
    id: "volume_assemblage",
    label: "Assembler des volumes",
    notionId: "volume_solide",
    prerequis: ["volume_compter"],
  },
  {
    id: "volume_lire",
    label: "Lire un volume",
    notionId: "volume_solide",
    prerequis: ["volume_compter"],
  },
  {
    id: "volume_defi",
    label: "Défis sur les volumes",
    notionId: "volume_solide",
    prerequis: ["volume_lire"],
  },

  /* =========================
     ANGLES
  ========================= */
  {
    id: "angle_reconnaitre",
    label: "Reconnaître un angle",
    notionId: "angle_mesure",
    prerequis: [],
  },
  {
    id: "angle_droit",
    label: "Reconnaître un angle droit",
    notionId: "angle_mesure",
    prerequis: ["angle_reconnaitre"],
  },
  {
    id: "angle_comparer",
    label: "Comparer des angles",
    notionId: "angle_mesure",
    prerequis: ["angle_droit"],
  },
  {
    id: "angle_mesurer",
    label: "Mesurer un angle",
    notionId: "angle_mesure",
    prerequis: ["angle_reconnaitre"],
  },
  {
    id: "angle_tracer",
    label: "Tracer un angle",
    notionId: "angle_mesure",
    prerequis: ["angle_mesurer"],
  },
  {
    id: "angle_defi",
    label: "Défis sur les angles",
    notionId: "angle_mesure",
    prerequis: ["angle_tracer"],
  },

  /* =========================
     TRIANGLES
  ========================= */
  {
    id: "triangle_nommer",
    label: "Nommer un triangle",
    notionId: "triangle_figure",
    prerequis: [],
  },
  {
    id: "triangle_sommet_cote",
    label: "Identifier sommets et côtés",
    notionId: "triangle_figure",
    prerequis: ["triangle_nommer"],
  },
  {
    id: "triangle_type_cote",
    label: "Reconnaître un triangle selon ses côtés",
    notionId: "triangle_figure",
    prerequis: ["triangle_sommet_cote"],
  },
  {
    id: "triangle_type_angle",
    label: "Reconnaître un triangle selon ses angles",
    notionId: "triangle_figure",
    prerequis: ["angle_droit", "angle_comparer"],
  },
  {
    id: "triangle_defi",
    label: "Défis : reconnaître un triangle",
    notionId: "triangle_figure",
    prerequis: ["triangle_type_cote", "triangle_type_angle"],
  },

  /* =========================
     TRIANGLES : ANGLES ET CONSTRUCTIBILITÉ
     ⛔ Séparé de « Triangles » le 21/08/2026. Reconnaître une figure se joue
     sur un DESSIN (canvas `triangle` : codages, angle droit marqué) ; ce qui
     suit se joue sur des NOMBRES — 180°, un angle manquant, trois longueurs
     qui ne ferment pas. Deux gestes, deux notions.
  ========================= */
  {
    id: "triangle_somme_angle",
    label: "Utiliser la somme des angles d’un triangle",
    notionId: "triangle_propriete",
    prerequis: ["triangle_type_angle"],
  },
  {
    id: "triangle_angle_manquant",
    label: "Déterminer un angle manquant",
    notionId: "triangle_propriete",
    prerequis: ["triangle_somme_angle"],
  },
  {
    id: "triangle_possible_ou_non",
    label: "Déterminer si un triangle est possible",
    notionId: "triangle_propriete",
    prerequis: ["triangle_sommet_cote"],
  },
  {
    id: "triangle_propriete_defi",
    label: "Défis : angles et constructibilité",
    notionId: "triangle_propriete",
    prerequis: [
      "triangle_somme_angle",
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
    notionId: "quadrilatere_figure",
    prerequis: [],
  },
  {
    id: "quadrilatere_identifier_nature",
    label: "Identifier la nature d’un quadrilatère",
    notionId: "quadrilatere_figure",
    prerequis: ["quadrilatere_nommer_vocabulaire"],
  },
  {
    id: "quadrilatere_distinguer",
    label: "Distinguer les quadrilatères",
    notionId: "quadrilatere_figure",
    prerequis: ["quadrilatere_identifier_nature"],
  },
  {
    id: "quadrilatere_defi",
    label: "Défis : reconnaître un quadrilatère",
    notionId: "quadrilatere_figure",
    prerequis: ["quadrilatere_identifier_nature", "quadrilatere_distinguer"],
  },

  /* =========================
     QUADRILATÈRES : PROPRIÉTÉS ET CONSTRUCTION
     ⛔ Séparé de « Quadrilatères » le 21/08/2026. Cinq des huit micros
     tournaient autour d'un même geste ; couper plutôt que fusionner (choix de
     Frédéric) sépare les deux moments réels du cours — reconnaître SUR UN
     DESSIN (le canvas code les côtés égaux, les angles droits, les parallèles)
     puis raisonner SANS dessin à partir des propriétés (« 4 côtés égaux et
     aucun angle droit, donc losange », « un carré est-il un rectangle ? »).
  ========================= */
  {
    id: "quadrilatere_lire_propriete",
    label: "Lire les propriétés d’un quadrilatère",
    notionId: "quadrilatere_propriete",
    prerequis: [
      "angle_droit",
      "angle_comparer",
      "quadrilatere_nommer_vocabulaire",
    ],
  },
  {
    id: "quadrilatere_lien_propriete",
    label: "Faire le lien entre propriétés et nature",
    notionId: "quadrilatere_propriete",
    prerequis: [
      "quadrilatere_identifier_nature",
      "quadrilatere_lire_propriete",
    ],
  },
  {
    id: "quadrilatere_conclusion",
    label: "Conclure sur la nature d’un quadrilatère",
    notionId: "quadrilatere_propriete",
    prerequis: [
      "quadrilatere_lire_propriete",
      "quadrilatere_lien_propriete",
    ],
  },
  {
    id: "quadrilatere_completer_construire",
    label: "Compléter ou construire un quadrilatère",
    notionId: "quadrilatere_propriete",
    prerequis: [
      "quadrilatere_lire_propriete",
      "quadrilatere_lien_propriete",
    ],
  },
  {
    id: "quadrilatere_propriete_defi",
    label: "Défis : propriétés et inclusions",
    notionId: "quadrilatere_propriete",
    prerequis: ["quadrilatere_lien_propriete", "quadrilatere_conclusion"],
  },

  /* =========================
     LE CERCLE ET LE PÉRIMÈTRE DU DISQUE
     ⛔ Ouvert le 21/08/2026 : le BO de 6e le demande, le coach n'en avait
     aucune micro — dans aucune classe. La proportionnalité vient AVANT la
     formule, comme dans le BO : π n'est pas un nombre tombé du ciel, c'est le
     quotient tour ÷ diamètre, le même pour tous les disques.
  ========================= */
  {
    id: "cercle_vocabulaire",
    label: "Centre, rayon, diamètre : le vocabulaire du cercle",
    notionId: "cercle_disque",
    prerequis: ["aire_longueur_mesurer"],
  },
  {
    id: "cercle_proportionnel",
    label: "Savoir que le tour du disque est proportionnel à son diamètre",
    notionId: "cercle_disque",
    prerequis: ["cercle_vocabulaire"],
  },
  {
    id: "cercle_perimetre",
    label: "Calculer le périmètre d’un disque (P = π × d)",
    notionId: "cercle_disque",
    prerequis: ["cercle_proportionnel"],
  },
  {
    id: "cercle_defi",
    label: "Défis : roues, rond-point et figures composées",
    notionId: "cercle_disque",
    prerequis: ["cercle_perimetre"],
  },

  /* =========================
     SYMETRIE
  ========================= */
  {
    id: "sym_reconnaitre",
    label: "Reconnaître une symétrie axiale",
    notionId: "sym_axiale",
    prerequis: [],
  },
  {
    id: "sym_point",
    label: "Construire l’image d’un point",
    notionId: "sym_axiale",
    prerequis: ["sym_reconnaitre"],
  },
  {
    id: "sym_figure",
    label: "Construire l’image d’une figure",
    notionId: "sym_axiale",
    prerequis: ["sym_point"],
  },
  {
    id: "sym_propriete",
    label: "Utiliser les propriétés de la symétrie",
    notionId: "sym_axiale",
    prerequis: ["sym_figure"],
  },
  {
    id: "sym_axe",
    label: "Identifier des axes de symétrie",
    notionId: "sym_axiale",
    prerequis: ["sym_reconnaitre"],
  },
  {
    id: "sym_defi",
    label: "Défis symétrie",
    notionId: "sym_axiale",
    prerequis: [
      "sym_reconnaitre",
      "sym_point",
      "sym_figure",
      "sym_propriete",
      "sym_axe",
    ],
  },
    /* =========================
     ALGORITHMIQUE
  ========================= */
  {
    id: "algo_sequence",
    label: "Comprendre une suite d’instructions",
    notionId: "algo_programmation",
    prerequis: ["entier_strategie_mentale"],
  },
  {
    id: "algo_deplacement",
    label: "Programmer un déplacement simple",
    notionId: "algo_programmation",
    prerequis: ["algo_sequence", "aire_longueur_mesurer", "angle_droit"],
  },
  {
    id: "algo_repetition",
    label: "Utiliser une répétition simple",
    notionId: "algo_programmation",
    prerequis: ["algo_sequence", "entier_multiplication_mentale"],
  },
  {
    id: "algo_lire_programme",
    label: "Lire et prévoir le résultat d’un programme",
    notionId: "algo_programmation",
    prerequis: ["algo_sequence", "algo_deplacement", "algo_repetition"],
  },
  {
    id: "algo_figure",
    label: "Construire une figure avec un programme",
    notionId: "algo_programmation",
    prerequis: [
      "algo_deplacement",
      "algo_repetition",
      "angle_droit",
      "triangle_sommet_cote",
      "quadrilatere_nommer_vocabulaire",
    ],
  },
  {
    id: "algo_defi",
    label: "Défis d’algorithmique et programmation",
    notionId: "algo_programmation",
    prerequis: ["algo_lire_programme", "algo_figure"],
  },

  /* =========================
     DONNEES
  ========================= */
  {
    id: "stat_donnee_lire_tableau",
    label: "Lire un tableau",
    notionId: "stat_donnee",
    prerequis: [],
  },
  {
    id: "stat_donnee_lire_graphique",
    label: "Lire un graphique",
    notionId: "stat_donnee",
    prerequis: ["stat_donnee_lire_tableau"],
  },
  {
    id: "stat_donnee_lire_circulaire",
    label: "Lire un diagramme circulaire",
    notionId: "stat_donnee",
    prerequis: ["stat_donnee_lire_graphique"],
  },
  {
    id: "stat_donnee_prelever",
    label: "Prélever une information",
    notionId: "stat_donnee",
    prerequis: ["stat_donnee_lire_tableau", "stat_donnee_lire_graphique"],
  },
  {
    id: "stat_donnee_comparer",
    label: "Comparer des données",
    notionId: "stat_donnee",
    prerequis: ["stat_donnee_prelever"],
  },
  {
    id: "stat_donnee_interpreter",
    label: "Interpréter des données",
    notionId: "stat_donnee",
    prerequis: ["stat_donnee_prelever", "stat_donnee_comparer"],
  },
  {
    id: "stat_donnee_defi",
    label: "Défis données",
    notionId: "stat_donnee",
    prerequis: [
      "stat_donnee_lire_tableau",
      "stat_donnee_lire_graphique",
      "stat_donnee_lire_circulaire",
      "stat_donnee_prelever",
      "stat_donnee_comparer",
      "stat_donnee_interpreter",
    ],
  },

  /* =========================
     PROBABILITES
  ========================= */
  {
    id: "proba_vocabulaire",
    label: "Connaître le vocabulaire des probabilités",
    notionId: "proba_experience",
    prerequis: [],
  },
  {
    id: "proba_comparer",
    label: "Comparer des probabilités",
    notionId: "proba_experience",
    prerequis: ["proba_vocabulaire"],
  },
  {
    id: "proba_issue",
    label: "Identifier les issues possibles",
    notionId: "proba_experience",
    prerequis: ["proba_vocabulaire"],
  },
  {
    id: "proba_estimer",
    label: "Estimer une probabilité",
    notionId: "proba_experience",
    prerequis: ["proba_comparer"],
  },
  {
    id: "proba_lire",
    label: "Lire une situation probabiliste",
    notionId: "proba_experience",
    prerequis: ["proba_issue"],
  },
  {
    id: "proba_defi",
    label: "Défis probabilités",
    notionId: "proba_experience",
    prerequis: [
      "proba_vocabulaire",
      "proba_comparer",
      "proba_issue",
      "proba_estimer",
      "proba_lire",
    ],
  },
];