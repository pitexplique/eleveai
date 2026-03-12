/**
 * types.ts
 *
 * Définit toutes les structures de données utilisées par le tutor V4.
 * Ce fichier ne contient aucune logique.
 */

export type StudentStyle = "dys" | "middle" | "challenge";
export type TutorMode = "evaluation" | "coaching";
export type QuestionFormat = "short" | "qcm";

export type ComparatorName =
  | "exact_text"
  | "mcq_exact"
  | "number_equal"
  | "fraction_decimal_equivalent"
  | "contains_keyword";

export type QuestionTheme =
  | "neutral"
  | "reunion"
  | "sport"
  | "cuisine"
  | "jeux_video";

export type SupportLevel = "low" | "medium" | "high";
export type ReadingLoad = "short" | "medium" | "long";
export type ChallengeType = "direct" | "guided" | "transfer" | "challenge";

export type StarLevel = 1 | 2 | 3 | 4 | 5;
export type ConfidenceLevel = 1 | 2 | 3;

export type MasteryMap = Record<string, number>;

export type QuestionVariantMeta = {
  familyId: string;
  theme: QuestionTheme;
  supportLevel: SupportLevel;
  readingLoad: ReadingLoad;
  challengeType: ChallengeType;
  starLevel: StarLevel;
};

export type TutorQuestionOption = {
  id: string;
  notionId: string;
  microId: string;
  text: string;
  format: QuestionFormat;
  choices?: string[];
  expected: string[];
  comparator: ComparatorName;
  hint?: string;
  meta: QuestionVariantMeta;
};

export type TutorQuestionPair = {
  pairId: string;
  notionId: string;
  microId: string;
  recommendedStar: StarLevel;
  optionA: TutorQuestionOption;
  optionB: TutorQuestionOption;
};

export type LearnerProfile = {
  challengePreference: number;
  guidanceNeed: number;
  shortTextPreference: number;
  reunionThemePreference: number;
  sportThemePreference: number;
  cuisineThemePreference: number;
  jeuxVideoThemePreference: number;
  confidenceCalibration: number; // -100 à +100
};

export type QuestionChoice = {
  pairId: string;
  chosenOptionId: string;
  chosenStar: StarLevel;
  chosenTheme: QuestionTheme;
  chosenAt: number;
};

export type ConfidenceState = {
  level: ConfidenceLevel;
  declaredAt: number;
};

export type AnswerEvaluation = {
  ok: boolean;
  normalizedAnswer?: string;
  feedback: string;
  flags: string[];
};

export type TurnAttempt = {
  turnIndex: number;
  pairId: string;
  chosenOptionId: string;
  notionId: string;
  microId: string;
  starLevel: StarLevel;
  theme: QuestionTheme;
  confidence?: ConfidenceLevel;
  answer: string;
  result: AnswerEvaluation;
  usedHint: boolean;
  startedAt: number;
  answeredAt: number;
  durationMs: number;
};

export type PedagogicalDecisionType =
  | "stay_same_level"
  | "retry_with_hint"
  | "downgrade_after_two_failures"
  | "promote_softly"
  | "promote_recommended"
  | "switch_theme";

export type PedagogicalDecision = {
  type: PedagogicalDecisionType;
  reason: string;
  nextMode: TutorMode;
  nextRecommendedStar: StarLevel;
  nextNotionId: string;
  nextMicroId: string;
};

export type TutorAuditEntryV4 = {
  at: string;
  event:
    | "start"
    | "pair_generated"
    | "question_chosen"
    | "confidence_declared"
    | "answer_submitted"
    | "pedagogical_decision";
  notionId: string;
  microId: string;
  pairId?: string;
  optionId?: string;
  starLevel?: StarLevel;
  mode: TutorMode;
  reason: string;
  flags: string[];
};

export type TutorSessionV4 = {
  id: string;
  createdAt: number;
  updatedAt: number;

  classe: string;
  matiere: string;
  style: StudentStyle;
  mode: TutorMode;

  notionFocus: string;
  microFocus: string;

  recommendedStar: StarLevel;
  currentPair?: TutorQuestionPair;
  currentChoice?: QuestionChoice;
  currentConfidence?: ConfidenceState;

  consecutiveErrors: number;
  consecutiveSuccess: number;
  consecutiveErrorsSameStar: number;

  lastHintUsed: boolean;
  turnCount: number;
  turnStartedAt?: number;

  masteryByNotion: MasteryMap;
  masteryByBo: MasteryMap;
  masteryByMicro: MasteryMap;

  learnerProfile: LearnerProfile;

  recentQuestionIds: string[];
  attempts: TurnAttempt[];

  knowledgePackId: string;
  audit: TutorAuditEntryV4[];
};

export type StartTutorV4Input = {
  classe: string;
  matiere: string;
  notion: string;
  style: StudentStyle;
};

export type StartTutorV4Response = {
  sessionId: string;
  pair: TutorQuestionPair;
  mode: TutorMode;
  recommendedStar: StarLevel;
  notionCatalog: Array<{ id: string; label: string }>;
  mastery: {
    boMastery: MasteryMap;
    notionMastery: MasteryMap;
    microMastery: MasteryMap;
  };
};

export type ChooseQuestionInput = {
  sessionId: string;
  optionId: string;
};

export type ConfidenceInput = {
  sessionId: string;
  level: ConfidenceLevel;
};

export type AnswerInput = {
  sessionId: string;
  answer: string;
};

export type AnswerTutorV4Response = {
  feedback: string;
  result: { ok: boolean; flags: string[] };
  pair: TutorQuestionPair;
  mode: TutorMode;
  recommendedStar: StarLevel;
  mastery: {
    boMastery: MasteryMap;
    notionMastery: MasteryMap;
    microMastery: MasteryMap;
  };
};