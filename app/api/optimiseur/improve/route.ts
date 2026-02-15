// app/api/optimiseur/improve/route.ts
import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { PROMPT_RUBRIC_V1, DEFAULT_MODEL_IMPROVE } from "@/lib/promptRubric";

type ImproveResponse = {
  improvedPrompt: string;
  changes: string[];
};

function safeJsonParse<T>(s: string): T | null {
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

// ✅ Sécurise le choix du modèle (anti “n’importe quoi depuis le client”)
function pickModel(m: unknown) {
  return m === "gpt-4o" || m === "gpt-4o-mini" ? m : null;
}

// ✅ Température raisonnable pour improve (0 → 1)
function pickTemperature(t: unknown, def = 0) {
  const n = Number(t);
  if (!Number.isFinite(n)) return def;
  return clamp(n, 0, 1);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const prompt = String(body?.prompt || "").trim();
    const scoreReport = body?.scoreReport ?? null;

    // ✅ NEW: paramètres pilotés par la page (avec allowlist + clamp)
    const model = pickModel(body?.model) ?? DEFAULT_MODEL_IMPROVE;
    const temperature = pickTemperature(body?.temperature, 0);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt manquant." }, { status: 400 });
    }

    const system = `Tu renvoies UNIQUEMENT du JSON valide, sans texte autour.`;

    const user = `
Tu es un “éditeur de prompt” (optimisation). Tu dois AMÉLIORER le prompt fourni pour maximiser la qualité selon cette grille :

${PROMPT_RUBRIC_V1}

Règles :
- Ne change pas le fond pédagogique demandé : clarifie, structure, sécurise.
- Renforce la conformité (neutralité, pas de données perso, pas de discrimination).
- Améliore la testabilité (critères, étapes, format).
- Conserve le style FR enseignant, simple, copiable.
- Ne produis pas la ressource finale : uniquement le prompt amélioré.
- Pas d’auto-commentaires hors JSON.

PROMPT ACTUEL :
"""${prompt}"""

RAPPORT DE SCORE (si présent, à exploiter) :
${scoreReport ? JSON.stringify(scoreReport, null, 2) : "null"}

FORMAT JSON OBLIGATOIRE :
{
  "improvedPrompt": "....",
  "changes": ["...","..."]
}
`;

    const completion = await openai.chat.completions.create({
      model,
      temperature, // ✅ pilotable (0, 0.1, 0.2…)
      response_format: { type: "json_object" }, // ✅ réduit fortement les réponses non-JSON
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const content = completion.choices?.[0]?.message?.content?.trim() || "";
    const parsed = safeJsonParse<ImproveResponse>(content);

    if (!parsed?.improvedPrompt) {
      return NextResponse.json(
        {
          error: "Réponse improve invalide (JSON).",
          raw: content,
          used: { model, temperature },
        },
        { status: 500 },
      );
    }

    return NextResponse.json(parsed);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur serveur improve." },
      { status: 500 },
    );
  }
}


