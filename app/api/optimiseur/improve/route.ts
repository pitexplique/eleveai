// app/api/optimiseur/improve/route.ts
// ✅ inchangé (tu avais déjà type + audience + rubric typée + garde-fous)

import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import {
  RUBRIC_VERSION,
  DEFAULT_MODEL_IMPROVE,
  normalizePromptType,
  normalizeAudience,
  getPromptRubricEditor,
  type Audience,
} from "@/lib/promptRubric";

type ImproveResponse = {
  improvedPrompt: string;
  changes: string[];
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function pickModel(m: unknown) {
  return m === "gpt-4o" || m === "gpt-4o-mini" ? m : DEFAULT_MODEL_IMPROVE;
}

function pickTemperature(t: unknown, def = 0) {
  const n = Number(t);
  if (!Number.isFinite(n)) return def;
  return clamp(n, 0, 1);
}

function normalizeText(s: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s#]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripCodeFences(s: string) {
  return s
    .replace(/^\uFEFF/, "")
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();
}

function extractFirstJsonObject(s: string) {
  const cleaned = stripCodeFences(s);
  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) return null;
  return cleaned.slice(first, last + 1).trim();
}

function safeJsonParse<T>(raw: string): T | null {
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {}

  const cleaned = stripCodeFences(raw);
  try {
    return JSON.parse(cleaned) as T;
  } catch {}

  const extracted = extractFirstJsonObject(raw);
  if (!extracted) return null;
  try {
    return JSON.parse(extracted) as T;
  } catch {
    return null;
  }
}

function isNonEmptyString(x: any) {
  return typeof x === "string" && x.trim().length > 0;
}

function looksTruncatedJson(s: string) {
  const cleaned = stripCodeFences(s);
  const t = cleaned.trim();
  return t.startsWith("{") && !t.endsWith("}");
}

function extractAnchor(prompt: string) {
  const text = normalizeText(prompt);

  const levelMatch = text.match(
    /\b(6e|5e|4e|3e|seconde|premiere|terminale|grade\s*\d+|year\s*\d+)\b/,
  );
  const level = levelMatch ? levelMatch[0] : "unspecified level";

  const words = text
    .split(" ")
    .filter((w) => w.length >= 6 && !/^\d+$/.test(w))
    .slice(0, 80);

  const keywords = Array.from(new Set(words)).slice(0, 12);
  return { level, keywords };
}

function seemsOffTopic(improved: string, anchor: { level: string; keywords: string[] }) {
  const t = normalizeText(improved);

  const hasLevel =
    anchor.level === "unspecified level" ? true : new RegExp(`\\b${anchor.level}\\b`).test(t);

  if (anchor.keywords.length === 0) return !hasLevel;

  const hits = anchor.keywords.filter((k) => t.includes(k)).length;
  const required = anchor.keywords.length <= 6 ? 1 : 2;

  return !(hasLevel && hits >= required);
}

async function repairJsonOnce(raw: string, model: string) {
  const system = `Tu renvoies UNIQUEMENT du JSON valide, sans texte autour.`;
  const user = `
Répare ce JSON pour qu'il soit valide et respecte EXACTEMENT ce schéma :

{
  "improvedPrompt": "string non vide",
  "changes": ["..."]
}

JSON À RÉPARER :
${raw}
`.trim();

  const completion = await openai.chat.completions.create({
    model,
    temperature: 0,
    max_tokens: 800,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  return completion.choices?.[0]?.message?.content?.trim() || "";
}

async function regenerateStrictOnce(args: {
  model: string;
  prompt: string;
  scoreReport: any;
  type: string;
  audience: Audience;
  anchor: { level: string; keywords: string[] };
}) {
  const { model, prompt, scoreReport, type, audience, anchor } = args;

  const system = `
You are a prompt editor. Output ONLY valid JSON (no Markdown, no extra text).
You MUST stay on the same topic, same level, same prompt type, same audience.

ANCHOR:
- level: ${anchor.level}
- keywords: ${anchor.keywords.join(", ")}

PROMPT TYPE: ${type}
AUDIENCE: ${audience}

JSON schema:
{
  "improvedPrompt": "non-empty string",
  "changes": ["..."]
}
`.trim();

  const user = `
CURRENT PROMPT:
"""${prompt}"""

SCORE REPORT (if any):
${scoreReport ? JSON.stringify(scoreReport).slice(0, 6000) : "null"}
`.trim();

  const completion = await openai.chat.completions.create({
    model,
    temperature: 0,
    max_tokens: 1500,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  return completion.choices?.[0]?.message?.content?.trim() || "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const prompt = String(body?.prompt || "").trim();
    const scoreReport = body?.scoreReport ?? null;

    const model = pickModel(body?.model);
    const temperature = pickTemperature(body?.temperature, 0);

    const type = normalizePromptType(body?.type);
    const audience = normalizeAudience(body?.audience);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt manquant." }, { status: 400 });
    }

    const anchor = extractAnchor(prompt);

    // ✅ Rubrique typée + audience
    const rubric = getPromptRubricEditor(type, audience);

    const system = `
Tu es un éditeur de prompt pédagogique (optimisation).
Tu renvoies UNIQUEMENT du JSON valide.

RubricVersion: ${RUBRIC_VERSION}

${rubric}

GARDE-FOUS (anti-dérive) :
- Ne change pas le TYPE : "${type}".
- Ne change pas le PUBLIC : "${audience}".
- Ne change pas le niveau, ni le sujet principal.
- Ne bascule pas vers un autre domaine.
- Si contradiction interne : signale dans "changes" et corrige sans changer le thème.

ANCRE (contrôle interne) :
- Niveau détecté : ${anchor.level}
- Mots-clés : ${anchor.keywords.join(", ")}

JSON OBLIGATOIRE :
{
  "improvedPrompt": "...",
  "changes": ["..."]
}
`.trim();

    const user = `
PROMPT ACTUEL :
"""${prompt}"""

SCORE REPORT (si présent) :
${scoreReport ? JSON.stringify(scoreReport, null, 2).slice(0, 12000) : "null"}
`.trim();

    const completion = await openai.chat.completions.create({
      model,
      temperature,
      max_tokens: 1500,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    let raw = completion.choices?.[0]?.message?.content?.trim() || "";

    if (looksTruncatedJson(raw)) {
      const strictRaw = await regenerateStrictOnce({
        model,
        prompt,
        scoreReport,
        type,
        audience,
        anchor,
      });
      raw = strictRaw || raw;
    }

    let parsed = safeJsonParse<ImproveResponse>(raw);

    if (!parsed?.improvedPrompt) {
      const repairedRaw = await repairJsonOnce(raw, model);
      const repairedParsed = safeJsonParse<ImproveResponse>(repairedRaw);

      if (!repairedParsed?.improvedPrompt) {
        return NextResponse.json(
          {
            error: "Réponse improve invalide (JSON).",
            raw,
            repairedRaw,
            used: { model, temperature, type, audience, rubricVersion: RUBRIC_VERSION },
          },
          { status: 500 },
        );
      }

      parsed = repairedParsed;
      raw = repairedRaw;
    }

    const improvedPrompt = String(parsed.improvedPrompt || "").trim();
    const changes = Array.isArray(parsed.changes)
      ? parsed.changes.map(String).slice(0, 12)
      : [];

    if (!isNonEmptyString(improvedPrompt) || improvedPrompt.length < 40) {
      return NextResponse.json(
        {
          error: "Improve vide / trop court.",
          raw,
          used: { model, temperature, type, audience, rubricVersion: RUBRIC_VERSION },
        },
        { status: 500 },
      );
    }

    if (seemsOffTopic(improvedPrompt, anchor)) {
      const strictRaw = await regenerateStrictOnce({
        model,
        prompt,
        scoreReport,
        type,
        audience,
        anchor,
      });

      const strictParsed = safeJsonParse<ImproveResponse>(strictRaw);
      const strictImproved = String(strictParsed?.improvedPrompt || "").trim();

      if (strictImproved && !seemsOffTopic(strictImproved, anchor)) {
        return NextResponse.json({
          improvedPrompt: strictImproved,
          changes: Array.isArray(strictParsed?.changes)
            ? strictParsed!.changes.map(String).slice(0, 12)
            : [],
          used: { model, temperature, type, audience, rubricVersion: RUBRIC_VERSION },
        });
      }

      // ✅ SOFT-FAIL : pas de 500
      return NextResponse.json({
        improvedPrompt: prompt,
        changes: ["Anti-hors-sujet: amélioration annulée (conservation du prompt précédent)."],
        used: { model, temperature, type, audience, rubricVersion: RUBRIC_VERSION },
      });
    }

    return NextResponse.json({
      improvedPrompt,
      changes,
      used: { model, temperature, type, audience, rubricVersion: RUBRIC_VERSION },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur serveur improve." },
      { status: 500 },
    );
  }
}




