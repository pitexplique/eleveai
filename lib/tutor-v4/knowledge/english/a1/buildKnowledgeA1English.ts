import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeA1English() {
  return buildKnowledge({
    id: "a1-english",
    classe: "a1",
    matiere: "english-maths",
    bo,
    notions,
    microSkills,
  });
}
