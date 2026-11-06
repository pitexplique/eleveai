// L'envoi du compte rendu, déclenché le dimanche par Vercel (vercel.json, 06/11/2026).
// ⚠️ Lundi et mardi sont des filets : `dernier_compte_rendu` empêche tout double
// envoi, et ces passages reprennent ce que le dimanche n'a pas eu le temps d'envoyer.
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { adminSupabase } from "@/lib/server/abonnement";
import { lienArret } from "@/lib/server/compteRenduJeton";
import { rapportDeLEnfant } from "@/lib/server/suiviParent";
import { abonnementDisponible } from "@/lib/stripe/serveur";
import { composerCompteRendu } from "@/lib/suivi/courriel";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const CINQ_JOURS = 5 * 86400000;
const TEMPS_MAX = 50000;
const PAUSE = 600; // Resend accepte 2 envois par seconde.

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Refusé." }, { status: 401 });
  }
  if (!abonnementDisponible()) return NextResponse.json({ ouvert: false });
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY manquante." }, { status: 500 });
  }

  const debut = Date.now();
  const admin = adminSupabase();
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.NEWSLETTER_FROM || "EleveAI <contact@eleveai.fr>";

  const { data: parents, error } = await admin
    .from("abonnements")
    .select("user_id, email, dernier_compte_rendu")
    .gt("acces_jusquau", new Date().toISOString())
    .eq("compte_rendu", true)
    .not("email", "is", null);
  if (error) {
    console.error("compte rendu :", error.message);
    return NextResponse.json({ error: "Lecture impossible." }, { status: 500 });
  }

  let envoyes = 0;
  let sansEnfant = 0;
  let echecs = 0;
  let restants = 0;
  for (const p of parents ?? []) {
    if (p.dernier_compte_rendu && Date.now() - new Date(p.dernier_compte_rendu).getTime() < CINQ_JOURS) continue;
    if (Date.now() - debut > TEMPS_MAX) {
      restants += 1;
      continue;
    }
    try {
      const { data: enfants } = await admin
        .from("enfants_parent")
        .select("code_etablissement, code_utilisateur")
        .eq("parent_user_id", p.user_id)
        .order("created_at");
      if (!enfants?.length) {
        sansEnfant += 1;
        continue;
      }
      const rapports = await Promise.all(
        enfants.map((e) => rapportDeLEnfant(admin, e.code_etablissement, e.code_utilisateur)),
      );
      const arret = lienArret(p.user_id);
      const { sujet, html, texte } = composerCompteRendu(rapports, arret);
      const { error: refus } = await resend.emails.send({
        from,
        to: p.email,
        subject: sujet,
        html,
        text: texte,
        headers: { "List-Unsubscribe": `<${arret}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
      });
      if (refus) throw new Error(refus.message);
      // Marqué seulement après l'envoi : un échec sera repris au passage suivant.
      await admin
        .from("abonnements")
        .update({ dernier_compte_rendu: new Date().toISOString() })
        .eq("user_id", p.user_id);
      envoyes += 1;
      await new Promise((r) => setTimeout(r, PAUSE));
    } catch (err) {
      echecs += 1;
      console.error("compte rendu, un parent :", err);
    }
  }
  return NextResponse.json({ envoyes, sansEnfant, echecs, restants });
}
