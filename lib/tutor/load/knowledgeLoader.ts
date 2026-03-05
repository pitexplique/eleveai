import type { KnowledgeGraph, KnowledgePack } from "@/lib/tutor/types";

export async function loadKnowledge(classe: string, matiere: string): Promise<{ pack: KnowledgePack; graph: KnowledgeGraph }> {
  if (matiere !== "maths") {
    throw new Error("Matière non supportée en V1.");
  }

  if (classe === "6e") {
    const pack = (await import("@/lib/tutor/knowledge/college/6e/maths.json")).default as KnowledgePack;
    const graph = (await import("@/lib/tutor/knowledge/college/6e/maths.graph.json")).default as KnowledgeGraph;
    return { pack, graph };
  }

  if (classe === "4e") {
    const pack = (await import("@/lib/tutor/knowledge/college/4e/maths.json")).default as KnowledgePack;
    const graph = (await import("@/lib/tutor/knowledge/college/4e/maths.graph.json")).default as KnowledgeGraph;
    return { pack, graph };
  }

  throw new Error("Classe non supportée en V1.");
}
