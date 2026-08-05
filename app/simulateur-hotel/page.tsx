// « L'hôtel Le Terre Sainte dans ta main » — le métier d'hôtelier simulé, à
// Saint-Pierre. L'élève choisit la saison dans la VRAIE grille des tarifs
// 2026 (trois catégories × quatre saisons = un tableau à double entrée), règle
// le remplissage : les baies s'allument une à une — le pourcentage devient une
// image qu'on peut COMPTER — puis tout suit : les petits-déjeuners (qui ne
// sont pas dans le prix), les kilos de linge, l'eau chaude du soleil, la
// recette du soir, et le point mort. Du CM2 (lire le tableau) à la Seconde
// (l'équation du point mort). Née d'une rencontre à Terre-Sainte : c'est ce
// que /entreprises propose de faire de n'importe quel métier de l'île.
// ⚠️ La maison est nommée, avec son accord (tranché le 05/08).

import type { Metadata } from "next";
import SimulateurHotelClient from "./SimulateurHotelClient";

// ⚠️ Le layout applique déjà le gabarit « %s — EleveAI » : pas de suffixe ici.
export const metadata: Metadata = {
  title: "L'hôtel Le Terre Sainte dans ta main — le métier d'hôtelier à Saint-Pierre",
  description:
    "Choisis la saison dans la vraie grille de l'hôtel Le Terre Sainte (Saint-Pierre, La Réunion) et règle le remplissage : les baies s'allument, les petits-déjeuners se comptent, le linge s'empile et la caisse se remplit. Tableau à double entrée, pourcentages, moyenne pondérée, RevPAR et point mort — les vrais nombres du métier, à manipuler, avec les défis intégrés du CM2 à la Seconde.",
  keywords: [
    "hôtel le terre sainte",
    "saint-pierre la réunion",
    "taux d'occupation hôtel",
    "revpar",
    "point mort seuil de rentabilité",
    "tableau à double entrée",
    "moyenne pondérée",
    "métier hôtelier la réunion",
    "simulateur pédagogique",
    "eleveai",
  ],
  alternates: { canonical: "https://eleveai.fr/simulateur-hotel" },
  openGraph: {
    title: "L'hôtel Le Terre Sainte dans ta main — une baie allumée, une nuit vendue",
    description:
      "Le métier d'hôtelier tient dans cinq nombres : le taux d'occupation, le prix moyen pondéré, la recette, le RevPAR, le point mort. Règle-les toi-même sur la vraie grille d'un hôtel de Saint-Pierre.",
    url: "https://eleveai.fr/simulateur-hotel",
    siteName: "EleveAI",
    images: [
      {
        url: "/images/hotel-terre-sainte.svg",
        width: 1200,
        height: 900,
        alt: "L'hôtel Le Terre Sainte au crépuscule : la façade, ses baies allumées comme autant de chambres vendues, les chauffe-eau solaires sur le toit et la mer de Saint-Pierre derrière",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <SimulateurHotelClient />;
}
