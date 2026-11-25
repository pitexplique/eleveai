// app/api/admin/profs/route.ts
//
// 👩‍🏫 PROFS À VALIDER (25/11/2026) — Frédéric : « lance aussi prof gmail ».
// Un prof inscrit avec une adresse non académique (gmail…) ne peut pas créer
// de classe tant que users_email.prof_valide n'est pas vrai
// (lib/server/classesProf.ts, profDuJeton). Ici, l'admin le valide en un clic.
//
// GET  : les comptes prof non académiques (à valider, puis déjà validés).
// POST : { id, valide: boolean } → met prof_valide, seulement sur un compte
//        type_utilisateur = "prof". Rien d'autre n'est modifié.
// ⛔ Admin seulement : cookie admin signé (comme /api/admin/code-6-chiffres).

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { estAdresseAcademique } from "@/lib/server/classesProf";

export const dynamic = "force-dynamic";

async function estAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);
}

function supabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}

type LigneProf = { id: string; email: string | null; nom: string | null; created_at?: string | null; prof_valide: boolean | null };

export async function GET() {
  if (!(await estAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const db = supabase();
  const { data, error } = await db
    .from("users_email")
    .select("id, email, nom, created_at, prof_valide")
    .eq("type_utilisateur", "prof")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  // Une adresse académique n'a pas besoin de validation : on ne la montre pas.
  const profs = ((data ?? []) as LigneProf[]).filter((p) => !estAdresseAcademique(p.email));
  return NextResponse.json({
    ok: true,
    aValider: profs.filter((p) => !p.prof_valide),
    valides: profs.filter((p) => !!p.prof_valide),
  });
}

export async function POST(req: Request) {
  if (!(await estAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const body = await req.json().catch(() => ({}));
  const id = typeof body?.id === "string" ? body.id : "";
  const valide = body?.valide === true;
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ ok: false, error: "Compte inconnu." }, { status: 400 });
  }

  const db = supabase();
  // État d'avant : l'e-mail « compte validé » ne part que sur un vrai passage non validé → validé.
  const { data: avant } = await db
    .from("users_email")
    .select("prof_valide")
    .eq("id", id)
    .eq("type_utilisateur", "prof")
    .maybeSingle();
  const { data, error } = await db
    .from("users_email")
    .update({ prof_valide: valide })
    .eq("id", id)
    .eq("type_utilisateur", "prof")
    .select("id, email, nom, prof_valide");
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  if (!data?.length) {
    return NextResponse.json({ ok: false, error: "Ce compte n'est pas un compte prof." }, { status: 404 });
  }
  const prof = data[0] as { id: string; email: string | null; nom: string | null; prof_valide: boolean | null };
  const emailEnvoye = valide && !avant?.prof_valide ? await prevenirProfValide(prof) : false;
  return NextResponse.json({ ok: true, prof, emailEnvoye });
}

// ✉️ 25/11/2026, Frédéric : « il faut lui envoyer un email » quand il est validé.
// Seule exception à « aucun mail à l'utilisateur » : un seul e-mail, à la validation
// (pas au retrait). Un échec n'annule pas la validation.
// Domaines réservés aux tests (.invalid, .test…) : pas d'envoi (rebond assuré).
async function prevenirProfValide(p: { email: string | null; nom: string | null }): Promise<boolean> {
  const email = (p.email ?? "").trim();
  const cle = process.env.RESEND_API_KEY;
  if (!email || !cle) return false;
  if (/\.(invalid|test|example|localhost)$/i.test(email)) {
    console.log("profs : e-mail de validation non envoyé (adresse de test)", email);
    return false;
  }
  const lignes = [
    `Bonjour${p.nom ? " " + p.nom : ""},`,
    "",
    "Votre compte professeur EleveAI est validé.",
    "Vous pouvez maintenant créer vos classes : le site fabrique le code de la classe,",
    "un code par élève et un mot de passe simple, à imprimer et distribuer.",
    "",
    "Mes classes : https://www.eleveai.fr/prof/classes",
    "Connexion : votre adresse e-mail, puis votre code à 6 chiffres.",
    "",
    "Bonne classe !",
    "Frédéric, EleveAI",
  ];
  try {
    const { error } = await new Resend(cle).emails.send({
      from: process.env.NEWSLETTER_FROM || "EleveAI <contact@eleveai.fr>",
      to: email,
      replyTo: process.env.CONTACT_TO || undefined,
      subject: "✅ Votre compte prof EleveAI est validé",
      text: lignes.join("\n"),
    });
    if (error) {
      console.error("profs : e-mail de validation refusé :", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error("profs : e-mail de validation impossible :", e);
    return false;
  }
}
