// /api/admin/maintenance
//
// État de la checklist de maintenance (dashboard admin). La LISTE des tâches est
// dans le code (lib/admin/maintenance.ts) ; ici on lit/écrit seulement l'état
// coché, persisté dans la table maintenance_checklist.
//
// GET  ?jour=YYYY-MM-DD&semaine=YYYY-Www → { quotidien: string[], hebdo: string[] }
// POST { periode, cle_periode, tache_id, fait } → coche (upsert) / décoche (delete)
//
// Auth : cookie admin (même schéma que les autres routes /api/admin/*).

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";

async function isAdmin() {
  const cookieStore = await cookies();
  return verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);
}

function serviceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const PERIODES = ["quotidien", "hebdo"] as const;
// Garde-fous de format sur les clés fournies par le client (jour ou semaine ISO).
const RE_JOUR = /^\d{4}-\d{2}-\d{2}$/;
const RE_SEMAINE = /^\d{4}-W\d{1,2}$/;

export async function GET(req: Request) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const url = new URL(req.url);
  const jour = url.searchParams.get("jour") ?? "";
  const semaine = url.searchParams.get("semaine") ?? "";

  const supabase = serviceClient();
  const [q, h] = await Promise.all([
    RE_JOUR.test(jour)
      ? supabase
          .from("maintenance_checklist")
          .select("tache_id")
          .eq("periode", "quotidien")
          .eq("cle_periode", jour)
      : Promise.resolve({ data: [] as { tache_id: string }[], error: null }),
    RE_SEMAINE.test(semaine)
      ? supabase
          .from("maintenance_checklist")
          .select("tache_id")
          .eq("periode", "hebdo")
          .eq("cle_periode", semaine)
      : Promise.resolve({ data: [] as { tache_id: string }[], error: null }),
  ]);

  if (q.error || h.error) {
    return NextResponse.json(
      { error: q.error?.message || h.error?.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    quotidien: (q.data ?? []).map((r) => r.tache_id),
    hebdo: (h.data ?? []).map((r) => r.tache_id),
  });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const periode = String(body?.periode ?? "");
  const clePeriode = String(body?.cle_periode ?? "");
  const tacheId = String(body?.tache_id ?? "");
  const fait = Boolean(body?.fait);

  if (!PERIODES.includes(periode as (typeof PERIODES)[number])) {
    return NextResponse.json({ error: "Période invalide." }, { status: 400 });
  }
  const cleOk =
    periode === "quotidien" ? RE_JOUR.test(clePeriode) : RE_SEMAINE.test(clePeriode);
  if (!cleOk || !tacheId) {
    return NextResponse.json({ error: "Clé ou tâche invalide." }, { status: 400 });
  }

  const supabase = serviceClient();
  const filtre = { periode, cle_periode: clePeriode, tache_id: tacheId };

  const { error } = fait
    ? await supabase
        .from("maintenance_checklist")
        .upsert({ ...filtre }, { onConflict: "periode,cle_periode,tache_id" })
    : await supabase.from("maintenance_checklist").delete().match(filtre);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
