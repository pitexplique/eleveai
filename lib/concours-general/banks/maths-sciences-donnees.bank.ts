// lib/concours-general/banks/maths-sciences-donnees.bank.ts

import type { ConcoursGeneralItem } from "../types";

export const mathsSciencesDonneesBank: ConcoursGeneralItem[] = [
  {
    id: "cg_msd_001_moyenne_notes",
    niveauCible: "3e",
    accessibleFrom: "5e",
    theme: "maths_sciences_donnees",
    difficulty: 3,

    title: "La moyenne de sciences",

    statement:
      "Lors de quatre évaluations de sciences, Lina a obtenu les notes suivantes : 12 ; 15 ; 14 ; 11.",

    question: "Quelle est sa moyenne ?",

    format: "short",
    expected: ["13"],

    notionIds: ["statistiques"],
    microIds: ["stat_moyenne"],

    hint1: "Pour calculer une moyenne, on additionne les valeurs.",
    hint2: "Puis on divise par le nombre de valeurs.",
    hint3: "12 + 15 + 14 + 11 = 52, puis 52 ÷ 4.",

    correction:
      "On additionne les quatre notes : 12 + 15 + 14 + 11 = 52. Il y a 4 notes, donc la moyenne vaut 52 ÷ 4 = 13.",

    redactionAttendue:
      "La moyenne vaut (12 + 15 + 14 + 11) ÷ 4 = 52 ÷ 4 = 13.",

    tags: ["concours_general", "statistiques", "moyenne", "sciences"],
  },

  {
    id: "cg_msd_002_tableau_effectifs",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "maths_sciences_donnees",
    difficulty: 3,

    title: "Les arbres plantés",

    statement:
      "Dans un projet écologique, des élèves plantent 18 filaos, 12 flamboyants et 20 palmiers.",

    question: "Combien d’arbres ont-ils plantés au total ?",

    format: "short",
    expected: ["50"],

    notionIds: ["statistiques", "nombres_entiers"],
    microIds: ["stat_lire_tableau", "calculer"],

    hint1: "Il faut additionner toutes les quantités.",
    hint2: "Calcule 18 + 12 + 20.",
    hint3: "18 + 12 = 30, puis 30 + 20.",

    correction:
      "Les élèves ont planté 18 + 12 + 20 = 50 arbres au total.",

    redactionAttendue:
      "On additionne les trois catégories : 18 + 12 + 20 = 50. Ils ont planté 50 arbres.",

    tags: ["concours_general", "donnees", "ecologie", "reunion"],
  },

  {
    id: "cg_msd_003_frequence_pourcentage",
    niveauCible: "3e",
    accessibleFrom: "5e",
    theme: "maths_sciences_donnees",
    difficulty: 4,

    title: "Tri des déchets",

    statement:
      "Lors d’une opération de nettoyage, 80 déchets sont ramassés. Parmi eux, 24 sont des bouteilles en plastique.",

    question:
      "Quel pourcentage des déchets ramassés sont des bouteilles en plastique ?",

    format: "short",
    expected: ["30", "30%"],

    notionIds: ["statistiques", "pourcentages"],
    microIds: ["stat_frequence", "pourcentage_proportion"],

    hint1: "On cherche la proportion 24 sur 80.",
    hint2: "Pour passer de 80 à 100, on multiplie par 1,25.",
    hint3: "24 × 1,25 = 30.",

    correction:
      "Il y a 24 bouteilles sur 80 déchets. Pour exprimer cette proportion en pourcentage : 24 ÷ 80 = 0,3. Donc 0,3 = 30 %. Les bouteilles représentent 30 % des déchets.",

    redactionAttendue:
      "La proportion est 24 ÷ 80 = 0,3, soit 30 %. Les bouteilles en plastique représentent 30 % des déchets.",

    tags: ["concours_general", "pourcentage", "frequence", "ecologie"],
  },

  {
    id: "cg_msd_004_graphique_temperature",
    niveauCible: "3e",
    accessibleFrom: "5e",
    theme: "maths_sciences_donnees",
    difficulty: 3,

    title: "Températures du matin",

    statement:
      "Pendant cinq jours, on relève les températures suivantes à 7 h : 22 °C ; 24 °C ; 23 °C ; 25 °C ; 26 °C.",

    question: "Quelle est l’étendue de cette série de températures ?",

    format: "short",
    expected: ["4", "4°C", "4 °C"],

    notionIds: ["statistiques"],
    microIds: ["stat_etendue"],

    hint1: "L’étendue est la différence entre la plus grande et la plus petite valeur.",
    hint2: "La plus grande température est 26 °C.",
    hint3: "La plus petite température est 22 °C.",

    correction:
      "L’étendue est la différence entre la valeur maximale et la valeur minimale. Ici, 26 - 22 = 4. L’étendue est donc 4 °C.",

    redactionAttendue:
      "La température maximale est 26 °C et la minimale est 22 °C. L’étendue vaut donc 26 - 22 = 4 °C.",

    tags: ["concours_general", "statistiques", "temperature", "sciences"],
  },

  {
    id: "cg_msd_005_probabilite_de",
    niveauCible: "3e",
    accessibleFrom: "5e",
    theme: "maths_sciences_donnees",
    difficulty: 3,

    title: "Le dé équilibré",

    statement:
      "On lance un dé équilibré à 6 faces numérotées de 1 à 6.",

    question:
      "Quelle est la probabilité d’obtenir un nombre pair ?",

    format: "short",
    expected: ["1/2", "0,5", "0.5", "50%"],

    notionIds: ["probabilites"],
    microIds: ["proba_evenement_simple"],

    hint1: "Les nombres pairs sur un dé sont 2, 4 et 6.",
    hint2: "Il y a 3 issues favorables sur 6 issues possibles.",
    hint3: "3/6 se simplifie en 1/2.",

    correction:
      "Les nombres pairs possibles sont 2, 4 et 6. Il y a donc 3 issues favorables sur 6 issues possibles. La probabilité vaut 3/6 = 1/2, soit 0,5 ou 50 %.",

    redactionAttendue:
      "Il y a 3 nombres pairs sur 6 faces. La probabilité est donc 3/6 = 1/2.",

    tags: ["concours_general", "probabilites", "de"],
  },
];