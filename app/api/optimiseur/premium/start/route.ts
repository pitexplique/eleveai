// app/api/optimiseur/premium/start/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { normalizePromptType, normalizeAudience } from "@/lib/promptRubric";
import {
  cleanupOldSessions,
  createSession,
  type PremiumQuestion,
} from "@/lib/premiumSessionStore";

function uid() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

/** ✅ Retire tout ancien bloc Premium (évite de repartir sur un prompt “sale”) */
function stripPremiumBlock(input: string) {
  const s = String(input || "").replace(/^\uFEFF/, "");
  // supprime tout ce qui suit "=== PRÉCISIONS (Valeria Premium) ==="
  return s.replace(/\n?===\s*PRÉCISIONS\s*\(Valeria Premium\)\s*===([\s\S]*)$/i, "").trim();
}

function topGapsFromReport(report: any): string[] {
  const b = report?.breakdown;
  if (!b) return ["structure", "robustness"];

  const entries: Array<[string, number]> = [
    ["clarity", Number(b.clarity ?? 0)],
    ["context", Number(b.context ?? 0)],
    ["compliance", Number(b.compliance ?? 0)],
    ["structure", Number(b.structure ?? 0)],
    ["robustness", Number(b.robustness ?? 0)],
  ];

  entries.sort((a, z) => a[1] - z[1]);
  return entries.slice(0, 3).map(([k]) => k);
}

function buildQuestions(
  report: any,
  type: string,
  audience: string,
  desiredCount: number,
): PremiumQuestion[] {
  const gaps = topGapsFromReport(report).slice(0, desiredCount);

  const map: Record<string, string> = {
    clarity:
      "Quel est exactement le niveau, le thème et la production attendue en 1 phrase ?",
    context:
      "Peux-tu préciser durée exacte, matériel disponible et modalité (individuel/binôme/groupe) ?",
    compliance:
      audience === "profs"
        ? "Souhaites-tu une référence BO précise + garde-fous explicites (neutralité, pas de données perso) ?"
        : "Dois-je ajouter une consigne de neutralité et pas de données personnelles ?",
    structure:
      "Souhaites-tu imposer une structure stricte (OBJECTIF / DÉROULÉ / CRITÈRES / CHECKLIST) ?",
    robustness:
      "Quels critères mesurables veux-tu absolument (ex : au moins 4 questions, 80% au quiz…) ?",
  };

  return gaps.map((gap, i) => ({
    id: `q${i + 1}_${gap}`,
    gap,
    question: map[gap] || "Quelle précision ajouter pour rendre le prompt testable ?",
  }));
}

export async function POST(req: Request) {
  try {
    cleanupOldSessions();
    const body = await req.json().catch(() => ({}));

    const rawPrompt = String(body?.prompt || "").trim();
    if (!rawPrompt) {
      return NextResponse.json({ error: "Prompt manquant." }, { status: 400 });
    }

    // ✅ IMPORTANT : on stocke une base propre
    const prompt = stripPremiumBlock(rawPrompt);

    const scoreReport = body?.scoreReport ?? null;
    const type = normalizePromptType(body?.type);
    const audience = normalizeAudience(body?.audience);

    const score = Number(scoreReport?.score ?? NaN);
    if (Number.isFinite(score) && score >= 20) {
      return NextResponse.json({ alreadyPerfect: true });
    }

    const desiredCount = Number.isFinite(score)
      ? Math.max(1, Math.min(3, Math.ceil(20 - score)))
      : 3;

    const questions = buildQuestions(scoreReport, type, audience, desiredCount);
    const sessionId = uid();

    createSession({
      id: sessionId,
      createdAt: Date.now(),
      prompt, // ✅ base propre
      scoreReport,
      model: "gpt-4o-mini",
      type,
      audience,
      questions,
      answers: {},
    });

    return NextResponse.json({
      sessionId,
      step: 1,
      totalSteps: questions.length,
      question: questions[0],
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur premium start." },
      { status: 500 },
    );
  }
}