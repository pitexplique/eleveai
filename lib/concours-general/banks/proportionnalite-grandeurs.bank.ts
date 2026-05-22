// lib/concours-general/banks/proportionnalite-grandeurs.bank.ts

import type { ConcoursGeneralItem } from "../types";

export const proportionnaliteGrandeursBank: ConcoursGeneralItem[] = [
  {
    id: "cg_prop_001_prix_kg",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "proportionnalite_grandeurs",
    difficulty: 3,

    title: "Prix au kilo",

    statement:
      "Au marché, 3 kg de mangues coûtent 12 €.",

    question: "Combien coûtent 5 kg de mangues au même prix au kilo ?",

    format: "short",
    expected: ["20", "20€", "20 €"],

    notionIds: ["proportionnalite"],
    microIds: ["prop_coeff", "prop_probleme"],

    hint1: "Cherche le prix de 1 kg.",
    hint2: "3 kg coûtent 12 €, donc 1 kg coûte 4 €.",
    hint3: "Calcule le prix de 5 kg.",

    correction:
      "Si 3 kg coûtent 12 €, alors 1 kg coûte 12 ÷ 3 = 4 €. Donc 5 kg coûtent 5 × 4 = 20 €.",

    redactionAttendue:
      "Le prix d’un kilogramme est 12 ÷ 3 = 4 €. Pour 5 kg, on paie 5 × 4 = 20 €.",

    tags: ["concours_general", "proportionnalite", "prix", "reunion"],
  },

  {
    id: "cg_prop_002_recette",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "proportionnalite_grandeurs",
    difficulty: 3,

    title: "La recette agrandie",

    statement:
      "Pour faire un jus, on utilise 4 citrons pour 6 verres.",

    question: "Combien faut-il de citrons pour 15 verres ?",

    format: "short",
    expected: ["10"],

    notionIds: ["proportionnalite"],
    microIds: ["prop_table", "prop_coeff"],

    hint1: "On cherche un coefficient pour passer de 6 à 15.",
    hint2: "15 est 2,5 fois plus grand que 6.",
    hint3: "Multiplie aussi 4 par 2,5.",

    correction:
      "Pour passer de 6 verres à 15 verres, on multiplie par 2,5. On multiplie donc aussi 4 citrons par 2,5 : 4 × 2,5 = 10.",

    redactionAttendue:
      "Les quantités sont proportionnelles. Comme 15 = 6 × 2,5, il faut 4 × 2,5 = 10 citrons.",

    tags: ["concours_general", "proportionnalite", "recette"],
  },

  {
    id: "cg_prop_003_pourcentage",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "proportionnalite_grandeurs",
    difficulty: 3,

    title: "Réduction",

    statement:
      "Un sac coûte 80 €. Il bénéficie d’une réduction de 25 %.",

    question: "Quel est le nouveau prix ?",

    format: "short",
    expected: ["60", "60€", "60 €"],

    notionIds: ["pourcentages"],
    microIds: ["pourcentage_quantite"],

    hint1: "25 %, c’est un quart.",
    hint2: "Le quart de 80 vaut 20.",
    hint3: "On enlève 20 € au prix initial.",

    correction:
      "25 %, c’est un quart. Le quart de 80 € vaut 20 €. Le nouveau prix est donc 80 - 20 = 60 €.",

    redactionAttendue:
      "25 % de 80 € vaut 20 €. Après réduction, le prix est 80 - 20 = 60 €.",

    tags: ["concours_general", "pourcentage", "reduction"],
  },

  {
    id: "cg_prop_004_vitesse",
    niveauCible: "3e",
    accessibleFrom: "4e",
    theme: "proportionnalite_grandeurs",
    difficulty: 4,

    title: "Distance parcourue",

    statement:
      "Une voiture roule à 72 km/h pendant 2 h 30.",

    question: "Quelle distance parcourt-elle ?",

    format: "short",
    expected: ["180", "180 km"],

    notionIds: ["proportionnalite", "vitesse"],
    microIds: ["vitesse_simple"],

    hint1: "2 h 30 = 2,5 h.",
    hint2: "Distance = vitesse × temps.",
    hint3: "72 × 2,5 = 180.",

    correction:
      "2 h 30 correspond à 2,5 h. La distance vaut donc 72 × 2,5 = 180 km.",

    redactionAttendue:
      "La distance est égale à vitesse × temps. Donc 72 × 2,5 = 180 km.",

    tags: ["concours_general", "vitesse", "distance"],
  },

  {
    id: "cg_prop_005_echelle",
    niveauCible: "3e",
    accessibleFrom: "5e",
    theme: "proportionnalite_grandeurs",
    difficulty: 4,

    title: "Plan de collège",

    statement:
      "Sur un plan, 1 cm représente 4 m dans la réalité. Un couloir mesure 7 cm sur le plan.",

    question: "Quelle est sa longueur réelle ?",

    format: "short",
    expected: ["28", "28 m"],

    notionIds: ["proportionnalite", "echelle"],
    microIds: ["echelle_distance_reelle"],

    hint1: "1 cm représente 4 m.",
    hint2: "7 cm représentent 7 fois plus.",
    hint3: "7 × 4 = 28.",

    correction:
      "Sur le plan, 1 cm représente 4 m. Donc 7 cm représentent 7 × 4 = 28 m.",

    redactionAttendue:
      "La longueur réelle vaut 7 × 4 = 28 m.",

    tags: ["concours_general", "echelle", "proportionnalite"],
  },
];