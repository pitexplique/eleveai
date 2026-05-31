// lib/calcul-rapide/data/5e/calculs.fixed.ts

import type { CalculRapideItem } from "../../types";

export const calculsFixed5e: CalculRapideItem[] = [
  // ============================================================
  // SEMAINE MESURES
  // ============================================================

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
    explanation: "4,5 × 1000 = 4500 m.",
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
    explanation: "750 ÷ 1000 = 0,75 kg.",
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
    explanation: "2,5 × 100 = 250 cL.",
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
    explanation: "2 h = 120 min puis 120 + 15 = 135 min.",
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
    explanation: "80 × 2 = 160 km.",
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
    explanation: "7 × 6 = 42 m².",
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
    explanation: "0,75 × 1000 = 750 mL.",
    tags: ["volume", "contenance"],
  },

  // ============================================================
  // SEMAINE RELATIFS
  // ============================================================

  {
    id: "5e_calcul_relatif_comparer_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "nombres_relatifs",
    microId: "relatifs_comparer",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "Quel nombre est le plus grand : -3 ou 2 ?",
    },
    expected: ["2"],
    hint: "Un nombre positif est plus grand qu’un nombre négatif.",
    explanation: "2 est positif, -3 est négatif. Donc 2 est le plus grand.",
    tags: ["relatifs", "comparer"],
  },

  {
    id: "5e_calcul_relatif_comparer_002",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "nombres_relatifs",
    microId: "relatifs_comparer",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "Quel nombre est le plus grand : -7 ou -2 ?",
    },
    expected: ["-2"],
    hint: "Entre deux nombres négatifs, le plus grand est le plus proche de 0.",
    explanation: "-2 est plus proche de 0 que -7. Donc -2 est le plus grand.",
    tags: ["relatifs", "comparer"],
  },

  {
    id: "5e_calcul_relatif_addition_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "operations_relatifs",
    microId: "relatifs_additionner",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "-4 + 9 = ?",
    },
    expected: ["5"],
    hint: "Tu pars de -4 et tu avances de 9.",
    explanation: "-4 + 9 = 5.",
    tags: ["relatifs", "addition"],
  },

  {
    id: "5e_calcul_relatif_addition_002",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "operations_relatifs",
    microId: "relatifs_additionner",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "-6 + (-3) = ?",
    },
    expected: ["-9"],
    hint: "Deux pertes s’additionnent.",
    explanation: "-6 + (-3) = -9.",
    tags: ["relatifs", "addition"],
  },

  {
    id: "5e_calcul_relatif_soustraction_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "operations_relatifs",
    microId: "relatifs_soustraire",
    difficulty: 3,
    durationSec: 20,
    media: {
      text: "5 - 8 = ?",
    },
    expected: ["-3"],
    hint: "Si tu enlèves plus que ce que tu as, tu passes sous 0.",
    explanation: "5 - 8 = -3.",
    tags: ["relatifs", "soustraction"],
  },

  {
    id: "5e_calcul_relatif_soustraction_002",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "operations_relatifs",
    microId: "relatifs_soustraire",
    difficulty: 3,
    durationSec: 20,
    media: {
      text: "4 - (-6) = ?",
    },
    expected: ["10"],
    hint: "Soustraire un négatif revient à ajouter.",
    explanation: "4 - (-6) = 4 + 6 = 10.",
    tags: ["relatifs", "soustraction"],
  },

  {
    id: "5e_calcul_relatif_oppose_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "nombres_relatifs",
    microId: "relatifs_oppose",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "Quel est l’opposé de -8 ?",
    },
    expected: ["8"],
    hint: "L’opposé a le signe contraire.",
    explanation: "L’opposé de -8 est 8.",
    tags: ["relatifs", "oppose"],
  },

  {
    id: "5e_calcul_relatif_distance_zero_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "nombres_relatifs",
    microId: "relatifs_distance_zero",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "Quelle est la distance à zéro de -12 ?",
    },
    expected: ["12"],
    hint: "La distance à zéro est toujours positive.",
    explanation: "La distance à zéro de -12 est 12.",
    tags: ["relatifs", "distance_zero"],
  },
  // ============================================================
  // SEMAINE 20 - FRACTIONS ET PROPORTIONS
  // ============================================================

  {
    id: "5e_calcul_fraction_simplifier_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "fractions",
    microId: "simplifier_fraction",
    difficulty: 3,
    durationSec: 20,
    media: { text: "Simplifie 18/24." },
    expected: ["3/4"],
    hint: "18 et 24 sont divisibles par 6.",
    explanation: "18/24 = 3/4.",
    tags: ["fractions", "simplifier"],
  },

  {
    id: "5e_calcul_proportion_001",
    niveau: "5e",
    type: "calcul",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "coefficient",
    difficulty: 3,
    durationSec: 20,
    media: { text: "4 cahiers coutent 6 euros. Combien coutent 10 cahiers ?" },
    expected: ["15", "15 euros"],
    hint: "10 cahiers, c'est 2,5 fois 4 cahiers.",
    explanation: "6 x 2,5 = 15 euros.",
    tags: ["proportionnalite", "prix"],
  },
];
