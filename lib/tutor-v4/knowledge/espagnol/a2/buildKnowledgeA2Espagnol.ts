import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeA2Espagnol() {
  return buildKnowledge({
    id: "a2-espagnol",
    classe: "a2",
    matiere: "espagnol",
    bo,
    notions,
    microSkills,
  });
}
