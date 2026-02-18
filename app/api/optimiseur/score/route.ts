// app/api/optimiseur/score/route.ts

import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import {
  RUBRIC_VERSION,
  DEFAULT_MODEL_SCORE,
  normalizePromptType,
  getPromptRubricScore,
  type PromptType,
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
 * Objectif : empêcher un prompt "propre" d'être sur-noté s'il manque
 * les éléments MESURABLES (barème, checklist, ref BO/Eduscol, etc.)
 *
 * + Version typée : les caps changent légèrement selon le type.
 */
function computeDeterministicCaps(prompt: string, type: PromptType) {
  const p = prompt.toLowerCase();

  // --- Détection barème / points ---
  const hasBareme =
    /bar[eè]me/.test(p) ||
    /\/\s*20/.test(p) ||
    /\b\d+\s*points?\b/.test(p);

  // --- Détection “seuil” / validation mesurable ---
  const hasSeuil =
    /seuil/.test(p) ||
    /%/.test(p) ||
    /à partir de/.test(p) ||
    /niveau de maîtrise/.test(p);

  // --- Checklist / auto-contrôle ---
  const hasChecklist =
    /auto-contr[oô]le/.test(p) ||
    /checklist/.test(p) ||
    /\[\s*\]/.test(prompt) ||
    /-\s*\[.\]\s*/.test(prompt);

  // --- BO/Eduscol + référence précise ---
  const hasBOorEduscol = /\bbo\b/.test(p) || /eduscol/.test(p);
  const hasPreciseRef =
    /bo\s*(sp[eé]cial|n[°o])/.test(p) ||
    /\bcycle\s*4\b/.test(p) ||
    /\bcycle\s*3\b/.test(p) ||
    /\b26\s+novembre\s+2015\b/.test(p);

  // --- Durée / supports / différenciation ---
  const hasDuration = /\b\d+\s*(min|minutes?|h|heure|heures)\b/.test(p);
  const hasSupports =
    /supports?\s*:/.test(p) ||
    /manuel|tableau|graphiques?|fiches?|calculatrice|ordinateur|tableur/.test(p);
  const hasDifferenciation = /diff[eé]renciation|dys|ulis|aesh|base\/attendu\/d[ée]fi/.test(p);

  // --- Structure exploitable (sections) ---
  const hasStructuredSections =
    /(introduction|objectifs|consignes|bar[eè]me|exercice|déroulé|bilan|conclusion)/.test(p);

  // Caps init
  let capRobustness = 4;
  let capCompliance = 4;
  let capStructure = 4;
  let capContext = 4;

  // === Robustesse (typée) ===
  // Évaluation : sans barème OU sans critères mesurables → cap plus bas
  if (type === "evaluation") {
    if (!hasBareme && !hasSeuil) capRobustness = 2.5;
    else if (!hasBareme || !hasSeuil) capRobustness = 3.0;
    if (!hasChecklist) capRobustness = Math.min(capRobustness, 3.0);
  } else {
    // Séance / séquence / fiche / projet : on exige surtout checklist + critères
    if (!hasChecklist) capRobustness = 3.0;
    if (!hasSeuil && type !== "fiche") capRobustness = Math.min(capRobustness, 3.5);
  }

  // === Compliance ===
  if (!hasBOorEduscol) capCompliance = 3.0;
  if (hasBOorEduscol && !hasPreciseRef) capCompliance = 3.5;

  // === Structure ===
  if (!hasStructuredSections) capStructure = 3.5;

  // === Contexte ===
  if (!(hasDuration && hasSupports && hasDifferenciation)) capContext = 3.5;

  return { capRobustness, capCompliance, capStructure, capContext };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const prompt = String(body?.prompt || "").trim();

    // ✅ Type fourni par l’UI (recommandé)
    const type = normalizePromptType(body?.meta?.type);

    const model = pickModel(body?.model) ?? DEFAULT_MODEL_SCORE;
    const temperature = 0;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt manquant." }, { status: 400 });
    }

    // ✅ Rubrique typée (score)
    const rubric = getPromptRubricScore(type);

    const system = `Tu renvoies UNIQUEMENT du JSON valide, sans texte autour.`;

    const user = `
${rubric}

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
- strengths/fixes/risks: phrases courtes
`.trim();

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
          used: { model, temperature, type },
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

    // 2) caps déterministes (fiabilité) — typés
    const caps = computeDeterministicCaps(prompt, type);
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

    // 4) score = somme EXACTE
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
      strengths: parsed.strengths.slice(0, 12).map(String),
      fixes: parsed.fixes.slice(0, 12).map(String),
      risks: parsed.risks.slice(0, 12).map(String),
    };

    return NextResponse.json({
      ...fixed,
      // ✅ Optionnel : utile pour debug UI
      used: { model, temperature, type },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur serveur scoring." },
      { status: 500 },
    );
  }
}
