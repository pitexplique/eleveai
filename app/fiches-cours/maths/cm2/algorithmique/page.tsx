import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheAlgorithmiqueCM2,
  slidesAlgorithmiqueCM2,
} from "@/lib/fiches/maths-cm2-algorithmique";

export const metadata: Metadata = {
  title: "L'algorithmique — CM2 : cours et exercices corrigés",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète de l'algorithmique (instruction, programme, lire dans l'ordre, boucle répéter, avancer et tourner dans Scratch) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function AlgorithmiqueCM2Page() {
  return (
    <FicheCoursClient
      fiche={ficheAlgorithmiqueCM2}
      slides={slidesAlgorithmiqueCM2}
    />
  );
}
