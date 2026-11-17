// ─── Fiche d'exercices : la multiplication (CE2) — 20 exercices corrigés ──────
//
// 17/11/2026 : la feuille interactive de la notion `multiplication` du coach
// CE2 (« Multiplication », 7 micros). Sur la forme des feuilles du CM1
// (`maths-cm1-masse.tsx`, `maths-cm1-multiplication.tsx`) et du CE1
// (`maths-ce1-multiplication.tsx`) : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque
// niveau, corrigés à la première personne, étape par étape, avec le piège
// nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce2/maths/multiplication.bank.ts`) : les tables
// de 2 à 10, le sens (groupes égaux, rangées), les mots facteur, produit et
// multiple, la multiplication posée d'un nombre à 2 ou 3 chiffres par un
// nombre à 1 ou 2 chiffres, × 10 et × 100.
// ⛔ LIMITES DU CE2 : produits sous 10 000. × 10 et × 100 se font par la
// VALEUR DES CHIFFRES (chaque chiffre monte d'un rang), pas « on ajoute un 0 ».
// ⛔ Aucune question à rédiger : QCM par lettre, oui ou non, signe, un nombre.
// L'écriture « 4 × 6 » est vérifiée à la lettre (`exact`).
// ⛔ Des enfants de 7-8 ans : 18 mots au plus par phrase.
//
// Les pièges nommés : confondre rangées et colonnes (1), additionner les
// facteurs (2, 8), 7 × 8 = 54 (3), confondre facteur et produit (4), « on
// ajoute un zéro » (5, 13), oublier la retenue (7, 14, 15), décaler la 2e
// ligne d'une multiplication par 12 (11, 17, 18), oublier la rangée ajoutée
// (9), multiplier au lieu de chercher le facteur (10), croire que 42 est
// multiple de 5 parce qu'il est pair (12), comparer sans calculer (16),
// oublier un étage (19), comparer les prix des lots sans compter les
// maillots (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : œufs (8), cinéma (9), fleuriste et
// papeterie (13), sortie à la piscine (14), producteur de chouchous (15),
// maraîcher (17), salle de concert (18), chocolatier (19), club de foot (20).
// Les métiers : fleuriste (13), chauffeur de car (14), producteur (15),
// maraîcher (17), chocolatière (19).
// UN SEUL contexte réunionnais (15, les chouchous de Salazie, MODÈLE).
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS : des rectangles de billes (`billes`, rangées × colonnes),
// des boîtes (`paquets`), le tableau de numération pour × 10 (`numeration`),
// la multiplication posée SANS son résultat (`posee`).
//
// Micro-compétences (7/7) : ce2_tables_2_3_4_5_10 (2, 8, 13, 20),
// ce2_tables_6_7_8_9 (3, 9, 10, 12, 16, 19), ce2_multiplication_sens (1, 8,
// 9, 14, 19), ce2_multiplication_vocabulaire (4, 10, 12),
// ce2_multiplication_posee (6, 7, 11, 14, 15, 17, 18),
// ce2_multiplication_10_100 (5, 13, 16, 18), ce2_multiplication_defi (17,
// 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { billes, numeration, posee } from "@/lib/fiches-exercices/dessins-calcul-cm1";
import { paquets } from "@/lib/fiches-exercices/dessins-ce1-nombres-calcul";

const OUI = ["oui", "vrai"];
const NON = ["non", "faux"];

export const exercicesMultiplicationCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "multiplication",
  titre: "La multiplication",
  accroche:
    "Vingt exercices, du plus facile au défi. Lire un rectangle de billes. Les tables de 2 à 9. Les mots facteur, produit et multiple. Multiplier par 10 et par 100. Poser une multiplication. Un cinéma, des chouchous, une salle de concert et des chocolats. Lis le rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le résultat seul.",
      rappel: [
        "Dans 6 × 8 = 48, 6 et 8 sont les facteurs, 48 est le produit.",
        "× 10 : chaque chiffre monte d'un rang. 37 × 10 = 370.",
        "Pour poser, je multiplie d'abord les unités, puis je n'oublie pas la retenue.",
      ],
      exercices: [
        {
          enonce: "Regarde le rectangle de billes.\na) Écris la multiplication.\nb) Combien y a-t-il de billes en tout ?",
          figure: billes([{ rangees: 4, colonnes: 6 }]),
          correction:
            "a) Je compte les rangées, de gauche à droite : il y en a 4. Chaque rangée a 6 billes.\n4 rangées de 6 : j'écris 4 × 6.\nb) 4 × 6 = 24. Je vérifie : 6 + 6 + 6 + 6 = 24.\n⛔ Le piège : additionner 4 + 6 = 10. Il y a 6 billes dans CHAQUE rangée.\nRéponse : a) 4 × 6 ; b) 24.",
          micros: ["ce2_multiplication_sens"],
          reponses: [
            { question: "a)", attendu: ["4 × 6", "6 × 4", "4 x 6", "6 x 4"], exact: true },
            { question: "b)", attendu: "24" },
          ],
        },
        {
          enonce: "Les tables de 3, 4 et 5. Calcule.\na) 3 × 7\nb) 4 × 6\nc) 5 × 9\nd) 4 × 8",
          correction:
            "a) 3 × 7 : 7 + 7 + 7 = 21.\nb) 4 × 6 : le double de 2 × 6. 2 × 6 = 12, et 12 + 12 = 24.\nc) 5 × 9 : la moitié de 10 × 9 = 90. La moitié de 90, c'est 45.\nd) 4 × 8 : le double de 2 × 8 = 16. 16 + 16 = 32.\n⛔ Le piège : ajouter les deux nombres, 3 + 7 = 10.\nRéponse : a) 21 ; b) 24 ; c) 45 ; d) 32.",
          micros: ["ce2_tables_2_3_4_5_10"],
          reponses: [
            { question: "a)", attendu: "21" },
            { question: "b)", attendu: "24" },
            { question: "c)", attendu: "45" },
            { question: "d)", attendu: "32" },
          ],
        },
        {
          enonce: "Les tables de 6, 7, 8 et 9. Calcule.\na) 6 × 7\nb) 8 × 7\nc) 9 × 6\nd) 7 × 7",
          correction:
            "a) 6 × 7 = 42. Je peux faire 5 × 7 = 35, puis 35 + 7 = 42.\nb) 8 × 7 = 56. Je retiens : 5, 6, 7, 8 → 56 = 7 × 8.\nc) 9 × 6 = 54. Je fais 10 × 6 = 60, puis 60 − 6 = 54.\nd) 7 × 7 = 49.\n⛔ Le piège du b) : écrire 54. 54, c'est 9 × 6. 8 × 7 = 56.\nRéponse : a) 42 ; b) 56 ; c) 54 ; d) 49.",
          micros: ["ce2_tables_6_7_8_9"],
          reponses: [
            { question: "a)", attendu: "42" },
            { question: "b)", attendu: "56" },
            { question: "c)", attendu: "54" },
            { question: "d)", attendu: "49" },
          ],
        },
        {
          enonce: "Regarde le calcul 6 × 8 = 48.\na) 48 est : A) un facteur B) le produit C) la somme\nb) 6 est : A) un facteur B) le produit C) la différence\nc) 48 est-il un multiple de 8 ? Réponds oui ou non.",
          correction:
            "a) Le résultat d'une multiplication s'appelle le produit. Réponse B.\nb) Les nombres qu'on multiplie sont les facteurs. 6 est un facteur. Réponse A.\nc) 48 = 6 × 8 : 48 est dans la table de 8. Oui, c'est un multiple de 8.\n⛔ Le piège : dire « la somme ». La somme est le résultat d'une addition.\nRéponse : a) B ; b) A ; c) oui.",
          micros: ["ce2_multiplication_vocabulaire"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
            { question: "c)", attendu: OUI },
          ],
        },
        {
          enonce: "Multiplie par 10 ou par 100.\na) 37 × 10\nb) 45 × 100\nc) 100 × 60",
          figure: numeration(["M", "C", "D", "U"], [
            { label: "37", chiffres: "37" },
            { label: "37 × 10", chiffres: "???" },
          ]),
          correction:
            "a) × 10 : chaque chiffre monte d'un rang. Les 3 dizaines deviennent 3 centaines.\nLes 7 unités deviennent 7 dizaines. 37 × 10 = 370.\nb) × 100 : chaque chiffre monte de deux rangs. 4 dizaines → 4 milliers, 5 unités → 5 centaines.\n45 × 100 = 4 500.\nc) 100 × 60 = 60 × 100. 6 dizaines → 6 milliers. 6 000.\n⛔ Le piège du b) : monter d'un seul rang et écrire 450.\nRéponse : a) 370 ; b) 4 500 ; c) 6 000.",
          micros: ["ce2_multiplication_10_100"],
          reponses: [
            { question: "a)", attendu: "370" },
            { question: "b)", attendu: "4 500" },
            { question: "c)", attendu: "6 000" },
          ],
        },
        {
          enonce: "Pose et calcule 124 × 3.",
          figure: posee(["124", "3"], { signe: "×", traits: [1] }),
          correction:
            "Je multiplie chaque chiffre de 124 par 3, en commençant par les unités.\nUnités : 4 × 3 = 12. J'écris 2, je retiens 1.\nDizaines : 2 × 3 = 6. 6 + 1 = 7.\nCentaines : 1 × 3 = 3.\nLe résultat est 372.\n⛔ Le piège : oublier la retenue et écrire 362.\nRéponse : 372.",
          micros: ["ce2_multiplication_posee"],
          reponses: [{ attendu: "372" }],
        },
        {
          enonce: "Pose et calcule 235 × 4.",
          figure: posee(["235", "4"], { signe: "×", traits: [1] }),
          correction:
            "Unités : 5 × 4 = 20. J'écris 0, je retiens 2.\nDizaines : 3 × 4 = 12. 12 + 2 = 14. J'écris 4, je retiens 1.\nCentaines : 2 × 4 = 8. 8 + 1 = 9.\nLe résultat est 940.\n⛔ Le piège : ajouter la retenue avant de multiplier, (3 + 2) × 4.\nRéponse : 940.",
          micros: ["ce2_multiplication_posee"],
          reponses: [{ attendu: "940" }],
        },
        {
          enonce: "Chaque boîte contient 6 œufs.\na) Quel calcul donne le nombre d'œufs ? A) 5 + 6 B) 6 − 5 C) 5 × 6\nb) Combien y a-t-il d'œufs ?",
          figure: paquets([6, 6, 6, 6, 6], { couleur: "#fde68a" }),
          correction:
            "a) Je compte les boîtes : 5. Chaque boîte a 6 œufs.\n5 boîtes de 6 œufs : 5 × 6. Réponse C.\nb) 5 × 6 = 30. Il y a 30 œufs.\n⛔ Le piège : faire 5 + 6 = 11. On ajoute 6 cinq fois.\nRéponse : a) C ; b) 30.",
          micros: ["ce2_multiplication_sens", "ce2_tables_2_3_4_5_10"],
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "30" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je lis l'histoire. Je trouve combien de groupes et combien dans chaque groupe.",
      rappel: [
        "9 rangées de 8 fauteuils : 9 × 8.",
        "7 × … = 63 : je cherche dans la table de 7.",
        "34 × 12 = 34 × 2 + 34 × 10. La 2e ligne commence par un 0.",
      ],
      exercices: [
        {
          enonce: "Un cinéma a 9 rangées de 8 fauteuils.\na) Combien y a-t-il de fauteuils ?\nb) On ajoute une rangée de 8. Combien de fauteuils maintenant ?",
          correction:
            "a) 9 rangées de 8 : 9 × 8 = 72. Il y a 72 fauteuils.\nb) Une rangée de plus : 10 rangées de 8. 72 + 8 = 80.\nJe vérifie : 10 × 8 = 80.\n⛔ Le piège du b) : ajouter 1 fauteuil au lieu d'une rangée de 8.\nRéponse : a) 72 ; b) 80.",
          micros: ["ce2_tables_6_7_8_9", "ce2_multiplication_sens"],
          reponses: [
            { question: "a)", attendu: "72" },
            { question: "b)", attendu: "80" },
          ],
        },
        {
          enonce: "Trouve le facteur qui manque.\na) 7 × … = 63\nb) … × 8 = 48\nc) 8 × … = 64",
          correction:
            "Je récite la table jusqu'au produit.\na) Table de 7 : … 49, 56, 63. 7 × 9 = 63. Il manque 9.\nb) Table de 8 : 8, 16, 24, 32, 40, 48. 6 × 8 = 48. Il manque 6.\nc) 8 × 8 = 64. Il manque 8.\n⛔ Le piège : multiplier les deux nombres, 7 × 63. On cherche un facteur.\nRéponse : a) 9 ; b) 6 ; c) 8.",
          micros: ["ce2_tables_6_7_8_9", "ce2_multiplication_vocabulaire"],
          reponses: [
            { question: "a)", attendu: ["9", "neuf"] },
            { question: "b)", attendu: ["6", "six"] },
            { question: "c)", attendu: ["8", "huit"] },
          ],
        },
        {
          enonce: "Pose et calcule 34 × 12.",
          figure: posee(["34", "12"], { signe: "×", traits: [1] }),
          correction:
            "12 = 2 + 10. Je fais deux lignes.\n1re ligne, 34 × 2 : 4 × 2 = 8, 3 × 2 = 6. J'écris 68.\n2e ligne, 34 × 10 : j'écris d'abord un 0 aux unités, puis 34. J'écris 340.\nJ'additionne : 68 + 340 = 408.\n⛔ Le piège : oublier le 0 de la 2e ligne, et faire 68 + 34 = 102.\nRéponse : 408.",
          micros: ["ce2_multiplication_posee"],
          reponses: [{ attendu: "408" }],
        },
        {
          enonce: "Vrai ou faux ?\na) 35 est un multiple de 5.\nb) 42 est un multiple de 5.\nc) 42 est un multiple de 7.\nd) 56 est un multiple de 6.",
          correction:
            "Un multiple de 5 est dans la table de 5.\na) 35 = 7 × 5. Vrai.\nb) 40 = 8 × 5 et 45 = 9 × 5. 42 est entre les deux. Faux.\nc) 42 = 6 × 7. Vrai.\nd) 54 = 9 × 6 et 60 = 10 × 6. 56 est entre les deux. Faux.\n⛔ Le piège du d) : 56 est dans la table de 7 et de 8, pas de 6.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["ce2_multiplication_vocabulaire", "ce2_tables_6_7_8_9"],
          reponses: [
            { question: "a)", attendu: OUI },
            { question: "b)", attendu: NON },
            { question: "c)", attendu: OUI },
            { question: "d)", attendu: NON },
          ],
        },
        {
          enonce: "a) Le fleuriste vend 48 bouquets de 10 roses. Combien de roses vend-il ?\nb) À la papeterie, une boîte a 100 trombones. Combien de trombones dans 25 boîtes ?",
          correction:
            "a) 48 × 10 : chaque chiffre monte d'un rang. 4 dizaines → 4 centaines. 8 unités → 8 dizaines.\n48 × 10 = 480. Il vend 480 roses.\nb) 25 × 100 : chaque chiffre monte de deux rangs.\n2 dizaines → 2 milliers. 5 unités → 5 centaines. 25 × 100 = 2 500.\n⛔ Le piège : écrire 4 800 au a). × 10, c'est un seul rang.\nRéponse : a) 480 ; b) 2 500.",
          micros: ["ce2_multiplication_10_100", "ce2_tables_2_3_4_5_10"],
          reponses: [
            { question: "a)", attendu: "480" },
            { question: "b)", attendu: "2 500" },
          ],
        },
        {
          enonce: "Un car transporte 48 élèves. Six cars pleins partent à la piscine.\nCombien d'élèves vont à la piscine ?",
          figure: posee(["48", "6"], { signe: "×", traits: [1] }),
          correction:
            "6 cars de 48 élèves : 48 × 6.\nUnités : 8 × 6 = 48. J'écris 8, je retiens 4.\nDizaines : 4 × 6 = 24. 24 + 4 = 28.\nLe résultat est 288. 288 élèves vont à la piscine.\n⛔ Le piège : oublier la retenue et écrire 248.\nRéponse : 288.",
          micros: ["ce2_multiplication_posee", "ce2_multiplication_sens"],
          reponses: [{ attendu: "288" }],
        },
        {
          enonce: "À Salazie, un producteur range ses chouchous par barquettes de 4.\nIl remplit 125 barquettes.\nCombien de chouchous a-t-il rangés ?",
          figure: posee(["125", "4"], { signe: "×", traits: [1] }),
          correction:
            "125 barquettes de 4 : 125 × 4.\nUnités : 5 × 4 = 20. J'écris 0, je retiens 2.\nDizaines : 2 × 4 = 8. 8 + 2 = 10. J'écris 0, je retiens 1.\nCentaines : 1 × 4 = 4. 4 + 1 = 5. Le résultat est 500.\nAutre chemin : 100 × 4 = 400 et 25 × 4 = 100. 400 + 100 = 500.\n⛔ Le piège : oublier la 2e retenue et écrire 400.\nRéponse : 500.",
          micros: ["ce2_multiplication_posee"],
          reponses: [{ attendu: "500" }],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) 6 × 8 … 7 × 7\nb) 9 × 4 … 6 × 6\nc) 8 × 9 … 7 × 10",
          correction:
            "Je calcule chaque côté, puis je compare.\na) 6 × 8 = 48 et 7 × 7 = 49. 48 est plus petit. Donc <.\nb) 9 × 4 = 36 et 6 × 6 = 36. Égaux. Donc =.\nc) 8 × 9 = 72 et 7 × 10 = 70. 72 est plus grand. Donc >.\n⛔ Le piège : comparer les facteurs sans calculer. Au c), 10 ne dit pas que c'est plus grand.\nRéponse : a) < ; b) = ; c) >.",
          micros: ["ce2_tables_6_7_8_9", "ce2_multiplication_10_100"],
          reponses: [
            { question: "a)", attendu: "<" },
            { question: "b)", attendu: "=" },
            { question: "c)", attendu: ">" },
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
        "Je dessine au brouillon : des rangées, des boîtes, des étages.",
        "Je pose avec le plus petit nombre en bas.",
        "À la fin, je relis la question.",
      ],
      exercices: [
        {
          titre: "Le champ du maraîcher",
          enonce: "Un maraîcher plante 24 rangées de 15 salades.\na) Combien de salades plante-t-il ?\nb) Il en vend 200. Combien lui en reste-t-il ?",
          correction:
            "a) Je pose 24 × 15. 15 = 5 + 10.\n1re ligne, 24 × 5 : 4 × 5 = 20, j'écris 0, je retiens 2. 2 × 5 = 10, 10 + 2 = 12. J'écris 120.\n2e ligne, 24 × 10 : j'écris 240.\n120 + 240 = 360. Il plante 360 salades.\nb) 360 − 200 = 160. Il lui en reste 160.\n⛔ Le piège : oublier le 0 de la 2e ligne. 24 × 10 = 240, pas 24.\nRéponse : a) 360 ; b) 160.",
          micros: ["ce2_multiplication_defi", "ce2_multiplication_posee"],
          reponses: [
            { question: "a)", attendu: "360" },
            { question: "b)", attendu: "160" },
          ],
        },
        {
          titre: "La salle de concert",
          enonce: "Une salle a 12 rangées de 35 places. Une place coûte 10 €.\na) Combien y a-t-il de places ?\nb) La salle est pleine. Combien d'argent rapportent les places ?",
          correction:
            "a) Je pose 35 × 12. 12 = 2 + 10.\n1re ligne, 35 × 2 = 70. 2e ligne, 35 × 10 = 350.\n70 + 350 = 420. Il y a 420 places.\nb) 420 places à 10 € : 420 × 10. Chaque chiffre monte d'un rang : 4 200.\nLes places rapportent 4 200 €.\n⛔ Le piège du b) : écrire 4 210. × 10 ne veut pas dire + 10.\nRéponse : a) 420 ; b) 4 200.",
          micros: ["ce2_multiplication_defi", "ce2_multiplication_posee", "ce2_multiplication_10_100"],
          reponses: [
            { question: "a)", attendu: "420" },
            { question: "b)", attendu: "4 200" },
          ],
        },
        {
          titre: "Les boîtes de la chocolatière",
          enonce: "Une boîte de chocolats a 3 étages.\nChaque étage a 4 rangées de 6 chocolats.\na) Combien de chocolats dans un étage ?\nb) Combien dans une boîte ?\nc) Combien dans 8 boîtes ?",
          figure: billes([{ rangees: 4, colonnes: 6 }]),
          correction:
            "a) Un étage : 4 rangées de 6. 4 × 6 = 24.\nb) Une boîte : 3 étages de 24. 24 × 3 = 72.\nc) 8 boîtes : 72 × 8. 2 × 8 = 16, j'écris 6, je retiens 1.\n7 × 8 = 56. 56 + 1 = 57. Le résultat est 576.\n⛔ Le piège du b) : oublier les étages et répondre 24.\nRéponse : a) 24 ; b) 72 ; c) 576.",
          micros: ["ce2_multiplication_defi", "ce2_multiplication_sens", "ce2_tables_6_7_8_9"],
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "72" },
            { question: "c)", attendu: "576" },
          ],
        },
        {
          titre: "Les maillots du club",
          enonce: "Le club de foot veut 15 maillots.\nMagasin A : 9 € le maillot.\nMagasin B : des lots de 5 maillots, à 40 € le lot.\na) Combien paie le club au magasin A ?\nb) Combien paie-t-il au magasin B ?\nc) Quel magasin est le moins cher ? A ou B ?",
          correction:
            "a) 15 maillots à 9 € : 15 × 9 = 10 × 9 + 5 × 9 = 90 + 45 = 135. Il paie 135 €.\nb) 15 maillots, c'est 3 lots de 5. 3 lots à 40 € : 3 × 40 = 120. Il paie 120 €.\nc) 120 < 135. Le magasin B est le moins cher.\n⛔ Le piège du b) : faire 15 × 40. Il faut 3 lots, pas 15.\nRéponse : a) 135 ; b) 120 ; c) B.",
          micros: ["ce2_multiplication_defi", "ce2_tables_2_3_4_5_10"],
          reponses: [
            { question: "a)", attendu: "135" },
            { question: "b)", attendu: "120" },
            { question: "c)", attendu: "B" },
          ],
        },
      ],
    },
  ],
};
