import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeB2Espagnol() {
  return buildKnowledge({
    id: "b2-espagnol",
    classe: "b2",
    matiere: "espagnol",
    bo,
    notions,
    microSkills,
  });
}
