// ─── Fiche d'exercices : calcul mental et fluence (CE2) — 20 exercices ────────
//
// 17/11/2026 : la feuille interactive de la notion `calcul_mental` du coach
// CE2 (« Calcul mental et fluence », 11 micros). Sur la forme des feuilles du
// CM1 (`maths-cm1-masse.tsx`, `maths-cm1-calcul.tsx`) et du CE1
// (`maths-ce1-calcul-mental.tsx`) : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque
// niveau, corrigés à la première personne, étape par étape, avec le piège
// nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce2/maths/calcul.bank.ts`) : les huit familles
// que nomme le programme (compléments à 100 et à 1 000, doubles et moitiés,
// décomposer, + 9 / + 19, − 9 / − 39, × 4 et × 8 en doublant, multiples de
// 25, × un nombre de dizaines, 23 × 4 en coupant 23), et la fluence.
// Chaque corrigé enseigne la PROCÉDURE, pas seulement le résultat.
// ⛔ LIMITES DU CE2 : nombres sous 10 000, pas de priorités opératoires.
// ⛔ Aucune question à rédiger : QCM par lettre, un nombre.
// ⛔ Des enfants de 7-8 ans : 18 mots au plus par phrase.
//
// Les pièges nommés : compléter à la dizaine au lieu de la centaine (1, 2),
// doubler seulement les dizaines (3), + 10 sans enlever 1 (4, 10), − 10 en
// trop ou en moins (5, 20), doubler une seule fois pour × 4 (6, 13), 25 × 3
// = 65 (7), oublier le zéro des dizaines (8, 15), oublier un morceau (9, 19),
// mélanger centaines et dizaines (11), prendre la moitié deux fois (12),
// compter 4 tours de 25 (14), aller trop vite (16), compter la fléchette à
// 100 comme 10 (17), ajouter au lieu de compléter (18), faire les étapes
// dans le mauvais sens (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : argent de poche (10), fleuriste (12),
// athlétisme (14), marché (15), fléchettes (17), glacier (18), pâtisserie
// (19), nombre mystère (20).
// Les métiers : fleuriste (12), marchand (15), glacier (18), pâtissier (19).
// UN SEUL contexte réunionnais (15, les ananas Victoria au marché de
// Saint-Denis, MODÈLE). Aucun fait réel : tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS : le schéma en barre (`barre`, le tout et ses parts, « ? »
// en orange), le matériel de numération (`baseDixMille`), et, dans le
// corrigé seulement, les bonds sur la droite graduée (`droiteRel`).
//
// Micro-compétences (11/11) : ce2_calcul_complements (1, 2, 18),
// ce2_calcul_doubles_moities (3, 12, 20), ce2_calcul_decomposer (9, 11),
// ce2_calcul_ajouter_9_19 (4, 10), ce2_calcul_soustraire_9_19 (5, 10, 19,
// 20), ce2_calcul_multiplier_4_8 (6, 13, 18), ce2_calcul_multiples_25 (7, 14,
// 17), ce2_calcul_dizaines_entieres (8, 15), ce2_calcul_distributivite (9,
// 19), ce2_calcul_fluence (16), ce2_calcul_defi (17, 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { droiteRel, ecranSeulement } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { barre } from "@/lib/fiches-exercices/dessins-cp-lot-a";
import { baseDixMille } from "@/lib/fiches-exercices/dessins-ce2-lotF";

export const exercicesCalculMentalCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "calcul-mental",
  titre: "Le calcul mental",
  accroche:
    "Vingt exercices, du plus facile au défi. Compléter à 100 et à 1 000. Doubles et moitiés. Ajouter 9 ou 19, enlever 29 ou 39. Multiplier par 4 ou par 8 en doublant. Les multiples de 25. Calculer 23 × 4 en coupant 23. Des ananas, des fléchettes, des glaces et un nombre mystère. Lis le rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un calcul de tête par question. J'écris le résultat seul.",
      rappel: [
        "+ 9, c'est + 10 puis − 1. − 19, c'est − 20 puis + 1.",
        "× 4, c'est doubler deux fois. × 8, c'est doubler trois fois.",
        "3 × 40 : je fais 3 × 4 = 12, puis 12 dizaines = 120.",
      ],
      exercices: [
        {
          enonce: "Complète pour faire 100. Le schéma montre le a).\na) 35 + … = 100\nb) 72 + … = 100\nc) 8 + … = 100",
          figure: barre("100", [
            { label: "35", poids: 35 },
            { label: "?", poids: 65 },
          ]),
          correction:
            "Je complète d'abord à la dizaine, puis à 100.\na) 35 + 5 = 40. 40 + 60 = 100. 5 + 60 = 65.\nb) 72 + 8 = 80. 80 + 20 = 100. 8 + 20 = 28.\nc) 8 + 2 = 10. 10 + 90 = 100. 2 + 90 = 92.\n⛔ Le piège : répondre 75 au a). Je vérifie : 35 + 65 = 100.\nRéponse : a) 65 ; b) 28 ; c) 92.",
          micros: ["ce2_calcul_complements"],
          reponses: [
            { question: "a)", attendu: "65" },
            { question: "b)", attendu: "28" },
            { question: "c)", attendu: "92" },
          ],
        },
        {
          enonce: "Complète pour faire 1 000.\na) 400 + … = 1 000\nb) 750 + … = 1 000\nc) 920 + … = 1 000",
          correction:
            "Je pense en centaines : 1 000, ce sont 10 centaines.\na) 4 centaines + 6 centaines = 10 centaines. Il manque 600.\nb) 750 + 50 = 800. 800 + 200 = 1 000. 50 + 200 = 250.\nc) 920 + 80 = 1 000. Il manque 80.\n⛔ Le piège du c) : répondre 180. 920 + 180 = 1 100, c'est trop.\nRéponse : a) 600 ; b) 250 ; c) 80.",
          micros: ["ce2_calcul_complements"],
          reponses: [
            { question: "a)", attendu: "600" },
            { question: "b)", attendu: "250" },
            { question: "c)", attendu: "80" },
          ],
        },
        {
          enonce: "Doubles et moitiés.\na) Le double de 35\nb) Le double de 240\nc) La moitié de 80\nd) La moitié de 150",
          correction:
            "a) Double de 30 : 60. Double de 5 : 10. 60 + 10 = 70.\nb) Double de 200 : 400. Double de 40 : 80. 400 + 80 = 480.\nc) La moitié de 8 dizaines : 4 dizaines. 40.\nd) 150 = 100 + 50. Moitié de 100 : 50. Moitié de 50 : 25. 50 + 25 = 75.\n⛔ Le piège du a) : doubler seulement les dizaines et écrire 65.\nRéponse : a) 70 ; b) 480 ; c) 40 ; d) 75.",
          micros: ["ce2_calcul_doubles_moities"],
          reponses: [
            { question: "a)", attendu: "70" },
            { question: "b)", attendu: "480" },
            { question: "c)", attendu: "40" },
            { question: "d)", attendu: "75" },
          ],
        },
        {
          enonce: "Ajoute 8, 9 ou 19.\na) 46 + 9\nb) 135 + 19\nc) 270 + 8",
          correction:
            "a) + 9, c'est + 10 puis − 1. 46 + 10 = 56. 56 − 1 = 55.\nb) + 19, c'est + 20 puis − 1. 135 + 20 = 155. 155 − 1 = 154.\nc) + 8, c'est + 10 puis − 2. 270 + 10 = 280. 280 − 2 = 278.\n⛔ Le piège : ajouter 10 et oublier d'enlever 1. 46 + 9 n'est pas 56.\nRéponse : a) 55 ; b) 154 ; c) 278.",
          schema: ecranSeulement(
            droiteRel(45, 60, 1, [
              { value: 46, label: "46" },
              { value: 55, label: "55", color: "#16a34a" },
            ], {
              nombres: 5,
              sauts: [
                { de: 46, vers: 56, label: "+ 10" },
                { de: 56, vers: 55, label: "− 1" },
              ],
            }),
          ),
          micros: ["ce2_calcul_ajouter_9_19"],
          reponses: [
            { question: "a)", attendu: "55" },
            { question: "b)", attendu: "154" },
            { question: "c)", attendu: "278" },
          ],
        },
        {
          enonce: "Enlève 9, 19 ou 39.\na) 83 − 9\nb) 150 − 19\nc) 200 − 39",
          correction:
            "a) − 9, c'est − 10 puis + 1. 83 − 10 = 73. 73 + 1 = 74.\nb) − 19, c'est − 20 puis + 1. 150 − 20 = 130. 130 + 1 = 131.\nc) − 39, c'est − 40 puis + 1. 200 − 40 = 160. 160 + 1 = 161.\n⛔ Le piège : enlever 1 au lieu d'ajouter 1. J'ai enlevé 1 de trop, je le rends.\nRéponse : a) 74 ; b) 131 ; c) 161.",
          micros: ["ce2_calcul_soustraire_9_19"],
          reponses: [
            { question: "a)", attendu: "74" },
            { question: "b)", attendu: "131" },
            { question: "c)", attendu: "161" },
          ],
        },
        {
          enonce: "Multiplie en doublant.\na) 12 × 4\nb) 15 × 4\nc) 11 × 8",
          correction:
            "× 4 : je double deux fois. × 8 : je double trois fois.\na) 12 → 24 → 48. 12 × 4 = 48.\nb) 15 → 30 → 60. 15 × 4 = 60.\nc) 11 → 22 → 44 → 88. 11 × 8 = 88.\n⛔ Le piège : doubler une seule fois, et écrire 24 au a). Ça, c'est 12 × 2.\nRéponse : a) 48 ; b) 60 ; c) 88.",
          micros: ["ce2_calcul_multiplier_4_8"],
          reponses: [
            { question: "a)", attendu: "48" },
            { question: "b)", attendu: "60" },
            { question: "c)", attendu: "88" },
          ],
        },
        {
          enonce: "Les multiples de 25.\na) 25 × 2\nb) 25 × 3\nc) 25 × 4\nd) Combien de fois 25 dans 200 ?",
          correction:
            "Je compte de 25 en 25 : 25, 50, 75, 100.\na) 25 × 2 = 50.\nb) 25 × 3 = 75.\nc) 25 × 4 = 100. Quatre fois 25 font 100.\nd) 100, c'est 4 fois 25. 200, c'est 2 fois 100 : 4 + 4 = 8 fois 25.\n⛔ Le piège du b) : écrire 65. 50 + 25 = 75.\nRéponse : a) 50 ; b) 75 ; c) 100 ; d) 8.",
          micros: ["ce2_calcul_multiples_25"],
          reponses: [
            { question: "a)", attendu: "50" },
            { question: "b)", attendu: "75" },
            { question: "c)", attendu: "100" },
            { question: "d)", attendu: ["8", "huit"] },
          ],
        },
        {
          enonce: "Multiplie par un nombre de dizaines.\na) 3 × 40\nb) 6 × 50\nc) 7 × 30\nd) 8 × 90",
          correction:
            "Je multiplie les chiffres, puis je compte des dizaines.\na) 3 × 4 = 12. 12 dizaines = 120.\nb) 6 × 5 = 30. 30 dizaines = 300.\nc) 7 × 3 = 21. 21 dizaines = 210.\nd) 8 × 9 = 72. 72 dizaines = 720.\n⛔ Le piège : oublier que ce sont des dizaines, et écrire 21 au c).\nRéponse : a) 120 ; b) 300 ; c) 210 ; d) 720.",
          micros: ["ce2_calcul_dizaines_entieres"],
          reponses: [
            { question: "a)", attendu: "120" },
            { question: "b)", attendu: "300" },
            { question: "c)", attendu: "210" },
            { question: "d)", attendu: "720" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je choisis le chemin le plus simple, puis je calcule de tête.",
      rappel: [
        "23 × 4 : je coupe 23 en 20 et 3. 20 × 4 = 80, 3 × 4 = 12.",
        "340 + 250 : centaines avec centaines, dizaines avec dizaines.",
        "Je vérifie que mon résultat est raisonnable.",
      ],
      exercices: [
        {
          enonce: "Calcule 23 × 4 en coupant 23 en 20 et 3.\na) 20 × 4 = …\nb) 3 × 4 = …\nc) 23 × 4 = …",
          correction:
            "a) 20 × 4 : 2 × 4 = 8, donc 8 dizaines = 80.\nb) 3 × 4 = 12.\nc) J'ajoute les deux morceaux : 80 + 12 = 92.\n⛔ Le piège : oublier un morceau, et écrire 80 ou 12 au c).\nRéponse : a) 80 ; b) 12 ; c) 92.",
          micros: ["ce2_calcul_distributivite", "ce2_calcul_decomposer"],
          reponses: [
            { question: "a)", attendu: "80" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "92" },
          ],
        },
        {
          enonce: "Mia a 67 € d'argent de poche. Sa mamie lui donne 19 €.\na) Combien a-t-elle maintenant ?\nb) Elle achète un livre à 29 €. Combien lui reste-t-il ?",
          correction:
            "a) + 19, c'est + 20 puis − 1. 67 + 20 = 87. 87 − 1 = 86. Elle a 86 €.\nb) − 29, c'est − 30 puis + 1. 86 − 30 = 56. 56 + 1 = 57. Il lui reste 57 €.\n⛔ Le piège du b) : faire − 30 puis − 1, et trouver 55.\nRéponse : a) 86 ; b) 57.",
          micros: ["ce2_calcul_ajouter_9_19", "ce2_calcul_soustraire_9_19"],
          reponses: [
            { question: "a)", attendu: "86" },
            { question: "b)", attendu: "57" },
          ],
        },
        {
          enonce: "Calcule en décomposant. Le dessin montre 560.\na) 340 + 250\nb) 1 200 + 700\nc) 560 − 230",
          figure: baseDixMille(0, 5, 6, 0),
          correction:
            "a) Centaines : 300 + 200 = 500. Dizaines : 40 + 50 = 90. 500 + 90 = 590.\nb) 12 centaines + 7 centaines = 19 centaines. 1 900.\nc) J'enlève 2 plaques de cent : 560 − 200 = 360. Puis 3 barres : 360 − 30 = 330.\n⛔ Le piège : mélanger les rangs, et faire 34 + 25 au a).\nRéponse : a) 590 ; b) 1 900 ; c) 330.",
          micros: ["ce2_calcul_decomposer"],
          reponses: [
            { question: "a)", attendu: "590" },
            { question: "b)", attendu: "1 900" },
            { question: "c)", attendu: "330" },
          ],
        },
        {
          enonce: "Le fleuriste a 360 tulipes. Il en vend la moitié le matin.\na) Combien en vend-il le matin ?\nb) L'après-midi, il vend la moitié de ce qui reste. Combien en vend-il ?",
          figure: barre("360", [
            { label: "?", poids: 1 },
            { label: "?", poids: 1 },
          ]),
          correction:
            "a) 360 = 300 + 60. Moitié de 300 : 150. Moitié de 60 : 30. 150 + 30 = 180.\nIl vend 180 tulipes le matin. Il en reste aussi 180.\nb) La moitié de 180 : moitié de 100, 50 ; moitié de 80, 40. 50 + 40 = 90.\n⛔ Le piège du b) : prendre la moitié de 360 encore une fois.\nRéponse : a) 180 ; b) 90.",
          micros: ["ce2_calcul_doubles_moities"],
          reponses: [
            { question: "a)", attendu: "180" },
            { question: "b)", attendu: "90" },
          ],
        },
        {
          enonce: "Multiplie par 8 en doublant trois fois.\na) 7 × 8\nb) 15 × 8",
          correction:
            "× 8 : je double, je double, je double.\na) 7 → 14 → 28 → 56. 7 × 8 = 56.\nb) 15 → 30 → 60 → 120. 15 × 8 = 120.\n⛔ Le piège : doubler deux fois seulement. 15 → 30 → 60, c'est 15 × 4.\nRéponse : a) 56 ; b) 120.",
          micros: ["ce2_calcul_multiplier_4_8"],
          reponses: [
            { question: "a)", attendu: "56" },
            { question: "b)", attendu: "120" },
          ],
        },
        {
          enonce: "Un tour de piste mesure 250 m.\na) Combien de mètres fait un coureur en 4 tours ?\nb) Et en 6 tours ?",
          correction:
            "a) 250 × 4 : je double deux fois. 250 → 500 → 1 000. 1 000 m.\nb) 6 tours = 4 tours + 2 tours. 2 tours : 500 m.\n1 000 + 500 = 1 500 m.\n⛔ Le piège : compter 25 au lieu de 250, et trouver 100.\nRéponse : a) 1 000 ; b) 1 500.",
          micros: ["ce2_calcul_multiples_25"],
          reponses: [
            { question: "a)", attendu: "1 000", unite: "m" },
            { question: "b)", attendu: "1 500", unite: "m" },
          ],
        },
        {
          enonce: "Au marché de Saint-Denis, un ananas Victoria coûte 3 €.\na) Combien coûtent 20 ananas ?\nb) Combien coûtent 40 ananas ?",
          correction:
            "a) 20 × 3 : 2 × 3 = 6. 6 dizaines = 60. 20 ananas coûtent 60 €.\nb) 40 × 3 : 4 × 3 = 12. 12 dizaines = 120. 40 ananas coûtent 120 €.\nAutre chemin : 40, c'est le double de 20. Le double de 60 est 120.\n⛔ Le piège : oublier les dizaines, et écrire 12 €.\nRéponse : a) 60 ; b) 120.",
          micros: ["ce2_calcul_dizaines_entieres"],
          reponses: [
            { question: "a)", attendu: "60" },
            { question: "b)", attendu: "120" },
          ],
        },
        {
          enonce: "Calcule vite, mais juste.\na) 7 × 6\nb) 1 000 − 300\nc) 48 + 9\nd) 45 × 2",
          correction:
            "a) 7 × 6 = 42 : la table de 6.\nb) 10 centaines − 3 centaines = 7 centaines. 700.\nc) 48 + 10 = 58. 58 − 1 = 57.\nd) Le double de 45 : double de 40, 80 ; double de 5, 10. 90.\n⛔ Le piège : aller trop vite et écrire 58 au c). Je n'oublie pas le − 1.\nRéponse : a) 42 ; b) 700 ; c) 57 ; d) 90.",
          micros: ["ce2_calcul_fluence"],
          reponses: [
            { question: "a)", attendu: "42" },
            { question: "b)", attendu: "700" },
            { question: "c)", attendu: "57" },
            { question: "d)", attendu: "90" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Défis ───────────────────────── */
    {
      niveau: 3,
      titre: "Défis",
      consigne: "Je lis tout. Je calcule de tête, une étape après l'autre.",
      rappel: [
        "J'écris seulement les résultats d'étape au brouillon.",
        "Je choisis le chemin le plus simple : doubler, couper, compléter.",
        "À la fin, je relis la question.",
      ],
      exercices: [
        {
          titre: "Les fléchettes",
          enonce: "La cible a trois zones : 25, 50 et 100 points.\nTom touche 25, 25 et 100.\nLou touche quatre fois 25, puis une fois 50.\na) Combien de points a Tom ?\nb) Combien de points a Lou ?\nc) Qui gagne ? A) Tom B) Lou C) égalité",
          correction:
            "a) 25 + 25 = 50. 50 + 100 = 150. Tom a 150 points.\nb) Quatre fois 25 : 25 × 4 = 100. 100 + 50 = 150. Lou a 150 points.\nc) 150 = 150 : égalité. Réponse C.\n⛔ Le piège du b) : compter 25 × 4 = 80. Quatre fois 25 font 100.\nRéponse : a) 150 ; b) 150 ; c) C.",
          micros: ["ce2_calcul_defi", "ce2_calcul_multiples_25"],
          reponses: [
            { question: "a)", attendu: "150" },
            { question: "b)", attendu: "150" },
            { question: "c)", attendu: "C" },
          ],
        },
        {
          titre: "Le glacier",
          enonce: "Une glace coûte 4 €. Le glacier vend 24 glaces.\na) Combien d'argent gagne-t-il ?\nb) Il voulait 100 €. Combien lui manque-t-il ?",
          correction:
            "a) 24 × 4 : je double deux fois. 24 → 48 → 96. Il gagne 96 €.\nb) Je complète 96 jusqu'à 100 : 96 + 4 = 100. Il manque 4 €.\n⛔ Le piège du b) : ajouter 96 + 100. On cherche ce qui manque.\nRéponse : a) 96 ; b) 4.",
          micros: ["ce2_calcul_defi", "ce2_calcul_multiplier_4_8", "ce2_calcul_complements"],
          reponses: [
            { question: "a)", attendu: "96" },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          titre: "Les choux du pâtissier",
          enonce: "Un pâtissier prépare 6 plateaux de 15 choux à la crème.\na) Combien de choux prépare-t-il ?\nb) Il en vend 39. Combien en reste-t-il ?",
          correction:
            "a) 15 × 6 : je coupe 15 en 10 et 5. 10 × 6 = 60. 5 × 6 = 30.\n60 + 30 = 90. Il prépare 90 choux.\nb) − 39, c'est − 40 puis + 1. 90 − 40 = 50. 50 + 1 = 51.\nIl en reste 51.\n⛔ Le piège du a) : oublier le morceau 5 × 6, et répondre 60.\nRéponse : a) 90 ; b) 51.",
          micros: ["ce2_calcul_defi", "ce2_calcul_distributivite", "ce2_calcul_soustraire_9_19"],
          reponses: [
            { question: "a)", attendu: "90" },
            { question: "b)", attendu: "51" },
          ],
        },
        {
          titre: "Le nombre mystère",
          enonce: "Je pense à un nombre. Je le double, puis j'ajoute 19. Je trouve 99.\na) Quel nombre avais-je avant d'ajouter 19 ?\nb) Quel est mon nombre ?",
          correction:
            "Je remonte les étapes à l'envers.\na) Avant + 19, j'avais 99 − 19. − 19, c'est − 20 puis + 1. 99 − 20 = 79. 79 + 1 = 80.\nb) Avant de doubler, j'avais la moitié de 80 : 40.\nJe vérifie : double de 40 = 80. 80 + 19 = 99.\n⛔ Le piège : refaire les étapes dans le même sens, doubler 99.\nRéponse : a) 80 ; b) 40.",
          micros: ["ce2_calcul_defi", "ce2_calcul_doubles_moities", "ce2_calcul_soustraire_9_19"],
          reponses: [
            { question: "a)", attendu: "80" },
            { question: "b)", attendu: "40" },
          ],
        },
      ],
    },
  ],
};
