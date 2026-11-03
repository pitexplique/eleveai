// Les annonces de la banderole rouge (supabase/banderole_realisations.sql).
// Relues toutes les 10 minutes : une ligne ajoutée dans Supabase défile
// sans redéployer. Liste vide si la table n'existe pas encore : le composant
// prend alors sa liste de secours.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 600;

export async function GET() {
  try {
    const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data, error } = await db
      .from("banderole_realisations")
      .select("texte, lien")
      .eq("visible", true)
      .order("ordre", { ascending: true })
      .order("id", { ascending: true })
      .limit(40);
    if (error || !data) return NextResponse.json({ lignes: [] });
    return NextResponse.json({ lignes: data });
  } catch {
    return NextResponse.json({ lignes: [] });
  }
}
