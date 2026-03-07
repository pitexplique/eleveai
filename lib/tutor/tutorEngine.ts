import { randomUUID } from "crypto";
import { evaluateAnswer } from "@/lib/tutor/evaluation/evaluator";
import { appendAudit, guardFeedback } from "@/lib/tutor/governance/audit";
import { loadKnowledge } from "@/lib/tutor/loaders/loadKnowledge";
import { loadQuestionBank } from "@/lib/tutor/loaders/loadQuestionBank";
import { loadMatrix } from "@/lib/tutor/loaders/loadMatrix";
import { initMastery, updateMastery } from "@/lib/tutor/mastery/mastery";
import { buildQuestionFromBank } from "@/lib/tutor/questionBank";
import {
  findMicro,
  findNotion,
  selectStrongChildMicro,
  selectStrongPrereqMicro,
  selectWeakestMicroInNotion,
} from "@/lib/tutor/selection/selector";
import { createSession, getSession, saveSession } from "@/lib/tutor/session/sessionStore";
import type { StudentStyle, TutorSession } from "@/lib/tutor/types";

export async function startTutorSession(input: {
  classe: string;
  matiere: string;
  notion: string;
  style: StudentStyle;
}) {
  const pack = await loadKnowledge(input.classe, input.matiere);
  const bank = await loadQuestionBank(input.classe, input.matiere);

  const notion = findNotion(pack, input.notion);
  const mastery = initMastery(pack);
  const firstMicro = selectWeakestMicroInNotion(pack, notion.id, mastery.micro);

  const session: TutorSession = createSession({
    id: randomUUID(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    classe: input.classe,
    matiere: input.matiere,
    style: input.style,
    mode: "evaluation",
    notionFocus: notion.id,
    microFocus: firstMicro.id,
    difficulty: 2,
    consecutiveErrors: 0,
    consecutiveSuccess: 0,
    masteryByNotion: mastery.notion,
    masteryByBo: mastery.bo,
    masteryByMicro: mastery.micro,
    knowledgePackId: pack.id,
    audit: [],
    recentQuestionIds: [],
  });

  const question = buildQuestionFromBank({
    questions: bank,
    notionId: notion.id,
    microId: firstMicro.id,
    difficulty: session.difficulty,
    style: session.style,
    mode: session.mode,
    recentQuestionIds: session.recentQuestionIds,
  });

  session.lastQuestion = question;
  session.recentQuestionIds = [question.id];

  appendAudit(session, {
    at: new Date().toISOString(),
    event: "start",
    notionId: notion.id,
    microId: firstMicro.id,
    mode: session.mode,
    difficulty: session.difficulty,
    reason: "session_start_weakest_micro",
    flags: [],
  });

  saveSession(session);

  return {
    sessionId: session.id,
    question,
    notionCatalog: pack.notions.map((n) => ({ id: n.id, label: n.label })),
    mastery: {
      boMastery: session.masteryByBo,
      notionMastery: session.masteryByNotion,
      microMastery: session.masteryByMicro,
    },
    mode: session.mode,
  };
}

export async function handleTutorMessage(input: { sessionId: string; answer: string }) {
  const session = getSession(input.sessionId);
  if (!session) {
    throw new Error("Session introuvable ou expirée.");
  }

  const pack = await loadKnowledge(session.classe, session.matiere);
  const bank = await loadQuestionBank(session.classe, session.matiere);
  const skillMatrix = await loadMatrix(session.classe, session.matiere);

  const currentQuestion = session.lastQuestion;
  if (!currentQuestion) {
    throw new Error("Question introuvable.");
  }

  const result = evaluateAnswer(currentQuestion, input.answer);
  const currentMicro = findMicro(pack, currentQuestion.microId);
  const currentNotion = findNotion(pack, currentQuestion.notionId);

  if (result.ok) {
    session.consecutiveSuccess += 1;
    session.consecutiveErrors = 0;
  } else {
    session.consecutiveErrors += 1;
    session.consecutiveSuccess = 0;
  }

  updateMastery({
    notionMastery: session.masteryByNotion,
    boMastery: session.masteryByBo,
    microMastery: session.masteryByMicro,
    notionId: currentNotion.id,
    boId: currentNotion.boId,
    microId: currentMicro.id,
    ok: result.ok,
  });

  let nextMicro = currentMicro;
  let nextNotion = currentNotion;
  let reason = "continue_same_micro";

  // Cas 1 : l'élève bloque => on remonte au parent le plus fort via la matrice
  if (!result.ok && session.consecutiveErrors >= 2) {
    session.mode = "coaching";

    const prereq = selectStrongPrereqMicro(pack, skillMatrix, currentMicro.id);

    if (prereq) {
      nextMicro = prereq;
      nextNotion = findNotion(pack, prereq.notionId);
      session.microFocus = prereq.id;
      session.notionFocus = prereq.notionId;
      reason = "fallback_to_matrix_parent";
    } else {
      reason = "coaching_same_micro";
    }
  }
  // Cas 2 : l'élève réussit bien => on peut proposer un enfant fort ou le plus faible de la notion
  else if (result.ok && session.consecutiveSuccess >= 2) {
    if (session.mode === "coaching") {
      session.mode = "evaluation";
      reason = "return_to_evaluation";
    }

    const child = selectStrongChildMicro(pack, skillMatrix, currentMicro.id);

    if (child && child.notionId === session.notionFocus) {
      nextMicro = child;
      nextNotion = findNotion(pack, child.notionId);
      session.microFocus = child.id;
      reason = "advance_to_matrix_child";
    } else {
      const weakest = selectWeakestMicroInNotion(
        pack,
        session.notionFocus,
        session.masteryByMicro
      );
      nextMicro = weakest;
      nextNotion = findNotion(pack, weakest.notionId);
      session.microFocus = weakest.id;
      reason = "refresh_weakest_micro_in_notion";
    }
  }

  const nextQuestion = buildQuestionFromBank({
    questions: bank,
    notionId: nextNotion.id,
    microId: nextMicro.id,
    difficulty: session.difficulty,
    style: session.style,
    mode: session.mode,
    recentQuestionIds: session.recentQuestionIds,
  });

  session.lastQuestion = nextQuestion;
  session.updatedAt = Date.now();
  session.recentQuestionIds = [...session.recentQuestionIds.slice(-4), nextQuestion.id];

  const guarded = guardFeedback(result.feedback, session.mode);
  const flags = [...(result.flags ?? []), ...guarded.flags];

  appendAudit(session, {
    at: new Date().toISOString(),
    event: "turn",
    notionId: nextNotion.id,
    microId: nextMicro.id,
    mode: session.mode,
    difficulty: session.difficulty,
    reason,
    flags,
  });

  saveSession(session);

  return {
    feedback: guarded.text,
    result: { ok: result.ok, flags },
    nextQuestion,
    mastery: {
      boMastery: session.masteryByBo,
      notionMastery: session.masteryByNotion,
      microMastery: session.masteryByMicro,
    },
    mode: session.mode,
  };
}