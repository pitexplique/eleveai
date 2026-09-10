import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeA1Economie() {
  return buildKnowledge({
    id: "a1-economie",
    classe: "a1",
    matiere: "economie",
    bo,
    notions,
    microSkills,
  });
}
