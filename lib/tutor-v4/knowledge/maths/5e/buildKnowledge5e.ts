// knowledge/maths/5e/buildKnowledge5e.ts

import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledge5eMaths() {
  return buildKnowledge({
    id: "5e-maths",
    classe: "5e",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}