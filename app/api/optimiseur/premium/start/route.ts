// app/api/optimiseur/premium/start/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { normalizePromptType, normalizeAudience } from "@/lib/promptRubric";
import {
  cleanupOldSessions,
  createSession,
  deleteSession,
  type PremiumQuestion,
} from "@/lib/premiumSessionStore";
import crypto from "crypto";
import { openai } from "@/lib/openai";

function uid() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function hash12(s: string) {
  return crypto.createHash("sha256").update(s || "", "utf8").digest("hex").slice(0, 12);
}

/** ✅ Retire tout ancien bloc Premium (évite de repartir sur un prompt “sale”) */
function stripPremiumBlock(input: string) {
  const s = String(input || "").replace(/^\uFEFF/, "");
  return s.replace(/\n?===\s*PRÉCISIONS\s*\(Valeria Premium\)\s*===([\s\S]*)$/i, "").trim();
}

/**
 * ✅ Index côté serveur : 1 session active par clientRunId
 * (évite que “Premium” reparte sur une session précédente en cas de relance rapide / multi tabs)
 */
declare global {
  // eslint-disable-next-line no-var
  var __VALERIA_PREMIUM_BY_CLIENT__: Map<string, string> | undefined;
}
function getClientIndex() {
  if (!globalThis.__VALERIA_PREMIUM_BY_CLIENT__) {
    globalThis.__VALERIA_PREMIUM_BY_CLIENT__ = new Map();
  }
  return globalThis.__VALERIA_PREMIUM_BY_CLIENT__;
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

const ALL_GAPS = ["clarity", "context", "compliance", "structure", "robustness"] as const;
type Gap = (typeof ALL_GAPS)[number];

/**
 * ✅ Priorisation : on attaque d’abord ce qui bloque le 20/20 le plus souvent
 * (robustness + compliance sont des “verrous” typiques quand on plafonne à 17.5–18)
 */
const GAP_TIE_ORDER: Gap[] = ["robustness", "compliance", "structure", "context", "clarity"];

/** Helper typé pour lire breakdown sans 'any' partout */
type ScoreReportLike = {
  score?: number;
  breakdown?: Partial<Record<Gap, number>>;
};

function getBreakdownValues(scoreReport: unknown): Record<Gap, number> {
  const sr = (scoreReport ?? {}) as ScoreReportLike;
  const b = (sr.breakdown ?? {}) as Partial<Record<Gap, number>>;

  const out = {} as Record<Gap, number>;
  for (const gap of ALL_GAPS) {
    const raw = Number(b[gap]);
    out[gap] = Number.isFinite(raw) ? clamp(raw, 0, 4) : 4; // défaut = 4 si absent
  }
  return out;
}

/**
 * ✅ UX Prof “SMART” : nombre de questions basé sur l’écart à 4
 * (casse le plateau 17.5–18 quand plusieurs critères sont à 3.5/4)
 */
function desiredQuestionCountFromScore(scoreReport: unknown) {
  const vals = getBreakdownValues(scoreReport);

  const debt = ALL_GAPS.reduce((acc, g) => acc + (4 - vals[g]), 0); // somme des écarts à 4
  const notPerfect = ALL_GAPS.filter((g) => vals[g] < 3.99).length;

  let desired: number;
  if (debt < 0.3) desired = 2;
  else if (debt < 0.9) desired = 3;
  else if (debt < 1.6) desired = 4;
  else desired = 5;

  // filet anti-plateau
  if (notPerfect >= 3) desired = Math.max(desired, 4);

  return clamp(desired, 2, 5);
}

function pickPriorityGaps(scoreReport: unknown, desiredCount: number): Gap[] {
  const vals = getBreakdownValues(scoreReport);

  const items: Array<{ gap: Gap; v: number; tie: number }> = GAP_TIE_ORDER.map((gap, i) => ({
    gap,
    v: vals[gap],
    tie: i,
  }));

  items.sort((a, c) => (a.v !== c.v ? a.v - c.v : a.tie - c.tie));

  const out = items.slice(0, clamp(desiredCount, 1, ALL_GAPS.length)).map((x) => x.gap);

  while (out.length < desiredCount) out.push(GAP_TIE_ORDER[out.length] ?? "structure");
  return out.slice(0, desiredCount);
}

function validateQuestions(
  raw: unknown,
  desiredCount: number,
  allowedGapsInOrder: readonly Gap[],
): { ok: true; questions: PremiumQuestion[] } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") return { ok: false, error: "JSON invalide (objet attendu)." };

  const qs = (raw as { questions?: unknown }).questions;
  if (!Array.isArray(qs)) return { ok: false, error: "JSON invalide (questions[] manquant)." };

  if (qs.length !== desiredCount) {
    return {
      ok: false,
      error: `Nombre de questions invalide (${qs.length}) — attendu ${desiredCount}.`,
    };
  }

  // ✅ On force l'ordre exact (Q1 -> gap1, Q2 -> gap2, etc.)
  for (let i = 0; i < qs.length; i++) {
    const qObj = qs[i] as Record<string, unknown>;
    const gap = String(qObj?.gap ?? "").trim() as Gap;
    const expected = allowedGapsInOrder[i];

    if (gap !== expected) {
      return {
        ok: false,
        error: `Ordre/gap invalide à l’index ${i} (reçu="${gap}", attendu="${expected}").`,
      };
    }
  }

  const out: PremiumQuestion[] = [];
  const seenIds = new Set<string>();

  for (let i = 0; i < qs.length; i++) {
    const qObj = qs[i] as Record<string, unknown>;
    const gap = String(qObj?.gap ?? "").trim() as Gap;
    const question = String(qObj?.question ?? "").trim();
    let id = String(qObj?.id ?? "").trim();

    if (!ALL_GAPS.includes(gap)) return { ok: false, error: `gap invalide: ${gap}` };

    if (!question || question.length < 8) {
      return { ok: false, error: `question trop courte pour gap=${gap}` };
    }
    if (question.length > 260) {
      return { ok: false, error: `question trop longue pour gap=${gap} (max 260)` };
    }

    if (!id) id = `q${i + 1}_${gap}`;
    if (id.length < 2 || id.length > 40) {
      return { ok: false, error: `id invalide: "${id}" (2..40)` };
    }
    if (seenIds.has(id)) return { ok: false, error: `id dupliqué: "${id}"` };
    seenIds.add(id);

    out.push({ id, gap, question });
  }

  return { ok: true, questions: out };
}

function buildQuestionsSchema(desiredCount: number, allowedGapsInOrder: readonly Gap[]) {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      questions: {
        type: "array",
        minItems: desiredCount,
        maxItems: desiredCount,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            id: { type: "string", minLength: 2, maxLength: 40 },
            gap: { type: "string", enum: allowedGapsInOrder },
            question: { type: "string", minLength: 8, maxLength: 260 },
          },
          required: ["id", "gap", "question"],
        },
      },
    },
    required: ["questions"],
  } as const;
}

function extractJsonText(resp: unknown): string {
  const r = resp as {
    output_text?: string;
    output?: Array<{ content?: Array<{ text?: string; value?: string }> }>;
  };

  const a = String(r?.output_text || "").trim();
  if (a) return a;

  const b = String(r?.output?.[0]?.content?.[0]?.text || "").trim();
  if (b) return b;

  const c = String(r?.output?.[0]?.content?.[0]?.value || "").trim();
  if (c) return c;

  return "";
}

/**
 * ✅ System prompt Premium (orienté prof) : casser le plateau + densifier la ressource
 * Important: on ne "fait pas semblant" de connaître matière/niveau : on les DÉDUIT du prompt,
 * et on fournit des exemples adaptés au thème détecté.
 */
function buildValeriaPremiumSystemPrompt(args: {
  type: string;
  audience: string;
  priorityGaps: readonly Gap[];
}) {
  const { type, audience, priorityGaps } = args;

  return (
    "Tu es Valeria Premium.\n" +
    "Mission: poser des questions de clarification qui TRANSFORMENT la ressource finale.\n" +
    "But: passer d’un prompt correct à une ressource immédiatement exploitable en classe.\n\n" +

    "CONTRAINTE CRITIQUE:\n" +
    "- Tu dois d’abord DÉDUIRE du PROMPT BASE: matière, niveau, et type de ressource.\n" +
    "- Si la matière ou le niveau ne sont pas explicitement présents, déduis la meilleure hypothèse et\n" +
    "  reste neutre (ex: 'probablement cycle 4').\n" +
    `- Type déclaré=${type} ; Public déclaré=${audience}\n\n` +

    "RÈGLES STRICTES:\n" +
    "- Réponds UNIQUEMENT avec le JSON demandé (schema strict). Aucun texte hors JSON.\n" +
    "- 1 question = 1 information manquante/actionnable.\n" +
    "- Interdit: questions vagues ('ajouter plus de détails'), redondantes, ou déjà couvertes.\n\n" +

    "FORMAT (OBLIGATOIRE):\n" +
    "- Question courte, simple, directement répondable.\n" +
    "- Ajoute entre parenthèses 3 à 5 suggestions concrètes (exemples, données, tâches) adaptées au thème.\n" +
    "- Les suggestions doivent être COPIABLES dans un prompt et rendre l’activité faisable.\n\n" +

    "PRIORITÉ ABSOLUE = DENSITÉ PÉDAGOGIQUE EXPLOITABLE:\n" +
    "- Si une activité mentionne un CALCUL → exiger des DONNÉES chiffrées fournies (valeurs, unités, source ou jeu de données).\n" +
    "- Si une activité mentionne une DISCUSSION → exiger une TRACE écrite (production attendue) + critères.\n" +
    "- Si une activité mentionne une MISE EN GROUPE → exiger une tâche précise + rôle + temps.\n\n" +

    "CIBLAGE PAR BREAKDOWN:\n" +
    "- Analyse le scoreReport.breakdown.\n" +
    "- Cible d’abord les critères < 4/4, en évitant de revenir sur ceux déjà à 4/4.\n\n" +

    "OBLIGATIONS (au moins 1 question de chaque si pertinent):\n" +
    "- ROBUSTESSE: erreurs fréquentes + remédiations concrètes (2 mini-actions).\n" +
    "- CONFORMITÉ (si public=profs): une compétence explicite programme/socle en phrase opérationnelle.\n" +
    "- LIVRABLE/TRACE ÉLÈVE: ce que l’élève rend exactement.\n\n" +

    "- Utilise EXACTEMENT ces gaps, dans cet ordre strict:\n" +
    `  ${priorityGaps.join(" → ")}\n` +
    "- Q1 cible gap1, Q2 gap2, etc.\n"
  );
}

async function llmGenerateQuestionsJSONOnce(args: {
  prompt: string;
  scoreReport: unknown;
  desiredCount: number;
  type: string;
  audience: string;
  model: "gpt-4o-mini" | "gpt-4o";
  priorityGaps: readonly Gap[];
}) {
  const { prompt, scoreReport, desiredCount, type, audience, model, priorityGaps } = args;

  const schema = buildQuestionsSchema(desiredCount, priorityGaps);

  const resp = await openai.responses.create({
    model,
    temperature: 0,
    input: [
      {
        role: "system",
        content: buildValeriaPremiumSystemPrompt({ type, audience, priorityGaps }),
      },
      {
        role: "user",
        content:
          `PROMPT BASE:\n${prompt}\n\n` +
          `SCORE REPORT (JSON):\n${JSON.stringify(scoreReport ?? {}, null, 2)}\n\n` +
          `ATTENDU:\n` +
          `- Génère exactement ${desiredCount} question(s).\n` +
          `- Gaps imposés (ordre strict): ${priorityGaps.join(", ")}\n`,
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "valeria_premium_questions",
        description:
          "Questions de clarification premium (2 à 5) orientées exploitabilité terrain (données, tâches, traces).",
        schema,
        strict: true,
      },
    },
  });

  const rawText = extractJsonText(resp);
  if (!rawText) throw new Error("LLM: sortie vide (JSON attendu).");

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error("LLM: JSON non parseable.");
  }

  const valid = validateQuestions(parsed, desiredCount, priorityGaps);
  if (!valid.ok) throw new Error(`LLM: JSON invalide (${valid.error}).`);

  return valid.questions;
}

async function llmGenerateQuestionsJSON(args: {
  prompt: string;
  scoreReport: unknown;
  desiredCount: number;
  type: string;
  audience: string;
  model: "gpt-4o-mini" | "gpt-4o";
  priorityGaps: readonly Gap[];
}) {
  try {
    return await llmGenerateQuestionsJSONOnce(args);
  } catch {
    return await llmGenerateQuestionsJSONOnce(args);
  }
}

export async function POST(req: Request) {
  try {
    cleanupOldSessions();

    const body = (await req.json().catch(() => ({}))) as {
      prompt?: string;
      scoreReport?: unknown;
      type?: string;
      audience?: string;
      model?: string;
      clientRunId?: string;
    };

    const rawPrompt = String(body?.prompt || "").trim();
    if (!rawPrompt) return NextResponse.json({ error: "Prompt manquant." }, { status: 400 });

    // ✅ base propre (retire les anciens Q/R premium ajoutés)
    const prompt = stripPremiumBlock(rawPrompt);

    const scoreReport: unknown = body?.scoreReport ?? null;
    const type = normalizePromptType(body?.type);
    const audience = normalizeAudience(body?.audience);

    const model: "gpt-4o-mini" | "gpt-4o" = body?.model === "gpt-4o" ? "gpt-4o" : "gpt-4o-mini";

    const sr = (scoreReport ?? {}) as ScoreReportLike;
    const score = Number(sr?.score ?? NaN);
    if (Number.isFinite(score) && score >= 20) {
      return NextResponse.json({ alreadyPerfect: true });
    }

    const desiredCount = desiredQuestionCountFromScore(scoreReport);
    const priorityGaps = pickPriorityGaps(scoreReport, desiredCount);

    // ✅ clientRunId : fourni par le front pour isoler une session premium par lancement
    const clientRunId = String(body?.clientRunId || "anonymous").trim() || "anonymous";

    // ✅ purge ancienne session liée à ce clientRunId
    const idx = getClientIndex();
    const prev = idx.get(clientRunId);
    if (prev) {
      deleteSession(prev);
      idx.delete(clientRunId);
    }

    // ✅ Questions générées par LLM (JSON strict)
    const questions = await llmGenerateQuestionsJSON({
      prompt,
      scoreReport,
      desiredCount,
      type,
      audience,
      model,
      priorityGaps,
    });

    const sessionId = uid();
    idx.set(clientRunId, sessionId);

    createSession({
      id: sessionId,
      createdAt: Date.now(),
      prompt,
      scoreReport,
      model,
      type,
      audience,
      questions,
      answers: {},
    });

    const vals = getBreakdownValues(scoreReport);
    const qualityDebt =
      Math.round(ALL_GAPS.reduce((acc, g) => acc + (4 - vals[g]), 0) * 100) / 100;

    return NextResponse.json({
      sessionId,
      step: 1,
      totalSteps: questions.length,
      question: questions[0],
      debug: {
        clientRunId,
        promptHash: hash12(prompt),
        stripped: rawPrompt !== prompt,
        desiredCount,
        priorityGaps,
        qualityDebt,
        source: "llm_json_schema_strict_priority_order_smart_count_pedagogical_density",
      },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur premium start.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}