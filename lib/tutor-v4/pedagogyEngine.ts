/**
 * pedagogyEngine.ts
 *
 * Centralise les décisions pédagogiques simples.
 * Version V4 compatible avec la séparation :
 * - difficulté interne
 * - mode pédagogique
 * - ton de feedback
 */

import type { DifficultyLevel, StarLevel, TutorMode } from "@/lib/tutor-v4/types";

export type FeedbackTone = "encourage" | "coach" | "challenge";

export type PedagogyReason =
  | "stay"
  | "promote_after_success"
  | "downgrade_after_errors"
  | "coach_after_error";

export type PedagogyDecision = {
  nextDifficulty: DifficultyLevel;

  /**
   * Compatibilité transitoire.
   */
  nextStar: StarLevel;

  nextMode: TutorMode;
  feedbackTone: FeedbackTone;
  reason: PedagogyReason;
};

function clampDifficulty(value: number): DifficultyLevel {
  if (value <= 1) return 1;
  if (value === 2) return 2;
  if (value === 3) return 3;
  if (value === 4) return 4;
  return 5;
}

/**
 * Alias de compatibilité transitoire.
 */
function clampStar(value: number): StarLevel {
  return clampDifficulty(value);
}

export function decidePedagogy(args: {
  currentDifficulty: DifficultyLevel;
  consecutiveSuccess: number;
  consecutiveErrors: number;
}): PedagogyDecision {
  const { currentDifficulty, consecutiveSuccess, consecutiveErrors } = args;

  if (consecutiveErrors >= 2) {
    const nextDifficulty = clampDifficulty(currentDifficulty - 1);

    return {
      nextDifficulty,
      nextStar: nextDifficulty,
      nextMode: "coaching",
      feedbackTone: "coach",
      reason: "downgrade_after_errors",
    };
  }

  if (consecutiveSuccess >= 2) {
    const nextDifficulty = clampDifficulty(currentDifficulty + 1);

    return {
      nextDifficulty,
      nextStar: nextDifficulty,
      nextMode: "evaluation",
      feedbackTone: "challenge",
      reason: "promote_after_success",
    };
  }

  if (consecutiveErrors === 1) {
    return {
      nextDifficulty: currentDifficulty,
      nextStar: currentDifficulty,
      nextMode: "coaching",
      feedbackTone: "coach",
      reason: "coach_after_error",
    };
  }

  return {
    nextDifficulty: currentDifficulty,
    nextStar: currentDifficulty,
    nextMode: "evaluation",
    feedbackTone: "encourage",
    reason: "stay",
  };
}