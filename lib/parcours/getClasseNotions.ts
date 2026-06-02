import type {
  ParcoursClasse,
  ParcoursNotion,
} from "./types";

import { buildKnowledgeCpMaths } from "@/lib/tutor-v4/knowledge/maths/cp/buildKnowledgeCp";
import { buildKnowledgeCe1Maths } from "@/lib/tutor-v4/knowledge/maths/ce1/buildKnowledgeCe1";
import { buildKnowledgeCe2Maths } from "@/lib/tutor-v4/knowledge/maths/ce2/buildKnowledgeCe2";
import { buildKnowledgeCm1Maths } from "@/lib/tutor-v4/knowledge/maths/cm1/buildKnowledgeCm1";
import { buildKnowledgeCm2Maths } from "@/lib/tutor-v4/knowledge/maths/cm2/buildKnowledgeCm2";
import { buildKnowledge6eMaths } from "@/lib/tutor-v4/knowledge/maths/6e/buildKnowledge6e";
import { buildKnowledge5eMaths } from "@/lib/tutor-v4/knowledge/maths/5e/buildKnowledge5e";
import { buildKnowledge4eMaths } from "@/lib/tutor-v4/knowledge/maths/4e/buildKnowledge4e";
import { buildKnowledge3eMaths } from "@/lib/tutor-v4/knowledge/maths/3e/buildKnowledge3e";
import { buildKnowledgeTerminaleSpeMaths} from "@/lib/tutor-v4/knowledge/maths/terminale-spe/buildKnowledgeTerminaleSpe";
import { buildKnowledgeAdulteMaths } from "@/lib/tutor-v4/knowledge/maths/adulte/buildKnowledgeAdulte";

export function getClasseNotions(
  classe: ParcoursClasse
): ParcoursNotion[] {

  if (classe === "cp") {
    return buildKnowledgeCpMaths().notions;
  }

  if (classe === "ce1") {
    return buildKnowledgeCe1Maths().notions;
  }

  if (classe === "ce2") {
    return buildKnowledgeCe2Maths().notions;
  }

  if (classe === "cm1") {
    return buildKnowledgeCm1Maths().notions;
  }

  if (classe === "cm2") {
    return buildKnowledgeCm2Maths().notions;
  }
  if (classe === "6e") {
    return buildKnowledge6eMaths().notions;
  }

  if (classe === "5e") {
    return buildKnowledge5eMaths().notions;
  }

  if (classe === "4e") {
    return buildKnowledge4eMaths().notions;
  }

  if (classe === "3e") {
    return buildKnowledge3eMaths().notions;
  }
    if (classe === "terminale-spe") {
    return buildKnowledgeTerminaleSpeMaths().notions;
  }

  if (classe === "adulte") {
    return buildKnowledgeAdulteMaths().notions;
  }

  return [];
}
