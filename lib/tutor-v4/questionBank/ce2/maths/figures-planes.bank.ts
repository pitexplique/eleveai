// lib/tutor-v4/questionBank/ce2/maths/figures-planes.bank.ts
//
// Les figures planes du CE2, écrites à la main. Sept micro-compétences qui
// passaient par le constructeur commun — celui qui servait « Combien de côtés
// a un triangle ? » à vingt micro-compétences de géométrie.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : reconnaître, nommer et
// décrire le carré, le rectangle, le triangle, le triangle rectangle, le
// losange et le cercle ; utiliser les propriétés d'angle droit et d'égalité de
// longueur ; construire à la règle, à l'équerre et au compas.
// ⛔ Pas de relation d'inclusion au cycle 2 : on ne demande PAS « un carré
// est-il un rectangle ? ». Cette question arrive au cycle 3. Ici on décrit une
// figure par ses côtés et ses angles, rien de plus.
//
// LE PIÈGE DE LA NOTION : la figure penchée. Un rectangle posé de travers
// cesse d'être un rectangle pour l'élève, et un carré posé sur la pointe
// devient un losange. Ce qui fait la figure, ce sont ses côtés et ses angles,
// pas la façon dont elle est posée sur la feuille. Toutes les figures de cette
// banque ne sont donc pas alignées sur le bord de la page.
// Le second : le compas. On l'ouvre du RAYON, pas du diamètre, et sa pointe se
// plante sur le centre.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

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

// La bonne réponse est mise de côté, trois pièges distincts sont tirés ensuite,
// puis on mélange. L'écrire autrement a rendu des questions impossibles à
// réussir dans 79 banques : voir scripts/verifier-generateurs.mjs.
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

/* ─── Les figures, posées droit ET de travers ────────────────────────────────
   Les coordonnées penchées sont calculées sur la direction (4, 3) : les côtés
   tombent alors sur des longueurs entières (160 et 90) et l'angle est droit au
   pixel près. Une figure « presque » rectangle apprendrait le contraire de ce
   qu'on veut. */

function rectangleDroit(): QuadrilatereCanvasData {
  return quadrilatere({
    points: {
      A: { x: 55, y: 60 },
      B: { x: 245, y: 60 },
      C: { x: 245, y: 170 },
      D: { x: 55, y: 170 },
    },
    display: { showPoints: true, showLabels: true, showSides: false },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      equalSides: [["AB", "CD"], ["BC", "DA"]],
    },
  });
}

function rectanglePenche(): QuadrilatereCanvasData {
  return quadrilatere({
    points: {
      A: { x: 103, y: 31 },
      B: { x: 231, y: 127 },
      C: { x: 177, y: 199 },
      D: { x: 49, y: 103 },
    },
    display: { showPoints: true, showLabels: true, showSides: false },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      equalSides: [["AB", "CD"], ["BC", "DA"]],
    },
  });
}

function carreDroit(): QuadrilatereCanvasData {
  return quadrilatere({
    points: {
      A: { x: 90, y: 55 },
      B: { x: 210, y: 55 },
      C: { x: 210, y: 175 },
      D: { x: 90, y: 175 },
    },
    display: { showPoints: true, showLabels: true, showSides: false },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
    },
  });
}

/** Un carré posé sur la pointe : quatre côtés égaux, quatre angles droits. */
function carreSurPointe(): QuadrilatereCanvasData {
  return quadrilatere({
    points: {
      A: { x: 150, y: 45 },
      B: { x: 225, y: 120 },
      C: { x: 150, y: 195 },
      D: { x: 75, y: 120 },
    },
    display: { showPoints: true, showLabels: true, showSides: false },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
    },
  });
}

/** Un vrai losange : quatre côtés égaux, AUCUN angle droit. */
function losange(): QuadrilatereCanvasData {
  return quadrilatere({
    points: {
      A: { x: 150, y: 45 },
      B: { x: 250, y: 120 },
      C: { x: 150, y: 195 },
      D: { x: 50, y: 120 },
    },
    display: { showPoints: true, showLabels: true, showSides: false },
    marks: {
      equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
    },
  });
}

export const figuresPlanesBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_FIGURE_RECONNAITRE — carré, rectangle, triangle, cercle
     Le piège de la figure penchée est ici, et il revient
     partout ensuite.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_figure_reconnaitre_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle figure a quatre côtés de la même longueur ET quatre angles droits ?",
    format: "qcm",
    choices: ["le carré", "le rectangle", "le triangle", "le cercle"],
    expected: ["le carré"],
    comparator: "mcq_exact",
    hint: "Il faut les deux conditions à la fois : les côtés ET les angles.",
    explanation: exp(
      "Le carré a quatre côtés égaux et quatre angles droits.",
      "On vérifie les deux conditions l'une après l'autre.",
      "Le rectangle a bien quatre angles droits, mais ses côtés ne sont pas tous égaux. Le carré, lui, a les deux.",
      "C'est le carré.",
    ),
    tags: ["ce2", "figures_planes", "reconnaitre", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_reconnaitre_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Cette figure est posée de travers. Ses quatre angles sont droits et ses côtés opposés sont de même longueur. Est-ce un rectangle ?",
    format: "qcm",
    choices: [
      "oui, c'est un rectangle",
      "non, il est penché",
      "non, c'est un losange",
      "on ne peut pas savoir",
    ],
    expected: ["oui, c'est un rectangle"],
    comparator: "mcq_exact",
    hint: "Tourne la feuille : la figure change-t-elle ?",
    explanation: exp(
      "Ce qui fait une figure, ce sont ses côtés et ses angles — jamais la façon dont elle est posée.",
      "On regarde les angles et les longueurs, on ignore l'inclinaison.",
      "Ses quatre angles sont droits et ses côtés opposés sont égaux : c'est un rectangle. En tournant la feuille, il se retrouverait bien droit sans avoir changé.",
      "Oui, c'est un rectangle.",
    ),
    tags: ["ce2", "figures_planes", "reconnaitre", "piege", "qcm", "canvas"],
    canvas: rectanglePenche(),
  },
  {
    kind: "fixed",
    id: "ce2_figure_reconnaitre_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de côtés a un cercle ?",
    format: "qcm",
    choices: [
      "aucun, c'est une ligne courbe",
      "un seul",
      "quatre",
      "une infinité de tout petits côtés",
    ],
    expected: ["aucun, c'est une ligne courbe"],
    comparator: "mcq_exact",
    hint: "Un côté est un segment, c'est-à-dire un trait droit.",
    explanation: exp(
      "Un côté est un segment : un trait droit entre deux sommets.",
      "On cherche les traits droits et les coins de la figure.",
      "Le cercle n'a ni trait droit ni coin : c'est une ligne courbe fermée. Il n'a donc aucun côté, et aucun sommet non plus.",
      "Le cercle n'a aucun côté.",
    ),
    tags: ["ce2", "figures_planes", "reconnaitre", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_figure_reconnaitre_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les côtés, puis regarde les angles.",
    tags: ["ce2", "figures_planes", "reconnaitre", "template"],
    generate: () => {
      const figures = [
        { nom: "le carré", desc: "quatre côtés de même longueur et quatre angles droits" },
        { nom: "le rectangle", desc: "quatre angles droits, mais seulement les côtés opposés de même longueur" },
        { nom: "le losange", desc: "quatre côtés de même longueur, mais aucun angle droit" },
        { nom: "le triangle", desc: "trois côtés et trois sommets" },
        { nom: "le cercle", desc: "aucun côté, une seule ligne courbe fermée" },
      ] as const;
      const f = randomChoice(figures);
      return {
        text: `Quelle figure a ${f.desc} ?`,
        format: "qcm",
        choices: makeChoices(f.nom, figures.map((x) => x.nom)),
        expected: [f.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "On décrit une figure par le nombre de ses côtés, leurs longueurs et ses angles.",
          "On lit la description morceau par morceau et on élimine les figures qui ne collent pas.",
          `${f.nom.charAt(0).toUpperCase() + f.nom.slice(1)} est la seule figure qui a ${f.desc}.`,
          `C'est ${f.nom}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_figure_reconnaitre_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde les codages : les petits carrés marquent les angles droits, les traits marquent les côtés égaux.",
    tags: ["ce2", "figures_planes", "reconnaitre", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        { nom: "un carré", canvas: carreDroit() },
        { nom: "un carré", canvas: carreSurPointe() },
        { nom: "un rectangle", canvas: rectangleDroit() },
        { nom: "un rectangle", canvas: rectanglePenche() },
        { nom: "un losange", canvas: losange() },
      ]);
      return {
        text: "Quelle est cette figure ?",
        format: "qcm",
        choices: makeChoices(cas.nom, [
          "un carré",
          "un rectangle",
          "un losange",
          "un triangle",
        ]),
        expected: [cas.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "On reconnaît une figure à ses codages : les petits carrés marquent les angles droits, les traits sur les côtés marquent les longueurs égales.",
          "On compte d'abord les angles droits, puis les côtés de même longueur — sans se laisser troubler par l'inclinaison.",
          cas.nom === "un carré"
            ? "Quatre angles droits et quatre côtés égaux : c'est un carré, qu'il soit posé à plat ou sur la pointe."
            : cas.nom === "un rectangle"
              ? "Quatre angles droits, et seulement les côtés opposés égaux : c'est un rectangle, même penché."
              : "Quatre côtés égaux mais aucun angle droit : c'est un losange.",
          `C'est ${cas.nom}.`,
        ),
        canvas: cas.canvas,
      };
    },
  },

  /* =========================================================
     CE2_FIGURE_TRIANGLE_RECTANGLE
     L'angle droit n'est pas toujours en bas à gauche.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_figure_triangle_rectangle_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_triangle_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce qui fait qu'un triangle est un triangle RECTANGLE ?",
    format: "qcm",
    choices: [
      "il a un angle droit",
      "il a trois angles droits",
      "il a la forme d'un rectangle",
      "ses trois côtés sont égaux",
    ],
    expected: ["il a un angle droit"],
    comparator: "mcq_exact",
    hint: "Le mot « rectangle » vient de « angle droit ».",
    explanation: exp(
      "Un triangle rectangle est un triangle qui possède un angle droit.",
      "On cherche le coin qui rentre exactement dans l'équerre.",
      "Il suffit d'UN angle droit sur les trois. Le mot « rectangle » ne veut pas dire qu'il ressemble à un rectangle, il annonce l'angle droit.",
      "Il a un angle droit.",
    ),
    tags: ["ce2", "figures_planes", "triangle_rectangle", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_triangle_rectangle_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_triangle_rectangle",
    difficulty: 4,
    theme: "neutral",
    text: "Sur ce triangle, l'angle droit est marqué en haut, au sommet A. Est-ce quand même un triangle rectangle ?",
    format: "qcm",
    choices: [
      "oui, la place de l'angle droit ne change rien",
      "non, l'angle droit doit être en bas",
      "non, il est trop penché",
      "on ne peut pas savoir",
    ],
    expected: ["oui, la place de l'angle droit ne change rien"],
    comparator: "mcq_exact",
    hint: "Ce qui compte, c'est qu'il y AIT un angle droit, pas où il se trouve.",
    explanation: exp(
      "Un triangle rectangle est un triangle qui possède un angle droit, où qu'il se trouve.",
      "On cherche le petit carré du codage, sans se demander s'il est en haut ou en bas.",
      "L'angle droit est au sommet A : le triangle est rectangle. En tournant la feuille, cet angle se retrouverait en bas sans que la figure ait changé.",
      "Oui, c'est bien un triangle rectangle.",
    ),
    tags: ["ce2", "figures_planes", "triangle_rectangle", "piege", "qcm", "canvas"],
    canvas: triangle({
      points: { A: { x: 90, y: 45 }, B: { x: 240, y: 105 }, C: { x: 66, y: 105 } },
      display: { showPoints: true, showLabels: true, showSides: false },
      marks: { rightAngleAt: "A" },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_figure_triangle_rectangle_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_triangle_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Au maximum, combien un triangle peut-il avoir d'angles droits ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Essaie d'en dessiner deux : les deux côtés partiraient tout droit sans jamais se rejoindre.",
    explanation: exp(
      "Un triangle a trois angles, et un seul peut être droit.",
      "On essaie de tracer deux angles droits sur la même base et on regarde ce qui se passe.",
      "Avec deux angles droits, les deux côtés montent tout droit, parallèles : ils ne se rejoignent jamais et la figure ne se referme pas. Un triangle rectangle a donc exactement un angle droit.",
      "Au maximum 1.",
    ),
    tags: ["ce2", "figures_planes", "triangle_rectangle", "remarquable"],
  },
  {
    kind: "template",
    id: "ce2_figure_triangle_rectangle_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_triangle_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le petit carré du codage, où qu'il soit.",
    tags: ["ce2", "figures_planes", "triangle_rectangle", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        {
          sommet: "A",
          points: { A: { x: 80, y: 50 }, B: { x: 230, y: 50 }, C: { x: 80, y: 175 } },
        },
        {
          sommet: "B",
          points: { A: { x: 70, y: 60 }, B: { x: 225, y: 60 }, C: { x: 225, y: 180 } },
        },
        {
          sommet: "C",
          points: { A: { x: 70, y: 55 }, B: { x: 230, y: 175 }, C: { x: 70, y: 175 } },
        },
      ] as const);
      return {
        text: "Sur ce triangle rectangle, à quel sommet se trouve l'angle droit ?",
        format: "qcm",
        choices: makeChoices(cas.sommet, ["A", "B", "C", "il n'y en a pas"]),
        expected: [cas.sommet],
        comparator: "mcq_exact",
        explanation: exp(
          "L'angle droit d'un triangle rectangle est marqué par un petit carré au sommet.",
          "On repère le codage, sans supposer qu'il est forcément en bas à gauche.",
          `Le petit carré est dessiné au sommet ${cas.sommet} : c'est là que se trouve l'angle droit.`,
          `L'angle droit est au sommet ${cas.sommet}.`,
        ),
        canvas: triangle({
          points: cas.points,
          display: { showPoints: true, showLabels: true, showSides: false },
          marks: { rightAngleAt: cas.sommet },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_figure_triangle_rectangle_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_triangle_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "L'équerre sert à vérifier les angles droits.",
    tags: ["ce2", "figures_planes", "triangle_rectangle", "template"],
    generate: () => {
      const angles = randomInt(0, 1);
      const bonne = angles === 1 ? "un triangle rectangle" : "un triangle quelconque";
      return {
        text:
          angles === 1
            ? "Léa vérifie les trois coins d'un triangle avec son équerre. Un seul coin rentre exactement dans l'équerre. Quelle sorte de triangle a-t-elle ?"
            : "Léa vérifie les trois coins d'un triangle avec son équerre. Aucun coin ne rentre dans l'équerre. Quelle sorte de triangle a-t-elle ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          "un triangle rectangle",
          "un triangle quelconque",
          "un carré",
          "un losange",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un triangle rectangle possède un angle droit ; sans angle droit, le triangle est quelconque.",
          "On pose l'équerre dans chaque coin : celui qui la remplit exactement est un angle droit.",
          angles === 1
            ? "Un coin rentre exactement dans l'équerre : c'est un angle droit, donc le triangle est rectangle."
            : "Aucun coin ne rentre dans l'équerre : il n'y a pas d'angle droit, le triangle est quelconque.",
          `C'est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FIGURE_LOSANGE
     Quatre côtés égaux — et c'est tout ce qu'on exige.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_figure_losange_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_losange",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui caractérise un losange ?",
    format: "qcm",
    choices: [
      "ses quatre côtés sont de la même longueur",
      "ses quatre angles sont droits",
      "il a trois côtés",
      "il n'a aucun côté droit",
    ],
    expected: ["ses quatre côtés sont de la même longueur"],
    comparator: "mcq_exact",
    hint: "Pense au carreau des cartes à jouer.",
    explanation: exp(
      "Un losange est un quadrilatère dont les quatre côtés ont la même longueur.",
      "On mesure les quatre côtés, ou on lit les codages qui les marquent égaux.",
      "C'est la seule condition. Un losange peut être bien pointu ou presque carré : ce qui compte, c'est que ses quatre côtés soient égaux.",
      "Ses quatre côtés sont de la même longueur.",
    ),
    tags: ["ce2", "figures_planes", "losange", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_losange_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_losange",
    difficulty: 4,
    theme: "neutral",
    text: "Un losange a-t-il forcément des angles droits ?",
    format: "qcm",
    choices: [
      "non, ses angles peuvent être pointus ou larges",
      "oui, les quatre",
      "oui, deux seulement",
      "on ne peut pas savoir",
    ],
    expected: ["non, ses angles peuvent être pointus ou larges"],
    comparator: "mcq_exact",
    hint: "Prends un losange en carton et écrase-le un peu : les côtés changent-ils de longueur ?",
    explanation: exp(
      "Le losange n'impose rien à ses angles : il impose seulement que ses quatre côtés soient égaux.",
      "On regarde les côtés d'abord, les angles ensuite.",
      "En écrasant un losange, ses angles s'aplatissent mais ses côtés gardent la même longueur : c'est toujours un losange. Deux angles deviennent pointus, deux autres larges.",
      "Non, un losange n'a pas forcément d'angles droits.",
    ),
    tags: ["ce2", "figures_planes", "losange", "piege", "qcm", "canvas"],
    canvas: losange(),
  },
  {
    kind: "fixed",
    id: "ce2_figure_losange_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_losange",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un jeu de cartes, quelle enseigne a la forme d'un losange ?",
    format: "qcm",
    choices: ["le carreau", "le cœur", "le pique", "le trèfle"],
    expected: ["le carreau"],
    comparator: "mcq_exact",
    hint: "C'est la rouge qui a quatre coins.",
    explanation: exp(
      "Le losange est un quadrilatère à quatre côtés égaux.",
      "On cherche l'enseigne qui a quatre côtés droits de même longueur.",
      "Le carreau est un losange posé sur la pointe. Le cœur, le pique et le trèfle ont des bords courbes.",
      "C'est le carreau.",
    ),
    tags: ["ce2", "figures_planes", "losange", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_figure_losange_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_losange",
    difficulty: 3,
    theme: "neutral",
    hint: "Côtés d'abord, angles ensuite.",
    tags: ["ce2", "figures_planes", "losange", "template", "canvas"],
    generate: () => {
      const estLosange = randomChoice([true, false]);
      return {
        text: estLosange
          ? "Cette figure a ses quatre côtés de même longueur, et aucun angle droit. Comment s'appelle-t-elle ?"
          : "Cette figure a ses quatre côtés de même longueur ET quatre angles droits. Comment s'appelle-t-elle ?",
        format: "qcm",
        choices: makeChoices(estLosange ? "un losange" : "un carré", [
          "un losange",
          "un carré",
          "un rectangle",
          "un triangle",
        ]),
        expected: [estLosange ? "un losange" : "un carré"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le losange n'exige que des côtés égaux ; le carré exige en plus quatre angles droits.",
          "On vérifie les côtés, puis les angles.",
          estLosange
            ? "Quatre côtés égaux, mais pas d'angle droit : c'est un losange."
            : "Quatre côtés égaux ET quatre angles droits : c'est un carré, même s'il est posé sur la pointe.",
          `C'est ${estLosange ? "un losange" : "un carré"}.`,
        ),
        canvas: estLosange ? losange() : carreSurPointe(),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_figure_losange_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_losange",
    difficulty: 3,
    theme: "neutral",
    hint: "Tous les côtés sont égaux : un seul suffit à les connaître tous.",
    tags: ["ce2", "figures_planes", "losange", "template"],
    generate: () => {
      const cote = randomInt(3, 12);
      return {
        text: `Un losange a un côté de ${cote} cm. Combien mesure chacun de ses trois autres côtés ?`,
        format: "short",
        expected: [String(cote)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un losange, les quatre côtés ont la même longueur.",
          "On lit la longueur donnée : elle vaut pour les quatre côtés.",
          `Un côté mesure ${cote} cm, donc les trois autres aussi : ${cote} cm chacun.`,
          `Chacun mesure ${cote} cm.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FIGURE_PROPRIETES — angles droits et côtés égaux
     Ce que le BO appelle « utiliser les propriétés » : lire
     un codage et en tirer une longueur.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_figure_proprietes_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un rectangle, que peut-on dire des côtés opposés ?",
    format: "qcm",
    choices: [
      "ils ont la même longueur",
      "ils sont tous les quatre égaux",
      "ils sont de longueurs différentes",
      "on ne peut rien en dire",
    ],
    expected: ["ils ont la même longueur"],
    comparator: "mcq_exact",
    hint: "Regarde la porte de la classe : le haut et le bas.",
    explanation: exp(
      "Dans un rectangle, les côtés opposés — ceux qui se font face — ont la même longueur.",
      "On regarde les côtés deux par deux : ceux d'en face vont ensemble.",
      "La longueur du haut est égale à celle du bas, et la hauteur de gauche à celle de droite. En revanche la longueur et la hauteur, elles, sont différentes.",
      "Les côtés opposés ont la même longueur.",
    ),
    tags: ["ce2", "figures_planes", "proprietes", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_proprietes_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_proprietes",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « dans un rectangle, les quatre côtés sont égaux ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, seulement les côtés opposés",
      "oui",
      "non, aucun côté n'est égal",
      "oui, quand il est penché",
    ],
    expected: ["non, seulement les côtés opposés"],
    comparator: "mcq_exact",
    hint: "Une porte est-elle aussi large que haute ?",
    explanation: exp(
      "Dans un rectangle, ce sont les côtés OPPOSÉS qui sont égaux, deux par deux.",
      "On compare le haut au bas, puis la gauche à la droite — jamais le haut à la gauche.",
      "Une porte est bien plus haute que large : c'est pourtant un rectangle. Quand les quatre côtés sont égaux, la figure porte un autre nom : c'est un carré.",
      "Non : seulement les côtés opposés.",
    ),
    tags: ["ce2", "figures_planes", "proprietes", "piege", "qcm", "canvas"],
    canvas: rectangleDroit(),
  },
  {
    kind: "fixed",
    id: "ce2_figure_proprietes_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "Un carré a un côté de 7 cm. Combien mesure le côté d'en face ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Dans un carré, les quatre côtés sont égaux.",
    explanation: exp(
      "Dans un carré, les quatre côtés ont la même longueur.",
      "On lit la longueur d'un côté : elle vaut pour tous les autres.",
      "Un côté mesure 7 cm, donc les quatre mesurent 7 cm — celui d'en face comme les deux autres.",
      "Il mesure 7 cm.",
    ),
    tags: ["ce2", "figures_planes", "proprietes"],
  },
  {
    kind: "template",
    id: "ce2_figure_proprietes_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un rectangle, le côté d'en face a la même longueur.",
    tags: ["ce2", "figures_planes", "proprietes", "template", "canvas"],
    generate: () => {
      const longueur = randomInt(6, 14);
      const largeur = randomInt(2, 5);
      const cherche = randomChoice(["longueur", "largeur"] as const);
      return {
        text: `Dans ce rectangle, la longueur mesure ${longueur} cm et la largeur ${largeur} cm. Combien mesure le côté opposé à la ${cherche} ?`,
        format: "short",
        expected: [String(cherche === "longueur" ? longueur : largeur)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un rectangle, les côtés opposés ont la même longueur.",
          "On repère le côté qui fait face à celui qu'on cherche, et on lui donne la même mesure.",
          `Le côté opposé à la ${cherche} mesure autant qu'elle : ${cherche === "longueur" ? longueur : largeur} cm.`,
          `Il mesure ${cherche === "longueur" ? longueur : largeur} cm.`,
        ),
        canvas: rectangleDroit(),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_figure_proprietes_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les coins marqués d'un petit carré.",
    tags: ["ce2", "figures_planes", "proprietes", "template"],
    generate: () => {
      const cas = randomChoice([
        { figure: "un carré", angles: 4, cotes: "les quatre côtés sont égaux" },
        { figure: "un rectangle", angles: 4, cotes: "seuls les côtés opposés sont égaux" },
        { figure: "un losange", angles: 0, cotes: "les quatre côtés sont égaux" },
        { figure: "un triangle rectangle", angles: 1, cotes: "les côtés peuvent être tous différents" },
      ] as const);
      return {
        text: `Combien d'angles droits y a-t-il dans ${cas.figure} ?`,
        format: "short",
        expected: [String(cas.angles)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque figure a son nombre d'angles droits, indépendant de la longueur de ses côtés.",
          "On pose l'équerre dans chaque coin et on compte ceux qu'elle remplit exactement.",
          `Dans ${cas.figure}, il y a ${cas.angles} angle${cas.angles > 1 ? "s" : ""} droit${cas.angles > 1 ? "s" : ""}. Pour les côtés, ${cas.cotes}.`,
          `Il y en a ${cas.angles}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FIGURE_CONSTRUIRE — règle, équerre, compas
     Chaque instrument fait une chose et une seule.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_figure_construire_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_construire",
    difficulty: 1,
    theme: "neutral",
    text: "Quel instrument sert à vérifier qu'un angle est droit ?",
    format: "qcm",
    choices: ["l'équerre", "le compas", "la gomme", "le crayon"],
    expected: ["l'équerre"],
    comparator: "mcq_exact",
    hint: "C'est l'instrument qui a lui-même un coin bien carré.",
    explanation: exp(
      "L'équerre porte un angle droit : elle sert à en tracer et à en vérifier.",
      "On pose le coin de l'équerre dans l'angle à vérifier.",
      "Si l'angle remplit exactement le coin de l'équerre, sans laisser de jour ni dépasser, c'est un angle droit. La règle mesure, le compas trace des cercles.",
      "C'est l'équerre.",
    ),
    tags: ["ce2", "figures_planes", "construire", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_construire_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Pour construire un carré de 5 cm de côté, de quels instruments a-t-on besoin ?",
    format: "qcm",
    choices: [
      "la règle graduée et l'équerre",
      "le compas seulement",
      "la règle graduée seulement",
      "l'équerre seulement",
    ],
    expected: ["la règle graduée et l'équerre"],
    comparator: "mcq_exact",
    hint: "Il faut deux choses : la bonne longueur, et les angles droits.",
    explanation: exp(
      "Un carré demande deux vérifications : des côtés de même longueur et des angles droits.",
      "On liste ce que la figure impose, puis on choisit l'instrument de chaque contrainte.",
      "La règle graduée donne les 5 cm de chaque côté ; l'équerre garantit les quatre angles droits. Sans équerre, on obtiendrait un losange.",
      "Il faut la règle graduée et l'équerre.",
    ),
    tags: ["ce2", "figures_planes", "construire", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_construire_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève trace un quadrilatère avec quatre côtés de 5 cm, mais sans utiliser l'équerre. Qu'obtient-il à coup sûr ?",
    format: "qcm",
    choices: [
      "un quadrilatère à quatre côtés égaux, mais peut-être pas un carré",
      "toujours un carré",
      "toujours un rectangle",
      "un triangle",
    ],
    expected: ["un quadrilatère à quatre côtés égaux, mais peut-être pas un carré"],
    comparator: "mcq_exact",
    hint: "Les côtés sont bons. Et les angles ?",
    explanation: exp(
      "Des côtés égaux ne suffisent pas à faire un carré : il faut aussi les angles droits.",
      "On vérifie séparément ce que garantit chaque instrument.",
      "Sans équerre, rien ne force les angles : la figure peut pencher et devenir un losange. Les quatre côtés font bien 5 cm, mais ce n'est un carré que si les angles sont droits.",
      "Il obtient un quadrilatère à quatre côtés égaux, pas forcément un carré.",
    ),
    tags: ["ce2", "figures_planes", "construire", "piege", "qcm", "canvas"],
    canvas: losange(),
  },
  {
    kind: "template",
    id: "ce2_figure_construire_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_construire",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque instrument fait une chose et une seule.",
    tags: ["ce2", "figures_planes", "construire", "template"],
    generate: () => {
      const usages = [
        { quoi: "tracer un trait bien droit", instrument: "la règle" },
        { quoi: "mesurer une longueur en centimètres", instrument: "la règle graduée" },
        { quoi: "vérifier qu'un angle est droit", instrument: "l'équerre" },
        { quoi: "tracer un cercle", instrument: "le compas" },
        { quoi: "reporter une longueur sans la mesurer", instrument: "le compas" },
      ] as const;
      const u = randomChoice(usages);
      return {
        text: `Quel instrument sert à ${u.quoi} ?`,
        format: "qcm",
        choices: makeChoices(u.instrument, [
          "la règle",
          "la règle graduée",
          "l'équerre",
          "le compas",
        ]),
        expected: [u.instrument],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque instrument de géométrie a son rôle : la règle trace droit, l'équerre garantit l'angle droit, le compas trace des cercles et reporte des longueurs.",
          "On regarde ce que la tâche demande, puis on choisit l'instrument qui le fait.",
          `Pour ${u.quoi}, on prend ${u.instrument}.`,
          `C'est ${u.instrument}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_figure_construire_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Liste ce que la figure impose : des longueurs, des angles droits, ou les deux.",
    tags: ["ce2", "figures_planes", "construire", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          figure: "un carré",
          bonne: "la règle graduée et l'équerre",
          pourquoi: "il faut des côtés de même longueur ET des angles droits",
        },
        {
          figure: "un rectangle",
          bonne: "la règle graduée et l'équerre",
          pourquoi: "il faut des longueurs précises ET des angles droits",
        },
        {
          figure: "un cercle",
          bonne: "le compas",
          pourquoi: "seul le compas garde le même écartement tout autour du centre",
        },
        {
          figure: "un losange",
          bonne: "la règle graduée et le compas",
          pourquoi: "il faut quatre côtés égaux, et le compas reporte la même longueur sans avoir à mesurer",
        },
      ] as const);
      return {
        text: `Pour construire ${cas.figure}, quels instruments faut-il ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "la règle graduée et l'équerre",
          "le compas",
          "la règle graduée et le compas",
          "l'équerre seulement",
          "la gomme",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On choisit les instruments d'après ce que la figure impose.",
          "On liste d'abord les contraintes : longueurs, angles droits, ou les deux.",
          `Pour ${cas.figure}, ${cas.pourquoi}. On prend donc ${cas.bonne}.`,
          `Il faut ${cas.bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FIGURE_CERCLE — tracer au compas
     Le piège : l'écartement du compas, c'est le RAYON.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_figure_cercle_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_cercle",
    difficulty: 1,
    theme: "neutral",
    text: "Où plante-t-on la pointe du compas pour tracer un cercle ?",
    format: "qcm",
    choices: ["sur le centre", "sur le bord du cercle", "n'importe où", "sur le crayon"],
    expected: ["sur le centre"],
    comparator: "mcq_exact",
    hint: "C'est le point qui ne bouge pas pendant tout le tracé.",
    explanation: exp(
      "Le cercle est l'ensemble des points situés à la même distance d'un point appelé centre.",
      "On plante la pointe sur le centre, puis on fait tourner le crayon sans changer l'écartement.",
      "La pointe reste immobile sur le centre : c'est ce qui garantit que tous les points du tracé sont à la même distance de lui.",
      "On la plante sur le centre.",
    ),
    tags: ["ce2", "figures_planes", "cercle", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_cercle_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_cercle",
    difficulty: 4,
    theme: "neutral",
    text: "Pour tracer un cercle de 8 cm de diamètre, de combien faut-il écarter le compas ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "L'écartement du compas, c'est le rayon — la moitié du diamètre.",
    explanation: exp(
      "L'écartement du compas donne le RAYON, c'est-à-dire la distance du centre au bord.",
      "On partage le diamètre en deux pour obtenir le rayon.",
      "Le diamètre traverse tout le cercle en passant par le centre : il vaut deux rayons. Donc 8 ÷ 2 = 4. On écarte le compas de 4 cm. En l'écartant de 8 cm, on obtiendrait un cercle deux fois trop grand.",
      "Il faut l'écarter de 4 cm.",
    ),
    tags: ["ce2", "figures_planes", "cercle", "piege"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_cercle_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "Le diamètre d'un cercle vaut combien de fois son rayon ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Le diamètre traverse le cercle en passant par le centre.",
    explanation: exp(
      "Le rayon va du centre au bord ; le diamètre traverse tout le cercle en passant par le centre.",
      "On suit le diamètre du bord au centre, puis du centre à l'autre bord.",
      "Le diamètre est fait de deux rayons mis bout à bout : il vaut donc 2 fois le rayon.",
      "Il vaut 2 fois le rayon.",
    ),
    tags: ["ce2", "figures_planes", "cercle", "remarquable"],
  },
  {
    kind: "template",
    id: "ce2_figure_cercle_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_cercle",
    difficulty: 3,
    theme: "neutral",
    hint: "Diamètre = deux rayons.",
    tags: ["ce2", "figures_planes", "cercle", "template"],
    generate: () => {
      const rayon = randomInt(2, 9);
      const versDiametre = randomChoice([true, false]);
      return versDiametre
        ? {
            text: `Un cercle a un rayon de ${rayon} cm. Combien mesure son diamètre ?`,
            format: "short",
            expected: [String(rayon * 2)],
            comparator: "number_equal",
            explanation: exp(
              "Le diamètre est fait de deux rayons mis bout à bout.",
              "On double le rayon.",
              `${rayon} × 2 = ${rayon * 2}. Le diamètre mesure ${rayon * 2} cm.`,
              `Le diamètre mesure ${rayon * 2} cm.`,
            ),
          }
        : {
            text: `Un cercle a un diamètre de ${rayon * 2} cm. Combien mesure son rayon ?`,
            format: "short",
            expected: [String(rayon)],
            comparator: "number_equal",
            explanation: exp(
              "Le rayon est la moitié du diamètre : il va du centre au bord.",
              "On partage le diamètre en deux.",
              `${rayon * 2} ÷ 2 = ${rayon}. Le rayon mesure ${rayon} cm — c'est aussi l'écartement du compas.`,
              `Le rayon mesure ${rayon} cm.`,
            ),
          };
    },
  },
  {
    kind: "template",
    id: "ce2_figure_cercle_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_cercle",
    difficulty: 3,
    theme: "neutral",
    hint: "L'écartement du compas, c'est toujours le rayon.",
    tags: ["ce2", "figures_planes", "cercle", "piege", "template"],
    generate: () => {
      const rayon = randomInt(2, 8);
      const diametre = rayon * 2;
      return {
        text: `On veut tracer un cercle de ${diametre} cm de diamètre. De combien faut-il écarter le compas ?`,
        format: "qcm",
        choices: makeChoices(`${rayon} cm`, [
          `${diametre} cm`,
          `${diametre * 2} cm`,
          `${rayon + 1} cm`,
          `${rayon - 1} cm`,
        ]),
        expected: [`${rayon} cm`],
        comparator: "mcq_exact",
        explanation: exp(
          "L'écartement du compas donne le rayon, pas le diamètre.",
          "On partage le diamètre en deux pour obtenir le rayon.",
          `${diametre} ÷ 2 = ${rayon}. On écarte le compas de ${rayon} cm. En l'écartant de ${diametre} cm, le cercle serait deux fois trop grand.`,
          `Il faut l'écarter de ${rayon} cm.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FIGURE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_figure_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois élèves regardent la même figure, posée sur la pointe. Elle a quatre côtés égaux et quatre angles droits. Léa dit « c'est un carré », Kevin dit « c'est un losange », Malia dit « c'est un rectangle ». Qui décrit le mieux cette figure au CE2 ?",
    format: "qcm",
    choices: [
      "Léa : quatre côtés égaux ET quatre angles droits, c'est un carré",
      "Kevin : elle est posée sur la pointe, donc c'est un losange",
      "Malia : elle a quatre angles droits, donc c'est un rectangle",
      "aucun des trois",
    ],
    expected: ["Léa : quatre côtés égaux ET quatre angles droits, c'est un carré"],
    comparator: "mcq_exact",
    hint: "La position sur la feuille ne donne aucun nom à une figure.",
    explanation: exp(
      "On nomme une figure d'après ses côtés et ses angles, jamais d'après sa position.",
      "On vérifie les deux conditions du carré : côtés égaux, angles droits.",
      "Les quatre côtés sont égaux et les quatre angles sont droits : c'est un carré, même posé sur la pointe. Kevin s'est laissé tromper par l'inclinaison, et Malia n'a regardé que les angles.",
      "C'est Léa qui a raison.",
    ),
    tags: ["ce2", "figures_planes", "defi", "piege", "qcm", "canvas"],
    canvas: carreSurPointe(),
  },
  {
    kind: "fixed",
    id: "ce2_figure_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On coupe un carré en deux, en suivant une diagonale. Quelles figures obtient-on ?",
    format: "qcm",
    choices: [
      "deux triangles rectangles",
      "deux carrés plus petits",
      "deux rectangles",
      "deux losanges",
    ],
    expected: ["deux triangles rectangles"],
    comparator: "mcq_exact",
    hint: "Trace la diagonale sur un carré de papier, et compte les côtés de chaque morceau.",
    explanation: exp(
      "Une diagonale relie deux sommets opposés d'un quadrilatère.",
      "On regarde combien de côtés a chaque morceau, et si l'angle droit du carré y est encore.",
      "Chaque morceau a trois côtés : ce sont des triangles. Et chacun garde un angle droit du carré : ce sont donc deux triangles rectangles, exactement pareils.",
      "On obtient deux triangles rectangles.",
    ),
    tags: ["ce2", "figures_planes", "defi", "qcm", "canvas"],
    canvas: quadrilatere({
      points: {
        A: { x: 90, y: 55 },
        B: { x: 210, y: 55 },
        C: { x: 210, y: 175 },
        D: { x: 90, y: 175 },
      },
      display: { showPoints: true, showLabels: true, showDiagonals: true },
      marks: { rightAnglesAt: ["A", "B", "C", "D"] },
    }),
  },
  {
    kind: "template",
    id: "ce2_figure_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Reprends les deux conditions une par une.",
    tags: ["ce2", "figures_planes", "defi", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          desc: "quatre côtés égaux et quatre angles droits",
          bonne: "un carré",
          pourquoi: "les deux conditions du carré sont réunies",
        },
        {
          desc: "quatre angles droits, et les côtés opposés égaux deux par deux",
          bonne: "un rectangle",
          pourquoi: "les angles sont droits mais les quatre côtés ne sont pas tous égaux",
        },
        {
          desc: "quatre côtés égaux mais aucun angle droit",
          bonne: "un losange",
          pourquoi: "seuls les côtés sont imposés, pas les angles",
        },
        {
          desc: "trois côtés dont un angle droit",
          bonne: "un triangle rectangle",
          pourquoi: "trois côtés font un triangle, et l'angle droit le rend rectangle",
        },
      ] as const);
      return {
        text: `Une figure a ${cas.desc}. Comment s'appelle-t-elle ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "un carré",
          "un rectangle",
          "un losange",
          "un triangle rectangle",
          "un cercle",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque nom de figure correspond à une liste précise de conditions.",
          "On lit la description condition par condition, et on élimine.",
          `Ici, ${cas.pourquoi}.`,
          `C'est ${cas.bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_figure_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Un carré, c'est quatre côtés de la même longueur.",
    tags: ["ce2", "figures_planes", "defi", "reunion", "template"],
    generate: () => {
      const cote = randomInt(3, 12);
      const contexte = randomChoice([
        "un carreau de sol dans la varangue",
        "une dalle du couloir de l'école",
        "un carré de tissu pour un tour de cou",
      ]);
      return {
        text: `${contexte.charAt(0).toUpperCase() + contexte.slice(1)} est un carré de ${cote} cm de côté. Quelle longueur de ruban faut-il pour en faire tout le tour ?`,
        format: "short",
        expected: [String(4 * cote)],
        comparator: "number_equal",
        explanation: exp(
          "Faire le tour d'une figure, c'est additionner tous ses côtés.",
          "Dans un carré, les quatre côtés sont égaux : on multiplie donc par 4.",
          `${cote} × 4 = ${4 * cote}. Il faut ${4 * cote} cm de ruban.`,
          `Il faut ${4 * cote} cm.`,
        ),
      };
    },
  },
];
