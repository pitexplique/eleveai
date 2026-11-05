// Stripe côté serveur (05/11/2026). ⛔ Jamais importé dans un composant client.
//
// LE VERROU : une clé réelle (sk_live) n'encaisse que si la vente ou les dons
// sont ouverts dans lib/legal/editeur.ts. Une clé de test (sk_test) marche
// toujours : elle ne déplace aucun argent, et c'est ainsi qu'on essaie le tunnel
// avant l'ouverture.
import Stripe from "stripe";
import { cgvEnVigueur, DONS, EDITEUR, VENDEUR, identiteProfessionnelleComplete } from "@/lib/legal/editeur";

const cle = () => process.env.STRIPE_SECRET_KEY ?? "";
const modeTest = () => cle().startsWith("sk_test_");

export function stripe(): Stripe {
  if (!cle()) throw new Error("STRIPE_SECRET_KEY manquante");
  return new Stripe(cle());
}

/** L'abonnement peut-il être encaissé ? `cgvEnVigueur` exige aussi le médiateur. */
export const abonnementDisponible = () => Boolean(cle()) && (modeTest() || cgvEnVigueur);

/** Le don n'est pas une vente : il exige l'identité publiée, pas le médiateur. */
export const donDisponible = () =>
  Boolean(cle()) && (modeTest() || (DONS.ouverts && identiteProfessionnelleComplete));

/** Le pied des factures : identité de l'entrepreneur individuel et mention de TVA. */
export const PIED_FACTURE = [
  VENDEUR.denominationEI,
  `SIRET ${VENDEUR.siret || VENDEUR.siren}`,
  VENDEUR.adresse,
  EDITEUR.contact,
  VENDEUR.mentionTva,
].join(" · ");
