import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesQuadRacinesSignePremiere } from "@/lib/fiches-exercices/maths-premiere-quad-racines-signe";

export const metadata: Metadata = {
  title: "Racines et signe par la forme factorisée — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première (sans spécialité) : racines d'une forme factorisée, écrire et vérifier une forme factorisée, tableau de signes, inéquations du second degré, sans discriminant. Gel au verger, crue, lob, pont en arc, bénéfice d'une ferme. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesQuadRacinesSignePremierePage() {
  return <FicheExercicesClient fiche={exercicesQuadRacinesSignePremiere} />;
}
