// lib/calcul-rapide/data/4e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed4e: CalculRapideItem[] = [
  // 🔵 RÉACTIVATION conversions

  {
    id: "4e_probleme_randonnee_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une randonnée à Cilaos mesure 8,5 km. Combien cela représente-t-il en mètres ?",
    },
    expected: ["8500"],
    hint: "1 km = 1000 m.",
    explanation:
      "8,5 × 1000 = 8500 m.",
    tags: ["conversion", "longueur", "reunion"],
  },

  {
    id: "4e_probleme_volume_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "volumes",
    microId: "volume_contenance",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une cuve contient 1,5 L d’eau. On ajoute 750 mL. Quel volume d’eau contient-elle maintenant ?",
    },
    expected: ["2,25", "2.25", "2,25 L", "2.25 L"],
    hint: "Transforme tout dans la même unité.",
    explanation:
      "750 mL = 0,75 L. Donc 1,5 + 0,75 = 2,25 L.",
    tags: ["volume", "contenance"],
  },

  // 🔴 Vitesses

  {
    id: "4e_probleme_vitesse_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "vitesse_simple",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une voiture roule à 72 km/h pendant 2 h 30. Quelle distance parcourt-elle ?",
    },
    expected: ["180", "180 km"],
    hint: "2 h 30 = 2,5 h.",
    explanation:
      "72 × 2,5 = 180 km.",
    tags: ["vitesse", "distance"],
  },

  {
    id: "4e_probleme_vitesse_002",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "vitesse_simple",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un coureur parcourt 18 km en 2 heures. Quelle est sa vitesse moyenne ?",
    },
    expected: ["9", "9 km/h", "9km/h"],
    hint: "Vitesse = distance ÷ temps.",
    explanation:
      "18 ÷ 2 = 9 km/h.",
    tags: ["vitesse", "sport"],
  },

  // 🔴 Aires

  {
    id: "4e_probleme_aire_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une terrasse mesure 12 m de longueur et 5 m de largeur. Quelle est son aire ?",
    },
    expected: ["60", "60 m²", "60 m2"],
    hint: "Aire = longueur × largeur.",
    explanation:
      "12 × 5 = 60 m².",
    tags: ["aire", "rectangle"],
  },

  // 🔴 Piège cognitif

  {
    id: "4e_probleme_piege_aire_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_unites",
    difficulty: 4,
    durationSec: 60,
    media: {
      text: "Un rectangle mesure 8 cm sur 6 cm. Un élève répond : “l’aire vaut 48 cm”. A-t-il raison ?",
    },
    expected: ["non"],
    hint: "Une aire ne s’exprime pas en cm.",
    explanation:
      "8 × 6 = 48 mais l’unité correcte est cm². L’aire vaut donc 48 cm².",
    tags: ["aire", "piege", "unites"],
  },

  // 🔴 Réactivation Pythagore

  {
    id: "4e_probleme_pythagore_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "pythagore",
    microId: "pythagore_calcul",
    difficulty: 4,
    durationSec: 60,
    media: {
      text: "Dans un triangle rectangle, les deux côtés de l’angle droit mesurent 6 cm et 8 cm. Quelle est la longueur de l’hypoténuse ?",
    },
    expected: ["10", "10 cm", "10cm"],
    hint: "Utilise le théorème de Pythagore.",
    explanation:
      "6² + 8² = 36 + 64 = 100 donc l’hypoténuse mesure √100 = 10 cm.",
    tags: ["pythagore", "triangle-rectangle"],
  },
];