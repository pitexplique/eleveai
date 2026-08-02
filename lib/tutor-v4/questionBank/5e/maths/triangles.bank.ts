import type { TutorBankItemV4, TriangleCanvasData } from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
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

function expl(calcul: string) {
  return (
    "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
    "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle."
  );
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
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de côtés possède un triangle ?",
    format: "qcm",
    choices: ["2", "3", "4", "5"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Le mot triangle commence par tri-, qui indique trois.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Un triangle possède 3 côtés, 3 sommets et 3 angles.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "reconnaitre", "qcm"],
    canvas: triangleCanvas({}),
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans le triangle ABC, quels sont les sommets ?",
    format: "qcm",
    choices: ["A, B et C", "AB, BC et CA", "A seulement", "ABC seulement"],
    expected: ["A, B et C"],
    comparator: "mcq_exact",
    hint: "Les sommets sont les points du triangle.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Les sommets du triangle ABC sont les points A, B et C.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "sommets", "qcm"],
    canvas: triangleCanvas({}),
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce qu’est un triangle.",
    format: "open",
    expected: ["3", "côtés", "sommets"],
    comparator: "contains_keyword",
    hint: "Pense au nombre de côtés et de sommets.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Un triangle est une figure qui possède 3 côtés, 3 sommets et 3 angles.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "reconnaitre", "open"],
  },

  // =========================
  // TRIANGLE_NATURE
  // =========================
  {
    kind: "fixed",
    id: "triangle_nature_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature du triangle représenté ?",
    format: "qcm",
    choices: ["triangle quelconque", "triangle isocèle", "triangle rectangle", "triangle équilatéral"],
    expected: ["triangle rectangle"],
    comparator: "mcq_exact",
    hint: "Cherche le codage de l’angle droit.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Le petit carré rouge indique un angle droit. Le triangle est donc rectangle.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "nature", "rectangle", "qcm"],
    canvas: triangleCanvas({ type: "rectangle" }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature du triangle représenté ?",
    format: "qcm",
    choices: ["triangle isocèle", "triangle rectangle", "triangle quelconque", "quadrilatère"],
    expected: ["triangle isocèle"],
    comparator: "mcq_exact",
    hint: "Deux côtés portent le même codage.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Deux côtés sont codés égaux. Le triangle est donc isocèle.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "nature", "isocele", "qcm"],
    canvas: triangleCanvas({ type: "isocele" }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle qui possède trois côtés de même longueur est...",
    format: "qcm",
    choices: ["équilatéral", "rectangle", "quelconque", "obtusangle"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
    hint: "Équi- signifie égal.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Un triangle avec trois côtés égaux est un triangle équilatéral.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "nature", "equilateral", "qcm"],
    canvas: triangleCanvas({ type: "equilateral" }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment reconnaître un triangle rectangle sur une figure.",
    format: "open",
    expected: ["angle droit", "90", "carré"],
    comparator: "contains_keyword",
    hint: "Cherche le codage de l’angle droit.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("On reconnaît un triangle rectangle lorsqu’un de ses angles est droit, c’est-à-dire égal à 90°.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "nature", "rectangle", "open"],
    canvas: triangleCanvas({ type: "rectangle" }),
  },
  {
    kind: "template",
    id: "triangle_nature_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe les codages de la figure.",
    tags: ["triangle_figure", "nature", "template", "canvas"],
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
          "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          (type === "rectangle"
            ? "Le triangle possède un angle droit : c’est un triangle rectangle."
            : type === "isocele"
            ? "Deux côtés sont codés égaux : c’est un triangle isocèle."
            : "Les côtés sont codés égaux : c’est un triangle équilatéral.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
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
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire un triangle ABC connaissant AB = 6 cm, AC = 4 cm et BC = 5 cm, quel instrument est indispensable pour reporter les longueurs ?",
    format: "qcm",
    choices: ["un compas", "un rapporteur", "une calculatrice", "une équerre seulement"],
    expected: ["un compas"],
    comparator: "mcq_exact",
    hint: "On reporte des distances avec un compas.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Pour construire un triangle à partir de trois longueurs, on utilise notamment le compas pour reporter les distances.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "construire", "instrument", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on construire un triangle dont les côtés mesurent 2 cm, 3 cm et 8 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Dans un triangle, le plus grand côté doit être plus petit que la somme des deux autres.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("2 + 3 = 5, et 5 est plus petit que 8. On ne peut donc pas construire ce triangle.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "construire", "inegalite_triangulaire", "piege"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on construire un triangle dont les côtés mesurent 4 cm, 5 cm et 7 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare le plus grand côté avec la somme des deux autres.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Le plus grand côté est 7 cm. Or 4 + 5 = 9, et 9 > 7. Le triangle est constructible.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "construire", "inegalite_triangulaire"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi on ne peut pas construire un triangle de côtés 2 cm, 3 cm et 8 cm.",
    format: "open",
    expected: ["2", "3", "8", "somme", "plus petit"],
    comparator: "contains_keyword",
    hint: "Regarde la somme des deux plus petits côtés.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("On ne peut pas le construire car 2 + 3 = 5, et 5 est inférieur à 8. Les deux petits côtés ne peuvent pas rejoindre le grand côté.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "construire", "open", "raisonnement"],
  },
  {
    kind: "template",
    id: "triangle_construire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Le plus grand côté doit être plus petit que la somme des deux autres.",
    tags: ["triangle_figure", "construire", "template", "inegalite_triangulaire"],
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
          "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          (item.ok === "oui"
            ? `Oui, car le plus grand côté est plus petit que la somme des deux autres.`
            : `Non, car la somme des deux plus petits côtés n’est pas assez grande pour rejoindre le plus grand côté.`) +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
      };
    },
  },

  // =========================
  // TRIANGLE_SOMME_ANGLES
  // =========================
  {
    kind: "fixed",
    id: "triangle_somme_angle_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle, la somme des trois angles vaut...",
    format: "qcm",
    choices: ["90°", "120°", "180°", "360°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "C’est une propriété fondamentale des triangles.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Dans tout triangle, la somme des mesures des trois angles est égale à 180°.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "somme_angle", "qcm"],
    canvas: triangleCanvas({
      angleLabels: { A: "60°", B: "70°", C: "50°" },
    }),
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle, deux angles mesurent 50° et 60°. Combien mesure le troisième angle ?",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "Calcule 180 - 50 - 60.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("La somme des angles vaut 180°. Donc le troisième angle vaut 180 - 50 - 60 = 70°.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "somme_angle", "calcul"],
    canvas: triangleCanvas({
      angleLabels: { A: "50°", B: "60°", C: "?" },
    }),
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle possède deux angles de 45° et 45°. Le troisième angle mesure...",
    format: "qcm",
    choices: ["45°", "60°", "90°", "180°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "45 + 45 = 90, puis complète jusqu’à 180.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("45° + 45° = 90°. Il reste donc 180° - 90° = 90°.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "somme_angle", "rectangle", "qcm"],
    canvas: triangleCanvas({
      type: "rectangle",
      angleLabels: { A: "90°", B: "45°", C: "45°" },
    }),
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment trouver l’angle manquant dans un triangle quand on connaît les deux autres.",
    format: "open",
    expected: ["180", "soustraire", "angles"],
    comparator: "contains_keyword",
    hint: "La somme des trois angles d’un triangle vaut 180°.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("On additionne les deux angles connus, puis on soustrait cette somme à 180°.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "somme_angle", "open", "methode"],
  },
  {
    kind: "template",
    id: "triangle_somme_angle_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise la somme des angles : 180°.",
    tags: ["triangle_figure", "somme_angle", "template", "calcul"],
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
        explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          (`La somme des angles vaut 180°. Le troisième angle mesure donc 180 - ${a} - ${b} = ${c}°.`) +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
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
    id: "triangle_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme : « Ce triangle est rectangle car il a un côté horizontal. » Explique son erreur.",
    format: "open",
    expected: ["angle droit", "90", "horizontal"],
    comparator: "contains_keyword",
    hint: "Un triangle rectangle dépend d’un angle, pas de l’orientation d’un côté.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Un triangle est rectangle s’il possède un angle droit. Avoir un côté horizontal ne suffit pas.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "defi", "open", "piege", "rectangle"],
    canvas: triangleCanvas({ type: "quelconque" }),
  },
  {
    kind: "fixed",
    id: "triangle_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un triangle peut-il avoir deux angles droits ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Deux angles droits feraient déjà 180°.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Non. Deux angles droits feraient 90° + 90° = 180°, il ne resterait plus de place pour le troisième angle.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "defi", "somme_angle", "piege"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Sur un plan de randonnée à La Réunion, trois chemins forment un triangle. Deux angles mesurent 35° et 85°. Quelle est la mesure du troisième angle ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Utilise 180 - 35 - 85.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("La somme des angles d’un triangle vaut 180°. Le troisième angle mesure 180 - 35 - 85 = 60°.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "defi", "reunion", "somme_angle"],
    canvas: triangleCanvas({
      angleLabels: { A: "35°", B: "85°", C: "?" },
    }),
  },
  {
    kind: "template",
    id: "triangle_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie si la somme des trois angles vaut 180°.",
    tags: ["triangle_figure", "defi", "template", "somme_angle", "piege"],
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
          "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          (item.ok === "oui"
            ? `${item.a} + ${item.b} + ${item.c} = 180. C’est possible.`
            : `${item.a} + ${item.b} + ${item.c} ne vaut pas 180. Ce n’est pas possible pour un triangle.`) +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
        canvas: triangleCanvas({
          angleLabels: { A: `${item.a}°`, B: `${item.b}°`, C: `${item.c}°` },
        }),
      };
    },
  },

  // =========================
  // TOP-UP — TRIANGLE_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’angles possède un triangle ?",
    format: "qcm",
    choices: ["3", "2", "4", "1"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Autant que de sommets.",
    explanation: expl("Un triangle a 3 angles, autant que de sommets."),
    tags: ["triangle_figure", "reconnaitre", "qcm"],
    canvas: triangleCanvas({}),
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle ABC, comment note-t-on le côté opposé au sommet A ?",
    format: "qcm",
    choices: ["[BC]", "[AB]", "[AC]", "[AA]"],
    expected: ["[BC]"],
    comparator: "mcq_exact",
    hint: "Le côté opposé à A ne contient pas la lettre A.",
    explanation: expl("Le côté opposé au sommet A est celui qui ne contient pas A : c’est [BC]."),
    tags: ["triangle_figure", "reconnaitre", "qcm"],
    canvas: triangleCanvas({}),
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle figure n’est PAS un triangle ?",
    format: "qcm",
    choices: [
      "une figure à 4 côtés",
      "une figure à 3 côtés",
      "une figure à 3 sommets",
      "une figure à 3 angles",
    ],
    expected: ["une figure à 4 côtés"],
    comparator: "mcq_exact",
    hint: "Tri- veut dire trois.",
    explanation: expl("Une figure à 4 côtés est un quadrilatère, pas un triangle."),
    tags: ["triangle_figure", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de sommets relie-t-on pour tracer un triangle ?",
    format: "qcm",
    choices: ["3 points non alignés", "2 points", "4 points", "3 points alignés"],
    expected: ["3 points non alignés"],
    comparator: "mcq_exact",
    hint: "Trois points alignés ne forment pas de triangle.",
    explanation: expl("On relie 3 points non alignés : trois points alignés donneraient un segment, pas un triangle."),
    tags: ["triangle_figure", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Décris les trois éléments qui composent un triangle.",
    format: "open",
    expected: ["côtés", "sommets", "angles"],
    comparator: "contains_keyword",
    hint: "Pense aux côtés, aux sommets et aux angles.",
    explanation: expl("Un triangle est formé de 3 côtés, 3 sommets et 3 angles."),
    tags: ["triangle_figure", "reconnaitre", "open"],
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_7",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle ABC, [AB] est un :",
    format: "qcm",
    choices: ["côté", "sommet", "angle", "axe"],
    expected: ["côté"],
    comparator: "mcq_exact",
    hint: "Deux lettres entre crochets désignent un segment.",
    explanation: expl("[AB] désigne le segment reliant A et B : c’est un côté du triangle."),
    tags: ["triangle_figure", "reconnaitre", "qcm"],
    canvas: triangleCanvas({ sideLabels: { AB: "?" } }),
  },
  {
    kind: "template",
    id: "triangle_reconnaitre_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le côté opposé à un sommet ne contient pas sa lettre.",
    tags: ["triangle_figure", "reconnaitre", "template"],
    generate: () => {
      const sommets = ["A", "B", "C"] as const;
      const s = randomChoice([...sommets]);
      const oppose = sommets.filter((x) => x !== s).join("");
      const wrongs = [
        `[${s}${sommets.filter((x) => x !== s)[0]}]`,
        `[${s}${sommets.filter((x) => x !== s)[1]}]`,
        `[${s}${s}]`,
      ];
      return {
        text: `Dans le triangle ABC, quel est le côté opposé au sommet ${s} ?`,
        format: "qcm",
        choices: makeChoices(`[${oppose}]`, wrongs),
        expected: [`[${oppose}]`],
        comparator: "mcq_exact",
        explanation: expl(`Le côté opposé au sommet ${s} ne contient pas ${s} : c’est [${oppose}].`),
      };
    },
  },

  // =========================
  // TOP-UP — TRIANGLE_NATURE
  // =========================
  {
    kind: "fixed",
    id: "triangle_nature_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle qui a ses trois côtés de même longueur s’appelle :",
    format: "qcm",
    choices: ["équilatéral", "isocèle", "rectangle", "quelconque"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
    hint: "« équi » signifie égal.",
    explanation: expl("Un triangle équilatéral a ses trois côtés égaux (et ses trois angles de 60°)."),
    tags: ["triangle_figure", "nature", "qcm"],
    canvas: triangleCanvas({ type: "equilateral" }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle qui possède exactement deux côtés de même longueur s’appelle :",
    format: "qcm",
    choices: ["isocèle", "équilatéral", "rectangle", "quelconque"],
    expected: ["isocèle"],
    comparator: "mcq_exact",
    hint: "Deux côtés égaux.",
    explanation: expl("Un triangle isocèle a deux côtés de même longueur."),
    tags: ["triangle_figure", "nature", "qcm"],
    canvas: triangleCanvas({ type: "isocele" }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle a un angle de 90°. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "équilatéral", "isocèle", "quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Un angle droit.",
    explanation: expl("Un triangle avec un angle droit (90°) est un triangle rectangle."),
    tags: ["triangle_figure", "nature", "qcm"],
    canvas: triangleCanvas({ type: "rectangle", angleLabels: { A: "90°" } }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la différence entre un triangle isocèle et un triangle équilatéral.",
    format: "open",
    expected: ["deux", "trois", "côtés"],
    comparator: "contains_keyword",
    hint: "Compte les côtés égaux.",
    explanation: expl("Un triangle isocèle a deux côtés égaux ; un triangle équilatéral a ses trois côtés égaux."),
    tags: ["triangle_figure", "nature", "open"],
  },
  {
    kind: "template",
    id: "triangle_nature_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe les longueurs des côtés.",
    tags: ["triangle_figure", "nature", "template"],
    generate: () => {
      const cas = [
        { desc: "trois côtés de 5 cm", nat: "équilatéral" },
        { desc: "deux côtés de 6 cm et un de 4 cm", nat: "isocèle" },
        { desc: "des côtés de 3 cm, 4 cm et 5 cm", nat: "quelconque" },
      ];
      const item = randomChoice(cas);
      return {
        text: `Un triangle a ${item.desc}. Quelle est sa nature ?`,
        format: "qcm",
        choices: makeChoices(item.nat, ["équilatéral", "isocèle", "quelconque", "rectangle"].filter((n) => n !== item.nat).slice(0, 3)),
        expected: [item.nat],
        comparator: "mcq_exact",
        explanation: expl(`Avec ${item.desc}, le triangle est ${item.nat}.`),
      };
    },
  },

  // =========================
  // TOP-UP — TRIANGLE_CONSTRUIRE
  // =========================
  {
    kind: "fixed",
    id: "triangle_construire_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Quel instrument utilise-t-on pour reporter une longueur de côté lors de la construction d’un triangle ?",
    format: "qcm",
    choices: ["le compas", "le rapporteur", "l’équerre seule", "la calculatrice"],
    expected: ["le compas"],
    comparator: "mcq_exact",
    hint: "On reporte les longueurs avec un écartement.",
    explanation: expl("On reporte une longueur avec le compas (et la règle pour mesurer)."),
    tags: ["triangle_figure", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire un triangle dont on connaît un côté et les deux angles à ses extrémités, quel instrument trace les angles ?",
    format: "qcm",
    choices: ["le rapporteur", "le compas", "la gomme", "la calculatrice"],
    expected: ["le rapporteur"],
    comparator: "mcq_exact",
    hint: "Un instrument pour les angles.",
    explanation: expl("On trace les angles avec le rapporteur."),
    tags: ["triangle_figure", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 3,
    theme: "neutral",
    text: "On veut construire un triangle de côtés 5 cm, 6 cm et 8 cm. Par quoi commence-t-on ?",
    format: "qcm",
    choices: [
      "tracer un des côtés à la règle",
      "tracer les trois angles",
      "tracer un cercle complet",
      "écrire la réponse",
    ],
    expected: ["tracer un des côtés à la règle"],
    comparator: "mcq_exact",
    hint: "On pose d’abord une base.",
    explanation: expl("On commence par tracer un côté (la base) à la règle, puis on reporte les deux autres longueurs au compas."),
    tags: ["triangle_figure", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Décris les étapes pour construire un triangle dont on connaît les trois longueurs de côtés.",
    format: "open",
    expected: ["règle", "compas", "côté"],
    comparator: "contains_keyword",
    hint: "Base à la règle, puis arcs au compas.",
    explanation: expl("On trace un côté à la règle, puis on trace deux arcs de cercle au compas (un de chaque extrémité) avec les deux autres longueurs ; leur intersection donne le troisième sommet."),
    tags: ["triangle_figure", "construire", "open"],
  },
  {
    kind: "template",
    id: "triangle_construire_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour un triangle réalisable, le plus grand côté doit être inférieur à la somme des deux autres.",
    tags: ["triangle_figure", "construire", "template", "inegalite"],
    generate: () => {
      const cas = [
        { a: 3, b: 4, c: 5, ok: "oui" },
        { a: 6, b: 6, c: 6, ok: "oui" },
        { a: 2, b: 3, c: 9, ok: "non" },
        { a: 1, b: 1, c: 5, ok: "non" },
      ];
      const item = randomChoice(cas);
      const max = Math.max(item.a, item.b, item.c);
      const somme = item.a + item.b + item.c - max;
      return {
        text: `Peut-on construire un triangle de côtés ${item.a} cm, ${item.b} cm et ${item.c} cm ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.ok],
        comparator: "mcq_exact",
        explanation: expl(
          item.ok === "oui"
            ? `Le plus grand côté (${max} cm) est plus petit que la somme des deux autres (${somme} cm) : le triangle est constructible.`
            : `Le plus grand côté (${max} cm) dépasse la somme des deux autres (${somme} cm) : impossible de fermer le triangle.`
        ),
      };
    },
  },

  // =========================
  // TOP-UP — TRIANGLE_SOMME_ANGLE
  // =========================
  {
    kind: "fixed",
    id: "triangle_somme_angle_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut la somme des angles d’un triangle ?",
    format: "qcm",
    choices: ["180°", "90°", "360°", "100°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "C’est une propriété fondamentale.",
    explanation: expl("La somme des trois angles d’un triangle vaut toujours 180°."),
    tags: ["triangle_figure", "somme_angle", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle, deux angles mesurent 90° et 30°. Combien mesure le troisième ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "180 - 90 - 30.",
    explanation: expl("Troisième angle = 180 - 90 - 30 = 60°."),
    tags: ["triangle_figure", "somme_angle", "calcul"],
    canvas: triangleCanvas({ type: "rectangle", angleLabels: { A: "90°", B: "30°", C: "?" } }),
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle équilatéral, combien mesure chaque angle ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "180 ÷ 3.",
    explanation: expl("Les trois angles sont égaux : chacun mesure 180 ÷ 3 = 60°."),
    tags: ["triangle_figure", "somme_angle", "equilateral"],
    canvas: triangleCanvas({ type: "equilateral", angleLabels: { A: "?", B: "?", C: "?" } }),
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver un angle d’un triangle quand on connaît les deux autres.",
    format: "open",
    expected: ["180", "soustrait", "somme"],
    comparator: "contains_keyword",
    hint: "Pars de 180°.",
    explanation: expl("On soustrait la somme des deux angles connus à 180° pour obtenir le troisième angle."),
    tags: ["triangle_figure", "somme_angle", "open"],
  },
  {
    kind: "template",
    id: "triangle_somme_angle_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 4,
    theme: "neutral",
    hint: "Un triangle isocèle a deux angles égaux.",
    tags: ["triangle_figure", "somme_angle", "template", "isocele"],
    generate: () => {
      const sommet = randomChoice([40, 50, 70, 80, 100]);
      const base = (180 - sommet) / 2;
      return {
        text: `Dans un triangle isocèle, l’angle au sommet mesure ${sommet}°. Combien mesure chacun des deux angles à la base ?`,
        format: "short",
        expected: [String(base)],
        comparator: "number_equal",
        explanation: expl(`Les deux angles de base sont égaux : (180 - ${sommet}) ÷ 2 = ${base}°.`),
        canvas: triangleCanvas({ type: "isocele", angleLabels: { C: `${sommet}°`, A: "?", B: "?" } }),
      };
    },
  },

  // =========================
  // TOP-UP — TRIANGLE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "triangle_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle rectangle, un angle aigu mesure 37°. Combien mesure l’autre angle aigu ?",
    format: "short",
    expected: ["53"],
    comparator: "number_equal",
    hint: "Les deux angles aigus font ensemble 90°.",
    explanation: expl("Dans un triangle rectangle, les deux angles aigus font 90°. L’autre angle = 90 - 37 = 53°."),
    tags: ["triangle_figure", "defi", "rectangle", "somme_angle"],
    canvas: triangleCanvas({ type: "rectangle", angleLabels: { A: "90°", B: "37°", C: "?" } }),
  },
  {
    kind: "fixed",
    id: "triangle_defi_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un triangle peut-il être à la fois rectangle et isocèle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Pense à un angle de 90° et deux angles de 45°.",
    explanation: expl("Oui : avec un angle droit et deux angles de 45°, le triangle est rectangle et isocèle."),
    tags: ["triangle_figure", "defi", "qcm", "nature"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Un triangle peut avoir des angles de 100°, 50° et 40° ». Explique pourquoi c’est faux.",
    format: "open",
    expected: ["180", "somme", "190"],
    comparator: "contains_keyword",
    hint: "Additionne les trois angles.",
    explanation: expl("La somme 100 + 50 + 40 = 190° dépasse 180°. C’est impossible pour un triangle."),
    tags: ["triangle_figure", "defi", "open", "somme_angle", "erreur"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un triangle isocèle, l’angle au sommet mesure 40°. Combien mesure chaque angle à la base ?",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "(180 - 40) ÷ 2.",
    explanation: expl("Angles de base = (180 - 40) ÷ 2 = 140 ÷ 2 = 70°."),
    tags: ["triangle_figure", "defi", "isocele", "somme_angle"],
    canvas: triangleCanvas({ type: "isocele", angleLabels: { C: "40°", A: "?", B: "?" } }),
  },
  {
    kind: "fixed",
    id: "triangle_defi_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un triangle a un angle de 60° et est isocèle avec ce sommet. Quelle est sa nature exacte ?",
    format: "qcm",
    choices: ["équilatéral", "rectangle", "quelconque", "aplati"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
    hint: "Calcule les deux autres angles : (180 - 60) ÷ 2.",
    explanation: expl("Les deux angles de base valent (180 - 60) ÷ 2 = 60°. Les trois angles font 60° : le triangle est équilatéral."),
    tags: ["triangle_figure", "defi", "qcm", "nature"],
    canvas: triangleCanvas({ type: "equilateral" }),
  },
  {
    kind: "template",
    id: "triangle_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Somme des angles = 180°.",
    tags: ["triangle_figure", "defi", "reunion", "template", "somme_angle"],
    generate: () => {
      const a = randomChoice([35, 40, 45, 55, 65]);
      const b = randomChoice([60, 70, 75, 80]);
      const c = 180 - a - b;
      return {
        text: `Sur une voile de char à voile à l’Étang-Salé, deux angles d’un triangle mesurent ${a}° et ${b}°. Quelle est la mesure du troisième angle ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation: expl(`Troisième angle = 180 - ${a} - ${b} = ${c}°.`),
        canvas: triangleCanvas({ angleLabels: { A: `${a}°`, B: `${b}°`, C: "?" } }),
      };
    },
  },
];