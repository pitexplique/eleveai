// lib/tutor-v4/question-banks/maths/3e/calcul_litteral.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function signedTerm(n: number) {
  return n >= 0 ? `+ ${n}` : `- ${Math.abs(n)}`;
}

export const calculLitteralBank: TutorBankItemV4[] = [
  /* =========================
     LITTERAL_COMPRENDRE
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_comprendre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 3x + 5, que représente la lettre x ?",
    format: "qcm",
    choices: [
      "un nombre inconnu ou variable",
      "toujours le nombre 3",
      "toujours le nombre 5",
      "un signe de multiplication uniquement",
    ],
    expected: ["un nombre inconnu ou variable"],
    comparator: "mcq_exact",
    hint: "Une lettre peut représenter un nombre qui varie ou que l’on ne connaît pas encore.",
    explanation:
      "Définition : en calcul littéral, une lettre représente un nombre inconnu ou variable.\n\n" +
      "Méthode : on lit l’expression en repérant les nombres et les lettres.\n\n" +
      "Calcul : dans 3x + 5, la lettre x représente un nombre, et 3x signifie 3 × x.\n\n" +
      "Conclusion : x représente un nombre inconnu ou variable.",
    tags: ["litteral", "comprendre", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_comprendre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie 4x en calcul littéral ?",
    format: "qcm",
    choices: ["4 × x", "4 + x", "4 - x", "x ÷ 4"],
    expected: ["4 × x"],
    comparator: "mcq_exact",
    hint: "Quand un nombre est collé à une lettre, cela signifie une multiplication.",
    explanation:
      "Définition : en calcul littéral, lorsqu’un nombre est placé devant une lettre, la multiplication est implicite.\n\n" +
      "Méthode : on réécrit l’expression en faisant apparaître le signe ×.\n\n" +
      "Calcul : 4x signifie 4 × x.\n\n" +
      "Conclusion : 4x se lit « 4 multiplié par x ».",
    tags: ["litteral", "notation", "multiplication", "qcm"],
  },

  {
    kind: "template",
    id: "3e_litteral_comprendre_tpl_1_notation",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un nombre collé à une lettre signifie une multiplication.",
    tags: ["litteral", "notation", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const lettre = randomChoice(["x", "n", "a", "t"]);

      return {
        text: `Que signifie ${a}${lettre} ?`,
        format: "qcm",
        choices: makeChoices(`${a} × ${lettre}`, [
          `${a} + ${lettre}`,
          `${a} - ${lettre}`,
          `${lettre} ÷ ${a}`,
        ]),
        expected: [`${a} × ${lettre}`],
        comparator: "mcq_exact",
        explanation:
          `Définition : en calcul littéral, la multiplication peut être écrite sans le signe ×.\n\n` +
          `Méthode : on remet le signe × entre le nombre et la lettre.\n\n` +
          `Calcul : ${a}${lettre} = ${a} × ${lettre}.\n\n` +
          `Conclusion : ${a}${lettre} signifie ${a} multiplié par ${lettre}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_comprendre_tpl_2_traduire",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le double de x s’écrit 2x.",
    tags: ["litteral", "traduire", "template"],
    generate: () => {
      const b = randomInt(3, 12);
      const correct = `2x + ${b}`;

      return {
        text: `Quelle expression traduit : « le double d’un nombre x augmenté de ${b} » ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `x + 2 + ${b}`,
          `2 + x + ${b}`,
          `2(x + ${b})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : traduire une phrase en expression littérale consiste à remplacer les mots par des opérations.\n\n` +
          `Méthode : « le double de x » se traduit par 2x, puis « augmenté de ${b} » signifie qu’on ajoute ${b}.\n\n` +
          `Calcul : le double de x est 2x, donc l’expression est ${correct}.\n\n` +
          `Conclusion : la bonne expression est ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_comprendre_tpl_3_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 2,
    theme: "reunion",
    hint: "Prix total = prix d’un objet × nombre d’objets.",
    tags: ["litteral", "traduire", "reunion", "template"],
    generate: () => {
      const prix = randomChoice([2, 3, 4, 5]);
      const correct = `${prix}x`;

      return {
        text: `Au marché à La Réunion, un fruit coûte ${prix} €. On achète x fruits. Quelle expression donne le prix total ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${prix} + x`,
          `x - ${prix}`,
          `${prix}/x`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : une expression littérale peut représenter une situation réelle avec une variable.\n\n` +
          `Méthode : ici, x représente le nombre de fruits et chaque fruit coûte ${prix} €.\n\n` +
          `Calcul : prix total = ${prix} × x = ${correct}.\n\n` +
          `Conclusion : le prix total est représenté par ${correct}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_comprendre_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève dit : « 5x signifie 5 + x. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un nombre collé à une lettre signifie une multiplication.",
    explanation:
      "Définition : en calcul littéral, 5x signifie 5 multiplié par x.\n\n" +
      "Méthode : on réécrit l’expression avec le signe ×.\n\n" +
      "Calcul : 5x = 5 × x, et non 5 + x.\n\n" +
      "Conclusion : l’élève a tort.",
    tags: ["litteral", "erreur", "notation"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_comprendre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique à quoi sert une lettre dans une expression littérale.",
    format: "open",
    expected: ["nombre", "inconnu", "variable"],
    comparator: "contains_keyword",
    hint: "Une lettre permet de représenter un nombre qu’on ne connaît pas ou qui peut changer.",
    explanation:
      "Définition : une lettre dans une expression littérale représente un nombre inconnu ou variable.\n\n" +
      "Méthode : on utilise cette lettre pour écrire une règle générale ou traduire une situation.\n\n" +
      "Calcul : par exemple, si x est le nombre de places achetées et qu’une place coûte 4 €, le prix total est 4x.\n\n" +
      "Conclusion : une lettre permet de généraliser un calcul.",
    tags: ["litteral", "open", "definition"],
  },
    /* =========================
     LITTERAL_SUBSTITUER
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_substituer_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer 3x + 2 pour x = 4.",
    format: "qcm",
    choices: ["14", "20", "10", "6"],
    expected: ["14"],
    comparator: "mcq_exact",
    hint: "Remplace x par 4.",
    explanation:
      "Définition : substituer signifie remplacer une lettre par une valeur.\n\n" +
      "Méthode : on remplace x par 4 dans l’expression.\n\n" +
      "Calcul : 3 × 4 + 2 = 12 + 2 = 14.\n\n" +
      "Conclusion : la valeur de l’expression est 14.",
    tags: ["litteral", "substitution", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_substituer_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 2a - 5 pour a = -3.",
    format: "short",
    expected: ["-11"],
    comparator: "number_equal",
    hint: "Attention au signe négatif.",
    explanation:
      "Définition : substituer consiste à remplacer une lettre par un nombre.\n\n" +
      "Méthode : on remplace a par -3 puis on calcule étape par étape.\n\n" +
      "Calcul : 2 × (-3) - 5 = -6 - 5 = -11.\n\n" +
      "Conclusion : le résultat est -11.",
    tags: ["litteral", "substitution", "negatif"],
  },

  {
    kind: "template",
    id: "3e_litteral_substituer_tpl_1_simple",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 1,
    theme: "neutral",
    hint: "Remplace la lettre par la valeur donnée.",
    tags: ["litteral", "substitution", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 10);
      const x = randomInt(1, 6);

      const result = a * x + b;

      return {
        text: `Calculer ${a}x + ${b} pour x = ${x}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          `Définition : substituer signifie remplacer une lettre par une valeur.\n\n` +
          `Méthode : on remplace x par ${x}.\n\n` +
          `Calcul : ${a} × ${x} + ${b} = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_substituer_tpl_2_negatif",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    hint: "Les nombres négatifs doivent être écrits entre parenthèses.",
    tags: ["litteral", "substitution", "negatif", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 9);
      const x = randomChoice([-5, -4, -3, -2]);

      const result = a * x + b;

      return {
        text: `Calculer ${a}x ${signedTerm(b)} pour x = ${x}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          `Définition : substituer consiste à remplacer une lettre par une valeur.\n\n` +
          `Méthode : on remplace x par (${x}) pour éviter les erreurs de signe.\n\n` +
          `Calcul : ${a} × (${x}) ${signedTerm(b)} = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_substituer_tpl_3_parentheses",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord ce qu’il y a dans les parenthèses.",
    tags: ["litteral", "substitution", "parentheses", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(1, 6);
      const x = randomInt(1, 5);

      const result = a * (x + b);

      return {
        text: `Calculer ${a}(x + ${b}) pour x = ${x}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          `Définition : substituer consiste à remplacer une lettre par une valeur.\n\n` +
          `Méthode : on remplace x par ${x}, puis on calcule l’intérieur des parenthèses.\n\n` +
          `Calcul : ${a} × (${x} + ${b}) = ${a} × ${x + b} = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_substituer_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "reunion",
    hint: "Prix total = prix par objet × quantité + frais fixes.",
    tags: ["litteral", "substitution", "reunion", "template"],
    generate: () => {
      const prix = randomInt(2, 6);
      const frais = randomInt(1, 5);
      const nb = randomInt(2, 8);

      const result = prix * nb + frais;

      return {
        text:
          `À La Réunion, un snack facture ${prix} € par samoussa et ${frais} € de livraison. ` +
          `Calculer le prix pour ${nb} samoussas avec l’expression ${prix}x + ${frais}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          `Définition : une expression littérale peut modéliser une situation réelle.\n\n` +
          `Méthode : on remplace x par ${nb}, le nombre de samoussas.\n\n` +
          `Calcul : ${prix} × ${nb} + ${frais} = ${result}.\n\n` +
          `Conclusion : le prix total est ${result} €.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_substituer_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule 2x + 3 pour x = 5 et trouve 13. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Remplace x par 5.",
    explanation:
      "Définition : substituer signifie remplacer une lettre par une valeur.\n\n" +
      "Méthode : on remplace x par 5 puis on calcule.\n\n" +
      "Calcul : 2 × 5 + 3 = 10 + 3 = 13.\n\n" +
      "Conclusion : l’élève a raison.",
    tags: ["litteral", "erreur", "verification"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_substituer_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi il faut mettre les nombres négatifs entre parenthèses lorsqu’on remplace une lettre.",
    format: "open",
    expected: ["signe", "parentheses", "negatif"],
    comparator: "contains_keyword",
    hint: "Les parenthèses évitent les erreurs de signe.",
    explanation:
      "Définition : lorsqu’on remplace une lettre par un nombre négatif, on doit conserver son signe.\n\n" +
      "Méthode : on écrit le nombre négatif entre parenthèses.\n\n" +
      "Calcul : par exemple 3x devient 3 × (-2) et non 3 × -2 sans précaution.\n\n" +
      "Conclusion : les parenthèses évitent les erreurs de calcul et de signe.",
    tags: ["litteral", "open", "negatif"],
  },

    /* =========================
     LITTERAL_REDUIRE
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_reduire_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 1,
    theme: "neutral",
    text: "Réduire : 3x + 2x",
    format: "qcm",
    choices: ["5x", "6x", "5x²", "x"],
    expected: ["5x"],
    comparator: "mcq_exact",
    hint: "On additionne les coefficients.",
    explanation:
      "Définition : réduire une expression consiste à regrouper les termes semblables.\n\n" +
      "Méthode : 3x et 2x sont des termes en x.\n\n" +
      "Calcul : 3x + 2x = 5x.\n\n" +
      "Conclusion : l’expression réduite est 5x.",
    tags: ["reduction", "litteral", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_reduire_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Réduire : 4a - 2a + 3",
    format: "short",
    expected: ["2a+3", "3+2a", "2a + 3"],
    comparator: "exact_text",
    hint: "Regroupe les termes en a.",
    explanation:
      "Définition : réduire consiste à simplifier l’écriture d’une expression.\n\n" +
      "Méthode : on regroupe les termes de même nature.\n\n" +
      "Calcul : 4a - 2a = 2a. Donc l’expression devient 2a + 3.\n\n" +
      "Conclusion : l’expression réduite est 2a + 3.",
    tags: ["reduction", "litteral"],
  },

  {
    kind: "template",
    id: "3e_litteral_reduire_tpl_1_simple",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 1,
    theme: "neutral",
    hint: "Additionne les coefficients des termes semblables.",
    tags: ["reduction", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const b = randomInt(1, 9);

      return {
        text: `Réduire : ${a}x + ${b}x`,
        format: "short",
        expected: [`${a + b}x`],
        comparator: "exact_text",
        explanation:
          `Définition : réduire consiste à regrouper les termes semblables.\n\n` +
          `Méthode : ${a}x et ${b}x sont des termes en x.\n\n` +
          `Calcul : ${a}x + ${b}x = ${a + b}x.\n\n` +
          `Conclusion : l’expression réduite est ${a + b}x.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_reduire_tpl_2_avec_constante",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regroupe les x ensemble puis les nombres.",
    tags: ["reduction", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(1, 8);
      const c = randomInt(1, 10);

      const coeff = a - b;

      return {
        text: `Réduire : ${a}x - ${b}x + ${c}`,
        format: "short",
        expected: [
          `${coeff}x+${c}`,
          `${coeff}x + ${c}`,
          `${c}+${coeff}x`,
        ],
        comparator: "exact_text",
        explanation:
          `Définition : réduire consiste à regrouper les termes de même nature.\n\n` +
          `Méthode : on regroupe les termes en x.\n\n` +
          `Calcul : ${a}x - ${b}x = ${coeff}x. L’expression devient ${coeff}x + ${c}.\n\n` +
          `Conclusion : l’expression réduite est ${coeff}x + ${c}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_reduire_tpl_3_double_variable",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne mélange pas les x et les y.",
    tags: ["reduction", "variable", "template"],
    generate: () => {
      const ax = randomInt(2, 7);
      const bx = randomInt(1, 5);

      const ay = randomInt(2, 7);
      const by = randomInt(1, 5);

      return {
        text: `Réduire : ${ax}x + ${ay}y - ${bx}x + ${by}y`,
        format: "short",
        expected: [
          `${ax - bx}x+${ay + by}y`,
          `${ax - bx}x + ${ay + by}y`,
        ],
        comparator: "exact_text",
        explanation:
          `Définition : seuls les termes semblables peuvent être regroupés.\n\n` +
          `Méthode : on regroupe les termes en x puis ceux en y.\n\n` +
          `Calcul : ${ax}x - ${bx}x = ${ax - bx}x et ${ay}y + ${by}y = ${ay + by}y.\n\n` +
          `Conclusion : l’expression réduite est ${ax - bx}x + ${ay + by}y.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_reduire_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "reunion",
    hint: "Additionne les quantités identiques.",
    tags: ["reduction", "reunion", "template"],
    generate: () => {
      const m1 = randomInt(2, 8);
      const m2 = randomInt(1, 7);

      return {
        text:
          `Au marché de Saint-Pierre, Maé achète ${m1} mangues puis ${m2} mangues. ` +
          `On note x le prix d’une mangue. Réduire l’expression : ${m1}x + ${m2}x`,
        format: "short",
        expected: [`${m1 + m2}x`],
        comparator: "exact_text",
        explanation:
          `Définition : réduire consiste à regrouper les termes semblables.\n\n` +
          `Méthode : ${m1}x et ${m2}x représentent des prix de mangues.\n\n` +
          `Calcul : ${m1}x + ${m2}x = ${m1 + m2}x.\n\n` +
          `Conclusion : le prix total s’écrit ${m1 + m2}x.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_reduire_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : 3x + 2 = 5x. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "2 n’est pas un terme en x.",
    explanation:
      "Définition : seuls les termes semblables peuvent être additionnés.\n\n" +
      "Méthode : 3x est un terme en x alors que 2 est un nombre seul.\n\n" +
      "Calcul : on ne peut pas additionner 3x et 2.\n\n" +
      "Conclusion : 3x + 2 ne peut pas se réduire en 5x.",
    tags: ["reduction", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_reduire_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    text: "Explique ce que signifie « termes semblables » en calcul littéral.",
    format: "open",
    expected: ["meme", "lettre", "puissance"],
    comparator: "contains_keyword",
    hint: "Les termes doivent avoir la même partie littérale.",
    explanation:
      "Définition : deux termes sont semblables lorsqu’ils possèdent la même partie littérale.\n\n" +
      "Méthode : on compare les lettres et leurs puissances.\n\n" +
      "Calcul : par exemple 3x et -2x sont semblables, mais 3x et 3y ne le sont pas.\n\n" +
      "Conclusion : seuls les termes semblables peuvent être regroupés.",
    tags: ["reduction", "open", "vocabulaire"],
  },
    /* =========================
     LITTERAL_DEVELOPPER
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_developper_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 2,
    theme: "neutral",
    text: "Développer : 3(x + 4)",
    format: "qcm",
    choices: ["3x + 12", "3x + 4", "x + 12", "7x"],
    expected: ["3x + 12"],
    comparator: "mcq_exact",
    hint: "Multiplie 3 par chaque terme de la parenthèse.",
    explanation:
      "Définition : développer, c’est supprimer les parenthèses en distribuant la multiplication.\n\n" +
      "Méthode : on multiplie 3 par x puis 3 par 4.\n\n" +
      "Calcul : 3(x + 4) = 3 × x + 3 × 4 = 3x + 12.\n\n" +
      "Conclusion : l’expression développée est 3x + 12.",
    tags: ["litteral", "developper", "distributivite", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_developper_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 3,
    theme: "neutral",
    text: "Développer : -2(x - 5)",
    format: "short",
    expected: ["-2x+10", "-2x + 10", "10-2x", "10 - 2x"],
    comparator: "exact_text",
    hint: "Attention au signe moins devant 2.",
    explanation:
      "Définition : développer, c’est multiplier chaque terme de la parenthèse par le facteur extérieur.\n\n" +
      "Méthode : on multiplie -2 par x puis -2 par -5.\n\n" +
      "Calcul : -2(x - 5) = -2 × x + (-2) × (-5) = -2x + 10.\n\n" +
      "Conclusion : l’expression développée est -2x + 10.",
    tags: ["litteral", "developper", "signe"],
  },

  {
    kind: "template",
    id: "3e_litteral_developper_tpl_1_simple",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 2,
    theme: "neutral",
    hint: "Distribue le facteur devant la parenthèse.",
    tags: ["litteral", "developper", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(2, 9);

      return {
        text: `Développer : ${a}(x + ${b})`,
        format: "short",
        expected: [`${a}x+${a * b}`, `${a}x + ${a * b}`],
        comparator: "exact_text",
        explanation:
          `Définition : développer consiste à transformer un produit en somme.\n\n` +
          `Méthode : on multiplie ${a} par chaque terme de la parenthèse.\n\n` +
          `Calcul : ${a}(x + ${b}) = ${a} × x + ${a} × ${b} = ${a}x + ${a * b}.\n\n` +
          `Conclusion : l’expression développée est ${a}x + ${a * b}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_developper_tpl_2_moins",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "Le signe moins devant la parenthèse change les signes.",
    tags: ["litteral", "developper", "moins", "template"],
    generate: () => {
      const b = randomInt(2, 9);

      return {
        text: `Développer : -(x + ${b})`,
        format: "short",
        expected: [`-x-${b}`, `-x - ${b}`],
        comparator: "exact_text",
        explanation:
          `Définition : développer avec un signe moins revient à multiplier par -1.\n\n` +
          `Méthode : on multiplie chaque terme de la parenthèse par -1.\n\n` +
          `Calcul : -(x + ${b}) = -x - ${b}.\n\n` +
          `Conclusion : l’expression développée est -x - ${b}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_developper_tpl_3_signe",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie aussi les signes.",
    tags: ["litteral", "developper", "signe", "template"],
    generate: () => {
      const a = randomChoice([-5, -4, -3, -2]);
      const b = randomInt(2, 8);
      const c = -a * b;

      return {
        text: `Développer : ${a}(x - ${b})`,
        format: "short",
        expected: [`${a}x+${c}`, `${a}x + ${c}`],
        comparator: "exact_text",
        explanation:
          `Définition : développer consiste à multiplier chaque terme de la parenthèse par le facteur extérieur.\n\n` +
          `Méthode : on multiplie ${a} par x, puis ${a} par -${b}.\n\n` +
          `Calcul : ${a}(x - ${b}) = ${a}x + ${c}.\n\n` +
          `Conclusion : l’expression développée est ${a}x + ${c}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_developper_tpl_4_double_distributivite",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplie chaque terme de la première parenthèse par chaque terme de la seconde.",
    tags: ["litteral", "developper", "double_distributivite", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(1, 6);
      const c = randomInt(1, 5);
      const d = randomInt(1, 6);

      const x2 = a * c;
      const x = a * d + b * c;
      const constant = b * d;

      return {
        text: `Développer : (${a}x + ${b})(${c}x + ${d})`,
        format: "short",
        expected: [
          `${x2}x²+${x}x+${constant}`,
          `${x2}x^2+${x}x+${constant}`,
          `${x2}x² + ${x}x + ${constant}`,
          `${x2}x^2 + ${x}x + ${constant}`,
        ],
        comparator: "exact_text",
        explanation:
          `Définition : la double distributivité permet de développer un produit de deux parenthèses.\n\n` +
          `Méthode : on multiplie chaque terme de la première parenthèse par chaque terme de la deuxième.\n\n` +
          `Calcul : (${a}x + ${b})(${c}x + ${d}) = ${x2}x² + ${a * d}x + ${b * c}x + ${constant} = ${x2}x² + ${x}x + ${constant}.\n\n` +
          `Conclusion : l’expression développée et réduite est ${x2}x² + ${x}x + ${constant}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_developper_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : 4(x + 3) = 4x + 3. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le 4 doit multiplier tous les termes de la parenthèse.",
    explanation:
      "Définition : développer consiste à multiplier chaque terme de la parenthèse par le facteur extérieur.\n\n" +
      "Méthode : on multiplie 4 par x et 4 par 3.\n\n" +
      "Calcul : 4(x + 3) = 4x + 12, et non 4x + 3.\n\n" +
      "Conclusion : l’élève a oublié de multiplier le deuxième terme.",
    tags: ["litteral", "developper", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_developper_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 3,
    theme: "neutral",
    text: "Explique ce que signifie développer une expression.",
    format: "open",
    expected: ["parenthèses", "multiplie", "distributivité"],
    comparator: "contains_keyword",
    hint: "Développer sert souvent à supprimer les parenthèses.",
    explanation:
      "Définition : développer une expression signifie transformer un produit avec parenthèses en une somme ou une différence.\n\n" +
      "Méthode : on utilise la distributivité en multipliant chaque terme de la parenthèse.\n\n" +
      "Calcul : par exemple, 3(x + 2) = 3x + 6.\n\n" +
      "Conclusion : développer permet de supprimer les parenthèses correctement.",
    tags: ["litteral", "developper", "open"],
  },
    /* =========================
     LITTERAL_FACTORISER
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 2,
    theme: "neutral",
    text: "Factoriser : 3x + 12",
    format: "qcm",
    choices: ["3(x + 4)", "x(3 + 12)", "3(x + 12)", "12(x + 3)"],
    expected: ["3(x + 4)"],
    comparator: "mcq_exact",
    hint: "Cherche le facteur commun.",
    explanation:
      "Définition : factoriser, c’est transformer une somme en produit.\n\n" +
      "Méthode : on cherche un facteur commun aux deux termes.\n\n" +
      "Calcul : 3x + 12 = 3 × x + 3 × 4 = 3(x + 4).\n\n" +
      "Conclusion : la forme factorisée est 3(x + 4).",
    tags: ["litteral", "factoriser", "facteur_commun"],
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_tpl_1_simple",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le nombre qui divise les deux termes.",
    tags: ["litteral", "factoriser", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      const b = randomInt(2, 8);
      const constant = k * b;

      return {
        text: `Factoriser : ${k}x + ${constant}`,
        format: "short",
        expected: [`${k}(x+${b})`, `${k}(x + ${b})`],
        comparator: "exact_text",
        explanation:
          `Définition : factoriser consiste à écrire une somme sous forme de produit.\n\n` +
          `Méthode : on cherche le facteur commun ${k}.\n\n` +
          `Calcul : ${k}x + ${constant} = ${k} × x + ${k} × ${b} = ${k}(x + ${b}).\n\n` +
          `Conclusion : la forme factorisée est ${k}(x + ${b}).`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_tpl_2_avec_x",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    hint: "Le facteur commun peut être x.",
    tags: ["litteral", "factoriser", "facteur_x", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(2, 9);

      return {
        text: `Factoriser : ${a}x² + ${b}x`,
        format: "short",
        expected: [`x(${a}x+${b})`, `x(${a}x + ${b})`],
        comparator: "exact_text",
        explanation:
          `Définition : factoriser, c’est repérer un facteur commun.\n\n` +
          `Méthode : les deux termes ${a}x² et ${b}x contiennent le facteur x.\n\n` +
          `Calcul : ${a}x² + ${b}x = x(${a}x + ${b}).\n\n` +
          `Conclusion : la forme factorisée est x(${a}x + ${b}).`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_tpl_3_signe_moins",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    hint: "Le facteur commun est le nombre devant x.",
    tags: ["litteral", "factoriser", "signe", "template"],
    generate: () => {
      const k = randomInt(2, 8);
      const b = randomInt(2, 9);
      const constant = k * b;

      return {
        text: `Factoriser : ${k}x - ${constant}`,
        format: "short",
        expected: [`${k}(x-${b})`, `${k}(x - ${b})`],
        comparator: "exact_text",
        explanation:
          `Définition : factoriser consiste à transformer une différence en produit.\n\n` +
          `Méthode : on cherche le facteur commun ${k}.\n\n` +
          `Calcul : ${k}x - ${constant} = ${k} × x - ${k} × ${b} = ${k}(x - ${b}).\n\n` +
          `Conclusion : la forme factorisée est ${k}(x - ${b}).`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "reunion",
    hint: "Cherche le facteur commun qui représente le prix unitaire.",
    tags: ["litteral", "factoriser", "reunion", "template"],
    generate: () => {
      const prix = randomInt(2, 6);
      const a = randomInt(2, 7);
      const b = randomInt(2, 7);

      return {
        text:
          `Au marché de Saint-Pierre, deux achats coûtent ${prix}x € et ${prix * b} €. ` +
          `Factoriser : ${prix}x + ${prix * b}`,
        format: "short",
        expected: [`${prix}(x+${b})`, `${prix}(x + ${b})`],
        comparator: "exact_text",
        explanation:
          `Définition : factoriser permet de mettre en évidence un facteur commun.\n\n` +
          `Méthode : on cherche ce qui est commun à ${prix}x et ${prix * b}.\n\n` +
          `Calcul : ${prix}x + ${prix * b} = ${prix}(x + ${b}).\n\n` +
          `Conclusion : la forme factorisée est ${prix}(x + ${b}).`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : 5x + 10 = 5(x + 10). A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie en développant.",
    explanation:
      "Définition : une factorisation correcte doit redonner l’expression de départ lorsqu’on développe.\n\n" +
      "Méthode : on développe 5(x + 10) pour vérifier.\n\n" +
      "Calcul : 5(x + 10) = 5x + 50, pas 5x + 10.\n\n" +
      "Conclusion : l’élève a tort ; la bonne factorisation est 5(x + 2).",
    tags: ["litteral", "factoriser", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment vérifier qu’une factorisation est correcte.",
    format: "open",
    expected: ["développer", "retrouver", "expression"],
    comparator: "contains_keyword",
    hint: "On peut développer la forme factorisée.",
    explanation:
      "Définition : factoriser transforme une somme en produit.\n\n" +
      "Méthode : pour vérifier, on développe la forme factorisée.\n\n" +
      "Calcul : si on propose 3(x + 4), on développe : 3x + 12.\n\n" +
      "Conclusion : la factorisation est correcte si on retrouve l’expression de départ lorsqu’on développe.",
    tags: ["litteral", "factoriser", "open", "verification"],
  },

    /* =========================
     LITTERAL_IDENTITES
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_identite_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 3,
    theme: "neutral",
    text: "Développer : (x + 3)²",
    format: "qcm",
    choices: [
      "x² + 6x + 9",
      "x² + 9",
      "x² + 3x + 9",
      "2x + 9"
    ],
    expected: ["x² + 6x + 9"],
    comparator: "mcq_exact",
    hint: "Utilise (a + b)² = a² + 2ab + b².",
    explanation:
      "Définition : (a + b)² est une identité remarquable.\n\n" +
      "Méthode : on applique la formule (a + b)² = a² + 2ab + b².\n\n" +
      "Calcul : (x + 3)² = x² + 2 × x × 3 + 3² = x² + 6x + 9.\n\n" +
      "Conclusion : le développement est x² + 6x + 9.",
    tags: ["identites", "developpement", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_identite_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 3,
    theme: "neutral",
    text: "Développer : (x - 5)²",
    format: "short",
    expected: [
      "x²-10x+25",
      "x² - 10x + 25"
    ],
    comparator: "exact_text",
    hint: "Attention au signe du terme du milieu.",
    explanation:
      "Définition : (a - b)² = a² - 2ab + b².\n\n" +
      "Méthode : on applique l’identité remarquable.\n\n" +
      "Calcul : (x - 5)² = x² - 2 × x × 5 + 25 = x² - 10x + 25.\n\n" +
      "Conclusion : le développement est x² - 10x + 25.",
    tags: ["identites", "carre_difference"],
  },

  {
    kind: "template",
    id: "3e_litteral_identite_tpl_1_somme",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise (a + b)².",
    tags: ["identites", "template"],
    generate: () => {
      const b = randomInt(2, 9);

      return {
        text: `Développer : (x + ${b})²`,
        format: "short",
        expected: [
          `x²+${2 * b}x+${b * b}`,
          `x² + ${2 * b}x + ${b * b}`,
        ],
        comparator: "exact_text",
        explanation:
          `Définition : (a + b)² = a² + 2ab + b².\n\n` +
          `Méthode : on applique directement l’identité remarquable.\n\n` +
          `Calcul : (x + ${b})² = x² + ${2 * b}x + ${b * b}.\n\n` +
          `Conclusion : le développement est x² + ${2 * b}x + ${b * b}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_identite_tpl_2_difference",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise (a - b)².",
    tags: ["identites", "template"],
    generate: () => {
      const b = randomInt(2, 9);

      return {
        text: `Développer : (x - ${b})²`,
        format: "short",
        expected: [
          `x²-${2 * b}x+${b * b}`,
          `x² - ${2 * b}x + ${b * b}`,
        ],
        comparator: "exact_text",
        explanation:
          `Définition : (a - b)² = a² - 2ab + b².\n\n` +
          `Méthode : on applique l’identité remarquable.\n\n` +
          `Calcul : (x - ${b})² = x² - ${2 * b}x + ${b * b}.\n\n` +
          `Conclusion : le développement est x² - ${2 * b}x + ${b * b}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_identite_tpl_3_difference_carres",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise a² - b² = (a - b)(a + b).",
    tags: ["identites", "difference_carres", "template"],
    generate: () => {
      const b = randomInt(2, 10);

      return {
        text: `Factoriser : x² - ${b * b}`,
        format: "short",
        expected: [
          `(x-${b})(x+${b})`,
          `(x - ${b})(x + ${b})`,
        ],
        comparator: "exact_text",
        explanation:
          `Définition : a² - b² est une différence de deux carrés.\n\n` +
          `Méthode : on applique l’identité remarquable a² - b² = (a - b)(a + b).\n\n` +
          `Calcul : x² - ${b * b} = (x - ${b})(x + ${b}).\n\n` +
          `Conclusion : la forme factorisée est (x - ${b})(x + ${b}).`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_identite_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 4,
    theme: "reunion",
    hint: "Reconnais une identité remarquable.",
    tags: ["identites", "reunion", "template"],
    generate: () => {
      const b = randomInt(2, 7);

      return {
        text:
          `À Saint-Denis, un terrain carré a pour côté (x + ${b}) mètres. ` +
          `Exprime son aire sous forme développée.`,
        format: "short",
        expected: [
          `x²+${2 * b}x+${b * b}`,
          `x² + ${2 * b}x + ${b * b}`,
        ],
        comparator: "exact_text",
        explanation:
          `Définition : l’aire d’un carré de côté (x + ${b}) est (x + ${b})².\n\n` +
          `Méthode : on applique l’identité remarquable.\n\n` +
          `Calcul : (x + ${b})² = x² + ${2 * b}x + ${b * b}.\n\n` +
          `Conclusion : l’aire développée est x² + ${2 * b}x + ${b * b}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_identite_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : (x + 2)² = x² + 4. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il manque un terme.",
    explanation:
      "Définition : (a + b)² = a² + 2ab + b².\n\n" +
      "Méthode : il faut penser au terme du milieu.\n\n" +
      "Calcul : (x + 2)² = x² + 4x + 4.\n\n" +
      "Conclusion : l’élève a oublié le terme 4x.",
    tags: ["identites", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_identite_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 4,
    theme: "neutral",
    text: "Explique à quoi servent les identités remarquables.",
    format: "open",
    expected: [
      "développer",
      "factoriser",
      "plus vite"
    ],
    comparator: "contains_keyword",
    hint: "Elles permettent de gagner du temps.",
    explanation:
      "Définition : les identités remarquables sont des égalités utiles à connaître.\n\n" +
      "Méthode : elles servent à développer ou factoriser rapidement certaines expressions.\n\n" +
      "Calcul : par exemple, (x + 3)² peut être développé directement sans double distributivité.\n\n" +
      "Conclusion : les identités remarquables permettent de calculer plus vite et plus efficacement.",
    tags: ["identites", "open"],
  },
    /* =========================
     LITTERAL_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme : « 2x + 3x² = 5x² ». A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "x et x² ne sont pas des termes semblables.",
    explanation:
      "Définition : on ne peut réduire que des termes semblables.\n\n" +
      "Méthode : on compare les parties littérales des termes.\n\n" +
      "Calcul : 2x est un terme en x, alors que 3x² est un terme en x². Ils ne sont pas semblables.\n\n" +
      "Conclusion : l’expression 2x + 3x² ne se réduit pas en 5x².",
    tags: ["litteral", "defi", "erreur", "reduction"],
  },

  {
    kind: "template",
    id: "3e_litteral_defi_tpl_1_valeur_expression",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe ou réduis avant de remplacer.",
    tags: ["litteral", "defi", "substitution", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(2, 6);
      const x = randomInt(1, 5);
      const result = a * (x + b) - a * x;

      return {
        text: `Calculer ${a}(x + ${b}) - ${a}x pour x = ${x}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          `Définition : une expression littérale peut être simplifiée avant d’être calculée.\n\n` +
          `Méthode : on développe d’abord ${a}(x + ${b}), puis on réduit.\n\n` +
          `Calcul : ${a}(x + ${b}) - ${a}x = ${a}x + ${a * b} - ${a}x = ${a * b}.\n\n` +
          `Conclusion : quelle que soit la valeur de x, le résultat est ${a * b}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_defi_tpl_2_comparer_expressions",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe les deux expressions pour les comparer.",
    tags: ["litteral", "defi", "developper", "comparer", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(2, 8);
      const c = a * b;

      return {
        text: `Les expressions ${a}(x + ${b}) et ${a}x + ${c} sont-elles égales pour tout x ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          `Définition : deux expressions sont égales pour tout x si elles ont la même forme réduite.\n\n` +
          `Méthode : on développe la première expression.\n\n` +
          `Calcul : ${a}(x + ${b}) = ${a}x + ${a * b} = ${a}x + ${c}.\n\n` +
          `Conclusion : les deux expressions sont égales pour tout x.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_defi_tpl_3_factorisation_cachee",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche un facteur commun.",
    tags: ["litteral", "defi", "factoriser", "template"],
    generate: () => {
      const k = randomInt(2, 8);
      const a = randomInt(2, 7);
      const b = randomInt(2, 7);

      return {
        text: `Factoriser : ${k * a}x + ${k * b}`,
        format: "short",
        expected: [
          `${k}(${a}x+${b})`,
          `${k}(${a}x + ${b})`,
        ],
        comparator: "exact_text",
        explanation:
          `Définition : factoriser consiste à transformer une somme en produit.\n\n` +
          `Méthode : on cherche un facteur commun aux deux termes.\n\n` +
          `Calcul : ${k * a}x + ${k * b} = ${k} × ${a}x + ${k} × ${b} = ${k}(${a}x + ${b}).\n\n` +
          `Conclusion : la forme factorisée est ${k}(${a}x + ${b}).`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_defi_tpl_4_identite_ou_pas",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention au terme du milieu dans un carré.",
    tags: ["litteral", "defi", "identites", "piege", "template"],
    generate: () => {
      const b = randomInt(2, 7);

      return {
        text: `L’égalité (x + ${b})² = x² + ${b * b} est-elle vraie pour tout x ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : une identité remarquable permet de développer correctement un carré.\n\n` +
          `Méthode : on utilise (a + b)² = a² + 2ab + b².\n\n` +
          `Calcul : (x + ${b})² = x² + ${2 * b}x + ${b * b}, il manque donc le terme ${2 * b}x dans l’égalité proposée.\n\n` +
          `Conclusion : l’égalité proposée est fausse pour tout x.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_defi_tpl_5_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Traduis chaque partie du prix par une expression.",
    tags: ["litteral", "defi", "reunion", "modelisation", "template"],
    generate: () => {
      const prix = randomInt(2, 5);
      const supplement = randomInt(1, 4);
      const nb = randomInt(2, 6);
      const expression = `${prix}x + ${supplement}`;
      const total = prix * nb + supplement;

      return {
        text:
          `À La Réunion, un stand vend x jus de fruits à ${prix} € chacun avec ${supplement} € de frais fixes. ` +
          `L’expression du prix est ${expression}. Calculer le prix pour x = ${nb}.`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : une expression littérale peut modéliser une situation réelle.\n\n` +
          `Méthode : on remplace x par ${nb} dans l’expression.\n\n` +
          `Calcul : ${prix} × ${nb} + ${supplement} = ${total}.\n\n` +
          `Conclusion : le prix total est ${total} €.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre développer, réduire et factoriser.",
    format: "open",
    expected: ["développer", "réduire", "factoriser"],
    comparator: "contains_keyword",
    hint: "Développer enlève des parenthèses, réduire regroupe, factoriser met en produit.",
    explanation:
      "Définition : développer, réduire et factoriser sont trois transformations d’écritures littérales.\n\n" +
      "Méthode : développer supprime des parenthèses, réduire regroupe les termes semblables, factoriser transforme une somme en produit.\n\n" +
      "Calcul : par exemple, 3(x + 2) se développe en 3x + 6 ; 3x + 2x se réduit en 5x ; 3x + 6 se factorise en 3(x + 2).\n\n" +
      "Conclusion : ces trois techniques servent à changer la forme d’une expression selon l’objectif.",
    tags: ["litteral", "defi", "open", "synthese"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_defi_open_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on peut vérifier une factorisation en développant.",
    format: "open",
    expected: ["factorisation", "développer", "retrouve"],
    comparator: "contains_keyword",
    hint: "Développer est l’opération inverse de factoriser.",
    explanation:
      "Définition : factoriser transforme une somme en produit, tandis que développer transforme un produit en somme.\n\n" +
      "Méthode : pour vérifier une factorisation, on développe la forme factorisée.\n\n" +
      "Calcul : si 4x + 12 = 4(x + 3), alors en développant 4(x + 3), on retrouve 4x + 12.\n\n" +
      "Conclusion : une factorisation est correcte si le développement redonne l’expression de départ.",
    tags: ["litteral", "defi", "open", "verification"],
  },
];
