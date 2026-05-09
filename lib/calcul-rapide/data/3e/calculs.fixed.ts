// lib/calcul-rapide/data/3e/calculs.fixed.ts

import type { CalculRapideItem } from "../../types";

export const calculsFixed3e: CalculRapideItem[] = [
  // 🔵 RÉACTIVATION collège

  {
    id: "3e_calcul_conversion_longueur_001",
    niveau: "3e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 20,
    media: { text: "4,2 km = ? m" },
    expected: ["4200"],
    hint: "1 km = 1000 m.",
    explanation: "4,2 × 1000 = 4200 m.",
    tags: ["conversion", "longueur", "reactivation"],
  },

  {
    id: "3e_calcul_conversion_masse_001",
    niveau: "3e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_masse",
    difficulty: 2,
    durationSec: 20,
    media: { text: "0,35 kg = ? g" },
    expected: ["350"],
    hint: "1 kg = 1000 g.",
    explanation: "0,35 × 1000 = 350 g.",
    tags: ["conversion", "masse", "reactivation"],
  },

  // 🔴 3e : vitesses et modélisation

  {
    id: "3e_calcul_vitesse_001",
    niveau: "3e",
    type: "calcul",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "vitesse_moyenne",
    difficulty: 3,
    durationSec: 20,
    media: { text: "90 km/h pendant 2,5 h" },
    expected: ["225", "225 km"],
    hint: "Distance = vitesse × temps.",
    explanation: "90 × 2,5 = 225 km.",
    tags: ["vitesse", "distance"],
  },

  {
    id: "3e_calcul_vitesse_002",
    niveau: "3e",
    type: "calcul",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "vitesse_moyenne",
    difficulty: 3,
    durationSec: 20,
    media: { text: "180 km en 3 h" },
    expected: ["60", "60 km/h"],
    hint: "Vitesse = distance ÷ temps.",
    explanation: "180 ÷ 3 = 60 km/h.",
    tags: ["vitesse"],
  },

  // 🔴 Durées

  {
    id: "3e_calcul_duree_001",
    niveau: "3e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_duree",
    difficulty: 3,
    durationSec: 20,
    media: { text: "3 h 20 min = ? min" },
    expected: ["200"],
    hint: "3 h = 180 min.",
    explanation: "180 + 20 = 200 min.",
    tags: ["duree"],
  },

  // 🔴 Aires et volumes

  {
    id: "3e_calcul_aire_001",
    niveau: "3e",
    type: "calcul",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    durationSec: 20,
    media: { text: "Aire d’un rectangle de 15 m sur 8 m" },
    expected: ["120", "120 m²", "120 m2"],
    hint: "Aire = longueur × largeur.",
    explanation: "15 × 8 = 120 m².",
    tags: ["aire"],
  },

  {
    id: "3e_calcul_volume_001",
    niveau: "3e",
    type: "calcul",
    mode: "fixed",
    notionId: "volumes",
    microId: "volume_contenance",
    difficulty: 3,
    durationSec: 20,
    media: { text: "2,4 L = ? mL" },
    expected: ["2400"],
    hint: "1 L = 1000 mL.",
    explanation: "2,4 × 1000 = 2400 mL.",
    tags: ["volume", "contenance"],
  },

  // 🔴 Piège cognitif brevet

  {
    id: "3e_calcul_piege_aire_001",
    niveau: "3e",
    type: "calcul",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_unites",
    difficulty: 4,
    durationSec: 20,
    media: { text: "6 cm × 5 cm = ? cm²" },
    expected: ["30", "30 cm²", "30 cm2"],
    hint: "Attention à l’unité.",
    explanation: "6 × 5 = 30 cm².",
    tags: ["aire", "piege", "brevet"],
  },
];