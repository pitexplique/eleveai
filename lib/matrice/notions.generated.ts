// ⚠️ FICHIER GÉNÉRÉ — NE PAS MODIFIER À LA MAIN.
// Source : lib/tutor-v4/knowledge/<matiere>/<classe>/notions.ts
// Régénérer : node scripts/generer-notions-matrice.mjs
//
// Ce que c'est : les notions RÉELLEMENT au programme de chaque classe, avec
// leur libellé. La matrice d'entrée s'en sert pour deux choses — souffler des
// exemples qui existent vraiment à ce niveau (un élève de Seconde ne doit pas
// lire « les dérivées »), et reconnaître une notion écrite en toutes lettres
// (« vecteurs », « racine carrée ») sans qu'on ait à l'inscrire au lexique.
//
// Elles portent aussi leurs PRÉREQUIS : c'est ce qui permet à « Préparer une
// progression » (côté professeur) de proposer un ORDRE, et pas seulement une
// liste. Un tableau vide veut dire « rien à savoir avant » — donc une notion
// par où l'année peut commencer.
//
// 797 notions, 40 paquets.

export type NotionCoach = { id: string; label: string; prerequis: string[] };

/** matière → classe → notions au programme. */
export const NOTIONS_COACH: Record<string, Record<string, NotionCoach[]>> = {
  "maths": {
    "3e": [
      {
        "id": "algo_programmation",
        "label": "Algorithmique et programmation",
        "prerequis": [
          "litteral_calcul"
        ]
      },
      {
        "id": "fraction_rationnel",
        "label": "Nombres rationnels",
        "prerequis": []
      },
      {
        "id": "entier_puissance",
        "label": "Puissances",
        "prerequis": [
          "fraction_rationnel"
        ]
      },
      {
        "id": "entier_racine_carree",
        "label": "Racine carrée",
        "prerequis": [
          "fraction_rationnel"
        ]
      },
      {
        "id": "entier_arithmetique",
        "label": "Multiples et diviseurs",
        "prerequis": [
          "fraction_rationnel"
        ]
      },
      {
        "id": "prop_proportionnalite",
        "label": "Proportionnalité",
        "prerequis": [
          "fraction_rationnel"
        ]
      },
      {
        "id": "litteral_calcul",
        "label": "Calcul littéral",
        "prerequis": []
      },
      {
        "id": "equation_resolution",
        "label": "Équations",
        "prerequis": [
          "litteral_calcul"
        ]
      },
      {
        "id": "fonction_generalite",
        "label": "Fonctions",
        "prerequis": [
          "prop_proportionnalite"
        ]
      },
      {
        "id": "affine_fonction",
        "label": "Fonctions affines",
        "prerequis": [
          "fonction_generalite",
          "equation_resolution"
        ]
      },
      {
        "id": "triangle_figure",
        "label": "Triangles",
        "prerequis": []
      },
      {
        "id": "pythagore_theoreme",
        "label": "Théorème de Pythagore",
        "prerequis": [
          "triangle_figure"
        ]
      },
      {
        "id": "thales_theoreme",
        "label": "Théorème de Thalès",
        "prerequis": [
          "triangle_figure",
          "prop_proportionnalite"
        ]
      },
      {
        "id": "trigo_trigonometrie",
        "label": "Trigonométrie",
        "prerequis": [
          "triangle_figure",
          "pythagore_theoreme"
        ]
      },
      {
        "id": "sym_transformation",
        "label": "Transformations (dont homothéties)",
        "prerequis": [
          "triangle_figure"
        ]
      },
      {
        "id": "volume_geometrie_espace",
        "label": "Géométrie dans l’espace",
        "prerequis": []
      },
      {
        "id": "sections_solides",
        "label": "Sections planes de solides",
        "prerequis": [
          "volume_geometrie_espace"
        ]
      },
      {
        "id": "aire_perimetre",
        "label": "Périmètres",
        "prerequis": []
      },
      {
        "id": "aire_surface",
        "label": "Aires",
        "prerequis": []
      },
      {
        "id": "volume_solide",
        "label": "Volumes",
        "prerequis": [
          "aire_surface"
        ]
      },
      {
        "id": "stat_statistique",
        "label": "Statistiques",
        "prerequis": []
      },
      {
        "id": "proba_experience",
        "label": "Probabilités",
        "prerequis": []
      }
    ],
    "4e": [
      {
        "id": "algo_programmation",
        "label": "Algorithmique et programmation",
        "prerequis": [
          "litteral_expression",
          "prop_proportionnalite",
          "equation_resolution"
        ]
      },
      {
        "id": "relatif_operation",
        "label": "Opérations sur les nombres relatifs",
        "prerequis": []
      },
      {
        "id": "fraction_nombre",
        "label": "Fractions et nombres rationnels",
        "prerequis": [
          "relatif_operation"
        ]
      },
      {
        "id": "fraction_calcul",
        "label": "Calculer avec les fractions",
        "prerequis": [
          "fraction_nombre"
        ]
      },
      {
        "id": "puissance_ecriture",
        "label": "Puissances et notation scientifique",
        "prerequis": [
          "relatif_operation",
          "fraction_nombre"
        ]
      },
      {
        "id": "reperage",
        "label": "Se repérer sur une droite, dans le plan, sur la Terre",
        "prerequis": [
          "relatif_operation",
          "fraction_nombre"
        ]
      },
      {
        "id": "vision_espace",
        "label": "Solides et représentations",
        "prerequis": [
          "volume_solide"
        ]
      },
      {
        "id": "divisibilite",
        "label": "Multiples, diviseurs et division euclidienne",
        "prerequis": [
          "relatif_operation"
        ]
      },
      {
        "id": "nombre_premier",
        "label": "Nombres premiers et décomposition",
        "prerequis": [
          "divisibilite"
        ]
      },
      {
        "id": "ordre_grandeur",
        "label": "Ordres de grandeur et préfixes",
        "prerequis": [
          "puissance_ecriture"
        ]
      },
      {
        "id": "prop_proportionnalite",
        "label": "Proportionnalité",
        "prerequis": [
          "fraction_nombre"
        ]
      },
      {
        "id": "prop_ratio_pourcentage",
        "label": "Ratios et pourcentages",
        "prerequis": [
          "prop_proportionnalite"
        ]
      },
      {
        "id": "prop_echelle",
        "label": "Agrandissement, réduction et échelles",
        "prerequis": [
          "prop_proportionnalite",
          "aire_surface"
        ]
      },
      {
        "id": "litteral_expression",
        "label": "Expressions littérales",
        "prerequis": [
          "relatif_operation"
        ]
      },
      {
        "id": "litteral_distributivite",
        "label": "Distributivité",
        "prerequis": [
          "litteral_expression"
        ]
      },
      {
        "id": "litteral_identite_remarquable",
        "label": "Identités remarquables",
        "prerequis": [
          "litteral_distributivite"
        ]
      },
      {
        "id": "litteral_factorisation",
        "label": "Factorisation",
        "prerequis": [
          "litteral_distributivite",
          "litteral_identite_remarquable"
        ]
      },
      {
        "id": "equation_resolution",
        "label": "Équations",
        "prerequis": [
          "litteral_expression",
          "litteral_distributivite"
        ]
      },
      {
        "id": "pythagore_theoreme",
        "label": "Pythagore et sa réciproque",
        "prerequis": []
      },
      {
        "id": "thales_theoreme",
        "label": "Thalès et sa réciproque",
        "prerequis": [
          "prop_proportionnalite"
        ]
      },
      {
        "id": "trigo_cosinus",
        "label": "Cosinus dans le triangle rectangle",
        "prerequis": [
          "pythagore_theoreme"
        ]
      },
      {
        "id": "triangle_figure",
        "label": "Le triangle pour démontrer",
        "prerequis": [
          "pythagore_theoreme"
        ]
      },
      {
        "id": "quadrilatere_parallelogramme",
        "label": "Parallélogrammes",
        "prerequis": []
      },
      {
        "id": "sym_transformation",
        "label": "Transformations (symétrie, translation, rotation)",
        "prerequis": []
      },
      {
        "id": "aire_perimetre",
        "label": "Périmètres",
        "prerequis": []
      },
      {
        "id": "aire_surface",
        "label": "Aires",
        "prerequis": [
          "aire_perimetre"
        ]
      },
      {
        "id": "volume_solide",
        "label": "Volumes",
        "prerequis": [
          "aire_surface"
        ]
      },
      {
        "id": "grandeur_composee",
        "label": "Grandeurs composées et unités",
        "prerequis": [
          "aire_surface",
          "volume_solide",
          "prop_proportionnalite"
        ]
      },
      {
        "id": "stat_donnee",
        "label": "Lire et interpréter des données",
        "prerequis": []
      },
      {
        "id": "stat_statistique",
        "label": "Indicateurs statistiques",
        "prerequis": [
          "stat_donnee"
        ]
      },
      {
        "id": "proba_experience",
        "label": "Probabilités",
        "prerequis": [
          "fraction_nombre",
          "stat_statistique"
        ]
      },
      {
        "id": "proba_frequence",
        "label": "Fréquences observées et probabilité",
        "prerequis": [
          "proba_experience",
          "stat_statistique"
        ]
      },
      {
        "id": "fonction_dependance",
        "label": "Dépendance entre deux grandeurs",
        "prerequis": [
          "prop_proportionnalite",
          "litteral_expression",
          "stat_statistique"
        ]
      }
    ],
    "5e": [
      {
        "id": "algo_programmation",
        "label": "Lire et exécuter un programme",
        "prerequis": [
          "litteral_calcul",
          "prop_proportionnalite"
        ]
      },
      {
        "id": "algo_construire",
        "label": "Écrire et modifier un programme",
        "prerequis": [
          "algo_programmation"
        ]
      },
      {
        "id": "relatif_nombre",
        "label": "Nombres relatifs",
        "prerequis": []
      },
      {
        "id": "relatif_operation",
        "label": "Opérations sur les nombres relatifs",
        "prerequis": [
          "relatif_nombre"
        ]
      },
      {
        "id": "divisibilite",
        "label": "Multiples, diviseurs et divisibilité",
        "prerequis": []
      },
      {
        "id": "fraction_nombre",
        "label": "Fractions : reconnaître et comparer",
        "prerequis": []
      },
      {
        "id": "fraction_calcul",
        "label": "Calculer avec les fractions",
        "prerequis": [
          "fraction_nombre"
        ]
      },
      {
        "id": "prop_proportionnalite",
        "label": "Proportionnalité",
        "prerequis": [
          "fraction_nombre"
        ]
      },
      {
        "id": "prop_ratio_pourcentage",
        "label": "Ratios et pourcentages",
        "prerequis": [
          "prop_proportionnalite"
        ]
      },
      {
        "id": "litteral_calcul",
        "label": "Calcul littéral",
        "prerequis": [
          "relatif_operation"
        ]
      },
      {
        "id": "angle_mesure",
        "label": "Angles",
        "prerequis": []
      },
      {
        "id": "triangle_figure",
        "label": "Triangles",
        "prerequis": [
          "angle_mesure"
        ]
      },
      {
        "id": "sym_centrale",
        "label": "Symétrie centrale",
        "prerequis": [
          "angle_mesure"
        ]
      },
      {
        "id": "parallelogramme",
        "label": "Parallélogrammes",
        "prerequis": [
          "sym_centrale",
          "angle_mesure"
        ]
      },
      {
        "id": "aire_surface",
        "label": "Aires",
        "prerequis": [
          "triangle_figure"
        ]
      },
      {
        "id": "grandeur_conversion",
        "label": "Conversions et durées",
        "prerequis": []
      },
      {
        "id": "volume_solide",
        "label": "Volumes",
        "prerequis": [
          "aire_surface"
        ]
      },
      {
        "id": "stat_statistique",
        "label": "Statistiques",
        "prerequis": []
      },
      {
        "id": "proba_experience",
        "label": "Probabilités",
        "prerequis": [
          "stat_statistique"
        ]
      }
    ],
    "6e": [
      {
        "id": "algo_programmation",
        "label": "Algorithmique et programmation",
        "prerequis": [
          "entier_calcul_mental"
        ]
      },
      {
        "id": "entier_nombre",
        "label": "Nombres entiers",
        "prerequis": []
      },
      {
        "id": "decimal_nombre",
        "label": "Nombres décimaux",
        "prerequis": [
          "entier_nombre"
        ]
      },
      {
        "id": "decimal_calcul",
        "label": "Calculer avec les décimaux",
        "prerequis": [
          "decimal_nombre"
        ]
      },
      {
        "id": "demi_droite_graduee",
        "label": "Repérer sur une demi-droite graduée",
        "prerequis": [
          "decimal_nombre"
        ]
      },
      {
        "id": "fraction_nombre",
        "label": "Fractions",
        "prerequis": [
          "decimal_nombre"
        ]
      },
      {
        "id": "fraction_calcul",
        "label": "Calculer avec les fractions",
        "prerequis": [
          "fraction_nombre"
        ]
      },
      {
        "id": "algebre_probleme",
        "label": "Problèmes à nombres inconnus et motifs",
        "prerequis": [
          "entier_calcul_mental"
        ]
      },
      {
        "id": "pourcentage_nombre",
        "label": "Pourcentages",
        "prerequis": [
          "fraction_nombre"
        ]
      },
      {
        "id": "prop_proportionnalite",
        "label": "Proportionnalité",
        "prerequis": [
          "pourcentage_nombre"
        ]
      },
      {
        "id": "prop_echelle",
        "label": "Échelles, plans et cartes",
        "prerequis": [
          "prop_proportionnalite"
        ]
      },
      {
        "id": "entier_calcul_pose",
        "label": "Calcul posé",
        "prerequis": [
          "entier_nombre"
        ]
      },
      {
        "id": "entier_calcul_mental",
        "label": "Calcul mental",
        "prerequis": []
      },
      {
        "id": "aire_longueur",
        "label": "Longueurs",
        "prerequis": []
      },
      {
        "id": "aire_perimetre",
        "label": "Périmètres",
        "prerequis": [
          "aire_longueur"
        ]
      },
      {
        "id": "aire_unite",
        "label": "Comprendre l’aire et ses unités",
        "prerequis": [
          "aire_perimetre"
        ]
      },
      {
        "id": "aire_surface",
        "label": "Calculer une aire",
        "prerequis": [
          "aire_unite"
        ]
      },
      {
        "id": "distance_segment",
        "label": "Distances et milieu d’un segment",
        "prerequis": [
          "aire_longueur"
        ]
      },
      {
        "id": "mediatrice_segment",
        "label": "La médiatrice d’un segment",
        "prerequis": [
          "distance_segment"
        ]
      },
      {
        "id": "bissectrice_angle",
        "label": "La bissectrice d’un angle",
        "prerequis": [
          "angle_mesure"
        ]
      },
      {
        "id": "cercle_circonscrit",
        "label": "Médiatrices d'un triangle et cercle circonscrit",
        "prerequis": [
          "mediatrice_segment",
          "triangle_figure"
        ]
      },
      {
        "id": "cercle_disque",
        "label": "Le cercle et le périmètre du disque",
        "prerequis": [
          "aire_perimetre"
        ]
      },
      {
        "id": "duree_temps",
        "label": "Le repérage dans le temps et les durées",
        "prerequis": [
          "decimal_nombre"
        ]
      },
      {
        "id": "vision_espace",
        "label": "La vision dans l'espace",
        "prerequis": [
          "volume_solide"
        ]
      },
      {
        "id": "volume_solide",
        "label": "Volumes",
        "prerequis": [
          "aire_surface"
        ]
      },
      {
        "id": "angle_mesure",
        "label": "Angles",
        "prerequis": []
      },
      {
        "id": "triangle_figure",
        "label": "Triangles : reconnaître et nommer",
        "prerequis": [
          "angle_mesure"
        ]
      },
      {
        "id": "triangle_propriete",
        "label": "Triangles : angles et constructibilité",
        "prerequis": [
          "triangle_figure"
        ]
      },
      {
        "id": "quadrilatere_figure",
        "label": "Quadrilatères : reconnaître et nommer",
        "prerequis": [
          "angle_mesure"
        ]
      },
      {
        "id": "quadrilatere_propriete",
        "label": "Quadrilatères : propriétés et construction",
        "prerequis": [
          "quadrilatere_figure"
        ]
      },
      {
        "id": "sym_axiale",
        "label": "Symétrie axiale",
        "prerequis": [
          "angle_mesure"
        ]
      },
      {
        "id": "stat_enquete",
        "label": "Mener une enquête et construire un tableau",
        "prerequis": []
      },
      {
        "id": "stat_donnee",
        "label": "Lire et interpréter des données",
        "prerequis": [
          "stat_enquete"
        ]
      },
      {
        "id": "proba_experience",
        "label": "Probabilités",
        "prerequis": [
          "stat_donnee"
        ]
      },
      {
        "id": "proba_frequence",
        "label": "Fréquences observées et probabilité",
        "prerequis": [
          "proba_experience"
        ]
      }
    ],
    "adulte": [
      {
        "id": "calcul_mental_utile",
        "label": "Calculer vite dans la vie courante",
        "prerequis": []
      },
      {
        "id": "argent_budget",
        "label": "Gerer un budget simple",
        "prerequis": [
          "calcul_mental_utile"
        ]
      },
      {
        "id": "prix_comparer",
        "label": "Comparer des prix et des offres",
        "prerequis": [
          "argent_budget"
        ]
      },
      {
        "id": "pourcentages_quotidien",
        "label": "Utiliser les pourcentages au quotidien",
        "prerequis": [
          "calcul_mental_utile"
        ]
      },
      {
        "id": "proportionnalite_pratique",
        "label": "Adapter des quantites",
        "prerequis": [
          "calcul_mental_utile"
        ]
      },
      {
        "id": "fractions_ratios",
        "label": "Utiliser moitie, quart, tiers",
        "prerequis": [
          "calcul_mental_utile"
        ]
      },
      {
        "id": "mesures_conversions",
        "label": "Convertir des mesures courantes",
        "prerequis": [
          "calcul_mental_utile"
        ]
      },
      {
        "id": "durees_trajets",
        "label": "Calculer des durees et des horaires",
        "prerequis": [
          "calcul_mental_utile"
        ]
      },
      {
        "id": "donnees_tableaux",
        "label": "Lire un tableau ou une information chiffree",
        "prerequis": [
          "calcul_mental_utile"
        ]
      },
      {
        "id": "statistiques_simples",
        "label": "Moyennes et reperes simples",
        "prerequis": [
          "donnees_tableaux"
        ]
      }
    ],
    "ce1": [
      {
        "id": "nombre_entier",
        "label": "Nombres jusqu'à 1 000",
        "prerequis": []
      },
      {
        "id": "suite_nombre",
        "label": "Suites de nombres",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "addition_soustraction",
        "label": "Additions et soustractions",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "multiplication",
        "label": "Multiplication",
        "prerequis": [
          "addition_soustraction"
        ]
      },
      {
        "id": "division_partage",
        "label": "Partages et groupements",
        "prerequis": [
          "multiplication"
        ]
      },
      {
        "id": "calcul_mental",
        "label": "Calcul mental",
        "prerequis": [
          "addition_soustraction",
          "multiplication"
        ]
      },
      {
        "id": "fraction",
        "label": "Fractions simples",
        "prerequis": [
          "division_partage"
        ]
      },
      {
        "id": "probleme",
        "label": "Problèmes",
        "prerequis": [
          "calcul_mental"
        ]
      },
      {
        "id": "longueur",
        "label": "Longueurs",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "masse",
        "label": "Masses",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "duree",
        "label": "Temps et durées",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "monnaie",
        "label": "Monnaie",
        "prerequis": [
          "addition_soustraction"
        ]
      },
      {
        "id": "reperage",
        "label": "Repérage sur quadrillage",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "droites_segments",
        "label": "Droites et segments",
        "prerequis": [
          "reperage"
        ]
      },
      {
        "id": "figures_planes",
        "label": "Figures planes",
        "prerequis": [
          "droites_segments"
        ]
      },
      {
        "id": "solides",
        "label": "Solides",
        "prerequis": [
          "figures_planes"
        ]
      },
      {
        "id": "donnees",
        "label": "Tableaux et graphiques simples",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "algorithmique",
        "label": "Instructions et déplacements codés",
        "prerequis": [
          "reperage"
        ]
      }
    ],
    "ce2": [
      {
        "id": "nombre_entier",
        "label": "Nombres jusqu'à 10 000",
        "prerequis": []
      },
      {
        "id": "suite_nombre",
        "label": "Suites de nombres",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "addition_soustraction",
        "label": "Additions et soustractions posées",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "multiplication",
        "label": "Multiplication",
        "prerequis": [
          "addition_soustraction"
        ]
      },
      {
        "id": "division",
        "label": "Partages et groupements",
        "prerequis": [
          "multiplication"
        ]
      },
      {
        "id": "calcul_mental",
        "label": "Calcul mental et fluence",
        "prerequis": [
          "multiplication",
          "division"
        ]
      },
      {
        "id": "fraction",
        "label": "Fractions inférieures ou égales à 1",
        "prerequis": [
          "division"
        ]
      },
      {
        "id": "probleme",
        "label": "Résolution de problèmes",
        "prerequis": [
          "calcul_mental"
        ]
      },
      {
        "id": "longueur",
        "label": "Longueurs",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "masse",
        "label": "Masses",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "contenance",
        "label": "Contenances",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "duree",
        "label": "Temps et durées",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "monnaie",
        "label": "Monnaie et écriture à virgule",
        "prerequis": [
          "addition_soustraction"
        ]
      },
      {
        "id": "perimetre",
        "label": "Périmètres",
        "prerequis": [
          "longueur",
          "addition_soustraction"
        ]
      },
      {
        "id": "reperage",
        "label": "Repérage sur quadrillage",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "droites_angles",
        "label": "Droites, angles droits et codages",
        "prerequis": [
          "reperage"
        ]
      },
      {
        "id": "figures_planes",
        "label": "Figures planes",
        "prerequis": [
          "droites_angles"
        ]
      },
      {
        "id": "solides",
        "label": "Solides",
        "prerequis": [
          "figures_planes"
        ]
      },
      {
        "id": "symetrie",
        "label": "Symétrie axiale",
        "prerequis": [
          "figures_planes"
        ]
      },
      {
        "id": "donnees",
        "label": "Tableaux et diagrammes en barres",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "algorithmique",
        "label": "Programmes et déplacements codés",
        "prerequis": [
          "reperage"
        ]
      }
    ],
    "cm1": [
      {
        "id": "nombre_entier",
        "label": "Nombres entiers",
        "prerequis": []
      },
      {
        "id": "suite",
        "label": "Suites de nombres",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "tables_multiplication",
        "label": "Tables de multiplication",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "multiplication",
        "label": "Multiplication",
        "prerequis": [
          "tables_multiplication"
        ]
      },
      {
        "id": "division",
        "label": "Division",
        "prerequis": [
          "multiplication"
        ]
      },
      {
        "id": "fraction",
        "label": "Fractions",
        "prerequis": [
          "division"
        ]
      },
      {
        "id": "nombre_decimal",
        "label": "Nombres décimaux",
        "prerequis": [
          "fraction"
        ]
      },
      {
        "id": "calcul",
        "label": "Calculs",
        "prerequis": [
          "nombre_entier",
          "nombre_decimal",
          "multiplication"
        ]
      },
      {
        "id": "probleme",
        "label": "Problèmes",
        "prerequis": [
          "calcul"
        ]
      },
      {
        "id": "algebre",
        "label": "Algèbre",
        "prerequis": [
          "calcul",
          "probleme"
        ]
      },
      {
        "id": "proportionnalite",
        "label": "Proportionnalité",
        "prerequis": [
          "multiplication",
          "division"
        ]
      },
      {
        "id": "longueur",
        "label": "Longueurs",
        "prerequis": [
          "nombre_decimal"
        ]
      },
      {
        "id": "masse",
        "label": "Masses",
        "prerequis": [
          "nombre_decimal"
        ]
      },
      {
        "id": "contenance",
        "label": "Contenances",
        "prerequis": [
          "nombre_decimal"
        ]
      },
      {
        "id": "duree",
        "label": "Durées",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "perimetre",
        "label": "Périmètres",
        "prerequis": [
          "longueur"
        ]
      },
      {
        "id": "aire",
        "label": "Aires",
        "prerequis": [
          "longueur",
          "multiplication"
        ]
      },
      {
        "id": "angle",
        "label": "Angles",
        "prerequis": [
          "droite"
        ]
      },
      {
        "id": "reperage",
        "label": "Repérage",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "droite",
        "label": "Droites",
        "prerequis": [
          "reperage"
        ]
      },
      {
        "id": "symetrie",
        "label": "Symétrie",
        "prerequis": [
          "droite"
        ]
      },
      {
        "id": "figure_plane",
        "label": "Figures planes",
        "prerequis": [
          "droite",
          "angle"
        ]
      },
      {
        "id": "solide",
        "label": "Solides",
        "prerequis": [
          "figure_plane"
        ]
      },
      {
        "id": "tableau",
        "label": "Tableaux",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "graphique",
        "label": "Graphiques et diagrammes",
        "prerequis": [
          "tableau"
        ]
      },
      {
        "id": "probabilite",
        "label": "Probabilités simples",
        "prerequis": [
          "tableau"
        ]
      },
      {
        "id": "algorithmique",
        "label": "Algorithmique",
        "prerequis": [
          "reperage"
        ]
      }
    ],
    "cm2": [
      {
        "id": "nombre_entier",
        "label": "Nombres entiers",
        "prerequis": []
      },
      {
        "id": "suite",
        "label": "Suites de nombres",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "multiplication",
        "label": "Multiplication",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "division",
        "label": "Division",
        "prerequis": [
          "multiplication"
        ]
      },
      {
        "id": "fraction",
        "label": "Fractions",
        "prerequis": [
          "division"
        ]
      },
      {
        "id": "fraction_mixte",
        "label": "Fractions supérieures à 1",
        "prerequis": [
          "fraction"
        ]
      },
      {
        "id": "fraction_calcul",
        "label": "Calculer avec les fractions",
        "prerequis": [
          "fraction_mixte"
        ]
      },
      {
        "id": "nombre_decimal",
        "label": "Nombres décimaux",
        "prerequis": [
          "fraction"
        ]
      },
      {
        "id": "calcul",
        "label": "Calculs",
        "prerequis": [
          "nombre_entier",
          "nombre_decimal"
        ]
      },
      {
        "id": "probleme",
        "label": "Problèmes",
        "prerequis": [
          "calcul"
        ]
      },
      {
        "id": "algebre",
        "label": "Algèbre",
        "prerequis": [
          "calcul",
          "probleme"
        ]
      },
      {
        "id": "proportionnalite",
        "label": "Proportionnalité",
        "prerequis": [
          "multiplication",
          "division"
        ]
      },
      {
        "id": "pourcentage",
        "label": "Pourcentages simples",
        "prerequis": [
          "fraction",
          "proportionnalite"
        ]
      },
      {
        "id": "echelle",
        "label": "Échelles simples",
        "prerequis": [
          "proportionnalite",
          "longueur"
        ]
      },
      {
        "id": "longueur",
        "label": "Longueurs",
        "prerequis": [
          "nombre_decimal"
        ]
      },
      {
        "id": "masse",
        "label": "Masses",
        "prerequis": [
          "nombre_decimal"
        ]
      },
      {
        "id": "contenance",
        "label": "Contenances",
        "prerequis": [
          "nombre_decimal"
        ]
      },
      {
        "id": "duree",
        "label": "Durées",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "perimetre",
        "label": "Périmètres",
        "prerequis": [
          "longueur"
        ]
      },
      {
        "id": "aire",
        "label": "Aires",
        "prerequis": [
          "longueur",
          "multiplication"
        ]
      },
      {
        "id": "angle",
        "label": "Angles",
        "prerequis": [
          "droite"
        ]
      },
      {
        "id": "reperage",
        "label": "Repérage",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "droite",
        "label": "Droites",
        "prerequis": [
          "reperage"
        ]
      },
      {
        "id": "symetrie",
        "label": "Symétrie",
        "prerequis": [
          "droite"
        ]
      },
      {
        "id": "figure_plane",
        "label": "Figures planes",
        "prerequis": [
          "droite",
          "angle"
        ]
      },
      {
        "id": "solide",
        "label": "Solides",
        "prerequis": [
          "figure_plane"
        ]
      },
      {
        "id": "tableau",
        "label": "Tableaux",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "graphique",
        "label": "Graphiques et diagrammes",
        "prerequis": [
          "tableau"
        ]
      },
      {
        "id": "probabilite",
        "label": "Probabilités simples",
        "prerequis": [
          "tableau"
        ]
      },
      {
        "id": "algorithmique",
        "label": "Algorithmique",
        "prerequis": [
          "reperage"
        ]
      }
    ],
    "cp": [
      {
        "id": "nombre_entier",
        "label": "Nombres jusqu'à 100",
        "prerequis": []
      },
      {
        "id": "suite_nombre",
        "label": "Suites de nombres",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "addition_soustraction",
        "label": "Additions et soustractions",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "calcul_mental",
        "label": "Calcul mental",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "probleme",
        "label": "Problèmes",
        "prerequis": [
          "addition_soustraction"
        ]
      },
      {
        "id": "longueur",
        "label": "Longueurs",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "masse_contenance",
        "label": "Masses",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "duree",
        "label": "Repérage dans le temps",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "monnaie",
        "label": "Monnaie",
        "prerequis": [
          "addition_soustraction"
        ]
      },
      {
        "id": "reperage",
        "label": "Repérage dans l'espace",
        "prerequis": []
      },
      {
        "id": "figures_solides",
        "label": "Figures planes et solides",
        "prerequis": [
          "reperage"
        ]
      },
      {
        "id": "donnees",
        "label": "Tableaux et diagrammes",
        "prerequis": [
          "nombre_entier"
        ]
      },
      {
        "id": "algorithmique",
        "label": "Instructions et déplacements codés",
        "prerequis": [
          "reperage"
        ]
      }
    ],
    "premiere": [
      {
        "id": "auto_comparer",
        "label": "Comparer deux nombres",
        "prerequis": []
      },
      {
        "id": "auto_fractions_puissances",
        "label": "Fractions, puissances et écritures",
        "prerequis": []
      },
      {
        "id": "auto_ordres_unites",
        "label": "Ordre de grandeur et unités",
        "prerequis": [
          "auto_fractions_puissances"
        ]
      },
      {
        "id": "auto_developper_factoriser",
        "label": "Développer et factoriser",
        "prerequis": []
      },
      {
        "id": "auto_equations",
        "label": "Équations et inéquations",
        "prerequis": [
          "auto_developper_factoriser"
        ]
      },
      {
        "id": "auto_signe_expression",
        "label": "Signe d'une expression",
        "prerequis": [
          "auto_equations"
        ]
      },
      {
        "id": "auto_formules",
        "label": "Formules littérales",
        "prerequis": [
          "auto_equations"
        ]
      },
      {
        "id": "auto_proportion",
        "label": "Proportions",
        "prerequis": [
          "auto_fractions_puissances"
        ]
      },
      {
        "id": "auto_partie_tout",
        "label": "Partie et tout",
        "prerequis": [
          "auto_proportion"
        ]
      },
      {
        "id": "auto_coefficient_multiplicateur",
        "label": "Coefficient multiplicateur",
        "prerequis": [
          "auto_proportion"
        ]
      },
      {
        "id": "auto_taux_evolution",
        "label": "Taux d'évolution",
        "prerequis": [
          "auto_coefficient_multiplicateur"
        ]
      },
      {
        "id": "auto_lecture_graphique",
        "label": "Lire un graphique",
        "prerequis": []
      },
      {
        "id": "auto_resolution_graphique",
        "label": "Résoudre graphiquement",
        "prerequis": [
          "auto_lecture_graphique"
        ]
      },
      {
        "id": "auto_droites",
        "label": "Droites et coefficient directeur",
        "prerequis": [
          "auto_lecture_graphique"
        ]
      },
      {
        "id": "auto_lire_statistiques",
        "label": "Lire des statistiques",
        "prerequis": [
          "auto_lecture_graphique"
        ]
      },
      {
        "id": "auto_indicateurs",
        "label": "Moyenne, médiane, quartiles",
        "prerequis": [
          "auto_lire_statistiques"
        ]
      },
      {
        "id": "auto_proba_base",
        "label": "Probabilités : les bases",
        "prerequis": [
          "auto_proportion"
        ]
      },
      {
        "id": "auto_proba_lecture",
        "label": "Probabilités : lire un tableau, un arbre",
        "prerequis": [
          "auto_proba_base"
        ]
      },
      {
        "id": "info_tableau_croise",
        "label": "Tableau croisé : lire et compléter",
        "prerequis": []
      },
      {
        "id": "info_frequences",
        "label": "Fréquences marginales et conditionnelles",
        "prerequis": [
          "info_tableau_croise",
          "auto_proportion"
        ]
      },
      {
        "id": "info_representations_croisees",
        "label": "Représenter deux caractères",
        "prerequis": [
          "info_tableau_croise"
        ]
      },
      {
        "id": "info_nuage",
        "label": "Nuage de points",
        "prerequis": [
          "auto_lecture_graphique"
        ]
      },
      {
        "id": "info_point_moyen",
        "label": "Point moyen",
        "prerequis": [
          "info_nuage"
        ]
      },
      {
        "id": "info_ajustement_affine",
        "label": "Ajustement affine",
        "prerequis": [
          "info_nuage",
          "auto_droites"
        ]
      },
      {
        "id": "info_interpoler_extrapoler",
        "label": "Interpoler et extrapoler",
        "prerequis": [
          "info_ajustement_affine"
        ]
      },
      {
        "id": "info_tableur",
        "label": "Tableur",
        "prerequis": []
      },
      {
        "id": "info_filtre_donnees",
        "label": "Filtrer des données (ET, OU, NON)",
        "prerequis": [
          "info_tableur",
          "info_tableau_croise"
        ]
      },
      {
        "id": "alea_conditionnelle",
        "label": "Probabilité conditionnelle : reconnaître",
        "prerequis": [
          "auto_proba_lecture",
          "info_frequences"
        ]
      },
      {
        "id": "alea_conditionnelle_calcul",
        "label": "Probabilité conditionnelle : calculer",
        "prerequis": [
          "alea_conditionnelle"
        ]
      },
      {
        "id": "alea_arbre",
        "label": "Arbre pondéré : lire et construire",
        "prerequis": [
          "alea_conditionnelle"
        ]
      },
      {
        "id": "alea_arbre_calcul",
        "label": "Arbre pondéré : calculer",
        "prerequis": [
          "alea_arbre"
        ]
      },
      {
        "id": "alea_independance",
        "label": "Indépendance de deux évènements",
        "prerequis": [
          "alea_conditionnelle_calcul"
        ]
      },
      {
        "id": "alea_bernoulli",
        "label": "Épreuves de Bernoulli : reconnaître",
        "prerequis": [
          "alea_independance"
        ]
      },
      {
        "id": "alea_bernoulli_calcul",
        "label": "Répétition d'épreuves : calculer",
        "prerequis": [
          "alea_bernoulli",
          "alea_arbre_calcul"
        ]
      },
      {
        "id": "lin_suite_arithmetique",
        "label": "Suite arithmétique : reconnaître",
        "prerequis": []
      },
      {
        "id": "lin_suite_terme_general",
        "label": "Suite arithmétique : terme général",
        "prerequis": [
          "lin_suite_arithmetique"
        ]
      },
      {
        "id": "lin_affine",
        "label": "Fonction affine",
        "prerequis": [
          "auto_droites"
        ]
      },
      {
        "id": "lin_affine_lecture",
        "label": "Fonction affine : lire et exploiter",
        "prerequis": [
          "lin_affine"
        ]
      },
      {
        "id": "lin_modeliser",
        "label": "Modéliser une croissance linéaire",
        "prerequis": [
          "lin_suite_terme_general",
          "lin_affine"
        ]
      },
      {
        "id": "lin_seuil",
        "label": "Problème de seuil : croissance linéaire",
        "prerequis": [
          "lin_modeliser"
        ]
      },
      {
        "id": "quad_parabole",
        "label": "Parabole et expression de degré 2",
        "prerequis": [
          "auto_lecture_graphique"
        ]
      },
      {
        "id": "quad_sommet_axe",
        "label": "Parabole : sommet et axe de symétrie",
        "prerequis": [
          "quad_parabole"
        ]
      },
      {
        "id": "quad_variations",
        "label": "Parabole : variations et extremum",
        "prerequis": [
          "quad_sommet_axe"
        ]
      },
      {
        "id": "quad_racines_signe",
        "label": "Racines et signe par la forme factorisée",
        "prerequis": [
          "quad_parabole",
          "auto_signe_expression"
        ]
      },
      {
        "id": "expo_suite_geometrique",
        "label": "Suite géométrique : reconnaître",
        "prerequis": [
          "auto_coefficient_multiplicateur"
        ]
      },
      {
        "id": "expo_suite_terme_general",
        "label": "Suite géométrique : terme général",
        "prerequis": [
          "expo_suite_geometrique"
        ]
      },
      {
        "id": "expo_fonction",
        "label": "Fonction exponentielle x ↦ a^x",
        "prerequis": [
          "expo_suite_geometrique"
        ]
      },
      {
        "id": "expo_fonction_lecture",
        "label": "Fonction exponentielle : variations et courbe",
        "prerequis": [
          "expo_fonction"
        ]
      },
      {
        "id": "expo_taux_moyen",
        "label": "Taux d'évolution moyen",
        "prerequis": [
          "expo_suite_geometrique",
          "auto_taux_evolution"
        ]
      },
      {
        "id": "expo_modeliser",
        "label": "Modéliser une évolution exponentielle",
        "prerequis": [
          "expo_suite_terme_general"
        ]
      },
      {
        "id": "expo_seuil",
        "label": "Problème de seuil : croissance exponentielle",
        "prerequis": [
          "expo_modeliser"
        ]
      },
      {
        "id": "der_graphique",
        "label": "Dérivée — lire un graphique",
        "prerequis": [
          "auto_lecture_graphique"
        ]
      },
      {
        "id": "der_nombre_derive",
        "label": "Dérivée — nombre dérivé et tangente",
        "prerequis": [
          "der_graphique",
          "auto_droites"
        ]
      },
      {
        "id": "der_formules",
        "label": "Dérivée — les formules de base",
        "prerequis": [
          "der_nombre_derive"
        ]
      },
      {
        "id": "der_polynome",
        "label": "Dérivée — polynômes",
        "prerequis": [
          "der_formules"
        ]
      },
      {
        "id": "der_signe",
        "label": "Dérivée — signe",
        "prerequis": [
          "der_polynome",
          "auto_signe_expression"
        ]
      },
      {
        "id": "der_variations",
        "label": "Dérivée — tableau de variations",
        "prerequis": [
          "der_signe"
        ]
      }
    ],
    "premiere-spe": [
      {
        "id": "suites",
        "label": "Suites numériques",
        "prerequis": []
      },
      {
        "id": "second_degre",
        "label": "Second degré",
        "prerequis": []
      },
      {
        "id": "derivation",
        "label": "Dérivation",
        "prerequis": [
          "second_degre"
        ]
      },
      {
        "id": "variations_fonctions",
        "label": "Variations et courbes des fonctions",
        "prerequis": [
          "derivation"
        ]
      },
      {
        "id": "exponentielle",
        "label": "Fonction exponentielle",
        "prerequis": [
          "derivation"
        ]
      },
      {
        "id": "trigonometrie",
        "label": "Fonctions trigonométriques",
        "prerequis": []
      },
      {
        "id": "produit_scalaire",
        "label": "Calcul vectoriel et produit scalaire",
        "prerequis": []
      },
      {
        "id": "geometrie_reperee",
        "label": "Géométrie repérée",
        "prerequis": [
          "produit_scalaire"
        ]
      },
      {
        "id": "probabilites_conditionnelles",
        "label": "Probabilités conditionnelles et indépendance",
        "prerequis": []
      },
      {
        "id": "variables_aleatoires",
        "label": "Variables aléatoires réelles",
        "prerequis": [
          "probabilites_conditionnelles"
        ]
      },
      {
        "id": "algorithmique",
        "label": "Algorithmique et programmation",
        "prerequis": [
          "suites"
        ]
      },
      {
        "id": "logique_ensembles",
        "label": "Vocabulaire ensembliste et logique",
        "prerequis": []
      }
    ],
    "seconde": [
      {
        "id": "reels_intervalles",
        "label": "Nombres reels et intervalles",
        "prerequis": []
      },
      {
        "id": "arithmetique_entiers",
        "label": "Multiples, diviseurs et nombres premiers",
        "prerequis": []
      },
      {
        "id": "puissances_2de",
        "label": "Puissances",
        "prerequis": [
          "reels_intervalles"
        ]
      },
      {
        "id": "racine_carree_2de",
        "label": "Racine carree",
        "prerequis": [
          "reels_intervalles"
        ]
      },
      {
        "id": "developpement_factorisation_2de",
        "label": "Developpement et factorisation",
        "prerequis": [
          "reels_intervalles"
        ]
      },
      {
        "id": "identites_remarquables_2de",
        "label": "Identites remarquables",
        "prerequis": [
          "developpement_factorisation_2de"
        ]
      },
      {
        "id": "expressions_litterales_2de",
        "label": "Expressions litterales",
        "prerequis": [
          "developpement_factorisation_2de"
        ]
      },
      {
        "id": "equations_inequations_1er_degre",
        "label": "Equations et inequations du premier degre",
        "prerequis": [
          "developpement_factorisation_2de",
          "reels_intervalles"
        ]
      },
      {
        "id": "vecteurs_plan",
        "label": "Vecteurs du plan",
        "prerequis": []
      },
      {
        "id": "repere_coordonnees",
        "label": "Repere et coordonnees",
        "prerequis": [
          "reels_intervalles"
        ]
      },
      {
        "id": "droites_plan",
        "label": "Droites du plan",
        "prerequis": [
          "repere_coordonnees",
          "equations_inequations_1er_degre",
          "vecteurs_plan"
        ]
      },
      {
        "id": "geometrie_problemes_plan",
        "label": "Problemes de geometrie plane",
        "prerequis": []
      },
      {
        "id": "fonction_vocabulaire_2de",
        "label": "Fonctions : vocabulaire et representations",
        "prerequis": [
          "reels_intervalles"
        ]
      },
      {
        "id": "fonction_variations_extremums",
        "label": "Variations et extremums",
        "prerequis": [
          "fonction_vocabulaire_2de"
        ]
      },
      {
        "id": "fonctions_affines_2de",
        "label": "Fonctions affines",
        "prerequis": [
          "fonction_vocabulaire_2de",
          "droites_plan"
        ]
      },
      {
        "id": "fonctions_reference_2de",
        "label": "Fonctions de reference",
        "prerequis": [
          "fonction_variations_extremums",
          "developpement_factorisation_2de"
        ]
      },
      {
        "id": "information_chiffree_evolutions",
        "label": "Information chiffree : proportions, pourcentages et evolutions",
        "prerequis": []
      },
      {
        "id": "statistiques_descriptives",
        "label": "Statistiques descriptives",
        "prerequis": []
      },
      {
        "id": "probabilites_ensemble_fini",
        "label": "Probabilites sur un ensemble fini",
        "prerequis": [
          "reels_intervalles"
        ]
      },
      {
        "id": "echantillonnage_simulation",
        "label": "Echantillonnage et simulation",
        "prerequis": [
          "probabilites_ensemble_fini",
          "statistiques_descriptives"
        ]
      },
      {
        "id": "algorithmique_python_2de",
        "label": "Algorithmique et Python",
        "prerequis": [
          "expressions_litterales_2de"
        ]
      },
      {
        "id": "logique_ensembles",
        "label": "Vocabulaire ensembliste et logique",
        "prerequis": []
      }
    ],
    "stmg": [
      {
        "id": "auto_proportion",
        "label": "Proportions et pourcentages",
        "prerequis": []
      },
      {
        "id": "auto_evo_coefficient",
        "label": "Coefficient multiplicateur",
        "prerequis": [
          "auto_proportion"
        ]
      },
      {
        "id": "auto_evo_taux",
        "label": "Calculer un taux d'évolution",
        "prerequis": [
          "auto_evo_coefficient"
        ]
      },
      {
        "id": "auto_evo_enchainees",
        "label": "Évolutions successives et réciproque",
        "prerequis": [
          "auto_evo_taux"
        ]
      },
      {
        "id": "auto_indice",
        "label": "Indice base 100",
        "prerequis": [
          "auto_evo_taux"
        ]
      },
      {
        "id": "auto_fractions_puissances",
        "label": "Fractions, puissances et écritures",
        "prerequis": []
      },
      {
        "id": "auto_ordres_unites",
        "label": "Ordre de grandeur et conversions",
        "prerequis": [
          "auto_fractions_puissances"
        ]
      },
      {
        "id": "auto_developper_factoriser",
        "label": "Développer, factoriser, réduire",
        "prerequis": []
      },
      {
        "id": "auto_equations",
        "label": "Équations et inéquations",
        "prerequis": [
          "auto_developper_factoriser"
        ]
      },
      {
        "id": "auto_signes",
        "label": "Signe d'une expression",
        "prerequis": [
          "auto_equations"
        ]
      },
      {
        "id": "auto_formules",
        "label": "Formules et calcul littéral",
        "prerequis": [
          "auto_equations"
        ]
      },
      {
        "id": "auto_lecture_graphique",
        "label": "Lire une courbe",
        "prerequis": []
      },
      {
        "id": "auto_resolution_graphique",
        "label": "Résoudre graphiquement",
        "prerequis": [
          "auto_lecture_graphique"
        ]
      },
      {
        "id": "auto_droites",
        "label": "Droites et coefficient directeur",
        "prerequis": [
          "auto_lecture_graphique"
        ]
      },
      {
        "id": "auto_donnees_graphiques",
        "label": "Lire des données chiffrées",
        "prerequis": []
      },
      {
        "id": "auto_terminale_reconnaitre",
        "label": "Automatismes de terminale — reconnaître (Tle)",
        "prerequis": [
          "auto_signes"
        ]
      },
      {
        "id": "auto_terminale_derivee",
        "label": "Automatismes de terminale — dérivée et tangente (Tle)",
        "prerequis": [
          "auto_droites"
        ]
      },
      {
        "id": "suite_notation",
        "label": "Suite : notation et modes de génération",
        "prerequis": []
      },
      {
        "id": "suite_termes",
        "label": "Suite : calculer des termes",
        "prerequis": [
          "suite_notation"
        ]
      },
      {
        "id": "suite_arithmetique",
        "label": "Suite arithmétique : reconnaître",
        "prerequis": [
          "suite_termes"
        ]
      },
      {
        "id": "suite_geometrique",
        "label": "Suite géométrique : reconnaître",
        "prerequis": [
          "suite_termes"
        ]
      },
      {
        "id": "suite_geo_evolution",
        "label": "Suite géométrique et taux d'évolution",
        "prerequis": [
          "suite_geometrique",
          "auto_evo_coefficient"
        ]
      },
      {
        "id": "suite_representation",
        "label": "Représenter les termes d'une suite",
        "prerequis": [
          "suite_termes"
        ]
      },
      {
        "id": "suite_modeliser",
        "label": "Modéliser par une suite",
        "prerequis": [
          "suite_arithmetique",
          "suite_geometrique"
        ]
      },
      {
        "id": "suite_seuil",
        "label": "Problème de seuil",
        "prerequis": [
          "suite_modeliser"
        ]
      },
      {
        "id": "suite_terme_general",
        "label": "Terme général d'une suite (Tle)",
        "prerequis": [
          "suite_arithmetique",
          "suite_geometrique"
        ]
      },
      {
        "id": "suite_moyennes",
        "label": "Moyenne arithmétique et géométrique (Tle)",
        "prerequis": [
          "suite_terme_general"
        ]
      },
      {
        "id": "suite_somme",
        "label": "Somme des n premiers termes (Tle)",
        "prerequis": [
          "suite_terme_general"
        ]
      },
      {
        "id": "suite_somme_situations",
        "label": "Sommes : emprunts et placements (Tle)",
        "prerequis": [
          "suite_somme"
        ]
      },
      {
        "id": "suite_comparer",
        "label": "Comparer deux suites (Tle)",
        "prerequis": [
          "suite_terme_general"
        ]
      },
      {
        "id": "fct_representation",
        "label": "Fonction : représenter et noter",
        "prerequis": [
          "auto_lecture_graphique"
        ]
      },
      {
        "id": "fct_taux_variation",
        "label": "Taux de variation et sécante",
        "prerequis": [
          "fct_representation",
          "auto_droites"
        ]
      },
      {
        "id": "fct_monotonie",
        "label": "Fonction monotone sur un intervalle",
        "prerequis": [
          "fct_taux_variation"
        ]
      },
      {
        "id": "fct_degre2_courbe",
        "label": "Degré 2 : la parabole",
        "prerequis": [
          "fct_representation"
        ]
      },
      {
        "id": "fct_degre2_symetrie",
        "label": "Degré 2 : axe de symétrie et extremum",
        "prerequis": [
          "fct_degre2_courbe"
        ]
      },
      {
        "id": "fct_degre2_factorisee",
        "label": "Degré 2 : racines et signe (forme factorisée)",
        "prerequis": [
          "fct_degre2_courbe",
          "auto_signes"
        ]
      },
      {
        "id": "fct_degre2_factoriser",
        "label": "Degré 2 : factoriser connaissant une racine",
        "prerequis": [
          "fct_degre2_factorisee"
        ]
      },
      {
        "id": "fct_degre3",
        "label": "Degré 3 : courbe, racines et signe",
        "prerequis": [
          "fct_degre2_factorisee"
        ]
      },
      {
        "id": "fct_equations_puissance",
        "label": "Résoudre x² = c et x³ = c",
        "prerequis": [
          "auto_equations"
        ]
      },
      {
        "id": "fct_inverse",
        "label": "Fonction inverse (Tle)",
        "prerequis": [
          "fct_representation"
        ]
      },
      {
        "id": "fct_inverse_derivee",
        "label": "Fonction inverse : dérivée et variations (Tle)",
        "prerequis": [
          "fct_inverse"
        ]
      },
      {
        "id": "der_secante_tangente",
        "label": "Dérivée — sécantes et tangente",
        "prerequis": [
          "fct_taux_variation"
        ]
      },
      {
        "id": "der_nombre_derive",
        "label": "Dérivée — nombre dérivé",
        "prerequis": [
          "der_secante_tangente"
        ]
      },
      {
        "id": "der_tangente_equation",
        "label": "Dérivée — équation de la tangente",
        "prerequis": [
          "der_nombre_derive",
          "auto_droites"
        ]
      },
      {
        "id": "der_formules",
        "label": "Dérivée — les formules de base",
        "prerequis": [
          "der_nombre_derive"
        ]
      },
      {
        "id": "der_polynome",
        "label": "Dérivée — polynômes de degré ≤ 3",
        "prerequis": [
          "der_formules"
        ]
      },
      {
        "id": "der_variations",
        "label": "Dérivée — signe et tableau de variations",
        "prerequis": [
          "der_polynome",
          "auto_signes"
        ]
      },
      {
        "id": "der_optimisation",
        "label": "Dérivée — problème d'optimisation",
        "prerequis": [
          "der_variations"
        ]
      },
      {
        "id": "expo_definition",
        "label": "Fonction x ↦ aˣ : définition (Tle)",
        "prerequis": [
          "suite_geometrique"
        ]
      },
      {
        "id": "expo_variations",
        "label": "Fonction x ↦ kaˣ : variations et allure (Tle)",
        "prerequis": [
          "expo_definition"
        ]
      },
      {
        "id": "expo_proprietes",
        "label": "Propriétés algébriques de aˣ (Tle)",
        "prerequis": [
          "expo_definition",
          "auto_fractions_puissances"
        ]
      },
      {
        "id": "expo_taux_moyen",
        "label": "Taux d'évolution moyen (Tle)",
        "prerequis": [
          "expo_proprietes",
          "auto_evo_enchainees"
        ]
      },
      {
        "id": "expo_taux_equivalent",
        "label": "Taux équivalent sur une autre période (Tle)",
        "prerequis": [
          "expo_taux_moyen"
        ]
      },
      {
        "id": "log_definition",
        "label": "Logarithme décimal : définition (Tle)",
        "prerequis": [
          "expo_definition"
        ]
      },
      {
        "id": "log_proprietes",
        "label": "Propriétés algébriques de log (Tle)",
        "prerequis": [
          "log_definition"
        ]
      },
      {
        "id": "log_equations",
        "label": "Résoudre aˣ = b avec le logarithme (Tle)",
        "prerequis": [
          "log_proprietes"
        ]
      },
      {
        "id": "log_applications",
        "label": "Logarithme : durées et ordres de grandeur (Tle)",
        "prerequis": [
          "log_equations"
        ]
      },
      {
        "id": "donnees_tableau_croise",
        "label": "Tableau croisé d'effectifs",
        "prerequis": []
      },
      {
        "id": "donnees_frequences",
        "label": "Fréquences marginales et conditionnelles",
        "prerequis": [
          "donnees_tableau_croise",
          "auto_proportion"
        ]
      },
      {
        "id": "donnees_filtres",
        "label": "Filtrer des données (ET, OU, NON)",
        "prerequis": [
          "donnees_tableau_croise"
        ]
      },
      {
        "id": "stat_nuage",
        "label": "Nuage de points (Tle)",
        "prerequis": [
          "auto_lecture_graphique"
        ]
      },
      {
        "id": "stat_ajustement",
        "label": "Ajustement affine (Tle)",
        "prerequis": [
          "stat_nuage",
          "auto_droites"
        ]
      },
      {
        "id": "stat_interpoler",
        "label": "Interpoler et extrapoler (Tle)",
        "prerequis": [
          "stat_ajustement"
        ]
      },
      {
        "id": "stat_moindres_carres",
        "label": "Méthode des moindres carrés (Tle)",
        "prerequis": [
          "stat_ajustement"
        ]
      },
      {
        "id": "stat_changement_variable",
        "label": "Changement de variable pour linéariser (Tle)",
        "prerequis": [
          "stat_ajustement"
        ]
      },
      {
        "id": "proba_conditionnelle_tableau",
        "label": "Probabilité conditionnelle sur un tableau",
        "prerequis": [
          "donnees_frequences"
        ]
      },
      {
        "id": "proba_conditionnelle_distinguer",
        "label": "Ne pas confondre les probabilités conditionnelles",
        "prerequis": [
          "proba_conditionnelle_tableau"
        ]
      },
      {
        "id": "proba_epreuves_independantes",
        "label": "Deux épreuves indépendantes",
        "prerequis": [
          "proba_conditionnelle_tableau"
        ]
      },
      {
        "id": "proba_arbre",
        "label": "Arbre de probabilités : construire (Tle)",
        "prerequis": [
          "proba_conditionnelle_tableau"
        ]
      },
      {
        "id": "proba_arbre_calcul",
        "label": "Arbre : chemins et probabilités totales (Tle)",
        "prerequis": [
          "proba_arbre"
        ]
      },
      {
        "id": "proba_independance",
        "label": "Indépendance de deux événements (Tle)",
        "prerequis": [
          "proba_arbre_calcul"
        ]
      },
      {
        "id": "va_loi_probabilite",
        "label": "Variable aléatoire : loi de probabilité",
        "prerequis": [
          "proba_epreuves_independantes"
        ]
      },
      {
        "id": "va_esperance",
        "label": "Espérance d'une variable aléatoire",
        "prerequis": [
          "va_loi_probabilite"
        ]
      },
      {
        "id": "va_bernoulli",
        "label": "Loi de Bernoulli",
        "prerequis": [
          "va_loi_probabilite"
        ]
      },
      {
        "id": "va_echantillonnage",
        "label": "Fluctuation d'échantillonnage",
        "prerequis": [
          "va_bernoulli"
        ]
      },
      {
        "id": "va_binomiale_reconnaitre",
        "label": "Loi binomiale : reconnaître (Tle)",
        "prerequis": [
          "va_bernoulli",
          "proba_arbre_calcul"
        ]
      },
      {
        "id": "va_binomiale_coefficients",
        "label": "Coefficients binomiaux et triangle de Pascal (Tle)",
        "prerequis": [
          "va_binomiale_reconnaitre"
        ]
      },
      {
        "id": "va_binomiale_calcul",
        "label": "Loi binomiale : calculer (Tle)",
        "prerequis": [
          "va_binomiale_coefficients"
        ]
      },
      {
        "id": "algo_variables",
        "label": "Variables, compteur et accumulateur",
        "prerequis": []
      },
      {
        "id": "algo_boucles",
        "label": "Boucles et instruction conditionnelle",
        "prerequis": [
          "algo_variables"
        ]
      },
      {
        "id": "algo_listes",
        "label": "Listes",
        "prerequis": [
          "algo_boucles"
        ]
      },
      {
        "id": "algo_fonctions",
        "label": "Fonctions en Python",
        "prerequis": [
          "algo_variables"
        ]
      },
      {
        "id": "tableur_formules",
        "label": "Tableur : écrire une formule",
        "prerequis": []
      },
      {
        "id": "tableur_recopie",
        "label": "Tableur : recopier et exploiter",
        "prerequis": [
          "tableur_formules"
        ]
      },
      {
        "id": "logique_connecteurs",
        "label": "Logique : et, ou, non",
        "prerequis": []
      },
      {
        "id": "logique_raisonnement",
        "label": "Contre-exemple et réciproque",
        "prerequis": [
          "logique_connecteurs"
        ]
      }
    ],
    "terminale-spe": [
      {
        "id": "suite_numerique",
        "label": "Suites numériques",
        "prerequis": []
      },
      {
        "id": "limite_suite",
        "label": "Limites de suites",
        "prerequis": [
          "suite_numerique"
        ]
      },
      {
        "id": "limite_fonction",
        "label": "Limites de fonctions",
        "prerequis": []
      },
      {
        "id": "continuite_tvi",
        "label": "Continuité et théorème des valeurs intermédiaires",
        "prerequis": [
          "limite_fonction"
        ]
      },
      {
        "id": "derivation_fonction",
        "label": "Dérivation et variations",
        "prerequis": [
          "limite_fonction"
        ]
      },
      {
        "id": "convexite_fonction",
        "label": "Convexité",
        "prerequis": [
          "derivation_fonction"
        ]
      },
      {
        "id": "fonction_exponentielle",
        "label": "Fonction exponentielle",
        "prerequis": [
          "derivation_fonction"
        ]
      },
      {
        "id": "fonction_logarithme",
        "label": "Fonction logarithme népérien",
        "prerequis": [
          "fonction_exponentielle"
        ]
      },
      {
        "id": "primitive_integrale",
        "label": "Primitives et intégrales",
        "prerequis": [
          "derivation_fonction",
          "fonction_exponentielle",
          "fonction_logarithme"
        ]
      },
      {
        "id": "denombrement_combinatoire",
        "label": "Dénombrement et combinatoire",
        "prerequis": []
      },
      {
        "id": "geometrie_espace",
        "label": "Géométrie dans l’espace",
        "prerequis": []
      },
      {
        "id": "produit_scalaire_espace",
        "label": "Produit scalaire dans l’espace",
        "prerequis": [
          "geometrie_espace"
        ]
      },
      {
        "id": "probabilite_conditionnelle",
        "label": "Probabilités conditionnelles",
        "prerequis": []
      },
      {
        "id": "variable_aleatoire",
        "label": "Variables aléatoires",
        "prerequis": [
          "probabilite_conditionnelle"
        ]
      },
      {
        "id": "loi_binomiale",
        "label": "Loi binomiale",
        "prerequis": [
          "variable_aleatoire",
          "denombrement_combinatoire"
        ]
      },
      {
        "id": "algorithmique_python",
        "label": "Algorithmique et Python",
        "prerequis": [
          "suite_numerique"
        ]
      },
      {
        "id": "equation_differentielle",
        "label": "Équations différentielles",
        "prerequis": [
          "fonction_exponentielle",
          "primitive_integrale"
        ]
      },
      {
        "id": "concentration_echantillonnage",
        "label": "Concentration, loi des grands nombres",
        "prerequis": [
          "variable_aleatoire",
          "loi_binomiale"
        ]
      }
    ]
  },
  "francais": {
    "3e": [
      {
        "id": "lecture_comprehension",
        "label": "Comprendre, interpréter et apprécier un texte",
        "prerequis": []
      },
      {
        "id": "lecture_documents",
        "label": "Lire des images, la presse et des documents composites",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "lecture_voix_haute",
        "label": "Lire à voix haute et mettre en voix",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "culture_litteraire",
        "label": "Situer une œuvre et garder trace de ses lectures",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "culture_questionnements",
        "label": "Les questionnements de l'année — Engagement humaniste et émancipation",
        "prerequis": [
          "culture_litteraire"
        ]
      },
      {
        "id": "ecriture",
        "label": "Écrire pour apprendre, inventer et réfléchir",
        "prerequis": []
      },
      {
        "id": "oral",
        "label": "Prendre la parole, écouter et interagir",
        "prerequis": []
      },
      {
        "id": "vocabulaire_sens",
        "label": "Les relations de sens entre les mots",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "vocabulaire_formation",
        "label": "La formation des mots et leur histoire",
        "prerequis": [
          "vocabulaire_sens"
        ]
      },
      {
        "id": "vocabulaire_orthographe",
        "label": "Réemployer et écrire avec justesse",
        "prerequis": [
          "vocabulaire_formation"
        ]
      },
      {
        "id": "grammaire_phrase",
        "label": "Phrase, constituants et accords",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "phrase_complexe",
        "label": "Repérer les propositions et ce qui les relie",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "phrase_subordonnees",
        "label": "Analyser les propositions subordonnées",
        "prerequis": [
          "phrase_complexe"
        ]
      },
      {
        "id": "orthographe_accords",
        "label": "Les chaînes d'accord et l'accord sujet-verbe",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "orthographe_participe",
        "label": "L'accord du participe passé",
        "prerequis": [
          "orthographe_accords"
        ]
      },
      {
        "id": "analyse_discours",
        "label": "Discours, registres et paroles rapportées",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "conjugaison_formes",
        "label": "Lire et former un verbe conjugué",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "conjugaison_temps",
        "label": "Les temps et les modes à construire",
        "prerequis": [
          "conjugaison_formes"
        ]
      },
      {
        "id": "conjugaison_valeurs",
        "label": "Ce qu'un temps exprime dans un texte",
        "prerequis": [
          "conjugaison_temps"
        ]
      }
    ],
    "4e": [
      {
        "id": "lecture_comprehension",
        "label": "Comprendre, interpréter et apprécier un texte",
        "prerequis": []
      },
      {
        "id": "lecture_documents",
        "label": "Lire des images, la presse et des documents composites",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "lecture_voix_haute",
        "label": "Lire à voix haute et mettre en voix",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "culture_litteraire",
        "label": "Situer une œuvre et garder trace de ses lectures",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "culture_questionnements",
        "label": "Les questionnements de l'année — Jugement, valeurs et vérité",
        "prerequis": [
          "culture_litteraire"
        ]
      },
      {
        "id": "ecriture",
        "label": "Écrire pour apprendre, inventer et réfléchir",
        "prerequis": []
      },
      {
        "id": "oral",
        "label": "Prendre la parole, écouter et interagir",
        "prerequis": []
      },
      {
        "id": "vocabulaire_sens",
        "label": "Les relations de sens entre les mots",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "vocabulaire_formation",
        "label": "La formation des mots et leur histoire",
        "prerequis": [
          "vocabulaire_sens"
        ]
      },
      {
        "id": "vocabulaire_orthographe",
        "label": "Réemployer et écrire avec justesse",
        "prerequis": [
          "vocabulaire_formation"
        ]
      },
      {
        "id": "grammaire_phrase",
        "label": "Phrase, constituants et accords",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "phrase_complexe",
        "label": "Repérer les propositions et ce qui les relie",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "phrase_subordonnees",
        "label": "Analyser les propositions subordonnées",
        "prerequis": [
          "phrase_complexe"
        ]
      },
      {
        "id": "orthographe_accords",
        "label": "Les chaînes d'accord et l'accord sujet-verbe",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "orthographe_participe",
        "label": "L'accord du participe passé",
        "prerequis": [
          "orthographe_accords"
        ]
      },
      {
        "id": "analyse_discours",
        "label": "Discours, registres et paroles rapportées",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "conjugaison_formes",
        "label": "Lire et former un verbe conjugué",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "conjugaison_temps",
        "label": "Les temps et les modes à construire",
        "prerequis": [
          "conjugaison_formes"
        ]
      },
      {
        "id": "conjugaison_valeurs",
        "label": "Ce qu'un temps exprime dans un texte",
        "prerequis": [
          "conjugaison_temps"
        ]
      }
    ],
    "5e": [
      {
        "id": "lecture_comprehension",
        "label": "Comprendre et interpréter un texte",
        "prerequis": []
      },
      {
        "id": "lecture_apprecier",
        "label": "Apprécier un texte et fonder son jugement",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "lecture_voix_haute",
        "label": "Lire à voix haute, seul ou à plusieurs",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "lecture_oeuvre_contextes",
        "label": "Appréhender une œuvre dans des contextes artistiques variés",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "culture_connaissances",
        "label": "Acquérir et mobiliser des connaissances littéraires",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "culture_entrees_5e",
        "label": "Éprouver, expérimenter : les quatre entrées de 5e",
        "prerequis": [
          "culture_connaissances"
        ]
      },
      {
        "id": "ecriture_reflechir",
        "label": "Écrire pour réfléchir, apprendre et mémoriser",
        "prerequis": []
      },
      {
        "id": "ecriture_produire",
        "label": "Écrire des textes d'invention et de réflexion",
        "prerequis": [
          "ecriture_reflechir"
        ]
      },
      {
        "id": "ecriture_reviser",
        "label": "Évaluer son écrit et savoir le faire évoluer",
        "prerequis": [
          "ecriture_produire"
        ]
      },
      {
        "id": "oral_ecouter",
        "label": "Écouter, comprendre et interpréter",
        "prerequis": []
      },
      {
        "id": "oral_prendre_parole",
        "label": "Prendre la parole, communiquer et interagir",
        "prerequis": [
          "oral_ecouter"
        ]
      },
      {
        "id": "oral_dire_jouer",
        "label": "Dire, lire, jouer un texte",
        "prerequis": [
          "lecture_voix_haute"
        ]
      },
      {
        "id": "vocabulaire_enrichir",
        "label": "Enrichir son vocabulaire",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "vocabulaire_relations",
        "label": "Identifier les types de relations entre les mots",
        "prerequis": [
          "vocabulaire_enrichir"
        ]
      },
      {
        "id": "vocabulaire_jouer",
        "label": "Réemployer son lexique et jouer avec les mots",
        "prerequis": [
          "vocabulaire_relations"
        ]
      },
      {
        "id": "vocabulaire_formation",
        "label": "Comprendre la formation des mots",
        "prerequis": [
          "vocabulaire_relations"
        ]
      },
      {
        "id": "vocabulaire_orthographe",
        "label": "Écrire avec justesse (orthographe lexicale)",
        "prerequis": [
          "vocabulaire_formation"
        ]
      },
      {
        "id": "grammaire_phrase",
        "label": "La phrase : types, formes, ponctuation et propositions",
        "prerequis": [
          "lecture_comprehension"
        ]
      },
      {
        "id": "grammaire_fonctions",
        "label": "Les fonctions : sujet, compléments, attribut",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "grammaire_groupe_nominal",
        "label": "Le groupe nominal et les classes de mots",
        "prerequis": [
          "grammaire_fonctions"
        ]
      },
      {
        "id": "grammaire_reprises",
        "label": "Les reprises et la chaîne anaphorique",
        "prerequis": [
          "grammaire_groupe_nominal"
        ]
      },
      {
        "id": "orthographe_accords",
        "label": "Les chaînes d'accord et l'accord sujet-verbe",
        "prerequis": [
          "grammaire_fonctions"
        ]
      },
      {
        "id": "orthographe_participe",
        "label": "L'accord du participe passé",
        "prerequis": [
          "orthographe_accords"
        ]
      },
      {
        "id": "discours_registres",
        "label": "Grammaire de l'écrit, grammaire de l'oral et registres",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "discours_paroles_rapportees",
        "label": "Analyser et employer des paroles rapportées",
        "prerequis": [
          "discours_registres"
        ]
      },
      {
        "id": "conjugaison_formes",
        "label": "La composition d'une forme verbale",
        "prerequis": [
          "grammaire_fonctions"
        ]
      },
      {
        "id": "conjugaison_temps",
        "label": "Les temps à bâtir : passé simple, conditionnel, temps composés",
        "prerequis": [
          "conjugaison_formes"
        ]
      },
      {
        "id": "conjugaison_valeurs",
        "label": "L'emploi des temps et des modes",
        "prerequis": [
          "conjugaison_temps"
        ]
      }
    ],
    "6e": [
      {
        "id": "fluence_lecture",
        "label": "Lire avec fluidité",
        "prerequis": []
      },
      {
        "id": "lecture_voix_haute",
        "label": "Lire à voix haute et mettre en voix",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "comprehension_textes",
        "label": "Comprendre et interpréter un texte",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "comprehension_reprises",
        "label": "Suivre les reprises et les liens logiques d'un texte",
        "prerequis": [
          "comprehension_textes"
        ]
      },
      {
        "id": "comprehension_documents",
        "label": "Lire des documents et des images",
        "prerequis": [
          "comprehension_textes"
        ]
      },
      {
        "id": "lecture_oeuvres",
        "label": "Lire une œuvre et se l'approprier",
        "prerequis": [
          "comprehension_textes"
        ]
      },
      {
        "id": "culture_recits",
        "label": "Récits des origines, aventure et monstres",
        "prerequis": [
          "comprehension_textes"
        ]
      },
      {
        "id": "culture_poesie_theatre",
        "label": "Poésie et théâtre : mots, merveilles et ruses",
        "prerequis": [
          "comprehension_textes"
        ]
      },
      {
        "id": "culture_reperes",
        "label": "Genres, contexte et carnet de lecture",
        "prerequis": [
          "culture_recits"
        ]
      },
      {
        "id": "ecriture_main",
        "label": "Écrire à la main de manière fluide et efficace",
        "prerequis": []
      },
      {
        "id": "ecriture_apprendre",
        "label": "Écrire pour réfléchir, apprendre et mémoriser",
        "prerequis": [
          "ecriture_main"
        ]
      },
      {
        "id": "ecriture_produire",
        "label": "Produire des écrits variés",
        "prerequis": [
          "ecriture_apprendre"
        ]
      },
      {
        "id": "ecriture_reviser",
        "label": "Revenir sur son texte et le réviser",
        "prerequis": [
          "ecriture_produire"
        ]
      },
      {
        "id": "oral_ecouter",
        "label": "Écouter pour comprendre",
        "prerequis": []
      },
      {
        "id": "oral_dire",
        "label": "Dire pour être compris",
        "prerequis": [
          "oral_ecouter"
        ]
      },
      {
        "id": "oral_echanger",
        "label": "Participer à des échanges verbaux",
        "prerequis": [
          "oral_dire"
        ]
      },
      {
        "id": "vocabulaire_enrichir",
        "label": "Comprendre un mot nouveau et enrichir son lexique",
        "prerequis": [
          "comprehension_textes"
        ]
      },
      {
        "id": "vocabulaire_relations",
        "label": "Composer, décomposer et relier les mots",
        "prerequis": [
          "vocabulaire_enrichir"
        ]
      },
      {
        "id": "vocabulaire_emploi",
        "label": "Réemployer le mot juste et l'écrire correctement",
        "prerequis": [
          "vocabulaire_enrichir"
        ]
      },
      {
        "id": "grammaire_phrase",
        "label": "Analyser une phrase simple",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "grammaire_complements",
        "label": "Attribut du sujet et compléments du verbe",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "grammaire_groupe_nominal",
        "label": "Analyser le groupe nominal : épithète et complément du nom",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "grammaire_pronoms",
        "label": "Les pronoms personnels et leur antécédent",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "grammaire_accords",
        "label": "Les accords : groupe nominal, sujet-verbe, participe passé",
        "prerequis": [
          "grammaire_groupe_nominal",
          "grammaire_complements"
        ]
      },
      {
        "id": "phrase_complexe",
        "label": "Se repérer dans la phrase complexe",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "conjugaison_formes",
        "label": "Lire une forme verbale : radical, temps, personne",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "conjugaison_temps_composes",
        "label": "Les temps composés et l'accord du participe passé",
        "prerequis": [
          "conjugaison_formes"
        ]
      },
      {
        "id": "conjugaison_modes",
        "label": "L'impératif présent et le conditionnel présent",
        "prerequis": [
          "conjugaison_formes"
        ]
      },
      {
        "id": "conjugaison_valeurs",
        "label": "Temps du discours, temps du récit",
        "prerequis": [
          "conjugaison_temps_composes"
        ]
      }
    ],
    "ce1": [
      {
        "id": "langage_oral",
        "label": "Langage oral",
        "prerequis": []
      },
      {
        "id": "fluence_lecture",
        "label": "Fluence et lecture courante",
        "prerequis": []
      },
      {
        "id": "sons_complexes",
        "label": "Sons complexes et graphèmes particuliers",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "comprehension_lecture",
        "label": "Compréhension de textes",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "types_textes",
        "label": "Types de textes (narratif, documentaire, prescriptif, poétique)",
        "prerequis": [
          "comprehension_lecture"
        ]
      },
      {
        "id": "devenir_lecteur",
        "label": "Devenir lecteur",
        "prerequis": [
          "comprehension_lecture"
        ]
      },
      {
        "id": "ecriture_cursive",
        "label": "Écriture cursive et quatre écritures",
        "prerequis": []
      },
      {
        "id": "copie_fluente",
        "label": "Copie fluente et soignée",
        "prerequis": []
      },
      {
        "id": "ecriture_mots",
        "label": "Écriture de mots et dictée",
        "prerequis": [
          "copie_fluente"
        ]
      },
      {
        "id": "production_ecrite",
        "label": "Production d'écrits",
        "prerequis": [
          "ecriture_mots"
        ]
      },
      {
        "id": "grammaire_phrase",
        "label": "La phrase et ses constituants",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "classes_mots",
        "label": "Classes de mots (nom, verbe, adjectif, déterminant, pronom)",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "orthographe",
        "label": "Orthographe grammaticale",
        "prerequis": [
          "ecriture_mots"
        ]
      },
      {
        "id": "orthographe_lexicale",
        "label": "Orthographe lexicale",
        "prerequis": [
          "sons_complexes"
        ]
      },
      {
        "id": "conjugaison",
        "label": "Conjugaison – présent, imparfait, futur, passé composé",
        "prerequis": [
          "classes_mots"
        ]
      },
      {
        "id": "vocabulaire",
        "label": "Vocabulaire et sens des mots",
        "prerequis": [
          "comprehension_lecture"
        ]
      }
    ],
    "ce2": [
      {
        "id": "langage_oral",
        "label": "Langage oral",
        "prerequis": []
      },
      {
        "id": "fluence_lecture",
        "label": "Fluence et lecture expressive",
        "prerequis": []
      },
      {
        "id": "comprehension_lecture",
        "label": "Compréhension de textes",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "types_textes",
        "label": "Types de textes (narratif, informatif, prescriptif, poétique, théâtral)",
        "prerequis": [
          "comprehension_lecture"
        ]
      },
      {
        "id": "devenir_lecteur",
        "label": "Devenir lecteur",
        "prerequis": [
          "comprehension_lecture"
        ]
      },
      {
        "id": "copie_fluente",
        "label": "Copie fluente et soignée",
        "prerequis": []
      },
      {
        "id": "ecriture_mots",
        "label": "Écriture de mots et dictée",
        "prerequis": [
          "copie_fluente"
        ]
      },
      {
        "id": "production_ecrite",
        "label": "Production d'écrits",
        "prerequis": [
          "copie_fluente"
        ]
      },
      {
        "id": "grammaire_phrase",
        "label": "La phrase et ses constituants",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "classes_mots",
        "label": "Classes de mots (avec l'adverbe)",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "orthographe",
        "label": "Orthographe grammaticale",
        "prerequis": [
          "classes_mots"
        ]
      },
      {
        "id": "orthographe_lexicale",
        "label": "Orthographe lexicale",
        "prerequis": [
          "ecriture_mots"
        ]
      },
      {
        "id": "conjugaison",
        "label": "Conjugaison – quatre temps, être, avoir, 1ᵉʳ groupe et huit irréguliers",
        "prerequis": [
          "classes_mots"
        ]
      },
      {
        "id": "vocabulaire",
        "label": "Vocabulaire et relations entre les mots",
        "prerequis": [
          "comprehension_lecture"
        ]
      }
    ],
    "cm1": [
      {
        "id": "fluence_lecture",
        "label": "Lire avec fluidité",
        "prerequis": []
      },
      {
        "id": "lecture_voix_haute",
        "label": "Lire à voix haute avec expressivité",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "comprehension_textes",
        "label": "Comprendre seul un texte",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "comprehension_documents",
        "label": "Lire un document pour apprendre",
        "prerequis": [
          "comprehension_textes"
        ]
      },
      {
        "id": "lecture_oeuvres",
        "label": "Lire une œuvre et se l'approprier",
        "prerequis": [
          "comprehension_textes"
        ]
      },
      {
        "id": "culture_personnages",
        "label": "Héros, merveilleux et autres vies",
        "prerequis": [
          "lecture_oeuvres"
        ]
      },
      {
        "id": "culture_soi_et_les_autres",
        "label": "Morale, poésie et rapport aux autres",
        "prerequis": [
          "culture_personnages"
        ]
      },
      {
        "id": "culture_lecteur",
        "label": "Varier ses lectures, en garder trace, persévérer",
        "prerequis": [
          "lecture_oeuvres"
        ]
      },
      {
        "id": "ecriture_preparer",
        "label": "Copier, trier et reformuler pour apprendre",
        "prerequis": []
      },
      {
        "id": "ecriture_produire",
        "label": "Produire des écrits variés",
        "prerequis": [
          "ecriture_preparer"
        ]
      },
      {
        "id": "ecriture_reviser",
        "label": "Revenir sur son texte et le réviser",
        "prerequis": [
          "ecriture_produire"
        ]
      },
      {
        "id": "oral_ecouter",
        "label": "Écouter pour comprendre",
        "prerequis": []
      },
      {
        "id": "oral_echanger",
        "label": "Dire, présenter et participer à des échanges",
        "prerequis": [
          "oral_ecouter"
        ]
      },
      {
        "id": "vocabulaire_sens",
        "label": "Comprendre un mot inconnu : contexte et morphologie",
        "prerequis": [
          "comprehension_textes"
        ]
      },
      {
        "id": "vocabulaire_relations",
        "label": "Relier les mots : familles, synonymes, contraires",
        "prerequis": [
          "vocabulaire_sens"
        ]
      },
      {
        "id": "vocabulaire_emploi",
        "label": "Réemployer et écrire les mots appris",
        "prerequis": [
          "vocabulaire_sens"
        ]
      },
      {
        "id": "grammaire_types_phrases",
        "label": "Les types et les formes de phrases",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "grammaire_phrase",
        "label": "Analyser une phrase simple : sujet, verbe, manipulations",
        "prerequis": [
          "grammaire_types_phrases"
        ]
      },
      {
        "id": "grammaire_complements",
        "label": "Les compléments du verbe et les groupes circonstanciels",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "grammaire_classes_mots",
        "label": "Nature des mots : déterminants, adverbes, pronoms",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "grammaire_groupe_nominal",
        "label": "Le groupe nominal, son noyau et l'épithète",
        "prerequis": [
          "grammaire_classes_mots"
        ]
      },
      {
        "id": "grammaire_accords",
        "label": "Les accords et les homophones",
        "prerequis": [
          "grammaire_groupe_nominal",
          "grammaire_complements"
        ]
      },
      {
        "id": "conjugaison_temps_simples",
        "label": "Conjuguer aux temps simples",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "conjugaison_formes",
        "label": "Lire une forme verbale : radical, marques de temps et de personne",
        "prerequis": [
          "conjugaison_temps_simples"
        ]
      },
      {
        "id": "conjugaison_passe_compose",
        "label": "Le passé composé et l'accord du participe avec être",
        "prerequis": [
          "conjugaison_temps_simples"
        ]
      }
    ],
    "cm2": [
      {
        "id": "fluence_lecture",
        "label": "Lire avec fluidité",
        "prerequis": []
      },
      {
        "id": "lecture_voix_haute",
        "label": "Lire à voix haute avec expressivité",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "comprehension_textes",
        "label": "Comprendre un texte long",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "comprehension_documents",
        "label": "Lire un document composite",
        "prerequis": [
          "comprehension_textes"
        ]
      },
      {
        "id": "lecture_oeuvres",
        "label": "Lire une œuvre et se l'approprier",
        "prerequis": [
          "comprehension_textes"
        ]
      },
      {
        "id": "culture_personnages",
        "label": "Héros, merveilleux et autres vies",
        "prerequis": [
          "lecture_oeuvres"
        ]
      },
      {
        "id": "culture_soi_et_les_autres",
        "label": "Morale, poésie et rapport aux autres",
        "prerequis": [
          "culture_personnages"
        ]
      },
      {
        "id": "culture_lecteur",
        "label": "Choisir, garder trace et persévérer dans ses lectures",
        "prerequis": [
          "lecture_oeuvres"
        ]
      },
      {
        "id": "ecriture_preparer",
        "label": "Copier, prendre des notes et organiser ses idées",
        "prerequis": []
      },
      {
        "id": "ecriture_produire",
        "label": "Produire des écrits variés et cohérents",
        "prerequis": [
          "ecriture_preparer"
        ]
      },
      {
        "id": "ecriture_reviser",
        "label": "Revenir sur son texte et le réviser",
        "prerequis": [
          "ecriture_produire"
        ]
      },
      {
        "id": "oral_ecouter",
        "label": "Écouter pour comprendre",
        "prerequis": []
      },
      {
        "id": "oral_echanger",
        "label": "Dire, présenter et participer à des échanges",
        "prerequis": [
          "oral_ecouter"
        ]
      },
      {
        "id": "vocabulaire_sens",
        "label": "Le sens des mots : contexte, sens multiples, sens figuré",
        "prerequis": [
          "comprehension_textes"
        ]
      },
      {
        "id": "vocabulaire_formation",
        "label": "La formation des mots : familles, racines, composition",
        "prerequis": [
          "vocabulaire_sens"
        ]
      },
      {
        "id": "vocabulaire_emploi",
        "label": "Employer et écrire le mot juste",
        "prerequis": [
          "vocabulaire_sens"
        ]
      },
      {
        "id": "grammaire_phrase",
        "label": "La phrase simple : sujet, verbe, manipulations",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "grammaire_nature_fonction",
        "label": "Nature et fonction : deux questions différentes",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "grammaire_complements",
        "label": "Les compléments du verbe",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "grammaire_groupe_nominal",
        "label": "Le groupe nominal et ses expansions",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "grammaire_pronoms",
        "label": "Les pronoms personnels : sujet, complément, variations",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "grammaire_accords",
        "label": "Les accords et les homophones",
        "prerequis": [
          "grammaire_complements",
          "grammaire_groupe_nominal"
        ]
      },
      {
        "id": "phrase_complexe",
        "label": "Se repérer dans la phrase complexe",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "conjugaison_temps_simples",
        "label": "Conjuguer aux temps simples",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "conjugaison_formes",
        "label": "Lire une forme verbale : radical, temps, personne",
        "prerequis": [
          "conjugaison_temps_simples"
        ]
      },
      {
        "id": "conjugaison_recit",
        "label": "Les temps du récit et leur valeur",
        "prerequis": [
          "conjugaison_temps_simples"
        ]
      },
      {
        "id": "conjugaison_participe",
        "label": "Les temps composés et l'accord du participe passé",
        "prerequis": [
          "conjugaison_recit"
        ]
      }
    ],
    "cp": [
      {
        "id": "langage_oral",
        "label": "Langage oral",
        "prerequis": []
      },
      {
        "id": "conscience_phonologique",
        "label": "Conscience phonologique",
        "prerequis": []
      },
      {
        "id": "grapheme_phoneme",
        "label": "Correspondances graphème-phonème",
        "prerequis": [
          "conscience_phonologique"
        ]
      },
      {
        "id": "lecture_syllabique",
        "label": "Lecture syllabique et déchiffrage",
        "prerequis": [
          "grapheme_phoneme"
        ]
      },
      {
        "id": "lecture_voix_haute",
        "label": "Lire à voix haute",
        "prerequis": [
          "lecture_syllabique"
        ]
      },
      {
        "id": "comprehension_lecture",
        "label": "Compréhension de textes",
        "prerequis": [
          "lecture_syllabique"
        ]
      },
      {
        "id": "devenir_lecteur",
        "label": "Devenir lecteur",
        "prerequis": [
          "comprehension_lecture"
        ]
      },
      {
        "id": "copie",
        "label": "Copie de mots et de phrases",
        "prerequis": [
          "grapheme_phoneme"
        ]
      },
      {
        "id": "ecriture_mots",
        "label": "Écriture de mots (dictée)",
        "prerequis": [
          "grapheme_phoneme",
          "copie"
        ]
      },
      {
        "id": "production_ecrite",
        "label": "Production d'écrits simples",
        "prerequis": [
          "ecriture_mots"
        ]
      },
      {
        "id": "grammaire_phrase",
        "label": "La phrase",
        "prerequis": [
          "lecture_syllabique"
        ]
      },
      {
        "id": "classes_mots",
        "label": "Classes de mots (nom, verbe, adjectif, déterminant, pronom)",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "orthographe",
        "label": "Orthographe grammaticale",
        "prerequis": [
          "ecriture_mots"
        ]
      },
      {
        "id": "conjugaison",
        "label": "Conjugaison – être et avoir au présent",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "orthographe_lexicale",
        "label": "Orthographe lexicale",
        "prerequis": [
          "grapheme_phoneme"
        ]
      },
      {
        "id": "vocabulaire",
        "label": "Vocabulaire",
        "prerequis": [
          "comprehension_lecture"
        ]
      }
    ],
    "seconde": [
      {
        "id": "accords_2de",
        "label": "Les accords dans le groupe nominal et entre le sujet et le verbe",
        "prerequis": []
      },
      {
        "id": "verbe_valeurs_2de",
        "label": "Le verbe : valeurs temporelles, aspectuelles et modales",
        "prerequis": []
      },
      {
        "id": "concordance_temps_2de",
        "label": "La concordance des temps",
        "prerequis": [
          "verbe_valeurs_2de"
        ]
      },
      {
        "id": "phrase_complexe_2de",
        "label": "Les relations au sein de la phrase complexe",
        "prerequis": []
      },
      {
        "id": "relatives_2de",
        "label": "La syntaxe des propositions subordonnées relatives",
        "prerequis": [
          "phrase_complexe_2de"
        ]
      },
      {
        "id": "lexique_2de",
        "label": "Le lexique : formation des mots et relations lexicales",
        "prerequis": []
      },
      {
        "id": "relations_logiques_2de",
        "label": "Les relations logiques et la cohésion du propos",
        "prerequis": [
          "phrase_complexe_2de"
        ]
      },
      {
        "id": "exercices_methode_2de",
        "label": "Les exercices du lycée : ce que chacun attend",
        "prerequis": [
          "relations_logiques_2de"
        ]
      },
      {
        "id": "poesie_formes_2de",
        "label": "La poésie : formes, vers et sonorités",
        "prerequis": []
      },
      {
        "id": "poesie_histoire_2de",
        "label": "Histoire et mouvements de la poésie, du Moyen Âge au XVIIIe siècle",
        "prerequis": []
      },
      {
        "id": "argumentation_2de",
        "label": "L'argumentation : visée, présupposés et genres du discours",
        "prerequis": []
      },
      {
        "id": "presse_medias_2de",
        "label": "La presse et les médias, du XIXe siècle au XXIe siècle",
        "prerequis": [
          "argumentation_2de"
        ]
      },
      {
        "id": "roman_formes_2de",
        "label": "Les formes du récit : roman, nouvelle, voyage, journal, biographique",
        "prerequis": []
      },
      {
        "id": "narration_2de",
        "label": "La narration : narrateur, focalisation et temporalité",
        "prerequis": [
          "roman_formes_2de"
        ]
      },
      {
        "id": "theatre_texte_2de",
        "label": "Le théâtre : genres, action et dramaturgie",
        "prerequis": []
      },
      {
        "id": "theatre_representation_2de",
        "label": "La représentation et la mise en scène",
        "prerequis": [
          "theatre_texte_2de"
        ]
      }
    ]
  },
  "anglais": {
    "a1": [
      {
        "id": "en_a1_digits",
        "label": "Digits",
        "prerequis": []
      },
      {
        "id": "en_a1_numbers",
        "label": "Numbers",
        "prerequis": [
          "en_a1_digits"
        ]
      },
      {
        "id": "en_a1_operations",
        "label": "Operations",
        "prerequis": [
          "en_a1_digits"
        ]
      },
      {
        "id": "en_a1_comparisons",
        "label": "Comparisons",
        "prerequis": [
          "en_a1_digits"
        ]
      },
      {
        "id": "en_a1_shapes",
        "label": "Shapes",
        "prerequis": []
      },
      {
        "id": "en_a1_verbs",
        "label": "Math Verbs",
        "prerequis": [
          "en_a1_operations"
        ]
      },
      {
        "id": "en_a1_sports",
        "label": "Sports",
        "prerequis": []
      },
      {
        "id": "en_a1_sport_measurements",
        "label": "Sport Measurements",
        "prerequis": [
          "en_a1_sports"
        ]
      },
      {
        "id": "en_a1_science_living",
        "label": "Science — Living World",
        "prerequis": []
      },
      {
        "id": "en_a1_science_earth",
        "label": "Science — Earth",
        "prerequis": []
      },
      {
        "id": "en_a1_money",
        "label": "Économie - Gestion — Money",
        "prerequis": []
      },
      {
        "id": "en_a1_family_budget",
        "label": "Économie - Gestion — Family Budget",
        "prerequis": [
          "en_a1_money"
        ]
      },
      {
        "id": "en_a1_countries",
        "label": "Géographie - Voyage — Countries",
        "prerequis": []
      },
      {
        "id": "en_a1_geography_basic",
        "label": "Géographie - Voyage — Basic Geography",
        "prerequis": [
          "en_a1_countries"
        ]
      },
      {
        "id": "en_a1_family",
        "label": "Vie Quotidienne — Family",
        "prerequis": []
      },
      {
        "id": "en_a1_school",
        "label": "Vie Quotidienne — School",
        "prerequis": []
      },
      {
        "id": "en_a1_colors",
        "label": "Vie Quotidienne — Colors",
        "prerequis": []
      },
      {
        "id": "en_a1_body",
        "label": "Vie Quotidienne — Body",
        "prerequis": []
      },
      {
        "id": "en_a1_food",
        "label": "Vie Quotidienne — Food",
        "prerequis": []
      }
    ],
    "a2": [
      {
        "id": "en_a2_verbs",
        "label": "Mathematical Verbs A2",
        "prerequis": []
      },
      {
        "id": "en_a2_expressions",
        "label": "Mathematical Expressions A2",
        "prerequis": [
          "en_a2_verbs"
        ]
      },
      {
        "id": "en_a2_fractions",
        "label": "Fractions Vocabulary A2",
        "prerequis": []
      },
      {
        "id": "en_a2_geometry",
        "label": "Geometry Vocabulary A2",
        "prerequis": []
      },
      {
        "id": "en_a2_sport_verbs",
        "label": "Sport Verbs A2",
        "prerequis": []
      },
      {
        "id": "en_a2_sport_stats",
        "label": "Sport Stats A2",
        "prerequis": [
          "en_a2_sport_verbs"
        ]
      },
      {
        "id": "en_a2_sport_physics",
        "label": "Sport Physics A2",
        "prerequis": [
          "en_a2_sport_verbs"
        ]
      },
      {
        "id": "en_a2_science_biology",
        "label": "Science — Biology A2",
        "prerequis": []
      },
      {
        "id": "en_a2_science_chemistry",
        "label": "Science — Chemistry A2",
        "prerequis": []
      },
      {
        "id": "en_a2_science_physics",
        "label": "Science — Physics A2",
        "prerequis": []
      },
      {
        "id": "en_a2_economy_basics",
        "label": "Économie - Gestion — Basics A2",
        "prerequis": []
      },
      {
        "id": "en_a2_family_finance",
        "label": "Économie - Gestion — Family Finance A2",
        "prerequis": [
          "en_a2_economy_basics"
        ]
      },
      {
        "id": "en_a2_percentages_eco",
        "label": "Économie - Gestion — Percentages A2",
        "prerequis": [
          "en_a2_economy_basics"
        ]
      },
      {
        "id": "en_a2_travel",
        "label": "Géographie - Voyage — Travel A2",
        "prerequis": []
      },
      {
        "id": "en_a2_geography",
        "label": "Géographie - Voyage — Geography A2",
        "prerequis": [
          "en_a2_travel"
        ]
      },
      {
        "id": "en_a2_directions",
        "label": "Géographie - Voyage — Directions A2",
        "prerequis": [
          "en_a2_travel"
        ]
      },
      {
        "id": "en_a2_home",
        "label": "Vie Quotidienne — Home A2",
        "prerequis": []
      },
      {
        "id": "en_a2_daily_verbs",
        "label": "Vie Quotidienne — Daily Verbs A2",
        "prerequis": []
      },
      {
        "id": "en_a2_adjectives",
        "label": "Vie Quotidienne — Adjectives A2",
        "prerequis": [
          "en_a2_daily_verbs"
        ]
      },
      {
        "id": "en_a2_jobs",
        "label": "Vie Quotidienne — Jobs A2",
        "prerequis": []
      }
    ],
    "b1": [
      {
        "id": "en_b1_verbs",
        "label": "Mathematical Verbs B1",
        "prerequis": []
      },
      {
        "id": "en_b1_algebra",
        "label": "Algebra Vocabulary B1",
        "prerequis": [
          "en_b1_verbs"
        ]
      },
      {
        "id": "en_b1_statistics",
        "label": "Statistics Vocabulary B1",
        "prerequis": []
      },
      {
        "id": "en_b1_reasoning",
        "label": "Reasoning Phrases B1",
        "prerequis": [
          "en_b1_verbs"
        ]
      },
      {
        "id": "en_b1_sport_verbs",
        "label": "Sport Verbs B1",
        "prerequis": []
      },
      {
        "id": "en_b1_sport_physics",
        "label": "Sport Physics B1",
        "prerequis": [
          "en_b1_sport_verbs"
        ]
      },
      {
        "id": "en_b1_sport_stats",
        "label": "Sport Statistics B1",
        "prerequis": [
          "en_b1_sport_verbs"
        ]
      },
      {
        "id": "en_b1_science_biology",
        "label": "Science — Biology B1",
        "prerequis": []
      },
      {
        "id": "en_b1_science_chemistry",
        "label": "Science — Chemistry B1",
        "prerequis": []
      },
      {
        "id": "en_b1_science_physics",
        "label": "Science — Physics B1",
        "prerequis": []
      },
      {
        "id": "en_b1_economy",
        "label": "Économie - Gestion — Economy B1",
        "prerequis": []
      },
      {
        "id": "en_b1_finance",
        "label": "Économie - Gestion — Finance B1",
        "prerequis": [
          "en_b1_economy"
        ]
      },
      {
        "id": "en_b1_family_management",
        "label": "Économie - Gestion — Family Management B1",
        "prerequis": [
          "en_b1_economy"
        ]
      },
      {
        "id": "en_b1_physical_geography",
        "label": "Géographie - Voyage — Physical Geography B1",
        "prerequis": []
      },
      {
        "id": "en_b1_travel_culture",
        "label": "Géographie - Voyage — Travel & Culture B1",
        "prerequis": [
          "en_b1_physical_geography"
        ]
      },
      {
        "id": "en_b1_environment",
        "label": "Géographie - Voyage — Environment B1",
        "prerequis": [
          "en_b1_physical_geography"
        ]
      }
    ],
    "b2": [
      {
        "id": "en_b2_verbs",
        "label": "Mathematical Verbs B2",
        "prerequis": []
      },
      {
        "id": "en_b2_proof",
        "label": "Proof & Logic B2",
        "prerequis": [
          "en_b2_verbs"
        ]
      },
      {
        "id": "en_b2_analysis",
        "label": "Analysis Vocabulary B2",
        "prerequis": [
          "en_b2_verbs"
        ]
      },
      {
        "id": "en_b2_sport_verbs",
        "label": "Sport Verbs B2",
        "prerequis": []
      },
      {
        "id": "en_b2_sport_science",
        "label": "Sport Science B2",
        "prerequis": [
          "en_b2_sport_verbs"
        ]
      },
      {
        "id": "en_b2_sport_data",
        "label": "Sport Data Analysis B2",
        "prerequis": [
          "en_b2_sport_verbs"
        ]
      },
      {
        "id": "en_b2_science_biology",
        "label": "Science — Biology B2",
        "prerequis": []
      },
      {
        "id": "en_b2_science_chemistry",
        "label": "Science — Chemistry B2",
        "prerequis": []
      },
      {
        "id": "en_b2_science_physics",
        "label": "Science — Physics B2",
        "prerequis": []
      },
      {
        "id": "en_b2_macroeconomics",
        "label": "Économie - Gestion — Macroeconomics B2",
        "prerequis": []
      },
      {
        "id": "en_b2_business",
        "label": "Économie - Gestion — Business B2",
        "prerequis": [
          "en_b2_macroeconomics"
        ]
      },
      {
        "id": "en_b2_eco_statistics",
        "label": "Économie - Gestion — Statistics B2",
        "prerequis": [
          "en_b2_macroeconomics"
        ]
      },
      {
        "id": "en_b2_geopolitics",
        "label": "Géographie - Voyage — Geopolitics B2",
        "prerequis": []
      },
      {
        "id": "en_b2_climate_science",
        "label": "Géographie - Voyage — Climate Science B2",
        "prerequis": [
          "en_b2_geopolitics"
        ]
      },
      {
        "id": "en_b2_geo_statistics",
        "label": "Géographie - Voyage — Geo Statistics B2",
        "prerequis": [
          "en_b2_geopolitics"
        ]
      }
    ]
  },
  "espagnol": {
    "a1": [
      {
        "id": "es_a1_digits",
        "label": "Chiffres",
        "prerequis": []
      },
      {
        "id": "es_a1_numbers",
        "label": "Nombres",
        "prerequis": [
          "es_a1_digits"
        ]
      },
      {
        "id": "es_a1_operations",
        "label": "Opérations",
        "prerequis": [
          "es_a1_digits"
        ]
      },
      {
        "id": "es_a1_shapes",
        "label": "Formes",
        "prerequis": []
      },
      {
        "id": "es_a1_colors",
        "label": "Couleurs",
        "prerequis": []
      },
      {
        "id": "es_a1_family",
        "label": "Famille",
        "prerequis": []
      },
      {
        "id": "es_a1_school",
        "label": "École",
        "prerequis": []
      },
      {
        "id": "es_a1_body",
        "label": "Corps",
        "prerequis": []
      },
      {
        "id": "es_a1_food",
        "label": "Alimentation",
        "prerequis": []
      },
      {
        "id": "es_a1_animals",
        "label": "Animaux",
        "prerequis": []
      },
      {
        "id": "es_a1_clothes",
        "label": "Vêtements",
        "prerequis": []
      },
      {
        "id": "es_a1_house",
        "label": "Maison",
        "prerequis": []
      },
      {
        "id": "es_a1_days",
        "label": "Jours & mois",
        "prerequis": []
      },
      {
        "id": "es_a1_greetings",
        "label": "Salutations",
        "prerequis": []
      },
      {
        "id": "es_a1_money",
        "label": "Argent & prix",
        "prerequis": [
          "es_a1_digits"
        ]
      },
      {
        "id": "es_a1_geography_basic",
        "label": "Géographie de base",
        "prerequis": []
      },
      {
        "id": "es_a1_science_earth",
        "label": "Sciences de la Terre",
        "prerequis": []
      },
      {
        "id": "es_a1_sport_measurements",
        "label": "Sport & mesures",
        "prerequis": [
          "es_a1_digits"
        ]
      }
    ],
    "a2": [
      {
        "id": "es_a2_daily_life",
        "label": "Vie quotidienne",
        "prerequis": []
      },
      {
        "id": "es_a2_travel",
        "label": "Voyage & transport",
        "prerequis": []
      },
      {
        "id": "es_a2_jobs",
        "label": "Métiers",
        "prerequis": []
      },
      {
        "id": "es_a2_adjectives",
        "label": "Adjectifs",
        "prerequis": []
      },
      {
        "id": "es_a2_time",
        "label": "Temps & fréquence",
        "prerequis": []
      },
      {
        "id": "es_a2_weather",
        "label": "Météo & saisons",
        "prerequis": []
      },
      {
        "id": "es_a2_shopping",
        "label": "Courses & achats",
        "prerequis": []
      },
      {
        "id": "es_a2_health",
        "label": "Santé",
        "prerequis": []
      },
      {
        "id": "es_a2_family_budget",
        "label": "Budget familial",
        "prerequis": []
      },
      {
        "id": "es_a2_geography",
        "label": "Géographie & repères",
        "prerequis": []
      },
      {
        "id": "es_a2_science_living",
        "label": "Sciences du vivant",
        "prerequis": []
      },
      {
        "id": "es_a2_sport_verbs",
        "label": "Verbes du sport",
        "prerequis": []
      }
    ],
    "b1": [
      {
        "id": "es_b1_opinions",
        "label": "Opinions & arguments",
        "prerequis": []
      },
      {
        "id": "es_b1_environment",
        "label": "Environnement & société",
        "prerequis": []
      },
      {
        "id": "es_b1_media",
        "label": "Médias & culture",
        "prerequis": []
      },
      {
        "id": "es_b1_economy",
        "label": "Économie de base",
        "prerequis": []
      },
      {
        "id": "es_b1_science",
        "label": "Sciences & technologie",
        "prerequis": []
      },
      {
        "id": "es_b1_finance",
        "label": "Finance & argent",
        "prerequis": []
      },
      {
        "id": "es_b1_physical_geography",
        "label": "Géographie physique",
        "prerequis": []
      },
      {
        "id": "es_b1_science_biology",
        "label": "Biologie",
        "prerequis": []
      },
      {
        "id": "es_b1_sport_stats",
        "label": "Sport & statistiques",
        "prerequis": []
      }
    ],
    "b2": [
      {
        "id": "es_b2_geopolitics",
        "label": "Géopolitique hispanique",
        "prerequis": []
      },
      {
        "id": "es_b2_literature",
        "label": "Littérature & culture",
        "prerequis": []
      },
      {
        "id": "es_b2_economics",
        "label": "Économie & mondialisation",
        "prerequis": []
      },
      {
        "id": "es_b2_philosophy",
        "label": "Philosophie & éthique",
        "prerequis": []
      },
      {
        "id": "es_b2_macroeconomics",
        "label": "Macroéconomie",
        "prerequis": []
      },
      {
        "id": "es_b2_geo_statistics",
        "label": "Géographie & démographie",
        "prerequis": []
      },
      {
        "id": "es_b2_climate_science",
        "label": "Science du climat",
        "prerequis": []
      },
      {
        "id": "es_b2_sport_science",
        "label": "Science du sport",
        "prerequis": []
      }
    ]
  },
  "ia": {
    "a1": [
      {
        "id": "ia_a1_definition",
        "label": "Qu'est-ce que l'IA ?",
        "prerequis": []
      },
      {
        "id": "ia_a1_usages_limites",
        "label": "Ce que l'IA sait faire... et ses limites",
        "prerequis": [
          "ia_a1_definition"
        ]
      },
      {
        "id": "ia_a1_responsabilite_impact",
        "label": "Mon role et l'impact de l'IA",
        "prerequis": [
          "ia_a1_usages_limites"
        ]
      }
    ],
    "a2": [
      {
        "id": "ia_a2_prompts",
        "label": "Ecrire un bon prompt",
        "prerequis": []
      },
      {
        "id": "ia_a2_reviser",
        "label": "Reviser et s'entrainer avec l'IA",
        "prerequis": [
          "ia_a2_prompts"
        ]
      },
      {
        "id": "ia_a2_apprendre_honnete",
        "label": "Apprendre vraiment, sans tricher",
        "prerequis": [
          "ia_a2_reviser"
        ]
      }
    ],
    "b1": [
      {
        "id": "ia_b1_verification",
        "label": "Verifier et garder l'esprit critique",
        "prerequis": []
      },
      {
        "id": "ia_b1_securite",
        "label": "Securite et donnees personnelles",
        "prerequis": [
          "ia_b1_verification"
        ]
      },
      {
        "id": "ia_b1_responsabilite_numerique",
        "label": "Plagiat, droits et responsabilite",
        "prerequis": [
          "ia_b1_securite"
        ]
      }
    ],
    "b2": [
      {
        "id": "ia_b2_prompt_avance",
        "label": "Methode : prompt avance et iteration",
        "prerequis": []
      },
      {
        "id": "ia_b2_production",
        "label": "Production creative",
        "prerequis": [
          "ia_b2_prompt_avance"
        ]
      },
      {
        "id": "ia_b2_qualite_responsabilite",
        "label": "Qualite, verification et responsabilite",
        "prerequis": [
          "ia_b2_production"
        ]
      }
    ],
    "c1": [
      {
        "id": "ia_c1_cadrer_projet",
        "label": "Cadrer un projet IA utile",
        "prerequis": []
      },
      {
        "id": "ia_c1_conception_responsable",
        "label": "Concevoir de facon responsable",
        "prerequis": [
          "ia_c1_cadrer_projet"
        ]
      },
      {
        "id": "ia_c1_responsabilite_pitch",
        "label": "Tester et presenter",
        "prerequis": [
          "ia_c1_conception_responsable"
        ]
      }
    ],
    "pix-college": [
      {
        "id": "1.1",
        "label": "1.1 · Définir l'IA, son histoire et sa construction",
        "prerequis": []
      },
      {
        "id": "1.2",
        "label": "1.2 · Expliquer l'apprentissage automatique",
        "prerequis": [
          "1.1"
        ]
      },
      {
        "id": "1.3",
        "label": "1.3 · Citer les modèles d'apprentissage automatique",
        "prerequis": [
          "1.2"
        ]
      },
      {
        "id": "1.4",
        "label": "1.4 · Entraînement des grands modèles de langage",
        "prerequis": [
          "1.3"
        ]
      },
      {
        "id": "1.5",
        "label": "1.5 · Algorithmes de recommandation",
        "prerequis": [
          "1.4"
        ]
      },
      {
        "id": "1.6",
        "label": "1.6 · IA incarnée et robotique",
        "prerequis": [
          "1.5"
        ]
      },
      {
        "id": "2.1",
        "label": "2.1 · Familles de tâches réalisées par l'IA",
        "prerequis": []
      },
      {
        "id": "2.2",
        "label": "2.2 · Utiliser un logiciel d'IA générative",
        "prerequis": [
          "2.1"
        ]
      },
      {
        "id": "2.3",
        "label": "2.3 · Évaluer l'information à l'heure des IA",
        "prerequis": [
          "2.2"
        ]
      },
      {
        "id": "2.4",
        "label": "2.4 · Utiliser les services de recommandation",
        "prerequis": [
          "2.3"
        ]
      },
      {
        "id": "2.5",
        "label": "2.5 · Utiliser l'IA dans son organisation",
        "prerequis": [
          "2.4"
        ]
      },
      {
        "id": "3.1",
        "label": "3.1 · Empreinte environnementale de l'IA",
        "prerequis": []
      },
      {
        "id": "3.2",
        "label": "3.2 · Gouvernance des systèmes d'IA",
        "prerequis": [
          "3.1"
        ]
      },
      {
        "id": "3.3",
        "label": "3.3 · Enjeux éthiques et de transparence",
        "prerequis": [
          "3.2"
        ]
      },
      {
        "id": "3.4",
        "label": "3.4 · Conséquences sur l'emploi et la formation",
        "prerequis": [
          "3.3"
        ]
      },
      {
        "id": "3.5",
        "label": "3.5 · Enjeux culturels et sociétaux",
        "prerequis": [
          "3.4"
        ]
      },
      {
        "id": "m.1",
        "label": "m.1 · Travailler honnêtement avec l'IA",
        "prerequis": []
      }
    ],
    "pix-lycee": [
      {
        "id": "1.1",
        "label": "1.1 · Définir l'IA, son histoire et sa construction",
        "prerequis": []
      },
      {
        "id": "1.2",
        "label": "1.2 · Expliquer l'apprentissage automatique",
        "prerequis": [
          "1.1"
        ]
      },
      {
        "id": "1.3",
        "label": "1.3 · Citer les modèles d'apprentissage automatique",
        "prerequis": [
          "1.2"
        ]
      },
      {
        "id": "1.4",
        "label": "1.4 · Entraînement des grands modèles de langage",
        "prerequis": [
          "1.3"
        ]
      },
      {
        "id": "1.5",
        "label": "1.5 · Algorithmes de recommandation",
        "prerequis": [
          "1.4"
        ]
      },
      {
        "id": "1.6",
        "label": "1.6 · IA incarnée et robotique",
        "prerequis": [
          "1.5"
        ]
      },
      {
        "id": "2.1",
        "label": "2.1 · Familles de tâches réalisées par l'IA",
        "prerequis": []
      },
      {
        "id": "2.2",
        "label": "2.2 · Utiliser un logiciel d'IA générative",
        "prerequis": [
          "2.1"
        ]
      },
      {
        "id": "2.3",
        "label": "2.3 · Évaluer l'information à l'heure des IA",
        "prerequis": [
          "2.2"
        ]
      },
      {
        "id": "2.4",
        "label": "2.4 · Utiliser les services de recommandation",
        "prerequis": [
          "2.3"
        ]
      },
      {
        "id": "2.5",
        "label": "2.5 · Utiliser l'IA dans son organisation",
        "prerequis": [
          "2.4"
        ]
      },
      {
        "id": "3.1",
        "label": "3.1 · Empreinte environnementale de l'IA",
        "prerequis": []
      },
      {
        "id": "3.2",
        "label": "3.2 · Gouvernance des systèmes d'IA",
        "prerequis": [
          "3.1"
        ]
      },
      {
        "id": "3.3",
        "label": "3.3 · Enjeux éthiques et de transparence",
        "prerequis": [
          "3.2"
        ]
      },
      {
        "id": "3.5",
        "label": "3.5 · Enjeux culturels et sociétaux",
        "prerequis": [
          "3.3"
        ]
      },
      {
        "id": "m.1",
        "label": "m.1 · Travailler honnêtement avec l'IA",
        "prerequis": []
      }
    ]
  }
};
