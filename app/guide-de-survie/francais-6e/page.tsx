import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_FRANCAIS_6E } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie français 6e : l'essentiel, les règles, les pièges (gratuit, à imprimer)",
  description:
    "Le guide de survie du français en 6e : les 8 grands domaines du programme (BO cycle 3, entrée au collège) en fiches — l'essentiel, les règles qui sauvent, les réflexes, les pièges classiques et un test corrigé par fiche. Lecture et interprétation, lecture à voix haute, culture littéraire, écriture, oral, vocabulaire, grammaire et conjugaison. Gratuit, imprimable en A4, relié au coach en ligne.",
  alternates: { canonical: "https://www.eleveai.fr/guide-de-survie/francais-6e" },
  openGraph: {
    title: "Guide de survie · Français 6e (gratuit, à imprimer)",
    description:
      "8 fiches : l'essentiel, les règles qui sauvent, les réflexes, les pièges et des tests corrigés. Conforme au programme d'entrée au collège.",
    url: "https://www.eleveai.fr/guide-de-survie/francais-6e",
  },
};

export default function GuideFrancais6ePage() {
  return <KitSurvie data={KIT_FRANCAIS_6E} />;
}
