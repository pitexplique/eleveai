import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_FRANCAIS_5E } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie français 5e : l'essentiel, les règles, les pièges (gratuit, à imprimer)",
  description:
    "Le guide de survie du français en 5e : les 9 grands domaines du programme (BO cycle 4) en fiches — l'essentiel, les règles qui sauvent, les réflexes, les pièges classiques et un test corrigé par fiche. Comprendre et interpréter, lecture à voix haute, culture littéraire, écriture, oral, vocabulaire, grammaire et accords, discours et registres, conjugaison. Gratuit, imprimable en A4, relié au coach en ligne.",
  alternates: { canonical: "https://eleveai.fr/guide-de-survie/francais-5e" },
  openGraph: {
    title: "Guide de survie · Français 5e (gratuit, à imprimer)",
    description:
      "9 fiches : l'essentiel, les règles qui sauvent, les réflexes, les pièges et des tests corrigés. Conforme au programme de 5e (cycle 4).",
    url: "https://eleveai.fr/guide-de-survie/francais-5e",
  },
};

export default function GuideFrancais5ePage() {
  return <KitSurvie data={KIT_FRANCAIS_5E} />;
}
