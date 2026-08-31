// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCulturePersonnagesCm1,
  slidesCulturePersonnagesCm1,
} from "@/lib/fiches/francais-cm1-culture-personnages";

export const metadata: Metadata = {
  title: "Héros et merveilleux en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : découvrir des héroïnes et des héros, se confronter au merveilleux et à l'étrange, imaginer et vivre d'autres vies. Pourquoi ce n'est pas la magie qui fait le conte mais le fait que personne ne s'en étonne, et pourquoi un héros a le droit d'avoir des faiblesses. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function CulturePersonnagesCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheCulturePersonnagesCm1}
      slides={slidesCulturePersonnagesCm1}
    />
  );
}
