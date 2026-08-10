// /embed/cyclone — LE WIDGET pour les médias de l'île (Zinfos, Le Quotidien,
// Clicanoo...) : le simulateur seul, sans l'habillage du site (masqué par
// MasqueSurEmbed dans le layout), marque cliquable vers eleveai.fr.
// Le modèle Windy : la carte embarquée partout = la marque partout.
//
// Intégration chez un média :
//   <iframe src="https://www.eleveai.fr/embed/cyclone" width="100%"
//           height="760" style="border:none" title="Simulateur de cyclone — EleveAI"
//           loading="lazy"></iframe>
//
// noindex : c'est une vue embarquée, la page canonique reste /simulateur-cyclone.

import type { Metadata } from "next";
import SimulateurCycloneClient from "../../simulateur-cyclone/SimulateurCycloneClient";

export const metadata: Metadata = {
  title: "Dans l'œil du cyclone — widget",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SimulateurCycloneClient embed />;
}
