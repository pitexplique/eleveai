import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { microSkills } from "./microSkills";
import { notions } from "./notions";

export function buildKnowledgeSecondeMaths() {
  return buildKnowledge({
    id: "seconde-maths",
    classe: "seconde",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}
