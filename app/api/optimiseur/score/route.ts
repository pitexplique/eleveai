// app/api/optimiseur/score/route.ts
import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import {
  PROMPT_RUBRIC_V1,
  RUBRIC_VERSION,
  DEFAULT_MODEL_SCORE,
} from "@/lib/promptRubric";

type ScoreResponse = {
  rubricVersion: number;
  score: number; // /20
  breakdown: {
    clarity: number; // /4
    context: number; // /4
    compliance: number; // /4
    structure: number; // /4
    robustness: number; // /4
  };
  strengths: string[];
  fixes: string[];
  risks: string[];
};

function safeJsonParse<T>(s: string): T | null {
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

function isFiniteNumber(n: any) {
  return typeof n === "number" && Number.isFinite(n);
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function validateScoreResponse(x: any): x is ScoreResponse {
  if (!x || typeof x !== "object") return false;
  if (!isFiniteNumber(x.score)) return false;
  if (!x.breakdown || typeof x.breakdown !== "object") return false;

  const b = x.breakdown;
  const okBreakdown =
    isFiniteNumber(b.clarity) &&
    isFiniteNumber(b.context) &&
    isFiniteNumber(b.compliance) &&
    isFiniteNumber(b.structure) &&
    isFiniteNumber(b.robustness);

  if (!okBreakdown) return false;

  if (!Array.isArray(x.strengths) || !Array.isArray(x.fixes) || !Array.isArray(x.risks)) {
    return false;
  }

  return true;
}

// ✅ Sécurise le choix du modèle (anti “n’importe quoi depuis le client”)
function pickModel(m: unknown) {
  return m === "gpt-4o" || m === "gpt-4o-mini" ? m : null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const prompt = String(body?.prompt || "").trim();

    // ✅ NEW: modèle pilotable depuis le client (allowlist)
    const model = pickModel(body?.model) ?? DEFAULT_MODEL_SCORE;

    // ✅ V1 stable: scoring toujours à 0
    const temperature = 0;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt manquant." }, { status: 400 });
    }

    const system = `Tu renvoies UNIQUEMENT du JSON valide, sans texte autour.`;

    const user = `
${PROMPT_RUBRIC_V1}

Évalue ce prompt (délimité) :

"""${prompt}"""

FORMAT JSON OBLIGATOIRE :
{
  "rubricVersion": ${RUBRIC_VERSION},
  "score": 0,
  "breakdown": {
    "clarity": 0,
    "context": 0,
    "compliance": 0,
    "structure": 0,
    "robustness": 0
  },
  "strengths": ["..."],
  "fixes": ["..."],
  "risks": ["..."]
}

Contraintes :
- score sur 20 au pas de 0.5
- breakdown: chaque champ sur 4 au pas de 0.5
- strengths/fixes/risks: phrases courtes.
`;

    const completion = await openai.chat.completions.create({
      model,
      temperature,
      response_format: { type: "json_object" }, // ✅ force JSON
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const content = completion.choices?.[0]?.message?.content?.trim() || "";
    const parsed = safeJsonParse<ScoreResponse>(content);

    if (!validateScoreResponse(parsed)) {
      return NextResponse.json(
        {
          error: "Réponse scoring invalide (JSON).",
          raw: content,
          used: { model, temperature },
        },
        { status: 500 },
      );
    }

    // ✅ garde-fous (clamp + tailles max)
    const fixed: ScoreResponse = {
      ...parsed,
      rubricVersion: RUBRIC_VERSION,
      score: clamp(parsed.score, 0, 20),
      breakdown: {
        clarity: clamp(parsed.breakdown.clarity, 0, 4),
        context: clamp(parsed.breakdown.context, 0, 4),
        compliance: clamp(parsed.breakdown.compliance, 0, 4),
        structure: clamp(parsed.breakdown.structure, 0, 4),
        robustness: clamp(parsed.breakdown.robustness, 0, 4),
      },
      strengths: parsed.strengths.slice(0, 12),
      fixes: parsed.fixes.slice(0, 12),
      risks: parsed.risks.slice(0, 12),
    };

    return NextResponse.json(fixed);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur serveur scoring." },
      { status: 500 },
    );
  }
}

