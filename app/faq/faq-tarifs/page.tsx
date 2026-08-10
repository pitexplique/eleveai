import type { Metadata } from "next";
import FAQTarifs from "./FAQTarifs";

export const metadata: Metadata = {
  title: "FAQ Tarifs",
  description:
    "Questions fréquentes sur les tarifs EleveAI : essais gratuits, abonnement, historique complet, paiement Stripe et résiliation.",
  alternates: { canonical: "/faq/faq-tarifs" },
  openGraph: {
    title: "FAQ Tarifs – EleveAI",
    description:
      "Essais gratuits, abonnement, historique complet, Stripe, résiliation : tout est expliqué simplement.",
    url: "/faq/faq-tarifs",
    siteName: "EleveAI",
    type: "website",
  },
};

export default function Page() {
  return <FAQTarifs />;
}
