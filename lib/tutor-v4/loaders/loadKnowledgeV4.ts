import { loadKnowledge6eMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledge6eMaths"
import type { KnowledgePack } from "@/lib/tutor-v4/types";

export async function loadKnowledgeV4(
  classe: string,
  matiere: string
): Promise<KnowledgePack> {
  if (classe === "6e" && matiere === "maths") {
     return loadKnowledge6eMaths() as KnowledgePack;
  }

  throw new Error(`Knowledge V4 introuvable pour ${classe}/${matiere}`);
}