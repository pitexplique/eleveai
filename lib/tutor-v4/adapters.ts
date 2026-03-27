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
  KnowledgePack,
} from "@/lib/tutor-v4/types";

export const loadKnowledge = loadKnowledgeV4;
export const loadMatrix = loadMatrixV4;
export const loadQuestionBank = loadQuestionBankV4;

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

type LegacyEvaluatorQuestion = {
  id: string;
  text: string;
  format: "short" | "qcm";
  choices?: string[];
  expected: string[];
  comparator:
    | "exact_text"
    | "mcq_exact"
    | "number_equal"
    | "fraction_decimal_equivalent"
    | "contains_keyword";
  hint?: string;
};

function toLegacyEvaluatorQuestion(
  option: TutorQuestionOption
): LegacyEvaluatorQuestion {
  return {
    id: option.id,
    text: option.text,
    format: option.format,
    choices: option.choices,
    expected: option.expected,
    comparator: option.comparator,
    hint: option.hint,
  };
}

/**
 * Adaptation V4 -> format attendu par la mastery V3.
 * La V3 attend :
 * - notions[]
 * - bo_competences[]
 * - microSkills[]
 */
function toLegacyKnowledgeForMastery(pack: KnowledgePack) {
  return {
    id: pack.id,
    classe: pack.classe,
    matiere: pack.matiere,
    bo_competences: pack.bo_competences.map((c) => ({
      boId: c.boId,
      label: c.label,
    })),
    notions: pack.notions.map((n) => ({
      id: n.id,
      label: n.label,
      boId: n.boId,
      prerequis: n.prerequis,
      microTargets: n.microTargets,
      levels: n.levels,
    })),
    microSkills: pack.microSkills.map((m) => ({
      id: m.id,
      label: m.label,
      notionId: m.notionId,
      boId: m.boId,
      prerequis: m.prerequis,
    })),
  };
}

export function initMastery(pack: KnowledgePack) {
  return initMasteryV3(toLegacyKnowledgeForMastery(pack) as any);
}

export const updateMastery = updateMasteryV3;

export function evaluateAnswer(
  option: TutorQuestionOption,
  answer: string
): EvaluateAnswerV4Result {
  const legacyQuestion = toLegacyEvaluatorQuestion(option);
  const result = evaluateAnswerV3(legacyQuestion as any, answer);

  const errorKind: ErrorKind = result.ok ? "none" : "incomplete";
  const estimatedUnderstanding = result.ok ? 80 : 35;

  return {
    ok: result.ok,
    normalizedAnswer: result.normalizedAnswer ?? answer.trim(),
    feedback: result.feedback,
    flags: result.flags ?? [],
    errorKind,
    estimatedUnderstanding,
  };
}

export function guardFeedback(feedback: string, mode: TutorMode) {
  return guardFeedbackV3(feedback, mode);
}

export type { TutorBankItemV4 };