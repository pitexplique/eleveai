// lib/tutor-v4/catalog.ts

import { buildKnowledge6eMaths } from "@/lib/tutor-v4/knowledge/maths/6e/buildKnowledge6e";
import { buildKnowledge5eMaths } from "@/lib/tutor-v4/knowledge/maths/5e/buildKnowledge5e";

type SupportedClasse = "6e" | "5e";

type ClassCatalog = {
  notionIds: string[];
  notionLabelById: Record<string, string>;
  microByNotion: Record<string, string[]>;
  microLabelById: Record<string, string>;
};

function buildCatalogFromKnowledge(classe: SupportedClasse): ClassCatalog {
  const knowledge =
    classe === "5e" ? buildKnowledge5eMaths() : buildKnowledge6eMaths();

  return {
    notionIds: knowledge.notions.map((notion) => notion.id),
    notionLabelById: Object.fromEntries(
      knowledge.notions.map((notion) => [notion.id, notion.label])
    ),
    microByNotion: Object.fromEntries(
      knowledge.notions.map((notion) => [notion.id, notion.microTargets])
    ),
    microLabelById: Object.fromEntries(
      knowledge.microSkills.map((micro) => [micro.id, micro.label])
    ),
  };
}

const CATALOG_BY_CLASSE: Record<SupportedClasse, ClassCatalog> = {
  "6e": buildCatalogFromKnowledge("6e"),
  "5e": buildCatalogFromKnowledge("5e"),
};

function safeClasse(classe?: string): SupportedClasse {
  return classe === "5e" ? "5e" : "6e";
}

// Compatibilité historique (6e)
export const NOTION_OPTIONS = CATALOG_BY_CLASSE["6e"].notionIds;
export type NotionId = (typeof NOTION_OPTIONS)[number];
export const NOTION_MICRO_MAP: Record<string, string[]> =
  CATALOG_BY_CLASSE["6e"].microByNotion;
export const MICRO_LABELS: Record<string, string> =
  CATALOG_BY_CLASSE["6e"].microLabelById;

export function getNotionOptions(classe?: string) {
  return CATALOG_BY_CLASSE[safeClasse(classe)].notionIds;
}

export function getNotionMicroMap(classe?: string) {
  return CATALOG_BY_CLASSE[safeClasse(classe)].microByNotion;
}

export function notionLabel(notionId: string, classe?: string) {
  const catalog = CATALOG_BY_CLASSE[safeClasse(classe)];
  return catalog.notionLabelById[notionId] ?? notionId;
}

export function microLabel(microId: string, classe?: string) {
  const catalog = CATALOG_BY_CLASSE[safeClasse(classe)];
  return catalog.microLabelById[microId] ?? microId;
}
