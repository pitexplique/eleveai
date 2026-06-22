// knowledge/maths/premiere-spe/microSkills.ts
//
// Micro-compétences de la spécialité mathématiques de Première générale.
// Chaque microId est dérivé d'une « capacité attendue » du BO 2019.
// prerequis : uniquement des microId existants (validés au runtime par buildKnowledge).

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  /* ===================== SUITES ===================== */
  {
    id: "suite_termes",
    label: "Calculer les termes d’une suite (explicite ou récurrence)",
    notionId: "suites",
    prerequis: [],
  },
  {
    id: "suite_arithmetique",
    label: "Suites arithmétiques : raison et terme général",
    notionId: "suites",
    prerequis: ["suite_termes"],
  },
  {
    id: "suite_geometrique",
    label: "Suites géométriques : raison et terme général",
    notionId: "suites",
    prerequis: ["suite_termes"],
  },
  {
    id: "suite_variation",
    label: "Étudier le sens de variation d’une suite",
    notionId: "suites",
    prerequis: ["suite_arithmetique", "suite_geometrique"],
  },
  {
    id: "suite_sommes",
    label: "Calculer une somme de termes consécutifs",
    notionId: "suites",
    prerequis: ["suite_arithmetique", "suite_geometrique"],
  },

  /* ===================== SECOND DEGRÉ ===================== */
  {
    id: "sd_discriminant",
    label: "Calculer le discriminant d’un trinôme",
    notionId: "second_degre",
    prerequis: [],
  },
  {
    id: "sd_racines",
    label: "Résoudre une équation du second degré",
    notionId: "second_degre",
    prerequis: ["sd_discriminant"],
  },
  {
    id: "sd_factorisation",
    label: "Factoriser un trinôme (racine évidente, somme/produit)",
    notionId: "second_degre",
    prerequis: ["sd_racines"],
  },
  {
    id: "sd_signe",
    label: "Étudier le signe d’un trinôme",
    notionId: "second_degre",
    prerequis: ["sd_racines"],
  },
  {
    id: "sd_canonique",
    label: "Forme canonique, sommet et axe de symétrie",
    notionId: "second_degre",
    prerequis: ["sd_discriminant"],
  },

  /* ===================== DÉRIVATION ===================== */
  {
    id: "der_taux",
    label: "Taux de variation et nombre dérivé",
    notionId: "derivation",
    prerequis: [],
  },
  {
    id: "der_usuelles",
    label: "Dérivées des fonctions usuelles",
    notionId: "derivation",
    prerequis: ["der_taux"],
  },
  {
    id: "der_operations",
    label: "Dérivée d’une somme, d’un produit, d’un quotient",
    notionId: "derivation",
    prerequis: ["der_usuelles"],
  },
  {
    id: "der_tangente",
    label: "Équation de la tangente en un point",
    notionId: "derivation",
    prerequis: ["der_usuelles"],
  },

  /* ===================== VARIATIONS ET COURBES ===================== */
  {
    id: "var_signe_derivee",
    label: "Lien entre signe de la dérivée et variations",
    notionId: "variations_fonctions",
    prerequis: [],
  },
  {
    id: "var_tableau",
    label: "Dresser un tableau de variations",
    notionId: "variations_fonctions",
    prerequis: ["var_signe_derivee"],
  },
  {
    id: "var_extremum",
    label: "Déterminer un extremum",
    notionId: "variations_fonctions",
    prerequis: ["var_signe_derivee"],
  },
  {
    id: "var_optimisation",
    label: "Résoudre un problème d’optimisation",
    notionId: "variations_fonctions",
    prerequis: ["var_extremum"],
  },

  /* ===================== EXPONENTIELLE ===================== */
  {
    id: "exp_proprietes",
    label: "Propriétés algébriques de l’exponentielle",
    notionId: "exponentielle",
    prerequis: [],
  },
  {
    id: "exp_simplifier",
    label: "Simplifier une expression avec l’exponentielle",
    notionId: "exponentielle",
    prerequis: ["exp_proprietes"],
  },
  {
    id: "exp_derivee",
    label: "Dérivée, signe et variations de l’exponentielle",
    notionId: "exponentielle",
    prerequis: ["exp_proprietes"],
  },
  {
    id: "exp_modelisation",
    label: "Modéliser une croissance ou décroissance exponentielle",
    notionId: "exponentielle",
    prerequis: ["exp_proprietes"],
  },

  /* ===================== TRIGONOMÉTRIE ===================== */
  {
    id: "trig_radian",
    label: "Radian et mesure d’un arc",
    notionId: "trigonometrie",
    prerequis: [],
  },
  {
    id: "trig_valeurs",
    label: "Valeurs remarquables de cosinus et sinus",
    notionId: "trigonometrie",
    prerequis: ["trig_radian"],
  },
  {
    id: "trig_cercle",
    label: "Cercle trigonométrique et placement d’un point",
    notionId: "trigonometrie",
    prerequis: ["trig_radian"],
  },
  {
    id: "trig_angles_associes",
    label: "Angles associés, parité et périodicité",
    notionId: "trigonometrie",
    prerequis: ["trig_valeurs"],
  },

  /* ===================== PRODUIT SCALAIRE ===================== */
  {
    id: "ps_coordonnees",
    label: "Produit scalaire à partir des coordonnées",
    notionId: "produit_scalaire",
    prerequis: [],
  },
  {
    id: "ps_norme_angle",
    label: "Produit scalaire avec normes et angle",
    notionId: "produit_scalaire",
    prerequis: ["ps_coordonnees"],
  },
  {
    id: "ps_orthogonalite",
    label: "Caractériser l’orthogonalité de deux vecteurs",
    notionId: "produit_scalaire",
    prerequis: ["ps_coordonnees"],
  },
  {
    id: "ps_alkashi",
    label: "Calculer une longueur ou un angle (Al-Kashi)",
    notionId: "produit_scalaire",
    prerequis: ["ps_norme_angle"],
  },

  /* ===================== GÉOMÉTRIE REPÉRÉE ===================== */
  {
    id: "gr_vecteur_normal",
    label: "Équation de droite et vecteur normal",
    notionId: "geometrie_reperee",
    prerequis: [],
  },
  {
    id: "gr_cercle",
    label: "Équation d’un cercle : centre et rayon",
    notionId: "geometrie_reperee",
    prerequis: [],
  },
  {
    id: "gr_parabole",
    label: "Axe de symétrie et sommet d’une parabole",
    notionId: "geometrie_reperee",
    prerequis: [],
  },

  /* ===================== PROBABILITÉS CONDITIONNELLES ===================== */
  {
    id: "pc_conditionnelle",
    label: "Calculer une probabilité conditionnelle",
    notionId: "probabilites_conditionnelles",
    prerequis: [],
  },
  {
    id: "pc_arbre",
    label: "Arbre pondéré : règle du produit et de la somme",
    notionId: "probabilites_conditionnelles",
    prerequis: ["pc_conditionnelle"],
  },
  {
    id: "pc_totales",
    label: "Formule des probabilités totales",
    notionId: "probabilites_conditionnelles",
    prerequis: ["pc_arbre"],
  },
  {
    id: "pc_independance",
    label: "Indépendance de deux événements",
    notionId: "probabilites_conditionnelles",
    prerequis: ["pc_conditionnelle"],
  },

  /* ===================== VARIABLES ALÉATOIRES ===================== */
  {
    id: "va_loi",
    label: "Déterminer la loi d’une variable aléatoire",
    notionId: "variables_aleatoires",
    prerequis: [],
  },
  {
    id: "va_esperance",
    label: "Calculer une espérance",
    notionId: "variables_aleatoires",
    prerequis: ["va_loi"],
  },
  {
    id: "va_variance",
    label: "Calculer une variance et un écart-type",
    notionId: "variables_aleatoires",
    prerequis: ["va_esperance"],
  },
  {
    id: "va_notation",
    label: "Interpréter les notations {X = a} et P(X ⩽ a)",
    notionId: "variables_aleatoires",
    prerequis: ["va_loi"],
  },

  /* ===================== ALGORITHMIQUE ===================== */
  {
    id: "algo_listes",
    label: "Générer et parcourir une liste",
    notionId: "algorithmique",
    prerequis: [],
  },
  {
    id: "algo_boucles",
    label: "Lire et comprendre une boucle",
    notionId: "algorithmique",
    prerequis: ["algo_listes"],
  },
  {
    id: "algo_seuil",
    label: "Recherche de seuil sur une suite",
    notionId: "algorithmique",
    prerequis: ["algo_boucles"],
  },
  {
    id: "algo_fonctions",
    label: "Lire et comprendre une fonction Python",
    notionId: "algorithmique",
    prerequis: ["algo_boucles"],
  },
];
