// ─── Fiche d'exercices : additions et soustractions (CP) — 20 exercices ───────
//
// 17/11/2026 : la feuille interactive de la notion `addition_soustraction` du
// coach CP (9 micros). Sur la forme des feuilles du CM1 : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/cp/maths/addition-soustraction.bank.ts`).
// ⛔ LIMITES DU CP (BO n° 41 du 31/10/2024) : nombres jusqu'à 100 ; symboles
// +, − et = seulement ; l'addition POSÉE de deux nombres à un ou deux chiffres,
// unités sous les unités, SANS retenue ici (la banque n'en met pas à ★2-★3) ;
// la multiplication n'est que le SENS : additions répétées et le mot « fois »
// (⛔ aucun signe ×, aucune table) ; pas de soustraction qui casse une dizaine.
// ⛔ Aucune question à rédiger : un nombre, un QCM, vrai ou faux.
// Phrases de l'énoncé : 14 mots au plus.
//
// Les pièges nommés : choisir « − » quand on réunit (1), compter aussi les
// oiseaux partis (2), 12 + 6 = 72 (3), 17 − 5 = 22 (4), lire = comme « ça
// donne » (5, 14, 19), additionner tout ce qu'on voit, 5 + 8 = 13 (6), 3 + 4
// pour 3 fois 4 (7, 13), refaire le calcul au lieu de lire l'addition (8),
// additionner les chiffres de gauche d'abord (9), le 5 sous le 2 (10), 46 + 20
// = 48 (11), 30 + 20 = 50 donc 20 en a (12), 25 + 4 parce qu'il y a « dans le
// bus » (15), faire 15 au lieu de 10 dans 3 + 5 + 7 (16), oublier une étape
// (17), additionner en travers de la pyramide (18), « plus » qui cache une
// soustraction (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : verger (1), nature (2, oiseaux), confiserie
// (7, sachets de bonbons), bus (15), nature (13, coccinelles), boulangerie
// (17), jeu (18, pyramide), basket (20). Métiers : le confiseur (7), le
// conducteur de bus (15), le boulanger (17).
// Aucun contexte réunionnais sur cette feuille.
// ⭐ FAIT RÉEL : une coccinelle, comme tout insecte, a 6 pattes (ex. 13).
// Tout le reste est un MODÈLE.
//
// Micro-compétences : cp_add_sens (1, 7, 16), cp_sous_sens (2, 8, 15),
// cp_signe_egal (5, 14, 19), cp_add_calculer (3, 11, 16, 18), cp_sous_calculer
// (4, 11, 17), cp_add_sous_ligne (6, 8, 12, 19), cp_add_pose (9, 10),
// cp_mult_sens (7, 13, 16), cp_add_sous_defi (17, 18, 19, 20). 9/9.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ecranSeulement } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { collection, groupes, posee, pyramide } from "@/lib/fiches-exercices/dessins-cp-lot-a";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];

export const exercicesAdditionSoustractionCp: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cp",
  notion: "addition-soustraction",
  titre: "Additions et soustractions",
  accroche:
    "Vingt exercices, du geste seul au problème. Réunir et enlever. Calculer une addition, une soustraction. Comprendre le signe =. Trouver le nombre qui manque. Poser une addition en colonnes. Compter des groupes égaux avec le mot « fois ». Des pommes, des oiseaux, un bus, une pyramide de nombres et un match de basket. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cp",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un calcul par exercice. J'écris le résultat.",
      rappel: [
        "Additionner, c'est réunir : 3 + 2 = 5.",
        "Soustraire, c'est enlever : 5 − 2 = 3.",
        "Le signe = veut dire : autant des deux côtés.",
      ],
      exercices: [
        {
          enonce: "Au verger, Léa cueille des pommes rouges et des pommes vertes.\na) Quel calcul donne toutes les pommes ? A) 4 + 3 B) 4 − 3\nb) Combien de pommes en tout ?",
          figure: collection([
            { n: 4, forme: "pomme", legende: "rouges" },
            { n: 3, forme: "pomme", couleur: "#16a34a", legende: "vertes" },
          ]),
          correction:
            "Je compte : 4 pommes rouges et 3 pommes vertes.\na) Je veux toutes les pommes : je réunis. C'est une addition, 4 + 3. Réponse A.\nb) Je pars de 4 et j'avance de 3 : 5, 6, 7. Il y a 7 pommes.\n⛔ Le piège : choisir 4 − 3. On n'enlève rien : on met ensemble.\nRéponse : a) A ; b) 7.",
          micros: ["cp_add_sens"],
          reponses: [
            { question: "a)", attendu: ["A", "A) 4 + 3", "4 + 3"] },
            { question: "b)", attendu: ["7", "sept"] },
          ],
        },
        {
          enonce: "8 oiseaux sont sur un fil.\nLes oiseaux barrés s'envolent.\nCombien d'oiseaux restent sur le fil ?",
          figure: collection([{ n: 8, forme: "oiseau", barres: 3 }]),
          correction:
            "Il y avait 8 oiseaux. 3 sont barrés : ils s'envolent.\nJ'enlève : c'est une soustraction, 8 − 3.\nJe recule de 3 à partir de 8 : 7, 6, 5.\nIl reste 5 oiseaux.\n⛔ Le piège : compter tous les oiseaux du dessin, même les barrés. Ceux-là sont partis.\nRéponse : 5.",
          micros: ["cp_sous_sens"],
          reponses: [{ attendu: ["5", "cinq"] }],
        },
        {
          enonce: "Calcule.\na) 5 + 4\nb) 7 + 3\nc) 12 + 6\nd) 20 + 30",
          correction:
            "a) Je pars de 5, j'avance de 4 : 6, 7, 8, 9. Donc 9.\nb) 7 et 3 font 10 : c'est un complément à 10.\nc) J'ajoute les unités : 2 + 6 = 8. La dizaine ne change pas : 18.\nd) 2 dizaines et 3 dizaines font 5 dizaines : 50.\n⛔ Le piège du c) : écrire 72 en ajoutant le 6 au 1. Le 6 va avec les unités.\nRéponse : a) 9 ; b) 10 ; c) 18 ; d) 50.",
          micros: ["cp_add_calculer"],
          reponses: [
            { question: "a)", attendu: ["9", "neuf"] },
            { question: "b)", attendu: ["10", "dix"] },
            { question: "c)", attendu: "18" },
            { question: "d)", attendu: "50" },
          ],
        },
        {
          enonce: "Calcule.\na) 9 − 4\nb) 10 − 7\nc) 17 − 5\nd) 50 − 20",
          correction:
            "a) Je recule de 4 à partir de 9 : 8, 7, 6, 5. Donc 5.\nb) 7 + 3 = 10. Donc 10 − 7 = 3.\nc) J'enlève aux unités : 7 − 5 = 2. La dizaine reste : 12.\nd) 5 dizaines moins 2 dizaines : 3 dizaines. Donc 30.\n⛔ Le piège du c) : écrire 22. On enlève, le nombre doit devenir plus petit que 17.\nRéponse : a) 5 ; b) 3 ; c) 12 ; d) 30.",
          micros: ["cp_sous_calculer"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: "12" },
            { question: "d)", attendu: "30" },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 4 + 3 = 7\nb) 6 = 2 + 4\nc) 5 + 1 = 4 + 2\nd) 3 + 3 = 9",
          correction:
            "Le signe = veut dire : autant à gauche qu'à droite. Je calcule chaque côté.\na) 4 + 3 = 7, et à droite 7. Vrai.\nb) À gauche 6. À droite 2 + 4 = 6. Vrai.\nc) À gauche 5 + 1 = 6. À droite 4 + 2 = 6. Vrai.\nd) À gauche 3 + 3 = 6. À droite 9. Faux.\n⛔ Le piège : croire que b) est faux parce que le calcul est à droite. Le = marche dans les deux sens.\nRéponse : a) vrai ; b) vrai ; c) vrai ; d) faux.",
          micros: ["cp_signe_egal"],
          reponses: [
            { question: "a)", attendu: VRAI },
            { question: "b)", attendu: VRAI },
            { question: "c)", attendu: VRAI },
            { question: "d)", attendu: FAUX },
          ],
        },
        {
          enonce: "Trouve le nombre qui manque.\na) 5 + … = 8\nb) … + 4 = 10\nc) 9 − … = 6",
          correction:
            "Je cherche ce qui manque pour avoir autant des deux côtés.\na) De 5 à 8, je compte : 6, 7, 8. Il manque 3.\nb) Quel nombre avec 4 fait 10 ? 6 + 4 = 10. Il manque 6.\nc) De 9, combien enlever pour arriver à 6 ? 8, 7, 6 : j'enlève 3.\n⛔ Le piège du a) : écrire 13 en additionnant 5 et 8. Je cherche le nombre qui va dans le trou.\nRéponse : a) 3 ; b) 6 ; c) 3.",
          micros: ["cp_add_sous_ligne"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["6", "six"] },
            { question: "c)", attendu: ["3", "trois"] },
          ],
        },
        {
          enonce: "Le confiseur remplit 3 sachets. Il met 4 bonbons dans chaque sachet.\na) Quel calcul donne tous les bonbons ? A) 3 + 4 B) 4 + 4 + 4\nb) Combien de bonbons en tout ?",
          figure: groupes(3, 4, "bonbon", "#ea580c"),
          correction:
            "Il y a 3 sachets. Dans chaque sachet, 4 bonbons.\na) Je compte 4, puis encore 4, puis encore 4 : c'est 4 + 4 + 4. Réponse B.\nOn dit aussi : 3 fois 4.\nb) 4 + 4 = 8. Puis 8 + 4 = 12. Il y a 12 bonbons.\n⛔ Le piège : calculer 3 + 4 = 7. Le 3 compte les sachets, pas des bonbons.\nRéponse : a) B ; b) 12.",
          micros: ["cp_mult_sens", "cp_add_sens"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 4 + 4 + 4", "4 + 4 + 4"] },
            { question: "b)", attendu: ["12", "douze"] },
          ],
        },
        {
          enonce: "On sait que 8 + 5 = 13.\nSans compter, complète.\na) 13 − 5 = …\nb) 13 − 8 = …",
          correction:
            "8 + 5 = 13 : 13 est fait de 8 et de 5.\na) Si j'enlève les 5, il reste les 8. Donc 13 − 5 = 8.\nb) Si j'enlève les 8, il reste les 5. Donc 13 − 8 = 5.\nLa soustraction défait l'addition.\n⛔ Le piège : recompter sur les doigts et se tromper. L'addition donne déjà la réponse.\nRéponse : a) 8 ; b) 5.",
          micros: ["cp_sous_sens", "cp_add_sous_ligne"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je calcule les unités, puis les dizaines.",
      rappel: [
        "Pour poser : unités sous unités, dizaines sous dizaines.",
        "Je commence par les unités, à droite.",
        "3 fois 5, c'est 5 + 5 + 5.",
      ],
      exercices: [
        {
          enonce: "Calcule l'addition posée.\nQuel est le résultat ?",
          figure: posee("32", "45"),
          schema: ecranSeulement(posee("32", "45", "77")),
          correction:
            "Je commence par les unités, à droite : 2 + 5 = 7. J'écris 7 sous les unités.\nPuis les dizaines : 3 + 4 = 7. J'écris 7 sous les dizaines.\nLe résultat est 77.\n⛔ Le piège : commencer par la gauche et mélanger les colonnes. Les unités d'abord, chacune dans sa colonne.\nRéponse : 77.",
          micros: ["cp_add_pose"],
          reponses: [{ attendu: "77" }],
        },
        {
          enonce: "Paul pose 24 + 5.\na) Est-il bien posé ? Oui ou non ?\nb) Combien font 24 + 5 ?",
          figure: posee("24", "5", undefined, { decale: true }),
          schema: ecranSeulement(posee("24", "5", "29")),
          correction:
            "a) Le 5 compte 5 unités. Il doit aller sous le 4, dans la colonne des unités.\nPaul l'a mis sous le 2, chez les dizaines. Ce n'est pas bien posé : non.\nb) Je pose bien : 4 + 5 = 9 aux unités. Le 2 des dizaines descend. Donc 29.\n⛔ Le piège : calculer avec le 5 sous le 2. On trouverait 74 : bien trop grand.\nRéponse : a) non ; b) 29.",
          micros: ["cp_add_pose"],
          reponses: [
            { question: "a)", attendu: FAUX },
            { question: "b)", attendu: "29" },
          ],
        },
        {
          enonce: "Calcule.\na) 34 + 5\nb) 46 + 20\nc) 58 − 6\nd) 79 − 40",
          correction:
            "Je regarde si j'ajoute (ou j'enlève) des unités ou des dizaines.\na) 5 unités : 4 + 5 = 9. Donc 39.\nb) 2 dizaines : 4 + 2 = 6 dizaines. Les unités restent. Donc 66.\nc) 6 unités : 8 − 6 = 2. Donc 52.\nd) 4 dizaines : 7 − 4 = 3 dizaines. Donc 39.\n⛔ Le piège du b) : écrire 48. 20, c'est 2 dizaines, pas 2 unités.\nRéponse : a) 39 ; b) 66 ; c) 52 ; d) 39.",
          micros: ["cp_add_calculer", "cp_sous_calculer"],
          reponses: [
            { question: "a)", attendu: "39" },
            { question: "b)", attendu: "66" },
            { question: "c)", attendu: "52" },
            { question: "d)", attendu: "39" },
          ],
        },
        {
          enonce: "Trouve le nombre qui manque.\na) 30 + … = 50\nb) 45 + … = 49\nc) … − 10 = 25",
          correction:
            "a) De 3 dizaines à 5 dizaines, il manque 2 dizaines. 30 + 20 = 50.\nb) Les dizaines sont pareilles. De 5 à 9 unités, il manque 4. 45 + 4 = 49.\nc) J'ai enlevé 10 et il reste 25. Avant, j'avais 10 de plus : 25 + 10 = 35.\nJe vérifie : 35 − 10 = 25.\n⛔ Le piège du a) : écrire 2. Il manque 2 dizaines, c'est 20.\nRéponse : a) 20 ; b) 4 ; c) 35.",
          micros: ["cp_add_sous_ligne"],
          reponses: [
            { question: "a)", attendu: ["20", "vingt"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: "35" },
          ],
        },
        {
          enonce: "Une coccinelle a 6 pattes.\nIl y a 3 coccinelles sur la feuille.\na) Quel calcul ? A) 6 + 3 B) 6 + 6 + 6 C) 3 + 3\nb) Combien de pattes en tout ?",
          correction:
            "a) Chaque coccinelle a 6 pattes. Pour 3 coccinelles : 6, encore 6, encore 6.\nC'est 6 + 6 + 6, soit 3 fois 6. Réponse B.\nb) 6 + 6 = 12. Puis 12 + 6 = 18. Il y a 18 pattes.\n⛔ Le piège : calculer 6 + 3 = 9. Le 3 compte les coccinelles, pas des pattes.\nRéponse : a) B ; b) 18.",
          micros: ["cp_mult_sens"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 6 + 6 + 6", "6 + 6 + 6"] },
            { question: "b)", attendu: "18" },
          ],
        },
        {
          enonce: "Pour 47 + 8, Téo écrit : 47 + 3 = 50 + 5 = 55.\na) « 47 + 3 = 50 + 5 » : vrai ou faux ?\nb) Combien font 47 + 8 ?",
          correction:
            "a) À gauche, 47 + 3 = 50. À droite, 50 + 5 = 55. 50 n'est pas égal à 55.\nLe signe = est mal placé : faux.\nb) L'idée de Téo est bonne : 8 = 3 + 5.\n47 + 3 = 50. Puis 50 + 5 = 55. Donc 47 + 8 = 55.\nIl faut écrire deux égalités séparées.\n⛔ Le piège : lire = comme « ça donne ». Le = veut dire : autant des deux côtés.\nRéponse : a) faux ; b) 55.",
          micros: ["cp_signe_egal", "cp_add_calculer"],
          reponses: [
            { question: "a)", attendu: FAUX },
            { question: "b)", attendu: "55" },
          ],
        },
        {
          enonce: "Il y a 25 enfants dans le bus.\nÀ l'arrêt, 4 enfants descendent.\na) Quel calcul ? A) 25 + 4 B) 25 − 4 C) 4 − 25\nb) Combien d'enfants restent dans le bus ?",
          correction:
            "a) Des enfants descendent : il y en a moins dans le bus. J'enlève : 25 − 4. Réponse B.\nb) J'enlève aux unités : 5 − 4 = 1. Les 2 dizaines restent. Donc 21.\n⛔ Le piège : choisir 25 + 4. Quand des enfants descendent, le bus se vide.\nRéponse : a) B ; b) 21.",
          micros: ["cp_sous_sens", "cp_sous_calculer"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 25 − 4", "25 − 4"] },
            { question: "b)", attendu: "21" },
          ],
        },
        {
          enonce: "Calcule.\na) 3 + 5 + 7\nb) 6 + 4 + 9\nc) 4 fois 5",
          correction:
            "a) Je cherche deux nombres qui font 10 : 3 + 7 = 10. Puis 10 + 5 = 15.\nb) 6 + 4 = 10. Puis 10 + 9 = 19.\nc) 4 fois 5, c'est 5 + 5 + 5 + 5. 5 + 5 = 10, et 10 + 10 = 20.\n⛔ Le piège du c) : calculer 4 + 5 = 9. « 4 fois 5 », c'est quatre fois le nombre 5.\nRéponse : a) 15 ; b) 19 ; c) 20.",
          micros: ["cp_add_calculer", "cp_add_sens", "cp_mult_sens"],
          reponses: [
            { question: "a)", attendu: ["15", "quinze"] },
            { question: "b)", attendu: ["19", "dix-neuf"] },
            { question: "c)", attendu: ["20", "vingt"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis toute l'histoire. Je calcule étape par étape.",
      rappel: [
        "Je me demande : ça augmente ou ça diminue ?",
        "Un problème peut avoir deux étapes : je fais la première, puis la deuxième.",
        "Je vérifie que ma réponse est possible.",
      ],
      exercices: [
        {
          titre: "Les baguettes du boulanger",
          enonce: "Le boulanger cuit 28 baguettes.\nLe matin, il en vend 15.\nPuis il en cuit encore 10.\na) Combien en reste-t-il après le matin ?\nb) Combien en a-t-il à la fin ?",
          correction:
            "a) Il vend : j'enlève. 28 − 15 : aux unités 8 − 5 = 3, aux dizaines 2 − 1 = 1. Il reste 13 baguettes.\nb) Il en cuit 10 de plus : j'ajoute. 13 + 10 = 23.\nIl a 23 baguettes à la fin.\n⛔ Le piège : oublier une étape et répondre 13. L'histoire continue après le matin.\nRéponse : a) 13 ; b) 23.",
          micros: ["cp_add_sous_defi", "cp_sous_calculer"],
          reponses: [
            { question: "a)", attendu: "13" },
            { question: "b)", attendu: "23" },
          ],
        },
        {
          titre: "La pyramide de nombres",
          enonce: "Chaque case est la somme des deux cases juste en dessous.\na) Quel nombre va dans la case orange de gauche ?\nb) Et dans celle de droite ?\nc) Et tout en haut ?",
          figure: pyramide([["?"], ["?", "?"], ["3", "5", "2"]]),
          correction:
            "Je commence par le bas.\na) Sous la case de gauche : 3 et 5. 3 + 5 = 8.\nb) Sous la case de droite : 5 et 2. 5 + 2 = 7.\nc) Tout en haut : les deux cases du milieu, 8 et 7. 8 + 7 = 15.\n⛔ Le piège : additionner 3 et 2, qui ne se touchent pas. Je prends toujours les deux cases juste en dessous.\nRéponse : a) 8 ; b) 7 ; c) 15.",
          micros: ["cp_add_sous_defi", "cp_add_calculer"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["7", "sept"] },
            { question: "c)", attendu: ["15", "quinze"] },
          ],
        },
        {
          titre: "Les égalités qui s'équilibrent",
          enonce: "Trouve le nombre qui manque.\na) 6 + 4 = 5 + …\nb) 20 + 7 = 30 − …\nc) 8 + 8 = 10 + …",
          correction:
            "Le signe = veut dire : autant des deux côtés. Je calcule d'abord le côté complet.\na) 6 + 4 = 10. Il faut 5 + … = 10. 5 + 5 = 10. Il manque 5.\nb) 20 + 7 = 27. Il faut 30 − … = 27. 30 − 3 = 27. Il manque 3.\nc) 8 + 8 = 16. Il faut 10 + … = 16. Il manque 6.\n⛔ Le piège du a) : écrire 10. 5 + 10 ferait 15, pas 10.\nRéponse : a) 5 ; b) 3 ; c) 6.",
          micros: ["cp_signe_egal", "cp_add_sous_ligne", "cp_add_sous_defi"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: ["6", "six"] },
          ],
        },
        {
          titre: "Le match de basket",
          enonce: "L'équipe rouge a 35 points.\nElle a 10 points de plus que l'équipe bleue.\na) Combien de points a l'équipe bleue ?\nb) Combien de points les deux équipes ont-elles en tout ?",
          correction:
            "a) La rouge a 10 points de plus. Donc la bleue en a 10 de moins.\nJ'enlève : 35 − 10 = 25. La bleue a 25 points.\nJe vérifie : 25 + 10 = 35. Oui, la rouge a bien 10 de plus.\nb) Je réunis : 35 + 25. Unités : 5 + 5 = 10. Dizaines : 3 + 2 = 5, soit 50. 50 + 10 = 60.\n⛔ Le piège du a) : voir « plus » et calculer 35 + 10 = 45. La bleue a MOINS de points que la rouge.\nRéponse : a) 25 ; b) 60.",
          micros: ["cp_add_sous_defi", "cp_sous_sens"],
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "60" },
          ],
        },
      ],
    },
  ],
};
