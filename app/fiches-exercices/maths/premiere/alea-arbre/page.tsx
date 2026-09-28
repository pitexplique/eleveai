import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAleaArbrePremiere } from "@/lib/fiches-exercices/maths-premiere-alea-arbre";

export const metadata: Metadata = {
  title: "Arbre pondéré, lire et construire — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première : lire les probabilités portées par les branches d'un arbre pondéré, compléter un arbre, construire l'arbre d'un énoncé. Tri des déchets, signal binaire, migrations, rugby, glands de chêne, achats en ligne, lentilles d'optique, émigration du XIXᵉ siècle, tirs au but. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAleaArbrePremierePage() {
  return <FicheExercicesClient fiche={exercicesAleaArbrePremiere} />;
}
