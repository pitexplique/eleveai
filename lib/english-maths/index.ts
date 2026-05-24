// lib/english-maths/index.ts

import { englishMathsWords } from "./words";
import { englishMathsDays } from "./weeks";

import type { EnglishMathsNiveau } from "./types";

export function getEnglishMathsWordById(id: string) {
  return englishMathsWords.find((word) => word.id === id) ?? null;
}

export function getEnglishMathsWordsByIds(ids: string[]) {
  return ids
    .map((id) => getEnglishMathsWordById(id))
    .filter((word): word is NonNullable<typeof word> => Boolean(word));
}

export function getEnglishMathsDaysByNiveau(niveau: EnglishMathsNiveau) {
  return englishMathsDays.filter((day) => day.niveau === niveau);
}

export function getTodayEnglishMathsDay(niveau: EnglishMathsNiveau) {
  const days = getEnglishMathsDaysByNiveau(niveau);
  const dayIndex = new Date().getDay();

  // JS : dimanche = 0, lundi = 1...
  const normalizedDayIndex = dayIndex === 0 ? 7 : dayIndex;

  return (
    days.find((day) => day.dayIndex === normalizedDayIndex) ??
    days[0] ??
    null
  );
}

export function getEnglishMathsDayByIndex(
  niveau: EnglishMathsNiveau,
  dayIndex: number
) {
  const days = getEnglishMathsDaysByNiveau(niveau);

  return days.find((day) => day.dayIndex === dayIndex) ?? null;
}

export function getYesterdayEnglishMathsDay(niveau: EnglishMathsNiveau) {
  const currentJsDay = new Date().getDay();

  // JS : dimanche = 0, lundi = 1...
  const todayIndex = currentJsDay === 0 ? 7 : currentJsDay;

  // Si on est lundi, hier = dimanche
  const yesterdayIndex = todayIndex === 1 ? 7 : todayIndex - 1;

  return getEnglishMathsDayByIndex(niveau, yesterdayIndex);
}

export { englishMathsWords, englishMathsDays };

export type {
  EnglishMathsDay,
  EnglishMathsNiveau,
  EnglishMathsQuestion,
  EnglishMathsWord,
} from "./types";