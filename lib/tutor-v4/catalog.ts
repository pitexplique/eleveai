// lib/tutor-v4/catalog.ts

import { notions } from "@/lib/tutor-v4/knowledge/maths/6e/notions";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/6e/microSkills";

// =========================
// NOTIONS
// =========================

export const NOTION_OPTIONS = notions.map((n) => n.id) as readonly string[];

export type NotionId = (typeof NOTION_OPTIONS)[number];

// =========================
// MAP NOTION -> MICROS
// =========================

export const NOTION_MICRO_MAP: Record<string, string[]> = Object.fromEntries(
  notions.map((notion) => [
    notion.id,
    microSkills
      .filter((micro) => micro.notionId === notion.id)
      .map((micro) => micro.id),
  ])
);

// =========================
// LABELS NOTIONS
// =========================

const NOTION_LABELS: Record<string, string> = Object.fromEntries(
  notions.map((notion) => [notion.id, notion.label])
);

// =========================
// LABELS MICROS
// =========================

export const MICRO_LABELS: Record<string, string> = Object.fromEntries(
  microSkills.map((micro) => [micro.id, micro.label])
);

// =========================
// HELPERS
// =========================

export function notionLabel(notionId: string) {
  return NOTION_LABELS[notionId] ?? notionId;
}

export function microLabel(microId: string) {
  return MICRO_LABELS[microId] ?? microId;
}