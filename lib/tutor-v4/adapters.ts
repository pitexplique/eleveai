/**
 * adapters.ts
 *
 * Pont entre la V4 et certaines briques encore réutilisées.
 * Le contenu (knowledge, matrix, questionBank, selection) vient désormais de tutor-v4.
 */

import { evaluateAnswer as evaluateAnswerV3 } from "@/lib/tutor/evaluation/evaluator";
import { guardFeedback as guardFeedbackV3 } from "@/lib/tutor/governance/audit";

import {
  initMastery as initMasteryV3,
  updateMastery as updateMasteryV3,
} from "@/lib/tutor/mastery/mastery";

import { loadKnowledgeV4 } from "@/lib/tutor-v4/loaders/loadKnowledgeV4";
import { loadMatrixV4 } from "@/lib/tutor-v4/loaders/loadMatrixV4";
import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";

import {
  findMicro as findMicroV4,
  findNotion as findNotionV4,
  selectWeakestMicroInNotion as selectWeakestMicroInNotionV4,
  selectStrongPrereqMicro as selectStrongPrereqMicroV4,
  selectStrongChildMicro as selectStrongChildMicroV4,
} from "@/lib/tutor-v4/selection/selector";

import type {
  TutorQuestionOption,
  TutorBankItemV4,
  TutorMode,
  ErrorKind,
} from "@/lib/tutor-v4/types";

export const loadKnowledge = loadKnowledgeV4;
export const loadMatrix = loadMatrixV4;
export const loadQuestionBank = loadQuestionBankV4;

export const initMastery = initMasteryV3;
export const updateMastery = updateMasteryV3;

export const findMicro = findMicroV4;
export const findNotion = findNotionV4;
export const selectWeakestMicroInNotion = selectWeakestMicroInNotionV4;
export const selectStrongPrereqMicro = selectStrongPrereqMicroV4;
export const selectStrongChildMicro = selectStrongChildMicroV4;

type EvaluateAnswerV4Result = {
  ok: boolean;
  normalizedAnswer: string;
  feedback: string;
  flags: string[];
  errorKind: ErrorKind;
  estimatedUnderstanding: number;
};

export function evaluateAnswer(
  option: TutorQuestionOption,
  answer: string
): EvaluateAnswerV4Result {
  const result = evaluateAnswerV3(option as any, answer);

  const errorKind: ErrorKind = result.ok ? "none" : "incomplete";
  const estimatedUnderstanding = result.ok ? 80 : 35;

  return {
    ok: result.ok,
    normalizedAnswer: result.normalizedAnswer,
    feedback: result.feedback,
    flags: result.flags,
    errorKind,
    estimatedUnderstanding,
  };
}

export function guardFeedback(feedback: string, mode: TutorMode) {
  return guardFeedbackV3(feedback, mode);
}

export type { TutorBankItemV4 };