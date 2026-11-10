// ─── Fiche d'exercices : les tables de multiplication (CM1) — 20 exercices ────
//
// 10/11/2026 : la feuille de la notion `tables_multiplication` du coach CM1
// (12 micros, tables de 2 à 10, tables mélangées, facteur manquant, défis).
// Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel
// avant chaque niveau, corrigés à la première personne, étape par étape, avec
// le piège nommé. Alignée sur la carte mentale `cm1/tables_multiplication`
// (`lib/cartes/remplies/cm1.json`) : le double (2), le double du double (4),
// le double de la table de 3 (6), « 10 fois moins une fois » (9), partir d'un
// résultat connu, chercher le facteur qui manque.
// ⛔ Aucune question à rédiger : un nombre, vrai ou faux, un signe, une lettre.
// ⛔ Les mélanges classiques nommés : 7 × 8 = 56 et 6 × 9 = 54 (8, 9) ;
// 5 × 9 = 54 (2) ; 10 × 12 = 1 012 (7) ; 42 − 6 au lieu de 42 ÷ 6 (10) ;
// 6 + 8 au lieu de 6 × 8 (17).
//
// ⭐ LES BILLES (Frédéric, 07/10) : le rectangle de billes donne la
// multiplication (1, 17) et ses deux lectures, rangées et colonnes (11).
//
// ⭐ LES MATHS SONT TRANSVERSALES : billes (1, 11), calendrier (5), cuisine
// (13, œufs), jeu de devinettes (19), concert (18), verger (17), insectes (20).
// Les métiers des problèmes : arboricultrice (17), régisseur de salle (18),
// cuisinier (13), entomologiste (20).
//
// ⭐ DES FAITS RÉELS, et leurs sources :
//   · ex. 5 — une semaine a 7 jours (calendrier grégorien).
//   · ex. 20 — une araignée a 8 pattes, un insecte en a 6 (Larousse,
//     « araignée », « insecte » ; Vikidia, « Insecte »). La fourmi et la
//     coccinelle sont des insectes.
// Tout le reste est un MODÈLE.
//
// Micro-compétences : table_2 (2, 16), table_3 (3, 4, 19), table_4 (1, 3, 16),
// table_5 (2, 11, 19), table_6 (1, 4, 13, 16, 19, 20), table_7 (5, 18, 19),
// table_8 (6, 16, 17, 19, 20), table_9 (12, 18, 19), table_10 (2, 7),
// tables_melangees (8, 9, 14, 15), tables_trous (10, 11, 13, 16, 17),
// tables_defi (17, 18, 19, 20). 12/12.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { billes, tablePythagore } from "@/lib/fiches-exercices/dessins-calcul-cm1";

export const exercicesTablesMultiplicationCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "tables-multiplication",
  titre: "Les tables de multiplication",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire une multiplication sur un rectangle de billes. Retrouver les tables de 2 à 10 avec des astuces : le double, le double du double, « 10 fois moins une fois ». Lire la table de Pythagore. Trouver le nombre qui manque. Un calendrier, des œufs, un verger, un concert, des devinettes et des insectes. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un calcul par question. Si j'oublie un résultat, je pars d'un résultat que je connais.",
      rappel: [
        "$4 \\times 6$, c'est 4 fois 6 : $6 + 6 + 6 + 6 = 24$.",
        "Fois 2, c'est le double. Fois 4, c'est le double du double.",
        "La table de 5 finit toujours par 0 ou par 5.",
        "L'ordre ne change rien : $3 \\times 7 = 7 \\times 3$.",
      ],
      exercices: [
        {
          enonce: "Regarde le rectangle de billes.\na) Combien y a-t-il de rangées ?\nb) Combien de billes dans chaque rangée ?\nc) Combien de billes en tout ?",
          figure: billes([{ rangees: 4, colonnes: 6 }]),
          correction:
            "a) Je compte les lignes de billes, de haut en bas : 4 rangées.\nb) Je compte les billes d'une rangée : 6 billes.\nc) J'ai 4 rangées de 6 billes. C'est 4 fois 6 : $4 \\times 6 = 24$.\n⭐ Je vérifie en ajoutant : $6 + 6 + 6 + 6 = 24$.\n⛔ Le piège : faire $4 + 6 = 10$. Il n'y a pas 4 billes et 6 billes : il y a 4 FOIS 6 billes.\nRéponse : a) 4 rangées ; b) 6 billes ; c) 24 billes.",
          micros: ["table_4", "table_6"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["6", "six"] },
            { question: "c)", attendu: "24" },
          ],
        },
        {
          enonce: "Calcule.\na) $2 \\times 8$\nb) $5 \\times 7$\nc) $10 \\times 6$\nd) $5 \\times 9$",
          correction:
            "a) Fois 2, c'est le double. Le double de 8 : $8 + 8 = 16$.\nb) Je compte de 5 en 5, sept fois : 5, 10, 15, 20, 25, 30, 35. $5 \\times 7 = 35$.\nc) 6 unités, dix fois, font 6 dizaines : $10 \\times 6 = 60$.\nd) $5 \\times 9$ : je sais $5 \\times 10 = 50$. J'enlève un 5 : $50 - 5 = 45$.\n⛔ Le piège : écrire $5 \\times 9 = 54$. Dans la table de 5, tout finit par 0 ou par 5. 54 n'y est pas.\nRéponse : a) 16 ; b) 35 ; c) 60 ; d) 45.",
          micros: ["table_2", "table_5", "table_10"],
          reponses: [
            { question: "a)", attendu: "16" },
            { question: "b)", attendu: "35" },
            { question: "c)", attendu: "60" },
            { question: "d)", attendu: "45" },
          ],
        },
        {
          enonce: "Calcule.\na) $3 \\times 7$\nb) $4 \\times 6$\nc) $4 \\times 8$\nd) $3 \\times 9$",
          correction:
            "a) Je compte de 3 en 3 : 3, 6, 9, 12, 15, 18, 21. $3 \\times 7 = 21$.\nb) Fois 4, c'est le double du double. Le double de 6 fait 12. Le double de 12 fait 24. $4 \\times 6 = 24$.\nc) Le double de 8 fait 16. Le double de 16 fait 32. $4 \\times 8 = 32$.\nd) $3 \\times 9$ : je sais $3 \\times 10 = 30$. J'enlève un 3 : $30 - 3 = 27$.\n⛔ Le piège : écrire $3 \\times 7 = 27$. 27, c'est $3 \\times 9$.\nRéponse : a) 21 ; b) 24 ; c) 32 ; d) 27.",
          micros: ["table_3", "table_4"],
          reponses: [
            { question: "a)", attendu: "21" },
            { question: "b)", attendu: "24" },
            { question: "c)", attendu: "32" },
            { question: "d)", attendu: "27" },
          ],
        },
        {
          enonce: "Je sais que $3 \\times 7 = 21$, $3 \\times 8 = 24$ et $3 \\times 6 = 18$.\nLa table de 6 est le double de la table de 3.\na) Combien font $6 \\times 7$ ?\nb) Combien font $6 \\times 8$ ?\nc) Combien font $6 \\times 6$ ?",
          correction:
            "6, c'est le double de 3. Donc $6 \\times 7$ est le double de $3 \\times 7$.\na) Le double de 21 : $21 + 21 = 42$. $6 \\times 7 = 42$.\nb) Le double de 24 : $24 + 24 = 48$. $6 \\times 8 = 48$.\nc) Le double de 18 : $18 + 18 = 36$. $6 \\times 6 = 36$.\n⛔ Le piège : écrire $6 \\times 7 = 36$. 36, c'est $6 \\times 6$. Pour $6 \\times 7$, il y a un 6 de plus : $36 + 6 = 42$.\nRéponse : a) 42 ; b) 48 ; c) 36.",
          micros: ["table_3", "table_6"],
          reponses: [
            { question: "a)", attendu: "42" },
            { question: "b)", attendu: "48" },
            { question: "c)", attendu: "36" },
          ],
        },
        {
          enonce: "Une semaine a 7 jours.\na) Combien de jours dans 3 semaines ?\nb) Combien de jours dans 6 semaines ?\nc) Combien de jours dans 8 semaines ?",
          correction:
            "Une semaine, c'est 7 jours. Pour plusieurs semaines, je multiplie par 7.\na) 3 semaines : $3 \\times 7 = 21$ jours.\nb) 6 semaines : $6 \\times 7 = 42$ jours. C'est le double de 21.\nc) 8 semaines : $8 \\times 7 = 56$ jours. Je pars de $7 \\times 7 = 49$, puis $49 + 7 = 56$.\n⛔ Le piège : écrire $8 \\times 7 = 54$. 54, c'est $6 \\times 9$. Je retiens : 5, 6, 7, 8 donne $56 = 7 \\times 8$.\nRéponse : a) 21 jours ; b) 42 jours ; c) 56 jours.",
          micros: ["table_7"],
          reponses: [
            { question: "a)", attendu: "21" },
            { question: "b)", attendu: "42" },
            { question: "c)", attendu: "56" },
          ],
        },
        {
          enonce: "La table de 8 est le double de la table de 4.\nCalcule.\na) $8 \\times 3$\nb) $8 \\times 5$\nc) $8 \\times 7$\nd) $8 \\times 9$",
          correction:
            "Pour $8 \\times$ un nombre, je fais $4 \\times$ ce nombre, puis le double.\na) $4 \\times 3 = 12$. Le double : $12 + 12 = 24$. $8 \\times 3 = 24$.\nb) $4 \\times 5 = 20$. Le double : $20 + 20 = 40$. $8 \\times 5 = 40$.\nc) $4 \\times 7 = 28$. Le double : $28 + 28 = 56$. $8 \\times 7 = 56$.\nd) $4 \\times 9 = 36$. Le double : $36 + 36 = 72$. $8 \\times 9 = 72$.\n⛔ Le piège : écrire $8 \\times 7 = 64$. 64, c'est $8 \\times 8$.\nRéponse : a) 24 ; b) 40 ; c) 56 ; d) 72.",
          micros: ["table_8"],
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "40" },
            { question: "c)", attendu: "56" },
            { question: "d)", attendu: "72" },
          ],
        },
        {
          enonce: "Calcule.\na) $10 \\times 7$\nb) $10 \\times 9$\nc) $10 \\times 12$\nd) $10 \\times 25$",
          correction:
            "Fois 10 : chaque unité devient une dizaine. Chaque chiffre monte d'une colonne.\na) 7 unités deviennent 7 dizaines : $10 \\times 7 = 70$.\nb) 9 unités deviennent 9 dizaines : $10 \\times 9 = 90$.\nc) 12, c'est 1 dizaine et 2 unités. Elles deviennent 1 centaine et 2 dizaines : $10 \\times 12 = 120$.\nd) 25, c'est 2 dizaines et 5 unités. Elles deviennent 2 centaines et 5 dizaines : $10 \\times 25 = 250$.\n⛔ Le piège : coller 10 devant 12 et écrire $1\\,012$. Fois 10, c'est 12 dizaines : 120.\nRéponse : a) 70 ; b) 90 ; c) 120 ; d) 250.",
          micros: ["table_10"],
          reponses: [
            { question: "a)", attendu: "70" },
            { question: "b)", attendu: "90" },
            { question: "c)", attendu: "120" },
            { question: "d)", attendu: "250" },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) $7 \\times 8 = 54$\nb) $6 \\times 9 = 54$\nc) $4 \\times 7 = 28$\nd) $9 \\times 7 = 72$",
          correction:
            "Je refais chaque calcul, puis je compare.\na) $7 \\times 8 = 56$, pas 54. Faux.\nb) $6 \\times 9$ : $6 \\times 10 = 60$, moins 6, font 54. Vrai.\nc) $4 \\times 7$ : le double de 7 fait 14, le double de 14 fait 28. Vrai.\nd) $9 \\times 7$ : $10 \\times 7 = 70$, moins 7, font 63. 72, c'est $9 \\times 8$. Faux.\n⛔ Le piège : mélanger $7 \\times 8 = 56$ et $6 \\times 9 = 54$. Ce sont les deux résultats qu'on confond le plus.\nRéponse : a) faux ; b) vrai ; c) vrai ; d) faux.",
          micros: ["tables_melangees"],
          reponses: [
            { question: "a)", attendu: ["faux", "non"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["vrai", "oui"] },
            { question: "d)", attendu: ["faux", "non"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je cherche dans la table, ou je pars d'un résultat que je connais.",
      rappel: [
        "Dans la table de Pythagore, je croise une ligne et une colonne : $7 \\times 8 = 56$.",
        "Un nombre qui manque : $6 \\times \\ldots = 42$. Je cherche dans la table de 6 : $6 \\times 7 = 42$.",
        "Fois 9 : 10 fois le nombre, moins une fois le nombre. $9 \\times 6 = 60 - 6 = 54$.",
      ],
      exercices: [
        {
          enonce: "Voici un morceau de la table de multiplication.\nQuel nombre cache chaque lettre ?\na) A\nb) B\nc) C\nd) D",
          figure: tablePythagore([6, 7, 8, 9], [6, 7, 8, 9], { "7x8": "A", "9x6": "B", "8x8": "C", "9x9": "D" }),
          correction:
            "Je lis la ligne de la lettre, puis sa colonne. Je multiplie les deux nombres.\na) A est sur la ligne 7 et dans la colonne 8 : $7 \\times 8 = 56$.\nb) B est sur la ligne 9 et dans la colonne 6 : $9 \\times 6 = 60 - 6 = 54$.\nc) C est sur la ligne 8 et dans la colonne 8 : $8 \\times 8 = 64$.\nd) D est sur la ligne 9 et dans la colonne 9 : $9 \\times 9 = 90 - 9 = 81$.\n⛔ Le piège : AJOUTER la ligne et la colonne. Pour A, on trouverait $7 + 8 = 15$.\nRéponse : a) 56 ; b) 54 ; c) 64 ; d) 81.",
          micros: ["tables_melangees"],
          reponses: [
            { question: "a)", attendu: "56" },
            { question: "b)", attendu: "54" },
            { question: "c)", attendu: "64" },
            { question: "d)", attendu: "81" },
          ],
        },
        {
          enonce: "Complète avec le nombre qui manque.\na) $6 \\times \\ldots = 42$\nb) $\\ldots \\times 8 = 72$\nc) $7 \\times \\ldots = 35$\nd) $4 \\times \\ldots = 32$",
          correction:
            "Je récite la table du nombre donné, jusqu'au résultat.\na) Table de 6 : $6 \\times 7 = 42$. Il manque 7.\nb) Table de 8 : $8 \\times 9 = 72$, donc $9 \\times 8 = 72$. Il manque 9.\nc) Table de 7 : $7 \\times 5 = 35$. Il manque 5.\nd) Table de 4 : $4 \\times 8 = 32$. Il manque 8.\n⭐ Je vérifie en multipliant : $6 \\times 7 = 42$, juste.\n⛔ Le piège : faire une soustraction, $42 - 6 = 36$. On cherche combien de FOIS 6 font 42.\nRéponse : a) 7 ; b) 9 ; c) 5 ; d) 8.",
          micros: ["tables_trous"],
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "5" },
            { question: "d)", attendu: "8" },
          ],
        },
        {
          enonce: "Ce sont les MÊMES billes, lues de deux façons.\nÀ gauche, je les entoure par rangées. À droite, par colonnes.\na) À gauche : combien de rangées de 5 billes ?\nb) À droite : combien de colonnes de 3 billes ?\nc) Combien de billes en tout ?",
          figure: billes([
            { rangees: 3, colonnes: 5, cadre: "rangees", legende: "par rangées" },
            { rangees: 3, colonnes: 5, cadre: "colonnes", legende: "par colonnes" },
          ]),
          correction:
            "a) Je compte les cadres orange : 3 rangées de 5 billes. C'est $3 \\times 5$.\nb) Je compte les cadres verts : 5 colonnes de 3 billes. C'est $5 \\times 3$.\nc) $3 \\times 5 = 15$ et $5 \\times 3 = 15$. Je n'ai bougé aucune bille : il y en a 15.\n⭐ C'est pour cela que l'ordre ne compte pas : $3 \\times 5 = 5 \\times 3$. Si je connais l'un, je connais l'autre.\n⛔ Le piège : croire qu'il y a plus de billes à droite parce qu'il y a plus de cadres. Les cadres sont plus petits.\nRéponse : a) 3 rangées ; b) 5 colonnes ; c) 15 billes.",
          micros: ["table_5", "tables_trous"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: "15" },
          ],
        },
        {
          enonce: "Pour la table de 9, Inès fait : 10 fois le nombre, moins une fois le nombre.\na) $10 \\times 7 = \\ldots$\nb) $70 - 7 = \\ldots$ : c'est $9 \\times 7$.\nc) Avec la même astuce, calcule $9 \\times 8$.\nd) Calcule $9 \\times 6$.",
          correction:
            "9 fois, c'est 10 fois moins une fois.\na) 7 unités deviennent 7 dizaines : $10 \\times 7 = 70$.\nb) $70 - 7 = 63$. Donc $9 \\times 7 = 63$.\nc) $10 \\times 8 = 80$, puis $80 - 8 = 72$. Donc $9 \\times 8 = 72$.\nd) $10 \\times 6 = 60$, puis $60 - 6 = 54$. Donc $9 \\times 6 = 54$.\n⭐ Je vérifie : dans la table de 9, la somme des chiffres fait 9. $6 + 3 = 9$, $7 + 2 = 9$, $5 + 4 = 9$.\n⛔ Le piège : enlever 9 au lieu du nombre. $80 - 9 = 71$ est faux : j'enlève une fois 8.\nRéponse : a) 70 ; b) 63 ; c) 72 ; d) 54.",
          micros: ["table_9"],
          reponses: [
            { question: "a)", attendu: "70" },
            { question: "b)", attendu: "63" },
            { question: "c)", attendu: "72" },
            { question: "d)", attendu: "54" },
          ],
        },
        {
          enonce: "Au restaurant, une boîte contient 6 œufs.\na) Combien d'œufs dans 4 boîtes ?\nb) Combien d'œufs dans 7 boîtes ?\nc) Le cuisinier a besoin de 48 œufs. Combien de boîtes doit-il ouvrir ?",
          correction:
            "Chaque boîte a 6 œufs : je multiplie par 6.\na) 4 boîtes : $4 \\times 6 = 24$ œufs.\nb) 7 boîtes : $7 \\times 6 = 42$ œufs.\nc) Je cherche $\\ldots \\times 6 = 48$. Dans la table de 6 : $8 \\times 6 = 48$. Il ouvre 8 boîtes.\n⛔ Le piège du c) : faire $48 - 6 = 42$. On cherche le NOMBRE de boîtes de 6.\nRéponse : a) 24 œufs ; b) 42 œufs ; c) 8 boîtes.",
          micros: ["table_6", "tables_trous"],
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "42" },
            { question: "c)", attendu: "8" },
          ],
        },
        {
          enonce: "Choisis la bonne réponse.\na) Quel calcul donne 36 ? A) $4 \\times 8$ B) $5 \\times 7$ C) $6 \\times 6$\nb) Quel calcul donne 56 ? A) $7 \\times 8$ B) $6 \\times 9$ C) $8 \\times 8$",
          correction:
            "Je calcule chaque choix.\na) $4 \\times 8 = 32$. $5 \\times 7 = 35$. $6 \\times 6 = 36$. C'est le choix C.\nb) $7 \\times 8 = 56$. $6 \\times 9 = 54$. $8 \\times 8 = 64$. C'est le choix A.\n⛔ Le piège du a) : choisir B parce que 35 est tout près de 36. Près ne suffit pas.\nRéponse : a) C ; b) A.",
          micros: ["tables_melangees"],
          reponses: [
            { question: "a)", attendu: ["C", "c) 6 × 6", "6 × 6"] },
            { question: "b)", attendu: ["A", "a) 7 × 8", "7 × 8"] },
          ],
        },
        {
          enonce: "Compare avec $<$, $>$ ou $=$.\na) $6 \\times 7$ … $5 \\times 8$\nb) $9 \\times 4$ … $6 \\times 6$\nc) $8 \\times 3$ … $5 \\times 5$\nd) $7 \\times 7$ … $8 \\times 6$",
          correction:
            "Je calcule chaque côté, puis je compare les résultats.\na) $6 \\times 7 = 42$ et $5 \\times 8 = 40$. $42 > 40$.\nb) $9 \\times 4 = 36$ et $6 \\times 6 = 36$. Égaux : $=$.\nc) $8 \\times 3 = 24$ et $5 \\times 5 = 25$. $24 < 25$.\nd) $7 \\times 7 = 49$ et $8 \\times 6 = 48$. $49 > 48$.\n⛔ Le piège : comparer les nombres de gauche, 7 et 8 au d). C'est le résultat qui compte.\nRéponse : a) $>$ ; b) $=$ ; c) $<$ ; d) $>$.",
          micros: ["tables_melangees"],
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "=" },
            { question: "c)", attendu: "<" },
            { question: "d)", attendu: ">" },
          ],
        },
        {
          enonce: "Le nombre 24 est dans plusieurs tables.\na) $24 = 3 \\times \\ldots$\nb) $24 = 4 \\times \\ldots$\nc) $24 = 2 \\times \\ldots$\nd) 24 est-il dans la table de 5 ? Réponds oui ou non.",
          correction:
            "a) Table de 3 : $3 \\times 8 = 24$. Il manque 8.\nb) Table de 4 : $4 \\times 6 = 24$. Il manque 6.\nc) Table de 2 : le double de 12 fait 24. $2 \\times 12 = 24$. Il manque 12.\nd) La table de 5 finit par 0 ou par 5. 24 finit par 4 : non.\n⭐ $5 \\times 4 = 20$ et $5 \\times 5 = 25$ : 24 tombe entre les deux.\n⛔ Le piège : croire qu'un nombre est dans une seule table. 24 est dans les tables de 2, 3, 4, 6 et 8.\nRéponse : a) 8 ; b) 6 ; c) 12 ; d) non.",
          micros: ["tables_trous", "table_2", "table_4"],
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "12" },
            { question: "d)", attendu: ["non", "faux"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis deux fois. Je fais un dessin en rangées avant de calculer.",
      rappel: [
        "Des rangées égales : je multiplie le nombre de rangées par le nombre dans chaque rangée.",
        "« 6 rangées de 8 », c'est $6 \\times 8$, pas $6 + 8$.",
        "Je vérifie toujours le résultat avec la table.",
      ],
      exercices: [
        {
          titre: "Le verger",
          enonce: "Une arboricultrice plante 6 rangées de 8 pommiers.\na) Combien de pommiers a-t-elle plantés ?\nb) Elle plante encore 2 rangées de 8. Combien de pommiers en tout ?\nc) L'an prochain, elle veut 56 pommiers en 7 rangées égales. Combien par rangée ?",
          figure: billes([{ rangees: 6, colonnes: 8, legende: "6 rangées de 8" }]),
          correction:
            "a) 6 rangées de 8 : $6 \\times 8 = 48$ pommiers. Je pars de $6 \\times 4 = 24$, puis le double : 48.\nb) Elle a maintenant $6 + 2 = 8$ rangées de 8. $8 \\times 8 = 64$ pommiers.\n⭐ Je vérifie autrement : $2 \\times 8 = 16$, et $48 + 16 = 64$.\nc) Je cherche $7 \\times \\ldots = 56$. Table de 7 : $7 \\times 8 = 56$. Il y a 8 pommiers par rangée.\n⛔ Le piège : faire $6 + 8 = 14$ au a). Il y a 6 FOIS 8 arbres.\nRéponse : a) 48 pommiers ; b) 64 pommiers ; c) 8 pommiers.",
          micros: ["table_8", "tables_trous", "tables_defi"],
          reponses: [
            { question: "a)", attendu: "48" },
            { question: "b)", attendu: "64" },
            { question: "c)", attendu: "8" },
          ],
        },
        {
          titre: "Le concert",
          enonce: "Un régisseur installe la salle d'un concert.\nIl place 9 rangs de 7 chaises.\na) Combien de chaises a-t-il placées ?\nb) 70 personnes viennent. Combien de chaises manquent ?\nc) Il ajoute un rang de 7 chaises. Tout le monde est-il assis ? Réponds oui ou non.",
          correction:
            "a) 9 rangs de 7 : $9 \\times 7$. Je fais $10 \\times 7 = 70$, moins 7 : 63 chaises.\nb) Il faut 70 chaises. Il en a 63. Il manque $70 - 63 = 7$ chaises.\nc) Avec un rang de plus, il a 10 rangs de 7 : $10 \\times 7 = 70$ chaises. 70 chaises pour 70 personnes : oui.\n⛔ Le piège : écrire $9 \\times 7 = 72$. 72, c'est $9 \\times 8$.\nRéponse : a) 63 chaises ; b) 7 chaises ; c) oui.",
          micros: ["table_7", "table_9", "tables_defi"],
          reponses: [
            { question: "a)", attendu: "63" },
            { question: "b)", attendu: "7" },
            { question: "c)", attendu: ["oui", "vrai"] },
          ],
        },
        {
          titre: "Devinettes",
          enonce: "Trouve le nombre mystère.\na) Je suis dans la table de 6 et dans la table de 8. Je suis plus petit que 30.\nb) Je suis dans la table de 5 et dans la table de 7. Je suis plus petit que 50.\nc) Je suis dans la table de 9. Je suis entre 50 et 60.",
          correction:
            "J'écris la table, puis je garde les nombres qui vont.\na) Table de 6 : 6, 12, 18, 24, 30… Table de 8 : 8, 16, 24, 32… Le nombre commun plus petit que 30 est 24.\nb) Table de 7 : 7, 14, 21, 28, 35, 42, 49. Un seul finit par 0 ou par 5 : 35. Et $5 \\times 7 = 35$.\nc) Table de 9 : 45, 54, 63. Entre 50 et 60, il y a 54.\n⛔ Le piège : s'arrêter au premier nombre d'une seule table. Il faut qu'il soit dans LES DEUX tables.\nRéponse : a) 24 ; b) 35 ; c) 54.",
          micros: ["table_6", "table_8", "table_5", "table_7", "table_9", "table_3", "tables_defi"],
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "35" },
            { question: "c)", attendu: "54" },
          ],
        },
        {
          titre: "Les pattes",
          enonce: "Une entomologiste étudie de petites bêtes.\nUne araignée a 8 pattes. Un insecte a 6 pattes.\na) Combien de pattes ont 5 araignées ?\nb) Combien de pattes ont 7 coccinelles ?\nc) Dans un bocal, il y a 4 araignées et 4 fourmis. Combien de pattes en tout ?",
          correction:
            "La coccinelle et la fourmi sont des insectes : 6 pattes chacune.\na) 5 araignées : $5 \\times 8 = 40$ pattes.\nb) 7 coccinelles : $7 \\times 6 = 42$ pattes.\nc) Les araignées : $4 \\times 8 = 32$ pattes. Les fourmis : $4 \\times 6 = 24$ pattes. En tout : $32 + 24 = 56$ pattes.\n⭐ Autre façon : une araignée et une fourmi ont $8 + 6 = 14$ pattes. 4 fois : $4 \\times 14 = 56$.\n⛔ Le piège du c) : compter 8 bêtes de 8 pattes, soit 64. Les fourmis n'ont que 6 pattes.\nRéponse : a) 40 pattes ; b) 42 pattes ; c) 56 pattes.",
          micros: ["table_8", "table_6", "tables_defi"],
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b)", attendu: "42" },
            { question: "c)", attendu: "56" },
          ],
        },
      ],
    },
  ],
};
