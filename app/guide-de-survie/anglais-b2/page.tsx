import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_ANGLAIS_B2 } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie anglais B2 : le vocabulaire, les phrases, les faux-amis (gratuit, à imprimer)",
  description:
    "Le guide de survie de l'anglais niveau B2 : 15 fiches de vocabulaire académique à travers les matières (analyse, démonstration, sciences, macroéconomie, finance, géopolitique, climat) — les mots et phrases qui sauvent, les réflexes, les faux-amis classiques et un test corrigé par fiche. Gratuit, imprimable en A4, relié au coach English Maths en ligne.",
  alternates: { canonical: "https://www.eleveai.fr/guide-de-survie/anglais-b2" },
  openGraph: {
    title: "Guide de survie · Anglais B2 (gratuit, à imprimer)",
    description:
      "15 fiches : les mots et phrases qui sauvent, les réflexes, les faux-amis et des tests corrigés. Vocabulaire B2 (avancé) à travers les matières.",
    url: "https://www.eleveai.fr/guide-de-survie/anglais-b2",
  },
};

export default function GuideAnglaisB2Page() {
  return <KitSurvie data={KIT_ANGLAIS_B2} />;
}
