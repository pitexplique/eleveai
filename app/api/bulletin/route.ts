// Bulletin de l'élève connecté (notes /20, progression, assiduité, appréciation).
// Lecture sécurisée : scope forcé au jeton de session signé (un élève ne voit
// que SON bulletin). On lit d'abord le snapshot pré-calculé (table bulletins,
// alimentée à chaque sauvegarde de résultat) ; s'il n'existe pas encore, on
// calcule à la volée et on tente de le mettre en cache pour la prochaine fois.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";
import { computeBulletin } from "@/lib/bulletin/computeBulletin";
import type { Bulletin } from "@/lib/bulletin/types";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const session = verifySessionToken(token);
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Session expirée. Reconnecte-toi." },
      { status: 401 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1) Snapshot pré-calculé (rapide).
  try {
    const { data } = await supabase
      .from("bulletins")
      .select("data")
      .eq("code_etablissement", session.code_etablissement)
      .eq("code_utilisateur", session.code_utilisateur)
      .maybeSingle();
    if (data?.data) {
      // ⚠️ LE SNAPSHOT FIGE LA CLASSE DU JOUR OÙ IL A ÉTÉ CALCULÉ.
      // Il n'est réécrit qu'à la sauvegarde d'un résultat : un élève passé en
      // 5e à la rentrée garderait donc « 6e » en tête de son bulletin jusqu'à
      // son premier exercice de l'année — soit précisément le moment où il
      // ouvre son tableau de bord pour la première fois. Constaté le 12/08 sur
      // Arthur (6C19), snapshot du 4 juin.
      //
      // Les CHIFFRES du snapshot restent justes : ils portent sur des
      // exercices réellement faits en 6e. Seul l'en-tête doit dire qui est
      // l'élève AUJOURD'HUI — et ça, c'est la session qui le sait.
      const snapshot = data.data as Bulletin;
      return NextResponse.json({
        ok: true,
        bulletin: { ...snapshot, classe: session.classe ?? snapshot.classe },
      });
    }
  } catch {
    // table absente / non lisible : on bascule sur le calcul à la volée.
  }

  // 2) Pas de snapshot : calcul à la volée (et mise en cache best-effort).
  const bulletin = await computeBulletin({
    codeEtablissement: session.code_etablissement,
    codeUtilisateur: session.code_utilisateur,
    nom: session.nom,
    classe: session.classe,
  });
  if (!bulletin) {
    return NextResponse.json({ ok: true, bulletin: null });
  }
  try {
    await supabase.from("bulletins").upsert({
      code_etablissement: session.code_etablissement,
      code_utilisateur: session.code_utilisateur,
      data: bulletin,
      updated_at: new Date().toISOString(),
    });
  } catch {
    // table absente : tant pis, le calcul a quand même renvoyé le bulletin.
  }
  return NextResponse.json({ ok: true, bulletin });
}
