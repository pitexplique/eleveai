// lib/tutor-v4/questionBank/premiere-spe/maths/derivation.bank.ts
//
// Chapitre : Dérivation (notion "derivation")
// microSkills :
//   der_taux       — taux de variation et nombre dérivé
//   der_usuelles   — dérivées des fonctions usuelles
//   der_operations — dérivée d'une somme, d'un produit, d'un quotient
//   der_tangente   — équation de la tangente en un point
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM. Canvas : fonctionGraphique (courbe + tangente).

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

// Parabole y = x² + bx + c avec sa tangente au point d'abscisse a.
function tangente(b: number, c: number, a: number): CanvasFigure {
  const fa = a * a + b * a + c;
  const pente = 2 * a + b; // dérivée de x²+bx+c
  const ord = fa - pente * a; // y = pente·x + ord
  return {
    kind: "fonctionGraphique",
    size: { width: 320, height: 320 },
    xmin: -5,
    xmax: 5,
    ymin: -6,
    ymax: 10,
    grille: true,
    courbes: [
      { id: "f", type: "quadratique", a: 1, b, c, couleur: "#2563eb" },
      { id: "t", type: "affine", a: pente, b: ord, couleur: "#dc2626" },
    ],
    misesEnEvidence: [{ point: { x: a, y: Math.round(fa * 100) / 100, label: "A", couleur: "#16a34a" } }],
  };
}

export const derivationBank: TutorBankItemV4[] = [
  /* ===================== DER_TAUX ===================== */
  {
    kind: "fixed",
    id: "premiere_der_taux_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 2,
    theme: "neutral",
    text: "Le taux de variation de $f$ entre $a$ et $b$ s'écrit :",
    format: "qcm",
    choices: [
      "$\\dfrac{f(b) - f(a)}{b - a}$",
      "$\\dfrac{f(b) + f(a)}{b - a}$",
      "$\\dfrac{b - a}{f(b) - f(a)}$",
      "$f(b) - f(a)$",
    ],
    expected: ["$\\dfrac{f(b) - f(a)}{b - a}$"],
    comparator: "mcq_exact",
    hint: "Variation des images divisée par variation des $x$.",
    explanation: exp(
      "Le taux de variation mesure la variation moyenne entre deux points.",
      "On divise la variation des images par la variation des abscisses.",
      "$\\dfrac{f(b) - f(a)}{b - a}$.",
      "$\\dfrac{f(b) - f(a)}{b - a}$."
    ),
    tags: ["premiere", "maths", "derivation", "taux", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_taux_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $f(x) = x^2$, calcule le taux de variation entre $a = 1$ et $b = 3$.",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$\\dfrac{f(3) - f(1)}{3 - 1}$.",
    explanation: exp(
      "On applique la formule du taux de variation.",
      "$\\dfrac{f(3) - f(1)}{3 - 1} = \\dfrac{9 - 1}{2}$.",
      "$= \\dfrac{8}{2} = 4$.",
      "Le taux de variation vaut $4$."
    ),
    tags: ["premiere", "maths", "derivation", "taux", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_taux_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 3,
    theme: "neutral",
    text: "Le nombre dérivé $f'(a)$ s'interprète géométriquement comme :",
    format: "qcm",
    choices: [
      "la pente de la tangente en $a$",
      "l'ordonnée du point $A$",
      "l'aire sous la courbe",
      "la longueur de la courbe",
    ],
    expected: ["la pente de la tangente en $a$"],
    comparator: "mcq_exact",
    hint: "Tangente = « limite des sécantes ».",
    explanation: exp(
      "Le nombre dérivé est la limite des taux de variation quand $b \\to a$.",
      "Cette limite est la pente de la tangente à la courbe au point d'abscisse $a$.",
      "C'est le coefficient directeur de la tangente.",
      "La pente de la tangente en $a$."
    ),
    tags: ["premiere", "maths", "derivation", "taux", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_taux_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 3,
    theme: "sport",
    text: "Un cycliste parcourt $f(t)$ km en $t$ heures. Que représente le nombre dérivé $f'(2)$ ?",
    format: "qcm",
    choices: [
      "la vitesse instantanée à $t = 2$ h",
      "la distance totale",
      "le temps de pause",
      "la vitesse moyenne sur tout le trajet",
    ],
    expected: ["la vitesse instantanée à $t = 2$ h"],
    comparator: "mcq_exact",
    hint: "Dérivée d'une position = vitesse.",
    explanation: exp(
      "Le nombre dérivé est un taux de variation instantané.",
      "Pour une distance en fonction du temps, c'est une vitesse.",
      "$f'(2)$ est la vitesse instantanée à l'instant $t = 2$ h.",
      "La vitesse instantanée à $t = 2$ h."
    ),
    tags: ["premiere", "maths", "derivation", "taux", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_taux_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^2$, le taux entre $1$ et $1 + h$ vaut $2 + h$. Vers quoi tend-il quand $h \\to 0$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Remplace $h$ par $0$.",
    explanation: exp(
      "Le nombre dérivé est la limite du taux quand $h \\to 0$.",
      "Le taux vaut $2 + h$.",
      "Quand $h \\to 0$, $2 + h \\to 2$.",
      "$f'(1) = 2$."
    ),
    tags: ["premiere", "maths", "derivation", "taux", "short"],
  },
  {
    kind: "template",
    id: "premiere_der_taux_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\dfrac{f(b) - f(a)}{b - a}$ avec $f(x) = x^2$.",
    tags: ["premiere", "maths", "derivation", "taux", "template"],
    generate: () => {
      const a = randomInt(0, 3);
      const b = a + randomInt(1, 4);
      const taux = (b * b - a * a) / (b - a); // = a + b
      return {
        text: `Pour $f(x) = x^2$, calcule le taux de variation entre $a = ${a}$ et $b = ${b}$.`,
        format: "short",
        expected: [String(taux)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $\\dfrac{f(b) - f(a)}{b - a}$.",
          `$\\dfrac{${b}^2 - ${a}^2}{${b} - ${a}} = \\dfrac{${b * b - a * a}}{${b - a}}$.`,
          `$= ${taux}$.`,
          `Le taux de variation vaut $${taux}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_der_taux_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\dfrac{f(b) - f(a)}{b - a}$ pour une fonction affine.",
    tags: ["premiere", "maths", "derivation", "taux", "template"],
    generate: () => {
      const m = randomInt(2, 6);
      const p = randomInt(-3, 3);
      const a = randomInt(0, 2);
      const b = a + randomInt(2, 4);
      return {
        text: `Pour $f(x) = ${m}x ${p >= 0 ? "+ " + p : "- " + -p}$, calcule le taux de variation entre $${a}$ et $${b}$.`,
        format: "short",
        expected: [String(m)],
        comparator: "number_equal",
        explanation: exp(
          "Pour une fonction affine, le taux de variation est constant et vaut la pente.",
          `$f(x) = ${m}x ${p >= 0 ? "+ " + p : "- " + -p}$ a pour pente $${m}$.`,
          `Le taux est donc $${m}$.`,
          `Le taux de variation vaut $${m}$.`
        ),
      };
    },
  },

  /* ===================== DER_USUELLES ===================== */
  {
    kind: "fixed",
    id: "premiere_der_us_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x^2$ ?",
    format: "qcm",
    choices: ["$f'(x) = 2x$", "$f'(x) = x$", "$f'(x) = 2$", "$f'(x) = x^3$"],
    expected: ["$f'(x) = 2x$"],
    comparator: "mcq_exact",
    hint: "$(x^n)' = n x^{n-1}$.",
    explanation: exp(
      "On applique $(x^n)' = n x^{n-1}$.",
      "Ici $n = 2$.",
      "$f'(x) = 2x^{1} = 2x$.",
      "$f'(x) = 2x$."
    ),
    tags: ["premiere", "maths", "derivation", "usuelles", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_us_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x^3$ ?",
    format: "qcm",
    choices: ["$f'(x) = 3x^2$", "$f'(x) = 2x^2$", "$f'(x) = 3x$", "$f'(x) = x^2$"],
    expected: ["$f'(x) = 3x^2$"],
    comparator: "mcq_exact",
    hint: "$(x^n)' = n x^{n-1}$.",
    explanation: exp(
      "On applique $(x^n)' = n x^{n-1}$.",
      "Ici $n = 3$.",
      "$f'(x) = 3x^{2}$.",
      "$f'(x) = 3x^2$."
    ),
    tags: ["premiere", "maths", "derivation", "usuelles", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_us_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\dfrac{1}{x}$ ?",
    format: "qcm",
    choices: [
      "$f'(x) = -\\dfrac{1}{x^2}$",
      "$f'(x) = \\dfrac{1}{x^2}$",
      "$f'(x) = -\\dfrac{1}{x}$",
      "$f'(x) = \\ln(x)$",
    ],
    expected: ["$f'(x) = -\\dfrac{1}{x^2}$"],
    comparator: "mcq_exact",
    hint: "Dérivée de la fonction inverse.",
    explanation: exp(
      "La fonction inverse a une dérivée connue.",
      "$\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$.",
      "Le signe est négatif.",
      "$f'(x) = -\\dfrac{1}{x^2}$."
    ),
    tags: ["premiere", "maths", "derivation", "usuelles", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_us_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\sqrt{x}$ ?",
    format: "qcm",
    choices: [
      "$f'(x) = \\dfrac{1}{2\\sqrt{x}}$",
      "$f'(x) = \\dfrac{1}{\\sqrt{x}}$",
      "$f'(x) = 2\\sqrt{x}$",
      "$f'(x) = \\dfrac{1}{2}\\sqrt{x}$",
    ],
    expected: ["$f'(x) = \\dfrac{1}{2\\sqrt{x}}$"],
    comparator: "mcq_exact",
    hint: "Dérivée de la racine carrée.",
    explanation: exp(
      "La fonction racine carrée a une dérivée connue.",
      "$(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$.",
      "Définie pour $x > 0$.",
      "$f'(x) = \\dfrac{1}{2\\sqrt{x}}$."
    ),
    tags: ["premiere", "maths", "derivation", "usuelles", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_us_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée d'une fonction constante $f(x) = 7$ ?",
    format: "qcm",
    choices: ["$f'(x) = 0$", "$f'(x) = 7$", "$f'(x) = 1$", "$f'(x) = 7x$"],
    expected: ["$f'(x) = 0$"],
    comparator: "mcq_exact",
    hint: "Une constante ne varie pas.",
    explanation: exp(
      "La dérivée mesure la variation.",
      "Une fonction constante ne varie pas.",
      "Sa dérivée est nulle.",
      "$f'(x) = 0$."
    ),
    tags: ["premiere", "maths", "derivation", "usuelles", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_us_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = 5x + 3$ ?",
    format: "qcm",
    choices: ["$f'(x) = 5$", "$f'(x) = 5x$", "$f'(x) = 3$", "$f'(x) = 8$"],
    expected: ["$f'(x) = 5$"],
    comparator: "mcq_exact",
    hint: "Dérivée d'une fonction affine $ax + b$.",
    explanation: exp(
      "La dérivée d'une fonction affine $ax + b$ est la constante $a$.",
      "Ici $a = 5$.",
      "$f'(x) = 5$.",
      "$f'(x) = 5$."
    ),
    tags: ["premiere", "maths", "derivation", "usuelles", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_der_us_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 3,
    theme: "neutral",
    hint: "$(x^n)' = n x^{n-1}$.",
    tags: ["premiere", "maths", "derivation", "usuelles", "template"],
    generate: () => {
      const n = randomInt(2, 6);
      const correct = n === 2 ? "$f'(x) = 2x$" : `$f'(x) = ${n}x^{${n - 1}}$`;
      const choices = [
        correct,
        `$f'(x) = ${n}x^{${n}}$`,
        `$f'(x) = ${n - 1}x^{${n - 1}}$`,
        `$f'(x) = x^{${n - 1}}$`,
      ];
      return {
        text: `Quelle est la dérivée de $f(x) = x^{${n}}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique $(x^n)' = n x^{n-1}$.",
          `Ici $n = ${n}$.`,
          `$f'(x) = ${n}x^{${n - 1}}$.`,
          `${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_der_us_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 2,
    theme: "neutral",
    hint: "Dérivée de $ax + b$.",
    tags: ["premiere", "maths", "derivation", "usuelles", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(-5, 5);
      const correct = `$f'(x) = ${a}$`;
      const choices = [correct, `$f'(x) = ${a}x$`, `$f'(x) = ${b}$`, `$f'(x) = ${a + b}$`];
      return {
        text: `Quelle est la dérivée de $f(x) = ${a}x ${b >= 0 ? "+ " + b : "- " + -b}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée de $ax + b$ est $a$.",
          `Ici $a = ${a}$.`,
          `$f'(x) = ${a}$.`,
          `${correct}.`
        ),
      };
    },
  },

  /* ===================== DER_OPERATIONS ===================== */
  {
    kind: "fixed",
    id: "premiere_der_op_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x^2 + 3x$ ?",
    format: "qcm",
    choices: ["$f'(x) = 2x + 3$", "$f'(x) = 2x + 3x$", "$f'(x) = x + 3$", "$f'(x) = 2x$"],
    expected: ["$f'(x) = 2x + 3$"],
    comparator: "mcq_exact",
    hint: "$(u + v)' = u' + v'$.",
    explanation: exp(
      "La dérivée d'une somme est la somme des dérivées.",
      "$(x^2)' = 2x$ et $(3x)' = 3$.",
      "$f'(x) = 2x + 3$.",
      "$f'(x) = 2x + 3$."
    ),
    tags: ["premiere", "maths", "derivation", "operations", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_op_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = 3x^2 - 5x + 2$ ?",
    format: "qcm",
    choices: ["$f'(x) = 6x - 5$", "$f'(x) = 6x - 5 + 2$", "$f'(x) = 3x - 5$", "$f'(x) = 6x + 5$"],
    expected: ["$f'(x) = 6x - 5$"],
    comparator: "mcq_exact",
    hint: "Dérive terme à terme.",
    explanation: exp(
      "On dérive chaque terme.",
      "$(3x^2)' = 6x$, $(-5x)' = -5$, $(2)' = 0$.",
      "$f'(x) = 6x - 5$.",
      "$f'(x) = 6x - 5$."
    ),
    tags: ["premiere", "maths", "derivation", "operations", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_op_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 3,
    theme: "neutral",
    text: "La dérivée d'un produit $(uv)'$ est :",
    format: "qcm",
    choices: ["$u'v + uv'$", "$u'v'$", "$u'v - uv'$", "$u' + v'$"],
    expected: ["$u'v + uv'$"],
    comparator: "mcq_exact",
    hint: "Formule du produit.",
    explanation: exp(
      "La dérivée d'un produit n'est pas le produit des dérivées.",
      "On utilise $(uv)' = u'v + uv'$.",
      "Chaque facteur est dérivé à tour de rôle.",
      "$(uv)' = u'v + uv'$."
    ),
    tags: ["premiere", "maths", "derivation", "operations", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_op_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^2 - 4x + 1$, combien vaut $f'(3)$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Calcule $f'(x)$ puis remplace $x$ par $3$.",
    explanation: exp(
      "On dérive d'abord : $f'(x) = 2x - 4$.",
      "Puis on remplace $x$ par $3$.",
      "$f'(3) = 2 \\times 3 - 4 = 2$.",
      "$f'(3) = 2$."
    ),
    tags: ["premiere", "maths", "derivation", "operations", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_op_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x^3 - 2x^2$ ?",
    format: "qcm",
    choices: ["$f'(x) = 3x^2 - 4x$", "$f'(x) = 3x^2 - 2x$", "$f'(x) = 3x - 4x$", "$f'(x) = x^2 - 4x$"],
    expected: ["$f'(x) = 3x^2 - 4x$"],
    comparator: "mcq_exact",
    hint: "$(x^3)' = 3x^2$, $(2x^2)' = 4x$.",
    explanation: exp(
      "On dérive terme à terme.",
      "$(x^3)' = 3x^2$ et $(2x^2)' = 4x$.",
      "$f'(x) = 3x^2 - 4x$.",
      "$f'(x) = 3x^2 - 4x$."
    ),
    tags: ["premiere", "maths", "derivation", "operations", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_der_op_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 3,
    theme: "neutral",
    hint: "Dérive terme à terme.",
    tags: ["premiere", "maths", "derivation", "operations", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(1, 6);
      const c = randomInt(-5, 5);
      const correct = `$f'(x) = ${2 * a}x ${b >= 0 ? "+ " + b : "- " + -b}$`;
      const choices = [
        correct,
        `$f'(x) = ${a}x ${b >= 0 ? "+ " + b : "- " + -b}$`,
        `$f'(x) = ${2 * a}x ${b >= 0 ? "+ " + b : "- " + -b} ${c >= 0 ? "+ " + c : "- " + -c}$`,
        `$f'(x) = ${2 * a}x$`,
      ];
      return {
        text: `Quelle est la dérivée de $f(x) = ${a}x^2 ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On dérive chaque terme et la constante disparaît.",
          `$(${a}x^2)' = ${2 * a}x$, $(${b}x)' = ${b}$, $(${c})' = 0$.`,
          `$f'(x) = ${2 * a}x ${b >= 0 ? "+ " + b : "- " + -b}$.`,
          `${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_der_op_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 4,
    theme: "neutral",
    hint: "Dérive puis remplace.",
    tags: ["premiere", "maths", "derivation", "operations", "template"],
    generate: () => {
      const b = randomInt(-6, 6);
      const k = randomInt(1, 4);
      const val = 2 * k + b;
      return {
        text: `Pour $f(x) = x^2 ${b >= 0 ? "+ " + b : "- " + -b}x$, combien vaut $f'(${k})$ ?`,
        format: "short",
        expected: [String(val)],
        comparator: "number_equal",
        explanation: exp(
          "On dérive : $f'(x) = 2x " + (b >= 0 ? "+ " + b : "- " + -b) + "$.",
          `Puis on remplace $x$ par $${k}$.`,
          `$f'(${k}) = 2 \\times ${k} ${b >= 0 ? "+ " + b : "- " + -b} = ${val}$.`,
          `$f'(${k}) = ${val}$.`
        ),
      };
    },
  },

  /* ===================== DER_TANGENTE ===================== */
  {
    kind: "fixed",
    id: "premiere_der_tan_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 2,
    theme: "neutral",
    text: "L'équation de la tangente à $\\mathcal{C}_f$ au point d'abscisse $a$ est :",
    format: "qcm",
    choices: [
      "$y = f'(a)(x - a) + f(a)$",
      "$y = f(a)(x - a) + f'(a)$",
      "$y = f'(a)x + f(a)$",
      "$y = f'(a)(x + a) - f(a)$",
    ],
    expected: ["$y = f'(a)(x - a) + f(a)$"],
    comparator: "mcq_exact",
    hint: "Pente $f'(a)$, passe par $(a ; f(a))$.",
    explanation: exp(
      "La tangente a pour pente le nombre dérivé $f'(a)$ et passe par $(a ; f(a))$.",
      "On écrit l'équation d'une droite de pente $f'(a)$ passant par ce point.",
      "$y = f'(a)(x - a) + f(a)$.",
      "$y = f'(a)(x - a) + f(a)$."
    ),
    tags: ["premiere", "maths", "derivation", "tangente", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_tan_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = x^2$. Quelle est la pente de la tangente au point d'abscisse $a = 2$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Pente $= f'(2)$ avec $f'(x) = 2x$.",
    explanation: exp(
      "La pente de la tangente est le nombre dérivé $f'(a)$.",
      "$f'(x) = 2x$, donc $f'(2) = 4$.",
      "La pente vaut $4$.",
      "Pente $= 4$."
    ),
    canvas: tangente(0, 0, 2),
    tags: ["premiere", "maths", "derivation", "tangente", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_tan_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^2$. Quelle est l'équation de la tangente en $a = 1$ ?",
    format: "qcm",
    choices: ["$y = 2x - 1$", "$y = 2x + 1$", "$y = x - 1$", "$y = 2x$"],
    expected: ["$y = 2x - 1$"],
    comparator: "mcq_exact",
    hint: "$f(1) = 1$, $f'(1) = 2$.",
    explanation: exp(
      "On utilise $y = f'(a)(x - a) + f(a)$.",
      "$f(1) = 1$ et $f'(1) = 2$ : $y = 2(x - 1) + 1$.",
      "$y = 2x - 2 + 1 = 2x - 1$.",
      "$y = 2x - 1$."
    ),
    canvas: tangente(0, 0, 1),
    tags: ["premiere", "maths", "derivation", "tangente", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_tan_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 3,
    theme: "neutral",
    text: "Si $f'(a) = 0$, la tangente au point d'abscisse $a$ est :",
    format: "qcm",
    choices: ["horizontale", "verticale", "de pente $1$", "confondue avec l'axe des ordonnées"],
    expected: ["horizontale"],
    comparator: "mcq_exact",
    hint: "Pente nulle.",
    explanation: exp(
      "La pente de la tangente est $f'(a)$.",
      "Si $f'(a) = 0$, la pente est nulle.",
      "Une droite de pente nulle est horizontale.",
      "La tangente est horizontale."
    ),
    tags: ["premiere", "maths", "derivation", "tangente", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_tan_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^2 - 2x$. Quelle est l'ordonnée à l'origine de la tangente en $a = 0$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Tangente : $y = f'(0)(x - 0) + f(0)$.",
    explanation: exp(
      "On écrit la tangente en $a = 0$.",
      "$f(0) = 0$, $f'(x) = 2x - 2$ donc $f'(0) = -2$ : $y = -2x + 0$.",
      "L'ordonnée à l'origine est $f(0) = 0$.",
      "Ordonnée à l'origine $= 0$."
    ),
    canvas: tangente(-2, 0, 0),
    tags: ["premiere", "maths", "derivation", "tangente", "canvas", "short"],
  },
  {
    kind: "template",
    id: "premiere_der_tan_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 3,
    theme: "neutral",
    hint: "Pente $= f'(a) = 2a$ pour $f(x) = x^2$.",
    tags: ["premiere", "maths", "derivation", "tangente", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      const pente = 2 * a;
      return {
        text: `Soit $f(x) = x^2$. Quelle est la pente de la tangente au point d'abscisse $a = ${a}$ ?`,
        format: "short",
        expected: [String(pente)],
        comparator: "number_equal",
        explanation: exp(
          "La pente de la tangente est $f'(a)$.",
          `$f'(x) = 2x$, donc $f'(${a}) = ${pente}$.`,
          `La pente vaut $${pente}$.`,
          `Pente $= ${pente}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_der_tan_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 4,
    theme: "neutral",
    hint: "$y = f'(a)(x - a) + f(a)$.",
    tags: ["premiere", "maths", "derivation", "tangente", "template"],
    generate: () => {
      const a = randomInt(1, 3);
      const pente = 2 * a;
      const fa = a * a;
      const ord = fa - pente * a; // = -a²
      const correct = `$y = ${pente}x ${ord >= 0 ? "+ " + ord : "- " + -ord}$`;
      const choices = [
        correct,
        `$y = ${pente}x ${fa >= 0 ? "+ " + fa : "- " + -fa}$`,
        `$y = ${a}x ${ord >= 0 ? "+ " + ord : "- " + -ord}$`,
        `$y = ${pente}x$`,
      ];
      return {
        text: `Soit $f(x) = x^2$. Quelle est l'équation de la tangente en $a = ${a}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise $y = f'(a)(x - a) + f(a)$.",
          `$f(${a}) = ${fa}$ et $f'(${a}) = ${pente}$ : $y = ${pente}(x - ${a}) + ${fa}$.`,
          `$y = ${pente}x ${ord >= 0 ? "+ " + ord : "- " + -ord}$.`,
          `${correct}.`
        ),
      };
    },
  },
];
