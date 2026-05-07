import { buildKnowledgeCm2Maths } from "@/lib/tutor-v4/knowledge/maths/cm2/buildKnowledgeCm2";
import { matrixCm2Maths } from "@/lib/tutor-v4/matrix/matrixCm2Maths";
import { buildKnowledge6eMaths } from "@/lib/tutor-v4/knowledge/maths/6e/buildKnowledge6e";
import { matrix6eMaths } from "@/lib/tutor-v4/matrix/matrix6eMaths";
import { buildKnowledge5eMaths } from "@/lib/tutor-v4/knowledge/maths/5e/buildKnowledge5e";
import { matrix5eMaths } from "@/lib/tutor-v4/matrix/matrix5eMaths";
import { buildKnowledge4eMaths } from "@/lib/tutor-v4/knowledge/maths/4e/buildKnowledge4e";
import { matrix4eMaths } from "@/lib/tutor-v4/matrix/matrix4eMaths";
import { buildKnowledge3eMaths } from "@/lib/tutor-v4/knowledge/maths/3e/buildKnowledge3e";
import { matrix3eMaths } from "@/lib/tutor-v4/matrix/matrix3eMaths";

// =========================
// TYPES
// =========================

export type Classe = "cm2" | "6e" | "5e" | "4e" | "3e";

// =========================
// KNOWLEDGE PAR CLASSE
// =========================

function getKnowledge(classe: Classe) {
  switch (classe) {
    case "cm2":
      return buildKnowledgeCm2Maths();
    case "6e":
      return buildKnowledge6eMaths();
    case "5e":
      return buildKnowledge5eMaths();
    case "4e":
      return buildKnowledge4eMaths();
    case "3e":
      return buildKnowledge3eMaths();
    default:
      return buildKnowledge6eMaths();
  }
}


function getMatrix(classe: Classe) {
  switch (classe) {
    case "cm2":
      return matrixCm2Maths;
    case "6e":
      return matrix6eMaths;
    case "5e":
      return matrix5eMaths;
    case "4e":
      return matrix4eMaths;
    case "3e":
      return matrix3eMaths;
    default:
      return matrix6eMaths;
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
  const matrix = getMatrix(classe);

  return Object.fromEntries(
    knowledge.notions.map((notion) => [
      notion.id,
      knowledge.microSkills
        .filter((micro) => micro.notionId === notion.id)
        .sort(
          (a, b) =>
            matrix.microSkillIndex.indexOf(a.id) -
            matrix.microSkillIndex.indexOf(b.id)
        )
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

// =========================
// DOMAINES BO -> NOTIONS
// =========================

export function getDomaineMap(classe: Classe) {
  const knowledge = getKnowledge(classe);

  const domaines = knowledge.bo_competences.map((bo) => {
    const notions = knowledge.notions
      .filter((notion) => notion.boId === bo.boId)
      .map((notion) => notion.id);

    return {
      id: bo.boId,
      label: bo.label,
      notions,
    };
  });

  return domaines.filter((domaine) => domaine.notions.length > 0);
}