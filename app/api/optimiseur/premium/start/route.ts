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
  return crypto
    .createHash("sha256")
    .update(s || "", "utf8")
    .digest("hex")
    .slice(0, 12);
}

/** ✅ Retire tout ancien bloc Premium (évite de repartir sur un prompt “sale”) */
function stripPremiumBlock(input: string) {
  const s = String(input || "").replace(/^\uFEFF/, "");
  return s
    .replace(/\n?===\s*PRÉCISIONS\s*\(Valeria Premium\)\s*===([\s\S]*)$/i, "")
    .trim();
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

/**
 * ✅ UX Prof : 2–3 questions point barre, seuil=18
 * - score >= 18 : 2 questions
 * - score < 18  : 3 questions
 */
function desiredQuestionCountFromScore(scoreReport: unknown) {
  const score0 = Number((scoreReport as any)?.score ?? NaN);
  if (!Number.isFinite(score0)) return 3;
  const score = clamp(score0, 0, 20);
  return score >= 18 ? 2 : 3;
}

const ALL_GAPS = ["clarity", "context", "compliance", "structure", "robustness"] as const;
type Gap = (typeof ALL_GAPS)[number];

/**
 * ✅ Priorisation intelligente des gaps (ordre = plus faible → plus fort)
 * Tie-break stable via GAP_TIE_ORDER.
 */
const GAP_TIE_ORDER: Gap[] = ["clarity", "context", "structure", "robustness", "compliance"];

function pickPriorityGaps(scoreReport: unknown, desiredCount: number): Gap[] {
  const b = (scoreReport as any)?.breakdown ?? {};

  const items: Array<{ gap: Gap; v: number; tie: number }> = GAP_TIE_ORDER.map((gap, i) => {
    const raw = Number(b?.[gap]);
    const v = Number.isFinite(raw) ? clamp(raw, 0, 4) : 4; // défaut = 4 si absent
    return { gap, v, tie: i };
  });

  items.sort((a, c) => (a.v !== c.v ? a.v - c.v : a.tie - c.tie));

  const out = items.slice(0, clamp(desiredCount, 1, 3)).map((x) => x.gap);

  // sécurité : si jamais desiredCount > longueur (ne devrait pas arriver)
  while (out.length < desiredCount) out.push(GAP_TIE_ORDER[out.length] ?? "structure");
  return out.slice(0, desiredCount);
}

function validateQuestions(
  raw: unknown,
  desiredCount: number,
  allowedGapsInOrder: readonly Gap[],
): { ok: true; questions: PremiumQuestion[] } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "JSON invalide (objet attendu)." };
  }

  const qs = (raw as any).questions;
  if (!Array.isArray(qs)) {
    return { ok: false, error: "JSON invalide (questions[] manquant)." };
  }

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

    if (!ALL_GAPS.includes(gap)) {
      return { ok: false, error: `gap invalide: ${gap}` };
    }

    if (!question || question.length < 8) {
      return { ok: false, error: `question trop courte pour gap=${gap}` };
    }
    if (question.length > 220) {
      return { ok: false, error: `question trop longue pour gap=${gap} (max 220)` };
    }

    if (!id) id = `q${i + 1}_${gap}`;
    if (id.length < 2 || id.length > 40) {
      return { ok: false, error: `id invalide: "${id}" (2..40)` };
    }
    if (seenIds.has(id)) {
      return { ok: false, error: `id dupliqué: "${id}"` };
    }
    seenIds.add(id);

    out.push({ id, gap, question });
  }

  return { ok: true, questions: out };
}

function buildQuestionsSchema(desiredCount: number, allowedGapsInOrder: readonly Gap[]) {
  // ✅ JSON Schema strict : EXACTEMENT desiredCount questions
  // ✅ + gap enum limité aux gaps prioritaires (et validateQuestions force l’ordre exact)
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
            question: { type: "string", minLength: 8, maxLength: 220 },
          },
          required: ["id", "gap", "question"],
        },
      },
    },
    required: ["questions"],
  } as const;
}

function extractJsonText(resp: unknown): string {
  const r = resp as any;

  const a = String(r?.output_text || "").trim();
  if (a) return a;

  const b = String(r?.output?.[0]?.content?.[0]?.text || "").trim();
  if (b) return b;

  // fallback ultra défensif (rare)
  const c = String(r?.output?.[0]?.content?.[0]?.value || "").trim();
  if (c) return c;

  return "";
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
        content:
          "Tu es Valeria Premium, experte en optimisation de prompts pédagogiques.\n" +
          "Objectif: faire passer un prompt déjà bon (≈18/20) à un niveau expert (20/20).\n\n" +
          "RÈGLES STRICTES:\n" +
          "- Réponds UNIQUEMENT avec le JSON demandé (schema strict).\n" +
          "- Aucun texte hors JSON.\n" +
          "- Chaque question doit viser UNE amélioration précise, mesurable et concrète.\n" +
          "- Interdit: questions vagues, générales ou déjà couvertes dans le prompt.\n" +
          "- Interdit: formulations du type 'Souhaitez-vous ajouter plus de détails ?'\n" +
          "- Chaque question doit améliorer au moins un des axes suivants :\n" +
          "  précision des compétences visées, barème chiffré, livrable élève attendu,\n" +
          "  évaluation formative/sommative, alignement explicite au programme.\n" +
          "- Formule les questions comme une collègue experte exigeante mais bienveillante.\n" +
          "- 1 question = 1 amélioration concrète vers 20/20.\n" +
          "- Utilise EXACTEMENT ces gaps, dans cet ordre strict:\n" +
          `  ${priorityGaps.join(" → ")}\n` +
          "- La question 1 cible le 1er gap, la question 2 le 2e, etc.\n",
              },
      {
        role: "user",
        content:
          `PROMPT BASE:\n${prompt}\n\n` +
          `SCORE REPORT (JSON):\n${JSON.stringify(scoreReport ?? {}, null, 2)}\n\n` +
          `CONTEXTE:\n- Type=${type}\n- Public=${audience}\n\n` +
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
          "Questions de clarification premium structurées (2-3) pour optimiser un prompt vers 20/20.",
        schema,
        strict: true,
      },
    },
  });

  const rawText = extractJsonText(resp);
  if (!rawText) throw new Error("LLM: sortie vide (JSON attendu).");

  let parsed: unknown = null;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error("LLM: JSON non parseable.");
  }

  const valid = validateQuestions(parsed, desiredCount, priorityGaps);
  if (!valid.ok) {
    throw new Error(`LLM: JSON invalide (${valid.error}).`);
  }

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
  // ✅ Retry 1 fois (robustesse prod)
  try {
    return await llmGenerateQuestionsJSONOnce(args);
  } catch {
    return await llmGenerateQuestionsJSONOnce(args);
  }
}

export async function POST(req: Request) {
  try {
    cleanupOldSessions();
    const body = (await req.json().catch(() => ({}))) as any;

    const rawPrompt = String(body?.prompt || "").trim();
    if (!rawPrompt) {
      return NextResponse.json({ error: "Prompt manquant." }, { status: 400 });
    }

    // ✅ IMPORTANT : base propre (retire les anciens Q/R premium ajoutés)
    const prompt = stripPremiumBlock(rawPrompt);

    const scoreReport: unknown = body?.scoreReport ?? null;
    const type = normalizePromptType(body?.type);
    const audience = normalizeAudience(body?.audience);

    const model: "gpt-4o-mini" | "gpt-4o" =
      body?.model === "gpt-4o" ? "gpt-4o" : "gpt-4o-mini";

    const score = Number((scoreReport as any)?.score ?? NaN);
    if (Number.isFinite(score) && score >= 20) {
      return NextResponse.json({ alreadyPerfect: true });
    }

    const desiredCount = desiredQuestionCountFromScore(scoreReport);
    const priorityGaps = pickPriorityGaps(scoreReport, desiredCount);

    // ✅ clientRunId : fourni par le front pour isoler une “session premium” par lancement
    const clientRunId = String(body?.clientRunId || "anonymous").trim() || "anonymous";

    // ✅ purge ancienne session liée à ce clientRunId
    const idx = getClientIndex();
    const prev = idx.get(clientRunId);
    if (prev) {
      deleteSession(prev);
      idx.delete(clientRunId);
    }

    // ✅ Questions générées par LLM en JSON strict (ordre intelligent imposé)
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
        source: "llm_json_schema_strict_priority_order",
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur premium start." },
      { status: 500 },
    );
  }
}