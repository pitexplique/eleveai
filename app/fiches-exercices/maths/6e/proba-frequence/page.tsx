import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbaFrequence6e } from "@/lib/fiches-exercices/maths-6e-proba-frequence";

// Pas de fiche de cours pour cette notion : le titre vise « exercices corrigés
// fréquence observée probabilité 6e ».
export const metadata: Metadata = {
  title: "Fréquence observée 6e : 20 exercices corrigés, lancers et probabilité (PDF)",
  description:
    "Vingt exercices corrigés sur la fréquence observée en 6e : compter les résultats d'une expérience répétée, calculer une fréquence en fraction, décimal ou pourcentage, la comparer à la probabilité et au nombre attendu, voir l'écart se réduire. Problèmes : la punaise, un dé truqué, deux pièces lancées par toute la classe, la roue du stand. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesProbaFrequence6ePage() {
  return <FicheExercicesClient fiche={exercicesProbaFrequence6e} />;
}
