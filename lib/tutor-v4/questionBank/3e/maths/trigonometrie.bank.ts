// lib/tutor-v4/question-banks/maths/3e/trigonometrie.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

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
    notionId: "trigonometrie",
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
    tags: ["trigonometrie", "triangle_rectangle", "hypotenuse", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_trigo_triangle_rectangle_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigonometrie",
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
    tags: ["trigonometrie", "oppose", "triangle_rectangle", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "3e_trigo_triangle_rectangle_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trigo_triangle_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère l’angle étudié, puis classe les côtés.",
    tags: ["trigonometrie", "cotes", "template", "canvas"],
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
    notionId: "trigonometrie",
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
    tags: ["trigonometrie", "open", "raisonnement"],
  },

  /* =========================
     TRIGO_COSINUS
  ========================= */

  {
    kind: "fixed",
    id: "3e_trigo_cosinus_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigonometrie",
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
    tags: ["trigonometrie", "cosinus", "formule", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "3e_trigo_cosinus_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trigo_cosinus",
    difficulty: 3,
    theme: "neutral",
    hint: "Cosinus = adjacent ÷ hypoténuse.",
    tags: ["trigonometrie", "cosinus", "template", "longueur"],
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
    notionId: "trigonometrie",
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
    tags: ["trigonometrie", "sinus", "formule", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "3e_trigo_sinus_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trigo_sinus",
    difficulty: 3,
    theme: "neutral",
    hint: "Sinus = opposé ÷ hypoténuse.",
    tags: ["trigonometrie", "sinus", "template", "longueur"],
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
    notionId: "trigonometrie",
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
    tags: ["trigonometrie", "tangente", "formule", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "3e_trigo_tangente_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trigo_tangente",
    difficulty: 3,
    theme: "neutral",
    hint: "Tangente = opposé ÷ adjacent.",
    tags: ["trigonometrie", "tangente", "template", "longueur"],
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
    notionId: "trigonometrie",
    microId: "trigo_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par repérer les côtés connus et le côté cherché.",
    tags: ["trigonometrie", "calcul_longueur", "template", "canvas"],
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
    notionId: "trigonometrie",
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
    tags: ["trigonometrie", "calcul_longueur", "open", "raisonnement"],
  },

  /* =========================
     TRIGO_CALCULER_ANGLE
  ========================= */

  {
    kind: "template",
    id: "3e_trigo_calculer_angle_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trigo_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour calculer un angle, on utilise cos⁻¹, sin⁻¹ ou tan⁻¹ à la calculatrice.",
    tags: ["trigonometrie", "calcul_angle", "template", "canvas"],
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
    notionId: "trigonometrie",
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
    tags: ["trigonometrie", "angle", "open", "calculatrice"],
  },

  /* =========================
     TRIGO_CHOISIR_RATIO
  ========================= */

  {
    kind: "template",
    id: "3e_trigo_choisir_ratio_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trigo_choisir_ratio",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde quels côtés sont connus ou cherchés.",
    tags: ["trigonometrie", "choisir_ratio", "template", "qcm"],
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
    id: "3e_trigo_choisir_ratio_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trigo_choisir_ratio",
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
    tags: ["trigonometrie", "choisir_ratio", "open", "methode"],
  },

  /* =========================
     TRIGO_DEFIS
  ========================= */

  {
    kind: "template",
    id: "3e_trigo_defis_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trigo_defis",
    difficulty: 5,
    theme: "reunion",
    hint: "Modélise la situation par un triangle rectangle.",
    tags: ["trigonometrie", "defi", "reunion", "template"],
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
    id: "3e_trigo_defis_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trigo_defis",
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
    tags: ["trigonometrie", "defi", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_trigo_defis_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trigo_defis",
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
    tags: ["trigonometrie", "defi", "open", "raisonnement"],
  },
];