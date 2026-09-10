import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePythonSeconde,
  slidesPythonSeconde,
} from "@/lib/fiches/maths-seconde-python";

export const metadata: Metadata = {
  title: "Algorithmique et Python — 2de : variables, boucles, fonctions, cours et exercices corrigés",
  description:
    "Python en seconde : variables et affectation, types et le piège de la division, conditions, boucles for et while, fonctions et simulation. La méthode pour tracer un programme ligne à ligne. Cours, exemples et 10 exercices corrigés.",
};

export default function PythonSecondePage() {
  return (
    <FicheCoursClient
      fiche={fichePythonSeconde}
      slides={slidesPythonSeconde}
    />
  );
}
