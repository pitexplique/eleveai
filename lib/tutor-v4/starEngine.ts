/**
 * starEngine.ts
 *
 * Gère la progression par étoiles.
 */

import type { StarLevel } from "@/lib/tutor-v4/types";

export function promoteStar(current: StarLevel): StarLevel {
  if (current >= 5) return 5;
  return (current + 1) as StarLevel;
}

export function downgradeStar(current: StarLevel): StarLevel {
  if (current <= 1) return 1;
  return (current - 1) as StarLevel;
}

export type StarUpdateInput = {
  currentStar: StarLevel;
  consecutiveSuccess: number;
  consecutiveErrors: number;
};

export type StarUpdateResult = {
  nextStar: StarLevel;
  resetSuccess: boolean;
  resetErrors: boolean;
};

export function updateStarLevel({
  currentStar,
  consecutiveSuccess,
  consecutiveErrors,
}: StarUpdateInput): StarUpdateResult {
  if (consecutiveErrors >= 2) {
    return {
      nextStar: downgradeStar(currentStar),
      resetSuccess: true,
      resetErrors: true,
    };
  }

  if (consecutiveSuccess >= 2) {
    return {
      nextStar: promoteStar(currentStar),
      resetSuccess: true,
      resetErrors: true,
    };
  }

  return {
    nextStar: currentStar,
    resetSuccess: false,
    resetErrors: false,
  };
}