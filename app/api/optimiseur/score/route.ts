// app/api/optimiseur/score/route.ts
import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import {
  PROMPT_RUBRIC_V2,
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

function roundToHalf(n: number) {
  return Math.round(n * 2) / 2;
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

/**
 * ✅ Heuristiques DÉTERMINISTES (fiabilité)
 * Objectif : empêcher un prompt "propre" d'être sur-noté s'il manque les
 * éléments MESURABLES exigés par ta rubrique (barème, seuil, BO précis, etc.)
 */
function computeDeterministicCaps(prompt: string) {
  const p = prompt.toLowerCase();

  // --- Détection "barème /20" ou points ---
  const hasBareme =
    /bar[eè]me/.test(p) ||
    /\/\s*20/.test(p) ||
    /\b\d+\s*points?\b/.test(p);

  // --- Détection "seuil" ou critères de validation mesurables ---
  const hasSeuil =
    /seuil/.test(p) ||
    /%/.test(p) ||
    /à partir de/.test(p) ||
    /niveau de maîtrise/.test(p);

  // --- Détection "auto-contrôle/checklist" ---
  const hasChecklist =
    /auto-contr[oô]le/.test(p) ||
    /checklist/.test(p) ||
    /\[\s*\]/.test(prompt) || // case à cocher
    /-\s*\[.\]\s*/.test(prompt);

  // --- Détection référence institutionnelle précise ---
  // (on veut plus qu'un "BO/Eduscol" vague)
  const hasBOorEduscol = /bo\b/.test(p) || /eduscol/.test(p);
  const hasPreciseRef =
    /bo\s*(sp[eé]cial|n[°o])/.test(p) ||
    /\b26\s+novembre\s+2015\b/.test(p) ||
    /\bcycle\s*4\b/.test(p) ||
    /\bcycle\s*3\b/.test(p);

  // --- Détection structure exploitable "Word-ready" ---
  const hasStructuredSections =
    /introduction/.test(p) &&
    /conclusion/.test(p) &&
    (/\bminutes?\b/.test(p) || /\b\d+\s*min\b/.test(p));

  // Caps par critère (valeurs max autorisées)
  let capRobustness = 4;
  let capCompliance = 4;
  let capStructure = 4;
  let capContext = 4;

  // Robustesse: sans barème OU sans seuil → pas de 4/4
  if (!hasBareme && !hasSeuil) capRobustness = 2.5;
  else if (!hasBareme || !hasSeuil) capRobustness = 3.0;

  // Checklist: sans checklist, robustesse max 3
  if (!hasChecklist) capRobustness = Math.min(capRobustness, 3.0);

  // Compliance: BO/Eduscol vague → pas de 4/4
  if (!hasBOorEduscol) capCompliance = 3.0;
  if (hasBOorEduscol && !hasPreciseRef) capCompliance = 3.5;

  // Structure: si pas de sections utilisables, pas de 4
  if (!hasStructuredSections) capStructure = 3.5;

  // Contexte: si pas de durée + supports + différenciation explicite → cap
  const hasDuration = /\b\d+\s*(min|minutes?|h|heure|heures)\b/.test(p);
  const hasSupports = /supports?\s*:/.test(p) || /tableau|graphiques?|fiches?/.test(p);
  const hasDifferenciation = /diff[eé]renciation|dys|ulis|aesh/.test(p);

  if (!(hasDuration && hasSupports && hasDifferenciation)) capContext = 3.5;

  return { capRobustness, capCompliance, capStructure, capContext };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const prompt = String(body?.prompt || "").trim();

    const model = pickModel(body?.model) ?? DEFAULT_MODEL_SCORE;
    const temperature = 0;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt manquant." }, { status: 400 });
    }

    const system = `Tu renvoies UNIQUEMENT du JSON valide, sans texte autour.`;

    const user = `
${PROMPT_RUBRIC_V2}

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
      response_format: { type: "json_object" },
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

    // 1) clamp + roundToHalf (pas de 0.5)
    const b0 = {
      clarity: roundToHalf(clamp(parsed.breakdown.clarity, 0, 4)),
      context: roundToHalf(clamp(parsed.breakdown.context, 0, 4)),
      compliance: roundToHalf(clamp(parsed.breakdown.compliance, 0, 4)),
      structure: roundToHalf(clamp(parsed.breakdown.structure, 0, 4)),
      robustness: roundToHalf(clamp(parsed.breakdown.robustness, 0, 4)),
    };

    // 2) caps déterministes (fiabilité)
    const caps = computeDeterministicCaps(prompt);
    const b1 = {
      clarity: b0.clarity,
      context: Math.min(b0.context, caps.capContext),
      compliance: Math.min(b0.compliance, caps.capCompliance),
      structure: Math.min(b0.structure, caps.capStructure),
      robustness: Math.min(b0.robustness, caps.capRobustness),
    };

    // 3) re-round après caps (toujours au pas 0.5)
    const breakdown = {
      clarity: roundToHalf(b1.clarity),
      context: roundToHalf(b1.context),
      compliance: roundToHalf(b1.compliance),
      structure: roundToHalf(b1.structure),
      robustness: roundToHalf(b1.robustness),
    };

    // 4) score = somme EXACTE (fiabilité)
    const score = roundToHalf(
      breakdown.clarity +
        breakdown.context +
        breakdown.compliance +
        breakdown.structure +
        breakdown.robustness,
    );

    const fixed: ScoreResponse = {
      rubricVersion: RUBRIC_VERSION,
      score: clamp(score, 0, 20),
      breakdown,
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

