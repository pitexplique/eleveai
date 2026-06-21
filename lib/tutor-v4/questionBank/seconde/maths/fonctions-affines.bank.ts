// lib/tutor-v4/questionBank/seconde/maths/fonctions-affines.bank.ts
//
// Chapitre : Fonctions affines (notion fonctions_affines_2de)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Canvas : "fonctionGraphique" (droite affine).
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   affine_forme               — Reconnaitre f(x) = ax + b
//   affine_calculer_image      — Calculer images et antecedents
//   affine_determiner_expression — Determiner une fonction affine a partir de donnees
//   affine_signe               — Etudier le signe d'une fonction affine

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

function droiteCanvas(a: number, b: number, points?: { x: number; y: number; label?: string }[]): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    size: { width: 300, height: 300 },
    xmin: -6,
    xmax: 6,
    ymin: -6,
    ymax: 6,
    grille: true,
    courbes: [{ id: "f", type: "affine", a, b, couleur: "#2563eb" }],
    points,
  };
}

export const fonctionsAffinesBank: TutorBankItemV4[] = [
  /* ===================== AFFINE_FORME ===================== */

  {
    kind: "fixed",
    id: "seconde_aff_forme_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_forme",
    difficulty: 1,
    theme: "neutral",
    text: "Une fonction affine s'écrit sous la forme :",
    format: "qcm",
    choices: ["$f(x) = ax + b$", "$f(x) = ax^2 + b$", "$f(x) = \\dfrac{a}{x}$", "$f(x) = \\sqrt{x}$"],
    expected: ["$f(x) = ax + b$"],
    comparator: "mcq_exact",
    hint: "Pas de $x^2$, juste $x$.",
    explanation: exp(
      "Une fonction affine est de degré $1$.",
      "Elle s'écrit $f(x) = ax + b$.",
      "$a$ est le coefficient directeur, $b$ l'ordonnée à l'origine.",
      "$f(x) = ax + b$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_forme", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_forme_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_forme",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi ces fonctions, laquelle est affine ?",
    format: "qcm",
    choices: ["$f(x) = 3x - 2$", "$f(x) = x^2 + 1$", "$f(x) = \\dfrac{4}{x}$", "$f(x) = \\sqrt{x}$"],
    expected: ["$f(x) = 3x - 2$"],
    comparator: "mcq_exact",
    hint: "Forme $ax + b$.",
    explanation: exp(
      "Une fonction affine est de la forme $ax + b$.",
      "On écarte $x^2$, $\\dfrac{1}{x}$ et $\\sqrt{x}$.",
      "$3x - 2$ est de la forme $ax + b$.",
      "$f(x) = 3x - 2$ est affine."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_forme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_forme_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_forme",
    difficulty: 2,
    theme: "neutral",
    text: "La fonction $f(x) = 5$ (constante) est-elle une fonction affine ?",
    format: "qcm",
    choices: ["Oui, avec $a = 0$ et $b = 5$", "Non", "Oui, avec $a = 5$", "Non, car il n'y a pas de $x$"],
    expected: ["Oui, avec $a = 0$ et $b = 5$"],
    comparator: "mcq_exact",
    hint: "$5 = 0 \\times x + 5$.",
    explanation: exp(
      "Une fonction constante est un cas particulier de fonction affine.",
      "$f(x) = 5 = 0 \\times x + 5$.",
      "C'est $ax + b$ avec $a = 0$, $b = 5$.",
      "Oui, c'est affine avec $a = 0$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_forme", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_forme_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_forme",
    difficulty: 2,
    theme: "neutral",
    text: "Une fonction linéaire $f(x) = 2x$ est-elle aussi affine ?",
    format: "qcm",
    choices: ["Oui, avec $b = 0$", "Non", "Oui, avec $a = 0$", "Non, c'est différent"],
    expected: ["Oui, avec $b = 0$"],
    comparator: "mcq_exact",
    hint: "$2x = 2x + 0$.",
    explanation: exp(
      "Une fonction linéaire est une fonction affine particulière.",
      "$f(x) = 2x = 2x + 0$.",
      "C'est $ax + b$ avec $b = 0$.",
      "Oui, c'est affine avec $b = 0$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_forme", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_forme_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_forme",
    difficulty: 2,
    theme: "neutral",
    text: "Dans $f(x) = -4x + 7$, quel est le coefficient directeur ?",
    format: "short",
    expected: ["-4"],
    comparator: "number_equal",
    hint: "C'est $a$, le nombre devant $x$.",
    explanation: exp(
      "Dans $ax + b$, $a$ est le coefficient directeur.",
      "Ici le nombre devant $x$ est $-4$.",
      "Donc $a = -4$.",
      "Le coefficient directeur est $-4$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_forme", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_forme_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_forme",
    difficulty: 3,
    theme: "neutral",
    text: "La représentation graphique d'une fonction affine est :",
    format: "qcm",
    choices: ["une droite", "une parabole", "une hyperbole", "une courbe quelconque"],
    expected: ["une droite"],
    comparator: "mcq_exact",
    hint: "Degré $1$ → droite.",
    explanation: exp(
      "Une fonction affine est représentée graphiquement par une droite.",
      "Le coefficient directeur donne la pente, $b$ l'ordonnée à l'origine.",
      "C'est une droite.",
      "C'est une droite."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_forme", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_forme_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_forme",
    difficulty: 2,
    theme: "neutral",
    text: "Dans $f(x) = -4x + 7$, quelle est l'ordonnée à l'origine ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "C'est $b$, le terme constant.",
    explanation: exp(
      "Dans $ax + b$, $b$ est l'ordonnée à l'origine.",
      "Ici le terme constant est $7$.",
      "Donc $b = 7$.",
      "L'ordonnée à l'origine est $7$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_forme", "short"],
  },

  {
    kind: "template",
    id: "seconde_aff_forme_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_forme",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient directeur est le nombre devant $x$.",
    tags: ["seconde", "maths", "fonctions", "affine_forme", "template"],
    generate: () => {
      const a = randomInt(-6, 6) || 3;
      const b = randomInt(-6, 6);
      const sb = b >= 0 ? `+ ${b}` : `- ${-b}`;
      return {
        text: `Dans $f(x) = ${a}x ${sb}$, quel est le coefficient directeur ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient directeur est le facteur de $x$.",
          `Dans $${a}x ${sb}$, c'est $${a}$.`,
          `Donc $a = ${a}$.`,
          `Le coefficient directeur est $${a}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_aff_forme_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_forme",
    difficulty: 2,
    theme: "neutral",
    hint: "Affine = forme $ax + b$ (degré 1).",
    tags: ["seconde", "maths", "fonctions", "affine_forme", "raisonnement", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(1, 5);
      const correct = `$f(x) = ${a}x + ${b}$`;
      const choices = [correct, `$f(x) = ${a}x^2 + ${b}$`, `$f(x) = \\dfrac{${a}}{x}$`, `$f(x) = \\sqrt{x} + ${b}$`];
      return {
        text: "Parmi ces fonctions, laquelle est affine ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fonction affine est de la forme $ax + b$ (degré 1).",
          "On écarte $x^2$, $\\dfrac{1}{x}$, $\\sqrt{x}$.",
          `$${a}x + ${b}$ est de la forme $ax + b$.`,
          `$f(x) = ${a}x + ${b}$ est affine.`
        ),
      };
    },
  },

  /* ===================== AFFINE_CALCULER_IMAGE ===================== */

  {
    kind: "fixed",
    id: "seconde_aff_img_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_calculer_image",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $f(x) = 2x + 1$. Combien vaut $f(3)$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "On remplace $x$ par $3$.",
    explanation: exp(
      "On calcule l'image en remplaçant $x$.",
      "$f(3) = 2 \\times 3 + 1 = 6 + 1$.",
      "$= 7$.",
      "$f(3) = 7$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_image", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_img_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_calculer_image",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = -3x + 5$. Combien vaut $f(2)$ ?",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "$-3 \\times 2 + 5$.",
    explanation: exp(
      "On remplace $x$ par $2$ en respectant les signes.",
      "$f(2) = -3 \\times 2 + 5 = -6 + 5$.",
      "$= -1$.",
      "$f(2) = -1$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_image", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_img_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_calculer_image",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = 2x + 1$. Quel est l'antécédent de $9$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On résout $2x + 1 = 9$.",
    explanation: exp(
      "On résout $f(x) = 9$.",
      "$2x + 1 = 9 \\Rightarrow 2x = 8$.",
      "$x = 4$.",
      "L'antécédent de $9$ est $4$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_image", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_img_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_calculer_image",
    difficulty: 3,
    theme: "neutral",
    text: "Sur la droite ci-dessous (représentant $f(x) = 2x - 1$), quelle est l'image de $2$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    canvas: droiteCanvas(2, -1, [{ x: 2, y: 3, label: "A" }]),
    hint: "Ordonnée du point d'abscisse $2$.",
    explanation: exp(
      "L'image de $2$ est l'ordonnée du point d'abscisse $2$.",
      "On lit le point de la droite en $x = 2$.",
      "Son ordonnée est $3$ (et $2 \\times 2 - 1 = 3$).",
      "L'image de $2$ est $3$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_image", "short"],
  },

  {
    kind: "template",
    id: "seconde_aff_img_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_calculer_image",
    difficulty: 2,
    theme: "neutral",
    hint: "On remplace $x$ par la valeur.",
    tags: ["seconde", "maths", "fonctions", "affine_image", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(-5, 5);
      const x = randomInt(2, 6);
      const y = a * x + b;
      const sb = b >= 0 ? `+ ${b}` : `- ${-b}`;
      return {
        text: `Soit $f(x) = ${a}x ${sb}$. Combien vaut $f(${x})$ ?`,
        format: "short",
        expected: [String(y)],
        comparator: "number_equal",
        explanation: exp(
          "On remplace $x$ par la valeur donnée.",
          `$f(${x}) = ${a} \\times ${x} ${sb} = ${a * x} ${sb}$.`,
          `$= ${y}$.`,
          `$f(${x}) = ${y}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_aff_img_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_calculer_image",
    difficulty: 3,
    theme: "neutral",
    hint: "Antécédent → résoudre $f(x) = k$.",
    tags: ["seconde", "maths", "fonctions", "affine_image", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(-4, 4);
      const x = randomInt(2, 7);
      const k = a * x + b;
      const sb = b >= 0 ? `+ ${b}` : `- ${-b}`;
      return {
        text: `Soit $f(x) = ${a}x ${sb}$. Quel est l'antécédent de $${k}$ ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On résout $f(x) = k$.",
          `$${a}x ${sb} = ${k} \\Rightarrow ${a}x = ${k - b}$.`,
          `$x = ${x}$.`,
          `L'antécédent de $${k}$ est $${x}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_aff_img_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_calculer_image",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $f(x) = 4x - 5$. Combien vaut $f(0)$ ?",
    format: "short",
    expected: ["-5"],
    comparator: "number_equal",
    hint: "$f(0) = b$ (ordonnée à l'origine).",
    explanation: exp(
      "$f(0)$ donne l'ordonnée à l'origine.",
      "$f(0) = 4 \\times 0 - 5$.",
      "$= -5$.",
      "$f(0) = -5$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_image", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_img_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_calculer_image",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = -2x + 3$. Quel est l'antécédent de $1$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "On résout $-2x + 3 = 1$.",
    explanation: exp(
      "On résout $f(x) = 1$.",
      "$-2x + 3 = 1 \\Rightarrow -2x = -2$.",
      "$x = 1$.",
      "L'antécédent de $1$ est $1$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_image", "short"],
  },

  /* ===================== AFFINE_DETERMINER_EXPRESSION ===================== */

  {
    kind: "fixed",
    id: "seconde_aff_det_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_determiner_expression",
    difficulty: 2,
    theme: "neutral",
    text: "Une fonction affine a pour coefficient directeur $2$ et ordonnée à l'origine $3$. Quelle est son expression ?",
    format: "qcm",
    choices: ["$f(x) = 2x + 3$", "$f(x) = 3x + 2$", "$f(x) = 2x - 3$", "$f(x) = 2 + 3x$"],
    expected: ["$f(x) = 2x + 3$"],
    comparator: "mcq_exact",
    hint: "$f(x) = ax + b$ avec $a = 2$, $b = 3$.",
    explanation: exp(
      "On remplace $a$ et $b$ dans $f(x) = ax + b$.",
      "$a = 2$, $b = 3$.",
      "$f(x) = 2x + 3$.",
      "$f(x) = 2x + 3$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_determiner", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_det_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_determiner_expression",
    difficulty: 3,
    theme: "neutral",
    text: "Pour une fonction affine passant par $A(x_A\\,;y_A)$ et $B(x_B\\,;y_B)$, le coefficient directeur vaut :",
    format: "qcm",
    choices: [
      "$\\dfrac{y_B - y_A}{x_B - x_A}$",
      "$\\dfrac{x_B - x_A}{y_B - y_A}$",
      "$y_B - y_A$",
      "$\\dfrac{y_B + y_A}{x_B + x_A}$",
    ],
    expected: ["$\\dfrac{y_B - y_A}{x_B - x_A}$"],
    comparator: "mcq_exact",
    hint: "« Variation des $y$ sur variation des $x$ ».",
    explanation: exp(
      "Le coefficient directeur mesure la variation verticale par variation horizontale.",
      "$a = \\dfrac{\\Delta y}{\\Delta x} = \\dfrac{y_B - y_A}{x_B - x_A}$.",
      "C'est la formule du taux d'accroissement.",
      "$a = \\dfrac{y_B - y_A}{x_B - x_A}$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_determiner", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_det_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_determiner_expression",
    difficulty: 4,
    theme: "neutral",
    text: "Une fonction affine vérifie $f(0) = 1$ et $f(2) = 5$. Quel est son coefficient directeur ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$a = \\dfrac{f(2) - f(0)}{2 - 0}$.",
    explanation: exp(
      "On calcule le taux d'accroissement entre les deux points.",
      "$a = \\dfrac{5 - 1}{2 - 0} = \\dfrac{4}{2}$.",
      "$= 2$.",
      "Le coefficient directeur est $2$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_determiner", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_det_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_determiner_expression",
    difficulty: 4,
    theme: "neutral",
    text: "Une fonction affine vérifie $f(0) = 1$ et $f(2) = 5$. Quelle est son expression ?",
    format: "qcm",
    choices: ["$f(x) = 2x + 1$", "$f(x) = 2x + 5$", "$f(x) = x + 1$", "$f(x) = 4x + 1$"],
    expected: ["$f(x) = 2x + 1$"],
    comparator: "mcq_exact",
    hint: "$a = 2$ (calculé), et $b = f(0) = 1$.",
    explanation: exp(
      "On détermine $a$ puis $b$.",
      "$a = \\dfrac{5 - 1}{2 - 0} = 2$ ; $b = f(0) = 1$.",
      "$f(x) = 2x + 1$.",
      "$f(x) = 2x + 1$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_determiner", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_aff_det_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_determiner_expression",
    difficulty: 3,
    theme: "neutral",
    hint: "$f(x) = ax + b$ avec les valeurs données.",
    tags: ["seconde", "maths", "fonctions", "affine_determiner", "template"],
    generate: () => {
      const a = randomInt(-4, 4) || 2;
      const b = randomInt(-4, 4);
      const sb = b >= 0 ? `+ ${b}` : `- ${-b}`;
      const correct = `$f(x) = ${a}x ${sb}$`;
      const sb2 = -b >= 0 ? `+ ${-b}` : `- ${b}`;
      const choices = [correct, `$f(x) = ${b}x ${sb}$`, `$f(x) = ${a}x ${sb2}$`, `$f(x) = ${-a}x ${sb}$`];
      return {
        text: `Une fonction affine a pour coefficient directeur $${a}$ et ordonnée à l'origine $${b}$. Quelle est son expression ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On remplace $a$ et $b$ dans $f(x) = ax + b$.",
          `$a = ${a}$, $b = ${b}$.`,
          `$f(x) = ${a}x ${sb}$.`,
          `$f(x) = ${a}x ${sb}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_aff_det_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_determiner_expression",
    difficulty: 4,
    theme: "neutral",
    hint: "$a = \\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$.",
    tags: ["seconde", "maths", "fonctions", "affine_determiner", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(-3, 3);
      const x2 = randomInt(2, 5);
      const f0 = b;
      const fx2 = a * x2 + b;
      return {
        text: `Une fonction affine vérifie $f(0) = ${f0}$ et $f(${x2}) = ${fx2}$. Quel est son coefficient directeur ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: exp(
          "On calcule le taux d'accroissement.",
          `$a = \\dfrac{${fx2} - ${f0}}{${x2} - 0} = \\dfrac{${fx2 - f0}}{${x2}}$.`,
          `$= ${a}$.`,
          `Le coefficient directeur est $${a}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_aff_det_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_determiner_expression",
    difficulty: 3,
    theme: "neutral",
    text: "Une fonction linéaire vérifie $f(4) = 12$. Quel est son coefficient directeur ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Linéaire : $f(x) = ax$, donc $a = \\dfrac{f(4)}{4}$.",
    explanation: exp(
      "Une fonction linéaire est de la forme $f(x) = ax$ (pas de $b$).",
      "$f(4) = 4a = 12$.",
      "$a = \\dfrac{12}{4} = 3$.",
      "Le coefficient directeur est $3$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_determiner", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_det_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_determiner_expression",
    difficulty: 4,
    theme: "neutral",
    text: "Une fonction affine vérifie $f(1) = 5$ et $f(3) = 11$. Quel est son coefficient directeur ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$a = \\dfrac{11 - 5}{3 - 1}$.",
    explanation: exp(
      "On calcule le taux d'accroissement entre les deux points.",
      "$a = \\dfrac{11 - 5}{3 - 1} = \\dfrac{6}{2}$.",
      "$= 3$.",
      "Le coefficient directeur est $3$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_determiner", "short"],
  },

  /* ===================== AFFINE_SIGNE ===================== */

  {
    kind: "fixed",
    id: "seconde_aff_sig_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_signe",
    difficulty: 2,
    theme: "neutral",
    text: "Pour étudier le signe de $f(x) = 2x - 6$, on cherche d'abord :",
    format: "qcm",
    choices: ["la valeur qui annule $f$", "le maximum de $f$", "l'aire sous la courbe", "la moyenne"],
    expected: ["la valeur qui annule $f$"],
    comparator: "mcq_exact",
    hint: "On résout $f(x) = 0$.",
    explanation: exp(
      "Le signe d'une fonction affine change en son zéro.",
      "On cherche donc la valeur qui annule $f$.",
      "On résout $f(x) = 0$.",
      "On cherche la valeur qui annule $f$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_signe", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_sig_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_signe",
    difficulty: 2,
    theme: "neutral",
    text: "En quelle valeur la fonction $f(x) = 2x - 6$ s'annule-t-elle ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "On résout $2x - 6 = 0$.",
    explanation: exp(
      "On résout $f(x) = 0$.",
      "$2x - 6 = 0 \\Rightarrow 2x = 6$.",
      "$x = 3$.",
      "$f$ s'annule en $3$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_signe", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_sig_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_signe",
    difficulty: 3,
    theme: "neutral",
    text: "Sur quel intervalle $f(x) = 2x - 6$ est-elle positive ?",
    format: "qcm",
    choices: ["$[3\\,;+\\infty[$", "$]-\\infty\\,;3]$", "$[0\\,;3]$", "$]-\\infty\\,;0]$"],
    expected: ["$[3\\,;+\\infty[$"],
    comparator: "mcq_exact",
    canvas: droiteCanvas(2, -6, [{ x: 3, y: 0, label: "S" }]),
    hint: "$f$ s'annule en $3$ et $a > 0$ (croissante).",
    explanation: exp(
      "$f$ s'annule en $3$ ; comme $a = 2 > 0$, elle est croissante.",
      "Elle est donc négative avant $3$ et positive après.",
      "$f(x) \\ge 0$ sur $[3\\,;+\\infty[$.",
      "Positive sur $[3\\,;+\\infty[$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_signe", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_sig_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_signe",
    difficulty: 4,
    theme: "neutral",
    text: "Sur quel intervalle $f(x) = -2x + 4$ est-elle positive ?",
    format: "qcm",
    choices: ["$]-\\infty\\,;2]$", "$[2\\,;+\\infty[$", "$[0\\,;2]$", "$]-\\infty\\,;0]$"],
    expected: ["$]-\\infty\\,;2]$"],
    comparator: "mcq_exact",
    canvas: droiteCanvas(-2, 4, [{ x: 2, y: 0, label: "S" }]),
    hint: "$f$ s'annule en $2$ et $a < 0$ (décroissante).",
    explanation: exp(
      "$f$ s'annule en $2$ ; comme $a = -2 < 0$, elle est décroissante.",
      "Elle est donc positive avant $2$ et négative après.",
      "$f(x) \\ge 0$ sur $]-\\infty\\,;2]$.",
      "Positive sur $]-\\infty\\,;2]$."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_signe", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_aff_sig_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_signe",
    difficulty: 3,
    theme: "neutral",
    text: "Le signe d'une fonction affine $f(x) = ax + b$ dépend surtout :",
    format: "qcm",
    choices: [
      "du signe de $a$ et de la position par rapport au zéro",
      "uniquement de $b$",
      "de l'aire de la droite",
      "de la valeur de $f(0)$ seulement",
    ],
    expected: ["du signe de $a$ et de la position par rapport au zéro"],
    comparator: "mcq_exact",
    hint: "Croissante ou décroissante, et où elle s'annule.",
    explanation: exp(
      "Le signe change au zéro de la fonction.",
      "Le sens (signe de $a$) dit de quel côté c'est positif.",
      "On combine zéro + signe de $a$.",
      "Du signe de $a$ et de la position par rapport au zéro."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_signe", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_aff_sig_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_signe",
    difficulty: 3,
    theme: "neutral",
    hint: "On résout $ax + b = 0$.",
    tags: ["seconde", "maths", "fonctions", "affine_signe", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const x0 = randomInt(1, 6);
      const b = -a * x0;
      const sb = b >= 0 ? `+ ${b}` : `- ${-b}`;
      return {
        text: `En quelle valeur la fonction $f(x) = ${a}x ${sb}$ s'annule-t-elle ?`,
        format: "short",
        expected: [String(x0)],
        comparator: "number_equal",
        explanation: exp(
          "On résout $f(x) = 0$.",
          `$${a}x ${sb} = 0 \\Rightarrow ${a}x = ${-b}$.`,
          `$x = ${x0}$.`,
          `$f$ s'annule en $${x0}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_aff_sig_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_signe",
    difficulty: 4,
    theme: "neutral",
    hint: "$a > 0$ : positive après le zéro.",
    tags: ["seconde", "maths", "fonctions", "affine_signe", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const x0 = randomInt(1, 5);
      const b = -a * x0;
      const sb = b >= 0 ? `+ ${b}` : `- ${-b}`;
      const correct = `$[${x0}\\,;+\\infty[$`;
      const choices = [correct, `$]-\\infty\\,;${x0}]$`, `$[0\\,;${x0}]$`, `$]-\\infty\\,;0]$`];
      return {
        text: `Sur quel intervalle $f(x) = ${a}x ${sb}$ est-elle positive ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On cherche le zéro, puis on utilise le signe de $a$.",
          `$f$ s'annule en $${x0}$ ; $a = ${a} > 0$ (croissante).`,
          `Donc $f(x) \\ge 0$ après $${x0}$.`,
          `Positive sur $[${x0}\\,;+\\infty[$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_aff_sig_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_signe",
    difficulty: 2,
    theme: "neutral",
    text: "Une fonction affine croissante est négative puis positive. Le changement de signe a lieu :",
    format: "qcm",
    choices: ["en son zéro (là où $f(x) = 0$)", "en $x = 0$ toujours", "au maximum", "jamais"],
    expected: ["en son zéro (là où $f(x) = 0$)"],
    comparator: "mcq_exact",
    hint: "Le signe change quand $f$ s'annule.",
    explanation: exp(
      "Une fonction affine change de signe en son unique zéro.",
      "Avant : un signe ; après : le signe opposé.",
      "Le changement a lieu là où $f(x) = 0$.",
      "En son zéro."
    ),
    tags: ["seconde", "maths", "fonctions", "affine_signe", "raisonnement", "qcm"],
  },
];
