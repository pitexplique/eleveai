// app/api/admin/photo-cours/route.ts
//
// « Avec qui l'utilise, visible dans admin » (Frédéric, 12/08/2026).
//
// La question que cet écran doit trancher n'est pas « combien d'appels ? » mais
// « est-ce que quelqu'un s'en sert VRAIMENT ? ». D'où le tri par personne
// plutôt que par ligne : dix lectures d'un seul curieux et dix lectures de dix
// professeurs ne racontent pas la même chose, et un total les confond.
//
// ⛔ Cette route ne peut rien afficher du cours photographié : la table ne le
// contient pas (voir supabase/photo_cours_usages.sql).

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 300;

type Ligne = {
  id: string;
  created_at: string;
  code_etablissement: string | null;
  code_utilisateur: string;
  type_utilisateur: string | null;
  nom: string | null;
  etape: "lecture" | "production";
  type_production: string | null;
  confiance: number | null;
  niveau: string | null;
  notion: string | null;
  matiere: string | null;
  zones_illisibles: number | null;
};

export async function GET() {
  const cookieStore = await cookies();
  if (!verifyAdminCookieValue(cookieStore.get("admin-auth")?.value)) {
    return NextResponse.json(
      { ok: false, error: "Accès réservé à l'administration." },
      { status: 403 }
    );
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return NextResponse.json(
      { ok: false, error: "Supabase indisponible côté serveur." },
      { status: 500 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabase
    .from("photo_cours_usages")
    .select(
      "id, created_at, code_etablissement, code_utilisateur, type_utilisateur, nom, etape, type_production, confiance, niveau, notion, matiere, zones_illisibles"
    )
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  if (error) {
    // La table n'existe pas encore = le SQL n'a pas été passé. On le DIT, au
    // lieu d'afficher un zéro qui ressemblerait à « personne ne s'en sert ».
    return NextResponse.json({
      ok: false,
      tableManquante: true,
      error: error.message,
    });
  }

  const lignes = (data ?? []) as Ligne[];

  // Regroupement par personne.
  const parUtilisateur = new Map<
    string,
    {
      codeUtilisateur: string;
      codeEtablissement: string | null;
      nom: string | null;
      typeUtilisateur: string | null;
      lectures: number;
      productions: number;
      derniere: string;
      notions: string[];
    }
  >();

  for (const l of lignes) {
    const cle = `${l.code_etablissement ?? ""}/${l.code_utilisateur}`;
    const courant = parUtilisateur.get(cle) ?? {
      codeUtilisateur: l.code_utilisateur,
      codeEtablissement: l.code_etablissement,
      nom: l.nom,
      typeUtilisateur: l.type_utilisateur,
      lectures: 0,
      productions: 0,
      // Les lignes arrivent déjà triées du plus récent au plus ancien : la
      // première vue pour une personne EST sa dernière utilisation.
      derniere: l.created_at,
      notions: [] as string[],
    };
    if (l.etape === "lecture") courant.lectures += 1;
    else courant.productions += 1;
    if (l.notion && !courant.notions.includes(l.notion)) {
      courant.notions.push(l.notion);
    }
    parUtilisateur.set(cle, courant);
  }

  const confiances = lignes
    .filter((l) => l.etape === "lecture" && typeof l.confiance === "number")
    .map((l) => l.confiance as number);

  return NextResponse.json({
    ok: true,
    total: lignes.length,
    lectures: lignes.filter((l) => l.etape === "lecture").length,
    productions: lignes.filter((l) => l.etape === "production").length,
    confianceMoyenne: confiances.length
      ? Math.round(confiances.reduce((a, b) => a + b, 0) / confiances.length)
      : null,
    // Les photos trop mauvaises pour être exploitables. Si ce chiffre est haut,
    // le problème est la prise de vue, pas le modèle.
    lecturesFaibles: confiances.filter((c) => c < 60).length,
    utilisateurs: [...parUtilisateur.values()].sort((a, b) =>
      b.derniere.localeCompare(a.derniere)
    ),
    recents: lignes.slice(0, 40),
  });
}
