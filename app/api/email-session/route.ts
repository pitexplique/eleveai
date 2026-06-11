// Délivre un jeton de session signé aux comptes e-mail (OTP Supabase Auth).
// Le navigateur envoie son access_token Supabase ; on le vérifie côté
// serveur, on retrouve le profil users_email correspondant, puis on signe
// le même type de jeton que /api/code-login pour que /api/resultats et
// /api/dashboard fonctionnent à l'identique pour ces comptes
// (code_etablissement = INDEPENDANT, code_utilisateur = EMAIL-<id>).

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { signSessionToken } from "@/lib/server/session";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const accessToken = String(body.access_token ?? "");

  if (!accessToken) {
    return NextResponse.json(
      { ok: false, error: "access_token manquant" },
      { status: 400 }
    );
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: userData, error: userError } =
    await supabaseAdmin.auth.getUser(accessToken);

  if (userError || !userData?.user) {
    return NextResponse.json(
      { ok: false, error: "Session invalide ou expirée." },
      { status: 401 }
    );
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("users_email")
    .select("id, auth_user_id, email, nom, type_utilisateur")
    .eq("auth_user_id", userData.user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return NextResponse.json(
      { ok: false, error: "Profil introuvable." },
      { status: 404 }
    );
  }

  const token = signSessionToken({
    acces_id: String(profile.id),
    code_etablissement: "INDEPENDANT",
    code_utilisateur: `EMAIL-${profile.id}`,
    nom: profile.nom ?? profile.email ?? null,
    type_utilisateur: profile.type_utilisateur ?? "perso",
    classe: null,
  });

  return NextResponse.json({ ok: true, token });
}
