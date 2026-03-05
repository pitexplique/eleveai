import type { KnowledgeGraph } from "@/lib/tutor/types";

export function selectStrongPrerequisite(notionId: string, graph: KnowledgeGraph): string | null {
  const edge = graph.edges.find((e) => e.to === notionId && e.strength === "strong");
  return edge?.from ?? null;
}
