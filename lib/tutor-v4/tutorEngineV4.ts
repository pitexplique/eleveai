/**
 * tutorEngineV4.ts
 *
 * Cœur du tuteur intelligent V4.
 */

import { randomUUID } from "crypto";

import {
  createSessionV4,
  getSessionV4,
  saveSessionV4,
} from "@/lib/tutor-v4/sessionStoreV4";

import { updateStarLevel } from "@/lib/tutor-v4/starEngine";
import { updateLearnerProfile } from "@/lib/tutor-v4/profileEngine";
import { buildQuestionPair } from "@/lib/tutor-v4/questionPairBuilder";

import {
  loadKnowledge,
  loadMatrix,
  loadQuestionBank,
  initMastery,
  updateMastery,
  findMicro,
  findNotion,
  selectWeakestMicroInNotion,
  evaluateAnswer,
  guardFeedback,
} from "@/lib/tutor-v4/adapters";

import type {
  StartTutorV4Input,
  StartTutorV4Response,
  TutorSessionV4,
  AnswerTutorV4Response,
  TutorQuestionOption,
  StarLevel,
} from "@/lib/tutor-v4/types";

function createDefaultLearnerProfile() {
  return {
    challengePreference: 50,
    guidanceNeed: 50,
    shortTextPreference: 50,
    reunionThemePreference: 50,
    sportThemePreference: 50,
    cuisineThemePreference: 50,
    jeuxVideoThemePreference: 50,
    confidenceCalibration: 0,
  };
}

function getChosenOption(session: TutorSessionV4): TutorQuestionOption {
  if (!session.currentPair || !session.currentChoice) {
    throw new Error("Aucune question choisie.");
  }

  if (session.currentPair.optionA.id === session.currentChoice.chosenOptionId) {
    return session.currentPair.optionA;
  }

  if (session.currentPair.optionB.id === session.currentChoice.chosenOptionId) {
    return session.currentPair.optionB;
  }

  throw new Error("Option choisie introuvable.");
}

export async function startTutorSessionV4(
  input: StartTutorV4Input
): Promise<StartTutorV4Response> {
  const knowledge = await loadKnowledge(input.classe, input.matiere);
  await loadMatrix(input.classe, input.matiere);
  const bank = await loadQuestionBank(input.classe, input.matiere);

  if (!bank || !Array.isArray(bank)) {
    throw new Error("La questionBank n'a pas été chargée correctement.");
  }

  const mastery = initMastery(knowledge);

  const notion = findNotion(knowledge, input.notion);
  if (!notion) {
    throw new Error("Notion inconnue");
  }

  const firstMicro = selectWeakestMicroInNotion(
    knowledge,
    notion.id,
    mastery.micro
  );

  if (!firstMicro) {
    throw new Error("Aucune micro-compétence trouvée.");
  }

  const recommendedStar: StarLevel = 2;

  const pair = buildQuestionPair({
    bank,
    notionId: notion.id,
    microId: firstMicro.id,
    recommendedStar,
    recentQuestionIds: [],
  });

  const session: TutorSessionV4 = {
    id: randomUUID(),
    createdAt: Date.now(),
    updatedAt: Date.now(),

    classe: input.classe,
    matiere: input.matiere,
    style: input.style,
    mode: "evaluation",

    notionFocus: notion.id,
    microFocus: firstMicro.id,

    recommendedStar,
    currentPair: pair,
    currentChoice: undefined,
    currentConfidence: undefined,

    consecutiveErrors: 0,
    consecutiveSuccess: 0,
    consecutiveErrorsSameStar: 0,

    lastHintUsed: false,
    turnCount: 0,
    turnStartedAt: Date.now(),

    masteryByNotion: mastery.notion,
    masteryByBo: mastery.bo,
    masteryByMicro: mastery.micro,

    learnerProfile: createDefaultLearnerProfile(),

    recentQuestionIds: [pair.optionA.id, pair.optionB.id],
    attempts: [],

    knowledgePackId: knowledge.id,
    audit: [],
  };

  createSessionV4(session);

  return {
    sessionId: session.id,
    pair,
    mode: session.mode,
    recommendedStar,
    notionCatalog: knowledge.notions.map((n: any) => ({
      id: n.id,
      label: n.label,
    })),
    mastery: {
      boMastery: session.masteryByBo,
      notionMastery: session.masteryByNotion,
      microMastery: session.masteryByMicro,
    },
  };
}

export function chooseQuestionV4(sessionId: string, optionId: string) {
  const session = getSessionV4(sessionId);

  if (!session) {
    throw new Error("Session introuvable");
  }

  if (!session.currentPair) {
    throw new Error("Aucune paire de questions active");
  }

  const chosenOption =
    session.currentPair.optionA.id === optionId
      ? session.currentPair.optionA
      : session.currentPair.optionB.id === optionId
      ? session.currentPair.optionB
      : null;

  if (!chosenOption) {
    throw new Error("Option choisie invalide");
  }

  session.currentChoice = {
    pairId: session.currentPair.pairId,
    chosenOptionId: chosenOption.id,
    chosenStar: chosenOption.meta.starLevel,
    chosenTheme: chosenOption.meta.theme,
    chosenAt: Date.now(),
  };

  session.turnStartedAt = Date.now();

  saveSessionV4(session);

  return {
    ok: true,
    selectedOptionId: chosenOption.id,
    selectedStar: chosenOption.meta.starLevel,
    selectedTheme: chosenOption.meta.theme,
  };
}

export function recordConfidenceV4(sessionId: string, level: 1 | 2 | 3) {
  const session = getSessionV4(sessionId);

  if (!session) {
    throw new Error("Session introuvable");
  }

  session.currentConfidence = {
    level,
    declaredAt: Date.now(),
  };

  saveSessionV4(session);

  return { ok: true };
}

export async function answerTutorV4(
  sessionId: string,
  answer: string
): Promise<AnswerTutorV4Response> {
  const session = getSessionV4(sessionId);

  if (!session) {
    throw new Error("Session introuvable");
  }

  const confidenceLevel = session.currentConfidence?.level;
  const chosenOption = getChosenOption(session);
  const result = evaluateAnswer(chosenOption, answer);

  const knowledge = await loadKnowledge(session.classe, session.matiere);
  const bank = await loadQuestionBank(session.classe, session.matiere);

  if (!bank || !Array.isArray(bank)) {
    throw new Error("La questionBank n'a pas été chargée correctement.");
  }

  const currentNotion = findNotion(knowledge, chosenOption.notionId);
  const currentMicro = findMicro(knowledge, chosenOption.microId);

  if (!currentNotion || !currentMicro) {
    throw new Error("Notion ou micro-compétence introuvable.");
  }

  if (result.ok) {
    session.consecutiveSuccess += 1;
    session.consecutiveErrors = 0;
    session.consecutiveErrorsSameStar = 0;
    session.mode = "evaluation";
  } else {
    session.consecutiveErrors += 1;
    session.consecutiveSuccess = 0;
    session.consecutiveErrorsSameStar += 1;
    session.mode = session.consecutiveErrorsSameStar >= 1 ? "coaching" : "evaluation";
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

  const starUpdate = updateStarLevel({
    currentStar: session.recommendedStar,
    consecutiveSuccess: session.consecutiveSuccess,
    consecutiveErrors: session.consecutiveErrors,
  });

  session.recommendedStar = starUpdate.nextStar;

  updateLearnerProfile({
    profile: session.learnerProfile,
    choice: session.currentChoice!,
    confidence: confidenceLevel,
    success: result.ok,
  });

  const nextPair = buildQuestionPair({
    bank,
    notionId: session.notionFocus,
    microId: session.microFocus,
    recommendedStar: session.recommendedStar,
    recentQuestionIds: session.recentQuestionIds,
  });

  session.currentPair = nextPair;
  session.updatedAt = Date.now();
  session.turnCount += 1;
  session.lastHintUsed = session.mode === "coaching";

  session.recentQuestionIds = [
    ...session.recentQuestionIds.slice(-8),
    nextPair.optionA.id,
    nextPair.optionB.id,
  ];

  const guarded = guardFeedback(result.feedback, session.mode);

  session.attempts.push({
    turnIndex: session.turnCount,
    pairId: nextPair.pairId,
    chosenOptionId: chosenOption.id,
    notionId: chosenOption.notionId,
    microId: chosenOption.microId,
    starLevel: chosenOption.meta.starLevel,
    theme: chosenOption.meta.theme,
    confidence: confidenceLevel,
    answer,
    result: {
      ok: result.ok,
      normalizedAnswer: result.normalizedAnswer,
      feedback: result.feedback,
      flags: [...result.flags, ...guarded.flags],
    },
    usedHint: session.lastHintUsed,
    startedAt: session.turnStartedAt ?? Date.now(),
    answeredAt: Date.now(),
    durationMs: Math.max(0, Date.now() - (session.turnStartedAt ?? Date.now())),
  });

  session.currentChoice = undefined;
  session.currentConfidence = undefined;

  saveSessionV4(session);

  return {
    feedback: guarded.text,
    result: {
      ok: result.ok,
      flags: [...result.flags, ...guarded.flags],
    },
    pair: nextPair,
    mode: session.mode,
    recommendedStar: session.recommendedStar,
    mastery: {
      boMastery: session.masteryByBo,
      notionMastery: session.masteryByNotion,
      microMastery: session.masteryByMicro,
    },
  };
}