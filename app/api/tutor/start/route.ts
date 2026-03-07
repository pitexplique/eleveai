export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { startTutorSession } from "@/lib/tutor/tutorEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await startTutorSession({
      classe: body.classe,
      matiere: body.matiere,
      notion: body.notion,
      style: body.style ?? "middle",
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur start tutor." },
      { status: 500 }
    );
  }
}