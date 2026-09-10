import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeA2Economie() {
  return buildKnowledge({
    id: "a2-economie",
    classe: "a2",
    matiere: "economie",
    bo,
    notions,
    microSkills,
  });
}
