import type { Metadata } from "next";
import PictoMathsClient from "./PictoMathsClient";

export const metadata: Metadata = {
  title: "Picto Maths · 974 — défis « 1 image, 1 question » à imprimer",
  description:
    "Un livret de défis maths à imprimer gratuitement, dans l'esprit « Maths réels 974 » : une image, une question, une notion. Marché, volcan, canne à sucre, Grand Raid… les maths de La Réunion, du CM2 à la 3e. Corrigés inclus.",
  keywords: [
    "picto maths",
    "défis maths à imprimer",
    "maths La Réunion",
    "maths en vrai 974",
    "problèmes maths images",
    "proportionnalité collège à imprimer",
    "EleveAI",
  ],
  alternates: { canonical: "/picto-maths" },
  openGraph: {
    title: "Picto Maths · 974 — défis « 1 image, 1 question » à imprimer",
    description:
      "Une image, une question, une notion. Les maths de La Réunion à imprimer et à chercher sur l'ardoise, du CM2 à la 3e. Corrigés inclus.",
    url: "/picto-maths",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function PictoMathsPage() {
  return <PictoMathsClient />;
}
