// Ouvre le paiement Stripe de l'abonnement (05/11/2026 ; « EleveAI Suivi » le 19/11/2026).
// ⛔ Le prix vient du pays lu par l'hébergeur et de lib/tarifs.ts, jamais du navigateur.
import { NextResponse } from "next/server";
import { abonnementDisponible, PIED_FACTURE, stripe } from "@/lib/stripe/serveur";
import { accesEnCours, adminSupabase, compteDeLaRequete, lireAbonnement } from "@/lib/server/abonnement";
import { SUIVI, ZONES_PAIEMENT, zoneDuPays, type Formule } from "@/lib/tarifs";

export async function POST(req: Request) {
  if (!abonnementDisponible()) {
    return NextResponse.json({ error: "L'abonnement n'est pas encore ouvert." }, { status: 403 });
  }
  const compte = await compteDeLaRequete(req);
  if (!compte?.email) return NextResponse.json({ error: "Connexion requise." }, { status: 401 });

  const corps = await req.json().catch(() => ({}));
  const formule: Formule | null = corps.formule === "mensuel" || corps.formule === "annee" ? corps.formule : null;
  if (!formule) return NextResponse.json({ error: "Formule inconnue." }, { status: 400 });
  if (corps.cgv !== true || corps.pasEleve !== true) {
    return NextResponse.json({ error: "Merci de cocher les deux cases." }, { status: 400 });
  }

  const ligne = await lireAbonnement(compte.id);
  if (accesEnCours(ligne)) {
    return NextResponse.json({ error: "Ce compte a déjà un abonnement en cours." }, { status: 409 });
  }

  const zone = zoneDuPays(req.headers.get("x-vercel-ip-country"));
  const prix = ZONES_PAIEMENT[zone];
  const s = stripe();

  // Le client Stripe porte le pied de facture (identité EI, mention de TVA).
  let clientId = ligne?.stripe_customer_id ?? null;
  if (!clientId) {
    const client = await s.customers.create({
      email: compte.email,
      metadata: { user_id: compte.id },
      invoice_settings: { footer: PIED_FACTURE },
    });
    clientId = client.id;
    const { error } = await adminSupabase().from("abonnements").upsert({
      user_id: compte.id,
      email: compte.email,
      stripe_customer_id: clientId,
      zone,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      console.error("abonnements (écriture du client) :", error.message);
      return NextResponse.json({ error: "Le paiement n'a pas pu s'ouvrir." }, { status: 500 });
    }
  }

  const origine = new URL(req.url).origin;
  const metadata = { type: "abonnement", user_id: compte.id, formule, zone };
  const message =
    "En validant, vous commandez avec obligation de paiement. Vous avez 14 jours pour changer d'avis : tout vous est remboursé, sans motif.";

  // ⭐ 19/11/2026 : un produit « EleveAI Suivi », deux tarifs d'abonnement
  // (suivi_monthly, suivi_yearly), créés par scripts/stripe-test-produit-suivi.mjs.
  // Hors zone europe, ou si les tarifs n'existent pas encore, le montant vient de
  // ZONES_PAIEMENT (lib/tarifs.ts). ⛔ Pas d'automatic_tax (franchise, art. 293 B).
  const intervalle = formule === "mensuel" ? ("month" as const) : ("year" as const);
  const lookup = formule === "mensuel" ? SUIVI.lookupMensuel : SUIVI.lookupAnnuel;
  let tarifId: string | null = null;
  if (zone === "europe") {
    const { data } = await s.prices.list({ lookup_keys: [lookup], active: true, limit: 1 }).catch(() => ({ data: [] }));
    tarifId = data[0]?.id ?? null;
  }
  const ligneCommande = tarifId
    ? { quantity: 1, price: tarifId }
    : {
        quantity: 1,
        price_data: {
          currency: prix.devise,
          unit_amount: formule === "mensuel" ? prix.mensuel : prix.annee,
          recurring: { interval: intervalle },
          product_data: { name: formule === "mensuel" ? `${SUIVI.nom}, au mois` : `${SUIVI.nom}, à l'année` },
        },
      };

  const session = await s.checkout.sessions.create({
    customer: clientId,
    locale: "fr",
    metadata,
    // Le compte qui paie est celui du PARENT (connecté par courriel) : jamais l'élève.
    client_reference_id: compte.id,
    success_url: `${origine}/abonnement/merci`,
    cancel_url: `${origine}/abonnement`,
    custom_text: { submit: { message } },
    mode: "subscription",
    allow_promotion_codes: true,
    line_items: [ligneCommande],
    subscription_data: {
      metadata,
      ...(SUIVI.essaiJours > 0 && formule === "mensuel" ? { trial_period_days: SUIVI.essaiJours } : {}),
    },
  });

  return NextResponse.json({ url: session.url });
}
