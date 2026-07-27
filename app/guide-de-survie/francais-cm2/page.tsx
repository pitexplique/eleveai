import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_FRANCAIS_CM2 } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie français CM2 : l'essentiel, les règles, les pièges (gratuit, à imprimer)",
  description:
    "Le guide de survie du français en CM2 : les 9 grands domaines du programme (BO cycle 3) en fiches — l'essentiel, les règles qui sauvent, les réflexes, les pièges classiques et un test corrigé par fiche. Lecture, écriture, oral, vocabulaire, grammaire, phrase complexe et conjugaison. Gratuit, imprimable en A4, relié au coach en ligne.",
  alternates: { canonical: "https://eleveai.fr/guide-de-survie/francais-cm2" },
  openGraph: {
    title: "Guide de survie · Français CM2 (gratuit, à imprimer)",
    description:
      "9 fiches : l'essentiel, les règles qui sauvent, les réflexes, les pièges et des tests corrigés. Conforme au programme.",
    url: "https://eleveai.fr/guide-de-survie/francais-cm2",
  },
};

export default function GuideFrancaisCm2Page() {
  return <KitSurvie data={KIT_FRANCAIS_CM2} />;
}
