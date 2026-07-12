// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCalculMental6e,
  slidesCalculMental6e,
} from "@/lib/fiches/maths-6e-calcul-mental";

export const metadata: Metadata = {
  title: "Le calcul mental — fiche de cours 6e | EleveAI",
  description:
    "Décomposer, passer par les dizaines, utiliser les tables : la fiche de cours complète du calcul mental en 6e, avec astuces, exemples corrigés et exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function CalculMentalSixiemePage() {
  return (
    <FicheCoursClient fiche={ficheCalculMental6e} slides={slidesCalculMental6e} />
  );
}
