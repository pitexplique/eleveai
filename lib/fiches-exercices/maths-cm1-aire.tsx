// ─── Fiche d'exercices : l'aire (CM1) — 20 exercices corrigés ─────────────────
//
// 10/11/2026 : la feuille de la notion `aire` du coach CM1 (5 micros). Sur la
// forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque
// niveau, corrigés à la première personne, étape par étape, avec le piège
// nommé. Chaque exercice a ses réponses vérifiées sans IA (`reponses`).
//
// Alignée sur la carte mentale remplie `cm1/aire` et sur les micros du coach :
// l'aire est la place À L'INTÉRIEUR (aire_comprendre), on compte des carreaux
// avec une unité (aire_unite), rangées × carreaux par rangée puis longueur ×
// largeur en m² et cm² comme sur la carte (aire_carre_rectangle), découper ou
// enlever (aire_composer), chercher le nombre qui manque (aire_defi).
// ⛔ LIMITES DU CM1 : entiers, demi-carreaux seulement en comptage, pas de
// formule du triangle (le fanion du 14 est la MOITIÉ d'un rectangle dessiné),
// pas de conversion d'unités d'aire. ⛔ Aucune question à rédiger.
//
// Les pièges nommés : l'aire confondue avec le tour (1, 6), « plus long = plus
// grand » (2), les demi-carreaux oubliés (3), 5 × 4 pour un carré (5), l'aire
// qui ne dépend pas de l'unité (7), compter un coin deux fois (9, 20), oublier
// d'enlever le bac (10), le reste oublié dans les boîtes (12), 24 − 8 au lieu
// de 8 × ? = 24 (13), le triangle compté comme le rectangle (14), le m pour une
// aire (16), 36 ÷ 4 pour le côté du carré (18).
//
// ⭐ LES MATHS SONT TRANSVERSALES : tapis (4), chocolaterie (8), jardinage (10),
// carrelage (12), fanion de fête (14), cour d'école (16), décoration (17),
// potager (18), énergie solaire (19), graphisme (20).
// Les métiers : chocolatier (8), paysagiste (10), carreleuse (12), poseuse de
// sols (17), maraîchère (18), installateur de panneaux solaires (19),
// graphiste (20).
//
// ⭐ Pas de fait réel : toutes les mesures et les prix sont des MODÈLES.
//
// Micro-compétences : aire_comprendre (1, 6, 7), aire_unite (2, 3, 7, 15, 16),
// aire_carre_rectangle (4, 5, 8, 11, 12, 13, 16, 18, 19), aire_composer (9, 10,
// 14, 17, 20), aire_defi (13, 17, 18, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU_CLAIR, ORANGE, ORANGE_CLAIR, ROUGE, VERT, VERT_CLAIR, bloc, figure, grille, type P2 } from "@/lib/fiches-exercices/dessins-cm1-geometrie";

const rect4 = (x: number, y: number, w: number, h: number): P2[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
];

const CHOCOLAT = "#d6a77a";

export const exercicesAireCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "aire",
  titre: "L'aire",
  accroche:
    "Vingt exercices, du geste seul au problème. Compter les carreaux à l'intérieur d'une figure. Comparer deux aires avec la même unité. Calculer l'aire d'un rectangle ou d'un carré. Découper une figure en rectangles, ou enlever un morceau. Retrouver une longueur qui manque. Un tapis, une boîte de chocolats, une pelouse, un mur carrelé, une chambre, un potager, un toit solaire et un drapeau. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je compte les carreaux rangée par rangée.",
      rappel: [
        "L'aire, c'est la place prise À L'INTÉRIEUR d'une figure.",
        "Je choisis une unité, par exemple un carreau, et je compte combien la figure en contient.",
        "Rectangle : nombre de rangées × nombre de carreaux par rangée. Avec des mesures : longueur × largeur.",
        "Le périmètre, c'est le tour. L'aire, c'est l'intérieur. Ce sont deux mesures différentes.",
      ],
      exercices: [
        {
          enonce: "Voici un rectangle colorié sur un quadrillage.\na) Combien de carreaux le rectangle contient-il ?\nb) Combien de côtés de carreau fait son tour ?",
          figure: grille({ col: 6, lig: 5, cases: bloc(1, 1, 4, 3) }),
          correction:
            "a) Je compte rangée par rangée : 3 rangées de 4 carreaux.\n4 + 4 + 4 = 12, c'est aussi 3 × 4 = 12.\nL'aire est de 12 carreaux.\nb) Le tour : 4 + 3 + 4 + 3 = 14 côtés de carreau.\n⛔ Le piège : mélanger les deux. L'aire compte les carreaux de l'INTÉRIEUR (12). Le tour compte les côtés du BORD (14).\nRéponse : a) 12 carreaux ; b) 14.",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "14" },
          ],
          micros: ["aire_comprendre"],
        },
        {
          enonce: "Voici deux figures, A et B.\na) Combien de carreaux contient A ?\nb) Combien de carreaux contient B ?\nc) Quelle figure a la plus grande aire ?",
          figure: grille({
            col: 11,
            lig: 5,
            cases: [...bloc(1, 1, 6, 1), ...bloc(7, 1, 3, 3, ORANGE_CLAIR)],
            textes: [
              { en: [4, 2.5], t: "A" },
              { en: [8.5, 4.5], t: "B" },
            ],
          }),
          correction:
            "a) A est une bande de 6 carreaux sur une seule rangée : 6 carreaux.\nb) B a 3 rangées de 3 carreaux : 3 × 3 = 9 carreaux.\nc) 9 est plus grand que 6 : B a la plus grande aire.\n⛔ Le piège : choisir A parce qu'elle est plus LONGUE. Plus long ne veut pas dire plus grand : je compte les carreaux.\nRéponse : a) 6 ; b) 9 ; c) la figure B.",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: ["B", "la figure B"] },
          ],
          micros: ["aire_unite"],
        },
        {
          enonce: "Lina dessine une barque sur un quadrillage.\nDeux demi-carreaux font un carreau entier.\nQuelle est l'aire de la barque, en carreaux ?",
          figure: grille({ col: 6, lig: 4, formes: [{ pts: [[1, 1], [5, 1], [5, 2], [4, 3], [2, 3], [1, 2]], couleur: BLEU_CLAIR }] }),
          correction:
            "Je compte d'abord les carreaux entiers.\nRangée du bas : 4 carreaux entiers. Rangée du haut : 2 carreaux entiers.\n4 + 2 = 6 carreaux entiers.\nPuis les demi-carreaux : il y en a 2, un à chaque bout. 2 demi-carreaux font 1 carreau.\n6 + 1 = 7.\nL'aire de la barque est de 7 carreaux.\n⛔ Le piège : oublier les demi-carreaux et répondre 6. Ou compter chaque moitié comme un carreau entier et répondre 8.\nRéponse : 7 carreaux.",
          reponses: [{ attendu: "7" }],
          micros: ["aire_unite"],
        },
        {
          enonce: "Un tapis rectangulaire mesure 3 m de long et 2 m de large.\nChaque carreau du dessin représente 1 m².\nQuelle est l'aire du tapis ?",
          figure: grille({
            col: 5,
            lig: 4,
            cases: bloc(1, 1, 3, 2, ORANGE_CLAIR),
            textes: [
              { en: [2.5, 0.5], t: "3 m", couleur: ORANGE },
              { en: [0.5, 2], t: "2 m", couleur: ORANGE },
            ],
          }),
          correction:
            "Le tapis a 2 rangées de 3 carreaux. Chaque carreau fait 1 m².\nLongueur × largeur : 3 × 2 = 6.\nL'aire du tapis est 6 m².\n⛔ Le piège : 3 + 2 = 5. Additionner les côtés ne compte pas les carreaux de l'intérieur.\nRéponse : 6 m².",
          reponses: [{ attendu: "6 m²" }],
          micros: ["aire_carre_rectangle"],
        },
        {
          enonce: "Un carré a des côtés de 5 cm.\nQuelle est son aire ?\nA) 20 cm²   B) 25 cm²   C) 10 cm²",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 5, 5), cotes: ["5 cm"], droits: [0, 1, 2, 3] }], hmax: 140, largeur: "max-w-[11rem] print:max-w-[8rem]" }),
          correction:
            "Un carré : côté × côté.\n5 × 5 = 25.\nL'aire est 25 cm² : la réponse B.\n⛔ Le piège : 5 × 4 = 20 (réponse A). Ce calcul donne le TOUR, 20 cm, pas l'aire.\nRéponse : B) 25 cm².",
          reponses: [{ attendu: ["B", "25 cm²"] }],
          micros: ["aire_carre_rectangle"],
        },
        {
          enonce: "Voici deux rectangles, A et B.\na) Combien de carreaux contient A ?\nb) Combien de carreaux contient B ?\nc) Vrai ou faux : A et B ont la même aire.\nd) Vrai ou faux : A et B ont le même périmètre.",
          figure: grille({
            col: 13,
            lig: 5,
            cases: [...bloc(1, 1, 6, 2), ...bloc(8, 1, 4, 3, VERT_CLAIR)],
            textes: [
              { en: [4, 3.5], t: "A" },
              { en: [10, 4.5], t: "B" },
            ],
          }),
          correction:
            "a) A : 2 rangées de 6 carreaux. 2 × 6 = 12 carreaux.\nb) B : 3 rangées de 4 carreaux. 3 × 4 = 12 carreaux.\nc) 12 et 12 : c'est vrai, même aire.\nd) Le tour de A : 6 + 2 + 6 + 2 = 16. Le tour de B : 4 + 3 + 4 + 3 = 14. C'est faux.\n⛔ Le piège : croire que même aire veut dire même tour. Deux figures de même aire peuvent avoir des tours différents.\nRéponse : a) 12 ; b) 12 ; c) vrai ; d) faux.",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: ["vrai", "oui"] },
            { question: "d)", attendu: ["faux", "non"] },
          ],
          micros: ["aire_comprendre"],
        },
        {
          enonce: "On mesure l'aire du rectangle bleu avec deux unités.\nL'unité u est un petit carreau. L'unité U est le grand carré orange.\na) Quelle est l'aire du rectangle en unités u ?\nb) Combien de petits carreaux contient le grand carré U ?\nc) Quelle est l'aire du rectangle en unités U ?",
          figure: grille({
            col: 9,
            lig: 3,
            cases: [...bloc(1, 0, 4, 2), { c: 6, l: 2, couleur: VERT_CLAIR, texte: "u" }],
            formes: [{ pts: rect4(6, 0, 2, 2), couleur: ORANGE_CLAIR, contour: ORANGE, nom: "U", ou: [7, 1] }],
          }),
          correction:
            "a) Le rectangle a 2 rangées de 4 petits carreaux : 2 × 4 = 8. Son aire est 8 u.\nb) Le grand carré U a 2 rangées de 2 petits carreaux : 4 petits carreaux.\nc) Je range les petits carreaux du rectangle par paquets de 4 : 8 ÷ 4 = 2. Le rectangle contient 2 grands carrés. Son aire est 2 U.\n⛔ Le piège : croire qu'une aire a toujours le même nombre. Le nombre dépend de l'UNITÉ choisie : plus l'unité est grande, plus le nombre est petit.\nRéponse : a) 8 ; b) 4 ; c) 2.",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "2" },
          ],
          micros: ["aire_unite", "aire_comprendre"],
        },
        {
          enonce: "Un chocolatier range des chocolats carrés dans une boîte.\nIl n'y a pas de trou entre les chocolats.\nCombien de chocolats faut-il pour remplir la boîte ?",
          figure: grille({ col: 5, lig: 6, cases: bloc(0, 0, 5, 6, CHOCOLAT), taille: 26 }),
          correction:
            "Je ne compte pas un par un : je compte les rangées.\nIl y a 6 rangées de 5 chocolats.\n6 × 5 = 30.\nIl faut 30 chocolats.\n⛔ Le piège : 6 + 5 = 11. Ce serait une seule rangée et une seule colonne.\nRéponse : 30 chocolats.",
          reponses: [{ attendu: "30" }],
          micros: ["aire_carre_rectangle"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je coupe la figure en rectangles avant de calculer.",
      rappel: [
        "Une figure compliquée : je la coupe en rectangles. Je calcule chaque aire, puis j'ajoute.",
        "Une figure avec un trou : l'aire du grand rectangle MOINS l'aire du trou.",
        "Les unités d'aire : le cm² pour une feuille, le m² pour une pièce ou un jardin.",
      ],
      exercices: [
        {
          enonce: "Cette figure en L est coupée en deux rectangles par les pointillés.\na) Quelle est l'aire du rectangle du bas ?\nb) Quelle est l'aire du rectangle du haut ?\nc) Quelle est l'aire de toute la figure ?",
          figure: grille({
            col: 7,
            lig: 6,
            formes: [
              { pts: [[1, 1], [6, 1], [6, 3], [3, 3], [3, 5], [1, 5]], couleur: BLEU_CLAIR },
              { pts: [[1, 3], [3, 3]], ouverte: true, pointilles: true, contour: ROUGE },
            ],
          }),
          correction:
            "a) En bas : 2 rangées de 5 carreaux. 2 × 5 = 10 carreaux.\nb) En haut : 2 rangées de 2 carreaux. 2 × 2 = 4 carreaux.\nc) J'ajoute les deux morceaux : 10 + 4 = 14 carreaux.\n⛔ Le piège : prendre un grand rectangle de 5 sur 4 et répondre 20. Le coin en haut à droite est vide : il ne compte pas.\nRéponse : a) 10 ; b) 4 ; c) 14 carreaux.",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "14" },
          ],
          micros: ["aire_composer"],
        },
        {
          enonce: "Une paysagiste sème du gazon sur une pelouse de 8 m sur 5 m.\nAu milieu, il y a un bac à sable carré de 2 m de côté.\na) Quelle est l'aire de toute la pelouse, bac compris ?\nb) Quelle est l'aire du bac à sable ?\nc) Quelle aire doit-elle semer ?",
          figure: figure({
            polys: [
              { sommets: rect4(0, 0, 8, 5), cotes: ["8 m", "5 m"], droits: [0, 1, 2, 3], fond: VERT_CLAIR },
              { sommets: rect4(4.5, 1.5, 2, 2), cotes: ["2 m"], fond: "#fde68a" },
            ],
            hmax: 170,
          }),
          correction:
            "a) Toute la pelouse : 8 × 5 = 40 m².\nb) Le bac à sable : 2 × 2 = 4 m².\nc) On ne sème pas dans le bac. J'enlève son aire : 40 − 4 = 36.\nElle doit semer 36 m².\n⛔ Le piège : s'arrêter à 40 m². Le sable n'a pas besoin de gazon.\nRéponse : a) 40 m² ; b) 4 m² ; c) 36 m².",
          reponses: [
            { question: "a)", attendu: "40 m²" },
            { question: "b)", attendu: "4 m²" },
            { question: "c)", attendu: "36 m²" },
          ],
          micros: ["aire_composer"],
        },
        {
          enonce: "Voici trois rectangles A, B et C.\na) Quelle est l'aire de A ?\nb) Quelle est l'aire de B ?\nc) Quelle est l'aire de C ?\nd) Quel rectangle a la plus grande aire ?",
          figure: figure({
            polys: [
              { sommets: rect4(0, 0, 6, 2), cotes: ["6 cm", "2 cm"], droits: [0, 1, 2, 3] },
              { sommets: rect4(9.5, 0, 4, 3), cotes: ["4 cm", "3 cm"], droits: [0, 1, 2, 3], fond: ORANGE_CLAIR },
              { sommets: rect4(17, 0, 5, 3), cotes: ["5 cm", "3 cm"], droits: [0, 1, 2, 3], fond: VERT_CLAIR },
            ],
            textes: [
              { en: [3, 3.4], t: "A" },
              { en: [11.5, 4.4], t: "B" },
              { en: [19.5, 4.4], t: "C" },
            ],
            largeur: "max-w-[24rem] print:max-w-[18rem]",
          }),
          correction:
            "Rectangle : longueur × largeur.\na) A : 6 × 2 = 12 cm².\nb) B : 4 × 3 = 12 cm².\nc) C : 5 × 3 = 15 cm².\nd) 15 est le plus grand : c'est C.\n⛔ Le piège : choisir A parce qu'il est le plus long. A et B ont la même aire, et C les dépasse.\nRéponse : a) 12 cm² ; b) 12 cm² ; c) 15 cm² ; d) le rectangle C.",
          reponses: [
            { question: "a)", attendu: "12 cm²" },
            { question: "b)", attendu: "12 cm²" },
            { question: "c)", attendu: "15 cm²" },
            { question: "d)", attendu: ["C", "le rectangle C"] },
          ],
          micros: ["aire_carre_rectangle"],
        },
        {
          enonce: "Une carreleuse couvre un mur de 9 dm de long et 6 dm de haut.\nSes carreaux sont des carrés de 1 dm de côté.\na) Combien de carreaux lui faut-il ?\nb) Les carreaux sont vendus par boîtes de 10. Combien de boîtes doit-elle acheter ?",
          figure: grille({ col: 9, lig: 6, cases: bloc(0, 0, 9, 6, "#e0f2fe"), taille: 24 }),
          correction:
            "a) Le mur a 6 rangées de 9 carreaux.\n6 × 9 = 54 carreaux.\nb) 5 boîtes font 5 × 10 = 50 carreaux. Ce n'est pas assez : il en manque 4.\n6 boîtes font 6 × 10 = 60 carreaux. C'est assez.\nElle doit acheter 6 boîtes. Il lui restera 60 − 54 = 6 carreaux.\n⛔ Le piège : acheter 5 boîtes. Il manquerait 4 carreaux sur le mur.\nRéponse : a) 54 carreaux ; b) 6 boîtes.",
          reponses: [
            { question: "a)", attendu: "54" },
            { question: "b)", attendu: ["6", "six"] },
          ],
          micros: ["aire_carre_rectangle"],
        },
        {
          enonce: "Un rectangle a une aire de 24 cm².\nSa longueur mesure 8 cm.\nCombien mesure sa largeur ?",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 8, 3), cotes: ["8 cm", "?"], droits: [0, 1, 2, 3] }], textes: [{ en: [4, 1.5], t: "24 cm²" }], hmax: 130 }),
          correction:
            "Aire = longueur × largeur. Je cherche le nombre qui manque : 8 × ? = 24.\nJe récite la table de 8 : 8 × 1 = 8, 8 × 2 = 16, 8 × 3 = 24.\nLa largeur mesure 3 cm.\n⭐ Je vérifie : 8 × 3 = 24.\n⛔ Le piège : 24 − 8 = 16 cm. Une aire ne se calcule pas avec une soustraction : je cherche 8 × ? = 24.\nRéponse : 3 cm.",
          reponses: [{ attendu: "3 cm" }],
          micros: ["aire_defi", "aire_carre_rectangle"],
        },
        {
          enonce: "Pour la fête, Kenji découpe un fanion triangulaire.\nLe triangle est la moitié du rectangle en pointillés.\na) Combien de carreaux contient le rectangle en pointillés ?\nb) Quelle est l'aire du fanion, en carreaux ?",
          figure: grille({
            col: 6,
            lig: 5,
            formes: [
              { pts: [[1, 1], [5, 1], [1, 4]], couleur: ORANGE_CLAIR, contour: ORANGE },
              { pts: rect4(1, 1, 4, 3), pointilles: true },
            ],
          }),
          correction:
            "a) Le rectangle a 3 rangées de 4 carreaux : 3 × 4 = 12 carreaux.\nb) Le trait penché coupe le rectangle en deux triangles pareils. Le fanion en est un : c'est la moitié.\nLa moitié de 12 : 12 ÷ 2 = 6 carreaux.\n⛔ Le piège : compter les carreaux touchés par le fanion, même coupés. On trouverait trop. Je prends la moitié du rectangle.\nRéponse : a) 12 ; b) 6 carreaux.",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "6" },
          ],
          micros: ["aire_composer", "aire_unite"],
        },
        {
          enonce: "Quelle figure a une aire de 12 carreaux : A, B ou C ?",
          figure: grille({
            col: 13,
            lig: 6,
            cases: [...bloc(1, 0, 2, 5), ...bloc(4, 0, 3, 3, ORANGE_CLAIR), ...bloc(8, 0, 4, 2, VERT_CLAIR), ...bloc(8, 2, 2, 2, VERT_CLAIR)],
            textes: [
              { en: [2, 5.5], t: "A" },
              { en: [5.5, 3.5], t: "B" },
              { en: [9, 4.5], t: "C" },
            ],
          }),
          correction:
            "Je compte les carreaux de chaque figure.\nA : 5 rangées de 2 carreaux. 5 × 2 = 10 carreaux.\nB : 3 rangées de 3 carreaux. 3 × 3 = 9 carreaux.\nC : en bas, 2 rangées de 4 carreaux : 8. En haut, 2 rangées de 2 carreaux : 4. 8 + 4 = 12 carreaux.\nC'est la figure C.\n⛔ Le piège : choisir A parce qu'elle est la plus haute. Je compte, je ne devine pas à l'œil.\nRéponse : la figure C.",
          reponses: [{ attendu: ["C", "la figure C"] }],
          micros: ["aire_unite", "aire_composer"],
        },
        {
          enonce: "La cour d'une école est un rectangle de 30 m sur 20 m.\na) Quelle unité choisir pour son aire ?\nA) le m²   B) le cm²   C) le m\nb) Quelle est l'aire de la cour ?",
          correction:
            "a) Une cour est grande : on prend le m², un carré de 1 m de côté. La réponse A.\nLe cm² est trop petit. Le m mesure une longueur, pas une aire.\nb) 30 × 20 : je calcule 3 × 2 = 6, puis j'ajoute les deux zéros. 30 × 20 = 600.\nL'aire de la cour est 600 m².\n⛔ Le piège : écrire 600 m. Le m est l'unité d'une longueur. Une aire s'écrit en m².\nRéponse : a) A, le m² ; b) 600 m².",
          schema: figure({ polys: [{ sommets: rect4(0, 0, 30, 20), cotes: ["30 m", "20 m"], droits: [0, 1, 2, 3], fond: "#e2e8f0" }], hmax: 150 }),
          reponses: [
            { question: "a)", attendu: ["A", "m²", "le m²"] },
            { question: "b)", attendu: "600 m²" },
          ],
          micros: ["aire_unite", "aire_carre_rectangle"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis deux fois. Je repère les rectangles cachés dans la figure.",
      rappel: [
        "Je découpe la figure, je calcule chaque morceau, j'ajoute.",
        "Un prix au m² : aire × prix d'un m².",
        "Aire connue, longueur cherchée : je cherche le nombre qui manque dans la multiplication.",
      ],
      exercices: [
        {
          titre: "La moquette de la chambre",
          enonce: "Une poseuse de sols couvre une chambre en forme de L.\nLa moquette coûte 9 € le m².\na) Quelle aire a le grand rectangle de 5 m sur 3 m, en bas ?\nb) Quelle est l'aire de toute la chambre ?\nc) Combien coûte la moquette ?",
          figure: figure({
            polys: [{ sommets: [[0, 0], [5, 0], [5, 3], [3, 3], [3, 5], [0, 5]], cotes: ["5 m", "3 m", "2 m", null, "3 m", "5 m"], droits: [0, 1, 2, 4, 5], fond: "#ede9fe" }],
            segments: [{ de: [0, 3], vers: [3, 3], pointilles: true }],
            hmax: 200,
          }),
          correction:
            "Je coupe la chambre en deux rectangles avec les pointillés.\na) En bas : 5 × 3 = 15 m².\nb) En haut : le rectangle fait 3 m de long. Sa hauteur : 5 − 3 = 2 m. 3 × 2 = 6 m².\nToute la chambre : 15 + 6 = 21 m².\nc) 21 m² à 9 € : 21 × 9. 20 × 9 = 180 et 1 × 9 = 9. 180 + 9 = 189.\nLa moquette coûte 189 €.\n⛔ Le piège : calculer 5 × 5 = 25 m². Le coin en haut à droite ne fait pas partie de la chambre.\nRéponse : a) 15 m² ; b) 21 m² ; c) 189 €.",
          reponses: [
            { question: "a)", attendu: "15 m²" },
            { question: "b)", attendu: "21 m²" },
            { question: "c)", attendu: "189 €" },
          ],
          micros: ["aire_composer", "aire_defi"],
        },
        {
          titre: "Le potager carré",
          enonce: "Une maraîchère a un potager CARRÉ de 36 m².\na) Combien mesure un côté du potager ?\nb) Elle pose une clôture tout autour. Quelle longueur de clôture lui faut-il ?",
          correction:
            "a) Un carré : côté × côté = 36. Je cherche un nombre qui, multiplié par lui-même, donne 36.\n5 × 5 = 25 : trop petit. 6 × 6 = 36 : c'est lui.\nUn côté mesure 6 m.\nb) La clôture fait le tour : 4 côtés de 6 m. 4 × 6 = 24.\nIl lui faut 24 m de clôture.\n⛔ Le piège : 36 ÷ 4 = 9 m pour le côté. On divise par 4 un PÉRIMÈTRE, pas une aire. Je vérifie : 9 × 9 = 81, ce n'est pas 36.\nRéponse : a) 6 m ; b) 24 m.",
          schema: figure({ polys: [{ sommets: rect4(0, 0, 6, 6), cotes: ["6 m"], droits: [0, 1, 2, 3], fond: VERT_CLAIR }], textes: [{ en: [3, 3], t: "36 m²", couleur: VERT }], hmax: 140, largeur: "max-w-[11rem] print:max-w-[8rem]" }),
          reponses: [
            { question: "a)", attendu: "6 m" },
            { question: "b)", attendu: "24 m" },
          ],
          micros: ["aire_defi", "aire_carre_rectangle"],
        },
        {
          titre: "Le toit solaire",
          enonce: "Un installateur pose des panneaux solaires sur un toit rectangulaire de 8 m sur 5 m.\nChaque panneau couvre 2 m².\na) Quelle est l'aire du toit ?\nb) Combien de panneaux faut-il pour couvrir tout le toit ?",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 8, 5), cotes: ["8 m", "5 m"], droits: [0, 1, 2, 3], fond: "#c7d2fe" }], hmax: 150 }),
          correction:
            "a) 8 × 5 = 40. L'aire du toit est 40 m².\nb) Un panneau couvre 2 m². Je cherche combien de fois 2 dans 40 : 40 ÷ 2 = 20.\nIl faut 20 panneaux.\n⭐ Je vérifie : 20 × 2 = 40.\n⛔ Le piège : répondre 40 panneaux. Chaque panneau couvre 2 m², pas 1 m².\nRéponse : a) 40 m² ; b) 20 panneaux.",
          reponses: [
            { question: "a)", attendu: "40 m²" },
            { question: "b)", attendu: "20" },
          ],
          micros: ["aire_carre_rectangle", "aire_defi"],
        },
        {
          titre: "Le drapeau de la graphiste",
          enonce: "Une graphiste dessine un drapeau sur un quadrillage pour la fête de l'école.\nUne croix rouge le traverse.\na) Combien de carreaux a tout le drapeau ?\nb) Combien de carreaux rouges a la croix ?\nc) Combien de carreaux restent blancs ?",
          figure: grille({ col: 6, lig: 4, cases: [...bloc(0, 1, 6, 1, "#f87171"), { c: 2, l: 0, couleur: "#f87171" }, { c: 2, l: 2, couleur: "#f87171" }, { c: 2, l: 3, couleur: "#f87171" }], formes: [{ pts: rect4(0, 0, 6, 4) }] }),
          correction:
            "a) Le drapeau : 4 rangées de 6 carreaux. 4 × 6 = 24 carreaux.\nb) La bande couchée a 6 carreaux. La bande debout a 4 carreaux.\nMais le carreau du milieu de la croix est dans les deux bandes : je ne le compte qu'une fois.\n6 + 4 − 1 = 9 carreaux rouges.\nc) 24 − 9 = 15 carreaux blancs.\n⛔ Le piège : 6 + 4 = 10. Le carreau où les deux bandes se croisent serait compté deux fois.\nRéponse : a) 24 ; b) 9 ; c) 15.",
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "15" },
          ],
          micros: ["aire_composer", "aire_defi"],
        },
      ],
    },
  ],
};
