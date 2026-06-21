// lib/tutor-v4/questionBank/seconde/maths/fonction-variations.bank.ts
//
// Chapitre : Variations et extremums (notion fonction_variations_extremums)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Canvas : "fonctionGraphique" (courbe quadratique = parabole) pour lire variations/extremum.
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   variation_tableau   — Lire un tableau de variations
//   variation_croissance— Croissance / decroissance sur un intervalle
//   variation_extremum  — Identifier minimum et maximum

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

// Parabole y = a x^2 + b x + c, avec sommet mis en evidence.
function parabole(
  a: number,
  b: number,
  c: number,
  sommet?: { x: number; y: number; label?: string }
): CanvasFigure {
  const convexe = a > 0;
  return {
    kind: "fonctionGraphique",
    size: { width: 300, height: 300 },
    xmin: -5,
    xmax: 5,
    ymin: convexe ? -2 : -6,
    ymax: convexe ? 6 : 6,
    grille: true,
    courbes: [{ id: "f", type: "quadratique", a, b, c, couleur: "#2563eb" }],
    misesEnEvidence: sommet
      ? [{ point: { x: sommet.x, y: sommet.y, label: sommet.label ?? "S", couleur: "#dc2626" } }]
      : undefined,
  };
}

export const fonctionVariationsBank: TutorBankItemV4[] = [
  /* ===================== VARIATION_TABLEAU ===================== */

  {
    kind: "fixed",
    id: "seconde_var_tab_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau de variations, une flèche qui monte signifie que la fonction est :",
    format: "qcm",
    choices: ["croissante", "décroissante", "constante", "nulle"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "La flèche monte → les valeurs augmentent.",
    explanation: exp(
      "Le tableau de variations résume le sens de variation avec des flèches.",
      "Une flèche montante indique que $f(x)$ augmente quand $x$ augmente.",
      "C'est la définition d'une fonction croissante.",
      "La fonction est croissante."
    ),
    tags: ["seconde", "maths", "fonctions", "variations", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_tab_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau de variations, une flèche qui descend signifie que la fonction est :",
    format: "qcm",
    choices: ["décroissante", "croissante", "constante", "positive"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "La flèche descend → les valeurs diminuent.",
    explanation: exp(
      "Une flèche descendante indique que $f(x)$ diminue quand $x$ augmente.",
      "On lit le sens de la flèche.",
      "C'est la définition d'une fonction décroissante.",
      "La fonction est décroissante."
    ),
    tags: ["seconde", "maths", "fonctions", "variations", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_tab_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Une fonction est croissante puis décroissante. Au point de changement, elle admet un :",
    format: "qcm",
    choices: ["maximum", "minimum", "antécédent", "zéro"],
    expected: ["maximum"],
    comparator: "mcq_exact",
    hint: "Elle monte puis descend : le sommet est en haut.",
    explanation: exp(
      "Le changement de sens correspond à un extremum.",
      "Croissante puis décroissante : la courbe atteint un sommet.",
      "C'est un maximum.",
      "Elle admet un maximum."
    ),
    tags: ["seconde", "maths", "fonctions", "variations", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_tab_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Une fonction est décroissante puis croissante. Au point de changement, elle admet un :",
    format: "qcm",
    choices: ["minimum", "maximum", "antécédent", "zéro"],
    expected: ["minimum"],
    comparator: "mcq_exact",
    hint: "Elle descend puis monte : le sommet est en bas.",
    explanation: exp(
      "Le changement de sens correspond à un extremum.",
      "Décroissante puis croissante : la courbe atteint un creux.",
      "C'est un minimum.",
      "Elle admet un minimum."
    ),
    tags: ["seconde", "maths", "fonctions", "variations", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_tab_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "D'après la courbe ci-dessous, la fonction est-elle croissante ou décroissante sur $[0\\,;5]$ ?",
    format: "qcm",
    choices: ["Croissante", "Décroissante", "Constante", "Les deux"],
    expected: ["Croissante"],
    comparator: "mcq_exact",
    canvas: parabole(1, 0, 0, { x: 0, y: 0, label: "S" }),
    hint: "À droite du sommet $(0\\,;0)$, la parabole monte.",
    explanation: exp(
      "On lit le sens de variation sur la courbe.",
      "À droite du sommet $(0\\,;0)$, la courbe de $x^2$ monte.",
      "Sur $[0\\,;5]$, elle est donc croissante.",
      "La fonction est croissante sur $[0\\,;5]$."
    ),
    tags: ["seconde", "maths", "fonctions", "variations", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_tab_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert un tableau de variations ?",
    format: "qcm",
    choices: [
      "À résumer le sens de variation et les extremums d'une fonction",
      "À calculer une moyenne",
      "À tracer un cercle",
      "À factoriser une expression",
    ],
    expected: ["À résumer le sens de variation et les extremums d'une fonction"],
    comparator: "mcq_exact",
    hint: "Flèches montantes/descendantes + valeurs aux bornes.",
    explanation: exp(
      "Le tableau de variations synthétise le comportement de la fonction.",
      "Il indique où elle croît, décroît, et ses extremums.",
      "C'est un résumé visuel pratique.",
      "Il résume le sens de variation et les extremums."
    ),
    tags: ["seconde", "maths", "fonctions", "variations", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_tab_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Une fonction est croissante sur $]-\\infty\\,;2]$ puis décroissante sur $[2\\,;+\\infty[$. En $x = 2$, que vaut-il mieux dire ?",
    format: "qcm",
    choices: ["$f$ admet un maximum en $2$", "$f$ admet un minimum en $2$", "$f$ s'annule en $2$", "$f$ est constante"],
    expected: ["$f$ admet un maximum en $2$"],
    comparator: "mcq_exact",
    hint: "Croissante puis décroissante → sommet en haut.",
    explanation: exp(
      "On lit le changement de sens à $x = 2$.",
      "Croissante avant, décroissante après : la courbe culmine en $2$.",
      "C'est un maximum.",
      "$f$ admet un maximum en $2$."
    ),
    tags: ["seconde", "maths", "fonctions", "variations", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_var_tab_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Croissante puis décroissante → maximum ; l'inverse → minimum.",
    tags: ["seconde", "maths", "fonctions", "variations", "template"],
    generate: () => {
      const maxi = Math.random() < 0.5;
      const correct = maxi ? "un maximum" : "un minimum";
      const choices = ["un maximum", "un minimum", "un antécédent", "un zéro"];
      const sens = maxi ? "croissante puis décroissante" : "décroissante puis croissante";
      return {
        text: `Une fonction est ${sens}. Au changement de sens, elle admet :`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un changement de sens donne un extremum.",
          `${sens.charAt(0).toUpperCase() + sens.slice(1)} : on regarde la forme.`,
          maxi ? "Le sommet est en haut → maximum." : "Le creux est en bas → minimum.",
          `Elle admet ${correct}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_var_tab_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "D'après la courbe ci-dessous, sur quel intervalle la fonction est-elle décroissante ?",
    format: "qcm",
    choices: ["$]-\\infty\\,;0]$", "$[0\\,;+\\infty[$", "$\\mathbb{R}$", "Nulle part"],
    expected: ["$]-\\infty\\,;0]$"],
    comparator: "mcq_exact",
    canvas: parabole(1, 0, 0, { x: 0, y: 0, label: "S" }),
    hint: "À gauche du sommet $(0\\,;0)$, la parabole descend.",
    explanation: exp(
      "On lit le sens de variation à gauche du sommet.",
      "Avant $0$, la courbe de $x^2$ descend.",
      "Elle est donc décroissante sur $]-\\infty\\,;0]$.",
      "Décroissante sur $]-\\infty\\,;0]$."
    ),
    tags: ["seconde", "maths", "fonctions", "variations", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_tab_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Une fonction constante sur un intervalle se représente dans le tableau de variations par :",
    format: "qcm",
    choices: ["une flèche horizontale (ou un trait)", "une flèche montante", "une flèche descendante", "deux flèches"],
    expected: ["une flèche horizontale (ou un trait)"],
    comparator: "mcq_exact",
    hint: "Constante = ne monte ni ne descend.",
    explanation: exp(
      "Une fonction constante garde la même valeur.",
      "Elle ne monte ni ne descend.",
      "On la représente par un trait horizontal.",
      "Une flèche horizontale."
    ),
    tags: ["seconde", "maths", "fonctions", "variations", "raisonnement", "qcm"],
  },

  /* ===================== VARIATION_CROISSANCE ===================== */

  {
    kind: "fixed",
    id: "seconde_var_cr_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_croissance",
    difficulty: 1,
    theme: "neutral",
    text: "Une fonction est croissante sur un intervalle si, quand $x$ augmente :",
    format: "qcm",
    choices: ["$f(x)$ augmente", "$f(x)$ diminue", "$f(x)$ reste constant", "$f(x)$ devient nul"],
    expected: ["$f(x)$ augmente"],
    comparator: "mcq_exact",
    hint: "Croissante = monte.",
    explanation: exp(
      "La croissance décrit le lien entre $x$ et $f(x)$.",
      "Croissante : à $x$ plus grand correspond $f(x)$ plus grand.",
      "Donc $f(x)$ augmente avec $x$.",
      "$f(x)$ augmente."
    ),
    tags: ["seconde", "maths", "fonctions", "croissance", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_cr_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_croissance",
    difficulty: 1,
    theme: "neutral",
    text: "Une fonction est décroissante sur un intervalle si, quand $x$ augmente :",
    format: "qcm",
    choices: ["$f(x)$ diminue", "$f(x)$ augmente", "$f(x)$ reste constant", "$f(x)$ double"],
    expected: ["$f(x)$ diminue"],
    comparator: "mcq_exact",
    hint: "Décroissante = descend.",
    explanation: exp(
      "La décroissance décrit le lien entre $x$ et $f(x)$.",
      "Décroissante : à $x$ plus grand correspond $f(x)$ plus petit.",
      "Donc $f(x)$ diminue quand $x$ augmente.",
      "$f(x)$ diminue."
    ),
    tags: ["seconde", "maths", "fonctions", "croissance", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_cr_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_croissance",
    difficulty: 2,
    theme: "neutral",
    text: "Sur quel intervalle la fonction carré $f(x) = x^2$ est-elle croissante ?",
    format: "qcm",
    choices: ["$[0\\,;+\\infty[$", "$]-\\infty\\,;0]$", "$\\mathbb{R}$", "$[-1\\,;1]$"],
    expected: ["$[0\\,;+\\infty[$"],
    comparator: "mcq_exact",
    canvas: parabole(1, 0, 0, { x: 0, y: 0, label: "S" }),
    hint: "À droite de $0$, la parabole monte.",
    explanation: exp(
      "On observe la parabole $y = x^2$.",
      "À droite du sommet $(0\\,;0)$, elle monte.",
      "Elle est croissante sur $[0\\,;+\\infty[$.",
      "Croissante sur $[0\\,;+\\infty[$."
    ),
    tags: ["seconde", "maths", "fonctions", "croissance", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_cr_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_croissance",
    difficulty: 2,
    theme: "neutral",
    text: "Sur quel intervalle la fonction carré $f(x) = x^2$ est-elle décroissante ?",
    format: "qcm",
    choices: ["$]-\\infty\\,;0]$", "$[0\\,;+\\infty[$", "$\\mathbb{R}$", "Nulle part"],
    expected: ["$]-\\infty\\,;0]$"],
    comparator: "mcq_exact",
    canvas: parabole(1, 0, 0, { x: 0, y: 0, label: "S" }),
    hint: "À gauche de $0$, la parabole descend.",
    explanation: exp(
      "On observe la parabole $y = x^2$.",
      "À gauche du sommet $(0\\,;0)$, elle descend.",
      "Elle est décroissante sur $]-\\infty\\,;0]$.",
      "Décroissante sur $]-\\infty\\,;0]$."
    ),
    tags: ["seconde", "maths", "fonctions", "croissance", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_cr_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_croissance",
    difficulty: 3,
    theme: "neutral",
    text: "Une fonction affine $f(x) = ax + b$ est croissante lorsque :",
    format: "qcm",
    choices: ["$a > 0$", "$a < 0$", "$b > 0$", "$b < 0$"],
    expected: ["$a > 0$"],
    comparator: "mcq_exact",
    hint: "Le signe du coefficient directeur donne le sens.",
    explanation: exp(
      "Pour une fonction affine, le sens dépend du coefficient directeur $a$.",
      "Si $a > 0$, la droite monte.",
      "Donc $f$ est croissante quand $a > 0$.",
      "$f$ est croissante lorsque $a > 0$."
    ),
    tags: ["seconde", "maths", "fonctions", "croissance", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_cr_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_croissance",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction $f(x) = -x^2$ (parabole tournée vers le bas) est croissante sur :",
    format: "qcm",
    choices: ["$]-\\infty\\,;0]$", "$[0\\,;+\\infty[$", "$\\mathbb{R}$", "Nulle part"],
    expected: ["$]-\\infty\\,;0]$"],
    comparator: "mcq_exact",
    canvas: parabole(-1, 0, 0, { x: 0, y: 0, label: "S" }),
    hint: "Avant le sommet $(0\\,;0)$, la courbe monte.",
    explanation: exp(
      "La parabole $-x^2$ monte puis descend (sommet en haut).",
      "Avant $0$, elle monte.",
      "Elle est croissante sur $]-\\infty\\,;0]$.",
      "Croissante sur $]-\\infty\\,;0]$."
    ),
    tags: ["seconde", "maths", "fonctions", "croissance", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_cr_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_croissance",
    difficulty: 2,
    theme: "neutral",
    text: "« Monotone sur un intervalle » signifie que la fonction :",
    format: "qcm",
    choices: [
      "garde le même sens de variation (toujours croissante ou toujours décroissante)",
      "change de sens plusieurs fois",
      "est constante",
      "est positive",
    ],
    expected: ["garde le même sens de variation (toujours croissante ou toujours décroissante)"],
    comparator: "mcq_exact",
    hint: "Monotone = un seul sens.",
    explanation: exp(
      "« Monotone » qualifie une variation d'un seul tenant.",
      "La fonction est soit croissante, soit décroissante sur tout l'intervalle.",
      "Elle ne change pas de sens.",
      "Elle garde le même sens de variation."
    ),
    tags: ["seconde", "maths", "fonctions", "croissance", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_var_cr_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_croissance",
    difficulty: 3,
    theme: "neutral",
    hint: "Affine : croissante si $a>0$, décroissante si $a<0$.",
    tags: ["seconde", "maths", "fonctions", "croissance", "template"],
    generate: () => {
      const a = randomInt(-5, 5) || 2;
      const croissante = a > 0;
      const correct = croissante ? "croissante" : "décroissante";
      const choices = ["croissante", "décroissante", "constante", "ni l'une ni l'autre"];
      const b = randomInt(-4, 4);
      const sb = b >= 0 ? `+ ${b}` : `- ${-b}`;
      return {
        text: `La fonction affine $f(x) = ${a}x ${sb}$ est :`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le sens d'une fonction affine dépend du signe de $a$.",
          `Ici $a = ${a}$, qui est ${croissante ? "positif" : "négatif"}.`,
          croissante ? "Donc la droite monte." : "Donc la droite descend.",
          `$f$ est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_var_cr_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_croissance",
    difficulty: 2,
    theme: "neutral",
    hint: "Croissante : $f(x)$ augmente avec $x$.",
    tags: ["seconde", "maths", "fonctions", "croissance", "raisonnement", "template"],
    generate: () => {
      const croissante = Math.random() < 0.5;
      const correct = croissante ? "$f(x)$ augmente" : "$f(x)$ diminue";
      const choices = ["$f(x)$ augmente", "$f(x)$ diminue", "$f(x)$ est constant", "$f(x)$ s'annule"];
      const mot = croissante ? "croissante" : "décroissante";
      return {
        text: `Si $f$ est ${mot} sur un intervalle, alors quand $x$ augmente :`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On traduit le sens de variation.",
          `${mot.charAt(0).toUpperCase() + mot.slice(1)} décrit le comportement de $f(x)$.`,
          croissante ? "$f(x)$ augmente avec $x$." : "$f(x)$ diminue quand $x$ augmente.",
          correct + "."
        ),
      };
    },
  },

  /* ===================== VARIATION_EXTREMUM ===================== */

  {
    kind: "fixed",
    id: "seconde_var_ext_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_extremum",
    difficulty: 2,
    theme: "neutral",
    text: "Le minimum d'une fonction sur un intervalle est :",
    format: "qcm",
    choices: [
      "la plus petite valeur prise par $f(x)$",
      "la plus petite valeur de $x$",
      "le point d'intersection avec l'axe des abscisses",
      "la pente la plus faible",
    ],
    expected: ["la plus petite valeur prise par $f(x)$"],
    comparator: "mcq_exact",
    hint: "Extremum = valeur de $f(x)$, pas de $x$.",
    explanation: exp(
      "Un extremum est une valeur prise par la fonction.",
      "Le minimum est la plus petite ordonnée atteinte.",
      "C'est une valeur de $f(x)$, pas de $x$.",
      "C'est la plus petite valeur prise par $f(x)$."
    ),
    tags: ["seconde", "maths", "fonctions", "extremum", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_ext_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_extremum",
    difficulty: 2,
    theme: "neutral",
    text: "La fonction carré $f(x) = x^2$ admet un minimum. Quelle est sa valeur ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    canvas: parabole(1, 0, 0, { x: 0, y: 0, label: "S" }),
    hint: "Le sommet de la parabole est en $(0\\,;0)$.",
    explanation: exp(
      "Le minimum est l'ordonnée du sommet.",
      "Le sommet de $y = x^2$ est $(0\\,;0)$.",
      "Le minimum vaut donc $0$.",
      "Le minimum est $0$."
    ),
    tags: ["seconde", "maths", "fonctions", "extremum", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_var_ext_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_extremum",
    difficulty: 2,
    theme: "neutral",
    text: "Pour quelle valeur de $x$ la fonction $f(x) = x^2$ atteint-elle son minimum ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Abscisse du sommet.",
    explanation: exp(
      "Le minimum est atteint à l'abscisse du sommet.",
      "Le sommet de $y = x^2$ est en $x = 0$.",
      "Donc le minimum est atteint en $0$.",
      "En $x = 0$."
    ),
    tags: ["seconde", "maths", "fonctions", "extremum", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_var_ext_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_extremum",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction $f(x) = -x^2 + 4$ admet un maximum. Quelle est sa valeur ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    canvas: parabole(-1, 0, 4, { x: 0, y: 4, label: "S" }),
    hint: "Le sommet est en $(0\\,;4)$.",
    explanation: exp(
      "La parabole est tournée vers le bas : elle a un maximum.",
      "Le sommet de $-x^2 + 4$ est $(0\\,;4)$.",
      "Le maximum vaut donc $4$.",
      "Le maximum est $4$."
    ),
    tags: ["seconde", "maths", "fonctions", "extremum", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_var_ext_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_extremum",
    difficulty: 3,
    theme: "neutral",
    text: "Une parabole tournée vers le haut ($a > 0$) admet :",
    format: "qcm",
    choices: ["un minimum", "un maximum", "ni l'un ni l'autre", "les deux"],
    expected: ["un minimum"],
    comparator: "mcq_exact",
    hint: "Vers le haut = creux en bas.",
    explanation: exp(
      "Une parabole vers le haut a la forme d'une vallée.",
      "Son sommet est le point le plus bas.",
      "Elle admet donc un minimum.",
      "Elle admet un minimum."
    ),
    tags: ["seconde", "maths", "fonctions", "extremum", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_ext_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_extremum",
    difficulty: 3,
    theme: "neutral",
    text: "Une parabole tournée vers le bas ($a < 0$) admet :",
    format: "qcm",
    choices: ["un maximum", "un minimum", "ni l'un ni l'autre", "les deux"],
    expected: ["un maximum"],
    comparator: "mcq_exact",
    hint: "Vers le bas = sommet en haut.",
    explanation: exp(
      "Une parabole vers le bas a la forme d'une colline.",
      "Son sommet est le point le plus haut.",
      "Elle admet donc un maximum.",
      "Elle admet un maximum."
    ),
    tags: ["seconde", "maths", "fonctions", "extremum", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_var_ext_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_extremum",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction $f(x) = (x - 2)^2$ admet un minimum. En quelle valeur de $x$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    canvas: parabole(1, -4, 4, { x: 2, y: 0, label: "S" }),
    hint: "Le carré est minimal quand $x - 2 = 0$.",
    explanation: exp(
      "$(x-2)^2 \\ge 0$, minimal quand la parenthèse est nulle.",
      "$x - 2 = 0 \\Rightarrow x = 2$.",
      "Le minimum est atteint en $x = 2$.",
      "En $x = 2$."
    ),
    tags: ["seconde", "maths", "fonctions", "extremum", "canvas", "short"],
  },

  {
    kind: "template",
    id: "seconde_var_ext_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_extremum",
    difficulty: 4,
    theme: "neutral",
    hint: "$(x - h)^2$ est minimal quand $x = h$.",
    tags: ["seconde", "maths", "fonctions", "extremum", "template"],
    generate: () => {
      const h = randomInt(1, 5);
      return {
        text: `La fonction $f(x) = (x - ${h})^2$ admet un minimum. En quelle valeur de $x$ ?`,
        format: "short",
        expected: [String(h)],
        comparator: "number_equal",
        explanation: exp(
          "Un carré est minimal (nul) quand la parenthèse s'annule.",
          `$(x - ${h})^2 = 0 \\Rightarrow x = ${h}$.`,
          `Le minimum est atteint en $x = ${h}$.`,
          `En $x = ${h}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_var_ext_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_extremum",
    difficulty: 3,
    theme: "neutral",
    hint: "Sommet d'une parabole $y = x^2 + k$ : $(0\\,;k)$.",
    tags: ["seconde", "maths", "fonctions", "extremum", "template"],
    generate: () => {
      const k = randomInt(1, 6);
      return {
        text: `La fonction $f(x) = x^2 + ${k}$ admet un minimum. Quelle est sa valeur ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        canvas: parabole(1, 0, k, { x: 0, y: k, label: "S" }),
        explanation: exp(
          "Le minimum est l'ordonnée du sommet.",
          `$x^2 \\ge 0$, donc $f(x) \\ge ${k}$, avec égalité en $x = 0$.`,
          `Le minimum vaut $${k}$.`,
          `Le minimum est $${k}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_var_ext_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_variations_extremums",
    microId: "variation_extremum",
    difficulty: 2,
    theme: "neutral",
    text: "Un extremum d'une fonction est :",
    format: "qcm",
    choices: ["un minimum ou un maximum", "toujours égal à $0$", "l'abscisse du sommet", "la pente"],
    expected: ["un minimum ou un maximum"],
    comparator: "mcq_exact",
    hint: "« Extremum » regroupe deux cas.",
    explanation: exp(
      "Le mot « extremum » désigne une valeur extrême.",
      "Cela peut être un minimum (le plus bas) ou un maximum (le plus haut).",
      "C'est donc un minimum ou un maximum.",
      "Un minimum ou un maximum."
    ),
    tags: ["seconde", "maths", "fonctions", "extremum", "raisonnement", "qcm"],
  },
];
