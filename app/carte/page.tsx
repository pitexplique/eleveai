import type { Metadata } from "next";
import CarteClient from "./CarteClient";

export const metadata: Metadata = {
  title: "La chasse aux trésors des savoirs · 974 — La Réunion | EleveAI",
  description:
    "Une chasse au trésor sur la carte de La Réunion : clique sur un lieu (volcan, marché, lagon, cirques…), résous l'énigme et déniche les trésors — maths, écologie, histoire. Explore l'île, discipline par discipline.",
  keywords: [
    "chasse au trésor La Réunion",
    "jeu maths La Réunion",
    "maths écologie histoire Réunion",
    "carte interactive La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/carte" },
  openGraph: {
    title: "La chasse aux trésors des savoirs · 974 — La Réunion",
    description:
      "Clique sur un lieu de La Réunion, résous l'énigme et déniche les trésors : maths, écologie, histoire.",
    url: "/carte",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CartePage() {
  return <CarteClient />;
}
