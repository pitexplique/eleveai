import type { Metadata } from "next";
import AnglaisDuJourClient from "./AnglaisDuJourClient";

export const metadata: Metadata = {
  title: "L'anglais du jour — 5 mots par jour, avec le son (A1 → B2)",
  description:
    "Ton rituel d'anglais : 5 mots par jour, avec le son, du niveau A1 au B2. Tu découvres, tu reconnais, puis tu revois chaque mot à J+1, J+3, J+7 (la répétition espacée). Choisis ton niveau, garde ta série, installe-le sur ton téléphone — gratuit, sans publicité. Puis fais-en une phrase avec le coach.",
  keywords: [
    "l'anglais du jour",
    "vocabulaire anglais",
    "5 mots d'anglais par jour",
    "apprendre l'anglais A1 A2 B1 B2",
    "application langue gratuite",
    "répétition espacée",
    "anglais collège lycée",
    "La Réunion",
    "eleveai",
  ],
  alternates: { canonical: "/anglais-du-jour" },
  openGraph: {
    title: "L'anglais du jour — 5 mots par jour, avec le son (A1 → B2)",
    description:
      "Cinq mots d'anglais par jour, avec le son, du A1 au B2. Découvre, reconnais, et revois-les au bon moment pour ne plus les oublier. Gratuit, sans pub, installable.",
    url: "/anglais-du-jour",
    siteName: "EleveAI",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <AnglaisDuJourClient />;
}
