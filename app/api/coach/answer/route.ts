import { NextRequest, NextResponse, after } from "next/server";
import { answerTutorV4 } from "@/lib/tutor-v4/tutorEngineV4";
import { compterReponseCoach } from "@/lib/server/compteurCoach";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, answer } = body;

    if (!sessionId || typeof answer !== "string") {
      return NextResponse.json(
        { error: "sessionId ou answer invalide" },
        { status: 400 }
      );
    }

    const result = await answerTutorV4(sessionId, answer);

    // Le compteur façon IXL : après la réponse, sans la retarder.
    const compte = result.compte;
    if (compte) after(() => compterReponseCoach(compte.classe, compte.matiere, compte.microId, result.result.ok));

    return NextResponse.json({ ...result, compte: undefined });
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
