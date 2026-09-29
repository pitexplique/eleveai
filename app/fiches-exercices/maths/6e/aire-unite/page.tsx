import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAireUnite6e } from "@/lib/fiches-exercices/maths-6e-aire-unite";

// Cette page répond à « exercices corrigés unités d'aire, cm² dm² m² 6e ».
export const metadata: Metadata = {
  title: "Unités d'aire 6e : 20 exercices corrigés, compter, cm², dm², m² (PDF)",
  description:
    "Vingt exercices corrigés sur l'aire et ses unités en 6e : ce qu'est une aire, compter des carreaux et des demi-carreaux, choisir entre cm², dm², m², passer des m² aux dm² et des dm² aux cm² avec le carré découpé en cent. Un studio, une nappe, un carreau de faïence, un bac potager, une mosaïque, une salle de jeux. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAireUnite6ePage() {
  return <FicheExercicesClient fiche={exercicesAireUnite6e} />;
}
