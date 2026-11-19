// /abonnement — choisir sa formule et payer (05/11/2026). noindex : on y arrive depuis /tarifs.
import type { Metadata } from "next";
import { headers } from "next/headers";
import { abonnementDisponible } from "@/lib/stripe/serveur";
import { prixZone, zoneDuPays } from "@/lib/tarifs";
import ChoixAbonnement from "./ChoixAbonnement";

export const metadata: Metadata = { title: "S'abonner", robots: { index: false, follow: false } };

export default async function Page() {
  const zone = zoneDuPays((await headers()).get("x-vercel-ip-country"));
  return (
    <ChoixAbonnement
      ouvert={abonnementDisponible()}
      mensuel={prixZone(zone, "mensuel")}
      annee={prixZone(zone, "annee")}
    />
  );
}
