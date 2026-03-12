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
import type { TutorQuestionOption } from "@/lib/tutor-v4/types";

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

export function evaluateAnswer(option: TutorQuestionOption, answer: string) {
  return evaluateAnswerV3(option as any, answer);
}

export function guardFeedback(feedback: string, mode: "evaluation" | "coaching") {
  return guardFeedbackV3(feedback, mode);
}

export function appendAudit(session: { audit: any[] }, entry: any) {
  appendAuditV3(session as any, entry);
}