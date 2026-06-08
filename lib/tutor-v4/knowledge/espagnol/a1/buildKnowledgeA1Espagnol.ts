import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeA1Espagnol() {
  return buildKnowledge({
    id: "a1-espagnol",
    classe: "a1",
    matiere: "espagnol",
    bo,
    notions,
    microSkills,
  });
}
