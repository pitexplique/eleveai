// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePythagore4e,
  slidesPythagore4e,
} from "@/lib/fiches/maths-4e-pythagore";

export const metadata: Metadata = {
  title: "Le théorème de Pythagore — 4e : cours et exercices corrigés",
  description:
    "Reconnaître l'hypoténuse, calculer une longueur, utiliser la réciproque pour prouver qu'un triangle est rectangle : la fiche de cours complète de Pythagore en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function PythagoreQuatriemePage() {
  return (
    <FicheCoursClient fiche={fichePythagore4e} slides={slidesPythagore4e} />
  );
}
