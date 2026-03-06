import pack from "@/lib/tutor/knowledge/6e.maths.json";
import graph from "@/lib/tutor/knowledge/6e.maths.graph.json";
import type { KnowledgeGraph, KnowledgePack } from "@/lib/tutor/types";

export async function loadKnowledge(classe: string, matiere: string): Promise<{
  pack: KnowledgePack;
  graph: KnowledgeGraph;
}> {
  if (classe !== "6e" || matiere !== "maths") {
    throw new Error("Seule la configuration 6e/maths est disponible dans cette V1.");
  }

  return {
    pack: pack as KnowledgePack,
    graph: graph as KnowledgeGraph,
  };
}