import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_MATHS_CINQUIEME } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie maths 5e : formules, pièges, réflexes (gratuit, à imprimer)",
  description:
    "Le guide de survie des maths en 5e : les 13 chapitres du programme (BO cycle 4) en fiches — formules essentielles, réflexes, pièges classiques et test corrigé par chapitre. Gratuit, imprimable en A4, relié au coach en ligne.",
  alternates: { canonical: "https://www.eleveai.fr/guide-de-survie/maths-cinquieme" },
  openGraph: {
    title: "Guide de survie · Maths 5e (gratuit, à imprimer)",
    description:
      "13 chapitres, 13 fiches : formules qui sauvent, réflexes, pièges et tests corrigés. Conforme au programme.",
    url: "https://www.eleveai.fr/guide-de-survie/maths-cinquieme",
  },
};

export default function GuideMathsCinquiemePage() {
  return <KitSurvie data={KIT_MATHS_CINQUIEME} />;
}
