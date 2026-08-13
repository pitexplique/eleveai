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
// 481 notions, 35 paquets.

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
        "id": "prop_proportionnalite",
        "label": "Proportionnalité",
        "prerequis": [
          "fraction_nombre"
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
        "id": "stat_statistique",
        "label": "Statistiques",
        "prerequis": []
      },
      {
        "id": "proba_experience",
        "label": "Probabilités",
        "prerequis": [
          "fraction_nombre",
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
        "id": "fraction_nombre",
        "label": "Fractions",
        "prerequis": [
          "decimal_nombre"
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
        "id": "quadrilatere_figure",
        "label": "Quadrilatères",
        "prerequis": [
          "angle_mesure"
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
        "id": "stat_donnee",
        "label": "Données",
        "prerequis": []
      },
      {
        "id": "proba_experience",
        "label": "Probabilités",
        "prerequis": [
          "stat_donnee"
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
        "label": "Comprendre, interpréter et apprécier",
        "prerequis": []
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
        "label": "Culture littéraire — Engagement humaniste et émancipation",
        "prerequis": [
          "lecture_comprehension"
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
        "id": "vocabulaire",
        "label": "Vocabulaire et orthographe lexicale",
        "prerequis": [
          "lecture_comprehension"
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
        "id": "analyse_discours",
        "label": "Discours, registres et paroles rapportées",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "conjugaison",
        "label": "Formes verbales, temps et modes",
        "prerequis": [
          "grammaire_phrase"
        ]
      }
    ],
    "4e": [
      {
        "id": "lecture_comprehension",
        "label": "Comprendre, interpréter et apprécier",
        "prerequis": []
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
        "label": "Culture littéraire — Jugement, valeurs et vérité",
        "prerequis": [
          "lecture_comprehension"
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
        "id": "vocabulaire",
        "label": "Vocabulaire et orthographe lexicale",
        "prerequis": [
          "lecture_comprehension"
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
        "id": "analyse_discours",
        "label": "Discours, registres et paroles rapportées",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "phrase_complexe",
        "label": "Fonctionnement de la phrase complexe",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "orthographe_grammaticale",
        "label": "Accorder les mots dans la phrase et expliquer ses choix",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "conjugaison",
        "label": "Formes verbales, temps et modes",
        "prerequis": [
          "grammaire_phrase"
        ]
      }
    ],
    "5e": [
      {
        "id": "lecture_comprehension",
        "label": "Comprendre, interpréter et apprécier",
        "prerequis": []
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
        "label": "Culture littéraire — Éprouver, expérimenter : la découverte de soi, d'autrui et du monde",
        "prerequis": [
          "lecture_comprehension"
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
        "id": "vocabulaire",
        "label": "Vocabulaire et orthographe lexicale",
        "prerequis": [
          "lecture_comprehension"
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
        "id": "analyse_discours",
        "label": "Discours, registres et paroles rapportées",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "orthographe_grammaticale",
        "label": "Accorder les mots dans la phrase et expliquer ses choix",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "conjugaison",
        "label": "Formes verbales, temps et modes",
        "prerequis": [
          "grammaire_phrase"
        ]
      }
    ],
    "6e": [
      {
        "id": "lecture_comprehension",
        "label": "Comprendre, interpréter et apprécier",
        "prerequis": []
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
        "label": "Culture littéraire et artistique",
        "prerequis": [
          "lecture_comprehension"
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
        "id": "vocabulaire",
        "label": "Vocabulaire et orthographe lexicale",
        "prerequis": [
          "lecture_comprehension"
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
        "label": "Se repérer dans la phrase complexe",
        "prerequis": [
          "grammaire_phrase"
        ]
      },
      {
        "id": "conjugaison",
        "label": "Formes verbales, temps et modes",
        "prerequis": [
          "grammaire_phrase"
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
        "label": "Lire avec fluidité et expressivité",
        "prerequis": []
      },
      {
        "id": "comprehension_textes_documents",
        "label": "Comprendre textes, documents et images",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "lecture_oeuvres",
        "label": "Lire une œuvre et se l'approprier",
        "prerequis": [
          "comprehension_textes_documents"
        ]
      },
      {
        "id": "culture_litteraire",
        "label": "Culture littéraire et artistique",
        "prerequis": [
          "lecture_oeuvres"
        ]
      },
      {
        "id": "ecriture",
        "label": "Écrire pour apprendre et produire",
        "prerequis": []
      },
      {
        "id": "oral",
        "label": "Écouter, dire et participer aux échanges",
        "prerequis": []
      },
      {
        "id": "vocabulaire",
        "label": "Vocabulaire et relations entre les mots",
        "prerequis": [
          "comprehension_textes_documents"
        ]
      },
      {
        "id": "grammaire_orthographe",
        "label": "Phrase simple, accords et orthographe grammaticale",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "conjugaison",
        "label": "Conjugaison et valeur des temps",
        "prerequis": [
          "grammaire_orthographe"
        ]
      }
    ],
    "cm2": [
      {
        "id": "fluence_lecture",
        "label": "Lire avec fluidité et expressivité",
        "prerequis": []
      },
      {
        "id": "comprehension_textes_documents",
        "label": "Comprendre des textes et documents complexes",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "lecture_oeuvres",
        "label": "Lire une œuvre et construire une culture littéraire",
        "prerequis": [
          "comprehension_textes_documents"
        ]
      },
      {
        "id": "culture_litteraire",
        "label": "Culture littéraire et artistique",
        "prerequis": [
          "lecture_oeuvres"
        ]
      },
      {
        "id": "ecriture",
        "label": "Produire, organiser et réviser des écrits",
        "prerequis": []
      },
      {
        "id": "oral",
        "label": "Écouter, présenter et argumenter",
        "prerequis": []
      },
      {
        "id": "vocabulaire",
        "label": "Vocabulaire, nuances et orthographe lexicale",
        "prerequis": [
          "comprehension_textes_documents"
        ]
      },
      {
        "id": "grammaire_orthographe",
        "label": "Phrase, groupes, accords et homophones",
        "prerequis": [
          "fluence_lecture"
        ]
      },
      {
        "id": "phrase_complexe",
        "label": "Se repérer dans la phrase complexe",
        "prerequis": [
          "grammaire_orthographe"
        ]
      },
      {
        "id": "conjugaison",
        "label": "Conjugaison et valeur des temps",
        "prerequis": [
          "grammaire_orthographe"
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
    ]
  }
};
