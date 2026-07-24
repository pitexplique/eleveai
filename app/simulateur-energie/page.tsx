// « La salle de sport dans ta main » — treizième machine, née d'une rencontre
// avec le coach principal d'une salle de sport de Saint-Pierre (pas de nom,
// pas de marque : la règle du journal). L'élève règle SON effort — puissance,
// durée, poids — et la machine convertit sous ses yeux : joules, kcal,
// rendement musculaire ~25 %, ampoules LED, carrés de chocolat, litres d'eau
// hissés à 500 m comme à Takamaka... puis la récup' : les protéines de
// l'ASSIETTE (œufs, lait, lentilles, poisson — jamais autre chose).
// Message aux collégiens : ton corps est une centrale électrique fascinante —
// énergie et récupération, jamais de morale, jamais de discours sur le poids.

import type { Metadata } from "next";
import SimulateurEnergieClient from "./SimulateurEnergieClient";

export const metadata: Metadata = {
  title: "La centrale, c'est toi — la salle de sport dans ta main | EleveAI",
  description:
    "Règle ta puissance (en watts), ta durée d'effort et ton poids : la machine convertit tout — joules, kcal, le rendement musculaire de 25 %, les ampoules LED que ton effort allume, les carrés de chocolat, les litres d'eau hissés à 500 m comme à Takamaka. Et la récup' : les protéines de l'assiette. Avec les défis intégrés, du CM2 au lycée.",
  keywords: [
    "puissance en watts",
    "énergie joules kcal",
    "rendement musculaire",
    "rameur watts",
    "P = E/t",
    "protéines alimentation sportif",
    "sport la réunion",
    "activité physique ados OMS",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "La centrale, c'est toi — la salle de sport dans ta main",
    description:
      "Ton effort en watts devient des joules, des kcal, des ampoules allumées et des litres d'eau hissés à 500 m — puis l'assiette répare le muscle. La physique de la salle de sport, simulée pour apprendre en jouant.",
    url: "https://eleveai.fr/simulateur-energie",
    siteName: "EleveAI",
    locale: "fr_FR",
    type: "website",
  },
  alternates: { canonical: "/simulateur-energie" },
};

export default function Page() {
  return <SimulateurEnergieClient />;
}
