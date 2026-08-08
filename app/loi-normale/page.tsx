// « La courbe en cloche n'est pas tombée du ciel » — article-machine du
// journal (rubrique « Un peu de maths »), né d'un dessin de Frédéric au stylo
// sur une feuille à carreaux (21/07) : une courbe dentelée, une flèche
// « n → ∞ », une courbe lisse. L'intuition : la loi normale est la LIMITE
// d'une loi à coefficients — la binomiale, dont les coefficients sont ceux du
// triangle de Pascal. C'est le théorème de De Moivre-Laplace (1733).

import type { Metadata } from "next";
import LoiNormaleClient from "./LoiNormaleClient";

export const metadata: Metadata = {
  title: "La courbe en cloche n'est pas tombée du ciel — de Pascal à Gauss | EleveAI",
  description:
    "La loi normale est la limite d'une loi à coefficients : pousse n et regarde l'escalier de la binomiale — les coefficients du triangle de Pascal — se lisser en courbe de Gauss. Le théorème de De Moivre-Laplace (1733) dans un curseur, avec les défis intégrés.",
  keywords: [
    "loi normale",
    "courbe de Gauss",
    "loi binomiale",
    "triangle de Pascal",
    "coefficients binomiaux",
    "théorème de Moivre-Laplace",
    "théorème central limite",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "La courbe en cloche n'est pas tombée du ciel",
    description:
      "Pousse n : l'escalier de la binomiale — les coefficients du triangle de Pascal — se lisse en courbe de Gauss. De Moivre l'a prouvé en 1733, un curseur te le montre aujourd'hui.",
    url: "https://www.eleveai.fr/loi-normale",
    siteName: "EleveAI",
    locale: "fr_FR",
    type: "website",
  },
  alternates: { canonical: "/loi-normale" },
};

export default function Page() {
  return <LoiNormaleClient />;
}
