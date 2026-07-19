// « Le barrage dans ta main » — Takamaka simulé : l'eau de l'île fait la
// lumière. Quatrième machine après le cyclone, la sucrerie et la fromagerie
// (demande de Frédéric, 19/07, née d'un reel viral de barrage en coupe :
// notre version est ANCRÉE — la rivière des Marsouins — et INTERACTIVE).
// Même principe : l'élève A LA MAIN — il règle le débit turbiné, les flux
// se répartissent, les maths s'affichent, les défis se vérifient sur la
// machine. Chiffres pédagogiques arrondis, inspiré des centrales
// hydroélectriques de Takamaka (procédé public — pas de logo, pas de marque).

import type { Metadata } from "next";
import SimulateurBarrageClient from "./SimulateurBarrageClient";

export const metadata: Metadata = {
  title: "Le barrage dans ta main — Takamaka, La Réunion | EleveAI",
  description:
    "Règle le débit de la rivière des Marsouins et regarde la centrale de Takamaka travailler : la chute de ~500 m, la turbine, l'alternateur... et l'électricité de l'île. L'hydroélectricité réunionnaise simulée — proportionnalité et puissance en direct, avec les défis intégrés.",
  keywords: [
    "barrage takamaka",
    "hydroélectricité la réunion",
    "rivière des marsouins",
    "centrale hydroélectrique",
    "énergie renouvelable réunion",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "Le barrage dans ta main — l'eau de l'île fait la lumière",
    description:
      "Règle le débit, regarde l'eau tomber de 500 m et la turbine s'emballer : Takamaka simulé pour apprendre en jouant — et l'eau ressort intacte vers la rivière.",
    url: "https://eleveai.fr/simulateur-barrage",
    siteName: "EleveAI",
    images: [
      {
        url: "/images/barrage-takamaka.webp",
        width: 1200,
        height: 675,
        alt: "Le barrage dans ta main — le simulateur d'EleveAI",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <SimulateurBarrageClient />;
}
