import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_FRANCAIS_CM1 } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie français CM1 : l'essentiel, les règles, les pièges (gratuit, à imprimer)",
  description:
    "Le guide de survie du français en CM1 : les 8 grands domaines du programme (BO cycle 3) en fiches — l'essentiel, les règles qui sauvent, les réflexes, les pièges classiques et un test corrigé par fiche. Lecture, écriture, oral, vocabulaire, grammaire et conjugaison. Gratuit, imprimable en A4, relié au coach en ligne.",
  alternates: { canonical: "https://www.eleveai.fr/guide-de-survie/francais-cm1" },
  openGraph: {
    title: "Guide de survie · Français CM1 (gratuit, à imprimer)",
    description:
      "8 fiches : l'essentiel, les règles qui sauvent, les réflexes, les pièges et des tests corrigés. Conforme au programme.",
    url: "https://www.eleveai.fr/guide-de-survie/francais-cm1",
  },
};

export default function GuideFrancaisCm1Page() {
  return <KitSurvie data={KIT_FRANCAIS_CM1} />;
}
