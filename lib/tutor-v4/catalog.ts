import { buildKnowledgeCm1Maths } from "@/lib/tutor-v4/knowledge/maths/cm1/buildKnowledgeCm1";
import { buildKnowledgeCpMaths } from "@/lib/tutor-v4/knowledge/maths/cp/buildKnowledgeCp";
import { buildKnowledgeCe1Maths } from "@/lib/tutor-v4/knowledge/maths/ce1/buildKnowledgeCe1";
import { buildKnowledgeCe2Maths } from "@/lib/tutor-v4/knowledge/maths/ce2/buildKnowledgeCe2";
import { buildKnowledgeCm2Maths } from "@/lib/tutor-v4/knowledge/maths/cm2/buildKnowledgeCm2";
import { buildKnowledge6eMaths } from "@/lib/tutor-v4/knowledge/maths/6e/buildKnowledge6e";
import { buildKnowledge5eMaths } from "@/lib/tutor-v4/knowledge/maths/5e/buildKnowledge5e";
import { buildKnowledge4eMaths } from "@/lib/tutor-v4/knowledge/maths/4e/buildKnowledge4e";
import { buildKnowledge3eMaths } from "@/lib/tutor-v4/knowledge/maths/3e/buildKnowledge3e";
import { buildKnowledgeSecondeMaths } from "@/lib/tutor-v4/knowledge/maths/seconde/buildKnowledgeSeconde";
import { buildKnowledgePremiereMaths } from "@/lib/tutor-v4/knowledge/maths/premiere/buildKnowledgePremiere";
import { buildKnowledgePremiereSpeMaths } from "@/lib/tutor-v4/knowledge/maths/premiere-spe/buildKnowledgePremiereSpe";
import { buildKnowledgeTerminaleSpeMaths } from "@/lib/tutor-v4/knowledge/maths/terminale-spe/buildKnowledgeTerminaleSpe";
import { buildKnowledgeStmgMaths } from "@/lib/tutor-v4/knowledge/maths/stmg/buildKnowledgeStmg";
import {
  ANNEE_PAR_NOTION_STMG,
  sansMarqueurAnnee,
  type AnneeStmg,
} from "@/lib/tutor-v4/knowledge/maths/stmg/annees";
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
import { buildKnowledgeSecondeFrancais } from "@/lib/tutor-v4/knowledge/francais/seconde/buildKnowledgeSecondeFrancais";
import { buildKnowledgeEco4e } from "@/lib/tutor-v4/knowledge/economie/4e/buildKnowledgeEco4e";
import { buildKnowledgeA1Espagnol } from "@/lib/tutor-v4/knowledge/espagnol/a1/buildKnowledgeA1Espagnol";
import { buildKnowledgeA2Espagnol } from "@/lib/tutor-v4/knowledge/espagnol/a2/buildKnowledgeA2Espagnol";
import { buildKnowledgeB1Espagnol } from "@/lib/tutor-v4/knowledge/espagnol/b1/buildKnowledgeB1Espagnol";
import { buildKnowledgeB2Espagnol } from "@/lib/tutor-v4/knowledge/espagnol/b2/buildKnowledgeB2Espagnol";
import { buildKnowledgeA1Ia } from "@/lib/tutor-v4/knowledge/ia/a1/buildKnowledgeA1Ia";
import { buildKnowledgeA2Ia } from "@/lib/tutor-v4/knowledge/ia/a2/buildKnowledgeA2Ia";
import { buildKnowledgeB1Ia } from "@/lib/tutor-v4/knowledge/ia/b1/buildKnowledgeB1Ia";
import { buildKnowledgeB2Ia } from "@/lib/tutor-v4/knowledge/ia/b2/buildKnowledgeB2Ia";
import { buildKnowledgeC1Ia } from "@/lib/tutor-v4/knowledge/ia/c1/buildKnowledgeC1Ia";
import { buildKnowledgePixCollegeIa } from "@/lib/tutor-v4/knowledge/ia/pix-college/buildKnowledgePixCollegeIa";
import { buildKnowledgePixLyceeIa } from "@/lib/tutor-v4/knowledge/ia/pix-lycee/buildKnowledgePixLyceeIa";

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
  | "seconde"
  | "premiere"
  | "premiere-spe"
  | "terminale-spe"
  | "stmg"
  | "adulte"
  | "a1"
  | "a2"
  | "b1"
  | "b2"
  | "c1"
  | "pix-college"
  | "pix-lycee"
  | "eco-decouverte"
  | "eco-college"
  | "eco-lycee";

export type Matiere = "maths" | "francais" | "english-maths" | "economie" | "espagnol" | "ia";
export type NiveauEconomie = "eco-decouverte" | "eco-college" | "eco-lycee";
export type NiveauEnglish = "a1" | "a2" | "b1" | "b2";
export type NiveauIa = "a1" | "a2" | "b1" | "b2" | "c1";

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
      case "seconde": return buildKnowledgeSecondeFrancais();
      /* ⛔⛔ CE REPLI EST UN PIÈGE, ET IL A DÉJÀ MORDU (14/08/2026).
         Une classe absente de ce switch ne tombe pas en panne : elle reçoit les
         125 micros du CE1, EN SILENCE. La seconde en français a ainsi rendu du
         CE1 pendant toute une session, alors que ses banques étaient écrites et
         que `loadKnowledgeV4` la connaissait déjà — deux registres, un seul
         branché. Avant d'ajouter une classe, la brancher ICI AUSSI.
         ⚠️ Ne jamais se fier à l'absence d'erreur : ce repli n'en lève aucune. */
      default:    return buildKnowledgeCe1Francais(); // fallback
    }
  }

  // Espagnol
  if (matiere === "espagnol") {
    switch (classe) {
      case "a1": return buildKnowledgeA1Espagnol();
      case "a2": return buildKnowledgeA2Espagnol();
      case "b1": return buildKnowledgeB1Espagnol();
      case "b2": return buildKnowledgeB2Espagnol();
      default:   return buildKnowledgeA1Espagnol();
    }
  }
  // IA
  if (matiere === "ia") {
    switch (classe) {
      // L'ossature Pix — les 16 compétences officielles.
      case "pix-college": return buildKnowledgePixCollegeIa();
      case "pix-lycee":   return buildKnowledgePixLyceeIa();
      // L'échelle maison A1→C1, en cours de reversement dans Pix (16/08/2026).
      case "a1": return buildKnowledgeA1Ia();
      case "a2": return buildKnowledgeA2Ia();
      case "b1": return buildKnowledgeB1Ia();
      case "b2": return buildKnowledgeB2Ia();
      case "c1": return buildKnowledgeC1Ia();
      default:   return buildKnowledgeA1Ia();
    }
  }

  // ?conomie
  if (matiere === "economie") {
    switch (classe) {
      case "eco-college": return buildKnowledgeEco4e();
      default:            return buildKnowledgeEco4e();
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
    case "seconde":
      return buildKnowledgeSecondeMaths();
    case "premiere":
      return buildKnowledgePremiereMaths();
    case "premiere-spe":
      return buildKnowledgePremiereSpeMaths();
    case "terminale-spe":
      return buildKnowledgeTerminaleSpeMaths();
    case "stmg":
      return buildKnowledgeStmgMaths();
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

// =========================
// ANNÉE À L'INTÉRIEUR D'UNE CLASSE
// =========================
// UNE SEULE CLASSE COUVRE PARFOIS DEUX ANNÉES. La STMG est le cas : son
// programme est écrit comme un cycle terminal de deux ans, et le coach en a
// fait une classe unique (voir knowledge/maths/stmg/bo.ts). Résultat, cliquer
// sur STMG servait les soixante-dix notions des deux années d'un bloc.
//
// Cette fonction rend la carte notionId → année quand la classe en a une, et
// `null` quand la question ne se pose pas — une classe = une année. C'est le
// coach qui décide quoi en faire : ici, deux pastilles « 1re » / « Tle ».
//
// ⚠️ `null` n'est pas un repli : c'est « cette classe n'a pas d'années à
// distinguer ». L'appelant affiche alors la liste entière, comme avant.
export function getAnneesNotions(
  classe: Classe,
  matiere: Matiere = "maths"
): Record<string, AnneeStmg> | null {
  if (classe === "stmg" && matiere === "maths") return ANNEE_PAR_NOTION_STMG;
  return null;
}

export { sansMarqueurAnnee };
export type { AnneeStmg };

// =========================
// ACCÈS PUBLIC AU PACK COMPLET
// =========================
// Pour les pages « programme » (/programme/<classe>) : exposer le pack
// (bo + notions + micros) côté SERVEUR uniquement — ne jamais importer
// depuis un composant client (les banques pèsent lourd dans un bundle).
export function getKnowledgePack(classe: Classe, matiere: Matiere = "maths") {
  return getKnowledge(classe, matiere);
}
