// lib/tutor-v4/questionBank/terminale-spe/maths/primitives-integrales-concours.bank.ts
//
// Notion : Primitives et calcul intégral (primitive_integrale)
// Calibrage : épreuve de mathématiques du Concours Avenir (sujet 2026).
//
// Les gestes qui reviennent chaque année, et qu'il faut avoir en réflexe :
//   - reconnaître une forme u'/u ou u'e^{u} plutôt que chercher une primitive ;
//   - mener une intégration par parties courte (x e^{x}, x e^{-x}) ;
//   - lire une aire ou une valeur moyenne sans calcul quand la figure le permet
//     (fonction impaire, demi-disque, symétrie).
//
// Distracteurs : oubli du facteur 1/a en primitivant e^{ax}, confusion entre
// la fonction et sa primitive, signe perdu dans [F]_a^b, bornes inversées.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const primitivesIntegralesConcoursBank: TutorBankItemV4[] = [
  /* =========================================================
     PRIMITIVE_RECONNAITRE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $F$ une primitive de $f$ sur un intervalle $I$. Si $f(x) > 0$ pour tout $x$ de $I$, alors sur $I$ la fonction $F$ est :",
    format: "qcm",
    choices: [
      "strictement croissante",
      "strictement décroissante",
      "strictement positive",
      "constante",
    ],
    expected: ["strictement croissante"],
    comparator: "mcq_exact",
    hint: "Par définition, $F' = f$ : le signe de $f$ est celui de la dérivée de $F$.",
    explanation: exp(
      "$F$ est une primitive de $f$ signifie $F' = f$.",
      "Le sens de variation de $F$ se lit sur le signe de $F'$, c'est-à-dire de $f$.",
      "Comme $f > 0$, on a $F' > 0$ : $F$ est strictement croissante. Attention, cela ne dit rien du signe de $F$, qui peut très bien être négative.",
      "$F$ est strictement croissante."
    ),
    tags: ["terminale-spe", "primitive", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Deux primitives d'une même fonction sur un intervalle diffèrent :",
    format: "qcm",
    choices: [
      "d'une constante",
      "d'un facteur multiplicatif",
      "d'une fonction affine",
      "elles sont nécessairement égales",
    ],
    expected: ["d'une constante"],
    comparator: "mcq_exact",
    hint: "Si $F' = G'$, que vaut $(F - G)'$ ?",
    explanation: exp(
      "Une fonction de dérivée nulle sur un intervalle y est constante.",
      "On regarde la différence des deux primitives.",
      "Si $F' = G' = f$, alors $(F - G)' = 0$, donc $F - G$ est constante sur l'intervalle.",
      "Elles diffèrent d'une constante."
    ),
    tags: ["terminale-spe", "primitive", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Une primitive sur $\\mathbb{R}$ de la fonction $x \\mapsto x^2$ est :",
    format: "qcm",
    choices: [
      "$x \\mapsto \\dfrac{x^3}{3}$",
      "$x \\mapsto 3x^3$",
      "$x \\mapsto 2x$",
      "$x \\mapsto x^3$",
    ],
    expected: ["$x \\mapsto \\dfrac{x^3}{3}$"],
    comparator: "mcq_exact",
    hint: "Primitiver, c'est remonter d'un degré et diviser par le nouvel exposant.",
    explanation: exp(
      "Une primitive de $x \\mapsto x^n$ est $x \\mapsto \\dfrac{x^{n+1}}{n+1}$.",
      "On applique la formule avec $n = 2$, puis on vérifie en dérivant.",
      "$\\left(\\dfrac{x^3}{3}\\right)' = \\dfrac{3x^2}{3} = x^2$. La proposition $x \\mapsto 2x$ est la dérivée, pas la primitive.",
      "Une primitive est $x \\mapsto \\dfrac{x^3}{3}$."
    ),
    tags: ["terminale-spe", "primitive", "concours-avenir", "qcm"],
  },

  /* =========================================================
     PRIMITIVE_CALCULER
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Sur $\\mathbb{R}$, une primitive de $x \\mapsto \\dfrac{4x}{2 + x^2}$ est :",
    format: "qcm",
    choices: [
      "$x \\mapsto 2\\ln\\left(2 + x^2\\right)$",
      "$x \\mapsto \\ln\\left(2 + x^2\\right)$",
      "$x \\mapsto \\dfrac{4x}{2 + x^2}$",
      "$x \\mapsto \\ln\\left(2 - x^2\\right)$",
    ],
    expected: ["$x \\mapsto 2\\ln\\left(2 + x^2\\right)$"],
    comparator: "mcq_exact",
    hint: "Fais apparaître la forme $\\dfrac{u'}{u}$ : ici $u(x) = 2 + x^2$ et $u'(x) = 2x$.",
    explanation: exp(
      "Une primitive de $\\dfrac{u'}{u}$ est $\\ln|u|$ lorsque $u$ ne s'annule pas.",
      "On identifie $u$ et on ajuste le facteur numérique.",
      "$u(x) = 2 + x^2$, $u'(x) = 2x$, donc $\\dfrac{4x}{2+x^2} = 2 \\times \\dfrac{u'(x)}{u(x)}$. Une primitive est $2\\ln\\left(2+x^2\\right)$, le logarithme étant défini car $2 + x^2 > 0$.",
      "Une primitive est $x \\mapsto 2\\ln\\left(2 + x^2\\right)$."
    ),
    tags: ["terminale-spe", "primitive", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Sur $\\mathbb{R}$, une primitive de $x \\mapsto e^{3x}$ est :",
    format: "qcm",
    choices: [
      "$x \\mapsto \\dfrac{e^{3x}}{3}$",
      "$x \\mapsto 3e^{3x}$",
      "$x \\mapsto e^{3x}$",
      "$x \\mapsto \\dfrac{e^{3x}}{x}$",
    ],
    expected: ["$x \\mapsto \\dfrac{e^{3x}}{3}$"],
    comparator: "mcq_exact",
    hint: "En dérivant $e^{3x}$, un facteur $3$ apparaît : il faut le compenser.",
    explanation: exp(
      "Une primitive de $x \\mapsto e^{ax}$ est $x \\mapsto \\dfrac{e^{ax}}{a}$.",
      "On applique la formule, puis on vérifie en dérivant.",
      "$\\left(\\dfrac{e^{3x}}{3}\\right)' = \\dfrac{3e^{3x}}{3} = e^{3x}$. La proposition $3e^{3x}$ multiplie au lieu de diviser.",
      "Une primitive est $x \\mapsto \\dfrac{e^{3x}}{3}$."
    ),
    tags: ["terminale-spe", "primitive", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Sur $\\mathbb{R}$, une primitive de $x \\mapsto 2x\\,e^{x^2}$ est :",
    format: "qcm",
    choices: [
      "$x \\mapsto e^{x^2}$",
      "$x \\mapsto x^2 e^{x^2}$",
      "$x \\mapsto 2e^{x^2}$",
      "$x \\mapsto \\dfrac{e^{x^2}}{2}$",
    ],
    expected: ["$x \\mapsto e^{x^2}$"],
    comparator: "mcq_exact",
    hint: "Reconnais la forme $u'\\,e^{u}$.",
    explanation: exp(
      "Une primitive de $u'e^{u}$ est $e^{u}$.",
      "On identifie $u$ et on vérifie que le facteur devant est bien $u'$.",
      "Avec $u(x) = x^2$, on a $u'(x) = 2x$ : l'expression est exactement $u'e^{u}$. Donc $\\left(e^{x^2}\\right)' = 2x e^{x^2}$.",
      "Une primitive est $x \\mapsto e^{x^2}$."
    ),
    tags: ["terminale-spe", "primitive", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Sur $\\mathbb{R}$, une primitive de $x \\mapsto \\sin(2x)$ est :",
    format: "qcm",
    choices: [
      "$x \\mapsto -\\dfrac{\\cos(2x)}{2}$",
      "$x \\mapsto \\dfrac{\\cos(2x)}{2}$",
      "$x \\mapsto -2\\cos(2x)$",
      "$x \\mapsto -\\cos(2x)$",
    ],
    expected: ["$x \\mapsto -\\dfrac{\\cos(2x)}{2}$"],
    comparator: "mcq_exact",
    hint: "Deux pièges à la fois : le signe et le facteur $2$.",
    explanation: exp(
      "Une primitive de $x \\mapsto \\sin(ax)$ est $x \\mapsto -\\dfrac{\\cos(ax)}{a}$.",
      "On applique la formule, puis on vérifie en dérivant.",
      "$\\left(-\\dfrac{\\cos(2x)}{2}\\right)' = -\\dfrac{-2\\sin(2x)}{2} = \\sin(2x)$.",
      "Une primitive est $x \\mapsto -\\dfrac{\\cos(2x)}{2}$."
    ),
    tags: ["terminale-spe", "primitive", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Sur $\\left]-3\\,;\\,+\\infty\\right[$, une primitive de $x \\mapsto \\dfrac{1}{x + 3}$ est :",
    format: "qcm",
    choices: [
      "$x \\mapsto \\ln(x + 3)$",
      "$x \\mapsto \\ln(x) + 3$",
      "$x \\mapsto -\\dfrac{1}{(x+3)^2}$",
      "$x \\mapsto (x+3)\\ln(x+3)$",
    ],
    expected: ["$x \\mapsto \\ln(x + 3)$"],
    comparator: "mcq_exact",
    hint: "Forme $\\dfrac{u'}{u}$ avec $u(x) = x + 3$ et $u'(x) = 1$.",
    explanation: exp(
      "Une primitive de $\\dfrac{u'}{u}$ est $\\ln|u|$ lorsque $u$ ne s'annule pas.",
      "On identifie $u$, puis on vérifie le domaine.",
      "Sur $\\left]-3\\,;\\,+\\infty\\right[$, $x + 3 > 0$, donc $\\ln(x+3)$ est bien définie et sa dérivée vaut $\\dfrac{1}{x+3}$.",
      "Une primitive est $x \\mapsto \\ln(x + 3)$."
    ),
    tags: ["terminale-spe", "primitive", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "La primitive sur $\\mathbb{R}$ de $x \\mapsto 3x^2 - 2$ qui s'annule en $1$ est :",
    format: "qcm",
    choices: [
      "$x \\mapsto x^3 - 2x + 1$",
      "$x \\mapsto x^3 - 2x - 1$",
      "$x \\mapsto x^3 - 2x$",
      "$x \\mapsto x^3 + 2x - 3$",
    ],
    expected: ["$x \\mapsto x^3 - 2x + 1$"],
    comparator: "mcq_exact",
    hint: "Écris $F(x) = x^3 - 2x + C$, puis impose $F(1) = 0$.",
    explanation: exp(
      "Les primitives d'une fonction diffèrent d'une constante, fixée par une condition.",
      "On écrit la forme générale, puis on utilise la condition donnée.",
      "$F(x) = x^3 - 2x + C$ et $F(1) = 1 - 2 + C = C - 1 = 0$, donc $C = 1$.",
      "La primitive cherchée est $x \\mapsto x^3 - 2x + 1$."
    ),
    tags: ["terminale-spe", "primitive", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Sur $\\left]0\\,;\\,+\\infty\\right[$, une primitive de $x \\mapsto \\dfrac{1}{x^2}$ est :",
    format: "qcm",
    choices: [
      "$x \\mapsto -\\dfrac{1}{x}$",
      "$x \\mapsto \\dfrac{1}{x}$",
      "$x \\mapsto \\ln\\left(x^2\\right)$",
      "$x \\mapsto -\\dfrac{2}{x^3}$",
    ],
    expected: ["$x \\mapsto -\\dfrac{1}{x}$"],
    comparator: "mcq_exact",
    hint: "Écris $\\dfrac{1}{x^2} = x^{-2}$ et applique la règle des puissances.",
    explanation: exp(
      "Une primitive de $x \\mapsto x^{n}$ ($n \\neq -1$) est $x \\mapsto \\dfrac{x^{n+1}}{n+1}$.",
      "On passe en écriture puissance, puis on vérifie en dérivant.",
      "$x^{-2}$ donne $\\dfrac{x^{-1}}{-1} = -\\dfrac{1}{x}$, et $\\left(-\\dfrac{1}{x}\\right)' = \\dfrac{1}{x^2}$.",
      "Une primitive est $x \\mapsto -\\dfrac{1}{x}$."
    ),
    tags: ["terminale-spe", "primitive", "concours-avenir", "qcm"],
  },

  /* =========================================================
     INTEGRALE_CALCULER
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_11",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "L'intégrale $\\displaystyle\\int_{1}^{e} \\frac{\\ln x}{x}\\,\\mathrm{d}x$ vaut :",
    format: "qcm",
    choices: ["$\\dfrac{1}{2}$", "$1$", "$\\dfrac{1}{3}$", "$2$"],
    expected: ["$\\dfrac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Pose $u(x) = \\ln x$ : l'expression est de la forme $u'u$.",
    explanation: exp(
      "Une primitive de $u'u$ est $\\dfrac{u^2}{2}$.",
      "On reconnaît la forme, puis on applique les bornes.",
      "Avec $u(x) = \\ln x$ et $u'(x) = \\dfrac{1}{x}$, une primitive est $\\dfrac{(\\ln x)^2}{2}$. Alors $\\dfrac{(\\ln e)^2}{2} - \\dfrac{(\\ln 1)^2}{2} = \\dfrac{1}{2} - 0$.",
      "L'intégrale vaut $\\dfrac{1}{2}$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_12",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 5,
    theme: "neutral",
    text: "L'intégrale $\\displaystyle\\int_{0}^{\\ln 2} \\frac{e^{x}}{1 + e^{x}}\\,\\mathrm{d}x$ vaut :",
    format: "qcm",
    choices: [
      "$\\ln\\left(\\dfrac{3}{2}\\right)$",
      "$\\ln 3$",
      "$\\ln 2$",
      "$\\ln\\left(\\dfrac{1}{2}\\right)$",
    ],
    expected: ["$\\ln\\left(\\dfrac{3}{2}\\right)$"],
    comparator: "mcq_exact",
    hint: "Forme $\\dfrac{u'}{u}$ avec $u(x) = 1 + e^{x}$.",
    explanation: exp(
      "Une primitive de $\\dfrac{u'}{u}$ est $\\ln|u|$ lorsque $u > 0$.",
      "On identifie $u$, puis on applique les bornes.",
      "$u(x) = 1 + e^{x}$ et $u'(x) = e^{x}$, donc une primitive est $\\ln\\left(1 + e^{x}\\right)$. Alors $\\ln\\left(1 + e^{\\ln 2}\\right) - \\ln(1 + 1) = \\ln 3 - \\ln 2 = \\ln\\left(\\dfrac{3}{2}\\right)$.",
      "L'intégrale vaut $\\ln\\left(\\dfrac{3}{2}\\right)$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_13",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 5,
    theme: "neutral",
    text: "L'intégrale $\\displaystyle\\int_{0}^{1} x\\,e^{-x}\\,\\mathrm{d}x$ vaut :",
    format: "qcm",
    choices: [
      "$1 - \\dfrac{2}{e}$",
      "$\\dfrac{2}{e} - 1$",
      "$1 - \\dfrac{1}{e}$",
      "$\\dfrac{2}{e}$",
    ],
    expected: ["$1 - \\dfrac{2}{e}$"],
    comparator: "mcq_exact",
    hint: "Intégration par parties avec $u(x) = x$ et $v'(x) = e^{-x}$.",
    explanation: exp(
      "Intégration par parties : $\\displaystyle\\int_a^b u v' = [uv]_a^b - \\int_a^b u'v$.",
      "On pose $u(x) = x$ et $v(x) = -e^{-x}$.",
      "$\\left[-x e^{-x}\\right]_0^1 + \\displaystyle\\int_0^1 e^{-x}\\,\\mathrm{d}x = -\\dfrac{1}{e} + \\left[-e^{-x}\\right]_0^1 = -\\dfrac{1}{e} + \\left(1 - \\dfrac{1}{e}\\right) = 1 - \\dfrac{2}{e}$.",
      "L'intégrale vaut $1 - \\dfrac{2}{e}$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_14",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "L'intégrale $\\displaystyle\\int_{-6}^{6} |x|\\,\\mathrm{d}x$ vaut :",
    format: "qcm",
    choices: ["$36$", "$0$", "$18$", "$12$"],
    expected: ["$36$"],
    comparator: "mcq_exact",
    hint: "$|x|$ est positive : l'intégrale ne peut pas être nulle. Pense aux deux triangles.",
    explanation: exp(
      "L'intégrale d'une fonction positive est l'aire sous la courbe.",
      "On utilise la symétrie : $|x|$ est paire.",
      "$\\displaystyle\\int_{-6}^{6}|x|\\,\\mathrm{d}x = 2\\int_0^6 x\\,\\mathrm{d}x = 2\\left[\\dfrac{x^2}{2}\\right]_0^6 = 2 \\times 18 = 36$. Répondre $0$, c'est confondre avec le cas d'une fonction impaire.",
      "L'intégrale vaut $36$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_15",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "L'intégrale $\\displaystyle\\int_{0}^{1} (2x + 1)\\,\\mathrm{d}x$ vaut :",
    format: "qcm",
    choices: ["$2$", "$1$", "$3$", "$\\dfrac{3}{2}$"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    hint: "Une primitive de $2x + 1$ est $x^2 + x$.",
    explanation: exp(
      "$\\displaystyle\\int_a^b f = F(b) - F(a)$ où $F$ est une primitive de $f$.",
      "On primitive terme à terme, puis on applique les bornes.",
      "$F(x) = x^2 + x$, donc $F(1) - F(0) = (1 + 1) - 0 = 2$.",
      "L'intégrale vaut $2$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_16",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "L'intégrale $\\displaystyle\\int_{1}^{2} \\frac{1}{x^2}\\,\\mathrm{d}x$ vaut :",
    format: "qcm",
    choices: ["$\\dfrac{1}{2}$", "$-\\dfrac{1}{2}$", "$1$", "$\\ln 2$"],
    expected: ["$\\dfrac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Une primitive de $\\dfrac{1}{x^2}$ est $-\\dfrac{1}{x}$ — attention au double signe.",
    explanation: exp(
      "$\\displaystyle\\int_a^b f = F(b) - F(a)$.",
      "On primitive, puis on applique les bornes en surveillant les signes.",
      "$\\left[-\\dfrac{1}{x}\\right]_1^2 = -\\dfrac{1}{2} - (-1) = \\dfrac{1}{2}$. Un résultat négatif serait impossible : la fonction est positive.",
      "L'intégrale vaut $\\dfrac{1}{2}$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_17",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "L'intégrale $\\displaystyle\\int_{0}^{\\pi} \\sin x\\,\\mathrm{d}x$ vaut :",
    format: "qcm",
    choices: ["$2$", "$0$", "$1$", "$\\pi$"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    hint: "Une primitive de $\\sin$ est $-\\cos$, et $\\cos \\pi = -1$.",
    explanation: exp(
      "$\\displaystyle\\int_a^b f = F(b) - F(a)$.",
      "On primitive, puis on applique les bornes.",
      "$\\left[-\\cos x\\right]_0^{\\pi} = -\\cos\\pi + \\cos 0 = 1 + 1 = 2$.",
      "L'intégrale vaut $2$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_18",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "L'intégrale $\\displaystyle\\int_{0}^{1} e^{2x}\\,\\mathrm{d}x$ vaut :",
    format: "qcm",
    choices: [
      "$\\dfrac{e^{2} - 1}{2}$",
      "$e^{2} - 1$",
      "$2\\left(e^{2} - 1\\right)$",
      "$\\dfrac{e^{2} + 1}{2}$",
    ],
    expected: ["$\\dfrac{e^{2} - 1}{2}$"],
    comparator: "mcq_exact",
    hint: "N'oublie pas le facteur $\\dfrac{1}{2}$ en primitivant $e^{2x}$.",
    explanation: exp(
      "Une primitive de $x \\mapsto e^{ax}$ est $x \\mapsto \\dfrac{e^{ax}}{a}$.",
      "On primitive, puis on applique les bornes.",
      "$\\left[\\dfrac{e^{2x}}{2}\\right]_0^1 = \\dfrac{e^{2}}{2} - \\dfrac{1}{2} = \\dfrac{e^{2} - 1}{2}$.",
      "L'intégrale vaut $\\dfrac{e^{2} - 1}{2}$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_19",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 5,
    theme: "neutral",
    text: "Pour tout entier $n \\geq 0$, on pose $I_n = \\displaystyle\\int_{0}^{1} x^{n} e^{x}\\,\\mathrm{d}x$. Alors $I_1$ vaut :",
    format: "qcm",
    choices: ["$1$", "$e - 1$", "$2 - e$", "$e - 2$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Intégration par parties. Attention : $e - 1$ est la valeur de $I_0$, pas de $I_1$.",
    explanation: exp(
      "Intégration par parties : $\\displaystyle\\int_a^b u v' = [uv]_a^b - \\int_a^b u'v$.",
      "On pose $u(x) = x$ et $v(x) = e^{x}$.",
      "$I_1 = \\left[x e^{x}\\right]_0^1 - \\displaystyle\\int_0^1 e^{x}\\,\\mathrm{d}x = e - (e - 1) = 1$.",
      "$I_1 = 1$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_20",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "L'intégrale $\\displaystyle\\int_{-1}^{1} x^{3}\\,\\mathrm{d}x$ vaut :",
    format: "qcm",
    choices: ["$0$", "$\\dfrac{1}{2}$", "$2$", "$\\dfrac{1}{4}$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "La fonction cube est impaire, et l'intervalle est symétrique.",
    explanation: exp(
      "L'intégrale d'une fonction impaire sur un intervalle symétrique est nulle.",
      "On peut conclure sans calcul, ou primitiver pour vérifier.",
      "$\\left[\\dfrac{x^4}{4}\\right]_{-1}^{1} = \\dfrac{1}{4} - \\dfrac{1}{4} = 0$ : les aires au-dessus et au-dessous se compensent.",
      "L'intégrale vaut $0$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  /* =========================================================
     INTEGRALE_AIRE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_21",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 5,
    theme: "neutral",
    text: "Sur $[1\\,;\\,e]$, on considère les courbes d'équations $y = \\ln x$ et $y = x - 1$. L'aire, en unités d'aire, de la région comprise entre ces deux courbes vaut :",
    format: "qcm",
    choices: [
      "$\\dfrac{e^{2}}{2} - e - \\dfrac{1}{2}$",
      "$\\dfrac{e^{2}}{2} - e + \\dfrac{1}{2}$",
      "$\\dfrac{e}{2}$",
      "$e - 1$",
    ],
    expected: ["$\\dfrac{e^{2}}{2} - e - \\dfrac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Sur $[1\\,;\\,e]$, la droite est au-dessus de la courbe du logarithme.",
    explanation: exp(
      "L'aire entre deux courbes vaut $\\displaystyle\\int_a^b (\\text{fonction du haut} - \\text{fonction du bas})$.",
      "On détermine laquelle est au-dessus, puis on intègre la différence.",
      "En $x = 2$ : $2 - 1 = 1 > \\ln 2$, la droite est au-dessus. $\\displaystyle\\int_1^e (x - 1)\\,\\mathrm{d}x = \\dfrac{e^2}{2} - e + \\dfrac{1}{2}$ et $\\displaystyle\\int_1^e \\ln x\\,\\mathrm{d}x = \\left[x\\ln x - x\\right]_1^e = 1$. La différence vaut $\\dfrac{e^2}{2} - e - \\dfrac{1}{2}$.",
      "L'aire vaut $\\dfrac{e^{2}}{2} - e - \\dfrac{1}{2}$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_22",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 4,
    theme: "neutral",
    text: "L'aire, en unités d'aire, du domaine compris entre les courbes d'équations $y = x$ et $y = x^{2}$ sur $[0\\,;\\,1]$ vaut :",
    format: "qcm",
    choices: ["$\\dfrac{1}{6}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$", "$\\dfrac{5}{6}$"],
    expected: ["$\\dfrac{1}{6}$"],
    comparator: "mcq_exact",
    hint: "Sur $[0\\,;\\,1]$, on a $x^2 \\leq x$.",
    explanation: exp(
      "L'aire entre deux courbes vaut $\\displaystyle\\int_a^b (\\text{fonction du haut} - \\text{fonction du bas})$.",
      "On repère la position relative, puis on intègre la différence.",
      "Sur $[0\\,;\\,1]$, $x \\geq x^2$. Donc $\\displaystyle\\int_0^1 \\left(x - x^2\\right)\\mathrm{d}x = \\dfrac{1}{2} - \\dfrac{1}{3} = \\dfrac{1}{6}$.",
      "L'aire vaut $\\dfrac{1}{6}$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_23",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f$ une fonction continue et négative sur $[a\\,;\\,b]$, avec $a < b$. Alors $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ est :",
    format: "qcm",
    choices: [
      "négative ou nulle",
      "positive ou nulle",
      "nécessairement nulle",
      "de signe impossible à déterminer",
    ],
    expected: ["négative ou nulle"],
    comparator: "mcq_exact",
    hint: "L'intégrale conserve le signe quand les bornes sont dans le bon ordre.",
    explanation: exp(
      "Si $f \\leq 0$ sur $[a\\,;\\,b]$ avec $a < b$, alors $\\displaystyle\\int_a^b f \\leq 0$.",
      "On applique la propriété de positivité de l'intégrale.",
      "L'aire géométrique reste positive, mais l'intégrale compte négativement ce qui est sous l'axe des abscisses.",
      "L'intégrale est négative ou nulle."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_24",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un repère orthonormé d'unité graphique $2$ cm, une aire de $3$ unités d'aire vaut, en centimètres carrés :",
    format: "qcm",
    choices: ["$12$", "$6$", "$3$", "$24$"],
    expected: ["$12$"],
    comparator: "mcq_exact",
    hint: "Une unité d'aire est un carré de côté $2$ cm.",
    explanation: exp(
      "L'unité d'aire est l'aire du carré construit sur les unités des deux axes.",
      "On calcule d'abord la valeur d'une unité d'aire en cm².",
      "Une unité d'aire vaut $2 \\times 2 = 4$ cm². Donc $3$ unités d'aire valent $3 \\times 4 = 12$ cm². Répondre $6$, c'est n'avoir multiplié que par $2$.",
      "L'aire vaut $12$ cm²."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_25",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 3,
    theme: "neutral",
    text: "L'aire, en unités d'aire, du domaine situé sous la courbe de $x \\mapsto x^{2}$ et au-dessus de l'axe des abscisses, entre $x = 0$ et $x = 3$, vaut :",
    format: "qcm",
    choices: ["$9$", "$27$", "$3$", "$6$"],
    expected: ["$9$"],
    comparator: "mcq_exact",
    hint: "Une primitive de $x^2$ est $\\dfrac{x^3}{3}$.",
    explanation: exp(
      "L'aire sous une courbe positive vaut $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$.",
      "On primitive, puis on applique les bornes.",
      "$\\left[\\dfrac{x^3}{3}\\right]_0^3 = \\dfrac{27}{3} = 9$. Répondre $27$, c'est avoir oublié de diviser par $3$.",
      "L'aire vaut $9$ unités d'aire."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  /* =========================================================
     INTEGRALE_VALEUR_MOYENNE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_26",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "La valeur moyenne de la fonction $x \\mapsto \\sin x$ sur $[0\\,;\\,\\pi]$ vaut :",
    format: "qcm",
    choices: ["$\\dfrac{2}{\\pi}$", "$\\dfrac{1}{\\pi}$", "$0$", "$1$"],
    expected: ["$\\dfrac{2}{\\pi}$"],
    comparator: "mcq_exact",
    hint: "$\\displaystyle\\int_0^{\\pi}\\sin x\\,\\mathrm{d}x = 2$, et la longueur de l'intervalle est $\\pi$.",
    explanation: exp(
      "La valeur moyenne de $f$ sur $[a\\,;\\,b]$ vaut $\\dfrac{1}{b-a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$.",
      "On calcule l'intégrale, puis on divise par la longueur de l'intervalle.",
      "$\\displaystyle\\int_0^{\\pi}\\sin x\\,\\mathrm{d}x = \\left[-\\cos x\\right]_0^{\\pi} = 2$, donc la valeur moyenne vaut $\\dfrac{2}{\\pi}$.",
      "La valeur moyenne vaut $\\dfrac{2}{\\pi}$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_27",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "La valeur moyenne de la fonction $x \\mapsto 3x^{2}$ sur $[0\\,;\\,2]$ vaut :",
    format: "qcm",
    choices: ["$4$", "$8$", "$2$", "$12$"],
    expected: ["$4$"],
    comparator: "mcq_exact",
    hint: "Calcule l'intégrale, puis divise par $2 - 0$.",
    explanation: exp(
      "La valeur moyenne de $f$ sur $[a\\,;\\,b]$ vaut $\\dfrac{1}{b-a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$.",
      "On calcule l'intégrale, puis on divise par la longueur de l'intervalle.",
      "$\\displaystyle\\int_0^{2}3x^2\\,\\mathrm{d}x = \\left[x^3\\right]_0^2 = 8$, donc la valeur moyenne vaut $\\dfrac{8}{2} = 4$. Répondre $8$, c'est avoir oublié de diviser.",
      "La valeur moyenne vaut $4$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_28",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "La valeur moyenne, sur $[1\\,;\\,5]$, de la fonction constante égale à $7$ vaut :",
    format: "qcm",
    choices: ["$7$", "$28$", "$35$", "$\\dfrac{7}{4}$"],
    expected: ["$7$"],
    comparator: "mcq_exact",
    hint: "La moyenne d'une grandeur qui ne varie pas est cette grandeur elle-même.",
    explanation: exp(
      "La valeur moyenne de $f$ sur $[a\\,;\\,b]$ vaut $\\dfrac{1}{b-a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$.",
      "On applique la formule, ou on raisonne directement.",
      "$\\displaystyle\\int_1^5 7\\,\\mathrm{d}x = 7 \\times 4 = 28$, puis $\\dfrac{28}{4} = 7$ : la longueur de l'intervalle se simplifie.",
      "La valeur moyenne vaut $7$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_29",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "La valeur moyenne d'une fonction continue $f$ sur $[a\\,;\\,b]$ (avec $a < b$) est donnée par :",
    format: "qcm",
    choices: [
      "$\\dfrac{1}{b-a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$",
      "$\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$",
      "$\\dfrac{1}{b+a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$",
      "$(b-a)\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$",
    ],
    expected: ["$\\dfrac{1}{b-a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$"],
    comparator: "mcq_exact",
    hint: "Comme toute moyenne : on totalise, puis on divise par la « longueur ».",
    explanation: exp(
      "La valeur moyenne généralise la moyenne arithmétique au cas continu.",
      "On totalise par l'intégrale, puis on divise par la longueur de l'intervalle.",
      "La longueur de $[a\\,;\\,b]$ vaut $b - a$, d'où le facteur $\\dfrac{1}{b-a}$.",
      "La valeur moyenne vaut $\\dfrac{1}{b-a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  /* =========================================================
     INTEGRALE_DEFI
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_30",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "L'intégrale $\\displaystyle\\int_{-1}^{1} \\sqrt{1 - x^{2}}\\,\\mathrm{d}x$ vaut :",
    format: "qcm",
    choices: ["$\\dfrac{\\pi}{2}$", "$\\pi$", "$0$", "$2\\pi$"],
    expected: ["$\\dfrac{\\pi}{2}$"],
    comparator: "mcq_exact",
    hint: "Aucune primitive à chercher : reconnais la courbe $y = \\sqrt{1-x^2}$.",
    explanation: exp(
      "L'intégrale d'une fonction positive est l'aire sous sa courbe.",
      "On identifie la courbe plutôt que de calculer.",
      "$y = \\sqrt{1-x^2}$ avec $y \\geq 0$ équivaut à $x^2 + y^2 = 1$ : c'est le demi-cercle supérieur de rayon $1$. L'aire du demi-disque vaut $\\dfrac{\\pi \\times 1^2}{2} = \\dfrac{\\pi}{2}$.",
      "L'intégrale vaut $\\dfrac{\\pi}{2}$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_31",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour tout entier $n \\geq 0$, on pose $J_n = \\displaystyle\\int_{0}^{1} x^{n}\\,\\mathrm{d}x$. La limite de $J_n$ quand $n$ tend vers $+\\infty$ vaut :",
    format: "qcm",
    choices: ["$0$", "$1$", "$\\dfrac{1}{2}$", "$+\\infty$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Calcule $J_n$ explicitement : c'est une expression très simple en $n$.",
    explanation: exp(
      "Une primitive de $x^{n}$ est $\\dfrac{x^{n+1}}{n+1}$.",
      "On calcule $J_n$, puis on passe à la limite.",
      "$J_n = \\left[\\dfrac{x^{n+1}}{n+1}\\right]_0^1 = \\dfrac{1}{n+1}$, qui tend vers $0$.",
      "La limite vaut $0$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_32",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f$ continue sur $[0\\,;\\,3]$ telle que $\\displaystyle\\int_0^3 f(x)\\,\\mathrm{d}x = 5$ et $\\displaystyle\\int_0^1 f(x)\\,\\mathrm{d}x = 2$. Alors $\\displaystyle\\int_1^3 f(x)\\,\\mathrm{d}x$ vaut :",
    format: "qcm",
    choices: ["$3$", "$7$", "$-3$", "$10$"],
    expected: ["$3$"],
    comparator: "mcq_exact",
    hint: "Relation de Chasles : l'intégrale de $0$ à $3$ se coupe en deux morceaux.",
    explanation: exp(
      "Relation de Chasles : $\\displaystyle\\int_a^c f = \\int_a^b f + \\int_b^c f$.",
      "On découpe l'intervalle en $x = 1$.",
      "$\\displaystyle\\int_0^3 f = \\int_0^1 f + \\int_1^3 f$, donc $5 = 2 + \\int_1^3 f$, d'où $\\displaystyle\\int_1^3 f = 3$.",
      "L'intégrale vaut $3$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_pri_concours_33",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $F$ la primitive sur $\\mathbb{R}$ de $x \\mapsto e^{-x^{2}}$ qui s'annule en $0$. On peut affirmer que $F$ est :",
    format: "qcm",
    choices: [
      "strictement croissante sur $\\mathbb{R}$",
      "strictement décroissante sur $\\mathbb{R}$",
      "positive sur $\\mathbb{R}$",
      "constante sur $\\mathbb{R}$",
    ],
    expected: ["strictement croissante sur $\\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "Inutile de savoir calculer $F$ : son sens de variation se lit sur $F' $.",
    explanation: exp(
      "Le sens de variation de $F$ se lit sur le signe de $F' = f$.",
      "On étudie le signe de la fonction à primitiver.",
      "$e^{-x^2} > 0$ pour tout réel $x$, donc $F' > 0$ et $F$ est strictement croissante. Elle n'est pas positive partout : comme $F(0) = 0$ et qu'elle croît, $F$ est négative sur $\\left]-\\infty\\,;\\,0\\right[$.",
      "$F$ est strictement croissante sur $\\mathbb{R}$."
    ),
    tags: ["terminale-spe", "integrale", "concours-avenir", "qcm"],
  },
];
