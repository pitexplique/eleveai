import { randomUUID } from "crypto";
import { evaluateAnswer } from "@/lib/tutor/evaluator";
import { appendAudit, guardFeedback } from "@/lib/tutor/governance";
import { loadKnowledge } from "@/lib/tutor/loadKnowledge";
import { initMastery, updateMastery } from "@/lib/tutor/mastery";
import { buildQuestion } from "@/lib/tutor/questionBank";
import { createSession, getSession, saveSession } from "@/lib/tutor/sessionStore";
import type {
  KnowledgePack,
  MicroSkill,
  StudentStyle,
  TutorSession,
} from "@/lib/tutor/types";

function findNotion(pack: KnowledgePack, notionId: string) {
  return pack.notions.find((n) => n.id === notionId) ?? pack.notions[0];
}

function findMicro(pack: KnowledgePack, microId: string) {
  return pack.microSkills.find((m) => m.id === microId) ?? pack.microSkills[0];
}

function getMicroForNotion(pack: KnowledgePack, notionId: string) {
  return pack.microSkills.filter((m) => m.notionId === notionId);
}

function selectWeakestMicroInNotion(pack: KnowledgePack, notionId: string, masteryByMicro: Record<string, number>) {
  const micros = getMicroForNotion(pack, notionId);
  return (
    micros.sort((a, b) => (masteryByMicro[a.id] ?? 50) - (masteryByMicro[b.id] ?? 50))[0] ??
    pack.microSkills[0]
  );
}

function selectStrongPrereqMicro(pack: KnowledgePack, microId: string) {
  const target = findMicro(pack, microId);
  const prereqIds = target.prerequis ?? [];
  if (prereqIds.length === 0) return null;
  return findMicro(pack, prereqIds[0]);
}

export async function startTutorSession(input: {
  classe: string;
  matiere: string;
  notion: string;
  style: StudentStyle;
}) {
  const pack = await loadKnowledge(input.classe, input.matiere);
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

  const question = buildQuestion({
    micro: firstMicro,
    notionId: notion.id,
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

  if (!result.ok && session.consecutiveErrors >= 2) {
    session.mode = "coaching";
    const prereq = selectStrongPrereqMicro(pack, currentMicro.id);

    if (prereq) {
      nextMicro = prereq;
      nextNotion = findNotion(pack, prereq.notionId);
      session.microFocus = prereq.id;
      session.notionFocus = prereq.notionId;
      reason = "fallback_to_prereq_micro";
    } else {
      reason = "coaching_same_micro";
    }
  } else if (result.ok && session.consecutiveSuccess >= 2) {
    if (session.mode === "coaching") {
      session.mode = "evaluation";
      reason = "return_to_evaluation";
    } else {
      const weakest = selectWeakestMicroInNotion(pack, session.notionFocus, session.masteryByMicro);
      nextMicro = weakest;
      session.microFocus = weakest.id;
      reason = "refresh_weakest_micro_in_notion";
    }
  }

  const nextQuestion = buildQuestion({
    micro: nextMicro,
    notionId: nextNotion.id,
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