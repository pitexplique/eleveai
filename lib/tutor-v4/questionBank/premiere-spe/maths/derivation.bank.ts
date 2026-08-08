// lib/tutor-v4/questionBank/premiere-spe/maths/derivation.bank.ts
//
// Chapitre : Dérivation (notion "derivation")
// microSkills :
//   der_taux       — taux de variation et nombre dérivé
//   der_usuelles   — dérivées des fonctions usuelles
//   der_operations — dérivée d'une somme, d'un produit, d'un quotient
//   der_tangente   — équation de la tangente en un point
//
// PÉRIMÈTRE BO Première spé. Conventions : LaTeX, règle QCM. Canvas : fonctionGraphique (courbe + tangente).

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

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


function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickOne<T>(arr: readonly T[]): T {
  return arr[randomInt(0, arr.length - 1)];
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
    microId: "der_interpreter",
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
    microId: "der_interpreter",
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
    microId: "der_nombre_derive",
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
    kind: "fixed",
    id: "premiere_der_taux_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $f(x) = 3x + 1$, calcule le taux de variation entre $a = 2$ et $b = 5$.",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$\\dfrac{f(5) - f(2)}{5 - 2}$.",
    explanation: exp(
      "Le taux de variation est $\\dfrac{f(b) - f(a)}{b - a}$.",
      "$f(2) = 7$ et $f(5) = 16$ : $\\dfrac{16 - 7}{5 - 2}$.",
      "$= \\dfrac{9}{3} = 3$. Pour une fonction affine, le taux vaut toujours le coefficient directeur.",
      "Le taux de variation vaut $3$."
    ),
    tags: ["premiere", "maths", "derivation", "taux", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_taux_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $f(x) = x^2$, calcule le taux de variation entre $a = 2$ et $b = 4$.",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "$\\dfrac{16 - 4}{4 - 2}$.",
    explanation: exp(
      "Le taux de variation est $\\dfrac{f(b) - f(a)}{b - a}$.",
      "$f(2) = 4$ et $f(4) = 16$ : $\\dfrac{16 - 4}{4 - 2}$.",
      "$= \\dfrac{12}{2} = 6$.",
      "Le taux de variation vaut $6$."
    ),
    tags: ["premiere", "maths", "derivation", "taux", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_taux_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 3,
    theme: "sport",
    text: "Une coureuse parcourt $d(t)$ mètres en $t$ secondes. Que représente le taux de variation de $d$ entre $t = 0$ et $t = 10$ ?",
    format: "qcm",
    choices: [
      "sa vitesse moyenne sur ces $10$ secondes",
      "sa vitesse au bout de $10$ secondes",
      "la distance totale parcourue",
      "son accélération",
    ],
    expected: ["sa vitesse moyenne sur ces $10$ secondes"],
    comparator: "mcq_exact",
    hint: "Un taux se calcule ENTRE deux instants, pas à un instant précis.",
    explanation: exp(
      "Le taux de variation est $\\dfrac{d(10) - d(0)}{10 - 0}$, c'est-à-dire une distance divisée par une durée.",
      "Comme il porte sur un intervalle, il donne une valeur MOYENNE sur cet intervalle.",
      "La vitesse à un instant précis, elle, correspond au nombre dérivé $d'(10)$.",
      "C'est sa vitesse moyenne sur ces $10$ secondes."
    ),
    tags: ["premiere", "maths", "derivation", "taux", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_taux_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_nombre_derive",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^2$, le taux entre $3$ et $3 + h$ vaut $6 + h$. Combien vaut $f'(3)$ ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Le nombre dérivé est la limite du taux quand $h \\to 0$.",
    explanation: exp(
      "Le nombre dérivé $f'(a)$ est la limite du taux de variation quand $h$ tend vers $0$.",
      "Ici le taux vaut $6 + h$.",
      "Quand $h \\to 0$, $6 + h \\to 6$.",
      "$f'(3) = 6$."
    ),
    tags: ["premiere", "maths", "derivation", "taux", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_taux_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 4,
    theme: "reunion",
    text: "Un randonneur monte au Piton de la Fournaise. Son altitude est de $1800$ m après $1$ h et de $2400$ m après $3$ h. Quelle est sa vitesse moyenne d'ascension, en mètres par heure ?",
    format: "short",
    expected: ["300"],
    comparator: "number_equal",
    hint: "Dénivelé divisé par durée : attention, la durée est de $2$ h.",
    explanation: exp(
      "La vitesse moyenne d'ascension est le taux de variation de l'altitude entre les deux instants.",
      "$\\dfrac{2400 - 1800}{3 - 1}$.",
      "$= \\dfrac{600}{2} = 300$. (Diviser par $3$ au lieu de $2$ est l'erreur courante : on divise par la DURÉE écoulée.)",
      "Il monte de $300$ mètres par heure en moyenne."
    ),
    tags: ["premiere", "maths", "derivation", "taux", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_taux_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_nombre_derive",
    difficulty: 5,
    theme: "neutral",
    text: "Le nombre dérivé $f'(a)$ est la limite, quand $h \\to 0$, de :",
    format: "qcm",
    choices: [
      "$\\dfrac{f(a + h) - f(a)}{h}$",
      "$\\dfrac{f(a + h) - f(a)}{a}$",
      "$f(a + h) - f(a)$",
      "$\\dfrac{f(a)}{h}$",
    ],
    expected: ["$\\dfrac{f(a + h) - f(a)}{h}$"],
    comparator: "mcq_exact",
    hint: "Au numérateur l'écart des images, au dénominateur l'écart des abscisses.",
    explanation: exp(
      "Le nombre dérivé est la limite du taux de variation entre $a$ et $a + h$.",
      "L'écart des abscisses vaut $(a + h) - a = h$ : c'est lui qui va au dénominateur.",
      "D'où $f'(a) = \\lim\\limits_{h \\to 0} \\dfrac{f(a + h) - f(a)}{h}$. Sans le $h$ au dénominateur, la limite vaudrait toujours $0$.",
      "$f'(a) = \\lim\\limits_{h \\to 0} \\dfrac{f(a + h) - f(a)}{h}$."
    ),
    tags: ["premiere", "maths", "derivation", "taux", "qcm"],
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
    id: "premiere_der_us_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x$ ?",
    format: "qcm",
    choices: ["$f'(x) = 1$", "$f'(x) = 0$", "$f'(x) = x$", "$f'(x) = 2x$"],
    expected: ["$f'(x) = 1$"],
    comparator: "mcq_exact",
    hint: "C'est la fonction affine $1 \\times x + 0$.",
    explanation: exp(
      "La dérivée d'une fonction affine $ax + b$ est $a$.",
      "$f(x) = x$ s'écrit $1 \\times x + 0$, donc $a = 1$.",
      "$f'(x) = 1$. (C'est $0$ pour une CONSTANTE, pas pour $x$.)",
      "$f'(x) = 1$."
    ),
    tags: ["premiere", "maths", "derivation", "usuelles", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_us_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^n$ (avec $n$ entier, $n \\ge 1$), quelle est la dérivée ?",
    format: "qcm",
    choices: [
      "$f'(x) = n x^{n-1}$",
      "$f'(x) = n x^{n+1}$",
      "$f'(x) = x^{n-1}$",
      "$f'(x) = (n-1) x^n$",
    ],
    expected: ["$f'(x) = n x^{n-1}$"],
    comparator: "mcq_exact",
    hint: "Vérifie sur un cas connu : pour $n = 2$, on doit retrouver $2x$.",
    explanation: exp(
      "C'est la formule générale de dérivation des puissances.",
      "L'exposant descend en facteur devant, et l'exposant restant diminue de $1$.",
      "Contrôle sur $n = 2$ : $f'(x) = 2x^1 = 2x$, ce qui est bien la dérivée de $x^2$.",
      "$f'(x) = n x^{n-1}$."
    ),
    tags: ["premiere", "maths", "derivation", "usuelles", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_us_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 5,
    theme: "neutral",
    text: "Sur quel intervalle la fonction $f(x) = \\sqrt{x}$ est-elle dérivable ?",
    format: "qcm",
    choices: [
      "$]0 ; +\\infty[$",
      "$[0 ; +\\infty[$",
      "$\\mathbb{R}$",
      "$]-\\infty ; 0[$",
    ],
    expected: ["$]0 ; +\\infty[$"],
    comparator: "mcq_exact",
    hint: "Regarde la formule $f'(x) = \\dfrac{1}{2\\sqrt{x}}$ : que se passe-t-il en $0$ ?",
    explanation: exp(
      "La dérivée de $\\sqrt{x}$ est $\\dfrac{1}{2\\sqrt{x}}$.",
      "Cette expression exige $\\sqrt{x} \\neq 0$, donc $x \\neq 0$, en plus de $x \\ge 0$.",
      "La fonction est DÉFINIE en $0$ mais n'y est pas dérivable : sa courbe y a une tangente verticale.",
      "Elle est dérivable sur $]0 ; +\\infty[$."
    ),
    tags: ["premiere", "maths", "derivation", "usuelles", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_us_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 4,
    theme: "neutral",
    text: "La dérivée de $f(x) = \\dfrac{1}{x}$ est $f'(x) = -\\dfrac{1}{x^2}$. Quel est son signe sur $]0 ; +\\infty[$ ?",
    format: "qcm",
    choices: [
      "négatif : la fonction est décroissante",
      "positif : la fonction est croissante",
      "nul : la fonction est constante",
      "il change de signe en $x = 1$",
    ],
    expected: ["négatif : la fonction est décroissante"],
    comparator: "mcq_exact",
    hint: "$x^2$ est toujours positif ; le signe vient du « moins » devant.",
    explanation: exp(
      "Le signe de la dérivée donne le sens de variation de la fonction.",
      "$x^2 > 0$ pour tout $x \\neq 0$, donc $-\\dfrac{1}{x^2}$ est toujours NÉGATIF.",
      "La fonction inverse est donc décroissante sur $]0 ; +\\infty[$ (et aussi sur $]-\\infty ; 0[$).",
      "La dérivée est négative : la fonction est décroissante."
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
      // $b$ ni nul — sinon « on a additionné les deux coefficients » donne la
      // bonne réponse — ni égal à $a$, sinon c'est « on a gardé l'ordonnée à
      // l'origine » qui la donne.
      const b = pickOne([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].filter((v) => v !== a));
      const correct = `$f'(x) = ${a}$`;
      const choices = makeChoices(correct, [
        `$f'(x) = ${a}x$`,
        `$f'(x) = ${b}$`,
        `$f'(x) = ${a + b}$`,
      ]);
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
    id: "premiere_der_op_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 4,
    theme: "neutral",
    text: "La dérivée d'un quotient $\\left(\\dfrac{u}{v}\\right)'$ est :",
    format: "qcm",
    choices: [
      "$\\dfrac{u'v - uv'}{v^2}$",
      "$\\dfrac{u'v + uv'}{v^2}$",
      "$\\dfrac{u'}{v'}$",
      "$\\dfrac{uv' - u'v}{v^2}$",
    ],
    expected: ["$\\dfrac{u'v - uv'}{v^2}$"],
    comparator: "mcq_exact",
    hint: "Le numérateur commence par $u'v$ : l'ordre compte, contrairement au produit.",
    explanation: exp(
      "La dérivée d'un quotient est $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.",
      "Contrairement au produit, la soustraction rend l'ORDRE des termes essentiel.",
      "Écrire $\\dfrac{uv' - u'v}{v^2}$ donne l'opposé du bon résultat, donc un sens de variation inversé.",
      "$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$."
    ),
    tags: ["premiere", "maths", "derivation", "operations", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_op_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^3 - 3x$, combien vaut $f'(2)$ ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Dérive d'abord, remplace ENSUITE par $2$.",
    explanation: exp(
      "On calcule d'abord la fonction dérivée, puis on l'évalue en $2$.",
      "$f'(x) = 3x^2 - 3$.",
      "$f'(2) = 3 \\times 4 - 3 = 12 - 3 = 9$.",
      "$f'(2) = 9$."
    ),
    tags: ["premiere", "maths", "derivation", "operations", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_op_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\dfrac{x}{x + 1}$ ?",
    format: "qcm",
    choices: [
      "$f'(x) = \\dfrac{1}{(x+1)^2}$",
      "$f'(x) = 1$",
      "$f'(x) = \\dfrac{-1}{(x+1)^2}$",
      "$f'(x) = \\dfrac{2x + 1}{(x+1)^2}$",
    ],
    expected: ["$f'(x) = \\dfrac{1}{(x+1)^2}$"],
    comparator: "mcq_exact",
    hint: "$u = x$, $v = x + 1$, donc $u' = 1$ et $v' = 1$.",
    explanation: exp(
      "On applique $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.",
      "Avec $u = x$, $u' = 1$, $v = x + 1$, $v' = 1$ : $f'(x) = \\dfrac{1 \\times (x+1) - x \\times 1}{(x+1)^2}$.",
      "$= \\dfrac{x + 1 - x}{(x+1)^2} = \\dfrac{1}{(x+1)^2}$.",
      "$f'(x) = \\dfrac{1}{(x+1)^2}$ : toujours positive, la fonction est donc croissante."
    ),
    tags: ["premiere", "maths", "derivation", "operations", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_op_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = 4\\sqrt{x}$ sur $]0 ; +\\infty[$ ?",
    format: "qcm",
    choices: [
      "$f'(x) = \\dfrac{2}{\\sqrt{x}}$",
      "$f'(x) = \\dfrac{4}{\\sqrt{x}}$",
      "$f'(x) = \\dfrac{1}{2\\sqrt{x}}$",
      "$f'(x) = 4\\sqrt{x}$",
    ],
    expected: ["$f'(x) = \\dfrac{2}{\\sqrt{x}}$"],
    comparator: "mcq_exact",
    hint: "Le coefficient $4$ reste en facteur : $4 \\times \\dfrac{1}{2\\sqrt{x}}$.",
    explanation: exp(
      "Multiplier une fonction par un nombre multiplie sa dérivée par ce même nombre : $(ku)' = k u'$.",
      "$(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$, donc $f'(x) = 4 \\times \\dfrac{1}{2\\sqrt{x}}$.",
      "$= \\dfrac{4}{2\\sqrt{x}} = \\dfrac{2}{\\sqrt{x}}$.",
      "$f'(x) = \\dfrac{2}{\\sqrt{x}}$."
    ),
    tags: ["premiere", "maths", "derivation", "operations", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_der_op_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 4,
    theme: "neutral",
    hint: "Dérive terme à terme : $(ax^3)' = 3ax^2$.",
    tags: ["premiere", "maths", "derivation", "operations", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      const b = pickOne([-4, -3, -2, 2, 3, 5]);
      const c = randomInt(-6, 6);
      const t = (k: number, s: string) => (k === 1 ? s : k === -1 ? "-" + s : `${k}${s}`);
      const correct = `$f'(x) = ${t(3 * a, "x^2")} ${2 * b >= 0 ? "+ " + t(2 * b, "x") : "- " + t(-2 * b, "x")}$`;
      return {
        text: `Quelle est la dérivée de $f(x) = ${t(a, "x^3")} ${b >= 0 ? "+ " + t(b, "x^2") : "- " + t(-b, "x^2")} ${c >= 0 ? "+ " + c : "- " + -c}$ ?`,
        format: "qcm",
        choices: [
          correct,
          `$f'(x) = ${t(3 * a, "x^2")} ${b >= 0 ? "+ " + t(b, "x") : "- " + t(-b, "x")}$`,
          `$f'(x) = ${t(a, "x^2")} ${2 * b >= 0 ? "+ " + t(2 * b, "x") : "- " + t(-2 * b, "x")}$`,
          `$f'(x) = ${t(3 * a, "x^2")} ${2 * b >= 0 ? "+ " + t(2 * b, "x") : "- " + t(-2 * b, "x")} ${c >= 0 ? "+ " + c : "- " + -c}$`,
        ].filter((v, i, tt) => tt.indexOf(v) === i),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée d'une somme est la somme des dérivées : on traite chaque terme séparément.",
          `$(${t(a, "x^3")})' = ${t(3 * a, "x^2")}$ et $(${t(b, "x^2")})' = ${t(2 * b, "x")}$.`,
          `La constante $${c}$ disparaît : sa courbe est horizontale, sa pente est nulle.`,
          `${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_der_op_tpl_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 5,
    theme: "neutral",
    hint: "$(uv)' = u'v + uv'$ — deux termes, jamais un seul.",
    tags: ["premiere", "maths", "derivation", "operations", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      const b = randomInt(-4, 4);
      const c = randomInt(1, 3);
      const d = randomInt(-4, 4);
      // (ax+b)(cx+d) → dérivée : 2ac x + (ad + bc)
      const p = 2 * a * c;
      const q = a * d + b * c;
      const t = (k: number, s: string) => (k === 1 ? s : k === -1 ? "-" + s : `${k}${s}`);
      const ecrire = (u: number, v: number) => `${t(u, "x")} ${v >= 0 ? "+ " + v : "- " + -v}`;
      const correct = `$f'(x) = ${t(p, "x")} ${q >= 0 ? "+ " + q : "- " + -q}$`;
      return {
        text: `Quelle est la dérivée de $f(x) = (${ecrire(a, b)})(${ecrire(c, d)})$ ?`,
        format: "qcm",
        choices: [
          correct,
          `$f'(x) = ${a * c}$`,
          `$f'(x) = ${t(a * c, "x")} ${q >= 0 ? "+ " + q : "- " + -q}$`,
          `$f'(x) = ${t(p, "x")}$`,
        ].filter((v, i, tt) => tt.indexOf(v) === i),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée d'un produit n'est PAS le produit des dérivées : $(uv)' = u'v + uv'$, avec deux termes.",
          `On pose $u = ${ecrire(a, b)}$ et $v = ${ecrire(c, d)}$, donc $u' = ${a}$ et $v' = ${c}$.`,
          `$f'(x) = ${a}(${ecrire(c, d)}) + (${ecrire(a, b)}) \\times ${c}$, qu'on développe puis réduit.`,
          `${correct} — le produit des dérivées aurait donné $${a * c}$, une constante, ce qui est visiblement faux pour un polynôme de degré $2$.`
        ),
      };
    },
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
    kind: "fixed",
    id: "premiere_der_tan_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = x^3$. Quelle est la pente de la tangente au point d'abscisse $a = 2$ ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "La pente vaut $f'(2)$, avec $f'(x) = 3x^2$.",
    explanation: exp(
      "Le coefficient directeur de la tangente au point d'abscisse $a$ est le nombre dérivé $f'(a)$.",
      "$f'(x) = 3x^2$, donc $f'(2) = 3 \\times 2^2$.",
      "$= 3 \\times 4 = 12$.",
      "La pente vaut $12$."
    ),
    tags: ["premiere", "maths", "derivation", "tangente", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_tan_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^2 - 3x$. Quelle est l'équation de la tangente au point d'abscisse $a = 1$ ?",
    format: "qcm",
    choices: ["$y = -x - 1$", "$y = -x + 1$", "$y = x - 3$", "$y = -2x$"],
    expected: ["$y = -x - 1$"],
    comparator: "mcq_exact",
    hint: "$y = f'(1)(x - 1) + f(1)$ : calcule d'abord $f(1)$ et $f'(1)$.",
    explanation: exp(
      "L'équation de la tangente en $a$ est $y = f'(a)(x - a) + f(a)$.",
      "$f(1) = 1 - 3 = -2$ ; $f'(x) = 2x - 3$ donc $f'(1) = -1$.",
      "$y = -1(x - 1) - 2 = -x + 1 - 2 = -x - 1$.",
      "La tangente a pour équation $y = -x - 1$."
    ),
    canvas: tangente(-3, 0, 1),
    tags: ["premiere", "maths", "derivation", "tangente", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_tan_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^2 - 4x$. En quelle abscisse la tangente est-elle horizontale ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Une tangente horizontale a une pente nulle : résous $f'(x) = 0$.",
    explanation: exp(
      "Une tangente est horizontale lorsque son coefficient directeur $f'(x)$ est nul.",
      "$f'(x) = 2x - 4$, on résout $2x - 4 = 0$.",
      "$2x = 4$ donc $x = 2$.",
      "La tangente est horizontale au point d'abscisse $2$ — c'est le sommet de la parabole."
    ),
    tags: ["premiere", "maths", "derivation", "tangente", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_tan_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 4,
    theme: "neutral",
    text: "Une fonction $f$ vérifie $f(2) = 5$ et $f'(2) = 3$. Quelle est l'équation de la tangente au point d'abscisse $2$ ?",
    format: "qcm",
    choices: ["$y = 3x - 1$", "$y = 3x + 5$", "$y = 5x - 3$", "$y = 2x + 3$"],
    expected: ["$y = 3x - 1$"],
    comparator: "mcq_exact",
    hint: "$y = 3(x - 2) + 5$, puis développe.",
    explanation: exp(
      "On applique $y = f'(a)(x - a) + f(a)$ avec $a = 2$.",
      "$y = 3(x - 2) + 5$.",
      "$= 3x - 6 + 5 = 3x - 1$.",
      "La tangente a pour équation $y = 3x - 1$."
    ),
    tags: ["premiere", "maths", "derivation", "tangente", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_tan_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^2 + 2x$. Quelle est l'équation de la tangente au point d'abscisse $a = -1$ ?",
    format: "qcm",
    choices: ["$y = -1$", "$y = 0$", "$y = -x - 1$", "$x = -1$"],
    expected: ["$y = -1$"],
    comparator: "mcq_exact",
    hint: "Calcule $f'(-1)$ : que vaut la pente ?",
    explanation: exp(
      "On applique $y = f'(a)(x - a) + f(a)$.",
      "$f(-1) = 1 - 2 = -1$ ; $f'(x) = 2x + 2$ donc $f'(-1) = 0$.",
      "$y = 0 \\times (x + 1) - 1 = -1$ : la tangente est HORIZONTALE.",
      "La tangente a pour équation $y = -1$ (une droite horizontale s'écrit $y = \\dots$, pas $x = \\dots$)."
    ),
    canvas: tangente(2, 0, -1),
    tags: ["premiere", "maths", "derivation", "tangente", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_tan_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 3,
    theme: "neutral",
    text: "Dans l'équation $y = f'(a)(x - a) + f(a)$, que représente $f'(a)$ ?",
    format: "qcm",
    choices: [
      "le coefficient directeur de la tangente",
      "l'ordonnée du point de contact",
      "l'ordonnée à l'origine de la tangente",
      "l'abscisse du point de contact",
    ],
    expected: ["le coefficient directeur de la tangente"],
    comparator: "mcq_exact",
    hint: "Compare avec la forme $y = mx + p$ d'une droite.",
    explanation: exp(
      "Une droite s'écrit $y = mx + p$, où $m$ est le coefficient directeur.",
      "Dans $y = f'(a)(x - a) + f(a)$, c'est $f'(a)$ qui multiplie $x$.",
      "$f(a)$, lui, est l'ordonnée du point de contact — pas l'ordonnée à l'origine, sauf si $a = 0$.",
      "$f'(a)$ est le coefficient directeur de la tangente."
    ),
    tags: ["premiere", "maths", "derivation", "tangente", "qcm"],
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

  /* ===================== DER_NOMBRE_DERIVE ===================== */
  {
    kind: "fixed",
    id: "premiere_der_nd_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_nombre_derive",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la différence entre le taux de variation et le nombre dérivé ?",
    format: "qcm",
    choices: [
      "le taux porte sur un intervalle, le nombre dérivé sur un seul point",
      "ce sont deux noms pour la même chose",
      "le taux porte sur un point, le nombre dérivé sur un intervalle",
      "le nombre dérivé est toujours plus grand",
    ],
    expected: [
      "le taux porte sur un intervalle, le nombre dérivé sur un seul point",
    ],
    comparator: "mcq_exact",
    hint: "L'un est une moyenne, l'autre une valeur instantanée.",
    explanation: exp(
      "Le taux de variation $\\dfrac{f(b) - f(a)}{b - a}$ compare deux points : c'est une variation MOYENNE.",
      "Le nombre dérivé $f'(a)$ est la limite de ce taux quand $b$ se rapproche de $a$ : c'est une variation INSTANTANÉE, en un seul point.",
      "Image concrète : le taux est la vitesse moyenne sur un trajet, le nombre dérivé la vitesse affichée au compteur à un instant précis.",
      "Le taux porte sur un intervalle, le nombre dérivé sur un point."
    ),
    tags: ["premiere", "maths", "derivation", "nombre_derive", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_nd_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_nombre_derive",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^2$, le taux entre $2$ et $2 + h$ vaut $4 + h$. Combien vaut $f'(2)$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Fais tendre $h$ vers $0$.",
    explanation: exp(
      "Le nombre dérivé est la limite du taux de variation quand $h$ tend vers $0$.",
      "Le taux vaut $4 + h$.",
      "Quand $h$ devient très petit, $4 + h$ se rapproche de $4$.",
      "$f'(2) = 4$."
    ),
    tags: ["premiere", "maths", "derivation", "nombre_derive", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_nd_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_nombre_derive",
    difficulty: 5,
    theme: "neutral",
    text: "Que signifie « $f$ est dérivable en $a$ » ?",
    format: "qcm",
    choices: [
      "le taux de variation en $a$ admet une limite finie quand $h \\to 0$",
      "$f$ est définie en $a$",
      "$f$ est croissante en $a$",
      "$f(a) = 0$",
    ],
    expected: [
      "le taux de variation en $a$ admet une limite finie quand $h \\to 0$",
    ],
    comparator: "mcq_exact",
    hint: "La dérivabilité, c'est l'existence d'une limite.",
    explanation: exp(
      "Être dérivable en $a$, c'est que le taux $\\dfrac{f(a+h) - f(a)}{h}$ tende vers un nombre FINI quand $h \\to 0$.",
      "Cette limite est alors le nombre dérivé $f'(a)$, et la courbe admet une tangente non verticale en ce point.",
      "Être définie en $a$ ne suffit pas : $\\sqrt{x}$ est définie en $0$ sans y être dérivable, sa tangente y étant verticale.",
      "Le taux admet une limite finie quand $h \\to 0$."
    ),
    tags: ["premiere", "maths", "derivation", "nombre_derive", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_nd_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_nombre_derive",
    difficulty: 5,
    theme: "neutral",
    text: "Explique le passage du taux de variation au nombre dérivé, en t'appuyant sur l'image des sécantes et de la tangente.",
    format: "open",
    expected: ["sécante", "tangente", "rapproche", "limite"],
    comparator: "contains_keyword",
    hint: "Que devient la droite qui joint deux points quand ils se rapprochent ?",
    explanation: exp(
      "Le taux de variation entre $a$ et $b$ est la pente de la SÉCANTE qui joint les deux points de la courbe.",
      "Quand $b$ se rapproche de $a$, la sécante pivote et se rapproche d'une position limite.",
      "Cette position limite est la TANGENTE en $a$, et sa pente est le nombre dérivé $f'(a)$. C'est pourquoi la tangente est décrite comme la « limite des sécantes ».",
      "Le nombre dérivé est la pente limite des sécantes, c'est-à-dire celle de la tangente."
    ),
    tags: ["premiere", "maths", "derivation", "nombre_derive", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_der_nd_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_nombre_derive",
    difficulty: 5,
    theme: "sport",
    text: "Une coureuse parcourt $d(t)$ mètres en $t$ secondes. Explique la différence entre $\\dfrac{d(10) - d(0)}{10}$ et $d'(10)$.",
    format: "open",
    expected: ["moyenne", "instantanée", "compteur", "intervalle"],
    comparator: "contains_keyword",
    hint: "L'un se mesure sur toute la course, l'autre à un instant précis.",
    explanation: exp(
      "Les deux quantités sont des vitesses, mais pas au même sens.",
      "$\\dfrac{d(10) - d(0)}{10}$ est un taux de variation : la vitesse MOYENNE sur les dix premières secondes.",
      "$d'(10)$ est le nombre dérivé : la vitesse INSTANTANÉE à la dixième seconde exactement. Une coureuse partie lentement puis lancée peut avoir une vitesse instantanée bien supérieure à sa moyenne.",
      "L'un est une moyenne sur un intervalle, l'autre une valeur à un instant."
    ),
    tags: ["premiere", "maths", "derivation", "nombre_derive", "open"],
  },
  {
    kind: "template",
    id: "premiere_der_nd_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_nombre_derive",
    difficulty: 4,
    theme: "neutral",
    hint: "Le nombre dérivé s'obtient en remplaçant $h$ par $0$ dans le taux simplifié.",
    tags: ["premiere", "maths", "derivation", "nombre_derive", "template"],
    generate: () => {
      const a = randomInt(1, 6);
      return {
        text: `Pour $f(x) = x^2$, le taux de variation entre $${a}$ et $${a} + h$ vaut $${2 * a} + h$. Combien vaut $f'(${a})$ ?`,
        format: "short",
        expected: [String(2 * a)],
        comparator: "number_equal",
        explanation: exp(
          "Le nombre dérivé est la limite du taux de variation quand $h$ tend vers $0$.",
          `Le taux simplifié vaut $${2 * a} + h$.`,
          `Quand $h \\to 0$, il tend vers $${2 * a}$.`,
          `$f'(${a}) = ${2 * a}$ — on retrouve bien $2a$ pour la fonction carré.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_der_nd_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_nombre_derive",
    difficulty: 5,
    theme: "neutral",
    hint: "Précise sur quoi porte chaque quantité : un intervalle, ou un instant.",
    tags: ["premiere", "maths", "derivation", "nombre_derive", "open", "template"],
    generate: () => {
      const cas = [
        {
          contexte: "une distance $d(t)$ parcourue en $t$ heures",
          moyenne: "la vitesse moyenne entre deux instants",
          instant: "la vitesse instantanée, celle du compteur",
        },
        {
          contexte: "un coût de production $C(q)$ pour $q$ objets",
          moyenne: "l'augmentation moyenne du coût sur une plage de production",
          instant: "le coût marginal : ce que coûte à peu près l'objet suivant",
        },
        {
          contexte: "une population $P(t)$ après $t$ années",
          moyenne: "la croissance moyenne sur une période",
          instant: "la vitesse de croissance à l'instant considéré",
        },
        {
          contexte: "la température $T(t)$ d'un liquide après $t$ minutes",
          moyenne: "le refroidissement moyen sur un intervalle",
          instant: "la vitesse de refroidissement à cette minute précise",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `On étudie ${c.contexte}. Explique la différence entre le taux de variation entre deux valeurs et le nombre dérivé en un point.`,
        format: "open",
        expected: ["moyenne", "instantané", "intervalle", "limite"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le taux de variation compare deux points ; le nombre dérivé est sa limite quand les deux points se confondent.",
          "Le premier décrit donc une évolution moyenne, le second une évolution instantanée.",
          `Ici : le taux donne ${c.moyenne} ; le nombre dérivé donne ${c.instant}.`,
          "Le nombre dérivé est la limite du taux quand l'intervalle se réduit à un point."
        ),
      };
    },
  },

  /* ===================== DER_DEFINITION ===================== */
  {
    kind: "fixed",
    id: "premiere_der_def_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_definition",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $f(x) = x^2$, on calcule $\\dfrac{f(3+h) - f(3)}{h}$. Que vaut cette expression après simplification ?",
    format: "qcm",
    choices: ["$6 + h$", "$6$", "$6h + h^2$", "$9 + h$"],
    expected: ["$6 + h$"],
    comparator: "mcq_exact",
    hint: "Développe $(3+h)^2 = 9 + 6h + h^2$, puis divise par $h$.",
    explanation: exp(
      "Calculer un nombre dérivé par la définition demande de développer, simplifier, puis faire tendre $h$ vers $0$.",
      "$f(3+h) - f(3) = (9 + 6h + h^2) - 9 = 6h + h^2$.",
      "On divise par $h$ : $\\dfrac{6h + h^2}{h} = 6 + h$ (licite car $h \\neq 0$).",
      "Le taux vaut $6 + h$, donc $f'(3) = 6$."
    ),
    tags: ["premiere", "maths", "derivation", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_def_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_definition",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi ne peut-on pas remplacer $h$ par $0$ AVANT de simplifier le taux $\\dfrac{f(a+h) - f(a)}{h}$ ?",
    format: "qcm",
    choices: [
      "on obtiendrait $\\dfrac{0}{0}$, qui n'a pas de sens",
      "parce que $h$ doit rester positif",
      "parce que le résultat serait négatif",
      "on peut le faire sans problème",
    ],
    expected: ["on obtiendrait $\\dfrac{0}{0}$, qui n'a pas de sens"],
    comparator: "mcq_exact",
    hint: "Que devient le numérateur si $h = 0$ ?",
    explanation: exp(
      "Le taux de variation est un quotient dont le dénominateur est $h$.",
      "Si l'on pose $h = 0$ d'emblée, le numérateur $f(a+0) - f(a)$ vaut $0$, et le dénominateur aussi.",
      "On obtient $\\dfrac{0}{0}$, qui ne détermine rien. Il faut d'abord SIMPLIFIER par $h$ — ce qui est permis tant que $h \\neq 0$ — et seulement ensuite faire tendre $h$ vers $0$.",
      "On tomberait sur $\\dfrac{0}{0}$."
    ),
    tags: ["premiere", "maths", "derivation", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_def_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_definition",
    difficulty: 5,
    theme: "neutral",
    text: "En utilisant la définition, calcule $f'(5)$ pour $f(x) = x^2$.",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$(5+h)^2 - 25 = 10h + h^2$.",
    explanation: exp(
      "On applique la définition : on forme le taux, on simplifie, puis on fait tendre $h$ vers $0$.",
      "$f(5+h) - f(5) = (25 + 10h + h^2) - 25 = 10h + h^2$.",
      "Le taux vaut $\\dfrac{10h + h^2}{h} = 10 + h$, qui tend vers $10$.",
      "$f'(5) = 10$."
    ),
    tags: ["premiere", "maths", "derivation", "definition", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_def_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_definition",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $f(x) = \\dfrac{1}{x}$, le taux entre $1$ et $1+h$ se simplifie en $\\dfrac{-1}{1+h}$. Combien vaut $f'(1)$ ?",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "Remplace $h$ par $0$ dans l'expression simplifiée.",
    explanation: exp(
      "Une fois le taux simplifié, on fait tendre $h$ vers $0$.",
      "$\\dfrac{-1}{1+h}$ tend vers $\\dfrac{-1}{1}$.",
      "$= -1$. Le résultat est négatif, ce qui est cohérent : la fonction inverse est décroissante.",
      "$f'(1) = -1$."
    ),
    tags: ["premiere", "maths", "derivation", "definition", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_def_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_definition",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $f(x) = x^2 + 1$, que vaut $f(2+h) - f(2)$ ?",
    format: "qcm",
    choices: ["$4h + h^2$", "$4h + h^2 + 1$", "$h^2$", "$4 + h$"],
    expected: ["$4h + h^2$"],
    comparator: "mcq_exact",
    hint: "Le $+1$ apparaît dans les deux termes : il disparaît par soustraction.",
    explanation: exp(
      "On développe les deux images, puis on soustrait.",
      "$f(2+h) = (2+h)^2 + 1 = 4 + 4h + h^2 + 1$, et $f(2) = 5$.",
      "La différence vaut $4h + h^2$ : la constante $+1$ s'élimine, comme le $4$. C'est pourquoi ajouter une constante ne change pas la dérivée.",
      "$f(2+h) - f(2) = 4h + h^2$, donc $f'(2) = 4$."
    ),
    tags: ["premiere", "maths", "derivation", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_def_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_definition",
    difficulty: 5,
    theme: "neutral",
    text: "Dans le calcul d'un nombre dérivé par la définition, quelle étape autorise à simplifier par $h$ ?",
    format: "qcm",
    choices: [
      "le fait que $h$ est non nul tant qu'on n'a pas pris la limite",
      "le fait que $h$ est positif",
      "aucune : la simplification est interdite",
      "le fait que $f$ est croissante",
    ],
    expected: ["le fait que $h$ est non nul tant qu'on n'a pas pris la limite"],
    comparator: "mcq_exact",
    hint: "On ne divise jamais par zéro — mais $h$ vaut-il zéro à ce moment-là ?",
    explanation: exp(
      "Simplifier une fraction par $h$ suppose $h \\neq 0$.",
      "Or $h$ représente un écart NON NUL entre $a$ et $a + h$ : la simplification est donc licite.",
      "Ce n'est qu'après avoir simplifié qu'on fait tendre $h$ vers $0$ — sans jamais lui donner la valeur $0$.",
      "C'est le fait que $h$ reste non nul jusqu'au passage à la limite."
    ),
    tags: ["premiere", "maths", "derivation", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_def_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_definition",
    difficulty: 5,
    theme: "neutral",
    text: "Détaille les étapes du calcul de $f'(4)$ par la définition, pour $f(x) = x^2$.",
    format: "open",
    expected: ["8", "développ", "simplifi", "limite"],
    comparator: "contains_keyword",
    hint: "Former le taux, développer, simplifier par $h$, faire tendre $h$ vers $0$.",
    explanation: exp(
      "La méthode comporte quatre étapes, toujours les mêmes.",
      "Former le taux : $\\dfrac{f(4+h) - f(4)}{h}$. Développer : $(4+h)^2 - 16 = 8h + h^2$.",
      "Simplifier par $h$ (licite car $h \\neq 0$) : le taux vaut $8 + h$. Faire tendre $h$ vers $0$ : on obtient $8$.",
      "$f'(4) = 8$."
    ),
    tags: ["premiere", "maths", "derivation", "definition", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_der_def_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_definition",
    difficulty: 5,
    theme: "neutral",
    text: "À quoi sert de savoir calculer un nombre dérivé par la définition, puisqu'on dispose des formules de dérivation ?",
    format: "open",
    expected: ["comprendre", "démontrer", "formules", "limite"],
    comparator: "contains_keyword",
    hint: "D'où viennent les formules du cours ?",
    explanation: exp(
      "Les formules de dérivation ne tombent pas du ciel : elles se démontrent toutes par la définition.",
      "C'est ainsi qu'on établit que la dérivée de $x^2$ est $2x$, ou celle de $\\dfrac{1}{x}$ est $-\\dfrac{1}{x^2}$ — deux démonstrations exigibles au programme.",
      "Cela permet aussi de traiter les cas où aucune formule ne s'applique, et de comprendre ce qu'est vraiment la dérivée : une limite de taux, pas une recette.",
      "Elle démontre les formules et donne le sens de la dérivée."
    ),
    tags: ["premiere", "maths", "derivation", "definition", "open"],
  },
  {
    kind: "template",
    id: "premiere_der_def_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_definition",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe $(a+h)^2$, retranche $a^2$, puis divise par $h$.",
    tags: ["premiere", "maths", "derivation", "definition", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      return {
        text: `Pour $f(x) = x^2$, que vaut $f(${a}+h) - f(${a})$ ?`,
        format: "qcm",
        choices: [
          `$${2 * a}h + h^2$`,
          `$${2 * a}h$`,
          `$${a * a} + h^2$`,
          `$${2 * a} + h$`,
        ],
        expected: [`$${2 * a}h + h^2$`],
        comparator: "mcq_exact",
        explanation: exp(
          "On développe l'image en $a + h$, puis on retranche l'image en $a$.",
          `$(${a}+h)^2 = ${a * a} + ${2 * a}h + h^2$, et $f(${a}) = ${a * a}$.`,
          `La différence vaut $${2 * a}h + h^2$ : le terme constant $${a * a}$ s'élimine.`,
          `En divisant par $h$, le taux vaut $${2 * a} + h$, donc $f'(${a}) = ${2 * a}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_der_def_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_definition",
    difficulty: 5,
    theme: "neutral",
    hint: "Quatre étapes : former le taux, développer, simplifier par $h$, passer à la limite.",
    tags: ["premiere", "maths", "derivation", "definition", "open", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      return {
        text: `Calcule $f'(${a})$ par la DÉFINITION pour $f(x) = x^2$, en détaillant chaque étape.`,
        format: "open",
        expected: [String(2 * a), "simplifi", "limite", "h"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le nombre dérivé est la limite du taux de variation quand $h \\to 0$.",
          `Taux : $\\dfrac{f(${a}+h) - f(${a})}{h} = \\dfrac{${2 * a}h + h^2}{h}$.`,
          `Simplification par $h$ (licite car $h \\neq 0$) : le taux vaut $${2 * a} + h$, qui tend vers $${2 * a}$.`,
          `$f'(${a}) = ${2 * a}$.`
        ),
      };
    },
  },

  /* ===================== DER_INTERPRETER ===================== */
  {
    kind: "fixed",
    id: "premiere_der_int_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Le coût de production de $q$ objets est $C(q)$. Que représente $C'(50)$ ?",
    format: "qcm",
    choices: [
      "le coût marginal : approximativement ce que coûte le 51ᵉ objet",
      "le coût total de $50$ objets",
      "le coût moyen d'un objet",
      "le bénéfice réalisé sur $50$ objets",
    ],
    expected: [
      "le coût marginal : approximativement ce que coûte le 51ᵉ objet",
    ],
    comparator: "mcq_exact",
    hint: "Une dérivée mesure ce que produit UNE unité de plus.",
    explanation: exp(
      "Le nombre dérivé mesure la variation de la grandeur pour une variation d'une unité de la variable.",
      "$C'(50)$ indique de combien le coût augmente quand on produit un objet de plus, à partir de $50$.",
      "C'est ce que les économistes appellent le coût marginal. Le coût MOYEN, lui, serait $\\dfrac{C(50)}{50}$ : une tout autre quantité.",
      "$C'(50)$ est le coût marginal, soit environ le prix du 51ᵉ objet."
    ),
    tags: ["premiere", "maths", "derivation", "interpreter", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_int_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Une fonction vérifie $f'(3) = -2$. Que peut-on en déduire au voisinage de $3$ ?",
    format: "qcm",
    choices: [
      "la fonction décroît, et sa tangente en $3$ descend",
      "la fonction vaut $-2$ en $3$",
      "la fonction croît",
      "la courbe coupe l'axe des abscisses en $3$",
    ],
    expected: ["la fonction décroît, et sa tangente en $3$ descend"],
    comparator: "mcq_exact",
    hint: "Ne pas confondre $f(3)$ et $f'(3)$.",
    explanation: exp(
      "Le SIGNE du nombre dérivé donne le sens de variation local ; sa VALEUR donne la pente de la tangente.",
      "$f'(3) = -2 < 0$ : la fonction décroît au voisinage de $3$, et la tangente y a pour coefficient directeur $-2$, donc elle descend.",
      "Cela ne dit rien de $f(3)$, qui pourrait valoir $100$ : la fonction peut être très haute et pourtant décroissante.",
      "La fonction décroît, avec une tangente de pente $-2$."
    ),
    tags: ["premiere", "maths", "derivation", "interpreter", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_int_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_interpreter",
    difficulty: 5,
    theme: "reunion",
    text: "Le nombre de visiteurs d'un site touristique est $V(t)$ milliers après $t$ mois. On sait que $V'(6) = 1{,}5$. Comment l'interpréter ?",
    format: "qcm",
    choices: [
      "au 6ᵉ mois, la fréquentation augmente d'environ $1500$ visiteurs par mois",
      "il y a $1500$ visiteurs au 6ᵉ mois",
      "la fréquentation a augmenté de $1{,}5$ visiteur depuis le début",
      "il faudra $1{,}5$ mois pour doubler la fréquentation",
    ],
    expected: [
      "au 6ᵉ mois, la fréquentation augmente d'environ $1500$ visiteurs par mois",
    ],
    comparator: "mcq_exact",
    hint: "La dérivée est une vitesse : une quantité PAR unité de temps.",
    explanation: exp(
      "Un nombre dérivé s'exprime dans l'unité de la grandeur divisée par celle de la variable.",
      "Ici : des milliers de visiteurs par mois. $V'(6) = 1{,}5$ signifie donc $1{,}5$ millier de visiteurs supplémentaires par mois.",
      "Soit environ $1500$ visiteurs de plus le mois suivant. Ce n'est pas le NOMBRE de visiteurs — ce serait $V(6)$ — mais sa vitesse d'augmentation.",
      "La fréquentation croît d'environ $1500$ visiteurs par mois."
    ),
    tags: ["premiere", "maths", "derivation", "interpreter", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_int_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "Une fonction vérifie $f(2) = 10$ et $f'(2) = 0$. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "la tangente en $2$ est horizontale : il peut y avoir un extremum",
      "la fonction est nulle en $2$",
      "la fonction est constante",
      "la courbe coupe l'axe des abscisses en $2$",
    ],
    expected: [
      "la tangente en $2$ est horizontale : il peut y avoir un extremum",
    ],
    comparator: "mcq_exact",
    hint: "Une pente nulle, c'est une droite horizontale.",
    explanation: exp(
      "Le nombre dérivé est le coefficient directeur de la tangente.",
      "$f'(2) = 0$ signifie que cette pente est nulle : la tangente au point $(2 ; 10)$ est horizontale.",
      "C'est le signe possible d'un extremum — mais seulement si $f'$ CHANGE de signe en $2$, comme le montre le contre-exemple de $x^3$ en $0$. La fonction n'est certainement pas constante : on sait seulement qu'elle marque une pause.",
      "La tangente est horizontale, ce qui suggère un extremum."
    ),
    tags: ["premiere", "maths", "derivation", "interpreter", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_int_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre $f(a)$ et $f'(a)$ à quelqu'un qui les confond.",
    format: "open",
    expected: ["valeur", "pente", "hauteur", "variation"],
    comparator: "contains_keyword",
    hint: "L'un dit où l'on est, l'autre comment ça évolue.",
    explanation: exp(
      "Ce sont deux informations de nature différente sur le même point.",
      "$f(a)$ est la VALEUR de la fonction en $a$ : la hauteur du point sur la courbe.",
      "$f'(a)$ est la PENTE de la tangente en ce point : la vitesse à laquelle la fonction évolue. Une voiture peut être à $200$ km du départ ($f(a)$ grand) tout en étant à l'arrêt ($f'(a) = 0$).",
      "$f(a)$ dit où l'on est, $f'(a)$ dit comment ça change."
    ),
    tags: ["premiere", "maths", "derivation", "interpreter", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_der_int_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "La température d'un four est $T(t)$ degrés après $t$ minutes. Interprète $T'(5) = -3$ en précisant l'unité.",
    format: "open",
    expected: ["degrés par minute", "refroidit", "diminue", "3"],
    comparator: "contains_keyword",
    hint: "L'unité de la dérivée est celle de $T$ divisée par celle de $t$.",
    explanation: exp(
      "L'unité d'un nombre dérivé est celle de la grandeur divisée par celle de la variable.",
      "Ici : des degrés par minute. Le signe négatif indique une diminution.",
      "$T'(5) = -3$ signifie donc qu'à la 5ᵉ minute, la température BAISSE d'environ $3$ degrés par minute : le four refroidit.",
      "La température diminue de $3$ degrés par minute à cet instant."
    ),
    tags: ["premiere", "maths", "derivation", "interpreter", "open"],
  },
  {
    kind: "template",
    id: "premiere_der_int_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_interpreter",
    difficulty: 5,
    theme: "neutral",
    hint: "La dérivée est une vitesse : unité de la grandeur PAR unité de variable.",
    tags: ["premiere", "maths", "derivation", "interpreter", "open", "template"],
    generate: () => {
      const cas = [
        {
          contexte: "la masse $m(t)$ d'une substance en grammes après $t$ heures",
          valeur: "$m'(3) = -0{,}4$",
          mots: ["grammes par heure", "diminue", "perd", "0,4"],
          sens: "à la 3ᵉ heure, la substance perd environ $0{,}4$ gramme par heure : elle se dégrade.",
        },
        {
          contexte: "le bénéfice $B(x)$ en euros pour $x$ articles vendus",
          valeur: "$B'(100) = 12$",
          mots: ["euros par article", "augmente", "12", "marginal"],
          sens: "au niveau de $100$ articles, chaque article supplémentaire rapporte environ $12$ € de plus.",
        },
        {
          contexte: "la hauteur $h(t)$ d'une plante en cm après $t$ semaines",
          valeur: "$h'(4) = 2{,}5$",
          mots: ["cm par semaine", "pousse", "2,5", "croît"],
          sens: "à la 4ᵉ semaine, la plante pousse d'environ $2{,}5$ cm par semaine.",
        },
        {
          contexte: "le volume $V(t)$ d'eau en litres dans un réservoir après $t$ minutes",
          valeur: "$V'(10) = -8$",
          mots: ["litres par minute", "vide", "diminue", "8"],
          sens: "à la 10ᵉ minute, le réservoir se vide d'environ $8$ litres par minute.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `On étudie ${c.contexte}. Interprète ${c.valeur} en précisant l'unité.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Un nombre dérivé se lit comme une vitesse : unité de la grandeur divisée par unité de la variable.",
          "Le signe indique le sens : positif pour une augmentation, négatif pour une diminution.",
          `Ici : ${c.sens}`,
          "C'est une variation instantanée, à ne pas confondre avec la valeur de la grandeur elle-même."
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_der_int_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Le signe donne le sens de variation, la valeur donne la pente.",
    tags: ["premiere", "maths", "derivation", "interpreter", "template"],
    generate: () => {
      const a = randomInt(1, 6);
      const d = pickOne([-5, -3, -1, 2, 4, 7]);
      const croit = d > 0;
      return {
        text: `Une fonction vérifie $f'(${a}) = ${d}$. Que peut-on en déduire au voisinage de $${a}$ ?`,
        format: "qcm",
        choices: [
          croit
            ? `la fonction croît, et la tangente en $${a}$ a pour pente $${d}$`
            : `la fonction décroît, et la tangente en $${a}$ a pour pente $${d}$`,
          `la fonction vaut $${d}$ en $${a}$`,
          croit
            ? `la fonction décroît au voisinage de $${a}$`
            : `la fonction croît au voisinage de $${a}$`,
          `la courbe coupe l'axe des abscisses en $${a}$`,
        ],
        expected: [
          croit
            ? `la fonction croît, et la tangente en $${a}$ a pour pente $${d}$`
            : `la fonction décroît, et la tangente en $${a}$ a pour pente $${d}$`,
        ],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre dérivé donne deux informations : son signe indique le sens de variation, sa valeur la pente de la tangente.",
          `Ici $f'(${a}) = ${d}$, qui est ${croit ? "positif" : "négatif"}.`,
          `La fonction ${croit ? "croît" : "décroît"} donc au voisinage de $${a}$, avec une tangente de coefficient directeur $${d}$.`,
          `Attention à ne pas confondre avec $f(${a})$, qui serait la valeur de la fonction.`
        ),
      };
    },
  },

  /* ===================== DER_PUISSANCE ===================== */
  {
    kind: "fixed",
    id: "premiere_der_pui_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_puissance",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^4$, combien vaut $f'(2)$ ?",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "Dérive d'abord : $f'(x) = 4x^3$.",
    explanation: exp(
      "On dérive d'abord la fonction, puis on évalue en $2$.",
      "$f'(x) = 4x^3$.",
      "$f'(2) = 4 \\times 2^3 = 4 \\times 8 = 32$.",
      "$f'(2) = 32$."
    ),
    tags: ["premiere", "maths", "derivation", "puissance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_pui_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_puissance",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x^{-2}$ ?",
    format: "qcm",
    choices: ["$-2x^{-3}$", "$-2x^{-1}$", "$2x^{-3}$", "$-3x^{-2}$"],
    expected: ["$-2x^{-3}$"],
    comparator: "mcq_exact",
    hint: "La règle vaut aussi pour $n$ négatif : $-2 - 1 = -3$.",
    explanation: exp(
      "La formule $(x^n)' = n x^{n-1}$ reste valable pour $n$ entier NÉGATIF.",
      "Ici $n = -2$ : l'exposant passe devant, donc le facteur est $-2$.",
      "Le nouvel exposant est $-2 - 1 = -3$ : diminuer de $1$ un nombre négatif le rend plus négatif encore. C'est le piège.",
      "$f'(x) = -2x^{-3}$, c'est-à-dire $-\\dfrac{2}{x^3}$."
    ),
    tags: ["premiere", "maths", "derivation", "puissance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_pui_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_puissance",
    difficulty: 5,
    theme: "neutral",
    text: "En écrivant $\\dfrac{1}{x} = x^{-1}$, quelle dérivée obtient-on par la formule des puissances ?",
    format: "qcm",
    choices: [
      "$-x^{-2}$, c'est-à-dire $-\\dfrac{1}{x^2}$",
      "$-x^{-1}$",
      "$x^{-2}$",
      "$-\\dfrac{1}{x}$",
    ],
    expected: ["$-x^{-2}$, c'est-à-dire $-\\dfrac{1}{x^2}$"],
    comparator: "mcq_exact",
    hint: "$n = -1$, donc le nouvel exposant est $-2$.",
    explanation: exp(
      "La fonction inverse est un cas particulier de la formule des puissances.",
      "$\\dfrac{1}{x} = x^{-1}$, donc avec $n = -1$ : $(x^{-1})' = -1 \\times x^{-2}$.",
      "$= -x^{-2} = -\\dfrac{1}{x^2}$, ce qui est bien la formule connue de la dérivée de l'inverse.",
      "$f'(x) = -\\dfrac{1}{x^2}$ : les deux méthodes concordent."
    ),
    tags: ["premiere", "maths", "derivation", "puissance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_pui_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_puissance",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\dfrac{3}{x^2}$ ?",
    format: "qcm",
    choices: [
      "$-\\dfrac{6}{x^3}$",
      "$\\dfrac{6}{x^3}$",
      "$-\\dfrac{3}{x^3}$",
      "$-\\dfrac{6}{x}$",
    ],
    expected: ["$-\\dfrac{6}{x^3}$"],
    comparator: "mcq_exact",
    hint: "Écris $\\dfrac{3}{x^2} = 3x^{-2}$.",
    explanation: exp(
      "On réécrit la fonction avec un exposant négatif pour appliquer la formule des puissances.",
      "$f(x) = 3x^{-2}$, donc $f'(x) = 3 \\times (-2) x^{-3}$.",
      "$= -6x^{-3} = -\\dfrac{6}{x^3}$.",
      "$f'(x) = -\\dfrac{6}{x^3}$ : la dérivée est négative, cohérent avec une fonction décroissante pour $x > 0$."
    ),
    tags: ["premiere", "maths", "derivation", "puissance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_pui_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_puissance",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la formule $(x^n)' = n x^{n-1}$ redonne bien la dérivée de $\\dfrac{1}{x}$ et celle de $x$.",
    format: "open",
    expected: ["exposant", "-1", "cas particulier", "1"],
    comparator: "contains_keyword",
    hint: "Quel exposant se cache derrière $\\dfrac{1}{x}$ ? Et derrière $x$ ?",
    explanation: exp(
      "La formule des puissances vaut pour tout entier relatif $n$ : les dérivées connues en sont des cas particuliers.",
      "Pour $\\dfrac{1}{x} = x^{-1}$ : $n = -1$ donne $-1 \\times x^{-2} = -\\dfrac{1}{x^2}$, la formule attendue.",
      "Pour $x = x^1$ : $n = 1$ donne $1 \\times x^0 = 1$, ce qui est bien la dérivée de $x$.",
      "Toutes ces dérivées sont des cas particuliers d'une seule formule."
    ),
    tags: ["premiere", "maths", "derivation", "puissance", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_der_pui_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_puissance",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dérive $x^{-3}$ et trouve $-3x^{-2}$. Explique son erreur.",
    format: "open",
    expected: ["-4", "diminue", "exposant", "négatif"],
    comparator: "contains_keyword",
    hint: "Que vaut $-3 - 1$ ?",
    explanation: exp(
      "La formule impose de DIMINUER l'exposant de $1$, quel que soit son signe.",
      "L'élève a augmenté l'exposant au lieu de le diminuer : il est passé de $-3$ à $-2$.",
      "Or $-3 - 1 = -4$ : la bonne réponse est $-3x^{-4}$. Avec les exposants négatifs, « diminuer » éloigne de zéro, ce qui trompe l'intuition.",
      "Il fallait $-3x^{-4}$, c'est-à-dire $-\\dfrac{3}{x^4}$."
    ),
    tags: ["premiere", "maths", "derivation", "puissance", "open"],
  },
  {
    kind: "template",
    id: "premiere_der_pui_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_puissance",
    difficulty: 4,
    theme: "neutral",
    hint: "L'exposant passe devant et diminue de $1$ — même s'il est négatif.",
    tags: ["premiere", "maths", "derivation", "puissance", "template"],
    generate: () => {
      const n = pickOne([3, 4, 5, 6, 8, -1, -2, -3, -4]);
      const k = randomInt(1, 6);
      const coef = k === 1 ? "" : `${k}`;
      const der = k * n;
      return {
        text: `Quelle est la dérivée de $f(x) = ${coef}x^{${n}}$ ?`,
        format: "qcm",
        choices: [
          `$${der}x^{${n - 1}}$`,
          `$${der}x^{${n + 1}}$`,
          `$${k}x^{${n - 1}}$`,
          `$${der}x^{${n}}$`,
        ],
        expected: [`$${der}x^{${n - 1}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour $x^n$, la dérivée est $n x^{n-1}$ ; un coefficient devant reste en facteur.",
          `Ici l'exposant $${n}$ passe devant : $${k} \\times ${n} = ${der}$.`,
          `Le nouvel exposant est $${n} - 1 = ${n - 1}$.`,
          `$f'(x) = ${der}x^{${n - 1}}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_der_pui_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_puissance",
    difficulty: 5,
    theme: "neutral",
    hint: "Réécris d'abord la fonction avec un exposant, puis applique la formule.",
    tags: ["premiere", "maths", "derivation", "puissance", "open", "template"],
    generate: () => {
      const cas = [
        {
          f: "$f(x) = \\dfrac{1}{x^3}$",
          mots: ["-3", "x^{-3}", "exposant", "négatif"],
          calcul:
            "$f(x) = x^{-3}$, donc $f'(x) = -3x^{-4} = -\\dfrac{3}{x^4}$.",
        },
        {
          f: "$f(x) = \\dfrac{5}{x}$",
          mots: ["-5", "x^{-1}", "exposant", "inverse"],
          calcul: "$f(x) = 5x^{-1}$, donc $f'(x) = -5x^{-2} = -\\dfrac{5}{x^2}$.",
        },
        {
          f: "$f(x) = \\dfrac{2}{x^4}$",
          mots: ["-8", "x^{-4}", "exposant", "négatif"],
          calcul: "$f(x) = 2x^{-4}$, donc $f'(x) = -8x^{-5} = -\\dfrac{8}{x^5}$.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Dérive ${c.f} en expliquant ta méthode.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Une fraction en $\\dfrac{k}{x^n}$ se réécrit $k x^{-n}$ : on peut alors appliquer la formule des puissances.",
          "L'exposant passe devant en facteur, puis diminue de $1$.",
          c.calcul,
          "On peut ensuite revenir à l'écriture fractionnaire, plus lisible."
        ),
      };
    },
  },

  /* ===================== DER_QUOTIENT ===================== */
  {
    kind: "fixed",
    id: "premiere_der_quo_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_quotient",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de l'inverse $\\dfrac{1}{v}$ ?",
    format: "qcm",
    choices: [
      "$-\\dfrac{v'}{v^2}$",
      "$\\dfrac{v'}{v^2}$",
      "$-\\dfrac{1}{v'}$",
      "$\\dfrac{1}{v'}$",
    ],
    expected: ["$-\\dfrac{v'}{v^2}$"],
    comparator: "mcq_exact",
    hint: "Il y a un signe moins, et le dénominateur est au carré.",
    explanation: exp(
      "La dérivée de l'inverse d'une fonction est $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$.",
      "On dérive le dénominateur, on met le tout sur $v^2$, et on change le signe.",
      "Contrôle sur $v = x$ : on obtient $-\\dfrac{1}{x^2}$, la dérivée connue de la fonction inverse.",
      "$\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$."
    ),
    tags: ["premiere", "maths", "derivation", "quotient", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_quo_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_quotient",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\dfrac{x}{x^2 + 1}$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{1 - x^2}{(x^2+1)^2}$",
      "$\\dfrac{x^2 - 1}{(x^2+1)^2}$",
      "$\\dfrac{1}{2x}$",
      "$\\dfrac{1 + x^2}{(x^2+1)^2}$",
    ],
    expected: ["$\\dfrac{1 - x^2}{(x^2+1)^2}$"],
    comparator: "mcq_exact",
    hint: "$u = x$, $v = x^2+1$ : calcule $u'v - uv'$.",
    explanation: exp(
      "On applique $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.",
      "$u = x$, $u' = 1$, $v = x^2+1$, $v' = 2x$ : le numérateur vaut $1 \\times (x^2+1) - x \\times 2x$.",
      "$= x^2 + 1 - 2x^2 = 1 - x^2$.",
      "$f'(x) = \\dfrac{1 - x^2}{(x^2+1)^2}$ : elle s'annule en $-1$ et $1$, où la fonction atteint ses extremums."
    ),
    tags: ["premiere", "maths", "derivation", "quotient", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_quo_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_quotient",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève écrit $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'}{v'}$. Que se passe-t-il s'il applique cela à $\\dfrac{x^2}{x}$ ?",
    format: "qcm",
    choices: [
      "il trouve $2x$ au lieu de $1$",
      "il trouve le bon résultat",
      "il trouve $0$",
      "le calcul est impossible",
    ],
    expected: ["il trouve $2x$ au lieu de $1$"],
    comparator: "mcq_exact",
    hint: "Simplifie d'abord $\\dfrac{x^2}{x}$ : que vaut cette fonction ?",
    explanation: exp(
      "La dérivée d'un quotient n'est PAS le quotient des dérivées : la formule correcte est $\\dfrac{u'v - uv'}{v^2}$.",
      "Avec la fausse règle : $\\dfrac{(x^2)'}{(x)'} = \\dfrac{2x}{1} = 2x$.",
      "Or $\\dfrac{x^2}{x} = x$ pour $x \\neq 0$, dont la dérivée vaut $1$. L'écart est flagrant.",
      "Il trouve $2x$ au lieu de $1$ : la règle est fausse."
    ),
    tags: ["premiere", "maths", "derivation", "quotient", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_quo_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_quotient",
    difficulty: 5,
    theme: "neutral",
    text: "Sur quel ensemble la fonction $f(x) = \\dfrac{2x}{x - 3}$ est-elle dérivable ?",
    format: "qcm",
    choices: [
      "sur $\\mathbb{R}$ privé de $3$",
      "sur $\\mathbb{R}$",
      "sur $[3 ; +\\infty[$",
      "sur $\\mathbb{R}$ privé de $0$",
    ],
    expected: ["sur $\\mathbb{R}$ privé de $3$"],
    comparator: "mcq_exact",
    hint: "Où le dénominateur s'annule-t-il ?",
    explanation: exp(
      "Un quotient n'est défini — donc dérivable — que là où son dénominateur ne s'annule pas.",
      "$x - 3 = 0$ pour $x = 3$ : la fonction n'existe pas en ce point.",
      "Elle est donc dérivable sur $]-\\infty ; 3[ \\cup ]3 ; +\\infty[$. C'est la valeur interdite, à donner AVANT de dériver.",
      "Sur $\\mathbb{R}$ privé de $3$."
    ),
    tags: ["premiere", "maths", "derivation", "quotient", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_quo_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_quotient",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi l'ordre des termes au numérateur de $\\dfrac{u'v - uv'}{v^2}$ est-il important, alors qu'il ne l'est pas pour le produit ?",
    format: "open",
    expected: ["soustraction", "opposé", "signe", "somme"],
    comparator: "contains_keyword",
    hint: "Que se passe-t-il si on échange les deux termes d'une soustraction ?",
    explanation: exp(
      "La formule du produit $(uv)' = u'v + uv'$ est une SOMME : l'addition est commutative, l'ordre n'a donc aucune importance.",
      "Celle du quotient contient une SOUSTRACTION : $u'v - uv'$ et $uv' - u'v$ sont opposés l'un de l'autre.",
      "Échanger les termes change le signe du résultat, donc le sens de variation de la fonction — une erreur qui inverse tout un tableau de variations.",
      "Parce qu'une soustraction n'est pas commutative, contrairement à une somme."
    ),
    tags: ["premiere", "maths", "derivation", "quotient", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_der_quo_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_quotient",
    difficulty: 5,
    theme: "neutral",
    text: "Dérive $f(x) = \\dfrac{3x - 1}{x + 2}$ en détaillant, puis dis ce que le signe de $f'$ apprend sur les variations.",
    format: "open",
    expected: ["7", "croissante", "positif", "carré"],
    comparator: "contains_keyword",
    hint: "$u = 3x-1$, $v = x+2$. Le dénominateur est un carré : quel est son signe ?",
    explanation: exp(
      "On applique $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$, avec $u = 3x-1$ et $v = x+2$.",
      "Numérateur : $3(x+2) - (3x-1) \\times 1 = 3x + 6 - 3x + 1 = 7$.",
      "Donc $f'(x) = \\dfrac{7}{(x+2)^2}$. Le dénominateur est un carré, donc strictement positif : la dérivée est toujours positive.",
      "$f$ est croissante sur chacun des intervalles où elle est définie ($x \\neq -2$)."
    ),
    tags: ["premiere", "maths", "derivation", "quotient", "open"],
  },
  {
    kind: "template",
    id: "premiere_der_quo_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_quotient",
    difficulty: 5,
    theme: "neutral",
    hint: "$\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$ : le dénominateur entier passe au carré.",
    tags: ["premiere", "maths", "derivation", "quotient", "template"],
    generate: () => {
      // $a$ démarre à 2 : à 1, le piège « on a oublié de dériver le
      // dénominateur » s'écrit comme la bonne réponse, et l'énoncé affichait un
      // disgracieux $1x$.
      const a = randomInt(2, 5);
      const b = randomInt(-6, 6) || 2;
      const signe = b < 0 ? `- ${-b}` : `+ ${b}`;
      return {
        text: `Quelle est la dérivée de $f(x) = \\dfrac{1}{${a}x ${signe}}$ ?`,
        format: "qcm",
        choices: [
          `$-\\dfrac{${a}}{(${a}x ${signe})^2}$`,
          `$\\dfrac{${a}}{(${a}x ${signe})^2}$`,
          `$-\\dfrac{1}{(${a}x ${signe})^2}$`,
          `$-\\dfrac{${a}}{${a}x ${signe}}$`,
        ],
        expected: [`$-\\dfrac{${a}}{(${a}x ${signe})^2}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique la dérivée de l'inverse : $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$.",
          `Ici $v = ${a}x ${signe}$, donc $v' = ${a}$.`,
          `On place $v'$ au numérateur, $v^2$ au dénominateur, et on change le signe.`,
          `$f'(x) = -\\dfrac{${a}}{(${a}x ${signe})^2}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_der_quo_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_quotient",
    difficulty: 5,
    theme: "neutral",
    hint: "Identifie $u$, $v$, $u'$, $v'$, puis applique $\\dfrac{u'v - uv'}{v^2}$ dans cet ordre.",
    tags: ["premiere", "maths", "derivation", "quotient", "open", "template"],
    generate: () => {
      const cas = [
        {
          f: "$f(x) = \\dfrac{x + 1}{x - 2}$",
          mots: ["-3", "u'v", "carré", "décroissante"],
          calcul:
            "$u = x+1$, $v = x-2$ : numérateur $= 1(x-2) - (x+1) = -3$. Donc $f'(x) = \\dfrac{-3}{(x-2)^2}$, toujours négative : $f$ décroît.",
        },
        {
          f: "$f(x) = \\dfrac{2x}{x + 1}$",
          mots: ["2", "croissante", "carré", "positif"],
          calcul:
            "$u = 2x$, $v = x+1$ : numérateur $= 2(x+1) - 2x = 2$. Donc $f'(x) = \\dfrac{2}{(x+1)^2}$, toujours positive : $f$ croît.",
        },
        {
          f: "$f(x) = \\dfrac{x^2}{x + 1}$",
          mots: ["x^2", "2x", "carré", "numérateur"],
          calcul:
            "$u = x^2$, $v = x+1$ : numérateur $= 2x(x+1) - x^2 = x^2 + 2x$. Donc $f'(x) = \\dfrac{x^2 + 2x}{(x+1)^2}$, du signe de $x(x+2)$.",
        },
        {
          f: "$f(x) = \\dfrac{3}{x - 4}$",
          mots: ["-3", "décroissante", "carré", "inverse"],
          calcul:
            "Forme $\\dfrac{k}{v}$ : $f'(x) = -\\dfrac{3 \\times 1}{(x-4)^2} = \\dfrac{-3}{(x-4)^2}$, toujours négative.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Dérive ${c.f} en détaillant $u$, $v$, $u'$ et $v'$, puis conclus sur le signe de $f'$.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "La dérivée d'un quotient est $\\dfrac{u'v - uv'}{v^2}$ : l'ordre du numérateur est imposé par la soustraction.",
          "On identifie les quatre éléments, on calcule le numérateur, puis on conclut.",
          c.calcul,
          "Le dénominateur étant un carré, il est toujours positif : le signe de $f'$ ne dépend que du numérateur."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_der_quo_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_quotient",
    difficulty: 5,
    theme: "neutral",
    hint: "$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$ — attention au MOINS, l'ordre compte.",
    tags: ["premiere", "maths", "derivation", "quotient", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      const b = randomInt(-4, 4);
      const c = randomInt(1, 3);
      const d = randomInt(-4, 4);
      // (ax+b)/(cx+d) → dérivée : (ad - bc) / (cx+d)^2
      const num = a * d - b * c;
      const t = (k: number, s: string) => (k === 1 ? s : k === -1 ? "-" + s : `${k}${s}`);
      const ecrire = (u: number, v: number) => `${t(u, "x")} ${v >= 0 ? "+ " + v : "- " + -v}`;
      const den = `(${ecrire(c, d)})^2`;
      const correct = `$f'(x) = \\dfrac{${num}}{${den}}$`;
      return {
        text: `Quelle est la dérivée de $f(x) = \\dfrac{${ecrire(a, b)}}{${ecrire(c, d)}}$ ?`,
        format: "qcm",
        choices: [
          correct,
          `$f'(x) = \\dfrac{${-num}}{${den}}$`,
          `$f'(x) = \\dfrac{${a}}{${c}}$`,
          `$f'(x) = \\dfrac{${num}}{${ecrire(c, d)}}$`,
        ].filter((v, i, tt) => tt.indexOf(v) === i),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée d'un quotient est $\\dfrac{u'v - uv'}{v^2}$ : un MOINS au numérateur, et le dénominateur au carré.",
          `On pose $u = ${ecrire(a, b)}$ et $v = ${ecrire(c, d)}$, donc $u' = ${a}$ et $v' = ${c}$.`,
          `Le numérateur vaut $${a}(${ecrire(c, d)}) - (${ecrire(a, b)}) \\times ${c}$ : les termes en $x$ se simplifient, il reste $${num}$.`,
          `${correct} — inverser l'ordre du numérateur donnerait $${-num}$, soit le signe contraire.`
        ),
      };
    },
  },

  /* ===================== DER_COMPOSEE_AFFINE ===================== */
  {
    kind: "fixed",
    id: "premiere_der_ca_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_composee_affine",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $x \\mapsto g(ax + b)$ ?",
    format: "qcm",
    choices: [
      "$a \\, g'(ax + b)$",
      "$g'(ax + b)$",
      "$g'(a)$",
      "$(ax + b) \\, g'(x)$",
    ],
    expected: ["$a \\, g'(ax + b)$"],
    comparator: "mcq_exact",
    hint: "Un facteur apparaît devant : lequel ?",
    explanation: exp(
      "Quand on remplace $x$ par $ax + b$ dans une fonction, la dérivée est multipliée par le coefficient $a$.",
      "La formule est $\\left(g(ax+b)\\right)' = a \\, g'(ax+b)$ : on dérive $g$, on garde $ax+b$ à l'intérieur, et on multiplie par $a$.",
      "Oublier ce facteur $a$ est l'erreur la plus fréquente du chapitre.",
      "$\\left(g(ax+b)\\right)' = a \\, g'(ax+b)$."
    ),
    tags: ["premiere", "maths", "derivation", "composee_affine", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_ca_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_composee_affine",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\sqrt{2x + 1}$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{1}{\\sqrt{2x+1}}$",
      "$\\dfrac{1}{2\\sqrt{2x+1}}$",
      "$\\dfrac{2}{\\sqrt{2x+1}}$",
      "$\\dfrac{1}{2\\sqrt{x}}$",
    ],
    expected: ["$\\dfrac{1}{\\sqrt{2x+1}}$"],
    comparator: "mcq_exact",
    hint: "$(\\sqrt{u})' = \\dfrac{1}{2\\sqrt{u}}$, puis on multiplie par $a = 2$.",
    explanation: exp(
      "On applique la règle avec $g = \\sqrt{\\ }$ et $a = 2$.",
      "$g'(u) = \\dfrac{1}{2\\sqrt{u}}$, donc $g'(2x+1) = \\dfrac{1}{2\\sqrt{2x+1}}$.",
      "On multiplie par $a = 2$ : $f'(x) = \\dfrac{2}{2\\sqrt{2x+1}} = \\dfrac{1}{\\sqrt{2x+1}}$. Le $2$ se simplifie — mais l'oublier changerait le résultat.",
      "$f'(x) = \\dfrac{1}{\\sqrt{2x+1}}$."
    ),
    tags: ["premiere", "maths", "derivation", "composee_affine", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_ca_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_composee_affine",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\dfrac{1}{2x - 3}$ ?",
    format: "qcm",
    choices: [
      "$-\\dfrac{2}{(2x-3)^2}$",
      "$-\\dfrac{1}{(2x-3)^2}$",
      "$\\dfrac{2}{(2x-3)^2}$",
      "$-\\dfrac{2}{2x-3}$",
    ],
    expected: ["$-\\dfrac{2}{(2x-3)^2}$"],
    comparator: "mcq_exact",
    hint: "Dérivée de l'inverse, avec $v' = 2$.",
    explanation: exp(
      "Deux chemins mènent au résultat : la dérivée de l'inverse, ou la règle de la composée affine.",
      "Par l'inverse : $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$ avec $v = 2x - 3$ et $v' = 2$.",
      "$f'(x) = -\\dfrac{2}{(2x-3)^2}$. Le facteur $2$ vient du coefficient de $x$ : c'est lui qu'on oublie le plus souvent.",
      "$f'(x) = -\\dfrac{2}{(2x-3)^2}$."
    ),
    tags: ["premiere", "maths", "derivation", "composee_affine", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_ca_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_composee_affine",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dérive $(5x + 2)^2$ et trouve $2(5x + 2)$. Quelle est son erreur ?",
    format: "qcm",
    choices: [
      "il a oublié de multiplier par $a = 5$",
      "il a oublié de dériver l'intérieur $5x + 2$ en $5x$",
      "il a mis un exposant $2$ de trop",
      "aucune : c'est correct",
    ],
    expected: ["il a oublié de multiplier par $a = 5$"],
    comparator: "mcq_exact",
    hint: "Développe pour vérifier : $(5x+2)^2 = 25x^2 + 20x + 4$.",
    explanation: exp(
      "La règle $\\left(g(ax+b)\\right)' = a \\, g'(ax+b)$ fait apparaître un facteur $a$ que l'élève a omis.",
      "Il a bien dérivé le carré, mais s'est arrêté à $2(5x+2)$ au lieu de $5 \\times 2(5x+2) = 10(5x+2)$.",
      "Contrôle en développant : $(25x^2 + 20x + 4)' = 50x + 20 = 10(5x + 2)$. Sa réponse valait la moitié.",
      "Il a oublié le facteur $a = 5$."
    ),
    tags: ["premiere", "maths", "derivation", "composee_affine", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_ca_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_composee_affine",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $f(x) = (2x - 1)^2$, combien vaut $f'(1)$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$f'(x) = 4(2x - 1)$, puis remplace $x$ par $1$.",
    explanation: exp(
      "On dérive avec la règle de la composée affine, puis on évalue.",
      "$f'(x) = 2 \\times 2(2x - 1) = 4(2x - 1)$.",
      "$f'(1) = 4 \\times (2 - 1) = 4$.",
      "$f'(1) = 4$."
    ),
    tags: ["premiere", "maths", "derivation", "composee_affine", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_ca_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_composee_affine",
    difficulty: 5,
    theme: "neutral",
    text: "Explique d'où vient le facteur $a$ dans la dérivée de $g(ax + b)$, en t'appuyant sur un exemple développé.",
    format: "open",
    expected: ["développ", "vérifi", "facteur", "intérieur"],
    comparator: "contains_keyword",
    hint: "Développe $(2x+1)^2$ et dérive : compare avec la règle.",
    explanation: exp(
      "Remplacer $x$ par $ax + b$ « accélère » la fonction : quand $x$ augmente de $1$, l'intérieur augmente de $a$.",
      "Vérification sur $(2x+1)^2$ : en développant, $4x^2 + 4x + 1$, dont la dérivée est $8x + 4$.",
      "Par la règle : $2 \\times 2(2x+1) = 4(2x+1) = 8x + 4$. Les deux coïncident, et le facteur $2$ est bien indispensable.",
      "Le facteur $a$ traduit la vitesse à laquelle l'intérieur $ax + b$ varie."
    ),
    tags: ["premiere", "maths", "derivation", "composee_affine", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_der_ca_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_composee_affine",
    difficulty: 5,
    theme: "neutral",
    text: "Dérive $f(x) = \\dfrac{1}{(3x + 2)}$ de deux façons différentes, et vérifie que tu obtiens le même résultat.",
    format: "open",
    expected: ["-3", "inverse", "carré", "composée"],
    comparator: "contains_keyword",
    hint: "Une fois avec la dérivée de l'inverse, une fois avec la règle de $g(ax+b)$.",
    explanation: exp(
      "Deux règles s'appliquent ici, et elles doivent donner le même résultat.",
      "Par l'inverse : $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$ avec $v = 3x+2$, $v' = 3$ : on obtient $-\\dfrac{3}{(3x+2)^2}$.",
      "Par la composée affine : $g(u) = \\dfrac{1}{u}$, $g'(u) = -\\dfrac{1}{u^2}$, donc $3 \\times \\left(-\\dfrac{1}{(3x+2)^2}\\right) = -\\dfrac{3}{(3x+2)^2}$.",
      "Les deux méthodes donnent $-\\dfrac{3}{(3x+2)^2}$."
    ),
    tags: ["premiere", "maths", "derivation", "composee_affine", "open"],
  },
  {
    kind: "template",
    id: "premiere_der_ca_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_composee_affine",
    difficulty: 5,
    theme: "neutral",
    hint: "Dérive la fonction extérieure, garde l'intérieur, multiplie par le coefficient de $x$.",
    tags: ["premiere", "maths", "derivation", "composee_affine", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(-5, 5) || 1;
      const signe = b < 0 ? `- ${-b}` : `+ ${b}`;
      const inner = `${a}x ${signe}`;
      return {
        text: `Quelle est la dérivée de $f(x) = (${inner})^2$ ?`,
        format: "qcm",
        choices: [
          `$${2 * a}(${inner})$`,
          `$2(${inner})$`,
          `$${a}(${inner})^2$`,
          `$${2 * a}x ${signe}$`,
        ],
        expected: [`$${2 * a}(${inner})$`],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique $\\left(g(ax+b)\\right)' = a \\, g'(ax+b)$, avec $g$ la fonction carré.",
          `$g'(u) = 2u$, donc $g'(${inner}) = 2(${inner})$.`,
          `On multiplie par le coefficient $a = ${a}$ : $${a} \\times 2 = ${2 * a}$.`,
          `$f'(x) = ${2 * a}(${inner})$ — sans le facteur $${a}$, le résultat serait faux.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_der_ca_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_composee_affine",
    difficulty: 5,
    theme: "neutral",
    hint: "Nomme la fonction extérieure, dérive-la, puis n'oublie pas le facteur.",
    tags: ["premiere", "maths", "derivation", "composee_affine", "open", "template"],
    generate: () => {
      const cas = [
        {
          f: "$f(x) = \\sqrt{4x + 3}$",
          mots: ["4", "racine", "2", "facteur"],
          calcul:
            "$g = \\sqrt{\\ }$, $g'(u) = \\dfrac{1}{2\\sqrt{u}}$ : $f'(x) = 4 \\times \\dfrac{1}{2\\sqrt{4x+3}} = \\dfrac{2}{\\sqrt{4x+3}}$.",
        },
        {
          f: "$f(x) = (2x + 7)^3$",
          mots: ["6", "cube", "facteur", "3"],
          calcul:
            "$g(u) = u^3$, $g'(u) = 3u^2$ : $f'(x) = 2 \\times 3(2x+7)^2 = 6(2x+7)^2$.",
        },
        {
          f: "$f(x) = \\dfrac{1}{5x - 1}$",
          mots: ["-5", "inverse", "carré", "facteur"],
          calcul:
            "$g(u) = \\dfrac{1}{u}$, $g'(u) = -\\dfrac{1}{u^2}$ : $f'(x) = 5 \\times \\left(-\\dfrac{1}{(5x-1)^2}\\right) = -\\dfrac{5}{(5x-1)^2}$.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Dérive ${c.f} en détaillant la méthode, et explique d'où vient le facteur qui apparaît.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Pour $g(ax+b)$, on dérive la fonction extérieure en gardant l'intérieur inchangé, puis on multiplie par $a$.",
          "Ce facteur $a$ traduit la vitesse de variation de l'intérieur.",
          c.calcul,
          "L'oublier divise ou multiplie le résultat par $a$ : c'est l'erreur la plus courante du chapitre."
        ),
      };
    },
  },

  /* ===================== DER_VALEUR_ABSOLUE ===================== */
  {
    kind: "fixed",
    id: "premiere_der_va_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_valeur_absolue",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction valeur absolue $x \\mapsto |x|$ est-elle dérivable en $0$ ?",
    format: "qcm",
    choices: [
      "non, alors qu'elle y est pourtant définie et continue",
      "oui, sa dérivée y vaut $0$",
      "non, car elle n'est pas définie en $0$",
      "oui, sa dérivée y vaut $1$",
    ],
    expected: ["non, alors qu'elle y est pourtant définie et continue"],
    comparator: "mcq_exact",
    hint: "Regarde l'allure de la courbe en $0$ : y a-t-il UNE tangente ?",
    explanation: exp(
      "Être dérivable en un point exige que le taux de variation admette une limite unique.",
      "$|0| = 0$ : la fonction est bien définie en $0$, et sa courbe n'a aucun saut — elle est continue.",
      "Mais sa courbe forme un ANGLE en $0$ : à gauche la pente vaut $-1$, à droite $+1$. Il n'y a pas de tangente unique, donc pas de nombre dérivé.",
      "Non : définie et continue, mais pas dérivable en $0$."
    ),
    tags: ["premiere", "maths", "derivation", "valeur_absolue", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_va_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_valeur_absolue",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $x > 0$, que vaut la dérivée de $f(x) = |x|$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Pour $x > 0$, $|x| = x$.",
    explanation: exp(
      "On traite la valeur absolue par disjonction de cas.",
      "Pour $x > 0$, $|x| = x$ : la fonction coïncide avec la fonction identité.",
      "Sa dérivée vaut donc $1$ : sur cette moitié, la courbe est la droite d'équation $y = x$.",
      "$f'(x) = 1$ pour $x > 0$."
    ),
    tags: ["premiere", "maths", "derivation", "valeur_absolue", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_va_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_valeur_absolue",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $x < 0$, que vaut la dérivée de $f(x) = |x|$ ?",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "Pour $x < 0$, $|x| = -x$.",
    explanation: exp(
      "On applique la définition de la valeur absolue sur les négatifs.",
      "Pour $x < 0$, $|x| = -x$ : par exemple $|-3| = 3 = -(-3)$.",
      "La dérivée de $-x$ vaut $-1$ : sur cette moitié, la courbe est la droite $y = -x$, qui descend.",
      "$f'(x) = -1$ pour $x < 0$."
    ),
    tags: ["premiere", "maths", "derivation", "valeur_absolue", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_va_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_valeur_absolue",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l'allure de la courbe de $x \\mapsto |x|$ ?",
    format: "qcm",
    choices: [
      "deux demi-droites formant un V, avec un angle en $0$",
      "une parabole",
      "une droite",
      "une courbe arrondie en $0$",
    ],
    expected: ["deux demi-droites formant un V, avec un angle en $0$"],
    comparator: "mcq_exact",
    hint: "$y = -x$ à gauche, $y = x$ à droite.",
    explanation: exp(
      "La valeur absolue se définit par deux expressions selon le signe de $x$.",
      "À gauche de $0$ : la droite $y = -x$, qui descend. À droite : la droite $y = x$, qui monte.",
      "Les deux demi-droites se rejoignent en $0$ en formant un angle — d'où le V. C'est cet angle, et non un trou, qui empêche la dérivabilité.",
      "C'est un V, avec un angle au point $(0 ; 0)$."
    ),
    tags: ["premiere", "maths", "derivation", "valeur_absolue", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_va_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_valeur_absolue",
    difficulty: 5,
    theme: "neutral",
    text: "Une fonction continue en un point y est-elle forcément dérivable ?",
    format: "qcm",
    choices: [
      "non : la valeur absolue est continue en $0$ sans y être dérivable",
      "oui, toujours",
      "non : une fonction continue n'est jamais dérivable",
      "oui, si elle est positive",
    ],
    expected: [
      "non : la valeur absolue est continue en $0$ sans y être dérivable",
    ],
    comparator: "mcq_exact",
    hint: "Un contre-exemple suffit à répondre.",
    explanation: exp(
      "Continuité et dérivabilité sont deux propriétés distinctes : la seconde est plus exigeante.",
      "Une fonction continue se trace sans lever le crayon ; une fonction dérivable admet en plus une tangente en chaque point.",
      "$|x|$ se trace sans lever le crayon, mais l'angle en $0$ interdit toute tangente : c'est un contre-exemple. (En revanche, dérivable entraîne bien continue.)",
      "Non : $|x|$ en $0$ est le contre-exemple classique."
    ),
    tags: ["premiere", "maths", "derivation", "valeur_absolue", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_va_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_valeur_absolue",
    difficulty: 5,
    theme: "neutral",
    text: "Combien vaut $|-7|$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La valeur absolue est toujours positive : c'est la distance à zéro.",
    explanation: exp(
      "La valeur absolue d'un nombre est sa distance à $0$ : elle est toujours positive ou nulle.",
      "Pour un nombre négatif, on prend son opposé : $|-7| = -(-7)$.",
      "$= 7$.",
      "$|-7| = 7$."
    ),
    tags: ["premiere", "maths", "derivation", "valeur_absolue", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_va_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_valeur_absolue",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi $x \\mapsto |x|$ n'est pas dérivable en $0$, en parlant des pentes à gauche et à droite.",
    format: "open",
    expected: ["-1", "1", "angle", "tangente"],
    comparator: "contains_keyword",
    hint: "Que vaut le taux de variation en $0$ selon qu'on approche par la gauche ou par la droite ?",
    explanation: exp(
      "Le nombre dérivé est la limite du taux de variation : encore faut-il qu'il n'y en ait qu'une.",
      "En approchant $0$ par la droite ($h > 0$) : le taux vaut $\\dfrac{|h|}{h} = 1$.",
      "En approchant par la gauche ($h < 0$) : le taux vaut $\\dfrac{-h}{h} = -1$. Les deux limites diffèrent, il n'y a donc pas de limite unique.",
      "Deux pentes différentes de part et d'autre : pas de tangente unique, donc pas de dérivée en $0$."
    ),
    tags: ["premiere", "maths", "derivation", "valeur_absolue", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_der_va_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_valeur_absolue",
    difficulty: 5,
    theme: "neutral",
    text: "Décris les variations de $x \\mapsto |x|$ sur $\\mathbb{R}$ et dis où elle atteint son minimum.",
    format: "open",
    expected: ["décroissante", "croissante", "0", "minimum"],
    comparator: "contains_keyword",
    hint: "Deux morceaux : avant $0$ et après $0$.",
    explanation: exp(
      "On étudie la fonction par disjonction de cas, chaque morceau étant une fonction affine.",
      "Sur $]-\\infty ; 0]$, $|x| = -x$ : la fonction est décroissante. Sur $[0 ; +\\infty[$, $|x| = x$ : elle est croissante.",
      "Elle décroît puis croît : son minimum est atteint en $x = 0$, où elle vaut $0$.",
      "Décroissante puis croissante, avec un minimum de $0$ atteint en $0$."
    ),
    tags: ["premiere", "maths", "derivation", "valeur_absolue", "open"],
  },
  {
    kind: "template",
    id: "premiere_der_va_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_valeur_absolue",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour $x > 0$ la dérivée vaut $1$, pour $x < 0$ elle vaut $-1$.",
    tags: ["premiere", "maths", "derivation", "valeur_absolue", "template"],
    generate: () => {
      const x = pickOne([-6, -4, -2, 3, 5, 8]);
      const d = x > 0 ? 1 : -1;
      return {
        text: `Que vaut la dérivée de $f(x) = |x|$ au point d'abscisse $${x}$ ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: exp(
          "La valeur absolue s'étudie par disjonction de cas : $|x| = x$ si $x > 0$, et $|x| = -x$ si $x < 0$.",
          `Ici $${x}$ est ${x > 0 ? "positif" : "négatif"}, donc on est sur la branche $${x > 0 ? "y = x" : "y = -x"}$.`,
          `La dérivée y vaut $${d}$.`,
          `$f'(${x}) = ${d}$. Seul le point $0$ pose problème, car les deux branches s'y rejoignent en formant un angle.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_der_va_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_valeur_absolue",
    difficulty: 5,
    theme: "neutral",
    hint: "Distingue ce qui est vrai (définie, continue) de ce qui est faux (dérivable).",
    tags: ["premiere", "maths", "derivation", "valeur_absolue", "open", "template"],
    generate: () => {
      const cas = [
        {
          affirmation: "« $|x|$ n'est pas définie en $0$ »",
          mots: ["définie", "0", "faux", "continue"],
          verdict:
            "FAUX : $|0| = 0$, la fonction est parfaitement définie en $0$. Ce qui manque, c'est la dérivabilité.",
        },
        {
          affirmation: "« $|x|$ est dérivable partout sauf en $0$ »",
          mots: ["vrai", "0", "angle", "1"],
          verdict:
            "VRAI : sur $]0 ; +\\infty[$ la dérivée vaut $1$, sur $]-\\infty ; 0[$ elle vaut $-1$. Seul $0$ pose problème, à cause de l'angle.",
        },
        {
          affirmation: "« la courbe de $|x|$ est une parabole »",
          mots: ["faux", "droites", "V", "angle"],
          verdict:
            "FAUX : la courbe est formée de DEUX DEMI-DROITES en V, pas d'une parabole. Une parabole serait arrondie et dérivable en $0$.",
        },
        {
          affirmation: "« toute fonction continue est dérivable »",
          mots: ["faux", "contre-exemple", "angle", "0"],
          verdict:
            "FAUX : $|x|$ est continue en $0$ sans y être dérivable. C'est LE contre-exemple du programme.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Cette affirmation est-elle vraie ou fausse ? ${c.affirmation} Justifie.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "La valeur absolue sert justement à distinguer définie, continue et dérivable — trois propriétés différentes.",
          "On vérifie chacune séparément avant de conclure.",
          c.verdict,
          "Retenir : $|x|$ est définie et continue partout, mais dérivable seulement sur $\\mathbb{R}$ privé de $0$."
        ),
      };
    },
  },

  /* ===================== DER_GRAPHIQUE ===================== */
  {
    kind: "fixed",
    id: "premiere_der_gra_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Sur le graphique, la tangente à la courbe au point $A$ d'abscisse $1$ a pour coefficient directeur $2$. Combien vaut $f'(1)$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Le nombre dérivé EST la pente de la tangente.",
    explanation: exp(
      "Le nombre dérivé en $a$ est par définition le coefficient directeur de la tangente au point d'abscisse $a$.",
      "La lecture graphique donne directement cette pente : ici $2$.",
      "Aucun calcul n'est nécessaire : $f'(1) = 2$.",
      "$f'(1) = 2$."
    ),
    canvas: tangente(0, 0, 1),
    tags: ["premiere", "maths", "derivation", "graphique", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_gra_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_graphique",
    difficulty: 4,
    theme: "neutral",
    text: "Sur le graphique, la tangente au point $A$ d'abscisse $2$ est HORIZONTALE. Que vaut $f'(2)$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Quel est le coefficient directeur d'une droite horizontale ?",
    explanation: exp(
      "Le nombre dérivé est le coefficient directeur de la tangente.",
      "Une droite horizontale a une pente nulle : elle ne monte ni ne descend.",
      "Donc $f'(2) = 0$. C'est le signe d'un extremum possible — ici, le sommet de la parabole.",
      "$f'(2) = 0$."
    ),
    canvas: tangente(-4, 3, 2),
    tags: ["premiere", "maths", "derivation", "graphique", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_gra_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_graphique",
    difficulty: 4,
    theme: "neutral",
    text: "Sur le graphique, la tangente au point d'abscisse $1$ DESCEND. Que peut-on dire de $f'(1)$ ?",
    format: "qcm",
    choices: [
      "$f'(1) < 0$",
      "$f'(1) > 0$",
      "$f'(1) = 0$",
      "on ne peut rien dire",
    ],
    expected: ["$f'(1) < 0$"],
    comparator: "mcq_exact",
    hint: "Une droite qui descend a un coefficient directeur négatif.",
    explanation: exp(
      "Le signe du nombre dérivé se lit sur l'inclinaison de la tangente.",
      "Une tangente qui descend de gauche à droite a un coefficient directeur négatif.",
      "Donc $f'(1) < 0$, et la fonction est décroissante au voisinage de $1$. (Ici $f'(1) = -2$.)",
      "$f'(1) < 0$."
    ),
    canvas: tangente(-4, 3, 1),
    tags: ["premiere", "maths", "derivation", "graphique", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_gra_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_graphique",
    difficulty: 5,
    theme: "neutral",
    text: "La tangente à $\\mathcal{C}_f$ au point d'abscisse $3$ passe par les points $(0 ; 1)$ et $(2 ; 5)$. Combien vaut $f'(3)$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Calcule la pente entre les deux points : $\\dfrac{5 - 1}{2 - 0}$.",
    explanation: exp(
      "Le nombre dérivé est le coefficient directeur de la tangente : on le calcule à partir de deux points de cette droite.",
      "Pente $= \\dfrac{y_B - y_A}{x_B - x_A} = \\dfrac{5 - 1}{2 - 0}$.",
      "$= \\dfrac{4}{2} = 2$. Peu importe que ces points ne soient pas sur la courbe : ils sont sur la tangente, cela suffit.",
      "$f'(3) = 2$."
    ),
    tags: ["premiere", "maths", "derivation", "graphique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_der_gra_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_graphique",
    difficulty: 5,
    theme: "neutral",
    text: "Pour tracer la tangente en un point, sachant $f(2) = 3$ et $f'(2) = 1$, que fait-on ?",
    format: "qcm",
    choices: [
      "on part du point $(2 ; 3)$ et on avance de $1$ vers la droite, $1$ vers le haut",
      "on part du point $(2 ; 1)$ et on trace une horizontale",
      "on part de l'origine avec une pente de $3$",
      "on trace la droite passant par $(2 ; 3)$ et $(3 ; 3)$",
    ],
    expected: [
      "on part du point $(2 ; 3)$ et on avance de $1$ vers la droite, $1$ vers le haut",
    ],
    comparator: "mcq_exact",
    hint: "$f(2)$ donne le point de contact, $f'(2)$ donne la pente.",
    explanation: exp(
      "Deux informations suffisent à tracer une droite : un point et une pente.",
      "$f(2) = 3$ donne le point de contact $(2 ; 3)$ ; $f'(2) = 1$ donne la pente.",
      "Une pente de $1$ signifie : $1$ vers la droite, $1$ vers le haut. On place ainsi un second point $(3 ; 4)$ et on trace.",
      "On part de $(2 ; 3)$ avec une pente de $1$."
    ),
    tags: ["premiere", "maths", "derivation", "graphique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_gra_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_graphique",
    difficulty: 5,
    theme: "neutral",
    text: "Sur un graphique, le point $A$ de la courbe a pour ordonnée $4$, et la tangente en $A$ a pour pente $-3$. Que valent $f(a)$ et $f'(a)$ ?",
    format: "qcm",
    choices: [
      "$f(a) = 4$ et $f'(a) = -3$",
      "$f(a) = -3$ et $f'(a) = 4$",
      "$f(a) = 4$ et $f'(a) = 4$",
      "$f(a) = -3$ et $f'(a) = -3$",
    ],
    expected: ["$f(a) = 4$ et $f'(a) = -3$"],
    comparator: "mcq_exact",
    hint: "L'ordonnée du point, c'est la valeur. La pente, c'est la dérivée.",
    explanation: exp(
      "Sur un graphique, deux lectures différentes se font au même point.",
      "L'ORDONNÉE du point de la courbe donne $f(a)$ : ici $4$.",
      "La PENTE de la tangente donne $f'(a)$ : ici $-3$. Les intervertir est l'erreur classique, et elle fausse toute équation de tangente.",
      "$f(a) = 4$ et $f'(a) = -3$."
    ),
    tags: ["premiere", "maths", "derivation", "graphique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_der_gra_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_graphique",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment lire $f'(a)$ sur un graphique où la tangente est déjà tracée.",
    format: "open",
    expected: ["pente", "deux points", "coefficient", "tangente"],
    comparator: "contains_keyword",
    hint: "On repère deux points bien placés sur la tangente.",
    explanation: exp(
      "Le nombre dérivé est le coefficient directeur de la tangente au point d'abscisse $a$.",
      "On repère deux points de la TANGENTE dont les coordonnées se lisent facilement, de préférence sur les croisements du quadrillage.",
      "On calcule alors $\\dfrac{y_B - y_A}{x_B - x_A}$. Astuce : si l'on avance de $1$ vers la droite, la montée lue donne directement la pente.",
      "On lit la pente de la tangente à l'aide de deux de ses points."
    ),
    tags: ["premiere", "maths", "derivation", "graphique", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_der_gra_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_graphique",
    difficulty: 5,
    theme: "neutral",
    text: "Sur une courbe, comment repérer graphiquement les points où $f'(x) = 0$ ? À quoi correspondent-ils ?",
    format: "open",
    expected: ["horizontale", "tangente", "extremum", "sommet"],
    comparator: "contains_keyword",
    hint: "Quelle allure a la tangente quand la pente est nulle ?",
    explanation: exp(
      "Une dérivée nulle signifie une tangente de pente nulle, c'est-à-dire horizontale.",
      "On cherche donc sur la courbe les points où la tangente est parallèle à l'axe des abscisses.",
      "Ce sont les endroits où la courbe « marque une pause » avant de repartir : sommets, creux, paliers. Ils correspondent aux extremums — à condition que $f'$ change bien de signe, comme le rappelle le cas de $x^3$ en $0$.",
      "Ce sont les points à tangente horizontale, candidats à être des extremums."
    ),
    tags: ["premiere", "maths", "derivation", "graphique", "open"],
  },
  {
    kind: "template",
    id: "premiere_der_gra_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_graphique",
    difficulty: 4,
    theme: "neutral",
    hint: "La pente se calcule avec deux points de la tangente.",
    tags: ["premiere", "maths", "derivation", "graphique", "template"],
    generate: () => {
      const xa = randomInt(0, 3);
      const ya = randomInt(-2, 4);
      const p = pickOne([-3, -2, -1, 1, 2, 3, 4]);
      const dx = randomInt(1, 3);
      const xb = xa + dx;
      const yb = ya + p * dx;
      return {
        text: `La tangente à $\\mathcal{C}_f$ au point d'abscisse $${xa}$ passe par $(${xa} ; ${ya})$ et $(${xb} ; ${yb})$. Combien vaut $f'(${xa})$ ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: exp(
          "Le nombre dérivé est le coefficient directeur de la tangente.",
          `On calcule la pente entre les deux points : $\\dfrac{${yb} - ${ya}}{${xb} - ${xa}}$.`,
          `$= \\dfrac{${yb - ya}}{${dx}} = ${p}$.`,
          `$f'(${xa}) = ${p}$${p < 0 ? " : la tangente descend, la fonction décroît en ce point." : p > 0 ? " : la tangente monte, la fonction croît en ce point." : "."}`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_der_gra_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_graphique",
    difficulty: 5,
    theme: "neutral",
    hint: "Distingue bien l'ordonnée du point (valeur) et la pente de la tangente (dérivée).",
    tags: ["premiere", "maths", "derivation", "graphique", "open", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      const fa = randomInt(-3, 6);
      const d = pickOne([-4, -2, -1, 0, 2, 3]);
      return {
        text: `Sur un graphique, le point de la courbe d'abscisse $${a}$ a pour ordonnée $${fa}$, et la tangente en ce point a pour pente $${d}$. Donne $f(${a})$ et $f'(${a})$, puis l'équation de la tangente.`,
        format: "open",
        expected: [String(fa), String(d), "tangente", "pente"],
        comparator: "contains_keyword",
        explanation: exp(
          "L'ordonnée du point donne $f(a)$ ; la pente de la tangente donne $f'(a)$. L'équation de la tangente est $y = f'(a)(x - a) + f(a)$.",
          `Ici $f(${a}) = ${fa}$ et $f'(${a}) = ${d}$.`,
          `Équation : $y = ${d}(x - ${a}) + ${fa}$, soit $y = ${d}x ${-d * a + fa >= 0 ? "+ " + (-d * a + fa) : "- " + -(-d * a + fa)}$.`,
          d === 0
            ? "La pente étant nulle, la tangente est horizontale : il y a peut-être un extremum en ce point."
            : "Ne pas intervertir la valeur et la pente : c'est l'erreur qui fausse toute l'équation."
        ),
      };
    },
  },

  /* =========================================================
     QUESTIONS OUVERTES — compléments du 02/08/2026.
     Quatre micro-compétences de ce chapitre n'avaient aucune question
     ouverte : deux ouvertes fixes + un TEMPLATE ouvert pour chacune.
  ========================================================= */

  {
    kind: "fixed",
    id: "premiere_der_tau_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 5,
    theme: "neutral",
    text: "Que représente le taux de variation d'une fonction entre deux points, sur le dessin de sa courbe ?",
    format: "open",
    expected: ["pente", "coefficient directeur", "secante", "sécante", "droite", "deux points"],
    comparator: "contains_keyword",
    hint: "Trace la droite qui joint les deux points de la courbe.",
    explanation: exp(
      "Le taux de variation de $f$ entre $a$ et $b$ est le quotient $\\dfrac{f(b) - f(a)}{b - a}$ : une variation d'ordonnées divisée par une variation d'abscisses.",
      "C'est exactement la façon dont on calcule le coefficient directeur d'une droite à partir de deux de ses points.",
      "Ici les deux points sont sur la courbe : la droite qui les joint s'appelle une SÉCANTE, et le taux de variation en est la pente.",
      "C'est la pente moyenne entre les deux points — l'idée de la dérivation est ensuite de rapprocher le second point du premier pour obtenir la pente à un instant précis."
    ),
    tags: ["premiere", "maths", "derivation", "taux", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_der_tau_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 5,
    theme: "neutral",
    text: "Un trajet de $120$ km parcouru en $2$ heures donne une vitesse moyenne de $60$ km/h. En quoi cela ressemble-t-il à un taux de variation, et que ne dit-il pas ?",
    format: "open",
    expected: ["moyenne", "instant", "precis", "précis", "pas la vitesse", "secante", "sécante"],
    comparator: "contains_keyword",
    hint: "La vitesse a-t-elle valu $60$ km/h à chaque instant du trajet ?",
    explanation: exp(
      "La vitesse moyenne est le quotient de la distance parcourue par le temps écoulé : c'est un taux de variation de la position.",
      "$\\dfrac{120}{2} = 60$ km/h : la même structure exactement que $\\dfrac{f(b) - f(a)}{b - a}$.",
      "Mais elle ne dit rien de ce qui s'est passé pendant le trajet : on a pu s'arrêter, rouler à $90$, redémarrer. La moyenne écrase tout.",
      "Le taux de variation donne une pente MOYENNE, pas la pente à un instant. Pour connaître la vitesse à un instant précis — ce qu'affiche le compteur — il faut le nombre dérivé."
    ),
    tags: ["premiere", "maths", "derivation", "taux", "open"],
  },
  {
    kind: "template",
    id: "premiere_der_tau_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_taux",
    difficulty: 5,
    theme: "neutral",
    hint: "$\\dfrac{f(b) - f(a)}{b - a}$ — et dis ce que ce nombre représente sur la courbe.",
    tags: ["premiere", "maths", "derivation", "taux", "open", "template"],
    generate: () => {
      const cas = [
        { f: "f(x) = x^2", a: 1, b: 3, fa: 1, fb: 9, t: "4" },
        { f: "f(x) = x^2", a: 0, b: 2, fa: 0, fb: 4, t: "2" },
        { f: "f(x) = x^2 + 1", a: 2, b: 4, fa: 5, fb: 17, t: "6" },
        { f: "f(x) = 3x - 1", a: 1, b: 5, fa: 2, fb: 14, t: "3" },
        { f: "f(x) = x^3", a: 0, b: 2, fa: 0, fb: 8, t: "4" },
      ];
      const c = pickOne(cas);
      return {
        text: `Calcule le taux de variation de $${c.f}$ entre $${c.a}$ et $${c.b}$, puis explique ce que ce nombre représente sur la courbe.`,
        format: "open",
        expected: [c.t, "pente", "secante", "sécante", "coefficient directeur"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le taux de variation entre deux points est le quotient de la variation des images par celle des abscisses.",
          `On calcule les deux images : $f(${c.a}) = ${c.fa}$ et $f(${c.b}) = ${c.fb}$.`,
          `Le taux vaut $\\dfrac{${c.fb} - ${c.fa}}{${c.b} - ${c.a}} = ${c.t}$.`,
          `C'est le coefficient directeur de la sécante joignant les points d'abscisses $${c.a}$ et $${c.b}$ : la pente MOYENNE de la courbe entre ces deux points.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_der_tan_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 5,
    theme: "neutral",
    text: "Que représente le nombre $f'(a)$ sur le dessin de la courbe de $f$ ?",
    format: "open",
    expected: ["coefficient directeur", "pente", "tangente", "point d'abscisse"],
    comparator: "contains_keyword",
    hint: "Quelle droite touche la courbe au point d'abscisse $a$ ?",
    explanation: exp(
      "Le nombre dérivé $f'(a)$ s'obtient en rapprochant indéfiniment le second point du premier dans le taux de variation.",
      "Les sécantes basculent alors vers une position limite : la TANGENTE à la courbe au point d'abscisse $a$.",
      "$f'(a)$ est le coefficient directeur de cette tangente : la pente de la courbe à cet endroit précis. Une valeur positive signifie que la courbe monte, une valeur nulle que la tangente est horizontale.",
      "$f'(a)$ mesure l'inclinaison de la courbe en un point — l'équation de la tangente s'écrit ensuite $y = f'(a)(x - a) + f(a)$."
    ),
    tags: ["premiere", "maths", "derivation", "tangente", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_der_tan_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève écrit l'équation de la tangente sous la forme $y = f'(a)(x - a)$ et oublie le terme $f(a)$. Qu'est-ce que cela change ?",
    format: "open",
    expected: ["passe par", "origine", "hauteur", "point de contact", "translation", "f(a)"],
    comparator: "contains_keyword",
    hint: "Sa droite passe-t-elle par le point de la courbe ?",
    explanation: exp(
      "Une droite est définie par deux informations : sa pente, et un point par lequel elle passe.",
      "Le facteur $f'(a)$ donne la bonne pente : sa droite est donc bien PARALLÈLE à la tangente.",
      "Mais sans le terme $f(a)$, elle passe par le point $(a ; 0)$ au lieu de $(a ; f(a))$ : elle est décalée verticalement de $f(a)$, et ne touche pas la courbe.",
      "La pente est juste, la hauteur est fausse : $f'(a)$ dit comment la droite penche, $f(a)$ dit où elle passe."
    ),
    tags: ["premiere", "maths", "derivation", "tangente", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_der_tan_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 5,
    theme: "neutral",
    hint: "$y = f'(a)(x - a) + f(a)$ : il faut DEUX calculs, $f(a)$ et $f'(a)$.",
    tags: ["premiere", "maths", "derivation", "tangente", "open", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      const fa = a * a;
      const fpa = 2 * a;
      return {
        text: `Soit $f(x) = x^2$. Détermine l'équation de la tangente à sa courbe au point d'abscisse $${a}$, en expliquant à quoi sert chacun des deux nombres que tu calcules.`,
        format: "open",
        expected: [String(fa), String(fpa), "pente", "point", "tangente"],
        comparator: "contains_keyword",
        canvas: tangente(0, 0, a),
        explanation: exp(
          "L'équation de la tangente au point d'abscisse $a$ est $y = f'(a)(x - a) + f(a)$ : elle demande la pente ET le point de contact.",
          `On calcule d'abord l'ordonnée du point : $f(${a}) = ${fa}$. La tangente passe donc par $(${a} ; ${fa})$.`,
          `Puis la pente : $f'(x) = 2x$, donc $f'(${a}) = ${fpa}$.`,
          `L'équation est $y = ${fpa}(x - ${a}) + ${fa}$, soit $y = ${fpa}x - ${fpa * a - fa}$. Sans $f(${a})$, la droite aurait la bonne pente mais ne toucherait pas la courbe.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_der_usu_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi la dérivée d'une fonction constante est-elle nulle ?",
    format: "open",
    expected: ["horizontale", "pente", "ne varie pas", "taux", "0"],
    comparator: "contains_keyword",
    hint: "À quoi ressemble la courbe d'une fonction constante ?",
    explanation: exp(
      "La dérivée mesure la pente de la courbe, c'est-à-dire la vitesse à laquelle la fonction change.",
      "Une fonction constante ne change jamais : sa courbe est une droite HORIZONTALE.",
      "Le taux de variation le confirme : entre deux points quelconques, $\\dfrac{f(b) - f(a)}{b - a} = \\dfrac{0}{b - a} = 0$, puisque les deux images sont égales.",
      "Une pente nulle partout donne une dérivée nulle partout — c'est aussi pourquoi une constante additive disparaît en dérivant."
    ),
    tags: ["premiere", "maths", "derivation", "usuelles", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_der_usu_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 5,
    theme: "neutral",
    text: "La fonction racine carrée est définie en $0$, mais elle n'y est pas dérivable. Que se passe-t-il sur sa courbe ?",
    format: "open",
    expected: ["verticale", "tangente", "pente infinie", "de plus en plus", "raide"],
    comparator: "contains_keyword",
    hint: "Regarde comment la courbe démarre à l'origine.",
    explanation: exp(
      "Être dérivable en un point, c'est avoir une tangente de pente FINIE en ce point.",
      "La courbe de la racine carrée part de l'origine en montant très brutalement, puis s'aplatit progressivement.",
      "Plus on s'approche de $0$, plus les sécantes deviennent raides : leur pente ne se stabilise pas, elle grandit sans limite. La courbe admet bien une tangente en $0$, mais elle est VERTICALE — et une droite verticale n'a pas de coefficient directeur.",
      "La fonction existe en $0$ mais n'y a pas de nombre dérivé : sa dérivée $\\dfrac{1}{2\\sqrt{x}}$ n'est définie que sur $]0 ; +\\infty[$."
    ),
    tags: ["premiere", "maths", "derivation", "usuelles", "open"],
  },
  {
    kind: "template",
    id: "premiere_der_usu_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 5,
    theme: "neutral",
    hint: "Donne la dérivée, puis dis sur quel ensemble elle est valable.",
    tags: ["premiere", "maths", "derivation", "usuelles", "open", "template"],
    generate: () => {
      const cas = [
        { f: "f(x) = x^2", d: "2x", ens: "$\\mathbb{R}$", note: "un polynôme est dérivable partout" },
        { f: "f(x) = x^3", d: "3x^2", ens: "$\\mathbb{R}$", note: "un polynôme est dérivable partout" },
        { f: "f(x) = \\dfrac{1}{x}", d: "-\\dfrac{1}{x^2}", ens: "$\\mathbb{R}^*$", note: "la fonction n'est pas définie en $0$" },
        { f: "f(x) = \\sqrt{x}", d: "\\dfrac{1}{2\\sqrt{x}}", ens: "$]0 ; +\\infty[$", note: "définie en $0$, mais pas dérivable en $0$ : la tangente y est verticale" },
        { f: "f(x) = 5", d: "0", ens: "$\\mathbb{R}$", note: "une constante ne varie pas" },
      ];
      const c = pickOne(cas);
      return {
        text: `Donne la dérivée de $${c.f}$, précise sur quel ensemble elle est définie, et justifie cet ensemble.`,
        format: "open",
        expected: [c.d.replace(/\\dfrac\{(.*?)\}\{(.*?)\}/, "$1/$2"), "derivable", "dérivable", "definie", "définie", "ensemble"],
        comparator: "contains_keyword",
        explanation: exp(
          "Une fonction n'est dérivable que là où la pente de sa courbe existe et reste finie : l'ensemble de dérivabilité peut être plus petit que l'ensemble de définition.",
          `Ici la dérivée de $${c.f}$ est $${c.d}$.`,
          `Elle est définie sur ${c.ens}, car ${c.note}.`,
          "On précise toujours cet ensemble : écrire une dérivée sans dire où elle est valable, c'est laisser passer les cas limites."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_der_ope_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi la dérivée d'un produit n'est-elle PAS le produit des dérivées ? Donne un contre-exemple.",
    format: "open",
    expected: ["contre-exemple", "contre exemple", "u'v + uv'", "x^2", "2x", "faux"],
    comparator: "contains_keyword",
    hint: "Essaie avec $f(x) = x \\times x$.",
    explanation: exp(
      "La dérivation se comporte bien avec l'addition, mais pas avec la multiplication : il faut la formule $(uv)' = u'v + uv'$.",
      "Contre-exemple simple : prenons $u(x) = x$ et $v(x) = x$, donc $uv = x^2$.",
      "Le produit des dérivées donnerait $1 \\times 1 = 1$. Or la dérivée de $x^2$ est $2x$, qui ne vaut $1$ que pour $x = 0{,}5$. La formule correcte donne bien $1 \\times x + x \\times 1 = 2x$.",
      "Intuitivement : quand deux facteurs varient ensemble, chacun contribue à sa manière — d'où les DEUX termes de la formule."
    ),
    tags: ["premiere", "maths", "derivation", "operations", "piege", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_der_ope_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 5,
    theme: "neutral",
    text: "Comment sait-on, en regardant une expression, quelle formule de dérivation appliquer ?",
    format: "open",
    expected: ["derniere operation", "dernière opération", "somme", "produit", "quotient", "structure"],
    comparator: "contains_keyword",
    hint: "Quelle est la DERNIÈRE opération qu'on effectuerait pour calculer l'expression ?",
    explanation: exp(
      "Chaque formule de dérivation correspond à une structure : somme, produit, quotient, ou fonction usuelle.",
      "Pour choisir, on repère la dernière opération qu'on effectuerait en calculant l'expression pour un $x$ donné.",
      "Dans $3x^2 + 5x$, la dernière opération est une addition : c'est la formule de la somme, et on dérive chaque morceau. Dans $(3x + 1)(x - 2)$, c'est une multiplication : formule du produit. Dans $\\dfrac{x}{x+1}$, une division : formule du quotient.",
      "On dérive de l'extérieur vers l'intérieur : la structure d'ensemble d'abord, les morceaux ensuite."
    ),
    tags: ["premiere", "maths", "derivation", "operations", "open"],
  },
  {
    kind: "template",
    id: "premiere_der_ope_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 5,
    theme: "neutral",
    hint: "Repère d'abord la structure : somme, produit ou quotient.",
    tags: ["premiere", "maths", "derivation", "operations", "open", "template"],
    generate: () => {
      const cas = [
        { f: "f(x) = x^2 + 3x - 5", struct: "une somme", regle: "on dérive chaque terme séparément", d: "2x + 3" },
        { f: "f(x) = (2x + 1)(x - 3)", struct: "un produit", regle: "$(uv)' = u'v + uv'$", d: "2(x-3) + (2x+1) = 4x - 5" },
        { f: "f(x) = x^2(x + 4)", struct: "un produit", regle: "$(uv)' = u'v + uv'$", d: "2x(x+4) + x^2 = 3x^2 + 8x" },
        { f: "f(x) = 5x^3 - 2x", struct: "une somme", regle: "on dérive chaque terme séparément", d: "15x^2 - 2" },
        { f: "f(x) = (x + 1)(x + 2)", struct: "un produit", regle: "$(uv)' = u'v + uv'$", d: "(x+2) + (x+1) = 2x + 3" },
      ];
      const c = pickOne(cas);
      return {
        text: `Dérive $${c.f}$, en disant d'abord quelle est la structure de l'expression et donc quelle formule tu appliques.`,
        format: "open",
        expected: [c.struct.split(" ")[1], "formule", "derive", "dérive", c.d.split(" ")[0]],
        comparator: "contains_keyword",
        explanation: exp(
          "On choisit la formule d'après la DERNIÈRE opération de l'expression : somme, produit ou quotient.",
          `Ici $${c.f}$ est ${c.struct} : la règle à appliquer est ${c.regle}.`,
          "On dérive ensuite chaque morceau, puis on remet le tout ensemble avant de simplifier.",
          `On obtient $f'(x) = ${c.d}$.`
        ),
      };
    },
  },
];
