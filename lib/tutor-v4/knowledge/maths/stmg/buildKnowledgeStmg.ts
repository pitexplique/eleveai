import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { microSkills } from "./microSkills";
import { notions } from "./notions";

export function buildKnowledgeStmgMaths() {
  return buildKnowledge({
    id: "stmg-maths",
    classe: "stmg",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}
