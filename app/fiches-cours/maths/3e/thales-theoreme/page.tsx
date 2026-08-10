// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheThales3e,
  slidesThales3e,
} from "@/lib/fiches/maths-3e-thales";

export const metadata: Metadata = {
  title: "Théorème de Thalès — fiche de cours 3e",
  description:
    "Définition, propriétés, formule, exemples corrigés et exercices : la fiche de cours complète du théorème de Thalès en 3e, à lire, imprimer ou réviser en flashcards.",
};

export default function ThalesTroisiemePage() {
  return <FicheCoursClient fiche={ficheThales3e} slides={slidesThales3e} />;
}
