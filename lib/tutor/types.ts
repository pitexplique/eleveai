export type StudentStyle = "dys" | "middle" | "challenge";
export type TutorMode = "evaluation" | "coaching";
export type QuestionFormat = "short" | "qcm";
export type ComparatorName =
  | "exact_text"
  | "mcq_exact"
  | "number_equal"
  | "fraction_decimal_equivalent"
  | "contains_keyword";

export type BoCompetence = {
  boId: string;
  label: string;
};

export type Notion = {
  id: string;
  label: string;
  boId: string;
  prerequis: string[];
  microTargets: string[];
  levels: number[];
};

export type MicroSkill = {
  id: string;
  label: string;
  notionId: string;
  boId: string;
  prerequis: string[];
};

export type GraphEdge = {
  from: string;
  to: string;
  strength: "strong" | "medium" | "weak";
};

export type KnowledgePack = {
  id: string;
  classe: string;
  matiere: string;
  bo_competences: BoCompetence[];
  notions: Notion[];
  microSkills: MicroSkill[];
  microGraph: GraphEdge[];
};

export type QuestionDefinition = {
  id: string;
  notionId: string;
  microId: string;
  difficulty: number;
  format: QuestionFormat;
  text: string;
  choices?: string[];
  expected: string[];
  comparator: ComparatorName;
  hint?: string;
};

export type TutorQuestion = {
  id: string;
  notionId: string;
  microId: string;
  text: string;
  format: QuestionFormat;
  choices?: string[];
  expected: string[];
  comparator: ComparatorName;
  hint?: string;
};

export type MasteryMap = Record<string, number>;

export type AuditEntry = {
  at: string;
  event: "start" | "turn";
  notionId: string;
  microId: string;
  mode: TutorMode;
  difficulty: number;
  reason: string;
  flags: string[];
};

export type TutorSession = {
  id: string;
  createdAt: number;
  updatedAt: number;
  classe: string;
  matiere: string;
  style: StudentStyle;
  mode: TutorMode;
  notionFocus: string;
  microFocus: string;
  difficulty: number;
  consecutiveErrors: number;
  consecutiveSuccess: number;
  lastQuestion?: TutorQuestion;
  recentQuestionIds: string[];
  masteryByNotion: MasteryMap;
  masteryByBo: MasteryMap;
  masteryByMicro: MasteryMap;
  knowledgePackId: string;
  audit: AuditEntry[];
};