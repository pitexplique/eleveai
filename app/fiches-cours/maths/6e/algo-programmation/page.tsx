// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page n'est
// qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheAlgorithmique6e, slidesAlgorithmique6e } from "@/lib/fiches/maths-6e-algorithmique";

export const metadata: Metadata = {
  title: "Algorithmique et programmation — fiche de cours 6e",
  description:
    "Lire un programme, déplacer un lutin, utiliser une répétition et prévoir le résultat : la fiche de cours complète d'algorithmique et programmation de 6e (Scratch) avec exemples corrigés et exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function AlgorithmiqueSixiemePage() {
  return <FicheCoursClient fiche={ficheAlgorithmique6e} slides={slidesAlgorithmique6e} />;
}
