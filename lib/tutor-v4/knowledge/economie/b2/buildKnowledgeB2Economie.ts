import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeB2Economie() {
  return buildKnowledge({
    id: "b2-economie",
    classe: "b2",
    matiere: "economie",
    bo,
    notions,
    microSkills,
  });
}
