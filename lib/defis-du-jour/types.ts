export type ProblemeDirectionType = "guided" | "hint" | "open";

export type ProblemeDirection = {
  id: string;
  label: string;
  type: ProblemeDirectionType;
  content: string;
};

export type ProblemeDuJour = {
  id: string;
  title: string;
  theme: string;
  statement: string;
  question: string;
  expectedAnswer: string;
  explanation: string;
  directions: ProblemeDirection[];
};