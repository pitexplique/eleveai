import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeCe1Francais() {
  return buildKnowledge({
    id: "ce1-francais",
    classe: "ce1",
    matiere: "francais",
    bo,
    notions,
    microSkills,
  });
}
