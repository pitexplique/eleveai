// lib/pedagogie/types.ts

export type TypeCategory =
  | "seance"
  | "exercices"
  | "evaluation"
  | "correction"
  | "differenciation"
  | "rituels"
  | "documents"
  | "ia_friendly";

export type TypeTag =
  | "word"
  | "bareme"
  | "dys"
  | "neuro"
  | "dnb"
  | "bac"
  | "duree_45"
  | "duree_10";

export type TypeItem = {
  id: string; // stable pour DB
  label: string;
  description: string;
  category: TypeCategory;
  tags?: TypeTag[];
  defaultDureeMin?: number;

  auto?: {
    openEvalPanel?: boolean;
    hideMethodePanel?: boolean;
    forceOutputStyle?: "simple" | "word" | "word_expert";
  };
};

export const TYPE_CATEGORIES: { id: TypeCategory; label: string; emoji: string }[] = [
  { id: "seance", label: "Séance / Séquence", emoji: "🧑‍🏫" },
  { id: "exercices", label: "Exercices", emoji: "🧩" },
  { id: "evaluation", label: "Évaluation", emoji: "📝" },
  { id: "correction", label: "Correction", emoji: "✅" },
  { id: "differenciation", label: "Différenciation", emoji: "♿" },
  { id: "rituels", label: "Rituels (5–10 min)", emoji: "⚡" },
  { id: "documents", label: "Documents", emoji: "📄" },
  { id: "ia_friendly", label: "IA-friendly", emoji: "🤖" },
];

export const TYPES: TypeItem[] = [
  // ---------------- SEANCE / SEQUENCE
  {
    id: "seance_cle_en_main",
    label: "Séance clé en main (45–55 min)",
    description: "Déroulé + consignes + différenciation + bilan.",
    category: "seance",
    tags: ["word", "duree_45", "neuro"],
    defaultDureeMin: 55,
    auto: { forceOutputStyle: "word_expert" },
  },
  {
    id: "sequence_2_semaines",
    label: "Séquence (2 semaines) + progression",
    description: "Objectifs, séances, évaluations, différenciation, traces écrites.",
    category: "seance",
    tags: ["word", "neuro"],
    defaultDureeMin: 0,
    auto: { forceOutputStyle: "word_expert" },
  },

  // ---------------- EXERCICES
  {
    id: "exos_progressifs_corrige",
    label: "Exercices progressifs + corrigé",
    description: "Base → standard → défi, avec corrections expliquées.",
    category: "exercices",
    tags: ["word", "neuro"],
    defaultDureeMin: 30,
    auto: { forceOutputStyle: "word" },
  },
  {
    id: "problemes_contextualises",
    label: "Problèmes contextualisés",
    description: "Situations motivantes + questions guidées + pièges fréquents.",
    category: "exercices",
    tags: ["word", "neuro"],
    defaultDureeMin: 45,
    auto: { forceOutputStyle: "word" },
  },

  // ---------------- EVALUATION
  {
    id: "eval_ds_bareme",
    label: "Évaluation (DS/contrôle) + barème",
    description: "Exos progressifs + barème + critères + différenciation.",
    category: "evaluation",
    tags: ["word", "bareme"],
    defaultDureeMin: 55,
    auto: { openEvalPanel: true, hideMethodePanel: true, forceOutputStyle: "word_expert" },
  },
  {
    id: "eval_qcm_corrige",
    label: "QCM + corrigé + justification",
    description: "QCM calibré + réponses + explications courtes (pièges).",
    category: "evaluation",
    tags: ["word", "bareme"],
    defaultDureeMin: 15,
    auto: { openEvalPanel: true, hideMethodePanel: true, forceOutputStyle: "word" },
  },
  {
    id: "eval_diagnostique_10min",
    label: "Diagnostic (10 min) – prérequis",
    description: "Court, ciblé, exploitable : repérer les lacunes immédiatement.",
    category: "evaluation",
    tags: ["duree_10", "word"],
    defaultDureeMin: 10,
    auto: { openEvalPanel: true, hideMethodePanel: true, forceOutputStyle: "word" },
  },

  // ---------------- CORRECTION
  {
    id: "correction_detaillee",
    label: "Correction détaillée (méthode + erreurs)",
    description: "Étapes, méthode, erreurs typiques, variantes.",
    category: "correction",
    tags: ["word", "neuro"],
    defaultDureeMin: 0,
    auto: { forceOutputStyle: "word_expert" },
  },
  {
    id: "remediation_erreurs",
    label: "Remédiation ciblée (erreurs fréquentes)",
    description: "Diagnostic → explication → mini-exos ciblés → bilan.",
    category: "correction",
    tags: ["neuro", "word"],
    defaultDureeMin: 20,
    auto: { forceOutputStyle: "word" },
  },

  // ---------------- DIFFERENCIATION
  {
    id: "differenciation_3_parcours",
    label: "Différenciation (3 parcours)",
    description: "Base/standard/défi + consignes + critères + aides.",
    category: "differenciation",
    tags: ["word", "dys"],
    defaultDureeMin: 45,
    auto: { forceOutputStyle: "word_expert" },
  },

  // ---------------- RITUELS
  {
    id: "rituel_5min_flash",
    label: "Rituel (5 min) – questions flash",
    description: "5 questions rapides + correction immédiate + mini-bilan.",
    category: "rituels",
    tags: ["duree_10", "neuro"],
    defaultDureeMin: 5,
    auto: { forceOutputStyle: "simple" },
  },

  // ---------------- DOCUMENTS
  {
    id: "fiche_methode",
    label: "Fiche méthode (1 page)",
    description: "Synthèse courte + exemples + pièges + mini-exos.",
    category: "documents",
    tags: ["word", "neuro", "dys"],
    defaultDureeMin: 0,
    auto: { forceOutputStyle: "word" },
  },
  {
    id: "trace_ecrite",
    label: "Trace écrite (cours) ultra claire",
    description: "Définitions + exemples + mini-exercice d’ancrage.",
    category: "documents",
    tags: ["word", "dys", "neuro"],
    defaultDureeMin: 0,
    auto: { forceOutputStyle: "word" },
  },

  // ---------------- IA FRIENDLY
  {
    id: "devoir_ia_friendly",
    label: "Devoir IA-friendly (traces obligatoires)",
    description: "Prompt élève + réponse IA + analyse critique + correction perso.",
    category: "ia_friendly",
    tags: ["word", "neuro"],
    defaultDureeMin: 45,
    auto: { forceOutputStyle: "word_expert" },
  },
];

export function getTypeById(id?: string | null): TypeItem | null {
  if (!id) return null;
  return TYPES.find((t) => t.id === id) ?? null;
}

export function getTypesForContext(params: { classe?: string; matiere?: string }) {
  const { classe } = params;

  let out = [...TYPES];

  // Tags examens selon classe (ex: 3e = DNB, lycée = BAC)
  if (classe === "3e") {
    out = out.map((t) => ({
      ...t,
      tags: t.tags?.includes("dnb") ? t.tags : t.tags,
    }));
  } else if (["Seconde", "Première", "Terminale"].includes(classe || "")) {
    out = out.map((t) => ({
      ...t,
      tags: t.tags?.includes("bac") ? t.tags : t.tags,
    }));
  }

  return out;
}

export function getCategoryMeta(id: TypeCategory) {
  return TYPE_CATEGORIES.find((c) => c.id === id) ?? TYPE_CATEGORIES[0];
}

export function tagToBadge(tag: TypeTag): { label: string; tone: "slate" | "amber" | "emerald" | "sky" } {
  switch (tag) {
    case "word":
      return { label: "Word", tone: "sky" };
    case "bareme":
      return { label: "Barème", tone: "amber" };
    case "dys":
      return { label: "DYS", tone: "emerald" };
    case "neuro":
      return { label: "Neuro", tone: "emerald" };
    case "dnb":
      return { label: "DNB", tone: "slate" };
    case "bac":
      return { label: "BAC", tone: "slate" };
    case "duree_45":
      return { label: "≈45–55", tone: "slate" };
    case "duree_10":
      return { label: "≈5–10", tone: "slate" };
    default:
      return { label: tag, tone: "slate" };
  }
}
