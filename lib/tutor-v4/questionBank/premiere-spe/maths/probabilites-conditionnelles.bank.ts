// lib/tutor-v4/questionBank/premiere-spe/maths/probabilites-conditionnelles.bank.ts
//
// Chapitre : Probabilités conditionnelles et indépendance (notion "probabilites_conditionnelles")
// microSkills :
//   pc_conditionnelle — calculer une probabilité conditionnelle P_A(B)
//   pc_arbre          — arbre pondéré : règle du produit et de la somme
//   pc_totales        — formule des probabilités totales
//   pc_independance   — indépendance de deux événements
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM. Canvas : arbre_proba.

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

// Format virgule française pour l'affichage des probabilités dans l'arbre.
function fr(x: number): string {
  return String(Math.round(x * 100) / 100).replace(".", ",");
}

function arbre(pA: number, pBsiA: number, pBsiNonA: number): CanvasFigure {
  return {
    kind: "arbre_proba",
    titre: "Arbre pondéré",
    racineEnfants: [
      {
        label: "A",
        proba: fr(pA),
        enfants: [
          { label: "B", proba: fr(pBsiA) },
          { label: "B̄", proba: fr(1 - pBsiA) },
        ],
      },
      {
        label: "Ā",
        proba: fr(1 - pA),
        enfants: [
          { label: "B", proba: fr(pBsiNonA) },
          { label: "B̄", proba: fr(1 - pBsiNonA) },
        ],
      },
    ],
  };
}

export const probabilitesConditionnellesBank: TutorBankItemV4[] = [
  /* ===================== PC_CONDITIONNELLE ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    text: "La probabilité conditionnelle $P_A(B)$ se calcule par :",
    format: "qcm",
    choices: [
      "$\\dfrac{P(A \\cap B)}{P(A)}$",
      "$\\dfrac{P(A \\cap B)}{P(B)}$",
      "$P(A) \\times P(B)$",
      "$\\dfrac{P(A)}{P(B)}$",
    ],
    expected: ["$\\dfrac{P(A \\cap B)}{P(A)}$"],
    comparator: "mcq_exact",
    hint: "On divise par la probabilité de la condition $A$.",
    explanation: exp(
      "$P_A(B)$ est la probabilité de $B$ sachant que $A$ est réalisé.",
      "On divise la probabilité de l'intersection par celle de la condition.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "$\\dfrac{P(A \\cap B)}{P(A)}$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A) = 0{,}4$ et $P(A \\cap B) = 0{,}2$. Combien vaut $P_A(B)$ ?",
    format: "short",
    expected: ["0,5"],
    comparator: "number_equal",
    hint: "$\\dfrac{0{,}2}{0{,}4}$.",
    explanation: exp(
      "On applique $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "$\\dfrac{0{,}2}{0{,}4}$.",
      "$= 0{,}5$.",
      "$P_A(B) = 0{,}5$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une classe, $P(\\text{fille}) = 0{,}6$ et $P(\\text{fille et demi-pensionnaire}) = 0{,}3$. Quelle est la probabilité qu'une fille soit demi-pensionnaire ?",
    format: "short",
    expected: ["0,5"],
    comparator: "number_equal",
    hint: "$\\dfrac{0{,}3}{0{,}6}$.",
    explanation: exp(
      "On cherche $P_{\\text{fille}}(\\text{DP}) = \\dfrac{P(\\text{fille} \\cap \\text{DP})}{P(\\text{fille})}$.",
      "$\\dfrac{0{,}3}{0{,}6}$.",
      "$= 0{,}5$.",
      "La probabilité est $0{,}5$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    text: "On lit dans un tableau : $50$ élèves dont $20$ font de l'anglais ; parmi ces $20$, $12$ font aussi espagnol. Quelle est la probabilité qu'un angliciste fasse espagnol ?",
    format: "short",
    expected: ["0,6"],
    comparator: "number_equal",
    hint: "$\\dfrac{12}{20}$.",
    explanation: exp(
      "On se restreint aux $20$ anglicistes (la condition).",
      "Parmi eux, $12$ font espagnol : $\\dfrac{12}{20}$.",
      "$= 0{,}6$.",
      "La probabilité est $0{,}6$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "template",
    id: "premiere_pc_cond_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "template"],
    generate: () => {
      const pA = randomInt(2, 8) / 10;
      const pAB = (Math.round(pA * 10) * randomInt(1, 9)) / 100; // <= pA
      const val = Math.round((pAB / pA) * 100) / 100;
      return {
        text: `On a $P(A) = ${fr(pA)}$ et $P(A \\cap B) = ${fr(pAB)}$. Combien vaut $P_A(B)$ ? (arrondir au centième)`,
        format: "short",
        expected: [fr(val)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
          `$\\dfrac{${fr(pAB)}}{${fr(pA)}}$.`,
          `$= ${fr(val)}$.`,
          `$P_A(B) = ${fr(val)}$.`
        ),
      };
    },
  },

  /* ===================== PC_ARBRE ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un arbre pondéré, la probabilité d'un chemin (de la racine à une feuille) s'obtient en :",
    format: "qcm",
    choices: [
      "multipliant les probabilités le long du chemin",
      "additionnant les probabilités le long du chemin",
      "prenant la plus grande probabilité",
      "soustrayant les probabilités",
    ],
    expected: ["multipliant les probabilités le long du chemin"],
    comparator: "mcq_exact",
    hint: "Règle du produit.",
    explanation: exp(
      "La probabilité d'un chemin suit la règle du produit.",
      "On multiplie les probabilités rencontrées le long du chemin.",
      "Ex. : $P(A \\cap B) = P(A) \\times P_A(B)$.",
      "On multiplie les probabilités le long du chemin."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur l'arbre, calcule $P(A \\cap B)$ avec $P(A) = 0{,}6$ et $P_A(B) = 0{,}5$.",
    format: "short",
    expected: ["0,3"],
    comparator: "number_equal",
    hint: "$0{,}6 \\times 0{,}5$.",
    explanation: exp(
      "On multiplie le long du chemin A → B.",
      "$P(A \\cap B) = P(A) \\times P_A(B) = 0{,}6 \\times 0{,}5$.",
      "$= 0{,}3$.",
      "$P(A \\cap B) = 0{,}3$."
    ),
    canvas: arbre(0.6, 0.5, 0.2),
    tags: ["premiere", "maths", "probas_cond", "arbre", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une branche issue d'un nœud, la somme des probabilités des sous-branches vaut :",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Toutes les possibilités sont couvertes.",
    explanation: exp(
      "À partir d'un nœud, les branches couvrent tous les cas possibles.",
      "Leurs probabilités forment une partition.",
      "Leur somme vaut donc $1$.",
      "La somme vaut $1$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 4,
    theme: "neutral",
    text: "Sur l'arbre, $P(A) = 0{,}7$ et $P_A(B) = 0{,}4$. Quelle est la probabilité $P_A(\\bar{B})$ ?",
    format: "short",
    expected: ["0,6"],
    comparator: "number_equal",
    hint: "$P_A(\\bar B) = 1 - P_A(B)$.",
    explanation: exp(
      "Les deux sous-branches issues de $A$ ont une somme égale à $1$.",
      "$P_A(\\bar B) = 1 - P_A(B) = 1 - 0{,}4$.",
      "$= 0{,}6$.",
      "$P_A(\\bar B) = 0{,}6$."
    ),
    canvas: arbre(0.7, 0.4, 0.3),
    tags: ["premiere", "maths", "probas_cond", "arbre", "canvas", "short"],
  },
  {
    kind: "template",
    id: "premiere_pc_arb_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie le long du chemin.",
    tags: ["premiere", "maths", "probas_cond", "arbre", "template"],
    generate: () => {
      const pA = randomInt(2, 8) / 10;
      const pBsiA = randomInt(2, 8) / 10;
      const inter = Math.round(pA * pBsiA * 100) / 100;
      return {
        text: `Sur l'arbre, $P(A) = ${fr(pA)}$ et $P_A(B) = ${fr(pBsiA)}$. Calcule $P(A \\cap B)$.`,
        format: "short",
        expected: [fr(inter)],
        comparator: "number_equal",
        canvas: arbre(pA, pBsiA, 0.3),
        explanation: exp(
          "On multiplie le long du chemin A → B.",
          `$P(A \\cap B) = ${fr(pA)} \\times ${fr(pBsiA)}$.`,
          `$= ${fr(inter)}$.`,
          `$P(A \\cap B) = ${fr(inter)}$.`
        ),
      };
    },
  },

  /* ===================== PC_TOTALES ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 3,
    theme: "neutral",
    text: "Avec la partition $\\{A ; \\bar A\\}$, la formule des probabilités totales donne $P(B) =$",
    format: "qcm",
    choices: [
      "$P(A \\cap B) + P(\\bar A \\cap B)$",
      "$P(A) \\times P(B)$",
      "$P(A \\cap B) - P(\\bar A \\cap B)$",
      "$P(A) + P(B)$",
    ],
    expected: ["$P(A \\cap B) + P(\\bar A \\cap B)$"],
    comparator: "mcq_exact",
    hint: "On additionne les chemins menant à $B$.",
    explanation: exp(
      "$B$ est atteint soit via $A$, soit via $\\bar A$.",
      "On additionne les probabilités de ces deux chemins.",
      "$P(B) = P(A \\cap B) + P(\\bar A \\cap B)$.",
      "$P(A \\cap B) + P(\\bar A \\cap B)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}3$ et $P(\\bar A \\cap B) = 0{,}2$. Combien vaut $P(B)$ ?",
    format: "short",
    expected: ["0,5"],
    comparator: "number_equal",
    hint: "Somme des deux chemins menant à $B$.",
    explanation: exp(
      "On applique la formule des probabilités totales.",
      "$P(B) = P(A \\cap B) + P(\\bar A \\cap B) = 0{,}3 + 0{,}2$.",
      "$= 0{,}5$.",
      "$P(B) = 0{,}5$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $P(A) = 0{,}6$, $P_A(B) = 0{,}5$, $P_{\\bar A}(B) = 0{,}25$, calcule $P(B)$.",
    format: "short",
    expected: ["0,4"],
    comparator: "number_equal",
    hint: "$P(B) = P(A)P_A(B) + P(\\bar A)P_{\\bar A}(B)$.",
    explanation: exp(
      "On applique la formule des probabilités totales développée.",
      "$P(B) = 0{,}6 \\times 0{,}5 + 0{,}4 \\times 0{,}25 = 0{,}3 + 0{,}1$.",
      "$= 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    canvas: arbre(0.6, 0.5, 0.25),
    tags: ["premiere", "maths", "probas_cond", "totales", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 5,
    theme: "neutral",
    text: "Un test : $P(\\text{malade}) = 0{,}1$, $P_{\\text{malade}}(+) = 0{,}9$, $P_{\\text{sain}}(+) = 0{,}2$. Quelle est la probabilité d'avoir un test positif ?",
    format: "short",
    expected: ["0,27"],
    comparator: "number_equal",
    hint: "$0{,}1 \\times 0{,}9 + 0{,}9 \\times 0{,}2$.",
    explanation: exp(
      "On applique les probabilités totales sur la partition malade/sain.",
      "$P(+) = 0{,}1 \\times 0{,}9 + 0{,}9 \\times 0{,}2 = 0{,}09 + 0{,}18$.",
      "$= 0{,}27$.",
      "$P(+) = 0{,}27$."
    ),
    canvas: arbre(0.1, 0.9, 0.2),
    tags: ["premiere", "maths", "probas_cond", "totales", "canvas", "short"],
  },
  {
    kind: "template",
    id: "premiere_pc_tot_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 4,
    theme: "neutral",
    hint: "$P(B) = P(A)P_A(B) + P(\\bar A)P_{\\bar A}(B)$.",
    tags: ["premiere", "maths", "probas_cond", "totales", "template"],
    generate: () => {
      const pA = randomInt(2, 8) / 10;
      const pBsiA = randomInt(1, 9) / 10;
      const pBsiNonA = randomInt(1, 9) / 10;
      const pB = Math.round((pA * pBsiA + (1 - pA) * pBsiNonA) * 100) / 100;
      return {
        text: `Avec $P(A) = ${fr(pA)}$, $P_A(B) = ${fr(pBsiA)}$, $P_{\\bar A}(B) = ${fr(pBsiNonA)}$, calcule $P(B)$. (arrondir au centième)`,
        format: "short",
        expected: [fr(pB)],
        comparator: "number_equal",
        canvas: arbre(pA, pBsiA, pBsiNonA),
        explanation: exp(
          "On applique la formule des probabilités totales.",
          `$P(B) = ${fr(pA)} \\times ${fr(pBsiA)} + ${fr(1 - pA)} \\times ${fr(pBsiNonA)}$.`,
          `$= ${fr(pB)}$.`,
          `$P(B) = ${fr(pB)}$.`
        ),
      };
    },
  },

  /* ===================== PC_INDEPENDANCE ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 2,
    theme: "neutral",
    text: "Deux événements $A$ et $B$ sont indépendants si et seulement si :",
    format: "qcm",
    choices: [
      "$P(A \\cap B) = P(A) \\times P(B)$",
      "$P(A \\cap B) = P(A) + P(B)$",
      "$P(A \\cap B) = 0$",
      "$P(A) = P(B)$",
    ],
    expected: ["$P(A \\cap B) = P(A) \\times P(B)$"],
    comparator: "mcq_exact",
    hint: "Produit des probabilités.",
    explanation: exp(
      "L'indépendance se caractérise par le produit.",
      "$A$ et $B$ indépendants $\\Leftrightarrow P(A \\cap B) = P(A) \\times P(B)$.",
      "C'est équivalent à $P_A(B) = P(B)$.",
      "$P(A \\cap B) = P(A) \\times P(B)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 3,
    theme: "neutral",
    text: "Si $A$ et $B$ sont indépendants avec $P(A) = 0{,}5$ et $P(B) = 0{,}4$, combien vaut $P(A \\cap B)$ ?",
    format: "short",
    expected: ["0,2"],
    comparator: "number_equal",
    hint: "$P(A) \\times P(B)$.",
    explanation: exp(
      "Pour des événements indépendants, $P(A \\cap B) = P(A) \\times P(B)$.",
      "$0{,}5 \\times 0{,}4$.",
      "$= 0{,}2$.",
      "$P(A \\cap B) = 0{,}2$."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A) = 0{,}5$, $P(B) = 0{,}4$, $P(A \\cap B) = 0{,}3$. Les événements sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "Non, car $0{,}3 \\neq 0{,}5 \\times 0{,}4$",
      "Oui, car $0{,}3 = 0{,}5 \\times 0{,}4$",
      "Oui, toujours",
      "On ne peut pas savoir",
    ],
    expected: ["Non, car $0{,}3 \\neq 0{,}5 \\times 0{,}4$"],
    comparator: "mcq_exact",
    hint: "Compare $P(A \\cap B)$ et $P(A)P(B)$.",
    explanation: exp(
      "On compare $P(A \\cap B)$ et $P(A) \\times P(B)$.",
      "$P(A) \\times P(B) = 0{,}5 \\times 0{,}4 = 0{,}2$, or $P(A \\cap B) = 0{,}3$.",
      "$0{,}3 \\neq 0{,}2$ : pas indépendants.",
      "Non, ils ne sont pas indépendants."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 3,
    theme: "neutral",
    text: "Si $A$ et $B$ sont indépendants, alors $P_A(B)$ est égale à :",
    format: "qcm",
    choices: ["$P(B)$", "$P(A)$", "$0$", "$1$"],
    expected: ["$P(B)$"],
    comparator: "mcq_exact",
    hint: "L'événement $A$ n'influence pas $B$.",
    explanation: exp(
      "L'indépendance signifie que $A$ n'influe pas sur $B$.",
      "La probabilité de $B$ sachant $A$ est la même que celle de $B$.",
      "$P_A(B) = P(B)$.",
      "$P(B)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_pc_ind_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 3,
    theme: "neutral",
    hint: "Indépendants → $P(A \\cap B) = P(A) \\times P(B)$.",
    tags: ["premiere", "maths", "probas_cond", "independance", "template"],
    generate: () => {
      const pA = randomInt(2, 8) / 10;
      const pB = randomInt(2, 8) / 10;
      const inter = Math.round(pA * pB * 100) / 100;
      return {
        text: `$A$ et $B$ sont indépendants avec $P(A) = ${fr(pA)}$ et $P(B) = ${fr(pB)}$. Combien vaut $P(A \\cap B)$ ? (arrondir au centième)`,
        format: "short",
        expected: [fr(inter)],
        comparator: "number_equal",
        explanation: exp(
          "Pour des événements indépendants, on multiplie les probabilités.",
          `$P(A \\cap B) = ${fr(pA)} \\times ${fr(pB)}$.`,
          `$= ${fr(inter)}$.`,
          `$P(A \\cap B) = ${fr(inter)}$.`
        ),
      };
    },
  },
];
