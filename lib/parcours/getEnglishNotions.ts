import type { ParcoursNiveauEnglish, ParcoursNotion } from "./types";

import { buildKnowledgeA1English } from "@/lib/tutor-v4/knowledge/english/a1/buildKnowledgeA1English";
import { buildKnowledgeA2English } from "@/lib/tutor-v4/knowledge/english/a2/buildKnowledgeA2English";
import { buildKnowledgeB1English } from "@/lib/tutor-v4/knowledge/english/b1/buildKnowledgeB1English";
import { buildKnowledgeB2English } from "@/lib/tutor-v4/knowledge/english/b2/buildKnowledgeB2English";

export function getEnglishNotions(niveau: ParcoursNiveauEnglish): ParcoursNotion[] {
  switch (niveau) {
    case "a1": return buildKnowledgeA1English().notions;
    case "a2": return buildKnowledgeA2English().notions;
    case "b1": return buildKnowledgeB1English().notions;
    case "b2": return buildKnowledgeB2English().notions;
  }
}
