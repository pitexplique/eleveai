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
  QuadrilatereCanvasData,
  TriangleCanvasData,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";

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

export const figuresPlanesBank: TutorBankItemV4[] = [
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
