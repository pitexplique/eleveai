// « Le lagon dans ta main » — le lagon de l'Ermitage simulé : de la houle
// du large au sable blanc de la plage, en passant par la muraille vivante
// du récif. Sixième machine. Même principe que les autres : l'élève A LA
// MAIN — il règle la houle, la barrière travaille, les maths s'affichent,
// les défis se vérifient sur la machine.
// Chiffres pédagogiques arrondis, repères réels : la houle du siècle
// (mai 2007), la Réserve naturelle marine (2007, 3 500 ha), le récif
// ~8 000 ans. ⚠️ Tact : on ne marche jamais sur le corail — le garde-fou
// le dit.

import type { Metadata } from "next";
import SimulateurLagonClient from "./SimulateurLagonClient";

export const metadata: Metadata = {
  title: "Le lagon dans ta main — l'Ermitage et sa barrière de corail | EleveAI",
  description:
    "Règle la houle du large et regarde la barrière de corail travailler : la vague déferle sur la crête, le lagon reste calme, les poissons-perroquets fabriquent le sable blanc. Le lagon de l'Ermitage simulé — hauteurs, pourcentages et durées en direct, avec les défis intégrés.",
  keywords: [
    "lagon de l'ermitage",
    "barrière de corail",
    "récif corallien la réunion",
    "réserve marine la réunion",
    "poisson-perroquet sable",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "Le lagon dans ta main — la muraille vivante qui fabrique la plage",
    description:
      "Règle la houle, regarde la vague déferler sur la crête du récif — et le lagon rester calme. Le lagon de l'Ermitage simulé pour apprendre en jouant.",
    url: "https://www.eleveai.fr/simulateur-lagon",
    siteName: "EleveAI",
    images: [
      {
        // L'illustration BD de la plage de l'Ermitage (style du journal) :
        // le lagon calme, paddles et baigneurs, le sable sous les cocotiers.
        url: "/images/lagon.webp",
        width: 1280,
        height: 960,
        alt: "La plage de l'Ermitage en dessin : le lagon turquoise et calme, des paddles et des baigneurs, le sable sous les cocotiers",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <SimulateurLagonClient />;
}
