// lib/calcul-rapide/data/3e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed3e: CalculRapideItem[] = [
  // 🔵 RÉACTIVATION collège

  {
    id: "3e_probleme_randonnee_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une randonnée mesure 12,5 km. Combien cela représente-t-il en mètres ?",
    },
    expected: ["12500"],
    hint: "1 km = 1000 m.",
    explanation:
      "12,5 × 1000 = 12500 m.",
    tags: ["conversion", "longueur", "reactivation"],
  },

  // 🔴 Vitesses

  {
    id: "3e_probleme_vitesse_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "vitesse_moyenne",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une voiture roule à 110 km/h pendant 2 h 30. Quelle distance parcourt-elle ?",
    },
    expected: ["275", "275 km"],
    hint: "2 h 30 = 2,5 h.",
    explanation:
      "110 × 2,5 = 275 km.",
    tags: ["vitesse", "distance"],
  },

  {
    id: "3e_probleme_vitesse_002",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "vitesse_moyenne",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un train parcourt 360 km en 4 h. Quelle est sa vitesse moyenne ?",
    },
    expected: ["90", "90 km/h", "90km/h"],
    hint: "Vitesse = distance ÷ temps.",
    explanation:
      "360 ÷ 4 = 90 km/h.",
    tags: ["vitesse"],
  },

  // 🔴 Aires et volumes

  {
    id: "3e_probleme_aire_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une terrasse mesure 18 m de longueur et 6 m de largeur. Quelle est son aire ?",
    },
    expected: ["108", "108 m²", "108 m2"],
    hint: "Aire = longueur × largeur.",
    explanation:
      "18 × 6 = 108 m².",
    tags: ["aire", "rectangle"],
  },

  {
    id: "3e_probleme_volume_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "volumes",
    microId: "volume_contenance",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une cuve contient 2,4 L d’eau. On ajoute 600 mL. Quel volume contient-elle maintenant ?",
    },
    expected: ["3", "3 L", "3.0", "3,0"],
    hint: "Transforme 600 mL en litres.",
    explanation:
      "600 mL = 0,6 L puis 2,4 + 0,6 = 3 L.",
    tags: ["volume", "contenance"],
  },

  // 🔴 Piège brevet

  {
    id: "3e_probleme_piege_aire_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_unites",
    difficulty: 4,
    durationSec: 60,
    media: {
      text: "Un élève écrit : “l’aire d’un rectangle de 8 cm sur 5 cm vaut 40 cm”. A-t-il raison ?",
    },
    expected: ["non"],
    hint: "Attention à l’unité d’aire.",
    explanation:
      "Le calcul est correct mais l’unité est fausse. L’aire vaut 40 cm².",
    tags: ["aire", "piege", "brevet"],
  },

  // 🔴 Réactivation Pythagore

  {
    id: "3e_probleme_pythagore_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "pythagore",
    microId: "pythagore_calcul",
    difficulty: 4,
    durationSec: 60,
    media: {
      text: "Dans un triangle rectangle, les deux côtés de l’angle droit mesurent 9 cm et 12 cm. Quelle est l’hypoténuse ?",
    },
    expected: ["15", "15 cm", "15cm"],
    hint: "Utilise le théorème de Pythagore.",
    explanation:
      "9² + 12² = 81 + 144 = 225 donc l’hypoténuse mesure √225 = 15 cm.",
    tags: ["pythagore", "triangle-rectangle"],
  },
];