import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPythonSeconde } from "@/lib/fiches-exercices/maths-seconde-python";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés Python seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Python en seconde : 20 exercices corrigés, programmes et traces (PDF)",
  description:
    "Vingt exercices corrigés d'algorithmique et de Python en seconde : affectation, types, conditions, boucles for et while, fonctions, simulation du hasard. Chaque corrigé montre la trace du programme. Un placement à 4 %, le CO₂ de l'atmosphère, un dé lancé dix mille fois, la conjecture de Syracuse, la racine de 2 par balayage. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesPythonSecondePage() {
  return <FicheExercicesClient fiche={exercicesPythonSeconde} />;
}
