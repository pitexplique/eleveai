// lib/tutor-v4/questionBank/seconde/maths/arithmetique-entiers.bank.ts
//
// Notion : Multiples, diviseurs et nombres premiers (arithmetique_entiers)
//
// PERIMETRE BO 2019 (strict) : multiple, diviseur, pair, impair, nombre premier,
// fraction irreductible (par division par un diviseur commun).
// HORS PROGRAMME seconde -> volontairement ABSENTS : PGCD, PPCM, decomposition
// en facteurs premiers.
//
// microSkills couverts (~10 items chacun, difficultes etalees 1->5) :
//   arith_multiple_diviseur     — Utiliser multiple, diviseur, pair et impair
//   arith_nombre_premier        — Reconnaitre un nombre premier
//   arith_fraction_irreductible — Rendre une fraction irreductible
//   arith_probleme              — Modeliser un probleme avec multiples et diviseurs
//
// Conventions : LaTeX ($...$), regle QCM (expression -> qcm, numerique pur -> short).

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

export const arithmetiqueEntiersBank: TutorBankItemV4[] = [
  /* =========================================================
     ARITH_MULTIPLE_DIVISEUR — multiple, diviseur, pair, impair
  ========================================================= */

  {
    kind: "fixed",
    id: "seconde_arith_multdiv_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_multiple_diviseur",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre $12$ est-il un multiple de $3$ ?",
    format: "qcm",
    choices: ["Oui, car $12 = 3 \\times 4$", "Non", "Oui, car $12 = 3 + 4$", "On ne peut pas savoir"],
    expected: ["Oui, car $12 = 3 \\times 4$"],
    comparator: "mcq_exact",
    hint: "Un multiple de $3$ s'écrit $3 \\times k$ avec $k$ entier.",
    explanation: exp(
      "Un multiple de $3$ est un nombre de la forme $3 \\times k$.",
      "On cherche un entier $k$ tel que $12 = 3 \\times k$.",
      "$12 = 3 \\times 4$, donc $12$ est un multiple de $3$.",
      "Oui, $12$ est un multiple de $3$."
    ),
    tags: ["seconde", "maths", "arithmetique", "multiple_diviseur", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_multdiv_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_multiple_diviseur",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre $7$ est un diviseur de $35$. Combien vaut $35 \\div 7$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$7$ est un diviseur de $35$ si la division tombe juste.",
    explanation: exp(
      "$a$ est un diviseur de $b$ si $b \\div a$ est un entier.",
      "On calcule $35 \\div 7$.",
      "$35 \\div 7 = 5$ (division exacte).",
      "$35 \\div 7 = 5$, donc $7$ divise bien $35$."
    ),
    tags: ["seconde", "maths", "arithmetique", "multiple_diviseur", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_multdiv_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre $48$ est-il pair ou impair ?",
    format: "qcm",
    choices: ["Pair", "Impair", "Ni l'un ni l'autre", "Les deux"],
    expected: ["Pair"],
    comparator: "mcq_exact",
    hint: "Un nombre pair se termine par $0, 2, 4, 6$ ou $8$.",
    explanation: exp(
      "Un nombre est pair s'il est divisible par $2$.",
      "On regarde le chiffre des unités de $48$.",
      "Il se termine par $8$, donc $48$ est divisible par $2$.",
      "$48$ est pair."
    ),
    tags: ["seconde", "maths", "arithmetique", "multiple_diviseur", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_multdiv_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand multiple de $6$ inférieur ou égal à $40$ ?",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Liste les multiples de $6$ : $30, 36, 42, \\dots$",
    explanation: exp(
      "Les multiples de $6$ sont $6, 12, 18, 24, 30, 36, 42, \\dots$",
      "On cherche le plus grand qui ne dépasse pas $40$.",
      "$36 \\le 40 < 42$, donc le plus grand est $36$.",
      "Le plus grand multiple de $6$ inférieur ou égal à $40$ est $36$."
    ),
    tags: ["seconde", "maths", "arithmetique", "multiple_diviseur", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_multdiv_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    text: "Par quel critère reconnaît-on qu'un nombre est divisible par $3$ ?",
    format: "qcm",
    choices: [
      "La somme de ses chiffres est divisible par $3$",
      "Il se termine par $3$",
      "Il est impair",
      "Son dernier chiffre est divisible par $3$",
    ],
    expected: ["La somme de ses chiffres est divisible par $3$"],
    comparator: "mcq_exact",
    hint: "Pense au critère de divisibilité par $3$ (somme des chiffres).",
    explanation: exp(
      "Un nombre est divisible par $3$ si la somme de ses chiffres l'est.",
      "On additionne les chiffres et on teste la divisibilité par $3$.",
      "Par exemple $51 \\to 5 + 1 = 6$, divisible par $3$, donc $51$ aussi.",
      "Le critère est : la somme des chiffres est divisible par $3$."
    ),
    tags: ["seconde", "maths", "arithmetique", "multiple_diviseur", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_multdiv_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_multiple_diviseur",
    difficulty: 3,
    theme: "neutral",
    text: "Combien $24$ a-t-il de diviseurs au total ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Liste-les par paires : $1 \\times 24$, $2 \\times 12$, $3 \\times 8$, $4 \\times 6$.",
    explanation: exp(
      "Un diviseur de $24$ divise $24$ sans reste.",
      "On les liste par paires : $1, 2, 3, 4, 6, 8, 12, 24$.",
      "Cela fait $8$ diviseurs.",
      "$24$ a $8$ diviseurs."
    ),
    tags: ["seconde", "maths", "arithmetique", "multiple_diviseur", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_multdiv_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_multiple_diviseur",
    difficulty: 3,
    theme: "neutral",
    text: "Lequel de ces nombres est divisible par $9$ ?",
    format: "qcm",
    choices: ["$135$", "$124$", "$118$", "$140$"],
    expected: ["$135$"],
    comparator: "mcq_exact",
    hint: "Critère : la somme des chiffres est divisible par $9$.",
    explanation: exp(
      "Un nombre est divisible par $9$ si la somme de ses chiffres l'est.",
      "On calcule la somme des chiffres de chaque nombre.",
      "$135 \\to 1 + 3 + 5 = 9$, divisible par $9$.",
      "Le nombre divisible par $9$ est $135$."
    ),
    tags: ["seconde", "maths", "arithmetique", "multiple_diviseur", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_multdiv_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    text: "Lequel de ces nombres est divisible par $5$ ?",
    format: "qcm",
    choices: ["$45$", "$52$", "$38$", "$24$"],
    expected: ["$45$"],
    comparator: "mcq_exact",
    hint: "Un multiple de $5$ se termine par $0$ ou $5$.",
    explanation: exp(
      "Un nombre est divisible par $5$ s'il se termine par $0$ ou $5$.",
      "On regarde le chiffre des unités.",
      "$45$ se termine par $5$ : il est divisible par $5$.",
      "Le nombre divisible par $5$ est $45$."
    ),
    tags: ["seconde", "maths", "arithmetique", "multiple_diviseur", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_multdiv_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_multiple_diviseur",
    difficulty: 4,
    theme: "neutral",
    text: "Si $n$ est un entier impair, alors $n + 1$ est :",
    format: "qcm",
    choices: ["pair", "impair", "premier", "négatif"],
    expected: ["pair"],
    comparator: "mcq_exact",
    hint: "Un impair plus $1$ donne le nombre pair suivant.",
    explanation: exp(
      "Les nombres pairs et impairs alternent.",
      "On ajoute $1$ à un nombre impair.",
      "Par exemple $7$ (impair) $+ 1 = 8$ (pair) ; c'est toujours le cas.",
      "$n + 1$ est pair."
    ),
    tags: ["seconde", "maths", "arithmetique", "multiple_diviseur", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_multdiv_fixed_10",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_multiple_diviseur",
    difficulty: 3,
    theme: "neutral",
    text: "Le nombre $1$ est-il un diviseur de tous les entiers ?",
    format: "qcm",
    choices: ["Oui, $1$ divise tout entier", "Non, seulement les entiers impairs", "Non, seulement $1$", "Non, jamais"],
    expected: ["Oui, $1$ divise tout entier"],
    comparator: "mcq_exact",
    hint: "Pour tout entier $n$, $n = 1 \\times n$.",
    explanation: exp(
      "$a$ divise $b$ si $b = a \\times k$ avec $k$ entier.",
      "On écrit $n$ comme un produit faisant intervenir $1$.",
      "Pour tout entier $n$, $n = 1 \\times n$, donc $1$ divise $n$.",
      "Oui, $1$ est un diviseur de tout entier."
    ),
    tags: ["seconde", "maths", "arithmetique", "multiple_diviseur", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_arith_multdiv_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    hint: "Un multiple de $a$ s'écrit $a \\times k$.",
    tags: ["seconde", "maths", "arithmetique", "multiple_diviseur", "template"],
    generate: () => {
      const a = randomInt(3, 9);
      const k = randomInt(2, 9);
      const produit = a * k;
      return {
        text: `Le nombre $${produit}$ est-il un multiple de $${a}$ ?`,
        format: "qcm",
        choices: ["Oui", "Non"],
        expected: ["Oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un multiple de $a$ est de la forme $a \\times k$.",
          `On cherche $k$ tel que $${produit} = ${a} \\times k$.`,
          `$${produit} = ${a} \\times ${k}$.`,
          `Oui, $${produit}$ est un multiple de $${a}$.`
        ),
      };
    },
  },

  /* =========================================================
     ARITH_NOMBRE_PREMIER — Reconnaitre un nombre premier
  ========================================================= */

  {
    kind: "fixed",
    id: "seconde_arith_premier_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_nombre_premier",
    difficulty: 1,
    theme: "neutral",
    text: "Un nombre premier est un entier qui possède exactement :",
    format: "qcm",
    choices: [
      "deux diviseurs : $1$ et lui-même",
      "un seul diviseur",
      "trois diviseurs",
      "aucun diviseur",
    ],
    expected: ["deux diviseurs : $1$ et lui-même"],
    comparator: "mcq_exact",
    hint: "Pense à $2, 3, 5, 7, \\dots$",
    explanation: exp(
      "Un nombre premier a exactement deux diviseurs distincts.",
      "On rappelle la définition.",
      "Ces deux diviseurs sont $1$ et le nombre lui-même.",
      "Un nombre premier a deux diviseurs : $1$ et lui-même."
    ),
    tags: ["seconde", "maths", "arithmetique", "premier", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_premier_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_nombre_premier",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre $1$ est-il un nombre premier ?",
    format: "qcm",
    choices: ["Non, il n'a qu'un seul diviseur", "Oui", "Oui, car il n'est divisible que par lui-même", "On ne peut pas savoir"],
    expected: ["Non, il n'a qu'un seul diviseur"],
    comparator: "mcq_exact",
    hint: "Combien de diviseurs a $1$ ?",
    explanation: exp(
      "Un nombre premier doit avoir exactement deux diviseurs.",
      "On compte les diviseurs de $1$.",
      "$1$ n'a qu'un seul diviseur ($1$), pas deux.",
      "Non, $1$ n'est pas premier."
    ),
    tags: ["seconde", "maths", "arithmetique", "premier", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_premier_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_nombre_premier",
    difficulty: 2,
    theme: "neutral",
    text: "Lequel de ces nombres est premier ?",
    format: "qcm",
    choices: ["$13$", "$15$", "$21$", "$27$"],
    expected: ["$13$"],
    comparator: "mcq_exact",
    hint: "Cherche celui qui n'a que $1$ et lui-même comme diviseurs.",
    explanation: exp(
      "Un nombre premier n'a que deux diviseurs.",
      "On teste : $15 = 3 \\times 5$, $21 = 3 \\times 7$, $27 = 3 \\times 9$.",
      "$13$ n'a que $1$ et $13$ comme diviseurs.",
      "Le nombre premier est $13$."
    ),
    tags: ["seconde", "maths", "arithmetique", "premier", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_premier_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_nombre_premier",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le seul nombre premier pair ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Tous les autres nombres pairs sont divisibles par $2$.",
    explanation: exp(
      "Un nombre pair est divisible par $2$.",
      "On cherche un nombre pair dont $2$ est le seul diviseur en plus de $1$ et lui-même.",
      "$2$ n'a que $1$ et $2$ ; tout autre pair a $2$ comme diviseur supplémentaire.",
      "Le seul nombre premier pair est $2$."
    ),
    tags: ["seconde", "maths", "arithmetique", "premier", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_premier_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_nombre_premier",
    difficulty: 3,
    theme: "neutral",
    text: "Le nombre $51$ est-il premier ?",
    format: "qcm",
    choices: ["Non, car $51 = 3 \\times 17$", "Oui", "Non, car il est pair", "On ne peut pas savoir"],
    expected: ["Non, car $51 = 3 \\times 17$"],
    comparator: "mcq_exact",
    hint: "Teste la divisibilité par $3$ (somme des chiffres $= 6$).",
    explanation: exp(
      "Pour montrer qu'un nombre n'est pas premier, on en trouve un diviseur autre que $1$ et lui-même.",
      "La somme des chiffres de $51$ est $6$, divisible par $3$.",
      "Donc $51 = 3 \\times 17$.",
      "Non, $51$ n'est pas premier."
    ),
    tags: ["seconde", "maths", "arithmetique", "premier", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_premier_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_nombre_premier",
    difficulty: 3,
    theme: "neutral",
    text: "Combien y a-t-il de nombres premiers inférieurs ou égaux à $10$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Liste-les : $2, 3, 5, 7$.",
    explanation: exp(
      "On cherche tous les nombres premiers jusqu'à $10$.",
      "On teste $2, 3, 4, 5, 6, 7, 8, 9, 10$.",
      "Les premiers sont $2, 3, 5, 7$ : il y en a $4$.",
      "Il y a $4$ nombres premiers $\\le 10$."
    ),
    tags: ["seconde", "maths", "arithmetique", "premier", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_premier_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_nombre_premier",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le plus petit diviseur de $91$ supérieur à $1$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Teste $2, 3, 5, 7, \\dots$ ; $91 = 7 \\times 13$.",
    explanation: exp(
      "Le plus petit diviseur d'un entier (autre que $1$) est toujours un nombre premier.",
      "On teste les premiers dans l'ordre : $2$ (non), $3$ (non), $5$ (non), $7$ ?",
      "$91 = 7 \\times 13$, donc $7$ divise $91$.",
      "Le plus petit diviseur de $91$ supérieur à $1$ est $7$."
    ),
    tags: ["seconde", "maths", "arithmetique", "premier", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_premier_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_nombre_premier",
    difficulty: 4,
    theme: "neutral",
    text: "Pour vérifier que $97$ est premier, jusqu'à quel nombre suffit-il de tester les diviseurs premiers ?",
    format: "qcm",
    choices: ["Jusqu'à $\\sqrt{97} \\approx 9{,}8$", "Jusqu'à $97$", "Jusqu'à $48$", "Jusqu'à $97 \\div 2$"],
    expected: ["Jusqu'à $\\sqrt{97} \\approx 9{,}8$"],
    comparator: "mcq_exact",
    hint: "On s'arrête à la racine carrée du nombre.",
    explanation: exp(
      "Si $n$ n'a pas de diviseur premier $\\le \\sqrt{n}$, alors $n$ est premier.",
      "On calcule $\\sqrt{97}$.",
      "$\\sqrt{97} \\approx 9{,}8$ : il suffit de tester $2, 3, 5, 7$.",
      "On teste les premiers jusqu'à $\\sqrt{97} \\approx 9{,}8$."
    ),
    tags: ["seconde", "maths", "arithmetique", "premier", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_premier_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_nombre_premier",
    difficulty: 3,
    theme: "neutral",
    text: "Le nombre $29$ est-il premier ?",
    format: "qcm",
    choices: ["Oui", "Non, car $29 = 3 \\times 9 + 2$", "Non, il est pair", "Non, car divisible par $7$"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "Teste $2, 3, 5$ (jusqu'à $\\sqrt{29} \\approx 5{,}4$).",
    explanation: exp(
      "On teste les diviseurs premiers jusqu'à $\\sqrt{29} \\approx 5{,}4$.",
      "On vérifie $2, 3, 5$.",
      "$29$ n'est divisible ni par $2$, ni par $3$, ni par $5$.",
      "Oui, $29$ est premier."
    ),
    tags: ["seconde", "maths", "arithmetique", "premier", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_arith_premier_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_nombre_premier",
    difficulty: 2,
    theme: "neutral",
    hint: "Un nombre premier n'a que $1$ et lui-même comme diviseurs.",
    tags: ["seconde", "maths", "arithmetique", "premier", "template"],
    generate: () => {
      const premiers = [11, 13, 17, 19, 23, 29, 31, 37];
      const composes = [9, 15, 21, 25, 27, 33, 35, 39];
      const estPremier = Math.random() < 0.5;
      const n = estPremier
        ? premiers[randomInt(0, premiers.length - 1)]
        : composes[randomInt(0, composes.length - 1)];
      return {
        text: `Le nombre $${n}$ est-il premier ?`,
        format: "qcm",
        choices: ["Oui", "Non"],
        expected: [estPremier ? "Oui" : "Non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre premier a exactement deux diviseurs : $1$ et lui-même.",
          `On cherche un diviseur de $${n}$ autre que $1$ et $${n}$.`,
          estPremier
            ? `$${n}$ n'a aucun autre diviseur.`
            : `$${n}$ admet un autre diviseur, il n'est donc pas premier.`,
          estPremier ? `Oui, $${n}$ est premier.` : `Non, $${n}$ n'est pas premier.`
        ),
      };
    },
  },

  /* =========================================================
     ARITH_FRACTION_IRREDUCTIBLE — par division par un diviseur commun
  ========================================================= */

  {
    kind: "fixed",
    id: "seconde_arith_irreductible_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_fraction_irreductible",
    difficulty: 1,
    theme: "neutral",
    text: "Une fraction est dite irréductible lorsque :",
    format: "qcm",
    choices: [
      "son numérateur et son dénominateur n'ont pas de diviseur commun (autre que $1$)",
      "son numérateur est plus petit que son dénominateur",
      "son dénominateur est premier",
      "elle est égale à un entier",
    ],
    expected: ["son numérateur et son dénominateur n'ont pas de diviseur commun (autre que $1$)"],
    comparator: "mcq_exact",
    hint: "On ne peut plus simplifier.",
    explanation: exp(
      "Une fraction irréductible ne peut plus être simplifiée.",
      "On regarde les diviseurs communs du numérateur et du dénominateur.",
      "Quand le seul diviseur commun est $1$, la fraction est irréductible.",
      "Elle est irréductible quand numérateur et dénominateur n'ont que $1$ comme diviseur commun."
    ),
    tags: ["seconde", "maths", "arithmetique", "irreductible", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_irreductible_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_fraction_irreductible",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme irréductible de $\\dfrac{6}{8}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{3}{4}$", "$\\dfrac{2}{3}$", "$\\dfrac{6}{8}$", "$\\dfrac{12}{16}$"],
    expected: ["$\\dfrac{3}{4}$"],
    comparator: "mcq_exact",
    hint: "Divise numérateur et dénominateur par $2$.",
    explanation: exp(
      "On simplifie en divisant par un diviseur commun.",
      "$2$ est un diviseur commun de $6$ et $8$.",
      "$\\dfrac{6}{8} = \\dfrac{6 \\div 2}{8 \\div 2} = \\dfrac{3}{4}$.",
      "La forme irréductible est $\\dfrac{3}{4}$."
    ),
    tags: ["seconde", "maths", "arithmetique", "irreductible", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_irreductible_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_fraction_irreductible",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme irréductible de $\\dfrac{10}{15}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{2}{3}$", "$\\dfrac{3}{2}$", "$\\dfrac{5}{10}$", "$\\dfrac{10}{15}$"],
    expected: ["$\\dfrac{2}{3}$"],
    comparator: "mcq_exact",
    hint: "$5$ est un diviseur commun de $10$ et $15$.",
    explanation: exp(
      "On divise numérateur et dénominateur par un diviseur commun.",
      "$5$ divise $10$ et $15$.",
      "$\\dfrac{10}{15} = \\dfrac{10 \\div 5}{15 \\div 5} = \\dfrac{2}{3}$.",
      "La forme irréductible est $\\dfrac{2}{3}$."
    ),
    tags: ["seconde", "maths", "arithmetique", "irreductible", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_irreductible_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_fraction_irreductible",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme irréductible de $\\dfrac{15}{25}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{3}{5}$", "$\\dfrac{5}{3}$", "$\\dfrac{15}{25}$", "$\\dfrac{1}{2}$"],
    expected: ["$\\dfrac{3}{5}$"],
    comparator: "mcq_exact",
    hint: "$5$ est un diviseur commun de $15$ et $25$.",
    explanation: exp(
      "On simplifie en divisant par un diviseur commun.",
      "$5$ divise $15$ et $25$.",
      "$\\dfrac{15}{25} = \\dfrac{3}{5}$.",
      "La forme irréductible est $\\dfrac{3}{5}$."
    ),
    tags: ["seconde", "maths", "arithmetique", "irreductible", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_irreductible_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_fraction_irreductible",
    difficulty: 2,
    theme: "neutral",
    text: "La fraction $\\dfrac{7}{9}$ est-elle irréductible ?",
    format: "qcm",
    choices: ["Oui", "Non, on peut diviser par $3$", "Non, on peut diviser par $7$", "Non, on peut diviser par $2$"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "$7$ est premier ; divise-t-il $9$ ?",
    explanation: exp(
      "Une fraction est irréductible si le seul diviseur commun est $1$.",
      "On cherche un diviseur commun à $7$ et $9$.",
      "$7$ est premier et ne divise pas $9$ : aucun diviseur commun autre que $1$.",
      "Oui, $\\dfrac{7}{9}$ est irréductible."
    ),
    tags: ["seconde", "maths", "arithmetique", "irreductible", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_irreductible_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_fraction_irreductible",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme irréductible de $\\dfrac{24}{36}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{2}{3}$", "$\\dfrac{3}{4}$", "$\\dfrac{4}{6}$", "$\\dfrac{6}{9}$"],
    expected: ["$\\dfrac{2}{3}$"],
    comparator: "mcq_exact",
    hint: "Simplifie en plusieurs étapes : par $2$, encore par $2$, puis par $3$.",
    explanation: exp(
      "On peut simplifier par étapes, en divisant à chaque fois par un diviseur commun.",
      "$\\dfrac{24}{36} = \\dfrac{12}{18}$ (par $2$) $= \\dfrac{6}{9}$ (par $2$) $= \\dfrac{2}{3}$ (par $3$).",
      "Plus aucun diviseur commun autre que $1$.",
      "La forme irréductible est $\\dfrac{2}{3}$."
    ),
    tags: ["seconde", "maths", "arithmetique", "irreductible", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_irreductible_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_fraction_irreductible",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme irréductible de $\\dfrac{45}{60}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{3}{4}$", "$\\dfrac{9}{12}$", "$\\dfrac{5}{6}$", "$\\dfrac{4}{5}$"],
    expected: ["$\\dfrac{3}{4}$"],
    comparator: "mcq_exact",
    hint: "Divise par $5$, puis par $3$.",
    explanation: exp(
      "On simplifie par étapes avec des diviseurs communs.",
      "$\\dfrac{45}{60} = \\dfrac{9}{12}$ (par $5$) $= \\dfrac{3}{4}$ (par $3$).",
      "Plus aucun diviseur commun autre que $1$.",
      "La forme irréductible est $\\dfrac{3}{4}$."
    ),
    tags: ["seconde", "maths", "arithmetique", "irreductible", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_irreductible_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_fraction_irreductible",
    difficulty: 3,
    theme: "neutral",
    text: "Deux entiers sont dits « premiers entre eux » lorsqu'ils n'ont aucun diviseur commun, à part le nombre :",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Le seul diviseur commun autorisé.",
    explanation: exp(
      "« Premiers entre eux » signifie sans diviseur commun en dehors d'un seul.",
      "On identifie ce diviseur toujours commun à tous les entiers.",
      "$1$ divise tous les entiers : c'est le seul diviseur commun autorisé.",
      "Deux entiers sont premiers entre eux quand leur seul diviseur commun est $1$."
    ),
    tags: ["seconde", "maths", "arithmetique", "irreductible", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_irreductible_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_fraction_irreductible",
    difficulty: 3,
    theme: "neutral",
    text: "Une fraction $\\dfrac{a}{b}$ est irréductible si et seulement si $a$ et $b$ sont :",
    format: "qcm",
    choices: ["premiers entre eux", "tous les deux pairs", "tous les deux premiers", "consécutifs"],
    expected: ["premiers entre eux"],
    comparator: "mcq_exact",
    hint: "Aucun diviseur commun autre que $1$.",
    explanation: exp(
      "L'irréductibilité signifie qu'on ne peut plus simplifier.",
      "On relie « irréductible » et « aucun diviseur commun autre que $1$ ».",
      "C'est exactement la définition de « premiers entre eux ».",
      "Ils doivent être premiers entre eux."
    ),
    tags: ["seconde", "maths", "arithmetique", "irreductible", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_arith_irreductible_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_fraction_irreductible",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise le numérateur et le dénominateur par un diviseur commun.",
    tags: ["seconde", "maths", "arithmetique", "irreductible", "template"],
    generate: () => {
      const d = randomInt(2, 6);
      const num = randomInt(2, 5);
      const den = num + randomInt(1, 4);
      const grosNum = num * d;
      const grosDen = den * d;
      const bonne = `$\\dfrac{${num}}{${den}}$`;
      const choices = [
        bonne,
        `$\\dfrac{${den}}{${num}}$`,
        `$\\dfrac{${grosNum}}{${grosDen}}$`,
        `$\\dfrac{${num * 2}}{${den * 2}}$`,
      ];
      return {
        text: `Quelle est la forme irréductible de $\\dfrac{${grosNum}}{${grosDen}}$ ?`,
        format: "qcm",
        choices,
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On divise numérateur et dénominateur par un diviseur commun.",
          `$${d}$ est un diviseur commun de $${grosNum}$ et $${grosDen}$.`,
          `$\\dfrac{${grosNum}}{${grosDen}} = \\dfrac{${num}}{${den}}$.`,
          `La forme irréductible est $\\dfrac{${num}}{${den}}$.`
        ),
      };
    },
  },

  /* =========================================================
     ARITH_PROBLEME — multiples / diviseurs / pair / impair / premier
  ========================================================= */

  {
    kind: "fixed",
    id: "seconde_arith_probleme_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "On veut ranger $24$ stylos en paquets identiques de $6$. Combien de paquets obtient-on ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On divise le nombre total par la taille d'un paquet.",
    explanation: exp(
      "Ranger en paquets identiques revient à diviser.",
      "On calcule $24 \\div 6$.",
      "$24 \\div 6 = 4$.",
      "On obtient $4$ paquets."
    ),
    tags: ["seconde", "maths", "arithmetique", "probleme", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_probleme_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Peut-on répartir $30$ élèves en équipes de $4$ sans qu'il reste personne ?",
    format: "qcm",
    choices: ["Non, car $30$ n'est pas un multiple de $4$", "Oui", "Oui, on fait $7$ équipes", "On ne peut pas savoir"],
    expected: ["Non, car $30$ n'est pas un multiple de $4$"],
    comparator: "mcq_exact",
    hint: "$30$ est-il un multiple de $4$ ?",
    explanation: exp(
      "Une répartition sans reste est possible si le total est un multiple de la taille des groupes.",
      "On regarde si $30$ est un multiple de $4$.",
      "$4 \\times 7 = 28$ et $4 \\times 8 = 32$ : $30$ n'est pas un multiple de $4$.",
      "Non, ce n'est pas possible sans reste."
    ),
    tags: ["seconde", "maths", "arithmetique", "probleme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_probleme_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "On range $50$ œufs dans des boîtes de $6$. Combien d'œufs resteront sans boîte pleine ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Cherche le reste de la division de $50$ par $6$.",
    explanation: exp(
      "Le nombre d'œufs restants est le reste de la division par $6$.",
      "On effectue la division : $50 = 6 \\times 8 + r$.",
      "$6 \\times 8 = 48$, donc $r = 50 - 48 = 2$.",
      "Il restera $2$ œufs."
    ),
    tags: ["seconde", "maths", "arithmetique", "probleme", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_probleme_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est à la fois pair et multiple de $5$ ?",
    format: "qcm",
    choices: ["$10$", "$15$", "$8$", "$9$"],
    expected: ["$10$"],
    comparator: "mcq_exact",
    hint: "Pair = divisible par $2$ ; multiple de $5$ = se termine par $0$ ou $5$.",
    explanation: exp(
      "Le nombre doit vérifier les deux conditions : pair ET multiple de $5$.",
      "Pair → se termine par un chiffre pair ; multiple de $5$ → se termine par $0$ ou $5$.",
      "Pour les deux, il doit se terminer par $0$ : $10$ convient.",
      "Le nombre est $10$."
    ),
    tags: ["seconde", "maths", "arithmetique", "probleme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_probleme_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un car transporte au maximum $50$ personnes. Il y a $120$ élèves. Combien de cars faut-il au minimum ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$2$ cars transportent $100$ personnes : ce n'est pas assez.",
    explanation: exp(
      "On cherche le plus petit nombre de cars dont la capacité atteint $120$.",
      "On compare $120$ aux multiples de $50$.",
      "$2 \\times 50 = 100 < 120 \\le 150 = 3 \\times 50$.",
      "Il faut au minimum $3$ cars."
    ),
    tags: ["seconde", "maths", "arithmetique", "probleme", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_probleme_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Le carré d'un nombre impair est-il pair ou impair ?",
    format: "qcm",
    choices: ["Impair", "Pair", "Cela dépend du nombre", "Toujours un multiple de $4$"],
    expected: ["Impair"],
    comparator: "mcq_exact",
    hint: "Teste : $3^2 = 9$, $5^2 = 25$, $7^2 = 49$.",
    explanation: exp(
      "On étudie la parité du carré d'un nombre impair.",
      "On essaie plusieurs cas : $3^2 = 9$, $5^2 = 25$, $7^2 = 49$.",
      "Tous les résultats sont impairs : le carré d'un impair est impair.",
      "Le carré d'un nombre impair est impair."
    ),
    tags: ["seconde", "maths", "arithmetique", "probleme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_probleme_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "La somme de deux multiples de $7$ est-elle toujours un multiple de $7$ ?",
    format: "qcm",
    choices: ["Oui, toujours", "Non, jamais", "Seulement si les deux sont égaux", "Seulement si la somme est paire"],
    expected: ["Oui, toujours"],
    comparator: "mcq_exact",
    hint: "$7a + 7b = 7(a + b)$.",
    explanation: exp(
      "On additionne deux multiples de $7$, notés $7a$ et $7b$.",
      "On factorise la somme.",
      "$7a + 7b = 7(a + b)$, qui est un multiple de $7$.",
      "Oui, la somme de deux multiples de $7$ est un multiple de $7$."
    ),
    tags: ["seconde", "maths", "arithmetique", "probleme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_probleme_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un ruban de $60$ cm doit être coupé en morceaux égaux de longueur entière. Laquelle de ces découpes est IMPOSSIBLE sans reste ?",
    format: "qcm",
    choices: ["des morceaux de $7$ cm", "des morceaux de $4$ cm", "des morceaux de $5$ cm", "des morceaux de $6$ cm"],
    expected: ["des morceaux de $7$ cm"],
    comparator: "mcq_exact",
    hint: "La découpe est possible si la longueur du morceau est un diviseur de $60$.",
    explanation: exp(
      "Une découpe sans reste est possible si la longueur d'un morceau divise $60$.",
      "On teste : $4$, $5$ et $6$ divisent $60$ ; $7$ ?",
      "$60 = 7 \\times 8 + 4$ : $7$ ne divise pas $60$.",
      "La découpe en morceaux de $7$ cm est impossible sans reste."
    ),
    tags: ["seconde", "maths", "arithmetique", "probleme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_probleme_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "On range $35$ livres sur des étagères contenant chacune $5$ livres. Combien d'étagères sont nécessaires ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "On divise $35$ par $5$.",
    explanation: exp(
      "Répartir en groupes de taille fixe revient à diviser.",
      "On calcule $35 \\div 5$.",
      "$35 \\div 5 = 7$.",
      "Il faut $7$ étagères."
    ),
    tags: ["seconde", "maths", "arithmetique", "probleme", "short"],
  },

  {
    kind: "template",
    id: "seconde_arith_probleme_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre qui reste est le reste de la division.",
    tags: ["seconde", "maths", "arithmetique", "probleme", "template"],
    generate: () => {
      const k = randomInt(4, 9);
      const q = randomInt(3, 9);
      const reste = randomInt(1, k - 1);
      const total = k * q + reste;
      return {
        text: `On répartit $${total}$ bonbons en sachets de $${k}$. Combien de bonbons resteront sans sachet complet ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Le nombre de bonbons restants est le reste de la division par la taille du sachet.",
          `On effectue la division de $${total}$ par $${k}$.`,
          `$${total} = ${k} \\times ${q} + ${reste}$.`,
          `Il restera $${reste}$ bonbons.`
        ),
      };
    },
  },

  /* =========================================================
     QCM DE RAISONNEMENT (option D : "pourquoi", "a quoi sert")
  ========================================================= */

  {
    kind: "fixed",
    id: "seconde_arith_multdiv_raison_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence entre « multiple » et « diviseur » ?",
    format: "qcm",
    choices: [
      "$12$ est un multiple de $3$, et $3$ est un diviseur de $12$",
      "Multiple et diviseur veulent dire la même chose",
      "Un multiple est toujours plus petit",
      "Un diviseur est toujours pair",
    ],
    expected: ["$12$ est un multiple de $3$, et $3$ est un diviseur de $12$"],
    comparator: "mcq_exact",
    hint: "$12 = 3 \\times 4$ : qui est multiple, qui est diviseur ?",
    explanation: exp(
      "Les deux notions sont liées mais décrivent des rôles inverses.",
      "Dans $12 = 3 \\times 4$, $12$ est un multiple de $3$ et de $4$.",
      "Et $3$ (comme $4$) est un diviseur de $12$.",
      "$12$ est multiple de $3$, et $3$ est diviseur de $12$."
    ),
    tags: ["seconde", "maths", "arithmetique", "multiple_diviseur", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_multdiv_raison_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi servent les critères de divisibilité (par $2$, $3$, $5$, $9$…) ?",
    format: "qcm",
    choices: [
      "À savoir rapidement si une division tombe juste, sans la poser",
      "À calculer une moyenne",
      "À mesurer un angle",
      "À arrondir un nombre",
    ],
    expected: ["À savoir rapidement si une division tombe juste, sans la poser"],
    comparator: "mcq_exact",
    hint: "Ils évitent d'effectuer la division.",
    explanation: exp(
      "Un critère de divisibilité teste la divisibilité sans poser l'opération.",
      "Ex. somme des chiffres divisible par $3$ → le nombre l'est aussi.",
      "C'est un gain de temps pour reconnaître multiples et diviseurs.",
      "Ils servent à savoir vite si une division tombe juste."
    ),
    tags: ["seconde", "maths", "arithmetique", "multiple_diviseur", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_premier_raison_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_nombre_premier",
    difficulty: 4,
    theme: "neutral",
    text: "Pour tester si $n$ est premier, pourquoi suffit-il d'essayer les diviseurs jusqu'à $\\sqrt{n}$ ?",
    format: "qcm",
    choices: [
      "Car au-delà de $\\sqrt{n}$, un diviseur aurait un « partenaire » déjà testé en dessous",
      "Car $\\sqrt{n}$ est toujours entier",
      "Car les nombres premiers sont petits",
      "Car $n$ est toujours pair",
    ],
    expected: ["Car au-delà de $\\sqrt{n}$, un diviseur aurait un « partenaire » déjà testé en dessous"],
    comparator: "mcq_exact",
    hint: "Les diviseurs vont par paires $d \\times \\dfrac{n}{d}$.",
    explanation: exp(
      "Les diviseurs d'un nombre vont par paires dont le produit vaut $n$.",
      "Si $d > \\sqrt{n}$, alors $\\dfrac{n}{d} < \\sqrt{n}$ a déjà été testé.",
      "Inutile donc d'aller au-delà de $\\sqrt{n}$.",
      "Car au-delà de $\\sqrt{n}$, le diviseur a un partenaire déjà testé en dessous."
    ),
    tags: ["seconde", "maths", "arithmetique", "premier", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_premier_raison_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_nombre_premier",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi $1$ n'est-il pas considéré comme un nombre premier ?",
    format: "qcm",
    choices: [
      "Parce qu'il n'a qu'un seul diviseur, alors qu'un premier en a exactement deux",
      "Parce qu'il est trop petit",
      "Parce qu'il est impair",
      "Parce qu'il est positif",
    ],
    expected: ["Parce qu'il n'a qu'un seul diviseur, alors qu'un premier en a exactement deux"],
    comparator: "mcq_exact",
    hint: "Combien $1$ a-t-il de diviseurs ?",
    explanation: exp(
      "Un nombre premier a exactement deux diviseurs distincts.",
      "Or $1$ n'a qu'un seul diviseur : lui-même.",
      "Il ne remplit donc pas la définition.",
      "Car $1$ n'a qu'un seul diviseur, pas deux."
    ),
    tags: ["seconde", "maths", "arithmetique", "premier", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_irreductible_raison_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_fraction_irreductible",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi rend-on une fraction irréductible ?",
    format: "qcm",
    choices: [
      "Pour l'écrire sous sa forme la plus simple et la comparer plus facilement",
      "Pour la rendre plus grande",
      "Pour la transformer en entier",
      "Pour changer sa valeur",
    ],
    expected: ["Pour l'écrire sous sa forme la plus simple et la comparer plus facilement"],
    comparator: "mcq_exact",
    hint: "Simplifier ne change pas la valeur, juste l'écriture.",
    explanation: exp(
      "Rendre irréductible simplifie l'écriture sans changer la valeur.",
      "$\\dfrac{6}{8} = \\dfrac{3}{4}$ : même valeur, écriture plus simple.",
      "Cela facilite les comparaisons et les calculs.",
      "On le fait pour obtenir la forme la plus simple."
    ),
    tags: ["seconde", "maths", "arithmetique", "irreductible", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_arith_probleme_raison_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "arithmetique_entiers",
    microId: "arith_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un problème, à quoi reconnaît-on qu'il faut utiliser la divisibilité ?",
    format: "qcm",
    choices: [
      "Quand on doit répartir une quantité en parts égales sans reste",
      "Quand on calcule une moyenne",
      "Quand on mesure une longueur",
      "Quand on trace une figure",
    ],
    expected: ["Quand on doit répartir une quantité en parts égales sans reste"],
    comparator: "mcq_exact",
    hint: "« Sans reste », « parts égales » sont des indices.",
    explanation: exp(
      "La divisibilité intervient dans les répartitions exactes.",
      "« En parts égales sans reste » signale un multiple/diviseur.",
      "On vérifie alors si le total est divisible par la taille des parts.",
      "Quand on répartit en parts égales sans reste."
    ),
    tags: ["seconde", "maths", "arithmetique", "probleme", "raisonnement", "qcm"],
  },
];
