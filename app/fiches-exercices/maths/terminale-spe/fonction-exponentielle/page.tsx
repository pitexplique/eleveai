import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFonctionExponentielleTerminale } from "@/lib/fiches-exercices/maths-terminale-fonction-exponentielle";

export const metadata: Metadata = {
  title: "Fonction exponentielle terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur la fonction exponentielle en terminale spécialité : limites, croissances comparées démontrées, dérivée de e^u, équations par changement de variable, études de fonctions type bac. Problèmes : offre et demande, caféine dans le sang, doses répétées, croissance d'un arbre, avec programmes Python. Rappel de cours avant chaque niveau, courbes et asymptotes dessinées, PDF à imprimer.",
};

export default function ExercicesFonctionExponentielleTerminalePage() {
  return <FicheExercicesClient fiche={exercicesFonctionExponentielleTerminale} />;
}
