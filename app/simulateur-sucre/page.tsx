// « L'usine dans ta main » — la sucrerie simulée : du champ au sucre (et à la
// lumière). Idée de Frédéric (bat karé du 17/07), lancée pendant la vraie
// campagne sucrière (juillet-décembre : l'usine du Gol tourne en ce moment).
// Même principe que le simulateur cyclone : l'élève A LA MAIN — il règle le
// tonnage de canne, les flux se répartissent en direct, les maths s'affichent.
// Chiffres pédagogiques arrondis, inspiré du fonctionnement d'une sucrerie
// réunionnaise comme celle du Gol (procédé industriel public — pas de logo,
// pas de marque).

import type { Metadata } from "next";
import SimulateurSucreClient from "./SimulateurSucreClient";

export const metadata: Metadata = {
  title: "L'usine à sucre dans ta main — La Réunion",
  description:
    "Règle le tonnage de canne et regarde l'usine travailler : le jus, la bagasse, le sucre roux, la mélasse... et l'électricité. La sucrerie réunionnaise simulée, avec les vraies proportions — proportionnalité et pourcentages en direct, pendant la campagne sucrière.",
  keywords: [
    "usine sucre la réunion",
    "canne à sucre réunion",
    "usine du gol",
    "campagne sucrière",
    "bagasse électricité",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "L'usine dans ta main — du champ au sucre (et à la lumière)",
    description:
      "Règle le tonnage de canne, regarde les flux se répartir : sucre, mélasse, électricité. La sucrerie réunionnaise simulée pour apprendre en jouant.",
    url: "https://www.eleveai.fr/simulateur-sucre",
    siteName: "EleveAI",
    images: [
      {
        url: "/images/usine-sucre.webp",
        width: 1200,
        height: 675,
        alt: "L'usine à sucre dans ta main — le simulateur d'EleveAI",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <SimulateurSucreClient />;
}
