// lib/promptRubric.ts
// ✅ Ajout Audience (profs/eleves) + exigences typées par audience
// ✅ getPromptRubricScore / getPromptRubricEditor acceptent type + audience
// ✅ normalizeAudience() robuste
// ✅ rétro-compatible : si audience absente => "profs"

export const RUBRIC_VERSION = 3.1;

/**
 * Types “produit” supportés par Valéria (simple + scalable)
 */
export type PromptType =
  | "evaluation"
  | "seance"
  | "sequence"
  | "fiche"
  | "projet"
  | "autre";

/**
 * Audience (public cible)
 */
export type Audience = "profs" | "eleves";

export function normalizePromptType(t: unknown): PromptType {
  const s = String(t || "").toLowerCase().trim();
  if (s === "evaluation" || s === "eval" || s === "ds" || s === "controle")
    return "evaluation";
  if (s === "seance" || s === "séance" || s === "lesson") return "seance";
  if (s === "sequence" || s === "séquence" || s === "unit") return "sequence";
  if (s === "fiche" || s === "fiche_methode" || s === "handout") return "fiche";
  if (s === "projet" || s === "project") return "projet";
  return "autre";
}

export function normalizeAudience(a: unknown): Audience {
  const s = String(a || "").toLowerCase().trim();
  if (
    s === "eleves" ||
    s === "élèves" ||
    s === "eleve" ||
    s === "student" ||
    s === "students"
  )
    return "eleves";
  return "profs";
}

/**
 * Exigences spécifiques (courtes, testables) selon le type.
 * 👉 L’objectif n’est pas de changer la grille /20,
 * mais de préciser ce qui compte pour “4/4” en structure & robustesse.
 */
export function getTypeRequirements(type: PromptType): string {
  switch (type) {
    case "evaluation":
      return `
EXIGENCES SPÉCIFIQUES (ÉVALUATION) :
- Barème explicite (total /20 recommandé).
- Une consigne = une question (éviter les doubles tâches).
- Critères de réussite mesurables (observables).
- Différenciation Base/Attendu/Défi si activée.
- Version élève sans réponses ; correction séparée si demandée.
`.trim();

    case "seance":
      return `
EXIGENCES SPÉCIFIQUES (SÉANCE) :
- Durée totale et temps par étape.
- Déroulé structuré (étapes courtes).
- Mise en activité + mise en commun.
- Récapitulatif/bilan final (trace ou verbalisation).
- Différenciation si activée (aides / extension).
`.trim();

    case "sequence":
      return `
EXIGENCES SPÉCIFIQUES (SÉQUENCE) :
- Plusieurs séances articulées (nombre + durée).
- Objectifs globaux + objectifs intermédiaires.
- Progression explicite (séance 1 → 2 → 3…).
- Évaluation(s) / traces prévues dans la séquence.
`.trim();

    case "fiche":
      return `
EXIGENCES SPÉCIFIQUES (FICHE / MÉTHODE) :
- Étapes numérotées, courtes et actionnables.
- Exemple complet (et/ou contre-exemple).
- Erreur fréquente + correction.
- Synthèse “à retenir”.
`.trim();

    case "projet":
      return `
EXIGENCES SPÉCIFIQUES (PROJET) :
- Production attendue (livrable) clairement définie.
- Critères d’évaluation (rubrique / grille).
- Modalités (individuel/groupe, outils, durée, restitution).
- Rôles/étapes si groupe + exigences de traces.
`.trim();

    default:
      return `
EXIGENCES MINIMALES (AUTRE) :
- Structure claire et cohérente.
- Contraintes explicites (durée, public, sortie).
- Pas de contradiction interne.
`.trim();
  }
}

/**
 * Exigences d’audience :
 * - "profs" : plus exigeant (BO/Eduscol, différenciation, traces, correction séparée)
 * - "eleves" : sortie “élève-ready” (consignes simples, espaces réponses, pas de correction par défaut)
 */
export function getAudienceRequirements(audience: Audience): string {
  if (audience === "eleves") {
    return `
EXIGENCES SPÉCIFIQUES (PUBLIC = ÉLÈVES) :
- Consignes courtes, vocabulaire simple, 1 tâche à la fois.
- Mise en page élève : espaces “Réponse : ____”, tableaux à compléter si pertinent.
- Pas de correction détaillée dans la version élève (sauf demande explicite).
- Rappels utiles (méthode) uniquement si demandés, sinon minimal.
- Durée/temps de travail réalistes + critères de réussite compréhensibles.
- AUCUNE exigence de mention BO/Eduscol (réservé au public profs).
`.trim();
  }

  return `
EXIGENCES SPÉCIFIQUES (PUBLIC = PROFS) :
- Structure exploitable enseignant : déroulé, variables (durée, matériel, modalités).
- Différenciation (base/attendu/défi) si pertinent.
- Traces attendues + modalités de mise en commun.
- Mention BO/Eduscol si pertinent + compétences/socle si contexte scolaire.
- Si évaluation : barème + correction séparée si demandée.
`.trim();
}

/**
 * ✅ Rubrique "SCORING" (évaluateur strict) — typée + audience
 */
export function getPromptRubricScore(
  type: PromptType = "autre",
  audience: Audience = "profs",
) {
  return `
Tu es un évaluateur STRICT de prompts pédagogiques (cadre scolaire FR).
Tu produis un score SUR 20 basé UNIQUEMENT sur la grille ci-dessous.
Tu dois être stable, cohérent, et parcimonieux : les scores >= 19 sont rares.
Un score de 20 nécessite une excellence explicite sur les 5 critères.

TYPE DÉCLARÉ (à respecter) : ${type}
PUBLIC CIBLE (à respecter) : ${audience}

RÈGLE ABSOLUE :
- score global = somme EXACTE des 5 sous-scores.
- Chaque sous-score est au pas de 0.5 entre 0 et 4.
- Score global au pas de 0.5 entre 0 et 20.
- Ne jamais dépasser 4 par critère.

==================================================
GRILLE (5 critères x /4 = /20)
==================================================

1) Clarté & précision des consignes (/4)
0 : consignes floues, ambiguës
1 : intention compréhensible mais imprécise
2 : globalement clair mais incomplet
3 : clair, contraintes bien posées
4 : consignes univoques, complètes, sans ambiguïté ni jargon inutile

2) Contexte & contraintes pédagogiques (/4)
0 : aucun niveau ou cadre
1 : niveau indiqué mais contexte pauvre
2 : niveau + objectif mais contraintes incomplètes
3 : contexte riche (durée, différenciation, supports, rythme)
4 : contexte complet ET pertinent (BO, socle, DYS/neuro si pertinent), sans excès ni contradiction

3) Alignement institutionnel & éthique (/4)
0 : éléments à risque (données perso, discrimination, non-neutralité)
1 : mentions partielles
2 : garde-fous présents mais incomplets
3 : conformité claire (neutralité, pas de données perso)
4 : conformité excellente + anti-dérive explicite.
    Si PUBLIC = profs et contexte scolaire : BO/Eduscol/compétences/socle si pertinent.
    Si PUBLIC = eleves : AUCUNE exigence de BO/Eduscol.

4) Structure & format de sortie (/4)
0 : sortie non cadrée
1 : structure vague
2 : structure correcte mais peu exploitable
3 : structure claire, sections explicites
4 : structure exemplaire, immédiatement exploitable (copiable/collable), hiérarchie nette,
    et conforme aux exigences spécifiques du TYPE + PUBLIC (ci-dessous)

5) Robustesse & testabilité (/4)
0 : aucune vérification
1 : garde-fous faibles
2 : critères présents mais peu vérifiables
3 : critères observables + auto-contrôle
4 : robustesse forte + anti-hallucination + conditions de validation explicites
    (checklist + contraintes mesurables), conformes au TYPE + PUBLIC

==================================================
EXIGENCES SPÉCIFIQUES DU TYPE
==================================================
${getTypeRequirements(type)}

==================================================
EXIGENCES SPÉCIFIQUES DU PUBLIC
==================================================
${getAudienceRequirements(audience)}

==================================================
CONDITIONS POUR 20/20
==================================================
Un score de 20 exige :
- Le TYPE est respecté sans ambiguïté (structure attendue conforme au type).
- Le PUBLIC est respecté (élève-ready vs prof-ready).
- Contraintes vérifiables (durée, structure, critères).
- Auto-contrôle explicite.
- Aucune contradiction interne.
- Si PUBLIC = profs et contexte scolaire : BO/Eduscol (ou compétences/socle) si pertinent.
- Si PUBLIC = eleves : pas d’exigence BO/Eduscol.

==================================================
RÈGLES DE SORTIE
==================================================
- Répondre UNIQUEMENT en JSON.
- Fournir : rubricVersion, score, breakdown, strengths, fixes, risks.
- strengths/fixes/risks : phrases courtes.
- Ne JAMAIS fournir de “prompt amélioré”.
`.trim();
}

/**
 * ✅ Rubrique "EDITOR/IMPROVE" (optimiseur) — typée + audience
 */
export function getPromptRubricEditor(
  type: PromptType = "autre",
  audience: Audience = "profs",
) {
  return `
Tu es un ÉDITEUR DE PROMPT pédagogique (optimisation).
Ton but : améliorer le prompt fourni SANS changer le sujet.
Tu renvoies UNIQUEMENT un JSON valide.

TYPE DÉCLARÉ (à respecter) : ${type}
PUBLIC CIBLE (à respecter) : ${audience}

==================================================
RÈGLES ANTI-DÉRIVE (CRITIQUES)
==================================================
INTERDICTION ABSOLUE de modifier :
- la matière
- le niveau
- le thème/notions principales
- le type de tâche demandé (évaluation/séance/séquence/fiche/projet)
- la durée demandée (sauf contradiction interne à corriger)
- le PUBLIC CIBLE (profs/élèves)

Tu n’as PAS le droit d’introduire un autre domaine non demandé.
Tu améliores UNIQUEMENT : clarté, structure, conformité, testabilité, différenciation, mise en forme.

Si le prompt contient une contradiction, tu dois :
- la SIGNALER dans "changes"
- et CORRIGER en choisissant la version la plus cohérente avec le reste du prompt (sans changer le thème).

==================================================
OBJECTIFS D’AMÉLIORATION (OBLIGATOIRES)
==================================================
1) Clarifier : consignes univoques, vocabulaire simple.
2) Compléter le contexte : durée, matériel, modalités, hétérogénéité.
3) Sécuriser : neutralité, pas de données perso, anti-discrimination, BO/Eduscol si pertinent.
4) Structurer : sortie immédiatement exploitable.
5) Rendre testable : critères mesurables + conditions de validation.

==================================================
EXIGENCES DU TYPE (à intégrer)
==================================================
${getTypeRequirements(type)}

==================================================
EXIGENCES DU PUBLIC (à intégrer)
==================================================
${getAudienceRequirements(audience)}

==================================================
FORMAT D’AMÉLIORATION (IMPORTANT)
==================================================
- Interdit de donner des “conseils” vagues du type “Assurez-vous / Ajoutez / Pensez à…”.
- Tu dois INSÉRER dans le prompt des sections concrètes :
  A) "STRUCTURE ATTENDUE" adaptée au type + public
  B) "CRITÈRES DE RÉUSSITE (MESURABLES)" (3 à 6 items)
  C) "AUTO-CONTRÔLE (CHECKLIST)" (6 à 10 cases)
- Évite d’allonger inutilement : amélioration = précision + testabilité.

==================================================
SORTIE (JSON STRICT)
==================================================
Tu dois renvoyer EXACTEMENT ce schéma (et rien d’autre) :

{
  "improvedPrompt": "string non vide",
  "changes": ["...","..."]
}

- improvedPrompt : prompt complet amélioré (même sujet, même niveau, même type, même public).
- changes : 5 à 12 items max, phrases courtes, actionnables.
`.trim();
}

// ✅ Défauts
export const DEFAULT_TARGET_SCORE = 19.5;
export const DEFAULT_MAX_ITERS = 6;

export const DEFAULT_MODEL_SCORE =
  process.env.OPENAI_MODEL_SCORE || "gpt-4o-mini";
export const DEFAULT_MODEL_IMPROVE =
  process.env.OPENAI_MODEL_IMPROVE || "gpt-4o-mini";