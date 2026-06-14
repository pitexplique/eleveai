// lib/tutor-v4/question-banks/maths/4e/cosinus.bank.ts
//
// Notion : Cosinus dans le triangle rectangle (trigo_cosinus) — programme de 4e.
// Micro-compétences : cos_cotes, cos_definition, cos_calculer_longueur,
// cos_calculer_angle, cos_probleme, cos_defi.
//
// Conventions : LaTeX $...$, règle QCM (numérique -> short number_equal,
// expression -> qcm), helper explication Définition/Méthode/Calcul/Conclusion,
// canvas triangle rectangle (kind "triangle", angle droit en A).

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

// Triangle rectangle en A. Angle aigu étudié en B (par défaut).
// Adjacent à B : AB ; opposé à B : AC ; hypoténuse : BC.
function triangleCosCanvas(params?: {
  angleAt?: "B" | "C";
  sideLabels?: { AB?: string; AC?: string; BC?: string };
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
    labels: { A: "A", B: "B", C: "C" },
    sideLabels: params?.sideLabels ?? {
      AB: "adjacent",
      AC: "opposé",
      BC: "hypoténuse",
    },
    angleLabels:
      angleAt === "B"
        ? { B: params?.angleLabel ?? "θ" }
        : { C: params?.angleLabel ?? "θ" },
    marks: { rightAngleAt: "A" },
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

export const cosinusBank: TutorBankItemV4[] = [
  /* =========================
     COS_COTES
  ========================= */
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un triangle rectangle, le côté opposé à l’angle droit s’appelle…",
    format: "qcm",
    choices: ["l’hypoténuse", "le côté adjacent", "le côté opposé", "la hauteur"],
    expected: ["l’hypoténuse"],
    comparator: "mcq_exact",
    hint: "C’est le plus grand côté.",
    explanation:
      "Définition : l’hypoténuse est le côté opposé à l’angle droit.\n\n" +
      "Méthode : on repère l’angle droit, puis le côté en face.\n\n" +
      "Calcul : ce côté est aussi le plus long du triangle.\n\n" +
      "Conclusion : c’est l’hypoténuse.",
    canvas: triangleCosCanvas(),
    tags: ["trigo_cosinus", "cotes", "hypotenuse", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle rectangle en $A$, quel côté est adjacent à l’angle $\\widehat{B}$ ?",
    format: "qcm",
    choices: ["$[AB]$", "$[AC]$", "$[BC]$", "aucun"],
    expected: ["$[AB]$"],
    comparator: "mcq_exact",
    hint: "Le côté adjacent touche l’angle sans être l’hypoténuse.",
    explanation:
      "Définition : le côté adjacent à un angle touche cet angle sans être l’hypoténuse.\n\n" +
      "Méthode : on se place sur l’angle $\\widehat{B}$ et on écarte l’hypoténuse $[BC]$.\n\n" +
      "Calcul : le côté qui touche $B$ sans être $[BC]$ est $[AB]$.\n\n" +
      "Conclusion : le côté adjacent à $\\widehat{B}$ est $[AB]$.",
    canvas: triangleCosCanvas({ angleAt: "B" }),
    tags: ["trigo_cosinus", "cotes", "adjacent", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle rectangle en $A$, quel est le côté adjacent à l’angle $\\widehat{C}$ ?",
    format: "qcm",
    choices: ["$[AC]$", "$[AB]$", "$[BC]$", "aucun"],
    expected: ["$[AC]$"],
    comparator: "mcq_exact",
    hint: "Il touche l’angle $\\widehat{C}$ sans être l’hypoténuse.",
    explanation:
      "Définition : le côté adjacent à un angle touche cet angle sans être l’hypoténuse.\n\n" +
      "Méthode : on se place sur $\\widehat{C}$ et on écarte $[BC]$ (l’hypoténuse).\n\n" +
      "Calcul : le côté qui touche $C$ sans être $[BC]$ est $[AC]$.\n\n" +
      "Conclusion : le côté adjacent à $\\widehat{C}$ est $[AC]$.",
    canvas: triangleCosCanvas({ angleAt: "C" }),
    tags: ["trigo_cosinus", "cotes", "adjacent", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "4e_cos_cotes_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 3,
    theme: "neutral",
    hint: "Adjacent = touche l’angle ; hypoténuse = opposée à l’angle droit.",
    tags: ["trigo_cosinus", "cotes", "canvas", "template"],
    generate: () => {
      const angleAt = randomChoice<"B" | "C">(["B", "C"]);
      const adjacent = angleAt === "B" ? "$[AB]$" : "$[AC]$";
      return {
        text: `Dans le triangle rectangle en $A$, quel est le côté adjacent à l’angle $\\widehat{${angleAt}}$ ?`,
        format: "qcm",
        choices: shuffle(["$[AB]$", "$[AC]$", "$[BC]$"]),
        expected: [adjacent],
        comparator: "mcq_exact",
        explanation:
          `Définition : le côté adjacent touche l’angle sans être l’hypoténuse.\n\n` +
          `Méthode : on se place sur $\\widehat{${angleAt}}$ et on écarte l’hypoténuse $[BC]$.\n\n` +
          `Calcul : le côté adjacent est ${adjacent}.\n\n` +
          `Conclusion : le côté adjacent à $\\widehat{${angleAt}}$ est ${adjacent}.`,
        canvas: triangleCosCanvas({ angleAt }),
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_4_hyp",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 2,
    theme: "neutral",
    text: "L’hypoténuse d’un triangle rectangle est…",
    format: "qcm",
    choices: ["le plus long côté", "le plus court côté", "un côté de l’angle droit", "toujours vertical"],
    expected: ["le plus long côté"],
    comparator: "mcq_exact",
    hint: "Elle est en face de l’angle droit.",
    explanation:
      "Définition : l’hypoténuse est opposée à l’angle droit.\n\n" +
      "Méthode : on compare les longueurs des côtés.\n\n" +
      "Calcul : l’hypoténuse est toujours le plus long.\n\n" +
      "Conclusion : c’est le plus long côté.",
    tags: ["trigo_cosinus", "cotes", "hypotenuse", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_5_depend",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 3,
    theme: "neutral",
    text: "Le côté adjacent dépend-il de l’angle aigu que l’on choisit ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Change d’angle : le côté adjacent change.",
    explanation:
      "Définition : « adjacent » se définit par rapport à un angle.\n\n" +
      "Méthode : on change d’angle et on regarde le côté qui le touche.\n\n" +
      "Calcul : pour $\\widehat{B}$ l’adjacent est $[AB]$, pour $\\widehat{C}$ c’est $[AC]$.\n\n" +
      "Conclusion : oui, il dépend de l’angle choisi.",
    canvas: triangleCosCanvas(),
    tags: ["trigo_cosinus", "cotes", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_6_oppose",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle rectangle en $A$, quel côté est opposé à l’angle $\\widehat{B}$ ?",
    format: "qcm",
    choices: ["$[AC]$", "$[AB]$", "$[BC]$", "aucun"],
    expected: ["$[AC]$"],
    comparator: "mcq_exact",
    hint: "Le côté opposé est en face de l’angle.",
    explanation:
      "Définition : le côté opposé à un angle est celui qui lui fait face.\n\n" +
      "Méthode : on se place sur $\\widehat{B}$ et on cherche le côté en face.\n\n" +
      "Calcul : le côté en face de $B$ est $[AC]$.\n\n" +
      "Conclusion : le côté opposé à $\\widehat{B}$ est $[AC]$.",
    canvas: triangleCosCanvas({ angleAt: "B" }),
    tags: ["trigo_cosinus", "cotes", "oppose", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "4e_cos_cotes_tpl_2_hyp",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 2,
    theme: "neutral",
    hint: "L’hypoténuse est opposée à l’angle droit (en $A$).",
    tags: ["trigo_cosinus", "cotes", "canvas", "template"],
    generate: () => {
      return {
        text: "Dans le triangle rectangle en $A$, quel côté est l’hypoténuse ?",
        format: "qcm",
        choices: shuffle(["$[BC]$", "$[AB]$", "$[AC]$"]),
        expected: ["$[BC]$"],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’hypoténuse est opposée à l’angle droit.\n\n" +
          "Méthode : l’angle droit est en $A$, on cherche le côté en face.\n\n" +
          "Calcul : le côté opposé à $A$ est $[BC]$.\n\n" +
          "Conclusion : l’hypoténuse est $[BC]$.",
        canvas: triangleCosCanvas(),
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_7",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 1,
    theme: "neutral",
    text: "Les deux côtés qui forment l’angle droit s’appellent…",
    format: "qcm",
    choices: ["les côtés de l’angle droit", "les hypoténuses", "les diagonales", "les médianes"],
    expected: ["les côtés de l’angle droit"],
    comparator: "mcq_exact",
    hint: "Ils se rejoignent en formant l’angle droit.",
    explanation:
      "Définition : les deux côtés formant l’angle droit sont les côtés de l’angle droit.\n\n" +
      "Méthode : on repère les côtés qui se rejoignent en l’angle droit.\n\n" +
      "Calcul : ce sont les deux côtés autres que l’hypoténuse.\n\n" +
      "Conclusion : ce sont les côtés de l’angle droit.",
    tags: ["trigo_cosinus", "cotes", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_8_oppose_c",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle rectangle en $A$, quel côté est opposé à l’angle $\\widehat{C}$ ?",
    format: "qcm",
    choices: ["$[AB]$", "$[AC]$", "$[BC]$", "aucun"],
    expected: ["$[AB]$"],
    comparator: "mcq_exact",
    hint: "Le côté qui ne touche pas $C$ (et qui n’est pas l’hypoténuse).",
    explanation:
      "Définition : le côté opposé à un angle lui fait face.\n\n" +
      "Méthode : on se place sur $\\widehat{C}$ et on cherche le côté en face.\n\n" +
      "Calcul : le côté en face de $C$ est $[AB]$.\n\n" +
      "Conclusion : le côté opposé à $\\widehat{C}$ est $[AB]$.",
    canvas: triangleCosCanvas({ angleAt: "C" }),
    tags: ["trigo_cosinus", "cotes", "oppose", "qcm", "canvas"],
  },

  /* =========================
     COS_DEFINITION
  ========================= */
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle rectangle, le cosinus d’un angle aigu est égal à…",
    format: "qcm",
    choices: [
      "$\\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$",
      "$\\dfrac{\\text{côté opposé}}{\\text{hypoténuse}}$",
      "$\\dfrac{\\text{côté opposé}}{\\text{côté adjacent}}$",
      "$\\dfrac{\\text{hypoténuse}}{\\text{côté adjacent}}$",
    ],
    expected: ["$\\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$"],
    comparator: "mcq_exact",
    hint: "« CAH » : Cosinus = Adjacent / Hypoténuse.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on retient le moyen mnémotechnique « CAH ».\n\n" +
      "Calcul : le cosinus relie le côté adjacent et l’hypoténuse.\n\n" +
      "Conclusion : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.",
    canvas: triangleCosCanvas({ angleAt: "B" }),
    tags: ["trigo_cosinus", "definition", "formule", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_2_formule_b",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle rectangle en $A$, à quoi est égal $\\cos(\\widehat{B})$ ?",
    format: "qcm",
    choices: ["$\\dfrac{AB}{BC}$", "$\\dfrac{AC}{BC}$", "$\\dfrac{AB}{AC}$", "$\\dfrac{BC}{AB}$"],
    expected: ["$\\dfrac{AB}{BC}$"],
    comparator: "mcq_exact",
    hint: "Adjacent à $\\widehat{B}$ : $AB$ ; hypoténuse : $BC$.",
    explanation:
      "Définition : $\\cos(\\widehat{B}) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : l’adjacent à $\\widehat{B}$ est $AB$, l’hypoténuse est $BC$.\n\n" +
      "Calcul : $\\cos(\\widehat{B}) = \\dfrac{AB}{BC}$.\n\n" +
      "Conclusion : $\\cos(\\widehat{B}) = \\dfrac{AB}{BC}$.",
    canvas: triangleCosCanvas({ angleAt: "B" }),
    tags: ["trigo_cosinus", "definition", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_3_bornes",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Le cosinus d’un angle aigu est toujours un nombre…",
    format: "qcm",
    choices: ["compris entre $0$ et $1$", "supérieur à $1$", "négatif", "égal à l’angle"],
    expected: ["compris entre $0$ et $1$"],
    comparator: "mcq_exact",
    hint: "L’adjacent est plus court que l’hypoténuse.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on compare l’adjacent et l’hypoténuse.\n\n" +
      "Calcul : l’adjacent est toujours plus petit que l’hypoténuse, donc le quotient est entre $0$ et $1$.\n\n" +
      "Conclusion : le cosinus d’un angle aigu est compris entre $0$ et $1$.",
    tags: ["trigo_cosinus", "definition", "bornes", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_definition_tpl_1_valeur",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.",
    tags: ["trigo_cosinus", "definition", "valeur", "canvas", "template"],
    generate: () => {
      const adj = randomChoice([3, 4, 6]);
      const hyp = randomChoice([5, 8, 10]);
      const correct = `$\\dfrac{${adj}}{${hyp}}$`;
      return {
        text: `Dans un triangle rectangle, le côté adjacent à l’angle $\\theta$ mesure ${adj} cm et l’hypoténuse ${hyp} cm. Quelle est la valeur de $\\cos(\\theta)$ ?`,
        format: "qcm",
        choices: shuffle([correct, `$\\dfrac{${hyp}}{${adj}}$`, `$\\dfrac{${adj}}{${adj + hyp}}$`, `$\\dfrac{${hyp}}{${adj + hyp}}$`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : on place l’adjacent au numérateur et l’hypoténuse au dénominateur.\n\n` +
          `Calcul : $\\cos(\\theta) = \\dfrac{${adj}}{${hyp}}$.\n\n` +
          `Conclusion : $\\cos(\\theta) = \\dfrac{${adj}}{${hyp}}$.`,
        canvas: triangleCosCanvas({
          angleAt: "B",
          sideLabels: { AB: `${adj} cm`, BC: `${hyp} cm`, AC: "" },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_4_cah",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie le moyen mnémotechnique « CAH » pour le cosinus ?",
    format: "qcm",
    choices: [
      "Cosinus = Adjacent / Hypoténuse",
      "Cosinus = Aire / Hauteur",
      "Cosinus = Angle / Hypoténuse",
      "Cosinus = Adjacent / Hauteur",
    ],
    expected: ["Cosinus = Adjacent / Hypoténuse"],
    comparator: "mcq_exact",
    hint: "C → Cosinus, A → Adjacent, H → Hypoténuse.",
    explanation:
      "Définition : « CAH » résume $\\cos = \\dfrac{\\text{Adjacent}}{\\text{Hypoténuse}}$.\n\n" +
      "Méthode : chaque lettre rappelle un mot.\n\n" +
      "Calcul : C(osinus) = A(djacent) / H(ypoténuse).\n\n" +
      "Conclusion : Cosinus = Adjacent / Hypoténuse.",
    tags: ["trigo_cosinus", "definition", "mnemotechnique", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_5_60",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $\\cos(60^\\circ)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$1$", "$0$", "$0{,}87$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "Valeur remarquable à connaître.",
    explanation:
      "Définition : certaines valeurs de cosinus sont remarquables.\n\n" +
      "Méthode : on retient $\\cos(60^\\circ) = 0{,}5$.\n\n" +
      "Calcul : $\\cos(60^\\circ) = \\dfrac{1}{2} = 0{,}5$.\n\n" +
      "Conclusion : $\\cos(60^\\circ) = 0{,}5$.",
    tags: ["trigo_cosinus", "definition", "valeur_remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_6_0",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $\\cos(0^\\circ)$ ?",
    format: "qcm",
    choices: ["$1$", "$0$", "$0{,}5$", "$90$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Quand l’angle est nul, l’adjacent est presque égal à l’hypoténuse.",
    explanation:
      "Définition : $\\cos(0^\\circ)$ est une valeur remarquable.\n\n" +
      "Méthode : on retient $\\cos(0^\\circ) = 1$.\n\n" +
      "Calcul : l’adjacent est alors confondu avec l’hypoténuse.\n\n" +
      "Conclusion : $\\cos(0^\\circ) = 1$.",
    tags: ["trigo_cosinus", "definition", "valeur_remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_definition_tpl_2_formule_c",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "Adjacent à l’angle choisi, sur l’hypoténuse.",
    tags: ["trigo_cosinus", "definition", "qcm", "canvas", "template"],
    generate: () => {
      const angleAt = randomChoice<"B" | "C">(["B", "C"]);
      const adj = angleAt === "B" ? "AB" : "AC";
      const correct = `$\\dfrac{${adj}}{BC}$`;
      return {
        text: `Dans le triangle rectangle en $A$, à quoi est égal $\\cos(\\widehat{${angleAt}})$ ?`,
        format: "qcm",
        choices: shuffle([correct, `$\\dfrac{BC}{${adj}}$`, `$\\dfrac{${angleAt === "B" ? "AC" : "AB"}}{BC}$`, `$\\dfrac{AB}{AC}$`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : l’adjacent à $\\widehat{${angleAt}}$ est $${adj}$, l’hypoténuse est $BC$.\n\n` +
          `Calcul : $\\cos(\\widehat{${angleAt}}) = \\dfrac{${adj}}{BC}$.\n\n` +
          `Conclusion : $\\cos(\\widehat{${angleAt}}) = \\dfrac{${adj}}{BC}$.`,
        canvas: triangleCosCanvas({ angleAt }),
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_7_erreur",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit $\\cos(\\theta) = \\dfrac{\\text{hypoténuse}}{\\text{adjacent}}$. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le cosinus est inférieur à $1$ : l’adjacent est au numérateur.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on vérifie l’ordre numérateur / dénominateur.\n\n" +
      "Calcul : il a inversé : c’est adjacent sur hypoténuse.\n\n" +
      "Conclusion : non, $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.",
    tags: ["trigo_cosinus", "definition", "erreur", "qcm"],
  },

  /* =========================
     COS_CALCULER_LONGUEUR
  ========================= */
  {
    kind: "fixed",
    id: "4e_cos_calculer_longueur_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer le côté adjacent connaissant l’angle et l’hypoténuse, quelle formule utilise-t-on ?",
    format: "qcm",
    choices: [
      "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$",
      "$\\text{adjacent} = \\dfrac{\\text{hypoténuse}}{\\cos(\\theta)}$",
      "$\\text{adjacent} = \\text{hypoténuse} + \\cos(\\theta)$",
      "$\\text{adjacent} = \\cos(\\theta) - \\text{hypoténuse}$",
    ],
    expected: ["$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$"],
    comparator: "mcq_exact",
    hint: "On multiplie l’hypoténuse par le cosinus.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on multiplie les deux membres par l’hypoténuse.\n\n" +
      "Calcul : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$.\n\n" +
      "Conclusion : c’est la première formule.",
    tags: ["trigo_cosinus", "calculer_longueur", "isoler", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_calculer_longueur_tpl_1_adjacent_60",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(60^\\circ)$ et $\\cos(60^\\circ) = 0{,}5$.",
    tags: ["trigo_cosinus", "calculer_longueur", "canvas", "template"],
    generate: () => {
      const hyp = randomChoice([8, 10, 12, 14, 16]);
      const adj = hyp / 2;
      return {
        text: `Dans un triangle rectangle, l’hypoténuse mesure ${hyp} cm et l’angle étudié vaut $60^\\circ$. Calcule la longueur du côté adjacent (en cm).`,
        format: "short",
        expected: [String(adj), String(adj).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(60^\\circ)$.\n\n` +
          `Calcul : $${hyp} \\times 0{,}5 = ${adj}$.\n\n` +
          `Conclusion : le côté adjacent mesure $${adj}$ cm.`,
        canvas: triangleCosCanvas({
          angleAt: "B",
          angleLabel: "60°",
          sideLabels: { BC: `${hyp} cm`, AB: "?", AC: "" },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_cos_calculer_longueur_tpl_2_decimal",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$, au dixième.",
    tags: ["trigo_cosinus", "calculer_longueur", "decimal", "canvas", "template"],
    generate: () => {
      const angle = randomChoice([35, 40, 50, 55]);
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
          `Calcul : $${hyp} \\times \\cos(${angle}^\\circ) \\approx ${formatNumber(adj)}$.\n\n` +
          `Conclusion : le côté adjacent mesure environ $${formatNumber(adj)}$ cm.`,
        canvas: triangleCosCanvas({
          angleAt: "B",
          angleLabel: `${angle}°`,
          sideLabels: { BC: `${hyp} cm`, AB: "?", AC: "" },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_cos_calculer_longueur_tpl_3_hypotenuse",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(\\theta)}$ et $\\cos(60^\\circ) = 0{,}5$.",
    tags: ["trigo_cosinus", "calculer_longueur", "hypotenuse", "canvas", "template"],
    generate: () => {
      const adj = randomChoice([3, 4, 5, 6, 7]);
      const hyp = adj * 2;
      return {
        text: `Dans un triangle rectangle, le côté adjacent à un angle de $60^\\circ$ mesure ${adj} cm. Calcule la longueur de l’hypoténuse (en cm).`,
        format: "short",
        expected: [String(hyp)],
        comparator: "number_equal",
        explanation:
          `Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : on isole l’hypoténuse : $\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(60^\\circ)}$.\n\n` +
          `Calcul : $\\dfrac{${adj}}{0{,}5} = ${hyp}$.\n\n` +
          `Conclusion : l’hypoténuse mesure $${hyp}$ cm.`,
        canvas: triangleCosCanvas({
          angleAt: "B",
          angleLabel: "60°",
          sideLabels: { AB: `${adj} cm`, BC: "?", AC: "" },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_longueur_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle rectangle, l’hypoténuse mesure $10$ cm et l’angle étudié vaut $60^\\circ$. Quelle est la longueur du côté adjacent (en cm) ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$10 \\times \\cos(60^\\circ) = 10 \\times 0{,}5$.",
    explanation:
      "Définition : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$.\n\n" +
      "Méthode : on multiplie $10$ par $\\cos(60^\\circ) = 0{,}5$.\n\n" +
      "Calcul : $10 \\times 0{,}5 = 5$.\n\n" +
      "Conclusion : le côté adjacent mesure $5$ cm.",
    canvas: triangleCosCanvas({
      angleAt: "B",
      angleLabel: "60°",
      sideLabels: { BC: "10 cm", AB: "?", AC: "" },
    }),
    tags: ["trigo_cosinus", "calculer_longueur", "short"],
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_longueur_qcm_2_choix",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "On connaît l’hypoténuse et l’angle, et on cherche le côté adjacent. Quel rapport faut-il utiliser ?",
    format: "qcm",
    choices: ["le cosinus", "le périmètre", "Pythagore seul", "la proportionnalité"],
    expected: ["le cosinus"],
    comparator: "mcq_exact",
    hint: "Adjacent et hypoténuse → cosinus.",
    explanation:
      "Définition : le cosinus relie l’adjacent et l’hypoténuse.\n\n" +
      "Méthode : on choisit le rapport correspondant aux deux côtés en jeu.\n\n" +
      "Calcul : adjacent et hypoténuse → cosinus.\n\n" +
      "Conclusion : on utilise le cosinus.",
    tags: ["trigo_cosinus", "calculer_longueur", "choix", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_calculer_longueur_tpl_4_decimal_hyp",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 5,
    theme: "neutral",
    hint: "$\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(\\theta)}$, au dixième.",
    tags: ["trigo_cosinus", "calculer_longueur", "decimal", "template"],
    generate: () => {
      const angle = randomChoice([35, 40, 50]);
      const adj = randomChoice([6, 8, 10]);
      const hyp = round1(adj / Math.cos(degToRad(angle)));
      return {
        text: `Dans un triangle rectangle, le côté adjacent à un angle de $${angle}^\\circ$ mesure ${adj} cm. Calcule l’hypoténuse au dixième près (en cm).`,
        format: "short",
        expected: [String(hyp), String(hyp).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : $\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(\\theta)}$.\n\n` +
          `Calcul : $\\dfrac{${adj}}{\\cos(${angle}^\\circ)} \\approx ${formatNumber(hyp)}$.\n\n` +
          `Conclusion : l’hypoténuse mesure environ $${formatNumber(hyp)}$ cm.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_longueur_fixed_2_hyp",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    text: "Le côté adjacent à un angle de $60^\\circ$ mesure $7$ cm. Quelle est la longueur de l’hypoténuse (en cm) ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "$\\dfrac{7}{\\cos(60^\\circ)} = \\dfrac{7}{0{,}5}$.",
    explanation:
      "Définition : $\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(\\theta)}$.\n\n" +
      "Méthode : on divise $7$ par $\\cos(60^\\circ) = 0{,}5$.\n\n" +
      "Calcul : $\\dfrac{7}{0{,}5} = 14$.\n\n" +
      "Conclusion : l’hypoténuse mesure $14$ cm.",
    tags: ["trigo_cosinus", "calculer_longueur", "hypotenuse", "short"],
  },
  {
    kind: "template",
    id: "4e_cos_calculer_longueur_tpl_5_adjacent_decimal",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$.",
    tags: ["trigo_cosinus", "calculer_longueur", "decimal", "canvas", "template"],
    generate: () => {
      const angle = randomChoice([25, 30, 45]);
      const hyp = randomChoice([10, 15, 20]);
      const adj = round1(hyp * Math.cos(degToRad(angle)));
      return {
        text: `L’hypoténuse mesure ${hyp} cm et l’angle vaut $${angle}^\\circ$. Calcule le côté adjacent au dixième près (en cm).`,
        format: "short",
        expected: [String(adj), String(adj).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$.\n\n` +
          `Calcul : $${hyp} \\times \\cos(${angle}^\\circ) \\approx ${formatNumber(adj)}$.\n\n` +
          `Conclusion : le côté adjacent mesure environ $${formatNumber(adj)}$ cm.`,
        canvas: triangleCosCanvas({
          angleAt: "B",
          angleLabel: `${angle}°`,
          sideLabels: { BC: `${hyp} cm`, AB: "?", AC: "" },
        }),
      };
    },
  },

  /* =========================
     COS_CALCULER_ANGLE
  ========================= */
  {
    kind: "fixed",
    id: "4e_cos_calculer_angle_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer un angle dont on connaît le cosinus, on utilise…",
    format: "qcm",
    choices: ["la touche $\\cos^{-1}$ de la calculatrice", "la touche $\\cos$", "le théorème de Pythagore", "la moyenne"],
    expected: ["la touche $\\cos^{-1}$ de la calculatrice"],
    comparator: "mcq_exact",
    hint: "C’est la fonction inverse du cosinus.",
    explanation:
      "Définition : $\\cos^{-1}$ retrouve un angle à partir de son cosinus.\n\n" +
      "Méthode : quand on connaît le rapport, on utilise $\\cos^{-1}$.\n\n" +
      "Calcul : par exemple $\\cos^{-1}(0{,}5) = 60^\\circ$.\n\n" +
      "Conclusion : on utilise $\\cos^{-1}$.",
    tags: ["trigo_cosinus", "calculer_angle", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_angle_fixed_1_60",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle rectangle, le côté adjacent à l’angle $\\theta$ mesure $5$ cm et l’hypoténuse $10$ cm. Combien vaut $\\theta$ (en degrés) ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "$\\cos(\\theta) = \\dfrac{5}{10} = 0{,}5$, puis $\\cos^{-1}(0{,}5)$.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on calcule le rapport, puis $\\cos^{-1}$.\n\n" +
      "Calcul : $\\cos(\\theta) = \\dfrac{5}{10} = 0{,}5$, donc $\\theta = \\cos^{-1}(0{,}5) = 60^\\circ$.\n\n" +
      "Conclusion : $\\theta = 60^\\circ$.",
    canvas: triangleCosCanvas({
      angleAt: "B",
      angleLabel: "?",
      sideLabels: { AB: "5 cm", BC: "10 cm", AC: "" },
    }),
    tags: ["trigo_cosinus", "calculer_angle", "short"],
  },
  {
    kind: "template",
    id: "4e_cos_calculer_angle_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule $\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$, puis $\\cos^{-1}$, au degré près.",
    tags: ["trigo_cosinus", "calculer_angle", "canvas", "template"],
    generate: () => {
      const adj = randomChoice([3, 4, 5, 6]);
      const hyp = randomChoice([8, 9, 10]);
      const angle = Math.round((Math.acos(adj / hyp) * 180) / Math.PI);
      return {
        text: `Dans un triangle rectangle, le côté adjacent à l’angle $\\theta$ mesure ${adj} cm et l’hypoténuse ${hyp} cm. Calcule $\\theta$ au degré près (en degrés).`,
        format: "short",
        expected: [String(angle)],
        comparator: "number_equal",
        explanation:
          `Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : on calcule le rapport, puis on applique $\\cos^{-1}$.\n\n` +
          `Calcul : $\\cos(\\theta) = \\dfrac{${adj}}{${hyp}}$, donc $\\theta = \\cos^{-1}\\!\\left(\\dfrac{${adj}}{${hyp}}\\right) \\approx ${angle}^\\circ$.\n\n` +
          `Conclusion : $\\theta \\approx ${angle}^\\circ$.`,
        canvas: triangleCosCanvas({
          angleAt: "B",
          angleLabel: "?",
          sideLabels: { AB: `${adj} cm`, BC: `${hyp} cm`, AC: "" },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_angle_qcm_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Si $\\cos(\\theta) = 0{,}5$, combien vaut l’angle $\\theta$ ?",
    format: "qcm",
    choices: ["$60^\\circ$", "$30^\\circ$", "$45^\\circ$", "$50^\\circ$"],
    expected: ["$60^\\circ$"],
    comparator: "mcq_exact",
    hint: "$\\cos^{-1}(0{,}5) = 60^\\circ$.",
    explanation:
      "Définition : $\\cos^{-1}$ retrouve l’angle à partir de son cosinus.\n\n" +
      "Méthode : on applique $\\cos^{-1}(0{,}5)$.\n\n" +
      "Calcul : $\\cos^{-1}(0{,}5) = 60^\\circ$.\n\n" +
      "Conclusion : $\\theta = 60^\\circ$.",
    tags: ["trigo_cosinus", "calculer_angle", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_calculer_angle_tpl_2_ratio",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    hint: "Applique $\\cos^{-1}$ à la valeur donnée.",
    tags: ["trigo_cosinus", "calculer_angle", "template"],
    generate: () => {
      const data = randomChoice([
        { val: "0{,}5", angle: 60 },
        { val: "1", angle: 0 },
      ]);
      return {
        text: `On a trouvé $\\cos(\\theta) = ${data.val}$. Combien vaut l’angle $\\theta$ (en degrés) ?`,
        format: "short",
        expected: [String(data.angle)],
        comparator: "number_equal",
        explanation:
          `Définition : pour trouver un angle, on utilise $\\cos^{-1}$.\n\n` +
          `Méthode : $\\theta = \\cos^{-1}(${data.val})$.\n\n` +
          `Calcul : $\\theta = ${data.angle}^\\circ$.\n\n` +
          `Conclusion : $\\theta = ${data.angle}^\\circ$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_angle_qcm_3_choix",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 3,
    theme: "neutral",
    text: "On connaît le côté adjacent et l’hypoténuse, et on cherche l’angle. Que faut-il faire ?",
    format: "qcm",
    choices: [
      "calculer $\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ puis $\\cos^{-1}$",
      "additionner les deux côtés",
      "utiliser Pythagore",
      "diviser l’hypoténuse par $2$",
    ],
    expected: ["calculer $\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ puis $\\cos^{-1}$"],
    comparator: "mcq_exact",
    hint: "Le rapport adjacent/hypoténuse donne le cosinus de l’angle.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on calcule le rapport, puis on applique $\\cos^{-1}$.\n\n" +
      "Calcul : cela donne directement l’angle.\n\n" +
      "Conclusion : on calcule le rapport puis $\\cos^{-1}$.",
    tags: ["trigo_cosinus", "calculer_angle", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_calculer_angle_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule le rapport, puis $\\cos^{-1}$ au degré près.",
    tags: ["trigo_cosinus", "calculer_angle", "template"],
    generate: () => {
      const adj = randomChoice([4, 5, 7]);
      const hyp = randomChoice([12, 14, 15]);
      const angle = Math.round((Math.acos(adj / hyp) * 180) / Math.PI);
      return {
        text: `Le côté adjacent à $\\theta$ mesure ${adj} cm et l’hypoténuse ${hyp} cm. Calcule $\\theta$ au degré près (en degrés).`,
        format: "short",
        expected: [String(angle)],
        comparator: "number_equal",
        explanation:
          `Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n` +
          `Méthode : on calcule $\\dfrac{${adj}}{${hyp}}$, puis $\\cos^{-1}$.\n\n` +
          `Calcul : $\\theta = \\cos^{-1}\\!\\left(\\dfrac{${adj}}{${hyp}}\\right) \\approx ${angle}^\\circ$.\n\n` +
          `Conclusion : $\\theta \\approx ${angle}^\\circ$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_angle_fixed_2_complementaire",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle rectangle, un angle aigu vaut $60^\\circ$. Combien mesure l’autre angle aigu (en degrés) ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Les deux angles aigus ont une somme de $90^\\circ$.",
    explanation:
      "Définition : dans un triangle rectangle, les deux angles aigus sont complémentaires.\n\n" +
      "Méthode : on soustrait l’angle connu à $90^\\circ$.\n\n" +
      "Calcul : $90 - 60 = 30$.\n\n" +
      "Conclusion : l’autre angle aigu mesure $30^\\circ$.",
    tags: ["trigo_cosinus", "calculer_angle", "complementaire", "short"],
  },

  /* =========================
     COS_PROBLEME
  ========================= */
  {
    kind: "template",
    id: "4e_cos_probleme_tpl_1_echelle",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "La distance au pied du mur est l’adjacent ; l’échelle est l’hypoténuse.",
    tags: ["trigo_cosinus", "probleme", "template"],
    generate: () => {
      const hyp = randomChoice([6, 8, 10, 12]);
      const adj = hyp / 2;
      return {
        text: `Une échelle de ${hyp} m forme un angle de $60^\\circ$ avec le sol. À quelle distance (en m) le pied de l’échelle est-il du mur ?`,
        format: "short",
        expected: [String(adj), String(adj).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : la distance au mur est le côté adjacent à l’angle, l’échelle est l’hypoténuse.\n\n` +
          `Méthode : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(60^\\circ)$.\n\n` +
          `Calcul : $${hyp} \\times 0{,}5 = ${adj}$.\n\n` +
          `Conclusion : le pied de l’échelle est à $${adj}$ m du mur.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_cos_probleme_tpl_2_rampe",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 5,
    theme: "reunion",
    hint: "L’angle = cos⁻¹(distance horizontale / longueur de la rampe), au degré près.",
    tags: ["trigo_cosinus", "probleme", "reunion", "template"],
    generate: () => {
      const adj = randomChoice([4, 5, 8]);
      const hyp = randomChoice([10, 12]);
      const angle = Math.round((Math.acos(adj / hyp) * 180) / Math.PI);
      return {
        text: `Une rampe d’accès de ${hyp} m couvre une distance horizontale de ${adj} m. Quel angle (en degrés, au degré près) la rampe forme-t-elle avec l’horizontale ?`,
        format: "short",
        expected: [String(angle)],
        comparator: "number_equal",
        explanation:
          `Définition : la distance horizontale est l’adjacent, la rampe est l’hypoténuse.\n\n` +
          `Méthode : $\\cos(\\theta) = \\dfrac{${adj}}{${hyp}}$, puis $\\theta = \\cos^{-1}$.\n\n` +
          `Calcul : $\\theta = \\cos^{-1}\\!\\left(\\dfrac{${adj}}{${hyp}}\\right) \\approx ${angle}^\\circ$.\n\n` +
          `Conclusion : la rampe forme un angle d’environ $${angle}^\\circ$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_probleme_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "On connaît un angle et l’hypoténuse d’un triangle rectangle, et on cherche le côté adjacent. Que faut-il utiliser ?",
    format: "qcm",
    choices: ["le cosinus", "le théorème de Pythagore seul", "le périmètre", "la moyenne"],
    expected: ["le cosinus"],
    comparator: "mcq_exact",
    hint: "Un angle intervient, avec adjacent et hypoténuse.",
    explanation:
      "Définition : le cosinus relie un angle, l’adjacent et l’hypoténuse.\n\n" +
      "Méthode : on choisit le rapport adapté aux côtés en jeu.\n\n" +
      "Calcul : adjacent et hypoténuse → cosinus.\n\n" +
      "Conclusion : on utilise le cosinus.",
    tags: ["trigo_cosinus", "probleme", "choix", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_probleme_tpl_3_toboggan",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$, au dixième.",
    tags: ["trigo_cosinus", "probleme", "decimal", "template"],
    generate: () => {
      const angle = randomChoice([40, 50, 55]);
      const hyp = randomChoice([6, 8, 10]);
      const adj = round1(hyp * Math.cos(degToRad(angle)));
      return {
        text: `Un câble de ${hyp} m est tendu et fait un angle de $${angle}^\\circ$ avec le sol horizontal. Quelle distance horizontale (en m, au dixième) couvre-t-il ?`,
        format: "short",
        expected: [String(adj), String(adj).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : la distance horizontale est l’adjacent à l’angle, le câble est l’hypoténuse.\n\n` +
          `Méthode : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$.\n\n` +
          `Calcul : $${hyp} \\times \\cos(${angle}^\\circ) \\approx ${formatNumber(adj)}$.\n\n` +
          `Conclusion : il couvre environ $${formatNumber(adj)}$ m à l’horizontale.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_probleme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Une planche de $4$ m est appuyée contre un mur, son pied étant à $2$ m du mur. Quel angle (en degrés) la planche forme-t-elle avec le sol ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "$\\cos(\\theta) = \\dfrac{2}{4} = 0{,}5$.",
    explanation:
      "Définition : la distance au mur est l’adjacent, la planche est l’hypoténuse.\n\n" +
      "Méthode : $\\cos(\\theta) = \\dfrac{2}{4} = 0{,}5$, puis $\\cos^{-1}$.\n\n" +
      "Calcul : $\\theta = \\cos^{-1}(0{,}5) = 60^\\circ$.\n\n" +
      "Conclusion : la planche forme un angle de $60^\\circ$ avec le sol.",
    tags: ["trigo_cosinus", "probleme", "short"],
  },
  {
    kind: "template",
    id: "4e_cos_probleme_tpl_4_hypotenuse",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "$\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(60^\\circ)}$.",
    tags: ["trigo_cosinus", "probleme", "template"],
    generate: () => {
      const adj = randomChoice([3, 5, 6]);
      const hyp = adj * 2;
      return {
        text: `Un haubban (câble) part du sommet d’un mât et est fixé au sol à ${adj} m du pied du mât, en formant un angle de $60^\\circ$ avec le sol. Quelle est la longueur du câble (en m) ?`,
        format: "short",
        expected: [String(hyp)],
        comparator: "number_equal",
        explanation:
          `Définition : la distance au pied est l’adjacent, le câble est l’hypoténuse.\n\n` +
          `Méthode : $\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(60^\\circ)}$.\n\n` +
          `Calcul : $\\dfrac{${adj}}{0{,}5} = ${hyp}$.\n\n` +
          `Conclusion : le câble mesure $${hyp}$ m.`,
      };
    },
  },

  /* =========================
     COS_DEFI
  ========================= */
  {
    kind: "fixed",
    id: "4e_cos_defi_fixed_1_pythagore",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un triangle rectangle, on connaît les deux côtés de l’angle droit ($3$ et $4$). Pour trouver un angle aigu avec le cosinus, que doit-on d’abord calculer ?",
    format: "qcm",
    choices: [
      "l’hypoténuse avec le théorème de Pythagore",
      "le périmètre",
      "l’aire",
      "la médiane",
    ],
    expected: ["l’hypoténuse avec le théorème de Pythagore"],
    comparator: "mcq_exact",
    hint: "Le cosinus a besoin de l’hypoténuse.",
    explanation:
      "Définition : le cosinus utilise l’adjacent et l’hypoténuse.\n\n" +
      "Méthode : on ne connaît pas l’hypoténuse, on la calcule d’abord avec Pythagore.\n\n" +
      "Calcul : $\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$, puis on utilise le cosinus.\n\n" +
      "Conclusion : on calcule d’abord l’hypoténuse avec Pythagore.",
    tags: ["trigo_cosinus", "defi", "pythagore", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_defi_fixed_2_brevet",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Type brevet : dans un triangle rectangle, l’hypoténuse mesure $8$ cm et le côté adjacent à $\\theta$ mesure $4$ cm. Combien vaut $\\theta$ (en degrés) ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "$\\cos(\\theta) = \\dfrac{4}{8} = 0{,}5$.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on calcule le rapport, puis $\\cos^{-1}$.\n\n" +
      "Calcul : $\\cos(\\theta) = \\dfrac{4}{8} = 0{,}5$, donc $\\theta = 60^\\circ$.\n\n" +
      "Conclusion : $\\theta = 60^\\circ$.",
    tags: ["trigo_cosinus", "defi", "brevet", "short"],
  },
  {
    kind: "template",
    id: "4e_cos_defi_tpl_1_combine",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule d’abord l’hypoténuse avec Pythagore, puis le cosinus de l’angle.",
    tags: ["trigo_cosinus", "defi", "pythagore", "template"],
    generate: () => {
      const t = randomChoice([
        { a: 3, b: 4, c: 5 },
        { a: 6, b: 8, c: 10 },
      ]);
      const angle = Math.round((Math.acos(t.a / t.c) * 180) / Math.PI);
      return {
        text: `Un triangle est rectangle, les deux côtés de l’angle droit mesurent ${t.a} cm et ${t.b} cm. On note $\\theta$ l’angle dont le côté adjacent mesure ${t.a} cm. Calcule $\\theta$ au degré près (en degrés).`,
        format: "short",
        expected: [String(angle)],
        comparator: "number_equal",
        explanation:
          `Définition : pour le cosinus il faut l’hypoténuse.\n\n` +
          `Méthode : Pythagore donne l’hypoténuse $\\sqrt{${t.a}^2 + ${t.b}^2} = ${t.c}$, puis $\\cos(\\theta) = \\dfrac{${t.a}}{${t.c}}$.\n\n` +
          `Calcul : $\\theta = \\cos^{-1}\\!\\left(\\dfrac{${t.a}}{${t.c}}\\right) \\approx ${angle}^\\circ$.\n\n` +
          `Conclusion : $\\theta \\approx ${angle}^\\circ$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_defi_fixed_3_erreur",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève écrit $\\cos(\\theta) = 1{,}5$. Est-ce possible pour un angle aigu ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le cosinus d’un angle aigu est entre $0$ et $1$.",
    explanation:
      "Définition : le cosinus d’un angle aigu est compris entre $0$ et $1$.\n\n" +
      "Méthode : on compare $1{,}5$ à $1$.\n\n" +
      "Calcul : $1{,}5 > 1$, c’est impossible (l’adjacent serait plus grand que l’hypoténuse).\n\n" +
      "Conclusion : non, c’est impossible.",
    tags: ["trigo_cosinus", "defi", "erreur", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_defi_fixed_4_distinction",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Quand utilise-t-on le cosinus plutôt que le théorème de Pythagore ?",
    format: "qcm",
    choices: [
      "quand un angle intervient",
      "quand on connaît seulement les trois côtés",
      "quand le triangle n’est pas rectangle",
      "jamais",
    ],
    expected: ["quand un angle intervient"],
    comparator: "mcq_exact",
    hint: "Pythagore ne fait pas intervenir d’angle.",
    explanation:
      "Définition : le cosinus relie un angle à deux côtés ; Pythagore relie trois côtés.\n\n" +
      "Méthode : on regarde si un angle est connu ou cherché.\n\n" +
      "Calcul : si un angle intervient, on utilise le cosinus.\n\n" +
      "Conclusion : on utilise le cosinus quand un angle intervient.",
    tags: ["trigo_cosinus", "defi", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_defi_tpl_2_longueur",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(60^\\circ)$.",
    tags: ["trigo_cosinus", "defi", "template"],
    generate: () => {
      const hyp = randomChoice([6, 8, 10, 12, 14]);
      const adj = hyp / 2;
      return {
        text: `Défi : l’hypoténuse d’un triangle rectangle mesure ${hyp} cm et un angle vaut $60^\\circ$. Quelle est la longueur du côté adjacent à cet angle (en cm) ?`,
        format: "short",
        expected: [String(adj), String(adj).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$.\n\n` +
          `Méthode : $\\cos(60^\\circ) = 0{,}5$.\n\n` +
          `Calcul : $${hyp} \\times 0{,}5 = ${adj}$.\n\n` +
          `Conclusion : le côté adjacent mesure $${adj}$ cm.`,
      };
    },
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- COS_PROBLEME ----------
  {
    kind: "fixed",
    id: "4e_cos_probleme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une échelle de 4 m est appuyée contre un mur et fait un angle de $60^\\circ$ avec le sol. À quelle distance du mur se trouve son pied (en m) ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$\\text{distance} = \\text{longueur} \\times \\cos(60^\\circ)$.",
    explanation:
      "Définition : la distance au mur est le côté adjacent à l’angle au sol.\n\n" +
      "Méthode : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(60^\\circ)$.\n\n" +
      "Calcul : $4 \\times 0{,}5 = 2$.\n\n" +
      "Conclusion : le pied de l’échelle est à 2 m du mur.",
    tags: ["trigo_cosinus", "probleme", "echelle"],
  },
  {
    kind: "template",
    id: "4e_cos_probleme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Le côté adjacent vaut hypoténuse × cos(60°).",
    tags: ["trigo_cosinus", "probleme", "template"],
    generate: () => {
      const hyp = randomChoice([6, 8, 10, 12, 14]);
      const adj = hyp / 2;
      return {
        text: `Une rampe de ${hyp} m fait un angle de $60^\\circ$ avec le sol. Quelle est la longueur horizontale au sol (côté adjacent, en m) ?`,
        format: "short",
        expected: [String(adj), String(adj).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          "Définition : la longueur au sol est le côté adjacent à l’angle.\n\n" +
          "Méthode : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(60^\\circ)$.\n\n" +
          `Calcul : $${hyp} \\times 0{,}5 = ${adj}$.\n\n` +
          `Conclusion : la longueur au sol est $${adj}$ m.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_cos_probleme_tpl_3_valeur_donnee",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "adjacent = hypoténuse × cos(angle).",
    tags: ["trigo_cosinus", "probleme", "template"],
    generate: () => {
      const cos = randomChoice([0.8, 0.6]);
      const hyp = randomChoice([10, 15, 20, 25]);
      const adj = hyp * cos;
      return {
        text: `Dans un triangle rectangle, l’hypoténuse mesure ${hyp} cm et on donne $\\cos(\\theta) = ${String(cos).replace(".", ",")}$. Quelle est la longueur du côté adjacent à $\\theta$ (en cm) ?`,
        format: "short",
        expected: [String(adj), String(adj).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          "Définition : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$.\n\n" +
          "Méthode : on multiplie l’hypoténuse par le cosinus donné.\n\n" +
          `Calcul : $${hyp} \\times ${String(cos).replace(".", ",")} = ${String(adj).replace(".", ",")}$.\n\n` +
          `Conclusion : le côté adjacent mesure $${String(adj).replace(".", ",")}$ cm.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_probleme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique quand on utilise le cosinus pour résoudre un problème dans un triangle rectangle.",
    format: "open",
    expected: ["adjacent", "hypoténuse", "angle"],
    comparator: "contains_keyword",
    hint: "Le cosinus relie l’adjacent et l’hypoténuse.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on utilise le cosinus quand le problème fait intervenir un angle, le côté adjacent et l’hypoténuse.\n\n" +
      "Calcul : on isole la grandeur cherchée à partir de la formule.\n\n" +
      "Conclusion : on utilise le cosinus pour relier angle, adjacent et hypoténuse.",
    tags: ["trigo_cosinus", "probleme", "open"],
  },

  // ---------- COS_DEFI ----------
  {
    kind: "fixed",
    id: "4e_cos_defi_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle rectangle, le cosinus d’un angle aigu est égal à…",
    format: "qcm",
    choices: [
      "$\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$",
      "$\\dfrac{\\text{opposé}}{\\text{hypoténuse}}$",
      "$\\dfrac{\\text{hypoténuse}}{\\text{adjacent}}$",
      "$\\dfrac{\\text{opposé}}{\\text{adjacent}}$",
    ],
    expected: ["$\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$"],
    comparator: "mcq_exact",
    hint: "Cosinus = adjacent sur hypoténuse.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on identifie le côté adjacent et l’hypoténuse.\n\n" +
      "Calcul : aucun calcul n’est nécessaire.\n\n" +
      "Conclusion : le cosinus est le quotient adjacent ÷ hypoténuse.",
    tags: ["trigo_cosinus", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_defi_fixed_2_borne",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Le cosinus d’un angle aigu peut-il être supérieur à 1 ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "L’adjacent est toujours plus court que l’hypoténuse.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : l’hypoténuse est le plus grand côté.\n\n" +
      "Calcul : adjacent < hypoténuse, donc le quotient est inférieur à 1.\n\n" +
      "Conclusion : non, le cosinus d’un angle aigu est compris entre 0 et 1.",
    tags: ["trigo_cosinus", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_defi_tpl_3_hypotenuse",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "$\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(60^\\circ)}$.",
    tags: ["trigo_cosinus", "defi", "template"],
    generate: () => {
      const adj = randomChoice([3, 4, 5, 6, 7]);
      const hyp = adj * 2;
      return {
        text: `Défi : dans un triangle rectangle, le côté adjacent à un angle de $60^\\circ$ mesure ${adj} cm. Quelle est la longueur de l’hypoténuse (en cm) ?`,
        format: "short",
        expected: [String(hyp), String(hyp).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          "Définition : $\\cos(60^\\circ) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}} = 0{,}5$.\n\n" +
          "Méthode : $\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{0{,}5}$.\n\n" +
          `Calcul : $${adj} \\div 0{,}5 = ${hyp}$.\n\n` +
          `Conclusion : l’hypoténuse mesure $${hyp}$ cm.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_cos_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi le cosinus d’un angle aigu est toujours compris entre 0 et 1.",
    format: "open",
    expected: ["adjacent", "hypoténuse", "plus grand"],
    comparator: "contains_keyword",
    hint: "Compare l’adjacent et l’hypoténuse.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : dans un triangle rectangle, l’hypoténuse est le plus grand côté.\n\n" +
      "Calcul : un côté adjacent positif plus petit que l’hypoténuse donne un quotient entre 0 et 1.\n\n" +
      "Conclusion : le cosinus d’un angle aigu est donc compris entre 0 et 1.",
    tags: ["trigo_cosinus", "defi", "open"],
  },
];
