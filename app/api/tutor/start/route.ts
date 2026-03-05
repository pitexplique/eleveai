import { NextResponse } from "next/server";
import { startTutorSession } from "@/lib/tutor/engine/tutorEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await startTutorSession({
      classe: String(body?.classe || "6e"),
      matiere: String(body?.matiere || "maths"),
      notion: String(body?.notion || "fractions"),
      style: (body?.style as "dys" | "middle" | "challenge") || "middle",
      enigmes: Boolean(body?.enigmes),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erreur start tutor." }, { status: 400 });
  }
}
