import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeCm1Francais() {
  return buildKnowledge({
    id: "cm1-francais",
    classe: "cm1",
    matiere: "francais",
    bo,
    notions,
    microSkills,
  });
}
