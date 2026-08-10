import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheDureesCM2, slidesDureesCM2 } from "@/lib/fiches/maths-cm2-durees";

export const metadata: Metadata = {
  title: "Les durées — fiche de cours CM2",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des durées (lire l'heure, quart et demi-heure, convertir heures/minutes/secondes, calculer une durée, heure de fin, base 60) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function DureesCM2Page() {
  return <FicheCoursClient fiche={ficheDureesCM2} slides={slidesDureesCM2} />;
}
