// lib/calcul-rapide/data/4e/calculs.fixed.ts

import type { CalculRapideItem } from "../../types";

export const calculsFixed4e: CalculRapideItem[] = [
  // 🔵 RÉACTIVATION 5e/6e

  {
    id: "4e_calcul_conversion_longueur_001",
    niveau: "4e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 20,
    media: { text: "3,6 km = ? m" },
    expected: ["3600"],
    hint: "1 km = 1000 m.",
    explanation: "3,6 × 1000 = 3600 m.",
    tags: ["conversion", "longueur", "reactivation"],
  },

  {
    id: "4e_calcul_conversion_masse_001",
    niveau: "4e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_masse",
    difficulty: 2,
    durationSec: 20,
    media: { text: "0,75 kg = ? g" },
    expected: ["750"],
    hint: "1 kg = 1000 g.",
    explanation: "0,75 × 1000 = 750 g.",
    tags: ["conversion", "masse", "reactivation"],
  },

  // 🔴 4e : vitesses et durées

  {
    id: "4e_calcul_vitesse_001",
    niveau: "4e",
    type: "calcul",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "vitesse_simple",
    difficulty: 3,
    durationSec: 20,
    media: { text: "90 km/h pendant 2 h" },
    expected: ["180", "180 km"],
    hint: "Distance = vitesse × temps.",
    explanation: "90 × 2 = 180 km.",
    tags: ["vitesse", "distance"],
  },

  {
    id: "4e_calcul_vitesse_002",
    niveau: "4e",
    type: "calcul",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "vitesse_simple",
    difficulty: 3,
    durationSec: 20,
    media: { text: "72 km/h pendant 3 h" },
    expected: ["216", "216 km"],
    hint: "Multiplie vitesse et durée.",
    explanation: "72 × 3 = 216 km.",
    tags: ["vitesse", "distance"],
  },

  // 🔴 Durées

  {
    id: "4e_calcul_duree_001",
    niveau: "4e",
    type: "calcul",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_duree",
    difficulty: 3,
    durationSec: 20,
    media: { text: "2 h 45 min = ? min" },
    expected: ["165"],
    hint: "2 h = 120 min.",
    explanation: "120 + 45 = 165 min.",
    tags: ["duree"],
  },

  // 🔴 Aires et volumes

  {
    id: "4e_calcul_aire_001",
    niveau: "4e",
    type: "calcul",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    durationSec: 20,
    media: { text: "Aire d’un rectangle de 12 m sur 5 m" },
    expected: ["60", "60 m²", "60 m2"],
    hint: "Aire = longueur × largeur.",
    explanation: "12 × 5 = 60 m².",
    tags: ["aire"],
  },

  {
    id: "4e_calcul_volume_001",
    niveau: "4e",
    type: "calcul",
    mode: "fixed",
    notionId: "volumes",
    microId: "volume_contenance",
    difficulty: 3,
    durationSec: 20,
    media: { text: "1,2 L = ? mL" },
    expected: ["1200"],
    hint: "1 L = 1000 mL.",
    explanation: "1,2 × 1000 = 1200 mL.",
    tags: ["volume", "contenance"],
  },

  // 🔴 Piège cognitif 4e

  {
    id: "4e_calcul_piege_aire_001",
    niveau: "4e",
    type: "calcul",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_unites",
    difficulty: 4,
    durationSec: 20,
    media: { text: "5 cm × 4 cm = ? cm²" },
    expected: ["20", "20 cm²", "20 cm2"],
    hint: "Une aire s’exprime en cm².",
    explanation: "5 × 4 = 20 cm².",
    tags: ["aire", "piege", "unites"],
  },
];