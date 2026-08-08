// lib/tutor-v4/questionBank/seconde/maths/identites-remarquables.bank.ts
//
// Chapitre : Identites remarquables (notion identites_remarquables_2de)
// microSkills (>= 10 items chacun, difficultes 1->5, templates pour la variete) :
//   ir_carre_somme       — (a+b)^2 = a^2 + 2ab + b^2
//   ir_carre_difference  — (a-b)^2 = a^2 - 2ab + b^2
//   ir_difference_carres — a^2 - b^2 = (a-b)(a+b)
//   ir_calcul_mental     — Calcul mental a l'aide d'une identite
//   ir_application       — Appliquer les identites dans les deux sens
//
// Niveau 5 etoiles : items avec racines carrees (certains profs les introduisent ici).
// PERIMETRE BO. Conventions : LaTeX, regle QCM.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

export const identitesRemarquablesBank: TutorBankItemV4[] = [
  /* ===================== IR_CARRE_SOMME — (a+b)^2 ===================== */

  {
    kind: "fixed",
    id: "seconde_ir_cs_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_somme",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi est égal $(a + b)^2$ ?",
    format: "qcm",
    choices: ["$a^2 + 2ab + b^2$", "$a^2 + b^2$", "$a^2 + ab + b^2$", "$2a + 2b$"],
    expected: ["$a^2 + 2ab + b^2$"],
    comparator: "mcq_exact",
    hint: "Il y a un double produit $2ab$.",
    explanation: exp(
      "C'est la première identité remarquable.",
      "On développe $(a+b)(a+b)$.",
      "$(a+b)^2 = a^2 + 2ab + b^2$.",
      "$(a + b)^2 = a^2 + 2ab + b^2$."
    ),
    tags: ["seconde", "maths", "identites", "carre_somme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cs_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_somme",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme développée de $(x + 3)^2$ ?",
    format: "qcm",
    choices: ["$x^2 + 6x + 9$", "$x^2 + 9$", "$x^2 + 3x + 9$", "$x^2 + 6x + 6$"],
    expected: ["$x^2 + 6x + 9$"],
    comparator: "mcq_exact",
    hint: "$2 \\times x \\times 3 = 6x$.",
    explanation: exp(
      "On applique $(a+b)^2 = a^2 + 2ab + b^2$ avec $a = x$, $b = 3$.",
      "$x^2 + 2 \\times x \\times 3 + 3^2$.",
      "$= x^2 + 6x + 9$.",
      "$(x + 3)^2 = x^2 + 6x + 9$."
    ),
    tags: ["seconde", "maths", "identites", "carre_somme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cs_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_somme",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme développée de $(x + 5)^2$ ?",
    format: "qcm",
    choices: ["$x^2 + 10x + 25$", "$x^2 + 25$", "$x^2 + 5x + 25$", "$x^2 + 10x + 10$"],
    expected: ["$x^2 + 10x + 25$"],
    comparator: "mcq_exact",
    hint: "$2 \\times x \\times 5 = 10x$.",
    explanation: exp(
      "On applique l'identité avec $a = x$, $b = 5$.",
      "$x^2 + 2 \\times x \\times 5 + 5^2$.",
      "$= x^2 + 10x + 25$.",
      "$(x + 5)^2 = x^2 + 10x + 25$."
    ),
    tags: ["seconde", "maths", "identites", "carre_somme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cs_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_somme",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme développée de $(x + 1)^2$ ?",
    format: "qcm",
    choices: ["$x^2 + 2x + 1$", "$x^2 + 1$", "$x^2 + x + 1$", "$x^2 + 2x + 2$"],
    expected: ["$x^2 + 2x + 1$"],
    comparator: "mcq_exact",
    hint: "$2 \\times x \\times 1 = 2x$.",
    explanation: exp(
      "On applique l'identité avec $a = x$, $b = 1$.",
      "$x^2 + 2 \\times x \\times 1 + 1^2$.",
      "$= x^2 + 2x + 1$.",
      "$(x + 1)^2 = x^2 + 2x + 1$."
    ),
    tags: ["seconde", "maths", "identites", "carre_somme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cs_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_somme",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme développée de $(2x + 1)^2$ ?",
    format: "qcm",
    choices: ["$4x^2 + 4x + 1$", "$4x^2 + 1$", "$2x^2 + 4x + 1$", "$4x^2 + 2x + 1$"],
    expected: ["$4x^2 + 4x + 1$"],
    comparator: "mcq_exact",
    hint: "$a = 2x$ donc $a^2 = 4x^2$.",
    explanation: exp(
      "On applique l'identité avec $a = 2x$, $b = 1$.",
      "$(2x)^2 + 2 \\times 2x \\times 1 + 1^2$.",
      "$= 4x^2 + 4x + 1$.",
      "$(2x + 1)^2 = 4x^2 + 4x + 1$."
    ),
    tags: ["seconde", "maths", "identites", "carre_somme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cs_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_somme",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme développée de $(3x + 2)^2$ ?",
    format: "qcm",
    choices: ["$9x^2 + 12x + 4$", "$9x^2 + 4$", "$9x^2 + 6x + 4$", "$6x^2 + 12x + 4$"],
    expected: ["$9x^2 + 12x + 4$"],
    comparator: "mcq_exact",
    hint: "$a = 3x$, $b = 2$ : double produit $2 \\times 3x \\times 2$.",
    explanation: exp(
      "On applique l'identité avec $a = 3x$, $b = 2$.",
      "$(3x)^2 + 2 \\times 3x \\times 2 + 2^2$.",
      "$= 9x^2 + 12x + 4$.",
      "$(3x + 2)^2 = 9x^2 + 12x + 4$."
    ),
    tags: ["seconde", "maths", "identites", "carre_somme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cs_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_somme",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la forme développée de $(\\sqrt{3} + 1)^2$ ?",
    format: "qcm",
    choices: ["$4 + 2\\sqrt{3}$", "$3 + 2\\sqrt{3}$", "$4 + \\sqrt{3}$", "$4$"],
    expected: ["$4 + 2\\sqrt{3}$"],
    comparator: "mcq_exact",
    hint: "$(\\sqrt{3})^2 = 3$ et le double produit est $2 \\times \\sqrt{3} \\times 1$.",
    explanation: exp(
      "On applique $(a+b)^2 = a^2 + 2ab + b^2$ avec $a = \\sqrt{3}$, $b = 1$.",
      "$(\\sqrt{3})^2 + 2 \\times \\sqrt{3} \\times 1 + 1^2 = 3 + 2\\sqrt{3} + 1$.",
      "$= 4 + 2\\sqrt{3}$.",
      "$(\\sqrt{3} + 1)^2 = 4 + 2\\sqrt{3}$."
    ),
    tags: ["seconde", "maths", "identites", "carre_somme", "racine", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cs_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_somme",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la forme développée de $(1 + \\sqrt{2})^2$ ?",
    format: "qcm",
    choices: ["$3 + 2\\sqrt{2}$", "$1 + 2\\sqrt{2}$", "$3 + \\sqrt{2}$", "$2 + 2\\sqrt{2}$"],
    expected: ["$3 + 2\\sqrt{2}$"],
    comparator: "mcq_exact",
    hint: "$(\\sqrt{2})^2 = 2$.",
    explanation: exp(
      "On applique $(a+b)^2$ avec $a = 1$, $b = \\sqrt{2}$.",
      "$1^2 + 2 \\times 1 \\times \\sqrt{2} + (\\sqrt{2})^2 = 1 + 2\\sqrt{2} + 2$.",
      "$= 3 + 2\\sqrt{2}$.",
      "$(1 + \\sqrt{2})^2 = 3 + 2\\sqrt{2}$."
    ),
    tags: ["seconde", "maths", "identites", "carre_somme", "racine", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ir_cs_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_somme",
    difficulty: 3,
    theme: "neutral",
    hint: "$(x+n)^2 = x^2 + 2nx + n^2$.",
    tags: ["seconde", "maths", "identites", "carre_somme", "template"],
    generate: () => {
      const n = randomInt(2, 9);
      const correct = `$x^2 + ${2 * n}x + ${n * n}$`;
      // À $n = 2$, le carré et le double valent tous deux 4 : le piège « on a
      // recopié le double produit au lieu du carré » devenait la bonne
      // réponse. D'où le quatrième piège, gardé en réserve.
      const choices = makeChoices(correct, [
        `$x^2 + ${n * n}$`,
        `$x^2 + ${n}x + ${n * n}$`,
        `$x^2 + ${2 * n}x + ${2 * n}$`,
        `$x^2 + ${2 * n}x - ${n * n}$`,
      ]);
      return {
        text: `Quelle est la forme développée de $(x + ${n})^2$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique $(x+n)^2 = x^2 + 2nx + n^2$.",
          `Ici $n = ${n}$ : double produit $2 \\times ${n} \\times x = ${2 * n}x$.`,
          `$x^2 + ${2 * n}x + ${n * n}$.`,
          `$(x + ${n})^2 = x^2 + ${2 * n}x + ${n * n}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ir_cs_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_somme",
    difficulty: 4,
    theme: "neutral",
    hint: "$(ax+b)^2 = a^2x^2 + 2abx + b^2$.",
    tags: ["seconde", "maths", "identites", "carre_somme", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(1, 5);
      const correct = `$${a * a}x^2 + ${2 * a * b}x + ${b * b}$`;
      const choices = [
        correct,
        `$${a * a}x^2 + ${b * b}$`,
        `$${a}x^2 + ${2 * a * b}x + ${b * b}$`,
        `$${a * a}x^2 + ${a * b}x + ${b * b}$`,
      ];
      return {
        text: `Quelle est la forme développée de $(${a}x + ${b})^2$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          `On applique $(a+b)^2$ avec ici $a = ${a}x$ et $b = ${b}$.`,
          `$(${a}x)^2 + 2 \\times ${a}x \\times ${b} + ${b}^2$.`,
          `$= ${a * a}x^2 + ${2 * a * b}x + ${b * b}$.`,
          `$(${a}x + ${b})^2 = ${a * a}x^2 + ${2 * a * b}x + ${b * b}$.`
        ),
      };
    },
  },

  /* ===================== IR_CARRE_DIFFERENCE — (a-b)^2 ===================== */

  {
    kind: "fixed",
    id: "seconde_ir_cd_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_difference",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi est égal $(a - b)^2$ ?",
    format: "qcm",
    choices: ["$a^2 - 2ab + b^2$", "$a^2 - b^2$", "$a^2 + 2ab + b^2$", "$a^2 - ab + b^2$"],
    expected: ["$a^2 - 2ab + b^2$"],
    comparator: "mcq_exact",
    hint: "Même chose que $(a+b)^2$ mais le double produit est négatif.",
    explanation: exp(
      "C'est la deuxième identité remarquable.",
      "On développe $(a-b)(a-b)$.",
      "$(a-b)^2 = a^2 - 2ab + b^2$.",
      "$(a - b)^2 = a^2 - 2ab + b^2$."
    ),
    tags: ["seconde", "maths", "identites", "carre_difference", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cd_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_difference",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme développée de $(x - 3)^2$ ?",
    format: "qcm",
    choices: ["$x^2 - 6x + 9$", "$x^2 - 9$", "$x^2 - 6x - 9$", "$x^2 - 3x + 9$"],
    expected: ["$x^2 - 6x + 9$"],
    comparator: "mcq_exact",
    hint: "Attention : $(x-3)^2$ n'est PAS $x^2 - 9$.",
    explanation: exp(
      "On applique $(a-b)^2 = a^2 - 2ab + b^2$ avec $a = x$, $b = 3$.",
      "$x^2 - 2 \\times x \\times 3 + 3^2$.",
      "$= x^2 - 6x + 9$.",
      "$(x - 3)^2 = x^2 - 6x + 9$."
    ),
    tags: ["seconde", "maths", "identites", "carre_difference", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cd_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_difference",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme développée de $(x - 4)^2$ ?",
    format: "qcm",
    choices: ["$x^2 - 8x + 16$", "$x^2 - 16$", "$x^2 - 8x - 16$", "$x^2 - 4x + 16$"],
    expected: ["$x^2 - 8x + 16$"],
    comparator: "mcq_exact",
    hint: "$2 \\times x \\times 4 = 8x$.",
    explanation: exp(
      "On applique l'identité avec $a = x$, $b = 4$.",
      "$x^2 - 2 \\times x \\times 4 + 4^2$.",
      "$= x^2 - 8x + 16$.",
      "$(x - 4)^2 = x^2 - 8x + 16$."
    ),
    tags: ["seconde", "maths", "identites", "carre_difference", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cd_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_difference",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme développée de $(x - 5)^2$ ?",
    format: "qcm",
    choices: ["$x^2 - 10x + 25$", "$x^2 - 25$", "$x^2 - 10x - 25$", "$x^2 - 5x + 25$"],
    expected: ["$x^2 - 10x + 25$"],
    comparator: "mcq_exact",
    hint: "$2 \\times x \\times 5 = 10x$.",
    explanation: exp(
      "On applique l'identité avec $a = x$, $b = 5$.",
      "$x^2 - 2 \\times x \\times 5 + 5^2$.",
      "$= x^2 - 10x + 25$.",
      "$(x - 5)^2 = x^2 - 10x + 25$."
    ),
    tags: ["seconde", "maths", "identites", "carre_difference", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cd_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_difference",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme développée de $(2x - 1)^2$ ?",
    format: "qcm",
    choices: ["$4x^2 - 4x + 1$", "$4x^2 - 1$", "$2x^2 - 4x + 1$", "$4x^2 - 2x + 1$"],
    expected: ["$4x^2 - 4x + 1$"],
    comparator: "mcq_exact",
    hint: "$a = 2x$ donc $a^2 = 4x^2$.",
    explanation: exp(
      "On applique l'identité avec $a = 2x$, $b = 1$.",
      "$(2x)^2 - 2 \\times 2x \\times 1 + 1^2$.",
      "$= 4x^2 - 4x + 1$.",
      "$(2x - 1)^2 = 4x^2 - 4x + 1$."
    ),
    tags: ["seconde", "maths", "identites", "carre_difference", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cd_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_difference",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme développée de $(3x - 2)^2$ ?",
    format: "qcm",
    choices: ["$9x^2 - 12x + 4$", "$9x^2 - 4$", "$9x^2 - 6x + 4$", "$6x^2 - 12x + 4$"],
    expected: ["$9x^2 - 12x + 4$"],
    comparator: "mcq_exact",
    hint: "$a = 3x$, $b = 2$.",
    explanation: exp(
      "On applique l'identité avec $a = 3x$, $b = 2$.",
      "$(3x)^2 - 2 \\times 3x \\times 2 + 2^2$.",
      "$= 9x^2 - 12x + 4$.",
      "$(3x - 2)^2 = 9x^2 - 12x + 4$."
    ),
    tags: ["seconde", "maths", "identites", "carre_difference", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cd_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_difference",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la forme développée de $(\\sqrt{5} - 1)^2$ ?",
    format: "qcm",
    choices: ["$6 - 2\\sqrt{5}$", "$4 - 2\\sqrt{5}$", "$6 - \\sqrt{5}$", "$4$"],
    expected: ["$6 - 2\\sqrt{5}$"],
    comparator: "mcq_exact",
    hint: "$(\\sqrt{5})^2 = 5$ et double produit $2 \\times \\sqrt{5} \\times 1$.",
    explanation: exp(
      "On applique $(a-b)^2 = a^2 - 2ab + b^2$ avec $a = \\sqrt{5}$, $b = 1$.",
      "$(\\sqrt{5})^2 - 2 \\times \\sqrt{5} \\times 1 + 1^2 = 5 - 2\\sqrt{5} + 1$.",
      "$= 6 - 2\\sqrt{5}$.",
      "$(\\sqrt{5} - 1)^2 = 6 - 2\\sqrt{5}$."
    ),
    tags: ["seconde", "maths", "identites", "carre_difference", "racine", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cd_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_difference",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la forme développée de $(\\sqrt{3} - \\sqrt{2})^2$ ?",
    format: "qcm",
    choices: ["$5 - 2\\sqrt{6}$", "$1$", "$5 - \\sqrt{6}$", "$5 - 2\\sqrt{5}$"],
    expected: ["$5 - 2\\sqrt{6}$"],
    comparator: "mcq_exact",
    hint: "$(\\sqrt{3})^2 = 3$, $(\\sqrt{2})^2 = 2$, et $\\sqrt{3}\\times\\sqrt{2} = \\sqrt{6}$.",
    explanation: exp(
      "On applique $(a-b)^2$ avec $a = \\sqrt{3}$, $b = \\sqrt{2}$.",
      "$3 - 2\\sqrt{3}\\sqrt{2} + 2 = 5 - 2\\sqrt{6}$.",
      "(car $\\sqrt{3}\\times\\sqrt{2} = \\sqrt{6}$).",
      "$(\\sqrt{3} - \\sqrt{2})^2 = 5 - 2\\sqrt{6}$."
    ),
    tags: ["seconde", "maths", "identites", "carre_difference", "racine", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ir_cd_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_difference",
    difficulty: 3,
    theme: "neutral",
    hint: "$(x-n)^2 = x^2 - 2nx + n^2$.",
    tags: ["seconde", "maths", "identites", "carre_difference", "template"],
    generate: () => {
      const n = randomInt(2, 9);
      const correct = `$x^2 - ${2 * n}x + ${n * n}$`;
      const choices = [
        correct,
        `$x^2 - ${n * n}$`,
        `$x^2 - ${2 * n}x - ${n * n}$`,
        `$x^2 - ${n}x + ${n * n}$`,
      ];
      return {
        text: `Quelle est la forme développée de $(x - ${n})^2$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique $(x-n)^2 = x^2 - 2nx + n^2$.",
          `Ici $n = ${n}$ : double produit $2 \\times ${n} \\times x = ${2 * n}x$.`,
          `$x^2 - ${2 * n}x + ${n * n}$.`,
          `$(x - ${n})^2 = x^2 - ${2 * n}x + ${n * n}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ir_cd_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_difference",
    difficulty: 4,
    theme: "neutral",
    hint: "$(ax-b)^2 = a^2x^2 - 2abx + b^2$.",
    tags: ["seconde", "maths", "identites", "carre_difference", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(1, 5);
      const correct = `$${a * a}x^2 - ${2 * a * b}x + ${b * b}$`;
      const choices = [
        correct,
        `$${a * a}x^2 - ${b * b}$`,
        `$${a * a}x^2 - ${2 * a * b}x - ${b * b}$`,
        `$${a}x^2 - ${2 * a * b}x + ${b * b}$`,
      ];
      return {
        text: `Quelle est la forme développée de $(${a}x - ${b})^2$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          `On applique $(a-b)^2$ avec ici $a = ${a}x$ et $b = ${b}$.`,
          `$(${a}x)^2 - 2 \\times ${a}x \\times ${b} + ${b}^2$.`,
          `$= ${a * a}x^2 - ${2 * a * b}x + ${b * b}$.`,
          `$(${a}x - ${b})^2 = ${a * a}x^2 - ${2 * a * b}x + ${b * b}$.`
        ),
      };
    },
  },

  /* ===================== IR_DIFFERENCE_CARRES — a^2 - b^2 ===================== */

  {
    kind: "fixed",
    id: "seconde_ir_dc_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_difference_carres",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi est égal $a^2 - b^2$ ?",
    format: "qcm",
    choices: ["$(a - b)(a + b)$", "$(a - b)^2$", "$(a + b)^2$", "$(a - b)(a - b)$"],
    expected: ["$(a - b)(a + b)$"],
    comparator: "mcq_exact",
    hint: "C'est la différence de deux carrés.",
    explanation: exp(
      "C'est la troisième identité remarquable.",
      "On factorise la différence de deux carrés.",
      "$a^2 - b^2 = (a-b)(a+b)$.",
      "$a^2 - b^2 = (a - b)(a + b)$."
    ),
    tags: ["seconde", "maths", "identites", "difference_carres", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_dc_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_difference_carres",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme développée de $(x - 2)(x + 2)$ ?",
    format: "qcm",
    choices: ["$x^2 - 4$", "$x^2 + 4$", "$x^2 - 4x + 4$", "$x^2 - 2x - 4$"],
    expected: ["$x^2 - 4$"],
    comparator: "mcq_exact",
    hint: "$(a-b)(a+b) = a^2 - b^2$.",
    explanation: exp(
      "On reconnaît une identité remarquable.",
      "$(x-2)(x+2) = x^2 - 2^2$.",
      "$= x^2 - 4$.",
      "$(x - 2)(x + 2) = x^2 - 4$."
    ),
    tags: ["seconde", "maths", "identites", "difference_carres", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_dc_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_difference_carres",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme développée de $(x - 5)(x + 5)$ ?",
    format: "qcm",
    choices: ["$x^2 - 25$", "$x^2 + 25$", "$x^2 - 10x + 25$", "$x^2 - 5$"],
    expected: ["$x^2 - 25$"],
    comparator: "mcq_exact",
    hint: "$(a-b)(a+b) = a^2 - b^2$.",
    explanation: exp(
      "On applique $a^2 - b^2$ avec $a = x$, $b = 5$.",
      "$(x-5)(x+5) = x^2 - 5^2$.",
      "$= x^2 - 25$.",
      "$(x - 5)(x + 5) = x^2 - 25$."
    ),
    tags: ["seconde", "maths", "identites", "difference_carres", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_dc_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_difference_carres",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme développée de $(2x - 3)(2x + 3)$ ?",
    format: "qcm",
    choices: ["$4x^2 - 9$", "$4x^2 + 9$", "$2x^2 - 9$", "$4x^2 - 12x + 9$"],
    expected: ["$4x^2 - 9$"],
    comparator: "mcq_exact",
    hint: "$a = 2x$ donc $a^2 = 4x^2$.",
    explanation: exp(
      "On applique $a^2 - b^2$ avec $a = 2x$, $b = 3$.",
      "$(2x-3)(2x+3) = (2x)^2 - 3^2$.",
      "$= 4x^2 - 9$.",
      "$(2x - 3)(2x + 3) = 4x^2 - 9$."
    ),
    tags: ["seconde", "maths", "identites", "difference_carres", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_dc_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_difference_carres",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme développée de $(3x - 1)(3x + 1)$ ?",
    format: "qcm",
    choices: ["$9x^2 - 1$", "$9x^2 + 1$", "$3x^2 - 1$", "$9x^2 - 6x + 1$"],
    expected: ["$9x^2 - 1$"],
    comparator: "mcq_exact",
    hint: "$a = 3x$, $b = 1$.",
    explanation: exp(
      "On applique $a^2 - b^2$ avec $a = 3x$, $b = 1$.",
      "$(3x-1)(3x+1) = (3x)^2 - 1^2$.",
      "$= 9x^2 - 1$.",
      "$(3x - 1)(3x + 1) = 9x^2 - 1$."
    ),
    tags: ["seconde", "maths", "identites", "difference_carres", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_dc_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_difference_carres",
    difficulty: 5,
    theme: "neutral",
    text: "Combien vaut $(\\sqrt{5} - \\sqrt{2})(\\sqrt{5} + \\sqrt{2})$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$(a-b)(a+b) = a^2 - b^2$ avec $a = \\sqrt{5}$, $b = \\sqrt{2}$.",
    explanation: exp(
      "On reconnaît $a^2 - b^2$ avec $a = \\sqrt{5}$, $b = \\sqrt{2}$.",
      "$(\\sqrt{5})^2 - (\\sqrt{2})^2 = 5 - 2$.",
      "$= 3$.",
      "$(\\sqrt{5} - \\sqrt{2})(\\sqrt{5} + \\sqrt{2}) = 3$."
    ),
    tags: ["seconde", "maths", "identites", "difference_carres", "racine", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_dc_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_difference_carres",
    difficulty: 5,
    theme: "neutral",
    text: "Combien vaut $(2 + \\sqrt{3})(2 - \\sqrt{3})$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$(a+b)(a-b) = a^2 - b^2$ avec $a = 2$, $b = \\sqrt{3}$.",
    explanation: exp(
      "On reconnaît $a^2 - b^2$ avec $a = 2$, $b = \\sqrt{3}$.",
      "$2^2 - (\\sqrt{3})^2 = 4 - 3$.",
      "$= 1$.",
      "$(2 + \\sqrt{3})(2 - \\sqrt{3}) = 1$."
    ),
    tags: ["seconde", "maths", "identites", "difference_carres", "racine", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_dc_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_difference_carres",
    difficulty: 5,
    theme: "neutral",
    text: "Combien vaut $(\\sqrt{7} - 1)(\\sqrt{7} + 1)$ ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "$a = \\sqrt{7}$, $b = 1$.",
    explanation: exp(
      "On reconnaît $a^2 - b^2$ avec $a = \\sqrt{7}$, $b = 1$.",
      "$(\\sqrt{7})^2 - 1^2 = 7 - 1$.",
      "$= 6$.",
      "$(\\sqrt{7} - 1)(\\sqrt{7} + 1) = 6$."
    ),
    tags: ["seconde", "maths", "identites", "difference_carres", "racine", "short"],
  },

  {
    kind: "template",
    id: "seconde_ir_dc_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_difference_carres",
    difficulty: 3,
    theme: "neutral",
    hint: "$(x-n)(x+n) = x^2 - n^2$.",
    tags: ["seconde", "maths", "identites", "difference_carres", "template"],
    generate: () => {
      const n = randomInt(2, 9);
      const correct = `$x^2 - ${n * n}$`;
      const choices = [
        correct,
        `$x^2 + ${n * n}$`,
        `$x^2 - ${2 * n}x + ${n * n}$`,
        `$x^2 - ${n}$`,
      ];
      return {
        text: `Quelle est la forme développée de $(x - ${n})(x + ${n})$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique $(x-n)(x+n) = x^2 - n^2$.",
          `Ici $n = ${n}$, donc $n^2 = ${n * n}$.`,
          `$x^2 - ${n * n}$.`,
          `$(x - ${n})(x + ${n}) = x^2 - ${n * n}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ir_dc_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_difference_carres",
    difficulty: 5,
    theme: "neutral",
    hint: "$(\\sqrt{a} - \\sqrt{b})(\\sqrt{a} + \\sqrt{b}) = a - b$.",
    tags: ["seconde", "maths", "identites", "difference_carres", "racine", "template"],
    generate: () => {
      const b = randomInt(2, 5);
      const a = b + randomInt(1, 5);
      const correct = String(a - b);
      const choices = [correct, String(a + b), String(a * b), String(a)];
      return {
        text: `Combien vaut $(\\sqrt{${a}} - \\sqrt{${b}})(\\sqrt{${a}} + \\sqrt{${b}})$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          `On reconnaît $a^2 - b^2$ avec $a = \\sqrt{${a}}$, $b = \\sqrt{${b}}$.`,
          `$(\\sqrt{${a}})^2 - (\\sqrt{${b}})^2 = ${a} - ${b}$.`,
          `$= ${a - b}$.`,
          `Le résultat est $${a - b}$.`
        ),
      };
    },
  },

  /* ===================== IR_CALCUL_MENTAL ===================== */

  {
    kind: "fixed",
    id: "seconde_ir_cm_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_calcul_mental",
    difficulty: 3,
    theme: "neutral",
    text: "En utilisant une identité remarquable, combien vaut $101^2$ ?",
    format: "short",
    expected: ["10201"],
    comparator: "number_equal",
    hint: "$101 = 100 + 1$, donc $101^2 = (100 + 1)^2$.",
    explanation: exp(
      "On écrit $101 = 100 + 1$ pour utiliser $(a+b)^2$.",
      "$(100+1)^2 = 100^2 + 2 \\times 100 \\times 1 + 1^2$.",
      "$= 10000 + 200 + 1 = 10201$.",
      "$101^2 = 10201$."
    ),
    tags: ["seconde", "maths", "identites", "calcul_mental", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cm_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_calcul_mental",
    difficulty: 3,
    theme: "neutral",
    text: "En utilisant une identité remarquable, combien vaut $99^2$ ?",
    format: "short",
    expected: ["9801"],
    comparator: "number_equal",
    hint: "$99 = 100 - 1$, donc $99^2 = (100 - 1)^2$.",
    explanation: exp(
      "On écrit $99 = 100 - 1$ pour utiliser $(a-b)^2$.",
      "$(100-1)^2 = 100^2 - 2 \\times 100 + 1$.",
      "$= 10000 - 200 + 1 = 9801$.",
      "$99^2 = 9801$."
    ),
    tags: ["seconde", "maths", "identites", "calcul_mental", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cm_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_calcul_mental",
    difficulty: 4,
    theme: "neutral",
    text: "En utilisant une identité remarquable, combien vaut $51 \\times 49$ ?",
    format: "short",
    expected: ["2499"],
    comparator: "number_equal",
    hint: "$51 \\times 49 = (50 + 1)(50 - 1)$.",
    explanation: exp(
      "On reconnaît $(a+b)(a-b) = a^2 - b^2$.",
      "$(50+1)(50-1) = 50^2 - 1^2$.",
      "$= 2500 - 1 = 2499$.",
      "$51 \\times 49 = 2499$."
    ),
    tags: ["seconde", "maths", "identites", "calcul_mental", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cm_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_calcul_mental",
    difficulty: 3,
    theme: "neutral",
    text: "En utilisant une identité remarquable, combien vaut $21^2$ ?",
    format: "short",
    expected: ["441"],
    comparator: "number_equal",
    hint: "$21 = 20 + 1$.",
    explanation: exp(
      "On écrit $21 = 20 + 1$.",
      "$(20+1)^2 = 400 + 40 + 1$.",
      "$= 441$.",
      "$21^2 = 441$."
    ),
    tags: ["seconde", "maths", "identites", "calcul_mental", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cm_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_calcul_mental",
    difficulty: 4,
    theme: "neutral",
    text: "En utilisant une identité remarquable, combien vaut $102^2$ ?",
    format: "short",
    expected: ["10404"],
    comparator: "number_equal",
    hint: "$102 = 100 + 2$.",
    explanation: exp(
      "On écrit $102 = 100 + 2$.",
      "$(100+2)^2 = 10000 + 400 + 4$.",
      "$= 10404$.",
      "$102^2 = 10404$."
    ),
    tags: ["seconde", "maths", "identites", "calcul_mental", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cm_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_calcul_mental",
    difficulty: 4,
    theme: "neutral",
    text: "En utilisant une identité remarquable, combien vaut $103 \\times 97$ ?",
    format: "short",
    expected: ["9991"],
    comparator: "number_equal",
    hint: "$103 \\times 97 = (100 + 3)(100 - 3)$.",
    explanation: exp(
      "On reconnaît $(a+b)(a-b) = a^2 - b^2$.",
      "$(100+3)(100-3) = 100^2 - 3^2$.",
      "$= 10000 - 9 = 9991$.",
      "$103 \\times 97 = 9991$."
    ),
    tags: ["seconde", "maths", "identites", "calcul_mental", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_cm_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_calcul_mental",
    difficulty: 4,
    theme: "neutral",
    text: "En utilisant une identité remarquable, combien vaut $98^2$ ?",
    format: "short",
    expected: ["9604"],
    comparator: "number_equal",
    hint: "$98 = 100 - 2$.",
    explanation: exp(
      "On écrit $98 = 100 - 2$.",
      "$(100-2)^2 = 10000 - 400 + 4$.",
      "$= 9604$.",
      "$98^2 = 9604$."
    ),
    tags: ["seconde", "maths", "identites", "calcul_mental", "short"],
  },

  {
    kind: "template",
    id: "seconde_ir_cm_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_calcul_mental",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris le nombre comme (n - 1)(n + 1) = n^2 - 1.",
    tags: ["seconde", "maths", "identites", "calcul_mental", "template"],
    generate: () => {
      const n = randomInt(11, 40);
      const valeur = n * n - 1;
      return {
        text: `En utilisant une identité remarquable, combien vaut $${n - 1} \\times ${n + 1}$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "On reconnaît $(n-1)(n+1) = n^2 - 1$.",
          `Ici $n = ${n}$, donc $${n - 1} \\times ${n + 1} = ${n}^2 - 1$.`,
          `$= ${n * n} - 1 = ${valeur}$.`,
          `$${n - 1} \\times ${n + 1} = ${valeur}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ir_cm_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_calcul_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris le nombre comme (20 + c) ou (20 - c).",
    tags: ["seconde", "maths", "identites", "calcul_mental", "template"],
    generate: () => {
      const c = randomInt(1, 3);
      const base = 20;
      const n = base + c;
      const valeur = n * n;
      return {
        text: `En utilisant une identité remarquable, combien vaut $${n}^2$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "On décompose le nombre pour utiliser $(a+b)^2$.",
          `$${n} = ${base} + ${c}$, donc $${n}^2 = (${base} + ${c})^2$.`,
          `$= ${base * base} + ${2 * base * c} + ${c * c} = ${valeur}$.`,
          `$${n}^2 = ${valeur}$.`
        ),
      };
    },
  },

  /* ===================== IR_APPLICATION ===================== */

  {
    kind: "fixed",
    id: "seconde_ir_app_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_application",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle identité permet de factoriser $x^2 - 2x + 1$ ?",
    format: "qcm",
    choices: ["$(a-b)^2$, ici $(x-1)^2$", "$(a+b)^2$, ici $(x+1)^2$", "$a^2 - b^2$", "Aucune"],
    expected: ["$(a-b)^2$, ici $(x-1)^2$"],
    comparator: "mcq_exact",
    hint: "Le terme central est négatif : $-2x$.",
    explanation: exp(
      "On reconnaît $a^2 - 2ab + b^2 = (a-b)^2$.",
      "$x^2 - 2x + 1 = x^2 - 2\\times x \\times 1 + 1^2$.",
      "$= (x - 1)^2$.",
      "On utilise $(a-b)^2$ : $x^2 - 2x + 1 = (x-1)^2$."
    ),
    tags: ["seconde", "maths", "identites", "application", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_app_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_application",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle identité permet de factoriser $x^2 - 16$ ?",
    format: "qcm",
    choices: ["$a^2 - b^2$, ici $(x-4)(x+4)$", "$(a-b)^2$, ici $(x-4)^2$", "$(a+b)^2$", "Aucune"],
    expected: ["$a^2 - b^2$, ici $(x-4)(x+4)$"],
    comparator: "mcq_exact",
    hint: "C'est une différence de carrés.",
    explanation: exp(
      "On reconnaît $a^2 - b^2 = (a-b)(a+b)$.",
      "$x^2 - 16 = x^2 - 4^2$.",
      "$= (x-4)(x+4)$.",
      "On utilise $a^2 - b^2$ : $x^2 - 16 = (x-4)(x+4)$."
    ),
    tags: ["seconde", "maths", "identites", "application", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_app_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_application",
    difficulty: 3,
    theme: "neutral",
    text: "Factorise $x^2 + 8x + 16$.",
    format: "qcm",
    choices: ["$(x + 4)^2$", "$(x - 4)^2$", "$(x + 4)(x - 4)$", "$(x + 8)^2$"],
    expected: ["$(x + 4)^2$"],
    comparator: "mcq_exact",
    hint: "$16 = 4^2$ et $8x = 2 \\times 4 \\times x$.",
    explanation: exp(
      "On reconnaît $a^2 + 2ab + b^2 = (a+b)^2$.",
      "$x^2 + 8x + 16 = x^2 + 2\\times x \\times 4 + 4^2$.",
      "$= (x + 4)^2$.",
      "$x^2 + 8x + 16 = (x + 4)^2$."
    ),
    tags: ["seconde", "maths", "identites", "application", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_app_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_application",
    difficulty: 4,
    theme: "neutral",
    text: "Factorise $x^2 - 6x + 9$.",
    format: "qcm",
    choices: ["$(x - 3)^2$", "$(x + 3)^2$", "$(x - 3)(x + 3)$", "$(x - 9)^2$"],
    expected: ["$(x - 3)^2$"],
    comparator: "mcq_exact",
    hint: "$9 = 3^2$ et $6x = 2 \\times 3 \\times x$.",
    explanation: exp(
      "On reconnaît $a^2 - 2ab + b^2 = (a-b)^2$.",
      "$x^2 - 6x + 9 = x^2 - 2\\times x \\times 3 + 3^2$.",
      "$= (x - 3)^2$.",
      "$x^2 - 6x + 9 = (x - 3)^2$."
    ),
    tags: ["seconde", "maths", "identites", "application", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_app_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_application",
    difficulty: 4,
    theme: "neutral",
    text: "Factorise $4x^2 - 9$.",
    format: "qcm",
    choices: ["$(2x - 3)(2x + 3)$", "$(2x - 3)^2$", "$(4x - 3)(x + 3)$", "$(2x + 3)^2$"],
    expected: ["$(2x - 3)(2x + 3)$"],
    comparator: "mcq_exact",
    hint: "$4x^2 = (2x)^2$ et $9 = 3^2$.",
    explanation: exp(
      "On reconnaît $a^2 - b^2$ avec $a = 2x$, $b = 3$.",
      "$4x^2 - 9 = (2x)^2 - 3^2$.",
      "$= (2x - 3)(2x + 3)$.",
      "$4x^2 - 9 = (2x - 3)(2x + 3)$."
    ),
    tags: ["seconde", "maths", "identites", "application", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_app_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_application",
    difficulty: 4,
    theme: "neutral",
    text: "Développe et réduis $(x + 2)^2 - (x - 2)^2$.",
    format: "qcm",
    choices: ["$8x$", "$0$", "$4x$", "$8$"],
    expected: ["$8x$"],
    comparator: "mcq_exact",
    hint: "Développe chaque carré, puis soustrais.",
    explanation: exp(
      "On développe les deux carrés.",
      "$(x+2)^2 = x^2 + 4x + 4$ et $(x-2)^2 = x^2 - 4x + 4$.",
      "$(x^2 + 4x + 4) - (x^2 - 4x + 4) = 8x$.",
      "$(x + 2)^2 - (x - 2)^2 = 8x$."
    ),
    tags: ["seconde", "maths", "identites", "application", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_app_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_application",
    difficulty: 5,
    theme: "neutral",
    text: "Combien vaut $(\\sqrt{2} + 1)(\\sqrt{2} - 1)$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$a^2 - b^2$ avec $a = \\sqrt{2}$, $b = 1$.",
    explanation: exp(
      "On reconnaît $a^2 - b^2$ avec $a = \\sqrt{2}$, $b = 1$.",
      "$(\\sqrt{2})^2 - 1^2 = 2 - 1$.",
      "$= 1$.",
      "$(\\sqrt{2} + 1)(\\sqrt{2} - 1) = 1$."
    ),
    tags: ["seconde", "maths", "identites", "application", "racine", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ir_app_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_application",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la forme développée de $(\\sqrt{3} + \\sqrt{2})^2$ ?",
    format: "qcm",
    choices: ["$5 + 2\\sqrt{6}$", "$5$", "$5 + \\sqrt{6}$", "$1 + 2\\sqrt{6}$"],
    expected: ["$5 + 2\\sqrt{6}$"],
    comparator: "mcq_exact",
    hint: "$\\sqrt{3}\\times\\sqrt{2} = \\sqrt{6}$.",
    explanation: exp(
      "On applique $(a+b)^2$ avec $a = \\sqrt{3}$, $b = \\sqrt{2}$.",
      "$3 + 2\\sqrt{3}\\sqrt{2} + 2 = 5 + 2\\sqrt{6}$.",
      "(car $\\sqrt{3}\\times\\sqrt{2} = \\sqrt{6}$).",
      "$(\\sqrt{3} + \\sqrt{2})^2 = 5 + 2\\sqrt{6}$."
    ),
    tags: ["seconde", "maths", "identites", "application", "racine", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ir_app_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_application",
    difficulty: 3,
    theme: "neutral",
    hint: "Différence de carrés : $x^2 - n^2 = (x-n)(x+n)$.",
    tags: ["seconde", "maths", "identites", "application", "template"],
    generate: () => {
      const n = randomInt(2, 9);
      const correct = `$(x - ${n})(x + ${n})$`;
      const choices = [
        correct,
        `$(x - ${n})^2$`,
        `$(x + ${n})^2$`,
        `$(x - ${n * n})(x + 1)$`,
      ];
      return {
        text: `Factorise $x^2 - ${n * n}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On reconnaît une différence de carrés.",
          `$x^2 - ${n * n} = x^2 - ${n}^2$.`,
          `$= (x - ${n})(x + ${n})$.`,
          `$x^2 - ${n * n} = (x - ${n})(x + ${n})$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ir_app_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "identites_remarquables_2de",
    microId: "ir_application",
    difficulty: 4,
    theme: "neutral",
    hint: "Carré parfait : $x^2 + 2nx + n^2 = (x+n)^2$.",
    tags: ["seconde", "maths", "identites", "application", "template"],
    generate: () => {
      const n = randomInt(2, 8);
      const correct = `$(x + ${n})^2$`;
      const choices = [
        correct,
        `$(x - ${n})^2$`,
        `$(x + ${n})(x - ${n})$`,
        `$(x + ${2 * n})^2$`,
      ];
      return {
        text: `Factorise $x^2 + ${2 * n}x + ${n * n}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On reconnaît un carré parfait $a^2 + 2ab + b^2 = (a+b)^2$.",
          `$x^2 + ${2 * n}x + ${n * n} = x^2 + 2\\times x \\times ${n} + ${n}^2$.`,
          `$= (x + ${n})^2$.`,
          `$x^2 + ${2 * n}x + ${n * n} = (x + ${n})^2$.`
        ),
      };
    },
  },
];
