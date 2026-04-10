// lib/tutor-v4/knowledge/buildKnowledge.ts

import type {
  KnowledgeBoCompetence,
  KnowledgeMicroSkill,
  KnowledgeNotion,
  KnowledgePack,
} from "@/lib/tutor-v4/types";

export type NotionSource = Omit<KnowledgeNotion, "microTargets">;
export type MicroSkillSource = Omit<KnowledgeMicroSkill, "boId">;

function ensureNoDuplicateIds(items: { id: string }[], label: string) {
  const seen = new Set<string>();

  for (const item of items) {
    if (seen.has(item.id)) {
      throw new Error(`Doublon détecté dans ${label} : "${item.id}"`);
    }
    seen.add(item.id);
  }
}

export function buildKnowledge(params: {
  id: string;
  classe: string;
  matiere: string;
  bo: KnowledgeBoCompetence[];
  notions: NotionSource[];
  microSkills: MicroSkillSource[];
}): KnowledgePack {
  const { id, classe, matiere, bo, notions, microSkills } = params;

  // =========================
  // Vérifications
  // =========================
  ensureNoDuplicateIds(notions, "notions");
  ensureNoDuplicateIds(microSkills, "microSkills");

  const boIds = new Set(bo.map((item) => item.boId));
  const notionIds = new Set(notions.map((item) => item.id));
  const microIds = new Set(microSkills.map((item) => item.id));

  // Vérification notions
  for (const notion of notions) {
    if (!boIds.has(notion.boId)) {
      throw new Error(
        `Notion "${notion.id}" → boId inconnu : "${notion.boId}"`
      );
    }

    for (const prereq of notion.prerequis) {
      if (!notionIds.has(prereq)) {
        throw new Error(
          `Notion "${notion.id}" → prérequis de notion inconnu : "${prereq}"`
        );
      }
    }
  }

  // Vérification microSkills
  for (const micro of microSkills) {
    if (!notionIds.has(micro.notionId)) {
      throw new Error(
        `MicroSkill "${micro.id}" → notion inconnue : "${micro.notionId}"`
      );
    }

    for (const prereq of micro.prerequis) {
      if (!microIds.has(prereq)) {
        throw new Error(
          `MicroSkill "${micro.id}" → prérequis de microSkill inconnu : "${prereq}"`
        );
      }
    }
  }

  // =========================
  // Enrichissement
  // =========================
  const notionById = new Map(notions.map((n) => [n.id, n] as const));

  const notionsWithMicroTargets: KnowledgeNotion[] = notions.map((notion) => ({
    ...notion,
    microTargets: microSkills
      .filter((micro) => micro.notionId === notion.id)
      .map((micro) => micro.id),
  }));

  const enrichedMicroSkills: KnowledgeMicroSkill[] = microSkills.map((micro) => {
    const notion = notionById.get(micro.notionId);

    if (!notion) {
      throw new Error(`MicroSkill "${micro.id}" → notion introuvable`);
    }

    return {
      ...micro,
      boId: notion.boId,
    };
  });

  return {
    id,
    classe,
    matiere,
    bo_competences: bo,
    notions: notionsWithMicroTargets,
    microSkills: enrichedMicroSkills,
    microGraph: [],
  };
}