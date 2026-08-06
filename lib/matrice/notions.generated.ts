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
// 431 notions, 31 paquets.

export type NotionCoach = { id: string; label: string };

/** matière → classe → notions au programme. */
export const NOTIONS_COACH: Record<string, Record<string, NotionCoach[]>> = {
  "maths": {
    "3e": [
      {
        "id": "algo_programmation",
        "label": "Algorithmique et programmation"
      },
      {
        "id": "fraction_rationnel",
        "label": "Nombres rationnels"
      },
      {
        "id": "entier_puissance",
        "label": "Puissances"
      },
      {
        "id": "entier_racine_carree",
        "label": "Racine carrée"
      },
      {
        "id": "entier_arithmetique",
        "label": "Multiples et diviseurs"
      },
      {
        "id": "prop_proportionnalite",
        "label": "Proportionnalité"
      },
      {
        "id": "litteral_calcul",
        "label": "Calcul littéral"
      },
      {
        "id": "equation_resolution",
        "label": "Équations"
      },
      {
        "id": "fonction_generalite",
        "label": "Fonctions"
      },
      {
        "id": "affine_fonction",
        "label": "Fonctions affines"
      },
      {
        "id": "triangle_figure",
        "label": "Triangles"
      },
      {
        "id": "pythagore_theoreme",
        "label": "Théorème de Pythagore"
      },
      {
        "id": "thales_theoreme",
        "label": "Théorème de Thalès"
      },
      {
        "id": "trigo_trigonometrie",
        "label": "Trigonométrie"
      },
      {
        "id": "sym_transformation",
        "label": "Transformations (dont homothéties)"
      },
      {
        "id": "volume_geometrie_espace",
        "label": "Géométrie dans l’espace"
      },
      {
        "id": "sections_solides",
        "label": "Sections planes de solides"
      },
      {
        "id": "aire_perimetre",
        "label": "Périmètres"
      },
      {
        "id": "aire_surface",
        "label": "Aires"
      },
      {
        "id": "volume_solide",
        "label": "Volumes"
      },
      {
        "id": "stat_statistique",
        "label": "Statistiques"
      },
      {
        "id": "proba_experience",
        "label": "Probabilités"
      }
    ],
    "4e": [
      {
        "id": "algo_programmation",
        "label": "Algorithmique et programmation"
      },
      {
        "id": "relatif_operation",
        "label": "Opérations sur les nombres relatifs"
      },
      {
        "id": "fraction_nombre",
        "label": "Fractions et nombres rationnels"
      },
      {
        "id": "prop_proportionnalite",
        "label": "Proportionnalité"
      },
      {
        "id": "litteral_expression",
        "label": "Expressions littérales"
      },
      {
        "id": "litteral_distributivite",
        "label": "Distributivité"
      },
      {
        "id": "litteral_identite_remarquable",
        "label": "Identités remarquables"
      },
      {
        "id": "litteral_factorisation",
        "label": "Factorisation"
      },
      {
        "id": "equation_resolution",
        "label": "Équations"
      },
      {
        "id": "pythagore_theoreme",
        "label": "Pythagore et sa réciproque"
      },
      {
        "id": "thales_theoreme",
        "label": "Thalès et sa réciproque"
      },
      {
        "id": "trigo_cosinus",
        "label": "Cosinus dans le triangle rectangle"
      },
      {
        "id": "quadrilatere_parallelogramme",
        "label": "Parallélogrammes"
      },
      {
        "id": "sym_transformation",
        "label": "Transformations (symétrie, translation, rotation)"
      },
      {
        "id": "aire_perimetre",
        "label": "Périmètres"
      },
      {
        "id": "aire_surface",
        "label": "Aires"
      },
      {
        "id": "volume_solide",
        "label": "Volumes"
      },
      {
        "id": "stat_statistique",
        "label": "Statistiques"
      },
      {
        "id": "proba_experience",
        "label": "Probabilités"
      }
    ],
    "5e": [
      {
        "id": "algo_programmation",
        "label": "Lire et exécuter un programme"
      },
      {
        "id": "algo_construire",
        "label": "Écrire et modifier un programme"
      },
      {
        "id": "relatif_nombre",
        "label": "Nombres relatifs"
      },
      {
        "id": "relatif_operation",
        "label": "Opérations sur les nombres relatifs"
      },
      {
        "id": "divisibilite",
        "label": "Multiples, diviseurs et divisibilité"
      },
      {
        "id": "fraction_nombre",
        "label": "Fractions : reconnaître et comparer"
      },
      {
        "id": "fraction_calcul",
        "label": "Calculer avec les fractions"
      },
      {
        "id": "prop_proportionnalite",
        "label": "Proportionnalité"
      },
      {
        "id": "prop_ratio_pourcentage",
        "label": "Ratios et pourcentages"
      },
      {
        "id": "litteral_calcul",
        "label": "Calcul littéral"
      },
      {
        "id": "angle_mesure",
        "label": "Angles"
      },
      {
        "id": "triangle_figure",
        "label": "Triangles"
      },
      {
        "id": "sym_centrale",
        "label": "Symétrie centrale"
      },
      {
        "id": "parallelogramme",
        "label": "Parallélogrammes"
      },
      {
        "id": "aire_surface",
        "label": "Aires"
      },
      {
        "id": "volume_solide",
        "label": "Volumes"
      },
      {
        "id": "stat_statistique",
        "label": "Statistiques"
      },
      {
        "id": "proba_experience",
        "label": "Probabilités"
      }
    ],
    "6e": [
      {
        "id": "algo_programmation",
        "label": "Algorithmique et programmation"
      },
      {
        "id": "entier_nombre",
        "label": "Nombres entiers"
      },
      {
        "id": "decimal_nombre",
        "label": "Nombres décimaux"
      },
      {
        "id": "fraction_nombre",
        "label": "Fractions"
      },
      {
        "id": "pourcentage_nombre",
        "label": "Pourcentages"
      },
      {
        "id": "prop_proportionnalite",
        "label": "Proportionnalité"
      },
      {
        "id": "entier_calcul_pose",
        "label": "Calcul posé"
      },
      {
        "id": "entier_calcul_mental",
        "label": "Calcul mental"
      },
      {
        "id": "aire_longueur",
        "label": "Longueurs"
      },
      {
        "id": "aire_perimetre",
        "label": "Périmètres"
      },
      {
        "id": "aire_surface",
        "label": "Aires"
      },
      {
        "id": "volume_solide",
        "label": "Volumes"
      },
      {
        "id": "angle_mesure",
        "label": "Angles"
      },
      {
        "id": "triangle_figure",
        "label": "Triangles"
      },
      {
        "id": "quadrilatere_figure",
        "label": "Quadrilatères"
      },
      {
        "id": "sym_axiale",
        "label": "Symétrie axiale"
      },
      {
        "id": "stat_donnee",
        "label": "Données"
      },
      {
        "id": "proba_experience",
        "label": "Probabilités"
      }
    ],
    "adulte": [
      {
        "id": "calcul_mental_utile",
        "label": "Calculer vite dans la vie courante"
      },
      {
        "id": "argent_budget",
        "label": "Gerer un budget simple"
      },
      {
        "id": "prix_comparer",
        "label": "Comparer des prix et des offres"
      },
      {
        "id": "pourcentages_quotidien",
        "label": "Utiliser les pourcentages au quotidien"
      },
      {
        "id": "proportionnalite_pratique",
        "label": "Adapter des quantites"
      },
      {
        "id": "fractions_ratios",
        "label": "Utiliser moitie, quart, tiers"
      },
      {
        "id": "mesures_conversions",
        "label": "Convertir des mesures courantes"
      },
      {
        "id": "durees_trajets",
        "label": "Calculer des durees et des horaires"
      },
      {
        "id": "donnees_tableaux",
        "label": "Lire un tableau ou une information chiffree"
      },
      {
        "id": "statistiques_simples",
        "label": "Moyennes et reperes simples"
      }
    ],
    "ce1": [
      {
        "id": "nombre_entier",
        "label": "Nombres jusqu'a 1 000"
      },
      {
        "id": "suite_nombre",
        "label": "Suites de nombres"
      },
      {
        "id": "addition_soustraction",
        "label": "Additions et soustractions"
      },
      {
        "id": "multiplication",
        "label": "Multiplication"
      },
      {
        "id": "division_partage",
        "label": "Partages et groupements"
      },
      {
        "id": "calcul_mental",
        "label": "Calcul mental"
      },
      {
        "id": "fraction",
        "label": "Fractions simples"
      },
      {
        "id": "probleme",
        "label": "Problemes"
      },
      {
        "id": "longueur",
        "label": "Longueurs"
      },
      {
        "id": "masse",
        "label": "Masses"
      },
      {
        "id": "contenance",
        "label": "Contenances"
      },
      {
        "id": "duree",
        "label": "Temps et durees"
      },
      {
        "id": "monnaie",
        "label": "Monnaie"
      },
      {
        "id": "reperage",
        "label": "Reperage sur quadrillage"
      },
      {
        "id": "droites_segments",
        "label": "Droites et segments"
      },
      {
        "id": "figures_planes",
        "label": "Figures planes"
      },
      {
        "id": "solides",
        "label": "Solides"
      },
      {
        "id": "symetrie",
        "label": "Symetrie axiale"
      },
      {
        "id": "donnees",
        "label": "Tableaux et graphiques simples"
      },
      {
        "id": "algorithmique",
        "label": "Instructions et deplacements codes"
      }
    ],
    "ce2": [
      {
        "id": "nombre_entier",
        "label": "Nombres jusqu'a 10 000"
      },
      {
        "id": "suite_nombre",
        "label": "Suites de nombres"
      },
      {
        "id": "addition_soustraction",
        "label": "Additions et soustractions"
      },
      {
        "id": "multiplication",
        "label": "Multiplication"
      },
      {
        "id": "division",
        "label": "Division"
      },
      {
        "id": "calcul_mental",
        "label": "Calcul mental"
      },
      {
        "id": "fraction",
        "label": "Fractions"
      },
      {
        "id": "probleme",
        "label": "Problemes"
      },
      {
        "id": "longueur",
        "label": "Longueurs"
      },
      {
        "id": "masse",
        "label": "Masses"
      },
      {
        "id": "contenance",
        "label": "Contenances"
      },
      {
        "id": "duree",
        "label": "Temps et durees"
      },
      {
        "id": "monnaie",
        "label": "Monnaie"
      },
      {
        "id": "perimetre",
        "label": "Perimetres"
      },
      {
        "id": "reperage",
        "label": "Reperage sur quadrillage"
      },
      {
        "id": "droites_angles",
        "label": "Droites et angles droits"
      },
      {
        "id": "figures_planes",
        "label": "Figures planes"
      },
      {
        "id": "solides",
        "label": "Solides"
      },
      {
        "id": "symetrie",
        "label": "Symetrie axiale"
      },
      {
        "id": "donnees",
        "label": "Tableaux et graphiques"
      },
      {
        "id": "algorithmique",
        "label": "Programmes et deplacements codes"
      }
    ],
    "cm1": [
      {
        "id": "nombre_entier",
        "label": "Nombres entiers"
      },
      {
        "id": "suite",
        "label": "Suites de nombres"
      },
      {
        "id": "tables_multiplication",
        "label": "Tables de multiplication"
      },
      {
        "id": "multiplication",
        "label": "Multiplication"
      },
      {
        "id": "division",
        "label": "Division"
      },
      {
        "id": "fraction",
        "label": "Fractions"
      },
      {
        "id": "nombre_decimal",
        "label": "Nombres décimaux"
      },
      {
        "id": "calcul",
        "label": "Calculs"
      },
      {
        "id": "probleme",
        "label": "Problèmes"
      },
      {
        "id": "algebre",
        "label": "Algèbre"
      },
      {
        "id": "proportionnalite",
        "label": "Proportionnalité"
      },
      {
        "id": "longueur",
        "label": "Longueurs"
      },
      {
        "id": "masse",
        "label": "Masses"
      },
      {
        "id": "contenance",
        "label": "Contenances"
      },
      {
        "id": "duree",
        "label": "Durées"
      },
      {
        "id": "perimetre",
        "label": "Périmètres"
      },
      {
        "id": "aire",
        "label": "Aires"
      },
      {
        "id": "angle",
        "label": "Angles"
      },
      {
        "id": "reperage",
        "label": "Repérage"
      },
      {
        "id": "droite",
        "label": "Droites"
      },
      {
        "id": "symetrie",
        "label": "Symétrie"
      },
      {
        "id": "figure_plane",
        "label": "Figures planes"
      },
      {
        "id": "solide",
        "label": "Solides"
      },
      {
        "id": "tableau",
        "label": "Tableaux"
      },
      {
        "id": "graphique",
        "label": "Graphiques et diagrammes"
      },
      {
        "id": "probabilite",
        "label": "Probabilités simples"
      },
      {
        "id": "algorithmique",
        "label": "Algorithmique"
      }
    ],
    "cm2": [
      {
        "id": "nombre_entier",
        "label": "Nombres entiers"
      },
      {
        "id": "suite",
        "label": "Suites de nombres"
      },
      {
        "id": "multiplication",
        "label": "Multiplication"
      },
      {
        "id": "division",
        "label": "Division"
      },
      {
        "id": "fraction",
        "label": "Fractions"
      },
      {
        "id": "nombre_decimal",
        "label": "Nombres décimaux"
      },
      {
        "id": "calcul",
        "label": "Calculs"
      },
      {
        "id": "probleme",
        "label": "Problèmes"
      },
      {
        "id": "algebre",
        "label": "Algèbre"
      },
      {
        "id": "proportionnalite",
        "label": "Proportionnalité"
      },
      {
        "id": "pourcentage",
        "label": "Pourcentages simples"
      },
      {
        "id": "echelle",
        "label": "Échelles simples"
      },
      {
        "id": "longueur",
        "label": "Longueurs"
      },
      {
        "id": "masse",
        "label": "Masses"
      },
      {
        "id": "contenance",
        "label": "Contenances"
      },
      {
        "id": "duree",
        "label": "Durées"
      },
      {
        "id": "perimetre",
        "label": "Périmètres"
      },
      {
        "id": "aire",
        "label": "Aires"
      },
      {
        "id": "angle",
        "label": "Angles"
      },
      {
        "id": "reperage",
        "label": "Repérage"
      },
      {
        "id": "droite",
        "label": "Droites"
      },
      {
        "id": "symetrie",
        "label": "Symétrie"
      },
      {
        "id": "figure_plane",
        "label": "Figures planes"
      },
      {
        "id": "solide",
        "label": "Solides"
      },
      {
        "id": "tableau",
        "label": "Tableaux"
      },
      {
        "id": "graphique",
        "label": "Graphiques et diagrammes"
      },
      {
        "id": "probabilite",
        "label": "Probabilités simples"
      },
      {
        "id": "algorithmique",
        "label": "Algorithmique"
      }
    ],
    "cp": [
      {
        "id": "nombre_entier",
        "label": "Nombres jusqu'a 100"
      },
      {
        "id": "suite_nombre",
        "label": "Suites de nombres"
      },
      {
        "id": "addition_soustraction",
        "label": "Additions et soustractions"
      },
      {
        "id": "calcul_mental",
        "label": "Calcul mental"
      },
      {
        "id": "probleme",
        "label": "Problemes additifs"
      },
      {
        "id": "longueur",
        "label": "Longueurs"
      },
      {
        "id": "masse_contenance",
        "label": "Masses et contenances"
      },
      {
        "id": "duree",
        "label": "Temps et durees"
      },
      {
        "id": "monnaie",
        "label": "Monnaie"
      },
      {
        "id": "reperage",
        "label": "Reperage dans l'espace"
      },
      {
        "id": "figures_solides",
        "label": "Figures planes et solides"
      },
      {
        "id": "donnees",
        "label": "Tableaux et donnees simples"
      },
      {
        "id": "algorithmique",
        "label": "Suites d'instructions"
      }
    ],
    "premiere-spe": [
      {
        "id": "suites",
        "label": "Suites numériques"
      },
      {
        "id": "second_degre",
        "label": "Second degré"
      },
      {
        "id": "derivation",
        "label": "Dérivation"
      },
      {
        "id": "variations_fonctions",
        "label": "Variations et courbes des fonctions"
      },
      {
        "id": "exponentielle",
        "label": "Fonction exponentielle"
      },
      {
        "id": "trigonometrie",
        "label": "Fonctions trigonométriques"
      },
      {
        "id": "produit_scalaire",
        "label": "Calcul vectoriel et produit scalaire"
      },
      {
        "id": "geometrie_reperee",
        "label": "Géométrie repérée"
      },
      {
        "id": "probabilites_conditionnelles",
        "label": "Probabilités conditionnelles et indépendance"
      },
      {
        "id": "variables_aleatoires",
        "label": "Variables aléatoires réelles"
      },
      {
        "id": "algorithmique",
        "label": "Algorithmique et programmation"
      },
      {
        "id": "logique_ensembles",
        "label": "Vocabulaire ensembliste et logique"
      }
    ],
    "seconde": [
      {
        "id": "reels_intervalles",
        "label": "Nombres reels et intervalles"
      },
      {
        "id": "arithmetique_entiers",
        "label": "Multiples, diviseurs et nombres premiers"
      },
      {
        "id": "puissances_2de",
        "label": "Puissances"
      },
      {
        "id": "racine_carree_2de",
        "label": "Racine carree"
      },
      {
        "id": "developpement_factorisation_2de",
        "label": "Developpement et factorisation"
      },
      {
        "id": "identites_remarquables_2de",
        "label": "Identites remarquables"
      },
      {
        "id": "expressions_litterales_2de",
        "label": "Expressions litterales"
      },
      {
        "id": "equations_inequations_1er_degre",
        "label": "Equations et inequations du premier degre"
      },
      {
        "id": "vecteurs_plan",
        "label": "Vecteurs du plan"
      },
      {
        "id": "repere_coordonnees",
        "label": "Repere et coordonnees"
      },
      {
        "id": "droites_plan",
        "label": "Droites du plan"
      },
      {
        "id": "geometrie_problemes_plan",
        "label": "Problemes de geometrie plane"
      },
      {
        "id": "fonction_vocabulaire_2de",
        "label": "Fonctions : vocabulaire et representations"
      },
      {
        "id": "fonction_variations_extremums",
        "label": "Variations et extremums"
      },
      {
        "id": "fonctions_affines_2de",
        "label": "Fonctions affines"
      },
      {
        "id": "fonctions_reference_2de",
        "label": "Fonctions de reference"
      },
      {
        "id": "information_chiffree_evolutions",
        "label": "Information chiffree : proportions, pourcentages et evolutions"
      },
      {
        "id": "statistiques_descriptives",
        "label": "Statistiques descriptives"
      },
      {
        "id": "probabilites_ensemble_fini",
        "label": "Probabilites sur un ensemble fini"
      },
      {
        "id": "echantillonnage_simulation",
        "label": "Echantillonnage et simulation"
      },
      {
        "id": "algorithmique_python_2de",
        "label": "Algorithmique et Python"
      },
      {
        "id": "logique_ensembles",
        "label": "Vocabulaire ensembliste et logique"
      }
    ],
    "terminale-spe": [
      {
        "id": "suite_numerique",
        "label": "Suites numériques"
      },
      {
        "id": "limite_suite",
        "label": "Limites de suites"
      },
      {
        "id": "limite_fonction",
        "label": "Limites de fonctions"
      },
      {
        "id": "continuite_tvi",
        "label": "Continuité et théorème des valeurs intermédiaires"
      },
      {
        "id": "derivation_fonction",
        "label": "Dérivation et variations"
      },
      {
        "id": "convexite_fonction",
        "label": "Convexité"
      },
      {
        "id": "fonction_exponentielle",
        "label": "Fonction exponentielle"
      },
      {
        "id": "fonction_logarithme",
        "label": "Fonction logarithme népérien"
      },
      {
        "id": "primitive_integrale",
        "label": "Primitives et intégrales"
      },
      {
        "id": "denombrement_combinatoire",
        "label": "Dénombrement et combinatoire"
      },
      {
        "id": "geometrie_espace",
        "label": "Géométrie dans l’espace"
      },
      {
        "id": "produit_scalaire_espace",
        "label": "Produit scalaire dans l’espace"
      },
      {
        "id": "probabilite_conditionnelle",
        "label": "Probabilités conditionnelles"
      },
      {
        "id": "variable_aleatoire",
        "label": "Variables aléatoires"
      },
      {
        "id": "loi_binomiale",
        "label": "Loi binomiale"
      },
      {
        "id": "algorithmique_python",
        "label": "Algorithmique et Python"
      },
      {
        "id": "equation_differentielle",
        "label": "Équations différentielles"
      },
      {
        "id": "concentration_echantillonnage",
        "label": "Concentration, loi des grands nombres"
      }
    ]
  },
  "francais": {
    "ce1": [
      {
        "id": "langage_oral",
        "label": "Langage oral"
      },
      {
        "id": "fluence_lecture",
        "label": "Fluence et lecture courante"
      },
      {
        "id": "sons_complexes",
        "label": "Sons complexes et graphemes particuliers"
      },
      {
        "id": "comprehension_lecture",
        "label": "Comprehension de textes"
      },
      {
        "id": "types_textes",
        "label": "Types de textes (narratif, documentaire, poetique)"
      },
      {
        "id": "copie_fluente",
        "label": "Copie fluente et soignee"
      },
      {
        "id": "ecriture_mots",
        "label": "Ecriture de mots et dictee"
      },
      {
        "id": "production_ecrite",
        "label": "Production d'ecrits"
      },
      {
        "id": "grammaire_phrase",
        "label": "La phrase et ses constituants"
      },
      {
        "id": "classes_mots",
        "label": "Classes de mots (nom, verbe, adjectif, determinant)"
      },
      {
        "id": "orthographe",
        "label": "Orthographe lexicale et grammaticale"
      },
      {
        "id": "conjugaison",
        "label": "Conjugaison – present et passe compose"
      },
      {
        "id": "vocabulaire",
        "label": "Vocabulaire et sens des mots"
      }
    ],
    "ce2": [
      {
        "id": "langage_oral",
        "label": "Langage oral"
      },
      {
        "id": "fluence_lecture",
        "label": "Fluence et lecture expressive"
      },
      {
        "id": "comprehension_lecture",
        "label": "Comprehension de textes"
      },
      {
        "id": "copie_fluente",
        "label": "Copie fluente et soignee"
      },
      {
        "id": "production_ecrite",
        "label": "Production d'ecrits courts"
      },
      {
        "id": "grammaire_phrase",
        "label": "La phrase et ses constituants"
      },
      {
        "id": "classes_mots",
        "label": "Classes de mots"
      },
      {
        "id": "orthographe",
        "label": "Orthographe lexicale et grammaticale"
      },
      {
        "id": "conjugaison",
        "label": "Conjugaison - temps simples"
      },
      {
        "id": "vocabulaire",
        "label": "Vocabulaire et relations entre les mots"
      }
    ],
    "cm1": [
      {
        "id": "fluence_lecture",
        "label": "Lire avec fluidité et expressivité"
      },
      {
        "id": "comprehension_textes_documents",
        "label": "Comprendre textes, documents et images"
      },
      {
        "id": "lecture_oeuvres",
        "label": "Lire une œuvre et se l'approprier"
      },
      {
        "id": "ecriture",
        "label": "Écrire pour apprendre et produire"
      },
      {
        "id": "oral",
        "label": "Écouter, dire et participer aux échanges"
      },
      {
        "id": "vocabulaire",
        "label": "Vocabulaire et relations entre les mots"
      },
      {
        "id": "grammaire_orthographe",
        "label": "Phrase simple, accords et orthographe grammaticale"
      },
      {
        "id": "conjugaison",
        "label": "Conjugaison et valeur des temps"
      }
    ],
    "cm2": [
      {
        "id": "fluence_lecture",
        "label": "Lire avec fluidité et expressivité"
      },
      {
        "id": "comprehension_textes_documents",
        "label": "Comprendre des textes et documents complexes"
      },
      {
        "id": "lecture_oeuvres",
        "label": "Lire une œuvre et construire une culture littéraire"
      },
      {
        "id": "ecriture",
        "label": "Produire, organiser et réviser des écrits"
      },
      {
        "id": "oral",
        "label": "Écouter, présenter et argumenter"
      },
      {
        "id": "vocabulaire",
        "label": "Vocabulaire, nuances et orthographe lexicale"
      },
      {
        "id": "grammaire_orthographe",
        "label": "Phrase, groupes, accords et homophones"
      },
      {
        "id": "phrase_complexe",
        "label": "Se repérer dans la phrase complexe"
      },
      {
        "id": "conjugaison",
        "label": "Conjugaison et valeur des temps"
      }
    ],
    "cp": [
      {
        "id": "langage_oral",
        "label": "Langage oral"
      },
      {
        "id": "conscience_phonologique",
        "label": "Conscience phonologique"
      },
      {
        "id": "grapheme_phoneme",
        "label": "Correspondances grapheme-phoneme"
      },
      {
        "id": "lecture_syllabique",
        "label": "Lecture syllabique et dechiffrage"
      },
      {
        "id": "comprehension_lecture",
        "label": "Comprehension de textes"
      },
      {
        "id": "copie",
        "label": "Copie de mots et de phrases"
      },
      {
        "id": "ecriture_mots",
        "label": "Ecriture de mots (dictee)"
      },
      {
        "id": "production_ecrite",
        "label": "Production d'ecrits simples"
      },
      {
        "id": "grammaire_phrase",
        "label": "La phrase"
      },
      {
        "id": "orthographe",
        "label": "Orthographe de base"
      },
      {
        "id": "vocabulaire",
        "label": "Vocabulaire"
      }
    ]
  },
  "anglais": {
    "a1": [
      {
        "id": "en_a1_digits",
        "label": "Digits"
      },
      {
        "id": "en_a1_numbers",
        "label": "Numbers"
      },
      {
        "id": "en_a1_operations",
        "label": "Operations"
      },
      {
        "id": "en_a1_comparisons",
        "label": "Comparisons"
      },
      {
        "id": "en_a1_shapes",
        "label": "Shapes"
      },
      {
        "id": "en_a1_verbs",
        "label": "Math Verbs"
      },
      {
        "id": "en_a1_sports",
        "label": "Sports"
      },
      {
        "id": "en_a1_sport_measurements",
        "label": "Sport Measurements"
      },
      {
        "id": "en_a1_science_living",
        "label": "Science — Living World"
      },
      {
        "id": "en_a1_science_earth",
        "label": "Science — Earth"
      },
      {
        "id": "en_a1_money",
        "label": "Économie - Gestion — Money"
      },
      {
        "id": "en_a1_family_budget",
        "label": "Économie - Gestion — Family Budget"
      },
      {
        "id": "en_a1_countries",
        "label": "Géographie - Voyage — Countries"
      },
      {
        "id": "en_a1_geography_basic",
        "label": "Géographie - Voyage — Basic Geography"
      },
      {
        "id": "en_a1_family",
        "label": "Vie Quotidienne — Family"
      },
      {
        "id": "en_a1_school",
        "label": "Vie Quotidienne — School"
      },
      {
        "id": "en_a1_colors",
        "label": "Vie Quotidienne — Colors"
      },
      {
        "id": "en_a1_body",
        "label": "Vie Quotidienne — Body"
      },
      {
        "id": "en_a1_food",
        "label": "Vie Quotidienne — Food"
      }
    ],
    "a2": [
      {
        "id": "en_a2_verbs",
        "label": "Mathematical Verbs A2"
      },
      {
        "id": "en_a2_expressions",
        "label": "Mathematical Expressions A2"
      },
      {
        "id": "en_a2_fractions",
        "label": "Fractions Vocabulary A2"
      },
      {
        "id": "en_a2_geometry",
        "label": "Geometry Vocabulary A2"
      },
      {
        "id": "en_a2_sport_verbs",
        "label": "Sport Verbs A2"
      },
      {
        "id": "en_a2_sport_stats",
        "label": "Sport Stats A2"
      },
      {
        "id": "en_a2_sport_physics",
        "label": "Sport Physics A2"
      },
      {
        "id": "en_a2_science_biology",
        "label": "Science — Biology A2"
      },
      {
        "id": "en_a2_science_chemistry",
        "label": "Science — Chemistry A2"
      },
      {
        "id": "en_a2_science_physics",
        "label": "Science — Physics A2"
      },
      {
        "id": "en_a2_economy_basics",
        "label": "Économie - Gestion — Basics A2"
      },
      {
        "id": "en_a2_family_finance",
        "label": "Économie - Gestion — Family Finance A2"
      },
      {
        "id": "en_a2_percentages_eco",
        "label": "Économie - Gestion — Percentages A2"
      },
      {
        "id": "en_a2_travel",
        "label": "Géographie - Voyage — Travel A2"
      },
      {
        "id": "en_a2_geography",
        "label": "Géographie - Voyage — Geography A2"
      },
      {
        "id": "en_a2_directions",
        "label": "Géographie - Voyage — Directions A2"
      },
      {
        "id": "en_a2_home",
        "label": "Vie Quotidienne — Home A2"
      },
      {
        "id": "en_a2_daily_verbs",
        "label": "Vie Quotidienne — Daily Verbs A2"
      },
      {
        "id": "en_a2_adjectives",
        "label": "Vie Quotidienne — Adjectives A2"
      },
      {
        "id": "en_a2_jobs",
        "label": "Vie Quotidienne — Jobs A2"
      }
    ],
    "b1": [
      {
        "id": "en_b1_verbs",
        "label": "Mathematical Verbs B1"
      },
      {
        "id": "en_b1_algebra",
        "label": "Algebra Vocabulary B1"
      },
      {
        "id": "en_b1_statistics",
        "label": "Statistics Vocabulary B1"
      },
      {
        "id": "en_b1_reasoning",
        "label": "Reasoning Phrases B1"
      },
      {
        "id": "en_b1_sport_verbs",
        "label": "Sport Verbs B1"
      },
      {
        "id": "en_b1_sport_physics",
        "label": "Sport Physics B1"
      },
      {
        "id": "en_b1_sport_stats",
        "label": "Sport Statistics B1"
      },
      {
        "id": "en_b1_science_biology",
        "label": "Science — Biology B1"
      },
      {
        "id": "en_b1_science_chemistry",
        "label": "Science — Chemistry B1"
      },
      {
        "id": "en_b1_science_physics",
        "label": "Science — Physics B1"
      },
      {
        "id": "en_b1_economy",
        "label": "Économie - Gestion — Economy B1"
      },
      {
        "id": "en_b1_finance",
        "label": "Économie - Gestion — Finance B1"
      },
      {
        "id": "en_b1_family_management",
        "label": "Économie - Gestion — Family Management B1"
      },
      {
        "id": "en_b1_physical_geography",
        "label": "Géographie - Voyage — Physical Geography B1"
      },
      {
        "id": "en_b1_travel_culture",
        "label": "Géographie - Voyage — Travel & Culture B1"
      },
      {
        "id": "en_b1_environment",
        "label": "Géographie - Voyage — Environment B1"
      }
    ],
    "b2": [
      {
        "id": "en_b2_verbs",
        "label": "Mathematical Verbs B2"
      },
      {
        "id": "en_b2_proof",
        "label": "Proof & Logic B2"
      },
      {
        "id": "en_b2_analysis",
        "label": "Analysis Vocabulary B2"
      },
      {
        "id": "en_b2_sport_verbs",
        "label": "Sport Verbs B2"
      },
      {
        "id": "en_b2_sport_science",
        "label": "Sport Science B2"
      },
      {
        "id": "en_b2_sport_data",
        "label": "Sport Data Analysis B2"
      },
      {
        "id": "en_b2_science_biology",
        "label": "Science — Biology B2"
      },
      {
        "id": "en_b2_science_chemistry",
        "label": "Science — Chemistry B2"
      },
      {
        "id": "en_b2_science_physics",
        "label": "Science — Physics B2"
      },
      {
        "id": "en_b2_macroeconomics",
        "label": "Économie - Gestion — Macroeconomics B2"
      },
      {
        "id": "en_b2_business",
        "label": "Économie - Gestion — Business B2"
      },
      {
        "id": "en_b2_eco_statistics",
        "label": "Économie - Gestion — Statistics B2"
      },
      {
        "id": "en_b2_geopolitics",
        "label": "Géographie - Voyage — Geopolitics B2"
      },
      {
        "id": "en_b2_climate_science",
        "label": "Géographie - Voyage — Climate Science B2"
      },
      {
        "id": "en_b2_geo_statistics",
        "label": "Géographie - Voyage — Geo Statistics B2"
      }
    ]
  },
  "espagnol": {
    "a1": [
      {
        "id": "es_a1_digits",
        "label": "Chiffres"
      },
      {
        "id": "es_a1_numbers",
        "label": "Nombres"
      },
      {
        "id": "es_a1_operations",
        "label": "Opérations"
      },
      {
        "id": "es_a1_shapes",
        "label": "Formes"
      },
      {
        "id": "es_a1_colors",
        "label": "Couleurs"
      },
      {
        "id": "es_a1_family",
        "label": "Famille"
      },
      {
        "id": "es_a1_school",
        "label": "École"
      },
      {
        "id": "es_a1_body",
        "label": "Corps"
      },
      {
        "id": "es_a1_food",
        "label": "Alimentation"
      },
      {
        "id": "es_a1_animals",
        "label": "Animaux"
      },
      {
        "id": "es_a1_clothes",
        "label": "Vêtements"
      },
      {
        "id": "es_a1_house",
        "label": "Maison"
      },
      {
        "id": "es_a1_days",
        "label": "Jours & mois"
      },
      {
        "id": "es_a1_greetings",
        "label": "Salutations"
      },
      {
        "id": "es_a1_money",
        "label": "Argent & prix"
      },
      {
        "id": "es_a1_geography_basic",
        "label": "Géographie de base"
      },
      {
        "id": "es_a1_science_earth",
        "label": "Sciences de la Terre"
      },
      {
        "id": "es_a1_sport_measurements",
        "label": "Sport & mesures"
      }
    ],
    "a2": [
      {
        "id": "es_a2_daily_life",
        "label": "Vie quotidienne"
      },
      {
        "id": "es_a2_travel",
        "label": "Voyage & transport"
      },
      {
        "id": "es_a2_jobs",
        "label": "Métiers"
      },
      {
        "id": "es_a2_adjectives",
        "label": "Adjectifs"
      },
      {
        "id": "es_a2_time",
        "label": "Temps & fréquence"
      },
      {
        "id": "es_a2_weather",
        "label": "Météo & saisons"
      },
      {
        "id": "es_a2_shopping",
        "label": "Courses & achats"
      },
      {
        "id": "es_a2_health",
        "label": "Santé"
      },
      {
        "id": "es_a2_family_budget",
        "label": "Budget familial"
      },
      {
        "id": "es_a2_geography",
        "label": "Géographie & repères"
      },
      {
        "id": "es_a2_science_living",
        "label": "Sciences du vivant"
      },
      {
        "id": "es_a2_sport_verbs",
        "label": "Verbes du sport"
      }
    ],
    "b1": [
      {
        "id": "es_b1_opinions",
        "label": "Opinions & arguments"
      },
      {
        "id": "es_b1_environment",
        "label": "Environnement & société"
      },
      {
        "id": "es_b1_media",
        "label": "Médias & culture"
      },
      {
        "id": "es_b1_economy",
        "label": "Économie de base"
      },
      {
        "id": "es_b1_science",
        "label": "Sciences & technologie"
      },
      {
        "id": "es_b1_finance",
        "label": "Finance & argent"
      },
      {
        "id": "es_b1_physical_geography",
        "label": "Géographie physique"
      },
      {
        "id": "es_b1_science_biology",
        "label": "Biologie"
      },
      {
        "id": "es_b1_sport_stats",
        "label": "Sport & statistiques"
      }
    ],
    "b2": [
      {
        "id": "es_b2_geopolitics",
        "label": "Géopolitique hispanique"
      },
      {
        "id": "es_b2_literature",
        "label": "Littérature & culture"
      },
      {
        "id": "es_b2_economics",
        "label": "Économie & mondialisation"
      },
      {
        "id": "es_b2_philosophy",
        "label": "Philosophie & éthique"
      },
      {
        "id": "es_b2_macroeconomics",
        "label": "Macroéconomie"
      },
      {
        "id": "es_b2_geo_statistics",
        "label": "Géographie & démographie"
      },
      {
        "id": "es_b2_climate_science",
        "label": "Science du climat"
      },
      {
        "id": "es_b2_sport_science",
        "label": "Science du sport"
      }
    ]
  },
  "ia": {
    "a1": [
      {
        "id": "ia_a1_definition",
        "label": "Qu'est-ce que l'IA ?"
      },
      {
        "id": "ia_a1_usages_limites",
        "label": "Ce que l'IA sait faire... et ses limites"
      },
      {
        "id": "ia_a1_responsabilite_impact",
        "label": "Mon role et l'impact de l'IA"
      }
    ],
    "a2": [
      {
        "id": "ia_a2_prompts",
        "label": "Ecrire un bon prompt"
      },
      {
        "id": "ia_a2_reviser",
        "label": "Reviser et s'entrainer avec l'IA"
      },
      {
        "id": "ia_a2_apprendre_honnete",
        "label": "Apprendre vraiment, sans tricher"
      }
    ],
    "b1": [
      {
        "id": "ia_b1_verification",
        "label": "Verifier et garder l'esprit critique"
      },
      {
        "id": "ia_b1_securite",
        "label": "Securite et donnees personnelles"
      },
      {
        "id": "ia_b1_responsabilite_numerique",
        "label": "Plagiat, droits et responsabilite"
      }
    ],
    "b2": [
      {
        "id": "ia_b2_prompt_avance",
        "label": "Methode : prompt avance et iteration"
      },
      {
        "id": "ia_b2_production",
        "label": "Production creative"
      },
      {
        "id": "ia_b2_qualite_responsabilite",
        "label": "Qualite, verification et responsabilite"
      }
    ],
    "c1": [
      {
        "id": "ia_c1_cadrer_projet",
        "label": "Cadrer un projet IA utile"
      },
      {
        "id": "ia_c1_conception_responsable",
        "label": "Concevoir de facon responsable"
      },
      {
        "id": "ia_c1_responsabilite_pitch",
        "label": "Tester et presenter"
      }
    ]
  }
};
