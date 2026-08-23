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
  // ⛔ AJOUTÉES LE 23/08/2026 — deux objectifs du programme (6e-N-entiers-9 et
  // 6e-N-entiers-10) que personne ne couvrait. `entier_encadrer` existait, mais
  // il ne traite que les entiers : en 6e l'encadrement porte sur les décimaux.
  {
    id: "decimal_arrondir",
    label: "Arrondir un nombre décimal",
    notionId: "decimal_nombre",
    prerequis: ["decimal_comparer"],
  },
  {
    id: "decimal_encadrer",
    label: "Encadrer et intercaler des nombres décimaux",
    notionId: "decimal_nombre",
    prerequis: ["decimal_comparer"],
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
  // ⛔ AJOUTÉE LE 23/08/2026 (6e-N-entiers-12). Rangée dans le CALCUL et non
  // dans « Nombres décimaux » : multiplier par 0,1 est une opération, et c'est
  // le cas particulier le plus utile de `decimal_multiplier`.
  {
    id: "decimal_multiplier_par_01",
    label: "Multiplier par 0,1 · 0,01 · 0,001",
    notionId: "decimal_calcul",
    prerequis: ["decimal_multiplier"],
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
     LA DEMI-DROITE GRADUÉE
     ⛔ Ouverte le 23/08/2026. Deux objectifs du programme (6e-N-entiers-7 pour
     les décimaux, 6e-N-fractions-3 pour les fractions) demandent le MÊME geste :
     situer un nombre sur une droite. Les séparer aurait coupé en deux ce qui
     est un seul objet — celui, précisément, qui fait entrer les fractions dans
     la famille des nombres.
     ⚠️ « Placer » se pose à l'envers dans le coach : on ne fait pas glisser un
     point, on désigne celui qui convient parmi plusieurs.
  ========================= */
  {
    id: "abscisse_lire",
    label: "Lire l’abscisse d’un point",
    notionId: "demi_droite_graduee",
    prerequis: ["decimal_comparer"],
  },
  {
    id: "abscisse_placer",
    label: "Placer un nombre décimal",
    notionId: "demi_droite_graduee",
    prerequis: ["abscisse_lire"],
  },
  {
    id: "abscisse_fraction",
    label: "Repérer et placer une fraction",
    notionId: "demi_droite_graduee",
    prerequis: ["abscisse_lire"],
  },
  {
    id: "abscisse_graduer",
    label: "Graduer un segment de longueur donnée",
    notionId: "demi_droite_graduee",
    prerequis: ["abscisse_fraction"],
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
    // ⛔ PASSÉE SOUS « Calculer avec les fractions » le 22/08/2026. « La moitié
    // de 10 », « le quart de 20 » : c'est déjà la fraction comme OPÉRATEUR
    // MULTIPLICATIF du programme, pas une façon de lire un nombre. Elle ouvre
    // donc la notion de calcul, avec les items du BO (2/5 de 60).
    id: "fraction_quantite",
    label: "Prendre une fraction d’un nombre",
    notionId: "fraction_calcul",
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
  // ⛔ AJOUTÉE LE 23/08/2026 (6e-N-fractions-8). `fraction_comparer` s'arrêtait
  // aux fractions inférieures à 1 : ordonner une liste mêlant fractions et
  // NOMBRES MIXTES n'était travaillé nulle part. Elle referme aussi la note de
  // 6e-N-entiers-6, qui réclamait l'écriture mixte parmi les écritures d'un
  // nombre décimal.
  {
    id: "fraction_mixte",
    label: "Encadrer et ordonner, écriture mixte",
    notionId: "fraction_nombre",
    prerequis: ["fraction_comparer"],
  },
  {
    id: "fraction_defi",
    label: "Défis sur les fractions",
    notionId: "fraction_nombre",
    prerequis: ["fraction_comparer"],
  },

  /* =========================
     CALCULER AVEC LES FRACTIONS
     ⛔ Ouvert le 22/08/2026. « Effectuer des opérations sur les fractions » est
     un objectif d'apprentissage du programme de 6e, et le coach n'en avait
     RIEN : additionner et soustraire (même dénominateur, dénominateurs
     multiples l'un de l'autre, puis cas simples quelconques 5/4 + 2/3 et
     7/2 − 3/5), multiplier une fraction par un entier et connaître la
     commutativité de ce produit.
  ========================= */
  {
    id: "fraction_additionner",
    label: "Additionner et soustraire des fractions",
    notionId: "fraction_calcul",
    prerequis: ["fraction_comparer"],
  },
  {
    id: "fraction_multiplier_entier",
    label: "Multiplier une fraction par un nombre entier",
    notionId: "fraction_calcul",
    prerequis: ["fraction_quantite"],
  },
  {
    id: "fraction_calcul_defi",
    label: "Défis de calcul avec les fractions",
    notionId: "fraction_calcul",
    prerequis: ["fraction_additionner", "fraction_multiplier_entier"],
  },

  /* =========================
     ALGÈBRE : PROBLÈMES À NOMBRES INCONNUS ET MOTIFS
     ⛔ Ouvert le 22/08/2026 : deux objectifs du programme de 6e, zéro micro.
     ⭐ En 6e on ne pose PAS d'équation : on dessine la relation. La « part »
     du schéma en barres joue exactement le rôle que la lettre jouera en 5e.
  ========================= */
  {
    id: "algebre_barres",
    label: "Traduire un problème par un schéma en barres",
    notionId: "algebre_probleme",
    prerequis: ["entier_addition_mentale"],
  },
  {
    id: "algebre_inconnues",
    label: "Trouver deux nombres inconnus par échange",
    notionId: "algebre_probleme",
    prerequis: ["algebre_barres"],
  },
  {
    id: "algebre_motif",
    label: "Motif évolutif : régularité et structure",
    notionId: "algebre_probleme",
    prerequis: ["entier_multiplication_mentale"],
  },
  {
    id: "algebre_defi",
    label: "Défis : remonter un motif, partages en parts",
    notionId: "algebre_probleme",
    prerequis: ["algebre_inconnues", "algebre_motif"],
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
  // ─── Comprendre l'aire et ses unités ──────────────────────────────────────
  // ⛔ Ces trois micros sont passées de `aire_surface` à `aire_unite` le
  // 23/08/2026. Elles forment l'étage des AUTOMATISMES du programme : ce qu'est
  // une surface, comment on la mesure au carreau, et dans quelle unité on la
  // dit. `aire_convertir` était le trou 6e-GM-aires-1.
  {
    id: "aire_comprendre",
    label: "Comprendre l’aire",
    notionId: "aire_unite",
    prerequis: ["aire_perimetre_comprendre"],
  },
  {
    id: "aire_compter",
    label: "Calculer une aire par comptage",
    notionId: "aire_unite",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_convertir",
    label: "Convertir des aires",
    notionId: "aire_unite",
    prerequis: ["aire_compter"],
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
     LE REPÉRAGE DANS LE TEMPS ET LES DURÉES
     ⛔ Ouvert le 22/08/2026 : trois objectifs d'apprentissage du programme de
     6e, zéro micro dans le coach. Le temps ne se compte pas en base dix, et
     c'est là que l'élève tombe — 8 h 50 + 20 min n'est pas 8 h 70, 1,30 h n'est
     pas 1 h 30. `duree_decimale` porte ce point à elle seule.
  ========================= */
  {
    id: "duree_calculer",
    label: "Calculer un horaire ou une durée",
    notionId: "duree_temps",
    prerequis: ["entier_addition_mentale"],
  },
  {
    id: "duree_convertir",
    label: "Convertir des durées (h, min, s, jours)",
    notionId: "duree_temps",
    prerequis: ["duree_calculer"],
  },
  {
    id: "duree_decimale",
    label: "Passer de l’écriture décimale d’une durée aux minutes",
    notionId: "duree_temps",
    prerequis: ["duree_convertir", "decimal_lire_ecrire"],
  },
  {
    id: "duree_probleme",
    label: "Résoudre un problème d’horaires",
    notionId: "duree_temps",
    prerequis: ["duree_calculer", "duree_convertir"],
  },
  {
    id: "duree_defi",
    label: "Défis : passer minuit, lire un tableau d’horaires",
    notionId: "duree_temps",
    prerequis: ["duree_probleme"],
  },

  /* =========================
     DISTANCES ET MILIEU D'UN SEGMENT
     ⛔ Ouvert le 22/08/2026 : c'est la première notion de géométrie du
     programme de 6e, et le coach n'en avait rien. Elle porte l'inégalité
     AC + CB ⩾ AB, que le BO fait ADMETTRE ici et qui resservira toute l'année.
     ⚠️ `distance_inegalite` et `triangle_possible_ou_non` sont deux visages de
     la même inégalité : ici trois POINTS et la question de l'alignement, là
     trois LONGUEURS et la question de la construction. Le BO les range dans
     deux chapitres, et l'élève ne les croise pas au même moment.
  ========================= */
  {
    id: "distance_definition",
    label: "Distance entre deux points : (AB), [AB] et AB",
    notionId: "distance_segment",
    prerequis: ["aire_longueur_mesurer"],
  },
  {
    id: "distance_milieu",
    label: "Le milieu d’un segment",
    notionId: "distance_segment",
    prerequis: ["distance_definition"],
  },
  {
    id: "distance_inegalite",
    label: "Le plus court chemin : AC + CB ⩾ AB",
    notionId: "distance_segment",
    prerequis: ["distance_definition"],
  },
  {
    id: "distance_defi",
    label: "Défis : milieux emboîtés, alignement",
    notionId: "distance_segment",
    prerequis: ["distance_milieu", "distance_inegalite"],
  },

  /* =========================
     LA BISSECTRICE D'UN ANGLE
     ⛔ Ouvert le 22/08/2026 : deux objectifs du programme de 6e, zéro micro.
     ⚠️ « Saillant » n'est pas un détail : deux demi-droites de même origine
     définissent DEUX angles, et le programme se limite au plus petit.
  ========================= */
  {
    id: "bissectrice_definition",
    label: "Définition : partager l’angle en deux angles égaux",
    notionId: "bissectrice_angle",
    prerequis: ["angle_reconnaitre", "angle_comparer"],
  },
  {
    id: "bissectrice_construire",
    label: "Construire une bissectrice (pliage, rapporteur)",
    notionId: "bissectrice_angle",
    prerequis: ["bissectrice_definition", "angle_mesurer"],
  },
  {
    id: "bissectrice_probleme",
    label: "Calculer un angle à partir d’une bissectrice",
    notionId: "bissectrice_angle",
    prerequis: ["bissectrice_definition"],
  },
  {
    id: "bissectrice_defi",
    label: "Défis : bissectrices successives, unicité",
    notionId: "bissectrice_angle",
    prerequis: ["bissectrice_construire", "bissectrice_probleme"],
  },

  /* =========================
     LA VISION DANS L'ESPACE
     ⛔ Ouvert le 22/08/2026 : l'un des deux chapitres du domaine « Espace et
     géométrie », zéro micro dans le coach.
     ⭐ Le cœur du chapitre est ce qu'on NE VOIT PAS. Compter les faces
     visibles donne toujours un nombre trop petit ; on compte par étages.
  ========================= */
  {
    id: "vision_vues",
    label: "Les quatre vues : dessus, face, gauche, droite",
    notionId: "vision_espace",
    prerequis: ["volume_assemblage"],
  },
  {
    id: "vision_denombrer",
    label: "Compter les cubes d’un empilement, cachés compris",
    notionId: "vision_espace",
    prerequis: ["volume_compter"],
  },
  {
    id: "vision_representation",
    label: "Perspective cavalière, dessin à main levée, patron",
    notionId: "vision_espace",
    prerequis: ["vision_vues"],
  },
  {
    id: "vision_defi",
    label: "Défis : cubes cachés, cube peint puis découpé",
    notionId: "vision_espace",
    prerequis: ["vision_denombrer", "vision_representation"],
  },

  /* =========================
     MÉDIATRICES D'UN TRIANGLE ET CERCLE CIRCONSCRIT
     ⛔ Ouvert le 22/08/2026. C'est la PREMIÈRE PREUVE de l'année : le BO
     demande que l'élève « comprenne pourquoi » et « restitue les arguments ».
     D'où le poids des questions ouvertes ici — restituer une preuve ne se
     coche pas dans un QCM.
  ========================= */
  {
    id: "circonscrit_concourantes",
    label: "Les trois médiatrices d'un triangle sont concourantes",
    notionId: "cercle_circonscrit",
    prerequis: ["mediatrice_propriete", "triangle_nommer"],
  },
  {
    id: "circonscrit_construire",
    label: "Construire le cercle circonscrit à un triangle",
    notionId: "cercle_circonscrit",
    prerequis: ["circonscrit_concourantes", "mediatrice_construire"],
  },
  {
    id: "circonscrit_defi",
    label: "Défis : trois points à égale distance, points alignés",
    notionId: "cercle_circonscrit",
    prerequis: ["circonscrit_construire"],
  },

  /* =========================
     LA MÉDIATRICE D'UN SEGMENT
     ⛔ Ouvert le 22/08/2026 : trois objectifs du programme de 6e, zéro micro.
     ⭐ `mediatrice_propriete` porte la propriété caractéristique DANS LES DEUX
     SENS. C'est le second — « équidistant, donc sur la médiatrice » — qui sert
     à démontrer, et c'est celui que l'élève oublie.
  ========================= */
  {
    id: "mediatrice_definition",
    label: "Définition : perpendiculaire ET passant par le milieu",
    notionId: "mediatrice_segment",
    prerequis: ["distance_milieu", "angle_droit"],
  },
  {
    id: "mediatrice_propriete",
    label: "La propriété caractéristique, dans les deux sens",
    notionId: "mediatrice_segment",
    prerequis: ["mediatrice_definition"],
  },
  {
    id: "mediatrice_construire",
    label: "Construire une médiatrice (compas, équerre, pliage)",
    notionId: "mediatrice_segment",
    prerequis: ["mediatrice_definition"],
  },
  {
    id: "mediatrice_probleme",
    label: "Milieu d’une corde, centre inconnu d’un cercle",
    notionId: "mediatrice_segment",
    prerequis: ["mediatrice_propriete", "cercle_vocabulaire"],
  },
  {
    id: "mediatrice_defi",
    label: "Défis : triangle isocèle, point équidistant de trois points",
    notionId: "mediatrice_segment",
    prerequis: ["mediatrice_probleme"],
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
  // ⛔ AJOUTÉES LE 23/08/2026 — deux objectifs du programme sans micro
  // (6e-G-cercles-2 et 6e-G-cercles-3). Elles se placent JUSTE APRÈS le
  // vocabulaire et AVANT la proportionnalité : définir le cercle comme un
  // ensemble de points, puis s'en servir, précède tout calcul de périmètre.
  {
    id: "cercle_ensemble",
    label: "Le cercle et le disque, ensembles de points",
    notionId: "cercle_disque",
    prerequis: ["cercle_vocabulaire"],
  },
  {
    id: "cercle_distance",
    label: "Problèmes de distances à un point",
    notionId: "cercle_disque",
    prerequis: ["cercle_ensemble"],
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