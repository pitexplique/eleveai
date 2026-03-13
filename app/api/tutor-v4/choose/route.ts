import { NextRequest, NextResponse } from "next/server";
import { chooseQuestionV4 } from "@/lib/tutor-v4/tutorEngineV4";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, optionId } = body;

    if (typeof sessionId !== "string" || typeof optionId !== "string") {
      return NextResponse.json(
        { error: "sessionId ou optionId invalide" },
        { status: 400 }
      );
    }

    const result = chooseQuestionV4(sessionId, optionId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Tutor V4 choose error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors du choix de la question",
      },
      { status: 500 }
    );
  }
}