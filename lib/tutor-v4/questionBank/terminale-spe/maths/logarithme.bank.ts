// lib/tutor-v4/questionBank/terminale-spe/maths/logarithme.bank.ts
//
// Notion : Fonction logarithme népérien (fonction_logarithme)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   ln_definition          — Comprendre la fonction logarithme népérien
//   ln_proprietes          — Propriétés algébriques du logarithme
//   ln_deriver             — Dériver une expression contenant un logarithme
//   ln_equation_inequation — Résoudre une équation ou inéquation avec logarithme
//   ln_limite              — Étudier une limite avec logarithme
//   ln_defi                — Exercice type bac avec logarithme
//
// Conventions :
// - Formules en LaTeX ($...$), rendues via KaTeX.
// - Règle QCM : dès qu'une réponse est une EXPRESSION mathématique → "qcm".
//   On ne demande de TAPER ("short" + "number_equal") que des réponses
//   purement numériques.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const logarithmeBank: TutorBankItemV4[] = [
  /* =========================================================
     LN_DEFINITION — Comprendre le logarithme népérien
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_ln_definition_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Que vaut $\\ln(1)$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Le logarithme de $1$ est une valeur de référence.",
    explanation: exp(
      "Le logarithme népérien vérifie $\\ln(1) = 0$.",
      "On utilise la valeur de référence du logarithme en $1$.",
      "$\\ln(1) = 0$.",
      "Donc $\\ln(1) = 0$."
    ),
    tags: ["terminale-spe", "logarithme", "definition", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_definition_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Que vaut $\\ln(e)$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Le logarithme de $e$ est une valeur de référence.",
    explanation: exp(
      "Le logarithme népérien vérifie $\\ln(e) = 1$.",
      "On utilise la valeur de référence du logarithme en $e$.",
      "$\\ln(e) = 1$.",
      "Donc $\\ln(e) = 1$."
    ),
    tags: ["terminale-spe", "logarithme", "definition", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_definition_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l'ensemble de définition de la fonction $x \\mapsto \\ln(x)$ ?",
    format: "qcm",
    choices: ["$]0\\,;+\\infty[$", "$\\mathbb{R}$", "$[0\\,;+\\infty[$", "$\\mathbb{R}^*$"],
    expected: ["$]0\\,;+\\infty[$"],
    comparator: "mcq_exact",
    hint: "Le logarithme n'existe que pour les nombres strictement positifs.",
    explanation: exp(
      "Le logarithme népérien n'est défini que sur les réels strictement positifs.",
      "On se rappelle son domaine de définition.",
      "$\\ln(x)$ existe si et seulement si $x > 0$.",
      "L'ensemble de définition est $]0\\,;+\\infty[$."
    ),
    tags: ["terminale-spe", "logarithme", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_definition_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de la fonction $x \\mapsto \\ln(x)$ sur $]0\\,;+\\infty[$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{x}$", "$\\ln(x)$", "$x$", "$-\\dfrac{1}{x^2}$"],
    expected: ["$\\dfrac{1}{x}$"],
    comparator: "mcq_exact",
    hint: "C'est une dérivée de référence à connaître par cœur.",
    explanation: exp(
      "Le logarithme népérien a une dérivée de référence.",
      "On utilise la formule du cours.",
      "$(\\ln x)' = \\dfrac{1}{x}$.",
      "La dérivée de $x \\mapsto \\ln(x)$ est $\\dfrac{1}{x}$."
    ),
    tags: ["terminale-spe", "logarithme", "definition", "derivee", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_definition_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le sens de variation de la fonction $x \\mapsto \\ln(x)$ sur $]0\\,;+\\infty[$ ?",
    format: "qcm",
    choices: [
      "Strictement croissante",
      "Strictement décroissante",
      "Croissante puis décroissante",
      "Constante",
    ],
    expected: ["Strictement croissante"],
    comparator: "mcq_exact",
    hint: "Étudie le signe de sa dérivée $\\dfrac{1}{x}$ sur $]0\\,;+\\infty[$.",
    explanation: exp(
      "Le sens de variation se lit sur le signe de la dérivée.",
      "La dérivée de $\\ln x$ est $\\dfrac{1}{x}$, strictement positive sur $]0\\,;+\\infty[$.",
      "Comme $\\dfrac{1}{x} > 0$, la fonction est strictement croissante.",
      "La fonction logarithme est strictement croissante sur $]0\\,;+\\infty[$."
    ),
    tags: ["terminale-spe", "logarithme", "definition", "variation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_definition_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Par quel point la courbe de la fonction logarithme passe-t-elle toujours ?",
    format: "qcm",
    choices: ["$(1\\,;0)$", "$(0\\,;1)$", "$(0\\,;0)$", "$(e\\,;e)$"],
    expected: ["$(1\\,;0)$"],
    comparator: "mcq_exact",
    hint: "Calcule $\\ln(1)$.",
    explanation: exp(
      "Un point de la courbe se lit en calculant une image.",
      "On calcule l'image de $1$ : $\\ln(1) = 0$.",
      "La courbe passe donc par le point de coordonnées $(1\\,;0)$.",
      "La courbe passe par $(1\\,;0)$."
    ),
    tags: ["terminale-spe", "logarithme", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_definition_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Comme $x \\mapsto \\ln(x)$ est strictement croissante, comment se comparent $\\ln(2)$ et $\\ln(3)$ ?",
    format: "qcm",
    choices: ["$\\ln(2) < \\ln(3)$", "$\\ln(2) > \\ln(3)$", "$\\ln(2) = \\ln(3)$", "On ne peut pas comparer"],
    expected: ["$\\ln(2) < \\ln(3)$"],
    comparator: "mcq_exact",
    hint: "Une fonction croissante conserve l'ordre.",
    explanation: exp(
      "Une fonction strictement croissante conserve l'ordre des nombres.",
      "On compare les arguments : $2 < 3$.",
      "Comme le logarithme est croissant, $2 < 3$ entraîne $\\ln(2) < \\ln(3)$.",
      "Donc $\\ln(2) < \\ln(3)$."
    ),
    tags: ["terminale-spe", "logarithme", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_definition_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Pour tout réel $x$, à quoi est égal $\\ln(e^x)$ ?",
    format: "qcm",
    choices: ["$x$", "$e^x$", "$1$", "$\\dfrac{1}{x}$"],
    expected: ["$x$"],
    comparator: "mcq_exact",
    hint: "Le logarithme et l'exponentielle sont des fonctions réciproques.",
    explanation: exp(
      "Le logarithme népérien est la fonction réciproque de l'exponentielle.",
      "On utilise $\\ln(e^x) = x$ pour tout réel $x$.",
      "$\\ln(e^x) = x$.",
      "Donc $\\ln(e^x) = x$."
    ),
    tags: ["terminale-spe", "logarithme", "definition", "reciproque", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_definition_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Pour tout réel $x > 0$, à quoi est égal $e^{\\ln(x)}$ ?",
    format: "qcm",
    choices: ["$x$", "$\\ln(x)$", "$1$", "$e^x$"],
    expected: ["$x$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle et le logarithme se « compensent ».",
    explanation: exp(
      "Le logarithme et l'exponentielle sont réciproques l'une de l'autre.",
      "On utilise $e^{\\ln(x)} = x$ pour tout $x > 0$.",
      "$e^{\\ln(x)} = x$.",
      "Donc $e^{\\ln(x)} = x$."
    ),
    tags: ["terminale-spe", "logarithme", "definition", "reciproque", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_definition_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_definition",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l'équation de la tangente à la courbe de $x \\mapsto \\ln(x)$ au point d'abscisse $1$ ?",
    format: "qcm",
    choices: ["$y = x - 1$", "$y = x$", "$y = x + 1$", "$y = \\dfrac{1}{x}$"],
    expected: ["$y = x - 1$"],
    comparator: "mcq_exact",
    hint: "Utilise $y = f'(1)(x - 1) + f(1)$ avec $f(x) = \\ln(x)$.",
    explanation: exp(
      "On applique $y = f'(a)(x-a) + f(a)$ en $a = 1$.",
      "On calcule $f(1) = \\ln(1) = 0$ et $f'(x) = \\dfrac{1}{x}$, donc $f'(1) = 1$.",
      "$y = 1 \\times (x - 1) + 0 = x - 1$.",
      "L'équation de la tangente est $y = x - 1$."
    ),
    tags: ["terminale-spe", "logarithme", "definition", "tangente", "qcm"],
  },

  /* =========================================================
     LN_PROPRIETES — Propriétés algébriques
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_ln_proprietes_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi est égal $\\ln(a \\times b)$ (avec $a, b > 0$) ?",
    format: "qcm",
    choices: [
      "$\\ln(a) + \\ln(b)$",
      "$\\ln(a) \\times \\ln(b)$",
      "$\\ln(a) - \\ln(b)$",
      "$\\ln(a + b)$",
    ],
    expected: ["$\\ln(a) + \\ln(b)$"],
    comparator: "mcq_exact",
    hint: "Le logarithme transforme les produits en sommes.",
    explanation: exp(
      "Le logarithme transforme les produits en sommes.",
      "On applique la propriété $\\ln(ab) = \\ln a + \\ln b$.",
      "$\\ln(a \\times b) = \\ln(a) + \\ln(b)$.",
      "Donc $\\ln(ab) = \\ln(a) + \\ln(b)$."
    ),
    tags: ["terminale-spe", "logarithme", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_proprietes_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi est égal $\\ln\\!\\left(\\dfrac{a}{b}\\right)$ (avec $a, b > 0$) ?",
    format: "qcm",
    choices: [
      "$\\ln(a) - \\ln(b)$",
      "$\\ln(a) + \\ln(b)$",
      "$\\dfrac{\\ln(a)}{\\ln(b)}$",
      "$\\ln(a - b)$",
    ],
    expected: ["$\\ln(a) - \\ln(b)$"],
    comparator: "mcq_exact",
    hint: "Le logarithme transforme les quotients en différences.",
    explanation: exp(
      "Le logarithme transforme les quotients en différences.",
      "On applique la propriété $\\ln\\!\\left(\\dfrac{a}{b}\\right) = \\ln a - \\ln b$.",
      "$\\ln\\!\\left(\\dfrac{a}{b}\\right) = \\ln(a) - \\ln(b)$.",
      "Donc $\\ln\\!\\left(\\dfrac{a}{b}\\right) = \\ln(a) - \\ln(b)$."
    ),
    tags: ["terminale-spe", "logarithme", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_proprietes_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi est égal $\\ln(a^n)$ (avec $a > 0$) ?",
    format: "qcm",
    choices: ["$n\\ln(a)$", "$\\ln(a)^n$", "$a\\ln(n)$", "$n + \\ln(a)$"],
    expected: ["$n\\ln(a)$"],
    comparator: "mcq_exact",
    hint: "L'exposant descend devant le logarithme.",
    explanation: exp(
      "Le logarithme transforme les puissances en produits.",
      "On applique la propriété $\\ln(a^n) = n\\ln a$.",
      "$\\ln(a^n) = n\\ln(a)$.",
      "Donc $\\ln(a^n) = n\\ln(a)$."
    ),
    tags: ["terminale-spe", "logarithme", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_proprietes_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi est égal $\\ln\\!\\left(\\dfrac{1}{a}\\right)$ (avec $a > 0$) ?",
    format: "qcm",
    choices: ["$-\\ln(a)$", "$\\dfrac{1}{\\ln(a)}$", "$\\ln(a)$", "$1 - \\ln(a)$"],
    expected: ["$-\\ln(a)$"],
    comparator: "mcq_exact",
    hint: "C'est un cas particulier de $\\ln\\!\\left(\\dfrac{a}{b}\\right)$ avec $a = 1$.",
    explanation: exp(
      "L'inverse devient un opposé via le logarithme.",
      "On applique $\\ln\\!\\left(\\dfrac{1}{a}\\right) = \\ln(1) - \\ln(a)$ avec $\\ln(1) = 0$.",
      "$\\ln\\!\\left(\\dfrac{1}{a}\\right) = 0 - \\ln(a) = -\\ln(a)$.",
      "Donc $\\ln\\!\\left(\\dfrac{1}{a}\\right) = -\\ln(a)$."
    ),
    tags: ["terminale-spe", "logarithme", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_proprietes_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi est égal $\\ln\\!\\left(\\sqrt{a}\\right)$ (avec $a > 0$) ?",
    format: "qcm",
    choices: [
      "$\\dfrac{1}{2}\\ln(a)$",
      "$2\\ln(a)$",
      "$\\sqrt{\\ln(a)}$",
      "$\\dfrac{1}{\\ln(a)}$",
    ],
    expected: ["$\\dfrac{1}{2}\\ln(a)$"],
    comparator: "mcq_exact",
    hint: "$\\sqrt{a} = a^{1/2}$, puis l'exposant descend.",
    explanation: exp(
      "Une racine carrée est une puissance $\\tfrac{1}{2}$.",
      "On écrit $\\sqrt{a} = a^{1/2}$, puis $\\ln(a^n) = n\\ln a$.",
      "$\\ln(\\sqrt{a}) = \\ln(a^{1/2}) = \\dfrac{1}{2}\\ln(a)$.",
      "Donc $\\ln(\\sqrt{a}) = \\dfrac{1}{2}\\ln(a)$."
    ),
    tags: ["terminale-spe", "logarithme", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_proprietes_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $\\ln(2) + \\ln(3)$.",
    format: "qcm",
    choices: ["$\\ln(6)$", "$\\ln(5)$", "$\\ln(2)\\ln(3)$", "$\\ln(9)$"],
    expected: ["$\\ln(6)$"],
    comparator: "mcq_exact",
    hint: "Une somme de logarithmes devient le logarithme d'un produit.",
    explanation: exp(
      "On utilise $\\ln a + \\ln b = \\ln(ab)$.",
      "On calcule le produit $2 \\times 3$.",
      "$\\ln(2) + \\ln(3) = \\ln(2 \\times 3) = \\ln(6)$.",
      "Donc $\\ln(2) + \\ln(3) = \\ln(6)$."
    ),
    tags: ["terminale-spe", "logarithme", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_proprietes_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "Écris $\\ln(8)$ en fonction de $\\ln(2)$.",
    format: "qcm",
    choices: ["$3\\ln(2)$", "$2\\ln(2)$", "$\\ln(2)^3$", "$4\\ln(2)$"],
    expected: ["$3\\ln(2)$"],
    comparator: "mcq_exact",
    hint: "$8 = 2^3$.",
    explanation: exp(
      "On écrit $8$ comme une puissance de $2$.",
      "$8 = 2^3$, puis on applique $\\ln(a^n) = n\\ln a$.",
      "$\\ln(8) = \\ln(2^3) = 3\\ln(2)$.",
      "Donc $\\ln(8) = 3\\ln(2)$."
    ),
    tags: ["terminale-spe", "logarithme", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_proprietes_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_proprietes",
    difficulty: 4,
    theme: "neutral",
    text: "Simplifie $\\ln(12) - \\ln(4)$.",
    format: "qcm",
    choices: ["$\\ln(3)$", "$\\ln(8)$", "$\\ln(48)$", "$\\ln(16)$"],
    expected: ["$\\ln(3)$"],
    comparator: "mcq_exact",
    hint: "Une différence de logarithmes devient le logarithme d'un quotient.",
    explanation: exp(
      "On utilise $\\ln a - \\ln b = \\ln\\!\\left(\\dfrac{a}{b}\\right)$.",
      "On calcule le quotient $\\dfrac{12}{4}$.",
      "$\\ln(12) - \\ln(4) = \\ln\\!\\left(\\dfrac{12}{4}\\right) = \\ln(3)$.",
      "Donc $\\ln(12) - \\ln(4) = \\ln(3)$."
    ),
    tags: ["terminale-spe", "logarithme", "proprietes", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_ln_proprietes_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\ln a + \\ln b = \\ln(a \\times b)$ : trouve le produit.",
    tags: ["terminale-spe", "logarithme", "proprietes", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(2, 6);
      return {
        text: `On a $\\ln(${a}) + \\ln(${b}) = \\ln(N)$. Quelle est la valeur de $N$ ?`,
        format: "short",
        expected: [String(a * b)],
        comparator: "number_equal",
        explanation: exp(
          "On utilise $\\ln a + \\ln b = \\ln(ab)$.",
          `On calcule le produit $${a} \\times ${b}$.`,
          `$\\ln(${a}) + \\ln(${b}) = \\ln(${a} \\times ${b}) = \\ln(${a * b})$.`,
          `Donc $N = ${a * b}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_ln_proprietes_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\ln a - \\ln b = \\ln\\!\\left(\\dfrac{a}{b}\\right)$ : trouve le quotient.",
    tags: ["terminale-spe", "logarithme", "proprietes", "template"],
    generate: () => {
      const b = randomInt(2, 5);
      const q = randomInt(2, 6);
      const a = b * q;
      return {
        text: `On a $\\ln(${a}) - \\ln(${b}) = \\ln(N)$. Quelle est la valeur de $N$ ?`,
        format: "short",
        expected: [String(q)],
        comparator: "number_equal",
        explanation: exp(
          "On utilise $\\ln a - \\ln b = \\ln\\!\\left(\\dfrac{a}{b}\\right)$.",
          `On calcule le quotient $\\dfrac{${a}}{${b}}$.`,
          `$\\ln(${a}) - \\ln(${b}) = \\ln\\!\\left(\\dfrac{${a}}{${b}}\\right) = \\ln(${q})$.`,
          `Donc $N = ${q}$.`
        ),
      };
    },
  },

  /* =========================================================
     LN_DERIVER — Dériver une expression avec logarithme
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_ln_deriver_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_deriver",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\ln(x)$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{x}$", "$\\ln(x)$", "$-\\dfrac{1}{x^2}$", "$x$"],
    expected: ["$\\dfrac{1}{x}$"],
    comparator: "mcq_exact",
    hint: "C'est une dérivée de référence.",
    explanation: exp(
      "Le logarithme a une dérivée de référence.",
      "On applique $(\\ln x)' = \\dfrac{1}{x}$.",
      "$f'(x) = \\dfrac{1}{x}$.",
      "La dérivée est $f'(x) = \\dfrac{1}{x}$."
    ),
    tags: ["terminale-spe", "logarithme", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_deriver_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_deriver",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la formule de dérivation de $\\ln(u)$ ?",
    format: "qcm",
    choices: [
      "$(\\ln u)' = \\dfrac{u'}{u}$",
      "$(\\ln u)' = \\dfrac{1}{u}$",
      "$(\\ln u)' = u'\\ln u$",
      "$(\\ln u)' = \\dfrac{u}{u'}$",
    ],
    expected: ["$(\\ln u)' = \\dfrac{u'}{u}$"],
    comparator: "mcq_exact",
    hint: "On divise la dérivée de l'intérieur par l'intérieur.",
    explanation: exp(
      "Dériver un logarithme composé utilise la dérivée de l'argument.",
      "On applique la formule $(\\ln u)' = \\dfrac{u'}{u}$.",
      "$(\\ln u)' = \\dfrac{u'}{u}$.",
      "La bonne formule est $(\\ln u)' = \\dfrac{u'}{u}$."
    ),
    tags: ["terminale-spe", "logarithme", "deriver", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_deriver_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_deriver",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\ln(x + 1)$ sur $]-1\\,;+\\infty[$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{x + 1}$", "$\\dfrac{1}{x}$", "$\\ln(x+1)$", "$\\dfrac{x}{x+1}$"],
    expected: ["$\\dfrac{1}{x + 1}$"],
    comparator: "mcq_exact",
    hint: "Avec $u = x+1$, on a $u' = 1$, puis $(\\ln u)' = \\dfrac{u'}{u}$.",
    explanation: exp(
      "On dérive un logarithme composé avec $(\\ln u)' = \\dfrac{u'}{u}$.",
      "On pose $u = x+1$, donc $u' = 1$.",
      "$f'(x) = \\dfrac{1}{x + 1}$.",
      "La dérivée est $f'(x) = \\dfrac{1}{x + 1}$."
    ),
    tags: ["terminale-spe", "logarithme", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_deriver_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_deriver",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\ln(2x)$ sur $]0\\,;+\\infty[$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{x}$", "$\\dfrac{2}{x}$", "$\\dfrac{1}{2x}$", "$2\\ln(x)$"],
    expected: ["$\\dfrac{1}{x}$"],
    comparator: "mcq_exact",
    hint: "Avec $u = 2x$, on a $u' = 2$, puis simplifie $\\dfrac{2}{2x}$.",
    explanation: exp(
      "On dérive un logarithme composé avec $(\\ln u)' = \\dfrac{u'}{u}$.",
      "On pose $u = 2x$, donc $u' = 2$.",
      "$f'(x) = \\dfrac{2}{2x} = \\dfrac{1}{x}$.",
      "La dérivée est $f'(x) = \\dfrac{1}{x}$."
    ),
    tags: ["terminale-spe", "logarithme", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_deriver_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_deriver",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\ln(3x + 1)$ sur $]-\\tfrac{1}{3}\\,;+\\infty[$ ?",
    format: "qcm",
    choices: ["$\\dfrac{3}{3x + 1}$", "$\\dfrac{1}{3x + 1}$", "$\\dfrac{3}{x}$", "$\\dfrac{1}{3x}$"],
    expected: ["$\\dfrac{3}{3x + 1}$"],
    comparator: "mcq_exact",
    hint: "Avec $u = 3x+1$, on a $u' = 3$.",
    explanation: exp(
      "On dérive un logarithme composé avec $(\\ln u)' = \\dfrac{u'}{u}$.",
      "On pose $u = 3x+1$, donc $u' = 3$.",
      "$f'(x) = \\dfrac{3}{3x + 1}$.",
      "La dérivée est $f'(x) = \\dfrac{3}{3x + 1}$."
    ),
    tags: ["terminale-spe", "logarithme", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_deriver_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_deriver",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\ln(x^2 + 1)$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{2x}{x^2 + 1}$",
      "$\\dfrac{1}{x^2 + 1}$",
      "$\\dfrac{2x}{x^2}$",
      "$\\dfrac{1}{2x}$",
    ],
    expected: ["$\\dfrac{2x}{x^2 + 1}$"],
    comparator: "mcq_exact",
    hint: "Avec $u = x^2+1$, on a $u' = 2x$.",
    explanation: exp(
      "On dérive un logarithme composé avec $(\\ln u)' = \\dfrac{u'}{u}$.",
      "On pose $u = x^2+1$, donc $u' = 2x$.",
      "$f'(x) = \\dfrac{2x}{x^2 + 1}$.",
      "La dérivée est $f'(x) = \\dfrac{2x}{x^2 + 1}$."
    ),
    tags: ["terminale-spe", "logarithme", "deriver", "composee", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_deriver_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_deriver",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x\\ln(x)$ sur $]0\\,;+\\infty[$ ?",
    format: "qcm",
    choices: ["$\\ln(x) + 1$", "$\\ln(x)$", "$1$", "$\\dfrac{1}{x}$"],
    expected: ["$\\ln(x) + 1$"],
    comparator: "mcq_exact",
    hint: "Produit $uv$ avec $u = x$ et $v = \\ln x$.",
    explanation: exp(
      "On dérive un produit avec $(uv)' = u'v + uv'$.",
      "On pose $u = x$ ($u' = 1$) et $v = \\ln x$ ($v' = \\dfrac{1}{x}$).",
      "$f'(x) = 1 \\times \\ln x + x \\times \\dfrac{1}{x} = \\ln x + 1$.",
      "La dérivée est $f'(x) = \\ln(x) + 1$."
    ),
    tags: ["terminale-spe", "logarithme", "deriver", "produit", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_deriver_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_deriver",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\ln(x^2)$ sur $]0\\,;+\\infty[$ ?",
    format: "qcm",
    choices: ["$\\dfrac{2}{x}$", "$\\dfrac{2x}{x^2}$", "$\\dfrac{1}{x^2}$", "$\\dfrac{1}{2x}$"],
    expected: ["$\\dfrac{2}{x}$"],
    comparator: "mcq_exact",
    hint: "Avec $u = x^2$, $u' = 2x$, puis simplifie ; ou utilise $\\ln(x^2) = 2\\ln x$.",
    explanation: exp(
      "On dérive un logarithme composé, puis on simplifie.",
      "On pose $u = x^2$, $u' = 2x$, donc $f'(x) = \\dfrac{2x}{x^2}$.",
      "$\\dfrac{2x}{x^2} = \\dfrac{2}{x}$.",
      "La dérivée est $f'(x) = \\dfrac{2}{x}$."
    ),
    tags: ["terminale-spe", "logarithme", "deriver", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_ln_deriver_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_deriver",
    difficulty: 3,
    theme: "neutral",
    hint: "Avec $u = ax+b$, $(\\ln u)' = \\dfrac{u'}{u} = \\dfrac{a}{ax+b}$.",
    tags: ["terminale-spe", "logarithme", "deriver", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 5);
      const correct = `$\\dfrac{${a}}{${a}x + ${b}}$`;
      const distracteurs = [
        `$\\dfrac{1}{${a}x + ${b}}$`,
        `$\\dfrac{${a}}{x}$`,
        `$\\dfrac{1}{${a}x}$`,
      ];
      return {
        text: `Quelle est la dérivée de $f(x) = \\ln(${a}x + ${b})$ ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On dérive un logarithme composé avec $(\\ln u)' = \\dfrac{u'}{u}$.",
          `On pose $u = ${a}x + ${b}$, donc $u' = ${a}$.`,
          `$f'(x) = \\dfrac{${a}}{${a}x + ${b}}$.`,
          `La dérivée est $f'(x) = \\dfrac{${a}}{${a}x + ${b}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_ln_deriver_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_deriver",
    difficulty: 4,
    theme: "neutral",
    hint: "La constante reste en facteur : $(k\\ln x)' = \\dfrac{k}{x}$.",
    tags: ["terminale-spe", "logarithme", "deriver", "template"],
    generate: () => {
      const k = randomInt(2, 7);
      const correct = `$\\dfrac{${k}}{x}$`;
      const distracteurs = [
        `$\\dfrac{1}{x}$`,
        `$\\dfrac{${k}}{x^2}$`,
        `$${k}\\ln(x)$`,
      ];
      return {
        text: `Quelle est la dérivée de $f(x) = ${k}\\ln(x)$ sur $]0\\,;+\\infty[$ ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On dérive un produit par une constante : la constante reste en facteur.",
          `On dérive $\\ln x$ en $\\dfrac{1}{x}$, puis on multiplie par $${k}$.`,
          `$f'(x) = ${k} \\times \\dfrac{1}{x} = \\dfrac{${k}}{x}$.`,
          `La dérivée est $f'(x) = \\dfrac{${k}}{x}$.`
        ),
      };
    },
  },

  /* =========================================================
     LN_EQUATION_INEQUATION — Équations et inéquations
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_ln_equation_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_equation_inequation",
    difficulty: 2,
    theme: "neutral",
    text: "Résous $\\ln(x) = 0$. Quelle est la valeur de $x$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Pour quelle valeur le logarithme vaut-il $0$ ?",
    explanation: exp(
      "On résout une équation à l'aide d'une valeur de référence.",
      "On sait que $\\ln(1) = 0$.",
      "$\\ln(x) = 0 = \\ln(1)$, donc $x = 1$.",
      "La solution est $x = 1$."
    ),
    tags: ["terminale-spe", "logarithme", "equation", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_equation_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_equation_inequation",
    difficulty: 2,
    theme: "neutral",
    text: "Résous $\\ln(x) = 1$. Quelle est la valeur de $x$ ?",
    format: "qcm",
    choices: ["$e$", "$1$", "$0$", "$e^2$"],
    expected: ["$e$"],
    comparator: "mcq_exact",
    hint: "$\\ln(x) = 1 \\iff x = e^1$.",
    explanation: exp(
      "On résout $\\ln(x) = a$ en appliquant l'exponentielle : $x = e^a$.",
      "Ici $a = 1$, donc $x = e^1$.",
      "$\\ln(x) = 1 \\iff x = e$.",
      "La solution est $x = e$."
    ),
    tags: ["terminale-spe", "logarithme", "equation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_equation_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_equation_inequation",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle propriété permet de résoudre $\\ln(A) = \\ln(B)$ (avec $A, B > 0$) ?",
    format: "qcm",
    choices: [
      "$\\ln(A) = \\ln(B) \\iff A = B$",
      "$\\ln(A) = \\ln(B) \\iff A = -B$",
      "$\\ln(A) = \\ln(B) \\iff A + B = 1$",
      "$\\ln(A) = \\ln(B) \\iff A \\times B = 1$",
    ],
    expected: ["$\\ln(A) = \\ln(B) \\iff A = B$"],
    comparator: "mcq_exact",
    hint: "Le logarithme est strictement croissant, donc injectif.",
    explanation: exp(
      "Comme le logarithme est strictement croissant, il est injectif.",
      "Deux logarithmes sont égaux si et seulement si leurs arguments le sont.",
      "$\\ln(A) = \\ln(B) \\iff A = B$ (pour $A, B > 0$).",
      "La bonne propriété est $\\ln(A) = \\ln(B) \\iff A = B$."
    ),
    tags: ["terminale-spe", "logarithme", "equation", "propriete", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_equation_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_equation_inequation",
    difficulty: 3,
    theme: "neutral",
    text: "Résous $\\ln(x) = 2$. Quelle est la valeur de $x$ ?",
    format: "qcm",
    choices: ["$e^2$", "$2$", "$e$", "$2e$"],
    expected: ["$e^2$"],
    comparator: "mcq_exact",
    hint: "$\\ln(x) = a \\iff x = e^a$.",
    explanation: exp(
      "On résout $\\ln(x) = a$ en appliquant l'exponentielle.",
      "Ici $a = 2$, donc $x = e^2$.",
      "$\\ln(x) = 2 \\iff x = e^2$.",
      "La solution est $x = e^2$."
    ),
    tags: ["terminale-spe", "logarithme", "equation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_equation_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_equation_inequation",
    difficulty: 3,
    theme: "neutral",
    text: "Résous $e^{x} = 5$. Quelle est la valeur de $x$ ?",
    format: "qcm",
    choices: ["$\\ln(5)$", "$5$", "$e^5$", "$\\dfrac{1}{5}$"],
    expected: ["$\\ln(5)$"],
    comparator: "mcq_exact",
    hint: "On applique le logarithme des deux côtés.",
    explanation: exp(
      "On résout $e^x = k$ en appliquant le logarithme : $x = \\ln k$.",
      "On applique $\\ln$ aux deux membres.",
      "$e^x = 5 \\iff x = \\ln(5)$.",
      "La solution est $x = \\ln(5)$."
    ),
    tags: ["terminale-spe", "logarithme", "equation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_equation_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_equation_inequation",
    difficulty: 3,
    theme: "neutral",
    text: "Résous $\\ln(2x) = \\ln(6)$. Quelle est la valeur de $x$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$\\ln(A) = \\ln(B) \\iff A = B$, donc résous $2x = 6$.",
    explanation: exp(
      "On utilise $\\ln(A) = \\ln(B) \\iff A = B$.",
      "On identifie les arguments : $2x = 6$.",
      "$2x = 6 \\iff x = 3$.",
      "La solution est $x = 3$."
    ),
    tags: ["terminale-spe", "logarithme", "equation", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_equation_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_equation_inequation",
    difficulty: 4,
    theme: "neutral",
    text: "Résous l'inéquation $\\ln(x) > 0$. Quel est l'ensemble des solutions ?",
    format: "qcm",
    choices: ["$]1\\,;+\\infty[$", "$]0\\,;1[$", "$]0\\,;+\\infty[$", "$]-\\infty\\,;1[$"],
    expected: ["$]1\\,;+\\infty[$"],
    comparator: "mcq_exact",
    hint: "$0 = \\ln(1)$, et le logarithme est strictement croissant (avec $x > 0$).",
    explanation: exp(
      "On compare à une valeur de référence en gardant le sens de variation.",
      "On écrit $0 = \\ln(1)$, puis on utilise la stricte croissance (sur $]0\\,;+\\infty[$).",
      "$\\ln(x) > \\ln(1) \\iff x > 1$.",
      "L'ensemble des solutions est $]1\\,;+\\infty[$."
    ),
    tags: ["terminale-spe", "logarithme", "inequation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_equation_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_equation_inequation",
    difficulty: 4,
    theme: "neutral",
    text: "Résous l'inéquation $\\ln(x) < 0$. Quel est l'ensemble des solutions ?",
    format: "qcm",
    choices: ["$]0\\,;1[$", "$]1\\,;+\\infty[$", "$]-\\infty\\,;0[$", "$]0\\,;+\\infty[$"],
    expected: ["$]0\\,;1[$"],
    comparator: "mcq_exact",
    hint: "Attention : il faut aussi $x > 0$ (domaine du logarithme).",
    explanation: exp(
      "On résout en tenant compte du domaine $]0\\,;+\\infty[$.",
      "$\\ln(x) < 0 = \\ln(1)$ donne $x < 1$, combiné avec $x > 0$.",
      "On obtient $0 < x < 1$.",
      "L'ensemble des solutions est $]0\\,;1[$."
    ),
    tags: ["terminale-spe", "logarithme", "inequation", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_ln_equation_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_equation_inequation",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\ln(A) = \\ln(B) \\iff A = B$.",
    tags: ["terminale-spe", "logarithme", "equation", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const x = randomInt(2, 6);
      const b = a * x;
      return {
        text: `Résous $\\ln(${a}x) = \\ln(${b})$. Quelle est la valeur de $x$ ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On utilise $\\ln(A) = \\ln(B) \\iff A = B$.",
          `On identifie les arguments : $${a}x = ${b}$.`,
          `$${a}x = ${b} \\iff x = ${x}$.`,
          `La solution est $x = ${x}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_ln_equation_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_equation_inequation",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\ln(x - c) = 0 \\iff x - c = 1$.",
    tags: ["terminale-spe", "logarithme", "equation", "template"],
    generate: () => {
      const c = randomInt(1, 6);
      return {
        text: `Résous $\\ln(x - ${c}) = 0$. Quelle est la valeur de $x$ ?`,
        format: "short",
        expected: [String(c + 1)],
        comparator: "number_equal",
        explanation: exp(
          "On utilise $\\ln(A) = 0 \\iff A = 1$.",
          `On résout $x - ${c} = 1$.`,
          `$x - ${c} = 1 \\iff x = ${c + 1}$.`,
          `La solution est $x = ${c + 1}$.`
        ),
      };
    },
  },

  /* =========================================================
     LN_LIMITE — Limites avec logarithme
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_ln_limite_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_limite",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\ln(x)$ ?",
    format: "qcm",
    choices: ["$+\\infty$", "$0$", "$1$", "$-\\infty$"],
    expected: ["$+\\infty$"],
    comparator: "mcq_exact",
    hint: "Le logarithme croît sans limite, mais lentement.",
    explanation: exp(
      "Les limites du logarithme aux bornes sont des résultats de référence.",
      "On utilise la limite du cours en $+\\infty$.",
      "$\\lim_{x \\to +\\infty} \\ln(x) = +\\infty$.",
      "La limite est $+\\infty$."
    ),
    tags: ["terminale-spe", "logarithme", "limite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_limite_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_limite",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $\\displaystyle\\lim_{x \\to 0^+} \\ln(x)$ ?",
    format: "qcm",
    choices: ["$-\\infty$", "$0$", "$+\\infty$", "$1$"],
    expected: ["$-\\infty$"],
    comparator: "mcq_exact",
    hint: "Près de $0$, la courbe du logarithme plonge vers le bas.",
    explanation: exp(
      "Les limites du logarithme aux bornes sont des résultats de référence.",
      "On utilise la limite du cours en $0^+$.",
      "$\\lim_{x \\to 0^+} \\ln(x) = -\\infty$.",
      "La limite est $-\\infty$ : la droite $x = 0$ est asymptote verticale."
    ),
    tags: ["terminale-spe", "logarithme", "limite", "asymptote", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_limite_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_limite",
    difficulty: 3,
    theme: "neutral",
    text: "En $0^+$, la courbe de $x \\mapsto \\ln(x)$ admet une asymptote. Laquelle ?",
    format: "qcm",
    choices: [
      "La droite $x = 0$",
      "La droite $y = 0$",
      "La droite $y = x$",
      "Aucune asymptote",
    ],
    expected: ["La droite $x = 0$"],
    comparator: "mcq_exact",
    hint: "Une limite infinie en une valeur finie donne une asymptote verticale.",
    explanation: exp(
      "Une limite infinie en une valeur finie correspond à une asymptote verticale.",
      "On utilise $\\lim_{x \\to 0^+} \\ln(x) = -\\infty$.",
      "La courbe se rapproche de la droite verticale d'équation $x = 0$.",
      "L'asymptote est la droite $x = 0$ (l'axe des ordonnées)."
    ),
    tags: ["terminale-spe", "logarithme", "limite", "asymptote", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_limite_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_limite",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $\\displaystyle\\lim_{x \\to 1} \\ln(x)$ ?",
    format: "qcm",
    choices: ["$0$", "$1$", "$+\\infty$", "$e$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Le logarithme est continu ; calcule $\\ln(1)$.",
    explanation: exp(
      "Le logarithme est continu sur son domaine.",
      "La limite en $1$ est la valeur $\\ln(1)$.",
      "$\\lim_{x \\to 1} \\ln(x) = \\ln(1) = 0$.",
      "La limite est $0$."
    ),
    tags: ["terminale-spe", "logarithme", "limite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_limite_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_limite",
    difficulty: 4,
    theme: "neutral",
    text: "Par croissances comparées, que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\ln(x)}{x}$ ?",
    format: "qcm",
    choices: ["$0$", "$+\\infty$", "$1$", "$-\\infty$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "$x$ l'emporte sur $\\ln(x)$.",
    explanation: exp(
      "Le théorème des croissances comparées compare $\\ln(x)$ et les puissances de $x$.",
      "$x$ croît bien plus vite que $\\ln(x)$.",
      "$\\lim_{x \\to +\\infty} \\dfrac{\\ln(x)}{x} = 0$.",
      "La limite est $0$."
    ),
    tags: ["terminale-spe", "logarithme", "limite", "croissances_comparees", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_limite_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_limite",
    difficulty: 4,
    theme: "neutral",
    text: "Par croissances comparées, que vaut $\\displaystyle\\lim_{x \\to 0^+} x\\ln(x)$ ?",
    format: "qcm",
    choices: ["$0$", "$-\\infty$", "$+\\infty$", "$1$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "C'est une croissance comparée de référence en $0^+$.",
    explanation: exp(
      "Il s'agit d'une limite de référence par croissances comparées.",
      "Bien que $\\ln(x) \\to -\\infty$, le facteur $x \\to 0$ l'emporte.",
      "$\\lim_{x \\to 0^+} x\\ln(x) = 0$.",
      "La limite est $0$."
    ),
    tags: ["terminale-spe", "logarithme", "limite", "croissances_comparees", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_limite_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_limite",
    difficulty: 4,
    theme: "neutral",
    text: "Par croissances comparées, que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\ln(x)}{x^2}$ ?",
    format: "qcm",
    choices: ["$0$", "$+\\infty$", "$1$", "$2$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "$x^2$ l'emporte largement sur $\\ln(x)$.",
    explanation: exp(
      "Le théorème des croissances comparées s'applique à toute puissance de $x$.",
      "$x^2$ croît bien plus vite que $\\ln(x)$.",
      "$\\lim_{x \\to +\\infty} \\dfrac{\\ln(x)}{x^2} = 0$.",
      "La limite est $0$."
    ),
    tags: ["terminale-spe", "logarithme", "limite", "croissances_comparees", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_limite_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_limite",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\left(x - \\ln(x)\\right)$ ?",
    format: "qcm",
    choices: ["$+\\infty$", "$0$", "$1$", "$-\\infty$"],
    expected: ["$+\\infty$"],
    comparator: "mcq_exact",
    hint: "Factorise par $x$ : $x\\left(1 - \\dfrac{\\ln x}{x}\\right)$.",
    explanation: exp(
      "On lève une forme indéterminée $+\\infty - \\infty$ par les croissances comparées.",
      "On factorise : $x - \\ln x = x\\left(1 - \\dfrac{\\ln x}{x}\\right)$, et $\\dfrac{\\ln x}{x} \\to 0$.",
      "Le facteur entre parenthèses tend vers $1$ et $x \\to +\\infty$.",
      "La limite est $+\\infty$."
    ),
    tags: ["terminale-spe", "logarithme", "limite", "croissances_comparees", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_limite_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_limite",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\ln(2x)$ ?",
    format: "qcm",
    choices: ["$+\\infty$", "$\\ln(2)$", "$0$", "$2$"],
    expected: ["$+\\infty$"],
    comparator: "mcq_exact",
    hint: "Quand $x \\to +\\infty$, $2x \\to +\\infty$.",
    explanation: exp(
      "On compose avec la limite du logarithme en $+\\infty$.",
      "Quand $x \\to +\\infty$, $2x \\to +\\infty$, donc $\\ln(2x) \\to \\ln(+\\infty)$.",
      "$\\lim_{x \\to +\\infty} \\ln(2x) = +\\infty$.",
      "La limite est $+\\infty$."
    ),
    tags: ["terminale-spe", "logarithme", "limite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_limite_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_limite",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut la limite de référence $\\displaystyle\\lim_{x \\to 0} \\dfrac{\\ln(1 + x)}{x}$ ?",
    format: "qcm",
    choices: ["$1$", "$0$", "$+\\infty$", "$e$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "C'est le nombre dérivé de $\\ln(1+x)$ en $0$.",
    explanation: exp(
      "Cette limite est une limite de référence liée au nombre dérivé.",
      "Elle correspond au nombre dérivé de $x \\mapsto \\ln(1+x)$ en $0$.",
      "$\\lim_{x \\to 0} \\dfrac{\\ln(1 + x)}{x} = 1$.",
      "La limite est $1$."
    ),
    tags: ["terminale-spe", "logarithme", "limite", "reference", "qcm"],
  },

  /* =========================================================
     LN_DEFI — Exercices type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_ln_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x - \\ln(x)$ sur $]0\\,;+\\infty[$. Quelle est sa dérivée $f'(x)$ ?",
    format: "qcm",
    choices: [
      "$1 - \\dfrac{1}{x}$",
      "$1 - \\ln(x)$",
      "$\\dfrac{1}{x}$",
      "$1 + \\dfrac{1}{x}$",
    ],
    expected: ["$1 - \\dfrac{1}{x}$"],
    comparator: "mcq_exact",
    hint: "On dérive $x$ puis $-\\ln(x)$.",
    explanation: exp(
      "On dérive terme par terme.",
      "On dérive $x$ et $-\\ln(x)$.",
      "$(x)' = 1$ et $(-\\ln x)' = -\\dfrac{1}{x}$, donc $f'(x) = 1 - \\dfrac{1}{x}$.",
      "La dérivée est $f'(x) = 1 - \\dfrac{1}{x}$."
    ),
    tags: ["terminale-spe", "logarithme", "type_bac", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x - \\ln(x)$, de dérivée $f'(x) = 1 - \\dfrac{1}{x} = \\dfrac{x - 1}{x}$. Sur quel intervalle $f$ est-elle décroissante ?",
    format: "qcm",
    choices: ["$]0\\,;1]$", "$[1\\,;+\\infty[$", "$]0\\,;+\\infty[$", "$[e\\,;+\\infty[$"],
    expected: ["$]0\\,;1]$"],
    comparator: "mcq_exact",
    hint: "Sur $]0\\,;+\\infty[$, $x > 0$ : le signe de $f'$ est celui de $x - 1$.",
    explanation: exp(
      "On étudie le signe de $f'(x) = \\dfrac{x-1}{x}$ avec $x > 0$.",
      "Comme $x > 0$, le signe de $f'$ est celui de $x - 1$.",
      "$f'(x) \\le 0$ quand $x \\le 1$.",
      "La fonction $f$ est décroissante sur $]0\\,;1]$."
    ),
    tags: ["terminale-spe", "logarithme", "type_bac", "variation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x - \\ln(x)$. Son minimum est atteint en $x = 1$. Quelle est la valeur de ce minimum ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Calcule $f(1) = 1 - \\ln(1)$.",
    explanation: exp(
      "La valeur d'un extremum s'obtient en calculant $f$ à l'abscisse trouvée.",
      "On calcule $f(1)$ avec $\\ln(1) = 0$.",
      "$f(1) = 1 - \\ln(1) = 1 - 0 = 1$.",
      "Le minimum de $f$ vaut $1$."
    ),
    tags: ["terminale-spe", "logarithme", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = \\ln(x) - x$ sur $]0\\,;+\\infty[$. Quelle est sa dérivée $f'(x)$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{1}{x} - 1$",
      "$\\dfrac{1}{x}$",
      "$1 - \\dfrac{1}{x}$",
      "$\\ln(x) - 1$",
    ],
    expected: ["$\\dfrac{1}{x} - 1$"],
    comparator: "mcq_exact",
    hint: "On dérive $\\ln(x)$ puis $-x$.",
    explanation: exp(
      "On dérive terme par terme.",
      "On dérive $\\ln(x)$ et $-x$.",
      "$(\\ln x)' = \\dfrac{1}{x}$ et $(-x)' = -1$, donc $f'(x) = \\dfrac{1}{x} - 1$.",
      "La dérivée est $f'(x) = \\dfrac{1}{x} - 1$."
    ),
    tags: ["terminale-spe", "logarithme", "type_bac", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Résous $\\ln(x) = -1$. Quelle est la valeur de $x$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{e}$", "$-e$", "$e$", "$-1$"],
    expected: ["$\\dfrac{1}{e}$"],
    comparator: "mcq_exact",
    hint: "$\\ln(x) = -1 \\iff x = e^{-1}$.",
    explanation: exp(
      "On résout $\\ln(x) = a$ en appliquant l'exponentielle : $x = e^a$.",
      "Ici $a = -1$, donc $x = e^{-1}$.",
      "$\\ln(x) = -1 \\iff x = e^{-1} = \\dfrac{1}{e}$.",
      "La solution est $x = \\dfrac{1}{e}$."
    ),
    tags: ["terminale-spe", "logarithme", "type_bac", "equation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x\\ln(x)$ sur $]0\\,;+\\infty[$. Quelle est sa dérivée $f'(x)$ ?",
    format: "qcm",
    choices: ["$\\ln(x) + 1$", "$\\ln(x)$", "$1$", "$\\dfrac{1}{x}$"],
    expected: ["$\\ln(x) + 1$"],
    comparator: "mcq_exact",
    hint: "Produit $uv$ avec $u = x$ et $v = \\ln x$.",
    explanation: exp(
      "On dérive un produit avec $(uv)' = u'v + uv'$.",
      "On pose $u = x$ ($u' = 1$) et $v = \\ln x$ ($v' = \\dfrac{1}{x}$).",
      "$f'(x) = \\ln x + x \\times \\dfrac{1}{x} = \\ln x + 1$.",
      "La dérivée est $f'(x) = \\ln(x) + 1$."
    ),
    tags: ["terminale-spe", "logarithme", "type_bac", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x\\ln(x)$, de dérivée $f'(x) = \\ln(x) + 1$. En quelle valeur $f'$ s'annule-t-elle ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{e}$", "$e$", "$1$", "$0$"],
    expected: ["$\\dfrac{1}{e}$"],
    comparator: "mcq_exact",
    hint: "Résous $\\ln(x) + 1 = 0$, soit $\\ln(x) = -1$.",
    explanation: exp(
      "On cherche où la dérivée s'annule.",
      "On résout $\\ln(x) + 1 = 0$, soit $\\ln(x) = -1$.",
      "$\\ln(x) = -1 \\iff x = e^{-1} = \\dfrac{1}{e}$.",
      "La dérivée s'annule en $x = \\dfrac{1}{e}$."
    ),
    tags: ["terminale-spe", "logarithme", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l'équation de la tangente à la courbe de $f(x) = \\ln(x)$ au point d'abscisse $1$ ?",
    format: "qcm",
    choices: ["$y = x - 1$", "$y = x$", "$y = x + 1$", "$y = \\dfrac{1}{x}$"],
    expected: ["$y = x - 1$"],
    comparator: "mcq_exact",
    hint: "$f(1) = 0$ et $f'(1) = 1$.",
    explanation: exp(
      "On applique $y = f'(a)(x - a) + f(a)$ en $a = 1$.",
      "On calcule $f(1) = 0$ et $f'(1) = 1$.",
      "$y = 1 \\times (x - 1) + 0 = x - 1$.",
      "L'équation de la tangente est $y = x - 1$."
    ),
    tags: ["terminale-spe", "logarithme", "type_bac", "tangente", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = \\ln(x)$. Quel est le coefficient directeur de la tangente au point d'abscisse $e$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{e}$", "$e$", "$1$", "$0$"],
    expected: ["$\\dfrac{1}{e}$"],
    comparator: "mcq_exact",
    hint: "Le coefficient directeur est $f'(e)$ avec $f'(x) = \\dfrac{1}{x}$.",
    explanation: exp(
      "Le coefficient directeur de la tangente en $a$ est $f'(a)$.",
      "On a $f'(x) = \\dfrac{1}{x}$, donc on calcule $f'(e)$.",
      "$f'(e) = \\dfrac{1}{e}$.",
      "Le coefficient directeur est $\\dfrac{1}{e}$."
    ),
    tags: ["terminale-spe", "logarithme", "type_bac", "tangente", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ln_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_logarithme",
    microId: "ln_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\ln(x)}{x + 1}$ ?",
    format: "qcm",
    choices: ["$0$", "$+\\infty$", "$1$", "$-\\infty$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Compare avec $\\dfrac{\\ln(x)}{x}$, qui tend vers $0$.",
    explanation: exp(
      "On se ramène à une croissance comparée connue.",
      "On écrit $\\dfrac{\\ln x}{x + 1} = \\dfrac{\\ln x}{x} \\times \\dfrac{x}{x+1}$ ; le premier facteur tend vers $0$, le second vers $1$.",
      "$\\dfrac{\\ln x}{x} \\to 0$ et $\\dfrac{x}{x+1} \\to 1$.",
      "La limite est $0$."
    ),
    tags: ["terminale-spe", "logarithme", "type_bac", "limite", "qcm"],
  },
];
