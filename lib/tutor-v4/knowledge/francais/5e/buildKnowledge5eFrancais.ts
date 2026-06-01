import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledge5eFrancais() {
  return buildKnowledge({
    id: "5e-francais",
    classe: "5e",
    matiere: "francais",
    bo,
    notions,
    microSkills,
  });
}
