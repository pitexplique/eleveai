import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeCe1Maths() {
  return buildKnowledge({
    id: "ce1-maths",
    classe: "ce1",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}
