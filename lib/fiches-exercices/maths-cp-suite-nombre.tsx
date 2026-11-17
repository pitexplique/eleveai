// ─── Fiche d'exercices : les suites de nombres (CP) — 20 exercices corrigés ───
//
// 17/11/2026 : la feuille interactive de la notion `suite_nombre` du coach CP
// (5 micros). Sur la forme des feuilles du CM1 : 8 ★, 8 ★★, 4 ★★★, un rappel
// avant chaque niveau, corrigés à la première personne, étape par étape, avec
// le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/cp/maths/suite-nombre.bank.ts` : la suite posée
// dans des cases, la case cherchée porte « ? »).
// ⛔ LIMITES DU CP (BO n° 41 du 31/10/2024) : compter de un en un, de deux en
// deux, de cinq en cinq, de dix en dix, EN PARTANT DE N'IMPORTE QUEL NOMBRE ;
// compter à rebours de un en un (et de dix en dix, qui revient à enlever 10) ;
// la suite va jusqu'à cent.
// ⛔ Aucune question à rédiger : un nombre, une liste rangée, un QCM.
// Phrases de l'énoncé : 14 mots au plus.
//
// Les pièges nommés : le passage de la dizaine, 39 suivi de 310 (1, 7, 12),
// à rebours, 40 précédé de 49 (2, 11), un pas de 1 au lieu de 2 (3, 12), la
// fusée qui saute un nombre (4), le chiffre des unités changé au lieu des
// dizaines (5, 9), 5, 10, 15, 25 (6), une suite qui monte de 1 (8), le pas
// confondu avec le premier nombre (10), compter les bornes (13, 16), le
// nombre faux pris pour le bon (14), compter les sauts dessinés (15), oublier
// la première maison (17), compter le jour 0 (18), soustraire un sac de trop
// (19), le dixième nombre = 10 (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : espace (4, fusée), jeux (6, cache-cache),
// sport (15, grenouille sauteuse), rue et facteur (17), tirelire de billes
// (18), boulangerie (19), code secret (20). Métiers : le facteur (17), la
// boulangère (19).
// Aucun contexte réunionnais sur cette feuille (≈ 1 sur 20 pour l'ensemble).
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// Micro-compétences : cp_suite_compter_avant (1, 7, 13, 15, 16),
// cp_suite_compter_arriere (2, 4, 9, 11, 19), cp_suite_2_5_10 (3, 5, 6, 8, 9,
// 10, 12, 15, 17, 18, 19), cp_suite_completer (7, 10, 13, 14, 16),
// cp_suite_defi (14, 17, 18, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { droiteRel } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { cases } from "@/lib/fiches-exercices/dessins-cp-lot-a";

export const exercicesSuiteNombreCp: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cp",
  notion: "suite-nombre",
  titre: "Les suites de nombres",
  accroche:
    "Vingt exercices, du geste seul au problème. Le nombre qui vient après, le nombre qui vient avant. Compter de 2 en 2, de 5 en 5, de 10 en 10. Compter à rebours. Trouver les nombres cachés d'une suite. Une fusée, une grenouille, un facteur, une tirelire et une boulangère. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cp",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre qui manque.",
      rappel: [
        "Après 29 vient 30 : on change de dizaine.",
        "Compter à rebours, c'est reculer : 12, 11, 10.",
        "De 10 en 10, seul le chiffre des dizaines change : 23, 33, 43.",
      ],
      exercices: [
        {
          enonce: "Écris le nombre qui vient juste après.\na) 27\nb) 39\nc) 59\nd) 69",
          correction:
            "J'ajoute 1. Après un 9, je change de dizaine.\na) Après 27 vient 28.\nb) Après 39, la dizaine est finie. Je passe à 4 dizaines : 40.\nc) Après 59 vient 60.\nd) Après 69 vient 70.\n⛔ Le piège : écrire 310 après 39. Après le 9 des unités, c'est le chiffre des dizaines qui avance.\nRéponse : a) 28 ; b) 40 ; c) 60 ; d) 70.",
          micros: ["cp_suite_compter_avant"],
          reponses: [
            { question: "a)", attendu: "28" },
            { question: "b)", attendu: ["40", "quarante"] },
            { question: "c)", attendu: ["60", "soixante"] },
            { question: "d)", attendu: "70" },
          ],
        },
        {
          enonce: "Écris le nombre qui vient juste avant.\na) 15\nb) 40\nc) 71\nd) 100",
          correction:
            "J'enlève 1. Avant un nombre qui finit par 0, je redescends dans la dizaine d'avant.\na) Avant 15 vient 14.\nb) Avant 40 vient 39.\nc) Avant 71 vient 70.\nd) Avant 100 vient 99.\n⛔ Le piège du b) : écrire 49. Avant 40, il reste 3 dizaines et 9 unités : 39.\nRéponse : a) 14 ; b) 39 ; c) 70 ; d) 99.",
          micros: ["cp_suite_compter_arriere"],
          reponses: [
            { question: "a)", attendu: "14" },
            { question: "b)", attendu: "39" },
            { question: "c)", attendu: "70" },
            { question: "d)", attendu: "99" },
          ],
        },
        {
          enonce: "On compte de 2 en 2.\nQuel nombre se cache dans la case orange ?",
          figure: cases(["12", "14", "16", "?", "20"]),
          correction:
            "De 2 en 2, j'ajoute 2 à chaque case.\n12, puis 14, puis 16.\nAprès 16 : 16 + 2 = 18.\nJe vérifie : 18 + 2 = 20. C'est bien la case suivante.\n⛔ Le piège : écrire 17. Ici on avance de 2, pas de 1.\nRéponse : 18.",
          micros: ["cp_suite_2_5_10"],
          reponses: [{ attendu: ["18", "dix-huit"] }],
        },
        {
          enonce: "La fusée va décoller. On compte à rebours.\na) Quel nombre va dans la 1re case orange ?\nb) Et dans la 2e case orange ?",
          figure: cases(["10", "9", "8", "?", "6", "?", "4"]),
          correction:
            "À rebours, j'enlève 1 à chaque case.\na) Après 8 vient 7.\nb) Après 6 vient 5.\nLa suite complète : 10, 9, 8, 7, 6, 5, 4.\n⛔ Le piège : sauter un nombre en reculant trop vite. Je dis tous les nombres, un par un.\nRéponse : a) 7 ; b) 5.",
          micros: ["cp_suite_compter_arriere"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          enonce: "On compte de 10 en 10.\na) Quel nombre va dans la 1re case orange ?\nb) Et dans la 2e case orange ?",
          figure: cases(["23", "33", "43", "?", "?"]),
          correction:
            "De 10 en 10, j'ajoute une dizaine. Le chiffre des unités reste 3.\na) Après 43 : 4 dizaines + 1 dizaine = 5 dizaines. C'est 53.\nb) Après 53 vient 63.\n⛔ Le piège : écrire 44. Ajouter 10, c'est changer les dizaines, pas les unités.\nRéponse : a) 53 ; b) 63.",
          micros: ["cp_suite_2_5_10"],
          reponses: [
            { question: "a)", attendu: "53" },
            { question: "b)", attendu: "63" },
          ],
        },
        {
          enonce: "À cache-cache, Tom compte de 5 en 5.\na) Quel nombre va dans la 1re case orange ?\nb) Et dans la 2e case orange ?",
          figure: cases(["5", "10", "15", "?", "25", "?"]),
          correction:
            "De 5 en 5, j'ajoute 5 à chaque fois.\na) Après 15 : 15 + 5 = 20.\nb) Après 25 : 25 + 5 = 30.\nLa suite : 5, 10, 15, 20, 25, 30.\n⛔ Le piège : passer de 15 à 25 directement. Ça, c'est un saut de 10.\nRéponse : a) 20 ; b) 30.",
          micros: ["cp_suite_2_5_10"],
          reponses: [
            { question: "a)", attendu: ["20", "vingt"] },
            { question: "b)", attendu: ["30", "trente"] },
          ],
        },
        {
          enonce: "Complète la suite.\na) Quel nombre va dans la 1re case orange ?\nb) Et dans la 2e case orange ?",
          figure: cases(["56", "57", "?", "59", "?", "61"]),
          correction:
            "La suite avance de 1 : 56, 57.\na) Après 57 vient 58.\nb) Après 59, je change de dizaine : 60.\nJe vérifie : après 60 vient bien 61.\n⛔ Le piège du b) : écrire 510. Après 59 vient 60.\nRéponse : a) 58 ; b) 60.",
          micros: ["cp_suite_completer", "cp_suite_compter_avant"],
          reponses: [
            { question: "a)", attendu: "58" },
            { question: "b)", attendu: ["60", "soixante"] },
          ],
        },
        {
          enonce: "Quelle suite compte de 2 en 2 ? Écris la lettre.\nA) 3, 4, 5, 6\nB) 4, 6, 8, 10\nC) 10, 20, 30, 40",
          correction:
            "Je regarde de combien on avance d'un nombre au suivant.\nA) 3, 4 : on avance de 1.\nB) 4, 6 : on avance de 2. Puis 6, 8 et 8, 10 : encore 2.\nC) 10, 20 : on avance de 10.\nLa suite de 2 en 2 est la B.\n⛔ Le piège : choisir A parce qu'elle a des petits nombres. Je regarde l'écart, pas la taille.\nRéponse : B.",
          micros: ["cp_suite_2_5_10"],
          reponses: [{ attendu: ["B", "B) 4, 6, 8, 10"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je trouve d'abord le pas. Puis je continue la suite.",
      rappel: [
        "Le pas, c'est l'écart entre deux nombres qui se suivent.",
        "À rebours de 10 en 10 : 70, 60, 50.",
        "Passage de dizaine : 69, 70, 71. Et à rebours : 61, 60, 59.",
      ],
      exercices: [
        {
          enonce: "On compte à rebours de 10 en 10.\na) Quel nombre va dans la 1re case orange ?\nb) Et dans la 2e case orange ?",
          figure: cases(["90", "80", "?", "60", "?"]),
          correction:
            "À rebours de 10 en 10, j'enlève une dizaine à chaque case.\na) Après 80 : 8 dizaines − 1 dizaine = 7 dizaines. C'est 70.\nb) Après 60 vient 50.\n⛔ Le piège : écrire 79. On recule de 10, pas de 1.\nRéponse : a) 70 ; b) 50.",
          micros: ["cp_suite_compter_arriere", "cp_suite_2_5_10"],
          reponses: [
            { question: "a)", attendu: ["70", "soixante-dix"] },
            { question: "b)", attendu: ["50", "cinquante"] },
          ],
        },
        {
          enonce: "Trouve le pas de chaque suite.\na) 30, 32, 34, 36\nb) 15, 20, 25, 30\nc) 41, 51, 61, 71",
          correction:
            "Je calcule l'écart entre les deux premiers nombres, puis je vérifie avec les suivants.\na) De 30 à 32, j'avance de 2. De 32 à 34 aussi. Le pas est 2.\nb) De 15 à 20, j'avance de 5. Le pas est 5.\nc) De 41 à 51, j'avance de 10. Le pas est 10.\n⛔ Le piège : répondre 30 au a). Le pas n'est pas le premier nombre, c'est l'écart.\nRéponse : a) 2 ; b) 5 ; c) 10.",
          micros: ["cp_suite_2_5_10", "cp_suite_completer"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: ["10", "dix"] },
          ],
        },
        {
          enonce: "On compte à rebours, de 1 en 1. Écris le nombre qui manque.\na) 61, 60, …\nb) 50, 49, …\nc) 80, …, 78",
          correction:
            "J'enlève 1 à chaque fois.\na) Avant 60, je redescends dans les cinquante : 59.\nb) Avant 49 vient 48.\nc) Avant 80 vient 79. Puis 78 : c'est juste.\n⛔ Le piège du a) : écrire 50. Après 60, à rebours, vient 59.\nRéponse : a) 59 ; b) 48 ; c) 79.",
          micros: ["cp_suite_compter_arriere"],
          reponses: [
            { question: "a)", attendu: "59" },
            { question: "b)", attendu: "48" },
            { question: "c)", attendu: "79" },
          ],
        },
        {
          enonce: "On compte de 2 en 2.\na) Quel nombre va dans la 1re case orange ?\nb) Et dans la 2e case orange ?",
          figure: cases(["37", "39", "?", "?", "45"]),
          correction:
            "De 2 en 2, j'ajoute 2.\na) 39 + 2 : 40, 41. C'est 41.\nb) 41 + 2 = 43.\nJe vérifie : 43 + 2 = 45. C'est bien la dernière case.\n⛔ Le piège du a) : écrire 40. 40 est à 1 pas de 39 seulement.\nRéponse : a) 41 ; b) 43.",
          micros: ["cp_suite_2_5_10"],
          reponses: [
            { question: "a)", attendu: "41" },
            { question: "b)", attendu: "43" },
          ],
        },
        {
          enonce: "Trois cases sont cachées. On compte de 1 en 1.\nÉcris les trois nombres, séparés par « ; ».",
          figure: cases(["85", "86", "?", "?", "?", "90"]),
          correction:
            "J'avance de 1 à partir de 86.\n86, puis 87, 88, 89.\nJe vérifie : après 89 vient bien 90.\n⛔ Le piège : n'écrire que deux nombres. Je compte les cases cachées : il y en a 3.\nRéponse : 87 ; 88 ; 89.",
          micros: ["cp_suite_completer", "cp_suite_compter_avant"],
          reponses: [{ attendu: ["87 ; 88 ; 89"], ordre: true }],
        },
        {
          enonce: "Zoé compte de 10 en 10 : 46, 56, 66, 67, 86.\na) Quel nombre est faux ?\nb) Quel nombre fallait-il écrire ?",
          correction:
            "De 10 en 10, seul le chiffre des dizaines avance.\n46, 56, 66 : c'est juste.\nAprès 66, il faut 76. Zoé a écrit 67 : elle a ajouté 1, pas 10.\nAprès 76 vient 86 : c'est juste.\na) Le nombre faux est 67.\nb) Il fallait écrire 76.\n⛔ Le piège : inverser les deux chiffres. 67 et 76 ne sont pas le même nombre.\nRéponse : a) 67 ; b) 76.",
          micros: ["cp_suite_completer", "cp_suite_defi"],
          reponses: [
            { question: "a)", attendu: "67" },
            { question: "b)", attendu: "76" },
          ],
        },
        {
          enonce: "Une grenouille part de 0. Elle saute toujours de 5.\nLe dessin montre ses 3 premiers sauts.\nOù arrive-t-elle après 5 sauts ?",
          figure: droiteRel(0, 25, 1, [{ value: 0, label: "départ" }], {
            nombres: 5,
            sauts: [
              { de: 0, vers: 5, label: "1" },
              { de: 5, vers: 10, label: "2" },
              { de: 10, vers: 15, label: "3" },
            ],
          }),
          correction:
            "Chaque saut avance de 5. Je compte de 5 en 5.\nSaut 1 : 5. Saut 2 : 10. Saut 3 : 15.\nSaut 4 : 20. Saut 5 : 25.\nAprès 5 sauts, elle arrive à 25.\n⛔ Le piège : répondre 15, là où s'arrête le dessin. Le dessin montre 3 sauts, la question en demande 5.\nRéponse : 25.",
          micros: ["cp_suite_2_5_10", "cp_suite_compter_avant"],
          reponses: [{ attendu: ["25", "vingt-cinq"] }],
        },
        {
          enonce: "a) Écris les nombres entre 36 et 41, séparés par « ; ».\nb) Combien y en a-t-il ?",
          correction:
            "« Entre 36 et 41 » : je ne prends ni 36 ni 41.\na) Après 36, je compte : 37, 38, 39, 40. Le suivant est 41 : je m'arrête.\nb) J'ai écrit 4 nombres.\n⛔ Le piège : écrire aussi 36 et 41. Ils sont au bord, pas entre.\nRéponse : a) 37 ; 38 ; 39 ; 40 ; b) 4.",
          micros: ["cp_suite_compter_avant", "cp_suite_completer"],
          reponses: [
            { question: "a)", attendu: ["37 ; 38 ; 39 ; 40"], ordre: true },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je cherche le pas. Puis je compte, pas à pas, sans sauter de nombre.",
      rappel: [
        "Je cherche de combien on avance (ou on recule) à chaque fois.",
        "Je compte les pas sur mes doigts, ou avec des traits.",
        "À la fin, je vérifie avec la question.",
      ],
      exercices: [
        {
          titre: "Les maisons de la rue",
          enonce: "Le facteur passe dans la rue. Les maisons portent les numéros 2, 4, 6…\nLa maison de Malo porte le 18.\na) Quel numéro porte la maison juste après ?\nb) Et la maison juste avant ?\nc) Combien de maisons de 2 à 18 ?",
          correction:
            "Les numéros vont de 2 en 2.\na) Juste après 18 : 18 + 2 = 20.\nb) Juste avant 18 : 18 − 2 = 16.\nc) Je compte les numéros : 2, 4, 6, 8, 10, 12, 14, 16, 18.\nUn doigt par numéro : il y a 9 maisons.\n⛔ Le piège du c) : oublier la maison 2, la première. Je compte tous les numéros, de 2 à 18.\nRéponse : a) 20 ; b) 16 ; c) 9.",
          micros: ["cp_suite_2_5_10", "cp_suite_defi"],
          reponses: [
            { question: "a)", attendu: ["20", "vingt"] },
            { question: "b)", attendu: ["16", "seize"] },
            { question: "c)", attendu: ["9", "neuf"] },
          ],
        },
        {
          titre: "La tirelire de billes",
          enonce: "Inès a 25 billes dans sa tirelire.\nChaque jour, elle ajoute 5 billes.\na) Combien a-t-elle de billes après 3 jours ?\nb) Après combien de jours a-t-elle 50 billes ?",
          correction:
            "Je compte de 5 en 5, à partir de 25.\na) Jour 1 : 30. Jour 2 : 35. Jour 3 : 40.\nAprès 3 jours, elle a 40 billes.\nb) Je continue : jour 4 : 45. Jour 5 : 50.\nElle a 50 billes après 5 jours.\n⛔ Le piège : compter 25 comme le jour 1. Le premier jour, elle passe déjà à 30.\nRéponse : a) 40 ; b) 5.",
          micros: ["cp_suite_2_5_10", "cp_suite_defi"],
          reponses: [
            { question: "a)", attendu: ["40", "quarante"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          titre: "Les croissants de la boulangère",
          enonce: "Une boulangère a 100 croissants.\nElle vend des sacs de 10 croissants.\na) Combien reste-t-il de croissants après 3 sacs ?\nb) Combien de sacs a-t-elle vendus quand il en reste 40 ?",
          correction:
            "Je compte à rebours de 10 en 10, à partir de 100.\na) 1 sac : 90. 2 sacs : 80. 3 sacs : 70.\nIl reste 70 croissants.\nb) Je continue : 4 sacs : 60. 5 sacs : 50. 6 sacs : 40.\nElle a vendu 6 sacs.\n⛔ Le piège du b) : compter un sac de trop. Je m'arrête dès que j'arrive à 40.\nRéponse : a) 70 ; b) 6.",
          micros: ["cp_suite_compter_arriere", "cp_suite_2_5_10", "cp_suite_defi"],
          reponses: [
            { question: "a)", attendu: ["70", "soixante-dix"] },
            { question: "b)", attendu: ["6", "six"] },
          ],
        },
        {
          titre: "Le code secret",
          enonce: "Le code du coffre est une suite : 1, 11, 21, ?, 41.\na) Quel est le nombre caché ?\nb) Quel est le 10e nombre de la suite ?",
          correction:
            "De 1 à 11, j'avance de 10. De 11 à 21 aussi. Le pas est 10.\na) Après 21 : 21 + 10 = 31. Je vérifie : 31 + 10 = 41.\nb) J'écris les nombres et je les compte :\n1, 11, 21, 31, 41, 51, 61, 71, 81, 91.\nLe 10e nombre est 91.\n⛔ Le piège du b) : répondre 10. On demande le nombre à la 10e place, pas le chiffre 10.\nRéponse : a) 31 ; b) 91.",
          micros: ["cp_suite_defi", "cp_suite_2_5_10"],
          reponses: [
            { question: "a)", attendu: "31" },
            { question: "b)", attendu: "91" },
          ],
        },
      ],
    },
  ],
};
