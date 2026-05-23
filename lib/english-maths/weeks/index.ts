// lib/english-maths/weeks/index.ts

import { englishMathsWeeksCm1 } from "./cm1";
import { englishMathsWeeksCm2 } from "./cm2";
import { englishMathsWeeks6e } from "./6e";
import { englishMathsWeeks5e } from "./5e";
import { englishMathsWeeks4e } from "./4e";
import { englishMathsWeeks3e } from "./3e";

export const englishMathsDays = [
  ...englishMathsWeeksCm1,
  ...englishMathsWeeksCm2,
  ...englishMathsWeeks6e,
  ...englishMathsWeeks5e,
  ...englishMathsWeeks4e,
  ...englishMathsWeeks3e,
];