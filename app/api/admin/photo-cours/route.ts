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
  modele: string | null;
  input_tokens: number | null;
  output_tokens: number | null;
};

/**
 * ⚠️ TARIFS À VÉRIFIER, ET C'EST POUR ÇA QU'ILS SONT ICI ET PAS ENFOUIS.
 * Dollars par MILLION de tokens, `gpt-4.1-mini` au 13/08/2026. Ils changent
 * sans prévenir — le chiffre affiché est donc une ESTIMATION, et l'écran le
 * dit. La vérité est sur platform.openai.com/usage.
 * ⭐ On stocke les TOKENS en base, jamais un montant : les tarifs bougent, les
 * tokens consommés non. Changer ces deux nombres suffit à recalculer tout
 * l'historique.
 */
const TARIF_ENTREE = 0.4;
const TARIF_SORTIE = 1.6;

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
      "id, created_at, code_etablissement, code_utilisateur, type_utilisateur, nom, etape, type_production, confiance, niveau, notion, matiere, zones_illisibles, modele, input_tokens, output_tokens"
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

  // ⭐ CE QUE ÇA COÛTE (13/08). Frédéric : « combien ça a coûté ? » — et la
  // seule réponse possible était une estimation, parce qu'on jetait le compte
  // que l'API nous donnait à chaque appel.
  const entree = lignes.reduce((s, l) => s + (l.input_tokens ?? 0), 0);
  const sortie = lignes.reduce((s, l) => s + (l.output_tokens ?? 0), 0);
  const cout = (entree / 1_000_000) * TARIF_ENTREE + (sortie / 1_000_000) * TARIF_SORTIE;

  return NextResponse.json({
    ok: true,
    total: lignes.length,
    tokens: {
      entree,
      sortie,
      // Deux décimales suffiraient à afficher « 0,00 » sur des sommes réelles :
      // on garde quatre chiffres, c'est un coût de fonctionnement, pas un prix
      // de vente.
      coutDollars: Math.round(cout * 10000) / 10000,
      // Combien coûte UN cours photographié, en moyenne. C'est le chiffre qui
      // sert à décider si la fonction peut rester gratuite.
      coutParCours: lignes.length
        ? Math.round((cout / Math.max(1, lignes.filter((l) => l.etape === "lecture").length)) * 10000) / 10000
        : 0,
    },
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
