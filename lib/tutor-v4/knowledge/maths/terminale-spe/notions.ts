// knowledge/maths/terminale-spe/notions.ts
//
// Notions de mathématiques pour la classe de Terminale spécialité.
//
// Objectif :
// - alignement avec le programme de spécialité mathématiques terminale ;
// - progression logique pour Tutor V4 ;
// - notions suffisamment larges pour porter les microSkills ;
// - préparation progressive aux exercices type bac.
//
// Organisation :
// - Analyse
// - Algèbre et géométrie
// - Probabilités
// - Algorithmique et programmation

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  /* =========================
     ANALYSE - SUITES ET LIMITES
  ========================= */

  {
    id: "suite_numerique",
    label: "Suites numériques",
    boId: "BOTSA1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "limite_suite",
    label: "Limites de suites",
    boId: "BOTSA1",
    prerequis: ["suite_numerique"],
    levels: [1, 2, 3],
  },

  {
    id: "limite_fonction",
    label: "Limites de fonctions",
    boId: "BOTSA1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "continuite_tvi",
    label: "Continuité et théorème des valeurs intermédiaires",
    boId: "BOTSA2",
    prerequis: ["limite_fonction"],
    levels: [2, 3],
  },

  /* =========================
     ANALYSE - DÉRIVATION ET CONVEXITÉ
  ========================= */

  {
    id: "derivation_fonction",
    label: "Dérivation et variations",
    boId: "BOTSA2",
    prerequis: ["limite_fonction"],
    levels: [1, 2, 3],
  },

  {
    id: "convexite_fonction",
    label: "Convexité",
    boId: "BOTSA2",
    prerequis: ["derivation_fonction"],
    levels: [2, 3],
  },

  /* =========================
     ANALYSE - FONCTIONS USUELLES ET INTÉGRALES
  ========================= */

  {
    id: "fonction_exponentielle",
    label: "Fonction exponentielle",
    boId: "BOTSA3",
    prerequis: ["derivation_fonction"],
    levels: [1, 2, 3],
  },

  {
    id: "fonction_logarithme",
    label: "Fonction logarithme népérien",
    boId: "BOTSA3",
    prerequis: ["fonction_exponentielle"],
    levels: [1, 2, 3],
  },

  {
    id: "primitive_integrale",
    label: "Primitives et intégrales",
    boId: "BOTSA3",
    prerequis: ["derivation_fonction", "fonction_exponentielle", "fonction_logarithme"],
    levels: [1, 2, 3],
  },

  /* =========================
     ALGÈBRE ET GÉOMÉTRIE
  ========================= */

  {
    id: "denombrement_combinatoire",
    label: "Dénombrement et combinatoire",
    boId: "BOTSAG1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "geometrie_espace",
    label: "Géométrie dans l’espace",
    boId: "BOTSAG1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "produit_scalaire_espace",
    label: "Produit scalaire dans l’espace",
    boId: "BOTSAG1",
    prerequis: ["geometrie_espace"],
    levels: [2, 3],
  },

  /* =========================
     PROBABILITÉS
  ========================= */

  {
    id: "probabilite_conditionnelle",
    label: "Probabilités conditionnelles",
    boId: "BOTSP1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "variable_aleatoire",
    label: "Variables aléatoires",
    boId: "BOTSP1",
    prerequis: ["probabilite_conditionnelle"],
    levels: [1, 2, 3],
  },

  {
    id: "loi_binomiale",
    label: "Loi binomiale",
    boId: "BOTSP1",
    prerequis: ["variable_aleatoire", "denombrement_combinatoire"],
    levels: [1, 2, 3],
  },

  /* =========================
     ALGORITHMIQUE
  ========================= */

  {
    id: "algorithmique_python",
    label: "Algorithmique et Python",
    boId: "BOTSI1",
    prerequis: ["suite_numerique"],
    levels: [1, 2, 3],
  },
];