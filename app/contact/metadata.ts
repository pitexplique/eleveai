// app/contact/metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — EleveAI",
  description:
    "Contactez EleveAI (parents, enseignants, établissements, partenaires) : questions, retours, signalements, expérimentation ou collaboration.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — EleveAI",
    description:
      "Contactez EleveAI : questions, retours, signalements, expérimentation ou collaboration.",
    url: "https://eleveai.fr/contact",
    siteName: "EleveAI",
    type: "website",
  },
  robots: { index: true, follow: true },
};
