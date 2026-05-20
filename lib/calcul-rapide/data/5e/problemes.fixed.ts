// lib/calcul-rapide/data/5e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed5e: CalculRapideItem[] = [
  // ============================================================
  // SEMAINE MESURES
  // ============================================================

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
    explanation: "7,5 × 1000 = 7500 m.",
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
    explanation: "1,25 L = 125 cL. Puis 125 ÷ 25 = 5 verres.",
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
    explanation: "90 × 3 = 270 km.",
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
    explanation: "7 × 4 = 28 m².",
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
    explanation: "2,5 × 1000 = 2500 g.",
    tags: ["masse", "reunion"],
  },

  // ============================================================
  // SEMAINE RELATIFS
  // ============================================================

  {
    id: "5e_probleme_relatif_temperature_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "nombres_relatifs",
    microId: "relatifs_additionner",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Au volcan, il fait -2 °C le matin. La température augmente de 7 °C. Quelle est la nouvelle température ?",
    },
    expected: ["5", "5°C", "5 °C"],
    hint: "On calcule -2 + 7.",
    explanation: "-2 + 7 = 5. La nouvelle température est 5 °C.",
    tags: ["relatifs", "temperature", "reunion"],
  },

  {
    id: "5e_probleme_relatif_plongee_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "nombres_relatifs",
    microId: "relatifs_soustraire",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un plongeur est à -6 m. Il descend encore de 4 m. À quelle profondeur est-il ?",
    },
    expected: ["-10", "-10 m"],
    hint: "Descendre signifie ajouter une valeur négative.",
    explanation: "-6 - 4 = -10. Le plongeur est à -10 m.",
    tags: ["relatifs", "profondeur"],
  },

  {
    id: "5e_probleme_relatif_score_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "operations_relatifs",
    microId: "relatifs_additionner",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Dans un jeu, Lina a -5 points puis gagne 12 points. Quel est son score ?",
    },
    expected: ["7"],
    hint: "On calcule -5 + 12.",
    explanation: "-5 + 12 = 7.",
    tags: ["relatifs", "score"],
  },

  {
    id: "5e_probleme_relatif_ecart_temperature_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "nombres_relatifs",
    microId: "relatifs_distance_zero",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Il fait -3 °C à un endroit et 4 °C à un autre. Quel est l’écart de température ?",
    },
    expected: ["7", "7°C", "7 °C"],
    hint: "Compte la distance entre -3 et 4.",
    explanation: "De -3 à 0 il y a 3 degrés, puis de 0 à 4 il y a 4 degrés. L’écart est 7 °C.",
    tags: ["relatifs", "temperature", "ecart"],
  },
];