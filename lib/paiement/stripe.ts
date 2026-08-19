// LE PONT ENTRE LE DROIT ET LA CAISSE.
//
// ⛔ FICHIER SERVEUR. Il lit `STRIPE_SECRET_KEY`, qui ne porte pas le préfixe
// `NEXT_PUBLIC_` : Next remplace les variables publiques dans le bundle du
// navigateur et laisse les autres à `undefined`, donc la valeur ne fuite pas —
// mais ce module n'a rien à faire dans un composant client pour autant. Ne
// l'importe QUE depuis une route d'API, une action serveur ou un composant
// serveur. Le site a déjà vu des secrets partir dans un bundle client ; la
// règle n'est pas théorique.
//
// ⭐ POURQUOI CE FICHIER EXISTE AVANT LE MOINDRE APPEL À STRIPE. Le SDK n'est
// pas encore installé et aucune clé n'existe : brancher Stripe, c'est l'affaire
// de demain matin. Ce qui se prépare aujourd'hui, c'est la seule chose qu'on
// ne pense jamais à écrire dans l'urgence d'un branchement — le REFUS.
//
// Une clé `sk_live_` collée dans un `.env` suffit à encaisser. Rien, dans
// Stripe, ne vérifiera que les CGV sont en vigueur, qu'un médiateur de la
// consommation a été souscrit, ou que la date d'entrée en vigueur est
// renseignée. Ce fichier le vérifie, et c'est son unique raison d'être :
// le jour du branchement, on est pressé et content, et c'est exactement le
// moment où l'on saute une case à 15 000 €.

import { VENTE, cgvEnVigueur, piecesManquantes } from "@/lib/legal/editeur";

/** Ce que Stripe attend dans l'environnement. Les noms sont figés ici pour
    qu'il n'y ait, demain, qu'à coller des valeurs. */
export const VARIABLES_ATTENDUES = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
] as const;

/* Stripe distingue ses deux mondes par le PRÉFIXE de la clé, pas par un
   réglage : `sk_test_…` ne déplace pas un centime, `sk_live_…` si. C'est donc
   le préfixe qui fait autorité ici — jamais une variable « MODE » qu'on
   oublierait de changer. */
export type ModeStripe = "absent" | "test" | "live";

export function modeStripe(): ModeStripe {
  const cle = process.env.STRIPE_SECRET_KEY;
  if (!cle) return "absent";
  if (cle.startsWith("sk_live_") || cle.startsWith("rk_live_")) return "live";
  return "test";
}

/** Vrai dès qu'il y a de quoi appeler Stripe, en test comme en réel. */
export function stripeConfigure(): boolean {
  return modeStripe() !== "absent";
}

/* CE QUI INTERDIT D'ENCAISSER POUR DE VRAI.
   ⚠️ Aucune de ces raisons n'est technique : ce sont des obligations légales,
   et elles ne produisent aucune erreur visible tant qu'on ne les regarde pas.
   La sanction arrive des mois plus tard, par courrier. */
export function raisonsDeRefusEncaissementReel(): string[] {
  const raisons: string[] = [];

  if (!VENTE.ouverte)
    raisons.push(
      "la vente n'est pas déclarée ouverte (VENTE.ouverte est à false)"
    );

  if (!cgvEnVigueur) {
    const manque = piecesManquantes();
    raisons.push(
      manque.length
        ? `les CGV ne sont pas en vigueur — il manque ${manque.join(", ")}`
        : "les CGV ne sont pas en vigueur"
    );
  }

  return raisons;
}

/* LE VERROU.
   Une clé `sk_live_` ne suffit pas : il faut aussi que le site ait le droit de
   vendre. Toute route qui crée une session de paiement, un lien de paiement ou
   un abonnement doit passer par ici AVANT d'appeler Stripe. */
export function encaissementReelAutorise(): boolean {
  return modeStripe() === "live" && raisonsDeRefusEncaissementReel().length === 0;
}

/* À appeler en tête de toute route qui encaisse. Elle lève plutôt qu'elle ne
   renvoie un booléen : un paiement qu'on laisse passer « par défaut » est le
   genre d'erreur qui ne se voit qu'au relevé bancaire. En mode test, elle
   laisse tout passer — c'est le but du mode test. */
export function exigerDroitDEncaisser(): void {
  const mode = modeStripe();

  if (mode === "absent")
    throw new Error(
      "Stripe n'est pas configuré : STRIPE_SECRET_KEY est absente de l'environnement."
    );

  if (mode === "test") return;

  const raisons = raisonsDeRefusEncaissementReel();
  if (raisons.length)
    throw new Error(
      `Encaissement réel refusé — ${raisons.join(" ; ")}. ` +
        "Voir lib/legal/editeur.ts : c'est une obligation légale, pas un réglage technique."
    );
}

/* Un état lisible, pour une page d'administration ou un journal de démarrage.
   ⛔ Ne renvoie JAMAIS la clé, ni même sa fin : un extrait de secret dans un
   log est un secret dans un log. */
export function etatPaiement() {
  const mode = modeStripe();
  return {
    mode,
    reel: encaissementReelAutorise(),
    refus: mode === "live" ? raisonsDeRefusEncaissementReel() : [],
    variablesManquantes: VARIABLES_ATTENDUES.filter((v) => !process.env[v]),
  };
}
