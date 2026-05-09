// lib/calcul-rapide/data/5e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed5e: CalculRapideItem[] = [
  {
    id: "5e_probleme_randonnee_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une randonnée à Mafate mesure 7,5 km. Combien cela représente-t-il en mètres ?",
    },
    expected: ["7500"],
    hint: "1 km = 1000 m.",
    explanation:
      "7,5 × 1000 = 7500 m.",
    tags: ["longueur", "reunion", "randonnee"],
  },

  {
    id: "5e_probleme_jus_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_contenance",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une bouteille contient 1,25 L de jus. On remplit des verres de 25 cL. Combien peut-on remplir de verres ?",
    },
    expected: ["5"],
    hint: "Transforme 1,25 L en cL.",
    explanation:
      "1,25 L = 125 cL. Puis 125 ÷ 25 = 5 verres.",
    tags: ["contenance", "division"],
  },

  {
    id: "5e_probleme_vitesse_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "vitesse_simple",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une voiture roule à 90 km/h pendant 3 heures. Quelle distance parcourt-elle ?",
    },
    expected: ["270", "270 km"],
    hint: "Distance = vitesse × temps.",
    explanation:
      "90 × 3 = 270 km.",
    tags: ["vitesse", "distance"],
  },

  {
    id: "5e_probleme_aire_chambre_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une chambre mesure 7 m de longueur et 4 m de largeur. Quelle est son aire ?",
    },
    expected: ["28", "28 m²", "28 m2"],
    hint: "Aire = longueur × largeur.",
    explanation:
      "7 × 4 = 28 m².",
    tags: ["aire", "rectangle"],
  },

  {
    id: "5e_probleme_poisson_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_masse",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Au marché du Port, un pêcheur vend 2,5 kg de poisson. Quelle est cette masse en grammes ?",
    },
    expected: ["2500"],
    hint: "1 kg = 1000 g.",
    explanation:
      "2,5 × 1000 = 2500 g.",
    tags: ["masse", "reunion"],
  },
];