// « Active un epsilon » — la 7e machine, née du dessin de Frédéric (20/07) :
// un cœur au stylo avec un ε, un réseau de neurones et l'infini. L'idée à
// manipuler : chaque étincelle en engendre k (le coefficient). k sous 1 la
// chaîne s'éteint, k = 1 elle survit, k au-dessus de 1 c'est l'exponentielle —
// la suite géométrique, le R₀ des épidémies et l'effet prof dans un curseur.
// Devise de la machine : « activer des epsilons peut engendrer des infinis ».

import type { Metadata } from "next";
import SimulateurEpsilonClient from "./SimulateurEpsilonClient";

export const metadata: Metadata = {
  title: "Active un epsilon — la machine à engendrer des infinis",
  description:
    "Règle le coefficient k : chaque étincelle en allume k autres. À k = 2, dix générations font 1 024 ; à k = 4, plus d'un million — l'île entière. La suite géométrique, le R₀ et l'effet d'entraide dans une machine, avec les défis intégrés.",
  keywords: [
    "suite géométrique",
    "exponentielle",
    "coefficient multiplicateur",
    "R0",
    "effet boule de neige",
    "entraide",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "Active un epsilon — la machine à engendrer des infinis",
    description:
      "Chaque étincelle en allume k autres. Règle le coefficient et regarde la cascade : 1 024 à k = 2, un million à k = 4. « In min i lav lot » — une main lave l'autre.",
    url: "https://www.eleveai.fr/simulateur-epsilon",
    siteName: "EleveAI",
    images: [
      {
        url: "/images/coeur-epsilon-infini-og.webp",
        width: 1080,
        height: 1350,
        alt: "Un cœur dessiné au stylo bleu : un epsilon, un réseau de neurones illuminé et l'infini en or — « activer des epsilons peut engendrer des infinis »",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  alternates: { canonical: "/simulateur-epsilon" },
};

export default function Page() {
  return <SimulateurEpsilonClient />;
}
