import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeB2Ia() {
  return buildKnowledge({
    id: "b2-ia",
    classe: "b2",
    matiere: "ia",
    bo,
    notions,
    microSkills,
  });
}
