// app/api/optimiseur/improve/route.ts

import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { DEFAULT_MODEL_IMPROVE } from "@/lib/promptRubric";
import { PROMPT_RUBRIC_EDITOR_V2 } from "@/lib/promptRubricEditor";

type ImproveResponse = {
  improvedPrompt: string;
  changes: string[];
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function pickModel(m: unknown) {
  return m === "gpt-4o" || m === "gpt-4o-mini"
    ? m
    : DEFAULT_MODEL_IMPROVE;
}

function pickTemperature(t: unknown, def = 0) {
  const n = Number(t);
  if (!Number.isFinite(n)) return def;
  return clamp(n, 0, 1);
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

/**
 * 🔎 Extraction universelle d’ancre
 * - fonctionne FR / EN
 * - pas de mots codés en dur
 */
function extractAnchor(prompt: string) {
  const text = prompt.toLowerCase();

  // Détection niveau générique
  const levelMatch =
    text.match(/\b(6e|5e|4e|3e|seconde|première|terminale|grade\s*\d+)\b/);

  const level = levelMatch ? levelMatch[0] : "unspecified level";

  // Extraction mots significatifs
  const words = text
    .replace(/[^\p{L}\p{N}\s#]/gu, " ")
    .split(/\s+/)
    .filter(w => w.length > 5)
    .slice(0, 30);

  const keywords = Array.from(new Set(words)).slice(0, 8);

  return { level, keywords };
}

/**
 * Vérifie que l’amélioration reste dans le même univers lexical
 */
function seemsOffTopic(improved: string, anchor: { level: string; keywords: string[] }) {
  const t = improved.toLowerCase();

  const hasLevel =
    anchor.level === "unspecified level"
      ? true
      : t.includes(anchor.level);

  const hasKeyword =
    anchor.keywords.length === 0
      ? true
      : anchor.keywords.some(k => t.includes(k));

  return !(hasLevel && hasKeyword);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const prompt = String(body?.prompt || "").trim();
    const scoreReport = body?.scoreReport ?? null;

    const model = pickModel(body?.model);
    const temperature = pickTemperature(body?.temperature, 0);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt manquant." }, { status: 400 });
    }

    const anchor = extractAnchor(prompt);

    const system = `
Tu es un éditeur de prompt pédagogique (optimisation).
Tu renvoies UNIQUEMENT du JSON valide.

${PROMPT_RUBRIC_EDITOR_V2}

RÈGLE ANTI-DÉRIVE ABSOLUE :
- Ne change pas le niveau.
- Ne change pas le sujet principal.
- Reste dans le même univers lexical que le prompt initial.

ANCRE DÉTECTÉE :
Niveau : ${anchor.level}
Mots-clés principaux : ${anchor.keywords.join(", ")}

JSON OBLIGATOIRE :
{
  "improvedPrompt": "...",
  "changes": ["..."]
}
`.trim();

    const user = `
PROMPT ACTUEL :
"""${prompt}"""

SCORE REPORT :
${scoreReport ? JSON.stringify(scoreReport, null, 2).slice(0, 10000) : "null"}
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

    const raw = completion.choices?.[0]?.message?.content?.trim() || "";
    const parsed = safeJsonParse<ImproveResponse>(raw);

    if (!parsed?.improvedPrompt) {
      return NextResponse.json(
        { error: "Réponse improve invalide (JSON).", raw },
        { status: 500 },
      );
    }

    const improvedPrompt = parsed.improvedPrompt.trim();

    // 🔒 Vérification anti-dérive
    if (seemsOffTopic(improvedPrompt, anchor)) {
      return NextResponse.json(
        {
          error: "Improve hors-sujet détecté.",
          anchor,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      improvedPrompt,
      changes: parsed.changes?.slice(0, 12) ?? [],
    });

  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur serveur improve." },
      { status: 500 },
    );
  }
}





