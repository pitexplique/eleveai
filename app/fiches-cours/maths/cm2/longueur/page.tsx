import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLongueursCM2,
  slidesLongueursCM2,
} from "@/lib/fiches/maths-cm2-longueurs";

export const metadata: Metadata = {
  title: "Les longueurs — fiche de cours CM2",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des longueurs (millimètre, centimètre, mètre, kilomètre, estimer, comparer, convertir, 1 m = 100 cm, 1 km = 1000 m) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function LongueursCM2Page() {
  return (
    <FicheCoursClient fiche={ficheLongueursCM2} slides={slidesLongueursCM2} />
  );
}
