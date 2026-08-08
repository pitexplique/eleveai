// « Le but qui sort de la moyenne » — article-machine du journal (rubrique
// « Un peu de maths »), né d'une phrase de Mbappé : on renforce ses défauts,
// mais ce sont nos qualités qui nous différencient. En maths : combler ses
// défauts, c'est la loi normale (on converge vers la moyenne) ; cultiver sa
// qualité rare, c'est la queue lourde de la loi de Pareto — là où vivent les
// records. Le contrepoint direct de /loi-normale.

import type { Metadata } from "next";
import LoiParetoClient from "./LoiParetoClient";

export const metadata: Metadata = {
  title: "Le but qui sort de la moyenne — la loi de Pareto, de Mbappé aux records | EleveAI",
  description:
    "« On renforce ses défauts, mais ce sont nos qualités qui nous différencient » (Mbappé). En maths : la moyenne, c'est la loi normale ; le record, c'est la queue lourde de la loi de Pareto. Pousse le curseur, joue une saison, et regarde les buteurs d'exception surgir — avec les défis du CP à la Terminale.",
  keywords: [
    "loi de Pareto",
    "loi de puissance",
    "queue lourde",
    "loi normale",
    "moyenne médiane",
    "valeur extrême",
    "80/20",
    "Mbappé maths",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "Le but qui sort de la moyenne — la loi de Pareto",
    description:
      "Le record n'est pas dans la moyenne, il est dans la queue. Combler ses défauts te ramène à la cloche ; cultiver ta qualité rare te projette dans la queue de Pareto — là où naissent les buteurs d'exception.",
    url: "https://www.eleveai.fr/loi-pareto",
    siteName: "EleveAI",
    locale: "fr_FR",
    type: "website",
  },
  alternates: { canonical: "/loi-pareto" },
};

export default function Page() {
  return <LoiParetoClient />;
}
