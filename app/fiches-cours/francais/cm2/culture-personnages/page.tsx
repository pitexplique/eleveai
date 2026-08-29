// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCulturePersonnagesCm2,
  slidesCulturePersonnagesCm2,
} from "@/lib/fiches/francais-cm2-culture-personnages";

export const metadata: Metadata = {
  title: "Héros et merveilleux en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : ce qui fait un héros — une épreuve plus grande que lui et un choix, pas la force ni la victoire —, la différence entre le merveilleux où la magie va de soi et l'étrange où elle inquiète, la peur éprouvée en sécurité, et vivre d'autres vies pour développer l'empathie. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function CulturePersonnagesCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheCulturePersonnagesCm2}
      slides={slidesCulturePersonnagesCm2}
    />
  );
}
