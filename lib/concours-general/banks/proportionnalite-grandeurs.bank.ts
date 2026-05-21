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
      "Dans un groupe de 12 élèves, chaque élève serre la main de tous les autres une seule fois.",

    question: "Combien y a-t-il de poignées de main au total ?",

    format: "short",
    expected: ["66"],

    notionIds: ["nombres_entiers", "organisation"],
    microIds: ["calculer", "raisonner"],

    hint1: "Chaque élève serre la main de 11 autres élèves.",
    hint2: "Le calcul 12 × 11 compte chaque poignée deux fois.",
    hint3: "Il faut donc diviser par 2.",

    correction:
      "Chaque élève serre la main de 11 autres élèves. On pourrait donc calculer 12 × 11 = 132. Mais chaque poignée est comptée deux fois : une fois pour chaque élève concerné. On divise donc par 2 : 132 ÷ 2 = 66. Il y a 66 poignées de main.",

    redactionAttendue:
      "Il y a 12 élèves. Chacun serre la main de 11 autres élèves, ce qui donne 12 × 11 = 132 comptages. Chaque poignée étant comptée deux fois, il y a 132 ÷ 2 = 66 poignées de main.",

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
      "Un grand carré est formé de 64 petits carrés identiques. On colorie uniquement les petits carrés du bord.",

    question: "Combien de petits carrés sont coloriés ?",

    format: "short",
    expected: ["28"],

    notionIds: ["aires", "nombres_entiers"],
    microIds: ["aire_composer", "calculer"],

    hint1: "64 petits carrés forment un carré de 8 par 8.",
    hint2: "Les carrés non coloriés sont ceux du centre.",
    hint3: "Le centre forme un carré de 6 par 6.",

    correction:
      "Le grand carré contient 64 petits carrés, donc il mesure 8 petits carrés sur 8. Les carrés non coloriés sont ceux du centre : ils forment un carré de 6 sur 6, donc 36 petits carrés. Les carrés coloriés sont donc 64 - 36 = 28.",

    redactionAttendue:
      "Le carré est un carré de 8 × 8. L’intérieur non colorié est un carré de 6 × 6, soit 36 petits carrés. La bordure contient donc 64 - 36 = 28 petits carrés.",

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
      "Un nombre entier positif laisse un reste de 4 lorsqu’on le divise par 5. Il laisse aussi un reste de 4 lorsqu’on le divise par 7. Ce nombre est compris entre 100 et 150.",

    question: "Quel est ce nombre ?",

    format: "short",
    expected: ["109"],

    notionIds: ["divisibilite", "multiples"],
    microIds: ["reconnaitre_multiple", "raisonner"],

    hint1: "Si on enlève 4 au nombre, il devient divisible par 5 et par 7.",
    hint2: "Cherche un multiple commun de 5 et 7.",
    hint3: "Le multiple de 35 entre 96 et 146 est 105.",

    correction:
      "Le nombre laisse le même reste 4 quand on le divise par 5 et par 7. Donc si on enlève 4, le nombre obtenu est divisible par 5 et par 7. Il est donc multiple de 35. Comme le nombre est entre 100 et 150, le nombre diminué de 4 est entre 96 et 146. Le multiple de 35 dans cet intervalle est 105. Le nombre cherché est donc 105 + 4 = 109.",

    redactionAttendue:
      "Si on retire 4 au nombre, on obtient un multiple commun de 5 et de 7. Le multiple commun est donc un multiple de 35. Entre 96 et 146, on trouve 105. Le nombre vaut donc 105 + 4 = 109.",

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
      "Un nombre entier positif n laisse un reste de 4 lorsqu’on le divise par 6.",

    question: "Parmi les nombres suivants, lequel peut être égal à 5n + 3 ?",

    format: "qcm",
    choices: ["47", "51", "53", "57", "61"],
    expected: ["53"],

    notionIds: ["arithmetique", "calcul_litteral"],
    microIds: ["reste_division", "expression_litterale"],

    hint1: "Écris n sous la forme 6k + 4.",
    hint2: "Calcule 5(6k + 4) + 3.",
    hint3: "Tu obtiens 30k + 23.",

    correction:
      "Comme n laisse un reste de 4 lorsqu’on le divise par 6, on peut écrire n = 6k + 4. Alors 5n + 3 = 5(6k + 4) + 3 = 30k + 20 + 3 = 30k + 23. Le nombre 5n + 3 doit donc être de la forme 30k + 23. Or 53 = 30 × 1 + 23. La bonne réponse est 53.",

    redactionAttendue:
      "On écrit n = 6k + 4. Alors 5n + 3 = 30k + 23. Parmi les choix proposés, 53 convient.",

    tags: ["concours_general", "qcm", "singapour_style", "reste"],
  },

  {
    id: "cg_num_005_suite_logique",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "nombres_logique",
    difficulty: 3,

    title: "La suite qui accélère",

    statement: "On observe la suite suivante : 5 ; 9 ; 14 ; 20 ; 27 ; ...",

    question: "Quel est le nombre suivant ?",

    format: "qcm",
    choices: ["33", "34", "35", "36"],
    expected: ["35"],

    notionIds: ["nombres_entiers", "suites_logiques"],
    microIds: ["observer_regularite", "raisonner"],

    hint1: "Observe les écarts entre deux nombres successifs.",
    hint2: "Les écarts sont 4, puis 5, puis 6, puis 7.",
    hint3: "Le prochain écart est donc 8.",

    correction:
      "On calcule les écarts : 9 - 5 = 4, 14 - 9 = 5, 20 - 14 = 6, 27 - 20 = 7. Les écarts augmentent de 1 à chaque fois. Le prochain écart est donc 8. Le nombre suivant est 27 + 8 = 35.",

    redactionAttendue:
      "Les écarts sont 4, 5, 6, 7. Le prochain écart est 8, donc le nombre suivant est 27 + 8 = 35.",

    tags: ["concours_general", "accessible_6e", "suite", "logique"],
  },
];