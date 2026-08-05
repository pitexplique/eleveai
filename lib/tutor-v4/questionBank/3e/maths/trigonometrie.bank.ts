// lib/tutor-v4/question-banks/maths/3e/trigonometrie.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// Les propositions d'un gabarit sont écrites à la main, et deux d'entre elles
// finissent par coïncider dès qu'un paramètre tombe sur une valeur particulière
// (a = b, un coefficient nul, une fraction qui se simplifie…). L'élève voyait
// alors deux fois la même ligne. On met la bonne réponse de côté, on tire trois
// pièges réellement distincts, puis on mélange l'ensemble.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}


/* =========================
   HELPERS
========================= */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function degToRad(angle: number) {
  return (angle * Math.PI) / 180;
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

function formatNumber(n: number) {
  return Number.isInteger(n) ? String(n) : String(round1(n)).replace(".", ",");
}

function triangleTrigoCanvas(params?: {
  angleAt?: "B" | "C";
  sideLabels?: {
    AB?: string;
    AC?: string;
    BC?: string;
  };
  angleLabel?: string;
}) {
  const angleAt = params?.angleAt ?? "B";

  return {
    kind: "triangle",
    points: {
      A: { x: 55, y: 190 },
      B: { x: 230, y: 190 },
      C: { x: 55, y: 70 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
    },
    sideLabels: params?.sideLabels ?? {
      AB: "adjacent",
      AC: "opposé",
      BC: "hypoténuse",
    },
    angleLabels:
      angleAt === "B"
        ? { B: params?.angleLabel ?? "θ" }
        : { C: params?.angleLabel ?? "θ" },
    marks: {
      rightAngleAt: "A",
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: true,
    },
    size: { width: 280, height: 240 },
  } as any;
}

/* =========================
   BANK
========================= */

export const trigonometrieBank: TutorBankItemV4[] = [
  /* =========================
     TRIGO_TRIANGLE_RECTANGLE
  ========================= */

  {
    kind: "fixed",
    id: "3e_trigo_triangle_rectangle_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_triangle_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un triangle rectangle, comment appelle-t-on le côté opposé à l’angle droit ?",
    format: "qcm",
    choices: ["l’hypoténuse", "le côté adjacent", "le côté opposé", "la hauteur"],
    expected: ["l’hypoténuse"],
    comparator: "mcq_exact",
    hint: "C’est toujours le plus grand côté du triangle rectangle.",
    explanation:
      "Définition : dans un triangle rectangle, l’hypoténuse est le côté opposé à l’angle droit.\n\n" +
      "Méthode : on repère d’abord l’angle droit, puis on regarde le côté situé en face.\n\n" +
      "Calcul : ici, il n’y a pas de calcul : il faut identifier le bon côté.\n\n" +
      "Conclusion : le côté opposé à l’angle droit s’appelle l’hypoténuse.",
    canvas: triangleTrigoCanvas(),
    tags: ["trigo_trigonometrie", "triangle_rectangle", "hypotenuse", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_trigo_triangle_rectangle_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_triangle_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle rectangle en A, par rapport à l’angle B, quel côté est opposé ?",
    format: "qcm",
    choices: ["AC", "AB", "BC", "A"],
    expected: ["AC"],
    comparator: "mcq_exact",
    hint: "Le côté opposé à un angle est le côté en face de cet angle.",
    explanation:
      "Définition : le côté opposé à un angle est le côté situé en face de cet angle.\n\n" +
      "Méthode : on se place sur l’angle B, puis on regarde le côté qui est en face.\n\n" +
      "Calcul : dans ce triangle, le côté en face de l’angle B est AC.\n\n" +
      "Conclusion : par rapport à l’angle B, le côté opposé est AC.",
    canvas: triangleTrigoCanvas({ angleAt: "B" }),
    tags: ["trigo_trigonometrie", "oppose", "triangle_rectangle", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "3e_trigo_triangle_rectangle_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_triangle_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère l’angle étudié, puis classe les côtés.",
    tags: ["trigo_trigonometrie", "cotes", "template", "canvas"],
    generate: () => {
      const angleAt = randomChoice<"B" | "C">(["B", "C"]);

      const correct =
        angleAt === "B"
          ? "opposé : AC ; adjacent : AB ; hypoténuse : BC"
          : "opposé : AB ; adjacent : AC ; hypoténuse : BC";

      const choices =
        angleAt === "B"
          ? [
              correct,
              "opposé : AB ; adjacent : AC ; hypoténuse : BC",
              "opposé : BC ; adjacent : AB ; hypoténuse : AC",
              "opposé : AC ; adjacent : BC ; hypoténuse : AB",
            ]
          : [
              correct,
              "opposé : AC ; adjacent : AB ; hypoténuse : BC",
              "opposé : BC ; adjacent : AC ; hypoténuse : AB",
              "opposé : AB ; adjacent : BC ; hypoténuse : AC",
            ];

      return {
        text: `Dans le triangle rectangle en A, par rapport à l’angle ${angleAt}, quelle phrase est correcte ?`,
        format: "qcm",
        choices: shuffle(choices),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : dans un triangle rectangle, l’hypoténuse est le côté opposé à l’angle droit. Le côté opposé et le côté adjacent dépendent de l’angle choisi.\n\n` +
          `Méthode : on se place sur l’angle ${angleAt}, puis on identifie le côté en face et le côté qui touche l’angle sans être l’hypoténuse.\n\n` +
          `Calcul : ici, ${correct}.\n\n` +
          `Conclusion : il faut toujours identifier les côtés par rapport à l’angle étudié.`,
        canvas: triangleTrigoCanvas({ angleAt }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_triangle_rectangle_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_triangle_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi le côté opposé et le côté adjacent dépendent de l’angle choisi.",
    format: "open",
    expected: ["angle", "opposé", "adjacent", "hypoténuse"],
    comparator: "contains_keyword",
    hint: "Change d’angle : les côtés ne jouent plus le même rôle.",
    explanation:
      "Définition : en trigonométrie, les mots opposé et adjacent se définissent par rapport à un angle aigu.\n\n" +
      "Méthode : on choisit d’abord l’angle étudié, puis on regarde les côtés autour de cet angle.\n\n" +
      "Calcul : dans un même triangle rectangle, si on change d’angle, le côté opposé et le côté adjacent peuvent s’inverser.\n\n" +
      "Conclusion : il faut toujours préciser l’angle avant de choisir sinus, cosinus ou tangente.",
    tags: ["trigo_trigonometrie", "open", "raisonnement"],
  },

  /* =========================
     TRIGO_COSINUS
  ========================= */

  {
    kind: "fixed",
    id: "3e_trigo_cosinus_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_cosinus",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle rectangle, quelle formule correspond au cosinus d’un angle aigu ?",
    format: "qcm",
    choices: [
      "cos(angle) = adjacent / hypoténuse",
      "cos(angle) = opposé / hypoténuse",
      "cos(angle) = opposé / adjacent",
      "cos(angle) = hypoténuse / adjacent",
    ],
    expected: ["cos(angle) = adjacent / hypoténuse"],
    comparator: "mcq_exact",
    hint: "Cosinus utilise le côté adjacent et l’hypoténuse.",
    explanation:
      "Définition : dans un triangle rectangle, le cosinus d’un angle aigu relie le côté adjacent et l’hypoténuse.\n\n" +
      "Méthode : on retient que cosinus = adjacent ÷ hypoténuse.\n\n" +
      "Calcul : cos(angle) = adjacent / hypoténuse.\n\n" +
      "Conclusion : la bonne formule est cos(angle) = adjacent / hypoténuse.",
    canvas: triangleTrigoCanvas({ angleAt: "B" }),
    tags: ["trigo_trigonometrie", "cosinus", "formule", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "3e_trigo_cosinus_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_cosinus",
    difficulty: 3,
    theme: "neutral",
    hint: "Cosinus = adjacent ÷ hypoténuse.",
    tags: ["trigo_trigonometrie", "cosinus", "template", "longueur"],
    generate: () => {
      const data = randomChoice([
        { angle: 60, hyp: 10, adj: 5 },
        { angle: 45, hyp: 8, adj: round1(8 * Math.cos(degToRad(45))) },
        { angle: 30, hyp: 12, adj: round1(12 * Math.cos(degToRad(30))) },
      ]);

      return {
        text: `Dans un triangle rectangle, l’hypoténuse mesure ${data.hyp} cm et l’angle étudié vaut ${data.angle}°. Calculer la longueur du côté adjacent au dixième près.`,
        format: "short",
        expected: [String(data.adj)],
        comparator: "number_equal",
        explanation:
          `Définition : le cosinus relie le côté adjacent et l’hypoténuse.\n\n` +
          `Méthode : on utilise cos(angle) = adjacent / hypoténuse, donc adjacent = hypoténuse × cos(angle).\n\n` +
          `Calcul : adjacent = ${data.hyp} × cos(${data.angle}°) ≈ ${formatNumber(data.adj)} cm.\n\n` +
          `Conclusion : le côté adjacent mesure environ ${formatNumber(data.adj)} cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: `${data.angle}°`,
          sideLabels: { BC: `${data.hyp} cm`, AB: "?", AC: "" },
        }),
      };
    },
  },

  /* =========================
     TRIGO_SINUS
  ========================= */

  {
    kind: "fixed",
    id: "3e_trigo_sinus_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_sinus",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle rectangle, quelle formule correspond au sinus d’un angle aigu ?",
    format: "qcm",
    choices: [
      "sin(angle) = opposé / hypoténuse",
      "sin(angle) = adjacent / hypoténuse",
      "sin(angle) = opposé / adjacent",
      "sin(angle) = hypoténuse / opposé",
    ],
    expected: ["sin(angle) = opposé / hypoténuse"],
    comparator: "mcq_exact",
    hint: "Sinus utilise le côté opposé et l’hypoténuse.",
    explanation:
      "Définition : dans un triangle rectangle, le sinus d’un angle aigu relie le côté opposé et l’hypoténuse.\n\n" +
      "Méthode : on retient que sinus = opposé ÷ hypoténuse.\n\n" +
      "Calcul : sin(angle) = opposé / hypoténuse.\n\n" +
      "Conclusion : la bonne formule est sin(angle) = opposé / hypoténuse.",
    canvas: triangleTrigoCanvas({ angleAt: "B" }),
    tags: ["trigo_trigonometrie", "sinus", "formule", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "3e_trigo_sinus_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_sinus",
    difficulty: 3,
    theme: "neutral",
    hint: "Sinus = opposé ÷ hypoténuse.",
    tags: ["trigo_trigonometrie", "sinus", "template", "longueur"],
    generate: () => {
      const angle = randomChoice([30, 45, 60]);
      const hyp = randomChoice([8, 10, 12, 15]);
      const oppose = round1(hyp * Math.sin(degToRad(angle)));

      return {
        text: `Dans un triangle rectangle, l’hypoténuse mesure ${hyp} cm et l’angle étudié vaut ${angle}°. Calculer le côté opposé au dixième près.`,
        format: "short",
        expected: [String(oppose)],
        comparator: "number_equal",
        explanation:
          `Définition : le sinus relie le côté opposé et l’hypoténuse.\n\n` +
          `Méthode : on utilise sin(angle) = opposé / hypoténuse, donc opposé = hypoténuse × sin(angle).\n\n` +
          `Calcul : opposé = ${hyp} × sin(${angle}°) ≈ ${formatNumber(oppose)} cm.\n\n` +
          `Conclusion : le côté opposé mesure environ ${formatNumber(oppose)} cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: `${angle}°`,
          sideLabels: { BC: `${hyp} cm`, AC: "?", AB: "" },
        }),
      };
    },
  },

  /* =========================
     TRIGO_TANGENTE
  ========================= */

  {
    kind: "fixed",
    id: "3e_trigo_tangente_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_tangente",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle rectangle, quelle formule correspond à la tangente d’un angle aigu ?",
    format: "qcm",
    choices: [
      "tan(angle) = opposé / adjacent",
      "tan(angle) = adjacent / hypoténuse",
      "tan(angle) = opposé / hypoténuse",
      "tan(angle) = hypoténuse / adjacent",
    ],
    expected: ["tan(angle) = opposé / adjacent"],
    comparator: "mcq_exact",
    hint: "Tangente n’utilise pas l’hypoténuse.",
    explanation:
      "Définition : dans un triangle rectangle, la tangente d’un angle aigu relie le côté opposé et le côté adjacent.\n\n" +
      "Méthode : on retient que tangente = opposé ÷ adjacent.\n\n" +
      "Calcul : tan(angle) = opposé / adjacent.\n\n" +
      "Conclusion : la bonne formule est tan(angle) = opposé / adjacent.",
    canvas: triangleTrigoCanvas({ angleAt: "B" }),
    tags: ["trigo_trigonometrie", "tangente", "formule", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "3e_trigo_tangente_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_tangente",
    difficulty: 3,
    theme: "neutral",
    hint: "Tangente = opposé ÷ adjacent.",
    tags: ["trigo_trigonometrie", "tangente", "template", "longueur"],
    generate: () => {
      const angle = randomChoice([30, 35, 40, 45, 50]);
      const adjacent = randomChoice([5, 6, 8, 10, 12]);
      const oppose = round1(adjacent * Math.tan(degToRad(angle)));

      return {
        text: `Dans un triangle rectangle, le côté adjacent à un angle de ${angle}° mesure ${adjacent} cm. Calculer le côté opposé au dixième près.`,
        format: "short",
        expected: [String(oppose)],
        comparator: "number_equal",
        explanation:
          `Définition : la tangente relie le côté opposé et le côté adjacent.\n\n` +
          `Méthode : on utilise tan(angle) = opposé / adjacent, donc opposé = adjacent × tan(angle).\n\n` +
          `Calcul : opposé = ${adjacent} × tan(${angle}°) ≈ ${formatNumber(oppose)} cm.\n\n` +
          `Conclusion : le côté opposé mesure environ ${formatNumber(oppose)} cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: `${angle}°`,
          sideLabels: { AB: `${adjacent} cm`, AC: "?", BC: "" },
        }),
      };
    },
  },

  /* =========================
     TRIGO_CALCULER_LONGUEUR
  ========================= */

  {
    kind: "template",
    id: "3e_trigo_calculer_longueur_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par repérer les côtés connus et le côté cherché.",
    tags: ["trigo_trigonometrie", "calcul_longueur", "template", "canvas"],
    generate: () => {
      const cases = [
        {
          ratio: "cosinus",
          angle: 60,
          hyp: 14,
          result: 7,
          text: "l’adjacent",
          formula: "adjacent = hypoténuse × cos(angle)",
        },
        {
          ratio: "sinus",
          angle: 30,
          hyp: 18,
          result: 9,
          text: "l’opposé",
          formula: "opposé = hypoténuse × sin(angle)",
        },
        {
          ratio: "tangente",
          angle: 45,
          adj: 11,
          result: 11,
          text: "l’opposé",
          formula: "opposé = adjacent × tan(angle)",
        },
      ];

      const c = randomChoice(cases);

      return {
        text:
          c.ratio === "tangente"
            ? `Dans un triangle rectangle, un angle vaut ${c.angle}° et le côté adjacent mesure ${c.adj} cm. Calculer ${c.text}.`
            : `Dans un triangle rectangle, un angle vaut ${c.angle}° et l’hypoténuse mesure ${c.hyp} cm. Calculer ${c.text}.`,
        format: "short",
        expected: [String(c.result)],
        comparator: "number_equal",
        explanation:
          `Définition : la trigonométrie permet de calculer une longueur dans un triangle rectangle.\n\n` +
          `Méthode : ici, on utilise le ${c.ratio} car la formule adaptée est : ${c.formula}.\n\n` +
          `Calcul : la longueur cherchée vaut ${c.result} cm.\n\n` +
          `Conclusion : ${c.text} mesure ${c.result} cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: `${c.angle}°`,
          sideLabels:
            c.ratio === "tangente"
              ? { AB: `${c.adj} cm`, AC: "?", BC: "" }
              : { BC: `${c.hyp} cm`, AB: c.ratio === "cosinus" ? "?" : "", AC: c.ratio === "sinus" ? "?" : "" },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_calculer_longueur_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi il faut d’abord identifier l’hypoténuse avant de choisir une formule de trigonométrie.",
    format: "open",
    expected: ["hypoténuse", "sinus", "cosinus", "triangle", "rectangle"],
    comparator: "contains_keyword",
    hint: "Deux formules utilisent l’hypoténuse.",
    explanation:
      "Définition : l’hypoténuse est le plus grand côté du triangle rectangle et le côté opposé à l’angle droit.\n\n" +
      "Méthode : avant de choisir sinus, cosinus ou tangente, on repère l’hypoténuse, le côté opposé et le côté adjacent.\n\n" +
      "Calcul : sinus et cosinus utilisent l’hypoténuse, alors que tangente ne l’utilise pas.\n\n" +
      "Conclusion : identifier l’hypoténuse évite de choisir une mauvaise formule.",
    tags: ["trigo_trigonometrie", "calcul_longueur", "open", "raisonnement"],
  },

  /* =========================
     TRIGO_CALCULER_ANGLE
  ========================= */

  {
    kind: "template",
    id: "3e_trigo_calculer_angle_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour calculer un angle, on utilise cos⁻¹, sin⁻¹ ou tan⁻¹ à la calculatrice.",
    tags: ["trigo_trigonometrie", "calcul_angle", "template", "canvas"],
    generate: () => {
      const data = randomChoice([
        {
          ratio: "cosinus",
          value: 0.5,
          angle: 60,
          explanationRatio: "adjacent / hypoténuse",
          sideLabels: { AB: "5 cm", BC: "10 cm", AC: "" },
        },
        {
          ratio: "sinus",
          value: 0.5,
          angle: 30,
          explanationRatio: "opposé / hypoténuse",
          sideLabels: { AC: "5 cm", BC: "10 cm", AB: "" },
        },
        {
          ratio: "tangente",
          value: 1,
          angle: 45,
          explanationRatio: "opposé / adjacent",
          sideLabels: { AC: "7 cm", AB: "7 cm", BC: "" },
        },
      ]);

      return {
        text: `Dans un triangle rectangle, on obtient ${data.ratio}(angle) = ${String(
          data.value
        ).replace(".", ",")}. Calculer l’angle.`,
        format: "short",
        expected: [String(data.angle)],
        comparator: "number_equal",
        explanation:
          `Définition : pour calculer un angle avec la trigonométrie, on utilise la fonction inverse du ratio choisi.\n\n` +
          `Méthode : ici, le ratio utilisé est le ${data.ratio}, qui correspond à ${data.explanationRatio}.\n\n` +
          `Calcul : angle = ${data.ratio}⁻¹(${String(data.value).replace(".", ",")}) = ${data.angle}°.\n\n` +
          `Conclusion : l’angle mesure ${data.angle}°.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: "?",
          sideLabels: data.sideLabels,
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_calculer_angle_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi on utilise cos⁻¹, sin⁻¹ ou tan⁻¹ pour calculer un angle.",
    format: "open",
    expected: ["angle", "inverse", "cos", "sin", "tan"],
    comparator: "contains_keyword",
    hint: "Quand l’angle est inconnu, on inverse le ratio trigonométrique.",
    explanation:
      "Définition : cos⁻¹, sin⁻¹ et tan⁻¹ sont les fonctions inverses du cosinus, du sinus et de la tangente.\n\n" +
      "Méthode : quand on connaît un rapport de longueurs mais pas l’angle, on utilise la fonction inverse adaptée.\n\n" +
      "Calcul : si cos(angle) = 0,5, alors angle = cos⁻¹(0,5) = 60°.\n\n" +
      "Conclusion : les fonctions inverses permettent de retrouver un angle à partir d’un rapport de longueurs.",
    tags: ["trigo_trigonometrie", "angle", "open", "calculatrice"],
  },

  /* =========================
     TRIGO_CHOISIR_RATIO
  ========================= */

  {
    kind: "template",
    id: "3e_trigo_choisir_rapport_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_choisir_rapport",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde quels côtés sont connus ou cherchés.",
    tags: ["trigo_trigonometrie", "choisir_ratio", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          known: "opposé et hypoténuse",
          correct: "sinus",
          reason: "sinus = opposé / hypoténuse",
        },
        {
          known: "adjacent et hypoténuse",
          correct: "cosinus",
          reason: "cosinus = adjacent / hypoténuse",
        },
        {
          known: "opposé et adjacent",
          correct: "tangente",
          reason: "tangente = opposé / adjacent",
        },
      ]);

      return {
        text: `On connaît ou on cherche les côtés suivants : ${item.known}. Quel ratio faut-il utiliser ?`,
        format: "qcm",
        choices: shuffle(["sinus", "cosinus", "tangente", "Pythagore"]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : chaque ratio trigonométrique relie deux côtés précis d’un triangle rectangle.\n\n` +
          `Méthode : on choisit le ratio qui utilise exactement les côtés connus ou cherchés.\n\n` +
          `Calcul : ici, ${item.reason}.\n\n` +
          `Conclusion : il faut utiliser le ${item.correct}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_choisir_rapport_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_choisir_rapport",
    difficulty: 4,
    theme: "neutral",
    text: "Donne une méthode simple pour choisir entre sinus, cosinus et tangente.",
    format: "open",
    expected: ["opposé", "adjacent", "hypoténuse", "choisir"],
    comparator: "contains_keyword",
    hint: "Commence par identifier les côtés utiles.",
    explanation:
      "Définition : sinus, cosinus et tangente sont trois rapports de longueurs dans un triangle rectangle.\n\n" +
      "Méthode : on identifie l’angle étudié, puis les côtés opposé, adjacent et hypoténuse.\n\n" +
      "Calcul : si on utilise opposé/hypoténuse, c’est sinus ; adjacent/hypoténuse, c’est cosinus ; opposé/adjacent, c’est tangente.\n\n" +
      "Conclusion : choisir le bon ratio revient à repérer les deux côtés utiles.",
    tags: ["trigo_trigonometrie", "choisir_ratio", "open", "methode"],
  },

  /* =========================
     TRIGO_DEFIS
  ========================= */

  {
    kind: "template",
    id: "3e_trigo_defi_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Modélise la situation par un triangle rectangle.",
    tags: ["trigo_trigonometrie", "defi", "reunion", "template"],
    generate: () => {
      const angle = randomChoice([30, 35, 40]);
      const distance = randomChoice([20, 30, 40, 50]);
      const hauteur = round1(distance * Math.tan(degToRad(angle)));

      return {
        text: `À La Réunion, un élève observe le sommet d’un palmier avec un angle de ${angle}°. Il est à ${distance} m du pied du palmier. Estimer la hauteur du palmier au dixième près.`,
        format: "short",
        expected: [String(hauteur)],
        comparator: "number_equal",
        explanation:
          `Définition : la tangente permet de relier un angle, le côté opposé et le côté adjacent dans un triangle rectangle.\n\n` +
          `Méthode : la hauteur du palmier est le côté opposé, et la distance au pied du palmier est le côté adjacent.\n\n` +
          `Calcul : hauteur = ${distance} × tan(${angle}°) ≈ ${formatNumber(hauteur)} m.\n\n` +
          `Conclusion : le palmier mesure environ ${formatNumber(hauteur)} m.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « Dans un triangle rectangle, je peux toujours utiliser cosinus, peu importe les côtés donnés. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le choix dépend des côtés connus et du côté cherché.",
    explanation:
      "Définition : cosinus, sinus et tangente ne relient pas les mêmes côtés.\n\n" +
      "Méthode : on doit choisir le ratio qui correspond aux côtés connus et au côté cherché.\n\n" +
      "Calcul : cosinus utilise adjacent/hypoténuse, sinus utilise opposé/hypoténuse, tangente utilise opposé/adjacent.\n\n" +
      "Conclusion : l’élève a tort : on ne peut pas toujours utiliser le cosinus.",
    tags: ["trigo_trigonometrie", "defi", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_trigo_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la trigonométrie est utile quand Pythagore ne suffit pas.",
    format: "open",
    expected: ["angle", "longueur", "triangle", "rectangle", "pythagore"],
    comparator: "contains_keyword",
    hint: "Pythagore relie seulement les longueurs, pas directement les angles.",
    explanation:
      "Définition : le théorème de Pythagore relie les longueurs des côtés d’un triangle rectangle.\n\n" +
      "Méthode : quand un angle intervient dans le problème, on utilise la trigonométrie.\n\n" +
      "Calcul : sinus, cosinus et tangente permettent de relier un angle aigu avec deux côtés du triangle rectangle.\n\n" +
      "Conclusion : la trigonométrie est utile pour calculer des longueurs ou des angles quand un angle est connu ou recherché.",
    tags: ["trigo_trigonometrie", "defi", "open", "raisonnement"],
  },

  /* =========================
     TRIGO_TRIANGLE_RECTANGLE (compléments)
  ========================= */

  {
    kind: "fixed",
    id: "3e_trigo_triangle_rectangle_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_triangle_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle rectangle en A, par rapport à l’angle B, quel côté est le côté adjacent ?",
    format: "qcm",
    choices: ["AB", "AC", "BC", "A"],
    expected: ["AB"],
    comparator: "mcq_exact",
    hint: "Le côté adjacent touche l’angle sans être l’hypoténuse.",
    explanation:
      "Définition : le côté adjacent à un angle est le côté qui touche cet angle sans être l’hypoténuse.\n\n" +
      "Méthode : on se place sur l’angle B et on écarte l’hypoténuse BC.\n\n" +
      "Calcul : le côté qui touche B sans être l’hypoténuse est AB.\n\n" +
      "Conclusion : le côté adjacent à l’angle B est AB.",
    canvas: triangleTrigoCanvas({ angleAt: "B" }),
    tags: ["trigo_trigonometrie", "adjacent", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_trigo_triangle_rectangle_fixed_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_triangle_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle rectangle en A, par rapport à l’angle C, quel côté est opposé ?",
    format: "qcm",
    choices: ["AB", "AC", "BC", "C"],
    expected: ["AB"],
    comparator: "mcq_exact",
    hint: "L’opposé à C est le côté qui ne touche pas C.",
    explanation:
      "Définition : le côté opposé à un angle est celui qui est en face de cet angle.\n\n" +
      "Méthode : on se place sur l’angle C et on cherche le côté en face.\n\n" +
      "Calcul : le côté en face de C est AB.\n\n" +
      "Conclusion : par rapport à l’angle C, le côté opposé est AB.",
    canvas: triangleTrigoCanvas({ angleAt: "C" }),
    tags: ["trigo_trigonometrie", "oppose", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_trigo_triangle_rectangle_fixed_5_aigus",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_triangle_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle rectangle, que peut-on dire des deux angles autres que l’angle droit ?",
    format: "qcm",
    choices: [
      "ils sont aigus et leur somme vaut $90^\\circ$",
      "ils sont droits",
      "ils sont obtus",
      "leur somme vaut $180^\\circ$",
    ],
    expected: ["ils sont aigus et leur somme vaut $90^\\circ$"],
    comparator: "mcq_exact",
    hint: "La somme des trois angles vaut $180^\\circ$, et l’un vaut déjà $90^\\circ$.",
    explanation:
      "Définition : la somme des angles d’un triangle vaut $180^\\circ$.\n\n" +
      "Méthode : on retire l’angle droit ($90^\\circ$) à $180^\\circ$.\n\n" +
      "Calcul : il reste $90^\\circ$ à partager entre les deux angles aigus.\n\n" +
      "Conclusion : les deux angles sont aigus et leur somme vaut $90^\\circ$.",
    canvas: triangleTrigoCanvas({ angleAt: "B" }),
    tags: ["trigo_trigonometrie", "angles", "complementaires", "qcm"],
  },

  {
    kind: "template",
    id: "3e_trigo_triangle_rectangle_tpl_2_adjacent",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_triangle_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Le côté adjacent touche l’angle étudié sans être l’hypoténuse.",
    tags: ["trigo_trigonometrie", "adjacent", "canvas", "template"],
    generate: () => {
      const angleAt = randomChoice<"B" | "C">(["B", "C"]);
      const adjacent = angleAt === "B" ? "AB" : "AC";
      return {
        text: `Dans le triangle rectangle en A, par rapport à l’angle ${angleAt}, quel est le côté adjacent ?`,
        format: "qcm",
        choices: shuffle(["AB", "AC", "BC"]),
        expected: [adjacent],
        comparator: "mcq_exact",
        explanation:
          `Définition : le côté adjacent touche l’angle étudié sans être l’hypoténuse.\n\n` +
          `Méthode : on se place sur l’angle ${angleAt} et on écarte l’hypoténuse BC.\n\n` +
          `Calcul : le côté qui touche ${angleAt} sans être BC est ${adjacent}.\n\n` +
          `Conclusion : le côté adjacent est ${adjacent}.`,
        canvas: triangleTrigoCanvas({ angleAt }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_triangle_rectangle_fixed_6_complementaire",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_triangle_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle rectangle, un angle aigu mesure $40^\\circ$. Combien mesure l’autre angle aigu ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "Les deux angles aigus ont une somme de $90^\\circ$.",
    explanation:
      "Définition : dans un triangle rectangle, les deux angles aigus sont complémentaires.\n\n" +
      "Méthode : on soustrait l’angle connu à $90^\\circ$.\n\n" +
      "Calcul : $90 - 40 = 50$.\n\n" +
      "Conclusion : l’autre angle aigu mesure $50^\\circ$.",
    canvas: triangleTrigoCanvas({ angleAt: "B", angleLabel: "40°" }),
    tags: ["trigo_trigonometrie", "angles", "complementaires", "short"],
  },

  /* =========================
     TRIGO_COSINUS (compléments)
  ========================= */

  {
    kind: "fixed",
    id: "3e_trigo_cosinus_fixed_2_latex",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_cosinus",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle égalité définit le cosinus d’un angle aigu $\\theta$ dans un triangle rectangle ?",
    format: "qcm",
    choices: [
      "$\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$",
      "$\\cos(\\theta) = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$",
      "$\\cos(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}}$",
      "$\\cos(\\theta) = \\dfrac{\\text{hypoténuse}}{\\text{adjacent}}$",
    ],
    expected: ["$\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$"],
    comparator: "mcq_exact",
    hint: "« CAH » : Cosinus, Adjacent, Hypoténuse.",
    explanation:
      "Définition : le cosinus relie le côté adjacent et l’hypoténuse.\n\n" +
      "Méthode : on retient le moyen mnémotechnique « CAH ».\n\n" +
      "Calcul : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Conclusion : c’est la première égalité.",
    canvas: triangleTrigoCanvas({ angleAt: "B" }),
    tags: ["trigo_trigonometrie", "cosinus", "formule", "qcm"],
  },

  {
    kind: "template",
    id: "3e_trigo_cosinus_tpl_2_adjacent_entier",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_cosinus",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$, et $\\cos(60^\\circ) = 0{,}5$.",
    tags: ["trigo_trigonometrie", "cosinus", "longueur", "canvas", "template"],
    generate: () => {
      const hyp = randomChoice([8, 10, 12, 14, 16]);
      const adj = hyp / 2; // cos 60° = 0,5
      return {
        text: `Dans un triangle rectangle, l’hypoténuse mesure ${hyp} cm et l’angle étudié vaut $60^\\circ$. Calcule la longueur du côté adjacent (en cm).`,
        format: "short",
        expected: [String(adj), String(adj).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(60^\\circ)$.\n\n` +
          `Calcul : $\\text{adjacent} = ${hyp} \\times 0{,}5 = ${adj}$ cm.\n\n` +
          `Conclusion : le côté adjacent mesure $${adj}$ cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: "60°",
          sideLabels: { BC: `${hyp} cm`, AB: "?", AC: "" },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_trigo_cosinus_tpl_3_hypotenuse",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_cosinus",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(\\theta)}$, et $\\cos(60^\\circ) = 0{,}5$.",
    tags: ["trigo_trigonometrie", "cosinus", "hypotenuse", "canvas", "template"],
    generate: () => {
      const adj = randomChoice([3, 4, 5, 6, 7]);
      const hyp = adj * 2; // cos 60° = 0,5 -> hyp = adj / 0,5
      return {
        text: `Dans un triangle rectangle, le côté adjacent à un angle de $60^\\circ$ mesure ${adj} cm. Calcule la longueur de l’hypoténuse (en cm).`,
        format: "short",
        expected: [String(hyp)],
        comparator: "number_equal",
        explanation:
          `Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : on isole l’hypoténuse : $\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(60^\\circ)}$.\n\n` +
          `Calcul : $\\text{hypoténuse} = \\dfrac{${adj}}{0{,}5} = ${hyp}$ cm.\n\n` +
          `Conclusion : l’hypoténuse mesure $${hyp}$ cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: "60°",
          sideLabels: { AB: `${adj} cm`, BC: "?", AC: "" },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_trigo_cosinus_tpl_4_valeur",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_cosinus",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$, donne la fraction.",
    tags: ["trigo_trigonometrie", "cosinus", "valeur", "template"],
    generate: () => {
      const adj = randomChoice([3, 4, 6]);
      const hyp = randomChoice([5, 8, 10]);
      const correct = `$\\dfrac{${adj}}{${hyp}}$`;
      return {
        text: `Dans un triangle rectangle, le côté adjacent à l’angle étudié mesure ${adj} cm et l’hypoténuse ${hyp} cm. Quelle est la valeur de $\\cos(\\theta)$ ?`,
        format: "qcm",
        choices: shuffle([correct, `$\\dfrac{${hyp}}{${adj}}$`, `$\\dfrac{${adj}}{${adj + hyp}}$`, `$\\dfrac{${hyp}}{${adj + hyp}}$`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : on place l’adjacent au numérateur et l’hypoténuse au dénominateur.\n\n` +
          `Calcul : $\\cos(\\theta) = \\dfrac{${adj}}{${hyp}}$.\n\n` +
          `Conclusion : $\\cos(\\theta) = \\dfrac{${adj}}{${hyp}}$.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          sideLabels: { AB: `${adj} cm`, BC: `${hyp} cm`, AC: "" },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_cosinus_fixed_3_bornes",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_cosinus",
    difficulty: 3,
    theme: "neutral",
    text: "Le cosinus d’un angle aigu peut-il être supérieur à $1$ ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "L’adjacent est toujours plus court que l’hypoténuse.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on compare l’adjacent et l’hypoténuse.\n\n" +
      "Calcul : l’adjacent est toujours inférieur à l’hypoténuse, donc le quotient est inférieur à $1$.\n\n" +
      "Conclusion : non, le cosinus d’un angle aigu est compris entre $0$ et $1$.",
    tags: ["trigo_trigonometrie", "cosinus", "bornes", "qcm"],
  },

  {
    kind: "template",
    id: "3e_trigo_cosinus_tpl_5_decimal",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_cosinus",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$, au dixième.",
    tags: ["trigo_trigonometrie", "cosinus", "longueur", "decimal", "canvas", "template"],
    generate: () => {
      const angle = randomChoice([35, 50, 55]);
      const hyp = randomChoice([10, 12, 14]);
      const adj = round1(hyp * Math.cos(degToRad(angle)));
      return {
        text: `Dans un triangle rectangle, l’hypoténuse mesure ${hyp} cm et l’angle étudié vaut $${angle}^\\circ$. Calcule le côté adjacent au dixième près (en cm).`,
        format: "short",
        expected: [String(adj), String(adj).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$.\n\n` +
          `Calcul : $\\text{adjacent} = ${hyp} \\times \\cos(${angle}^\\circ) \\approx ${formatNumber(adj)}$ cm.\n\n` +
          `Conclusion : le côté adjacent mesure environ $${formatNumber(adj)}$ cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: `${angle}°`,
          sideLabels: { BC: `${hyp} cm`, AB: "?", AC: "" },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_cosinus_fixed_4_choix",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_cosinus",
    difficulty: 4,
    theme: "neutral",
    text: "On connaît l’hypoténuse et on cherche le côté adjacent à l’angle donné. Quel rapport faut-il utiliser ?",
    format: "qcm",
    choices: ["le cosinus", "le sinus", "la tangente", "le théorème de Pythagore"],
    expected: ["le cosinus"],
    comparator: "mcq_exact",
    hint: "Adjacent et hypoténuse → CAH.",
    explanation:
      "Définition : le cosinus relie le côté adjacent et l’hypoténuse.\n\n" +
      "Méthode : on choisit le rapport qui utilise exactement ces deux côtés.\n\n" +
      "Calcul : adjacent et hypoténuse correspondent au cosinus.\n\n" +
      "Conclusion : il faut utiliser le cosinus.",
    tags: ["trigo_trigonometrie", "cosinus", "choix", "qcm"],
  },

  /* =========================
     TRIGO_SINUS (compléments)
  ========================= */

  {
    kind: "fixed",
    id: "3e_trigo_sinus_fixed_2_latex",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_sinus",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle égalité définit le sinus d’un angle aigu $\\theta$ ?",
    format: "qcm",
    choices: [
      "$\\sin(\\theta) = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$",
      "$\\sin(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$",
      "$\\sin(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}}$",
      "$\\sin(\\theta) = \\dfrac{\\text{hypoténuse}}{\\text{opposé}}$",
    ],
    expected: ["$\\sin(\\theta) = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$"],
    comparator: "mcq_exact",
    hint: "« SOH » : Sinus, Opposé, Hypoténuse.",
    explanation:
      "Définition : le sinus relie le côté opposé et l’hypoténuse.\n\n" +
      "Méthode : moyen mnémotechnique « SOH ».\n\n" +
      "Calcul : $\\sin(\\theta) = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$.\n\n" +
      "Conclusion : c’est la première égalité.",
    canvas: triangleTrigoCanvas({ angleAt: "B" }),
    tags: ["trigo_trigonometrie", "sinus", "formule", "qcm"],
  },

  {
    kind: "template",
    id: "3e_trigo_sinus_tpl_2_oppose_entier",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_sinus",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\text{opposé} = \\text{hypoténuse} \\times \\sin(\\theta)$, et $\\sin(30^\\circ) = 0{,}5$.",
    tags: ["trigo_trigonometrie", "sinus", "longueur", "canvas", "template"],
    generate: () => {
      const hyp = randomChoice([8, 10, 12, 14, 16]);
      const opp = hyp / 2; // sin 30° = 0,5
      return {
        text: `Dans un triangle rectangle, l’hypoténuse mesure ${hyp} cm et l’angle étudié vaut $30^\\circ$. Calcule le côté opposé (en cm).`,
        format: "short",
        expected: [String(opp), String(opp).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : $\\sin(\\theta) = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : $\\text{opposé} = \\text{hypoténuse} \\times \\sin(30^\\circ)$.\n\n` +
          `Calcul : $\\text{opposé} = ${hyp} \\times 0{,}5 = ${opp}$ cm.\n\n` +
          `Conclusion : le côté opposé mesure $${opp}$ cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: "30°",
          sideLabels: { BC: `${hyp} cm`, AC: "?", AB: "" },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_trigo_sinus_tpl_3_decimal",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_sinus",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\text{opposé} = \\text{hypoténuse} \\times \\sin(\\theta)$, au dixième.",
    tags: ["trigo_trigonometrie", "sinus", "longueur", "decimal", "canvas", "template"],
    generate: () => {
      const angle = randomChoice([25, 40, 55]);
      const hyp = randomChoice([10, 12, 15]);
      const opp = round1(hyp * Math.sin(degToRad(angle)));
      return {
        text: `Dans un triangle rectangle, l’hypoténuse mesure ${hyp} cm et l’angle étudié vaut $${angle}^\\circ$. Calcule le côté opposé au dixième près (en cm).`,
        format: "short",
        expected: [String(opp), String(opp).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : $\\sin(\\theta) = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : $\\text{opposé} = \\text{hypoténuse} \\times \\sin(\\theta)$.\n\n` +
          `Calcul : $\\text{opposé} = ${hyp} \\times \\sin(${angle}^\\circ) \\approx ${formatNumber(opp)}$ cm.\n\n` +
          `Conclusion : le côté opposé mesure environ $${formatNumber(opp)}$ cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: `${angle}°`,
          sideLabels: { BC: `${hyp} cm`, AC: "?", AB: "" },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_trigo_sinus_tpl_4_valeur",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_sinus",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\sin(\\theta) = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$.",
    tags: ["trigo_trigonometrie", "sinus", "valeur", "template"],
    generate: () => {
      const opp = randomChoice([3, 4, 6]);
      const hyp = randomChoice([5, 8, 10]);
      const correct = `$\\dfrac{${opp}}{${hyp}}$`;
      return {
        text: `Dans un triangle rectangle, le côté opposé à l’angle étudié mesure ${opp} cm et l’hypoténuse ${hyp} cm. Quelle est la valeur de $\\sin(\\theta)$ ?`,
        format: "qcm",
        choices: shuffle([correct, `$\\dfrac{${hyp}}{${opp}}$`, `$\\dfrac{${opp}}{${opp + hyp}}$`, `$\\dfrac{${hyp}}{${opp + hyp}}$`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : $\\sin(\\theta) = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : on place l’opposé au numérateur et l’hypoténuse au dénominateur.\n\n` +
          `Calcul : $\\sin(\\theta) = \\dfrac{${opp}}{${hyp}}$.\n\n` +
          `Conclusion : $\\sin(\\theta) = \\dfrac{${opp}}{${hyp}}$.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          sideLabels: { AC: `${opp} cm`, BC: `${hyp} cm`, AB: "" },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_sinus_fixed_3_choix",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_sinus",
    difficulty: 4,
    theme: "neutral",
    text: "On connaît l’hypoténuse et on cherche le côté opposé à l’angle donné. Quel rapport faut-il utiliser ?",
    format: "qcm",
    choices: ["le sinus", "le cosinus", "la tangente", "le théorème de Thalès"],
    expected: ["le sinus"],
    comparator: "mcq_exact",
    hint: "Opposé et hypoténuse → SOH.",
    explanation:
      "Définition : le sinus relie le côté opposé et l’hypoténuse.\n\n" +
      "Méthode : on choisit le rapport utilisant ces deux côtés.\n\n" +
      "Calcul : opposé et hypoténuse correspondent au sinus.\n\n" +
      "Conclusion : il faut utiliser le sinus.",
    tags: ["trigo_trigonometrie", "sinus", "choix", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_trigo_sinus_fixed_4_complementaire",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_sinus",
    difficulty: 4,
    theme: "neutral",
    text: "Sachant que $\\sin(30^\\circ) = 0{,}5$, que vaut $\\cos(60^\\circ)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$1$", "$0$", "$0{,}87$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "Dans un triangle rectangle, $\\sin(\\theta) = \\cos(90^\\circ - \\theta)$.",
    explanation:
      "Définition : pour deux angles complémentaires, le sinus de l’un est égal au cosinus de l’autre.\n\n" +
      "Méthode : $60^\\circ$ et $30^\\circ$ sont complémentaires.\n\n" +
      "Calcul : $\\cos(60^\\circ) = \\sin(30^\\circ) = 0{,}5$.\n\n" +
      "Conclusion : $\\cos(60^\\circ) = 0{,}5$.",
    tags: ["trigo_trigonometrie", "sinus", "complementaire", "qcm"],
  },

  /* =========================
     TRIGO_TANGENTE (compléments)
  ========================= */

  {
    kind: "fixed",
    id: "3e_trigo_tangente_fixed_2_latex",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_tangente",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle égalité définit la tangente d’un angle aigu $\\theta$ ?",
    format: "qcm",
    choices: [
      "$\\tan(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}}$",
      "$\\tan(\\theta) = \\dfrac{\\text{adjacent}}{\\text{opposé}}$",
      "$\\tan(\\theta) = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$",
      "$\\tan(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$",
    ],
    expected: ["$\\tan(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}}$"],
    comparator: "mcq_exact",
    hint: "« TOA » : Tangente, Opposé, Adjacent.",
    explanation:
      "Définition : la tangente relie le côté opposé et le côté adjacent.\n\n" +
      "Méthode : moyen mnémotechnique « TOA ».\n\n" +
      "Calcul : $\\tan(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}}$.\n\n" +
      "Conclusion : c’est la première égalité.",
    canvas: triangleTrigoCanvas({ angleAt: "B" }),
    tags: ["trigo_trigonometrie", "tangente", "formule", "qcm"],
  },

  {
    kind: "template",
    id: "3e_trigo_tangente_tpl_2_oppose",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_tangente",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\text{opposé} = \\text{adjacent} \\times \\tan(\\theta)$, et $\\tan(45^\\circ) = 1$.",
    tags: ["trigo_trigonometrie", "tangente", "longueur", "canvas", "template"],
    generate: () => {
      const adj = randomChoice([5, 6, 7, 8, 9]);
      const opp = adj; // tan 45° = 1
      return {
        text: `Dans un triangle rectangle, le côté adjacent à un angle de $45^\\circ$ mesure ${adj} cm. Calcule le côté opposé (en cm).`,
        format: "short",
        expected: [String(opp)],
        comparator: "number_equal",
        explanation:
          `Définition : $\\tan(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}}$.\n\n` +
          `Méthode : $\\text{opposé} = \\text{adjacent} \\times \\tan(45^\\circ)$.\n\n` +
          `Calcul : $\\text{opposé} = ${adj} \\times 1 = ${opp}$ cm.\n\n` +
          `Conclusion : le côté opposé mesure $${opp}$ cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: "45°",
          sideLabels: { AB: `${adj} cm`, AC: "?", BC: "" },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_trigo_tangente_tpl_3_decimal",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_tangente",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\text{opposé} = \\text{adjacent} \\times \\tan(\\theta)$, au dixième.",
    tags: ["trigo_trigonometrie", "tangente", "longueur", "decimal", "canvas", "template"],
    generate: () => {
      const angle = randomChoice([30, 35, 50, 55]);
      const adj = randomChoice([6, 8, 10, 12]);
      const opp = round1(adj * Math.tan(degToRad(angle)));
      return {
        text: `Dans un triangle rectangle, le côté adjacent à un angle de $${angle}^\\circ$ mesure ${adj} cm. Calcule le côté opposé au dixième près (en cm).`,
        format: "short",
        expected: [String(opp), String(opp).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : $\\tan(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}}$.\n\n` +
          `Méthode : $\\text{opposé} = \\text{adjacent} \\times \\tan(\\theta)$.\n\n` +
          `Calcul : $\\text{opposé} = ${adj} \\times \\tan(${angle}^\\circ) \\approx ${formatNumber(opp)}$ cm.\n\n` +
          `Conclusion : le côté opposé mesure environ $${formatNumber(opp)}$ cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: `${angle}°`,
          sideLabels: { AB: `${adj} cm`, AC: "?", BC: "" },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_trigo_tangente_tpl_4_valeur",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_tangente",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\tan(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}}$.",
    tags: ["trigo_trigonometrie", "tangente", "valeur", "template"],
    generate: () => {
      const opp = randomChoice([3, 4, 6]);
      // Opposé et adjacent doivent différer : à 4 et 4, le piège « on a inversé
      // la fraction » s'écrit comme la bonne réponse, et les deux autres
      // pièges deviennent identiques entre eux.
      const adj = randomChoice([4, 5, 8].filter((v) => v !== opp));
      const correct = `$\\dfrac{${opp}}{${adj}}$`;
      return {
        text: `Dans un triangle rectangle, le côté opposé à l’angle étudié mesure ${opp} cm et le côté adjacent ${adj} cm. Quelle est la valeur de $\\tan(\\theta)$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$\\dfrac{${adj}}{${opp}}$`,
          `$\\dfrac{${opp}}{${opp + adj}}$`,
          `$\\dfrac{${adj}}{${opp + adj}}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : $\\tan(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}}$.\n\n` +
          `Méthode : on place l’opposé au numérateur et l’adjacent au dénominateur.\n\n` +
          `Calcul : $\\tan(\\theta) = \\dfrac{${opp}}{${adj}}$.\n\n` +
          `Conclusion : $\\tan(\\theta) = \\dfrac{${opp}}{${adj}}$.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          sideLabels: { AC: `${opp} cm`, AB: `${adj} cm`, BC: "" },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_tangente_fixed_3_choix",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_tangente",
    difficulty: 4,
    theme: "neutral",
    text: "On connaît le côté opposé et le côté adjacent (mais pas l’hypoténuse). Quel rapport relie ces deux côtés ?",
    format: "qcm",
    choices: ["la tangente", "le sinus", "le cosinus", "le théorème de Pythagore"],
    expected: ["la tangente"],
    comparator: "mcq_exact",
    hint: "Opposé et adjacent → TOA.",
    explanation:
      "Définition : la tangente relie le côté opposé et le côté adjacent.\n\n" +
      "Méthode : on choisit le rapport qui n’utilise pas l’hypoténuse.\n\n" +
      "Calcul : opposé et adjacent correspondent à la tangente.\n\n" +
      "Conclusion : il faut utiliser la tangente.",
    tags: ["trigo_trigonometrie", "tangente", "choix", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_trigo_tangente_fixed_4_45",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_tangente",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $\\tan(45^\\circ)$ ?",
    format: "qcm",
    choices: ["$1$", "$0{,}5$", "$0$", "$2$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Dans un triangle rectangle isocèle, opposé $=$ adjacent.",
    explanation:
      "Définition : $\\tan(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}}$.\n\n" +
      "Méthode : pour $45^\\circ$, le triangle rectangle est isocèle, donc opposé $=$ adjacent.\n\n" +
      "Calcul : $\\tan(45^\\circ) = \\dfrac{\\text{opposé}}{\\text{adjacent}} = 1$.\n\n" +
      "Conclusion : $\\tan(45^\\circ) = 1$.",
    tags: ["trigo_trigonometrie", "tangente", "valeur_remarquable", "qcm"],
  },

  /* =========================
     TRIGO_CALCULER_LONGUEUR (compléments)
  ========================= */

  {
    kind: "template",
    id: "3e_trigo_calculer_longueur_tpl_2_cos",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Adjacent et hypoténuse connus/cherchés → cosinus.",
    tags: ["trigo_trigonometrie", "calcul_longueur", "cosinus", "canvas", "template"],
    generate: () => {
      const hyp = randomChoice([8, 10, 12, 16]);
      const adj = hyp / 2;
      return {
        text: `Dans un triangle rectangle, un angle vaut $60^\\circ$ et l’hypoténuse mesure ${hyp} cm. Calcule le côté adjacent (en cm).`,
        format: "short",
        expected: [String(adj), String(adj).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : on calcule une longueur dans un triangle rectangle.\n\n` +
          `Méthode : adjacent et hypoténuse → cosinus, donc $\\text{adjacent} = \\text{hyp} \\times \\cos(60^\\circ)$.\n\n` +
          `Calcul : $\\text{adjacent} = ${hyp} \\times 0{,}5 = ${adj}$ cm.\n\n` +
          `Conclusion : le côté adjacent mesure $${adj}$ cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: "60°",
          sideLabels: { BC: `${hyp} cm`, AB: "?", AC: "" },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_trigo_calculer_longueur_tpl_3_sin",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Opposé et hypoténuse connus/cherchés → sinus.",
    tags: ["trigo_trigonometrie", "calcul_longueur", "sinus", "canvas", "template"],
    generate: () => {
      const hyp = randomChoice([8, 10, 12, 14]);
      const opp = hyp / 2;
      return {
        text: `Dans un triangle rectangle, un angle vaut $30^\\circ$ et l’hypoténuse mesure ${hyp} cm. Calcule le côté opposé (en cm).`,
        format: "short",
        expected: [String(opp), String(opp).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : on calcule une longueur dans un triangle rectangle.\n\n` +
          `Méthode : opposé et hypoténuse → sinus, donc $\\text{opposé} = \\text{hyp} \\times \\sin(30^\\circ)$.\n\n` +
          `Calcul : $\\text{opposé} = ${hyp} \\times 0{,}5 = ${opp}$ cm.\n\n` +
          `Conclusion : le côté opposé mesure $${opp}$ cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: "30°",
          sideLabels: { BC: `${hyp} cm`, AC: "?", AB: "" },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_trigo_calculer_longueur_tpl_4_tan",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "Opposé et adjacent → tangente.",
    tags: ["trigo_trigonometrie", "calcul_longueur", "tangente", "canvas", "template"],
    generate: () => {
      const adj = randomChoice([5, 7, 9, 11]);
      const opp = adj; // tan 45° = 1
      return {
        text: `Dans un triangle rectangle, un angle vaut $45^\\circ$ et le côté adjacent mesure ${adj} cm. Calcule le côté opposé (en cm).`,
        format: "short",
        expected: [String(opp)],
        comparator: "number_equal",
        explanation:
          `Définition : on calcule une longueur dans un triangle rectangle.\n\n` +
          `Méthode : opposé et adjacent → tangente, donc $\\text{opposé} = \\text{adjacent} \\times \\tan(45^\\circ)$.\n\n` +
          `Calcul : $\\text{opposé} = ${adj} \\times 1 = ${opp}$ cm.\n\n` +
          `Conclusion : le côté opposé mesure $${opp}$ cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: "45°",
          sideLabels: { AB: `${adj} cm`, AC: "?", BC: "" },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_calculer_longueur_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer une longueur avec $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ et trouver l’adjacent, quelle formule isole l’adjacent ?",
    format: "qcm",
    choices: [
      "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$",
      "$\\text{adjacent} = \\dfrac{\\text{hypoténuse}}{\\cos(\\theta)}$",
      "$\\text{adjacent} = \\cos(\\theta) - \\text{hypoténuse}$",
      "$\\text{adjacent} = \\text{hypoténuse} + \\cos(\\theta)$",
    ],
    expected: ["$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$"],
    comparator: "mcq_exact",
    hint: "On multiplie les deux membres par l’hypoténuse.",
    explanation:
      "Définition : on isole la longueur cherchée dans la formule.\n\n" +
      "Méthode : on multiplie les deux côtés de $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ par l’hypoténuse.\n\n" +
      "Calcul : on obtient $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$.\n\n" +
      "Conclusion : c’est la première formule.",
    tags: ["trigo_trigonometrie", "calcul_longueur", "isoler", "qcm"],
  },

  {
    kind: "template",
    id: "3e_trigo_calculer_longueur_tpl_5_hyp",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\text{hypoténuse} = \\dfrac{\\text{opposé}}{\\sin(\\theta)}$, et $\\sin(30^\\circ) = 0{,}5$.",
    tags: ["trigo_trigonometrie", "calcul_longueur", "hypotenuse", "canvas", "template"],
    generate: () => {
      const opp = randomChoice([3, 4, 5, 6]);
      const hyp = opp * 2; // sin 30° = 0,5
      return {
        text: `Dans un triangle rectangle, un angle vaut $30^\\circ$ et le côté opposé mesure ${opp} cm. Calcule l’hypoténuse (en cm).`,
        format: "short",
        expected: [String(hyp)],
        comparator: "number_equal",
        explanation:
          `Définition : on cherche l’hypoténuse à partir de l’opposé et de l’angle.\n\n` +
          `Méthode : $\\sin(\\theta) = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$, donc $\\text{hypoténuse} = \\dfrac{\\text{opposé}}{\\sin(30^\\circ)}$.\n\n` +
          `Calcul : $\\text{hypoténuse} = \\dfrac{${opp}}{0{,}5} = ${hyp}$ cm.\n\n` +
          `Conclusion : l’hypoténuse mesure $${hyp}$ cm.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: "30°",
          sideLabels: { AC: `${opp} cm`, BC: "?", AB: "" },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_calculer_longueur_fixed_2_defi",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_longueur",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un triangle rectangle, l’hypoténuse mesure $10$ cm et un angle vaut $60^\\circ$. Combien mesure le côté adjacent à cet angle (en cm) ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$\\cos(60^\\circ) = 0{,}5$.",
    explanation:
      "Définition : adjacent et hypoténuse → cosinus.\n\n" +
      "Méthode : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(60^\\circ)$.\n\n" +
      "Calcul : $\\text{adjacent} = 10 \\times 0{,}5 = 5$ cm.\n\n" +
      "Conclusion : le côté adjacent mesure $5$ cm.",
    canvas: triangleTrigoCanvas({
      angleAt: "B",
      angleLabel: "60°",
      sideLabels: { BC: "10 cm", AB: "?", AC: "" },
    }),
    tags: ["trigo_trigonometrie", "calcul_longueur", "short"],
  },

  /* =========================
     TRIGO_CALCULER_ANGLE (compléments)
  ========================= */

  {
    kind: "template",
    id: "3e_trigo_calculer_angle_tpl_2_sides",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    hint: "Forme le bon rapport, puis utilise la fonction inverse.",
    tags: ["trigo_trigonometrie", "calcul_angle", "canvas", "template"],
    generate: () => {
      const data = randomChoice([
        { adj: 5, hyp: 10, ratio: "\\cos", angle: 60, labels: { AB: "5 cm", BC: "10 cm", AC: "" } },
        { opp: 5, hyp: 10, ratio: "\\sin", angle: 30, labels: { AC: "5 cm", BC: "10 cm", AB: "" } },
        { opp: 7, adj: 7, ratio: "\\tan", angle: 45, labels: { AC: "7 cm", AB: "7 cm", BC: "" } },
      ]);
      return {
        text: "Dans un triangle rectangle, à partir des longueurs indiquées sur la figure, calcule la mesure de l’angle marqué (en degrés).",
        format: "short",
        expected: [String(data.angle)],
        comparator: "number_equal",
        explanation:
          `Définition : pour trouver un angle, on calcule un rapport puis on utilise sa fonction inverse.\n\n` +
          `Méthode : on forme le rapport adapté aux côtés connus, puis on applique $${data.ratio}^{-1}$.\n\n` +
          `Calcul : le rapport donne un angle de $${data.angle}^\\circ$.\n\n` +
          `Conclusion : l’angle mesure $${data.angle}^\\circ$.`,
        canvas: triangleTrigoCanvas({
          angleAt: "B",
          angleLabel: "?",
          sideLabels: data.labels,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_trigo_calculer_angle_tpl_3_inverse",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise la fonction inverse correspondant au rapport donné.",
    tags: ["trigo_trigonometrie", "calcul_angle", "inverse", "template"],
    generate: () => {
      const data = randomChoice([
        { ratio: "\\cos", value: "0{,}5", angle: 60 },
        { ratio: "\\sin", value: "0{,}5", angle: 30 },
        { ratio: "\\tan", value: "1", angle: 45 },
      ]);
      return {
        text: `Dans un triangle rectangle, on a trouvé $${data.ratio}(\\theta) = ${data.value}$. Calcule l’angle $\\theta$ (en degrés).`,
        format: "short",
        expected: [String(data.angle)],
        comparator: "number_equal",
        explanation:
          `Définition : pour retrouver un angle, on utilise la fonction inverse du rapport.\n\n` +
          `Méthode : $\\theta = ${data.ratio}^{-1}(${data.value})$.\n\n` +
          `Calcul : $\\theta = ${data.angle}^\\circ$.\n\n` +
          `Conclusion : l’angle mesure $${data.angle}^\\circ$.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_calculer_angle_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_angle",
    difficulty: 3,
    theme: "neutral",
    text: "On connaît le côté opposé et l’hypoténuse, et on cherche l’angle. Quelle fonction inverse utiliser ?",
    format: "qcm",
    choices: ["$\\sin^{-1}$", "$\\cos^{-1}$", "$\\tan^{-1}$", "$\\sqrt{\\ }$"],
    expected: ["$\\sin^{-1}$"],
    comparator: "mcq_exact",
    hint: "Opposé et hypoténuse → sinus.",
    explanation:
      "Définition : on choisit la fonction inverse du rapport adapté aux côtés connus.\n\n" +
      "Méthode : opposé et hypoténuse correspondent au sinus.\n\n" +
      "Calcul : on utilise donc $\\sin^{-1}$.\n\n" +
      "Conclusion : il faut utiliser $\\sin^{-1}$.",
    tags: ["trigo_trigonometrie", "calcul_angle", "inverse", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_trigo_calculer_angle_qcm_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle rectangle, le côté adjacent à l’angle $\\theta$ mesure $5$ cm et l’hypoténuse $10$ cm. Combien vaut $\\theta$ ?",
    format: "qcm",
    choices: ["$60^\\circ$", "$30^\\circ$", "$45^\\circ$", "$50^\\circ$"],
    expected: ["$60^\\circ$"],
    comparator: "mcq_exact",
    hint: "$\\cos(\\theta) = \\dfrac{5}{10} = 0{,}5$.",
    explanation:
      "Définition : adjacent et hypoténuse → cosinus.\n\n" +
      "Méthode : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}} = \\dfrac{5}{10} = 0{,}5$.\n\n" +
      "Calcul : $\\theta = \\cos^{-1}(0{,}5) = 60^\\circ$.\n\n" +
      "Conclusion : $\\theta = 60^\\circ$.",
    canvas: triangleTrigoCanvas({
      angleAt: "B",
      angleLabel: "?",
      sideLabels: { AB: "5 cm", BC: "10 cm", AC: "" },
    }),
    tags: ["trigo_trigonometrie", "calcul_angle", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_trigo_calculer_angle_fixed_2_tan45",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle rectangle, le côté opposé et le côté adjacent à l’angle $\\theta$ sont égaux. Combien vaut $\\theta$ ?",
    format: "short",
    expected: ["45"],
    comparator: "number_equal",
    hint: "$\\tan(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}} = 1$.",
    explanation:
      "Définition : opposé et adjacent → tangente.\n\n" +
      "Méthode : si opposé $=$ adjacent, alors $\\tan(\\theta) = 1$.\n\n" +
      "Calcul : $\\theta = \\tan^{-1}(1) = 45^\\circ$.\n\n" +
      "Conclusion : $\\theta = 45^\\circ$.",
    tags: ["trigo_trigonometrie", "calcul_angle", "short"],
  },

  {
    kind: "template",
    id: "3e_trigo_calculer_angle_tpl_4_complementaire",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_calculer_angle",
    difficulty: 5,
    theme: "neutral",
    hint: "Les deux angles aigus d’un triangle rectangle ont une somme de $90^\\circ$.",
    tags: ["trigo_trigonometrie", "calcul_angle", "complementaire", "template"],
    generate: () => {
      const a = randomChoice([25, 35, 40, 55, 65]);
      const b = 90 - a;
      return {
        text: `Dans un triangle rectangle, un angle aigu mesure $${a}^\\circ$. Quelle est la mesure de l’autre angle aigu (en degrés) ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation:
          `Définition : les deux angles aigus d’un triangle rectangle sont complémentaires.\n\n` +
          `Méthode : on calcule $90 - ${a}$.\n\n` +
          `Calcul : $90 - ${a} = ${b}$.\n\n` +
          `Conclusion : l’autre angle aigu mesure $${b}^\\circ$.`,
      };
    },
  },

  /* =========================
     TRIGO_CHOISIR_RAPPORT (compléments)
  ========================= */

  {
    kind: "fixed",
    id: "3e_trigo_choisir_rapport_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_choisir_rapport",
    difficulty: 3,
    theme: "neutral",
    text: "On cherche un angle et on connaît le côté opposé et le côté adjacent. Quel rapport utiliser ?",
    format: "qcm",
    choices: ["la tangente", "le sinus", "le cosinus", "Pythagore"],
    expected: ["la tangente"],
    comparator: "mcq_exact",
    hint: "Opposé et adjacent, sans hypoténuse → TOA.",
    explanation:
      "Définition : chaque rapport relie deux côtés précis.\n\n" +
      "Méthode : opposé et adjacent correspondent à la tangente.\n\n" +
      "Calcul : $\\tan(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}}$.\n\n" +
      "Conclusion : il faut utiliser la tangente.",
    tags: ["trigo_trigonometrie", "choisir_ratio", "qcm"],
  },

  {
    kind: "template",
    id: "3e_trigo_choisir_rapport_tpl_2_cherche",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_choisir_rapport",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde le côté connu et le côté cherché par rapport à l’angle.",
    tags: ["trigo_trigonometrie", "choisir_ratio", "canvas", "template"],
    generate: () => {
      const item = randomChoice([
        { connu: "l’hypoténuse", cherche: "le côté adjacent", correct: "cosinus" },
        { connu: "l’hypoténuse", cherche: "le côté opposé", correct: "sinus" },
        { connu: "le côté adjacent", cherche: "le côté opposé", correct: "tangente" },
        { connu: "le côté opposé", cherche: "le côté adjacent", correct: "tangente" },
      ]);
      return {
        text: `On connaît ${item.connu} et on cherche ${item.cherche} (par rapport à l’angle étudié). Quel rapport faut-il utiliser ?`,
        format: "qcm",
        choices: shuffle(["sinus", "cosinus", "tangente", "Pythagore"]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : on choisit le rapport reliant le côté connu et le côté cherché.\n\n` +
          `Méthode : on identifie les deux côtés en jeu : ${item.connu} et ${item.cherche}.\n\n` +
          `Calcul : ces deux côtés correspondent au ${item.correct}.\n\n` +
          `Conclusion : il faut utiliser le ${item.correct}.`,
        canvas: triangleTrigoCanvas({ angleAt: "B" }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_choisir_rapport_qcm_2_angle",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_choisir_rapport",
    difficulty: 4,
    theme: "neutral",
    text: "On veut calculer un angle à partir de l’hypoténuse et du côté opposé. Quel rapport (et quelle fonction inverse) utiliser ?",
    format: "qcm",
    choices: [
      "le sinus, puis $\\sin^{-1}$",
      "le cosinus, puis $\\cos^{-1}$",
      "la tangente, puis $\\tan^{-1}$",
      "Pythagore",
    ],
    expected: ["le sinus, puis $\\sin^{-1}$"],
    comparator: "mcq_exact",
    hint: "Opposé et hypoténuse → sinus.",
    explanation:
      "Définition : on choisit le rapport adapté aux côtés connus, puis sa fonction inverse.\n\n" +
      "Méthode : opposé et hypoténuse correspondent au sinus.\n\n" +
      "Calcul : on calcule $\\sin(\\theta)$ puis $\\theta = \\sin^{-1}(\\dots)$.\n\n" +
      "Conclusion : on utilise le sinus, puis $\\sin^{-1}$.",
    tags: ["trigo_trigonometrie", "choisir_ratio", "angle", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_trigo_choisir_rapport_qcm_3_pythagore",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_choisir_rapport",
    difficulty: 4,
    theme: "neutral",
    text: "On connaît deux côtés et on cherche le troisième côté (aucun angle en jeu). Que vaut-il mieux utiliser ?",
    format: "qcm",
    choices: [
      "le théorème de Pythagore",
      "le sinus",
      "le cosinus",
      "la tangente",
    ],
    expected: ["le théorème de Pythagore"],
    comparator: "mcq_exact",
    hint: "Sans angle, la trigonométrie n’est pas nécessaire.",
    explanation:
      "Définition : la trigonométrie relie des longueurs à un angle.\n\n" +
      "Méthode : si aucun angle n’intervient, on utilise plutôt Pythagore.\n\n" +
      "Calcul : Pythagore relie les trois côtés d’un triangle rectangle.\n\n" +
      "Conclusion : ici, on utilise le théorème de Pythagore.",
    tags: ["trigo_trigonometrie", "choisir_ratio", "pythagore", "qcm"],
  },

  {
    kind: "template",
    id: "3e_trigo_choisir_rapport_tpl_3_contexte",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_choisir_rapport",
    difficulty: 5,
    theme: "reunion",
    hint: "Identifie les côtés (hauteur, distance, longueur en pente) par rapport à l’angle.",
    tags: ["trigo_trigonometrie", "choisir_ratio", "reunion", "template"],
    generate: () => {
      const item = randomChoice([
        {
          situation: "on connaît la distance au pied d’un mât (adjacent) et l’angle, et on cherche sa hauteur (opposé)",
          correct: "tangente",
        },
        {
          situation: "on connaît la longueur d’une rampe (hypoténuse) et l’angle, et on cherche la hauteur (opposé)",
          correct: "sinus",
        },
        {
          situation: "on connaît la longueur d’un câble (hypoténuse) et l’angle, et on cherche la distance horizontale (adjacent)",
          correct: "cosinus",
        },
      ]);
      return {
        text: `Dans un problème, ${item.situation}. Quel rapport trigonométrique faut-il utiliser ?`,
        format: "qcm",
        choices: shuffle(["sinus", "cosinus", "tangente", "Pythagore"]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : on choisit le rapport selon les côtés connus et cherchés par rapport à l’angle.\n\n` +
          `Méthode : on traduit la situation en termes d’opposé, adjacent et hypoténuse.\n\n` +
          `Calcul : la configuration décrite correspond au ${item.correct}.\n\n` +
          `Conclusion : il faut utiliser le ${item.correct}.`,
      };
    },
  },

  /* =========================
     TRIGO_DEFIS (compléments)
  ========================= */

  {
    kind: "template",
    id: "3e_trigo_defi_tpl_2_rampe",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La hauteur est le côté opposé, la rampe est l’hypoténuse → sinus.",
    tags: ["trigo_trigonometrie", "defi", "probleme", "template"],
    generate: () => {
      const hyp = randomChoice([6, 8, 10, 12]);
      const haut = hyp / 2; // sin 30° = 0,5
      return {
        text: `Une rampe d’accès de ${hyp} m fait un angle de $30^\\circ$ avec le sol. Quelle hauteur (en m) permet-elle d’atteindre ?`,
        format: "short",
        expected: [String(haut), String(haut).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : la hauteur est le côté opposé à l’angle, la rampe est l’hypoténuse.\n\n` +
          `Méthode : $\\text{hauteur} = \\text{rampe} \\times \\sin(30^\\circ)$.\n\n` +
          `Calcul : $\\text{hauteur} = ${hyp} \\times 0{,}5 = ${haut}$ m.\n\n` +
          `Conclusion : la rampe atteint une hauteur de $${haut}$ m.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_trigo_defi_tpl_3_angle_pente",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "$\\tan(\\theta) = \\dfrac{\\text{hauteur}}{\\text{distance}}$, puis $\\tan^{-1}$.",
    tags: ["trigo_trigonometrie", "defi", "angle", "reunion", "template"],
    generate: () => {
      const data = randomChoice([
        { h: 5, d: 5, angle: 45 },
        { h: 10, d: 10, angle: 45 },
      ]);
      return {
        text: `Sur un sentier de La Réunion, on monte de ${data.h} m sur une distance horizontale de ${data.d} m. Quel est l’angle de la pente avec l’horizontale (en degrés) ?`,
        format: "short",
        expected: [String(data.angle)],
        comparator: "number_equal",
        explanation:
          `Définition : la pente forme un triangle rectangle dont la hauteur est l’opposé et la distance horizontale l’adjacent.\n\n` +
          `Méthode : $\\tan(\\theta) = \\dfrac{\\text{hauteur}}{\\text{distance}}$, puis $\\theta = \\tan^{-1}(\\dots)$.\n\n` +
          `Calcul : $\\tan(\\theta) = \\dfrac{${data.h}}{${data.d}} = 1$, donc $\\theta = 45^\\circ$.\n\n` +
          `Conclusion : la pente fait un angle de $${data.angle}^\\circ$.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_trigo_defi_fixed_2_brevet",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Type brevet : dans un triangle rectangle, l’hypoténuse mesure $10$ cm et le côté opposé à un angle $\\theta$ mesure $5$ cm. Combien vaut $\\theta$ ?",
    format: "qcm",
    choices: ["$30^\\circ$", "$60^\\circ$", "$45^\\circ$", "$50^\\circ$"],
    expected: ["$30^\\circ$"],
    comparator: "mcq_exact",
    hint: "$\\sin(\\theta) = \\dfrac{5}{10} = 0{,}5$.",
    explanation:
      "Définition : opposé et hypoténuse → sinus.\n\n" +
      "Méthode : $\\sin(\\theta) = \\dfrac{\\text{opposé}}{\\text{hypoténuse}} = \\dfrac{5}{10} = 0{,}5$.\n\n" +
      "Calcul : $\\theta = \\sin^{-1}(0{,}5) = 30^\\circ$.\n\n" +
      "Conclusion : $\\theta = 30^\\circ$.",
    canvas: triangleTrigoCanvas({
      angleAt: "B",
      angleLabel: "?",
      sideLabels: { AC: "5 cm", BC: "10 cm", AB: "" },
    }),
    tags: ["trigo_trigonometrie", "defi", "brevet", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_trigo_defi_fixed_3_combiner_pythagore",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On connaît les deux côtés de l’angle droit et on veut l’angle $\\theta$. Quelle démarche est correcte ?",
    format: "qcm",
    choices: [
      "calculer $\\tan(\\theta)$ avec opposé et adjacent, puis $\\tan^{-1}$",
      "utiliser directement $\\cos^{-1}$ de l’hypoténuse",
      "additionner les deux côtés",
      "diviser $90^\\circ$ par $2$",
    ],
    expected: ["calculer $\\tan(\\theta)$ avec opposé et adjacent, puis $\\tan^{-1}$"],
    comparator: "mcq_exact",
    hint: "Les deux côtés de l’angle droit sont l’opposé et l’adjacent.",
    explanation:
      "Définition : les deux côtés de l’angle droit sont l’opposé et l’adjacent de l’angle aigu.\n\n" +
      "Méthode : on forme $\\tan(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}}$, puis on applique $\\tan^{-1}$.\n\n" +
      "Calcul : cette démarche donne directement l’angle.\n\n" +
      "Conclusion : on calcule $\\tan(\\theta)$ puis $\\tan^{-1}$.",
    tags: ["trigo_trigonometrie", "defi", "methode", "qcm"],
  },

  /* ===== TRIGO_CHOISIR_RAPPORT (compléments) ===== */
  {
    kind: "fixed",
    id: "3e_trigo_choisir_rapport_qcm_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_choisir_rapport",
    difficulty: 3,
    theme: "neutral",
    text: "On connaît l’hypoténuse et le côté adjacent à l’angle. Quel rapport faut-il utiliser ?",
    format: "qcm",
    choices: ["le cosinus", "le sinus", "la tangente", "Pythagore"],
    expected: ["le cosinus"],
    comparator: "mcq_exact",
    hint: "Adjacent et hypoténuse → CAH.",
    explanation:
      "Définition : le cosinus relie l’adjacent et l’hypoténuse.\n\n" +
      "Méthode : on choisit le rapport correspondant aux deux côtés.\n\n" +
      "Calcul : adjacent et hypoténuse → cosinus.\n\n" +
      "Conclusion : on utilise le cosinus.",
    tags: ["trigo_trigonometrie", "choisir_ratio", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_trigo_choisir_rapport_qcm_x2",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_choisir_rapport",
    difficulty: 3,
    theme: "neutral",
    text: "On connaît l’hypoténuse et le côté opposé à l’angle. Quel rapport faut-il utiliser ?",
    format: "qcm",
    choices: ["le sinus", "le cosinus", "la tangente", "Thalès"],
    expected: ["le sinus"],
    comparator: "mcq_exact",
    hint: "Opposé et hypoténuse → SOH.",
    explanation:
      "Définition : le sinus relie l’opposé et l’hypoténuse.\n\n" +
      "Méthode : on choisit le rapport correspondant aux deux côtés.\n\n" +
      "Calcul : opposé et hypoténuse → sinus.\n\n" +
      "Conclusion : on utilise le sinus.",
    tags: ["trigo_trigonometrie", "choisir_ratio", "qcm"],
  },
  {
    kind: "template",
    id: "3e_trigo_choisir_rapport_tpl_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_choisir_rapport",
    difficulty: 4,
    theme: "neutral",
    hint: "Identifie les deux côtés en jeu par rapport à l’angle.",
    tags: ["trigo_trigonometrie", "choisir_ratio", "template"],
    generate: () => {
      const item = randomChoice([
        { cotes: "le côté opposé et le côté adjacent", correct: "tangente" },
        { cotes: "l’hypoténuse et le côté adjacent", correct: "cosinus" },
        { cotes: "l’hypoténuse et le côté opposé", correct: "sinus" },
      ]);
      return {
        text: `On utilise ${item.cotes}. Quel rapport faut-il choisir ?`,
        format: "qcm",
        choices: shuffle(["sinus", "cosinus", "tangente", "Pythagore"]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : chaque rapport relie deux côtés précis.\n\n` +
          `Méthode : on repère les deux côtés en jeu.\n\n` +
          `Calcul : ${item.cotes} → ${item.correct}.\n\n` +
          `Conclusion : on utilise le ${item.correct}.`,
      };
    },
  },

  /* ===== TRIGO_DEFI (compléments) ===== */
  {
    kind: "template",
    id: "3e_trigo_defi_tpl_x1_hauteur",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La hauteur est l’opposé, on utilise le sinus avec l’hypoténuse.",
    tags: ["trigo_trigonometrie", "defi", "probleme", "template"],
    generate: () => {
      const hyp = randomChoice([6, 8, 10, 12]);
      const haut = hyp / 2;
      return {
        text: `Un toboggan de $${hyp}$ m fait un angle de $30^\\circ$ avec le sol. Quelle hauteur (en m) atteint-il ?`,
        format: "short",
        expected: [String(haut), String(haut).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : la hauteur est le côté opposé à l’angle.\n\n` +
          `Méthode : $\\text{hauteur} = \\text{hypoténuse} \\times \\sin(30^\\circ)$.\n\n` +
          `Calcul : $${hyp} \\times 0{,}5 = ${haut}$.\n\n` +
          `Conclusion : la hauteur est $${haut}$ m.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_trigo_defi_qcm_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour calculer une longueur quand on connaît un angle et un autre côté, on utilise…",
    format: "qcm",
    choices: ["la trigonométrie (sin, cos ou tan)", "uniquement Pythagore", "la proportionnalité", "la moyenne"],
    expected: ["la trigonométrie (sin, cos ou tan)"],
    comparator: "mcq_exact",
    hint: "Un angle intervient.",
    explanation:
      "Définition : la trigonométrie relie un angle aigu et deux côtés.\n\n" +
      "Méthode : quand un angle est connu, on choisit sin, cos ou tan.\n\n" +
      "Calcul : Pythagore ne fait pas intervenir d’angle.\n\n" +
      "Conclusion : on utilise la trigonométrie.",
    tags: ["trigo_trigonometrie", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_trigo_defi_fixed_x1_angle",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigo_trigonometrie",
    microId: "trigo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un triangle rectangle, l’hypoténuse mesure $10$ cm et le côté adjacent à l’angle $\\theta$ mesure $5$ cm. Combien vaut $\\theta$ (en degrés) ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "$\\cos(\\theta) = \\dfrac{5}{10} = 0{,}5$.",
    explanation:
      "Définition : adjacent et hypoténuse → cosinus.\n\n" +
      "Méthode : $\\cos(\\theta) = \\dfrac{5}{10} = 0{,}5$.\n\n" +
      "Calcul : $\\theta = \\cos^{-1}(0{,}5) = 60^\\circ$.\n\n" +
      "Conclusion : $\\theta = 60^\\circ$.",
    tags: ["trigo_trigonometrie", "defi", "short"],
  },
];