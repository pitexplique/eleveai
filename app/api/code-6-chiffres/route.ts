// app/api/code-6-chiffres/route.ts
//
// ⭐ CODE À 6 CHIFFRES SANS MAIL (17/11, Frédéric : « je ne veux pas recevoir
// de code par email » ; « si un ancien email essaie de se connecter il est
// invité à choisir un code à 6 chiffres »). Comptes par email (indépendants,
// ceux qui paient) ; la connexion établissement ne passe pas par ici.
//
// Appelé quand `signInWithPassword(email, code)` échoue :
//   - compte qui a déjà son code      → { etat: "incorrect" } (mauvais code)
//   - ancien compte sans code          → { etat: "choisir" }
//   - adresse inconnue                 → { etat: "nouveau" }
// Avec `confirmer: true` (code retapé deux fois côté page) :
//   - ancien compte sans code → on pose le code         → { etat: "pret" }
//   - adresse inconnue        → on crée le compte Auth  → { etat: "pret" }
// La page se connecte ensuite elle-même avec signInWithPassword.
//
// ⚠️ Choisi en connaissance de cause : sans mail, un ancien compte revient au
// premier qui choisit son code. Une fois le code posé, plus personne ne peut
// le remplacer par ici (seul l'admin le peut, depuis Supabase).

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { clientIp, rateLimitOk } from "@/lib/server/rateLimit";
import { trouverUtilisateur } from "@/lib/server/trouverUtilisateurEmail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body?.email ?? "").trim().toLowerCase();
  const code = String(body?.code ?? "");
  const confirmer = body?.confirmer === true;

  if (!EMAIL_RE.test(email) || email.length > 200 || !/^[0-9]{6}$/.test(code)) {
    return NextResponse.json(
      { ok: false, error: "Email ou code invalide." },
      { status: 400 }
    );
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const ip = clientIp(req);
  const [ipOk, emailOk] = await Promise.all([
    // Large par IP (17/11) : au collège, tout le monde sort par la même IP ;
    // la vraie protection est par adresse email.
    rateLimitOk(admin, `code6:ip:${ip}`, 300, 60),
    rateLimitOk(admin, `code6:email:${email}`, 10, 600),
  ]);
  if (!ipOk || !emailOk) {
    return NextResponse.json(
      { ok: false, error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  const user = await trouverUtilisateur(admin, email);

  if (user) {
    if (user.user_metadata?.code_6_chiffres === true) {
      return NextResponse.json({ ok: true, etat: "incorrect" });
    }
    if (!confirmer) return NextResponse.json({ ok: true, etat: "choisir" });

    const { error } = await admin.auth.admin.updateUserById(user.id, {
      password: code,
      email_confirm: true,
      user_metadata: { ...(user.user_metadata ?? {}), code_6_chiffres: true },
    });
    if (error) {
      console.error("code-6-chiffres update error:", error.message);
      return NextResponse.json(
        { ok: false, error: "Ce code n'a pas été accepté. Essayez 6 autres chiffres." },
        { status: 400 }
      );
    }
    return NextResponse.json({ ok: true, etat: "pret" });
  }

  if (!confirmer) return NextResponse.json({ ok: true, etat: "nouveau" });

  const { error } = await admin.auth.admin.createUser({
    email,
    password: code,
    email_confirm: true,
    user_metadata: { code_6_chiffres: true },
  });
  if (error) {
    console.error("code-6-chiffres create error:", error.message);
    return NextResponse.json(
      { ok: false, error: "Impossible de créer le compte. Réessayez." },
      { status: 400 }
    );
  }
  return NextResponse.json({ ok: true, etat: "pret" });
}
