import pack from "@/lib/tutor/knowledge/college/6e.maths.knowledge.json";
import type { KnowledgePack } from "@/lib/tutor/types";

export async function loadKnowledge(classe: string, matiere: string): Promise<KnowledgePack> {
  if (classe !== "6e" || matiere !== "maths") {
    throw new Error("Seule la configuration 6e/maths est disponible dans cette V2.");
  }

  return pack as KnowledgePack;
}