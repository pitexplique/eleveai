import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeB1Espagnol() {
  return buildKnowledge({
    id: "b1-espagnol",
    classe: "b1",
    matiere: "espagnol",
    bo,
    notions,
    microSkills,
  });
}
