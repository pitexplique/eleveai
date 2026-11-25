import { NextRequest, NextResponse } from "next/server";
import { startTutorSessionV4 } from "@/lib/tutor-v4/tutorEngineV4";

function lireNiveaux(brut: unknown): Record<string, number> | undefined {
  if (!brut || typeof brut !== "object" || Array.isArray(brut)) return undefined;
  const propre: Record<string, number> = {};
  for (const [micro, niveau] of Object.entries(brut as Record<string, unknown>).slice(0, 300)) {
    if (typeof niveau === "number" && niveau >= 1 && niveau <= 5) propre[micro] = niveau;
  }
  return propre;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { classe, matiere, notion, microId, displayMode, seenQuestionIds, micros } = body;

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
      /* Les micros cochées par le prof : le moteur ne garde que celles de la
         notion. */
      microsAutorisees: Array.isArray(micros)
        ? micros.filter((v: unknown): v is string => typeof v === "string").slice(0, 50)
        : undefined,
      /* Le dernier niveau atteint par série (25/11/2026) : que des nombres. */
      niveauxParMicro: lireNiveaux(body.niveauxParMicro),
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
