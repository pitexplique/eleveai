// lib/calcul-rapide/data/6e/calculs.fixed.ts

import type { CalculRapideItem } from "../../types";

export const calculsFixed6e: CalculRapideItem[] = [
  {
    id: "6e_calcul_longueur_001",
    niveau: "6e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 1,
    durationSec: 20,
    media: {
      text: "3,5 m = ? cm",
    },
    expected: ["350"],
    hint: "1 m = 100 cm.",
    explanation:
      "3,5 m = 3,5 × 100 = 350 cm.",
    tags: ["longueur", "conversion"],
  },

  {
    id: "6e_calcul_masse_001",
    niveau: "6e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_masse",
    difficulty: 1,
    durationSec: 20,
    media: {
      text: "2,4 kg = ? g",
    },
    expected: ["2400"],
    hint: "1 kg = 1000 g.",
    explanation:
      "2,4 kg = 2,4 × 1000 = 2400 g.",
    tags: ["masse", "conversion"],
  },

  {
    id: "6e_calcul_contenance_001",
    niveau: "6e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_contenance",
    difficulty: 1,
    durationSec: 20,
    media: {
      text: "450 cL = ? L",
    },
    expected: ["4,5", "4.5"],
    hint: "100 cL = 1 L.",
    explanation:
      "450 cL = 450 ÷ 100 = 4,5 L.",
    tags: ["contenance"],
  },

  {
    id: "6e_calcul_duree_001",
    niveau: "6e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_duree",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "2 h 30 min = ? min",
    },
    expected: ["150"],
    hint: "1 h = 60 min.",
    explanation:
      "2 h = 120 min puis 120 + 30 = 150 min.",
    tags: ["duree"],
  },

  {
    id: "6e_calcul_aire_001",
    niveau: "6e",
    type: "calcul",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "Aire d’un rectangle de 8 m sur 5 m",
    },
    expected: ["40", "40 m²", "40 m2"],
    hint: "Aire = longueur × largeur.",
    explanation:
      "8 × 5 = 40 m².",
    tags: ["aire", "rectangle"],
  },

  {
    id: "6e_calcul_volume_001",
    niveau: "6e",
    type: "calcul",
    mode: "fixed",
    notionId: "volumes",
    microId: "volume_pave",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "1,5 L = ? mL",
    },
    expected: ["1500"],
    hint: "1 L = 1000 mL.",
    explanation:
      "1,5 × 1000 = 1500 mL.",
    tags: ["volume", "contenance"],
  },
];