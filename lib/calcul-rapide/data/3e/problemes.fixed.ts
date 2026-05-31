// lib/calcul-rapide/data/3e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed3e: CalculRapideItem[] = [
  {
    id: "3e_probleme_puissance_bacteries_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "puissances",
    microId: "puissance_calculer",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une population de bactéries double 5 fois. Par quel nombre est-elle multipliée ?",
    },
    expected: ["32"],
    hint: "Doubler 5 fois revient à calculer 2⁵.",
    explanation: "2⁵ = 32. La population est multipliée par 32.",
    tags: ["puissances", "svt"],
  },

  {
    id: "3e_probleme_scientifique_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "puissances",
    microId: "ecriture_scientifique",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un fichier pèse 4 × 10³ ko. Combien cela fait-il de ko ?",
    },
    expected: ["4000", "4 000"],
    hint: "10³ = 1000.",
    explanation: "4 × 10³ = 4 × 1000 = 4000 ko.",
    tags: ["puissances", "numerique"],
  },

  {
    id: "3e_probleme_racine_carre_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "racines_carrees",
    microId: "racine_carree_simple",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "L’aire d’un carré est 64 cm². Quelle est la longueur de son côté ?",
    },
    expected: ["8", "8 cm"],
    hint: "Le côté du carré est la racine carrée de l’aire.",
    explanation: "√64 = 8. Le côté mesure 8 cm.",
    tags: ["racine_carree", "aire"],
  },

  {
    id: "3e_probleme_pythagore_racine_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "pythagore",
    microId: "pythagore_racine",
    difficulty: 4,
    durationSec: 60,
    media: {
      text: "Dans un triangle rectangle, l’hypoténuse vérifie c² = 169. Quelle est la longueur c ?",
    },
    expected: ["13", "13 cm"],
    hint: "Cherche √169.",
    explanation: "c² = 169 donc c = √169 = 13.",
    tags: ["pythagore", "racine_carree"],
  },

  {
    id: "3e_probleme_puissance_10_distance_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "puissances",
    microId: "puissance_10",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une distance vaut 7 × 10⁵ m. Écris cette distance en mètres.",
    },
    expected: ["700000", "700 000"],
    hint: "10⁵ = 100000.",
    explanation: "7 × 10⁵ = 700000 m.",
    tags: ["puissances", "distance"],
  },
  // ============================================================
  // SEMAINE 20 - EQUATIONS ET FONCTIONS AFFINES
  // ============================================================

  {
    id: "3e_probleme_fonction_tarif_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "fonctions",
    microId: "fonction_affine_tarif",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un taxi coute 4 euros au depart puis 2 euros par km. Quel prix pour 7 km ?",
    },
    expected: ["18", "18 euros"],
    hint: "Calcule 4 + 2 x 7.",
    explanation: "4 + 2 x 7 = 18 euros.",
    tags: ["fonction", "affine", "tarif"],
  },
];
