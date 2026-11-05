// Le bouton de soutien (05/11/2026) : un don sans compte, sans contrepartie.
// ⚠️ Une page de paiement anonyme attire le test de cartes volées : d'où la borne
// basse et la limite par adresse IP.
import { NextResponse } from "next/server";
import { donDisponible, stripe } from "@/lib/stripe/serveur";
import { adminSupabase } from "@/lib/server/abonnement";
import { clientIp, rateLimitOk } from "@/lib/server/rateLimit";
import { DON_MAX, DON_MIN } from "@/lib/tarifs";

export async function POST(req: Request) {
  if (!donDisponible()) {
    return NextResponse.json({ error: "Les dons ne sont pas encore ouverts." }, { status: 403 });
  }
  const corps = await req.json().catch(() => ({}));
  const euros = Number(corps.montant);
  if (!Number.isInteger(euros) || euros < DON_MIN || euros > DON_MAX) {
    return NextResponse.json({ error: `Choisissez un montant entier de ${DON_MIN} à ${DON_MAX} €.` }, { status: 400 });
  }
  if (corps.pasEleve !== true) {
    return NextResponse.json({ error: "Merci de cocher la case." }, { status: 400 });
  }
  if (!(await rateLimitOk(adminSupabase(), `don:ip:${clientIp(req)}`, 5, 600))) {
    return NextResponse.json({ error: "Trop d'essais : réessayez dans quelques minutes." }, { status: 429 });
  }

  const origine = new URL(req.url).origin;
  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    submit_type: "donate",
    locale: "fr",
    metadata: { type: "don" },
    payment_intent_data: { description: "Soutien à EleveAI, sans contrepartie", metadata: { type: "don" } },
    success_url: `${origine}/soutenir?merci=1`,
    cancel_url: `${origine}/soutenir`,
    custom_text: { submit: { message: "Un don sans contrepartie, sans reçu fiscal. Merci !" } },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: euros * 100,
          product_data: { name: "Soutien à EleveAI" },
        },
      },
    ],
  });
  return NextResponse.json({ url: session.url });
}
