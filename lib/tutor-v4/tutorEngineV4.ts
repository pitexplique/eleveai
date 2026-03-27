/**
 * tutorEngineV4.ts
 *
 * Cœur du tuteur intelligent V4.
 * Version simplifiée :
 * - plus de choix manuel dys / standard / challenge
 * - plus de confiance déclarée côté élève
 * - progression pilotée par les réponses et la difficulté interne
 *
 * NOTE canvas :
 * Le moteur n'a pas besoin de logique spéciale pour les figures.
 * Il transporte simplement les questions construites par buildQuestionPair,
 * y compris leur éventuel champ `canvas`.
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
  selectStrongPrereqMicro,
  selectStrongChildMicro,
  evaluateAnswer,
  guardFeedback,
} from "@/lib/tutor-v4/adapters";

import type {
  StartTutorV4Input,
  StartTutorV4Response,
  TutorSessionV4,
  AnswerTutorV4Response,
  TutorQuestionOption,
  TutorQuestionPair,
  HiddenStarState,
  HiddenStarId,
  VisibleProgress,
  LearnerProfile,
  DifficultyLevel,
  StarLevel,
  ErrorKind,
  KnowledgePack,
  KnowledgeMicroSkill,
  SkillMatrix,
  TutorBankItemV4,
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
    encouragement: "Choisis une question pour commencer.",
    streak: 0,
    sessionStep: 0,
  };
}

function normalizeErrorKind(value: unknown): ErrorKind {
  if (
    value === "none" ||
    value === "careless" ||
    value === "conceptual" ||
    value === "format" ||
    value === "incomplete"
  ) {
    return value;
  }

  return "none";
}

function normalizeEstimatedUnderstanding(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined;
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
    usedHint: boolean;
  }
): void {
  let lastUnlocked: HiddenStarState | undefined;

  if (session.turnCount >= 1 && session.attempts.length >= 1) {
    lastUnlocked =
      unlockHiddenStar(session, "starter", "Première réponse envoyée.") ??
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

  if (session.consecutiveSuccess >= 3) {
    lastUnlocked =
      unlockHiddenStar(
        session,
        "confidence",
        "Réussites régulières sur plusieurs questions."
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

/**
 * Essaie de construire une paire pour une micro-compétence.
 * Si la banque est insuffisante, renvoie null au lieu de planter.
 */
function tryBuildPair(args: {
  bank: TutorBankItemV4[];
  notionId: string;
  microId: string;
  recommendedStar: StarLevel;
  recentQuestionIds: string[];
}): TutorQuestionPair | null {
  try {
    return buildQuestionPair(args);
  } catch {
    return null;
  }
}

/**
 * Cherche une micro suivante dans la même notion si la micro courante
 * n'a pas assez de questions.
 */
function findNextAvailableMicroInNotion(args: {
  knowledge: KnowledgePack;
  matrix: SkillMatrix;
  bank: TutorBankItemV4[];
  notionId: string;
  currentMicroId: string;
  masteryByMicro: Record<string, number>;
  recommendedStar: StarLevel;
  recentQuestionIds: string[];
}): { micro: KnowledgeMicroSkill; pair: TutorQuestionPair } | null {
  const {
    knowledge,
    matrix,
    bank,
    notionId,
    currentMicroId,
    masteryByMicro,
    recommendedStar,
    recentQuestionIds,
  } = args;

  const candidates: KnowledgeMicroSkill[] = [];
  const seen = new Set<string>();

  const pushCandidate = (m: KnowledgeMicroSkill | null | undefined) => {
    if (!m) return;
    if (m.notionId !== notionId) return;
    if (seen.has(m.id)) return;
    seen.add(m.id);
    candidates.push(m);
  };

  pushCandidate(selectStrongChildMicro(knowledge, matrix, currentMicroId));
  pushCandidate(selectStrongPrereqMicro(knowledge, matrix, currentMicroId));

  const notionMicros = knowledge.microSkills
    .filter((m) => m.notionId === notionId && m.id !== currentMicroId)
    .sort((a, b) => (masteryByMicro[a.id] ?? 50) - (masteryByMicro[b.id] ?? 50));

  for (const m of notionMicros) {
    pushCandidate(m);
  }

  for (const micro of candidates) {
    const pair = tryBuildPair({
      bank,
      notionId,
      microId: micro.id,
      recommendedStar,
      recentQuestionIds,
    });

    if (pair) {
      return { micro, pair };
    }
  }

  return null;
}

export async function startTutorSessionV4(
  input: StartTutorV4Input
): Promise<StartTutorV4Response> {
  const knowledge = await loadKnowledge(input.classe, input.matiere);
  const matrix = await loadMatrix(input.classe, input.matiere);
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

  let pair = tryBuildPair({
    bank,
    notionId: notion.id,
    microId: firstMicro.id,
    recommendedStar,
    recentQuestionIds: [],
  });

  let actualMicro = firstMicro;

  if (!pair) {
    const fallback = findNextAvailableMicroInNotion({
      knowledge,
      matrix,
      bank,
      notionId: notion.id,
      currentMicroId: firstMicro.id,
      masteryByMicro: mastery.micro,
      recommendedStar,
      recentQuestionIds: [],
    });

    if (!fallback) {
      throw new Error(`Aucune paire disponible dans la notion ${notion.id}.`);
    }

    actualMicro = fallback.micro;
    pair = fallback.pair;
  }

  const currentPair: TutorQuestionPair = {
    ...pair,
    recommendedDifficulty,
    recommendedStar,
  };

  const session: TutorSessionV4 = {
    id: randomUUID(),
    createdAt: Date.now(),
    updatedAt: Date.now(),

    classe: input.classe,
    matiere: input.matiere,
    mode: "evaluation",

    notionFocus: notion.id,
    microFocus: actualMicro.id,

    recommendedDifficulty,
    recommendedStar,
    currentPair,
    currentChoice: undefined,

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

    recentQuestionIds: [currentPair.optionA.id, currentPair.optionB.id],
    attempts: [],

    knowledgePackId: knowledge.id,
    audit: [
      {
        at: new Date().toISOString(),
        event: "start",
        notionId: notion.id,
        microId: actualMicro.id,
        pairId: currentPair.pairId,
        mode: "evaluation",
        reason: "Démarrage de la session V4.",
        flags: [],
      },
    ],
  };

  createSessionV4(session);

  return {
    sessionId: session.id,
    pair: currentPair,
    mode: session.mode,
    recommendedStar: session.recommendedStar,
    recommendedDifficulty: session.recommendedDifficulty,
    notionCatalog: knowledge.notions.map((n) => ({
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

export async function answerTutorV4(
  sessionId: string,
  answer: string
): Promise<AnswerTutorV4Response> {
  const session = getSessionV4(sessionId);

  if (!session) {
    throw new Error("Session introuvable");
  }

  const chosenOption = getChosenOption(session);
  const chosenDifficulty = getDifficultyFromOption(chosenOption);

  const result = evaluateAnswer(chosenOption, answer);

  const knowledge = await loadKnowledge(session.classe, session.matiere);
  const matrix = await loadMatrix(session.classe, session.matiere);
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
    answer,
    result: {
      ok: result.ok,
      normalizedAnswer: result.normalizedAnswer,
      feedback: result.feedback,
      flags: result.flags,
      errorKind: normalizeErrorKind(result.errorKind),
      estimatedUnderstanding: normalizeEstimatedUnderstanding(
        result.estimatedUnderstanding
      ),
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
    usedHint: session.lastHintUsed,
  });

  let nextPair = tryBuildPair({
    bank,
    notionId: session.notionFocus,
    microId: session.microFocus,
    recommendedStar: session.recommendedStar,
    recentQuestionIds: session.recentQuestionIds,
  });

  let nextMicroId = session.microFocus;

  if (!nextPair) {
    const fallback = findNextAvailableMicroInNotion({
      knowledge,
      matrix,
      bank,
      notionId: session.notionFocus,
      currentMicroId: session.microFocus,
      masteryByMicro: session.masteryByMicro,
      recommendedStar: session.recommendedStar,
      recentQuestionIds: session.recentQuestionIds,
    });

    if (fallback) {
      nextMicroId = fallback.micro.id;
      nextPair = fallback.pair;
    }
  }

  if (!nextPair) {
    throw new Error(
      `Aucune paire disponible pour continuer dans la notion ${session.notionFocus}.`
    );
  }

  const nextCurrentPair: TutorQuestionPair = {
    ...nextPair,
    recommendedDifficulty: session.recommendedDifficulty,
    recommendedStar: session.recommendedStar,
  };

  session.microFocus = nextMicroId;
  session.currentPair = nextCurrentPair;

  session.recentQuestionIds = [
    ...session.recentQuestionIds.slice(-8),
    nextCurrentPair.optionA.id,
    nextCurrentPair.optionB.id,
  ];

  session.currentChoice = undefined;
  session.turnStartedAt = Date.now();

  saveSessionV4(session);

  return {
    feedback: guarded.text,
    result: {
      ok: result.ok,
      flags: [...result.flags, ...guarded.flags],
    },
    pair: nextCurrentPair,
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