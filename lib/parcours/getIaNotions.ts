import type { ParcoursNiveauIa, ParcoursNotion } from "./types";

import { buildKnowledgePixCollegeIa } from "@/lib/tutor-v4/knowledge/ia/pix-college/buildKnowledgePixCollegeIa";
import { buildKnowledgePixLyceeIa } from "@/lib/tutor-v4/knowledge/ia/pix-lycee/buildKnowledgePixLyceeIa";

/**
 * Les notions du parcours IA = les COMPÉTENCES du référentiel Pix.
 *
 * ⚠️ 17/08/2026 — c'était l'échelle maison A1→C1, qui n'existe plus nulle part
 * ailleurs : le coach et l'évaluation blanche parlent Pix depuis le 16/08. Un
 * parcours qui aurait gardé ses cinq niveaux aurait proposé à l'élève une
 * troisième façon de nommer les mêmes choses — et il aurait continué de faire
 * vivre cinq banques qu'on remplace.
 *
 * Collège = paliers novice + indépendant (16 compétences).
 * Lycée   = paliers avancé + expert (15 : la 3.4 n'a aucun savoir-faire de ce
 *           niveau au référentiel, elle en sort d'elle-même).
 */
export function getIaNotions(niveau: ParcoursNiveauIa): ParcoursNotion[] {
  switch (niveau) {
    case "lycee": return buildKnowledgePixLyceeIa().notions;
    case "college":
    default: return buildKnowledgePixCollegeIa().notions;
  }
}
