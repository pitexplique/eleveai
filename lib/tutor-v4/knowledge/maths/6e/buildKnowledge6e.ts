import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledge6eMaths() {
  return buildKnowledge({
    id: "6e-maths",
    classe: "6e",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}