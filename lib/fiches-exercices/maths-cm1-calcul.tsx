// ─── Fiche d'exercices : le calcul (CM1) — 20 exercices corrigés ──────────────
//
// 10/11/2026 : la feuille de la notion `calcul` du coach CM1 (10 micros), sur
// la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant
// chaque niveau, corrigés à la première personne, étape par étape, avec le
// piège nommé. Chaque exercice a ses `reponses` (vérifiées sans IA).
//
// Alignée sur les banques du coach (`questionBank/cm1/maths/calcul.bank.ts`,
// `calcul-trous.bank.ts`) et sur la carte mentale `cm1/calcul`
// (`lib/cartes/remplies/cm1.json`) : calcul mental, addition et soustraction
// posées, multiplication simple posée, décimaux simples (+ et −), calculs à
// trous, priorités (parenthèses, puis ×), estimer, procédures (+ 9, × 5,
// regrouper), défis.
// ⛔ LIMITES DU CM1 : des entiers jusqu'au million, des décimaux jusqu'aux
// centièmes, une multiplication par un nombre d'un chiffre, pas de division.
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, un nombre.
//
// Les pièges nommés : la dizaine oubliée (1), + 9 fait + 10 + 1 (2, 15), écrire
// 15 dans une colonne (3), 8 − 4 au lieu de 14 − 8 (4), l'opération à
// l'envers dans un trou (5, 12), la retenue de la multiplication (6), aligner
// les chiffres au lieu des virgules (7, 16), le zéro qui manque (8, 18),
// calculer de gauche à droite (9, 20), un ordre de grandeur faux (10), croire
// un calcul sans le vérifier (11), un prix sans la virgule (13), soustraire
// le mauvais nombre (14, 17), oublier un nombre dans le total (19).
//
// ⭐ LES MATHS SONT TRANSVERSALES : marché (13), course à pied (14), cantine
// (17), menuiserie (18), voyage de classe et musée (19), épicerie (20).
// Les métiers des problèmes : cantinière (17), menuisier (18), guide (19),
// caissière (20). Aucun fait réel : tous les nombres sont des MODÈLES.
//
// Micro-compétences : calcul_mental (1, 5, 12, 14), calcul_addition_posee (3,
// 14, 16, 17, 19), calcul_soustraction_posee (4, 14, 16, 17, 19),
// calcul_multiplication_posee (6, 16, 17, 19), calcul_decimal_addition (7, 11,
// 13, 18), calcul_decimal_soustraction (8, 13, 16, 18), calcul_priorite (9,
// 11, 20), calcul_estimer (10, 13), calcul_procedures (2, 15),
// calcul_defi (12, 17, 18, 19, 20). 10/10.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ecranSeulement, pose } from "@/lib/fiches-exercices/dessins-cm1-nombres";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];

export const exercicesCalculCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "calcul",
  titre: "Le calcul",
  accroche:
    "Vingt exercices, du geste seul au problème. Calculer de tête, avec des astuces : + 9, × 5, regrouper. Poser une addition, une soustraction, une multiplication. Calculer avec des nombres à virgule. Trouver le nombre qui manque. Faire les × avant les +. Estimer un résultat. Un marché, une course, une cantine, un menuisier, un voyage de classe et une épicerie. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un calcul à la fois. Je pose l'opération au brouillon quand elle est longue.",
      rappel: [
        "De tête, je découpe un nombre : $47 + 25 = 47 + 20 + 5 = 72$.",
        "Pour poser, j'aligne les unités sous les unités. Je n'oublie pas les retenues.",
        "Avec des nombres à virgule, j'aligne les virgules. J'ajoute un $0$ s'il manque un chiffre.",
        "$+ 9$, c'est $+ 10$ puis $- 1$. $\\times 5$, c'est $\\times 10$ puis la moitié.",
      ],
      exercices: [
        {
          enonce: "Calcule de tête.\na) $47 + 25$\nb) $63 + 38$\nc) $85 - 27$\nd) $140 + 260$",
          reponses: [
            { question: "a)", attendu: "72" },
            { question: "b)", attendu: "101" },
            { question: "c)", attendu: "58" },
            { question: "d)", attendu: "400" },
          ],
          correction:
            "Je découpe le deuxième nombre en dizaines et en unités.\na) $47 + 20 = 67$, puis $67 + 5 = 72$.\nb) $63 + 30 = 93$, puis $93 + 8 = 101$.\nc) $85 - 20 = 65$, puis $65 - 7 = 58$.\nd) $140 + 260$ : $14$ dizaines et $26$ dizaines font $40$ dizaines. C'est $400$.\n⛔ Le piège du a) : trouver $62$. $7 + 5 = 12$ : je garde la dizaine.\nRéponse : a) $72$ ; b) $101$ ; c) $58$ ; d) $400$.",
          micros: ["calcul_mental"],
        },
        {
          enonce: "Calcule de tête avec l'astuce.\na) $37 + 9$\nb) $58 + 19$\nc) $64 - 9$\nd) $14 \\times 5$",
          reponses: [
            { question: "a)", attendu: "46" },
            { question: "b)", attendu: "77" },
            { question: "c)", attendu: "55" },
            { question: "d)", attendu: "70" },
          ],
          correction:
            "a) $+ 9$, c'est $+ 10$ puis $- 1$. $37 + 10 = 47$, puis $47 - 1 = 46$.\nb) $+ 19$, c'est $+ 20$ puis $- 1$. $58 + 20 = 78$, puis $78 - 1 = 77$.\nc) $- 9$, c'est $- 10$ puis $+ 1$. $64 - 10 = 54$, puis $54 + 1 = 55$.\nd) $\\times 5$, c'est $\\times 10$ puis la moitié. $14 \\times 10 = 140$, puis $140 \\div 2 = 70$.\n⛔ Le piège du a) : faire $+ 10$ puis $+ 1$, et trouver $48$. J'ai ajouté $1$ de trop : je l'enlève.\nRéponse : a) $46$ ; b) $77$ ; c) $55$ ; d) $70$.",
          micros: ["calcul_procedures"],
        },
        {
          enonce: "Pose et calcule.\na) $468 + 357$\nb) $2\\,049 + 785$\nc) $15\\,306 + 4\\,897$",
          reponses: [
            { question: "a)", attendu: "825" },
            { question: "b)", attendu: "2834" },
            { question: "c)", attendu: "20203" },
          ],
          correction:
            "J'aligne les unités, puis je calcule colonne par colonne, depuis la droite.\na) Unités : $8 + 7 = 15$. J'écris $5$, je retiens $1$.\nDizaines : $6 + 5 + 1 = 12$. J'écris $2$, je retiens $1$. Centaines : $4 + 3 + 1 = 8$.\nDonc $468 + 357 = 825$.\nb) $9 + 5 = 14$ ; $4 + 8 + 1 = 13$ ; $0 + 7 + 1 = 8$ ; puis $2$. Donc $2\\,834$.\nc) $6 + 7 = 13$ ; $0 + 9 + 1 = 10$ ; $3 + 8 + 1 = 12$ ; $5 + 4 + 1 = 10$ ; $1 + 1 = 2$. Donc $20\\,203$.\n⛔ Le piège : écrire $15$ sous les unités. Une colonne ne prend qu'un chiffre : j'écris $5$ et je retiens $1$.\nRéponse : a) $825$ ; b) $2\\,834$ ; c) $20\\,203$.",
          schema: pose("+", ["468", "357"], "825", { dessus: ["1", "1", ""] }),
          micros: ["calcul_addition_posee"],
        },
        {
          enonce: "Pose et calcule.\na) $524 - 168$\nb) $1\\,000 - 274$\nc) $6\\,052 - 1\\,837$",
          reponses: [
            { question: "a)", attendu: "356" },
            { question: "b)", attendu: "726" },
            { question: "c)", attendu: "4215" },
          ],
          correction:
            "Je soustrais colonne par colonne, en commençant par les unités.\na) Unités : $4 - 8$, impossible. Je fais $14 - 8 = 6$ et je retiens $1$.\nDizaines : $2 - (6 + 1)$, impossible. Je fais $12 - 7 = 5$ et je retiens $1$.\nCentaines : $5 - (1 + 1) = 3$. Donc $524 - 168 = 356$.\nb) $10 - 4 = 6$ ; $10 - 8 = 2$ ; $10 - 3 = 7$ ; $1 - 1 = 0$. Donc $726$.\nc) $12 - 7 = 5$ ; $5 - (3 + 1) = 1$ ; $10 - 8 = 2$ ; $6 - (1 + 1) = 4$. Donc $4\\,215$.\n⭐ Je vérifie par une addition : $356 + 168 = 524$.\n⛔ Le piège : faire $8 - 4 = 4$ aux unités. Le chiffre du HAUT est $4$ : je fais $14 - 8$.\nRéponse : a) $356$ ; b) $726$ ; c) $4\\,215$.",
          schema: pose("−", ["524", "168"], "356"),
          micros: ["calcul_soustraction_posee"],
        },
        {
          enonce: "Trouve le nombre qui manque.\na) $47 + \\ldots = 72$\nb) $\\ldots + 150 = 400$\nc) $90 - \\ldots = 35$\nd) $\\ldots - 18 = 30$",
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "250" },
            { question: "c)", attendu: "55" },
            { question: "d)", attendu: "48" },
          ],
          correction:
            "a) Je cherche ce qu'il faut ajouter à $47$ pour aller à $72$. $72 - 47 = 25$.\nb) $400 - 150 = 250$. Je vérifie : $250 + 150 = 400$.\nc) J'enlève un nombre à $90$ et il reste $35$. $90 - 35 = 55$.\nd) J'ai enlevé $18$ et il reste $30$. Au départ, il y avait $30 + 18 = 48$.\n⛔ Le piège du d) : faire $30 - 18 = 12$. Je vérifie : $12 - 18$ ne fait pas $30$.\nRéponse : a) $25$ ; b) $250$ ; c) $55$ ; d) $48$.",
          micros: ["calcul_mental"],
        },
        {
          enonce: "Pose et calcule.\na) $236 \\times 4$\nb) $125 \\times 6$\nc) $307 \\times 3$",
          reponses: [
            { question: "a)", attendu: "944" },
            { question: "b)", attendu: "750" },
            { question: "c)", attendu: "921" },
          ],
          correction:
            "Je multiplie chaque chiffre, en commençant par les unités.\na) $6 \\times 4 = 24$ : j'écris $4$, je retiens $2$.\n$3 \\times 4 = 12$, plus $2$ : $14$. J'écris $4$, je retiens $1$.\n$2 \\times 4 = 8$, plus $1$ : $9$. Donc $236 \\times 4 = 944$.\nb) $5 \\times 6 = 30$ ; $2 \\times 6 + 3 = 15$ ; $1 \\times 6 + 1 = 7$. Donc $750$.\nc) $7 \\times 3 = 21$ ; $0 \\times 3 + 2 = 2$ ; $3 \\times 3 = 9$. Donc $921$.\n⛔ Le piège : écrire $24$ sous les unités. J'écris $4$ et je retiens $2$.\nRéponse : a) $944$ ; b) $750$ ; c) $921$.",
          schema: pose("×", ["236", "4"], "944", { dessus: ["1", "2", ""] }),
          micros: ["calcul_multiplication_posee"],
        },
        {
          enonce: "Calcule. Aligne bien les virgules.\na) $4{,}75 + 2{,}5$\nb) $3{,}4 + 1{,}8$\nc) $12{,}6 + 0{,}45$",
          reponses: [
            { question: "a)", attendu: "7,25" },
            { question: "b)", attendu: "5,2" },
            { question: "c)", attendu: "13,05" },
          ],
          correction:
            "J'aligne les virgules. J'écris un $0$ s'il manque un chiffre.\na) $4{,}75 + 2{,}50$. Centièmes : $5 + 0 = 5$. Dixièmes : $7 + 5 = 12$, je retiens $1$. Unités : $4 + 2 + 1 = 7$. Donc $7{,}25$.\nb) Dixièmes : $4 + 8 = 12$, je retiens $1$. Unités : $3 + 1 + 1 = 5$. Donc $5{,}2$.\nc) $12{,}60 + 0{,}45$. Centièmes : $5$. Dixièmes : $6 + 4 = 10$, je retiens $1$. Unités : $2 + 0 + 1 = 3$. Donc $13{,}05$.\n⛔ Le piège du a) : aligner les chiffres et non les virgules. On trouverait $5{,}00$.\nRéponse : a) $7{,}25$ ; b) $5{,}2$ ; c) $13{,}05$.",
          schema: pose("+", ["4,75", "2,50"], "7,25", { dessus: ["1", "", "", ""] }),
          micros: ["calcul_decimal_addition"],
        },
        {
          enonce: "Calcule. Aligne bien les virgules.\na) $6{,}4 - 2{,}35$\nb) $9{,}5 - 3{,}2$\nc) $10 - 4{,}6$",
          reponses: [
            { question: "a)", attendu: "4,05" },
            { question: "b)", attendu: "6,3" },
            { question: "c)", attendu: "5,4" },
          ],
          correction:
            "J'aligne les virgules et je complète avec des $0$.\na) $6{,}40 - 2{,}35$. Centièmes : $10 - 5 = 5$, je retiens $1$. Dixièmes : $4 - (3 + 1) = 0$. Unités : $6 - 2 = 4$. Donc $4{,}05$.\nb) Dixièmes : $5 - 2 = 3$. Unités : $9 - 3 = 6$. Donc $6{,}3$.\nc) $10{,}0 - 4{,}6$. Dixièmes : $10 - 6 = 4$, je retiens $1$. Unités : $10 - (4 + 1) = 5$. Donc $5{,}4$.\n⭐ Je vérifie : $4{,}05 + 2{,}35 = 6{,}40$.\n⛔ Le piège du a) : trouver $4{,}15$ sans écrire le $0$ de $6{,}40$.\nRéponse : a) $4{,}05$ ; b) $6{,}3$ ; c) $5{,}4$.",
          schema: ecranSeulement(pose("−", ["6,40", "2,35"], "4,05")),
          micros: ["calcul_decimal_soustraction"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. J'écris chaque calcul au brouillon, puis je vérifie.",
      rappel: [
        "D'abord les parenthèses, puis les $\\times$, puis les $+$ et les $-$ : $3 + 4 \\times 5 = 3 + 20 = 23$.",
        "Pour estimer, j'arrondis les nombres, puis je calcule de tête : $298 + 405$, c'est environ $300 + 400 = 700$.",
        "Je vérifie une soustraction par une addition : $524 - 168 = 356$ car $356 + 168 = 524$.",
      ],
      exercices: [
        {
          enonce: "Calcule.\na) $3 + 4 \\times 5$\nb) $(3 + 4) \\times 5$\nc) $20 - 2 \\times 6$\nd) $(20 - 2) \\times 6$",
          reponses: [
            { question: "a)", attendu: "23" },
            { question: "b)", attendu: "35" },
            { question: "c)", attendu: "8" },
            { question: "d)", attendu: "108" },
          ],
          correction:
            "D'abord les parenthèses, puis la multiplication, puis le reste.\na) Pas de parenthèses. Je fais d'abord $4 \\times 5 = 20$. Puis $3 + 20 = 23$.\nb) Parenthèses d'abord : $3 + 4 = 7$. Puis $7 \\times 5 = 35$.\nc) D'abord $2 \\times 6 = 12$. Puis $20 - 12 = 8$.\nd) Parenthèses : $20 - 2 = 18$. Puis $18 \\times 6 = 108$.\n⛔ Le piège du a) : calculer de gauche à droite, $3 + 4 = 7$ puis $7 \\times 5 = 35$. La multiplication passe d'abord.\nRéponse : a) $23$ ; b) $35$ ; c) $8$ ; d) $108$.",
          micros: ["calcul_priorite"],
        },
        {
          enonce: "Choisis le résultat le plus proche, sans poser le calcul.\na) $298 + 405$ fait environ :\nA) 600   B) 800   C) 700\nb) $49 \\times 21$ fait environ :\nA) 1 000   B) 100   C) 10 000\nc) $812 - 395$ fait environ :\nA) 500   B) 400   C) 300",
          reponses: [
            { question: "a)", attendu: ["C", "c) 700"] },
            { question: "b)", attendu: ["A", "a) 1 000", "a) 1000"] },
            { question: "c)", attendu: ["B", "b) 400"] },
          ],
          correction:
            "J'arrondis chaque nombre, puis je calcule de tête.\na) $298$, c'est environ $300$. $405$, c'est environ $400$. $300 + 400 = 700$ : réponse C.\nb) $49$, c'est environ $50$. $21$, c'est environ $20$. $50 \\times 20 = 1\\,000$ : réponse A.\nc) $812$, c'est environ $800$. $395$, c'est environ $400$. $800 - 400 = 400$ : réponse B.\n⛔ Le piège du b) : choisir $100$ ou $10\\,000$ au hasard. L'estimation donne l'ordre de grandeur : $1\\,000$.\nRéponse : a) C ; b) A ; c) B.",
          micros: ["calcul_estimer"],
        },
        {
          enonce: "Vrai ou faux ? Vérifie chaque calcul.\na) $56 + 37 = 83$\nb) $703 - 258 = 445$\nc) $6 + 2 \\times 10 = 80$\nd) $2{,}5 + 1{,}25 = 3{,}75$",
          reponses: [
            { question: "a)", attendu: FAUX },
            { question: "b)", attendu: VRAI },
            { question: "c)", attendu: FAUX },
            { question: "d)", attendu: VRAI },
          ],
          correction:
            "a) $56 + 30 = 86$, puis $86 + 7 = 93$. Ce n'est pas $83$ : faux.\nb) Je vérifie par une addition : $445 + 258 = 703$. Vrai.\nc) D'abord $2 \\times 10 = 20$. Puis $6 + 20 = 26$. Ce n'est pas $80$ : faux.\nd) $2{,}50 + 1{,}25$ : $5 + 2 = 7$ dixièmes, $5$ centièmes, $2 + 1 = 3$ unités. $3{,}75$ : vrai.\n⛔ Le piège du a) : oublier la retenue. $6 + 7 = 13$ : je retiens $1$.\nRéponse : a) faux ; b) vrai ; c) faux ; d) vrai.",
          micros: ["calcul_priorite", "calcul_decimal_addition"],
        },
        {
          enonce: "Trouve le nombre qui manque.\na) $345 + \\ldots = 1\\,000$\nb) $1\\,250 - \\ldots = 800$\nc) $\\ldots \\times 4 = 100$\nd) $7{,}5 + \\ldots = 10$",
          reponses: [
            { question: "a)", attendu: "655" },
            { question: "b)", attendu: "450" },
            { question: "c)", attendu: "25" },
            { question: "d)", attendu: "2,5" },
          ],
          correction:
            "a) $1\\,000 - 345 = 655$. Je vérifie : $345 + 655 = 1\\,000$.\nb) J'enlève un nombre à $1\\,250$ et il reste $800$. $1\\,250 - 800 = 450$.\nc) Dans la table de $4$ : $4 \\times 25 = 100$. Le nombre est $25$.\nd) De $7{,}5$ à $8$, il y a $0{,}5$. De $8$ à $10$, il y a $2$. En tout : $2{,}5$.\n⛔ Le piège du b) : faire $1\\,250 + 800$. Je vérifie : $1\\,250 - 450 = 800$.\nRéponse : a) $655$ ; b) $450$ ; c) $25$ ; d) $2{,}5$.",
          micros: ["calcul_mental", "calcul_defi"],
        },
        {
          enonce: "Au marché, Yanis achète un melon à $2{,}80$ €, des tomates à $3{,}45$ € et du pain à $1{,}20$ €.\na) Combien paie-t-il en tout ?\nb) Il donne un billet de $10$ €. Combien lui rend-on ?\nc) Avant de payer, il a $7$ € dans sa poche. Est-ce assez ? Réponds par oui ou non.",
          reponses: [
            { question: "a)", attendu: "7,45" },
            { question: "b)", attendu: "2,55" },
            { question: "c)", attendu: ["non", "faux"] },
          ],
          correction:
            "a) J'aligne les virgules. $2{,}80 + 3{,}45 = 6{,}25$. Puis $6{,}25 + 1{,}20 = 7{,}45$ €.\nb) $10{,}00 - 7{,}45 = 2{,}55$ €. Je vérifie : $7{,}45 + 2{,}55 = 10$.\nc) $7{,}45$ € est plus que $7$ € : non, ce n'est pas assez.\n⭐ J'estime d'abord : environ $3 + 3 + 1 = 7$ €. Le résultat $7{,}45$ € est proche : c'est cohérent.\n⛔ Le piège : oublier la virgule et écrire $745$ €.\nRéponse : a) $7{,}45$ € ; b) $2{,}55$ € ; c) non.",
          micros: ["calcul_decimal_addition", "calcul_decimal_soustraction", "calcul_estimer"],
        },
        {
          enonce: "Une coureuse s'entraîne. Lundi, elle court $1\\,250$ m. Mercredi, $2\\,400$ m. Vendredi, $1\\,850$ m.\na) Combien de mètres court-elle en tout ?\nb) Combien de mètres de plus court-elle mercredi que lundi ?\nc) Elle veut courir $8\\,000$ m dans la semaine. Combien lui manque-t-il ?",
          reponses: [
            { question: "a)", attendu: "5500" },
            { question: "b)", attendu: "1150" },
            { question: "c)", attendu: "2500" },
          ],
          correction:
            "a) $1\\,250 + 2\\,400 = 3\\,650$. Puis $3\\,650 + 1\\,850 = 5\\,500$ m.\nb) « De plus » : je cherche l'écart. $2\\,400 - 1\\,250 = 1\\,150$ m.\nc) Il manque $8\\,000 - 5\\,500 = 2\\,500$ m.\n⭐ Je vérifie : $5\\,500 + 2\\,500 = 8\\,000$.\n⛔ Le piège du c) : enlever un seul jour, $8\\,000 - 1\\,850$. Je prends le total de la semaine.\nRéponse : a) $5\\,500$ m ; b) $1\\,150$ m ; c) $2\\,500$ m.",
          micros: ["calcul_addition_posee", "calcul_soustraction_posee", "calcul_mental"],
        },
        {
          enonce: "a) Pour calculer $37 + 9$, quelle astuce est juste ?\nA) 37 + 10 + 1   B) 37 + 10 − 1   C) 37 + 9 − 10\nb) $46 \\times 5$ : calcule $46 \\times 10$, puis prends la moitié.\nc) $245 - 99$\nd) $38 + 27 + 62$ : regroupe deux nombres qui font $100$.",
          reponses: [
            { question: "a)", attendu: ["B", "b) 37 + 10 − 1"] },
            { question: "b)", attendu: "230" },
            { question: "c)", attendu: "146" },
            { question: "d)", attendu: "127" },
          ],
          correction:
            "a) $9$, c'est $10 - 1$. J'ajoute $10$, puis j'enlève $1$ : réponse B. $37 + 10 - 1 = 46$.\nb) $46 \\times 10 = 460$. La moitié de $460$, c'est $230$.\nc) $- 99$, c'est $- 100$ puis $+ 1$. $245 - 100 = 145$, puis $145 + 1 = 146$.\nd) $38 + 62 = 100$. Puis $100 + 27 = 127$.\n⛔ Le piège du c) : faire $- 100$ puis $- 1$. J'ai enlevé $1$ de trop : je le rajoute.\nRéponse : a) B ; b) $230$ ; c) $146$ ; d) $127$.",
          micros: ["calcul_procedures"],
        },
        {
          enonce: "Pose et calcule.\na) $3\\,708 + 2\\,496 + 125$\nb) $10\\,000 - 3\\,456$\nc) $1\\,205 \\times 7$\nd) $45{,}3 - 18{,}75$",
          reponses: [
            { question: "a)", attendu: "6329" },
            { question: "b)", attendu: "6544" },
            { question: "c)", attendu: "8435" },
            { question: "d)", attendu: "26,55" },
          ],
          correction:
            "a) Unités : $8 + 6 + 5 = 19$, je retiens $1$. Dizaines : $0 + 9 + 2 + 1 = 12$, je retiens $1$.\nCentaines : $7 + 4 + 1 + 1 = 13$, je retiens $1$. Milliers : $3 + 2 + 1 = 6$. Donc $6\\,329$.\nb) $10\\,000 - 3\\,456 = 6\\,544$. Je vérifie : $6\\,544 + 3\\,456 = 10\\,000$.\nc) $5 \\times 7 = 35$ ; $0 \\times 7 + 3 = 3$ ; $2 \\times 7 = 14$ ; $1 \\times 7 + 1 = 8$. Donc $8\\,435$.\nd) J'écris $45{,}30 - 18{,}75$, virgule sous virgule. Je trouve $26{,}55$.\nJe vérifie : $26{,}55 + 18{,}75 = 45{,}30$.\n⛔ Le piège du d) : aligner $45{,}3$ et $18{,}75$ par la droite. J'aligne les virgules et j'écris $45{,}30$.\nRéponse : a) $6\\,329$ ; b) $6\\,544$ ; c) $8\\,435$ ; d) $26{,}55$.",
          schema: ecranSeulement(pose("−", ["45,30", "18,75"], "26,55")),
          micros: ["calcul_addition_posee", "calcul_soustraction_posee", "calcul_multiplication_posee", "calcul_decimal_soustraction"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. J'écris le calcul en entier, puis je le fais.",
      rappel: [
        "« En tout » : j'additionne. « De plus », « il reste », « il manque » : je soustrais.",
        "Dans un calcul écrit en entier, je fais les $\\times$ d'abord : $4 \\times 25 + 38 = 100 + 38 = 138$.",
        "Avec des euros ou des mètres à virgule, j'aligne les virgules.",
      ],
      exercices: [
        {
          titre: "Les repas de la cantinière",
          enonce: "Martine est cantinière. Elle note les repas servis.\nLundi : $245$. Mardi : $198$. Jeudi : $312$. Vendredi : $260$.\na) Combien de repas a-t-elle servis en tout ?\nb) Combien de repas de plus le jeudi que le mardi ?\nc) Elle avait commandé $1\\,200$ yaourts, un par repas. Combien de yaourts restent ?\nd) Un repas coûte $3$ €. Combien coûtent les repas du lundi ?",
          reponses: [
            { question: "a)", attendu: "1015" },
            { question: "b)", attendu: "114" },
            { question: "c)", attendu: "185" },
            { question: "d)", attendu: "735" },
          ],
          correction:
            "a) $245 + 198 = 443$. $443 + 312 = 755$. $755 + 260 = 1\\,015$ repas.\nb) $312 - 198 = 114$ repas de plus.\nc) $1\\,015$ yaourts sont mangés. $1\\,200 - 1\\,015 = 185$ yaourts restent.\nd) $245 \\times 3$ : $5 \\times 3 = 15$, je retiens $1$ ; $4 \\times 3 + 1 = 13$, je retiens $1$ ; $2 \\times 3 + 1 = 7$. Donc $735$ €.\n⛔ Le piège du c) : enlever un seul jour, $1\\,200 - 260$. Tous les repas prennent un yaourt.\nRéponse : a) $1\\,015$ ; b) $114$ ; c) $185$ ; d) $735$ €.",
          micros: ["calcul_addition_posee", "calcul_soustraction_posee", "calcul_multiplication_posee", "calcul_defi"],
        },
        {
          titre: "La planche du menuisier",
          enonce: "Paul est menuisier. Il a une planche de $2{,}5$ m.\nIl coupe un morceau de $0{,}75$ m, puis un morceau de $1{,}2$ m.\na) Quelle longueur a-t-il coupée en tout ?\nb) Quelle longueur reste-t-il de la planche ?\nc) Peut-il encore couper un morceau de $0{,}6$ m ? Réponds par oui ou non.\nd) Combien de mètres lui manque-t-il pour ce morceau ?",
          reponses: [
            { question: "a)", attendu: "1,95" },
            { question: "b)", attendu: "0,55" },
            { question: "c)", attendu: ["non", "faux"] },
            { question: "d)", attendu: "0,05" },
          ],
          correction:
            "J'aligne les virgules et je complète avec des $0$.\na) $0{,}75 + 1{,}20 = 1{,}95$ m.\nb) $2{,}50 - 1{,}95 = 0{,}55$ m.\nc) $0{,}55$ m, c'est moins que $0{,}60$ m : non.\nd) $0{,}60 - 0{,}55 = 0{,}05$ m. Il manque $5$ centimètres.\n⛔ Le piège du b) : écrire $2{,}5 - 1{,}95$ sans le $0$, et trouver $1{,}45$. J'écris $2{,}50$.\nRéponse : a) $1{,}95$ m ; b) $0{,}55$ m ; c) non ; d) $0{,}05$ m.",
          micros: ["calcul_decimal_addition", "calcul_decimal_soustraction", "calcul_defi"],
        },
        {
          titre: "Le voyage de classe",
          enonce: "Une classe de $28$ élèves part en voyage. La guide du musée prépare les comptes.\nLe bus coûte $1\\,450$ €. Le musée coûte $6$ € par élève. Les repas coûtent $280$ €.\na) Combien coûte le musée pour toute la classe ?\nb) Combien coûte le voyage en tout ?\nc) La coopérative de l'école a $2\\,000$ €. Combien d'euros reste-t-il après le voyage ?",
          reponses: [
            { question: "a)", attendu: "168" },
            { question: "b)", attendu: "1898" },
            { question: "c)", attendu: "102" },
          ],
          correction:
            "a) $28 \\times 6$ : $8 \\times 6 = 48$, je retiens $4$ ; $2 \\times 6 + 4 = 16$. Donc $168$ €.\nb) $1\\,450 + 168 = 1\\,618$. Puis $1\\,618 + 280 = 1\\,898$ €.\nc) $2\\,000 - 1\\,898 = 102$ €.\n⭐ J'estime : environ $1\\,500 + 200 + 300 = 2\\,000$ €. Le total est proche : c'est cohérent.\n⛔ Le piège du b) : oublier le musée, ou compter $6$ € au lieu de $168$ €.\nRéponse : a) $168$ € ; b) $1\\,898$ € ; c) $102$ €.",
          micros: ["calcul_multiplication_posee", "calcul_addition_posee", "calcul_soustraction_posee", "calcul_defi"],
        },
        {
          titre: "Le ticket de la caissière",
          enonce: "Awa est caissière dans une épicerie. Un client achète $3$ paquets de riz à $2$ € et $1$ bouteille d'huile à $5$ €.\na) Quel calcul donne le prix à payer ?\nA) 3 × (2 + 5)   B) 3 + 2 × 5   C) 3 × 2 + 5\nb) Combien le client paie-t-il ?\nc) Il donne un billet de $20$ €. Combien Awa lui rend-elle ?\nd) Un autre client achète $5$ paquets de riz et $2$ bouteilles d'huile. Combien paie-t-il ?",
          reponses: [
            { question: "a)", attendu: ["C", "c) 3 × 2 + 5"] },
            { question: "b)", attendu: "11" },
            { question: "c)", attendu: "9" },
            { question: "d)", attendu: "20" },
          ],
          correction:
            "a) Les $3$ paquets de riz : $3 \\times 2$. Puis j'ajoute l'huile : $+ 5$. Le calcul est $3 \\times 2 + 5$ : réponse C.\nb) D'abord $3 \\times 2 = 6$. Puis $6 + 5 = 11$ €.\nc) $20 - 11 = 9$ €.\nd) Le riz : $5 \\times 2 = 10$. L'huile : $2 \\times 5 = 10$. En tout : $10 + 10 = 20$ €.\n⛔ Le piège : choisir A, $3 \\times (2 + 5) = 21$. Il y a une seule bouteille d'huile, pas trois.\nRéponse : a) C ; b) $11$ € ; c) $9$ € ; d) $20$ €.",
          micros: ["calcul_priorite", "calcul_defi"],
        },
      ],
    },
  ],
};
