// lib/english-maths/weeks/sharedWeek01.ts

import type { EnglishMathsDay, EnglishMathsNiveau } from "../types";

type BaseEnglishMathsDay = Omit<EnglishMathsDay, "id" | "niveau" | "week">;

const baseDays: BaseEnglishMathsDay[] = [
  {
    dayIndex: 1,
    dayLabel: "lundi",
    title: "Numbers 1",
    theme: "numbers",
    wordIds: [
      "numbers_number",
      "numbers_ten",
      "numbers_thousand",
      "numbers_hundred",
      "operations_equal",
    ],
  },
  {
    dayIndex: 2,
    dayLabel: "mardi",
    title: "Operations 1",
    theme: "operations",
    wordIds: [
      "operations_plus",
      "operations_minus",
      "operations_equal",
      "operations_greater_than",
      "operations_less_than",
    ],
  },
  {
    dayIndex: 3,
    dayLabel: "mercredi",
    title: "Shapes 1",
    theme: "geometry",
    wordIds: [
      "geometry_point",
      "geometry_line",
      "geometry_triangle",
      "geometry_square",
      "geometry_circle",
    ],
  },
  {
    dayIndex: 4,
    dayLabel: "jeudi",
    title: "Shapes 2",
    theme: "geometry",
    wordIds: [
      "geometry_angle",
      "geometry_side",
      "geometry_vertex",
      "geometry_rectangle",
      "geometry_perimeter",
    ],
  },
  {
    dayIndex: 5,
    dayLabel: "vendredi",
    title: "Review 1",
    theme: "review",
    wordIds: [
      "numbers_half",
      "geometry_circle",
      "geometry_triangle",
      "operations_equal",
      "geometry_angle",
    ],
  },
  {
    dayIndex: 6,
    dayLabel: "samedi",
    title: "Weekend revision",
    theme: "review",
    wordIds: [
      "operations_plus",
      "operations_minus",
      "geometry_square",
      "geometry_rectangle",
      "geometry_side",
    ],
  },
  {
    dayIndex: 7,
    dayLabel: "dimanche",
    title: "Mini challenge",
    theme: "challenge",
    wordIds: [
      "numbers_number",
      "numbers_half",
      "operations_greater_than",
      "geometry_perimeter",
      "geometry_vertex",
    ],
  },
];

export function makeEnglishMathsWeek01(
  niveau: EnglishMathsNiveau
): EnglishMathsDay[] {
  return baseDays.map((day) => ({
    ...day,
    id: `${niveau}_2026_S01_day${day.dayIndex}`,
    niveau,
    week: "2026-S01",
  }));
}