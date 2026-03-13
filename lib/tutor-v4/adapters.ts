/**
 * adapters.ts
 *
 * Pont entre la V4 et les briques V3.
 */

import { evaluateAnswer as evaluateAnswerV3 } from "@/lib/tutor/evaluation/evaluator";
import {
  appendAudit as appendAuditV3,
  guardFeedback as guardFeedbackV3,
} from "@/lib/tutor/governance/audit";
import { loadKnowledge as loadKnowledgeV3 } from "@/lib/tutor/loaders/loadKnowledge";
import { loadMatrix as loadMatrixV3 } from "@/lib/tutor/loaders/loadMatrix";
import { loadQuestionBank as loadQuestionBankV3 } from "@/lib/tutor/loaders/loadQuestionBank";
import {
  initMastery as initMasteryV3,
  updateMastery as updateMasteryV3,
} from "@/lib/tutor/mastery/mastery";
import {
  findMicro as findMicroV3,
  findNotion as findNotionV3,
  selectStrongChildMicro as selectStrongChildMicroV3,
  selectStrongPrereqMicro as selectStrongPrereqMicroV3,
  selectWeakestMicroInNotion as selectWeakestMicroInNotionV3,
} from "@/lib/tutor/selection/selector";

import type {
  AnswerEvaluation,
  TutorQuestionOption,
  TutorMode,
} from "@/lib/tutor-v4/types";

export const loadKnowledge = loadKnowledgeV3;
export const loadMatrix = loadMatrixV3;
export const loadQuestionBank = loadQuestionBankV3;

export const initMastery = initMasteryV3;
export const updateMastery = updateMasteryV3;

export const findMicro = findMicroV3;
export const findNotion = findNotionV3;
export const selectStrongChildMicro = selectStrongChildMicroV3;
export const selectStrongPrereqMicro = selectStrongPrereqMicroV3;
export const selectWeakestMicroInNotion = selectWeakestMicroInNotionV3;

function inferErrorKind(params: {
  ok: boolean;
  answer: string;
  normalizedAnswer?: string;
  flags?: string[];
}): AnswerEvaluation["errorKind"] {
  const { ok, answer, normalizedAnswer, flags = [] } = params;

  if (ok) return "none";

  const trimmed = answer.trim();

  if (!trimmed) return "incomplete";

  const lowerFlags = flags.map((f) => f.toLowerCase());

  if (
    lowerFlags.some(
      (f) =>
        f.includes("format") ||
        f.includes("fraction") ||
        f.includes("decimal") ||
        f.includes("notation")
    )
  ) {
    return "format";
  }

  if (
    normalizedAnswer &&
    trimmed !== normalizedAnswer &&
    trimmed.length <= 3
  ) {
    return "careless";
  }

  return "conceptual";
}

function inferEstimatedUnderstanding(params: {
  ok: boolean;
  confidenceFlags?: string[];
  errorKind?: AnswerEvaluation["errorKind"];
}): number {
  const { ok, confidenceFlags = [], errorKind } = params;

  if (ok) return 80;

  if (errorKind === "incomplete") return 20;
  if (errorKind === "format") return 45;
  if (errorKind === "careless") return 55;

  if (
    confidenceFlags.some((f) =>
      f.toLowerCase().includes("partial")
    )
  ) {
    return 50;
  }

  return 35;
}

export function evaluateAnswer(
  option: TutorQuestionOption,
  answer: string
): AnswerEvaluation {
  const raw = evaluateAnswerV3(option as any, answer);

  const errorKind = inferErrorKind({
    ok: raw.ok,
    answer,
    normalizedAnswer: raw.normalizedAnswer,
    flags: raw.flags,
  });

  const estimatedUnderstanding = inferEstimatedUnderstanding({
    ok: raw.ok,
    confidenceFlags: raw.flags,
    errorKind,
  });

  return {
    ok: raw.ok,
    normalizedAnswer: raw.normalizedAnswer,
    feedback: raw.feedback,
    flags: raw.flags ?? [],
    errorKind,
    estimatedUnderstanding,
  };
}

export function guardFeedback(feedback: string, mode: TutorMode) {
  return guardFeedbackV3(feedback, mode);
}

export function appendAudit(session: { audit: any[] }, entry: any) {
  appendAuditV3(session as any, entry);
}