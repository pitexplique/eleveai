// lib/tutor-v4/questionBank/seconde/maths/vecteurs-plan.bank.ts
//
// Chapitre : Vecteurs du plan (notion vecteurs_plan)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Canvas : "fonctionGraphique" (points A, B) pour la lecture.
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   vecteur_definition    — Direction, sens, norme
//   vecteur_egalite       — Reconnaitre deux vecteurs egaux
//   vecteur_somme         — Somme de vecteurs (relation de Chasles)
//   vecteur_coordonnees   — Coordonnees d'un vecteur
//   vecteur_norme         — Norme d'un vecteur
//   vecteur_produit_reel  — Produit d'un vecteur par un reel
//   vecteur_colinearite   — Colinearite (determinant), alignement, parallelisme

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
 * Les couples dont la norme tombe juste — triplets pythagoriciens.
 * ⛔ Sans eux, la norme de deux entiers pris au hasard est irrationnelle :
 * « (5 ; 7) » donnerait 8,602..., impossible a proposer en QCM et decourageant
 * a calculer. Avec eux, l'eleve fait le vrai calcul et trouve un entier.
 */
const TRIPLETS: [number, number, number][] = [
  [3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13],
  [9, 12, 15], [12, 9, 15], [8, 15, 17], [15, 8, 17], [12, 16, 20],
  [16, 12, 20], [7, 24, 25], [24, 7, 25], [20, 21, 29], [10, 24, 26],
];

function choisir<T>(liste: T[]): T {
  return liste[Math.floor(Math.random() * liste.length)];
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

function deuxPoints(xa: number, ya: number, xb: number, yb: number): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    size: { width: 300, height: 300 },
    xmin: -6,
    xmax: 6,
    ymin: -6,
    ymax: 6,
    grille: true,
    points: [
      { x: xa, y: ya, label: "A", couleur: "#dc2626" },
      { x: xb, y: yb, label: "B", couleur: "#2563eb" },
    ],
  };
}

export const vecteursPlanBank: TutorBankItemV4[] = [
  /* ===================== VECTEUR_DEFINITION ===================== */

  {
    kind: "fixed",
    id: "seconde_vect_def_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Par quoi un vecteur est-il caractérisé ?",
    format: "qcm",
    choices: [
      "Une direction, un sens et une norme",
      "Seulement une longueur",
      "Seulement un point",
      "Un angle uniquement",
    ],
    expected: ["Une direction, un sens et une norme"],
    comparator: "mcq_exact",
    hint: "Trois caractéristiques.",
    explanation: exp(
      "Un vecteur n'est pas un simple nombre : il a plusieurs caractéristiques.",
      "On rappelle la définition du cours.",
      "Un vecteur a une direction, un sens et une norme.",
      "Direction, sens et norme."
    ),
    tags: ["seconde", "maths", "vecteurs", "definition", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_def_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Que représente la norme d'un vecteur $\\vec{AB}$ ?",
    format: "qcm",
    choices: ["La longueur $AB$", "L'angle du vecteur", "Le milieu de $[AB]$", "La pente"],
    expected: ["La longueur $AB$"],
    comparator: "mcq_exact",
    hint: "« Norme » = longueur.",
    explanation: exp(
      "La norme mesure la « taille » du vecteur.",
      "Pour $\\vec{AB}$, c'est la distance entre $A$ et $B$.",
      "Donc la norme de $\\vec{AB}$ est la longueur $AB$.",
      "C'est la longueur $AB$."
    ),
    tags: ["seconde", "maths", "vecteurs", "definition", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_def_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Comparons $\\vec{AB}$ et $\\vec{BA}$. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "Même direction et même norme, mais sens opposés",
      "Ce sont les mêmes vecteurs",
      "Ils ont des normes différentes",
      "Ils ont des directions différentes",
    ],
    expected: ["Même direction et même norme, mais sens opposés"],
    comparator: "mcq_exact",
    hint: "Aller de $A$ à $B$ ou de $B$ à $A$.",
    explanation: exp(
      "$\\vec{BA}$ est l'opposé de $\\vec{AB}$.",
      "Ils sont portés par la même droite (même direction) et ont la même longueur.",
      "Mais ils pointent en sens contraires.",
      "Même direction et norme, sens opposés : $\\vec{BA} = -\\vec{AB}$."
    ),
    tags: ["seconde", "maths", "vecteurs", "definition", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_def_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce que le vecteur nul $\\vec{0}$ ?",
    format: "qcm",
    choices: [
      "Un vecteur de norme $0$ (par exemple $\\vec{AA}$)",
      "Un vecteur de norme $1$",
      "Le vecteur le plus court non nul",
      "Un vecteur vertical",
    ],
    expected: ["Un vecteur de norme $0$ (par exemple $\\vec{AA}$)"],
    comparator: "mcq_exact",
    hint: "Quand le départ et l'arrivée sont confondus.",
    explanation: exp(
      "Le vecteur nul correspond à un déplacement nul.",
      "Par exemple $\\vec{AA}$ : on part et on arrive au même point.",
      "Sa norme est $0$.",
      "C'est un vecteur de norme $0$."
    ),
    tags: ["seconde", "maths", "vecteurs", "definition", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_def_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Le vecteur $\\vec{AB}$ est associé à quelle transformation ?",
    format: "qcm",
    choices: [
      "La translation qui transforme $A$ en $B$",
      "La symétrie de centre $A$",
      "La rotation autour de $B$",
      "L'homothétie de rapport $2$",
    ],
    expected: ["La translation qui transforme $A$ en $B$"],
    comparator: "mcq_exact",
    hint: "Le vecteur « pousse » $A$ vers $B$.",
    explanation: exp(
      "Un vecteur code un déplacement (une translation).",
      "$\\vec{AB}$ déplace tout point selon « de $A$ vers $B$ ».",
      "C'est la translation qui transforme $A$ en $B$.",
      "C'est la translation de $A$ vers $B$."
    ),
    tags: ["seconde", "maths", "vecteurs", "definition", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_def_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_definition",
    difficulty: 2,
    theme: "neutral",
    text: "La « direction » d'un vecteur correspond à :",
    format: "qcm",
    choices: [
      "La droite qui le porte (son orientation)",
      "Le sens de la flèche",
      "Sa longueur",
      "Son point de départ",
    ],
    expected: ["La droite qui le porte (son orientation)"],
    comparator: "mcq_exact",
    hint: "Ne pas confondre direction et sens.",
    explanation: exp(
      "Direction et sens sont deux notions distinctes.",
      "La direction est donnée par la droite support (horizontale, oblique…).",
      "Le sens précise « vers où » sur cette droite.",
      "La direction, c'est la droite qui porte le vecteur."
    ),
    tags: ["seconde", "maths", "vecteurs", "definition", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_def_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la norme du vecteur $\\vec{AA}$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$A$ et $A$ sont le même point.",
    explanation: exp(
      "La norme est la distance entre le départ et l'arrivée.",
      "Ici départ et arrivée sont confondus ($A$ et $A$).",
      "La distance vaut $0$.",
      "La norme de $\\vec{AA}$ est $0$."
    ),
    tags: ["seconde", "maths", "vecteurs", "definition", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_def_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Deux vecteurs de même direction sont dits :",
    format: "qcm",
    choices: ["colinéaires", "égaux", "opposés", "orthogonaux"],
    expected: ["colinéaires"],
    comparator: "mcq_exact",
    hint: "Même direction = portés par des droites parallèles.",
    explanation: exp(
      "Quand deux vecteurs ont la même direction, on a un mot dédié.",
      "Ils sont portés par des droites parallèles.",
      "On dit qu'ils sont colinéaires.",
      "Ils sont colinéaires."
    ),
    tags: ["seconde", "maths", "vecteurs", "definition", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_def_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Le « sens » d'un vecteur indique :",
    format: "qcm",
    choices: [
      "Vers où pointe la flèche sur sa direction",
      "La longueur du vecteur",
      "Le point d'arrivée uniquement",
      "L'angle avec l'axe des $x$",
    ],
    expected: ["Vers où pointe la flèche sur sa direction"],
    comparator: "mcq_exact",
    hint: "Sur une même direction, il y a deux sens possibles.",
    explanation: exp(
      "Sur une direction donnée, deux sens sont possibles.",
      "Le sens précise lequel des deux.",
      "C'est « vers où » pointe la flèche.",
      "Le sens indique vers où pointe la flèche."
    ),
    tags: ["seconde", "maths", "vecteurs", "definition", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_def_fixed_10",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Le vecteur opposé de $\\vec{u}$ se note :",
    format: "qcm",
    choices: ["$-\\vec{u}$", "$2\\vec{u}$", "$\\vec{0}$", "$|\\vec{u}|$"],
    expected: ["$-\\vec{u}$"],
    comparator: "mcq_exact",
    hint: "Même norme, même direction, sens contraire.",
    explanation: exp(
      "L'opposé d'un vecteur a le sens contraire.",
      "Il garde la même direction et la même norme.",
      "On le note $-\\vec{u}$.",
      "Le vecteur opposé est $-\\vec{u}$."
    ),
    tags: ["seconde", "maths", "vecteurs", "definition", "raisonnement", "qcm"],
  },

  /* ===================== VECTEUR_EGALITE ===================== */

  {
    kind: "fixed",
    id: "seconde_vect_eg_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_egalite",
    difficulty: 2,
    theme: "neutral",
    text: "Deux vecteurs sont égaux si et seulement si :",
    format: "qcm",
    choices: [
      "Ils ont la même direction, le même sens et la même norme",
      "Ils ont la même norme seulement",
      "Ils partent du même point",
      "Ils sont perpendiculaires",
    ],
    expected: ["Ils ont la même direction, le même sens et la même norme"],
    comparator: "mcq_exact",
    hint: "Trois conditions, ou bien : mêmes coordonnées.",
    explanation: exp(
      "L'égalité de vecteurs ne dépend pas du point de départ.",
      "Il faut même direction, même sens et même norme.",
      "De façon équivalente : mêmes coordonnées.",
      "Même direction, même sens et même norme."
    ),
    tags: ["seconde", "maths", "vecteurs", "egalite", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_eg_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_egalite",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un repère, deux vecteurs sont égaux si et seulement si :",
    format: "qcm",
    choices: [
      "Ils ont les mêmes coordonnées",
      "Ils ont la même abscisse seulement",
      "Leur somme est nulle",
      "Ils ont des coordonnées opposées",
    ],
    expected: ["Ils ont les mêmes coordonnées"],
    comparator: "mcq_exact",
    hint: "Coordonnée par coordonnée.",
    explanation: exp(
      "En repère, un vecteur est entièrement décrit par ses coordonnées.",
      "Deux vecteurs égaux ont donc des coordonnées identiques.",
      "$\\vec{u}(x\\,;y) = \\vec{v}(x'\\,;y') \\iff x = x'$ et $y = y'$.",
      "Ils ont les mêmes coordonnées."
    ),
    tags: ["seconde", "maths", "vecteurs", "egalite", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_eg_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_egalite",
    difficulty: 3,
    theme: "neutral",
    text: "$ABDC$ est un parallélogramme. Quelle égalité de vecteurs est vraie ?",
    format: "qcm",
    choices: ["$\\vec{AB} = \\vec{CD}$", "$\\vec{AB} = \\vec{DC}$", "$\\vec{AB} = \\vec{BA}$", "$\\vec{AB} = \\vec{AC}$"],
    expected: ["$\\vec{AB} = \\vec{CD}$"],
    comparator: "mcq_exact",
    hint: "Dans le parallélogramme $ABDC$, les côtés $[AB]$ et $[CD]$ se correspondent.",
    explanation: exp(
      "Dans un parallélogramme, les côtés opposés sont parallèles et de même longueur.",
      "Pour $ABDC$, $\\vec{AB}$ et $\\vec{CD}$ ont même direction, sens et norme.",
      "Donc $\\vec{AB} = \\vec{CD}$.",
      "$\\vec{AB} = \\vec{CD}$."
    ),
    tags: ["seconde", "maths", "vecteurs", "egalite", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_eg_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_egalite",
    difficulty: 3,
    theme: "neutral",
    text: "$\\vec{AB} = \\vec{DC}$. Quelle est la nature du quadrilatère $ABCD$ ?",
    format: "qcm",
    choices: ["Un parallélogramme", "Un triangle", "Un cercle", "Un trapèze quelconque"],
    expected: ["Un parallélogramme"],
    comparator: "mcq_exact",
    hint: "Égalité de vecteurs de côtés opposés.",
    explanation: exp(
      "$\\vec{AB} = \\vec{DC}$ signifie que les côtés $[AB]$ et $[DC]$ sont parallèles et égaux.",
      "C'est la caractérisation vectorielle du parallélogramme.",
      "Donc $ABCD$ est un parallélogramme.",
      "$ABCD$ est un parallélogramme."
    ),
    tags: ["seconde", "maths", "vecteurs", "egalite", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_vect_eg_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_egalite",
    difficulty: 3,
    theme: "neutral",
    hint: "Égaux ⟺ mêmes coordonnées.",
    tags: ["seconde", "maths", "vecteurs", "egalite", "template"],
    generate: () => {
      const x = randomInt(-4, 4);
      const y = randomInt(-4, 4);
      const egaux = Math.random() < 0.5;
      const x2 = egaux ? x : x + randomInt(1, 3);
      const y2 = y;
      return {
        text: `Les vecteurs $\\vec{u}(${x}\\,;${y})$ et $\\vec{v}(${x2}\\,;${y2})$ sont-ils égaux ?`,
        format: "qcm",
        choices: ["Oui", "Non"],
        expected: [egaux ? "Oui" : "Non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux vecteurs sont égaux ssi ils ont les mêmes coordonnées.",
          `On compare $(${x}\\,;${y})$ et $(${x2}\\,;${y2})$.`,
          egaux ? "Les coordonnées sont identiques." : "Les abscisses diffèrent.",
          egaux ? "Oui, ils sont égaux." : "Non, ils ne sont pas égaux."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_eg_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_egalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Mêmes coordonnées = égaux.",
    tags: ["seconde", "maths", "vecteurs", "egalite", "raisonnement", "template"],
    generate: () => {
      const correct = "Ils ont les mêmes coordonnées";
      const choices = [
        "Ils ont les mêmes coordonnées",
        "Ils ont la même norme seulement",
        "Ils partent du même point",
        "Leur somme vaut $\\vec{0}$",
      ];
      return {
        text: "À quelle condition deux vecteurs sont-ils égaux dans un repère ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "En repère, un vecteur est décrit par ses coordonnées.",
          "L'égalité se vérifie coordonnée par coordonnée.",
          "Donc égaux ⟺ mêmes coordonnées.",
          "Ils ont les mêmes coordonnées."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_vect_eg_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_egalite",
    difficulty: 4,
    theme: "neutral",
    text: "Si $\\vec{AB} = \\vec{CD}$, que peut-on dire des milieux de $[AD]$ et $[BC]$ ?",
    format: "qcm",
    choices: [
      "Ils sont confondus (même point)",
      "Ils sont opposés",
      "Ils n'ont aucun lien",
      "Ils sont symétriques par rapport à $A$",
    ],
    expected: ["Ils sont confondus (même point)"],
    comparator: "mcq_exact",
    hint: "$\\vec{AB} = \\vec{CD}$ caractérise un parallélogramme $ABDC$.",
    explanation: exp(
      "$\\vec{AB} = \\vec{CD}$ fait de $ABDC$ un parallélogramme.",
      "Dans un parallélogramme, les diagonales se coupent en leur milieu.",
      "Les milieux de $[AD]$ et $[BC]$ coïncident donc.",
      "Ils sont confondus."
    ),
    tags: ["seconde", "maths", "vecteurs", "egalite", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_eg_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_egalite",
    difficulty: 2,
    theme: "neutral",
    text: "Les vecteurs $\\vec{u}(3\\,;-2)$ et $\\vec{v}(3\\,;-2)$ sont-ils égaux ?",
    format: "qcm",
    choices: ["Oui, mêmes coordonnées", "Non", "Seulement s'ils partent du même point", "On ne peut pas savoir"],
    expected: ["Oui, mêmes coordonnées"],
    comparator: "mcq_exact",
    hint: "Compare coordonnée par coordonnée.",
    explanation: exp(
      "On compare les coordonnées.",
      "$(3\\,;-2)$ et $(3\\,;-2)$ sont identiques.",
      "Le point de départ n'intervient pas.",
      "Oui, ils sont égaux."
    ),
    tags: ["seconde", "maths", "vecteurs", "egalite", "qcm"],
  },

  /* ===================== VECTEUR_SOMME ===================== */

  {
    kind: "fixed",
    id: "seconde_vect_som_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_somme",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $\\vec{AB} + \\vec{BC}$ (relation de Chasles) ?",
    format: "qcm",
    choices: ["$\\vec{AC}$", "$\\vec{CA}$", "$\\vec{AB}$", "$\\vec{0}$"],
    expected: ["$\\vec{AC}$"],
    comparator: "mcq_exact",
    hint: "On enchaîne les déplacements : $A \\to B \\to C$.",
    explanation: exp(
      "La relation de Chasles enchaîne deux déplacements.",
      "Aller de $A$ à $B$ puis de $B$ à $C$, c'est aller de $A$ à $C$.",
      "$\\vec{AB} + \\vec{BC} = \\vec{AC}$.",
      "$\\vec{AB} + \\vec{BC} = \\vec{AC}$."
    ),
    tags: ["seconde", "maths", "vecteurs", "somme", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_som_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_somme",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $\\vec{AB} + \\vec{BA}$ ?",
    format: "qcm",
    choices: ["$\\vec{0}$", "$\\vec{AA}$ non nul", "$2\\vec{AB}$", "$\\vec{AB}$"],
    expected: ["$\\vec{0}$"],
    comparator: "mcq_exact",
    hint: "On part de $A$ et on revient en $A$.",
    explanation: exp(
      "Par Chasles, $\\vec{AB} + \\vec{BA} = \\vec{AA}$.",
      "$\\vec{AA}$ est un déplacement nul.",
      "Donc la somme vaut le vecteur nul.",
      "$\\vec{AB} + \\vec{BA} = \\vec{0}$."
    ),
    tags: ["seconde", "maths", "vecteurs", "somme", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_som_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_somme",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $\\vec{u}(2\\,;3)$ et $\\vec{v}(4\\,;1)$. Quelle est l'abscisse de $\\vec{u} + \\vec{v}$ ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On additionne les abscisses.",
    explanation: exp(
      "On additionne les vecteurs coordonnée par coordonnée.",
      "Abscisse de $\\vec{u} + \\vec{v}$ : $2 + 4$.",
      "$= 6$.",
      "L'abscisse vaut $6$."
    ),
    tags: ["seconde", "maths", "vecteurs", "somme", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_som_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_somme",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $\\vec{u}(2\\,;3)$ et $\\vec{v}(4\\,;1)$. Quelle est l'ordonnée de $\\vec{u} + \\vec{v}$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On additionne les ordonnées.",
    explanation: exp(
      "On additionne coordonnée par coordonnée.",
      "Ordonnée de $\\vec{u} + \\vec{v}$ : $3 + 1$.",
      "$= 4$.",
      "L'ordonnée vaut $4$."
    ),
    tags: ["seconde", "maths", "vecteurs", "somme", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_som_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_somme",
    difficulty: 2,
    theme: "neutral",
    text: "Pour additionner deux vecteurs en coordonnées, on :",
    format: "qcm",
    choices: [
      "additionne les abscisses entre elles et les ordonnées entre elles",
      "additionne abscisse et ordonnée ensemble",
      "multiplie les coordonnées",
      "prend la plus grande coordonnée",
    ],
    expected: ["additionne les abscisses entre elles et les ordonnées entre elles"],
    comparator: "mcq_exact",
    hint: "Coordonnée par coordonnée.",
    explanation: exp(
      "L'addition de vecteurs se fait composante par composante.",
      "$\\vec{u}(x\\,;y) + \\vec{v}(x'\\,;y') = (x + x'\\,;y + y')$.",
      "On additionne abscisses ensemble, ordonnées ensemble.",
      "On additionne coordonnée par coordonnée."
    ),
    tags: ["seconde", "maths", "vecteurs", "somme", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_vect_som_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_somme",
    difficulty: 3,
    theme: "neutral",
    hint: "On additionne les abscisses.",
    tags: ["seconde", "maths", "vecteurs", "somme", "template"],
    generate: () => {
      const xu = randomInt(-5, 5);
      const xv = randomInt(-5, 5);
      const yu = randomInt(-5, 5);
      const yv = randomInt(-5, 5);
      return {
        text: `Soit $\\vec{u}(${xu}\\,;${yu})$ et $\\vec{v}(${xv}\\,;${yv})$. Quelle est l'abscisse de $\\vec{u} + \\vec{v}$ ?`,
        format: "short",
        expected: [String(xu + xv)],
        comparator: "number_equal",
        explanation: exp(
          "On additionne les abscisses.",
          `$${xu} + ${xv}$.`,
          `$= ${xu + xv}$.`,
          `L'abscisse vaut $${xu + xv}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_som_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_somme",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\vec{u}+\\vec{v} = (x_u + x_v\\,;y_u + y_v)$.",
    tags: ["seconde", "maths", "vecteurs", "somme", "template"],
    generate: () => {
      const xu = randomInt(-4, 4);
      const xv = randomInt(-4, 4);
      const yu = randomInt(-4, 4);
      const yv = randomInt(-4, 4);
      const sx = xu + xv;
      const sy = yu + yv;
      const correct = `$(${sx}\\,;${sy})$`;
      // Quand les deux sommes coïncident, « on a interverti » donne la bonne
      // réponse : d'où le décalage horizontal, gardé en réserve.
      const choices = makeChoices(correct, [
        `$(${sx}\\,;${sy + 1})$`,
        `$(${xu * xv}\\,;${yu * yv})$`,
        `$(${sy}\\,;${sx})$`,
        `$(${sx + 1}\\,;${sy})$`,
      ]);
      return {
        text: `Soit $\\vec{u}(${xu}\\,;${yu})$ et $\\vec{v}(${xv}\\,;${yv})$. Quelles sont les coordonnées de $\\vec{u} + \\vec{v}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On additionne coordonnée par coordonnée.",
          `$(${xu} + ${xv}\\,;${yu} + ${yv})$.`,
          `$= (${sx}\\,;${sy})$.`,
          `$\\vec{u} + \\vec{v} = (${sx}\\,;${sy})$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_vect_som_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_somme",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut $\\vec{AB} + \\vec{BC} + \\vec{CD}$ ?",
    format: "qcm",
    choices: ["$\\vec{AD}$", "$\\vec{AC}$", "$\\vec{DA}$", "$\\vec{0}$"],
    expected: ["$\\vec{AD}$"],
    comparator: "mcq_exact",
    hint: "Chasles en chaîne : $A \\to B \\to C \\to D$.",
    explanation: exp(
      "On applique la relation de Chasles plusieurs fois.",
      "$A \\to B \\to C \\to D$ revient à aller de $A$ à $D$.",
      "$\\vec{AB} + \\vec{BC} + \\vec{CD} = \\vec{AD}$.",
      "$= \\vec{AD}$."
    ),
    tags: ["seconde", "maths", "vecteurs", "somme", "raisonnement", "qcm"],
  },

  /* ===================== VECTEUR_COORDONNEES ===================== */

  {
    kind: "fixed",
    id: "seconde_vect_coord_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Comment calcule-t-on les coordonnées du vecteur $\\vec{AB}$ ?",
    format: "qcm",
    choices: [
      "$(x_B - x_A\\,;y_B - y_A)$",
      "$(x_A - x_B\\,;y_A - y_B)$",
      "$(x_A + x_B\\,;y_A + y_B)$",
      "$(x_A \\times x_B\\,;y_A \\times y_B)$",
    ],
    expected: ["$(x_B - x_A\\,;y_B - y_A)$"],
    comparator: "mcq_exact",
    hint: "« Arrivée moins départ ».",
    explanation: exp(
      "Les coordonnées de $\\vec{AB}$ se calculent « arrivée moins départ ».",
      "Abscisse : $x_B - x_A$ ; ordonnée : $y_B - y_A$.",
      "On soustrait les coordonnées de $A$ à celles de $B$.",
      "$\\vec{AB}(x_B - x_A\\,;y_B - y_A)$."
    ),
    tags: ["seconde", "maths", "vecteurs", "coordonnees", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_coord_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $A(1\\,;2)$ et $B(4\\,;6)$ (voir figure). Quelle est l'abscisse du vecteur $\\vec{AB}$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    canvas: deuxPoints(1, 2, 4, 6),
    hint: "$x_B - x_A = 4 - 1$.",
    explanation: exp(
      "L'abscisse de $\\vec{AB}$ est $x_B - x_A$.",
      "$4 - 1 = 3$.",
      "L'abscisse vaut $3$.",
      "Abscisse de $\\vec{AB}$ : $3$."
    ),
    tags: ["seconde", "maths", "vecteurs", "coordonnees", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_coord_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $A(1\\,;2)$ et $B(4\\,;6)$ (voir figure). Quelle est l'ordonnée du vecteur $\\vec{AB}$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    canvas: deuxPoints(1, 2, 4, 6),
    hint: "$y_B - y_A = 6 - 2$.",
    explanation: exp(
      "L'ordonnée de $\\vec{AB}$ est $y_B - y_A$.",
      "$6 - 2 = 4$.",
      "L'ordonnée vaut $4$.",
      "Ordonnée de $\\vec{AB}$ : $4$."
    ),
    tags: ["seconde", "maths", "vecteurs", "coordonnees", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_coord_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $A(-2\\,;3)$ et $B(1\\,;-1)$. Quelles sont les coordonnées de $\\vec{AB}$ ?",
    format: "qcm",
    choices: ["$(3\\,;-4)$", "$(-3\\,;4)$", "$(-1\\,;2)$", "$(3\\,;4)$"],
    expected: ["$(3\\,;-4)$"],
    comparator: "mcq_exact",
    hint: "$(x_B - x_A\\,;y_B - y_A)$ en respectant les signes.",
    explanation: exp(
      "On applique « arrivée moins départ ».",
      "$(1 - (-2)\\,;-1 - 3) = (3\\,;-4)$.",
      "Attention aux signes des soustractions.",
      "$\\vec{AB}(3\\,;-4)$."
    ),
    tags: ["seconde", "maths", "vecteurs", "coordonnees", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_vect_coord_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_coordonnees",
    difficulty: 3,
    theme: "neutral",
    hint: "Abscisse de $\\vec{AB}$ : $x_B - x_A$.",
    tags: ["seconde", "maths", "vecteurs", "coordonnees", "template"],
    generate: () => {
      const xa = randomInt(-5, 5);
      const xb = randomInt(-5, 5);
      const ya = randomInt(-5, 5);
      const yb = randomInt(-5, 5);
      return {
        text: `Soit $A(${xa}\\,;${ya})$ et $B(${xb}\\,;${yb})$. Quelle est l'abscisse de $\\vec{AB}$ ?`,
        format: "short",
        expected: [String(xb - xa)],
        comparator: "number_equal",
        explanation: exp(
          "Abscisse de $\\vec{AB}$ : $x_B - x_A$.",
          `$${xb} - (${xa})$.`,
          `$= ${xb - xa}$.`,
          `L'abscisse vaut $${xb - xa}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_coord_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_coordonnees",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\vec{AB}(x_B - x_A\\,;y_B - y_A)$.",
    tags: ["seconde", "maths", "vecteurs", "coordonnees", "template"],
    generate: () => {
      const xa = randomInt(-4, 4);
      const ya = randomInt(-4, 4);
      // Deux points confondus donnent le vecteur nul, et tous les pièges
      // s'écrivent alors « $(0\,;0)$ » : il ne restait qu'une ligne au QCM.
      let xb = randomInt(-4, 4);
      let yb = randomInt(-4, 4);
      while (xb === xa && yb === ya) {
        xb = randomInt(-4, 4);
        yb = randomInt(-4, 4);
      }
      const dx = xb - xa;
      const dy = yb - ya;
      const correct = `$(${dx}\\,;${dy})$`;
      // Coordonnées égales, ou opposées : selon le tirage, deux des pièges
      // coïncident. On en garde deux de plus en réserve.
      const choices = makeChoices(correct, [
        `$(${-dx}\\,;${-dy})$`,
        `$(${dy}\\,;${dx})$`,
        `$(${xa + xb}\\,;${ya + yb})$`,
        `$(${dx}\\,;${-dy})$`,
        `$(${-dx}\\,;${dy})$`,
      ]);
      return {
        text: `Soit $A(${xa}\\,;${ya})$ et $B(${xb}\\,;${yb})$. Quelles sont les coordonnées de $\\vec{AB}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique « arrivée moins départ ».",
          `$(${xb} - (${xa})\\,;${yb} - (${ya}))$.`,
          `$= (${dx}\\,;${dy})$.`,
          `$\\vec{AB}(${dx}\\,;${dy})$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_vect_coord_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $A(0\\,;0)$ et $B(5\\,;-2)$. Quelle est l'ordonnée de $\\vec{AB}$ ?",
    format: "short",
    expected: ["-2"],
    comparator: "number_equal",
    hint: "$y_B - y_A = -2 - 0$.",
    explanation: exp(
      "Ordonnée de $\\vec{AB}$ : $y_B - y_A$.",
      "$-2 - 0 = -2$.",
      "L'ordonnée vaut $-2$.",
      "Ordonnée de $\\vec{AB}$ : $-2$."
    ),
    tags: ["seconde", "maths", "vecteurs", "coordonnees", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_coord_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Le vecteur $\\vec{AB}$ a pour coordonnées $(0\\,;0)$. Que peut-on en déduire ?",
    format: "qcm",
    choices: ["$A$ et $B$ sont confondus", "$A$ et $B$ sont très éloignés", "$\\vec{AB}$ est vertical", "C'est impossible"],
    expected: ["$A$ et $B$ sont confondus"],
    comparator: "mcq_exact",
    hint: "$\\vec{AB} = \\vec{0}$.",
    explanation: exp(
      "Des coordonnées nulles donnent le vecteur nul.",
      "$\\vec{AB} = \\vec{0}$ signifie un déplacement nul.",
      "Donc $A = B$.",
      "$A$ et $B$ sont confondus."
    ),
    tags: ["seconde", "maths", "vecteurs", "coordonnees", "raisonnement", "qcm"],
  },

  /* ===================== VECTEUR_NORME ===================== */

  {
    kind: "fixed",
    id: "seconde_vect_norme_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_norme",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle formule donne la norme du vecteur $\\vec{u}(x\\,;y)$ dans un repère orthonormé ?",
    format: "qcm",
    choices: ["$\\sqrt{x^2 + y^2}$", "$x + y$", "$\\sqrt{x} + \\sqrt{y}$", "$x^2 + y^2$"],
    expected: ["$\\sqrt{x^2 + y^2}$"],
    comparator: "mcq_exact",
    hint: "C'est encore Pythagore.",
    explanation: exp(
      "La norme est la longueur du vecteur.",
      "On applique le théorème de Pythagore avec les coordonnées.",
      "$\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.",
      "La norme est $\\sqrt{x^2 + y^2}$."
    ),
    tags: ["seconde", "maths", "vecteurs", "norme", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_norme_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_norme",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la norme du vecteur $\\vec{u}(3\\,;4)$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$\\sqrt{3^2 + 4^2}$.",
    explanation: exp(
      "On applique $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.",
      "$\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16}$.",
      "$= \\sqrt{25} = 5$.",
      "La norme vaut $5$."
    ),
    tags: ["seconde", "maths", "vecteurs", "norme", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_norme_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_norme",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la norme du vecteur $\\vec{u}(6\\,;8)$ ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$\\sqrt{6^2 + 8^2}$.",
    explanation: exp(
      "On applique la formule de la norme.",
      "$\\sqrt{6^2 + 8^2} = \\sqrt{36 + 64}$.",
      "$= \\sqrt{100} = 10$.",
      "La norme vaut $10$."
    ),
    tags: ["seconde", "maths", "vecteurs", "norme", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_norme_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_norme",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la norme du vecteur $\\vec{u}(0\\,;-7)$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$\\sqrt{0^2 + (-7)^2}$.",
    explanation: exp(
      "On applique la formule de la norme.",
      "$\\sqrt{0^2 + (-7)^2} = \\sqrt{49}$.",
      "$= 7$.",
      "La norme vaut $7$."
    ),
    tags: ["seconde", "maths", "vecteurs", "norme", "short"],
  },

  {
    kind: "template",
    id: "seconde_vect_norme_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_norme",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$ (triplets pythagoriciens).",
    tags: ["seconde", "maths", "vecteurs", "norme", "template"],
    generate: () => {
      const triples = [
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
        [8, 15, 17],
        [9, 12, 15],
      ];
      const [x, y, n] = triples[randomInt(0, triples.length - 1)];
      const sx = Math.random() < 0.5 ? x : -x;
      const sy = Math.random() < 0.5 ? y : -y;
      return {
        text: `Quelle est la norme du vecteur $\\vec{u}(${sx}\\,;${sy})$ ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.",
          `$\\sqrt{(${sx})^2 + (${sy})^2} = \\sqrt{${x * x} + ${y * y}}$.`,
          `$= \\sqrt{${x * x + y * y}} = ${n}$.`,
          `La norme vaut $${n}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_norme_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_norme",
    difficulty: 4,
    theme: "neutral",
    hint: "La norme est une longueur : elle est positive.",
    tags: ["seconde", "maths", "vecteurs", "norme", "raisonnement", "template"],
    generate: () => {
      const correct = "$\\sqrt{x^2 + y^2}$";
      const choices = ["$\\sqrt{x^2 + y^2}$", "$x^2 + y^2$", "$|x| + |y|$", "$\\sqrt{x} + \\sqrt{y}$"];
      return {
        text: "Quelle expression donne la norme de $\\vec{u}(x\\,;y)$ ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La norme vient du théorème de Pythagore appliqué aux coordonnées.",
          "On met les coordonnées au carré, on additionne, on prend la racine.",
          "$\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.",
          "C'est $\\sqrt{x^2 + y^2}$."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_vect_norme_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_norme",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la norme du vecteur $\\vec{u}(2\\,;3)$ ?",
    format: "qcm",
    choices: ["$\\sqrt{13}$", "$5$", "$13$", "$\\sqrt{5}$"],
    expected: ["$\\sqrt{13}$"],
    comparator: "mcq_exact",
    hint: "$\\sqrt{2^2 + 3^2}$ ne « tombe pas juste ».",
    explanation: exp(
      "On applique la formule de la norme.",
      "$\\sqrt{2^2 + 3^2} = \\sqrt{4 + 9}$.",
      "$= \\sqrt{13}$ (valeur irrationnelle).",
      "La norme vaut $\\sqrt{13}$."
    ),
    tags: ["seconde", "maths", "vecteurs", "norme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_norme_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_norme",
    difficulty: 2,
    theme: "neutral",
    text: "La norme d'un vecteur peut-elle être négative ?",
    format: "qcm",
    choices: ["Non, c'est une longueur", "Oui, si les coordonnées sont négatives", "Oui, parfois", "Seulement si $x < 0$"],
    expected: ["Non, c'est une longueur"],
    comparator: "mcq_exact",
    hint: "Une longueur est toujours positive ou nulle.",
    explanation: exp(
      "La norme représente une longueur.",
      "Une longueur ne peut pas être négative.",
      "Les carrés dans la formule rendent le résultat positif.",
      "Non, la norme est toujours positive ou nulle."
    ),
    tags: ["seconde", "maths", "vecteurs", "norme", "raisonnement", "qcm"],
  },

  /* ===================== VECTEUR_PRODUIT_REEL ===================== */

  {
    kind: "fixed",
    id: "seconde_vect_prod_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_produit_reel",
    difficulty: 2,
    theme: "neutral",
    text: "Pour multiplier $\\vec{u}(x\\,;y)$ par un réel $k$, on obtient :",
    format: "qcm",
    choices: ["$(kx\\,;ky)$", "$(x + k\\,;y + k)$", "$(kx\\,;y)$", "$(x^k\\,;y^k)$"],
    expected: ["$(kx\\,;ky)$"],
    comparator: "mcq_exact",
    hint: "On multiplie chaque coordonnée par $k$.",
    explanation: exp(
      "Le produit d'un vecteur par un réel agit sur chaque coordonnée.",
      "$k\\vec{u} = (k \\times x\\,;k \\times y)$.",
      "On multiplie abscisse et ordonnée par $k$.",
      "$k\\vec{u}(kx\\,;ky)$."
    ),
    tags: ["seconde", "maths", "vecteurs", "produit_reel", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_prod_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_produit_reel",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $\\vec{u}(3\\,;-1)$. Quelles sont les coordonnées de $2\\vec{u}$ ?",
    format: "qcm",
    choices: ["$(6\\,;-2)$", "$(5\\,;1)$", "$(6\\,;-1)$", "$(3\\,;-2)$"],
    expected: ["$(6\\,;-2)$"],
    comparator: "mcq_exact",
    hint: "On multiplie chaque coordonnée par $2$.",
    explanation: exp(
      "On applique $k\\vec{u}(kx\\,;ky)$ avec $k = 2$.",
      "$(2 \\times 3\\,;2 \\times (-1))$.",
      "$= (6\\,;-2)$.",
      "$2\\vec{u}(6\\,;-2)$."
    ),
    tags: ["seconde", "maths", "vecteurs", "produit_reel", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_prod_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_produit_reel",
    difficulty: 3,
    theme: "neutral",
    text: "Multiplier un vecteur par un réel $k < 0$ change :",
    format: "qcm",
    choices: [
      "Le sens du vecteur (et sa norme selon $|k|$)",
      "Seulement la direction",
      "Rien du tout",
      "Uniquement l'abscisse",
    ],
    expected: ["Le sens du vecteur (et sa norme selon $|k|$)"],
    comparator: "mcq_exact",
    hint: "Un coefficient négatif « retourne » le vecteur.",
    explanation: exp(
      "Le signe de $k$ agit sur le sens, sa valeur absolue sur la norme.",
      "Si $k < 0$, le vecteur change de sens.",
      "La direction reste la même (vecteurs colinéaires).",
      "Le sens change (et la norme est multipliée par $|k|$)."
    ),
    tags: ["seconde", "maths", "vecteurs", "produit_reel", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_vect_prod_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_produit_reel",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie chaque coordonnée par $k$.",
    tags: ["seconde", "maths", "vecteurs", "produit_reel", "template"],
    generate: () => {
      const k = randomInt(2, 4);
      const x = randomInt(-4, 4);
      // Deux pièges : « on n'a multiplié que la première coordonnée » et « on a
      // échangé les deux ». Avec y = 0 le premier tombe sur la réponse, avec
      // y = x le second.
      let y = randomInt(-4, 4);
      while (y === 0 || y === x) y = randomInt(-4, 4);
      const correct = `$(${k * x}\\,;${k * y})$`;
      const choices = [correct, `$(${x + k}\\,;${y + k})$`, `$(${k * x}\\,;${y})$`, `$(${k * y}\\,;${k * x})$`];
      return {
        text: `Soit $\\vec{u}(${x}\\,;${y})$. Quelles sont les coordonnées de $${k}\\vec{u}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On multiplie chaque coordonnée par $k$.",
          `$(${k} \\times ${x}\\,;${k} \\times ${y})$.`,
          `$= (${k * x}\\,;${k * y})$.`,
          `$${k}\\vec{u}(${k * x}\\,;${k * y})$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_prod_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_produit_reel",
    difficulty: 3,
    theme: "neutral",
    hint: "Abscisse de $k\\vec{u}$ : $k \\times x$.",
    tags: ["seconde", "maths", "vecteurs", "produit_reel", "template"],
    generate: () => {
      const k = randomInt(2, 5);
      const x = randomInt(-5, 5);
      const y = randomInt(-5, 5);
      return {
        text: `Soit $\\vec{u}(${x}\\,;${y})$. Quelle est l'abscisse de $${k}\\vec{u}$ ?`,
        format: "short",
        expected: [String(k * x)],
        comparator: "number_equal",
        explanation: exp(
          "On multiplie l'abscisse par $k$.",
          `$${k} \\times ${x}$.`,
          `$= ${k * x}$.`,
          `L'abscisse vaut $${k * x}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_vect_prod_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_produit_reel",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $\\vec{u}(2\\,;5)$. Quelles sont les coordonnées de $-\\vec{u}$ ?",
    format: "qcm",
    choices: ["$(-2\\,;-5)$", "$(2\\,;5)$", "$(-2\\,;5)$", "$(5\\,;2)$"],
    expected: ["$(-2\\,;-5)$"],
    comparator: "mcq_exact",
    hint: "$-\\vec{u} = (-1)\\vec{u}$.",
    explanation: exp(
      "L'opposé revient à multiplier par $-1$.",
      "$(-1 \\times 2\\,;-1 \\times 5)$.",
      "$= (-2\\,;-5)$.",
      "$-\\vec{u}(-2\\,;-5)$."
    ),
    tags: ["seconde", "maths", "vecteurs", "produit_reel", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_prod_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_produit_reel",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $\\vec{u}(4\\,;-6)$. Quelle est l'ordonnée de $\\dfrac{1}{2}\\vec{u}$ ?",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "On multiplie l'ordonnée par $\\dfrac{1}{2}$.",
    explanation: exp(
      "On multiplie chaque coordonnée par $\\dfrac{1}{2}$.",
      "Ordonnée : $\\dfrac{1}{2} \\times (-6)$.",
      "$= -3$.",
      "L'ordonnée vaut $-3$."
    ),
    tags: ["seconde", "maths", "vecteurs", "produit_reel", "short"],
  },

  /* ===================== VECTEUR_COLINEARITE ===================== */

  {
    kind: "fixed",
    id: "seconde_vect_col_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_colinearite",
    difficulty: 2,
    theme: "neutral",
    text: "Comment calcule-t-on le déterminant de $\\vec{u}(x\\,;y)$ et $\\vec{v}(x'\\,;y')$ ?",
    format: "qcm",
    choices: ["$xy' - yx'$", "$xx' + yy'$", "$xy + x'y'$", "$x'y' - xy$"],
    expected: ["$xy' - yx'$"],
    comparator: "mcq_exact",
    hint: "Produit en croix : $x \\times y' - y \\times x'$.",
    explanation: exp(
      "Le déterminant est un produit « en croix ».",
      "$\\det(\\vec{u}, \\vec{v}) = x y' - y x'$.",
      "On multiplie en diagonale puis on soustrait.",
      "$\\det = xy' - yx'$."
    ),
    tags: ["seconde", "maths", "vecteurs", "colinearite", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_col_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_colinearite",
    difficulty: 2,
    theme: "neutral",
    text: "Deux vecteurs sont colinéaires si et seulement si leur déterminant est :",
    format: "qcm",
    choices: ["nul", "positif", "négatif", "égal à $1$"],
    expected: ["nul"],
    comparator: "mcq_exact",
    hint: "C'est le critère de colinéarité.",
    explanation: exp(
      "Le déterminant teste la colinéarité.",
      "Il vaut $0$ exactement quand les vecteurs ont la même direction.",
      "Donc colinéaires $\\iff \\det = 0$.",
      "Le déterminant est nul."
    ),
    tags: ["seconde", "maths", "vecteurs", "colinearite", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_col_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_colinearite",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule le déterminant de $\\vec{u}(2\\,;4)$ et $\\vec{v}(1\\,;2)$.",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$xy' - yx' = 2 \\times 2 - 4 \\times 1$.",
    explanation: exp(
      "On applique $\\det = xy' - yx'$.",
      "$2 \\times 2 - 4 \\times 1 = 4 - 4$.",
      "$= 0$.",
      "Le déterminant vaut $0$ : les vecteurs sont colinéaires."
    ),
    tags: ["seconde", "maths", "vecteurs", "colinearite", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_col_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_colinearite",
    difficulty: 3,
    theme: "neutral",
    text: "Les vecteurs $\\vec{u}(2\\,;4)$ et $\\vec{v}(1\\,;2)$ sont-ils colinéaires ?",
    format: "qcm",
    choices: ["Oui, car leur déterminant est nul", "Non", "Oui, car ils sont égaux", "Non, car de tailles différentes"],
    expected: ["Oui, car leur déterminant est nul"],
    comparator: "mcq_exact",
    hint: "$\\det = 2\\times2 - 4\\times1 = 0$.",
    explanation: exp(
      "On calcule le déterminant et on applique le critère.",
      "$\\det = 2 \\times 2 - 4 \\times 1 = 0$.",
      "Déterminant nul → vecteurs colinéaires.",
      "Oui, ils sont colinéaires."
    ),
    tags: ["seconde", "maths", "vecteurs", "colinearite", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_vect_col_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_colinearite",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\det = xy' - yx'$.",
    tags: ["seconde", "maths", "vecteurs", "colinearite", "template"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(-5, 5);
      const xp = randomInt(1, 5);
      const yp = randomInt(-5, 5);
      const det = x * yp - y * xp;
      return {
        text: `Calcule le déterminant de $\\vec{u}(${x}\\,;${y})$ et $\\vec{v}(${xp}\\,;${yp})$.`,
        format: "short",
        expected: [String(det)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $\\det = xy' - yx'$.",
          `$${x} \\times ${yp} - ${y} \\times ${xp} = ${x * yp} - ${y * xp}$.`,
          `$= ${det}$.`,
          `Le déterminant vaut $${det}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_col_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_colinearite",
    difficulty: 4,
    theme: "neutral",
    hint: "Colinéaires ⟺ déterminant nul.",
    tags: ["seconde", "maths", "vecteurs", "colinearite", "template"],
    generate: () => {
      const x = randomInt(1, 4);
      const y = randomInt(1, 4);
      const colineaires = Math.random() < 0.5;
      const k = randomInt(2, 3);
      const xp = colineaires ? k * x : k * x + 1;
      const yp = k * y;
      return {
        text: `Les vecteurs $\\vec{u}(${x}\\,;${y})$ et $\\vec{v}(${xp}\\,;${yp})$ sont-ils colinéaires ?`,
        format: "qcm",
        choices: ["Oui", "Non"],
        expected: [colineaires ? "Oui" : "Non"],
        comparator: "mcq_exact",
        explanation: exp(
          "On calcule le déterminant $xy' - yx'$.",
          `$${x} \\times ${yp} - ${y} \\times ${xp} = ${x * yp - y * xp}$.`,
          colineaires ? "Le déterminant est nul." : "Le déterminant n'est pas nul.",
          colineaires ? "Oui, ils sont colinéaires." : "Non, ils ne sont pas colinéaires."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_vect_col_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_colinearite",
    difficulty: 4,
    theme: "neutral",
    text: "Comment montrer que trois points $A$, $B$, $C$ sont alignés ?",
    format: "qcm",
    choices: [
      "Montrer que $\\vec{AB}$ et $\\vec{AC}$ sont colinéaires",
      "Montrer que $AB = AC$",
      "Montrer que $\\vec{AB}$ et $\\vec{AC}$ sont orthogonaux",
      "Montrer que $B$ est le milieu de $[AC]$",
    ],
    expected: ["Montrer que $\\vec{AB}$ et $\\vec{AC}$ sont colinéaires"],
    comparator: "mcq_exact",
    hint: "Alignement = même direction depuis $A$.",
    explanation: exp(
      "Trois points sont alignés s'ils sont sur une même droite.",
      "Cela revient à dire que $\\vec{AB}$ et $\\vec{AC}$ ont la même direction.",
      "Donc on montre qu'ils sont colinéaires (déterminant nul).",
      "On montre que $\\vec{AB}$ et $\\vec{AC}$ sont colinéaires."
    ),
    tags: ["seconde", "maths", "vecteurs", "colinearite", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_vect_col_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_colinearite",
    difficulty: 5,
    theme: "neutral",
    text: "À quoi sert le critère de colinéarité par le déterminant ?",
    format: "qcm",
    choices: [
      "À prouver un alignement de points ou un parallélisme de droites",
      "À calculer une aire de cercle",
      "À mesurer un angle",
      "À résoudre une équation du second degré",
    ],
    expected: ["À prouver un alignement de points ou un parallélisme de droites"],
    comparator: "mcq_exact",
    hint: "Colinéarité ↔ même direction.",
    explanation: exp(
      "La colinéarité traduit une même direction.",
      "Elle sert à démontrer que des points sont alignés (vecteurs $\\vec{AB}$, $\\vec{AC}$).",
      "Ou que deux droites sont parallèles (vecteurs directeurs colinéaires).",
      "À prouver un alignement ou un parallélisme."
    ),
    tags: ["seconde", "maths", "vecteurs", "colinearite", "raisonnement", "qcm"],
  },

  /* ---- les gabarits qui manquaient a la definition du vecteur ---- */

  {
    kind: "template",
    id: "seconde_vect_def_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$ — et un carré efface le signe.",
    tags: ["seconde", "maths", "vecteurs", "norme", "template", "short"],
    generate: () => {
      const [a, b, n] = choisir(TRIPLETS);
      const sx = Math.random() < 0.5 ? -1 : 1;
      const sy = Math.random() < 0.5 ? -1 : 1;
      const x = sx * a;
      const y = sy * b;
      return {
        text: `Calculer la norme du vecteur $\\vec{u}\\,(${x}\\,;\\,${y})$.`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "La norme d'un vecteur est sa longueur : $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.",
          "On élève chaque coordonnée au carré, on additionne, puis on prend la racine.",
          `$${x}^2 + ${y}^2 = ${a * a} + ${b * b} = ${n * n}$, et $\\sqrt{${n * n}} = ${n}$.`,
          `$\\|\\vec{u}\\| = ${n}$ — une norme est TOUJOURS positive : les carrés effacent les signes.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_def_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_definition",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplier par un nombre NÉGATIF garde la direction mais retourne le sens.",
    tags: ["seconde", "maths", "vecteurs", "direction", "sens", "template", "qcm"],
    generate: () => {
      const x = randomInt(1, 5) * (Math.random() < 0.5 ? -1 : 1);
      const y = randomInt(1, 5) * (Math.random() < 0.5 ? -1 : 1);
      const k = choisir([-3, -2, 2, 3]);
      const positif = k > 0;
      const correct = positif
        ? "même direction et même sens"
        : "même direction, mais sens opposé";
      return {
        text: `Soient $\\vec{u}\\,(${x}\\,;\\,${y})$ et $\\vec{v}\\,(${k * x}\\,;\\,${k * y})$. Que peut-on dire de ces deux vecteurs ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          positif ? "même direction, mais sens opposé" : "même direction et même sens",
          "directions différentes",
          "même norme",
          "ils sont perpendiculaires",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux vecteurs proportionnels ont la même direction : ils sont colinéaires.",
          "On cherche le nombre par lequel il faut multiplier le premier pour obtenir le second, et on regarde son signe.",
          `Ici $\\vec{v} = ${k}\\,\\vec{u}$, et ce coefficient est ${positif ? "POSITIF" : "NÉGATIF"}.`,
          positif
            ? "Un coefficient positif conserve le sens : même direction, même sens, seule la norme change."
            : "Un coefficient négatif retourne la flèche : même direction, sens opposé."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_def_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "Le vecteur opposé pointe exactement à l'inverse.",
    tags: ["seconde", "maths", "vecteurs", "sens", "template", "qcm"],
    generate: () => {
      const x = randomInt(1, 6) * (Math.random() < 0.5 ? -1 : 1);
      const y = randomInt(1, 6) * (Math.random() < 0.5 ? -1 : 1);
      return {
        text: `Quelles sont les coordonnées du vecteur $-\\vec{u}$, si $\\vec{u}\\,(${x}\\,;\\,${y})$ ?`,
        format: "qcm",
        choices: makeChoices(`$(${-x}\\,;\\,${-y})$`, [
          `$(${-x}\\,;\\,${y})$`,
          `$(${x}\\,;\\,${-y})$`,
          `$(${x}\\,;\\,${y})$`,
          `$(${y}\\,;\\,${x})$`,
        ]),
        expected: [`$(${-x}\\,;\\,${-y})$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le vecteur opposé a la même direction et la même norme, mais le sens contraire.",
          "On change le signe des DEUX coordonnées.",
          `$-\\vec{u}\\,(${-x}\\,;\\,${-y})$.`,
          "N'en changer qu'une donnerait un vecteur de direction différente, pas l'opposé."
        ),
      };
    },
  },

  /* ============ VECTEUR_CHASLES_CALCUL (09/09/2026) ============
   *
   * ⛔ MESURE QUI A DECIDE CETTE MICRO : sur les 60 items de la notion, 40
   * travaillaient en coordonnees et les 20 autres etaient tous FIXES. Pas un
   * generateur ne fonctionnait sans repere — alors que l'exercice 3 du controle
   * commun de mars 2025 est entierement « vecteurs SANS reperage ».
   *
   * ⛔ Et zero item sur la SOUSTRACTION. `AB - AC = CB` n'existait nulle part,
   * alors que c'est le piege classique : l'eleve ecrit `BC` parce qu'il lit les
   * lettres dans l'ordre ou elles sont ecrites.
   *
   * ⭐ Ces gabarits tirent des LETTRES, pas des nombres : c'est ce qui les rend
   * utilisables sans repere, et c'est le seul endroit de la banque ou le geste
   * est purement geometrique.
   */

  {
    kind: "template",
    id: "seconde_vect_chasles_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_chasles_calcul",
    difficulty: 2,
    theme: "neutral",
    hint: "La lettre du milieu disparaît : elle est le point de passage.",
    tags: ["seconde", "maths", "vecteurs", "chasles", "template"],
    generate: () => {
      const [p, q, r] = shuffle(["A", "B", "C", "D", "E", "F", "G", "H"]).slice(0, 3);
      const correct = `$\\vec{${p}${r}}$`;
      const choices = makeChoices(correct, [
        `$\\vec{${r}${p}}$`,
        `$\\vec{${p}${q}}$`,
        `$\\vec{${q}${r}}$`,
        `$\\vec{0}$`,
      ]);
      return {
        text: `Simplifier $\\vec{${p}${q}} + \\vec{${q}${r}}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La relation de Chasles : aller de $A$ à $B$ puis de $B$ à $C$, c'est aller de $A$ à $C$.",
          "Quand la lettre d'arrivée du premier vecteur est la lettre de départ du second, elle DISPARAÎT.",
          `Ici $${q}$ est cette lettre de passage : $\\vec{${p}${q}} + \\vec{${q}${r}} = \\vec{${p}${r}}$.`,
          `$\\vec{${p}${q}} + \\vec{${q}${r}} = \\vec{${p}${r}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_chasles_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_chasles_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Une somme de vecteurs se réorganise librement : cherche deux morceaux qui s'enchaînent.",
    tags: ["seconde", "maths", "vecteurs", "chasles", "template"],
    generate: () => {
      const [p, q, r, s] = shuffle(["A", "B", "C", "D", "E", "F", "G", "H"]).slice(0, 4);
      // L'enonce presente les trois morceaux DANS LE DESORDRE : PQ + RS + QR.
      // Remis dans l'ordre, PQ + QR + RS = PS.
      const correct = `$\\vec{${p}${s}}$`;
      const choices = makeChoices(correct, [
        `$\\vec{${s}${p}}$`,
        `$\\vec{${p}${r}}$`,
        `$\\vec{${q}${s}}$`,
        `$\\vec{0}$`,
      ]);
      return {
        text: `Simplifier $\\vec{${p}${q}} + \\vec{${r}${s}} + \\vec{${q}${r}}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une somme de vecteurs peut se réorganiser dans n'importe quel ordre — l'addition est commutative.",
          "On cherche des morceaux qui s'enchaînent, quitte à les remettre dans l'ordre avant d'appliquer Chasles.",
          `On réordonne : $\\vec{${p}${q}} + \\vec{${q}${r}} + \\vec{${r}${s}}$. ` +
            `Puis $\\vec{${p}${q}} + \\vec{${q}${r}} = \\vec{${p}${r}}$, et $\\vec{${p}${r}} + \\vec{${r}${s}} = \\vec{${p}${s}}$.`,
          `La somme vaut $\\vec{${p}${s}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_chasles_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_chasles_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Soustraire un vecteur, c'est ajouter son opposé : $-\\vec{AC} = \\vec{CA}$.",
    tags: ["seconde", "maths", "vecteurs", "chasles", "soustraction", "template"],
    generate: () => {
      const [p, q, r] = shuffle(["A", "B", "C", "D", "E", "F", "G", "H"]).slice(0, 3);
      // PQ - PR = PQ + RP = RP + PQ = RQ. Les deux vecteurs partent du MEME
      // point : c'est la forme sous laquelle le sujet la pose.
      const correct = `$\\vec{${r}${q}}$`;
      // ⛔ Le premier piege est LA reponse fausse : l'eleve lit les lettres dans
      // l'ordre ou elles sont ecrites et repond QR au lieu de RQ.
      const choices = makeChoices(correct, [
        `$\\vec{${q}${r}}$`,
        `$\\vec{${p}${q}}$`,
        `$\\vec{${p}${r}}$`,
        `$\\vec{0}$`,
      ]);
      return {
        text: `Simplifier $\\vec{${p}${q}} - \\vec{${p}${r}}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Soustraire un vecteur, c'est ajouter son opposé — et l'opposé de $\\vec{AC}$ est $\\vec{CA}$, les lettres retournées.",
          "On transforme la différence en somme, puis on applique Chasles.",
          `$\\vec{${p}${q}} - \\vec{${p}${r}} = \\vec{${p}${q}} + \\vec{${r}${p}} = \\vec{${r}${p}} + \\vec{${p}${q}} = \\vec{${r}${q}}$.`,
          `$\\vec{${p}${q}} - \\vec{${p}${r}} = \\vec{${r}${q}}$. ⛔ Et non $\\vec{${q}${r}}$ : l'ordre des lettres est l'inverse de celui qu'on lit.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_chasles_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_chasles_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "On part d'un point et on y revient : que vaut alors le déplacement total ?",
    tags: ["seconde", "maths", "vecteurs", "chasles", "template"],
    generate: () => {
      const [p, q, r] = shuffle(["A", "B", "C", "D", "E", "F", "G", "H"]).slice(0, 3);
      const correct = "$\\vec{0}$";
      const choices = makeChoices(correct, [
        `$\\vec{${p}${r}}$`,
        `$\\vec{${p}${q}}$`,
        `$\\vec{${r}${p}}$`,
        `$3\\vec{${p}${q}}$`,
      ]);
      return {
        text: `Simplifier $\\vec{${p}${q}} + \\vec{${q}${r}} + \\vec{${r}${p}}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le vecteur nul est celui dont le départ et l'arrivée sont confondus.",
          "On applique Chasles de proche en proche, et on regarde où l'on arrive.",
          `$\\vec{${p}${q}} + \\vec{${q}${r}} = \\vec{${p}${r}}$, puis $\\vec{${p}${r}} + \\vec{${r}${p}} = \\vec{${p}${p}} = \\vec{0}$.`,
          "Le circuit est fermé — on revient au point de départ : la somme vaut $\\vec{0}$."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_chasles_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_chasles_calcul",
    difficulty: 5,
    theme: "neutral",
    hint: "Chasles se lit aussi de droite à gauche : un vecteur se COUPE en deux par un point de passage.",
    tags: ["seconde", "maths", "vecteurs", "chasles", "decomposition", "template"],
    generate: () => {
      const [p, q, r] = shuffle(["A", "B", "C", "D", "E", "F", "G", "H"]).slice(0, 3);
      const correct = `$\\vec{${p}${r}} + \\vec{${r}${q}}$`;
      const choices = makeChoices(correct, [
        `$\\vec{${p}${r}} + \\vec{${q}${r}}$`,
        `$\\vec{${r}${p}} + \\vec{${r}${q}}$`,
        `$\\vec{${p}${r}} - \\vec{${r}${q}}$`,
        `$\\vec{${q}${r}} + \\vec{${r}${p}}$`,
      ]);
      return {
        text: `Décomposer $\\vec{${p}${q}}$ en passant par le point $${r}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Chasles se lit dans les deux sens : il RASSEMBLE deux vecteurs, mais il permet aussi d'en COUPER un en deux.",
          `On insère le point de passage entre le départ et l'arrivée : $\\vec{${p}${q}} = \\vec{${p}\\square} + \\vec{\\square${q}}$, où $\\square$ est le point choisi.`,
          `Avec $${r}$ : $\\vec{${p}${q}} = \\vec{${p}${r}} + \\vec{${r}${q}}$. La lettre $${r}$ apparaît deux fois, en arrivée puis en départ.`,
          `$\\vec{${p}${q}} = \\vec{${p}${r}} + \\vec{${r}${q}}$. ⭐ C'est le geste qui débloque presque tous les exercices sans repérage.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_vect_chasles_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_chasles_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit $\\vec{AB} - \\vec{AC} = \\vec{BC}$. Où est son erreur ?",
    format: "qcm",
    choices: [
      "le résultat est $\\vec{CB}$ : il a inversé les lettres",
      "il fallait additionner, pas soustraire",
      "on ne peut pas soustraire deux vecteurs",
      "il n'y a pas d'erreur",
    ],
    expected: ["le résultat est $\\vec{CB}$ : il a inversé les lettres"],
    comparator: "mcq_exact",
    hint: "$-\\vec{AC} = \\vec{CA}$ : l'opposé retourne les lettres.",
    explanation: exp(
      "Soustraire un vecteur, c'est ajouter son opposé, et l'opposé retourne les lettres.",
      "$\\vec{AB} - \\vec{AC} = \\vec{AB} + \\vec{CA} = \\vec{CA} + \\vec{AB} = \\vec{CB}$.",
      "L'élève a gardé l'ordre dans lequel les lettres sont ÉCRITES — $B$ puis $C$ — au lieu de suivre le calcul.",
      "Le résultat est $\\vec{CB}$, pas $\\vec{BC}$ : ce sont deux vecteurs opposés."
    ),
    tags: ["seconde", "maths", "vecteurs", "chasles", "piege", "qcm"],
  },

  /* ============ VECTEUR_POINT_DEFINI (09/09/2026) ============
   *
   * L'autre geste sans reperage : une egalite vectorielle DEFINIT un point, et
   * le sujet demande de le placer. C'est la face constructive de l'egalite de
   * vecteurs, et elle n'existait nulle part dans la banque.
   */

  {
    kind: "template",
    id: "seconde_vect_point_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_point_defini",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux vecteurs égaux ferment un parallélogramme — attention à l'ordre des sommets.",
    tags: ["seconde", "maths", "vecteurs", "construction", "template"],
    generate: () => {
      const [p, q, r] = shuffle(["A", "B", "C", "D", "E", "F"]).slice(0, 3);
      // PM = QR : le quadrilatere PQRM a ses cotes [PM] et [QR] paralleles et de
      // meme longueur, donc PQRM est un parallelogramme. ⚠️ L'ordre des sommets
      // n'est PAS PQRM au hasard : PM = QR s'ecrit aussi PQ = MR.
      const correct = `$${p}${q}${r}M$ est un parallélogramme`;
      const choices = makeChoices(correct, [
        `$${p}${q}M${r}$ est un parallélogramme`,
        `$M$ est le milieu de $[${p}${r}]$`,
        `$M$ est le symétrique de $${p}$ par rapport à $${q}$`,
        `$M$ est confondu avec $${r}$`,
      ]);
      return {
        text: `Le point $M$ vérifie $\\vec{${p}M} = \\vec{${q}${r}}$. Que peut-on en dire ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux vecteurs égaux ont même direction, même sens et même longueur : ils sont les côtés opposés d'un parallélogramme.",
          "On lit l'égalité comme une consigne de construction : depuis $" + p + "$, on reproduit le déplacement qui va de $" + q + "$ à $" + r + "$.",
          `$\\vec{${p}M} = \\vec{${q}${r}}$ équivaut à $\\vec{${p}${q}} = \\vec{M${r}}$ : les segments $[${p}${q}]$ et $[M${r}]$ sont parallèles et de même longueur.`,
          `$${p}${q}${r}M$ est un parallélogramme.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_point_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_point_defini",
    difficulty: 4,
    theme: "neutral",
    hint: "Le déplacement est DEUX fois celui qui mène au second point : où tombe-t-on ?",
    tags: ["seconde", "maths", "vecteurs", "construction", "template"],
    generate: () => {
      const [p, q] = shuffle(["A", "B", "C", "D", "E", "F"]).slice(0, 2);
      const correct = `$${q}$ est le milieu de $[${p}M]$`;
      const choices = makeChoices(correct, [
        `$M$ est le milieu de $[${p}${q}]$`,
        `$${p}$ est le milieu de $[${q}M]$`,
        `$M$ est confondu avec $${q}$`,
        `$M$ est le symétrique de $${q}$ par rapport à $${p}$`,
      ]);
      return {
        text: `Le point $M$ vérifie $\\vec{${p}M} = 2\\vec{${p}${q}}$. Que peut-on en dire ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier un vecteur par $2$ garde la direction et le sens, et double la longueur.",
          "On part de $" + p + "$ et on parcourt DEUX fois le déplacement qui mène à $" + q + "$.",
          `On arrive donc au double de la distance, dans le même sens : $${p}${q} = ${q}M$, et les trois points sont alignés dans cet ordre.`,
          `$${q}$ est le milieu de $[${p}M]$ — autrement dit $M$ est le symétrique de $${p}$ par rapport à $${q}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_vect_point_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_point_defini",
    difficulty: 5,
    theme: "neutral",
    hint: "Le coefficient est négatif : le déplacement se fait dans l'autre sens.",
    tags: ["seconde", "maths", "vecteurs", "construction", "template"],
    generate: () => {
      const [p, q] = shuffle(["A", "B", "C", "D", "E", "F"]).slice(0, 2);
      const correct = `$${p}$ est le milieu de $[${q}M]$`;
      const choices = makeChoices(correct, [
        `$${q}$ est le milieu de $[${p}M]$`,
        `$M$ est le milieu de $[${p}${q}]$`,
        `$M$ est confondu avec $${q}$`,
        `$${p}${q}M$ est un triangle équilatéral`,
      ]);
      return {
        text: `Le point $M$ vérifie $\\vec{${p}M} = -\\vec{${p}${q}}$. Que peut-on en dire ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un coefficient négatif retourne le sens du vecteur, sans changer sa longueur.",
          "On part de $" + p + "$ et on parcourt la même distance que vers $" + q + "$, mais dans l'autre sens.",
          `$M$ est donc à égale distance de $${p}$ que $${q}$, de l'autre côté : $\\vec{${p}M}$ et $\\vec{${p}${q}}$ sont opposés.`,
          `$${p}$ est le milieu de $[${q}M]$, c'est-à-dire que $M$ est le symétrique de $${q}$ par rapport à $${p}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_vect_point_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "vecteurs_plan",
    microId: "vecteur_point_defini",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de points $M$ vérifiant $\\vec{AM} = \\vec{u}$, pour un point $A$ et un vecteur $\\vec{u}$ donnés ?",
    format: "qcm",
    choices: ["exactement un", "aucun", "deux", "une infinité"],
    expected: ["exactement un"],
    comparator: "mcq_exact",
    hint: "Un vecteur donne une direction, un sens ET une longueur : il ne reste aucun choix.",
    explanation: exp(
      "Un vecteur est entièrement déterminé par sa direction, son sens et sa norme.",
      "Partant de $A$, ces trois données fixent l'arrivée sans ambiguïté.",
      "C'est ce qui permet d'écrire « soit $M$ le point tel que… » : la phrase DÉFINIT le point, elle ne le suppose pas.",
      "Il y a exactement un tel point $M$."
    ),
    tags: ["seconde", "maths", "vecteurs", "construction", "raisonnement", "qcm"],
  },
];
