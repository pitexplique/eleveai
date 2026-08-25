// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheThales4e, slidesThales4e } from "@/lib/fiches/maths-4e-thales";

export const metadata: Metadata = {
  title: "Le théorème de Thalès — 4e : cours et exercices corrigés",
  description:
    "Reconnaître les deux configurations, écrire les rapports, calculer une longueur au produit en croix et utiliser la réciproque pour démontrer un parallélisme : la fiche de cours complète de Thalès en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function ThalesQuatriemePage() {
  return <FicheCoursClient fiche={ficheThales4e} slides={slidesThales4e} />;
}
