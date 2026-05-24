// lib/coach-bac-spe/weekly.ts

import type { CoachBacDay } from "./types";

export const coachBacSpeWeekly: CoachBacDay[] = [
  {
    id: "jour_01",
    dayNumber: 1,
    title: "Jour 1 — Suites",
    mainNotion: "suites",
    description:
      "Calculer des termes, reconnaître une suite arithmétique ou géométrique, éviter les pièges u0/u1.",
    itemIds: [
      "suites_calcul_termes_001",
      "suites_arithmetique_001",
      "suites_geometrique_001",
      "suites_variation_001",
      "suites_piege_u0_u1_001",
      "suites_piege_arith_geo_001",
      "suites_limite_simple_001",
    ],
    problemId: "probleme_suites_recurrence_001",
  },

  {
    id: "jour_02",
    dayNumber: 2,
    title: "Jour 2 — Dérivées",
    mainNotion: "derivees",
    description:
      "Automatismes de dérivation : affine, polynôme, inverse, exponentielle et pièges classiques.",
    itemIds: [
      "derivee_affine_001",
      "derivee_polynome_001",
      "derivee_inverse_001",
      "derivee_exp_001",
      "derivee_ln_001",
      "derivee_piege_constante_e_001",
      "derivee_piege_composee_001",
    ],
    problemId: "probleme_derivees_variations_001",
  },

  {
    id: "jour_03",
    dayNumber: 3,
    title: "Jour 3 — Probabilités",
    mainNotion: "probabilites",
    description:
      "Arbres, intersections, probabilités conditionnelles et formule des probabilités totales.",
    itemIds: [
      "proba_arbre_001",
      "proba_intersection_001",
      "proba_conditionnelle_001",
      "proba_totales_001",
      "proba_independance_001",
      "proba_piege_intersection_conditionnelle_001",
      "proba_piege_addition_multiplication_001",
    ],
    problemId: "probleme_probabilites_arbre_001",
  },

  {
    id: "jour_04",
    dayNumber: 4,
    title: "Jour 4 — Limites + rappels",
    mainNotion: "limites",
    description:
      "Limites de fonctions, formes indéterminées et rappels suites/dérivées.",
    itemIds: [
      "limites_polynome_001",
      "limites_quotient_001",
      "limites_infini_001",
      "limites_forme_indeterminee_001",
      "limites_piege_valeur_interdite_001",

      // rappels
      "suites_piege_arith_geo_001",
      "derivee_piege_constante_e_001",
    ],
    problemId: "probleme_limites_fonction_001",
  },

  {
    id: "jour_05",
    dayNumber: 5,
    title: "Jour 5 — Exponentielle",
    mainNotion: "exponentielle",
    description:
      "Valeurs remarquables, équations, inéquations, dérivées et limites avec exponentielle.",
    itemIds: [
      "exp_valeurs_remarquables_001",
      "exp_equation_001",
      "exp_inequation_001",
      "exp_derivee_001",
      "exp_limite_001",
      "exp_piege_e0_001",
      "exp_piege_somme_001",
    ],
    problemId: "probleme_exponentielle_bac_001",
  },

  {
    id: "jour_06",
    dayNumber: 6,
    title: "Jour 6 — Logarithme",
    mainNotion: "logarithme",
    description:
      "Valeurs remarquables, domaine de définition, équations, dérivée et pièges sur ln.",
    itemIds: [
      "ln_valeurs_remarquables_001",
      "ln_equation_001",
      "ln_inequation_001",
      "ln_derivee_001",
      "ln_domaine_001",
      "ln_piege_ln1_001",
      "ln_piege_somme_001",
    ],
    problemId: "probleme_logarithme_bac_001",
  },

  {
    id: "jour_07",
    dayNumber: 7,
    title: "Jour 7 — Sujet express 1",
    mainNotion: "synthese",
    description:
      "Premier mini-sujet : suites, dérivées, probabilités, exponentielle et logarithme.",
    itemIds: [
      "suites_calcul_termes_001",
      "derivee_polynome_001",
      "proba_intersection_001",
      "exp_piege_e0_001",
      "ln_piege_ln1_001",
    ],
    expressSubjectId: "sujet_express_01",
  },

  {
    id: "jour_08",
    dayNumber: 8,
    title: "Jour 8 — Fonctions",
    mainNotion: "fonctions",
    description:
      "Lecture graphique, images, antécédents, signes, variations et extremums.",
    itemIds: [
      "fonctions_image_001",
      "fonctions_antecedent_001",
      "fonctions_signe_001",
      "fonctions_variations_001",
      "fonctions_extremum_001",
      "fonctions_piege_image_antecedent_001",
      "derivee_piege_composee_001",
    ],
    problemId: "probleme_fonctions_lecture_graphique_001",
  },

  {
    id: "jour_09",
    dayNumber: 9,
    title: "Jour 9 — Variables aléatoires",
    mainNotion: "variables_aleatoires",
    description:
      "Loi de probabilité, espérance, variance, écart-type et interprétation.",
    itemIds: [
      "va_loi_001",
      "va_esperance_001",
      "va_variance_001",
      "va_ecart_type_001",
      "va_interpretation_001",
      "va_piege_esperance_gain_001",
      "proba_totales_001",
    ],
    problemId: "probleme_variables_aleatoires_gain_001",
  },

  {
    id: "jour_10",
    dayNumber: 10,
    title: "Jour 10 — Géométrie dans l’espace",
    mainNotion: "geometrie_espace",
    description:
      "Vecteurs, droites, plans, produit scalaire, orthogonalité et représentation paramétrique.",
    itemIds: [
      "geo_vecteurs_001",
      "geo_produit_scalaire_001",
      "geo_orthogonalite_001",
      "geo_representation_parametrique_001",
      "geo_intersection_droite_plan_001",
      "geo_piege_colineaire_orthogonal_001",
      "limites_piege_valeur_interdite_001",
    ],
    problemId: "probleme_geometrie_espace_001",
  },

  {
    id: "jour_11",
    dayNumber: 11,
    title: "Jour 11 — Algorithmique",
    mainNotion: "algorithmique",
    description:
      "Comprendre un programme Python, une boucle, une condition et un seuil.",
    itemIds: [
      "algo_for_001",
      "algo_while_001",
      "algo_condition_001",
      "algo_suite_001",
      "algo_seuil_001",
      "algo_piege_initialisation_001",
      "suites_piege_u0_u1_001",
    ],
    problemId: "probleme_algorithmique_suite_001",
  },

  {
    id: "jour_12",
    dayNumber: 12,
    title: "Jour 12 — Dérivées et variations",
    mainNotion: "derivees",
    description:
      "Relier signe de la dérivée, variations et extremums.",
    itemIds: [
      "derivee_polynome_001",
      "derivee_piege_composee_001",
      "fonctions_variations_001",
      "fonctions_extremum_001",
      "limites_quotient_001",
      "exp_derivee_001",
      "ln_derivee_001",
    ],
    problemId: "probleme_derivees_variations_001",
  },

  {
    id: "jour_13",
    dayNumber: 13,
    title: "Jour 13 — Suites et limites",
    mainNotion: "suites",
    description:
      "Suites explicites, récurrentes, variations, majoration et limite.",
    itemIds: [
      "suites_calcul_termes_001",
      "suites_variation_001",
      "suites_limite_simple_001",
      "suites_piege_arith_geo_001",
      "limites_infini_001",
      "algo_suite_001",
      "algo_seuil_001",
    ],
    problemId: "probleme_suites_recurrence_001",
  },

  {
    id: "jour_14",
    dayNumber: 14,
    title: "Jour 14 — Sujet express 2",
    mainNotion: "synthese",
    description:
      "Deuxième mini-sujet : fonctions, limites, exponentielle, logarithme et variables aléatoires.",
    itemIds: [
      "fonctions_signe_001",
      "limites_forme_indeterminee_001",
      "exp_equation_001",
      "ln_domaine_001",
      "va_esperance_001",
    ],
    expressSubjectId: "sujet_express_02",
  },

  {
    id: "jour_15",
    dayNumber: 15,
    title: "Jour 15 — Probabilités avancées",
    mainNotion: "probabilites",
    description:
      "Réviser arbres pondérés, indépendance, conditionnement et probabilités totales.",
    itemIds: [
      "proba_conditionnelle_001",
      "proba_totales_001",
      "proba_independance_001",
      "proba_piege_intersection_conditionnelle_001",
      "proba_piege_addition_multiplication_001",
      "va_loi_001",
      "va_esperance_001",
    ],
    problemId: "probleme_probabilites_arbre_001",
  },

  {
    id: "jour_16",
    dayNumber: 16,
    title: "Jour 16 — Exponentielle et logarithme",
    mainNotion: "synthese",
    description:
      "Comparer, résoudre, dériver et éviter les fausses propriétés.",
    itemIds: [
      "exp_equation_001",
      "exp_inequation_001",
      "exp_piege_somme_001",
      "ln_equation_001",
      "ln_domaine_001",
      "ln_piege_somme_001",
      "ln_piege_ln1_001",
    ],
    problemId: "probleme_exponentielle_bac_001",
  },

  {
    id: "jour_17",
    dayNumber: 17,
    title: "Jour 17 — Géométrie et algorithmique",
    mainNotion: "synthese",
    description:
      "Deux chapitres souvent rentables au bac : espace et Python.",
    itemIds: [
      "geo_vecteurs_001",
      "geo_produit_scalaire_001",
      "geo_representation_parametrique_001",
      "algo_for_001",
      "algo_while_001",
      "algo_seuil_001",
      "algo_piege_initialisation_001",
    ],
    problemId: "probleme_geometrie_espace_001",
  },

  {
    id: "jour_18",
    dayNumber: 18,
    title: "Jour 18 — Gros rappels pièges",
    mainNotion: "synthese",
    description:
      "Revoir les pièges classiques qui coûtent des points.",
    itemIds: [
      "derivee_piege_constante_e_001",
      "derivee_piege_composee_001",
      "suites_piege_u0_u1_001",
      "suites_piege_arith_geo_001",
      "proba_piege_intersection_conditionnelle_001",
      "exp_piege_e0_001",
      "ln_piege_somme_001",
      "limites_piege_valeur_interdite_001",
    ],
    problemId: "probleme_synthese_pieges_001",
  },

  {
    id: "jour_19",
    dayNumber: 19,
    title: "Jour 19 — Sujet type bac guidé",
    mainNotion: "synthese",
    description:
      "Sujet guidé avec plusieurs thèmes : lire, choisir une méthode, rédiger.",
    itemIds: [
      "derivee_polynome_001",
      "suites_variation_001",
      "proba_totales_001",
      "limites_quotient_001",
      "exp_limite_001",
      "ln_domaine_001",
    ],
    problemId: "probleme_synthese_bac_001",
  },

  {
    id: "jour_20",
    dayNumber: 20,
    title: "Jour 20 — Sujet express chronométré",
    mainNotion: "synthese",
    description:
      "Dernier entraînement court avant le bilan final.",
    itemIds: [
      "suites_limite_simple_001",
      "derivee_piege_composee_001",
      "proba_conditionnelle_001",
      "va_esperance_001",
      "geo_orthogonalite_001",
      "algo_seuil_001",
    ],
    expressSubjectId: "sujet_express_03",
  },

  {
    id: "jour_21",
    dayNumber: 21,
    title: "Jour 21 — Grand bilan final",
    mainNotion: "synthese",
    description:
      "Bilan final : automatismes, pièges et mini-sujet de synthèse.",
    itemIds: [
      "derivee_affine_001",
      "derivee_piege_constante_e_001",
      "suites_piege_arith_geo_001",
      "proba_piege_intersection_conditionnelle_001",
      "exp_piege_e0_001",
      "ln_piege_somme_001",
      "geo_produit_scalaire_001",
      "algo_piege_initialisation_001",
    ],
    expressSubjectId: "sujet_express_final",
  },
];