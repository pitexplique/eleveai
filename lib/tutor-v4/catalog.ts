import { buildKnowledgeCm1Maths } from "@/lib/tutor-v4/knowledge/maths/cm1/buildKnowledgeCm1";
import { buildKnowledgeCpMaths } from "@/lib/tutor-v4/knowledge/maths/cp/buildKnowledgeCp";
import { buildKnowledgeCe1Maths } from "@/lib/tutor-v4/knowledge/maths/ce1/buildKnowledgeCe1";
import { buildKnowledgeCe2Maths } from "@/lib/tutor-v4/knowledge/maths/ce2/buildKnowledgeCe2";
import { buildKnowledgeCm2Maths } from "@/lib/tutor-v4/knowledge/maths/cm2/buildKnowledgeCm2";
import { buildKnowledge6eMaths } from "@/lib/tutor-v4/knowledge/maths/6e/buildKnowledge6e";
import { buildKnowledge5eMaths } from "@/lib/tutor-v4/knowledge/maths/5e/buildKnowledge5e";
import { buildKnowledge4eMaths } from "@/lib/tutor-v4/knowledge/maths/4e/buildKnowledge4e";
import { buildKnowledge3eMaths } from "@/lib/tutor-v4/knowledge/maths/3e/buildKnowledge3e";
import { buildKnowledgeTerminaleSpeMaths } from "@/lib/tutor-v4/knowledge/maths/terminale-spe/buildKnowledgeTerminaleSpe";
import { buildKnowledgeAdulteMaths } from "@/lib/tutor-v4/knowledge/maths/adulte/buildKnowledgeAdulte";
import { buildKnowledgeCpFrancais } from "@/lib/tutor-v4/knowledge/francais/cp/buildKnowledgeCpFrancais";
import { buildKnowledgeA1English } from "@/lib/tutor-v4/knowledge/english/a1/buildKnowledgeA1English";
import { buildKnowledgeA2English } from "@/lib/tutor-v4/knowledge/english/a2/buildKnowledgeA2English";
import { buildKnowledgeB1English } from "@/lib/tutor-v4/knowledge/english/b1/buildKnowledgeB1English";
import { buildKnowledgeB2English } from "@/lib/tutor-v4/knowledge/english/b2/buildKnowledgeB2English";
import { buildKnowledgeCe1Francais } from "@/lib/tutor-v4/knowledge/francais/ce1/buildKnowledgeCe1Francais";
import { buildKnowledgeCe2Francais } from "@/lib/tutor-v4/knowledge/francais/ce2/buildKnowledgeCe2Francais";
import { buildKnowledgeCm1Francais } from "@/lib/tutor-v4/knowledge/francais/cm1/buildKnowledgeCm1Francais";
import { buildKnowledgeCm2Francais } from "@/lib/tutor-v4/knowledge/francais/cm2/buildKnowledgeCm2Francais";
import { buildKnowledge6eFrancais } from "@/lib/tutor-v4/knowledge/francais/6e/buildKnowledge6eFrancais";
import { buildKnowledge5eFrancais } from "@/lib/tutor-v4/knowledge/francais/5e/buildKnowledge5eFrancais";
import { buildKnowledge4eFrancais } from "@/lib/tutor-v4/knowledge/francais/4e/buildKnowledge4eFrancais";
import { buildKnowledge3eFrancais } from "@/lib/tutor-v4/knowledge/francais/3e/buildKnowledge3eFrancais";

// =========================
// TYPES
// =========================

export type Classe =
  | "cp"
  | "ce1"
  | "ce2"
  | "cm1"
  | "cm2"
  | "6e"
  | "5e"
  | "4e"
  | "3e"
  | "terminale-spe"
  | "adulte"
  | "a1"
  | "a2"
  | "b1"
  | "b2";

export type Matiere = "maths" | "francais" | "english-maths";
export type NiveauEnglish = "a1" | "a2" | "b1" | "b2";

// =========================
// KNOWLEDGE PAR CLASSE + MATIERE
// =========================

function getKnowledge(classe: Classe, matiere: Matiere = "maths") {
  // Français
  if (matiere === "francais") {
    switch (classe) {
      case "cp":  return buildKnowledgeCpFrancais();
      case "ce1": return buildKnowledgeCe1Francais();
      case "ce2": return buildKnowledgeCe2Francais();
      case "cm1": return buildKnowledgeCm1Francais();
      case "cm2": return buildKnowledgeCm2Francais();
      case "6e": return buildKnowledge6eFrancais();
      case "5e": return buildKnowledge5eFrancais();
      case "4e": return buildKnowledge4eFrancais();
      case "3e": return buildKnowledge3eFrancais();
      default:    return buildKnowledgeCe1Francais(); // fallback
    }
  }

  // English
  if (matiere === "english-maths") {
    switch (classe) {
      case "a1": return buildKnowledgeA1English();
      case "a2": return buildKnowledgeA2English();
      case "b1": return buildKnowledgeB1English();
      case "b2": return buildKnowledgeB2English();
      default:   return buildKnowledgeA1English();
    }
  }

  // Maths (défaut)
  switch (classe) {
    case "cp":
      return buildKnowledgeCpMaths();
    case "ce1":
      return buildKnowledgeCe1Maths();
    case "ce2":
      return buildKnowledgeCe2Maths();
    case "cm1":
      return buildKnowledgeCm1Maths();
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
    case "terminale-spe":
      return buildKnowledgeTerminaleSpeMaths();
    case "adulte":
      return buildKnowledgeAdulteMaths();
    default:
      return buildKnowledge6eMaths();
  }
}

// =========================
// NOTIONS
// =========================

export function getNotionOptions(classe: Classe, matiere: Matiere = "maths"): string[] {
  const knowledge = getKnowledge(classe, matiere);
  return knowledge.notions.map((n) => n.id);
}

// =========================
// MAP NOTION -> MICROS
// =========================

export function getNotionMicroMap(classe: Classe, matiere: Matiere = "maths"): Record<string, string[]> {
  const knowledge = getKnowledge(classe, matiere);

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

export function getNotionLabelMap(classe: Classe, matiere: Matiere = "maths"): Record<string, string> {
  const knowledge = getKnowledge(classe, matiere);

  return Object.fromEntries(
    knowledge.notions.map((notion) => [notion.id, notion.label])
  );
}

export function getMicroLabelMap(classe: Classe, matiere: Matiere = "maths"): Record<string, string> {
  const knowledge = getKnowledge(classe, matiere);

  return Object.fromEntries(
    knowledge.microSkills.map((micro) => [micro.id, micro.label])
  );
}

// =========================
// HELPERS
// =========================

export function notionLabel(notionId: string, classe: Classe, matiere: Matiere = "maths"): string {
  const map = getNotionLabelMap(classe, matiere);
  return map[notionId] ?? notionId;
}

export function microLabel(microId: string, classe: Classe, matiere: Matiere = "maths"): string {
  const map = getMicroLabelMap(classe, matiere);
  return map[microId] ?? microId;
}

// =========================
// DOMAINES BO -> NOTIONS
// =========================

export function getDomaineMap(classe: Classe, matiere: Matiere = "maths") {
  const knowledge = getKnowledge(classe, matiere);

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
