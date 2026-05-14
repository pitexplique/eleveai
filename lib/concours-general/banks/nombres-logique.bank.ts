// lib/concours-general/banks/nombres-logique.bank.ts

import type { ConcoursGeneralItem } from "../types";

export const nombresLogiqueBank: ConcoursGeneralItem[] = [
  {
    id: "cg_num_001_poignees_main",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "nombres_logique",
    difficulty: 3,

    title: "Les poignées de main",

    statement:
      "Dans un groupe de 8 élèves, chaque élève serre la main de tous les autres une seule fois.",

    question: "Combien y a-t-il de poignées de main au total ?",

    format: "short",
    expected: ["28"],

    notionIds: ["nombres_entiers", "organisation"],
    microIds: ["calculer", "raisonner"],

    hint1: "Chaque élève serre la main de 7 autres élèves.",
    hint2: "Le calcul 8 × 7 compte chaque poignée deux fois.",
    hint3: "Il faut donc diviser par 2.",

    correction:
      "Chaque élève serre la main de 7 autres élèves. On pourrait donc calculer 8 × 7 = 56. Mais chaque poignée est comptée deux fois : une fois pour chaque élève concerné. On divise donc par 2 : 56 ÷ 2 = 28. Il y a 28 poignées de main.",

    redactionAttendue:
      "Il y a 8 élèves. Chacun serre la main de 7 autres élèves, ce qui donne 8 × 7 = 56 comptages. Chaque poignée étant comptée deux fois, il y a 56 ÷ 2 = 28 poignées de main.",

    tags: ["concours_general", "accessible_6e", "denombrement", "raisonnement"],
  },

  {
    id: "cg_num_002_bordure_carree",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "nombres_logique",
    difficulty: 3,

    title: "La bordure du carré",

    statement:
      "Un grand carré est formé de 25 petits carrés identiques. On colorie uniquement les petits carrés du bord.",

    question: "Combien de petits carrés sont coloriés ?",

    format: "short",
    expected: ["16"],

    notionIds: ["aires", "nombres_entiers"],
    microIds: ["aire_composer", "calculer"],

    hint1: "25 petits carrés forment un carré de 5 par 5.",
    hint2: "Les carrés non coloriés sont ceux du centre.",
    hint3: "Le centre forme un carré de 3 par 3.",

    correction:
      "Le grand carré contient 25 petits carrés, donc il mesure 5 petits carrés sur 5. Les carrés non coloriés sont ceux du centre : ils forment un carré de 3 sur 3, donc 9 petits carrés. Les carrés coloriés sont donc 25 - 9 = 16.",

    redactionAttendue:
      "Le carré est un carré de 5 × 5. L’intérieur non colorié est un carré de 3 × 3, soit 9 petits carrés. La bordure contient donc 25 - 9 = 16 petits carrés.",

    tags: ["concours_general", "accessible_6e", "quadrillage", "aire"],
  },

  {
    id: "cg_num_003_nombre_reste",
    niveauCible: "3e",
    accessibleFrom: "5e",
    theme: "nombres_logique",
    difficulty: 4,

    title: "Le reste caché",

    statement:
      "Un nombre entier positif laisse un reste de 2 lorsqu’on le divise par 5. Il laisse aussi un reste de 2 lorsqu’on le divise par 7. Ce nombre est compris entre 50 et 100.",

    question: "Quel est ce nombre ?",

    format: "short",
    expected: ["72"],

    notionIds: ["divisibilite", "multiples"],
    microIds: ["reconnaitre_multiple", "raisonner"],

    hint1: "Si on enlève 2 au nombre, il devient divisible par 5 et par 7.",
    hint2: "Cherche un multiple commun de 5 et 7.",
    hint3: "Le multiple de 35 entre 48 et 98 est 70.",

    correction:
      "Le nombre laisse le même reste 2 quand on le divise par 5 et par 7. Donc si on enlève 2, le nombre obtenu est divisible par 5 et par 7. Il est donc multiple de 35. Comme le nombre est entre 50 et 100, le nombre diminué de 2 est entre 48 et 98. Le multiple de 35 dans cet intervalle est 70. Le nombre cherché est donc 70 + 2 = 72.",

    redactionAttendue:
      "Si on retire 2 au nombre, on obtient un multiple commun de 5 et de 7. Le multiple commun est donc un multiple de 35. Entre 48 et 98, on trouve 70. Le nombre vaut donc 70 + 2 = 72.",

    tags: ["concours_general", "reste", "multiples", "raisonnement"],
  },

  {
    id: "cg_num_004_qcm_reste",
    niveauCible: "3e",
    accessibleFrom: "4e",
    theme: "nombres_logique",
    difficulty: 4,

    title: "Un reste bien caché",

    statement:
      "Un nombre entier positif n laisse un reste de 2 lorsqu’on le divise par 5.",

    question: "Parmi les nombres suivants, lequel peut être égal à 3n + 1 ?",

    format: "qcm",
    choices: ["31", "34", "37", "40", "43"],
    expected: ["37"],

    notionIds: ["arithmetique", "calcul_litteral"],
    microIds: ["reste_division", "expression_litterale"],

    hint1: "Écris n sous la forme 5k + 2.",
    hint2: "Calcule 3(5k + 2) + 1.",
    hint3: "Tu obtiens 15k + 7.",

    correction:
      "Comme n laisse un reste de 2 lorsqu’on le divise par 5, on peut écrire n = 5k + 2. Alors 3n + 1 = 3(5k + 2) + 1 = 15k + 6 + 1 = 15k + 7. Le nombre 3n + 1 doit donc laisser un reste de 7 dans la division par 15. Or 37 = 15 × 2 + 7. La bonne réponse est 37.",

    redactionAttendue:
      "On écrit n = 5k + 2. Alors 3n + 1 = 15k + 7. Parmi les choix proposés, 37 convient.",

    tags: ["concours_general", "qcm", "singapour_style", "reste"],
  },

  {
    id: "cg_num_005_suite_logique",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "nombres_logique",
    difficulty: 3,

    title: "La suite qui accélère",

    statement: "On observe la suite suivante : 3 ; 6 ; 10 ; 15 ; 21 ; ...",

    question: "Quel est le nombre suivant ?",

    format: "qcm",
    choices: ["26", "27", "28", "30"],
    expected: ["28"],

    notionIds: ["nombres_entiers", "suites_logiques"],
    microIds: ["observer_regularite", "raisonner"],

    hint1: "Observe les écarts entre deux nombres successifs.",
    hint2: "Les écarts sont 3, puis 4, puis 5, puis 6.",
    hint3: "Le prochain écart est donc 7.",

    correction:
      "On calcule les écarts : 6 - 3 = 3, 10 - 6 = 4, 15 - 10 = 5, 21 - 15 = 6. Les écarts augmentent de 1 à chaque fois. Le prochain écart est donc 7. Le nombre suivant est 21 + 7 = 28.",

    redactionAttendue:
      "Les écarts sont 3, 4, 5, 6. Le prochain écart est 7, donc le nombre suivant est 21 + 7 = 28.",

    tags: ["concours_general", "accessible_6e", "suite", "logique"],
  },
];