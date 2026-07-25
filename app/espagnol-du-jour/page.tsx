import type { Metadata } from "next";
import EspagnolDuJourClient from "./EspagnolDuJourClient";

export const metadata: Metadata = {
  title: "L'espagnol du jour — 5 mots par jour, avec le son (A1 → B2)",
  description:
    "Ton rituel d'espagnol : 5 mots par jour, avec le son, du niveau A1 au B2. Tu découvres, tu reconnais, puis tu revois chaque mot à J+1, J+3, J+7 (la répétition espacée). Choisis ton niveau, garde ta série, installe-le sur ton téléphone — gratuit, sans publicité. Puis fais-en une phrase avec le coach.",
  keywords: [
    "l'espagnol du jour",
    "vocabulaire espagnol",
    "5 mots d'espagnol par jour",
    "apprendre l'espagnol A1 A2 B1 B2",
    "application langue gratuite",
    "répétition espacée",
    "espagnol collège lycée",
    "La Réunion",
    "eleveai",
  ],
  alternates: { canonical: "/espagnol-du-jour" },
  openGraph: {
    title: "L'espagnol du jour — 5 mots par jour, avec le son (A1 → B2)",
    description:
      "Cinq mots d'espagnol par jour, avec le son, du A1 au B2. Découvre, reconnais, et revois-les au bon moment pour ne plus les oublier. Gratuit, sans pub, installable.",
    url: "/espagnol-du-jour",
    siteName: "EleveAI",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <EspagnolDuJourClient />;
}
