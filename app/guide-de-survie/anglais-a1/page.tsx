import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_ANGLAIS_A1 } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie anglais A1 : le vocabulaire, les phrases, les faux-amis (gratuit, à imprimer)",
  description:
    "Le guide de survie de l'anglais niveau A1 : 19 fiches de vocabulaire à travers les matières (nombres, calcul, formes, sports, sciences, argent, géographie, famille, école, couleurs, corps, nourriture) — les mots et phrases qui sauvent, les réflexes, les faux-amis classiques et un test corrigé par fiche. Gratuit, imprimable en A4, relié au coach English Maths en ligne.",
  alternates: { canonical: "https://eleveai.fr/guide-de-survie/anglais-a1" },
  openGraph: {
    title: "Guide de survie · Anglais A1 (gratuit, à imprimer)",
    description:
      "19 fiches : les mots et phrases qui sauvent, les réflexes, les faux-amis et des tests corrigés. Vocabulaire A1 à travers les matières.",
    url: "https://eleveai.fr/guide-de-survie/anglais-a1",
  },
};

export default function GuideAnglaisA1Page() {
  return <KitSurvie data={KIT_ANGLAIS_A1} />;
}
