// « La dimension du volcan » — article-machine du journal (rubrique « Un peu
// de maths ») : le pont entre l'aiguille de Hong Wang (médaille Fields 2026)
// et le Piton de la Fournaise. Box-counting sur le profil du rempart : compter
// les carrés à plusieurs échelles, lire la dimension fractale (d ≈ 1,26) dans
// le multiplicateur. Défis du CP à la Terminale.

import type { Metadata } from "next";
import DimensionDuVolcanClient from "./DimensionDuVolcanClient";

export const metadata: Metadata = {
  title: "La dimension du volcan : mesure la rugosité de la Fournaise | EleveAI",
  description:
    "Pose une grille sur le profil du rempart de la Fournaise, compte les carrés que la crête traverse, affine — le multiplicateur donne la dimension fractale (box-counting) : ligne lisse ×2 → d = 1, rempart ×2,4 → d ≈ 1,25. La même notion de dimension que la conjecture de Kakeya en 3D démontrée par Hong Wang, médaille Fields 2026. Défis du CP à la Terminale.",
  keywords: [
    "dimension fractale",
    "box-counting",
    "comptage de boîtes",
    "Piton de la Fournaise",
    "côte de Mandelbrot",
    "rugosité",
    "Hong Wang",
    "médaille Fields 2026",
    "maths 974",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "La dimension du volcan — la rugosité de la Fournaise, en un seul nombre",
    description:
      "Compte les carrés sur le rempart, affine la grille : ×2 c'est une ligne lisse (d = 1), ×2,4 c'est le rempart (d ≈ 1,25). La dimension fractale se mesure — l'idée au cœur de la médaille Fields 2026 de Hong Wang, appliquée au volcan de La Réunion.",
    url: "https://eleveai.fr/dimension-du-volcan",
    siteName: "EleveAI",
    locale: "fr_FR",
    type: "website",
  },
  alternates: { canonical: "/dimension-du-volcan" },
};

export default function Page() {
  return <DimensionDuVolcanClient />;
}
