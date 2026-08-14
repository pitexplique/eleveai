import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { microSkills } from "./microSkills";
import { notions } from "./notions";

export function buildKnowledgePremiereMaths() {
  return buildKnowledge({
    id: "premiere-maths",
    classe: "premiere",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}
