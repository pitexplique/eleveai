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
];