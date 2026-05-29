/* lib/defis-jour/types.ts */
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

  // optionnel : utile pour Hydro Tanika
  image?: string;

  // optionnel : progression sur la semaine
  level?: 1 | 2 | 3 | 4 | 5;
};