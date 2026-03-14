import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

export const decimauxBank: TutorBankItemV4[] = [
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
    text: "Quel est le plus petit nombre ?",
    format: "qcm",
    choices: ["0,8", "0,08", "0,18", "0,81"],
    expected: ["0,08", "0.08"],
    comparator: "mcq_exact",
    hint: "0,08 est plus petit que 0,8.",
    tags: ["decimaux", "comparaison", "qcm"],
  },
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
    text: "Choisis la bonne écriture décimale de 4/10.",
    format: "qcm",
    choices: ["4,0", "0,04", "0,4", "0,40"],
    expected: ["0,4", "0.4", "0,40", "0.40"],
    comparator: "mcq_exact",
    hint: "4/10 = 4 dixièmes.",
    tags: ["decimaux", "ecriture", "qcm"],
  },
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
    difficulty: 1,
    theme: "neutral",
    hint: "Le plus petit décimal n’est pas toujours celui qui a le plus de chiffres.",
    tags: ["decimaux", "comparaison", "template"],
    generate: () => {
      let a = Number((Math.random() * 0.8 + 0.1).toFixed(2));
      let b = Number((Math.random() * 0.8 + 0.1).toFixed(2));

      while (a === b) {
        b = Number((Math.random() * 0.8 + 0.1).toFixed(2));
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
    hint: "Les dixièmes peuvent être identiques : il faut alors comparer les centièmes.",
    tags: ["decimaux", "comparaison", "qcm", "template"],
    generate: () => {
      const tenths = [0.2, 0.3, 0.4, 0.5, 0.6];
      const base = tenths[Math.floor(Math.random() * tenths.length)];
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
    difficulty: 1,
    theme: "neutral",
    hint: "On place le chiffre des dixièmes après la virgule.",
    tags: ["decimaux", "ecriture", "template"],
    generate: () => {
      const numerators = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const n = numerators[Math.floor(Math.random() * numerators.length)];
      const decimal = (n / 10).toFixed(1);

      return {
        text: `Complète : ${n}/10 = ...`,
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
    hint: "Attention : 7/10 = 0,7 et pas 0,07.",
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
];