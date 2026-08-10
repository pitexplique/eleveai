// « Le corail du lagon » — article-machine du journal (rubrique « Un peu de
// maths »). Un sous-marin filme un corail et mesure ses dimensions en tournant
// autour : chaque image est une projection, la plus grande largeur donne la
// vraie longueur. Le geste de Hong Wang (conjecture de Kakeya) dans le lagon.

import type { Metadata } from "next";
import CorailDuLagonClient from "./CorailDuLagonClient";

export const metadata: Metadata = {
  title: "Le corail du lagon — mesurer un corail sans le toucher",
  description:
    "Un sous-marin filme un corail du lagon et mesure ses dimensions en tournant autour : chaque image est une projection (w(φ) = 2·√(A²·sin²(θ−φ) + B²·cos²(θ−φ))). Une seule photo est ambiguë ; la plus grande largeur filmée donne la vraie longueur, la plus petite la largeur. Le geste « projeter dans toutes les directions » au cœur de la conjecture de Kakeya, démontrée par Hong Wang. Avec les défis du CP à la Terminale.",
  keywords: [
    "projection",
    "conjecture de Kakeya",
    "Hong Wang",
    "tomographie",
    "corail",
    "lagon La Réunion",
    "mesurer sans toucher",
    "sinus cosinus",
    "maths 974",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "Le corail du lagon — mesurer sans toucher, en tournant autour",
    description:
      "Une seule photo est ambiguë ; en filmant sous tous les angles, la plus grande « ombre » donne la vraie taille. Le geste de Hong Wang (Kakeya), dans le lagon de La Réunion.",
    url: "https://www.eleveai.fr/corail-du-lagon",
    siteName: "EleveAI",
    locale: "fr_FR",
    type: "website",
  },
  alternates: { canonical: "/corail-du-lagon" },
};

export default function Page() {
  return <CorailDuLagonClient />;
}
