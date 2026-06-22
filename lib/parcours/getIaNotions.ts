import type { ParcoursNiveauIa, ParcoursNotion } from "./types";

import { buildKnowledgeA1Ia } from "@/lib/tutor-v4/knowledge/ia/a1/buildKnowledgeA1Ia";
import { buildKnowledgeA2Ia } from "@/lib/tutor-v4/knowledge/ia/a2/buildKnowledgeA2Ia";
import { buildKnowledgeB1Ia } from "@/lib/tutor-v4/knowledge/ia/b1/buildKnowledgeB1Ia";
import { buildKnowledgeB2Ia } from "@/lib/tutor-v4/knowledge/ia/b2/buildKnowledgeB2Ia";
import { buildKnowledgeC1Ia } from "@/lib/tutor-v4/knowledge/ia/c1/buildKnowledgeC1Ia";

export function getIaNotions(niveau: ParcoursNiveauIa): ParcoursNotion[] {
  switch (niveau) {
    case "a1": return buildKnowledgeA1Ia().notions;
    case "a2": return buildKnowledgeA2Ia().notions;
    case "b1": return buildKnowledgeB1Ia().notions;
    case "b2": return buildKnowledgeB2Ia().notions;
    case "c1": return buildKnowledgeC1Ia().notions;
  }
}
