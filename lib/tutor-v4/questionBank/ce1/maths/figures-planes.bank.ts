// lib/tutor-v4/questionBank/ce1/maths/figures-planes.bank.ts
//
// La géométrie plane du CE1, écrite à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2). Le CE1 va
// plus loin qu'on ne croit :
//   — reconnaître, nommer et décrire le cercle, le carré, le rectangle, le
//     triangle ET LE TRIANGLE RECTANGLE ;
//   — le lexique attendu : côté, sommet, angle, disque, cercle, centre, point,
//     droite, segment, milieu d'un segment, ANGLE DROIT, ANGLE AIGU, ANGLE
//     OBTUS ;
//   — connaître les propriétés des angles et les égalités de longueur du carré
//     et du rectangle ;
//   — reproduire ou construire ces figures sur quadrillage, sur papier pointé
//     ou sur papier uni ;
//   — utiliser la règle pour vérifier des alignements, L'ÉQUERRE pour vérifier
//     un angle droit, et LE COMPAS comme instrument de tracé ;
//   — connaître et utiliser le CODE de l'angle droit.
//
// LE PIÈGE DE LA NOTION : la figure PENCHÉE cesse d'en être une aux yeux des
// élèves. Un carré posé sur la pointe reste un carré — ce sont ses côtés et
// ses angles qui le disent, pas sa position sur la feuille. Le programme
// insiste : on passe d'une géométrie où les formes sont reconnues d'un coup
// d'œil à une géométrie où elles sont vérifiées avec les instruments.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type {
  CanvasFigure,
  DifficultyLevel,
  QuadrilatereCanvasData,
  TriangleCanvasData,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";
import {
  ANGLES_DROITS,
  COTES,
  type Forme,
  SOMMETS_DROITS,
  cap,
  dessin,
  entre,
  etapes,
  gab,
  lettres,
  melange,
  piece,
  pieceAngle,
  planche,
  plancheAngles,
  prenom,
  qcm,
  qcmN,
  tournure,
  un,
} from "./geo-outils-ce1";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function quadrilatere(data: Omit<QuadrilatereCanvasData, "kind">): QuadrilatereCanvasData {
  return { kind: "quadrilatere", ...data };
}

function triangle(data: Omit<TriangleCanvasData, "kind">): TriangleCanvasData {
  return { kind: "triangle", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const anciens: TutorBankItemV4[] = [
  /* =========================================================
     CE1_FIGURE_RECONNAITRE — les quatre figures de référence
     LE piège : la figure penchée.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_figure_reconnaitre_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Cette figure a quatre côtés de la même longueur et quatre angles droits, mais elle est posée sur la pointe. Comment s'appelle-t-elle ?",
    format: "qcm",
    choices: ["un carré", "un triangle", "un cercle", "ce n'est pas une figure connue"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "Ce sont les côtés et les angles qui font la figure, pas la façon dont elle est posée.",
    explanation: exp(
      "Une figure se reconnaît à ses côtés et à ses angles, jamais à sa position sur la feuille.",
      "On compte les côtés, on regarde s'ils sont égaux, puis on vérifie les angles.",
      "Quatre côtés égaux et quatre angles droits : c'est la définition du carré. Le faire tourner ne change rien, comme une photo qu'on penche.",
      "C'est un carré.",
    ),
    canvas: quadrilatere({
      points: {
        A: { x: 150, y: 40 },
        B: { x: 240, y: 115 },
        C: { x: 150, y: 190 },
        D: { x: 60, y: 115 },
      },
      display: { showPoints: true, showLabels: true, showSides: false },
    }),
    tags: ["ce1", "figures_planes", "reconnaitre", "piege", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "ce1_figure_reconnaitre_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle figure n'a aucun côté droit ?",
    format: "qcm",
    choices: ["le cercle", "le carré", "le triangle", "le rectangle"],
    expected: ["le cercle"],
    comparator: "mcq_exact",
    hint: "On la trace avec un compas, pas avec une règle.",
    explanation: exp(
      "Un cercle est une ligne courbe fermée dont tous les points sont à la même distance du centre.",
      "On cherche la figure qu'on ne peut pas tracer avec une règle.",
      "Le carré, le rectangle et le triangle sont faits de segments droits. Le cercle, lui, se trace au compas : il n'a ni côté ni sommet.",
      "C'est le cercle.",
    ),
    tags: ["ce1", "figures_planes", "reconnaitre", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_figure_reconnaitre_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les côtés, puis regarde s'ils sont égaux.",
    tags: ["ce1", "figures_planes", "reconnaitre", "template"],
    generate: () => {
      const figures = [
        { nom: "le carré", indice: "quatre côtés de la même longueur et quatre angles droits" },
        { nom: "le rectangle", indice: "quatre angles droits, et les côtés opposés de la même longueur" },
        { nom: "le triangle", indice: "trois côtés et trois sommets" },
        { nom: "le cercle", indice: "aucun côté droit, aucun sommet" },
      ] as const;
      const f = randomChoice(figures);
      const autres = figures.filter((x) => x.nom !== f.nom).map((x) => x.nom);
      return {
        text: `Quelle figure a ${f.indice} ?`,
        format: "qcm",
        choices: makeChoices(f.nom, autres),
        expected: [f.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque figure de référence se reconnaît à ses côtés et à ses angles.",
          "On compte les côtés, puis on regarde leur longueur et les angles.",
          `Avec ${f.indice}, il n'y a qu'une figure possible : ${f.nom}.`,
          `C'est ${f.nom}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FIGURE_TRIANGLE_RECTANGLE — le triangle avec un angle droit
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_figure_triangle_rectangle_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_triangle_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Qu'est-ce qu'un triangle rectangle ?",
    format: "qcm",
    choices: [
      "un triangle qui a un angle droit",
      "un triangle qui a quatre côtés",
      "un rectangle coupé en deux",
      "un triangle dont tous les côtés sont égaux",
    ],
    expected: ["un triangle qui a un angle droit"],
    comparator: "mcq_exact",
    hint: "Le mot « rectangle » annonce ici l'angle droit.",
    explanation: exp(
      "Un triangle rectangle est un triangle qui possède un angle droit.",
      "On vérifie l'angle avec l'équerre, comme pour toute figure.",
      "Il a bien trois côtés et trois sommets, comme tous les triangles. Ce qui le distingue, c'est qu'un de ses angles est droit.",
      "C'est un triangle qui a un angle droit.",
    ),
    canvas: triangle({
      points: {
        A: { x: 70, y: 180 },
        B: { x: 220, y: 180 },
        C: { x: 70, y: 60 },
      },
      display: { showPoints: true, showLabels: true },
      marks: { rightAngleAt: "A" },
    }),
    tags: ["ce1", "figures_planes", "triangle_rectangle", "definition", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "ce1_figure_triangle_rectangle_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_triangle_rectangle",
    difficulty: 4,
    theme: "neutral",
    hint: "Un seul angle droit suffit, et il ne peut pas y en avoir deux.",
    tags: ["ce1", "figures_planes", "triangle_rectangle", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          question: "Combien d'angles droits a un triangle rectangle ?",
          bonne: "1",
          pieges: ["2", "3", "0"],
          pourquoi: "Un seul de ses trois angles est droit : les deux autres sont plus petits.",
        },
        {
          question: "Combien de côtés a un triangle rectangle ?",
          bonne: "3",
          pieges: ["4", "2", "5"],
          pourquoi: "C'est d'abord un triangle : il a trois côtés et trois sommets, comme tous les triangles.",
        },
        {
          question: "Combien de sommets a un triangle rectangle ?",
          bonne: "3",
          pieges: ["4", "2", "6"],
          pourquoi: "Chaque coin du triangle est un sommet : il y en a trois.",
        },
      ]);
      return {
        text: cas.question,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.pieges),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un triangle rectangle est un triangle qui possède un angle droit.",
          "On repart de ce qu'est un triangle, puis on ajoute ce que « rectangle » apporte.",
          cas.pourquoi,
          `La réponse est ${cas.bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FIGURE_DECRIRE — le vocabulaire géométrique
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_figure_decrire_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_decrire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une figure, comment appelle-t-on un coin, l'endroit où deux côtés se rejoignent ?",
    format: "qcm",
    choices: ["un sommet", "un côté", "un angle droit", "un centre"],
    expected: ["un sommet"],
    comparator: "mcq_exact",
    hint: "C'est un point, pas un trait.",
    explanation: exp(
      "Un sommet est le point où deux côtés d'une figure se rejoignent.",
      "On distingue ce qui est un point de ce qui est un trait.",
      "Le côté est un segment, un trait ; le sommet est un point, un coin. Un carré a quatre côtés et quatre sommets.",
      "C'est un sommet.",
    ),
    tags: ["ce1", "figures_planes", "decrire", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_figure_decrire_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_decrire",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte-les sur la figure, un par un.",
    tags: ["ce1", "figures_planes", "decrire", "template"],
    generate: () => {
      const figures = [
        { nom: "un carré", cotes: 4, sommets: 4 },
        { nom: "un rectangle", cotes: 4, sommets: 4 },
        { nom: "un triangle", cotes: 3, sommets: 3 },
      ] as const;
      const f = randomChoice(figures);
      const quoi = randomChoice(["côtés", "sommets"] as const);
      const bonne = quoi === "côtés" ? f.cotes : f.sommets;
      return {
        text: `Combien de ${quoi} a ${f.nom} ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Le côté est un segment de la figure ; le sommet est le point où deux côtés se rejoignent.",
          "On fait le tour de la figure en comptant.",
          `${f.nom.charAt(0).toUpperCase()}${f.nom.slice(1)} a ${f.cotes} côtés et ${f.sommets} sommets : autant de l'un que de l'autre.`,
          `Il y en a ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ANGLE_DROIT — vérifier avec l'équerre
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_angle_droit_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Avec quel instrument vérifie-t-on qu'un angle est droit ?",
    format: "qcm",
    choices: ["l'équerre", "le compas", "la règle graduée", "la gomme"],
    expected: ["l'équerre"],
    comparator: "mcq_exact",
    hint: "C'est l'instrument qui a lui-même un angle droit.",
    explanation: exp(
      "Un angle droit est l'angle du coin d'une feuille : ni plus ouvert, ni plus fermé.",
      "On pose le coin de l'équerre sur le sommet de l'angle, en suivant un côté.",
      "L'équerre porte elle-même un angle droit : si l'angle de la figure coïncide avec le sien, il est droit. Le compas sert aux cercles, la règle aux traits.",
      "On vérifie avec l'équerre.",
    ),
    tags: ["ce1", "figures_planes", "angle_droit", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_angle_droit_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_angle_droit",
    difficulty: 4,
    theme: "neutral",
    text: "Une figure a quatre côtés. Trois de ses angles sont droits, mais le quatrième ne l'est pas. Est-ce un rectangle ?",
    format: "qcm",
    choices: [
      "non, un rectangle a ses quatre angles droits",
      "oui, trois angles droits suffisent",
      "oui, si les côtés sont égaux",
      "on ne peut pas savoir",
    ],
    expected: ["non, un rectangle a ses quatre angles droits"],
    comparator: "mcq_exact",
    hint: "Il suffit d'un seul angle non droit pour que ce ne soit plus un rectangle.",
    explanation: exp(
      "Un rectangle est un quadrilatère qui a QUATRE angles droits.",
      "On vérifie chaque angle à l'équerre, l'un après l'autre.",
      "Un seul angle non droit suffit à écarter la figure : ce n'est pas un rectangle. C'est ainsi qu'on argumente en géométrie — par une propriété qui manque.",
      "Non : un rectangle a ses quatre angles droits.",
    ),
    tags: ["ce1", "figures_planes", "angle_droit", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_angle_droit_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_angle_droit",
    difficulty: 3,
    theme: "neutral",
    hint: "Pose le coin de l'équerre sur chaque angle, l'un après l'autre.",
    tags: ["ce1", "figures_planes", "angle_droit", "template"],
    generate: () => {
      const figures = [
        { nom: "un carré", droits: 4, pourquoi: "ses quatre angles sont droits" },
        { nom: "un rectangle", droits: 4, pourquoi: "ses quatre angles sont droits" },
        { nom: "un triangle rectangle", droits: 1, pourquoi: "un seul de ses trois angles est droit" },
        { nom: "un cercle", droits: 0, pourquoi: "il n'a ni côté ni sommet, donc aucun angle" },
      ] as const;
      const f = randomChoice(figures);
      return {
        text: `Combien d'angles droits a ${f.nom} ?`,
        format: "short",
        expected: [String(f.droits)],
        comparator: "number_equal",
        explanation: exp(
          "Un angle droit est celui du coin d'une feuille : on le vérifie avec l'équerre.",
          "On pose le coin de l'équerre sur chaque sommet de la figure, l'un après l'autre.",
          `Pour ${f.nom}, ${f.pourquoi}.`,
          `Il en a ${f.droits}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ANGLE_AIGU_OBTUS — plus petit, plus grand
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_angle_aigu_obtus_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_angle_aigu_obtus",
    difficulty: 3,
    theme: "neutral",
    text: "Comment appelle-t-on un angle plus PETIT qu'un angle droit ?",
    format: "qcm",
    choices: ["un angle aigu", "un angle obtus", "un angle plat", "un petit angle droit"],
    expected: ["un angle aigu"],
    comparator: "mcq_exact",
    hint: "« Aigu » se dit aussi d'une pointe.",
    explanation: exp(
      "Un angle aigu est plus fermé qu'un angle droit ; un angle obtus est plus ouvert.",
      "On compare l'angle à celui de l'équerre.",
      "Si l'angle rentre dans le coin de l'équerre sans le remplir, il est aigu — il est pointu. S'il déborde, il est obtus.",
      "C'est un angle aigu.",
    ),
    tags: ["ce1", "figures_planes", "angles", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_angle_aigu_obtus_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_angle_aigu_obtus",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare toujours à l'angle de l'équerre.",
    tags: ["ce1", "figures_planes", "angles", "template"],
    generate: () => {
      const cas = randomChoice([
        { desc: "plus fermé que le coin de l'équerre", bonne: "un angle aigu" },
        { desc: "plus ouvert que le coin de l'équerre", bonne: "un angle obtus" },
        { desc: "exactement comme le coin de l'équerre", bonne: "un angle droit" },
      ]);
      return {
        text: `Un angle est ${cas.desc}. Comment s'appelle-t-il ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "un angle aigu",
          "un angle obtus",
          "un angle droit",
          "un angle rond",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On classe les angles en les comparant à l'angle droit : aigu s'il est plus fermé, obtus s'il est plus ouvert.",
          "On pose l'équerre sur l'angle et on regarde s'il rentre, s'il déborde, ou s'il coïncide.",
          `Un angle ${cas.desc} est donc ${cas.bonne}.`,
          `C'est ${cas.bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ANGLE_DROIT_CODE — le petit carré dans le coin
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_angle_droit_code_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_angle_droit_code",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un dessin, que signifie le petit carré tracé dans le coin d'une figure ?",
    format: "qcm",
    choices: [
      "que cet angle est droit",
      "que ce côté est le plus long",
      "qu'il faut mesurer cet angle",
      "que la figure est un carré",
    ],
    expected: ["que cet angle est droit"],
    comparator: "mcq_exact",
    hint: "C'est un code : il remplace la vérification à l'équerre.",
    explanation: exp(
      "Le code de l'angle droit est un petit carré dessiné dans le coin.",
      "On lit les codes avant de mesurer : ils disent ce qui est déjà su.",
      "Ce petit carré veut dire « cet angle est droit ». On n'a pas besoin de reprendre l'équerre : le dessin l'annonce.",
      "Il signifie que cet angle est droit.",
    ),
    canvas: quadrilatere({
      points: {
        A: { x: 70, y: 55 },
        B: { x: 230, y: 55 },
        C: { x: 230, y: 175 },
        D: { x: 70, y: 175 },
      },
      display: { showPoints: true, showLabels: true },
      marks: { rightAnglesAt: ["A", "B", "C", "D"] },
    }),
    tags: ["ce1", "figures_planes", "code", "definition", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "ce1_angle_droit_code_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_angle_droit_code",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un rectangle, combien de petits carrés de code faut-il dessiner ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Un par angle droit.",
    explanation: exp(
      "On code chaque angle droit d'une figure par un petit carré dans le coin.",
      "On compte les angles droits de la figure.",
      "Un rectangle a quatre angles droits : il faut donc quatre codes, un dans chaque coin.",
      "Il en faut 4.",
    ),
    tags: ["ce1", "figures_planes", "code"],
  },
  {
    kind: "template",
    id: "ce1_angle_droit_code_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_angle_droit_code",
    difficulty: 4,
    theme: "neutral",
    hint: "Le code AFFIRME : quand il est là, il n'y a plus rien à vérifier.",
    tags: ["ce1", "figures_planes", "code", "template"],
    generate: () => {
      const code = randomChoice([true, false]);
      const figure = randomChoice(["cette figure", "ce quadrilatère", "ce triangle"]);
      const bonne = code
        ? "il est droit, le code le dit"
        : "on ne sait pas encore, il faut vérifier à l'équerre";
      return {
        text: code
          ? `Sur ${figure}, un angle porte un petit carré dans son coin. Que peut-on dire de cet angle ?`
          : `Sur ${figure}, un angle ne porte aucun code. Que peut-on dire de cet angle ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          code
            ? "on ne sait pas encore, il faut vérifier à l'équerre"
            : "il est droit, le code le dit",
          "il est forcément plus petit qu'un angle droit",
          "il est forcément plus grand qu'un angle droit",
          "le petit carré indique le plus long côté",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le petit carré dessiné dans un coin est le code de l'angle droit : il affirme que l'angle est droit.",
          "On lit les codes avant de sortir l'équerre : ils disent ce qui est déjà su.",
          code
            ? "Le code est là : l'angle est droit, on n'a pas besoin de le vérifier."
            : "Sans code, rien n'est affirmé : l'angle peut être droit ou non, et c'est l'équerre qui tranche.",
          `${bonne.charAt(0).toUpperCase()}${bonne.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FIGURE_PROPRIETES — carré et rectangle
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_figure_proprietes_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un rectangle, que peut-on dire des côtés qui se font face ?",
    format: "qcm",
    choices: [
      "ils ont la même longueur",
      "ils ont des longueurs différentes",
      "ils sont toujours plus courts que les autres",
      "on ne peut rien en dire",
    ],
    expected: ["ils ont la même longueur"],
    comparator: "mcq_exact",
    hint: "Regarde une porte : le haut et le bas.",
    explanation: exp(
      "Dans un rectangle, les côtés opposés ont la même longueur, et les quatre angles sont droits.",
      "On compare les côtés deux à deux, ceux qui se font face.",
      "Le haut et le bas d'une porte ont la même largeur, les deux montants la même hauteur. C'est ce qui permet de ne mesurer que deux côtés au lieu de quatre.",
      "Ils ont la même longueur.",
    ),
    tags: ["ce1", "figures_planes", "proprietes", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_figure_proprietes_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_proprietes",
    difficulty: 4,
    theme: "neutral",
    hint: "Les côtés opposés d'un rectangle sont égaux.",
    tags: ["ce1", "figures_planes", "proprietes", "template", "canvas"],
    generate: () => {
      const longueur = randomInt(5, 12);
      const largeur = randomInt(2, longueur - 1);
      return {
        text: `Un rectangle a une longueur de ${longueur} cm et une largeur de ${largeur} cm. Combien mesure le côté qui fait face à la longueur ?`,
        format: "short",
        expected: [String(longueur)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un rectangle, les côtés opposés ont la même longueur.",
          "On repère le côté qui fait face à celui qu'on connaît.",
          `Le côté opposé à la longueur mesure lui aussi ${longueur} cm. Les deux autres côtés mesurent ${largeur} cm chacun.`,
          `Il mesure ${longueur} cm.`,
        ),
        canvas: quadrilatere({
          points: {
            A: { x: 60, y: 60 },
            B: { x: 240, y: 60 },
            C: { x: 240, y: 160 },
            D: { x: 60, y: 160 },
          },
          display: { showPoints: true, showLabels: true, showSides: true },
          sideLabels: { AB: `${longueur} cm`, BC: `${largeur} cm` },
          marks: { rightAnglesAt: ["A", "B", "C", "D"] },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_figure_proprietes_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_proprietes",
    difficulty: 4,
    theme: "neutral",
    hint: "Le carré a ses quatre côtés égaux.",
    tags: ["ce1", "figures_planes", "proprietes", "template"],
    generate: () => {
      const cote = randomInt(3, 12);
      const cas = randomChoice([
        {
          question: `Un carré a un côté de ${cote} cm. Combien mesurent ses autres côtés ?`,
          bonne: String(cote),
          pourquoi: "Les quatre côtés d'un carré ont tous la même longueur.",
        },
        {
          question: `Combien d'angles droits a un carré ?`,
          bonne: "4",
          pourquoi: "Le carré a quatre angles droits, comme le rectangle.",
        },
      ]);
      return {
        text: cas.question,
        format: "short",
        expected: [cas.bonne],
        comparator: "number_equal",
        explanation: exp(
          "Un carré a quatre côtés de la même longueur et quatre angles droits.",
          "On repart des propriétés du carré au lieu de mesurer.",
          cas.pourquoi,
          `La réponse est ${cas.bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FIGURE_CONSTRUIRE — reproduire une figure
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_figure_construire_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Sur du papier quadrillé, on a tracé deux côtés consécutifs d'un rectangle. Que faut-il faire pour le terminer ?",
    format: "qcm",
    choices: [
      "tracer les deux côtés qui manquent, de la même longueur que ceux d'en face",
      "tracer deux côtés au hasard",
      "relier les deux extrémités par un seul trait",
      "effacer et recommencer",
    ],
    expected: ["tracer les deux côtés qui manquent, de la même longueur que ceux d'en face"],
    comparator: "mcq_exact",
    hint: "Les côtés opposés d'un rectangle sont égaux.",
    explanation: exp(
      "Pour construire une figure, on se sert de ses propriétés au lieu de dessiner à vue.",
      "On regarde ce qui est déjà tracé, puis on complète en suivant les lignes du quadrillage.",
      "Les côtés opposés d'un rectangle ont la même longueur : les deux côtés qui manquent se déduisent de ceux qui sont tracés.",
      "On trace les deux côtés qui manquent, de la même longueur que ceux d'en face.",
    ),
    tags: ["ce1", "figures_planes", "construire", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_figure_construire_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les carreaux, ils remplacent la règle.",
    tags: ["ce1", "figures_planes", "construire", "template"],
    generate: () => {
      const cote = randomInt(3, 9);
      const figure = randomChoice(["un carré", "un rectangle"] as const);
      const autre = figure === "un carré" ? cote : randomInt(2, cote - 1);
      return {
        text: figure === "un carré"
          ? `Sur un quadrillage, tu traces ${figure} dont un côté fait ${cote} carreaux. Combien de carreaux fait le côté d'à côté ?`
          : `Sur un quadrillage, tu traces ${figure} de ${cote} carreaux de long et ${autre} carreaux de large. Combien de carreaux fait le côté opposé à la longueur ?`,
        format: "short",
        expected: [String(figure === "un carré" ? cote : cote)],
        comparator: "number_equal",
        explanation: exp(
          figure === "un carré"
            ? "Un carré a ses quatre côtés de la même longueur."
            : "Un rectangle a ses côtés opposés de la même longueur.",
          "On compte les carreaux au lieu de mesurer : le quadrillage garantit les angles droits.",
          figure === "un carré"
            ? `Tous les côtés font ${cote} carreaux, y compris celui d'à côté.`
            : `Le côté opposé à la longueur fait lui aussi ${cote} carreaux ; les deux autres font ${autre} carreaux.`,
          `Il fait ${cote} carreaux.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FIGURE_COMPAS — tracer un cercle
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_figure_compas_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_compas",
    difficulty: 2,
    theme: "neutral",
    text: "Où place-t-on la pointe du compas pour tracer un cercle ?",
    format: "qcm",
    choices: [
      "sur le centre du cercle",
      "sur un point du cercle",
      "n'importe où sur la feuille",
      "sur le bord de la feuille",
    ],
    expected: ["sur le centre du cercle"],
    comparator: "mcq_exact",
    hint: "La pointe ne bouge pas pendant tout le tracé.",
    explanation: exp(
      "Un cercle est l'ensemble des points situés à la même distance d'un point appelé centre.",
      "On pique la pointe du compas sur le centre, on règle l'écartement, puis on tourne.",
      "La pointe reste immobile sur le centre : c'est ce qui garantit que tous les points tracés sont à la même distance de lui.",
      "On la place sur le centre du cercle.",
    ),
    tags: ["ce1", "figures_planes", "compas", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_figure_compas_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_compas",
    difficulty: 4,
    theme: "neutral",
    text: "Que se passe-t-il si l'écartement du compas change pendant qu'on trace le cercle ?",
    format: "qcm",
    choices: [
      "la figure obtenue n'est plus un cercle",
      "le cercle devient plus grand, c'est tout",
      "cela ne change rien",
      "le centre se déplace",
    ],
    expected: ["la figure obtenue n'est plus un cercle"],
    comparator: "mcq_exact",
    hint: "Tous les points d'un cercle sont à la même distance du centre.",
    explanation: exp(
      "Sur un cercle, tous les points sont exactement à la même distance du centre.",
      "On garde l'écartement du compas fixe pendant tout le tour.",
      "Si l'écartement bouge, certains points sont plus loin du centre que d'autres : la ligne tracée n'est plus un cercle.",
      "La figure obtenue n'est plus un cercle.",
    ),
    tags: ["ce1", "figures_planes", "compas", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_figure_compas_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_compas",
    difficulty: 4,
    theme: "neutral",
    // ⚠️ Les mots « rayon » et « diamètre » sont du lexique de CE2 : au CE1 on
    // parle de l'écartement du compas et de la distance au centre.
    hint: "L'écartement du compas ne change pas pendant le tracé.",
    tags: ["ce1", "figures_planes", "compas", "template"],
    generate: () => {
      const ecart = randomInt(2, 9);
      const cherche = randomChoice(["distance", "traversee"] as const);
      const bonne = cherche === "distance" ? ecart : ecart * 2;
      return {
        text: cherche === "distance"
          ? `Tu écartes ton compas de ${ecart} cm et tu piques la pointe sur un point. À quelle distance de ce point passe le crayon ?`
          : `Tu écartes ton compas de ${ecart} cm et tu traces un cercle. Si tu traverses ce cercle en passant par son centre, quelle longueur parcours-tu, d'un bord à l'autre ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Sur un cercle, tous les points sont à la même distance du centre : c'est l'écartement du compas.",
          "On garde l'écartement fixe, et on repère ce que la question demande — un seul côté du centre, ou les deux.",
          cherche === "distance"
            ? `Le crayon reste toujours à ${ecart} cm de la pointe : c'est ce qui fait que la figure est un cercle.`
            : `En traversant par le centre, on parcourt ${ecart} cm d'un côté et ${ecart} cm de l'autre : ${ecart} + ${ecart} = ${ecart * 2}.`,
          `Cela fait ${bonne} cm.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FIGURE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_figure_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Tous les carrés sont-ils des rectangles ?",
    format: "qcm",
    choices: [
      "oui, un carré a quatre angles droits et ses côtés opposés égaux",
      "non, un carré n'est pas un rectangle",
      "oui, mais seulement les grands carrés",
      "on ne peut pas savoir",
    ],
    expected: ["oui, un carré a quatre angles droits et ses côtés opposés égaux"],
    comparator: "mcq_exact",
    hint: "Relis la définition du rectangle, et vérifie-la sur un carré.",
    explanation: exp(
      "Un rectangle est un quadrilatère à quatre angles droits, dont les côtés opposés sont égaux.",
      "On vérifie chaque propriété du rectangle sur un carré.",
      "Le carré a bien quatre angles droits, et ses côtés opposés sont bien égaux — ils le sont même tous les quatre. Un carré est donc un rectangle particulier. L'inverse est faux : un rectangle allongé n'est pas un carré.",
      "Oui : tout carré est un rectangle.",
    ),
    tags: ["ce1", "figures_planes", "defi", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_figure_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce1_figure_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche la propriété qui manque à la figure.",
    tags: ["ce1", "figures_planes", "defi", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          desc: "quatre côtés, mais un angle qui n'est pas droit",
          bonne: "ce n'est pas un rectangle",
          pieges: ["c'est un rectangle", "c'est un carré", "c'est un triangle"],
          pourquoi: "Un rectangle a ses quatre angles droits : un seul angle penché suffit à l'écarter.",
        },
        {
          desc: "quatre angles droits, mais deux côtés plus longs que les autres",
          bonne: "c'est un rectangle mais pas un carré",
          pieges: ["c'est un carré", "ce n'est pas un rectangle", "c'est un triangle rectangle"],
          pourquoi: "Quatre angles droits font un rectangle ; il faudrait quatre côtés égaux pour un carré.",
        },
        {
          desc: "trois côtés dont deux forment un angle droit",
          bonne: "c'est un triangle rectangle",
          pieges: ["c'est un carré", "c'est un rectangle", "ce n'est pas une figure connue"],
          pourquoi: "Trois côtés font un triangle, et l'angle droit en fait un triangle rectangle.",
        },
      ]);
      return {
        text: `Une figure a ${cas.desc}. Que peut-on en dire ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.pieges),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "En géométrie, on justifie en s'appuyant sur les propriétés, pas sur l'allure du dessin.",
          "On passe en revue les propriétés de chaque figure et on cherche celle qui manque.",
          cas.pourquoi,
          `${cas.bonne.charAt(0).toUpperCase()}${cas.bonne.slice(1)}.`,
        ),
      };
    },
  },
];

/* ═════════════════════════════════════════════════════════════════════════
   GABARITS DU 10/11/2026 — robustesse et dessins.
   Mesuré ce jour-là (scripts/mesurer-squelettes-coach.ts) : 3 à 8 squelettes
   par micro, 12 à 19 répétitions sur 20, et 10 % des énoncés avec un dessin.
   Chaque gabarit tire désormais une FIGURE dessinée (carré souvent penché : le
   piège de la notion), une situation, une tournure. Le dessin porte la question,
   il ne la résout pas : aucun code d'angle droit quand on demande de le vérifier.
   Les items figés sont gardés ; les anciens gabarits sont remplacés (mêmes ids).
   ═════════════════════════════════════════════════════════════════════════ */

const NP = "figures_planes";
const g = (micro: string, id: string, d: DifficultyLevel, hint: string, gen: Parameters<typeof gab>[5]) => gab(NP, micro, id, d, hint, gen);

const REGARDE = ["", "Regarde le dessin.", "Observe bien.", "Regarde bien."];
const LE: Partial<Record<Forme, string>> = { carre: "le carré", rectangle: "le rectangle", triangle: "le triangle", cercle: "le cercle", triangle_rectangle: "le triangle rectangle" };
const UN: Partial<Record<Forme, string>> = { carre: "un carré", rectangle: "un rectangle", triangle: "un triangle", cercle: "un cercle", triangle_rectangle: "un triangle rectangle" };
const POURQUOI: Partial<Record<Forme, string>> = {
  carre: "4 côtés de la même longueur et 4 angles droits",
  rectangle: "4 angles droits, et les côtés d'en face de la même longueur",
  triangle: "3 côtés et 3 sommets",
  cercle: "une ligne courbe, sans côté ni sommet",
  triangle_rectangle: "3 côtés et un angle droit",
};
const fig = (k: number) => `la figure ${k}`;
const figs = (n: number) => Array.from({ length: n }, (_, k) => fig(k + 1));
const ang = (k: number) => `l'angle ${k}`;
const angs = (n: number) => Array.from({ length: n }, (_, k) => ang(k + 1));

/** Des situations d'enfant autour d'une forme dessinée. */
const SITU_FORME = [
  (p: string) => `${p} a découpé cette forme dans du papier.`,
  (p: string) => `${p} a dessiné cette forme à la craie, dans la cour.`,
  (p: string) => `Sur le cerf-volant de ${p}, il y a cette forme.`,
  (p: string) => `${p} a collé cette gommette sur son cahier.`,
  (p: string) => `Sur le drapeau du château de ${p}, on voit cette forme.`,
  (p: string) => `${p} a trouvé cette forme dans la boîte de jeux.`,
  (p: string) => `La boulangère a fait un biscuit de cette forme pour ${p}.`,
  (p: string) => `Sur la porte de la cabane de ${p}, il y a cette forme.`,
  (_: string) => `Pic le paille-en-queue a vu cette forme sur un panneau.`,
  (p: string) => `${p} a peint cette forme sur la fusée en carton.`,
  (p: string) => `Au marché, ${p} voit un tapis avec cette forme.`,
  (p: string) => `Sur la carte au trésor de ${p}, il y a cette forme.`,
];
const situ = () => un(SITU_FORME)(prenom());

/* ─────────────── ce1_figure_reconnaitre ─────────────── */
const MR = "ce1_figure_reconnaitre";
const BASE4: Forme[] = ["carre", "rectangle", "triangle", "cercle"];

function nommerFigure(ctx: boolean) {
  const f = un(BASE4);
  const canvas = dessin([piece(f, { penche: f === "carre" ? Math.random() < 0.6 : Math.random() < 0.3 })], "Une figure à reconnaître.");
  const q = ["Comment s'appelle cette forme ?", "Quel est le nom de cette figure ?", "Quelle est cette figure ?", "C'est quelle figure ?", "Quel nom lui donner ?"];
  return {
    text: ctx ? `${situ()} ${un(q)}` : tournure(REGARDE, q),
    ...qcm(UN[f]!, BASE4.filter((x) => x !== f).map((x) => UN[x]!)),
    canvas,
    explanation: etapes(
      "on compte les côtés, puis on regarde les angles. Une figure penchée garde son nom.",
      `Cette figure a ${POURQUOI[f]}.`,
      `C'est ${UN[f]}.`,
    ),
  };
}

/** Une planche de figures numérotées : où est le … ? */
function trouverDansPlanche() {
  const cible = un<Forme>(["carre", "rectangle", "triangle", "cercle", "carre"]);
  const voisins: Forme[] =
    cible === "carre" ? ["rectangle", "losange", "triangle", "cercle", "hexagone"]
    : cible === "rectangle" ? ["losange", "triangle", "cercle", "quadri", "hexagone"]
    : cible === "triangle" ? ["carre", "rectangle", "cercle", "losange", "pentagone"]
    : ["carre", "rectangle", "triangle", "hexagone", "losange"];
  const formes = melange([cible, ...melange(voisins).slice(0, 3)]);
  const k = formes.indexOf(cible) + 1;
  const canvas = planche(formes.map((f) => ({ f, o: { penche: f === cible && f === "carre" ? Math.random() < 0.5 : false } })), "Quatre figures numérotées.");
  const x = LE[cible]!;
  return {
    text: tournure(REGARDE, [`Où est ${x} ?`, `Quel numéro porte ${x} ?`, `Trouve ${x}.`, `Montre ${x}.`, `Pic cherche ${x}. Lequel est-ce ?`, `Lequel est ${x} ?`]),
    ...qcm(fig(k), figs(4).filter((c) => c !== fig(k))),
    canvas,
    explanation: etapes(`on cherche ${POURQUOI[cible]}.`, `La figure ${k} a ${POURQUOI[cible]}.`, `C'est la figure ${k}.`),
  };
}

/** Combien de carrés (ou de triangles, de cercles) sur la planche ? */
function combienDeFormes(ctx: boolean) {
  const cible = un<Forme>(["carre", "triangle", "cercle"]);
  const autres: Forme[] = cible === "carre" ? ["rectangle", "losange", "triangle", "cercle"] : cible === "triangle" ? ["carre", "rectangle", "cercle", "losange"] : ["carre", "triangle", "rectangle", "hexagone"];
  const n = entre(1, 3);
  const formes = melange([...Array.from({ length: n }, () => cible), ...melange(autres).slice(0, 4 - n)]);
  const canvas = planche(formes.map((f) => ({ f, o: { penche: f === "carre" && Math.random() < 0.5 } })), "Quatre figures.");
  const pl = { carre: "carrés", triangle: "triangles", cercle: "cercles" }[cible as "carre" | "triangle" | "cercle"];
  const debut = ctx ? un([`${prenom()} range des gommettes.`, `${prenom()} trie les formes du jeu.`, `Sur la fresque de l'école, il y a ces formes.`, `${prenom()} fait un collage pour la fête.`, `Pic a caché ces formes dans le jardin.`]) : un(REGARDE);
  return {
    text: `${debut} ${un([`Combien de ${pl} vois-tu ?`, `Compte les ${pl}.`, `Il y a combien de ${pl} ?`])}`.trim(),
    ...qcmN(n, [n + 1, n - 1, 4, n + 2]),
    canvas,
    explanation: etapes(`on regarde chaque figure : est-ce ${UN[cible]} ?`, `Un carré penché reste un carré.`, `Il y a ${n} ${n > 1 ? pl : pl.slice(0, -1)}.`),
  };
}

/* ─────────────── ce1_figure_triangle_rectangle ─────────────── */
const MT = "ce1_figure_triangle_rectangle";

function trouverTriangleRectangle(ctx: boolean) {
  const formes = melange<Forme>(["triangle_rectangle", "triangle", "triangle"]);
  const k = formes.indexOf("triangle_rectangle") + 1;
  const canvas = planche(formes.map((f) => ({ f, o: { rotation: un([0, 0, 20, -20, 90, 180]) } })), "Trois triangles numérotés, sans code.");
  const debut = ctx
    ? un([`${prenom()} veut une voile de bateau avec un angle droit.`, `Le menuisier cherche une équerre en bois.`, `${prenom()} fabrique un fanion avec un angle droit.`, `Pour son toit de cabane, ${prenom()} veut un coin bien droit.`, `${prenom()} cherche une part de gâteau avec un angle droit.`])
    : un(REGARDE);
  const q = ctx ? [`Quel triangle choisir ?`, `Quelle figure prendre ?`, `Lequel convient ?`] : [`Lequel est un triangle rectangle ?`, `Où est le triangle rectangle ?`, `Quel triangle a un angle droit ?`, `Trouve le triangle rectangle.`];
  return {
    text: `${debut} ${un(q)}`.trim(),
    ...qcm(fig(k), figs(3).filter((c) => c !== fig(k))),
    canvas,
    explanation: etapes("on pose l'équerre dans chaque coin.", `Seule la figure ${k} a un coin qui colle à l'équerre.`, `C'est la figure ${k}.`),
  };
}

function estRectangle() {
  const oui = Math.random() < 0.5;
  const canvas = dessin([piece(oui ? "triangle_rectangle" : "triangle", { rotation: un([0, 15, -15, 90, 180, 30]) })], "Un triangle, sans code.");
  const juste = oui ? "oui, il a un angle droit" : "non, il n'a pas d'angle droit";
  const faux = oui ? ["non, il n'a pas d'angle droit", "non, il a quatre côtés", "oui, il a quatre angles droits"] : ["oui, il a un angle droit", "oui, il a trois côtés", "non, il a quatre côtés"];
  return {
    text: tournure(["", "Prends ton équerre.", "Vérifie avec l'équerre.", `${prenom()} montre ce triangle.`], ["Est-ce un triangle rectangle ?", "Ce triangle est-il rectangle ?", "A-t-il un angle droit ?", "Est-ce un triangle rectangle, oui ou non ?"]).trim(),
    ...qcm(juste, faux),
    canvas,
    explanation: etapes("on pose le coin de l'équerre sur chaque sommet.", oui ? "Un coin colle exactement à l'équerre." : "Aucun coin ne colle exactement à l'équerre.", cap(juste) + "."),
  };
}

function ouEstAngleDroit() {
  const [A, B, C] = lettres(3);
  const canvas = dessin([piece("triangle_rectangle", { noms: [A, B, C], rotation: un([0, 90, 180, 270, 20, -20]) })], "Un triangle rectangle nommé, sans code.");
  const question = un(["angle", "angle", "cotes", "sommets"] as const);
  if (question === "angle") {
    return {
      text: tournure([`Le triangle ${A}${B}${C} est rectangle.`, `${prenom()} a tracé le triangle ${A}${B}${C}.`, `Voici le triangle ${A}${B}${C}.`], ["Où est son angle droit ?", "À quel sommet est l'angle droit ?", "Quel sommet a l'angle droit ?"]),
      ...qcm(`en ${A}`, [`en ${B}`, `en ${C}`, "il n'y en a pas"]),
      canvas,
      explanation: etapes("on pose l'équerre dans chaque coin.", `Le coin ${A} colle à l'équerre.`, `L'angle droit est en ${A}.`),
    };
  }
  const mot = question === "cotes" ? "côtés" : "sommets";
  return {
    text: `Le triangle ${A}${B}${C} est rectangle en ${A}. ${un([`Combien a-t-il de ${mot} ?`, `Combien de ${mot} vois-tu ?`, `Il a combien de ${mot} ?`])}`,
    ...qcmN(3, [4, 2, 1]),
    canvas,
    explanation: etapes("un triangle rectangle reste un triangle.", `Ses ${mot} : ${question === "cotes" ? `[${A}${B}], [${B}${C}], [${C}${A}]` : `${A}, ${B}, ${C}`}.`, `Il en a 3.`),
  };
}

function vraiFauxTriangle() {
  const vrais = ["Il a un angle droit.", "Il a trois côtés.", "Il a trois sommets.", "C'est un triangle."];
  const faux = ["Il a quatre angles droits.", "Il a quatre côtés.", "Il a deux angles droits.", "C'est un rectangle.", "Il n'a pas de sommet."];
  const v = un(vrais);
  const canvas = dessin([piece("triangle_rectangle", { codes: true, rotation: un([0, 90, 180, 270, 25]) })], "Un triangle rectangle codé.");
  return {
    text: tournure([`${prenom()} a tracé ce triangle rectangle.`, "Voici un triangle rectangle.", "Regarde ce triangle rectangle."], ["Quelle phrase est vraie ?", "Quelle phrase est juste ?", "Que peut-on dire ?"]),
    ...qcm(v, melange(faux).slice(0, 3)),
    canvas,
    explanation: etapes("un triangle rectangle est un triangle avec UN angle droit.", "Il a 3 côtés, 3 sommets et un seul angle droit.", `La phrase vraie : « ${v} »`),
  };
}

/* ─────────────── ce1_figure_decrire ─────────────── */
const MD = "ce1_figure_decrire";
const A_COMPTER: Forme[] = ["carre", "rectangle", "triangle", "triangle_rectangle", "losange", "quadri", "pentagone", "hexagone", "maison"];

function compterCotes(ctx: boolean) {
  const f = un(A_COMPTER);
  const mot = un(["côtés", "sommets"]);
  const n = COTES[f];
  const canvas = dessin([piece(f, { penche: Math.random() < 0.3 })], "Une figure à décrire.");
  const q = [`Combien de ${mot} a cette figure ?`, `Compte ses ${mot}.`, `Combien de ${mot} vois-tu ?`, `Elle a combien de ${mot} ?`];
  return {
    text: ctx ? `${situ()} ${un(q)}` : tournure(REGARDE, q),
    ...qcmN(n, [n + 1, n - 1, n + 2, n * 2]),
    canvas,
    explanation: etapes(`on fait le tour de la figure en comptant les ${mot}.`, `Un côté est un trait, un sommet est un coin. Il y a autant de côtés que de sommets.`, `Il y a ${n} ${mot}.`),
  };
}

function nommerElement() {
  const f = un<Forme>(["carre", "rectangle", "triangle", "quadri", "pentagone", "maison", "cercle"]);
  const quoi = f === "cercle" ? "centre" : un(["côté", "sommet"]);
  const p = piece(f);
  if (quoi === "côté") p.segments.push({ a: "f0", b: "f1", couleur: "#dc2626", epais: true });
  else if (quoi === "sommet") p.points.push({ id: "rouge", x: p.points[1].x, y: p.points[1].y, nom: " ", couleur: "#dc2626" });
  else p.points[0] = { ...p.points[0], couleur: "#dc2626", nom: " ", cache: false };
  const canvas = dessin([p], "Une figure avec un élément en rouge.");
  const objet = quoi === "côté" ? "le trait rouge" : "le point rouge";
  const juste = quoi === "côté" ? "un côté" : quoi === "sommet" ? "un sommet" : "le centre";
  return {
    text: tournure(REGARDE, [`Comment s'appelle ${objet} ?`, `Comment appelle-t-on ${objet} ?`, `Que montre ${objet} ?`, `${cap(objet)}, c'est quoi ?`]).trim(),
    ...qcm(juste, ["un côté", "un sommet", "le centre", "un angle droit"].filter((x) => x !== juste)),
    canvas,
    explanation: etapes("un côté est un trait de la figure ; un sommet est un coin ; le centre est le milieu du cercle.", `Ici, ${objet} est ${juste}.`, `C'est ${juste}.`),
  };
}

function quelleFigureA() {
  const formes = melange<Forme>(un([["triangle", "carre", "pentagone"], ["triangle", "rectangle", "hexagone"], ["carre", "pentagone", "hexagone"], ["triangle", "pentagone", "hexagone"], ["triangle", "carre", "hexagone"]] as Forme[][]));
  const cible = un(formes);
  const k = formes.indexOf(cible) + 1;
  const n = COTES[cible];
  const mot = un(["côtés", "sommets"]);
  return {
    text: tournure(REGARDE, [`Quelle figure a ${n} ${mot} ?`, `Trouve la figure qui a ${n} ${mot}.`, `Laquelle a ${n} ${mot} ?`, `${prenom()} cherche une figure à ${n} ${mot}. Laquelle ?`]).trim(),
    ...qcm(fig(k), figs(3).filter((c) => c !== fig(k))),
    canvas: planche(formes.map((f) => ({ f })), "Trois figures numérotées."),
    explanation: etapes(`on compte les ${mot} de chaque figure.`, `La figure ${k} a ${n} ${mot}.`, `C'est la figure ${k}.`),
  };
}

/* ─────────────── ce1_angle_droit ─────────────── */
const MA = "ce1_angle_droit";
const PAS_DROITS = [35, 45, 55, 60, 125, 135, 145];

function angleEstDroit() {
  const droit = Math.random() < 0.5;
  const d = droit ? 90 : un(PAS_DROITS);
  const canvas = dessin([pieceAngle(d)], "Un angle, sans code.");
  const juste = droit ? "oui, il est droit" : "non, il n'est pas droit";
  return {
    text: tournure(["", "Prends ton équerre.", `${prenom()} pose son équerre.`, "Vérifie avec l'équerre."], ["Cet angle est-il droit ?", "Est-ce un angle droit ?", "Cet angle colle-t-il au coin de l'équerre ?", "Angle droit ou pas ?"]).trim(),
    ...qcm(juste, [droit ? "non, il n'est pas droit" : "oui, il est droit", "on ne peut pas savoir"]),
    canvas,
    explanation: etapes("on pose le coin de l'équerre sur le sommet, un bord sur un côté.", droit ? "L'autre côté colle à l'équerre." : d < 90 ? "L'angle est plus fermé que l'équerre." : "L'angle est plus ouvert que l'équerre.", cap(juste) + "."),
  };
}

function quelAngleDroit(ctx: boolean) {
  const n = un([3, 4]);
  const degs = melange([90, ...melange(PAS_DROITS).slice(0, n - 1)]);
  const k = degs.indexOf(90) + 1;
  const debut = ctx ? un([`Le menuisier vérifie ses coins.`, `${prenom()} plie des pailles.`, `La maîtresse a tracé ces angles.`, `${prenom()} ouvre les branches d'un compas.`, `Pic a posé des brindilles sur le sol.`]) : un(["Prends ton équerre.", "Vérifie avec l'équerre.", ""]);
  return {
    text: `${debut} ${un(["Quel angle est droit ?", "Lequel est un angle droit ?", "Où est l'angle droit ?", "Trouve l'angle droit."])}`.trim(),
    ...qcm(ang(k), angs(n).filter((c) => c !== ang(k))),
    canvas: plancheAngles(degs, "Des angles numérotés, sans code."),
    explanation: etapes("on pose l'équerre sur chaque angle.", `L'angle ${k} colle exactement au coin de l'équerre.`, `C'est l'angle ${k}.`),
  };
}

const AVEC_DROITS: Forme[] = ["carre", "rectangle", "triangle_rectangle", "triangle", "losange", "maison", "trapeze_rectangle", "quadri"];
function compterAnglesDroits(ctx: boolean) {
  const f = un(AVEC_DROITS);
  const n = ANGLES_DROITS[f];
  const canvas = dessin([piece(f, { penche: Math.random() < 0.4 })], "Une figure, sans code d'angle droit.");
  const debut = ctx
    ? un([`Le menuisier a scié cette planche.`, `${prenom()} a découpé ce morceau de carton.`, `Voici le plan du jardin de ${prenom()}.`, `La couturière a coupé ce tissu.`, `${prenom()} a construit ce cadre pour une photo.`, `Voici une dalle de la piscine.`])
    : un(REGARDE);
  return {
    text: `${debut} ${un(["Combien la figure a-t-elle d'angles droits ?", "Combien d'angles droits vois-tu ?", "Compte les angles droits de la figure.", "Il y a combien d'angles droits ?"])}`.trim(),
    ...qcm(String(n), ["0", "1", "2", "3", "4"].filter((x) => x !== String(n))),
    canvas,
    explanation: etapes("on pose l'équerre dans chaque coin, un par un.", n ? `${n} coin${n > 1 ? "s collent" : " colle"} à l'équerre.` : "Aucun coin ne colle à l'équerre.", `Il y a ${n} angle${n > 1 ? "s" : ""} droit${n > 1 ? "s" : ""}.`),
  };
}

/* ─────────────── ce1_angle_aigu_obtus ─────────────── */
const MO = "ce1_angle_aigu_obtus";
const nature = (d: number) => (d === 90 ? "un angle droit" : d < 90 ? "un angle aigu" : "un angle obtus");
const SITU_ANGLE = [
  (p: string) => `${p} ouvre ses ciseaux comme ça.`,
  (_: string) => `Pic le paille-en-queue ouvre son bec comme ça.`,
  (p: string) => `${p} ouvre un livre comme ça.`,
  (p: string) => `Les aiguilles de la pendule de ${p} font cet angle.`,
  (p: string) => `${p} ouvre l'éventail comme ça.`,
  (p: string) => `Au zoo, le crocodile ouvre la gueule comme ça. ${p} regarde.`,
  (p: string) => `${p} écarte les branches du compas comme ça.`,
  (p: string) => `Le toit de la cabane de ${p} fait cet angle.`,
  (p: string) => `${p} plie son bras comme ça.`,
  (_: string) => `Le pont-levis du château s'ouvre comme ça.`,
];

function natureAngle(ctx: boolean) {
  const d = un([30, 40, 50, 60, 70, 90, 110, 120, 135, 150]);
  const canvas = dessin([pieceAngle(d)], "Un angle, sans code.");
  const q = ["Quel angle est-ce ?", "Aigu, droit ou obtus ?", "Comment s'appelle cet angle ?", "Quel est cet angle ?"];
  return {
    text: ctx ? `${un(SITU_ANGLE)(prenom())} ${un(q)}` : tournure(["", "Compare avec l'équerre.", "Regarde cet angle."], q).trim(),
    ...qcm(nature(d), ["un angle aigu", "un angle droit", "un angle obtus"].filter((x) => x !== nature(d))),
    canvas,
    explanation: etapes("on compare l'angle au coin de l'équerre.", d === 90 ? "Il colle exactement au coin." : d < 90 ? "Il est plus fermé que le coin : il est pointu." : "Il est plus ouvert que le coin.", `C'est ${nature(d)}.`),
  };
}

function trouverAigu(ctx: boolean) {
  const degs = melange([un([30, 45, 60]), 90, un([120, 135, 150])]);
  const cible = un(["aigu", "obtus", "droit"] as const);
  const d = degs.find((x) => (cible === "droit" ? x === 90 : cible === "aigu" ? x < 90 : x > 90))!;
  const k = degs.indexOf(d) + 1;
  const debut = ctx ? un([`${prenom()} trace trois angles.`, `Trois amis ouvrent leurs ciseaux.`, `Pic a posé trois brindilles.`, `${prenom()} plie trois pailles.`, `La maîtresse dessine trois angles.`]) : "";
  const q = cible === "aigu" ? ["Quel angle est aigu ?", "Lequel est plus petit que l'angle droit ?", "Trouve l'angle aigu."] : cible === "obtus" ? ["Quel angle est obtus ?", "Lequel est plus grand que l'angle droit ?", "Trouve l'angle obtus."] : ["Quel angle est droit ?", "Trouve l'angle droit."];
  return {
    text: `${debut} ${un(q)}`.trim(),
    ...qcm(ang(k), angs(3).filter((c) => c !== ang(k))),
    canvas: plancheAngles(degs, "Trois angles numérotés, sans code."),
    explanation: etapes("on compare chaque angle au coin de l'équerre.", `L'angle ${k} est ${cible === "aigu" ? "plus fermé" : cible === "obtus" ? "plus ouvert" : "exactement comme le coin"}.`, `C'est l'angle ${k}.`),
  };
}

/* ─────────────── ce1_angle_droit_code ─────────────── */
const MC = "ce1_angle_droit_code";
const CODABLES: Forme[] = ["carre", "rectangle", "triangle_rectangle", "maison", "trapeze_rectangle"];

function compterCodes(ctx: boolean) {
  const f = un(CODABLES);
  const tous = SOMMETS_DROITS[f];
  const dessines = Math.random() < 0.5;
  const sur = dessines ? melange(tous).slice(0, entre(1, tous.length)) : [];
  const canvas = dessin([piece(f, { codes: dessines, codesSur: sur, penche: Math.random() < 0.3 })], dessines ? "Une figure avec des codes d'angle droit." : "Une figure sans code.");
  if (dessines) {
    const n = sur.length;
    return {
      text: tournure(ctx ? [`${prenom()} a codé sa figure.`, `La maîtresse a codé ce dessin.`] : REGARDE, ["Combien d'angles sont codés droits ?", "Combien de petits carrés de code vois-tu ?", "Combien d'angles droits sont codés ?"]).trim(),
      ...qcm(String(n), ["0", "1", "2", "3", "4"].filter((x) => x !== String(n))),
      canvas,
      explanation: etapes("le petit carré dans un coin dit : « cet angle est droit ».", `On compte les petits carrés : ${n}.`, `${n} angle${n > 1 ? "s sont codés" : " est codé"}.`),
    };
  }
  const n = tous.length;
  return {
    text: tournure(ctx ? [`${prenom()} vérifie ce dessin à l'équerre.`, `${prenom()} doit coder cette figure.`] : ["Vérifie avec l'équerre.", ""], ["Combien de petits carrés de code faut-il dessiner ?", "Combien d'angles droits faut-il coder ?", "Combien de codes faut-il ?"]).trim(),
    ...qcm(String(n), ["0", "1", "2", "3", "4"].filter((x) => x !== String(n))),
    canvas,
    explanation: etapes("on code chaque angle droit par un petit carré.", `Cette figure a ${n} angle${n > 1 ? "s" : ""} droit${n > 1 ? "s" : ""}.`, `Il faut ${n} code${n > 1 ? "s" : ""}.`),
  };
}

function quelAngleCode() {
  const f = un<Forme>(["triangle_rectangle", "trapeze_rectangle", "triangle_rectangle", "quadri"]);
  const noms = lettres(COTES[f]);
  if (f === "quadri") {
    // Aucun code : on ne sait pas tant qu'on n'a pas vérifié.
    const canvas = dessin([piece("quadri", { noms })], "Une figure nommée, sans code.");
    const X = un(noms);
    const juste = "on ne sait pas, il faut vérifier à l'équerre";
    return {
      text: tournure([`La figure ${noms.join("")} n'a aucun code.`, `${prenom()} n'a codé aucun angle.`], [`Que sait-on de l'angle en ${X} ?`, `L'angle en ${X} est-il droit ?`]),
      ...qcm(juste, ["il est droit, c'est sûr", "il n'est jamais droit", "il est droit s'il est en bas"]),
      canvas,
      explanation: etapes("le code dit qu'un angle est droit ; sans code, on vérifie.", "Pas de petit carré : le dessin ne dit rien.", "Il faut vérifier à l'équerre."),
    };
  }
  const k = un(SOMMETS_DROITS[f]);
  const canvas = dessin([piece(f, { noms, codes: true, codesSur: [k], rotation: un([0, 90, 180, 15, -15]) })], "Une figure nommée, un angle codé.");
  return {
    text: tournure([`Voici la figure ${noms.join("")}.`, `${prenom()} a codé un angle.`, "Regarde le code."], ["Quel angle est codé droit ?", "Où est l'angle codé droit ?", "Quel sommet porte le code ?"]),
    ...qcm(`l'angle en ${noms[k]}`, noms.filter((x) => x !== noms[k]).map((x) => `l'angle en ${x}`)),
    canvas,
    explanation: etapes("on cherche le petit carré dans un coin.", `Le petit carré est en ${noms[k]}.`, `L'angle en ${noms[k]} est droit.`),
  };
}

/* ─────────────── ce1_figure_proprietes ─────────────── */
const MP = "ce1_figure_proprietes";

function coteEnFace(niveau: 3 | 4) {
  const carre = Math.random() < 0.4;
  const noms = lettres(4);
  const [A, B, C, D] = noms;
  const L = entre(4, 9);
  const l = carre ? L : entre(2, L - 1);
  const longueurs: [number, string][] = carre ? [[0, `${L} cm`]] : [[0, `${L} cm`], [1, `${l} cm`]];
  const canvas = dessin([piece(carre ? "carre" : "rectangle", { noms, codes: true, longueurs, dims: [L, l], rotation: un([0, 0, 10, -10]) })], carre ? "Un carré codé, un côté mesuré." : "Un rectangle codé, deux côtés mesurés.");
  const nomFig = carre ? `le carré ${A}${B}${C}${D}` : `le rectangle ${A}${B}${C}${D}`;
  const cote = carre ? un([[C, D], [B, C], [D, A]]) : un([[C, D], [D, A]]);
  const juste = carre ? L : cote[0] === C ? L : l;
  const debut = niveau === 4 ? un([`${cap(prenom())} a tracé ${nomFig}.`, `Le jardinier dessine ${nomFig} pour un potager.`, `Voici ${nomFig}, le plan d'une cabane.`, `${prenom()} découpe ${nomFig} dans du carton.`]) : `Voici ${nomFig}.`;
  return {
    text: `${debut} ${un([`Combien mesure le côté [${cote[0]}${cote[1]}] ?`, `Quelle est la longueur de [${cote[0]}${cote[1]}] ?`, `[${cote[0]}${cote[1]}] mesure combien ?`])}`,
    ...qcmN(juste, [carre ? L * 2 : L + l, carre ? L + 1 : juste === L ? l : L, juste + 1, juste * 2], "cm"),
    canvas,
    explanation: etapes(carre ? "dans un carré, les 4 côtés ont la même longueur." : "dans un rectangle, les côtés d'en face ont la même longueur.", carre ? `[${cote[0]}${cote[1]}] mesure comme [${A}${B}].` : `[${cote[0]}${cote[1]}] est en face de [${cote[0] === C ? A + B : B + C}].`, `[${cote[0]}${cote[1]}] mesure ${juste} cm.`),
  };
}

function combienMesurent() {
  const carre = Math.random() < 0.5;
  const L = entre(3, 9);
  const canvas = dessin([piece(carre ? "carre" : "rectangle", { codes: true, egalites: true, longueurs: [[0, `${L} cm`]], rotation: un([0, 0, 15, -15]) })], "Une figure codée, un côté mesuré.");
  const n = carre ? 4 : 2;
  const quoi = carre ? "ce carré" : "ce rectangle";
  return {
    text: tournure([`${prenom()} a tracé ${quoi}.`, `Voici ${quoi}.`, `Regarde ${quoi}.`, `La maîtresse montre ${quoi}.`], [`Combien de côtés mesurent ${L} cm ?`, `Combien de ses côtés font ${L} cm ?`]),
    ...qcm(String(n), ["1", "2", "3", "4"].filter((x) => x !== String(n))),
    canvas,
    explanation: etapes("les petits traits sur les côtés montrent les longueurs égales.", carre ? "Dans un carré, les 4 côtés sont égaux." : "Dans un rectangle, le côté d'en face a la même longueur.", `${n} côtés mesurent ${L} cm.`),
  };
}

function phraseVraie() {
  const carre = Math.random() < 0.5;
  const canvas = dessin([piece(carre ? "carre" : "rectangle", { codes: true, egalites: true, penche: Math.random() < 0.5 })], "Une figure codée.");
  const vrais = carre ? ["Ses 4 côtés ont la même longueur.", "Il a 4 angles droits.", "Il a 4 sommets."] : ["Ses côtés d'en face ont la même longueur.", "Il a 4 angles droits.", "Il a 4 sommets."];
  const faux = carre ? ["Il a 2 angles droits.", "Il a 3 côtés.", "Ses côtés ont des longueurs différentes.", "Il n'a pas d'angle droit."] : ["Ses 4 côtés ont la même longueur.", "Il a 3 angles droits.", "Il a 5 sommets.", "Il n'a pas d'angle droit."];
  const v = un(vrais);
  return {
    text: tournure([`Voici ${carre ? "un carré" : "un rectangle"}.`, `${prenom()} a codé ${carre ? "ce carré" : "ce rectangle"}.`, `Regarde ${carre ? "ce carré" : "ce rectangle"} et ses codes.`], ["Quelle phrase est vraie ?", "Quelle phrase est juste ?", "Que peut-on dire ?"]),
    ...qcm(v, melange(faux).slice(0, 3)),
    canvas,
    explanation: etapes("on lit les codes : petits carrés = angles droits, petits traits = longueurs égales.", carre ? "4 angles droits et 4 côtés égaux." : "4 angles droits, côtés d'en face égaux.", `Vrai : « ${v} »`),
  };
}

/* ─────────────── ce1_figure_construire (sur quadrillage) ─────────────── */
const MB = "ce1_figure_construire";

/** Un carré ou un rectangle commencé sur quadrillage : le contour tracé s'arrête. */
function quadrillage(L: number, l: number, cotesTraces: number): CanvasFigure {
  const tour: [number, number][] = [[1 + l, 1], [1 + l, 1 + L], [1, 1 + L], [1, 1], [1 + l, 1]];
  return {
    kind: "figure_libre",
    size: { cellSize: 24, padding: 10 },
    grid: { rows: l + 2, cols: L + 2, filledCells: [] },
    perimeterPath: tour.slice(0, cotesTraces + 1),
    display: { showGrid: true, showFilled: false, showPerimeter: true, showVertices: false },
    colors: { perimeter: "#dc2626" },
  } as CanvasFigure;
}

function coteQuiManque(niveau: 3 | 4) {
  const carre = Math.random() < 0.5;
  const L = carre ? entre(3, 7) : entre(4, 9);
  const l = carre ? L : entre(2, Math.min(L - 1, 6));
  const traces = niveau === 3 ? 3 : 2;
  const canvas = quadrillage(L, l, traces);
  // Côtés tracés dans l'ordre : bas, droite, haut. Il manque la gauche (et le haut à ★4).
  const demande = traces === 3 ? "gauche" : un(["gauche", "haut"]);
  const juste = demande === "gauche" ? l : L;
  const nom = carre ? "un carré" : "un rectangle";
  const debut = niveau === 4
    ? un([`${prenom()} commence ${nom} pour le plan de sa cabane.`, `Le jardinier trace ${nom} pour un potager.`, `${prenom()} dessine ${nom} : le tapis de sa chambre.`, `Pour la kermesse, ${prenom()} trace ${nom}.`, `${prenom()} dessine ${nom} : l'aquarium des poissons rouges.`])
    : un([`${prenom()} trace ${nom} sur le quadrillage.`, `Voici ${nom} commencé.`, `${prenom()} a presque fini ${nom}.`]);
  const ou = demande === "gauche" ? "de gauche" : "du haut";
  return {
    text: `${debut} ${un([`Combien de carreaux doit mesurer le côté ${ou} ?`, `Le côté ${ou} fera combien de carreaux ?`, `Pour finir, combien de carreaux faut-il au côté ${ou} ?`])}`,
    ...qcmN(juste, [juste + 1, juste - 1, carre ? juste + 2 : demande === "gauche" ? L : l], "carreaux"),
    canvas,
    explanation: etapes(carre ? "dans un carré, les 4 côtés ont la même longueur." : "dans un rectangle, les côtés d'en face ont la même longueur.", `Le côté ${demande === "gauche" ? "de droite" : "du bas"} mesure ${juste} carreaux.`, `Il faut tracer ${juste} carreaux.`),
  };
}

/* ─────────────── ce1_figure_compas ─────────────── */
const MK = "ce1_figure_compas";

function ouPiquer() {
  const [O, A, B] = lettres(3);
  const p = piece("cercle", { centre: O });
  p.points.push({ id: "pA", x: 2, y: 0, nom: A }, { id: "pB", x: -1.41, y: 1.41, nom: B });
  const canvas = dessin([p], "Un cercle, son centre et deux points du cercle.");
  return {
    text: tournure(["", `${prenom()} veut tracer ce cercle.`, "Regarde ce cercle.", `${prenom()} veut refaire ce cercle.`, "Tu prends ton compas."], ["Où pique-t-on la pointe du compas ?", "Où poser la pointe du compas ?", "Où faut-il piquer la pointe ?"]).trim(),
    ...qcm(`au point ${O}`, [`au point ${A}`, `au point ${B}`, "n'importe où"]),
    canvas,
    explanation: etapes("la pointe du compas se pose au centre du cercle.", `Le centre est le point ${O}, au milieu.`, `On pique au point ${O}.`),
  };
}

function rayonDiametre() {
  const [O, A, B] = lettres(3);
  const r = entre(2, 6);
  const cas = un(["diametre", "rayon", "rayon"] as const);
  const p = piece("cercle", { centre: O });
  p.points.push({ id: "pA", x: 2, y: 0, nom: A });
  p.segments.push({ a: "fO", b: "pA", texte: `${r} cm`, couleur: "#dc2626" });
  if (cas === "rayon") p.points.push({ id: "pB", x: -1.41, y: -1.41, nom: B });
  else {
    p.points.push({ id: "pB", x: -2, y: 0, nom: B });
    p.segments.push({ a: "fO", b: "pB", pointille: true, couleur: "#64748b" });
  }
  const canvas = dessin([p], "Un cercle, son centre, un rayon mesuré.");
  const debut = un([`${prenom()} écarte son compas de ${r} cm.`, `${prenom()} a tracé ce cercle de centre ${O}.`, `${prenom()} trace une roue de vélo en carton.`, `Le chef cuisinier dessine une tarte ronde.`, `${prenom()} dessine le hublot d'une fusée.`]);
  if (cas === "rayon") {
    return {
      text: `${debut} ${un([`Combien mesure [${O}${B}] ?`, `Quelle est la longueur de [${O}${B}] ?`])}`,
      ...qcmN(r, [r * 2, r + 1, r - 1], "cm"),
      canvas,
      explanation: etapes("tous les points du cercle sont à la même distance du centre.", `${B} est sur le cercle, comme ${A}.`, `[${O}${B}] mesure ${r} cm.`),
    };
  }
  return {
    text: `${debut} ${un([`Combien mesure [${A}${B}], d'un bord à l'autre ?`, `Quelle est la longueur de [${A}${B}] ?`])}`,
    ...qcmN(2 * r, [r, 2 * r + 1, r + 2], "cm"),
    canvas,
    explanation: etapes(`[${A}${B}] passe par le centre ${O}.`, `${r} cm + ${r} cm = ${2 * r} cm.`, `[${A}${B}] mesure ${2 * r} cm.`),
  };
}

/* ─────────────── ce1_figure_defi ─────────────── */
const MF = "ce1_figure_defi";
const DEVINETTES: { f: Forme; t: string }[] = [
  { f: "carre", t: "J'ai 4 côtés de la même longueur et 4 angles droits." },
  { f: "carre", t: "Mes 4 côtés sont égaux. Mes 4 coins sont droits." },
  { f: "rectangle", t: "J'ai 4 angles droits, mais mes côtés ne sont pas tous égaux." },
  { f: "rectangle", t: "J'ai 4 angles droits. Deux de mes côtés sont plus longs." },
  { f: "triangle_rectangle", t: "J'ai 3 côtés et un angle droit." },
  { f: "triangle", t: "J'ai 3 côtés et aucun angle droit." },
  { f: "cercle", t: "Je n'ai ni côté ni sommet. On me trace au compas." },
  { f: "losange", t: "J'ai 4 côtés égaux, mais aucun angle droit." },
  { f: "hexagone", t: "J'ai 6 côtés et 6 sommets." },
];

function devinette() {
  const d = un(DEVINETTES);
  // Pas deux figures qui répondent à la même devinette.
  const pool = (["carre", "rectangle", "triangle_rectangle", "triangle", "cercle", "losange", "hexagone"] as Forme[]).filter((x) => x !== d.f && !(d.f === "triangle" && x === "triangle_rectangle"));
  const formes = melange([d.f, ...melange(pool).slice(0, 3)]);
  const k = formes.indexOf(d.f) + 1;
  const debut = un(["Devinette !", `${prenom()} pose une devinette.`, "Pic pose une devinette.", "Qui suis-je ?"]);
  return {
    text: `${debut} « ${d.t} » ${un(debut === "Qui suis-je ?" ? ["Quelle figure est-ce ?", "Laquelle est-ce ?"] : ["Quelle figure est-ce ?", "Qui suis-je ?", "Laquelle est-ce ?"])}`,
    ...qcm(fig(k), figs(4).filter((c) => c !== fig(k))),
    canvas: planche(formes.map((f) => ({ f, o: { codes: f === "carre" || f === "rectangle" || f === "triangle_rectangle" } })), "Quatre figures numérotées."),
    explanation: etapes("on vérifie chaque indice sur chaque figure.", `La figure ${k} a tout ce que dit la devinette.`, `C'est la figure ${k}.`),
  };
}

/** Des figures cachées dans une figure : compter TOUS les carrés, tous les triangles. */
function figuresCachees() {
  const cas = un(["bande2", "bande3", "carre4", "diag", "mediane"] as const);
  const pts: { id: string; x: number; y: number; cache: boolean }[] = [];
  const P = (id: string, x: number, y: number) => pts.push({ id, x, y, cache: true });
  const segments: { a: string; b: string }[] = [];
  let polys: string[][] = [];
  let juste = 0;
  let quoi = "carrés";
  let pourquoi = "";
  if (cas === "bande2" || cas === "bande3") {
    const n = cas === "bande2" ? 2 : 3;
    for (let i = 0; i <= n; i++) P(`h${i}`, i * 2, 2), P(`b${i}`, i * 2, 0);
    polys = [[`b0`, `b${n}`, `h${n}`, `h0`]];
    for (let i = 1; i < n; i++) segments.push({ a: `b${i}`, b: `h${i}` });
    juste = n;
    pourquoi = `${n} petits carrés ; la grande figure est un rectangle, pas un carré.`;
  } else if (cas === "carre4") {
    for (const [i, x] of [0, 2, 4].entries()) for (const [j, y] of [0, 2, 4].entries()) P(`q${i}${j}`, x, y);
    polys = [["q00", "q20", "q22", "q02"]];
    segments.push({ a: "q10", b: "q12" }, { a: "q01", b: "q21" });
    juste = 5;
    pourquoi = "4 petits carrés, et le grand carré tout autour : 4 + 1 = 5.";
  } else if (cas === "diag") {
    const h = un([2.4, 4]);
    P("a", 0, 0), P("b", 4, 0), P("c", 4, h), P("d", 0, h);
    polys = [["a", "b", "c", "d"]];
    segments.push({ a: "a", b: "c" });
    juste = 2;
    quoi = "triangles";
    pourquoi = "le trait coupe la figure en 2 triangles.";
  } else {
    P("a", 0, 0), P("b", 4, 0), P("c", 2, 3.2), P("m", 2, 0);
    polys = [["a", "b", "c"]];
    segments.push({ a: "c", b: "m" });
    juste = 3;
    quoi = "triangles";
    pourquoi = "2 petits triangles, et le grand triangle tout entier : 2 + 1 = 3.";
  }
  const canvas = { kind: "construction", points: pts, polygones: polys.map((s) => ({ sommets: s })), segments, largeur: 280, description: "Une figure découpée." } as CanvasFigure;
  return {
    text: `${un(["Attention, défi !", `${prenom()} lance un défi.`, "Pic a un défi pour toi.", "Regarde bien, c'est un piège."])} ${un([`Combien de ${quoi} vois-tu en tout ?`, `Compte tous les ${quoi}, même les grands.`, `Il y a combien de ${quoi} en tout ?`])}`,
    ...qcmN(juste, [juste - 1, juste + 1, juste + 2]),
    canvas,
    explanation: etapes(`on compte les petits ${quoi}, puis on cherche les grands.`, pourquoi, `Il y a ${juste} ${quoi}.`),
  };
}

/* ─────────────── la banque ─────────────── */
const nouveaux: TutorBankItemV4[] = [
  g(MR, "ce1_figure_reconnaitre_tpl_1", 3, "Compte les côtés. Une figure penchée garde son nom.", () => nommerFigure(true)),
  g(MR, "ce1_figure_reconnaitre_tpl_2", 2, "Regarde les côtés et les coins de chaque figure.", () => trouverDansPlanche()),
  g(MR, "ce1_figure_reconnaitre_tpl_3", 2, "Compte les côtés, puis regarde les coins.", () => nommerFigure(false)),
  g(MR, "ce1_figure_reconnaitre_tpl_4", 3, "Un carré penché reste un carré.", () => combienDeFormes(true)),

  g(MT, "ce1_figure_triangle_rectangle_tpl_1", 4, "Pose l'équerre dans chaque coin.", () => ouEstAngleDroit()),
  g(MT, "ce1_figure_triangle_rectangle_tpl_2", 3, "Pose l'équerre dans les coins de chaque triangle.", () => trouverTriangleRectangle(Math.random() < 0.5)),
  g(MT, "ce1_figure_triangle_rectangle_tpl_3", 3, "Un triangle rectangle a un angle droit.", () => estRectangle()),
  g(MT, "ce1_figure_triangle_rectangle_tpl_4", 4, "Un triangle rectangle : 3 côtés, un angle droit.", () => vraiFauxTriangle()),

  g(MD, "ce1_figure_decrire_tpl_1", 3, "Fais le tour de la figure en comptant.", () => compterCotes(true)),
  g(MD, "ce1_figure_decrire_tpl_2", 2, "Un côté est un trait, un sommet est un coin.", () => nommerElement()),
  g(MD, "ce1_figure_decrire_tpl_3", 3, "Compte sur chaque figure.", () => quelleFigureA()),
  g(MD, "ce1_figure_decrire_tpl_4", 2, "Fais le tour de la figure en comptant.", () => compterCotes(false)),

  g(MA, "ce1_angle_droit_tpl_1", 3, "Pose le coin de l'équerre sur chaque angle.", () => quelAngleDroit(Math.random() < 0.5)),
  g(MA, "ce1_angle_droit_tpl_2", 2, "Pose le coin de l'équerre sur le sommet.", () => angleEstDroit()),
  g(MA, "ce1_angle_droit_tpl_3", 4, "Vérifie chaque coin avec l'équerre.", () => compterAnglesDroits(true)),
  g(MA, "ce1_angle_droit_tpl_4", 3, "Vérifie chaque coin avec l'équerre.", () => compterAnglesDroits(false)),

  g(MO, "ce1_angle_aigu_obtus_tpl_1", 4, "Compare chaque angle au coin de l'équerre.", () => trouverAigu(Math.random() < 0.5)),
  g(MO, "ce1_angle_aigu_obtus_tpl_2", 3, "Plus fermé que l'équerre : aigu. Plus ouvert : obtus.", () => natureAngle(Math.random() < 0.5)),
  g(MO, "ce1_angle_aigu_obtus_tpl_3", 4, "Plus fermé que l'équerre : aigu. Plus ouvert : obtus.", () => natureAngle(true)),

  g(MC, "ce1_angle_droit_code_tpl_1", 4, "Le petit carré dans un coin veut dire : angle droit.", () => quelAngleCode()),
  g(MC, "ce1_angle_droit_code_tpl_2", 3, "Un petit carré par angle droit.", () => compterCodes(Math.random() < 0.5)),
  g(MC, "ce1_angle_droit_code_tpl_3", 4, "Un petit carré par angle droit.", () => compterCodes(true)),

  g(MP, "ce1_figure_proprietes_tpl_1", 4, "Les côtés d'en face ont la même longueur.", () => coteEnFace(4)),
  g(MP, "ce1_figure_proprietes_tpl_2", 4, "Lis les codes : petits carrés et petits traits.", () => (Math.random() < 0.5 ? phraseVraie() : combienMesurent())),
  g(MP, "ce1_figure_proprietes_tpl_3", 3, "Les côtés d'en face ont la même longueur.", () => coteEnFace(3)),
  g(MP, "ce1_figure_proprietes_tpl_4", 3, "Lis les codes : petits carrés et petits traits.", () => phraseVraie()),

  g(MB, "ce1_figure_construire_tpl_1", 4, "Le côté d'en face a la même longueur.", () => coteQuiManque(4)),
  g(MB, "ce1_figure_construire_tpl_2", 3, "Compte les carreaux du côté d'en face.", () => coteQuiManque(3)),

  g(MK, "ce1_figure_compas_tpl_1", 4, "Tous les points du cercle sont à la même distance du centre.", () => rayonDiametre()),
  g(MK, "ce1_figure_compas_tpl_2", 2, "La pointe se pose au centre.", () => ouPiquer()),

  g(MF, "ce1_figure_defi_tpl_1", 5, "Vérifie chaque indice sur chaque figure.", () => devinette()),
  g(MF, "ce1_figure_defi_tpl_2", 5, "Compte les petits, puis les grands.", () => figuresCachees()),
];

export const figuresPlanesBank: TutorBankItemV4[] = [...anciens.filter((i) => i.kind !== "template"), ...nouveaux];
