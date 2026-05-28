// lib/english-maths/weeks/sharedWeek01.ts

import type { EnglishMathsDay, EnglishMathsNiveau } from "../types";

type BaseEnglishMathsDay = Omit<EnglishMathsDay, "id" | "niveau" | "week">;

const baseDays: BaseEnglishMathsDay[] = [
  {
    dayIndex: 1,
    dayLabel: "J-5",
    title: "Découvrir les premiers mots",
    theme: "Challenge de la semaine",
    wordIds: [
      "numbers_number",
      "numbers_ten",
      "numbers_hundred",
      "numbers_thousand",
      "operations_equal",
    ],
  },
  {
    dayIndex: 2,
    dayLabel: "J-4",
    title: "Comprendre les opérations",
    theme: "Challenge de la semaine",
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
    dayLabel: "J-3",
    title: "Géométrie : formes simples",
    theme: "Challenge de la semaine",
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
    dayLabel: "J-2",
    title: "Géométrie : vocabulaire utile",
    theme: "Challenge de la semaine",
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
    dayLabel: "J-1",
    title: "Révision finale du challenge",
    theme: "Dernière révision",
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
    dayLabel: "Jour J",
    title: "English Maths Challenge",
    theme: "Challenge final",
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
    dayLabel: "Bonus",
    title: "Révision bonus du week-end",
    theme: "Bonus",
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