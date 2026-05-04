// lib/tutor-v4/question-banks/maths/3e/racine_carree.bank.ts

/**
 * =========================================================
 * RACINE_CARREE.BANK.TS
 * =========================================================
 *
 * Banque de questions Tutor V4 - Mathématiques 3e
 * Notion : Racine carrée
 *
 * Micro-compétences :
 * - racine_comprendre
 * - racine_carres_parfaits
 * - racine_calculer
 * - racine_encadrer
 * - racine_defis
 *
 * Choix pédagogiques :
 * - progression logique (sens → reconnaissance → calcul → encadrement)
 * - beaucoup de templates
 * - pièges classiques (racine ≠ division par 2)
 * - lien avec Pythagore
 */

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

/* =========================
   BANK
========================= */

export const racineCarreeBank: TutorBankItemV4[] = [

/* =========================
   RACINE_COMPRENDRE
========================= */

{
  kind: "fixed",
  id: "3e_racine_comprendre_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_comprendre",
  difficulty: 1,
  theme: "neutral",
  text: "Que représente √9 ?",
  format: "qcm",
  choices: ["3", "9", "81", "6"],
  expected: ["3"],
  comparator: "mcq_exact",
  hint: "On cherche le nombre dont le carré vaut 9.",
  explanation: "√9 = 3 car 3² = 9.",
  tags: ["racine", "definition"],
},

{
  kind: "fixed",
  id: "3e_racine_comprendre_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_comprendre",
  difficulty: 1,
  theme: "neutral",
  text: "√16 correspond à…",
  format: "qcm",
  choices: ["4", "-4", "4 ou -4", "8"],
  expected: ["4"],
  comparator: "mcq_exact",
  hint: "La racine carrée est toujours positive.",
  explanation: "√16 = 4. La racine carrée est positive.",
  tags: ["racine", "positif", "qcm"],
},

{
  kind: "fixed",
  id: "3e_racine_comprendre_fixed_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_comprendre",
  difficulty: 2,
  theme: "neutral",
  text: "Un élève dit : √25 = 25 ÷ 2. A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "La racine carrée n’est pas une division.",
  explanation: "√25 = 5 car 5² = 25. Ce n’est pas une division.",
  tags: ["racine", "erreur"],
},

{
  kind: "template",
  id: "3e_racine_comprendre_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_comprendre",
  difficulty: 2,
  theme: "neutral",
  hint: "On cherche le nombre dont le carré donne le résultat.",
  tags: ["racine", "template"],
  generate: () => {
    const n = randomChoice([4, 9, 16, 25, 36, 49]);
    const r = Math.sqrt(n);

    return {
      text: `Donner √${n}.`,
      format: "short",
      expected: [String(r)],
      comparator: "number_equal",
      explanation: `√${n} = ${r} car ${r}² = ${n}.`,
    };
  },
},

/* =========================
   RACINE_CARRES_PARFAITS
========================= */

{
  kind: "fixed",
  id: "3e_racine_parfaits_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_carres_parfaits",
  difficulty: 1,
  theme: "neutral",
  text: "Quel est un carré parfait ?",
  format: "qcm",
  choices: ["15", "20", "36", "18"],
  expected: ["36"],
  comparator: "mcq_exact",
  hint: "Un carré parfait est le carré d’un entier.",
  explanation: "36 = 6², donc c’est un carré parfait.",
  tags: ["racine", "carre_parfait"],
},

{
  kind: "fixed",
  id: "3e_racine_parfaits_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_carres_parfaits",
  difficulty: 2,
  theme: "neutral",
  text: "Quel nombre a pour racine carrée 7 ?",
  format: "qcm",
  choices: ["14", "49", "21", "28"],
  expected: ["49"],
  comparator: "mcq_exact",
  hint: "On cherche 7².",
  explanation: "7² = 49.",
  tags: ["racine", "carre_parfait"],
},

{
  kind: "template",
  id: "3e_racine_parfaits_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_carres_parfaits",
  difficulty: 2,
  theme: "neutral",
  hint: "Calcule le carré.",
  tags: ["racine", "template"],
  generate: () => {
    const n = randomChoice([2, 3, 4, 5, 6, 7, 8]);
    const square = n * n;

    return {
      text: `Quel est le carré de ${n} ?`,
      format: "short",
      expected: [String(square)],
      comparator: "number_equal",
      explanation: `${n}² = ${square}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_racine_parfaits_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_carres_parfaits",
  difficulty: 3,
  theme: "neutral",
  hint: "Teste les carrés connus.",
  tags: ["racine", "template"],
  generate: () => {
    const n = randomChoice([12, 18, 20, 27, 30, 40]);
    const correct = Math.sqrt(n);
    const isPerfect = Number.isInteger(correct);

    return {
      text: `${n} est-il un carré parfait ?`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: [isPerfect ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation: isPerfect
        ? `${n} = ${correct}²`
        : `${n} n’est pas un carré parfait.`,
    };
  },
},
/* =========================
   RACINE_CALCULER
========================= */

{
  kind: "fixed",
  id: "3e_racine_calculer_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_calculer",
  difficulty: 2,
  theme: "neutral",
  text: "Calculer √64.",
  format: "short",
  expected: ["8"],
  comparator: "number_equal",
  hint: "Cherche le nombre dont le carré vaut 64.",
  explanation: "√64 = 8 car 8² = 64.",
  tags: ["racine", "calcul"],
},

{
  kind: "fixed",
  id: "3e_racine_calculer_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_calculer",
  difficulty: 2,
  theme: "neutral",
  text: "Calculer √81.",
  format: "qcm",
  choices: ["8", "9", "40,5", "18"],
  expected: ["9"],
  comparator: "mcq_exact",
  hint: "9² = ?",
  explanation: "√81 = 9 car 9² = 81.",
  tags: ["racine", "calcul", "qcm"],
},

{
  kind: "fixed",
  id: "3e_racine_calculer_erreur_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_calculer",
  difficulty: 3,
  theme: "neutral",
  text: "Un élève écrit : √100 = 50. A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "La racine carrée n’est pas la moitié.",
  explanation: "Non. √100 = 10 car 10² = 100.",
  tags: ["racine", "calcul", "erreur"],
},

{
  kind: "template",
  id: "3e_racine_calculer_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_calculer",
  difficulty: 2,
  theme: "neutral",
  hint: "Utilise les carrés parfaits.",
  tags: ["racine", "calcul", "template"],
  generate: () => {
    const r = randomChoice([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const n = r * r;

    return {
      text: `Calculer √${n}.`,
      format: "short",
      expected: [String(r)],
      comparator: "number_equal",
      explanation: `√${n} = ${r} car ${r}² = ${n}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_racine_calculer_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_calculer",
  difficulty: 3,
  theme: "neutral",
  hint: "Calcule chaque racine séparément.",
  tags: ["racine", "calcul", "somme", "template"],
  generate: () => {
    const a = randomChoice([4, 9, 16, 25, 36]);
    const b = randomChoice([4, 9, 16, 25, 36]);
    const result = Math.sqrt(a) + Math.sqrt(b);

    return {
      text: `Calculer : √${a} + √${b}`,
      format: "short",
      expected: [String(result)],
      comparator: "number_equal",
      explanation: `√${a} = ${Math.sqrt(a)} et √${b} = ${Math.sqrt(
        b
      )}. Donc √${a} + √${b} = ${result}.`,
    };
  },
},

{
  kind: "fixed",
  id: "3e_racine_calculer_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_calculer",
  difficulty: 4,
  theme: "neutral",
  text: "Explique pourquoi √49 = 7 et non -7.",
  format: "open",
  expected: ["racine", "positive", "7", "carré"],
  comparator: "contains_keyword",
  hint: "La racine carrée désigne le nombre positif.",
  explanation:
    "Même si 7² = 49 et (-7)² = 49, la notation √49 désigne la racine carrée positive. Donc √49 = 7.",
  tags: ["racine", "calcul", "open", "signe"],
},

/* =========================
   RACINE_ENCADRER
========================= */

{
  kind: "fixed",
  id: "3e_racine_encadrer_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_encadrer",
  difficulty: 3,
  theme: "neutral",
  text: "Entre quels entiers consécutifs se trouve √20 ?",
  format: "qcm",
  choices: ["entre 3 et 4", "entre 4 et 5", "entre 5 et 6", "entre 10 et 11"],
  expected: ["entre 4 et 5"],
  comparator: "mcq_exact",
  hint: "Compare 20 avec les carrés parfaits proches.",
  explanation:
    "4² = 16 et 5² = 25. Comme 16 < 20 < 25, on a 4 < √20 < 5.",
  tags: ["racine", "encadrer", "qcm"],
},

{
  kind: "fixed",
  id: "3e_racine_encadrer_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_encadrer",
  difficulty: 3,
  theme: "neutral",
  text: "Compléter : 7 < √60 < ...",
  format: "short",
  expected: ["8"],
  comparator: "number_equal",
  hint: "Compare 60 avec 7² et 8².",
  explanation:
    "7² = 49 et 8² = 64. Comme 49 < 60 < 64, on a 7 < √60 < 8.",
  tags: ["racine", "encadrer", "short"],
},

{
  kind: "template",
  id: "3e_racine_encadrer_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_encadrer",
  difficulty: 3,
  theme: "neutral",
  hint: "Cherche les deux carrés parfaits qui encadrent le nombre.",
  tags: ["racine", "encadrer", "template", "qcm"],
  generate: () => {
    const a = randomInt(3, 10);
    const n = randomInt(a * a + 1, (a + 1) * (a + 1) - 1);

    return {
      text: `Entre quels entiers consécutifs se trouve √${n} ?`,
      format: "qcm",
      choices: shuffle([
        `entre ${a} et ${a + 1}`,
        `entre ${a - 1} et ${a}`,
        `entre ${a + 1} et ${a + 2}`,
        `entre ${n} et ${n + 1}`,
      ]),
      expected: [`entre ${a} et ${a + 1}`],
      comparator: "mcq_exact",
      explanation: `${a}² = ${a * a} et ${a + 1}² = ${
        (a + 1) * (a + 1)
      }. Comme ${a * a} < ${n} < ${(a + 1) * (a + 1)}, alors ${a} < √${n} < ${
        a + 1
      }.`,
    };
  },
},

{
  kind: "template",
  id: "3e_racine_encadrer_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_encadrer",
  difficulty: 4,
  theme: "neutral",
  hint: "Utilise les carrés parfaits connus.",
  tags: ["racine", "encadrer", "template", "short"],
  generate: () => {
    const a = randomInt(4, 12);
    const n = randomInt(a * a + 1, (a + 1) * (a + 1) - 1);

    return {
      text: `Compléter avec l’entier qui convient : ${a} < √${n} < ...`,
      format: "short",
      expected: [String(a + 1)],
      comparator: "number_equal",
      explanation: `${a}² = ${a * a} et ${a + 1}² = ${
        (a + 1) * (a + 1)
      }. Donc ${a} < √${n} < ${a + 1}.`,
    };
  },
},

{
  kind: "fixed",
  id: "3e_racine_encadrer_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_encadrer",
  difficulty: 4,
  theme: "neutral",
  text: "Explique pourquoi 6 < √40 < 7.",
  format: "open",
  expected: ["6²", "36", "7²", "49", "40"],
  comparator: "contains_keyword",
  hint: "Compare 40 avec 36 et 49.",
  explanation:
    "6² = 36 et 7² = 49. Comme 36 < 40 < 49, alors 6 < √40 < 7.",
  tags: ["racine", "encadrer", "open", "raisonnement"],
},

/* =========================
   RACINE_DEFIS
========================= */

{
  kind: "fixed",
  id: "3e_racine_defis_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_defis",
  difficulty: 4,
  theme: "neutral",
  text: "Un élève affirme : √(9 + 16) = √9 + √16. A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "Calcule les deux côtés séparément.",
  explanation:
    "Non. √(9 + 16) = √25 = 5, alors que √9 + √16 = 3 + 4 = 7.",
  tags: ["racine", "defi", "erreur", "qcm"],
},

{
  kind: "fixed",
  id: "3e_racine_defis_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_defis",
  difficulty: 4,
  theme: "neutral",
  text: "Dans un triangle rectangle, les côtés de l’angle droit mesurent 6 cm et 8 cm. Quelle est la longueur de l’hypoténuse ?",
  format: "short",
  expected: ["10"],
  comparator: "number_equal",
  hint: "Utilise Pythagore : h² = 6² + 8².",
  explanation:
    "h² = 6² + 8² = 36 + 64 = 100. Donc h = √100 = 10 cm.",
  tags: ["racine", "defi", "pythagore"],
},

{
  kind: "template",
  id: "3e_racine_defis_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_defis",
  difficulty: 4,
  theme: "neutral",
  hint: "Attention : la racine d’une somme n’est pas la somme des racines.",
  tags: ["racine", "defi", "erreur", "template"],
  generate: () => {
    const a = randomChoice([4, 9, 16, 25]);
    const b = randomChoice([4, 9, 16, 25]);
    const left = Math.sqrt(a + b);
    const right = Math.sqrt(a) + Math.sqrt(b);
    const equal = left === right;

    return {
      text: `L’égalité √(${a} + ${b}) = √${a} + √${b} est-elle vraie ?`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: [equal ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation: `√(${a} + ${b}) = √${a + b}, tandis que √${a} + √${b} = ${Math.sqrt(
        a
      )} + ${Math.sqrt(b)} = ${right}. En général, ces deux résultats ne sont pas égaux.`,
    };
  },
},

{
  kind: "template",
  id: "3e_racine_defis_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_defis",
  difficulty: 5,
  theme: "neutral",
  hint: "Utilise Pythagore puis une racine carrée.",
  tags: ["racine", "defi", "pythagore", "template"],
  generate: () => {
    const triples = [
      { a: 3, b: 4, h: 5 },
      { a: 5, b: 12, h: 13 },
      { a: 6, b: 8, h: 10 },
      { a: 8, b: 15, h: 17 },
    ];
    const t = randomChoice(triples);

    return {
      text: `Dans un triangle rectangle, les côtés de l’angle droit mesurent ${t.a} cm et ${t.b} cm. Calculer l’hypoténuse.`,
      format: "short",
      expected: [String(t.h)],
      comparator: "number_equal",
      explanation: `h² = ${t.a}² + ${t.b}² = ${t.a * t.a} + ${t.b * t.b} = ${
        t.h * t.h
      }. Donc h = √${t.h * t.h} = ${t.h} cm.`,
    };
  },
},

{
  kind: "fixed",
  id: "3e_racine_defis_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "racine_carree",
  microId: "racine_defis",
  difficulty: 5,
  theme: "neutral",
  text: "Explique pourquoi la racine carrée est utile dans le théorème de Pythagore.",
  format: "open",
  expected: ["carré", "longueur", "hypoténuse", "racine", "pythagore"],
  comparator: "contains_keyword",
  hint: "Pythagore donne souvent le carré d’une longueur.",
  explanation:
    "Le théorème de Pythagore permet souvent de trouver le carré d’une longueur. Pour retrouver la longueur elle-même, on utilise la racine carrée.",
  tags: ["racine", "defi", "open", "pythagore", "raisonnement"],
},
];