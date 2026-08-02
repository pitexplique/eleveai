// lib/tutor-v4/questionBank/terminale-spe/maths/derivation.bank.ts
//
// Notion : Dérivation et variations (derivation_fonction)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   derivation_formules                — Connaître les formules de dérivation
//   derivation_somme_produit_quotient  — Dériver somme, produit, quotient
//   derivation_composee                — Dériver une fonction composée
//   derivation_variation               — Étudier les variations via le signe de f'
//   derivation_tangente                — Déterminer l'équation d'une tangente
//   derivation_optimisation            — Résoudre un problème d'optimisation
//   derivation_defi                    — Exercice type bac
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

// Terme "c x^n" en LaTeX, avec simplifications usuelles (coeff 1, exposant 0/1).
function monome(coeff: number, exposant: number): string {
  if (coeff === 0) return "0";
  if (exposant === 0) return `${coeff}`;
  const c = coeff === 1 ? "" : coeff === -1 ? "-" : `${coeff}`;
  const x = exposant === 1 ? "x" : `x^{${exposant}}`;
  return `${c}${x}`;
}

export const derivationBank: TutorBankItemV4[] = [
  /* =========================================================
     DERIVATION_FORMULES — Formules de dérivation
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_derivation_formules_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_formules",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x^2$ ?",
    format: "qcm",
    choices: ["$2x$", "$x$", "$2$", "$x^2$"],
    expected: ["$2x$"],
    comparator: "mcq_exact",
    hint: "La dérivée de $x^n$ est $n\\,x^{n-1}$.",
    explanation: exp(
      "La dérivée d'une puissance suit la règle $(x^n)' = n\\,x^{n-1}$.",
      "On applique la formule avec $n = 2$.",
      "$(x^2)' = 2\\,x^{2-1} = 2x$.",
      "La dérivée est $f'(x) = 2x$."
    ),
    tags: ["terminale-spe", "derivation", "formules", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_formules_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_formules",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x^3$ ?",
    format: "qcm",
    choices: ["$3x^2$", "$2x^3$", "$3x$", "$x^2$"],
    expected: ["$3x^2$"],
    comparator: "mcq_exact",
    hint: "On abaisse l'exposant d'un cran et il devient coefficient.",
    explanation: exp(
      "La dérivée d'une puissance suit la règle $(x^n)' = n\\,x^{n-1}$.",
      "On applique la formule avec $n = 3$.",
      "$(x^3)' = 3\\,x^{3-1} = 3x^2$.",
      "La dérivée est $f'(x) = 3x^2$."
    ),
    tags: ["terminale-spe", "derivation", "formules", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_formules_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_formules",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x$ ?",
    format: "qcm",
    choices: ["$1$", "$0$", "$x$", "$2x$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "La dérivée de $x$ vaut toujours $1$.",
    explanation: exp(
      "La fonction identité $x \\mapsto x$ a une dérivée constante.",
      "On applique $(x)' = 1$.",
      "$(x)' = 1$.",
      "La dérivée est $f'(x) = 1$."
    ),
    tags: ["terminale-spe", "derivation", "formules", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_formules_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_formules",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la dérivée de la fonction constante $f(x) = 7$ ?",
    format: "qcm",
    choices: ["$0$", "$7$", "$7x$", "$1$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Une fonction constante ne varie pas.",
    explanation: exp(
      "La dérivée mesure la variation instantanée d'une fonction.",
      "Une fonction constante a toujours la même valeur, elle ne varie pas.",
      "$(7)' = 0$.",
      "La dérivée d'une constante est nulle : $f'(x) = 0$."
    ),
    tags: ["terminale-spe", "derivation", "formules", "constante", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_formules_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_formules",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x^5$ ?",
    format: "qcm",
    choices: ["$5x^4$", "$5x^5$", "$4x^5$", "$x^4$"],
    expected: ["$5x^4$"],
    comparator: "mcq_exact",
    hint: "$(x^n)' = n\\,x^{n-1}$ avec $n = 5$.",
    explanation: exp(
      "La dérivée d'une puissance suit la règle $(x^n)' = n\\,x^{n-1}$.",
      "On applique la formule avec $n = 5$.",
      "$(x^5)' = 5\\,x^{4}$.",
      "La dérivée est $f'(x) = 5x^4$."
    ),
    tags: ["terminale-spe", "derivation", "formules", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_formules_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_formules",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x^4$ ?",
    format: "qcm",
    choices: ["$4x^3$", "$4x^4$", "$3x^4$", "$x^3$"],
    expected: ["$4x^3$"],
    comparator: "mcq_exact",
    hint: "$(x^n)' = n\\,x^{n-1}$ avec $n = 4$.",
    explanation: exp(
      "La dérivée d'une puissance suit la règle $(x^n)' = n\\,x^{n-1}$.",
      "On applique la formule avec $n = 4$.",
      "$(x^4)' = 4\\,x^{3}$.",
      "La dérivée est $f'(x) = 4x^3$."
    ),
    tags: ["terminale-spe", "derivation", "formules", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_formules_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_formules",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\dfrac{1}{x}$ sur $]0\\,;+\\infty[$ ?",
    format: "qcm",
    choices: ["$-\\dfrac{1}{x^2}$", "$\\dfrac{1}{x^2}$", "$-\\dfrac{1}{x}$", "$\\ln(x)$"],
    expected: ["$-\\dfrac{1}{x^2}$"],
    comparator: "mcq_exact",
    hint: "C'est une dérivée de référence à connaître par cœur.",
    explanation: exp(
      "La fonction inverse $x \\mapsto \\dfrac{1}{x}$ a une dérivée de référence.",
      "On utilise directement la formule du cours.",
      "$\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$.",
      "La dérivée est $f'(x) = -\\dfrac{1}{x^2}$."
    ),
    tags: ["terminale-spe", "derivation", "formules", "inverse", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_formules_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_formules",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\sqrt{x}$ sur $]0\\,;+\\infty[$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{1}{2\\sqrt{x}}$",
      "$\\dfrac{1}{\\sqrt{x}}$",
      "$2\\sqrt{x}$",
      "$\\dfrac{1}{2x}$",
    ],
    expected: ["$\\dfrac{1}{2\\sqrt{x}}$"],
    comparator: "mcq_exact",
    hint: "C'est une dérivée de référence : $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$.",
    explanation: exp(
      "La fonction racine carrée a une dérivée de référence.",
      "On applique la formule du cours.",
      "$(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$.",
      "La dérivée est $f'(x) = \\dfrac{1}{2\\sqrt{x}}$."
    ),
    tags: ["terminale-spe", "derivation", "formules", "racine", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_derivation_formules_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_formules",
    difficulty: 2,
    theme: "neutral",
    hint: "On abaisse l'exposant d'un cran et il devient coefficient.",
    tags: ["terminale-spe", "derivation", "formules", "puissance", "template"],
    generate: () => {
      const n = randomInt(2, 6);
      const correct = `$${monome(n, n - 1)}$`;
      const distracteurs = [
        `$${monome(1, n - 1)}$`,
        `$${monome(n, n)}$`,
        `$${monome(n - 1, n)}$`,
      ];
      return {
        text: `Quelle est la dérivée de $f(x) = x^{${n}}$ ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée d'une puissance suit la règle $(x^n)' = n\\,x^{n-1}$.",
          `On applique la formule avec $n = ${n}$.`,
          `$(x^{${n}})' = ${n}\\,x^{${n - 1}} = ${monome(n, n - 1)}$.`,
          `La dérivée est $f'(x) = ${monome(n, n - 1)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_derivation_formules_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_formules",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient reste en facteur ; on dérive la puissance.",
    tags: ["terminale-spe", "derivation", "formules", "puissance", "template"],
    generate: () => {
      const c = randomInt(2, 6);
      // Les pièges « on garde le coefficient » et « on ne garde que l'exposant »
      // sont le même monôme quand le coefficient vaut l'exposant.
      let n = randomInt(2, 5);
      while (n === c) n = randomInt(2, 5);
      const correct = `$${monome(c * n, n - 1)}$`;
      const distracteurs = [
        `$${monome(c, n - 1)}$`,
        `$${monome(c * n, n)}$`,
        `$${monome(n, n - 1)}$`,
      ];
      return {
        text: `Quelle est la dérivée de $f(x) = ${c}x^{${n}}$ ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On dérive $c\\,x^n$ : le coefficient reste, et $(x^n)' = n x^{n-1}$.",
          `On a $c = ${c}$ et $n = ${n}$.`,
          `$(${c}x^{${n}})' = ${c} \\times ${n}\\,x^{${n - 1}} = ${monome(c * n, n - 1)}$.`,
          `La dérivée est $f'(x) = ${monome(c * n, n - 1)}$.`
        ),
      };
    },
  },

  /* =========================================================
     DERIVATION_SOMME_PRODUIT_QUOTIENT
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_derivation_spq_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_somme_produit_quotient",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = 3x^2 + 2x$ ?",
    format: "qcm",
    choices: ["$6x + 2$", "$6x$", "$3x + 2$", "$6x^2 + 2$"],
    expected: ["$6x + 2$"],
    comparator: "mcq_exact",
    hint: "On dérive chaque terme séparément.",
    explanation: exp(
      "La dérivée d'une somme est la somme des dérivées.",
      "On dérive $3x^2$ puis $2x$.",
      "$(3x^2)' = 6x$ et $(2x)' = 2$, donc $f'(x) = 6x + 2$.",
      "La dérivée est $f'(x) = 6x + 2$."
    ),
    tags: ["terminale-spe", "derivation", "somme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_spq_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_somme_produit_quotient",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x^3 + x$ ?",
    format: "qcm",
    choices: ["$3x^2 + 1$", "$3x^2$", "$3x + 1$", "$x^2 + 1$"],
    expected: ["$3x^2 + 1$"],
    comparator: "mcq_exact",
    hint: "On dérive $x^3$ puis $x$.",
    explanation: exp(
      "La dérivée d'une somme est la somme des dérivées.",
      "On dérive $x^3$ et $x$.",
      "$(x^3)' = 3x^2$ et $(x)' = 1$, donc $f'(x) = 3x^2 + 1$.",
      "La dérivée est $f'(x) = 3x^2 + 1$."
    ),
    tags: ["terminale-spe", "derivation", "somme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_spq_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_somme_produit_quotient",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = 4x^2 - 5x + 7$ ?",
    format: "qcm",
    choices: ["$8x - 5$", "$8x - 5 + 7$", "$8x - 5x$", "$4x - 5$"],
    expected: ["$8x - 5$"],
    comparator: "mcq_exact",
    hint: "La dérivée de la constante $7$ est nulle.",
    explanation: exp(
      "On dérive un polynôme terme par terme.",
      "On dérive $4x^2$, $-5x$ et la constante $7$.",
      "$(4x^2)' = 8x$, $(-5x)' = -5$, $(7)' = 0$.",
      "La dérivée est $f'(x) = 8x - 5$."
    ),
    tags: ["terminale-spe", "derivation", "polynome", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_spq_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_somme_produit_quotient",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = 5x^3 - 2x^2 + 4$ ?",
    format: "qcm",
    choices: ["$15x^2 - 4x$", "$15x^2 - 4x + 4$", "$15x^2 - 2x$", "$5x^2 - 4x$"],
    expected: ["$15x^2 - 4x$"],
    comparator: "mcq_exact",
    hint: "La dérivée d'une constante est nulle.",
    explanation: exp(
      "On dérive un polynôme terme par terme.",
      "On dérive $5x^3$, $-2x^2$ et la constante $4$.",
      "$(5x^3)' = 15x^2$, $(-2x^2)' = -4x$, $(4)' = 0$.",
      "La dérivée est $f'(x) = 15x^2 - 4x$."
    ),
    tags: ["terminale-spe", "derivation", "polynome", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_spq_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_somme_produit_quotient",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de dérivation d'un produit $uv$ ?",
    format: "qcm",
    choices: [
      "$(uv)' = u'v + uv'$",
      "$(uv)' = u'v'$",
      "$(uv)' = u'v - uv'$",
      "$(uv)' = u'v + u'v'$",
    ],
    expected: ["$(uv)' = u'v + uv'$"],
    comparator: "mcq_exact",
    hint: "On dérive l'un, on garde l'autre, puis on échange.",
    explanation: exp(
      "La dérivée d'un produit n'est pas le produit des dérivées.",
      "On applique la formule du produit.",
      "$(uv)' = u'v + uv'$.",
      "La bonne formule est $(uv)' = u'v + uv'$."
    ),
    tags: ["terminale-spe", "derivation", "produit", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_spq_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_somme_produit_quotient",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la formule de dérivation d'un quotient $\\dfrac{u}{v}$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{u'v - uv'}{v^2}$",
      "$\\dfrac{u'v + uv'}{v^2}$",
      "$\\dfrac{u'}{v'}$",
      "$\\dfrac{uv' - u'v}{v^2}$",
    ],
    expected: ["$\\dfrac{u'v - uv'}{v^2}$"],
    comparator: "mcq_exact",
    hint: "Attention au signe et au dénominateur au carré.",
    explanation: exp(
      "La dérivée d'un quotient a une formule précise, avec un signe moins.",
      "On applique la formule du quotient.",
      "$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.",
      "La bonne formule est $\\dfrac{u'v - uv'}{v^2}$."
    ),
    tags: ["terminale-spe", "derivation", "quotient", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_spq_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_somme_produit_quotient",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\dfrac{x}{x+1}$ sur $]-1\\,;+\\infty[$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{1}{(x+1)^2}$",
      "$\\dfrac{-1}{(x+1)^2}$",
      "$\\dfrac{2x+1}{(x+1)^2}$",
      "$1$",
    ],
    expected: ["$\\dfrac{1}{(x+1)^2}$"],
    comparator: "mcq_exact",
    hint: "Pose $u = x$ et $v = x+1$, puis applique la formule du quotient.",
    explanation: exp(
      "On dérive un quotient avec $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.",
      "On pose $u = x$ ($u' = 1$) et $v = x+1$ ($v' = 1$).",
      "$f'(x) = \\dfrac{1 \\times (x+1) - x \\times 1}{(x+1)^2} = \\dfrac{1}{(x+1)^2}$.",
      "La dérivée est $f'(x) = \\dfrac{1}{(x+1)^2}$."
    ),
    tags: ["terminale-spe", "derivation", "quotient", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_spq_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_somme_produit_quotient",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\dfrac{x+1}{x-1}$ sur $]1\\,;+\\infty[$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{-2}{(x-1)^2}$",
      "$\\dfrac{2}{(x-1)^2}$",
      "$\\dfrac{1}{(x-1)^2}$",
      "$1$",
    ],
    expected: ["$\\dfrac{-2}{(x-1)^2}$"],
    comparator: "mcq_exact",
    hint: "Pose $u = x+1$ et $v = x-1$ ($u' = v' = 1$).",
    explanation: exp(
      "On dérive un quotient avec $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.",
      "On pose $u = x+1$ ($u' = 1$) et $v = x-1$ ($v' = 1$).",
      "$f'(x) = \\dfrac{(x-1) - (x+1)}{(x-1)^2} = \\dfrac{-2}{(x-1)^2}$.",
      "La dérivée est $f'(x) = \\dfrac{-2}{(x-1)^2}$."
    ),
    tags: ["terminale-spe", "derivation", "quotient", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_derivation_spq_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_somme_produit_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "On dérive chaque terme séparément.",
    tags: ["terminale-spe", "derivation", "polynome", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(1, 6);
      const c = randomInt(1, 9);
      const correct = `$${monome(2 * a, 1)} + ${b}$`;
      const distracteurs = [
        `$${monome(2 * a, 1)} + ${b} + ${c}$`,
        `$${monome(a, 1)} + ${b}$`,
        `$${monome(2 * a, 2)} + ${b}$`,
      ];
      return {
        text: `Quelle est la dérivée de $f(x) = ${a}x^2 + ${b}x + ${c}$ ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On dérive un polynôme terme par terme.",
          `On dérive $${a}x^2$, $${b}x$ et la constante $${c}$.`,
          `$(${a}x^2)' = ${2 * a}x$, $(${b}x)' = ${b}$, $(${c})' = 0$.`,
          `La dérivée est $f'(x) = ${2 * a}x + ${b}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_derivation_spq_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_somme_produit_quotient",
    difficulty: 4,
    theme: "neutral",
    hint: "On dérive chaque terme ; la constante disparaît.",
    tags: ["terminale-spe", "derivation", "polynome", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(2, 6);
      const correct = `$${monome(3 * a, 2)} + ${b}$`;
      const distracteurs = [
        `$${monome(a, 2)} + ${b}$`,
        `$${monome(3 * a, 1)} + ${b}$`,
        `$${monome(3 * a, 2)}$`,
      ];
      return {
        text: `Quelle est la dérivée de $f(x) = ${a}x^3 + ${b}x - 1$ ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On dérive un polynôme terme par terme.",
          `On dérive $${a}x^3$, $${b}x$ et la constante $-1$.`,
          `$(${a}x^3)' = ${3 * a}x^2$, $(${b}x)' = ${b}$, $(-1)' = 0$.`,
          `La dérivée est $f'(x) = ${3 * a}x^2 + ${b}$.`
        ),
      };
    },
  },

  /* =========================================================
     DERIVATION_COMPOSEE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_derivation_composee_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_composee",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la formule de dérivation de $u^n$ ?",
    format: "qcm",
    choices: [
      "$(u^n)' = n\\,u'\\,u^{n-1}$",
      "$(u^n)' = n\\,u^{n-1}$",
      "$(u^n)' = u'\\,u^{n-1}$",
      "$(u^n)' = n\\,u'\\,u^{n}$",
    ],
    expected: ["$(u^n)' = n\\,u'\\,u^{n-1}$"],
    comparator: "mcq_exact",
    hint: "Comme pour $x^n$, mais on multiplie par $u'$.",
    explanation: exp(
      "Dériver une fonction composée du type $u^n$ utilise la dérivée de $u$.",
      "On reprend la règle de la puissance, en ajoutant le facteur $u'$.",
      "$(u^n)' = n\\,u'\\,u^{n-1}$.",
      "La bonne formule est $(u^n)' = n\\,u'\\,u^{n-1}$."
    ),
    tags: ["terminale-spe", "derivation", "composee", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_composee_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_composee",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = (3x + 1)^2$ ?",
    format: "qcm",
    choices: ["$6(3x + 1)$", "$2(3x + 1)$", "$(3x+1)$", "$6x + 1$"],
    expected: ["$6(3x + 1)$"],
    comparator: "mcq_exact",
    hint: "Avec $u = 3x+1$, on a $u' = 3$, puis $(u^2)' = 2u'u$.",
    explanation: exp(
      "On dérive une composée $u^2$ avec $(u^2)' = 2\\,u'\\,u$.",
      "On pose $u = 3x+1$, donc $u' = 3$.",
      "$f'(x) = 2 \\times 3 \\times (3x+1) = 6(3x+1)$.",
      "La dérivée est $f'(x) = 6(3x+1)$."
    ),
    tags: ["terminale-spe", "derivation", "composee", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_composee_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_composee",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = (1 - x)^2$ ?",
    format: "qcm",
    choices: ["$-2(1 - x)$", "$2(1 - x)$", "$(1 - x)$", "$-2x$"],
    expected: ["$-2(1 - x)$"],
    comparator: "mcq_exact",
    hint: "Avec $u = 1-x$, on a $u' = -1$.",
    explanation: exp(
      "On dérive une composée $u^2$ avec $(u^2)' = 2\\,u'\\,u$.",
      "On pose $u = 1-x$, donc $u' = -1$.",
      "$f'(x) = 2 \\times (-1) \\times (1-x) = -2(1-x)$.",
      "La dérivée est $f'(x) = -2(1-x)$."
    ),
    tags: ["terminale-spe", "derivation", "composee", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_composee_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_composee",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = (x^2 + 1)^3$ ?",
    format: "qcm",
    choices: [
      "$6x(x^2 + 1)^2$",
      "$3(x^2 + 1)^2$",
      "$6x(x^2 + 1)^3$",
      "$2x(x^2 + 1)^2$",
    ],
    expected: ["$6x(x^2 + 1)^2$"],
    comparator: "mcq_exact",
    hint: "Avec $u = x^2+1$, on a $u' = 2x$, puis $(u^3)' = 3u'u^2$.",
    explanation: exp(
      "On dérive une composée $u^3$ avec $(u^3)' = 3\\,u'\\,u^2$.",
      "On pose $u = x^2+1$, donc $u' = 2x$.",
      "$f'(x) = 3 \\times 2x \\times (x^2+1)^2 = 6x(x^2+1)^2$.",
      "La dérivée est $f'(x) = 6x(x^2+1)^2$."
    ),
    tags: ["terminale-spe", "derivation", "composee", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_composee_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_composee",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = (2x - 5)^4$ ?",
    format: "qcm",
    choices: ["$8(2x - 5)^3$", "$4(2x - 5)^3$", "$8(2x - 5)^4$", "$2(2x - 5)^3$"],
    expected: ["$8(2x - 5)^3$"],
    comparator: "mcq_exact",
    hint: "Avec $u = 2x-5$, on a $u' = 2$, puis $(u^4)' = 4u'u^3$.",
    explanation: exp(
      "On dérive une composée $u^4$ avec $(u^4)' = 4\\,u'\\,u^3$.",
      "On pose $u = 2x-5$, donc $u' = 2$.",
      "$f'(x) = 4 \\times 2 \\times (2x-5)^3 = 8(2x-5)^3$.",
      "La dérivée est $f'(x) = 8(2x-5)^3$."
    ),
    tags: ["terminale-spe", "derivation", "composee", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_composee_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_composee",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = (5x + 2)^3$ ?",
    format: "qcm",
    choices: ["$15(5x + 2)^2$", "$3(5x + 2)^2$", "$15(5x + 2)^3$", "$5(5x + 2)^2$"],
    expected: ["$15(5x + 2)^2$"],
    comparator: "mcq_exact",
    hint: "Avec $u = 5x+2$, on a $u' = 5$, puis $(u^3)' = 3u'u^2$.",
    explanation: exp(
      "On dérive une composée $u^3$ avec $(u^3)' = 3\\,u'\\,u^2$.",
      "On pose $u = 5x+2$, donc $u' = 5$.",
      "$f'(x) = 3 \\times 5 \\times (5x+2)^2 = 15(5x+2)^2$.",
      "La dérivée est $f'(x) = 15(5x+2)^2$."
    ),
    tags: ["terminale-spe", "derivation", "composee", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_composee_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_composee",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = \\sqrt{2x + 1}$ sur $]-\\tfrac{1}{2}\\,;+\\infty[$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{1}{\\sqrt{2x + 1}}$",
      "$\\dfrac{1}{2\\sqrt{2x + 1}}$",
      "$\\dfrac{2}{\\sqrt{2x + 1}}$",
      "$\\dfrac{1}{\\sqrt{2x}}$",
    ],
    expected: ["$\\dfrac{1}{\\sqrt{2x + 1}}$"],
    comparator: "mcq_exact",
    hint: "$(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$ avec $u = 2x+1$.",
    explanation: exp(
      "On dérive une composée racine avec $(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$.",
      "On pose $u = 2x+1$, donc $u' = 2$.",
      "$f'(x) = \\dfrac{2}{2\\sqrt{2x+1}} = \\dfrac{1}{\\sqrt{2x+1}}$.",
      "La dérivée est $f'(x) = \\dfrac{1}{\\sqrt{2x+1}}$."
    ),
    tags: ["terminale-spe", "derivation", "composee", "racine", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_composee_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_composee",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = (x^2 + x)^2$ ?",
    format: "qcm",
    choices: [
      "$2(2x + 1)(x^2 + x)$",
      "$(2x + 1)(x^2 + x)$",
      "$2(x^2 + x)$",
      "$2(2x + 1)$",
    ],
    expected: ["$2(2x + 1)(x^2 + x)$"],
    comparator: "mcq_exact",
    hint: "Avec $u = x^2+x$, on a $u' = 2x+1$, puis $(u^2)' = 2u'u$.",
    explanation: exp(
      "On dérive une composée $u^2$ avec $(u^2)' = 2\\,u'\\,u$.",
      "On pose $u = x^2+x$, donc $u' = 2x+1$.",
      "$f'(x) = 2(2x+1)(x^2+x)$.",
      "La dérivée est $f'(x) = 2(2x+1)(x^2+x)$."
    ),
    tags: ["terminale-spe", "derivation", "composee", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_derivation_composee_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_composee",
    difficulty: 3,
    theme: "neutral",
    hint: "Avec $u = ax+b$, $(u^2)' = 2u'u = 2a(ax+b)$.",
    tags: ["terminale-spe", "derivation", "composee", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 5);
      const correct = `$${2 * a}(${a}x + ${b})$`;
      const distracteurs = [
        `$2(${a}x + ${b})$`,
        `$${2 * a}(${a}x + ${b})^2$`,
        `$${a}(${a}x + ${b})$`,
      ];
      return {
        text: `Quelle est la dérivée de $f(x) = (${a}x + ${b})^2$ ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On dérive une composée $u^2$ avec $(u^2)' = 2\\,u'\\,u$.",
          `On pose $u = ${a}x + ${b}$, donc $u' = ${a}$.`,
          `$f'(x) = 2 \\times ${a} \\times (${a}x + ${b}) = ${2 * a}(${a}x + ${b})$.`,
          `La dérivée est $f'(x) = ${2 * a}(${a}x + ${b})$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_derivation_composee_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "Avec $u = ax+b$, $(u^3)' = 3u'u^2 = 3a(ax+b)^2$.",
    tags: ["terminale-spe", "derivation", "composee", "template"],
    generate: () => {
      // a ne vaut pas 3 : les deux pièges « on oublie $u'$ » et « on oublie le
      // 3 » s'écriraient alors de la même façon.
      const a = [2, 4, 5][randomInt(0, 2)];
      const b = randomInt(1, 5);
      const correct = `$${3 * a}(${a}x + ${b})^2$`;
      const distracteurs = [
        `$3(${a}x + ${b})^2$`,
        `$${3 * a}(${a}x + ${b})$`,
        `$${a}(${a}x + ${b})^2$`,
      ];
      return {
        text: `Quelle est la dérivée de $f(x) = (${a}x + ${b})^3$ ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On dérive une composée $u^3$ avec $(u^3)' = 3\\,u'\\,u^2$.",
          `On pose $u = ${a}x + ${b}$, donc $u' = ${a}$.`,
          `$f'(x) = 3 \\times ${a} \\times (${a}x + ${b})^2 = ${3 * a}(${a}x + ${b})^2$.`,
          `La dérivée est $f'(x) = ${3 * a}(${a}x + ${b})^2$.`
        ),
      };
    },
  },

  /* =========================================================
     DERIVATION_VARIATION
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_derivation_variation_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_variation",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un intervalle où $f'(x) > 0$, que peut-on dire de $f$ ?",
    format: "qcm",
    choices: [
      "$f$ est croissante",
      "$f$ est décroissante",
      "$f$ est constante",
      "$f$ est négative",
    ],
    expected: ["$f$ est croissante"],
    comparator: "mcq_exact",
    hint: "Le signe de la dérivée donne le sens de variation.",
    explanation: exp(
      "Le signe de $f'$ détermine les variations de $f$.",
      "On lit le signe de $f'(x)$ sur l'intervalle.",
      "Si $f'(x) > 0$, alors $f$ est croissante.",
      "La fonction $f$ est croissante."
    ),
    tags: ["terminale-spe", "derivation", "variation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_variation_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_variation",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un intervalle où $f'(x) < 0$, que peut-on dire de $f$ ?",
    format: "qcm",
    choices: [
      "$f$ est décroissante",
      "$f$ est croissante",
      "$f$ est constante",
      "$f$ est positive",
    ],
    expected: ["$f$ est décroissante"],
    comparator: "mcq_exact",
    hint: "Une dérivée négative fait diminuer la fonction.",
    explanation: exp(
      "Le signe de $f'$ détermine les variations de $f$.",
      "On lit le signe de $f'(x)$ sur l'intervalle.",
      "Si $f'(x) < 0$, alors $f$ est décroissante.",
      "La fonction $f$ est décroissante."
    ),
    tags: ["terminale-spe", "derivation", "variation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_variation_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_variation",
    difficulty: 2,
    theme: "neutral",
    text: "Si $f$ est croissante sur un intervalle, quel est le signe de $f'$ sur cet intervalle ?",
    format: "qcm",
    choices: ["Positif", "Négatif", "Nul partout", "On ne peut pas savoir"],
    expected: ["Positif"],
    comparator: "mcq_exact",
    hint: "C'est la réciproque du lien signe de $f'$ ↔ variations.",
    explanation: exp(
      "Il y a équivalence entre le sens de variation et le signe de la dérivée.",
      "On utilise que $f$ croissante correspond à $f' \\ge 0$.",
      "Si $f$ est croissante, alors $f'(x) \\ge 0$ : le signe est positif.",
      "Le signe de $f'$ est positif."
    ),
    tags: ["terminale-spe", "derivation", "variation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_variation_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_variation",
    difficulty: 3,
    theme: "neutral",
    text: "Que peut-on dire d'un point où $f'$ s'annule en changeant de signe ?",
    format: "qcm",
    choices: [
      "$f$ y présente un extremum local",
      "$f$ y est discontinue",
      "$f$ y vaut $0$",
      "$f$ y est constante",
    ],
    expected: ["$f$ y présente un extremum local"],
    comparator: "mcq_exact",
    hint: "Un changement de signe de $f'$ marque un maximum ou un minimum.",
    explanation: exp(
      "Les extremums locaux sont liés aux changements de signe de la dérivée.",
      "On observe le comportement de $f'$ autour du point.",
      "Si $f'$ s'annule en changeant de signe, $f$ passe d'un sens de variation à l'autre.",
      "La fonction $f$ y présente un extremum local."
    ),
    tags: ["terminale-spe", "derivation", "variation", "extremum", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_variation_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_variation",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = x^2 - 4x + 1$. On résout $f'(x) = 0$. Quelle est la valeur de $x$ qui annule $f'$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Calcule d'abord $f'(x) = 2x - 4$, puis résous $2x - 4 = 0$.",
    explanation: exp(
      "Les extremums se cherchent là où la dérivée s'annule.",
      "On dérive : $f'(x) = 2x - 4$, puis on résout $f'(x) = 0$.",
      "$2x - 4 = 0 \\iff x = 2$.",
      "La dérivée s'annule en $x = 2$."
    ),
    tags: ["terminale-spe", "derivation", "variation", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_variation_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_variation",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^2 - 4x + 1$, de dérivée $f'(x) = 2x - 4$. Sur quel intervalle $f$ est-elle décroissante ?",
    format: "qcm",
    choices: ["$]-\\infty\\,;2]$", "$[2\\,;+\\infty[$", "$]-\\infty\\,;+\\infty[$", "$[0\\,;2]$"],
    expected: ["$]-\\infty\\,;2]$"],
    comparator: "mcq_exact",
    hint: "$f$ décroît là où $f'(x) \\le 0$.",
    explanation: exp(
      "On détermine les variations à partir du signe de $f'$.",
      "$f'(x) = 2x - 4$ est négative quand $x < 2$.",
      "Donc $f'(x) \\le 0$ sur $]-\\infty\\,;2]$.",
      "La fonction $f$ est décroissante sur $]-\\infty\\,;2]$."
    ),
    tags: ["terminale-spe", "derivation", "variation", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_variation_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_variation",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^2 - 6x + 5$, de dérivée $f'(x) = 2x - 6$. Sur quel intervalle $f$ est-elle croissante ?",
    format: "qcm",
    choices: ["$[3\\,;+\\infty[$", "$]-\\infty\\,;3]$", "$[5\\,;+\\infty[$", "$\\mathbb{R}$"],
    expected: ["$[3\\,;+\\infty[$"],
    comparator: "mcq_exact",
    hint: "$f$ croît là où $f'(x) \\ge 0$.",
    explanation: exp(
      "On détermine les variations à partir du signe de $f'$.",
      "$f'(x) = 2x - 6$ est positive quand $x > 3$.",
      "Donc $f'(x) \\ge 0$ sur $[3\\,;+\\infty[$.",
      "La fonction $f$ est croissante sur $[3\\,;+\\infty[$."
    ),
    tags: ["terminale-spe", "derivation", "variation", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_variation_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_variation",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x$, de dérivée $f'(x) = 3x^2 - 3$. Quelle est la valeur positive de $x$ qui annule $f'$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Résous $3x^2 - 3 = 0$, soit $x^2 = 1$.",
    explanation: exp(
      "On cherche les valeurs qui annulent la dérivée.",
      "On résout $3x^2 - 3 = 0$, soit $x^2 = 1$.",
      "$x^2 = 1 \\iff x = -1$ ou $x = 1$. La valeur positive est $1$.",
      "La valeur positive est $x = 1$."
    ),
    tags: ["terminale-spe", "derivation", "variation", "short"],
  },

  {
    kind: "template",
    id: "terminale_spe_derivation_variation_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_variation",
    difficulty: 3,
    theme: "neutral",
    hint: "Dérive, puis résous $f'(x) = 0$.",
    tags: ["terminale-spe", "derivation", "variation", "template"],
    generate: () => {
      const k = randomInt(2, 6); // racine entière
      const c = randomInt(1, 9);
      return {
        text: `Soit $f(x) = x^2 - ${2 * k}x + ${c}$. En quelle valeur de $x$ la dérivée $f'$ s'annule-t-elle ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: exp(
          "On cherche où la dérivée s'annule.",
          `On dérive : $f'(x) = 2x - ${2 * k}$, puis on résout $f'(x) = 0$.`,
          `$2x - ${2 * k} = 0 \\iff x = ${k}$.`,
          `La dérivée s'annule en $x = ${k}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_derivation_variation_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_variation",
    difficulty: 4,
    theme: "neutral",
    hint: "$f'(x) = 2x - 2k$ ; $f$ décroît avant sa racine.",
    tags: ["terminale-spe", "derivation", "variation", "intervalle", "template"],
    generate: () => {
      const k = randomInt(2, 6);
      const c = randomInt(1, 9);
      const correct = `$]-\\infty\\,;${k}]$`;
      const distracteurs = [
        `$[${k}\\,;+\\infty[$`,
        `$\\mathbb{R}$`,
        `$[0\\,;${k}]$`,
      ];
      return {
        text: `Soit $f(x) = x^2 - ${2 * k}x + ${c}$, de dérivée $f'(x) = 2x - ${2 * k}$. Sur quel intervalle $f$ est-elle décroissante ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On détermine les variations à partir du signe de $f'$.",
          `$f'(x) = 2x - ${2 * k}$ est négative quand $x < ${k}$.`,
          `Donc $f'(x) \\le 0$ sur $]-\\infty\\,;${k}]$.`,
          `La fonction $f$ est décroissante sur $]-\\infty\\,;${k}]$.`
        ),
      };
    },
  },

  /* =========================================================
     DERIVATION_TANGENTE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_derivation_tangente_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_tangente",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'équation de la tangente à $C_f$ au point d'abscisse $a$ ?",
    format: "qcm",
    choices: [
      "$y = f'(a)(x - a) + f(a)$",
      "$y = f(a)(x - a) + f'(a)$",
      "$y = f'(a)\\,x + f(a)$",
      "$y = f'(a)(x - a)$",
    ],
    expected: ["$y = f'(a)(x - a) + f(a)$"],
    comparator: "mcq_exact",
    hint: "Le coefficient directeur est $f'(a)$ et la tangente passe par $(a\\,;f(a))$.",
    explanation: exp(
      "La tangente en $a$ est une droite de coefficient directeur $f'(a)$ passant par $(a\\,;f(a))$.",
      "On utilise la formule du cours.",
      "$y = f'(a)(x - a) + f(a)$.",
      "L'équation de la tangente est $y = f'(a)(x - a) + f(a)$."
    ),
    tags: ["terminale-spe", "derivation", "tangente", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_tangente_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_tangente",
    difficulty: 2,
    theme: "neutral",
    text: "Le coefficient directeur de la tangente à $C_f$ au point d'abscisse $a$ vaut :",
    format: "qcm",
    choices: ["$f'(a)$", "$f(a)$", "$a$", "$f'(x)$"],
    expected: ["$f'(a)$"],
    comparator: "mcq_exact",
    hint: "Le nombre dérivé en $a$ est le coefficient directeur.",
    explanation: exp(
      "Le nombre dérivé donne la pente de la tangente.",
      "On utilise l'interprétation géométrique du nombre dérivé.",
      "Le coefficient directeur de la tangente en $a$ est $f'(a)$.",
      "Le coefficient directeur vaut $f'(a)$."
    ),
    tags: ["terminale-spe", "derivation", "tangente", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_tangente_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_tangente",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = x^2$. Quel est le coefficient directeur de la tangente au point d'abscisse $3$ ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Le coefficient directeur est $f'(3)$.",
    explanation: exp(
      "Le coefficient directeur de la tangente en $a$ est $f'(a)$.",
      "On dérive : $f'(x) = 2x$, puis on calcule $f'(3)$.",
      "$f'(3) = 2 \\times 3 = 6$.",
      "Le coefficient directeur est $6$."
    ),
    tags: ["terminale-spe", "derivation", "tangente", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_tangente_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_tangente",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = x^3$. Quel est le coefficient directeur de la tangente au point d'abscisse $1$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Calcule $f'(1)$ avec $f'(x) = 3x^2$.",
    explanation: exp(
      "Le coefficient directeur de la tangente en $a$ est $f'(a)$.",
      "On dérive : $f'(x) = 3x^2$, puis on calcule $f'(1)$.",
      "$f'(1) = 3 \\times 1^2 = 3$.",
      "Le coefficient directeur est $3$."
    ),
    tags: ["terminale-spe", "derivation", "tangente", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_tangente_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_tangente",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = 2x^2$. Quel est le coefficient directeur de la tangente au point d'abscisse $1$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Calcule $f'(1)$ avec $f'(x) = 4x$.",
    explanation: exp(
      "Le coefficient directeur de la tangente en $a$ est $f'(a)$.",
      "On dérive : $f'(x) = 4x$, puis on calcule $f'(1)$.",
      "$f'(1) = 4 \\times 1 = 4$.",
      "Le coefficient directeur est $4$."
    ),
    tags: ["terminale-spe", "derivation", "tangente", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_tangente_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_tangente",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^2$. Quelle est l'équation de la tangente à $C_f$ au point d'abscisse $1$ ?",
    format: "qcm",
    choices: ["$y = 2x - 1$", "$y = 2x + 1$", "$y = x - 1$", "$y = 2x$"],
    expected: ["$y = 2x - 1$"],
    comparator: "mcq_exact",
    hint: "Calcule $f(1)$ et $f'(1)$, puis remplace dans $y = f'(a)(x-a) + f(a)$.",
    explanation: exp(
      "On utilise $y = f'(a)(x - a) + f(a)$ avec $a = 1$.",
      "On calcule $f(1) = 1$ et $f'(x) = 2x$, donc $f'(1) = 2$.",
      "$y = 2(x - 1) + 1 = 2x - 1$.",
      "L'équation de la tangente est $y = 2x - 1$."
    ),
    tags: ["terminale-spe", "derivation", "tangente", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_tangente_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_tangente",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^2 + 1$. Quelle est l'équation de la tangente à $C_f$ au point d'abscisse $1$ ?",
    format: "qcm",
    choices: ["$y = 2x$", "$y = 2x + 1$", "$y = 2x + 2$", "$y = x + 1$"],
    expected: ["$y = 2x$"],
    comparator: "mcq_exact",
    hint: "$f(1) = 2$ et $f'(1) = 2$.",
    explanation: exp(
      "On utilise $y = f'(a)(x - a) + f(a)$ avec $a = 1$.",
      "On calcule $f(1) = 2$ et $f'(x) = 2x$, donc $f'(1) = 2$.",
      "$y = 2(x - 1) + 2 = 2x - 2 + 2 = 2x$.",
      "L'équation de la tangente est $y = 2x$."
    ),
    tags: ["terminale-spe", "derivation", "tangente", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_tangente_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_tangente",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^2 - 3x$. Quelle est l'équation de la tangente à $C_f$ au point d'abscisse $2$ ?",
    format: "qcm",
    choices: ["$y = x - 4$", "$y = x - 2$", "$y = 2x - 4$", "$y = x + 4$"],
    expected: ["$y = x - 4$"],
    comparator: "mcq_exact",
    hint: "Calcule $f(2)$ et $f'(2)$ avec $f'(x) = 2x - 3$.",
    explanation: exp(
      "On utilise $y = f'(a)(x - a) + f(a)$ avec $a = 2$.",
      "On calcule $f(2) = 4 - 6 = -2$ et $f'(x) = 2x - 3$, donc $f'(2) = 1$.",
      "$y = 1 \\times (x - 2) + (-2) = x - 4$.",
      "L'équation de la tangente est $y = x - 4$."
    ),
    tags: ["terminale-spe", "derivation", "tangente", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_derivation_tangente_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_tangente",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient directeur est $f'(a)$ avec $f'(x) = 2x$.",
    tags: ["terminale-spe", "derivation", "tangente", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      return {
        text: `Soit $f(x) = x^2$. Quel est le coefficient directeur de la tangente au point d'abscisse $${a}$ ?`,
        format: "short",
        expected: [String(2 * a)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient directeur de la tangente en $a$ est $f'(a)$.",
          `On dérive : $f'(x) = 2x$, puis on calcule $f'(${a})$.`,
          `$f'(${a}) = 2 \\times ${a} = ${2 * a}$.`,
          `Le coefficient directeur est $${2 * a}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_derivation_tangente_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_tangente",
    difficulty: 4,
    theme: "neutral",
    hint: "Coefficient directeur $f'(a) = 2a$ pour $f(x) = x^2$.",
    tags: ["terminale-spe", "derivation", "tangente", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const m = 2 * a;
      const correct = `$y = ${m}x - ${a * a}$`;
      const distracteurs = [
        `$y = ${m}x + ${a * a}$`,
        `$y = ${a}x - ${a * a}$`,
        `$y = ${m}x$`,
      ];
      return {
        text: `Soit $f(x) = x^2$. Quelle est l'équation de la tangente à $C_f$ au point d'abscisse $${a}$ ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise $y = f'(a)(x - a) + f(a)$.",
          `On a $f(${a}) = ${a * a}$ et $f'(${a}) = ${m}$.`,
          `$y = ${m}(x - ${a}) + ${a * a} = ${m}x - ${m * a} + ${a * a} = ${m}x - ${a * a}$.`,
          `L'équation de la tangente est $y = ${m}x - ${a * a}$.`
        ),
      };
    },
  },

  /* =========================================================
     DERIVATION_OPTIMISATION
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_derivation_optimisation_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_optimisation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour trouver le maximum d'une fonction dérivable sur un intervalle, que cherche-t-on ?",
    format: "qcm",
    choices: [
      "La valeur où $f'$ s'annule en changeant de signe",
      "La valeur où $f$ s'annule",
      "La valeur où $f'$ est maximale",
      "La plus grande valeur de $x$",
    ],
    expected: ["La valeur où $f'$ s'annule en changeant de signe"],
    comparator: "mcq_exact",
    hint: "Un extremum local correspond à un changement de signe de $f'$.",
    explanation: exp(
      "Un extremum d'une fonction dérivable se trouve via le signe de sa dérivée.",
      "On cherche où $f'$ s'annule, puis on étudie son changement de signe.",
      "Un maximum correspond à $f'$ qui passe du positif au négatif.",
      "On cherche la valeur où $f'$ s'annule en changeant de signe."
    ),
    tags: ["terminale-spe", "derivation", "optimisation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_optimisation_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_optimisation",
    difficulty: 3,
    theme: "neutral",
    text: "À un maximum, comment varie le signe de $f'$ autour du point ?",
    format: "qcm",
    choices: [
      "Du positif au négatif",
      "Du négatif au positif",
      "Il reste positif",
      "Il reste négatif",
    ],
    expected: ["Du positif au négatif"],
    comparator: "mcq_exact",
    hint: "Avant un maximum la fonction monte, après elle descend.",
    explanation: exp(
      "Le signe de $f'$ traduit la montée puis la descente autour d'un maximum.",
      "Avant le maximum $f$ croît ($f' > 0$), après elle décroît ($f' < 0$).",
      "Donc $f'$ passe du positif au négatif.",
      "À un maximum, $f'$ passe du positif au négatif."
    ),
    tags: ["terminale-spe", "derivation", "optimisation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_optimisation_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_optimisation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour maximiser une aire $A(x)$ sur un intervalle, que doit-on étudier ?",
    format: "qcm",
    choices: [
      "Le signe de $A'(x)$",
      "Le signe de $A(x)$",
      "La valeur de $A(0)$",
      "La pente de la droite $y = x$",
    ],
    expected: ["Le signe de $A'(x)$"],
    comparator: "mcq_exact",
    hint: "Optimiser, c'est étudier les variations de la grandeur.",
    explanation: exp(
      "Optimiser une grandeur revient à étudier les variations de la fonction qui la modélise.",
      "On dérive $A$ et on étudie le signe de $A'$.",
      "Le maximum de $A$ se lit là où $A'$ s'annule en changeant de signe.",
      "On étudie le signe de $A'(x)$."
    ),
    tags: ["terminale-spe", "derivation", "optimisation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_optimisation_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_optimisation",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = -x^2 + 6x$. En quelle valeur de $x$ la fonction atteint-elle son maximum ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Résous $f'(x) = 0$ avec $f'(x) = -2x + 6$.",
    explanation: exp(
      "Le maximum d'une parabole tournée vers le bas est atteint là où $f'$ s'annule.",
      "On dérive : $f'(x) = -2x + 6$, puis on résout $f'(x) = 0$.",
      "$-2x + 6 = 0 \\iff x = 3$.",
      "Le maximum est atteint en $x = 3$."
    ),
    tags: ["terminale-spe", "derivation", "optimisation", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_optimisation_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_optimisation",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = -x^2 + 6x$. Quelle est la valeur du maximum de $f$ ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Le maximum est atteint en $x = 3$ : calcule $f(3)$.",
    explanation: exp(
      "Une fois l'abscisse du maximum trouvée, on calcule la valeur de $f$ en ce point.",
      "Le maximum est atteint en $x = 3$, on calcule $f(3)$.",
      "$f(3) = -3^2 + 6 \\times 3 = -9 + 18 = 9$.",
      "Le maximum de $f$ vaut $9$."
    ),
    tags: ["terminale-spe", "derivation", "optimisation", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_optimisation_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_optimisation",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = -x^2 + 4x$. En quelle valeur de $x$ la fonction atteint-elle son maximum ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Résous $-2x + 4 = 0$.",
    explanation: exp(
      "Le maximum est atteint là où $f'$ s'annule.",
      "On dérive : $f'(x) = -2x + 4$, puis on résout $f'(x) = 0$.",
      "$-2x + 4 = 0 \\iff x = 2$.",
      "Le maximum est atteint en $x = 2$."
    ),
    tags: ["terminale-spe", "derivation", "optimisation", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_optimisation_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_optimisation",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^2 - 8x + 3$. En quelle valeur de $x$ la fonction atteint-elle son minimum ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Résous $2x - 8 = 0$.",
    explanation: exp(
      "Le minimum d'une parabole tournée vers le haut est atteint là où $f'$ s'annule.",
      "On dérive : $f'(x) = 2x - 8$, puis on résout $f'(x) = 0$.",
      "$2x - 8 = 0 \\iff x = 4$.",
      "Le minimum est atteint en $x = 4$."
    ),
    tags: ["terminale-spe", "derivation", "optimisation", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_optimisation_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_optimisation",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = -2x^2 + 8x$. En quelle valeur de $x$ la fonction atteint-elle son maximum ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Résous $-4x + 8 = 0$.",
    explanation: exp(
      "Le maximum est atteint là où $f'$ s'annule.",
      "On dérive : $f'(x) = -4x + 8$, puis on résout $f'(x) = 0$.",
      "$-4x + 8 = 0 \\iff x = 2$.",
      "Le maximum est atteint en $x = 2$."
    ),
    tags: ["terminale-spe", "derivation", "optimisation", "short"],
  },

  {
    kind: "template",
    id: "terminale_spe_derivation_optimisation_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_optimisation",
    difficulty: 4,
    theme: "neutral",
    hint: "Résous $f'(x) = 0$ avec $f'(x) = -2x + 2k$.",
    tags: ["terminale-spe", "derivation", "optimisation", "template"],
    generate: () => {
      const k = randomInt(2, 6);
      return {
        text: `Soit $f(x) = -x^2 + ${2 * k}x$. En quelle valeur de $x$ la fonction atteint-elle son maximum ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: exp(
          "Le maximum est atteint là où $f'$ s'annule.",
          `On dérive : $f'(x) = -2x + ${2 * k}$, puis on résout $f'(x) = 0$.`,
          `$-2x + ${2 * k} = 0 \\iff x = ${k}$.`,
          `Le maximum est atteint en $x = ${k}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_optimisation_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_optimisation",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^2 - 8x + 3$. Sachant que le minimum est atteint en $x = 4$, quelle est la valeur de ce minimum ?",
    format: "short",
    expected: ["-13"],
    comparator: "number_equal",
    hint: "Calcule $f(4)$.",
    explanation: exp(
      "La valeur d'un extremum s'obtient en calculant $f$ à l'abscisse trouvée.",
      "Le minimum est atteint en $x = 4$, on calcule $f(4)$.",
      "$f(4) = 4^2 - 8 \\times 4 + 3 = 16 - 32 + 3 = -13$.",
      "Le minimum de $f$ vaut $-13$."
    ),
    tags: ["terminale-spe", "derivation", "optimisation", "short"],
  },

  /* =========================================================
     DERIVATION_DEFI — Type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_derivation_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x$. Quelle est sa dérivée $f'(x)$ ?",
    format: "qcm",
    choices: ["$3x^2 - 3$", "$3x^2 - 3x$", "$x^2 - 3$", "$3x - 3$"],
    expected: ["$3x^2 - 3$"],
    comparator: "mcq_exact",
    hint: "On dérive $x^3$ puis $-3x$.",
    explanation: exp(
      "On dérive un polynôme terme par terme.",
      "On dérive $x^3$ et $-3x$.",
      "$(x^3)' = 3x^2$ et $(-3x)' = -3$, donc $f'(x) = 3x^2 - 3$.",
      "La dérivée est $f'(x) = 3x^2 - 3$."
    ),
    tags: ["terminale-spe", "derivation", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x$, de dérivée $f'(x) = 3x^2 - 3 = 3(x-1)(x+1)$. Sur quel intervalle $f$ est-elle décroissante ?",
    format: "qcm",
    choices: ["$[-1\\,;1]$", "$]-\\infty\\,;-1]$", "$[1\\,;+\\infty[$", "$]-\\infty\\,;+\\infty[$"],
    expected: ["$[-1\\,;1]$"],
    comparator: "mcq_exact",
    hint: "Étudie le signe de $3(x-1)(x+1)$ : négatif entre les racines.",
    explanation: exp(
      "On détermine les variations à partir du signe de $f'$.",
      "$f'(x) = 3(x-1)(x+1)$ est négatif entre ses racines $-1$ et $1$.",
      "Donc $f'(x) \\le 0$ sur $[-1\\,;1]$.",
      "La fonction $f$ est décroissante sur $[-1\\,;1]$."
    ),
    tags: ["terminale-spe", "derivation", "variation", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x$. La fonction admet un maximum local en $x = -1$. Quelle est la valeur de ce maximum ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Calcule $f(-1)$.",
    explanation: exp(
      "La valeur d'un extremum local s'obtient en calculant $f$ à l'abscisse trouvée.",
      "On calcule $f(-1)$.",
      "$f(-1) = (-1)^3 - 3 \\times (-1) = -1 + 3 = 2$.",
      "Le maximum local vaut $2$."
    ),
    tags: ["terminale-spe", "derivation", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x$. La fonction admet un minimum local en $x = 1$. Quelle est la valeur de ce minimum ?",
    format: "short",
    expected: ["-2"],
    comparator: "number_equal",
    hint: "Calcule $f(1)$.",
    explanation: exp(
      "La valeur d'un extremum local s'obtient en calculant $f$ à l'abscisse trouvée.",
      "On calcule $f(1)$.",
      "$f(1) = 1^3 - 3 \\times 1 = 1 - 3 = -2$.",
      "Le minimum local vaut $-2$."
    ),
    tags: ["terminale-spe", "derivation", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x^2$. Quelle est sa dérivée $f'(x)$ ?",
    format: "qcm",
    choices: ["$3x^2 - 6x$", "$3x^2 - 3x$", "$x^2 - 6x$", "$3x - 6$"],
    expected: ["$3x^2 - 6x$"],
    comparator: "mcq_exact",
    hint: "On dérive $x^3$ puis $-3x^2$.",
    explanation: exp(
      "On dérive un polynôme terme par terme.",
      "On dérive $x^3$ et $-3x^2$.",
      "$(x^3)' = 3x^2$ et $(-3x^2)' = -6x$, donc $f'(x) = 3x^2 - 6x$.",
      "La dérivée est $f'(x) = 3x^2 - 6x$."
    ),
    tags: ["terminale-spe", "derivation", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x^2$, de dérivée $f'(x) = 3x^2 - 6x = 3x(x - 2)$. Sur quel intervalle $f$ est-elle décroissante ?",
    format: "qcm",
    choices: ["$[0\\,;2]$", "$]-\\infty\\,;0]$", "$[2\\,;+\\infty[$", "$\\mathbb{R}$"],
    expected: ["$[0\\,;2]$"],
    comparator: "mcq_exact",
    hint: "$3x(x-2)$ est négatif entre ses racines $0$ et $2$.",
    explanation: exp(
      "On détermine les variations à partir du signe de $f'$.",
      "$f'(x) = 3x(x-2)$ est négatif entre ses racines $0$ et $2$.",
      "Donc $f'(x) \\le 0$ sur $[0\\,;2]$.",
      "La fonction $f$ est décroissante sur $[0\\,;2]$."
    ),
    tags: ["terminale-spe", "derivation", "variation", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x^2$, de dérivée $f'(x) = 3x(x - 2)$. Quelle est la valeur non nulle de $x$ qui annule $f'$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Résous $3x(x - 2) = 0$.",
    explanation: exp(
      "On cherche les valeurs qui annulent la dérivée.",
      "On résout $3x(x - 2) = 0$, soit $x = 0$ ou $x = 2$.",
      "La valeur non nulle est $x = 2$.",
      "La valeur cherchée est $x = 2$."
    ),
    tags: ["terminale-spe", "derivation", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 12x$, de dérivée $f'(x) = 3x^2 - 12 = 3(x - 2)(x + 2)$. Sur quel intervalle $f$ est-elle décroissante ?",
    format: "qcm",
    choices: ["$[-2\\,;2]$", "$]-\\infty\\,;-2]$", "$[2\\,;+\\infty[$", "$\\mathbb{R}$"],
    expected: ["$[-2\\,;2]$"],
    comparator: "mcq_exact",
    hint: "$3(x-2)(x+2)$ est négatif entre ses racines $-2$ et $2$.",
    explanation: exp(
      "On détermine les variations à partir du signe de $f'$.",
      "$f'(x) = 3(x-2)(x+2)$ est négatif entre ses racines $-2$ et $2$.",
      "Donc $f'(x) \\le 0$ sur $[-2\\,;2]$.",
      "La fonction $f$ est décroissante sur $[-2\\,;2]$."
    ),
    tags: ["terminale-spe", "derivation", "variation", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 12x$. La fonction admet un maximum local en $x = -2$. Quelle est la valeur de ce maximum ?",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "Calcule $f(-2)$.",
    explanation: exp(
      "La valeur d'un extremum local s'obtient en calculant $f$ à l'abscisse trouvée.",
      "On calcule $f(-2)$.",
      "$f(-2) = (-2)^3 - 12 \\times (-2) = -8 + 24 = 16$.",
      "Le maximum local vaut $16$."
    ),
    tags: ["terminale-spe", "derivation", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_derivation_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^3$. Quelle est l'équation de la tangente à $C_f$ au point d'abscisse $1$ ?",
    format: "qcm",
    choices: ["$y = 3x - 2$", "$y = 3x + 1$", "$y = 3x$", "$y = x - 2$"],
    expected: ["$y = 3x - 2$"],
    comparator: "mcq_exact",
    hint: "$f(1) = 1$, $f'(x) = 3x^2$, donc $f'(1) = 3$.",
    explanation: exp(
      "On utilise $y = f'(a)(x - a) + f(a)$ avec $a = 1$.",
      "On calcule $f(1) = 1$ et $f'(1) = 3$.",
      "$y = 3(x - 1) + 1 = 3x - 3 + 1 = 3x - 2$.",
      "L'équation de la tangente est $y = 3x - 2$."
    ),
    tags: ["terminale-spe", "derivation", "type_bac", "tangente", "qcm"],
  },
];
