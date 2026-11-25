// app/api/prof-a-valider/route.ts
//
// 👩‍🏫 PROF À VALIDER : e-mail à l'admin (25/11/2026, Frédéric).
// Quand un prof crée son compte avec une adresse NON académique (gmail…),
// il ne peut pas créer de classe tant qu'il n'est pas validé dans
// /admin/dashboard (« Profs à valider »). On prévient l'admin par UN e-mail.
//
// Appelé par /auth/signin juste après la création du profil users_email.
// ⛔ Aucun e-mail au prof lui-même (connexion par code à 6 chiffres, aucun mail).
// Un seul e-mail par prof : marque `prof_a_valider_signale` dans les
// app_metadata de son compte Supabase Auth (pas de SQL).
// Si l'envoi échoue, l'inscription n'est pas bloquée : on répond 200 et on log.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { estAdresseAcademique } from "@/lib/server/classesProf";

export const dynamic = "force-dynamic";

const DESTINATAIRE = "eleveai974@gmail.com";
// Compte trop ancien : ce n'est plus une création (pas d'e-mail).
const FRAICHEUR_MS = 60 * 60 * 1000;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const accessToken = typeof body?.access_token === "string" ? body.access_token : "";
  if (!accessToken) return NextResponse.json({ ok: false }, { status: 400 });

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: userData, error: userError } = await db.auth.getUser(accessToken);
  const user = userData?.user;
  if (userError || !user) return NextResponse.json({ ok: false }, { status: 401 });

  // Déjà signalé : rien à faire.
  if (user.app_metadata?.prof_a_valider_signale) return NextResponse.json({ ok: true, envoye: false });

  const { data: profil } = await db
    .from("users_email")
    .select("id, email, nom, type_utilisateur, prof_valide, created_at")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  const aSignaler =
    !!profil &&
    profil.type_utilisateur === "prof" &&
    !profil.prof_valide &&
    !estAdresseAcademique(profil.email) &&
    !!profil.created_at &&
    Date.now() - new Date(profil.created_at).getTime() < FRAICHEUR_MS;
  if (!aSignaler) return NextResponse.json({ ok: true, envoye: false });

  // On marque AVANT l'envoi : deux appels rapprochés n'envoient pas deux e-mails.
  const { error: marqueErreur } = await db.auth.admin.updateUserById(user.id, {
    app_metadata: { ...(user.app_metadata ?? {}), prof_a_valider_signale: new Date().toISOString() },
  });
  if (marqueErreur) {
    console.error("prof-a-valider : marque impossible :", marqueErreur.message);
    return NextResponse.json({ ok: true, envoye: false });
  }

  const cle = process.env.RESEND_API_KEY;
  if (!cle) {
    console.error("prof-a-valider : RESEND_API_KEY manquante");
    return NextResponse.json({ ok: true, envoye: false });
  }

  const date = new Date(profil.created_at as string).toLocaleString("fr-FR", {
    timeZone: "Indian/Reunion",
    dateStyle: "long",
    timeStyle: "short",
  });
  const lignes = [
    "Un prof vient de créer son compte avec une adresse non académique.",
    "Il ne peut pas créer de classe tant qu'il n'est pas validé.",
    "",
    `Nom : ${profil.nom || "(sans nom)"}`,
    `E-mail : ${profil.email ?? "—"}`,
    `Inscrit le : ${date}`,
    "",
    "Valider ou non : https://www.eleveai.fr/admin/dashboard (« 👩‍🏫 Profs à valider »)",
  ];
  try {
    const { error } = await new Resend(cle).emails.send({
      from: process.env.NEWSLETTER_FROM || "EleveAI <contact@eleveai.fr>",
      to: DESTINATAIRE,
      subject: `👩‍🏫 Prof à valider : ${profil.nom || profil.email}`,
      text: lignes.join("\n"),
    });
    if (error) {
      console.error("prof-a-valider : envoi refusé :", error.message);
      return NextResponse.json({ ok: true, envoye: false });
    }
  } catch (e) {
    console.error("prof-a-valider : envoi impossible :", e);
    return NextResponse.json({ ok: true, envoye: false });
  }
  return NextResponse.json({ ok: true, envoye: true });
}
