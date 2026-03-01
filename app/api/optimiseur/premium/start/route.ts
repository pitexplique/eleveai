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

function desiredQuestionCountFromScore(scoreReport: any) {
  const score = Number(scoreReport?.score ?? NaN);
  if (!Number.isFinite(score)) return 3;
  // ex: 19.2 => 1 question; 18.0 => 2; 16.1 => 3
  return clamp(Math.ceil(20 - score), 1, 3);
}

const ALLOWED_GAPS = [
  "clarity",
  "context",
  "compliance",
  "structure",
  "robustness",
] as const;
type Gap = (typeof ALLOWED_GAPS)[number];

function validateQuestions(
  raw: any,
  desiredCount: number,
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

  const seenGaps = new Set<string>();
  const out: PremiumQuestion[] = [];

  for (let i = 0; i < qs.length; i++) {
    const q = qs[i];
    if (!q || typeof q !== "object") {
      return { ok: false, error: "Question invalide (objet attendu)." };
    }

    const gap = String(q.gap || "").trim();
    const question = String(q.question || "").trim();
    let id = String(q.id || "").trim();

    if (!ALLOWED_GAPS.includes(gap as Gap)) {
      return { ok: false, error: `gap invalide: ${gap}` };
    }
    if (seenGaps.has(gap)) {
      return { ok: false, error: `gap dupliqué: ${gap}` };
    }
    seenGaps.add(gap);

    if (!question || question.length < 8) {
      return { ok: false, error: `question trop courte pour gap=${gap}` };
    }
    if (question.length > 220) {
      return {
        ok: false,
        error: `question trop longue pour gap=${gap} (max 220)`,
      };
    }

    // id optionnel: si absent, on régénère
    if (!id) id = `q${i + 1}_${gap}`;

    out.push({ id, gap, question });
  }

  return { ok: true, questions: out };
}

function buildQuestionsSchema(desiredCount: number) {
  // ✅ JSON Schema strict : EXACTEMENT desiredCount questions
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
            gap: { type: "string", enum: ALLOWED_GAPS },
            question: { type: "string", minLength: 8, maxLength: 220 },
          },
          required: ["id", "gap", "question"], // ✅ CORRECTION
        },
      },
    },
    required: ["questions"],
  } as const;
}

function extractJsonText(resp: any): string {
  const a = String(resp?.output_text || "").trim();
  if (a) return a;

  const b = String(resp?.output?.[0]?.content?.[0]?.text || "").trim();
  if (b) return b;

  // fallback ultra défensif (rare)
  const c = String(resp?.output?.[0]?.content?.[0]?.value || "").trim();
  if (c) return c;

  return "";
}

async function llmGenerateQuestionsJSONOnce(args: {
  prompt: string;
  scoreReport: any;
  desiredCount: number;
  type: string;
  audience: string;
  model: "gpt-4o-mini" | "gpt-4o";
}) {
  const { prompt, scoreReport, desiredCount, type, audience, model } = args;

  const schema = buildQuestionsSchema(desiredCount);

  const resp = await openai.responses.create({
    model,
    temperature: 0,
    input: [
      {
        role: "system",
        content:
          "Tu es Valeria Premium.\n" +
          "Objectif: produire des questions de clarification ULTRA pertinentes pour transformer le prompt en 20/20.\n" +
          "Règles:\n" +
          "- Réponds UNIQUEMENT avec le JSON demandé (schema strict).\n" +
          "- Aucune explication, aucun conseil, aucun texte hors JSON.\n" +
          "- Questions concrètes, courtes, actionnables.\n" +
          "- Utilise le contexte exact du PROMPT BASE (niveau/discipline/thème/livrable).\n" +
          "- Cible en priorité les points faibles du scoreReport.breakdown.\n" +
          "- Ne demande jamais d'infos déjà clairement présentes.\n" +
          "- 1 question = 1 info manquante.\n",
      },
      {
        role: "user",
        content:
          `PROMPT BASE:\n${prompt}\n\n` +
          `SCORE REPORT (JSON):\n${JSON.stringify(scoreReport ?? {}, null, 2)}\n\n` +
          `CONTEXTE:\n- Type=${type}\n- Public=${audience}\n\n` +
          `ATTENDU:\n- Génère exactement ${desiredCount} question(s).\n`,
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "valeria_premium_questions",
        description:
          "Questions de clarification premium structurées (1-3) pour optimiser un prompt vers 20/20.",
        schema,
        strict: true,
      },
    },
  });

  const rawText = extractJsonText(resp);
  if (!rawText) throw new Error("LLM: sortie vide (JSON attendu).");

  let parsed: any = null;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error("LLM: JSON non parseable.");
  }

  const valid = validateQuestions(parsed, desiredCount);
  if (!valid.ok) {
    throw new Error(`LLM: JSON invalide (${valid.error}).`);
  }

  return valid.questions;
}

async function llmGenerateQuestionsJSON(args: {
  prompt: string;
  scoreReport: any;
  desiredCount: number;
  type: string;
  audience: string;
  model: "gpt-4o-mini" | "gpt-4o";
}) {
  // ✅ Retry 1 fois (robustesse prod)
  try {
    return await llmGenerateQuestionsJSONOnce(args);
  } catch (e1: any) {
    // retry immédiat (même temp=0)
    return await llmGenerateQuestionsJSONOnce(args);
  }
}

export async function POST(req: Request) {
  try {
    cleanupOldSessions();
    const body = await req.json().catch(() => ({}));

    const rawPrompt = String(body?.prompt || "").trim();
    if (!rawPrompt) {
      return NextResponse.json({ error: "Prompt manquant." }, { status: 400 });
    }

    // ✅ IMPORTANT : base propre (retire les anciens Q/R premium ajoutés)
    const prompt = stripPremiumBlock(rawPrompt);

    const scoreReport = body?.scoreReport ?? null;
    const type = normalizePromptType(body?.type);
    const audience = normalizeAudience(body?.audience);

    const model: "gpt-4o-mini" | "gpt-4o" =
      body?.model === "gpt-4o" ? "gpt-4o" : "gpt-4o-mini";

    const score = Number(scoreReport?.score ?? NaN);
    if (Number.isFinite(score) && score >= 20) {
      return NextResponse.json({ alreadyPerfect: true });
    }

    const desiredCount = desiredQuestionCountFromScore(scoreReport);

    // ✅ clientRunId : fourni par le front pour isoler une “session premium” par lancement
    const clientRunId = String(body?.clientRunId || "anonymous").trim() || "anonymous";

    // ✅ purge ancienne session liée à ce clientRunId
    const idx = getClientIndex();
    const prev = idx.get(clientRunId);
    if (prev) {
      deleteSession(prev);
      idx.delete(clientRunId);
    }

    // ✅ Questions générées par LLM en JSON strict (pas de banque)
    const questions = await llmGenerateQuestionsJSON({
      prompt,
      scoreReport,
      desiredCount,
      type,
      audience,
      model,
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
        source: "llm_json_schema_strict",
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur premium start." },
      { status: 500 },
    );
  }
}