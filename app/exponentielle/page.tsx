// « Plus j'avance, plus ma vitesse augmente » — article-machine du journal
// (rubrique « Un peu de maths »), le pendant exponentiel de la courbe en
// cloche. Deux courbes en miroir nées d'un dessin au stylo : la MONTÉE
// (e^x, la vitesse proportionnelle à la hauteur — « le plat n'est pas
// l'échec ») et la DESCENTE (e^(-x), la courbe de l'oubli d'Ebbinghaus —
// « oublier n'est pas un échec, c'est une loi » — qu'on relance par la
// révision espacée). Idée f' = k·f, sans coller au programme.

import type { Metadata } from "next";
import ExponentielleClient from "./ExponentielleClient";

export const metadata: Metadata = {
  title: "Plus j'avance, plus ma vitesse augmente — l'exponentielle en miroir | EleveAI",
  description:
    "L'exponentielle a deux visages : la montée (ta vitesse grandit avec ta hauteur, le plat du début n'est pas l'échec) et la descente (la courbe de l'oubli, qu'on relance par la révision espacée). Deux machines à curseur, la loi f' = k·f, et les défis intégrés.",
  keywords: [
    "fonction exponentielle",
    "exponentielle",
    "e puissance x",
    "croissance exponentielle",
    "décroissance exponentielle",
    "demi-vie",
    "courbe de l'oubli",
    "Ebbinghaus",
    "révision espacée",
    "loi de Newton refroidissement",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "Plus j'avance, plus ma vitesse augmente",
    description:
      "La même loi monte et descend : ta vitesse grandit avec ta hauteur, et ce que tu ne recharges pas s'efface. Deux curseurs pour le voir — dont la courbe de l'oubli qu'on relance en révisant.",
    url: "https://www.eleveai.fr/exponentielle",
    siteName: "EleveAI",
    locale: "fr_FR",
    type: "website",
  },
  alternates: { canonical: "/exponentielle" },
};

export default function Page() {
  return <ExponentielleClient />;
}
