// ─── Fiche d'exercices : les figures planes (CE2) — 20 exercices corrigés ──────
//
// 17/11/2026 : la feuille interactive de la notion `figures_planes` du coach
// CE2 (7 micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque
// `lib/tutor-v4/questionBank/ce2/maths/figures-planes.bank.ts` : carré,
// rectangle, triangle, triangle rectangle, LOSANGE (il entre au CE2) et
// cercle ; les propriétés d'angle droit et de longueurs égales ; construire à
// la règle, à l'équerre et au compas (le compas s'ouvre du RAYON).
// ⛔ LIMITES DU CE2 (BO n° 41 du 31/10/2024) : pas de relation d'inclusion
// (jamais « un carré est-il un rectangle ? »), pas de périmètre nommé (on
// « fait le tour »), pas de degrés. Des longueurs entières < 1 000.
// ⛔ Aucune construction à rendre : elle devient un QCM, un point à choisir ou
// une mesure. Aucune question à rédiger : QCM par lettre, oui ou non, un
// nombre, un mot. Phrases de 18 mots au plus.
//
// LE PIÈGE DE LA NOTION (celui de la banque) : la figure PENCHÉE. Un rectangle
// de travers reste un rectangle ; un carré posé sur la pointe reste un carré.
// Ce sont les côtés et les angles qui décident. Le second : le compas s'ouvre
// du rayon, pas de la largeur du cercle.
//
// Les pièges nommés : le carré sur la pointe appelé losange (1), le losange
// confondu avec un quadrilatère quelconque (2), le triangle rectangle penché
// (3, 16), le rayon appelé diamètre (4), ouvrir le compas de la largeur (5,
// 13, 18), « un losange a des angles droits » (6), le côté d'en face mesuré à
// l'œil (7), « trois angles droits » (8), compter les triangles sans vérifier
// l'angle (9), lire la construction sans les mesures (10), un côté trop court
// (11), oublier un côté du tour (12, 17), confondre losange et carré codés
// (14), compter des angles droits au losange (15), oublier la moitié du tour
// (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : école (1 à 16), carrelage (17), jardin
// (18), drapeaux du monde (19), menuiserie (20). Métiers : carreleur (17),
// jardinière (18), menuisier (20). Aucun contexte réunionnais sur cette
// feuille.
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · ex. 19 — le drapeau du Brésil est un rectangle vert portant un losange
//     jaune et un disque bleu (Wikipédia, « Drapeau du Brésil »). La longueur
//     du côté (17 cm) est un MODÈLE.
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : `dessin` (repère en carreaux, y vers le bas, de
// `dessins-geometrie-cm1.tsx`), souvent sur QUADRILLAGE : les lignes du
// quadrillage servent d'équerre. Le dessin montre la question, jamais la
// réponse.
//
// Micro-compétences : ce2_figure_reconnaitre (1, 14, 15), ce2_figure_triangle_
// rectangle (3, 8, 9, 16, 20), ce2_figure_losange (2, 6, 12, 14, 19),
// ce2_figure_proprietes (6, 7, 12, 14, 15, 17, 19), ce2_figure_construire (10,
// 11, 20), ce2_figure_cercle (4, 5, 13, 18), ce2_figure_defi (17, 18, 19, 20).
// 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, BLEU_CLAIR, ENCRE, ORANGE, ORANGE_CLAIR, VERT, VERT_CLAIR, VIOLET, dessin, type Forme, type P } from "@/lib/fiches-exercices/dessins-geometrie-cm1";

type Vers = "h" | "b" | "g" | "d" | "hg" | "hd" | "bg" | "bd";

/** Un point (croix) et son nom. */
const pt = (en: P, nom: string, vers: Vers = "h", c = ENCRE): Forme => ({ t: "point", en, nom, vers, c });

/** Les quatre petits carrés d'un quadrilatère droit, sommets dans l'ordre. */
const quatreDroits = (q: P[]): Forme[] =>
  q.map((p, k) => {
    const a = q[(k + 1) % 4];
    const b = q[(k + 3) % 4];
    return { t: "droit", en: p, u: [a[0] - p[0], a[1] - p[1]], v: [b[0] - p[0], b[1] - p[1]] } as Forme;
  });

/** Les petits traits sur les quatre côtés : `n[k]` traits sur le côté k → k+1. */
const codes = (q: P[], n: number[]): Forme[] => q.map((p, k) => ({ t: "code", de: p, vers: q[(k + 1) % 4], n: n[k] }) as Forme);

export const exercicesFiguresPlanesCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "figures-planes",
  titre: "Les figures planes",
  accroche:
    "Vingt exercices, du geste seul au problème. Reconnaître le carré, le rectangle, le triangle rectangle, le losange et le cercle, même penchés. Utiliser les angles droits et les côtés de même longueur. Ouvrir le compas du bon écartement. Un carreleur, une jardinière, le drapeau du Brésil et un menuisier. Un rappel avant chaque niveau. Cherche d'abord sur le dessin, avec ta règle et ton équerre. Puis ouvre la correction : étape par étape, avec le piège.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde les côtés et les angles, pas la façon dont la figure est posée.",
      rappel: [
        "Carré : 4 côtés de même longueur et 4 angles droits. Rectangle : 4 angles droits, côtés d'en face de même longueur.",
        "Losange : 4 côtés de même longueur. Triangle rectangle : un triangle avec un angle droit.",
        "Cercle : tous ses points sont à la même distance du centre. Cette distance s'appelle le rayon.",
      ],
      exercices: [
        {
          enonce: "Écris le nom de chaque figure : carré, rectangle, triangle ou cercle.\na) la figure 1\nb) la figure 2\nc) la figure 3\nd) la figure 4",
          figure: dessin({
            l: 20,
            h: 6.2,
            grille: true,
            label: "Quatre figures numérotées de 1 à 4 sur quadrillage",
            formes: [
              { t: "poly", pts: [[1, 3], [5, 1], [6, 3], [2, 5]], c: BLEU, fill: BLEU_CLAIR, w: 2.5 },
              { t: "texte", en: [3.5, 5.7], txt: "1" },
              { t: "poly", pts: [[7, 5], [10, 5], [8, 1]], c: ORANGE, fill: ORANGE_CLAIR, w: 2.5 },
              { t: "texte", en: [8.5, 5.7], txt: "2" },
              { t: "cercle", en: [12.5, 3], r: 1.8, c: VERT, fill: VERT_CLAIR, w: 2.5 },
              { t: "texte", en: [12.5, 5.7], txt: "3" },
              { t: "poly", pts: [[17, 1], [19, 3], [17, 5], [15, 3]], c: VIOLET, fill: "#ede9fe", w: 2.5 },
              { t: "texte", en: [17, 5.7], txt: "4" },
            ],
          }),
          correction:
            "Je regarde les côtés et les angles de chaque figure. Les lignes du quadrillage m'aident.\na) La figure 1 est penchée. Ses 4 angles sont droits, ses côtés d'en face sont égaux, deux longs et deux courts : rectangle.\nb) La figure 2 a 3 côtés : triangle.\nc) La figure 3 est toute ronde : cercle.\nd) La figure 4 est posée sur la pointe. Ses 4 côtés sont égaux et ses 4 angles sont droits : carré.\n⛔ Le piège du d) : dire « losange » parce que la figure est sur la pointe. Tournée ou pas, elle a 4 angles droits.\nRéponse : a) rectangle ; b) triangle ; c) cercle ; d) carré.",
          micros: ["ce2_figure_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["rectangle", "un rectangle"] },
            { question: "b)", attendu: ["triangle", "un triangle"] },
            { question: "c)", attendu: ["cercle", "un cercle"] },
            { question: "d)", attendu: ["carré", "un carré", "carre"] },
          ],
        },
        {
          enonce: "Un losange a 4 côtés de même longueur.\nQuelle figure est un losange ? Écris la lettre.",
          figure: dessin({
            l: 15,
            h: 7.6,
            label: "Trois quadrilatères A, B et C",
            formes: [
              { t: "poly", pts: [[1, 3.5], [3, 0.5], [5, 3.5], [3, 6.5]], c: BLEU, fill: BLEU_CLAIR, w: 2.5 },
              { t: "texte", en: [3, 7.2], txt: "A" },
              { t: "poly", pts: [[6, 2], [10, 2], [10, 5], [6, 5]], c: ORANGE, fill: ORANGE_CLAIR, w: 2.5 },
              { t: "texte", en: [8, 7.2], txt: "B" },
              { t: "poly", pts: [[11, 1.5], [14, 2.5], [14.5, 6], [11.5, 5]], c: VERT, fill: VERT_CLAIR, w: 2.5 },
              { t: "texte", en: [12.8, 7.2], txt: "C" },
            ],
          }),
          correction:
            "Je mesure les 4 côtés de chaque figure avec la règle.\nA : les 4 côtés ont la même longueur. C'est un losange.\nB : deux côtés longs, deux côtés courts. C'est un rectangle.\nC : les 4 côtés ont des longueurs différentes. Ce n'est ni un losange, ni un rectangle.\n⛔ Le piège : choisir C parce qu'il « penche » comme un losange. Ce qui compte, c'est la longueur des côtés.\nRéponse : A.",
          micros: ["ce2_figure_losange"],
          reponses: [{ attendu: ["A", "la figure A"] }],
        },
        {
          enonce: "Quel triangle est un triangle rectangle ? Écris la lettre.\nUtilise ton équerre.",
          figure: dessin({
            l: 16,
            h: 6.4,
            grille: true,
            label: "Trois triangles A, B et C sur quadrillage",
            formes: [
              { t: "poly", pts: [[1, 5], [5, 5], [2.5, 4]], c: BLEU, fill: BLEU_CLAIR, w: 2.5 },
              { t: "texte", en: [3, 5.9], txt: "A" },
              { t: "poly", pts: [[6.5, 3.5], [9.5, 2], [11, 5]], c: ORANGE, fill: ORANGE_CLAIR, w: 2.5 },
              { t: "texte", en: [9, 5.9], txt: "B" },
              { t: "poly", pts: [[12, 5], [15, 5], [13.8, 1]], c: VERT, fill: VERT_CLAIR, w: 2.5 },
              { t: "texte", en: [13.5, 5.9], txt: "C" },
            ],
          }),
          correction:
            "Je pose le coin de l'équerre dans chaque angle de chaque triangle.\nA : l'angle du haut est trop ouvert, les autres trop fermés. Pas d'angle droit.\nB : l'angle du haut colle exactement au coin de l'équerre. B a un angle droit.\nC : ses trois angles sont plus fermés qu'un angle droit.\n⛔ Le piège : écarter B parce qu'il est penché. Un triangle rectangle peut être posé de travers.\nRéponse : B.",
          micros: ["ce2_figure_triangle_rectangle"],
          reponses: [{ attendu: ["B", "le triangle B"] }],
        },
        {
          enonce: "Regarde le cercle.\na) Comment s'appelle le point O ?\nb) Comment s'appelle le segment OM ?",
          figure: dessin({
            l: 8,
            h: 7.6,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Un cercle, le point O au milieu, le point M sur le cercle",
            formes: [
              { t: "cercle", en: [4, 3.8], r: 3, c: BLEU, w: 2.5 },
              { t: "seg", de: [4, 3.8], vers: [6.6, 2.3], c: ORANGE, w: 2.5 },
              pt([4, 3.8], "O", "bg"),
              pt([6.6, 2.3], "M", "hd"),
            ],
          }),
          correction:
            "a) O est au milieu du cercle. Tous les points du cercle sont à la même distance de O. O est le centre.\nb) OM va du centre jusqu'au cercle. C'est un rayon.\n⛔ Le piège du b) : dire « diamètre ». Le diamètre traverse tout le cercle en passant par le centre. OM s'arrête au centre.\nRéponse : a) centre ; b) rayon.",
          micros: ["ce2_figure_cercle"],
          reponses: [
            { question: "a)", attendu: ["centre", "le centre"] },
            { question: "b)", attendu: ["rayon", "un rayon", "le rayon"] },
          ],
        },
        {
          enonce: "J'ouvre mon compas de 3 cm. Je pique en O et je trace un cercle.\na) M est sur le cercle. Combien mesure OM, en cm ?\nb) N est aussi sur le cercle. Combien mesure ON, en cm ?",
          figure: dessin({
            l: 8,
            h: 7.6,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Un cercle de centre O, les points M et N sur le cercle",
            formes: [{ t: "cercle", en: [4, 3.8], r: 3, c: BLEU, w: 2.5 }, pt([4, 3.8], "O", "b"), pt([7, 3.8], "M", "d"), pt([2.2, 1.4], "N", "hg")],
          }),
          correction:
            "L'écartement du compas reste le même pendant tout le tracé : 3 cm.\nLa mine passe par tous les points du cercle.\na) Donc M est à 3 cm de O : OM = 3 cm.\nb) N aussi est sur le cercle : ON = 3 cm.\n⛔ Le piège : croire que N, plus haut, est plus loin. Tous les points du cercle sont à la même distance du centre.\nRéponse : a) 3 ; b) 3.",
          micros: ["ce2_figure_cercle"],
          reponses: [
            { question: "a)", attendu: "3", unite: "cm" },
            { question: "b)", attendu: "3", unite: "cm" },
          ],
        },
        {
          enonce: "Réponds par un nombre, ou par oui ou non.\na) Combien d'angles droits a un carré ?\nb) Combien de côtés de même longueur a un losange ?\nc) Un losange a-t-il toujours des angles droits ?",
          figure: dessin({
            l: 12,
            h: 5,
            max: "max-w-[17rem] print:max-w-[12rem]",
            label: "Un carré et un losange",
            formes: [
              { t: "poly", pts: [[1, 1], [5, 1], [5, 4.6], [1, 4.6]], c: BLEU, fill: BLEU_CLAIR, w: 2.5 },
              { t: "poly", pts: [[9, 0.4], [11, 2.8], [9, 5.2], [7, 2.8]], c: ORANGE, fill: ORANGE_CLAIR, w: 2.5 },
            ],
          }),
          correction:
            "Je relis le rappel.\na) Un carré a 4 angles droits.\nb) Un losange a 4 côtés de même longueur.\nc) Le losange du dessin a ses 4 côtés égaux, mais aucun angle droit. Donc un losange n'a pas toujours d'angles droits : non.\n⛔ Le piège du c) : croire qu'un losange est un carré penché. Ses angles peuvent être pointus et ouverts.\nRéponse : a) 4 ; b) 4 ; c) non.",
          micros: ["ce2_figure_proprietes", "ce2_figure_losange"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["non", "faux"] },
          ],
        },
        {
          enonce: "ABCD est un rectangle. Le dessin n'est pas en vraie grandeur.\na) Combien mesure CD, en cm ?\nb) Combien mesure DA, en cm ?",
          figure: dessin({
            l: 11,
            h: 6,
            max: "max-w-[17rem] print:max-w-[12rem]",
            label: "Un rectangle ABCD : AB mesure 6 cm, BC mesure 3 cm",
            formes: [
              { t: "poly", pts: [[1, 1], [9, 1], [9, 5], [1, 5]], c: BLEU, w: 2.5 },
              pt([1, 1], "A", "hg"),
              pt([9, 1], "B", "hd"),
              pt([9, 5], "C", "bd"),
              pt([1, 5], "D", "bg"),
              { t: "texte", en: [5, 0.4], txt: "6 cm", c: ORANGE },
              { t: "texte", en: [9.5, 3], txt: "3 cm", c: ORANGE, ancre: "start" },
            ],
          }),
          correction:
            "Dans un rectangle, les côtés d'en face ont la même longueur.\na) CD est en face de AB. AB mesure 6 cm, donc CD mesure 6 cm.\nb) DA est en face de BC. BC mesure 3 cm, donc DA mesure 3 cm.\n⛔ Le piège : mesurer le dessin avec la règle. Il n'est pas en vraie grandeur : j'utilise la propriété du rectangle.\nRéponse : a) 6 ; b) 3.",
          micros: ["ce2_figure_proprietes"],
          reponses: [
            { question: "a)", attendu: "6", unite: "cm" },
            { question: "b)", attendu: "3", unite: "cm" },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) Un triangle rectangle a 3 côtés.\nb) Un triangle rectangle a 3 angles droits.\nc) Un triangle rectangle a 1 angle droit.",
          figure: dessin({
            l: 8,
            h: 5,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Un triangle rectangle avec le petit carré de l'angle droit",
            formes: [
              { t: "poly", pts: [[1, 4.5], [7, 4.5], [1, 0.6]], c: VERT, fill: VERT_CLAIR, w: 2.5 },
              { t: "droit", en: [1, 4.5], u: [1, 0], v: [0, -1] },
            ],
          }),
          correction:
            "Je regarde le triangle rectangle du dessin.\na) C'est un triangle : il a 3 côtés. Vrai.\nb) Il n'a qu'un seul petit carré. Les deux autres angles sont pointus. Faux.\nc) Il a un angle droit, celui du petit carré. Vrai.\n⛔ Le piège du b) : croire que « rectangle » veut dire 4 ou 3 angles droits, comme le rectangle. Le triangle rectangle n'en a qu'un.\nRéponse : a) vrai ; b) faux ; c) vrai.",
          micros: ["ce2_figure_triangle_rectangle"],
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["vrai", "oui"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. J'utilise les propriétés des figures, puis je vérifie avec mes outils.",
      rappel: [
        "Dans un carré, un losange : 4 côtés égaux. Le tour = 4 fois le côté.",
        "Dans un rectangle : les côtés d'en face sont égaux, et les 4 angles sont droits.",
        "J'ouvre le compas du rayon. Le cercle est 2 fois plus large que le rayon.",
      ],
      exercices: [
        {
          enonce: "Le carré est coupé par ses deux diagonales.\na) En combien de morceaux est-il coupé ?\nb) Au centre, pose ton équerre. Chaque morceau a-t-il un angle droit ?\nc) Chaque morceau est donc un triangle… ?",
          figure: dessin({
            l: 8,
            h: 8,
            grille: true,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Un carré coupé par ses deux diagonales",
            formes: [
              { t: "poly", pts: [[1, 1], [7, 1], [7, 7], [1, 7]], c: BLEU, fill: BLEU_CLAIR, w: 2.5 },
              { t: "seg", de: [1, 1], vers: [7, 7], c: BLEU, w: 2.5 },
              { t: "seg", de: [7, 1], vers: [1, 7], c: BLEU, w: 2.5 },
            ],
          }),
          correction:
            "a) Les deux diagonales se croisent au centre. Elles font 4 morceaux : en haut, en bas, à gauche, à droite.\nb) Au centre, le coin de l'équerre colle exactement dans chaque morceau : oui.\nc) Un triangle avec un angle droit est un triangle rectangle.\n⛔ Le piège : chercher l'angle droit dans les coins du carré. Ici, il est au centre.\nRéponse : a) 4 ; b) oui ; c) rectangle.",
          micros: ["ce2_figure_triangle_rectangle"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["oui", "vrai"] },
            { question: "c)", attendu: ["rectangle", "rectangles", "un triangle rectangle", "triangle rectangle"] },
          ],
        },
        {
          enonce: "Lis ce programme de construction.\n1. Je trace un segment AB de 5 cm.\n2. En A et en B, je trace un angle droit avec l'équerre.\n3. Sur ces deux traits, je marque D et C à 2 cm de A et de B.\n4. Je relie C et D.\nQuelle figure ai-je tracée ? A) un carré   B) un rectangle   C) un losange",
          correction:
            "Je suis le programme dans ma tête, étape par étape.\nAvec les étapes 2 et 3, les angles en A et en B sont droits.\nLes côtés AD et BC mesurent 2 cm. AB mesure 5 cm.\nLa figure a 4 angles droits, deux côtés longs de 5 cm et deux côtés courts de 2 cm.\nC'est un rectangle. Réponse B.\n⛔ Le piège : répondre « carré » à cause des angles droits. Un carré aurait 4 côtés égaux, ici 5 cm et 2 cm.\nRéponse : B.",
          micros: ["ce2_figure_construire"],
          reponses: [{ attendu: ["B", "B) un rectangle", "rectangle", "un rectangle"] }],
        },
        {
          enonce: "Je veux finir le carré ABCD sur le quadrillage.\na) Quel point faut-il prendre pour D : E, F ou G ?\nb) Combien de carreaux mesure chaque côté du carré ?",
          figure: dessin({
            l: 6,
            h: 6,
            grille: true,
            u: 32,
            max: "max-w-[13rem] print:max-w-[9rem]",
            label: "Trois sommets A, B, C d'un carré, et trois points E, F, G",
            formes: [
              { t: "seg", de: [1, 5], vers: [4, 5], c: BLEU, w: 2.5 },
              { t: "seg", de: [4, 5], vers: [4, 2], c: BLEU, w: 2.5 },
              pt([1, 5], "A", "bg", BLEU),
              pt([4, 5], "B", "bd", BLEU),
              pt([4, 2], "C", "hd", BLEU),
              pt([1, 2], "E", "g", ORANGE),
              pt([2, 2], "F", "hd", ORANGE),
              pt([1, 1], "G", "g", ORANGE),
            ],
          }),
          correction:
            "b) D'abord, je compte les carreaux : de A à B, 3 carreaux. De B à C, 3 carreaux.\na) D doit être au-dessus de A, à 3 carreaux, pour faire un angle droit en A.\nE est juste au-dessus de A, à 3 carreaux. E convient.\nF est à côté : DA serait penché. G est trop haut : 4 carreaux.\n⛔ Le piège : prendre G, au-dessus de A lui aussi. Le côté serait trop long : 4 carreaux au lieu de 3.\nRéponse : a) E ; b) 3.",
          micros: ["ce2_figure_construire"],
          reponses: [
            { question: "a)", attendu: ["E", "le point E"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          enonce: "a) Un losange a un côté de 7 cm. Combien mesure son tour, en cm ?\nb) Le tour d'un carré mesure 20 cm. Combien mesure un côté, en cm ?",
          figure: dessin({
            l: 13,
            h: 5.4,
            max: "max-w-[17rem] print:max-w-[12rem]",
            label: "Un losange dont un côté mesure 7 cm, et un carré dont le tour mesure 20 cm",
            formes: [
              { t: "poly", pts: [[3.5, 0.5], [5.8, 2.7], [3.5, 4.9], [1.2, 2.7]], c: ORANGE, fill: ORANGE_CLAIR, w: 2.5 },
              { t: "texte", en: [5.4, 1.2], txt: "7 cm", c: ORANGE, ancre: "start" },
              { t: "poly", pts: [[8.4, 1], [11.6, 1], [11.6, 4.2], [8.4, 4.2]], c: BLEU, fill: BLEU_CLAIR, w: 2.5 },
              { t: "texte", en: [10, 2.6], txt: "tour : 20 cm", c: BLEU, taille: 12 },
              { t: "texte", en: [10, 0.45], txt: "?", c: BLEU, taille: 16 },
            ],
          }),
          correction:
            "a) Un losange a 4 côtés de même longueur : 7 + 7 + 7 + 7 = 28 cm. C'est aussi 4 × 7 = 28.\nb) Un carré a 4 côtés égaux. Je cherche le nombre qui, 4 fois, fait 20.\n4 × 5 = 20. Donc un côté mesure 5 cm.\n⛔ Le piège du a) : répondre 14, en comptant seulement deux côtés. Un losange en a quatre.\nRéponse : a) 28 ; b) 5.",
          micros: ["ce2_figure_losange", "ce2_figure_proprietes"],
          reponses: [
            { question: "a)", attendu: "28", unite: "cm" },
            { question: "b)", attendu: "5", unite: "cm" },
          ],
        },
        {
          enonce: "a) J'ouvre mon compas de 4 cm. Quelle sera la largeur du cercle, en passant par le centre ?\nb) Je veux un cercle de 10 cm de large. De combien j'ouvre mon compas ?",
          figure: dessin({
            l: 9,
            h: 8,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Un cercle de centre O, un rayon de 4 cm et un trait qui traverse le cercle",
            formes: [
              { t: "cercle", en: [4.5, 4], r: 3.3, c: BLEU, w: 2.5 },
              { t: "seg", de: [1.2, 4], vers: [7.8, 4], c: VIOLET, w: 2, pt: true },
              { t: "seg", de: [4.5, 4], vers: [4.5, 0.7], c: ORANGE, w: 2.5 },
              pt([4.5, 4], "O", "bd"),
              { t: "texte", en: [5.6, 2.2], txt: "4 cm", c: ORANGE },
              { t: "texte", en: [2.7, 4.7], txt: "?", c: VIOLET, taille: 18 },
            ],
          }),
          correction:
            "L'écartement du compas, c'est le rayon : du centre jusqu'au cercle.\na) Le trait qui traverse passe par le centre : c'est 2 rayons. 4 + 4 = 8 cm.\nb) 10 cm de large, c'est 2 rayons. Je cherche la moitié de 10 : 5 + 5 = 10. J'ouvre de 5 cm.\n⛔ Le piège du b) : ouvrir le compas de 10 cm. Le cercle ferait alors 20 cm de large.\nRéponse : a) 8 ; b) 5.",
          micros: ["ce2_figure_cercle"],
          reponses: [
            { question: "a)", attendu: "8", unite: "cm" },
            { question: "b)", attendu: "5", unite: "cm" },
          ],
        },
        {
          enonce: "Lis le codage de chaque figure. Écris : carré, rectangle ou losange.\na) la figure 1\nb) la figure 2\nc) la figure 3",
          figure: dessin({
            l: 16.5,
            h: 5.6,
            label: "Trois quadrilatères codés, numérotés 1, 2 et 3",
            formes: [
              { t: "poly", pts: [[1, 1], [4.2, 1], [4.2, 4.2], [1, 4.2]], c: BLEU, w: 2.5 },
              ...quatreDroits([[1, 1], [4.2, 1], [4.2, 4.2], [1, 4.2]]),
              ...codes([[1, 1], [4.2, 1], [4.2, 4.2], [1, 4.2]], [1, 1, 1, 1]),
              { t: "texte", en: [2.6, 5.2], txt: "1" },
              { t: "poly", pts: [[7.5, 0.4], [9, 2.6], [7.5, 4.8], [6, 2.6]], c: ORANGE, w: 2.5 },
              ...codes([[7.5, 0.4], [9, 2.6], [7.5, 4.8], [6, 2.6]], [1, 1, 1, 1]),
              { t: "texte", en: [7.5, 5.3], txt: "2" },
              { t: "poly", pts: [[10.5, 1], [15.8, 1], [15.8, 4.2], [10.5, 4.2]], c: VERT, w: 2.5 },
              ...quatreDroits([[10.5, 1], [15.8, 1], [15.8, 4.2], [10.5, 4.2]]),
              ...codes([[10.5, 1], [15.8, 1], [15.8, 4.2], [10.5, 4.2]], [1, 2, 1, 2]),
              { t: "texte", en: [13.15, 5.2], txt: "3" },
            ],
          }),
          correction:
            "Je lis les petits carrés (angles droits) et les petits traits (côtés égaux).\na) Figure 1 : 4 angles droits, et le même petit trait sur les 4 côtés. C'est un carré.\nb) Figure 2 : le même petit trait sur les 4 côtés, mais aucun angle droit. C'est un losange.\nc) Figure 3 : 4 angles droits. Un trait sur les côtés longs, deux traits sur les courts. C'est un rectangle.\n⛔ Le piège : appeler « carré » la figure 2, parce qu'elle a 4 côtés égaux. Sans angle droit, c'est un losange.\nRéponse : a) carré ; b) losange ; c) rectangle.",
          micros: ["ce2_figure_proprietes", "ce2_figure_losange", "ce2_figure_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["carré", "un carré", "carre"] },
            { question: "b)", attendu: ["losange", "un losange"] },
            { question: "c)", attendu: ["rectangle", "un rectangle"] },
          ],
        },
        {
          enonce: "Sur le quadrillage : un carré, un triangle rectangle et un losange.\nCombien d'angles droits y a-t-il en tout dans ces trois figures ?",
          figure: dessin({
            l: 16,
            h: 5.4,
            grille: true,
            label: "Un carré, un triangle rectangle et un losange sur quadrillage",
            formes: [
              { t: "poly", pts: [[1, 1], [4, 1], [4, 4], [1, 4]], c: BLEU, fill: BLEU_CLAIR, w: 2.5 },
              { t: "poly", pts: [[6, 4], [10, 4], [6, 1]], c: VERT, fill: VERT_CLAIR, w: 2.5 },
              { t: "poly", pts: [[13, 0.4], [14.5, 2.4], [13, 4.4], [11.5, 2.4]], c: ORANGE, fill: ORANGE_CLAIR, w: 2.5 },
            ],
          }),
          correction:
            "Je compte les angles droits de chaque figure, avec l'équerre.\nLe carré : 4 angles droits.\nLe triangle rectangle : 1 angle droit, en bas à gauche.\nLe losange : ses angles sont pointus ou ouverts. Aucun angle droit : 0.\nEn tout : 4 + 1 + 0 = 5 angles droits.\n⛔ Le piège : compter 4 angles droits au losange, comme au carré. Le losange a 4 côtés égaux, pas 4 angles droits.\nRéponse : 5.",
          micros: ["ce2_figure_proprietes", "ce2_figure_reconnaitre"],
          reponses: [{ attendu: ["5", "cinq"] }],
        },
        {
          enonce: "Regarde le triangle KLM sur le quadrillage.\na) Est-ce un triangle rectangle ? Écris oui ou non.\nb) En quel sommet est l'angle droit ?",
          figure: dessin({
            l: 7,
            h: 5,
            grille: true,
            max: "max-w-[13rem] print:max-w-[9rem]",
            label: "Un triangle KLM penché sur quadrillage",
            formes: [{ t: "poly", pts: [[1, 3], [4, 1], [6, 4]], c: VIOLET, fill: "#ede9fe", w: 2.5 }, pt([1, 3], "K", "g"), pt([4, 1], "L", "h"), pt([6, 4], "M", "d")],
          }),
          correction:
            "Je pose le coin de l'équerre dans chaque angle du triangle.\nEn K et en M, l'angle est plus fermé que le coin de l'équerre.\nEn L, le coin de l'équerre colle exactement : l'angle est droit.\na) Le triangle a un angle droit : oui, c'est un triangle rectangle.\nb) L'angle droit est en L.\n⛔ Le piège : chercher l'angle droit en bas, comme sur les dessins habituels. Ici, il est en haut.\nRéponse : a) oui ; b) L.",
          micros: ["ce2_figure_triangle_rectangle"],
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["L", "en L", "le sommet L"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je cherche la figure, j'écris ses propriétés, puis je calcule pas à pas.",
      rappel: [
        "Je nomme d'abord la figure : carré, rectangle, losange, triangle rectangle ou cercle.",
        "Le tour d'une figure : j'additionne TOUS ses côtés.",
        "Pour un cercle : le compas s'ouvre du rayon, la largeur vaut 2 rayons.",
      ],
      exercices: [
        {
          titre: "La terrasse du carreleur",
          enonce: "Un carreleur pose 4 rangées de 3 carreaux carrés. Chaque carreau a des côtés de 20 cm.\na) Combien de carreaux pose-t-il ?\nb) Combien mesure le côté long de la terrasse, en cm ?\nc) Combien mesure le côté court, en cm ?\nd) Combien mesure le tour de la terrasse, en cm ?",
          figure: dessin({
            l: 6,
            h: 5,
            grille: true,
            u: 34,
            max: "max-w-[13rem] print:max-w-[9rem]",
            label: "Une terrasse rectangulaire de 4 carreaux sur 3",
            formes: [
              { t: "case", x: 1, y: 1, l: 4, h: 3, fill: ORANGE_CLAIR },
              { t: "poly", pts: [[1, 1], [5, 1], [5, 4], [1, 4]], c: ORANGE, w: 3 },
              { t: "seg", de: [2, 1], vers: [2, 4], c: ORANGE, w: 1.5 },
              { t: "seg", de: [3, 1], vers: [3, 4], c: ORANGE, w: 1.5 },
              { t: "seg", de: [4, 1], vers: [4, 4], c: ORANGE, w: 1.5 },
              { t: "seg", de: [1, 2], vers: [5, 2], c: ORANGE, w: 1.5 },
              { t: "seg", de: [1, 3], vers: [5, 3], c: ORANGE, w: 1.5 },
            ],
          }),
          correction:
            "a) 4 carreaux dans chaque rangée, 3 rangées : 4 × 3 = 12 carreaux.\nb) Le côté long compte 4 carreaux de 20 cm : 20 + 20 + 20 + 20 = 80 cm.\nc) Le côté court compte 3 carreaux : 20 + 20 + 20 = 60 cm.\nd) La terrasse est un rectangle : deux côtés de 80 cm, deux côtés de 60 cm.\n80 + 60 + 80 + 60 = 280 cm.\n⛔ Le piège du d) : faire 80 + 60 = 140 et s'arrêter. Le tour passe par les 4 côtés.\nRéponse : a) 12 ; b) 80 ; c) 60 ; d) 280.",
          micros: ["ce2_figure_proprietes", "ce2_figure_defi"],
          reponses: [
            { question: "a)", attendu: ["12", "douze"] },
            { question: "b)", attendu: "80", unite: "cm" },
            { question: "c)", attendu: "60", unite: "cm" },
            { question: "d)", attendu: "280", unite: "cm" },
          ],
        },
        {
          titre: "Le massif rond de la jardinière",
          enonce: "Une jardinière plante un piquet. Elle y attache une corde de 2 m, la tend et tourne autour.\na) La corde joue le rôle : A) du rayon   B) de la largeur du cercle   C) du centre\nb) Combien mesure le massif d'un bord à l'autre, en passant par le piquet, en m ?\nc) Pour un massif de 6 m de large, quelle longueur de corde faut-il, en m ?",
          figure: dessin({
            l: 9,
            h: 8,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Un piquet au centre, une corde tendue et le cercle tracé dans la terre",
            formes: [
              { t: "cercle", en: [4.5, 4], r: 3.3, c: VERT, fill: VERT_CLAIR, w: 2.5, pt: true },
              { t: "seg", de: [4.5, 4], vers: [7.2, 2.1], c: "#a16207", w: 3 },
              { t: "cercle", en: [4.5, 4], r: 0.25, c: "#713f12", fill: "#a16207" },
              { t: "texte", en: [6.5, 3.6], txt: "2 m", c: "#713f12" },
            ],
          }),
          correction:
            "a) Le piquet est le centre. La corde tendue va du centre jusqu'au bord : c'est le rayon. Réponse A.\nb) D'un bord à l'autre en passant par le piquet, il y a 2 rayons : 2 + 2 = 4 m.\nc) 6 m de large, c'est 2 rayons. 3 + 3 = 6 : la corde doit mesurer 3 m.\n⛔ Le piège du c) : prendre une corde de 6 m. Le massif ferait alors 12 m de large.\nRéponse : a) A ; b) 4 ; c) 3.",
          micros: ["ce2_figure_cercle", "ce2_figure_defi"],
          reponses: [
            { question: "a)", attendu: ["A", "A) du rayon", "rayon", "le rayon"] },
            { question: "b)", attendu: "4", unite: "m" },
            { question: "c)", attendu: "3", unite: "m" },
          ],
        },
        {
          titre: "Le drapeau du Brésil",
          enonce: "Le drapeau du Brésil est un rectangle vert. Au milieu, il y a un losange jaune.\na) Combien de côtés de même longueur a le losange ?\nb) Un côté du losange mesure 17 cm. Combien mesure son tour, en cm ?\nc) Combien d'angles droits a le drapeau ?",
          figure: dessin({
            l: 10,
            h: 7,
            max: "max-w-[15rem] print:max-w-[10rem]",
            label: "Le drapeau du Brésil : un rectangle vert, un losange jaune, un disque bleu",
            formes: [
              { t: "poly", pts: [[0.5, 0.5], [9.5, 0.5], [9.5, 6.5], [0.5, 6.5]], c: "#166534", fill: "#16a34a", w: 2 },
              { t: "poly", pts: [[5, 1.1], [8.9, 3.5], [5, 5.9], [1.1, 3.5]], c: "#a16207", fill: "#facc15", w: 2 },
              { t: "cercle", en: [5, 3.5], r: 1.4, c: "#1e3a8a", fill: "#1d4ed8" },
            ],
          }),
          correction:
            "a) Un losange a 4 côtés de même longueur.\nb) Je fais le tour : 17 + 17 + 17 + 17.\n17 + 17 = 34, et 34 + 34 = 68 cm. C'est aussi 4 × 17 = 68.\nc) Le drapeau est un rectangle. Un rectangle a 4 angles droits.\n⛔ Le piège du c) : compter aussi des angles droits dans le losange. Ses angles sont pointus ou ouverts : aucun n'est droit.\nRéponse : a) 4 ; b) 68 ; c) 4.",
          micros: ["ce2_figure_losange", "ce2_figure_proprietes", "ce2_figure_defi"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: "68", unite: "cm" },
            { question: "c)", attendu: ["4", "quatre"] },
          ],
        },
        {
          titre: "Le cadre du menuisier",
          enonce: "Un menuisier fabrique un cadre rectangulaire de 60 cm sur 40 cm.\na) Combien d'angles doit-il vérifier avec son équerre ?\nb) Combien de cm de baguette faut-il pour faire le tour du cadre ?\nc) Il coupe une planche rectangulaire d'un coin au coin opposé. Qu'obtient-il ?\nA) deux carrés   B) deux triangles rectangles   C) deux losanges",
          figure: dessin({
            l: 12,
            h: 5,
            max: "max-w-[17rem] print:max-w-[12rem]",
            label: "Un cadre rectangulaire, et une planche coupée d'un coin au coin opposé",
            formes: [
              { t: "poly", pts: [[0.5, 0.5], [6, 0.5], [6, 4.3], [0.5, 4.3]], c: "#92400e", w: 5 },
              { t: "texte", en: [3.25, 2.4], txt: "60 cm × 40 cm", c: "#92400e", taille: 12 },
              { t: "poly", pts: [[7.2, 0.5], [11.5, 0.5], [11.5, 4.3], [7.2, 4.3]], c: "#92400e", fill: "#fde68a", w: 2 },
              { t: "seg", de: [7.2, 0.5], vers: [11.5, 4.3], c: "#dc2626", w: 2.5, pt: true },
            ],
          }),
          correction:
            "a) Un rectangle a 4 angles droits. Il vérifie les 4 coins avec l'équerre.\nb) Deux côtés de 60 cm et deux côtés de 40 cm : 60 + 40 + 60 + 40.\n60 + 60 = 120 et 40 + 40 = 80. Puis 120 + 80 = 200 cm.\nc) La coupe part d'un coin et va au coin opposé. Chaque morceau a 3 côtés et garde un coin de la planche.\nCe coin est droit : ce sont deux triangles rectangles. Réponse B.\n⛔ Le piège du b) : calculer 60 + 40 = 100 cm. C'est seulement la moitié du tour.\nRéponse : a) 4 ; b) 200 ; c) B.",
          micros: ["ce2_figure_construire", "ce2_figure_triangle_rectangle", "ce2_figure_defi"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: "200", unite: "cm" },
            { question: "c)", attendu: ["B", "B) deux triangles rectangles"] },
          ],
        },
      ],
    },
  ],
};
