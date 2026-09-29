// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheDureeTemps6e,
  slidesDureeTemps6e,
} from "@/lib/fiches/maths-6e-duree-temps";

export const metadata: Metadata = {
  title: "Horaires et durées — 6e : cours et exercices corrigés",
  description:
    "Distinguer un horaire d'une durée, calculer en passant par l'heure ronde, convertir les heures, minutes et secondes, lire 0,25 h ou 1,30 h, passer minuit et lire un tableau d'horaires : la fiche de cours de 6e, dessinée, avec exemples corrigés et exercices.",
};

export default function DureeTempsSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheDureeTemps6e}
      slides={slidesDureeTemps6e}
    />
  );
}
