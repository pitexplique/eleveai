import type { Metadata } from "next";
import KitSurvie from "@/components/kit/KitSurvie";
import { KIT_ANGLAIS_A2 } from "./data";

export const metadata: Metadata = {
  title:
    "Guide de survie anglais A2 : le vocabulaire, les phrases, les faux-amis (gratuit, à imprimer)",
  description:
    "Le guide de survie de l'anglais niveau A2 : 20 fiches de vocabulaire à travers les matières (verbes et expressions maths, fractions, géométrie, sport, biologie, chimie, physique, économie, finances, pourcentages, voyage, géographie, orientation, maison, verbes du quotidien, adjectifs, métiers) — les mots et phrases qui sauvent, les réflexes, les faux-amis classiques et un test corrigé par fiche. Gratuit, imprimable en A4, relié au coach English Maths en ligne.",
  alternates: { canonical: "https://www.eleveai.fr/guide-de-survie/anglais-a2" },
  openGraph: {
    title: "Guide de survie · Anglais A2 (gratuit, à imprimer)",
    description:
      "20 fiches : les mots et phrases qui sauvent, les réflexes, les faux-amis et des tests corrigés. Vocabulaire A2 à travers les matières.",
    url: "https://www.eleveai.fr/guide-de-survie/anglais-a2",
  },
};

export default function GuideAnglaisA2Page() {
  return <KitSurvie data={KIT_ANGLAIS_A2} />;
}
