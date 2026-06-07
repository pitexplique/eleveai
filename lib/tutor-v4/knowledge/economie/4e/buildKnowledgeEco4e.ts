import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeEco4e() {
  return buildKnowledge({
    id: "4e-economie",
    classe: "4e",
    matiere: "economie",
    bo,
    notions,
    microSkills,
  });
}
