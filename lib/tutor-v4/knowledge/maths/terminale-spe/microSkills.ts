// knowledge/maths/terminale-spe/microSkills.ts

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  /* =========================
     SUITES NUMÉRIQUES
  ========================= */

  {
    id: "suite_reconnaitre",
    label: "Reconnaître le type d’une suite",
    notionId: "suite_numerique",
    prerequis: [],
  },
  {
    id: "suite_calculer_termes",
    label: "Calculer les premiers termes d’une suite",
    notionId: "suite_numerique",
    prerequis: ["suite_reconnaitre"],
  },
  {
    id: "suite_explicite_recurrence",
    label: "Distinguer forme explicite et forme récurrente",
    notionId: "suite_numerique",
    prerequis: ["suite_calculer_termes"],
  },
  {
    id: "suite_recurrence_preuve",
    label: "Démontrer une propriété par récurrence",
    notionId: "suite_numerique",
    prerequis: ["suite_explicite_recurrence"],
  },
  {
    id: "suite_variation",
    label: "Étudier les variations d’une suite",
    notionId: "suite_numerique",
    prerequis: ["suite_recurrence_preuve"],
  },
  {
    id: "suite_bornee",
    label: "Montrer qu’une suite est majorée, minorée ou bornée",
    notionId: "suite_numerique",
    prerequis: ["suite_recurrence_preuve"],
  },
  {
    id: "suite_defi",
    label: "Résoudre un exercice type bac sur les suites",
    notionId: "suite_numerique",
    prerequis: ["suite_variation", "suite_bornee"],
  },

  /* =========================
     LIMITES DE SUITES
  ========================= */

  {
    id: "limite_suite_interpreter",
    label: "Interpréter la limite d’une suite",
    notionId: "limite_suite",
    prerequis: ["suite_reconnaitre"],
  },
  {
    id: "limite_suite_calculer",
    label: "Calculer une limite de suite simple",
    notionId: "limite_suite",
    prerequis: ["limite_suite_interpreter"],
  },
  {
    id: "limite_suite_operations",
    label: "Utiliser les opérations sur les limites de suites",
    notionId: "limite_suite",
    prerequis: ["limite_suite_calculer"],
  },
  {
    id: "limite_suite_comparaison",
    label: "Utiliser un théorème de comparaison ou d’encadrement",
    notionId: "limite_suite",
    prerequis: ["limite_suite_operations"],
  },
  {
    id: "limite_suite_monotone_bornee",
    label: "Utiliser le théorème de convergence monotone",
    notionId: "limite_suite",
    prerequis: ["suite_variation", "suite_bornee"],
  },
  {
    id: "limite_suite_defi",
    label: "Résoudre un exercice type bac sur les limites de suites",
    notionId: "limite_suite",
    prerequis: ["limite_suite_comparaison", "limite_suite_monotone_bornee"],
  },

  /* =========================
     LIMITES DE FONCTIONS
  ========================= */

  {
    id: "limite_fonction_reference",
    label: "Connaître les limites des fonctions de référence",
    notionId: "limite_fonction",
    prerequis: [],
  },
  {
    id: "limite_fonction_operations",
    label: "Utiliser les opérations sur les limites",
    notionId: "limite_fonction",
    prerequis: ["limite_fonction_reference"],
  },
  {
    id: "limite_fonction_infini",
    label: "Calculer une limite en l’infini",
    notionId: "limite_fonction",
    prerequis: ["limite_fonction_operations"],
  },
  {
    id: "limite_fonction_point",
    label: "Calculer une limite en un point",
    notionId: "limite_fonction",
    prerequis: ["limite_fonction_operations"],
  },
  {
    id: "limite_fonction_asymptote",
    label: "Identifier une asymptote à partir d’une limite",
    notionId: "limite_fonction",
    prerequis: ["limite_fonction_infini", "limite_fonction_point"],
  },
  {
    id: "limite_fonction_defi",
    label: "Résoudre un exercice type bac sur les limites de fonctions",
    notionId: "limite_fonction",
    prerequis: ["limite_fonction_asymptote"],
  },

  /* =========================
     CONTINUITÉ ET TVI
  ========================= */

  {
    id: "continuite_reconnaitre",
    label: "Reconnaître une fonction continue sur un intervalle",
    notionId: "continuite_tvi",
    prerequis: ["limite_fonction_point"],
  },
  {
    id: "tvi_appliquer",
    label: "Appliquer le théorème des valeurs intermédiaires",
    notionId: "continuite_tvi",
    prerequis: ["continuite_reconnaitre"],
  },
  {
    id: "tvi_unicite",
    label: "Justifier l’unicité d’une solution",
    notionId: "continuite_tvi",
    prerequis: ["tvi_appliquer", "derivation_variation"],
  },
  {
    id: "tvi_rediger",
    label: "Rédiger une justification conforme au bac avec le TVI",
    notionId: "continuite_tvi",
    prerequis: ["tvi_appliquer"],
  },
  {
    id: "tvi_defi",
    label: "Résoudre un exercice type bac avec continuité et TVI",
    notionId: "continuite_tvi",
    prerequis: ["tvi_rediger", "tvi_unicite"],
  },

  /* =========================
     DÉRIVATION
  ========================= */

  {
    id: "derivation_formules",
    label: "Connaître les formules de dérivation",
    notionId: "derivation_fonction",
    prerequis: [],
  },
  {
    id: "derivation_somme_produit_quotient",
    label: "Dériver une somme, un produit ou un quotient",
    notionId: "derivation_fonction",
    prerequis: ["derivation_formules"],
  },
  {
    id: "derivation_composee",
    label: "Dériver une fonction composée",
    notionId: "derivation_fonction",
    prerequis: ["derivation_somme_produit_quotient"],
  },
  {
    id: "derivation_variation",
    label: "Étudier les variations avec le signe de la dérivée",
    notionId: "derivation_fonction",
    prerequis: ["derivation_composee"],
  },
  {
    id: "derivation_tangente",
    label: "Déterminer l’équation d’une tangente",
    notionId: "derivation_fonction",
    prerequis: ["derivation_formules"],
  },
  {
    id: "derivation_optimisation",
    label: "Résoudre un problème d’optimisation",
    notionId: "derivation_fonction",
    prerequis: ["derivation_variation"],
  },
  {
    id: "derivation_defi",
    label: "Résoudre un exercice type bac sur dérivation et variations",
    notionId: "derivation_fonction",
    prerequis: ["derivation_tangente", "derivation_optimisation"],
  },

  /* =========================
     CONVEXITÉ
  ========================= */

  {
    id: "convexite_reconnaitre",
    label: "Reconnaître une fonction convexe ou concave",
    notionId: "convexite_fonction",
    prerequis: ["derivation_variation"],
  },
  {
    id: "convexite_derivee_seconde",
    label: "Utiliser le signe de la dérivée seconde",
    notionId: "convexite_fonction",
    prerequis: ["convexite_reconnaitre"],
  },
  {
    id: "convexite_point_inflexion",
    label: "Identifier un point d’inflexion",
    notionId: "convexite_fonction",
    prerequis: ["convexite_derivee_seconde"],
  },
  {
    id: "convexite_tangente",
    label: "Utiliser la position d’une courbe par rapport à ses tangentes",
    notionId: "convexite_fonction",
    prerequis: ["convexite_reconnaitre"],
  },
  {
    id: "convexite_defi",
    label: "Résoudre un exercice type bac sur la convexité",
    notionId: "convexite_fonction",
    prerequis: ["convexite_point_inflexion", "convexite_tangente"],
  },

  /* =========================
     EXPONENTIELLE
  ========================= */

  {
    id: "exp_definition",
    label: "Comprendre la fonction exponentielle",
    notionId: "fonction_exponentielle",
    prerequis: ["derivation_formules"],
  },
  {
    id: "exp_proprietes",
    label: "Utiliser les propriétés algébriques de l’exponentielle",
    notionId: "fonction_exponentielle",
    prerequis: ["exp_definition"],
  },
  {
    id: "exp_deriver",
    label: "Dériver une expression contenant une exponentielle",
    notionId: "fonction_exponentielle",
    prerequis: ["exp_proprietes", "derivation_composee"],
  },
  {
    id: "exp_equation_inequation",
    label: "Résoudre une équation ou inéquation avec exponentielle",
    notionId: "fonction_exponentielle",
    prerequis: ["exp_proprietes"],
  },
  {
    id: "exp_limite",
    label: "Étudier une limite avec exponentielle",
    notionId: "fonction_exponentielle",
    prerequis: ["exp_proprietes", "limite_fonction_operations"],
  },
  {
    id: "exp_defi",
    label: "Résoudre un exercice type bac avec exponentielle",
    notionId: "fonction_exponentielle",
    prerequis: ["exp_deriver", "exp_limite"],
  },

  /* =========================
     LOGARITHME
  ========================= */

  {
    id: "ln_definition",
    label: "Comprendre la fonction logarithme népérien",
    notionId: "fonction_logarithme",
    prerequis: ["exp_definition"],
  },
  {
    id: "ln_proprietes",
    label: "Utiliser les propriétés algébriques du logarithme",
    notionId: "fonction_logarithme",
    prerequis: ["ln_definition"],
  },
  {
    id: "ln_deriver",
    label: "Dériver une expression contenant un logarithme",
    notionId: "fonction_logarithme",
    prerequis: ["ln_proprietes", "derivation_composee"],
  },
  {
    id: "ln_equation_inequation",
    label: "Résoudre une équation ou inéquation avec logarithme",
    notionId: "fonction_logarithme",
    prerequis: ["ln_proprietes"],
  },
  {
    id: "ln_limite",
    label: "Étudier une limite avec logarithme",
    notionId: "fonction_logarithme",
    prerequis: ["ln_proprietes", "limite_fonction_operations"],
  },
  {
    id: "ln_defi",
    label: "Résoudre un exercice type bac avec logarithme",
    notionId: "fonction_logarithme",
    prerequis: ["ln_deriver", "ln_limite"],
  },

  /* =========================
     PRIMITIVES ET INTÉGRALES
  ========================= */

  {
    id: "primitive_reconnaitre",
    label: "Reconnaître une primitive",
    notionId: "primitive_integrale",
    prerequis: ["derivation_formules"],
  },
  {
    id: "primitive_calculer",
    label: "Calculer une primitive simple",
    notionId: "primitive_integrale",
    prerequis: ["primitive_reconnaitre"],
  },
  {
    id: "integrale_calculer",
    label: "Calculer une intégrale à l’aide d’une primitive",
    notionId: "primitive_integrale",
    prerequis: ["primitive_calculer"],
  },
  {
    id: "integrale_aire",
    label: "Interpréter une intégrale comme une aire",
    notionId: "primitive_integrale",
    prerequis: ["integrale_calculer"],
  },
  {
    id: "integrale_valeur_moyenne",
    label: "Calculer la valeur moyenne d’une fonction",
    notionId: "primitive_integrale",
    prerequis: ["integrale_calculer"],
  },
  {
    id: "integrale_defi",
    label: "Résoudre un exercice type bac sur primitives et intégrales",
    notionId: "primitive_integrale",
    prerequis: ["integrale_aire", "integrale_valeur_moyenne"],
  },

  /* =========================
     DÉNOMBREMENT ET COMBINATOIRE
  ========================= */

  {
    id: "denombrement_reconnaitre",
    label: "Reconnaître une situation de dénombrement",
    notionId: "denombrement_combinatoire",
    prerequis: [],
  },
  {
    id: "denombrement_produit_somme",
    label: "Utiliser les principes additif et multiplicatif",
    notionId: "denombrement_combinatoire",
    prerequis: ["denombrement_reconnaitre"],
  },
  {
    id: "denombrement_arrangement_combinaison",
    label: "Distinguer arrangement, combinaison et ordre des choix",
    notionId: "denombrement_combinatoire",
    prerequis: ["denombrement_produit_somme"],
  },
  {
    id: "denombrement_coefficient_binomial",
    label: "Utiliser les coefficients binomiaux",
    notionId: "denombrement_combinatoire",
    prerequis: ["denombrement_arrangement_combinaison"],
  },
  {
    id: "denombrement_pascal",
    label: "Utiliser le triangle de Pascal",
    notionId: "denombrement_combinatoire",
    prerequis: ["denombrement_coefficient_binomial"],
  },
  {
    id: "denombrement_defi",
    label: "Résoudre un exercice type bac de dénombrement",
    notionId: "denombrement_combinatoire",
    prerequis: ["denombrement_pascal"],
  },

  /* =========================
     GÉOMÉTRIE DANS L’ESPACE
  ========================= */

  {
    id: "espace_vecteurs",
    label: "Manipuler des vecteurs dans l’espace",
    notionId: "geometrie_espace",
    prerequis: [],
  },
  {
    id: "espace_repere_coordonnees",
    label: "Travailler avec des coordonnées dans l’espace",
    notionId: "geometrie_espace",
    prerequis: ["espace_vecteurs"],
  },
  {
    id: "espace_droite_parametrique",
    label: "Utiliser une représentation paramétrique de droite",
    notionId: "geometrie_espace",
    prerequis: ["espace_repere_coordonnees"],
  },
  {
    id: "espace_plan_equation",
    label: "Utiliser une équation cartésienne de plan",
    notionId: "geometrie_espace",
    prerequis: ["espace_repere_coordonnees"],
  },
  {
    id: "espace_position_relative",
    label: "Étudier la position relative de droites et de plans",
    notionId: "geometrie_espace",
    prerequis: ["espace_droite_parametrique", "espace_plan_equation"],
  },
  {
    id: "espace_defi",
    label: "Résoudre un exercice type bac de géométrie dans l’espace",
    notionId: "geometrie_espace",
    prerequis: ["espace_position_relative"],
  },

  /* =========================
     PRODUIT SCALAIRE DANS L’ESPACE
  ========================= */

  {
    id: "ps_espace_calculer",
    label: "Calculer un produit scalaire dans l’espace",
    notionId: "produit_scalaire_espace",
    prerequis: ["espace_vecteurs"],
  },
  {
    id: "ps_espace_orthogonalite",
    label: "Démontrer une orthogonalité",
    notionId: "produit_scalaire_espace",
    prerequis: ["ps_espace_calculer"],
  },
  {
    id: "ps_espace_norme_distance",
    label: "Calculer une norme ou une distance",
    notionId: "produit_scalaire_espace",
    prerequis: ["ps_espace_calculer"],
  },
  {
    id: "ps_espace_angle",
    label: "Calculer un angle dans l’espace",
    notionId: "produit_scalaire_espace",
    prerequis: ["ps_espace_calculer"],
  },
  {
    id: "ps_espace_plan_normal",
    label: "Utiliser un vecteur normal à un plan",
    notionId: "produit_scalaire_espace",
    prerequis: ["ps_espace_orthogonalite", "espace_plan_equation"],
  },
  {
    id: "ps_espace_defi",
    label: "Résoudre un exercice type bac avec produit scalaire dans l’espace",
    notionId: "produit_scalaire_espace",
    prerequis: ["ps_espace_angle", "ps_espace_plan_normal"],
  },

  /* =========================
     PROBABILITÉS CONDITIONNELLES
  ========================= */

  {
    id: "proba_conditionnelle_arbre",
    label: "Construire ou lire un arbre pondéré",
    notionId: "probabilite_conditionnelle",
    prerequis: [],
  },
  {
    id: "proba_conditionnelle_formule",
    label: "Calculer une probabilité conditionnelle",
    notionId: "probabilite_conditionnelle",
    prerequis: ["proba_conditionnelle_arbre"],
  },
  {
    id: "proba_totales",
    label: "Utiliser la formule des probabilités totales",
    notionId: "probabilite_conditionnelle",
    prerequis: ["proba_conditionnelle_formule"],
  },
  {
    id: "proba_inverse_bayes",
    label: "Inverser une probabilité conditionnelle",
    notionId: "probabilite_conditionnelle",
    prerequis: ["proba_totales"],
  },
  {
    id: "proba_conditionnelle_defi",
    label: "Résoudre un exercice type bac de probabilités conditionnelles",
    notionId: "probabilite_conditionnelle",
    prerequis: ["proba_inverse_bayes"],
  },

  /* =========================
     VARIABLES ALÉATOIRES
  ========================= */

  {
    id: "va_definition",
    label: "Comprendre une variable aléatoire",
    notionId: "variable_aleatoire",
    prerequis: ["proba_conditionnelle_formule"],
  },
  {
    id: "va_loi_probabilite",
    label: "Déterminer la loi d’une variable aléatoire",
    notionId: "variable_aleatoire",
    prerequis: ["va_definition"],
  },
  {
    id: "va_esperance",
    label: "Calculer une espérance",
    notionId: "variable_aleatoire",
    prerequis: ["va_loi_probabilite"],
  },
  {
    id: "va_variance_ecart_type",
    label: "Calculer une variance et un écart-type",
    notionId: "variable_aleatoire",
    prerequis: ["va_esperance"],
  },
  {
    id: "va_interpreter",
    label: "Interpréter espérance, variance ou écart-type",
    notionId: "variable_aleatoire",
    prerequis: ["va_variance_ecart_type"],
  },
  {
    id: "va_defi",
    label: "Résoudre un exercice type bac sur les variables aléatoires",
    notionId: "variable_aleatoire",
    prerequis: ["va_interpreter"],
  },

  /* =========================
     LOI BINOMIALE
  ========================= */

  {
    id: "binomiale_schema",
    label: "Reconnaître un schéma de Bernoulli",
    notionId: "loi_binomiale",
    prerequis: ["va_definition"],
  },
  {
    id: "binomiale_reconnaitre",
    label: "Reconnaître une loi binomiale",
    notionId: "loi_binomiale",
    prerequis: ["binomiale_schema"],
  },
  {
    id: "binomiale_calculer",
    label: "Calculer une probabilité avec la loi binomiale",
    notionId: "loi_binomiale",
    prerequis: ["binomiale_reconnaitre", "denombrement_coefficient_binomial"],
  },
  {
    id: "binomiale_esperance_variance",
    label: "Calculer espérance, variance et écart-type d’une loi binomiale",
    notionId: "loi_binomiale",
    prerequis: ["binomiale_calculer", "va_variance_ecart_type"],
  },
  {
    id: "binomiale_intervalle",
    label: "Calculer une probabilité d’intervalle",
    notionId: "loi_binomiale",
    prerequis: ["binomiale_calculer"],
  },
  {
    id: "binomiale_defi",
    label: "Résoudre un exercice type bac avec loi binomiale",
    notionId: "loi_binomiale",
    prerequis: ["binomiale_esperance_variance", "binomiale_intervalle"],
  },

  /* =========================
     ALGORITHMIQUE ET PYTHON
  ========================= */

  {
    id: "python_lire_algorithme",
    label: "Lire et comprendre un algorithme Python",
    notionId: "algorithmique_python",
    prerequis: [],
  },
  {
    id: "python_variable_boucle",
    label: "Utiliser variables, conditions et boucles",
    notionId: "algorithmique_python",
    prerequis: ["python_lire_algorithme"],
  },
  {
    id: "python_suite",
    label: "Programmer les termes d’une suite",
    notionId: "algorithmique_python",
    prerequis: ["python_variable_boucle", "suite_calculer_termes"],
  },
  {
    id: "python_seuil",
    label: "Déterminer un seuil avec Python",
    notionId: "algorithmique_python",
    prerequis: ["python_suite", "limite_suite_interpreter"],
  },
  {
    id: "python_simulation_proba",
    label: "Simuler une expérience aléatoire",
    notionId: "algorithmique_python",
    prerequis: ["python_variable_boucle", "proba_conditionnelle_arbre"],
  },
  {
    id: "python_defi",
    label: "Résoudre un exercice type bac avec algorithmique et Python",
    notionId: "algorithmique_python",
    prerequis: ["python_seuil", "python_simulation_proba"],
  },

  /* =========================
     ÉQUATIONS DIFFÉRENTIELLES
  ========================= */

  {
    id: "equadiff_reconnaitre",
    label: "Reconnaître une équation différentielle",
    notionId: "equation_differentielle",
    prerequis: [],
  },
  {
    id: "equadiff_y_prime_ay",
    label: "Résoudre y' = ay",
    notionId: "equation_differentielle",
    prerequis: ["equadiff_reconnaitre", "exp_definition"],
  },
  {
    id: "equadiff_y_prime_ay_b",
    label: "Résoudre y' = ay + b",
    notionId: "equation_differentielle",
    prerequis: ["equadiff_y_prime_ay"],
  },
  {
    id: "equadiff_solution_particuliere",
    label: "Vérifier une solution particulière",
    notionId: "equation_differentielle",
    prerequis: ["equadiff_reconnaitre", "derivation_formules"],
  },
  {
    id: "equadiff_condition_initiale",
    label: "Déterminer la solution vérifiant une condition initiale",
    notionId: "equation_differentielle",
    prerequis: ["equadiff_y_prime_ay_b"],
  },
  {
    id: "equadiff_defi",
    label: "Résoudre un exercice type bac sur les équations différentielles",
    notionId: "equation_differentielle",
    prerequis: ["equadiff_condition_initiale", "equadiff_solution_particuliere"],
  },

  /* =========================
     CONCENTRATION ET LOI DES GRANDS NOMBRES
  ========================= */

  {
    id: "concentration_echantillon_moyenne",
    label: "Espérance et variance d'une moyenne d'échantillon",
    notionId: "concentration_echantillonnage",
    prerequis: ["va_esperance", "va_variance_ecart_type"],
  },
  {
    id: "concentration_inegalite_bienayme",
    label: "Utiliser l'inégalité de Bienaymé-Tchebychev",
    notionId: "concentration_echantillonnage",
    prerequis: ["concentration_echantillon_moyenne"],
  },
  {
    id: "concentration_inegalite_concentration",
    label: "Utiliser l'inégalité de concentration",
    notionId: "concentration_echantillonnage",
    prerequis: ["concentration_inegalite_bienayme"],
  },
  {
    id: "concentration_loi_grands_nombres",
    label: "Comprendre la loi des grands nombres",
    notionId: "concentration_echantillonnage",
    prerequis: ["concentration_inegalite_concentration"],
  },
  {
    id: "concentration_fluctuation",
    label: "Étudier la fluctuation d'une fréquence",
    notionId: "concentration_echantillonnage",
    prerequis: ["concentration_loi_grands_nombres", "binomiale_esperance_variance"],
  },
  {
    id: "concentration_defi",
    label: "Résoudre un exercice type bac sur la concentration",
    notionId: "concentration_echantillonnage",
    prerequis: ["concentration_loi_grands_nombres", "concentration_fluctuation"],
  },
];