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
      const choices = [correct, `$a^{${m * n}}$`, `$a^{${m + n + 1}}$`, `$a^{${Math.abs(m - n)}}$`];
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
      const choices = [correct, `$x^{${m + n}}$`, `$x^{${m}}$`, `$x^{${m * n + 2}}$`];
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
      const choices = [correct, `$-${denom}$`, `$\\dfrac{1}{${base * n}}$`, `$${denom}$`];
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
];
