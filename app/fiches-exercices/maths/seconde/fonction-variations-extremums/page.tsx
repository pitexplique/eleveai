import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVariationsSeconde } from "@/lib/fiches-exercices/maths-seconde-variations";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés variations seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Variations et extremums en seconde : 20 exercices corrigés, tableaux dessinés (PDF)",
  description:
    "Vingt exercices corrigés sur le sens de variation en seconde : dresser un tableau de variations depuis une courbe, comparer deux images sans les calculer, démontrer qu'une fonction est décroissante, trouver un maximum ou un minimum, compter les solutions de f(x) = k. Une crue, le 100 m de Usain Bolt, un potager, une éolienne, la distance Terre-Soleil. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesVariationsSecondePage() {
  return <FicheExercicesClient fiche={exercicesVariationsSeconde} />;
}
