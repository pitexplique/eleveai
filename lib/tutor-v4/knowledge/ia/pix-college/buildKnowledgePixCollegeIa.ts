import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgePixCollegeIa() {
  return buildKnowledge({
    id: "pix-college-ia",
    classe: "pix-college",
    matiere: "ia",
    bo,
    notions,
    microSkills,
  });
}
