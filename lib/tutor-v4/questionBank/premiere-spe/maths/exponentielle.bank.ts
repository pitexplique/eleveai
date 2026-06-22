// lib/tutor-v4/questionBank/premiere-spe/maths/exponentielle.bank.ts
//
// Chapitre : Fonction exponentielle (notion "exponentielle")
// microSkills :
//   exp_proprietes   — propriétés algébriques (e^{x+y} = e^x·e^y, e^{-x} = 1/e^x, ...)
//   exp_simplifier   — simplifier une expression avec l'exponentielle
//   exp_derivee      — dérivée, signe et variations de l'exponentielle
//   exp_modelisation — modéliser une croissance/décroissance exponentielle
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM. Canvas : fonctionGraphique (courbe exp via points).

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

function echantillonne(f: (x: number) => number, xmin: number, xmax: number, step: number) {
  const pts: { x: number; y: number }[] = [];
  for (let x = xmin; x <= xmax + 1e-9; x += step) {
    const xr = Math.round(x * 100) / 100;
    pts.push({ x: xr, y: Math.round(f(xr) * 100) / 100 });
  }
  return pts;
}

const courbeExp: CanvasFigure = {
  kind: "fonctionGraphique",
  size: { width: 320, height: 300 },
  xmin: -3,
  xmax: 3,
  ymin: -1,
  ymax: 9,
  grille: true,
  courbes: [{ id: "f", type: "points", couleur: "#2563eb", points: echantillonne((x) => Math.exp(x), -3, 2.1, 0.3) }],
  misesEnEvidence: [{ point: { x: 0, y: 1, label: "(0 ; 1)", couleur: "#dc2626" } }],
};

export const exponentielleBank: TutorBankItemV4[] = [
  /* ===================== EXP_PROPRIETES ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_prop_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 1,
    theme: "neutral",
    text: "À quoi est égal $e^{x} \\times e^{y}$ ?",
    format: "qcm",
    choices: ["$e^{x+y}$", "$e^{xy}$", "$e^{x-y}$", "$e^x + e^y$"],
    expected: ["$e^{x+y}$"],
    comparator: "mcq_exact",
    hint: "Produit d'exponentielles → somme des exposants.",
    explanation: exp(
      "L'exponentielle transforme les produits en sommes d'exposants.",
      "$e^{x} \\times e^{y} = e^{x+y}$.",
      "C'est la propriété fondamentale.",
      "$e^{x+y}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "proprietes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_prop_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi est égal $e^{-x}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{e^x}$", "$-e^x$", "$e^x$", "$1 - e^x$"],
    expected: ["$\\dfrac{1}{e^x}$"],
    comparator: "mcq_exact",
    hint: "$e^x \\times e^{-x} = 1$.",
    explanation: exp(
      "On utilise $e^x \\times e^{-x} = e^0 = 1$.",
      "Donc $e^{-x}$ est l'inverse de $e^x$.",
      "$e^{-x} = \\dfrac{1}{e^x}$.",
      "$\\dfrac{1}{e^x}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "proprietes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_prop_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $e^0$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Cas particulier.",
    explanation: exp(
      "Par définition, l'exponentielle vérifie $e^0 = 1$.",
      "C'est la condition initiale.",
      "$e^0 = 1$.",
      "$e^0 = 1$."
    ),
    tags: ["premiere", "maths", "exponentielle", "proprietes", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_prop_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi est égal $\\dfrac{e^{x}}{e^{y}}$ ?",
    format: "qcm",
    choices: ["$e^{x-y}$", "$e^{x+y}$", "$e^{x/y}$", "$e^{xy}$"],
    expected: ["$e^{x-y}$"],
    comparator: "mcq_exact",
    hint: "Quotient → différence des exposants.",
    explanation: exp(
      "Le quotient d'exponentielles se traduit par une différence d'exposants.",
      "$\\dfrac{e^x}{e^y} = e^{x-y}$.",
      "C'est la propriété du quotient.",
      "$e^{x-y}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "proprietes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_prop_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi est égal $\\left(e^{x}\\right)^{n}$ ?",
    format: "qcm",
    choices: ["$e^{nx}$", "$e^{x^n}$", "$n e^{x}$", "$e^{x+n}$"],
    expected: ["$e^{nx}$"],
    comparator: "mcq_exact",
    hint: "Puissance → produit des exposants.",
    explanation: exp(
      "Élever une exponentielle à une puissance multiplie l'exposant.",
      "$\\left(e^x\\right)^n = e^{nx}$.",
      "C'est la propriété de la puissance.",
      "$e^{nx}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "proprietes", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_exp_prop_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 2,
    theme: "neutral",
    hint: "Produit → somme des exposants.",
    tags: ["premiere", "maths", "exponentielle", "proprietes", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(2, 6);
      const correct = `$e^{${a + b}}$`;
      const choices = [correct, `$e^{${a * b}}$`, `$e^{${Math.abs(a - b)}}$`, `$2e^{${a + b}}$`];
      return {
        text: `Simplifie $e^{${a}} \\times e^{${b}}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On ajoute les exposants.",
          `$e^{${a}} \\times e^{${b}} = e^{${a} + ${b}}$.`,
          `$= e^{${a + b}}$.`,
          `$e^{${a + b}}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_prop_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "Quotient → différence des exposants.",
    tags: ["premiere", "maths", "exponentielle", "proprietes", "template"],
    generate: () => {
      const a = randomInt(5, 9);
      const b = randomInt(1, 4);
      const correct = `$e^{${a - b}}$`;
      const choices = [correct, `$e^{${a + b}}$`, `$e^{${a * b}}$`, `$e^{${a}/${b}}$`];
      return {
        text: `Simplifie $\\dfrac{e^{${a}}}{e^{${b}}}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On soustrait les exposants.",
          `$\\dfrac{e^{${a}}}{e^{${b}}} = e^{${a} - ${b}}$.`,
          `$= e^{${a - b}}$.`,
          `$e^{${a - b}}$.`
        ),
      };
    },
  },

  /* ===================== EXP_SIMPLIFIER ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_simp_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Simplifie $e^x \\times e^{-x}$.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Somme des exposants : $x + (-x)$.",
    explanation: exp(
      "On ajoute les exposants.",
      "$e^x \\times e^{-x} = e^{x - x} = e^0$.",
      "$= 1$.",
      "$e^x \\times e^{-x} = 1$."
    ),
    tags: ["premiere", "maths", "exponentielle", "simplifier", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_simp_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $\\dfrac{e^{2x} \\times e^{3x}}{e^{x}}$.",
    format: "qcm",
    choices: ["$e^{4x}$", "$e^{6x}$", "$e^{5x}$", "$e^{x}$"],
    expected: ["$e^{4x}$"],
    comparator: "mcq_exact",
    hint: "$2x + 3x - x$.",
    explanation: exp(
      "On combine les exposants : produit → somme, quotient → différence.",
      "$\\dfrac{e^{2x} \\times e^{3x}}{e^x} = e^{2x + 3x - x}$.",
      "$= e^{4x}$.",
      "$e^{4x}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "simplifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_simp_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $\\left(e^{x}\\right)^{3} \\times e^{x}$.",
    format: "qcm",
    choices: ["$e^{4x}$", "$e^{3x}$", "$e^{x^3}$", "$e^{3x^2}$"],
    expected: ["$e^{4x}$"],
    comparator: "mcq_exact",
    hint: "$(e^x)^3 = e^{3x}$.",
    explanation: exp(
      "On applique la puissance puis le produit.",
      "$(e^x)^3 = e^{3x}$, puis $e^{3x} \\times e^x = e^{3x + x}$.",
      "$= e^{4x}$.",
      "$e^{4x}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "simplifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_simp_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 4,
    theme: "neutral",
    text: "Simplifie $\\dfrac{1}{e^{-2x}}$.",
    format: "qcm",
    choices: ["$e^{2x}$", "$e^{-2x}$", "$-e^{2x}$", "$\\dfrac{1}{e^{2x}}$"],
    expected: ["$e^{2x}$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{1}{e^{a}} = e^{-a}$.",
    explanation: exp(
      "L'inverse d'une exponentielle change le signe de l'exposant.",
      "$\\dfrac{1}{e^{-2x}} = e^{-(-2x)}$.",
      "$= e^{2x}$.",
      "$e^{2x}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "simplifier", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_exp_simp_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne et soustrais les exposants.",
    tags: ["premiere", "maths", "exponentielle", "simplifier", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(2, 5);
      const c = randomInt(1, 3);
      const k = a + b - c;
      const correct = `$e^{${k}x}$`;
      const choices = [correct, `$e^{${a + b + c}x}$`, `$e^{${a + b}x}$`, `$e^{${k}x^2}$`];
      return {
        text: `Simplifie $\\dfrac{e^{${a}x} \\times e^{${b}x}}{e^{${c}x}}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Produit → somme, quotient → différence des exposants.",
          `$e^{${a}x + ${b}x - ${c}x}$.`,
          `$= e^{${k}x}$.`,
          `$e^{${k}x}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_simp_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Exposants opposés → $e^0 = 1$.",
    tags: ["premiere", "maths", "exponentielle", "simplifier", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      return {
        text: `Simplifie $e^{${a}x} \\times e^{-${a}x}$.`,
        format: "short",
        expected: ["1"],
        comparator: "number_equal",
        explanation: exp(
          "On ajoute les exposants.",
          `$e^{${a}x - ${a}x} = e^0$.`,
          "$= 1$.",
          "Le résultat est $1$."
        ),
      };
    },
  },

  /* ===================== EXP_DERIVEE ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = e^x$ ?",
    format: "qcm",
    choices: ["$f'(x) = e^x$", "$f'(x) = x e^{x-1}$", "$f'(x) = e^{x-1}$", "$f'(x) = 1$"],
    expected: ["$f'(x) = e^x$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle est sa propre dérivée.",
    explanation: exp(
      "La fonction exponentielle est définie comme égale à sa dérivée.",
      "$(e^x)' = e^x$.",
      "Avec $e^0 = 1$.",
      "$f'(x) = e^x$."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le signe de $e^x$ sur $\\mathbb{R}$ ?",
    format: "qcm",
    choices: ["toujours strictement positif", "toujours négatif", "positif puis négatif", "nul en $0$"],
    expected: ["toujours strictement positif"],
    comparator: "mcq_exact",
    hint: "La courbe est au-dessus de l'axe des abscisses.",
    explanation: exp(
      "L'exponentielle ne s'annule jamais et reste au-dessus de l'axe des $x$.",
      "Pour tout réel $x$, $e^x > 0$.",
      "Elle est donc strictement positive sur $\\mathbb{R}$.",
      "Toujours strictement positif."
    ),
    canvas: courbeExp,
    tags: ["premiere", "maths", "exponentielle", "derivee", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction $x \\mapsto e^x$ est :",
    format: "qcm",
    choices: ["strictement croissante sur $\\mathbb{R}$", "décroissante", "constante", "croissante puis décroissante"],
    expected: ["strictement croissante sur $\\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "Sa dérivée $e^x$ est positive.",
    explanation: exp(
      "Le sens de variation se déduit du signe de la dérivée.",
      "$(e^x)' = e^x > 0$ sur $\\mathbb{R}$.",
      "Une dérivée strictement positive donne une fonction strictement croissante.",
      "Strictement croissante sur $\\mathbb{R}$."
    ),
    canvas: courbeExp,
    tags: ["premiere", "maths", "exponentielle", "derivee", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = e^{3x}$ ?",
    format: "qcm",
    choices: ["$f'(x) = 3e^{3x}$", "$f'(x) = e^{3x}$", "$f'(x) = 3x e^{3x}$", "$f'(x) = e^{3}$"],
    expected: ["$f'(x) = 3e^{3x}$"],
    comparator: "mcq_exact",
    hint: "Dérivée de $e^{ax+b}$ : $a e^{ax+b}$.",
    explanation: exp(
      "La dérivée de $x \\mapsto e^{ax+b}$ est $a\\,e^{ax+b}$.",
      "Ici $a = 3$.",
      "$f'(x) = 3e^{3x}$.",
      "$f'(x) = 3e^{3x}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_exp_der_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 4,
    theme: "neutral",
    hint: "$(e^{ax})' = a e^{ax}$.",
    tags: ["premiere", "maths", "exponentielle", "derivee", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const correct = `$f'(x) = ${a}e^{${a}x}$`;
      const choices = [correct, `$f'(x) = e^{${a}x}$`, `$f'(x) = ${a}x e^{${a}x}$`, `$f'(x) = ${a}e^{x}$`];
      return {
        text: `Quelle est la dérivée de $f(x) = e^{${a}x}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise $(e^{ax})' = a e^{ax}$.",
          `Ici $a = ${a}$.`,
          `$f'(x) = ${a}e^{${a}x}$.`,
          `${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_der_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 3,
    theme: "neutral",
    hint: "$(k e^x)' = k e^x$.",
    tags: ["premiere", "maths", "exponentielle", "derivee", "template"],
    generate: () => {
      const k = randomInt(2, 8);
      const correct = `$f'(x) = ${k}e^{x}$`;
      const choices = [correct, `$f'(x) = e^{x}$`, `$f'(x) = ${k}x e^{x}$`, `$f'(x) = ${k}$`];
      return {
        text: `Quelle est la dérivée de $f(x) = ${k}e^{x}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On garde le coefficient et $e^x$ reste sa propre dérivée.",
          `$(${k}e^x)' = ${k}e^x$.`,
          "Le coefficient ne change pas.",
          `${correct}.`
        ),
      };
    },
  },

  /* ===================== EXP_MODELISATION ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 2,
    theme: "neutral",
    text: "Une quantité modélisée par $N(t) = N_0 e^{kt}$ avec $k > 0$ correspond à :",
    format: "qcm",
    choices: ["une croissance exponentielle", "une décroissance", "une fonction constante", "une fonction affine"],
    expected: ["une croissance exponentielle"],
    comparator: "mcq_exact",
    hint: "$k > 0$ : l'exposant augmente.",
    explanation: exp(
      "Le signe de $k$ détermine croissance ou décroissance.",
      "Si $k > 0$, $e^{kt}$ augmente avec $t$.",
      "C'est une croissance exponentielle.",
      "Une croissance exponentielle."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 3,
    theme: "neutral",
    text: "La masse d'un échantillon radioactif est $m(t) = 100 e^{-0{,}2t}$. Que vaut $m(0)$ ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "$e^0 = 1$.",
    explanation: exp(
      "On remplace $t$ par $0$.",
      "$m(0) = 100 \\times e^{0} = 100 \\times 1$.",
      "$= 100$.",
      "$m(0) = 100$."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $m(t) = 100 e^{-0{,}2t}$ (décroissance radioactive), la masse :",
    format: "qcm",
    choices: ["diminue au cours du temps", "augmente", "reste constante", "devient négative"],
    expected: ["diminue au cours du temps"],
    comparator: "mcq_exact",
    hint: "Exposant négatif.",
    explanation: exp(
      "Le coefficient dans l'exposant est $k = -0{,}2 < 0$.",
      "Donc $e^{-0{,}2t}$ décroît quand $t$ augmente.",
      "La masse diminue au cours du temps.",
      "Elle diminue au cours du temps."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 3,
    theme: "neutral",
    text: "Un capital de $2000$ € placé à intérêts continus suit $C(t) = 2000 e^{0{,}03t}$. Que vaut le capital initial $C(0)$ ?",
    format: "short",
    expected: ["2000"],
    comparator: "number_equal",
    hint: "$e^0 = 1$.",
    explanation: exp(
      "Le capital initial correspond à $t = 0$.",
      "$C(0) = 2000 \\times e^0 = 2000 \\times 1$.",
      "$= 2000$.",
      "$C(0) = 2000$ €."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 4,
    theme: "neutral",
    text: "Pour tout réel $a$, la suite $(e^{na})_{n}$ est :",
    format: "qcm",
    choices: [
      "géométrique de raison $e^a$",
      "arithmétique de raison $a$",
      "constante",
      "géométrique de raison $a$",
    ],
    expected: ["géométrique de raison $e^a$"],
    comparator: "mcq_exact",
    hint: "$e^{(n+1)a} = e^{na} \\times e^a$.",
    explanation: exp(
      "On compare deux termes consécutifs.",
      "$e^{(n+1)a} = e^{na} \\times e^{a}$ : on multiplie par $e^a$.",
      "C'est donc une suite géométrique de raison $e^a$.",
      "Géométrique de raison $e^a$."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_exp_mod_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 3,
    theme: "neutral",
    hint: "Valeur initiale : remplace $t$ par $0$ et $e^0 = 1$.",
    tags: ["premiere", "maths", "exponentielle", "modelisation", "template"],
    generate: () => {
      const n0 = randomInt(2, 9) * 100;
      const k = randomInt(1, 4);
      return {
        text: `Une population est modélisée par $N(t) = ${n0} e^{0{,}0${k}t}$. Quelle est la population initiale $N(0)$ ?`,
        format: "short",
        expected: [String(n0)],
        comparator: "number_equal",
        explanation: exp(
          "La valeur initiale correspond à $t = 0$.",
          `$N(0) = ${n0} \\times e^0 = ${n0} \\times 1$.`,
          `$= ${n0}$.`,
          `$N(0) = ${n0}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_mod_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 3,
    theme: "neutral",
    hint: "Signe de $k$ : croissance si $k>0$, décroissance si $k<0$.",
    tags: ["premiere", "maths", "exponentielle", "modelisation", "template"],
    generate: () => {
      const croissance = randomInt(0, 1) === 1;
      const k = randomInt(1, 5);
      const correct = croissance ? "croissance exponentielle" : "décroissance exponentielle";
      return {
        text: `Une grandeur suit $G(t) = G_0 e^{${croissance ? "" : "-"}0{,}${k}t}$. Cela modélise une :`,
        format: "qcm",
        choices: ["croissance exponentielle", "décroissance exponentielle", "fonction constante", "fonction affine"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le signe du coefficient dans l'exposant donne le sens.",
          `Ici le coefficient est ${croissance ? "positif" : "négatif"}.`,
          `Donc c'est une ${correct}.`,
          `Une ${correct}.`
        ),
      };
    },
  },
];
