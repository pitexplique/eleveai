import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeCe2Maths() {
  return buildKnowledge({
    id: "ce2-maths",
    classe: "ce2",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}
