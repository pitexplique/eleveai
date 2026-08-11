// /api/signalements — bugs, erreurs pédagogiques, idées, avis.
//
// Ouverte à TOUT LE MONDE, connecté ou non : les neuf visiteurs sur dix qui
// arrivent par Google n'ont pas de compte, et ce sont eux qui voient les
// choses qui coincent en premier. Sans eux, on ne saurait jamais.
//
// Les points, eux, ne vont qu'aux comptes connectés — c'est ce qui donne une
// raison concrète d'en créer un. Quelqu'un sans compte aide quand même, et son
// signalement compte autant ; il ne gagne simplement rien.
//
// RGPD : aucun nom, aucune IP en clair. Voir supabase/signalements.sql.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";

export const dynamic = "force-dynamic";

const MAX_MESSAGE = 1000;
const TYPES = new Set(["bug", "erreur_pedagogique", "idee", "avis"]);

/** Points d'un signalement retenu. Attribués À LA MAIN depuis l'admin. */
const POINTS_A_LA_SOUMISSION = 0;

/** Pas plus de N signalements par empreinte sur la fenêtre. */
const MAX_PAR_FENETRE = 5;
const FENETRE_MINUTES = 10;

function texte(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim().slice(0, max);
  return t || null;
}

/**
 * Une empreinte, PAS une identité. On hache l'IP et le navigateur pour pouvoir
 * arrêter un spammeur sans jamais stocker de quoi remonter à quelqu'un — et on
 * tronque, parce qu'un hash complet d'IP reste réversible par force brute sur
 * un espace aussi petit.
 */
function empreinteDe(req: Request): string {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const ua = req.headers.get("user-agent") ?? "";
  const sel = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "eleveai";
  return createHash("sha256").update(`${sel}|${ip}|${ua}`).digest("hex").slice(0, 24);
}

export async function POST(req: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !cle) return NextResponse.json({ ok: false }, { status: 503 });

    const body = await req.json().catch(() => null);
    const message = texte(body?.message, MAX_MESSAGE);
    if (!message || message.length < 5) {
      return NextResponse.json({ ok: false, erreur: "message-vide" }, { status: 400 });
    }

    const supabase = createClient(url, cle, { auth: { persistSession: false } });
    const empreinte = empreinteDe(req);

    // Anti-spam. On compte, on ne bloque pas l'adresse : quelqu'un qui signale
    // cinq bugs en dix minutes est probablement de bonne foi mais devra
    // souffler — et un robot s'arrête là.
    const depuis = new Date(Date.now() - FENETRE_MINUTES * 60_000).toISOString();
    const { count } = await supabase
      .from("signalements")
      .select("id", { count: "exact", head: true })
      .eq("empreinte", empreinte)
      .gte("created_at", depuis);

    if ((count ?? 0) >= MAX_PAR_FENETRE) {
      return NextResponse.json({ ok: false, erreur: "trop-de-signalements" }, { status: 429 });
    }

    // Le compte n'est cru que s'il existe vraiment. Quelqu'un peut déclarer
    // « Professeur » dans la matrice sans l'être : `profil` reste déclaratif,
    // `type_utilisateur` ne se remplit que sur un compte vérifié.
    const codeEtab = texte(body?.codeEtablissement, 40);
    const codeUtil = texte(body?.codeUtilisateur, 40);
    let connecte = false;
    let typeUtilisateur: string | null = null;

    if (codeEtab && codeUtil) {
      const { data } = await supabase
        .from("acces_etablissement")
        .select("type_utilisateur, actif")
        .eq("code_etablissement", codeEtab)
        .eq("code_utilisateur", codeUtil)
        .eq("actif", true)
        .maybeSingle();
      if (data) {
        connecte = true;
        typeUtilisateur = (data.type_utilisateur as string) ?? null;
      }
    }

    const typeBrut = texte(body?.type, 30) ?? "bug";
    const { error } = await supabase.from("signalements").insert({
      connecte,
      profil: texte(body?.profil, 20),
      code_etablissement: connecte ? codeEtab : null,
      // 11/08 : QUI a signalé. Sans cette colonne on savait qu'un élève du
      // collège avait trouvé une erreur, jamais lequel — et `points_attribues`
      // ne pouvait donc créditer personne.
      code_utilisateur: connecte ? codeUtil : null,
      type_utilisateur: typeUtilisateur,
      type: TYPES.has(typeBrut) ? typeBrut : "bug",
      message,
      page: texte(body?.page, 60),
      question: texte(body?.question, 300),
      notion_lue: texte(body?.notion, 60),
      intention_lue: texte(body?.intention, 30),
      ressources_proposees: texte(body?.ressources, 200),
      ressource_visee: texte(body?.ressourceVisee, 60),
      points_attribues: POINTS_A_LA_SOUMISSION,
      empreinte,
    });

    if (error) {
      console.error("signalements :", error.message);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    // On dit la vérité sur les points : rien n'est promis à la soumission,
    // ils viennent quand le signalement est retenu. Promettre des points
    // automatiques, c'est inviter à en fabriquer.
    return NextResponse.json({ ok: true, connecte });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
