import type { Metadata } from "next";
import CarteClient from "./CarteClient";

export const metadata: Metadata = {
  title: "La carte des savoirs · 974 — La Réunion point par point | EleveAI",
  description:
    "Une carte interactive de La Réunion : clique sur un lieu (volcan, marché, lagon, cirques…) et découvre les maths, l'écologie ou l'histoire qui se cachent derrière. Le tour de l'île, discipline par discipline.",
  keywords: [
    "carte La Réunion maths",
    "maths La Réunion interactive",
    "carte des savoirs 974",
    "maths écologie histoire Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/carte" },
  openGraph: {
    title: "La carte des savoirs · 974 — La Réunion point par point",
    description:
      "Clique sur un lieu de La Réunion et découvre les maths, l'écologie ou l'histoire qui s'y cachent.",
    url: "/carte",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CartePage() {
  return <CarteClient />;
}
