import { randomUUID } from "crypto";
import { appendAudit } from "@/lib/tutor/governance/auditLog";
import { guardFeedback } from "@/lib/tutor/governance/outputGuard";
import { governanceMeta } from "@/lib/tutor/governance/governanceMeta";
import { loadKnowledge } from "@/lib/tutor/load/knowledgeLoader";
import { createSession, getSession, saveSession } from "@/lib/tutor/session/memoryStore";
import type { StudentStyle, TutorSession } from "@/lib/tutor/types";
import { pickInitialNotion } from "./diagnosticPlanner";
import { evaluateAnswer } from "./evaluator";
import { updateMastery, initMastery } from "./masteryModel";
import { buildQuestion } from "./promptBuilder";
import { selectStrongPrerequisite } from "./selector";

const MODEL_NAME = "deterministic-v1";
const TEMPERATURE = 0;

export async function startTutorSession(input: {
  classe: string;
  matiere: string;
  notion: string;
  style: StudentStyle;
  enigmes?: boolean;
}) {
  const { pack, graph } = await loadKnowledge(input.classe, input.matiere);
  const notion = pickInitialNotion(pack, input.notion);
  const mastery = initMastery(pack);

  const session = createSession({
    id: randomUUID(),
    createdAt: Date.now(),
    classe: input.classe,
    matiere: input.matiere,
    style: input.style,
    mode: "evaluation",
    notionFocus: notion.id,
    difficulty: 2,
    allowEnigmes: Boolean(input.enigmes),
    consecutiveErrors: 0,
    consecutiveSuccess: 0,
    knowledgePackId: pack.id,
    graphId: graph.id,
    masteryByNotion: mastery.notion,
    masteryByBo: mastery.bo,
    audit: [],
  });

  const question = buildQuestion(notion, session.difficulty, session.style, session.mode);
  session.lastQuestion = question;

  appendAudit(session, {
    at: new Date().toISOString(),
    model: MODEL_NAME,
    temperature: TEMPERATURE,
    decision: { notion: session.notionFocus, difficulty: session.difficulty, mode: session.mode, reason: "session_start" },
    guardrailFlags: [],
    governance: { knowledgePackId: pack.id, graphId: graph.id },
  });

  saveSession(session);

  return {
    sessionId: session.id,
    question,
    notionCatalog: pack.notions,
    boComp: pack.bo_competences,
    mastery: {
      boMastery: session.masteryByBo,
      notionMastery: session.masteryByNotion,
    },
    governance: governanceMeta(pack.id, graph.id),
  };
}

export async function handleTutorMessage(input: { sessionId: string; answer: string }) {
  const session = getSession(input.sessionId);
  if (!session) {
    throw new Error("Session introuvable ou expirée.");
  }

  const { pack, graph } = await loadKnowledge(session.classe, session.matiere);
  const notion = pack.notions.find((n) => n.id === session.notionFocus) ?? pack.notions[0];

  const result = evaluateAnswer(session.lastQuestion ?? buildQuestion(notion, session.difficulty, session.style, session.mode), input.answer);

  if (result.ok) {
    session.consecutiveSuccess += 1;
    session.consecutiveErrors = 0;
  } else {
    session.consecutiveErrors += 1;
    session.consecutiveSuccess = 0;
  }

  if (session.consecutiveErrors >= 2) {
    session.mode = "coaching";
    session.difficulty = Math.max(1, session.difficulty - 1);
    const prereq = selectStrongPrerequisite(session.notionFocus, graph);
    if (prereq) {
      session.notionFocus = prereq;
    }
  } else if (session.consecutiveSuccess >= 2) {
    session.difficulty = Math.min(5, session.difficulty + 1);
  }

  updateMastery(session.masteryByNotion, session.masteryByBo, notion.id, notion.boId, result.ok);

  const nextNotion = pack.notions.find((n) => n.id === session.notionFocus) ?? notion;
  const nextQuestion = buildQuestion(nextNotion, session.difficulty, session.style, session.mode);
  session.lastQuestion = nextQuestion;

  const guarded = guardFeedback(result.feedback, session.mode);
  const allFlags = [...result.flags, ...guarded.flags];

  appendAudit(session, {
    at: new Date().toISOString(),
    model: MODEL_NAME,
    temperature: TEMPERATURE,
    decision: {
      notion: session.notionFocus,
      difficulty: session.difficulty,
      mode: session.mode,
      reason: result.ok ? "success_progression" : "error_adaptation",
    },
    guardrailFlags: allFlags,
    governance: { knowledgePackId: session.knowledgePackId, graphId: session.graphId },
  });

  saveSession(session);

  return {
    feedback: guarded.text,
    result: { ok: result.ok },
    nextQuestion,
    mastery: {
      boMastery: session.masteryByBo,
      notionMastery: session.masteryByNotion,
    },
    audit: session.audit.at(-1),
  };
}

export function getSessionForDebug(sessionId: string): TutorSession | null {
  return getSession(sessionId);
}
