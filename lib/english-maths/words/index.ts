// lib/english-maths/words/index.ts

import { englishMathsNumbersWords } from "./numbers";
import { englishMathsOperationsWords } from "./operations";
import { englishMathsGeometryWords } from "./geometry";
import { englishMathsVerbsWords } from "./verbs";

export const englishMathsWords = [
  ...englishMathsNumbersWords,
  ...englishMathsOperationsWords,
  ...englishMathsVerbsWords,
  ...englishMathsGeometryWords,
];
