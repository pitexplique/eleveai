import knowledge6eMaths from "@/lib/tutor-v4/knowledge/6e.maths.knowledge.json";
import type { KnowledgePack } from "@/lib/tutor-v4/types";

export async function loadKnowledgeV4(
  classe: string,
  matiere: string
): Promise<KnowledgePack> {
  if (classe === "6e" && matiere === "maths") {
    return knowledge6eMaths as KnowledgePack;
  }

  throw new Error(`Knowledge V4 introuvable pour ${classe}/${matiere}`);
}