// ─── Fiche d'exercices : le calcul mental (CP) — 20 exercices corrigés ────────
//
// 17/11/2026 : la feuille interactive de la notion `calcul_mental` du coach
// CP (11 micros). Sur la forme des feuilles du CM1 : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/cp/maths/calcul-mental.bank.ts`).
// ⛔ LIMITES DU CP (BO n° 41 du 31/10/2024) : nombres ET résultats jusqu'à
// 100 ; les doubles de 1 à 10 et de 20, 30, 40, 50 ; les moitiés des nombres
// pairs jusqu'à 20 et de 40, 60, 80, 100 ; ajouter ou retirer 1, 2, 10, et les
// dizaines entières ; les procédures que le BO nomme (complément à la dizaine
// du dessus, ajouter 9, ajouter deux nombres < 100 comme 47 + 28, soustraire
// un petit nombre à une dizaine entière). ⛔ Pas de calculatrice.
// Le passage de la dizaine (la retenue) attend le niveau ★★ et ★★★.
// ⛔ Aucune question à rédiger : un nombre, un QCM, vrai ou faux.
// Phrases de l'énoncé : 14 mots au plus.
//
// Les pièges nommés : compter le nombre de départ sur ses doigts (1), 7 + 10
// au lieu de 7 + 3 (2), le double confondu avec + 2 (3), la moitié confondue
// avec − 2 (4), + 10 qui touche les unités, 46 + 10 = 47 (5), − 10 qui touche
// les unités (6), 25 + 20 = 27 (7), le complément à 10 au lieu de la dizaine
// du dessus (8), + 9 sans retirer 1 (9), 30 − 4 = 34 (10), ajouter les chiffres
// en travers (11), oublier la dizaine passée (12), double de 50 = 55 (13),
// 13 − 5 compté de travers (14), 37 + 10 = 38 (15), choisir le calcul qui
// « ressemble » (16), 70 + 15 = 715 (17), avancer et reculer dans le mauvais
// ordre (18), prendre le double au lieu de la moitié (19), faire l'opération
// du texte au lieu de l'inverse (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : goûter (2, cadre de dix), cuisine (4,
// fraises), fleuriste (17), jeu de l'oie (18), ferme (19), devinettes (20).
// Métiers : la fleuriste (17), le fermier (19).
// Aucun contexte réunionnais sur cette feuille.
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// Micro-compétences : cp_calcul_tables_addition (1, 14, 15, 16),
// cp_calcul_complements_10 (2, 16), cp_calcul_doubles (3, 13, 15, 19),
// cp_calcul_moitie (4, 13, 19), cp_calcul_plus_moins_1_2_10 (5, 6, 15, 18,
// 20), cp_calcul_dizaines_entieres (7, 11), cp_calcul_complement_dizaine (8,
// 12), cp_calcul_ajouter_9 (9, 18), cp_calcul_ajouter_deux_nombres (11, 17),
// cp_calcul_soustraire_dizaine (10, 15), cp_calcul_defi (17, 18, 19, 20). 11/11.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { droiteRel, ecranSeulement } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { baseDix, cadreDix, collection } from "@/lib/fiches-exercices/dessins-cp-lot-a";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];

export const exercicesCalculMentalCp: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cp",
  notion: "calcul-mental",
  titre: "Le calcul mental",
  accroche:
    "Vingt exercices, du geste seul au problème. Les tables d'addition. Les compléments à 10. Les doubles et les moitiés. Ajouter ou enlever 1, 2, 10, puis des dizaines. Ajouter 9 en deux temps. Ajouter deux nombres. Un goûter, une fleuriste, un jeu de l'oie, une ferme et des devinettes. Un rappel avant chaque niveau. Cherche dans ta tête. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cp",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un calcul dans ma tête. J'écris seulement le résultat.",
      rappel: [
        "Les compléments à 10 : 1 + 9, 2 + 8, 3 + 7, 4 + 6, 5 + 5.",
        "Un double, c'est un nombre ajouté à lui-même : 4 + 4 = 8.",
        "+ 10 : le chiffre des dizaines avance de 1. Les unités ne bougent pas.",
      ],
      exercices: [
        {
          enonce: "Calcule dans ta tête.\na) 6 + 3\nb) 4 + 5\nc) 8 + 2\nd) 9 + 6",
          correction:
            "Je pars du plus grand nombre et j'avance du plus petit.\na) 6, puis 7, 8, 9. Donc 9.\nb) 5, puis 6, 7, 8, 9. Donc 9.\nc) 8 + 2 : c'est un complément à 10. Donc 10.\nd) 9 + 1 = 10. Il reste 5 à ajouter : 10 + 5 = 15.\n⛔ Le piège : dire « six » en comptant le premier doigt. Je pars de 6 et j'avance : sept, huit, neuf.\nRéponse : a) 9 ; b) 9 ; c) 10 ; d) 15.",
          micros: ["cp_calcul_tables_addition"],
          reponses: [
            { question: "a)", attendu: ["9", "neuf"] },
            { question: "b)", attendu: ["9", "neuf"] },
            { question: "c)", attendu: ["10", "dix"] },
            { question: "d)", attendu: ["15", "quinze"] },
          ],
        },
        {
          enonce: "Pour le goûter, Sam pose des jetons rouges.\nCombien de jetons faut-il pour remplir le cadre de 10 ?",
          figure: cadreDix(7),
          correction:
            "Le cadre a 10 cases. Je compte les jetons rouges : 7.\nJe compte les cases vides : 1, 2, 3.\n7 + 3 = 10. Il faut 3 jetons.\n⛔ Le piège : répondre 10. Je cherche seulement les jetons qui manquent.\nRéponse : 3.",
          micros: ["cp_calcul_complements_10"],
          reponses: [{ attendu: ["3", "trois"] }],
        },
        {
          enonce: "Trouve le double.\na) double de 3\nb) double de 6\nc) double de 10\nd) double de 20",
          correction:
            "Le double, c'est le nombre plus lui-même.\na) 3 + 3 = 6.\nb) 6 + 6 = 12.\nc) 10 + 10 = 20.\nd) 2 dizaines + 2 dizaines = 4 dizaines : 40.\n⛔ Le piège : ajouter 2 au lieu de doubler. Le double de 6 n'est pas 8.\nRéponse : a) 6 ; b) 12 ; c) 20 ; d) 40.",
          micros: ["cp_calcul_doubles"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["12", "douze"] },
            { question: "c)", attendu: ["20", "vingt"] },
            { question: "d)", attendu: ["40", "quarante"] },
          ],
        },
        {
          enonce: "Deux amis partagent les fraises en deux parts égales.\na) Combien de fraises a chaque ami ?\nb) Trouve la moitié de 20.",
          figure: collection([{ n: 14, forme: "fraise" }], { parLigne: 7 }),
          correction:
            "La moitié, c'est un nombre coupé en deux parts égales.\na) Je compte les fraises : 14. Je cherche le double qui fait 14 : 7 + 7 = 14.\nChaque ami a 7 fraises.\nb) 10 + 10 = 20. La moitié de 20 est 10.\n⛔ Le piège : enlever 2 au lieu de couper en deux. 14 − 2 = 12 n'est pas une moitié.\nRéponse : a) 7 ; b) 10.",
          micros: ["cp_calcul_moitie"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["10", "dix"] },
          ],
        },
        {
          enonce: "Calcule.\na) 34 + 1\nb) 57 + 2\nc) 46 + 10\nd) 81 + 10",
          correction:
            "a) + 1 : j'avance d'un pas. 35.\nb) + 2 : j'avance de deux pas. 58, 59.\nc) + 10 : la dizaine avance. 4 dizaines deviennent 5. Donc 56.\nd) 8 dizaines deviennent 9. Donc 91.\n⛔ Le piège du c) : écrire 47. + 10 change le chiffre des dizaines, pas celui des unités.\nRéponse : a) 35 ; b) 59 ; c) 56 ; d) 91.",
          micros: ["cp_calcul_plus_moins_1_2_10"],
          reponses: [
            { question: "a)", attendu: "35" },
            { question: "b)", attendu: "59" },
            { question: "c)", attendu: "56" },
            { question: "d)", attendu: "91" },
          ],
        },
        {
          enonce: "Calcule.\na) 40 − 1\nb) 63 − 2\nc) 75 − 10\nd) 30 − 10",
          correction:
            "a) − 1 : je recule d'un pas. Avant 40 vient 39.\nb) − 2 : je recule de deux pas. 62, 61.\nc) − 10 : la dizaine recule. 7 dizaines deviennent 6. Donc 65.\nd) 3 dizaines deviennent 2. Donc 20.\n⛔ Le piège du c) : écrire 74. − 10 enlève une dizaine, pas une unité.\nRéponse : a) 39 ; b) 61 ; c) 65 ; d) 20.",
          micros: ["cp_calcul_plus_moins_1_2_10"],
          reponses: [
            { question: "a)", attendu: "39" },
            { question: "b)", attendu: "61" },
            { question: "c)", attendu: "65" },
            { question: "d)", attendu: ["20", "vingt"] },
          ],
        },
        {
          enonce: "Calcule.\na) 20 + 30\nb) 40 + 50\nc) 80 − 30\nd) 25 + 20",
          correction:
            "Je compte les dizaines comme des unités.\na) 2 dizaines + 3 dizaines = 5 dizaines. Donc 50.\nb) 4 + 5 = 9 dizaines. Donc 90.\nc) 8 − 3 = 5 dizaines. Donc 50.\nd) 2 dizaines + 2 dizaines = 4 dizaines. Les 5 unités restent. Donc 45.\n⛔ Le piège du d) : écrire 27. 20, c'est 2 dizaines, pas 2 unités.\nRéponse : a) 50 ; b) 90 ; c) 50 ; d) 45.",
          micros: ["cp_calcul_dizaines_entieres"],
          reponses: [
            { question: "a)", attendu: "50" },
            { question: "b)", attendu: "90" },
            { question: "c)", attendu: "50" },
            { question: "d)", attendu: "45" },
          ],
        },
        {
          enonce: "Complète jusqu'à la dizaine suivante.\na) 27 + … = 30\nb) 54 + … = 60\nc) 82 + … = 90",
          correction:
            "Je regarde les unités. Je cherche ce qui manque pour aller à 10.\na) 7 + 3 = 10. Donc 27 + 3 = 30.\nb) 4 + 6 = 10. Donc 54 + 6 = 60.\nc) 2 + 8 = 10. Donc 82 + 8 = 90.\n⛔ Le piège : chercher le complément à 10 de tout le nombre. Seules les unités comptent ici.\nRéponse : a) 3 ; b) 6 ; c) 8.",
          micros: ["cp_calcul_complement_dizaine"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["6", "six"] },
            { question: "c)", attendu: ["8", "huit"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux petits calculs dans ma tête. J'écris le résultat.",
      rappel: [
        "+ 9 : j'ajoute 10, puis j'enlève 1.",
        "40 − 3 : je pense 10 − 3 = 7. Donc 40 − 3 = 37.",
        "Pour passer la dizaine : 38 + 5, c'est 38 + 2 = 40, puis 40 + 3 = 43.",
      ],
      exercices: [
        {
          enonce: "Ajoute 9 en deux temps.\na) 23 + 9\nb) 45 + 9\nc) 17 + 9",
          correction:
            "9, c'est 10 moins 1. J'ajoute 10, puis j'enlève 1.\na) 23 + 10 = 33. Puis 33 − 1 = 32.\nb) 45 + 10 = 55. Puis 55 − 1 = 54.\nc) 17 + 10 = 27. Puis 27 − 1 = 26.\n⛔ Le piège : s'arrêter à 33. J'ai ajouté 10, c'est 1 de trop : je l'enlève.\nRéponse : a) 32 ; b) 54 ; c) 26.",
          micros: ["cp_calcul_ajouter_9"],
          reponses: [
            { question: "a)", attendu: "32" },
            { question: "b)", attendu: "54" },
            { question: "c)", attendu: "26" },
          ],
        },
        {
          enonce: "Calcule.\na) 30 − 4\nb) 50 − 7\nc) 80 − 1\nd) 20 − 9",
          correction:
            "J'enlève un petit nombre à une dizaine. Je casse une dizaine.\na) 10 − 4 = 6. Il reste 2 dizaines : 26.\nb) 10 − 7 = 3. Il reste 4 dizaines : 43.\nc) Avant 80 vient 79.\nd) 10 − 9 = 1. Il reste 1 dizaine : 11.\n⛔ Le piège du a) : écrire 34. On enlève : le résultat est plus petit que 30.\nRéponse : a) 26 ; b) 43 ; c) 79 ; d) 11.",
          micros: ["cp_calcul_soustraire_dizaine"],
          reponses: [
            { question: "a)", attendu: "26" },
            { question: "b)", attendu: "43" },
            { question: "c)", attendu: "79" },
            { question: "d)", attendu: ["11", "onze"] },
          ],
        },
        {
          enonce: "Ajoute les dizaines, puis les unités.\na) 32 + 25\nb) 41 + 36\nc) 23 + 40",
          figure: baseDix(3, 2),
          correction:
            "Le dessin montre 32. Je coupe chaque nombre en dizaines et en unités.\na) Dizaines : 30 + 20 = 50. Unités : 2 + 5 = 7. 50 + 7 = 57.\nb) Dizaines : 40 + 30 = 70. Unités : 1 + 6 = 7. Donc 77.\nc) Dizaines : 20 + 40 = 60. Unités : 3. Donc 63.\n⛔ Le piège : ajouter un chiffre de dizaine à un chiffre d'unité. Chacun avec les siens.\nRéponse : a) 57 ; b) 77 ; c) 63.",
          micros: ["cp_calcul_ajouter_deux_nombres", "cp_calcul_dizaines_entieres"],
          reponses: [
            { question: "a)", attendu: "57" },
            { question: "b)", attendu: "77" },
            { question: "c)", attendu: "63" },
          ],
        },
        {
          enonce: "Passe par la dizaine.\na) 38 + 5\nb) 46 + 7\nc) 59 + 3",
          schema: ecranSeulement(
            droiteRel(36, 46, 1, [{ value: 38, label: "" }], {
              nombres: 2,
              sauts: [
                { de: 38, vers: 40, label: "+ 2" },
                { de: 40, vers: 43, label: "+ 3" },
              ],
            }),
          ),
          correction:
            "Je complète d'abord jusqu'à la dizaine. Puis j'ajoute le reste.\na) 5 = 2 + 3. 38 + 2 = 40. Puis 40 + 3 = 43.\nb) 7 = 4 + 3. 46 + 4 = 50. Puis 50 + 3 = 53.\nc) 3 = 1 + 2. 59 + 1 = 60. Puis 60 + 2 = 62.\n⛔ Le piège : oublier la dizaine passée et écrire 33 pour 38 + 5. Le résultat doit être plus grand que 38.\nRéponse : a) 43 ; b) 53 ; c) 62.",
          micros: ["cp_calcul_complement_dizaine"],
          reponses: [
            { question: "a)", attendu: "43" },
            { question: "b)", attendu: "53" },
            { question: "c)", attendu: "62" },
          ],
        },
        {
          enonce: "Calcule.\na) double de 30\nb) double de 50\nc) moitié de 40\nd) moitié de 100",
          correction:
            "Je compte en dizaines.\na) 3 dizaines + 3 dizaines = 6 dizaines : 60.\nb) 5 dizaines + 5 dizaines = 10 dizaines : 100.\nc) 40, c'est 20 + 20. La moitié de 40 est 20.\nd) 100, c'est 50 + 50. La moitié de 100 est 50.\n⛔ Le piège du b) : écrire 55. Le double de 50, c'est 50 + 50.\nRéponse : a) 60 ; b) 100 ; c) 20 ; d) 50.",
          micros: ["cp_calcul_doubles", "cp_calcul_moitie"],
          reponses: [
            { question: "a)", attendu: ["60", "soixante"] },
            { question: "b)", attendu: ["100", "cent"] },
            { question: "c)", attendu: ["20", "vingt"] },
            { question: "d)", attendu: ["50", "cinquante"] },
          ],
        },
        {
          enonce: "Calcule.\na) 13 − 5\nb) 15 − 8\nc) 11 − 3",
          correction:
            "Je pense à l'addition qui va avec.\na) 5 + … = 13 ? 5 + 5 = 10, puis 3 de plus : 8. Donc 13 − 5 = 8.\nb) 8 + … = 15 ? 8 + 2 = 10, puis 5 de plus : 7. Donc 15 − 8 = 7.\nc) 3 + … = 11 ? 3 + 7 = 10, puis 1 de plus : 8. Donc 11 − 3 = 8.\n⛔ Le piège : reculer en comptant le nombre de départ. Je pense plutôt à l'addition.\nRéponse : a) 8 ; b) 7 ; c) 8.",
          micros: ["cp_calcul_tables_addition"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["7", "sept"] },
            { question: "c)", attendu: ["8", "huit"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 9 + 9 = 18\nb) 37 + 10 = 38\nc) 70 − 5 = 65\nd) 6 + 7 = 12",
          correction:
            "Je refais chaque calcul.\na) Le double de 9 : 9 + 9 = 18. Vrai.\nb) + 10 : la dizaine avance. 37 + 10 = 47, pas 38. Faux.\nc) 10 − 5 = 5. Il reste 6 dizaines : 65. Vrai.\nd) 6 + 6 = 12, donc 6 + 7 = 13. Faux.\n⛔ Le piège du b) : ajouter 1 au lieu de 10. 38, c'est 37 + 1.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["cp_calcul_doubles", "cp_calcul_plus_moins_1_2_10", "cp_calcul_soustraire_dizaine", "cp_calcul_tables_addition"],
          reponses: [
            { question: "a)", attendu: VRAI },
            { question: "b)", attendu: FAUX },
            { question: "c)", attendu: VRAI },
            { question: "d)", attendu: FAUX },
          ],
        },
        {
          enonce: "Choisis le bon calcul. Écris la lettre.\na) Quel calcul fait 50 ? A) 25 + 25 B) 40 + 1 C) 30 + 30\nb) Quel calcul fait 20 ? A) 10 + 2 B) 13 + 7 C) 15 + 15",
          correction:
            "Je calcule chaque proposition.\na) A) 25 + 25 = 50. B) 40 + 1 = 41. C) 30 + 30 = 60. Réponse A.\nb) A) 10 + 2 = 12. B) 3 + 7 = 10, donc 13 + 7 = 20. C) 15 + 15 = 30. Réponse B.\n⛔ Le piège : choisir 10 + 2 parce qu'on voit un 2. Je calcule, je ne devine pas.\nRéponse : a) A ; b) B.",
          micros: ["cp_calcul_complements_10", "cp_calcul_tables_addition"],
          reponses: [
            { question: "a)", attendu: ["A", "A) 25 + 25"] },
            { question: "b)", attendu: ["B", "B) 13 + 7"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis l'histoire. Je calcule dans ma tête, étape par étape.",
      rappel: [
        "47 + 28 : 40 + 20 = 60. 7 + 8 = 15. 60 + 15 = 75.",
        "Avancer, c'est ajouter. Reculer, c'est enlever.",
        "Pour retrouver un nombre, je fais le calcul à l'envers.",
      ],
      exercices: [
        {
          titre: "Les roses de la fleuriste",
          enonce: "Une fleuriste a 47 roses.\nElle reçoit encore 28 roses.\na) Combien a-t-elle de roses ?\nb) Elle fait des bouquets de 10 roses. Combien de bouquets complets ?",
          correction:
            "a) Dizaines : 40 + 20 = 60. Unités : 7 + 8 = 15.\n60 + 15 = 75. Elle a 75 roses.\nb) 75, c'est 7 dizaines et 5 unités.\nChaque bouquet est une dizaine : 7 bouquets complets. Il reste 5 roses.\n⛔ Le piège du a) : écrire 615 en collant 60 et 15. 60 + 15 = 75.\nRéponse : a) 75 ; b) 7.",
          micros: ["cp_calcul_ajouter_deux_nombres", "cp_calcul_defi"],
          reponses: [
            { question: "a)", attendu: "75" },
            { question: "b)", attendu: ["7", "sept"] },
          ],
        },
        {
          titre: "Le jeu de l'oie",
          enonce: "Le pion de Zoé est sur la case 36.\nElle avance de 9 cases.\nPuis elle recule de 2 cases.\na) Sur quelle case est-elle après avoir avancé ?\nb) Sur quelle case finit-elle ?",
          correction:
            "a) Avancer de 9 : j'ajoute 10, puis j'enlève 1.\n36 + 10 = 46. Puis 46 − 1 = 45. Elle est sur la case 45.\nb) Reculer de 2 : 45 − 2. Je recule : 44, 43.\nElle finit sur la case 43.\n⛔ Le piège : reculer avant d'avancer. Je suis l'ordre de l'histoire.\nRéponse : a) 45 ; b) 43.",
          micros: ["cp_calcul_ajouter_9", "cp_calcul_plus_moins_1_2_10", "cp_calcul_defi"],
          reponses: [
            { question: "a)", attendu: "45" },
            { question: "b)", attendu: "43" },
          ],
        },
        {
          titre: "Les œufs de la ferme",
          enonce: "Le fermier ramasse 16 œufs le matin.\nIl en vend la moitié.\na) Combien en vend-il ?\nb) Le soir, il ramasse le double de 6 œufs. Combien en ramasse-t-il le soir ?\nc) Avec ceux qui restent du matin, combien en a-t-il ?",
          correction:
            "a) La moitié de 16 : 8 + 8 = 16. Il en vend 8.\nIl lui reste aussi 8 œufs du matin.\nb) Le double de 6 : 6 + 6 = 12. Il en ramasse 12.\nc) 8 + 12 : 8 + 2 = 10, puis 10 + 10 = 20. Il a 20 œufs.\n⛔ Le piège du a) : prendre le double, 32, au lieu de la moitié. Vendre la moitié, c'est en garder autant qu'on vend.\nRéponse : a) 8 ; b) 12 ; c) 20.",
          micros: ["cp_calcul_moitie", "cp_calcul_doubles", "cp_calcul_defi"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["12", "douze"] },
            { question: "c)", attendu: ["20", "vingt"] },
          ],
        },
        {
          titre: "Les devinettes",
          enonce: "a) Je pense à un nombre. J'ajoute 10. Je trouve 64. Quel est mon nombre ?\nb) Je pense à un nombre. J'enlève 5. Je trouve 30. Quel est mon nombre ?",
          correction:
            "Je fais le calcul à l'envers.\na) On a ajouté 10. Pour revenir, j'enlève 10 : 64 − 10 = 54.\nJe vérifie : 54 + 10 = 64.\nb) On a enlevé 5. Pour revenir, j'ajoute 5 : 30 + 5 = 35.\nJe vérifie : 35 − 5 = 30.\n⛔ Le piège : refaire le calcul du texte. 64 + 10 = 74 ne marche pas : 74 + 10 donne 84.\nRéponse : a) 54 ; b) 35.",
          micros: ["cp_calcul_defi", "cp_calcul_plus_moins_1_2_10"],
          reponses: [
            { question: "a)", attendu: "54" },
            { question: "b)", attendu: "35" },
          ],
        },
      ],
    },
  ],
};
