import { loadKnowledgeCm2Maths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeCm2Maths";
import { loadKnowledge6eMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledge6eMaths";
import { loadKnowledge5eMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledge5eMaths";
import { loadKnowledge4eMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledge4eMaths";
import { loadKnowledge3eMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledge3eMaths";
import type { KnowledgePack } from "@/lib/tutor-v4/types";

export async function loadKnowledgeV4(
  classe: string,
  matiere: string
): Promise<KnowledgePack> {
  if (classe === "cm2" && matiere === "maths") {
    return loadKnowledgeCm2Maths() as KnowledgePack;
  }

  if (classe === "6e" && matiere === "maths") {
    return loadKnowledge6eMaths() as KnowledgePack;
  }

  if (classe === "5e" && matiere === "maths") {
    return loadKnowledge5eMaths() as KnowledgePack;
  }

  if (classe === "4e" && matiere === "maths") {
    return loadKnowledge4eMaths() as KnowledgePack;
  }

  if (classe === "3e" && matiere === "maths") {
    return loadKnowledge3eMaths() as KnowledgePack;
  }

  throw new Error(`Knowledge V4 introuvable pour ${classe}/${matiere}`);
}