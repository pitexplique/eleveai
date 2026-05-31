import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeCpMaths() {
  return buildKnowledge({
    id: "cp-maths",
    classe: "cp",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}
