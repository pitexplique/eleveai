import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

export const decimauxBank: TutorBankItemV4[] = [
  // =========================
  // DECIMAL_COMPARE
  // =========================
  {
    kind: "fixed",
    id: "decimal_compare_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus grand : 0,7 ou 0,65 ?",
    format: "short",
    expected: ["0,7", "0.7", "0,70", "0.70"],
    comparator: "number_equal",
    hint: "Compare d’abord les dixièmes.",
    tags: ["decimaux", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus petit : 0,4 ou 0,09 ?",
    format: "short",
    expected: ["0,09", "0.09", "0,090", "0.090"],
    comparator: "number_equal",
    hint: "0,09 a 0 dixième et 9 centièmes.",
    tags: ["decimaux", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus grand : 0,3 ou 0,27 ?",
    format: "short",
    expected: ["0,3", "0.3", "0,30", "0.30"],
    comparator: "number_equal",
    hint: "Compare 0,30 et 0,27.",
    tags: ["decimaux", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus petit : 0,52 ou 0,507 ?",
    format: "short",
    expected: ["0,507", "0.507"],
    comparator: "number_equal",
    hint: "Compare 0,520 et 0,507.",
    tags: ["decimaux", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_trap_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand : 0,5 ou 0,45 ?",
    format: "short",
    expected: ["0,5", "0.5"],
    comparator: "number_equal",
    hint: "0,50 vs 0,45.",
    tags: ["decimaux", "comparaison", "piege"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_trap_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le plus petit : 0,305 ou 0,35 ?",
    format: "short",
    expected: ["0,305", "0.305"],
    comparator: "number_equal",
    tags: ["decimaux", "comparaison", "piege"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand nombre ?",
    format: "qcm",
    choices: ["0,54", "0,45", "0,5", "0,49"],
    expected: ["0,54", "0.54"],
    comparator: "mcq_exact",
    hint: "Compare chiffre par chiffre après la virgule.",
    tags: ["decimaux", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand nombre ?",
    format: "qcm",
    choices: ["0,41", "0,401", "0,39", "0,4"],
    expected: ["0,41", "0.41"],
    comparator: "mcq_exact",
    hint: "0,41 = 0,410.",
    tags: ["decimaux", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un fruit coûte 2,5 € et un autre 2,45 €. Lequel coûte le plus cher ?",
    format: "short",
    expected: ["2,5", "2.5", "2,50", "2.50"],
    comparator: "number_equal",
    hint: "Compare 2,50 et 2,45.",
    tags: ["decimaux", "comparaison", "reunion"],
  },

  // =========================
  // DECIMAL_WRITE
  // =========================
  {
    kind: "fixed",
    id: "decimal_write_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_write",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en décimal : 7/10",
    format: "short",
    expected: ["0,7", "0.7", "0,70", "0.70"],
    comparator: "fraction_decimal_equivalent",
    hint: "7 dixièmes = 0,7.",
    tags: ["decimaux", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_write_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_write",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en décimal : 3/10",
    format: "short",
    expected: ["0,3", "0.3", "0,30", "0.30"],
    comparator: "fraction_decimal_equivalent",
    hint: "3 dixièmes = 0,3.",
    tags: ["decimaux", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_write_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_write",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en décimal : 9/10",
    format: "short",
    expected: ["0,9", "0.9", "0,90", "0.90"],
    comparator: "fraction_decimal_equivalent",
    hint: "9 dixièmes = 0,9.",
    tags: ["decimaux", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_write_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_write",
    difficulty: 2,
    theme: "neutral",
    text: "Écris en décimal : 25/10",
    format: "short",
    expected: ["2,5", "2.5", "2,50", "2.50"],
    comparator: "fraction_decimal_equivalent",
    hint: "25 dixièmes = 2 unités et 5 dixièmes.",
    tags: ["decimaux", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_write_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_write",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 9/10 ?",
    format: "qcm",
    choices: ["0,09", "0,9", "9,0", "0,900"],
    expected: ["0,9", "0.9", "0,90", "0.90"],
    comparator: "mcq_exact",
    hint: "9/10 signifie 9 dixièmes.",
    tags: ["decimaux", "ecriture", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_write_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_write",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 15/10 ?",
    format: "qcm",
    choices: ["1,5", "0,15", "15,0", "1,05"],
    expected: ["1,5", "1.5"],
    comparator: "mcq_exact",
    hint: "15 dixièmes = 1,5.",
    tags: ["decimaux", "ecriture", "qcm"],
  },

  // =========================
  // DECIMAL_ADD
  // =========================
  {
    kind: "fixed",
    id: "decimal_add_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_add",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 1,2 + 0,5",
    format: "short",
    expected: ["1,7", "1.7", "1,70", "1.70"],
    comparator: "number_equal",
    hint: "Aligne bien les virgules.",
    tags: ["decimaux", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_add",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 2,4 + 1,3",
    format: "short",
    expected: ["3,7", "3.7", "3,70", "3.70"],
    comparator: "number_equal",
    hint: "Additionne les unités puis les dixièmes.",
    tags: ["decimaux", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_add",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 3,45 + 1,7",
    format: "short",
    expected: ["5,15", "5.15"],
    comparator: "number_equal",
    hint: "Ajoute un zéro : 1,70",
    tags: ["decimaux", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_add",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 0,75 + 2,8",
    format: "short",
    expected: ["3,55", "3.55"],
    comparator: "number_equal",
    hint: "Aligne les centièmes.",
    tags: ["decimaux", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_add",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 0,6 + 0,9",
    format: "short",
    expected: ["1,5", "1.5", "1,50", "1.50"],
    comparator: "number_equal",
    hint: "6 dixièmes + 9 dixièmes = 15 dixièmes.",
    tags: ["decimaux", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_add",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 2,35 + 1,4",
    format: "short",
    expected: ["3,75", "3.75"],
    comparator: "number_equal",
    hint: "Écris 1,4 sous la forme 1,40.",
    tags: ["decimaux", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_add",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le résultat de 0,8 + 0,7 ?",
    format: "qcm",
    choices: ["1,5", "0,15", "1,4", "1,6"],
    expected: ["1,5", "1.5"],
    comparator: "mcq_exact",
    hint: "8 dixièmes + 7 dixièmes = 15 dixièmes.",
    tags: ["decimaux", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_add_challenge_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_add",
    difficulty: 5,
    theme: "neutral",
    text: "Je pense à un nombre. Si j’ajoute 1,5, j’obtiens 3,2. Quel est ce nombre ?",
    format: "short",
    expected: ["1,7", "1.7"],
    comparator: "number_equal",
    hint: "On peut faire l’opération inverse.",
    tags: ["decimaux", "addition", "defi"],
  },

  // =========================
  // DECIMAL_MULTIPLY
  // =========================
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiply",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 0,5 × 4",
    format: "short",
    expected: ["2", "2,0", "2.0"],
    comparator: "number_equal",
    hint: "0,5 c’est la moitié.",
    tags: ["decimaux", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiply",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 1,5 × 2",
    format: "short",
    expected: ["3", "3,0", "3.0"],
    comparator: "number_equal",
    hint: "1,5 + 1,5 = 3.",
    tags: ["decimaux", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiply",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 2,4 × 3",
    format: "short",
    expected: ["7,2", "7.2"],
    comparator: "number_equal",
    hint: "2,4 + 2,4 + 2,4",
    tags: ["decimaux", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiply",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 0,25 × 4",
    format: "short",
    expected: ["1", "1,0", "1.0"],
    comparator: "number_equal",
    hint: "Un quart multiplié par 4 donne 1.",
    tags: ["decimaux", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiply",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de 2,5 × 2 ?",
    format: "qcm",
    choices: ["4,5", "5", "0,5", "25"],
    expected: ["5", "5,0", "5.0"],
    comparator: "mcq_exact",
    hint: "Doubler 2,5 donne 5.",
    tags: ["decimaux", "multiplication", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_challenge_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiply",
    difficulty: 5,
    theme: "neutral",
    text: "Un objet coûte 2,5 €. Combien coûtent 6 objets ?",
    format: "short",
    expected: ["15", "15,0", "15.0"],
    comparator: "number_equal",
    hint: "Multiplie 2,5 par 6.",
    tags: ["decimaux", "multiplication", "defi"],
  },

  // =========================
  // DECIMAL_DIVIDE_BY_INTEGER
  // =========================
  {
    kind: "fixed",
    id: "decimal_divide_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_divide_by_integer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 3,6 ÷ 2",
    format: "short",
    expected: ["1,8", "1.8", "1,80", "1.80"],
    comparator: "number_equal",
    hint: "Partager 3,6 en 2 parts égales.",
    tags: ["decimaux", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_divide_by_integer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 4,8 ÷ 4",
    format: "short",
    expected: ["1,2", "1.2", "1,20", "1.20"],
    comparator: "number_equal",
    hint: "48 dixièmes ÷ 4 = 12 dixièmes.",
    tags: ["decimaux", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_divide_by_integer",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 5,6 ÷ 4",
    format: "short",
    expected: ["1,4", "1.4"],
    comparator: "number_equal",
    tags: ["decimaux", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_divide_by_integer",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 9,6 ÷ 3",
    format: "short",
    expected: ["3,2", "3.2"],
    comparator: "number_equal",
    tags: ["decimaux", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_divide_by_integer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de 2,4 ÷ 2 ?",
    format: "qcm",
    choices: ["1,2", "0,12", "2,2", "1,4"],
    expected: ["1,2", "1.2"],
    comparator: "mcq_exact",
    hint: "2,4 partagé en 2 fait 1,2.",
    tags: ["decimaux", "division", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_challenge_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_divide_by_integer",
    difficulty: 5,
    theme: "neutral",
    text: "On partage 7,5 litres d’eau en 5 bouteilles. Combien dans chaque bouteille ?",
    format: "short",
    expected: ["1,5", "1.5"],
    comparator: "number_equal",
    tags: ["decimaux", "division", "defi"],
  },

  // =========================
  // TEMPLATES - COMPARE
  // =========================
  {
    kind: "template",
    id: "decimal_compare_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 1,
    theme: "neutral",
    hint: "Compare d’abord les dixièmes, puis les centièmes.",
    tags: ["decimaux", "comparaison", "template"],
    generate: () => {
      let a = Number((Math.random() * 0.8 + 0.1).toFixed(2));
      let b = Number((Math.random() * 0.8 + 0.1).toFixed(2));

      while (a === b) {
        b = Number((Math.random() * 0.8 + 0.1).toFixed(2));
      }

      const max = Math.max(a, b);

      return {
        text: `Quel nombre est le plus grand : ${formatComma(a)} ou ${formatComma(b)} ?`,
        format: "short",
        expected: [String(max), formatComma(max)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_compare_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 2,
    theme: "neutral",
    hint: "Le plus petit n’est pas toujours celui qui a le plus de chiffres.",
    tags: ["decimaux", "comparaison", "template"],
    generate: () => {
      let a = Number((Math.random() * 0.9 + 0.05).toFixed(3));
      let b = Number((Math.random() * 0.9 + 0.05).toFixed(3));

      while (a === b) {
        b = Number((Math.random() * 0.9 + 0.05).toFixed(3));
      }

      const min = Math.min(a, b);

      return {
        text: `Quel nombre est le plus petit : ${formatComma(a)} ou ${formatComma(b)} ?`,
        format: "short",
        expected: [String(min), formatComma(min)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_compare_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 2,
    theme: "neutral",
    hint: "Si les dixièmes sont identiques, compare les centièmes.",
    tags: ["decimaux", "comparaison", "qcm", "template"],
    generate: () => {
      const base = [0.2, 0.3, 0.4, 0.5, 0.6][
        Math.floor(Math.random() * 5)
      ];
      const good = Number((base + 0.04).toFixed(2));
      const d1 = Number((base + 0.01).toFixed(2));
      const d2 = Number((base + 0.02).toFixed(2));
      const d3 = Number((base + 0.03).toFixed(2));

      const choices = shuffle([
        formatComma(good),
        formatComma(d1),
        formatComma(d2),
        formatComma(d3),
      ]);

      return {
        text: "Quel est le plus grand nombre ?",
        format: "qcm",
        choices,
        expected: [String(good), formatComma(good)],
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - WRITE
  // =========================
  {
    kind: "template",
    id: "decimal_write_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_write",
    difficulty: 1,
    theme: "neutral",
    hint: "n/10 = n dixièmes.",
    tags: ["decimaux", "ecriture", "template"],
    generate: () => {
      const numerators = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const n = numerators[Math.floor(Math.random() * numerators.length)];
      const decimal = (n / 10).toFixed(1);

      return {
        text: `Écris en décimal : ${n}/10`,
        format: "short",
        expected: [decimal, decimal.replace(".", ",")],
        comparator: "fraction_decimal_equivalent",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_write_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_write",
    difficulty: 2,
    theme: "neutral",
    hint: "Le numérateur peut être plus grand que 10.",
    tags: ["decimaux", "ecriture", "template"],
    generate: () => {
      const numerators = [12, 15, 18, 24, 27, 35];
      const n = numerators[Math.floor(Math.random() * numerators.length)];
      const decimal = (n / 10).toFixed(1);

      return {
        text: `Écris en décimal : ${n}/10`,
        format: "short",
        expected: [decimal, decimal.replace(".", ",")],
        comparator: "fraction_decimal_equivalent",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_write_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_write",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention aux zéros inutiles.",
    tags: ["decimaux", "ecriture", "qcm", "template"],
    generate: () => {
      const numerators = [2, 3, 4, 5, 6, 7, 8, 9];
      const n = numerators[Math.floor(Math.random() * numerators.length)];
      const good = (n / 10).toFixed(1).replace(".", ",");

      const distractors = Array.from(
        new Set([`0,0${n}`, `${n},0`, `0,${n}0`])
      )
        .filter((x) => x !== good)
        .slice(0, 3);

      const choices = shuffle([good, ...distractors]);

      return {
        text: `Quelle écriture décimale correspond à ${n}/10 ?`,
        format: "qcm",
        choices,
        expected: [good, good.replace(",", ".")],
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - ADD
  // =========================
  {
    kind: "template",
    id: "decimal_add_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_add",
    difficulty: 2,
    theme: "neutral",
    hint: "Aligne les virgules.",
    tags: ["decimaux", "addition", "template"],
    generate: () => {
      const a = Number((Math.floor(Math.random() * 20) / 10).toFixed(1));
      const b = Number((Math.floor(Math.random() * 20) / 10).toFixed(1));
      const sum = Number((a + b).toFixed(1));

      return {
        text: `Calcule : ${formatComma(a)} + ${formatComma(b)}`,
        format: "short",
        expected: [String(sum), formatComma(sum)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_add_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_add",
    difficulty: 3,
    theme: "neutral",
    hint: "Tu peux ajouter des zéros pour aligner.",
    tags: ["decimaux", "addition", "template"],
    generate: () => {
      const a = Number((Math.random() * 5).toFixed(2));
      const b = Number((Math.random() * 5).toFixed(2));
      const sum = Number((a + b).toFixed(2));

      return {
        text: `Calcule : ${formatComma(a)} + ${formatComma(b)}`,
        format: "short",
        expected: [String(sum), formatComma(sum)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_add_reunion_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_add",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne les deux prix.",
    tags: ["decimaux", "addition", "template", "reunion"],
    generate: () => {
      const a = Number((Math.random() * 4 + 1).toFixed(2));
      const b = Number((Math.random() * 4 + 1).toFixed(2));
      const sum = Number((a + b).toFixed(2));

      return {
        text: `Au snack, un jus coûte ${formatComma(a)} € et un samoussa coûte ${formatComma(b)} €. Quel est le prix total ?`,
        format: "short",
        expected: [String(sum), formatComma(sum)],
        comparator: "number_equal",
      };
    },
  },

  // =========================
  // TEMPLATES - MULTIPLY
  // =========================
  {
    kind: "template",
    id: "decimal_multiply_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiply",
    difficulty: 3,
    theme: "neutral",
    hint: "Vois cela comme une addition répétée.",
    tags: ["decimaux", "multiplication", "template"],
    generate: () => {
      const decimals = [0.5, 1.5, 2.5, 3.5];
      const integers = [2, 3, 4];
      const a = decimals[Math.floor(Math.random() * decimals.length)];
      const b = integers[Math.floor(Math.random() * integers.length)];
      const product = Number((a * b).toFixed(1));

      return {
        text: `Calcule : ${formatComma(a)} × ${b}`,
        format: "short",
        expected: [String(product), formatComma(product)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_multiply_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiply",
    difficulty: 4,
    theme: "neutral",
    hint: "Tu peux décomposer le calcul.",
    tags: ["decimaux", "multiplication", "template"],
    generate: () => {
      const a = [0.25, 0.5, 1.2, 1.5, 2.4][
        Math.floor(Math.random() * 5)
      ];
      const b = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const product = Number((a * b).toFixed(2));

      return {
        text: `Calcule : ${formatComma(a)} × ${b}`,
        format: "short",
        expected: [String(product), formatComma(product)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_multiply_reunion_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiply",
    difficulty: 5,
    theme: "reunion",
    hint: "Multiplie le prix d’un objet par le nombre d’objets.",
    tags: ["decimaux", "multiplication", "template", "reunion"],
    generate: () => {
      const price = [1.5, 2.5, 3.5, 4.5][Math.floor(Math.random() * 4)];
      const qty = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
      const total = Number((price * qty).toFixed(1));

      return {
        text: `Au marché forain, un ananas coûte ${formatComma(price)} €. Combien coûtent ${qty} ananas ?`,
        format: "short",
        expected: [String(total), formatComma(total)],
        comparator: "number_equal",
      };
    },
  },
  

  // =========================
  // TEMPLATES - DIVIDE
  // =========================
  {
    kind: "template",
    id: "decimal_divide_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_divide_by_integer",
    difficulty: 3,
    theme: "neutral",
    hint: "On partage en parts égales.",
    tags: ["decimaux", "division", "template"],
    generate: () => {
      const divisors = [2, 4, 5];
      const divisor = divisors[Math.floor(Math.random() * divisors.length)];
      const quotient = [0.6, 0.8, 1.2, 1.4, 1.6][
        Math.floor(Math.random() * 5)
      ];
      const dividend = Number((quotient * divisor).toFixed(1));

      return {
        text: `Calcule : ${formatComma(dividend)} ÷ ${divisor}`,
        format: "short",
        expected: [String(quotient), formatComma(quotient)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_divide_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_divide_by_integer",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche combien vaut une part.",
    tags: ["decimaux", "division", "template"],
    generate: () => {
      const divisor = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const quotient = [1.2, 1.5, 1.8, 2.4, 2.5, 3.2][
        Math.floor(Math.random() * 6)
      ];
      const dividend = Number((quotient * divisor).toFixed(1));

      return {
        text: `Calcule : ${formatComma(dividend)} ÷ ${divisor}`,
        format: "short",
        expected: [String(quotient), formatComma(quotient)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_divide_reunion_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_divide_by_integer",
    difficulty: 5,
    theme: "reunion",
    hint: "On partage la quantité totale entre plusieurs personnes.",
    tags: ["decimaux", "division", "template", "reunion"],
    generate: () => {
      const divisor = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const quotient = [0.8, 1.2, 1.5, 2.4][Math.floor(Math.random() * 4)];
      const dividend = Number((quotient * divisor).toFixed(1));

      return {
        text: `On partage ${formatComma(dividend)} litres de jus entre ${divisor} personnes. Quelle quantité pour une personne ?`,
        format: "short",
        expected: [String(quotient), formatComma(quotient)],
        comparator: "number_equal",
      };
    },
  },
];