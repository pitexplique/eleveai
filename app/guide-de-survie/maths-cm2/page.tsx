import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_MATHS_CM2 } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie maths CM2 : l'essentiel, les réflexes, les pièges (gratuit, à imprimer)",
  description:
    "Le guide de survie des maths en CM2 : les 28 chapitres du programme (BO cycle 3) en fiches — l'essentiel, les réflexes, les pièges classiques et un test corrigé par chapitre. Pour réussir sa dernière année de primaire et préparer la 6e. Gratuit, imprimable en A4, relié au coach en ligne.",
  alternates: { canonical: "https://eleveai.fr/guide-de-survie/maths-cm2" },
  openGraph: {
    title: "Guide de survie · Maths CM2 (gratuit, à imprimer)",
    description:
      "28 chapitres, 28 fiches : l'essentiel, les réflexes, les pièges et des tests corrigés. Conforme au programme.",
    url: "https://eleveai.fr/guide-de-survie/maths-cm2",
  },
};

export default function GuideMathsCm2Page() {
  return <KitSurvie data={KIT_MATHS_CM2} />;
}
