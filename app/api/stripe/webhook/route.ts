// Le seul endroit qui ouvre ou ferme un accès. Stripe y envoie ses messages signés :
// ⛔ sans signature valide, on ne croit rien.
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/serveur";
import { traiterEvenement } from "@/lib/stripe/webhook";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!secret || !signature) return NextResponse.json({ error: "Signature absente." }, { status: 400 });

  const corps = await req.text(); // Le texte brut : la signature porte dessus.
  let evenement;
  try {
    evenement = await stripe().webhooks.constructEventAsync(corps, signature, secret);
  } catch {
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }
  try {
    await traiterEvenement(evenement);
  } catch (err) {
    console.error("webhook Stripe :", evenement.type, err);
    return NextResponse.json({ error: "À renvoyer." }, { status: 500 });
  }
  return NextResponse.json({ recu: true });
}
