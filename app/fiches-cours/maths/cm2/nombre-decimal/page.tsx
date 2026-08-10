import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheNombresDecimauxCM2,
  slidesNombresDecimauxCM2,
} from "@/lib/fiches/maths-cm2-nombres-decimaux";

export const metadata: Metadata = {
  title: "Les nombres décimaux — fiche de cours CM2",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des nombres décimaux (virgule, dixièmes, centièmes, rang d'un chiffre, comparer, ranger, droite graduée, arrondir) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function NombresDecimauxCM2Page() {
  return (
    <FicheCoursClient
      fiche={ficheNombresDecimauxCM2}
      slides={slidesNombresDecimauxCM2}
    />
  );
}
