// « La fromagerie dans ta main » — le ti fromage frais simulé : du pré des
// Hauts au pot de 150 g. Troisième machine après le cyclone et la sucrerie,
// demandée par Frédéric (18/07) à partir de la fiche produit réelle (Open
// Food Facts). Même principe : l'élève A LA MAIN — il règle les litres de
// lait, les flux se répartissent en direct, les maths s'affichent.
// Chiffres pédagogiques arrondis, inspiré d'un ti fromage frais péi fabriqué
// à Saint-Pierre avec le lait des Hauts (procédé public — pas de logo, pas de
// marque, même règle que la sucrerie).

import type { Metadata } from "next";
import SimulateurFromageClient from "./SimulateurFromageClient";

export const metadata: Metadata = {
  title: "La fromagerie dans ta main — le lait des Hauts",
  description:
    "Règle les litres de lait de la Plaine des Cafres et regarde la fromagerie travailler : la pasteurisation, les ferments, le caillé, le petit-lait... et les pots de fromage frais. Proportionnalité et pourcentages en direct, avec la vraie étiquette à lire.",
  keywords: [
    "lait la réunion",
    "plaine des cafres",
    "fromage frais péi",
    "fromagerie saint-pierre",
    "lire une étiquette nutritionnelle",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "La fromagerie dans ta main — du pré au pot",
    description:
      "Règle les litres de lait des Hauts, regarde les flux se répartir : caillé, petit-lait, pots de fromage frais. La fromagerie péi simulée pour apprendre en jouant.",
    url: "https://www.eleveai.fr/simulateur-fromage",
    siteName: "EleveAI",
    images: [
      {
        url: "/images/fromagerie.webp",
        width: 1200,
        height: 675,
        alt: "La fromagerie dans ta main — le simulateur d'EleveAI",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <SimulateurFromageClient />;
}
