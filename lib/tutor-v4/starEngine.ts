/**
 * starEngine.ts
 *
 * Gère la progression interne de difficulté
 * (compatibilité temporaire avec l'ancien vocabulaire "StarLevel").
 */

import type { DifficultyLevel, StarLevel } from "@/lib/tutor-v4/types";

/**
 * Compatibilité transitoire :
 * pour l'instant StarLevel et DifficultyLevel ont la même échelle 1..5.
 */
function normalizeLevel(level: number): DifficultyLevel {
  if (level <= 1) return 1;
  if (level === 2) return 2;
  if (level === 3) return 3;
  if (level === 4) return 4;
  return 5;
}

export function promoteDifficulty(current: DifficultyLevel): DifficultyLevel {
  return normalizeLevel(current + 1);
}

export function downgradeDifficulty(current: DifficultyLevel): DifficultyLevel {
  return normalizeLevel(current - 1);
}

/**
 * Alias de compatibilité avec l’ancien code.
 */
export function promoteStar(current: StarLevel): StarLevel {
  return promoteDifficulty(current);
}

/**
 * Alias de compatibilité avec l’ancien code.
 */
export function downgradeStar(current: StarLevel): StarLevel {
  return downgradeDifficulty(current);
}

export type StarUpdateInput = {
  currentStar: StarLevel;
  consecutiveSuccess: number;
  consecutiveErrors: number;
};

export type StarUpdateResult = {
  nextStar: StarLevel;
  nextDifficulty: DifficultyLevel;
  resetSuccess: boolean;
  resetErrors: boolean;
  reason:
    | "promote_after_success_streak"
    | "downgrade_after_error_streak"
    | "stay_same_level";
};

export function updateStarLevel({
  currentStar,
  consecutiveSuccess,
  consecutiveErrors,
}: StarUpdateInput): StarUpdateResult {
  const currentDifficulty: DifficultyLevel = currentStar;

  if (consecutiveErrors >= 2) {
    const nextDifficulty = downgradeDifficulty(currentDifficulty);

    return {
      nextStar: nextDifficulty,
      nextDifficulty,
      resetSuccess: true,
      resetErrors: true,
      reason: "downgrade_after_error_streak",
    };
  }

  if (consecutiveSuccess >= 2) {
    const nextDifficulty = promoteDifficulty(currentDifficulty);

    return {
      nextStar: nextDifficulty,
      nextDifficulty,
      resetSuccess: true,
      resetErrors: true,
      reason: "promote_after_success_streak",
    };
  }

  return {
    nextStar: currentStar,
    nextDifficulty: currentDifficulty,
    resetSuccess: false,
    resetErrors: false,
    reason: "stay_same_level",
  };
}