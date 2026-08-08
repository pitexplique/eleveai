// « Dans l'œil du cyclone » — le simulateur où l'élève tient le vent dans sa
// main. Né du prototype validé par Frédéric le 16/07 (« je me suis pris au
// jeu »). Objet pédagogique ET distribuable (widget quotidiens à venir) ;
// sortie grand public prévue avant la saison cyclonique (novembre).

import type { Metadata } from "next";
import SimulateurCycloneClient from "./SimulateurCycloneClient";

export const metadata: Metadata = {
  title: "Simulateur de cyclone — La Réunion | EleveAI",
  description:
    "Place ton cyclone sur l'océan Indien, trace sa trajectoire, règle sa force et sa vitesse : le simulateur pédagogique qui apprend les alertes cycloniques de La Réunion (jaune, orange, rouge, violette) et les maths du météorologue — temps = distance ÷ vitesse.",
  keywords: [
    "simulateur cyclone",
    "cyclone la réunion",
    "alerte cyclonique réunion",
    "trajectoire cyclone",
    "éducation aux risques",
    "météo réunion enfants",
    "eleveai",
  ],
  openGraph: {
    title: "Dans l'œil du cyclone — le simulateur d'EleveAI",
    description:
      "Tiens le vent dans ta main : trace la trajectoire, règle la force, et apprends les alertes cycloniques de La Réunion en jouant.",
    url: "https://www.eleveai.fr/simulateur-cyclone",
    siteName: "EleveAI",
    images: [
      {
        url: "/images/cyclone-simulateur.webp",
        width: 1200,
        height: 675,
        alt: "Dans l'œil du cyclone — le simulateur d'EleveAI",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <SimulateurCycloneClient />;
}
