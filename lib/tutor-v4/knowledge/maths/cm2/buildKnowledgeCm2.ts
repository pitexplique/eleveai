import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeCm2Maths() {
  return buildKnowledge({
    id: "cm2-maths",
    classe: "cm2",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}
