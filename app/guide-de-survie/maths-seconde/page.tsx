import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_MATHS_SECONDE } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie maths Seconde : formules, pièges, réflexes (gratuit, à imprimer)",
  description:
    "Le guide de survie des maths en Seconde : les 22 chapitres du programme (BO) en fiches — formules essentielles, réflexes, pièges classiques et test corrigé par chapitre. Gratuit, imprimable en A4, relié au coach en ligne.",
  alternates: { canonical: "https://eleveai.fr/guide-de-survie/maths-seconde" },
  openGraph: {
    title: "Guide de survie · Maths Seconde (gratuit, à imprimer)",
    description:
      "22 chapitres, 22 fiches : formules qui sauvent, réflexes, pièges et tests corrigés. Conforme au programme.",
    url: "https://eleveai.fr/guide-de-survie/maths-seconde",
  },
};

export default function GuideMathsSecondePage() {
  return <KitSurvie data={KIT_MATHS_SECONDE} />;
}
