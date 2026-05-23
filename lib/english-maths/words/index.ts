// lib/english-maths/words/index.ts

import { englishMathsNumbersWords } from "./numbers";
import { englishMathsOperationsWords } from "./operations";
import { englishMathsGeometryWords } from "./geometry";

export const englishMathsWords = [
  ...englishMathsNumbersWords,
  ...englishMathsOperationsWords,
  ...englishMathsGeometryWords,
];