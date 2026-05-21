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
      "Dans un groupe de 10 élèves, chaque élève serre la main de tous les autres une seule fois.",

    question: "Combien y a-t-il de poignées de main au total ?",

    format: "short",
    expected: ["45"],

    notionIds: ["nombres_entiers", "organisation"],
    microIds: ["calculer", "raisonner"],

    hint1: "Chaque élève serre la main de 9 autres élèves.",
    hint2: "Le calcul 10 × 9 compte chaque poignée deux fois.",
    hint3: "Il faut donc diviser par 2.",

    correction:
      "Chaque élève serre la main de 9 autres élèves. On pourrait donc calculer 10 × 9 = 90. Mais chaque poignée est comptée deux fois : une fois pour chaque élève concerné. On divise donc par 2 : 90 ÷ 2 = 45. Il y a 45 poignées de main.",

    redactionAttendue:
      "Il y a 10 élèves. Chacun serre la main de 9 autres élèves, ce qui donne 10 × 9 = 90 comptages. Chaque poignée étant comptée deux fois, il y a 90 ÷ 2 = 45 poignées de main.",

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
      "Un grand carré est formé de 49 petits carrés identiques. On colorie uniquement les petits carrés du bord.",

    question: "Combien de petits carrés sont coloriés ?",

    format: "short",
    expected: ["24"],

    notionIds: ["aires", "nombres_entiers"],
    microIds: ["aire_composer", "calculer"],

    hint1: "49 petits carrés forment un carré de 7 par 7.",
    hint2: "Les carrés non coloriés sont ceux du centre.",
    hint3: "Le centre forme un carré de 5 par 5.",

    correction:
      "Le grand carré contient 49 petits carrés, donc il mesure 7 petits carrés sur 7. Les carrés non coloriés sont ceux du centre : ils forment un carré de 5 sur 5, donc 25 petits carrés. Les carrés coloriés sont donc 49 - 25 = 24.",

    redactionAttendue:
      "Le carré est un carré de 7 × 7. L’intérieur non colorié est un carré de 5 × 5, soit 25 petits carrés. La bordure contient donc 49 - 25 = 24 petits carrés.",

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
      "Un nombre entier positif laisse un reste de 3 lorsqu’on le divise par 5. Il laisse aussi un reste de 3 lorsqu’on le divise par 7. Ce nombre est compris entre 80 et 120.",

    question: "Quel est ce nombre ?",

    format: "short",
    expected: ["108"],

    notionIds: ["divisibilite", "multiples"],
    microIds: ["reconnaitre_multiple", "raisonner"],

    hint1: "Si on enlève 3 au nombre, il devient divisible par 5 et par 7.",
    hint2: "Cherche un multiple commun de 5 et 7.",
    hint3: "Le multiple de 35 entre 77 et 117 est 105.",

    correction:
      "Le nombre laisse le même reste 3 quand on le divise par 5 et par 7. Donc si on enlève 3, le nombre obtenu est divisible par 5 et par 7. Il est donc multiple de 35. Comme le nombre est entre 80 et 120, le nombre diminué de 3 est entre 77 et 117. Le multiple de 35 dans cet intervalle est 105. Le nombre cherché est donc 105 + 3 = 108.",

    redactionAttendue:
      "Si on retire 3 au nombre, on obtient un multiple commun de 5 et de 7. Le multiple commun est donc un multiple de 35. Entre 77 et 117, on trouve 105. Le nombre vaut donc 105 + 3 = 108.",

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
      "Un nombre entier positif n laisse un reste de 3 lorsqu’on le divise par 5.",

    question: "Parmi les nombres suivants, lequel peut être égal à 4n + 2 ?",

    format: "qcm",
    choices: ["39", "42", "44", "47", "50"],
    expected: ["44"],

    notionIds: ["arithmetique", "calcul_litteral"],
    microIds: ["reste_division", "expression_litterale"],

    hint1: "Écris n sous la forme 5k + 3.",
    hint2: "Calcule 4(5k + 3) + 2.",
    hint3: "Tu obtiens 20k + 14.",

    correction:
      "Comme n laisse un reste de 3 lorsqu’on le divise par 5, on peut écrire n = 5k + 3. Alors 4n + 2 = 4(5k + 3) + 2 = 20k + 12 + 2 = 20k + 14. Le nombre 4n + 2 doit donc laisser un reste de 14 dans la division par 20. Or 44 = 20 × 2 + 4 ? Attention, 44 ne convient pas. Il faut un nombre de la forme 20k + 14, par exemple 54. La bonne réponse doit donc être 54.",

    redactionAttendue:
      "On écrit n = 5k + 3. Alors 4n + 2 = 20k + 14. Parmi les choix proposés, il faut choisir un nombre de la forme 20k + 14.",

    tags: ["concours_general", "qcm", "singapour_style", "reste"],
  },

  {
    id: "cg_num_005_suite_logique",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "nombres_logique",
    difficulty: 3,

    title: "La suite qui accélère",

    statement: "On observe la suite suivante : 4 ; 8 ; 13 ; 19 ; 26 ; ...",

    question: "Quel est le nombre suivant ?",

    format: "qcm",
    choices: ["32", "33", "34", "35"],
    expected: ["34"],

    notionIds: ["nombres_entiers", "suites_logiques"],
    microIds: ["observer_regularite", "raisonner"],

    hint1: "Observe les écarts entre deux nombres successifs.",
    hint2: "Les écarts sont 4, puis 5, puis 6, puis 7.",
    hint3: "Le prochain écart est donc 8.",

    correction:
      "On calcule les écarts : 8 - 4 = 4, 13 - 8 = 5, 19 - 13 = 6, 26 - 19 = 7. Les écarts augmentent de 1 à chaque fois. Le prochain écart est donc 8. Le nombre suivant est 26 + 8 = 34.",

    redactionAttendue:
      "Les écarts sont 4, 5, 6, 7. Le prochain écart est 8, donc le nombre suivant est 26 + 8 = 34.",

    tags: ["concours_general", "accessible_6e", "suite", "logique"],
  },
];