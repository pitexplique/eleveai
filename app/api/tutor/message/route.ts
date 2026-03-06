export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { handleTutorMessage } from "@/lib/tutor/engine/tutorEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await handleTutorMessage({
      sessionId: body.sessionId,
      answer: body.answer,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur tutor message." },
      { status: 500 }
    );
  }
}