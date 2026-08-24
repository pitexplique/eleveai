import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheSolidesCM2, slidesSolidesCM2 } from "@/lib/fiches/maths-cm2-solides";

export const metadata: Metadata = {
  title: "Les solides — CM2 : cours et exercices corrigés",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des solides (cube, pavé droit, cylindre, cône, boule, pyramide ; faces, arêtes et sommets ; polyèdre, patron du cube, compter des cubes) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function SolidesCM2Page() {
  return <FicheCoursClient fiche={ficheSolidesCM2} slides={slidesSolidesCM2} />;
}
