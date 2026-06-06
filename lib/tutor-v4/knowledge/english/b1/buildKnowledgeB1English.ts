import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeB1English() {
  return buildKnowledge({
    id: "b1-english",
    classe: "b1",
    matiere: "english-maths",
    bo,
    notions,
    microSkills,
  });
}
