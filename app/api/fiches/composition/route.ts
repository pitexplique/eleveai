// API des compositions de fiches (réservée au staff : prof/principal/boss).
// GET  ?matiere=&classe=&notion=  → la composition du prof pour cette fiche
// GET  (sans paramètres)          → toutes ses compositions (dashboard-prof)
// PUT  { matiere, classe, notion, ordre, actives } → upsert
// DELETE { matiere, classe, notion } → retour à la fiche canonique

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sessionFromRequest } from "@/lib/server/requireSession";

const ROLES_STAFF = new Set(["prof", "principal", "boss"]);

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function sessionStaff(req: Request) {
  const session = sessionFromRequest(req);
  if (!session || !ROLES_STAFF.has(session.type_utilisateur)) return null;
  return session;
}

const SLUG_RE = /^[a-z0-9-]{1,60}$/;

function slugValide(v: unknown): v is string {
  return typeof v === "string" && SLUG_RE.test(v);
}

/** Valide { ordre, actives } sans faire confiance au client. */
function dataValide(ordre: unknown, actives: unknown) {
  if (
    !Array.isArray(ordre) ||
    ordre.length === 0 ||
    ordre.length > 30 ||
    !ordre.every((r) => typeof r === "string" && r.length <= 40)
  ) {
    return null;
  }
  if (!actives || typeof actives !== "object" || Array.isArray(actives)) {
    return null;
  }
  const entrees = Object.entries(actives as Record<string, unknown>);
  if (
    entrees.length > 30 ||
    !entrees.every(([k, v]) => k.length <= 40 && typeof v === "boolean")
  ) {
    return null;
  }
  return { ordre, actives };
}

export async function GET(req: Request) {
  const session = sessionStaff(req);
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Réservé aux profs connectés." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const matiere = searchParams.get("matiere");
  const classe = searchParams.get("classe");
  const notion = searchParams.get("notion");

  let q = supabaseAdmin()
    .from("fiches_compositions")
    .select("matiere, classe, notion, data, updated_at")
    .eq("code_etablissement", session.code_etablissement)
    .eq("code_utilisateur", session.code_utilisateur)
    .order("updated_at", { ascending: false })
    .limit(100);

  const cible = slugValide(matiere) && slugValide(classe) && slugValide(notion);
  if (cible) {
    q = q.eq("matiere", matiere).eq("classe", classe).eq("notion", notion);
  }

  const { data, error } = await q;
  if (error) {
    // Table absente (SQL pas encore exécuté) : le client retombe sur le
    // localStorage sans erreur visible.
    return NextResponse.json({ ok: true, compositions: [] });
  }

  if (cible) {
    return NextResponse.json({ ok: true, composition: data?.[0] ?? null });
  }
  return NextResponse.json({ ok: true, compositions: data ?? [] });
}

export async function PUT(req: Request) {
  const session = sessionStaff(req);
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Réservé aux profs connectés." },
      { status: 401 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const { matiere, classe, notion } = body ?? {};
  const data = dataValide(body?.ordre, body?.actives);

  if (!slugValide(matiere) || !slugValide(classe) || !slugValide(notion) || !data) {
    return NextResponse.json(
      { ok: false, error: "Composition invalide." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin()
    .from("fiches_compositions")
    .upsert(
      {
        code_etablissement: session.code_etablissement,
        code_utilisateur: session.code_utilisateur,
        matiere,
        classe,
        notion,
        data,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict:
          "code_etablissement,code_utilisateur,matiere,classe,notion",
      }
    );

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Enregistrement impossible (table absente ?)." },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const session = sessionStaff(req);
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Réservé aux profs connectés." },
      { status: 401 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const { matiere, classe, notion } = body ?? {};
  if (!slugValide(matiere) || !slugValide(classe) || !slugValide(notion)) {
    return NextResponse.json(
      { ok: false, error: "Cible invalide." },
      { status: 400 }
    );
  }

  await supabaseAdmin()
    .from("fiches_compositions")
    .delete()
    .eq("code_etablissement", session.code_etablissement)
    .eq("code_utilisateur", session.code_utilisateur)
    .eq("matiere", matiere)
    .eq("classe", classe)
    .eq("notion", notion);

  return NextResponse.json({ ok: true });
}
