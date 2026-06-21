// lib/tutor-v4/questionBank/seconde/maths/racine-carree.bank.ts
//
// Chapitre : Racine carree (notion racine_carree_2de)
// microSkills (~6-7 items chacun, difficultes etalees 1->5) :
//   racine_calcul        — Calculer une racine carree
//   racine_carre_de_a2   — Utiliser racine de a^2 = |a|
//   racine_produit       — Utiliser racine de ab = racine de a x racine de b
//   racine_simplification— Simplifier une racine (racine de 50 = 5 racine de 2)
//
// PERIMETRE BO 2019. Conventions : LaTeX, regle QCM.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

export const racineCarreeBank: TutorBankItemV4[] = [
  /* ===================== RACINE_CALCUL ===================== */

  {
    kind: "fixed",
    id: "seconde_racine_calcul_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_calcul",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{49}$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche le nombre positif dont le carré vaut $49$.",
    explanation: exp(
      "La racine carrée de $a$ est le nombre positif dont le carré vaut $a$.",
      "On cherche $x \\ge 0$ tel que $x^2 = 49$.",
      "$7^2 = 49$, donc $\\sqrt{49} = 7$.",
      "$\\sqrt{49} = 7$."
    ),
    tags: ["seconde", "maths", "racine", "calcul", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_calcul_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_calcul",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{64}$ ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "$8^2 = 64$.",
    explanation: exp(
      "On cherche le nombre positif dont le carré vaut $64$.",
      "On teste : $8^2 = 64$.",
      "Donc $\\sqrt{64} = 8$.",
      "$\\sqrt{64} = 8$."
    ),
    tags: ["seconde", "maths", "racine", "calcul", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_calcul_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_calcul",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{144}$ ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "$12^2 = 144$.",
    explanation: exp(
      "On cherche le nombre positif dont le carré vaut $144$.",
      "$12^2 = 144$.",
      "Donc $\\sqrt{144} = 12$.",
      "$\\sqrt{144} = 12$."
    ),
    tags: ["seconde", "maths", "racine", "calcul", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_calcul_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_calcul",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{0}$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$0^2 = 0$.",
    explanation: exp(
      "La racine carrée de $0$ est $0$.",
      "On cherche $x \\ge 0$ tel que $x^2 = 0$.",
      "$0^2 = 0$.",
      "$\\sqrt{0} = 0$."
    ),
    tags: ["seconde", "maths", "racine", "calcul", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_calcul_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $(\\sqrt{5})^2$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Pour $a \\ge 0$, $(\\sqrt{a})^2 = a$.",
    explanation: exp(
      "Le carré d'une racine carrée redonne le nombre de départ (pour $a \\ge 0$).",
      "On applique $(\\sqrt{a})^2 = a$.",
      "$(\\sqrt{5})^2 = 5$.",
      "$(\\sqrt{5})^2 = 5$."
    ),
    tags: ["seconde", "maths", "racine", "calcul", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_calcul_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Entre quels entiers consécutifs se situe $\\sqrt{20}$ ?",
    format: "qcm",
    choices: ["entre $4$ et $5$", "entre $3$ et $4$", "entre $5$ et $6$", "entre $9$ et $11$"],
    expected: ["entre $4$ et $5$"],
    comparator: "mcq_exact",
    hint: "$4^2 = 16$ et $5^2 = 25$.",
    explanation: exp(
      "On encadre $\\sqrt{20}$ à l'aide de carrés parfaits.",
      "$16 < 20 < 25$, donc $\\sqrt{16} < \\sqrt{20} < \\sqrt{25}$.",
      "$4 < \\sqrt{20} < 5$.",
      "$\\sqrt{20}$ est entre $4$ et $5$."
    ),
    tags: ["seconde", "maths", "racine", "calcul", "qcm"],
  },

  /* ===================== RACINE_CARRE_DE_A2 ===================== */

  {
    kind: "fixed",
    id: "seconde_racine_a2_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_carre_de_a2",
    difficulty: 2,
    theme: "neutral",
    text: "Pour un réel $a$ quelconque, à quoi est égal $\\sqrt{a^2}$ ?",
    format: "qcm",
    choices: ["$|a|$", "$a$", "$a^2$", "$\\pm a$"],
    expected: ["$|a|$"],
    comparator: "mcq_exact",
    hint: "Une racine carrée est toujours positive ou nulle.",
    explanation: exp(
      "$\\sqrt{a^2}$ doit être positif ou nul, même si $a$ est négatif.",
      "On utilise la propriété du cours.",
      "$\\sqrt{a^2} = |a|$ (et non $a$, qui pourrait être négatif).",
      "$\\sqrt{a^2} = |a|$."
    ),
    tags: ["seconde", "maths", "racine", "carre_de_a2", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_a2_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_carre_de_a2",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{(-5)^2}$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$\\sqrt{(-5)^2} = |-5|$.",
    explanation: exp(
      "On utilise $\\sqrt{a^2} = |a|$.",
      "Ici $a = -5$, donc $\\sqrt{(-5)^2} = |-5|$.",
      "$|-5| = 5$.",
      "$\\sqrt{(-5)^2} = 5$."
    ),
    tags: ["seconde", "maths", "racine", "carre_de_a2", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_a2_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_carre_de_a2",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{7^2}$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$\\sqrt{7^2} = |7|$.",
    explanation: exp(
      "On utilise $\\sqrt{a^2} = |a|$.",
      "Ici $a = 7$, qui est positif.",
      "$\\sqrt{7^2} = |7| = 7$.",
      "$\\sqrt{7^2} = 7$."
    ),
    tags: ["seconde", "maths", "racine", "carre_de_a2", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_a2_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_carre_de_a2",
    difficulty: 4,
    theme: "neutral",
    text: "Pour un réel $a < 0$, à quoi est égal $\\sqrt{a^2}$ ?",
    format: "qcm",
    choices: ["$-a$", "$a$", "$|a^2|$", "$a^2$"],
    expected: ["$-a$"],
    comparator: "mcq_exact",
    hint: "$\\sqrt{a^2} = |a|$, et si $a < 0$ alors $|a| = -a$.",
    explanation: exp(
      "On part de $\\sqrt{a^2} = |a|$.",
      "Quand $a < 0$, la valeur absolue vaut l'opposé : $|a| = -a$.",
      "Donc $\\sqrt{a^2} = -a$ (qui est bien positif).",
      "Pour $a < 0$, $\\sqrt{a^2} = -a$."
    ),
    tags: ["seconde", "maths", "racine", "carre_de_a2", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_a2_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_carre_de_a2",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{(-3)^2} + \\sqrt{4^2}$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$\\sqrt{(-3)^2} = |-3|$ et $\\sqrt{4^2} = |4|$.",
    explanation: exp(
      "On applique $\\sqrt{a^2} = |a|$ à chaque terme.",
      "$\\sqrt{(-3)^2} = 3$ et $\\sqrt{4^2} = 4$.",
      "$3 + 4 = 7$.",
      "$\\sqrt{(-3)^2} + \\sqrt{4^2} = 7$."
    ),
    tags: ["seconde", "maths", "racine", "carre_de_a2", "short"],
  },

  /* ===================== RACINE_PRODUIT ===================== */

  {
    kind: "fixed",
    id: "seconde_racine_produit_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_produit",
    difficulty: 2,
    theme: "neutral",
    text: "Pour $a \\ge 0$ et $b \\ge 0$, à quoi est égal $\\sqrt{ab}$ ?",
    format: "qcm",
    choices: ["$\\sqrt{a} \\times \\sqrt{b}$", "$\\sqrt{a} + \\sqrt{b}$", "$a \\times b$", "$\\sqrt{a} - \\sqrt{b}$"],
    expected: ["$\\sqrt{a} \\times \\sqrt{b}$"],
    comparator: "mcq_exact",
    hint: "La racine d'un produit est le produit des racines.",
    explanation: exp(
      "Pour des réels positifs, $\\sqrt{ab} = \\sqrt{a}\\times\\sqrt{b}$.",
      "On applique cette propriété.",
      "$\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$ (ce n'est PAS vrai pour une somme).",
      "$\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$."
    ),
    tags: ["seconde", "maths", "racine", "produit", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_produit_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_produit",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{9 \\times 16}$ ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "$\\sqrt{9 \\times 16} = \\sqrt{9} \\times \\sqrt{16}$.",
    explanation: exp(
      "On utilise $\\sqrt{ab} = \\sqrt{a}\\times\\sqrt{b}$.",
      "$\\sqrt{9 \\times 16} = \\sqrt{9} \\times \\sqrt{16} = 3 \\times 4$.",
      "$3 \\times 4 = 12$.",
      "$\\sqrt{9 \\times 16} = 12$."
    ),
    tags: ["seconde", "maths", "racine", "produit", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_produit_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_produit",
    difficulty: 4,
    theme: "neutral",
    text: "Combien vaut $3\\sqrt{2} \\times \\sqrt{2}$ ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "$\\sqrt{2} \\times \\sqrt{2} = 2$.",
    explanation: exp(
      "On regroupe les racines : $\\sqrt{2}\\times\\sqrt{2} = (\\sqrt{2})^2 = 2$.",
      "On calcule $3 \\times (\\sqrt{2}\\times\\sqrt{2})$.",
      "$3 \\times 2 = 6$.",
      "$3\\sqrt{2} \\times \\sqrt{2} = 6$."
    ),
    tags: ["seconde", "maths", "racine", "produit", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_produit_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_produit",
    difficulty: 2,
    theme: "neutral",
    text: "« Pour tous réels positifs $a$ et $b$, $\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b}$. » Est-ce vrai ?",
    format: "qcm",
    choices: ["Faux", "Vrai", "Vrai seulement si $a = b$", "Vrai seulement si $a = 0$"],
    expected: ["Faux"],
    comparator: "mcq_exact",
    hint: "Teste avec $a = b = 4$.",
    explanation: exp(
      "La racine d'une somme n'est pas la somme des racines (contrairement au produit).",
      "On teste $a = b = 4$ : $\\sqrt{4+4} = \\sqrt{8} \\approx 2{,}83$ mais $\\sqrt{4}+\\sqrt{4} = 4$.",
      "$2{,}83 \\neq 4$, donc l'égalité est fausse.",
      "C'est faux : $\\sqrt{a+b} \\neq \\sqrt{a} + \\sqrt{b}$ en général."
    ),
    tags: ["seconde", "maths", "racine", "produit", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_produit_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_produit",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{2} \\times \\sqrt{8}$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$\\sqrt{2}\\times\\sqrt{8} = \\sqrt{2 \\times 8}$.",
    explanation: exp(
      "On regroupe sous une seule racine : $\\sqrt{a}\\times\\sqrt{b} = \\sqrt{ab}$.",
      "$\\sqrt{2}\\times\\sqrt{8} = \\sqrt{16}$.",
      "$\\sqrt{16} = 4$.",
      "$\\sqrt{2} \\times \\sqrt{8} = 4$."
    ),
    tags: ["seconde", "maths", "racine", "produit", "short"],
  },

  /* ===================== RACINE_SIMPLIFICATION ===================== */

  {
    kind: "fixed",
    id: "seconde_racine_simpl_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_simplification",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme simplifiée de $\\sqrt{50}$ ?",
    format: "qcm",
    choices: ["$5\\sqrt{2}$", "$2\\sqrt{5}$", "$25\\sqrt{2}$", "$\\sqrt{50}$"],
    expected: ["$5\\sqrt{2}$"],
    comparator: "mcq_exact",
    hint: "$50 = 25 \\times 2$ et $\\sqrt{25} = 5$.",
    explanation: exp(
      "On extrait le plus grand carré parfait du nombre sous la racine.",
      "$50 = 25 \\times 2$, donc $\\sqrt{50} = \\sqrt{25}\\times\\sqrt{2}$.",
      "$\\sqrt{25} = 5$, donc $\\sqrt{50} = 5\\sqrt{2}$.",
      "$\\sqrt{50} = 5\\sqrt{2}$."
    ),
    tags: ["seconde", "maths", "racine", "simplification", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_simpl_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_simplification",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme simplifiée de $\\sqrt{12}$ ?",
    format: "qcm",
    choices: ["$2\\sqrt{3}$", "$3\\sqrt{2}$", "$4\\sqrt{3}$", "$2\\sqrt{6}$"],
    expected: ["$2\\sqrt{3}$"],
    comparator: "mcq_exact",
    hint: "$12 = 4 \\times 3$ et $\\sqrt{4} = 2$.",
    explanation: exp(
      "On extrait le carré parfait sous la racine.",
      "$12 = 4 \\times 3$, donc $\\sqrt{12} = \\sqrt{4}\\times\\sqrt{3}$.",
      "$\\sqrt{4} = 2$, donc $\\sqrt{12} = 2\\sqrt{3}$.",
      "$\\sqrt{12} = 2\\sqrt{3}$."
    ),
    tags: ["seconde", "maths", "racine", "simplification", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_simpl_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_simplification",
    difficulty: 4,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{18} + \\sqrt{2}$ ?",
    format: "qcm",
    choices: ["$4\\sqrt{2}$", "$\\sqrt{20}$", "$3\\sqrt{2}$", "$2\\sqrt{5}$"],
    expected: ["$4\\sqrt{2}$"],
    comparator: "mcq_exact",
    hint: "Simplifie d'abord $\\sqrt{18} = 3\\sqrt{2}$.",
    explanation: exp(
      "On simplifie chaque racine pour faire apparaître la même racine.",
      "$\\sqrt{18} = 3\\sqrt{2}$, donc $\\sqrt{18} + \\sqrt{2} = 3\\sqrt{2} + \\sqrt{2}$.",
      "$3\\sqrt{2} + 1\\sqrt{2} = 4\\sqrt{2}$.",
      "$\\sqrt{18} + \\sqrt{2} = 4\\sqrt{2}$."
    ),
    tags: ["seconde", "maths", "racine", "simplification", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_simpl_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_simplification",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme simplifiée de $\\sqrt{75}$ ?",
    format: "qcm",
    choices: ["$5\\sqrt{3}$", "$3\\sqrt{5}$", "$25\\sqrt{3}$", "$15\\sqrt{5}$"],
    expected: ["$5\\sqrt{3}$"],
    comparator: "mcq_exact",
    hint: "$75 = 25 \\times 3$.",
    explanation: exp(
      "On extrait le plus grand carré parfait.",
      "$75 = 25 \\times 3$, donc $\\sqrt{75} = \\sqrt{25}\\times\\sqrt{3}$.",
      "$\\sqrt{25} = 5$, donc $\\sqrt{75} = 5\\sqrt{3}$.",
      "$\\sqrt{75} = 5\\sqrt{3}$."
    ),
    tags: ["seconde", "maths", "racine", "simplification", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_racine_simpl_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_simplification",
    difficulty: 3,
    theme: "neutral",
    hint: "Extrais le carré parfait : racine(k^2 * 2) = k racine(2).",
    tags: ["seconde", "maths", "racine", "simplification", "template"],
    generate: () => {
      const k = randomInt(2, 6);
      const sous = k * k * 2;
      const correct = `$${k}\\sqrt{2}$`;
      const choices = [correct, `$${k}\\sqrt{3}$`, `$${k * k}\\sqrt{2}$`, `$\\sqrt{${sous}}$`];
      return {
        text: `Quelle est la forme simplifiée de $\\sqrt{${sous}}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On extrait le plus grand carré parfait sous la racine.",
          `$${sous} = ${k * k} \\times 2$, donc $\\sqrt{${sous}} = \\sqrt{${k * k}}\\times\\sqrt{2}$.`,
          `$\\sqrt{${k * k}} = ${k}$, donc $\\sqrt{${sous}} = ${k}\\sqrt{2}$.`,
          `$\\sqrt{${sous}} = ${k}\\sqrt{2}$.`
        ),
      };
    },
  },
];
