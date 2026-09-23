import { NextRequest, NextResponse } from "next/server";
import { startTutorSessionV4 } from "@/lib/tutor-v4/tutorEngineV4";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { classe, matiere, notion, microId, displayMode, seenQuestionIds } = body;

    if (
      typeof classe !== "string" ||
      typeof matiere !== "string" ||
      typeof notion !== "string"
    ) {
      return NextResponse.json(
        { error: "classe, matiere ou notion invalide" },
        { status: 400 }
      );
    }

    const result = await startTutorSessionV4({
      classe,
      matiere,
      notion,
      microId: typeof microId === "string" ? microId : undefined,
      displayMode:
        displayMode === "simple" || displayMode === "complete"
          ? displayMode
          : undefined,
      /* Les questions déjà vues, gardées par le navigateur. On ne fait pas
         confiance à ce qui arrive du réseau : que des chaînes, et le moteur
         borne la longueur de son côté. */
      seenQuestionIds: Array.isArray(seenQuestionIds)
        ? seenQuestionIds.filter((v: unknown): v is string => typeof v === "string")
        : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Tutor V4 start error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Impossible de démarrer la session V4",
      },
      { status: 500 }
    );
  }
}
