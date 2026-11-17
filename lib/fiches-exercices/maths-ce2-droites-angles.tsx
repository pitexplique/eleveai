// ─── Fiche d'exercices : droites, angles droits et codages (CE2) — 20 exercices ─
//
// 17/11/2026 : la feuille interactive de la notion `droites_angles` du coach
// CE2 (6 micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque
// `lib/tutor-v4/questionBank/ce2/maths/droites-angles.bank.ts` : points
// alignés vérifiés à la règle, droite et segment, angle droit reconnu à
// l'équerre, le CODAGE (petit carré de l'angle droit, petits traits des
// segments de même longueur), deux côtés perpendiculaires dans une figure.
// ⛔ LIMITES DU CE2 (BO n° 41 du 31/10/2024) : pas de parallèles, pas de mesure
// d'angle en degrés ; l'équerre décide, ou le codage l'affirme. Des longueurs
// entières. Aucune construction à rendre : un tracé devient un QCM, un ordre
// d'étapes ou une lecture.
// ⛔ Aucune question à rédiger : QCM par lettre, oui ou non, un nombre, un mot,
// le nom d'un côté (« AD »). Phrases de 18 mots au plus.
//
// LE PIÈGE DE LA NOTION (celui de la banque) : croire ses yeux. Trois points
// qui SEMBLENT alignés, un coin qui A L'AIR droit : la règle et l'équerre
// tranchent. Et son revers : quand le codage est là, il n'y a plus rien à
// vérifier ; quand il manque, on ne sait pas encore.
//
// Les pièges nommés : la droite prise pour un segment (1), l'alignement à
// l'œil (2, 14), l'angle penché cru « pas droit » (3, 6), le petit carré pris
// pour un carré ou une mesure (4), le côté voisin pris pour le côté de même
// code (5, 9), revérifier un angle codé (7), le toit pointu oublié (8),
// tracer avant de placer l'équerre (10), le côté le plus long cru
// perpendiculaire (11), additionner seulement deux côtés (12, 18), « penché =
// pas perpendiculaire » (13), « pas de codage = pas droit » (15), oublier les
// segments qui sautent un point (16), compter les angles de la fenêtre au lieu
// des vitres (17), l'étagère qui « a l'air » droite (19), oublier un côté du
// cerf-volant (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : école (1 à 16), vitrerie (17), sport (18),
// menuiserie (19), jeu de plein air (20). Métiers : vitrier (17), menuisière
// (19). Aucun contexte réunionnais sur cette feuille.
//
// ⭐ FAITS RÉELS : aucun. Les longueurs sont des MODÈLES.
//
// ⭐ LES DESSINS : `dessin` (repère en carreaux, y vers le bas, de
// `dessins-geometrie-cm1.tsx`) : points, segments, petit carré rouge (`droit`),
// petits traits de codage (`code`). Le dessin montre la question, jamais la
// réponse : l'angle qu'on demande de reconnaître n'a pas de petit carré.
//
// Micro-compétences : ce2_droite_alignement (1, 2, 14, 16),
// ce2_angle_droit (3, 8, 10, 17), ce2_angle_droit_codage (4, 7, 9, 11, 15,
// 20), ce2_segments_codage (5, 7, 9, 12, 18, 20), ce2_droite_perpendiculaire
// (6, 11, 13, 19, 20), ce2_droite_defi (17, 18, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ENCRE, ORANGE, ROUGE, VERT, VIOLET, dessin, type Forme, type P } from "@/lib/fiches-exercices/dessins-geometrie-cm1";

type Vers = "h" | "b" | "g" | "d" | "hg" | "hd" | "bg" | "bd";

/** Un point (croix) et son nom. */
const pt = (en: P, nom: string, vers: Vers = "h", c = ENCRE): Forme => ({ t: "point", en, nom, vers, c });

/** Un polygone fermé et ses sommets nommés. */
const figure = (pts: P[], noms: string[], vers: Vers[], c = BLEU): Forme[] => [
  { t: "poly", pts, c, w: 2.5 },
  ...pts.map((p, k) => pt(p, noms[k], vers[k])),
];

/** Le cerf-volant ABCD : AB = AD, CB = CD. */
const KITE: P[] = [[4, 0.6], [7, 3], [4, 7.6], [1, 3]];

/** Le cerf-volant codé (exercices 5 et 12). */
const cerfVolant = (avecMesures: boolean) =>
  dessin({
    l: 9,
    h: 8.4,
    max: "max-w-[14rem] print:max-w-[10rem]",
    label: "Un quadrilatère ABCD en forme de cerf-volant, côtés codés",
    formes: [
      ...figure(KITE, ["A", "B", "C", "D"], ["h", "d", "b", "g"]),
      { t: "code", de: KITE[0], vers: KITE[1], n: 1 },
      { t: "code", de: KITE[0], vers: KITE[3], n: 1 },
      { t: "code", de: KITE[1], vers: KITE[2], n: 2 },
      { t: "code", de: KITE[2], vers: KITE[3], n: 2 },
      ...(avecMesures
        ? ([
            { t: "texte", en: [6.6, 1.3], txt: "3 cm", c: ORANGE },
            { t: "texte", en: [1.3, 5.9], txt: "5 cm", c: ORANGE },
          ] as Forme[])
        : []),
    ],
  });

/** Le rectangle ABCD entièrement codé (exercices 9 et 18). */
const rectangleCode = (mesures?: [string, string]) => {
  const R: P[] = [[1, 1], [9, 1], [9, 5.5], [1, 5.5]];
  return dessin({
    l: 11,
    h: 6.5,
    label: "Un rectangle ABCD : petits carrés aux quatre coins, côtés codés",
    formes: [
      ...figure(R, ["A", "B", "C", "D"], ["hg", "hd", "bd", "bg"]),
      { t: "droit", en: R[0], u: [1, 0], v: [0, 1] },
      { t: "droit", en: R[1], u: [-1, 0], v: [0, 1] },
      { t: "droit", en: R[2], u: [-1, 0], v: [0, -1] },
      { t: "droit", en: R[3], u: [1, 0], v: [0, -1] },
      { t: "code", de: R[0], vers: R[1], n: 1 },
      { t: "code", de: R[3], vers: R[2], n: 1 },
      { t: "code", de: R[1], vers: R[2], n: 2 },
      { t: "code", de: R[0], vers: R[3], n: 2 },
      ...(mesures
        ? ([
            { t: "texte", en: [5, 0.35], txt: mesures[0], c: ORANGE },
            { t: "texte", en: [9.55, 3.25], txt: mesures[1], c: ORANGE, ancre: "start" },
          ] as Forme[])
        : []),
    ],
  });
};

export const exercicesDroitesAnglesCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "droites-angles",
  titre: "Droites, angles droits et codages",
  accroche:
    "Vingt exercices, du geste seul au problème. Vérifier des points alignés avec la règle. Trouver un angle droit avec l'équerre. Lire le petit carré et les petits traits du codage. Trouver deux côtés perpendiculaires. Un vitrier, une menuisière, un terrain de sport et un cerf-volant. Un rappel avant chaque niveau. Cherche d'abord avec ta règle et ton équerre. Puis ouvre la correction : étape par étape, avec le piège.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je vérifie avec la règle ou l'équerre, pas seulement avec mes yeux.",
      rappel: [
        "Des points alignés sont sur une même ligne droite. Je le vérifie avec la règle.",
        "Un angle droit a la forme du coin de l'équerre. Je pose l'équerre pour le vérifier.",
        "Le codage : un petit carré veut dire « angle droit ». Les mêmes petits traits veulent dire « même longueur ».",
      ],
      exercices: [
        {
          enonce: "Regarde les traits 1, 2 et 3.\nÉcris « segment » ou « droite ».\na) le trait 1\nb) le trait 2\nc) le trait 3",
          figure: dessin({
            l: 13,
            h: 6,
            label: "Trois traits numérotés 1, 2 et 3",
            formes: [
              { t: "texte", en: [0.3, 1], txt: "1" },
              { t: "seg", de: [1, 1], vers: [13, 1], c: BLEU, w: 3 },
              pt([5, 1], "", "h", BLEU),
              pt([9, 1], "", "h", BLEU),
              { t: "texte", en: [0.3, 3], txt: "2" },
              { t: "seg", de: [3, 3.6], vers: [10, 2.6], c: ORANGE, w: 3 },
              pt([3, 3.6], "", "h", ORANGE),
              pt([10, 2.6], "", "h", ORANGE),
              { t: "texte", en: [0.3, 5], txt: "3" },
              { t: "seg", de: [2, 5], vers: [6, 5], c: VERT, w: 3 },
              pt([2, 5], "", "h", VERT),
              pt([6, 5], "", "h", VERT),
            ],
          }),
          correction:
            "Je regarde les bouts de chaque trait.\na) Le trait 1 traverse tout le dessin. Il continue des deux côtés, sans s'arrêter : c'est une droite.\nb) Le trait 2 penche, mais il s'arrête à deux croix. C'est un segment.\nc) Le trait 3 s'arrête à deux croix. C'est un segment.\n⛔ Le piège du a) : dire « segment » parce qu'il y a deux croix dessus. Ces croix sont des points de la droite, pas ses bouts.\nRéponse : a) droite ; b) segment ; c) segment.",
          micros: ["ce2_droite_alignement"],
          reponses: [
            { question: "a)", attendu: ["droite", "une droite"] },
            { question: "b)", attendu: ["segment", "un segment"] },
            { question: "c)", attendu: ["segment", "un segment"] },
          ],
        },
        {
          enonce: "Pose ta règle sur les points.\na) A, B et C sont-ils alignés ?\nb) D, E et F sont-ils alignés ?\nÉcris oui ou non.",
          figure: dessin({
            l: 13,
            h: 6,
            label: "Six points nommés A, B, C, D, E et F",
            formes: [pt([1, 5], "A", "b"), pt([4, 4], "B", "b"), pt([7, 3], "C", "b"), pt([8, 5], "D", "b"), pt([10, 3.5], "E", "b"), pt([12, 1], "F", "h")],
          }),
          correction:
            "Je pose le bord de ma règle sur deux points, puis je regarde le troisième.\na) La règle touche A et C. Elle passe aussi exactement sur B. Ils sont alignés : oui.\nb) La règle touche D et F. Elle passe au-dessus de E, sans le toucher. Ils ne sont pas alignés : non.\n⛔ Le piège : dire « oui » au b), parce que E est presque sur la ligne. Presque ne suffit pas : c'est la règle qui décide.\nRéponse : a) oui ; b) non.",
          micros: ["ce2_droite_alignement"],
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["non", "faux"] },
          ],
        },
        {
          enonce: "Pose le coin de ton équerre sur chaque angle.\nL'angle est-il droit ? Écris oui ou non.\na) angle 1\nb) angle 2\nc) angle 3\nd) angle 4",
          figure: dessin({
            l: 18,
            h: 5.6,
            label: "Quatre angles numérotés de 1 à 4",
            formes: [
              { t: "seg", de: [0.6, 4.3], vers: [3.6, 4.3], c: BLEU, w: 3 },
              { t: "seg", de: [0.6, 4.3], vers: [0.6, 1.1], c: BLEU, w: 3 },
              { t: "texte", en: [2.2, 5.2], txt: "1" },
              { t: "seg", de: [4.8, 4.3], vers: [7.8, 4.3], c: ORANGE, w: 3 },
              { t: "seg", de: [4.8, 4.3], vers: [5.9, 1.2], c: ORANGE, w: 3 },
              { t: "texte", en: [6.3, 5.2], txt: "2" },
              { t: "seg", de: [9.8, 4.3], vers: [12.2, 3.1], c: VERT, w: 3 },
              { t: "seg", de: [9.8, 4.3], vers: [8.6, 1.9], c: VERT, w: 3 },
              { t: "texte", en: [10.4, 5.2], txt: "3" },
              { t: "seg", de: [14.5, 4.3], vers: [17.5, 4.3], c: VIOLET, w: 3 },
              { t: "seg", de: [14.5, 4.3], vers: [13.3, 1.5], c: VIOLET, w: 3 },
              { t: "texte", en: [15.5, 5.2], txt: "4" },
            ],
          }),
          correction:
            "Je pose le coin de l'équerre sur le sommet, un bord sur un côté de l'angle.\na) L'angle 1 colle exactement au coin de l'équerre : oui.\nb) L'angle 2 est plus fermé que le coin de l'équerre : non.\nc) L'angle 3 est penché, mais il colle exactement au coin de l'équerre : oui.\nd) L'angle 4 est plus ouvert que le coin de l'équerre : non.\n⛔ Le piège du c) : dire « non » parce que l'angle est penché. Un angle droit peut être tourné dans tous les sens.\nRéponse : a) oui ; b) non ; c) oui ; d) non.",
          micros: ["ce2_angle_droit"],
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["oui", "vrai"] },
            { question: "d)", attendu: ["non", "faux"] },
          ],
        },
        {
          enonce: "Regarde les petits carrés rouges sur la figure.\na) Que veut dire un petit carré rouge ?\nA) l'angle est droit   B) il y a un carré   C) le côté mesure 1 cm\nb) Combien d'angles sont codés droits ?",
          figure: dessin({
            l: 9,
            h: 6,
            label: "Un quadrilatère ABCD avec deux petits carrés rouges",
            formes: [
              ...figure([[1, 1], [8, 1], [6.5, 5], [1, 5]], ["A", "B", "C", "D"], ["hg", "hd", "bd", "bg"]),
              { t: "droit", en: [1, 1], u: [1, 0], v: [0, 1] },
              { t: "droit", en: [1, 5], u: [1, 0], v: [0, -1] },
            ],
          }),
          correction:
            "a) Le petit carré est un codage. Il dit : « cet angle est droit ». Réponse A.\nb) Je compte les petits carrés : un en A, un en D. Il y a 2 angles codés droits.\nLes angles en B et en C n'ont pas de petit carré.\n⛔ Le piège : croire que le petit carré est une figure à compter, ou une mesure. C'est un message : « angle droit ».\nRéponse : a) A ; b) 2.",
          micros: ["ce2_angle_droit_codage"],
          reponses: [
            { question: "a)", attendu: ["A", "A) l'angle est droit"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Les petits traits rouges sont un codage.\na) Quel côté a la même longueur que AB ?\nb) Quel côté a la même longueur que BC ?",
          figure: cerfVolant(false),
          correction:
            "Les mêmes petits traits veulent dire : même longueur.\na) AB a un petit trait. Le seul autre côté avec un petit trait est AD. Donc AB et AD ont la même longueur.\nb) BC a deux petits traits. CD aussi. Donc BC et CD ont la même longueur.\n⛔ Le piège : répondre BC au a), parce que BC touche AB. Ce n'est pas le voisin qui compte, c'est le même codage.\nRéponse : a) AD ; b) CD.",
          micros: ["ce2_segments_codage"],
          reponses: [
            { question: "a)", attendu: ["AD", "DA"] },
            { question: "b)", attendu: ["CD", "DC"] },
          ],
        },
        {
          enonce: "Deux droites qui se coupent en faisant un angle droit sont perpendiculaires.\nCes droites sont-elles perpendiculaires ? Écris oui ou non.\na) paire 1\nb) paire 2\nc) paire 3",
          figure: dessin({
            l: 18,
            h: 6,
            label: "Trois paires de droites qui se coupent, numérotées 1, 2 et 3",
            formes: [
              { t: "seg", de: [0.5, 3], vers: [5.5, 3], c: BLEU, w: 3 },
              { t: "seg", de: [3, 0.5], vers: [3, 5.5], c: BLEU, w: 3 },
              { t: "texte", en: [0.8, 0.8], txt: "1" },
              { t: "seg", de: [6.8, 1.9], vers: [11.2, 4.1], c: ORANGE, w: 3 },
              { t: "seg", de: [10.1, 0.8], vers: [7.9, 5.2], c: ORANGE, w: 3 },
              { t: "texte", en: [7, 0.8], txt: "2" },
              { t: "seg", de: [12.5, 3], vers: [17.5, 3], c: VERT, w: 3 },
              { t: "seg", de: [13.6, 5.2], vers: [16.4, 0.8], c: VERT, w: 3 },
              { t: "texte", en: [13, 0.8], txt: "3" },
            ],
          }),
          correction:
            "Je pose le coin de l'équerre là où les deux droites se coupent.\na) Paire 1 : le coin de l'équerre colle exactement. Perpendiculaires : oui.\nb) Paire 2 : les droites sont penchées, mais le coin de l'équerre colle exactement. Oui.\nc) Paire 3 : l'angle est plus fermé que le coin de l'équerre. Non.\n⛔ Le piège du b) : dire « non » parce que les droites ne sont ni debout ni couchées. Seul l'angle droit compte.\nRéponse : a) oui ; b) oui ; c) non.",
          micros: ["ce2_droite_perpendiculaire"],
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["oui", "vrai"] },
            { question: "c)", attendu: ["non", "faux"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) Un petit carré dans un coin veut dire « angle droit ».\nb) Un angle codé droit doit encore être vérifié à l'équerre.\nc) Deux segments avec le même petit trait ont la même longueur.\nd) Un angle sans petit carré n'est jamais droit.",
          correction:
            "Je me rappelle à quoi sert un codage : il donne une information sûre.\na) Oui, c'est le codage de l'angle droit. Vrai.\nb) Le petit carré affirme déjà que l'angle est droit. Pas besoin de vérifier : faux.\nc) Oui, les mêmes petits traits veulent dire même longueur. Vrai.\nd) Sans codage, je ne sais pas encore. L'angle peut être droit : je vérifie à l'équerre. Faux.\n⛔ Le piège du d) : croire que « pas de petit carré » veut dire « pas droit ». Ça veut dire « pas encore dit ».\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["ce2_angle_droit_codage", "ce2_segments_codage"],
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["vrai", "oui"] },
            { question: "d)", attendu: ["faux", "non"] },
          ],
        },
        {
          enonce: "Voici une maison dessinée sur un quadrillage.\nAvec ton équerre, compte les angles droits de la maison.\nCombien y en a-t-il ?",
          figure: dessin({
            l: 8,
            h: 8,
            grille: true,
            max: "max-w-[13rem] print:max-w-[9rem]",
            label: "Une maison : un carré surmonté d'un toit pointu",
            formes: [{ t: "poly", pts: [[1, 7], [7, 7], [7, 4], [4, 1], [1, 4]], c: BLEU, w: 3, fill: "#dbeafe" }],
          }),
          correction:
            "Je pose l'équerre dans chaque coin, à l'intérieur de la maison. Il y a 5 coins.\nEn bas à gauche et en bas à droite : l'équerre colle. 2 angles droits.\nOù le mur rejoint le toit, à gauche et à droite : l'angle est plus ouvert. Pas droits.\nEn haut du toit : l'équerre colle exactement ! 1 angle droit de plus.\nEn tout : 2 + 1 = 3 angles droits.\n⛔ Le piège : oublier le haut du toit, parce qu'il a l'air pointu. Il faut le vérifier comme les autres.\nRéponse : 3.",
          micros: ["ce2_angle_droit"],
          reponses: [{ attendu: ["3", "trois"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je lis d'abord le codage, puis j'utilise mes outils pour le reste.",
      rappel: [
        "Codage : petit carré = angle droit ; mêmes petits traits = même longueur. Ce qui est codé est sûr.",
        "Ce qui n'est pas codé, je le vérifie avec la règle ou l'équerre.",
        "Deux côtés qui forment un angle droit sont perpendiculaires.",
      ],
      exercices: [
        {
          enonce: "Lis le codage du rectangle ABCD.\na) Combien d'angles droits sont codés ?\nb) Quel côté a la même longueur que AB ?\nc) Quel côté a la même longueur que BC ?",
          figure: rectangleCode(),
          correction:
            "a) Je compte les petits carrés : un en A, en B, en C et en D. 4 angles droits.\nb) AB a un petit trait. Le côté d'en face, CD, a aussi un petit trait. Même longueur.\nc) BC a deux petits traits. Le côté d'en face, DA, aussi. Même longueur.\n⛔ Le piège : répondre BC au b). BC touche AB, mais il n'a pas le même codage : deux traits, pas un.\nRéponse : a) 4 ; b) CD ; c) DA.",
          micros: ["ce2_angle_droit_codage", "ce2_segments_codage"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["CD", "DC"] },
            { question: "c)", attendu: ["DA", "AD"] },
          ],
        },
        {
          enonce: "Je veux tracer un angle droit au point A, sur une droite.\nRange les étapes dans l'ordre. Écris les lettres séparées par « ; ».\nA) Je trace un trait le long de l'autre bord de l'équerre.\nB) Je pose un bord de l'équerre sur la droite.\nC) Je fais glisser l'équerre pour mettre son coin sur A.",
          correction:
            "Je pense à mes gestes, dans l'ordre.\nD'abord, je pose un bord de l'équerre sur la droite : B.\nEnsuite, je fais glisser l'équerre jusqu'à ce que son coin soit sur A : C.\nEnfin, je trace le long de l'autre bord : A.\n⛔ Le piège : tracer en premier. Sans équerre bien placée, le trait n'a aucune raison d'être droit.\nRéponse : B ; C ; A.",
          micros: ["ce2_angle_droit"],
          reponses: [{ attendu: ["B ; C ; A", "B, C, A", "BCA"], ordre: true }],
        },
        {
          enonce: "Regarde le codage du triangle EFG.\na) En quel sommet est l'angle droit ?\nb) Quels côtés sont perpendiculaires ?\nA) EF et FG   B) EG et FG   C) EF et EG",
          figure: dessin({
            l: 7,
            h: 7,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Un triangle EFG penché, avec un petit carré rouge",
            formes: [
              ...figure([[2, 1], [1, 5], [5, 6]], ["E", "F", "G"], ["h", "bg", "bd"]),
              { t: "droit", en: [1, 5], u: [1, -4], v: [4, 1] },
            ],
          }),
          correction:
            "a) Le petit carré rouge est au sommet F. L'angle droit est en F.\nb) Les deux côtés de l'angle droit partent de F : ce sont EF et FG.\nIls forment un angle droit, donc ils sont perpendiculaires. Réponse A.\n⛔ Le piège : choisir EG, le côté le plus long. Il ne touche pas le petit carré : il est en face de l'angle droit.\nRéponse : a) F ; b) A.",
          micros: ["ce2_angle_droit_codage", "ce2_droite_perpendiculaire"],
          reponses: [
            { question: "a)", attendu: ["F", "en F", "le sommet F"] },
            { question: "b)", attendu: ["A", "A) EF et FG"] },
          ],
        },
        {
          enonce: "Le dessin n'est pas en vraie grandeur. Lis le codage.\na) Combien mesure AD, en cm ?\nb) Combien mesure BC, en cm ?\nc) Combien mesure le tour de la figure, en cm ?",
          figure: cerfVolant(true),
          correction:
            "a) AD a le même codage que AB : un petit trait. AB mesure 3 cm, donc AD mesure 3 cm.\nb) BC a le même codage que CD : deux petits traits. CD mesure 5 cm, donc BC mesure 5 cm.\nc) J'additionne les quatre côtés : 3 + 5 + 5 + 3 = 16 cm.\n⛔ Le piège du c) : additionner seulement les deux nombres écrits, 3 + 5 = 8. La figure a quatre côtés.\nRéponse : a) 3 ; b) 5 ; c) 16.",
          micros: ["ce2_segments_codage"],
          reponses: [
            { question: "a)", attendu: "3", unite: "cm" },
            { question: "b)", attendu: "5", unite: "cm" },
            { question: "c)", attendu: "16", unite: "cm" },
          ],
        },
        {
          enonce: "Utilise les carreaux comme une équerre.\nCes côtés sont-ils perpendiculaires ? Écris oui ou non.\na) AB et AD\nb) AB et BC\nc) DC et DA",
          figure: dessin({
            l: 8,
            h: 6,
            grille: true,
            max: "max-w-[15rem] print:max-w-[10rem]",
            label: "Un quadrilatère ABCD sur quadrillage",
            formes: figure([[1, 1], [7, 1], [5, 5], [1, 5]], ["A", "B", "C", "D"], ["hg", "hd", "bd", "bg"]),
          }),
          correction:
            "Les lignes du quadrillage se coupent toujours en faisant des angles droits.\na) AB suit une ligne couchée, AD une ligne debout. Ils font un angle droit en A : oui.\nb) BC penche : il ne suit pas une ligne du quadrillage. L'angle en B est plus fermé qu'un angle droit : non.\nc) DC est couché, DA est debout. Angle droit en D : oui.\n⛔ Le piège : croire que deux côtés qui se touchent sont toujours perpendiculaires. Il faut un angle droit.\nRéponse : a) oui ; b) non ; c) oui.",
          micros: ["ce2_droite_perpendiculaire"],
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["oui", "vrai"] },
          ],
        },
        {
          enonce: "Pose ta règle sur A et B.\nQuel point est aligné avec A et B ?\nA) le point C   B) le point D   C) le point E",
          figure: dessin({
            l: 11,
            h: 6,
            label: "Les points A, B, C, D et E",
            formes: [pt([1, 5], "A", "b"), pt([4, 4], "B", "b"), pt([10, 2], "C", "h"), pt([8, 3.6], "D", "b"), pt([6, 2], "E", "h")],
          }),
          correction:
            "Je pose le bord de la règle sur A et sur B. Je prolonge le trait jusqu'au bout.\nLe trait passe exactement sur C.\nIl passe au-dessus de D, et sous E, sans les toucher.\nDonc seul C est aligné avec A et B. Réponse A.\n⛔ Le piège : choisir D, parce qu'il est près de la ligne. Près ne suffit pas.\nRéponse : A.",
          micros: ["ce2_droite_alignement"],
          reponses: [{ attendu: ["A", "A) le point C", "le point C"] }],
        },
        {
          enonce: "Seul l'angle en A est codé.\na) L'angle en A est-il droit ? Écris oui ou non.\nb) L'angle en C n'a pas de petit carré. Que faire ?\nA) Il est droit, c'est sûr.   B) Il n'est pas droit, c'est sûr.   C) Je le vérifie avec l'équerre.",
          figure: dessin({
            l: 9,
            h: 6,
            label: "Un quadrilatère ABCD, un petit carré rouge en A",
            formes: [
              ...figure([[1, 1], [7, 1], [7.4, 5], [1, 5]], ["A", "B", "C", "D"], ["hg", "hd", "bd", "bg"]),
              { t: "droit", en: [1, 1], u: [1, 0], v: [0, 1] },
            ],
          }),
          correction:
            "a) En A, il y a un petit carré rouge. Le codage dit : angle droit. Oui.\nb) En C, rien n'est codé. Le codage ne dit ni « droit » ni « pas droit ».\nPour savoir, je pose mon équerre. Réponse C.\n⛔ Le piège : choisir B. Un angle sans petit carré peut quand même être droit : je n'ai pas encore vérifié.\nRéponse : a) oui ; b) C.",
          micros: ["ce2_angle_droit_codage"],
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["C", "C) Je le vérifie avec l'équerre"] },
          ],
        },
        {
          enonce: "Les points A, B, C et D sont alignés.\nCombien de segments différents peut-on tracer entre deux de ces points ?",
          figure: dessin({
            l: 12,
            h: 2.4,
            label: "Quatre points A, B, C et D alignés sur une droite",
            formes: [{ t: "seg", de: [0.3, 1.4], vers: [11.7, 1.4], c: "#64748b", w: 2 }, pt([1.5, 1.4], "A", "h"), pt([4.5, 1.4], "B", "h"), pt([7, 1.4], "C", "h"), pt([10.5, 1.4], "D", "h")],
          }),
          correction:
            "Je pars de chaque point, et je vais vers les points à sa droite.\nDepuis A : AB, AC, AD. 3 segments.\nDepuis B : BC, BD. 2 segments.\nDepuis C : CD. 1 segment.\nEn tout : 3 + 2 + 1 = 6 segments.\n⛔ Le piège : compter seulement AB, BC et CD, les segments côte à côte. AC, BD et AD sautent un point, mais ce sont aussi des segments.\nRéponse : 6.",
          micros: ["ce2_droite_alignement"],
          reponses: [{ attendu: ["6", "six"] }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je cherche sur le dessin ce qui est codé, puis je calcule pas à pas.",
      rappel: [
        "Ce qui est codé est sûr : je n'ai pas besoin de le mesurer.",
        "Pour faire le tour d'une figure, j'additionne TOUS ses côtés.",
        "Une ligne couchée et une ligne debout forment un angle droit : elles sont perpendiculaires.",
      ],
      exercices: [
        {
          titre: "Les vitres de la fenêtre",
          enonce: "Un vitrier pose une fenêtre. Deux barres en croix la partagent en vitres rectangulaires.\na) Combien y a-t-il de vitres ?\nb) Combien d'angles droits a une vitre ?\nc) Combien d'angles droits ont toutes les vitres ensemble ?",
          figure: dessin({
            l: 10,
            h: 8,
            max: "max-w-[14rem] print:max-w-[10rem]",
            label: "Une fenêtre rectangulaire partagée par deux barres en croix",
            formes: [
              { t: "poly", pts: [[1, 1], [9, 1], [9, 7], [1, 7]], c: ENCRE, w: 4, fill: "#e0f2fe" },
              { t: "seg", de: [5, 1], vers: [5, 7], c: ENCRE, w: 4 },
              { t: "seg", de: [1, 4], vers: [9, 4], c: ENCRE, w: 4 },
            ],
          }),
          correction:
            "a) La barre debout coupe la fenêtre en 2. La barre couchée coupe encore chaque moitié en 2. 2 × 2 = 4 vitres.\nb) Chaque vitre est un rectangle. Un rectangle a 4 angles droits.\nc) 4 vitres, avec 4 angles droits chacune : 4 + 4 + 4 + 4 = 16 angles droits.\n⛔ Le piège : compter seulement les 4 coins de la fenêtre. Chaque vitre a ses propres coins, même au milieu.\nRéponse : a) 4 ; b) 4 ; c) 16.",
          micros: ["ce2_angle_droit", "ce2_droite_defi"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["16", "seize"] },
          ],
        },
        {
          titre: "Le tour du terrain de sport",
          enonce: "Le terrain de sport de l'école est un rectangle ABCD. Lis le codage et les mesures.\na) Combien mesure CD, en m ?\nb) Combien mesure DA, en m ?\nc) Léo fait une fois le tour du terrain en courant. Combien de mètres court-il ?",
          figure: rectangleCode(["40 m", "25 m"]),
          correction:
            "a) CD a le même codage que AB : un petit trait. AB mesure 40 m, donc CD mesure 40 m.\nb) DA a le même codage que BC : deux petits traits. BC mesure 25 m, donc DA mesure 25 m.\nc) Le tour, ce sont les quatre côtés : 40 + 25 + 40 + 25.\n40 + 40 = 80 et 25 + 25 = 50. Puis 80 + 50 = 130 m.\n⛔ Le piège : calculer 40 + 25 = 65 m. Ce n'est que la moitié du tour : il reste deux côtés.\nRéponse : a) 40 ; b) 25 ; c) 130.",
          micros: ["ce2_segments_codage", "ce2_droite_defi"],
          reponses: [
            { question: "a)", attendu: "40", unite: "m" },
            { question: "b)", attendu: "25", unite: "m" },
            { question: "c)", attendu: "130", unite: "m" },
          ],
        },
        {
          titre: "Les étagères de la menuisière",
          enonce: "Une menuisière fixe trois étagères A, B et C sur un mur. Une étagère bien posée est perpendiculaire au mur.\na) Quelle étagère est bien posée ?\nb) Combien d'angles droits fait cette étagère avec le mur, au-dessus et au-dessous ?",
          figure: dessin({
            l: 10,
            h: 8,
            max: "max-w-[14rem] print:max-w-[10rem]",
            label: "Un mur debout et trois étagères A, B et C",
            formes: [
              { t: "poly", pts: [[0.5, 0.3], [1.5, 0.3], [1.5, 7.7], [0.5, 7.7]], c: "#64748b", fill: "#e2e8f0" },
              { t: "seg", de: [1.5, 1.8], vers: [8, 1], c: ORANGE, w: 4 },
              { t: "texte", en: [8.7, 1], txt: "A" },
              { t: "seg", de: [1.5, 4], vers: [8, 4], c: ORANGE, w: 4 },
              { t: "texte", en: [8.7, 4], txt: "B" },
              { t: "seg", de: [1.5, 6.4], vers: [8, 7.1], c: ORANGE, w: 4 },
              { t: "texte", en: [8.7, 7.1], txt: "C" },
            ],
          }),
          correction:
            "a) Je pose le coin de l'équerre entre le mur et chaque étagère.\nA monte un peu : l'angle du dessous est plus ouvert qu'un angle droit.\nC descend un peu : l'angle du dessus est plus ouvert qu'un angle droit.\nB colle exactement au coin de l'équerre : B est perpendiculaire au mur.\nb) Au-dessus de B, un angle droit. Au-dessous, un autre. 2 angles droits.\n⛔ Le piège : choisir C parce qu'elle « a l'air » presque droite. Presque ne suffit pas : les objets glisseraient.\nRéponse : a) B ; b) 2.",
          micros: ["ce2_droite_perpendiculaire", "ce2_droite_defi"],
          reponses: [
            { question: "a)", attendu: ["B", "l'étagère B"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          titre: "Le cerf-volant",
          enonce: "Sacha fabrique un cerf-volant ABCD avec deux baguettes en croix. Le dessin n'est pas en vraie grandeur.\na) Combien mesure AD, en cm ?\nb) Combien mesure CD, en cm ?\nc) Le cadre suit les quatre côtés. Combien de cm de ficelle faut-il ?\nd) Les deux baguettes sont-elles perpendiculaires ? Écris oui ou non.",
          figure: dessin({
            l: 10,
            h: 10.6,
            max: "max-w-[14rem] print:max-w-[10rem]",
            label: "Un cerf-volant ABCD, deux baguettes en croix, côtés codés",
            formes: [
              { t: "poly", pts: [[5, 0.6], [8, 3.5], [5, 10], [2, 3.5]], c: ROUGE, w: 2.5, fill: "#fee2e2" },
              { t: "seg", de: [5, 0.6], vers: [5, 10], c: "#a16207", w: 2.5 },
              { t: "seg", de: [2, 3.5], vers: [8, 3.5], c: "#a16207", w: 2.5 },
              pt([5, 0.6], "A", "h"),
              pt([8, 3.5], "B", "d"),
              pt([5, 10], "C", "b"),
              pt([2, 3.5], "D", "g"),
              { t: "droit", en: [5, 3.5], u: [1, 0], v: [0, 1] },
              { t: "code", de: [5, 0.6], vers: [8, 3.5], n: 1 },
              { t: "code", de: [5, 0.6], vers: [2, 3.5], n: 1 },
              { t: "code", de: [8, 3.5], vers: [5, 10], n: 2 },
              { t: "code", de: [5, 10], vers: [2, 3.5], n: 2 },
              { t: "texte", en: [7.9, 1.5], txt: "30 cm", c: ORANGE, ancre: "start" },
              { t: "texte", en: [7.3, 7.4], txt: "50 cm", c: ORANGE, ancre: "start" },
            ],
          }),
          correction:
            "a) AD a le même codage que AB : un petit trait. Donc AD = AB = 30 cm.\nb) CD a le même codage que BC : deux petits traits. Donc CD = BC = 50 cm.\nc) J'additionne les quatre côtés : 30 + 50 + 50 + 30.\n30 + 30 = 60 et 50 + 50 = 100. Puis 60 + 100 = 160 cm.\nd) Là où les baguettes se croisent, il y a un petit carré rouge. Le codage dit : angle droit. Oui.\n⛔ Le piège du c) : additionner 30 + 50 = 80 et s'arrêter. Le cadre fait tout le tour : quatre côtés.\nRéponse : a) 30 ; b) 50 ; c) 160 ; d) oui.",
          micros: ["ce2_segments_codage", "ce2_angle_droit_codage", "ce2_droite_perpendiculaire", "ce2_droite_defi"],
          reponses: [
            { question: "a)", attendu: "30", unite: "cm" },
            { question: "b)", attendu: "50", unite: "cm" },
            { question: "c)", attendu: "160", unite: "cm" },
            { question: "d)", attendu: ["oui", "vrai"] },
          ],
        },
      ],
    },
  ],
};
