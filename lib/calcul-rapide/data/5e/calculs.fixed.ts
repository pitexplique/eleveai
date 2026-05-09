// lib/calcul-rapide/data/5e/calculs.fixed.ts

import type { CalculRapideItem } from "../../types";

export const calculsFixed5e: CalculRapideItem[] = [
  {
    id: "5e_calcul_longueur_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "4,5 km = ? m",
    },
    expected: ["4500"],
    hint: "1 km = 1000 m.",
    explanation:
      "4,5 × 1000 = 4500 m.",
    tags: ["longueur", "conversion"],
  },

  {
    id: "5e_calcul_masse_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_masse",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "750 g = ? kg",
    },
    expected: ["0,75", "0.75"],
    hint: "1 kg = 1000 g.",
    explanation:
      "750 ÷ 1000 = 0,75 kg.",
    tags: ["masse"],
  },

  {
    id: "5e_calcul_contenance_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_contenance",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "2,5 L = ? cL",
    },
    expected: ["250"],
    hint: "1 L = 100 cL.",
    explanation:
      "2,5 × 100 = 250 cL.",
    tags: ["contenance"],
  },

  {
    id: "5e_calcul_duree_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_duree",
    difficulty: 3,
    durationSec: 20,
    media: {
      text: "2 h 15 min = ? min",
    },
    expected: ["135"],
    hint: "2 h = 120 min.",
    explanation:
      "2 h = 120 min puis 120 + 15 = 135 min.",
    tags: ["duree"],
  },

  {
    id: "5e_calcul_vitesse_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "vitesse_simple",
    difficulty: 3,
    durationSec: 20,
    media: {
      text: "Une voiture roule à 80 km/h pendant 2 h. Quelle distance parcourt-elle ?",
    },
    expected: ["160", "160 km"],
    hint: "Distance = vitesse × temps.",
    explanation:
      "80 × 2 = 160 km.",
    tags: ["vitesse", "distance"],
  },

  {
    id: "5e_calcul_aire_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    durationSec: 20,
    media: {
      text: "Aire d’un rectangle de 7 m sur 6 m",
    },
    expected: ["42", "42 m²", "42 m2"],
    hint: "Aire = longueur × largeur.",
    explanation:
      "7 × 6 = 42 m².",
    tags: ["aire"],
  },

  {
    id: "5e_calcul_volume_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "volumes",
    microId: "volume_contenance",
    difficulty: 3,
    durationSec: 20,
    media: {
      text: "0,75 L = ? mL",
    },
    expected: ["750"],
    hint: "1 L = 1000 mL.",
    explanation:
      "0,75 × 1000 = 750 mL.",
    tags: ["volume", "contenance"],
  },
];
