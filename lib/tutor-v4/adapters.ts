/**
 * adapters.ts
 *
 * Pont entre la V4 et certaines briques encore réutilisées.
 * La questionBank, elle, vient désormais de tutor-v4.
 */

import { evaluateAnswer as evaluateAnswerV3 } from "@/lib/tutor/evaluation/evaluator";
import { guardFeedback as guardFeedbackV3 } from "@/lib/tutor/governance/audit";
import { loadKnowledgeV4 } from "@/lib/tutor-v4/loaders/loadKnowledgeV4";
import { loadMatrixV4 } from "@/lib/tutor-v4/loaders/loadMatrixV4";

import {
  initMastery as initMasteryV3,
  updateMastery as updateMasteryV3,
} from "@/lib/tutor/mastery/mastery";

import {
  findMicro as findMicroV3,
  findNotion as findNotionV3,
  selectWeakestMicroInNotion as selectWeakestMicroInNotionV3,
} from "@/lib/tutor/selection/selector";

import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";

import type {
  TutorQuestionOption,
  TutorBankItemV4,
  TutorMode,
  ErrorKind,
} from "@/lib/tutor-v4/types";

/**
 * On réexporte les fonctions V3 qui restent compatibles.
 */

export const loadKnowledge = loadKnowledgeV4;
export const loadMatrix = loadMatrixV4;
export const loadQuestionBank = loadQuestionBankV4;

export const initMastery = initMasteryV3;
export const updateMastery = updateMasteryV3;

export const findMicro = findMicroV3;
export const findNotion = findNotionV3;
export const selectWeakestMicroInNotion = selectWeakestMicroInNotionV3;

/**
 * Typage du résultat V4 attendu par le moteur.
 */

type EvaluateAnswerV4Result = {
  ok: boolean;
  normalizedAnswer: string;
  feedback: string;
  flags: string[];
  errorKind: ErrorKind;
  estimatedUnderstanding: number;
};

/**
 * Adapter V3 → V4 pour l'évaluation.
 */

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

/**
 * Adapter du système de garde du feedback.
 */

export function guardFeedback(feedback: string, mode: TutorMode) {
  return guardFeedbackV3(feedback, mode);
}

/**
 * Réexport du type utilisé par la questionBank V4
 */

export type { TutorBankItemV4 };