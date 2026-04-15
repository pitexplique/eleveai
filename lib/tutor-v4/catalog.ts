import { buildKnowledge6eMaths } from "@/lib/tutor-v4/knowledge/maths/6e/buildKnowledge6e";
import { buildKnowledge5eMaths } from "@/lib/tutor-v4/knowledge/maths/5e/buildKnowledge5e";
import { buildKnowledge4eMaths } from "@/lib/tutor-v4/knowledge/maths/4e/buildKnowledge4e";

// =========================
// TYPES
// =========================

export type Classe = "6e" | "5e" | "4e";

// =========================
// KNOWLEDGE PAR CLASSE
// =========================

function getKnowledge(classe: Classe) {
  switch (classe) {
    case "6e":
      return buildKnowledge6eMaths();
    case "5e":
      return buildKnowledge5eMaths();
    case "4e":
      return buildKnowledge4eMaths();
    default:
      return buildKnowledge6eMaths();
  }
}

// =========================
// NOTIONS
// =========================

export function getNotionOptions(classe: Classe): string[] {
  const knowledge = getKnowledge(classe);
  return knowledge.notions.map((n) => n.id);
}

// =========================
// MAP NOTION -> MICROS
// =========================

export function getNotionMicroMap(classe: Classe): Record<string, string[]> {
  const knowledge = getKnowledge(classe);

  return Object.fromEntries(
    knowledge.notions.map((notion) => [
      notion.id,
      knowledge.microSkills
        .filter((micro) => micro.notionId === notion.id)
        .map((micro) => micro.id),
    ])
  );
}

// =========================
// LABELS
// =========================

export function getNotionLabelMap(classe: Classe): Record<string, string> {
  const knowledge = getKnowledge(classe);

  return Object.fromEntries(
    knowledge.notions.map((notion) => [notion.id, notion.label])
  );
}

export function getMicroLabelMap(classe: Classe): Record<string, string> {
  const knowledge = getKnowledge(classe);

  return Object.fromEntries(
    knowledge.microSkills.map((micro) => [micro.id, micro.label])
  );
}

// =========================
// HELPERS
// =========================

export function notionLabel(notionId: string, classe: Classe): string {
  const map = getNotionLabelMap(classe);
  return map[notionId] ?? notionId;
}

export function microLabel(microId: string, classe: Classe): string {
  const map = getMicroLabelMap(classe);
  return map[microId] ?? microId;
}