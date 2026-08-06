// lib/tutor-v4/question-banks/maths/cm2/calcul.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  // La bonne réponse ne doit JAMAIS sauter au découpage : on la met de côté,
  // on tire trois distracteurs distincts, puis on mélange l'ensemble.
  // ⚠️ 05/08/2026 — les versions précédentes jetaient la bonne réponse dans le
  // même chapeau que les pièges avant de couper à quatre. Avec quatre pièges
  // écrits, elle pouvait rester au fond : l'élève voyait alors quatre
  // propositions dont aucune n'était bonne, sans que rien ne le signale.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function formatNumber(n: number) {
  return Number.isInteger(n)
    ? String(n)
    : String(Math.round(n * 100) / 100).replace(".", ",");
}

function expectedNumber(n: number) {
  const dot = Number.isInteger(n)
    ? String(n)
    : String(Math.round(n * 100) / 100);

  const comma = dot.replace(".", ",");

  return dot === comma ? [dot] : [dot, comma];
}

function calculPoseCanvas(data: {
  operation: "addition" | "soustraction" | "multiplication" | "division";
  numbers: Array<number | string>;
  result?: number | string;
  retenues?: string[];
  questionLabel?: string;
  title?: string;
  display?: {
    showResult?: boolean;
    showRetenues?: boolean;
    compact?: boolean;
  };
}) {
  return {
    kind: "calcul_pose" as const,
    operation: data.operation,
    title: data.title,
    numbers: data.numbers.map(String),
    result: data.result !== undefined ? String(data.result) : undefined,
    retenues: data.retenues,
    questionLabel: data.questionLabel,
    display: {
      showResult: data.display?.showResult ?? true,
      showRetenues: data.display?.showRetenues ?? false,
      compact: data.display?.compact ?? false,
    },
  };
}

export const calculBank: TutorBankItemV4[] = [
  /* ============================================================
     CALCUL_MENTAL
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_calcul_mental_fixed_1_double",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule mentalement : 25 + 25.",
    format: "qcm",
    choices: ["50", "40", "55", "100"],
    expected: ["50"],
    comparator: "mcq_exact",
    hint: "25 + 25, c’est le double de 25.",
    explanation: exp(
      "Calculer mentalement, c’est utiliser une stratégie simple sans poser l’opération.",
      "On peut reconnaître un double.",
      "25 + 25 = 50.",
      "Le résultat est 50."
    ),
    tags: ["cm2", "calcul", "mental", "double", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_mental_fixed_2_complement_100",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre faut-il ajouter à 37 pour obtenir 100 ?",
    format: "qcm",
    choices: ["63", "73", "53", "67"],
    expected: ["63"],
    comparator: "mcq_exact",
    hint: "Cherche le complément à 100.",
    explanation: exp(
      "Un complément permet d’atteindre un nombre cible.",
      "Pour aller de 37 à 100, on calcule 100 - 37.",
      "100 - 37 = 63.",
      "Il faut ajouter 63."
    ),
    tags: ["cm2", "calcul", "mental", "complement", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_calcul_mental_tpl_1_double",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "Le double, c’est deux fois le même nombre.",
    tags: ["cm2", "calcul", "mental", "double", "template"],
    generate: () => {
      const n = randomChoice([12, 15, 20, 25, 30, 40, 50]);
      const result = 2 * n;

      return {
        text: `Calcule mentalement le double de ${n}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Le double d’un nombre est ce nombre ajouté à lui-même.",
          "On calcule 2 fois le nombre.",
          `2 × ${n} = ${result}.`,
          `Le double de ${n} est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_calcul_mental_tpl_2_complement_100",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule ce qu’il manque pour arriver à 100.",
    tags: ["cm2", "calcul", "mental", "complement_100", "template"],
    generate: () => {
      const n = randomChoice([18, 27, 34, 46, 58, 72, 85]);
      const result = 100 - n;

      return {
        text: `Quel nombre faut-il ajouter à ${n} pour obtenir 100 ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Un complément à 100 est le nombre qu’il faut ajouter pour atteindre 100.",
          "On calcule 100 moins le nombre de départ.",
          `100 - ${n} = ${result}.`,
          `Il faut ajouter ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_calcul_mental_tpl_3_mult_par_10_100",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 10 ou 100 revient à changer de rang.",
    tags: ["cm2", "calcul", "mental", "multiplier_10_100", "template"],
    generate: () => {
      const n = randomChoice([12, 23, 45, 67, 84]);
      const k = randomChoice([10, 100]);
      const result = n * k;

      return {
        text: `Calcule mentalement : ${n} × ${k}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 10 ou 100 est un calcul mental fréquent.",
          "On multiplie le nombre par le coefficient donné.",
          `${n} × ${k} = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_calcul_mental_fixed_3_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : 48 + 25 = 63. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Ajoute 20 puis 5.",
    explanation: exp(
      "Pour calculer mentalement, on peut décomposer un nombre.",
      "On ajoute 20 puis 5.",
      "48 + 20 = 68, puis 68 + 5 = 73.",
      "L’élève a tort : 48 + 25 = 73."
    ),
    tags: ["cm2", "calcul", "mental", "erreur", "qcm"],
  },

  /* ============================================================
     CALCUL_ADDITION_POSEE
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_calcul_addition_posee_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 245 + 132.",
    format: "qcm",
    choices: ["377", "367", "387", "113"],
    expected: ["377"],
    comparator: "mcq_exact",
    hint: "Additionne les unités, puis les dizaines, puis les centaines.",
    explanation: exp(
      "Une addition posée permet d’additionner des nombres en alignant les chiffres par rang.",
      "On additionne les unités, les dizaines, puis les centaines.",
      "245 + 132 = 377.",
      "Le résultat est 377."
    ),
    tags: ["cm2", "calcul", "addition_posee", "qcm", "canvas"],
    canvas: calculPoseCanvas({
      operation: "addition",
      numbers: [245, 132],
      result: 377,
      title: "Addition posée",
    }),
  },

  {
    kind: "template",
    id: "cm2_calcul_addition_posee_tpl_1_sans_retenue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 1,
    theme: "neutral",
    hint: "Aligne bien les unités avec les unités.",
    tags: ["cm2", "calcul", "addition_posee", "sans_retenue", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [123, 214],
        [342, 531],
        [602, 207],
        [421, 136],
        [253, 314],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a + b;

      return {
        text: `Calcule : ${a} + ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Pour poser une addition, on aligne les chiffres selon leur rang.",
          "On additionne colonne par colonne.",
          `${a} + ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          numbers: [a, b],
          result,
          title: "Addition posée",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_calcul_addition_posee_tpl_2_avec_retenue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention aux retenues.",
    tags: ["cm2", "calcul", "addition_posee", "retenue", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [487, 268],
        [596, 347],
        [758, 184],
        [679, 256],
        [835, 187],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a + b;

      return {
        text: `Calcule : ${a} + ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une retenue apparaît quand une colonne dépasse 9.",
          "On additionne les unités, puis on reporte la retenue si nécessaire.",
          `${a} + ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          numbers: [a, b],
          result,
          retenues: ["", "1", "1", ""],
          title: "Addition avec retenues",
          display: {
            showRetenues: true,
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_calcul_addition_posee_fixed_2_erreur_alignement",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Pour poser 45 + 203, faut-il aligner les unités sous les unités ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Les chiffres doivent être alignés par rang.",
    explanation: exp(
      "Dans une addition posée, les chiffres sont alignés selon leur rang.",
      "Les unités se placent sous les unités, les dizaines sous les dizaines.",
      "Dans 45 + 203, le 5 et le 3 sont dans la colonne des unités.",
      "Oui, il faut aligner les unités sous les unités."
    ),
    tags: ["cm2", "calcul", "addition_posee", "alignement", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_addition_posee_open_1_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment poser correctement une addition.",
    format: "open",
    expected: ["aligner", "unités", "dizaines", "retenue"],
    comparator: "contains_keyword",
    hint: "Parle de l’alignement des chiffres et des retenues.",
    explanation: exp(
      "Une addition posée organise les chiffres par rang.",
      "On aligne les unités, les dizaines et les centaines, puis on calcule colonne par colonne.",
      "Si une colonne dépasse 9, on écrit une retenue dans la colonne suivante.",
      "Pour poser une addition, il faut aligner les rangs et gérer les retenues."
    ),
    tags: ["cm2", "calcul", "addition_posee", "open", "methode"],
  },

  /* ============================================================
     CALCUL_SOUSTRACTION_POSEE
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_calcul_soustraction_posee_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 586 - 243.",
    format: "qcm",
    choices: ["343", "333", "353", "829"],
    expected: ["343"],
    comparator: "mcq_exact",
    hint: "Soustrais colonne par colonne.",
    explanation: exp(
      "Une soustraction posée permet de calculer une différence.",
      "On aligne les chiffres par rang et on soustrait colonne par colonne.",
      "586 - 243 = 343.",
      "Le résultat est 343."
    ),
    tags: ["cm2", "calcul", "soustraction_posee", "qcm", "canvas"],
    canvas: calculPoseCanvas({
      operation: "soustraction",
      numbers: [586, 243],
      result: 343,
      title: "Soustraction posée",
    }),
  },

  {
    kind: "template",
    id: "cm2_calcul_soustraction_posee_tpl_1_sans_retenue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 1,
    theme: "neutral",
    hint: "Aligne bien les chiffres par rang.",
    tags: ["cm2", "calcul", "soustraction_posee", "sans_retenue", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [864, 321],
        [975, 452],
        [746, 215],
        [689, 234],
        [598, 176],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a - b;

      return {
        text: `Calcule : ${a} - ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une soustraction posée permet de calculer ce qui reste ou l’écart entre deux nombres.",
          "On soustrait les unités, puis les dizaines, puis les centaines.",
          `${a} - ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          numbers: [a, b],
          result,
          title: "Soustraction posée",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_calcul_soustraction_posee_tpl_2_avec_retenue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Si le chiffre du haut est trop petit, il faut utiliser une retenue.",
    tags: ["cm2", "calcul", "soustraction_posee", "retenue", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [704, 268],
        [632, 458],
        [905, 376],
        [821, 547],
        [1000, 368],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a - b;

      return {
        text: `Calcule : ${a} - ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une soustraction posée, une retenue peut être nécessaire.",
          "On vérifie colonne par colonne si le chiffre du haut permet la soustraction.",
          `${a} - ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          numbers: [a, b],
          result,
          retenues: ["", "1", "1", ""],
          title: "Soustraction avec retenues",
          display: {
            showRetenues: true,
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_calcul_soustraction_posee_fixed_2_erreur_ordre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule 352 - 187 en faisant parfois le plus grand chiffre moins le plus petit dans chaque colonne. Est-ce correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Dans une soustraction, l’ordre des nombres est important.",
    explanation: exp(
      "Dans une soustraction, on ne peut pas changer l’ordre des chiffres colonne par colonne.",
      "On doit respecter le nombre du haut et utiliser une retenue si nécessaire.",
      "Pour 352 - 187, on ne fait pas 7 - 2 dans la colonne des unités.",
      "La méthode de l’élève est incorrecte."
    ),
    tags: ["cm2", "calcul", "soustraction_posee", "erreur", "retenue", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_soustraction_posee_open_1_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment poser correctement une soustraction.",
    format: "open",
    expected: ["aligner", "unités", "retenue", "soustraire"],
    comparator: "contains_keyword",
    hint: "Parle de l’alignement et des retenues.",
    explanation: exp(
      "Une soustraction posée permet de calculer une différence.",
      "On aligne les chiffres par rang, puis on soustrait colonne par colonne.",
      "Si le chiffre du haut est trop petit, on utilise une retenue.",
      "Pour poser une soustraction, il faut aligner les rangs et gérer les retenues."
    ),
    tags: ["cm2", "calcul", "soustraction_posee", "open", "methode"],
  },

  /* ============================================================
     CALCUL_DECIMAL_ADDITION
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_calcul_decimal_addition_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 3,4 + 2,5.",
    format: "qcm",
    choices: ["5,9", "5,8", "6,9", "3,65"],
    expected: ["5,9"],
    comparator: "mcq_exact",
    hint: "Additionne les dixièmes avec les dixièmes.",
    explanation: exp(
      "Pour additionner des nombres décimaux, on aligne les virgules.",
      "On additionne les unités avec les unités et les dixièmes avec les dixièmes.",
      "3,4 + 2,5 = 5,9.",
      "Le résultat est 5,9."
    ),
    tags: ["cm2", "calcul", "decimal", "addition", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_calcul_decimal_addition_tpl_1_dixiemes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "Aligne les virgules.",
    tags: ["cm2", "calcul", "decimal", "addition", "template"],
    generate: () => {
      const a = randomChoice([1.2, 2.4, 3.5, 4.1, 5.6]);
      const b = randomChoice([0.3, 1.5, 2.2, 3.4]);
      const result = Math.round((a + b) * 10) / 10;

      return {
        text: `Calcule : ${formatNumber(a)} + ${formatNumber(b)}.`,
        format: "short",
        expected: expectedNumber(result),
        comparator: "number_equal",
        explanation: exp(
          "Pour additionner des décimaux, on aligne les virgules.",
          "On additionne les chiffres de même rang.",
          `${formatNumber(a)} + ${formatNumber(b)} = ${formatNumber(result)}.`,
          `Le résultat est ${formatNumber(result)}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_calcul_decimal_addition_tpl_2_centiemes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 3,
    theme: "neutral",
    hint: "Pense à aligner les virgules et à ajouter les zéros utiles.",
    tags: ["cm2", "calcul", "decimal", "addition", "centiemes", "template"],
    generate: () => {
      const a = randomChoice([2.35, 4.75, 6.08, 7.4, 9.25]);
      const b = randomChoice([1.2, 0.45, 2.06, 3.5]);
      const result = Math.round((a + b) * 100) / 100;

      return {
        text: `Calcule : ${formatNumber(a)} + ${formatNumber(b)}.`,
        format: "short",
        expected: expectedNumber(result),
        comparator: "number_equal",
        explanation: exp(
          "Pour additionner des décimaux, les virgules doivent être alignées.",
          "On peut ajouter des zéros à droite si cela aide à aligner les rangs.",
          `${formatNumber(a)} + ${formatNumber(b)} = ${formatNumber(result)}.`,
          `Le résultat est ${formatNumber(result)}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_calcul_decimal_addition_fixed_2_erreur_virgule",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule 4,5 + 2,35 en alignant les nombres à droite sans aligner les virgules. Est-ce correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour les décimaux, il faut aligner les virgules.",
    explanation: exp(
      "Dans une addition décimale, les chiffres doivent être alignés par rang.",
      "On aligne les virgules pour mettre unités sous unités, dixièmes sous dixièmes.",
      "4,5 peut s’écrire 4,50. Donc 4,50 + 2,35 = 6,85.",
      "Il faut aligner les virgules."
    ),
    tags: ["cm2", "calcul", "decimal", "addition", "erreur", "virgule", "qcm"],
  },

  /* ============================================================
     CALCUL_DECIMAL_SOUSTRACTION
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_calcul_decimal_soustraction_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 7,8 - 2,3.",
    format: "qcm",
    choices: ["5,5", "5,3", "4,5", "10,1"],
    expected: ["5,5"],
    comparator: "mcq_exact",
    hint: "Soustrais les dixièmes avec les dixièmes.",
    explanation: exp(
      "Pour soustraire des décimaux, on aligne les virgules.",
      "On soustrait les chiffres de même rang.",
      "7,8 - 2,3 = 5,5.",
      "Le résultat est 5,5."
    ),
    tags: ["cm2", "calcul", "decimal", "soustraction", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_calcul_decimal_soustraction_tpl_1_dixiemes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Aligne les virgules.",
    tags: ["cm2", "calcul", "decimal", "soustraction", "template"],
    generate: () => {
      const pairs: [number, number][] = [
        [8.7, 2.4],
        [9.5, 3.2],
        [6.8, 1.5],
        [7.9, 4.6],
        [5.6, 2.1],
      ];

      const [a, b] = randomChoice(pairs);
      const result = Math.round((a - b) * 10) / 10;

      return {
        text: `Calcule : ${formatNumber(a)} - ${formatNumber(b)}.`,
        format: "short",
        expected: expectedNumber(result),
        comparator: "number_equal",
        explanation: exp(
          "Pour soustraire des décimaux, on aligne les virgules.",
          "On soustrait les chiffres de même rang.",
          `${formatNumber(a)} - ${formatNumber(b)} = ${formatNumber(result)}.`,
          `Le résultat est ${formatNumber(result)}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_calcul_decimal_soustraction_tpl_2_avec_zero",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Tu peux écrire 6 comme 6,00.",
    tags: ["cm2", "calcul", "decimal", "soustraction", "zero", "template"],
    generate: () => {
      const a = randomChoice([5, 6, 8, 10]);
      const b = randomChoice([1.25, 2.4, 3.75, 4.5]);
      const result = Math.round((a - b) * 100) / 100;

      return {
        text: `Calcule : ${formatNumber(a)} - ${formatNumber(b)}.`,
        format: "short",
        expected: expectedNumber(result),
        comparator: "number_equal",
        explanation: exp(
          "Un nombre entier peut s’écrire avec des zéros après la virgule.",
          "On aligne les virgules puis on soustrait.",
          `${formatNumber(a)} = ${formatNumber(a)},00. Donc ${formatNumber(a)} - ${formatNumber(b)} = ${formatNumber(result)}.`,
          `Le résultat est ${formatNumber(result)}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_calcul_decimal_soustraction_fixed_2_erreur_virgule",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer 8 - 2,35, peut-on écrire 8 comme 8,00 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Ajouter des zéros après la virgule ne change pas la valeur.",
    explanation: exp(
      "Un nombre décimal peut avoir plusieurs écritures égales.",
      "On peut ajouter des zéros après la virgule pour aligner les rangs.",
      "8 = 8,0 = 8,00.",
      "Oui, on peut écrire 8 comme 8,00."
    ),
    tags: ["cm2", "calcul", "decimal", "soustraction", "zero", "qcm"],
  },

  /* ============================================================
     CALCUL_PRIORITE
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_calcul_priorite_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 4 + 3 × 5.",
    format: "qcm",
    choices: ["19", "35", "20", "17"],
    expected: ["19"],
    comparator: "mcq_exact",
    hint: "La multiplication se fait avant l’addition.",
    explanation: exp(
      "Les priorités opératoires indiquent l’ordre des calculs.",
      "On effectue la multiplication avant l’addition.",
      "3 × 5 = 15, puis 4 + 15 = 19.",
      "Le résultat est 19."
    ),
    tags: ["cm2", "calcul", "priorite", "multiplication", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_calcul_priorite_tpl_1_multiplication_avant_addition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 2,
    theme: "neutral",
    hint: "Commence par la multiplication.",
    tags: ["cm2", "calcul", "priorite", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const c = randomInt(2, 9);
      const result = a + b * c;

      return {
        text: `Calcule : ${a} + ${b} × ${c}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une expression sans parenthèses, la multiplication est prioritaire sur l’addition.",
          "On calcule d’abord la multiplication, puis l’addition.",
          `${b} × ${c} = ${b * c}, puis ${a} + ${b * c} = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_calcul_priorite_tpl_2_parentheses",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 3,
    theme: "neutral",
    hint: "Les parenthèses se calculent en premier.",
    tags: ["cm2", "calcul", "priorite", "parentheses", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(2, 8);
      const c = randomInt(2, 6);
      const result = (a + b) * c;

      return {
        text: `Calcule : (${a} + ${b}) × ${c}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Les parenthèses indiquent un calcul à faire en premier.",
          "On calcule d’abord ce qui est entre parenthèses.",
          `${a} + ${b} = ${a + b}, puis ${a + b} × ${c} = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_calcul_priorite_fixed_2_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule 2 + 5 × 4 en faisant d’abord 2 + 5. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La multiplication est prioritaire.",
    explanation: exp(
      "Les priorités opératoires donnent l’ordre des calculs.",
      "Sans parenthèses, on fait d’abord la multiplication.",
      "5 × 4 = 20, puis 2 + 20 = 22.",
      "L’élève a tort."
    ),
    tags: ["cm2", "calcul", "priorite", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_priorite_open_1_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 4,
    theme: "neutral",
    text: "Explique une règle de priorité opératoire que tu connais.",
    format: "open",
    expected: ["multiplication", "avant", "addition", "parenthèses"],
    comparator: "contains_keyword",
    hint: "Tu peux parler des parenthèses ou de la multiplication.",
    explanation: exp(
      "Les priorités opératoires permettent de calculer une expression dans le bon ordre.",
      "On calcule d’abord les parenthèses. Sans parenthèses, les multiplications sont prioritaires sur les additions.",
      "Dans 4 + 3 × 5, on fait 3 × 5 avant 4 + 15.",
      "Les priorités évitent les erreurs de calcul."
    ),
    tags: ["cm2", "calcul", "priorite", "open", "methode"],
  },

  /* ============================================================
     CALCUL_DEFI
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_calcul_defi_fixed_1_probleme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Lina achète 3 cahiers à 4 € chacun et un stylo à 2 €. Combien paie-t-elle au total ?",
    format: "qcm",
    choices: ["14", "12", "10", "18"],
    expected: ["14"],
    comparator: "mcq_exact",
    hint: "Calcule d’abord le prix des 3 cahiers.",
    explanation: exp(
      "Un défi de calcul peut demander plusieurs étapes.",
      "On calcule d’abord le prix des cahiers, puis on ajoute le stylo.",
      "3 × 4 = 12, puis 12 + 2 = 14.",
      "Lina paie 14 €."
    ),
    tags: ["cm2", "calcul", "defi", "probleme", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_calcul_defi_tpl_1_achat",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplie d’abord, puis ajoute.",
    tags: ["cm2", "calcul", "defi", "achat", "template"],
    generate: () => {
      const quantite = randomChoice([2, 3, 4, 5]);
      const prix = randomChoice([3, 4, 5, 6]);
      const autre = randomChoice([2, 3, 4]);
      const total = quantite * prix + autre;

      return {
        text: `Un élève achète ${quantite} articles à ${prix} € chacun et un petit carnet à ${autre} €. Combien paie-t-il au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème de calcul peut combiner multiplication et addition.",
          "On calcule le prix des articles identiques, puis on ajoute le carnet.",
          `${quantite} × ${prix} = ${quantite * prix}, puis ${quantite * prix} + ${autre} = ${total}.`,
          `Il paie ${total} €.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_calcul_defi_tpl_2_reunion_marche",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule le prix total puis la monnaie rendue.",
    tags: ["cm2", "calcul", "defi", "reunion", "marche", "template"],
    generate: () => {
      const prix = randomChoice([3, 4, 5]);
      const quantite = randomChoice([4, 5, 6]);
      const billet = randomChoice([20, 30, 50]);
      const total = prix * quantite;
      const monnaie = billet - total;

      return {
        text: `Au marché de Saint-Pierre, des fruits coûtent ${prix} € le sachet. Malo achète ${quantite} sachets et donne ${billet} €. Combien reçoit-il de monnaie ?`,
        format: "short",
        expected: [String(monnaie)],
        comparator: "number_equal",
        explanation: exp(
          "Pour calculer une monnaie rendue, on calcule d’abord le prix total.",
          "On multiplie le prix d’un sachet par le nombre de sachets, puis on soustrait au billet donné.",
          `${prix} × ${quantite} = ${total}, puis ${billet} - ${total} = ${monnaie}.`,
          `Malo reçoit ${monnaie} € de monnaie.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_calcul_defi_fixed_2_priorite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Calcule : 100 - (4 × 8 + 12).",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "Calcule d’abord la parenthèse.",
    explanation: exp(
      "Un défi de calcul peut utiliser les priorités opératoires.",
      "On calcule d’abord dans la parenthèse, puis on soustrait.",
      "4 × 8 = 32, puis 32 + 12 = 44. Enfin 100 - 44 = 56.",
      "Le résultat est 56."
    ),
    tags: ["cm2", "calcul", "defi", "priorite", "parentheses"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_defi_open_1_expliquer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment vérifier le résultat d’une addition ou d’une soustraction.",
    format: "open",
    expected: ["vérifier", "addition", "soustraction", "inverse"],
    comparator: "contains_keyword",
    hint: "On peut utiliser l’opération inverse.",
    explanation: exp(
      "Vérifier un calcul permet de repérer une erreur.",
      "On peut utiliser l’opération inverse : addition pour vérifier une soustraction, soustraction pour vérifier une addition.",
      "Si 586 - 243 = 343, alors 343 + 243 doit redonner 586.",
      "L’opération inverse permet de vérifier le résultat."
    ),
    tags: ["cm2", "calcul", "defi", "open", "verification"],
  },
];