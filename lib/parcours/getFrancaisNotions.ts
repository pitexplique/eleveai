import type { ParcoursNotion } from "./types";

import { buildKnowledgeSecondeFrancais } from "@/lib/tutor-v4/knowledge/francais/seconde/buildKnowledgeSecondeFrancais";
import { buildKnowledgeCpFrancais } from "@/lib/tutor-v4/knowledge/francais/cp/buildKnowledgeCpFrancais";
import { buildKnowledgeCe1Francais } from "@/lib/tutor-v4/knowledge/francais/ce1/buildKnowledgeCe1Francais";
import { buildKnowledgeCe2Francais } from "@/lib/tutor-v4/knowledge/francais/ce2/buildKnowledgeCe2Francais";
import { buildKnowledgeCm1Francais } from "@/lib/tutor-v4/knowledge/francais/cm1/buildKnowledgeCm1Francais";
import { buildKnowledgeCm2Francais } from "@/lib/tutor-v4/knowledge/francais/cm2/buildKnowledgeCm2Francais";
import { buildKnowledge6eFrancais } from "@/lib/tutor-v4/knowledge/francais/6e/buildKnowledge6eFrancais";
import { buildKnowledge5eFrancais } from "@/lib/tutor-v4/knowledge/francais/5e/buildKnowledge5eFrancais";
import { buildKnowledge4eFrancais } from "@/lib/tutor-v4/knowledge/francais/4e/buildKnowledge4eFrancais";
import { buildKnowledge3eFrancais } from "@/lib/tutor-v4/knowledge/francais/3e/buildKnowledge3eFrancais";

// Le parcours français couvre les classes qui ont une banque de questions
// (cp → 3e), contrairement aux langues (niveaux A1 → B2).
export type ParcoursClasseFrancais =
  | "seconde"
  | "cp"
  | "ce1"
  | "ce2"
  | "cm1"
  | "cm2"
  | "6e"
  | "5e"
  | "4e"
  | "3e";

export function getFrancaisNotions(
  classe: ParcoursClasseFrancais
): ParcoursNotion[] {
  switch (classe) {
    case "seconde": return buildKnowledgeSecondeFrancais().notions;
    case "cp": return buildKnowledgeCpFrancais().notions;
    case "ce1": return buildKnowledgeCe1Francais().notions;
    case "ce2": return buildKnowledgeCe2Francais().notions;
    case "cm1": return buildKnowledgeCm1Francais().notions;
    case "cm2": return buildKnowledgeCm2Francais().notions;
    case "6e": return buildKnowledge6eFrancais().notions;
    case "5e": return buildKnowledge5eFrancais().notions;
    case "4e": return buildKnowledge4eFrancais().notions;
    case "3e": return buildKnowledge3eFrancais().notions;
  }
}
