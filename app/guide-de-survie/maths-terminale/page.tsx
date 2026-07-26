import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_MATHS_TERMINALE } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie spé maths Terminale : formules, pièges, réflexes (gratuit, à imprimer)",
  description:
    "Le guide de survie de la spécialité maths en Terminale : les 18 chapitres du programme (BO 2019) en fiches — formules essentielles, réflexes, pièges classiques et test corrigé par chapitre. Gratuit, imprimable en A4, relié au coach en ligne.",
  alternates: { canonical: "https://eleveai.fr/guide-de-survie/maths-terminale" },
  openGraph: {
    title: "Guide de survie · Spé maths Terminale (gratuit, à imprimer)",
    description:
      "18 chapitres, 18 fiches : formules qui sauvent, réflexes, pièges et tests corrigés. Conforme au programme.",
    url: "https://eleveai.fr/guide-de-survie/maths-terminale",
  },
};

export default function GuideMathsTerminalePage() {
  return <KitSurvie data={KIT_MATHS_TERMINALE} />;
}
