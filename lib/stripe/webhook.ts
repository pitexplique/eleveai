// Ce que chaque message de Stripe change dans la table `abonnements` (05/11/2026).
// ⭐ L'accès n'est ouvert QUE par ces messages signés, jamais par la page de retour.
import type Stripe from "stripe";
import { adminSupabase } from "@/lib/server/abonnement";
import { finAnneeScolaire } from "@/lib/tarifs";
import { stripe } from "./serveur";

const idDe = (x: string | { id: string } | null | undefined) => (typeof x === "string" ? x : x?.id ?? null);
const isoDepuis = (secondes: number | null | undefined) =>
  secondes ? new Date(secondes * 1000).toISOString() : null;

async function ecrire(clientId: string, champs: Record<string, unknown>) {
  const { error } = await adminSupabase()
    .from("abonnements")
    .update({ ...champs, updated_at: new Date().toISOString() })
    .eq("stripe_customer_id", clientId);
  // Une erreur fait répondre 500 : Stripe renverra le message.
  if (error) throw new Error(`abonnements : ${error.message}`);
}

/** L'état vient toujours de Stripe relu à l'instant : l'ordre des messages n'importe plus. */
async function synchroniser(abonnementId: string) {
  const a = await stripe().subscriptions.retrieve(abonnementId);
  const clientId = idDe(a.customer);
  if (!clientId) return;
  const finPeriode = a.items.data[0]?.current_period_end ?? null;
  const vivant = ["active", "trialing", "past_due"].includes(a.status);
  await ecrire(clientId, {
    stripe_subscription_id: a.id,
    formule: "mensuel",
    statut: a.status,
    fin_programmee: a.cancel_at_period_end,
    acces_jusquau: vivant
      ? isoDepuis(finPeriode)
      : a.status === "canceled"
        ? isoDepuis(a.ended_at ?? a.canceled_at)
        : new Date().toISOString(),
  });
}

export async function traiterEvenement(e: Stripe.Event) {
  switch (e.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const s = e.data.object;
      if (s.metadata?.type !== "abonnement" || s.payment_status === "unpaid") return;
      const clientId = idDe(s.customer);
      if (!clientId) return;
      if (s.mode === "subscription") {
        const a = idDe(s.subscription);
        if (a) await synchroniser(a);
      } else {
        await ecrire(clientId, {
          formule: "annee",
          statut: "actif",
          fin_programmee: true,
          acces_jusquau: finAnneeScolaire(new Date(e.created * 1000)).toISOString(),
        });
      }
      return;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await synchroniser(e.data.object.id);
      return;
    case "charge.refunded": {
      // Remboursement complet (les 14 jours des CGV) : l'accès s'arrête, et le
      // prélèvement mensuel aussi. Un don n'a pas de client : rien à faire.
      const c = e.data.object;
      const clientId = idDe(c.customer);
      if (!clientId || !c.refunded) return;
      const { data } = await adminSupabase()
        .from("abonnements")
        .select("stripe_subscription_id, formule")
        .eq("stripe_customer_id", clientId)
        .maybeSingle();
      if (!data) return;
      if (data.formule === "mensuel" && data.stripe_subscription_id) {
        await stripe().subscriptions.cancel(data.stripe_subscription_id).catch(() => null);
      }
      await ecrire(clientId, { statut: "rembourse", fin_programmee: false, acces_jusquau: new Date().toISOString() });
      return;
    }
  }
}
