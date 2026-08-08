// lib/tutor-v4/questionBank/seconde/maths/expressions-litterales.bank.ts
//
// Chapitre : Expressions litterales (notion expressions_litterales_2de)
// microSkills (>= 10 items chacun, difficultes 1->5, templates pour la variete) :
//   expr_modeliser          — Modeliser une situation par une expression
//   expr_exprimer_variable  — Exprimer une variable en fonction des autres (formules)
//   expr_reduire_substituer — Reduire une expression et substituer une valeur
//
// PERIMETRE BO (exprimer une variable : U=RI, d=vt, V=abc, V=pi r^2 h, ax+by=c).
// Conventions : LaTeX, regle QCM.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const expressionsLitteralesBank: TutorBankItemV4[] = [
  /* ===================== EXPR_MODELISER ===================== */

  {
    kind: "fixed",
    id: "seconde_expr_mod_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_modeliser",
    difficulty: 1,
    theme: "neutral",
    text: "Un carré a pour côté $x$. Quelle expression donne son périmètre ?",
    format: "qcm",
    choices: ["$4x$", "$x^2$", "$2x$", "$x + 4$"],
    expected: ["$4x$"],
    comparator: "mcq_exact",
    hint: "Le périmètre d'un carré est $4 \\times$ côté.",
    explanation: exp(
      "Le périmètre d'un carré est la somme de ses quatre côtés égaux.",
      "On multiplie le côté par $4$.",
      "$4 \\times x = 4x$.",
      "Le périmètre est $4x$."
    ),
    tags: ["seconde", "maths", "expressions", "modeliser", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_mod_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_modeliser",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle a pour longueur $x$ et pour largeur $5$. Quelle expression donne son aire ?",
    format: "qcm",
    choices: ["$5x$", "$x + 5$", "$2x + 10$", "$x^2$"],
    expected: ["$5x$"],
    comparator: "mcq_exact",
    hint: "L'aire d'un rectangle est longueur $\\times$ largeur.",
    explanation: exp(
      "L'aire d'un rectangle est le produit de la longueur par la largeur.",
      "On multiplie $x$ par $5$.",
      "$x \\times 5 = 5x$.",
      "L'aire est $5x$."
    ),
    tags: ["seconde", "maths", "expressions", "modeliser", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_mod_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_modeliser",
    difficulty: 2,
    theme: "neutral",
    text: "Comment s'écrit « le double de $x$ » ?",
    format: "qcm",
    choices: ["$2x$", "$x + 2$", "$x^2$", "$\\dfrac{x}{2}$"],
    expected: ["$2x$"],
    comparator: "mcq_exact",
    hint: "Doubler, c'est multiplier par $2$.",
    explanation: exp(
      "« Le double » signifie multiplier par $2$.",
      "On multiplie $x$ par $2$.",
      "$2 \\times x = 2x$.",
      "« Le double de $x$ » s'écrit $2x$."
    ),
    tags: ["seconde", "maths", "expressions", "modeliser", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_mod_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_modeliser",
    difficulty: 3,
    theme: "neutral",
    text: "Comment s'écrit « le triple de $x$ augmenté de $4$ » ?",
    format: "qcm",
    choices: ["$3x + 4$", "$3(x + 4)$", "$x + 3 + 4$", "$3x \\times 4$"],
    expected: ["$3x + 4$"],
    comparator: "mcq_exact",
    hint: "Triple de $x$ = $3x$, puis on ajoute $4$.",
    explanation: exp(
      "On traduit étape par étape.",
      "« Le triple de $x$ » = $3x$ ; « augmenté de $4$ » = $+ 4$.",
      "$3x + 4$.",
      "L'expression est $3x + 4$."
    ),
    tags: ["seconde", "maths", "expressions", "modeliser", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_mod_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_modeliser",
    difficulty: 3,
    theme: "neutral",
    text: "Comment s'écrit « le double de la somme de $x$ et $3$ » ?",
    format: "qcm",
    choices: ["$2(x + 3)$", "$2x + 3$", "$2x + 6x$", "$x + 6$"],
    expected: ["$2(x + 3)$"],
    comparator: "mcq_exact",
    hint: "On forme d'abord la somme $(x+3)$, puis on double.",
    explanation: exp(
      "« La somme de $x$ et $3$ » se met entre parenthèses : $(x+3)$.",
      "« Le double » multiplie le tout par $2$.",
      "$2 \\times (x + 3) = 2(x + 3)$.",
      "L'expression est $2(x + 3)$."
    ),
    tags: ["seconde", "maths", "expressions", "modeliser", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_mod_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_modeliser",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle a pour longueur $x$ et pour largeur $3$. Quelle expression donne son périmètre ?",
    format: "qcm",
    choices: ["$2x + 6$", "$3x$", "$x + 3$", "$2x + 3$"],
    expected: ["$2x + 6$"],
    comparator: "mcq_exact",
    hint: "Périmètre $= 2 \\times (\\text{longueur} + \\text{largeur})$.",
    explanation: exp(
      "Le périmètre d'un rectangle est $2(L + l)$.",
      "$2(x + 3) = 2x + 6$.",
      "On développe pour obtenir la forme réduite.",
      "Le périmètre est $2x + 6$."
    ),
    tags: ["seconde", "maths", "expressions", "modeliser", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_mod_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_modeliser",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle expression représente la somme de trois entiers consécutifs dont le premier est $n$ ?",
    format: "qcm",
    choices: ["$3n + 3$", "$3n$", "$n + 3$", "$3n + 6$"],
    expected: ["$3n + 3$"],
    comparator: "mcq_exact",
    hint: "Les trois entiers sont $n$, $n+1$ et $n+2$.",
    explanation: exp(
      "Trois entiers consécutifs s'écrivent $n$, $n+1$, $n+2$.",
      "On additionne : $n + (n+1) + (n+2)$.",
      "$= 3n + 3$.",
      "La somme est $3n + 3$."
    ),
    tags: ["seconde", "maths", "expressions", "modeliser", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_mod_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_modeliser",
    difficulty: 4,
    theme: "neutral",
    text: "On choisit un nombre $x$, on le multiplie par $2$ puis on ajoute $5$. Quelle expression obtient-on ?",
    format: "qcm",
    choices: ["$2x + 5$", "$2(x + 5)$", "$x^2 + 5$", "$5x + 2$"],
    expected: ["$2x + 5$"],
    comparator: "mcq_exact",
    hint: "On suit l'ordre : $\\times 2$ puis $+ 5$.",
    explanation: exp(
      "On traduit chaque opération dans l'ordre.",
      "« Multiplié par $2$ » → $2x$ ; « ajoute $5$ » → $+ 5$.",
      "$2x + 5$.",
      "L'expression est $2x + 5$."
    ),
    tags: ["seconde", "maths", "expressions", "modeliser", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_expr_mod_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_modeliser",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie d'abord, puis on ajoute.",
    tags: ["seconde", "maths", "expressions", "modeliser", "template"],
    generate: () => {
      const k = randomInt(2, 6);
      // Le coefficient et la constante doivent différer : sinon « on a
      // interverti les deux nombres » s'écrit comme la bonne réponse.
      const b = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((v) => v !== k))[0];
      const correct = `$${k}x + ${b}$`;
      const choices = makeChoices(correct, [
        `$${k}(x + ${b})$`,
        `$${b}x + ${k}$`,
        `$x + ${k + b}$`,
      ]);
      return {
        text: `Comment s'écrit « le produit de ${k} par $x$, augmenté de ${b} » ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On traduit chaque opération dans l'ordre.",
          `« Le produit de ${k} par $x$ » → $${k}x$ ; « augmenté de ${b} » → $+ ${b}$.`,
          `$${k}x + ${b}$.`,
          `L'expression est $${k}x + ${b}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_expr_mod_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_modeliser",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire d'un rectangle = longueur × largeur.",
    tags: ["seconde", "maths", "expressions", "modeliser", "template"],
    generate: () => {
      const l = randomInt(2, 9);
      const correct = `$${l}x$`;
      const choices = [correct, `$x + ${l}$`, `$${2 * l}x$`, `$x^2$`];
      return {
        text: `Un rectangle a pour longueur $x$ et pour largeur ${l}. Quelle expression donne son aire ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "L'aire d'un rectangle est le produit longueur × largeur.",
          `On multiplie $x$ par ${l}.`,
          `$x \\times ${l} = ${l}x$.`,
          `L'aire est $${l}x$.`
        ),
      };
    },
  },

  /* ===================== EXPR_EXPRIMER_VARIABLE ===================== */

  {
    kind: "fixed",
    id: "seconde_expr_var_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_exprimer_variable",
    difficulty: 2,
    theme: "neutral",
    text: "Dans la formule $U = RI$, exprime $I$ en fonction de $U$ et $R$.",
    format: "qcm",
    choices: ["$I = \\dfrac{U}{R}$", "$I = U R$", "$I = \\dfrac{R}{U}$", "$I = U - R$"],
    expected: ["$I = \\dfrac{U}{R}$"],
    comparator: "mcq_exact",
    hint: "On divise les deux membres par $R$.",
    explanation: exp(
      "Pour isoler $I$, on divise par le facteur qui le multiplie.",
      "$U = RI$, on divise les deux membres par $R$.",
      "$\\dfrac{U}{R} = I$.",
      "$I = \\dfrac{U}{R}$."
    ),
    tags: ["seconde", "maths", "expressions", "exprimer_variable", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_var_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_exprimer_variable",
    difficulty: 2,
    theme: "neutral",
    text: "Dans la formule $d = vt$, exprime $t$ en fonction de $d$ et $v$.",
    format: "qcm",
    choices: ["$t = \\dfrac{d}{v}$", "$t = dv$", "$t = \\dfrac{v}{d}$", "$t = d - v$"],
    expected: ["$t = \\dfrac{d}{v}$"],
    comparator: "mcq_exact",
    hint: "On divise par $v$.",
    explanation: exp(
      "Pour isoler $t$, on divise par le facteur qui le multiplie.",
      "$d = vt$, on divise les deux membres par $v$.",
      "$\\dfrac{d}{v} = t$.",
      "$t = \\dfrac{d}{v}$."
    ),
    tags: ["seconde", "maths", "expressions", "exprimer_variable", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_var_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_exprimer_variable",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la formule $V = abc$, exprime $c$ en fonction de $V$, $a$ et $b$.",
    format: "qcm",
    choices: ["$c = \\dfrac{V}{ab}$", "$c = Vab$", "$c = \\dfrac{ab}{V}$", "$c = V - ab$"],
    expected: ["$c = \\dfrac{V}{ab}$"],
    comparator: "mcq_exact",
    hint: "On divise par le produit $ab$.",
    explanation: exp(
      "Pour isoler $c$, on divise par tout ce qui le multiplie.",
      "$V = abc$, on divise les deux membres par $ab$.",
      "$\\dfrac{V}{ab} = c$.",
      "$c = \\dfrac{V}{ab}$."
    ),
    tags: ["seconde", "maths", "expressions", "exprimer_variable", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_var_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_exprimer_variable",
    difficulty: 3,
    theme: "neutral",
    text: "Dans $y = 2x + 3$, exprime $x$ en fonction de $y$.",
    format: "qcm",
    choices: ["$x = \\dfrac{y - 3}{2}$", "$x = \\dfrac{y}{2} - 3$", "$x = \\dfrac{y + 3}{2}$", "$x = 2y - 3$"],
    expected: ["$x = \\dfrac{y - 3}{2}$"],
    comparator: "mcq_exact",
    hint: "On soustrait $3$, puis on divise par $2$.",
    explanation: exp(
      "On isole $x$ en effectuant les opérations inverses.",
      "$y = 2x + 3 \\Rightarrow y - 3 = 2x$.",
      "On divise par $2$ : $x = \\dfrac{y - 3}{2}$.",
      "$x = \\dfrac{y - 3}{2}$."
    ),
    tags: ["seconde", "maths", "expressions", "exprimer_variable", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_var_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_exprimer_variable",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la formule de l'aire d'un triangle $A = \\dfrac{b h}{2}$, exprime $h$.",
    format: "qcm",
    choices: ["$h = \\dfrac{2A}{b}$", "$h = \\dfrac{A}{2b}$", "$h = \\dfrac{2b}{A}$", "$h = 2Ab$"],
    expected: ["$h = \\dfrac{2A}{b}$"],
    comparator: "mcq_exact",
    hint: "Multiplie par $2$, puis divise par $b$.",
    explanation: exp(
      "On isole $h$ en deux étapes.",
      "$A = \\dfrac{bh}{2} \\Rightarrow 2A = bh$.",
      "On divise par $b$ : $h = \\dfrac{2A}{b}$.",
      "$h = \\dfrac{2A}{b}$."
    ),
    tags: ["seconde", "maths", "expressions", "exprimer_variable", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_var_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_exprimer_variable",
    difficulty: 4,
    theme: "neutral",
    text: "Dans le périmètre d'un cercle $C = 2\\pi r$, exprime $r$.",
    format: "qcm",
    choices: ["$r = \\dfrac{C}{2\\pi}$", "$r = \\dfrac{2\\pi}{C}$", "$r = 2\\pi C$", "$r = \\dfrac{C}{\\pi}$"],
    expected: ["$r = \\dfrac{C}{2\\pi}$"],
    comparator: "mcq_exact",
    hint: "On divise par $2\\pi$.",
    explanation: exp(
      "Pour isoler $r$, on divise par le facteur $2\\pi$.",
      "$C = 2\\pi r$, on divise les deux membres par $2\\pi$.",
      "$\\dfrac{C}{2\\pi} = r$.",
      "$r = \\dfrac{C}{2\\pi}$."
    ),
    tags: ["seconde", "maths", "expressions", "exprimer_variable", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_var_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_exprimer_variable",
    difficulty: 5,
    theme: "neutral",
    text: "Dans $ax + by = c$ (avec $b \\neq 0$), exprime $y$ en fonction de $x$.",
    format: "qcm",
    choices: ["$y = \\dfrac{c - ax}{b}$", "$y = \\dfrac{c + ax}{b}$", "$y = \\dfrac{c - ax}{a}$", "$y = c - ax$"],
    expected: ["$y = \\dfrac{c - ax}{b}$"],
    comparator: "mcq_exact",
    hint: "On isole $by$, puis on divise par $b$.",
    explanation: exp(
      "On isole le terme contenant $y$, puis on divise.",
      "$ax + by = c \\Rightarrow by = c - ax$.",
      "On divise par $b$ : $y = \\dfrac{c - ax}{b}$.",
      "$y = \\dfrac{c - ax}{b}$."
    ),
    tags: ["seconde", "maths", "expressions", "exprimer_variable", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_var_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_exprimer_variable",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le périmètre d'un rectangle $P = 2(L + l)$, exprime $l$.",
    format: "qcm",
    choices: ["$l = \\dfrac{P}{2} - L$", "$l = P - 2L$", "$l = \\dfrac{P - L}{2}$", "$l = 2P - L$"],
    expected: ["$l = \\dfrac{P}{2} - L$"],
    comparator: "mcq_exact",
    hint: "Divise d'abord par $2$, puis soustrais $L$.",
    explanation: exp(
      "On isole $l$ étape par étape.",
      "$P = 2(L + l) \\Rightarrow \\dfrac{P}{2} = L + l$.",
      "On soustrait $L$ : $l = \\dfrac{P}{2} - L$.",
      "$l = \\dfrac{P}{2} - L$."
    ),
    tags: ["seconde", "maths", "expressions", "exprimer_variable", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_expr_var_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_exprimer_variable",
    difficulty: 4,
    theme: "neutral",
    hint: "Soustrais la constante, puis divise par le coefficient.",
    tags: ["seconde", "maths", "expressions", "exprimer_variable", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 9);
      const correct = `$x = \\dfrac{y - ${b}}{${a}}$`;
      const choices = [
        correct,
        `$x = \\dfrac{y + ${b}}{${a}}$`,
        `$x = \\dfrac{y}{${a}} - ${b}$`,
        `$x = ${a}y - ${b}$`,
      ];
      return {
        text: `Dans $y = ${a}x + ${b}$, exprime $x$ en fonction de $y$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On isole $x$ en effectuant les opérations inverses.",
          `$y = ${a}x + ${b} \\Rightarrow y - ${b} = ${a}x$.`,
          `On divise par ${a} : $x = \\dfrac{y - ${b}}{${a}}$.`,
          `$x = \\dfrac{y - ${b}}{${a}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_expr_var_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_exprimer_variable",
    difficulty: 3,
    theme: "neutral",
    hint: "On divise par le facteur qui multiplie la variable cherchée.",
    tags: ["seconde", "maths", "expressions", "exprimer_variable", "template"],
    generate: () => {
      const correct = "$b = \\dfrac{A}{L}$";
      const choices = [correct, "$b = AL$", "$b = \\dfrac{L}{A}$", "$b = A - L$"];
      return {
        text: "Dans la formule de l'aire d'un rectangle $A = L \\times b$, exprime $b$.",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour isoler $b$, on divise par le facteur qui le multiplie.",
          "$A = L \\times b$, on divise les deux membres par $L$.",
          "$\\dfrac{A}{L} = b$.",
          "$b = \\dfrac{A}{L}$."
        ),
      };
    },
  },

  /* ===================== EXPR_REDUIRE_SUBSTITUER ===================== */

  {
    kind: "fixed",
    id: "seconde_expr_red_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_reduire_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Réduis l'expression $3x + 2x$.",
    format: "qcm",
    choices: ["$5x$", "$6x$", "$5x^2$", "$6x^2$"],
    expected: ["$5x$"],
    comparator: "mcq_exact",
    hint: "On additionne les coefficients de $x$.",
    explanation: exp(
      "Réduire, c'est regrouper les termes semblables.",
      "$3x$ et $2x$ sont semblables : on ajoute les coefficients.",
      "$3 + 2 = 5$, donc $3x + 2x = 5x$.",
      "$3x + 2x = 5x$."
    ),
    tags: ["seconde", "maths", "expressions", "reduire", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_red_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_reduire_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Réduis l'expression $2x + 3 + x - 1$.",
    format: "qcm",
    choices: ["$3x + 2$", "$3x + 4$", "$2x + 2$", "$3x - 2$"],
    expected: ["$3x + 2$"],
    comparator: "mcq_exact",
    hint: "On regroupe les termes en $x$ d'un côté, les nombres de l'autre.",
    explanation: exp(
      "On regroupe les termes semblables.",
      "Termes en $x$ : $2x + x = 3x$ ; nombres : $3 - 1 = 2$.",
      "$3x + 2$.",
      "$2x + 3 + x - 1 = 3x + 2$."
    ),
    tags: ["seconde", "maths", "expressions", "reduire", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_red_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_reduire_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Réduis l'expression $5x - 2x + x$.",
    format: "qcm",
    choices: ["$4x$", "$3x$", "$8x$", "$4x^2$"],
    expected: ["$4x$"],
    comparator: "mcq_exact",
    hint: "$5 - 2 + 1 = 4$.",
    explanation: exp(
      "On additionne et soustrait les coefficients de $x$.",
      "$5 - 2 + 1 = 4$.",
      "$5x - 2x + x = 4x$.",
      "$5x - 2x + x = 4x$."
    ),
    tags: ["seconde", "maths", "expressions", "reduire", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_red_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_reduire_substituer",
    difficulty: 3,
    theme: "neutral",
    text: "Réduis l'expression $4x + 3 - x + 2$.",
    format: "qcm",
    choices: ["$3x + 5$", "$3x + 1$", "$5x + 5$", "$3x - 5$"],
    expected: ["$3x + 5$"],
    comparator: "mcq_exact",
    hint: "Termes en $x$ : $4x - x$ ; nombres : $3 + 2$.",
    explanation: exp(
      "On regroupe les termes semblables.",
      "Termes en $x$ : $4x - x = 3x$ ; nombres : $3 + 2 = 5$.",
      "$3x + 5$.",
      "$4x + 3 - x + 2 = 3x + 5$."
    ),
    tags: ["seconde", "maths", "expressions", "reduire", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_red_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_reduire_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut l'expression $3x + 1$ lorsque $x = 2$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "On remplace $x$ par $2$.",
    explanation: exp(
      "Substituer, c'est remplacer la lettre par sa valeur.",
      "On remplace $x$ par $2$ : $3 \\times 2 + 1$.",
      "$= 6 + 1 = 7$.",
      "L'expression vaut $7$."
    ),
    tags: ["seconde", "maths", "expressions", "substituer", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_red_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_reduire_substituer",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut l'expression $x^2 + 2x$ lorsque $x = -1$ ?",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "$(-1)^2 = 1$ et $2 \\times (-1) = -2$.",
    explanation: exp(
      "On remplace $x$ par $-1$ en respectant les signes.",
      "$(-1)^2 + 2 \\times (-1) = 1 - 2$.",
      "$= -1$.",
      "L'expression vaut $-1$."
    ),
    tags: ["seconde", "maths", "expressions", "substituer", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_red_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_reduire_substituer",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut l'expression $2x^2 - 5$ lorsque $x = 3$ ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "$x^2 = 9$, puis $2 \\times 9 - 5$.",
    explanation: exp(
      "On remplace $x$ par $3$.",
      "$2 \\times 3^2 - 5 = 2 \\times 9 - 5$.",
      "$= 18 - 5 = 13$.",
      "L'expression vaut $13$."
    ),
    tags: ["seconde", "maths", "expressions", "substituer", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_expr_red_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_reduire_substituer",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut l'expression $x^2 - 3x$ lorsque $x = -2$ ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$(-2)^2 = 4$ et $-3 \\times (-2) = +6$.",
    explanation: exp(
      "On remplace $x$ par $-2$ en respectant les signes.",
      "$(-2)^2 - 3 \\times (-2) = 4 + 6$.",
      "$= 10$.",
      "L'expression vaut $10$."
    ),
    tags: ["seconde", "maths", "expressions", "substituer", "short"],
  },

  {
    kind: "template",
    id: "seconde_expr_red_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_reduire_substituer",
    difficulty: 2,
    theme: "neutral",
    hint: "On remplace $x$ par sa valeur.",
    tags: ["seconde", "maths", "expressions", "substituer", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 9);
      const v = randomInt(2, 6);
      const valeur = a * v + b;
      return {
        text: `Que vaut l'expression $${a}x + ${b}$ lorsque $x = ${v}$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Substituer, c'est remplacer la lettre par sa valeur.",
          `On remplace $x$ par $${v}$ : $${a} \\times ${v} + ${b}$.`,
          `$= ${a * v} + ${b} = ${valeur}$.`,
          `L'expression vaut $${valeur}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_expr_red_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "expressions_litterales_2de",
    microId: "expr_reduire_substituer",
    difficulty: 2,
    theme: "neutral",
    hint: "On additionne les coefficients de $x$.",
    tags: ["seconde", "maths", "expressions", "reduire", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      // $2 + 2$ et $2 \times 2$ valent tous deux 4 : le piège « on a multiplié
      // au lieu d'additionner » devenait la bonne réponse.
      let b = randomInt(2, 6);
      while (a === 2 && b === 2) b = randomInt(2, 6);
      const correct = `$${a + b}x$`;
      const choices = makeChoices(correct, [
        `$${a * b}x$`,
        `$${a + b}x^2$`,
        `$${a + b}$`,
      ]);
      return {
        text: `Réduis l'expression $${a}x + ${b}x$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On regroupe les termes semblables en additionnant les coefficients.",
          `$${a} + ${b} = ${a + b}$.`,
          `$${a}x + ${b}x = ${a + b}x$.`,
          `$${a}x + ${b}x = ${a + b}x$.`
        ),
      };
    },
  },
];
