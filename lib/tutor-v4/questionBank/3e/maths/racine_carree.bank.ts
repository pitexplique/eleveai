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

/* =========================
   BANK
========================= */

export const racineCarreeBank: TutorBankItemV4[] = [

/* =========================
   RACINE_COMPRENDRE
========================= */

{
  kind: "fixed",
  id: "3e_entier_racine_comprendre_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_comprendre",
  difficulty: 1,
  theme: "neutral",
  text: "Que représente √9 ?",
  format: "qcm",
  choices: ["3", "9", "81", "6"],
  expected: ["3"],
  comparator: "mcq_exact",
  hint: "On cherche le nombre dont le carré vaut 9.",
  explanation:
  "Définition : la racine carrée d’un nombre positif est le nombre positif dont le carré vaut ce nombre.\n\n" +
  "Méthode : pour trouver √9, on cherche le nombre positif dont le carré vaut 9.\n\n" +
  "Calcul : 3² = 9.\n\n" +
  "Conclusion : √9 = 3.",
  tags: ["entier_racine", "definition"],
},

{
  kind: "fixed",
  id: "3e_entier_racine_comprendre_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_comprendre",
  difficulty: 1,
  theme: "neutral",
  text: "√16 correspond à…",
  format: "qcm",
  choices: ["4", "-4", "4 ou -4", "8"],
  expected: ["4"],
  comparator: "mcq_exact",
  hint: "La racine carrée est toujours positive Oo nulle.",
  explanation:
  "Définition : la racine carrée désigne toujours le nombre positif.\n\n" +
  "Méthode : on cherche le nombre positif dont le carré vaut 16.\n\n" +
  "Calcul : 4² = 16 et (-4)² = 16, mais √16 désigne la valeur positive.\n\n" +
  "Conclusion : √16 = 4.",
  tags: ["entier_racine", "positif", "qcm"],
},

{
  kind: "fixed",
  id: "3e_entier_racine_comprendre_fixed_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_comprendre",
  difficulty: 2,
  theme: "neutral",
  text: "Un élève dit : √25 = 25 ÷ 2. A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "La racine carrée n’est pas une division.",
  explanation:
  "Définition : une racine carrée n’est pas une division par 2.\n\n" +
  "Méthode : pour calculer √25, on cherche le nombre positif dont le carré vaut 25.\n\n" +
  "Calcul : 5² = 25, alors que 25 ÷ 2 = 12,5.\n\n" +
  "Conclusion : √25 = 5. L’élève a tort.",
  tags: ["entier_racine", "erreur"],
},

{
  kind: "template",
  id: "3e_entier_racine_comprendre_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_comprendre",
  difficulty: 2,
  theme: "neutral",
  hint: "On cherche le nombre dont le carré donne le résultat.",
  tags: ["entier_racine", "template"],
  generate: () => {
    const n = randomChoice([4, 9, 16, 25, 36, 49]);
    const r = Math.sqrt(n);

    return {
      text: `Donner √${n}.`,
      format: "short",
      expected: [String(r)],
      comparator: "number_equal",
      explanation:
        `Définition : la racine carrée d’un nombre positif est le nombre positif dont le carré vaut ce nombre.\n\n` +
        `Méthode : pour trouver √${n}, on cherche le nombre positif dont le carré vaut ${n}.\n\n` +
        `Calcul : ${r}² = ${n}.\n\n` +
        `Conclusion : √${n} = ${r}.`,
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
  notionId: "entier_racine_carree",
  microId: "entier_racine_carre_parfait",
  difficulty: 1,
  theme: "neutral",
  text: "Quel est un carré parfait ?",
  format: "qcm",
  choices: ["15", "20", "36", "18"],
  expected: ["36"],
  comparator: "mcq_exact",
  hint: "Un carré parfait est le carré d’un entier.",
  explanation:
  "Définition : un carré parfait est un nombre qui peut s’écrire comme le carré d’un entier.\n\n" +
  "Méthode : on cherche parmi les réponses un nombre de la forme n².\n\n" +
  "Calcul : 36 = 6².\n\n" +
  "Conclusion : 36 est un carré parfait.",
  tags: ["entier_racine", "carre_parfait"],
},

{
  kind: "fixed",
  id: "3e_racine_parfaits_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_carre_parfait",
  difficulty: 2,
  theme: "neutral",
  text: "Quel nombre a pour racine carrée 7 ?",
  format: "qcm",
  choices: ["14", "49", "21", "28"],
  expected: ["49"],
  comparator: "mcq_exact",
  hint: "On cherche 7².",
  explanation:
  "Définition : si un nombre a pour racine carrée 7, alors ce nombre est 7².\n\n" +
  "Méthode : on calcule le carré de 7.\n\n" +
  "Calcul : 7² = 49.\n\n" +
  "Conclusion : le nombre qui a pour racine carrée 7 est 49.",
  tags: ["entier_racine", "carre_parfait"],
},

{
  kind: "template",
  id: "3e_racine_parfaits_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_carre_parfait",
  difficulty: 2,
  theme: "neutral",
  hint: "Calcule le carré.",
  tags: ["entier_racine", "template"],
  generate: () => {
    const n = randomChoice([2, 3, 4, 5, 6, 7, 8]);
    const square = n * n;

    return {
      text: `Quel est le carré de ${n} ?`,
      format: "short",
      expected: [String(square)],
      comparator: "number_equal",
      explanation:
        `Définition : le carré d’un nombre est le produit de ce nombre par lui-même.\n\n` +
        `Méthode : pour calculer le carré de ${n}, on calcule ${n} × ${n}.\n\n` +
        `Calcul : ${n}² = ${n} × ${n} = ${square}.\n\n` +
        `Conclusion : le carré de ${n} est ${square}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_racine_parfaits_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_carre_parfait",
  difficulty: 3,
  theme: "neutral",
  hint: "Teste les carrés connus.",
  tags: ["entier_racine", "template"],
  generate: () => {
    const n = randomChoice([12, 16, 18, 20, 25, 27, 30, 36, 40, 49, 60 ,64 ,81 ,90 ,100 ,110,121,144,169]);
    const correct = Math.sqrt(n);
    const isPerfect = Number.isInteger(correct);

    return {
      text: `${n} est-il un carré parfait ?`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: [isPerfect ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation: isPerfect
        ? `Définition : un carré parfait est le carré d’un entier.\n\n` +
          `Méthode : on vérifie si ${n} peut s’écrire sous la forme k² avec k entier.\n\n` +
          `Calcul : ${n} = ${correct}².\n\n` +
          `Conclusion : ${n} est un carré parfait.`
        : `Définition : un carré parfait est le carré d’un entier.\n\n` +
          `Méthode : on compare ${n} avec les carrés parfaits connus.\n\n` +
          `Calcul : ${n} ne correspond pas au carré d’un entier.\n\n` +
          `Conclusion : ${n} n’est pas un carré parfait.`,
          };
        },
},
/* =========================
   RACINE_CALCULER
========================= */

{
  kind: "fixed",
  id: "3e_entier_racine_calculer_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_calculer",
  difficulty: 2,
  theme: "neutral",
  text: "Calculer √64.",
  format: "short",
  expected: ["8"],
  comparator: "number_equal",
  hint: "Cherche le nombre dont le carré vaut 64.",
  explanation:
    "Définition : la racine carrée d’un nombre positif est le nombre positif dont le carré vaut ce nombre.\n\n" +
    "Méthode : pour calculer √64, on cherche le nombre positif dont le carré vaut 64.\n\n" +
    "Calcul : 8² = 64.\n\n" +
    "Conclusion : √64 = 8.",
  tags: ["entier_racine", "calcul"],
},

{
  kind: "fixed",
  id: "3e_entier_racine_calculer_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_calculer",
  difficulty: 2,
  theme: "neutral",
  text: "Calculer √81.",
  format: "qcm",
  choices: ["8", "9", "40,5", "18"],
  expected: ["9"],
  comparator: "mcq_exact",
  hint: "9² = ?",
  explanation:
    "Définition : calculer une racine carrée revient à chercher un carré connu.\n\n" +
    "Méthode : on cherche quel nombre a pour carré 81.\n\n" +
    "Calcul : 9² = 81.\n\n" +
    "Conclusion : √81 = 9.",
  tags: ["entier_racine", "calcul", "qcm"],
},

{
  kind: "fixed",
  id: "3e_entier_racine_calculer_erreur_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_calculer",
  difficulty: 3,
  theme: "neutral",
  text: "Un élève écrit : √100 = 50. A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "La racine carrée n’est pas la moitié.",
  explanation: "Non. √100 = 10 car 10² = 100.",
  tags: ["entier_racine", "calcul", "erreur"],
},

{
  kind: "template",
  id: "3e_entier_racine_calculer_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_calculer",
  difficulty: 2,
  theme: "neutral",
  hint: "Utilise les carrés parfaits.",
  tags: ["entier_racine", "calcul", "template"],
  generate: () => {
    const r = randomChoice([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const n = r * r;

    return {
      text: `Calculer √${n}.`,
      format: "short",
      expected: [String(r)],
      comparator: "number_equal",
      explanation:
        `Définition : la racine carrée d’un nombre positif est le nombre positif dont le carré vaut ce nombre.\n\n` +
        `Méthode : pour calculer √${n}, on cherche le nombre positif dont le carré vaut ${n}.\n\n` +
        `Calcul : ${r}² = ${n}.\n\n` +
        `Conclusion : √${n} = ${r}.`,
          };
  },
},

{
  kind: "template",
  id: "3e_entier_racine_calculer_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_calculer",
  difficulty: 3,
  theme: "neutral",
  hint: "Calcule chaque racine séparément.",
  tags: ["entier_racine", "calcul", "somme", "template"],
  generate: () => {
    const a = randomChoice([4, 9, 16, 25, 36]);
    const b = randomChoice([4, 9, 16, 25, 36]);
    const result = Math.sqrt(a) + Math.sqrt(b);

    return {
      text: `Calculer : √${a} + √${b}`,
      format: "short",
      expected: [String(result)],
      comparator: "number_equal",
      explanation:
        `Définition : pour additionner des racines carrées simples, on peut calculer chaque racine séparément.\n\n` +
        `Méthode : on calcule d’abord √${a}, puis √${b}, avant d’additionner les résultats.\n\n` +
        `Calcul : √${a} = ${Math.sqrt(a)} et √${b} = ${Math.sqrt(b)}. Donc ${Math.sqrt(a)} + ${Math.sqrt(b)} = ${result}.\n\n` +
        `Conclusion : √${a} + √${b} = ${result}.`,
          };
  },
},

{
  kind: "fixed",
  id: "3e_entier_racine_calculer_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_calculer",
  difficulty: 4,
  theme: "neutral",
  text: "Explique pourquoi √49 = 7 et non -7.",
  format: "open",
  expected: ["racine", "positive", "7", "carré"],
  comparator: "contains_keyword",
  hint: "La racine carrée désigne le nombre positif.",
  explanation:
    "Définition : la notation √a désigne toujours la racine carrée positive.\n\n" +
    "Méthode : on cherche le nombre positif dont le carré vaut 49.\n\n" +
    "Calcul : 7² = 49 et (-7)² = 49, mais √49 désigne uniquement la valeur positive.\n\n" +
    "Conclusion : √49 = 7 et non -7.",
  tags: ["entier_racine", "calcul", "open", "signe"],
},

/* =========================
   RACINE_ENCADRER
========================= */

{
  kind: "fixed",
  id: "3e_entier_racine_encadrer_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_encadrer",
  difficulty: 3,
  theme: "neutral",
  text: "Entre quels entiers consécutifs se trouve √20 ?",
  format: "qcm",
  choices: ["entre 3 et 4", "entre 4 et 5", "entre 5 et 6", "entre 10 et 11"],
  expected: ["entre 4 et 5"],
  comparator: "mcq_exact",
  explanation:
    "Définition : encadrer une racine carrée consiste à trouver entre quels entiers elle se situe.\n\n" +
    "Méthode : on compare 20 avec les carrés parfaits les plus proches.\n\n" +
    "Calcul : 4² = 16 et 5² = 25. Comme 16 < 20 < 25, alors 4 < √20 < 5.\n\n" +
    "Conclusion : √20 est compris entre 4 et 5.",
    tags: ["entier_racine", "encadrer", "qcm"],
},

{
  kind: "fixed",
  id: "3e_entier_racine_encadrer_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_encadrer",
  difficulty: 3,
  theme: "neutral",
  text: "Compléter : 7 < √60 < ...",
  format: "short",
  expected: ["8"],
  comparator: "number_equal",
  hint: "Compare 60 avec 7² et 8².",
explanation:
  "Définition : pour encadrer une racine carrée, on utilise les carrés parfaits connus.\n\n" +
  "Méthode : on compare 60 avec les carrés de 7 et de 8.\n\n" +
  "Calcul : 7² = 49 et 8² = 64. Comme 49 < 60 < 64, alors 7 < √60 < 8.\n\n" +
  "Conclusion : le nombre manquant est 8.",
  tags: ["entier_racine", "encadrer", "short"],
},

{
  kind: "template",
  id: "3e_entier_racine_encadrer_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_encadrer",
  difficulty: 3,
  theme: "neutral",
  hint: "Cherche les deux carrés parfaits qui encadrent le nombre.",
  tags: ["entier_racine", "encadrer", "template", "qcm"],
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
      explanation:
        `Définition : une racine carrée se situe entre les racines des deux carrés parfaits qui encadrent le nombre.\n\n` +
        `Méthode : on compare ${n} avec deux carrés parfaits consécutifs.\n\n` +
        `Calcul : ${a}² = ${a * a} et ${(a + 1)}² = ${(a + 1) * (a + 1)}. Comme ${a * a} < ${n} < ${(a + 1) * (a + 1)}, alors ${a} < √${n} < ${a + 1}.\n\n` +
        `Conclusion : √${n} est compris entre ${a} et ${a + 1}.`,
          };
  },
},

{
  kind: "template",
  id: "3e_entier_racine_encadrer_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_encadrer",
  difficulty: 4,
  theme: "neutral",
  hint: "Utilise les carrés parfaits connus.",
  tags: ["entier_racine", "encadrer", "template", "short"],
  generate: () => {
    const a = randomInt(4, 12);
    const n = randomInt(a * a + 1, (a + 1) * (a + 1) - 1);

    return {
      text: `Compléter avec l’entier qui convient : ${a} < √${n} < ...`,
      format: "short",
      expected: [String(a + 1)],
      comparator: "number_equal",
      explanation:
        `Définition : encadrer une racine carrée consiste à trouver deux entiers consécutifs entre lesquels elle se situe.\n\n` +
        `Méthode : on compare ${n} avec les carrés parfaits voisins.\n\n` +
        `Calcul : ${a}² = ${a * a} et ${(a + 1)}² = ${(a + 1) * (a + 1)}. Donc ${a * a} < ${n} < ${(a + 1) * (a + 1)}.\n\n` +
        `Conclusion : ${a} < √${n} < ${a + 1}.`,
          };
        },
},

{
  kind: "fixed",
  id: "3e_entier_racine_encadrer_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_encadrer",
  difficulty: 4,
  theme: "neutral",
  text: "Explique pourquoi 6 < √40 < 7.",
  format: "open",
  expected: ["6²", "36", "7²", "49", "40"],
  comparator: "contains_keyword",
  hint: "Compare 40 avec 36 et 49.",
  explanation:
    "6² = 36 et 7² = 49. Comme 36 < 40 < 49, alors 6 < √40 < 7.",
  tags: ["entier_racine", "encadrer", "open", "raisonnement"],
},

/* =========================
   RACINE_DEFIS
========================= */

{
  kind: "fixed",
  id: "3e_entier_racine_defi_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_defi",
  difficulty: 4,
  theme: "neutral",
  text: "Un élève affirme : √(9 + 16) = √9 + √16. A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "Calcule les deux côtés séparément.",
  explanation:
    "Définition : en général, la racine carrée d’une somme n’est pas la somme des racines carrées.\n\n" +
    "Méthode : on calcule séparément les deux membres de l’égalité.\n\n" +
    "Calcul : √(9 + 16) = √25 = 5, alors que √9 + √16 = 3 + 4 = 7.\n\n" +
    "Conclusion : l’élève a tort.",
    tags: ["entier_racine", "defi", "erreur", "qcm"],
},

{
  kind: "fixed",
  id: "3e_entier_racine_defi_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_defi",
  difficulty: 4,
  theme: "neutral",
  text: "Dans un triangle rectangle, les côtés de l’angle droit mesurent 6 cm et 8 cm. Quelle est la longueur de l’hypoténuse ?",
  format: "short",
  expected: ["10"],
  comparator: "number_equal",
  explanation:
    "Définition : dans un triangle rectangle, le théorème de Pythagore permet de calculer le carré de l’hypoténuse.\n\n" +
    "Méthode : on additionne les carrés des deux côtés de l’angle droit, puis on prend la racine carrée.\n\n" +
    "Calcul : h² = 6² + 8² = 36 + 64 = 100. Donc h = √100 = 10.\n\n" +
    "Conclusion : l’hypoténuse mesure 10 cm.",
    tags: ["entier_racine", "defi", "pythagore_theoreme"],
},

{
  kind: "template",
  id: "3e_entier_racine_defi_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_defi",
  difficulty: 4,
  theme: "neutral",
  hint: "Attention : la racine d’une somme n’est pas la somme des racines.",
  tags: ["entier_racine", "defi", "erreur", "template"],
  generate: () => {
    const a = randomChoice([4, 9, 16, 25]);
    const b = randomChoice([4, 9, 16, 25]);
    const right = Math.sqrt(a) + Math.sqrt(b);
    
    return {
      text: `L’égalité √(${a} + ${b}) = √${a} + √${b} est-elle vraie ?`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["non"],
      comparator: "mcq_exact",
      explanation:
      `Définition : en général, la racine carrée d’une somme n’est pas la somme des racines carrées.\n\n` +
      `Méthode : on compare les deux côtés de l’égalité.\n\n` +
      `Calcul : √(${a} + ${b}) = √${a + b}, tandis que √${a} + √${b} = ${Math.sqrt(a)} + ${Math.sqrt(b)} = ${right}.\n\n` +
      `Conclusion : l’égalité proposée est fausse.`,
    };
  },
},

{
  kind: "template",
  id: "3e_entier_racine_defi_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_defi",
  difficulty: 5,
  theme: "neutral",
  hint: "Utilise Pythagore puis une racine carrée.",
  tags: ["entier_racine", "defi", "pythagore_theoreme", "template"],
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
      explanation:
        `Définition : dans un triangle rectangle, le théorème de Pythagore permet de calculer le carré de l’hypoténuse.\n\n` +
        `Méthode : on additionne les carrés des deux côtés de l’angle droit, puis on prend la racine carrée.\n\n` +
        `Calcul : h² = ${t.a}² + ${t.b}² = ${t.a * t.a} + ${t.b * t.b} = ${t.h * t.h}. Donc h = √${t.h * t.h} = ${t.h}.\n\n` +
        `Conclusion : l’hypoténuse mesure ${t.h} cm.`,
    };
  },
},

{
  kind: "fixed",
  id: "3e_entier_racine_defi_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_defi",
  difficulty: 5,
  theme: "neutral",
  text: "Explique pourquoi la racine carrée est utile dans le théorème de Pythagore.",
  format: "open",
  expected: ["carré", "longueur", "hypoténuse", "racine", "pythagore"],
  comparator: "contains_keyword",
  hint: "Pythagore donne souvent le carré d’une longueur.",
explanation:
  "Définition : le théorème de Pythagore donne souvent le carré d’une longueur.\n\n" +
  "Méthode : pour retrouver la longueur elle-même, on utilise la racine carrée.\n\n" +
  "Calcul : si h² = 100, alors h = √100 = 10.\n\n" +
  "Conclusion : la racine carrée est utile pour passer du carré d’une longueur à la longueur.",
  tags: ["entier_racine", "defi", "open", "pythagore_theoreme", "raisonnement"],
},

/* =========================
   RACINE_COMPRENDRE (compléments)
========================= */
{
  kind: "fixed",
  id: "3e_entier_racine_comprendre_fixed_4",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_comprendre",
  difficulty: 1,
  theme: "neutral",
  text: "La racine carrée d’un nombre positif $n$ est…",
  format: "qcm",
  choices: [
    "le nombre positif dont le carré vaut $n$",
    "la moitié de $n$",
    "le double de $n$",
    "le nombre $n$ multiplié par $2$",
  ],
  expected: ["le nombre positif dont le carré vaut $n$"],
  comparator: "mcq_exact",
  hint: "On cherche le nombre dont le carré redonne $n$.",
  explanation:
    "Définition : $\\sqrt{n}$ est le nombre positif dont le carré vaut $n$.\n\n" +
    "Méthode : on cherche $x \\geq 0$ tel que $x^2 = n$.\n\n" +
    "Calcul : par exemple $\\sqrt{25} = 5$ car $5^2 = 25$.\n\n" +
    "Conclusion : c’est le nombre positif dont le carré vaut $n$.",
  tags: ["entier_racine", "comprendre", "qcm"],
},
{
  kind: "fixed",
  id: "3e_entier_racine_comprendre_fixed_4_piege",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_comprendre",
  difficulty: 2,
  theme: "neutral",
  text: "Un élève dit : « $\\sqrt{16} = 8$ car $16 \\div 2 = 8$ ». A-t-il raison ?",
  format: "qcm",
  choices: ["non", "oui"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "La racine carrée n’est pas une division par $2$.",
  explanation:
    "Définition : $\\sqrt{16}$ est le nombre dont le carré vaut $16$.\n\n" +
    "Méthode : on cherche $x$ tel que $x^2 = 16$, ce n’est pas $16 \\div 2$.\n\n" +
    "Calcul : $4^2 = 16$, donc $\\sqrt{16} = 4$.\n\n" +
    "Conclusion : non, $\\sqrt{16} = 4$.",
  tags: ["entier_racine", "comprendre", "piege", "qcm"],
},
{
  kind: "fixed",
  id: "3e_entier_racine_comprendre_fixed_5_carre_inverse",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_comprendre",
  difficulty: 2,
  theme: "neutral",
  text: "Que vaut $(\\sqrt{7})^2$ ?",
  format: "qcm",
  choices: ["$7$", "$\\sqrt{7}$", "$49$", "$14$"],
  expected: ["$7$"],
  comparator: "mcq_exact",
  hint: "Élever au carré annule la racine carrée.",
  explanation:
    "Définition : pour $n \\geq 0$, $(\\sqrt{n})^2 = n$.\n\n" +
    "Méthode : la racine carrée et le carré sont des opérations inverses.\n\n" +
    "Calcul : $(\\sqrt{7})^2 = 7$.\n\n" +
    "Conclusion : $(\\sqrt{7})^2 = 7$.",
  tags: ["entier_racine", "comprendre", "qcm"],
},
{
  kind: "fixed",
  id: "3e_entier_racine_comprendre_fixed_6_zero_un",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_comprendre",
  difficulty: 1,
  theme: "neutral",
  text: "Que vaut $\\sqrt{1}$ ?",
  format: "qcm",
  choices: ["$1$", "$0$", "$2$", "$\\sqrt{2}$"],
  expected: ["$1$"],
  comparator: "mcq_exact",
  hint: "$1^2 = 1$.",
  explanation:
    "Définition : $\\sqrt{1}$ est le nombre positif dont le carré vaut $1$.\n\n" +
    "Méthode : on cherche $x$ tel que $x^2 = 1$.\n\n" +
    "Calcul : $1^2 = 1$.\n\n" +
    "Conclusion : $\\sqrt{1} = 1$.",
  tags: ["entier_racine", "comprendre", "qcm"],
},
{
  kind: "template",
  id: "3e_entier_racine_comprendre_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_comprendre",
  difficulty: 2,
  theme: "neutral",
  hint: "On cherche le nombre dont le carré vaut le nombre sous la racine.",
  tags: ["entier_racine", "comprendre", "template"],
  generate: () => {
    const x = randomChoice([2, 3, 4, 5, 6, 7]);
    const n = x * x;
    return {
      text: `On cherche $\\sqrt{${n}}$. Quel nombre positif a pour carré $${n}$ ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : $\\sqrt{${n}}$ est le nombre positif dont le carré vaut $${n}$.\n\n` +
        `Méthode : on cherche $x$ tel que $x^2 = ${n}$.\n\n` +
        `Calcul : $${x}^2 = ${n}$.\n\n` +
        `Conclusion : $\\sqrt{${n}} = ${x}$.`,
    };
  },
},

/* =========================
   RACINE_CARRE_PARFAIT (compléments)
========================= */
{
  kind: "fixed",
  id: "3e_entier_racine_carre_parfait_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_carre_parfait",
  difficulty: 2,
  theme: "neutral",
  text: "Lequel de ces nombres est un carré parfait ?",
  format: "qcm",
  choices: ["$49$", "$50$", "$48$", "$45$"],
  expected: ["$49$"],
  comparator: "mcq_exact",
  hint: "Un carré parfait est le carré d’un entier.",
  explanation:
    "Définition : un carré parfait est le carré d’un nombre entier.\n\n" +
    "Méthode : on cherche celui qui est un carré.\n\n" +
    "Calcul : $49 = 7^2$.\n\n" +
    "Conclusion : $49$ est un carré parfait.",
  tags: ["entier_racine", "carre_parfait", "qcm"],
},
{
  kind: "fixed",
  id: "3e_entier_racine_carre_parfait_fixed_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_carre_parfait",
  difficulty: 2,
  theme: "neutral",
  text: "$64$ est-il un carré parfait ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["oui"],
  comparator: "mcq_exact",
  hint: "Cherche un entier dont le carré vaut $64$.",
  explanation:
    "Définition : un carré parfait est le carré d’un entier.\n\n" +
    "Méthode : on cherche un entier dont le carré vaut $64$.\n\n" +
    "Calcul : $8^2 = 64$.\n\n" +
    "Conclusion : oui, $64$ est un carré parfait.",
  tags: ["entier_racine", "carre_parfait", "qcm"],
},
{
  kind: "template",
  id: "3e_entier_racine_carre_parfait_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_carre_parfait",
  difficulty: 2,
  theme: "neutral",
  hint: "Un carré parfait est le carré d’un entier.",
  tags: ["entier_racine", "carre_parfait", "template"],
  generate: () => {
    const x = randomChoice([4, 5, 6, 7, 8, 9, 10]);
    const carre = x * x;
    const nonCarre = carre + randomChoice([1, 2, 3]);
    return {
      text: `Parmi $${carre}$ et $${nonCarre}$, lequel est un carré parfait ?`,
      format: "qcm",
      choices: shuffle([`$${carre}$`, `$${nonCarre}$`]),
      expected: [`$${carre}$`],
      comparator: "mcq_exact",
      explanation:
        `Définition : un carré parfait est le carré d’un entier.\n\n` +
        `Méthode : on cherche lequel est un carré.\n\n` +
        `Calcul : $${carre} = ${x}^2$, alors que $${nonCarre}$ n’est pas un carré d’entier.\n\n` +
        `Conclusion : $${carre}$ est le carré parfait.`,
    };
  },
},
{
  kind: "template",
  id: "3e_entier_racine_carre_parfait_tpl_2_racine",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_carre_parfait",
  difficulty: 3,
  theme: "neutral",
  hint: "La racine d’un carré parfait est un entier.",
  tags: ["entier_racine", "carre_parfait", "template"],
  generate: () => {
    const x = randomChoice([6, 7, 8, 9, 11, 12]);
    const n = x * x;
    return {
      text: `$${n}$ est un carré parfait. Quelle est sa racine carrée ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : la racine carrée d’un carré parfait est un entier.\n\n` +
        `Méthode : on cherche $x$ tel que $x^2 = ${n}$.\n\n` +
        `Calcul : $${x}^2 = ${n}$.\n\n` +
        `Conclusion : $\\sqrt{${n}} = ${x}$.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_entier_racine_carre_parfait_fixed_4_liste",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_carre_parfait",
  difficulty: 3,
  theme: "neutral",
  text: "Quelle est la liste des premiers carrés parfaits (à partir de $1$) ?",
  format: "qcm",
  choices: [
    "$1, 4, 9, 16, 25$",
    "$1, 2, 3, 4, 5$",
    "$2, 4, 6, 8, 10$",
    "$1, 3, 5, 7, 9$",
  ],
  expected: ["$1, 4, 9, 16, 25$"],
  comparator: "mcq_exact",
  hint: "Ce sont $1^2, 2^2, 3^2, 4^2, 5^2$.",
  explanation:
    "Définition : les carrés parfaits sont les carrés des entiers.\n\n" +
    "Méthode : on calcule $1^2, 2^2, 3^2, 4^2, 5^2$.\n\n" +
    "Calcul : $1, 4, 9, 16, 25$.\n\n" +
    "Conclusion : la liste est $1, 4, 9, 16, 25$.",
  tags: ["entier_racine", "carre_parfait", "liste", "qcm"],
},
{
  kind: "fixed",
  id: "3e_entier_racine_carre_parfait_fixed_5_non",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_carre_parfait",
  difficulty: 3,
  theme: "neutral",
  text: "Lequel de ces nombres n’est PAS un carré parfait ?",
  format: "qcm",
  choices: ["$20$", "$16$", "$25$", "$36$"],
  expected: ["$20$"],
  comparator: "mcq_exact",
  hint: "$16 = 4^2$, $25 = 5^2$, $36 = 6^2$.",
  explanation:
    "Définition : un carré parfait est le carré d’un entier.\n\n" +
    "Méthode : on teste chaque nombre.\n\n" +
    "Calcul : $16 = 4^2$, $25 = 5^2$, $36 = 6^2$, mais $20$ n’est pas un carré d’entier.\n\n" +
    "Conclusion : $20$ n’est pas un carré parfait.",
  tags: ["entier_racine", "carre_parfait", "qcm"],
},

/* =========================
   RACINE_CALCULER (compléments)
========================= */
{
  kind: "template",
  id: "3e_entier_racine_calculer_tpl_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_calculer",
  difficulty: 2,
  theme: "neutral",
  hint: "Cherche l’entier dont le carré est sous la racine.",
  tags: ["entier_racine", "calculer", "template"],
  generate: () => {
    const x = randomChoice([2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const n = x * x;
    return {
      text: `Calcule $\\sqrt{${n}}$.`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : $\\sqrt{${n}}$ est le nombre positif dont le carré vaut $${n}$.\n\n` +
        `Méthode : on cherche $x$ tel que $x^2 = ${n}$.\n\n` +
        `Calcul : $${x}^2 = ${n}$, donc $\\sqrt{${n}} = ${x}$.\n\n` +
        `Conclusion : $\\sqrt{${n}} = ${x}$.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_entier_racine_calculer_fixed_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_calculer",
  difficulty: 2,
  theme: "neutral",
  text: "Calcule $\\sqrt{144}$.",
  format: "short",
  expected: ["12"],
  comparator: "number_equal",
  hint: "$12^2 = 144$.",
  explanation:
    "Définition : $\\sqrt{144}$ est le nombre positif dont le carré vaut $144$.\n\n" +
    "Méthode : on cherche $x$ tel que $x^2 = 144$.\n\n" +
    "Calcul : $12^2 = 144$.\n\n" +
    "Conclusion : $\\sqrt{144} = 12$.",
  tags: ["entier_racine", "calculer", "short"],
},
{
  kind: "fixed",
  id: "3e_entier_racine_calculer_qcm_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_calculer",
  difficulty: 2,
  theme: "neutral",
  text: "Combien vaut $\\sqrt{81}$ ?",
  format: "qcm",
  choices: ["$9$", "$8$", "$18$", "$40{,}5$"],
  expected: ["$9$"],
  comparator: "mcq_exact",
  hint: "$9^2 = 81$.",
  explanation:
    "Définition : $\\sqrt{81}$ est le nombre positif dont le carré vaut $81$.\n\n" +
    "Méthode : on cherche $x$ tel que $x^2 = 81$.\n\n" +
    "Calcul : $9^2 = 81$.\n\n" +
    "Conclusion : $\\sqrt{81} = 9$.",
  tags: ["entier_racine", "calculer", "qcm"],
},
{
  kind: "template",
  id: "3e_entier_racine_calculer_tpl_3_grand",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_calculer",
  difficulty: 3,
  theme: "neutral",
  hint: "Pense aux carrés de $11$ à $15$.",
  tags: ["entier_racine", "calculer", "template"],
  generate: () => {
    const x = randomChoice([11, 12, 13, 14, 15]);
    const n = x * x;
    return {
      text: `Calcule $\\sqrt{${n}}$.`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : $\\sqrt{${n}}$ est le nombre positif dont le carré vaut $${n}$.\n\n` +
        `Méthode : on reconnaît un carré parfait.\n\n` +
        `Calcul : $${x}^2 = ${n}$.\n\n` +
        `Conclusion : $\\sqrt{${n}} = ${x}$.`,
    };
  },
},

/* =========================
   RACINE_ENCADRER (compléments)
========================= */
{
  kind: "template",
  id: "3e_entier_racine_encadrer_tpl_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_encadrer",
  difficulty: 3,
  theme: "neutral",
  hint: "Trouve les deux carrés parfaits qui encadrent le nombre.",
  tags: ["entier_racine", "encadrer", "qcm", "template"],
  generate: () => {
    const k = randomChoice([2, 3, 4, 5, 6, 7, 8]);
    const n = k * k + randomChoice([1, 2, 3]);
    const correct = `entre $${k}$ et $${k + 1}$`;
    return {
      text: `Entre quels deux entiers consécutifs se trouve $\\sqrt{${n}}$ ?`,
      format: "qcm",
      choices: shuffle([correct, `entre $${k + 1}$ et $${k + 2}$`, `entre $${k - 1}$ et $${k}$`, `entre $${n}$ et $${n + 1}$`]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation:
        `Définition : on encadre $${n}$ par deux carrés parfaits consécutifs.\n\n` +
        `Méthode : $${k}^2 = ${k * k}$ et $${k + 1}^2 = ${(k + 1) * (k + 1)}$, et $${k * k} < ${n} < ${(k + 1) * (k + 1)}$.\n\n` +
        `Calcul : donc $${k} < \\sqrt{${n}} < ${k + 1}$.\n\n` +
        `Conclusion : $\\sqrt{${n}}$ est entre $${k}$ et $${k + 1}$.`,
    };
  },
},
{
  kind: "template",
  id: "3e_entier_racine_encadrer_tpl_3_partie_entiere",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_encadrer",
  difficulty: 3,
  theme: "neutral",
  hint: "C’est le plus grand entier dont le carré ne dépasse pas le nombre.",
  tags: ["entier_racine", "encadrer", "template"],
  generate: () => {
    const k = randomChoice([3, 4, 5, 6, 7, 8]);
    const n = k * k + randomChoice([1, 2, 3, 4]);
    return {
      text: `Quel est le plus grand entier dont le carré est inférieur ou égal à $${n}$ ?`,
      format: "short",
      expected: [String(k)],
      comparator: "number_equal",
      explanation:
        `Définition : c’est l’entier juste en dessous de $\\sqrt{${n}}$.\n\n` +
        `Méthode : on cherche le plus grand $k$ tel que $k^2 \\leq ${n}$.\n\n` +
        `Calcul : $${k}^2 = ${k * k} \\leq ${n}$ mais $${k + 1}^2 = ${(k + 1) * (k + 1)} > ${n}$.\n\n` +
        `Conclusion : l’entier cherché est $${k}$.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_entier_racine_encadrer_fixed_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_encadrer",
  difficulty: 3,
  theme: "neutral",
  text: "Entre quels deux entiers consécutifs se trouve $\\sqrt{50}$ ?",
  format: "qcm",
  choices: ["entre $7$ et $8$", "entre $6$ et $7$", "entre $8$ et $9$", "entre $24$ et $26$"],
  expected: ["entre $7$ et $8$"],
  comparator: "mcq_exact",
  hint: "$7^2 = 49$ et $8^2 = 64$.",
  explanation:
    "Définition : on encadre $50$ par deux carrés parfaits consécutifs.\n\n" +
    "Méthode : $7^2 = 49$ et $8^2 = 64$, et $49 < 50 < 64$.\n\n" +
    "Calcul : donc $7 < \\sqrt{50} < 8$.\n\n" +
    "Conclusion : $\\sqrt{50}$ est entre $7$ et $8$.",
  tags: ["entier_racine", "encadrer", "qcm"],
},
{
  kind: "fixed",
  id: "3e_entier_racine_encadrer_fixed_2_methode",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_encadrer",
  difficulty: 4,
  theme: "neutral",
  text: "Pour encadrer $\\sqrt{n}$ entre deux entiers, on cherche…",
  format: "qcm",
  choices: [
    "les deux carrés parfaits qui encadrent $n$",
    "la moitié et le double de $n$",
    "les diviseurs de $n$",
    "les multiples de $n$",
  ],
  expected: ["les deux carrés parfaits qui encadrent $n$"],
  comparator: "mcq_exact",
  hint: "On compare $n$ aux carrés parfaits voisins.",
  explanation:
    "Définition : encadrer $\\sqrt{n}$ revient à encadrer $n$ par deux carrés parfaits.\n\n" +
    "Méthode : on trouve $k$ tel que $k^2 \\leq n < (k+1)^2$.\n\n" +
    "Calcul : alors $k \\leq \\sqrt{n} < k+1$.\n\n" +
    "Conclusion : on cherche les deux carrés parfaits qui encadrent $n$.",
  tags: ["entier_racine", "encadrer", "methode", "qcm"],
},

/* =========================
   RACINE_DEFI (compléments)
========================= */
{
  kind: "template",
  id: "3e_entier_racine_defi_tpl_1_pythagore",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_defi",
  difficulty: 5,
  theme: "neutral",
  hint: "L’hypoténuse vérifie $h^2 = a^2 + b^2$, puis on prend la racine.",
  tags: ["entier_racine", "defi", "pythagore_theoreme", "template"],
  generate: () => {
    const t = randomChoice([
      { a: 3, b: 4, c: 5 },
      { a: 6, b: 8, c: 10 },
      { a: 5, b: 12, c: 13 },
      { a: 8, b: 15, c: 17 },
    ]);
    return {
      text: `Un triangle rectangle a des côtés de l’angle droit de $${t.a}$ et $${t.b}$. L’hypoténuse vérifie $h^2 = ${t.a}^2 + ${t.b}^2$. Combien vaut $h$ ?`,
      format: "short",
      expected: [String(t.c)],
      comparator: "number_equal",
      explanation:
        `Définition : on calcule $h^2$, puis on prend la racine carrée.\n\n` +
        `Méthode : $h = \\sqrt{${t.a}^2 + ${t.b}^2}$.\n\n` +
        `Calcul : $h^2 = ${t.a * t.a} + ${t.b * t.b} = ${t.c * t.c}$, donc $h = \\sqrt{${t.c * t.c}} = ${t.c}$.\n\n` +
        `Conclusion : $h = ${t.c}$.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_entier_racine_defi_qcm_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_defi",
  difficulty: 5,
  theme: "neutral",
  text: "Un carré a une aire de $49\\ \\text{cm}^2$. Quelle est la longueur de son côté (en cm) ?",
  format: "short",
  expected: ["7"],
  comparator: "number_equal",
  hint: "Aire $= \\text{côté}^2$, donc côté $= \\sqrt{\\text{aire}}$.",
  explanation:
    "Définition : pour un carré, aire $= \\text{côté}^2$.\n\n" +
    "Méthode : on prend la racine carrée de l’aire.\n\n" +
    "Calcul : $\\sqrt{49} = 7$.\n\n" +
    "Conclusion : le côté mesure $7$ cm.",
  tags: ["entier_racine", "defi", "aire", "short"],
},
{
  kind: "template",
  id: "3e_entier_racine_defi_tpl_2_aire_carre",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_defi",
  difficulty: 5,
  theme: "neutral",
  hint: "Côté $= \\sqrt{\\text{aire}}$.",
  tags: ["entier_racine", "defi", "aire", "template"],
  generate: () => {
    const c = randomChoice([5, 6, 8, 9, 10, 12]);
    const aire = c * c;
    return {
      text: `Un carré a une aire de $${aire}\\ \\text{cm}^2$. Quelle est la longueur de son côté (en cm) ?`,
      format: "short",
      expected: [String(c)],
      comparator: "number_equal",
      explanation:
        `Définition : aire d’un carré $= \\text{côté}^2$.\n\n` +
        `Méthode : côté $= \\sqrt{\\text{aire}}$.\n\n` +
        `Calcul : $\\sqrt{${aire}} = ${c}$.\n\n` +
        `Conclusion : le côté mesure $${c}$ cm.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_entier_racine_defi_qcm_2_irrationnel",
  niveau: "3e",
  matiere: "maths",
  notionId: "entier_racine_carree",
  microId: "entier_racine_defi",
  difficulty: 5,
  theme: "neutral",
  text: "La racine carrée de $2$ est-elle un nombre entier ?",
  format: "qcm",
  choices: ["non", "oui"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "$1^2 = 1$ et $2^2 = 4$ : aucun entier ne donne $2$.",
  explanation:
    "Définition : $\\sqrt{2}$ est le nombre positif dont le carré vaut $2$.\n\n" +
    "Méthode : on cherche un entier dont le carré vaut $2$.\n\n" +
    "Calcul : $1^2 = 1$ et $2^2 = 4$, aucun entier ne convient ; $\\sqrt{2} \\approx 1{,}41$.\n\n" +
    "Conclusion : non, $\\sqrt{2}$ n’est pas un entier.",
  tags: ["entier_racine", "defi", "qcm"],
},
];