// app/api/optimiseur/improve/route.ts

import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { DEFAULT_MODEL_IMPROVE, normalizePromptType } from "@/lib/promptRubric";
import { PROMPT_RUBRIC_EDITOR_V2, RUBRIC_VERSION } from "@/lib/promptRubricEditor";

type ImproveResponse = {
  improvedPrompt: string;
  changes: string[];
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function pickModel(m: unknown) {
  // ✅ autorise seulement ces modèles côté API (anti “n’importe quoi depuis le client”)
  return m === "gpt-4o" || m === "gpt-4o-mini" ? m : DEFAULT_MODEL_IMPROVE;
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

  // 1) direct
  try {
    return JSON.parse(raw) as T;
  } catch {}

  // 2) cleaned
  const cleaned = stripCodeFences(raw);
  try {
    return JSON.parse(cleaned) as T;
  } catch {}

  // 3) extraction
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

/**
 * 🔎 Extraction universelle d’ancre (FR/EN)
 * - évite les mots “métier” codés en dur
 * - sert seulement à repérer un hors-sujet grossier
 */
function extractAnchor(prompt: string) {
  const text = prompt.toLowerCase();

  // niveau/grade (FR + EN)
  const levelMatch =
    text.match(/\b(6e|5e|4e|3e|seconde|premi[eè]re|terminale|grade\s*\d+|year\s*\d+)\b/);

  const level = levelMatch ? levelMatch[0] : "unspecified level";

  // mots significatifs (lettres/nombres/#), on enlève le bruit court
  const words = text
    .replace(/[^\p{L}\p{N}\s#]/gu, " ")
    .split(/\s+/)
    .filter(w => w.length >= 6 && !/^\d+$/.test(w))
    .slice(0, 60);

  const keywords = Array.from(new Set(words)).slice(0, 10);
  return { level, keywords };
}

function seemsOffTopic(improved: string, anchor: { level: string; keywords: string[] }) {
  const t = improved.toLowerCase();

  const hasLevel =
    anchor.level === "unspecified level" ? true : t.includes(anchor.level);

  // si pas de keywords, on ne bloque pas
  const hasKeyword =
    anchor.keywords.length === 0 ? true : anchor.keywords.some(k => t.includes(k));

  return !(hasLevel && hasKeyword);
}

// ✅ (optionnel mais très efficace) : 1 retry “réparation JSON”
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

// ✅ retry “anti-hors-sujet” (plus strict)
async function regenerateStrictOnce(args: {
  model: string;
  prompt: string;
  scoreReport: any;
  type: string;
  anchor: { level: string; keywords: string[] };
}) {
  const { model, prompt, scoreReport, type, anchor } = args;

  const system = `
You are a prompt editor. Output ONLY valid JSON (no Markdown, no extra text).
You MUST stay on the same topic, same level, same prompt type.
If you are unsure, keep the wording close to the original and only add structure/testability.

ANCHOR:
- level: ${anchor.level}
- keywords: ${anchor.keywords.join(", ")}

JSON schema:
{
  "improvedPrompt": "non-empty string",
  "changes": ["..."]
}
`.trim();

  const user = `
PROMPT TYPE: ${type}

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

    // ✅ type (important pour éviter “séance ↔ évaluation”)
     const type = normalizePromptType(body?.type ?? body?.meta?.type);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt manquant." }, { status: 400 });
    }

    const anchor = extractAnchor(prompt);

    // ⚠️ Avec ton nouveau promptRubricEditor.ts :
    // PROMPT_RUBRIC_EDITOR_V2 est une FONCTION qui renvoie la rubrique typée
    const rubric = PROMPT_RUBRIC_EDITOR_V2(type);

    const system = `
Tu es un éditeur de prompt pédagogique (optimisation).
Tu renvoies UNIQUEMENT du JSON valide.

RubricVersion: ${RUBRIC_VERSION}

${rubric}

GARDE-FOUS (anti-dérive) :
- Ne change pas le TYPE : "${type}".
- Ne change pas le niveau, ni le sujet principal.
- Ne bascule pas vers un autre domaine (ex: bibliographie/MLA/APA, etc.).
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

    // 🔧 si tronqué, on tente une régénération strict (plus robuste que 500 direct)
    if (looksTruncatedJson(raw)) {
      const strictRaw = await regenerateStrictOnce({
        model,
        prompt,
        scoreReport,
        type,
        anchor,
      });
      raw = strictRaw || raw;
    }

    let parsed = safeJsonParse<ImproveResponse>(raw);

    // 🔧 réparation JSON 1 fois
    if (!parsed?.improvedPrompt) {
      const repairedRaw = await repairJsonOnce(raw, model);
      const repairedParsed = safeJsonParse<ImproveResponse>(repairedRaw);

      if (!repairedParsed?.improvedPrompt) {
        return NextResponse.json(
          {
            error: "Réponse improve invalide (JSON).",
            raw,
            repairedRaw,
            used: { model, temperature, type, rubricVersion: RUBRIC_VERSION },
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
          used: { model, temperature, type, rubricVersion: RUBRIC_VERSION },
        },
        { status: 500 },
      );
    }

    // 🔒 Vérification anti-dérive (soft): on tente 1 retry strict avant d’échouer
    if (seemsOffTopic(improvedPrompt, anchor)) {
      const strictRaw = await regenerateStrictOnce({
        model,
        prompt,
        scoreReport,
        type,
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
          used: { model, temperature, type, rubricVersion: RUBRIC_VERSION },
        });
      }

      return NextResponse.json(
        {
          error: "Improve hors-sujet détecté.",
          anchor,
          used: { model, temperature, type, rubricVersion: RUBRIC_VERSION },
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      improvedPrompt,
      changes,
      used: { model, temperature, type, rubricVersion: RUBRIC_VERSION },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur serveur improve." },
      { status: 500 },
    );
  }
}






