// lib/tutor-v4/questionBank/terminale-spe/maths/exponentielle.bank.ts
//
// Notion : Fonction exponentielle (fonction_exponentielle)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   exp_definition          — Comprendre la fonction exponentielle
//   exp_proprietes          — Propriétés algébriques de l'exponentielle
//   exp_deriver             — Dériver une expression contenant une exponentielle
//   exp_equation_inequation — Résoudre une équation ou inéquation avec exponentielle
//   exp_limite              — Étudier une limite avec exponentielle
//   exp_defi                — Exercice type bac avec exponentielle
//
// Conventions :
// - Formules en LaTeX ($...$), rendues via KaTeX.
// - Règle QCM : dès qu'une réponse est une EXPRESSION mathématique → "qcm".
//   On ne demande de TAPER ("short" + "number_equal") que des réponses
//   purement numériques (résolution d'équation, valeur d'un extremum).

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

export const exponentielleBank: TutorBankItemV4[] = [
  /* =========================================================
     EXP_DEFINITION — Comprendre la fonction exponentielle
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_exp_definition_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Que vaut $e^0$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Toute base non nulle élevée à la puissance $0$ vaut $1$.",
    explanation: exp(
      "La fonction exponentielle vérifie $e^0 = 1$.",
      "On utilise la valeur de référence de l'exponentielle en $0$.",
      "$e^0 = 1$.",
      "Donc $e^0 = 1$."
    ),
    tags: ["terminale-spe", "exponentielle", "definition", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_definition_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l'ensemble de définition de la fonction $x \\mapsto e^x$ ?",
    format: "qcm",
    choices: ["$\\mathbb{R}$", "$]0\\,;+\\infty[$", "$[0\\,;+\\infty[$", "$\\mathbb{R}^*$"],
    expected: ["$\\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle est définie pour tous les réels.",
    explanation: exp(
      "La fonction exponentielle est définie sur l'ensemble des réels.",
      "On se rappelle son domaine de définition.",
      "Pour tout réel $x$, $e^x$ existe.",
      "L'ensemble de définition est $\\mathbb{R}$."
    ),
    tags: ["terminale-spe", "exponentielle", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_definition_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Une valeur approchée de $e$ est :",
    format: "qcm",
    choices: ["$2{,}72$", "$3{,}14$", "$1{,}41$", "$2$"],
    expected: ["$2{,}72$"],
    comparator: "mcq_exact",
    hint: "Le nombre $e$ est compris entre $2$ et $3$.",
    explanation: exp(
      "Le nombre $e$ est la base de l'exponentielle, $e = e^1$.",
      "On retient sa valeur approchée usuelle.",
      "$e \\approx 2{,}718$.",
      "Une valeur approchée de $e$ est $2{,}72$."
    ),
    tags: ["terminale-spe", "exponentielle", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_definition_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de la fonction $x \\mapsto e^x$ ?",
    format: "qcm",
    choices: ["$e^x$", "$x\\,e^{x-1}$", "$1$", "$x\\,e^x$"],
    expected: ["$e^x$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle est sa propre dérivée.",
    explanation: exp(
      "La fonction exponentielle est l'unique fonction égale à sa dérivée et valant $1$ en $0$.",
      "On utilise la propriété fondamentale $(e^x)' = e^x$.",
      "$(e^x)' = e^x$.",
      "La dérivée de $x \\mapsto e^x$ est $e^x$."
    ),
    tags: ["terminale-spe", "exponentielle", "definition", "derivee", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_definition_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le signe de $e^x$ pour tout réel $x$ ?",
    format: "qcm",
    choices: [
      "$e^x > 0$ pour tout $x$",
      "$e^x$ peut être négatif",
      "$e^x \\ge 0$, et $e^x = 0$ en $x = 0$",
      "$e^x > 0$ seulement si $x > 0$",
    ],
    expected: ["$e^x > 0$ pour tout $x$"],
    comparator: "mcq_exact",
    hint: "La courbe de l'exponentielle est entièrement au-dessus de l'axe des abscisses.",
    explanation: exp(
      "La fonction exponentielle est strictement positive sur $\\mathbb{R}$.",
      "On retient une propriété clé du cours.",
      "Pour tout réel $x$, $e^x > 0$.",
      "L'exponentielle est strictement positive : $e^x > 0$ pour tout $x$."
    ),
    tags: ["terminale-spe", "exponentielle", "definition", "signe", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_definition_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Combien l'équation $e^x = 0$ admet-elle de solutions ?",
    format: "qcm",
    choices: ["Aucune", "Une seule", "Deux", "Une infinité"],
    expected: ["Aucune"],
    comparator: "mcq_exact",
    hint: "Pense au signe de l'exponentielle.",
    explanation: exp(
      "L'exponentielle est strictement positive, donc ne s'annule jamais.",
      "On utilise $e^x > 0$ pour tout $x$.",
      "Comme $e^x > 0$, on ne peut pas avoir $e^x = 0$.",
      "L'équation $e^x = 0$ n'a aucune solution."
    ),
    tags: ["terminale-spe", "exponentielle", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_definition_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Par quel point la courbe de la fonction exponentielle passe-t-elle toujours ?",
    format: "qcm",
    choices: ["$(0\\,;1)$", "$(1\\,;0)$", "$(0\\,;0)$", "$(1\\,;1)$"],
    expected: ["$(0\\,;1)$"],
    comparator: "mcq_exact",
    hint: "Calcule $e^0$.",
    explanation: exp(
      "Un point de la courbe se lit en calculant une image.",
      "On calcule l'image de $0$ : $e^0 = 1$.",
      "La courbe passe donc par le point de coordonnées $(0\\,;1)$.",
      "La courbe passe par $(0\\,;1)$."
    ),
    tags: ["terminale-spe", "exponentielle", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_definition_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le sens de variation de la fonction $x \\mapsto e^x$ sur $\\mathbb{R}$ ?",
    format: "qcm",
    choices: [
      "Strictement croissante",
      "Strictement décroissante",
      "Croissante puis décroissante",
      "Constante",
    ],
    expected: ["Strictement croissante"],
    comparator: "mcq_exact",
    hint: "Étudie le signe de sa dérivée $e^x$.",
    explanation: exp(
      "Le sens de variation se lit sur le signe de la dérivée.",
      "La dérivée de $e^x$ est $e^x$, qui est strictement positive.",
      "Comme $(e^x)' = e^x > 0$, la fonction est strictement croissante.",
      "La fonction exponentielle est strictement croissante sur $\\mathbb{R}$."
    ),
    tags: ["terminale-spe", "exponentielle", "definition", "variation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_definition_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Comme $x \\mapsto e^x$ est strictement croissante, comment se comparent $e^2$ et $e^3$ ?",
    format: "qcm",
    choices: ["$e^2 < e^3$", "$e^2 > e^3$", "$e^2 = e^3$", "On ne peut pas comparer"],
    expected: ["$e^2 < e^3$"],
    comparator: "mcq_exact",
    hint: "Une fonction croissante conserve l'ordre.",
    explanation: exp(
      "Une fonction strictement croissante conserve l'ordre des nombres.",
      "On compare les exposants : $2 < 3$.",
      "Comme l'exponentielle est croissante, $2 < 3$ entraîne $e^2 < e^3$.",
      "Donc $e^2 < e^3$."
    ),
    tags: ["terminale-spe", "exponentielle", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_definition_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_definition",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l'équation de la tangente à la courbe de $x \\mapsto e^x$ au point d'abscisse $0$ ?",
    format: "qcm",
    choices: ["$y = x + 1$", "$y = x$", "$y = e\\,x$", "$y = x - 1$"],
    expected: ["$y = x + 1$"],
    comparator: "mcq_exact",
    hint: "Utilise $y = f'(0)(x - 0) + f(0)$ avec $f(x) = e^x$.",
    explanation: exp(
      "On utilise la formule de la tangente $y = f'(a)(x-a) + f(a)$ en $a = 0$.",
      "On calcule $f(0) = e^0 = 1$ et $f'(0) = e^0 = 1$.",
      "$y = 1 \\times (x - 0) + 1 = x + 1$.",
      "L'équation de la tangente est $y = x + 1$."
    ),
    tags: ["terminale-spe", "exponentielle", "definition", "tangente", "qcm"],
  },

  /* =========================================================
     EXP_PROPRIETES — Propriétés algébriques
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_exp_proprietes_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "Simplifie $e^a \\times e^b$.",
    format: "qcm",
    choices: ["$e^{a+b}$", "$e^{a \\times b}$", "$e^{a} + e^{b}$", "$e^{ab}$"],
    expected: ["$e^{a+b}$"],
    comparator: "mcq_exact",
    hint: "Un produit d'exponentielles additionne les exposants.",
    explanation: exp(
      "L'exponentielle transforme les produits en sommes d'exposants.",
      "On applique la propriété $e^a \\times e^b = e^{a+b}$.",
      "$e^a \\times e^b = e^{a+b}$.",
      "Donc $e^a \\times e^b = e^{a+b}$."
    ),
    tags: ["terminale-spe", "exponentielle", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_proprietes_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "Simplifie $\\dfrac{e^a}{e^b}$.",
    format: "qcm",
    choices: ["$e^{a-b}$", "$e^{a+b}$", "$e^{a/b}$", "$\\dfrac{a}{b}$"],
    expected: ["$e^{a-b}$"],
    comparator: "mcq_exact",
    hint: "Un quotient d'exponentielles soustrait les exposants.",
    explanation: exp(
      "L'exponentielle transforme les quotients en différences d'exposants.",
      "On applique la propriété $\\dfrac{e^a}{e^b} = e^{a-b}$.",
      "$\\dfrac{e^a}{e^b} = e^{a-b}$.",
      "Donc $\\dfrac{e^a}{e^b} = e^{a-b}$."
    ),
    tags: ["terminale-spe", "exponentielle", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_proprietes_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi est égal $e^{-a}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{e^a}$", "$-e^{a}$", "$\\dfrac{1}{a}$", "$e^{a}$"],
    expected: ["$\\dfrac{1}{e^a}$"],
    comparator: "mcq_exact",
    hint: "Un exposant négatif correspond à un inverse.",
    explanation: exp(
      "Un exposant négatif sur l'exponentielle donne un inverse.",
      "On applique la propriété $e^{-a} = \\dfrac{1}{e^a}$.",
      "$e^{-a} = \\dfrac{1}{e^a}$.",
      "Donc $e^{-a} = \\dfrac{1}{e^a}$."
    ),
    tags: ["terminale-spe", "exponentielle", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_proprietes_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $(e^a)^n$.",
    format: "qcm",
    choices: ["$e^{na}$", "$e^{a+n}$", "$e^{a^n}$", "$n\\,e^{a}$"],
    expected: ["$e^{na}$"],
    comparator: "mcq_exact",
    hint: "Une puissance d'exponentielle multiplie les exposants.",
    explanation: exp(
      "Élever une exponentielle à une puissance multiplie les exposants.",
      "On applique la propriété $(e^a)^n = e^{na}$.",
      "$(e^a)^n = e^{na}$.",
      "Donc $(e^a)^n = e^{na}$."
    ),
    tags: ["terminale-spe", "exponentielle", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_proprietes_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $e^3 \\times e^2$.",
    format: "qcm",
    choices: ["$e^5$", "$e^6$", "$e^9$", "$2e^5$"],
    expected: ["$e^5$"],
    comparator: "mcq_exact",
    hint: "On additionne les exposants : $3 + 2$.",
    explanation: exp(
      "On utilise $e^a \\times e^b = e^{a+b}$.",
      "On additionne les exposants $3$ et $2$.",
      "$e^3 \\times e^2 = e^{3+2} = e^5$.",
      "Donc $e^3 \\times e^2 = e^5$."
    ),
    tags: ["terminale-spe", "exponentielle", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_proprietes_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $\\dfrac{e^5}{e^2}$.",
    format: "qcm",
    choices: ["$e^3$", "$e^7$", "$e^{2{,}5}$", "$e^{10}$"],
    expected: ["$e^3$"],
    comparator: "mcq_exact",
    hint: "On soustrait les exposants : $5 - 2$.",
    explanation: exp(
      "On utilise $\\dfrac{e^a}{e^b} = e^{a-b}$.",
      "On soustrait les exposants $5$ et $2$.",
      "$\\dfrac{e^5}{e^2} = e^{5-2} = e^3$.",
      "Donc $\\dfrac{e^5}{e^2} = e^3$."
    ),
    tags: ["terminale-spe", "exponentielle", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_proprietes_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $e^{-3} \\times e^{5}$.",
    format: "qcm",
    choices: ["$e^2$", "$e^{8}$", "$e^{-15}$", "$e^{-2}$"],
    expected: ["$e^2$"],
    comparator: "mcq_exact",
    hint: "On additionne les exposants : $-3 + 5$.",
    explanation: exp(
      "On utilise $e^a \\times e^b = e^{a+b}$, même avec un exposant négatif.",
      "On additionne $-3$ et $5$.",
      "$e^{-3} \\times e^{5} = e^{-3+5} = e^2$.",
      "Donc $e^{-3} \\times e^{5} = e^2$."
    ),
    tags: ["terminale-spe", "exponentielle", "proprietes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_proprietes_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_proprietes",
    difficulty: 4,
    theme: "neutral",
    text: "Simplifie $(e^x)^2 \\times e^{-x}$.",
    format: "qcm",
    choices: ["$e^{x}$", "$e^{2x}$", "$e^{3x}$", "$e^{-x}$"],
    expected: ["$e^{x}$"],
    comparator: "mcq_exact",
    hint: "$(e^x)^2 = e^{2x}$, puis additionne avec $-x$.",
    explanation: exp(
      "On combine puissance et produit d'exponentielles.",
      "$(e^x)^2 = e^{2x}$, puis $e^{2x} \\times e^{-x} = e^{2x - x}$.",
      "$e^{2x} \\times e^{-x} = e^{2x-x} = e^{x}$.",
      "Donc $(e^x)^2 \\times e^{-x} = e^{x}$."
    ),
    tags: ["terminale-spe", "exponentielle", "proprietes", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_exp_proprietes_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour un produit, on additionne les exposants.",
    tags: ["terminale-spe", "exponentielle", "proprietes", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      const b = randomInt(2, 7);
      const correct = `$e^{${a + b}}$`;
      const distracteurs = [
        `$e^{${a * b}}$`,
        `$e^{${Math.abs(a - b)}}$`,
        `$2e^{${a + b}}$`,
      ];
      return {
        text: `Simplifie $e^{${a}} \\times e^{${b}}$.`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise $e^a \\times e^b = e^{a+b}$.",
          `On additionne les exposants $${a}$ et $${b}$.`,
          `$e^{${a}} \\times e^{${b}} = e^{${a}+${b}} = e^{${a + b}}$.`,
          `Donc $e^{${a}} \\times e^{${b}} = e^{${a + b}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_exp_proprietes_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour un quotient, on soustrait les exposants.",
    tags: ["terminale-spe", "exponentielle", "proprietes", "template"],
    generate: () => {
      const b = randomInt(2, 5);
      const a = b + randomInt(1, 5); // a > b → exposant positif
      const correct = `$e^{${a - b}}$`;
      const distracteurs = [
        `$e^{${a + b}}$`,
        `$e^{${b - a}}$`,
        `$e^{${a * b}}$`,
      ];
      return {
        text: `Simplifie $\\dfrac{e^{${a}}}{e^{${b}}}$.`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise $\\dfrac{e^a}{e^b} = e^{a-b}$.",
          `On soustrait les exposants $${a}$ et $${b}$.`,
          `$\\dfrac{e^{${a}}}{e^{${b}}} = e^{${a}-${b}} = e^{${a - b}}$.`,
          `Donc $\\dfrac{e^{${a}}}{e^{${b}}} = e^{${a - b}}$.`
        ),
      };
    },
  },

  /* =========================================================
     EXP_DERIVER — Dériver une expression avec exponentielle
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_exp_deriver_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_deriver",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = e^x$ ?",
    format: "qcm",
    choices: ["$e^x$", "$x\\,e^{x-1}$", "$1$", "$e^{x-1}$"],
    expected: ["$e^x$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle est sa propre dérivée.",
    explanation: exp(
      "L'exponentielle est égale à sa dérivée.",
      "On applique $(e^x)' = e^x$.",
      "$f'(x) = e^x$.",
      "La dérivée est $f'(x) = e^x$."
    ),
    tags: ["terminale-spe", "exponentielle", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_deriver_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_deriver",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la formule de dérivation de $e^{u}$ ?",
    format: "qcm",
    choices: [
      "$(e^{u})' = u'\\,e^{u}$",
      "$(e^{u})' = e^{u}$",
      "$(e^{u})' = u'\\,e^{u-1}$",
      "$(e^{u})' = e^{u'}$",
    ],
    expected: ["$(e^{u})' = u'\\,e^{u}$"],
    comparator: "mcq_exact",
    hint: "On garde l'exponentielle et on multiplie par la dérivée de l'exposant.",
    explanation: exp(
      "Dériver une exponentielle composée utilise la dérivée de l'exposant.",
      "On applique la formule $(e^{u})' = u'\\,e^{u}$.",
      "$(e^{u})' = u'\\,e^{u}$.",
      "La bonne formule est $(e^{u})' = u'\\,e^{u}$."
    ),
    tags: ["terminale-spe", "exponentielle", "deriver", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_deriver_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_deriver",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = e^{2x}$ ?",
    format: "qcm",
    choices: ["$2e^{2x}$", "$e^{2x}$", "$2e^{x}$", "$2x\\,e^{2x}$"],
    expected: ["$2e^{2x}$"],
    comparator: "mcq_exact",
    hint: "Avec $u = 2x$, on a $u' = 2$, puis $(e^u)' = u'e^u$.",
    explanation: exp(
      "On dérive une exponentielle composée avec $(e^u)' = u'\\,e^u$.",
      "On pose $u = 2x$, donc $u' = 2$.",
      "$f'(x) = 2\\,e^{2x}$.",
      "La dérivée est $f'(x) = 2e^{2x}$."
    ),
    tags: ["terminale-spe", "exponentielle", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_deriver_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_deriver",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = e^{-x}$ ?",
    format: "qcm",
    choices: ["$-e^{-x}$", "$e^{-x}$", "$-e^{x}$", "$x\\,e^{-x}$"],
    expected: ["$-e^{-x}$"],
    comparator: "mcq_exact",
    hint: "Avec $u = -x$, on a $u' = -1$.",
    explanation: exp(
      "On dérive une exponentielle composée avec $(e^u)' = u'\\,e^u$.",
      "On pose $u = -x$, donc $u' = -1$.",
      "$f'(x) = -1 \\times e^{-x} = -e^{-x}$.",
      "La dérivée est $f'(x) = -e^{-x}$."
    ),
    tags: ["terminale-spe", "exponentielle", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_deriver_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_deriver",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = e^{3x + 1}$ ?",
    format: "qcm",
    choices: ["$3e^{3x+1}$", "$e^{3x+1}$", "$3e^{3x}$", "$(3x+1)e^{3x+1}$"],
    expected: ["$3e^{3x+1}$"],
    comparator: "mcq_exact",
    hint: "Avec $u = 3x+1$, on a $u' = 3$.",
    explanation: exp(
      "On dérive une exponentielle composée avec $(e^u)' = u'\\,e^u$.",
      "On pose $u = 3x+1$, donc $u' = 3$.",
      "$f'(x) = 3\\,e^{3x+1}$.",
      "La dérivée est $f'(x) = 3e^{3x+1}$."
    ),
    tags: ["terminale-spe", "exponentielle", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_deriver_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_deriver",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = 5e^{2x}$ ?",
    format: "qcm",
    choices: ["$10e^{2x}$", "$5e^{2x}$", "$10e^{x}$", "$7e^{2x}$"],
    expected: ["$10e^{2x}$"],
    comparator: "mcq_exact",
    hint: "Le coefficient $5$ reste, et $(e^{2x})' = 2e^{2x}$.",
    explanation: exp(
      "On dérive un produit par une constante : la constante reste en facteur.",
      "On dérive $e^{2x}$ en $2e^{2x}$, puis on multiplie par $5$.",
      "$f'(x) = 5 \\times 2e^{2x} = 10e^{2x}$.",
      "La dérivée est $f'(x) = 10e^{2x}$."
    ),
    tags: ["terminale-spe", "exponentielle", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_deriver_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_deriver",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x\\,e^x$ ?",
    format: "qcm",
    choices: ["$(1 + x)\\,e^x$", "$e^x$", "$x\\,e^x$", "$(1 - x)\\,e^x$"],
    expected: ["$(1 + x)\\,e^x$"],
    comparator: "mcq_exact",
    hint: "Produit $uv$ avec $u = x$ et $v = e^x$ : $(uv)' = u'v + uv'$.",
    explanation: exp(
      "On dérive un produit avec $(uv)' = u'v + uv'$.",
      "On pose $u = x$ ($u' = 1$) et $v = e^x$ ($v' = e^x$).",
      "$f'(x) = 1 \\times e^x + x \\times e^x = (1 + x)e^x$.",
      "La dérivée est $f'(x) = (1 + x)e^x$."
    ),
    tags: ["terminale-spe", "exponentielle", "deriver", "produit", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_deriver_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_deriver",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = e^{x^2}$ ?",
    format: "qcm",
    choices: ["$2x\\,e^{x^2}$", "$e^{x^2}$", "$x^2\\,e^{x^2}$", "$2x\\,e^{2x}$"],
    expected: ["$2x\\,e^{x^2}$"],
    comparator: "mcq_exact",
    hint: "Avec $u = x^2$, on a $u' = 2x$.",
    explanation: exp(
      "On dérive une exponentielle composée avec $(e^u)' = u'\\,e^u$.",
      "On pose $u = x^2$, donc $u' = 2x$.",
      "$f'(x) = 2x\\,e^{x^2}$.",
      "La dérivée est $f'(x) = 2x\\,e^{x^2}$."
    ),
    tags: ["terminale-spe", "exponentielle", "deriver", "composee", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_exp_deriver_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_deriver",
    difficulty: 3,
    theme: "neutral",
    hint: "Avec $u = ax + b$, on a $u' = a$, puis $(e^u)' = u'e^u$.",
    tags: ["terminale-spe", "exponentielle", "deriver", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 5);
      const correct = `$${a}e^{${a}x + ${b}}$`;
      const distracteurs = [
        `$e^{${a}x + ${b}}$`,
        `$${a}e^{${a}x}$`,
        `$${a}x\\,e^{${a}x + ${b}}$`,
      ];
      return {
        text: `Quelle est la dérivée de $f(x) = e^{${a}x + ${b}}$ ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On dérive une exponentielle composée avec $(e^u)' = u'\\,e^u$.",
          `On pose $u = ${a}x + ${b}$, donc $u' = ${a}$.`,
          `$f'(x) = ${a}\\,e^{${a}x + ${b}}$.`,
          `La dérivée est $f'(x) = ${a}e^{${a}x + ${b}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_exp_deriver_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_deriver",
    difficulty: 4,
    theme: "neutral",
    hint: "La constante reste en facteur ; $(e^{bx})' = b\\,e^{bx}$.",
    tags: ["terminale-spe", "exponentielle", "deriver", "template"],
    generate: () => {
      const k = randomInt(2, 6);
      const b = randomInt(2, 5);
      const correct = `$${k * b}e^{${b}x}$`;
      const distracteurs = [
        `$${k}e^{${b}x}$`,
        `$${k * b}e^{${b}x - 1}$`,
        `$${k + b}e^{${b}x}$`,
      ];
      return {
        text: `Quelle est la dérivée de $f(x) = ${k}e^{${b}x}$ ?`,
        format: "qcm",
        choices: shuffle([correct, ...distracteurs]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On dérive un produit par une constante : la constante reste en facteur.",
          `On dérive $e^{${b}x}$ en $${b}e^{${b}x}$, puis on multiplie par $${k}$.`,
          `$f'(x) = ${k} \\times ${b}e^{${b}x} = ${k * b}e^{${b}x}$.`,
          `La dérivée est $f'(x) = ${k * b}e^{${b}x}$.`
        ),
      };
    },
  },

  /* =========================================================
     EXP_EQUATION_INEQUATION — Équations et inéquations
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_exp_equation_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_equation_inequation",
    difficulty: 2,
    theme: "neutral",
    text: "Résous $e^x = 1$. Quelle est la valeur de $x$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Pour quelle valeur l'exponentielle vaut-elle $1$ ?",
    explanation: exp(
      "On résout une équation à l'aide d'une valeur de référence.",
      "On sait que $e^0 = 1$.",
      "$e^x = 1 = e^0$, donc $x = 0$.",
      "La solution est $x = 0$."
    ),
    tags: ["terminale-spe", "exponentielle", "equation", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_equation_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_equation_inequation",
    difficulty: 2,
    theme: "neutral",
    text: "Résous $e^x = e$. Quelle est la valeur de $x$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$e = e^1$.",
    explanation: exp(
      "On compare à une valeur de référence.",
      "On écrit $e = e^1$.",
      "$e^x = e^1 \\iff x = 1$.",
      "La solution est $x = 1$."
    ),
    tags: ["terminale-spe", "exponentielle", "equation", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_equation_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_equation_inequation",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle propriété permet de résoudre $e^{A} = e^{B}$ ?",
    format: "qcm",
    choices: [
      "$e^{A} = e^{B} \\iff A = B$",
      "$e^{A} = e^{B} \\iff A = -B$",
      "$e^{A} = e^{B} \\iff A \\times B = 1$",
      "$e^{A} = e^{B} \\iff A + B = 0$",
    ],
    expected: ["$e^{A} = e^{B} \\iff A = B$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle est strictement croissante, donc injective.",
    explanation: exp(
      "Comme l'exponentielle est strictement croissante, elle est injective.",
      "Deux exponentielles sont égales si et seulement si leurs exposants le sont.",
      "$e^{A} = e^{B} \\iff A = B$.",
      "La bonne propriété est $e^{A} = e^{B} \\iff A = B$."
    ),
    tags: ["terminale-spe", "exponentielle", "equation", "propriete", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_equation_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_equation_inequation",
    difficulty: 3,
    theme: "neutral",
    text: "Résous $e^{2x} = e^{6}$. Quelle est la valeur de $x$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$e^{A} = e^{B} \\iff A = B$, donc résous $2x = 6$.",
    explanation: exp(
      "On utilise $e^{A} = e^{B} \\iff A = B$.",
      "On identifie les exposants : $2x = 6$.",
      "$2x = 6 \\iff x = 3$.",
      "La solution est $x = 3$."
    ),
    tags: ["terminale-spe", "exponentielle", "equation", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_equation_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_equation_inequation",
    difficulty: 3,
    theme: "neutral",
    text: "Résous $e^{x + 1} = e^{4}$. Quelle est la valeur de $x$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Résous $x + 1 = 4$.",
    explanation: exp(
      "On utilise $e^{A} = e^{B} \\iff A = B$.",
      "On identifie les exposants : $x + 1 = 4$.",
      "$x + 1 = 4 \\iff x = 3$.",
      "La solution est $x = 3$."
    ),
    tags: ["terminale-spe", "exponentielle", "equation", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_equation_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_equation_inequation",
    difficulty: 3,
    theme: "neutral",
    text: "Résous $e^{2x} = 1$. Quelle est la valeur de $x$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$1 = e^0$, donc résous $2x = 0$.",
    explanation: exp(
      "On compare à $e^0 = 1$.",
      "On écrit $e^{2x} = e^0$, donc $2x = 0$.",
      "$2x = 0 \\iff x = 0$.",
      "La solution est $x = 0$."
    ),
    tags: ["terminale-spe", "exponentielle", "equation", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_inequation_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_equation_inequation",
    difficulty: 3,
    theme: "neutral",
    text: "Résous l'inéquation $e^x > 1$. Quel est l'ensemble des solutions ?",
    format: "qcm",
    choices: ["$]0\\,;+\\infty[$", "$]-\\infty\\,;0[$", "$\\mathbb{R}$", "$]1\\,;+\\infty[$"],
    expected: ["$]0\\,;+\\infty[$"],
    comparator: "mcq_exact",
    hint: "$1 = e^0$, et l'exponentielle est strictement croissante.",
    explanation: exp(
      "On compare à une valeur de référence en gardant le sens de variation.",
      "On écrit $1 = e^0$, puis on utilise la stricte croissance de l'exponentielle.",
      "$e^x > e^0 \\iff x > 0$.",
      "L'ensemble des solutions est $]0\\,;+\\infty[$."
    ),
    tags: ["terminale-spe", "exponentielle", "inequation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_inequation_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_equation_inequation",
    difficulty: 4,
    theme: "neutral",
    text: "Résous l'inéquation $e^x < e^2$. Quel est l'ensemble des solutions ?",
    format: "qcm",
    choices: ["$]-\\infty\\,;2[$", "$]2\\,;+\\infty[$", "$]-\\infty\\,;0[$", "$\\mathbb{R}$"],
    expected: ["$]-\\infty\\,;2[$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle est strictement croissante : elle conserve l'ordre.",
    explanation: exp(
      "Une fonction strictement croissante conserve le sens de l'inégalité.",
      "On compare les exposants en gardant le sens de l'inégalité.",
      "$e^x < e^2 \\iff x < 2$.",
      "L'ensemble des solutions est $]-\\infty\\,;2[$."
    ),
    tags: ["terminale-spe", "exponentielle", "inequation", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_exp_equation_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_equation_inequation",
    difficulty: 3,
    theme: "neutral",
    hint: "$e^{A} = e^{B} \\iff A = B$.",
    tags: ["terminale-spe", "exponentielle", "equation", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const x = randomInt(2, 6);
      const b = a * x;
      return {
        text: `Résous $e^{${a}x} = e^{${b}}$. Quelle est la valeur de $x$ ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On utilise $e^{A} = e^{B} \\iff A = B$.",
          `On identifie les exposants : $${a}x = ${b}$.`,
          `$${a}x = ${b} \\iff x = ${x}$.`,
          `La solution est $x = ${x}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_exp_equation_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_equation_inequation",
    difficulty: 3,
    theme: "neutral",
    hint: "Résous $x + c = d$.",
    tags: ["terminale-spe", "exponentielle", "equation", "template"],
    generate: () => {
      const c = randomInt(1, 5);
      const x = randomInt(2, 7);
      const d = x + c;
      return {
        text: `Résous $e^{x + ${c}} = e^{${d}}$. Quelle est la valeur de $x$ ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On utilise $e^{A} = e^{B} \\iff A = B$.",
          `On identifie les exposants : $x + ${c} = ${d}$.`,
          `$x + ${c} = ${d} \\iff x = ${x}$.`,
          `La solution est $x = ${x}$.`
        ),
      };
    },
  },

  /* =========================================================
     EXP_LIMITE — Limites avec exponentielle
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_exp_limite_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_limite",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $\\displaystyle\\lim_{x \\to +\\infty} e^x$ ?",
    format: "qcm",
    choices: ["$+\\infty$", "$0$", "$1$", "$-\\infty$"],
    expected: ["$+\\infty$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle croît sans limite vers la droite.",
    explanation: exp(
      "Les limites de l'exponentielle aux bornes sont des résultats de référence.",
      "On utilise la limite du cours en $+\\infty$.",
      "$\\lim_{x \\to +\\infty} e^x = +\\infty$.",
      "La limite est $+\\infty$."
    ),
    tags: ["terminale-spe", "exponentielle", "limite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_limite_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_limite",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $\\displaystyle\\lim_{x \\to -\\infty} e^x$ ?",
    format: "qcm",
    choices: ["$0$", "$-\\infty$", "$1$", "$+\\infty$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Vers la gauche, la courbe se rapproche de l'axe des abscisses.",
    explanation: exp(
      "Les limites de l'exponentielle aux bornes sont des résultats de référence.",
      "On utilise la limite du cours en $-\\infty$.",
      "$\\lim_{x \\to -\\infty} e^x = 0$.",
      "La limite est $0$ : la droite $y = 0$ est asymptote horizontale."
    ),
    tags: ["terminale-spe", "exponentielle", "limite", "asymptote", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_limite_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_limite",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{1}{e^x}$ ?",
    format: "qcm",
    choices: ["$0$", "$+\\infty$", "$1$", "$-\\infty$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Le dénominateur tend vers $+\\infty$.",
    explanation: exp(
      "Un quotient dont le dénominateur tend vers $+\\infty$ tend vers $0$.",
      "On utilise $\\lim_{x \\to +\\infty} e^x = +\\infty$.",
      "$\\dfrac{1}{e^x} \\to \\dfrac{1}{+\\infty} = 0$.",
      "La limite est $0$."
    ),
    tags: ["terminale-spe", "exponentielle", "limite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_limite_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_limite",
    difficulty: 3,
    theme: "neutral",
    text: "En $-\\infty$, la courbe de $x \\mapsto e^x$ admet une asymptote. Laquelle ?",
    format: "qcm",
    choices: [
      "La droite $y = 0$",
      "La droite $x = 0$",
      "La droite $y = 1$",
      "Aucune asymptote",
    ],
    expected: ["La droite $y = 0$"],
    comparator: "mcq_exact",
    hint: "Utilise $\\lim_{x \\to -\\infty} e^x = 0$.",
    explanation: exp(
      "Une limite finie en l'infini correspond à une asymptote horizontale.",
      "On utilise $\\lim_{x \\to -\\infty} e^x = 0$.",
      "La courbe se rapproche de la droite d'équation $y = 0$.",
      "L'asymptote est la droite $y = 0$ (l'axe des abscisses)."
    ),
    tags: ["terminale-spe", "exponentielle", "limite", "asymptote", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_limite_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_limite",
    difficulty: 4,
    theme: "neutral",
    text: "Par croissances comparées, que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{e^x}{x}$ ?",
    format: "qcm",
    choices: ["$+\\infty$", "$0$", "$1$", "$e$"],
    expected: ["$+\\infty$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle l'emporte sur toute puissance de $x$.",
    explanation: exp(
      "Le théorème des croissances comparées compare l'exponentielle et les puissances.",
      "L'exponentielle croît bien plus vite que $x$.",
      "$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x} = +\\infty$.",
      "La limite est $+\\infty$."
    ),
    tags: ["terminale-spe", "exponentielle", "limite", "croissances_comparees", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_limite_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_limite",
    difficulty: 4,
    theme: "neutral",
    text: "Par croissances comparées, que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^2}$ ?",
    format: "qcm",
    choices: ["$+\\infty$", "$0$", "$1$", "$2$"],
    expected: ["$+\\infty$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle l'emporte aussi sur $x^2$.",
    explanation: exp(
      "Le théorème des croissances comparées s'applique à toute puissance de $x$.",
      "L'exponentielle croît plus vite que $x^2$.",
      "$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^2} = +\\infty$.",
      "La limite est $+\\infty$."
    ),
    tags: ["terminale-spe", "exponentielle", "limite", "croissances_comparees", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_limite_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_limite",
    difficulty: 4,
    theme: "neutral",
    text: "Par croissances comparées, que vaut $\\displaystyle\\lim_{x \\to +\\infty} x\\,e^{-x}$ ?",
    format: "qcm",
    choices: ["$0$", "$+\\infty$", "$1$", "$-\\infty$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Écris $x\\,e^{-x} = \\dfrac{x}{e^x}$.",
    explanation: exp(
      "On se ramène à une croissance comparée connue.",
      "On écrit $x\\,e^{-x} = \\dfrac{x}{e^x}$, puis on utilise que $e^x$ l'emporte sur $x$.",
      "$\\lim_{x \\to +\\infty} \\dfrac{x}{e^x} = 0$.",
      "La limite est $0$."
    ),
    tags: ["terminale-spe", "exponentielle", "limite", "croissances_comparees", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_limite_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_limite",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut la limite de référence $\\displaystyle\\lim_{x \\to 0} \\dfrac{e^x - 1}{x}$ ?",
    format: "qcm",
    choices: ["$1$", "$0$", "$+\\infty$", "$e$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "C'est le nombre dérivé de l'exponentielle en $0$.",
    explanation: exp(
      "Cette limite est une limite de référence liée au nombre dérivé.",
      "Elle correspond au nombre dérivé de $e^x$ en $0$, c'est-à-dire $e^0$.",
      "$\\lim_{x \\to 0} \\dfrac{e^x - 1}{x} = 1$.",
      "La limite est $1$."
    ),
    tags: ["terminale-spe", "exponentielle", "limite", "reference", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_limite_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_limite",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\left(e^x - x\\right)$ ?",
    format: "qcm",
    choices: ["$+\\infty$", "$0$", "$1$", "$-\\infty$"],
    expected: ["$+\\infty$"],
    comparator: "mcq_exact",
    hint: "Factorise par $x$ ou compare les vitesses de croissance.",
    explanation: exp(
      "On lève une forme indéterminée $+\\infty - \\infty$ par les croissances comparées.",
      "On factorise : $e^x - x = x\\left(\\dfrac{e^x}{x} - 1\\right)$, et $\\dfrac{e^x}{x} \\to +\\infty$.",
      "Le facteur entre parenthèses tend vers $+\\infty$ et $x \\to +\\infty$.",
      "La limite est $+\\infty$."
    ),
    tags: ["terminale-spe", "exponentielle", "limite", "croissances_comparees", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_limite_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_limite",
    difficulty: 5,
    theme: "neutral",
    text: "Par croissances comparées, que vaut $\\displaystyle\\lim_{x \\to -\\infty} x\\,e^{x}$ ?",
    format: "qcm",
    choices: ["$0$", "$-\\infty$", "$+\\infty$", "$1$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Pose $X = -x$ pour te ramener à une limite en $+\\infty$.",
    explanation: exp(
      "On se ramène à une croissance comparée connue par changement de variable.",
      "En posant $X = -x \\to +\\infty$, $x\\,e^x = -X e^{-X} = -\\dfrac{X}{e^X}$.",
      "Or $\\dfrac{X}{e^X} \\to 0$, donc $x\\,e^x \\to 0$.",
      "La limite est $0$."
    ),
    tags: ["terminale-spe", "exponentielle", "limite", "croissances_comparees", "qcm"],
  },

  /* =========================================================
     EXP_DEFI — Exercices type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_exp_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = (x - 1)e^x$. Quelle est sa dérivée $f'(x)$ ?",
    format: "qcm",
    choices: ["$x\\,e^x$", "$e^x$", "$(x - 1)e^x$", "$(x - 2)e^x$"],
    expected: ["$x\\,e^x$"],
    comparator: "mcq_exact",
    hint: "Produit $uv$ avec $u = x-1$ et $v = e^x$.",
    explanation: exp(
      "On dérive un produit avec $(uv)' = u'v + uv'$.",
      "On pose $u = x-1$ ($u' = 1$) et $v = e^x$ ($v' = e^x$).",
      "$f'(x) = 1 \\times e^x + (x-1)e^x = x\\,e^x$.",
      "La dérivée est $f'(x) = x\\,e^x$."
    ),
    tags: ["terminale-spe", "exponentielle", "type_bac", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = (x - 1)e^x$, de dérivée $f'(x) = x\\,e^x$. Sur quel intervalle $f$ est-elle décroissante ?",
    format: "qcm",
    choices: ["$]-\\infty\\,;0]$", "$[0\\,;+\\infty[$", "$]-\\infty\\,;1]$", "$\\mathbb{R}$"],
    expected: ["$]-\\infty\\,;0]$"],
    comparator: "mcq_exact",
    hint: "Comme $e^x > 0$, le signe de $f'(x) = x\\,e^x$ est celui de $x$.",
    explanation: exp(
      "On étudie le signe de $f'$ en utilisant que $e^x > 0$.",
      "$f'(x) = x\\,e^x$ a le signe de $x$, car $e^x > 0$ pour tout $x$.",
      "$f'(x) \\le 0$ quand $x \\le 0$.",
      "La fonction $f$ est décroissante sur $]-\\infty\\,;0]$."
    ),
    tags: ["terminale-spe", "exponentielle", "type_bac", "variation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $g(x) = e^x - x$. On résout $g'(x) = 0$. En quelle valeur de $x$ la dérivée s'annule-t-elle ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$g'(x) = e^x - 1$, résous $e^x = 1$.",
    explanation: exp(
      "On cherche où la dérivée s'annule.",
      "On dérive : $g'(x) = e^x - 1$, puis on résout $e^x - 1 = 0$.",
      "$e^x = 1 \\iff x = 0$.",
      "La dérivée s'annule en $x = 0$."
    ),
    tags: ["terminale-spe", "exponentielle", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $g(x) = e^x - x$. Son minimum est atteint en $x = 0$. Quelle est la valeur de ce minimum ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Calcule $g(0) = e^0 - 0$.",
    explanation: exp(
      "La valeur d'un extremum s'obtient en calculant la fonction à l'abscisse trouvée.",
      "On calcule $g(0)$ avec $e^0 = 1$.",
      "$g(0) = e^0 - 0 = 1$.",
      "Le minimum de $g$ vaut $1$ (donc $e^x \\ge x + 1$ pour tout $x$)."
    ),
    tags: ["terminale-spe", "exponentielle", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x\\,e^{-x}$. Sa dérivée est $f'(x) = (1 - x)e^{-x}$. En quelle valeur $f$ atteint-elle son maximum ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Comme $e^{-x} > 0$, le signe de $f'$ est celui de $1 - x$.",
    explanation: exp(
      "Le maximum se trouve là où $f'$ s'annule en changeant de signe.",
      "$f'(x) = (1-x)e^{-x}$ a le signe de $1 - x$, car $e^{-x} > 0$.",
      "$f'(x) = 0 \\iff x = 1$, et $f'$ passe du positif au négatif.",
      "Le maximum est atteint en $x = 1$."
    ),
    tags: ["terminale-spe", "exponentielle", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x\\,e^{-x}$, maximale en $x = 1$. Quelle est la valeur de ce maximum ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{e}$", "$e$", "$1$", "$0$"],
    expected: ["$\\dfrac{1}{e}$"],
    comparator: "mcq_exact",
    hint: "Calcule $f(1) = 1 \\times e^{-1}$.",
    explanation: exp(
      "La valeur du maximum s'obtient en calculant $f(1)$.",
      "On calcule $f(1) = 1 \\times e^{-1}$.",
      "$f(1) = e^{-1} = \\dfrac{1}{e}$.",
      "Le maximum vaut $\\dfrac{1}{e}$."
    ),
    tags: ["terminale-spe", "exponentielle", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = (2 - x)e^x$. Quelle est sa dérivée $f'(x)$ ?",
    format: "qcm",
    choices: ["$(1 - x)e^x$", "$(2 - x)e^x$", "$-e^x$", "$(3 - x)e^x$"],
    expected: ["$(1 - x)e^x$"],
    comparator: "mcq_exact",
    hint: "Produit $uv$ avec $u = 2-x$ ($u' = -1$) et $v = e^x$.",
    explanation: exp(
      "On dérive un produit avec $(uv)' = u'v + uv'$.",
      "On pose $u = 2-x$ ($u' = -1$) et $v = e^x$ ($v' = e^x$).",
      "$f'(x) = -e^x + (2-x)e^x = (2 - x - 1)e^x = (1 - x)e^x$.",
      "La dérivée est $f'(x) = (1 - x)e^x$."
    ),
    tags: ["terminale-spe", "exponentielle", "type_bac", "deriver", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l'équation de la tangente à la courbe de $f(x) = e^x$ au point d'abscisse $1$ ?",
    format: "qcm",
    choices: ["$y = e\\,x$", "$y = e\\,x + 1$", "$y = x + e$", "$y = e\\,x - e$"],
    expected: ["$y = e\\,x$"],
    comparator: "mcq_exact",
    hint: "Utilise $y = f'(1)(x - 1) + f(1)$ avec $f(1) = e$ et $f'(1) = e$.",
    explanation: exp(
      "On applique $y = f'(a)(x-a) + f(a)$ en $a = 1$.",
      "On a $f(1) = e$ et $f'(1) = e$.",
      "$y = e(x - 1) + e = e\\,x - e + e = e\\,x$.",
      "L'équation de la tangente est $y = e\\,x$."
    ),
    tags: ["terminale-spe", "exponentielle", "type_bac", "tangente", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{e^x}{x + 1}$ ?",
    format: "qcm",
    choices: ["$+\\infty$", "$0$", "$1$", "$e$"],
    expected: ["$+\\infty$"],
    comparator: "mcq_exact",
    hint: "Compare la croissance de $e^x$ et celle de $x + 1$.",
    explanation: exp(
      "On utilise les croissances comparées sur un quotient.",
      "On écrit $\\dfrac{e^x}{x+1} = \\dfrac{e^x}{x} \\times \\dfrac{x}{x+1}$ ; le premier facteur tend vers $+\\infty$, le second vers $1$.",
      "$\\dfrac{e^x}{x} \\to +\\infty$ et $\\dfrac{x}{x+1} \\to 1$.",
      "La limite est $+\\infty$."
    ),
    tags: ["terminale-spe", "exponentielle", "type_bac", "limite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_exp_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId: "exp_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour étudier le signe de $f'(x) = (x - 2)e^x$, quel argument utilise-t-on ?",
    format: "qcm",
    choices: [
      "$e^x > 0$, donc $f'(x)$ a le signe de $x - 2$",
      "$e^x$ change de signe en $0$",
      "$f'(x)$ a le signe de $e^x$",
      "$f'(x) > 0$ partout",
    ],
    expected: ["$e^x > 0$, donc $f'(x)$ a le signe de $x - 2$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle est toujours strictement positive.",
    explanation: exp(
      "Le signe d'un produit dépend du signe de chaque facteur.",
      "Comme $e^x > 0$ pour tout $x$, le signe de $f'(x)$ est celui de l'autre facteur.",
      "$f'(x) = (x-2)e^x$ a donc le signe de $x - 2$.",
      "On utilise que $e^x > 0$, donc $f'(x)$ a le signe de $x - 2$."
    ),
    tags: ["terminale-spe", "exponentielle", "type_bac", "signe", "qcm"],
  },
];
