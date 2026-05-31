// lib/calcul-rapide/data/terminale-spe/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixedTerminaleSpe: CalculRapideItem[] = [
  {
    id: "terminale_spe_probleme_tangente_001",
    niveau: "terminale-spe",
    type: "probleme",
    mode: "fixed",
    notionId: "derivation",
    microId: "tangente_coefficient_directeur",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "On a f'(2)=7. Quel est le coefficient directeur de la tangente à la courbe de f au point d’abscisse 2 ?",
    },
    expected: ["7"],
    hint: "Le coefficient directeur de la tangente en x=a est f'(a).",
    explanation: "Le coefficient directeur de la tangente au point d’abscisse 2 est f'(2), donc 7.",
    tags: ["derivation", "tangente", "bac"],
  },

  {
    id: "terminale_spe_probleme_suite_population_001",
    niveau: "terminale-spe",
    type: "probleme",
    mode: "fixed",
    notionId: "suites",
    microId: "suite_geometrique_modele",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une population vaut 1000 au départ et augmente de 10 % par an. Quelle est la population après 2 ans ?",
    },
    expected: ["1210"],
    hint: "Augmenter de 10 %, c’est multiplier par 1,1.",
    explanation: "Après 2 ans : 1000 × 1,1² = 1210.",
    tags: ["suites", "evolution", "bac"],
  },

  {
    id: "terminale_spe_probleme_exp_croissance_001",
    niveau: "terminale-spe",
    type: "probleme",
    mode: "fixed",
    notionId: "exponentielle",
    microId: "exponentielle_simplifier",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Dans un modèle, on obtient e^{ln(12)}. Quelle est la valeur simplifiée ?",
    },
    expected: ["12"],
    hint: "e^{ln(a)} = a pour a > 0.",
    explanation: "e^{ln(12)} = 12.",
    tags: ["exponentielle", "logarithme", "bac"],
  },

  {
    id: "terminale_spe_probleme_binomiale_001",
    niveau: "terminale-spe",
    type: "probleme",
    mode: "fixed",
    notionId: "probabilites",
    microId: "loi_binomiale_esperance",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un joueur tente 20 lancers avec une probabilité de réussite de 0,25. Quelle est l’espérance du nombre de réussites ?",
    },
    expected: ["5"],
    hint: "On utilise E(X)=np.",
    explanation: "E(X)=20×0,25=5.",
    tags: ["probabilites", "binomiale", "bac"],
  },

  {
    id: "terminale_spe_probleme_variation_001",
    niveau: "terminale-spe",
    type: "probleme",
    mode: "fixed",
    notionId: "variations",
    microId: "signe_derivee",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Sur un intervalle, f'(x) est toujours négative. Quel est le sens de variation de f ?",
    },
    expected: ["décroissante", "decroissante"],
    hint: "Une dérivée négative indique que la fonction descend.",
    explanation: "Si f'(x)<0 sur un intervalle, alors f est décroissante sur cet intervalle.",
    tags: ["variations", "derivee", "bac"],
  },
  // ============================================================
  // SEMAINE 23 - AUTOMATISMES BAC
  // ============================================================

  {
    id: "terminale_spe_probleme_automatisme_proba_001",
    niveau: "terminale-spe",
    type: "probleme",
    mode: "fixed",
    notionId: "probabilites",
    microId: "complementaire",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Un evenement a une probabilite de 0,37. Quelle est la probabilite de l'evenement contraire ?",
    },
    expected: ["0,63", "0.63"],
    hint: "Le total vaut 1.",
    explanation: "1 - 0,37 = 0,63.",
    tags: ["probabilites", "complementaire", "bac"],
  },
];
