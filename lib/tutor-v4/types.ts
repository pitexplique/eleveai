/**
 * types.ts
 *
 * Définit toutes les structures de données utilisées par le tutor V4.
 * Version V4 "étoiles cachées" (transition propre depuis la V3/V4 actuelle).
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

/**
 * IMPORTANT :
 * On sépare désormais la difficulté interne du moteur
 * et les étoiles visibles par l’élève.
 */
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Alias de transition pour éviter de casser trop de fichiers d’un coup.
 * À terme, on pourra supprimer StarLevel et utiliser DifficultyLevel partout.
 */
export type StarLevel = DifficultyLevel;

export type ConfidenceLevel = 1 | 2 | 3;

export type MasteryMap = Record<string, number>;

export type HiddenStarId =
  | "starter"
  | "confidence"
  | "regularity"
  | "autonomy"
  | "precision"
  | "perseverance"
  | "theme_explorer"
  | "micro_mastery";

export type HiddenStarState = {
  id: HiddenStarId;
  label: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: number;
  relatedMicroIds?: string[];
};

export type VisibleProgress = {
  unlockedStars: HiddenStarState[];
  lastUnlockedStar?: HiddenStarState;
  encouragement: string;
  streak: number;
  sessionStep: number;
};

export type QuestionVariantMeta = {
  familyId: string;
  theme: QuestionTheme;
  supportLevel: SupportLevel;
  readingLoad: ReadingLoad;
  challengeType: ChallengeType;

  /**
   * Difficulté interne recommandée par le moteur.
   * Visible ou non selon l’UI, mais pensée d’abord pour le moteur.
   */
  difficulty: DifficultyLevel;

  /**
   * Champ de transition pour compatibilité avec les fichiers existants.
   * À terme : supprimer et ne garder que `difficulty`.
   */
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

  /**
   * Difficulté recommandée par le moteur.
   */
  recommendedDifficulty: DifficultyLevel;

  /**
   * Champ de transition pour compatibilité.
   */
  recommendedStar: StarLevel;

  optionA: TutorQuestionOption;
  optionB: TutorQuestionOption;
};

export type LearnerPreferences = {
  challengePreference: number; // 0..100
  guidancePreference: number; // 0..100
  shortTextPreference: number; // 0..100
  reunionThemePreference: number; // 0..100
  sportThemePreference: number; // 0..100
  cuisineThemePreference: number; // 0..100
  jeuxVideoThemePreference: number; // 0..100
};

export type LearnerPedagogicalState = {
  confidenceCalibration: number; // -100..100
  estimatedAutonomy: number; // 0..100
  estimatedNeedForSupport: number; // 0..100
  estimatedPersistence: number; // 0..100
};

export type LearnerProfile = {
  preferences: LearnerPreferences;
  pedagogy: LearnerPedagogicalState;
};

export type QuestionChoice = {
  pairId: string;
  chosenOptionId: string;

  /**
   * Difficulté interne effectivement choisie.
   */
  chosenDifficulty: DifficultyLevel;

  /**
   * Champ de transition pour compatibilité.
   */
  chosenStar: StarLevel;

  chosenTheme: QuestionTheme;
  chosenAt: number;
};

export type ConfidenceState = {
  level: ConfidenceLevel;
  declaredAt: number;
};

export type ErrorKind =
  | "none"
  | "careless"
  | "conceptual"
  | "format"
  | "incomplete";

export type AnswerEvaluation = {
  ok: boolean;
  normalizedAnswer?: string;
  feedback: string;
  flags: string[];
  errorKind?: ErrorKind;
  estimatedUnderstanding?: number; // 0..100
};

export type TurnAttempt = {
  turnIndex: number;
  pairId: string;
  chosenOptionId: string;
  notionId: string;
  microId: string;

  difficulty: DifficultyLevel;

  /**
   * Champ de transition pour compatibilité.
   */
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
  nextRecommendedDifficulty: DifficultyLevel;

  /**
   * Champ de transition pour compatibilité.
   */
  nextRecommendedStar: StarLevel;

  nextNotionId: string;
  nextMicroId: string;
};

export type TutorAuditEvent =
  | "start"
  | "pair_generated"
  | "question_chosen"
  | "confidence_declared"
  | "answer_submitted"
  | "pedagogical_decision"
  | "hidden_star_unlocked";

export type TutorAuditEntryV4 = {
  at: string;
  event: TutorAuditEvent;
  notionId: string;
  microId: string;
  pairId?: string;
  optionId?: string;
  difficulty?: DifficultyLevel;
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

  /**
   * Difficulté interne recommandée par le moteur.
   */
  recommendedDifficulty: DifficultyLevel;

  /**
   * Champ de transition pour compatibilité avec l’ancien code.
   */
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

  hiddenStars: HiddenStarState[];
  visibleProgress: VisibleProgress;

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

  /**
   * Champ de transition pour compatibilité.
   */
  recommendedStar: StarLevel;

  /**
   * Nouveau champ recommandé.
   */
  recommendedDifficulty: DifficultyLevel;

  notionCatalog: Array<{ id: string; label: string }>;
  visibleProgress: VisibleProgress;

  /**
   * Compatibilité temporaire.
   * À terme, à ne plus envoyer au front élève.
   */
  mastery?: {
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

  /**
   * Champ de transition.
   */
  recommendedStar: StarLevel;

  /**
   * Nouveau champ recommandé.
   */
  recommendedDifficulty: DifficultyLevel;

  visibleProgress: VisibleProgress;

  /**
   * Compatibilité temporaire.
   * À terme, à retirer de l’API élève.
   */
  mastery?: {
    boMastery: MasteryMap;
    notionMastery: MasteryMap;
    microMastery: MasteryMap;
  };
};

/* =========================================================
   TYPES V4 POUR LA BANQUE DE QUESTIONS
   Préparent la séparation avec V3 et la future migration
   vers Supabase.
   ========================================================= */

export type SchoolLevel = "6e" | "5e" | "4e" | "3e";
export type SubjectCode = "maths";

export type TutorGeneratedQuestionV4 = {
  text: string;
  format: QuestionFormat;
  choices?: string[];
  expected: string[];
  comparator: ComparatorName;
};

export type TutorBankItemFixedV4 = {
  kind: "fixed";
  id: string;
  niveau: SchoolLevel;
  matiere: SubjectCode;
  notionId: string;
  microId: string;
  difficulty: DifficultyLevel;
  theme?: QuestionTheme;
  text: string;
  format: QuestionFormat;
  choices?: string[];
  expected: string[];
  comparator: ComparatorName;
  hint?: string;
  tags?: string[];
};

export type TutorBankItemTemplateV4 = {
  kind: "template";
  id: string;
  niveau: SchoolLevel;
  matiere: SubjectCode;
  notionId: string;
  microId: string;
  difficulty: DifficultyLevel;
  theme?: QuestionTheme;
  hint?: string;
  tags?: string[];
  generate: () => TutorGeneratedQuestionV4;
};

export type TutorBankItemV4 =
  | TutorBankItemFixedV4
  | TutorBankItemTemplateV4;

  /* =========================================================
   TYPES V4 POUR KNOWLEDGE ET MATRICE
   Préparent la séparation complète avec V3.
   ========================================================= */

export type MatrixValue = -3 | -2 | -1 | 0 | 1 | 2 | 3;

export type SkillMatrix = {
  id: string;
  classe: SchoolLevel;
  matiere: SubjectCode;

  microSkillIndex: string[];
  matrix: MatrixValue[][];
};

export type KnowledgeMicro = {
  id: string;
  label: string;
  description?: string;
};

export type KnowledgeNotion = {
  id: string;
  label: string;
  boId: string;
  micros: KnowledgeMicro[];
};

export type KnowledgePack = {
  id: string;
  classe: string;
  matiere: string;
  notions: KnowledgeNotion[];
};