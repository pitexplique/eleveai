// lib/tutor-v4/question-banks/maths/4e/pythagore.bank.ts
// lib/tutor-v4/question-banks/maths/4e/pythagore.bank.ts
//
// Banque de questions Tutor V4 - Mathématiques 4e
// Notion : Pythagore et sa réciproque
//
// Objectifs pédagogiques :
// - réactiver les carrés et racines carrées utiles à Pythagore ;
// - reconnaître un triangle rectangle et identifier l’hypoténuse ;
// - calculer une hypoténuse avec le théorème de Pythagore ;
// - calculer un côté de l’angle droit ;
// - vérifier une égalité de Pythagore avec trois longueurs ;
// - utiliser la réciproque pour conclure qu’un triangle est rectangle ou non ;
// - travailler la rédaction et la justification mathématique.
//
// Organisation de la bank :
// - questions fixed : QCM ciblés pour stabiliser les notions essentielles ;
// - questions template : génération aléatoire de calculs variés ;
// - questions open : rédaction courte, justification, raisonnement.
//
// Choix pédagogiques :
// - utilisation de triplets pythagoriciens pour obtenir des longueurs exactes ;
// - figures triangulaires variées via TriangleCanvasData ;
// - codage de l’angle droit seulement quand il est mathématiquement donné ;
// - distinction explicite entre théorème direct et réciproque.

import type {
  TutorBankItemV4,
  TriangleCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const knownSquares = [
  { n: 2, square: 4 },
  { n: 3, square: 9 },
  { n: 4, square: 16 },
  { n: 5, square: 25 },
  { n: 6, square: 36 },
  { n: 7, square: 49 },
  { n: 8, square: 64 },
  { n: 9, square: 81 },
  { n: 10, square: 100 },
  { n: 11, square: 121 },
  { n: 12, square: 144 },
  { n: 13, square: 169 },
  { n: 14, square: 196 },
  { n: 15, square: 225 },
];

const pythagoreanTriples = [
  { a: 3, b: 4, c: 5 },
  { a: 5, b: 12, c: 13 },
  { a: 6, b: 8, c: 10 },
  { a: 8, b: 15, c: 17 },
  { a: 9, b: 12, c: 15 },
  { a: 12, b: 16, c: 20 },
  { a: 7, b: 24, c: 25 },
  { a: 10, b: 24, c: 26 },
];

const falseTriples = [
  { a: 4, b: 5, c: 6 },
  { a: 6, b: 7, c: 9 },
  { a: 8, b: 9, c: 12 },
  { a: 5, b: 6, c: 8 },
  { a: 9, b: 10, c: 14 },
  { a: 10, b: 11, c: 15 },
];

type TriangleName = {
  A: string;
  B: string;
  C: string;
};

const triangleNames: TriangleName[] = [
  { A: "A", B: "B", C: "C" },
  { A: "M", B: "N", C: "P" },
  { A: "R", B: "S", C: "T" },
  { A: "E", B: "F", C: "G" },
  { A: "I", B: "J", C: "K" },
];

function sideName(labels: TriangleName, side: "AB" | "BC" | "CA") {
  if (side === "AB") return `${labels.A}${labels.B}`;
  if (side === "BC") return `${labels.B}${labels.C}`;
  return `${labels.C}${labels.A}`;
}

function hypotenuseSide(): "BC" {
  return "BC";
}

function rightTriangleFigure(params: {
  labels?: TriangleName;
  sideLabels?: Partial<Record<"AB" | "BC" | "CA", string>>;
  showRightAngle?: boolean;
}): TriangleCanvasData {
  const labels = params.labels ?? randomChoice(triangleNames);

  return {
    kind: "triangle",
    points: {
      A: { x: 55, y: 175 },
      B: { x: 225, y: 175 },
      C: { x: 55, y: 55 },
    },
    labels,
    sideLabels: params.sideLabels,
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: true,
    },
    marks:
      params.showRightAngle === false
        ? undefined
        : { rightAngleAt: "A" },
    size: {
      width: 280,
      height: 230,
    },
  };
}

function nonRightTriangleFigure(params?: {
  labels?: TriangleName;
  sideLabels?: Partial<Record<"AB" | "BC" | "CA", string>>;
  variant?: number;
}): TriangleCanvasData {
  const labels = params?.labels ?? randomChoice(triangleNames);
  const variant = params?.variant ?? randomInt(1, 4);

  const variants: Record<number, TriangleCanvasData["points"]> = {
    1: {
      A: { x: 55, y: 170 },
      B: { x: 225, y: 165 },
      C: { x: 130, y: 55 },
    },
    2: {
      A: { x: 65, y: 65 },
      B: { x: 230, y: 90 },
      C: { x: 95, y: 185 },
    },
    3: {
      A: { x: 50, y: 180 },
      B: { x: 235, y: 170 },
      C: { x: 190, y: 55 },
    },
    4: {
      A: { x: 70, y: 75 },
      B: { x: 220, y: 175 },
      C: { x: 55, y: 185 },
    },
  };

  return {
    kind: "triangle",
    points: variants[variant],
    labels,
    sideLabels: params?.sideLabels,
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
    },
    size: {
      width: 280,
      height: 230,
    },
  };
}

function makeChoices(correct: number, spread = 4): string[] {
  const values = new Set<number>([correct]);

  while (values.size < 4) {
    const v = correct + randomInt(-spread, spread);
    if (v > 0) values.add(v);
  }

  return shuffle([...values]).map(String);
}

function makeTextChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

export const pythagoreBank: TutorBankItemV4[] = [
  // =========================
  // CARRÉS ET RACINES
  // =========================
  {
    kind: "fixed",
    id: "pythagore_carres_racines_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_carres_racines",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut 5² ?",
    format: "qcm",
    choices: ["10", "25", "7", "15"],
    expected: ["25"],
    comparator: "mcq_exact",
    hint: "5² signifie 5 × 5.",
    explanation: "5² = 5 × 5 = 25.",
    tags: ["pythagore", "carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_carres_racines_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_carres_racines",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut √49 ?",
    format: "qcm",
    choices: ["6", "7", "8", "14"],
    expected: ["7"],
    comparator: "mcq_exact",
    hint: "Cherche le nombre qui multiplié par lui-même donne 49.",
    explanation: "Comme 7² = 49, alors √49 = 7.",
    tags: ["pythagore", "racine", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_carres_racines_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_carres_racines",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut 3² ?",
    format: "qcm",
    choices: ["6", "9", "5", "12"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Attention : 3² ne veut pas dire 3 × 2.",
    explanation: "3² = 3 × 3 = 9.",
    tags: ["pythagore", "carre", "piege"],
  },
  {
    kind: "fixed",
    id: "pythagore_carres_racines_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_carres_racines",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut √36 ?",
    format: "qcm",
    choices: ["5", "6", "18", "9"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "6 × 6 = 36.",
    explanation: "Comme 6² = 36, alors √36 = 6.",
    tags: ["pythagore", "racine"],
  },

 {
  kind: "template",
  id: "pythagore_carres_racines_tpl_2",
  niveau: "4e",
  matiere: "maths",
  notionId: "pythagore",
  microId: "pythagore_carres_racines",
  difficulty: 1,
  theme: "neutral",
  hint: "Cherche le nombre positif dont le carré donne ce résultat.",
  tags: ["pythagore", "racine", "template"],
  generate: () => {
    const { n, square } = randomChoice(knownSquares);
    return {
      text: `Combien vaut √${square} ?`,
      format: "short",
      expected: [String(n)],
      comparator: "number_equal",
      explanation: `Comme ${n}² = ${square}, alors √${square} = ${n}.`,
    };
  },
},
  {
    kind: "template",
    id: "pythagore_carres_racines_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_carres_racines",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule chaque carré, puis additionne.",
    tags: ["pythagore", "carre", "somme", "template"],
    generate: () => {
      const a = randomInt(2, 12);
      const b = randomInt(2, 12);
      const result = a * a + b * b;

      return {
        text: `Combien vaut ${a}² + ${b}² ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `${a}² + ${b}² = ${a * a} + ${b * b} = ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_carres_racines_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_carres_racines",
    difficulty: 2,
    theme: "neutral",
    hint: "Distingue bien carré et racine carrée.",
    tags: ["pythagore", "carre", "racine", "qcm", "template"],
    generate: () => {
      const { n, square } = randomChoice(knownSquares);
      const mode = randomChoice(["carre", "racine"]);
      const correct = mode === "carre" ? square : n;

      return {
        text: mode === "carre" ? `Combien vaut ${n}² ?` : `Combien vaut √${square} ?`,
        format: "qcm",
        choices: makeChoices(correct, 6),
        expected: [String(correct)],
        comparator: "mcq_exact",
        explanation:
          mode === "carre"
            ? `${n}² = ${n} × ${n} = ${square}.`
            : `Comme ${n}² = ${square}, alors √${square} = ${n}.`,
      };
    },
  },
    {
    kind: "fixed",
    id: "pythagore_carres_racines_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_carres_racines",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 3² ne vaut pas 6.",
    format: "open",
    expected: ["3", "3", "9"],
    comparator: "contains_keyword",
    hint: "Un carré signifie multiplier le nombre par lui-même.",
    explanation: "3² signifie 3 × 3, donc 3² = 9. Ce n’est pas 3 × 2.",
    tags: ["pythagore", "carre", "open", "piege"],
  },

  // =========================
  // RECONNAÎTRE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Le théorème de Pythagore s’utilise directement dans…",
    format: "qcm",
    choices: [
      "un triangle rectangle",
      "un carré",
      "un triangle quelconque",
      "un parallélogramme",
    ],
    expected: ["un triangle rectangle"],
    comparator: "mcq_exact",
    hint: "Pythagore concerne les triangles rectangles.",
    explanation:
      "Le théorème de Pythagore s’applique dans un triangle rectangle.",
    tags: ["pythagore", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "pythagore_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un triangle rectangle, l’hypoténuse est…",
    format: "qcm",
    choices: [
      "le côté opposé à l’angle droit",
      "le plus petit côté",
      "un côté de l’angle droit",
      "toujours le côté horizontal",
    ],
    expected: ["le côté opposé à l’angle droit"],
    comparator: "mcq_exact",
    hint: "L’hypoténuse est en face de l’angle droit.",
    explanation:
      "Dans un triangle rectangle, l’hypoténuse est le côté opposé à l’angle droit.",
    tags: ["pythagore", "hypotenuse"],
  },
  {
    kind: "fixed",
    id: "pythagore_reconnaitre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Le plus grand côté d’un triangle est-il toujours appelé hypoténuse ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le mot hypoténuse est réservé aux triangles rectangles.",
    explanation:
      "Non. On parle d’hypoténuse seulement dans un triangle rectangle.",
    tags: ["pythagore", "hypotenuse", "piege"],
  },
  {
    kind: "template",
    id: "pythagore_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "L’hypoténuse est le côté opposé à l’angle droit.",
    tags: ["pythagore", "hypotenuse", "canvas", "template"],
generate: () => {
  const labels = randomChoice(triangleNames);
  const hyp = hypotenuseSide();

  return {
    text: `Dans le triangle représenté, quel côté est l’hypoténuse ?`,
    format: "qcm",
    choices: shuffle([
      sideName(labels, "AB"),
      sideName(labels, "BC"),
      sideName(labels, "CA"),
    ]),
    expected: [sideName(labels, hyp)],
    comparator: "mcq_exact",
    explanation: `Le triangle est rectangle en ${labels.A}. L’hypoténuse est le côté opposé à l’angle droit, donc c’est le côté ${sideName(
      labels,
      hyp
    )}.`,
    canvas: rightTriangleFigure({ labels }),
  };
},
  },
  {
    kind: "template",
    id: "pythagore_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche si le triangle est codé rectangle.",
    tags: ["pythagore", "triangle_rectangle", "canvas", "template"],
    generate: () => {
      const isRight = randomChoice([true, false]);
      const labels = randomChoice(triangleNames);

      return {
        text: "Peut-on utiliser directement le théorème de Pythagore avec cette figure ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: [isRight ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: isRight
          ? "Oui, le triangle est codé rectangle."
          : "Non, aucun angle droit n’est codé sur la figure.",
        canvas: isRight
          ? rightTriangleFigure({ labels })
          : nonRightTriangleFigure({ labels }),
      };
    },
  },
    {
    kind: "fixed",
    id: "pythagore_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi on ne peut pas toujours utiliser le théorème de Pythagore dans n’importe quel triangle.",
    format: "open",
    expected: ["triangle", "rectangle"],
    comparator: "contains_keyword",
    hint: "Le théorème de Pythagore demande une condition sur le triangle.",
    explanation:
      "On utilise directement le théorème de Pythagore seulement dans un triangle rectangle.",
    tags: ["pythagore", "reconnaitre", "open"],
  },

  // =========================
  // CALCULER L’HYPOTÉNUSE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_calculer_hypotenuse_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a pour côtés de l’angle droit 3 cm et 4 cm. Quelle est son hypoténuse ?",
    format: "qcm",
    choices: ["5", "6", "7", "12"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "3² + 4² = 9 + 16 = 25.",
    explanation: "c² = 3² + 4² = 25, donc c = √25 = 5.",
    tags: ["pythagore", "hypotenuse", "triplet"],
  },
  {
    kind: "fixed",
    id: "pythagore_calculer_hypotenuse_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a pour côtés de l’angle droit 6 cm et 8 cm. Quelle est son hypoténuse ?",
    format: "qcm",
    choices: ["10", "12", "14", "48"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "6² + 8² = 36 + 64 = 100.",
    explanation: "c² = 6² + 8² = 100, donc c = √100 = 10.",
    tags: ["pythagore", "hypotenuse", "triplet"],
  },
  {
    kind: "template",
    id: "pythagore_calculer_hypotenuse_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les carrés des deux côtés de l’angle droit.",
    tags: ["pythagore", "hypotenuse", "triplet", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      const labels = randomChoice(triangleNames);

      return {
        text: `Un triangle rectangle a pour côtés de l’angle droit ${a} cm et ${b} cm. Quelle est la longueur de l’hypoténuse ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation: `c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${
          c * c
        }, donc c = √${c * c} = ${c}.`,
        canvas: rightTriangleFigure({
          labels,
          sideLabels: {
            AB: String(a),
            CA: String(b),
            BC: "?",
          },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_calculer_hypotenuse_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche l’hypoténuse : on additionne les carrés.",
    tags: ["pythagore", "hypotenuse", "qcm", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      return {
        text: `Dans un triangle rectangle, les côtés de l’angle droit mesurent ${a} cm et ${b} cm. Quelle est l’hypoténuse ?`,
        format: "qcm",
        choices: makeChoices(c, 8),
        expected: [String(c)],
        comparator: "mcq_exact",
        explanation: `${a}² + ${b}² = ${a * a} + ${b * b} = ${
          c * c
        }, donc l’hypoténuse mesure ${c} cm.`,
      };
    },
  },
    {
    kind: "template",
    id: "pythagore_calculer_hypotenuse_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand on cherche l’hypoténuse, on additionne les carrés des deux côtés de l’angle droit.",
    tags: ["pythagore", "hypotenuse", "open", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);

      return {
        text: `Explique pourquoi l’hypoténuse vaut ${c} cm si les côtés de l’angle droit mesurent ${a} cm et ${b} cm.`,
        format: "open",
        expected: [String(a), String(b), String(c), "carrés"],
        comparator: "contains_keyword",
        explanation: `On additionne les carrés des côtés de l’angle droit : ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}. Donc l’hypoténuse vaut √${c * c} = ${c} cm.`,
      };
    },
  },

  // =========================
  // CALCULER UN CÔTÉ
  // =========================
  {
    kind: "fixed",
    id: "pythagore_calculer_cote_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_calculer_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a une hypoténuse de 5 cm et un côté de l’angle droit de 3 cm. Quelle est l’autre côté ?",
    format: "qcm",
    choices: ["2", "4", "8", "16"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "On calcule 5² - 3².",
    explanation: "L’autre côté vérifie b² = 5² - 3² = 25 - 9 = 16, donc b = 4.",
    tags: ["pythagore", "cote", "triplet"],
  },
  {
    kind: "fixed",
    id: "pythagore_calculer_cote_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_calculer_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a une hypoténuse de 10 cm et un côté de l’angle droit de 6 cm. Quelle est l’autre côté ?",
    format: "qcm",
    choices: ["4", "8", "12", "16"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "On calcule 10² - 6².",
    explanation: "L’autre côté vérifie b² = 10² - 6² = 100 - 36 = 64, donc b = 8.",
    tags: ["pythagore", "cote", "triplet"],
  },
  {
    kind: "template",
    id: "pythagore_calculer_cote_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche un côté de l’angle droit : on soustrait les carrés.",
    tags: ["pythagore", "cote", "triplet", "template"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      const knownLeg = randomChoice([triple.a, triple.b]);
      const missingLeg = knownLeg === triple.a ? triple.b : triple.a;
      const labels = randomChoice(triangleNames);

      return {
        text: `Un triangle rectangle a une hypoténuse de ${triple.c} cm et un côté de l’angle droit de ${knownLeg} cm. Quelle est la longueur de l’autre côté de l’angle droit ?`,
        format: "short",
        expected: [String(missingLeg)],
        comparator: "number_equal",
        explanation: `On soustrait : ${triple.c}² - ${knownLeg}² = ${
          triple.c * triple.c
        } - ${knownLeg * knownLeg} = ${missingLeg * missingLeg}. Donc la longueur cherchée vaut √${
          missingLeg * missingLeg
        } = ${missingLeg}.`,
        canvas: rightTriangleFigure({
          labels,
          sideLabels: {
            AB: knownLeg === triple.a ? String(triple.a) : "?",
            CA: knownLeg === triple.b ? String(triple.b) : "?",
            BC: String(triple.c),
          },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_calculer_cote_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention : pour un côté de l’angle droit, on ne fait pas une addition.",
    tags: ["pythagore", "cote", "piege", "qcm", "template"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      const knownLeg = triple.a;
      const missingLeg = triple.b;

      return {
        text: `Dans un triangle rectangle, l’hypoténuse mesure ${triple.c} cm et un côté de l’angle droit mesure ${knownLeg} cm. L’autre côté mesure…`,
        format: "qcm",
        choices: makeChoices(missingLeg, 8),
        expected: [String(missingLeg)],
        comparator: "mcq_exact",
        explanation: `On calcule ${triple.c}² - ${knownLeg}² = ${
          triple.c * triple.c
        } - ${knownLeg * knownLeg} = ${missingLeg * missingLeg}, donc la longueur vaut ${missingLeg} cm.`,
      };
    },
  },
    {
    kind: "template",
    id: "pythagore_calculer_cote_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_calculer_cote",
    difficulty: 4,
    theme: "neutral",
    hint: "Quand on cherche un côté de l’angle droit, on soustrait les carrés.",
    tags: ["pythagore", "cote", "open", "template"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      const knownLeg = triple.a;
      const missingLeg = triple.b;

      return {
        text: `Explique pourquoi l’autre côté de l’angle droit vaut ${missingLeg} cm si l’hypoténuse vaut ${triple.c} cm et un côté vaut ${knownLeg} cm.`,
        format: "open",
        expected: [
          String(triple.c),
          String(knownLeg),
          String(missingLeg),
          "soustrait",
        ],
        comparator: "contains_keyword",
        explanation: `On cherche un côté de l’angle droit, donc on soustrait les carrés : ${triple.c}² - ${knownLeg}² = ${triple.c * triple.c} - ${knownLeg * knownLeg} = ${missingLeg * missingLeg}. Donc la longueur vaut ${missingLeg} cm.`,
      };
    },
  },

  // =========================
  // RÉCIPROQUE : VÉRIFIER
  // =========================
  {
    kind: "fixed",
    id: "pythagore_reciproque_verifier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "L’égalité 3² + 4² = 5² est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare 3² + 4² avec 5².",
    explanation: "3² + 4² = 9 + 16 = 25 et 5² = 25. L’égalité est vraie.",
    tags: ["pythagore", "reciproque", "verifier"],
  },
  {
    kind: "fixed",
    id: "pythagore_reciproque_verifier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "L’égalité 5² + 12² = 13² est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "25 + 144 = ?",
    explanation: "5² + 12² = 25 + 144 = 169 et 13² = 169. L’égalité est vraie.",
    tags: ["pythagore", "reciproque", "verifier"],
  },
  {
    kind: "fixed",
    id: "pythagore_reciproque_verifier_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "L’égalité 4² + 5² = 6² est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare 16 + 25 avec 36.",
    explanation: "4² + 5² = 16 + 25 = 41 alors que 6² = 36. L’égalité est fausse.",
    tags: ["pythagore", "reciproque", "faux_triplet"],
  },
  {
    kind: "template",
    id: "pythagore_reciproque_verifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la somme des carrés des deux plus petits côtés avec le carré du plus grand.",
    tags: ["pythagore", "reciproque", "template"],
    generate: () => {
      const isTrue = randomChoice([true, false]);
      const triple = isTrue
        ? randomChoice(pythagoreanTriples)
        : randomChoice(falseTriples);

      const left = triple.a * triple.a + triple.b * triple.b;
      const right = triple.c * triple.c;

      return {
        text: `On considère les longueurs ${triple.a} cm, ${triple.b} cm et ${triple.c} cm. L’égalité ${triple.a}² + ${triple.b}² = ${triple.c}² est-elle vraie ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [left === right ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: `${triple.a}² + ${triple.b}² = ${left} et ${triple.c}² = ${right}. L’égalité est donc ${
          left === right ? "vraie" : "fausse"
        }.`,
      };
    },
  },
    {
    kind: "template",
    id: "pythagore_reciproque_verifier_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la somme des carrés des deux plus petits côtés avec le carré du plus grand.",
    tags: ["pythagore", "reciproque", "verifier", "open", "template"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      const left = triple.a * triple.a + triple.b * triple.b;
      const right = triple.c * triple.c;

      return {
        text: `Explique pourquoi les longueurs ${triple.a} cm, ${triple.b} cm et ${triple.c} cm vérifient l’égalité de Pythagore.`,
        format: "open",
        expected: [
          String(triple.a),
          String(triple.b),
          String(triple.c),
          String(left),
        ],
        comparator: "contains_keyword",
        explanation: `${triple.a}² + ${triple.b}² = ${left} et ${triple.c}² = ${right}. Les deux résultats sont égaux, donc l’égalité de Pythagore est vérifiée.`,
      };
    },
  },

  // =========================
  // RÉCIPROQUE : CONCLURE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_reciproque_conclure_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Si AB² + AC² = BC², alors le triangle ABC est rectangle…",
    format: "qcm",
    choices: ["en A", "en B", "en C", "on ne peut pas conclure"],
    expected: ["en A"],
    comparator: "mcq_exact",
    hint: "Le plus grand côté est BC, donc l’angle droit est au point opposé.",
    explanation: "Si AB² + AC² = BC², alors BC est l’hypoténuse et le triangle est rectangle en A.",
    tags: ["pythagore", "reciproque", "conclure"],
  },
  {
    kind: "fixed",
    id: "pythagore_reciproque_conclure_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Si la somme des carrés des deux plus petits côtés n’est pas égale au carré du plus grand côté, alors le triangle est…",
    format: "qcm",
    choices: ["rectangle", "non rectangle", "toujours isocèle", "toujours équilatéral"],
    expected: ["non rectangle"],
    comparator: "mcq_exact",
    hint: "La réciproque ne fonctionne que si l’égalité est vraie.",
    explanation: "Si l’égalité de Pythagore n’est pas vraie, alors le triangle n’est pas rectangle.",
    tags: ["pythagore", "reciproque", "conclure"],
  },
  {
    kind: "template",
    id: "pythagore_reciproque_conclure_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    hint: "Teste l’égalité avec le plus grand côté.",
    tags: ["pythagore", "reciproque", "conclure", "template"],
    generate: () => {
      const isRight = randomChoice([true, false]);
      const triple = isRight
        ? randomChoice(pythagoreanTriples)
        : randomChoice(falseTriples);
      const labels = randomChoice(triangleNames);

      const left = triple.a * triple.a + triple.b * triple.b;
      const right = triple.c * triple.c;

      return {
        text: `Un triangle a pour longueurs ${triple.a} cm, ${triple.b} cm et ${triple.c} cm. Est-il rectangle ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [left === right ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          left === right
            ? `${triple.a}² + ${triple.b}² = ${left} et ${triple.c}² = ${right}. L’égalité est vraie, donc le triangle est rectangle.`
            : `${triple.a}² + ${triple.b}² = ${left} alors que ${triple.c}² = ${right}. L’égalité est fausse, donc le triangle n’est pas rectangle.`,
        canvas: nonRightTriangleFigure({
          labels,
          sideLabels: {
            AB: String(triple.a),
            CA: String(triple.b),
            BC: String(triple.c),
          },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_reciproque_conclure_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "Le sommet de l’angle droit est opposé au plus grand côté.",
    tags: ["pythagore", "reciproque", "sommet", "template"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      const labels = randomChoice(triangleNames);

      return {
        text: `Dans le triangle représenté, les longueurs sont ${triple.a} cm, ${triple.b} cm et ${triple.c} cm. Si le triangle est rectangle, en quel sommet est l’angle droit ?`,
        format: "qcm",
        choices: shuffle([labels.A, labels.B, labels.C]),
        expected: [labels.A],
        comparator: "mcq_exact",
        explanation: `Le plus grand côté est ${sideName(labels, "BC")}. L’angle droit est donc au sommet opposé : ${labels.A}.`,
        canvas: nonRightTriangleFigure({
          labels,
          sideLabels: {
            AB: String(triple.a),
            CA: String(triple.b),
            BC: String(triple.c),
          },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_reciproque_conclure_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "Le triangle est rectangle si l’égalité de Pythagore est vraie.",
    tags: ["pythagore", "reciproque", "conclure", "open", "template"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);

      return {
        text: `Explique pourquoi un triangle de côtés ${triple.a} cm, ${triple.b} cm et ${triple.c} cm est rectangle.`,
        format: "open",
        expected: [
          String(triple.a),
          String(triple.b),
          String(triple.c),
          "rectangle",
        ],
        comparator: "contains_keyword",
        explanation: `On vérifie : ${triple.a}² + ${triple.b}² = ${triple.c * triple.c} et ${triple.c}² = ${triple.c * triple.c}. L’égalité est vraie, donc d’après la réciproque du théorème de Pythagore, le triangle est rectangle.`,
      };
    },
  },
  // =========================
  // RÉDIGER
  // =========================
  {
    kind: "fixed",
    id: "pythagore_rediger_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase convient pour commencer une rédaction avec le théorème de Pythagore ?",
    format: "qcm",
    choices: [
      "Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore…",
      "Dans le quadrilatère ABCD, d’après Pythagore…",
      "Comme les côtés sont parallèles…",
      "On additionne toutes les longueurs.",
    ],
    expected: [
      "Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore…",
    ],
    comparator: "mcq_exact",
    hint: "Le théorème direct part d’un triangle déjà rectangle.",
    explanation:
      "Pour utiliser le théorème de Pythagore, on commence par indiquer que le triangle est rectangle.",
    tags: ["pythagore", "redaction"],
  },
  {
    kind: "fixed",
    id: "pythagore_rediger_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase convient pour utiliser la réciproque de Pythagore ?",
    format: "qcm",
    choices: [
      "On compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté.",
      "On additionne les trois côtés.",
      "On regarde seulement le dessin.",
      "On utilise l’aire du triangle.",
    ],
    expected: [
      "On compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté.",
    ],
    comparator: "mcq_exact",
    hint: "La réciproque sert à vérifier si un triangle est rectangle.",
    explanation:
      "Pour la réciproque, on compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté.",
    tags: ["pythagore", "reciproque", "redaction"],
  },
  {
    kind: "template",
    id: "pythagore_rediger_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "On cherche l’hypoténuse, donc on additionne les carrés.",
    tags: ["pythagore", "redaction", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);

      return {
        text: `Complète le calcul : dans un triangle rectangle, si les côtés de l’angle droit mesurent ${a} cm et ${b} cm, alors l’hypoténuse au carré vaut…`,
        format: "qcm",
        choices: [
          `${a}² + ${b}²`,
          `${c}² - ${a}²`,
          `${a} + ${b}`,
          `${a} × ${b}`,
        ],
        expected: [`${a}² + ${b}²`],
        comparator: "mcq_exact",
        explanation: `Pour calculer l’hypoténuse, on utilise c² = ${a}² + ${b}².`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_rediger_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour la réciproque, on ne suppose pas que le triangle est rectangle : on vérifie.",
    tags: ["pythagore", "reciproque", "redaction", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);

      return {
        text: `Pour montrer qu’un triangle de côtés ${a}, ${b} et ${c} est rectangle, quelle comparaison faut-il faire ?`,
        format: "qcm",
        choices: shuffle([
          `${a}² + ${b}² et ${c}²`,
          `${a} + ${b} et ${c}`,
          `${a} × ${b} et ${c}`,
          `${a}² + ${c}² et ${b}²`,
        ]),
        expected: [`${a}² + ${b}² et ${c}²`],
        comparator: "mcq_exact",
        explanation: `Le plus grand côté est ${c}. On compare donc ${a}² + ${b}² avec ${c}².`,
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_rediger_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre utiliser le théorème de Pythagore et utiliser sa réciproque.",
    format: "open",
    expected: ["théorème", "réciproque", "rectangle"],
    comparator: "contains_keyword",
    hint: "Dans un cas, on sait déjà que le triangle est rectangle. Dans l’autre, on veut le vérifier.",
    explanation:
      "Le théorème de Pythagore sert à calculer une longueur dans un triangle déjà rectangle. La réciproque sert à vérifier si un triangle est rectangle à partir de ses trois longueurs.",
    tags: ["pythagore", "redaction", "reciproque", "open"],
  },
  // =========================
  // DÉFIS
  // =========================
  {
    kind: "fixed",
    id: "pythagore_defis_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_defis",
    difficulty: 5,
    theme: "neutral",
    text: "On connaît trois longueurs d’un triangle et on veut savoir s’il est rectangle. On utilise plutôt…",
    format: "qcm",
    choices: [
      "la réciproque du théorème de Pythagore",
      "le théorème de Pythagore direct",
      "la distributivité",
      "le périmètre",
    ],
    expected: ["la réciproque du théorème de Pythagore"],
    comparator: "mcq_exact",
    hint: "On ne sait pas encore si le triangle est rectangle.",
    explanation:
      "Quand on connaît trois longueurs et qu’on veut savoir si le triangle est rectangle, on utilise la réciproque.",
    tags: ["pythagore", "defi", "reciproque"],
  },
  {
    kind: "fixed",
    id: "pythagore_defis_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « J’ai trois longueurs, donc j’utilise directement le théorème de Pythagore. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le théorème direct nécessite déjà un triangle rectangle.",
    explanation:
      "Non. Avec trois longueurs, on utilise la réciproque pour vérifier si le triangle est rectangle.",
    tags: ["pythagore", "defi", "piege"],
  },
  {
    kind: "template",
    id: "pythagore_defis_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_defis",
    difficulty: 5,
    theme: "reunion",
    hint: "Modélise la situation par un triangle rectangle.",
    tags: ["pythagore", "defi", "probleme", "reunion", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);

      return {
        text: `À La Réunion, un sentier monte de ${a} centaines de mètres en hauteur et avance horizontalement de ${b} centaines de mètres. En ligne droite, quelle distance représente le sentier ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation: `On modélise par un triangle rectangle : distance² = ${a}² + ${b}² = ${
          c * c
        }, donc la distance vaut ${c} centaines de mètres.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_defis_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Teste les deux triangles avec la réciproque.",
    tags: ["pythagore", "defi", "hpi", "template"],
    generate: () => {
      const good = randomChoice(pythagoreanTriples);
      const bad = randomChoice(falseTriples);
      const goodName = randomChoice(["triangle 1", "triangle A"]);
      const badName = goodName === "triangle 1" ? "triangle 2" : "triangle B";

      const firstGood = randomChoice([true, false]);

      return {
        text: firstGood
          ? `${goodName} a pour longueurs ${good.a}, ${good.b}, ${good.c}. ${badName} a pour longueurs ${bad.a}, ${bad.b}, ${bad.c}. Lequel est rectangle ?`
          : `${badName} a pour longueurs ${bad.a}, ${bad.b}, ${bad.c}. ${goodName} a pour longueurs ${good.a}, ${good.b}, ${good.c}. Lequel est rectangle ?`,
        format: "qcm",
        choices: [goodName, badName, "les deux", "aucun"],
        expected: [goodName],
        comparator: "mcq_exact",
        explanation: `${good.a}² + ${good.b}² = ${good.c}², donc ${goodName} est rectangle. Pour l’autre triangle, l’égalité de Pythagore est fausse.`,
      };
    },
  },
    {
    kind: "template",
    id: "pythagore_defis_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore",
    microId: "pythagore_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Commence par repérer si on calcule une longueur ou si on vérifie que le triangle est rectangle.",
    tags: ["pythagore", "defi", "open", "raisonnement", "template"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);

      return {
        text: `Un élève connaît les trois longueurs ${triple.a} cm, ${triple.b} cm et ${triple.c} cm. Explique pourquoi il doit utiliser la réciproque et non le théorème direct.`,
        format: "open",
        expected: ["trois", "longueurs", "réciproque", "rectangle"],
        comparator: "contains_keyword",
        explanation:
          "Quand on connaît les trois longueurs et qu’on veut savoir si le triangle est rectangle, on utilise la réciproque. Le théorème direct s’utilise seulement quand on sait déjà que le triangle est rectangle.",
      };
    },
  },
];