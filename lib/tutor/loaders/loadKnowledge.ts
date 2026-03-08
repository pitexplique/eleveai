import knowledge6eMaths from "@/lib/tutor/knowledge/6e.maths.knowledge.json";
import type { KnowledgePack } from "@/lib/tutor/types";

export async function loadKnowledge(
  classe: string,
  matiere: string
): Promise<KnowledgePack> {

  if (classe !== "6e" || matiere !== "maths") {
    throw new Error("Seule la configuration 6e/maths est disponible pour le moment.");
  }

  return knowledge6eMaths as KnowledgePack;
}