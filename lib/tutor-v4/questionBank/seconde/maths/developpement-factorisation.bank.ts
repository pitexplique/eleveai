// lib/tutor-v4/questionBank/seconde/maths/developpement-factorisation.bank.ts
//
// Chapitre : Developpement et factorisation (notion developpement_factorisation_2de)
// microSkills (>= 10 items chacun, difficultes etalees 1->5, templates pour la variete) :
//   devfac_developper_simple    — Developper k(a+b)
//   devfac_developper_double    — Developper (a+b)(c+d)
//   devfac_facteur_commun       — Factoriser par un facteur commun
//   devfac_factoriser_identite  — Factoriser a l'aide d'une identite remarquable
//   devfac_choisir_forme        — Choisir la forme la plus adaptee
//
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

// Met en forme "+ c" ou "- c" pour un second terme.
function termeConst(c: number): string {
  if (c >= 0) return `+ ${c}`;
  return `- ${-c}`;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const developpementFactorisationBank: TutorBankItemV4[] = [
  /* ===================== DEVFAC_DEVELOPPER_SIMPLE — k(a+b) ===================== */

  {
    kind: "fixed",
    id: "seconde_devsimple_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_simple",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la forme développée de $2(x + 3)$ ?",
    format: "qcm",
    choices: ["$2x + 6$", "$2x + 3$", "$x + 6$", "$2x + 5$"],
    expected: ["$2x + 6$"],
    comparator: "mcq_exact",
    hint: "On distribue le $2$ sur chaque terme de la parenthèse.",
    explanation: exp(
      "Développer, c'est distribuer le facteur sur chaque terme : $k(a+b) = ka + kb$.",
      "On multiplie $x$ puis $3$ par $2$.",
      "$2 \\times x + 2 \\times 3 = 2x + 6$.",
      "$2(x + 3) = 2x + 6$."
    ),
    tags: ["seconde", "maths", "developpement", "simple", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_devsimple_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_simple",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la forme développée de $3(x - 4)$ ?",
    format: "qcm",
    choices: ["$3x - 12$", "$3x - 4$", "$3x + 12$", "$x - 12$"],
    expected: ["$3x - 12$"],
    comparator: "mcq_exact",
    hint: "On distribue le $3$ ; attention au signe.",
    explanation: exp(
      "On applique $k(a-b) = ka - kb$.",
      "On multiplie $x$ puis $-4$ par $3$.",
      "$3 \\times x - 3 \\times 4 = 3x - 12$.",
      "$3(x - 4) = 3x - 12$."
    ),
    tags: ["seconde", "maths", "developpement", "simple", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_devsimple_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme développée de $x(x + 5)$ ?",
    format: "qcm",
    choices: ["$x^2 + 5x$", "$x^2 + 5$", "$2x + 5$", "$x^2 + 5x^2$"],
    expected: ["$x^2 + 5x$"],
    comparator: "mcq_exact",
    hint: "$x \\times x = x^2$.",
    explanation: exp(
      "On distribue $x$ sur chaque terme.",
      "$x \\times x + x \\times 5$.",
      "$= x^2 + 5x$.",
      "$x(x + 5) = x^2 + 5x$."
    ),
    tags: ["seconde", "maths", "developpement", "simple", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_devsimple_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme développée de $-2(x - 3)$ ?",
    format: "qcm",
    choices: ["$-2x + 6$", "$-2x - 6$", "$2x - 6$", "$-2x + 3$"],
    expected: ["$-2x + 6$"],
    comparator: "mcq_exact",
    hint: "Un facteur négatif change les deux signes.",
    explanation: exp(
      "On distribue $-2$ en respectant les règles de signes.",
      "$-2 \\times x + (-2) \\times (-3)$.",
      "$= -2x + 6$.",
      "$-2(x - 3) = -2x + 6$."
    ),
    tags: ["seconde", "maths", "developpement", "simple", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_devsimple_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme développée de $5(2x + 3)$ ?",
    format: "qcm",
    choices: ["$10x + 15$", "$10x + 3$", "$7x + 15$", "$10x + 8$"],
    expected: ["$10x + 15$"],
    comparator: "mcq_exact",
    hint: "$5 \\times 2x = 10x$.",
    explanation: exp(
      "On distribue $5$ sur chaque terme.",
      "$5 \\times 2x + 5 \\times 3$.",
      "$= 10x + 15$.",
      "$5(2x + 3) = 10x + 15$."
    ),
    tags: ["seconde", "maths", "developpement", "simple", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_devsimple_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_simple",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme développée de $-3(2x - 1)$ ?",
    format: "qcm",
    choices: ["$-6x + 3$", "$-6x - 3$", "$6x - 3$", "$-6x + 1$"],
    expected: ["$-6x + 3$"],
    comparator: "mcq_exact",
    hint: "Attention aux signes avec le facteur $-3$.",
    explanation: exp(
      "On distribue $-3$ en respectant les signes.",
      "$-3 \\times 2x + (-3) \\times (-1)$.",
      "$= -6x + 3$.",
      "$-3(2x - 1) = -6x + 3$."
    ),
    tags: ["seconde", "maths", "developpement", "simple", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_devsimple_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_simple",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme développée de $2x(3x + 4)$ ?",
    format: "qcm",
    choices: ["$6x^2 + 8x$", "$6x^2 + 4$", "$5x^2 + 8x$", "$6x + 8x$"],
    expected: ["$6x^2 + 8x$"],
    comparator: "mcq_exact",
    hint: "$2x \\times 3x = 6x^2$.",
    explanation: exp(
      "On distribue $2x$ sur chaque terme.",
      "$2x \\times 3x + 2x \\times 4$.",
      "$= 6x^2 + 8x$.",
      "$2x(3x + 4) = 6x^2 + 8x$."
    ),
    tags: ["seconde", "maths", "developpement", "simple", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_devsimple_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_simple",
    difficulty: 4,
    theme: "neutral",
    text: "Développe et réduis $2(x + 1) + 3(x - 2)$.",
    format: "qcm",
    choices: ["$5x - 4$", "$5x + 4$", "$5x - 1$", "$6x - 4$"],
    expected: ["$5x - 4$"],
    comparator: "mcq_exact",
    hint: "Développe chaque parenthèse, puis regroupe les termes.",
    explanation: exp(
      "On développe puis on regroupe les termes semblables.",
      "$2(x+1) = 2x + 2$ et $3(x-2) = 3x - 6$.",
      "$2x + 2 + 3x - 6 = 5x - 4$.",
      "$2(x + 1) + 3(x - 2) = 5x - 4$."
    ),
    tags: ["seconde", "maths", "developpement", "simple", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_devsimple_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "On distribue le facteur sur chaque terme.",
    tags: ["seconde", "maths", "developpement", "simple", "template"],
    generate: () => {
      const k = randomInt(2, 6);
      const a = randomInt(2, 5);
      const b = randomInt(1, 9);
      const correct = `$${k * a}x + ${k * b}$`;
      // À $k = b = 2$, le produit et la somme valent tous deux 4 : le piège « on
      // a additionné au lieu de multiplier » devenait la bonne réponse.
      const choices = makeChoices(correct, [
        `$${k * a}x + ${b}$`,
        `$${a}x + ${k * b}$`,
        `$${k * a}x + ${k + b}$`,
        `$${k * a}x + ${k * b + 1}$`,
      ]);
      return {
        text: `Quelle est la forme développée de $${k}(${a}x + ${b})$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On distribue le facteur sur chaque terme : $k(ax+b) = kax + kb$.",
          `On multiplie $${a}x$ puis $${b}$ par $${k}$.`,
          `$${k} \\times ${a}x + ${k} \\times ${b} = ${k * a}x + ${k * b}$.`,
          `$${k}(${a}x + ${b}) = ${k * a}x + ${k * b}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_devsimple_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "$x \\times x = x^2$.",
    tags: ["seconde", "maths", "developpement", "simple", "template"],
    generate: () => {
      const b = randomInt(2, 9);
      const correct = `$x^2 + ${b}x$`;
      const choices = [correct, `$x^2 + ${b}$`, `$2x + ${b}$`, `$x^2 ${b}x$`];
      return {
        text: `Quelle est la forme développée de $x(x + ${b})$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On distribue $x$ sur chaque terme.",
          `$x \\times x + x \\times ${b}$.`,
          `$= x^2 + ${b}x$.`,
          `$x(x + ${b}) = x^2 + ${b}x$.`
        ),
      };
    },
  },

  /* ===================== DEVFAC_DEVELOPPER_DOUBLE — (a+b)(c+d) ===================== */

  {
    kind: "fixed",
    id: "seconde_devdouble_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_double",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme développée de $(x + 2)(x + 3)$ ?",
    format: "qcm",
    choices: ["$x^2 + 5x + 6$", "$x^2 + 6x + 5$", "$x^2 + 6$", "$x^2 + 5x + 5$"],
    expected: ["$x^2 + 5x + 6$"],
    comparator: "mcq_exact",
    hint: "Chaque terme de la 1re parenthèse multiplie chaque terme de la 2e.",
    explanation: exp(
      "On développe : $(a+b)(c+d) = ac + ad + bc + bd$.",
      "$x \\times x + x \\times 3 + 2 \\times x + 2 \\times 3$.",
      "$= x^2 + 3x + 2x + 6 = x^2 + 5x + 6$.",
      "$(x + 2)(x + 3) = x^2 + 5x + 6$."
    ),
    tags: ["seconde", "maths", "developpement", "double", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_devdouble_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_double",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme développée de $(x - 1)(x + 4)$ ?",
    format: "qcm",
    choices: ["$x^2 + 3x - 4$", "$x^2 - 3x - 4$", "$x^2 + 3x + 4$", "$x^2 + 4x - 1$"],
    expected: ["$x^2 + 3x - 4$"],
    comparator: "mcq_exact",
    hint: "Attention aux signes.",
    explanation: exp(
      "On développe terme à terme.",
      "$x \\times x + x \\times 4 - 1 \\times x - 1 \\times 4$.",
      "$= x^2 + 4x - x - 4 = x^2 + 3x - 4$.",
      "$(x - 1)(x + 4) = x^2 + 3x - 4$."
    ),
    tags: ["seconde", "maths", "developpement", "double", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_devdouble_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_double",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme développée de $(x - 3)(x - 5)$ ?",
    format: "qcm",
    choices: ["$x^2 - 8x + 15$", "$x^2 + 8x + 15$", "$x^2 - 8x - 15$", "$x^2 - 15x + 8$"],
    expected: ["$x^2 - 8x + 15$"],
    comparator: "mcq_exact",
    hint: "Le produit de deux négatifs est positif.",
    explanation: exp(
      "On développe terme à terme.",
      "$x \\times x - 5x - 3x + (-3)(-5)$.",
      "$= x^2 - 8x + 15$.",
      "$(x - 3)(x - 5) = x^2 - 8x + 15$."
    ),
    tags: ["seconde", "maths", "developpement", "double", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_devdouble_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_double",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme développée de $(2x + 1)(x - 3)$ ?",
    format: "qcm",
    choices: ["$2x^2 - 5x - 3$", "$2x^2 + 5x - 3$", "$2x^2 - 5x + 3$", "$2x^2 - 6x - 3$"],
    expected: ["$2x^2 - 5x - 3$"],
    comparator: "mcq_exact",
    hint: "$2x \\times x = 2x^2$.",
    explanation: exp(
      "On développe terme à terme.",
      "$2x \\times x - 2x \\times 3 + 1 \\times x - 1 \\times 3$.",
      "$= 2x^2 - 6x + x - 3 = 2x^2 - 5x - 3$.",
      "$(2x + 1)(x - 3) = 2x^2 - 5x - 3$."
    ),
    tags: ["seconde", "maths", "developpement", "double", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_devdouble_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_double",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme développée de $(2x - 1)(3x + 2)$ ?",
    format: "qcm",
    choices: ["$6x^2 + x - 2$", "$6x^2 - x - 2$", "$6x^2 + x + 2$", "$5x^2 + x - 2$"],
    expected: ["$6x^2 + x - 2$"],
    comparator: "mcq_exact",
    hint: "$2x \\times 3x = 6x^2$ ; somme des termes en $x$ : $4x - 3x$.",
    explanation: exp(
      "On développe terme à terme.",
      "$2x \\times 3x + 2x \\times 2 - 1 \\times 3x - 1 \\times 2$.",
      "$= 6x^2 + 4x - 3x - 2 = 6x^2 + x - 2$.",
      "$(2x - 1)(3x + 2) = 6x^2 + x - 2$."
    ),
    tags: ["seconde", "maths", "developpement", "double", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_devdouble_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_double",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme développée de $(x + 1)(2x + 3)$ ?",
    format: "qcm",
    choices: ["$2x^2 + 5x + 3$", "$2x^2 + 3x + 3$", "$2x^2 + 5x + 1$", "$3x^2 + 5x + 3$"],
    expected: ["$2x^2 + 5x + 3$"],
    comparator: "mcq_exact",
    hint: "Somme des termes en $x$ : $3x + 2x$.",
    explanation: exp(
      "On développe terme à terme.",
      "$x \\times 2x + x \\times 3 + 1 \\times 2x + 1 \\times 3$.",
      "$= 2x^2 + 3x + 2x + 3 = 2x^2 + 5x + 3$.",
      "$(x + 1)(2x + 3) = 2x^2 + 5x + 3$."
    ),
    tags: ["seconde", "maths", "developpement", "double", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_devdouble_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_double",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme développée de $(x + 5)(x - 2)$ ?",
    format: "qcm",
    choices: ["$x^2 + 3x - 10$", "$x^2 - 3x - 10$", "$x^2 + 3x + 10$", "$x^2 + 7x - 10$"],
    expected: ["$x^2 + 3x - 10$"],
    comparator: "mcq_exact",
    hint: "Termes en $x$ : $-2x + 5x$.",
    explanation: exp(
      "On développe terme à terme.",
      "$x^2 - 2x + 5x - 10$.",
      "$= x^2 + 3x - 10$.",
      "$(x + 5)(x - 2) = x^2 + 3x - 10$."
    ),
    tags: ["seconde", "maths", "developpement", "double", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_devdouble_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_double",
    difficulty: 3,
    theme: "neutral",
    hint: "$(x+a)(x+b) = x^2 + (a+b)x + ab$.",
    tags: ["seconde", "maths", "developpement", "double", "template"],
    generate: () => {
      const a = randomInt(1, 6);
      // $2$ et $2$ sont le seul couple dont la somme égale le produit : les
      // trois premières propositions s'écrivaient alors à l'identique.
      let b = randomInt(1, 6);
      while (a === 2 && b === 2) b = randomInt(1, 6);
      const s = a + b;
      const p = a * b;
      const correct = `$x^2 + ${s}x + ${p}$`;
      const choices = makeChoices(correct, [
        `$x^2 + ${p}x + ${s}$`,
        `$x^2 + ${s}x + ${s}$`,
        `$x^2 + ${p}$`,
      ]);
      return {
        text: `Quelle est la forme développée de $(x + ${a})(x + ${b})$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise $(x+a)(x+b) = x^2 + (a+b)x + ab$.",
          `Ici $a = ${a}$ et $b = ${b}$, donc $a+b = ${s}$ et $ab = ${p}$.`,
          `$x^2 + ${s}x + ${p}$.`,
          `$(x + ${a})(x + ${b}) = x^2 + ${s}x + ${p}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_devdouble_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_developper_double",
    difficulty: 4,
    theme: "neutral",
    hint: "$(x+a)(x-b) = x^2 + (a-b)x - ab$.",
    tags: ["seconde", "maths", "developpement", "double", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      // À $a = b$, le terme en $x$ disparaît et « on a oublié le terme du
      // milieu » s'écrit exactement comme la bonne réponse.
      const b = shuffle([2, 3, 4, 5, 6].filter((v) => v !== a))[0];
      const s = a - b;
      const p = a * b;
      const sx = ` ${termeConst(s)}x`;
      const bonne = `$x^2${sx} - ${p}$`;
      const choices = makeChoices(bonne, [
        `$x^2${sx} + ${p}$`,
        `$x^2 ${termeConst(a - b + 1)}x - ${p}$`,
        `$x^2 - ${p}$`,
      ]);
      return {
        text: `Quelle est la forme développée de $(x + ${a})(x - ${b})$ ?`,
        format: "qcm",
        choices,
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise $(x+a)(x-b) = x^2 + (a-b)x - ab$.",
          `Ici $a = ${a}$ et $b = ${b}$, donc $a-b = ${s}$ et $ab = ${p}$.`,
          `$x^2${sx} - ${p}$.`,
          `$(x + ${a})(x - ${b}) = x^2${sx} - ${p}$.`
        ),
      };
    },
  },

  /* ===================== DEVFAC_FACTEUR_COMMUN ===================== */

  {
    kind: "fixed",
    id: "seconde_factcommun_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_facteur_commun",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $2x + 6$ ?",
    format: "qcm",
    choices: ["$2(x + 3)$", "$2(x + 6)$", "$x(2 + 6)$", "$2x(1 + 3)$"],
    expected: ["$2(x + 3)$"],
    comparator: "mcq_exact",
    hint: "$2$ est un facteur commun à $2x$ et $6$.",
    explanation: exp(
      "Factoriser, c'est mettre en évidence un facteur commun.",
      "$2x = 2 \\times x$ et $6 = 2 \\times 3$.",
      "On met $2$ en facteur : $2(x + 3)$.",
      "$2x + 6 = 2(x + 3)$."
    ),
    tags: ["seconde", "maths", "factorisation", "facteur_commun", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_factcommun_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_facteur_commun",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $3x - 12$ ?",
    format: "qcm",
    choices: ["$3(x - 4)$", "$3(x - 12)$", "$3x(1 - 4)$", "$x(3 - 12)$"],
    expected: ["$3(x - 4)$"],
    comparator: "mcq_exact",
    hint: "$3$ divise $3x$ et $12$.",
    explanation: exp(
      "On met le facteur commun $3$ en évidence.",
      "$3x = 3 \\times x$ et $12 = 3 \\times 4$.",
      "$3x - 12 = 3(x - 4)$.",
      "$3x - 12 = 3(x - 4)$."
    ),
    tags: ["seconde", "maths", "factorisation", "facteur_commun", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_factcommun_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_facteur_commun",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $x^2 + 5x$ ?",
    format: "qcm",
    choices: ["$x(x + 5)$", "$x(x + 5x)$", "$5x(x + 1)$", "$x^2(1 + 5)$"],
    expected: ["$x(x + 5)$"],
    comparator: "mcq_exact",
    hint: "$x$ est un facteur commun à $x^2$ et $5x$.",
    explanation: exp(
      "On met $x$ en facteur.",
      "$x^2 = x \\times x$ et $5x = x \\times 5$.",
      "$x^2 + 5x = x(x + 5)$.",
      "$x^2 + 5x = x(x + 5)$."
    ),
    tags: ["seconde", "maths", "factorisation", "facteur_commun", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_factcommun_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_facteur_commun",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $6x + 9$ ?",
    format: "qcm",
    choices: ["$3(2x + 3)$", "$3(2x + 9)$", "$6(x + 3)$", "$3x(2 + 3)$"],
    expected: ["$3(2x + 3)$"],
    comparator: "mcq_exact",
    hint: "Le plus grand facteur commun à $6$ et $9$ est $3$.",
    explanation: exp(
      "On met le facteur commun $3$ en évidence.",
      "$6x = 3 \\times 2x$ et $9 = 3 \\times 3$.",
      "$6x + 9 = 3(2x + 3)$.",
      "$6x + 9 = 3(2x + 3)$."
    ),
    tags: ["seconde", "maths", "factorisation", "facteur_commun", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_factcommun_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_facteur_commun",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $4x^2 - 2x$ ?",
    format: "qcm",
    choices: ["$2x(2x - 1)$", "$2x(2x - 2)$", "$4x(x - 2)$", "$2(2x^2 - x)$"],
    expected: ["$2x(2x - 1)$"],
    comparator: "mcq_exact",
    hint: "Le facteur commun est $2x$.",
    explanation: exp(
      "On met $2x$ en facteur.",
      "$4x^2 = 2x \\times 2x$ et $2x = 2x \\times 1$.",
      "$4x^2 - 2x = 2x(2x - 1)$.",
      "$4x^2 - 2x = 2x(2x - 1)$."
    ),
    tags: ["seconde", "maths", "factorisation", "facteur_commun", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_factcommun_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_facteur_commun",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $15x^2 + 10x$ ?",
    format: "qcm",
    choices: ["$5x(3x + 2)$", "$5x(3x + 10)$", "$5(3x^2 + 2x)$", "$x(15x + 10)$"],
    expected: ["$5x(3x + 2)$"],
    comparator: "mcq_exact",
    hint: "Facteur commun : $5x$.",
    explanation: exp(
      "On met $5x$ en facteur.",
      "$15x^2 = 5x \\times 3x$ et $10x = 5x \\times 2$.",
      "$15x^2 + 10x = 5x(3x + 2)$.",
      "$15x^2 + 10x = 5x(3x + 2)$."
    ),
    tags: ["seconde", "maths", "factorisation", "facteur_commun", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_factcommun_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_facteur_commun",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $(x + 1)(x + 2) + (x + 1)(x - 5)$ ?",
    format: "qcm",
    choices: ["$(x + 1)(2x - 3)$", "$(x + 1)(2x + 3)$", "$(x + 1)(x - 3)$", "$(x + 1)^2$"],
    expected: ["$(x + 1)(2x - 3)$"],
    comparator: "mcq_exact",
    hint: "Le facteur commun est $(x + 1)$.",
    explanation: exp(
      "On met le facteur commun $(x+1)$ en évidence.",
      "$(x+1)\\big[(x+2) + (x-5)\\big]$.",
      "$(x+2)+(x-5) = 2x - 3$.",
      "$(x + 1)(x + 2) + (x + 1)(x - 5) = (x + 1)(2x - 3)$."
    ),
    tags: ["seconde", "maths", "factorisation", "facteur_commun", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_factcommun_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_facteur_commun",
    difficulty: 2,
    theme: "neutral",
    hint: "Mets le facteur commun en évidence.",
    tags: ["seconde", "maths", "factorisation", "facteur_commun", "template"],
    generate: () => {
      const k = randomInt(2, 6);
      const b = randomInt(2, 9);
      const correct = `$${k}(x + ${b})$`;
      const choices = [
        correct,
        `$${k}(x + ${k * b})$`,
        `$x(${k} + ${b})$`,
        `$${k}x(1 + ${b})$`,
      ];
      return {
        text: `Quelle est la forme factorisée de $${k}x + ${k * b}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On met le facteur commun en évidence.",
          `$${k}x = ${k} \\times x$ et $${k * b} = ${k} \\times ${b}$.`,
          `$${k}x + ${k * b} = ${k}(x + ${b})$.`,
          `$${k}x + ${k * b} = ${k}(x + ${b})$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_factcommun_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_facteur_commun",
    difficulty: 3,
    theme: "neutral",
    hint: "Le facteur commun contient $x$.",
    tags: ["seconde", "maths", "factorisation", "facteur_commun", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(2, 7);
      const correct = `$x(${a}x + ${b})$`;
      const choices = [
        correct,
        `$x(${a}x + ${a * b})$`,
        `$${a}x(x + ${b})$`,
        `$x(${a} + ${b}x)$`,
      ];
      return {
        text: `Quelle est la forme factorisée de $${a}x^2 + ${b}x$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On met $x$ en facteur.",
          `$${a}x^2 = x \\times ${a}x$ et $${b}x = x \\times ${b}$.`,
          `$${a}x^2 + ${b}x = x(${a}x + ${b})$.`,
          `$${a}x^2 + ${b}x = x(${a}x + ${b})$.`
        ),
      };
    },
  },

  /* ===================== DEVFAC_FACTORISER_IDENTITE ===================== */

  {
    kind: "fixed",
    id: "seconde_factid_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_factoriser_identite",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $x^2 - 9$ ?",
    format: "qcm",
    choices: ["$(x - 3)(x + 3)$", "$(x - 9)(x + 1)$", "$(x - 3)^2$", "$(x + 3)^2$"],
    expected: ["$(x - 3)(x + 3)$"],
    comparator: "mcq_exact",
    hint: "$x^2 - 9 = x^2 - 3^2$ (différence de carrés).",
    explanation: exp(
      "On reconnaît $a^2 - b^2 = (a-b)(a+b)$.",
      "Ici $a = x$ et $b = 3$ (car $9 = 3^2$).",
      "$x^2 - 9 = (x - 3)(x + 3)$.",
      "$x^2 - 9 = (x - 3)(x + 3)$."
    ),
    tags: ["seconde", "maths", "factorisation", "identite", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_factid_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_factoriser_identite",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $x^2 - 16$ ?",
    format: "qcm",
    choices: ["$(x - 4)(x + 4)$", "$(x - 16)(x + 1)$", "$(x - 4)^2$", "$(x - 8)(x + 2)$"],
    expected: ["$(x - 4)(x + 4)$"],
    comparator: "mcq_exact",
    hint: "$16 = 4^2$.",
    explanation: exp(
      "On reconnaît une différence de carrés $a^2 - b^2 = (a-b)(a+b)$.",
      "Ici $a = x$ et $b = 4$.",
      "$x^2 - 16 = (x - 4)(x + 4)$.",
      "$x^2 - 16 = (x - 4)(x + 4)$."
    ),
    tags: ["seconde", "maths", "factorisation", "identite", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_factid_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_factoriser_identite",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $x^2 + 6x + 9$ ?",
    format: "qcm",
    choices: ["$(x + 3)^2$", "$(x - 3)^2$", "$(x + 3)(x - 3)$", "$(x + 9)(x + 1)$"],
    expected: ["$(x + 3)^2$"],
    comparator: "mcq_exact",
    hint: "$x^2 + 6x + 9 = x^2 + 2\\times 3 \\times x + 3^2$.",
    explanation: exp(
      "On reconnaît $a^2 + 2ab + b^2 = (a+b)^2$.",
      "Ici $a = x$, $b = 3$ : $6x = 2 \\times 3 \\times x$ et $9 = 3^2$.",
      "$x^2 + 6x + 9 = (x + 3)^2$.",
      "$x^2 + 6x + 9 = (x + 3)^2$."
    ),
    tags: ["seconde", "maths", "factorisation", "identite", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_factid_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_factoriser_identite",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $x^2 - 10x + 25$ ?",
    format: "qcm",
    choices: ["$(x - 5)^2$", "$(x + 5)^2$", "$(x - 5)(x + 5)$", "$(x - 25)(x - 1)$"],
    expected: ["$(x - 5)^2$"],
    comparator: "mcq_exact",
    hint: "$25 = 5^2$ et $10x = 2 \\times 5 \\times x$.",
    explanation: exp(
      "On reconnaît $a^2 - 2ab + b^2 = (a-b)^2$.",
      "Ici $a = x$, $b = 5$.",
      "$x^2 - 10x + 25 = (x - 5)^2$.",
      "$x^2 - 10x + 25 = (x - 5)^2$."
    ),
    tags: ["seconde", "maths", "factorisation", "identite", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_factid_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_factoriser_identite",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $4x^2 - 1$ ?",
    format: "qcm",
    choices: ["$(2x - 1)(2x + 1)$", "$(4x - 1)(x + 1)$", "$(2x - 1)^2$", "$(2x + 1)^2$"],
    expected: ["$(2x - 1)(2x + 1)$"],
    comparator: "mcq_exact",
    hint: "$4x^2 = (2x)^2$ et $1 = 1^2$.",
    explanation: exp(
      "On reconnaît $a^2 - b^2$ avec $a = 2x$ et $b = 1$.",
      "$4x^2 - 1 = (2x)^2 - 1^2$.",
      "$= (2x - 1)(2x + 1)$.",
      "$4x^2 - 1 = (2x - 1)(2x + 1)$."
    ),
    tags: ["seconde", "maths", "factorisation", "identite", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_factid_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_factoriser_identite",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $9x^2 - 25$ ?",
    format: "qcm",
    choices: ["$(3x - 5)(3x + 5)$", "$(9x - 5)(x + 5)$", "$(3x - 5)^2$", "$(3x + 5)^2$"],
    expected: ["$(3x - 5)(3x + 5)$"],
    comparator: "mcq_exact",
    hint: "$9x^2 = (3x)^2$ et $25 = 5^2$.",
    explanation: exp(
      "On reconnaît $a^2 - b^2$ avec $a = 3x$ et $b = 5$.",
      "$9x^2 - 25 = (3x)^2 - 5^2$.",
      "$= (3x - 5)(3x + 5)$.",
      "$9x^2 - 25 = (3x - 5)(3x + 5)$."
    ),
    tags: ["seconde", "maths", "factorisation", "identite", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_factid_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_factoriser_identite",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme factorisée de $x^2 - 49$ ?",
    format: "qcm",
    choices: ["$(x - 7)(x + 7)$", "$(x - 49)(x + 1)$", "$(x - 7)^2$", "$(x + 7)^2$"],
    expected: ["$(x - 7)(x + 7)$"],
    comparator: "mcq_exact",
    hint: "$49 = 7^2$.",
    explanation: exp(
      "Différence de carrés : $a^2 - b^2 = (a-b)(a+b)$.",
      "Ici $a = x$, $b = 7$.",
      "$x^2 - 49 = (x - 7)(x + 7)$.",
      "$x^2 - 49 = (x - 7)(x + 7)$."
    ),
    tags: ["seconde", "maths", "factorisation", "identite", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_factid_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_factoriser_identite",
    difficulty: 3,
    theme: "neutral",
    hint: "$x^2 - n^2 = (x - n)(x + n)$.",
    tags: ["seconde", "maths", "factorisation", "identite", "template"],
    generate: () => {
      const n = randomInt(2, 9);
      const carre = n * n;
      const correct = `$(x - ${n})(x + ${n})$`;
      const choices = [
        correct,
        `$(x - ${carre})(x + 1)$`,
        `$(x - ${n})^2$`,
        `$(x + ${n})^2$`,
      ];
      return {
        text: `Quelle est la forme factorisée de $x^2 - ${carre}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On reconnaît une différence de carrés $a^2 - b^2 = (a-b)(a+b)$.",
          `Ici $a = x$ et $b = ${n}$ (car $${carre} = ${n}^2$).`,
          `$x^2 - ${carre} = (x - ${n})(x + ${n})$.`,
          `$x^2 - ${carre} = (x - ${n})(x + ${n})$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_factid_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_factoriser_identite",
    difficulty: 4,
    theme: "neutral",
    hint: "$x^2 + 2nx + n^2 = (x + n)^2$.",
    tags: ["seconde", "maths", "factorisation", "identite", "template"],
    generate: () => {
      const n = randomInt(2, 8);
      const correct = `$(x + ${n})^2$`;
      const choices = [
        correct,
        `$(x - ${n})^2$`,
        `$(x + ${n})(x - ${n})$`,
        `$(x + ${n * n})(x + 1)$`,
      ];
      return {
        text: `Quelle est la forme factorisée de $x^2 + ${2 * n}x + ${n * n}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On reconnaît $a^2 + 2ab + b^2 = (a+b)^2$.",
          `Ici $a = x$, $b = ${n}$ : $${2 * n}x = 2 \\times ${n} \\times x$ et $${n * n} = ${n}^2$.`,
          `$x^2 + ${2 * n}x + ${n * n} = (x + ${n})^2$.`,
          `$x^2 + ${2 * n}x + ${n * n} = (x + ${n})^2$.`
        ),
      };
    },
  },

  /* ===================== DEVFAC_CHOISIR_FORME ===================== */

  {
    kind: "fixed",
    id: "seconde_choisirforme_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_choisir_forme",
    difficulty: 2,
    theme: "neutral",
    text: "Pour résoudre l'équation $(x - 2)(x + 5) = 0$, quelle forme est la plus adaptée ?",
    format: "qcm",
    choices: ["La forme factorisée", "La forme développée", "La forme réduite", "Peu importe"],
    expected: ["La forme factorisée"],
    comparator: "mcq_exact",
    hint: "Un produit est nul quand l'un des facteurs est nul.",
    explanation: exp(
      "La forme factorisée permet d'utiliser : un produit est nul si et seulement si un facteur est nul.",
      "On regarde la forme la plus utile pour résoudre une équation produit.",
      "La forme factorisée donne directement les solutions.",
      "On choisit la forme factorisée."
    ),
    tags: ["seconde", "maths", "factorisation", "choisir_forme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_choisirforme_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_choisir_forme",
    difficulty: 2,
    theme: "neutral",
    text: "Quelles sont les solutions de l'équation $(x - 2)(x + 5) = 0$ ?",
    format: "qcm",
    choices: ["$x = 2$ ou $x = -5$", "$x = -2$ ou $x = 5$", "$x = 2$ ou $x = 5$", "$x = -2$ ou $x = -5$"],
    expected: ["$x = 2$ ou $x = -5$"],
    comparator: "mcq_exact",
    hint: "On annule chaque facteur.",
    explanation: exp(
      "Un produit est nul si et seulement si l'un des facteurs est nul.",
      "On résout $x - 2 = 0$ et $x + 5 = 0$.",
      "$x = 2$ ou $x = -5$.",
      "Les solutions sont $x = 2$ ou $x = -5$."
    ),
    tags: ["seconde", "maths", "factorisation", "choisir_forme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_choisirforme_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_choisir_forme",
    difficulty: 3,
    theme: "neutral",
    text: "Pour résoudre $x^2 - 9 = 0$, quelle forme utilise-t-on en priorité ?",
    format: "qcm",
    choices: ["La forme factorisée $(x-3)(x+3)$", "La forme développée $x^2 - 9$", "La forme $x^2 = 9$ seulement", "Aucune"],
    expected: ["La forme factorisée $(x-3)(x+3)$"],
    comparator: "mcq_exact",
    hint: "Factoriser ramène à une équation produit.",
    explanation: exp(
      "Factoriser transforme l'équation en équation produit, facile à résoudre.",
      "$x^2 - 9 = (x-3)(x+3)$.",
      "On résout alors $(x-3)(x+3) = 0$.",
      "On choisit la forme factorisée $(x-3)(x+3)$."
    ),
    tags: ["seconde", "maths", "factorisation", "choisir_forme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_choisirforme_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_choisir_forme",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles sont les solutions de $x^2 - 9 = 0$ ?",
    format: "qcm",
    choices: ["$x = 3$ ou $x = -3$", "$x = 3$", "$x = 9$ ou $x = -9$", "$x = -3$"],
    expected: ["$x = 3$ ou $x = -3$"],
    comparator: "mcq_exact",
    hint: "Factorise : $(x-3)(x+3) = 0$.",
    explanation: exp(
      "On factorise puis on annule chaque facteur.",
      "$x^2 - 9 = (x-3)(x+3) = 0$.",
      "$x - 3 = 0$ ou $x + 3 = 0$, donc $x = 3$ ou $x = -3$.",
      "Les solutions sont $x = 3$ ou $x = -3$."
    ),
    tags: ["seconde", "maths", "factorisation", "choisir_forme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_choisirforme_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_choisir_forme",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer la valeur de $(x - 3)(x + 7)$ lorsque $x = 3$, quelle forme est la plus rapide ?",
    format: "qcm",
    choices: ["La forme factorisée (un facteur s'annule)", "La forme développée", "Il faut tout développer", "Les deux sont identiques en rapidité"],
    expected: ["La forme factorisée (un facteur s'annule)"],
    comparator: "mcq_exact",
    hint: "Que vaut $x - 3$ quand $x = 3$ ?",
    explanation: exp(
      "Quand un facteur s'annule, le produit vaut $0$ immédiatement.",
      "Pour $x = 3$, le facteur $x - 3$ vaut $0$.",
      "Le produit vaut donc $0$ sans calcul supplémentaire.",
      "La forme factorisée est la plus rapide ici."
    ),
    tags: ["seconde", "maths", "factorisation", "choisir_forme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_choisirforme_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_choisir_forme",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $A = (x + 3)^2 - 4$. Quelle est la forme factorisée de $A$ ?",
    format: "qcm",
    choices: ["$(x + 1)(x + 5)$", "$(x + 3)(x - 4)$", "$(x - 1)(x - 5)$", "$(x + 3)^2$"],
    expected: ["$(x + 1)(x + 5)$"],
    comparator: "mcq_exact",
    hint: "Reconnaître $a^2 - b^2$ avec $a = x + 3$ et $b = 2$.",
    explanation: exp(
      "On reconnaît une différence de carrés $a^2 - b^2 = (a-b)(a+b)$.",
      "Ici $a = x + 3$ et $b = 2$ (car $4 = 2^2$).",
      "$A = (x + 3 - 2)(x + 3 + 2) = (x + 1)(x + 5)$.",
      "$A = (x + 1)(x + 5)$."
    ),
    tags: ["seconde", "maths", "factorisation", "choisir_forme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_choisirforme_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_choisir_forme",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $A = (x + 3)^2 - 4 = (x + 1)(x + 5)$, quelles sont les solutions de $A = 0$ ?",
    format: "qcm",
    choices: ["$x = -1$ ou $x = -5$", "$x = 1$ ou $x = 5$", "$x = -3$", "$x = -1$ ou $x = 5$"],
    expected: ["$x = -1$ ou $x = -5$"],
    comparator: "mcq_exact",
    hint: "Utilise la forme factorisée.",
    explanation: exp(
      "La forme factorisée permet de résoudre l'équation produit.",
      "$(x + 1)(x + 5) = 0$ donne $x + 1 = 0$ ou $x + 5 = 0$.",
      "$x = -1$ ou $x = -5$.",
      "Les solutions sont $x = -1$ ou $x = -5$."
    ),
    tags: ["seconde", "maths", "factorisation", "choisir_forme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_choisirforme_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_choisir_forme",
    difficulty: 2,
    theme: "neutral",
    text: "Pour comparer une expression à une valeur en développant les calculs, quelle forme privilégie-t-on ?",
    format: "qcm",
    choices: ["La forme développée et réduite", "La forme factorisée", "La forme avec parenthèses", "Aucune"],
    expected: ["La forme développée et réduite"],
    comparator: "mcq_exact",
    hint: "Pour calculer/combiner des termes, on développe.",
    explanation: exp(
      "La forme développée et réduite facilite les calculs et les regroupements de termes.",
      "On choisit la forme selon l'objectif : calculer → développée ; résoudre une équation produit → factorisée.",
      "Pour développer les calculs, la forme développée est la plus pratique.",
      "On choisit la forme développée et réduite."
    ),
    tags: ["seconde", "maths", "factorisation", "choisir_forme", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_choisirforme_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "developpement_factorisation_2de",
    microId: "devfac_choisir_forme",
    difficulty: 3,
    theme: "neutral",
    hint: "On annule chaque facteur.",
    tags: ["seconde", "maths", "factorisation", "choisir_forme", "template"],
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
        text: `Quelles sont les solutions de l'équation $(x - ${a})(x + ${b}) = 0$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un produit est nul si et seulement si l'un des facteurs est nul.",
          `On résout $x - ${a} = 0$ et $x + ${b} = 0$.`,
          `$x = ${a}$ ou $x = ${-b}$.`,
          `Les solutions sont $x = ${a}$ ou $x = ${-b}$.`
        ),
      };
    },
  },
];
