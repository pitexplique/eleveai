import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledge4eFrancais() {
  return buildKnowledge({
    id: "4e-francais",
    classe: "4e",
    matiere: "francais",
    bo,
    notions,
    microSkills,
  });
}
