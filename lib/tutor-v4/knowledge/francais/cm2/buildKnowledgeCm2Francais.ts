import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeCm2Francais() {
  return buildKnowledge({
    id: "cm2-francais",
    classe: "cm2",
    matiere: "francais",
    bo,
    notions,
    microSkills,
  });
}
