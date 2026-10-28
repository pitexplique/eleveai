// /api/coach/compteur — le grand total des réponses au coach, lu en direct par
// CompteurReponsesCoach. Mis en cache 5 s au CDN : mille élèves qui regardent
// le compteur ne font pas mille lectures de Supabase.

import { NextResponse } from "next/server";
import { lireTotalReponsesCoach } from "@/lib/server/compteurCoach";

export const dynamic = "force-dynamic";

export async function GET() {
  const total = await lireTotalReponsesCoach();
  return NextResponse.json(
    { total },
    { headers: { "Cache-Control": "public, s-maxage=5, stale-while-revalidate=25" } }
  );
}
