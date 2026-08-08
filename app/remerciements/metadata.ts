// app/remerciements/metadata.ts

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remerciements — EleveAI",
  description:
    "EleveAI remercie les élèves testeurs qui ont contribué à améliorer la plateforme grâce à leurs retours, leurs idées et leurs essais.",

  alternates: {
    canonical: "https://www.eleveai.fr/remerciements",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    url: "https://www.eleveai.fr/remerciements",
    title: "Remerciements — EleveAI",
    description:
      "Merci aux élèves testeurs qui aident EleveAI à progresser par leurs retours, leurs idées et leurs essais.",
    siteName: "EleveAI",
    images: [
      {
        url: "https://www.eleveai.fr/images/accueil-eleveai-reunion.png",
        width: 1200,
        height: 630,
        alt: "EleveAI — Remerciements aux élèves testeurs",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Remerciements — EleveAI",
    description:
      "Merci aux élèves testeurs qui aident EleveAI à progresser.",
    images: ["https://www.eleveai.fr/images/accueil-eleveai-reunion.png"],
  },
};