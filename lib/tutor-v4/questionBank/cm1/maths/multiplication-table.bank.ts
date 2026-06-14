// lib/tutor-v4/question-banks/maths/cm1/tables-multiplication.bank.ts

import type {
  TutorBankItemV4,
  TableauDonneesCanvasData,
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

function tableCanvas(data: {
  table: number;
  multiplicateur?: number;
  title?: string;
  questionLabel?: string;
}): TableauDonneesCanvasData {
  const rows = Array.from({ length: 10 }, (_, index) => {
    const k = index + 1;
    return {
      label: `${data.table} × ${k}`,
      values: [
        k === data.multiplicateur ? "?" : data.table * k,
      ],
    };
  });

  return {
    kind: "tableau_donnees",
    title: data.title ?? `Table de ${data.table}`,
    headers: ["Calcul", "Résultat"],
    rows,
    highlight:
      data.multiplicateur !== undefined
        ? { row: data.multiplicateur - 1, col: 1 }
        : undefined,
    questionLabel:
      data.questionLabel ??
      "Observe la table et retrouve le résultat manquant.",
    display: {
      compact: true,
      striped: true,
    },
  };
}

function miniTableCanvas(data: {
  table: number;
  multiplicateurs: number[];
  missing: number;
  title?: string;
  questionLabel?: string;
}): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    title: data.title ?? `Mini-table de ${data.table}`,
    headers: ["Calcul", "Résultat"],
    rows: data.multiplicateurs.map((k) => ({
      label: `${data.table} × ${k}`,
      values: [k === data.missing ? "?" : data.table * k],
    })),
    highlight: {
      row: data.multiplicateurs.indexOf(data.missing),
      col: 1,
    },
    questionLabel:
      data.questionLabel ??
      "Complète la case manquante sans afficher directement la réponse.",
    display: {
      compact: true,
      striped: true,
    },
  };
}

export const MultiplicationTablesBank: TutorBankItemV4[] = [
  // ============================================================
  // TABLE_2
  // Connaître la table de 2
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_1_double_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 2 × 6",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "La table de 2 correspond aux doubles.",
    explanation: exp(
      "La table de 2 permet de calculer les doubles.",
      "On cherche le double de 6.",
      "2 × 6 = 12.",
      "La réponse est 12."
    ),
    canvas: miniTableCanvas({
      table: 2,
      multiplicateurs: [4, 5, 6, 7, 8],
      missing: 6,
      title: "Table de 2",
      questionLabel: "Le résultat de 2 × 6 est caché.",
    }),
    tags: ["cm1", "tables", "table_2", "double", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_2_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 2 × ? = 14",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche quel nombre a pour double 14.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche le nombre qui, multiplié par 2, donne 14.",
      "2 × 7 = 14.",
      "Le nombre manquant est 7."
    ),
    canvas: miniTableCanvas({
      table: 2,
      multiplicateurs: [5, 6, 7, 8, 9],
      missing: 7,
      title: "Table de 2 à trou",
      questionLabel: "Quelle ligne donne 14 ?",
    }),
    tags: ["cm1", "tables", "table_2", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_3_qcm_pair",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    text: "Quel résultat appartient à la table de 2 ?",
    format: "qcm",
    choices: ["16", "17", "19", "21"],
    expected: ["16"],
    comparator: "mcq_exact",
    hint: "Les résultats de la table de 2 sont des nombres pairs.",
    explanation: exp(
      "Les résultats de la table de 2 sont les doubles.",
      "On repère le nombre qui peut s’écrire 2 × un entier.",
      "16 = 2 × 8.",
      "16 appartient à la table de 2."
    ),
    tags: ["cm1", "tables", "table_2", "pair", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_4_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme que 2 × 9 = 16. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule le double de 9.",
    explanation: exp(
      "Une table de multiplication doit être vérifiée précisément.",
      "On calcule 2 × 9.",
      "2 × 9 = 18, et non 16.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_2", "erreur", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_table_2_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplier par 2, c’est doubler.",
    tags: ["cm1", "tables", "table_2", "template", "double", "canvas"],
    generate: () => {
      const k = randomInt(2, 10);
      const result = 2 * k;

      return {
        text: `Calcule : 2 × ${k}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 2 correspond aux doubles.",
          `On cherche le double de ${k}.`,
          `2 × ${k} = ${result}.`,
          `La réponse est ${result}.`
        ),
        canvas: miniTableCanvas({
          table: 2,
          multiplicateurs: [Math.max(1, k - 2), Math.max(1, k - 1), k, Math.min(10, k + 1), Math.min(10, k + 2)]
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .sort((a, b) => a - b),
          missing: k,
          title: "Table de 2",
          questionLabel: `Le résultat de 2 × ${k} est caché.`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_2_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le nombre dont le double donne le résultat.",
    tags: ["cm1", "tables", "table_2", "facteur_manquant", "template"],
    generate: () => {
      const missing = randomInt(2, 10);
      const result = 2 * missing;

      return {
        text: `Complète : 2 × ? = ${result}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication à trou demande de retrouver un facteur.",
          "On cherche le nombre qui donne le résultat quand on le multiplie par 2.",
          `2 × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_2_tpl_3_reunion_margouillats",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque mur a le même nombre de margouillats.",
    tags: ["cm1", "tables", "table_2", "reunion", "margouillat", "template"],
    generate: () => {
      const murs = randomInt(3, 10);
      const total = 2 * murs;

      return {
        text: `Sur chaque mur, on voit 2 margouillats. Il y a ${murs} murs. Combien voit-on de margouillats en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 2 sert à compter des groupes de 2.",
          "On multiplie le nombre de murs par 2 margouillats.",
          `${murs} × 2 = ${total}.`,
          `On voit ${total} margouillats en tout.`
        ),
      };
    },
  },

  // ============================================================
  // TABLE_3
  // Connaître la table de 3
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_3_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 3 × 4",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Compte 3 + 3 + 3 + 3.",
    explanation: exp(
      "La table de 3 permet de compter de 3 en 3.",
      "On cherche 4 groupes de 3.",
      "3 × 4 = 12.",
      "La réponse est 12."
    ),
    canvas: miniTableCanvas({
      table: 3,
      multiplicateurs: [2, 3, 4, 5, 6],
      missing: 4,
      title: "Table de 3",
      questionLabel: "Le résultat de 3 × 4 est caché.",
    }),
    tags: ["cm1", "tables", "table_3", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_3_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 3 × 8",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Tu peux compter de 3 en 3 jusqu’à 8 fois.",
    explanation: exp(
      "La table de 3 donne les résultats des multiplications par 3.",
      "On cherche 8 groupes de 3.",
      "3 × 8 = 24.",
      "La réponse est 24."
    ),
    tags: ["cm1", "tables", "table_3", "produit"],
  },

  {
    kind: "fixed",
    id: "cm1_table_3_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 3 × ? = 27",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 3.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 3 donne 27.",
      "3 × 9 = 27.",
      "Le nombre manquant est 9."
    ),
    canvas: miniTableCanvas({
      table: 3,
      multiplicateurs: [6, 7, 8, 9, 10],
      missing: 9,
      title: "Table de 3 à trou",
      questionLabel: "Quelle ligne donne 27 ?",
    }),
    tags: ["cm1", "tables", "table_3", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_3_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne 21 ?",
    format: "qcm",
    choices: ["3 × 7", "3 × 6", "3 × 8", "2 × 9"],
    expected: ["3 × 7"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 3.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On cherche le calcul qui donne 21.",
      "3 × 7 = 21.",
      "Le bon calcul est 3 × 7."
    ),
    tags: ["cm1", "tables", "table_3", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_3_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme que 3 × 6 = 20. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compte 3, 6, 9, 12, 15, 18.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 3 × 6.",
      "3 × 6 = 18, et non 20.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_3", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_3_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 3,
    theme: "neutral",
    text: "Si 3 × 8 = 24, alors combien vaut 24 ÷ 3 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à comprendre la division.",
      "Si 3 × 8 = 24, alors 24 partagé en groupes de 3 donne 8 groupes.",
      "24 ÷ 3 = 8.",
      "La réponse est 8."
    ),
    tags: ["cm1", "tables", "table_3", "division", "lien"],
  },

  {
    kind: "template",
    id: "cm1_table_3_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 1,
    theme: "neutral",
    hint: "Utilise la table de 3.",
    tags: ["cm1", "tables", "table_3", "template", "canvas"],
    generate: () => {
      const k = randomInt(2, 10);
      const result = 3 * k;

      return {
        text: `Calcule : 3 × ${k}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 3 permet de compter de 3 en 3.",
          `On cherche ${k} groupes de 3.`,
          `3 × ${k} = ${result}.`,
          `La réponse est ${result}.`
        ),
        canvas: miniTableCanvas({
          table: 3,
          multiplicateurs: [Math.max(1, k - 2), Math.max(1, k - 1), k, Math.min(10, k + 1), Math.min(10, k + 2)]
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .sort((a, b) => a - b),
          missing: k,
          title: "Table de 3",
          questionLabel: `Le résultat de 3 × ${k} est caché.`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_3_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table de 3.",
    tags: ["cm1", "tables", "table_3", "facteur_manquant", "template"],
    generate: () => {
      const missing = randomInt(2, 10);
      const result = 3 * missing;

      return {
        text: `Complète : 3 × ? = ${result}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication à trou demande de retrouver un facteur.",
          "On cherche le nombre qui donne le résultat quand on le multiplie par 3.",
          `3 × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_3_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_3", "qcm", "template"],
    generate: () => {
      const k = randomInt(3, 10);
      const correct = String(3 * k);

      return {
        text: `Quel est le résultat de 3 × ${k} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(3 * k + 3),
          String(3 * k - 3),
          String(2 * k),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise la table de 3.",
          `On cherche ${k} groupes de 3.`,
          `3 × ${k} = ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_3_tpl_4_reunion_vanille",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque sachet contient 3 gousses.",
    tags: ["cm1", "tables", "table_3", "reunion", "vanille", "template"],
    generate: () => {
      const sachets = randomInt(3, 10);
      const total = 3 * sachets;

      return {
        text: `Un artisan prépare ${sachets} sachets avec 3 gousses de vanille dans chaque sachet. Combien y a-t-il de gousses en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 3 sert à compter des groupes de 3.",
          "On multiplie le nombre de sachets par 3.",
          `${sachets} × 3 = ${total}.`,
          `Il y a ${total} gousses en tout.`
       ),
      };
    },
  },

    // ============================================================
  // TABLE_4
  // Connaître la table de 4
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_4_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 4 × 6",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Tu peux faire le double du double : 6 doublé donne 12, puis 12 doublé donne 24.",
    explanation: exp(
      "La table de 4 peut se comprendre comme le double du double.",
      "On cherche 4 groupes de 6, ou le double du double de 6.",
      "6 × 2 = 12, puis 12 × 2 = 24. Donc 4 × 6 = 24.",
      "La réponse est 24."
    ),
    canvas: miniTableCanvas({
      table: 4,
      multiplicateurs: [4, 5, 6, 7, 8],
      missing: 6,
      title: "Table de 4",
      questionLabel: "Le résultat de 4 × 6 est caché.",
    }),
    tags: ["cm1", "tables", "table_4", "produit", "double_double", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_4_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 4 × 8",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "Compte de 4 en 4 ou utilise le double du double.",
    explanation: exp(
      "La table de 4 donne les résultats des multiplications par 4.",
      "On cherche 8 groupes de 4.",
      "4 × 8 = 32.",
      "La réponse est 32."
    ),
    tags: ["cm1", "tables", "table_4", "produit"],
  },

  {
    kind: "fixed",
    id: "cm1_table_4_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 4 × ? = 28",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 4.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 4 donne 28.",
      "4 × 7 = 28.",
      "Le nombre manquant est 7."
    ),
    canvas: miniTableCanvas({
      table: 4,
      multiplicateurs: [5, 6, 7, 8, 9],
      missing: 7,
      title: "Table de 4 à trou",
      questionLabel: "Quelle ligne donne 28 ?",
    }),
    tags: ["cm1", "tables", "table_4", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_4_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne 36 ?",
    format: "qcm",
    choices: ["4 × 9", "4 × 8", "4 × 7", "3 × 9"],
    expected: ["4 × 9"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 4.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On cherche le calcul qui donne 36.",
      "4 × 9 = 36.",
      "Le bon calcul est 4 × 9."
    ),
    tags: ["cm1", "tables", "table_4", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_4_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme que 4 × 7 = 30. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie la table de 4.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 4 × 7.",
      "4 × 7 = 28, et non 30.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_4", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_4_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 3,
    theme: "neutral",
    text: "Si 4 × 8 = 32, alors combien vaut 32 ÷ 4 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à retrouver des divisions.",
      "Si 4 × 8 = 32, alors 32 partagé en groupes de 4 donne 8 groupes.",
      "32 ÷ 4 = 8.",
      "La réponse est 8."
    ),
    tags: ["cm1", "tables", "table_4", "division", "lien"],
  },

  {
    kind: "template",
    id: "cm1_table_4_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 1,
    theme: "neutral",
    hint: "Utilise la table de 4 ou le double du double.",
    tags: ["cm1", "tables", "table_4", "template", "canvas"],
    generate: () => {
      const k = randomInt(2, 10);
      const result = 4 * k;

      return {
        text: `Calcule : 4 × ${k}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 4 permet de compter de 4 en 4.",
          `On cherche ${k} groupes de 4.`,
          `4 × ${k} = ${result}.`,
          `La réponse est ${result}.`
        ),
        canvas: miniTableCanvas({
          table: 4,
          multiplicateurs: [
            Math.max(1, k - 2),
            Math.max(1, k - 1),
            k,
            Math.min(10, k + 1),
            Math.min(10, k + 2),
          ]
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .sort((a, b) => a - b),
          missing: k,
          title: "Table de 4",
          questionLabel: `Le résultat de 4 × ${k} est caché.`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_4_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table de 4.",
    tags: ["cm1", "tables", "table_4", "facteur_manquant", "template"],
    generate: () => {
      const missing = randomInt(2, 10);
      const result = 4 * missing;

      return {
        text: `Complète : 4 × ? = ${result}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication à trou demande de retrouver un facteur.",
          "On cherche le nombre qui donne le résultat quand on le multiplie par 4.",
          `4 × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_4_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_4", "qcm", "template"],
    generate: () => {
      const k = randomInt(3, 10);
      const correct = String(4 * k);

      return {
        text: `Quel est le résultat de 4 × ${k} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(4 * k + 4),
          String(4 * k - 4),
          String(2 * k),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise la table de 4.",
          `On cherche ${k} groupes de 4.`,
          `4 × ${k} = ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_4_tpl_4_reunion_balises",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque zone contient 4 balises.",
    tags: ["cm1", "tables", "table_4", "reunion", "sentier", "template"],
    generate: () => {
      const zones = randomInt(3, 10);
      const total = 4 * zones;

      return {
        text: `Sur un sentier, il y a ${zones} zones avec 4 balises dans chaque zone. Combien y a-t-il de balises en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 4 sert à compter des groupes de 4.",
          "On multiplie le nombre de zones par 4.",
          `${zones} × 4 = ${total}.`,
          `Il y a ${total} balises en tout.`
        ),
      };
    },
  },

  // ============================================================
  // TABLE_5
  // Connaître la table de 5
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 5 × 6",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "La table de 5 finit souvent par 0 ou par 5.",
    explanation: exp(
      "La table de 5 permet de compter de 5 en 5.",
      "On cherche 6 groupes de 5.",
      "5 × 6 = 30.",
      "La réponse est 30."
    ),
    canvas: miniTableCanvas({
      table: 5,
      multiplicateurs: [4, 5, 6, 7, 8],
      missing: 6,
      title: "Table de 5",
      questionLabel: "Le résultat de 5 × 6 est caché.",
    }),
    tags: ["cm1", "tables", "table_5", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 5 × 9",
    format: "short",
    expected: ["45"],
    comparator: "number_equal",
    hint: "Compte de 5 en 5.",
    explanation: exp(
      "La table de 5 donne les multiples de 5.",
      "On cherche 9 groupes de 5.",
      "5 × 9 = 45.",
      "La réponse est 45."
    ),
    tags: ["cm1", "tables", "table_5", "produit"],
  },

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 5 × ? = 40",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 5.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 5 donne 40.",
      "5 × 8 = 40.",
      "Le nombre manquant est 8."
    ),
    canvas: miniTableCanvas({
      table: 5,
      multiplicateurs: [6, 7, 8, 9, 10],
      missing: 8,
      title: "Table de 5 à trou",
      questionLabel: "Quelle ligne donne 40 ?",
    }),
    tags: ["cm1", "tables", "table_5", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 2,
    theme: "neutral",
    text: "Quel résultat appartient à la table de 5 ?",
    format: "qcm",
    choices: ["35", "36", "38", "41"],
    expected: ["35"],
    comparator: "mcq_exact",
    hint: "Les résultats de la table de 5 finissent souvent par 0 ou 5.",
    explanation: exp(
      "Les résultats de la table de 5 sont les multiples de 5.",
      "On cherche un nombre qui peut s’écrire 5 × un entier.",
      "35 = 5 × 7.",
      "35 appartient à la table de 5."
    ),
    tags: ["cm1", "tables", "table_5", "multiple", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme que 5 × 8 = 45. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie la table de 5.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 5 × 8.",
      "5 × 8 = 40, et non 45.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_5", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 3,
    theme: "neutral",
    text: "Si 5 × 7 = 35, alors combien vaut 35 ÷ 5 ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à comprendre la division.",
      "Si 5 × 7 = 35, alors 35 partagé en groupes de 5 donne 7 groupes.",
      "35 ÷ 5 = 7.",
      "La réponse est 7."
    ),
    tags: ["cm1", "tables", "table_5", "division", "lien"],
  },

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_7_strategie_par_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle stratégie peut aider à calculer 5 × 18 ?",
    format: "qcm",
    choices: [
      "calculer 10 × 18 puis prendre la moitié",
      "calculer 18 + 5",
      "calculer 18 - 5",
      "calculer 18 ÷ 5",
    ],
    expected: ["calculer 10 × 18 puis prendre la moitié"],
    comparator: "mcq_exact",
    hint: "5 est la moitié de 10.",
    explanation: exp(
      "Multiplier par 5 peut se faire avec une stratégie.",
      "On peut multiplier par 10 puis prendre la moitié.",
      "10 × 18 = 180, et la moitié de 180 est 90.",
      "La stratégie correcte est de calculer 10 × 18 puis prendre la moitié."
    ),
    tags: ["cm1", "tables", "table_5", "strategie", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_table_5_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 1,
    theme: "neutral",
    hint: "Utilise la table de 5.",
    tags: ["cm1", "tables", "table_5", "template", "canvas"],
    generate: () => {
      const k = randomInt(2, 10);
      const result = 5 * k;

      return {
        text: `Calcule : 5 × ${k}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 5 permet de compter de 5 en 5.",
          `On cherche ${k} groupes de 5.`,
          `5 × ${k} = ${result}.`,
          `La réponse est ${result}.`
        ),
        canvas: miniTableCanvas({
          table: 5,
          multiplicateurs: [
            Math.max(1, k - 2),
            Math.max(1, k - 1),
            k,
            Math.min(10, k + 1),
            Math.min(10, k + 2),
          ]
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .sort((a, b) => a - b),
          missing: k,
          title: "Table de 5",
          questionLabel: `Le résultat de 5 × ${k} est caché.`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_5_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table de 5.",
    tags: ["cm1", "tables", "table_5", "facteur_manquant", "template"],
    generate: () => {
      const missing = randomInt(2, 10);
      const result = 5 * missing;

      return {
        text: `Complète : 5 × ? = ${result}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication à trou demande de retrouver un facteur.",
          "On cherche le nombre qui donne le résultat quand on le multiplie par 5.",
          `5 × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_5_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_5", "qcm", "template"],
    generate: () => {
      const k = randomInt(3, 10);
      const correct = String(5 * k);

      return {
        text: `Quel est le résultat de 5 × ${k} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(5 * k + 5),
          String(5 * k - 5),
          String(10 * k),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise la table de 5.",
          `On cherche ${k} groupes de 5.`,
          `5 × ${k} = ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_5_tpl_4_reunion_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque sachet contient 5 fruits.",
    tags: ["cm1", "tables", "table_5", "reunion", "marche", "template"],
    generate: () => {
      const sachets = randomInt(3, 10);
      const total = 5 * sachets;

      return {
        text: `Au marché de Saint-Pierre, on prépare ${sachets} sachets avec 5 fruits dans chaque sachet. Combien y a-t-il de fruits en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 5 sert à compter des groupes de 5.",
          "On multiplie le nombre de sachets par 5.",
          `${sachets} × 5 = ${total}.`,
          `Il y a ${total} fruits en tout.`
        ),
      };
    },
  },
    // ============================================================
  // TABLE_6
  // Connaître la table de 6
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 6 × 4",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Tu peux utiliser 4 × 6 si tu connais mieux ce calcul.",
    explanation: exp(
      "La table de 6 permet de compter de 6 en 6.",
      "On cherche 4 groupes de 6.",
      "6 × 4 = 24.",
      "La réponse est 24."
    ),
    canvas: miniTableCanvas({
      table: 6,
      multiplicateurs: [2, 3, 4, 5, 6],
      missing: 4,
      title: "Table de 6",
      questionLabel: "Le résultat de 6 × 4 est caché.",
    }),
    tags: ["cm1", "tables", "table_6", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 6 × 8",
    format: "short",
    expected: ["48"],
    comparator: "number_equal",
    hint: "6 × 8, c’est aussi 8 × 6.",
    explanation: exp(
      "Dans une multiplication, on peut changer l’ordre des facteurs.",
      "On utilise la table de 6 ou la table de 8.",
      "6 × 8 = 48.",
      "La réponse est 48."
    ),
    tags: ["cm1", "tables", "table_6", "commutativite"],
  },

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 6 × ? = 42",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 6.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 6 donne 42.",
      "6 × 7 = 42.",
      "Le nombre manquant est 7."
    ),
    canvas: miniTableCanvas({
      table: 6,
      multiplicateurs: [5, 6, 7, 8, 9],
      missing: 7,
      title: "Table de 6 à trou",
      questionLabel: "Quelle ligne donne 42 ?",
    }),
    tags: ["cm1", "tables", "table_6", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne 54 ?",
    format: "qcm",
    choices: ["6 × 9", "6 × 8", "6 × 7", "5 × 9"],
    expected: ["6 × 9"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 6.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On cherche le calcul qui donne 54.",
      "6 × 9 = 54.",
      "Le bon calcul est 6 × 9."
    ),
    tags: ["cm1", "tables", "table_6", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 6 × 7 = 44. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie la table de 6.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 6 × 7.",
      "6 × 7 = 42, et non 44.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_6", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 3,
    theme: "neutral",
    text: "Si 6 × 8 = 48, alors combien vaut 48 ÷ 6 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à retrouver des divisions.",
      "Si 6 × 8 = 48, alors 48 partagé en groupes de 6 donne 8 groupes.",
      "48 ÷ 6 = 8.",
      "La réponse est 8."
    ),
    tags: ["cm1", "tables", "table_6", "division", "lien"],
  },

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_7_strategie_5_plus_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle stratégie peut aider à calculer 6 × 7 ?",
    format: "qcm",
    choices: [
      "faire 5 × 7 puis ajouter 1 × 7",
      "faire 6 + 7",
      "faire 7 - 6",
      "faire 6 × 10 puis ajouter 7",
    ],
    expected: ["faire 5 × 7 puis ajouter 1 × 7"],
    comparator: "mcq_exact",
    hint: "6 groupes, c’est 5 groupes plus 1 groupe.",
    explanation: exp(
      "Une stratégie peut utiliser une table déjà bien connue.",
      "On peut décomposer 6 en 5 + 1.",
      "6 × 7 = 5 × 7 + 1 × 7 = 35 + 7 = 42.",
      "La stratégie correcte est de faire 5 × 7 puis ajouter 1 × 7."
    ),
    tags: ["cm1", "tables", "table_6", "strategie", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_table_6_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise la table de 6.",
    tags: ["cm1", "tables", "table_6", "template", "canvas"],
    generate: () => {
      const k = randomInt(2, 10);
      const result = 6 * k;

      return {
        text: `Calcule : 6 × ${k}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 6 permet de compter de 6 en 6.",
          `On cherche ${k} groupes de 6.`,
          `6 × ${k} = ${result}.`,
          `La réponse est ${result}.`
        ),
        canvas: miniTableCanvas({
          table: 6,
          multiplicateurs: [
            Math.max(1, k - 2),
            Math.max(1, k - 1),
            k,
            Math.min(10, k + 1),
            Math.min(10, k + 2),
          ]
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .sort((a, b) => a - b),
          missing: k,
          title: "Table de 6",
          questionLabel: `Le résultat de 6 × ${k} est caché.`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_6_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table de 6.",
    tags: ["cm1", "tables", "table_6", "facteur_manquant", "template"],
    generate: () => {
      const missing = randomInt(2, 10);
      const result = 6 * missing;

      return {
        text: `Complète : 6 × ? = ${result}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication à trou demande de retrouver un facteur.",
          "On cherche le nombre qui donne le résultat quand on le multiplie par 6.",
          `6 × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_6_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_6", "qcm", "template"],
    generate: () => {
      const k = randomInt(3, 10);
      const correct = String(6 * k);

      return {
        text: `Quel est le résultat de 6 × ${k} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(6 * k + 6),
          String(6 * k - 6),
          String(5 * k),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise la table de 6.",
          `On cherche ${k} groupes de 6.`,
          `6 × ${k} = ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_6_tpl_4_reunion_paniers",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque panier contient 6 fruits.",
    tags: ["cm1", "tables", "table_6", "reunion", "marche", "template"],
    generate: () => {
      const paniers = randomInt(3, 10);
      const total = 6 * paniers;

      return {
        text: `Au marché de Saint-Pierre, on prépare ${paniers} paniers avec 6 fruits dans chaque panier. Combien y a-t-il de fruits en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 6 sert à compter des groupes de 6.",
          "On multiplie le nombre de paniers par 6.",
          `${paniers} × 6 = ${total}.`,
          `Il y a ${total} fruits en tout.`
        ),
      };
    },
  },

  // ============================================================
  // TABLE_7
  // Connaître la table de 7
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 7 × 4",
    format: "short",
    expected: ["28"],
    comparator: "number_equal",
    hint: "7 × 4, c’est aussi 4 × 7.",
    explanation: exp(
      "La table de 7 permet de compter de 7 en 7.",
      "On cherche 4 groupes de 7.",
      "7 × 4 = 28.",
      "La réponse est 28."
    ),
    canvas: miniTableCanvas({
      table: 7,
      multiplicateurs: [2, 3, 4, 5, 6],
      missing: 4,
      title: "Table de 7",
      questionLabel: "Le résultat de 7 × 4 est caché.",
    }),
    tags: ["cm1", "tables", "table_7", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 7 × 8",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "Tu peux utiliser 8 × 7 si tu le connais mieux.",
    explanation: exp(
      "Dans une multiplication, on peut changer l’ordre des facteurs.",
      "On utilise la table de 7 ou la table de 8.",
      "7 × 8 = 56.",
      "La réponse est 56."
    ),
    tags: ["cm1", "tables", "table_7", "commutativite"],
  },

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : 7 × ? = 63",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 7.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 7 donne 63.",
      "7 × 9 = 63.",
      "Le nombre manquant est 9."
    ),
    canvas: miniTableCanvas({
      table: 7,
      multiplicateurs: [6, 7, 8, 9, 10],
      missing: 9,
      title: "Table de 7 à trou",
      questionLabel: "Quelle ligne donne 63 ?",
    }),
    tags: ["cm1", "tables", "table_7", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne 49 ?",
    format: "qcm",
    choices: ["7 × 7", "7 × 6", "7 × 8", "6 × 9"],
    expected: ["7 × 7"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 7.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On cherche le calcul qui donne 49.",
      "7 × 7 = 49.",
      "Le bon calcul est 7 × 7."
    ),
    tags: ["cm1", "tables", "table_7", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 7 × 6 = 40. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie la table de 7 ou la table de 6.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 7 × 6.",
      "7 × 6 = 42, et non 40.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_7", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "neutral",
    text: "Si 7 × 8 = 56, alors combien vaut 56 ÷ 7 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à retrouver des divisions.",
      "Si 7 × 8 = 56, alors 56 partagé en groupes de 7 donne 8 groupes.",
      "56 ÷ 7 = 8.",
      "La réponse est 8."
    ),
    tags: ["cm1", "tables", "table_7", "division", "lien"],
  },

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_7_strategie_5_plus_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle stratégie peut aider à calculer 7 × 8 ?",
    format: "qcm",
    choices: [
      "faire 5 × 8 puis ajouter 2 × 8",
      "faire 7 + 8",
      "faire 8 - 7",
      "faire 7 × 10 puis ajouter 8",
    ],
    expected: ["faire 5 × 8 puis ajouter 2 × 8"],
    comparator: "mcq_exact",
    hint: "7 groupes, c’est 5 groupes plus 2 groupes.",
    explanation: exp(
      "Une stratégie peut utiliser des tables déjà bien connues.",
      "On peut décomposer 7 en 5 + 2.",
      "7 × 8 = 5 × 8 + 2 × 8 = 40 + 16 = 56.",
      "La stratégie correcte est de faire 5 × 8 puis ajouter 2 × 8."
    ),
    tags: ["cm1", "tables", "table_7", "strategie", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_table_7_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise la table de 7.",
    tags: ["cm1", "tables", "table_7", "template", "canvas"],
    generate: () => {
      const k = randomInt(2, 10);
      const result = 7 * k;

      return {
        text: `Calcule : 7 × ${k}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 7 permet de compter de 7 en 7.",
          `On cherche ${k} groupes de 7.`,
          `7 × ${k} = ${result}.`,
          `La réponse est ${result}.`
        ),
        canvas: miniTableCanvas({
          table: 7,
          multiplicateurs: [
            Math.max(1, k - 2),
            Math.max(1, k - 1),
            k,
            Math.min(10, k + 1),
            Math.min(10, k + 2),
          ]
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .sort((a, b) => a - b),
          missing: k,
          title: "Table de 7",
          questionLabel: `Le résultat de 7 × ${k} est caché.`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_7_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche dans la table de 7.",
    tags: ["cm1", "tables", "table_7", "facteur_manquant", "template"],
    generate: () => {
      const missing = randomInt(2, 10);
      const result = 7 * missing;

      return {
        text: `Complète : 7 × ? = ${result}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication à trou demande de retrouver un facteur.",
          "On cherche le nombre qui donne le résultat quand on le multiplie par 7.",
          `7 × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_7_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_7", "qcm", "template"],
    generate: () => {
      const k = randomInt(3, 10);
      const correct = String(7 * k);

      return {
        text: `Quel est le résultat de 7 × ${k} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(7 * k + 7),
          String(7 * k - 7),
          String(5 * k),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise la table de 7.",
          `On cherche ${k} groupes de 7.`,
          `7 × ${k} = ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_7_tpl_4_reunion_sortie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque équipe a 7 bouteilles.",
    tags: ["cm1", "tables", "table_7", "reunion", "sortie", "template"],
    generate: () => {
      const equipes = randomInt(3, 10);
      const total = 7 * equipes;

      return {
        text: `Pour une sortie nature, ${equipes} équipes emportent chacune 7 bouteilles d’eau. Combien y a-t-il de bouteilles en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 7 sert à compter des groupes de 7.",
          "On multiplie le nombre d’équipes par 7.",
          `${equipes} × 7 = ${total}.`,
          `Il y a ${total} bouteilles en tout.`
        ),
      };
    },
  },
    // ============================================================
  // TABLE_8
  // Connaître la table de 8
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 8 × 4",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "Tu peux utiliser 4 × 8 si tu le connais mieux.",
    explanation: exp(
      "La table de 8 permet de compter de 8 en 8.",
      "On cherche 4 groupes de 8.",
      "8 × 4 = 32.",
      "La réponse est 32."
    ),
    canvas: miniTableCanvas({
      table: 8,
      multiplicateurs: [2, 3, 4, 5, 6],
      missing: 4,
      title: "Table de 8",
      questionLabel: "Le résultat de 8 × 4 est caché.",
    }),
    tags: ["cm1", "tables", "table_8", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 8 × 7",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "8 × 7, c’est aussi 7 × 8.",
    explanation: exp(
      "Dans une multiplication, on peut changer l’ordre des facteurs.",
      "On utilise la table de 8 ou la table de 7.",
      "8 × 7 = 56.",
      "La réponse est 56."
    ),
    tags: ["cm1", "tables", "table_8", "commutativite"],
  },

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : 8 × ? = 64",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 8.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 8 donne 64.",
      "8 × 8 = 64.",
      "Le nombre manquant est 8."
    ),
    canvas: miniTableCanvas({
      table: 8,
      multiplicateurs: [6, 7, 8, 9, 10],
      missing: 8,
      title: "Table de 8 à trou",
      questionLabel: "Quelle ligne donne 64 ?",
    }),
    tags: ["cm1", "tables", "table_8", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne 72 ?",
    format: "qcm",
    choices: ["8 × 9", "8 × 8", "8 × 7", "7 × 9"],
    expected: ["8 × 9"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 8.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On cherche le calcul qui donne 72.",
      "8 × 9 = 72.",
      "Le bon calcul est 8 × 9."
    ),
    tags: ["cm1", "tables", "table_8", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 8 × 6 = 46. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie la table de 8 ou la table de 6.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 8 × 6.",
      "8 × 6 = 48, et non 46.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_8", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "neutral",
    text: "Si 8 × 7 = 56, alors combien vaut 56 ÷ 8 ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à retrouver des divisions.",
      "Si 8 × 7 = 56, alors 56 partagé en groupes de 8 donne 7 groupes.",
      "56 ÷ 8 = 7.",
      "La réponse est 7."
    ),
    tags: ["cm1", "tables", "table_8", "division", "lien"],
  },

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_7_strategie_double_double_double",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle stratégie peut aider à calculer 8 × 6 ?",
    format: "qcm",
    choices: [
      "doubler 6, puis doubler encore, puis doubler encore",
      "faire 8 + 6",
      "faire 8 - 6",
      "faire 8 × 10 puis ajouter 6",
    ],
    expected: ["doubler 6, puis doubler encore, puis doubler encore"],
    comparator: "mcq_exact",
    hint: "8 = 2 × 2 × 2.",
    explanation: exp(
      "La table de 8 peut se construire avec des doubles successifs.",
      "On double 6 trois fois.",
      "6 → 12 → 24 → 48.",
      "Donc 8 × 6 = 48."
    ),
    tags: ["cm1", "tables", "table_8", "strategie", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_table_8_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise la table de 8.",
    tags: ["cm1", "tables", "table_8", "template", "canvas"],
    generate: () => {
      const k = randomInt(2, 10);
      const result = 8 * k;

      return {
        text: `Calcule : 8 × ${k}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 8 permet de compter de 8 en 8.",
          `On cherche ${k} groupes de 8.`,
          `8 × ${k} = ${result}.`,
          `La réponse est ${result}.`
        ),
        canvas: miniTableCanvas({
          table: 8,
          multiplicateurs: [
            Math.max(1, k - 2),
            Math.max(1, k - 1),
            k,
            Math.min(10, k + 1),
            Math.min(10, k + 2),
          ]
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .sort((a, b) => a - b),
          missing: k,
          title: "Table de 8",
          questionLabel: `Le résultat de 8 × ${k} est caché.`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_8_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche dans la table de 8.",
    tags: ["cm1", "tables", "table_8", "facteur_manquant", "template"],
    generate: () => {
      const missing = randomInt(2, 10);
      const result = 8 * missing;

      return {
        text: `Complète : 8 × ? = ${result}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication à trou demande de retrouver un facteur.",
          "On cherche le nombre qui donne le résultat quand on le multiplie par 8.",
          `8 × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_8_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_8", "qcm", "template"],
    generate: () => {
      const k = randomInt(3, 10);
      const correct = String(8 * k);

      return {
        text: `Quel est le résultat de 8 × ${k} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(8 * k + 8),
          String(8 * k - 8),
          String(4 * k),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise la table de 8.",
          `On cherche ${k} groupes de 8.`,
          `8 × ${k} = ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_8_tpl_4_reunion_equipes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque équipe a 8 objets.",
    tags: ["cm1", "tables", "table_8", "reunion", "sport", "template"],
    generate: () => {
      const equipes = randomInt(3, 10);
      const total = 8 * equipes;

      return {
        text: `Pour une activité sportive, ${equipes} équipes ont chacune 8 plots. Combien y a-t-il de plots en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 8 sert à compter des groupes de 8.",
          "On multiplie le nombre d’équipes par 8.",
          `${equipes} × 8 = ${total}.`,
          `Il y a ${total} plots en tout.`
        ),
      };
    },
  },

  // ============================================================
  // TABLE_9
  // Connaître la table de 9
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 9 × 4",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Tu peux faire 10 × 4 puis enlever 4.",
    explanation: exp(
      "La table de 9 peut se calculer à partir de la table de 10.",
      "On fait 10 fois le nombre, puis on enlève une fois ce nombre.",
      "10 × 4 = 40, puis 40 - 4 = 36.",
      "Donc 9 × 4 = 36."
    ),
    canvas: miniTableCanvas({
      table: 9,
      multiplicateurs: [2, 3, 4, 5, 6],
      missing: 4,
      title: "Table de 9",
      questionLabel: "Le résultat de 9 × 4 est caché.",
    }),
    tags: ["cm1", "tables", "table_9", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 9 × 8",
    format: "short",
    expected: ["72"],
    comparator: "number_equal",
    hint: "Tu peux faire 10 × 8 puis enlever 8.",
    explanation: exp(
      "Multiplier par 9 peut se faire avec une stratégie.",
      "On multiplie par 10 puis on enlève une fois le nombre.",
      "10 × 8 = 80, puis 80 - 8 = 72.",
      "Donc 9 × 8 = 72."
    ),
    tags: ["cm1", "tables", "table_9", "strategie"],
  },

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : 9 × ? = 81",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 9.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 9 donne 81.",
      "9 × 9 = 81.",
      "Le nombre manquant est 9."
    ),
    canvas: miniTableCanvas({
      table: 9,
      multiplicateurs: [6, 7, 8, 9, 10],
      missing: 9,
      title: "Table de 9 à trou",
      questionLabel: "Quelle ligne donne 81 ?",
    }),
    tags: ["cm1", "tables", "table_9", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne 63 ?",
    format: "qcm",
    choices: ["9 × 7", "9 × 6", "9 × 8", "8 × 7"],
    expected: ["9 × 7"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 9.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On cherche le calcul qui donne 63.",
      "9 × 7 = 63.",
      "Le bon calcul est 9 × 7."
    ),
    tags: ["cm1", "tables", "table_9", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 9 × 6 = 56. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tu peux faire 10 × 6 puis enlever 6.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 9 × 6.",
      "10 × 6 = 60, puis 60 - 6 = 54.",
      "Donc 9 × 6 = 54, et non 56."
    ),
    tags: ["cm1", "tables", "table_9", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "neutral",
    text: "Si 9 × 7 = 63, alors combien vaut 63 ÷ 9 ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à retrouver des divisions.",
      "Si 9 × 7 = 63, alors 63 partagé en groupes de 9 donne 7 groupes.",
      "63 ÷ 9 = 7.",
      "La réponse est 7."
    ),
    tags: ["cm1", "tables", "table_9", "division", "lien"],
  },

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_7_strategie_10_moins_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle stratégie peut aider à calculer 9 × 8 ?",
    format: "qcm",
    choices: [
      "faire 10 × 8 puis enlever 8",
      "faire 9 + 8",
      "faire 10 × 8 puis ajouter 8",
      "faire 9 × 10 puis ajouter 8",
    ],
    expected: ["faire 10 × 8 puis enlever 8"],
    comparator: "mcq_exact",
    hint: "9 fois, c’est 10 fois moins 1 fois.",
    explanation: exp(
      "Multiplier par 9 peut se calculer à partir de la table de 10.",
      "9 fois un nombre, c’est 10 fois ce nombre moins 1 fois ce nombre.",
      "10 × 8 = 80, puis 80 - 8 = 72.",
      "La bonne stratégie est de faire 10 × 8 puis enlever 8."
    ),
    tags: ["cm1", "tables", "table_9", "strategie", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_table_9_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise la table de 9 ou la stratégie ×10 puis - le nombre.",
    tags: ["cm1", "tables", "table_9", "template", "canvas"],
    generate: () => {
      const k = randomInt(2, 10);
      const result = 9 * k;

      return {
        text: `Calcule : 9 × ${k}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 9 peut se calculer à partir de la table de 10.",
          `On fait 10 × ${k}, puis on enlève ${k}.`,
          `10 × ${k} = ${10 * k}, puis ${10 * k} - ${k} = ${result}.`,
          `La réponse est ${result}.`
        ),
        canvas: miniTableCanvas({
          table: 9,
          multiplicateurs: [
            Math.max(1, k - 2),
            Math.max(1, k - 1),
            k,
            Math.min(10, k + 1),
            Math.min(10, k + 2),
          ]
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .sort((a, b) => a - b),
          missing: k,
          title: "Table de 9",
          questionLabel: `Le résultat de 9 × ${k} est caché.`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_9_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche dans la table de 9.",
    tags: ["cm1", "tables", "table_9", "facteur_manquant", "template"],
    generate: () => {
      const missing = randomInt(2, 10);
      const result = 9 * missing;

      return {
        text: `Complète : 9 × ? = ${result}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication à trou demande de retrouver un facteur.",
          "On cherche le nombre qui donne le résultat quand on le multiplie par 9.",
          `9 × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_9_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_9", "qcm", "template"],
    generate: () => {
      const k = randomInt(3, 10);
      const correct = String(9 * k);

      return {
        text: `Quel est le résultat de 9 × ${k} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(9 * k + 9),
          String(9 * k - 9),
          String(10 * k),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise la table de 9.",
          `On cherche ${k} groupes de 9.`,
          `9 × ${k} = ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_9_tpl_4_jeu_video",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "jeux_video",
    hint: "Chaque niveau donne 9 pièces.",
    tags: ["cm1", "tables", "table_9", "jeu_video", "template"],
    generate: () => {
      const niveaux = randomInt(3, 10);
      const total = 9 * niveaux;

      return {
        text: `Dans un jeu vidéo, chaque niveau réussi donne 9 pièces. Si tu réussis ${niveaux} niveaux, combien gagnes-tu de pièces ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 9 sert à compter des groupes de 9.",
          "On multiplie le nombre de niveaux par 9.",
          `${niveaux} × 9 = ${total}.`,
          `Tu gagnes ${total} pièces.`
        ),
      };
    },
  },

  // ============================================================
  // TABLE_10
  // Connaître la table de 10
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_10_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 10 × 6",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Multiplier par 10 revient à écrire un zéro à droite pour un entier.",
    explanation: exp(
      "La table de 10 est une table très régulière.",
      "Pour multiplier un entier par 10, on écrit un zéro à droite.",
      "10 × 6 = 60.",
      "La réponse est 60."
    ),
    canvas: miniTableCanvas({
      table: 10,
      multiplicateurs: [4, 5, 6, 7, 8],
      missing: 6,
      title: "Table de 10",
      questionLabel: "Le résultat de 10 × 6 est caché.",
    }),
    tags: ["cm1", "tables", "table_10", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_10_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 10 × 9",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "Ajoute un zéro à 9.",
    explanation: exp(
      "La table de 10 permet de compter de 10 en 10.",
      "Pour un entier, multiplier par 10 revient à écrire un zéro à droite.",
      "10 × 9 = 90.",
      "La réponse est 90."
    ),
    tags: ["cm1", "tables", "table_10", "produit"],
  },

  {
    kind: "fixed",
    id: "cm1_table_10_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 10 × ? = 80",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 10.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 10 donne 80.",
      "10 × 8 = 80.",
      "Le nombre manquant est 8."
    ),
    canvas: miniTableCanvas({
      table: 10,
      multiplicateurs: [6, 7, 8, 9, 10],
      missing: 8,
      title: "Table de 10 à trou",
      questionLabel: "Quelle ligne donne 80 ?",
    }),
    tags: ["cm1", "tables", "table_10", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_10_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 1,
    theme: "neutral",
    text: "Quel résultat appartient à la table de 10 ?",
    format: "qcm",
    choices: ["70", "72", "75", "77"],
    expected: ["70"],
    comparator: "mcq_exact",
    hint: "Les résultats de la table de 10 finissent par 0.",
    explanation: exp(
      "Les résultats de la table de 10 sont les multiples de 10.",
      "On cherche un nombre qui peut s’écrire 10 × un entier.",
      "70 = 10 × 7.",
      "70 appartient à la table de 10."
    ),
    tags: ["cm1", "tables", "table_10", "multiple", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_10_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme que 10 × 8 = 18. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "10 × 8 veut dire 8 dizaines.",
    explanation: exp(
      "Il faut distinguer multiplication et addition.",
      "10 × 8 ne veut pas dire 10 + 8.",
      "10 × 8 = 80, et non 18.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_10", "erreur", "confusion_addition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_10_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 2,
    theme: "neutral",
    text: "Si 10 × 7 = 70, alors combien vaut 70 ÷ 10 ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à retrouver des divisions.",
      "Si 10 × 7 = 70, alors 70 partagé en groupes de 10 donne 7 groupes.",
      "70 ÷ 10 = 7.",
      "La réponse est 7."
    ),
    tags: ["cm1", "tables", "table_10", "division", "lien"],
  },

  {
    kind: "template",
    id: "cm1_table_10_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplier par 10 revient à écrire un zéro à droite pour un entier.",
    tags: ["cm1", "tables", "table_10", "template", "canvas"],
    generate: () => {
      const k = randomInt(2, 10);
      const result = 10 * k;

      return {
        text: `Calcule : 10 × ${k}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 10 permet de compter de 10 en 10.",
          "Pour un entier, on écrit un zéro à droite.",
          `10 × ${k} = ${result}.`,
          `La réponse est ${result}.`
        ),
        canvas: miniTableCanvas({
          table: 10,
          multiplicateurs: [
            Math.max(1, k - 2),
            Math.max(1, k - 1),
            k,
            Math.min(10, k + 1),
            Math.min(10, k + 2),
          ]
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .sort((a, b) => a - b),
          missing: k,
          title: "Table de 10",
          questionLabel: `Le résultat de 10 × ${k} est caché.`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_10_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table de 10.",
    tags: ["cm1", "tables", "table_10", "facteur_manquant", "template"],
    generate: () => {
      const missing = randomInt(2, 10);
      const result = 10 * missing;

      return {
        text: `Complète : 10 × ? = ${result}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication à trou demande de retrouver un facteur.",
          "On cherche le nombre qui donne le résultat quand on le multiplie par 10.",
          `10 × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_10_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_10", "qcm", "template"],
    generate: () => {
      const k = randomInt(3, 10);
      const correct = String(10 * k);

      return {
        text: `Quel est le résultat de 10 × ${k} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(10 + k),
          String(10 * k + 10),
          String(10 * k - 10),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise la table de 10.",
          "Multiplier par 10 ne veut pas dire ajouter 10.",
          `10 × ${k} = ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_table_10_tpl_4_reunion_cartons",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque carton contient 10 fruits.",
    tags: ["cm1", "tables", "table_10", "reunion", "marche", "template"],
    generate: () => {
      const cartons = randomInt(3, 10);
      const total = 10 * cartons;

      return {
        text: `Au marché de Saint-Pierre, on prépare ${cartons} cartons avec 10 fruits dans chaque carton. Combien y a-t-il de fruits en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 10 sert à compter des groupes de 10.",
          "On multiplie le nombre de cartons par 10.",
          `${cartons} × 10 = ${total}.`,
          `Il y a ${total} fruits en tout.`
        ),
      };
    },
  },
    // ============================================================
  // TABLES_MELANGEES
  // Réviser les tables mélangées
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tables_melangees_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 7 × 8",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "Tu peux utiliser la table de 7 ou la table de 8.",
    explanation: exp(
      "Les tables mélangées demandent de reconnaître rapidement la bonne table.",
      "On peut utiliser la commutativité : 7 × 8 = 8 × 7.",
      "7 × 8 = 56.",
      "La réponse est 56."
    ),
    canvas: tableCanvas({
      table: 7,
      multiplicateur: 8,
      title: "Table de 7",
      questionLabel: "Retrouve le résultat de 7 × 8.",
    }),
    tags: ["cm1", "tables", "melangees", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_melangees_fixed_2_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "neutral",
    text: "Quel calcul donne 48 ?",
    format: "qcm",
    choices: ["6 × 8", "7 × 8", "8 × 8", "9 × 6"],
    expected: ["6 × 8"],
    comparator: "mcq_exact",
    hint: "Cherche dans les tables de 6 et de 8.",
    explanation: exp(
      "Un produit peut apparaître dans plusieurs tables, mais il faut trouver un calcul correct.",
      "On vérifie les propositions.",
      "6 × 8 = 48.",
      "Le bon calcul est 6 × 8."
    ),
    tags: ["cm1", "tables", "melangees", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_melangees_fixed_3_commutativite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "neutral",
    text: "Quel calcul donne le même résultat que 9 × 6 ?",
    format: "qcm",
    choices: ["6 × 9", "9 + 6", "9 × 9", "6 × 6"],
    expected: ["6 × 9"],
    comparator: "mcq_exact",
    hint: "Dans une multiplication, on peut échanger les facteurs.",
    explanation: exp(
      "La multiplication est commutative.",
      "Cela signifie qu’on peut changer l’ordre des facteurs.",
      "9 × 6 = 6 × 9 = 54.",
      "Le calcul équivalent est 6 × 9."
    ),
    tags: ["cm1", "tables", "melangees", "commutativite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_melangees_fixed_4_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 8 × 9 = 70. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tu peux faire 9 × 8 : 10 × 8 puis enlever 8.",
    explanation: exp(
      "Une table mélangée doit être vérifiée avec méthode.",
      "On peut utiliser la stratégie de la table de 9.",
      "10 × 8 = 80, puis 80 - 8 = 72. Donc 9 × 8 = 72.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "melangees", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_melangees_fixed_5_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 4,
    theme: "neutral",
    text: "Si 8 × 9 = 72, alors combien vaut 72 ÷ 9 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "La division inverse la multiplication.",
    explanation: exp(
      "Les tables mélangées aident aussi à retrouver des divisions.",
      "On utilise le lien entre multiplication et division.",
      "8 × 9 = 72, donc 72 ÷ 9 = 8.",
      "La réponse est 8."
    ),
    tags: ["cm1", "tables", "melangees", "division", "lien"],
  },

  {
    kind: "template",
    id: "cm1_tables_melangees_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère la table la plus facile pour toi.",
    tags: ["cm1", "tables", "melangees", "produit", "template", "canvas"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const b = randomChoice([2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const result = a * b;

      return {
        text: `Calcule : ${a} × ${b}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Les tables mélangées demandent de choisir rapidement la bonne table.",
          "On peut utiliser la table de l’un des deux facteurs.",
          `${a} × ${b} = ${result}.`,
          `La réponse est ${result}.`
        ),
        canvas: miniTableCanvas({
          table: a,
          multiplicateurs: [
            Math.max(1, b - 2),
            Math.max(1, b - 1),
            b,
            Math.min(10, b + 1),
            Math.min(10, b + 2),
          ]
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .sort((x, y) => x - y),
          missing: b,
          title: `Table de ${a}`,
          questionLabel: `Le résultat de ${a} × ${b} est caché.`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tables_melangees_tpl_2_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule avant de choisir.",
    tags: ["cm1", "tables", "melangees", "qcm", "template"],
    generate: () => {
      const a = randomChoice([4, 5, 6, 7, 8, 9]);
      const b = randomChoice([4, 5, 6, 7, 8, 9]);
      const correct = String(a * b);

      return {
        text: `Quel est le résultat de ${a} × ${b} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(a * b + a),
          String(a * b - a),
          String((a + 1) * b),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un QCM de tables demande de vérifier chaque proposition.",
          "On calcule le produit demandé.",
          `${a} × ${b} = ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tables_melangees_tpl_3_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque panier contient le même nombre de fruits.",
    tags: ["cm1", "tables", "melangees", "reunion", "marche", "template"],
    generate: () => {
      const paniers = randomChoice([4, 5, 6, 7, 8, 9]);
      const fruits = randomChoice([4, 5, 6, 7, 8, 9]);
      const total = paniers * fruits;

      return {
        text: `Au marché de Saint-Pierre, il y a ${paniers} paniers avec ${fruits} fruits dans chaque panier. Combien y a-t-il de fruits en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Les tables servent à résoudre rapidement des problèmes de groupes égaux.",
          "On multiplie le nombre de paniers par le nombre de fruits par panier.",
          `${paniers} × ${fruits} = ${total}.`,
          `Il y a ${total} fruits en tout.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tables_melangees_tpl_4_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie le calcul proposé.",
    tags: ["cm1", "tables", "melangees", "erreur", "template"],
    generate: () => {
      const a = randomChoice([6, 7, 8, 9]);
      const b = randomChoice([6, 7, 8, 9]);
      const correct = a * b;
      const wrong = correct + randomChoice([-3, -2, 2, 3, 4]);

      return {
        text: `Un élève affirme que ${a} × ${b} = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Il faut vérifier les tables avec précision.",
          "On recalcule le produit annoncé.",
          `${a} × ${b} = ${correct}, et non ${wrong}.`,
          "L’élève n’a pas raison."
        ),
      };
    },
  },

  // ============================================================
  // TABLES_TROUS
  // Retrouver un facteur manquant
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : 8 × ? = 56",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche quel nombre multiplié par 8 donne 56.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver un facteur manquant.",
      "On cherche dans la table de 8.",
      "8 × 7 = 56.",
      "Le nombre manquant est 7."
    ),
    canvas: miniTableCanvas({
      table: 8,
      multiplicateurs: [5, 6, 7, 8, 9],
      missing: 7,
      title: "Table de 8 à trou",
      questionLabel: "Quelle ligne donne 56 ?",
    }),
    tags: ["cm1", "tables", "trous", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : ? × 9 = 63",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche quel nombre multiplié par 9 donne 63.",
    explanation: exp(
      "Le facteur manquant peut être placé au début de la multiplication.",
      "On cherche dans la table de 9.",
      "7 × 9 = 63.",
      "Le nombre manquant est 7."
    ),
    tags: ["cm1", "tables", "trous", "facteur_manquant"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_3_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre complète : 6 × ? = 48 ?",
    format: "qcm",
    choices: ["8", "7", "9", "6"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 6.",
    explanation: exp(
      "Une multiplication à trou peut être résolue avec les tables.",
      "On cherche quel facteur donne 48 avec 6.",
      "6 × 8 = 48.",
      "Le nombre manquant est 8."
    ),
    tags: ["cm1", "tables", "trous", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_4_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 4,
    theme: "neutral",
    text: "Pour compléter 7 × ? = 42, quelle division peut aider ?",
    format: "qcm",
    choices: ["42 ÷ 7", "42 + 7", "42 - 7", "42 × 7"],
    expected: ["42 ÷ 7"],
    comparator: "mcq_exact",
    hint: "La division permet de retrouver un facteur manquant.",
    explanation: exp(
      "Une multiplication à trou est liée à une division.",
      "Pour retrouver le facteur manquant, on peut diviser le produit par le facteur connu.",
      "42 ÷ 7 = 6.",
      "La division utile est 42 ÷ 7."
    ),
    tags: ["cm1", "tables", "trous", "division", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_tables_trous_tpl_1_facteur_manquant_droite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche dans la table du nombre donné.",
    tags: ["cm1", "tables", "trous", "facteur_manquant", "template", "canvas"],
    generate: () => {
      const a = randomChoice([4, 5, 6, 7, 8, 9]);
      const missing = randomChoice([3, 4, 5, 6, 7, 8, 9, 10]);
      const result = a * missing;

      return {
        text: `Complète : ${a} × ? = ${result}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication à trou demande de retrouver un facteur.",
          `On cherche dans la table de ${a}.`,
          `${a} × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
        canvas: miniTableCanvas({
          table: a,
          multiplicateurs: [
            Math.max(1, missing - 2),
            Math.max(1, missing - 1),
            missing,
            Math.min(10, missing + 1),
            Math.min(10, missing + 2),
          ]
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .sort((x, y) => x - y),
          missing,
          title: `Table de ${a} à trou`,
          questionLabel: `Quelle ligne donne ${result} ?`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tables_trous_tpl_2_facteur_manquant_gauche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 3,
    theme: "neutral",
    hint: "Tu peux échanger l’ordre des facteurs.",
    tags: ["cm1", "tables", "trous", "commutativite", "template"],
    generate: () => {
      const a = randomChoice([4, 5, 6, 7, 8, 9]);
      const missing = randomChoice([3, 4, 5, 6, 7, 8, 9, 10]);
      const result = a * missing;

      return {
        text: `Complète : ? × ${a} = ${result}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une multiplication, on peut changer l’ordre des facteurs.",
          `? × ${a} = ${result} revient à chercher ${a} × ? = ${result}.`,
          `${missing} × ${a} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tables_trous_tpl_3_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 4,
    theme: "neutral",
    hint: "Teste chaque facteur proposé.",
    tags: ["cm1", "tables", "trous", "qcm", "template"],
    generate: () => {
      const a = randomChoice([6, 7, 8, 9]);
      const missing = randomChoice([4, 5, 6, 7, 8, 9]);
      const result = a * missing;
      const correct = String(missing);

      return {
        text: `Quel nombre complète : ${a} × ? = ${result} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(missing + 1),
          String(Math.max(1, missing - 1)),
          String(a),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une multiplication à trou demande de retrouver le bon facteur.",
          `On cherche dans la table de ${a}.`,
          `${a} × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  // ============================================================
  // TABLES_DEFI
  // Résoudre un défi sur les tables
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tables_defi_fixed_1_tresor",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi trésor : 8 coffres contiennent chacun 7 pièces. Combien y a-t-il de pièces au total ?",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "Utilise 8 × 7.",
    explanation: exp(
      "Un défi de tables peut représenter des groupes égaux.",
      "On multiplie le nombre de coffres par le nombre de pièces dans chaque coffre.",
      "8 × 7 = 56.",
      "Il y a 56 pièces au total."
    ),
    tags: ["cm1", "tables", "defi", "tresor", "pieces"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_defi_fixed_2_reunion_margouillats",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi margouillats : on observe 7 murs avec 6 margouillats sur chaque mur. Combien observe-t-on de margouillats en tout ?",
    format: "short",
    expected: ["42"],
    comparator: "number_equal",
    hint: "Même nombre sur chaque mur : utilise une multiplication.",
    explanation: exp(
      "Les tables servent à calculer rapidement des groupes égaux.",
      "On multiplie le nombre de murs par le nombre de margouillats sur chaque mur.",
      "7 × 6 = 42.",
      "On observe 42 margouillats en tout."
    ),
    tags: ["cm1", "tables", "defi", "reunion", "margouillat"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_defi_fixed_3_erreur_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève lit : « 9 sachets contiennent chacun 8 billes ». Il calcule 9 + 8 = 17. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le mot « chacun » indique des groupes égaux.",
    explanation: exp(
      "Dans un problème, il faut choisir l’opération adaptée.",
      "Le mot « chacun » indique que la même quantité est répétée plusieurs fois.",
      "Il faut calculer 9 × 8 = 72, et non 9 + 8.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: ["cm1", "tables", "defi", "erreur", "choisir_operation", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_defi_fixed_4_deux_tables",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Défi : calcule 6 × 7 puis 8 × 4. Quelle est la somme des deux résultats ?",
    format: "short",
    expected: ["74"],
    comparator: "number_equal",
    hint: "Calcule les deux produits puis additionne.",
    explanation: exp(
      "Un défi peut demander plusieurs calculs de tables.",
      "On calcule chaque produit, puis on additionne.",
      "6 × 7 = 42 et 8 × 4 = 32. Puis 42 + 32 = 74.",
      "La somme est 74."
    ),
    tags: ["cm1", "tables", "defi", "deux_etapes"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_defi_fixed_5_canvas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi tableau : retrouve le résultat de 9 × 7.",
    format: "short",
    expected: ["63"],
    comparator: "number_equal",
    hint: "Utilise la table de 9 ou fais 10 × 7 puis enlève 7.",
    explanation: exp(
      "On peut retrouver un produit avec une table ou une stratégie.",
      "Pour la table de 9, on peut utiliser 10 fois le nombre moins 1 fois le nombre.",
      "10 × 7 = 70, puis 70 - 7 = 63.",
      "9 × 7 = 63."
    ),
    canvas: tableCanvas({
      table: 9,
      multiplicateur: 7,
      title: "Défi table de 9",
      questionLabel: "Le résultat de 9 × 7 est caché.",
    }),
    tags: ["cm1", "tables", "defi", "canvas", "table_9"],
  },

  {
    kind: "template",
    id: "cm1_tables_defi_tpl_1_reunion_dechets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Chaque équipe ramasse la même quantité.",
    tags: ["cm1", "tables", "defi", "reunion", "ecologie", "template"],
    generate: () => {
      const equipes = randomChoice([4, 5, 6, 7, 8, 9]);
      const dechets = randomChoice([4, 5, 6, 7, 8, 9]);
      const total = equipes * dechets;

      return {
        text: `Défi écologie : ${equipes} équipes ramassent chacune ${dechets} déchets. Combien de déchets sont ramassés au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Les tables servent à calculer rapidement des groupes égaux.",
          "On multiplie le nombre d’équipes par le nombre de déchets par équipe.",
          `${equipes} × ${dechets} = ${total}.`,
          `Au total, ${total} déchets sont ramassés.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tables_defi_tpl_2_jeu_video",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "jeux_video",
    hint: "Chaque coffre donne le même nombre de pièces.",
    tags: ["cm1", "tables", "defi", "jeu_video", "template"],
    generate: () => {
      const coffres = randomChoice([4, 5, 6, 7, 8, 9]);
      const pieces = randomChoice([4, 5, 6, 7, 8, 9]);
      const total = coffres * pieces;

      return {
        text: `Dans un jeu vidéo, ${coffres} coffres donnent chacun ${pieces} pièces. Combien de pièces gagnes-tu au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Les tables permettent de calculer une récompense répétée.",
          "On multiplie le nombre de coffres par le nombre de pièces par coffre.",
          `${coffres} × ${pieces} = ${total}.`,
          `Tu gagnes ${total} pièces.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tables_defi_tpl_3_deux_produits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule les deux multiplications, puis additionne.",
    tags: ["cm1", "tables", "defi", "deux_etapes", "template"],
    generate: () => {
      const a = randomChoice([4, 5, 6, 7, 8, 9]);
      const b = randomChoice([4, 5, 6, 7, 8, 9]);
      const c = randomChoice([4, 5, 6, 7, 8, 9]);
      const d = randomChoice([4, 5, 6, 7, 8, 9]);

      const p1 = a * b;
      const p2 = c * d;
      const total = p1 + p2;

      return {
        text: `Défi : calcule ${a} × ${b}, puis ${c} × ${d}. Quelle est la somme des deux résultats ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un défi peut combiner deux produits.",
          "On calcule d’abord chaque multiplication, puis on additionne les résultats.",
          `${a} × ${b} = ${p1} et ${c} × ${d} = ${p2}. Puis ${p1} + ${p2} = ${total}.`,
          `La somme est ${total}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tables_defi_tpl_4_canvas_cache",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise la table affichée.",
    tags: ["cm1", "tables", "defi", "canvas", "template"],
    generate: () => {
      const table = randomChoice([6, 7, 8, 9]);
      const k = randomChoice([5, 6, 7, 8, 9]);
      const result = table * k;

      return {
        text: `Défi tableau : retrouve le résultat de ${table} × ${k}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau peut aider à mémoriser une table.",
          "On cherche la ligne correspondant au multiplicateur demandé.",
          `${table} × ${k} = ${result}.`,
          `La réponse est ${result}.`
        ),
        canvas: tableCanvas({
          table,
          multiplicateur: k,
          title: `Défi table de ${table}`,
          questionLabel: `Le résultat de ${table} × ${k} est caché.`,
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_tables_defi_open_1_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique une stratégie pour retrouver un résultat de table que tu as oublié.",
    format: "open",
    expected: ["double", "fois", "table", "décomposer", "10"],
    comparator: "contains_keyword",
    hint: "Tu peux parler des doubles, de la table de 10, ou de la décomposition.",
    explanation: exp(
      "Il existe plusieurs stratégies pour retrouver un résultat oublié.",
      "On peut utiliser une table proche ou décomposer un facteur.",
      "Par exemple, pour 9 × 7, on peut faire 10 × 7 - 7. Pour 8 × 6, on peut doubler 6 trois fois.",
      "Une stratégie aide à retrouver un résultat sans apprendre mécaniquement."
    ),
    tags: ["cm1", "tables", "defi", "open", "strategie"],
  },

  // ============================================================
  // TOP-UP — TABLE_2
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_5_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 2 × 9",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "La table de 2, ce sont les doubles.",
    explanation: exp(
      "La table de 2 permet de calculer les doubles.",
      "On cherche le double de 9.",
      "2 × 9 = 18.",
      "La réponse est 18."
    ),
    tags: ["cm1", "tables", "table_2", "double", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_6_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 2 × 8",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "La table de 2, ce sont les doubles.",
    explanation: exp(
      "La table de 2 permet de calculer les doubles.",
      "On cherche le double de 8.",
      "2 × 8 = 16.",
      "La réponse est 16."
    ),
    tags: ["cm1", "tables", "table_2", "double", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_7_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 2 × ? = 20",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Cherche quel nombre a pour double 20.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche le nombre qui, multiplié par 2, donne 20.",
      "2 × 10 = 20.",
      "Le nombre manquant est 10."
    ),
    tags: ["cm1", "tables", "table_2", "facteur_manquant", "short"],
  },

  // ============================================================
  // TOP-UP — TABLES_TROUS
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 6 × ? = 42",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 6.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche le nombre qui, multiplié par 6, donne 42.",
      "6 × 7 = 42.",
      "Le nombre manquant est 7."
    ),
    tags: ["cm1", "tables", "tables_trous", "facteur_manquant", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_6",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : ? × 8 = 56",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 8.",
    explanation: exp(
      "On peut retrouver un facteur manquant à gauche du signe ×.",
      "On cherche le nombre qui, multiplié par 8, donne 56.",
      "7 × 8 = 56.",
      "Le nombre manquant est 7."
    ),
    tags: ["cm1", "tables", "tables_trous", "facteur_manquant", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_7",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 9 × ? = 81",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 9.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche le nombre qui, multiplié par 9, donne 81.",
      "9 × 9 = 81.",
      "Le nombre manquant est 9."
    ),
    tags: ["cm1", "tables", "tables_trous", "facteur_manquant", "short"],
  },

  // ============================================================
  // TOP-UP — TABLES_MELANGEES
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tables_melangees_fixed_6_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 7 × 8",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "C’est un résultat de la table de 7 et de la table de 8.",
    explanation: exp(
      "Les tables mélangées demandent de connaître plusieurs tables.",
      "On cherche le produit de 7 par 8.",
      "7 × 8 = 56.",
      "La réponse est 56."
    ),
    tags: ["cm1", "tables", "tables_melangees", "short"],
  },
];
