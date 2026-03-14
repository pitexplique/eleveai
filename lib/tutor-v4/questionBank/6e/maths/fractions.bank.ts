import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export const fractionsBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "fraction_read_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_read",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction représente 1 part sur 4 parts égales ?",
    format: "short",
    expected: ["1/4", "1 / 4", "0,25", "0.25"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une part sur quatre.",
    tags: ["lecture", "fraction", "partage"],
  },
  {
    kind: "fixed",
    id: "fraction_read_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_read",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction représente 1 part sur 2 parts égales ?",
    format: "short",
    expected: ["1/2", "1 / 2", "0,5", "0.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une part sur deux, c’est une moitié.",
    tags: ["lecture", "fraction", "moitie"],
  },
  {
    kind: "fixed",
    id: "fraction_read_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_read",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis la fraction qui représente une part sur 5 parts égales.",
    format: "qcm",
    choices: ["1/5", "5/1", "1/4", "2/5"],
    expected: ["1/5", "1 / 5"],
    comparator: "mcq_exact",
    hint: "Le dénominateur donne le nombre total de parts.",
    tags: ["lecture", "fraction", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_compare_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_compare",
    difficulty: 2,
    theme: "neutral",
    text: "Compare 1/4 et 1/2 : lequel est le plus grand ?",
    format: "short",
    expected: ["1/2", "1 / 2", "0,5", "0.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une moitié est plus grande qu’un quart.",
    tags: ["comparaison", "fraction"],
  },
  {
    kind: "fixed",
    id: "fraction_compare_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_compare",
    difficulty: 2,
    theme: "neutral",
    text: "Compare 3/5 et 1/5 : lequel est le plus grand ?",
    format: "short",
    expected: ["3/5", "3 / 5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur : compare les numérateurs.",
    tags: ["comparaison", "fraction"],
  },
  {
    kind: "fixed",
    id: "fraction_compare_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_compare",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est la plus grande ?",
    format: "qcm",
    choices: ["1/3", "2/3", "1/6", "1/2"],
    expected: ["2/3", "2 / 3"],
    comparator: "mcq_exact",
    hint: "Tu peux comparer les fractions ou penser à leur valeur.",
    tags: ["comparaison", "fraction", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_quantity_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_quantity",
    difficulty: 2,
    theme: "neutral",
    text: "La moitié de 10, c'est combien ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Partage 10 en 2 parts égales.",
    tags: ["moitie", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantity_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_quantity",
    difficulty: 2,
    theme: "neutral",
    text: "Le quart de 20, c'est combien ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Le quart, c’est partager en 4 parts égales.",
    tags: ["quart", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantity_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_quantity",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la moitié de 14 ?",
    format: "qcm",
    choices: ["6", "7", "8", "9"],
    expected: ["7"],
    comparator: "mcq_exact",
    hint: "Divise par 2.",
    tags: ["moitie", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_quantity_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_quantity",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le quart de 16 ?",
    format: "qcm",
    choices: ["2", "4", "8", "12"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Divise par 4.",
    tags: ["quart", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_read_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_read",
    difficulty: 1,
    theme: "neutral",
    hint: "Numérateur = parts prises ; dénominateur = parts totales.",
    tags: ["lecture", "fraction", "template"],
    generate: () => {
      const den = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
      return {
        text: `Quelle fraction représente 1 part sur ${den} parts égales ?`,
        format: "short",
        expected: [`1/${den}`, `1 / ${den}`],
        comparator: "fraction_decimal_equivalent",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_read_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_read",
    difficulty: 2,
    theme: "neutral",
    hint: "Une seule part prise : le numérateur vaut 1.",
    tags: ["lecture", "fraction", "qcm", "template"],
    generate: () => {
      const den = [3, 4, 5, 6, 8][Math.floor(Math.random() * 5)];
      const good = `1/${den}`;
      const choices = shuffle([good, `${den}/1`, `2/${den}`, `1/${den + 1}`]);

      return {
        text: `Choisis la fraction qui représente 1 part sur ${den} parts égales.`,
        format: "qcm",
        choices,
        expected: [good, good.replace("/", " / ")],
        comparator: "mcq_exact",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_compare_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_compare",
    difficulty: 2,
    theme: "neutral",
    hint: "Même dénominateur : compare les numérateurs.",
    tags: ["comparaison", "fraction", "template"],
    generate: () => {
      const den = [3, 4, 5, 6, 8, 10][Math.floor(Math.random() * 6)];
      const a = 1 + Math.floor(Math.random() * (den - 2));
      let b = 1 + Math.floor(Math.random() * (den - 1));

      while (b === a) {
        b = 1 + Math.floor(Math.random() * (den - 1));
      }

      const max = Math.max(a, b);

      return {
        text: `Compare ${a}/${den} et ${b}/${den} : lequel est le plus grand ?`,
        format: "short",
        expected: [`${max}/${den}`, `${max} / ${den}`],
        comparator: "fraction_decimal_equivalent",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_compare_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_compare",
    difficulty: 2,
    theme: "neutral",
    hint: "Une moitié est souvent plus grande qu’une seule petite part.",
    tags: ["comparaison", "fraction", "template"],
    generate: () => {
      const den = [4, 6, 8, 10][Math.floor(Math.random() * 4)];
      const a = 1;
      const b = den / 2;
      const good = "1/2";

      return {
        text: `Compare ${a}/${den} et ${b}/${den} : lequel est le plus grand ?`,
        format: "short",
        expected: [
          good,
          "1 / 2",
          "0,5",
          "0.5",
          `${b}/${den}`,
          `${b} / ${den}`,
        ],
        comparator: "fraction_decimal_equivalent",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_compare_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_compare",
    difficulty: 2,
    theme: "neutral",
    hint: "Quand les dénominateurs sont identiques, le plus grand numérateur donne la plus grande fraction.",
    tags: ["comparaison", "fraction", "qcm", "template"],
    generate: () => {
      const den = [4, 5, 6, 8][Math.floor(Math.random() * 4)];
      const nums = [1, 2, 3].filter((n) => n < den);
      const goodNum = nums[Math.floor(Math.random() * nums.length)];
      const good = `${goodNum}/${den}`;

      const distractors = Array.from(
        new Set(nums.filter((n) => n !== goodNum).map((n) => `${n}/${den}`))
      );

      while (distractors.length < 3) {
        distractors.push(`1/${den + distractors.length + 1}`);
      }

      const choices = shuffle([good, ...distractors.slice(0, 3)]);

      return {
        text: "Quelle fraction est la plus grande ?",
        format: "qcm",
        choices,
        expected: [good, good.replace("/", " / ")],
        comparator: "mcq_exact",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_quantity_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_quantity",
    difficulty: 2,
    theme: "neutral",
    hint: "Partage la quantité en parts égales.",
    tags: ["moitie", "quart", "quantite", "template"],
    generate: () => {
      const base = [8, 10, 12, 16, 20][Math.floor(Math.random() * 5)];
      const type = Math.random() > 0.5 ? "moitié" : "quart";
      const expected = type === "moitié" ? String(base / 2) : String(base / 4);

      return {
        text: `Le ${type} de ${base}, c'est combien ?`,
        format: "short",
        expected: [expected],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_quantity_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_quantity",
    difficulty: 2,
    theme: "neutral",
    hint: "La moitié, c’est diviser par 2.",
    tags: ["moitie", "quantite", "template"],
    generate: () => {
      const base = [12, 16, 20, 24][Math.floor(Math.random() * 4)];
      const expected = String(base / 2);

      return {
        text: `Quelle est la moitié de ${base} ?`,
        format: "short",
        expected: [expected],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_quantity_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_quantity",
    difficulty: 2,
    theme: "neutral",
    hint: "Moitié = ÷2 ; quart = ÷4.",
    tags: ["moitie", "quart", "qcm", "template"],
    generate: () => {
      const base = [8, 12, 16, 20][Math.floor(Math.random() * 4)];
      const type = Math.random() > 0.5 ? "moitié" : "quart";
      const good = type === "moitié" ? base / 2 : base / 4;

      const distractors = Array.from(
        new Set([good + 1, good + 2, base / 2, base / 4])
      )
        .filter((n) => n !== good)
        .slice(0, 3);

      const choices = shuffle([String(good), ...distractors.map(String)]);

      return {
        text: `Quel est le ${type} de ${base} ?`,
        format: "qcm",
        choices,
        expected: [String(good)],
        comparator: "mcq_exact",
      };
    },
  },
];