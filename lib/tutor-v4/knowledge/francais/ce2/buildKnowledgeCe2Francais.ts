import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeCe2Francais() {
  return buildKnowledge({
    id: "ce2-francais",
    classe: "ce2",
    matiere: "francais",
    bo,
    notions,
    microSkills,
  });
}
