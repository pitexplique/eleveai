import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpressionsSeconde } from "@/lib/fiches-exercices/maths-seconde-expressions";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés expressions littérales seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Expressions littérales en seconde : 20 exercices corrigés, de la traduction à la preuve (PDF)",
  description:
    "Vingt exercices corrigés sur les expressions littérales en seconde : traduire une phrase, réduire, substituer une valeur négative, isoler une lettre dans une formule, programmes de calcul, prouver ou réfuter une égalité. Problèmes : un tour de magie, une ficelle de 40 cm, le carré du calendrier, la TVA à La Réunion. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesExpressionsSecondePage() {
  return <FicheExercicesClient fiche={exercicesExpressionsSeconde} />;
}
