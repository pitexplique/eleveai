// lib/tutor-v4/questionBank/terminale-spe/maths/derivation.bank.ts
//
// Notion : Dérivation et variations (derivation_fonction)
//
// Conventions :
// - Les formules sont écrites en LaTeX ($...$), rendues via KaTeX dans le tutor.
// - Règle produit : dès qu'une réponse est une EXPRESSION mathématique
//   (dérivée, équation de tangente, intervalle…), on utilise un QCM.
//   On ne demande à l'élève de TAPER que des réponses purement numériques
//   (format "short" + comparator "number_equal").

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
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
  /* =========================
     DERIVATION_FORMULES
  ========================= */

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
    id: "terminale_spe_derivation_formules_fixed_4",
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
    kind: "fixed",
    id: "terminale_spe_derivation_formules_fixed_5",
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
        `$${monome(1, n - 1)}$`, // oubli du coefficient
        `$${monome(n, n)}$`, // oubli d'abaisser l'exposant
        `$${monome(n - 1, n)}$`, // mauvais coefficient ET exposant
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

  /* =========================
     DERIVATION_SOMME_PRODUIT_QUOTIENT
  ========================= */

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
    id: "terminale_spe_derivation_spq_fixed_3",
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
    id: "terminale_spe_derivation_spq_fixed_4",
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
    id: "terminale_spe_derivation_spq_fixed_5",
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
      "On pose $u = x$ (donc $u' = 1$) et $v = x+1$ (donc $v' = 1$).",
      "$f'(x) = \\dfrac{1 \\times (x+1) - x \\times 1}{(x+1)^2} = \\dfrac{x+1-x}{(x+1)^2} = \\dfrac{1}{(x+1)^2}$.",
      "La dérivée est $f'(x) = \\dfrac{1}{(x+1)^2}$."
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
        `$${monome(2 * a, 1)} + ${b} + ${c}$`, // a gardé la constante
        `$${monome(a, 1)} + ${b}$`, // n'a pas multiplié par 2
        `$${monome(2 * a, 2)} + ${b}$`, // n'a pas abaissé l'exposant
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

  /* =========================
     DERIVATION_COMPOSEE
  ========================= */

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
    hint: "Avec $u = 3x+1$, on a $u' = 3$, puis on applique $(u^2)' = 2u'u$.",
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

  /* =========================
     DERIVATION_VARIATION
  ========================= */

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
    id: "terminale_spe_derivation_variation_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId: "derivation_variation",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^2 - 4x + 1$, de dérivée $f'(x) = 2x - 4$. Sur quel intervalle $f$ est-elle décroissante ?",
    format: "qcm",
    choices: [
      "$]-\\infty\\,;2]$",
      "$[2\\,;+\\infty[$",
      "$]-\\infty\\,;+\\infty[$",
      "$[0\\,;2]$",
    ],
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

  /* =========================
     DERIVATION_TANGENTE
  ========================= */

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
    hint: "Le coefficient directeur est $f'(a)$ et la tangente passe par le point $(a\\,;f(a))$.",
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
    id: "terminale_spe_derivation_tangente_fixed_3",
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
      "$y = 2(x - 1) + 1 = 2x - 2 + 1 = 2x - 1$.",
      "L'équation de la tangente est $y = 2x - 1$."
    ),
    tags: ["terminale-spe", "derivation", "tangente", "qcm"],
  },

  /* =========================
     DERIVATION_OPTIMISATION
  ========================= */

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
    id: "terminale_spe_derivation_optimisation_fixed_3",
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

  /* =========================
     DERIVATION_DEFI - TYPE BAC
  ========================= */

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
    choices: [
      "$[-1\\,;1]$",
      "$]-\\infty\\,;-1]$",
      "$[1\\,;+\\infty[$",
      "$]-\\infty\\,;+\\infty[$",
    ],
    expected: ["$[-1\\,;1]$"],
    comparator: "mcq_exact",
    hint: "Étudie le signe de $3(x-1)(x+1)$ : il est négatif entre les racines.",
    explanation: exp(
      "On détermine les variations à partir du signe de $f'$.",
      "$f'(x) = 3(x-1)(x+1)$ est un produit, négatif entre ses racines $-1$ et $1$.",
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
];
