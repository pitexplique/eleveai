// ✉️ MESSAGE À LA CLASSE — côté PROF (24/11/2026).
// GET    : ses classes actives + ses messages envoyés (avec « lu par N »).
// POST   : { code, texte, lien? } → message à UNE de SES classes ; « lien » =
//          séance du coach (chemin interne, 24/11), bouton « Commencer » chez l'élève.
// DELETE : ?id=… → supprime UN de SES messages.
// ⛔ Le prof ne touche qu'à ses classes : classeDuProf / prof_id à chaque fois.

import { NextResponse } from "next/server";
import { classeDuProf, profDuJeton, supabaseAdmin } from "@/lib/server/classesProf";
import { LONGUEUR_MAX_MESSAGE, nettoyerLienSeance, nettoyerMessage, purgerVieuxMessages } from "@/lib/server/messagesClasse";

export const dynamic = "force-dynamic";

const MAX_MESSAGES_PAR_JOUR = 30;

export async function GET(req: Request) {
  const admin = supabaseAdmin();
  const v = await profDuJeton(admin, req);
  if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: v.status });
  await purgerVieuxMessages(admin);

  // 📤 24/11 : la colonne « lien » (séance envoyée) vient de
  // supabase/messages_classe_seance.sql ; sans elle, on relit sans lien.
  const lireMessages = async () => {
    const avec = await admin
      .from("messages_classe")
      .select("id, created_at, code_etablissement, texte, lien")
      .eq("prof_id", v.prof.id)
      .order("created_at", { ascending: false })
      .limit(50);
    if (!avec.error) return avec;
    return admin
      .from("messages_classe")
      .select("id, created_at, code_etablissement, texte")
      .eq("prof_id", v.prof.id)
      .order("created_at", { ascending: false })
      .limit(50);
  };

  const [{ data: classes }, { data: messages, error }] = await Promise.all([
    admin
      .from("classes_prof")
      .select("code_etablissement, nom_classe, nb_eleves")
      .eq("prof_id", v.prof.id)
      .eq("archivee", false)
      .order("created_at", { ascending: true }),
    lireMessages(),
  ]);
  if (error) {
    return NextResponse.json(
      { ok: false, error: "La table des messages n'existe pas encore (supabase/messages_classe.sql)." },
      { status: 500 }
    );
  }

  const ids = (messages ?? []).map((m) => m.id);
  const lus: Record<string, number> = {};
  if (ids.length) {
    const { data } = await admin.from("messages_classe_lus").select("message_id").in("message_id", ids);
    for (const l of data ?? []) lus[l.message_id] = (lus[l.message_id] ?? 0) + 1;
  }

  return NextResponse.json({
    ok: true,
    max: LONGUEUR_MAX_MESSAGE,
    classes: classes ?? [],
    messages: (messages ?? []).map((m) => ({ ...m, lus: lus[m.id] ?? 0 })),
  });
}

export async function POST(req: Request) {
  const admin = supabaseAdmin();
  const v = await profDuJeton(admin, req);
  if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: v.status });
  await purgerVieuxMessages(admin);

  const body = await req.json().catch(() => ({}));
  const code = typeof body?.code === "string" ? body.code.trim() : "";
  const texte = nettoyerMessage(body?.texte);
  // 📤 Séance envoyée : un chemin interne vers le coach, sinon refus.
  const lienDemande = typeof body?.lien === "string" && body.lien.trim() !== "";
  const lien = lienDemande ? nettoyerLienSeance(body.lien) : null;
  if (lienDemande && !lien) {
    return NextResponse.json({ ok: false, error: "Ce lien n'est pas une séance du coach d'EleveAI." }, { status: 400 });
  }
  if (!texte) return NextResponse.json({ ok: false, error: "Le message est vide." }, { status: 400 });
  if (texte.length > LONGUEUR_MAX_MESSAGE) {
    return NextResponse.json(
      { ok: false, error: `Message trop long : ${LONGUEUR_MAX_MESSAGE} signes au plus.` },
      { status: 400 }
    );
  }

  const classe = await classeDuProf(admin, v.prof.id, code);
  if (!classe) return NextResponse.json({ ok: false, error: "Cette classe n'est pas à toi." }, { status: 403 });

  // Garde-fou : pas plus de 30 messages en 24 h (un double-clic, un script…).
  const depuis = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { count } = await admin
    .from("messages_classe")
    .select("id", { count: "exact", head: true })
    .eq("prof_id", v.prof.id)
    .gte("created_at", depuis);
  if ((count ?? 0) >= MAX_MESSAGES_PAR_JOUR) {
    return NextResponse.json({ ok: false, error: "Trop de messages aujourd'hui. Réessaie demain." }, { status: 429 });
  }

  const { data, error } = await admin
    .from("messages_classe")
    .insert({ prof_id: v.prof.id, code_etablissement: classe.code_etablissement, texte, ...(lien ? { lien } : {}) })
    .select(lien ? "id, created_at, code_etablissement, texte, lien" : "id, created_at, code_etablissement, texte")
    .single();
  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: lien
          ? "Envoi de la séance impossible : exécuter supabase/messages_classe_seance.sql dans Supabase."
          : "Envoi impossible pour l'instant.",
      },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, message: { ...data, lus: 0 } });
}

export async function DELETE(req: Request) {
  const admin = supabaseAdmin();
  const v = await profDuJeton(admin, req);
  if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: v.status });

  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ ok: false, error: "Message inconnu." }, { status: 400 });

  const { data, error } = await admin
    .from("messages_classe")
    .delete()
    .eq("id", id)
    .eq("prof_id", v.prof.id)
    .select("id");
  if (error) return NextResponse.json({ ok: false, error: "Suppression impossible." }, { status: 500 });
  if (!data?.length) return NextResponse.json({ ok: false, error: "Message introuvable." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
