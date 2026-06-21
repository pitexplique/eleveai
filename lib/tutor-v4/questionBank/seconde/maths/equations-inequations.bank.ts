// lib/tutor-v4/questionBank/seconde/maths/equations-inequations.bank.ts
//
// Chapitre : Equations et inequations du premier degre (equations_inequations_1er_degre)
//
// REGLE DE DESIGN (consigne user) :
//   - fixed   -> uniquement valeurs remarquables / cas de depart / definitions
//   - template (qcm + short) -> le gros du raisonnement, valeurs variees (anti-repetition)
//   - QCM aussi pour le raisonnement ("pourquoi", "a quoi sert")
//   - short uniquement pour une reponse NUMERIQUE courte
//   - pas de format "open" pour l'instant (clavier mobile)
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   equation_resoudre            — Resoudre une equation du premier degre
//   equation_probleme            — Mettre un probleme en equation
//   inequation_resoudre          — Resoudre une inequation du premier degre
//   inequation_intervalle        — Traduire une inequation en intervalle
//   comparer_difference_quotient — Comparer deux quantites (difference / quotient)

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

export const equationsInequationsBank: TutorBankItemV4[] = [
  /* ===================== EQUATION_RESOUDRE ===================== */

  // fixed : definition / cas de depart
  {
    kind: "fixed",
    id: "seconde_eq_res_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_resoudre",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie « résoudre une équation d'inconnue $x$ » ?",
    format: "qcm",
    choices: [
      "Trouver toutes les valeurs de $x$ qui rendent l'égalité vraie",
      "Développer l'expression",
      "Calculer la valeur de l'expression",
      "Factoriser l'expression",
    ],
    expected: ["Trouver toutes les valeurs de $x$ qui rendent l'égalité vraie"],
    comparator: "mcq_exact",
    hint: "Une solution rend l'égalité vraie.",
    explanation: exp(
      "Résoudre une équation, c'est chercher les valeurs de l'inconnue qui vérifient l'égalité.",
      "On distingue résoudre (équation) de calculer ou développer.",
      "La bonne définition concerne les valeurs qui rendent l'égalité vraie.",
      "Résoudre = trouver les valeurs de $x$ qui vérifient l'égalité."
    ),
    tags: ["seconde", "maths", "equations", "resoudre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_eq_res_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_resoudre",
    difficulty: 2,
    theme: "neutral",
    text: "Pour garder l'égalité, que peut-on faire à une équation ?",
    format: "qcm",
    choices: [
      "La même opération sur les deux membres",
      "Une opération sur un seul membre",
      "Changer un signe au hasard",
      "Supprimer un terme",
    ],
    expected: ["La même opération sur les deux membres"],
    comparator: "mcq_exact",
    hint: "Ce qui est fait à gauche doit être fait à droite.",
    explanation: exp(
      "Une équation reste vraie si on applique la même opération aux deux membres.",
      "On raisonne sur l'équilibre de l'égalité.",
      "Ajouter, soustraire, multiplier ou diviser doit se faire des deux côtés.",
      "On effectue la même opération sur les deux membres."
    ),
    tags: ["seconde", "maths", "equations", "resoudre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_eq_res_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_resoudre",
    difficulty: 2,
    theme: "neutral",
    text: "Résous l'équation $3x + 4 = 19$. Donne la valeur de $x$.",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Soustrais $4$, puis divise par $3$.",
    explanation: exp(
      "On isole $x$ par opérations successives.",
      "$3x + 4 = 19 \\Rightarrow 3x = 15$.",
      "$x = \\dfrac{15}{3} = 5$.",
      "$x = 5$."
    ),
    tags: ["seconde", "maths", "equations", "resoudre", "short"],
  },

  // templates : le gros du raisonnement
  {
    kind: "template",
    id: "seconde_eq_res_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_resoudre",
    difficulty: 2,
    theme: "neutral",
    hint: "Soustrais la constante, puis divise par le coefficient.",
    tags: ["seconde", "maths", "equations", "resoudre", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const x = randomInt(2, 9);
      const b = randomInt(1, 9);
      const c = a * x + b;
      return {
        text: `Résous l'équation $${a}x + ${b} = ${c}$. Donne la valeur de $x$.`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On isole $x$ par opérations successives.",
          `$${a}x + ${b} = ${c} \\Rightarrow ${a}x = ${c - b}$.`,
          `$x = \\dfrac{${c - b}}{${a}} = ${x}$.`,
          `$x = ${x}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_eq_res_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_resoudre",
    difficulty: 3,
    theme: "neutral",
    hint: "Soustrais la constante, puis divise.",
    tags: ["seconde", "maths", "equations", "resoudre", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const x = randomInt(2, 9);
      const b = randomInt(1, 9);
      const c = a * x - b;
      return {
        text: `Résous l'équation $${a}x - ${b} = ${c}$. Donne la valeur de $x$.`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On isole $x$.",
          `$${a}x - ${b} = ${c} \\Rightarrow ${a}x = ${c + b}$.`,
          `$x = \\dfrac{${c + b}}{${a}} = ${x}$.`,
          `$x = ${x}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_eq_res_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_resoudre",
    difficulty: 4,
    theme: "neutral",
    hint: "Regroupe les $x$ d'un côté, les nombres de l'autre.",
    tags: ["seconde", "maths", "equations", "resoudre", "template"],
    generate: () => {
      const x = randomInt(2, 8);
      const a = randomInt(3, 7);
      const d = randomInt(1, a - 1); // d < a pour garder a-d > 0
      const b = randomInt(1, 6);
      const e = (a - d) * x + b; // d x + e = a x + b  => e = (a-d)x + b
      return {
        text: `Résous l'équation $${a}x + ${b} = ${d}x + ${e}$. Donne la valeur de $x$.`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On regroupe les termes en $x$ d'un côté.",
          `$${a}x - ${d}x = ${e} - ${b} \\Rightarrow ${a - d}x = ${e - b}$.`,
          `$x = \\dfrac{${e - b}}{${a - d}} = ${x}$.`,
          `$x = ${x}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_eq_res_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_resoudre",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe d'abord la parenthèse.",
    tags: ["seconde", "maths", "equations", "resoudre", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const x = randomInt(2, 8);
      const b = randomInt(1, 6);
      const c = a * (x + b);
      return {
        text: `Résous l'équation $${a}(x + ${b}) = ${c}$. Donne la valeur de $x$.`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On développe puis on isole $x$.",
          `$${a}(x + ${b}) = ${c} \\Rightarrow x + ${b} = \\dfrac{${c}}{${a}} = ${x + b}$.`,
          `$x = ${x + b} - ${b} = ${x}$.`,
          `$x = ${x}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_eq_res_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_resoudre",
    difficulty: 2,
    theme: "neutral",
    hint: "Quelle opération annule la constante ?",
    tags: ["seconde", "maths", "equations", "resoudre", "raisonnement", "template"],
    generate: () => {
      const b = randomInt(2, 9);
      const correct = `Soustraire ${b} aux deux membres`;
      const choices = [
        correct,
        `Ajouter ${b} aux deux membres`,
        `Diviser par ${b}`,
        `Multiplier par ${b}`,
      ];
      return {
        text: `Quelle est la première étape pour résoudre $2x + ${b} = 10$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On commence par isoler le terme en $x$.",
          `Pour annuler le $+ ${b}$, on soustrait ${b} aux deux membres.`,
          `On obtient $2x = 10 - ${b}$.`,
          `Première étape : soustraire ${b} aux deux membres.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_eq_res_tpl_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_resoudre",
    difficulty: 2,
    theme: "neutral",
    hint: "On divise par le coefficient de $x$.",
    tags: ["seconde", "maths", "equations", "resoudre", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const x = randomInt(2, 9);
      const c = a * x;
      return {
        text: `Résous l'équation $${a}x = ${c}$. Donne la valeur de $x$.`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On divise les deux membres par le coefficient de $x$.",
          `$${a}x = ${c} \\Rightarrow x = \\dfrac{${c}}{${a}}$.`,
          `$x = ${x}$.`,
          `$x = ${x}$.`
        ),
      };
    },
  },

  /* ===================== EQUATION_PROBLEME ===================== */

  {
    kind: "fixed",
    id: "seconde_eq_prob_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie « mettre un problème en équation » ?",
    format: "qcm",
    choices: [
      "Traduire l'énoncé par une égalité contenant une inconnue",
      "Calculer le résultat directement",
      "Faire un dessin du problème",
      "Tester toutes les réponses possibles",
    ],
    expected: ["Traduire l'énoncé par une égalité contenant une inconnue"],
    comparator: "mcq_exact",
    hint: "On introduit une inconnue $x$ et on écrit une égalité.",
    explanation: exp(
      "Mettre en équation, c'est modéliser l'énoncé par une égalité avec une inconnue.",
      "On choisit l'inconnue, puis on traduit les phrases en symboles.",
      "On obtient une équation qu'on résout ensuite.",
      "Mettre en équation = traduire l'énoncé par une égalité avec une inconnue."
    ),
    tags: ["seconde", "maths", "equations", "probleme", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_eq_prob_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "« Le double d'un nombre augmenté de $3$ vaut $11$. » Quelle équation traduit cet énoncé ?",
    format: "qcm",
    choices: ["$2x + 3 = 11$", "$2(x + 3) = 11$", "$x + 3 = 11$", "$2x - 3 = 11$"],
    expected: ["$2x + 3 = 11$"],
    comparator: "mcq_exact",
    hint: "« Le double » → $2x$ ; « augmenté de $3$ » → $+ 3$.",
    explanation: exp(
      "On traduit l'énoncé phrase par phrase.",
      "« Le double d'un nombre » = $2x$ ; « augmenté de $3$ » = $+3$ ; « vaut $11$ » = $= 11$.",
      "$2x + 3 = 11$.",
      "L'équation est $2x + 3 = 11$."
    ),
    tags: ["seconde", "maths", "equations", "probleme", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_eq_prob_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "« Le produit de a par x » → $ax$ ; « augmenté de b » → $+ b$.",
    tags: ["seconde", "maths", "equations", "probleme", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(2, 9);
      const r = randomInt(15, 40);
      const correct = `$${a}x + ${b} = ${r}$`;
      const choices = [
        correct,
        `$${a}(x + ${b}) = ${r}$`,
        `$x + ${b} = ${r}$`,
        `$${a}x - ${b} = ${r}$`,
      ];
      return {
        text: `« Le produit de ${a} par un nombre, augmenté de ${b}, vaut ${r}. » Quelle équation traduit cet énoncé ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On traduit chaque morceau de la phrase.",
          `« Le produit de ${a} par un nombre » = $${a}x$ ; « augmenté de ${b} » = $+ ${b}$ ; « vaut ${r} » = $= ${r}$.`,
          `$${a}x + ${b} = ${r}$.`,
          `L'équation est $${a}x + ${b} = ${r}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_eq_prob_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Traduis, puis résous l'équation obtenue.",
    tags: ["seconde", "maths", "equations", "probleme", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const x = randomInt(3, 9);
      const b = randomInt(2, 9);
      const r = a * x + b;
      return {
        text: `Le produit de ${a} par un nombre, augmenté de ${b}, vaut ${r}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On met en équation puis on résout.",
          `$${a}x + ${b} = ${r} \\Rightarrow ${a}x = ${r - b}$.`,
          `$x = \\dfrac{${r - b}}{${a}} = ${x}$.`,
          `Le nombre est ${x}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_eq_prob_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Périmètre d'un rectangle = $2(L + l)$.",
    tags: ["seconde", "maths", "equations", "probleme", "template"],
    generate: () => {
      const l = randomInt(3, 8);
      const ecart = randomInt(2, 6);
      const L = l + ecart;
      const perim = 2 * (L + l);
      const correct = `$2(x + ${ecart} + x) = ${perim}$`;
      const choices = [
        correct,
        `$x + ${ecart} = ${perim}$`,
        `$2x + ${ecart} = ${perim}$`,
        `$x(x + ${ecart}) = ${perim}$`,
      ];
      return {
        text: `Un rectangle a une longueur qui dépasse sa largeur $x$ de ${ecart}, et un périmètre de ${perim}. Quelle équation traduit la situation ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On exprime longueur et largeur avec l'inconnue $x$ (largeur).",
          `Largeur $= x$, longueur $= x + ${ecart}$ ; périmètre $= 2(\\text{L} + \\text{l})$.`,
          `$2\\big((x + ${ecart}) + x\\big) = ${perim}$.`,
          `L'équation est $2(x + ${ecart} + x) = ${perim}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_eq_prob_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Somme de deux entiers consécutifs : $x + (x+1)$.",
    tags: ["seconde", "maths", "equations", "probleme", "template"],
    generate: () => {
      const x = randomInt(5, 30);
      const somme = x + (x + 1);
      return {
        text: `La somme de deux entiers consécutifs vaut ${somme}. Quel est le plus petit des deux ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On note $x$ le plus petit ; le suivant est $x + 1$.",
          `$x + (x + 1) = ${somme} \\Rightarrow 2x + 1 = ${somme}$.`,
          `$2x = ${somme - 1}$, donc $x = ${x}$.`,
          `Le plus petit entier est ${x}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_eq_prob_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "On choisit l'inconnue avant de traduire.",
    tags: ["seconde", "maths", "equations", "probleme", "raisonnement", "template"],
    generate: () => {
      const correct = "Le nombre cherché";
      const choices = [correct, "Le résultat final", "Une donnée connue de l'énoncé", "Le signe égal"];
      return {
        text: "Dans une mise en équation, que représente en général l'inconnue $x$ ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "L'inconnue représente la quantité qu'on cherche.",
          "On nomme $x$ la grandeur inconnue de l'énoncé.",
          "Les autres grandeurs s'expriment alors en fonction de $x$.",
          "L'inconnue $x$ représente le nombre cherché."
        ),
      };
    },
  },

  /* ===================== INEQUATION_RESOUDRE ===================== */

  {
    kind: "fixed",
    id: "seconde_ineq_res_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "inequation_resoudre",
    difficulty: 2,
    theme: "neutral",
    text: "Quand on multiplie ou divise une inéquation par un nombre NÉGATIF, que se passe-t-il ?",
    format: "qcm",
    choices: [
      "On change le sens de l'inégalité",
      "On garde le même sens",
      "L'inéquation n'a plus de solution",
      "On change l'inconnue",
    ],
    expected: ["On change le sens de l'inégalité"],
    comparator: "mcq_exact",
    hint: "C'est la règle clé des inéquations.",
    explanation: exp(
      "Multiplier/diviser par un négatif inverse l'ordre des nombres.",
      "On applique la règle du cours.",
      "Le symbole $<$ devient $>$ (et inversement).",
      "On change le sens de l'inégalité."
    ),
    tags: ["seconde", "maths", "inequations", "resoudre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ineq_res_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "inequation_resoudre",
    difficulty: 2,
    theme: "neutral",
    text: "Résous l'inéquation $2x + 1 > 7$.",
    format: "qcm",
    choices: ["$x > 3$", "$x < 3$", "$x > 4$", "$x \\ge 3$"],
    expected: ["$x > 3$"],
    comparator: "mcq_exact",
    hint: "On isole $x$ ; ici on divise par un nombre positif (pas de changement de sens).",
    explanation: exp(
      "On isole $x$ comme pour une équation.",
      "$2x + 1 > 7 \\Rightarrow 2x > 6$.",
      "On divise par $2$ (positif) : $x > 3$.",
      "$x > 3$."
    ),
    tags: ["seconde", "maths", "inequations", "resoudre", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ineq_res_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "inequation_resoudre",
    difficulty: 3,
    theme: "neutral",
    hint: "Coefficient positif : on garde le sens.",
    tags: ["seconde", "maths", "inequations", "resoudre", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const bound = randomInt(2, 8);
      const b = randomInt(1, 6);
      const c = a * bound + b;
      const correct = `$x > ${bound}$`;
      const choices = [correct, `$x < ${bound}$`, `$x > ${bound + 1}$`, `$x \\ge ${bound}$`];
      return {
        text: `Résous l'inéquation $${a}x + ${b} > ${c}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On isole $x$ ; le coefficient est positif donc le sens ne change pas.",
          `$${a}x + ${b} > ${c} \\Rightarrow ${a}x > ${c - b}$.`,
          `On divise par ${a} : $x > ${bound}$.`,
          `$x > ${bound}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ineq_res_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "inequation_resoudre",
    difficulty: 4,
    theme: "neutral",
    hint: "Coefficient négatif : on change le sens en divisant.",
    tags: ["seconde", "maths", "inequations", "resoudre", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const bound = randomInt(2, 8);
      const c = -a * bound; // -a x >= c  => x <= bound (sens change)
      const correct = `$x \\le ${bound}$`;
      const choices = [correct, `$x \\ge ${bound}$`, `$x \\le ${-bound}$`, `$x < ${bound}$`];
      return {
        text: `Résous l'inéquation $-${a}x \\ge ${c}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On divise par un nombre négatif : le sens de l'inégalité change.",
          `$-${a}x \\ge ${c}$, on divise par $-${a}$ (négatif).`,
          `Le $\\ge$ devient $\\le$ : $x \\le \\dfrac{${c}}{-${a}} = ${bound}$.`,
          `$x \\le ${bound}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ineq_res_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "inequation_resoudre",
    difficulty: 3,
    theme: "neutral",
    hint: "Coefficient positif : le sens est conservé.",
    tags: ["seconde", "maths", "inequations", "resoudre", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const bound = randomInt(1, 8);
      const b = randomInt(1, 6);
      const c = a * bound - b;
      const correct = `$x \\le ${bound}$`;
      const choices = [correct, `$x \\ge ${bound}$`, `$x \\le ${bound - 1}$`, `$x < ${bound}$`];
      return {
        text: `Résous l'inéquation $${a}x - ${b} \\le ${c}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On isole $x$ ; coefficient positif donc le sens est conservé.",
          `$${a}x - ${b} \\le ${c} \\Rightarrow ${a}x \\le ${c + b}$.`,
          `On divise par ${a} : $x \\le ${bound}$.`,
          `$x \\le ${bound}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ineq_res_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "inequation_resoudre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le sens change-t-il selon le signe du diviseur ?",
    tags: ["seconde", "maths", "inequations", "resoudre", "raisonnement", "template"],
    generate: () => {
      const positif = Math.random() < 0.5;
      const correct = positif ? "Non, le sens est conservé" : "Oui, le sens change";
      const choices = ["Oui, le sens change", "Non, le sens est conservé", "Cela dépend de $x$", "L'inéquation disparaît"];
      const n = randomInt(2, 6);
      return {
        text: `En divisant une inéquation par $${positif ? n : -n}$, le sens de l'inégalité change-t-il ?`,
        format: "qcm",
        choices: [choices[0], choices[1], choices[2], choices[3]],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Seule la division (ou multiplication) par un NÉGATIF change le sens.",
          `Ici on divise par $${positif ? n : -n}$, qui est ${positif ? "positif" : "négatif"}.`,
          positif ? "Le sens est conservé." : "Le sens de l'inégalité change.",
          correct + "."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ineq_res_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "inequation_resoudre",
    difficulty: 4,
    theme: "neutral",
    hint: "Regroupe les $x$ puis divise.",
    tags: ["seconde", "maths", "inequations", "resoudre", "template"],
    generate: () => {
      const bound = randomInt(2, 7);
      const a = randomInt(3, 6);
      const d = randomInt(1, a - 1);
      const b = randomInt(1, 5);
      const e = (a - d) * bound + b; // a x + b > d x + e  => (a-d)x > e-b => x > bound
      const correct = `$x > ${bound}$`;
      const choices = [correct, `$x < ${bound}$`, `$x \\ge ${bound}$`, `$x > ${bound + 1}$`];
      return {
        text: `Résous l'inéquation $${a}x + ${b} > ${d}x + ${e}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On regroupe les termes en $x$ d'un côté.",
          `$${a}x - ${d}x > ${e} - ${b} \\Rightarrow ${a - d}x > ${e - b}$.`,
          `On divise par ${a - d} (positif) : $x > ${bound}$.`,
          `$x > ${bound}$.`
        ),
      };
    },
  },

  /* ===================== INEQUATION_INTERVALLE ===================== */

  {
    kind: "fixed",
    id: "seconde_ineq_int_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "inequation_intervalle",
    difficulty: 2,
    theme: "neutral",
    text: "L'ensemble des solutions de $x > 3$ s'écrit sous forme d'intervalle :",
    format: "qcm",
    choices: ["$]3\\,;+\\infty[$", "$[3\\,;+\\infty[$", "$]-\\infty\\,;3[$", "$]-\\infty\\,;3]$"],
    expected: ["$]3\\,;+\\infty[$"],
    comparator: "mcq_exact",
    hint: "$>$ est strict : crochet ouvert en $3$.",
    explanation: exp(
      "On traduit l'inégalité en intervalle.",
      "$x > 3$ : $3$ exclu (crochet ouvert), pas de borne supérieure.",
      "$]3\\,;+\\infty[$.",
      "Les solutions sont $]3\\,;+\\infty[$."
    ),
    tags: ["seconde", "maths", "inequations", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ineq_int_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "inequation_intervalle",
    difficulty: 2,
    theme: "neutral",
    text: "L'ensemble des solutions de $x \\le -2$ s'écrit sous forme d'intervalle :",
    format: "qcm",
    choices: ["$]-\\infty\\,;-2]$", "$]-\\infty\\,;-2[$", "$[-2\\,;+\\infty[$", "$]-2\\,;+\\infty[$"],
    expected: ["$]-\\infty\\,;-2]$"],
    comparator: "mcq_exact",
    hint: "$\\le$ : $-2$ est inclus (crochet fermé).",
    explanation: exp(
      "On traduit l'inégalité large en intervalle.",
      "$x \\le -2$ : $-2$ inclus (crochet fermé), pas de borne inférieure.",
      "$]-\\infty\\,;-2]$.",
      "Les solutions sont $]-\\infty\\,;-2]$."
    ),
    tags: ["seconde", "maths", "inequations", "intervalle", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ineq_int_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "inequation_intervalle",
    difficulty: 3,
    theme: "neutral",
    hint: "Strict → crochet ouvert ; large → crochet fermé.",
    tags: ["seconde", "maths", "inequations", "intervalle", "template"],
    generate: () => {
      const a = randomInt(-5, 5);
      const large = Math.random() < 0.5;
      const correct = large ? `$[${a}\\,;+\\infty[$` : `$]${a}\\,;+\\infty[$`;
      const choices = [
        correct,
        large ? `$]${a}\\,;+\\infty[$` : `$[${a}\\,;+\\infty[$`,
        `$]-\\infty\\,;${a}]$`,
        `$]-\\infty\\,;${a}[$`,
      ];
      const symb = large ? "\\ge" : ">";
      return {
        text: `L'ensemble des solutions de $x ${symb} ${a}$ s'écrit sous forme d'intervalle :`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On traduit l'inégalité en intervalle.",
          `$x ${symb} ${a}$ : ${large ? "borne incluse (crochet fermé)" : "borne exclue (crochet ouvert)"}.`,
          `${correct}.`,
          `Les solutions sont ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ineq_int_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "inequation_intervalle",
    difficulty: 3,
    theme: "neutral",
    hint: "« plus petit que » → vers $-\\infty$.",
    tags: ["seconde", "maths", "inequations", "intervalle", "template"],
    generate: () => {
      const a = randomInt(-5, 5);
      const large = Math.random() < 0.5;
      const correct = large ? `$]-\\infty\\,;${a}]$` : `$]-\\infty\\,;${a}[$`;
      const choices = [
        correct,
        large ? `$]-\\infty\\,;${a}[$` : `$]-\\infty\\,;${a}]$`,
        `$[${a}\\,;+\\infty[$`,
        `$]${a}\\,;+\\infty[$`,
      ];
      const symb = large ? "\\le" : "<";
      return {
        text: `L'ensemble des solutions de $x ${symb} ${a}$ s'écrit sous forme d'intervalle :`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On traduit l'inégalité en intervalle.",
          `$x ${symb} ${a}$ : ${large ? "borne incluse" : "borne exclue"}, ensemble vers $-\\infty$.`,
          `${correct}.`,
          `Les solutions sont ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ineq_int_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "inequation_intervalle",
    difficulty: 4,
    theme: "neutral",
    hint: "Résous d'abord, puis traduis en intervalle.",
    tags: ["seconde", "maths", "inequations", "intervalle", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const bound = randomInt(2, 7);
      const b = randomInt(1, 5);
      const c = a * bound + b;
      const correct = `$]${bound}\\,;+\\infty[$`;
      const choices = [correct, `$[${bound}\\,;+\\infty[$`, `$]-\\infty\\,;${bound}[$`, `$]-\\infty\\,;${bound}]$`];
      return {
        text: `Résous $${a}x + ${b} > ${c}$ et donne l'ensemble des solutions sous forme d'intervalle.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On résout puis on traduit en intervalle.",
          `$${a}x + ${b} > ${c} \\Rightarrow x > ${bound}$.`,
          `$>$ strict : crochet ouvert en ${bound}.`,
          `Les solutions sont $]${bound}\\,;+\\infty[$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ineq_int_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "inequation_intervalle",
    difficulty: 3,
    theme: "neutral",
    text: "Pour une borne vers $+\\infty$, le crochet est toujours :",
    format: "qcm",
    choices: ["ouvert", "fermé", "fermé si la borne est positive", "au choix"],
    expected: ["ouvert"],
    comparator: "mcq_exact",
    hint: "L'infini n'est jamais atteint.",
    explanation: exp(
      "$+\\infty$ n'est pas un nombre : il ne peut pas être inclus.",
      "On regarde le côté de l'infini.",
      "Le crochet y est toujours ouvert.",
      "Le crochet est ouvert vers $+\\infty$."
    ),
    tags: ["seconde", "maths", "inequations", "intervalle", "raisonnement", "qcm"],
  },

  /* ===================== COMPARER_DIFFERENCE_QUOTIENT ===================== */

  {
    kind: "fixed",
    id: "seconde_comp_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "comparer_difference_quotient",
    difficulty: 2,
    theme: "neutral",
    text: "Pour comparer deux nombres $A$ et $B$, que peut-on étudier ?",
    format: "qcm",
    choices: [
      "Le signe de la différence $A - B$",
      "La somme $A + B$",
      "Le produit $A \\times B$",
      "La moyenne de $A$ et $B$",
    ],
    expected: ["Le signe de la différence $A - B$"],
    comparator: "mcq_exact",
    hint: "Si $A - B > 0$, alors $A > B$.",
    explanation: exp(
      "Comparer revient souvent à étudier le signe d'une différence.",
      "Si $A - B > 0$ alors $A > B$ ; si $A - B < 0$ alors $A < B$.",
      "On étudie donc le signe de $A - B$.",
      "On étudie le signe de la différence $A - B$."
    ),
    tags: ["seconde", "maths", "comparaison", "difference", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_comp_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "comparer_difference_quotient",
    difficulty: 3,
    theme: "neutral",
    text: "On trouve $A - B = -4$. Que peut-on en conclure ?",
    format: "qcm",
    choices: ["$A < B$", "$A > B$", "$A = B$", "On ne peut pas conclure"],
    expected: ["$A < B$"],
    comparator: "mcq_exact",
    hint: "$A - B$ est négatif.",
    explanation: exp(
      "Le signe de $A - B$ donne l'ordre de $A$ et $B$.",
      "$A - B = -4 < 0$.",
      "Donc $A < B$.",
      "$A < B$."
    ),
    tags: ["seconde", "maths", "comparaison", "difference", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_comp_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "comparer_difference_quotient",
    difficulty: 3,
    theme: "neutral",
    text: "Pour comparer deux nombres STRICTEMENT POSITIFS, on peut aussi étudier :",
    format: "qcm",
    choices: [
      "Leur quotient $\\dfrac{A}{B}$ (comparé à $1$)",
      "Leur somme",
      "Leur opposé",
      "Leur valeur absolue",
    ],
    expected: ["Leur quotient $\\dfrac{A}{B}$ (comparé à $1$)"],
    comparator: "mcq_exact",
    hint: "Si $\\dfrac{A}{B} > 1$ (avec $B > 0$), alors $A > B$.",
    explanation: exp(
      "Pour des nombres positifs, le quotient comparé à $1$ donne l'ordre.",
      "Si $\\dfrac{A}{B} > 1$ et $B > 0$, alors $A > B$.",
      "C'est utile quand la différence est difficile à calculer.",
      "On étudie le quotient $\\dfrac{A}{B}$ comparé à $1$."
    ),
    tags: ["seconde", "maths", "comparaison", "quotient", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_comp_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "comparer_difference_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule $A - B$ puis regarde son signe.",
    tags: ["seconde", "maths", "comparaison", "difference", "template"],
    generate: () => {
      const A = randomInt(2, 20);
      let B = randomInt(2, 20);
      while (B === A) B = randomInt(2, 20);
      const correct = A > B ? "$A > B$" : "$A < B$";
      const choices = ["$A > B$", "$A < B$", "$A = B$", "On ne peut pas conclure"];
      return {
        text: `On a $A = ${A}$ et $B = ${B}$. En étudiant le signe de $A - B$, que conclut-on ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On calcule la différence et on regarde son signe.",
          `$A - B = ${A} - ${B} = ${A - B}$.`,
          `${A - B > 0 ? "Positif" : "Négatif"}, donc ${A > B ? "$A > B$" : "$A < B$"}.`,
          `${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_comp_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "comparer_difference_quotient",
    difficulty: 4,
    theme: "neutral",
    hint: "Le signe de la différence donne l'ordre.",
    tags: ["seconde", "maths", "comparaison", "difference", "template"],
    generate: () => {
      const d = randomInt(-9, 9) || 3;
      const correct = d > 0 ? "$A > B$" : "$A < B$";
      const choices = ["$A > B$", "$A < B$", "$A = B$", "On ne peut pas conclure"];
      return {
        text: `Le calcul donne $A - B = ${d}$. Que conclut-on ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On lit le signe de la différence.",
          `$A - B = ${d}$, qui est ${d > 0 ? "positif" : "négatif"}.`,
          `Donc ${correct}.`,
          `${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_comp_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "comparer_difference_quotient",
    difficulty: 4,
    theme: "neutral",
    hint: "Quotient comparé à 1 (nombres positifs).",
    tags: ["seconde", "maths", "comparaison", "quotient", "template"],
    generate: () => {
      const q = randomInt(2, 5);
      const B = randomInt(2, 6);
      const A = q * B; // A/B = q > 1
      const correct = "$A > B$";
      const choices = ["$A > B$", "$A < B$", "$A = B$", "On ne peut pas conclure"];
      return {
        text: `Avec $A = ${A}$ et $B = ${B}$ (positifs), le quotient $\\dfrac{A}{B} = ${q}$. Que conclut-on ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour des positifs, on compare le quotient à $1$.",
          `$\\dfrac{A}{B} = ${q} > 1$ et $B > 0$.`,
          "Donc $A > B$.",
          "$A > B$."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_comp_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "comparer_difference_quotient",
    difficulty: 2,
    theme: "neutral",
    hint: "Quel signe de $A - B$ correspond à $A$ plus grand ?",
    tags: ["seconde", "maths", "comparaison", "difference", "raisonnement", "template"],
    generate: () => {
      const correct = "$A - B > 0$";
      const choices = ["$A - B > 0$", "$A - B < 0$", "$A - B = 0$", "$A + B > 0$"];
      return {
        text: "Quelle condition traduit « $A$ est strictement plus grand que $B$ » ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On relie l'ordre des nombres au signe de la différence.",
          "$A > B$ équivaut à $A - B > 0$.",
          "La différence doit être strictement positive.",
          "$A - B > 0$."
        ),
      };
    },
  },
];
