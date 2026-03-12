import { NextRequest, NextResponse } from "next/server";
import { startTutorSessionV4 } from "@/lib/tutor-v4/tutorEngineV4";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { classe, matiere, notion, style } = body;

    const result = await startTutorSessionV4({
      classe,
      matiere,
      notion,
      style: style ?? "middle",
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