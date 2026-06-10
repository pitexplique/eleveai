import type { ParcoursNiveauEnglish, ParcoursNotion } from "./types";

import { buildKnowledgeA1Espagnol } from "@/lib/tutor-v4/knowledge/espagnol/a1/buildKnowledgeA1Espagnol";
import { buildKnowledgeA2Espagnol } from "@/lib/tutor-v4/knowledge/espagnol/a2/buildKnowledgeA2Espagnol";
import { buildKnowledgeB1Espagnol } from "@/lib/tutor-v4/knowledge/espagnol/b1/buildKnowledgeB1Espagnol";
import { buildKnowledgeB2Espagnol } from "@/lib/tutor-v4/knowledge/espagnol/b2/buildKnowledgeB2Espagnol";

export function getEspagnolNotions(niveau: ParcoursNiveauEnglish): ParcoursNotion[] {
  switch (niveau) {
    case "a1": return buildKnowledgeA1Espagnol().notions;
    case "a2": return buildKnowledgeA2Espagnol().notions;
    case "b1": return buildKnowledgeB1Espagnol().notions;
    case "b2": return buildKnowledgeB2Espagnol().notions;
  }
}
