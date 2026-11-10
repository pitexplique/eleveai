// ─── Fiche d'exercices : le périmètre (CM1) — 20 exercices corrigés ───────────
//
// 10/11/2026 : la feuille de la notion `perimetre` du coach CM1 (5 micros). Sur
// la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant
// chaque niveau, corrigés à la première personne, étape par étape, avec le
// piège nommé. Chaque exercice a ses réponses vérifiées sans IA (`reponses`).
//
// Alignée sur la carte mentale remplie `cm1/perimetre` : le tour d'une figure,
// le triangle (3 côtés), le quadrilatère (4 côtés), le polygone à côtés égaux
// (côté × nombre de côtés), le défi (le côté qui manque, le carré de périmètre
// connu).
// ⛔ LIMITES DU CM1 : entiers seulement, pas de formule littérale, pas de
// cercle. ⛔ Aucune question à rédiger : un nombre, un QCM, vrai ou faux.
//
// Les pièges nommés : compter les carreaux au lieu des côtés (1, 9), oublier un
// côté (2, 3, 7), 7 × 7 pour un carré (4), confondre côtés et sommets (5, 14),
// même aire = même tour (6), multiplier la longueur par la largeur (15),
// compter le côté commun de la maison (16), oublier la porte (10, 19), diviser
// par 2 au lieu de 4 (18), une table = 4 places, donc 5 tables = 20 (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : voile (2), bricolage (3), sous-verre (4), jeu
// de société (5), jardin d'école (7), panneau routier (8), élevage (10),
// couture (12), musique (14), dessin (16), course à pied (17), encadrement
// (18), menuiserie (19), fête et traiteur (20).
// Les métiers : éleveur (10), couturière (12), entraîneuse (17), encadreur
// (18), menuisier (19), traiteur (20).
//
// ⭐ Pas de fait réel : toutes les mesures sont des MODÈLES.
//
// Micro-compétences : perimetre_comprendre (1, 6, 9, 16), perimetre_triangle
// (2, 8, 11, 13), perimetre_quadrilatere (3, 4, 7, 10, 11, 12, 15, 17, 19),
// perimetre_polygone (5, 14, 16), perimetre_defi (13, 17, 18, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU_CLAIR, ORANGE, ORANGE_CLAIR, VERT_CLAIR, figure, grille, type P2 } from "@/lib/fiches-exercices/dessins-cm1-geometrie";

/** Un polygone régulier de `n` côtés, de rayon `r`, posé sur un côté horizontal. */
const regulier = (n: number, r: number): P2[] =>
  Array.from({ length: n }, (_, k) => {
    const a = -Math.PI / 2 - Math.PI / n + (2 * Math.PI * k) / n;
    return [r * Math.cos(a), r * Math.sin(a)] as P2;
  });

const rect4 = (x: number, y: number, w: number, h: number): P2[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
];

export const exercicesPerimetreCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "perimetre",
  titre: "Le périmètre",
  accroche:
    "Vingt exercices, du geste seul au problème. Faire le tour d'une figure sur un quadrillage. Additionner les côtés d'un triangle, d'un rectangle, d'un carré. Calculer vite quand tous les côtés sont égaux. Retrouver un côté qui manque. Une voile, un jardin, un enclos, une nappe, un kiosque à musique, un parc, un cadre et les tables d'une fête. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je suis le bord de la figure avec le doigt.",
      rappel: [
        "Le périmètre, c'est la longueur du TOUR d'une figure.",
        "Pour le trouver, j'additionne les longueurs de TOUS les côtés.",
        "Un carré a 4 côtés égaux : côté × 4. Un rectangle : longueur + largeur + longueur + largeur.",
      ],
      exercices: [
        {
          enonce: "Voici un rectangle tracé sur un quadrillage.\na) Combien de côtés de carreau fait le tour du rectangle ?\nb) Combien de carreaux y a-t-il à l'intérieur ?",
          figure: grille({ col: 7, lig: 4, formes: [{ pts: rect4(1, 1, 5, 2), couleur: BLEU_CLAIR }] }),
          correction:
            "a) Je fais le tour avec le doigt et je compte les côtés de carreau.\nEn bas : 5. À droite : 2. En haut : 5. À gauche : 2.\n5 + 2 + 5 + 2 = 14 côtés de carreau.\nb) À l'intérieur : 2 rangées de 5 carreaux. 2 × 5 = 10 carreaux.\n⛔ Le piège : répondre 10 au a). 10, ce sont les carreaux de l'intérieur. Le périmètre, c'est le TOUR.\nRéponse : a) 14 côtés de carreau ; b) 10 carreaux.",
          reponses: [
            { question: "a)", attendu: "14" },
            { question: "b)", attendu: "10" },
          ],
          micros: ["perimetre_comprendre"],
        },
        {
          enonce: "La voile d'un petit bateau a la forme d'un triangle.\nQuel est le périmètre de la voile ?",
          figure: figure({ polys: [{ sommets: [[0, 0], [6, 0], [3.75, 3.307]], cotes: ["6 cm", "4 cm", "5 cm"] }] }),
          correction:
            "Un triangle a 3 côtés. J'additionne les 3 longueurs.\n6 + 4 + 5 = 15.\nLe périmètre de la voile est 15 cm.\n⛔ Le piège : oublier un côté. 6 + 4 = 10 cm, il manque les 5 cm.\nRéponse : 15 cm.",
          reponses: [{ attendu: "15 cm" }],
          micros: ["perimetre_triangle"],
        },
        {
          enonce: "Inès colle un ruban tout autour d'une carte postale rectangulaire.\nQuelle longueur de ruban lui faut-il ?",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 15, 10), cotes: ["15 cm", "10 cm"], droits: [0, 1, 2, 3] }], hmax: 170 }),
          correction:
            "Un rectangle a 4 côtés : 2 longueurs et 2 largeurs.\nLes côtés d'en face sont égaux : 15 cm en haut aussi, 10 cm à gauche aussi.\n15 + 10 + 15 + 10 = 50.\nIl lui faut 50 cm de ruban.\n⛔ Le piège : 15 + 10 = 25 cm. Ce n'est que la moitié du tour.\nRéponse : 50 cm.",
          reponses: [{ attendu: "50 cm" }],
          micros: ["perimetre_quadrilatere"],
        },
        {
          enonce: "Un sous-verre carré a des côtés de 7 cm.\nQuel est son périmètre ?\nA) 14 cm   B) 49 cm   C) 28 cm",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 7, 7), cotes: ["7 cm"], droits: [0, 1, 2, 3] }], hmax: 150, largeur: "max-w-[12rem] print:max-w-[9rem]" }),
          correction:
            "Un carré a 4 côtés égaux.\n7 + 7 + 7 + 7 = 28. C'est aussi 7 × 4 = 28.\nLe périmètre est 28 cm : la réponse C.\n⛔ Le piège : 7 × 7 = 49 (réponse B). Ce calcul ne fait pas le tour. Et 14 cm (réponse A), ce n'est que 2 côtés.\nRéponse : C) 28 cm.",
          reponses: [{ attendu: ["C", "28 cm"] }],
          micros: ["perimetre_quadrilatere"],
        },
        {
          enonce: "Une case d'un jeu de société a la forme d'un hexagone.\nSes côtés sont tous égaux.\na) Combien de côtés a un hexagone ?\nb) Quel est le périmètre de la case ?",
          figure: figure({ polys: [{ sommets: regulier(6, 3), cotes: ["3 cm"] }], hmax: 160, largeur: "max-w-[13rem] print:max-w-[10rem]" }),
          correction:
            "a) Je compte les côtés sur le dessin : un hexagone a 6 côtés.\nb) Les 6 côtés mesurent 3 cm.\nAu lieu de 3 + 3 + 3 + 3 + 3 + 3, je calcule 6 × 3 = 18.\nLe périmètre est 18 cm.\n⛔ Le piège : compter 5 côtés. Je fais une petite croix sur chaque côté compté.\nRéponse : a) 6 côtés ; b) 18 cm.",
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: "18 cm" },
          ],
          micros: ["perimetre_polygone"],
        },
        {
          enonce: "Voici deux figures, A et B, sur un quadrillage.\na) Combien de côtés de carreau fait le tour de A ?\nb) Combien de côtés de carreau fait le tour de B ?\nc) Vrai ou faux : A et B ont le même périmètre.\nd) Vrai ou faux : A et B ont le même nombre de carreaux.",
          figure: grille({
            col: 8,
            lig: 4,
            formes: [
              { pts: rect4(1, 1, 3, 1), couleur: BLEU_CLAIR, nom: "A", ou: [2.5, 2.6] },
              { pts: rect4(5, 1, 2, 2), couleur: ORANGE_CLAIR, nom: "B", ou: [6, 3.5] },
            ],
          }),
          correction:
            "a) A : en bas 3, à droite 1, en haut 3, à gauche 1. 3 + 1 + 3 + 1 = 8.\nb) B : 2 + 2 + 2 + 2 = 8.\nc) Les deux tours font 8 : c'est vrai.\nd) A a 3 carreaux. B a 2 × 2 = 4 carreaux. C'est faux.\n⛔ Le piège : croire que même tour veut dire même place à l'intérieur. Le tour et l'intérieur sont deux mesures différentes.\nRéponse : a) 8 ; b) 8 ; c) vrai ; d) faux.",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: ["vrai", "oui"] },
            { question: "d)", attendu: ["faux", "non"] },
          ],
          micros: ["perimetre_comprendre"],
        },
        {
          enonce: "Le jardin de l'école a quatre côtés de longueurs différentes.\nLes élèves veulent le border de petites pierres.\nQuelle longueur doivent-ils border ?",
          figure: figure({ polys: [{ sommets: [[0, 0], [12, 0], [11.27, 8.97], [1.5, 6.84]], cotes: ["12 m", "9 m", "10 m", "7 m"] }] }),
          correction:
            "Le jardin a 4 côtés. J'additionne les 4 longueurs, en faisant le tour.\n12 + 9 = 21.\n21 + 10 = 31.\n31 + 7 = 38.\nIls doivent border 38 m.\n⭐ Je peux aussi grouper : 12 + 7 = 19 et 9 + 10 = 19. 19 + 19 = 38.\n⛔ Le piège : oublier un côté. Je coche chaque longueur quand je l'ai ajoutée.\nRéponse : 38 m.",
          reponses: [{ attendu: "38 m" }],
          micros: ["perimetre_quadrilatere"],
        },
        {
          enonce: "Un panneau routier a la forme d'un triangle.\nSes 3 côtés mesurent chacun 80 cm.\nQuel est le périmètre du panneau ?",
          figure: figure({ polys: [{ sommets: [[0, 0], [8, 0], [4, 6.93]], cotes: ["80 cm", "80 cm", "80 cm"], fond: "#fecaca" }], hmax: 170, largeur: "max-w-[14rem] print:max-w-[10rem]" }),
          correction:
            "Les 3 côtés sont égaux. Je multiplie : 80 × 3.\n8 × 3 = 24, donc 80 × 3 = 240.\nLe périmètre est 240 cm.\n⭐ Je vérifie : 80 + 80 = 160, puis 160 + 80 = 240.\n⛔ Le piège : répondre 80 cm. C'est un seul côté, pas le tour.\nRéponse : 240 cm.",
          reponses: [{ attendu: "240 cm" }],
          micros: ["perimetre_triangle"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je repasse le tour en couleur avant de calculer.",
      rappel: [
        "Je fais le tour en partant d'un sommet. Je reviens au même sommet.",
        "Côtés égaux : longueur d'un côté × nombre de côtés.",
        "Un côté à l'intérieur de la figure ne fait PAS partie du tour.",
      ],
      exercices: [
        {
          enonce: "Cette figure en forme de L est tracée sur un quadrillage.\na) Combien de côtés de carreau fait son tour ?\nb) Combien de carreaux y a-t-il à l'intérieur ?",
          figure: grille({ col: 7, lig: 5, formes: [{ pts: [[1, 1], [5, 1], [5, 2], [3, 2], [3, 4], [1, 4]], couleur: BLEU_CLAIR }] }),
          correction:
            "a) Je pars du coin en bas à gauche et je tourne.\nEn bas : 4. Je monte : 1. Je vais à gauche : 2. Je monte : 2. Je vais à gauche : 2. Je descends : 3.\n4 + 1 + 2 + 2 + 2 + 3 = 14 côtés de carreau.\nb) En bas, une rangée de 4 carreaux. Au-dessus, 2 rangées de 2 carreaux.\n4 + 2 + 2 = 8 carreaux.\n⛔ Le piège : compter les carreaux du bord au lieu des côtés. Je compte les petits TRAITS du tour.\nRéponse : a) 14 ; b) 8 carreaux.",
          reponses: [
            { question: "a)", attendu: "14" },
            { question: "b)", attendu: "8" },
          ],
          micros: ["perimetre_comprendre"],
        },
        {
          enonce: "Un éleveur clôture un enclos rectangulaire de 25 m sur 12 m.\nIl laisse une porte de 2 m sans grillage.\na) Quel est le périmètre de l'enclos ?\nb) Combien de mètres de grillage lui faut-il ?",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 25, 12), cotes: ["25 m", "12 m"], droits: [0, 1, 2, 3], fond: VERT_CLAIR }], segments: [{ de: [11.5, 12], vers: [13.5, 12], couleur: ORANGE, epaisseur: 7 }], textes: [{ en: [12.5, 14], t: "porte", couleur: ORANGE }], hmax: 170 }),
          correction:
            "a) Rectangle : 25 + 12 + 25 + 12.\n25 + 25 = 50 et 12 + 12 = 24. 50 + 24 = 74.\nLe périmètre est 74 m.\nb) La porte n'a pas de grillage. J'enlève ses 2 m.\n74 − 2 = 72.\nIl lui faut 72 m de grillage.\n⛔ Le piège : oublier la porte et acheter 74 m. Je relis la question : on veut le GRILLAGE.\nRéponse : a) 74 m ; b) 72 m.",
          reponses: [
            { question: "a)", attendu: "74 m" },
            { question: "b)", attendu: "72 m" },
          ],
          micros: ["perimetre_quadrilatere"],
        },
        {
          enonce: "Voici trois figures A, B et C.\na) Quel est le périmètre de A ?\nb) Quel est le périmètre de B ?\nc) Quel est le périmètre de C ?\nd) Quelle figure a le plus grand périmètre ?",
          figure: figure({
            polys: [
              { sommets: [[0, 0], [6, 0], [3, 4]], cotes: ["6 cm", "5 cm", "5 cm"] },
              { sommets: rect4(8.5, 0, 4, 4), cotes: ["4 cm"], droits: [0, 1, 2, 3], fond: ORANGE_CLAIR },
              { sommets: rect4(15, 0, 6, 3), cotes: ["6 cm", "3 cm"], droits: [0, 1, 2, 3], fond: VERT_CLAIR },
            ],
            textes: [
              { en: [3, 5.6], t: "A" },
              { en: [10.5, 5.6], t: "B" },
              { en: [18, 5.6], t: "C" },
            ],
            largeur: "max-w-[24rem] print:max-w-[18rem]",
          }),
          correction:
            "a) A est un triangle : 6 + 5 + 5 = 16. Le périmètre de A est 16 cm.\nb) B est un carré de 4 cm : 4 × 4 = 16. Le périmètre de B est 16 cm.\nc) C est un rectangle : 6 + 3 + 6 + 3 = 18. Le périmètre de C est 18 cm.\nd) 18 est plus grand que 16 : c'est C.\n⛔ Le piège : choisir B « parce qu'il a l'air plus gros ». Je calcule chaque tour avant de comparer.\nRéponse : a) 16 cm ; b) 16 cm ; c) 18 cm ; d) la figure C.",
          reponses: [
            { question: "a)", attendu: "16 cm" },
            { question: "b)", attendu: "16 cm" },
            { question: "c)", attendu: "18 cm" },
            { question: "d)", attendu: ["C", "la figure C"] },
          ],
          micros: ["perimetre_triangle", "perimetre_quadrilatere"],
        },
        {
          enonce: "Une couturière coud une dentelle autour d'une nappe carrée.\nLe côté de la nappe mesure 120 cm.\na) Quelle longueur de dentelle lui faut-il ?\nb) Elle a un rouleau de 500 cm de dentelle. Combien de centimètres lui restera-t-il ?",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 12, 12), cotes: ["120 cm"], droits: [0, 1, 2, 3], fond: "#fde68a" }], hmax: 150, largeur: "max-w-[12rem] print:max-w-[9rem]" }),
          correction:
            "a) Un carré a 4 côtés égaux : 120 × 4.\n12 × 4 = 48, donc 120 × 4 = 480.\nIl lui faut 480 cm de dentelle.\nb) Elle a 500 cm. J'enlève ce qu'elle coud.\n500 − 480 = 20.\nIl lui restera 20 cm.\n⛔ Le piège : calculer 120 × 2 = 240. Une nappe carrée a 4 bords, pas 2.\nRéponse : a) 480 cm ; b) 20 cm.",
          reponses: [
            { question: "a)", attendu: "480 cm" },
            { question: "b)", attendu: "20 cm" },
          ],
          micros: ["perimetre_quadrilatere"],
        },
        {
          enonce: "Le périmètre de ce triangle est 20 cm.\nDeux côtés mesurent 9 cm et 6 cm.\nCombien mesure le troisième côté ?",
          figure: figure({ polys: [{ sommets: [[0, 0], [9, 0], [5.111, 3.143]], cotes: ["9 cm", "?", "6 cm"] }], hmax: 160 }),
          correction:
            "Le tour fait 20 cm en tout. Je connais deux côtés.\nJ'additionne ce que je connais : 9 + 6 = 15.\nJe cherche ce qui manque pour aller jusqu'à 20 : 20 − 15 = 5.\nLe troisième côté mesure 5 cm.\n⭐ Je vérifie : 9 + 6 + 5 = 20.\n⛔ Le piège : additionner tout, 20 + 9 + 6. Le 20, c'est déjà le tour entier.\nRéponse : 5 cm.",
          reponses: [{ attendu: "5 cm" }],
          micros: ["perimetre_triangle", "perimetre_defi"],
        },
        {
          enonce: "Un kiosque à musique a la forme d'un octogone.\nSes 8 côtés mesurent chacun 3 m.\na) Combien de sommets a un octogone ?\nb) Quelle longueur de guirlande faut-il pour faire le tour du kiosque ?",
          figure: figure({ polys: [{ sommets: regulier(8, 3.92), cotes: ["3 m"], fond: "#e9d5ff" }], hmax: 170, largeur: "max-w-[13rem] print:max-w-[10rem]" }),
          correction:
            "a) Un polygone a autant de sommets que de côtés. 8 côtés, donc 8 sommets.\nb) Les 8 côtés mesurent 3 m : 8 × 3 = 24.\nIl faut 24 m de guirlande.\n⛔ Le piège : confondre octogone (8 côtés) et hexagone (6 côtés). Je compte sur le dessin.\nRéponse : a) 8 sommets ; b) 24 m.",
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: "24 m" },
          ],
          micros: ["perimetre_polygone"],
        },
        {
          enonce: "Un rectangle mesure 9 cm de long et 4 cm de large.\na) Quel calcul donne son périmètre ?\nA) 9 + 4 + 9 + 4   B) 9 × 4   C) 9 + 4\nb) Quel est son périmètre ?",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 9, 4), cotes: ["9 cm", "4 cm"], droits: [0, 1, 2, 3] }], hmax: 130 }),
          correction:
            "a) Le tour passe par les 4 côtés : deux de 9 cm et deux de 4 cm.\nLe calcul est 9 + 4 + 9 + 4 : la réponse A.\nb) 9 + 4 = 13. Deux fois 13 : 13 + 13 = 26.\nLe périmètre est 26 cm.\n⛔ Le piège : 9 × 4 = 36 (réponse B). Multiplier la longueur par la largeur ne fait pas le tour. Et 9 + 4 (réponse C), c'est seulement la moitié du tour.\nRéponse : a) A ; b) 26 cm.",
          reponses: [
            { question: "a)", attendu: ["A", "9 + 4 + 9 + 4"] },
            { question: "b)", attendu: "26 cm" },
          ],
          micros: ["perimetre_quadrilatere"],
        },
        {
          enonce: "Malo dessine une maison : un carré surmonté d'un triangle.\nTous les côtés mesurent 5 cm.\nIl colle un ruban lumineux sur le TOUR de la maison, pas sur le trait en pointillés.\nQuelle longueur de ruban lui faut-il ?",
          figure: figure({
            polys: [{ sommets: [[0, 0], [5, 0], [5, 5], [2.5, 9.33], [0, 5]], cotes: ["5 cm", "5 cm", "5 cm", "5 cm", "5 cm"], droits: [0, 1], fond: "#fef3c7" }],
            segments: [{ de: [0, 5], vers: [5, 5], pointilles: true }],
            hmax: 190,
            largeur: "max-w-[13rem] print:max-w-[10rem]",
          }),
          correction:
            "Je compte les côtés du TOUR : 3 côtés du carré (en bas, à droite, à gauche) et 2 côtés du toit.\nCela fait 5 côtés de 5 cm.\n5 × 5 = 25.\nIl lui faut 25 cm de ruban.\n⛔ Le piège : compter le trait en pointillés. Il est à l'intérieur de la maison : ce n'est pas le tour. Avec lui, on trouverait 30 cm.\nRéponse : 25 cm.",
          reponses: [{ attendu: "25 cm" }],
          micros: ["perimetre_comprendre", "perimetre_polygone"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis deux fois. Je fais un petit dessin et j'y écris les longueurs.",
      rappel: [
        "Plusieurs tours : le périmètre × le nombre de tours.",
        "Carré de périmètre connu : côté = périmètre ÷ 4.",
        "Je vérifie toujours : je refais le tour avec mon résultat.",
      ],
      exercices: [
        {
          titre: "Le tour du parc",
          enonce: "Une entraîneuse fait courir son équipe autour d'un parc rectangulaire de 300 m sur 200 m.\na) Quel est le périmètre du parc ?\nb) L'équipe fait 3 tours. Combien de mètres court-elle ?\nc) Combien de tours faut-il pour courir 5 000 m ?",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 300, 200), cotes: ["300 m", "200 m"], droits: [0, 1, 2, 3], fond: VERT_CLAIR }], hmax: 160 }),
          correction:
            "a) 300 + 200 + 300 + 200.\n300 + 300 = 600 et 200 + 200 = 400. 600 + 400 = $1\\,000$.\nLe périmètre est $1\\,000$ m.\nb) Un tour fait $1\\,000$ m. 3 tours : $3 \\times 1\\,000 = 3\\,000$ m.\nc) Chaque tour fait $1\\,000$ m. Pour $5\\,000$ m, il faut 5 tours.\n⛔ Le piège : 300 + 200 = 500 m pour un tour. Ce n'est que la moitié du parc.\nRéponse : a) $1\\,000$ m ; b) $3\\,000$ m ; c) 5 tours.",
          reponses: [
            { question: "a)", attendu: "1000 m" },
            { question: "b)", attendu: "3000 m" },
            { question: "c)", attendu: ["5", "cinq"] },
          ],
          micros: ["perimetre_quadrilatere", "perimetre_defi"],
        },
        {
          titre: "La baguette de l'encadreur",
          enonce: "Un encadreur a une baguette de bois de 96 cm.\nIl l'utilise en entier pour faire un cadre CARRÉ.\na) Combien mesure un côté du cadre ?\nb) Avec la même baguette, il fait un cadre rectangulaire de 30 cm de long. Combien mesure la largeur ?",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 24, 24), cotes: ["?"], droits: [0, 1, 2, 3], fond: "#fde68a" }], hmax: 140, largeur: "max-w-[11rem] print:max-w-[8rem]" }),
          correction:
            "a) Le tour du carré fait 96 cm. Un carré a 4 côtés égaux.\nJe partage en 4 : 96 ÷ 4 = 24.\nUn côté mesure 24 cm. Je vérifie : 24 × 4 = 96.\nb) Les 2 longueurs : 30 + 30 = 60 cm.\nIl reste pour les 2 largeurs : 96 − 60 = 36 cm.\nUne largeur : 36 ÷ 2 = 18 cm.\nJe vérifie : 30 + 18 + 30 + 18 = 96.\n⛔ Le piège : 96 ÷ 2 = 48 cm pour le carré. Un carré a 4 côtés, pas 2.\nRéponse : a) 24 cm ; b) 18 cm.",
          reponses: [
            { question: "a)", attendu: "24 cm" },
            { question: "b)", attendu: "18 cm" },
          ],
          micros: ["perimetre_defi"],
        },
        {
          titre: "Les plinthes du menuisier",
          enonce: "Un menuisier pose des plinthes au bas des murs d'une chambre rectangulaire de 4 m sur 3 m.\nIl n'en met pas devant la porte, large de 1 m.\na) Quel est le périmètre de la chambre ?\nb) Combien de mètres de plinthe pose-t-il ?\nc) Les plinthes sont vendues en morceaux de 2 m. Combien de morceaux doit-il acheter ?",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 4, 3), cotes: ["4 m", "3 m"], droits: [0, 1, 2, 3], fond: "#e0f2fe" }], segments: [{ de: [1.5, 0], vers: [2.5, 0], couleur: ORANGE, epaisseur: 7 }], textes: [{ en: [2, 0.35], t: "porte", couleur: ORANGE, taille: 12 }], hmax: 160 }),
          correction:
            "a) 4 + 3 + 4 + 3 = 14. Le périmètre est 14 m.\nb) J'enlève la porte : 14 − 1 = 13. Il pose 13 m de plinthe.\nc) Je compte de 2 en 2 : 6 morceaux font 6 × 2 = 12 m. Ce n'est pas assez : il manque 1 m.\n7 morceaux font 7 × 2 = 14 m. C'est assez.\nIl doit acheter 7 morceaux. Il lui restera 1 m.\n⛔ Le piège : acheter 6 morceaux. Avec 12 m, il manque 1 m de plinthe.\nRéponse : a) 14 m ; b) 13 m ; c) 7 morceaux.",
          reponses: [
            { question: "a)", attendu: "14 m" },
            { question: "b)", attendu: "13 m" },
            { question: "c)", attendu: ["7", "sept"] },
          ],
          micros: ["perimetre_quadrilatere", "perimetre_defi"],
        },
        {
          titre: "Les tables de la fête",
          enonce: "Un traiteur colle des tables carrées de 1 m de côté, en ligne.\nIl met une chaise par mètre de bord.\na) Combien de places y a-t-il autour des 3 tables du dessin ?\nb) Combien de places avec 5 tables en ligne ?\nc) Combien de tables faut-il pour 20 invités ?",
          figure: figure({
            polys: [
              { sommets: rect4(0, 0, 1, 1), fond: "#fef3c7" },
              { sommets: rect4(1, 0, 1, 1), fond: "#fef3c7" },
              { sommets: rect4(2, 0, 1, 1), fond: "#fef3c7" },
            ],
            ronds: [
              { en: [0.5, 1.35] }, { en: [1.5, 1.35] }, { en: [2.5, 1.35] },
              { en: [0.5, -0.55] }, { en: [1.5, -0.55] }, { en: [2.5, -0.55] },
              { en: [-0.35, 0.5] }, { en: [3.35, 0.5] },
            ],
            hmax: 140,
          }),
          correction:
            "Les places font le tour des tables : je compte le périmètre en mètres.\na) Je compte les chaises : 3 en haut, 3 en bas, 1 à chaque bout. 3 + 3 + 1 + 1 = 8 places.\nb) 5 tables en ligne : 5 en haut, 5 en bas, 1 à chaque bout. 5 + 5 + 1 + 1 = 12 places.\nc) Il faut 20 places. J'enlève les 2 bouts : 20 − 2 = 18. Il reste 18 places pour le haut et le bas : 18 ÷ 2 = 9.\nIl faut 9 tables. Je vérifie : 9 + 9 + 1 + 1 = 20.\n⛔ Le piège : une table seule a 4 places, alors 5 tables = 20 places. Faux ! Quand on colle les tables, les côtés collés n'ont plus de chaise.\nRéponse : a) 8 places ; b) 12 places ; c) 9 tables.",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: ["9", "neuf"] },
          ],
          micros: ["perimetre_defi"],
        },
      ],
    },
  ],
};
