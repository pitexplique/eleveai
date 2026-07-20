// « Le volcan dans ta main » — le Piton de la Fournaise simulé : de la
// chambre magmatique à la nouvelle terre gagnée sur l'océan. Cinquième
// machine (choix de Frédéric, 19/07). Même principe que les autres :
// l'élève A LA MAIN — il règle le débit de lave, la chaîne s'anime, les
// maths s'affichent, les défis se vérifient sur la machine.
// Chiffres pédagogiques arrondis, repères réels de l'éruption d'avril 2007
// (l'éruption du siècle). ⚠️ Tact : le volcan se regarde depuis les
// belvédères, l'enclos ferme en éruption — le garde-fou le dit.

import type { Metadata } from "next";
import SimulateurVolcanClient from "./SimulateurVolcanClient";

export const metadata: Metadata = {
  title: "Le volcan dans ta main — Piton de la Fournaise | EleveAI",
  description:
    "Règle le débit de lave du Piton de la Fournaise et regarde l'éruption travailler : la chambre magmatique, les fontaines, la coulée qui descend les Grandes Pentes... et la nouvelle terre gagnée sur l'océan. Le volcan de La Réunion simulé — volumes, vitesses et durées en direct, avec les défis intégrés.",
  keywords: [
    "piton de la fournaise",
    "volcan la réunion",
    "éruption 2007",
    "enclos fouqué",
    "coulée de lave",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "Le volcan dans ta main — la Fournaise fabrique l'île",
    description:
      "Règle le débit de lave, regarde la coulée descendre les Grandes Pentes — et l'île grandir sur l'océan. Le Piton de la Fournaise simulé pour apprendre en jouant.",
    url: "https://eleveai.fr/simulateur-volcan",
    siteName: "EleveAI",
    images: [
      {
        // L'illustration de Frédéric (19/07) : l'éruption vue du belvédère,
        // les veilleurs de l'observatoire au premier plan.
        url: "/images/volcan-piton-de-la-fournaise.webp",
        width: 1200,
        height: 676,
        alt: "Le Piton de la Fournaise en éruption, observé par deux scientifiques de l'observatoire",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <SimulateurVolcanClient />;
}
