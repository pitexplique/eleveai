// app/api/optimiseur/premium/answer/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { reponseNonConnecte, sessionFromRequest } from "@/lib/server/requireSession";
import {
  cleanupOldSessions,
  getSession,
  updateSession,
} from "@/lib/premiumSessionStore";

function oneLine(s: unknown) {
  return String(s ?? "")
    .trim()
    .replace(/\s+/g, " ");
}

function isNonEmptyString(x: unknown) {
  return typeof x === "string" && x.trim().length > 0;
}

const MAX_ANSWER_CHARS = 800; // évite les copier-coller énormes par erreur

export async function POST(req: Request) {
  try {
    if (!sessionFromRequest(req)) return reponseNonConnecte();

    cleanupOldSessions();
    const body = await req.json().catch(() => ({}));

    const sessionId = oneLine(body?.sessionId);
    const questionId = oneLine(body?.questionId);
    const answerRaw = body?.answer;

    // 1) Validation paramètres
    if (!sessionId || !questionId || typeof answerRaw !== "string") {
      return NextResponse.json(
        { error: "Paramètres manquants (sessionId, questionId, answer)." },
        { status: 400 },
      );
    }

    const answer = oneLine(answerRaw);
    if (!isNonEmptyString(answer)) {
      return NextResponse.json({ error: "Réponse vide." }, { status: 400 });
    }
    if (answer.length > MAX_ANSWER_CHARS) {
      return NextResponse.json(
        { error: `Réponse trop longue (max ${MAX_ANSWER_CHARS} caractères).` },
        { status: 400 },
      );
    }

    // 2) Session
    const session = getSession(sessionId);
    if (!session) {
      return NextResponse.json(
        {
          error:
            "Session introuvable (expirée ou supprimée). Relance Premium depuis le score.",
        },
        { status: 404 },
      );
    }

    // 3) Vérifier que la question appartient à la session
    const questionIds = new Set(session.questions.map((q) => q.id));
    if (!questionIds.has(questionId)) {
      return NextResponse.json(
        { error: "questionId invalide pour cette session." },
        { status: 400 },
      );
    }

    // 4) Double-submit safe :
    // - si déjà répondu, on garde la réponse existante (ou on autorise l’override ?)
    // Ici : on autorise l’override si la nouvelle réponse est différente.
    const existing = String(session.answers?.[questionId] ?? "");
    const shouldUpdate = !existing || oneLine(existing) !== answer;

    const answers = shouldUpdate
      ? { ...session.answers, [questionId]: answer }
      : session.answers;

    const updated = updateSession(sessionId, { answers });
    if (!updated) {
      return NextResponse.json(
        { error: "Impossible de mettre à jour la session." },
        { status: 500 },
      );
    }

    // 5) Prochaine question non répondue (dans l’ordre)
    const nextIndex = updated.questions.findIndex(
      (q) => !isNonEmptyString(updated.answers?.[q.id]),
    );

    const answeredCount = updated.questions.reduce(
      (acc, q) => acc + (isNonEmptyString(updated.answers?.[q.id]) ? 1 : 0),
      0,
    );

    if (nextIndex === -1) {
      return NextResponse.json({
        done: true,
        totalSteps: updated.questions.length,
        answeredCount,
      });
    }

    return NextResponse.json({
      done: false,
      step: nextIndex + 1,
      totalSteps: updated.questions.length,
      answeredCount,
      question: updated.questions[nextIndex],
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur premium answer." },
      { status: 500 },
    );
  }
}