import { NextResponse } from "next/server";
import { jumpToMicroV4 } from "@/lib/tutor-v4/tutorEngineV4";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, microId } = body;

    if (!sessionId || !microId) {
      return NextResponse.json(
        { error: "sessionId et microId sont requis." },
        { status: 400 }
      );
    }

    const result = await jumpToMicroV4(sessionId, microId);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur pendant le changement de micro-compétence.",
      },
      { status: 500 }
    );
  }
}