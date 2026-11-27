// /embed/pere-noel — le simulateur du traîneau seul, sans l'habillage du site
// (même principe que /embed/cyclone), marque cliquable vers eleveai.fr.
// noindex : la page canonique reste /simulateur-pere-noel.

import type { Metadata } from "next";
import SimulateurPereNoelClient from "../../simulateur-pere-noel/SimulateurPereNoelClient";

export const metadata: Metadata = {
  title: "Le traîneau du Père Noël — widget",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SimulateurPereNoelClient embed />;
}
