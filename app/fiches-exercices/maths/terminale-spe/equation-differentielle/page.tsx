import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesEquationDifferentielleTerminale } from "@/lib/fiches-exercices/maths-terminale-equation-differentielle";

export const metadata: Metadata = {
  title: "Équations différentielles terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les équations différentielles en terminale spécialité : vérifier une solution, résoudre y' = ay et y' = ay + b, solution particulière de y' = ay + f, condition initiale, démonstration de la forme des solutions de y' = ay. Problèmes de bac : carbone 14, refroidissement de Newton, circuit RC, parachutiste, perfusion, espèce réintroduite, heure d'un décès. Rappel de cours avant chaque niveau, solutions et champs de pentes dessinés, PDF à imprimer.",
};

export default function ExercicesEquationDifferentielleTerminalePage() {
  return <FicheExercicesClient fiche={exercicesEquationDifferentielleTerminale} />;
}
