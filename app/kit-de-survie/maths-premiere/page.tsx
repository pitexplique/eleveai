import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_MATHS_PREMIERE } from "./data";

export const metadata: Metadata = {
  title:
    "Kit de survie spé maths Première : formules, pièges, réflexes (gratuit, à imprimer)",
  description:
    "Le kit de survie de la spécialité maths en Première : les 11 chapitres du programme (BO 2019) en fiches — formules essentielles, réflexes, pièges classiques et test corrigé par chapitre. Gratuit, imprimable en A4, relié au coach en ligne.",
  alternates: { canonical: "https://eleveai.fr/kit-de-survie/maths-premiere" },
  openGraph: {
    title: "Kit de survie · Spé maths Première (gratuit, à imprimer)",
    description:
      "11 chapitres, 11 fiches : formules qui sauvent, réflexes, pièges et tests corrigés. Conforme au programme.",
    url: "https://eleveai.fr/kit-de-survie/maths-premiere",
  },
};

export default function KitMathsPremierePage() {
  return <KitSurvie data={KIT_MATHS_PREMIERE} />;
}
