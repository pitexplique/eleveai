// lib/tutor-v4/questionBank/seconde/maths/calcul-litteral-puissances-racines.bank.ts
//
// Notion : Calcul litteral (calcul_litteral_2de) — sous-fichier 1/3
// microSkills couverts (~10 items chacun, difficultes etalees 1->5) :
//   litteral_puissances_racines — Puissances entieres relatives et racines carrees
//   litteral_racine_proprietes  — Proprietes des racines (racine de a^2 = |a|, racine de ab)
//
// PERIMETRE BO 2019 : puissances entieres relatives, racines carrees, racine(a^2)=|a|,
// racine(ab)=racine(a)*racine(b). Conventions : LaTeX, regle QCM.

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

export const calculLitteralPuissancesRacinesBank: TutorBankItemV4[] = [
  /* =========================================================
     LITTERAL_PUISSANCES_RACINES
  ========================================================= */

  {
    kind: "fixed",
    id: "seconde_litteral_puissances_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_puissances_racines",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut $2^3$ ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "$2^3 = 2 \\times 2 \\times 2$.",
    explanation: exp(
      "Une puissance $a^n$ est un produit de $n$ facteurs égaux à $a$.",
      "On multiplie $2$ par lui-même trois fois.",
      "$2^3 = 2 \\times 2 \\times 2 = 8$.",
      "$2^3 = 8$."
    ),
    tags: ["seconde", "maths", "calcul_litteral", "puissances", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_puissances_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_puissances_racines",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut $5^2$ ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "$5^2 = 5 \\times 5$.",
    explanation: exp(
      "Le carré d'un nombre est ce nombre multiplié par lui-même.",
      "On calcule $5 \\times 5$.",
      "$5^2 = 25$.",
      "$5^2 = 25$."
    ),
    tags: ["seconde", "maths", "calcul_litteral", "puissances", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_puissances_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_puissances_racines",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $3^0$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Tout nombre non nul élevé à la puissance $0$ vaut...",
    explanation: exp(
      "Par convention, $a^0 = 1$ pour tout $a \\neq 0$.",
      "On applique la règle de la puissance $0$.",
      "$3^0 = 1$.",
      "$3^0 = 1$."
    ),
    tags: ["seconde", "maths", "calcul_litteral", "puissances", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_puissances_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_puissances_racines",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $10^{-2}$ ?",
    format: "short",
    expected: ["0,01", "0.01"],
    comparator: "number_equal",
    hint: "$10^{-2} = \\dfrac{1}{10^2}$.",
    explanation: exp(
      "Une puissance négative est l'inverse de la puissance positive : $a^{-n} = \\dfrac{1}{a^n}$.",
      "On calcule $\\dfrac{1}{10^2}$.",
      "$10^{-2} = \\dfrac{1}{100} = 0{,}01$.",
      "$10^{-2} = 0{,}01$."
    ),
    tags: ["seconde", "maths", "calcul_litteral", "puissances", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_puissances_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_puissances_racines",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $a^3 \\times a^2$ (avec $a \\neq 0$).",
    format: "qcm",
    choices: ["$a^5$", "$a^6$", "$a^1$", "$a^9$"],
    expected: ["$a^5$"],
    comparator: "mcq_exact",
    hint: "$a^m \\times a^n = a^{m+n}$.",
    explanation: exp(
      "Pour multiplier deux puissances de même base, on ajoute les exposants.",
      "On applique $a^m \\times a^n = a^{m+n}$.",
      "$a^3 \\times a^2 = a^{3+2} = a^5$.",
      "$a^3 \\times a^2 = a^5$."
    ),
    tags: ["seconde", "maths", "calcul_litteral", "puissances", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_puissances_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_puissances_racines",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $(a^2)^3$ (avec $a \\neq 0$).",
    format: "qcm",
    choices: ["$a^6$", "$a^5$", "$a^8$", "$a^9$"],
    expected: ["$a^6$"],
    comparator: "mcq_exact",
    hint: "$(a^m)^n = a^{m \\times n}$.",
    explanation: exp(
      "Pour élever une puissance à une puissance, on multiplie les exposants.",
      "On applique $(a^m)^n = a^{m \\times n}$.",
      "$(a^2)^3 = a^{2 \\times 3} = a^6$.",
      "$(a^2)^3 = a^6$."
    ),
    tags: ["seconde", "maths", "calcul_litteral", "puissances", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_puissances_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_puissances_racines",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $\\dfrac{a^5}{a^2}$ (avec $a \\neq 0$).",
    format: "qcm",
    choices: ["$a^3$", "$a^7$", "$a^2$", "$a^{2{,}5}$"],
    expected: ["$a^3$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{a^m}{a^n} = a^{m-n}$.",
    explanation: exp(
      "Pour diviser deux puissances de même base, on soustrait les exposants.",
      "On applique $\\dfrac{a^m}{a^n} = a^{m-n}$.",
      "$\\dfrac{a^5}{a^2} = a^{5-2} = a^3$.",
      "$\\dfrac{a^5}{a^2} = a^3$."
    ),
    tags: ["seconde", "maths", "calcul_litteral", "puissances", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_puissances_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_puissances_racines",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{64}$ ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche le nombre positif dont le carré vaut $64$.",
    explanation: exp(
      "La racine carrée de $a$ est le nombre positif dont le carré vaut $a$.",
      "On cherche $x \\ge 0$ tel que $x^2 = 64$.",
      "$8^2 = 64$, donc $\\sqrt{64} = 8$.",
      "$\\sqrt{64} = 8$."
    ),
    tags: ["seconde", "maths", "calcul_litteral", "racines", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_puissances_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_puissances_racines",
    difficulty: 4,
    theme: "neutral",
    text: "Combien vaut $2^{-3}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{8}$", "$-8$", "$-6$", "$\\dfrac{1}{6}$"],
    expected: ["$\\dfrac{1}{8}$"],
    comparator: "mcq_exact",
    hint: "$2^{-3} = \\dfrac{1}{2^3}$.",
    explanation: exp(
      "Une puissance négative donne l'inverse : $a^{-n} = \\dfrac{1}{a^n}$.",
      "On calcule $\\dfrac{1}{2^3}$.",
      "$2^3 = 8$, donc $2^{-3} = \\dfrac{1}{8}$.",
      "$2^{-3} = \\dfrac{1}{8}$."
    ),
    tags: ["seconde", "maths", "calcul_litteral", "puissances", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_puissances_fixed_10",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_puissances_racines",
    difficulty: 4,
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
    tags: ["seconde", "maths", "calcul_litteral", "racines", "short"],
  },

  {
    kind: "template",
    id: "seconde_litteral_puissances_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_puissances_racines",
    difficulty: 3,
    theme: "neutral",
    hint: "$a^m \\times a^n = a^{m+n}$.",
    tags: ["seconde", "maths", "calcul_litteral", "puissances", "template"],
    generate: () => {
      const m = randomInt(2, 5);
      const n = randomInt(2, 5);
      const correct = `$a^{${m + n}}$`;
      const choices = [correct, `$a^{${m * n}}$`, `$a^{${m + n + 1}}$`, `$a^{${Math.abs(m - n)}}$`];
      return {
        text: `Simplifie $a^{${m}} \\times a^{${n}}$ (avec $a \\neq 0$).`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour multiplier deux puissances de même base, on ajoute les exposants.",
          `On applique $a^m \\times a^n = a^{m+n}$.`,
          `$a^{${m}} \\times a^{${n}} = a^{${m}+${n}} = a^{${m + n}}$.`,
          `Le résultat est $a^{${m + n}}$.`
        ),
      };
    },
  },

  /* =========================================================
     LITTERAL_RACINE_PROPRIETES — racine(a^2)=|a|, racine(ab)
  ========================================================= */

  {
    kind: "fixed",
    id: "seconde_litteral_racineprop_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_racine_proprietes",
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
    tags: ["seconde", "maths", "calcul_litteral", "racines", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_racineprop_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_racine_proprietes",
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
    tags: ["seconde", "maths", "calcul_litteral", "racines", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_racineprop_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_racine_proprietes",
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
      "$\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$ (attention : ce n'est PAS vrai pour une somme).",
      "$\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$."
    ),
    tags: ["seconde", "maths", "calcul_litteral", "racines", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_racineprop_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_racine_proprietes",
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
    tags: ["seconde", "maths", "calcul_litteral", "racines", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_racineprop_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_racine_proprietes",
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
    tags: ["seconde", "maths", "calcul_litteral", "racines", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_racineprop_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_racine_proprietes",
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
    tags: ["seconde", "maths", "calcul_litteral", "racines", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_racineprop_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_racine_proprietes",
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
    tags: ["seconde", "maths", "calcul_litteral", "racines", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_racineprop_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_racine_proprietes",
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
    tags: ["seconde", "maths", "calcul_litteral", "racines", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_racineprop_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_racine_proprietes",
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
    tags: ["seconde", "maths", "calcul_litteral", "racines", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_litteral_racineprop_fixed_10",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_racine_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "« Pour tous réels positifs $a$ et $b$, $\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b}$. » Cette égalité est-elle vraie ?",
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
    tags: ["seconde", "maths", "calcul_litteral", "racines", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_litteral_racineprop_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_racine_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "Extrais le carré parfait : racine(k^2 * 2) = k racine(2).",
    tags: ["seconde", "maths", "calcul_litteral", "racines", "template"],
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
