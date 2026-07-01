// /api/track — journal AGRÉGÉ des pages vues (« où vont les élèves »).
// Appelé en fire-and-forget par PageViewTracker (sendBeacon). RGPD : on ne
// stocke QUE la section (1er segment d'URL) + le code établissement, jamais
// d'identité. Écriture service-role (RLS actif sur pages_vues).

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function serviceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// Réduit une URL à sa SECTION : "/dico/maths/6e?x=1" -> "/dico", "/" -> "/".
function toSection(raw: string): string {
  const path = raw.split("?")[0].split("#")[0];
  const seg = path.split("/").filter(Boolean)[0];
  const section = seg ? `/${seg}` : "/";
  return section.slice(0, 40);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const rawPage = typeof body?.page === "string" ? body.page : "";
    if (!rawPage) return new NextResponse(null, { status: 204 });

    const page = toSection(rawPage);
    // On ne loggue pas l'admin ni les routes techniques.
    if (page.startsWith("/admin") || page.startsWith("/api")) {
      return new NextResponse(null, { status: 204 });
    }

    const etabRaw =
      typeof body?.code_etablissement === "string"
        ? body.code_etablissement.trim().slice(0, 40)
        : "";
    const code_etablissement = etabRaw || null;

    const supabase = serviceClient();
    await supabase.from("pages_vues").insert({ page, code_etablissement });
  } catch {
    // Silencieux : le tracking ne doit JAMAIS casser la navigation de l'élève.
  }
  return new NextResponse(null, { status: 204 });
}
