/**
 * types.ts
 *
 * Définit toutes les structures de données utilisées par le tutor V4.
 * Version V4 "étoiles cachées" simplifiée :
 * - suppression du choix manuel dys / standard / challenge
 * - suppression de la confiance déclarée côté élève
 * - progression pilotée par le moteur
 */

export type {
  TriangleCanvasPointLabel,
  TriangleCanvasSideLabel,
  QuadrilatereCanvasPointLabel,
  QuadrilatereCanvasSideLabel,
  FigureLibreCanvasGridCell,
  FigureLibreCanvasGridPoint,
  TriangleCanvasData,
  ThalesCanvasPointLabel,
  ThalesCanvasData,
  QuadrilatereCanvasData,
  FigureLibreCanvasData,
  NumberLineCanvasPoint,
  NumberLineCanvasData,
  StatGraphKind,
  StatGraphCanvasData,
  SolideKind,
  CubeCell3D,
  Solide3DCanvasData,
  SectionSolideKind,
  SectionSolideType,
  SectionSolideCanvasData,
  TableauProportionnaliteCell,
  TableauProportionnaliteCanvasData,
  AngleCanvasData,
  CanvasProbabilitesData,
  FonctionGraphiquePoint,
  FonctionGraphiqueCourbe,
  FonctionGraphiqueCanvasData,
  FonctionTableauCanvasData,
  TransformationKind,
  TransformationCanvasPoint,
  TransformationCanvasData,
  TableauDonneesCanvasData,
  CalculPoseCanvasData,
  FractionCanvasData,
  ScratchBlockKind,
  ScratchBlockData,
  ScratchCanvasData,
  CanvasFigure,
  DureeCanvasData,
  ReperageCanvasData,
  DroitesCanvasData,
  CercleCanvasData,
  CercleCanvasPoint,
  CercleCanvasPointLabel,
  MasseCanvasObject,
  MasseCanvasData,
  ContenanceCanvasData,
  ContenanceCanvasObject,
  EchelleCanvasData,
  SchemaBarreCanvasData,
  DroiteGradueeCanvasData
} from "./types_canvas";

import type { CanvasFigure } from "./types_canvas";

export type TutorMode = "evaluation" | "coaching";
export type QuestionFormat = "short" | "qcm" | "open";

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

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
export type StarLevel = DifficultyLevel;

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
  difficulty: DifficultyLevel;
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
  explanation?: string;
  canvas?: CanvasFigure;
  meta: QuestionVariantMeta;
};

export type TutorQuestionPair = {
  pairId: string;
  notionId: string;
  microId: string;
  recommendedDifficulty: DifficultyLevel;
  recommendedStar: StarLevel;
  optionA: TutorQuestionOption;
  optionB: TutorQuestionOption;
};

export type LearnerPreferences = {
  challengePreference: number;
  guidancePreference: number;
  shortTextPreference: number;
  reunionThemePreference: number;
  sportThemePreference: number;
  cuisineThemePreference: number;
  jeuxVideoThemePreference: number;
};

export type LearnerPedagogicalState = {
  estimatedAutonomy: number;
  estimatedNeedForSupport: number;
  estimatedPersistence: number;
};

export type LearnerProfile = {
  preferences: LearnerPreferences;
  pedagogy: LearnerPedagogicalState;
};

export type QuestionChoice = {
  pairId: string;
  chosenOptionId: string;
  chosenDifficulty: DifficultyLevel;
  chosenStar: StarLevel;
  chosenTheme: QuestionTheme;
  chosenAt: number;
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
  estimatedUnderstanding?: number;
};

export type TurnAttempt = {
  turnIndex: number;
  pairId: string;
  chosenOptionId: string;
  notionId: string;
  microId: string;
  difficulty: DifficultyLevel;
  starLevel: StarLevel;
  theme: QuestionTheme;
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
  nextRecommendedStar: StarLevel;
  nextNotionId: string;
  nextMicroId: string;
};

export type TutorAuditEvent =
  | "start"
  | "pair_generated"
  | "question_chosen"
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
  mode: TutorMode;
  notionFocus: string;
  microFocus: string;
  recommendedDifficulty: DifficultyLevel;
  recommendedStar: StarLevel;
  currentPair?: TutorQuestionPair;
  currentChoice?: QuestionChoice;
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
  microId?: string;
};

export type StartTutorV4Response = {
  sessionId: string;
  pair: TutorQuestionPair;
  mode: TutorMode;
  recommendedStar: StarLevel;
  recommendedDifficulty: DifficultyLevel;
  notionCatalog: Array<{ id: string; label: string }>;
  visibleProgress: VisibleProgress;
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
  recommendedDifficulty: DifficultyLevel;
  visibleProgress: VisibleProgress;
  mastery?: {
    boMastery: MasteryMap;
    notionMastery: MasteryMap;
    microMastery: MasteryMap;
  };
};

/* =========================================================
   TYPES V4 POUR LA BANQUE DE QUESTIONS
   ========================================================= */

export type SchoolLevel =
  | "cp"
  | "ce1"
  | "ce2"
  | "cm1"
  | "cm2"
  | "6e"
  | "5e"
  | "4e"
  | "3e"
  | "terminale-spe"
  | "adulte";
export type SubjectCode = "maths" | "francais";

export type TutorGeneratedQuestionV4 = {
  text: string;
  format: QuestionFormat;
  choices?: string[];
  expected: string[];
  comparator: ComparatorName;
  explanation?: string;
  canvas?: CanvasFigure;
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
  explanation?: string;
  tags?: string[];
  canvas?: CanvasFigure;
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
   ========================================================= */

export type MatrixValue = -3 | -2 | -1 | 0 | 1 | 2 | 3;

export type SkillMatrix = {
  id: string;
  classe: SchoolLevel;
  matiere: SubjectCode;
  microSkillIndex: string[];
  matrix: MatrixValue[][];
};

export type KnowledgeBoCompetence = {
  boId: string;
  label: string;
};

export type KnowledgeNotion = {
  id: string;
  label: string;
  boId: string;
  prerequis: string[];
  microTargets: string[];
  levels: number[];
};

export type KnowledgeMicroSkill = {
  id: string;
  label: string;
  notionId: string;
  boId: string;
  prerequis: string[];
};

export type KnowledgePack = {
  id: string;
  classe: string;
  matiere: string;
  bo_competences: KnowledgeBoCompetence[];
  notions: KnowledgeNotion[];
  microSkills: KnowledgeMicroSkill[];
  microGraph: unknown[];
};
