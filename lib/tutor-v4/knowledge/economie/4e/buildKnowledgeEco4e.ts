import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeEco4e() {
  return buildKnowledge({
    id: "eco-college-economie",
    classe: "eco-college",
    matiere: "economie",
    bo,
    notions,
    microSkills,
  });
}
