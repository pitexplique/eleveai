import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgePixLyceeIa() {
  return buildKnowledge({
    id: "pix-lycee-ia",
    classe: "pix-lycee",
    matiere: "ia",
    bo,
    notions,
    microSkills,
  });
}
