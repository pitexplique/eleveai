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
  const { data, error } = await db
    .from("users_email")
    .update({ prof_valide: valide })
    .eq("id", id)
    .eq("type_utilisateur", "prof")
    .select("id, email, prof_valide");
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  if (!data?.length) {
    return NextResponse.json({ ok: false, error: "Ce compte n'est pas un compte prof." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, prof: data[0] });
}
