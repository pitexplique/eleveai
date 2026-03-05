import { NextResponse } from "next/server";
import { handleTutorMessage } from "@/lib/tutor/engine/tutorEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await handleTutorMessage({
      sessionId: String(body?.sessionId || ""),
      answer: String(body?.answer || ""),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erreur message tutor." }, { status: 400 });
  }
}
