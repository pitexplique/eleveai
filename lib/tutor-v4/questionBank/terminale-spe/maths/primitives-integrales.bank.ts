// lib/tutor-v4/questionBank/terminale-spe/maths/primitives-integrales.bank.ts
//
// Notion : Primitives et intégrales (primitive_integrale)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   primitive_reconnaitre     — Reconnaître une primitive
//   primitive_calculer        — Calculer une primitive simple
//   integrale_calculer        — Calculer une intégrale à l'aide d'une primitive
//   integrale_aire            — Interpréter une intégrale comme une aire
//   integrale_valeur_moyenne  — Calculer la valeur moyenne d'une fonction
//   integrale_defi            — Exercice type bac
//
// Conventions :
// - Formules en LaTeX ($...$), rendues via KaTeX.
// - Règle QCM : dès qu'une réponse est une EXPRESSION (primitive, intégrale
//   littérale) → "qcm". On ne demande de TAPER ("short" + "number_equal") que
//   des réponses purement numériques (valeur d'une intégrale ou d'une moyenne).
// - Convention « une primitive » : on donne une primitive (constante d'intégration omise).

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

export const primitivesIntegralesBank: TutorBankItemV4[] = [
  /* =========================================================
     PRIMITIVE_RECONNAITRE — Reconnaître une primitive
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_primitive_reconnaitre_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "$F$ est une primitive de $f$ sur un intervalle si :",
    format: "qcm",
    choices: ["$F' = f$", "$f' = F$", "$F = f$", "$F' = f'$"],
    expected: ["$F' = f$"],
    comparator: "mcq_exact",
    hint: "Primitiver, c'est l'opération inverse de dériver.",
    explanation: exp(
      "Une primitive est une fonction dont la dérivée redonne $f$.",
      "On utilise la définition du cours.",
      "$F$ est une primitive de $f$ signifie $F' = f$.",
      "La bonne relation est $F' = f$."
    ),
    tags: ["terminale-spe", "primitives", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_reconnaitre_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "$F(x) = x^2$ est une primitive de quelle fonction $f$ ?",
    format: "qcm",
    choices: ["$f(x) = 2x$", "$f(x) = x^2$", "$f(x) = \\dfrac{x^3}{3}$", "$f(x) = x$"],
    expected: ["$f(x) = 2x$"],
    comparator: "mcq_exact",
    hint: "On dérive $F$ pour retrouver $f$.",
    explanation: exp(
      "$F$ est une primitive de $f$ si $F' = f$.",
      "On dérive $F(x) = x^2$.",
      "$F'(x) = 2x$, donc $f(x) = 2x$.",
      "$F$ est une primitive de $f(x) = 2x$."
    ),
    tags: ["terminale-spe", "primitives", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_reconnaitre_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "$F(x) = x^3$ est une primitive de quelle fonction $f$ ?",
    format: "qcm",
    choices: ["$f(x) = 3x^2$", "$f(x) = x^2$", "$f(x) = 3x$", "$f(x) = \\dfrac{x^4}{4}$"],
    expected: ["$f(x) = 3x^2$"],
    comparator: "mcq_exact",
    hint: "On dérive $F$.",
    explanation: exp(
      "$F$ est une primitive de $f$ si $F' = f$.",
      "On dérive $F(x) = x^3$.",
      "$F'(x) = 3x^2$, donc $f(x) = 3x^2$.",
      "$F$ est une primitive de $f(x) = 3x^2$."
    ),
    tags: ["terminale-spe", "primitives", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_reconnaitre_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Deux primitives d'une même fonction diffèrent d'une :",
    format: "qcm",
    choices: ["constante", "fonction affine", "puissance", "dérivée"],
    expected: ["constante"],
    comparator: "mcq_exact",
    hint: "La dérivée d'une constante est nulle.",
    explanation: exp(
      "Si $F$ et $G$ sont deux primitives de $f$, alors $(F - G)' = f - f = 0$.",
      "Une fonction de dérivée nulle est constante.",
      "Donc $F - G$ est une constante.",
      "Deux primitives diffèrent d'une constante."
    ),
    tags: ["terminale-spe", "primitives", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_reconnaitre_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "$F(x) = e^x$ est une primitive de quelle fonction $f$ ?",
    format: "qcm",
    choices: ["$f(x) = e^x$", "$f(x) = x\\,e^x$", "$f(x) = \\dfrac{e^x}{2}$", "$f(x) = e^{x} - 1$"],
    expected: ["$f(x) = e^x$"],
    comparator: "mcq_exact",
    hint: "La dérivée de $e^x$ est $e^x$.",
    explanation: exp(
      "$F$ est une primitive de $f$ si $F' = f$.",
      "On dérive $F(x) = e^x$.",
      "$F'(x) = e^x$, donc $f(x) = e^x$.",
      "$F$ est une primitive de $f(x) = e^x$."
    ),
    tags: ["terminale-spe", "primitives", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_reconnaitre_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "$F(x) = \\ln(x)$ est une primitive de quelle fonction $f$ sur $]0\\,;+\\infty[$ ?",
    format: "qcm",
    choices: ["$f(x) = \\dfrac{1}{x}$", "$f(x) = \\ln(x)$", "$f(x) = x\\ln(x)$", "$f(x) = -\\dfrac{1}{x^2}$"],
    expected: ["$f(x) = \\dfrac{1}{x}$"],
    comparator: "mcq_exact",
    hint: "La dérivée de $\\ln(x)$ est $\\dfrac{1}{x}$.",
    explanation: exp(
      "$F$ est une primitive de $f$ si $F' = f$.",
      "On dérive $F(x) = \\ln(x)$.",
      "$F'(x) = \\dfrac{1}{x}$, donc $f(x) = \\dfrac{1}{x}$.",
      "$F$ est une primitive de $f(x) = \\dfrac{1}{x}$."
    ),
    tags: ["terminale-spe", "primitives", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_reconnaitre_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Combien une fonction continue sur un intervalle admet-elle de primitives ?",
    format: "qcm",
    choices: ["Une infinité", "Une seule", "Deux", "Aucune"],
    expected: ["Une infinité"],
    comparator: "mcq_exact",
    hint: "On peut toujours ajouter une constante.",
    explanation: exp(
      "Une fonction continue admet des primitives, définies à une constante près.",
      "À partir d'une primitive $F$, toute fonction $F + k$ ($k$ constante) est aussi une primitive.",
      "Il y a donc une infinité de primitives.",
      "Une fonction continue admet une infinité de primitives."
    ),
    tags: ["terminale-spe", "primitives", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_reconnaitre_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Les fonctions $F(x) = x^2 + 3$ et $G(x) = x^2 - 1$ sont-elles primitives de la même fonction ?",
    format: "qcm",
    choices: [
      "Oui, elles diffèrent d'une constante",
      "Non, elles sont différentes",
      "Oui, car elles sont égales",
      "Non, car l'une a un $+3$",
    ],
    expected: ["Oui, elles diffèrent d'une constante"],
    comparator: "mcq_exact",
    hint: "Dérive les deux fonctions.",
    explanation: exp(
      "Deux primitives d'une même fonction diffèrent d'une constante.",
      "On dérive : $F'(x) = 2x$ et $G'(x) = 2x$.",
      "$F$ et $G$ ont la même dérivée $2x$ : elles diffèrent de la constante $4$.",
      "Oui, ce sont deux primitives de $f(x) = 2x$."
    ),
    tags: ["terminale-spe", "primitives", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_reconnaitre_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi ces fonctions, laquelle est une primitive de $f(x) = 2x$ ?",
    format: "qcm",
    choices: ["$x^2$", "$2$", "$x$", "$2x^2$"],
    expected: ["$x^2$"],
    comparator: "mcq_exact",
    hint: "Cherche $F$ telle que $F'(x) = 2x$.",
    explanation: exp(
      "Une primitive de $f$ a pour dérivée $f$.",
      "On teste : la dérivée de $x^2$ est $2x$.",
      "$(x^2)' = 2x = f(x)$.",
      "Une primitive de $f$ est $x^2$."
    ),
    tags: ["terminale-spe", "primitives", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_reconnaitre_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "$F(x) = \\dfrac{x^3}{3}$ est une primitive de quelle fonction $f$ ?",
    format: "qcm",
    choices: ["$f(x) = x^2$", "$f(x) = x^3$", "$f(x) = 3x^2$", "$f(x) = \\dfrac{x^4}{4}$"],
    expected: ["$f(x) = x^2$"],
    comparator: "mcq_exact",
    hint: "On dérive $\\dfrac{x^3}{3}$.",
    explanation: exp(
      "$F$ est une primitive de $f$ si $F' = f$.",
      "On dérive $F(x) = \\dfrac{x^3}{3}$.",
      "$F'(x) = \\dfrac{3x^2}{3} = x^2$, donc $f(x) = x^2$.",
      "$F$ est une primitive de $f(x) = x^2$."
    ),
    tags: ["terminale-spe", "primitives", "reconnaitre", "qcm"],
  },

  /* =========================================================
     PRIMITIVE_CALCULER — Calculer une primitive simple
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_primitive_calculer_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est une primitive de $f(x) = 2x$ ?",
    format: "qcm",
    choices: ["$x^2$", "$2$", "$x^2 + x$", "$\\dfrac{x^2}{2}$"],
    expected: ["$x^2$"],
    comparator: "mcq_exact",
    hint: "Cherche $F$ telle que $F'(x) = 2x$.",
    explanation: exp(
      "On cherche $F$ dont la dérivée est $f$.",
      "Une primitive de $2x$ s'obtient en « remontant » la dérivation.",
      "$(x^2)' = 2x$, donc une primitive est $x^2$.",
      "Une primitive de $f$ est $F(x) = x^2$."
    ),
    tags: ["terminale-spe", "primitives", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_calculer_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est une primitive de $f(x) = 3x^2$ ?",
    format: "qcm",
    choices: ["$x^3$", "$6x$", "$x^3 + 2$", "$\\dfrac{x^3}{3}$"],
    expected: ["$x^3$"],
    comparator: "mcq_exact",
    hint: "Cherche $F$ telle que $F'(x) = 3x^2$.",
    explanation: exp(
      "On cherche $F$ dont la dérivée est $f$.",
      "On remonte la dérivation de $3x^2$.",
      "$(x^3)' = 3x^2$, donc une primitive est $x^3$.",
      "Une primitive de $f$ est $F(x) = x^3$."
    ),
    tags: ["terminale-spe", "primitives", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_calculer_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est une primitive de $f(x) = x$ ?",
    format: "qcm",
    choices: ["$\\dfrac{x^2}{2}$", "$x^2$", "$1$", "$2x$"],
    expected: ["$\\dfrac{x^2}{2}$"],
    comparator: "mcq_exact",
    hint: "Une primitive de $x^n$ est $\\dfrac{x^{n+1}}{n+1}$.",
    explanation: exp(
      "On applique $\\displaystyle\\int x^n = \\dfrac{x^{n+1}}{n+1}$ avec $n = 1$.",
      "On augmente l'exposant de $1$ et on divise par le nouvel exposant.",
      "Une primitive de $x$ est $\\dfrac{x^{2}}{2}$.",
      "Une primitive de $f$ est $F(x) = \\dfrac{x^2}{2}$."
    ),
    tags: ["terminale-spe", "primitives", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_calculer_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est une primitive de $f(x) = x^2$ ?",
    format: "qcm",
    choices: ["$\\dfrac{x^3}{3}$", "$2x$", "$x^3$", "$\\dfrac{x^3}{2}$"],
    expected: ["$\\dfrac{x^3}{3}$"],
    comparator: "mcq_exact",
    hint: "Une primitive de $x^n$ est $\\dfrac{x^{n+1}}{n+1}$.",
    explanation: exp(
      "On applique $\\displaystyle\\int x^n = \\dfrac{x^{n+1}}{n+1}$ avec $n = 2$.",
      "On augmente l'exposant de $1$ et on divise par le nouvel exposant.",
      "Une primitive de $x^2$ est $\\dfrac{x^{3}}{3}$.",
      "Une primitive de $f$ est $F(x) = \\dfrac{x^3}{3}$."
    ),
    tags: ["terminale-spe", "primitives", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_calculer_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est une primitive de la fonction constante $f(x) = 5$ ?",
    format: "qcm",
    choices: ["$5x$", "$0$", "$5$", "$\\dfrac{5}{x}$"],
    expected: ["$5x$"],
    comparator: "mcq_exact",
    hint: "Cherche $F$ telle que $F'(x) = 5$.",
    explanation: exp(
      "Une primitive d'une constante $k$ est $kx$.",
      "On vérifie en dérivant.",
      "$(5x)' = 5$, donc une primitive est $5x$.",
      "Une primitive de $f$ est $F(x) = 5x$."
    ),
    tags: ["terminale-spe", "primitives", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_calculer_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est une primitive de $f(x) = e^x$ ?",
    format: "qcm",
    choices: ["$e^x$", "$x\\,e^x$", "$\\dfrac{e^x}{2}$", "$e^x + x$"],
    expected: ["$e^x$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle est sa propre primitive (à une constante près).",
    explanation: exp(
      "Une primitive de $e^x$ est $e^x$, car $(e^x)' = e^x$.",
      "On vérifie en dérivant.",
      "$(e^x)' = e^x$, donc une primitive est $e^x$.",
      "Une primitive de $f$ est $F(x) = e^x$."
    ),
    tags: ["terminale-spe", "primitives", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_calculer_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est une primitive de $f(x) = \\dfrac{1}{x}$ sur $]0\\,;+\\infty[$ ?",
    format: "qcm",
    choices: ["$\\ln(x)$", "$-\\dfrac{1}{x^2}$", "$\\dfrac{1}{x^2}$", "$\\dfrac{x^2}{2}$"],
    expected: ["$\\ln(x)$"],
    comparator: "mcq_exact",
    hint: "Quelle fonction a pour dérivée $\\dfrac{1}{x}$ ?",
    explanation: exp(
      "Une primitive de $\\dfrac{1}{x}$ sur $]0\\,;+\\infty[$ est $\\ln(x)$.",
      "On vérifie en dérivant.",
      "$(\\ln x)' = \\dfrac{1}{x}$, donc une primitive est $\\ln(x)$.",
      "Une primitive de $f$ est $F(x) = \\ln(x)$."
    ),
    tags: ["terminale-spe", "primitives", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_primitive_calculer_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est une primitive de $f(x) = e^{2x}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{2}e^{2x}$", "$e^{2x}$", "$2e^{2x}$", "$\\dfrac{1}{2}e^{x}$"],
    expected: ["$\\dfrac{1}{2}e^{2x}$"],
    comparator: "mcq_exact",
    hint: "Une primitive de $e^{ax}$ est $\\dfrac{1}{a}e^{ax}$.",
    explanation: exp(
      "Une primitive de $e^{ax}$ est $\\dfrac{1}{a}e^{ax}$.",
      "On applique avec $a = 2$, puis on vérifie en dérivant.",
      "$\\left(\\dfrac{1}{2}e^{2x}\\right)' = \\dfrac{1}{2} \\times 2e^{2x} = e^{2x}$.",
      "Une primitive de $f$ est $F(x) = \\dfrac{1}{2}e^{2x}$."
    ),
    tags: ["terminale-spe", "primitives", "calculer", "exponentielle", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_primitive_calculer_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Une primitive de $x^n$ est $\\dfrac{x^{n+1}}{n+1}$.",
    tags: ["terminale-spe", "primitives", "calculer", "template"],
    generate: () => {
      const n = randomInt(2, 5);
      const correct = `$\\dfrac{x^{${n + 1}}}{${n + 1}}$`;
      const distracteurs = [
        `$x^{${n + 1}}$`,
        `$\\dfrac{x^{${n}}}{${n}}$`,
        `$${n}x^{${n - 1}}$`,
      ];
      return {
        text: `Quelle est une primitive de $f(x) = x^{${n}}$ ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique $\\displaystyle\\int x^n = \\dfrac{x^{n+1}}{n+1}$.",
          `On augmente l'exposant : $n = ${n}$ devient $${n + 1}$.`,
          `Une primitive de $x^{${n}}$ est $\\dfrac{x^{${n + 1}}}{${n + 1}}$.`,
          `Une primitive de $f$ est $F(x) = \\dfrac{x^{${n + 1}}}{${n + 1}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_primitive_calculer_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "primitive_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Une primitive de $ax$ est $\\dfrac{a}{2}x^2$.",
    tags: ["terminale-spe", "primitives", "calculer", "template"],
    generate: () => {
      const half = randomInt(1, 4);
      const a = 2 * half; // coefficient pair → primitive à coefficient entier
      const correct = `$${half}x^2$`;
      const distracteurs = [
        `$${a}x^2$`,
        `$${half}x$`,
        `$${a}$`,
      ];
      return {
        text: `Quelle est une primitive de $f(x) = ${a}x$ ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une primitive de $ax$ est $\\dfrac{a}{2}x^2$.",
          `On applique avec $a = ${a}$ : $\\dfrac{${a}}{2} = ${half}$.`,
          `$(${half}x^2)' = ${a}x$, donc une primitive est $${half}x^2$.`,
          `Une primitive de $f$ est $F(x) = ${half}x^2$.`
        ),
      };
    },
  },

  /* =========================================================
     INTEGRALE_CALCULER — Calculer une intégrale via une primitive
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_integrale_calculer_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Si $F$ est une primitive de $f$, à quoi est égal $\\displaystyle\\int_a^b f(x)\\,dx$ ?",
    format: "qcm",
    choices: ["$F(b) - F(a)$", "$F(a) - F(b)$", "$F(b) + F(a)$", "$f(b) - f(a)$"],
    expected: ["$F(b) - F(a)$"],
    comparator: "mcq_exact",
    hint: "C'est la formule fondamentale du calcul intégral.",
    explanation: exp(
      "L'intégrale se calcule à l'aide d'une primitive.",
      "On utilise $\\displaystyle\\int_a^b f(x)\\,dx = F(b) - F(a)$.",
      "$\\displaystyle\\int_a^b f(x)\\,dx = F(b) - F(a)$.",
      "La bonne formule est $F(b) - F(a)$."
    ),
    tags: ["terminale-spe", "integrale", "calculer", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_calculer_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $\\displaystyle\\int_a^a f(x)\\,dx$ ?",
    format: "qcm",
    choices: ["$0$", "$f(a)$", "$F(a)$", "$1$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Les deux bornes sont égales.",
    explanation: exp(
      "Une intégrale dont les bornes sont égales est nulle.",
      "On utilise $\\displaystyle\\int_a^a f = F(a) - F(a)$.",
      "$F(a) - F(a) = 0$.",
      "Donc $\\displaystyle\\int_a^a f(x)\\,dx = 0$."
    ),
    tags: ["terminale-spe", "integrale", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_calculer_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_0^1 2x\\,dx$.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Une primitive de $2x$ est $x^2$.",
    explanation: exp(
      "On calcule l'intégrale à l'aide d'une primitive.",
      "Une primitive de $2x$ est $x^2$, donc $\\displaystyle\\int_0^1 2x\\,dx = [x^2]_0^1$.",
      "$[x^2]_0^1 = 1^2 - 0^2 = 1$.",
      "L'intégrale vaut $1$."
    ),
    tags: ["terminale-spe", "integrale", "calculer", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_calculer_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_0^2 2x\\,dx$.",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Une primitive de $2x$ est $x^2$.",
    explanation: exp(
      "On calcule l'intégrale à l'aide d'une primitive.",
      "Une primitive de $2x$ est $x^2$, donc $\\displaystyle\\int_0^2 2x\\,dx = [x^2]_0^2$.",
      "$[x^2]_0^2 = 2^2 - 0^2 = 4$.",
      "L'intégrale vaut $4$."
    ),
    tags: ["terminale-spe", "integrale", "calculer", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_calculer_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_1^2 3x^2\\,dx$.",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Une primitive de $3x^2$ est $x^3$.",
    explanation: exp(
      "On calcule l'intégrale à l'aide d'une primitive.",
      "Une primitive de $3x^2$ est $x^3$, donc $\\displaystyle\\int_1^2 3x^2\\,dx = [x^3]_1^2$.",
      "$[x^3]_1^2 = 2^3 - 1^3 = 8 - 1 = 7$.",
      "L'intégrale vaut $7$."
    ),
    tags: ["terminale-spe", "integrale", "calculer", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_calculer_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_0^2 x\\,dx$.",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Une primitive de $x$ est $\\dfrac{x^2}{2}$.",
    explanation: exp(
      "On calcule l'intégrale à l'aide d'une primitive.",
      "Une primitive de $x$ est $\\dfrac{x^2}{2}$, donc $\\displaystyle\\int_0^2 x\\,dx = \\left[\\dfrac{x^2}{2}\\right]_0^2$.",
      "$\\left[\\dfrac{x^2}{2}\\right]_0^2 = \\dfrac{4}{2} - 0 = 2$.",
      "L'intégrale vaut $2$."
    ),
    tags: ["terminale-spe", "integrale", "calculer", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_calculer_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_1^3 2x\\,dx$.",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Une primitive de $2x$ est $x^2$.",
    explanation: exp(
      "On calcule l'intégrale à l'aide d'une primitive.",
      "Une primitive de $2x$ est $x^2$, donc $\\displaystyle\\int_1^3 2x\\,dx = [x^2]_1^3$.",
      "$[x^2]_1^3 = 3^2 - 1^2 = 9 - 1 = 8$.",
      "L'intégrale vaut $8$."
    ),
    tags: ["terminale-spe", "integrale", "calculer", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_calculer_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_0^1 e^x\\,dx$.",
    format: "qcm",
    choices: ["$e - 1$", "$e$", "$1$", "$e + 1$"],
    expected: ["$e - 1$"],
    comparator: "mcq_exact",
    hint: "Une primitive de $e^x$ est $e^x$ ; pense à $e^0 = 1$.",
    explanation: exp(
      "On calcule l'intégrale à l'aide d'une primitive.",
      "Une primitive de $e^x$ est $e^x$, donc $\\displaystyle\\int_0^1 e^x\\,dx = [e^x]_0^1$.",
      "$[e^x]_0^1 = e^1 - e^0 = e - 1$.",
      "L'intégrale vaut $e - 1$."
    ),
    tags: ["terminale-spe", "integrale", "calculer", "exponentielle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_calculer_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_0^1 3x^2\\,dx$.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Une primitive de $3x^2$ est $x^3$.",
    explanation: exp(
      "On calcule l'intégrale à l'aide d'une primitive.",
      "Une primitive de $3x^2$ est $x^3$, donc $\\displaystyle\\int_0^1 3x^2\\,dx = [x^3]_0^1$.",
      "$[x^3]_0^1 = 1^3 - 0^3 = 1$.",
      "L'intégrale vaut $1$."
    ),
    tags: ["terminale-spe", "integrale", "calculer", "short"],
  },

  {
    kind: "template",
    id: "terminale_spe_integrale_calculer_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Une primitive de $2x$ est $x^2$, puis applique $[x^2]_0^b$.",
    tags: ["terminale-spe", "integrale", "calculer", "template"],
    generate: () => {
      const b = randomInt(2, 6);
      return {
        text: `Calcule $\\displaystyle\\int_0^{${b}} 2x\\,dx$.`,
        format: "short",
        expected: [String(b * b)],
        comparator: "number_equal",
        explanation: exp(
          "On calcule l'intégrale à l'aide d'une primitive.",
          `Une primitive de $2x$ est $x^2$, donc $\\displaystyle\\int_0^{${b}} 2x\\,dx = [x^2]_0^{${b}}$.`,
          `$[x^2]_0^{${b}} = ${b}^2 - 0 = ${b * b}$.`,
          `L'intégrale vaut $${b * b}$.`
        ),
      };
    },
  },

  /* =========================================================
     INTEGRALE_AIRE — Interpréter une intégrale comme une aire
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_integrale_aire_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 2,
    theme: "neutral",
    text: "Si $f \\ge 0$ sur $[a\\,;b]$, que représente $\\displaystyle\\int_a^b f(x)\\,dx$ ?",
    format: "qcm",
    choices: [
      "L'aire sous la courbe entre $a$ et $b$",
      "La pente de la courbe",
      "La longueur de la courbe",
      "La valeur maximale de $f$",
    ],
    expected: ["L'aire sous la courbe entre $a$ et $b$"],
    comparator: "mcq_exact",
    hint: "L'intégrale d'une fonction positive mesure une aire.",
    explanation: exp(
      "Pour une fonction positive, l'intégrale a une interprétation géométrique.",
      "On relie l'intégrale à l'aire du domaine sous la courbe.",
      "$\\displaystyle\\int_a^b f$ est l'aire entre la courbe, l'axe des abscisses et les droites $x=a$ et $x=b$.",
      "Elle représente l'aire sous la courbe entre $a$ et $b$."
    ),
    tags: ["terminale-spe", "integrale", "aire", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_aire_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans quelle unité s'exprime une aire calculée par une intégrale ?",
    format: "qcm",
    choices: [
      "En unités d'aire",
      "En unités de longueur",
      "Sans unité",
      "En degrés",
    ],
    expected: ["En unités d'aire"],
    comparator: "mcq_exact",
    hint: "Une aire se mesure en « carrés ».",
    explanation: exp(
      "L'intégrale d'une fonction positive est une aire.",
      "On exprime cette aire dans l'unité d'aire du repère.",
      "Une aire s'exprime en unités d'aire (u.a.).",
      "La réponse est : en unités d'aire."
    ),
    tags: ["terminale-spe", "integrale", "aire", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_aire_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'aire sous la courbe de $f(x) = 3$ entre $x = 0$ et $x = 2$ ? (en unités d'aire)",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "C'est l'aire d'un rectangle de hauteur $3$ et de largeur $2$.",
    explanation: exp(
      "Pour une fonction constante, l'aire est celle d'un rectangle.",
      "On calcule $\\displaystyle\\int_0^2 3\\,dx = [3x]_0^2$.",
      "$[3x]_0^2 = 6 - 0 = 6$ (rectangle $3 \\times 2$).",
      "L'aire vaut $6$ unités d'aire."
    ),
    tags: ["terminale-spe", "integrale", "aire", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_aire_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'aire sous la courbe de $f(x) = 2x$ entre $x = 0$ et $x = 2$ ? (en unités d'aire)",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Calcule $\\displaystyle\\int_0^2 2x\\,dx$.",
    explanation: exp(
      "L'aire sous une courbe positive est donnée par l'intégrale.",
      "On calcule $\\displaystyle\\int_0^2 2x\\,dx = [x^2]_0^2$.",
      "$[x^2]_0^2 = 4 - 0 = 4$.",
      "L'aire vaut $4$ unités d'aire."
    ),
    tags: ["terminale-spe", "integrale", "aire", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_aire_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 4,
    theme: "neutral",
    text: "Si $f \\le 0$ sur $[a\\,;b]$, comment obtient-on l'aire entre la courbe et l'axe des abscisses ?",
    format: "qcm",
    choices: [
      "$-\\displaystyle\\int_a^b f(x)\\,dx$",
      "$\\displaystyle\\int_a^b f(x)\\,dx$",
      "$\\displaystyle\\int_a^b f(x)^2\\,dx$",
      "$f(b) - f(a)$",
    ],
    expected: ["$-\\displaystyle\\int_a^b f(x)\\,dx$"],
    comparator: "mcq_exact",
    hint: "Si $f \\le 0$, l'intégrale est négative ; une aire est positive.",
    explanation: exp(
      "Une aire est toujours positive, mais l'intégrale d'une fonction négative est négative.",
      "On prend l'opposé de l'intégrale pour obtenir une aire positive.",
      "Si $f \\le 0$, l'aire vaut $-\\displaystyle\\int_a^b f(x)\\,dx$.",
      "La bonne expression est $-\\displaystyle\\int_a^b f(x)\\,dx$."
    ),
    tags: ["terminale-spe", "integrale", "aire", "signe", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_aire_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'aire sous la courbe de $f(x) = 2$ entre $x = 0$ et $x = 4$ ? (en unités d'aire)",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Rectangle de hauteur $2$ et de largeur $4$.",
    explanation: exp(
      "Pour une fonction constante, l'aire est celle d'un rectangle.",
      "On calcule $\\displaystyle\\int_0^4 2\\,dx = [2x]_0^4$.",
      "$[2x]_0^4 = 8 - 0 = 8$.",
      "L'aire vaut $8$ unités d'aire."
    ),
    tags: ["terminale-spe", "integrale", "aire", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_aire_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 4,
    theme: "neutral",
    text: "Pour deux fonctions avec $f \\ge g$ sur $[a\\,;b]$, l'aire entre les deux courbes vaut :",
    format: "qcm",
    choices: [
      "$\\displaystyle\\int_a^b \\big(f(x) - g(x)\\big)\\,dx$",
      "$\\displaystyle\\int_a^b \\big(g(x) - f(x)\\big)\\,dx$",
      "$\\displaystyle\\int_a^b f(x)g(x)\\,dx$",
      "$\\displaystyle\\int_a^b f(x)\\,dx$",
    ],
    expected: ["$\\displaystyle\\int_a^b \\big(f(x) - g(x)\\big)\\,dx$"],
    comparator: "mcq_exact",
    hint: "On intègre la différence « courbe du haut moins courbe du bas ».",
    explanation: exp(
      "L'aire entre deux courbes s'obtient en intégrant leur différence.",
      "On intègre $f - g$ (la fonction du dessus moins celle du dessous).",
      "L'aire vaut $\\displaystyle\\int_a^b (f(x) - g(x))\\,dx$.",
      "La bonne expression est $\\displaystyle\\int_a^b (f(x) - g(x))\\,dx$."
    ),
    tags: ["terminale-spe", "integrale", "aire", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_aire_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'aire sous la courbe de $f(x) = 2$ entre $x = 1$ et $x = 4$ ? (en unités d'aire)",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Rectangle de hauteur $2$ et de largeur $4 - 1 = 3$.",
    explanation: exp(
      "Pour une fonction constante, l'aire est celle d'un rectangle.",
      "On calcule $\\displaystyle\\int_1^4 2\\,dx = [2x]_1^4$.",
      "$[2x]_1^4 = 8 - 2 = 6$.",
      "L'aire vaut $6$ unités d'aire."
    ),
    tags: ["terminale-spe", "integrale", "aire", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_aire_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 4,
    theme: "neutral",
    text: "L'aire sous la courbe de $f(x) = x$ entre $0$ et $4$ correspond à un triangle. Quelle est cette aire ? (en unités d'aire)",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Triangle de base $4$ et de hauteur $4$ : $\\dfrac{1}{2} \\times 4 \\times 4$.",
    explanation: exp(
      "L'aire sous $f(x) = x$ est celle d'un triangle rectangle.",
      "On calcule $\\displaystyle\\int_0^4 x\\,dx = \\left[\\dfrac{x^2}{2}\\right]_0^4$, ou l'aire du triangle.",
      "$\\dfrac{4^2}{2} = \\dfrac{16}{2} = 8$ (triangle de base $4$, hauteur $4$).",
      "L'aire vaut $8$ unités d'aire."
    ),
    tags: ["terminale-spe", "integrale", "aire", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_aire_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_aire",
    difficulty: 3,
    theme: "neutral",
    text: "Une intégrale $\\displaystyle\\int_a^b f(x)\\,dx$ peut-elle être négative ?",
    format: "qcm",
    choices: [
      "Oui, si $f$ est négative sur $[a\\,;b]$",
      "Non, jamais",
      "Oui, mais seulement si $a > b$ est interdit",
      "Non, car une aire est positive",
    ],
    expected: ["Oui, si $f$ est négative sur $[a\\,;b]$"],
    comparator: "mcq_exact",
    hint: "L'intégrale tient compte du signe de $f$, contrairement à une aire.",
    explanation: exp(
      "L'intégrale tient compte du signe de la fonction.",
      "Si $f$ est négative sur l'intervalle, sa primitive donne une valeur négative.",
      "Donc l'intégrale peut être négative, même si une aire reste positive.",
      "Oui, l'intégrale est négative si $f$ est négative sur $[a\\,;b]$."
    ),
    tags: ["terminale-spe", "integrale", "aire", "signe", "qcm"],
  },

  /* =========================================================
     INTEGRALE_VALEUR_MOYENNE — Valeur moyenne d'une fonction
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_integrale_moyenne_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de la valeur moyenne de $f$ sur $[a\\,;b]$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,dx$",
      "$\\displaystyle\\int_a^b f(x)\\,dx$",
      "$\\dfrac{f(a) + f(b)}{2}$",
      "$(b - a)\\displaystyle\\int_a^b f(x)\\,dx$",
    ],
    expected: ["$\\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,dx$"],
    comparator: "mcq_exact",
    hint: "On divise l'intégrale par la longueur de l'intervalle.",
    explanation: exp(
      "La valeur moyenne « lisse » la fonction sur l'intervalle.",
      "On divise l'intégrale par la longueur $b - a$.",
      "$m = \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,dx$.",
      "La bonne formule est $\\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,dx$."
    ),
    tags: ["terminale-spe", "integrale", "moyenne", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_moyenne_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la valeur moyenne de la fonction constante $f(x) = 5$ sur $[0\\,;3]$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "La moyenne d'une constante est cette constante.",
    explanation: exp(
      "La valeur moyenne d'une fonction constante est cette constante.",
      "On applique la formule : $\\dfrac{1}{3}\\displaystyle\\int_0^3 5\\,dx = \\dfrac{1}{3} \\times 15$.",
      "$\\dfrac{15}{3} = 5$.",
      "La valeur moyenne vaut $5$."
    ),
    tags: ["terminale-spe", "integrale", "moyenne", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_moyenne_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Comment interpréter géométriquement la valeur moyenne $m$ de $f$ sur $[a\\,;b]$ (avec $f \\ge 0$) ?",
    format: "qcm",
    choices: [
      "La hauteur du rectangle de même aire que sous la courbe",
      "La pente de la courbe",
      "Le maximum de $f$",
      "La longueur de l'intervalle",
    ],
    expected: ["La hauteur du rectangle de même aire que sous la courbe"],
    comparator: "mcq_exact",
    hint: "$m \\times (b - a)$ égale l'aire sous la courbe.",
    explanation: exp(
      "La valeur moyenne correspond à une « hauteur moyenne ».",
      "On a $m \\times (b - a) = \\displaystyle\\int_a^b f$, donc $m$ est la hauteur d'un rectangle de même aire.",
      "Le rectangle de base $[a\\,;b]$ et de hauteur $m$ a la même aire que sous la courbe.",
      "$m$ est la hauteur du rectangle de même aire que sous la courbe."
    ),
    tags: ["terminale-spe", "integrale", "moyenne", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_moyenne_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la valeur moyenne de $f(x) = 2x$ sur $[0\\,;2]$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Calcule $\\dfrac{1}{2}\\displaystyle\\int_0^2 2x\\,dx$.",
    explanation: exp(
      "On applique la formule de la valeur moyenne.",
      "$\\displaystyle\\int_0^2 2x\\,dx = [x^2]_0^2 = 4$, puis on divise par $2 - 0 = 2$.",
      "$m = \\dfrac{4}{2} = 2$.",
      "La valeur moyenne vaut $2$."
    ),
    tags: ["terminale-spe", "integrale", "moyenne", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_moyenne_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la valeur moyenne de $f(x) = 2x$ sur $[0\\,;4]$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Calcule $\\dfrac{1}{4}\\displaystyle\\int_0^4 2x\\,dx$.",
    explanation: exp(
      "On applique la formule de la valeur moyenne.",
      "$\\displaystyle\\int_0^4 2x\\,dx = [x^2]_0^4 = 16$, puis on divise par $4 - 0 = 4$.",
      "$m = \\dfrac{16}{4} = 4$.",
      "La valeur moyenne vaut $4$."
    ),
    tags: ["terminale-spe", "integrale", "moyenne", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_moyenne_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la valeur moyenne de la fonction constante $f(x) = 3$ sur $[1\\,;5]$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "La moyenne d'une constante est cette constante.",
    explanation: exp(
      "La valeur moyenne d'une fonction constante est cette constante.",
      "On applique la formule : $\\dfrac{1}{4}\\displaystyle\\int_1^5 3\\,dx = \\dfrac{1}{4} \\times 12$.",
      "$\\dfrac{12}{4} = 3$.",
      "La valeur moyenne vaut $3$."
    ),
    tags: ["terminale-spe", "integrale", "moyenne", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_moyenne_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la valeur moyenne de $f(x) = 6x$ sur $[0\\,;2]$ ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Calcule $\\dfrac{1}{2}\\displaystyle\\int_0^2 6x\\,dx$.",
    explanation: exp(
      "On applique la formule de la valeur moyenne.",
      "$\\displaystyle\\int_0^2 6x\\,dx = [3x^2]_0^2 = 12$, puis on divise par $2 - 0 = 2$.",
      "$m = \\dfrac{12}{2} = 6$.",
      "La valeur moyenne vaut $6$."
    ),
    tags: ["terminale-spe", "integrale", "moyenne", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_moyenne_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la valeur moyenne de $f(x) = x$ sur $[0\\,;4]$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Calcule $\\dfrac{1}{4}\\displaystyle\\int_0^4 x\\,dx$.",
    explanation: exp(
      "On applique la formule de la valeur moyenne.",
      "$\\displaystyle\\int_0^4 x\\,dx = \\left[\\dfrac{x^2}{2}\\right]_0^4 = 8$, puis on divise par $4$.",
      "$m = \\dfrac{8}{4} = 2$.",
      "La valeur moyenne vaut $2$."
    ),
    tags: ["terminale-spe", "integrale", "moyenne", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_moyenne_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 2,
    theme: "neutral",
    text: "La valeur moyenne d'une fonction constante $f(x) = k$ sur un intervalle vaut :",
    format: "qcm",
    choices: ["$k$", "$0$", "$k(b - a)$", "$\\dfrac{k}{b - a}$"],
    expected: ["$k$"],
    comparator: "mcq_exact",
    hint: "Une fonction constante ne varie pas : sa moyenne est sa valeur.",
    explanation: exp(
      "La valeur moyenne « lisse » la fonction ; pour une constante, rien ne change.",
      "On applique la formule : $\\dfrac{1}{b-a}\\displaystyle\\int_a^b k\\,dx = \\dfrac{k(b-a)}{b-a}$.",
      "$\\dfrac{k(b-a)}{b-a} = k$.",
      "La valeur moyenne vaut $k$."
    ),
    tags: ["terminale-spe", "integrale", "moyenne", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_integrale_moyenne_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_valeur_moyenne",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\displaystyle\\int_0^b 2x\\,dx = b^2$, puis on divise par $b$.",
    tags: ["terminale-spe", "integrale", "moyenne", "template"],
    generate: () => {
      const b = randomInt(2, 6);
      return {
        text: `Quelle est la valeur moyenne de $f(x) = 2x$ sur $[0\\,;${b}]$ ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation: exp(
          "On applique la formule de la valeur moyenne.",
          `$\\displaystyle\\int_0^{${b}} 2x\\,dx = [x^2]_0^{${b}} = ${b * b}$, puis on divise par $${b}$.`,
          `$m = \\dfrac{${b * b}}{${b}} = ${b}$.`,
          `La valeur moyenne vaut $${b}$.`
        ),
      };
    },
  },

  /* =========================================================
     INTEGRALE_DEFI — Type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_integrale_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_0^1 (2x + 1)\\,dx$.",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Une primitive est $x^2 + x$.",
    explanation: exp(
      "On calcule l'intégrale d'une somme à l'aide d'une primitive.",
      "Une primitive de $2x + 1$ est $x^2 + x$, donc $\\displaystyle\\int_0^1 (2x+1)\\,dx = [x^2 + x]_0^1$.",
      "$[x^2 + x]_0^1 = (1 + 1) - 0 = 2$.",
      "L'intégrale vaut $2$."
    ),
    tags: ["terminale-spe", "integrale", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_1^2 \\dfrac{1}{x}\\,dx$.",
    format: "qcm",
    choices: ["$\\ln(2)$", "$1$", "$\\dfrac{1}{2}$", "$\\ln\\!\\left(\\dfrac{1}{2}\\right)$"],
    expected: ["$\\ln(2)$"],
    comparator: "mcq_exact",
    hint: "Une primitive de $\\dfrac{1}{x}$ est $\\ln(x)$ ; pense à $\\ln(1) = 0$.",
    explanation: exp(
      "On calcule l'intégrale à l'aide d'une primitive.",
      "Une primitive de $\\dfrac{1}{x}$ est $\\ln(x)$, donc $\\displaystyle\\int_1^2 \\dfrac{1}{x}\\,dx = [\\ln x]_1^2$.",
      "$[\\ln x]_1^2 = \\ln(2) - \\ln(1) = \\ln(2)$.",
      "L'intégrale vaut $\\ln(2)$."
    ),
    tags: ["terminale-spe", "integrale", "type_bac", "logarithme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est une primitive de $f(x) = e^{2x}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{2}e^{2x}$", "$e^{2x}$", "$2e^{2x}$", "$e^{2x} + x$"],
    expected: ["$\\dfrac{1}{2}e^{2x}$"],
    comparator: "mcq_exact",
    hint: "Une primitive de $e^{ax}$ est $\\dfrac{1}{a}e^{ax}$.",
    explanation: exp(
      "Une primitive de $e^{ax}$ est $\\dfrac{1}{a}e^{ax}$.",
      "On applique avec $a = 2$.",
      "$\\left(\\dfrac{1}{2}e^{2x}\\right)' = e^{2x}$.",
      "Une primitive est $\\dfrac{1}{2}e^{2x}$."
    ),
    tags: ["terminale-spe", "integrale", "type_bac", "exponentielle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_0^2 3x^2\\,dx$.",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Une primitive de $3x^2$ est $x^3$.",
    explanation: exp(
      "On calcule l'intégrale à l'aide d'une primitive.",
      "Une primitive de $3x^2$ est $x^3$, donc $\\displaystyle\\int_0^2 3x^2\\,dx = [x^3]_0^2$.",
      "$[x^3]_0^2 = 8 - 0 = 8$.",
      "L'intégrale vaut $8$."
    ),
    tags: ["terminale-spe", "integrale", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la valeur moyenne de $f(x) = x^2$ sur $[0\\,;3]$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$\\displaystyle\\int_0^3 x^2\\,dx = 9$, puis divise par $3$.",
    explanation: exp(
      "On applique la formule de la valeur moyenne.",
      "$\\displaystyle\\int_0^3 x^2\\,dx = \\left[\\dfrac{x^3}{3}\\right]_0^3 = 9$, puis on divise par $3$.",
      "$m = \\dfrac{9}{3} = 3$.",
      "La valeur moyenne vaut $3$."
    ),
    tags: ["terminale-spe", "integrale", "type_bac", "moyenne", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est l'aire (en u.a.) sous la courbe de $f(x) = e^x$ entre $x = 0$ et $x = 1$ ?",
    format: "qcm",
    choices: ["$e - 1$", "$e$", "$1$", "$e + 1$"],
    expected: ["$e - 1$"],
    comparator: "mcq_exact",
    hint: "$f \\ge 0$, donc l'aire vaut $\\displaystyle\\int_0^1 e^x\\,dx$.",
    explanation: exp(
      "Comme $e^x > 0$, l'aire est égale à l'intégrale.",
      "On calcule $\\displaystyle\\int_0^1 e^x\\,dx = [e^x]_0^1$.",
      "$[e^x]_0^1 = e - 1$.",
      "L'aire vaut $e - 1$ unités d'aire."
    ),
    tags: ["terminale-spe", "integrale", "type_bac", "aire", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_0^1 (e^x + 1)\\,dx$.",
    format: "qcm",
    choices: ["$e$", "$e - 1$", "$e + 1$", "$1$"],
    expected: ["$e$"],
    comparator: "mcq_exact",
    hint: "Une primitive est $e^x + x$.",
    explanation: exp(
      "On calcule l'intégrale d'une somme à l'aide d'une primitive.",
      "Une primitive de $e^x + 1$ est $e^x + x$, donc $\\displaystyle\\int_0^1 (e^x+1)\\,dx = [e^x + x]_0^1$.",
      "$[e^x + x]_0^1 = (e + 1) - (1 + 0) = e$.",
      "L'intégrale vaut $e$."
    ),
    tags: ["terminale-spe", "integrale", "type_bac", "exponentielle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_{-1}^{1} 2x\\,dx$.",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Une primitive de $2x$ est $x^2$ ; compare $1^2$ et $(-1)^2$.",
    explanation: exp(
      "On calcule l'intégrale à l'aide d'une primitive.",
      "Une primitive de $2x$ est $x^2$, donc $\\displaystyle\\int_{-1}^{1} 2x\\,dx = [x^2]_{-1}^{1}$.",
      "$[x^2]_{-1}^{1} = 1^2 - (-1)^2 = 1 - 1 = 0$.",
      "L'intégrale vaut $0$."
    ),
    tags: ["terminale-spe", "integrale", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_0^3 (2x - 1)\\,dx$.",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Une primitive est $x^2 - x$.",
    explanation: exp(
      "On calcule l'intégrale d'une différence à l'aide d'une primitive.",
      "Une primitive de $2x - 1$ est $x^2 - x$, donc $\\displaystyle\\int_0^3 (2x-1)\\,dx = [x^2 - x]_0^3$.",
      "$[x^2 - x]_0^3 = (9 - 3) - 0 = 6$.",
      "L'intégrale vaut $6$."
    ),
    tags: ["terminale-spe", "integrale", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_integrale_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "primitive_integrale",
    microId: "integrale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule $\\displaystyle\\int_1^2 (x^2)\\,dx$ : quelle valeur littérale obtient-on ?",
    format: "qcm",
    choices: ["$\\dfrac{7}{3}$", "$\\dfrac{8}{3}$", "$7$", "$\\dfrac{3}{7}$"],
    expected: ["$\\dfrac{7}{3}$"],
    comparator: "mcq_exact",
    hint: "Une primitive de $x^2$ est $\\dfrac{x^3}{3}$ ; calcule $\\dfrac{8}{3} - \\dfrac{1}{3}$.",
    explanation: exp(
      "On calcule l'intégrale à l'aide d'une primitive.",
      "Une primitive de $x^2$ est $\\dfrac{x^3}{3}$, donc $\\displaystyle\\int_1^2 x^2\\,dx = \\left[\\dfrac{x^3}{3}\\right]_1^2$.",
      "$\\dfrac{2^3}{3} - \\dfrac{1^3}{3} = \\dfrac{8}{3} - \\dfrac{1}{3} = \\dfrac{7}{3}$.",
      "L'intégrale vaut $\\dfrac{7}{3}$."
    ),
    tags: ["terminale-spe", "integrale", "type_bac", "qcm"],
  },
];
