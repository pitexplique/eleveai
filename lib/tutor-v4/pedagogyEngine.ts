/**
 * pedagogyEngine.ts
 *
 * Centralise des décisions pédagogiques simples.
 */

import type { StarLevel, TutorMode } from "@/lib/tutor-v4/types";

export type PedagogyDecision = {
  nextStar: StarLevel;
  nextMode: TutorMode;
  feedbackTone: "encourage" | "coach" | "challenge";
  reason:
    | "stay"
    | "promote_after_success"
    | "downgrade_after_errors"
    | "coach_after_error";
};

function clampStar(value: number): StarLevel {
  return Math.max(1, Math.min(5, value)) as StarLevel;
}

export function decidePedagogy(args: {
  currentStar: StarLevel;
  consecutiveSuccess: number;
  consecutiveErrors: number;
}): PedagogyDecision {
  const { currentStar, consecutiveSuccess, consecutiveErrors } = args;

  if (consecutiveErrors >= 2) {
    return {
      nextStar: clampStar(currentStar - 1),
      nextMode: "coaching",
      feedbackTone: "coach",
      reason: "downgrade_after_errors",
    };
  }

  if (consecutiveSuccess >= 2) {
    return {
      nextStar: clampStar(currentStar + 1),
      nextMode: "evaluation",
      feedbackTone: "challenge",
      reason: "promote_after_success",
    };
  }

  if (consecutiveErrors === 1) {
    return {
      nextStar: currentStar,
      nextMode: "coaching",
      feedbackTone: "coach",
      reason: "coach_after_error",
    };
  }

  return {
    nextStar: currentStar,
    nextMode: "evaluation",
    feedbackTone: "encourage",
    reason: "stay",
  };
}