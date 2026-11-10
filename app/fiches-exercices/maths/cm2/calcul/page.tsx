import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesCalculCm2 } from "@/lib/fiches-exercices/maths-cm2-calcul";

export const metadata: Metadata = {
  title: "Calcul CM2 : 20 exercices corrigés, calcul mental, posé, priorités (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Calculer de tête, poser une addition ou une soustraction, avec ou sans virgule, respecter les priorités, prendre la moitié ou le double, multiplier par 5, 50, 11 ou 25, estimer un résultat. Une course à pied, une corde d'escalade, une recette, un musée, un tournoi de foot et un potager. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesCalculCm2Page() {
  return <FicheExercicesClient fiche={exercicesCalculCm2} />;
}
