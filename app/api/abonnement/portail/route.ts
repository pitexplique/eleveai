// Le portail Stripe : arrêter l'abonnement, changer de carte, voir les factures.
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/serveur";
import { compteDeLaRequete, lireAbonnement } from "@/lib/server/abonnement";

export async function POST(req: Request) {
  const compte = await compteDeLaRequete(req);
  if (!compte) return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  const ligne = await lireAbonnement(compte.id);
  if (!ligne?.stripe_customer_id) return NextResponse.json({ error: "Aucun abonnement." }, { status: 404 });
  const session = await stripe().billingPortal.sessions.create({
    customer: ligne.stripe_customer_id,
    return_url: `${new URL(req.url).origin}/dashboard/abonnement`,
  });
  return NextResponse.json({ url: session.url });
}
