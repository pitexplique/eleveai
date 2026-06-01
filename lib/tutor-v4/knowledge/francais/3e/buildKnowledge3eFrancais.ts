import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledge3eFrancais() {
  return buildKnowledge({
    id: "3e-francais",
    classe: "3e",
    matiere: "francais",
    bo,
    notions,
    microSkills,
  });
}
