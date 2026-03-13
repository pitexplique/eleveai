import { NextRequest, NextResponse } from "next/server";
import { recordConfidenceV4 } from "@/lib/tutor-v4/tutorEngineV4";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, level } = body;

    if (
      typeof sessionId !== "string" ||
      (level !== 1 && level !== 2 && level !== 3)
    ) {
      return NextResponse.json(
        { error: "sessionId ou level invalide" },
        { status: 400 }
      );
    }

    const result = recordConfidenceV4(sessionId, level);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Tutor V4 confidence error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de l'enregistrement de la confiance",
      },
      { status: 500 }
    );
  }
}
