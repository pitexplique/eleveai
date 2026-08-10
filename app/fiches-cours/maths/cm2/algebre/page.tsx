import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheAlgebreCM2, slidesAlgebreCM2 } from "@/lib/fiches/maths-cm2-algebre";

export const metadata: Metadata = {
  title: "Les débuts de l'algèbre — fiche de cours CM2",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des débuts de l'algèbre (égalité, signe égal, nombre inconnu x, compléter une égalité, modéliser, opération inverse) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function AlgebreCM2Page() {
  return <FicheCoursClient fiche={ficheAlgebreCM2} slides={slidesAlgebreCM2} />;
}
