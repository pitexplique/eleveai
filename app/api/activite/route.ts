// Un geste d'élève pendant le cours : une réponse au coach, une vidéo lancée
// ou finie. Lu par la page « En direct » du prof (/prof/classes/direct).
// Seuls les élèves connectés à un établissement laissent une trace : un compte
// e-mail INDEPENDANT ou un visiteur reçoit { ok: true } et rien n'est écrit.
// Le pourquoi et la durée de vie (30 jours) : supabase/activite_eleve.sql.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ETABLISSEMENT_INDEPENDANT, verifySessionToken } from "@/lib/server/session";
import { rateLimitOk } from "@/lib/server/rateLimit";
import { trouverVideo } from "@/lib/videos/r2";

export const dynamic = "force-dynamic";

const TYPES = new Set(["coach", "video_debut", "video_fin"]);

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  // Le jeton voyage dans le corps : sendBeacon ne sait pas poser d'en-tête.
  const session = verifySessionToken(String(body.token ?? ""));
  const type = String(body.type ?? "");
  if (
    !session ||
    session.type_utilisateur !== "eleve" ||
    session.code_etablissement === ETABLISSEMENT_INDEPENDANT ||
    !TYPES.has(type)
  ) {
    return NextResponse.json({ ok: true });
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  if (!(await rateLimitOk(admin, `activite:${session.code_etablissement}:${session.code_utilisateur}`, 120, 60))) {
    return NextResponse.json({ ok: true });
  }

  const ressource = String(body.ressource ?? "").slice(0, 120) || null;
  const libelle =
    type === "coach"
      ? String(body.libelle ?? "").slice(0, 160) || null
      : (ressource && trouverVideo(ressource)?.titre) || ressource;

  await admin.from("activite_eleve").insert({
    code_etablissement: session.code_etablissement,
    code_utilisateur: session.code_utilisateur,
    type,
    ressource,
    libelle,
    juste: type === "coach" ? Boolean(body.juste) : null,
  });

  // Purge des 30 jours, une requête sur cent : pas de tâche planifiée à tenir.
  if (Math.random() < 0.01) {
    await admin
      .from("activite_eleve")
      .delete()
      .lt("created_at", new Date(Date.now() - 30 * 86_400_000).toISOString());
  }

  return NextResponse.json({ ok: true });
}
