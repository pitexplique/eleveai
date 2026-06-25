/**
 * diagnoseEngine.ts
 *
 * Remédiation par prérequis fragiles (Phase 1 — câblage du reroutage).
 *
 * Principe : quand un élève bloque sur une micro-compétence, on ne se contente
 * pas de baisser la difficulté sur la MÊME micro — on rebascule l'entraînement
 * vers le prérequis le plus faible (via le graphe `prerequis[]`, déjà audité :
 * 0 cycle / 0 orphelin sur maths CP→terminale et français CP→3e), on le
 * consolide, puis on revient à la compétence cible.
 *
 * PÉRIMÈTRE STRICT : maths + français uniquement. tutor-v4 sert aussi
 * english-maths / espagnol / ia / economie / anglais : la remédiation est gatée
 * pour ne JAMAIS se déclencher pour ces matières (cf. isRemediationEnabled).
 *
 * Note Phase 1 : la maîtrise est par session, initialisée à 50, donc aucun
 * prérequis n'est « sous le seuil » au démarrage. Le déclencheur réel est donc
 * « l'élève est bloqué » (2 erreurs sur le même niveau), pas le seuil. Le seuil
 * ci-dessous reste exposé pour les phases ultérieures (maîtrise persistante).
 */

import type {
  KnowledgePack,
  KnowledgeMicroSkill,
  SuspectedPrereq,
  TutorQuestionOption,
} from "@/lib/tutor-v4/types";

/** Normalisation alignée sur l'évaluateur (cf. lib/tutor/evaluation/evaluator). */
function normalizeChoice(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*\/\s*/g, "/")
    .replace(",", ".");
}

/** Maîtrise (0–100) en-dessous de laquelle un prérequis est considéré fragile. */
export const REMEDIATION_MASTERY_THRESHOLD = 40;

/** Nombre maximum de tours passés sur un prérequis avant de revenir à la cible. */
export const REMEDIATION_MAX_STEPS = 3;

/** Matières pour lesquelles la remédiation est active. */
export function isRemediationEnabled(matiere: string): boolean {
  return matiere === "maths" || matiere === "francais";
}

export type RemediationTarget = {
  microId: string;
  notionId: string;
  label: string;
  mastery: number;
};

/**
 * Diagnostic « high confidence » : l'élève a coché un distracteur explicitement
 * étiqueté (cf. choiceDiagnostics). On peut alors remédier dès la 1ʳᵉ erreur,
 * sans attendre que l'élève soit bloqué.
 *
 * Renvoie le prérequis suspecté si le distracteur coché porte un prereqMicroId
 * qui existe bien dans le pack ; sinon null.
 */
export function diagnoseFromChoice(args: {
  knowledge: KnowledgePack;
  option: TutorQuestionOption;
  normalizedAnswer: string;
}): SuspectedPrereq | null {
  const { knowledge, option, normalizedAnswer } = args;

  if (!option.choiceDiagnostics || option.choiceDiagnostics.length === 0) {
    return null;
  }

  const match = option.choiceDiagnostics.find(
    (d) => normalizeChoice(d.choice) === normalizedAnswer
  );

  if (!match || !match.prereqMicroId) {
    return null;
  }

  const exists = knowledge.microSkills.some((m) => m.id === match.prereqMicroId);
  if (!exists) {
    return null;
  }

  return { microId: match.prereqMicroId, cause: match.cause, confidence: "high" };
}

/**
 * Classe les prérequis DIRECTS d'une micro-compétence du plus fragile au moins
 * fragile (maîtrise croissante). Profondeur 1 : on ne remonte pas plus haut
 * dans le graphe (cf. limite « primaire sur-enraciné » du playbook : on recule
 * d'un seul cran à la fois).
 *
 * Le prérequis peut appartenir à une AUTRE notion (diagnostic croisé, ex.
 * division ← tables) — c'est volontaire, on renvoie donc son notionId.
 */
export function rankPrerequisitesByFragility(args: {
  knowledge: KnowledgePack;
  microId: string;
  masteryByMicro: Record<string, number>;
}): RemediationTarget[] {
  const { knowledge, microId, masteryByMicro } = args;

  const micro = knowledge.microSkills.find((m) => m.id === microId);
  if (!micro || micro.prerequis.length === 0) {
    return [];
  }

  return micro.prerequis
    .map((id) => knowledge.microSkills.find((m) => m.id === id))
    .filter((m): m is KnowledgeMicroSkill => Boolean(m))
    .map((m) => ({
      microId: m.id,
      notionId: m.notionId,
      label: m.label,
      mastery: masteryByMicro[m.id] ?? 50,
    }))
    .sort((a, b) => a.mastery - b.mastery);
}
