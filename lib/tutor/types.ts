export type StudentStyle = "dys" | "middle" | "challenge";
export type TutorMode = "evaluation" | "coaching";
export type QuestionFormat = "short" | "qcm";

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

export type KnowledgePack = {
  id: string;
  classe: string;
  matiere: string;
  bo_competences: BoCompetence[];
  notions: Notion[];
};

export type GraphEdge = {
  from: string;
  to: string;
  strength: "strong" | "medium" | "weak";
};

export type KnowledgeGraph = {
  id: string;
  nodes: string[];
  edges: GraphEdge[];
};

export type TutorQuestion = {
  id: string;
  notionId: string;
  text: string;
  format: QuestionFormat;
  choices?: string[];
  expected: string[];
  hint?: string;
};

export type MasteryMap = Record<string, number>;

export type AuditEntry = {
  at: string;
  event: "start" | "turn";
  notionId: string;
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
  difficulty: number;
  consecutiveErrors: number;
  consecutiveSuccess: number;
  lastQuestion?: TutorQuestion;
  recentQuestionIds: string[];
  masteryByNotion: MasteryMap;
  masteryByBo: MasteryMap;
  knowledgePackId: string;
  graphId: string;
  audit: AuditEntry[];
};