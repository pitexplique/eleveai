import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_MATHS_CM1 } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie maths CM1 : l'essentiel, les réflexes, les pièges (gratuit, à imprimer)",
  description:
    "Le guide de survie des maths en CM1 : les 27 chapitres du programme (BO cycle 3) en fiches — l'essentiel, les réflexes, les pièges classiques et un test corrigé par chapitre. Pour bien avancer en primaire et préparer le CM2. Gratuit, imprimable en A4, relié au coach en ligne.",
  alternates: { canonical: "https://www.eleveai.fr/guide-de-survie/maths-cm1" },
  openGraph: {
    title: "Guide de survie · Maths CM1 (gratuit, à imprimer)",
    description:
      "27 chapitres, 27 fiches : l'essentiel, les réflexes, les pièges et des tests corrigés. Conforme au programme.",
    url: "https://www.eleveai.fr/guide-de-survie/maths-cm1",
  },
};

export default function GuideMathsCm1Page() {
  return <KitSurvie data={KIT_MATHS_CM1} />;
}
