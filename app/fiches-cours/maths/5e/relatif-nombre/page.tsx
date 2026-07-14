import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheNombresRelatifs5e,
  slidesNombresRelatifs5e,
} from "@/lib/fiches/maths-5e-nombres-relatifs";

export const metadata: Metadata = {
  title: "Les nombres relatifs — fiche de cours 5e | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des nombres relatifs (signe, opposé, valeur absolue, comparaison, droite graduée) en 5e, à lire, imprimer ou réviser en flashcards.",
};

export default function NombresRelatifsCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheNombresRelatifs5e}
      slides={slidesNombresRelatifs5e}
    />
  );
}
