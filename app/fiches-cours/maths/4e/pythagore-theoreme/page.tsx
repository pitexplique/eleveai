// Première fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePythagore4e,
  slidesPythagore4e,
} from "@/lib/fiches/maths-4e-pythagore";

export const metadata: Metadata = {
  title: "Théorème de Pythagore — fiche de cours 4e | EleveAI",
  description:
    "Définition, propriétés, formule, exemples corrigés et exercices : la fiche de cours complète du théorème de Pythagore en 4e, à lire, imprimer ou réviser en flashcards.",
};

export default function PythagoreQuatriemePage() {
  return <FicheCoursClient fiche={fichePythagore4e} slides={slidesPythagore4e} />;
}
