import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesArithmetiqueSeconde } from "@/lib/fiches-exercices/maths-seconde-arithmetique";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés multiples diviseurs nombres premiers seconde ».
export const metadata: Metadata = {
  title: "Multiples, diviseurs et nombres premiers en seconde : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés d'arithmétique en seconde : multiples et diviseurs, pair et impair, critères de divisibilité, nombres premiers, décomposition en facteurs premiers, fractions irréductibles, démonstrations avec une lettre. Problèmes : bouquets, bus, carrelage, vélo, et les cigales qui comptent en nombres premiers. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesArithmetiqueSecondePage() {
  return <FicheExercicesClient fiche={exercicesArithmetiqueSeconde} />;
}
