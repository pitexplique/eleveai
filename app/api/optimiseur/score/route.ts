// app/api/optimiseur/score/route.ts
import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { PROMPT_RUBRIC_V1, RUBRIC_VERSION, DEFAULT_MODEL_SCORE } from "@/lib/promptRubric";

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
  } catch {}

  // fallback: enlève ```json ... ```
  const cleaned = s
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {}

  // fallback 2: extrait le premier {...}
  const m = cleaned.match(/\{[\s\S]*\}/);
  if (m) {
    try {
      return JSON.parse(m[0]) as T;
    } catch {}
  }
  return null;
}


export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const prompt = String(body?.prompt || "").trim();

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
      model: DEFAULT_MODEL_SCORE,
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });


    const content = completion.choices?.[0]?.message?.content?.trim() || "";
    const parsed = safeJsonParse<ScoreResponse>(content);

    if (!parsed || typeof parsed.score !== "number") {
      return NextResponse.json(
        { error: "Réponse scoring invalide (JSON).", raw: content },
        { status: 500 },
      );
    }

    return NextResponse.json(parsed);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur serveur scoring." },
      { status: 500 },
    );
  }
}
