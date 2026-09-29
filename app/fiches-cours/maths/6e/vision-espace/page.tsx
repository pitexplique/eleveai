// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheVisionEspace6e, slidesVisionEspace6e } from "@/lib/fiches/maths-6e-vision-espace";

export const metadata: Metadata = {
  title: "La vision dans l'espace — 6e : cours et exercices corrigés",
  description:
    "Les quatre vues d'un assemblage de cubes, compter les cubes étage par étage sans oublier les cachés, la perspective cavalière et le patron du cube : la fiche de cours de 6e, avec dessins, exemples corrigés et exercices.",
};

export default function VisionEspaceSixiemePage() {
  return <FicheCoursClient fiche={ficheVisionEspace6e} slides={slidesVisionEspace6e} />;
}
