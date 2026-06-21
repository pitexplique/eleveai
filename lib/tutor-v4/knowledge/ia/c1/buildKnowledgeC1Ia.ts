import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeC1Ia() {
  return buildKnowledge({
    id: "c1-ia",
    classe: "c1",
    matiere: "ia",
    bo,
    notions,
    microSkills,
  });
}
