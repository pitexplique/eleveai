import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_FRANCAIS_3E } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie français 3e (brevet) : l'essentiel, les règles, les pièges (gratuit, à imprimer)",
  description:
    "Le guide de survie du français en 3e, spécial brevet : les 9 grands domaines du programme (BO cycle 4) en fiches — l'essentiel, les règles qui sauvent, les réflexes, les pièges classiques et un test corrigé par fiche. Comprendre et interpréter (textes engagés), lecture à voix haute, culture littéraire, écriture, oral du brevet, vocabulaire de l'engagement, grammaire (subordonnées, voix passive), discours et registres, conjugaison (subjonctif, conditionnel passé). Gratuit, imprimable en A4, relié au coach en ligne.",
  alternates: { canonical: "https://eleveai.fr/guide-de-survie/francais-3e" },
  openGraph: {
    title: "Guide de survie · Français 3e (brevet, gratuit, à imprimer)",
    description:
      "9 fiches spécial brevet : l'essentiel, les règles qui sauvent, les réflexes, les pièges et des tests corrigés. Conforme au programme de 3e (cycle 4).",
    url: "https://eleveai.fr/guide-de-survie/francais-3e",
  },
};

export default function GuideFrancais3ePage() {
  return <KitSurvie data={KIT_FRANCAIS_3E} />;
}
