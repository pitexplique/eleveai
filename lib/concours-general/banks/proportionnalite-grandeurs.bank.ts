// lib/concours-general/banks/proportionnalite-grandeurs.bank.ts

import type { ConcoursGeneralItem } from "../types";

export const proportionnaliteGrandeursBank: ConcoursGeneralItem[] = [
  {
    id: "cg_prop_001_pourcentage_inverse",
    niveauCible: "3e",
    accessibleFrom: "4e",
    theme: "proportionnalite_grandeurs",
    difficulty: 4,

    title: "Le prix avant réduction",

    statement:
      "Un vélo est vendu 360 € après une réduction de 20 %.",

    question:
      "Quel était le prix du vélo avant la réduction ?",

    format: "short",
    expected: ["450"],

    notionIds: ["proportionnalite", "pourcentages"],
    microIds: ["prop_pourcentage", "prop_evolution"],

    hint1: "Après une réduction de 20 %, il reste 80 % du prix initial.",
    hint2: "360 € représente donc 80 % du prix initial.",
    hint3: "Calcule 360 ÷ 0,8.",

    correction:
      "Après une réduction de 20 %, le prix payé représente 80 % du prix initial. On cherche donc le nombre dont 80 % vaut 360. On calcule 360 ÷ 0,8 = 450. Le prix initial était donc 450 €.",

    redactionAttendue:
      "Le prix final représente 80 % du prix initial. Donc 0,8 × prix initial = 360. Ainsi prix initial = 360 ÷ 0,8 = 450. Le vélo coûtait 450 € avant réduction.",

    tags: ["concours_general", "pourcentage", "raisonnement_inverse"],
  },

  {
    id: "cg_prop_002_sentier_volcan",
    niveauCible: "3e",
    accessibleFrom: "5e",
    theme: "proportionnalite_grandeurs",
    difficulty: 5,

    title: "Le sentier du volcan",

    statement:
      "Deux sentiers permettent de rejoindre un point d’observation. Le premier mesure 3,6 km. Le second est 25 % plus long. Un groupe marche à une vitesse moyenne de 4,5 km/h.",

    question:
      "Combien de minutes supplémentaires faut-il pour prendre le second sentier ?",

    format: "multi_step",
    expected: ["12"],

    notionIds: ["proportionnalite", "vitesse", "pourcentages"],
    microIds: ["prop_pourcentage", "vitesse_duree_distance"],

    hint1: "Commence par calculer la longueur supplémentaire.",
    hint2: "25 % de 3,6 km, c’est un quart de 3,6 km.",
    hint3: "Utilise temps = distance ÷ vitesse, puis convertis en minutes.",

    correction:
      "Le second sentier est plus long de 25 % de 3,6 km. Or 25 % de 3,6 km = 0,9 km. Il faut donc parcourir 0,9 km de plus. À 4,5 km/h, le temps supplémentaire vaut 0,9 ÷ 4,5 = 0,2 h. Comme 0,2 h = 12 minutes, il faut 12 minutes supplémentaires.",

    redactionAttendue:
      "La distance supplémentaire est 25 % de 3,6 km, soit 0,9 km. Le temps pour parcourir 0,9 km à 4,5 km/h vaut 0,9 ÷ 4,5 = 0,2 h. Or 0,2 h = 12 minutes. Il faut donc 12 minutes supplémentaires.",

    tags: ["concours_general", "reunion", "vitesse", "pourcentage"],
  },

  {
    id: "cg_prop_003_tarifs_velo",
    niveauCible: "3e",
    accessibleFrom: "4e",
    theme: "proportionnalite_grandeurs",
    difficulty: 4,

    title: "Deux tarifs de location",

    statement:
      "Pour louer un vélo, le tarif A coûte 5 € au départ puis 2 € par heure. Le tarif B coûte 3 € par heure sans frais de départ.",

    question:
      "Pour combien d’heures les deux tarifs coûtent-ils le même prix ?",

    format: "short",
    expected: ["5"],

    notionIds: ["fonctions", "equations", "proportionnalite"],
    microIds: ["fonction_affine", "equation_simple"],

    hint1: "Exprime chaque tarif en fonction du nombre d’heures x.",
    hint2: "Tarif A : 5 + 2x. Tarif B : 3x.",
    hint3: "Résous 5 + 2x = 3x.",

    correction:
      "Si x est le nombre d’heures, le tarif A vaut 5 + 2x et le tarif B vaut 3x. On cherche quand les deux tarifs sont égaux : 5 + 2x = 3x. Donc 5 = x. Les deux tarifs coûtent le même prix pour 5 heures.",

    redactionAttendue:
      "On note x le nombre d’heures. Le tarif A vaut 5 + 2x et le tarif B vaut 3x. On résout 5 + 2x = 3x, donc x = 5. Les deux tarifs sont égaux pour 5 heures.",

    tags: ["concours_general", "tarifs", "fonction", "equation"],
  },

  {
    id: "cg_prop_004_recette",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "proportionnalite_grandeurs",
    difficulty: 3,

    title: "La recette doublée puis partagée",

    statement:
      "Une recette pour 4 personnes utilise 300 g de riz. On veut préparer la recette pour 10 personnes.",

    question: "Quelle masse de riz faut-il prévoir ?",

    format: "short",
    expected: ["750"],

    notionIds: ["proportionnalite"],
    microIds: ["prop_table", "prop_coeff"],

    hint1: "Cherche la quantité de riz pour 1 personne.",
    hint2: "300 ÷ 4 = 75.",
    hint3: "Pour 10 personnes, calcule 75 × 10.",

    correction:
      "Pour 4 personnes, il faut 300 g de riz. Pour 1 personne, il faut 300 ÷ 4 = 75 g. Pour 10 personnes, il faut donc 75 × 10 = 750 g.",

    redactionAttendue:
      "La quantité est proportionnelle au nombre de personnes. Pour 1 personne, il faut 300 ÷ 4 = 75 g. Pour 10 personnes, il faut 75 × 10 = 750 g.",

    tags: ["concours_general", "accessible_6e", "proportionnalite", "vie_quotidienne"],
  },

  {
    id: "cg_prop_005_echelle_carte",
    niveauCible: "3e",
    accessibleFrom: "5e",
    theme: "proportionnalite_grandeurs",
    difficulty: 4,

    title: "La carte de randonnée",

    statement:
      "Sur une carte, 1 cm représente 250 m dans la réalité. Deux points sont séparés de 6,4 cm sur la carte.",

    question:
      "Quelle est la distance réelle entre ces deux points, en mètres ?",

    format: "short",
    expected: ["1600"],

    notionIds: ["proportionnalite", "grandeurs"],
    microIds: ["echelle", "conversion"],

    hint1: "Chaque centimètre représente 250 m.",
    hint2: "Il faut calculer 6,4 × 250.",
    hint3: "6,4 × 250 = 1600.",

    correction:
      "Sur la carte, 1 cm représente 250 m. Pour 6,4 cm, la distance réelle vaut 6,4 × 250 = 1600 m. Les deux points sont donc séparés de 1600 m dans la réalité.",

    redactionAttendue:
      "La distance réelle est proportionnelle à la distance sur la carte. Comme 1 cm représente 250 m, 6,4 cm représentent 6,4 × 250 = 1600 m.",

    tags: ["concours_general", "echelle", "proportionnalite", "randonnée"],
  },
];