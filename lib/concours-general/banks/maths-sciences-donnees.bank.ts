// lib/concours-general/banks/maths-sciences-donnees.bank.ts

import type { ConcoursGeneralItem } from "../types";

export const mathsSciencesDonneesBank: ConcoursGeneralItem[] = [
  {
    id: "cg_sci_001_moyenne_inverse",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "maths_sciences_donnees",
    difficulty: 3,

    title: "La moyenne à atteindre",

    statement:
      "Un élève a obtenu les notes suivantes : 12 ; 15 ; 13 ; 10. Il veut avoir une moyenne de 14 après un cinquième devoir.",

    question:
      "Quelle note doit-il obtenir au cinquième devoir ?",

    format: "short",
    expected: ["20"],

    notionIds: ["statistiques"],
    microIds: ["stat_moyenne"],

    hint1: "Cherche le total nécessaire pour avoir 14 de moyenne sur 5 devoirs.",
    hint2: "14 × 5 = 70.",
    hint3: "Calcule la somme des 4 premières notes, puis complète jusqu’à 70.",

    correction:
      "Pour avoir une moyenne de 14 sur 5 devoirs, il faut un total de 14 × 5 = 70 points. Les quatre premières notes donnent 12 + 15 + 13 + 10 = 50. Il manque donc 70 - 50 = 20. L’élève doit obtenir 20 au cinquième devoir.",

    redactionAttendue:
      "Un total de 70 points est nécessaire pour avoir 14 de moyenne sur 5 devoirs. Les quatre premières notes totalisent 50 points. Il manque donc 20 points. L’élève doit avoir 20.",

    tags: ["concours_general", "accessible_6e", "moyenne", "raisonnement_inverse"],
  },

  {
    id: "cg_sci_002_croissance_plante",
    niveauCible: "3e",
    accessibleFrom: "5e",
    theme: "maths_sciences_donnees",
    difficulty: 4,

    title: "La plante qui grandit",

    statement:
      "Une plante mesure 12 cm au jour 0, 20 cm au jour 4 et 32 cm au jour 10. On suppose que sa croissance est régulière.",

    question:
      "Quelle serait sa taille au jour 15 ?",

    format: "short",
    expected: ["42"],

    notionIds: ["proportionnalite", "fonctions", "donnees"],
    microIds: ["taux_variation", "lecture_donnees"],

    hint1: "Calcule la croissance entre le jour 0 et le jour 4.",
    hint2: "Elle grandit de 8 cm en 4 jours, donc 2 cm par jour.",
    hint3: "Au jour 15, elle a grandi pendant 15 jours à partir de 12 cm.",

    correction:
      "Entre le jour 0 et le jour 4, la plante grandit de 20 - 12 = 8 cm en 4 jours, soit 2 cm par jour. Entre le jour 4 et le jour 10, elle grandit de 32 - 20 = 12 cm en 6 jours, soit encore 2 cm par jour. La croissance est donc régulière. Au jour 15, sa taille est 12 + 15 × 2 = 42 cm.",

    redactionAttendue:
      "La plante grandit de 2 cm par jour. Au jour 15, elle aura grandi de 15 × 2 = 30 cm depuis le jour 0. Sa taille sera donc 12 + 30 = 42 cm.",

    tags: ["concours_general", "sciences", "croissance", "donnees"],
  },

  {
    id: "cg_sci_003_dechets_cantine",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "maths_sciences_donnees",
    difficulty: 3,

    title: "Les déchets de la cantine",

    statement:
      "Pendant 5 jours, une cantine relève les masses de déchets alimentaires : 12 kg, 9 kg, 11 kg, 8 kg et 10 kg.",

    question:
      "Quelle est la masse moyenne de déchets par jour ?",

    format: "short",
    expected: ["10"],

    notionIds: ["statistiques", "environnement"],
    microIds: ["stat_moyenne"],

    hint1: "Additionne les 5 masses.",
    hint2: "12 + 9 + 11 + 8 + 10 = 50.",
    hint3: "Divise par le nombre de jours.",

    correction:
      "La masse totale est 12 + 9 + 11 + 8 + 10 = 50 kg. Il y a 5 jours. La moyenne est donc 50 ÷ 5 = 10 kg par jour.",

    redactionAttendue:
      "La masse totale de déchets est 50 kg sur 5 jours. La moyenne est donc 50 ÷ 5 = 10 kg par jour.",

    tags: ["concours_general", "accessible_6e", "statistiques", "environnement"],
  },

  {
    id: "cg_sci_004_energie_solaire",
    niveauCible: "3e",
    accessibleFrom: "5e",
    theme: "maths_sciences_donnees",
    difficulty: 4,

    title: "Les panneaux solaires",

    statement:
      "Un panneau solaire produit en moyenne 1,8 kWh par jour. Un collège installe 12 panneaux identiques.",

    question:
      "Quelle énergie totale les panneaux produisent-ils en 30 jours ?",

    format: "short",
    expected: ["648"],

    notionIds: ["proportionnalite", "grandeurs"],
    microIds: ["prop_probleme", "multiplication_decimaux"],

    hint1: "Calcule d’abord la production des 12 panneaux en une journée.",
    hint2: "12 × 1,8 = 21,6.",
    hint3: "Multiplie ensuite par 30 jours.",

    correction:
      "Un panneau produit 1,8 kWh par jour. Douze panneaux produisent 12 × 1,8 = 21,6 kWh par jour. En 30 jours, ils produisent 21,6 × 30 = 648 kWh.",

    redactionAttendue:
      "La production quotidienne des 12 panneaux est 12 × 1,8 = 21,6 kWh. Sur 30 jours, cela donne 21,6 × 30 = 648 kWh.",

    tags: ["concours_general", "energie", "reunion", "proportionnalite"],
  },

  {
    id: "cg_sci_005_graphique_temperature",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "maths_sciences_donnees",
    difficulty: 3,

    title: "La température moyenne",

    statement:
      "On relève les températures suivantes à Saint-Pierre pendant quatre jours : 26 °C, 28 °C, 27 °C et 31 °C.",

    question:
      "Quelle est la température moyenne sur ces quatre jours ?",

    format: "short",
    expected: ["28"],

    notionIds: ["statistiques"],
    microIds: ["stat_moyenne"],

    hint1: "Additionne les quatre températures.",
    hint2: "26 + 28 + 27 + 31 = 112.",
    hint3: "Divise par 4.",

    correction:
      "La somme des températures est 26 + 28 + 27 + 31 = 112. Il y a 4 jours. La température moyenne est donc 112 ÷ 4 = 28 °C.",

    redactionAttendue:
      "La température moyenne vaut la somme des températures divisée par le nombre de jours : 112 ÷ 4 = 28 °C.",

    tags: ["concours_general", "accessible_6e", "statistiques", "reunion"],
  },
];