import type { Metadata } from "next";
import QuiSuisJeClient from "./QuiSuisJeClient";

export const metadata: Metadata = {
  title: "Qui suis-je ? — Jeu de 32 cartes à imprimer, toutes matières (collège)",
  description:
    "Un jeu de 32 cartes « Qui suis-je ? » à imprimer gratuitement pour réviser 11 matières en jouant : maths, français, anglais, espagnol, histoire, géo, sciences, musique, arts. On lit la définition, l'élève retrouve le mot.",
  keywords: [
    "jeu qui suis-je à imprimer",
    "jeu de cartes à imprimer gratuit",
    "jeu de révision collège",
    "jeu éducatif à imprimer",
    "cartes de révision à imprimer",
    "réviser en jouant 6e",
    "qui suis-je collège",
    "EleveAI",
  ],
  alternates: { canonical: "/qui-suis-je-a-imprimer" },
  openGraph: {
    title: "Qui suis-je ? — Jeu de 32 cartes à imprimer, toutes matières — EleveAI",
    description:
      "32 cartes « Qui suis-je ? » à imprimer pour réviser 11 matières en jouant : on lit la définition, l'élève retrouve le mot. Avec cartes rares à collectionner.",
    url: "/qui-suis-je-a-imprimer",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function QuiSuisJeAImprimerPage() {
  return <QuiSuisJeClient />;
}
