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
//   fonction_domaine            — Determiner le domaine de definition

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

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


/**
 * Le nom de la fonction, tire.
 * ⭐ Frederic, 08/09/2026 : « il peut y avoir fonction f ou g ou h, il faut
 * savoir varier, meme u(x) mais plus rare dans les enonces ». Un generateur qui
 * dit toujours « f » apprend a ne reconnaitre que « f ».
 */
function nomFonction(): string {
  const r = Math.random();
  if (r < 0.45) return "f";
  if (r < 0.75) return "g";
  if (r < 0.93) return "h";
  return "u";
}

/** Le tableau de signes d'un produit ou d'un quotient. */
function tableauSignes(
  bornes: string[],
  lignes: { label: string; signes: ("+" | "-")[]; marques?: ("0" | "||" | "")[] }[],
  titre?: string,
): CanvasFigure {
  return { kind: "tableau_signes", titre, bornes, lignes };
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
      // L'antécédent et l'image doivent différer : à $f(2) = 2$, le piège « on a
      // inversé les deux rôles » s'écrit comme la bonne réponse, et la
      // proposition « ils sont égaux » devient vraie elle aussi.
      const b = shuffle(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((v) => v !== a),
      )[0];
      const correct = `$${a}$ est un antécédent de $${b}$`;
      const choices = makeChoices(correct, [
        `$${a}$ est l'image de $${b}$`,
        `$${b}$ est un antécédent de $${a}$`,
        `$${a}$ et $${b}$ sont égaux`,
      ]);
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
    id: "seconde_fct_dom_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_domaine",
    difficulty: 1,
    theme: "neutral",
    text: "Le domaine de définition d'une fonction, c'est :",
    format: "qcm",
    choices: makeChoices("l'ensemble des $x$ pour lesquels $f(x)$ existe", [
      "l'ensemble des valeurs prises par $f$",
      "l'ensemble des solutions de $f(x) = 0$",
      "l'intervalle où $f$ est croissante",
    ]),
    expected: ["l'ensemble des $x$ pour lesquels $f(x)$ existe"],
    comparator: "mcq_exact",
    hint: "On parle des nombres qu'on a le droit de DONNER à la fonction.",
    explanation: exp(
      "Le domaine de définition rassemble les nombres qu'on peut donner à la fonction.",
      "On écarte ce qui rendrait le calcul impossible.",
      "Les valeurs prises par $f$, elles, forment l'ensemble des images — c'est autre chose.",
      "C'est l'ensemble des $x$ pour lesquels $f(x)$ existe."
    ),
    tags: ["seconde", "maths", "fonctions", "domaine", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_dom_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_domaine",
    difficulty: 2,
    theme: "neutral",
    text: "Deux interdits seulement se rencontrent en seconde. Lesquels ?",
    format: "qcm",
    choices: makeChoices("diviser par zéro, et prendre la racine d'un négatif", [
      "diviser par zéro, et élever au carré",
      "prendre la racine d'un négatif, et multiplier par zéro",
      "ajouter zéro, et diviser par un",
    ]),
    expected: ["diviser par zéro, et prendre la racine d'un négatif"],
    comparator: "mcq_exact",
    hint: "Un dénominateur, et ce qu'il y a sous un radical.",
    explanation: exp(
      "Une expression n'a pas de sens si elle divise par zéro ou prend la racine d'un nombre négatif.",
      "On cherche donc ce qui annule un dénominateur, et ce qui rend négatif un radicande.",
      "Le carré, le produit et la somme, eux, acceptent tous les réels.",
      "Diviser par zéro et prendre la racine d'un négatif : ce sont les deux seuls interdits."
    ),
    tags: ["seconde", "maths", "fonctions", "domaine", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_fct_dom_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_domaine",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la valeur qui annule le dénominateur.",
    tags: ["seconde", "maths", "fonctions", "domaine", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const signe = Math.random() < 0.5 ? 1 : -1;
      const interdite = signe * a;
      const denom = signe > 0 ? `x - ${a}` : `x + ${a}`;
      return {
        text: `Quelle valeur est INTERDITE pour $f(x) = \\dfrac{1}{${denom}}$ ?`,
        format: "qcm",
        choices: makeChoices(`$x = ${interdite}$`, [
          `$x = ${-interdite}$`,
          "$x = 0$",
          "$x = 1$",
        ]),
        expected: [`$x = ${interdite}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un quotient n'existe pas quand son dénominateur vaut zéro.",
          `On résout donc $${denom} = 0$.`,
          `Cela donne $x = ${interdite}$.`,
          `La valeur interdite est $${interdite}$ : le domaine est $\\mathbb{R}$ privé de ce nombre.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_dom_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_domaine",
    difficulty: 3,
    theme: "neutral",
    hint: "Sous une racine, il faut du positif ou du nul.",
    tags: ["seconde", "maths", "fonctions", "domaine", "racine", "template"],
    generate: () => {
      const a = randomInt(2, 12);
      return {
        text: `Quel est le domaine de définition de $f(x) = \\sqrt{x - ${a}}$ ?`,
        format: "qcm",
        choices: makeChoices(`$[${a}\\,;\\,+\\infty[$`, [
          `$]-\\infty\\,;\\,${a}]$`,
          `$]${a}\\,;\\,+\\infty[$`,
          "$\\mathbb{R}$",
        ]),
        expected: [`$[${a}\\,;\\,+\\infty[$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une racine carrée n'existe que sur les nombres positifs ou nuls.",
          `On résout donc $x - ${a} \\geqslant 0$.`,
          `Cela donne $x \\geqslant ${a}$.`,
          `Le domaine est $[${a}\\,;\\,+\\infty[$ — le crochet est FERMÉ, car ${a} convient.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_dom_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_domaine",
    difficulty: 2,
    theme: "neutral",
    hint: "Un polynôme accepte-t-il un interdit ?",
    tags: ["seconde", "maths", "fonctions", "domaine", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      const b = randomInt(1, 9);
      return {
        text: `Quel est le domaine de définition de $f(x) = ${a}x^2 + ${b}$ ?`,
        format: "qcm",
        choices: makeChoices("$\\mathbb{R}$", [
          "$\\mathbb{R}$ privé de $0$",
          "$[0\\,;\\,+\\infty[$",
          `$\\mathbb{R}$ privé de $${b}$`,
        ]),
        expected: ["$\\mathbb{R}$"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un polynôme ne contient ni quotient ni racine.",
          "Aucune valeur ne peut donc rendre le calcul impossible.",
          "On élève au carré, on multiplie, on ajoute : ces trois opérations acceptent tous les réels.",
          "Le domaine est $\\mathbb{R}$ tout entier."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_dom_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_domaine",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux interdits peuvent se cumuler dans la même expression.",
    tags: ["seconde", "maths", "fonctions", "domaine", "raisonnement", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      return {
        text: `Combien de valeurs sont interdites pour $f(x) = \\dfrac{x}{(x - ${a})(x + ${a})}$ ?`,
        format: "qcm",
        choices: makeChoices("deux", ["une", "aucune", "trois"]),
        expected: ["deux"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le dénominateur est un produit : il s'annule dès qu'un de ses facteurs s'annule.",
          `On résout $x - ${a} = 0$ puis $x + ${a} = 0$.`,
          `On trouve $x = ${a}$ et $x = -${a}$.`,
          "Deux valeurs sont interdites : le domaine est $\\mathbb{R}$ privé de ces deux nombres."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_dom_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_domaine",
    difficulty: 3,
    theme: "neutral",
    hint: "Vrai ou faux : teste la valeur dans l'expression.",
    tags: ["seconde", "maths", "fonctions", "domaine", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const teste = Math.random() < 0.5 ? a : randomInt(a + 1, a + 5);
      const interdit = teste === a;
      return {
        text: `Pour $f(x) = \\dfrac{1}{x - ${a}}$, le nombre $${teste}$ appartient-il au domaine ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [interdit ? "non" : "oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre appartient au domaine si le calcul y est possible.",
          `On remplace : le dénominateur vaut $${teste} - ${a} = ${teste - a}$.`,
          interdit
            ? "Le dénominateur est nul, donc le calcul est impossible."
            : "Le dénominateur n'est pas nul, donc le calcul se fait.",
          interdit ? "Non, ce nombre est exclu du domaine." : "Oui, ce nombre appartient au domaine."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_dom_tpl_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_domaine",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris le domaine en notation d'intervalles.",
    tags: ["seconde", "maths", "fonctions", "domaine", "intervalle", "template"],
    generate: () => {
      const a = randomInt(1, 6);
      return {
        text: `Le domaine de $f(x) = \\dfrac{1}{x - ${a}}$ s'écrit :`,
        format: "qcm",
        choices: makeChoices(
          `$]-\\infty\\,;\\,${a}[ \\cup ]${a}\\,;\\,+\\infty[$`,
          [
            `$[${a}\\,;\\,+\\infty[$`,
            `$]-\\infty\\,;\\,${a}]$`,
            "$\\mathbb{R}$",
          ],
        ),
        expected: [`$]-\\infty\\,;\\,${a}[ \\cup ]${a}\\,;\\,+\\infty[$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Retirer un point d'une droite laisse deux morceaux.",
          `La valeur $${a}$ est interdite : on coupe la droite en ce point.`,
          "On réunit alors les deux intervalles ouverts qui restent.",
          `Le domaine est $]-\\infty\\,;\\,${a}[ \\cup ]${a}\\,;\\,+\\infty[$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_dom_tpl_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_domaine",
    difficulty: 5,
    theme: "neutral",
    hint: "La racine impose une inégalité, le quotient une exclusion.",
    tags: ["seconde", "maths", "fonctions", "domaine", "raisonnement", "template"],
    generate: () => {
      const a = randomInt(1, 6);
      return {
        text: `Quel est le domaine de $f(x) = \\dfrac{\\sqrt{x}}{x - ${a}}$ ?`,
        format: "qcm",
        choices: makeChoices(
          `$[0\\,;\\,+\\infty[$ privé de $${a}$`,
          [
            "$[0\\,;\\,+\\infty[$",
            `$\\mathbb{R}$ privé de $${a}$`,
            "$\\mathbb{R}$",
          ],
        ),
        expected: [`$[0\\,;\\,+\\infty[$ privé de $${a}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux contraintes se cumulent : la racine et le quotient.",
          `La racine impose $x \\geqslant 0$ ; le dénominateur interdit $x = ${a}$.`,
          "On garde donc les positifs, en retirant la valeur qui annule le dénominateur.",
          `Le domaine est $[0\\,;\\,+\\infty[$ privé de $${a}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_dom_tpl_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_domaine",
    difficulty: 3,
    theme: "neutral",
    hint: "Une durée, une longueur, un effectif : que peuvent-ils valoir ?",
    tags: ["seconde", "maths", "fonctions", "domaine", "modelisation", "template"],
    generate: () => {
      const cote = randomInt(6, 20);
      return {
        text: `Dans un carré de côté ${cote} cm, on découpe un carré de côté $x$. Quel domaine a du sens pour $x$ ?`,
        format: "qcm",
        choices: makeChoices(`$[0\\,;\\,${cote}]$`, [
          "$\\mathbb{R}$",
          `$[0\\,;\\,+\\infty[$`,
          `$[-${cote}\\,;\\,${cote}]$`,
        ]),
        expected: [`$[0\\,;\\,${cote}]$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un domaine peut être impose par la SITUATION, pas seulement par le calcul.",
          "Une longueur ne peut pas être négative, et le carré découpé ne peut pas dépasser le grand.",
          `On encadre donc $x$ entre $0$ et $${cote}$.`,
          `Le domaine qui a du sens est $[0\\,;\\,${cote}]$, même si la formule accepterait davantage.`
        ),
      };
    },
  },

];
