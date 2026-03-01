// app/api/optimiseur/premium/answer/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cleanupOldSessions, getSession, updateSession } from "@/lib/premiumSessionStore";

function isNonEmptyString(x: any) {
  return typeof x === "string" && x.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    cleanupOldSessions();
    const body = await req.json().catch(() => ({}));

    const sessionId = String(body?.sessionId || "").trim();
    const questionId = String(body?.questionId || "").trim();
    const answerRaw = body?.answer;

    if (!sessionId || !questionId || typeof answerRaw !== "string") {
      return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
    }

    const answer = String(answerRaw).trim();
    if (!isNonEmptyString(answer)) {
      return NextResponse.json({ error: "Réponse vide." }, { status: 400 });
    }

    const session = getSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Session introuvable." }, { status: 404 });
    }

    const answers = { ...session.answers, [questionId]: answer };
    const updated = updateSession(sessionId, { answers });

    const nextIndex = updated!.questions.findIndex((q) => !updated!.answers[q.id]);

    if (nextIndex === -1) {
      return NextResponse.json({
        done: true,
        totalSteps: updated!.questions.length,
      });
    }

    return NextResponse.json({
      done: false,
      step: nextIndex + 1,
      totalSteps: updated!.questions.length,
      question: updated!.questions[nextIndex],
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur premium answer." },
      { status: 500 },
    );
  }
}