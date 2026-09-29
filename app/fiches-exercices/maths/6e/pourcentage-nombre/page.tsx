import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPourcentageNombre6e } from "@/lib/fiches-exercices/maths-6e-pourcentage-nombre";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les pourcentages ») :
// cette page répond à « exercices corrigés pourcentages 6e ».
export const metadata: Metadata = {
  title: "Pourcentages 6e : 20 exercices corrigés, fraction, décimal, calculer 10 %, 25 %, 50 % (PDF)",
  description:
    "Vingt exercices corrigés sur les pourcentages en 6e : comprendre « sur 100 », passer d'un pourcentage à une fraction et à un décimal, lire un pourcentage, calculer 50 %, 25 %, 10 % d'un nombre, écrire une part en pourcentage. Problèmes : sondage de la classe, budget d'une fête, deux bouteilles de jus, deux magasins. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesPourcentageNombre6ePage() {
  return <FicheExercicesClient fiche={exercicesPourcentageNombre6e} />;
}
