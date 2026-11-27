// « Le traîneau du Père Noël » — le simulateur où l'élève pose lui-même les
// 5 arrêts du Père Noël autour de la Terre (idée de Frédéric, 27/11 : ses
// élèves adorent le cyclone parce qu'ils posent les points). Quatre niveaux :
// additions (CP-CE2), multiplications (CM), fuseaux horaires (6e-5e),
// vitesse = distance ÷ temps (4e-3e).

import type { Metadata } from "next";
import SimulateurPereNoelClient from "./SimulateurPereNoelClient";

export const metadata: Metadata = {
  title: "Le traîneau du Père Noël — simulateur de maths",
  description:
    "Pose les 5 arrêts du Père Noël autour de la Terre et lance le traîneau : additionner les cadeaux (CP-CE2), enfants × cadeaux (CM), fuseaux horaires (6e-5e), vitesse = distance ÷ temps (4e-3e).",
  keywords: ["simulateur père noël", "maths de noël", "fuseaux horaires", "vitesse distance temps", "calcul cp ce1 ce2", "eleveai"],
  openGraph: {
    title: "Le traîneau du Père Noël — le simulateur d'EleveAI",
    description: "Pose ses 5 arrêts autour de la Terre, lance le traîneau, et calcule les cadeaux, les heures et la vitesse.",
    url: "https://www.eleveai.fr/simulateur-pere-noel",
    siteName: "EleveAI",
    images: [{ url: "/images/traineau-pere-noel.svg", width: 1200, height: 675, alt: "Le traîneau du Père Noël autour de la Terre" }],
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <SimulateurPereNoelClient />;
}
