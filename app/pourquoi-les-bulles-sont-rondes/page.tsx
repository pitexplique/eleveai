// « Pourquoi les bulles sont rondes » — article-machine du journal (rubrique
// « Un peu de maths »). À périmètre fixe (la même ficelle), quelle forme enferme
// le plus d'aire ? On ajoute des côtés à un polygone régulier et l'aire grimpe
// jusqu'au cercle : l'inégalité isopérimétrique 4πA ≤ P². La bulle, elle, la
// « résout » par la physique (la tension de surface minimise l'énergie donc la
// surface → sphère). La question d'enfance de Yilin Wang (prix Salem 2024).

import type { Metadata } from "next";
import PourquoiLesBullesClient from "./PourquoiLesBullesClient";

export const metadata: Metadata = {
  title: "Pourquoi les bulles de savon sont-elles rondes ? | EleveAI",
  description:
    "À ficelle égale (périmètre fixe), quelle forme enferme le plus de place ? Ajoute des côtés à un polygone : l'aire monte jusqu'au cercle, qui reste le champion — c'est l'inégalité isopérimétrique 4πA ≤ P². La bulle de savon la résout sans calcul : sa peau se contracte pour avoir le moins de surface possible, donc une sphère. La question qu'une mathématicienne, Yilin Wang (prix Salem 2024), se posait enfant. Avec les défis du CP à la Terminale.",
  keywords: [
    "isopérimétrie",
    "inégalité isopérimétrique",
    "pourquoi les bulles sont rondes",
    "bulle de savon",
    "tension de surface",
    "cercle aire maximale",
    "sphère surface minimale",
    "Yilin Wang",
    "quotient isopérimétrique",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "Pourquoi les bulles de savon sont-elles rondes ?",
    description:
      "Même ficelle, quelle forme tient le plus de place ? Le cercle gagne toujours (4πA ≤ P²), et la bulle le « résout » sans calcul. La question d'enfance de Yilin Wang.",
    url: "https://eleveai.fr/pourquoi-les-bulles-sont-rondes",
    siteName: "EleveAI",
    locale: "fr_FR",
    type: "website",
  },
  alternates: { canonical: "/pourquoi-les-bulles-sont-rondes" },
};

export default function Page() {
  return <PourquoiLesBullesClient />;
}
