import type {
  ParcoursClasse,
  ParcoursNotion,
} from "./types";

import { buildKnowledge6eMaths } from "@/lib/tutor-v4/knowledge/maths/6e/buildKnowledge6e";
import { buildKnowledge5eMaths } from "@/lib/tutor-v4/knowledge/maths/5e/buildKnowledge5e";
import { buildKnowledge4eMaths } from "@/lib/tutor-v4/knowledge/maths/4e/buildKnowledge4e";
import { buildKnowledge3eMaths } from "@/lib/tutor-v4/knowledge/maths/3e/buildKnowledge3e";

export function getClasseNotions(
  classe: ParcoursClasse
): ParcoursNotion[] {
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

  return [];
}