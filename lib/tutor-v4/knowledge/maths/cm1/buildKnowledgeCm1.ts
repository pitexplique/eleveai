import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeCm1Maths() {
  return buildKnowledge({
    id: "cm1-maths",
    classe: "cm1",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}