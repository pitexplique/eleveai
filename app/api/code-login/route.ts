import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

export async function POST(req: Request) {
  const { codeEtablissement, codeUtilisateur } = await req.json();

  if (!codeEtablissement || !codeUtilisateur) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdminClient();

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Configuration Supabase manquante côté serveur." },
      { status: 500 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("acces_etablissement")
    .select("id, type_utilisateur, nom")
    .eq("code_etablissement", codeEtablissement.trim())
    .eq("code_utilisateur", codeUtilisateur.trim())
    .eq("actif", true)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json(
      { error: "Code établissement ou élève invalide" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    ok: true,
    session: {
      mode: "code",
      utilisateurCodeId: data.id,
      role: data.type_utilisateur,
      nom: data.nom,
    },
  });
}
