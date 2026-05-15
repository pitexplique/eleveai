// lib/tutor-v4/question-banks/maths/cm1/multiplication.bank.ts

import type {
  TutorBankItemV4,
  CalculPoseCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function calculPoseCanvas(
  data: Omit<CalculPoseCanvasData, "kind">
): CalculPoseCanvasData {
  return { kind: "calcul_pose", ...data };
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const multiplicationBank: TutorBankItemV4[] = [
  // ============================================================
  // MULTIPLICATION_TABLE
  // Connaître les tables de multiplication
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 6 × 7",
    format: "short",
    expected: ["42"],
    comparator: "number_equal",
    hint: "Pense à la table de 6 ou à la table de 7.",
    explanation: exp(
      "Une table de multiplication permet de connaître rapidement certains produits.",
      "On utilise la table de 6 ou la table de 7.",
      "6 × 7 = 42.",
      "La réponse est 42."
    ),
    tags: ["cm1", "multiplication", "table", "automatisme"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 8 × 5",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "8 × 5, c’est aussi 5 × 8.",
    explanation: exp(
      "Dans une multiplication, on peut changer l’ordre des facteurs.",
      "On utilise une table connue.",
      "8 × 5 = 40.",
      "La réponse est 40."
    ),
    tags: ["cm1", "multiplication", "table", "commutativite"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_3",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 9 × 4",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 9 ou de 4.",
    explanation: exp(
      "Les tables de multiplication permettent de calculer sans poser l’opération.",
      "On cherche le produit dans une table connue.",
      "9 × 4 = 36.",
      "La réponse est 36."
    ),
    tags: ["cm1", "multiplication", "table", "automatisme"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_4_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 7 × ? = 56",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 7.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver un facteur manquant.",
      "On cherche quel nombre multiplié par 7 donne 56.",
      "7 × 8 = 56.",
      "Le nombre manquant est 8."
    ),
    tags: ["cm1", "multiplication", "table", "facteur_manquant"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_5_inverse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : ? × 9 = 63",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche quel nombre multiplié par 9 donne 63.",
    explanation: exp(
      "On peut utiliser les tables pour retrouver un facteur manquant.",
      "On cherche dans la table de 9.",
      "7 × 9 = 63.",
      "Le nombre manquant est 7."
    ),
    tags: ["cm1", "multiplication", "table", "facteur_manquant"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_6_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Quel produit est égal à 36 ?",
    format: "qcm",
    choices: ["4 × 9", "5 × 8", "6 × 7", "3 × 11"],
    expected: ["4 × 9"],
    comparator: "mcq_exact",
    hint: "Cherche un calcul qui donne 36.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On calcule ou on reconnaît chaque produit proposé.",
      "4 × 9 = 36.",
      "Le produit égal à 36 est 4 × 9."
    ),
    tags: ["cm1", "multiplication", "table", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_7_piege",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève dit que 6 × 8 = 46. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie dans la table de 6 ou de 8.",
    explanation: exp(
      "Une table de multiplication doit être vérifiée avec précision.",
      "On calcule le produit annoncé.",
      "6 × 8 = 48, et non 46.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "multiplication", "table", "erreur", "piege"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_8_commutativite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne le même résultat que 4 × 8 ?",
    format: "qcm",
    choices: ["8 × 4", "8 + 4", "8 - 4", "4 × 4"],
    expected: ["8 × 4"],
    comparator: "mcq_exact",
    hint: "Dans une multiplication, on peut échanger l’ordre des facteurs.",
    explanation: exp(
      "La multiplication est commutative : on peut changer l’ordre des facteurs.",
      "On échange les deux nombres de la multiplication.",
      "4 × 8 = 8 × 4 = 32.",
      "Le calcul équivalent est 8 × 4."
    ),
    tags: ["cm1", "multiplication", "table", "commutativite", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    hint: "Utilise tes tables de multiplication.",
    tags: ["cm1", "multiplication", "table", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const b = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const result = a * b;

      return {
        text: `Calcule : ${a} × ${b}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Les tables de multiplication permettent de calculer rapidement.",
          "On cherche le produit des deux facteurs.",
          `${a} × ${b} = ${result}.`,
          `La réponse est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table du nombre donné.",
    tags: ["cm1", "multiplication", "table", "facteur_manquant", "template"],
    generate: () => {
      const a = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const missing = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const result = a * missing;

      return {
        text: `Complète : ${a} × ? = ${result}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication à trou demande de retrouver un facteur.",
          "On cherche quel nombre multiplié par le facteur connu donne le résultat.",
          `${a} × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_3_qcm_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule chaque produit proposé si besoin.",
    tags: ["cm1", "multiplication", "table", "qcm", "template"],
    generate: () => {
      const a = randomChoice([4, 5, 6, 7, 8, 9]);
      const b = randomChoice([3, 4, 5, 6, 7, 8]);
      const result = a * b;

      const correct = `${a} × ${b}`;

      const wrongs = [
        `${a} × ${Math.max(2, b - 1)}`,
        `${a + 1} × ${b}`,
        `${Math.max(2, a - 1)} × ${b + 1}`,
      ].filter((choice) => choice !== correct);

      return {
        text: `Quel produit est égal à ${result} ?`,
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un produit est le résultat d’une multiplication.",
          "On cherche quelle multiplication donne le nombre demandé.",
          `${a} × ${b} = ${result}.`,
          `Le bon produit est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_4_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie le produit avec ta table.",
    tags: ["cm1", "multiplication", "table", "erreur", "template"],
    generate: () => {
      const a = randomChoice([6, 7, 8, 9]);
      const b = randomChoice([6, 7, 8, 9]);
      const correct = a * b;
      const wrong = correct + randomChoice([-3, -2, 2, 3]);

      return {
        text: `Un élève affirme que ${a} × ${b} = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une erreur dans une table peut changer tout le calcul.",
          "On vérifie le produit donné.",
          `${a} × ${b} = ${correct}, et non ${wrong}.`,
          "L’élève n’a pas raison."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_5_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque panier contient le même nombre de fruits.",
    tags: ["cm1", "multiplication", "table", "reunion", "template"],
    generate: () => {
      const paniers = randomChoice([3, 4, 5, 6, 7, 8]);
      const fruits = randomChoice([4, 5, 6, 7, 8, 9]);
      const total = paniers * fruits;

      return {
        text: `Au marché de Saint-Pierre, il y a ${paniers} paniers avec ${fruits} fruits dans chaque panier. Combien y a-t-il de fruits au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La multiplication permet de compter des groupes égaux.",
          "On multiplie le nombre de paniers par le nombre de fruits dans chaque panier.",
          `${paniers} × ${fruits} = ${total}.`,
          `Il y a ${total} fruits au total.`
        ),
      };
    },
  },
    // ============================================================
  // MULTIPLICATION_MENTAL
  // Multiplier mentalement
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_1_double",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule mentalement : 18 × 2",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Multiplier par 2, c’est doubler.",
    explanation: exp(
      "Multiplier mentalement, c’est utiliser une stratégie rapide sans poser l’opération.",
      "Pour multiplier par 2, on double le nombre.",
      "18 × 2 = 18 + 18 = 36.",
      "La réponse est 36."
    ),
    tags: ["cm1", "multiplication", "mental", "double"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_2_triple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule mentalement : 12 × 3",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Multiplier par 3, c’est ajouter trois fois le même nombre.",
    explanation: exp(
      "Multiplier par 3 revient à prendre trois fois le même nombre.",
      "On peut décomposer ou additionner.",
      "12 × 3 = 12 + 12 + 12 = 36.",
      "La réponse est 36."
    ),
    tags: ["cm1", "multiplication", "mental", "triple"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_3_par_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule mentalement : 24 × 5",
    format: "short",
    expected: ["120"],
    comparator: "number_equal",
    hint: "Multiplier par 5, c’est multiplier par 10 puis prendre la moitié.",
    explanation: exp(
      "Multiplier mentalement peut se faire avec une stratégie.",
      "Pour multiplier par 5, on peut multiplier par 10 puis diviser par 2.",
      "24 × 10 = 240, et la moitié de 240 est 120.",
      "Donc 24 × 5 = 120."
    ),
    tags: ["cm1", "multiplication", "mental", "par_5", "strategie"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_4_par_9",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule mentalement : 17 × 9",
    format: "short",
    expected: ["153"],
    comparator: "number_equal",
    hint: "Multiplier par 9, c’est multiplier par 10 puis enlever le nombre.",
    explanation: exp(
      "Une stratégie mentale permet d’éviter un calcul posé.",
      "Pour multiplier par 9, on peut faire ×10 puis enlever une fois le nombre.",
      "17 × 10 = 170, puis 170 - 17 = 153.",
      "Donc 17 × 9 = 153."
    ),
    tags: ["cm1", "multiplication", "mental", "par_9", "strategie"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_5_decomposer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule mentalement : 14 × 6",
    format: "short",
    expected: ["84"],
    comparator: "number_equal",
    hint: "Tu peux décomposer 14 en 10 + 4.",
    explanation: exp(
      "Décomposer un nombre peut aider à multiplier mentalement.",
      "On transforme 14 × 6 en (10 × 6) + (4 × 6).",
      "10 × 6 = 60 et 4 × 6 = 24. Donc 60 + 24 = 84.",
      "La réponse est 84."
    ),
    tags: ["cm1", "multiplication", "mental", "decomposition"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_6_par_20",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule mentalement : 13 × 20",
    format: "short",
    expected: ["260"],
    comparator: "number_equal",
    hint: "Multiplier par 20, c’est multiplier par 2 puis par 10.",
    explanation: exp(
      "Multiplier mentalement peut se faire en décomposant le multiplicateur.",
      "20 = 2 × 10, donc on peut doubler puis multiplier par 10.",
      "13 × 2 = 26, puis 26 × 10 = 260.",
      "Donc 13 × 20 = 260."
    ),
    tags: ["cm1", "multiplication", "mental", "par_20", "strategie"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_7_piege_par_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : 19 × 5 = 90. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule 19 × 10 puis prends la moitié.",
    explanation: exp(
      "Une stratégie mentale permet de vérifier rapidement un résultat.",
      "Pour multiplier par 5, on peut multiplier par 10 puis diviser par 2.",
      "19 × 10 = 190, et la moitié de 190 est 95.",
      "Donc 19 × 5 = 95, pas 90."
    ),
    tags: ["cm1", "multiplication", "mental", "par_5", "erreur", "piege"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_8_choisir_strategie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle stratégie est pratique pour calculer 32 × 5 ?",
    format: "qcm",
    choices: [
      "faire 32 × 10 puis diviser par 2",
      "faire 32 + 5",
      "faire 32 - 5",
      "faire 32 ÷ 5",
    ],
    expected: ["faire 32 × 10 puis diviser par 2"],
    comparator: "mcq_exact",
    hint: "Multiplier par 5, c’est prendre la moitié de ×10.",
    explanation: exp(
      "Multiplier mentalement, c’est choisir une méthode efficace.",
      "Pour multiplier par 5, on peut passer par ×10.",
      "32 × 10 = 320, puis 320 ÷ 2 = 160.",
      "La stratégie correcte est de faire 32 × 10 puis diviser par 2."
    ),
    tags: ["cm1", "multiplication", "mental", "strategie", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_9_decomposer_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle décomposition aide à calculer 23 × 4 ?",
    format: "qcm",
    choices: [
      "20 × 4 + 3 × 4",
      "20 + 4 + 3",
      "23 + 4",
      "23 - 4",
    ],
    expected: ["20 × 4 + 3 × 4"],
    comparator: "mcq_exact",
    hint: "Décompose 23 en 20 + 3.",
    explanation: exp(
      "Décomposer un nombre permet de transformer un produit en calculs plus simples.",
      "On écrit 23 = 20 + 3, puis on multiplie chaque partie par 4.",
      "23 × 4 = 20 × 4 + 3 × 4.",
      "La bonne décomposition est 20 × 4 + 3 × 4."
    ),
    tags: ["cm1", "multiplication", "mental", "decomposition", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_1_double",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplier par 2, c’est doubler.",
    tags: ["cm1", "multiplication", "mental", "double", "template"],
    generate: () => {
      const n = randomInt(11, 49);
      const result = n * 2;

      return {
        text: `Calcule mentalement : ${n} × 2`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 2 revient à doubler un nombre.",
          "On ajoute le nombre à lui-même.",
          `${n} × 2 = ${n} + ${n} = ${result}.`,
          `La réponse est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_2_par_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 5, c’est multiplier par 10 puis diviser par 2.",
    tags: ["cm1", "multiplication", "mental", "par_5", "template"],
    generate: () => {
      const n = randomChoice([12, 14, 16, 18, 22, 24, 26, 28, 32, 34]);
      const result = n * 5;

      return {
        text: `Calcule mentalement : ${n} × 5`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 5 peut se faire en utilisant ×10.",
          "On multiplie par 10 puis on prend la moitié.",
          `${n} × 10 = ${n * 10}, et la moitié de ${n * 10} est ${result}.`,
          `Donc ${n} × 5 = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_3_par_9",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplier par 9, c’est faire ×10 puis enlever une fois le nombre.",
    tags: ["cm1", "multiplication", "mental", "par_9", "template"],
    generate: () => {
      const n = randomInt(11, 39);
      const result = n * 9;

      return {
        text: `Calcule mentalement : ${n} × 9`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 9 peut se faire à partir de ×10.",
          "On multiplie par 10 puis on enlève le nombre de départ.",
          `${n} × 10 = ${n * 10}, puis ${n * 10} - ${n} = ${result}.`,
          `Donc ${n} × 9 = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_4_decomposer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Décompose le premier nombre en dizaines et unités.",
    tags: ["cm1", "multiplication", "mental", "decomposition", "template"],
    generate: () => {
      const tens = randomChoice([10, 20, 30, 40]);
      const units = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const n = tens + units;
      const factor = randomChoice([3, 4, 5, 6]);
      const result = n * factor;

      return {
        text: `Calcule mentalement : ${n} × ${factor}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Décomposer un nombre facilite parfois le calcul mental.",
          `On écrit ${n} = ${tens} + ${units}.`,
          `${tens} × ${factor} = ${tens * factor} et ${units} × ${factor} = ${
            units * factor
          }. Donc ${tens * factor} + ${units * factor} = ${result}.`,
          `La réponse est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_5_par_20",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 20, c’est doubler puis multiplier par 10.",
    tags: ["cm1", "multiplication", "mental", "par_20", "template"],
    generate: () => {
      const n = randomInt(11, 49);
      const result = n * 20;

      return {
        text: `Calcule mentalement : ${n} × 20`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 20 peut se faire avec une stratégie.",
          "On multiplie d’abord par 2, puis par 10.",
          `${n} × 2 = ${n * 2}, puis ${n * 2} × 10 = ${result}.`,
          `Donc ${n} × 20 = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_6_reunion_dechets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "reunion",
    hint: "Même nombre d’objets dans chaque groupe : on multiplie.",
    tags: ["cm1", "multiplication", "mental", "reunion", "dechet", "template"],
    generate: () => {
      const groupes = randomChoice([4, 5, 6, 8]);
      const objets = randomChoice([12, 15, 20]);
      const total = groupes * objets;

      return {
        text: `À La Réunion, ${groupes} groupes ramassent chacun ${objets} déchets sur une plage. Combien de déchets sont ramassés au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La multiplication permet de calculer rapidement des groupes égaux.",
          "On multiplie le nombre de groupes par le nombre de déchets dans chaque groupe.",
          `${groupes} × ${objets} = ${total}.`,
          `Au total, ${total} déchets sont ramassés.`
        ),
      };
    },
  },
    // ============================================================
  // MULTIPLICATION_POSEE
  // Poser une multiplication simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_1_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une multiplication posée, pourquoi faut-il bien aligner les chiffres ?",
    format: "qcm",
    choices: [
      "pour respecter le rang des chiffres",
      "pour écrire plus vite",
      "pour éviter de multiplier",
      "pour changer le résultat",
    ],
    expected: ["pour respecter le rang des chiffres"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre a une valeur selon sa position : unités, dizaines, centaines.",
    explanation: exp(
      "Une multiplication posée organise un calcul en colonnes.",
      "On place les chiffres en respectant leur rang.",
      "Les unités, dizaines et centaines n’ont pas la même valeur.",
      "Il faut aligner correctement les chiffres pour ne pas mélanger les rangs."
    ),
    tags: ["cm1", "multiplication", "posee", "methode", "qcm", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication posée",
      numbers: ["124", "3"],
      result: "372",
      questionLabel: "Observe le rang des chiffres.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_2_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule la multiplication posée : 123 × 3",
    format: "short",
    expected: ["369"],
    comparator: "number_equal",
    hint: "Multiplie 3 par chaque chiffre : unités, dizaines, centaines.",
    explanation: exp(
      "Poser une multiplication permet de multiplier un nombre par étapes.",
      "On multiplie chaque chiffre du nombre du haut par le nombre du bas.",
      "123 × 3 = 369.",
      "Le résultat est 369."
    ),
    tags: ["cm1", "multiplication", "posee", "simple", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication posée",
      numbers: ["123", "3"],
      result: "369",
      questionLabel: "Multiplie colonne par colonne.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_3_sans_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 212 × 4",
    format: "short",
    expected: ["848"],
    comparator: "number_equal",
    hint: "Multiplie 4 par les unités, puis les dizaines, puis les centaines.",
    explanation: exp(
      "Une multiplication posée permet de calculer avec méthode.",
      "On multiplie chaque chiffre en respectant son rang.",
      "212 × 4 = 848.",
      "Le résultat est 848."
    ),
    tags: ["cm1", "multiplication", "posee", "sans_retenue", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication sans retenue",
      numbers: ["212", "4"],
      result: "848",
      questionLabel: "Chaque chiffre garde son rang.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_4_avec_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 247 × 4",
    format: "short",
    expected: ["988"],
    comparator: "number_equal",
    hint: "Attention aux retenues.",
    explanation: exp(
      "Une retenue apparaît quand un produit dépasse 9 dans une colonne.",
      "On multiplie colonne par colonne et on reporte les retenues.",
      "247 × 4 = 988.",
      "Le résultat est 988."
    ),
    tags: ["cm1", "multiplication", "posee", "retenue", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication avec retenues",
      numbers: ["247", "4"],
      result: "988",
      questionLabel: "Pense aux retenues.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_5_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 306 × 5",
    format: "short",
    expected: ["1530", "1 530"],
    comparator: "number_equal",
    hint: "N’oublie pas le zéro dans le nombre 306.",
    explanation: exp(
      "Dans une multiplication posée, chaque chiffre compte, même le zéro.",
      "On multiplie chaque chiffre en respectant son rang.",
      "306 × 5 = 1 530.",
      "Le résultat est 1 530."
    ),
    tags: ["cm1", "multiplication", "posee", "zero", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication avec zéro",
      numbers: ["306", "5"],
      result: "1530",
      questionLabel: "Le zéro garde son rang.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_6_erreur_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule 126 × 4 et oublie une retenue. Pourquoi son résultat peut-il être faux ?",
    format: "open",
    expected: ["retenue", "reporter", "colonne", "résultat", "faux"],
    comparator: "contains_keyword",
    hint: "Une retenue oubliée change la colonne suivante.",
    explanation: exp(
      "Une retenue est une quantité à reporter dans la colonne suivante.",
      "On doit multiplier puis ajouter la retenue au bon moment.",
      "Si une retenue est oubliée, une colonne devient fausse.",
      "Oublier une retenue peut rendre tout le résultat faux."
    ),
    tags: ["cm1", "multiplication", "posee", "erreur", "retenue", "open", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Erreur fréquente",
      numbers: ["126", "4"],
      result: "504",
      questionLabel: "La retenue doit être reportée.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_7_qcm_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 234 × 3 = 612. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie en multipliant chaque chiffre par 3.",
    explanation: exp(
      "Vérifier une multiplication posée permet de repérer une erreur.",
      "On refait le calcul colonne par colonne.",
      "234 × 3 = 702, et non 612.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "multiplication", "posee", "erreur", "qcm", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Vérifier une multiplication",
      numbers: ["234", "3"],
      result: "702",
      questionLabel: "Refais le calcul pour vérifier.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_1_un_chiffre_sans_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie chaque chiffre du nombre par le chiffre du bas.",
    tags: ["cm1", "multiplication", "posee", "template", "sans_retenue", "canvas"],
    generate: () => {
      const a = randomChoice([112, 123, 211, 221, 312]);
      const b = randomChoice([2, 3]);
      const result = a * b;

      return {
        text: `Calcule : ${a} × ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication posée permet de calculer en colonnes.",
          "On multiplie chaque chiffre du nombre par le chiffre du bas.",
          `${a} × ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication posée",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Multiplie chaque colonne.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_2_un_chiffre_avec_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie colonne par colonne et pense aux retenues.",
    tags: ["cm1", "multiplication", "posee", "retenue", "template", "canvas"],
    generate: () => {
      const a = randomChoice([247, 358, 469, 576, 684]);
      const b = randomChoice([3, 4, 5, 6]);
      const result = a * b;

      return {
        text: `Calcule : ${a} × ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication posée peut nécessiter des retenues.",
          "On multiplie chaque colonne et on reporte les retenues.",
          `${a} × ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication avec retenues",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Attention aux retenues.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_3_avec_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Le zéro est un chiffre : il garde sa place.",
    tags: ["cm1", "multiplication", "posee", "zero", "template", "canvas"],
    generate: () => {
      const a = randomChoice([204, 305, 406, 507, 608]);
      const b = randomChoice([3, 4, 5, 6]);
      const result = a * b;

      return {
        text: `Calcule : ${a} × ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Le zéro dans un nombre garde son rang.",
          "On pose la multiplication en respectant chaque chiffre.",
          `${a} × ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication avec zéro",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Ne supprime pas le zéro : il garde une place.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_4_erreur_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Refais la multiplication ou estime le résultat.",
    tags: [
      "cm1",
      "multiplication",
      "posee",
      "erreur",
      "verification",
      "template",
      "canvas",
    ],
    generate: () => {
      const a = randomChoice([126, 234, 315, 428]);
      const b = randomChoice([3, 4, 5]);
      const correct = a * b;
      const wrong = correct - randomChoice([10, 20, 100]);

      return {
        text: `Un élève affirme que ${a} × ${b} = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Vérifier une multiplication permet de repérer une erreur.",
          "On refait le calcul ou on estime le résultat.",
          `${a} × ${b} = ${correct}, et non ${wrong}.`,
          "L’élève n’a pas raison."
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Vérifier une multiplication",
          numbers: [String(a), String(b)],
          result: String(correct),
          questionLabel: "Compare le résultat annoncé avec le calcul correct.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_5_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "reunion",
    hint: "Même quantité répétée plusieurs fois : on multiplie.",
    tags: [
      "cm1",
      "multiplication",
      "posee",
      "probleme",
      "reunion",
      "template",
      "canvas",
    ],
    generate: () => {
      const sacs = randomChoice([12, 15, 18, 24]);
      const fruits = randomChoice([4, 6, 8, 9]);
      const total = sacs * fruits;

      return {
        text: `Au marché, il y a ${sacs} sacs contenant chacun ${fruits} fruits. Combien y a-t-il de fruits au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La multiplication permet de calculer des groupes égaux.",
          "On multiplie le nombre de sacs par le nombre de fruits dans chaque sac.",
          `${sacs} × ${fruits} = ${total}.`,
          `Il y a ${total} fruits au total.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Problème — marché",
          numbers: [String(sacs), String(fruits)],
          result: String(total),
          questionLabel: "On peut poser la multiplication.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },
    // ============================================================
  // MULTIPLICATION_PUISSANCE_DIX
  // Multiplier par 10, 100 ou 1 000
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_1_par_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 34 × 10",
    format: "short",
    expected: ["340"],
    comparator: "number_equal",
    hint: "Pour un nombre entier, multiplier par 10 revient à écrire un zéro à droite.",
    explanation: exp(
      "Multiplier par 10, 100 ou 1 000 permet de rendre un nombre 10, 100 ou 1 000 fois plus grand.",
      "Pour un nombre entier, multiplier par 10 revient à écrire un zéro à droite.",
      "34 × 10 = 340.",
      "Le résultat est 340."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "par_10"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_2_par_100",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 56 × 100",
    format: "short",
    expected: ["5600", "5 600"],
    comparator: "number_equal",
    hint: "Pour un nombre entier, multiplier par 100 revient à écrire deux zéros à droite.",
    explanation: exp(
      "Multiplier par 100 rend un nombre 100 fois plus grand.",
      "Pour un nombre entier, multiplier par 100 revient à écrire deux zéros à droite.",
      "56 × 100 = 5 600.",
      "Le résultat est 5 600."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "par_100"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_3_par_1000",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 7 × 1 000",
    format: "short",
    expected: ["7000", "7 000"],
    comparator: "number_equal",
    hint: "Pour un nombre entier, multiplier par 1 000 revient à écrire trois zéros à droite.",
    explanation: exp(
      "Multiplier par 1 000 rend un nombre 1 000 fois plus grand.",
      "Pour un nombre entier, on écrit trois zéros à droite.",
      "7 × 1 000 = 7 000.",
      "Le résultat est 7 000."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "par_1000"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le résultat de 48 × 10 ?",
    format: "qcm",
    choices: ["480", "48", "4 800", "58"],
    expected: ["480"],
    comparator: "mcq_exact",
    hint: "Multiplier par 10 donne un nombre 10 fois plus grand.",
    explanation: exp(
      "Multiplier par 10 rend un nombre 10 fois plus grand.",
      "Pour un nombre entier, on peut écrire un zéro à droite.",
      "48 × 10 = 480.",
      "La bonne réponse est 480."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "qcm", "par_10"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_5_piege_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme que 205 × 10 = 2 050. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le zéro déjà présent dans 205 reste dans le nombre.",
    explanation: exp(
      "Multiplier un entier par 10 revient à rendre le nombre 10 fois plus grand.",
      "On écrit un zéro à droite du nombre entier.",
      "205 × 10 = 2 050.",
      "L’élève a raison."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "zero", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_6_piege_nombre_grand",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 73 × 100 = 730. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Multiplier par 100 revient à écrire deux zéros à droite pour un entier.",
    explanation: exp(
      "Multiplier par 100 rend un nombre 100 fois plus grand.",
      "Pour un nombre entier, on écrit deux zéros à droite.",
      "73 × 100 = 7 300, et non 730.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "erreur", "piege"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_7_rang",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi 42 × 100 est-il plus grand que 42 × 10 ?",
    format: "open",
    expected: ["100", "10", "plus grand", "dix fois", "zéro"],
    comparator: "contains_keyword",
    hint: "100 est dix fois plus grand que 10.",
    explanation: exp(
      "Multiplier par 10 ou par 100 ne donne pas le même ordre de grandeur.",
      "On compare les multiplicateurs 10 et 100.",
      "100 est dix fois plus grand que 10, donc 42 × 100 est dix fois plus grand que 42 × 10.",
      "Multiplier par 100 donne un résultat plus grand que multiplier par 10."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "open", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_8_nombre_avec_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 120 × 100",
    format: "short",
    expected: ["12000", "12 000"],
    comparator: "number_equal",
    hint: "Multiplier par 100 revient à écrire deux zéros à droite. Les zéros déjà présents restent.",
    explanation: exp(
      "Multiplier par 100 rend un nombre 100 fois plus grand.",
      "Pour un entier, on écrit deux zéros à droite du nombre.",
      "120 × 100 = 12 000.",
      "Le résultat est 12 000."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "zero", "par_100"],
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_1_par_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    hint: "Pour un entier, multiplier par 10 revient à écrire un zéro à droite.",
    tags: ["cm1", "multiplication", "puissance_dix", "par_10", "template"],
    generate: () => {
      const n = randomInt(11, 99);
      const result = n * 10;

      return {
        text: `Calcule : ${n} × 10`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 10 rend un nombre 10 fois plus grand.",
          "Pour un nombre entier, on écrit un zéro à droite.",
          `${n} × 10 = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_2_par_100",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour un entier, multiplier par 100 revient à écrire deux zéros à droite.",
    tags: ["cm1", "multiplication", "puissance_dix", "par_100", "template"],
    generate: () => {
      const n = randomInt(11, 99);
      const result = n * 100;

      return {
        text: `Calcule : ${n} × 100`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 100 rend un nombre 100 fois plus grand.",
          "Pour un nombre entier, on écrit deux zéros à droite.",
          `${n} × 100 = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_3_par_1000",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour un entier, multiplier par 1 000 revient à écrire trois zéros à droite.",
    tags: ["cm1", "multiplication", "puissance_dix", "par_1000", "template"],
    generate: () => {
      const n = randomInt(2, 99);
      const result = n * 1000;

      return {
        text: `Calcule : ${n} × 1 000`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 1 000 rend un nombre 1 000 fois plus grand.",
          "Pour un nombre entier, on écrit trois zéros à droite.",
          `${n} × 1 000 = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si on multiplie par 10, 100 ou 1 000.",
    tags: ["cm1", "multiplication", "puissance_dix", "qcm", "template"],
    generate: () => {
      const n = randomInt(12, 98);
      const factor = randomChoice([10, 100, 1000]);
      const result = n * factor;

      const wrong1 = factor === 10 ? n * 100 : n * 10;
      const wrong2 = factor === 1000 ? n * 100 : n * 1000;
      const wrong3 = result + factor;

      return {
        text: `Quel est le résultat de ${n} × ${
          factor === 1000 ? "1 000" : factor
        } ?`,
        format: "qcm",
        choices: makeChoices(String(result), [
          String(wrong1),
          String(wrong2),
          String(wrong3),
        ]),
        expected: [String(result)],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par 10, 100 ou 1 000 change le rang des chiffres.",
          "Pour un entier, on peut écrire le bon nombre de zéros à droite.",
          `${n} × ${factor} = ${result}.`,
          `La bonne réponse est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_5_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque carton contient la même quantité.",
    tags: ["cm1", "multiplication", "puissance_dix", "reunion", "template"],
    generate: () => {
      const cartons = randomChoice([10, 100]);
      const objets = randomChoice([12, 24, 35, 48, 56]);
      const total = cartons * objets;

      return {
        text: `Au marché de Saint-Pierre, ${cartons} cartons contiennent chacun ${objets} fruits. Combien y a-t-il de fruits au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La multiplication permet de calculer des groupes égaux.",
          "On multiplie le nombre de cartons par le nombre de fruits dans chaque carton.",
          `${cartons} × ${objets} = ${total}.`,
          `Il y a ${total} fruits au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_6_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie le nombre de zéros.",
    tags: ["cm1", "multiplication", "puissance_dix", "erreur", "template"],
    generate: () => {
      const n = randomInt(12, 99);
      const factor = randomChoice([100, 1000]);
      const correct = n * factor;
      const wrong = factor === 100 ? n * 10 : n * 100;

      return {
        text: `Un élève affirme que ${n} × ${
          factor === 1000 ? "1 000" : factor
        } = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par 100 ou 1 000 demande de bien contrôler le nombre de zéros.",
          "On calcule le produit correct.",
          `${n} × ${factor} = ${correct}, et non ${wrong}.`,
          "L’élève n’a pas raison."
        ),
      };
    },
  },
    // ============================================================
  // MULTIPLICATION_PUISSANCE_DIX
  // Multiplier par 10, 100 ou 1 000
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_1_par_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 34 × 10",
    format: "short",
    expected: ["340"],
    comparator: "number_equal",
    hint: "Pour un nombre entier, multiplier par 10 revient à écrire un zéro à droite.",
    explanation: exp(
      "Multiplier par 10, 100 ou 1 000 permet de rendre un nombre 10, 100 ou 1 000 fois plus grand.",
      "Pour un nombre entier, multiplier par 10 revient à écrire un zéro à droite.",
      "34 × 10 = 340.",
      "Le résultat est 340."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "par_10"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_2_par_100",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 56 × 100",
    format: "short",
    expected: ["5600", "5 600"],
    comparator: "number_equal",
    hint: "Pour un nombre entier, multiplier par 100 revient à écrire deux zéros à droite.",
    explanation: exp(
      "Multiplier par 100 rend un nombre 100 fois plus grand.",
      "Pour un nombre entier, multiplier par 100 revient à écrire deux zéros à droite.",
      "56 × 100 = 5 600.",
      "Le résultat est 5 600."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "par_100"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_3_par_1000",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 7 × 1 000",
    format: "short",
    expected: ["7000", "7 000"],
    comparator: "number_equal",
    hint: "Pour un nombre entier, multiplier par 1 000 revient à écrire trois zéros à droite.",
    explanation: exp(
      "Multiplier par 1 000 rend un nombre 1 000 fois plus grand.",
      "Pour un nombre entier, on écrit trois zéros à droite.",
      "7 × 1 000 = 7 000.",
      "Le résultat est 7 000."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "par_1000"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le résultat de 48 × 10 ?",
    format: "qcm",
    choices: ["480", "48", "4 800", "58"],
    expected: ["480"],
    comparator: "mcq_exact",
    hint: "Multiplier par 10 donne un nombre 10 fois plus grand.",
    explanation: exp(
      "Multiplier par 10 rend un nombre 10 fois plus grand.",
      "Pour un nombre entier, on peut écrire un zéro à droite.",
      "48 × 10 = 480.",
      "La bonne réponse est 480."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "qcm", "par_10"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_5_piege_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme que 205 × 10 = 2 050. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le zéro déjà présent dans 205 reste dans le nombre.",
    explanation: exp(
      "Multiplier un entier par 10 revient à rendre le nombre 10 fois plus grand.",
      "On écrit un zéro à droite du nombre entier.",
      "205 × 10 = 2 050.",
      "L’élève a raison."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "zero", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_6_piege_nombre_grand",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 73 × 100 = 730. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Multiplier par 100 revient à écrire deux zéros à droite pour un entier.",
    explanation: exp(
      "Multiplier par 100 rend un nombre 100 fois plus grand.",
      "Pour un nombre entier, on écrit deux zéros à droite.",
      "73 × 100 = 7 300, et non 730.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "erreur", "piege"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_7_rang",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi 42 × 100 est-il plus grand que 42 × 10 ?",
    format: "open",
    expected: ["100", "10", "plus grand", "dix fois", "zéro"],
    comparator: "contains_keyword",
    hint: "100 est dix fois plus grand que 10.",
    explanation: exp(
      "Multiplier par 10 ou par 100 ne donne pas le même ordre de grandeur.",
      "On compare les multiplicateurs 10 et 100.",
      "100 est dix fois plus grand que 10, donc 42 × 100 est dix fois plus grand que 42 × 10.",
      "Multiplier par 100 donne un résultat plus grand que multiplier par 10."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "open", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_8_nombre_avec_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 120 × 100",
    format: "short",
    expected: ["12000", "12 000"],
    comparator: "number_equal",
    hint: "Multiplier par 100 revient à écrire deux zéros à droite. Les zéros déjà présents restent.",
    explanation: exp(
      "Multiplier par 100 rend un nombre 100 fois plus grand.",
      "Pour un entier, on écrit deux zéros à droite du nombre.",
      "120 × 100 = 12 000.",
      "Le résultat est 12 000."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "zero", "par_100"],
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_1_par_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    hint: "Pour un entier, multiplier par 10 revient à écrire un zéro à droite.",
    tags: ["cm1", "multiplication", "puissance_dix", "par_10", "template"],
    generate: () => {
      const n = randomInt(11, 99);
      const result = n * 10;

      return {
        text: `Calcule : ${n} × 10`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 10 rend un nombre 10 fois plus grand.",
          "Pour un nombre entier, on écrit un zéro à droite.",
          `${n} × 10 = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_2_par_100",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour un entier, multiplier par 100 revient à écrire deux zéros à droite.",
    tags: ["cm1", "multiplication", "puissance_dix", "par_100", "template"],
    generate: () => {
      const n = randomInt(11, 99);
      const result = n * 100;

      return {
        text: `Calcule : ${n} × 100`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 100 rend un nombre 100 fois plus grand.",
          "Pour un nombre entier, on écrit deux zéros à droite.",
          `${n} × 100 = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_3_par_1000",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour un entier, multiplier par 1 000 revient à écrire trois zéros à droite.",
    tags: ["cm1", "multiplication", "puissance_dix", "par_1000", "template"],
    generate: () => {
      const n = randomInt(2, 99);
      const result = n * 1000;

      return {
        text: `Calcule : ${n} × 1 000`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 1 000 rend un nombre 1 000 fois plus grand.",
          "Pour un nombre entier, on écrit trois zéros à droite.",
          `${n} × 1 000 = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si on multiplie par 10, 100 ou 1 000.",
    tags: ["cm1", "multiplication", "puissance_dix", "qcm", "template"],
    generate: () => {
      const n = randomInt(12, 98);
      const factor = randomChoice([10, 100, 1000]);
      const result = n * factor;

      const wrong1 = factor === 10 ? n * 100 : n * 10;
      const wrong2 = factor === 1000 ? n * 100 : n * 1000;
      const wrong3 = result + factor;

      return {
        text: `Quel est le résultat de ${n} × ${
          factor === 1000 ? "1 000" : factor
        } ?`,
        format: "qcm",
        choices: makeChoices(String(result), [
          String(wrong1),
          String(wrong2),
          String(wrong3),
        ]),
        expected: [String(result)],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par 10, 100 ou 1 000 change le rang des chiffres.",
          "Pour un entier, on peut écrire le bon nombre de zéros à droite.",
          `${n} × ${factor} = ${result}.`,
          `La bonne réponse est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_5_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque carton contient la même quantité.",
    tags: ["cm1", "multiplication", "puissance_dix", "reunion", "template"],
    generate: () => {
      const cartons = randomChoice([10, 100]);
      const objets = randomChoice([12, 24, 35, 48, 56]);
      const total = cartons * objets;

      return {
        text: `Au marché de Saint-Pierre, ${cartons} cartons contiennent chacun ${objets} fruits. Combien y a-t-il de fruits au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La multiplication permet de calculer des groupes égaux.",
          "On multiplie le nombre de cartons par le nombre de fruits dans chaque carton.",
          `${cartons} × ${objets} = ${total}.`,
          `Il y a ${total} fruits au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_6_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie le nombre de zéros.",
    tags: ["cm1", "multiplication", "puissance_dix", "erreur", "template"],
    generate: () => {
      const n = randomInt(12, 99);
      const factor = randomChoice([100, 1000]);
      const correct = n * factor;
      const wrong = factor === 100 ? n * 10 : n * 100;

      return {
        text: `Un élève affirme que ${n} × ${
          factor === 1000 ? "1 000" : factor
        } = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par 100 ou 1 000 demande de bien contrôler le nombre de zéros.",
          "On calcule le produit correct.",
          `${n} × ${factor} = ${correct}, et non ${wrong}.`,
          "L’élève n’a pas raison."
        ),
      };
    },
  },
    // ============================================================
  // MULTIPLICATION_PROBLEME
  // Utiliser la multiplication dans un problème
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_1_groupes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Il y a 6 boîtes avec 8 crayons dans chaque boîte. Combien y a-t-il de crayons au total ?",
    format: "short",
    expected: ["48"],
    comparator: "number_equal",
    hint: "Il y a le même nombre de crayons dans chaque boîte.",
    explanation: exp(
      "La multiplication permet de calculer rapidement des groupes égaux.",
      "On multiplie le nombre de boîtes par le nombre de crayons dans chaque boîte.",
      "6 × 8 = 48.",
      "Il y a 48 crayons au total."
    ),
    tags: ["cm1", "multiplication", "probleme", "groupes_egaux"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_2_addition_repetee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul correspond à 9 + 9 + 9 + 9 ?",
    format: "qcm",
    choices: ["4 × 9", "9 × 9", "4 + 9", "9 - 4"],
    expected: ["4 × 9"],
    comparator: "mcq_exact",
    hint: "Le nombre 9 est répété 4 fois.",
    explanation: exp(
      "Une multiplication peut remplacer une addition répétée.",
      "On compte combien de fois le même nombre est ajouté.",
      "9 + 9 + 9 + 9 correspond à 4 fois 9, donc 4 × 9.",
      "Le calcul correspondant est 4 × 9."
    ),
    tags: ["cm1", "multiplication", "probleme", "addition_repetee", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_3_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un vendeur prépare 7 paniers avec 6 mangues dans chaque panier. Combien y a-t-il de mangues au total ?",
    format: "short",
    expected: ["42"],
    comparator: "number_equal",
    hint: "Chaque panier contient le même nombre de mangues.",
    explanation: exp(
      "La multiplication sert à calculer un total quand des groupes sont identiques.",
      "On multiplie le nombre de paniers par le nombre de mangues dans chaque panier.",
      "7 × 6 = 42.",
      "Il y a 42 mangues au total."
    ),
    tags: ["cm1", "multiplication", "probleme", "reunion", "marche"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_4_dechets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Pendant une sortie nature, 5 groupes ramassent chacun 12 déchets. Combien de déchets sont ramassés au total ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Chaque groupe ramasse 12 déchets.",
    explanation: exp(
      "La multiplication permet de calculer des groupes égaux.",
      "On multiplie le nombre de groupes par le nombre de déchets ramassés par groupe.",
      "5 × 12 = 60.",
      "Au total, 60 déchets sont ramassés."
    ),
    tags: ["cm1", "multiplication", "probleme", "reunion", "dechet", "ecologie"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_5_pieces",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un jeu vidéo, un coffre donne 25 pièces. Combien de pièces donnent 4 coffres ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Chaque coffre donne 25 pièces.",
    explanation: exp(
      "La multiplication permet de calculer une même quantité répétée plusieurs fois.",
      "On multiplie le nombre de coffres par le nombre de pièces par coffre.",
      "4 × 25 = 100.",
      "Les 4 coffres donnent 100 pièces."
    ),
    tags: ["cm1", "multiplication", "probleme", "jeu_video", "pieces"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_6_choisir_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans quel cas faut-il utiliser une multiplication ?",
    format: "qcm",
    choices: [
      "8 sacs avec 6 objets dans chaque sac",
      "8 objets auxquels on enlève 6 objets",
      "8 objets partagés entre 6 élèves",
      "8 objets et encore 6 objets",
    ],
    expected: ["8 sacs avec 6 objets dans chaque sac"],
    comparator: "mcq_exact",
    hint: "La multiplication sert souvent à calculer des groupes égaux.",
    explanation: exp(
      "Choisir l’opération dépend du sens du problème.",
      "On utilise une multiplication quand une même quantité est répétée plusieurs fois.",
      "8 sacs avec 6 objets dans chaque sac correspond à 8 × 6.",
      "C’est donc la situation qui utilise une multiplication."
    ),
    tags: ["cm1", "multiplication", "probleme", "choisir_operation", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_7_piege_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève lit : « 6 sachets contiennent chacun 8 bonbons ». Il calcule 6 + 8 = 14. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le mot « chacun » indique des groupes égaux.",
    explanation: exp(
      "Dans un problème, il faut choisir l’opération qui correspond à la situation.",
      "Quand plusieurs groupes contiennent chacun la même quantité, on multiplie.",
      "6 sachets de 8 bonbons donnent 6 × 8 = 48, et non 6 + 8.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: [
      "cm1",
      "multiplication",
      "probleme",
      "erreur",
      "piege",
      "choisir_operation",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_8_phrase_reponse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi faut-il écrire une phrase-réponse après un problème de multiplication ?",
    format: "open",
    expected: ["phrase", "réponse", "unité", "problème", "conclusion"],
    comparator: "contains_keyword",
    hint: "Le nombre seul ne dit pas toujours ce qu’il représente.",
    explanation: exp(
      "Une phrase-réponse relie le calcul au contexte du problème.",
      "On reprend les mots de la question et on ajoute l’unité si nécessaire.",
      "Par exemple, 6 × 8 = 48 doit devenir : il y a 48 crayons.",
      "La phrase-réponse permet de conclure clairement."
    ),
    tags: ["cm1", "multiplication", "probleme", "open", "redaction"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_9_canvas_posee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une école commande 14 boîtes de 6 feutres. Combien de feutres y a-t-il au total ?",
    format: "short",
    expected: ["84"],
    comparator: "number_equal",
    hint: "Même nombre de feutres dans chaque boîte : on multiplie.",
    explanation: exp(
      "Un problème de groupes égaux se résout avec une multiplication.",
      "On multiplie le nombre de boîtes par le nombre de feutres par boîte.",
      "14 × 6 = 84.",
      "Il y a 84 feutres au total."
    ),
    tags: ["cm1", "multiplication", "probleme", "canvas", "groupes_egaux"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Problème — groupes égaux",
      numbers: ["14", "6"],
      result: "84",
      questionLabel: "On peut poser la multiplication.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_1_groupes_egaux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Même quantité dans chaque groupe : on multiplie.",
    tags: ["cm1", "multiplication", "probleme", "groupes_egaux", "template"],
    generate: () => {
      const groupes = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const quantite = randomChoice([4, 5, 6, 7, 8, 9]);
      const total = groupes * quantite;

      return {
        text: `Il y a ${groupes} boîtes avec ${quantite} objets dans chaque boîte. Combien y a-t-il d’objets au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La multiplication permet de calculer des groupes égaux.",
          "On multiplie le nombre de groupes par la quantité dans chaque groupe.",
          `${groupes} × ${quantite} = ${total}.`,
          `Il y a ${total} objets au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_2_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque panier contient le même nombre de fruits.",
    tags: ["cm1", "multiplication", "probleme", "reunion", "marche", "template"],
    generate: () => {
      const paniers = randomChoice([4, 5, 6, 7, 8]);
      const fruits = randomChoice([6, 8, 9, 12]);
      const total = paniers * fruits;

      return {
        text: `Au marché de Saint-Pierre, il y a ${paniers} paniers avec ${fruits} fruits dans chaque panier. Combien y a-t-il de fruits au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication peut modéliser une situation concrète.",
          "On multiplie le nombre de paniers par le nombre de fruits dans chaque panier.",
          `${paniers} × ${fruits} = ${total}.`,
          `Il y a ${total} fruits au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_3_dechets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque groupe ramasse le même nombre de déchets.",
    tags: ["cm1", "multiplication", "probleme", "reunion", "dechet", "template"],
    generate: () => {
      const groupes = randomChoice([3, 4, 5, 6, 8]);
      const dechets = randomChoice([10, 12, 15, 20]);
      const total = groupes * dechets;

      return {
        text: `Sur une plage, ${groupes} groupes ramassent chacun ${dechets} déchets. Combien de déchets sont ramassés au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication permet de calculer le total de plusieurs groupes égaux.",
          "On multiplie le nombre de groupes par le nombre de déchets dans chaque groupe.",
          `${groupes} × ${dechets} = ${total}.`,
          `Au total, ${total} déchets sont ramassés.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_4_jeu_video",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque coffre donne le même nombre de pièces.",
    tags: ["cm1", "multiplication", "probleme", "jeu_video", "pieces", "template"],
    generate: () => {
      const coffres = randomChoice([3, 4, 5, 6, 8]);
      const pieces = randomChoice([10, 20, 25, 50]);
      const total = coffres * pieces;

      return {
        text: `Dans un jeu vidéo, chaque coffre donne ${pieces} pièces. Combien de pièces donnent ${coffres} coffres ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication permet de calculer une récompense répétée plusieurs fois.",
          "On multiplie le nombre de coffres par le nombre de pièces par coffre.",
          `${coffres} × ${pieces} = ${total}.`,
          `Les coffres donnent ${total} pièces.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_5_choisir_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche si on regroupe, enlève, partage ou répète.",
    tags: ["cm1", "multiplication", "probleme", "choisir_operation", "template"],
    generate: () => {
      const groupes = randomChoice([4, 5, 6, 8]);
      const quantite = randomChoice([7, 8, 9, 12]);

      const correct = `${groupes} × ${quantite}`;

      return {
        text: `Quel calcul permet de résoudre : « ${groupes} sacs contiennent chacun ${quantite} objets » ?`,
        format: "qcm",
        choices: shuffle([
          correct,
          `${groupes} + ${quantite}`,
          `${quantite} - ${groupes}`,
          `${quantite} ÷ ${groupes}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Choisir l’opération consiste à comprendre le sens du problème.",
          "Le mot « chacun » indique que la même quantité est répétée plusieurs fois.",
          `Il faut donc calculer ${groupes} × ${quantite}.`,
          `Le bon calcul est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_6_canvas_posee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "reunion",
    hint: "Tu peux poser la multiplication si le calcul est trop grand.",
    tags: ["cm1", "multiplication", "probleme", "reunion", "canvas", "template"],
    generate: () => {
      const sacs = randomChoice([12, 15, 18, 24]);
      const fruits = randomChoice([4, 6, 8, 9]);
      const total = sacs * fruits;

      return {
        text: `Au marché, ${sacs} sacs contiennent chacun ${fruits} fruits. Combien y a-t-il de fruits au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème avec des groupes égaux peut se résoudre par multiplication.",
          "On multiplie le nombre de sacs par le nombre de fruits par sac.",
          `${sacs} × ${fruits} = ${total}.`,
          `Il y a ${total} fruits au total.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Problème — multiplication",
          numbers: [String(sacs), String(fruits)],
          result: String(total),
          questionLabel: "On peut poser la multiplication.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },
    // ============================================================
  // MULTIPLICATION_DEFI
  // Résoudre un défi de multiplication
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_1_tresor",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi trésor : un coffre contient 25 pièces. Il y a 8 coffres. Combien de pièces y a-t-il au total ?",
    format: "short",
    expected: ["200"],
    comparator: "number_equal",
    hint: "Calcule 25 × 8. Tu peux faire 25 × 4 puis doubler.",
    explanation: exp(
      "Un défi de multiplication peut demander une stratégie rapide.",
      "On repère des groupes égaux : 8 coffres de 25 pièces.",
      "25 × 8 = 200.",
      "Il y a 200 pièces au total."
    ),
    tags: ["cm1", "multiplication", "defi", "tresor", "pieces"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_2_margouillats",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi margouillats : on observe 6 murs. Sur chaque mur, il y a 7 margouillats. Combien observe-t-on de margouillats en tout ?",
    format: "short",
    expected: ["42"],
    comparator: "number_equal",
    hint: "Même nombre de margouillats sur chaque mur : on multiplie.",
    explanation: exp(
      "La multiplication permet de calculer des groupes égaux.",
      "On multiplie le nombre de murs par le nombre de margouillats sur chaque mur.",
      "6 × 7 = 42.",
      "On observe 42 margouillats en tout."
    ),
    tags: ["cm1", "multiplication", "defi", "reunion", "margouillat"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_3_erreur_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève lit : « 9 équipes ont chacune 12 bouteilles d’eau ». Il calcule 9 + 12 = 21. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le mot « chacune » indique des groupes égaux.",
    explanation: exp(
      "Dans un problème, il faut choisir l’opération adaptée.",
      "Le mot « chacune » indique que la même quantité est répétée plusieurs fois.",
      "Il faut calculer 9 × 12 = 108, et non 9 + 12.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: [
      "cm1",
      "multiplication",
      "defi",
      "erreur",
      "choisir_operation",
      "eau",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_4_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Au marché, une famille achète 4 paniers de 12 mangues et 3 paniers de 8 letchis. Combien de fruits achète-t-elle en tout ?",
    format: "short",
    expected: ["72"],
    comparator: "number_equal",
    hint: "Calcule d’abord les mangues, puis les letchis, puis additionne.",
    explanation: exp(
      "Un problème à deux étapes demande plusieurs calculs.",
      "On calcule chaque groupe, puis on additionne les résultats.",
      "4 × 12 = 48 et 3 × 8 = 24. Puis 48 + 24 = 72.",
      "La famille achète 72 fruits en tout."
    ),
    tags: ["cm1", "multiplication", "defi", "reunion", "deux_etapes", "marche"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_5_canvas_posee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Défi calcul posé : calcule 348 × 6.",
    format: "short",
    expected: ["2088", "2 088"],
    comparator: "number_equal",
    hint: "Pose la multiplication et pense aux retenues.",
    explanation: exp(
      "Une multiplication posée aide à organiser un calcul difficile.",
      "On multiplie colonne par colonne en pensant aux retenues.",
      "348 × 6 = 2 088.",
      "Le résultat est 2 088."
    ),
    tags: ["cm1", "multiplication", "defi", "posee", "retenue", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Défi calcul posé",
      numbers: ["348", "6"],
      result: "2088",
      questionLabel: "Pense aux retenues.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_6_estimation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Avant de calculer 198 × 4, quel ordre de grandeur est le plus raisonnable ?",
    format: "qcm",
    choices: ["environ 800", "environ 80", "environ 8 000", "environ 200"],
    expected: ["environ 800"],
    comparator: "mcq_exact",
    hint: "198 est proche de 200.",
    explanation: exp(
      "Estimer un résultat permet de vérifier s’il est raisonnable.",
      "On remplace 198 par un nombre proche plus simple : 200.",
      "200 × 4 = 800.",
      "Un ordre de grandeur raisonnable est environ 800."
    ),
    tags: ["cm1", "multiplication", "defi", "estimation", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_7_ecologie_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Défi écologie : 7 classes ramassent chacune 18 déchets. Ensuite, 20 déchets sont retirés car ils ont déjà été comptés. Combien de déchets reste-t-il dans le total ?",
    format: "short",
    expected: ["106"],
    comparator: "number_equal",
    hint: "Calcule d’abord 7 × 18, puis enlève 20.",
    explanation: exp(
      "Un défi peut combiner multiplication et soustraction.",
      "On calcule d’abord le total des groupes égaux, puis on ajuste.",
      "7 × 18 = 126. Puis 126 - 20 = 106.",
      "Il reste 106 déchets dans le total."
    ),
    tags: [
      "cm1",
      "multiplication",
      "defi",
      "reunion",
      "ecologie",
      "deux_etapes",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_8_canvas_probleme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi marché : 16 sacs contiennent chacun 7 fruits. Combien y a-t-il de fruits en tout ?",
    format: "short",
    expected: ["112"],
    comparator: "number_equal",
    hint: "Tu peux poser 16 × 7.",
    explanation: exp(
      "Un défi de multiplication peut se résoudre avec un calcul posé.",
      "On identifie les groupes égaux : 16 sacs de 7 fruits.",
      "16 × 7 = 112.",
      "Il y a 112 fruits en tout."
    ),
    tags: ["cm1", "multiplication", "defi", "reunion", "canvas", "marche"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Défi marché",
      numbers: ["16", "7"],
      result: "112",
      questionLabel: "On peut poser la multiplication.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_1_tresor",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Même nombre de pièces dans chaque coffre : on multiplie.",
    tags: ["cm1", "multiplication", "defi", "tresor", "pieces", "template"],
    generate: () => {
      const coffres = randomChoice([3, 4, 5, 6, 8]);
      const pieces = randomChoice([20, 25, 50]);
      const total = coffres * pieces;

      return {
        text: `Défi trésor : ${coffres} coffres contiennent chacun ${pieces} pièces. Combien y a-t-il de pièces au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La multiplication permet de calculer des groupes égaux.",
          "On multiplie le nombre de coffres par le nombre de pièces dans chaque coffre.",
          `${coffres} × ${pieces} = ${total}.`,
          `Il y a ${total} pièces au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_2_margouillats",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Même nombre de margouillats dans chaque zone.",
    tags: ["cm1", "multiplication", "defi", "margouillat", "reunion", "template"],
    generate: () => {
      const murs = randomChoice([4, 5, 6, 7, 8]);
      const margouillats = randomChoice([3, 4, 5, 6, 7]);
      const total = murs * margouillats;

      return {
        text: `Défi margouillats : on observe ${murs} murs avec ${margouillats} margouillats sur chaque mur. Combien observe-t-on de margouillats en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication peut modéliser une observation répétée.",
          "On multiplie le nombre de murs par le nombre de margouillats par mur.",
          `${murs} × ${margouillats} = ${total}.`,
          `On observe ${total} margouillats en tout.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_3_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Il y a deux multiplications puis une addition.",
    tags: ["cm1", "multiplication", "defi", "reunion", "deux_etapes", "template"],
    generate: () => {
      const paniers1 = randomChoice([3, 4, 5]);
      const fruits1 = randomChoice([8, 10, 12]);
      const paniers2 = randomChoice([2, 3, 4]);
      const fruits2 = randomChoice([6, 8, 9]);

      const total1 = paniers1 * fruits1;
      const total2 = paniers2 * fruits2;
      const total = total1 + total2;

      return {
        text: `Au marché, on achète ${paniers1} paniers de ${fruits1} fruits et ${paniers2} paniers de ${fruits2} fruits. Combien de fruits y a-t-il en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes demande de traiter chaque partie.",
          "On calcule chaque groupe de paniers, puis on additionne.",
          `${paniers1} × ${fruits1} = ${total1}, puis ${paniers2} × ${fruits2} = ${total2}. Enfin ${total1} + ${total2} = ${total}.`,
          `Il y a ${total} fruits en tout.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_4_canvas_posee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Pose la multiplication et vérifie les retenues.",
    tags: ["cm1", "multiplication", "defi", "posee", "canvas", "template"],
    generate: () => {
      const a = randomChoice([246, 357, 468, 579]);
      const b = randomChoice([4, 5, 6, 7]);
      const result = a * b;

      return {
        text: `Défi calcul posé : calcule ${a} × ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication posée permet de traiter un calcul complexe.",
          "On multiplie colonne par colonne et on pense aux retenues.",
          `${a} × ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Défi calcul posé",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Attention aux retenues.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_5_erreur_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Le mot « chacun » indique souvent une multiplication.",
    tags: [
      "cm1",
      "multiplication",
      "defi",
      "erreur",
      "choisir_operation",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([5, 6, 7, 8, 9]);
      const quantite = randomChoice([8, 9, 12, 15]);
      const addition = groupes + quantite;
      const product = groupes * quantite;

      return {
        text: `Un élève lit : « ${groupes} groupes ont chacun ${quantite} objets ». Il calcule ${groupes} + ${quantite} = ${addition}. A-t-il choisi la bonne opération ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Choisir la bonne opération est essentiel.",
          "Le mot « chacun » indique des groupes égaux, donc une multiplication.",
          `Il fallait calculer ${groupes} × ${quantite} = ${product}, et non ${groupes} + ${quantite}.`,
          "L’élève n’a pas choisi la bonne opération."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_6_ecologie_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Calcule d’abord le total, puis enlève ce qui a déjà été compté.",
    tags: [
      "cm1",
      "multiplication",
      "defi",
      "ecologie",
      "reunion",
      "deux_etapes",
      "template",
    ],
    generate: () => {
      const classes = randomChoice([4, 5, 6, 7]);
      const dechets = randomChoice([12, 15, 18, 20]);
      const dejaComptes = randomChoice([10, 15, 20, 25]);

      const totalBrut = classes * dechets;
      const total = totalBrut - dejaComptes;

      return {
        text: `Défi écologie : ${classes} classes ramassent chacune ${dechets} déchets. On retire ${dejaComptes} déchets déjà comptés. Quel est le total corrigé ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un défi peut combiner plusieurs opérations.",
          "On calcule d’abord le total par multiplication, puis on corrige avec une soustraction.",
          `${classes} × ${dechets} = ${totalBrut}, puis ${totalBrut} - ${dejaComptes} = ${total}.`,
          `Le total corrigé est ${total} déchets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_7_estimation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Arrondis le premier nombre pour obtenir un ordre de grandeur.",
    tags: ["cm1", "multiplication", "defi", "estimation", "template"],
    generate: () => {
      const a = randomChoice([198, 203, 297, 402, 498]);
      const b = randomChoice([3, 4, 5, 6]);

      const rounded = Math.round(a / 100) * 100;
      const approx = rounded * b;

      return {
        text: `Avant de calculer exactement ${a} × ${b}, quel ordre de grandeur est raisonnable ?`,
        format: "qcm",
        choices: shuffle([
          `environ ${approx}`,
          `environ ${approx + 1000}`,
          "environ 20",
          `environ ${Math.max(0, approx - 1000)}`,
        ]),
        expected: [`environ ${approx}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une estimation permet de vérifier si un résultat est raisonnable.",
          "On arrondit le nombre le plus compliqué.",
          `${a} est proche de ${rounded}, donc ${a} × ${b} est proche de ${rounded} × ${b} = ${approx}.`,
          `Un ordre de grandeur raisonnable est environ ${approx}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_open_1_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la multiplication est utile dans la vie quotidienne.",
    format: "open",
    expected: ["groupes", "répéter", "calculer", "fois", "total"],
    comparator: "contains_keyword",
    hint: "Pense aux groupes égaux : paquets, prix, équipes, objets.",
    explanation: exp(
      "La multiplication sert à calculer plus vite des quantités répétées.",
      "On l’utilise quand on a plusieurs groupes identiques ou une même quantité plusieurs fois.",
      "Par exemple, 6 paquets de 8 objets se calculent avec 6 × 8.",
      "La multiplication est utile pour trouver rapidement un total."
    ),
    tags: ["cm1", "multiplication", "defi", "open", "sens"],
  },
];
