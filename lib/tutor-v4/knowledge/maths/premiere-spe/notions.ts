// knowledge/maths/premiere-spe/notions.ts
//
// Notions (chapitres) de la spécialité mathématiques de Première générale.
// Strictement alignées sur le BO 2019 — rien hors programme.
//
// Organisation :
// - Algèbre        : suites numériques ; second degré
// - Analyse        : dérivation ; variations & courbes ; exponentielle ; trigonométrie
// - Géométrie      : produit scalaire ; géométrie repérée
// - Probabilités   : probabilités conditionnelles ; variables aléatoires
// - Algorithmique  : listes, boucles, fonctions, seuils (Python)

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  /* ========================= ALGÈBRE ========================= */

  {
    id: "suites",
    label: "Suites numériques",
    boId: "BOPSAL",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "second_degre",
    label: "Second degré",
    boId: "BOPSAL",
    prerequis: [],
    levels: [1, 2, 3],
  },

  /* ========================= ANALYSE ========================= */

  {
    id: "derivation",
    label: "Dérivation",
    boId: "BOPSAN",
    prerequis: ["second_degre"],
    levels: [1, 2, 3],
  },
  {
    id: "variations_fonctions",
    label: "Variations et courbes des fonctions",
    boId: "BOPSAN",
    prerequis: ["derivation"],
    levels: [1, 2, 3],
  },
  {
    id: "exponentielle",
    label: "Fonction exponentielle",
    boId: "BOPSAN",
    prerequis: ["derivation"],
    levels: [1, 2, 3],
  },
  {
    id: "trigonometrie",
    label: "Fonctions trigonométriques",
    boId: "BOPSAN",
    prerequis: [],
    levels: [1, 2, 3],
  },

  /* ========================= GÉOMÉTRIE ========================= */

  {
    id: "produit_scalaire",
    label: "Calcul vectoriel et produit scalaire",
    boId: "BOPSGE",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "geometrie_reperee",
    label: "Géométrie repérée",
    boId: "BOPSGE",
    prerequis: ["produit_scalaire"],
    levels: [1, 2, 3],
  },

  /* ================= PROBABILITÉS ET STATISTIQUES ================= */

  {
    id: "probabilites_conditionnelles",
    label: "Probabilités conditionnelles et indépendance",
    boId: "BOPSPR",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "variables_aleatoires",
    label: "Variables aléatoires réelles",
    boId: "BOPSPR",
    prerequis: ["probabilites_conditionnelles"],
    levels: [1, 2, 3],
  },

  /* ================= ALGORITHMIQUE ET PROGRAMMATION ================= */

  {
    id: "algorithmique",
    label: "Algorithmique et programmation",
    boId: "BOPSAP",
    prerequis: ["suites"],
    levels: [1, 2, 3],
  },
];
