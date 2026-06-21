import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeA1Ia() {
  return buildKnowledge({
    id: "a1-ia",
    classe: "a1",
    matiere: "ia",
    bo,
    notions,
    microSkills,
  });
}
