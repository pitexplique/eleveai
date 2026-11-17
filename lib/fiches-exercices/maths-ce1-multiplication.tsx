// ─── Fiche d'exercices : la multiplication (CE1) — 20 exercices corrigés ──────
//
// 17/11/2026 : la feuille interactive de la notion `multiplication` du coach
// CE1 (« Multiplication », 9 micros). Sur la forme des feuilles du CM1
// (`maths-cm1-masse.tsx`, `maths-cm1-tables-multiplication.tsx`) : 8 ★, 8 ★★,
// 4 ★★★, un rappel avant chaque niveau, corrigés à la première personne,
// étape par étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce1/maths/multiplication.bank.ts`) : l'addition
// répétée, le mot « fois » puis le signe ×, 3 × 5 = 5 × 3, pair et impair,
// les tables de 2, de 5 et de 10.
// ⛔ LIMITES DU CE1 : PAS de multiplication posée ; les produits se trouvent
// par addition répétée ou dans les tables de 2, 5 et 10.
// ⛔ Aucune question à rédiger : QCM par lettre, vrai ou faux, signe, pair ou
// impair, un nombre. L'écriture « 3 × 5 » est vérifiée à la lettre (`exact`).
// ⛔ Des enfants de 6-7 ans qui lisent mal : 16 mots au plus par phrase.
//
// Les pièges nommés : compter les nids au lieu des œufs (1), additionner les
// deux nombres (2, 11), confondre rangées et colonnes (3), 2 × 7 = 27 (4),
// 5 × 10 = 15 (5), 10 × 10 = 1 000 (6), le chiffre des dizaines regardé pour
// la parité (7, 12), croire que 2 × 5 et 5 × 2 donnent deux nombres (8, 13),
// oublier la rangée ajoutée (9), multiplier au lieu de chercher le facteur
// (10, 17), comparer sans calculer (15), compter les chats au lieu des pattes
// (16), oublier le 2e tour (18), compter 17 paires (19), multiplier les
// enfants par 5 doigts (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : animaux (1, 16), potager (9), cuisine (11),
// cour de récréation (12), glacier (14), fleuriste (17), parc d'attractions
// (18), linge (19), jeux de mains (20).
// Les métiers : jardinier (9), glacière (14), fleuriste (17), forain (18).
// UN SEUL contexte réunionnais (14, les glaces au front de mer de
// Saint-Gilles, MODÈLE).
// Aucun fait réel : tous les nombres sont des MODÈLES (un chat a bien
// 4 pattes et une main 5 doigts).
//
// ⭐ LES DESSINS : des nids d'œufs (`paquets`), des rectangles de billes
// (`billes`, rangées × colonnes, que Frédéric adore).
//
// Micro-compétences (9/9) : ce1_multiplication_sens (1, 2, 3, 9, 11, 13, 16),
// ce1_multiplication_symbole (2, 3, 11), ce1_multiplication_commutativite (8,
// 13, 15), ce1_nombre_parite (7, 12, 19), ce1_table_2 (4, 10, 12, 17, 19, 20),
// ce1_table_5 (5, 9, 10, 14, 17, 20), ce1_table_10 (6, 10, 18, 20),
// ce1_multiplication_calculer (3, 9, 14, 15, 16, 20), ce1_multiplication_defi
// (17, 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { billes } from "@/lib/fiches-exercices/dessins-calcul-cm1";
import { ecranSeulement } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { paquets } from "@/lib/fiches-exercices/dessins-ce1-nombres-calcul";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];
const PAIR = ["pair"];
const IMPAIR = ["impair"];

export const exercicesMultiplicationCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "multiplication",
  titre: "La multiplication",
  accroche:
    "Vingt exercices, du plus facile au défi. Comprendre « 4 fois 3 ». Écrire avec le signe ×. Lire un rectangle de billes. Savoir que 3 × 5 = 5 × 3. Reconnaître un nombre pair ou impair. Les tables de 2, de 5 et de 10. Des œufs, un potager, des glaces, une grande roue et des chaussettes. Lis le rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le résultat seul.",
      rappel: [
        "3 + 3 + 3 + 3, c'est 4 fois 3. On écrit 4 × 3.",
        "4 × 3 = 3 × 4 : on peut changer l'ordre.",
        "Un nombre pair finit par 0, 2, 4, 6 ou 8.",
      ],
      exercices: [
        {
          enonce: "Dans chaque nid, il y a 3 œufs.\na) Écris l'addition : 3 + 3 + 3 + 3 = …\nb) Combien de fois 3 as-tu ajouté ?",
          figure: paquets([3, 3, 3, 3], { couleur: "#fde68a" }),
          correction:
            "Je compte les nids : il y en a 4. Chaque nid a 3 œufs.\na) 3 + 3 = 6. 6 + 3 = 9. 9 + 3 = 12. Il y a 12 œufs.\nb) J'ai ajouté 3 quatre fois : 4 fois 3.\nOn peut l'écrire 4 × 3 = 12.\n⛔ Le piège : compter les nids, 4, au lieu des œufs.\nRéponse : a) 12 ; b) 4.",
          micros: ["ce1_multiplication_sens"],
          reponses: [
            { question: "a)", attendu: ["12", "douze"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Écris l'addition 5 + 5 + 5 avec le signe ×.\na) Écris la multiplication.\nb) Calcule-la.",
          correction:
            "a) J'ajoute 5 trois fois : c'est 3 fois 5. J'écris 3 × 5.\nb) 5 + 5 = 10. 10 + 5 = 15. Donc 3 × 5 = 15.\n⛔ Le piège : écrire 5 + 3. Le signe × compte combien de fois on ajoute le 5.\nRéponse : a) 3 × 5 ; b) 15.",
          micros: ["ce1_multiplication_symbole", "ce1_multiplication_sens"],
          reponses: [
            { question: "a)", attendu: ["3 × 5", "5 × 3", "3 x 5", "5 x 3"], exact: true },
            { question: "b)", attendu: ["15", "quinze"] },
          ],
        },
        {
          enonce: "Regarde le rectangle de billes.\na) Combien y a-t-il de rangées ?\nb) Combien de billes dans une rangée ?\nc) Combien de billes en tout ?",
          figure: billes([{ rangees: 3, colonnes: 6 }]),
          correction:
            "a) Une rangée, c'est une ligne de gauche à droite. Il y en a 3.\nb) Dans une rangée, je compte 6 billes.\nc) 3 rangées de 6 billes : 6 + 6 + 6 = 18.\nJ'écris 3 × 6 = 18.\n⛔ Le piège : compter les rangées de haut en bas, et répondre 6 au a).\nRéponse : a) 3 ; b) 6 ; c) 18.",
          micros: ["ce1_multiplication_sens", "ce1_multiplication_symbole", "ce1_multiplication_calculer"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["6", "six"] },
            { question: "c)", attendu: ["18", "dix-huit"] },
          ],
        },
        {
          enonce: "La table de 2. Calcule.\na) 2 × 4\nb) 2 × 7\nc) 6 × 2\nd) 2 × 9",
          correction:
            "2 × un nombre, c'est le double de ce nombre.\na) 2 × 4 = 4 + 4 = 8.\nb) 2 × 7 = 7 + 7 = 14.\nc) 6 × 2 = 2 × 6 = 6 + 6 = 12.\nd) 2 × 9 = 9 + 9 = 18.\n⛔ Le piège : coller les chiffres et écrire 27 pour 2 × 7.\nRéponse : a) 8 ; b) 14 ; c) 12 ; d) 18.",
          micros: ["ce1_table_2"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["14", "quatorze"] },
            { question: "c)", attendu: ["12", "douze"] },
            { question: "d)", attendu: ["18", "dix-huit"] },
          ],
        },
        {
          enonce: "La table de 5. Calcule.\na) 5 × 3\nb) 5 × 6\nc) 8 × 5\nd) 5 × 10",
          correction:
            "Je compte de 5 en 5 : 5, 10, 15, 20, 25, 30, 35, 40, 45, 50.\na) 5 × 3 : trois bonds de 5. 5, 10, 15. Donc 15.\nb) 5 × 6 : six bonds. Donc 30.\nc) 8 × 5 = 5 × 8 : huit bonds. Donc 40.\nd) 5 × 10 : dix bonds. Donc 50.\n⛔ Le piège : ajouter au lieu de multiplier, 5 + 10 = 15 au d).\nRéponse : a) 15 ; b) 30 ; c) 40 ; d) 50.",
          micros: ["ce1_table_5"],
          reponses: [
            { question: "a)", attendu: ["15", "quinze"] },
            { question: "b)", attendu: ["30", "trente"] },
            { question: "c)", attendu: ["40", "quarante"] },
            { question: "d)", attendu: ["50", "cinquante"] },
          ],
        },
        {
          enonce: "La table de 10. Calcule.\na) 10 × 4\nb) 7 × 10\nc) 10 × 10\nd) 10 × 9",
          correction:
            "10 × un nombre : ce nombre de dizaines.\na) 10 × 4 : 4 dizaines, c'est 40.\nb) 7 × 10 : 7 dizaines, c'est 70.\nc) 10 × 10 : 10 dizaines, c'est 100.\nd) 10 × 9 : 9 dizaines, c'est 90.\n⛔ Le piège du c) : écrire 1 000. 10 dizaines font une centaine : 100.\nRéponse : a) 40 ; b) 70 ; c) 100 ; d) 90.",
          micros: ["ce1_table_10"],
          reponses: [
            { question: "a)", attendu: ["40", "quarante"] },
            { question: "b)", attendu: ["70", "soixante-dix"] },
            { question: "c)", attendu: ["100", "cent"] },
            { question: "d)", attendu: ["90", "quatre-vingt-dix"] },
          ],
        },
        {
          enonce: "Pair ou impair ? Écris le mot.\na) 14\nb) 23\nc) 30\nd) 47",
          correction:
            "Je regarde le chiffre des unités, le dernier chiffre.\na) 14 finit par 4 : pair. 14 objets se rangent par deux sans reste.\nb) 23 finit par 3 : impair.\nc) 30 finit par 0 : pair.\nd) 47 finit par 7 : impair.\n⛔ Le piège : regarder le premier chiffre. Pour 47, le 4 est pair, mais 47 est impair.\nRéponse : a) pair ; b) impair ; c) pair ; d) impair.",
          micros: ["ce1_nombre_parite"],
          reponses: [
            { question: "a)", attendu: PAIR },
            { question: "b)", attendu: IMPAIR },
            { question: "c)", attendu: PAIR },
            { question: "d)", attendu: IMPAIR },
          ],
        },
        {
          enonce: "Regarde les deux rectangles de billes.\na) Ont-ils autant de billes ? Réponds oui ou non.\nb) Je sais que 4 × 9 = 36. Combien fait 9 × 4 ?",
          figure: billes([
            { rangees: 2, colonnes: 5 },
            { rangees: 5, colonnes: 2 },
          ]),
          correction:
            "a) À gauche : 2 rangées de 5, c'est 2 × 5 = 10.\nÀ droite : 5 rangées de 2, c'est 5 × 2 = 10.\nC'est le même rectangle, tourné. Oui, autant de billes.\nb) Changer l'ordre ne change pas le résultat : 9 × 4 = 4 × 9 = 36.\n⛔ Le piège : refaire tout le calcul, ou croire que le résultat change.\nRéponse : a) oui ; b) 36.",
          micros: ["ce1_multiplication_commutativite"],
          reponses: [
            { question: "a)", attendu: VRAI },
            { question: "b)", attendu: "36" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je lis l'histoire. Je cherche combien de fois, puis combien dans chaque groupe.",
      rappel: [
        "4 rangées de 5 salades : 4 × 5.",
        "2 × … = 16 : je cherche dans la table de 2.",
        "Par deux sans reste ? Le nombre est pair. Il en reste un ? Il est impair.",
      ],
      exercices: [
        {
          enonce: "Au potager, le jardinier plante 4 rangées de 5 salades.\na) Combien de salades a-t-il plantées ?\nb) Il plante encore une rangée de 5. Combien de salades en tout ?",
          figure: billes([{ rangees: 4, colonnes: 5 }]),
          correction:
            "a) 4 rangées de 5 : 4 × 5. Je compte de 5 en 5 : 5, 10, 15, 20.\nIl a planté 20 salades.\nb) Une rangée de plus : 5 rangées de 5. 20 + 5 = 25.\n⛔ Le piège du b) : ajouter 1 salade au lieu d'une rangée de 5.\nRéponse : a) 20 ; b) 25.",
          micros: ["ce1_multiplication_calculer", "ce1_table_5", "ce1_multiplication_sens"],
          reponses: [
            { question: "a)", attendu: ["20", "vingt"] },
            { question: "b)", attendu: ["25", "vingt-cinq"] },
          ],
        },
        {
          enonce: "Trouve le nombre qui manque.\na) 2 × … = 16\nb) 5 × … = 35\nc) … × 10 = 60",
          correction:
            "Je récite la table jusqu'au bon nombre.\na) Table de 2 : 2, 4, 6, 8, 10, 12, 14, 16. C'est 2 × 8. Il manque 8.\nb) Table de 5 : 5, 10, 15, 20, 25, 30, 35. C'est 5 × 7. Il manque 7.\nc) 60, c'est 6 dizaines : 6 × 10. Il manque 6.\n⛔ Le piège : multiplier les deux nombres, 2 × 16. On cherche combien de fois.\nRéponse : a) 8 ; b) 7 ; c) 6.",
          micros: ["ce1_table_2", "ce1_table_5", "ce1_table_10"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["7", "sept"] },
            { question: "c)", attendu: ["6", "six"] },
          ],
        },
        {
          enonce: "Pour le goûter, Zoé ouvre 3 paquets de 7 biscuits.\na) Quel calcul faut-il faire ? A) 3 + 7 B) 3 × 7 C) 7 − 3\nb) Combien de biscuits a-t-elle ?",
          correction:
            "a) 3 paquets, c'est 3 fois 7 biscuits : 3 × 7. Réponse B.\nb) J'ajoute 7 trois fois : 7 + 7 = 14. 14 + 7 = 21.\nElle a 21 biscuits.\n⛔ Le piège : faire 3 + 7 = 10. Il y a 7 biscuits dans CHAQUE paquet.\nRéponse : a) B ; b) 21.",
          micros: ["ce1_multiplication_symbole", "ce1_multiplication_sens"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 3 × 7"] },
            { question: "b)", attendu: ["21", "vingt et un"] },
          ],
        },
        {
          enonce: "Dans la cour, les élèves se mettent par deux.\na) Ils sont 18. Un élève reste-t-il seul ? Réponds oui ou non.\nb) Ils sont 25. Un élève reste-t-il seul ?\nc) 25 est-il pair ou impair ?",
          correction:
            "a) 18 = 2 × 9 : 9 paires, sans reste. Non, personne n'est seul.\nb) 2 × 12 = 24. Il reste 25 − 24 = 1 élève. Oui, un élève est seul.\nc) 25 ne se range pas par deux sans reste : 25 est impair.\n⛔ Le piège : regarder le 2 de 25. C'est le dernier chiffre, 5, qui compte.\nRéponse : a) non ; b) oui ; c) impair.",
          micros: ["ce1_nombre_parite", "ce1_table_2"],
          reponses: [
            { question: "a)", attendu: FAUX },
            { question: "b)", attendu: VRAI },
            { question: "c)", attendu: IMPAIR },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 3 × 5 = 5 × 3\nb) 4 × 2 = 4 + 2\nc) 10 × 6 = 6 × 10\nd) 2 × 8 = 8 + 8",
          correction:
            "a) 3 × 5 = 15 et 5 × 3 = 15. Vrai.\nb) 4 × 2 = 8, mais 4 + 2 = 6. Faux.\nc) 10 × 6 = 60 et 6 × 10 = 60. Vrai.\nd) 2 × 8 = 16 et 8 + 8 = 16. Vrai : 2 fois 8, c'est 8 + 8.\n⛔ Le piège du b) : confondre × et +. 4 × 2, c'est 4 fois 2, soit 2 + 2 + 2 + 2.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) vrai.",
          micros: ["ce1_multiplication_commutativite", "ce1_multiplication_sens"],
          reponses: [
            { question: "a)", attendu: VRAI },
            { question: "b)", attendu: FAUX },
            { question: "c)", attendu: VRAI },
            { question: "d)", attendu: VRAI },
          ],
        },
        {
          enonce: "Sur le front de mer de Saint-Gilles, une glace coûte 5 €.\na) Combien coûtent 7 glaces ?\nb) Combien coûtent 10 glaces ?",
          correction:
            "a) 7 glaces à 5 € : 7 × 5 = 5 × 7. Je compte de 5 en 5, sept fois.\n5, 10, 15, 20, 25, 30, 35. 7 glaces coûtent 35 €.\nb) 10 glaces : 10 × 5 = 50. 10 glaces coûtent 50 €.\n⛔ Le piège : faire 7 + 5 = 12. Chaque glace coûte 5 €.\nRéponse : a) 35 ; b) 50.",
          micros: ["ce1_table_5", "ce1_multiplication_calculer"],
          reponses: [
            { question: "a)", attendu: "35" },
            { question: "b)", attendu: "50" },
          ],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) 2 × 6 … 10\nb) 5 × 4 … 2 × 10\nc) 10 × 2 … 5 × 5",
          correction:
            "Je calcule chaque côté, puis je compare.\na) 2 × 6 = 12. 12 est plus grand que 10. Donc >.\nb) 5 × 4 = 20 et 2 × 10 = 20. Ils sont égaux. Donc =.\nc) 10 × 2 = 20 et 5 × 5 = 25. 20 est plus petit. Donc <.\n⛔ Le piège : comparer sans calculer. Au c), le 10 n'est pas un résultat.\nRéponse : a) > ; b) = ; c) <.",
          micros: ["ce1_multiplication_calculer", "ce1_multiplication_commutativite"],
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "=" },
            { question: "c)", attendu: "<" },
          ],
        },
        {
          enonce: "Un chat a 4 pattes.\na) Combien de pattes ont 5 chats ?\nb) Combien de pattes ont 10 chats ?",
          correction:
            "a) 5 chats de 4 pattes : 5 × 4 = 4 × 5. Je compte de 5 en 5 : 5, 10, 15, 20.\n5 chats ont 20 pattes.\nb) 10 chats : 10 × 4 = 40. 10 chats ont 40 pattes.\n⛔ Le piège : compter les chats, 5 ou 10, au lieu des pattes.\nRéponse : a) 20 ; b) 40.",
          micros: ["ce1_multiplication_sens", "ce1_multiplication_calculer"],
          reponses: [
            { question: "a)", attendu: ["20", "vingt"] },
            { question: "b)", attendu: ["40", "quarante"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Défis ───────────────────────── */
    {
      niveau: 3,
      titre: "Défis",
      consigne: "Je lis tout. Je cherche une étape après l'autre.",
      rappel: [
        "Je dessine au brouillon : des ronds, des paquets, des rangées.",
        "Combien de paquets ? Je cherche dans la table.",
        "À la fin, je relis la question.",
      ],
      exercices: [
        {
          titre: "Les bouquets du fleuriste",
          enonce: "Le fleuriste fait des bouquets de 5 roses.\nInès veut 40 roses.\na) Combien de bouquets doit-il faire ?\nb) Une rose coûte 2 €. Combien coûtent les 40 roses ?",
          correction:
            "a) Je compte de 5 en 5 jusqu'à 40 : 5, 10, 15, 20, 25, 30, 35, 40.\nJ'ai compté 8 bonds. 8 × 5 = 40 : 8 bouquets.\nb) 40 roses à 2 € : 40 × 2 = 2 × 40, le double de 40.\n40 + 40 = 80. Les roses coûtent 80 €.\n⛔ Le piège du a) : faire 40 × 5. On cherche combien de bouquets, pas combien de roses.\nRéponse : a) 8 ; b) 80.",
          micros: ["ce1_multiplication_defi", "ce1_table_5", "ce1_table_2"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: "80" },
          ],
        },
        {
          titre: "La grande roue",
          enonce: "La grande roue a 10 cabines. Le forain met 4 personnes dans chaque cabine.\na) Combien de personnes font un tour ?\nb) La roue fait 2 tours, avec de nouvelles personnes. Combien de personnes en tout ?",
          correction:
            "a) 10 cabines de 4 : 10 × 4 = 40. 40 personnes font un tour.\nb) 2 tours : 40 + 40 = 80. C'est le double de 40.\n⛔ Le piège du b) : garder 40. Au 2e tour, de nouvelles personnes montent.\nRéponse : a) 40 ; b) 80.",
          micros: ["ce1_table_10", "ce1_multiplication_defi"],
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b)", attendu: "80" },
          ],
        },
        {
          titre: "Les chaussettes",
          enonce: "Après la lessive, Tom trouve 17 chaussettes.\nIl fait des paires.\na) Combien de paires peut-il faire ?\nb) Combien de chaussettes restent seules ?\nc) 17 est-il pair ou impair ?",
          correction:
            "Une paire, c'est 2 chaussettes. Je compte de 2 en 2 : 2, 4, 6, 8, 10, 12, 14, 16.\na) 16 = 2 × 8. Il fait 8 paires.\nb) 17 − 16 = 1. Une chaussette reste seule.\nc) Il en reste une : 17 est impair.\n⛔ Le piège du a) : répondre 17 paires. Une paire, ce sont deux chaussettes.\nRéponse : a) 8 ; b) 1 ; c) impair.",
          micros: ["ce1_nombre_parite", "ce1_table_2", "ce1_multiplication_defi"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["1", "un", "une"] },
            { question: "c)", attendu: IMPAIR },
          ],
        },
        {
          titre: "Le jeu des mains",
          enonce: "Six enfants jouent à un jeu de mains.\nChaque enfant a 2 mains. Chaque main a 5 doigts.\na) Combien de mains y a-t-il ?\nb) Combien de doigts y a-t-il ?",
          correction:
            "a) 6 enfants, 2 mains chacun : 6 × 2 = 12 mains.\nb) 12 mains de 5 doigts. Je coupe 12 en 10 et 2.\n10 × 5 = 50. 2 × 5 = 10. 50 + 10 = 60.\nAutre chemin : un enfant a 10 doigts. 6 × 10 = 60.\n⛔ Le piège du b) : faire 6 × 5 = 30. On oublie alors la deuxième main.\nRéponse : a) 12 ; b) 60.",
          schema: ecranSeulement(billes([{ rangees: 6, colonnes: 10, coupe: 5 }])),
          micros: ["ce1_multiplication_defi", "ce1_table_2", "ce1_table_5", "ce1_table_10", "ce1_multiplication_calculer"],
          reponses: [
            { question: "a)", attendu: ["12", "douze"] },
            { question: "b)", attendu: "60" },
          ],
        },
      ],
    },
  ],
};
