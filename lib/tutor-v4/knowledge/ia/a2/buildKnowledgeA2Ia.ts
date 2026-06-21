import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeA2Ia() {
  return buildKnowledge({
    id: "a2-ia",
    classe: "a2",
    matiere: "ia",
    bo,
    notions,
    microSkills,
  });
}
