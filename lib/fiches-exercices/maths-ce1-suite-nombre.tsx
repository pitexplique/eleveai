// ─── Fiche d'exercices : les suites de nombres (CE1) — 20 exercices corrigés ──
//
// 17/11/2026 : la feuille interactive de la notion `suite_nombre` du coach
// CE1 (« Suites de nombres », 4 micros). Sur la forme des feuilles du CM1
// (`maths-cm1-masse.tsx`, `maths-cm1-suite.tsx`) : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce1/maths/suite-nombre.bank.ts`) : compter
// jusqu'à 1 000 dans les deux sens, de 1 en 1, de 2 en 2, de 5 en 5, de 10 en
// 10 et de 100 en 100 ; trouver le pas ; un nombre caché.
// ⛔ LIMITES DU CE1 : des entiers jusqu'à 1 000 ; des suites qui AJOUTENT ou
// qui ENLÈVENT toujours le même nombre (pas de « fois 2 »).
// ⛔ Aucune question à rédiger : QCM par lettre, vrai ou faux, un nombre.
// ⛔ Des enfants de 6-7 ans qui lisent mal : 16 mots au plus par phrase.
//
// Les pièges nommés : 3100 après 399 (1), 4100 après 490 (2,
// 9), le chiffre des unités qui bouge de 100 en 100 (3, 16), le pas lu à
// l'envers (4), avancer au lieu de reculer (5, 10, 12), deviner sur le
// premier écart seulement (8, 14), compter les traits au lieu des sauts (7),
// oublier un nombre pair (11), le pas de la suite trouvé sans vérifier (13),
// le passage de la centaine en reculant (10), compter la marche 0 (17),
// compter les semaines de 1 en 1 sans partir du départ (18), prendre 0 comme
// réponse (19), la maison 1 oubliée (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : un train (2), une fusée (12), une
// grenouille (7), un facteur (11), une tirelire (13, 18), des sauts de
// kangourou (8), un robot (16), un escalier de château (17), un jeu de
// comptage (19), une rue (20).
// Les métiers : facteur (11), contrôleur de train (2).
// UN SEUL contexte réunionnais (11, le facteur de Cilaos, MODÈLE).
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS : les cases d'une suite (`suite`), la droite graduée et ses
// sauts (`droiteRel`), le matériel de numération (`baseDix`).
//
// Micro-compétences (4/4) : ce1_suite_continuer (1, 5, 6, 11, 13, 14, 18),
// ce1_suite_pas (4, 6, 8, 13, 14, 15, 17, 19), ce1_suite_10_100 (2, 3, 7, 9,
// 10, 12, 15, 16, 18), ce1_suite_defi (17, 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { droiteRel, ecranSeulement } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { baseDix, suite } from "@/lib/fiches-exercices/dessins-ce1-nombres-calcul";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];

export const exercicesSuiteNombreCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "suite-nombre",
  titre: "Les suites de nombres",
  accroche:
    "Vingt exercices, du plus facile au défi. Compter de 1 en 1, de 2 en 2, de 10 en 10 et de 100 en 100. En avançant, et à l'envers. Trouver le pas d'une suite, trouver le nombre caché. Un train, une fusée, une grenouille, un facteur et une tirelire. Lis le rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Deux nombres ? Je les sépare par « ; ».",
      rappel: [
        "Dans une suite, on ajoute toujours le même nombre : c'est le pas.",
        "De 10 en 10, le chiffre des dizaines change : 340, 350, 360.",
        "De 100 en 100, le chiffre des centaines change : 150, 250, 350.",
      ],
      exercices: [
        {
          enonce: "Continue de 1 en 1.\n396, 397, 398, …, …\na) Quel nombre vient après 398 ?\nb) Et après ce nombre ?",
          correction:
            "J'ajoute 1 à chaque fois.\na) 398 + 1 = 399.\nb) 399 + 1 : les 9 unités deviennent 10. Elles font une dizaine.\nLes 9 dizaines deviennent 10. Elles font une centaine.\nJ'ai 4 centaines : 400.\n⛔ Le piège : écrire « 3100 ». Après 399, on passe à la centaine suivante : 400.\nRéponse : a) 399 ; b) 400.",
          micros: ["ce1_suite_continuer"],
          reponses: [
            { question: "a)", attendu: "399" },
            { question: "b)", attendu: "400" },
          ],
        },
        {
          enonce: "Le contrôleur compte les wagons de 10 en 10.\na) 340, 350, 360, … Quel nombre vient ensuite ?\nb) 480, 490, … Quel nombre vient ensuite ?",
          correction:
            "De 10 en 10, j'ajoute 1 dizaine. Le chiffre des dizaines avance de 1.\na) 360 : 6 dizaines. J'en ajoute une : 7 dizaines. Donc 370.\nb) 490 : 9 dizaines. J'en ajoute une : 10 dizaines.\n10 dizaines font une centaine. J'ai 5 centaines : 500.\n⛔ Le piège du b) : écrire 4100. 10 dizaines, c'est une centaine de plus.\nRéponse : a) 370 ; b) 500.",
          micros: ["ce1_suite_10_100"],
          reponses: [
            { question: "a)", attendu: "370" },
            { question: "b)", attendu: "500" },
          ],
        },
        {
          enonce: "Compte de 100 en 100.\n150, 250, 350, …, …\nÉcris les deux nombres suivants.",
          figure: suite(["150", "250", "350", "?", "?"]),
          correction:
            "De 100 en 100, j'ajoute 1 centaine. Le chiffre des centaines avance de 1.\nLes dizaines et les unités ne bougent pas : toujours 50.\n350 + 100 = 450.\n450 + 100 = 550.\n⛔ Le piège : écrire 360 et 370. Là, j'ai ajouté 10, pas 100.\nRéponse : 450 ; 550.",
          micros: ["ce1_suite_10_100"],
          reponses: [{ attendu: ["450 ; 550", "450 et 550"], ordre: true }],
        },
        {
          enonce: "Trouve le pas de chaque suite.\na) 12, 14, 16, 18\nb) 35, 40, 45, 50\nc) 700, 600, 500, 400",
          correction:
            "Je regarde l'écart entre deux nombres. Puis je vérifie sur les suivants.\na) De 12 à 14 : + 2. De 14 à 16 : + 2. Le pas est 2.\nb) De 35 à 40 : + 5. De 40 à 45 : + 5. Le pas est 5.\nc) De 700 à 600 : on recule de 100. Le pas est 100, à l'envers.\n⛔ Le piège du c) : la suite descend. On enlève 100 à chaque fois.\nRéponse : a) 2 ; b) 5 ; c) 100.",
          micros: ["ce1_suite_pas"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: ["100", "cent"] },
          ],
        },
        {
          enonce: "Compte à l'envers, de 2 en 2.\n50, 48, 46, …, …\nÉcris les deux nombres suivants.",
          correction:
            "À l'envers, j'enlève 2 à chaque fois.\n46 − 2 = 44.\n44 − 2 = 42.\n⛔ Le piège : ajouter 2 et écrire 48. La suite descend : les nombres deviennent plus petits.\nRéponse : 44 ; 42.",
          micros: ["ce1_suite_continuer"],
          reponses: [{ attendu: ["44 ; 42", "44 et 42"], ordre: true }],
        },
        {
          enonce: "Quel nombre est caché sous le « ? » ?",
          figure: suite(["205", "210", "?", "220", "225"]),
          correction:
            "Je cherche le pas : de 205 à 210, j'ajoute 5.\nJe vérifie : de 220 à 225, j'ajoute 5 aussi.\nLe nombre caché : 210 + 5 = 215.\nJe vérifie : 215 + 5 = 220. Ça marche.\n⛔ Le piège : écrire 211. Le pas n'est pas 1, c'est 5.\nRéponse : 215.",
          micros: ["ce1_suite_continuer", "ce1_suite_pas"],
          reponses: [{ attendu: "215" }],
        },
        {
          enonce: "La grenouille part de 30.\nElle fait 4 sauts de 10.\nSur quel nombre arrive-t-elle ?",
          figure: droiteRel(0, 100, 10, [{ value: 30, label: "départ" }], { nombres: 20 }),
          correction:
            "Je compte les sauts, pas les traits.\n1er saut : 30 + 10 = 40.\n2e saut : 40 + 10 = 50.\n3e saut : 50 + 10 = 60.\n4e saut : 60 + 10 = 70.\n⛔ Le piège : compter le trait du départ comme un saut, et finir sur 60.\nRéponse : 70.",
          schema: ecranSeulement(
            droiteRel(0, 100, 10, [{ value: 30, label: "départ" }, { value: 70, label: "arrivée" }], {
              nombres: 20,
              sauts: [
                { de: 30, vers: 40, label: "+10" },
                { de: 40, vers: 50, label: "+10" },
                { de: 50, vers: 60, label: "+10" },
                { de: 60, vers: 70, label: "+10" },
              ],
            }),
          ),
          micros: ["ce1_suite_10_100"],
          reponses: [{ attendu: ["70", "soixante-dix"] }],
        },
        {
          enonce: "Le kangourou fait toujours le même bond.\nQuelle suite avance de 5 en 5 ?\nA) 5, 10, 20, 25\nB) 15, 20, 25, 30\nC) 50, 55, 65, 70",
          correction:
            "Je vérifie TOUS les écarts, pas seulement le premier.\nA) 5 à 10 : + 5. Mais 10 à 20 : + 10. Ce n'est pas toujours 5.\nB) 15 à 20 : + 5. 20 à 25 : + 5. 25 à 30 : + 5. Toujours 5.\nC) 50 à 55 : + 5. Mais 55 à 65 : + 10. Non.\n⛔ Le piège : regarder seulement le premier écart. A et C commencent bien, puis se trompent.\nRéponse : B.",
          micros: ["ce1_suite_pas"],
          reponses: [{ attendu: ["B"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je trouve le pas, puis je continue. Deux nombres ? Je les sépare par « ; ».",
      rappel: [
        "Je trouve le pas, puis je le vérifie sur tous les nombres.",
        "990 + 10 = 1 000 : 10 dizaines de plus font une centaine.",
        "500 − 10 = 490 : je casse une centaine en 10 dizaines.",
      ],
      exercices: [
        {
          enonce: "Continue de 10 en 10.\n970, 980, …, …\nÉcris les deux nombres suivants.",
          correction:
            "J'ajoute 10 à chaque fois.\n980 + 10 = 990.\n990 : 99 dizaines. J'en ajoute une : 100 dizaines.\n100 dizaines, c'est 1 000.\n⛔ Le piège : écrire 9100. Après 990, de 10 en 10, vient 1 000.\nRéponse : 990 ; 1 000.",
          micros: ["ce1_suite_10_100"],
          reponses: [{ attendu: ["990 ; 1000", "990 et 1000"], ordre: true }],
        },
        {
          enonce: "Recule de 10 en 10.\n520, 510, …, …\nÉcris les deux nombres suivants.",
          correction:
            "J'enlève 10 à chaque fois.\n510 − 10 = 500.\n500 − 10 : je n'ai plus de dizaine. Je casse une centaine en 10 dizaines.\n4 centaines et 9 dizaines : 490.\n⛔ Le piège : écrire 4100 ou 590. Après 500, en reculant de 10, vient 490.\nRéponse : 500 ; 490.",
          micros: ["ce1_suite_10_100"],
          reponses: [{ attendu: ["500 ; 490", "500 et 490"], ordre: true }],
        },
        {
          enonce: "À Cilaos, le facteur passe dans une rue aux numéros pairs.\n18, 20, ?, 24, ?\nQuels sont les deux numéros cachés ?",
          figure: suite(["18", "20", "?", "24", "?"]),
          correction:
            "Les numéros vont de 2 en 2 : 18, 20…\nLe premier caché : 20 + 2 = 22. Je vérifie : 22 + 2 = 24. Oui.\nLe deuxième caché : 24 + 2 = 26.\n⛔ Le piège : écrire 21. 21 est impair : il est de l'autre côté de la rue.\nRéponse : 22 ; 26.",
          micros: ["ce1_suite_continuer"],
          reponses: [{ attendu: ["22 ; 26", "22 et 26"], ordre: true }],
        },
        {
          enonce: "Le compte à rebours de la fusée va de 100 en 100.\n900, 800, ?, 600, ?\nQuels sont les deux nombres cachés ?",
          figure: suite(["900", "800", "?", "600", "?"]),
          correction:
            "La suite descend. J'enlève 100 à chaque fois.\n800 − 100 = 700. Je vérifie : 700 − 100 = 600. Oui.\n600 − 100 = 500.\n⛔ Le piège : ajouter 100, comme dans une suite qui monte. Ici, on recule : les nombres deviennent plus petits.\nRéponse : 700 ; 500.",
          micros: ["ce1_suite_10_100"],
          reponses: [{ attendu: ["700 ; 500", "700 et 500"], ordre: true }],
        },
        {
          enonce: "Chaque semaine, Ana met des euros dans sa tirelire.\nElle a 12 €, puis 15 €, puis 18 €, puis 21 €.\na) Quel est le pas ?\nb) Combien aura-t-elle la semaine suivante ?",
          correction:
            "a) De 12 à 15 : + 3. De 15 à 18 : + 3. De 18 à 21 : + 3.\nLe pas est 3.\nb) 21 + 3 = 24.\n⛔ Le piège : choisir le pas sans le vérifier sur tous les nombres.\nRéponse : a) 3 ; b) 24.",
          micros: ["ce1_suite_pas", "ce1_suite_continuer"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: "24" },
          ],
        },
        {
          enonce: "Une erreur s'est glissée dans cette suite.\n430, 440, 450, 455, 470\na) Quel nombre est faux ?\nb) Quel nombre faut-il à sa place ?",
          correction:
            "Je cherche le pas : de 430 à 440, + 10. De 440 à 450, + 10.\nJe continue : 450 + 10 = 460. Mais la suite écrit 455.\nJe vérifie : 460 + 10 = 470. Oui, c'est bien le nombre suivant.\na) Le nombre faux est 455.\nb) Il faut 460.\n⛔ Le piège : changer le pas en cours de route. Le pas reste toujours 10.\nRéponse : a) 455 ; b) 460.",
          micros: ["ce1_suite_pas", "ce1_suite_continuer"],
          reponses: [
            { question: "a)", attendu: "455" },
            { question: "b)", attendu: "460" },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) Après 499 vient 500.\nb) Juste avant 400, il y a 399.\nc) De 10 en 10, après 95 vient 96.\nd) 600, 700, 800 avance de 10 en 10.",
          correction:
            "a) 499 + 1 = 500. Vrai.\nb) 400 − 1 = 399. Vrai.\nc) De 10 en 10, j'ajoute 10 : 95 + 10 = 105. Pas 96. Faux.\nd) De 600 à 700, on ajoute 100. C'est de 100 en 100. Faux.\n⛔ Le piège du d) : seul le premier chiffre change. C'est le chiffre des centaines : on avance de 100.\nRéponse : a) vrai ; b) vrai ; c) faux ; d) faux.",
          micros: ["ce1_suite_pas", "ce1_suite_10_100"],
          reponses: [
            { question: "a)", attendu: VRAI },
            { question: "b)", attendu: VRAI },
            { question: "c)", attendu: FAUX },
            { question: "d)", attendu: FAUX },
          ],
        },
        {
          enonce: "Le robot avance de 100 en 100. Il part de 47.\nÉcris les trois nombres suivants, séparés par « ; ».",
          figure: baseDix(0, 4, 7),
          correction:
            "47, c'est 4 dizaines et 7 unités. Le robot ajoute 1 centaine à chaque fois.\n47 + 100 = 147.\n147 + 100 = 247.\n247 + 100 = 347.\nLes dizaines et les unités ne bougent pas : toujours 47.\n⛔ Le piège : ajouter 10 et écrire 57. De 100 en 100, seul le chiffre des centaines change.\nRéponse : 147 ; 247 ; 347.",
          micros: ["ce1_suite_10_100"],
          reponses: [{ attendu: ["147 ; 247 ; 347"], ordre: true }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Défis ───────────────────────── */
    {
      niveau: 3,
      titre: "Défis",
      consigne: "Je lis tout. Je compte en écrivant la suite au brouillon.",
      rappel: [
        "J'écris la suite au brouillon, un nombre après l'autre.",
        "Je compte combien de pas j'ai faits.",
        "De 2 en 2 depuis 0 : on tombe seulement sur les nombres pairs.",
      ],
      exercices: [
        {
          titre: "L'escalier du château",
          enonce: "L'escalier du château a 30 marches.\nPic monte 2 marches à chaque pas. Il part du sol, à 0.\na) Combien de pas fait-il pour arriver en haut ?\nb) Pose-t-il le pied sur la marche 17 ?",
          correction:
            "Je compte de 2 en 2 : 2, 4, 6, 8, 10. Cela fait 5 pas pour 10 marches.\na) 10 marches = 5 pas. Donc 30 marches = 5 + 5 + 5 = 15 pas.\nb) De 2 en 2 depuis 0, Pic tombe sur 2, 4, 6… Seulement des nombres pairs.\n17 est impair : il ne pose pas le pied dessus. Non.\n⛔ Le piège du a) : compter le sol, la marche 0, comme un pas.\nRéponse : a) 15 ; b) non.",
          micros: ["ce1_suite_defi", "ce1_suite_pas"],
          reponses: [
            { question: "a)", attendu: ["15", "quinze"] },
            { question: "b)", attendu: ["non", "faux"] },
          ],
        },
        {
          titre: "La tirelire de Malik",
          enonce: "Malik a 40 € dans sa tirelire.\nIl ajoute 10 € chaque semaine.\na) Combien a-t-il après 1 semaine ?\nb) Combien a-t-il après 4 semaines ?\nc) Après combien de semaines a-t-il 100 € ?",
          correction:
            "Je compte de 10 en 10 à partir de 40.\nSemaine 1 : 50. Semaine 2 : 60. Semaine 3 : 70. Semaine 4 : 80.\nSemaine 5 : 90. Semaine 6 : 100.\na) Après 1 semaine : 50 €.\nb) Après 4 semaines : 80 €.\nc) Il a 100 € après 6 semaines.\n⛔ Le piège du c) : répondre 10. On ne part pas de 0 : Malik a déjà 40 €.\nRéponse : a) 50 ; b) 80 ; c) 6.",
          micros: ["ce1_suite_defi", "ce1_suite_10_100", "ce1_suite_continuer"],
          reponses: [
            { question: "a)", attendu: "50" },
            { question: "b)", attendu: "80" },
            { question: "c)", attendu: ["6", "six"] },
          ],
        },
        {
          titre: "Le jeu des deux suites",
          enonce: "Léo compte de 5 en 5 depuis 0. Mia compte de 2 en 2 depuis 0.\na) Quel est le premier nombre, après 0, qu'ils disent tous les deux ?\nb) Et le suivant ?",
          correction:
            "J'écris les deux suites.\nLéo : 0, 5, 10, 15, 20, 25.\nMia : 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.\na) Le premier nombre commun après 0 : 10.\nb) Le suivant : 20.\n⛔ Le piège : répondre 0. On cherche le premier nombre APRÈS 0.\nRéponse : a) 10 ; b) 20.",
          micros: ["ce1_suite_defi", "ce1_suite_pas"],
          reponses: [
            { question: "a)", attendu: ["10", "dix"] },
            { question: "b)", attendu: ["20", "vingt"] },
          ],
        },
        {
          titre: "Les maisons de la rue",
          enonce: "D'un côté de la rue, les maisons ont les numéros 1, 3, 5, 7…\na) Quel est le numéro de la 10e maison ?\nb) Le numéro 31, c'est la combientième maison ? Écris le nombre seul.",
          correction:
            "Les numéros vont de 2 en 2, en partant de 1.\na) J'écris : 1, 3, 5, 7, 9, 11, 13, 15, 17, 19. La 10e maison a le numéro 19.\nb) Je continue : la 11e a 21, la 12e 23, la 13e 25, la 14e 27, la 15e 29.\nLa 16e maison a le numéro 31.\n⛔ Le piège du a) : répondre 20, ou 10. La 1re maison a le numéro 1, pas 2.\nRéponse : a) 19 ; b) 16.",
          micros: ["ce1_suite_defi", "ce1_suite_continuer"],
          reponses: [
            { question: "a)", attendu: ["19", "dix-neuf"] },
            { question: "b)", attendu: ["16", "seize"] },
          ],
        },
      ],
    },
  ],
};
