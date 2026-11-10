// ─── Fiche d'exercices : les figures planes (CM1) — 20 exercices corrigés ──────
//
// 10/11/2026 : feuille interactive de la notion `figure_plane` du coach CM1
// (8 micros). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Chaque exercice a son champ `reponses`.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/cm1/maths/figures-
// planes.bank.ts` et la carte mentale `cm1/figure_plane` : triangles
// (rectangle, isocèle, équilatéral), quadrilatères (carré, rectangle, losange),
// le cercle (centre, rayon, diamètre ; tous les points à la même distance du
// centre), le codage (petit carré, petits traits), compter des figures.
// ⛔ CM1 : AUCUNE construction à rendre. « Construire » devient un QCM sur la
// bonne étape ou l'outil ; les noms de figures se tapent en un mot.
//
// Les pièges nommés : « un carré, c'est un rectangle » oublié (1, 8, 9), un
// sommet oublié (2), deux angles droits dans un triangle (3, 8), écarter le
// compas du diamètre (4, 11, 18), le côté d'en face (5, 10, 16), « isocèle »
// pour trois côtés égaux (6, 15), un point dehors pris pour un point du cercle
// (7, 14), le losange pris pour un carré (9), le tour du tapis (10), l'angle
// aigu (12), compter les carreaux au lieu des côtés (13), oublier les grands
// triangles (17), oublier le grand carré (19), « le carré demande moins de
// ruban » (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : yoga (10), vélo (11), fanion de fête (15),
// vitrail (17), jardin (18), menuiserie (19), photographie (20).
// Métiers : maître verrière (17), jardinier paysagiste (18), menuisière (19),
// photographe (20).
//
// Aucun fait réel chiffré : tout est un MODÈLE.
//
// ⭐ LES DESSINS : `dessins-geometrie-cm1.tsx` (repère en carreaux, y vers le
// bas). Codage en rouge : petit carré pour l'angle droit, petits traits pour
// les longueurs égales.
//
// Micro-compétences : figure_triangle (1, 2, 3, 6, 15), figure_quadrilatere (1,
// 2, 5, 8, 9, 10), figure_cercle (4, 11, 18), figure_propriete (5, 8, 10, 13,
// 20), figure_construire (4, 12), figure_codage (3, 9, 16), cercle_ensemble_
// points (7, 14, 18), figure_defi (17, 18, 19, 20). 8/8.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, BLEU_CLAIR, ENCRE, ORANGE, ORANGE_CLAIR, ROUGE, VERT, VERT_CLAIR, VIOLET, dessin, ecranSeulement } from "@/lib/fiches-exercices/dessins-geometrie-cm1";

export const exercicesFigurePlaneCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "figure-plane",
  titre: "Les figures planes",
  accroche:
    "Vingt exercices, du geste seul au problème. Nommer un triangle, un carré, un rectangle, un losange. Lire le codage d'une figure : le petit carré de l'angle droit, les petits traits des côtés égaux. Utiliser le centre, le rayon et le diamètre d'un cercle. Compter des figures cachées. Un tapis de yoga, une roue de vélo, un fanion, un vitrail, un massif de fleurs et un cadre photo. Un rappel de cours avant chaque niveau. Cherche d'abord avec ta règle, ton équerre et ton compas. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je compte les côtés, puis je cherche les angles droits.",
      rappel: [
        "Un triangle a 3 côtés et 3 sommets. Un quadrilatère a 4 côtés et 4 sommets.",
        "Rectangle : 4 angles droits. Carré : 4 angles droits ET 4 côtés égaux. Losange : 4 côtés égaux.",
        "Un petit carré codé = un angle droit. Le même petit trait = la même longueur.",
        "Dans un cercle, le diamètre fait 2 rayons : rayon 3 cm, diamètre 6 cm.",
      ],
      exercices: [
        {
          enonce: "Donne le nom le plus précis de chaque figure.\na) la figure 1\nb) la figure 2\nc) la figure 3",
          figure: dessin({
            l: 15,
            h: 5,
            grille: true,
            label: "Trois figures sur un quadrillage, numérotées 1, 2 et 3",
            formes: [
              { t: "poly", pts: [[0.5, 4], [4, 4], [1.5, 1]], c: BLEU, fill: BLEU_CLAIR },
              { t: "texte", en: [2.2, 4.6], txt: "1" },
              { t: "poly", pts: [[5.5, 1], [8.5, 1], [8.5, 4], [5.5, 4]], c: VERT, fill: VERT_CLAIR },
              { t: "texte", en: [7, 4.6], txt: "2" },
              { t: "poly", pts: [[10, 2], [14, 2], [14, 4], [10, 4]], c: ORANGE, fill: ORANGE_CLAIR },
              { t: "texte", en: [12, 4.6], txt: "3" },
            ],
          }),
          correction:
            "Je compte les côtés, puis je regarde les angles et les longueurs sur le quadrillage.\na) La figure 1 a 3 côtés : c'est un triangle.\nb) La figure 2 a 4 côtés de 3 carreaux et 4 angles droits : c'est un carré.\nc) La figure 3 a 4 angles droits, mais des côtés de 4 carreaux et de 2 carreaux : c'est un rectangle.\n⛔ Le piège : b) répondre « rectangle ». C'est vrai, un carré est un rectangle. Mais le nom le plus précis est « carré », car ses 4 côtés sont égaux.\nRéponse : a) triangle ; b) carré ; c) rectangle.",
          reponses: [
            { question: "a)", attendu: ["triangle", "un triangle", "le triangle"] },
            { question: "b)", attendu: ["carré", "un carré", "le carré"] },
            { question: "c)", attendu: ["rectangle", "un rectangle", "le rectangle"] },
          ],
          micros: ["figure_triangle", "figure_quadrilatere"],
        },
        {
          enonce: "Compte.\na) Combien de sommets a un triangle ?\nb) Combien de côtés a un quadrilatère ?\nc) La figure ci-dessous a 5 côtés. Combien a-t-elle de sommets ?",
          figure: dessin({
            l: 6,
            h: 5,
            max: "max-w-[10rem] print:max-w-[8rem]",
            label: "Une figure à 5 côtés",
            formes: [{ t: "poly", pts: [[3, 0.5], [5.4, 2.1], [4.5, 4.5], [1.5, 4.5], [0.6, 2.1]], c: VIOLET, fill: "#ede9fe" }],
          }),
          correction:
            "Un sommet, c'est un coin : là où deux côtés se rejoignent.\na) Un triangle : « tri » veut dire trois. 3 côtés et 3 sommets.\nb) Un quadrilatère : « quadri » veut dire quatre. 4 côtés.\nc) Je fais le tour de la figure en comptant les coins : 1, 2, 3, 4, 5. 5 sommets.\n⭐ Une figure a toujours autant de sommets que de côtés.\n⛔ Le piège : compter deux fois le coin d'où je pars. Je pose mon doigt sur le premier coin et je m'arrête juste avant d'y revenir.\nRéponse : a) 3 ; b) 4 ; c) 5.",
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["5", "cinq"] },
          ],
          micros: ["figure_triangle", "figure_quadrilatere"],
        },
        {
          enonce: "Lis le codage du triangle ABC.\na) Quel est le sommet de l'angle droit ?\nb) [AB] mesure 4 cm. Combien mesure [AC] ?\nc) Ce triangle est :\nA) équilatéral   B) rectangle et isocèle   C) quelconque",
          figure: dessin({
            l: 6,
            h: 5,
            max: "max-w-[11rem] print:max-w-[8rem]",
            label: "Le triangle ABC avec un angle droit en A et deux côtés codés égaux",
            formes: [
              { t: "poly", pts: [[1, 4.5], [5, 4.5], [1, 0.5]], c: BLEU, fill: BLEU_CLAIR },
              { t: "droit", en: [1, 4.5], u: [1, 0], v: [0, -1] },
              { t: "code", de: [1, 4.5], vers: [5, 4.5], n: 1 },
              { t: "code", de: [1, 4.5], vers: [1, 0.5], n: 1 },
              { t: "point", en: [1, 4.5], nom: "A", vers: "bg" },
              { t: "point", en: [5, 4.5], nom: "B", vers: "bd" },
              { t: "point", en: [1, 0.5], nom: "C", vers: "hg" },
            ],
          }),
          correction:
            "Je lis les petits signes rouges.\na) Le petit carré est en A : l'angle droit est en A.\nb) [AB] et [AC] portent le même petit trait : ils ont la même longueur. [AC] mesure 4 cm.\nc) Un angle droit : le triangle est rectangle. Deux côtés égaux : il est isocèle. Il est les deux à la fois : B.\nIl n'est pas équilatéral : [BC] est plus long que les deux autres côtés.\n⛔ Le piège : mesurer le dessin au lieu de lire le codage. Le codage dit la vérité, même si le dessin n'est pas à la bonne taille.\nRéponse : a) A ; b) 4 cm ; c) B.",
          reponses: [
            { question: "a)", attendu: ["A", "en A", "le sommet A"] },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: ["B", "rectangle et isocèle", "b) rectangle et isocèle"] },
          ],
          micros: ["figure_codage", "figure_triangle"],
        },
        {
          enonce: "Maé veut tracer un cercle de centre O et de rayon 3 cm.\na) Combien mesure son diamètre ?\nb) De combien de cm écarte-t-elle son compas ?",
          figure: dessin({
            l: 7,
            h: 7,
            max: "max-w-[10rem] print:max-w-[8rem]",
            label: "Un cercle de centre O et de rayon 3 cm",
            formes: [
              { t: "cercle", en: [3.5, 3.5], r: 3, c: BLEU },
              { t: "seg", de: [3.5, 3.5], vers: [6.5, 3.5], c: ORANGE },
              { t: "point", en: [3.5, 3.5], nom: "O", vers: "bg" },
              { t: "texte", en: [5, 3], txt: "3 cm", c: ORANGE, taille: 13 },
            ],
          }),
          correction:
            "Le rayon va du centre jusqu'au cercle. Le diamètre traverse tout le cercle en passant par le centre.\na) Le diamètre fait 2 rayons : 3 × 2 = 6 cm.\nb) Je pique la pointe du compas sur le centre O. L'écart du compas, c'est le rayon : 3 cm.\n⛔ Le piège : b) écarter le compas de 6 cm. Le cercle aurait alors un diamètre de 12 cm, deux fois trop grand.\nRéponse : a) 6 cm ; b) 3 cm.",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "3" },
          ],
          micros: ["figure_cercle", "figure_construire"],
        },
        {
          enonce: "ABCD est un rectangle.\na) Combien mesure le côté [DC] ?\nb) Combien mesure le côté [AD] ?",
          figure: dessin({
            l: 8,
            h: 5,
            max: "max-w-[13rem] print:max-w-[9rem]",
            label: "Le rectangle ABCD : AB = 5 cm, BC = 3 cm",
            formes: [
              { t: "poly", pts: [[1, 4], [6.5, 4], [6.5, 1], [1, 1]], c: VERT, fill: VERT_CLAIR },
              { t: "droit", en: [1, 4], u: [1, 0], v: [0, -1] },
              { t: "droit", en: [6.5, 4], u: [-1, 0], v: [0, -1] },
              { t: "droit", en: [6.5, 1], u: [-1, 0], v: [0, 1] },
              { t: "droit", en: [1, 1], u: [1, 0], v: [0, 1] },
              { t: "point", en: [1, 4], nom: "A", vers: "bg" },
              { t: "point", en: [6.5, 4], nom: "B", vers: "bd" },
              { t: "point", en: [6.5, 1], nom: "C", vers: "hd" },
              { t: "point", en: [1, 1], nom: "D", vers: "hg" },
              { t: "texte", en: [3.75, 4.55], txt: "5 cm", c: ENCRE, taille: 13 },
              { t: "texte", en: [7.4, 2.5], txt: "3 cm", c: ENCRE, taille: 13 },
            ],
          }),
          correction:
            "Dans un rectangle, les côtés d'en face ont la même longueur.\na) [DC] est en face de [AB]. [AB] mesure 5 cm, donc [DC] aussi : 5 cm.\nb) [AD] est en face de [BC]. [BC] mesure 3 cm, donc [AD] aussi : 3 cm.\n⛔ Le piège : a) répondre 3 cm parce que [DC] « touche » [BC]. Je cherche le côté d'EN FACE, pas le côté voisin.\nRéponse : a) 5 cm ; b) 3 cm.",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "3" },
          ],
          micros: ["figure_propriete", "figure_quadrilatere"],
        },
        {
          enonce: "Un triangle a ses trois côtés de 6 cm. C'est :\nA) un triangle rectangle\nB) un triangle quelconque\nC) un triangle équilatéral",
          correction:
            "Je regarde les longueurs : 6 cm, 6 cm et 6 cm. Les trois côtés sont égaux.\nUn triangle aux trois côtés égaux s'appelle un triangle équilatéral : C.\nIl ne peut pas être rectangle : ses trois angles sont égaux, aucun n'est droit.\n⛔ Le piège : dire seulement « isocèle ». Isocèle, c'est au moins 2 côtés égaux. Ici, il y en a 3 : le nom précis est équilatéral.\nRéponse : C.",
          reponses: [{ attendu: ["C", "équilatéral", "un triangle équilatéral", "c) un triangle équilatéral"] }],
          micros: ["figure_triangle"],
        },
        {
          enonce: "Le cercle a pour centre O et pour rayon 4 cm.\nOM = 4 cm, ON = 3 cm et OP = 5 cm.\na) Quel point est sur le cercle ?\nb) Quel point est à l'intérieur du cercle ?\nc) Quel point est à l'extérieur du cercle ?",
          correction:
            "Tous les points du cercle sont à la même distance du centre : le rayon, 4 cm.\na) OM = 4 cm, c'est le rayon : M est sur le cercle.\nb) ON = 3 cm, moins que le rayon : N est plus près du centre. Il est à l'intérieur.\nc) OP = 5 cm, plus que le rayon : P est trop loin. Il est à l'extérieur.\n⛔ Le piège : croire qu'un point « près du cercle » est sur le cercle. Il faut exactement 4 cm, ni plus ni moins.\nRéponse : a) M ; b) N ; c) P.",
          schema: ecranSeulement(
            dessin({
              l: 11,
              h: 10,
              u: 18,
              max: "max-w-[12rem] print:max-w-[9rem]",
              label: "Le cercle de centre O, de rayon 4 cm, et les points M, N, P",
              formes: [
                { t: "cercle", en: [5, 5], r: 4, c: BLEU },
                { t: "point", en: [5, 5], nom: "O", vers: "bg" },
                { t: "point", en: [9, 5], nom: "M", vers: "d", c: VERT },
                { t: "point", en: [5, 2], nom: "N", vers: "b", c: ORANGE },
                { t: "point", en: [1.47, 8.54], nom: "P", vers: "bg", c: ROUGE },
              ],
            }),
          ),
          reponses: [
            { question: "a)", attendu: ["M", "le point M"] },
            { question: "b)", attendu: ["N", "le point N"] },
            { question: "c)", attendu: ["P", "le point P"] },
          ],
          micros: ["cercle_ensemble_points"],
        },
        {
          enonce: "Vrai ou faux ?\na) Un carré est un rectangle.\nb) Un triangle rectangle peut avoir 2 angles droits.\nc) Un losange a 4 côtés de la même longueur.",
          correction:
            "Je relis la définition de chaque figure.\na) Un rectangle a 4 angles droits. Le carré a bien 4 angles droits : c'est un rectangle particulier. Vrai.\nb) Avec 2 angles droits, deux côtés partiraient tout droit, côte à côte, sans jamais se rejoindre. Le triangle ne se fermerait pas. Faux : 1 seul angle droit.\nc) C'est la définition du losange : 4 côtés égaux. Vrai.\n⛔ Le piège : a) répondre faux parce qu'un carré « n'a pas la forme allongée ». Ce qui compte, ce sont les 4 angles droits.\nRéponse : a) vrai ; b) faux ; c) vrai.",
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["vrai", "oui"] },
          ],
          micros: ["figure_quadrilatere", "figure_propriete"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je vérifie avec la règle, l'équerre ou le compas.",
      rappel: [
        "Pour reconnaître un quadrilatère : je compte les angles droits, puis je compare les côtés.",
        "Dans un rectangle et dans un carré, les côtés d'en face ont la même longueur.",
        "Un point est sur le cercle quand il est à la distance « rayon » du centre.",
        "Isocèle : 2 côtés égaux. Équilatéral : 3 côtés égaux. Rectangle : 1 angle droit.",
      ],
      exercices: [
        {
          enonce: "Observe les quatre figures A, B, C et D.\na) Quelle figure est un losange (pas un carré) ?\nb) Quelle figure est un rectangle (pas un carré) ?\nc) Quelle figure est un carré ?\nd) Combien de ces figures ont 4 angles droits ?",
          figure: dessin({
            l: 21,
            h: 6,
            grille: true,
            u: 19,
            label: "Quatre quadrilatères A, B, C et D sur un quadrillage",
            formes: [
              { t: "poly", pts: [[1, 2], [5, 2], [5, 4], [1, 4]], c: BLEU, fill: BLEU_CLAIR },
              { t: "texte", en: [3, 5.5], txt: "A" },
              { t: "poly", pts: [[6, 5], [10, 5], [9, 2], [7, 2]], c: VERT, fill: VERT_CLAIR },
              { t: "texte", en: [8, 5.5], txt: "B" },
              { t: "poly", pts: [[11, 1], [15, 1], [15, 5], [11, 5]], c: ORANGE, fill: ORANGE_CLAIR },
              { t: "texte", en: [13, 5.5], txt: "C" },
              { t: "poly", pts: [[18, 1], [19.5, 3], [18, 5], [16.5, 3]], c: VIOLET, fill: "#ede9fe" },
              { t: "texte", en: [18, 5.6], txt: "D" },
            ],
          }),
          correction:
            "Pour chaque figure, je cherche les angles droits, puis je compare les côtés.\nA : 4 angles droits, côtés de 4 et de 2 carreaux. C'est un rectangle.\nB : pas d'angle droit, le haut est plus court que le bas. Ce n'est ni un rectangle ni un losange.\nC : 4 angles droits et 4 côtés de 4 carreaux. C'est un carré.\nD : pas d'angle droit, mais 4 côtés égaux (je les compare au compas). C'est un losange.\na) D ; b) A ; c) C.\nd) A et C ont 4 angles droits : 2 figures.\n⛔ Le piège : prendre le losange D pour un carré « penché ». Un carré a des angles droits ; le losange D n'en a aucun.\nRéponse : a) D ; b) A ; c) C ; d) 2.",
          reponses: [
            { question: "a)", attendu: ["D", "la figure D"] },
            { question: "b)", attendu: ["A", "la figure A"] },
            { question: "c)", attendu: ["C", "la figure C"] },
            { question: "d)", attendu: ["2", "deux"] },
          ],
          micros: ["figure_quadrilatere", "figure_codage"],
        },
        {
          enonce: "Le tapis de yoga de Kofi est un rectangle de 180 cm sur 60 cm.\na) Combien mesure le côté en face du côté de 180 cm ?\nb) Combien d'angles droits a le tapis ?\nc) Kofi fait le tour du tapis avec un ruban. Quelle longueur de ruban lui faut-il, en cm ?",
          correction:
            "Je fais un petit dessin du rectangle : deux grands côtés, deux petits côtés.\na) Dans un rectangle, le côté d'en face a la même longueur : 180 cm.\nb) Un rectangle a 4 angles droits.\nc) Le tour, c'est les 4 côtés : 180 + 60 + 180 + 60.\nJe groupe : 180 + 180 = 360 et 60 + 60 = 120. Puis 360 + 120 = 480 cm.\n⛔ Le piège : c) faire 180 + 60 = 240 cm. Ce n'est que la moitié du tour : il y a 4 côtés, pas 2.\nRéponse : a) 180 cm ; b) 4 ; c) 480 cm.",
          reponses: [
            { question: "a)", attendu: "180" },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: "480" },
          ],
          micros: ["figure_propriete", "figure_quadrilatere"],
        },
        {
          enonce: "La roue du vélo de Yanis a un diamètre de 60 cm.\na) Quel est le rayon de la roue ?\nb) La roue de sa sœur a un rayon de 25 cm. Quel est son diamètre ?",
          correction:
            "Le diamètre fait 2 rayons. Le rayon est la moitié du diamètre.\na) La moitié de 60 : 60 ÷ 2 = 30 cm. Le rayon mesure 30 cm : c'est la longueur d'un rayon de la roue, du moyeu au pneu.\nb) Le diamètre fait 2 rayons : 25 × 2 = 50 cm.\n⛔ Le piège : a) répondre 120 cm. Le rayon est PLUS PETIT que le diamètre : je divise par 2, je ne multiplie pas.\nRéponse : a) 30 cm ; b) 50 cm.",
          schema: ecranSeulement(
            dessin({
              l: 7,
              h: 7,
              max: "max-w-[10rem] print:max-w-[8rem]",
              label: "Une roue : le diamètre fait deux rayons",
              formes: [
                { t: "cercle", en: [3.5, 3.5], r: 3, c: ENCRE, w: 4 },
                { t: "seg", de: [0.5, 3.5], vers: [6.5, 3.5], c: BLEU },
                { t: "seg", de: [3.5, 3.5], vers: [3.5, 0.5], c: ORANGE },
                { t: "texte", en: [5, 4], txt: "diamètre", c: BLEU, taille: 12 },
                { t: "texte", en: [4.4, 1.6], txt: "rayon", c: ORANGE, taille: 12 },
              ],
            }),
          ),
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "50" },
          ],
          micros: ["figure_cercle"],
        },
        {
          enonce: "Hugo trace un carré de 4 cm de côté. Il a déjà tracé le côté [AB].\na) Que trace-t-il en B ?\nA) un arc de cercle   B) un angle aigu   C) un angle droit\nb) Avec quel outil vérifie-t-il cet angle ?\nc) Combien de côtés de 4 cm aura le carré ?",
          correction:
            "Un carré a 4 angles droits et 4 côtés égaux.\na) En B, le côté suivant doit partir en angle droit : C.\nb) L'outil de l'angle droit, c'est l'équerre. Je pose un côté de l'équerre sur [AB], le coin en B.\nc) Tous les côtés d'un carré sont égaux : 4 côtés de 4 cm.\n⛔ Le piège : a) tracer « à l'œil ». Un angle presque droit donne un quadrilatère penché, pas un carré.\nRéponse : a) C ; b) l'équerre ; c) 4.",
          reponses: [
            { question: "a)", attendu: ["C", "un angle droit", "c) un angle droit"] },
            { question: "b)", attendu: ["équerre", "l'équerre", "une équerre", "l equerre"] },
            { question: "c)", attendu: ["4", "quatre"] },
          ],
          micros: ["figure_construire"],
        },
        {
          enonce: "Observe ce polygone.\na) Combien a-t-il de côtés ?\nb) Combien a-t-il de sommets ?\nc) Une figure à 6 côtés s'appelle :\nA) un pentagone   B) un hexagone   C) un octogone",
          figure: dessin({
            l: 8,
            h: 6,
            grille: true,
            max: "max-w-[13rem] print:max-w-[9rem]",
            label: "Un polygone en forme de L sur un quadrillage",
            formes: [{ t: "poly", pts: [[1, 1], [4, 1], [4, 3], [7, 3], [7, 5], [1, 5]], c: BLEU, fill: BLEU_CLAIR }],
          }),
          correction:
            "Je fais le tour de la figure avec le doigt, en partant du coin en haut à gauche.\na) Je compte chaque trait droit : en haut, puis je descends, puis à droite, puis je descends, puis le bas, puis je remonte. 6 côtés.\nb) Il y a autant de sommets que de côtés : 6 sommets. Je compte aussi le coin « rentrant », au milieu.\nc) « Hexa » veut dire six : un hexagone. C'est B.\nPentagone : 5 côtés. Octogone : 8 côtés.\n⛔ Le piège : compter les carreaux du bord au lieu des côtés. Un côté est un trait droit entier, même long de 6 carreaux.\nRéponse : a) 6 ; b) 6 ; c) B.",
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["6", "six"] },
            { question: "c)", attendu: ["B", "un hexagone", "hexagone", "b) un hexagone"] },
          ],
          micros: ["figure_propriete"],
        },
        {
          enonce: "Le cercle a pour centre O et un rayon de 3 carreaux.\na) Quels points sont sur le cercle ?\nb) Quel point est à l'intérieur ?\nc) Quel point est à l'extérieur ?",
          figure: dessin({
            l: 10,
            h: 8,
            grille: true,
            max: "max-w-[15rem] print:max-w-[11rem]",
            label: "Un cercle de centre O, rayon 3 carreaux, et quatre points A, B, C, D",
            formes: [
              { t: "cercle", en: [5, 4], r: 3, c: BLEU },
              { t: "point", en: [5, 4], nom: "O", vers: "bg" },
              { t: "point", en: [8, 4], nom: "A", vers: "hd" },
              { t: "point", en: [5, 2], nom: "B", vers: "hd" },
              { t: "point", en: [1, 4], nom: "C", vers: "hg" },
              { t: "point", en: [5, 7], nom: "D", vers: "bd" },
            ],
          }),
          correction:
            "Je compte les carreaux entre O et chaque point. Le rayon fait 3 carreaux.\nA : 3 carreaux à droite de O. Sur le cercle.\nB : 2 carreaux au-dessus de O. Moins que 3 : à l'intérieur.\nC : 4 carreaux à gauche de O. Plus que 3 : à l'extérieur.\nD : 3 carreaux sous O. Sur le cercle.\na) A et D ; b) B ; c) C.\n⛔ Le piège : oublier D. Un point du cercle peut être en bas, en haut, à gauche ou à droite : tous sont à 3 carreaux de O.\nRéponse : a) A et D ; b) B ; c) C.",
          reponses: [
            { question: "a)", attendu: ["A ; D", "A et D", "D et A"] },
            { question: "b)", attendu: ["B", "le point B"] },
            { question: "c)", attendu: ["C", "le point C"] },
          ],
          micros: ["cercle_ensemble_points"],
        },
        {
          enonce: "Mei découpe un fanion de fête. C'est un triangle de côtés 5 cm, 5 cm et 3 cm.\na) Ce triangle est :\nA) isocèle   B) équilatéral   C) rectangle\nb) Combien de côtés ont la même longueur ?\nc) Quelle longueur de galon faut-il pour faire le tour du fanion, en cm ?",
          correction:
            "a) Deux côtés de 5 cm, égaux. Le troisième, 3 cm, est différent. Deux côtés égaux : isocèle, A.\nIl n'est pas équilatéral : il faudrait 3 côtés égaux.\nb) 2 côtés ont la même longueur, 5 cm.\nc) Le tour, c'est la somme des 3 côtés : 5 + 5 + 3 = 13 cm.\n⛔ Le piège : a) répondre équilatéral parce que deux côtés sont égaux. Équilatéral, c'est les TROIS côtés égaux.\nRéponse : a) A ; b) 2 ; c) 13 cm.",
          reponses: [
            { question: "a)", attendu: ["A", "isocèle", "a) isocèle"] },
            { question: "b)", attendu: ["2", "deux"] },
            { question: "c)", attendu: "13" },
          ],
          micros: ["figure_triangle"],
        },
        {
          enonce: "Lis le codage du quadrilatère ABCD.\na) [AB] mesure 6 cm. Combien mesure [DC] ?\nb) [BC] mesure 2 cm. Combien mesure [AD] ?\nc) Quel est le nom de ce quadrilatère ?",
          figure: dessin({
            l: 8,
            h: 5,
            max: "max-w-[13rem] print:max-w-[9rem]",
            label: "Le quadrilatère ABCD codé : quatre angles droits, côtés opposés égaux",
            formes: [
              { t: "poly", pts: [[1, 4], [7, 4], [7, 2], [1, 2]], c: ORANGE, fill: ORANGE_CLAIR },
              { t: "droit", en: [1, 4], u: [1, 0], v: [0, -1] },
              { t: "droit", en: [7, 4], u: [-1, 0], v: [0, -1] },
              { t: "droit", en: [7, 2], u: [-1, 0], v: [0, 1] },
              { t: "droit", en: [1, 2], u: [1, 0], v: [0, 1] },
              { t: "code", de: [1, 4], vers: [7, 4], n: 1 },
              { t: "code", de: [1, 2], vers: [7, 2], n: 1 },
              { t: "code", de: [7, 4], vers: [7, 2], n: 2 },
              { t: "code", de: [1, 4], vers: [1, 2], n: 2 },
              { t: "point", en: [1, 4], nom: "A", vers: "bg" },
              { t: "point", en: [7, 4], nom: "B", vers: "bd" },
              { t: "point", en: [7, 2], nom: "C", vers: "hd" },
              { t: "point", en: [1, 2], nom: "D", vers: "hg" },
            ],
          }),
          correction:
            "Je lis les signes : un petit carré à chaque coin, et deux sortes de petits traits.\na) [AB] et [DC] portent 1 petit trait : même longueur. [DC] mesure 6 cm.\nb) [BC] et [AD] portent 2 petits traits : même longueur. [AD] mesure 2 cm.\nc) 4 angles droits, côtés d'en face égaux, mais pas 4 côtés égaux (6 cm et 2 cm). C'est un rectangle.\n⛔ Le piège : a) répondre 2 cm. Les côtés à 1 trait vont ensemble, ceux à 2 traits aussi : je ne les mélange pas.\nRéponse : a) 6 cm ; b) 2 cm ; c) rectangle.",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: ["rectangle", "un rectangle", "le rectangle"] },
          ],
          micros: ["figure_codage"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout, je fais un dessin, puis je réponds question par question.",
      rappel: [
        "Pour compter des figures cachées : d'abord les petites, puis celles faites de plusieurs morceaux.",
        "Le tour d'une figure, c'est la somme de tous ses côtés.",
        "Rayon = la moitié du diamètre. Diamètre = 2 rayons.",
      ],
      exercices: [
        {
          titre: "Le vitrail de la maître verrière",
          enonce: "Une maître verrière fabrique un vitrail carré. Elle trace les deux diagonales du carré.\na) Combien de petits triangles voit-on ?\nb) Combien de triangles en tout, petits et grands ?",
          figure: dessin({
            l: 6,
            h: 6,
            max: "max-w-[10rem] print:max-w-[8rem]",
            label: "Un carré coupé par ses deux diagonales",
            formes: [
              { t: "poly", pts: [[1, 1], [5, 1], [3, 3]], fill: "#bfdbfe", w: 0 },
              { t: "poly", pts: [[5, 1], [5, 5], [3, 3]], fill: "#fde68a", w: 0 },
              { t: "poly", pts: [[5, 5], [1, 5], [3, 3]], fill: "#fecaca", w: 0 },
              { t: "poly", pts: [[1, 5], [1, 1], [3, 3]], fill: "#bbf7d0", w: 0 },
              { t: "poly", pts: [[1, 1], [5, 1], [5, 5], [1, 5]], w: 3 },
              { t: "seg", de: [1, 1], vers: [5, 5], w: 3 },
              { t: "seg", de: [5, 1], vers: [1, 5], w: 3 },
            ],
          }),
          correction:
            "Je compte dans l'ordre : d'abord les petits, puis les grands.\na) Les deux diagonales coupent le carré en 4 petits triangles, un de chaque couleur.\nb) Un grand triangle, c'est 2 petits triangles côte à côte, le long d'une diagonale.\nLa diagonale qui descend coupe le carré en 2 grands triangles. L'autre diagonale aussi : 2 grands triangles.\nCela fait 2 + 2 = 4 grands triangles.\nEn tout : 4 petits + 4 grands = 8 triangles.\n⛔ Le piège : b) répondre 4. Chaque moitié du carré est AUSSI un triangle.\nRéponse : a) 4 ; b) 8.",
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["8", "huit"] },
          ],
          micros: ["figure_defi", "figure_triangle"],
        },
        {
          titre: "Le massif rond du jardinier",
          enonce: "Un jardinier paysagiste trace un massif de fleurs rond. Il attache une corde de 3 m à un piquet planté au centre. Il tend la corde et fait le tour.\na) Quel est le diamètre du massif, en mètres ?\nb) Un rosier est à 2 m du piquet. Est-il dans le massif ? Réponds oui ou non.\nc) Un banc est à 4 m du piquet. Est-il dans le massif ? Réponds oui ou non.",
          correction:
            "La corde tendue joue le rôle du compas : le piquet est le centre, la corde est le rayon, 3 m.\na) Le diamètre fait 2 rayons : 3 × 2 = 6 m.\nb) Le rosier est à 2 m du centre, moins que le rayon de 3 m : il est dans le massif. Oui.\nc) Le banc est à 4 m du centre, plus que 3 m : il est dehors. Non.\n⛔ Le piège : c) comparer 4 m au diamètre (6 m) et répondre oui. On compare la distance au CENTRE avec le RAYON.\nRéponse : a) 6 m ; b) oui ; c) non.",
          schema: ecranSeulement(
            dessin({
              l: 10,
              h: 10,
              u: 18,
              max: "max-w-[12rem] print:max-w-[9rem]",
              label: "Le massif de rayon 3 m, le rosier à 2 m et le banc à 4 m",
              formes: [
                { t: "cercle", en: [5, 5], r: 3, c: VERT, fill: VERT_CLAIR },
                { t: "seg", de: [5, 5], vers: [8, 5], c: "#92400e" },
                { t: "point", en: [5, 5], nom: "piquet", vers: "bg" },
                { t: "point", en: [5, 3], nom: "rosier", vers: "hd", c: "#db2777", rond: true },
                { t: "point", en: [5, 9], nom: "banc", vers: "d", c: ORANGE, rond: true },
                { t: "texte", en: [6.5, 4.4], txt: "3 m", c: "#92400e", taille: 13 },
              ],
            }),
          ),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: ["oui", "vrai"] },
            { question: "c)", attendu: ["non", "faux"] },
          ],
          micros: ["figure_defi", "figure_cercle", "cercle_ensemble_points"],
        },
        {
          titre: "La boîte de la menuisière",
          enonce: "Une menuisière fabrique un couvercle carré, partagé en 4 petits carrés.\na) Combien de carrés en tout, petits et grand ?\nb) Combien de rectangles qui ne sont PAS des carrés ?",
          figure: dessin({
            l: 6,
            h: 6,
            max: "max-w-[10rem] print:max-w-[8rem]",
            label: "Un carré partagé en 4 petits carrés",
            formes: [
              { t: "poly", pts: [[1, 1], [5, 1], [5, 5], [1, 5]], c: "#92400e", fill: "#fde68a", w: 3 },
              { t: "seg", de: [3, 1], vers: [3, 5], c: "#92400e", w: 3 },
              { t: "seg", de: [1, 3], vers: [5, 3], c: "#92400e", w: 3 },
            ],
          }),
          correction:
            "Je compte d'abord les petites figures, puis celles faites de plusieurs morceaux.\na) Les petits carrés : 4. Le grand carré, tout le couvercle : 1. En tout : 4 + 1 = 5 carrés.\nb) Deux petits carrés côte à côte forment un rectangle allongé.\nÀ l'horizontale : la rangée du haut et celle du bas, 2 rectangles. À la verticale : la colonne de gauche et celle de droite, 2 rectangles.\nEn tout : 2 + 2 = 4 rectangles.\n⛔ Le piège : a) répondre 4 et oublier le grand carré. Le couvercle entier est aussi un carré.\nRéponse : a) 5 ; b) 4.",
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
          micros: ["figure_defi", "figure_quadrilatere"],
        },
        {
          titre: "Les cadres de la photographe",
          enonce: "Une photographe colle un ruban tout autour de ses cadres.\na) Un cadre rectangle mesure 30 cm sur 20 cm. Quelle longueur de ruban, en cm ?\nb) Un cadre carré a des côtés de 25 cm. Quelle longueur de ruban, en cm ?\nc) Quel cadre demande le plus de ruban ?\nA) le rectangle   B) le carré   C) ils en demandent autant",
          correction:
            "Le ruban fait le tour : j'additionne tous les côtés.\na) Rectangle : les côtés d'en face sont égaux. 30 + 20 + 30 + 20 = 100 cm.\nb) Carré : 4 côtés égaux. 25 + 25 + 25 + 25 = 4 × 25 = 100 cm.\nc) 100 cm et 100 cm : ils demandent autant de ruban, C.\n⛔ Le piège : c) croire que le carré, « plus petit », demande moins de ruban. Je calcule avant de répondre : les deux tours font 100 cm.\nRéponse : a) 100 cm ; b) 100 cm ; c) C.",
          reponses: [
            { question: "a)", attendu: "100" },
            { question: "b)", attendu: "100" },
            { question: "c)", attendu: ["C", "autant", "ils en demandent autant", "pareil", "c) ils en demandent autant"] },
          ],
          micros: ["figure_defi", "figure_propriete"],
        },
      ],
    },
  ],
};
