// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFamillesDeTaches,
  slidesFamillesDeTaches,
} from "@/lib/fiches/ia-usages-familles-de-taches";

export const metadata: Metadata = {
  title: "Les familles de tâches de l'IA — fiche de cours",
  description:
    "Reconnaissance, prédiction, recommandation, génération : ce que l'IA sait faire, avec exemples corrigés, pièges à éviter et exercices. Fiche de cours IA (référentiel Pix, Usages).",
};

export default function FamillesDeTachesPage() {
  return (
    <FicheCoursClient
      fiche={ficheFamillesDeTaches}
      slides={slidesFamillesDeTaches}
    />
  );
}
