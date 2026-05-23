// lib/english-maths/generateQuestions.ts

import type { EnglishMathsQuestion, EnglishMathsWord } from "./types";

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}

function pickWrongChoices(
  allWords: EnglishMathsWord[],
  current: EnglishMathsWord,
  field: "english" | "french" | "image",
  count = 3
): string[] {
  const wrongChoices = allWords
    .filter((word) => word.id !== current.id)
    .map((word) => word[field])
    .filter((value): value is string => typeof value === "string" && value.length > 0);

  return shuffle(unique(wrongChoices)).slice(0, count);
}

function makeChoices(correct: string, wrongs: string[]): string[] {
  return shuffle(unique([correct, ...wrongs])).slice(0, 4);
}

export function generateEnglishMathsQuestions(
  wordsOfDay: EnglishMathsWord[],
  allWords: EnglishMathsWord[]
): EnglishMathsQuestion[] {
  return wordsOfDay.map((word, index) => {
    const variant = index % 5;

    if (variant === 0) {
      return {
        id: `${word.id}_qcm_en_to_fr`,
        format: "qcm_en_to_fr",
        wordId: word.id,
        question: `Que veut dire "${word.english}" ?`,
        choices: makeChoices(
          word.french,
          pickWrongChoices(allWords, word, "french")
        ),
        expected: word.french,
      };
    }

    if (variant === 1) {
      return {
        id: `${word.id}_qcm_fr_to_en`,
        format: "qcm_fr_to_en",
        wordId: word.id,
        question: `Comment dit-on "${word.french}" en anglais ?`,
        choices: makeChoices(
          word.english,
          pickWrongChoices(allWords, word, "english")
        ),
        expected: word.english,
      };
    }

    if (variant === 2) {
      return {
        id: `${word.id}_listen`,
        format: "listen",
        wordId: word.id,
        question: "Écoute et choisis le mot entendu.",
        audioSrc: word.audioWordSrc,
        choices: makeChoices(
          word.english,
          pickWrongChoices(allWords, word, "english")
        ),
        expected: word.english,
      };
    }

    if (variant === 3) {
      return {
        id: `${word.id}_image`,
        format: "image",
        wordId: word.id,
        question: "Quel mot correspond à cette image ?",
        image: word.image,
        choices: makeChoices(
          word.english,
          pickWrongChoices(allWords, word, "english")
        ),
        expected: word.english,
      };
    }

    return {
      id: `${word.id}_complete`,
      format: "complete",
      wordId: word.id,
      question: `Complète : ${word.sentenceEn.replace(word.english, "_____")}`,
      choices: makeChoices(
        word.english,
        pickWrongChoices(allWords, word, "english")
      ),
      expected: word.english,
    };
  });
}