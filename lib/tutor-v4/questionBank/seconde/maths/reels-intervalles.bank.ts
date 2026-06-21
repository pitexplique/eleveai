// lib/tutor-v4/questionBank/seconde/maths/reels-intervalles.bank.ts
//
// Notion : Nombres réels et intervalles (reels_intervalles)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   reels_ensembles        — Distinguer les ensembles N, Z, D, Q et R
//   reels_droite_graduee   — Associer un réel à un point de la droite graduée
//   intervalle_representer — Représenter / traduire un intervalle
//   intervalle_appartenance— Déterminer si un nombre appartient à un intervalle
//   valeur_absolue_distance— Interpréter la valeur absolue comme une distance
//   reels_encadrement      — Donner un encadrement décimal d'un réel
//
// Conventions (identiques à terminale-spé) :
// - Formules en LaTeX ($...$), rendues via KaTeX.
// - Règle QCM : dès qu'une réponse est une EXPRESSION → "qcm". Réponses tapées
//   ("short" + "number_equal") uniquement pour du purement numérique.
// - Canvas "number_line" pour illustrer la droite graduée.

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

// Droite graduée avec un (ou plusieurs) point(s).
function droiteGraduee(
  points: { value: number; label?: string; color?: string }[],
  min: number,
  max: number,
  step = 1
): CanvasFigure {
  return {
    kind: "number_line",
    min,
    max,
    step,
    points,
    display: {
      showTicks: true,
      showValues: true,
      showPoints: true,
      showPointLabels: true,
      showZero: true,
    },
    size: { width: 360, height: 90 },
  };
}

export const reelsIntervallesBank: TutorBankItemV4[] = [
  /* =========================================================
     REELS_ENSEMBLES — Distinguer N, Z, D, Q, R
  ========================================================= */

  {
    kind: "fixed",
    id: "seconde_reels_ensembles_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_ensembles",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre $5$ appartient-il à l'ensemble $\\mathbb{N}$ des entiers naturels ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement à $\\mathbb{Z}$", "Seulement à $\\mathbb{R}$"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "$\\mathbb{N}$ contient $0, 1, 2, 3, \\dots$",
    explanation: exp(
      "$\\mathbb{N}$ est l'ensemble des entiers naturels : $0, 1, 2, 3, \\dots$",
      "On regarde si $5$ est un entier positif.",
      "$5$ est un entier positif, donc $5 \\in \\mathbb{N}$.",
      "Oui, $5$ appartient à $\\mathbb{N}$."
    ),
    tags: ["seconde", "maths", "reels", "ensembles", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_ensembles_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_ensembles",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre $-3$ appartient-il à $\\mathbb{N}$ ?",
    format: "qcm",
    choices: ["Non, mais il appartient à $\\mathbb{Z}$", "Oui", "Non, il n'appartient à rien", "Oui, car c'est un entier"],
    expected: ["Non, mais il appartient à $\\mathbb{Z}$"],
    comparator: "mcq_exact",
    hint: "$\\mathbb{N}$ ne contient pas les nombres négatifs.",
    explanation: exp(
      "$\\mathbb{N}$ ne contient que les entiers positifs ou nuls ; $\\mathbb{Z}$ contient aussi les négatifs.",
      "On vérifie le signe de $-3$.",
      "$-3$ est négatif : $-3 \\notin \\mathbb{N}$, mais $-3 \\in \\mathbb{Z}$.",
      "Non : $-3$ appartient à $\\mathbb{Z}$, pas à $\\mathbb{N}$."
    ),
    tags: ["seconde", "maths", "reels", "ensembles", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_ensembles_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_ensembles",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus petit ensemble auquel appartient $-2{,}5$ ?",
    format: "qcm",
    choices: ["$\\mathbb{D}$ (décimaux)", "$\\mathbb{N}$", "$\\mathbb{Z}$", "$\\mathbb{R}$ uniquement"],
    expected: ["$\\mathbb{D}$ (décimaux)"],
    comparator: "mcq_exact",
    hint: "$-2{,}5$ a un nombre fini de chiffres après la virgule.",
    explanation: exp(
      "Un nombre décimal a une écriture finie après la virgule.",
      "On cherche le plus petit ensemble contenant $-2{,}5$.",
      "$-2{,}5$ n'est pas entier mais est décimal : $-2{,}5 \\in \\mathbb{D}$.",
      "Le plus petit ensemble est $\\mathbb{D}$."
    ),
    tags: ["seconde", "maths", "reels", "ensembles", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_ensembles_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_ensembles",
    difficulty: 2,
    theme: "neutral",
    text: "À quel plus petit ensemble appartient $\\dfrac{1}{3}$ ?",
    format: "qcm",
    choices: ["$\\mathbb{Q}$ (rationnels)", "$\\mathbb{D}$ (décimaux)", "$\\mathbb{Z}$", "$\\mathbb{N}$"],
    expected: ["$\\mathbb{Q}$ (rationnels)"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{1}{3} = 0{,}333\\dots$ n'a pas d'écriture décimale finie.",
    explanation: exp(
      "Un rationnel est un quotient de deux entiers ; il n'est pas toujours décimal.",
      "On essaie d'écrire $\\dfrac{1}{3}$ sous forme décimale.",
      "$\\dfrac{1}{3} = 0{,}333\\dots$ : pas décimal, mais quotient d'entiers, donc rationnel.",
      "Le plus petit ensemble est $\\mathbb{Q}$."
    ),
    tags: ["seconde", "maths", "reels", "ensembles", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_ensembles_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_ensembles",
    difficulty: 3,
    theme: "neutral",
    text: "À quel plus petit ensemble appartient $\\sqrt{2}$ ?",
    format: "qcm",
    choices: ["$\\mathbb{R}$ (réels)", "$\\mathbb{Q}$ (rationnels)", "$\\mathbb{D}$ (décimaux)", "$\\mathbb{Z}$"],
    expected: ["$\\mathbb{R}$ (réels)"],
    comparator: "mcq_exact",
    hint: "$\\sqrt{2}$ ne peut pas s'écrire comme un quotient d'entiers.",
    explanation: exp(
      "Un nombre irrationnel n'est pas un quotient d'entiers : il appartient à $\\mathbb{R}$ sans appartenir à $\\mathbb{Q}$.",
      "On se demande si $\\sqrt{2}$ est rationnel.",
      "$\\sqrt{2}$ est irrationnel, donc $\\sqrt{2} \\in \\mathbb{R}$ mais $\\sqrt{2} \\notin \\mathbb{Q}$.",
      "Le plus petit ensemble est $\\mathbb{R}$."
    ),
    tags: ["seconde", "maths", "reels", "ensembles", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_ensembles_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_ensembles",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle suite d'inclusions est correcte ?",
    format: "qcm",
    choices: [
      "$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$",
      "$\\mathbb{R} \\subset \\mathbb{Q} \\subset \\mathbb{Z} \\subset \\mathbb{N}$",
      "$\\mathbb{Z} \\subset \\mathbb{N} \\subset \\mathbb{Q} \\subset \\mathbb{R}$",
      "$\\mathbb{N} \\subset \\mathbb{D} \\subset \\mathbb{Z} \\subset \\mathbb{R}$",
    ],
    expected: ["$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "On part du plus petit ensemble ($\\mathbb{N}$) vers le plus grand ($\\mathbb{R}$).",
    explanation: exp(
      "Les ensembles de nombres sont emboîtés du plus petit au plus grand.",
      "On ordonne : naturels, relatifs, décimaux, rationnels, réels.",
      "On obtient $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$.",
      "La bonne chaîne est $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$."
    ),
    tags: ["seconde", "maths", "reels", "ensembles", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_ensembles_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_ensembles",
    difficulty: 2,
    theme: "neutral",
    text: "« Tout nombre décimal est aussi un nombre rationnel. » Cette affirmation est-elle vraie ?",
    format: "qcm",
    choices: ["Vrai", "Faux", "Seulement pour les positifs", "Seulement pour les entiers"],
    expected: ["Vrai"],
    comparator: "mcq_exact",
    hint: "$\\mathbb{D} \\subset \\mathbb{Q}$.",
    explanation: exp(
      "Tout décimal peut s'écrire comme un quotient d'entiers (ex. $2{,}5 = \\dfrac{5}{2}$).",
      "On utilise l'inclusion $\\mathbb{D} \\subset \\mathbb{Q}$.",
      "Un décimal est donc toujours rationnel.",
      "L'affirmation est vraie."
    ),
    tags: ["seconde", "maths", "reels", "ensembles", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_ensembles_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_ensembles",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi ces nombres, lequel est irrationnel ?",
    format: "qcm",
    choices: ["$\\sqrt{5}$", "$\\sqrt{9}$", "$\\dfrac{7}{2}$", "$0{,}25$"],
    expected: ["$\\sqrt{5}$"],
    comparator: "mcq_exact",
    hint: "$\\sqrt{9} = 3$. Cherche celui qui ne « tombe pas juste ».",
    explanation: exp(
      "Un nombre irrationnel ne s'écrit pas comme un quotient d'entiers.",
      "On simplifie chaque nombre : $\\sqrt{9} = 3$, $\\dfrac{7}{2} = 3{,}5$, $0{,}25$ est décimal.",
      "Seul $\\sqrt{5}$ reste irrationnel.",
      "Le nombre irrationnel est $\\sqrt{5}$."
    ),
    tags: ["seconde", "maths", "reels", "ensembles", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_ensembles_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_ensembles",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle affirmation est correcte au sujet de $\\pi$ ?",
    format: "qcm",
    choices: [
      "$\\pi \\in \\mathbb{R}$ mais $\\pi \\notin \\mathbb{Q}$",
      "$\\pi \\in \\mathbb{Q}$",
      "$\\pi \\in \\mathbb{D}$",
      "$\\pi \\notin \\mathbb{R}$",
    ],
    expected: ["$\\pi \\in \\mathbb{R}$ mais $\\pi \\notin \\mathbb{Q}$"],
    comparator: "mcq_exact",
    hint: "$\\pi$ est un réel irrationnel.",
    explanation: exp(
      "$\\pi$ est un nombre réel irrationnel : il n'est pas un quotient d'entiers.",
      "On situe $\\pi$ dans les ensembles.",
      "$\\pi$ est réel ($\\pi \\in \\mathbb{R}$) mais pas rationnel ($\\pi \\notin \\mathbb{Q}$).",
      "La bonne affirmation est $\\pi \\in \\mathbb{R}$ et $\\pi \\notin \\mathbb{Q}$."
    ),
    tags: ["seconde", "maths", "reels", "ensembles", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_ensembles_fixed_10",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_ensembles",
    difficulty: 4,
    theme: "neutral",
    text: "À quel plus petit ensemble appartient le nombre $\\dfrac{6}{2}$ ?",
    format: "qcm",
    choices: ["$\\mathbb{N}$", "$\\mathbb{D}$", "$\\mathbb{Q}$ seulement", "$\\mathbb{R}$ seulement"],
    expected: ["$\\mathbb{N}$"],
    comparator: "mcq_exact",
    hint: "Simplifie d'abord la fraction.",
    explanation: exp(
      "Il faut simplifier avant de conclure : un quotient peut être un entier.",
      "On calcule $\\dfrac{6}{2}$.",
      "$\\dfrac{6}{2} = 3$, qui est un entier naturel.",
      "Le plus petit ensemble est $\\mathbb{N}$."
    ),
    tags: ["seconde", "maths", "reels", "ensembles", "qcm"],
  },

  /* =========================================================
     REELS_DROITE_GRADUEE — Lire un réel sur la droite graduée
  ========================================================= */

  {
    kind: "fixed",
    id: "seconde_droite_graduee_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_droite_graduee",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l'abscisse du point $A$ sur la droite graduée ci-dessous ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    canvas: droiteGraduee([{ value: 3, label: "A", color: "#dc2626" }], -5, 5, 1),
    hint: "Compte les graduations à partir de $0$.",
    explanation: exp(
      "L'abscisse d'un point est le nombre qui lui correspond sur la droite graduée.",
      "On repère la position de $A$ par rapport à $0$.",
      "$A$ est situé $3$ graduations à droite de $0$.",
      "L'abscisse de $A$ est $3$."
    ),
    tags: ["seconde", "maths", "reels", "droite_graduee", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_graduee_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_droite_graduee",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l'abscisse du point $B$ sur la droite graduée ci-dessous ?",
    format: "short",
    expected: ["-2"],
    comparator: "number_equal",
    canvas: droiteGraduee([{ value: -2, label: "B", color: "#2563eb" }], -5, 5, 1),
    hint: "Le point est à gauche de $0$, donc l'abscisse est négative.",
    explanation: exp(
      "Un point à gauche de $0$ a une abscisse négative.",
      "On compte les graduations entre $0$ et $B$.",
      "$B$ est $2$ graduations à gauche de $0$.",
      "L'abscisse de $B$ est $-2$."
    ),
    tags: ["seconde", "maths", "reels", "droite_graduee", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_graduee_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_droite_graduee",
    difficulty: 2,
    theme: "neutral",
    text: "La droite est graduée de $0{,}5$ en $0{,}5$. Quelle est l'abscisse du point $C$ ?",
    format: "short",
    expected: ["1,5", "1.5"],
    comparator: "number_equal",
    canvas: droiteGraduee([{ value: 1.5, label: "C", color: "#16a34a" }], -3, 3, 0.5),
    hint: "Chaque graduation vaut $0{,}5$.",
    explanation: exp(
      "Quand la droite est graduée de $0{,}5$ en $0{,}5$, chaque pas vaut un demi.",
      "On compte les graduations à partir de $0$.",
      "$C$ est à $3$ pas de $0{,}5$, soit $3 \\times 0{,}5 = 1{,}5$.",
      "L'abscisse de $C$ est $1{,}5$."
    ),
    tags: ["seconde", "maths", "reels", "droite_graduee", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_graduee_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_droite_graduee",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'abscisse du point $D$ sur la droite graduée ci-dessous ?",
    format: "short",
    expected: ["-4"],
    comparator: "number_equal",
    canvas: droiteGraduee([{ value: -4, label: "D", color: "#dc2626" }], -6, 6, 1),
    hint: "Compte les graduations à gauche de $0$.",
    explanation: exp(
      "On lit l'abscisse en comptant les graduations depuis $0$.",
      "$D$ est à gauche de $0$.",
      "$D$ est $4$ graduations à gauche de $0$.",
      "L'abscisse de $D$ est $-4$."
    ),
    tags: ["seconde", "maths", "reels", "droite_graduee", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_graduee_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_droite_graduee",
    difficulty: 2,
    theme: "neutral",
    text: "Quel point a pour abscisse $2$ sur la droite graduée ci-dessous ?",
    format: "qcm",
    choices: ["B", "A", "C", "Aucun"],
    expected: ["B"],
    comparator: "mcq_exact",
    canvas: droiteGraduee(
      [
        { value: -1, label: "A", color: "#dc2626" },
        { value: 2, label: "B", color: "#2563eb" },
        { value: 4, label: "C", color: "#16a34a" },
      ],
      -5,
      5,
      1
    ),
    hint: "Cherche le point situé $2$ graduations à droite de $0$.",
    explanation: exp(
      "On associe chaque point à son abscisse.",
      "On repère le point situé en $2$.",
      "$A$ est en $-1$, $B$ en $2$, $C$ en $4$.",
      "Le point d'abscisse $2$ est $B$."
    ),
    tags: ["seconde", "maths", "reels", "droite_graduee", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_graduee_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_droite_graduee",
    difficulty: 3,
    theme: "neutral",
    text: "La droite est graduée de $0{,}5$ en $0{,}5$. Quelle est l'abscisse du point $E$ ?",
    format: "short",
    expected: ["-2,5", "-2.5"],
    comparator: "number_equal",
    canvas: droiteGraduee([{ value: -2.5, label: "E", color: "#7c3aed" }], -4, 4, 0.5),
    hint: "Point à gauche de $0$, chaque graduation vaut $0{,}5$.",
    explanation: exp(
      "Chaque pas vaut $0{,}5$ et le point est à gauche de $0$.",
      "On compte $5$ pas de $0{,}5$ vers la gauche.",
      "$5 \\times 0{,}5 = 2{,}5$, à gauche donc négatif.",
      "L'abscisse de $E$ est $-2{,}5$."
    ),
    tags: ["seconde", "maths", "reels", "droite_graduee", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_graduee_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_droite_graduee",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une droite graduée, comment appelle-t-on le point d'abscisse $0$ ?",
    format: "qcm",
    choices: ["L'origine", "Le sommet", "Le milieu", "L'unité"],
    expected: ["L'origine"],
    comparator: "mcq_exact",
    hint: "C'est le point de référence à partir duquel on mesure.",
    explanation: exp(
      "Le point d'abscisse $0$ sert de référence sur la droite graduée.",
      "On se rappelle du vocabulaire du repérage.",
      "Ce point particulier s'appelle l'origine.",
      "Le point d'abscisse $0$ est l'origine."
    ),
    tags: ["seconde", "maths", "reels", "droite_graduee", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_graduee_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_droite_graduee",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi les nombres $-2$, $1$ et $-5$, lequel est le plus à gauche sur la droite graduée ?",
    format: "qcm",
    choices: ["$-5$", "$-2$", "$1$", "Ils sont à la même place"],
    expected: ["$-5$"],
    comparator: "mcq_exact",
    hint: "Plus un nombre est petit, plus il est à gauche.",
    explanation: exp(
      "Sur la droite graduée, le nombre le plus petit est le plus à gauche.",
      "On compare $-5$, $-2$ et $1$.",
      "$-5 < -2 < 1$, donc $-5$ est le plus petit.",
      "Le plus à gauche est $-5$."
    ),
    tags: ["seconde", "maths", "reels", "droite_graduee", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_graduee_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_droite_graduee",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'abscisse du point $F$ sur la droite graduée ci-dessous ?",
    format: "short",
    expected: ["4,5", "4.5"],
    comparator: "number_equal",
    canvas: droiteGraduee([{ value: 4.5, label: "F", color: "#ea580c" }], 0, 6, 0.5),
    hint: "Chaque graduation vaut $0{,}5$.",
    explanation: exp(
      "On lit l'abscisse en tenant compte du pas de graduation.",
      "Chaque pas vaut $0{,}5$ ; $F$ est entre $4$ et $5$.",
      "$F$ est à un demi-pas après $4$, soit $4{,}5$.",
      "L'abscisse de $F$ est $4{,}5$."
    ),
    tags: ["seconde", "maths", "reels", "droite_graduee", "short"],
  },

  {
    kind: "template",
    id: "seconde_droite_graduee_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_droite_graduee",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les graduations à partir de $0$ (à gauche = négatif).",
    tags: ["seconde", "maths", "reels", "droite_graduee", "template"],
    generate: () => {
      const v = randomInt(-5, 5);
      return {
        text: "Quelle est l'abscisse du point $M$ sur la droite graduée ci-dessous ?",
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: droiteGraduee([{ value: v, label: "M", color: "#dc2626" }], -6, 6, 1),
        explanation: exp(
          "L'abscisse se lit en comptant les graduations depuis l'origine.",
          "On repère la position de $M$ par rapport à $0$.",
          `$M$ est situé en $${v}$ sur la droite.`,
          `L'abscisse de $M$ est $${v}$.`
        ),
      };
    },
  },

  /* =========================================================
     INTERVALLE_REPRESENTER — Traduire / représenter un intervalle
  ========================================================= */

  {
    kind: "fixed",
    id: "seconde_intervalle_representer_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_representer",
    difficulty: 1,
    theme: "neutral",
    text: "L'ensemble des réels $x$ tels que $x \\ge 2$ correspond à quel intervalle ?",
    format: "qcm",
    choices: ["$[2\\,;+\\infty[$", "$]-\\infty\\,;2]$", "$]2\\,;+\\infty[$", "$[2\\,;+\\infty]$"],
    expected: ["$[2\\,;+\\infty[$"],
    comparator: "mcq_exact",
    hint: "$x \\ge 2$ : $2$ est inclus (crochet fermé), $+\\infty$ toujours ouvert.",
    explanation: exp(
      "Un crochet fermé inclut la borne ; le crochet est toujours ouvert vers $\\pm\\infty$.",
      "On traduit $x \\ge 2$.",
      "$2$ est inclus et il n'y a pas de borne supérieure finie : $[2\\,;+\\infty[$.",
      "L'intervalle est $[2\\,;+\\infty[$."
    ),
    tags: ["seconde", "maths", "reels", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_representer_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_representer",
    difficulty: 1,
    theme: "neutral",
    text: "L'ensemble des réels $x$ tels que $x < 5$ correspond à quel intervalle ?",
    format: "qcm",
    choices: ["$]-\\infty\\,;5[$", "$]-\\infty\\,;5]$", "$[5\\,;+\\infty[$", "$]5\\,;+\\infty[$"],
    expected: ["$]-\\infty\\,;5[$"],
    comparator: "mcq_exact",
    hint: "$x < 5$ : $5$ est exclu (crochet ouvert).",
    explanation: exp(
      "Une inégalité stricte ($<$) exclut la borne : crochet ouvert.",
      "On traduit $x < 5$.",
      "$5$ est exclu et il n'y a pas de borne inférieure : $]-\\infty\\,;5[$.",
      "L'intervalle est $]-\\infty\\,;5[$."
    ),
    tags: ["seconde", "maths", "reels", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_representer_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_representer",
    difficulty: 2,
    theme: "neutral",
    text: "L'ensemble des réels $x$ tels que $-1 \\le x \\le 3$ correspond à quel intervalle ?",
    format: "qcm",
    choices: ["$[-1\\,;3]$", "$]-1\\,;3[$", "$[-1\\,;3[$", "$]-1\\,;3]$"],
    expected: ["$[-1\\,;3]$"],
    comparator: "mcq_exact",
    hint: "Les deux inégalités sont larges ($\\le$) : les deux bornes sont incluses.",
    explanation: exp(
      "Une inégalité large inclut la borne (crochet fermé).",
      "On traduit $-1 \\le x \\le 3$.",
      "$-1$ et $3$ sont inclus : $[-1\\,;3]$.",
      "L'intervalle est $[-1\\,;3]$."
    ),
    tags: ["seconde", "maths", "reels", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_representer_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_representer",
    difficulty: 2,
    theme: "neutral",
    text: "L'ensemble des réels $x$ tels que $-1 < x \\le 3$ correspond à quel intervalle ?",
    format: "qcm",
    choices: ["$]-1\\,;3]$", "$[-1\\,;3]$", "$]-1\\,;3[$", "$[-1\\,;3[$"],
    expected: ["$]-1\\,;3]$"],
    comparator: "mcq_exact",
    hint: "$-1$ exclu (strict), $3$ inclus (large).",
    explanation: exp(
      "Chaque borne suit son inégalité : stricte → ouverte, large → fermée.",
      "On traduit $-1 < x \\le 3$.",
      "$-1$ est exclu et $3$ est inclus : $]-1\\,;3]$.",
      "L'intervalle est $]-1\\,;3]$."
    ),
    tags: ["seconde", "maths", "reels", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_representer_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_representer",
    difficulty: 2,
    theme: "neutral",
    text: "À quelle condition sur $x$ correspond l'intervalle $[0\\,;+\\infty[$ ?",
    format: "qcm",
    choices: ["$x \\ge 0$", "$x > 0$", "$x \\le 0$", "$x < 0$"],
    expected: ["$x \\ge 0$"],
    comparator: "mcq_exact",
    hint: "Le crochet fermé en $0$ signifie que $0$ est inclus.",
    explanation: exp(
      "On lit l'intervalle pour retrouver la condition.",
      "Le crochet en $0$ est fermé, donc $0$ est inclus.",
      "$[0\\,;+\\infty[$ correspond à $x \\ge 0$.",
      "La condition est $x \\ge 0$."
    ),
    tags: ["seconde", "maths", "reels", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_representer_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_representer",
    difficulty: 3,
    theme: "neutral",
    text: "Comment lit-on l'intervalle $]2\\,;7[$ ?",
    format: "qcm",
    choices: ["$2 < x < 7$", "$2 \\le x \\le 7$", "$2 \\le x < 7$", "$2 < x \\le 7$"],
    expected: ["$2 < x < 7$"],
    comparator: "mcq_exact",
    hint: "Deux crochets ouverts : les deux bornes sont exclues.",
    explanation: exp(
      "Un crochet ouvert exclut la borne.",
      "On traduit $]2\\,;7[$ en inégalités.",
      "Les deux bornes sont exclues : $2 < x < 7$.",
      "On lit $2 < x < 7$."
    ),
    tags: ["seconde", "maths", "reels", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_representer_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_representer",
    difficulty: 1,
    theme: "neutral",
    text: "Un crochet ouvert (tourné vers l'extérieur) signifie que la borne est :",
    format: "qcm",
    choices: ["exclue", "incluse", "infinie", "nulle"],
    expected: ["exclue"],
    comparator: "mcq_exact",
    hint: "Ouvert = on n'entre pas, la valeur n'est pas prise.",
    explanation: exp(
      "Le sens du crochet indique si la borne fait partie de l'intervalle.",
      "On observe un crochet ouvert.",
      "Un crochet ouvert correspond à une inégalité stricte : la borne est exclue.",
      "La borne est exclue."
    ),
    tags: ["seconde", "maths", "reels", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_representer_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_representer",
    difficulty: 3,
    theme: "neutral",
    text: "Sous forme d'intervalle, l'ensemble $\\mathbb{R}$ de tous les réels s'écrit :",
    format: "qcm",
    choices: ["$]-\\infty\\,;+\\infty[$", "$[-\\infty\\,;+\\infty]$", "$[0\\,;+\\infty[$", "$]0\\,;+\\infty[$"],
    expected: ["$]-\\infty\\,;+\\infty[$"],
    comparator: "mcq_exact",
    hint: "Aucune borne finie ; les crochets sont ouverts vers les infinis.",
    explanation: exp(
      "$\\mathbb{R}$ contient tous les réels, sans borne finie.",
      "On écrit l'intervalle correspondant.",
      "Les crochets sont toujours ouverts vers $\\pm\\infty$ : $]-\\infty\\,;+\\infty[$.",
      "On obtient $]-\\infty\\,;+\\infty[$."
    ),
    tags: ["seconde", "maths", "reels", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_representer_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_representer",
    difficulty: 2,
    theme: "neutral",
    text: "L'ensemble des réels $x$ tels que $x > -3$ correspond à quel intervalle ?",
    format: "qcm",
    choices: ["$]-3\\,;+\\infty[$", "$[-3\\,;+\\infty[$", "$]-\\infty\\,;-3[$", "$]-\\infty\\,;-3]$"],
    expected: ["$]-3\\,;+\\infty[$"],
    comparator: "mcq_exact",
    hint: "$x > -3$ : $-3$ exclu (strict).",
    explanation: exp(
      "Une inégalité stricte exclut la borne.",
      "On traduit $x > -3$.",
      "$-3$ est exclu et pas de borne supérieure : $]-3\\,;+\\infty[$.",
      "L'intervalle est $]-3\\,;+\\infty[$."
    ),
    tags: ["seconde", "maths", "reels", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_representer_fixed_10",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_representer",
    difficulty: 4,
    theme: "neutral",
    text: "Vers $+\\infty$ et $-\\infty$, le crochet d'un intervalle est :",
    format: "qcm",
    choices: ["toujours ouvert", "toujours fermé", "fermé si le nombre est positif", "au choix"],
    expected: ["toujours ouvert"],
    comparator: "mcq_exact",
    hint: "L'infini n'est pas un nombre, il ne peut pas être « atteint ».",
    explanation: exp(
      "$+\\infty$ et $-\\infty$ ne sont pas des nombres réels : on ne peut pas les inclure.",
      "On regarde le crochet du côté de l'infini.",
      "Comme l'infini n'est jamais atteint, le crochet est toujours ouvert.",
      "Le crochet est toujours ouvert vers l'infini."
    ),
    tags: ["seconde", "maths", "reels", "intervalle", "qcm"],
  },

  /* =========================================================
     INTERVALLE_APPARTENANCE — Un nombre est-il dans l'intervalle ?
  ========================================================= */

  {
    kind: "fixed",
    id: "seconde_intervalle_appartenance_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_appartenance",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre $0$ appartient-il à l'intervalle $[-2\\,;5[$ ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement si on arrondit", "On ne peut pas savoir"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "$[-2\\,;5[$ contient les nombres entre $-2$ (inclus) et $5$ (exclu).",
    explanation: exp(
      "Un nombre appartient à l'intervalle s'il est entre les bornes (en respectant inclus/exclu).",
      "On vérifie si $-2 \\le 0 < 5$.",
      "$0$ est bien compris entre $-2$ inclus et $5$ exclu.",
      "Oui, $0 \\in [-2\\,;5[$."
    ),
    tags: ["seconde", "maths", "reels", "appartenance", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_appartenance_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_appartenance",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre $5$ appartient-il à l'intervalle $[-2\\,;5[$ ?",
    format: "qcm",
    choices: ["Non, car $5$ est exclu", "Oui", "Oui, car $5$ est inclus", "On ne peut pas savoir"],
    expected: ["Non, car $5$ est exclu"],
    comparator: "mcq_exact",
    hint: "Le crochet en $5$ est ouvert.",
    explanation: exp(
      "Un crochet ouvert exclut la borne.",
      "On regarde le crochet en $5$ : il est ouvert.",
      "$5$ est exclu de $[-2\\,;5[$.",
      "Non, $5 \\notin [-2\\,;5[$."
    ),
    tags: ["seconde", "maths", "reels", "appartenance", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_appartenance_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_appartenance",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre appartient à l'intervalle $]1\\,;4]$ ?",
    format: "qcm",
    choices: ["$4$", "$1$", "$5$", "$0$"],
    expected: ["$4$"],
    comparator: "mcq_exact",
    hint: "$1$ exclu, $4$ inclus.",
    explanation: exp(
      "On teste chaque nombre avec la condition $1 < x \\le 4$.",
      "On vérifie les bornes : $1$ exclu, $4$ inclus.",
      "$1 \\notin$, $5 > 4$, $0 < 1$ ; seul $4$ convient ($1 < 4 \\le 4$).",
      "Le nombre est $4$."
    ),
    tags: ["seconde", "maths", "reels", "appartenance", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_appartenance_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_appartenance",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre $-2$ appartient-il à l'intervalle $[-2\\,;5[$ ?",
    format: "qcm",
    choices: ["Oui, car $-2$ est inclus", "Non, car $-2$ est exclu", "Non", "On ne peut pas savoir"],
    expected: ["Oui, car $-2$ est inclus"],
    comparator: "mcq_exact",
    hint: "Le crochet en $-2$ est fermé.",
    explanation: exp(
      "Un crochet fermé inclut la borne.",
      "On observe le crochet en $-2$ : il est fermé.",
      "$-2$ est donc inclus dans $[-2\\,;5[$.",
      "Oui, $-2 \\in [-2\\,;5[$."
    ),
    tags: ["seconde", "maths", "reels", "appartenance", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_appartenance_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_appartenance",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre appartient à l'intervalle $]-\\infty\\,;0[$ ?",
    format: "qcm",
    choices: ["$-1$", "$0$", "$2$", "$3$"],
    expected: ["$-1$"],
    comparator: "mcq_exact",
    hint: "$]-\\infty\\,;0[$ contient les nombres strictement négatifs.",
    explanation: exp(
      "Cet intervalle correspond à $x < 0$.",
      "On cherche le nombre strictement négatif.",
      "$0$ est exclu, $2$ et $3$ sont positifs ; seul $-1 < 0$.",
      "Le nombre est $-1$."
    ),
    tags: ["seconde", "maths", "reels", "appartenance", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_appartenance_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_appartenance",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre $3$ appartient-il à l'intervalle $]3\\,;8]$ ?",
    format: "qcm",
    choices: ["Non, car $3$ est exclu", "Oui", "Oui, car $3$ est inclus", "On ne peut pas savoir"],
    expected: ["Non, car $3$ est exclu"],
    comparator: "mcq_exact",
    hint: "Le crochet en $3$ est ouvert.",
    explanation: exp(
      "Un crochet ouvert exclut la borne.",
      "On regarde le crochet en $3$ : il est ouvert.",
      "$3$ est exclu de $]3\\,;8]$.",
      "Non, $3 \\notin ]3\\,;8]$."
    ),
    tags: ["seconde", "maths", "reels", "appartenance", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_appartenance_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_appartenance",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre n'appartient PAS à l'intervalle $[-1\\,;1]$ ?",
    format: "qcm",
    choices: ["$2$", "$0$", "$-1$", "$1$"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    hint: "$[-1\\,;1]$ contient les nombres entre $-1$ et $1$ inclus.",
    explanation: exp(
      "On teste l'appartenance avec $-1 \\le x \\le 1$.",
      "On cherche celui qui sort de l'intervalle.",
      "$0$, $-1$ et $1$ conviennent ; $2 > 1$ donc $2 \\notin [-1\\,;1]$.",
      "Le nombre est $2$."
    ),
    tags: ["seconde", "maths", "reels", "appartenance", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_appartenance_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_appartenance",
    difficulty: 3,
    theme: "neutral",
    text: "Le nombre $2{,}5$ appartient-il à l'intervalle $[2\\,;3[$ ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement si on arrondit à $2$", "Seulement si on arrondit à $3$"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "Vérifie si $2 \\le 2{,}5 < 3$.",
    explanation: exp(
      "On vérifie l'encadrement $2 \\le x < 3$.",
      "On compare $2{,}5$ aux bornes.",
      "$2 \\le 2{,}5 < 3$ : la condition est respectée.",
      "Oui, $2{,}5 \\in [2\\,;3[$."
    ),
    tags: ["seconde", "maths", "reels", "appartenance", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_intervalle_appartenance_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_appartenance",
    difficulty: 4,
    theme: "neutral",
    text: "Le nombre $-4$ appartient-il à l'intervalle $[-3\\,;+\\infty[$ ?",
    format: "qcm",
    choices: ["Non, car $-4 < -3$", "Oui", "Oui, car $-4$ est négatif", "On ne peut pas savoir"],
    expected: ["Non, car $-4 < -3$"],
    comparator: "mcq_exact",
    hint: "L'intervalle commence à $-3$ : il faut $x \\ge -3$.",
    explanation: exp(
      "$[-3\\,;+\\infty[$ correspond à $x \\ge -3$.",
      "On compare $-4$ à $-3$.",
      "$-4 < -3$, donc $-4$ n'est pas dans l'intervalle.",
      "Non, $-4 \\notin [-3\\,;+\\infty[$."
    ),
    tags: ["seconde", "maths", "reels", "appartenance", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_intervalle_appartenance_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_appartenance",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie si le nombre est entre les deux bornes ($a$ inclus, $b$ exclu).",
    tags: ["seconde", "maths", "reels", "appartenance", "template"],
    generate: () => {
      const a = randomInt(-4, 0);
      const b = randomInt(a + 3, a + 6);
      const n = randomInt(a - 2, b + 2);
      const dansIntervalle = n >= a && n < b;
      return {
        text: `Le nombre $${n}$ appartient-il à l'intervalle $[${a}\\,;${b}[$ ?`,
        format: "qcm",
        choices: ["Oui", "Non"],
        expected: [dansIntervalle ? "Oui" : "Non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre appartient à $[a\\,;b[$ si $a \\le x < b$.",
          `On vérifie si $${a} \\le ${n} < ${b}$.`,
          dansIntervalle
            ? `$${a} \\le ${n} < ${b}$ est vrai.`
            : `$${a} \\le ${n} < ${b}$ est faux.`,
          dansIntervalle
            ? `Oui, $${n} \\in [${a}\\,;${b}[$.`
            : `Non, $${n} \\notin [${a}\\,;${b}[$.`
        ),
      };
    },
  },

  /* =========================================================
     VALEUR_ABSOLUE_DISTANCE — |x| comme distance
  ========================================================= */

  {
    kind: "fixed",
    id: "seconde_valeur_absolue_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "valeur_absolue_distance",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut $|-3|$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "La valeur absolue d'un nombre négatif est son opposé.",
    explanation: exp(
      "La valeur absolue donne la distance à $0$, toujours positive.",
      "On retire le signe de $-3$.",
      "$|-3| = 3$.",
      "$|-3|$ vaut $3$."
    ),
    tags: ["seconde", "maths", "reels", "valeur_absolue", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_valeur_absolue_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "valeur_absolue_distance",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut $|7|$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La valeur absolue d'un nombre positif est ce nombre.",
    explanation: exp(
      "La valeur absolue d'un nombre positif est le nombre lui-même.",
      "On observe que $7$ est positif.",
      "$|7| = 7$.",
      "$|7|$ vaut $7$."
    ),
    tags: ["seconde", "maths", "reels", "valeur_absolue", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_valeur_absolue_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "valeur_absolue_distance",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $|-2{,}5|$ ?",
    format: "short",
    expected: ["2,5", "2.5"],
    comparator: "number_equal",
    hint: "On enlève le signe « moins ».",
    explanation: exp(
      "La valeur absolue est la distance à $0$, donc positive.",
      "On retire le signe de $-2{,}5$.",
      "$|-2{,}5| = 2{,}5$.",
      "$|-2{,}5|$ vaut $2{,}5$."
    ),
    tags: ["seconde", "maths", "reels", "valeur_absolue", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_valeur_absolue_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "valeur_absolue_distance",
    difficulty: 2,
    theme: "neutral",
    text: "L'expression $|x - 4|$ représente la distance entre $x$ et quel nombre ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$|x - a|$ est la distance entre $x$ et $a$.",
    explanation: exp(
      "$|x - a|$ s'interprète comme la distance entre $x$ et $a$ sur la droite réelle.",
      "On identifie $a$ dans $|x - 4|$.",
      "Ici $a = 4$.",
      "C'est la distance entre $x$ et $4$."
    ),
    tags: ["seconde", "maths", "reels", "valeur_absolue", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_valeur_absolue_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "valeur_absolue_distance",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut $|0|$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "La distance de $0$ à lui-même.",
    explanation: exp(
      "La valeur absolue est la distance à $0$.",
      "On mesure la distance de $0$ à $0$.",
      "$|0| = 0$.",
      "$|0|$ vaut $0$."
    ),
    tags: ["seconde", "maths", "reels", "valeur_absolue", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_valeur_absolue_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "valeur_absolue_distance",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles sont les solutions de l'équation $|x| = 5$ ?",
    format: "qcm",
    choices: ["$x = 5$ ou $x = -5$", "$x = 5$", "$x = -5$", "$x = 0$"],
    expected: ["$x = 5$ ou $x = -5$"],
    comparator: "mcq_exact",
    hint: "Deux nombres sont à distance $5$ de $0$.",
    explanation: exp(
      "$|x| = 5$ signifie que $x$ est à distance $5$ de $0$.",
      "On cherche les nombres à distance $5$ de $0$.",
      "Il y en a deux : $5$ et $-5$.",
      "Les solutions sont $x = 5$ ou $x = -5$."
    ),
    tags: ["seconde", "maths", "reels", "valeur_absolue", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_valeur_absolue_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "valeur_absolue_distance",
    difficulty: 4,
    theme: "neutral",
    text: "L'ensemble des réels $x$ tels que $|x - 2| \\le 3$ est l'intervalle :",
    format: "qcm",
    choices: ["$[-1\\,;5]$", "$[2\\,;5]$", "$[-3\\,;3]$", "$[-1\\,;3]$"],
    expected: ["$[-1\\,;5]$"],
    comparator: "mcq_exact",
    hint: "$|x - 2| \\le 3$ : $x$ est à distance $\\le 3$ de $2$.",
    explanation: exp(
      "$|x - a| \\le r$ correspond à $a - r \\le x \\le a + r$.",
      "Ici $a = 2$ et $r = 3$.",
      "$2 - 3 = -1$ et $2 + 3 = 5$, donc $-1 \\le x \\le 5$.",
      "L'intervalle est $[-1\\,;5]$."
    ),
    tags: ["seconde", "maths", "reels", "valeur_absolue", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_valeur_absolue_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "valeur_absolue_distance",
    difficulty: 3,
    theme: "neutral",
    text: "La distance entre $-1$ et $4$ vaut $|4 - (-1)|$. Combien fait-elle ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$4 - (-1) = 4 + 1$.",
    explanation: exp(
      "La distance entre deux nombres est la valeur absolue de leur différence.",
      "On calcule $|4 - (-1)|$.",
      "$4 - (-1) = 5$, et $|5| = 5$.",
      "La distance vaut $5$."
    ),
    tags: ["seconde", "maths", "reels", "valeur_absolue", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_valeur_absolue_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "valeur_absolue_distance",
    difficulty: 4,
    theme: "neutral",
    text: "Quelles sont les solutions de l'équation $|x + 1| = 3$ ?",
    format: "qcm",
    choices: ["$x = 2$ ou $x = -4$", "$x = 3$ ou $x = -3$", "$x = 2$ ou $x = 4$", "$x = -2$ ou $x = 4$"],
    expected: ["$x = 2$ ou $x = -4$"],
    comparator: "mcq_exact",
    hint: "$|x + 1| = 3$ donne $x + 1 = 3$ ou $x + 1 = -3$.",
    explanation: exp(
      "$|A| = 3$ équivaut à $A = 3$ ou $A = -3$.",
      "On pose $x + 1 = 3$ ou $x + 1 = -3$.",
      "On obtient $x = 2$ ou $x = -4$.",
      "Les solutions sont $x = 2$ ou $x = -4$."
    ),
    tags: ["seconde", "maths", "reels", "valeur_absolue", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_valeur_absolue_fixed_10",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "valeur_absolue_distance",
    difficulty: 2,
    theme: "neutral",
    text: "La valeur absolue d'un nombre réel est toujours :",
    format: "qcm",
    choices: ["positive ou nulle", "strictement positive", "négative", "égale au nombre"],
    expected: ["positive ou nulle"],
    comparator: "mcq_exact",
    hint: "C'est une distance, et $|0| = 0$.",
    explanation: exp(
      "La valeur absolue mesure une distance à $0$.",
      "On se rappelle qu'une distance ne peut pas être négative, et que $|0| = 0$.",
      "Donc $|x| \\ge 0$ pour tout réel $x$.",
      "La valeur absolue est toujours positive ou nulle."
    ),
    tags: ["seconde", "maths", "reels", "valeur_absolue", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_valeur_absolue_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "valeur_absolue_distance",
    difficulty: 1,
    theme: "neutral",
    hint: "La valeur absolue enlève le signe.",
    tags: ["seconde", "maths", "reels", "valeur_absolue", "template"],
    generate: () => {
      const n = randomInt(1, 12);
      const negatif = Math.random() < 0.5;
      const val = negatif ? -n : n;
      return {
        text: `Combien vaut $|${val}|$ ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "La valeur absolue est la distance à $0$, toujours positive.",
          "On retire le signe du nombre.",
          `$|${val}| = ${n}$.`,
          `$|${val}|$ vaut $${n}$.`
        ),
      };
    },
  },

  /* =========================================================
     REELS_ENCADREMENT — Encadrement décimal d'un réel
  ========================================================= */

  {
    kind: "fixed",
    id: "seconde_reels_encadrement_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_encadrement",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l'encadrement de $3{,}7$ entre deux entiers consécutifs ?",
    format: "qcm",
    choices: ["$3 < 3{,}7 < 4$", "$2 < 3{,}7 < 3$", "$3{,}7 < 3 < 4$", "$4 < 3{,}7 < 5$"],
    expected: ["$3 < 3{,}7 < 4$"],
    comparator: "mcq_exact",
    hint: "Entre quel entier et le suivant se trouve $3{,}7$ ?",
    explanation: exp(
      "Encadrer à l'unité, c'est trouver les deux entiers qui entourent le nombre.",
      "On situe $3{,}7$ entre deux entiers.",
      "$3{,}7$ est entre $3$ et $4$.",
      "L'encadrement est $3 < 3{,}7 < 4$."
    ),
    tags: ["seconde", "maths", "reels", "encadrement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_encadrement_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_encadrement",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la partie entière de $5{,}9$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "La partie entière est le plus grand entier inférieur ou égal au nombre.",
    explanation: exp(
      "La partie entière est le plus grand entier qui ne dépasse pas le nombre.",
      "On cherche cet entier pour $5{,}9$.",
      "$5 \\le 5{,}9 < 6$, donc la partie entière est $5$.",
      "La partie entière de $5{,}9$ est $5$."
    ),
    tags: ["seconde", "maths", "reels", "encadrement", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_encadrement_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_encadrement",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est l'encadrement de $\\sqrt{2}$ au dixième ?",
    format: "qcm",
    choices: ["$1{,}4 < \\sqrt{2} < 1{,}5$", "$1{,}3 < \\sqrt{2} < 1{,}4$", "$1{,}5 < \\sqrt{2} < 1{,}6$", "$1 < \\sqrt{2} < 2$"],
    expected: ["$1{,}4 < \\sqrt{2} < 1{,}5$"],
    comparator: "mcq_exact",
    hint: "$\\sqrt{2} \\approx 1{,}414$.",
    explanation: exp(
      "Encadrer au dixième, c'est trouver deux décimaux à un chiffre après la virgule.",
      "On sait que $\\sqrt{2} \\approx 1{,}414$.",
      "$1{,}4 < 1{,}414 < 1{,}5$.",
      "L'encadrement est $1{,}4 < \\sqrt{2} < 1{,}5$."
    ),
    tags: ["seconde", "maths", "reels", "encadrement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_encadrement_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_encadrement",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est l'encadrement de $\\sqrt{10}$ entre deux entiers consécutifs ?",
    format: "qcm",
    choices: ["$3 < \\sqrt{10} < 4$", "$2 < \\sqrt{10} < 3$", "$4 < \\sqrt{10} < 5$", "$9 < \\sqrt{10} < 11$"],
    expected: ["$3 < \\sqrt{10} < 4$"],
    comparator: "mcq_exact",
    hint: "$3^2 = 9$ et $4^2 = 16$.",
    explanation: exp(
      "On encadre $\\sqrt{10}$ à l'aide de carrés parfaits.",
      "On cherche les entiers dont les carrés entourent $10$.",
      "$3^2 = 9 < 10 < 16 = 4^2$, donc $3 < \\sqrt{10} < 4$.",
      "L'encadrement est $3 < \\sqrt{10} < 4$."
    ),
    tags: ["seconde", "maths", "reels", "encadrement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_encadrement_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_encadrement",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l'arrondi de $7{,}48$ à l'unité ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le chiffre des dixièmes est $4$ (inférieur à $5$).",
    explanation: exp(
      "Pour arrondir à l'unité, on regarde le chiffre des dixièmes.",
      "Le chiffre des dixièmes de $7{,}48$ est $4$.",
      "$4 < 5$, donc on arrondit vers le bas.",
      "L'arrondi de $7{,}48$ à l'unité est $7$."
    ),
    tags: ["seconde", "maths", "reels", "encadrement", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_encadrement_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_encadrement",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est l'arrondi de $2{,}71$ au dixième ?",
    format: "short",
    expected: ["2,7", "2.7"],
    comparator: "number_equal",
    hint: "Le chiffre des centièmes est $1$ (inférieur à $5$).",
    explanation: exp(
      "Pour arrondir au dixième, on regarde le chiffre des centièmes.",
      "Le chiffre des centièmes de $2{,}71$ est $1$.",
      "$1 < 5$, donc on garde le dixième tel quel.",
      "L'arrondi de $2{,}71$ au dixième est $2{,}7$."
    ),
    tags: ["seconde", "maths", "reels", "encadrement", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_encadrement_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_encadrement",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est l'encadrement de $\\pi$ au centième ?",
    format: "qcm",
    choices: ["$3{,}14 < \\pi < 3{,}15$", "$3{,}13 < \\pi < 3{,}14$", "$3{,}15 < \\pi < 3{,}16$", "$3{,}1 < \\pi < 3{,}2$"],
    expected: ["$3{,}14 < \\pi < 3{,}15$"],
    comparator: "mcq_exact",
    hint: "$\\pi \\approx 3{,}1416$.",
    explanation: exp(
      "Encadrer au centième, c'est trouver deux décimaux à deux chiffres après la virgule.",
      "On utilise $\\pi \\approx 3{,}1416$.",
      "$3{,}14 < 3{,}1416 < 3{,}15$.",
      "L'encadrement est $3{,}14 < \\pi < 3{,}15$."
    ),
    tags: ["seconde", "maths", "reels", "encadrement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_encadrement_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_encadrement",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la troncature de $4{,}99$ à l'unité ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Tronquer, c'est couper après la virgule sans arrondir.",
    explanation: exp(
      "La troncature à l'unité consiste à garder la partie entière en supprimant la suite.",
      "On coupe $4{,}99$ après l'unité.",
      "On garde $4$ (on n'arrondit pas).",
      "La troncature de $4{,}99$ à l'unité est $4$."
    ),
    tags: ["seconde", "maths", "reels", "encadrement", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_reels_encadrement_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_encadrement",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est l'encadrement de $-2{,}3$ entre deux entiers consécutifs ?",
    format: "qcm",
    choices: ["$-3 < -2{,}3 < -2$", "$-2 < -2{,}3 < -1$", "$-2{,}3 < -2 < -1$", "$2 < -2{,}3 < 3$"],
    expected: ["$-3 < -2{,}3 < -2$"],
    comparator: "mcq_exact",
    hint: "Attention au sens : $-3$ est plus petit que $-2$.",
    explanation: exp(
      "Avec les négatifs, le plus petit entier est à gauche.",
      "On situe $-2{,}3$ entre deux entiers.",
      "$-3 < -2{,}3 < -2$ (car $-2{,}3$ est entre $-3$ et $-2$).",
      "L'encadrement est $-3 < -2{,}3 < -2$."
    ),
    tags: ["seconde", "maths", "reels", "encadrement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_reels_encadrement_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "reels_encadrement",
    difficulty: 2,
    theme: "neutral",
    hint: "La partie entière est le plus grand entier qui ne dépasse pas le nombre.",
    tags: ["seconde", "maths", "reels", "encadrement", "template"],
    generate: () => {
      const entier = randomInt(1, 9);
      const dec = randomInt(1, 9);
      return {
        text: `Quelle est la partie entière de $${entier}{,}${dec}$ ?`,
        format: "short",
        expected: [String(entier)],
        comparator: "number_equal",
        explanation: exp(
          "La partie entière est le plus grand entier inférieur ou égal au nombre.",
          `On encadre $${entier}{,}${dec}$ entre deux entiers.`,
          `$${entier} \\le ${entier}{,}${dec} < ${entier + 1}$.`,
          `La partie entière est $${entier}$.`
        ),
      };
    },
  },
];
