// app/api/optimiseur/improve/route.ts

import { NextResponse } from "next/server";
import { reponseNonConnecte, sessionFromRequest } from "@/lib/server/requireSession";
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

/* ======================================================
   🔐 Activation gouvernance inspirée ISO 42001
   ====================================================== */

const governance_iso: boolean = true ; // ← ON / OFF ici

/* ======================================================
   UTILITAIRES
   ====================================================== */

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

/* ======================================================
   ANCRAGE THÉMATIQUE
   ====================================================== */

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

function seemsOffTopic(
  improved: string,
  anchor: { level: string; keywords: string[] },
) {
  const t = normalizeText(improved);

  const hasLevel =
    anchor.level === "unspecified level"
      ? true
      : new RegExp(`\\b${anchor.level}\\b`).test(t);

  if (anchor.keywords.length === 0) return !hasLevel;

  const hits = anchor.keywords.filter((k) => t.includes(k)).length;
  const required = anchor.keywords.length <= 6 ? 1 : 2;

  return !(hasLevel && hits >= required);
}

/* ======================================================
   REGENERATION STRICTE
   ====================================================== */

async function regenerateStrictOnce(args: {
  model: string;
  prompt: string;
  scoreReport: any;
  type: string;
  audience: Audience;
  anchor: { level: string; keywords: string[] };
}) {
  const { model, prompt, scoreReport, type, audience, anchor } = args;

  const completion = await openai.chat.completions.create({
    model,
    temperature: 0,
    max_tokens: 1500,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
You are a prompt editor.

Stay strictly on topic.

LEVEL: ${anchor.level}
KEYWORDS: ${anchor.keywords.join(", ")}

TYPE: ${type}
AUDIENCE: ${audience}

Output JSON only:

{
 "improvedPrompt": "string",
 "changes": ["..."]
}
`.trim(),
      },
      {
        role: "user",
        content: `PROMPT:\n"""${prompt}"""`,
      },
    ],
  });

  return completion.choices?.[0]?.message?.content?.trim() || "";
}

/* ======================================================
   ROUTE PRINCIPALE
   ====================================================== */

export async function POST(req: Request) {
  try {
    if (!sessionFromRequest(req)) return reponseNonConnecte();

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

    const rubric = getPromptRubricEditor(type, audience);

    /* ======================================================
       🔐 Bloc gouvernance ISO (invisible côté utilisateur)
       ====================================================== */

    const governanceBlock = governance_iso
      ? `
GOUVERNANCE IA (inspirée ISO/IEC 42001)

- Réduire les risques d'hallucination, biais et ambiguïté.
- Favoriser la clarté et la robustesse pédagogique.
- Si un risque de données personnelles apparaît : anonymiser.
- Si la tâche implique une évaluation ou sanction : privilégier grille + validation humaine.
- Si public élève : favoriser raisonnement, indices et méthode plutôt que réponse brute.
- Maintenir la traçabilité logique du prompt.
`
      : "";

    const system = `
Tu es un éditeur de prompt pédagogique.

Réponds uniquement en JSON.

RubricVersion: ${RUBRIC_VERSION}

${rubric}

${governanceBlock}

GARDE-FOUS :
- Ne change pas le TYPE: ${type}
- Ne change pas le PUBLIC: ${audience}
- Ne change pas le sujet
- Reste dans le même domaine

ANCRE :
Niveau: ${anchor.level}
Mots-clés: ${anchor.keywords.join(", ")}

JSON attendu:

{
 "improvedPrompt": "...",
 "changes": ["..."]
}
`.trim();

    const user = `
PROMPT ACTUEL:
"""${prompt}"""

SCORE REPORT:
${scoreReport ? JSON.stringify(scoreReport).slice(0, 8000) : "null"}
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

    let parsed = safeJsonParse<ImproveResponse>(raw);

    if (!parsed?.improvedPrompt) {
      const strictRaw = await regenerateStrictOnce({
        model,
        prompt,
        scoreReport,
        type,
        audience,
        anchor,
      });

      parsed = safeJsonParse(strictRaw);

      if (!parsed?.improvedPrompt) {
        return NextResponse.json(
          { error: "Réponse JSON invalide.", raw },
          { status: 500 },
        );
      }
    }

    const improvedPrompt = String(parsed.improvedPrompt || "").trim();

    const changes = Array.isArray(parsed.changes)
      ? parsed.changes.map(String).slice(0, 12)
      : [];

    if (!isNonEmptyString(improvedPrompt) || improvedPrompt.length < 40) {
      return NextResponse.json(
        { error: "Improve trop court.", raw },
        { status: 500 },
      );
    }

    if (seemsOffTopic(improvedPrompt, anchor)) {
      return NextResponse.json({
        improvedPrompt: prompt,
        changes: [
          "Anti-hors-sujet: amélioration annulée (conservation du prompt précédent).",
        ],
      });
    }

    return NextResponse.json({
      improvedPrompt,
      changes,
      used: {
        model,
        temperature,
        type,
        audience,
        rubricVersion: RUBRIC_VERSION,
        governance_iso,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur serveur improve." },
      { status: 500 },
    );
  }
}




