/**
 * tutorEngineV4.ts
 *
 * Cœur du tuteur intelligent V4.
 * Version de transition vers le modèle "étoiles cachées" :
 * - le moteur continue de raisonner avec une difficulté interne
 * - l’élève reçoit surtout une progression visible simple et motivante
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
  HiddenStarState,
  HiddenStarId,
  VisibleProgress,
  LearnerProfile,
  DifficultyLevel,
  StarLevel,
} from "@/lib/tutor-v4/types";

function createDefaultLearnerProfile(): LearnerProfile {
  return {
    preferences: {
      challengePreference: 50,
      guidancePreference: 50,
      shortTextPreference: 50,
      reunionThemePreference: 50,
      sportThemePreference: 50,
      cuisineThemePreference: 50,
      jeuxVideoThemePreference: 50,
    },
    pedagogy: {
      confidenceCalibration: 0,
      estimatedAutonomy: 50,
      estimatedNeedForSupport: 50,
      estimatedPersistence: 50,
    },
  };
}

function createDefaultHiddenStars(): HiddenStarState[] {
  return [
    {
      id: "starter",
      label: "Étoile de départ",
      description: "Tu as démarré ta progression.",
      unlocked: false,
    },
    {
      id: "confidence",
      label: "Étoile de confiance",
      description: "Tu progresses avec assurance.",
      unlocked: false,
    },
    {
      id: "regularity",
      label: "Étoile de régularité",
      description: "Tu réussis plusieurs étapes d’affilée.",
      unlocked: false,
    },
    {
      id: "autonomy",
      label: "Étoile d’autonomie",
      description: "Tu avances avec moins d’aide.",
      unlocked: false,
    },
    {
      id: "precision",
      label: "Étoile de précision",
      description: "Tes réponses deviennent plus justes.",
      unlocked: false,
    },
    {
      id: "perseverance",
      label: "Étoile de persévérance",
      description: "Tu continues malgré les difficultés.",
      unlocked: false,
    },
    {
      id: "theme_explorer",
      label: "Étoile d’exploration",
      description: "Tu explores plusieurs univers de questions.",
      unlocked: false,
    },
    {
      id: "micro_mastery",
      label: "Étoile de maîtrise",
      description: "Une micro-compétence commence à être bien maîtrisée.",
      unlocked: false,
    },
  ];
}

function createInitialVisibleProgress(): VisibleProgress {
  return {
    unlockedStars: [],
    lastUnlockedStar: undefined,
    encouragement: "Bienvenue. On avance étape par étape.",
    streak: 0,
    sessionStep: 0,
  };
}

function unlockHiddenStar(
  session: TutorSessionV4,
  starId: HiddenStarId,
  reason: string
): HiddenStarState | undefined {
  const star = session.hiddenStars.find((s) => s.id === starId);
  if (!star || star.unlocked) {
    return undefined;
  }

  star.unlocked = true;
  star.unlockedAt = Date.now();

  session.visibleProgress.unlockedStars = session.hiddenStars.filter(
    (s) => s.unlocked
  );
  session.visibleProgress.lastUnlockedStar = star;

  session.audit.push({
    at: new Date().toISOString(),
    event: "hidden_star_unlocked",
    notionId: session.notionFocus,
    microId: session.microFocus,
    mode: session.mode,
    reason,
    flags: [],
  });

  return star;
}

function refreshVisibleProgress(
  session: TutorSessionV4,
  params: {
    success: boolean;
    confidenceLevel?: 1 | 2 | 3;
    usedHint: boolean;
  }
): void {
  let lastUnlocked: HiddenStarState | undefined;

  if (session.turnCount === 0) {
    lastUnlocked =
      unlockHiddenStar(session, "starter", "Première étape lancée.") ??
      lastUnlocked;
  }

  if (session.consecutiveSuccess >= 2) {
    lastUnlocked =
      unlockHiddenStar(
        session,
        "regularity",
        "Plusieurs réussites consécutives."
      ) ?? lastUnlocked;
  }

  if (params.success && params.confidenceLevel === 3) {
    lastUnlocked =
      unlockHiddenStar(
        session,
        "confidence",
        "Réussite avec forte confiance déclarée."
      ) ?? lastUnlocked;
  }

  if (params.success && !params.usedHint) {
    lastUnlocked =
      unlockHiddenStar(
        session,
        "autonomy",
        "Réussite sans aide explicite."
      ) ?? lastUnlocked;
  }

  if (!params.success && session.consecutiveErrors >= 2) {
    lastUnlocked =
      unlockHiddenStar(
        session,
        "perseverance",
        "L’élève continue malgré plusieurs erreurs."
      ) ?? lastUnlocked;
  }

  const currentMicroMastery = session.masteryByMicro[session.microFocus] ?? 0;
  if (currentMicroMastery >= 0.7) {
    lastUnlocked =
      unlockHiddenStar(
        session,
        "micro_mastery",
        "Micro-compétence en progression solide."
      ) ?? lastUnlocked;
  }

  session.visibleProgress.unlockedStars = session.hiddenStars.filter(
    (s) => s.unlocked
  );
  session.visibleProgress.lastUnlockedStar = lastUnlocked;
  session.visibleProgress.streak = session.consecutiveSuccess;
  session.visibleProgress.sessionStep = session.turnCount;

  if (lastUnlocked) {
    session.visibleProgress.encouragement = `⭐ ${lastUnlocked.label} débloquée !`;
    return;
  }

  if (params.success) {
    session.visibleProgress.encouragement =
      session.mode === "coaching"
        ? "Bien joué. On consolide encore un peu."
        : "Bravo, tu progresses bien.";
    return;
  }

  session.visibleProgress.encouragement =
    session.mode === "coaching"
      ? "On reprend calmement avec un peu plus d’aide."
      : "Ce n’est pas grave. On ajuste la suite.";
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

function getDifficultyFromOption(option: TutorQuestionOption): DifficultyLevel {
  return option.meta.difficulty ?? option.meta.starLevel;
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

  const recommendedDifficulty: DifficultyLevel = 2;
  const recommendedStar: StarLevel = recommendedDifficulty;

  const rawPair = buildQuestionPair({
    bank,
    notionId: notion.id,
    microId: firstMicro.id,
    recommendedStar,
    recentQuestionIds: [],
  });

  const pair = {
    ...rawPair,
    recommendedDifficulty,
    recommendedStar,
  };

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

    recommendedDifficulty,
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

    hiddenStars: createDefaultHiddenStars(),
    visibleProgress: createInitialVisibleProgress(),

    recentQuestionIds: [pair.optionA.id, pair.optionB.id],
    attempts: [],

    knowledgePackId: knowledge.id,
    audit: [
      {
        at: new Date().toISOString(),
        event: "start",
        notionId: notion.id,
        microId: firstMicro.id,
        pairId: pair.pairId,
        mode: "evaluation",
        reason: "Démarrage de la session V4.",
        flags: [],
      },
    ],
  };

  refreshVisibleProgress(session, {
    success: false,
    usedHint: false,
  });

  createSessionV4(session);

  return {
    sessionId: session.id,
    pair,
    mode: session.mode,
    recommendedStar: session.recommendedStar,
    recommendedDifficulty: session.recommendedDifficulty,
    notionCatalog: knowledge.notions.map((n: any) => ({
      id: n.id,
      label: n.label,
    })),
    visibleProgress: session.visibleProgress,
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

  const chosenDifficulty = getDifficultyFromOption(chosenOption);

  session.currentChoice = {
    pairId: session.currentPair.pairId,
    chosenOptionId: chosenOption.id,
    chosenDifficulty,
    chosenStar: chosenOption.meta.starLevel,
    chosenTheme: chosenOption.meta.theme,
    chosenAt: Date.now(),
  };

  session.turnStartedAt = Date.now();
  session.updatedAt = Date.now();

  session.audit.push({
    at: new Date().toISOString(),
    event: "question_chosen",
    notionId: chosenOption.notionId,
    microId: chosenOption.microId,
    pairId: session.currentPair.pairId,
    optionId: chosenOption.id,
    difficulty: chosenDifficulty,
    starLevel: chosenOption.meta.starLevel,
    mode: session.mode,
    reason: "Choix d’une question par l’élève.",
    flags: [],
  });

  saveSessionV4(session);

  return {
    ok: true,
    selectedOptionId: chosenOption.id,
    selectedDifficulty: chosenDifficulty,
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
  session.updatedAt = Date.now();

  session.audit.push({
    at: new Date().toISOString(),
    event: "confidence_declared",
    notionId: session.notionFocus,
    microId: session.microFocus,
    pairId: session.currentPair?.pairId,
    optionId: session.currentChoice?.chosenOptionId,
    difficulty: session.currentChoice?.chosenDifficulty,
    starLevel: session.currentChoice?.chosenStar,
    mode: session.mode,
    reason: `Confiance déclarée : ${level}`,
    flags: [],
  });

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
  const chosenDifficulty = getDifficultyFromOption(chosenOption);

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
    session.mode =
      session.consecutiveErrorsSameStar >= 1 ? "coaching" : "evaluation";
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
  session.recommendedDifficulty = starUpdate.nextDifficulty;

  updateLearnerProfile({
    profile: session.learnerProfile,
    choice: session.currentChoice!,
    confidence: confidenceLevel,
    success: result.ok,
  });

  session.lastHintUsed = session.mode === "coaching";

  const guarded = guardFeedback(result.feedback, session.mode);

  session.turnCount += 1;
  session.updatedAt = Date.now();

  session.attempts.push({
    turnIndex: session.turnCount,
    pairId: session.currentPair!.pairId,
    chosenOptionId: chosenOption.id,
    notionId: chosenOption.notionId,
    microId: chosenOption.microId,
    difficulty: chosenDifficulty,
    starLevel: chosenOption.meta.starLevel,
    theme: chosenOption.meta.theme,
    confidence: confidenceLevel,
    answer,
    result: {
      ok: result.ok,
      normalizedAnswer: result.normalizedAnswer,
      feedback: result.feedback,
      flags: result.flags,
      errorKind: result.errorKind,
      estimatedUnderstanding: result.estimatedUnderstanding,
    },
    usedHint: session.lastHintUsed,
    startedAt: session.turnStartedAt ?? Date.now(),
    answeredAt: Date.now(),
    durationMs: Math.max(0, Date.now() - (session.turnStartedAt ?? Date.now())),
  });

  session.audit.push({
    at: new Date().toISOString(),
    event: "answer_submitted",
    notionId: chosenOption.notionId,
    microId: chosenOption.microId,
    pairId: session.currentPair?.pairId,
    optionId: chosenOption.id,
    difficulty: chosenDifficulty,
    starLevel: chosenOption.meta.starLevel,
    mode: session.mode,
    reason: result.ok ? "Réponse correcte." : "Réponse incorrecte.",
    flags: [...result.flags, ...guarded.flags],
  });

  refreshVisibleProgress(session, {
    success: result.ok,
    confidenceLevel,
    usedHint: session.lastHintUsed,
  });

  const nextPairRaw = buildQuestionPair({
    bank,
    notionId: session.notionFocus,
    microId: session.microFocus,
    recommendedStar: session.recommendedStar,
    recentQuestionIds: session.recentQuestionIds,
  });

  const nextPair = {
    ...nextPairRaw,
    recommendedDifficulty: session.recommendedDifficulty,
    recommendedStar: session.recommendedStar,
  };

  session.currentPair = nextPair;
  session.recentQuestionIds = [
    ...session.recentQuestionIds.slice(-8),
    nextPair.optionA.id,
    nextPair.optionB.id,
  ];

  session.currentChoice = undefined;
  session.currentConfidence = undefined;
  session.turnStartedAt = Date.now();

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
    recommendedDifficulty: session.recommendedDifficulty,
    visibleProgress: session.visibleProgress,
    mastery: {
      boMastery: session.masteryByBo,
      notionMastery: session.masteryByNotion,
      microMastery: session.masteryByMicro,
    },
  };
}