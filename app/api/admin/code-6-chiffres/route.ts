// app/api/admin/code-6-chiffres/route.ts
//
// « Code oublié » (17/11) : l'admin remet à zéro le code à 6 chiffres d'une
// adresse email. Le mot de passe devient aléatoire et le drapeau
// code_6_chiffres repasse à false : à sa prochaine connexion, la personne
// choisit un nouveau code (retapé deux fois). Aucun mail n'est envoyé.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { trouverUtilisateur } from "@/lib/server/trouverUtilisateurEmail";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  if (!verifyAdminCookieValue(cookieStore.get("admin-auth")?.value)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const email = String(body?.email ?? "").trim().toLowerCase();
  if (!email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Adresse email invalide." }, { status: 400 });
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const user = await trouverUtilisateur(admin, email);
  if (!user) {
    return NextResponse.json({ ok: false, error: "Aucun compte avec cette adresse." }, { status: 404 });
  }

  const { error } = await admin.auth.admin.updateUserById(user.id, {
    password: randomBytes(24).toString("base64url"),
    user_metadata: { ...(user.user_metadata ?? {}), code_6_chiffres: false },
  });
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
