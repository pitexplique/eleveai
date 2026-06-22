// knowledge/maths/premiere-spe/buildKnowledgePremiereSpe.ts
//
// Point d’entrée du knowledge pack de mathématiques (spécialité)
// pour la classe de Première générale.

import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgePremiereSpeMaths() {
  return buildKnowledge({
    id: "premiere-spe-maths",
    classe: "premiere-spe",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}
