// Crée (ou retrouve) le produit « EleveAI Suivi » et ses deux tarifs dans Stripe
// — ⛔ MODE TEST SEULEMENT (19/11/2026). Le script refuse toute clé sk_live.
//
// Usage (PowerShell) :
//   $env:STRIPE_SECRET_KEY = "sk_test_..." ; node scripts/stripe-test-produit-suivi.mjs
// ⛔ Ne jamais écrire la clé dans un fichier du dépôt.
//
// Les montants recopient lib/tarifs.ts (SUIVI, ZONES_PAIEMENT.europe) : le script
// est en .mjs pour tourner sans compilation ; s'ils changent là-bas, les changer ici.
// Les tarifs Stripe ne se modifient pas : un nouveau montant crée un nouveau tarif,
// et `transfer_lookup_key` lui donne la clé (suivi_monthly / suivi_yearly).
import Stripe from "stripe";

const NOM = "EleveAI Suivi";
// 19/11/2026 : prix normal 7,95 € / 79 €, prix de lancement (et Ulule) 4,95 € / 49 €.
const TARIFS = [
  { lookup: "suivi_monthly", montant: 795, intervalle: "month", nom: "EleveAI Suivi, au mois" },
  { lookup: "suivi_yearly", montant: 7900, intervalle: "year", nom: "EleveAI Suivi, à l'année (2 mois offerts)" },
  { lookup: "suivi_monthly_launch", montant: 495, intervalle: "month", nom: "EleveAI Suivi, au mois, prix de lancement" },
  { lookup: "suivi_yearly_launch", montant: 4900, intervalle: "year", nom: "EleveAI Suivi, à l'année, prix de lancement" },
];

const cle = process.env.STRIPE_SECRET_KEY ?? "";
if (!cle.startsWith("sk_test_")) {
  console.error("⛔ Clé absente ou pas en mode test (sk_test_…). Rien n'est fait.");
  process.exit(1);
}
const stripe = new Stripe(cle);

const existants = await stripe.products.search({ query: `metadata['eleveai']:'suivi'` });
let produit = existants.data[0];
if (!produit) {
  produit = await stripe.products.create({
    name: NOM,
    description: "Le suivi de votre enfant sur EleveAI : tableau de bord complet, historique, conseils, espace parent et bilan par courriel (3 enfants au plus).",
    metadata: { eleveai: "suivi" },
  });
  console.log("Produit créé :", produit.id);
} else {
  console.log("Produit déjà là :", produit.id);
}

for (const t of TARIFS) {
  const { data } = await stripe.prices.list({ lookup_keys: [t.lookup], active: true, limit: 1 });
  const p = data[0];
  if (p && p.unit_amount === t.montant && p.recurring?.interval === t.intervalle && p.product === produit.id) {
    console.log(`${t.lookup} déjà juste :`, p.id);
    continue;
  }
  const nouveau = await stripe.prices.create({
    product: produit.id,
    currency: "eur",
    unit_amount: t.montant,
    recurring: { interval: t.intervalle },
    nickname: t.nom,
    lookup_key: t.lookup,
    transfer_lookup_key: true,
    tax_behavior: "unspecified", // ⛔ franchise de TVA (art. 293 B) : pas de taxe automatique.
  });
  console.log(`${t.lookup} créé :`, nouveau.id);
}
console.log("Fini. Vérifier dans le tableau de bord Stripe (mode test) : Produits → EleveAI Suivi.");
