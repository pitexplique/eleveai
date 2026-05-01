// app/page.tsx
import type { Metadata } from "next";
import AccueilClient from "./AccueilClient";

export const metadata: Metadata = {
  title: "EleveAI • Leçon du jour 📘",
  description:
    "📘 Une leçon de maths par jour. Installe EleveAI sur ton téléphone et progresse en 5 minutes par jour. Accès rapide, entraînement efficace, progression garantie.",
  keywords: [
    "maths collège",
    "leçon du jour",
    "révision maths",
    "application maths",
    "eleveai",
    "entraînement quotidien",
  ],
  openGraph: {
    title: "EleveAI • 1 leçon par jour",
    description:
      "Progresse en maths avec une leçon par jour. Installe EleveAI comme une app sur ton téléphone 📱",
    url: "https://eleveai.fr",
    siteName: "EleveAI",
    images: [
      {
        url: "/images/accueil-eleveai-reunion.png",
        width: 1200,
        height: 630,
        alt: "EleveAI - Maths Réunion",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <AccueilClient />;
}

