import type { ComparatorName, QuestionFormat, StudentStyle, TutorMode, TutorQuestion } from "@/lib/tutor/types";

type QuestionDefinition = {
  id: string;
  notionId: string;
  microId: string;
  difficulty: number;
  format: QuestionFormat;
  text: string;
  expected: string[];
  comparator: ComparatorName;
  choices?: string[];
  hint?: string;
};

export const questions6eMaths: QuestionDefinition[] = [
  {
    id: "decimal_compare_1",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 1,
    format: "short",
    text: "Quel nombre est le plus grand : 0,7 ou 0,65 ?",
    expected: ["0,7", "0.7"],
    comparator: "number_equal",
    hint: "Compare d'abord les dixièmes."
  },
  {
    id: "decimal_compare_2",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 1,
    format: "short",
    text: "Quel nombre est le plus petit : 0,4 ou 0,8 ?",
    expected: ["0,4", "0.4"],
    comparator: "number_equal",
    hint: "0,4 a moins de dixièmes."
  },
  {
    id: "decimal_write_1",
    notionId: "decimaux",
    microId: "decimal_write",
    difficulty: 1,
    format: "short",
    text: "Écris en décimal : 7/10",
    expected: ["0,7", "0.7", "0,70", "0.70"],
    comparator: "fraction_decimal_equivalent",
    hint: "7 dixièmes = 0,7."
  },
  {
    id: "decimal_write_2",
    notionId: "decimaux",
    microId: "decimal_write",
    difficulty: 1,
    format: "short",
    text: "Écris en décimal : 1/2",
    expected: ["0,5", "0.5", "2/4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une moitié = 0,5."
  },

  {
    id: "fraction_read_1",
    notionId: "fractions",
    microId: "fraction_read",
    difficulty: 1,
    format: "short",
    text: "Quelle fraction représente 1 part sur 4 parts égales ?",
    expected: ["1/4", "1 / 4", "0,25", "0.25"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une part sur quatre."
  },
  {
    id: "fraction_read_2",
    notionId: "fractions",
    microId: "fraction_read",
    difficulty: 1,
    format: "short",
    text: "Quelle fraction représente la moitié ?",
    expected: ["1/2", "2/4", "0,5", "0.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "La moitié = deux parts égales."
  },
  {
    id: "fraction_compare_1",
    notionId: "fractions",
    microId: "fraction_compare",
    difficulty: 2,
    format: "short",
    text: "Compare 3/5 et 4/5 : lequel est le plus grand ?",
    expected: ["4/5", "4 / 5", "4/5 est plus grand", "4/5 > 3/5", "0,8", "0.8"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur : compare les numérateurs."
  },
  {
    id: "fraction_compare_2",
    notionId: "fractions",
    microId: "fraction_compare",
    difficulty: 2,
    format: "short",
    text: "Compare 1/4 et 1/2 : lequel est le plus grand ?",
    expected: ["1/2", "1 / 2", "1/2 est plus grand", "1/2 > 1/4", "0,5", "0.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une moitié est plus grande qu'un quart."
  },
  {
    id: "fraction_quantity_1",
    notionId: "fractions",
    microId: "fraction_quantity",
    difficulty: 2,
    format: "short",
    text: "La moitié de 10, c'est combien ?",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Partage 10 en 2 parts égales."
  },
  {
    id: "fraction_quantity_2",
    notionId: "fractions",
    microId: "fraction_quantity",
    difficulty: 2,
    format: "short",
    text: "Le quart de 8, c'est combien ?",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Partage 8 en 4 parts égales."
  },

  {
    id: "prop_table_1",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    format: "short",
    text: "Dans un tableau de proportionnalité, si 2 cahiers coûtent 4 €, combien coûtent 4 cahiers ?",
    expected: ["8", "8€", "8 €"],
    comparator: "number_equal",
    hint: "Si on double le nombre de cahiers, on double le prix."
  },
  {
    id: "prop_unit_1",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    format: "short",
    text: "3 bonbons coûtent 6 €. Combien coûte 1 bonbon ?",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Passe d'abord à l'unité."
  },
  {
    id: "prop_direct_1",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    format: "short",
    text: "4 cahiers coûtent 8 €. Combien coûtent 2 cahiers ?",
    expected: ["4", "4€", "4 €"],
    comparator: "number_equal",
    hint: "Si on divise par 2 le nombre de cahiers, on divise aussi le prix par 2."
  },

  {
    id: "perim_square_1",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 1,
    format: "short",
    text: "Quel est le périmètre d’un carré de côté 5 cm ?",
    expected: ["20", "20 cm", "20cm"],
    comparator: "number_equal",
    hint: "Le périmètre d’un carré = 4 × côté."
  },
  {
    id: "perim_rectangle_1",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 1,
    format: "short",
    text: "Un rectangle mesure 3 cm sur 7 cm. Quel est son périmètre ?",
    expected: ["20", "20 cm", "20cm"],
    comparator: "number_equal",
    hint: "2 × longueur + 2 × largeur."
  },

  {
    id: "area_rectangle_1",
    notionId: "aires",
    microId: "area_rectangle",
    difficulty: 2,
    format: "short",
    text: "Quelle est l’aire d’un rectangle de 4 cm sur 3 cm ?",
    expected: ["12", "12 cm²", "12 cm2", "12cm²", "12cm2"],
    comparator: "number_equal",
    hint: "Aire = longueur × largeur."
  },
  {
    id: "area_square_1",
    notionId: "aires",
    microId: "area_square",
    difficulty: 2,
    format: "short",
    text: "Quelle est l’aire d’un carré de côté 5 cm ?",
    expected: ["25", "25 cm²", "25 cm2", "25cm²", "25cm2"],
    comparator: "number_equal",
    hint: "Aire du carré = côté × côté."
  },

  {
    id: "angle_right_1",
    notionId: "angles",
    microId: "angle_right",
    difficulty: 1,
    format: "short",
    text: "Un angle droit mesure combien de degrés ?",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "L’angle droit correspond au coin d’un carré."
  },
  {
    id: "angle_compare_1",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 1,
    format: "short",
    text: "Quel angle est le plus grand : 30° ou 80° ?",
    expected: ["80", "80°"],
    comparator: "number_equal",
    hint: "Compare simplement les nombres."
  }
];

export function buildQuestionFromBank(args: {
  questions: QuestionDefinition[];
  notionId: string;
  microId: string;
  difficulty: number;
  style: StudentStyle;
  mode: TutorMode;
  recentQuestionIds: string[];
}): TutorQuestion {
  let candidates = args.questions.filter(
    (q) => q.notionId === args.notionId && q.microId === args.microId
  );

  if (candidates.length === 0) {
    candidates = args.questions.filter((q) => q.microId === args.microId);
  }

  if (candidates.length === 0) {
    candidates = args.questions;
  }

  const notRecentlyUsed = candidates.filter((q) => !args.recentQuestionIds.includes(q.id));
  const pickedPool = notRecentlyUsed.length > 0 ? notRecentlyUsed : candidates;
  const picked = pickedPool[0];

  const isDys = args.style === "dys";
  const hint = args.mode === "coaching" ? picked.hint : undefined;

  if (isDys && picked.format === "short" && !picked.choices) {
    return {
      ...picked,
      format: "qcm",
      choices: picked.expected.slice(0, 1).concat(["Autre réponse 1", "Autre réponse 2"]),
      hint,
    };
  }

  return {
    id: picked.id,
    notionId: picked.notionId,
    microId: picked.microId,
    text: picked.text,
    format: picked.format,
    choices: picked.choices,
    expected: picked.expected,
    comparator: picked.comparator,
    hint,
  };
}