import { NextRequest, NextResponse } from "next/server";
import { answerTutorV4 } from "@/lib/tutor-v4/tutorEngineV4";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, answer } = body;

    if (!sessionId || answer === undefined) {
      return NextResponse.json(
        { error: "sessionId ou answer manquant" },
        { status: 400 }
      );
    }

    const result = await answerTutorV4(sessionId, answer);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Tutor V4 answer error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la correction de la réponse",
      },
      { status: 500 }
    );
  }
}