// lib/tutor-v4/questionBank/seconde/maths/fonction-vocabulaire.bank.ts
//
// Chapitre : Fonctions - vocabulaire et representations (notion fonction_vocabulaire_2de)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Canvas : "fonctionGraphique" (courbe + points) et "fonction_tableau" (table de valeurs).
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   fonction_vocabulaire        — Image, antecedent, courbe representative
//   fonction_image_formule      — Calculer une image avec une formule
//   fonction_antecedent         — Rechercher un antecedent
//   fonction_tableau_graphique  — Passer d'un tableau a un graphique
//   fonction_resolution_graphique — Resoudre f(x)=k graphiquement
//   fonction_tableau_signes     — Tableau de signes (equation/inequation produit/quotient)
//   fonction_parite             — Reconnaitre une fonction paire ou impaire

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

function tableValeurs(xValues: number[], yValues: number[], highlightIndex?: number): CanvasFigure {
  return {
    kind: "fonction_tableau",
    titre: "Tableau de valeurs",
    xValues,
    yValues,
    highlightIndex,
    size: { width: 320, height: 120 },
  };
}

function courbeAffine(a: number, b: number, points?: { x: number; y: number; label?: string }[]): CanvasFigure {
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

export const fonctionVocabulaireBank: TutorBankItemV4[] = [
  /* ===================== FONCTION_VOCABULAIRE ===================== */

  {
    kind: "fixed",
    id: "seconde_fct_voc_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Si $f(3) = 7$, comment appelle-t-on le nombre $7$ ?",
    format: "qcm",
    choices: ["L'image de $3$ par $f$", "Un antécédent de $3$", "La pente de $f$", "L'ordonnée à l'origine"],
    expected: ["L'image de $3$ par $f$"],
    comparator: "mcq_exact",
    hint: "$f(3)$ est l'image de $3$.",
    explanation: exp(
      "$f(x)$ est l'image de $x$ par la fonction $f$.",
      "Ici on calcule $f(3) = 7$.",
      "$7$ est donc l'image de $3$.",
      "$7$ est l'image de $3$ par $f$."
    ),
    tags: ["seconde", "maths", "fonctions", "vocabulaire", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_voc_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Si $f(3) = 7$, comment appelle-t-on le nombre $3$ ?",
    format: "qcm",
    choices: ["Un antécédent de $7$", "L'image de $7$", "La pente de $f$", "Le maximum de $f$"],
    expected: ["Un antécédent de $7$"],
    comparator: "mcq_exact",
    hint: "$3$ est ce qu'on « envoie » sur $7$.",
    explanation: exp(
      "Un antécédent de $k$ est un nombre dont l'image est $k$.",
      "Ici $f(3) = 7$.",
      "$3$ est donc un antécédent de $7$.",
      "$3$ est un antécédent de $7$."
    ),
    tags: ["seconde", "maths", "fonctions", "vocabulaire", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_voc_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Rechercher un antécédent de $5$ par $f$, c'est résoudre :",
    format: "qcm",
    choices: ["$f(x) = 5$", "$f(5) = x$", "$x = 5$", "$f(x) = 0$"],
    expected: ["$f(x) = 5$"],
    comparator: "mcq_exact",
    hint: "On cherche $x$ dont l'image vaut $5$.",
    explanation: exp(
      "Un antécédent de $5$ est un $x$ tel que $f(x) = 5$.",
      "On traduit la recherche d'antécédent par une équation.",
      "On résout donc $f(x) = 5$.",
      "On résout $f(x) = 5$."
    ),
    tags: ["seconde", "maths", "fonctions", "vocabulaire", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_voc_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "La courbe représentative de $f$ est l'ensemble des points de coordonnées :",
    format: "qcm",
    choices: ["$(x\\,;f(x))$", "$(f(x)\\,;x)$", "$(x\\,;x)$", "$(0\\,;f(x))$"],
    expected: ["$(x\\,;f(x))$"],
    comparator: "mcq_exact",
    hint: "Abscisse $x$, ordonnée $f(x)$.",
    explanation: exp(
      "La courbe relie chaque $x$ à son image.",
      "Le point a pour abscisse $x$ et pour ordonnée $f(x)$.",
      "L'ensemble des points $(x\\,;f(x))$ forme la courbe.",
      "Les points sont $(x\\,;f(x))$."
    ),
    tags: ["seconde", "maths", "fonctions", "vocabulaire", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_voc_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "On sait que $f(2) = 9$. Quelle est l'image de $2$ par $f$ ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "L'image de $2$ est $f(2)$.",
    explanation: exp(
      "L'image de $2$ est la valeur $f(2)$.",
      "On lit $f(2) = 9$.",
      "Donc l'image de $2$ est $9$.",
      "L'image de $2$ est $9$."
    ),
    tags: ["seconde", "maths", "fonctions", "vocabulaire", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_voc_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Un nombre peut-il avoir plusieurs antécédents par une fonction ?",
    format: "qcm",
    choices: [
      "Oui, plusieurs $x$ peuvent avoir la même image",
      "Non, jamais",
      "Oui, mais seulement pour les fonctions affines",
      "Non, sauf en $0$",
    ],
    expected: ["Oui, plusieurs $x$ peuvent avoir la même image"],
    comparator: "mcq_exact",
    hint: "Pense à la fonction carré : $f(2) = f(-2) = 4$.",
    explanation: exp(
      "Plusieurs antécédents sont possibles (contrairement à l'image, unique).",
      "Ex. fonction carré : $f(2) = 4$ et $f(-2) = 4$.",
      "$4$ a donc deux antécédents : $2$ et $-2$.",
      "Oui, un nombre peut avoir plusieurs antécédents."
    ),
    tags: ["seconde", "maths", "fonctions", "vocabulaire", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_voc_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Un nombre $x$ peut-il avoir deux images différentes par une même fonction $f$ ?",
    format: "qcm",
    choices: [
      "Non, l'image est unique",
      "Oui, toujours deux",
      "Oui, si $x$ est négatif",
      "Cela dépend de la courbe",
    ],
    expected: ["Non, l'image est unique"],
    comparator: "mcq_exact",
    hint: "C'est la définition même d'une fonction.",
    explanation: exp(
      "Une fonction associe à chaque $x$ une seule image.",
      "C'est la définition d'une fonction.",
      "Donc l'image de $x$ est unique.",
      "Non, l'image est unique."
    ),
    tags: ["seconde", "maths", "fonctions", "vocabulaire", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_fct_voc_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "$f(a) = b$ : $b$ est l'image de $a$.",
    tags: ["seconde", "maths", "fonctions", "vocabulaire", "template"],
    generate: () => {
      const a = randomInt(1, 8);
      const b = randomInt(1, 12);
      return {
        text: `On sait que $f(${a}) = ${b}$. Quelle est l'image de $${a}$ par $f$ ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation: exp(
          "L'image de $a$ est $f(a)$.",
          `On lit $f(${a}) = ${b}$.`,
          `Donc l'image de $${a}$ est $${b}$.`,
          `L'image de $${a}$ est $${b}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_voc_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "$f(a) = b$ : $a$ est un antécédent de $b$.",
    tags: ["seconde", "maths", "fonctions", "vocabulaire", "raisonnement", "template"],
    generate: () => {
      const a = randomInt(1, 8);
      const b = randomInt(1, 12);
      const correct = `$${a}$ est un antécédent de $${b}$`;
      const choices = [
        correct,
        `$${a}$ est l'image de $${b}$`,
        `$${b}$ est un antécédent de $${a}$`,
        `$${a}$ et $${b}$ sont égaux`,
      ];
      return {
        text: `On sait que $f(${a}) = ${b}$. Quelle affirmation est correcte ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "$f(a) = b$ se lit dans les deux sens.",
          `$${b}$ est l'image de $${a}$ ; $${a}$ est un antécédent de $${b}$.`,
          "On choisit la formulation correcte.",
          `$${a}$ est un antécédent de $${b}$.`
        ),
      };
    },
  },

  /* ===================== FONCTION_IMAGE_FORMULE ===================== */

  {
    kind: "fixed",
    id: "seconde_fct_img_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_image_formule",
    difficulty: 1,
    theme: "neutral",
    text: "Soit $f(x) = 2x - 3$. Combien vaut $f(4)$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "On remplace $x$ par $4$.",
    explanation: exp(
      "Calculer une image, c'est remplacer $x$ par la valeur donnée.",
      "$f(4) = 2 \\times 4 - 3$.",
      "$= 8 - 3 = 5$.",
      "$f(4) = 5$."
    ),
    tags: ["seconde", "maths", "fonctions", "image", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_img_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_image_formule",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $f(x) = x^2$. Combien vaut $f(3)$ ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "$f(3) = 3^2$.",
    explanation: exp(
      "On remplace $x$ par $3$ dans $x^2$.",
      "$f(3) = 3^2$.",
      "$= 9$.",
      "$f(3) = 9$."
    ),
    tags: ["seconde", "maths", "fonctions", "image", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_img_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_image_formule",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = x^2 + 1$. Combien vaut $f(-2)$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$(-2)^2 = 4$.",
    explanation: exp(
      "On remplace $x$ par $-2$ en respectant les signes.",
      "$f(-2) = (-2)^2 + 1 = 4 + 1$.",
      "$= 5$.",
      "$f(-2) = 5$."
    ),
    tags: ["seconde", "maths", "fonctions", "image", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_img_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_image_formule",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer une image, c'est :",
    format: "qcm",
    choices: [
      "remplacer $x$ par la valeur donnée dans l'expression",
      "résoudre une équation",
      "tracer la courbe",
      "calculer la pente",
    ],
    expected: ["remplacer $x$ par la valeur donnée dans l'expression"],
    comparator: "mcq_exact",
    hint: "On substitue la valeur de $x$.",
    explanation: exp(
      "L'image $f(a)$ s'obtient par substitution.",
      "On remplace $x$ par $a$ dans l'expression de $f$.",
      "Puis on calcule.",
      "On remplace $x$ par la valeur donnée."
    ),
    tags: ["seconde", "maths", "fonctions", "image", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_fct_img_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_image_formule",
    difficulty: 2,
    theme: "neutral",
    hint: "On remplace $x$ par la valeur.",
    tags: ["seconde", "maths", "fonctions", "image", "template"],
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
          `$f(${x}) = ${a} \\times ${x} ${sb}$.`,
          `$= ${a * x} ${sb} = ${y}$.`,
          `$f(${x}) = ${y}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_img_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_image_formule",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention au carré d'un nombre négatif.",
    tags: ["seconde", "maths", "fonctions", "image", "template"],
    generate: () => {
      const c = randomInt(1, 6);
      const x = randomInt(-4, -1);
      const y = x * x + c;
      return {
        text: `Soit $f(x) = x^2 + ${c}$. Combien vaut $f(${x})$ ?`,
        format: "short",
        expected: [String(y)],
        comparator: "number_equal",
        explanation: exp(
          "On remplace $x$ en respectant le carré.",
          `$f(${x}) = (${x})^2 + ${c} = ${x * x} + ${c}$.`,
          `$= ${y}$.`,
          `$f(${x}) = ${y}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_fct_img_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_image_formule",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = 3x^2 - 2x$. Combien vaut $f(2)$ ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "$3 \\times 2^2 - 2 \\times 2$.",
    explanation: exp(
      "On remplace $x$ par $2$.",
      "$f(2) = 3 \\times 2^2 - 2 \\times 2 = 12 - 4$.",
      "$= 8$.",
      "$f(2) = 8$."
    ),
    tags: ["seconde", "maths", "fonctions", "image", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_img_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_image_formule",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = 5$. Combien vaut $f(100)$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "C'est une fonction constante.",
    explanation: exp(
      "$f$ est une fonction constante : elle vaut toujours $5$.",
      "Quelle que soit la valeur de $x$, $f(x) = 5$.",
      "$f(100) = 5$.",
      "$f(100) = 5$."
    ),
    tags: ["seconde", "maths", "fonctions", "image", "raisonnement", "short"],
  },

  /* ===================== FONCTION_ANTECEDENT ===================== */

  {
    kind: "fixed",
    id: "seconde_fct_ant_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_antecedent",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $f(x) = 2x - 3$. Quel est l'antécédent de $7$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "On résout $2x - 3 = 7$.",
    explanation: exp(
      "Chercher un antécédent de $7$, c'est résoudre $f(x) = 7$.",
      "$2x - 3 = 7 \\Rightarrow 2x = 10$.",
      "$x = 5$.",
      "L'antécédent de $7$ est $5$."
    ),
    tags: ["seconde", "maths", "fonctions", "antecedent", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_ant_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_antecedent",
    difficulty: 2,
    theme: "neutral",
    text: "Pour trouver un antécédent de $k$ par $f$, on :",
    format: "qcm",
    choices: ["résout l'équation $f(x) = k$", "calcule $f(k)$", "trace la courbe", "calcule la pente"],
    expected: ["résout l'équation $f(x) = k$"],
    comparator: "mcq_exact",
    hint: "On cherche $x$, pas une image.",
    explanation: exp(
      "Un antécédent de $k$ est un $x$ tel que $f(x) = k$.",
      "On pose donc l'équation $f(x) = k$.",
      "On la résout pour trouver $x$.",
      "On résout $f(x) = k$."
    ),
    tags: ["seconde", "maths", "fonctions", "antecedent", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_ant_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_antecedent",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = 3x + 1$. Quel est l'antécédent de $10$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "On résout $3x + 1 = 10$.",
    explanation: exp(
      "On résout $f(x) = 10$.",
      "$3x + 1 = 10 \\Rightarrow 3x = 9$.",
      "$x = 3$.",
      "L'antécédent de $10$ est $3$."
    ),
    tags: ["seconde", "maths", "fonctions", "antecedent", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_ant_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_antecedent",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^2$. Combien $9$ a-t-il d'antécédents ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$x^2 = 9$ : pense à $3$ et $-3$.",
    explanation: exp(
      "On résout $x^2 = 9$.",
      "Deux solutions : $x = 3$ et $x = -3$.",
      "Donc $9$ a deux antécédents.",
      "$9$ a $2$ antécédents."
    ),
    tags: ["seconde", "maths", "fonctions", "antecedent", "raisonnement", "short"],
  },

  {
    kind: "template",
    id: "seconde_fct_ant_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_antecedent",
    difficulty: 3,
    theme: "neutral",
    hint: "On résout $f(x) = k$.",
    tags: ["seconde", "maths", "fonctions", "antecedent", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(-5, 5);
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
    kind: "template",
    id: "seconde_fct_ant_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_antecedent",
    difficulty: 2,
    theme: "neutral",
    hint: "Antécédent → résoudre une équation.",
    tags: ["seconde", "maths", "fonctions", "antecedent", "raisonnement", "template"],
    generate: () => {
      const k = randomInt(3, 12);
      const correct = `Résoudre $f(x) = ${k}$`;
      const choices = [correct, `Calculer $f(${k})$`, `Tracer la courbe`, `Calculer la pente`];
      return {
        text: `Pour trouver un antécédent de $${k}$ par $f$, que fait-on ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un antécédent de $k$ vérifie $f(x) = k$.",
          `On pose l'équation $f(x) = ${k}$.`,
          "On la résout pour trouver $x$.",
          `On résout $f(x) = ${k}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_fct_ant_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_antecedent",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = x - 4$. Quel est l'antécédent de $0$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On résout $x - 4 = 0$.",
    explanation: exp(
      "On résout $f(x) = 0$.",
      "$x - 4 = 0 \\Rightarrow x = 4$.",
      "L'antécédent de $0$ est $4$.",
      "L'antécédent de $0$ est $4$."
    ),
    tags: ["seconde", "maths", "fonctions", "antecedent", "short"],
  },

  /* ===================== FONCTION_TABLEAU_GRAPHIQUE ===================== */

  {
    kind: "fixed",
    id: "seconde_fct_tab_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "D'après le tableau de valeurs ci-dessous, combien vaut $f(2)$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    canvas: tableValeurs([1, 2, 3, 4], [3, 5, 7, 9], 1),
    hint: "On lit l'image associée à $x = 2$.",
    explanation: exp(
      "Le tableau associe à chaque $x$ son image $f(x)$.",
      "On repère la colonne $x = 2$.",
      "L'image correspondante est $5$.",
      "$f(2) = 5$."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_tab_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "D'après le tableau ci-dessous, quel est un antécédent de $7$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    canvas: tableValeurs([1, 2, 3, 4], [3, 5, 7, 9], 2),
    hint: "On cherche le $x$ dont l'image est $7$.",
    explanation: exp(
      "On lit le tableau « à l'envers » : on cherche $f(x) = 7$.",
      "L'image $7$ se trouve dans la colonne $x = 3$.",
      "Donc un antécédent de $7$ est $3$.",
      "Un antécédent de $7$ est $3$."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_tab_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Sur la courbe ci-dessous (droite $y = 2x - 1$), quelle est l'image de $2$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    canvas: courbeAffine(2, -1, [{ x: 2, y: 3, label: "A" }]),
    hint: "On lit l'ordonnée du point d'abscisse $2$.",
    explanation: exp(
      "L'image de $2$ se lit comme l'ordonnée du point d'abscisse $2$.",
      "On repère le point de la courbe en $x = 2$.",
      "Son ordonnée est $3$.",
      "L'image de $2$ est $3$."
    ),
    tags: ["seconde", "maths", "fonctions", "graphique", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_tab_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un graphique, l'image d'un nombre $a$ se lit :",
    format: "qcm",
    choices: [
      "comme l'ordonnée du point de la courbe d'abscisse $a$",
      "comme l'abscisse du point d'ordonnée $a$",
      "comme la pente de la courbe",
      "comme l'aire sous la courbe",
    ],
    expected: ["comme l'ordonnée du point de la courbe d'abscisse $a$"],
    comparator: "mcq_exact",
    hint: "On monte depuis $a$ sur l'axe des abscisses jusqu'à la courbe.",
    explanation: exp(
      "Pour lire $f(a)$, on part de $a$ sur l'axe horizontal.",
      "On monte jusqu'à la courbe, puis on lit l'ordonnée.",
      "C'est l'ordonnée du point d'abscisse $a$.",
      "L'image se lit comme l'ordonnée du point d'abscisse $a$."
    ),
    tags: ["seconde", "maths", "fonctions", "graphique", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_fct_tab_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "On lit l'image dans la bonne colonne.",
    tags: ["seconde", "maths", "fonctions", "tableau", "template"],
    generate: () => {
      const xs = [1, 2, 3, 4, 5];
      const a = randomInt(2, 3);
      const b = randomInt(0, 3);
      const ys = xs.map((x) => a * x + b);
      const idx = randomInt(0, xs.length - 1);
      return {
        text: `D'après le tableau de valeurs ci-dessous, combien vaut $f(${xs[idx]})$ ?`,
        format: "short",
        expected: [String(ys[idx])],
        comparator: "number_equal",
        canvas: tableValeurs(xs, ys, idx),
        explanation: exp(
          "Le tableau associe à chaque $x$ son image.",
          `On repère la colonne $x = ${xs[idx]}$.`,
          `L'image correspondante est $${ys[idx]}$.`,
          `$f(${xs[idx]}) = ${ys[idx]}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_tab_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche la colonne dont l'image correspond.",
    tags: ["seconde", "maths", "fonctions", "tableau", "template"],
    generate: () => {
      const xs = [1, 2, 3, 4, 5];
      const ys = xs.map((x) => 2 * x + 1);
      const idx = randomInt(0, xs.length - 1);
      return {
        text: `D'après le tableau ci-dessous, quel est un antécédent de $${ys[idx]}$ ?`,
        format: "short",
        expected: [String(xs[idx])],
        comparator: "number_equal",
        canvas: tableValeurs(xs, ys, idx),
        explanation: exp(
          "On cherche le $x$ dont l'image vaut la valeur donnée.",
          `L'image $${ys[idx]}$ est dans la colonne $x = ${xs[idx]}$.`,
          `Donc un antécédent est $${xs[idx]}$.`,
          `Un antécédent de $${ys[idx]}$ est $${xs[idx]}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_fct_tab_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_graphique",
    difficulty: 4,
    theme: "neutral",
    text: "Sur la courbe ci-dessous (droite $y = 2x - 1$), quel est l'antécédent de $5$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    canvas: courbeAffine(2, -1, [{ x: 3, y: 5, label: "B" }]),
    hint: "On cherche l'abscisse du point d'ordonnée $5$.",
    explanation: exp(
      "On lit l'antécédent : abscisse du point d'ordonnée $5$.",
      "On part de $5$ sur l'axe vertical, on rejoint la courbe.",
      "L'abscisse correspondante est $3$.",
      "L'antécédent de $5$ est $3$."
    ),
    tags: ["seconde", "maths", "fonctions", "graphique", "short"],
  },

  /* ===================== FONCTION_RESOLUTION_GRAPHIQUE ===================== */

  {
    kind: "fixed",
    id: "seconde_fct_res_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_resolution_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "Pour résoudre graphiquement $f(x) = 3$, on trace :",
    format: "qcm",
    choices: [
      "la droite horizontale $y = 3$ et on lit les abscisses des points d'intersection",
      "la droite verticale $x = 3$",
      "la tangente à la courbe",
      "l'axe des abscisses",
    ],
    expected: ["la droite horizontale $y = 3$ et on lit les abscisses des points d'intersection"],
    comparator: "mcq_exact",
    hint: "$f(x) = 3$ : on cherche où la courbe atteint la hauteur $3$.",
    explanation: exp(
      "Résoudre $f(x) = 3$, c'est trouver les $x$ dont l'image est $3$.",
      "On trace $y = 3$ et on repère les intersections avec la courbe.",
      "Les abscisses de ces points sont les solutions.",
      "On trace la droite horizontale $y = 3$."
    ),
    tags: ["seconde", "maths", "fonctions", "resolution_graphique", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_res_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_resolution_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Sur la courbe ci-dessous (droite $y = 2x - 1$), quelle est la solution de $f(x) = 5$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    canvas: courbeAffine(2, -1, [{ x: 3, y: 5, label: "S" }]),
    hint: "On repère le point de la courbe d'ordonnée $5$.",
    explanation: exp(
      "Résoudre $f(x) = 5$, c'est trouver $x$ tel que l'image vaut $5$.",
      "On repère sur la courbe le point d'ordonnée $5$.",
      "Son abscisse est $3$.",
      "La solution est $x = 3$."
    ),
    tags: ["seconde", "maths", "fonctions", "resolution_graphique", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_res_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_resolution_graphique",
    difficulty: 4,
    theme: "neutral",
    text: "Pour résoudre graphiquement $f(x) = g(x)$, on cherche :",
    format: "qcm",
    choices: [
      "les abscisses des points d'intersection des deux courbes",
      "les ordonnées à l'origine",
      "les pentes des deux courbes",
      "l'aire entre les courbes",
    ],
    expected: ["les abscisses des points d'intersection des deux courbes"],
    comparator: "mcq_exact",
    hint: "$f(x) = g(x)$ : les deux courbes ont la même hauteur.",
    explanation: exp(
      "$f(x) = g(x)$ signifie que les deux courbes se rencontrent.",
      "On cherche leurs points d'intersection.",
      "Les abscisses de ces points sont les solutions.",
      "On cherche les abscisses des points d'intersection."
    ),
    tags: ["seconde", "maths", "fonctions", "resolution_graphique", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_res_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_resolution_graphique",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction carré $f(x) = x^2$ : combien l'équation $f(x) = 4$ a-t-elle de solutions ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "La droite $y = 4$ coupe la parabole en deux points.",
    explanation: exp(
      "On résout $x^2 = 4$ (graphiquement : $y = 4$ coupe la parabole).",
      "Les solutions sont $x = 2$ et $x = -2$.",
      "Il y a donc deux points d'intersection.",
      "L'équation a $2$ solutions."
    ),
    tags: ["seconde", "maths", "fonctions", "resolution_graphique", "raisonnement", "short"],
  },

  {
    kind: "template",
    id: "seconde_fct_res_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_resolution_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "On lit l'abscisse du point de la droite d'ordonnée $k$.",
    tags: ["seconde", "maths", "fonctions", "resolution_graphique", "template"],
    generate: () => {
      const a = randomInt(1, 2);
      const b = randomInt(-2, 2);
      const x = randomInt(1, 4);
      const k = a * x + b;
      return {
        text: `Sur la courbe ci-dessous (droite $y = ${a}x ${b >= 0 ? `+ ${b}` : `- ${-b}`}$), quelle est la solution de $f(x) = ${k}$ ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        canvas: courbeAffine(a, b, [{ x, y: k, label: "S" }]),
        explanation: exp(
          "Résoudre $f(x) = k$, c'est trouver l'abscisse du point d'ordonnée $k$.",
          `On repère le point de la droite d'ordonnée $${k}$.`,
          `Son abscisse est $${x}$.`,
          `La solution est $x = ${x}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_res_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_resolution_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "$f(x) = k$ → droite horizontale $y = k$.",
    tags: ["seconde", "maths", "fonctions", "resolution_graphique", "raisonnement", "template"],
    generate: () => {
      const k = randomInt(2, 6);
      const correct = `La droite horizontale $y = ${k}$`;
      const choices = [correct, `La droite verticale $x = ${k}$`, `L'axe des abscisses`, `La tangente en $0$`];
      return {
        text: `Pour résoudre graphiquement $f(x) = ${k}$, quelle droite trace-t-on ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On cherche où la courbe atteint la hauteur $k$.",
          `On trace la droite horizontale $y = ${k}$.`,
          "Les abscisses des intersections sont les solutions.",
          `On trace $y = ${k}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_fct_res_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_resolution_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Résoudre graphiquement $f(x) < 0$, c'est repérer :",
    format: "qcm",
    choices: [
      "les $x$ pour lesquels la courbe est sous l'axe des abscisses",
      "les $x$ pour lesquels la courbe est au-dessus de l'axe",
      "le maximum de la courbe",
      "l'ordonnée à l'origine",
    ],
    expected: ["les $x$ pour lesquels la courbe est sous l'axe des abscisses"],
    comparator: "mcq_exact",
    hint: "$f(x) < 0$ : image négative.",
    explanation: exp(
      "$f(x) < 0$ signifie que l'image est négative.",
      "Graphiquement, la courbe est en dessous de l'axe des abscisses.",
      "On repère les $x$ correspondants.",
      "Ce sont les $x$ où la courbe est sous l'axe des abscisses."
    ),
    tags: ["seconde", "maths", "fonctions", "resolution_graphique", "raisonnement", "qcm"],
  },

  /* ===================== FONCTION_TABLEAU_SIGNES ===================== */

  {
    kind: "fixed",
    id: "seconde_fct_sig_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_signes",
    difficulty: 2,
    theme: "neutral",
    text: "Un produit de deux facteurs est nul si et seulement si :",
    format: "qcm",
    choices: [
      "au moins un des facteurs est nul",
      "les deux facteurs sont égaux",
      "les deux facteurs sont positifs",
      "leur somme est nulle",
    ],
    expected: ["au moins un des facteurs est nul"],
    comparator: "mcq_exact",
    hint: "C'est la règle du produit nul.",
    explanation: exp(
      "La règle du produit nul est essentielle pour résoudre les équations produit.",
      "$A \\times B = 0 \\iff A = 0$ ou $B = 0$.",
      "Il suffit qu'un facteur soit nul.",
      "Au moins un des facteurs est nul."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_sig_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_signes",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles sont les solutions de l'équation $(x - 2)(x + 5) = 0$ ?",
    format: "qcm",
    choices: ["$x = 2$ ou $x = -5$", "$x = -2$ ou $x = 5$", "$x = 2$ ou $x = 5$", "$x = 0$"],
    expected: ["$x = 2$ ou $x = -5$"],
    comparator: "mcq_exact",
    hint: "On annule chaque facteur.",
    explanation: exp(
      "On applique la règle du produit nul.",
      "$x - 2 = 0$ ou $x + 5 = 0$.",
      "$x = 2$ ou $x = -5$.",
      "Les solutions sont $x = 2$ ou $x = -5$."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_sig_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_signes",
    difficulty: 3,
    theme: "neutral",
    text: "Le facteur $x - 3$ s'annule en $3$. Pour $x > 3$, quel est son signe ?",
    format: "qcm",
    choices: ["positif", "négatif", "nul", "indéfini"],
    expected: ["positif"],
    comparator: "mcq_exact",
    hint: "Teste avec $x = 4$ : $4 - 3 = 1$.",
    explanation: exp(
      "Un facteur affine $x - 3$ change de signe en $3$.",
      "Pour $x > 3$, par exemple $x = 4$ : $4 - 3 = 1 > 0$.",
      "Donc $x - 3$ est positif après $3$.",
      "Il est positif pour $x > 3$."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_sig_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_signes",
    difficulty: 4,
    theme: "neutral",
    text: "À quoi sert un tableau de signes ?",
    format: "qcm",
    choices: [
      "À étudier le signe d'un produit/quotient selon les valeurs de $x$",
      "À calculer une moyenne",
      "À tracer une parabole",
      "À mesurer un angle",
    ],
    expected: ["À étudier le signe d'un produit/quotient selon les valeurs de $x$"],
    comparator: "mcq_exact",
    hint: "On y note le signe de chaque facteur, puis du produit.",
    explanation: exp(
      "Le tableau de signes organise l'étude du signe d'une expression factorisée.",
      "On indique le signe de chaque facteur, puis on multiplie les signes.",
      "Cela résout les inéquations produit/quotient.",
      "Il sert à étudier le signe d'un produit/quotient selon $x$."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_sig_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_signes",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction affine $f(x) = 2x - 6$ s'annule en quelle valeur ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "On résout $2x - 6 = 0$.",
    explanation: exp(
      "Pour le tableau de signes, on cherche où $f$ s'annule.",
      "$2x - 6 = 0 \\Rightarrow 2x = 6$.",
      "$x = 3$.",
      "$f$ s'annule en $3$."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "short"],
  },

  {
    kind: "template",
    id: "seconde_fct_sig_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_signes",
    difficulty: 3,
    theme: "neutral",
    hint: "On annule chaque facteur.",
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "template"],
    generate: () => {
      const a = randomInt(1, 6);
      const b = randomInt(1, 6);
      const correct = `$x = ${a}$ ou $x = ${-b}$`;
      const choices = [
        correct,
        `$x = ${-a}$ ou $x = ${b}$`,
        `$x = ${a}$ ou $x = ${b}$`,
        `$x = ${-a}$ ou $x = ${-b}$`,
      ];
      return {
        text: `Quelles sont les solutions de $(x - ${a})(x + ${b}) = 0$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique la règle du produit nul.",
          `$x - ${a} = 0$ ou $x + ${b} = 0$.`,
          `$x = ${a}$ ou $x = ${-b}$.`,
          `Les solutions sont $x = ${a}$ ou $x = ${-b}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_sig_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_signes",
    difficulty: 3,
    theme: "neutral",
    hint: "On résout $ax + b = 0$.",
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const x = randomInt(1, 6);
      const b = -a * x;
      const sb = b >= 0 ? `+ ${b}` : `- ${-b}`;
      return {
        text: `En quelle valeur la fonction affine $f(x) = ${a}x ${sb}$ s'annule-t-elle ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On cherche où $f$ s'annule pour le tableau de signes.",
          `$${a}x ${sb} = 0 \\Rightarrow ${a}x = ${-b}$.`,
          `$x = ${x}$.`,
          `$f$ s'annule en $${x}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_fct_sig_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_tableau_signes",
    difficulty: 4,
    theme: "neutral",
    text: "Pour résoudre l'inéquation $(x - 1)(x + 2) > 0$, l'outil le plus adapté est :",
    format: "qcm",
    choices: ["un tableau de signes", "le théorème de Pythagore", "la relation de Chasles", "un encadrement"],
    expected: ["un tableau de signes"],
    comparator: "mcq_exact",
    hint: "On étudie le signe de chaque facteur.",
    explanation: exp(
      "Une inéquation produit se résout avec un tableau de signes.",
      "On y note le signe de $x - 1$, de $x + 2$, puis du produit.",
      "On lit les intervalles où le produit est positif.",
      "On utilise un tableau de signes."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "raisonnement", "qcm"],
  },

  /* ===================== FONCTION_PARITE ===================== */

  {
    kind: "fixed",
    id: "seconde_fct_par_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_parite",
    difficulty: 2,
    theme: "neutral",
    text: "Une fonction $f$ est paire si, pour tout $x$ :",
    format: "qcm",
    choices: ["$f(-x) = f(x)$", "$f(-x) = -f(x)$", "$f(x) = 0$", "$f(x) = x$"],
    expected: ["$f(-x) = f(x)$"],
    comparator: "mcq_exact",
    hint: "Symétrie par rapport à l'axe des ordonnées.",
    explanation: exp(
      "Une fonction paire prend la même valeur en $x$ et $-x$.",
      "On traduit par $f(-x) = f(x)$.",
      "Sa courbe est symétrique par rapport à l'axe des ordonnées.",
      "$f(-x) = f(x)$."
    ),
    tags: ["seconde", "maths", "fonctions", "parite", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_par_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_parite",
    difficulty: 2,
    theme: "neutral",
    text: "Une fonction $f$ est impaire si, pour tout $x$ :",
    format: "qcm",
    choices: ["$f(-x) = -f(x)$", "$f(-x) = f(x)$", "$f(x) = -x$", "$f(0) = 0$ seulement"],
    expected: ["$f(-x) = -f(x)$"],
    comparator: "mcq_exact",
    hint: "Symétrie par rapport à l'origine.",
    explanation: exp(
      "Une fonction impaire change de signe quand $x$ devient $-x$.",
      "On traduit par $f(-x) = -f(x)$.",
      "Sa courbe est symétrique par rapport à l'origine.",
      "$f(-x) = -f(x)$."
    ),
    tags: ["seconde", "maths", "fonctions", "parite", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_par_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_parite",
    difficulty: 2,
    theme: "neutral",
    text: "La fonction carré $f(x) = x^2$ est :",
    format: "qcm",
    choices: ["paire", "impaire", "ni paire ni impaire", "constante"],
    expected: ["paire"],
    comparator: "mcq_exact",
    hint: "$(-x)^2 = x^2$.",
    explanation: exp(
      "On teste $f(-x)$.",
      "$f(-x) = (-x)^2 = x^2 = f(x)$.",
      "Donc $f$ est paire.",
      "La fonction carré est paire."
    ),
    tags: ["seconde", "maths", "fonctions", "parite", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_par_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_parite",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction cube $f(x) = x^3$ est :",
    format: "qcm",
    choices: ["impaire", "paire", "ni paire ni impaire", "constante"],
    expected: ["impaire"],
    comparator: "mcq_exact",
    hint: "$(-x)^3 = -x^3$.",
    explanation: exp(
      "On teste $f(-x)$.",
      "$f(-x) = (-x)^3 = -x^3 = -f(x)$.",
      "Donc $f$ est impaire.",
      "La fonction cube est impaire."
    ),
    tags: ["seconde", "maths", "fonctions", "parite", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_par_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_parite",
    difficulty: 3,
    theme: "neutral",
    text: "La courbe d'une fonction paire est symétrique par rapport :",
    format: "qcm",
    choices: ["à l'axe des ordonnées", "à l'origine", "à l'axe des abscisses", "à la droite $y = x$"],
    expected: ["à l'axe des ordonnées"],
    comparator: "mcq_exact",
    hint: "$f(-x) = f(x)$ : même hauteur de part et d'autre de l'axe vertical.",
    explanation: exp(
      "Pour une fonction paire, $f(-x) = f(x)$.",
      "Les points $(x\\,;f(x))$ et $(-x\\,;f(x))$ sont symétriques par rapport à l'axe des ordonnées.",
      "La courbe a donc cet axe pour axe de symétrie.",
      "Symétrie par rapport à l'axe des ordonnées."
    ),
    tags: ["seconde", "maths", "fonctions", "parite", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_par_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_parite",
    difficulty: 4,
    theme: "neutral",
    text: "La courbe d'une fonction impaire est symétrique par rapport :",
    format: "qcm",
    choices: ["à l'origine", "à l'axe des ordonnées", "à l'axe des abscisses", "à aucun élément"],
    expected: ["à l'origine"],
    comparator: "mcq_exact",
    hint: "$f(-x) = -f(x)$ : symétrie centrale.",
    explanation: exp(
      "Pour une fonction impaire, $f(-x) = -f(x)$.",
      "Les points $(x\\,;f(x))$ et $(-x\\,;-f(x))$ sont symétriques par rapport à l'origine.",
      "La courbe a donc l'origine comme centre de symétrie.",
      "Symétrie par rapport à l'origine."
    ),
    tags: ["seconde", "maths", "fonctions", "parite", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_par_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_parite",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^2$ une fonction paire. Sachant $f(3) = 9$, combien vaut $f(-3)$ ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Fonction paire : $f(-x) = f(x)$.",
    explanation: exp(
      "Pour une fonction paire, $f(-x) = f(x)$.",
      "Donc $f(-3) = f(3)$.",
      "$f(3) = 9$, donc $f(-3) = 9$.",
      "$f(-3) = 9$."
    ),
    tags: ["seconde", "maths", "fonctions", "parite", "short"],
  },

  {
    kind: "template",
    id: "seconde_fct_par_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_parite",
    difficulty: 4,
    theme: "neutral",
    hint: "Paire : $f(-x) = f(x)$.",
    tags: ["seconde", "maths", "fonctions", "parite", "template"],
    generate: () => {
      const x = randomInt(2, 6);
      const v = x * x;
      return {
        text: `$f(x) = x^2$ est paire. Sachant $f(${x}) = ${v}$, combien vaut $f(${-x})$ ?`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        explanation: exp(
          "Pour une fonction paire, $f(-x) = f(x)$.",
          `Donc $f(${-x}) = f(${x})$.`,
          `$f(${x}) = ${v}$, donc $f(${-x}) = ${v}$.`,
          `$f(${-x}) = ${v}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_par_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_parite",
    difficulty: 3,
    theme: "neutral",
    hint: "Teste $f(-x)$.",
    tags: ["seconde", "maths", "fonctions", "parite", "raisonnement", "template"],
    generate: () => {
      const impaire = Math.random() < 0.5;
      const fonction = impaire ? "x^3" : "x^2";
      const correct = impaire ? "impaire" : "paire";
      const choices = ["paire", "impaire", "ni paire ni impaire", "constante"];
      return {
        text: `La fonction $f(x) = ${fonction}$ est :`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On teste $f(-x)$.",
          impaire
            ? "$f(-x) = (-x)^3 = -x^3 = -f(x)$."
            : "$f(-x) = (-x)^2 = x^2 = f(x)$.",
          impaire ? "Donc $f$ est impaire." : "Donc $f$ est paire.",
          `La fonction est ${correct}.`
        ),
      };
    },
  },
];
