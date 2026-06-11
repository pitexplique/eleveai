// Connexion par codes établissement, vérifiée côté serveur.
// Le mot de passe n'est plus jamais lu ni comparé dans le navigateur :
// la vérification passe par la fonction SQL verifier_acces_etablissement
// (hash bcrypt, voir supabase/acces_etablissement_mot_de_passe.sql).
// Tant que cette fonction n'a pas été créée, un fallback compare le champ
// mot_de_passe en clair — mais toujours côté serveur.
// En cas de succès, renvoie un jeton de session signé utilisé ensuite par
// /api/resultats et /api/dashboard.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { signSessionToken } from "@/lib/server/session";

type AccesRow = {
  id: string;
  code_etablissement: string;
  code_utilisateur: string;
  type_utilisateur: string;
  nom: string | null;
  classe: string | null;
  mot_de_passe?: string | null;
};

const INVALID = NextResponse.json(
  { ok: false, error: "Codes ou mot de passe invalides, ou compte inactif." },
  { status: 401 }
);

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const codeEtablissement = String(body.codeEtablissement ?? "").trim();
  const codeUtilisateur = String(body.codeUtilisateur ?? "").trim();
  const motDePasse = String(body.motDePasse ?? "");

  if (!codeEtablissement || !codeUtilisateur || !motDePasse) {
    return NextResponse.json(
      { ok: false, error: "Champs manquants" },
      { status: 400 }
    );
  }
  if (
    codeEtablissement.length > 100 ||
    codeUtilisateur.length > 100 ||
    motDePasse.length > 200
  ) {
    return INVALID;
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let acces: AccesRow | null = null;

  const { data, error } = await supabaseAdmin
    .rpc("verifier_acces_etablissement", {
      p_code_etablissement: codeEtablissement,
      p_code_utilisateur: codeUtilisateur,
      p_mot_de_passe: motDePasse,
    })
    .maybeSingle();

  if (!error) {
    acces = (data as AccesRow | null) ?? null;
  } else {
    // Fonction SQL pas encore créée : fallback en clair, côté serveur.
    const fallback = await supabaseAdmin
      .from("acces_etablissement")
      .select(
        "id, code_etablissement, code_utilisateur, type_utilisateur, nom, classe, mot_de_passe"
      )
      .eq("code_etablissement", codeEtablissement)
      .eq("code_utilisateur", codeUtilisateur)
      .eq("actif", true)
      .maybeSingle();

    if (fallback.error) {
      return NextResponse.json(
        { ok: false, error: "Impossible de vérifier ces codes. Réessayez." },
        { status: 500 }
      );
    }
    if (fallback.data && fallback.data.mot_de_passe === motDePasse) {
      acces = fallback.data as AccesRow;
    }
  }

  if (!acces) {
    return INVALID;
  }

  const token = signSessionToken({
    acces_id: String(acces.id),
    code_etablissement: acces.code_etablissement,
    code_utilisateur: acces.code_utilisateur,
    nom: acces.nom ?? null,
    type_utilisateur: acces.type_utilisateur,
    classe: acces.classe ?? null,
  });

  return NextResponse.json({
    ok: true,
    token,
    session: {
      mode: "code",
      utilisateurCodeId: acces.id,
      code_etablissement: acces.code_etablissement,
      code_utilisateur: acces.code_utilisateur,
      role: acces.type_utilisateur,
      nom: acces.nom,
      classe: acces.classe,
    },
  });
}
