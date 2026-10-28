// /api/coach/compteur — le grand total des réponses au coach, lu en direct par
// CompteurReponsesCoach (coach et pied de page). Mis en cache 20 s au CDN :
// mille élèves qui regardent le compteur ne font pas mille lectures de
// Supabase, ni mille appels de fonction Vercel.

import { NextResponse } from "next/server";
import { lireTotalReponsesCoach } from "@/lib/server/compteurCoach";

export const dynamic = "force-dynamic";

export async function GET() {
  const total = await lireTotalReponsesCoach();
  return NextResponse.json(
    { total },
    { headers: { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=40" } }
  );
}
