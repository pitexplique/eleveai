import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeA2English() {
  return buildKnowledge({
    id: "a2-english",
    classe: "a2",
    matiere: "english-maths",
    bo,
    notions,
    microSkills,
  });
}
