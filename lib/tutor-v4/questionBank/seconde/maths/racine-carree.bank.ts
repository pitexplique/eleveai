// lib/tutor-v4/questionBank/seconde/maths/racine-carree.bank.ts
//
// Chapitre : Racine carree (notion racine_carree_2de)
//
// REGLE DE DESIGN (option D) :
//   - fixed   -> valeurs remarquables / cas de depart / definitions
//   - template (qcm + short) -> le gros du raisonnement, valeurs variees
//   - QCM aussi pour le raisonnement ("a quoi sert", "pourquoi")
//   - short uniquement pour reponse NUMERIQUE courte
//   - pas de format "open"
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   racine_calcul        — Calculer une racine carree
//   racine_carre_de_a2   — Utiliser racine de a^2 = |a|
//   racine_produit       — Utiliser racine de ab = racine de a x racine de b
//   racine_simplification— Simplifier une racine (racine de 50 = 5 racine de 2)

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: readonly T[]): T[] {
  const copie = [...arr];
  for (let i = copie.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/**
 * Quatre propositions garanties DISTINCTES.
 * ⛔ Un distracteur peut rejoindre la bonne reponse selon le tirage : avec
 * a = b = 2, le produit a x b vaut 4 comme la somme a + b, et le QCM offrait
 * deux fois la meme case.
 */
function choixDistincts(correct: string, voulus: string[], secours: string[]): string[] {
  const vus = new Set([correct]);
  const sortie = [correct];
  for (const c of [...voulus, ...secours]) {
    if (sortie.length === 4) break;
    if (!vus.has(c)) {
      vus.add(c);
      sortie.push(c);
    }
  }
  return shuffle(sortie);
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
    text: "Qu'est-ce que $\\sqrt{a}$ (avec $a \\ge 0$) ?",
    format: "qcm",
    choices: [
      "Le nombre positif dont le carré vaut $a$",
      "La moitié de $a$",
      "Le nombre qu'on multiplie par $2$ pour avoir $a$",
      "L'opposé de $a$",
    ],
    expected: ["Le nombre positif dont le carré vaut $a$"],
    comparator: "mcq_exact",
    hint: "La racine carrée est liée au carré.",
    explanation: exp(
      "La racine carrée est l'opération inverse du carré (côté positif).",
      "On cherche le nombre positif qui, élevé au carré, redonne $a$.",
      "Par exemple $\\sqrt{25} = 5$ car $5^2 = 25$.",
      "$\\sqrt{a}$ est le nombre positif dont le carré vaut $a$."
    ),
    tags: ["seconde", "maths", "racine", "calcul", "raisonnement", "qcm"],
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
    text: "Combien vaut $\\sqrt{64}$ ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "$8^2 = 64$.",
    explanation: exp(
      "On cherche le nombre positif dont le carré vaut $64$.",
      "$8^2 = 64$.",
      "Donc $\\sqrt{64} = 8$.",
      "$\\sqrt{64} = 8$."
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
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi $\\sqrt{-4}$ n'existe-t-elle pas (dans les réels) ?",
    format: "qcm",
    choices: [
      "Parce qu'aucun carré n'est négatif",
      "Parce que $4$ est pair",
      "Parce que $-4$ est trop petit",
      "Parce que $\\sqrt{-4} = -2$",
    ],
    expected: ["Parce qu'aucun carré n'est négatif"],
    comparator: "mcq_exact",
    hint: "Un carré est toujours positif ou nul.",
    explanation: exp(
      "La racine carrée cherche un nombre dont le carré vaut $-4$.",
      "Or pour tout réel $x$, $x^2 \\ge 0$.",
      "Aucun carré ne peut valoir $-4$.",
      "$\\sqrt{-4}$ n'existe pas car aucun carré n'est négatif."
    ),
    tags: ["seconde", "maths", "racine", "calcul", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_racine_calcul_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_calcul",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le nombre positif dont le carré donne le nombre sous la racine.",
    tags: ["seconde", "maths", "racine", "calcul", "template"],
    generate: () => {
      const k = randomInt(2, 12);
      return {
        text: `Combien vaut $\\sqrt{${k * k}}$ ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: exp(
          "On cherche le nombre positif dont le carré vaut le nombre sous la racine.",
          `$${k}^2 = ${k * k}$.`,
          `Donc $\\sqrt{${k * k}} = ${k}$.`,
          `$\\sqrt{${k * k}} = ${k}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_racine_calcul_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour $a \\ge 0$, $(\\sqrt{a})^2 = a$.",
    tags: ["seconde", "maths", "racine", "calcul", "template"],
    generate: () => {
      const n = randomInt(2, 15);
      return {
        text: `Combien vaut $(\\sqrt{${n}})^2$ ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Le carré d'une racine carrée redonne le nombre de départ (pour un nombre positif).",
          `On applique $(\\sqrt{a})^2 = a$.`,
          `$(\\sqrt{${n}})^2 = ${n}$.`,
          `$(\\sqrt{${n}})^2 = ${n}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_racine_calcul_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Encadre par deux carrés parfaits.",
    tags: ["seconde", "maths", "racine", "calcul", "template"],
    generate: () => {
      const k = randomInt(2, 8);
      const n = randomInt(k * k + 1, (k + 1) * (k + 1) - 1);
      const correct = `entre $${k}$ et $${k + 1}$`;
      const choices = [
        correct,
        `entre $${k - 1}$ et $${k}$`,
        `entre $${k + 1}$ et $${k + 2}$`,
        `entre $${k * k}$ et $${(k + 1) * (k + 1)}$`,
      ];
      return {
        text: `Entre quels entiers consécutifs se situe $\\sqrt{${n}}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On encadre le nombre sous la racine par deux carrés parfaits.",
          `$${k * k} < ${n} < ${(k + 1) * (k + 1)}$, donc $\\sqrt{${k * k}} < \\sqrt{${n}} < \\sqrt{${(k + 1) * (k + 1)}}$.`,
          `$${k} < \\sqrt{${n}} < ${k + 1}$.`,
          `$\\sqrt{${n}}$ est entre $${k}$ et $${k + 1}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_racine_calcul_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_calcul",
    difficulty: 2,
    theme: "neutral",
    hint: "Une racine carrée n'est jamais négative.",
    tags: ["seconde", "maths", "racine", "calcul", "raisonnement", "template"],
    generate: () => {
      const correct = "positive ou nulle";
      const choices = ["positive ou nulle", "toujours strictement positive", "négative", "égale au nombre de départ"];
      return {
        text: "Une racine carrée $\\sqrt{a}$ (avec $a \\ge 0$) est toujours :",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Par définition, la racine carrée désigne le résultat positif.",
          "Et $\\sqrt{0} = 0$.",
          "Donc $\\sqrt{a} \\ge 0$ pour tout $a \\ge 0$.",
          "Une racine carrée est positive ou nulle."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_racine_calcul_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_calcul",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{0}$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$0^2 = 0$.",
    explanation: exp(
      "La racine carrée de $0$ est $0$.",
      "$0^2 = 0$.",
      "Donc $\\sqrt{0} = 0$.",
      "$\\sqrt{0} = 0$."
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
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{1}$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$1^2 = 1$.",
    explanation: exp(
      "On cherche le nombre positif dont le carré vaut $1$.",
      "$1^2 = 1$.",
      "Donc $\\sqrt{1} = 1$.",
      "$\\sqrt{1} = 1$."
    ),
    tags: ["seconde", "maths", "racine", "calcul", "short"],
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
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi écrit-on $\\sqrt{a^2} = |a|$ et non $\\sqrt{a^2} = a$ ?",
    format: "qcm",
    choices: [
      "Parce qu'une racine est positive, alors que $a$ peut être négatif",
      "Parce que $a^2$ est toujours pair",
      "Parce que $|a|$ est plus simple à écrire",
      "Parce que $a^2 = 2a$",
    ],
    expected: ["Parce qu'une racine est positive, alors que $a$ peut être négatif"],
    comparator: "mcq_exact",
    hint: "Teste avec $a = -3$.",
    explanation: exp(
      "La racine carrée renvoie toujours un résultat positif ou nul.",
      "Si $a = -3$ : $\\sqrt{(-3)^2} = \\sqrt{9} = 3$, pas $-3$.",
      "Donc le résultat est $|a|$, qui est toujours positif.",
      "Car la racine est positive alors que $a$ peut être négatif."
    ),
    tags: ["seconde", "maths", "racine", "carre_de_a2", "raisonnement", "qcm"],
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
      "Quand $a < 0$, $|a| = -a$ (l'opposé, qui est positif).",
      "Donc $\\sqrt{a^2} = -a$.",
      "Pour $a < 0$, $\\sqrt{a^2} = -a$."
    ),
    tags: ["seconde", "maths", "racine", "carre_de_a2", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_racine_a2_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_carre_de_a2",
    difficulty: 2,
    theme: "neutral",
    hint: "$\\sqrt{(-b)^2} = |-b| = b$.",
    tags: ["seconde", "maths", "racine", "carre_de_a2", "template"],
    generate: () => {
      const b = randomInt(2, 12);
      return {
        text: `Combien vaut $\\sqrt{(-${b})^2}$ ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $\\sqrt{a^2} = |a|$.",
          `Ici $a = -${b}$, donc $\\sqrt{(-${b})^2} = |-${b}|$.`,
          `$|-${b}| = ${b}$.`,
          `$\\sqrt{(-${b})^2} = ${b}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_racine_a2_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_carre_de_a2",
    difficulty: 2,
    theme: "neutral",
    hint: "$\\sqrt{b^2} = b$ pour $b > 0$.",
    tags: ["seconde", "maths", "racine", "carre_de_a2", "template"],
    generate: () => {
      const b = randomInt(2, 12);
      return {
        text: `Combien vaut $\\sqrt{${b}^2}$ ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $\\sqrt{a^2} = |a|$.",
          `Ici $a = ${b}$, positif, donc $|a| = ${b}$.`,
          `$\\sqrt{${b}^2} = ${b}$.`,
          `$\\sqrt{${b}^2} = ${b}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_racine_a2_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_carre_de_a2",
    difficulty: 3,
    theme: "neutral",
    hint: "On applique $\\sqrt{a^2} = |a|$ à chaque terme.",
    tags: ["seconde", "maths", "racine", "carre_de_a2", "template"],
    generate: () => {
      const b = randomInt(2, 8);
      const c = randomInt(2, 8);
      const valeur = b + c;
      return {
        text: `Combien vaut $\\sqrt{(-${b})^2} + \\sqrt{${c}^2}$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $\\sqrt{a^2} = |a|$ à chaque terme.",
          `$\\sqrt{(-${b})^2} = ${b}$ et $\\sqrt{${c}^2} = ${c}$.`,
          `$${b} + ${c} = ${valeur}$.`,
          `Le résultat est $${valeur}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_racine_a2_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_carre_de_a2",
    difficulty: 3,
    theme: "neutral",
    hint: "Le résultat doit être positif.",
    tags: ["seconde", "maths", "racine", "carre_de_a2", "raisonnement", "template"],
    generate: () => {
      const correct = "$|a|$";
      const choices = ["$|a|$", "$a$", "$-a$", "$a^2$"];
      return {
        text: "Pour un réel $a$ de signe inconnu, $\\sqrt{a^2}$ est égal à :",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Comme on ignore le signe de $a$, on garde la valeur absolue.",
          "$\\sqrt{a^2}$ doit être positif ou nul.",
          "C'est exactement $|a|$.",
          "$\\sqrt{a^2} = |a|$."
        ),
      };
    },
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
      "Pour des réels positifs, la racine se distribue sur un produit.",
      "On applique $\\sqrt{ab} = \\sqrt{a}\\times\\sqrt{b}$.",
      "Attention : ce n'est PAS vrai pour une somme.",
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
    difficulty: 2,
    theme: "neutral",
    text: "« Pour tous réels positifs $a$ et $b$, $\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b}$. » Est-ce vrai ?",
    format: "qcm",
    choices: ["Faux", "Vrai", "Vrai seulement si $a = b$", "Vrai seulement si $a = 0$"],
    expected: ["Faux"],
    comparator: "mcq_exact",
    hint: "Teste avec $a = b = 4$.",
    explanation: exp(
      "La racine se distribue sur un produit, PAS sur une somme.",
      "Test : $\\sqrt{4+4} = \\sqrt{8} \\approx 2{,}83$ mais $\\sqrt{4}+\\sqrt{4} = 4$.",
      "$2{,}83 \\neq 4$.",
      "C'est faux : $\\sqrt{a+b} \\neq \\sqrt{a} + \\sqrt{b}$ en général."
    ),
    tags: ["seconde", "maths", "racine", "produit", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_produit_fixed_3",
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
      "$\\sqrt{9}\\times\\sqrt{16} = 3 \\times 4$.",
      "$= 12$.",
      "$\\sqrt{9 \\times 16} = 12$."
    ),
    tags: ["seconde", "maths", "racine", "produit", "short"],
  },

  {
    kind: "template",
    id: "seconde_racine_produit_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_produit",
    difficulty: 3,
    theme: "neutral",
    hint: "Racine d'un produit = produit des racines.",
    tags: ["seconde", "maths", "racine", "produit", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(2, 6);
      const valeur = a * b;
      return {
        text: `Combien vaut $\\sqrt{${a * a} \\times ${b * b}}$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "On utilise $\\sqrt{ab} = \\sqrt{a}\\times\\sqrt{b}$.",
          `$\\sqrt{${a * a}}\\times\\sqrt{${b * b}} = ${a} \\times ${b}$.`,
          `$= ${valeur}$.`,
          `$\\sqrt{${a * a} \\times ${b * b}} = ${valeur}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_racine_produit_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_produit",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\sqrt{a}\\times\\sqrt{b} = \\sqrt{ab}$.",
    tags: ["seconde", "maths", "racine", "produit", "template"],
    generate: () => {
      const pairs = [
        [2, 8],
        [2, 18],
        [3, 12],
        [5, 20],
        [2, 32],
        [3, 27],
      ];
      const [a, b] = pairs[randomInt(0, pairs.length - 1)];
      const valeur = Math.sqrt(a * b);
      return {
        text: `Combien vaut $\\sqrt{${a}} \\times \\sqrt{${b}}$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "On regroupe sous une seule racine.",
          `$\\sqrt{${a}}\\times\\sqrt{${b}} = \\sqrt{${a} \\times ${b}} = \\sqrt{${a * b}}$.`,
          `$\\sqrt{${a * b}} = ${valeur}$.`,
          `$\\sqrt{${a}} \\times \\sqrt{${b}} = ${valeur}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_racine_produit_fixed_4",
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
      "On regroupe les racines : $\\sqrt{2}\\times\\sqrt{2} = 2$.",
      "On calcule $3 \\times 2$.",
      "$= 6$.",
      "$3\\sqrt{2} \\times \\sqrt{2} = 6$."
    ),
    tags: ["seconde", "maths", "racine", "produit", "short"],
  },

  {
    kind: "template",
    id: "seconde_racine_produit_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_produit",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\sqrt{n} \\times \\sqrt{n} = n$.",
    tags: ["seconde", "maths", "racine", "produit", "template"],
    generate: () => {
      const k = randomInt(2, 6);
      const n = randomInt(2, 5);
      const valeur = k * n;
      return {
        text: `Combien vaut $${k}\\sqrt{${n}} \\times \\sqrt{${n}}$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "On regroupe les racines identiques.",
          `$\\sqrt{${n}}\\times\\sqrt{${n}} = ${n}$.`,
          `$${k} \\times ${n} = ${valeur}$.`,
          `$${k}\\sqrt{${n}} \\times \\sqrt{${n}} = ${valeur}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_racine_produit_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_produit",
    difficulty: 2,
    theme: "neutral",
    hint: "La racine se distribue sur un produit, pas sur une somme.",
    tags: ["seconde", "maths", "racine", "produit", "raisonnement", "template"],
    generate: () => {
      const correct = "$\\sqrt{a} \\times \\sqrt{b}$";
      const choices = ["$\\sqrt{a} \\times \\sqrt{b}$", "$\\sqrt{a} + \\sqrt{b}$", "$\\sqrt{a+b}$", "$a\\sqrt{b}$"];
      return {
        text: "Pour $a \\ge 0$ et $b \\ge 0$, $\\sqrt{ab}$ est égal à :",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La racine d'un produit est le produit des racines.",
          "On applique la propriété sur le PRODUIT (pas la somme).",
          "$\\sqrt{ab} = \\sqrt{a}\\times\\sqrt{b}$.",
          "$\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$."
        ),
      };
    },
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
    difficulty: 2,
    theme: "neutral",
    text: "Pour simplifier une racine carrée, que cherche-t-on dans le nombre sous la racine ?",
    format: "qcm",
    choices: [
      "Le plus grand carré parfait qui le divise",
      "Le plus grand nombre premier",
      "Un multiple de $10$",
      "Sa moitié",
    ],
    expected: ["Le plus grand carré parfait qui le divise"],
    comparator: "mcq_exact",
    hint: "Carré parfait : $4, 9, 16, 25, \\dots$",
    explanation: exp(
      "Simplifier une racine, c'est en sortir un facteur entier.",
      "On cherche un carré parfait en facteur (qui sort de la racine).",
      "Par ex. $\\sqrt{12} = \\sqrt{4 \\times 3} = 2\\sqrt{3}$.",
      "On cherche le plus grand carré parfait qui le divise."
    ),
    tags: ["seconde", "maths", "racine", "simplification", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_simpl_fixed_3",
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
    hint: "$12 = 4 \\times 3$.",
    explanation: exp(
      "On extrait le carré parfait.",
      "$12 = 4 \\times 3$, donc $\\sqrt{12} = \\sqrt{4}\\times\\sqrt{3}$.",
      "$\\sqrt{4} = 2$, donc $\\sqrt{12} = 2\\sqrt{3}$.",
      "$\\sqrt{12} = 2\\sqrt{3}$."
    ),
    tags: ["seconde", "maths", "racine", "simplification", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_simpl_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_somme",
    difficulty: 4,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{18} + \\sqrt{2}$ ?",
    format: "qcm",
    choices: ["$4\\sqrt{2}$", "$\\sqrt{20}$", "$3\\sqrt{2}$", "$2\\sqrt{5}$"],
    expected: ["$4\\sqrt{2}$"],
    comparator: "mcq_exact",
    hint: "Simplifie d'abord $\\sqrt{18} = 3\\sqrt{2}$.",
    explanation: exp(
      "On simplifie pour faire apparaître la même racine.",
      "$\\sqrt{18} = 3\\sqrt{2}$, donc $\\sqrt{18} + \\sqrt{2} = 3\\sqrt{2} + \\sqrt{2}$.",
      "$3\\sqrt{2} + 1\\sqrt{2} = 4\\sqrt{2}$.",
      "$\\sqrt{18} + \\sqrt{2} = 4\\sqrt{2}$."
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

  {
    kind: "template",
    id: "seconde_racine_simpl_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_simplification",
    difficulty: 3,
    theme: "neutral",
    hint: "racine(k^2 * 3) = k racine(3).",
    tags: ["seconde", "maths", "racine", "simplification", "template"],
    generate: () => {
      const k = randomInt(2, 5);
      const sous = k * k * 3;
      const correct = `$${k}\\sqrt{3}$`;
      const choices = [correct, `$${k}\\sqrt{2}$`, `$${k * k}\\sqrt{3}$`, `$\\sqrt{${sous}}$`];
      return {
        text: `Quelle est la forme simplifiée de $\\sqrt{${sous}}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On extrait le plus grand carré parfait sous la racine.",
          `$${sous} = ${k * k} \\times 3$, donc $\\sqrt{${sous}} = \\sqrt{${k * k}}\\times\\sqrt{3}$.`,
          `$\\sqrt{${k * k}} = ${k}$, donc $\\sqrt{${sous}} = ${k}\\sqrt{3}$.`,
          `$\\sqrt{${sous}} = ${k}\\sqrt{3}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_racine_simpl_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_simplification",
    difficulty: 4,
    theme: "neutral",
    hint: "racine(k^2 * 5) = k racine(5).",
    tags: ["seconde", "maths", "racine", "simplification", "template"],
    generate: () => {
      const k = randomInt(2, 4);
      const sous = k * k * 5;
      const correct = `$${k}\\sqrt{5}$`;
      const choices = [correct, `$${k}\\sqrt{2}$`, `$${k * k}\\sqrt{5}$`, `$\\sqrt{${sous}}$`];
      return {
        text: `Quelle est la forme simplifiée de $\\sqrt{${sous}}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On extrait le plus grand carré parfait sous la racine.",
          `$${sous} = ${k * k} \\times 5$, donc $\\sqrt{${sous}} = \\sqrt{${k * k}}\\times\\sqrt{5}$.`,
          `$\\sqrt{${k * k}} = ${k}$, donc $\\sqrt{${sous}} = ${k}\\sqrt{5}$.`,
          `$\\sqrt{${sous}} = ${k}\\sqrt{5}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_racine_simpl_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_simplification",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme simplifiée de $\\sqrt{8}$ ?",
    format: "qcm",
    choices: ["$2\\sqrt{2}$", "$4\\sqrt{2}$", "$2\\sqrt{4}$", "$\\sqrt{8}$"],
    expected: ["$2\\sqrt{2}$"],
    comparator: "mcq_exact",
    hint: "$8 = 4 \\times 2$.",
    explanation: exp(
      "On extrait le carré parfait.",
      "$8 = 4 \\times 2$, donc $\\sqrt{8} = \\sqrt{4}\\times\\sqrt{2}$.",
      "$\\sqrt{4} = 2$, donc $\\sqrt{8} = 2\\sqrt{2}$.",
      "$\\sqrt{8} = 2\\sqrt{2}$."
    ),
    tags: ["seconde", "maths", "racine", "simplification", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_simpl_fixed_6",
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

  // ============================================================
  // racine_somme — on n'additionne QUE des radicaux identiques
  // ============================================================
  // ⛔ L'erreur imite la regle du PRODUIT, qui elle est vraie : √2 × √3 = √6,
  // donc √2 + √3 « devrait » faire √5. Plusieurs items cassent ce parallele.

  {
    kind: "fixed",
    id: "seconde_racine_somme_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_somme",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $\\sqrt{2} + \\sqrt{3}$ ?",
    format: "qcm",
    choices: [
      "on ne peut pas simplifier : cela reste $\\sqrt{2} + \\sqrt{3}$",
      "$\\sqrt{5}$",
      "$\\sqrt{6}$",
      "$2\\sqrt{5}$",
    ],
    expected: ["on ne peut pas simplifier : cela reste $\\sqrt{2} + \\sqrt{3}$"],
    comparator: "mcq_exact",
    hint: "Les deux radicaux sont-ils les mêmes ?",
    explanation: exp(
      "On n'additionne que des racines PORTANT LE MÊME NOMBRE sous le radical.",
      "On compare ce qui est sous les racines : ici $2$ et $3$, qui diffèrent.",
      "Rien ne permet donc de les regrouper : la somme reste telle quelle.",
      "⚠️ $\\sqrt{2} + \\sqrt{3} \\neq \\sqrt{5}$. Vérification : $\\sqrt{2} \\approx 1{,}41$ et $\\sqrt{3} \\approx 1{,}73$, soit environ $3{,}14$ — alors que $\\sqrt{5} \\approx 2{,}24$."
    ),
    tags: ["seconde", "maths", "racine", "somme", "piege", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_somme_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_somme",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi $\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}$ fonctionne-t-il, alors que la même règle est FAUSSE pour l'addition ?",
    format: "qcm",
    choices: [
      "la racine carrée respecte le produit, mais pas la somme",
      "elle respecte les deux, mais on l'écrit autrement",
      "c'est une convention arbitraire",
      "la règle du produit est fausse aussi",
    ],
    expected: ["la racine carrée respecte le produit, mais pas la somme"],
    comparator: "mcq_exact",
    hint: "Teste sur des nombres simples : $\\sqrt{9} + \\sqrt{16}$ vaut-il $\\sqrt{25}$ ?",
    explanation: exp(
      "La racine carrée se distribue sur le PRODUIT, jamais sur la SOMME.",
      "On le vérifie sur des carrés parfaits, où tout se calcule.",
      "$\\sqrt{9} \\times \\sqrt{16} = 3 \\times 4 = 12 = \\sqrt{144}$ ✓. Mais $\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$, alors que $\\sqrt{25} = 5$.",
      "C'est précisément parce que la règle du produit EST vraie que l'erreur sur la somme est si tentante."
    ),
    tags: ["seconde", "maths", "racine", "somme", "piege", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_somme_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_somme",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi peut-on comparer $\\sqrt{2} + 3\\sqrt{2}$ pour le calculer ?",
    format: "qcm",
    choices: [
      "à $x + 3x$ : le radical se comporte comme une lettre",
      "à $x \\times 3x$",
      "à $2 + 3 \\times 2$",
      "à rien : c'est un cas particulier",
    ],
    expected: ["à $x + 3x$ : le radical se comporte comme une lettre"],
    comparator: "mcq_exact",
    hint: "Remplace $\\sqrt{2}$ par $x$ et regarde ce qui reste.",
    explanation: exp(
      "Un radical identique se traite comme une inconnue : on additionne les coefficients.",
      "On pose $x = \\sqrt{2}$ et on réécrit la somme.",
      "$\\sqrt{2} + 3\\sqrt{2}$ devient $x + 3x = 4x$, soit $4\\sqrt{2}$.",
      "Le radical joue le rôle d'une lettre — c'est la même règle que le calcul littéral, pas une nouvelle."
    ),
    tags: ["seconde", "maths", "racine", "somme", "methode", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_racine_somme_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_somme",
    difficulty: 3,
    theme: "neutral",
    hint: "Même radical : on additionne les coefficients.",
    tags: ["seconde", "maths", "racine", "somme", "template", "qcm"],
    generate: () => {
      const k = [2, 3, 5, 6, 7][randomInt(0, 4)];
      const a = randomInt(2, 6);
      const b = randomInt(2, 6);
      const correct = `$${a + b}\\sqrt{${k}}$`;
      return {
        text: `Combien vaut $${a}\\sqrt{${k}} + ${b}\\sqrt{${k}}$ ?`,
        format: "qcm",
        choices: choixDistincts(
          correct,
          [
            `$${a * b}\\sqrt{${k}}$`,
            `$${a + b}\\sqrt{${2 * k}}$`,
            `$\\sqrt{${(a + b) * k}}$`,
          ],
          [`$${a + b}$`, `$${a + b + 1}\\sqrt{${k}}$`]
        ),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux radicaux identiques s'additionnent par leurs coefficients.",
          `On garde $\\sqrt{${k}}$ et on additionne $${a}$ et $${b}$.`,
          `$${a} + ${b} = ${a + b}$, donc le résultat est $${a + b}\\sqrt{${k}}$.`,
          `⚠️ Le nombre SOUS le radical ne change pas : ce n'est ni $\\sqrt{${2 * k}}$, ni $\\sqrt{${(a + b) * k}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_racine_somme_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_somme",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare ce qui est SOUS les deux radicaux.",
    tags: ["seconde", "maths", "racine", "somme", "piege", "template", "qcm"],
    generate: () => {
      const paires = [
        [2, 3],
        [3, 5],
        [2, 7],
        [5, 6],
        [3, 7],
        [2, 5],
      ];
      const [u, v] = paires[randomInt(0, paires.length - 1)];
      const correct = "on ne peut pas simplifier";
      return {
        text: `Combien vaut $\\sqrt{${u}} + \\sqrt{${v}}$ ?`,
        format: "qcm",
        choices: [
          correct,
          `$\\sqrt{${u + v}}$`,
          `$\\sqrt{${u * v}}$`,
          `$2\\sqrt{${u + v}}$`,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On n'additionne que des racines portant le même nombre sous le radical.",
          `On compare : sous les racines, $${u}$ et $${v}$ diffèrent.`,
          `Aucun regroupement n'est possible, et $\\sqrt{${u}} + \\sqrt{${v}} \\neq \\sqrt{${u + v}}$.`,
          `La somme reste $\\sqrt{${u}} + \\sqrt{${v}}$ — c'est une réponse complète, pas un échec.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_racine_somme_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_somme",
    difficulty: 5,
    theme: "neutral",
    hint: "Simplifie CHAQUE racine d'abord : le radical commun apparaîtra.",
    tags: ["seconde", "maths", "racine", "somme", "simplification", "template", "qcm"],
    generate: () => {
      const k = [2, 3, 5][randomInt(0, 2)];
      const a = randomInt(2, 5);
      const b = randomInt(2, 5);
      const correct = `$${a + b}\\sqrt{${k}}$`;
      return {
        text: `Combien vaut $\\sqrt{${a * a * k}} + \\sqrt{${b * b * k}}$ ?`,
        format: "qcm",
        choices: [
          correct,
          `$\\sqrt{${a * a * k + b * b * k}}$`,
          `$${a + b}\\sqrt{${2 * k}}$`,
          "on ne peut pas simplifier",
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux racines qui semblent différentes peuvent cacher le MÊME radical.",
          "On simplifie chacune avant de conclure quoi que ce soit.",
          `$\\sqrt{${a * a * k}} = ${a}\\sqrt{${k}}$ et $\\sqrt{${b * b * k}} = ${b}\\sqrt{${k}}$ : le radical est le même.`,
          `On additionne alors les coefficients : $${a}\\sqrt{${k}} + ${b}\\sqrt{${k}} = ${a + b}\\sqrt{${k}}$. ⭐ On SIMPLIFIE avant d'additionner, jamais l'inverse.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_racine_somme_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_somme",
    difficulty: 5,
    theme: "neutral",
    hint: "Simplifie les deux, puis soustrais les coefficients.",
    tags: ["seconde", "maths", "racine", "somme", "soustraction", "template", "qcm"],
    generate: () => {
      const k = [2, 3, 5][randomInt(0, 2)];
      const b = randomInt(2, 4);
      const a = b + randomInt(1, 3);
      const correct = a - b === 1 ? `$\\sqrt{${k}}$` : `$${a - b}\\sqrt{${k}}$`;
      return {
        text: `Écrire $\\sqrt{${a * a * k}} - \\sqrt{${b * b * k}}$ sous la forme $a\\sqrt{${k}}$.`,
        format: "qcm",
        choices: [
          correct,
          `$\\sqrt{${a * a * k - b * b * k}}$`,
          `$${a + b}\\sqrt{${k}}$`,
          `$${a - b}\\sqrt{${a * a * k - b * b * k}}$`,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La soustraction suit la même règle que l'addition : même radical exigé.",
          "On simplifie chaque racine, puis on soustrait les coefficients.",
          `$\\sqrt{${a * a * k}} = ${a}\\sqrt{${k}}$ et $\\sqrt{${b * b * k}} = ${b}\\sqrt{${k}}$, donc la différence vaut $${a - b}\\sqrt{${k}}$.`,
          `${a - b === 1 ? `Un coefficient de $1$ ne s'écrit pas : la réponse est $\\sqrt{${k}}$.` : `La réponse est $${a - b}\\sqrt{${k}}$.`} C'est exactement le calcul demandé au contrôle commun.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_racine_somme_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_somme",
    difficulty: 4,
    theme: "neutral",
    hint: "Un seul des deux calculs se simplifie. Lequel ?",
    tags: ["seconde", "maths", "racine", "somme", "piege", "template", "qcm"],
    generate: () => {
      const k = [2, 3, 5][randomInt(0, 2)];
      const autre = k === 2 ? 3 : k === 3 ? 5 : 7;
      const correct = `$\\sqrt{${k}} + \\sqrt{${4 * k}}$`;
      return {
        text: `Laquelle de ces sommes peut se simplifier ?`,
        format: "qcm",
        choices: [
          correct,
          `$\\sqrt{${k}} + \\sqrt{${autre}}$`,
          `$\\sqrt{${k}} + \\sqrt{${autre + 1}}$`,
          "aucune",
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une somme se simplifie quand les deux racines cachent le même radical.",
          "On simplifie chaque terme avant de trancher.",
          `$\\sqrt{${4 * k}} = 2\\sqrt{${k}}$ : la première somme devient $\\sqrt{${k}} + 2\\sqrt{${k}} = 3\\sqrt{${k}}$. Les autres gardent des radicaux différents.`,
          `Une somme n'est simplifiable que si un des nombres sous racine contient un CARRÉ en facteur — ici $${4 * k} = 4 \\times ${k}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_racine_somme_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_somme",
    difficulty: 4,
    theme: "neutral",
    text: "Dans quel ordre faut-il travailler pour calculer $\\sqrt{75} - \\sqrt{48}$ ?",
    format: "qcm",
    choices: [
      "simplifier chaque racine, PUIS soustraire",
      "soustraire $75 - 48$, puis prendre la racine",
      "additionner les racines, puis simplifier",
      "aucun des deux ne se simplifie",
    ],
    expected: ["simplifier chaque racine, PUIS soustraire"],
    comparator: "mcq_exact",
    hint: "$\\sqrt{75}$ et $\\sqrt{48}$ cachent le même radical.",
    explanation: exp(
      "On ne peut soustraire que des radicaux identiques : il faut donc les faire apparaître.",
      "On cherche un carré en facteur dans chaque nombre, puis on soustrait les coefficients.",
      "$\\sqrt{75} = 5\\sqrt{3}$ et $\\sqrt{48} = 4\\sqrt{3}$, donc la différence vaut $\\sqrt{3}$.",
      "⚠️ Soustraire d'abord donnerait $\\sqrt{27}$, qui vaut $3\\sqrt{3}$ — un résultat FAUX."
    ),
    tags: ["seconde", "maths", "racine", "somme", "methode", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_racine_somme_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "racine_carree_2de",
    microId: "racine_somme",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $5\\sqrt{7} - \\sqrt{7}$ ?",
    format: "qcm",
    choices: ["$4\\sqrt{7}$", "$5$", "$4$", "$5\\sqrt{6}$"],
    expected: ["$4\\sqrt{7}$"],
    comparator: "mcq_exact",
    hint: "$\\sqrt{7}$ vaut $1\\sqrt{7}$.",
    explanation: exp(
      "Un radical écrit seul porte un coefficient sous-entendu de $1$.",
      "On l'écrit explicitement, puis on soustrait les coefficients.",
      "$5\\sqrt{7} - 1\\sqrt{7} = (5 - 1)\\sqrt{7} = 4\\sqrt{7}$.",
      "Le radical reste $\\sqrt{7}$ : oublier le coefficient $1$ fait souvent répondre $5$."
    ),
    tags: ["seconde", "maths", "racine", "somme", "qcm"],
  },
];
