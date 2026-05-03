import type { TutorBankItemV4, TriangleCanvasData } from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function triangleCanvas(params: {
  type?: "quelconque" | "isocele" | "equilateral" | "rectangle";
  angleLabels?: Partial<Record<"A" | "B" | "C", string>>;
  sideLabels?: Partial<Record<"AB" | "BC" | "CA", string>>;
}): TriangleCanvasData {
  const type = params.type ?? "quelconque";

  if (type === "rectangle") {
    return {
      kind: "triangle",
      points: {
        A: { x: 45, y: 190 },
        B: { x: 210, y: 190 },
        C: { x: 45, y: 55 },
      },
      angleLabels: params.angleLabels,
      sideLabels: params.sideLabels,
      marks: { rightAngleAt: "A" },
    };
  }

  if (type === "isocele") {
    return {
      kind: "triangle",
      points: {
        A: { x: 45, y: 190 },
        B: { x: 215, y: 190 },
        C: { x: 130, y: 50 },
      },
      angleLabels: params.angleLabels,
      sideLabels: params.sideLabels,
      marks: { equalSides: [["CA", "BC"]] },
    };
  }

  if (type === "equilateral") {
    return {
      kind: "triangle",
      points: {
        A: { x: 45, y: 190 },
        B: { x: 215, y: 190 },
        C: { x: 130, y: 45 },
      },
      angleLabels: params.angleLabels,
      sideLabels: params.sideLabels,
      marks: {
        equalSides: [
          ["AB", "BC"],
          ["BC", "CA"],
        ],
      },
    };
  }

  return {
    kind: "triangle",
    points: {
      A: { x: 45, y: 185 },
      B: { x: 220, y: 175 },
      C: { x: 105, y: 45 },
    },
    angleLabels: params.angleLabels,
    sideLabels: params.sideLabels,
  };
}

export const trianglesBank: TutorBankItemV4[] = [
  // =========================
  // TRIANGLE_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de côtés possède un triangle ?",
    format: "qcm",
    choices: ["2", "3", "4", "5"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Le mot triangle commence par tri-, qui indique trois.",
    explanation: "Un triangle possède 3 côtés, 3 sommets et 3 angles.",
    tags: ["triangles", "reconnaitre", "qcm"],
    canvas: triangleCanvas({}),
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans le triangle ABC, quels sont les sommets ?",
    format: "qcm",
    choices: ["A, B et C", "AB, BC et CA", "A seulement", "ABC seulement"],
    expected: ["A, B et C"],
    comparator: "mcq_exact",
    hint: "Les sommets sont les points du triangle.",
    explanation: "Les sommets du triangle ABC sont les points A, B et C.",
    tags: ["triangles", "sommets", "qcm"],
    canvas: triangleCanvas({}),
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce qu’est un triangle.",
    format: "open",
    expected: ["3", "côtés", "sommets"],
    comparator: "contains_keyword",
    hint: "Pense au nombre de côtés et de sommets.",
    explanation: "Un triangle est une figure qui possède 3 côtés, 3 sommets et 3 angles.",
    tags: ["triangles", "reconnaitre", "open"],
  },

  // =========================
  // TRIANGLE_NATURE
  // =========================
  {
    kind: "fixed",
    id: "triangle_nature_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature du triangle représenté ?",
    format: "qcm",
    choices: ["triangle quelconque", "triangle isocèle", "triangle rectangle", "triangle équilatéral"],
    expected: ["triangle rectangle"],
    comparator: "mcq_exact",
    hint: "Cherche le codage de l’angle droit.",
    explanation: "Le petit carré rouge indique un angle droit. Le triangle est donc rectangle.",
    tags: ["triangles", "nature", "rectangle", "qcm"],
    canvas: triangleCanvas({ type: "rectangle" }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature du triangle représenté ?",
    format: "qcm",
    choices: ["triangle isocèle", "triangle rectangle", "triangle quelconque", "quadrilatère"],
    expected: ["triangle isocèle"],
    comparator: "mcq_exact",
    hint: "Deux côtés portent le même codage.",
    explanation: "Deux côtés sont codés égaux. Le triangle est donc isocèle.",
    tags: ["triangles", "nature", "isocele", "qcm"],
    canvas: triangleCanvas({ type: "isocele" }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle qui possède trois côtés de même longueur est...",
    format: "qcm",
    choices: ["équilatéral", "rectangle", "quelconque", "obtusangle"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
    hint: "Équi- signifie égal.",
    explanation: "Un triangle avec trois côtés égaux est un triangle équilatéral.",
    tags: ["triangles", "nature", "equilateral", "qcm"],
    canvas: triangleCanvas({ type: "equilateral" }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment reconnaître un triangle rectangle sur une figure.",
    format: "open",
    expected: ["angle droit", "90", "carré"],
    comparator: "contains_keyword",
    hint: "Cherche le codage de l’angle droit.",
    explanation: "On reconnaît un triangle rectangle lorsqu’un de ses angles est droit, c’est-à-dire égal à 90°.",
    tags: ["triangles", "nature", "rectangle", "open"],
    canvas: triangleCanvas({ type: "rectangle" }),
  },
  {
    kind: "template",
    id: "triangle_nature_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe les codages de la figure.",
    tags: ["triangles", "nature", "template", "canvas"],
    generate: () => {
      const type = randomChoice(["rectangle", "isocele", "equilateral"] as const);
      const expected =
        type === "rectangle"
          ? "triangle rectangle"
          : type === "isocele"
          ? "triangle isocèle"
          : "triangle équilatéral";

      return {
        text: "Quelle est la nature du triangle représenté ?",
        format: "qcm",
        choices: makeChoices(expected, [
          "triangle quelconque",
          "triangle rectangle",
          "triangle isocèle",
          "triangle équilatéral",
        ].filter((x) => x !== expected)),
        expected: [expected],
        comparator: "mcq_exact",
        explanation:
          type === "rectangle"
            ? "Le triangle possède un angle droit : c’est un triangle rectangle."
            : type === "isocele"
            ? "Deux côtés sont codés égaux : c’est un triangle isocèle."
            : "Les côtés sont codés égaux : c’est un triangle équilatéral.",
        canvas: triangleCanvas({ type }),
      };
    },
  },

  // =========================
  // TRIANGLE_CONSTRUIRE
  // =========================
  {
    kind: "fixed",
    id: "triangle_construire_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire un triangle ABC connaissant AB = 6 cm, AC = 4 cm et BC = 5 cm, quel instrument est indispensable pour reporter les longueurs ?",
    format: "qcm",
    choices: ["un compas", "un rapporteur", "une calculatrice", "une équerre seulement"],
    expected: ["un compas"],
    comparator: "mcq_exact",
    hint: "On reporte des distances avec un compas.",
    explanation: "Pour construire un triangle à partir de trois longueurs, on utilise notamment le compas pour reporter les distances.",
    tags: ["triangles", "construire", "instrument", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on construire un triangle dont les côtés mesurent 2 cm, 3 cm et 8 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Dans un triangle, le plus grand côté doit être plus petit que la somme des deux autres.",
    explanation: "2 + 3 = 5, et 5 est plus petit que 8. On ne peut donc pas construire ce triangle.",
    tags: ["triangles", "construire", "inegalite_triangulaire", "piege"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on construire un triangle dont les côtés mesurent 4 cm, 5 cm et 7 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare le plus grand côté avec la somme des deux autres.",
    explanation: "Le plus grand côté est 7 cm. Or 4 + 5 = 9, et 9 > 7. Le triangle est constructible.",
    tags: ["triangles", "construire", "inegalite_triangulaire"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi on ne peut pas construire un triangle de côtés 2 cm, 3 cm et 8 cm.",
    format: "open",
    expected: ["2", "3", "8", "somme", "plus petit"],
    comparator: "contains_keyword",
    hint: "Regarde la somme des deux plus petits côtés.",
    explanation: "On ne peut pas le construire car 2 + 3 = 5, et 5 est inférieur à 8. Les deux petits côtés ne peuvent pas rejoindre le grand côté.",
    tags: ["triangles", "construire", "open", "raisonnement"],
  },
  {
    kind: "template",
    id: "triangle_construire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Le plus grand côté doit être plus petit que la somme des deux autres.",
    tags: ["triangles", "construire", "template", "inegalite_triangulaire"],
    generate: () => {
      const cases = [
        { a: 3, b: 4, c: 5, ok: "oui" },
        { a: 2, b: 5, c: 8, ok: "non" },
        { a: 6, b: 7, c: 10, ok: "oui" },
        { a: 4, b: 4, c: 9, ok: "non" },
      ];
      const item = randomChoice(cases);

      return {
        text: `Peut-on construire un triangle dont les côtés mesurent ${item.a} cm, ${item.b} cm et ${item.c} cm ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.ok],
        comparator: "mcq_exact",
        explanation:
          item.ok === "oui"
            ? `Oui, car le plus grand côté est plus petit que la somme des deux autres.`
            : `Non, car la somme des deux plus petits côtés n’est pas assez grande pour rejoindre le plus grand côté.`,
      };
    },
  },

  // =========================
  // TRIANGLE_SOMME_ANGLES
  // =========================
  {
    kind: "fixed",
    id: "triangle_somme_angles_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_somme_angles",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle, la somme des trois angles vaut...",
    format: "qcm",
    choices: ["90°", "120°", "180°", "360°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "C’est une propriété fondamentale des triangles.",
    explanation: "Dans tout triangle, la somme des mesures des trois angles est égale à 180°.",
    tags: ["triangles", "somme_angles", "qcm"],
    canvas: triangleCanvas({
      angleLabels: { A: "60°", B: "70°", C: "50°" },
    }),
  },
  {
    kind: "fixed",
    id: "triangle_somme_angles_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_somme_angles",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle, deux angles mesurent 50° et 60°. Combien mesure le troisième angle ?",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "Calcule 180 - 50 - 60.",
    explanation: "La somme des angles vaut 180°. Donc le troisième angle vaut 180 - 50 - 60 = 70°.",
    tags: ["triangles", "somme_angles", "calcul"],
    canvas: triangleCanvas({
      angleLabels: { A: "50°", B: "60°", C: "?" },
    }),
  },
  {
    kind: "fixed",
    id: "triangle_somme_angles_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_somme_angles",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle possède deux angles de 45° et 45°. Le troisième angle mesure...",
    format: "qcm",
    choices: ["45°", "60°", "90°", "180°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "45 + 45 = 90, puis complète jusqu’à 180.",
    explanation: "45° + 45° = 90°. Il reste donc 180° - 90° = 90°.",
    tags: ["triangles", "somme_angles", "rectangle", "qcm"],
    canvas: triangleCanvas({
      type: "rectangle",
      angleLabels: { A: "90°", B: "45°", C: "45°" },
    }),
  },
  {
    kind: "fixed",
    id: "triangle_somme_angles_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_somme_angles",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment trouver l’angle manquant dans un triangle quand on connaît les deux autres.",
    format: "open",
    expected: ["180", "soustraire", "angles"],
    comparator: "contains_keyword",
    hint: "La somme des trois angles d’un triangle vaut 180°.",
    explanation: "On additionne les deux angles connus, puis on soustrait cette somme à 180°.",
    tags: ["triangles", "somme_angles", "open", "methode"],
  },
  {
    kind: "template",
    id: "triangle_somme_angles_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_somme_angles",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise la somme des angles : 180°.",
    tags: ["triangles", "somme_angles", "template", "calcul"],
    generate: () => {
      const pairs = [
        [40, 60],
        [35, 75],
        [50, 80],
        [45, 55],
        [30, 90],
      ];
      const [a, b] = randomChoice(pairs);
      const c = 180 - a - b;

      return {
        text: `Dans un triangle, deux angles mesurent ${a}° et ${b}°. Combien mesure le troisième angle ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation: `La somme des angles vaut 180°. Le troisième angle mesure donc 180 - ${a} - ${b} = ${c}°.`,
        canvas: triangleCanvas({
          angleLabels: { A: `${a}°`, B: `${b}°`, C: "?" },
        }),
      };
    },
  },

  // =========================
  // TRIANGLE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "triangle_defis_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme : « Ce triangle est rectangle car il a un côté horizontal. » Explique son erreur.",
    format: "open",
    expected: ["angle droit", "90", "horizontal"],
    comparator: "contains_keyword",
    hint: "Un triangle rectangle dépend d’un angle, pas de l’orientation d’un côté.",
    explanation: "Un triangle est rectangle s’il possède un angle droit. Avoir un côté horizontal ne suffit pas.",
    tags: ["triangles", "defi", "open", "piege", "rectangle"],
    canvas: triangleCanvas({ type: "quelconque" }),
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Un triangle peut-il avoir deux angles droits ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Deux angles droits feraient déjà 180°.",
    explanation: "Non. Deux angles droits feraient 90° + 90° = 180°, il ne resterait plus de place pour le troisième angle.",
    tags: ["triangles", "defi", "somme_angles", "piege"],
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    theme: "reunion",
    text: "Sur un plan de randonnée à La Réunion, trois chemins forment un triangle. Deux angles mesurent 35° et 85°. Quelle est la mesure du troisième angle ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Utilise 180 - 35 - 85.",
    explanation: "La somme des angles d’un triangle vaut 180°. Le troisième angle mesure 180 - 35 - 85 = 60°.",
    tags: ["triangles", "defi", "reunion", "somme_angles"],
    canvas: triangleCanvas({
      angleLabels: { A: "35°", B: "85°", C: "?" },
    }),
  },
  {
    kind: "template",
    id: "triangle_defis_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie si la somme des trois angles vaut 180°.",
    tags: ["triangles", "defi", "template", "somme_angles", "piege"],
    generate: () => {
      const cases = [
        { a: 50, b: 60, c: 70, ok: "oui" },
        { a: 90, b: 45, c: 45, ok: "oui" },
        { a: 100, b: 50, c: 40, ok: "non" },
        { a: 80, b: 80, c: 30, ok: "non" },
      ];
      const item = randomChoice(cases);

      return {
        text: `Peut-on avoir un triangle avec des angles de ${item.a}°, ${item.b}° et ${item.c}° ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.ok],
        comparator: "mcq_exact",
        explanation:
          item.ok === "oui"
            ? `${item.a} + ${item.b} + ${item.c} = 180. C’est possible.`
            : `${item.a} + ${item.b} + ${item.c} ne vaut pas 180. Ce n’est pas possible pour un triangle.`,
        canvas: triangleCanvas({
          angleLabels: { A: `${item.a}°`, B: `${item.b}°`, C: `${item.c}°` },
        }),
      };
    },
  },
];