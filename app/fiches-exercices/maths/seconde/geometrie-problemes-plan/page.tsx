import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesGeometrieSeconde } from "@/lib/fiches-exercices/maths-seconde-geometrie";

export const metadata: Metadata = {
  title: "Géométrie plane en seconde : 20 exercices corrigés, trigonométrie et projeté orthogonal (PDF)",
  description:
    "Vingt exercices corrigés de géométrie plane en seconde : sinus, cosinus, tangente, relation cos² + sin² = 1, projeté orthogonal et distance d'un point à une droite, aires, optimisation. La hauteur d'un arbre, la pente d'un col du Tour de France, un enclos le long d'une rivière, le chemin le plus court jusqu'à un phare. Chaque corrigé dessine sa figure à l'échelle. PDF à imprimer.",
};

export default function ExercicesGeometrieSecondePage() {
  return <FicheExercicesClient fiche={exercicesGeometrieSeconde} />;
}
