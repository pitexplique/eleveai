// « La loi de la performance » — article-machine du journal (rubrique « Un peu
// de maths »), né d'un dessin de Frédéric un soir de juillet, après une
// interview de Kylian Mbappé (« améliorer ses défauts, mais surtout ses
// qualités »). Le dessin : ADN → variables x → coefficients → réseau de
// neurones → performance. C'est un neurone : une somme pondérée Σ aᵢxᵢ, dont
// l'élève règle les coefficients. Le pendant individuel de /loi-pareto.

import type { Metadata } from "next";
import LoiPerformanceClient from "./LoiPerformanceClient";

export const metadata: Metadata = {
  title: "La loi de la performance — faut-il améliorer ses défauts ou ses qualités ? | EleveAI",
  description:
    "Né d'une interview de Mbappé : améliorer ses défauts, mais surtout ses qualités. En maths, c'est un neurone — une somme pondérée Σ aᵢxᵢ. Règle tes coefficients (ton énergie) sur tes traits et vois ta performance, avec les défis du CP à la Terminale.",
  keywords: [
    "loi de la performance",
    "somme pondérée",
    "neurone",
    "réseau de neurones",
    "coefficients",
    "Mbappé maths",
    "défauts qualités",
    "produit scalaire",
    "programmation linéaire",
    "eleveai",
  ],
  openGraph: {
    title: "La loi de la performance — défauts ou qualités ?",
    description:
      "Le dessin d'un soir de juillet : ADN → traits → coefficients → réseau de neurones → performance. Règle tes coefficients et vois ce que Σ aᵢxᵢ te donne. La leçon de Mbappé, en équation.",
    url: "https://www.eleveai.fr/loi-performance",
    siteName: "EleveAI",
    locale: "fr_FR",
    type: "website",
  },
  alternates: { canonical: "/loi-performance" },
};

export default function Page() {
  return <LoiPerformanceClient />;
}
