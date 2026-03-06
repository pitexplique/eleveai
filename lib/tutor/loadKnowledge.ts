import pack from "@/lib/tutor/knowledge/6e.maths.json";
import type { KnowledgePack } from "@/lib/tutor/types";

export async function loadKnowledge(classe: string, matiere: string): Promise<KnowledgePack> {
  if (classe !== "6e" || matiere !== "maths") {
    throw new Error("Seule la configuration 6e/maths est disponible dans cette V1.");
  }

  return pack as KnowledgePack;
}