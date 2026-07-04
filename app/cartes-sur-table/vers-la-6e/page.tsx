import type { Metadata } from "next";
import CartesSurTableClient from "./CartesSurTableClient";

export const metadata: Metadata = {
  title: "Cartes sur table — Qui suis-je ? Maths 6e (jeu à imprimer)",
  description:
    "Un jeu de 32 cartes à imprimer gratuitement pour réviser les maths de 6e en jouant : on lit la définition, l'élève retrouve le mot. 4 familles — Nombres, Géométrie, Grandeurs, Données.",
  keywords: [
    "jeu de cartes maths à imprimer",
    "qui suis-je maths",
    "réviser maths 6e en jouant",
    "cartes flash maths",
    "jeu éducatif à imprimer gratuit",
    "vocabulaire maths 6e",
    "EleveAI",
  ],
  alternates: { canonical: "/cartes-sur-table/vers-la-6e" },
  openGraph: {
    title: "Cartes sur table — Qui suis-je ? Maths 6e (jeu à imprimer) — EleveAI",
    description:
      "Un jeu de 32 cartes à imprimer pour réviser les maths de 6e en jouant : on lit la définition, l'élève retrouve le mot. 4 familles à collectionner.",
    url: "/cartes-sur-table/vers-la-6e",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CartesSurTableVersLa6ePage() {
  return <CartesSurTableClient />;
}
