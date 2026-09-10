import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeB1Economie() {
  return buildKnowledge({
    id: "b1-economie",
    classe: "b1",
    matiere: "economie",
    bo,
    notions,
    microSkills,
  });
}
