import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesArithmetiqueSeconde } from "@/lib/fiches-exercices/maths-seconde-arithmetique";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés multiples diviseurs pair impair seconde ».
export const metadata: Metadata = {
  title: "Multiples, diviseurs, pair et impair en seconde : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés d'arithmétique en seconde : multiples et diviseurs, pair et impair, critères de divisibilité, fractions irréductibles, démonstrations avec une lettre. Problèmes : bouquets, bus, carrelage, vélo, et les cigales de 13 et de 17 ans. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesArithmetiqueSecondePage() {
  return <FicheExercicesClient fiche={exercicesArithmetiqueSeconde} />;
}
