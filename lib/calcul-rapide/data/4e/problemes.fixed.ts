// lib/calcul-rapide/data/4e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed4e: CalculRapideItem[] = [
  // ============================================================
  // SEMAINE MESURES
  // ============================================================

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
      text: "Une randonnée à Mafate mesure 9,2 km. Combien cela représente-t-il en mètres ?",
    },
    expected: ["9200"],
    hint: "1 km = 1000 m.",
    explanation: "9,2 × 1000 = 9200 m.",
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
      text: "Une cuve contient 2,3 L d’eau. On ajoute 650 mL. Quel volume d’eau contient-elle maintenant ?",
    },
    expected: ["2,95", "2.95", "2,95 L", "2.95 L"],
    hint: "Transforme tout dans la même unité.",
    explanation: "650 mL = 0,65 L. Donc 2,3 + 0,65 = 2,95 L.",
    tags: ["volume", "contenance"],
  },

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
      text: "Une voiture roule à 84 km/h pendant 2 h 30. Quelle distance parcourt-elle ?",
    },
    expected: ["210", "210 km"],
    hint: "2 h 30 = 2,5 h.",
    explanation: "84 × 2,5 = 210 km.",
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
      text: "Un coureur parcourt 24 km en 3 heures. Quelle est sa vitesse moyenne ?",
    },
    expected: ["8", "8 km/h", "8km/h"],
    hint: "Vitesse = distance ÷ temps.",
    explanation: "24 ÷ 3 = 8 km/h.",
    tags: ["vitesse", "sport"],
  },

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
      text: "Une terrasse mesure 15 m de longueur et 4 m de largeur. Quelle est son aire ?",
    },
    expected: ["60", "60 m²", "60 m2"],
    hint: "Aire = longueur × largeur.",
    explanation: "15 × 4 = 60 m².",
    tags: ["aire", "rectangle"],
  },

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
      text: "Un rectangle mesure 9 cm sur 7 cm. Un élève répond : “l’aire vaut 63 cm”. A-t-il raison ?",
    },
    expected: ["non"],
    hint: "Une aire ne s’exprime pas en cm.",
    explanation:
      "9 × 7 = 63 mais l’unité correcte est cm². L’aire vaut donc 63 cm².",
    tags: ["aire", "piege", "unites"],
  },

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
      text: "Dans un triangle rectangle, les deux côtés de l’angle droit mesurent 5 cm et 12 cm. Quelle est la longueur de l’hypoténuse ?",
    },
    expected: ["13", "13 cm", "13cm"],
    hint: "Utilise le théorème de Pythagore.",
    explanation:
      "5² + 12² = 25 + 144 = 169 donc l’hypoténuse mesure √169 = 13 cm.",
    tags: ["pythagore", "triangle-rectangle"],
  },

  // ============================================================
  // SEMAINE 19 - CALCUL LITTÉRAL EXPRESS
  // ============================================================

  {
    id: "4e_probleme_litteral_prix_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "expressions_litterales",
    microId: "litteral_substitution",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un cahier coûte x euros. On achète 4 cahiers et un stylo à 3 €. Si x = 5, quel est le prix total ?",
    },
    expected: ["23", "23€", "23 €"],
    hint: "Le prix total est 4x + 3.",
    explanation: "4x + 3 = 4 × 5 + 3 = 23 €.",
    tags: ["calcul_litteral", "prix", "substitution"],
  },

  {
    id: "4e_probleme_litteral_abonnement_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "expressions_litterales",
    microId: "litteral_substitution",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un abonnement coûte 8 €, puis 4 € par séance. Si on fait 5 séances, combien paie-t-on ?",
    },
    expected: ["28", "28€", "28 €"],
    hint: "Le prix est 8 + 4x.",
    explanation: "Pour 5 séances : 8 + 4 × 5 = 28 €.",
    tags: ["calcul_litteral", "prix", "substitution"],
  },

  {
    id: "4e_probleme_litteral_sacs_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "distributivite",
    microId: "distributivite_developper",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "On a 5 sacs contenant chacun x billes et 4 billes en plus. Quelle expression développée représente le total ?",
    },
    expected: ["5x+20", "5x + 20"],
    hint: "Il y a 5 fois (x + 4).",
    explanation: "5(x + 4) = 5x + 20.",
    tags: ["calcul_litteral", "developper"],
  },

  {
    id: "4e_probleme_litteral_factoriser_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "factorisation",
    microId: "factorisation_facteur_commun",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Factorise le prix total : 8x + 24.",
    },
    expected: ["8(x+3)", "8(x + 3)"],
    hint: "Le facteur commun est 8.",
    explanation: "8x + 24 = 8(x + 3).",
    tags: ["calcul_litteral", "factoriser"],
  },

  {
    id: "4e_probleme_equation_simple_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "equations",
    microId: "equation_simple",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un nombre augmenté de 13 donne 31. Quel est ce nombre ?",
    },
    expected: ["18"],
    hint: "On cherche x tel que x + 13 = 31.",
    explanation: "x + 13 = 31 donc x = 18.",
    tags: ["equation", "calcul_mental"],
  },
  // ============================================================
  // SEMAINE 20 - PYTHAGORE ET GEOMETRIE
  // ============================================================

  {
    id: "4e_probleme_pythagore_echelle_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "pythagore",
    microId: "hypotenuse",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une echelle forme un triangle rectangle avec le mur : 6 m au sol et 8 m de haut. Quelle est la longueur de l'echelle ?",
    },
    expected: ["10", "10 m"],
    hint: "C'est le meme calcul que pour un triangle 6-8-10.",
    explanation: "6 au carre + 8 au carre = 100, donc l'echelle mesure 10 m.",
    tags: ["pythagore", "probleme"],
  },
];
