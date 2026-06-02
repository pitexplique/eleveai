import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeAdulteMaths() {
  return buildKnowledge({
    id: "adulte-maths",
    classe: "adulte",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}
