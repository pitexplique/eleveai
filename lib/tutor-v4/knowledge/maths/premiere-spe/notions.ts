// knowledge/maths/premiere-spe/notions.ts
//
// Notions (chapitres) de la spécialité mathématiques de Première générale.
// Strictement alignées sur le BO — rien hors programme.
//
// Organisation :
// - Algèbre        : suites numériques ; second degré
// - Analyse        : dérivation ; variations & courbes ; exponentielle ; trigonométrie
// - Géométrie      : produit scalaire ; géométrie repérée
// - Probabilités   : probabilités conditionnelles ; variables aléatoires
// - Algorithmique  : listes, boucles, fonctions, seuils (Python)
// - Logique        : vocabulaire ensembliste, implication, quantificateurs
//
// La partie logique est transversale dans le BO (« il importe d'y travailler
// d'abord dans des contextes où ils se présentent naturellement »). On en fait
// tout de même une notion : sans elle, aucune capacité attendue de cette
// section n'est travaillée ni suivie.

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

  // ⭐ LA DÉRIVATION EN QUATRE NOTIONS (28/09/2026, décision de Frédéric) —
  // comme en première, où le chapitre est déjà coupé fin. C'était une seule
  // notion de 12 micros : une séance qui ne finit pas. Le signe de f′ et le
  // tableau de variations n'y sont pas : ils sont dans « Variations et courbes ».
  // La fiche de cours reste UNE (`derivation`) : alias dans lib/fiches/registre.ts.
  {
    id: "derivation_nombre_derive",
    label: "Dérivée — taux de variation et nombre dérivé",
    boId: "BOPSAN",
    prerequis: ["second_degre"],
    levels: [1, 2, 3],
  },
  {
    id: "derivation_tangente",
    label: "Dérivée — tangente et lecture graphique",
    boId: "BOPSAN",
    prerequis: ["derivation_nombre_derive"],
    levels: [1, 2, 3],
  },
  {
    id: "derivation_formules",
    label: "Dérivée — les formules de base",
    boId: "BOPSAN",
    prerequis: ["derivation_nombre_derive"],
    levels: [1, 2, 3],
  },
  {
    id: "derivation_operations",
    label: "Dérivée — somme, produit, quotient",
    boId: "BOPSAN",
    prerequis: ["derivation_formules"],
    levels: [1, 2, 3],
  },
  {
    id: "variations_fonctions",
    label: "Variations et courbes des fonctions",
    boId: "BOPSAN",
    prerequis: ["derivation_operations"],
    levels: [1, 2, 3],
  },
  {
    id: "exponentielle",
    label: "Fonction exponentielle",
    boId: "BOPSAN",
    prerequis: ["derivation_operations"],
    levels: [1, 2, 3],
  },
  {
    id: "trigonometrie",
    // 26/09/2026 — « Trigonométrie », le titre du BO 2026 (Frédéric). Le BO
    // ne parle plus de FONCTIONS cosinus et sinus ; parité, périodicité et
    // courbes restent pourtant servies, par décision de Frédéric le même jour.
    label: "Trigonométrie",
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

  /* ================= VOCABULAIRE ENSEMBLISTE ET LOGIQUE ================= */

  {
    id: "logique_ensembles",
    label: "Vocabulaire ensembliste et logique",
    boId: "BOPSVL",
    prerequis: [],
    levels: [1, 2, 3],
  },
];
