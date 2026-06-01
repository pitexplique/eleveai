// lib/english-maths/weeks/index.ts

import { makeVerbWeekForLanguageLevel } from "./sharedWeek02";

export const englishMathsDays = [
  ...makeVerbWeekForLanguageLevel("A1"),
  ...makeVerbWeekForLanguageLevel("A2"),
  ...makeVerbWeekForLanguageLevel("B1"),
  ...makeVerbWeekForLanguageLevel("B2"),
];
