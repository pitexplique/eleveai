export type StudentStyle = "dys" | "middle" | "challenge";
export type TutorMode = "evaluation" | "coaching";

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
  questionTemplates: Record<string, string[]>;
  styleProfiles: Record<string, { maxSentences: number; preferQcm: boolean; allowHints: boolean; shortLines?: boolean }>;
};

export type KnowledgeGraph = {
  id: string;
  nodes: string[];
  edges: Array<{ from: string; to: string; strength: "weak" | "medium" | "strong" }>;
};

export type TutorQuestion = {
  text: string;
  format: "short" | "qcm";
  choices?: string[];
  expected: string;
  hint?: string;
};

export type MasteryMap = Record<string, number>;

export type TutorSession = {
  id: string;
  createdAt: number;
  updatedAt: number;
  expiresAt: number;
  classe: string;
  matiere: string;
  style: StudentStyle;
  mode: TutorMode;
  notionFocus: string;
  difficulty: number;
  allowEnigmes: boolean;
  consecutiveErrors: number;
  consecutiveSuccess: number;
  knowledgePackId: string;
  graphId: string;
  masteryByNotion: MasteryMap;
  masteryByBo: MasteryMap;
  lastQuestion?: TutorQuestion;
  audit: AuditEntry[];
};

export type AuditEntry = {
  at: string;
  model: string;
  temperature: number;
  decision: {
    notion: string;
    difficulty: number;
    mode: TutorMode;
    reason: string;
  };
  guardrailFlags: string[];
  governance: {
    knowledgePackId: string;
    graphId: string;
  };
};
