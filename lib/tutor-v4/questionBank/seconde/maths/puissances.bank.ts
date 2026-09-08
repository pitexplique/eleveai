// lib/tutor-v4/questionBank/seconde/maths/puissances.bank.ts
//
// Chapitre : Puissances (notion puissances_2de)
//
// REGLE DE DESIGN (option D) :
//   - fixed   -> valeurs remarquables / cas de depart / definitions
//   - template (qcm + short) -> le gros du raisonnement, valeurs variees
//   - QCM aussi pour le raisonnement ("a quoi sert", "quelle regle")
//   - short uniquement pour reponse NUMERIQUE courte
//   - pas de format "open"
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   puiss_calcul               — Calculer une puissance a exposant entier
//   puiss_produit_quotient     — Produit et quotient de puissances de meme base
//   puiss_puissance_puissance  — Puissance d'une puissance
//   puiss_exposant_negatif     — Exposant negatif (a^-n = 1/a^n)

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

export const puissancesBank: TutorBankItemV4[] = [
  /* ===================== PUISS_CALCUL ===================== */

  // fixed : valeurs remarquables / definition
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
    text: "Que signifie l'écriture $a^n$ (avec $n$ entier positif) ?",
    format: "qcm",
    choices: [
      "Le produit de $n$ facteurs tous égaux à $a$",
      "Le produit $a \\times n$",
      "La somme de $n$ termes égaux à $a$",
      "$a$ multiplié par $n$ fois $10$",
    ],
    expected: ["Le produit de $n$ facteurs tous égaux à $a$"],
    comparator: "mcq_exact",
    hint: "Une puissance, ce n'est pas une multiplication par $n$.",
    explanation: exp(
      "La notation puissance compacte un produit de facteurs identiques.",
      "On distingue $a^n$ (produit) de $a \\times n$ ou $a + a + \\dots$",
      "$a^n = \\underbrace{a \\times a \\times \\dots \\times a}_{n \\text{ facteurs}}$.",
      "$a^n$ est le produit de $n$ facteurs égaux à $a$."
    ),
    tags: ["seconde", "maths", "puissances", "calcul", "raisonnement", "qcm"],
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
    text: "Combien vaut $3^0$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Tout nombre non nul à la puissance $0$ vaut $1$.",
    explanation: exp(
      "Par convention, $a^0 = 1$ pour tout $a \\neq 0$.",
      "On applique cette règle.",
      "$3^0 = 1$.",
      "$3^0 = 1$."
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
    text: "À quoi sert principalement la notation en puissance ?",
    format: "qcm",
    choices: [
      "Écrire un produit de facteurs identiques de façon compacte",
      "Additionner plus vite",
      "Comparer deux fractions",
      "Mesurer un angle",
    ],
    expected: ["Écrire un produit de facteurs identiques de façon compacte"],
    comparator: "mcq_exact",
    hint: "Pense à $2\\times2\\times2\\times2\\times2 = 2^5$.",
    explanation: exp(
      "La puissance est une écriture abrégée d'un produit répété.",
      "On compare $2\\times2\\times2\\times2\\times2$ et $2^5$.",
      "La seconde est bien plus compacte.",
      "Elle sert à écrire un produit de facteurs identiques de façon compacte."
    ),
    tags: ["seconde", "maths", "puissances", "calcul", "raisonnement", "qcm"],
  },

  // templates
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
      const e = randomInt(2, 3);
      const valeur = base ** e;
      return {
        text: `Combien vaut $${base}^{${e}}$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Une puissance est un produit de facteurs égaux à la base.",
          `On multiplie $${base}$ par lui-même $${e}$ fois.`,
          `$${base}^{${e}} = ${valeur}$.`,
          `$${base}^{${e}} = ${valeur}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_calcul_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Le carré d'un nombre négatif est positif.",
    tags: ["seconde", "maths", "puissances", "calcul", "template"],
    generate: () => {
      const b = randomInt(2, 7);
      const valeur = b * b;
      return {
        text: `Combien vaut $(-${b})^2$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Le carré garde un résultat positif (produit de deux négatifs).",
          `$(-${b})^2 = (-${b}) \\times (-${b})$.`,
          `$= ${valeur}$.`,
          `$(-${b})^2 = ${valeur}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_calcul_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Un exposant impair conserve le signe négatif.",
    tags: ["seconde", "maths", "puissances", "calcul", "template"],
    generate: () => {
      const b = randomInt(2, 5);
      const valeur = -(b ** 3);
      return {
        text: `Combien vaut $(-${b})^3$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Le cube d'un nombre négatif est négatif (exposant impair).",
          `$(-${b})^3 = (-${b}) \\times (-${b}) \\times (-${b})$.`,
          `$= ${valeur}$.`,
          `$(-${b})^3 = ${valeur}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_calcul_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_calcul",
    difficulty: 2,
    theme: "neutral",
    hint: "Combien de fois la base apparaît-elle ?",
    tags: ["seconde", "maths", "puissances", "calcul", "raisonnement", "template"],
    generate: () => {
      const k = randomInt(3, 7);
      return {
        text: `Dans l'écriture $a^{${k}}$, combien de fois le facteur $a$ apparaît-il ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: exp(
          "L'exposant indique le nombre de facteurs.",
          `$a^{${k}} = \\underbrace{a \\times \\dots \\times a}_{${k}}$.`,
          `Le facteur $a$ apparaît $${k}$ fois.`,
          `Il apparaît $${k}$ fois.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_calcul_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_calcul",
    difficulty: 2,
    theme: "neutral",
    hint: "Une puissance de $10$ s'écrit avec autant de zéros que l'exposant.",
    tags: ["seconde", "maths", "puissances", "calcul", "template"],
    generate: () => {
      const n = randomInt(2, 5);
      const valeur = 10 ** n;
      return {
        text: `Combien vaut $10^{${n}}$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Une puissance de $10$ s'écrit avec autant de zéros que l'exposant.",
          `$10^{${n}}$ comporte $${n}$ zéros.`,
          `$10^{${n}} = ${valeur}$.`,
          `$10^{${n}} = ${valeur}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_calcul_tpl_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_calcul",
    difficulty: 1,
    theme: "neutral",
    hint: "Le carré d'un nombre, c'est ce nombre fois lui-même.",
    tags: ["seconde", "maths", "puissances", "calcul", "template"],
    generate: () => {
      const b = randomInt(2, 12);
      return {
        text: `Combien vaut $${b}^2$ ?`,
        format: "short",
        expected: [String(b * b)],
        comparator: "number_equal",
        explanation: exp(
          "Le carré d'un nombre est ce nombre multiplié par lui-même.",
          `$${b}^2 = ${b} \\times ${b}$.`,
          `$= ${b * b}$.`,
          `$${b}^2 = ${b * b}$.`
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
    text: "Pour calculer $a^m \\times a^n$ (même base), que fait-on des exposants ?",
    format: "qcm",
    choices: ["On les additionne", "On les multiplie", "On les soustrait", "On garde le plus grand"],
    expected: ["On les additionne"],
    comparator: "mcq_exact",
    hint: "$a^2 \\times a^3 = a \\times a \\times a \\times a \\times a$.",
    explanation: exp(
      "Multiplier des puissances de même base revient à empiler les facteurs.",
      "$a^m \\times a^n$ a en tout $m + n$ facteurs.",
      "Donc $a^m \\times a^n = a^{m+n}$ : on additionne les exposants.",
      "On additionne les exposants."
    ),
    tags: ["seconde", "maths", "puissances", "produit_quotient", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_pq_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_produit_quotient",
    difficulty: 2,
    theme: "neutral",
    text: "Pour calculer $\\dfrac{a^m}{a^n}$ (même base), que fait-on des exposants ?",
    format: "qcm",
    choices: ["On les soustrait", "On les additionne", "On les multiplie", "On les divise"],
    expected: ["On les soustrait"],
    comparator: "mcq_exact",
    hint: "Diviser, c'est « retirer » des facteurs.",
    explanation: exp(
      "Diviser des puissances de même base supprime des facteurs.",
      "$\\dfrac{a^m}{a^n}$ garde $m - n$ facteurs.",
      "Donc $\\dfrac{a^m}{a^n} = a^{m-n}$ : on soustrait les exposants.",
      "On soustrait les exposants."
    ),
    tags: ["seconde", "maths", "puissances", "produit_quotient", "raisonnement", "qcm"],
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
    text: "Simplifie $a^3 \\times a^2$ (avec $a \\neq 0$).",
    format: "qcm",
    choices: ["$a^5$", "$a^6$", "$a^1$", "$a^9$"],
    expected: ["$a^5$"],
    comparator: "mcq_exact",
    hint: "$a^m \\times a^n = a^{m+n}$.",
    explanation: exp(
      "On additionne les exposants.",
      "$a^3 \\times a^2 = a^{3+2}$.",
      "$= a^5$.",
      "$a^3 \\times a^2 = a^5$."
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
    hint: "On additionne les exposants.",
    tags: ["seconde", "maths", "puissances", "produit_quotient", "template"],
    generate: () => {
      const m = randomInt(2, 6);
      const n = randomInt(2, 6);
      const correct = `$a^{${m + n}}$`;
      // À $2$ et $3$, « on a multiplié les exposants » et « on en a ajouté un »
      // donnent le même 6 : d'où le quatrième piège, gardé en réserve.
      const choices = makeChoices(correct, [
        `$a^{${m * n}}$`,
        `$a^{${m + n + 1}}$`,
        `$a^{${Math.abs(m - n)}}$`,
        `$a^{${m + n - 1}}$`,
      ]);
      return {
        text: `Simplifie $a^{${m}} \\times a^{${n}}$ (avec $a \\neq 0$).`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On additionne les exposants car la base est la même.",
          `$a^{${m}} \\times a^{${n}} = a^{${m}+${n}}$.`,
          `$= a^{${m + n}}$.`,
          `Le résultat est $a^{${m + n}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_pq_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_produit_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "On soustrait les exposants.",
    tags: ["seconde", "maths", "puissances", "produit_quotient", "template"],
    generate: () => {
      const n = randomInt(2, 4);
      const m = n + randomInt(1, 4);
      const correct = `$a^{${m - n}}$`;
      const choices = [correct, `$a^{${m + n}}$`, `$a^{${m * n}}$`, `$a^{${m}}$`];
      return {
        text: `Simplifie $\\dfrac{a^{${m}}}{a^{${n}}}$ (avec $a \\neq 0$).`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On soustrait les exposants car la base est la même.",
          `$\\dfrac{a^{${m}}}{a^{${n}}} = a^{${m}-${n}}$.`,
          `$= a^{${m - n}}$.`,
          `Le résultat est $a^{${m - n}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_pq_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_produit_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "On additionne les exposants, puis on calcule.",
    tags: ["seconde", "maths", "puissances", "produit_quotient", "template"],
    generate: () => {
      const base = randomInt(2, 3);
      const m = randomInt(2, 3);
      const n = randomInt(2, 3);
      const valeur = base ** (m + n);
      return {
        text: `Combien vaut $${base}^{${m}} \\times ${base}^{${n}}$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "On additionne les exposants car la base est la même.",
          `$${base}^{${m}} \\times ${base}^{${n}} = ${base}^{${m + n}}$.`,
          `$= ${valeur}$.`,
          `$${base}^{${m}} \\times ${base}^{${n}} = ${valeur}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_pq_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_produit_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "$a = a^1$.",
    tags: ["seconde", "maths", "puissances", "produit_quotient", "template"],
    generate: () => {
      const m = randomInt(2, 6);
      const correct = `$a^{${m + 1}}$`;
      const choices = [correct, `$a^{${m}}$`, `$a^{${m - 1}}$`, `$2a^{${m}}$`];
      return {
        text: `Simplifie $a^{${m}} \\times a$ (avec $a \\neq 0$).`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On écrit $a = a^1$ avant d'additionner les exposants.",
          `$a^{${m}} \\times a^1 = a^{${m}+1}$.`,
          `$= a^{${m + 1}}$.`,
          `$a^{${m}} \\times a = a^{${m + 1}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_pq_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_produit_quotient",
    difficulty: 4,
    theme: "neutral",
    hint: "On soustrait les exposants, puis on calcule.",
    tags: ["seconde", "maths", "puissances", "produit_quotient", "template"],
    generate: () => {
      const base = randomInt(2, 3);
      const n = randomInt(2, 3);
      const m = n + randomInt(1, 2);
      const valeur = base ** (m - n);
      return {
        text: `Combien vaut $\\dfrac{${base}^{${m}}}{${base}^{${n}}}$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "On soustrait les exposants car la base est la même.",
          `$\\dfrac{${base}^{${m}}}{${base}^{${n}}} = ${base}^{${m - n}}$.`,
          `$= ${valeur}$.`,
          `Le résultat est $${valeur}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_pq_tpl_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_produit_quotient",
    difficulty: 2,
    theme: "neutral",
    hint: "Produit de même base → addition des exposants.",
    tags: ["seconde", "maths", "puissances", "produit_quotient", "raisonnement", "template"],
    generate: () => {
      const correct = "$x^{7}$";
      const choices = ["$x^{7}$", "$x^{12}$", "$x^{3}$", "$2x^{7}$"];
      return {
        text: "Simplifie $x^4 \\times x^3$ (avec $x \\neq 0$).",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On additionne les exposants.",
          "$x^4 \\times x^3 = x^{4+3}$.",
          "$= x^7$.",
          "$x^4 \\times x^3 = x^7$."
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
    difficulty: 2,
    theme: "neutral",
    text: "Pour calculer $(a^m)^n$, que fait-on des exposants ?",
    format: "qcm",
    choices: ["On les multiplie", "On les additionne", "On les soustrait", "On garde $m$"],
    expected: ["On les multiplie"],
    comparator: "mcq_exact",
    hint: "$(a^2)^3 = a^2 \\times a^2 \\times a^2$.",
    explanation: exp(
      "Une puissance de puissance, c'est répéter $n$ fois le bloc $a^m$.",
      "$(a^m)^n = \\underbrace{a^m \\times \\dots \\times a^m}_{n}$, soit $m \\times n$ facteurs.",
      "Donc $(a^m)^n = a^{m \\times n}$.",
      "On multiplie les exposants."
    ),
    tags: ["seconde", "maths", "puissances", "puissance_puissance", "raisonnement", "qcm"],
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
    text: "Simplifie $(a^2)^3$ (avec $a \\neq 0$).",
    format: "qcm",
    choices: ["$a^6$", "$a^5$", "$a^8$", "$a^9$"],
    expected: ["$a^6$"],
    comparator: "mcq_exact",
    hint: "$(a^m)^n = a^{m \\times n}$.",
    explanation: exp(
      "On multiplie les exposants.",
      "$(a^2)^3 = a^{2 \\times 3}$.",
      "$= a^6$.",
      "$(a^2)^3 = a^6$."
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
    difficulty: 4,
    theme: "neutral",
    text: "Attention au piège : $(a^2)^3$ et $a^2 \\times a^3$ donnent-ils le même résultat ?",
    format: "qcm",
    choices: [
      "Non : $(a^2)^3 = a^6$ et $a^2 \\times a^3 = a^5$",
      "Oui, les deux valent $a^5$",
      "Oui, les deux valent $a^6$",
      "Non : $a^5$ et $a^8$",
    ],
    expected: ["Non : $(a^2)^3 = a^6$ et $a^2 \\times a^3 = a^5$"],
    comparator: "mcq_exact",
    hint: "Puissance de puissance → on multiplie ; produit → on additionne.",
    explanation: exp(
      "Il faut distinguer les deux règles.",
      "$(a^2)^3$ : on multiplie → $a^6$. $a^2 \\times a^3$ : on additionne → $a^5$.",
      "Les résultats diffèrent.",
      "Non : $a^6$ contre $a^5$."
    ),
    tags: ["seconde", "maths", "puissances", "puissance_puissance", "raisonnement", "qcm"],
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
      // Le piège classique est « on additionne les exposants ». Pour 2 et 2 la
      // somme vaut le produit, pour 2 et 3 elle vaut le produit moins un : le
      // piège s'écrivait alors comme la réponse ou comme un autre piège.
      let n = randomInt(2, 4);
      while (Math.abs(m + n - m * n) <= 1) n = randomInt(2, 4);
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

  {
    kind: "template",
    id: "seconde_puiss_pp_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_puissance_puissance",
    difficulty: 4,
    theme: "neutral",
    hint: "On multiplie les exposants, puis on calcule.",
    tags: ["seconde", "maths", "puissances", "puissance_puissance", "template"],
    generate: () => {
      const base = randomInt(2, 3);
      const m = 2;
      const n = randomInt(2, 3);
      const valeur = base ** (m * n);
      return {
        text: `Combien vaut $(${base}^{${m}})^{${n}}$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "On multiplie les exposants puis on calcule.",
          `$(${base}^{${m}})^{${n}} = ${base}^{${m * n}}$.`,
          `$= ${valeur}$.`,
          `$(${base}^{${m}})^{${n}} = ${valeur}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_pp_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_puissance_puissance",
    difficulty: 3,
    theme: "neutral",
    hint: "$(x^m)^n = x^{m \\times n}$.",
    tags: ["seconde", "maths", "puissances", "puissance_puissance", "template"],
    generate: () => {
      const m = randomInt(2, 5);
      const n = randomInt(2, 4);
      const correct = `$x^{${m * n}}$`;
      // À $m = n = 2$, somme et produit valent tous deux 4 : le piège « on a
      // additionné les exposants » devenait la bonne réponse.
      const choices = makeChoices(correct, [
        `$x^{${m + n}}$`,
        `$x^{${m}}$`,
        `$x^{${m * n + 2}}$`,
        `$x^{${m * n - 1}}$`,
      ]);
      return {
        text: `Simplifie $(x^{${m}})^{${n}}$ (avec $x \\neq 0$).`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On multiplie les exposants.",
          `$(x^{${m}})^{${n}} = x^{${m} \\times ${n}}$.`,
          `$= x^{${m * n}}$.`,
          `Le résultat est $x^{${m * n}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_pp_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_puissance_puissance",
    difficulty: 2,
    theme: "neutral",
    hint: "Puissance de puissance → multiplication des exposants.",
    tags: ["seconde", "maths", "puissances", "puissance_puissance", "raisonnement", "template"],
    generate: () => {
      const correct = "On multiplie les exposants";
      const choices = [
        "On multiplie les exposants",
        "On additionne les exposants",
        "On soustrait les exposants",
        "On élève la base au carré",
      ];
      return {
        text: "Quelle règle applique-t-on pour simplifier $(a^m)^n$ ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une puissance de puissance répète le bloc $a^m$.",
          "$(a^m)^n$ revient à $m \\times n$ facteurs.",
          "Donc on multiplie les exposants.",
          "On multiplie les exposants."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_puiss_pp_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_puissance_puissance",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $(2^2)^3$ ?",
    format: "short",
    expected: ["64"],
    comparator: "number_equal",
    hint: "$(2^2)^3 = 2^{6}$.",
    explanation: exp(
      "On multiplie les exposants puis on calcule.",
      "$(2^2)^3 = 2^{2 \\times 3} = 2^6$.",
      "$2^6 = 64$.",
      "$(2^2)^3 = 64$."
    ),
    tags: ["seconde", "maths", "puissances", "puissance_puissance", "short"],
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
    text: "Que représente $a^{-n}$ (avec $a \\neq 0$) ?",
    format: "qcm",
    choices: ["L'inverse de $a^n$, soit $\\dfrac{1}{a^n}$", "L'opposé de $a^n$, soit $-a^n$", "$a^n$", "$a \\times (-n)$"],
    expected: ["L'inverse de $a^n$, soit $\\dfrac{1}{a^n}$"],
    comparator: "mcq_exact",
    hint: "Exposant négatif → inverse (et non opposé).",
    explanation: exp(
      "Un exposant négatif donne l'inverse, pas l'opposé.",
      "On applique $a^{-n} = \\dfrac{1}{a^n}$.",
      "Par exemple $2^{-1} = \\dfrac{1}{2}$ (et non $-2$).",
      "$a^{-n} = \\dfrac{1}{a^n}$."
    ),
    tags: ["seconde", "maths", "puissances", "exposant_negatif", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_neg_fixed_2",
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
    hint: "$10^{-2} = \\dfrac{1}{10^2} = \\dfrac{1}{100}$.",
    explanation: exp(
      "Une puissance négative est l'inverse de la puissance positive.",
      "$10^{-2} = \\dfrac{1}{10^2} = \\dfrac{1}{100}$.",
      "$= 0{,}01$.",
      "$10^{-2} = 0{,}01$."
    ),
    tags: ["seconde", "maths", "puissances", "exposant_negatif", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_neg_fixed_3",
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
      "On prend l'inverse de la puissance positive.",
      "$2^{-3} = \\dfrac{1}{2^3} = \\dfrac{1}{8}$.",
      "(et non $-8$ : c'est un inverse, pas un opposé).",
      "$2^{-3} = \\dfrac{1}{8}$."
    ),
    tags: ["seconde", "maths", "puissances", "exposant_negatif", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_puiss_neg_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_exposant_negatif",
    difficulty: 3,
    theme: "neutral",
    hint: "$a^{-n} = \\dfrac{1}{a^n}$.",
    tags: ["seconde", "maths", "puissances", "exposant_negatif", "template"],
    generate: () => {
      const n = randomInt(2, 4);
      const correct = `$a^{-${n}} = \\dfrac{1}{a^{${n}}}$`;
      const choices = [
        correct,
        `$a^{-${n}} = -a^{${n}}$`,
        `$a^{-${n}} = a^{${n}}$`,
        `$a^{-${n}} = \\dfrac{1}{${n}a}$`,
      ];
      return {
        text: `Quelle égalité est correcte pour $a^{-${n}}$ (avec $a \\neq 0$) ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un exposant négatif donne l'inverse.",
          `On applique $a^{-n} = \\dfrac{1}{a^n}$.`,
          `$a^{-${n}} = \\dfrac{1}{a^{${n}}}$.`,
          `$a^{-${n}} = \\dfrac{1}{a^{${n}}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_neg_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_exposant_negatif",
    difficulty: 4,
    theme: "neutral",
    hint: "On calcule la puissance positive, puis on prend l'inverse.",
    tags: ["seconde", "maths", "puissances", "exposant_negatif", "template"],
    generate: () => {
      const base = randomInt(2, 6);
      const n = 2;
      const denom = base ** n;
      const correct = `$\\dfrac{1}{${denom}}$`;
      // À la base 2, le carré et le double valent tous deux 4 : le piège « on a
      // multiplié la base par l'exposant » devenait la bonne réponse.
      const choices = makeChoices(correct, [
        `$-${denom}$`,
        `$\\dfrac{1}{${base * n}}$`,
        `$${denom}$`,
        `$\\dfrac{1}{${base}}$`,
      ]);
      return {
        text: `Combien vaut $${base}^{-${n}}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On prend l'inverse de la puissance positive.",
          `$${base}^{-${n}} = \\dfrac{1}{${base}^{${n}}} = \\dfrac{1}{${denom}}$.`,
          `(c'est un inverse, pas un nombre négatif).`,
          `$${base}^{-${n}} = \\dfrac{1}{${denom}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_neg_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_exposant_negatif",
    difficulty: 2,
    theme: "neutral",
    hint: "$10^{-n}$ : la virgule recule de $n$ rangs.",
    tags: ["seconde", "maths", "puissances", "exposant_negatif", "template"],
    generate: () => {
      const n = randomInt(1, 3);
      const valeur = 10 ** -n;
      // formatage decimal francais simple
      const txt = n === 1 ? "0,1" : n === 2 ? "0,01" : "0,001";
      const txtPoint = n === 1 ? "0.1" : n === 2 ? "0.01" : "0.001";
      void valeur;
      return {
        text: `Combien vaut $10^{-${n}}$ ?`,
        format: "short",
        expected: [txt, txtPoint],
        comparator: "number_equal",
        explanation: exp(
          "Une puissance de $10$ à exposant négatif est un nombre décimal inférieur à $1$.",
          `$10^{-${n}} = \\dfrac{1}{10^{${n}}}$.`,
          `$= ${txt}$.`,
          `$10^{-${n}} = ${txt}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_puiss_neg_fixed_4",
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
      "$a^{-1} = \\dfrac{1}{a^1} = \\dfrac{1}{a}$.",
      "C'est l'inverse, pas l'opposé.",
      "$a^{-1} = \\dfrac{1}{a}$."
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
    difficulty: 3,
    theme: "neutral",
    text: "Un exposant négatif transforme la puissance en :",
    format: "qcm",
    choices: ["son inverse", "son opposé", "un nombre négatif", "zéro"],
    expected: ["son inverse"],
    comparator: "mcq_exact",
    hint: "Erreur classique : confondre inverse et opposé.",
    explanation: exp(
      "L'exposant négatif signifie « inverse ».",
      "$a^{-n} = \\dfrac{1}{a^n}$, qui est l'inverse de $a^n$.",
      "Ce n'est pas l'opposé $-a^n$.",
      "Il transforme la puissance en son inverse."
    ),
    tags: ["seconde", "maths", "puissances", "exposant_negatif", "raisonnement", "qcm"],
  },

  /* ============== PUISS_EXPRESSION_COMPOSEE (08/09/2026) ==============
   *
   * Les quatre micros precedentes enseignent chaque regle SEPAREMENT. Aucun
   * enonce ne les enchainait — et c'est pourtant la forme de l'exercice type :
   * la question 2.2 du controle commun de mars 2025 demande d'ecrire
   * B = (7^4 x 7^-5) / (7^3)^4 sous la forme 7^n. Trois regles d'affilee.
   *
   * On garde toujours la MEME BASE : l'exercice porte sur les exposants, pas
   * sur le calcul de la valeur (7^-13 n'a aucun interet a etre calcule).
   */

  {
    kind: "template",
    id: "seconde_puiss_compose_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_expression_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "Le numérateur : on additionne. Le dénominateur : $(a^r)^s = a^{r \\times s}$. Puis on soustrait.",
    tags: ["seconde", "maths", "puissances", "expression_composee", "template"],
    generate: () => {
      const base = [2, 3, 5, 7, 11][randomInt(0, 4)];
      const p = randomInt(3, 8);
      const q = -randomInt(2, 6);
      const r = randomInt(2, 4);
      const s = randomInt(2, 4);
      const n = p + q - r * s;
      return {
        text:
          `Écrire $B = \\dfrac{${base}^{${p}} \\times ${base}^{${q}}}{\\left(${base}^{${r}}\\right)^{${s}}}$ ` +
          `sous la forme $${base}^{n}$. Donner l'entier $n$.`,
        format: "short",
        expected: [`${n}`],
        comparator: "number_equal",
        explanation: exp(
          "Même base partout : on ne calcule rien, on ne travaille que sur les exposants.",
          "Produit → on additionne. Puissance d'une puissance → on multiplie. Quotient → on soustrait.",
          `Numérateur : $${base}^{${p}} \\times ${base}^{${q}} = ${base}^{${p} ${q < 0 ? "-" : "+"} ${Math.abs(q)}} = ${base}^{${p + q}}$.\n\n` +
            `Dénominateur : $\\left(${base}^{${r}}\\right)^{${s}} = ${base}^{${r} \\times ${s}} = ${base}^{${r * s}}$.\n\n` +
            `Quotient : $B = ${base}^{${p + q} - ${r * s}} = ${base}^{${n}}$.`,
          `$n = ${n}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_compose_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_expression_composee",
    difficulty: 3,
    theme: "neutral",
    hint: "On additionne les exposants du haut, on soustrait celui du bas.",
    tags: ["seconde", "maths", "puissances", "expression_composee", "template"],
    generate: () => {
      const p = randomInt(4, 9);
      const q = randomInt(2, 6);
      const r = randomInt(2, 7);
      const n = p + q - r;
      const correct = `$a^{${n}}$`;
      // Les pieges sont les trois erreurs reelles : tout additionner, multiplier
      // les exposants du produit, oublier le signe du quotient.
      const choices = makeChoices(correct, [
        `$a^{${p + q + r}}$`,
        `$a^{${p * q - r}}$`,
        `$a^{${p - q - r}}$`,
        `$a^{${p + q}}$`,
      ]);
      return {
        text: `Simplifie $\\dfrac{a^{${p}} \\times a^{${q}}}{a^{${r}}}$ (avec $a \\neq 0$).`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une seule base : les exposants suffisent.",
          "$a^m \\times a^n = a^{m+n}$, puis $\\dfrac{a^m}{a^n} = a^{m-n}$.",
          `Haut : $a^{${p}} \\times a^{${q}} = a^{${p + q}}$. Puis $\\dfrac{a^{${p + q}}}{a^{${r}}} = a^{${p + q} - ${r}}$.`,
          `$\\dfrac{a^{${p}} \\times a^{${q}}}{a^{${r}}} = a^{${n}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_compose_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_expression_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par la parenthèse : l'exposant d'une puissance de puissance se multiplie.",
    tags: ["seconde", "maths", "puissances", "expression_composee", "template"],
    generate: () => {
      const r = randomInt(2, 5);
      const s = randomInt(2, 4);
      const t = randomInt(2, 7);
      const n = r * s + t;
      const correct = `$a^{${n}}$`;
      const choices = makeChoices(correct, [
        `$a^{${r + s + t}}$`,
        `$a^{${r * s * t}}$`,
        `$a^{${r * s - t}}$`,
        `$a^{${r + s}}$`,
      ]);
      return {
        text: `Simplifie $\\left(a^{${r}}\\right)^{${s}} \\times a^{${t}}$ (avec $a \\neq 0$).`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux règles différentes se suivent : ne pas les mélanger.",
          "Dans la parenthèse on MULTIPLIE les exposants, dans le produit on les ADDITIONNE.",
          `$\\left(a^{${r}}\\right)^{${s}} = a^{${r * s}}$, puis $a^{${r * s}} \\times a^{${t}} = a^{${r * s} + ${t}}$.`,
          `$\\left(a^{${r}}\\right)^{${s}} \\times a^{${t}} = a^{${n}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_compose_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_expression_composee",
    difficulty: 5,
    theme: "neutral",
    hint: "Un exposant négatif se manipule comme les autres : $-4 - (-6) = +2$.",
    tags: ["seconde", "maths", "puissances", "expression_composee", "template"],
    generate: () => {
      const base = [2, 3, 5, 10][randomInt(0, 3)];
      const p = -randomInt(2, 7);
      const r = randomInt(2, 4);
      const s = -randomInt(2, 3);
      const n = p - r * s;
      const correct = `$${base}^{${n}}$`;
      const choices = makeChoices(correct, [
        `$${base}^{${p + r * s}}$`,
        `$${base}^{${-n}}$`,
        `$${base}^{${p - r - s}}$`,
        `$${base}^{${p * r * s}}$`,
      ]);
      return {
        text: `Écrire $\\dfrac{${base}^{${p}}}{\\left(${base}^{${r}}\\right)^{${s}}}$ sous la forme $${base}^{n}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Les règles ne changent pas quand les exposants sont négatifs.",
          "On réduit d'abord le dénominateur, puis on soustrait.",
          `Dénominateur : $\\left(${base}^{${r}}\\right)^{${s}} = ${base}^{${r} \\times (${s})} = ${base}^{${r * s}}$.\n\n` +
            `Quotient : $${base}^{${p} - (${r * s})} = ${base}^{${n}}$.`,
          `$\\dfrac{${base}^{${p}}}{\\left(${base}^{${r}}\\right)^{${s}}} = ${base}^{${n}}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_puiss_compose_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_expression_composee",
    difficulty: 3,
    theme: "neutral",
    text: "Dans $\\dfrac{7^4 \\times 7^{-5}}{\\left(7^3\\right)^4}$, par quoi commence-t-on ?",
    format: "qcm",
    choices: [
      "par réduire le numérateur et le dénominateur séparément",
      "par calculer $7^4$, $7^{-5}$ et $7^3$",
      "par simplifier le $7$ du haut avec celui du bas",
      "par additionner tous les exposants",
    ],
    expected: ["par réduire le numérateur et le dénominateur séparément"],
    comparator: "mcq_exact",
    hint: "On ne calcule jamais la valeur : la base est la même partout.",
    explanation: exp(
      "Une expression composée se réduit par étages.",
      "On écrit le haut sous la forme $7^{\\ldots}$, puis le bas, et seulement à la fin on soustrait.",
      "Calculer $7^4 = 2401$ ne sert à rien : la réponse attendue est une puissance de $7$, pas un nombre.",
      "On réduit le numérateur et le dénominateur séparément."
    ),
    tags: ["seconde", "maths", "puissances", "expression_composee", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_compose_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_expression_composee",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève écrit $\\dfrac{a^5 \\times a^3}{a^2} = a^{15/2}$. Quelle est son erreur ?",
    format: "qcm",
    choices: [
      "il a multiplié les exposants au lieu de les additionner",
      "il a oublié la condition $a \\neq 0$",
      "il a soustrait au lieu d'additionner",
      "il n'y a pas d'erreur",
    ],
    expected: ["il a multiplié les exposants au lieu de les additionner"],
    comparator: "mcq_exact",
    hint: "Il a fait $5 \\times 3$, puis divisé par $2$.",
    explanation: exp(
      "C'est l'erreur la plus fréquente : appliquer la règle de la parenthèse au produit.",
      "Dans $a^m \\times a^n$ on ADDITIONNE, et dans le quotient on SOUSTRAIT — on ne divise jamais les exposants.",
      "Le calcul juste : $\\dfrac{a^5 \\times a^3}{a^2} = \\dfrac{a^8}{a^2} = a^6$.",
      "Il a multiplié les exposants au lieu de les additionner."
    ),
    tags: ["seconde", "maths", "puissances", "expression_composee", "piege", "qcm"],
  },

  /* ============= PUISS_NOTATION_SCIENTIFIQUE (08/09/2026) =============
   *
   * Le mot « scientifique » n'apparaissait nulle part dans toute la seconde.
   * Le programme la reactive pourtant pour comparer des ordres de grandeur.
   * La difficulte reelle n'est pas la puissance de 10 : c'est la condition
   * 1 <= a < 10, que l'eleve oublie et qui rend « 45,3 x 10^3 » faux.
   */

  {
    kind: "template",
    id: "seconde_puiss_scientif_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_notation_scientifique",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul chiffre avant la virgule, et ce chiffre n'est pas $0$.",
    tags: ["seconde", "maths", "puissances", "notation_scientifique", "template"],
    generate: () => {
      const d1 = randomInt(1, 9);
      const d2 = randomInt(0, 9);
      const d3 = randomInt(1, 9);
      const n = randomInt(3, 7);
      const nombre = `${d1}${d2}${d3}${"0".repeat(n - 2)}`;
      const mantisse = `${d1},${d2}${d3}`;
      const correct = `$${mantisse} \\times 10^{${n}}$`;
      const choices = makeChoices(correct, [
        `$${d1}${d2},${d3} \\times 10^{${n - 1}}$`,
        `$${mantisse} \\times 10^{${n + 1}}$`,
        `$${mantisse} \\times 10^{-${n}}$`,
        `$0,${d1}${d2}${d3} \\times 10^{${n + 1}}$`,
      ]);
      return {
        text: `Écrire $${nombre}$ en notation scientifique.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La notation scientifique s'écrit $a \\times 10^n$ avec $1 \\leqslant a < 10$.",
          "On place la virgule après le premier chiffre, puis on compte de combien de rangs elle s'est déplacée.",
          `De $${nombre}$ à $${mantisse}$, la virgule recule de $${n}$ rangs : l'exposant est $${n}$.`,
          `$${nombre} = ${mantisse} \\times 10^{${n}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_scientif_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_notation_scientifique",
    difficulty: 4,
    theme: "neutral",
    hint: "Un nombre plus petit que $1$ a un exposant négatif.",
    tags: ["seconde", "maths", "puissances", "notation_scientifique", "template"],
    generate: () => {
      const d1 = randomInt(1, 9);
      const d2 = randomInt(0, 9);
      const d3 = randomInt(1, 9);
      const n = randomInt(2, 6);
      const nombre = `0,${"0".repeat(n - 1)}${d1}${d2}${d3}`;
      const mantisse = `${d1},${d2}${d3}`;
      const correct = `$${mantisse} \\times 10^{-${n}}$`;
      const choices = makeChoices(correct, [
        `$${mantisse} \\times 10^{${n}}$`,
        `$${mantisse} \\times 10^{-${n + 1}}$`,
        `$0,${d1}${d2}${d3} \\times 10^{-${n - 1}}$`,
        `$${mantisse} \\times 10^{-${n - 1}}$`,
      ]);
      return {
        text: `Écrire $${nombre}$ en notation scientifique.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre inférieur à $1$ s'écrit avec une puissance de $10$ négative.",
          "On avance la virgule jusqu'après le premier chiffre non nul et on compte les rangs.",
          `De $${nombre}$ à $${mantisse}$, la virgule avance de $${n}$ rangs : l'exposant est $-${n}$.`,
          `$${nombre} = ${mantisse} \\times 10^{-${n}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_scientif_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_notation_scientifique",
    difficulty: 4,
    theme: "neutral",
    hint: "Un seul chiffre avant la virgule, entre $1$ et $9$.",
    tags: ["seconde", "maths", "puissances", "notation_scientifique", "raisonnement", "template"],
    generate: () => {
      const d1 = randomInt(1, 9);
      const d2 = randomInt(1, 9);
      const n = randomInt(3, 8);
      const correct = `$${d1},${d2} \\times 10^{${n}}$`;
      // Les trois pieges sont les trois facons de rater la condition 1 <= a < 10 :
      // deux chiffres devant, un zero devant, une somme au lieu d'un produit.
      const choices = makeChoices(correct, [
        `$${d1}${d2} \\times 10^{${n - 1}}$`,
        `$0,${d1}${d2} \\times 10^{${n + 1}}$`,
        `$${d1},${d2} + 10^{${n}}$`,
      ]);
      return {
        text: "Parmi ces écritures, laquelle est en notation scientifique ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La notation scientifique impose $a \\times 10^n$ avec $1 \\leqslant a < 10$.",
          "On vérifie qu'il y a exactement un chiffre avant la virgule, et qu'il n'est pas $0$.",
          `$${d1}${d2}$ est trop grand, $0,${d1}${d2}$ est trop petit : seul $${d1},${d2}$ convient. Et il faut un produit, pas une somme.`,
          `La bonne écriture est $${d1},${d2} \\times 10^{${n}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_puiss_scientif_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_notation_scientifique",
    difficulty: 5,
    theme: "neutral",
    hint: "Réduis chaque écriture à la forme $a \\times 10^n$, puis compare les exposants.",
    tags: ["seconde", "maths", "puissances", "notation_scientifique", "template"],
    generate: () => {
      const n = randomInt(4, 9);
      const d = randomInt(2, 9);
      // Les deux nombres sont deliberement ecrits SOUS DES FORMES DIFFERENTES :
      // c'est ce qui rend la comparaison interessante, et ce que font les
      // sciences physiques quand elles comparent deux ordres de grandeur.
      const correct = `$${d} \\times 10^{${n}}$`;
      const choices = makeChoices(correct, [
        `$${d}00 \\times 10^{${n - 3}}$`,
        `$0,${d} \\times 10^{${n}}$`,
        `$${d} \\times 10^{${n - 1}}$`,
      ]);
      return {
        text: "Parmi ces quatre nombres, lequel est le plus grand ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer des ordres de grandeur, c'est ramener tout le monde à la même écriture.",
          "On met chaque nombre en notation scientifique, puis on compare les exposants avant les mantisses.",
          `$${d}00 \\times 10^{${n - 3}} = ${d} \\times 10^{${n - 1}}$, et $0,${d} \\times 10^{${n}} = ${d} \\times 10^{${n - 1}}$ : ces deux-là sont égaux et dix fois plus petits.`,
          `Le plus grand est $${d} \\times 10^{${n}}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_puiss_scientif_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_notation_scientifique",
    difficulty: 2,
    theme: "neutral",
    text: "Un nombre en notation scientifique s'écrit $a \\times 10^n$. Quelle condition doit vérifier $a$ ?",
    format: "qcm",
    choices: [
      "$1 \\leqslant a < 10$",
      "$0 < a < 1$",
      "$a$ est un entier",
      "$0 \\leqslant a \\leqslant 10$",
    ],
    expected: ["$1 \\leqslant a < 10$"],
    comparator: "mcq_exact",
    hint: "Exactement un chiffre avant la virgule, et ce n'est pas $0$.",
    explanation: exp(
      "C'est cette condition qui rend l'écriture UNIQUE.",
      "Sans elle, $4530$ s'écrirait $4,53 \\times 10^3$, $45,3 \\times 10^2$, $0,453 \\times 10^4$… autant d'écritures que l'on veut.",
      "$1 \\leqslant a < 10$ n'en laisse qu'une seule.",
      "Il faut $1 \\leqslant a < 10$."
    ),
    tags: ["seconde", "maths", "puissances", "notation_scientifique", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_puiss_scientif_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId: "puiss_notation_scientifique",
    difficulty: 3,
    theme: "neutral",
    text: "La masse d'un atome d'hydrogène vaut environ $0,00000000000000000000000167$ kg. Quel est son ordre de grandeur ?",
    format: "qcm",
    choices: ["$10^{-27}$ kg", "$10^{-24}$ kg", "$10^{-21}$ kg", "$10^{27}$ kg"],
    expected: ["$10^{-27}$ kg"],
    comparator: "mcq_exact",
    hint: "Compte les zéros après la virgule avant d'arriver au $1$.",
    explanation: exp(
      "L'ordre de grandeur est la puissance de $10$ de l'écriture scientifique.",
      "On écrit d'abord le nombre sous la forme $a \\times 10^n$, puis on ne garde que $10^n$.",
      "Il y a $26$ zéros après la virgule : la masse vaut $1,67 \\times 10^{-27}$ kg.",
      "Son ordre de grandeur est $10^{-27}$ kg — et c'est bien pour cela qu'on ne l'écrit jamais en toutes lettres."
    ),
    tags: ["seconde", "maths", "puissances", "notation_scientifique", "reel", "qcm"],
  },
];
