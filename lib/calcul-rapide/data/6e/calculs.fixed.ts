// lib/calcul-rapide/data/6e/calculs.fixed.ts

import type { CalculRapideItem } from "../../types";

export const calculsFixed6e: CalculRapideItem[] = [
  {
    id: "6e_calcul_decimal_soustraction_002",
    niveau: "6e",
    type: "calcul",
    mode: "fixed",
    notionId: "decimaux",
    microId: "decimal_soustraction",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "31,2 - 6,8",
    },
    expected: ["24,4", "24.4"],
    hint: "Enlève 7 puis ajoute 0,2.",
    explanation:
      "31,2 - 6,8 = 31,2 - 7 + 0,2 = 24,2 + 0,2 = 24,4.",
    tags: ["decimaux", "soustraction", "astuce"],
  },

  {
    id: "6e_calcul_pourcentage_002",
    niveau: "6e",
    type: "calcul",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "pourcentage_simple",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "25 % de 180",
    },
    expected: ["45"],
    hint: "25 %, c’est un quart.",
    explanation:
      "180 ÷ 4 = 45.",
    tags: ["pourcentage", "quart"],
  },

  {
    id: "6e_calcul_division_euclidienne_002",
    niveau: "6e",
    type: "calcul",
    mode: "fixed",
    notionId: "division",
    microId: "division_quotient",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "87 ÷ 5 (quotient ?)",
    },
    expected: ["17"],
    hint: "5 × 17 = ?",
    explanation:
      "5 × 17 = 85, reste 2 → quotient = 17.",
    tags: ["division"],
  },

  {
    id: "6e_calcul_diviser_100_002",
    niveau: "6e",
    type: "calcul",
    mode: "fixed",
    notionId: "decimaux",
    microId: "decimal_diviser_10_100_1000",
    difficulty: 1,
    durationSec: 20,
    media: {
      text: "742,5 ÷ 100",
    },
    expected: ["7,425", "7.425"],
    hint: "Décale la virgule de 2 rangs.",
    explanation:
      "742,5 → 7,425.",
    tags: ["decimaux"],
  },

  {
    id: "6e_calcul_decimal_multiplication_002",
    niveau: "6e",
    type: "calcul",
    mode: "fixed",
    notionId: "decimaux",
    microId: "decimal_multiplier",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "0,4 × 15",
    },
    expected: ["6"],
    hint: "4 × 15 = 60 puis ÷10.",
    explanation:
      "0,4 × 15 = 6.",
    tags: ["decimaux"],
  },

  {
    id: "6e_calcul_mental_facile_002",
    niveau: "6e",
    type: "calcul",
    mode: "fixed",
    notionId: "calcul_mental",
    microId: "addition_mentale",
    difficulty: 1,
    durationSec: 15,
    media: {
      text: "98 + 6",
    },
    expected: ["104"],
    hint: "Fais 100 + 4.",
    explanation:
      "98 + 6 = 100 + 4 = 104.",
    tags: ["calcul-mental"],
  },
];