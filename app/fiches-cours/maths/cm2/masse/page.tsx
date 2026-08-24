import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheMassesCM2, slidesMassesCM2 } from "@/lib/fiches/maths-cm2-masses";

export const metadata: Metadata = {
  title: "Les masses — CM2 : cours et exercices corrigés",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des masses (gramme, kilogramme, tonne, estimer, comparer, convertir kg/g, 1 kg = 1000 g) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function MassesCM2Page() {
  return <FicheCoursClient fiche={ficheMassesCM2} slides={slidesMassesCM2} />;
}
