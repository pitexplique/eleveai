// app/api/optimiseur/improve/route.ts

import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { DEFAULT_MODEL_IMPROVE } from "@/lib/promptRubric";
import { PROMPT_RUBRIC_EDITOR_V2 } from "@/lib/promptRubricEditor";

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

// ✅ (optionnel mais très efficace) : si l’IA renvoie un JSON cassé,
// on lui demande de “réparer” en 1 retry.
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
`;

  const completion = await openai.chat.completions.create({
    model,
    temperature: 0,
    max_tokens: 600,
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

    const model = pickModel(body?.model) ?? DEFAULT_MODEL_IMPROVE;
    const temperature = pickTemperature(body?.temperature, 0);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt manquant." }, { status: 400 });
    }

    const system = `Tu renvoies UNIQUEMENT du JSON valide, sans texte autour.`;

    // ✅ IMPORTANT : on utilise la rubrique EDITOR (sans contradiction)
    const user = `
Tu es un “éditeur de prompt” (optimisation). Tu dois AMÉLIORER le prompt fourni
pour maximiser la qualité selon cette grille :

${PROMPT_RUBRIC_EDITOR_V2}

Règles :
- Ne change pas le fond pédagogique demandé : clarifie, structure, sécurise.
- Renforce la conformité (neutralité, pas de données perso, pas de discrimination).
- Améliore la testabilité (critères, étapes, format).
- Conserve le style FR enseignant, simple, copiable.
- Ne produis pas la ressource finale : uniquement le prompt amélioré.
- IMPORTANT : Ajoute un bloc "AUTO-CONTRÔLE (CHECKLIST)" avec 6–10 puces
  vérifiables (durée, structure, BO, socle, DYS, barème, etc.) pour viser 20/20.

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
      temperature,
      max_tokens: 1200,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    let content = completion.choices?.[0]?.message?.content?.trim() || "";
    let parsed = safeJsonParse<ImproveResponse>(content);

    // ✅ Retry “repair JSON” si besoin
    if (!parsed?.improvedPrompt) {
      const repairedRaw = await repairJsonOnce(content, model);
      const repairedParsed = safeJsonParse<ImproveResponse>(repairedRaw);

      if (!repairedParsed?.improvedPrompt) {
        return NextResponse.json(
          {
            error: "Réponse improve invalide (JSON).",
            raw: content,
            repairedRaw,
            used: { model, temperature },
          },
          { status: 500 },
        );
      }

      parsed = repairedParsed;
      content = repairedRaw;
    }

    // ✅ garde-fous basiques
    const improvedPrompt = String(parsed.improvedPrompt || "").trim();
    const changes = Array.isArray(parsed.changes) ? parsed.changes.slice(0, 12) : [];

    if (!improvedPrompt || improvedPrompt.length < 20) {
      return NextResponse.json(
        {
          error: "Improve vide / trop court.",
          raw: content,
          used: { model, temperature },
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ improvedPrompt, changes });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur serveur improve." },
      { status: 500 },
    );
  }
}



