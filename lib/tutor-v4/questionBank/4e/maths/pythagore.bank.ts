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

// ⭐ « LES CARRÉS PARFAITS DE 1 À 144 » EST UNE CONNAISSANCE DU BO (cycle 4,
// p. 130) : ce sont les carrés de 1 à 12, et LE 1 EN FAIT PARTIE. Il manquait
// ici — la table commençait à 2² — jusqu'au 27/08/2026. Ce n'est pas un détail
// de complétude : 1² = 1 et √1 = 1 sont un point d'achoppement réel (beaucoup
// d'élèves cherchent un nombre « plus petit »), et c'est le seul carré parfait
// qu'aucun autre item du dépôt ne fait rencontrer.
//
// ⚠️ Au-delà de 144, la table ne sert plus la connaissance mais le THÉORÈME :
// 13² = 169 est indispensable au triplet 5-12-13, et 14² et 15² accompagnent
// les longueurs des figures. On les garde pour cette raison-là, pas au titre
// des carrés parfaits du programme.
const knownSquares = [
  { n: 1, square: 1 },
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
    id: "pythagore_theoreme_carre_racine_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut 5² ?",
    format: "qcm",
    choices: ["10", "25", "7", "15"],
    expected: ["25"],
    comparator: "mcq_exact",
    hint: "5² signifie 5 × 5.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("5² = 5 × 5 = 25.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_carre_racine_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut √49 ?",
    format: "qcm",
    choices: ["6", "7", "8", "14"],
    expected: ["7"],
    comparator: "mcq_exact",
    hint: "Cherche le nombre qui multiplié par lui-même donne 49.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Comme 7² = 49, alors √49 = 7.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "racine", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_carre_racine_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut 3² ?",
    format: "qcm",
    choices: ["6", "9", "5", "12"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Attention : 3² ne veut pas dire 3 × 2.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("3² = 3 × 3 = 9.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "carre", "piege"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_carre_racine_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut √36 ?",
    format: "qcm",
    choices: ["5", "6", "18", "9"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "6 × 6 = 36.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Comme 6² = 36, alors √36 = 6.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "racine"],
  },

 {
  kind: "template",
  id: "pythagore_theoreme_carre_racine_tpl_2",
  niveau: "4e",
  matiere: "maths",
  notionId: "pythagore_theoreme",
  microId: "pythagore_carre_racine",
  difficulty: 1,
  theme: "neutral",
  hint: "Cherche le nombre positif dont le carré donne ce résultat.",
  tags: ["pythagore_theoreme_theoreme", "racine", "template"],
  generate: () => {
    const { n, square } = randomChoice(knownSquares);
    return {
      text: `Combien vaut √${square} ?`,
      format: "short",
      expected: [String(n)],
      comparator: "number_equal",
      explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`Comme ${n}² = ${square}, alors √${square} = ${n}.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    };
  },
},
  {
    kind: "template",
    id: "pythagore_theoreme_carre_racine_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule chaque carré, puis additionne.",
    tags: ["pythagore_theoreme_theoreme", "carre", "somme", "template"],
    generate: () => {
      const a = randomInt(2, 12);
      const b = randomInt(2, 12);
      const result = a * a + b * b;

      return {
        text: `Combien vaut ${a}² + ${b}² ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`${a}² + ${b}² = ${a * a} + ${b * b} = ${result}.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_carre_racine_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 2,
    theme: "neutral",
    hint: "Distingue bien carré et racine carrée.",
    tags: ["pythagore_theoreme_theoreme", "carre", "racine", "qcm", "template"],
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
          "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (mode === "carre"
            ? `${n}² = ${n} × ${n} = ${square}.`
            : `Comme ${n}² = ${square}, alors √${square} = ${n}.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },
    {
    kind: "fixed",
    id: "pythagore_theoreme_carre_racine_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 3² ne vaut pas 6.",
    format: "open",
    expected: ["3", "3", "9"],
    comparator: "contains_keyword",
    hint: "Un carré signifie multiplier le nombre par lui-même.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("3² signifie 3 × 3, donc 3² = 9. Ce n’est pas 3 × 2.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "carre", "open", "piege"],
  },

  // =========================
  // RECONNAÎTRE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
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
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Le théorème de Pythagore s’applique dans un triangle rectangle.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_2",
    niveau: "4e",
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
    hint: "L’hypoténuse est en face de l’angle droit.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Dans un triangle rectangle, l’hypoténuse est le côté opposé à l’angle droit.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
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
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Non. On parle d’hypoténuse seulement dans un triangle rectangle.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "piege"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "L’hypoténuse est le côté opposé à l’angle droit.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "canvas", "template"],
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
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`Le triangle est rectangle en ${labels.A}. L’hypoténuse est le côté opposé à l’angle droit, donc c’est le côté ${sideName(
      labels,
      hyp
    )}.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    canvas: rightTriangleFigure({ labels }),
  };
},
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche si le triangle est codé rectangle.",
    tags: ["pythagore_theoreme_theoreme", "triangle_rectangle", "canvas", "template"],
    generate: () => {
      const isRight = randomChoice([true, false]);
      const labels = randomChoice(triangleNames);

      // ⛔ RÉPARÉ LE 31/08/2026 : ce gabarit ne fabriquait qu'UN SEUL énoncé.
      // Il tirait pourtant déjà ses `labels` dans `triangleNames` — mais il ne
      // s'en servait QUE pour le dessin, jamais dans la question. Le nommage
      // était là, inutilisé.
      const nom = `${labels.A}${labels.B}${labels.C}`;
      return {
        text: `Peut-on utiliser directement le théorème de Pythagore dans le triangle ${nom} ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [isRight ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : le théorème de Pythagore ne s'applique QUE dans un triangle rectangle. C'est sa condition d'emploi, pas un détail.\n\n" +
          "Méthode : avant tout calcul, on cherche l'angle droit CODÉ sur la figure — le petit carré. Puis on repère l'hypoténuse, en face de lui.\n\n" +
          (isRight
            ? `Calcul : le triangle ${nom} porte bien un angle droit codé.\n\nConclusion : oui, on peut appliquer Pythagore.`
            : `Calcul : ⚠️ aucun angle droit n'est codé sur ${nom}.\n\nConclusion : non. ⭐ Un triangle qui « a l'air » rectangle ne l'est pas : seul le codage le prouve. Sans lui, Pythagore ne s'applique pas — et la réciproque servirait justement à le démontrer.`),
        canvas: isRight
          ? rightTriangleFigure({ labels })
          : nonRightTriangleFigure({ labels }),
      };
    },
  },
    {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi on ne peut pas toujours utiliser le théorème de Pythagore dans n’importe quel triangle.",
    format: "open",
    expected: ["triangle", "rectangle"],
    comparator: "contains_keyword",
    hint: "Le théorème de Pythagore demande une condition sur le triangle.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("On utilise directement le théorème de Pythagore seulement dans un triangle rectangle.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reconnaitre", "open"],
  },

  // =========================
  // CALCULER L’HYPOTÉNUSE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a pour côtés de l’angle droit 3 cm et 4 cm. Quelle est son hypoténuse ?",
    format: "qcm",
    choices: ["5", "6", "7", "12"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "3² + 4² = 9 + 16 = 25.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("c² = 3² + 4² = 25, donc c = √25 = 5.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "triplet"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a pour côtés de l’angle droit 6 cm et 8 cm. Quelle est son hypoténuse ?",
    format: "qcm",
    choices: ["10", "12", "14", "48"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "6² + 8² = 36 + 64 = 100.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("c² = 6² + 8² = 100, donc c = √100 = 10.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "triplet"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les carrés des deux côtés de l’angle droit.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "triplet", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      const labels = randomChoice(triangleNames);

      return {
        text: `Un triangle rectangle a pour côtés de l’angle droit ${a} cm et ${b} cm. Quelle est la longueur de l’hypoténuse ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${
          c * c
        }, donc c = √${c * c} = ${c}.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
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
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche l’hypoténuse : on additionne les carrés.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "qcm", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      return {
        text: `Dans un triangle rectangle, les côtés de l’angle droit mesurent ${a} cm et ${b} cm. Quelle est l’hypoténuse ?`,
        format: "qcm",
        choices: makeChoices(c, 8),
        expected: [String(c)],
        comparator: "mcq_exact",
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`${a}² + ${b}² = ${a * a} + ${b * b} = ${
          c * c
        }, donc l’hypoténuse mesure ${c} cm.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },
    {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand on cherche l’hypoténuse, on additionne les carrés des deux côtés de l’angle droit.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "open", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);

      return {
        text: `Explique pourquoi l’hypoténuse vaut ${c} cm si les côtés de l’angle droit mesurent ${a} cm et ${b} cm.`,
        format: "open",
        expected: [String(a), String(b), String(c), "carrés"],
        comparator: "contains_keyword",
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`On additionne les carrés des côtés de l’angle droit : ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}. Donc l’hypoténuse vaut √${c * c} = ${c} cm.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },

  // =========================
  // CALCULER UN CÔTÉ
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a une hypoténuse de 5 cm et un côté de l’angle droit de 3 cm. Quelle est l’autre côté ?",
    format: "qcm",
    choices: ["2", "4", "8", "16"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "On calcule 5² - 3².",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("L’autre côté vérifie b² = 5² - 3² = 25 - 9 = 16, donc b = 4.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "cote", "triplet"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a une hypoténuse de 10 cm et un côté de l’angle droit de 6 cm. Quelle est l’autre côté ?",
    format: "qcm",
    choices: ["4", "8", "12", "16"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "On calcule 10² - 6².",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("L’autre côté vérifie b² = 10² - 6² = 100 - 36 = 64, donc b = 8.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "cote", "triplet"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche un côté de l’angle droit : on soustrait les carrés.",
    tags: ["pythagore_theoreme_theoreme", "cote", "triplet", "template"],
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
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`On soustrait : ${triple.c}² - ${knownLeg}² = ${
          triple.c * triple.c
        } - ${knownLeg * knownLeg} = ${missingLeg * missingLeg}. Donc la longueur cherchée vaut √${
          missingLeg * missingLeg
        } = ${missingLeg}.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
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
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention : pour un côté de l’angle droit, on ne fait pas une addition.",
    tags: ["pythagore_theoreme_theoreme", "cote", "piege", "qcm", "template"],
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
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`On calcule ${triple.c}² - ${knownLeg}² = ${
          triple.c * triple.c
        } - ${knownLeg * knownLeg} = ${missingLeg * missingLeg}, donc la longueur vaut ${missingLeg} cm.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },
    {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 4,
    theme: "neutral",
    hint: "Quand on cherche un côté de l’angle droit, on soustrait les carrés.",
    tags: ["pythagore_theoreme_theoreme", "cote", "open", "template"],
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
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`On cherche un côté de l’angle droit, donc on soustrait les carrés : ${triple.c}² - ${knownLeg}² = ${triple.c * triple.c} - ${knownLeg * knownLeg} = ${missingLeg * missingLeg}. Donc la longueur vaut ${missingLeg} cm.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },

  // =========================
  // RÉCIPROQUE : VÉRIFIER
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_verifier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "L’égalité 3² + 4² = 5² est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare 3² + 4² avec 5².",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("3² + 4² = 9 + 16 = 25 et 5² = 25. L’égalité est vraie.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_verifier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "L’égalité 5² + 12² = 13² est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "25 + 144 = ?",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("5² + 12² = 25 + 144 = 169 et 13² = 169. L’égalité est vraie.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_verifier_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "L’égalité 4² + 5² = 6² est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare 16 + 25 avec 36.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("4² + 5² = 16 + 25 = 41 alors que 6² = 36. L’égalité est fausse.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "faux_triplet"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_verifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la somme des carrés des deux plus petits côtés avec le carré du plus grand.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "template"],
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
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`${triple.a}² + ${triple.b}² = ${left} et ${triple.c}² = ${right}. L’égalité est donc ${
          left === right ? "vraie" : "fausse"
        }.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },
    {
    kind: "template",
    id: "pythagore_theoreme_reciproque_verifier_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la somme des carrés des deux plus petits côtés avec le carré du plus grand.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier", "open", "template"],
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
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`${triple.a}² + ${triple.b}² = ${left} et ${triple.c}² = ${right}. Les deux résultats sont égaux, donc l’égalité de Pythagore est vérifiée.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },

  // =========================
  // RÉCIPROQUE : CONCLURE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_conclure_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Si AB² + AC² = BC², alors le triangle ABC est rectangle…",
    format: "qcm",
    choices: ["en A", "en B", "en C", "on ne peut pas conclure"],
    expected: ["en A"],
    comparator: "mcq_exact",
    hint: "Le plus grand côté est BC, donc l’angle droit est au point opposé.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Si AB² + AC² = BC², alors BC est l’hypoténuse et le triangle est rectangle en A.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_conclure_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Si la somme des carrés des deux plus petits côtés n’est pas égale au carré du plus grand côté, alors le triangle est…",
    format: "qcm",
    choices: ["rectangle", "non rectangle", "toujours isocèle", "toujours équilatéral"],
    expected: ["non rectangle"],
    comparator: "mcq_exact",
    hint: "La réciproque ne fonctionne que si l’égalité est vraie.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Si l’égalité de Pythagore n’est pas vraie, alors le triangle n’est pas rectangle.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_conclure_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    hint: "Teste l’égalité avec le plus grand côté.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure", "template"],
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
          "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (left === right
            ? `${triple.a}² + ${triple.b}² = ${left} et ${triple.c}² = ${right}. L’égalité est vraie, donc le triangle est rectangle.`
            : `${triple.a}² + ${triple.b}² = ${left} alors que ${triple.c}² = ${right}. L’égalité est fausse, donc le triangle n’est pas rectangle.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
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
    id: "pythagore_theoreme_reciproque_conclure_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "Le sommet de l’angle droit est opposé au plus grand côté.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "sommet", "template"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      const labels = randomChoice(triangleNames);

      return {
        text: `Dans le triangle représenté, les longueurs sont ${triple.a} cm, ${triple.b} cm et ${triple.c} cm. Si le triangle est rectangle, en quel sommet est l’angle droit ?`,
        format: "qcm",
        choices: shuffle([labels.A, labels.B, labels.C]),
        expected: [labels.A],
        comparator: "mcq_exact",
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`Le plus grand côté est ${sideName(labels, "BC")}. L’angle droit est donc au sommet opposé : ${labels.A}.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
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
    id: "pythagore_theoreme_reciproque_conclure_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "Le triangle est rectangle si l’égalité de Pythagore est vraie.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure", "open", "template"],
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
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`On vérifie : ${triple.a}² + ${triple.b}² = ${triple.c * triple.c} et ${triple.c}² = ${triple.c * triple.c}. L’égalité est vraie, donc d’après la réciproque du théorème de Pythagore, le triangle est rectangle.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },
  // =========================
  // RÉDIGER
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase convient pour commencer une rédaction avec le théorème de Pythagore ?",
    format: "qcm",
    choices: [
      "Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore…",
      "Dans le triangle ABC rectangle en A, d’après la réciproque de Pythagore…",
      "Dans le triangle ABC isocèle en A, d’après le théorème de Pythagore…",
      "Dans le triangle ABC, d’après le théorème de Pythagore appliqué en A…",
    ],
    expected: [
      "Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore…",
    ],
    comparator: "mcq_exact",
    hint: "Le théorème direct part d’un triangle déjà rectangle.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Pour utiliser le théorème de Pythagore, on commence par indiquer que le triangle est rectangle.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "redaction"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase convient pour utiliser la réciproque de Pythagore ?",
    format: "qcm",
    choices: [
      "On compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté.",
      "On compare la somme des carrés des trois côtés avec le carré du plus grand côté.",
      "On compare le produit des deux plus petits côtés avec le carré du plus grand côté.",
      "On compare la somme des deux plus petits côtés avec la longueur du plus grand côté.",
    ],
    expected: [
      "On compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté.",
    ],
    comparator: "mcq_exact",
    hint: "La réciproque sert à vérifier si un triangle est rectangle.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Pour la réciproque, on compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "redaction"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_rediger_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "On cherche l’hypoténuse, donc on additionne les carrés.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "template"],
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
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`Pour calculer l’hypoténuse, on utilise c² = ${a}² + ${b}².`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_rediger_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour la réciproque, on ne suppose pas que le triangle est rectangle : on vérifie.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "redaction", "template"],
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
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`Le plus grand côté est ${c}. On compare donc ${a}² + ${b}² avec ${c}².`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre utiliser le théorème de Pythagore et utiliser sa réciproque.",
    format: "open",
    expected: ["théorème", "réciproque", "rectangle"],
    comparator: "contains_keyword",
    hint: "Dans un cas, on sait déjà que le triangle est rectangle. Dans l’autre, on veut le vérifier.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Le théorème de Pythagore sert à calculer une longueur dans un triangle déjà rectangle. La réciproque sert à vérifier si un triangle est rectangle à partir de ses trois longueurs.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "reciproque", "open"],
  },
  // =========================
  // DÉFIS
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
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
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Quand on connaît trois longueurs et qu’on veut savoir si le triangle est rectangle, on utilise la réciproque.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "defi", "reciproque"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « J’ai trois longueurs, donc j’utilise directement le théorème de Pythagore. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le théorème direct nécessite déjà un triangle rectangle.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Non. Avec trois longueurs, on utilise la réciproque pour vérifier si le triangle est rectangle.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "defi", "piege"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Modélise la situation par un triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "defi", "probleme", "reunion", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);

      return {
        text: `À La Réunion, un sentier monte de ${a} centaines de mètres en hauteur et avance horizontalement de ${b} centaines de mètres. En ligne droite, quelle distance représente le sentier ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`On modélise par un triangle rectangle : distance² = ${a}² + ${b}² = ${
          c * c
        }, donc la distance vaut ${c} centaines de mètres.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Teste les deux triangles avec la réciproque.",
    tags: ["pythagore_theoreme_theoreme", "defi", "hpi", "template"],
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
        explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          (`${good.a}² + ${good.b}² = ${good.c}², donc ${goodName} est rectangle. Pour l’autre triangle, l’égalité de Pythagore est fausse.`) +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },
    {
    kind: "template",
    id: "pythagore_theoreme_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Commence par repérer si on calcule une longueur ou si on vérifie que le triangle est rectangle.",
    tags: ["pythagore_theoreme_theoreme", "defi", "open", "raisonnement", "template"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);

      return {
        text: `Un élève connaît les trois longueurs ${triple.a} cm, ${triple.b} cm et ${triple.c} cm. Explique pourquoi il doit utiliser la réciproque et non le théorème direct.`,
        format: "open",
        expected: ["trois", "longueurs", "réciproque", "rectangle"],
        comparator: "contains_keyword",
        explanation:
          "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Quand on connaît les trois longueurs et qu’on veut savoir si le triangle est rectangle, on utilise la réciproque. Le théorème direct s’utilise seulement quand on sait déjà que le triangle est rectangle.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
      };
    },
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- CARRÉS ET RACINES ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_carre_racine_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut 8² ?",
    format: "qcm",
    choices: ["16", "64", "32", "81"],
    expected: ["64"],
    comparator: "mcq_exact",
    hint: "8² = 8 × 8.",
    explanation:
      "Définition : élever au carré, c’est multiplier le nombre par lui-même.\n\n" +
      "Méthode : 8² = 8 × 8.\n\n" +
      "Calcul : 8 × 8 = 64.\n\n" +
      "Conclusion : 8² = 64.",
    tags: ["pythagore_theoreme_theoreme", "carre", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_carre_racine_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule chaque carré, puis soustrais.",
    tags: ["pythagore_theoreme_theoreme", "carre", "difference", "template"],
    generate: () => {
      const a = randomInt(5, 14);
      const b = randomInt(2, a - 1);
      const result = a * a - b * b;
      return {
        text: `Combien vaut ${a}² - ${b}² ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : on calcule chaque carré séparément.\n\n" +
          "Méthode : on soustrait le second carré du premier.\n\n" +
          `Calcul : ${a}² - ${b}² = ${a * a} - ${b * b} = ${result}.\n\n` +
          `Conclusion : ${a}² - ${b}² = ${result}.`,
      };
    },
  },

  // ---------- RECONNAÎTRE ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’angles droits possède un triangle rectangle ?",
    format: "qcm",
    choices: ["un", "deux", "trois", "aucun"],
    expected: ["un"],
    comparator: "mcq_exact",
    hint: "« Rectangle » indique un angle droit.",
    explanation:
      "Définition : un triangle rectangle a un angle droit.\n\n" +
      "Méthode : on compte les angles droits possibles.\n\n" +
      "Calcul : un triangle ne peut avoir qu’un seul angle droit.\n\n" +
      "Conclusion : un triangle rectangle a un angle droit.",
    tags: ["pythagore_theoreme_theoreme", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Le triangle MNP est rectangle en M. Quelle est son hypoténuse ?",
    format: "qcm",
    choices: ["NP", "MN", "MP", "M"],
    expected: ["NP"],
    comparator: "mcq_exact",
    hint: "L’hypoténuse est opposée à l’angle droit (en M).",
    explanation:
      "Définition : l’hypoténuse est le côté opposé à l’angle droit.\n\n" +
      "Méthode : l’angle droit est en M, son côté opposé est NP.\n\n" +
      "Calcul : le côté opposé à M est [NP].\n\n" +
      "Conclusion : l’hypoténuse est NP.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reconnaitre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "L’hypoténuse est opposée à l’angle droit.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "canvas", "template"],
    generate: () => {
      const labels = randomChoice(triangleNames);
      return {
        text: `Le triangle est rectangle en ${labels.A}. Quel côté est l’hypoténuse ?`,
        format: "qcm",
        choices: shuffle([
          sideName(labels, "AB"),
          sideName(labels, "BC"),
          sideName(labels, "CA"),
        ]),
        expected: [sideName(labels, "BC")],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’hypoténuse est le côté opposé à l’angle droit.\n\n" +
          `Méthode : l’angle droit est en ${labels.A}.\n\n` +
          `Calcul : le côté opposé à ${labels.A} est ${sideName(labels, "BC")}.\n\n` +
          `Conclusion : l’hypoténuse est ${sideName(labels, "BC")}.`,
        canvas: rightTriangleFigure({ labels }),
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment repérer l’hypoténuse dans un triangle rectangle.",
    format: "open",
    expected: ["opposé", "angle droit", "grand"],
    comparator: "contains_keyword",
    hint: "Pense à la position par rapport à l’angle droit.",
    explanation:
      "Définition : l’hypoténuse est le côté opposé à l’angle droit.\n\n" +
      "Méthode : on repère l’angle droit, puis le côté en face.\n\n" +
      "Calcul : c’est aussi le plus grand côté du triangle.\n\n" +
      "Conclusion : l’hypoténuse est le côté opposé à l’angle droit (le plus grand).",
    tags: ["pythagore_theoreme_theoreme", "reconnaitre", "open"],
  },

  // ---------- CALCULER L’HYPOTÉNUSE ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a pour côtés de l’angle droit 9 cm et 12 cm. Quelle est son hypoténuse ?",
    format: "qcm",
    choices: ["15", "21", "13", "18"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "9² + 12² = 81 + 144 = 225.",
    explanation:
      "Définition : c² = a² + b² pour l’hypoténuse.\n\n" +
      "Méthode : on additionne les carrés.\n\n" +
      "Calcul : 9² + 12² = 225, donc c = √225 = 15.\n\n" +
      "Conclusion : l’hypoténuse mesure 15 cm.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle rectangle a pour côtés de l’angle droit 8 cm et 15 cm. Quelle est son hypoténuse ?",
    format: "qcm",
    choices: ["17", "23", "19", "20"],
    expected: ["17"],
    comparator: "mcq_exact",
    hint: "8² + 15² = 64 + 225 = 289.",
    explanation:
      "Définition : c² = a² + b².\n\n" +
      "Méthode : on additionne les carrés.\n\n" +
      "Calcul : 64 + 225 = 289, donc c = √289 = 17.\n\n" +
      "Conclusion : l’hypoténuse mesure 17 cm.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    hint: "Modélise l’échelle par l’hypoténuse d’un triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "probleme", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      return {
        text: `Une échelle est posée contre un mur. Le pied est à ${a} m du mur et le haut atteint ${b} m de hauteur. Quelle est la longueur de l’échelle ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          "Définition : l’échelle est l’hypoténuse d’un triangle rectangle.\n\n" +
          "Méthode : longueur² = distance² + hauteur².\n\n" +
          `Calcul : ${a}² + ${b}² = ${a * a + b * b}, donc longueur = √${a * a + b * b} = ${c} m.\n\n` +
          `Conclusion : l’échelle mesure ${c} m.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche d’abord le carré de l’hypoténuse.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      return {
        text: `Dans un triangle rectangle, les côtés de l’angle droit mesurent ${a} cm et ${b} cm. Combien vaut le carré de l’hypoténuse (c²) ?`,
        format: "short",
        expected: [String(c * c)],
        comparator: "number_equal",
        explanation:
          "Définition : c² = a² + b².\n\n" +
          "Méthode : on additionne les carrés des côtés de l’angle droit.\n\n" +
          `Calcul : ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}.\n\n` +
          `Conclusion : c² = ${c * c} (et c = ${c} cm).`,
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi, pour trouver l’hypoténuse, on additionne les carrés des côtés de l’angle droit.",
    format: "open",
    expected: ["additionne", "carrés", "hypoténuse"],
    comparator: "contains_keyword",
    hint: "Pense à la formule c² = a² + b².",
    explanation:
      "Définition : le théorème de Pythagore donne c² = a² + b².\n\n" +
      "Méthode : l’hypoténuse au carré est la somme des carrés des deux autres côtés.\n\n" +
      "Calcul : on additionne a² et b², puis on prend la racine.\n\n" +
      "Conclusion : on additionne les carrés car c² = a² + b².",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "open"],
  },

  // ---------- CALCULER UN CÔTÉ ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a une hypoténuse de 13 cm et un côté de l’angle droit de 5 cm. Quelle est l’autre côté ?",
    format: "qcm",
    choices: ["12", "8", "18", "10"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "13² - 5² = 169 - 25.",
    explanation:
      "Définition : pour un côté de l’angle droit, b² = c² - a².\n\n" +
      "Méthode : on soustrait les carrés.\n\n" +
      "Calcul : 169 - 25 = 144, donc b = √144 = 12.\n\n" +
      "Conclusion : l’autre côté mesure 12 cm.",
    tags: ["pythagore_theoreme_theoreme", "cote", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle rectangle a une hypoténuse de 17 cm et un côté de l’angle droit de 8 cm. Quelle est l’autre côté ?",
    format: "qcm",
    choices: ["15", "9", "13", "25"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "17² - 8² = 289 - 64.",
    explanation:
      "Définition : b² = c² - a².\n\n" +
      "Méthode : on soustrait les carrés.\n\n" +
      "Calcul : 289 - 64 = 225, donc b = √225 = 15.\n\n" +
      "Conclusion : l’autre côté mesure 15 cm.",
    tags: ["pythagore_theoreme_theoreme", "cote", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche un côté de l’angle droit : on soustrait les carrés.",
    tags: ["pythagore_theoreme_theoreme", "cote", "probleme", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      return {
        text: `Une échelle de ${c} m est posée contre un mur. Son pied est à ${a} m du mur. À quelle hauteur le haut de l’échelle touche-t-il le mur ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation:
          "Définition : la hauteur est un côté de l’angle droit : hauteur² = échelle² - distance².\n\n" +
          "Méthode : on soustrait les carrés.\n\n" +
          `Calcul : ${c}² - ${a}² = ${c * c} - ${a * a} = ${b * b}, donc hauteur = √${b * b} = ${b} m.\n\n` +
          `Conclusion : le haut atteint ${b} m.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien vaut le carré du côté cherché ?",
    tags: ["pythagore_theoreme_theoreme", "cote", "template"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      const knownLeg = randomChoice([triple.a, triple.b]);
      const missingLeg = knownLeg === triple.a ? triple.b : triple.a;
      return {
        text: `Dans un triangle rectangle d’hypoténuse ${triple.c} cm et de côté ${knownLeg} cm, combien vaut le carré de l’autre côté ?`,
        format: "short",
        expected: [String(missingLeg * missingLeg)],
        comparator: "number_equal",
        explanation:
          "Définition : le carré du côté manquant vaut c² - a².\n\n" +
          "Méthode : on soustrait les carrés.\n\n" +
          `Calcul : ${triple.c}² - ${knownLeg}² = ${triple.c * triple.c} - ${knownLeg * knownLeg} = ${missingLeg * missingLeg}.\n\n` +
          `Conclusion : le carré du côté vaut ${missingLeg * missingLeg} (et le côté ${missingLeg} cm).`,
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi, pour trouver un côté de l’angle droit, on soustrait au lieu d’additionner.",
    format: "open",
    expected: ["soustrait", "hypoténuse", "carré"],
    comparator: "contains_keyword",
    hint: "Compare la formule à celle de l’hypoténuse.",
    explanation:
      "Définition : c² = a² + b², donc b² = c² - a².\n\n" +
      "Méthode : on isole le côté cherché.\n\n" +
      "Calcul : on retire le carré du côté connu au carré de l’hypoténuse.\n\n" +
      "Conclusion : on soustrait car le côté cherché n’est pas l’hypoténuse.",
    tags: ["pythagore_theoreme_theoreme", "cote", "open"],
  },

  // ---------- RÉCIPROQUE : VÉRIFIER ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_verifier_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "L’égalité 8² + 15² = 17² est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "64 + 225 = ?",
    explanation:
      "Définition : on compare la somme des carrés au carré du plus grand côté.\n\n" +
      "Méthode : on calcule chaque membre.\n\n" +
      "Calcul : 8² + 15² = 64 + 225 = 289 et 17² = 289.\n\n" +
      "Conclusion : oui, l’égalité est vraie.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_verifier_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "L’égalité 6² + 7² = 9² est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "36 + 49 = 85, et 9² = 81.",
    explanation:
      "Définition : on compare la somme des carrés au carré du plus grand côté.\n\n" +
      "Méthode : on calcule chaque membre.\n\n" +
      "Calcul : 6² + 7² = 85 alors que 9² = 81.\n\n" +
      "Conclusion : non, l’égalité est fausse.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_verifier_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les carrés des deux plus petits côtés.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier", "template"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      const left = triple.a * triple.a + triple.b * triple.b;
      return {
        text: `Pour les longueurs ${triple.a}, ${triple.b} et ${triple.c}, combien vaut ${triple.a}² + ${triple.b}² ?`,
        format: "short",
        expected: [String(left)],
        comparator: "number_equal",
        explanation:
          "Définition : on calcule la somme des carrés des deux plus petits côtés.\n\n" +
          "Méthode : on additionne les carrés.\n\n" +
          `Calcul : ${triple.a}² + ${triple.b}² = ${triple.a * triple.a} + ${triple.b * triple.b} = ${left}.\n\n` +
          `Conclusion : ${triple.a}² + ${triple.b}² = ${left} (et ${triple.c}² = ${triple.c * triple.c}).`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_verifier_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "L’hypoténuse potentielle est le plus grand côté.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier", "template"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      return {
        text: `Pour les longueurs ${triple.a}, ${triple.b} et ${triple.c}, quel est le plus grand côté (à mettre au carré seul) ?`,
        format: "short",
        expected: [String(triple.c)],
        comparator: "number_equal",
        explanation:
          "Définition : on isole le carré du plus grand côté.\n\n" +
          "Méthode : on repère la plus grande longueur.\n\n" +
          `Calcul : la plus grande est ${triple.c}.\n\n` +
          `Conclusion : on compare ${triple.a}² + ${triple.b}² à ${triple.c}².`,
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_verifier_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "Explique quels carrés on compare pour vérifier l’égalité de Pythagore.",
    format: "open",
    expected: ["plus grand", "carrés", "somme"],
    comparator: "contains_keyword",
    hint: "Deux petits côtés contre le plus grand.",
    explanation:
      "Définition : on compare la somme des carrés des deux plus petits côtés au carré du plus grand.\n\n" +
      "Méthode : on identifie le plus grand côté (hypoténuse potentielle).\n\n" +
      "Calcul : on calcule a² + b² et c².\n\n" +
      "Conclusion : on compare la somme des deux carrés au carré du plus grand côté.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier", "open"],
  },

  // ---------- RÉCIPROQUE : CONCLURE ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_conclure_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle a pour côtés 8 cm, 15 cm et 17 cm. Est-il rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare 8² + 15² avec 17².",
    explanation:
      "Définition : la réciproque conclut au triangle rectangle si l’égalité est vraie.\n\n" +
      "Méthode : on compare 8² + 15² et 17².\n\n" +
      "Calcul : 64 + 225 = 289 = 17².\n\n" +
      "Conclusion : oui, le triangle est rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_conclure_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle a pour côtés 4 cm, 5 cm et 6 cm. Est-il rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare 4² + 5² avec 6².",
    explanation:
      "Définition : si l’égalité de Pythagore est fausse, le triangle n’est pas rectangle.\n\n" +
      "Méthode : on compare 4² + 5² et 6².\n\n" +
      "Calcul : 16 + 25 = 41 ≠ 36.\n\n" +
      "Conclusion : non, le triangle n’est pas rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_conclure_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la somme des carrés des deux petits côtés au carré du plus grand.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure", "template"],
    generate: () => {
      const isRight = randomChoice([true, false]);
      const triple = isRight ? randomChoice(pythagoreanTriples) : randomChoice(falseTriples);
      const left = triple.a * triple.a + triple.b * triple.b;
      const right = triple.c * triple.c;
      return {
        text: `Un triangle a pour côtés ${triple.a} cm, ${triple.b} cm et ${triple.c} cm. Est-il rectangle ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [left === right ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : on applique la réciproque de Pythagore.\n\n" +
          "Méthode : on compare la somme des carrés au carré du plus grand côté.\n\n" +
          `Calcul : ${triple.a}² + ${triple.b}² = ${left} et ${triple.c}² = ${right}.\n\n` +
          `Conclusion : ${left === right ? "oui, le triangle est rectangle" : "non, le triangle n’est pas rectangle"}.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_conclure_tpl_3b",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "L’angle droit est opposé au plus grand côté.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "sommet", "template"],
    generate: () => {
      const triple = randomChoice(pythagoreanTriples);
      const labels = randomChoice(triangleNames);
      return {
        text: `Le triangle ${labels.A}${labels.B}${labels.C} a pour côtés ${sideName(labels, "AB")} = ${triple.a}, ${sideName(labels, "CA")} = ${triple.b}, ${sideName(labels, "BC")} = ${triple.c}. Il est rectangle en quel sommet ?`,
        format: "qcm",
        choices: shuffle([labels.A, labels.B, labels.C]),
        expected: [labels.A],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’angle droit est opposé à l’hypoténuse (le plus grand côté).\n\n" +
          `Méthode : le plus grand côté est ${sideName(labels, "BC")} = ${triple.c}.\n\n` +
          `Calcul : le sommet opposé à ${sideName(labels, "BC")} est ${labels.A}.\n\n` +
          `Conclusion : le triangle est rectangle en ${labels.A}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_conclure_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment conclure qu’un triangle n’est PAS rectangle avec la réciproque.",
    format: "open",
    expected: ["égalité", "fausse", "rectangle"],
    comparator: "contains_keyword",
    hint: "Que se passe-t-il si l’égalité de Pythagore est fausse ?",
    explanation:
      "Définition : la réciproque conclut selon l’égalité de Pythagore.\n\n" +
      "Méthode : on compare a² + b² et c².\n\n" +
      "Calcul : si les deux ne sont pas égaux, l’égalité est fausse.\n\n" +
      "Conclusion : si l’égalité est fausse, le triangle n’est pas rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure", "open"],
  },

  // ---------- RÉDIGER ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Après avoir vérifié que 9² + 12² = 15², quelle conclusion écrit-on ?",
    format: "qcm",
    choices: [
      "donc, d’après la réciproque de Pythagore, le triangle est rectangle",
      "donc, d’après le théorème de Pythagore, le triangle est rectangle",
      "donc, d’après la réciproque de Pythagore, le triangle est isocèle",
      "donc, d’après la réciproque de Thalès, le triangle est rectangle",
    ],
    expected: ["donc, d’après la réciproque de Pythagore, le triangle est rectangle"],
    comparator: "mcq_exact",
    hint: "L’égalité vérifiée mène à la réciproque.",
    explanation:
      "Définition : si l’égalité de Pythagore est vraie, la réciproque conclut au triangle rectangle.\n\n" +
      "Méthode : on cite la réciproque.\n\n" +
      "Calcul : l’égalité 9² + 12² = 15² est vraie.\n\n" +
      "Conclusion : d’après la réciproque de Pythagore, le triangle est rectangle.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer une longueur avec Pythagore, quelle est la bonne suite d’étapes ?",
    format: "qcm",
    choices: [
      "annoncer le triangle rectangle, écrire l’égalité de Pythagore, calculer",
      "écrire l’égalité de Pythagore, calculer, vérifier que l’angle est droit",
      "annoncer le triangle rectangle, mesurer les côtés, comparer les carrés",
      "calculer la longueur cherchée, annoncer le triangle rectangle, conclure",
    ],
    expected: ["annoncer le triangle rectangle, écrire l’égalité de Pythagore, calculer"],
    comparator: "mcq_exact",
    hint: "On part de l’hypothèse, puis on calcule.",
    explanation:
      "Définition : la rédaction suit un ordre logique.\n\n" +
      "Méthode : 1) triangle rectangle ; 2) égalité de Pythagore ; 3) calcul.\n\n" +
      "Calcul : on isole la longueur cherchée à la fin.\n\n" +
      "Conclusion : triangle rectangle → égalité → calcul.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_rediger_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "On cherche un côté de l’angle droit : on soustrait.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      return {
        text: `Pour calculer un côté de l’angle droit quand l’hypoténuse vaut ${c} et un côté vaut ${a}, quelle égalité écrit-on ?`,
        format: "qcm",
        choices: shuffle([
          `${c}² - ${a}²`,
          `${c}² + ${a}²`,
          `${a}² + ${b}²`,
          `${c} - ${a}`,
        ]),
        expected: [`${c}² - ${a}²`],
        comparator: "mcq_exact",
        explanation:
          "Définition : un côté de l’angle droit vaut c² - a².\n\n" +
          "Méthode : on soustrait le carré du côté connu au carré de l’hypoténuse.\n\n" +
          `Calcul : ${c}² - ${a}² = ${c * c - a * a}.\n\n` +
          `Conclusion : on écrit ${c}² - ${a}².`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_rediger_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Annonce le triangle rectangle puis l’égalité de Pythagore.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "open", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      return {
        text: `Rédige le début du raisonnement pour calculer l’hypoténuse d’un triangle rectangle de côtés ${a} cm et ${b} cm.`,
        format: "open",
        expected: ["rectangle", "Pythagore", "carré"],
        comparator: "contains_keyword",
        explanation:
          "Définition : on annonce le triangle rectangle puis on applique Pythagore.\n\n" +
          "Méthode : « Le triangle est rectangle, donc d’après le théorème de Pythagore, c² = a² + b². »\n\n" +
          `Calcul : c² = ${a}² + ${b}² = ${a * a + b * b}, donc c = ${c} cm.\n\n` +
          "Conclusion : on commence par l’hypothèse rectangle, puis l’égalité de Pythagore.",
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi doit-on préciser « rectangle en A » dans une rédaction avec le théorème direct de Pythagore ?",
    format: "open",
    expected: ["rectangle", "hypothèse", "appliquer"],
    comparator: "contains_keyword",
    hint: "C’est l’hypothèse qui autorise le théorème.",
    explanation:
      "Définition : le théorème direct s’applique seulement si le triangle est rectangle.\n\n" +
      "Méthode : on justifie l’application en précisant le sommet de l’angle droit.\n\n" +
      "Calcul : « rectangle en A » indique que [BC] est l’hypoténuse.\n\n" +
      "Conclusion : on le précise car c’est l’hypothèse nécessaire pour appliquer Pythagore.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "open"],
  },

  // ---------- DÉFIS ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Parmi ces triplets, lequel correspond à un triangle rectangle ?",
    format: "qcm",
    choices: ["(5, 12, 13)", "(4, 5, 6)", "(6, 7, 9)", "(8, 9, 12)"],
    expected: ["(5, 12, 13)"],
    comparator: "mcq_exact",
    hint: "Teste a² + b² = c² pour chaque triplet.",
    explanation:
      "Définition : un triplet pythagoricien vérifie a² + b² = c².\n\n" +
      "Méthode : on teste l’égalité.\n\n" +
      "Calcul : 5² + 12² = 25 + 144 = 169 = 13².\n\n" +
      "Conclusion : (5, 12, 13) est un triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un rectangle a pour dimensions 3 cm et 4 cm. Quelle est la longueur de sa diagonale ?",
    format: "qcm",
    choices: ["5 cm", "7 cm", "6 cm", "12 cm"],
    expected: ["5 cm"],
    comparator: "mcq_exact",
    hint: "La diagonale est l’hypoténuse d’un triangle rectangle de côtés 3 et 4.",
    explanation:
      "Définition : la diagonale d’un rectangle est l’hypoténuse d’un triangle rectangle.\n\n" +
      "Méthode : diagonale² = 3² + 4².\n\n" +
      "Calcul : 9 + 16 = 25, donc diagonale = √25 = 5 cm.\n\n" +
      "Conclusion : la diagonale mesure 5 cm.",
    tags: ["pythagore_theoreme_theoreme", "defi", "diagonale", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La diagonale est l’hypoténuse d’un triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "defi", "diagonale", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      return {
        text: `Un rectangle a pour dimensions ${a} cm et ${b} cm. Quelle est la longueur de sa diagonale ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          "Définition : la diagonale est l’hypoténuse d’un triangle rectangle.\n\n" +
          "Méthode : diagonale² = longueur² + largeur².\n\n" +
          `Calcul : ${a}² + ${b}² = ${a * a + b * b}, donc diagonale = √${a * a + b * b} = ${c} cm.\n\n` +
          `Conclusion : la diagonale mesure ${c} cm.`,
      };
    },
  },
  {
    kind: "template",
    id: "pythagore_theoreme_defi_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Modélise le déplacement par un triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "defi", "probleme", "template"],
    generate: () => {
      const { a, b, c } = randomChoice(pythagoreanTriples);
      return {
        text: `Un bateau navigue ${a} km vers l’est, puis ${b} km vers le nord. À quelle distance en ligne droite se trouve-t-il de son point de départ ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          "Définition : le trajet forme un triangle rectangle ; la distance directe est l’hypoténuse.\n\n" +
          "Méthode : distance² = est² + nord².\n\n" +
          `Calcul : ${a}² + ${b}² = ${a * a + b * b}, donc distance = √${a * a + b * b} = ${c} km.\n\n` +
          `Conclusion : le bateau est à ${c} km du départ.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment Pythagore permet de calculer une distance qu’on ne peut pas mesurer directement.",
    format: "open",
    expected: ["triangle rectangle", "hypoténuse", "carrés"],
    comparator: "contains_keyword",
    hint: "On forme un triangle rectangle avec des distances connues.",
    explanation:
      "Définition : Pythagore relie les côtés d’un triangle rectangle.\n\n" +
      "Méthode : on modélise la distance cherchée par l’hypoténuse d’un triangle rectangle dont les côtés sont connus.\n\n" +
      "Calcul : distance² = a² + b², puis on prend la racine.\n\n" +
      "Conclusion : on calcule l’hypoténuse à partir des carrés des deux côtés connus.",
    tags: ["pythagore_theoreme_theoreme", "defi", "open"],
  },
];