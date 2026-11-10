import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSymetrieCm2 } from "@/lib/fiches-exercices/maths-cm2-symetrie";

export const metadata: Metadata = {
  title: "Symétrie axiale CM2 : 20 exercices corrigés, axe, symétrique, quadrillage (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Reconnaître un axe de symétrie, compter les carreaux jusqu'à l'axe, choisir le bon symétrique d'un point ou d'une figure, se servir de ce que la symétrie garde. Des lettres, une broderie, le reflet d'une montagne dans un lac, un logo et un massif de rosiers. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesSymetrieCm2Page() {
  return <FicheExercicesClient fiche={exercicesSymetrieCm2} />;
}
