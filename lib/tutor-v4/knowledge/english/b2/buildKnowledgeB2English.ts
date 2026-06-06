import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeB2English() {
  return buildKnowledge({
    id: "b2-english",
    classe: "b2",
    matiere: "english",
    bo,
    notions,
    microSkills,
  });
}
