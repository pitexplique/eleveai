// lib/tutor-v4/questionBank/seconde/maths/puissances.bank.ts
//
// Chapitre : Puissances (notion puissances_2de)
// microSkills (~7 items chacun, difficultes etalees 1->5) :
//   puiss_calcul               — Calculer une puissance a exposant entier
//   puiss_produit_quotient     — Produit et quotient de puissances de meme base
//   puiss_puissance_puissance  — Puissance d'une puissance
//   puiss_exposant_negatif     — Exposant negatif (a^-n = 1/a^n)
//
// PERIMETRE BO 2019 : puissances entieres relatives. Conventions : LaTeX, regle QCM.

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

export const puissancesBank: TutorBankItemV4[] = [
  /* ===================== PUISS_CALCUL ===================== */

  {
    kind: "fixed",
    id: "seconde_puiss_calcul_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_calcul",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut $2^3$ ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "$2^3 = 2 \\times 2 \\times 2$.",
    explanation: exp(
      "Une puissance $a^n$ est un produit de $n$ facteurs égaux à $a$.",
      "On multiplie $2$ par lui-même $3$ fois.",
      "$2^3 = 2 \\times 2 \\times 2 = 8$.",
      "$2^3 = 8$."
    ),
    tags: ["seconde", "maths", "puissances", "calcul", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_calcul_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_calcul",
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
    tags: ["seconde", "maths", "puissances", "calcul", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_calcul_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_calcul",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $2^4$ ?",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "$2^4 = 2 \\times 2 \\times 2 \\times 2$.",
    explanation: exp(
      "On multiplie $2$ par lui-même $4$ fois.",
      "$2^4 = 2 \\times 2 \\times 2 \\times 2$.",
      "$= 16$.",
      "$2^4 = 16$."
    ),
    tags: ["seconde", "maths", "puissances", "calcul", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_calcul_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_calcul",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $10^3$ ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "$10^3 = 10 \\times 10 \\times 10$.",
    explanation: exp(
      "Une puissance de $10$ s'écrit avec autant de zéros que l'exposant.",
      "On calcule $10 \\times 10 \\times 10$.",
      "$10^3 = 1000$.",
      "$10^3 = 1000$."
    ),
    tags: ["seconde", "maths", "puissances", "calcul", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_calcul_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_calcul",
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
    tags: ["seconde", "maths", "puissances", "calcul", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_calcul_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $(-2)^2$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$(-2)^2 = (-2) \\times (-2)$ ; un produit de deux négatifs est positif.",
    explanation: exp(
      "Le carré d'un nombre négatif est positif.",
      "On calcule $(-2) \\times (-2)$.",
      "$(-2) \\times (-2) = 4$.",
      "$(-2)^2 = 4$."
    ),
    tags: ["seconde", "maths", "puissances", "calcul", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_calcul_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $(-2)^3$ ?",
    format: "short",
    expected: ["-8"],
    comparator: "number_equal",
    hint: "Un exposant impair conserve le signe négatif.",
    explanation: exp(
      "Le cube d'un nombre négatif est négatif (exposant impair).",
      "On calcule $(-2) \\times (-2) \\times (-2)$.",
      "$4 \\times (-2) = -8$.",
      "$(-2)^3 = -8$."
    ),
    tags: ["seconde", "maths", "puissances", "calcul", "short"],
  },

  {
    kind: "template",
    id: "seconde_puiss_calcul_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_calcul",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie la base par elle-même autant de fois que l'exposant.",
    tags: ["seconde", "maths", "puissances", "calcul", "template"],
    generate: () => {
      const base = randomInt(2, 6);
      const exposant = randomInt(2, 3);
      const valeur = base ** exposant;
      return {
        text: `Combien vaut $${base}^{${exposant}}$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Une puissance est un produit de facteurs égaux à la base.",
          `On multiplie $${base}$ par lui-même $${exposant}$ fois.`,
          `$${base}^{${exposant}} = ${valeur}$.`,
          `$${base}^{${exposant}} = ${valeur}$.`
        ),
      };
    },
  },

  /* ===================== PUISS_PRODUIT_QUOTIENT ===================== */

  {
    kind: "fixed",
    id: "seconde_puiss_pq_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_produit_quotient",
    difficulty: 2,
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
    tags: ["seconde", "maths", "puissances", "produit_quotient", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_pq_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_produit_quotient",
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
    tags: ["seconde", "maths", "puissances", "produit_quotient", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_pq_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_produit_quotient",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $2^3 \\times 2^2$ ?",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "$2^3 \\times 2^2 = 2^{3+2} = 2^5$.",
    explanation: exp(
      "On ajoute les exposants car la base est la même.",
      "$2^3 \\times 2^2 = 2^{5}$.",
      "$2^5 = 32$.",
      "$2^3 \\times 2^2 = 32$."
    ),
    tags: ["seconde", "maths", "puissances", "produit_quotient", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_pq_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_produit_quotient",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $a^4 \\times a$ (avec $a \\neq 0$).",
    format: "qcm",
    choices: ["$a^5$", "$a^4$", "$a^{4{,}1}$", "$2a^4$"],
    expected: ["$a^5$"],
    comparator: "mcq_exact",
    hint: "$a = a^1$.",
    explanation: exp(
      "On écrit $a$ comme $a^1$ avant d'ajouter les exposants.",
      "$a^4 \\times a = a^4 \\times a^1 = a^{4+1}$.",
      "$= a^5$.",
      "$a^4 \\times a = a^5$."
    ),
    tags: ["seconde", "maths", "puissances", "produit_quotient", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_pq_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_produit_quotient",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $\\dfrac{a^6}{a^4}$ (avec $a \\neq 0$).",
    format: "qcm",
    choices: ["$a^2$", "$a^{10}$", "$a^3$", "$a^{1{,}5}$"],
    expected: ["$a^2$"],
    comparator: "mcq_exact",
    hint: "On soustrait les exposants.",
    explanation: exp(
      "Pour un quotient de puissances de même base, on soustrait les exposants.",
      "$\\dfrac{a^6}{a^4} = a^{6-4}$.",
      "$= a^2$.",
      "$\\dfrac{a^6}{a^4} = a^2$."
    ),
    tags: ["seconde", "maths", "puissances", "produit_quotient", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_puiss_pq_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_produit_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "$a^m \\times a^n = a^{m+n}$.",
    tags: ["seconde", "maths", "puissances", "produit_quotient", "template"],
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
          "On ajoute les exposants car la base est la même.",
          `$a^{${m}} \\times a^{${n}} = a^{${m}+${n}}$.`,
          `$= a^{${m + n}}$.`,
          `Le résultat est $a^{${m + n}}$.`
        ),
      };
    },
  },

  /* ===================== PUISS_PUISSANCE_PUISSANCE ===================== */

  {
    kind: "fixed",
    id: "seconde_puiss_pp_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_puissance_puissance",
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
    tags: ["seconde", "maths", "puissances", "puissance_puissance", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_pp_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_puissance_puissance",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $(a^3)^2$ (avec $a \\neq 0$).",
    format: "qcm",
    choices: ["$a^6$", "$a^5$", "$a^9$", "$a^8$"],
    expected: ["$a^6$"],
    comparator: "mcq_exact",
    hint: "$(a^m)^n = a^{m \\times n}$.",
    explanation: exp(
      "On multiplie les exposants.",
      "$(a^3)^2 = a^{3 \\times 2}$.",
      "$= a^6$.",
      "$(a^3)^2 = a^6$."
    ),
    tags: ["seconde", "maths", "puissances", "puissance_puissance", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_pp_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_puissance_puissance",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $(2^2)^3$ ?",
    format: "short",
    expected: ["64"],
    comparator: "number_equal",
    hint: "$(2^2)^3 = 2^{2 \\times 3} = 2^6$.",
    explanation: exp(
      "On multiplie les exposants puis on calcule.",
      "$(2^2)^3 = 2^{6}$.",
      "$2^6 = 64$.",
      "$(2^2)^3 = 64$."
    ),
    tags: ["seconde", "maths", "puissances", "puissance_puissance", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_pp_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_puissance_puissance",
    difficulty: 4,
    theme: "neutral",
    text: "Simplifie $(x^4)^2$ (avec $x \\neq 0$).",
    format: "qcm",
    choices: ["$x^8$", "$x^6$", "$x^{16}$", "$x^2$"],
    expected: ["$x^8$"],
    comparator: "mcq_exact",
    hint: "$(x^m)^n = x^{m \\times n}$.",
    explanation: exp(
      "On multiplie les exposants.",
      "$(x^4)^2 = x^{4 \\times 2}$.",
      "$= x^8$.",
      "$(x^4)^2 = x^8$."
    ),
    tags: ["seconde", "maths", "puissances", "puissance_puissance", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_puiss_pp_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_puissance_puissance",
    difficulty: 3,
    theme: "neutral",
    hint: "$(a^m)^n = a^{m \\times n}$.",
    tags: ["seconde", "maths", "puissances", "puissance_puissance", "template"],
    generate: () => {
      const m = randomInt(2, 4);
      const n = randomInt(2, 4);
      const correct = `$a^{${m * n}}$`;
      const choices = [correct, `$a^{${m + n}}$`, `$a^{${m * n + 1}}$`, `$a^{${m * n - 1}}$`];
      return {
        text: `Simplifie $(a^{${m}})^{${n}}$ (avec $a \\neq 0$).`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On multiplie les exposants.",
          `$(a^{${m}})^{${n}} = a^{${m} \\times ${n}}$.`,
          `$= a^{${m * n}}$.`,
          `Le résultat est $a^{${m * n}}$.`
        ),
      };
    },
  },

  /* ===================== PUISS_EXPOSANT_NEGATIF ===================== */

  {
    kind: "fixed",
    id: "seconde_puiss_neg_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_exposant_negatif",
    difficulty: 2,
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
    tags: ["seconde", "maths", "puissances", "exposant_negatif", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_neg_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_exposant_negatif",
    difficulty: 3,
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
    tags: ["seconde", "maths", "puissances", "exposant_negatif", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_neg_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_exposant_negatif",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi est égal $a^{-1}$ (avec $a \\neq 0$) ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{a}$", "$-a$", "$a$", "$1 - a$"],
    expected: ["$\\dfrac{1}{a}$"],
    comparator: "mcq_exact",
    hint: "$a^{-1}$ est l'inverse de $a$.",
    explanation: exp(
      "Un exposant $-1$ donne l'inverse.",
      "On applique $a^{-n} = \\dfrac{1}{a^n}$ avec $n = 1$.",
      "$a^{-1} = \\dfrac{1}{a}$.",
      "$a^{-1} = \\dfrac{1}{a}$."
    ),
    tags: ["seconde", "maths", "puissances", "exposant_negatif", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_neg_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_exposant_negatif",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi est égal $a^{-2}$ (avec $a \\neq 0$) ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{a^2}$", "$-a^2$", "$\\dfrac{1}{2a}$", "$a^2$"],
    expected: ["$\\dfrac{1}{a^2}$"],
    comparator: "mcq_exact",
    hint: "$a^{-n} = \\dfrac{1}{a^n}$.",
    explanation: exp(
      "Un exposant négatif donne l'inverse de la puissance positive.",
      "On applique $a^{-n} = \\dfrac{1}{a^n}$ avec $n = 2$.",
      "$a^{-2} = \\dfrac{1}{a^2}$.",
      "$a^{-2} = \\dfrac{1}{a^2}$."
    ),
    tags: ["seconde", "maths", "puissances", "exposant_negatif", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_neg_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_exposant_negatif",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $10^{-1}$ ?",
    format: "short",
    expected: ["0,1", "0.1"],
    comparator: "number_equal",
    hint: "$10^{-1} = \\dfrac{1}{10}$.",
    explanation: exp(
      "Un exposant $-1$ donne l'inverse.",
      "$10^{-1} = \\dfrac{1}{10}$.",
      "$\\dfrac{1}{10} = 0{,}1$.",
      "$10^{-1} = 0{,}1$."
    ),
    tags: ["seconde", "maths", "puissances", "exposant_negatif", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_neg_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_exposant_negatif",
    difficulty: 4,
    theme: "neutral",
    text: "Combien vaut $5^{-2}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{25}$", "$-25$", "$\\dfrac{1}{10}$", "$\\dfrac{1}{32}$"],
    expected: ["$\\dfrac{1}{25}$"],
    comparator: "mcq_exact",
    hint: "$5^{-2} = \\dfrac{1}{5^2}$.",
    explanation: exp(
      "Une puissance négative donne l'inverse de la puissance positive.",
      "On calcule $\\dfrac{1}{5^2}$.",
      "$5^2 = 25$, donc $5^{-2} = \\dfrac{1}{25}$.",
      "$5^{-2} = \\dfrac{1}{25}$."
    ),
    tags: ["seconde", "maths", "puissances", "exposant_negatif", "qcm"],
  },
];
