// knowledge/maths/4e/buildKnowledge4e.ts
//
// Point d’entrée du knowledge pack de mathématiques pour la classe de 4e.
// Ce fichier assemble le BO, les notions et les micro-compétences
// pour construire la base de connaissances exploitable par Tutor V4.
//
// Structure alignée sur les autres niveaux déjà en place
// afin de garantir une cohérence 6e → 5e → 4e.

import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledge3eMaths() {
  return buildKnowledge({
    id: "3e-maths",
    classe: "3e",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}