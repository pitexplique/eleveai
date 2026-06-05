import type {
  EnglishMathsDay,
  EnglishMathsLanguageLevel,
  EnglishMathsNiveau,
} from "../types";

const languageLevelWordIds: Record<EnglishMathsLanguageLevel, string[]> = {
  A1: [
    "verbs_a1_add",
    "verbs_a1_count",
    "verbs_a1_draw",
    "verbs_a1_compare",
    "verbs_a1_measure",
    "verbs_a1_check",
  ],
  A2: [
    "verbs_a2_subtract",
    "verbs_a2_multiply",
    "verbs_a2_divide",
    "verbs_a2_order",
    "verbs_a2_calculate",
    "verbs_a2_solve",
  ],
  B1: [
    "verbs_b1_estimate",
    "verbs_b1_explain",
    "verbs_b1_justify",
    "verbs_b1_simplify",
    "verbs_b1_convert",
    "verbs_b1_represent",
  ],
  B2: [
    "verbs_b2_prove",
    "verbs_b2_interpret",
    "verbs_b2_model",
    "verbs_b2_evaluate",
    "verbs_b2_approximate",
    "verbs_b2_derive",
  ],
};

const dayLabels = [
  "Semaine des verbes",
  "Verbes utiles",
  "Verbes utiles",
  "Verbes utiles",
  "Verbes utiles",
  "Défi des verbes",
  "Révision des verbes",
];

export function makeVerbWeekForLanguageLevel(
  languageLevel: EnglishMathsLanguageLevel
): EnglishMathsDay[] {
  const wordIds = languageLevelWordIds[languageLevel];
  const week = `verbs-${languageLevel}`;

  return dayLabels.map((dayLabel, index) => ({
    id: `${languageLevel}_${week}_day${index + 1}`,
    niveau: languageLevel,
    languageLevel,
    week,
    dayIndex: index + 1,
    dayLabel,
    title:
      index === 5
        ? "Défi des verbes English Maths"
        : "La semaine des verbes",
    theme:
      index === 6
        ? "Révision des verbes"
        : "Verbes utiles en maths",
    wordIds,
  }));
}

export function makeEnglishMathsWeek02(
  niveau: EnglishMathsNiveau
): EnglishMathsDay[] {
  return makeVerbWeekForLanguageLevel(niveau);
}
