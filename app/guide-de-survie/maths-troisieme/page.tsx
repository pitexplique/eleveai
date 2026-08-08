import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_MATHS_TROISIEME } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie maths 3e : formules, pièges, réflexes pour le brevet (gratuit, à imprimer)",
  description:
    "Le guide de survie des maths en 3e : les 22 chapitres du programme (BO cycle 4) en fiches — formules essentielles, réflexes, pièges classiques et test corrigé par chapitre. Spécial brevet, gratuit, imprimable en A4, relié au coach en ligne.",
  alternates: { canonical: "https://www.eleveai.fr/guide-de-survie/maths-troisieme" },
  openGraph: {
    title: "Guide de survie · Maths 3e — spécial brevet (gratuit, à imprimer)",
    description:
      "22 chapitres, 22 fiches : formules qui sauvent, réflexes, pièges et tests corrigés. Conforme au programme.",
    url: "https://www.eleveai.fr/guide-de-survie/maths-troisieme",
  },
};

export default function GuideMathsTroisiemePage() {
  return <KitSurvie data={KIT_MATHS_TROISIEME} />;
}
