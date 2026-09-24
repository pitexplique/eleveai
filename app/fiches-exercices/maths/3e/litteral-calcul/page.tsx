import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesCalculLitteral3e } from "@/lib/fiches-exercices/maths-3e-calcul-litteral";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Calcul littéral :
// développer, réduire, factoriser ») : cette page répond à « exercices corrigés
// calcul littéral 3e », l'autre à « cours calcul littéral 3e ».
export const metadata: Metadata = {
  title: "Calcul littéral 3e : 20 exercices corrigés, développer, factoriser, identités (PDF)",
  description:
    "Vingt exercices corrigés de 3e : traduire une phrase en expression, calculer une expression, réduire, développer, factoriser, les identités remarquables et la différence de deux carrés, prouver avec une lettre. Programmes de calcul du brevet, un potager, le cadre d'un tableau. Rappel de cours avant chaque niveau, corrigé étape par étape avec le dessin des aires, PDF à imprimer.",
};

export default function ExercicesCalculLitteral3ePage() {
  return <FicheExercicesClient fiche={exercicesCalculLitteral3e} />;
}
