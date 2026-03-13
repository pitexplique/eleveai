import { NextRequest, NextResponse } from "next/server";
import { startTutorSessionV4 } from "@/lib/tutor-v4/tutorEngineV4";

function isStudentStyle(value: unknown): value is "dys" | "middle" | "challenge" {
  return value === "dys" || value === "middle" || value === "challenge";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { classe, matiere, notion, style } = body;

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
      style: isStudentStyle(style) ? style : "middle",
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