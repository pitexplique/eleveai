// « Suis-je bêta testeur ? » — la question que pose le bouton de signalement
// posé à côté de chaque question des coachs.
//
// L'identité vient du JETON DE SESSION signé (Authorization: Bearer), jamais de
// paramètres d'URL : un code d'élève n'a rien à faire dans une adresse, elle se
// retrouve dans les journaux et les historiques. Même mécanique que
// /api/dashboard et /api/classement.
//
// Réponse volontairement minuscule — un booléen et un numéro — parce qu'elle est
// appelée à chaque page de coach : elle ne doit rien coûter.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";
import { ANNEE_BETA } from "@/lib/beta/places";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const session = verifySessionToken(auth.startsWith("Bearer ") ? auth.slice(7) : "");

  // Pas de session = pas bêta testeur. Ce n'est pas une erreur : la plupart des
  // gens sont dans ce cas, et le bouton doit simplement ne pas s'afficher.
  if (!session) return NextResponse.json({ ok: true, beta: false, numero: null });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await supabase
    .from("beta_testeurs")
    .select("numero_place")
    .eq("annee", ANNEE_BETA)
    .eq("statut", "accepte")
    .eq("code_etablissement", session.code_etablissement)
    .eq("code_utilisateur", session.code_utilisateur)
    .maybeSingle();

  // Table absente ou en panne : on répond « pas bêta ». Un coach ne doit jamais
  // tomber parce qu'une table annexe ne répond pas.
  if (error) return NextResponse.json({ ok: true, beta: false, numero: null });

  return NextResponse.json({
    ok: true,
    beta: Boolean(data),
    numero: (data?.numero_place as number | null) ?? null,
  });
}
