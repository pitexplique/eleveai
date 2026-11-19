// /abonnement — choisir sa formule et payer (05/11/2026). noindex : on y arrive depuis /tarifs.
import type { Metadata } from "next";
import { headers } from "next/headers";
import { abonnementDisponible } from "@/lib/stripe/serveur";
import { PRIX_LANCEMENT, montant, prixDeLancementEnCours, prixZone, zoneDuPays } from "@/lib/tarifs";
import ChoixAbonnement from "./ChoixAbonnement";

export const metadata: Metadata = { title: "S'abonner", robots: { index: false, follow: false } };

export default async function Page() {
  const zone = zoneDuPays((await headers()).get("x-vercel-ip-country"));
  // 19/11/2026 : en France, le prix de lancement (4,95 € / 49 €) tant qu'il court.
  const lancement = zone === "europe" && prixDeLancementEnCours();
  return (
    <ChoixAbonnement
      ouvert={abonnementDisponible()}
      mensuel={lancement ? montant(PRIX_LANCEMENT.mensuel) : prixZone(zone, "mensuel")}
      annee={lancement ? montant(PRIX_LANCEMENT.annuel) : prixZone(zone, "annee")}
      normal={lancement ? { mensuel: prixZone(zone, "mensuel"), annee: prixZone(zone, "annee") } : null}
    />
  );
}
