import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPourcentages4e } from "@/lib/fiches-exercices/maths-4e-prop-pourcentages";

// ⭐ 02/10/2026 : née de la coupe de « Ratios et pourcentages » en deux
// notions ; l'ancienne adresse `prop-ratio-pourcentage` redirige ici.
export const metadata: Metadata = {
  title: "Pourcentages 4e : 20 exercices corrigés (calcul mental, coefficient, évolutions)",
  description:
    "20 exercices corrigés pas à pas sur les pourcentages en 4e : calcul de tête à partir de 10 %, coefficient multiplicateur, taux d'évolution, hausses et baisses successives. Avec dessins et pièges expliqués.",
};

export default function ExercicesPourcentages4ePage() {
  return <FicheExercicesClient fiche={exercicesPourcentages4e} />;
}
