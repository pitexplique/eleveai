// lib/tutor-v4/questionBank/premiere-spe/maths/variations-fonctions.bank.ts
//
// Chapitre : Variations et courbes des fonctions (notion "variations_fonctions")
// microSkills :
//   var_signe_derivee — lien entre signe de f' et variations
//   var_tableau       — dresser un tableau de variations
//   var_extremum      — déterminer un extremum
//   var_optimisation  — résoudre un problème d'optimisation
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM. Canvas : fonctionGraphique.

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

function parabole(a: number, b: number, c: number): CanvasFigure {
  const xs = -b / (2 * a);
  const ys = a * xs * xs + b * xs + c;
  return {
    kind: "fonctionGraphique",
    size: { width: 300, height: 300 },
    xmin: -6,
    xmax: 6,
    ymin: -8,
    ymax: 8,
    grille: true,
    courbes: [{ id: "f", type: "quadratique", a, b, c, couleur: "#2563eb" }],
    misesEnEvidence: [
      { point: { x: Math.round(xs * 100) / 100, y: Math.round(ys * 100) / 100, label: "S", couleur: "#dc2626" } },
    ],
  };
}

export const variationsFonctionsBank: TutorBankItemV4[] = [
  /* ===================== VAR_SIGNE_DERIVEE ===================== */
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un intervalle où $f'(x) > 0$, la fonction $f$ est :",
    format: "qcm",
    choices: ["croissante", "décroissante", "constante", "nulle"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "Dérivée positive.",
    explanation: exp(
      "Le signe de la dérivée donne le sens de variation.",
      "Si $f'(x) > 0$ sur un intervalle, $f$ y croît.",
      "C'est la règle fondamentale dérivée ↔ variations.",
      "$f$ est croissante."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un intervalle où $f'(x) < 0$, la fonction $f$ est :",
    format: "qcm",
    choices: ["décroissante", "croissante", "constante", "maximale"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "Dérivée négative.",
    explanation: exp(
      "Le signe de la dérivée donne le sens de variation.",
      "Si $f'(x) < 0$ sur un intervalle, $f$ y décroît.",
      "C'est la règle dérivée ↔ variations.",
      "$f$ est décroissante."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 3,
    theme: "neutral",
    text: "Si $f'(x) = 0$ sur tout un intervalle, alors $f$ y est :",
    format: "qcm",
    choices: ["constante", "croissante", "décroissante", "nulle"],
    expected: ["constante"],
    comparator: "mcq_exact",
    hint: "Pas de variation.",
    explanation: exp(
      "Une dérivée nulle sur un intervalle signifie aucune variation.",
      "$f$ ne monte ni ne descend.",
      "Elle est donc constante sur cet intervalle.",
      "$f$ est constante."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = x^2 - 4x + 1$ donc $f'(x) = 2x - 4$. Sur quel intervalle $f$ est-elle croissante ?",
    format: "qcm",
    choices: ["$[2 ; +\\infty[$", "$]-\\infty ; 2]$", "$\\mathbb{R}$", "$[0 ; 2]$"],
    expected: ["$[2 ; +\\infty[$"],
    comparator: "mcq_exact",
    hint: "Là où $f'(x) \\ge 0$, soit $2x - 4 \\ge 0$.",
    explanation: exp(
      "$f$ croît là où $f'(x) \\ge 0$.",
      "$2x - 4 \\ge 0 \\Leftrightarrow x \\ge 2$.",
      "Donc $f$ croît sur $[2 ; +\\infty[$.",
      "$[2 ; +\\infty[$."
    ),
    canvas: parabole(1, -4, 1),
    tags: ["premiere", "maths", "variations", "signe_derivee", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 4,
    theme: "neutral",
    text: "Pour étudier les variations d'une fonction dérivable, on étudie d'abord :",
    format: "qcm",
    choices: ["le signe de $f'(x)$", "le signe de $f(x)$", "la valeur de $f(0)$", "les racines de $f$"],
    expected: ["le signe de $f'(x)$"],
    comparator: "mcq_exact",
    hint: "Variations ← dérivée.",
    explanation: exp(
      "Les variations se déduisent du signe de la dérivée.",
      "On calcule $f'$, puis on étudie son signe.",
      "On en déduit le tableau de variations.",
      "On étudie le signe de $f'(x)$."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_var_sg_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 3,
    theme: "neutral",
    hint: "Là où $f'(x) \\ge 0$.",
    tags: ["premiere", "maths", "variations", "signe_derivee", "template"],
    generate: () => {
      const alpha = randomInt(1, 4);
      const b = -2 * alpha;
      const c = randomInt(-2, 3);
      const correct = `$[${alpha} ; +\\infty[$`;
      const choices = [correct, `$]-\\infty ; ${alpha}]$`, "$\\mathbb{R}$", `$[0 ; ${alpha}]$`];
      return {
        text: `Soit $f(x) = x^2 ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}$, donc $f'(x) = 2x ${b >= 0 ? "+ " + b : "- " + -b}$. Sur quel intervalle $f$ est-elle croissante ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "$f$ croît là où $f'(x) \\ge 0$.",
          `$2x ${b >= 0 ? "+ " + b : "- " + -b} \\ge 0 \\Leftrightarrow x \\ge ${alpha}$.`,
          `Donc $f$ croît sur $[${alpha} ; +\\infty[$.`,
          `$[${alpha} ; +\\infty[$.`
        ),
      };
    },
  },

  /* ===================== VAR_TABLEAU ===================== */
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un tableau de variations, une flèche montante signifie que la fonction est :",
    format: "qcm",
    choices: ["croissante", "décroissante", "constante", "négative"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "Flèche ↗.",
    explanation: exp(
      "Le tableau de variations représente le sens de variation par des flèches.",
      "Une flèche montante ↗ correspond à une croissance.",
      "Elle se place là où $f' > 0$.",
      "La fonction est croissante."
    ),
    tags: ["premiere", "maths", "variations", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $f(x) = x^2$, le tableau de variations montre que $f$ :",
    format: "qcm",
    choices: [
      "décroît puis croît",
      "croît puis décroît",
      "est toujours croissante",
      "est constante",
    ],
    expected: ["décroît puis croît"],
    comparator: "mcq_exact",
    hint: "Parabole tournée vers le haut, sommet en $0$.",
    explanation: exp(
      "$f'(x) = 2x$ : négatif avant $0$, positif après.",
      "$f$ décroît sur $]-\\infty ; 0]$ puis croît sur $[0 ; +\\infty[$.",
      "Le sommet (minimum) est en $x = 0$.",
      "$f$ décroît puis croît."
    ),
    canvas: parabole(1, 0, 0),
    tags: ["premiere", "maths", "variations", "tableau", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un tableau de variations, où place-t-on les valeurs qui annulent $f'$ ?",
    format: "qcm",
    choices: [
      "aux changements de sens (extremums)",
      "uniquement aux bornes",
      "nulle part",
      "à $x = 0$ seulement",
    ],
    expected: ["aux changements de sens (extremums)"],
    comparator: "mcq_exact",
    hint: "$f' = 0$ : la dérivée change souvent de signe.",
    explanation: exp(
      "Les valeurs annulant $f'$ peuvent marquer un changement de sens.",
      "On les place comme abscisses séparant croissance et décroissance.",
      "Elles correspondent souvent à un extremum local.",
      "Aux changements de sens (extremums)."
    ),
    tags: ["premiere", "maths", "variations", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = -x^2 + 6x$, $f'(x) = -2x + 6$. La fonction croît sur :",
    format: "qcm",
    choices: ["$]-\\infty ; 3]$", "$[3 ; +\\infty[$", "$\\mathbb{R}$", "$[0 ; 6]$"],
    expected: ["$]-\\infty ; 3]$"],
    comparator: "mcq_exact",
    hint: "$f'(x) \\ge 0 \\Leftrightarrow -2x + 6 \\ge 0$.",
    explanation: exp(
      "$f$ croît là où $f'(x) \\ge 0$.",
      "$-2x + 6 \\ge 0 \\Leftrightarrow x \\le 3$.",
      "Donc $f$ croît sur $]-\\infty ; 3]$ (parabole vers le bas).",
      "$]-\\infty ; 3]$."
    ),
    canvas: parabole(-1, 6, 0),
    tags: ["premiere", "maths", "variations", "tableau", "canvas", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_var_tab_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Signe de $a$ : vers le haut → décroît puis croît.",
    tags: ["premiere", "maths", "variations", "tableau", "template"],
    generate: () => {
      const versHaut = randomInt(0, 1) === 1;
      const a = versHaut ? 1 : -1;
      const correct = versHaut ? "décroît puis croît" : "croît puis décroît";
      return {
        text: `Une parabole d'équation $y = ${a === 1 ? "" : "-"}x^2 + bx + c$ a son coefficient de $x^2$ ${versHaut ? "positif" : "négatif"}. Que fait la fonction ?`,
        format: "qcm",
        choices: ["décroît puis croît", "croît puis décroît", "est toujours croissante", "est constante"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le signe du coefficient de $x^2$ donne l'allure de la parabole.",
          `Ici il est ${versHaut ? "positif (parabole vers le haut)" : "négatif (parabole vers le bas)"}.`,
          `Donc la fonction ${correct}.`,
          `La fonction ${correct}.`
        ),
      };
    },
  },

  /* ===================== VAR_EXTREMUM ===================== */
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 2,
    theme: "neutral",
    text: "Un extremum d'une fonction dérivable est atteint là où :",
    format: "qcm",
    choices: [
      "$f'$ s'annule en changeant de signe",
      "$f$ s'annule",
      "$f' > 0$",
      "$f$ est négative",
    ],
    expected: ["$f'$ s'annule en changeant de signe"],
    comparator: "mcq_exact",
    hint: "La dérivée change de signe.",
    explanation: exp(
      "Un extremum local correspond à un changement de sens de variation.",
      "La dérivée s'annule et change de signe à cet endroit.",
      "Si $f'$ passe de $+$ à $-$ : maximum ; de $-$ à $+$ : minimum.",
      "$f'$ s'annule en changeant de signe."
    ),
    tags: ["premiere", "maths", "variations", "extremum", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $f(x) = x^2 - 6x + 5$, en quelle abscisse $f$ atteint-elle son minimum ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$f'(x) = 2x - 6 = 0$.",
    explanation: exp(
      "Le minimum est atteint là où $f'(x) = 0$.",
      "$2x - 6 = 0 \\Leftrightarrow x = 3$.",
      "$f'$ passe de $-$ à $+$ : c'est bien un minimum.",
      "Minimum atteint en $x = 3$."
    ),
    canvas: parabole(1, -6, 5),
    tags: ["premiere", "maths", "variations", "extremum", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^2 - 6x + 5$, quelle est la valeur du minimum ?",
    format: "short",
    expected: ["-4"],
    comparator: "number_equal",
    hint: "Calcule $f(3)$.",
    explanation: exp(
      "Le minimum vaut $f$ en l'abscisse du sommet.",
      "$f(3) = 3^2 - 6 \\times 3 + 5 = 9 - 18 + 5$.",
      "$= -4$.",
      "Le minimum vaut $-4$."
    ),
    canvas: parabole(1, -6, 5),
    tags: ["premiere", "maths", "variations", "extremum", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 3,
    theme: "neutral",
    text: "Si $f'$ passe de positif à négatif en $x = a$, alors $f(a)$ est :",
    format: "qcm",
    choices: ["un maximum local", "un minimum local", "nul", "une racine"],
    expected: ["un maximum local"],
    comparator: "mcq_exact",
    hint: "$f$ monte puis descend.",
    explanation: exp(
      "Le sens de variation change selon le signe de $f'$.",
      "$f'$ de $+$ à $-$ : $f$ croît puis décroît.",
      "Le point le plus haut est un maximum local.",
      "Un maximum local."
    ),
    tags: ["premiere", "maths", "variations", "extremum", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_var_ext_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 3,
    theme: "neutral",
    hint: "Abscisse de l'extremum : $f'(x) = 0$.",
    tags: ["premiere", "maths", "variations", "extremum", "template"],
    generate: () => {
      const alpha = randomInt(1, 5);
      const b = -2 * alpha;
      const c = randomInt(0, 6);
      return {
        text: `Pour $f(x) = x^2 ${b >= 0 ? "+ " + b : "- " + -b}x + ${c}$, en quelle abscisse $f$ atteint-elle son minimum ?`,
        format: "short",
        expected: [String(alpha)],
        comparator: "number_equal",
        explanation: exp(
          "Le minimum est atteint là où $f'(x) = 0$.",
          `$f'(x) = 2x ${b >= 0 ? "+ " + b : "- " + -b}$, qui s'annule en $x = ${alpha}$.`,
          "$f'$ passe de $-$ à $+$ : c'est un minimum.",
          `Minimum en $x = ${alpha}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_var_ext_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 4,
    theme: "neutral",
    hint: "Valeur du minimum $= f(\\alpha)$.",
    tags: ["premiere", "maths", "variations", "extremum", "template"],
    generate: () => {
      const alpha = randomInt(1, 4);
      const b = -2 * alpha;
      const c = randomInt(0, 6);
      const minVal = alpha * alpha + b * alpha + c;
      return {
        text: `Pour $f(x) = x^2 ${b >= 0 ? "+ " + b : "- " + -b}x + ${c}$, quelle est la valeur du minimum ?`,
        format: "short",
        expected: [String(minVal)],
        comparator: "number_equal",
        explanation: exp(
          "Le minimum vaut $f(\\alpha)$ avec $\\alpha = ${alpha}$.".replace("${alpha}", String(alpha)),
          `$f(${alpha}) = ${alpha}^2 ${b >= 0 ? "+ " + b : "- " + -b} \\times ${alpha} + ${c}$.`,
          `$= ${minVal}$.`,
          `Le minimum vaut $${minVal}$.`
        ),
      };
    },
  },

  /* ===================== VAR_OPTIMISATION ===================== */
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour optimiser une grandeur modélisée par une fonction dérivable, on cherche :",
    format: "qcm",
    choices: [
      "où la dérivée s'annule",
      "où la fonction s'annule",
      "l'ordonnée à l'origine",
      "les asymptotes",
    ],
    expected: ["où la dérivée s'annule"],
    comparator: "mcq_exact",
    hint: "Maximum/minimum ↔ dérivée nulle.",
    explanation: exp(
      "Optimiser, c'est chercher un maximum ou un minimum.",
      "Ces extremums sont là où la dérivée s'annule en changeant de signe.",
      "On étudie donc le signe de la dérivée.",
      "Où la dérivée s'annule."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 4,
    theme: "neutral",
    text: "L'aire d'un rectangle est $A(x) = x(10 - x)$ (un potager partagé). Pour quelle valeur de $x$ l'aire est-elle maximale ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$A(x) = 10x - x^2$, $A'(x) = 10 - 2x$.",
    explanation: exp(
      "On dérive l'aire et on cherche où la dérivée s'annule.",
      "$A(x) = 10x - x^2$, donc $A'(x) = 10 - 2x$.",
      "$A'(x) = 0 \\Leftrightarrow x = 5$ (maximum).",
      "L'aire est maximale pour $x = 5$."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $A(x) = x(10 - x)$, quelle est l'aire maximale du potager ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "Calcule $A(5)$.",
    explanation: exp(
      "L'aire maximale est $A$ en l'abscisse optimale.",
      "$A(5) = 5 \\times (10 - 5) = 5 \\times 5$.",
      "$= 25$.",
      "L'aire maximale vaut $25$."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 3,
    theme: "sport",
    text: "La hauteur d'un ballon est $h(t) = -5t^2 + 20t$. À quel instant atteint-il sa hauteur maximale ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$h'(t) = -10t + 20 = 0$.",
    explanation: exp(
      "La hauteur est maximale là où $h'(t) = 0$.",
      "$h'(t) = -10t + 20$, donc $-10t + 20 = 0 \\Leftrightarrow t = 2$.",
      "$h'$ passe de $+$ à $-$ : c'est bien un maximum.",
      "Hauteur maximale à $t = 2$ s."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "short"],
  },
  {
    kind: "template",
    id: "premiere_var_opt_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 4,
    theme: "neutral",
    hint: "Aire $x(L - x)$ : maximale au milieu.",
    tags: ["premiere", "maths", "variations", "optimisation", "template"],
    generate: () => {
      const demi = randomInt(3, 8);
      const L = 2 * demi;
      return {
        text: `L'aire d'un rectangle de demi-périmètre $${L}$ est $A(x) = x(${L} - x)$. Pour quelle valeur de $x$ l'aire est-elle maximale ?`,
        format: "short",
        expected: [String(demi)],
        comparator: "number_equal",
        explanation: exp(
          "On dérive : $A(x) = ${L}x - x^2$, $A'(x) = ${L} - 2x$.".replace(/\$\{L\}/g, String(L)),
          `$A'(x) = 0 \\Leftrightarrow x = ${demi}$.`,
          "C'est un maximum (carré de côté optimal).",
          `L'aire est maximale pour $x = ${demi}$.`
        ),
      };
    },
  },
];
