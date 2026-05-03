/**
 * types.ts
 *
 * Définit toutes les structures de données utilisées par le tutor V4.
 * Version V4 "étoiles cachées" simplifiée :
 * - suppression du choix manuel dys / standard / challenge
 * - suppression de la confiance déclarée côté élève
 * - progression pilotée par le moteur
 */

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

export type TriangleCanvasPointLabel = "A" | "B" | "C";
export type TriangleCanvasSideLabel = "AB" | "BC" | "CA";

export type QuadrilatereCanvasPointLabel = "A" | "B" | "C" | "D";
export type QuadrilatereCanvasSideLabel =
  | "AB"
  | "BC"
  | "CD"
  | "DA"
  | "AC"
  | "BD";

export type FigureLibreCanvasGridCell = [row: number, col: number];
export type FigureLibreCanvasGridPoint = [row: number, col: number];

export type TriangleCanvasData = {
  kind: "triangle";
  size?: {
    width?: number;
    height?: number;
  };
  points: {
    A: { x: number; y: number };
    B: { x: number; y: number };
    C: { x: number; y: number };
  };
  display?: {
    showPoints?: boolean;
    showLabels?: boolean;
    showSides?: boolean;
    showAngles?: boolean;
  };
  labels?: Partial<Record<TriangleCanvasPointLabel, string>>;
  angleLabels?: Partial<Record<TriangleCanvasPointLabel, string>>;
  sideLabels?: Partial<Record<TriangleCanvasSideLabel, string>>;
  marks?: {
    rightAngleAt?: TriangleCanvasPointLabel;
    equalSides?: Array<[TriangleCanvasSideLabel, TriangleCanvasSideLabel]>;
    equalAngles?: Array<[TriangleCanvasPointLabel, TriangleCanvasPointLabel]>;
  };
};

export type ThalesCanvasPointLabel = "A" | "B" | "C" | "M" | "N";

export type ThalesCanvasData = {
  kind: "thales";
  variant: "triangle" | "papillon";

  size?: {
    width?: number;
    height?: number;
  };

  points?: Partial<Record<ThalesCanvasPointLabel, { x: number; y: number }>>;

  labels?: Partial<Record<ThalesCanvasPointLabel, string>>;

  sideLabels?: Partial<
    Record<"AB" | "AC" | "BC" | "AM" | "AN" | "MN" | "BM" | "CN", string>
  >;

  display?: {
    showPoints?: boolean;
    showLabels?: boolean;
    showSideLabels?: boolean;
    showParallelMarks?: boolean;
    highlightParallel?: boolean;
    highlightRatios?: boolean;
  };

  colors?: {
    triangleStroke?: string;
    parallelStroke?: string;
    pointFill?: string;
    labelFill?: string;
    sideLabelFill?: string;
    highlightStroke?: string;
  };
};

export type QuadrilatereCanvasData = {
  kind: "quadrilatere";
  size?: {
    width?: number;
    height?: number;
  };
  points: {
    A: { x: number; y: number };
    B: { x: number; y: number };
    C: { x: number; y: number };
    D: { x: number; y: number };
  };
  display?: {
    showPoints?: boolean;
    showLabels?: boolean;
    showSides?: boolean;
    showAngles?: boolean;
    showDiagonals?: boolean;
  };
  labels?: Partial<Record<QuadrilatereCanvasPointLabel, string>>;
  angleLabels?: Partial<Record<QuadrilatereCanvasPointLabel, string>>;
  sideLabels?: Partial<Record<QuadrilatereCanvasSideLabel, string>>;
  marks?: {
    rightAnglesAt?: QuadrilatereCanvasPointLabel[];
    equalSides?: Array<
      [QuadrilatereCanvasSideLabel, QuadrilatereCanvasSideLabel]
    >;
    equalAngles?: Array<
      [QuadrilatereCanvasPointLabel, QuadrilatereCanvasPointLabel]
    >;
    parallelSides?: Array<
      [QuadrilatereCanvasSideLabel, QuadrilatereCanvasSideLabel]
    >;
  };
};

export type FigureLibreCanvasData = {
  kind: "figure_libre";
  size?: {
    width?: number;
    height?: number;
    cellSize?: number;
    padding?: number;
  };
  grid: {
    rows: number;
    cols: number;
    filledCells: FigureLibreCanvasGridCell[];
  };
  display?: {
    showGrid?: boolean;
    showFilled?: boolean;
    showCellLabels?: boolean;
    showPerimeter?: boolean;
    showVertices?: boolean;
    showVertexLabels?: boolean;
  };
  colors?: {
    filled?: string;
    grid?: string;
    border?: string;
    perimeter?: string;
    vertex?: string;
    vertexLabel?: string;
  };
  perimeterPath?: FigureLibreCanvasGridPoint[];
  vertices?: Record<string, FigureLibreCanvasGridPoint>;
};

export type NumberLineCanvasPoint = {
  value: number;
  label?: string;
  color?: string;
};

export type NumberLineCanvasData = {
  kind: "number_line";
  size?: {
    width?: number;
    height?: number;
  };
  min?: number;
  max?: number;
  step?: number;
  points?: NumberLineCanvasPoint[];
  display?: {
    showTicks?: boolean;
    showValues?: boolean;
    showPoints?: boolean;
    showPointLabels?: boolean;
    showZero?: boolean;
  };
};

export type StatGraphKind = "barres" | "batons" | "camembert";
export type StatGraphCanvasData = {
  kind: "stat_graph";

  graphType: StatGraphKind;

  size?: {
    width?: number;
    height?: number;
  };

  data: {
    label: string;
    value: number;
    color?: string;
  }[];

  display?: {
    showValues?: boolean;
    showLabels?: boolean;
    highlightIndex?: number;
  };
};

export type SolideKind =
  | "cube"
  | "pave_droit"
  | "prisme"
  | "cylindre"
  | "assemblage_cubes";

export type CubeCell3D = {
  x: number;
  y: number;
  z: number;
};

export type Solide3DCanvasData = {
  kind: "solide_3d";
  solide: SolideKind;

  size?: {
    width?: number;
    height?: number;
  };

  dimensions?: {
    longueur?: number;
    largeur?: number;
    hauteur?: number;
    cote?: number;
    rayon?: number;
    aireBase?: number;
    volume?: number;
  };

  labels?: {
    longueur?: string;
    largeur?: string;
    hauteur?: string;
    cote?: string;
    rayon?: string;
    aireBase?: string;
    volume?: string;
  };

  highlight?: {
    base?: boolean;
    hauteur?: boolean;
    volume?: boolean;
  };

  display?: {
    showLabels?: boolean;
    showDimensions?: boolean;
    showFormulaHint?: boolean;
    showUnitCubes?: boolean;
  };

  colors?: {
    baseFill?: string;
    baseStroke?: string;
    bodyFill?: string;
    bodyStroke?: string;
    heightStroke?: string;
    labelFill?: string;
    cubeFill?: string;
    cubeStroke?: string;
  };

  cubes?: CubeCell3D[];
};


export type TableauProportionnaliteCell = {
  row: number;
  col: number;
};

export type TableauProportionnaliteCanvasData = {
  kind: "tableau_proportionnalite";

  size?: {
    width?: number;
    height?: number;
  };

  rows: number;
  cols: number;

  rowLabels?: string[];
  colLabels?: string[];

  values: string[][];

  missing: TableauProportionnaliteCell[];

  highlightedCells?: TableauProportionnaliteCell[];

  display?: {
    showRowLabels?: boolean;
    showColLabels?: boolean;
    showMissing?: boolean;
    showGrid?: boolean;
  };
};

export type AngleCanvasData = {
  kind: "angle";

  angle: {
    angleDeg: number;

    labels?: {
      vertex?: string;
      left?: string;
      right?: string;
      angle?: string;
    };

    display?: {
      showLabels?: boolean;
      showMeasure?: boolean;
      showArc?: boolean;
      showRightAngle?: boolean;
      placeholder?: string;
    };
  };

  size?: {
    width?: number;
    height?: number;
  };
};

// =========================
// 🎲 PROBABILITÉS
// =========================
export type CanvasProbabilitesData = {
  kind: "probabilites";

  variant: "de" | "roue" | "billes" | "tableau";

  de?: {
    faces: Array<1 | 2 | 3 | 4 | 5 | 6>;
    surligne?: Array<1 | 2 | 3 | 4 | 5 | 6>;
  };

  roue?: {
    segments: {
      label: string;
      poids: number;
      couleur?: string;
    }[];
  };

  billes?: {
    elements: {
      label?: string;
      couleur: string;
    }[];
  };

  tableau?: {
    entetes: string[];
    lignes: string[][];
    casesSurlignees?: Array<[number, number]>;
  };

  size?: {
    width?: number;
    height?: number;
  };
};

export type CanvasFigure =
  | TriangleCanvasData
  | QuadrilatereCanvasData
  | FigureLibreCanvasData
  | CanvasProbabilitesData
  | TableauProportionnaliteCanvasData
  | NumberLineCanvasData
  | Solide3DCanvasData
  | ThalesCanvasData
  | StatGraphCanvasData
  | AngleCanvasData;

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

export type SchoolLevel = "6e" | "5e" | "4e" | "3e";
export type SubjectCode = "maths";

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