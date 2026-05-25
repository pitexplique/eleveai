// knowledge/maths/terminale-spe/buildKnowledgeTerminaleSpe.ts
//
// Point d’entrée du knowledge pack de mathématiques
// pour la classe de Terminale spécialité.
//
// Ce fichier assemble le BO, les notions et les micro-compétences
// pour construire la base de connaissances exploitable par Tutor V4.
//
// Structure alignée sur les autres niveaux déjà en place
// afin de garantir une cohérence collège → lycée.

import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgeTerminaleSpeMaths() {
  return buildKnowledge({
    id: "terminale-spe-maths",
    classe: "terminale-spe",
    matiere: "maths",
    bo,
    notions,
    microSkills,
  });
}