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
    size: { width: 280, height: 230 },
  };
}

function nonRightTriangleFigure(params?: {
  labels?: TriangleName;
  sideLabels?: Partial<Record<"AB" | "BC" | "CA", string>>;
}): TriangleCanvasData {
  const labels = params?.labels ?? randomChoice(triangleNames);

  return {
    kind: "triangle",
    points: {
      A: { x: 55, y: 170 },
      B: { x: 225, y: 165 },
      C: { x: 130, y: 55 },
    },
    labels,
    sideLabels: params?.sideLabels,
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
    },
    size: { width: 280, height: 230 },
  };
}



function makeChoices(correct: number, spread = 6): string[] {
  const values = new Set<number>([correct]);

  while (values.size < 4) {
    const v = correct + randomInt(-spread, spread);
    if (v > 0) values.add(v);
  }

  return shuffle([...values]).map(String);
}

export const pythagore3eBank: TutorBankItemV4[] = [
  // =========================
  // RECONNAÎTRE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans quel type de triangle peut-on utiliser directement le théorème de Pythagore ?",
    format: "qcm",
    choices: [
      "un triangle rectangle",
      "un triangle quelconque",
      "un triangle isocèle",
      "un quadrilatère",
    ],
    expected: ["un triangle rectangle"],
    comparator: "mcq_exact",
    hint: "Le théorème de Pythagore nécessite une condition précise sur le triangle.",
    explanation:
      `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
      `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
      `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
      ("Le théorème de Pythagore s’utilise directement seulement dans un triangle rectangle. Il permet de relier les longueurs des deux côtés de l’angle droit et de l’hypoténuse.") +
      `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
    tags: ["pythagore_theoreme", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
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
    hint: "Regarde le côté qui est en face de l’angle droit.",
    explanation:
      `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
      `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
      `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
      ("Dans un triangle rectangle, l’hypoténuse est le côté opposé à l’angle droit. C’est aussi le plus long côté du triangle rectangle.") +
      `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
    tags: ["pythagore_theoreme", "hypotenuse", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reconnaitre_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "L’hypoténuse est toujours le côté opposé à l’angle droit.",
    tags: ["pythagore_theoreme", "hypotenuse", "canvas", "template"],
    generate: () => {
      const labels = randomChoice(triangleNames);
      const hyp = hypotenuseSide();

      return {
        text: "Dans le triangle représenté, quel côté est l’hypoténuse ?",
        format: "qcm",
        choices: shuffle([
          sideName(labels, "AB"),
          sideName(labels, "BC"),
          sideName(labels, "CA"),
        ]),
        expected: [sideName(labels, hyp)],
        comparator: "mcq_exact",
        explanation: `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
          `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
          `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
          (`Le triangle est rectangle en ${labels.A}. L’hypoténuse est le côté opposé à l’angle droit, donc c’est le côté ${sideName(
          labels,
          hyp
        )}.`) +
          `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
        canvas: rightTriangleFigure({ labels }),
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi on ne peut pas utiliser directement le théorème de Pythagore dans n’importe quel triangle.",
    format: "open",
    expected: ["triangle", "rectangle"],
    comparator: "contains_keyword",
    hint: "Le théorème de Pythagore demande une condition avant de commencer.",
    explanation:
      `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
      `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
      `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
      ("On ne peut pas utiliser directement le théorème de Pythagore dans n’importe quel triangle, car ce théorème s’applique seulement dans un triangle rectangle. Il faut donc d’abord savoir ou prouver que le triangle est rectangle.") +
      `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
    tags: ["pythagore_theoreme", "reconnaitre", "open"],
  },

  // =========================
  // CALCULER L’HYPOTÉNUSE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a pour côtés de l’angle droit 3 cm et 4 cm. Quelle est la longueur de son hypoténuse ?",
    format: "qcm",
    choices: ["5", "6", "7", "12"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Pour calculer l’hypoténuse, on additionne les carrés des deux côtés de l’angle droit.",
    explanation:
      `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
      `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
      `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
      ("Dans un triangle rectangle, le carré de l’hypoténuse est égal à la somme des carrés des deux côtés de l’angle droit. On calcule : 3² + 4² = 9 + 16 = 25. Donc l’hypoténuse mesure √25 = 5 cm.") +
      `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
    tags: ["pythagore_theoreme", "hypotenuse", "triplet"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche l’hypoténuse : on additionne les carrés.",
    tags: ["pythagore_theoreme", "hypotenuse", "template", "canvas"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      const labels = randomChoice(triangleNames);

      return {
        text: `Dans un triangle rectangle, les côtés de l’angle droit mesurent ${a} cm et ${b} cm. Quelle est la longueur de l’hypoténuse ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation: `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
          `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
          `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
          (`On cherche l’hypoténuse, donc on additionne les carrés des deux côtés de l’angle droit : ${a}² + ${b}² = ${a * a} + ${b * b} = ${
          c * c
        }. La longueur de l’hypoténuse est donc √${c * c} = ${c} cm.`) +
          `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
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
    id: "pythagore_theoreme_calculer_hypotenuse_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris d’abord l’égalité de Pythagore, puis calcule la racine carrée.",
    tags: ["pythagore_theoreme", "hypotenuse", "qcm", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);

      return {
        text: `Dans un triangle rectangle, les côtés de l’angle droit mesurent ${a} cm et ${b} cm. L’hypoténuse mesure…`,
        format: "qcm",
        choices: makeChoices(c, 8),
        expected: [String(c)],
        comparator: "mcq_exact",
        explanation: `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
          `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
          `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
          (`D’après le théorème de Pythagore, l’hypoténuse vérifie : h² = ${a}² + ${b}². Donc h² = ${a * a} + ${b * b} = ${
          c * c
        }. Ainsi h = √${c * c} = ${c} cm.`) +
          `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    hint: "Ta réponse doit expliquer pourquoi on additionne les carrés.",
    tags: ["pythagore_theoreme", "hypotenuse", "open", "redaction"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);

      return {
        text: `Rédige une justification pour montrer que l’hypoténuse vaut ${c} cm si les côtés de l’angle droit mesurent ${a} cm et ${b} cm.`,
        format: "open",
        expected: [String(a), String(b), String(c), "Pythagore"],
        comparator: "contains_keyword",
        explanation: `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
          `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
          `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
          (`Dans un triangle rectangle, d’après le théorème de Pythagore, le carré de l’hypoténuse est égal à la somme des carrés des deux côtés de l’angle droit. On calcule : ${a}² + ${b}² = ${a * a} + ${b * b} = ${
          c * c
        }. Donc l’hypoténuse vaut √${c * c} = ${c} cm.`) +
          `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
      };
    },
  },

  // =========================
  // CALCULER UN CÔTÉ DE L’ANGLE DROIT
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a une hypoténuse de 5 cm et un côté de l’angle droit de 3 cm. Quelle est la longueur de l’autre côté de l’angle droit ?",
    format: "qcm",
    choices: ["2", "4", "8", "16"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Quand on cherche un côté de l’angle droit, on soustrait les carrés.",
    explanation:
      `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
      `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
      `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
      ("On connaît l’hypoténuse et un côté de l’angle droit. On calcule donc la différence des carrés : 5² - 3² = 25 - 9 = 16. La longueur cherchée vaut √16 = 4 cm.") +
      `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
    tags: ["pythagore_theoreme", "cote", "triplet"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère d’abord l’hypoténuse, puis soustrais les carrés.",
    tags: ["pythagore_theoreme", "cote", "template", "canvas"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      const knownLeg = randomChoice([triple.a, triple.b]);
      const missingLeg = knownLeg === triple.a ? triple.b : triple.a;
      const labels = randomChoice(triangleNames);

      return {
        text: `Dans un triangle rectangle, l’hypoténuse mesure ${triple.c} cm et un côté de l’angle droit mesure ${knownLeg} cm. Quelle est la longueur de l’autre côté de l’angle droit ?`,
        format: "short",
        expected: [String(missingLeg)],
        comparator: "number_equal",
        explanation: `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
          `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
          `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
          (`On cherche un côté de l’angle droit. On soustrait donc les carrés : ${triple.c}² - ${knownLeg}² = ${
          triple.c * triple.c
        } - ${knownLeg * knownLeg} = ${missingLeg * missingLeg}. La longueur cherchée vaut √${
          missingLeg * missingLeg
        } = ${missingLeg} cm.`) +
          `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
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
    id: "pythagore_theoreme_calculer_cote_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention : pour un côté de l’angle droit, on ne fait pas une addition.",
    tags: ["pythagore_theoreme", "cote", "piege", "qcm"],
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
        explanation: `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
          `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
          `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
          (`Comme on cherche un côté de l’angle droit, on ne calcule pas ${triple.c}² + ${knownLeg}². On calcule ${triple.c}² - ${knownLeg}² = ${
          triple.c * triple.c
        } - ${knownLeg * knownLeg} = ${missingLeg * missingLeg}. Donc la longueur vaut ${missingLeg} cm.`) +
          `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique pourquoi il faut soustraire les carrés.",
    tags: ["pythagore_theoreme", "cote", "open", "redaction"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      const knownLeg = triple.a;
      const missingLeg = triple.b;

      return {
        text: `Rédige une justification pour montrer que l’autre côté de l’angle droit vaut ${missingLeg} cm si l’hypoténuse vaut ${triple.c} cm et un côté vaut ${knownLeg} cm.`,
        format: "open",
        expected: [String(triple.c), String(knownLeg), String(missingLeg), "Pythagore"],
        comparator: "contains_keyword",
        explanation: `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
          `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
          `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
          (`Dans un triangle rectangle, d’après le théorème de Pythagore, le carré de l’hypoténuse est égal à la somme des carrés des deux côtés de l’angle droit. Ici, on connaît l’hypoténuse et un côté. On calcule donc : ${triple.c}² - ${knownLeg}² = ${
          triple.c * triple.c
        } - ${knownLeg * knownLeg} = ${missingLeg * missingLeg}. La longueur cherchée vaut √${
          missingLeg * missingLeg
        } = ${missingLeg} cm.`) +
          `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
      };
    },
  },

  // =========================
  // RÉCIPROQUE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 2,
    theme: "neutral",
    text: "On connaît les trois longueurs d’un triangle et on veut savoir s’il est rectangle. On utilise plutôt…",
    format: "qcm",
    choices: [
      "la réciproque du théorème de Pythagore",
      "le théorème de Pythagore direct",
      "la formule du périmètre",
      "la proportionnalité",
    ],
    expected: ["la réciproque du théorème de Pythagore"],
    comparator: "mcq_exact",
    hint: "On ne sait pas encore si le triangle est rectangle.",
    explanation:
      `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
      `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
      `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
      ("Quand on connaît les trois longueurs d’un triangle et qu’on veut savoir s’il est rectangle, on utilise la réciproque du théorème de Pythagore. Le théorème direct sert plutôt à calculer une longueur dans un triangle déjà rectangle.") +
      `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
    tags: ["pythagore_theoreme", "reciproque", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère le plus grand côté, puis compare la somme des carrés des deux autres côtés avec son carré.",
    tags: ["pythagore_theoreme", "reciproque", "template"],
    generate: () => {
      const isRight = randomChoice([true, false]);
      const triple = isRight
        ? randomChoice(pythagoreanTriples)
        : randomChoice(falseTriples);

      const left = triple.a * triple.a + triple.b * triple.b;
      const right = triple.c * triple.c;

      return {
        text: `Un triangle a pour longueurs ${triple.a} cm, ${triple.b} cm et ${triple.c} cm. Est-il rectangle ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [left === right ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
          `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
          `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
          (left === right
            ? `Le plus grand côté mesure ${triple.c} cm. On compare ${triple.a}² + ${triple.b}² et ${triple.c}² : ${triple.a}² + ${triple.b}² = ${left} et ${triple.c}² = ${right}. Les deux résultats sont égaux, donc d’après la réciproque du théorème de Pythagore, le triangle est rectangle.`
            : `Le plus grand côté mesure ${triple.c} cm. On compare ${triple.a}² + ${triple.b}² et ${triple.c}² : ${triple.a}² + ${triple.b}² = ${left}, alors que ${triple.c}² = ${right}. Les deux résultats ne sont pas égaux, donc le triangle n’est pas rectangle.`) +
          `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 4,
    theme: "neutral",
    hint: "L’angle droit serait situé en face du plus grand côté.",
    tags: ["pythagore_theoreme", "reciproque", "canvas"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      const labels = randomChoice(triangleNames);

      return {
        text: `Dans le triangle représenté, les longueurs sont ${triple.a} cm, ${triple.b} cm et ${triple.c} cm. Si le triangle est rectangle, en quel sommet est l’angle droit ?`,
        format: "qcm",
        choices: shuffle([labels.A, labels.B, labels.C]),
        expected: [labels.A],
        comparator: "mcq_exact",
        explanation: `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
          `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
          `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
          (`Le plus grand côté est ${sideName(labels, "BC")}. Si le triangle est rectangle, ce côté serait l’hypoténuse. L’angle droit serait donc au sommet opposé, c’est-à-dire au point ${labels.A}.`) +
          `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
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
    id: "pythagore_theoreme_reciproque_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 4,
    theme: "neutral",
    hint: "Ta réponse doit contenir la comparaison des carrés et une conclusion.",
    tags: ["pythagore_theoreme", "reciproque", "open", "redaction"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      const left = triple.a * triple.a + triple.b * triple.b;

      return {
        text: `Rédige une justification pour montrer qu’un triangle de côtés ${triple.a} cm, ${triple.b} cm et ${triple.c} cm est rectangle.`,
        format: "open",
        expected: [String(triple.a), String(triple.b), String(triple.c), "rectangle"],
        comparator: "contains_keyword",
        explanation: `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
          `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
          `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
          (`Le plus grand côté mesure ${triple.c} cm. On compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté : ${triple.a}² + ${triple.b}² = ${left} et ${triple.c}² = ${
          triple.c * triple.c
        }. Les deux résultats sont égaux. Donc, d’après la réciproque du théorème de Pythagore, le triangle est rectangle.`) +
          `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
      };
    },
  },

  // =========================
  // RÉDIGER
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase convient pour commencer une rédaction avec le théorème de Pythagore direct ?",
    format: "qcm",
    choices: [
      "Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore…",
      "On sait que ABC a trois côtés, donc d’après Pythagore…",
      "Comme les côtés sont parallèles…",
      "On additionne les longueurs.",
    ],
    expected: ["Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore…"],
    comparator: "mcq_exact",
    hint: "Le théorème direct commence par un triangle déjà rectangle.",
    explanation:
      `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
      `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
      `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
      ("Pour utiliser le théorème de Pythagore direct, il faut d’abord indiquer que le triangle est rectangle. Une rédaction correcte commence donc par une phrase du type : « Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore… »") +
      `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
    tags: ["pythagore_theoreme", "redaction", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase convient pour utiliser la réciproque du théorème de Pythagore ?",
    format: "qcm",
    choices: [
      "On compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté.",
      "On suppose que le triangle est rectangle.",
      "On additionne les trois côtés.",
      "On calcule seulement le périmètre.",
    ],
    expected: [
      "On compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté.",
    ],
    comparator: "mcq_exact",
    hint: "La réciproque sert à vérifier si le triangle est rectangle.",
    explanation:
      `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
      `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
      `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
      ("Pour utiliser la réciproque du théorème de Pythagore, on ne suppose pas que le triangle est rectangle. On compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté, puis on conclut.") +
      `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
    tags: ["pythagore_theoreme", "redaction", "reciproque"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre le théorème de Pythagore et sa réciproque.",
    format: "open",
    expected: ["théorème", "réciproque", "rectangle"],
    comparator: "contains_keyword",
    hint: "Dans un cas, on sait déjà que le triangle est rectangle. Dans l’autre, on veut le vérifier.",
    explanation:
      `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
      `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
      `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
      ("Le théorème de Pythagore sert à calculer une longueur dans un triangle dont on sait déjà qu’il est rectangle. La réciproque sert à montrer qu’un triangle est rectangle à partir de ses trois longueurs.") +
      `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
    tags: ["pythagore_theoreme", "redaction", "open"],
  },

  // =========================
  // DÉFIS
  // =========================
  {
    kind: "template",
    id: "pythagore_theoreme_defi_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Modélise la situation par un triangle rectangle.",
    tags: ["pythagore_theoreme", "defi", "probleme", "reunion"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);

      return {
        text: `À La Réunion, un sentier monte de ${a} centaines de mètres en altitude et avance horizontalement de ${b} centaines de mètres. En ligne droite, quelle distance représente le sentier ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation: `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
          `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
          `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
          (`On modélise la situation par un triangle rectangle. Les deux côtés de l’angle droit mesurent ${a} et ${b} centaines de mètres. D’après le théorème de Pythagore, la distance en ligne droite vérifie : d² = ${a}² + ${b}² = ${
          c * c
        }. Donc d = ${c}. La distance est donc de ${c} centaines de mètres.`) +
          `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_defi_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Il faut choisir entre calculer une longueur et vérifier si un triangle est rectangle.",
    tags: ["pythagore_theoreme", "defi", "choix_methode"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);

      return {
        text: `Un élève connaît les trois longueurs d’un triangle : ${triple.a} cm, ${triple.b} cm et ${triple.c} cm. Il utilise directement le théorème de Pythagore. A-t-il choisi la bonne méthode ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
          `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
          `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
          ("Non. Quand on connaît les trois longueurs et qu’on veut savoir si le triangle est rectangle, on utilise la réciproque du théorème de Pythagore. Le théorème direct s’utilise lorsque le triangle est déjà connu comme rectangle et que l’on cherche une longueur.") +
          `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Commence par repérer le plus grand côté, puis vérifie l’égalité de Pythagore.",
    tags: ["pythagore_theoreme", "defi", "open", "brevet"],
    generate: () => {
      const isRight = randomChoice([true, false]);
      const triple = isRight
        ? randomChoice(pythagoreanTriples)
        : randomChoice(falseTriples);

      const left = triple.a * triple.a + triple.b * triple.b;
      const right = triple.c * triple.c;

      return {
        text: `Type brevet : un triangle a pour longueurs ${triple.a} cm, ${triple.b} cm et ${triple.c} cm. Rédige une réponse complète pour dire s’il est rectangle ou non.`,
        format: "open",
        expected: [String(triple.a), String(triple.b), String(triple.c)],
        comparator: "contains_keyword",
        explanation:
          `Définition : dans un triangle rectangle, le théorème de Pythagore relie les carrés des longueurs des trois côtés.\n\n` +
          `Méthode : on repère l’hypoténuse ou le plus grand côté, puis on choisit le théorème direct ou sa réciproque.\n\n` +
          `Calcul : on compare ou on calcule les carrés des longueurs indiquées. ` +
          (left === right
            ? `Le plus grand côté mesure ${triple.c} cm. On compare ${triple.a}² + ${triple.b}² et ${triple.c}² : ${left} = ${right}. L’égalité de Pythagore est vérifiée. Donc, d’après la réciproque du théorème de Pythagore, le triangle est rectangle.`
            : `Le plus grand côté mesure ${triple.c} cm. On compare ${triple.a}² + ${triple.b}² et ${triple.c}² : ${left} ≠ ${right}. L’égalité de Pythagore n’est pas vérifiée. Donc le triangle n’est pas rectangle.`) +
          `\n\nConclusion : on peut alors donner la longueur cherchée ou conclure sur le triangle.`,
      };
    },
  },

  // =========================
  // RECONNAÎTRE (compléments)
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un triangle rectangle, l’hypoténuse est…",
    format: "qcm",
    choices: ["le plus long côté", "le plus court côté", "un côté de l’angle droit", "toujours vertical"],
    expected: ["le plus long côté"],
    comparator: "mcq_exact",
    hint: "Elle est en face de l’angle droit.",
    explanation:
      "Définition : l’hypoténuse est le côté opposé à l’angle droit.\n\n" +
      "Méthode : on repère l’angle droit, puis le côté en face.\n\n" +
      "Calcul : ce côté est aussi le plus long du triangle rectangle.\n\n" +
      "Conclusion : l’hypoténuse est le plus long côté.",
    tags: ["pythagore_theoreme", "reconnaitre", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reconnaitre_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "L’hypoténuse est opposée à l’angle droit.",
    tags: ["pythagore_theoreme", "reconnaitre", "canvas", "template"],
    generate: () => {
      const labels = randomChoice(triangleNames);
      return {
        text: `Dans un triangle rectangle en ${labels.A}, quel côté est l’hypoténuse ?`,
        format: "qcm",
        choices: shuffle([
          sideName(labels, "BC"),
          sideName(labels, "AB"),
          sideName(labels, "CA"),
        ]),
        expected: [sideName(labels, "BC")],
        comparator: "mcq_exact",
        explanation:
          `Définition : l’hypoténuse est le côté opposé à l’angle droit.\n\n` +
          `Méthode : l’angle droit est en ${labels.A}, on cherche le côté en face.\n\n` +
          `Calcul : le côté opposé à ${labels.A} est ${sideName(labels, "BC")}.\n\n` +
          `Conclusion : l’hypoténuse est ${sideName(labels, "BC")}.`,
        canvas: rightTriangleFigure({ labels }),
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Le théorème de Pythagore relie…",
    format: "qcm",
    choices: [
      "les carrés des longueurs des trois côtés",
      "les angles du triangle",
      "le périmètre et l’aire",
      "les diagonales",
    ],
    expected: ["les carrés des longueurs des trois côtés"],
    comparator: "mcq_exact",
    hint: "On parle de carrés de longueurs.",
    explanation:
      "Définition : dans un triangle rectangle, $\\text{hypoténuse}^2 = \\text{côté}_1^2 + \\text{côté}_2^2$.\n\n" +
      "Méthode : on observe ce que relie l’égalité.\n\n" +
      "Calcul : elle relie les carrés des trois longueurs.\n\n" +
      "Conclusion : le théorème relie les carrés des longueurs des côtés.",
    tags: ["pythagore_theoreme", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_5",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle rectangle en $A$, quelle égalité de Pythagore est correcte ?",
    format: "qcm",
    choices: ["$BC^2 = AB^2 + AC^2$", "$AB^2 = BC^2 + AC^2$", "$AC^2 = AB^2 + BC^2$", "$BC = AB + AC$"],
    expected: ["$BC^2 = AB^2 + AC^2$"],
    comparator: "mcq_exact",
    hint: "Le carré de l’hypoténuse est égal à la somme des carrés des deux autres.",
    explanation:
      "Définition : dans un triangle rectangle en $A$, l’hypoténuse est $BC$.\n\n" +
      "Méthode : on écrit que le carré de l’hypoténuse est la somme des carrés des deux côtés de l’angle droit.\n\n" +
      "Calcul : $BC^2 = AB^2 + AC^2$.\n\n" +
      "Conclusion : la bonne égalité est $BC^2 = AB^2 + AC^2$.",
    canvas: rightTriangleFigure({}),
    tags: ["pythagore_theoreme", "reconnaitre", "egalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_6",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle rectangle, les deux côtés de l’angle droit s’appellent aussi…",
    format: "qcm",
    choices: ["les côtés adjacents à l’angle droit", "les hypoténuses", "les diagonales", "les médianes"],
    expected: ["les côtés adjacents à l’angle droit"],
    comparator: "mcq_exact",
    hint: "Ils forment l’angle droit.",
    explanation:
      "Définition : les deux côtés qui forment l’angle droit sont les côtés de l’angle droit.\n\n" +
      "Méthode : on repère les deux côtés qui se rejoignent en formant l’angle droit.\n\n" +
      "Calcul : ils sont adjacents à l’angle droit.\n\n" +
      "Conclusion : ce sont les côtés adjacents à l’angle droit.",
    tags: ["pythagore_theoreme", "reconnaitre", "vocabulaire", "qcm"],
  },

  // =========================
  // CALCULER L’HYPOTÉNUSE (compléments)
  // =========================
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    hint: "On additionne les carrés des deux côtés de l’angle droit.",
    tags: ["pythagore_theoreme", "hypotenuse", "short", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      return {
        text: `Un triangle rectangle a pour côtés de l’angle droit ${a} cm et ${b} cm. Quelle est la longueur de l’hypoténuse (en cm) ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          `Définition : $\\text{hypoténuse}^2 = ${a}^2 + ${b}^2$.\n\n` +
          `Méthode : on additionne les carrés, puis on prend la racine carrée.\n\n` +
          `Calcul : $${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${c * c}$, donc $\\sqrt{${c * c}} = ${c}$.\n\n` +
          `Conclusion : l’hypoténuse mesure $${c}$ cm.`,
        canvas: rightTriangleFigure({
          sideLabels: { AB: String(a), CA: String(b), BC: "?" },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a des côtés de l’angle droit de $6$ cm et $8$ cm. Quelle est l’hypoténuse (en cm) ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$6^2 + 8^2 = 100$.",
    explanation:
      "Définition : $\\text{hypoténuse}^2 = 6^2 + 8^2$.\n\n" +
      "Méthode : on additionne les carrés puis on prend la racine.\n\n" +
      "Calcul : $36 + 64 = 100$, donc $\\sqrt{100} = 10$.\n\n" +
      "Conclusion : l’hypoténuse mesure $10$ cm.",
    tags: ["pythagore_theoreme", "hypotenuse", "short"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_tpl_4_qcm",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris d’abord l’égalité de Pythagore.",
    tags: ["pythagore_theoreme", "hypotenuse", "qcm", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      return {
        text: `Dans un triangle rectangle, les côtés de l’angle droit mesurent ${a} cm et ${b} cm. L’hypoténuse mesure…`,
        format: "qcm",
        choices: makeChoices(c, 7).map((v) => `$${v}$`),
        expected: [`$${c}$`],
        comparator: "mcq_exact",
        explanation:
          `Définition : $h^2 = ${a}^2 + ${b}^2$.\n\n` +
          `Méthode : on calcule la somme des carrés puis la racine.\n\n` +
          `Calcul : $h^2 = ${a * a} + ${b * b} = ${c * c}$, donc $h = ${c}$.\n\n` +
          `Conclusion : l’hypoténuse mesure $${c}$ cm.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_tpl_5_diagonale",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 4,
    theme: "neutral",
    hint: "La diagonale d’un rectangle est l’hypoténuse d’un triangle rectangle.",
    tags: ["pythagore_theoreme", "hypotenuse", "diagonale", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      return {
        text: `Un rectangle a pour dimensions ${a} cm et ${b} cm. Quelle est la longueur de sa diagonale (en cm) ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          `Définition : la diagonale partage le rectangle en deux triangles rectangles.\n\n` +
          `Méthode : la diagonale est l’hypoténuse, on applique Pythagore.\n\n` +
          `Calcul : $d^2 = ${a}^2 + ${b}^2 = ${c * c}$, donc $d = ${c}$.\n\n` +
          `Conclusion : la diagonale mesure $${c}$ cm.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_3_piege",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer l’hypoténuse à partir des deux côtés de l’angle droit, on doit…",
    format: "qcm",
    choices: [
      "additionner les carrés puis prendre la racine carrée",
      "soustraire les carrés",
      "additionner les longueurs",
      "multiplier les longueurs",
    ],
    expected: ["additionner les carrés puis prendre la racine carrée"],
    comparator: "mcq_exact",
    hint: "L’hypoténuse est plus grande que chaque côté de l’angle droit.",
    explanation:
      "Définition : $\\text{hypoténuse}^2 = \\text{côté}_1^2 + \\text{côté}_2^2$.\n\n" +
      "Méthode : on additionne les carrés des deux côtés de l’angle droit.\n\n" +
      "Calcul : puis on prend la racine carrée du résultat.\n\n" +
      "Conclusion : on additionne les carrés, puis on prend la racine carrée.",
    tags: ["pythagore_theoreme", "hypotenuse", "methode", "qcm"],
  },

  // =========================
  // CALCULER UN CÔTÉ DE L’ANGLE DROIT (compléments)
  // =========================
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "On soustrait les carrés.",
    tags: ["pythagore_theoreme", "cote", "short", "template"],
    generate: () => {
      const t = randomChoice(pythagoreanTriples);
      const known = randomChoice([t.a, t.b]);
      const missing = known === t.a ? t.b : t.a;
      return {
        text: `Dans un triangle rectangle, l’hypoténuse mesure ${t.c} cm et un côté de l’angle droit mesure ${known} cm. Quelle est la longueur de l’autre côté (en cm) ?`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation:
          `Définition : pour un côté de l’angle droit, $\\text{côté}^2 = \\text{hypoténuse}^2 - \\text{autre côté}^2$.\n\n` +
          `Méthode : on soustrait les carrés.\n\n` +
          `Calcul : $${t.c}^2 - ${known}^2 = ${t.c * t.c} - ${known * known} = ${missing * missing}$, donc $\\sqrt{${missing * missing}} = ${missing}$.\n\n` +
          `Conclusion : l’autre côté mesure $${missing}$ cm.`,
        canvas: rightTriangleFigure({
          sideLabels: {
            AB: known === t.a ? String(t.a) : "?",
            CA: known === t.b ? String(t.b) : "?",
            BC: String(t.c),
          },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a une hypoténuse de $13$ cm et un côté de l’angle droit de $5$ cm. Quelle est la longueur de l’autre côté (en cm) ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "$13^2 - 5^2 = 144$.",
    explanation:
      "Définition : $\\text{côté}^2 = \\text{hypoténuse}^2 - \\text{autre côté}^2$.\n\n" +
      "Méthode : on soustrait les carrés.\n\n" +
      "Calcul : $13^2 - 5^2 = 169 - 25 = 144$, donc $\\sqrt{144} = 12$.\n\n" +
      "Conclusion : l’autre côté mesure $12$ cm.",
    tags: ["pythagore_theoreme", "cote", "short"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_tpl_4_qcm",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "On soustrait les carrés, pas on additionne.",
    tags: ["pythagore_theoreme", "cote", "qcm", "template"],
    generate: () => {
      const t = randomChoice(pythagoreanTriples);
      const known = t.a;
      const missing = t.b;
      return {
        text: `Dans un triangle rectangle, l’hypoténuse mesure ${t.c} cm et un côté de l’angle droit mesure ${known} cm. L’autre côté mesure…`,
        format: "qcm",
        choices: makeChoices(missing, 7).map((v) => `$${v}$`),
        expected: [`$${missing}$`],
        comparator: "mcq_exact",
        explanation:
          `Définition : on cherche un côté de l’angle droit.\n\n` +
          `Méthode : on soustrait les carrés : $${t.c}^2 - ${known}^2$.\n\n` +
          `Calcul : $${t.c * t.c} - ${known * known} = ${missing * missing}$, donc le côté vaut $${missing}$.\n\n` +
          `Conclusion : l’autre côté mesure $${missing}$ cm.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_tpl_5_echelle",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 4,
    theme: "neutral",
    hint: "L’échelle s’appuie contre un mur : Pythagore relie longueur, hauteur et distance au mur.",
    tags: ["pythagore_theoreme", "cote", "probleme", "template"],
    generate: () => {
      const t = randomChoice(pythagoreanTriples);
      const hyp = t.c;
      const base = t.a;
      const haut = t.b;
      return {
        text: `Une échelle de ${hyp} m est posée contre un mur. Son pied est à ${base} m du mur. À quelle hauteur (en m) l’échelle touche-t-elle le mur ?`,
        format: "short",
        expected: [String(haut)],
        comparator: "number_equal",
        explanation:
          `Définition : l’échelle (hypoténuse), le sol et le mur forment un triangle rectangle.\n\n` +
          `Méthode : $\\text{hauteur}^2 = \\text{échelle}^2 - \\text{distance}^2$.\n\n` +
          `Calcul : $${hyp}^2 - ${base}^2 = ${hyp * hyp} - ${base * base} = ${haut * haut}$, donc $\\sqrt{${haut * haut}} = ${haut}$.\n\n` +
          `Conclusion : l’échelle touche le mur à $${haut}$ m.`,
      };
    },
  },

  // =========================
  // RÉCIPROQUE (compléments)
  // =========================
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le carré du plus grand côté à la somme des carrés des deux autres.",
    tags: ["pythagore_theoreme", "reciproque", "qcm", "template"],
    generate: () => {
      const isRight = randomChoice([true, false]);
      const t = isRight ? randomChoice(pythagoreanTriples) : randomChoice(falseTriples);
      return {
        text: `Un triangle a pour côtés ${t.a} cm, ${t.b} cm et ${t.c} cm. Est-il rectangle ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [t.a * t.a + t.b * t.b === t.c * t.c ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : d’après la réciproque, le triangle est rectangle si le carré du plus grand côté égale la somme des carrés des deux autres.\n\n` +
          `Méthode : on compare $${t.a}^2 + ${t.b}^2$ et $${t.c}^2$.\n\n` +
          `Calcul : $${t.a * t.a + t.b * t.b}$ et $${t.c * t.c}$.\n\n` +
          `Conclusion : ${
            t.a * t.a + t.b * t.b === t.c * t.c
              ? "les carrés sont égaux, le triangle est rectangle."
              : "les carrés diffèrent, le triangle n’est pas rectangle."
          }`,
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 2,
    theme: "neutral",
    text: "Pour utiliser la réciproque de Pythagore, on compare…",
    format: "qcm",
    choices: [
      "le carré du plus grand côté à la somme des carrés des deux autres",
      "les trois angles",
      "les périmètres",
      "le plus grand côté à la somme des deux autres",
    ],
    expected: ["le carré du plus grand côté à la somme des carrés des deux autres"],
    comparator: "mcq_exact",
    hint: "On travaille avec des carrés de longueurs.",
    explanation:
      "Définition : la réciproque compare le carré du plus grand côté à la somme des carrés des deux autres.\n\n" +
      "Méthode : on repère le plus grand côté, puis on calcule les carrés.\n\n" +
      "Calcul : si l’égalité est vérifiée, le triangle est rectangle.\n\n" +
      "Conclusion : on compare le carré du plus grand côté à la somme des carrés des deux autres.",
    tags: ["pythagore_theoreme", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle a pour côtés $9$ cm, $12$ cm et $15$ cm. Est-il rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare $9^2 + 12^2$ et $15^2$.",
    explanation:
      "Définition : on applique la réciproque de Pythagore.\n\n" +
      "Méthode : on compare $9^2 + 12^2$ et $15^2$.\n\n" +
      "Calcul : $81 + 144 = 225$ et $15^2 = 225$ : égalité vérifiée.\n\n" +
      "Conclusion : oui, le triangle est rectangle.",
    tags: ["pythagore_theoreme", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_fixed_4_nonrectangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle a pour côtés $4$ cm, $5$ cm et $6$ cm. Est-il rectangle ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare $4^2 + 5^2$ et $6^2$.",
    explanation:
      "Définition : on applique la réciproque de Pythagore.\n\n" +
      "Méthode : on compare $4^2 + 5^2$ et $6^2$.\n\n" +
      "Calcul : $16 + 25 = 41$ alors que $6^2 = 36$ : pas d’égalité.\n\n" +
      "Conclusion : non, le triangle n’est pas rectangle.",
    tags: ["pythagore_theoreme", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_fixed_5_angle_droit",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "Un triangle $ABC$ avec $AB = 6$, $AC = 8$, $BC = 10$ est rectangle. En quel sommet se trouve l’angle droit ?",
    format: "qcm",
    choices: ["en $A$", "en $B$", "en $C$", "il n’y a pas d’angle droit"],
    expected: ["en $A$"],
    comparator: "mcq_exact",
    hint: "L’angle droit est opposé au plus grand côté (l’hypoténuse).",
    explanation:
      "Définition : l’hypoténuse est le plus grand côté ; l’angle droit est à son sommet opposé.\n\n" +
      "Méthode : le plus grand côté est $BC = 10$, donc l’angle droit est opposé à $BC$.\n\n" +
      "Calcul : le sommet opposé à $BC$ est $A$.\n\n" +
      "Conclusion : l’angle droit est en $A$.",
    tags: ["pythagore_theoreme", "reciproque", "angle_droit", "qcm"],
  },

  // =========================
  // RÉDIGER (compléments)
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une rédaction avec Pythagore direct, quelle est la première chose à écrire ?",
    format: "qcm",
    choices: [
      "que le triangle est rectangle et où",
      "le résultat final",
      "le périmètre",
      "la liste des angles",
    ],
    expected: ["que le triangle est rectangle et où"],
    comparator: "mcq_exact",
    hint: "Pythagore direct suppose le triangle déjà rectangle.",
    explanation:
      "Définition : le théorème direct s’applique à un triangle dont on sait qu’il est rectangle.\n\n" +
      "Méthode : on commence par préciser que le triangle est rectangle et en quel sommet.\n\n" +
      "Calcul : ensuite seulement, on écrit l’égalité de Pythagore.\n\n" +
      "Conclusion : on indique d’abord que le triangle est rectangle et où.",
    tags: ["pythagore_theoreme", "rediger", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_4_ordre",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le bon ordre pour rédiger un calcul de longueur avec Pythagore ?",
    format: "qcm",
    choices: [
      "phrase de départ → égalité de Pythagore → calcul → conclusion",
      "calcul → conclusion → phrase de départ",
      "conclusion → calcul → égalité",
      "égalité → conclusion → phrase de départ",
    ],
    expected: ["phrase de départ → égalité de Pythagore → calcul → conclusion"],
    comparator: "mcq_exact",
    hint: "On part de l’hypothèse, on applique le théorème, on calcule, on conclut.",
    explanation:
      "Définition : une rédaction suit une logique : hypothèse, théorème, calcul, conclusion.\n\n" +
      "Méthode : on annonce le triangle rectangle, puis on écrit l’égalité, on calcule, on conclut.\n\n" +
      "Calcul : cet ordre rend la démonstration claire.\n\n" +
      "Conclusion : phrase de départ → égalité de Pythagore → calcul → conclusion.",
    tags: ["pythagore_theoreme", "rediger", "ordre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_5_reciproque_phrase",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Pour conclure avec la réciproque, quelle phrase convient ?",
    format: "qcm",
    choices: [
      "« les carrés sont égaux, donc d’après la réciproque de Pythagore, le triangle est rectangle »",
      "« le triangle est rectangle, donc je calcule l’hypoténuse »",
      "« les côtés sont parallèles »",
      "« le périmètre est égal à l’aire »",
    ],
    expected: [
      "« les carrés sont égaux, donc d’après la réciproque de Pythagore, le triangle est rectangle »",
    ],
    comparator: "mcq_exact",
    hint: "On conclut sur la nature du triangle, pas sur une longueur.",
    explanation:
      "Définition : la réciproque permet de conclure qu’un triangle est rectangle.\n\n" +
      "Méthode : après avoir comparé les carrés, on conclut sur la nature du triangle.\n\n" +
      "Calcul : si l’égalité est vérifiée, le triangle est rectangle.\n\n" +
      "Conclusion : on écrit « les carrés sont égaux, donc d’après la réciproque, le triangle est rectangle ».",
    tags: ["pythagore_theoreme", "rediger", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_6_erreur",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit directement « d’après Pythagore, $BC^2 = AB^2 + AC^2$ » sans préciser que le triangle est rectangle en $A$. Sa rédaction est-elle complète ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le théorème direct exige de dire que le triangle est rectangle.",
    explanation:
      "Définition : le théorème direct s’applique seulement à un triangle rectangle.\n\n" +
      "Méthode : on doit préciser que le triangle est rectangle et en quel sommet.\n\n" +
      "Calcul : sans cette hypothèse, l’égalité n’est pas justifiée.\n\n" +
      "Conclusion : non, la rédaction n’est pas complète.",
    tags: ["pythagore_theoreme", "rediger", "erreur", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_rediger_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    hint: "On part toujours du triangle rectangle, puis de l’égalité.",
    tags: ["pythagore_theoreme", "rediger", "qcm", "template"],
    generate: () => {
      const labels = randomChoice(triangleNames);
      const correct = `Dans le triangle ${sideName(labels, "AB")}${labels.C} rectangle en ${labels.A}, d’après le théorème de Pythagore, $${sideName(
        labels,
        "BC"
      )}^2 = ${sideName(labels, "AB")}^2 + ${sideName(labels, "CA")}^2$`;
      return {
        text: `Quelle phrase commence correctement une rédaction de Pythagore dans un triangle rectangle en ${labels.A} ?`,
        format: "qcm",
        choices: shuffle([
          correct,
          `Comme ${labels.A}, ${labels.B}, ${labels.C} sont alignés, d’après Pythagore…`,
          `Le périmètre vaut ${sideName(labels, "AB")} + ${sideName(labels, "BC")} + ${sideName(labels, "CA")}`,
          `Les côtés sont parallèles, donc d’après Pythagore…`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : on commence par énoncer le triangle rectangle et le théorème.\n\n` +
          `Méthode : on précise « rectangle en ${labels.A} », puis l’égalité.\n\n` +
          `Calcul : $${sideName(labels, "BC")}^2 = ${sideName(labels, "AB")}^2 + ${sideName(labels, "CA")}^2$.\n\n` +
          `Conclusion : la bonne phrase mentionne le triangle rectangle puis l’égalité de Pythagore.`,
      };
    },
  },

  // =========================
  // DÉFIS (compléments)
  // =========================
  {
    kind: "template",
    id: "pythagore_theoreme_defi_tpl_3_diagonale_carre",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Modélise par un triangle rectangle dont l’hypoténuse est la distance cherchée.",
    tags: ["pythagore_theoreme", "defi", "probleme", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      return {
        text: `Un terrain rectangulaire mesure ${a} m sur ${b} m. Quelle distance (en m) parcourt-on en traversant en diagonale ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          `Définition : la diagonale est l’hypoténuse d’un triangle rectangle.\n\n` +
          `Méthode : on applique Pythagore avec les deux côtés du terrain.\n\n` +
          `Calcul : $d^2 = ${a}^2 + ${b}^2 = ${c * c}$, donc $d = ${c}$.\n\n` +
          `Conclusion : la diagonale mesure $${c}$ m.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_defi_tpl_4_choix_methode",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calculer une longueur (triangle rectangle connu) vs vérifier qu’un triangle est rectangle.",
    tags: ["pythagore_theoreme", "defi", "choix_methode", "qcm", "template"],
    generate: () => {
      const cherche = randomChoice([true, false]);
      return {
        text: cherche
          ? "On sait qu’un triangle est rectangle et on veut calculer une longueur. On utilise…"
          : "On connaît les trois longueurs et on veut savoir si le triangle est rectangle. On utilise…",
        format: "qcm",
        choices: shuffle([
          "le théorème de Pythagore direct",
          "la réciproque du théorème de Pythagore",
        ]),
        expected: [cherche ? "le théorème de Pythagore direct" : "la réciproque du théorème de Pythagore"],
        comparator: "mcq_exact",
        explanation:
          `Définition : le théorème direct calcule une longueur ; la réciproque vérifie qu’un triangle est rectangle.\n\n` +
          `Méthode : on choisit selon ce que l’on connaît et ce que l’on cherche.\n\n` +
          `Calcul : ${
            cherche
              ? "ici le triangle est déjà rectangle et on cherche une longueur → théorème direct."
              : "ici on connaît les trois côtés et on teste l’angle droit → réciproque."
          }\n\n` +
          `Conclusion : on utilise ${cherche ? "le théorème direct" : "la réciproque"}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une porte rectangulaire mesure $2{,}0$ m de haut et $1{,}5$ m de large. Quelle est la longueur de sa diagonale (en m) ?",
    format: "short",
    expected: ["2.5", "2,5"],
    comparator: "number_equal",
    hint: "$2{,}0^2 + 1{,}5^2 = 6{,}25$.",
    explanation:
      "Définition : la diagonale est l’hypoténuse d’un triangle rectangle.\n\n" +
      "Méthode : on applique Pythagore avec la hauteur et la largeur.\n\n" +
      "Calcul : $2{,}0^2 + 1{,}5^2 = 4 + 2{,}25 = 6{,}25$, donc $\\sqrt{6{,}25} = 2{,}5$.\n\n" +
      "Conclusion : la diagonale mesure $2{,}5$ m.",
    tags: ["pythagore_theoreme", "defi", "diagonale", "short"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_2_brevet",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un mât est maintenu par un câble de $13$ m fixé au sol à $5$ m du pied du mât. À quelle hauteur (en m) le câble est-il attaché sur le mât ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Le câble est l’hypoténuse : $13^2 - 5^2$.",
    explanation:
      "Définition : le mât, le sol et le câble forment un triangle rectangle.\n\n" +
      "Méthode : la hauteur est un côté de l’angle droit : $\\text{hauteur}^2 = 13^2 - 5^2$.\n\n" +
      "Calcul : $169 - 25 = 144$, donc $\\sqrt{144} = 12$.\n\n" +
      "Conclusion : le câble est attaché à $12$ m.",
    tags: ["pythagore_theoreme", "defi", "brevet", "short"],
  },
];