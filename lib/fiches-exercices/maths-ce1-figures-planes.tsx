// ─── Fiche d'exercices : les figures planes (CE1) — 20 exercices corrigés ──────
//
// 17/11/2026 : la feuille interactive de la notion `figures_planes` du coach
// CE1 (10 micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★,
// un rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque
// `lib/tutor-v4/questionBank/ce1/maths/figures-planes.bank.ts` : cercle,
// carré, rectangle, triangle, triangle rectangle ; côté, sommet, angle ;
// angle droit, aigu, obtus ; l'équerre, le code de l'angle droit, le compas ;
// les côtés égaux du carré et du rectangle ; reproduire sur quadrillage.
// ⛔ LIMITES DU CE1 : pas de mesure d'angle en degrés, pas de périmètre
// nommé (on « fait le tour »), des longueurs entières < 100. Aucune
// construction à rendre : elle devient un compte de carreaux ou un QCM.
// ⛔ Aucune question à rédiger : QCM par lettre, oui ou non, un nombre, un mot.
// Phrases de 16 mots au plus.
//
// Les pièges nommés : le cercle « rond » sans nom (1), le carré compté pour
// 3 sommets (2), l'angle droit pris pour obtus parce qu'il est grand (3), la
// règle pour un angle droit (4), le petit carré pris pour une mesure (5),
// piquer sur le trait du cercle (6), un triangle « droit » parce qu'il est
// posé à plat (7), le triangle à 4 sommets (8), LA FIGURE PENCHÉE (9, le
// piège du programme), le côté d'en face mesuré à l'œil (10), oublier un côté
// dans le tour (11), répondre « rectangle » pour un triangle rectangle (12),
// les angles comptés à l'œil (13), un seul code pour le rectangle (14), le
// rayon confondu avec le cercle entier (15), tracer le côté d'en face plus
// court (16), compter 6 carreaux pour 3 sur 3 (17), l'arbre « sur le bord »
// (18), oublier que le coin reste droit (19), oublier le grand carré (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : école (1 à 8), art (9), jardin (18),
// cuisine (19), maison (17, 20), sport (12). Métiers : carreleuse (17),
// jardinier (18), pâtissier (19), menuisier (20). Aucun contexte réunionnais
// sur cette feuille.
//
// ⭐ FAITS RÉELS : aucun. Les longueurs sont des MODÈLES.
//
// ⭐ LES DESSINS : `dessin` (repère en carreaux, y vers le bas, de
// `dessins-geometrie-cm1.tsx`), `angles` (de `dessins-cm1-geometrie.tsx`) et
// `instruments` (local : règle, équerre, compas). Le dessin montre la
// question, jamais la réponse ; les tracés du corrigé sont `ecranSeulement`.
//
// Micro-compétences : ce1_figure_reconnaitre (1, 9, 20), ce1_figure_triangle_
// rectangle (7, 12, 19), ce1_figure_decrire (2, 12), ce1_angle_droit (4, 13),
// ce1_angle_aigu_obtus (3, 13), ce1_angle_droit_code (5, 14),
// ce1_figure_proprietes (8, 10, 11, 17), ce1_figure_construire (16),
// ce1_figure_compas (6, 15, 18), ce1_figure_defi (17, 18, 19, 20). 10/10.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, BLEU_CLAIR, ENCRE, ORANGE, ORANGE_CLAIR, ROUGE, VERT, VERT_CLAIR, VIOLET, dessin, ecranSeulement, type Forme, type P } from "@/lib/fiches-exercices/dessins-geometrie-cm1";
import { angles } from "@/lib/fiches-exercices/dessins-cm1-geometrie";

const GRIS = "#64748b";

/** Un point (croix) et son nom. */
const pt = (en: P, nom: string, vers: "h" | "b" | "g" | "d" | "hg" | "hd" | "bg" | "bd" = "h", c = ENCRE): Forme => ({ t: "point", en, nom, vers, c });

/** Les trois instruments, côte à côte, sous les lettres A, B et C. */
const instruments = () =>
  dessin({
    l: 15,
    h: 6,
    label: "Trois instruments : A, B et C",
    formes: [
      // A : la règle
      { t: "poly", pts: [[0.3, 2.5], [4.3, 2.5], [4.3, 3.5], [0.3, 3.5]], fill: "#fef9c3", c: ENCRE },
      ...[0.7, 1.2, 1.7, 2.2, 2.7, 3.2, 3.7].map((x): Forme => ({ t: "seg", de: [x, 2.5], vers: [x, 2.85], c: ENCRE, w: 1.2 })),
      { t: "texte", en: [2.3, 5.4], txt: "A" },
      // B : l'équerre
      { t: "poly", pts: [[5.6, 0.8], [5.6, 4.6], [9.2, 4.6]], fill: "#dbeafe", c: BLEU, w: 2.4 },
      { t: "poly", pts: [[6.3, 2.3], [6.3, 3.9], [7.9, 3.9]], fill: "#ffffff", c: BLEU, w: 1.5 },
      { t: "texte", en: [7.2, 5.4], txt: "B" },
      // C : le compas
      { t: "seg", de: [12.5, 0.9], vers: [11.1, 4.6], c: GRIS, w: 3 },
      { t: "seg", de: [12.5, 0.9], vers: [13.9, 4.6], c: GRIS, w: 3 },
      { t: "cercle", en: [12.5, 0.9], r: 0.3, fill: GRIS, c: GRIS },
      { t: "seg", de: [13.9, 4.2], vers: [14.05, 4.75], c: ORANGE, w: 3 },
      { t: "texte", en: [12.5, 5.4], txt: "C" },
    ],
  });

export const exercicesFiguresPlanesCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "figures-planes",
  titre: "Les figures planes",
  accroche:
    "Vingt exercices, du geste seul au problème. Nommer le carré, le rectangle, le triangle et le cercle. Trouver un angle droit avec l'équerre. Lire le petit carré qui code l'angle droit. Tracer un cercle au compas. Une carreleuse, un jardinier, un pâtissier et un menuisier. Un rappel avant chaque niveau. Cherche d'abord sur le dessin. Puis ouvre la correction : étape par étape, avec le piège.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde les côtés et les coins.",
      rappel: [
        "Le carré a 4 côtés égaux et 4 angles droits. Le rectangle a 4 angles droits.",
        "Le triangle a 3 côtés et 3 sommets. Le cercle n'a pas de côté droit.",
        "Un angle droit se vérifie avec l'équerre. Plus petit : aigu. Plus grand : obtus.",
      ],
      exercices: [
        {
          enonce: "Écris le nom de chaque figure.\na) la figure 1\nb) la figure 2\nc) la figure 3\nd) la figure 4",
          figure: dessin({
            l: 11,
            h: 10,
            max: "max-w-[17rem] print:max-w-[12rem]",
            label: "Quatre figures numérotées de 1 à 4",
            formes: [
              { t: "poly", pts: [[0.8, 0.5], [3.8, 0.5], [3.8, 3.5], [0.8, 3.5]], fill: BLEU_CLAIR, c: BLEU },
              { t: "texte", en: [2.3, 4.3], txt: "1", taille: 16 },
              { t: "poly", pts: [[5.6, 1.1], [10.4, 1.1], [10.4, 3.5], [5.6, 3.5]], fill: ORANGE_CLAIR, c: ORANGE },
              { t: "texte", en: [8, 4.3], txt: "2", taille: 16 },
              { t: "poly", pts: [[0.6, 8.8], [4, 8.8], [2.3, 5.6]], fill: VERT_CLAIR, c: VERT },
              { t: "texte", en: [2.3, 9.6], txt: "3", taille: 16 },
              { t: "cercle", en: [8, 7.2], r: 1.6, fill: "#ede9fe", c: VIOLET },
              { t: "texte", en: [8, 9.6], txt: "4", taille: 16 },
            ],
          }),
          correction:
            "Je regarde les côtés de chaque figure.\na) 4 côtés tous égaux : un carré.\nb) 4 côtés, deux longs et deux courts : un rectangle.\nc) 3 côtés : un triangle.\nd) Aucun côté droit, tout rond : un cercle.\n⛔ Le piège : d) écrire « rond ». La figure a un nom : le cercle.\nRéponse : a) carré ; b) rectangle ; c) triangle ; d) cercle.",
          micros: ["ce1_figure_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["carré", "un carré", "le carré"] },
            { question: "b)", attendu: ["rectangle", "un rectangle", "le rectangle"] },
            { question: "c)", attendu: ["triangle", "un triangle", "le triangle"] },
            { question: "d)", attendu: ["cercle", "un cercle", "le cercle"] },
          ],
        },
        {
          enonce: "Compte sur le dessin.\na) Combien de côtés a le triangle ?\nb) Combien de sommets a le carré ?",
          figure: dessin({
            l: 11,
            h: 5,
            max: "max-w-[17rem] print:max-w-[12rem]",
            label: "Un triangle et un carré",
            formes: [
              { t: "poly", pts: [[0.6, 4.4], [4.6, 4.4], [2, 0.8]], fill: VERT_CLAIR, c: VERT },
              { t: "poly", pts: [[6.4, 0.8], [10.2, 0.8], [10.2, 4.6], [6.4, 4.6]], fill: BLEU_CLAIR, c: BLEU },
            ],
          }),
          correction:
            "a) Je suis le bord du triangle avec mon doigt : 1, 2, 3 traits. Il a 3 côtés.\nb) Un sommet, c'est un coin. Je touche chaque coin du carré : 1, 2, 3, 4. Il a 4 sommets.\n⛔ Le piège : b) oublier le coin d'où l'on part. Je fais tout le tour.\nRéponse : a) 3 ; b) 4.",
          micros: ["ce1_figure_decrire"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Regarde les angles a, b et c.\nÉcris : aigu, droit ou obtus.\na) l'angle a\nb) l'angle b\nc) l'angle c",
          figure: angles([
            { deg: 45, nom: "a" },
            { deg: 90, nom: "b" },
            { deg: 130, nom: "c" },
          ]),
          correction:
            "Je compare chaque angle au coin de mon équerre.\na) L'angle a est plus fermé que le coin de l'équerre : il est aigu.\nb) L'angle b colle au coin de l'équerre : il est droit.\nc) L'angle c est plus ouvert que l'équerre : il est obtus.\n⛔ Le piège : croire qu'un angle est grand parce que ses traits sont longs. Seule l'ouverture compte.\nRéponse : a) aigu ; b) droit ; c) obtus.",
          micros: ["ce1_angle_aigu_obtus"],
          reponses: [
            { question: "a)", attendu: ["aigu", "un angle aigu"] },
            { question: "b)", attendu: ["droit", "un angle droit"] },
            { question: "c)", attendu: ["obtus", "un angle obtus"] },
          ],
        },
        {
          enonce: "Avec quel instrument je vérifie un angle droit ?\nÉcris A, B ou C.",
          figure: instruments(),
          correction:
            "A est une règle : elle sert à tracer des traits droits et à mesurer.\nB est une équerre : son coin est un angle droit.\nC est un compas : il sert à tracer des cercles.\nPour vérifier un angle droit, je pose le coin de l'équerre dessus.\n⛔ Le piège : choisir la règle parce qu'elle trace droit. « Droit » dans « angle droit » parle du coin.\nRéponse : B.",
          micros: ["ce1_angle_droit"],
          reponses: [{ attendu: ["B", "l'équerre", "équerre", "une équerre"] }],
        },
        {
          enonce: "Dans le coin de ce rectangle, il y a un petit carré rouge.\nQue veut-il dire ?\nA) un angle droit   B) un côté de 1 cm   C) le milieu",
          figure: dessin({
            l: 9,
            h: 5,
            max: "max-w-[14rem] print:max-w-[10rem]",
            label: "Un rectangle avec un petit carré rouge dans un coin",
            formes: [{ t: "poly", pts: [[1, 1], [8, 1], [8, 4.5], [1, 4.5]], fill: BLEU_CLAIR, c: BLEU }, { t: "droit", en: [1, 4.5], u: [1, 0], v: [0, -1] }],
          }),
          correction:
            "Ce petit carré est un code. Il ne se mesure pas.\nIl dit : « ici, l'angle est droit ».\nJe pourrais le vérifier avec l'équerre.\n⛔ Le piège : croire qu'il montre un petit carré de 1 cm. C'est un signe, comme un panneau.\nRéponse : A.",
          micros: ["ce1_angle_droit_code"],
          reponses: [{ attendu: ["A", "A) un angle droit", "un angle droit", "angle droit"] }],
        },
        {
          enonce: "Je trace ce cercle avec un compas.\nOù je pique la pointe ?\nA) au point O   B) au point M   C) n'importe où",
          figure: dessin({
            l: 7,
            h: 7,
            max: "max-w-[11rem] print:max-w-[8rem]",
            label: "Un cercle, un point O au centre et un point M sur le cercle",
            formes: [{ t: "cercle", en: [3.5, 3.5], r: 2.6, c: VIOLET, w: 2.5 }, pt([3.5, 3.5], "O", "b"), pt([6.1, 3.5], "M", "d")],
          }),
          correction:
            "Le cercle tourne autour d'un seul point : son centre, O.\nJe pique la pointe du compas en O.\nLa mine tourne et trace le cercle, en passant par M.\n⛔ Le piège : piquer sur le trait, en M. M est un point du cercle, pas son centre.\nRéponse : A.",
          micros: ["ce1_figure_compas"],
          reponses: [{ attendu: ["A", "A) au point O", "O", "au point O", "au centre"] }],
        },
        {
          enonce: "Un seul triangle a un angle droit.\nLequel : A, B ou C ?",
          figure: dessin({
            l: 14,
            h: 6,
            grille: true,
            label: "Trois triangles A, B et C sur un quadrillage",
            formes: [
              { t: "poly", pts: [[0.5, 4], [4, 4], [2, 1]], fill: ORANGE_CLAIR, c: ORANGE },
              { t: "texte", en: [2.2, 5.2], txt: "A", taille: 17 },
              { t: "poly", pts: [[5, 1], [5, 4], [8.5, 4]], fill: BLEU_CLAIR, c: BLEU },
              { t: "texte", en: [6.7, 5.2], txt: "B", taille: 17 },
              { t: "poly", pts: [[9.5, 4], [12, 4], [13.5, 1]], fill: VERT_CLAIR, c: VERT },
              { t: "texte", en: [11.5, 5.2], txt: "C", taille: 17 },
            ],
          }),
          correction:
            "Je pose le coin de l'équerre dans chaque coin des triangles.\nA : ses trois coins sont plus fermés que l'équerre. Pas d'angle droit.\nB : en bas à gauche, il suit les lignes du quadrillage. L'équerre colle : angle droit.\nC : un coin est trop ouvert, les autres trop fermés.\nB est un triangle rectangle.\n⛔ Le piège : choisir A parce qu'il est « bien droit », posé à plat. Je regarde les coins.\nRéponse : B.",
          micros: ["ce1_figure_triangle_rectangle"],
          reponses: [{ attendu: ["B", "le triangle B"] }],
        },
        {
          enonce: "Vrai ou faux ?\na) Un carré a 4 côtés de même longueur.\nb) Un rectangle a 4 angles droits.\nc) Un triangle a 4 sommets.",
          correction:
            "Je relis le rappel.\na) Les 4 côtés du carré sont égaux. Vrai.\nb) Les 4 coins du rectangle sont des angles droits. Vrai.\nc) Le triangle a 3 côtés et 3 sommets, pas 4. Faux.\n⛔ Le piège : c) confondre le triangle et le carré. « Tri » veut dire trois.\nRéponse : a) vrai ; b) vrai ; c) faux.",
          micros: ["ce1_figure_proprietes"],
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["faux", "non"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je regarde la figure, puis je raisonne.",
      rappel: [
        "Une figure penchée garde son nom. Ce sont ses côtés et ses angles qui le disent.",
        "Dans un rectangle, les côtés qui se font face ont la même longueur.",
        "Le compas garde le même écartement. Tous les points du cercle sont à la même distance du centre.",
      ],
      exercices: [
        {
          enonce: "Les deux figures sont penchées.\nLes petits carrés rouges codent des angles droits.\na) Quel est le nom de la figure 1 ?\nb) Quel est le nom de la figure 2 ?",
          figure: dessin({
            l: 13,
            h: 6.6,
            label: "Deux figures penchées, numérotées 1 et 2",
            formes: [
              { t: "poly", pts: [[3, 0.5], [5.5, 3], [3, 5.5], [0.5, 3]], fill: BLEU_CLAIR, c: BLEU },
              { t: "droit", en: [3, 5.5], u: [1, -1], v: [-1, -1] },
              { t: "droit", en: [0.5, 3], u: [1, 1], v: [1, -1] },
              { t: "code", de: [3, 0.5], vers: [5.5, 3], n: 1 },
              { t: "code", de: [5.5, 3], vers: [3, 5.5], n: 1 },
              { t: "code", de: [3, 5.5], vers: [0.5, 3], n: 1 },
              { t: "code", de: [0.5, 3], vers: [3, 0.5], n: 1 },
              { t: "texte", en: [3, 6.3], txt: "1" },
              { t: "poly", pts: [[8, 1], [12, 3], [11, 5], [7, 3]], fill: ORANGE_CLAIR, c: ORANGE },
              { t: "droit", en: [11, 5], u: [-1, -0.5], v: [0.5, -1] },
              { t: "droit", en: [7, 3], u: [1, 0.5], v: [0.5, -1] },
              { t: "texte", en: [9.5, 6.3], txt: "2" },
            ],
          }),
          correction:
            "Je ne regarde pas la position. Je regarde les côtés et les angles.\na) La figure 1 a 4 côtés égaux (les petits traits) et des angles droits. C'est un carré, posé sur sa pointe.\nb) La figure 2 a des angles droits. Ses côtés ne sont pas tous égaux. C'est un rectangle penché.\n⛔ Le piège : a) dire « ce n'est pas un carré », car il est sur sa pointe. Un carré penché reste un carré.\nRéponse : a) carré ; b) rectangle.",
          micros: ["ce1_figure_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["carré", "un carré", "le carré"] },
            { question: "b)", attendu: ["rectangle", "un rectangle", "le rectangle"] },
          ],
        },
        {
          enonce: "Ce rectangle mesure 7 cm de long et 4 cm de large.\na) Combien mesure le côté du haut ?\nb) Combien mesure le côté de droite ?",
          figure: dessin({
            l: 10,
            h: 6,
            max: "max-w-[16rem] print:max-w-[11rem]",
            label: "Un rectangle : 7 cm en bas, 4 cm à gauche, deux côtés marqués d'un point d'interrogation",
            formes: [
              { t: "poly", pts: [[1.5, 1], [8.5, 1], [8.5, 5], [1.5, 5]], fill: BLEU_CLAIR, c: BLEU },
              { t: "texte", en: [5, 5.6], txt: "7 cm", c: BLEU },
              { t: "texte", en: [0.6, 3], txt: "4 cm", c: BLEU },
              { t: "texte", en: [5, 0.4], txt: "?", c: ORANGE },
              { t: "texte", en: [9.3, 3], txt: "?", c: ORANGE },
            ],
          }),
          correction:
            "Dans un rectangle, les côtés qui se font face sont égaux.\na) Le côté du haut fait face au côté du bas. Il mesure 7 cm.\nb) Le côté de droite fait face au côté de gauche. Il mesure 4 cm.\n⛔ Le piège : mesurer à l'œil sur le dessin. Le dessin n'est pas en vrais centimètres : j'utilise la règle du rectangle.\nRéponse : a) 7 ; b) 4.",
          micros: ["ce1_figure_proprietes"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"], unite: "cm" },
            { question: "b)", attendu: ["4", "quatre"], unite: "cm" },
          ],
        },
        {
          enonce: "Un côté de ce carré mesure 5 cm.\na) Combien mesure chacun des autres côtés ?\nb) Je fais tout le tour du carré. Combien de centimètres ?",
          figure: dessin({
            l: 7,
            h: 7,
            max: "max-w-[11rem] print:max-w-[8rem]",
            label: "Un carré dont un côté mesure 5 cm",
            formes: [{ t: "poly", pts: [[1.5, 1], [6, 1], [6, 5.5], [1.5, 5.5]], fill: VERT_CLAIR, c: VERT }, { t: "texte", en: [3.75, 6.2], txt: "5 cm", c: VERT }],
          }),
          correction:
            "a) Les 4 côtés d'un carré sont égaux. Chaque côté mesure 5 cm.\nb) Je fais le tour : 4 côtés de 5 cm.\n5 + 5 + 5 + 5 = 20.\n⛔ Le piège : b) compter seulement 3 côtés, 15 cm. Je n'oublie pas le côté par où je reviens.\nRéponse : a) 5 ; b) 20.",
          micros: ["ce1_figure_proprietes"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"], unite: "cm" },
            { question: "b)", attendu: ["20", "vingt"], unite: "cm" },
          ],
        },
        {
          enonce: "Devinettes. Qui suis-je ?\na) J'ai 4 angles droits. Mes côtés ne sont pas tous égaux.\nb) J'ai 3 côtés et un angle droit.",
          correction:
            "a) 4 angles droits : je suis un carré ou un rectangle. Mes côtés ne sont pas tous égaux : pas un carré. Je suis un rectangle.\nb) 3 côtés : je suis un triangle. Avec un angle droit : un triangle rectangle.\n⛔ Le piège : b) répondre « rectangle ». Un rectangle a 4 côtés. Ici, c'est un triangle qui a un angle droit.\nRéponse : a) rectangle ; b) triangle rectangle.",
          micros: ["ce1_figure_decrire", "ce1_figure_triangle_rectangle"],
          reponses: [
            { question: "a)", attendu: ["rectangle", "un rectangle", "le rectangle"] },
            { question: "b)", attendu: ["triangle rectangle", "un triangle rectangle", "le triangle rectangle"] },
          ],
        },
        {
          enonce: "Regarde les 4 coins de cette figure.\na) Combien d'angles droits ?\nb) Combien d'angles aigus ?\nc) Combien d'angles obtus ?",
          figure: dessin({
            l: 9,
            h: 6,
            grille: true,
            max: "max-w-[15rem] print:max-w-[10rem]",
            label: "Une figure à 4 côtés sur un quadrillage",
            formes: [{ t: "poly", pts: [[1, 5], [8, 5], [5, 1], [1, 1]], fill: ORANGE_CLAIR, c: ORANGE, w: 2.5 }],
          }),
          correction:
            "Je pose le coin de l'équerre dans chaque coin.\nÀ gauche, en haut et en bas : les côtés suivent les lignes du quadrillage. Ce sont 2 angles droits.\nEn bas à droite : le coin est plus fermé que l'équerre. 1 angle aigu.\nEn haut à droite : le coin est plus ouvert. 1 angle obtus.\nJe vérifie : 2 + 1 + 1 = 4 coins.\n⛔ Le piège : compter à l'œil. Sans l'équerre, l'angle obtus semble presque droit.\nRéponse : a) 2 ; b) 1 ; c) 1.",
          micros: ["ce1_angle_droit", "ce1_angle_aigu_obtus"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["1", "un"] },
            { question: "c)", attendu: ["1", "un"] },
          ],
        },
        {
          enonce: "Je code tous les angles droits avec un petit carré.\na) Combien de petits carrés pour un rectangle ?\nb) Combien pour un triangle rectangle ?",
          figure: dessin({
            l: 12,
            h: 5,
            max: "max-w-[18rem] print:max-w-[12rem]",
            label: "Un rectangle et un triangle rectangle, sans code",
            formes: [
              { t: "poly", pts: [[0.6, 1], [6, 1], [6, 4.4], [0.6, 4.4]], fill: BLEU_CLAIR, c: BLEU },
              { t: "poly", pts: [[7.4, 1], [7.4, 4.4], [11.4, 4.4]], fill: VERT_CLAIR, c: VERT },
            ],
          }),
          correction:
            "Un petit carré par angle droit.\na) Le rectangle a 4 angles droits : 4 petits carrés.\nb) Le triangle rectangle a un seul angle droit : 1 petit carré. Ses deux autres angles sont aigus.\n⛔ Le piège : a) coder un seul coin du rectangle. Ses 4 coins sont droits.\nRéponse : a) 4 ; b) 1.",
          micros: ["ce1_angle_droit_code"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["1", "un"] },
          ],
        },
        {
          enonce: "J'écarte mon compas de 3 cm. Je pique en O et je trace le cercle.\na) M est sur le cercle. Combien mesure OM ?\nb) P est à 5 cm de O. P est-il sur le cercle ?",
          figure: dessin({
            l: 8,
            h: 7,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Un cercle de centre O et un point M sur le cercle",
            formes: [{ t: "cercle", en: [4, 3.5], r: 2.6, c: VIOLET, w: 2.5 }, pt([4, 3.5], "O", "b"), pt([5.84, 1.66], "M", "hd")],
          }),
          correction:
            "Le compas garde son écartement de 3 cm pendant tout le tracé.\na) Chaque point du cercle est donc à 3 cm de O. OM = 3 cm.\nb) P est à 5 cm, pas à 3 cm. Il est en dehors du cercle : non.\n⛔ Le piège : a) croire que OM change selon où est M. Tous les points du cercle sont à la même distance de O.\nRéponse : a) 3 ; b) non.",
          micros: ["ce1_figure_compas"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"], unite: "cm" },
            { question: "b)", attendu: ["non", "faux"] },
          ],
        },
        {
          enonce: "Zoé a commencé un rectangle ABCD sur le quadrillage.\na) Le côté CD fait face à AB. Combien de carreaux mesure-t-il ?\nb) Le côté DA fait face à BC. Combien de carreaux ?",
          figure: dessin({
            l: 8,
            h: 6,
            grille: true,
            max: "max-w-[14rem] print:max-w-[10rem]",
            label: "Deux côtés d'un rectangle tracés sur un quadrillage : AB et BC",
            formes: [{ t: "poly", pts: [[1, 5], [6, 5], [6, 2]], ouvert: true, c: BLEU, w: 3 }, pt([1, 5], "A", "bg"), pt([6, 5], "B", "bd"), pt([6, 2], "C", "hd")],
          }),
          schema: ecranSeulement(
            dessin({
              l: 8,
              h: 6,
              grille: true,
              max: "max-w-[14rem] print:max-w-[10rem]",
              label: "Le rectangle ABCD fini",
              formes: [{ t: "poly", pts: [[1, 5], [6, 5], [6, 2], [1, 2]], c: BLEU, w: 3 }, { t: "poly", pts: [[6, 2], [1, 2], [1, 5]], ouvert: true, c: ORANGE, w: 3 }, pt([1, 5], "A", "bg"), pt([6, 5], "B", "bd"), pt([6, 2], "C", "hd"), pt([1, 2], "D", "hg", ORANGE)],
            }),
          ),
          correction:
            "Je compte les carreaux des côtés déjà tracés.\nAB va de A à B : 5 carreaux. BC monte de B à C : 3 carreaux.\na) CD fait face à AB : il mesure aussi 5 carreaux.\nb) DA fait face à BC : il mesure aussi 3 carreaux.\nJe place D 5 carreaux à gauche de C, et je trace.\n⛔ Le piège : tracer CD plus court, à l'œil. Je compte les carreaux, un par un.\nRéponse : a) 5 ; b) 3.",
          micros: ["ce1_figure_construire"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je dessine pour m'aider.",
      rappel: [
        "Le carré : 4 côtés égaux, 4 angles droits.",
        "Le compas trace tous les points à la même distance du centre.",
        "Je relis la question avant de répondre.",
      ],
      exercices: [
        {
          titre: "Le carrelage de la carreleuse",
          enonce: "Une carreleuse pose des carreaux carrés de 10 cm de côté.\nElle fait un grand carré de 3 carreaux sur 3.\na) Combien de carreaux pose-t-elle ?\nb) Combien mesure le côté du grand carré ?\nc) Combien d'angles droits a le grand carré ?",
          figure: dessin({
            l: 6,
            h: 5,
            max: "max-w-[10rem] print:max-w-[8rem]",
            label: "Un carreau carré de 10 cm",
            formes: [{ t: "poly", pts: [[1.5, 1], [4.5, 1], [4.5, 4], [1.5, 4]], fill: "#fde68a", c: "#a16207" }, { t: "texte", en: [3, 4.6], txt: "10 cm", c: "#a16207" }],
          }),
          correction:
            "a) 3 rangées de 3 carreaux : 3 + 3 + 3 = 9 carreaux.\nb) Sur un côté, il y a 3 carreaux de 10 cm : 10 + 10 + 10 = 30 cm.\nc) Le grand carré est un carré : il a 4 angles droits.\n⛔ Le piège : a) compter 3 + 3 = 6, seulement les bords. Le carreau du milieu compte aussi.\nRéponse : a) 9 ; b) 30 ; c) 4.",
          micros: ["ce1_figure_proprietes", "ce1_figure_defi"],
          reponses: [
            { question: "a)", attendu: ["9", "neuf"] },
            { question: "b)", attendu: "30", unite: "cm" },
            { question: "c)", attendu: ["4", "quatre"] },
          ],
        },
        {
          titre: "Le massif du jardinier",
          enonce: "Un jardinier plante un piquet. Il attache une corde de 2 m.\nIl tourne autour, la corde bien tendue, et trace un rond.\na) Quel instrument imite-t-il ?\nb) Une rose est à 2 m du piquet. Est-elle sur le bord ?\nc) Un arbre est à 3 m du piquet. Est-il dedans ou dehors ?",
          figure: dessin({
            l: 8,
            h: 7,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Un piquet et une corde tendue",
            formes: [{ t: "seg", de: [4, 3.5], vers: [6.6, 3.5], c: VERT, w: 2.5 }, { t: "cercle", en: [4, 3.5], r: 0.2, fill: "#a16207", c: "#713f12" }, { t: "texte", en: [5.3, 2.9], txt: "2 m", c: VERT }],
          }),
          correction:
            "a) Le piquet est la pointe, la corde tendue est l'écartement. Il fait comme un compas.\nb) Le bord du rond est à 2 m du piquet partout. La rose, à 2 m, est sur le bord : oui.\nc) 3 m, c'est plus loin que 2 m. L'arbre est dehors.\n⛔ Le piège : c) dire « dedans » parce que 3 est proche de 2. Plus loin que la corde, c'est dehors.\nRéponse : a) compas ; b) oui ; c) dehors.",
          micros: ["ce1_figure_compas", "ce1_figure_defi"],
          reponses: [
            { question: "a)", attendu: ["compas", "un compas", "le compas"] },
            { question: "b)", attendu: ["oui", "vrai"] },
            { question: "c)", attendu: ["dehors", "en dehors"] },
          ],
        },
        {
          titre: "Le gâteau du pâtissier",
          enonce: "Un pâtissier a un gâteau rectangulaire.\nIl le coupe d'un coin au coin opposé, bien droit.\na) Combien de morceaux obtient-il ?\nb) Quelle est la forme de chaque morceau ?\nc) Combien d'angles droits a chaque morceau ?",
          figure: dessin({
            l: 10,
            h: 6,
            max: "max-w-[15rem] print:max-w-[11rem]",
            label: "Un gâteau rectangulaire vu de dessus",
            formes: [{ t: "poly", pts: [[1, 1], [9, 1], [9, 5], [1, 5]], fill: "#fbcfe8", c: "#be185d", w: 2.5 }],
          }),
          schema: ecranSeulement(
            dessin({
              l: 10,
              h: 6,
              max: "max-w-[15rem] print:max-w-[11rem]",
              label: "Le gâteau coupé en deux triangles",
              formes: [
                { t: "poly", pts: [[1, 1], [9, 1], [9, 5], [1, 5]], fill: "#fbcfe8", c: "#be185d", w: 2.5 },
                { t: "seg", de: [1, 1], vers: [9, 5], c: ENCRE, w: 2.5, pt: true },
                { t: "droit", en: [9, 1], u: [-1, 0], v: [0, 1] },
                { t: "droit", en: [1, 5], u: [1, 0], v: [0, -1] },
              ],
            }),
          ),
          correction:
            "a) Un seul coup de couteau, d'un coin à l'autre : 2 morceaux.\nb) Chaque morceau a 3 côtés : ce sont des triangles.\nc) Chaque morceau garde un coin du gâteau. Ce coin était un angle droit : 1 angle droit par morceau.\nChaque morceau est un triangle rectangle.\n⛔ Le piège : c) répondre 0. Le coin du rectangle n'a pas été coupé : il reste droit.\nRéponse : a) 2 ; b) triangle ; c) 1.",
          micros: ["ce1_figure_triangle_rectangle", "ce1_figure_defi"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["triangle", "un triangle", "des triangles", "triangle rectangle", "triangles rectangles"] },
            { question: "c)", attendu: ["1", "un"] },
          ],
        },
        {
          titre: "La fenêtre du menuisier",
          enonce: "Un menuisier fabrique cette fenêtre carrée.\na) Combien de petits carrés vois-tu ?\nb) Combien de carrés en tout, en comptant le grand ?",
          figure: dessin({
            l: 7,
            h: 7,
            max: "max-w-[11rem] print:max-w-[8rem]",
            label: "Une fenêtre carrée partagée en quatre carreaux",
            formes: [
              { t: "poly", pts: [[1, 1], [6, 1], [6, 6], [1, 6]], fill: "#e0f2fe", c: "#a16207", w: 3.5 },
              { t: "seg", de: [3.5, 1], vers: [3.5, 6], c: "#a16207", w: 3 },
              { t: "seg", de: [1, 3.5], vers: [6, 3.5], c: "#a16207", w: 3 },
            ],
          }),
          correction:
            "a) Je compte les petits carreaux : 2 en haut, 2 en bas. 2 + 2 = 4 petits carrés.\nb) Le tour de la fenêtre forme aussi un carré : le grand.\n4 + 1 = 5 carrés.\n⛔ Le piège : b) répondre 4. Le grand carré, qui les contient tous, compte aussi.\nRéponse : a) 4 ; b) 5.",
          micros: ["ce1_figure_reconnaitre", "ce1_figure_defi"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
      ],
    },
  ],
};
