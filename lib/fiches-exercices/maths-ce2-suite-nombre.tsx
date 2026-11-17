// ─── Fiche d'exercices : les suites de nombres (CE2) — 20 exercices ───────────
//
// 17/11/2026 : la feuille interactive de la notion `suite_nombre` du coach
// CE2 (« Suites de nombres », 4 micros). Sur la forme des feuilles du CM1
// (`maths-cm1-masse.tsx`, `maths-cm1-suite.tsx`) et du CE1
// (`maths-ce1-suite-nombre.tsx`) : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque
// niveau, corrigés à la première personne, étape par étape, avec le piège
// nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce2/maths/suite-nombre.bank.ts`) : continuer
// une suite, trouver sa règle, reconnaître si elle croît ou décroît.
// ⚠️ HORS ATTENDUS DE FIN DE CE2 : révision du CE1, gardée par le coach (feu
// vert de Frédéric, 09/08/2026). Nombres sous 10 000 ; règles = additions ou
// soustractions répétées (de 2, 5, 10, 20, 25, 50, 100, 1 000 en …) ; le
// doublement seulement aux défis, comme la banque.
// ⛔ Aucune question à rédiger : QCM par lettre, un mot (croissante,
// décroissante, oui, non), un nombre.
// ⛔ Des enfants de 7-8 ans : 18 mots au plus par phrase.
//
// Les pièges nommés : compter de 10 en 10 au lieu de 50 (1), 1 000 + 1 000
// écrit 1 0001 000 (2), deviner la règle sur un seul écart (3, 10), monter
// quand la suite descend (6, 7, 12), passer le millier (8), compter les
// jours à partir de 0 (9, 14), lire 1 200 → 1 600 comme un pas (13), dire
// « on ajoute toujours » d'une suite qui double (17), oublier qu'ils bougent
// tous les deux (18), la première place d'une rangée (19), croire qu'un
// nombre rond est forcément dans la suite (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : livreur (9), tirelire (11), jardin (12),
// sport (14), Pic le paille-en-queue qui saute sur la droite (16), mare aux
// nénuphars (17), jeu de comptage (18), théâtre (19), verger (20).
// Les métiers : livreur (9), jardinier (12), arboricultrice (20).
// UN SEUL contexte réunionnais (16, Pic le paille-en-queue, l'oiseau de La
// Réunion, mascotte du coach). Tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS : les cases d'une suite (`suite`, « ? » en orange) et la
// droite graduée (`droiteRel`). ⛔ La règle n'est jamais écrite quand c'est
// elle qu'on demande.
//
// Micro-compétences (4/4) : ce2_suite_continuer (1, 2, 5, 6, 8, 9, 11, 12,
// 14, 16), ce2_suite_regle (3, 7, 10, 11, 13, 14, 17, 19),
// ce2_suite_croissante_decroissante (4, 6, 12, 15, 18), ce2_suite_defi (17,
// 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { droiteRel } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { suite } from "@/lib/fiches-exercices/dessins-ce1-nombres-calcul";

const OUI = ["oui", "vrai"];
const NON = ["non", "faux"];
const CROISSANTE = ["croissante", "elle monte", "monte"];
const DECROISSANTE = ["décroissante", "elle descend", "descend"];

export const exercicesSuiteNombreCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "suite-nombre",
  titre: "Les suites de nombres",
  accroche:
    "Vingt exercices, du plus facile au défi. Continuer une suite de 25 en 25, de 50 en 50, de 1 000 en 1 000. Trouver la règle. Dire si la suite monte ou descend. Passer le millier sans se tromper. Une tirelire, un jardin, des nénuphars et un théâtre. Lis le rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre seul.",
      rappel: [
        "Je regarde l'écart entre deux cases qui se suivent : c'est le pas.",
        "Je vérifie le pas sur toutes les cases, pas seulement les deux premières.",
        "Une suite croissante monte. Une suite décroissante descend.",
      ],
      exercices: [
        {
          enonce: "Continue la suite.\na) Quel nombre va dans la 4e case ?\nb) Quel nombre va dans la 5e case ?",
          figure: suite(["250", "300", "350", "?", "?"]),
          correction:
            "J'écris l'écart : de 250 à 300, j'avance de 50. De 300 à 350, encore 50.\nLe pas est + 50.\na) 350 + 50 = 400.\nb) 400 + 50 = 450.\n⛔ Le piège : avancer de 10 et écrire 360. Le pas est 50, pas 10.\nRéponse : a) 400 ; b) 450.",
          micros: ["ce2_suite_continuer"],
          reponses: [
            { question: "a)", attendu: "400" },
            { question: "b)", attendu: "450" },
          ],
        },
        {
          enonce: "Continue la suite de 1 000 en 1 000.\na) Quel nombre va dans la 4e case ?\nb) Quel nombre va dans la 5e case ?",
          figure: suite(["1 000", "2 000", "3 000", "?", "?"]),
          correction:
            "J'ajoute 1 000 à chaque case : 1 millier de plus.\na) 3 000 + 1 000 = 4 000. 3 milliers + 1 millier = 4 milliers.\nb) 4 000 + 1 000 = 5 000.\n⛔ Le piège : ajouter 100 et écrire 3 100. Le chiffre des milliers change, pas celui des centaines.\nRéponse : a) 4 000 ; b) 5 000.",
          micros: ["ce2_suite_continuer"],
          reponses: [
            { question: "a)", attendu: "4 000" },
            { question: "b)", attendu: "5 000" },
          ],
        },
        {
          enonce: "Regarde la suite.\na) Quelle est sa règle ? A) + 5 B) + 15 C) + 10\nb) Quel nombre vient après 45 ?",
          figure: suite(["15", "25", "35", "45"]),
          correction:
            "a) De 15 à 25 : + 10. De 25 à 35 : + 10. De 35 à 45 : + 10.\nLe pas est le même partout : la règle est + 10. Réponse C.\nb) 45 + 10 = 55.\n⛔ Le piège : lire le premier nombre, 15, et croire que la règle est + 15.\nRéponse : a) C ; b) 55.",
          micros: ["ce2_suite_regle"],
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "55" },
          ],
        },
        {
          enonce: "La suite est-elle croissante ou décroissante ? Écris le mot.\na) 90, 80, 70, 60\nb) 125, 150, 175, 200\nc) 3 000, 2 900, 2 800",
          correction:
            "Je compare chaque nombre au suivant.\na) 90 puis 80 : les nombres deviennent plus petits. La suite descend : décroissante.\nb) 125 puis 150 : les nombres grandissent. La suite monte : croissante.\nc) 3 000 puis 2 900 : plus petit. Décroissante.\n⛔ Le piège du c) : voir 3 000 au début et croire que tout est grand. Je compare les voisins.\nRéponse : a) décroissante ; b) croissante ; c) décroissante.",
          micros: ["ce2_suite_croissante_decroissante"],
          reponses: [
            { question: "a)", attendu: DECROISSANTE },
            { question: "b)", attendu: CROISSANTE },
            { question: "c)", attendu: DECROISSANTE },
          ],
        },
        {
          enonce: "Compte de 25 en 25.\na) Quel nombre va dans la 4e case ?\nb) Quel nombre va dans la 5e case ?",
          figure: suite(["0", "25", "50", "?", "?"]),
          correction:
            "J'ajoute 25 à chaque case. 25, c'est un quart de 100.\na) 50 + 25 = 75.\nb) 75 + 25 = 100.\nQuatre bonds de 25 font 100.\n⛔ Le piège : écrire 70 au a). 50 + 20 = 70, et il faut encore + 5.\nRéponse : a) 75 ; b) 100.",
          micros: ["ce2_suite_continuer"],
          reponses: [
            { question: "a)", attendu: "75" },
            { question: "b)", attendu: "100" },
          ],
        },
        {
          enonce: "Cette suite descend de 100 en 100.\na) Quel nombre va dans la 4e case ?\nb) Quel nombre va dans la 5e case ?",
          figure: suite(["2 000", "1 900", "1 800", "?", "?"]),
          correction:
            "La suite descend : j'enlève 100 à chaque case.\na) 1 800 − 100 = 1 700.\nb) 1 700 − 100 = 1 600.\n⛔ Le piège : ajouter 100 et écrire 1 900. Les nombres deviennent plus petits.\nRéponse : a) 1 700 ; b) 1 600.",
          micros: ["ce2_suite_continuer", "ce2_suite_croissante_decroissante"],
          reponses: [
            { question: "a)", attendu: "1 700" },
            { question: "b)", attendu: "1 600" },
          ],
        },
        {
          enonce: "Regarde la suite 800, 780, 760, 740.\na) Quelle est sa règle ? A) − 20 B) + 20 C) − 2\nb) Quel nombre vient après 740 ?",
          correction:
            "a) De 800 à 780 : les nombres diminuent. 800 − 20 = 780.\n780 − 20 = 760. 760 − 20 = 740. La règle est − 20. Réponse A.\nb) 740 − 20 = 720.\n⛔ Le piège : choisir + 20. La suite descend, on enlève.\nRéponse : a) A ; b) 720.",
          micros: ["ce2_suite_regle"],
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "720" },
          ],
        },
        {
          enonce: "La suite avance de 5 en 5. Quel nombre est caché ?",
          figure: suite(["4 990", "4 995", "?", "5 005"]),
          correction:
            "J'ajoute 5 à 4 995. 4 995 + 5 = 5 000.\nLes 5 unités complètent la dizaine, la centaine, et même le millier.\nJe vérifie : 5 000 + 5 = 5 005. C'est bien la case suivante.\n⛔ Le piège : écrire 4 1000 ou 49 100. On passe au millier suivant : 5 000.\nRéponse : 5 000.",
          micros: ["ce2_suite_continuer"],
          reponses: [{ attendu: "5 000" }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je lis l'histoire. Je trouve le pas, puis je fais les bonds un par un.",
      rappel: [
        "Le pas, c'est ce qu'on ajoute ou ce qu'on enlève à chaque fois.",
        "Je compte les bonds sur mes doigts : 1 jour, 1 bond.",
        "Je vérifie le pas entre toutes les cases.",
      ],
      exercices: [
        {
          enonce: "Le livreur roule 50 km par jour. Lundi soir, son compteur affiche 3 850 km.\na) Que montre-t-il mardi soir ?\nb) Et mercredi soir ?\nc) Et jeudi soir ?",
          correction:
            "Chaque jour, le compteur avance de 50 km.\na) Mardi : 3 850 + 50 = 3 900.\nb) Mercredi : 3 900 + 50 = 3 950.\nc) Jeudi : 3 950 + 50 = 4 000. On passe au millier suivant.\n⛔ Le piège : ajouter 50 dès lundi. Lundi, le compteur affiche déjà 3 850.\nRéponse : a) 3 900 ; b) 3 950 ; c) 4 000.",
          micros: ["ce2_suite_continuer"],
          reponses: [
            { question: "a)", attendu: "3 900", unite: "km" },
            { question: "b)", attendu: "3 950", unite: "km" },
            { question: "c)", attendu: "4 000", unite: "km" },
          ],
        },
        {
          enonce: "Hugo veut compter de 5 en 5. Il écrit : 5, 10, 15, 25.\na) Sa suite est-elle juste ? Réponds oui ou non.\nb) Quel nombre a-t-il oublié ?",
          correction:
            "a) De 5 à 10 : + 5. De 10 à 15 : + 5. De 15 à 25 : + 10.\nLe dernier écart n'est pas 5. La suite n'est pas juste : non.\nb) Après 15 vient 15 + 5 = 20. Il a oublié 20.\n⛔ Le piège : vérifier seulement les deux premiers écarts.\nRéponse : a) non ; b) 20.",
          micros: ["ce2_suite_regle"],
          reponses: [
            { question: "a)", attendu: NON },
            { question: "b)", attendu: "20" },
          ],
        },
        {
          enonce: "Nina a 120 € dans sa tirelire. Elle ajoute 15 € chaque mois.\na) Combien a-t-elle après 1 mois ?\nb) Après 2 mois ?\nc) Après 4 mois ?",
          correction:
            "La règle est + 15 par mois.\na) 120 + 15 = 135.\nb) 135 + 15 = 150.\nc) 3e mois : 150 + 15 = 165. 4e mois : 165 + 15 = 180.\n⛔ Le piège du c) : sauter le 3e mois. Je fais tous les bonds.\nRéponse : a) 135 ; b) 150 ; c) 180.",
          micros: ["ce2_suite_continuer", "ce2_suite_regle"],
          reponses: [
            { question: "a)", attendu: "135" },
            { question: "b)", attendu: "150" },
            { question: "c)", attendu: "180" },
          ],
        },
        {
          enonce: "La cuve du jardinier contient 900 litres d'eau. Il arrose avec 150 litres par jour.\na) Combien reste-t-il après 1 jour ?\nb) Après 3 jours ?\nc) Cette suite est-elle croissante ou décroissante ?",
          correction:
            "Chaque jour, j'enlève 150 litres.\na) 900 − 150 = 750.\nb) 2e jour : 750 − 150 = 600. 3e jour : 600 − 150 = 450.\nc) 900, 750, 600, 450 : les nombres diminuent. La suite est décroissante.\n⛔ Le piège : ajouter 150. La cuve se vide, la suite descend.\nRéponse : a) 750 ; b) 450 ; c) décroissante.",
          micros: ["ce2_suite_continuer", "ce2_suite_croissante_decroissante"],
          reponses: [
            { question: "a)", attendu: "750", unite: "l" },
            { question: "b)", attendu: "450", unite: "l" },
            { question: "c)", attendu: DECROISSANTE },
          ],
        },
        {
          enonce: "Le pas est toujours le même. Trouve les cases cachées.\na) La 2e case.\nb) La 4e case.\nc) Quel est le pas ?",
          figure: suite(["1 200", "?", "1 600", "?", "2 000"]),
          correction:
            "De 1 200 à 1 600, il y a 2 bonds. 1 600 − 1 200 = 400.\n2 bonds font 400, donc 1 bond fait 200. Le pas est + 200.\na) 1 200 + 200 = 1 400.\nb) 1 600 + 200 = 1 800. Je vérifie : 1 800 + 200 = 2 000.\n⛔ Le piège : croire que le pas est 400. Entre 1 200 et 1 600, il y a deux bonds.\nRéponse : a) 1 400 ; b) 1 800 ; c) 200.",
          micros: ["ce2_suite_regle"],
          reponses: [
            { question: "a)", attendu: "1 400" },
            { question: "b)", attendu: "1 800" },
            { question: "c)", attendu: "200" },
          ],
        },
        {
          enonce: "Une coureuse court 500 m lundi. Chaque jour, elle court 250 m de plus.\na) Combien court-elle mercredi ?\nb) Et jeudi ?\nc) Quel jour court-elle 1 500 m ? A) jeudi B) vendredi C) samedi",
          correction:
            "La règle est + 250 par jour. Lundi : 500.\nMardi : 500 + 250 = 750. Mercredi : 750 + 250 = 1 000.\nJeudi : 1 000 + 250 = 1 250. Vendredi : 1 250 + 250 = 1 500.\na) Mercredi, 1 000 m. b) Jeudi, 1 250 m.\nc) 1 500 m, c'est vendredi. Réponse B.\n⛔ Le piège : ajouter 250 dès lundi. Lundi, elle court 500 m.\nRéponse : a) 1 000 ; b) 1 250 ; c) B.",
          micros: ["ce2_suite_continuer", "ce2_suite_regle"],
          reponses: [
            { question: "a)", attendu: "1 000", unite: "m" },
            { question: "b)", attendu: "1 250", unite: "m" },
            { question: "c)", attendu: "B" },
          ],
        },
        {
          enonce: "a) Quelle suite est décroissante ?\nA) 7 000, 7 100, 7 200\nB) 6 800, 6 900, 7 000\nC) 7 000, 6 900, 6 800\nb) Quel nombre vient après dans cette suite ?",
          correction:
            "a) A : 7 000 puis 7 100, ça monte. B : 6 800 puis 6 900, ça monte.\nC : 7 000 puis 6 900, ça descend. La suite C est décroissante. Réponse C.\nb) C enlève 100 à chaque fois : 6 800 − 100 = 6 700.\n⛔ Le piège : choisir B parce qu'elle finit par 7 000. Je regarde le sens.\nRéponse : a) C ; b) 6 700.",
          micros: ["ce2_suite_croissante_decroissante"],
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "6 700" },
          ],
        },
        {
          enonce: "Pic le paille-en-queue fait des bonds de 200. Il part de 200.\na) Où est-il après 2 bonds ?\nb) Où est-il après 4 bonds ?",
          figure: droiteRel(0, 1000, 100, [{ value: 200, label: "départ" }], { nombres: 200 }),
          correction:
            "Chaque bond ajoute 200.\na) 1er bond : 200 + 200 = 400. 2e bond : 400 + 200 = 600.\nb) 3e bond : 600 + 200 = 800. 4e bond : 800 + 200 = 1 000.\n⛔ Le piège : compter le départ comme un bond, et répondre 400 au a).\nRéponse : a) 600 ; b) 1 000.",
          micros: ["ce2_suite_continuer"],
          reponses: [
            { question: "a)", attendu: "600" },
            { question: "b)", attendu: "1 000" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Défis ───────────────────────── */
    {
      niveau: 3,
      titre: "Défis",
      consigne: "Je lis tout. J'écris la suite au brouillon, case par case.",
      rappel: [
        "J'écris les premières cases au brouillon.",
        "Ajoute-t-on toujours le même nombre ? Sinon, la règle est autre.",
        "À la fin, je relis la question.",
      ],
      exercices: [
        {
          titre: "Les nénuphars de la mare",
          enonce: "Dans une mare, le nombre de nénuphars double chaque semaine : 5, 10, 20, 40.\na) Combien en aura-t-on la 5e semaine ?\nb) Et la 6e semaine ?\nc) Ajoute-t-on toujours le même nombre ? Réponds oui ou non.",
          correction:
            "Doubler, c'est ajouter le même nombre une 2e fois : 5 + 5 = 10, 10 + 10 = 20.\na) 5e semaine : le double de 40, 40 + 40 = 80.\nb) 6e semaine : le double de 80, 80 + 80 = 160.\nc) On ajoute 5, puis 10, puis 20, puis 40. Ce n'est pas le même nombre : non.\n⛔ Le piège : croire que le pas est + 20 et écrire 60.\nRéponse : a) 80 ; b) 160 ; c) non.",
          micros: ["ce2_suite_defi", "ce2_suite_regle"],
          reponses: [
            { question: "a)", attendu: "80" },
            { question: "b)", attendu: "160" },
            { question: "c)", attendu: NON },
          ],
        },
        {
          titre: "Le jeu des deux compteurs",
          enonce: "Tom part de 100 et avance de 50 en 50.\nLou part de 1 000 et recule de 100 en 100.\nIls font un bond en même temps.\na) Où est Tom après 2 bonds ?\nb) Où est Lou après 2 bonds ?\nc) Après combien de bonds disent-ils le même nombre ?",
          correction:
            "J'écris les deux suites, bond par bond.\nTom : 100, 150, 200, 250, 300, 350, 400.\nLou : 1 000, 900, 800, 700, 600, 500, 400.\na) Après 2 bonds, Tom est à 200.\nb) Après 2 bonds, Lou est à 800.\nc) Après 6 bonds, ils disent tous les deux 400.\n⛔ Le piège : faire avancer un seul des deux. Ils bougent ensemble.\nRéponse : a) 200 ; b) 800 ; c) 6.",
          micros: ["ce2_suite_defi", "ce2_suite_croissante_decroissante"],
          reponses: [
            { question: "a)", attendu: "200" },
            { question: "b)", attendu: "800" },
            { question: "c)", attendu: ["6", "six"] },
          ],
        },
        {
          titre: "Les places du théâtre",
          enonce: "Au théâtre, chaque rangée a 25 places.\nLa rangée 1 a les places 1 à 25. La rangée 2 a les places 26 à 50.\na) Quelle est la première place de la rangée 3 ?\nb) Quelle est la dernière place de la rangée 4 ?\nc) Dans quelle rangée est la place 130 ?",
          correction:
            "Les dernières places vont de 25 en 25 : 25, 50, 75, 100, 125, 150.\na) La rangée 2 finit à 50. La rangée 3 commence juste après : 51.\nb) La rangée 4 finit à 100.\nc) La rangée 5 finit à 125. La rangée 6 va de 126 à 150. 130 est dans la rangée 6.\n⛔ Le piège du a) : répondre 50. La place 50 est la dernière de la rangée 2.\nRéponse : a) 51 ; b) 100 ; c) 6.",
          micros: ["ce2_suite_defi", "ce2_suite_regle"],
          reponses: [
            { question: "a)", attendu: "51" },
            { question: "b)", attendu: "100" },
            { question: "c)", attendu: ["6", "six"] },
          ],
        },
        {
          titre: "Le verger",
          enonce: "Une arboricultrice a 1 000 arbres. Elle en plante 25 de plus chaque année.\na) Combien en aura-t-elle dans 3 ans ?\nb) Aura-t-elle un jour 1 200 arbres tout juste ? Réponds oui ou non.\nc) Aura-t-elle un jour 1 210 arbres tout juste ?",
          correction:
            "La suite : 1 000, 1 025, 1 050, 1 075, 1 100… Elle avance de 25 en 25.\na) Dans 3 ans : 1 000 + 25 + 25 + 25 = 1 075.\nb) Je continue : 1 100, 1 125, 1 150, 1 175, 1 200. Oui, dans 8 ans.\nc) Les nombres finissent tous par 00, 25, 50 ou 75. 1 210 finit par 10 : non.\n⛔ Le piège du c) : croire qu'un nombre proche est forcément dans la suite.\nRéponse : a) 1 075 ; b) oui ; c) non.",
          micros: ["ce2_suite_defi"],
          reponses: [
            { question: "a)", attendu: "1 075" },
            { question: "b)", attendu: OUI },
            { question: "c)", attendu: NON },
          ],
        },
      ],
    },
  ],
};
