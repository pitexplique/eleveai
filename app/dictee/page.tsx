import type { Metadata } from "next";
import DicteeTexteClient from "./DicteeTexteClient";

export const metadata: Metadata = {
  title: "La dictée — écouter, écrire, comparer mot à mot (CM2 → 3e) | EleveAI",
  description:
    "Des dictées de vrais textes, lues à voix haute groupe de mots par groupe de mots, à réécouter autant de fois qu'on veut. La correction compare chaque mot à celui de l'auteur, accents compris, et montre exactement où ça a buté. Des fables de Jean de La Fontaine, du CM2 à la 3e. Gratuit, sans publicité.",
  keywords: [
    "dictée en ligne",
    "dictée audio CM2",
    "dictée 6e",
    "dictée La Fontaine",
    "s'entraîner à la dictée",
    "orthographe lexicale",
    "dictée corrigée mot à mot",
  ],
  alternates: { canonical: "https://www.eleveai.fr/dictee" },
};

export default function Page() {
  return <DicteeTexteClient />;
}
