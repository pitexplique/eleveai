import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_ANGLAIS_B1 } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie anglais B1 : le vocabulaire, les phrases, les faux-amis (gratuit, à imprimer)",
  description:
    "Le guide de survie de l'anglais niveau B1 : 16 fiches de vocabulaire à travers les matières (verbes du raisonnement, algèbre, statistiques, sciences, économie, finance, géographie, environnement) — les mots et phrases qui sauvent, les réflexes, les faux-amis classiques et un test corrigé par fiche. Gratuit, imprimable en A4, relié au coach English Maths en ligne.",
  alternates: { canonical: "https://eleveai.fr/guide-de-survie/anglais-b1" },
  openGraph: {
    title: "Guide de survie · Anglais B1 (gratuit, à imprimer)",
    description:
      "16 fiches : les mots et phrases qui sauvent, les réflexes, les faux-amis et des tests corrigés. Vocabulaire B1 à travers les matières.",
    url: "https://eleveai.fr/guide-de-survie/anglais-b1",
  },
};

export default function GuideAnglaisB1Page() {
  return <KitSurvie data={KIT_ANGLAIS_B1} />;
}
