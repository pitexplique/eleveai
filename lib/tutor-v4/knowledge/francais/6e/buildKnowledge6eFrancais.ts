import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledge6eFrancais() {
  return buildKnowledge({
    id: "6e-francais",
    classe: "6e",
    matiere: "francais",
    bo,
    notions,
    microSkills,
  });
}
