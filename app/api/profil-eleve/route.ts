// GET /api/profil-eleve
//
// Renvoie le profil de l'élève connecté (Niveau + Comportement +
// recommandations rule-based). Lit le snapshot persisté `profil_eleve` ; s'il
// n'existe pas encore (aucune sauvegarde n'a déclenché mettreAJourProfil), le
// calcule à la volée et le persiste.
//
// Auth : jeton de session signé, passé en `Authorization: Bearer <token>`
// (même schéma que /api/dashboard). L'identité vient du jeton → un élève ne lit
// que SON profil (profilage de mineurs : jamais exposé à la clé anon).

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";
import { computeProfil, mettreAJourProfil } from "@/lib/profil-eleve/computeProfil";

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("authorization") ?? "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    const session = verifySessionToken(token);
    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Session expirée. Reconnecte-toi." },
        { status: 401 }
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      return NextResponse.json(
        { ok: false, error: "Configuration serveur incomplète." },
        { status: 500 }
      );
    }

    const supabase = createClient(url, key);

    // Snapshot déjà calculé ?
    const { data: ligne } = await supabase
      .from("profil_eleve")
      .select("data, updated_at")
      .eq("code_etablissement", session.code_etablissement)
      .eq("code_utilisateur", session.code_utilisateur)
      .maybeSingle();

    if (ligne?.data) {
      return NextResponse.json({
        ok: true,
        profil: ligne.data,
        updated_at: ligne.updated_at,
      });
    }

    // Pas encore de snapshot → on calcule à la volée et on persiste (best effort).
    const profil = await computeProfil({
      codeEtablissement: session.code_etablissement,
      codeUtilisateur: session.code_utilisateur,
      nom: session.nom,
      classe: session.classe,
    });
    if (!profil) {
      return NextResponse.json(
        { ok: false, error: "Profil indisponible." },
        { status: 500 }
      );
    }
    await mettreAJourProfil({
      codeEtablissement: session.code_etablissement,
      codeUtilisateur: session.code_utilisateur,
      nom: session.nom,
      classe: session.classe,
    });

    return NextResponse.json({
      ok: true,
      profil,
      updated_at: profil.computed_at,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
