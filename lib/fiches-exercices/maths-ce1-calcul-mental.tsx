// ─── Fiche d'exercices : le calcul mental (CE1) — 20 exercices corrigés ───────
//
// 17/11/2026 : la feuille interactive de la notion `calcul_mental` du coach
// CE1 (« Calcul mental », 13 micros). Sur la forme des feuilles du CM1
// (`maths-cm1-masse.tsx`, `maths-cm1-calcul.tsx`) : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce1/maths/calcul-mental.bank.ts`) et sur le
// programme, qui nomme chaque procédure : tables d'addition et de
// multiplication (2, 3, 4, 5, 10) dans les deux sens, doubles et moitiés,
// multiples de 25, compléments à la dizaine et à la centaine, ajouter ou
// enlever des dizaines et des centaines, × 10, + 9, + 19, + 29, − 9, enlever
// un petit nombre, la moitié d'un nombre pair, 13 × 4 en coupant 13.
// ⛔ LIMITES DU CE1 : tout reste sous 1 000 ; pas de × 4 ni × 8 « en
// doublant », pas de + 8 ni + 39 (ce sont des procédures de CE2).
// ⛔ Le résultat seul : la saisie refuse un calcul (« 34 + 9 » ne vaut pas 43).
// ⛔ Des enfants de 6-7 ans qui lisent mal : 16 mots au plus par phrase.
//
// Les pièges nommés : 7 + 8 = 14 (1), 4 × 4 = 8 (2), double et moitié
// confondus (3, 11), le complément à 100 au lieu de 40 (4), ajouter au
// chiffre des unités (5), 25 × 10 = 2 500 (6), + 10 sans enlever 1 (7, 10),
// le passage de la dizaine en reculant (8), − 10 puis − 1 (9), oublier un
// 25 (12), la moitié de 26 lue 3 (13), oublier 3 × 4 (14, 19), rendre au lieu
// de garder (15), compter jusqu'à 100 au lieu de 300 (16), une étape oubliée
// (17, 18), prendre 340 pour le nombre (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux de cartes (12), argent de
// poche (15), jeu de construction (16), jeu de points (17), boulangerie (18),
// fleuriste (19), devinettes (20).
// Les métiers : boulangère (18), fleuriste (19).
// Aucun contexte réunionnais dans cette feuille (les autres du lot en
// portent un).
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS : le matériel de numération (`baseDix`), la droite et ses
// sauts (+ 10 puis − 1, `droiteRel`), le rectangle de billes coupé en deux
// (13 × 4 = 10 × 4 + 3 × 4, `billes`).
//
// Micro-compétences (13/13) : ce1_calcul_tables_addition (1),
// ce1_calcul_tables_multiplication (2, 19), ce1_calcul_faits_multiplicatifs
// (11, 12), ce1_calcul_doubles_moities (3, 11, 18, 20),
// ce1_calcul_complements_100 (4, 16), ce1_calcul_dizaines_centaines (5),
// ce1_calcul_multiplier_10 (6, 20), ce1_calcul_ajouter_9_19_29_39 (7, 10, 15,
// 17, 20), ce1_calcul_soustraire_9 (9, 15, 17), ce1_calcul_soustraire_inferieur_9
// (8), ce1_calcul_moitie_nombre_pair (13, 18), ce1_calcul_distributivite (14,
// 19), ce1_calcul_defi (17, 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { billes } from "@/lib/fiches-exercices/dessins-calcul-cm1";
import { droiteRel, ecranSeulement } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { baseDix } from "@/lib/fiches-exercices/dessins-ce1-nombres-calcul";

export const exercicesCalculMentalCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "calcul-mental",
  titre: "Le calcul mental",
  accroche:
    "Vingt exercices, du plus facile au défi. Les tables d'addition et de multiplication. Les doubles et les moitiés. Compléter jusqu'à la dizaine ou la centaine. Ajouter 9, 19 ou 29, enlever 9. Multiplier par 10. Des cartes, des cubes, un jeu de points, une boulangère et un fleuriste. Lis le rappel avant chaque niveau. Calcule dans ta tête. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Je calcule dans ma tête. J'écris le résultat seul.",
      rappel: [
        "Le double de 8 : 8 + 8 = 16. La moitié de 16 : 8.",
        "Ajouter 9, c'est ajouter 10, puis enlever 1.",
        "× 10 : chaque chiffre monte d'un rang. 7 × 10 = 70.",
      ],
      exercices: [
        {
          enonce: "Calcule.\na) 7 + 8\nb) 6 + 5\nc) 14 − 9\nd) 12 − 4",
          correction:
            "J'utilise les doubles que je connais.\na) 7 + 7 = 14, et 8 c'est 7 + 1. Donc 7 + 8 = 15.\nb) 5 + 5 = 10, et 6 c'est 5 + 1. Donc 6 + 5 = 11.\nc) 9 + 5 = 14. Donc 14 − 9 = 5.\nd) 4 + 8 = 12. Donc 12 − 4 = 8.\n⛔ Le piège du a) : dire 14. 7 + 7 fait 14 ; 7 + 8 fait un de plus.\nRéponse : a) 15 ; b) 11 ; c) 5 ; d) 8.",
          micros: ["ce1_calcul_tables_addition"],
          reponses: [
            { question: "a)", attendu: ["15", "quinze"] },
            { question: "b)", attendu: ["11", "onze"] },
            { question: "c)", attendu: ["5", "cinq"] },
            { question: "d)", attendu: ["8", "huit"] },
          ],
        },
        {
          enonce: "Calcule.\na) 3 × 4\nb) 4 × 5\nc) 3 × 6\nd) 4 × 4",
          correction:
            "Je récite la table, ou j'ajoute plusieurs fois.\na) 3 × 4 = 4 + 4 + 4 = 12.\nb) 4 × 5 = 5 + 5 + 5 + 5 = 20.\nc) 3 × 6 = 6 + 6 + 6 = 18.\nd) 4 × 4 = 4 + 4 + 4 + 4 = 16.\n⛔ Le piège du d) : dire 8. 4 + 4 = 8, mais 4 × 4, c'est quatre fois 4.\nRéponse : a) 12 ; b) 20 ; c) 18 ; d) 16.",
          micros: ["ce1_calcul_tables_multiplication"],
          reponses: [
            { question: "a)", attendu: ["12", "douze"] },
            { question: "b)", attendu: ["20", "vingt"] },
            { question: "c)", attendu: ["18", "dix-huit"] },
            { question: "d)", attendu: ["16", "seize"] },
          ],
        },
        {
          enonce: "Complète.\na) Le double de 8 = …\nb) Le double de 15 = …\nc) La moitié de 20 = …\nd) La moitié de 14 = …",
          correction:
            "Le double : j'ajoute le nombre à lui-même. La moitié : je partage en deux parts égales.\na) 8 + 8 = 16.\nb) 15 + 15 : 10 + 10 = 20, 5 + 5 = 10. 20 + 10 = 30.\nc) 10 + 10 = 20. La moitié de 20 est 10.\nd) 7 + 7 = 14. La moitié de 14 est 7.\n⛔ Le piège : confondre double et moitié. Le double est plus grand ; la moitié, plus petite.\nRéponse : a) 16 ; b) 30 ; c) 10 ; d) 7.",
          micros: ["ce1_calcul_doubles_moities"],
          reponses: [
            { question: "a)", attendu: ["16", "seize"] },
            { question: "b)", attendu: ["30", "trente"] },
            { question: "c)", attendu: ["10", "dix"] },
            { question: "d)", attendu: ["7", "sept"] },
          ],
        },
        {
          enonce: "Combien faut-il ajouter ?\na) 37 pour aller à 40\nb) 64 pour aller à 70\nc) 280 pour aller à 300\nd) 450 pour aller à 500",
          correction:
            "Je compte jusqu'au nombre rond.\na) 37 : 38, 39, 40. Il faut 3.\nb) 64 + 6 = 70. Il faut 6.\nc) 280 : 290, 300. Deux dizaines : il faut 20.\nd) 450 + 50 = 500. Il faut 50.\n⛔ Le piège du a) : chercher le complément à 100, et dire 63. On va seulement jusqu'à 40.\nRéponse : a) 3 ; b) 6 ; c) 20 ; d) 50.",
          micros: ["ce1_calcul_complements_100"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["6", "six"] },
            { question: "c)", attendu: ["20", "vingt"] },
            { question: "d)", attendu: ["50", "cinquante"] },
          ],
        },
        {
          enonce: "Calcule.\na) 345 + 20\nb) 345 + 200\nc) 678 − 30\nd) 678 − 300",
          figure: baseDix(3, 4, 5),
          correction:
            "J'ajoute ou j'enlève des dizaines, ou des centaines. Les unités ne bougent pas.\na) 345 + 20 : 4 dizaines + 2 dizaines = 6 dizaines. Donc 365.\nb) 345 + 200 : 3 centaines + 2 centaines = 5 centaines. Donc 545.\nc) 678 − 30 : 7 dizaines − 3 dizaines = 4 dizaines. Donc 648.\nd) 678 − 300 : 6 centaines − 3 centaines = 3 centaines. Donc 378.\n⛔ Le piège : ajouter 20 aux unités, et trouver 347. Le 2 de 20 va aux dizaines.\nRéponse : a) 365 ; b) 545 ; c) 648 ; d) 378.",
          micros: ["ce1_calcul_dizaines_centaines"],
          reponses: [
            { question: "a)", attendu: "365" },
            { question: "b)", attendu: "545" },
            { question: "c)", attendu: "648" },
            { question: "d)", attendu: "378" },
          ],
        },
        {
          enonce: "Calcule.\na) 7 × 10\nb) 25 × 10\nc) 10 × 48\nd) 60 × 10",
          correction:
            "× 10 : chaque unité devient une dizaine. On écrit un 0 à droite.\na) 7 unités deviennent 7 dizaines : 70.\nb) 25 : 2 dizaines deviennent 2 centaines, 5 unités deviennent 5 dizaines. Donc 250.\nc) 48 devient 480.\nd) 60 devient 600.\n⛔ Le piège du b) : écrire 2 500. On n'ajoute qu'un seul 0.\nRéponse : a) 70 ; b) 250 ; c) 480 ; d) 600.",
          micros: ["ce1_calcul_multiplier_10"],
          reponses: [
            { question: "a)", attendu: ["70", "soixante-dix"] },
            { question: "b)", attendu: "250" },
            { question: "c)", attendu: "480" },
            { question: "d)", attendu: ["600", "six cents"] },
          ],
        },
        {
          enonce: "Calcule.\na) 34 + 9\nb) 58 + 9\nc) 126 + 9",
          correction:
            "Ajouter 9, c'est ajouter 10, puis enlever 1.\na) 34 + 10 = 44. Puis 44 − 1 = 43.\nb) 58 + 10 = 68. Puis 68 − 1 = 67.\nc) 126 + 10 = 136. Puis 136 − 1 = 135.\n⛔ Le piège : ajouter 10 et oublier d'enlever 1. On trouve alors 44 au a).\nRéponse : a) 43 ; b) 67 ; c) 135.",
          schema: ecranSeulement(
            droiteRel(30, 50, 1, [{ value: 34, label: "34" }, { value: 43, label: "43" }], {
              nombres: 10,
              sauts: [
                { de: 34, vers: 44, label: "+10" },
                { de: 44, vers: 43, label: "−1" },
              ],
            }),
          ),
          micros: ["ce1_calcul_ajouter_9_19_29_39"],
          reponses: [
            { question: "a)", attendu: "43" },
            { question: "b)", attendu: "67" },
            { question: "c)", attendu: "135" },
          ],
        },
        {
          enonce: "Calcule.\na) 43 − 5\nb) 72 − 6\nc) 31 − 4",
          correction:
            "Je recule d'abord jusqu'à la dizaine, puis je continue.\na) 43 − 3 = 40. J'ai enlevé 3, il reste 2 à enlever. 40 − 2 = 38.\nb) 72 − 2 = 70. Il reste 4 à enlever. 70 − 4 = 66.\nc) 31 − 1 = 30. Il reste 3 à enlever. 30 − 3 = 27.\n⛔ Le piège du a) : faire 5 − 3 = 2 et écrire 42. On ne peut pas changer l'ordre dans une soustraction.\nRéponse : a) 38 ; b) 66 ; c) 27.",
          micros: ["ce1_calcul_soustraire_inferieur_9"],
          reponses: [
            { question: "a)", attendu: "38" },
            { question: "b)", attendu: "66" },
            { question: "c)", attendu: "27" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je choisis l'astuce. Je calcule par petites étapes dans ma tête.",
      rappel: [
        "Enlever 9 : j'enlève 10, puis j'ajoute 1.",
        "Ajouter 19 : j'ajoute 20, puis j'enlève 1. Ajouter 29 : j'ajoute 30, puis j'enlève 1.",
        "13 × 4 : je coupe 13 en 10 et 3. 10 × 4 + 3 × 4.",
      ],
      exercices: [
        {
          enonce: "Calcule.\na) 52 − 9\nb) 100 − 9\nc) 245 − 9",
          correction:
            "Enlever 9, c'est enlever 10, puis rajouter 1. J'ai enlevé 1 de trop.\na) 52 − 10 = 42. Puis 42 + 1 = 43.\nb) 100 − 10 = 90. Puis 90 + 1 = 91.\nc) 245 − 10 = 235. Puis 235 + 1 = 236.\n⛔ Le piège : enlever 10, puis encore 1. Au a), on trouverait 41.\nRéponse : a) 43 ; b) 91 ; c) 236.",
          micros: ["ce1_calcul_soustraire_9"],
          reponses: [
            { question: "a)", attendu: "43" },
            { question: "b)", attendu: "91" },
            { question: "c)", attendu: "236" },
          ],
        },
        {
          enonce: "Calcule.\na) 45 + 19\nb) 37 + 29\nc) 150 + 29",
          correction:
            "J'ajoute le nombre rond, puis j'enlève 1.\na) 45 + 20 = 65. Puis 65 − 1 = 64.\nb) 37 + 30 = 67. Puis 67 − 1 = 66.\nc) 150 + 30 = 180. Puis 180 − 1 = 179.\n⛔ Le piège : ajouter 20 ou 30 et oublier d'enlever 1.\nRéponse : a) 64 ; b) 66 ; c) 179.",
          micros: ["ce1_calcul_ajouter_9_19_29_39"],
          reponses: [
            { question: "a)", attendu: "64" },
            { question: "b)", attendu: "66" },
            { question: "c)", attendu: "179" },
          ],
        },
        {
          enonce: "Complète.\na) Le double de 25 = …\nb) Le double de 300 = …\nc) La moitié de 50 = …\nd) La moitié de 800 = …",
          correction:
            "a) 25 + 25 : 20 + 20 = 40, 5 + 5 = 10. 40 + 10 = 50.\nb) 3 centaines + 3 centaines = 6 centaines : 600.\nc) 25 + 25 = 50. La moitié de 50 est 25.\nd) 800, c'est 8 centaines. La moitié : 4 centaines, soit 400.\n⛔ Le piège : donner le double quand on demande la moitié. Je relis le mot.\nRéponse : a) 50 ; b) 600 ; c) 25 ; d) 400.",
          micros: ["ce1_calcul_faits_multiplicatifs", "ce1_calcul_doubles_moities"],
          reponses: [
            { question: "a)", attendu: ["50", "cinquante"] },
            { question: "b)", attendu: ["600", "six cents"] },
            { question: "c)", attendu: ["25", "vingt-cinq"] },
            { question: "d)", attendu: ["400", "quatre cents"] },
          ],
        },
        {
          enonce: "Au jeu de cartes, chaque carte vaut 25 points.\na) Combien valent 3 cartes ?\nb) Combien valent 4 cartes ?\nc) Combien de cartes faut-il pour 50 points ?",
          correction:
            "Je compte de 25 en 25 : 25, 50, 75, 100.\na) 3 cartes : 25, 50, 75. Donc 75 points.\nb) 4 cartes : 25, 50, 75, 100. Donc 100 points.\nc) 25 + 25 = 50. Il faut 2 cartes.\n⛔ Le piège : sauter un nombre en comptant. Je dis 25, 50, 75, 100 comme les pièces de 25 centimes.\nRéponse : a) 75 ; b) 100 ; c) 2.",
          micros: ["ce1_calcul_faits_multiplicatifs"],
          reponses: [
            { question: "a)", attendu: ["75", "soixante-quinze"] },
            { question: "b)", attendu: ["100", "cent"] },
            { question: "c)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Trouve la moitié.\na) de 18\nb) de 26\nc) de 30\nd) de 60",
          correction:
            "Je coupe le nombre en dizaines et unités. Je prends la moitié de chaque morceau.\na) 18 = 10 + 8. La moitié : 5 + 4 = 9.\nb) 26 = 20 + 6. La moitié : 10 + 3 = 13.\nc) 30 = 15 + 15. La moitié : 15.\nd) 60 = 30 + 30. La moitié : 30.\n⛔ Le piège du b) : prendre la moitié du 6 seulement, et dire 3. Le 20 se partage aussi.\nRéponse : a) 9 ; b) 13 ; c) 15 ; d) 30.",
          micros: ["ce1_calcul_moitie_nombre_pair"],
          reponses: [
            { question: "a)", attendu: ["9", "neuf"] },
            { question: "b)", attendu: ["13", "treize"] },
            { question: "c)", attendu: ["15", "quinze"] },
            { question: "d)", attendu: ["30", "trente"] },
          ],
        },
        {
          enonce: "Calcule 13 × 4 en coupant 13 en 10 et 3.\na) 10 × 4 = …\nb) 3 × 4 = …\nc) 13 × 4 = …",
          figure: billes([{ rangees: 4, colonnes: 13, coupe: 10 }]),
          correction:
            "Le rectangle a 4 rangées de 13 billes. Je le coupe en deux morceaux.\na) À gauche : 4 rangées de 10. 10 × 4 = 40.\nb) À droite : 4 rangées de 3. 3 × 4 = 12.\nc) J'ajoute les deux morceaux : 40 + 12 = 52.\n⛔ Le piège : calculer 10 × 4 = 40 et oublier le morceau de 3.\nRéponse : a) 40 ; b) 12 ; c) 52.",
          micros: ["ce1_calcul_distributivite"],
          reponses: [
            { question: "a)", attendu: ["40", "quarante"] },
            { question: "b)", attendu: ["12", "douze"] },
            { question: "c)", attendu: "52" },
          ],
        },
        {
          enonce: "Léo a 46 € dans sa tirelire.\nSa grand-mère lui donne 29 €.\na) Combien a-t-il maintenant ?\nb) Il achète un livre à 9 €. Combien lui reste-t-il ?",
          correction:
            "a) 46 + 29 : j'ajoute 30, puis j'enlève 1.\n46 + 30 = 76. Puis 76 − 1 = 75. Il a 75 €.\nb) 75 − 9 : j'enlève 10, puis j'ajoute 1.\n75 − 10 = 65. Puis 65 + 1 = 66. Il lui reste 66 €.\n⛔ Le piège du b) : repartir de 46. Léo a maintenant 75 €.\nRéponse : a) 75 ; b) 66.",
          micros: ["ce1_calcul_ajouter_9_19_29_39", "ce1_calcul_soustraire_9"],
          reponses: [
            { question: "a)", attendu: "75" },
            { question: "b)", attendu: "66" },
          ],
        },
        {
          enonce: "Dans le jeu de construction, une boîte pleine a 100 cubes.\na) Il y a 64 cubes. Combien en manque-t-il ?\nb) Une grande boîte en a 300. Il y en a 230. Combien en manque-t-il ?\nc) Il y en a 820. Combien en manque-t-il pour aller à 900 ?",
          correction:
            "Je complète d'abord jusqu'à la dizaine, puis jusqu'à la centaine.\na) 64 + 6 = 70. 70 + 30 = 100. 6 + 30 = 36.\nb) 230 + 70 = 300. Il en manque 70.\nc) 820 + 80 = 900. Il en manque 80.\n⛔ Le piège du b) : compléter jusqu'à 100. Ici, la boîte en contient 300.\nRéponse : a) 36 ; b) 70 ; c) 80.",
          micros: ["ce1_calcul_complements_100"],
          reponses: [
            { question: "a)", attendu: "36" },
            { question: "b)", attendu: ["70", "soixante-dix"] },
            { question: "c)", attendu: ["80", "quatre-vingts"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Défis ───────────────────────── */
    {
      niveau: 3,
      titre: "Défis",
      consigne: "Je calcule étape par étape. J'écris chaque résultat au brouillon.",
      rappel: [
        "Une étape à la fois : j'écris le résultat, puis je continue.",
        "Le double de 34 : 30 + 30 = 60 et 4 + 4 = 8. Donc 68.",
        "À la fin, je relis la question.",
      ],
      exercices: [
        {
          titre: "Le jeu de points",
          enonce: "Sacha a 48 points.\nIl gagne 19 points, puis 29 points. Ensuite, il perd 9 points.\na) Combien a-t-il après avoir gagné 19 points ?\nb) Et après avoir gagné 29 points ?\nc) Combien a-t-il à la fin ?",
          correction:
            "a) 48 + 19 : 48 + 20 = 68, puis 68 − 1 = 67.\nb) 67 + 29 : 67 + 30 = 97, puis 97 − 1 = 96.\nc) 96 − 9 : 96 − 10 = 86, puis 86 + 1 = 87.\n⛔ Le piège : repartir de 48 à chaque étape. Je garde le dernier résultat.\nRéponse : a) 67 ; b) 96 ; c) 87.",
          micros: ["ce1_calcul_defi", "ce1_calcul_ajouter_9_19_29_39", "ce1_calcul_soustraire_9"],
          reponses: [
            { question: "a)", attendu: "67" },
            { question: "b)", attendu: "96" },
            { question: "c)", attendu: "87" },
          ],
        },
        {
          titre: "Les tartes de la boulangère",
          enonce: "Une boulangère fait 15 tartes le matin.\nL'après-midi, elle en fait le double.\na) Combien de tartes fait-elle l'après-midi ?\nb) Combien de tartes fait-elle dans la journée ?\nc) Le soir, elle a vendu la moitié des tartes de l'après-midi. Combien en a-t-elle vendu ?",
          correction:
            "a) Le double de 15 : 15 + 15 = 30 tartes.\nb) 15 + 30 = 45 tartes.\nc) La moitié de 30 : 15 + 15 = 30, donc 15 tartes.\n⛔ Le piège du b) : oublier les tartes du matin. Dans la journée, il y a le matin ET l'après-midi.\nRéponse : a) 30 ; b) 45 ; c) 15.",
          micros: ["ce1_calcul_defi", "ce1_calcul_doubles_moities", "ce1_calcul_moitie_nombre_pair"],
          reponses: [
            { question: "a)", attendu: ["30", "trente"] },
            { question: "b)", attendu: "45" },
            { question: "c)", attendu: ["15", "quinze"] },
          ],
        },
        {
          titre: "Les bouquets du fleuriste",
          enonce: "Un fleuriste fait 5 bouquets. Chaque bouquet a 12 fleurs.\nCalcule 12 × 5 en coupant 12 en 10 et 2.\na) 10 × 5 = …\nb) 2 × 5 = …\nc) Combien de fleurs en tout ?",
          correction:
            "12 fleurs, c'est 10 fleurs et 2 fleurs.\na) 10 × 5 = 50.\nb) 2 × 5 = 10.\nc) 50 + 10 = 60 fleurs.\n⛔ Le piège : faire 10 × 5 = 50 et oublier les 2 fleurs de chaque bouquet.\nRéponse : a) 50 ; b) 10 ; c) 60.",
          micros: ["ce1_calcul_distributivite", "ce1_calcul_tables_multiplication", "ce1_calcul_defi"],
          reponses: [
            { question: "a)", attendu: ["50", "cinquante"] },
            { question: "b)", attendu: ["10", "dix"] },
            { question: "c)", attendu: ["60", "soixante"] },
          ],
        },
        {
          titre: "Le nombre mystère",
          enonce: "a) Je multiplie mon nombre par 10. Je trouve 340. Quel est mon nombre ?\nb) Je prends le double de ce nombre. Puis j'ajoute 9. Quel nombre je trouve ?",
          correction:
            "a) × 10, c'est écrire un 0 à droite. 340, c'est 34 × 10.\nMon nombre est 34.\nb) Le double de 34 : 30 + 30 = 60 et 4 + 4 = 8. 60 + 8 = 68.\nJ'ajoute 9 : 68 + 10 = 78, puis 78 − 1 = 77.\n⛔ Le piège du a) : répondre 340. 340 est le résultat ; mon nombre est plus petit.\nRéponse : a) 34 ; b) 77.",
          micros: ["ce1_calcul_defi", "ce1_calcul_multiplier_10", "ce1_calcul_doubles_moities", "ce1_calcul_ajouter_9_19_29_39"],
          reponses: [
            { question: "a)", attendu: "34" },
            { question: "b)", attendu: "77" },
          ],
        },
      ],
    },
  ],
};
