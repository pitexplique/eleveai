import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_MATHS_SIXIEME } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie maths 6e : formules, pièges, réflexes (gratuit, à imprimer)",
  description:
    "Le guide de survie des maths en 6e : les 18 chapitres du programme (BO cycle 3) en fiches — l'essentiel, les réflexes, les pièges classiques et un test corrigé par chapitre. Idéal pour l'entrée au collège. Gratuit, imprimable en A4, relié au coach en ligne.",
  alternates: { canonical: "https://eleveai.fr/guide-de-survie/maths-sixieme" },
  openGraph: {
    title: "Guide de survie · Maths 6e (gratuit, à imprimer)",
    description:
      "18 chapitres, 18 fiches : l'essentiel, les réflexes, les pièges et des tests corrigés. Conforme au programme.",
    url: "https://eleveai.fr/guide-de-survie/maths-sixieme",
  },
};

export default function GuideMathsSixiemePage() {
  return <KitSurvie data={KIT_MATHS_SIXIEME} />;
}
