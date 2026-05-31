import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeCpFrancais() {
  return buildKnowledge({
    id: "cp-francais",
    classe: "cp",
    matiere: "francais",
    bo,
    notions,
    microSkills,
  });
}
