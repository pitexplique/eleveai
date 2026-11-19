// « VOIR MON VRAI SUIVI » (19/11/2026) : l'élève fait partir vers son parent un
// courriel avec son bilan de la semaine, le code qui relie les deux comptes et
// le lien d'abonnement. L'élève ne paie jamais, et ne voit aucun prix.
// ⛔ Seulement un compte courriel (INDEPENDANT), jamais un élève de classe.
// ⛔ L'adresse du parent n'est PAS enregistrée : elle sert à cet envoi, c'est tout.
// ⛔ 3 envois par jour et par élève au plus : on n'en fait pas un outil à spam.
import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { adminSupabase } from "@/lib/server/abonnement";
import { clientIp, rateLimitOk } from "@/lib/server/rateLimit";
import { verifySessionToken } from "@/lib/server/session";
import { peutEtreRelie, rapportDeLEnfant } from "@/lib/server/suiviParent";
import { abonnementDisponible } from "@/lib/stripe/serveur";
import { composerDemandeDuSuivi } from "@/lib/suivi/courriel";

export const dynamic = "force-dynamic";

// Mêmes règles que /api/suivi/code : sans 0/O ni 1/I/L, valable 7 jours.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const DUREE_JOURS = 7;
const COURRIEL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  const jeton = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  const s = verifySessionToken(jeton);
  if (!s) return NextResponse.json({ error: "Session expirée. Reconnecte-toi." }, { status: 401 });
  if (!abonnementDisponible() || !peutEtreRelie(s.code_etablissement)) {
    return NextResponse.json({ error: "Pas encore disponible pour ce compte." }, { status: 403 });
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "L'envoi de courriels n'est pas réglé." }, { status: 500 });
  }

  const corps = await req.json().catch(() => ({}));
  const courrielParent = String(corps.courrielParent ?? "").trim().toLowerCase().slice(0, 200);
  if (!COURRIEL.test(courrielParent)) {
    return NextResponse.json({ error: "Cette adresse n'a pas l'air juste." }, { status: 400 });
  }

  const admin = adminSupabase();
  if (!(await rateLimitOk(admin, `suivi-debloquer:${s.code_utilisateur}`, 3, 86400))) {
    return NextResponse.json({ error: "Tu as déjà envoyé 3 messages aujourd'hui. Réessaie demain." }, { status: 429 });
  }
  if (!(await rateLimitOk(admin, `suivi-debloquer-ip:${clientIp(req)}`, 30, 86400))) {
    return NextResponse.json({ error: "Trop d'envois depuis cet endroit aujourd'hui." }, { status: 429 });
  }

  // Le code parent : on reprend celui qui court encore, sinon on en crée un.
  const { data: existant } = await admin
    .from("codes_parent")
    .select("code, expire_le")
    .eq("code_etablissement", s.code_etablissement)
    .eq("code_utilisateur", s.code_utilisateur)
    .gt("expire_le", new Date().toISOString())
    .maybeSingle();
  let code = existant?.code as string | undefined;
  let expire = existant?.expire_le ? new Date(existant.expire_le as string) : null;
  if (!code || !expire) {
    code = Array.from({ length: 8 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
    expire = new Date(Date.now() + DUREE_JOURS * 86400000);
    const { error } = await admin.from("codes_parent").upsert(
      { code, code_etablissement: s.code_etablissement, code_utilisateur: s.code_utilisateur, expire_le: expire.toISOString() },
      { onConflict: "code_etablissement,code_utilisateur" },
    );
    if (error) {
      console.error("codes_parent :", error.message);
      return NextResponse.json({ error: "Le message n'a pas pu partir." }, { status: 500 });
    }
  }

  const rapport = await rapportDeLEnfant(admin, s.code_etablissement, s.code_utilisateur);
  const { sujet, html, texte } = composerDemandeDuSuivi(rapport, code, expire);
  try {
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: process.env.NEWSLETTER_FROM || "EleveAI <contact@eleveai.fr>",
      to: courrielParent,
      subject: sujet,
      html,
      text: texte,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("suivi/debloquer :", err);
    return NextResponse.json({ error: "Le message n'a pas pu partir." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
